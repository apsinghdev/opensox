import type { PrismaClient } from "@prisma/client";
import type { ExtendedPrismaClient } from "../prisma.js";
import { SUBSCRIPTION_STATUS } from "../constants/subscription.js";
import { AuthorizationError } from "./session.service.js";

type Db = ExtendedPrismaClient | PrismaClient;

export interface PublicProProject {
  id: string;
  name: string;
  url: string;
  qualities: string;
  order: number;
  createdAt: Date;
}

const PUBLIC_PROJECT_SELECT = {
  id: true,
  name: true,
  url: true,
  qualities: true,
  order: true,
  createdAt: true,
} as const;

type ProjectWhere = {
  OR?: Array<
    | { name: { contains: string; mode: "insensitive" } }
    | { qualities: { contains: string; mode: "insensitive" } }
  >;
};

type ProjectOrderBy = Array<
  { order: "asc" | "desc" } | { createdAt: "asc" | "desc" }
>;

type ProProjectModel = {
  count: (args: { where: ProjectWhere }) => Promise<number>;
  findMany: (args: {
    where?: ProjectWhere;
    select?: typeof PUBLIC_PROJECT_SELECT;
    orderBy?: ProjectOrderBy;
    skip?: number;
    take?: number;
  }) => Promise<PublicProProject[]>;
  aggregate: (args: {
    _min: { order: true };
  }) => Promise<{ _min: { order: number | null } }>;
  create: (args: {
    data: { name: string; url: string; qualities: string; order: number };
  }) => Promise<PublicProProject>;
  update: (args: {
    where: { id: string };
    data: {
      name?: string;
      url?: string;
      qualities?: string;
      order?: number;
    };
  }) => Promise<PublicProProject>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

type ProjectTransaction = {
  (
    queries: [Promise<number>, Promise<PublicProProject[]>]
  ): Promise<[number, PublicProProject[]]>;
  (queries: Array<Promise<unknown>>): Promise<unknown[]>;
};

function projectDb(db: Db): {
  proProject: ProProjectModel;
  $transaction: ProjectTransaction;
} {
  return db as unknown as {
    proProject: ProProjectModel;
    $transaction: ProjectTransaction;
  };
}

export type PaginatedProProjects = {
  items: PublicProProject[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const DEFAULT_PAGE_SIZE = 21;
const MAX_PAGE_SIZE = 50;

// Order is managed exclusively by drag-reordering, so it isn't part of the
// create/update payloads. New projects are prepended (see createProject).
export type ProProjectInput = {
  name: string;
  url: string;
  qualities: string;
};

// Thrown when a reorder payload isn't a clean permutation of the existing
// projects. Mapped to a 400 by the router.
export class ReorderValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReorderValidationError";
  }
}

async function assertActiveSubscription(db: Db, userId: string): Promise<void> {
  const subscription = await db.subscription.findFirst({
    where: {
      userId,
      status: SUBSCRIPTION_STATUS.ACTIVE,
      endDate: { gte: new Date() },
    },
  });

  if (!subscription) {
    throw new AuthorizationError(
      "Active subscription required to access projects"
    );
  }
}

export const proProjectService = {
  async getProjects(
    db: Db,
    userId: string,
    options: {
      search?: string | undefined;
      page?: number | undefined;
      pageSize?: number | undefined;
    } = {}
  ): Promise<PaginatedProProjects> {
    await assertActiveSubscription(db, userId);

    const search = options.search?.trim();
    const page = Math.max(1, Math.floor(options.page ?? 1));
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, Math.floor(options.pageSize ?? DEFAULT_PAGE_SIZE))
    );

    const where: ProjectWhere = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { qualities: { contains: search, mode: "insensitive" } },
      ];
    }

    const client = projectDb(db);
    const [total, items] = await client.$transaction([
      client.proProject.count({ where }),
      client.proProject.findMany({
        where,
        select: PUBLIC_PROJECT_SELECT,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  },

  async listAllForAdmin(db: Db) {
    return projectDb(db).proProject.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  },

  async createProject(db: Db, input: ProProjectInput) {
    const client = projectDb(db);
    // Prepend new projects: give them a position below the current minimum so
    // an untouched list reads newest-first. Admins can then drag to reorder.
    const { _min } = await client.proProject.aggregate({
      _min: { order: true },
    });
    const topOrder = (_min.order ?? 0) - 1;

    return client.proProject.create({
      data: {
        name: input.name,
        url: input.url,
        qualities: input.qualities,
        order: topOrder,
      },
    });
  },

  async updateProject(db: Db, id: string, input: ProProjectInput) {
    // order is intentionally omitted — it changes only via reorderProjects.
    return projectDb(db).proProject.update({
      where: { id },
      data: {
        name: input.name,
        url: input.url,
        qualities: input.qualities,
      },
    });
  },

  async deleteProject(db: Db, id: string) {
    await projectDb(db).proProject.delete({ where: { id } });
    return { id };
  },

  // Persist a full ordering. `ids` must be the complete set of existing projects,
  // each exactly once, in the new top-to-bottom order; every project's `order`
  // becomes its index, densifying to 0..n-1. Reject anything else up front so a
  // duplicate, partial, or unknown id can't corrupt the ordering mid-transaction.
  async reorderProjects(db: Db, ids: string[]) {
    const client = projectDb(db);

    const unique = new Set(ids);
    if (unique.size !== ids.length) {
      throw new ReorderValidationError("Duplicate project ids in reorder request.");
    }

    const existing = await client.proProject.findMany({});
    const existingIds = new Set(existing.map((p) => p.id));
    if (
      existingIds.size !== unique.size ||
      ids.some((id) => !existingIds.has(id))
    ) {
      throw new ReorderValidationError(
        "Reorder request must include every project exactly once."
      );
    }

    await client.$transaction(
      ids.map((id, index) =>
        client.proProject.update({ where: { id }, data: { order: index } })
      )
    );
    return { count: ids.length };
  },
};

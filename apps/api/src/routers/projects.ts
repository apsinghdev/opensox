import { router, protectedProcedure } from "../trpc.js";
import { z } from "zod";
import type { RepositoryProps } from "@opensox/shared";
import { projectService } from "../services/project.service.js";
import { queryService } from "../services/query.service.js";

const filterPropsSchema = z.object({
  language: z.string().optional(),
  stars: z
    .object({
      min: z.string().optional(),
      max: z.string().optional(),
      custom: z.string().optional(),
    })
    .optional(),
  forks: z
    .object({
      min: z.string().optional(),
      max: z.string().optional(),
    })
    .optional(),
  pushed: z.string().optional(),
  created: z.string().optional(),
  repoName: z.string().optional()
});

const optionsSchema = z.object({
  sort: z.literal("stars").optional(),
  order: z.literal("desc").optional(),
  per_page: z.number().optional(),
  page: z.number().optional(),
});

const inputSchema = z.object({
  filters: filterPropsSchema.optional(),
  options: optionsSchema.optional(),
});

export const projectRouter = router({
  getGithubProjects: protectedProcedure
    .input(inputSchema)
    .query(async ({ input, ctx }: any): Promise<RepositoryProps[]> => {
      await queryService.incrementQueryCount(ctx.db.prisma);
      return await projectService.fetchGithubProjects(
        input.filters as any,
        input.options as any
      );
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  router,
  protectedProcedure,
  adminProcedure,
  isAdminEmail,
  type ProtectedContext,
} from "../trpc.js";
import {
  proProjectService,
  ReorderValidationError,
} from "../services/proProject.service.js";
import { AuthorizationError } from "../services/session.service.js";

const projectUrlSchema = z
  .string()
  .trim()
  .pipe(z.url({ protocol: /^https?$/ }));

const projectInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  url: projectUrlSchema,
  qualities: z.string().trim().min(1, "Qualities are required"),
});

function toTRPCError(error: unknown): never {
  if (error instanceof AuthorizationError) {
    throw new TRPCError({ code: "FORBIDDEN", message: error.message });
  }
  if (error instanceof ReorderValidationError) {
    throw new TRPCError({ code: "BAD_REQUEST", message: error.message });
  }
  throw error;
}

export const proProjectsRouter = router({
  list: protectedProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          page: z.number().int().min(1).optional(),
          pageSize: z.number().int().min(1).max(50).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = (ctx as ProtectedContext).user.id;
      try {
        return await proProjectService.getProjects(ctx.db.prisma, userId, {
          search: input?.search,
          page: input?.page,
          pageSize: input?.pageSize,
        });
      } catch (error) {
        toTRPCError(error);
      }
    }),

  isAdmin: protectedProcedure.query(({ ctx }) => {
    return isAdminEmail((ctx as ProtectedContext).user.email);
  }),

  adminList: adminProcedure.query(async ({ ctx }) => {
    return proProjectService.listAllForAdmin(ctx.db.prisma);
  }),

  adminCreate: adminProcedure
    .input(projectInputSchema)
    .mutation(async ({ ctx, input }) => {
      return proProjectService.createProject(ctx.db.prisma, input);
    }),

  adminUpdate: adminProcedure
    .input(z.object({ id: z.string().min(1), data: projectInputSchema }))
    .mutation(async ({ ctx, input }) => {
      return proProjectService.updateProject(ctx.db.prisma, input.id, input.data);
    }),

  adminReorder: adminProcedure
    .input(z.object({ ids: z.array(z.string().min(1)).min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await proProjectService.reorderProjects(ctx.db.prisma, input.ids);
      } catch (error) {
        toTRPCError(error);
      }
    }),

  adminDelete: adminProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return proProjectService.deleteProject(ctx.db.prisma, input.id);
    }),
});

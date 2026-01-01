import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { userService } from "../services/user.service.js";
import { savedReposService } from "../services/savedRepos.service.js";
import { z } from "zod";

export const userRouter = router({
  // get the total count of users
  count: publicProcedure.query(async ({ ctx }) => {
    return await userService.getUserCount(ctx.db.prisma);
  }),

  // check if current user has an active subscription
  subscriptionStatus: protectedProcedure.query(async ({ ctx }: any) => {
    const userId = ctx.user.id;
    return await userService.checkSubscriptionStatus(ctx.db.prisma, userId);
  }),

  // get user's completed steps
  getCompletedSteps: protectedProcedure.query(async ({ ctx }: any) => {
    const userId = ctx.user.id;
    return await userService.getCompletedSteps(ctx.db.prisma, userId);
  }),

  // update user's completed steps
  updateCompletedSteps: protectedProcedure
    .input(
      z.object({
        completedSteps: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }: any) => {
      const userId = ctx.user.id;
      return await userService.updateCompletedSteps(
        ctx.db.prisma,
        userId,
        input.completedSteps
      );
    }),

  // get user's saved repos (feature flag: FEATURE_SAVED_REPOS_DB)
  getSavedRepos: protectedProcedure.query(async ({ ctx }: any) => {
    if (process.env.FEATURE_SAVED_REPOS_DB !== "true") {
      return [];
    }
    const userId = ctx.user.id;
    return await savedReposService.getSavedRepos(ctx.db.prisma, userId);
  }),

  // update user's saved repos with merge logic (feature flag: FEATURE_SAVED_REPOS_DB)
  updateSavedRepos: protectedProcedure
    .input(
      z.object({
        action: z.enum(["add", "remove", "replace"]),
        repos: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            url: z.string(),
            language: z.string().optional(),
            popularity: z.enum(["low", "medium", "high"]).optional(),
            competitionScore: z.number().optional(),
            savedAt: z.string(),
            meta: z.record(z.string(), z.unknown()).optional(),
          })
        ),
        localRepos: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              url: z.string(),
              language: z.string().optional(),
              popularity: z.enum(["low", "medium", "high"]).optional(),
              competitionScore: z.number().optional(),
              savedAt: z.string(),
              meta: z.record(z.string(), z.unknown()).optional(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }: any) => {
      if (process.env.FEATURE_SAVED_REPOS_DB !== "true") {
        throw new Error("Saved repos sync is not enabled");
      }

      const userId = ctx.user.id;

      // If localRepos provided, merge with server repos
      if (input.localRepos && input.action === "replace") {
        const serverRepos = await savedReposService.getSavedRepos(
          ctx.db.prisma,
          userId
        );
        const merged = savedReposService.mergeSavedRepos(
          input.localRepos,
          serverRepos
        );
        return await savedReposService.updateSavedRepos(
          ctx.db.prisma,
          userId,
          "replace",
          merged
        );
      }

      // Otherwise, perform the requested action
      return await savedReposService.updateSavedRepos(
        ctx.db.prisma,
        userId,
        input.action,
        input.repos
      );
    }),
});

import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { userService } from "../services/user.service.js";
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
});

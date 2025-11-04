import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { userService } from "../services/user.service.js";

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
});

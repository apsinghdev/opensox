import type { PrismaClient } from "@prisma/client";
import type { ExtendedPrismaClient } from "../prisma.js";
import { SUBSCRIPTION_STATUS } from "../constants/subscription.js";

export const userService = {
  /**
   * Get total count of users
   */
  async getUserCount(prisma: ExtendedPrismaClient | PrismaClient) {
    const userCount = await prisma.user.count();

    return {
      total_users: userCount,
    };
  },

  /**
   * Check if user has an active subscription
   */
  async checkSubscriptionStatus(
    prisma: ExtendedPrismaClient | PrismaClient,
    userId: string
  ) {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId,
        status: SUBSCRIPTION_STATUS.ACTIVE,
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        plan: true,
      },
    });

    // the highest tier still inside its paid window wins, even when a lower
    // tier ends later. one row is unchanged by the sort.
    const subscription =
      [...subscriptions].sort((a, b) => {
        const tierDelta =
          (b.plan?.durationMonths ?? 0) - (a.plan?.durationMonths ?? 0);
        if (tierDelta !== 0) return tierDelta;
        return (b.endDate?.getTime() ?? 0) - (a.endDate?.getTime() ?? 0);
      })[0] ?? null;

    return {
      isPaidUser: !!subscription,
      subscription: subscription
        ? {
            id: subscription.id,
            planName: subscription.plan?.name,
            durationMonths: subscription.plan?.durationMonths ?? null,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            status: subscription.status,
          }
        : null,
    };
  },

  /**
   * Get user's completed steps
   */
  async getCompletedSteps(
    prisma: ExtendedPrismaClient | PrismaClient,
    userId: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { completedSteps: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const completedSteps = user.completedSteps as string[] | null;
    return completedSteps || [];
  },

  /**
   * Update user's completed steps
   */
  async updateCompletedSteps(
    prisma: ExtendedPrismaClient | PrismaClient,
    userId: string,
    completedSteps: string[]
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        completedSteps: completedSteps,
      },
      select: { completedSteps: true },
    });

    return (user.completedSteps as string[]) || [];
  },
};

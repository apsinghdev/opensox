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
    const subscription = await prisma.subscription.findFirst({
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

    return {
      isPaidUser: !!subscription,
      subscription: subscription
        ? {
            id: subscription.id,
            planName: subscription.plan?.name,
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

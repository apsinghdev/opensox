import type { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { ExtendedPrismaClient } from "../prisma.js";
import {
  PAYMENT_STATUS,
  SUBSCRIPTION_STATUS,
} from "../constants/subscription.js";

type Db = ExtendedPrismaClient | PrismaClient;

function isTransientDbError(error: unknown): boolean {
  if (
    error instanceof PrismaClientKnownRequestError &&
    (error.code === "P1001" ||
      error.code === "P1002" ||
      error.code === "P1008" ||
      error.code === "P1017")
  ) {
    return true;
  }

  return (
    error instanceof Error &&
    (error.message.includes("ECONNREFUSED") ||
      error.message.includes("ETIMEDOUT") ||
      error.message.includes("ENOTFOUND"))
  );
}

async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  const maxRetries = 3;
  const baseDelay = 100;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isTransientDbError(error)) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.warn(
          `[${new Date().toISOString()}] ${operationName} failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`,
          error
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export const adminService = {
  async getStats(db: Db) {
    const now = new Date();

    try {
      const [paidUsers, revenue, latestProPayment] = await Promise.all([
        withRetry(
          () =>
            db.user.count({
              where: {
                subscriptions: {
                  some: {
                    status: SUBSCRIPTION_STATUS.ACTIVE,
                    endDate: { gte: now },
                  },
                },
              },
            }),
          "admin paid user count"
        ),
        withRetry(
          () =>
            db.payment.aggregate({
              where: { status: PAYMENT_STATUS.CAPTURED },
              _sum: { amount: true },
            }),
          "admin revenue aggregate"
        ),
        withRetry(
          () =>
            db.payment.findFirst({
              where: { status: PAYMENT_STATUS.CAPTURED },
              orderBy: { createdAt: "desc" },
              select: {
                user: {
                  select: { email: true },
                },
              },
            }),
          "admin latest pro member"
        ),
      ]);

      return {
        paidUsers,
        totalRevenuePaise: revenue._sum.amount ?? 0,
        currency: "INR",
        latestProMemberEmail: latestProPayment?.user.email ?? null,
      };
    } catch (error) {
      if (isTransientDbError(error)) {
        console.error(
          `[${new Date().toISOString()}] admin stats unavailable, returning fallback`,
          error
        );
        return {
          paidUsers: 0,
          totalRevenuePaise: 0,
          currency: "INR",
          latestProMemberEmail: null,
        };
      }

      throw error;
    }
  },
};

import type { PrismaClient } from "@prisma/client";
import type { ExtendedPrismaClient } from "../prisma.js";

export const queryService = {
  /**
   * Get total count of queries
   */
  async getQueryCount(prisma: ExtendedPrismaClient | PrismaClient) {
    const queryCount = await prisma.queryCount.findUnique({
      where: { id: 1 },
    });

    return {
      total_queries: queryCount?.total_queries.toString() || "0",
    };
  },

  /**
   * Increment the query count by 1
   */
  async incrementQueryCount(
    prisma: ExtendedPrismaClient | PrismaClient
  ): Promise<void> {
    try {
      const updatedCount = await prisma.queryCount.update({
        where: { id: 1 },
        data: {
          total_queries: {
            increment: 1,
          },
        },
      });
      if (process.env.NODE_ENV === "development") {
        console.log("Updated Query Count:", updatedCount);
      }
    } catch (error) {
      console.error("Error updating query count:", error);
    }
  },
};

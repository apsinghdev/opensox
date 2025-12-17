import { generateToken } from "../utils/auth.js";
import type { PrismaClient } from "@prisma/client";
import { SUBSCRIPTION_STATUS } from "../constants/subscription.js";

interface GoogleAuthInput {
  email: string;
  firstName?: string | undefined;
  authMethod?: string | undefined;
}

interface OAuthAccountInput {
  userId: string;
  provider: string;
  providerAccountId: string;
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  session_state?: string;
}

export const authService = {
  /**
   * Handle Google authentication
   * Creates or updates user and generates JWT token
   */
  async handleGoogleAuth(prisma: any, input: GoogleAuthInput) {
    const { email, firstName, authMethod } = input;

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        lastLogin: new Date(),
      },
      create: {
        email,
        firstName: firstName || "Opensox User",
        authMethod: authMethod || "google",
        lastLogin: new Date(),
      },
      include: {
        subscriptions: {
          where: {
            status: SUBSCRIPTION_STATUS.ACTIVE,
            endDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: "desc",
          },
          take: 1,
          include: {
            plan: true,
          },
        },
      },
    });

    const activeSubscription = user.subscriptions[0] || null;
    const token = generateToken(email);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        authMethod: user.authMethod,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        completedSteps: user.completedSteps,
        isPaidUser: !!activeSubscription,
        subscription: activeSubscription
          ? {
              id: activeSubscription.id,
              status: activeSubscription.status,
              startDate: activeSubscription.startDate,
              endDate: activeSubscription.endDate,
              planId: activeSubscription.planId,
              planName: activeSubscription.plan?.name,
            }
          : null,
      },
      token,
    };
  },

  /**
   * Create or update OAuth account with encrypted tokens
   * Tokens (refresh_token, access_token, id_token) are automatically encrypted
   * by Prisma Client Extension before storage
   */
  async createOrUpdateOAuthAccount(prisma: any, input: OAuthAccountInput) {
    const {
      userId,
      provider,
      providerAccountId,
      access_token,
      refresh_token,
      id_token,
      expires_at,
      token_type,
      scope,
      session_state,
    } = input;

    // Tokens are automatically encrypted by Prisma Client Extension
    // Build update/create objects dynamically to avoid undefined values
    const updateData: any = {};
    const createData: any = {
      userId,
      type: "oauth",
      provider,
      providerAccountId,
    };

    // Only include defined values to satisfy exactOptionalPropertyTypes
    if (access_token !== undefined) {
      updateData.access_token = access_token;
      createData.access_token = access_token;
    }
    if (refresh_token !== undefined) {
      updateData.refresh_token = refresh_token;
      createData.refresh_token = refresh_token;
    }
    if (id_token !== undefined) {
      updateData.id_token = id_token;
      createData.id_token = id_token;
    }
    if (expires_at !== undefined) {
      updateData.expires_at = expires_at;
      createData.expires_at = expires_at;
    }
    if (token_type !== undefined) {
      updateData.token_type = token_type;
      createData.token_type = token_type;
    }
    if (scope !== undefined) {
      updateData.scope = scope;
      createData.scope = scope;
    }
    if (session_state !== undefined) {
      updateData.session_state = session_state;
      createData.session_state = session_state;
    }

    // Prisma rejects upsert with empty update object, so short-circuit to findUnique
    const whereClause = {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    };

    if (Object.keys(updateData).length === 0) {
      const existingAccount = await prisma.account.findUnique({
        where: whereClause,
      });

      if (existingAccount) {
        return existingAccount;
      }

      return await prisma.account.create({
        data: createData,
      });
    }

    const account = await prisma.account.upsert({
      where: whereClause,
      update: updateData,
      create: createData,
    });

    return account;
  },

  /**
   * Get OAuth account with decrypted tokens
   * Tokens are automatically decrypted by Prisma Client Extension when reading
   */
  async getOAuthAccount(
    prisma: any,
    provider: string,
    providerAccountId: string
  ) {
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });

    return account;
  },

  /**
   * Get all OAuth accounts for a user with decrypted tokens
   */
  async getUserOAuthAccounts(prisma: any, userId: string) {
    const accounts = await prisma.account.findMany({
      where: { userId },
    });

    return accounts;
  },

  /**
   * Delete OAuth account (e.g., when user disconnects provider)
   */
  async deleteOAuthAccount(
    prisma: any,
    provider: string,
    providerAccountId: string
  ) {
    await prisma.account.delete({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });
  },

  getSession(user: any) {
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        authMethod: user.authMethod,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        completedSteps: user.completedSteps,
        isPaidUser: user.isPaidUser || false,
        subscription: user.subscription || null,
      },
    };
  },
};

import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.js";
import type { PrismaClient } from "@prisma/client";

const DEFAULT_REVIEW_LOGIN_EMAIL = "opensoxlabs@gmail.com";

const getReviewLoginEmail = (): string =>
  (process.env.REVIEW_LOGIN_EMAIL || DEFAULT_REVIEW_LOGIN_EMAIL)
    .toLowerCase()
    .trim();

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
      select: {
        id: true,
        email: true,
        firstName: true,
        authMethod: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    const token = generateToken(email);

    return {
      user,
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

  /**
   * allowlisted email+password login for the razorpay review account only
   */
  async handleReviewLogin(
    prisma: any,
    input: { email: string; password: string }
  ) {
    const email = input.email.toLowerCase().trim();

    if (email !== getReviewLoginEmail()) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const existing = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!existing?.passwordHash) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const passwordMatches = await bcrypt.compare(
      input.password,
      existing.passwordHash
    );

    if (!passwordMatches) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const user = await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
      select: {
        id: true,
        email: true,
        firstName: true,
        authMethod: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    return {
      user,
      token: generateToken(user.email),
    };
  },

  /**
   * Get user session information
   */
  getSession(user: any) {
    return {
      user,
    };
  },
};

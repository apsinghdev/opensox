import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import {
  encryptAccountTokens,
  decryptAccountTokens,
} from "./utils/encryption.js";

dotenv.config();

const basePrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
  log: ["error", "warn"],
});

/**
 * Prisma Client Extension for automatic token encryption/decryption
 * Encrypts sensitive OAuth tokens before storing and decrypts when reading
 */
const prisma = basePrisma.$extends({
  query: {
    account: {
      async create({ args, query }) {
        args.data = encryptAccountTokens(args.data);
        const result = await query(args);
        return decryptAccountTokens(result);
      },
      async update({ args, query }) {
        args.data = encryptAccountTokens(args.data);
        const result = await query(args);
        return decryptAccountTokens(result);
      },
      async upsert({ args, query }) {
        args.create = encryptAccountTokens(args.create);
        args.update = encryptAccountTokens(args.update);
        const result = await query(args);
        return decryptAccountTokens(result);
      },
      async findUnique({ args, query }) {
        const result = await query(args);
        return decryptAccountTokens(result);
      },
      async findFirst({ args, query }) {
        const result = await query(args);
        return decryptAccountTokens(result);
      },
      async findMany({ args, query }) {
        const result = await query(args);
        return result?.map((account: any) => decryptAccountTokens(account));
      },
    },
    user: {
      // Decrypt nested accounts in user queries
      async findUnique({ args, query }) {
        const result = await query(args);
        if (result?.accounts) {
          result.accounts = Array.isArray(result.accounts)
            ? result.accounts.map((account: any) =>
                decryptAccountTokens(account)
              )
            : decryptAccountTokens(result.accounts);
        }
        return result;
      },
      async findFirst({ args, query }) {
        const result = await query(args);
        if (result?.accounts) {
          result.accounts = Array.isArray(result.accounts)
            ? result.accounts.map((account: any) =>
                decryptAccountTokens(account)
              )
            : decryptAccountTokens(result.accounts);
        }
        return result;
      },
      async findMany({ args, query }) {
        const result = await query(args);
        return result?.map((user: any) => {
          if (user?.accounts) {
            user.accounts = user.accounts.map((account: any) =>
              decryptAccountTokens(account)
            );
          }
          return user;
        });
      },
    },
  },
});

const withTimeout = async <T>(
  operation: Promise<T>,
  timeoutMs: number = 5000
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(
      () => reject(new Error("Database operation timed out")),
      timeoutMs
    );
  });

  return Promise.race([operation, timeoutPromise]);
};

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
}

export { withTimeout };
export default { prisma, connectDB };

export type ExtendedPrismaClient = typeof prisma;

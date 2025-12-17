import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context.js";
import { verifyToken, type UserWithSubscription } from "./utils/auth.js";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const authHeader = ctx.req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing or invalid authorization header",
    });
  }

  const token = authHeader.substring(7);

  try {
    const user = await verifyToken(token);
    return next({
      ctx: {
        ...ctx,
        user: user as UserWithSubscription,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid or expired token",
    });
  }
});

const requiresSubscription = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }

  const user = ctx.user as UserWithSubscription;

  if (!user.isPaidUser || !user.subscription) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Active subscription required",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed) as any;
export const proProcedure = protectedProcedure.use(requiresSubscription) as any;

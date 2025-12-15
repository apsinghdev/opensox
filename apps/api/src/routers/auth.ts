import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { authService } from "../services/auth.service.js";
import { generateToken } from "../utils/auth.js";

const googleAuthSchema = z.object({
  email: z.email("Invalid email format"),
  firstName: z.string().optional(),
  authMethod: z.string().optional(),
  providerAccountId: z.string().optional(),
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
  id_token: z.string().optional(),
  expires_at: z.number().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
});

export const authRouter = router({
  googleAuth: publicProcedure
    .input(googleAuthSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const authInput = {
          email: input.email,
          firstName: input.firstName,
          authMethod: input.authMethod,
        };
        const authResult = await authService.handleGoogleAuth(
          ctx.db.prisma,
          authInput
        );

        // Store OAuth tokens (encrypted automatically) if present
        if (input.providerAccountId) {
          const oauthInput: any = {
            userId: authResult.user.id,
            provider: "google",
            providerAccountId: input.providerAccountId,
          };

          // Only include defined values
          if (input.access_token) oauthInput.access_token = input.access_token;
          if (input.refresh_token)
            oauthInput.refresh_token = input.refresh_token;
          if (input.id_token) oauthInput.id_token = input.id_token;
          if (input.expires_at) oauthInput.expires_at = input.expires_at;
          if (input.token_type) oauthInput.token_type = input.token_type;
          if (input.scope) oauthInput.scope = input.scope;

          await authService.createOrUpdateOAuthAccount(
            ctx.db.prisma,
            oauthInput
          );
        }

        return authResult;
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Google auth error:", error);
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Authentication failed",
        });
      }
    }),
  getSession: protectedProcedure.query(
    async ({ ctx }: { ctx: { user: any } }) => {
      const userId = ctx.user.id;
      const user = await ctx.db.prisma.user.findUnique({
        where: { id: userId },
        include: {
          subscriptions: {
            where: {
              status: "active",
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

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const activeSubscription = user.subscriptions[0] || null;

      return authService.getSession({
        ...user,
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
      });
    }
  ),
  generateJWT: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(({ input }) => {
      return { token: generateToken(input.email) };
    }),
});

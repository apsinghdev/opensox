import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import { newsletterService } from "../services/newsletter.service.js";

export const subscribeInputSchema = z.object({
  email: z
    .string()
    .trim()
    .transform((value) => value.toLowerCase())
    .pipe(z.email("Invalid email format")),
  source: z
    .string()
    .trim()
    .transform((value) => value.toLowerCase())
    .pipe(
      z
        .string()
        .min(1)
        .max(32)
        .regex(/^[a-z0-9_-]+$/)
    ),
});

const tokenInputSchema = z.object({
  token: z.string().min(1),
});

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(subscribeInputSchema)
    .mutation(async ({ ctx, input }) => {
      return newsletterService.subscribe(ctx.db.prisma, input);
    }),

  confirm: publicProcedure
    .input(tokenInputSchema)
    .mutation(async ({ ctx, input }) => {
      return newsletterService.confirm(ctx.db.prisma, input.token);
    }),

  unsubscribe: publicProcedure
    .input(tokenInputSchema)
    .mutation(async ({ ctx, input }) => {
      return newsletterService.unsubscribe(ctx.db.prisma, input.token);
    }),
});

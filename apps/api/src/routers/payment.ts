import { router, protectedProcedure, publicProcedure } from "../trpc.js";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { paymentService } from "../services/payment.service.js";

const ALLOWED_NOTE_KEYS = ["plan"] as const;
const MAX_NOTE_VALUE_LENGTH = 255;

const createOrderSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  receipt: z.string().min(1, "Receipt is required"),
  notes: z.record(z.string(), z.string()).optional(),
});

const verifyPaymentSchema = z.object({
  razorpay_payment_id: z.string().min(1, "Payment ID is required"),
  razorpay_order_id: z.string().min(1, "Order ID is required"),
  razorpay_signature: z.string().min(1, "Signature is required"),
  planId: z.string().min(1, "Plan ID is required"),
});

export const paymentRouter = router({
  getPublicPlan: publicProcedure
    .input(z.object({ planId: z.string().min(1, "Plan ID is required") }))
    .query(async ({ input }) => {
      const plan = await paymentService.getPlan(input.planId);

      if (!plan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Plan not found",
        });
      }

      return {
        price: plan.price,
        currency: plan.currency,
      };
    }),

  getProMemberCount: publicProcedure
    .input(z.object({ planId: z.string().min(1, "Plan ID is required") }))
    .query(async ({ input }) => {
      const plan = await paymentService.getPlan(input.planId);
      if (!plan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Plan not found",
        });
      }

      const count = await paymentService.countProMembersForPlan(input.planId);
      return { count };
    }),

  createOrder: protectedProcedure
    .input(createOrderSchema)
    .mutation(
      async ({
        input,
        ctx,
      }: {
        input: z.infer<typeof createOrderSchema>;
        ctx: any;
      }) => {
        try {
          const userId = ctx.user?.id;
          if (!userId) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "User not authenticated",
            });
          }

          // Fetch plan from database to get the price
          const plan = await paymentService.getPlan(input.planId);

          if (!plan) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Plan not found",
            });
          }

          // Validate plan has required fields
          if (!plan.price || !plan.currency) {
            console.error("Plan missing required fields:", plan);
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Plan is missing price or currency information",
            });
          }

          const sanitizedNotes: Record<string, string> = {};

          if (input.notes) {
            for (const key of ALLOWED_NOTE_KEYS) {
              if (input.notes[key]) {
                const value = String(input.notes[key]).slice(
                  0,
                  MAX_NOTE_VALUE_LENGTH
                );
                sanitizedNotes[key] = value;
              }
            }
          }

          sanitizedNotes.user_id = userId;
          sanitizedNotes.plan_id = input.planId;

          const result = await paymentService.createOrder({
            amount: plan.price, // Use price from database
            currency: plan.currency,
            receipt: input.receipt,
            notes: sanitizedNotes,
          });

          // Check if it's an error response
          if ("error" in result) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: result.error.description,
              cause: result.error,
            });
          }

          return result;
        } catch (error: any) {
          if (error instanceof TRPCError) {
            throw error;
          }

          if (process.env.NODE_ENV !== "production") {
            console.error("Payment order creation error:", error);
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create payment order",
          });
        }
      }
    ),

  verifyPayment: protectedProcedure
    .input(verifyPaymentSchema)
    .mutation(
      async ({
        input,
        ctx,
      }: {
        input: z.infer<typeof verifyPaymentSchema>;
        ctx: any;
      }) => {
        try {
          const userId = ctx.user?.id;
          if (!userId) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "User not authenticated",
            });
          }

          // Fetch plan from database to get amount and currency
          const plan = await paymentService.getPlan(input.planId);

          if (!plan) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Plan not found",
            });
          }

          // Validate plan has required fields
          if (!plan.price || !plan.currency) {
            console.error("Plan missing required fields:", plan);
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Plan is missing price or currency information",
            });
          }

          // Step 1: Verify signature first (fail fast if invalid)
          const isValidSignature = paymentService.verifyPaymentSignature(
            input.razorpay_order_id,
            input.razorpay_payment_id,
            input.razorpay_signature
          );
          if (!isValidSignature) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid payment signature",
            });
          }

          const { payment, subscription } = await paymentService.fulfillPayment({
            userId,
            planId: input.planId,
            paymentData: {
              razorpayPaymentId: input.razorpay_payment_id,
              razorpayOrderId: input.razorpay_order_id,
              amount: plan.price,
              currency: plan.currency,
            },
            sendConfirmationEmail: true,
          });

          return {
            success: true,
            message: "Payment verified and subscription activated",
            payment: {
              id: payment.id,
              razorpayPaymentId: payment.razorpayPaymentId,
              amount: payment.amount,
              currency: payment.currency,
              status: payment.status,
            },
            subscription: {
              id: subscription.id,
              status: subscription.status,
              startDate: subscription.startDate,
              endDate: subscription.endDate,
            },
          };
        } catch (error: any) {
          if (error instanceof TRPCError) {
            throw error;
          }

          if (process.env.NODE_ENV !== "production") {
            console.error("Payment verification error:", error);
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to verify payment",
          });
        }
      }
    ),
});

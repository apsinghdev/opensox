import { rz_instance } from "../clients/razorpay.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import crypto from "crypto";
import prismaModule from "../prisma.js";
import {
  SUBSCRIPTION_STATUS,
  PAYMENT_STATUS,
} from "../constants/subscription.js";
import { discordService } from "./discord.service.js";

const { prisma } = prismaModule;

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
  if (error instanceof Error) {
    return (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ETIMEDOUT") ||
      error.message.includes("ENOTFOUND")
    );
  }
  return false;
}

function resolvePlanDurationMonths(plan: {
  durationMonths?: number | null;
  interval?: string | null;
}): number {
  if (
    typeof plan.durationMonths === "number" &&
    Number.isFinite(plan.durationMonths) &&
    plan.durationMonths > 0
  ) {
    return plan.durationMonths;
  }

  switch ((plan.interval ?? "").toLowerCase()) {
    case "monthly":
      return 1;
    case "quarterly":
      return 3;
    case "yearly":
    case "annual":
      return 12;
    default:
      return 12;
  }
}

interface CreateOrderInput {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderSuccess {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: Record<string, string>;
  offer_id: string | null;
  receipt: string;
  status: string;
}

interface RazorpayError {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: Record<string, any>;
    field: string;
  };
}

type CreateOrderResponse = RazorpayOrderSuccess | RazorpayError;

interface PaymentData {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  amount: number; // Amount in paise (smallest currency unit)
  currency: string;
}

export const paymentService = {
  /**
   * Get plan details from database
   */
  async getPlan(planId: string) {
    try {
      const plan = await prisma.plan.findUnique({
        where: { id: planId },
      });
      return plan;
    } catch (error) {
      console.error("Error fetching plan:", error);
      throw new Error("Failed to fetch plan");
    }
  },

  /**
   * distinct users with an active subscription for the given plan (pro members)
   */
  async countActiveProMembersForPlan(planId: string): Promise<number> {
    const maxRetries = 2;
    const baseDelayMs = 100;
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await prisma.user.count({
          where: {
            subscriptions: {
              some: {
                planId,
                status: SUBSCRIPTION_STATUS.ACTIVE,
                endDate: { gte: new Date() },
              },
            },
          },
        });
      } catch (error) {
        lastError = error;
        const transient = isTransientDbError(error);
        const lastAttempt = attempt === maxRetries;

        if (!transient || lastAttempt) {
          const prismaCode =
            error instanceof PrismaClientKnownRequestError
              ? error.code
              : undefined;
          console.error(
            JSON.stringify({
              level: "error",
              service: "paymentService",
              operation: "countActiveProMembersForPlan",
              event: "prisma.user.count_failed",
              planId,
              timestamp: new Date().toISOString(),
              attempt: attempt + 1,
              maxAttempts: maxRetries + 1,
              transient,
              prismaCode,
              errorMessage:
                error instanceof Error ? error.message : String(error),
            })
          );
          throw new Error("Failed to count active pro members for plan");
        }

        const delayMs = baseDelayMs * Math.pow(2, attempt);
        console.warn(
          JSON.stringify({
            level: "warn",
            service: "paymentService",
            operation: "countActiveProMembersForPlan",
            event: "prisma.user.count_retry",
            planId,
            timestamp: new Date().toISOString(),
            attempt: attempt + 1,
            retryInMs: delayMs,
          })
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    throw new Error("Failed to count active pro members for plan");
  },

  /**
   * Create a new Razorpay order
   */
  async createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
    const { amount, currency, receipt, notes } = input;

    try {
      const order = await rz_instance.orders.create({
        amount,
        currency,
        receipt,
        notes: notes || {},
      });

      return order as RazorpayOrderSuccess;
    } catch (error: any) {
      if (error.error) {
        return {
          error: error.error,
        } as RazorpayError;
      }

      // Handle unexpected errors
      return {
        error: {
          code: "INTERNAL_ERROR",
          description: error.message || "An unexpected error occurred",
          source: "internal",
          step: "payment_initiation",
          reason: "unknown_error",
          metadata: {},
          field: "",
        },
      } as RazorpayError;
    }
  },

  /**
   * Verify Razorpay payment signature using HMAC SHA256
   */
  verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string
  ): boolean {
    try {
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keySecret) {
        throw new Error("RAZORPAY_KEY_SECRET not configured");
      }

      // Create the expected signature
      const generatedSignatureHex = crypto
        .createHmac("sha256", keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      const a = Buffer.from(signature, "hex");
      const b = Buffer.from(generatedSignatureHex, "hex");

      if (a.length !== b.length) return false;

      // Compare signatures securely
      return crypto.timingSafeEqual(a, b);
    } catch (error) {
      console.error("Signature verification error:", error);
      return false;
    }
  },

  /**
   * Create payment record in database
   */
  async createPaymentRecord(
    userId: string,
    paymentData: PaymentData
  ): Promise<any> {
    try {
      // Check if payment already exists (idempotency)
      const existingPayment = await prisma.payment.findUnique({
        where: { razorpayPaymentId: paymentData.razorpayPaymentId },
      });

      if (existingPayment) {
        return existingPayment;
      }

      // Create new payment record
      const payment = await prisma.payment.create({
        data: {
          userId,
          razorpayPaymentId: paymentData.razorpayPaymentId,
          razorpayOrderId: paymentData.razorpayOrderId,
          amount: paymentData.amount, // Amount in paise (smallest currency unit)
          currency: paymentData.currency,
          status: PAYMENT_STATUS.CAPTURED,
        },
      });

      return payment;
    } catch (error) {
      console.error("Error creating payment record:", error);
      throw new Error("Failed to create payment record");
    }
  },

  /**
   * Create subscription for user based on plan
   */
  async createSubscription(
    userId: string,
    planId: string,
    paymentId: string
  ): Promise<any> {
    try {
      // Get plan details
      const plan = await prisma.plan.findUnique({
        where: { id: planId },
      });

      if (!plan) {
        throw new Error("Plan not found");
      }

      // Calculate end date from the plan's duration. Prefer the explicit
      // durationMonths field; fall back to interpreting the interval string so
      // older plans without a duration still resolve to a sensible length.
      const startDate = new Date();
      const endDate = new Date(startDate);

      const durationMonths = resolvePlanDurationMonths(plan);
      endDate.setMonth(endDate.getMonth() + durationMonths);

      // Check if user already has an active subscription for this payment
      const existingSubscription = await prisma.subscription.findFirst({
        where: {
          userId,
          payments: {
            some: {
              id: paymentId,
            },
          },
        },
      });

      if (existingSubscription) {
        return existingSubscription;
      }

      // Create subscription
      const subscription = await prisma.subscription.create({
        data: {
          userId,
          planId,
          status: SUBSCRIPTION_STATUS.ACTIVE,
          startDate,
          endDate,
          autoRenew: true,
        },
      });

      // Link payment to subscription
      await prisma.payment.update({
        where: { id: paymentId },
        data: { subscriptionId: subscription.id },
      });

      if (discordService.isAutomationEnabled()) {
        try {
          const discordAccount = await discordService.getDiscordAccountForUser(userId);
          if (discordAccount?.providerAccountId && discordAccount.access_token) {
            await discordService.addMemberToProGuild(
              discordAccount.providerAccountId,
              discordAccount.access_token
            );
          }
        } catch (error) {
          // don't fail payment flow if discord sync fails
          console.error("Failed to sync Discord membership after payment:", error);
        }
      }

      return subscription;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw new Error("Failed to create subscription");
    }
  },
};

import { rz_instance } from "../clients/razorpay.js";
import crypto from "crypto";
import prismaModule from "../prisma.js";
import {
  SUBSCRIPTION_STATUS,
  PAYMENT_STATUS,
} from "../constants/subscription.js";

const { prisma } = prismaModule;

interface CreateOrderInput {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

interface RazorpayOrderSuccess {
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

      // Calculate end date - Currently only yearly plan is supported
      const startDate = new Date();
      const endDate = new Date(startDate);

      // Set subscription for 1 year (yearly plan)
      endDate.setFullYear(endDate.getFullYear() + 1);

      // Future plan intervals (commented out for now):
      // switch (plan.interval.toLowerCase()) {
      //   case "monthly":
      //     endDate.setMonth(endDate.getMonth() + 1);
      //     break;
      //   case "quarterly":
      //     endDate.setMonth(endDate.getMonth() + 3);
      //     break;
      //   case "yearly":
      //   case "annual":
      //     endDate.setFullYear(endDate.getFullYear() + 1);
      //     break;
      //   default:
      //     endDate.setFullYear(endDate.getFullYear() + 1);
      // }

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

      return subscription;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw new Error("Failed to create subscription");
    }
  },
};

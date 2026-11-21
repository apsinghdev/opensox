import { rz_instance } from "../clients/razorpay.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import crypto from "crypto";
import prismaModule from "../prisma.js";
import {
  SUBSCRIPTION_STATUS,
  PAYMENT_STATUS,
} from "../constants/subscription.js";
import { discordService } from "./discord.service.js";
import { emailService } from "./email.service.js";
import {
  addCalendarMonths,
  membershipChangeForPurchase,
  subscriptionIdsToComplete,
  type MembershipAction,
} from "../lib/membership-term.js";
import { lockUserMembership } from "../lib/user-membership-lock.js";
import {
  checkoutAmountForMember,
  memberDiscountReason,
  returningMemberFilters,
  type MemberDiscountReason,
} from "../lib/returning-member-price.js";

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

/** Thrown when another delivery already claimed this payment. The transaction rolls back. */
class PaymentAlreadyLinkedError extends Error {
  constructor() {
    super("payment already linked to a subscription");
    this.name = "PaymentAlreadyLinkedError";
  }
}

type PaymentClaimClient = {
  payment: {
    updateMany: (args: {
      where: { id: string; subscriptionId: null };
      data: { subscriptionId: string };
    }) => Promise<{ count: number }>;
  };
};

// one payment may fund only one subscription. a plain update would let two
// deliveries both create a row and then overwrite the link.
async function claimPaymentLink(
  tx: PaymentClaimClient,
  paymentId: string,
  subscriptionId: string,
) {
  const claimed = await tx.payment.updateMany({
    where: { id: paymentId, subscriptionId: null },
    data: { subscriptionId },
  });
  if (claimed.count !== 1) {
    throw new PaymentAlreadyLinkedError();
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

interface PaymentRecordResult {
  payment: any;
  wasCreated: boolean;
}

interface SubscriptionResult {
  subscription: any;
  wasCreated: boolean;
}

interface FulfillPaymentInput {
  userId: string;
  planId: string;
  paymentData: PaymentData;
  sendConfirmationEmail?: boolean;
}

export interface CheckoutQuote {
  amount: number;
  currency: string;
  discounted: boolean;
  listPrice: number;
  discountReason: MemberDiscountReason;
  action: MembershipAction;
  /** false when the plan is shorter than the live membership */
  available: boolean;
  /** resulting expiry when the purchase is allowed */
  nextEndDate: string | null;
}

export class CheckoutVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckoutVerificationError";
  }
}

const ACCEPTABLE_PAYMENT_STATUSES = new Set(["captured", "authorized"]);

function noteValue(notes: unknown, key: string): string | null {
  if (!notes || typeof notes !== "object" || Array.isArray(notes)) {
    return null;
  }

  const value = (notes as Record<string, unknown>)[key];
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function minorAmount(value: unknown): number | null {
  const amount = typeof value === "string" ? Number(value) : value;
  if (typeof amount !== "number" || !Number.isInteger(amount) || amount <= 0) {
    return null;
  }
  return amount;
}

const DEFAULT_PREMIUM_EMAIL_NAME = "there";
const IST_OFFSET = "+05:30";

function padMonthOrDay(value: number): string {
  return String(value).padStart(2, "0");
}

function getCurrentMonthBoundsIst(now = new Date()): { start: Date; end: Date } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
  }).formatToParts(now);

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);

  const start = new Date(
    `${year}-${padMonthOrDay(month)}-01T00:00:00${IST_OFFSET}`
  );
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const end = new Date(
    `${nextYear}-${padMonthOrDay(nextMonth)}-01T00:00:00${IST_OFFSET}`
  );

  return { start, end };
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
   * Live membership qualifies for the extend/upgrade price. A lapsed one
   * qualifies for the rejoin price. Never subscribed is full price.
   */
  async resolveMemberDiscount(userId: string): Promise<{
    reason: MemberDiscountReason;
    live: {
      endDate: Date | null;
      plan: { durationMonths?: number | null; interval?: string | null };
    } | null;
  }> {
    const { active, prior } = returningMemberFilters(userId);
    const [live, previous] = await Promise.all([
      prisma.subscription.findFirst({
        where: active,
        include: { plan: true },
        orderBy: { endDate: "desc" },
      }),
      prisma.subscription.findFirst({ where: prior, select: { id: true } }),
    ]);

    return {
      reason: memberDiscountReason(Boolean(live), Boolean(previous)),
      live: live
        ? { endDate: live.endDate, plan: live.plan }
        : null,
    };
  },

  async quotePlanForUser(
    userId: string,
    plan: {
      price: number;
      currency: string;
      durationMonths?: number | null;
      interval?: string | null;
    }
  ): Promise<CheckoutQuote> {
    const pricing = await this.resolveMemberDiscount(userId);
    const quote = checkoutAmountForMember(
      plan.price,
      plan.currency,
      pricing.reason !== "none"
    );
    const change = membershipChangeForPurchase({
      now: new Date(),
      currentEnd: pricing.live?.endDate ?? null,
      currentDurationMonths: pricing.live
        ? resolvePlanDurationMonths(pricing.live.plan)
        : null,
      purchasedDurationMonths: resolvePlanDurationMonths(plan),
    });
    const available = change.action !== "blocked";

    return {
      amount: quote.amount,
      currency: plan.currency,
      discounted: quote.discounted,
      listPrice: plan.price,
      discountReason: pricing.reason,
      action: change.action,
      available,
      nextEndDate: available ? change.endDate.toISOString() : null,
    };
  },

  /**
   * The client chooses which plan id to send with a payment. Bind the captured
   * payment to the order this server created. The order amount is that quote
   * and does not follow a later catalog price change.
   */
  async assertPaymentMatchesOrder(input: {
    userId: string;
    planId: string;
    orderId: string;
    paymentId: string;
  }): Promise<{ amount: number; currency: string }> {
    const plan = await prisma.plan.findUnique({
      where: { id: input.planId },
    });

    if (!plan?.price || !plan.currency) {
      throw new CheckoutVerificationError("Plan not found for payment");
    }

    let order: {
      id?: string;
      amount?: number | string;
      currency?: string;
      notes?: unknown;
    };
    let payment: {
      order_id?: string;
      amount?: number | string;
      currency?: string;
      status?: string;
    };

    try {
      order = await rz_instance.orders.fetch(input.orderId);
      payment = await rz_instance.payments.fetch(input.paymentId);
    } catch (error) {
      console.error(
        JSON.stringify({
          level: "error",
          service: "paymentService",
          event: "razorpay_payment_fetch_failed",
          timestamp: new Date().toISOString(),
          userId: input.userId,
          planId: input.planId,
          orderId: input.orderId,
          paymentId: input.paymentId,
          errorMessage: error instanceof Error ? error.message : String(error),
        })
      );
      throw new Error("Failed to fetch payment from Razorpay");
    }

    const orderAmount = minorAmount(order?.amount);
    const paymentAmount = minorAmount(payment?.amount);
    const reasons: string[] = [];

    if (order?.id !== input.orderId || payment?.order_id !== input.orderId) {
      reasons.push("order_mismatch");
    }
    if (
      orderAmount === null ||
      paymentAmount === null ||
      orderAmount !== paymentAmount
    ) {
      reasons.push("amount_mismatch");
    }
    if (
      String(order?.currency ?? "").toUpperCase() !==
      plan.currency.toUpperCase()
    ) {
      reasons.push("currency");
    }
    if (!ACCEPTABLE_PAYMENT_STATUSES.has(String(payment?.status ?? ""))) {
      reasons.push("status");
    }
    if (noteValue(order?.notes, "user_id") !== input.userId) {
      reasons.push("user");
    }
    if (noteValue(order?.notes, "plan_id") !== input.planId) {
      reasons.push("plan");
    }

    if (reasons.length > 0 || paymentAmount === null) {
      console.error(
        JSON.stringify({
          level: "error",
          service: "paymentService",
          event: "checkout_payment_rejected",
          timestamp: new Date().toISOString(),
          userId: input.userId,
          planId: input.planId,
          orderId: input.orderId,
          paymentId: input.paymentId,
          reasons,
        })
      );
      throw new CheckoutVerificationError("Payment could not be verified");
    }

    return { amount: paymentAmount, currency: plan.currency };
  },

  /**
   * distinct users who started a pro subscription in the current calendar month (ist)
   */
  async countProMembersJoinedThisMonth(): Promise<number> {
    const { start, end } = getCurrentMonthBoundsIst();
    const maxRetries = 2;
    const baseDelayMs = 100;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await prisma.user.count({
          where: {
            subscriptions: {
              some: {
                startDate: {
                  gte: start,
                  lt: end,
                },
              },
            },
          },
        });
      } catch (error) {
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
              operation: "countProMembersJoinedThisMonth",
              event: "prisma.user.count_failed",
              timestamp: new Date().toISOString(),
              attempt: attempt + 1,
              maxAttempts: maxRetries + 1,
              transient,
              prismaCode,
              errorMessage:
                error instanceof Error ? error.message : String(error),
            })
          );
          throw new Error("Failed to count pro members joined this month");
        }

        const delayMs = baseDelayMs * Math.pow(2, attempt);
        console.warn(
          JSON.stringify({
            level: "warn",
            service: "paymentService",
            operation: "countProMembersJoinedThisMonth",
            event: "prisma.user.count_retry",
            timestamp: new Date().toISOString(),
            attempt: attempt + 1,
            retryInMs: delayMs,
          })
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    throw new Error("Failed to count pro members joined this month");
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
  ): Promise<PaymentRecordResult> {
    try {
      // Check if payment already exists (idempotency)
      const existingPayment = await prisma.payment.findUnique({
        where: { razorpayPaymentId: paymentData.razorpayPaymentId },
      });

      if (existingPayment) {
        return {
          payment: existingPayment,
          wasCreated: false,
        };
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

      return {
        payment,
        wasCreated: true,
      };
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
  ): Promise<SubscriptionResult> {
    try {
      // Get plan details
      const plan = await prisma.plan.findUnique({
        where: { id: planId },
      });

      if (!plan) {
        throw new Error("Plan not found");
      }

      // Prefer the plan's durationMonths; fall back to the interval string so
      // older plans without a duration still resolve to a sensible length.
      const durationMonths = resolvePlanDurationMonths(plan);

      // The lock, the payment-link lookup, and the expiry math run again
      // together when another delivery claims this payment first.
      const fulfillOnce = () =>
        prisma.$transaction(
          async (tx) => {
            await lockUserMembership(tx, userId);

            const existingSubscription = await tx.subscription.findFirst({
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
              return {
                subscription: existingSubscription,
                wasCreated: false,
              };
            }

            const startDate = new Date();
            const freshEndDate = addCalendarMonths(startDate, durationMonths);
            const liveSubscriptions = await tx.subscription.findMany({
              where: {
                userId,
                status: SUBSCRIPTION_STATUS.ACTIVE,
                endDate: { gte: startDate },
              },
              include: { plan: true },
            });
            const primary = [...liveSubscriptions].sort((a, b) => {
              const aEnd = a.endDate?.getTime() ?? Number.NEGATIVE_INFINITY;
              const bEnd = b.endDate?.getTime() ?? Number.NEGATIVE_INFINITY;
              return bEnd - aEnd;
            })[0];

            if (!primary) {
              const created = await tx.subscription.create({
                data: {
                  userId,
                  planId,
                  status: SUBSCRIPTION_STATUS.ACTIVE,
                  startDate,
                  endDate: freshEndDate,
                  autoRenew: true,
                },
              });

              await claimPaymentLink(tx, paymentId, created.id);

              return {
                subscription: created,
                wasCreated: true,
              };
            }

            const change = membershipChangeForPurchase({
              now: startDate,
              currentEnd: primary.endDate,
              currentDurationMonths: resolvePlanDurationMonths(primary.plan),
              purchasedDurationMonths: durationMonths,
            });

            // a captured payment for a shorter plan still buys time. checkout
            // refuses that order, so this only covers a payment already taken.
            const keepLongerPlan = change.action !== "upgrade";
            const endDate =
              change.action === "blocked"
                ? addCalendarMonths(primary.endDate ?? startDate, durationMonths)
                : change.action === "join"
                  ? freshEndDate
                  : change.endDate;

            const updated = await tx.subscription.update({
              where: { id: primary.id },
              data: {
                planId: keepLongerPlan ? primary.planId : planId,
                endDate,
                status: SUBSCRIPTION_STATUS.ACTIVE,
              },
            });

            const extraIds = subscriptionIdsToComplete(
              liveSubscriptions.map((row) => ({
                id: row.id,
                endDate: row.endDate,
                durationMonths: resolvePlanDurationMonths(row.plan),
              })),
            );
            if (extraIds.length > 0) {
              await tx.subscription.updateMany({
                where: { id: { in: extraIds } },
                data: { status: SUBSCRIPTION_STATUS.COMPLETED },
              });
            }

            await claimPaymentLink(tx, paymentId, updated.id);

            return {
              subscription: updated,
              wasCreated: false,
            };
          },
          { timeout: 15000 },
        );

      let subscriptionResult: Awaited<ReturnType<typeof fulfillOnce>> | undefined;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          subscriptionResult = await fulfillOnce();
          break;
        } catch (error) {
          if (error instanceof PaymentAlreadyLinkedError && attempt < 3) {
            continue;
          }
          throw error;
        }
      }
      if (!subscriptionResult) {
        throw new Error("Failed to create subscription");
      }
      const { subscription, wasCreated } = subscriptionResult;

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

      return {
        subscription,
        wasCreated,
      };
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw new Error("Failed to create subscription");
    }
  },

  async fulfillPayment(input: FulfillPaymentInput): Promise<{
    payment: any;
    subscription: any;
    emailSent: boolean;
  }> {
    const { userId, planId, paymentData, sendConfirmationEmail = true } = input;

    const { payment } = await this.createPaymentRecord(userId, paymentData);
    const { subscription, wasCreated: subscriptionWasCreated } =
      await this.createSubscription(userId, planId, payment.id);

    let emailSent = false;

    // the onboarding email asks them to book a first call, so only a new membership sends it
    if (sendConfirmationEmail && subscriptionWasCreated) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true, firstName: true },
        });

        if (user?.email) {
          const firstName =
            user.firstName?.trim() || DEFAULT_PREMIUM_EMAIL_NAME;

          emailSent = await emailService.sendPremiumSubscriptionEmail(
            user.email,
            firstName
          );
        } else {
          console.warn(
            JSON.stringify({
              level: "warn",
              service: "paymentService",
              event: "premium_email_dispatch_skipped",
              timestamp: new Date().toISOString(),
              userId,
              planId,
              razorpayPaymentId: paymentData.razorpayPaymentId,
              razorpayOrderId: paymentData.razorpayOrderId,
              userFound: Boolean(user),
              hasEmail: Boolean(user?.email),
              firstNameFallbackUsed: !Boolean(user?.firstName?.trim()),
              message:
                "user not found or missing email for premium confirmation email",
            })
          );
        }
      } catch (error) {
        console.error(
          JSON.stringify({
            level: "error",
            service: "paymentService",
            event: "premium_email_dispatch_failed",
            timestamp: new Date().toISOString(),
            userId,
            planId,
            razorpayPaymentId: paymentData.razorpayPaymentId,
            razorpayOrderId: paymentData.razorpayOrderId,
            errorMessage: error instanceof Error ? error.message : String(error),
          })
        );
      }
    }

    return { payment, subscription, emailSent };
  },
};

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { PrismaClient } from "@prisma/client";
import type { ExtendedPrismaClient } from "../prisma.js";
import { PAYMENT_STATUS } from "../constants/subscription.js";
import { paymentService } from "./payment.service.js";
import { emailService } from "./email.service.js";

type Db = ExtendedPrismaClient | PrismaClient;

export const TALK_TO_ME_PRODUCT = "talk_to_me";

const DEFAULT_AMOUNT_PAISE = 169900; // ₹1,699
const DEFAULT_CURRENCY = "INR";
const DEFAULT_DURATION_MINUTES = 60;
const DEFAULT_PRODUCT_NAME = "talk to me — 1-on-1 with jackedAJ";
const DEFAULT_CAL_URL = "https://cal.com/ajeetunc/1-on-1";
const DEFAULT_CONFIRM_BASE_URL = "https://www.jackedaj.com";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export function getTalkToMeConfig() {
  const amount = parsePositiveInt(
    process.env.TALK_TO_ME_AMOUNT,
    DEFAULT_AMOUNT_PAISE
  );
  const currency = (
    process.env.TALK_TO_ME_CURRENCY || DEFAULT_CURRENCY
  ).toUpperCase();
  const durationMinutes = parsePositiveInt(
    process.env.TALK_TO_ME_DURATION_MINUTES,
    DEFAULT_DURATION_MINUTES
  );
  const productName =
    process.env.TALK_TO_ME_PRODUCT_NAME?.trim() || DEFAULT_PRODUCT_NAME;
  const calUrl =
    process.env.TALK_TO_ME_CAL_URL?.trim() || DEFAULT_CAL_URL;
  const confirmBaseUrl = stripTrailingSlash(
    process.env.TALK_TO_ME_CONFIRM_BASE_URL || DEFAULT_CONFIRM_BASE_URL
  );
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "";

  return {
    amount,
    currency,
    durationMinutes,
    productName,
    calUrl,
    confirmBaseUrl,
    razorpayKeyId,
  };
}

export function talkToMeConfirmRedirectUrl(): string {
  return `${getTalkToMeConfig().confirmBaseUrl}/talk-to-me-confirmed.html`;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ").slice(0, 80);
}

export const talkToMeService = {
  getPublicConfig() {
    const config = getTalkToMeConfig();
    return {
      amount: config.amount,
      currency: config.currency,
      durationMinutes: config.durationMinutes,
      productName: config.productName,
      razorpayKeyId: config.razorpayKeyId,
    };
  },

  async createOrder(
    db: Db,
    input: { email: string; name: string }
  ): Promise<
    | {
        ok: true;
        orderId: string;
        amount: number;
        currency: string;
        razorpayKeyId: string;
        productName: string;
        purchaseId: string;
      }
    | { ok: false; error: string }
  > {
    const email = normalizeEmail(input.email);
    const name = normalizeName(input.name);

    if (!email || !name) {
      return { ok: false, error: "name and email are required" };
    }

    const config = getTalkToMeConfig();
    if (!config.razorpayKeyId) {
      return { ok: false, error: "payments are not configured" };
    }

    // create a pending row first so we have a stable purchase id in razorpay notes
    const purchase = await db.talkToMePurchase.create({
      data: {
        email,
        name,
        amount: config.amount,
        currency: config.currency,
        status: PAYMENT_STATUS.CREATED,
      },
    });

    const receipt = `ttm_${purchase.id.slice(-12)}_${Date.now()}`
      .replace(/[^a-zA-Z0-9_]/g, "")
      .slice(0, 40);

    const order = await paymentService.createOrder({
      amount: config.amount,
      currency: config.currency,
      receipt,
      notes: {
        product: TALK_TO_ME_PRODUCT,
        purchase_id: purchase.id,
        email,
        name: name.slice(0, 100),
      },
    });

    if ("error" in order) {
      await db.talkToMePurchase
        .delete({ where: { id: purchase.id } })
        .catch(() => undefined);
      return {
        ok: false,
        error: order.error.description || "failed to create payment order",
      };
    }

    await db.talkToMePurchase.update({
      where: { id: purchase.id },
      data: { razorpayOrderId: order.id },
    });

    return {
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      razorpayKeyId: config.razorpayKeyId,
      productName: config.productName,
      purchaseId: purchase.id,
    };
  },

  async fulfillPaidOrder(input: {
    db: Db;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    amount?: number;
    currency?: string;
    sendEmail?: boolean;
  }): Promise<{ ok: true; alreadyPaid: boolean } | { ok: false; error: string }> {
    const {
      db,
      razorpayOrderId,
      razorpayPaymentId,
      amount,
      currency,
      sendEmail = true,
    } = input;

    const purchase = await db.talkToMePurchase.findUnique({
      where: { razorpayOrderId },
    });

    if (!purchase) {
      return { ok: false, error: "purchase not found" };
    }

    if (
      purchase.status === PAYMENT_STATUS.CAPTURED &&
      purchase.razorpayPaymentId
    ) {
      // idempotent: still try email if prior attempt never sent
      if (sendEmail && !purchase.emailSentAt) {
        await this.sendConfirmationEmail(db, purchase.id);
      }
      return { ok: true, alreadyPaid: true };
    }

    if (typeof amount === "number" && amount !== purchase.amount) {
      return { ok: false, error: "amount mismatch" };
    }

    if (
      typeof currency === "string" &&
      currency.toUpperCase() !== purchase.currency.toUpperCase()
    ) {
      return { ok: false, error: "currency mismatch" };
    }

    try {
      await db.talkToMePurchase.update({
        where: { id: purchase.id },
        data: {
          razorpayPaymentId,
          status: PAYMENT_STATUS.CAPTURED,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // another request already linked this payment id
        return { ok: true, alreadyPaid: true };
      }
      throw error;
    }

    if (sendEmail) {
      await this.sendConfirmationEmail(db, purchase.id);
    }

    return { ok: true, alreadyPaid: false };
  },

  async verifyAndFulfill(
    db: Db,
    input: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }
  ): Promise<
    | { ok: true; redirectUrl: string }
    | { ok: false; error: string }
  > {
    const isValid = paymentService.verifyPaymentSignature(
      input.razorpay_order_id,
      input.razorpay_payment_id,
      input.razorpay_signature
    );

    if (!isValid) {
      return { ok: false, error: "invalid payment signature" };
    }

    const result = await this.fulfillPaidOrder({
      db,
      razorpayOrderId: input.razorpay_order_id,
      razorpayPaymentId: input.razorpay_payment_id,
      sendEmail: true,
    });

    if (!result.ok) {
      return result;
    }

    return { ok: true, redirectUrl: talkToMeConfirmRedirectUrl() };
  },

  async sendConfirmationEmail(db: Db, purchaseId: string): Promise<boolean> {
    const purchase = await db.talkToMePurchase.findUnique({
      where: { id: purchaseId },
    });

    if (!purchase?.email) {
      return false;
    }

    if (purchase.emailSentAt) {
      return true;
    }

    const { calUrl, durationMinutes } = getTalkToMeConfig();

    try {
      const sent = await emailService.sendTalkToMeConfirmationEmail({
        email: purchase.email,
        name: purchase.name,
        calUrl,
        durationMinutes,
      });

      if (sent) {
        await db.talkToMePurchase.update({
          where: { id: purchaseId },
          data: { emailSentAt: new Date() },
        });
      }

      return sent;
    } catch (error) {
      console.error(
        JSON.stringify({
          level: "error",
          service: "talkToMeService",
          event: "confirmation_email_failed",
          timestamp: new Date().toISOString(),
          purchaseId,
          errorMessage: error instanceof Error ? error.message : String(error),
        })
      );
      return false;
    }
  },
};

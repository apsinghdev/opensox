/**
 * Subscription status constants matching Prisma SubscriptionStatus enum
 * These are readonly string literals for type safety
 */
export const SUBSCRIPTION_STATUS = {
  CREATED: "created",
  AUTHENTICATED: "authenticated",
  ACTIVE: "active",
  PENDING: "pending",
  HALTED: "halted",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  EXPIRED: "expired",
} as const;

/**
 * Payment status constants matching Prisma PaymentStatus enum
 * These are readonly string literals for type safety
 */
export const PAYMENT_STATUS = {
  CREATED: "created",
  AUTHORIZED: "authorized",
  CAPTURED: "captured",
  REFUNDED: "refunded",
  FAILED: "failed",
} as const;

/**
 * Type for subscription status values
 */
export type SubscriptionStatusValue =
  (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

/**
 * Type for payment status values
 */
export type PaymentStatusValue =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

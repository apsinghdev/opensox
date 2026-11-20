import { SUBSCRIPTION_STATUS } from "../constants/subscription.js";

export const RETURNING_MEMBER_DISCOUNT_PERCENT = 10;

/** Razorpay rejects orders below these amounts, in minor units. */
const RAZORPAY_MINIMUM_MINOR_UNITS: Record<string, number> = {
  INR: 100,
};

export function minimumCheckoutAmount(currency: string): number {
  return RAZORPAY_MINIMUM_MINOR_UNITS[currency.toUpperCase()] ?? 100;
}

/**
 * Returning members pay 10% less, unless that would fall under the gateway
 * minimum. The ₹1 test plan is the case that hits the floor: 90 paise is
 * rejected, so the list price is charged instead.
 */
export function checkoutAmountForMember(
  listPrice: number,
  currency: string,
  returning: boolean
): { amount: number; discounted: boolean } {
  if (!returning) {
    return { amount: listPrice, discounted: false };
  }

  const discountedAmount = returningMemberAmount(listPrice);
  if (discountedAmount < minimumCheckoutAmount(currency)) {
    return { amount: listPrice, discounted: false };
  }

  return { amount: discountedAmount, discounted: true };
}

/**
 * 10% off the list price, in the same minor units Razorpay charges (paise).
 * Rounded to the nearest minor unit so the order amount stays an integer.
 */
export function returningMemberAmount(listPrice: number): number {
  if (!Number.isInteger(listPrice) || listPrice <= 0) {
    throw new Error("Plan price must be a positive integer");
  }

  const discount = Math.round(
    (listPrice * RETURNING_MEMBER_DISCOUNT_PERCENT) / 100
  );
  const amount = listPrice - discount;

  if (amount <= 0) {
    throw new Error("Discounted amount must be positive");
  }

  return amount;
}

/** Full price and the returning-member price, dropping any amount the gateway would reject. */
export function allowedCheckoutAmounts(
  listPrice: number,
  currency: string
): number[] {
  const discounted = returningMemberAmount(listPrice);
  const amounts = discounted === listPrice ? [listPrice] : [listPrice, discounted];
  const minimum = minimumCheckoutAmount(currency);
  return amounts.filter((amount) => amount >= minimum);
}

/**
 * A returning member has no live subscription, and a previous one that has
 * ended. Includes an active row whose end date has already passed, so the
 * discount still applies if the expire job has not run yet.
 */
export function returningMemberFilters(userId: string, now = new Date()) {
  return {
    active: {
      userId,
      status: SUBSCRIPTION_STATUS.ACTIVE,
      endDate: { gte: now },
    },
    prior: {
      userId,
      OR: [
        {
          status: {
            in: [SUBSCRIPTION_STATUS.EXPIRED, SUBSCRIPTION_STATUS.COMPLETED],
          },
        },
        {
          status: SUBSCRIPTION_STATUS.ACTIVE,
          endDate: { lt: now },
        },
      ],
    },
  };
}

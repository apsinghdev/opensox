export type MembershipAction = "join" | "extend" | "upgrade" | "blocked";

/**
 * Add calendar months, clamping month-end dates into the target month.
 * Jan 31 plus one month lands on Feb 28 (or Feb 29), not March.
 */
export function addCalendarMonths(date: Date, months: number): Date {
  const endDate = new Date(date);
  const monthsFromYearStart = endDate.getMonth() + months;
  const targetYear =
    endDate.getFullYear() + Math.floor(monthsFromYearStart / 12);
  const targetMonth = ((monthsFromYearStart % 12) + 12) % 12;
  endDate.setFullYear(targetYear, targetMonth, endDate.getDate());
  if (endDate.getMonth() !== targetMonth) {
    endDate.setDate(0);
  }
  return endDate;
}

/**
 * How a purchase changes the membership the user already has.
 * Extend appends the purchased months onto the current expiry.
 * Upgrade switches to the longer plan and appends that plan's length
 * onto the current expiry as well.
 * A shorter plan is blocked before checkout. A captured payment for one still
 * appends time in fulfillment and leaves the longer plan in place.
 */
export function membershipChangeForPurchase(input: {
  now: Date;
  currentEnd: Date | null;
  currentDurationMonths: number | null;
  purchasedDurationMonths: number;
}): { action: MembershipAction; endDate: Date } {
  const { now, currentEnd, currentDurationMonths, purchasedDurationMonths } =
    input;

  if (!currentEnd || currentDurationMonths === null) {
    return {
      action: "join",
      endDate: addCalendarMonths(now, purchasedDurationMonths),
    };
  }

  if (purchasedDurationMonths > currentDurationMonths) {
    return {
      action: "upgrade",
      endDate: addCalendarMonths(currentEnd, purchasedDurationMonths),
    };
  }

  if (purchasedDurationMonths < currentDurationMonths) {
    return {
      action: "blocked",
      endDate: new Date(currentEnd),
    };
  }

  return {
    action: "extend",
    endDate: addCalendarMonths(currentEnd, purchasedDurationMonths),
  };
}

export type ConsolidatableSubscription = {
  id: string;
  endDate: Date | null;
  durationMonths: number;
};

/**
 * A purchase is applied to the live row that ends latest.
 * Same-or-lower tiers that end sooner are completed, so that earlier expiry
 * cannot remove Discord while the longer row is still active.
 * A higher tier that ends sooner stays live through its own endDate.
 * Completing it now would drop benefits that were paid for until then.
 * The expire job must leave Discord in place when another live row remains.
 */
export function subscriptionIdsToComplete(
  rows: ConsolidatableSubscription[],
): string[] {
  if (rows.length <= 1) return [];

  const surviving = rows.reduce((latest, row) => {
    const latestEnd = latest.endDate?.getTime() ?? Number.NEGATIVE_INFINITY;
    const rowEnd = row.endDate?.getTime() ?? Number.NEGATIVE_INFINITY;
    return rowEnd > latestEnd ? row : latest;
  });

  return rows
    .filter(
      (row) =>
        row.id !== surviving.id &&
        row.durationMonths <= surviving.durationMonths,
    )
    .map((row) => row.id);
}

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

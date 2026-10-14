/**
 * Date utility functions for consistent timezone-normalized date comparisons
 */

export type ProgramStatus = "Active" | "Upcoming" | "Historical" | "TBD";

/**
 * Normalizes a date string or Date to a UTC midnight timestamp for consistent comparisons
 * This eliminates timezone sensitivity by converting all dates to UTC midnight
 * @param dateInput - Date string or Date object to normalize
 * @returns Date object set to UTC midnight of the input date
 */
export function normalizeToUTCMidnight(dateInput: string | Date): Date {
  const date = new Date(dateInput);
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0, 0, 0, 0 // UTC midnight
  ));
}

/**
 * Gets the current date normalized to UTC midnight for consistent comparisons
 * @returns Date object set to UTC midnight of today
 */
export function getTodayUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0 // UTC midnight
  ));
}

/**
 * Determines the derived status of a program based on application dates
 * Uses timezone-normalized date comparisons for consistency
 * @param applicationStart - Program start date string
 * @param applicationEnd - Program end date string
 * @returns Program status string
 */
export function getDerivedStatus(
  applicationStart?: string,
  applicationEnd?: string
): ProgramStatus {
  if (!applicationStart || !applicationEnd) {
    return "TBD";
  }

  const today = getTodayUTC();
  const start = normalizeToUTCMidnight(applicationStart);
  const end = normalizeToUTCMidnight(applicationEnd);

  if (today >= start && today <= end) return "Active";
  if (today < start) return "Upcoming";
  return "Historical";
}

/**
 * Checks if a program matches the selected status filters based on application dates
 * Uses timezone-normalized date comparisons for consistency
 * @param applicationStart - Program start date string
 * @param applicationEnd - Program end date string
 * @param selectedStatuses - Array of status strings to filter by
 * @returns true if program matches any selected status, false otherwise
 */
export function matchesStatusFilters(
  applicationStart: string | undefined,
  applicationEnd: string | undefined,
  selectedStatuses: string[]
): boolean {
  if (selectedStatuses.length === 0) return true;

  // Check for TBD status first (programs with missing dates)
  if (selectedStatuses.includes("TBD")) {
    if (!applicationStart || !applicationEnd) return true;
  }

  // If dates are missing and TBD is not selected, this program can't match other statuses
  if (!applicationStart || !applicationEnd) return false;

  const derivedStatus = getDerivedStatus(applicationStart, applicationEnd);
  return selectedStatuses.includes(derivedStatus);
}

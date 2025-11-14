import { Newsletter } from "@/types/newsletter";

/**
 * Groups newsletters by month and year
 * @param newslettersList - Array of newsletters to group
 * @returns Object with month-year keys and arrays of newsletters
 */
export const groupByMonth = (newslettersList: Newsletter[]) => {
  const groups: { [key: string]: Newsletter[] } = {};

  newslettersList.forEach((newsletter) => {
    const date = new Date(newsletter.date);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date for newsletter ${newsletter.id}: ${newsletter.date}`);
      return;
    }
    const monthYear = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(newsletter);
  });

  Object.keys(groups).forEach((key) => {
    groups[key].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  return groups;
};

/**
 * Sorts month keys by date (newest first)
 * Uses reliable date parsing by splitting month and year components
 * @param keys - Array of month-year strings (e.g., "November 2024")
 * @returns Sorted array of month-year strings
 */
export const sortMonthKeys = (keys: string[]): string[] => {
  return keys.sort((a, b) => {
    // Parse month and year separately for reliable date parsing
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateB.getTime() - dateA.getTime();
  });
};


/**
 * Gets unique months from newsletters array
 * @param newsletters - Array of newsletters
 * @returns Sorted array of unique month-year strings
 */
export const getAvailableMonths = (newsletters: Newsletter[]): string[] => {
  const months = newsletters.map((n) => {
    const date = new Date(n.date);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  });

  const uniqueMonths = Array.from(new Set(months));
  return sortMonthKeys(uniqueMonths);
};


/**
 * Formats a date string to a readable format
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "November 15, 2024")
 */
export const formatNewsletterDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};


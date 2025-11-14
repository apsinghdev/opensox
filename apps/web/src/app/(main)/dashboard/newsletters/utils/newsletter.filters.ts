import { Newsletter, NewsletterContentItem } from "@/types/newsletter";

/**
 * Checks if a newsletter matches the search query
 * @param newsletter - Newsletter to check
 * @param query - Search query (lowercase)
 * @returns True if newsletter matches the query
 */
const matchesSearchQuery = (newsletter: Newsletter, query: string): boolean => {
  const matchesBasicFields =
    newsletter.title.toLowerCase().includes(query) ||
    newsletter.excerpt.toLowerCase().includes(query) ||
    newsletter.author?.toLowerCase().includes(query);

  const matchesContent = newsletter.content?.some((item: NewsletterContentItem) => {
    if (item.type === "paragraph" || item.type === "heading" || item.type === "bold") {
      return item.content?.toLowerCase().includes(query);
    }
    if (item.type === "link") {
      return (
        item.text?.toLowerCase().includes(query) ||
        item.url?.toLowerCase().includes(query)
      );
    }
    return false;
  });

  return matchesBasicFields || matchesContent || false;
};

/**
 * Checks if a newsletter matches the selected month filter
 * @param newsletter - Newsletter to check
 * @param selectedMonth - Selected month-year string or "all"
 * @returns True if newsletter matches the month filter
 */
const matchesMonthFilter = (
  newsletter: Newsletter,
  selectedMonth: string
): boolean => {
  if (selectedMonth === "all") return true;

  const date = new Date(newsletter.date);
  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return monthYear === selectedMonth;
};


/**
 * Filters newsletters based on search query and month
 * @param newsletters - Array of newsletters to filter
 * @param searchQuery - Search query string
 * @param selectedMonth - Selected month filter ("all" or month-year string)
 * @returns Filtered array of newsletters
 */
export const filterNewsletters = (
  newsletters: Newsletter[],
  searchQuery: string,
  selectedMonth: string
): Newsletter[] => {
  let filtered = newsletters;

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((newsletter) =>
      matchesSearchQuery(newsletter, query)
    );
  }

  filtered = filtered.filter((newsletter) =>
    matchesMonthFilter(newsletter, selectedMonth)
  );

  return filtered;
};


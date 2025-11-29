import { useMemo } from "react";
import { Newsletter } from "@/components/newsletters/NewsletterCard";
import { TimeFilter } from "@/components/newsletters/NewsletterFilters";

export function useNewsletterFilters(
  newsletters: Newsletter[],
  searchQuery: string,
  timeFilter: TimeFilter
) {
  return useMemo(() => {
    let filtered = [...newsletters];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (newsletter) =>
          newsletter.title.toLowerCase().includes(query) ||
          newsletter.description?.toLowerCase().includes(query) ||
          newsletter.excerpt?.toLowerCase().includes(query)
      );
    }

    // Apply time filter
    if (timeFilter !== "all") {
      filtered = filtered.filter((newsletter) => {
        const date = new Date(newsletter.date);
        const month = date.toLocaleString("en-US", { month: "long" }).toLowerCase();
        return month === timeFilter;
      });
    }

    return filtered;
  }, [newsletters, searchQuery, timeFilter]);
}

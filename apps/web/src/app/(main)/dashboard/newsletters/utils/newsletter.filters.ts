import { Newsletter, NewsletterContentItem } from "@/types/newsletter";

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


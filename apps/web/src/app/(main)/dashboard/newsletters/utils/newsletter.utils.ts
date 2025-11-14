import { Newsletter } from "@/types/newsletter";

export const groupByMonth = (newslettersList: Newsletter[]) => {
  const groups: { [key: string]: Newsletter[] } = {};

  newslettersList.forEach((newsletter) => {
    const date = new Date(newsletter.date);
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

export const sortMonthKeys = (keys: string[]): string[] => {
  return keys.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });
};


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


export const formatNewsletterDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};


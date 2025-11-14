"use client";

import { Newsletter } from "@/types/newsletter";
import NewsletterCard from "./NewsletterCard";
import { groupByMonth, sortMonthKeys } from "../utils/newsletter.utils";
import { GeistSans } from "geist/font/sans";

interface NewsletterListProps {
  newsletters: Newsletter[];
}

export default function NewsletterList({ newsletters }: NewsletterListProps) {
  const groupedNewsletters = groupByMonth(newsletters);
  const sortedMonths = sortMonthKeys(Object.keys(groupedNewsletters));

  if (newsletters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No newsletters yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sortedMonths.map((monthYear) => (
        <div key={monthYear}>
          <h2
            className={`text-2xl font-semibold text-foreground mb-6 pb-2 border-b border-border ${GeistSans.className}`}
          >
            {monthYear}
          </h2>
          <div className="space-y-6">
            {groupedNewsletters[monthYear].map((newsletter) => (
              <NewsletterCard key={newsletter.id} newsletter={newsletter} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


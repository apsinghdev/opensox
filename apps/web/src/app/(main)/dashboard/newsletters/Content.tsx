"use client";

import { useState, useMemo } from "react";
import { Newsletter } from "@/types/newsletter";
import { GeistSans } from "geist/font/sans";
import { getAvailableMonths } from "./utils/newsletter.utils";
import { filterNewsletters } from "./utils/newsletter.filters";
import NewsletterFilters from "./components/NewsletterFilters";
import NewsletterList from "./components/NewsletterList";
import NewsletterEmptyState from "./components/NewsletterEmptyState";

interface NewslettersProps {
  newsletters: Newsletter[];
}

export default function Newsletters({ newsletters }: NewslettersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const availableMonths = useMemo(
    () => getAvailableMonths(newsletters),
    [newsletters]
  );

  const filteredNewsletters = useMemo(
    () => filterNewsletters(newsletters, searchQuery, selectedMonth),
    [newsletters, searchQuery, selectedMonth]
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedMonth("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedMonth !== "all";

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1
            className={`text-4xl font-bold text-foreground mb-4 ${GeistSans.className}`}
          >
            Newsletters
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest features, tips, and insights from
            opensox.ai
          </p>
        </div>
        <NewsletterFilters
          searchQuery={searchQuery}
          selectedMonth={selectedMonth}
          availableMonths={availableMonths}
          resultCount={filteredNewsletters.length}
          onSearchChange={setSearchQuery}
          onMonthChange={setSelectedMonth}
          onClearFilters={handleClearFilters}
        />

        {filteredNewsletters.length === 0 ? (
          <NewsletterEmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <NewsletterList newsletters={filteredNewsletters} />
        )}
      </div>
    </div>
  );
}

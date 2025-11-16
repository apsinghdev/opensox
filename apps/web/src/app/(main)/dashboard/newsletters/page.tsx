"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { Search, X, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { newsletters } from "./data/newsletters";
import type { Newsletter } from "@/types/newsletter";

const groupByMonth = (newslettersList: Newsletter[]) => {
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

const sortMonthKeys = (keys: string[]): string[] => {
  return keys.sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateB.getTime() - dateA.getTime();
  });
};

const getAvailableMonths = (newsletters: Newsletter[]): string[] => {
  const months = newsletters
    .map((n) => new Date(n.date))
    .filter((d) => !isNaN(d.getTime()))
    .map((date) =>
      date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    );
  const uniqueMonths = Array.from(new Set(months));
  return sortMonthKeys(uniqueMonths);
};

const matchesSearchQuery = (newsletter: Newsletter, query: string): boolean => {
  return (
    newsletter.title.toLowerCase().includes(query) ||
    newsletter.preview.toLowerCase().includes(query) ||
    newsletter.content.toLowerCase().includes(query) ||
    newsletter.author.toLowerCase().includes(query) ||
    newsletter.takeaways.some((takeaway) => takeaway.toLowerCase().includes(query))
  );
};

const matchesMonthFilter = (
  newsletter: Newsletter,
  selectedMonth: string
): boolean => {
  if (selectedMonth === "all") return true;
  const date = new Date(newsletter.date);
  if (isNaN(date.getTime())) return false;
  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return monthYear === selectedMonth;
};

const filterNewsletters = (
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

const NewsletterCard = ({ newsletter }: { newsletter: Newsletter }) => {
  return (
    <Link href={`/dashboard/newsletters/${newsletter.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border hover:border-[#693dab] cursor-pointer">
        {newsletter.image && (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={newsletter.image}
              alt={newsletter.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              unoptimized
            />
          </div>
        )}
        <div className="p-6 space-y-3">
          <h2 className={`text-2xl font-semibold text-foreground hover:text-primary transition-colors ${GeistSans.className}`}>
            {newsletter.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{newsletter.date}</span>
            </div>
            <span>by {newsletter.author}</span>
          </div>
          <p className="text-foreground/80 line-clamp-2 leading-relaxed">
            {newsletter.preview}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default function NewslettersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const availableMonths = useMemo(
    () => getAvailableMonths(newsletters),
    []
  );

  const filteredNewsletters = useMemo(
    () => filterNewsletters(newsletters, searchQuery, selectedMonth),
    [searchQuery, selectedMonth]
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedMonth("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedMonth !== "all";

  const groupedNewsletters = groupByMonth(filteredNewsletters);
  const sortedMonths = sortMonthKeys(Object.keys(groupedNewsletters));

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

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search newsletters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All months</SelectItem>
                {availableMonths.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredNewsletters.length} result{filteredNewsletters.length !== 1 ? "s" : ""}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {filteredNewsletters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "No newsletters match your filters"
                : "No newsletters yet. Check back soon!"}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={handleClearFilters}>
                Clear filters
              </Button>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

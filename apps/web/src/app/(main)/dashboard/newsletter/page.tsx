"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  getMonthYearLabel,
  formatDate,
  getAllNewsletters,
} from "@/data/newsletters";
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function NewsletterPage() {
  const [showArchive, setShowArchive] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allNewsletters = getAllNewsletters();

  // get unique years for filtering
  const years = Array.from(
    new Set(
      allNewsletters.map((n) => new Date(n.publishedAt).getFullYear())
    )
  ).sort((a, b) => b - a);

  // get months for a specific year
  const getMonthsForYear = (year: number) => {
    const months = Array.from(
      new Set(
        allNewsletters
          .filter((n) => new Date(n.publishedAt).getFullYear() === year)
          .map((n) => new Date(n.publishedAt).getMonth())
      )
    ).sort((a, b) => b - a);

    return months.map((m) => {
      const date = new Date(year, m);
      return {
        value: `${year}-${String(m + 1).padStart(2, "0")}`,
        label: date.toLocaleString("default", { month: "long" }),
        count: allNewsletters.filter(
          (n) =>
            new Date(n.publishedAt).getFullYear() === year &&
            new Date(n.publishedAt).getMonth() === m
        ).length,
      };
    });
  };

  // filter newsletters based on selected month and search
  const filteredNewsletters = () => {
    let filtered = allNewsletters;

    if (selectedMonth !== "all") {
      filtered = filtered.filter((n) => {
        const date = new Date(n.publishedAt);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        return monthYear === selectedMonth;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };
  
  const groupFilteredByDate = () => {
    const filtered = filteredNewsletters();
    const grouped: { [key: string]: typeof filtered } = {};

    filtered.forEach((newsletter) => {
      const date = new Date(newsletter.publishedAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(newsletter);
    });

    return grouped;
  };

  const displayNewsletters = groupFilteredByDate();
  const sortedKeys = Object.keys(displayNewsletters).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ox-white mb-2">
            Newsletter
          </h1>
        </div>
        <button
          onClick={() => setShowArchive(!showArchive)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1a1a1d] hover:border-ox-purple transition-colors text-ox-gray hover:text-ox-white"
        >
          <ArchiveBoxIcon className="size-4" />
          <span className="text-sm">archive</span>
        </button>
      </div>

      {/* search and filter bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-ox-gray" />
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#121214] border border-[#1a1a1d] rounded-lg text-ox-white placeholder:text-ox-gray focus:outline-none focus:border-ox-purple"
          />
        </div>
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 bg-[#121214] border border-[#1a1a1d] rounded-lg text-ox-white focus:outline-none focus:border-ox-purple cursor-pointer"
          >
            <option value="all">all months</option>
            {years.map((year) => (
              <optgroup key={year} label={year.toString()}>
                {getMonthsForYear(year).map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label} ({month.count})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <CalendarIcon className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-ox-gray pointer-events-none" />
        </div>
      </div>

      {/* archive modal */}
      {showArchive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#1a1a1d] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ox-white">archive</h2>
              <button
                onClick={() => setShowArchive(false)}
                className="text-ox-gray hover:text-ox-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* sort label */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-ox-gray">sort:</span>
                <span className="text-ox-white">latest first</span>
              </div>

              {/* years and months */}
              <div className="space-y-4">
                {years.map((year) => {
                  const yearNewsletters = allNewsletters.filter(
                    (n) => new Date(n.publishedAt).getFullYear() === year
                  );
                  const months = getMonthsForYear(year);

                  return (
                    <div key={year} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedMonth("all");
                            setShowArchive(false);
                          }}
                          className="text-ox-white font-semibold hover:text-ox-purple"
                        >
                          {year}
                        </button>
                        <span className="text-ox-gray text-sm">
                          {yearNewsletters.length} issues
                        </span>
                      </div>
                      <div className="pl-4 space-y-1">
                        {months.map((month) => (
                          <button
                            key={month.value}
                            onClick={() => {
                              setSelectedMonth(month.value);
                              setShowArchive(false);
                            }}
                            className="flex items-center justify-between w-full py-1 text-ox-gray hover:text-ox-white text-sm"
                          >
                            <span>{month.label}</span>
                            <span>{month.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* all issues section */}
            <div className="border-t border-[#1a1a1d] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-ox-white font-semibold">all issues</h3>
                <span className="text-ox-gray text-sm">
                  {allNewsletters.length} total
                </span>
              </div>
              <div className="relative">
                <MagnifyingGlassIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-ox-gray" />
                <input
                  type="text"
                  placeholder="filter by title or topic"
                  className="w-full pl-10 pr-4 py-2 bg-[#121214] border border-[#1a1a1d] rounded-lg text-ox-white placeholder:text-ox-gray text-sm focus:outline-none focus:border-ox-purple"
                />
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {allNewsletters.map((newsletter) => (
                  <Link
                    key={newsletter.id}
                    href={`/dashboard/newsletter/${newsletter.slug}`}
                    onClick={() => setShowArchive(false)}
                    className="block py-2 text-sm text-ox-gray hover:text-ox-purple"
                  >
                    {formatDate(newsletter.publishedAt)} — {newsletter.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* newsletter list */}
      {sortedKeys.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ox-gray">no newsletters found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedKeys.map((key) => {
            const newsletters = displayNewsletters[key];
            const monthYear = getMonthYearLabel(key);

            return (
              <div key={key} className="space-y-4">
                <h2 className="text-xl font-semibold text-ox-purple">
                  {monthYear}
                </h2>
                <div className="space-y-3">
                  {newsletters.map((newsletter) => (
                    <Link
                      key={newsletter.id}
                      href={`/dashboard/newsletter/${newsletter.slug}`}
                      className="block p-6 rounded-lg bg-[#0d0d14] border border-[#1a1a1d] hover:border-ox-purple transition-colors group"
                    >
                      <div className="space-y-3">
                        {(newsletter.issueNumber) && (
                          <div className="flex items-center gap-2">
                            {newsletter.issueNumber && (
                              <span className="text-xs text-ox-gray">
                                issue {newsletter.issueNumber}
                              </span>
                            )}
                          </div>
                        )}
                        <h3 className="text-lg font-semibold text-ox-white group-hover:text-ox-purple transition-colors">
                          {newsletter.title}
                        </h3>
                        {newsletter.description && (
                          <p className="text-sm text-ox-gray">
                            {newsletter.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-ox-gray">
                          <CalendarIcon className="size-4" />
                          <span>{formatDate(newsletter.publishedAt)}</span>
                          {newsletter.readTime && (
                            <>
                              <span>•</span>
                              <span>{newsletter.readTime} min read</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
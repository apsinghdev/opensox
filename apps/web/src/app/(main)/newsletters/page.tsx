"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, Home } from "lucide-react";
import { newsletters } from "@/data/newsletters";
import { useSubscription } from "@/hooks/useSubscription";

export default function NewslettersPage() {
  const { isPaidUser, isLoading } = useSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [showMonthFilter, setShowMonthFilter] = useState(false);

  // group by month
  const groupedByMonth = useMemo(() => {
    const grouped: Record<string, typeof newsletters> = {};
    newsletters.forEach(newsletter => {
      const [day, month, year] = newsletter.date.split("-");
      const monthYear = `${month}-20${year}`;
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(newsletter);
    });
    return grouped;
  }, []);

  // filter newsletters
  const filteredNewsletters = useMemo(() => {
    let filtered = newsletters;
    
    // filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.excerpt.toLowerCase().includes(query) ||
        n.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    // filter by month
    if (selectedMonth !== "all") {
      filtered = filtered.filter(n => {
        const [day, month, year] = n.date.split("-");
        const monthYear = `${month}-20${year}`;
        return monthYear === selectedMonth;
      });
    }
    
    // sort by date (latest first)
    return filtered.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [searchQuery, selectedMonth]);

  // loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center text-white">
        <p>loading...</p>
      </div>
    );
  }

  // premium gate
  if (!isPaidUser) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">premium content</h1>
          <p className="text-gray-400 mb-6">
            newsletters are exclusive to premium members
          </p>
          <Link 
            href="/pricing"
            className="inline-block px-6 py-3 bg-[#a472ea] text-white rounded-lg hover:bg-[#8e5dd5] transition"
          >
            view plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      {/* navigation breadcrumb */}
      <div className="border-b border-[#252525]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <Link 
            href="/dashboard/home"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            <Home className="w-4 h-4" />
            <span>dashboard</span>
          </Link>
        </div>
      </div>

      {/* header */}
      <header className="border-b border-[#252525] px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">newsletters</h1>
          <p className="text-gray-400">exclusive insights for premium members</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="search newsletters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#a472ea] transition"
            />
          </div>
        </div>

        {/* month filter (collapsible) */}
        <div className="mb-8">
          <button
            onClick={() => setShowMonthFilter(!showMonthFilter)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-3"
          >
            <span>filter by month</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showMonthFilter ? 'rotate-180' : ''}`} />
          </button>
          
          {showMonthFilter && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMonth("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedMonth === "all"
                    ? "bg-[#a472ea] text-white"
                    : "bg-[#1a1a1a] text-gray-400 hover:bg-[#252525] border border-[#252525]"
                }`}
              >
                all
              </button>
              {Object.keys(groupedByMonth)
                .sort((a, b) => {
                  const [monthA, yearA] = a.split("-").map(Number);
                  const [monthB, yearB] = b.split("-").map(Number);
                  return yearB - yearA || monthB - monthA;
                })
                .map(monthYear => (
                  <button
                    key={monthYear}
                    onClick={() => setSelectedMonth(monthYear)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedMonth === monthYear
                        ? "bg-[#a472ea] text-white"
                        : "bg-[#1a1a1a] text-gray-400 hover:bg-[#252525] border border-[#252525]"
                    }`}
                  >
                    {formatMonthYear(monthYear)}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* results count */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredNewsletters.length} {filteredNewsletters.length === 1 ? 'newsletter' : 'newsletters'}
        </p>

        {/* newsletter list */}
        {filteredNewsletters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">no newsletters found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNewsletters.map((newsletter) => (
              <Link 
                key={newsletter.id}
                href={`/newsletters/${newsletter.slug}`}
                className="block group"
              >
                <div className="border border-[#252525] rounded-lg p-4 md:p-6 hover:border-[#a472ea] hover:bg-[#1a1a1a]/50 transition">
                  {/* date and tags */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <span className="text-xs md:text-sm text-gray-500 font-mono">
                      {newsletter.date}
                    </span>
                    <span className="text-gray-600">•</span>
                    {newsletter.tags.slice(0, 2).map(tag => (
                      <span 
                        key={tag}
                        className="text-xs bg-[#a472ea]/10 text-[#a472ea] px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* title */}
                  <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#a472ea] transition">
                    {newsletter.title}
                  </h2>
                  
                  {/* excerpt */}
                  <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-2">
                    {newsletter.excerpt}
                  </p>

                  {/* footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#252525]">
                    <span className="text-xs md:text-sm text-gray-500">
                      {calculateReadTime(newsletter.content)} min read
                    </span>
                    <span className="text-xs md:text-sm text-[#a472ea] group-hover:underline">
                      read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// helper functions
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(2000 + year, month - 1, day);
}

function formatMonthYear(monthYear: string): string {
  const [month, year] = monthYear.split("-");
  const months = ["jan", "feb", "mar", "apr", "may", "jun", 
                  "jul", "aug", "sep", "oct", "nov", "dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function calculateReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = words / 238;
  return Math.max(1, Math.ceil(minutes));
}
"use client";

import { useMemo, useState } from "react";
import { newsletters, NewsletterPost } from "@/data/newsletters";
import Link from "next/link";
import { useSubscription } from "@/hooks/useSubscription";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SpinnerElm from "@/components/ui/SpinnerElm";
import { motion } from "framer-motion";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface GroupedNewsletters {
  year: number;
  month: number;
  monthName: string;
  newsletters: NewsletterPost[];
}

export default function NewslettersPage() {
  const { isPaidUser, isLoading } = useSubscription();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Redirect if not a paid user
  useEffect(() => {
    if (!isLoading && !isPaidUser) {
      router.push("/pricing");
    }
  }, [isPaidUser, isLoading, router]);

  // Get all unique years and months for filters
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    newsletters.forEach((n) => {
      years.add(new Date(n.date).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const availableMonths = useMemo(() => {
    const months = new Set<number>();
    newsletters.forEach((n) => {
      months.add(new Date(n.date).getMonth());
    });
    return Array.from(months).sort((a, b) => b - a);
  }, []);

  // Helper function to extract text content from newsletter for search
  const getNewsletterTextContent = (newsletter: NewsletterPost): string => {
    const contentText = newsletter.content
      .map((item) => {
        if (item.type === "text" || item.type === "paragraph") return item.content;
        if (item.type === "bold") return item.content;
        if (item.type === "heading") return item.content;
        if (item.type === "link") return item.text;
        return "";
      })
      .join(" ");
    return `${newsletter.title} ${contentText}`.toLowerCase();
  };

  const filteredAndGroupedNewsletters = useMemo(() => {
    // Filter newsletters based on search query and filters
    let filtered = newsletters.filter((newsletter) => {
      const date = new Date(newsletter.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      // Search filter
      if (searchQuery.trim()) {
        const textContent = getNewsletterTextContent(newsletter);
        if (!textContent.includes(searchQuery.toLowerCase())) {
          return false;
        }
      }

      // Year filter
      if (selectedYear !== null && year !== selectedYear) {
        return false;
      }

      // Month filter
      if (selectedMonth !== null && month !== selectedMonth) {
        return false;
      }

      return true;
    });

    const groups: GroupedNewsletters[] = [];
    const grouped = new Map<string, NewsletterPost[]>();

    // Sort filtered newsletters by date (latest first)
    const sorted = filtered.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Group by year and month
    sorted.forEach((newsletter) => {
      const date = new Date(newsletter.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(newsletter);
    });

    // Convert to array and format
    grouped.forEach((newsletters, key) => {
      const [year, month] = key.split("-").map(Number);
      const date = new Date(year, month, 1);
      const monthName = date.toLocaleString("default", { month: "long" });

      groups.push({
        year,
        month,
        monthName,
        newsletters,
      });
    });

    // Sort groups by date (latest first)
    return groups.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  }, [searchQuery, selectedYear, selectedMonth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <SpinnerElm text={"loading newsletters for you..."}></SpinnerElm>
      </div>
    );
  }
  
  if (!isPaidUser) {
    return null; // Will redirect
  }
  
  return (
    <main className="min-h-screen w-full bg-[#191919] text-[#ebebeb] relative overflow-hidden">
      {/* Notion-like subtle background */}
      <div className="fixed inset-0 bg-[#191919] -z-10" />
      
      {/* Header Banner - Zoomed in with reduced height */}
      <div className="relative w-full mt-0 mb-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%', height: '280px', position: 'relative' }}
        >
          <FaultyTerminal
            scale={2}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#6032D9"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </motion.div>
      </div>

      {/* Content Section - Notion-like */}
      <div className="relative w-full">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Header Section - Notion Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mb-12 pt-8"
          >
            {/* Header Container - Notion-like minimal */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-[#ebebeb] tracking-tight mb-3 leading-[1.2]">
                Newsletters
              </h1>
              <p className="text-base text-[#9b9a97] font-normal">
                Stay updated with the latest from Opensox AI
              </p>
            </div>

            {/* Search and Filter Controls - Notion-like */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9b9a97]" />
                <input
                  type="text"
                  placeholder="Search newsletters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#1f1f1f] border border-[#2e2e2e] rounded-[3px] text-[#ebebeb] placeholder:text-[#9b9a97] focus:outline-none focus:ring-1 focus:ring-[#6032D9]/50 focus:border-[#6032D9]/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9a97] hover:text-[#ebebeb] transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle and Filters */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] border transition-all ${
                    showFilters || selectedYear !== null || selectedMonth !== null
                      ? "bg-[#2a2a2a] border-[#6032D9]/50 text-[#ebebeb]"
                      : "bg-[#1f1f1f] border-[#2e2e2e] text-[#9b9a97] hover:border-[#6032D9]/30"
                  }`}
                >
                  <FunnelIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                  {(selectedYear !== null || selectedMonth !== null) && (
                    <span className="ml-1 px-1.5 py-0.5 bg-[#6032D9] text-white text-xs rounded-full">
                      {[selectedYear !== null, selectedMonth !== null].filter(Boolean).length}
                    </span>
                  )}
                </button>

                {/* Clear Filters */}
                {(selectedYear !== null || selectedMonth !== null || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedYear(null);
                      setSelectedMonth(null);
                      setSearchQuery("");
                    }}
                    className="text-sm text-[#9b9a97] hover:text-[#ebebeb] transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Filter Options */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#1f1f1f] border border-[#2e2e2e] rounded-[3px] p-4 space-y-4"
                >
                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-[#ebebeb] mb-2">
                      Year
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedYear(null)}
                        className={`px-3 py-1.5 text-sm rounded-[3px] border transition-all ${
                          selectedYear === null
                            ? "bg-[#6032D9]/20 border-[#6032D9] text-[#9455f4]"
                            : "bg-[#2a2a2a] border-[#2e2e2e] text-[#9b9a97] hover:border-[#6032D9]/30"
                        }`}
                      >
                        All
                      </button>
                      {availableYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                          className={`px-3 py-1.5 text-sm rounded-[3px] border transition-all ${
                            selectedYear === year
                              ? "bg-[#6032D9]/20 border-[#6032D9] text-[#9455f4]"
                              : "bg-[#2a2a2a] border-[#2e2e2e] text-[#9b9a97] hover:border-[#6032D9]/30"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Month Filter */}
                  <div>
                    <label className="block text-sm font-medium text-[#ebebeb] mb-2">
                      Month
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedMonth(null)}
                        className={`px-3 py-1.5 text-sm rounded-[3px] border transition-all ${
                          selectedMonth === null
                            ? "bg-[#6032D9]/20 border-[#6032D9] text-[#9455f4]"
                            : "bg-[#2a2a2a] border-[#2e2e2e] text-[#9b9a97] hover:border-[#6032D9]/30"
                        }`}
                      >
                        All
                      </button>
                      {availableMonths.map((month) => {
                        const date = new Date(2024, month, 1);
                        const monthName = date.toLocaleString("default", { month: "long" });
                        return (
                          <button
                            key={month}
                            onClick={() => setSelectedMonth(selectedMonth === month ? null : month)}
                            className={`px-3 py-1.5 text-sm rounded-[3px] border transition-all ${
                              selectedMonth === month
                                ? "bg-[#6032D9]/20 border-[#6032D9] text-[#9455f4]"
                                : "bg-[#2a2a2a] border-[#2e2e2e] text-[#9b9a97] hover:border-[#6032D9]/30"
                            }`}
                          >
                            {monthName}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Results Count */}
              {(searchQuery || selectedYear !== null || selectedMonth !== null) && (
                <div className="text-sm text-[#9b9a97]">
                  {filteredAndGroupedNewsletters.reduce(
                    (sum, group) => sum + group.newsletters.length,
                    0
                  )}{" "}
                  newsletter{filteredAndGroupedNewsletters.reduce((sum, group) => sum + group.newsletters.length, 0) !== 1 ? "s" : ""} found
                </div>
              )}
            </div>
          </motion.div>

          {/* Newsletters List - Notion-like Cards */}
          {filteredAndGroupedNewsletters.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#9b9a97] text-base">
                {searchQuery || selectedYear !== null || selectedMonth !== null
                  ? "No newsletters found matching your filters."
                  : "No newsletters available yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-16 pb-20">
              {filteredAndGroupedNewsletters.map((group, groupIndex) => (
                <motion.div
                  key={`${group.year}-${group.month}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + groupIndex * 0.1 }}
                >
                  {/* Notion-like section header with mild pixel accent */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-[2px] h-5 bg-[#6032D9]"></div>
                    <h2 className="text-lg font-semibold text-[#ebebeb] tracking-normal">
                      {group.monthName} {group.year}
                    </h2>
                  </div>
                  
                  {/* Grid Layout for Cards - Wider Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.newsletters.map((newsletter, index) => (
                      <motion.div
                        key={newsletter.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 + groupIndex * 0.1 + index * 0.05 }}
                      >
                        <Link
                          href={`/dashboard/newsletters/${newsletter.id}`}
                          className="block group h-full"
                        >
                          {/* Sharp Edge Card - Image Style */}
                          <div className="relative bg-[#1f1f1f] border border-[#2e2e2e] overflow-hidden hover:bg-[#252525] hover:border-[#6032D9]/40 transition-all duration-200 h-full flex flex-col shadow-lg hover:shadow-xl">
                            {/* Header Image with Smoky Overlay */}
                            {newsletter.headerImage ? (
                              <div className="relative w-full h-44 md:h-52 overflow-hidden bg-[#2a2a2a]">
                                <Image
                                  src={newsletter.headerImage}
                                  alt={newsletter.title}
                                  width={800}
                                  height={600}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  priority={index === 0 && groupIndex === 0}
                                />
                                
                                {/* Smoky Glassmorphic Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/95 via-[#191919]/50 to-transparent" />
                                <div className="absolute inset-0 backdrop-blur-[3px] bg-[#191919]/30" />
                              </div>
                            ) : null}
                            
                            {/* Footer with Icon and Title - Image Style */}
                            <div className="mt-auto p-4 md:p-5 bg-[#252525] border-t border-[#2e2e2e] flex items-center gap-3 group-hover:bg-[#2a2a2a] group-hover:border-[#6032D9]/30 transition-all">
                              <DocumentTextIcon className="w-5 h-5 text-[#9455f4] flex-shrink-0 group-hover:text-[#b577ff] transition-colors" />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base md:text-lg font-semibold text-[#ebebeb] group-hover:text-[#9455f4] transition-colors leading-tight">
                                  {newsletter.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="w-1 h-1 bg-[#6032D9] rounded-full" />
                                  <span className="text-xs text-[#9b9a97] font-normal">
                                    {new Date(newsletter.date).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Mild pixel accent corners - Sharp edges */}
                            <div className="absolute top-0 left-0 w-2 h-2 bg-[#6032D9]/20 group-hover:bg-[#6032D9]/40 transition-colors z-10" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[#6032D9]/20 group-hover:bg-[#6032D9]/40 transition-colors z-10" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#6032D9]/20 group-hover:bg-[#6032D9]/40 transition-colors z-10" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#6032D9]/20 group-hover:bg-[#6032D9]/40 transition-colors z-10" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </main>
  );
}


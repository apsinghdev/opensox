"use client";

import "@/styles/newsletter.css";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/hooks/useSubscription";
import { Newsletter } from "@/components/newsletters/NewsletterCard";
import { NewsletterSkeleton } from "@/components/newsletters/NewsletterSkeleton";
import { PremiumUpgradePrompt } from "@/components/newsletters/PremiumUpgradePrompt";
import { NewsletterFilters, TimeFilter, SortFilter } from "@/components/newsletters/NewsletterFilters";
import { NewsletterPagination } from "@/components/newsletters/NewsletterPagination";
import { NewsletterList } from "@/components/newsletters/NewsletterList";
import { useNewsletterFilters } from "@/hooks/useNewsletterFilters";

export default function NewslettersPage() {
  const router = useRouter();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'unauthorized' | 'forbidden' | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [sortFilter, setSortFilter] = useState<SortFilter>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const { isPaidUser, isLoading: subscriptionLoading } = useSubscription();
  
  const itemsPerPage = 5;

  useEffect(() => {
    if (subscriptionLoading) return;
    
    fetch("/api/newsletters")
      .then(async (res) => {
        if (res.status === 401) {
          setError('unauthorized');
          setLoading(false);
          return null;
        }
        if (res.status === 403) {
          setError('forbidden');
          setLoading(false);
          return null;
        }
        if (!res.ok) {
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setNewsletters(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [subscriptionLoading]);

  const filteredNewsletters = useNewsletterFilters(newsletters, searchQuery, timeFilter);

  // Apply sorting
  const sortedNewsletters = useMemo(() => {
    const sorted = [...filteredNewsletters];
    sorted.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortFilter === "newest" ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [filteredNewsletters, sortFilter]);

  const totalPages = Math.ceil(sortedNewsletters.length / itemsPerPage);
  const paginatedNewsletters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedNewsletters.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedNewsletters, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, timeFilter, sortFilter]);

  if (subscriptionLoading) {
    return (
      <div className="w-full h-full overflow-auto">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
          <Skeleton className="h-8 w-48 mb-6 bg-zinc-800" />
          <NewsletterSkeleton />
          <NewsletterSkeleton />
        </div>
      </div>
    );
  }

  if (error === 'unauthorized') {
    router.push('/login');
    return null;
  }

  if (!isPaidUser || error === 'forbidden') {
    return <PremiumUpgradePrompt />;
  }

  return (
    <div className="w-full h-full overflow-auto ">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
            Newsletter
          </h1>
          <p className="text-sm sm:text-base text-zinc-400">
            Stay updated with our latest insights and stories
          </p>
        </div>

        <NewsletterFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          sortFilter={sortFilter}
          onSortFilterChange={setSortFilter}
        />

        <div className="mt-6 sm:mt-8">
          <NewsletterList
            newsletters={paginatedNewsletters}
            loading={loading}
            hasFilters={!!searchQuery || timeFilter !== "all"}
          />
        </div>

        <NewsletterPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

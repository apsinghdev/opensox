import { Search } from "lucide-react";

export type TimeFilter = "all" | "january" | "february" | "march" | "april" | "may" | "june" | "july" | "august" | "september" | "october" | "november" | "december";
export type SortFilter = "newest" | "oldest";

interface NewsletterFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  timeFilter: TimeFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
  sortFilter?: SortFilter;
  onSortFilterChange?: (filter: SortFilter) => void;
}

export function NewsletterFilters({
  searchQuery,
  onSearchChange,
  timeFilter,
  onTimeFilterChange,
  sortFilter = "newest",
  onSortFilterChange,
}: NewsletterFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search newsletters..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#111111] border border-zinc-800 rounded-lg pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
        />
      </div>

      <select
        value={timeFilter}
        onChange={(e) => onTimeFilterChange(e.target.value as TimeFilter)}
        className="bg-[#111111] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all cursor-pointer min-w-[140px]"
      >
        <option value="all">All Months</option>
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </select>

      {onSortFilterChange && (
        <select
          value={sortFilter}
          onChange={(e) => onSortFilterChange(e.target.value as SortFilter)}
          className="bg-[#111111] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all cursor-pointer min-w-[140px]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      )}
    </div>
  );
}

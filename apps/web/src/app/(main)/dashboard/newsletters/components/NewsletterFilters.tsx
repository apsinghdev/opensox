"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewsletterFiltersProps {
  searchQuery: string;
  selectedMonth: string;
  availableMonths: string[];
  resultCount: number;
  onSearchChange: (query: string) => void;
  onMonthChange: (month: string) => void;
  onClearFilters: () => void;
}

export default function NewsletterFilters({
  searchQuery,
  selectedMonth,
  availableMonths,
  resultCount,
  onSearchChange,
  onMonthChange,
  onClearFilters,
}: NewsletterFiltersProps) {
  const hasActiveFilters = searchQuery.trim() !== "" || selectedMonth !== "all";

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search newsletters..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <Select value={selectedMonth} onValueChange={onMonthChange}>
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
            {resultCount} result{resultCount !== 1 ? "s" : ""}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="h-8 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}


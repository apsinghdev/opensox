"use client";

import { Button } from "@/components/ui/button";

interface NewsletterEmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function NewsletterEmptyState({
  hasActiveFilters,
  onClearFilters,
}: NewsletterEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">
        {hasActiveFilters
          ? "No newsletters match your filters"
          : "No newsletters yet. Check back soon!"}
      </p>
      {hasActiveFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  );
}


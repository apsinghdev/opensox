"use client";

import { useState, useMemo, useCallback } from "react";
import { Program } from "@/data/oss-programs/types";
import { SearchInput, TagFilter, ProgramCard } from "@/components/oss-programs";
import StatusFilter from "@/components/oss-programs/StatusFilter";
import { matchesStatusFilters } from "@/utils/date-utils";

interface ProgramsListProps {
  programs: Program[];
  tags: string[];
}

/**
 * Filters OSS programs based on search query, selected tags, and selected statuses.
 * Handles status filtering based on application dates with special handling for TBD status.
 */
export default function ProgramsList({ programs, tags }: ProgramsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Memoize handlers to prevent child re-renders
  /**
 * Updates search query state when user types in search input
 * @param value - The new search query string
 */
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  /**
 * Updates selected tags state when user adds/removes tags
 * @param newTags - Array of currently selected tag strings
 */
  const handleTagsChange = useCallback((newTags: string[]) => {
    setSelectedTags(newTags);
  }, []);

  /**
 * Updates selected statuses state when user adds/removes status filters
 * @param newStatuses - Array of currently selected status strings
 */
  const handleStatusesChange = useCallback((newStatuses: string[]) => {
    setSelectedStatuses(newStatuses);
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => program.tags.includes(tag));

      const matchesStatuses = matchesStatusFilters(
        program.applicationStart,
        program.applicationEnd,
        selectedStatuses
      );

      return matchesSearch && matchesTags && matchesStatuses;
    });
  }, [programs, searchQuery, selectedTags, selectedStatuses]);

  return (
    <div className="min-h-full w-[99vw] lg:w-[80vw] bg-dash-base text-white p-4 md:p-8 lg:p-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        {/* Header Section */}
        <div className="flex flex-col gap-8 mb-12 min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary break-words">
            OSS Programs
          </h1>

          <div className="flex flex-col md:flex-row gap-4 w-full min-w-0">
            <SearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search programs..."
            />
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagsChange={handleTagsChange}
            />
            <StatusFilter
              statuses={["Active","Upcoming","TBD","Historical"]}
              selectedStatuses={selectedStatuses}
              onStatusesChange={handleStatusesChange}
            />
          </div>
        </div>

        {/* List Section */}
        <div className="flex flex-col gap-2 md:gap-3 min-w-0">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              No programs found matching your criteria.
            </div>
          ) : (
            filteredPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

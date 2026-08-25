"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Program } from "@/data/oss-programs/types";
import { SearchInput, TagFilter, ProgramCard, ProgramCardSkeleton } from "@/components/oss-programs";

interface ProgramsListProps {
  programs: Program[];
  tags: string[];
}

export default function ProgramsList({ programs, tags }: ProgramsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized handlers
  const handleSearchChange = useCallback((value: string) => {
    setIsLoading(true);
    setSearchQuery(value);
  }, []);

  const handleTagsChange = useCallback((newTags: string[]) => {
    setIsLoading(true);
    setSelectedTags(newTags);
  }, []);

  // Fake loading delay for smooth UX
  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // skeleton visible time

    return () => clearTimeout(timer);
  }, [isLoading]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => program.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [programs, searchQuery, selectedTags]);

  return (
    <div className="min-h-full w-[99vw] lg:w-[80vw] bg-dash-base text-white p-4 md:p-8 lg:p-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-12 min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
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
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3 min-w-0">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <ProgramCardSkeleton key={`skeleton-${i}`} />
            ))}

          {!isLoading && filteredPrograms.length === 0 && (
            <div className="text-center py-20 text-text-muted">
              No programs found matching your criteria.
            </div>
          )}

          {!isLoading &&
            filteredPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
        </div>
      </div>
    </div>
  );
}


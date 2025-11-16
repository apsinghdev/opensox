"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectTitleStore } from "@/store/useProjectTitleStore";
import { DashboardProjectsProps } from "@/types";
import Image from "next/image";
import { useFilterStore } from "@/store/useFilterStore";
import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useState, useMemo } from "react";

type ProjectsContainerProps = { projects: DashboardProjectsProps[] };

const languageColors: Record<string, string> = {
  javascript: "bg-yellow-500/15 text-yellow-500",
  typescript: "bg-blue-500/15 text-blue-500",
  python: "bg-emerald-500/15 text-emerald-500",
  go: "bg-cyan-500/15 text-cyan-500",
  rust: "bg-orange-500/15 text-orange-500",
  java: "bg-red-500/15 text-red-500",
  "c#": "bg-purple-500/15 text-purple-500",
  "c++": "bg-indigo-500/15 text-indigo-500",
  c: "bg-gray-500/15 text-gray-500",
  php: "bg-violet-500/15 text-violet-500",
  swift: "bg-pink-500/15 text-pink-500",
  kotlin: "bg-sky-500/15 text-sky-500",
  ruby: "bg-rose-500/15 text-rose-500",
  scala: "bg-teal-500/15 text-teal-500",
  html: "bg-orange-400/15 text-orange-400",
  elixir: "bg-purple-600/15 text-purple-600",
};

const getColor = (c?: string) =>
  languageColors[(c || "").toLowerCase()] || "bg-gray-200/10 text-gray-300";

const tableColumns = [
  "Project",
  "Issues",
  "Language",
  "Popularity",
  "Stage",
  "Competition",
  "Activity",
];

export default function ProjectsContainer({
  projects,
}: ProjectsContainerProps) {
  const pathname = usePathname();
  const { projectTitle } = useProjectTitleStore();
  const { setShowFilters } = useFilterStore();
  const isProjectsPage = pathname === "/dashboard/projects";
  const [searchQuery, setSearchQuery] = useState("");

  // Client-side filtering of projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects;
    }

    const query = searchQuery.toLowerCase().trim();
    return projects.filter((project) => {
      const nameMatch = project.name.toLowerCase().includes(query);
      const languageMatch = project.primaryLanguage?.toLowerCase().includes(query);
      const stageMatch = project.stage?.toLowerCase().includes(query);
      const popularityMatch = project.popularity?.toLowerCase().includes(query);
      const competitionMatch = project.competition?.toLowerCase().includes(query);
      const activityMatch = project.activity?.toLowerCase().includes(query);

      return (
        nameMatch ||
        languageMatch ||
        stageMatch ||
        popularityMatch ||
        competitionMatch ||
        activityMatch
      );
    });
  }, [projects, searchQuery]);

  return (
    <div className="w-full p-6 sm:p-6">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight">
          {projectTitle}
        </h2>
        {isProjectsPage && (
          <Button
            className="font-semibold text-white bg-ox-purple text-sm sm:text-base h-10 sm:h-11 px-5 sm:px-6 hover:bg-ox-purple/90 rounded-md flex items-center gap-2"
            onClick={() => setShowFilters(true)}
          >
            <FunnelIcon className="size-4 sm:size-5" />
            <span className="hidden sm:inline">Filter Projects</span>
            <span className="sm:hidden">Filter</span>
          </Button>
        )}
      </div>

      {/* Search Input for Quick Filtering */}
      {isProjectsPage && projects && projects.length > 0 && (
        <div className="mb-4">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects by name, language, stage, popularity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#15161a] border border-[#1a1a1d] rounded-md text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-ox-purple focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-xs text-zinc-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          )}
        </div>
      )}

      {projects && projects.length > 0 ? (
        <div
          className="
            w-full bg-[#15161a] border border-[#1a1a1d] rounded-lg
            h-[80vh] overflow-y-auto overflow-x-auto relative
            [&::-webkit-scrollbar]:w-2
      
            [&::-webkit-scrollbar]:h-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-ox-purple/30
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:hover:bg-ox-purple/50
          "
        >
          <Table className="w-full min-w-[820px] table-fixed">
            {/* Sticky header row */}
            <TableHeader>
              <TableRow className="border-b border-[#1a1a1d]">
                {tableColumns.map((name, i) => (
                  <TableHead
                    key={name}
                    className={[
                      "px-3 py-3 font-semibold text-ox-purple text-[12px] sm:text-sm whitespace-nowrap",
                      "sticky top-0 z-30 bg-[#15161a]", // <- stick
                      i === 0 ? "text-left" : "text-center",
                    ].join(" ")}
                  >
                    {name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p) => (
                <TableRow
                  key={p.id}
                  className="border-y border-ox-gray cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => window.open(p.url, "_blank")}
                >
                  <TableCell className="p-1 sm:p-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full overflow-hidden inline-block h-4 w-4 sm:h-6 sm:w-6 border">
                        <Image
                          src={p.avatarUrl}
                          className="w-full h-full object-cover"
                          alt={p.name}
                          width={24}
                          height={24}
                        />
                      </div>
                      <span className="text-white text-[10px] sm:text-xs font-semibold">
                        {p.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-white text-[10px] sm:text-xs text-center p-1 sm:p-2 whitespace-nowrap">
                    {p.totalIssueCount}
                  </TableCell>

                  <TableCell className="text-center p-1 sm:p-2">
                    <Badge
                      variant="secondary"
                      className={`${getColor(p.primaryLanguage)} text-[10px] sm:text-xs whitespace-nowrap`}
                    >
                      {p.primaryLanguage}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-white text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.popularity}
                  </TableCell>
                  <TableCell className="text-white text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.stage}
                  </TableCell>
                  <TableCell className="text-white text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.competition}
                  </TableCell>
                  <TableCell className="text-white text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.activity}
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="text-center py-12 text-zinc-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <MagnifyingGlassIcon className="size-12 text-ox-purple/50" />
                      <p className="text-base font-medium">No projects found</p>
                      <p className="text-sm">
                        Try adjusting your search query or{" "}
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-ox-purple hover:underline"
                        >
                          clear the search
                        </button>
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : isProjectsPage ? (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] text-zinc-400 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <MagnifyingGlassIcon className="size-12 text-ox-purple animate-pulse" />
            <p className="text-xl font-medium">Find Your Next Project</p>
          </div>
          <p className="text-base text-center max-w-md">
            Click the &apos;Filter Projects&apos; button above to discover open
            source projects that match your interests
          </p>
        </div>
      ) : null}
    </div>
  );
}

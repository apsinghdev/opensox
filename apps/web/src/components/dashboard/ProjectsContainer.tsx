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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

  return (
    <div className="w-full p-6 sm:p-6">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
          {projectTitle}
        </h2>
        {isProjectsPage && (
          <Button
            className="font-semibold text-text-primary bg-ox-purple text-sm sm:text-base h-10 sm:h-11 px-5 sm:px-6 hover:bg-white-500 rounded-md"
            onClick={() => setShowFilters(true)}
          >
            Find projects
          </Button>
        )}
      </div>

      {projects && projects.length > 0 ? (
        <div
          className="
            w-full bg-ox-content border border-dash-border rounded-lg
            h-[80vh] overflow-y-auto overflow-x-auto relative
            [&::-webkit-scrollbar]:w-2
      
            [&::-webkit-scrollbar]:h-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-brand-purple/30
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:hover:bg-brand-purple/50
          "
        >
          <Table className="w-full min-w-[820px] table-fixed">
            {/* Sticky header row */}
            <TableHeader>
              <TableRow className="border-b border-dash-border">
                {tableColumns.map((name, i) => (
                  <TableHead
                    key={name}
                    className={[
                      "px-3 py-3 font-semibold text-brand-purple text-[12px] sm:text-sm whitespace-nowrap",
                      "sticky top-0 z-30 bg-ox-content", // <- stick
                      i === 0 ? "text-left" : "text-center",
                    ].join(" ")}
                  >
                    {name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((p) => (
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
                      <span className="text-text-primary text-[10px] sm:text-xs font-semibold">
                        {p.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center p-1 sm:p-2 whitespace-nowrap">
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

                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.popularity}
                  </TableCell>
                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.stage}
                  </TableCell>
                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.competition}
                  </TableCell>
                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.activity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : isProjectsPage ? (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] text-text-muted space-y-6">
          <div className="flex flex-col items-center gap-2">
            <MagnifyingGlassIcon className="size-12 text-brand-purple animate-pulse" />
            <p className="text-xl font-medium">Find Your Next Project</p>
          </div>
          <p className="text-base text-center max-w-md">
            Click the &apos;Find projects&apos; button above to discover open
            source projects that match your interests
          </p>
        </div>
      ) : null}
    </div>
  );
}

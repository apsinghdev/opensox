"use client";
import { Badge } from "@/components/ui/badge";
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
import { useState, useMemo } from "react";

type ProjectsContainerProps = {
  projects: DashboardProjectsProps[];
};

interface languageColorsTypes {
  [key: string]: string;
  javascript: string;
  typescript: string;
  python: string;
  go: string;
  rust: string;
  java: string;
  "c#": string;
  "c++": string;
  c: string;
  php: string;
  swift: string;
  kotlin: string;
  ruby: string;
  scala: string;
  html: string;
  elixir: string;
}

const languageColors: languageColorsTypes = {
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

const getColor = (color: string): string => {
  const lowerColorCase = color.toLowerCase();
  const _color = languageColors[lowerColorCase] || "bg-gray-200 text-gray-800";
  return _color;
};

type SortColumn = "Project" | "Issues" | "Language" | "Popularity" | "Stage" | "Competition" | "Activity";
type SortDirection = "asc" | "desc";

const sortFunctions: Record<SortColumn, (a: DashboardProjectsProps, b: DashboardProjectsProps, direction: SortDirection, allProjects?: DashboardProjectsProps[]) => number> = {
  Project: (a, b, direction) => {
    const result = a.name.localeCompare(b.name);
    return direction === "asc" ? result : -result;
  },
  Issues: (a, b, direction) => {
    const result = a.totalIssueCount - b.totalIssueCount;
    return direction === "asc" ? result : -result;
  },
  Language: (a, b, direction, allProjects) => {
    if (!allProjects) {
      // If allProjects is not provided, fallback to alphabetical ordering
      const result = a.primaryLanguage.localeCompare(b.primaryLanguage);
      return direction === "asc" ? result : -result;
    }
    
    // Count language frequency in the entire project list
    const languageCountA = allProjects.filter(p => p.primaryLanguage === a.primaryLanguage).length;
    const languageCountB = allProjects.filter(p => p.primaryLanguage === b.primaryLanguage).length;
    
    // Sort by frequency (most frequent first by default)
    const result = languageCountB - languageCountA;
    return direction === "asc" ? result : -result;
  },
  Popularity: (a, b, direction) => {
    // Define a custom order for popularity levels
    const popularityOrder: Record<string, number> = {
      "Highest": 7,
      "Higher": 6,
      "High": 5,
      "Moderate": 4,
      "Low": 3,
      "Very Low": 2,
      "Lowest": 1
    };
    
    const orderA = popularityOrder[a.popularity] ?? popularityOrder[a.popularity.toLowerCase()] ?? 999;
    const orderB = popularityOrder[b.popularity] ?? popularityOrder[b.popularity.toLowerCase()] ?? 999;
    
    const result = orderA - orderB;
    return direction === "asc" ? result : -result;
  },
  Stage: (a, b, direction) => {
    // Define a custom order for stages (customize based on actual values)
    const stageOrder: Record<string, number> = {
      "early": 1,
      "mid": 2,
      "late": 3,
      "planning": 0,
      "development": 2,
      "production": 3,
      "maintenance": 4
    };
    
    const orderA = stageOrder[a.stage.toLowerCase()] ?? 999;
    const orderB = stageOrder[b.stage.toLowerCase()] ?? 999;
    
    const result = orderA - orderB;
    return direction === "asc" ? result : -result;
  },
  Competition: (a, b, direction) => {
    // Define a custom order for competition levels
    const competitionOrder: Record<string, number> = {
      "None": 0,
      "Very Low": 1,
      "Low": 2,
      "Medium": 3,
      "High": 4,
      "Very High": 5
    };
    
    const orderA = competitionOrder[a.competition] ?? competitionOrder[a.competition.toLowerCase()] ?? 999;
    const orderB = competitionOrder[b.competition] ?? competitionOrder[b.competition.toLowerCase()] ?? 999;
    
    const result = orderA - orderB;
    return direction === "asc" ? result : -result;
  },
  Activity: (a, b, direction) => {
    // Define a custom order for activity levels
    const activityOrder: Record<string, number> = {
      "Inactive": 0,
      "Lowest": 1,
      "Low": 2,
      "Normal": 3,
      "High": 4,
      "Very High": 5,
      "Highest": 6
    };
    
    const orderA = activityOrder[a.activity] ?? activityOrder[a.activity.toLowerCase()] ?? 999;
    const orderB = activityOrder[b.activity] ?? activityOrder[b.activity.toLowerCase()] ?? 999;
    
    const result = orderA - orderB;
    return direction === "asc" ? result : -result;
  }
};

export default function ProjectsContainer({
  projects,
}: ProjectsContainerProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  
  const handleClick = (link: string) => {
    window.open(link, "_blank");
  };
  const { projectTitle } = useProjectTitleStore();
  const tableColums = [
    "Project",
    "Issues",
    "Language",
    "Popularity",
    "Stage",
    "Competition",
    "Activity",
  ];

  // Apply sorting
  const sortedProjects = useMemo(() => {
    if (!sortColumn) return projects;
    
    return [...projects].sort((a, b) => {
      if (sortColumn === "Language") {
        return sortFunctions[sortColumn](a, b, sortDirection, projects);
      }
      return sortFunctions[sortColumn](a, b, sortDirection);
    });
  }, [projects, sortColumn, sortDirection]);
  return (
    <div className="w-full rounded-lg p-2 sm:p-4">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-xs sm:text-sm md:text-md font-semibold text-white">
          {projectTitle}
        </h2>
      </div>
      <div className="rounded-lg  bg-ox-black-2 border-ox-gray border w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="w-full border">
            <TableRow className="w-full border-ox-gray border hover:bg-blue-600/10  transition-colors">
              {tableColums.map((name, index) => (
                <TableHead
                  key={index}
                   className={`flex-1 text-center  font-semibold text-ox-purple
                    text-[12px] sm:text-sm cursor-pointer  `}
                  onClick={() => {
                    const column = name as SortColumn;
                    if (sortColumn === column) {
                      
                      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                    } else {
                      
                      setSortColumn(column);
                      setSortDirection("asc");
                    }
                  }}
                >
                  <div className="flex items-center justify-center gap-1">
                    {name}
                    {sortColumn === name && (
                      <span className="text-xs">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => (
              <TableRow
                key={project.id}
                className="border-ox-gray border-y cursor-pointer hover:bg-blue-600/10 transition-colors"
                onClick={() => {
                  handleClick(project.url);
                }}
              >
                <TableCell className="flex items-center gap-1 p-1 sm:p-2">
                  <div className="rounded-full overflow-hidden inline-block h-4 w-4 sm:h-6 sm:w-6 border border-ox-gray">
                    <Image
                      src={project.avatarUrl}
                      className="w-full h-full object-cover "
                      alt={project.name}
                      width={10}
                      height={10}
                    />
                  </div>
                  <TableCell className="text-white text-[10px] sm:text-xs text-ox-white font-semibold">
                    {project.name}
                  </TableCell>
                </TableCell>
                <TableCell className="text-white text-[10px] sm:text-xs text-center text-ox-white p-1 sm:p-2">
                  {project.totalIssueCount}
                </TableCell>
                <TableCell className="text-center p-1 sm:p-2">
                  <Badge
                    variant="secondary"
                    className={`${getColor(project.primaryLanguage)} text-[10px] sm:text-xs`}
                  >
                    {project.primaryLanguage}
                  </Badge>
                </TableCell>
                <TableCell className="text-white text-[10px] sm:text-xs text-center text-ox-white font-semibold p-1 sm:p-2">
                  {project.popularity}
                </TableCell>
                <TableCell className="text-white text-[10px] sm:text-xs text-center text-ox-white font-semibold md:table-cell p-1 sm:p-2">
                  {project.stage}
                </TableCell>
                <TableCell className="text-white text-[10px] sm:text-xs text-center text-ox-white font-semibold md:table-cell p-1 sm:p-2">
                  {project.competition}
                </TableCell>
                <TableCell className="text-white text-[10px] sm:text-xs text-center text-ox-white font-semibold md:table-cell p-1 sm:p-2">
                  {project.activity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


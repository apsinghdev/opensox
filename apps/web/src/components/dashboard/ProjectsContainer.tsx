"use client";

import React, { useMemo, useState } from "react";
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
import { ChevronUpIcon, ChevronDownIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

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
  { key: "name", label: "Project", sortable: true },
  { key: "issues", label: "Issues", sortable: true },
  { key: "language", label: "Language", sortable: true },
  { key: "popularity", label: "Popularity", sortable: true },
  { key: "stage", label: "Stage", sortable: true },
  { key: "competition", label: "Competition", sortable: true },
  { key: "activity", label: "Activity", sortable: true },
];

export default function ProjectsContainer({ projects }: ProjectsContainerProps) {
  const pathname = usePathname();
  const { projectTitle } = useProjectTitleStore();
  const { setShowFilters } = useFilterStore();
  const isProjectsPage = pathname === "/dashboard/projects";

  // --- Sort state ---
  // default sort: issues descending (more -> 0)
  const [sortColumn, setSortColumn] = useState<string>("issues");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      // default direction: name -> asc, issues -> desc, others asc by default
      setSortDirection(col === "issues" ? "desc" : "asc");
    }
  };

  // allow keyboard activation on header cells
  const handleHeaderKey = (e: React.KeyboardEvent, colKey: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSort(colKey);
    }
  };

  // --- Filter state ---
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [stage, setStage] = useState("all");
  const [competition, setCompetition] = useState("all");
  const [activity, setActivity] = useState("all");
  const [minIssues, setMinIssues] = useState<string>("");
  const [maxIssues, setMaxIssues] = useState<string>("");
  const [popularity, setPopularity] = useState("all");

  // derive unique filter options from incoming projects
  const options = useMemo(() => {
    const langs = new Set<string>();
    const stages = new Set<string>();
    const comps = new Set<string>();
    const acts = new Set<string>();
    const pops = new Set<string>();

    projects.forEach((p) => {
      if (p.primaryLanguage) langs.add(p.primaryLanguage);
      if (p.stage) stages.add(p.stage);
      if (p.competition) comps.add(p.competition);
      if (p.activity) acts.add(p.activity);
      if (p.popularity !== undefined && p.popularity !== null) pops.add(String(p.popularity));
    });

    return {
      languages: Array.from(langs).sort((a, b) => a.localeCompare(b)),
      stages: Array.from(stages).sort((a, b) => a.localeCompare(b)),
      competitions: Array.from(comps).sort((a, b) => a.localeCompare(b)),
      activities: Array.from(acts).sort((a, b) => a.localeCompare(b)),
      popularity: Array.from(pops).sort((a, b) => Number(a) - Number(b)),
    };
  }, [projects]);

  // --- Filtered result ---
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      // Project name / repo search
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;

      // Language
      if (language !== "all" && (p.primaryLanguage || "").toLowerCase() !== language.toLowerCase())
        return false;

      // Stage
      if (stage !== "all" && (p.stage || "").toLowerCase() !== stage.toLowerCase()) return false;

      // Competition
      if (competition !== "all" && (p.competition || "").toLowerCase() !== competition.toLowerCase())
        return false;

      // Activity
      if (activity !== "all" && (p.activity || "").toLowerCase() !== activity.toLowerCase()) return false;

      // Issues range
      const issues = Number(p.totalIssueCount ?? 0);
      if (minIssues !== "") {
        const mi = Number(minIssues);
        if (!Number.isFinite(mi) || issues < mi) return false;
      }
      if (maxIssues !== "") {
        const ma = Number(maxIssues);
        if (!Number.isFinite(ma) || issues > ma) return false;
      }

      // Popularity (string compare because options built as strings)
      if (popularity !== "all" && String(p.popularity) !== popularity) return false;

      return true;
    });
  }, [
    projects,
    query,
    language,
    stage,
    competition,
    activity,
    minIssues,
    maxIssues,
    popularity,
  ]);

  // --- Sorted result (apply after filters) ---
  const sorted = useMemo(() => {
    const list = [...filtered];

    const getStr = (v: any) => (v == null ? "" : String(v).toLowerCase());
    const getNum = (v: any) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    list.sort((a, b) => {
      const dir = sortDirection === "asc" ? 1 : -1;

      switch (sortColumn) {
        case "name": {
          const A = getStr(a.name);
          const B = getStr(b.name);
          if (A < B) return -1 * dir;
          if (A > B) return 1 * dir;
          return 0;
        }

        case "issues": {
          const A = getNum(a.totalIssueCount);
          const B = getNum(b.totalIssueCount);
          if (A < B) return -1 * dir;
          if (A > B) return 1 * dir;
          // tie-break by name asc to make order deterministic
          return getStr(a.name).localeCompare(getStr(b.name));
        }

        case "language": {
          const A = getStr(a.primaryLanguage);
          const B = getStr(b.primaryLanguage);
          if (A < B) return -1 * dir;
          if (A > B) return 1 * dir;
          return getStr(a.name).localeCompare(getStr(b.name));
        }

        case "popularity": {
          const A = getNum(a.popularity);
          const B = getNum(b.popularity);
          if (A < B) return -1 * dir;
          if (A > B) return 1 * dir;
          return getStr(a.name).localeCompare(getStr(b.name));
        }

        case "stage":
        case "competition":
        case "activity": {
          const A = getStr((a as any)[sortColumn]);
          const B = getStr((b as any)[sortColumn]);
          if (A < B) return -1 * dir;
          if (A > B) return 1 * dir;
          return getStr(a.name).localeCompare(getStr(b.name));
        }

        default:
          return 0;
      }
    });

    return list;
  }, [filtered, sortColumn, sortDirection]);

  const resetFilters = () => {
    setQuery("");
    setLanguage("all");
    setStage("all");
    setCompetition("all");
    setActivity("all");
    setMinIssues("");
    setMaxIssues("");
    setPopularity("all");
    // Keep sort state as-is (you can reset sort here if you want)
  };

  const renderSortIcon = (colKey: string) => {
    if (sortColumn !== colKey) {
      return <ArrowsUpDownIcon className="inline-block w-3 h-3 opacity-60" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="inline-block w-3 h-3" />
    ) : (
      <ChevronDownIcon className="inline-block w-3 h-3" />
    );
  };

  return (
    <div className="w-full p-6 sm:p-6">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
          {projectTitle}
        </h2>
        {isProjectsPage && (
          <div className="flex items-center gap-3">
            <Button
              className="font-semibold text-text-primary bg-ox-purple text-sm sm:text-base h-10 sm:h-11 px-5 sm:px-6 hover:bg-white-500 rounded-md"
              onClick={() => setShowFilters(true)}
            >
              Find projects
            </Button>
          </div>
        )}
      </div>

      {/* Filters bar */}
      {isProjectsPage && (
        <div className="mb-4 w-full flex flex-wrap gap-3 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="px-3 py-2 rounded-md border bg-ox-content text-text-primary min-w-[200px]"
            aria-label="Search projects"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-md border bg-ox-content"
            aria-label="Filter by language"
          >
            <option value="all">All languages</option>
            {options.languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="px-3 py-2 rounded-md border bg-ox-content"
            aria-label="Filter by stage"
          >
            <option value="all">All stages</option>
            {options.stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            className="px-3 py-2 rounded-md border bg-ox-content"
            aria-label="Filter by competition"
          >
            <option value="all">All competition</option>
            {options.competitions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="px-3 py-2 rounded-md border bg-ox-content"
            aria-label="Filter by activity"
          >
            <option value="all">All activity</option>
            {options.activities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minIssues}
              onChange={(e) => setMinIssues(e.target.value)}
              placeholder="Min issues"
              className="px-2 py-1 rounded-md border w-24 bg-ox-content"
              aria-label="Minimum issues"
            />
            <input
              type="number"
              value={maxIssues}
              onChange={(e) => setMaxIssues(e.target.value)}
              placeholder="Max issues"
              className="px-2 py-1 rounded-md border w-24 bg-ox-content"
              aria-label="Maximum issues"
            />
          </div>

          <select
            value={popularity}
            onChange={(e) => setPopularity(e.target.value)}
            className="px-3 py-2 rounded-md border bg-ox-content"
            aria-label="Filter by popularity"
          >
            <option value="all">All popularity</option>
            {options.popularity.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <Button variant={"ghost" as any} onClick={resetFilters} className="ml-auto">
            Reset
          </Button>
        </div>
      )}

      {sorted && sorted.length > 0 ? (
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
                {tableColumns.map((col, i) => {
                  const isSortable = !!col.sortable;
                  const ariaSort =
                    isSortable && sortColumn === col.key
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none";

                  // align first column left
                  const alignmentClass = i === 0 ? "text-left" : "text-center";

                  return (
                    <TableHead
                      key={col.key}
                      className={[
                        "px-3 py-3 font-semibold text-brand-purple text-[12px] sm:text-sm whitespace-nowrap",
                        "sticky top-0 z-30 bg-ox-content",
                        alignmentClass,
                        isSortable ? "cursor-pointer select-none" : "",
                      ].join(" ")}
                      // Only make it interactive if sortable
                      onClick={() => isSortable && handleSort(col.key)}
                      onKeyDown={(e) => isSortable && handleHeaderKey(e as React.KeyboardEvent, col.key)}
                      role={isSortable ? "button" : undefined}
                      tabIndex={isSortable ? 0 : -1}
                      aria-sort={ariaSort}
                      aria-label={isSortable ? `${col.label} sortable` : col.label}
                    >
                      <div className={i === 0 ? "flex items-center gap-2 justify-between" : "flex items-center justify-center gap-2"}>
                        <span className={i === 0 ? "text-left w-full" : ""}>{col.label}</span>
                        {isSortable && <span className="ml-1">{renderSortIcon(col.key)}</span>}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {sorted.map((p) => (
                <TableRow
                  key={p.id}
                  className="border-y border-ox-gray cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => window.open(p.url, "_blank")}
                >
                  <TableCell className="p-1 sm:p-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full overflow-hidden inline-block h-4 w-4 sm:h-6 sm:w-6 border">
                        <Image src={p.avatarUrl} className="w-full h-full object-cover" alt={p.name} width={24} height={24} />
                      </div>
                      <span className="text-text-primary text-[10px] sm:text-xs font-semibold">{p.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center p-1 sm:p-2 whitespace-nowrap">
                    {Number(p.totalIssueCount ?? 0)}
                  </TableCell>

                  <TableCell className="text-center p-1 sm:p-2">
                    <Badge variant="secondary" className={`${getColor(p.primaryLanguage)} text-[10px] sm:text-xs whitespace-nowrap`}>
                      {p.primaryLanguage || "—"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.popularity ?? "—"}
                  </TableCell>
                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.stage ?? "—"}
                  </TableCell>
                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.competition ?? "—"}
                  </TableCell>
                  <TableCell className="text-text-primary text-[10px] sm:text-xs text-center font-semibold p-1 sm:p-2 whitespace-nowrap">
                    {p.activity ?? "—"}
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
            Click the &apos;Find projects&apos; button above to discover open source projects that match your interests
          </p>
        </div>
      ) : null}
    </div>
  );
}

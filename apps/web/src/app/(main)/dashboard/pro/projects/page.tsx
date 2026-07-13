"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { useSubscription } from "@/hooks/useSubscription";
import { trpc } from "@/lib/trpc";

import { ProjectCard } from "./_components/ProjectCard";
import type { ProProject } from "./_components/project-types";

const PAGE_SIZE = 21;

const ProProjectsPage = (): JSX.Element | null => {
  const { isPaidUser, isLoading: subscriptionLoading } = useSubscription();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!subscriptionLoading && !isPaidUser) {
      router.push("/pricing");
    }
  }, [isPaidUser, subscriptionLoading, router]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const authenticated = !!session?.user && status === "authenticated";

  const { data, isLoading, isError } = trpc.proProjects.list.useQuery(
    {
      search: debouncedSearch || undefined,
      page,
      pageSize: PAGE_SIZE,
    },
    {
      enabled: authenticated && isPaidUser,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    }
  );

  const projects = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const isInitialLoading =
    subscriptionLoading || (isPaidUser && isLoading && !data);

  if (isInitialLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-ox-content">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (!isPaidUser) {
    return null;
  }

  return (
    <div className="w-full min-h-full bg-ox-content">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            Pro Projects
          </h1>
          <p className="text-text-secondary text-sm md:text-base mt-2">
            Hand-picked open source projects worth contributing to.
          </p>
        </div>

        <ProjectsContent
          search={search}
          onSearchChange={setSearch}
          projects={projects}
          isError={isError}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

type ProjectsContentProps = {
  search: string;
  onSearchChange: (value: string) => void;
  projects: ProProject[];
  isError: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ProjectsContent({
  search,
  onSearchChange,
  projects,
  isError,
  page,
  totalPages,
  onPageChange,
}: ProjectsContentProps): JSX.Element {
  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search projects"
          placeholder="Search projects..."
          className="w-full bg-dash-surface border border-dash-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none"
        />
      </div>

      {isError ? (
        <p className="text-text-secondary text-center py-16">
          Failed to load projects. Please try again later.
        </p>
      ) : projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                item={project}
                position={(page - 1) * PAGE_SIZE + index + 1}
              />
            ))}
          </div>

          {totalPages > 1 ? (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          ) : null}
        </>
      ) : (
        <p className="text-text-secondary text-center py-16">
          No projects found.
        </p>
      )}
    </>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}): JSX.Element {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-dash-surface border border-dash-border text-text-secondary hover:bg-dash-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-text-secondary text-sm px-2">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-dash-surface border border-dash-border text-text-secondary hover:bg-dash-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ProProjectsPage;

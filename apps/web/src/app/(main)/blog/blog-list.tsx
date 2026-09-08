"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import type { BlogMeta, BlogTag } from "@/lib/blog";
import BlogThemeSelector from "./blog-theme";
import BlogSocials from "./blog-socials";

type BlogFilter = BlogTag | "all";

const FILTERS: { id: BlogFilter; label: string }[] = [
  { id: "open-source", label: "Open source" },
  { id: "build-in-public", label: "Build in public" },
  { id: "learning", label: "Learning" },
  { id: "all", label: "All" },
];

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

export default function BlogList({ posts }: { posts: BlogMeta[] }) {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("open-source");

  const filtered =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.tag === activeFilter);

  const handleFilterClick = (filter: BlogFilter) => {
    setActiveFilter(filter);
  };

  const handleFilterKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    filter: BlogFilter
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveFilter(filter);
    }
  };

  return (
    <main className="blog-page min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/home"
              className="text-sm blog-link transition-colors"
            >
              &larr; Dashboard
            </Link>
            <BlogThemeSelector />
          </div>
          <h1 className="blog-heading mt-6">
            Opensox Blog
          </h1>
          <p className="blog-text-secondary mt-2">
            Thoughts on open source, startups, and building in public.
          </p>
        </header>

        <div
          className="flex gap-2 mb-10 flex-wrap"
          role="tablist"
          aria-label="Filter blog posts"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              tabIndex={0}
              onClick={() => handleFilterClick(filter.id)}
              onKeyDown={(event) => handleFilterKeyDown(event, filter.id)}
              aria-pressed={activeFilter === filter.id}
              aria-selected={activeFilter === filter.id}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                activeFilter === filter.id ? "blog-tag-active" : "blog-link"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          {filtered.length === 0 ? (
            <p className="blog-text-muted py-8">No posts found.</p>
          ) : (
            filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group py-5 border-b blog-border first:border-t"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="blog-list-title blog-title transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm blog-text-muted whitespace-nowrap font-mono">
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="blog-text-secondary text-sm mt-1.5 line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))
          )}
        </div>

        <div className="mt-12">
          <BlogSocials />
        </div>
      </div>
    </main>
  );
}

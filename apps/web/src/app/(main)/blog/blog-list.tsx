"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogMeta, BlogTag } from "@/lib/blog";
import BlogThemeSelector from "./blog-theme";
import BlogSocials from "./blog-socials";

const tags: BlogTag[] = ["engineering", "startup", "distribution", "misc"];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogList({ posts }: { posts: BlogMeta[] }) {
  const [activeTag, setActiveTag] = useState<BlogTag | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tag === activeTag)
    : posts;

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

        <div className="flex gap-2 mb-10 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              activeTag === null
                ? "blog-tag-active"
                : "blog-link"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`px-3 py-1 text-sm rounded-full border transition-colors capitalize ${
                activeTag === tag
                  ? "blog-tag-active"
                  : "blog-link"
              }`}
            >
              {tag}
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

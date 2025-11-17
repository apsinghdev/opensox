"use client";

import React from "react";
import { use } from "react";
import Link from "next/link";
import { getNewsletterBySlug, formatDate } from "@/data/newsletters";
import { MarkdownRenderer } from "@/components/newsletter/MarkdownRenderer";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

interface NewsletterDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function NewsletterDetailPage({
  params,
}: NewsletterDetailPageProps) {
  const { slug } = use(params);
  const newsletter = getNewsletterBySlug(slug);

  if (!newsletter) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-ox-white mb-4">
            newsletter not found
          </h1>
          <Link
            href="/dashboard/newsletter"
            className="text-ox-purple hover:underline"
          >
            back to newsletters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/dashboard/newsletter"
        className="inline-flex items-center gap-2 text-ox-gray hover:text-ox-purple transition-colors mb-6"
      >
        <ArrowLeftIcon className="size-4" />
        <span>back to newsletters</span>
      </Link>

      <article className="prose prose-invert max-w-none">
        <header className="mb-8">
          {/* badges for PRO and issue number */}
          {(newsletter.issueNumber) && (
            <div className="flex items-center gap-2 mb-4">
              {newsletter.issueNumber && (
                <span className="text-xs text-ox-gray">
                  issue {newsletter.issueNumber}
                </span>
              )}
            </div>
          )}

          <h1 className="text-4xl font-bold text-ox-white mb-4">
            {newsletter.title}
          </h1>

          {/* description if available */}
          {newsletter.description && (
            <p className="text-lg text-ox-gray mb-4">
              {newsletter.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-ox-gray">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4" />
              <span>{formatDate(newsletter.publishedAt)}</span>
            </div>
            {newsletter.author && (
              <>
                <span>•</span>
                <span>by {newsletter.author}</span>
              </>
            )}
            {newsletter.readTime && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <ClockIcon className="size-4" />
                  <span>{newsletter.readTime} min read</span>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="newsletter-content">
          <MarkdownRenderer content={newsletter.content} />
        </div>
      </article>
    </div>
  );
}
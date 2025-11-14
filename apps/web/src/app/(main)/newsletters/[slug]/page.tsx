"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { newsletters } from "@/data/newsletters";
import { useSubscription } from "@/hooks/useSubscription";

export default function NewsletterPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = use(params);
  const { isPaidUser, isLoading } = useSubscription();
  const newsletter = newsletters.find(n => n.slug === slug);

  if (!newsletter) notFound();

  // loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center text-white">
        <p>loading...</p>
      </div>
    );
  }

  // premium gate
  if (!isPaidUser) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4">
        <div className="text-center max-w-md text-white">
          <h1 className="text-2xl font-bold mb-4">premium content</h1>
          <p className="text-gray-400 mb-6">subscribe to access this newsletter</p>
          <Link href="/pricing" className="text-[#a472ea] hover:underline">
            view plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      {/* navigation bar */}
      <div className="sticky top-0 z-10 bg-[#101010]/95 backdrop-blur-sm border-b border-[#252525]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* back to newsletters */}
            <Link 
              href="/newsletters" 
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">newsletters</span>
            </Link>

            {/* back to dashboard */}
            <Link 
              href="/dashboard/home"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* header */}
        <header className="mb-8 md:mb-12">
          {/* metadata */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            <span className="text-xs md:text-sm text-gray-500 font-mono">
              {newsletter.date}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-xs md:text-sm text-gray-500">
              {calculateReadTime(newsletter.content)} min read
            </span>
          </div>

          {/* title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {newsletter.title}
          </h1>
          
          {/* excerpt */}
          <p className="text-lg md:text-xl text-gray-400 mb-6">
            {newsletter.excerpt}
          </p>
          
          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {newsletter.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs md:text-sm bg-[#a472ea]/10 text-[#a472ea] px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        {/* divider */}
        <div className="h-px bg-[#252525] mb-8 md:mb-12"></div>
        
        {/* content */}
        <article 
          className="prose-newsletter"
          dangerouslySetInnerHTML={{ __html: newsletter.content }}
        />

        {/* divider */}
        <div className="h-px bg-[#252525] mt-12 mb-8"></div>

        {/* footer navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link 
            href="/newsletters"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>all newsletters</span>
          </Link>
          
          <Link 
            href="/dashboard/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <Home className="w-4 h-4" />
            <span>back to dashboard</span>
          </Link>
        </div>
      </div>

      {/* styles */}
      <style jsx global>{`
        .prose-newsletter h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .prose-newsletter h2:first-child {
          margin-top: 0;
        }

        .prose-newsletter h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: white;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .prose-newsletter p {
          color: #d1d5db;
          line-height: 1.75;
          margin-bottom: 1.25rem;
          font-size: 1.0625rem;
        }

        .prose-newsletter strong {
          color: white;
          font-weight: 600;
        }

        .prose-newsletter a {
          color: #a472ea;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .prose-newsletter a:hover {
          color: #b894f5;
        }

        .prose-newsletter img {
          width: 100%;
          border-radius: 0.5rem;
          margin: 2rem 0;
        }

        .prose-newsletter ul {
          list-style: none;
          margin: 1.25rem 0;
          padding: 0;
        }

        .prose-newsletter li {
          color: #d1d5db;
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.7;
        }

        .prose-newsletter li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #a472ea;
          font-weight: bold;
          font-size: 1.2em;
        }

        /* mobile adjustments */
        @media (max-width: 768px) {
          .prose-newsletter h2 {
            font-size: 1.5rem;
            margin-top: 2rem;
          }

          .prose-newsletter h3 {
            font-size: 1.25rem;
          }

          .prose-newsletter p {
            font-size: 1rem;
          }
        }
      `}</style>
    </main>
  );
}

function calculateReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = words / 238;
  return Math.max(1, Math.ceil(minutes));
}
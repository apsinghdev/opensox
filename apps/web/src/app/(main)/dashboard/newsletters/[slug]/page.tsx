"use client";

import { NEWSLETTERS } from "@/data/newsletters";
import NewsletterContent from "@/components/newsletters/NewsletterContent";
import { CalendarIcon, ArrowLeftIcon, ClockIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const n = NEWSLETTERS.find((x) => x.slug === params.slug);
  const [isSaved, setIsSaved] = useState(false);

  if (!n) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-light text-white mb-8">Newsletter not found</h1>
          <Link 
            href="/dashboard/newsletters" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-light"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            Back to newsletters
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = n.body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <main className="min-h-screen bg-black">
      
      {/* Back Navigation */}
      <div className="border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-xl z-40">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link 
            href="/dashboard/newsletters" 
            className="inline-flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-sm font-light"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            Newsletters
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        
        {/* Article Header */}
        <header className="mb-20">
          {n.featured && (
            <div className="mb-8">
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-light">
                Featured
              </span>
            </div>
          )}
          
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-white mb-8 leading-[1.1]">
            {n.title}
          </h1>
          
          <p className="text-lg text-zinc-400 mb-12 leading-relaxed font-light">
            {n.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between py-6 border-y border-zinc-900">
            <div className="flex items-center gap-8 text-zinc-500 text-sm font-light">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{new Date(n.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{readingTime} min</span>
              </div>
            </div>

            {/* Save Button */}
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`
                flex items-center gap-2 transition-all duration-300 text-sm font-light
                ${isSaved 
                  ? 'text-white' 
                  : 'text-zinc-500 hover:text-white'
                }
              `}
            >
              {isSaved ? (
                <BookmarkSolid className="w-4 h-4" />
              ) : (
                <BookmarkIcon className="w-4 h-4" />
              )}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none">
          <div className="text-zinc-300 leading-[1.8] text-base font-light">
            <NewsletterContent body={n.body} />
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-32 pt-12 border-t border-zinc-900">
          <div className="flex items-center justify-between">
            <div className="text-zinc-600 text-sm font-light">
              OpenSox Team
            </div>
            
            <Link 
              href="/dashboard/newsletters" 
              className="text-zinc-400 hover:text-white text-sm font-light transition-colors"
            >
              More newsletters →
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
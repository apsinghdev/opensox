"use client";

import "@/styles/newsletter.css";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/hooks/useSubscription";
import { PremiumUpgradePrompt } from "@/components/newsletters/PremiumUpgradePrompt";

interface NewsletterData {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

function NewsletterSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="mb-8 pb-6 border-b border-zinc-800">
        <Skeleton className="h-8 w-full max-w-3xl mb-4 bg-zinc-800" />
        <Skeleton className="h-8 w-3/4 mb-6 bg-zinc-800" />
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-4 w-32 bg-zinc-800" />
          <Skeleton className="h-4 w-4 bg-zinc-800 rounded-full" />
          <Skeleton className="h-4 w-24 bg-zinc-800" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-6">
        {/* Paragraph 1 */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-11/12 bg-zinc-800" />
        </div>

        {/* Heading */}
        <Skeleton className="h-7 w-2/3 bg-zinc-800 mt-8" />

        {/* Paragraph 2 */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-10/12 bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
        </div>

        {/* Image placeholder */}
        <Skeleton className="h-64 w-full bg-zinc-800 rounded-lg mt-6" />

        {/* Heading */}
        <Skeleton className="h-7 w-1/2 bg-zinc-800 mt-8" />

        {/* Paragraph 3 */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-9/12 bg-zinc-800" />
        </div>

        {/* List items */}
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-5/6 bg-zinc-800" />
          <Skeleton className="h-4 w-4/5 bg-zinc-800" />
          <Skeleton className="h-4 w-11/12 bg-zinc-800" />
        </div>

        {/* Final paragraph */}
        <div className="space-y-3 mt-6">
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-3/4 bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export default function NewsletterPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [newsletter, setNewsletter] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'unauthorized' | 'forbidden' | 'not-found' | null>(null);
  const { isPaidUser, isLoading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    if (subscriptionLoading) return;

    fetch(`/api/newsletters/${slug}`)
      .then(async (res) => {
        if (res.status === 401) {
          setError('unauthorized');
          setLoading(false);
          return null;
        }
        if (res.status === 403) {
          setError('forbidden');
          setLoading(false);
          return null;
        }
        if (!res.ok) {
          setError('not-found');
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setNewsletter(data);
          setError(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('not-found');
        setLoading(false);
      });
  }, [slug, subscriptionLoading]);

  if (subscriptionLoading) {
    return (
      <div className="w-full h-full overflow-auto">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Skeleton className="h-8 w-32 mb-6 bg-zinc-800" />
          <NewsletterSkeleton />
        </div>
      </div>
    );
  }

  if (!isPaidUser || error === 'forbidden') {
    return <PremiumUpgradePrompt />;
  }

  if (error === 'unauthorized') {
    router.push('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="w-full h-full overflow-auto">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Skeleton className="h-8 w-32 mb-6 bg-zinc-800" />
          <NewsletterSkeleton />
        </div>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Newsletter not found</h2>
          <p className="text-zinc-400 text-sm mb-4">The newsletter you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push("/dashboard/newsletters")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-ox-purple hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back to newsletters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white mb-6 transition-colors text-sm group"
        >
          <ArrowLeftIcon className="size-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>

        <article>
          {/* Header */}
          <header className="mb-8 pb-6 border-b border-zinc-800">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {newsletter.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="size-4 shrink-0" />
                {new Date(newsletter.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="size-4 shrink-0" />
                {newsletter.readTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="newsletter-content prose prose-invert max-w-none
              prose-headings:text-white prose-headings:font-semibold
              prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-ox-purple prose-a:no-underline hover:prose-a:text-purple-400 
              prose-strong:text-white prose-strong:font-medium
              prose-ul:text-zinc-300 prose-ol:text-zinc-300
              prose-li:my-1
              prose-blockquote:border-l-2 prose-blockquote:border-ox-purple prose-blockquote:pl-4 
              prose-blockquote:italic prose-blockquote:text-zinc-400
              prose-code:text-ox-purple prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: newsletter.content }}
          />
        </article>
      </div>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { newsletters } from "../data/newsletters";
import NewsletterContent from "../components/NewsletterContent";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NewsletterContentItem } from "@/types/newsletter";
import { GeistSans } from "geist/font/sans";
import { formatNewsletterDate } from "../utils/newsletter.utils";
import { useSubscription } from "@/hooks/useSubscription";
import NewsletterPremiumGate from "../components/NewsletterPremiumGate";

export default function NewsletterPage() {
  const params = useParams();
  const { isPaidUser, isLoading } = useSubscription();
  const id = params.id as string;
  const newsletter = newsletters.find((n) => n.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!isPaidUser) {
    return <NewsletterPremiumGate />;
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Newsletter not found
          </h1>
          <Link href="/dashboard/newsletters">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to newsletters
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = formatNewsletterDate(newsletter.date);

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* back button */}
        <Link href="/dashboard/newsletters">
          <Button variant="ghost" className="mb-8 -ml-2 hover:bg-secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All newsletters
          </Button>
        </Link>

        {/* newsletter header */}
        <header className="mb-12">
          {newsletter.coverImage && (
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg mb-8 bg-muted">
              {typeof newsletter.coverImage === "string" ? (
                <Image
                  src={newsletter.coverImage}
                  alt={newsletter.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <Image
                  src={newsletter.coverImage}
                  alt={newsletter.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
          )}

          <h1 className={`text-2xl md:text-4xl font-bold text-foreground mb-6 ${GeistSans.className}`}>
            {newsletter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            {newsletter.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{newsletter.readTime}</span>
              </div>
            )}
            {newsletter.author && <span>by {newsletter.author}</span>}
          </div>

          {newsletter.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {newsletter.excerpt}
            </p>
          )}
        </header>

        {/* divider */}
        <div className="border-t border-border mb-12" />

        {/* newsletter content */}
        <div className="prose prose-lg max-w-none font-sans">
          <NewsletterContent content={newsletter.content as NewsletterContentItem[]} />
        </div>

        {/* footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/dashboard/newsletters">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all newsletters
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


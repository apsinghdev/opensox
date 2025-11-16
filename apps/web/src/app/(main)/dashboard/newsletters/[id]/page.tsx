"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { newsletters } from "../data/newsletters";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";

/**
 * Renders content with automatic URL detection and conversion to clickable links
 * @param content - Text content that may contain URLs
 * @returns Rendered content with clickable links
 */
const renderContent = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <Link
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
        >
          {part}
        </Link>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

/**
 * Individual newsletter page component
 * Displays a single newsletter with full content, metadata, and navigation
 * @returns Newsletter detail page component
 */
export default function NewsletterPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const newsletter = newsletters.find((n) => n.id === id);

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
          {newsletter.image && (
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg mb-8 bg-muted">
              <Image
                src={newsletter.image}
                alt={newsletter.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <h1 className={`text-2xl md:text-4xl font-bold text-foreground mb-6 ${GeistSans.className}`}>
            {newsletter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{newsletter.date}</span>
            </div>
            <span>by {newsletter.author}</span>
          </div>

          {newsletter.preview && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {newsletter.preview}
            </p>
          )}
        </header>

        {/* divider */}
        <div className="border-t border-border mb-12" />

        {/* newsletter content */}
        <div className="prose prose-lg max-w-none font-sans mb-12">
          <div className="text-foreground/90 leading-relaxed space-y-6">
            {newsletter.content.split('\n\n').map((paragraph, index) => (
              <div key={index}>
                <p className="whitespace-pre-line">
                  {renderContent(paragraph)}
                </p>
                {/* Insert images after specific paragraphs */}
                {newsletter.contentImages && index === 1 && newsletter.contentImages[0] && (
                  <div className="relative w-full h-[300px] my-8 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={newsletter.contentImages[0]}
                      alt={`${newsletter.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                {newsletter.contentImages && index === 3 && newsletter.contentImages[1] && (
                  <div className="relative w-full h-[300px] my-8 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={newsletter.contentImages[1]}
                      alt={`${newsletter.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* takeaways */}
        {newsletter.takeaways && newsletter.takeaways.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-semibold text-foreground mb-4 ${GeistSans.className}`}>
              Key Takeaways
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              {newsletter.takeaways.map((takeaway, index) => (
                <li key={index} className="text-foreground/90">
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}

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

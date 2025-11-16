"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { newsletters } from "../data/newsletters";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";

const renderContent = (text: string) => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <Link
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
        >
          {part}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const ContentImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-full h-[300px] my-8 rounded-lg overflow-hidden bg-muted">
    <Image src={src} alt={alt} fill className="object-cover" unoptimized />
  </div>
);

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

  const paragraphs = newsletter.content.split('\n\n');

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/dashboard/newsletters">
          <Button variant="ghost" className="mb-8 -ml-2 hover:bg-secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All newsletters
          </Button>
        </Link>

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

        <div className="border-t border-border mb-12" />

        <div className="prose prose-lg max-w-none font-sans mb-12">
          <div className="text-foreground/90 leading-relaxed space-y-6">
            {paragraphs.map((paragraph, index) => (
              <div key={index}>
                <p className="whitespace-pre-line">
                  {renderContent(paragraph)}
                </p>
                {newsletter.contentImages?.[0] && index === 1 && (
                  <ContentImage
                    src={newsletter.contentImages[0]}
                    alt={`${newsletter.title} - Image 1`}
                  />
                )}
                {newsletter.contentImages?.[1] && index === 3 && (
                  <ContentImage
                    src={newsletter.contentImages[1]}
                    alt={`${newsletter.title} - Image 2`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

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

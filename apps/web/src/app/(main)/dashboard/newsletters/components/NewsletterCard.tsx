import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Newsletter } from "@/types/newsletter";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";
import { formatNewsletterDate } from "../utils/newsletter.utils";

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const formattedDate = formatNewsletterDate(newsletter.date);

  return (
    <Link href={`/dashboard/newsletters/${newsletter.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border hover:border-[#693dab] cursor-pointer">
        {newsletter.coverImage && (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            {typeof newsletter.coverImage === "string" ? (
              <Image
                src={newsletter.coverImage}
                alt={newsletter.title}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                unoptimized
              />
            ) : (
              <Image
                src={newsletter.coverImage}
                alt={newsletter.title}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105 hover:opacity-80"
              />
            )}
          </div>
        )}
        <div className="p-6 space-y-3">
          <h2 className={`text-2xl font-semibold text-foreground hover:text-primary transition-colors ${GeistSans.className}`}>
            {newsletter.title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          </div>
          <p className="text-foreground/80 line-clamp-2 leading-relaxed">
            {newsletter.excerpt}
          </p>
          {newsletter.author && (
            <p className="text-sm text-muted-foreground">by {newsletter.author}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}


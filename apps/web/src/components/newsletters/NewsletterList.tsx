import { NewsletterCard, Newsletter } from "./NewsletterCard";
import { NewsletterSkeleton } from "./NewsletterSkeleton";

interface NewsletterListProps {
  newsletters: Newsletter[];
  loading: boolean;
  hasFilters: boolean;
}

export function NewsletterList({ newsletters, loading, hasFilters }: NewsletterListProps) {
  if (loading) {
    return (
      <div className="space-y-5">
        <NewsletterSkeleton />
        <NewsletterSkeleton />
        <NewsletterSkeleton />
      </div>
    );
  }

  if (newsletters.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-400 text-lg">
          {hasFilters ? "No newsletters found matching your filters." : "No newsletters available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {newsletters.map((newsletter, index) => (
        <NewsletterCard key={newsletter.id || `newsletter-${index}`} newsletter={newsletter} />
      ))}
    </div>
  );
}

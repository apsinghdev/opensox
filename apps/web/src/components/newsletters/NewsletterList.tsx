import { NEWSLETTERS, Newsletter } from "@/data/newsletters";
import NewsletterCard from "./NewsletterCrad";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NewsletterList({
  query = "",
  monthFilter = "all",
}: {
  query?: string;
  monthFilter?: string;
}) {
  const filtered = NEWSLETTERS
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .filter((newsletter) => {
      const matchesSearch = query
        ? newsletter.title.toLowerCase().includes(query.toLowerCase()) ||
          newsletter.excerpt.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesMonth =
        monthFilter === "all" ? true : newsletter.date.startsWith(monthFilter);

      return matchesSearch && matchesMonth;
    });

  const groupedNewsletters = filtered.reduce((acc, newsletter) => {
    const date = new Date(newsletter.date);
    const year = date.getFullYear();
    const month = date.toLocaleDateString("en-US", { month: "long" });

    const key = `${year}-${month}`;
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        newsletters: [],
      };
    }
    acc[key].newsletters.push(newsletter);
    return acc;
  }, {} as Record<string, { year: number; month: string; newsletters: Newsletter[] }>);

  const groupedArray = Object.values(groupedNewsletters);

  if (!filtered.length) {
    return (
      <div className="text-center py-32">
        <DocumentMagnifyingGlassIcon className="w-8 h-8 text-zinc-800 mx-auto mb-6" />

        <h3 className="text-xl font-light text-white mb-3">
          {query || monthFilter !== "all"
            ? "No newsletters found"
            : "No newsletters yet"}
        </h3>

        <p className="text-zinc-600 text-sm max-w-md mx-auto font-light leading-relaxed">
          {query || monthFilter !== "all"
            ? "Try adjusting your search or filter"
            : "New content coming soon"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      {groupedArray.map((group) => (
        <div key={`${group.year}-${group.month}`}>
          {/* Month/Year Header */}
          <div className="mb-12 pb-6 border-b border-zinc-900">
            <h2 className="text-sm tracking-[0.2em] uppercase text-zinc-600 font-light mb-1">
              {group.month} {group.year}
            </h2>

            <p className="text-xs text-zinc-700 font-light">
              {group.newsletters.length}{" "}
              {group.newsletters.length === 1 ? "article" : "articles"}
            </p>
          </div>

          {/* Newsletter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {group.newsletters.map((n) => (
              <NewsletterCard key={n.slug} n={n} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
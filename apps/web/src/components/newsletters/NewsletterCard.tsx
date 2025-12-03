import Link from "next/link";

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  excerpt?: string;
  date: string;
  readTime: string;
  tags?: string[];
}

export function NewsletterCard({ newsletter }: { newsletter: Newsletter }) {
  return (
    <Link href={`/dashboard/newsletters/${newsletter.id}`} className="block">
      <div className="group bg-[#111111] border border-zinc-800 rounded-lg p-4 sm:p-6 hover:border-zinc-700 transition-all cursor-pointer">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1 w-full">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-zinc-200 transition-colors line-clamp-2">
              {newsletter.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
              {newsletter.excerpt || newsletter.description}
            </p>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 text-xs sm:text-sm text-zinc-500 sm:min-w-[120px] w-full sm:w-auto justify-between sm:justify-start">
            <span>{newsletter.date}</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {newsletter.readTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

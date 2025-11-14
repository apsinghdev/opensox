import Link from "next/link";
import Image from "next/image";
import { Newsletter } from "@/data/newsletters";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function NewsletterCard({ n }: { n: Newsletter }) {
  return (
    <article className="group">
      <Link href={`/dashboard/newsletters/${n.slug}`} className="block">
        {/* Hero Image */}
        {n.hero && (
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#15161a] mb-6">
            <Image 
              src={n.hero} 
              alt={n.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className={n.hero ? "" : "pt-2"}>
          {n.featured && (
            <div className="mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-light">
                Featured
              </span>
            </div>
          )}

          <h3 className="text-xl lg:text-2xl font-light text-white mb-3 group-hover:text-zinc-400 transition-colors duration-300 leading-tight">
            {n.title}
          </h3>
          
          <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
            {n.excerpt}
          </p>

          <div className="flex items-center gap-2 text-zinc-600 text-xs font-light">
            <CalendarIcon className="w-3 h-3" />
            <span>
              {new Date(n.date).toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "short", 
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
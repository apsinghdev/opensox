"use client";

import React from "react";
import Link from "next/link";
import {
  getNewslettersByDate,
  getMonthYearLabel,
  formatDate,
} from "@/data/newsletters";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function NewsletterPage() {
  const newslettersByDate = getNewslettersByDate();
  const sortedKeys = Object.keys(newslettersByDate).sort(
    (a, b) => b.localeCompare(a)
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ox-white mb-2">Newsletters</h1>
        <p className="text-ox-gray text-sm">
          Stay updated with the latest from Opensox
        </p>
      </div>

      {sortedKeys.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ox-gray">No newsletters available yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedKeys.map((key) => {
            const newsletters = newslettersByDate[key];
            const monthYear = getMonthYearLabel(key);

            return (
              <div key={key} className="space-y-4">
                <h2 className="text-xl font-semibold text-ox-purple border-b border-[#1a1a1d] pb-2">
                  {monthYear}
                </h2>
                <div className="space-y-3">
                  {newsletters.map((newsletter) => (
                    <Link
                      key={newsletter.id}
                      href={`/dashboard/newsletter/${newsletter.slug}`}
                      className="block p-4 rounded-lg bg-[#121214] border border-[#1a1a1d] hover:border-ox-purple transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-ox-white group-hover:text-ox-purple transition-colors mb-2">
                            {newsletter.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-ox-gray">
                            <CalendarIcon className="size-4" />
                            <span>{formatDate(newsletter.publishedAt)}</span>
                            {newsletter.author && (
                              <>
                                <span>•</span>
                                <span>by {newsletter.author}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-ox-purple opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


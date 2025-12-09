"use client";

import React from "react";
import { trpc } from "@/lib/trpc";
import { SponsorCard } from "@/components/sponsor/SponsorCard";
import Link from "next/link";

const SponsorSection = () => {
  const { data: sponsors, isLoading } =
    trpc.sponsor.getActiveSponsors.useQuery();

  if (isLoading) {
    return null; // Or a skeleton
  }

  const hasSponsors = sponsors && sponsors.length > 0;

  return (
    <section className="w-full py-16 lg:py-24 px-4 lg:px-[60px] border-b border-border flex flex-col items-center justify-center gap-10">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white">
            Our Sponsors
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Supported by these amazing companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasSponsors &&
            sponsors.slice(0, 3).map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}

          {Array.from({ length: Math.max(0, 3 - (sponsors?.length || 0)) }).map(
            (_, index) => (
              <Link key={`placeholder-${index}`} href="/sponsor" className="group block h-full">
                <div className="aspect-[16/10] w-full h-full rounded-2xl border border-dashed border-border bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-border.light transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6">
                  <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl text-neutral-500">+</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-neutral-400 font-medium group-hover:text-white transition-colors">
                      Become a Sponsor
                    </h3>
                    <p className="text-neutral-600 text-sm mt-1">
                      Your logo here
                    </p>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;

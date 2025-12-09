"use client";

import React from "react";
import { trpc } from "@/lib/trpc";
import { SponsorCard } from "@/components/sponsor/SponsorCard";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const DashboardSponsorList = () => {
  const { data: sponsors, isLoading } =
    trpc.sponsor.getActiveSponsors.useQuery();

  if (isLoading) {
    return (
      <div className="w-full h-40 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
      </div>
    );
  }

  const hasSponsors = sponsors && sponsors.length > 0;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-semibold text-white">Featured Sponsors</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasSponsors &&
          sponsors.slice(0, 3).map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}

        {Array.from({ length: Math.max(0, 3 - (sponsors?.length || 0)) }).map(
          (_, index) => (
            <Link key={`placeholder-${index}`} href="/sponsor" className="group block h-full">
              <div className="aspect-[16/10] w-full h-full rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl text-neutral-500">+</span>
                </div>
                <div className="text-center">
                  <h3 className="text-neutral-400 font-medium text-sm group-hover:text-white transition-colors">
                    Your Logo Here
                  </h3>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardSponsorList;

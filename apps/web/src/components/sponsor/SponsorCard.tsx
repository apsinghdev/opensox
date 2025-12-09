"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SponsorCardProps {
  sponsor: {
    id: string;
    company_name: string;
    description: string;
    website: string;
    image_url: string;
  };
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  return (
    <Link
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="aspect-[16/10] w-full rounded-2xl border border-[#252525] bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700 transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6 relative overflow-hidden">
        <div className="relative w-32 h-20">
          <Image
            src={sponsor.image_url}
            alt={sponsor.company_name}
            fill
            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="text-center">
          <h3 className="text-white font-medium text-lg group-hover:text-green-400 transition-colors">
            {sponsor.company_name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

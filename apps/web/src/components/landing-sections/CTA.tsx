"use client";

import { Terminal } from "lucide-react";
import React from "react";
import PrimaryButtom from "../ui/custom-button";
import Image from "next/image";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";

const CTA = () => {
  const { trackButtonClick, trackLinkClick } = useAnalytics();

  const handleLessgoClick = () => {
    trackButtonClick("lessgo", "cta_section");
  };

  const handleTestimonialsClick = () => {
    trackLinkClick("/testimonials", "See what our investors say", "cta_section", false);
  };

  return (
    <div className="w-[94%] h-[420px] mt-2 mx-auto relative bg-transparent lg:bg-gradient-to-r from-white via-[#101010] to-white z-10 flex flex-col gap-6 items-center justify-center lg:p-[60px] rounded-3xl overflow-hidden">
      <Image
        src="/assets/ctagradient.svg"
        alt="cal"
        width={100}
        height={100}
        className="absolute inset-0 w-full h-full -z-10 object-cover rounded-3xl"
      />
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl w-full font-medium text-balance text-center max-w-4xl tracking-tighter">
          Ready to dive into Open Source, Building in Public and Indie Hacking?
        </h2>
        <p className="text-center tracking-tight lg:text-2xl font-light max-w-3xl mx-auto">
          Join the limited community accelerating in open-source, building in
          public and indie hacking.
        </p>
      </div>
      <Link
        href="/pro"
        className="cursor-pointer z-30"
        onClick={handleLessgoClick}
      >
        <PrimaryButtom>
          <Terminal />
          lessgo
        </PrimaryButtom>
      </Link>
      <Link
        href="/testimonials"
        className="text-text-tertiary hover:text-brand-purple-light transition-colors text-sm lg:text-base underline z-30"
        onClick={handleTestimonialsClick}
      >
        See what our investors say →
      </Link>
    </div>
  );
};

export default CTA;

"use client";

import { use, useMemo } from "react";
import { newsletters } from "@/data/newsletters";
import NewsletterContent from "@/components/newsletters/NewsletterContent";
import Link from "next/link";
import { useSubscription } from "@/hooks/useSubscription";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import Image from "next/image";

export default function NewsletterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isPaidUser, isLoading } = useSubscription();
  const router = useRouter();

  // Redirect if not a paid user
  useEffect(() => {
    if (!isLoading && !isPaidUser) {
      router.push("/pricing");
    }
  }, [isPaidUser, isLoading, router]);

  const newsletter = newsletters.find((n) => n.id === id);

  const formattedDate = useMemo(() => {
    if (!newsletter) return "";
    return new Date(newsletter.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [newsletter?.date]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isPaidUser) {
    return null; // Will redirect
  }

  if (!newsletter) {
    return (
      <div className="w-full h-full bg-[#0a0a0b] text-white overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Newsletter not found</h1>
            <Link
              href="/dashboard/newsletters"
              className="text-[#9455f4] hover:text-white underline"
            >
              Back to newsletters
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#191919] text-[#ebebeb] relative overflow-hidden">
      {/* Notion-like subtle background */}
      <div className="fixed inset-0 bg-[#191919] -z-10" />
      
      {/* Header Banner - Zoomed in with reduced height */}
      <div className="relative w-full mt-0 mb-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%', height: '280px', position: 'relative' }}
        >
          <FaultyTerminal
            scale={2.2}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#6032D9"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </motion.div>
      </div>
      
      {/* Content Section - Notion-like Layout */}
      <div className="relative w-full">
        
        {/* Title Section - Notion Style */}
        <div className="w-full px-6 md:px-12 lg:px-16 relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            {/* Back Link - Notion style */}
            <div className="max-w-4xl mx-auto mb-8 pt-8">
              <Link
                href="/dashboard/newsletters"
                className="inline-flex items-center gap-2 text-[#9b9a97] hover:text-[#ebebeb] transition-colors text-sm group"
              >
                <ArrowLeftIcon className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to newsletters</span>
              </Link>
            </div>

            {/* Title Container - Notion-like minimal with mild pixel accent */}
            <div className="max-w-4xl mx-auto">
              {/* Header Image - Premium Display */}
              {newsletter.headerImage && (
                <div className="relative w-full mb-8 rounded-lg overflow-hidden border border-[#2e2e2e] bg-[#1f1f1f] shadow-lg">
                  <div className="relative w-full aspect-video bg-[#2a2a2a] overflow-hidden">
                    <Image
                      src={newsletter.headerImage}
                      alt={newsletter.title}
                      width={1600}
                      height={900}
                      className="w-full h-full object-cover"
                      priority
                      quality={90}
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Mild pixel accent corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[#6032D9]/20 z-10" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#6032D9]/20 z-10" />
                </div>
              )}
              
              <div className="relative pb-8 border-b border-[#2e2e2e]">
                {/* Mild pixel accent line */}
                <div className="absolute top-0 left-0 w-1 h-full "></div>
                
                {/* Date badge - Notion style with mild pixel accent */}
                <div className="inline-flex items-center gap-1.5 mb-6 px-2.5 py-1.5 bg-[#2a2a2a] rounded-[3px] border border-[#2e2e2e]">
                  <div className="w-1 h-1 bg-[#6032D9] rounded-full" />
                  <span className="text-xs text-[#9b9a97] font-normal">
                    {formattedDate}
                  </span>
                </div>

                {/* Title - Notion style */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#ebebeb] leading-tight tracking-tight mb-2">
                  {newsletter.title}
                </h1>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Section - Notion-like article */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 relative">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="pb-20"
          >
            <NewsletterContent content={newsletter.content} />
          </motion.article>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </main>
  );
}


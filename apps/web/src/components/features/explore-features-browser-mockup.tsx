"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeroIcon } from "./explore-features-data";

type BrowserMockupProps = {
  imageSrc: string;
  featureTitle: string;
  FeatureIcon: HeroIcon;
  className?: string;
};

export default function ExploreFeaturesBrowserMockup({
  imageSrc,
  featureTitle,
  FeatureIcon,
  className,
}: BrowserMockupProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  const showFallback = imageError || !imageSrc;

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border bg-surface-tertiary",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-secondary px-4 py-2">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto w-full max-w-xs rounded-md border border-border bg-surface-primary px-3 py-1.5 text-center text-xs text-text-muted">
          app.opensox.ai
        </div>
        <div className="w-[52px] shrink-0 flex justify-end">
          <FeatureIcon className="size-4 text-text-muted" />
        </div>
      </div>

      {/* Browser body */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-primary">
        {!showFallback ? (
          <Image
            src={imageSrc}
            alt={featureTitle}
            fill
            className="object-cover object-top"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(85,25,247,0.15)_0%,transparent_70%)]" />
            <div className="absolute left-4 top-4 h-8 w-24 rounded-md bg-brand-purple/20" />
            <div className="absolute right-4 top-4 flex gap-2">
              <div className="h-6 w-16 rounded-md bg-surface-elevated" />
              <div className="h-6 w-16 rounded-md bg-surface-elevated" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
              <div className="h-20 flex-1 rounded-lg border border-border bg-surface-elevated/50" />
              <div className="h-20 flex-1 rounded-lg border border-border bg-surface-elevated/50" />
              <div className="h-20 flex-1 rounded-lg border border-border bg-surface-elevated/50" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3 rounded-xl border border-brand-purple/30 bg-brand-purple/10 px-8 py-6 backdrop-blur-sm">
              <FeatureIcon className="size-10 text-brand-purple" />
              <p className="max-w-[200px] text-center text-sm font-medium text-text-primary">
                {featureTitle}
              </p>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-primary/40 via-transparent to-transparent" />
      </div>
    </div>
  );
}

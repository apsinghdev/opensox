"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeroIcon } from "./explore-features-data";

type FeatureImagePreviewProps = {
  imageSrc: string;
  featureTitle: string;
  FeatureIcon: HeroIcon;
  className?: string;
};

export default function ExploreFeaturesImagePreview({
  imageSrc,
  featureTitle,
  FeatureIcon,
  className,
}: FeatureImagePreviewProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  const showFallback = imageError || !imageSrc;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface-tertiary",
        className,
      )}
    >
      {!showFallback ? (
        <Image
          src={imageSrc}
          alt={featureTitle}
          fill
          className="object-contain object-center"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-primary p-6">
          <FeatureIcon className="size-10 text-brand-purple" />
          <p className="max-w-[200px] text-center text-sm font-medium text-text-primary">
            {featureTitle}
          </p>
        </div>
      )}
    </div>
  );
}

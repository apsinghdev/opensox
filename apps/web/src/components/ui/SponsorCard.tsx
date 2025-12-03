import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card } from "./card";

type SponsorCardProps = {
  name: string;
  description: string;
  href: string;
  logoSrc: string;
  logoAlt?: string;
  className?: string;
  openInNewTab?: boolean;
};

function SponsorCard({
  name,
  description,
  href,
  logoSrc,
  logoAlt,
  className,
  openInNewTab = true,
}: SponsorCardProps) {

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      aria-label={`Visit ${name}`}
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden border-[#252525] bg-[#111111] text-sm text-muted-foreground/90 [box-shadow:0_0_60px_-24px_#14111C_inset]",
          "transition-colors hover:border-[#3a3a3a]",
          className
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050505]">
          <Image
            src={logoSrc}
            alt={logoAlt ?? `${name} logo`}
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>

        <div className="border-t border-[#252525] bg-[#050505] px-6 py-4">
          <p className="text-base font-medium text-foreground">{name}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </Card>
    </a>
  );
}

export default SponsorCard;
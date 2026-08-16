"use client";

import * as React from "react";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import { cn } from "@/lib/utils";
import { getSocialHandle } from "@/lib/social-handle";
import { Marquee } from "./marquee";

export type LandingTextTestimonial = {
  id: string;
  content: string;
  name: string;
  avatar: string;
  socialLink?: string | null;
};

function getSocialIcon(url: string) {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return <Twitter className="h-4 w-4" />;
    }
    if (hostname.includes("linkedin.com")) {
      return <Linkedin className="h-4 w-4" />;
    }
    if (hostname.includes("instagram.com")) {
      return <Instagram className="h-4 w-4" />;
    }
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return <Youtube className="h-4 w-4" />;
    }
    return null;
  } catch {
    return null;
  }
}

function LandingTestimonialCard({
  item,
}: {
  item: LandingTextTestimonial;
}) {
  const socialIcon = item.socialLink ? getSocialIcon(item.socialLink) : null;
  const handle = getSocialHandle(item.socialLink);

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-surface-tertiary p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-medium text-text-primary truncate">
            {item.name}
          </span>
          {handle && (
            <span className="text-xs text-text-muted truncate">{handle}</span>
          )}
        </div>
        {socialIcon && item.socialLink && (
          <a
            href={item.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors shrink-0"
            aria-label={`${item.name} social profile`}
          >
            {socialIcon}
          </a>
        )}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed">{item.content}</p>
    </div>
  );
}

type TestimonialGridProps = {
  testimonials: LandingTextTestimonial[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
  columns?: number;
};

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials = [],
  className,
  speed = "slow",
  columns = 3,
}) => {
  const items = testimonials ?? [];

  const getDuration = () => {
    const map = { slow: 120, normal: 30, fast: 15 };
    return `${map[speed]}s`;
  };

  const cols = Array.from({ length: columns }, (_, colIdx) =>
    items.filter((_, idx) => idx % columns === colIdx)
  ).filter((col) => col.length > 0);

  const mdCols = Math.min(2, columns);
  const colsMd = Array.from({ length: mdCols }, (_, colIdx) =>
    items.filter((_, idx) => idx % mdCols === colIdx)
  ).filter((col) => col.length > 0);

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "flex w-full h-full items-center justify-center px-4",
          className
        )}
      >
        <p className="text-text-muted text-sm">No testimonials yet.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full h-full relative overflow-hidden px-4 max-w-[1240px] mx-auto",
        className
      )}
    >
      <div className="absolute -top-16 w-full h-1/3 z-20 bg-gradient-to-b from-surface-primary via-surface-primary/90 to-transparent" />
      <div className="absolute -bottom-8 w-full h-1/3 z-20 bg-gradient-to-t from-surface-primary via-surface-primary/90 to-transparent" />
      <div className="w-full hidden lg:flex">
        {cols.map((colItems, colIdx) => (
          <Marquee
            key={colIdx}
            vertical
            reverse={colIdx % 2 === 1}
            repeat={2}
            style={
              {
                "--duration": getDuration(),
              } as React.CSSProperties
            }
          >
            {colItems.map((item, i) => (
              <div
                key={`col${colIdx}-${item.id}-${i}`}
                className="flex-none px-1.5"
              >
                <LandingTestimonialCard item={item} />
              </div>
            ))}
          </Marquee>
        ))}
      </div>

      <div className="w-full hidden md:flex lg:hidden">
        {colsMd.map((colItems, colIdx) => (
          <Marquee
            key={colIdx}
            vertical
            reverse={colIdx % 2 === 1}
            repeat={2}
            style={
              {
                "--duration": getDuration(),
              } as React.CSSProperties
            }
          >
            {colItems.map((item, i) => (
              <div
                key={`col${colIdx}-${item.id}-${i}`}
                className="flex-none px-1.5"
              >
                <LandingTestimonialCard item={item} />
              </div>
            ))}
          </Marquee>
        ))}
      </div>

      <div className="w-full flex flex-col md:hidden items-center justify-center">
        <Marquee
          vertical
          repeat={2}
          style={
            {
              "--duration": getDuration(),
            } as React.CSSProperties
          }
        >
          {items.map((item, i) => (
            <div key={`col-${item.id}-${i}`} className="flex-none px-1.5">
              <LandingTestimonialCard item={item} />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TestimonialGrid;

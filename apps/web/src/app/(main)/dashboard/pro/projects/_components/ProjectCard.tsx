"use client";

import { ExternalLink } from "lucide-react";

import type { ProProject } from "./project-types";

type ProjectCardProps = {
  item: ProProject;
  position: number;
};

function formatAddedDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function countQualityPoints(qualities: string): number {
  return qualities.split("\n").filter((line) => line.trim().length > 0).length;
}

const QUALITIES_SCROLL_CLASS =
  "max-h-[7.125rem] overflow-y-auto overscroll-contain pr-1.5 [scrollbar-width:thin] [scrollbar-color:theme(colors.brand.purple/40)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-purple/35 [&::-webkit-scrollbar-thumb]:hover:bg-brand-purple/55";

export function ProjectCard({ item, position }: ProjectCardProps): JSX.Element {
  const shouldScroll = countQualityPoints(item.qualities) > 5;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-dash-surface border border-dash-border rounded-xl p-5 hover:border-brand-purple/40 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-brand-purple-light bg-brand-purple/10 rounded-full px-2 py-0.5">
              #{position}
            </span>
            <span className="text-text-muted text-xs leading-none">
              Added on {formatAddedDate(item.createdAt)}
            </span>
          </div>
          <h3 className="text-text-primary font-semibold text-base mt-2 truncate">
            {item.name}
          </h3>
        </div>
        <ExternalLink
          aria-hidden="true"
          className="w-4 h-4 shrink-0 mt-0.5 text-text-muted group-hover:text-brand-purple-light transition-colors"
        />
      </div>

      <div
        className={shouldScroll ? QUALITIES_SCROLL_CLASS : undefined}
        onWheel={shouldScroll ? (e) => e.stopPropagation() : undefined}
      >
        <p className="text-text-secondary text-sm whitespace-pre-line leading-relaxed">
          {item.qualities}
        </p>
      </div>
    </a>
  );
}

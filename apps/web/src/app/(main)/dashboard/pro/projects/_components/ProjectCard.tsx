"use client";

import { ExternalLink } from "lucide-react";

import type { ProProject } from "./project-types";

type ProjectCardProps = {
  item: ProProject;
  position: number;
};

export function ProjectCard({ item, position }: ProjectCardProps): JSX.Element {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-dash-surface border border-dash-border rounded-xl p-5 hover:border-brand-purple/40 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <span className="text-xs text-brand-purple-light bg-brand-purple/10 rounded-full px-2 py-0.5">
            #{position}
          </span>
          <h3 className="text-text-primary font-semibold text-base mt-2 truncate">
            {item.name}
          </h3>
        </div>
        <ExternalLink
          aria-hidden="true"
          className="w-4 h-4 shrink-0 mt-0.5 text-text-muted group-hover:text-brand-purple-light transition-colors"
        />
      </div>

      <p className="text-text-secondary text-sm whitespace-pre-line leading-relaxed">
        {item.qualities}
      </p>
    </a>
  );
}

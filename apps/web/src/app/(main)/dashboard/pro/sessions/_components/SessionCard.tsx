"use client";

import { Play } from "lucide-react";

import type { WeeklySession } from "./session-types";

type SessionCardProps = {
  session: WeeklySession;
  onPlayAction: (session: WeeklySession) => void;
};

export function SessionCard({
  session,
  onPlayAction,
}: SessionCardProps): JSX.Element | null {
  return (
    <div className="bg-dash-surface border border-dash-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-text-primary font-semibold text-lg truncate">
            {session.title}
          </h3>
          {session.description ? (
            <p className="text-text-secondary text-sm mt-1 line-clamp-2">
              {session.description}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          aria-label={`Play session: ${session.title}`}
          className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-purple/10 hover:bg-brand-purple transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none"
          onClick={() => onPlayAction(session)}
        >
          <Play className="w-4 h-4 text-brand-purple-light hover:text-text-primary" />
        </button>
      </div>
    </div>
  );
}



"use client";

import { useEffect, useMemo, useRef } from "react";

import { CheckCircle2, X } from "lucide-react";

import { getYoutubeEmbedUrl } from "./youtube";
import type { WeeklySession } from "./session-types";

type SessionVideoDialogProps = {
  isOpen: boolean;
  session: WeeklySession | null;
  onCloseAction: () => void;
};

export function SessionVideoDialog({
  isOpen,
  session,
  onCloseAction,
}: SessionVideoDialogProps): JSX.Element | null {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const embedUrl = useMemo(() => {
    if (!session?.youtubeUrl) return null;
    return getYoutubeEmbedUrl(session.youtubeUrl);
  }, [session?.youtubeUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !session) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`Session video: ${session.title}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") onCloseAction();
      }}
    >
      <button
        type="button"
        aria-label="Close session video"
        className="absolute inset-0 bg-black/60"
        onClick={onCloseAction}
      />

      <div className="relative h-full w-full p-4 sm:p-6 flex items-center justify-center">
        <div className="relative w-full max-w-5xl bg-dash-surface border border-dash-border rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-dash-border">
            <div className="min-w-0">
              <p className="text-text-primary font-semibold truncate">
                {session.title}
              </p>
              {session.description ? (
                <p className="text-text-muted text-sm truncate">
                  {session.description}
                </p>
              ) : null}
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-lg bg-dash-raised hover:bg-dash-hover transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none"
              onClick={onCloseAction}
            >
              <X className="h-4 w-4 text-text-secondary" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 p-4 sm:p-5">
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-dash-border bg-dash-base">
                {embedUrl ? (
                  <iframe
                    key={embedUrl}
                    src={embedUrl}
                    title={session.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center p-6">
                    <p className="text-text-secondary text-sm text-center">
                      This session video link is invalid.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-dash-border">
              <div className="p-4 sm:p-5">
                <p className="text-text-muted text-xs uppercase tracking-wider font-medium">
                  Topics covered
                </p>

                {session.topics?.length ? (
                  <ul className="mt-3 space-y-2 max-h-[40vh] md:max-h-[60vh] overflow-auto pr-1">
                    {session.topics.map((topic) => (
                      <li
                        key={topic.id}
                        className="flex items-start gap-2.5 text-text-secondary text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-purple/70 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-text-secondary break-words">
                            {topic.topic}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-text-secondary text-sm">
                    No topics listed for this session yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



"use client";

import { useEffect, useState } from "react";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useSubscription } from "@/hooks/useSubscription";
import { trpc } from "@/lib/trpc";

import { SessionCard } from "./_components/SessionCard";
import { SessionVideoDialog } from "./_components/SessionVideoDialog";
import type { WeeklySession } from "./_components/session-types";

const ProSessionsPage = (): JSX.Element | null => {
  const { isPaidUser, isLoading: subscriptionLoading } = useSubscription();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeSession, setActiveSession] = useState<WeeklySession | null>(
    null
  );

  // fetch sessions from api
  const {
    data: sessions,
    isLoading: sessionsLoading,
    isError: sessionsError,
    error: sessionsErrorData,
  } = trpc.sessions.getAll.useQuery(undefined, {
    enabled: !!session?.user && status === "authenticated" && isPaidUser,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // consider data fresh for 5 minutes
  });

  useEffect(() => {
    if (!subscriptionLoading && !isPaidUser) {
      router.push("/pricing");
    }
  }, [isPaidUser, subscriptionLoading, router]);

  const isLoading = subscriptionLoading || sessionsLoading;
  const hasError = sessionsError;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-ox-content">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary text-sm">Loading sessions...</p>
        </div>
      </div>
    );
  }

  if (!isPaidUser) {
    return null;
  }

  if (hasError) {
    return (
      <div className="w-full min-h-full bg-ox-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8 md:mb-12">
            <Link
              href="/dashboard/pro/dashboard"
              className="inline-flex items-center gap-2 text-text-muted hover:text-brand-purple-light 
                         transition-colors duration-200 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm">Back to Pro Dashboard</span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <p className="text-text-secondary text-lg">
              Failed to load sessions. Please try again later.
            </p>
            {sessionsErrorData && (
              <p className="text-text-muted text-sm">
                {sessionsErrorData.message || "Unknown error"}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-ox-content">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          {/* Back link */}
          <Link
            href="/dashboard/pro/dashboard"
            className="inline-flex items-center gap-2 text-text-muted hover:text-brand-purple-light 
                       transition-colors duration-200 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm">Back to Pro Dashboard</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              Opensox Pro Sessions
            </h1>
          </div>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl">
            Recordings of Opensox Pro session meetings covering advanced open
            source strategies, real-world examples, and insider tips to
            accelerate your journey.
          </p>
        </div>

        {/* Sessions Grid */}
        {sessions && sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sessions.map((sessionItem: WeeklySession) => (
              <SessionCard
                key={sessionItem.id}
                session={sessionItem}
                onPlayAction={(s) => setActiveSession(s)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <p className="text-text-secondary text-lg">
              No sessions available yet.
            </p>
            <p className="text-text-muted text-sm">
              Check back soon for new session recordings.
            </p>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-text-muted text-sm">
            More sessions coming soon • Stay tuned for updates
          </p>
        </div>
      </div>

      <SessionVideoDialog
        isOpen={!!activeSession}
        session={activeSession}
        onCloseAction={() => setActiveSession(null)}
      />
    </div>
  );
};

export default ProSessionsPage;

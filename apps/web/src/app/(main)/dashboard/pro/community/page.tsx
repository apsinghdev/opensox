"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useSearchParams } from "next/navigation";

function ProCommunityPageContent() {
  const { isPaidUser, isLoading } = useSubscription();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [isCheckingDiscordStatus, setIsCheckingDiscordStatus] = useState(false);
  const [isJoiningCommunity, setIsJoiningCommunity] = useState(false);
  const [hasJoinedCommunity, setHasJoinedCommunity] = useState(false);
  const [discordError, setDiscordError] = useState<string | null>(null);
  const [discordMessage, setDiscordMessage] = useState<string | null>(
    searchParams.get("discord") === "joined"
      ? "Joined pro community successfully."
      : null
  );

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const getAccessToken = (): string | null => {
    const accessToken = (session as Session)?.accessToken;
    if (!accessToken) {
      setDiscordError("Authentication token not found");
      return null;
    }
    return accessToken;
  };

  const handleJoinCommunity = async (): Promise<void> => {
    if (isJoiningCommunity) return;
    setIsJoiningCommunity(true);
    setDiscordError(null);
    setDiscordMessage(null);

    const accessToken = getAccessToken();
    if (!accessToken) {
      setIsJoiningCommunity(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/discord/connect-url`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setDiscordError(data.error || "Failed to start Discord connection");
        return;
      }

      if (!data.authUrl) {
        setDiscordError("Discord authorization URL not available");
        return;
      }

      window.location.href = data.authUrl;
    } catch (error) {
      console.error("Discord connect failed:", error);
      setDiscordError("Failed to connect Discord");
    } finally {
      setIsJoiningCommunity(false);
    }
  };

  useEffect(() => {
    const loadDiscordStatus = async () => {
      if (!isPaidUser || !session?.user) {
        setHasJoinedCommunity(false);
        return;
      }

      const accessToken = (session as Session)?.accessToken;
      if (!accessToken) {
        return;
      }

      setIsCheckingDiscordStatus(true);
      try {
        const response = await fetch(`${apiUrl}/discord/community-status`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setHasJoinedCommunity(Boolean(data.joined));
      } catch (error) {
        console.error("Failed to load Discord community status:", error);
      } finally {
        setIsCheckingDiscordStatus(false);
      }
    };

    void loadDiscordStatus();
  }, [apiUrl, isPaidUser, session]);

  return (
    <div className="w-full h-full flex flex-col p-6 bg-ox-content">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-text-muted">Loading...</span>
        </div>
      ) : (
        <div className="max-w-2xl">
          <div className="mb-6">
            <Link
              href="/dashboard/home"
              className="inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
              Pro Community
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              Join the private Discord community and connect with other pro members.
            </p>
          </div>

          <div className="bg-ox-sidebar border border-dash-border rounded-lg p-6">
            {!isPaidUser ? (
              <div className="space-y-4">
                <p className="text-sm text-text-muted">
                  This page is available for Opensox Pro members.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-3 py-1.5 bg-brand-purple hover:bg-brand-purple-light text-text-primary rounded-md transition-colors text-xs font-medium"
                >
                  Upgrade to Pro
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted">Discord Community</p>
                  <p className="mt-2 text-sm text-text-primary">
                    Join the folks nailing OSS, Build in Public and Indie Hacking.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => void handleJoinCommunity()}
                    disabled={
                      isJoiningCommunity || isCheckingDiscordStatus || hasJoinedCommunity
                    }
                    className="inline-flex items-center justify-center px-3 py-1.5 bg-brand-purple hover:bg-brand-purple-light text-text-primary rounded-md transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingDiscordStatus
                      ? "Checking..."
                      : hasJoinedCommunity
                        ? "Joined"
                        : isJoiningCommunity
                          ? "Redirecting..."
                          : "Join community"}
                  </button>
                </div>

                {discordError && (
                  <p className="text-error-text text-xs">{discordError}</p>
                )}
                {discordMessage && (
                  <p className="text-success-text text-xs">{discordMessage}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProCommunityPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex flex-col p-6 bg-ox-content">
          <div className="flex items-center justify-center h-full">
            <span className="text-text-muted">Loading...</span>
          </div>
        </div>
      }
    >
      <ProCommunityPageContent />
    </Suspense>
  );
}

"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Play } from "lucide-react";

export default function ProDashboardPage() {
  const { isPaidUser, isLoading } = useSubscription();
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (!isLoading && !isPaidUser) {
      router.push("/pricing");
    }
  }, [isPaidUser, isLoading, router]);

  const handleJoinSlack: () => Promise<void> = async () => {
    if (isJoining) return;

    setIsJoining(true);
    setError(null);

    try {
      if (!session?.user) {
        setError("Please sign in to join the community");
        return;
      }

      const accessToken = session?.accessToken;

      if (!accessToken || typeof accessToken !== "string") {
        setError("Authentication token not found");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiUrl}/join-community`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        let errorMessage = "Failed to join community";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // if json parsing fails, use default message
        }
        setError(errorMessage);
        return;
      }

      let responseData: { slackInviteUrl?: string };
      try {
        responseData = await response.json();
      } catch {
        setError("Invalid response from server");
        return;
      }

      const { slackInviteUrl } = responseData;

      if (!slackInviteUrl || typeof slackInviteUrl !== "string") {
        setError("Invalid Slack invite URL received");
        return;
      }

      // validate url format
      try {
        new URL(slackInviteUrl);
      } catch {
        setError("Invalid Slack invite URL format");
        return;
      }

      window.location.href = slackInviteUrl;
    } catch (err) {
      console.error("Failed to join community:", err);
      setError("Failed to connect to server");
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-ox-content">
        <p className="text-text-primary">Loading...</p>
      </div>
    );
  }

  if (!isPaidUser) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-ox-content p-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
          hi investors, ajeetunc is on the way to deliver the shareholder value.
          soon you&apos;ll see all the pro perks here. thanks for investin!
        </h1>
        {isPaidUser && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/pro/sessions"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple hover:bg-brand-purple-light text-text-primary font-medium rounded-lg transition-colors duration-200 text-sm"
            >
              <Play className="w-4 h-4" />
              Pro Sessions
            </Link>
            <button
              onClick={handleJoinSlack}
              disabled={isJoining}
              className="px-4 py-2 bg-dash-surface border border-dash-border hover:border-brand-purple/50 text-text-primary font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isJoining ? "Joining..." : "Join Slack"}
            </button>
          </div>
        )}
        {error && (
          <p className="text-error-text text-sm mt-2 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

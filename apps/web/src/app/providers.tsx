"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import PostHogPageView from "./PostHogPageView";

// Session storage key to track if sign-in was initiated
const SIGN_IN_INITIATED_KEY = "posthog_sign_in_initiated";
const SIGN_IN_PROVIDER_KEY = "posthog_sign_in_provider";

/**
 * PostHog Auth Tracker
 *
 * This component must be rendered INSIDE SessionProvider.
 * It tracks sign_in_completed events when user authenticates.
 */
export function PostHogAuthTracker() {
  const { data: session, status } = useSession();
  const hasTrackedSignIn = useRef(false);
  const previousStatus = useRef<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    try {
      // Check if PostHog is initialized using documented pattern
      if (!posthog || typeof posthog.capture !== "function") return;

      // Detect transition from unauthenticated to authenticated
      const wasSignInInitiated =
        sessionStorage.getItem(SIGN_IN_INITIATED_KEY) === "true";
      const storedProvider = sessionStorage.getItem(SIGN_IN_PROVIDER_KEY) as
        | "google"
        | "github"
        | null;

      if (status === "authenticated" && session?.user) {
        // Check if this is a fresh sign-in (not just a page refresh)
        const isNewSignIn =
          wasSignInInitiated ||
          (previousStatus.current === "unauthenticated" &&
            !hasTrackedSignIn.current);

        if (isNewSignIn && !hasTrackedSignIn.current) {
          hasTrackedSignIn.current = true;

          // Validate provider to avoid skewing analytics
          const validProviders = ["google", "github"];
          const provider =
            storedProvider && validProviders.includes(storedProvider)
              ? storedProvider
              : "unknown";

          // Determine if this is a new user based on account creation time
          // Consider a user "new" if their account was created within the last 5 minutes
          let isNewUser = false;
          if (session.user?.createdAt) {
            try {
              const createdAtTime = new Date(session.user.createdAt).getTime();
              const now = Date.now();
              const fiveMinutesInMs = 5 * 60 * 1000;
              isNewUser = now - createdAtTime < fiveMinutesInMs;
            } catch (error) {
              console.error("[Analytics] Error parsing createdAt:", error);
            }
          }

          // Track sign-in completed EVENT only (no person properties)
          posthog.capture("sign_in_completed", {
            provider: provider,
            is_new_user: isNewUser,
          });

          // Track sign-up completed for new users
          if (isNewUser) {
            posthog.capture("sign_up_completed", {
              provider: provider,
            });
          }

          if (process.env.NODE_ENV === "development") {
            console.log("[Analytics] Event tracked: sign_in_completed", {
              provider,
              is_new_user: isNewUser,
            });
            if (isNewUser) {
              console.log("[Analytics] Event tracked: sign_up_completed", {
                provider,
              });
            }
          }

          // Clear the sign-in tracking flags
          sessionStorage.removeItem(SIGN_IN_INITIATED_KEY);
          sessionStorage.removeItem(SIGN_IN_PROVIDER_KEY);
        }
      } else if (status === "unauthenticated") {
        // Reset tracking flag for next sign-in
        hasTrackedSignIn.current = false;

        if (process.env.NODE_ENV === "development") {
          console.log("[PostHog] User unauthenticated");
        }
      }

      // Track previous status
      previousStatus.current = status;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error handling auth state:", error);
      }
    }
  }, [session, status]);

  return null;
}

/**
 * PostHog Provider
 * NOTE: This provider does NOT handle auth tracking.
 * Use PostHogAuthTracker inside SessionProvider for that.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Initialize PostHog
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (posthogKey && posthogHost) {
      posthog.init(posthogKey, {
        api_host: posthogHost,

        // Pageview tracking
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true, // Track when users leave pages

        // Privacy settings
        disable_session_recording: true, // Privacy: No session recordings
        respect_dnt: true, // Respect Do Not Track header
        ip: false, // Do not store IP addresses (anonymize)

        // Persistence settings
        persistence: "localStorage+cookie", // Persist anonymous ID across sessions

        // Performance settings
        autocapture: false, // We use custom events for better control

        // Development settings
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log("[PostHog] Initialized successfully");
            // Enable debug mode in development
            posthog.debug(false); // Set to true to see all PostHog logs
          }
        },
      });
    } else {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[PostHog] Key or host is not defined - analytics disabled"
        );
      }
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

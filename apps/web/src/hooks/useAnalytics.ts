/**
 * React Hook for PostHog Analytics
 */

"use client";

import { useCallback, useMemo } from "react";
import { usePostHog } from "posthog-js/react";
import {
    type AnalyticsEventName,
    type AnalyticsEventPropertiesMap,
    type ButtonClickedProperties,
    sanitizeAmount,
    truncateId,
} from "@/lib/analytics";

/**
 * Hook return type
 */
interface UseAnalyticsReturn {
    /** Whether PostHog is initialized and ready */
    isReady: boolean;

    /** Track a type-safe event */
    track: <E extends AnalyticsEventName>(
        eventName: E,
        properties: AnalyticsEventPropertiesMap[E]
    ) => void;

    /** Get current anonymous distinct ID */
    getDistinctId: () => string | undefined;

    // Event-specific helper functions
    trackInvestButtonClick: (
        buttonLocation: string,
        isAuthenticated: boolean,
        planId?: string
    ) => void;
    trackButtonClick: (
        buttonName: string,
        buttonLocation: ButtonClickedProperties["button_location"]
    ) => void;
    trackPaymentInitiated: (planId: string, amount: number) => void;
    trackPaymentCompleted: (planId: string, razorpayOrderId: string) => void;
    trackPaymentFailed: (
        planId: string,
        errorType: string,
        errorMessage?: string
    ) => void;
    trackSubscriptionStarted: (planId: string) => void;
    trackSignInStarted: (
        provider: "google" | "github",
        callbackUrl?: string
    ) => void;
    trackSignInCompleted: (
        provider: "google" | "github",
        isNewUser: boolean
    ) => void;
    trackSignUpCompleted: (provider: "google" | "github") => void;
    trackLinkClick: (
        linkUrl: string,
        linkText: string,
        linkLocation: string,
        isExternal?: boolean
    ) => void;
}


export function useAnalytics(): UseAnalyticsReturn {
    const posthog = usePostHog();

    const isReady = useMemo(() => {
        try {
            // Use optional chaining to safely check if PostHog is initialized
            // This is the documented pattern instead of using __loaded
            return !!posthog && typeof posthog.capture === 'function';
        } catch {
            return false;
        }
    }, [posthog]);

    // Core track function
    const track = useCallback(
        <E extends AnalyticsEventName>(
            eventName: E,
            properties: AnalyticsEventPropertiesMap[E]
        ): void => {
            try {
                if (!posthog || !isReady) {
                    if (process.env.NODE_ENV === "development") {
                        console.log(
                            `[Analytics] PostHog not ready, event skipped: ${eventName}`,
                            properties
                        );
                    }
                    return;
                }

                posthog.capture(eventName, properties);

                if (process.env.NODE_ENV === "development") {
                    console.log(`[Analytics] Event tracked: ${eventName}`, properties);
                }
            } catch (error) {
                if (process.env.NODE_ENV === "development") {
                    console.error(
                        `[Analytics] Failed to track event: ${eventName}`,
                        error
                    );
                }
            }
        },
        [posthog, isReady]
    );



    // Get distinct ID
    const getDistinctId = useCallback((): string | undefined => {
        try {
            if (!posthog || !isReady) return undefined;
            return posthog.get_distinct_id();
        } catch {
            return undefined;
        }
    }, [posthog, isReady]);

    // Event-specific helpers
    const trackInvestButtonClick = useCallback(
        (
            buttonLocation: string,
            isAuthenticated: boolean,
            planId?: string
        ): void => {
            track("invest_button_clicked", {
                button_location: buttonLocation,
                is_authenticated: isAuthenticated,
                plan_id: planId,
            });
        },
        [track]
    );

    const trackButtonClick = useCallback(
        (
            buttonName: string,
            buttonLocation: ButtonClickedProperties["button_location"]
        ): void => {
            track("button_clicked", {
                button_name: buttonName,
                button_location: buttonLocation,
            });
        },
        [track]
    );

    const trackPaymentInitiated = useCallback(
        (planId: string, amount: number): void => {
            track("payment_initiated", {
                plan_id: planId,
                amount: sanitizeAmount(amount),
            });
        },
        [track]
    );

    const trackPaymentCompleted = useCallback(
        (planId: string, razorpayOrderId: string): void => {
            track("payment_completed", {
                plan_id: planId,
                razorpay_order_id: truncateId(razorpayOrderId),
            });
        },
        [track]
    );

    const trackPaymentFailed = useCallback(
        (planId: string, errorType: string, errorMessage?: string): void => {
            track("payment_failed", {
                plan_id: planId,
                error_type: errorType,
                error_message: errorMessage?.substring(0, 100),
            });
        },
        [track]
    );

    const trackSubscriptionStarted = useCallback(
        (planId: string): void => {
            track("subscription_started", {
                plan_id: planId,
            });
        },
        [track]
    );

    const trackSignInStarted = useCallback(
        (provider: "google" | "github", callbackUrl?: string): void => {
            track("sign_in_started", {
                provider,
                callback_url: callbackUrl,
            });
        },
        [track]
    );

    const trackSignInCompleted = useCallback(
        (provider: "google" | "github", isNewUser: boolean): void => {
            track("sign_in_completed", {
                provider,
                is_new_user: isNewUser,
            });
        },
        [track]
    );

    const trackSignUpCompleted = useCallback(
        (provider: "google" | "github"): void => {
            track("sign_up_completed", {
                provider,
            });
        },
        [track]
    );

    const trackLinkClick = useCallback(
        (
            linkUrl: string,
            linkText: string,
            linkLocation: string,
            isExternal: boolean = false
        ): void => {
            track("link_clicked", {
                link_url: linkUrl,
                link_text: linkText,
                link_location: linkLocation,
                is_external: isExternal,
            });
        },
        [track]
    );

    return {
        isReady,
        track,
        getDistinctId,
        // Event-specific helpers
        trackInvestButtonClick,
        trackButtonClick,
        trackPaymentInitiated,
        trackPaymentCompleted,
        trackPaymentFailed,
        trackSubscriptionStarted,
        trackSignInStarted,
        trackSignInCompleted,
        trackSignUpCompleted,
        trackLinkClick,
    };
}

export default useAnalytics;

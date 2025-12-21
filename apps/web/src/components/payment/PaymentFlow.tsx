"use client";

import React, { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useRazorpay } from "@/hooks/useRazorpay";
import type { RazorpayOptions } from "@/lib/razorpay";
import PrimaryButton from "@/components/ui/custom-button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAnalytics } from "@/hooks/useAnalytics";

interface PaymentFlowProps {
  planId: string; // Required: Plan ID from database
  planName?: string;
  description?: string;
  buttonText?: string;
  buttonClassName?: string;
  callbackUrl?: string;
  buttonLocation?: string; // Location for analytics tracking (e.g., "pricing_page", "pitch_page")
}

/**
 * Complete Payment Flow Component
 *
 * This component:
 * 1. Creates a Razorpay order via tRPC (backend fetches price from plan)
 * 2. Opens Razorpay checkout
 * 3. Verifies payment signature on success
 * 4. Creates subscription and stores payment record
 *
 * Usage:
 * ```tsx
 * <PaymentFlow
 *   planId="plan_xyz123" // Required: Plan ID from database
 *   planName="Opensox Pro"
 *   description="Annual Subscription"
 *   buttonText="Subscribe Now"
 * />
 * ```
 */
const PaymentFlow: React.FC<PaymentFlowProps> = ({
  planId,
  planName = "Opensox Pro",
  description = "Payment",
  buttonText = "Invest",
  buttonClassName,
  callbackUrl,
  buttonLocation = "payment_flow", // Default location if not specified
}) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const orderDataRef = useRef<{
    orderId: string;
    amount: number; // Stored for display purposes only
  } | null>(null);

  const utils = trpc.useUtils();
  const createOrderMutation = (trpc.payment as any).createOrder.useMutation();
  const verifyPaymentMutation = (
    trpc.payment as any
  ).verifyPayment.useMutation();

  // Analytics tracking
  const {
    trackInvestButtonClick,
    trackPaymentInitiated,
    trackPaymentCompleted,
    trackPaymentFailed,
    trackSubscriptionStarted,
  } = useAnalytics();

  const { initiatePayment, isLoading, error } = useRazorpay({
    onSuccess: async (response) => {
      try {
        setIsProcessing(true);

        if (!orderDataRef.current) {
          throw new Error("Order data not found");
        }

        await verifyPaymentMutation.mutateAsync({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          planId: planId,
        });

        // Track successful payment
        trackPaymentCompleted(planId, response.razorpay_order_id);
        trackSubscriptionStarted(planId);

        // payment verification succeeded - proceed with redirect
        // subscription cache refresh is decoupled as best-effort background action
        // errors in refresh won't affect the successful payment verification
        (async () => {
          try {
            await (utils.user as any).subscriptionStatus.invalidate();
            await Promise.race([
              (utils.user as any).subscriptionStatus.fetch(undefined),
              new Promise((resolve) => setTimeout(resolve, 3000)), // 3s timeout
            ]);
          } catch (refreshError) {
            console.warn(
              "subscription cache refresh failed (non-fatal):",
              refreshError
            );
          }
        })();

        // redirect immediately after successful verification
        // checkout page will refetch subscription status if cache refresh failed
        router.push("/checkout");
      } catch (error) {
        console.error("Verification failed:", error);
        // Track payment verification failure
        trackPaymentFailed(
          planId,
          "verification_failed",
          error instanceof Error ? error.message : "Unknown error"
        );
        alert("Payment verification failed. Please contact support.");
        setIsProcessing(false);
      }
    },
    onFailure: (error) => {
      console.error("Payment failed:", error);
      // Track payment failure
      trackPaymentFailed(
        planId,
        "payment_failed",
        error instanceof Error ? error.message : String(error)
      );
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    },
    onDismiss: () => {
      setIsProcessing(false);
    },
  });

  const handlePayment = async () => {
    // Track invest button click immediately
    const isAuthenticated = sessionStatus === "authenticated" && !!session;
    trackInvestButtonClick(buttonLocation, isAuthenticated, planId);

    try {
      if (!planId || planId.trim().length === 0) {
        alert("Payment is currently unavailable. Please contact support.");
        return;
      }

      if (sessionStatus === "loading") {
        return;
      }

      if (sessionStatus === "unauthenticated" || !session) {
        const redirectUrl = callbackUrl || "/pricing";
        router.push(`/login?callbackUrl=${encodeURIComponent(redirectUrl)}`);
        return;
      }

      setIsProcessing(true);

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Razorpay key not configured");
      }

      const order = await createOrderMutation.mutateAsync({
        planId: planId,
        receipt: `opensox_${Date.now()}`,
        notes: {
          plan: planName,
        },
      });

      // Store order data for display purposes
      orderDataRef.current = {
        orderId: order.id,
        amount: order.amount, // Amount from backend response
      };

      // Track payment initiation
      trackPaymentInitiated(planId, order.amount);

      // Immediately open Razorpay checkout with the order
      const options: Omit<RazorpayOptions, "handler" | "modal"> = {
        key: razorpayKey,
        amount: order.amount.toString(),
        currency: order.currency,
        name: planName,
        description,
        image: "https://opensox.ai/assets/logo.svg",
        order_id: order.id,
        prefill: {
          name: session.user?.name || "",
          email: session.user?.email || "",
        },
        notes: {
          plan: planName,
          plan_id: planId,
        },
        theme: {
          color: "#a472ea",
        },
      };

      await initiatePayment(options);
    } catch (error: any) {
      console.warn("Failed to create order:", error);
      // Track order creation failure
      trackPaymentFailed(
        planId,
        "order_creation_failed",
        error?.message || "Failed to create order"
      );
      setIsProcessing(false);
      const redirectUrl = callbackUrl || "/pricing";
      router.push(`/login?callbackUrl=${encodeURIComponent(redirectUrl)}`);
    }
  };

  const planIdValid = planId && planId.trim().length > 0;

  // Show loading state while session is being determined
  const isButtonDisabled =
    !planIdValid ||
    isProcessing ||
    isLoading ||
    sessionStatus === "loading" ||
    createOrderMutation.isPending;

  const buttonTextDisplay = !planIdValid
    ? "Unavailable"
    : sessionStatus === "loading"
      ? "Loading..."
      : isProcessing || isLoading || createOrderMutation.isPending
        ? "Processing..."
        : buttonText;

  return (
    <div className="flex flex-col gap-2">
      <PrimaryButton
        classname={`${buttonClassName || "w-full"} ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={isButtonDisabled ? undefined : handlePayment}
      >
        {buttonTextDisplay}
      </PrimaryButton>
      {error && <p className="text-sm text-red-500">Payment error: {error}</p>}
    </div>
  );
};

export default PaymentFlow;

"use client";

import { useState, useCallback } from "react";
import {
  loadRazorpayScript,
  openRazorpayCheckout,
  type RazorpayOptions,
  type RazorpaySuccessResponse,
} from "@/lib/razorpay";
import { useRouter } from "next/navigation";

interface UseRazorpayProps {
  onSuccess?: (response: RazorpaySuccessResponse) => void;
  onFailure?: (error: Error) => void;
  onDismiss?: () => void;
}

export const useRazorpay = ({
  onSuccess,
  onFailure,
  onDismiss,
}: UseRazorpayProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const initiatePayment = useCallback(
    async (paymentOptions: Omit<RazorpayOptions, "handler" | "modal">) => {
      try {
        setIsLoading(true);
        setError(null);

        // Load Razorpay script
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          throw new Error("Failed to load Razorpay SDK");
        }

        // Prepare options with handlers
        const options: RazorpayOptions = {
          ...paymentOptions,
          handler: (response: RazorpaySuccessResponse) => {
            if (onSuccess) {
              onSuccess(response);
            } else {
              // Default: redirect to checkout success page
              router.push("/checkout");
            }
          },
          modal: {
            ondismiss: () => {
              setIsLoading(false);
              if (onDismiss) {
                onDismiss();
              }
            },
          },
        };

        // Open Razorpay checkout
        await openRazorpayCheckout(options);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        if (onFailure) {
          onFailure(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onFailure, onDismiss, router]
  );

  return {
    initiatePayment,
    isLoading,
    error,
  };
};

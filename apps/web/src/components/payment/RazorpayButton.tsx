"use client";

import React from "react";
import { useRazorpay } from "@/hooks/useRazorpay";
import type { RazorpayOptions } from "@/lib/razorpay";
import PrimaryButton from "@/components/ui/custom-button";

interface RazorpayButtonProps {
  orderId: string;
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  themeColor?: string;
  buttonText?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
  onSuccess?: (response: any) => void;
  onFailure?: (error: Error) => void;
}

/**
 * Razorpay Payment Button Component
 *
 * Usage:
 * ```tsx
 * <RazorpayButton
 *   orderId="order_123"
 *   amount={50000}
 *   currency="INR"
 *   name="Opensox Pro"
 *   description="Annual Subscription"
 *   prefill={{
 *     name: "John Doe",
 *     email: "john@example.com",
 *     contact: "9000090000"
 *   }}
 * />
 * ```
 */
const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  orderId,
  amount,
  currency = "INR",
  name = "Opensox",
  description = "Payment",
  image,
  prefill,
  notes,
  themeColor = "#a472ea",
  buttonText = "Pay Now",
  buttonClassName,
  children,
  onSuccess,
  onFailure,
}) => {
  const { initiatePayment, isLoading, error } = useRazorpay({
    onSuccess,
    onFailure,
  });

  const handlePayment = async () => {
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      console.error("Razorpay key not found");
      return;
    }

    const options: Omit<RazorpayOptions, "handler" | "modal"> = {
      key: razorpayKey,
      amount: amount.toString(),
      currency,
      name,
      description,
      image: image || "https://opensox.ai/assets/logo.svg",
      order_id: orderId,
      prefill,
      notes,
      theme: {
        color: themeColor,
      },
    };

    await initiatePayment(options);
  };

  return (
    <div className="flex flex-col gap-2">
      <PrimaryButton
        classname={`${buttonClassName || "w-full"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={isLoading ? undefined : handlePayment}
      >
        {isLoading ? "Processing..." : children || buttonText}
      </PrimaryButton>
      {error && <p className="text-sm text-red-500">Payment error: {error}</p>}
    </div>
  );
};

export default RazorpayButton;

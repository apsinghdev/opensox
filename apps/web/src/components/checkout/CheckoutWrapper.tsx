"use client";

import React from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { useRouter } from "next/navigation";
import CheckoutConfirmation from "./checkout-confirmation";

export default function CheckoutWrapper() {
  const { isPaidUser, isLoading } = useSubscription();
  const router = useRouter();

  // Show loading state while checking subscription
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to pricing if not a paid user
  if (!isPaidUser) {
    router.push("/pricing");
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    );
  }

  // Show checkout confirmation for paid users
  return <CheckoutConfirmation />;
}

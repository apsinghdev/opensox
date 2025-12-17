"use client";

import React, { useEffect, useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CheckoutConfirmation from "./checkout-confirmation";

export default function CheckoutWrapper() {
  const { isPaidUser, isLoading } = useSubscription();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, update } = useSession();
  const paymentSuccess = searchParams.get("payment") === "success";
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (paymentSuccess && session && !hasRefreshed) {
      update().then(() => {
        setHasRefreshed(true);
        router.refresh();
      });
    }
  }, [paymentSuccess, session, update, hasRefreshed, router]);

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

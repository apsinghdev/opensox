"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProDashboardPage() {
  const { isPaidUser, isLoading } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isPaidUser) {
      router.push("/pricing");
    }
  }, [isPaidUser, isLoading, router]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-ox-content">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!isPaidUser) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-ox-content p-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          hi investors, ajeetunc is on the way to deliver the shareholder value.
          soon you&apos;ll see all the pro perks here. thanks for investing
        </h1>
      </div>
    </div>
  );
}

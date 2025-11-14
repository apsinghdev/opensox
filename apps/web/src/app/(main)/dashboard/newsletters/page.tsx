"use client";

import { Newsletter } from "@/types/newsletter";
import Newsletters from "./Content";
import { newsletters } from "./data/newsletters";
import { useSubscription } from "@/hooks/useSubscription";
import NewsletterPremiumGate from "./components/NewsletterPremiumGate";

export default function NewslettersPage() {
  const { isPaidUser, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!isPaidUser) {
    return <NewsletterPremiumGate />;
  }

  return (
    <div>
      <Newsletters newsletters={newsletters as Newsletter[]} />
    </div>
  );
}
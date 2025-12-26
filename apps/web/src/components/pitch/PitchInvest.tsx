"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import PrimaryButton from "@/components/ui/custom-button";

const PaymentFlow = dynamic(() => import("@/components/payment/PaymentFlow"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md">
      <PrimaryButton classname="w-full">Invest</PrimaryButton>
    </div>
  ),
});

export default function PitchInvest({
  premiumPlanId,
  callbackUrl,
}: {
  premiumPlanId: string;
  callbackUrl: string;
}) {
  const planIdOk =
    typeof premiumPlanId === "string" && premiumPlanId.trim().length > 0;

  if (!planIdOk) {
    return (
      <Link href="/pricing" prefetch={false} className="w-full max-w-md">
        <PrimaryButton classname="w-full">Invest Now</PrimaryButton>
      </Link>
    );
  }

  return (
    <div className="w-full max-w-md">
      <PaymentFlow
        planId={premiumPlanId}
        planName="Opensox Pro"
        description="Annual Subscription"
        buttonText="Invest"
        buttonClassName="w-full"
        callbackUrl={callbackUrl}
        buttonLocation="pitch_page"
      />
    </div>
  );
}

"use client";

import { useSubscription } from "@/hooks/useSubscription";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { memo, useMemo } from "react";
import { ActiveTag } from "@/components/ui/ActiveTag";
import { formatSubscriptionPlanLabel } from "@/lib/format-subscription-plan-label";
import { MembershipActions } from "./membership-actions";

const AccountPageContent = memo(function AccountPageContent({
  isPaidUser,
  subscription,
}: {
  isPaidUser: boolean;
  subscription: {
    planName: string | null;
    durationMonths: number | null;
    startDate: Date;
    endDate: Date;
  } | null;
}) {
  const plan = useMemo(
    () => formatSubscriptionPlanLabel(isPaidUser, subscription),
    [isPaidUser, subscription],
  );
  const joinedOn = useMemo(() => {
    if (!subscription?.startDate) return "—";
    return new Date(subscription.startDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [subscription?.startDate]);

  const expiresOn = useMemo(() => {
    if (!subscription?.endDate) return "—";
    return new Date(subscription.endDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [subscription?.endDate]);

  return (
    <>
      <div className="mb-6">
        <Link
          href="/dashboard/home"
          className="inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
          Account Settings
        </h1>
      </div>

      <div className="bg-ox-sidebar border border-dash-border rounded-lg p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-text-muted mb-2 block">Plan</label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-text-primary">
                {plan}
              </span>
              {isPaidUser && <ActiveTag />}
            </div>
          </div>
          {isPaidUser && (
            <>
              <div>
                <label className="text-sm text-text-muted mb-2 block">
                  Joined on
                </label>
                <p className="text-text-primary text-sm font-medium">{joinedOn}</p>
              </div>
              <div>
                <label className="text-sm text-text-muted mb-2 block">
                  Expires on
                </label>
                <p className="text-text-primary text-sm font-medium">{expiresOn}</p>
              </div>
              {subscription ? (
                <MembershipActions subscription={subscription} />
              ) : null}
            </>
          )}
          {!isPaidUser && (
            <div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-ox-purple hover:bg-ox-purple-2 text-text-primary rounded-md transition-colors text-xs font-medium"
              >
                be a pro
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default function AccountPage() {
  const { isPaidUser, isLoading, subscription } = useSubscription();

  return (
    <div className="w-full h-full flex flex-col p-6 bg-ox-content">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-text-muted">Loading...</span>
        </div>
      ) : (
        <AccountPageContent
          isPaidUser={isPaidUser}
          subscription={subscription}
        />
      )}
    </div>
  );
}

"use client";

import { useSubscription } from "@/hooks/useSubscription";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { memo, useMemo } from "react";
import { ActiveTag } from "@/components/ui/ActiveTag";

const AccountPageContent = memo(function AccountPageContent({
  isPaidUser,
}: {
  isPaidUser: boolean;
}) {
  const plan = useMemo(() => (isPaidUser ? "Pro" : "Free"), [isPaidUser]);

  return (
    <>
      <div className="mb-6">
        <Link
          href="/dashboard/home"
          className="inline-flex items-center gap-2 text-ox-purple hover:text-ox-purple-2 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Account Settings
        </h1>
      </div>

      <div className="bg-ox-sidebar border border-ox-header rounded-lg p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Plan</label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white">{plan}</span>
              {isPaidUser && <ActiveTag />}
            </div>
          </div>
          {!isPaidUser && (
            <div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-ox-purple hover:bg-ox-purple-2 text-white rounded-md transition-colors text-xs font-medium"
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
  const { isPaidUser, isLoading } = useSubscription();

  return (
    <div className="w-full h-full flex flex-col p-6 bg-ox-content">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-zinc-400">Loading...</span>
        </div>
      ) : (
        <AccountPageContent isPaidUser={isPaidUser} />
      )}
    </div>
  );
}

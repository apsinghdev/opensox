"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { trpc } from "@/lib/trpc";

function formatJoinedDate(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const AdminEmailListPage = (): JSX.Element => {
  const { status } = useSession();
  const authenticated = status === "authenticated";

  const { data: isAdmin, isLoading: adminCheckLoading } =
    trpc.admin.isAdmin.useQuery(undefined, { enabled: authenticated });

  if (status === "loading" || (authenticated && adminCheckLoading)) {
    return (
      <CenteredMessage>
        <div
          role="status"
          aria-label="Checking admin access"
          className="flex flex-col items-center gap-3"
        >
          <div
            aria-hidden="true"
            className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"
          />
          <span className="sr-only">Checking admin access.</span>
        </div>
      </CenteredMessage>
    );
  }

  if (!authenticated) {
    return (
      <CenteredMessage>
        <p className="text-text-secondary">You need to sign in to continue.</p>
        <Link href="/login" className="text-brand-purple-light hover:underline">
          Go to login
        </Link>
      </CenteredMessage>
    );
  }

  if (!isAdmin) {
    return (
      <CenteredMessage>
        <p className="text-text-primary font-semibold text-lg">Access denied</p>
        <p className="text-text-secondary text-sm">
          This area is restricted to administrators.
        </p>
      </CenteredMessage>
    );
  }

  return (
    <div className="min-h-screen bg-ox-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            ← Admin
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mt-3">
            Email list
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Confirmed subscribers on the jackedAJ newsletter.
          </p>
        </div>

        <SubscriberList />
      </div>
    </div>
  );
};

function SubscriberList(): JSX.Element {
  const { data, isLoading, isError, error } =
    trpc.admin.newsletterList.useQuery();

  if (isLoading) {
    return <p className="text-text-secondary">Loading subscribers...</p>;
  }

  if (isError) {
    return (
      <p className="text-text-secondary">
        Couldn&apos;t load the email list
        {error?.message ? `: ${error.message}` : "."}
      </p>
    );
  }

  const count = data?.count ?? 0;
  const subscribers = data?.subscribers ?? [];

  return (
    <>
      <p className="text-text-muted text-sm mb-6">
        Newsletter:{" "}
        <span className="text-text-secondary">{count}</span>
      </p>

      {subscribers.length === 0 ? (
        <div className="border border-dash-border rounded-xl p-10 text-center">
          <p className="text-text-secondary">No confirmed subscribers yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="bg-dash-surface border border-dash-border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-text-primary font-medium truncate">
                  {subscriber.email}
                </p>
                <p className="text-text-muted text-xs mt-0.5">
                  {subscriber.source}
                  <span className="mx-1.5 text-dash-border">·</span>
                  {formatJoinedDate(subscriber.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function CenteredMessage({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-h-screen bg-ox-content flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center px-4">
        {children}
      </div>
    </div>
  );
}

export default AdminEmailListPage;

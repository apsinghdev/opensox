"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronRight } from "lucide-react";

import { trpc } from "@/lib/trpc";

function formatAdminRevenue(amountPaise: number, currency: string): string {
  const major = amountPaise / 100;
  if (currency === "INR") {
    return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(major)}`;
  }
  return `${new Intl.NumberFormat("en-IN").format(major)} ${currency}`;
}

const ADMIN_SECTIONS = [
  {
    href: "/admin/sessions",
    title: "Pro recordings",
    description: "Manage session recordings and topics for Pro members.",
  },
  {
    href: "/admin/modules",
    title: "Pro modules",
    description: "Manage learning modules and video content for Pro members.",
  },
  {
    href: "/admin/refs",
    title: "Pro references",
    description: "Manage reference links shown to Pro members.",
  },
  {
    href: "/admin/projects",
    title: "Pro projects",
    description: "Manage open source projects shown to Pro members.",
  },
] as const;

const AdminHomePage = (): JSX.Element => {
  const { status } = useSession();
  const authenticated = status === "authenticated";

  const { data: isAdmin, isLoading: adminCheckLoading } =
    trpc.admin.isAdmin.useQuery(undefined, { enabled: authenticated });

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: authenticated && isAdmin === true,
  });

  if (status === "loading" || (authenticated && adminCheckLoading)) {
    return (
      <CenteredMessage>
        <div
          role="status"
          aria-label="Checking admin access and loading admin stats"
          className="flex flex-col items-center gap-3"
        >
          <div
            aria-hidden="true"
            className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"
          />
          <span className="sr-only">
            Checking admin access and loading admin stats.
          </span>
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
          <h1 className="text-2xl font-bold text-text-primary">Admin</h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage Pro content and settings.
          </p>
          <p className="text-text-muted text-sm mt-3">
            Paid users:{" "}
            <span className="text-text-secondary">
              {stats?.paidUsers ?? "—"}
            </span>
            <span className="mx-2 text-dash-border">·</span>
            Total revenue:{" "}
            <span className="text-text-secondary">
              {stats
                ? formatAdminRevenue(
                    stats.totalRevenuePaise,
                    stats.currency
                  )
                : "—"}
            </span>
            <span className="mx-2 text-dash-border">·</span>
            Latest pro member:{" "}
            <span className="text-text-secondary">
              {stats?.latestProMemberEmail ?? "—"}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          {ADMIN_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group flex items-center justify-between gap-4 bg-dash-surface border border-dash-border rounded-xl p-4 hover:bg-dash-hover transition-colors"
            >
              <div className="min-w-0">
                <p className="text-text-primary font-medium">{section.title}</p>
                <p className="text-text-muted text-sm mt-0.5">
                  {section.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-text-secondary shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

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

export default AdminHomePage;

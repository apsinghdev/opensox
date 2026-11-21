"use client";

import dynamic from "next/dynamic";
import { ReturningMemberDiscountPill } from "@/components/payment/ReturningMemberOffer";
import { formatApproxPlanPrice } from "@/lib/format-plan-price";
import { formatSubscriptionPlanLabel } from "@/lib/format-subscription-plan-label";
import { trpc } from "@/lib/trpc";

const PaymentFlow = dynamic(
  () => import("@/components/payment/PaymentFlow").then((mod) => mod.default),
  { ssr: false, loading: () => null },
);

function formatMembershipDate(value: Date | string | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type MembershipOfferProps = {
  planId: string;
  planName: string;
  title: string;
  buttonText: string;
  paymentDescription: string;
  term: string;
  successPath: string;
  note?: string;
};

function offerDetail(
  action: string | undefined,
  term: string,
  nextEndLabel: string,
): string {
  if (action === "upgrade") {
    return `Adds 4 years to your current duration, plus extra Pro+ features. New expiry will be ${nextEndLabel}.`;
  }
  return `Adds ${term} after your current duration. New expiry will be ${nextEndLabel}.`;
}

function MembershipOffer({
  planId,
  planName,
  title,
  buttonText,
  paymentDescription,
  term,
  successPath,
  note,
}: MembershipOfferProps) {
  const { data: quote, isLoading, isError } = trpc.payment.checkoutQuote.useQuery(
    { planId },
    {
      // the next expiry is calculated from the live subscription, so a quote
      // cached before an extension still shows that old date
      staleTime: 0,
      refetchOnMount: "always",
      retry: false,
    },
  );

  if (quote && !quote.available) return null;

  const nextEndLabel = formatMembershipDate(quote?.nextEndDate);
  const showMemberPrice = quote?.discounted === true;

  return (
    <div className="rounded-lg border border-dash-border p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <p className="mt-1 text-sm text-text-muted">
            {quote?.nextEndDate
              ? offerDetail(quote.action, term, nextEndLabel)
              : "Checking the new expiry..."}
          </p>
          {note ? <p className="mt-1 text-xs text-text-muted">{note}</p> : null}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            {isLoading ? (
              <span className="text-text-muted">Loading price...</span>
            ) : isError || !quote ? (
              <span className="text-text-muted">Price unavailable</span>
            ) : showMemberPrice ? (
              <>
                <span className="text-text-muted line-through">
                  {formatApproxPlanPrice(quote.listPrice, quote.currency)}
                </span>
                <span className="font-semibold text-text-primary">
                  {formatApproxPlanPrice(quote.amount, quote.currency)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-text-primary">
                {formatApproxPlanPrice(quote.amount, quote.currency)}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col items-center gap-2 sm:w-44">
          <div className="w-full">
            <PaymentFlow
              planId={planId}
              planName={planName}
              description={paymentDescription}
              buttonText={buttonText}
              buttonClassName="w-full !px-4 !py-2.5 !text-sm !font-semibold"
              callbackUrl="/dashboard/account"
              successPath={successPath}
              buttonLocation="account_page"
            />
          </div>
          {showMemberPrice ? <ReturningMemberDiscountPill /> : null}
        </div>
      </div>
    </div>
  );
}

type MembershipSubscription = {
  planName: string | null;
  durationMonths: number | null;
  endDate: Date;
};

export function MembershipActions({
  subscription,
}: {
  subscription: MembershipSubscription;
}) {
  const plan = formatSubscriptionPlanLabel(true, subscription);
  const isProPlus = plan === "Pro+";
  const yearlyPlanId = process.env.NEXT_PUBLIC_YEARLY_PREMIUM_PLAN_ID;
  const fourYearPlanId = process.env.NEXT_PUBLIC_4YEAR_PREMIUM_PLAN_ID;
  const offers: MembershipOfferProps[] = [];

  if (!isProPlus && typeof yearlyPlanId === "string" && yearlyPlanId.length > 0) {
    offers.push({
      planId: yearlyPlanId,
      planName: "Opensox Pro",
      title: "Extend Pro",
      buttonText: "Extend Pro",
      paymentDescription: "Extend Pro by 1 year",
      term: "1 year",
      successPath: "/extend",
    });
  }

  if (!isProPlus && typeof fourYearPlanId === "string" && fourYearPlanId.length > 0) {
    offers.push({
      planId: fourYearPlanId,
      planName: "Opensox Pro+",
      title: "Upgrade to Pro+",
      buttonText: "Upgrade to Pro+",
      paymentDescription: "Upgrade to Pro+",
      term: "4 years",
      successPath: "/upgrade",
    });
  }

  if (isProPlus && typeof fourYearPlanId === "string" && fourYearPlanId.length > 0) {
    offers.push({
      planId: fourYearPlanId,
      planName: "Opensox Pro+",
      title: "Extend Pro+",
      buttonText: "Extend Pro+",
      paymentDescription: "Extend Pro+ by 4 years",
      term: "4 years",
      successPath: "/extend",
    });
  }

  if (offers.length === 0) return null;

  return (
    <div className="border-t border-dash-border pt-6">
      <h2 className="text-sm font-medium text-text-primary">Membership</h2>
      <p className="mt-1 text-sm text-text-muted">
        Members get 10% off when they extend or upgrade.
      </p>
      <div className="mt-4 space-y-3">
        {offers.map((offer) => (
          <MembershipOffer key={`${offer.title}-${offer.planId}`} {...offer} />
        ))}
      </div>
    </div>
  );
}

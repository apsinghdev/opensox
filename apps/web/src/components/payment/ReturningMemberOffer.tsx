import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc";

const OFFER_PILL_CLASS =
  "inline-flex items-center rounded-md border border-info-border bg-info-bg px-1.5 py-0.5 text-[10px] font-semibold leading-none text-info-text";

export function useReturningMemberOffer(planId?: string): boolean {
  const { data: session, status } = useSession();
  const signedIn = status === "authenticated";
  const accountKey = signedIn ? (session?.user?.email ?? "") : "";
  const enabled =
    signedIn &&
    accountKey.length > 0 &&
    typeof planId === "string" &&
    planId.length > 0;

  const { data } = trpc.payment.checkoutQuote.useQuery(
    { planId: planId ?? "", accountKey },
    {
      enabled,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  );

  return (
    signedIn &&
    data?.discounted === true &&
    (data.discountReason === "returning" || data.discountReason == null)
  );
}

export function ReturningMemberOffer() {
  return (
    <p>
      <span className="inline-flex items-center rounded-md border border-info-border bg-info-bg px-2 py-0.5 text-xs font-semibold text-info-text">
        You&apos;re eligible for 10% off!
      </span>
    </p>
  );
}

export function ReturningMemberDiscountPill() {
  return <span className={OFFER_PILL_CLASS}>10% off</span>;
}

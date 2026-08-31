"use client";
import Header from "@/components/ui/header";
import PrimaryButton from "@/components/ui/custom-button";
import { Check, Terminal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Features from "@/components/features/features";
import dynamic from "next/dynamic";
import { trpc } from "@/lib/trpc";
import { formatApproxPlanPrice } from "@/lib/format-plan-price";

const Footer = dynamic(
  () =>
    import("@/components/landing-sections/footer").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  },
);

// lazy load PaymentFlow - it's inside pricing card but can wait
const PaymentFlow = dynamic(
  () => import("@/components/payment/PaymentFlow").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  },
);

type TierKey = "free" | "pro1" | "pro4";

type FeatureValue = boolean | string;

interface ComparisonFeature {
  name: string;
  upcoming?: boolean;
  free: FeatureValue;
  pro: FeatureValue;
  proPlus: FeatureValue;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Project search (legacy)",
    free: true,
    pro: true,
    proPlus: true,
  },
  {
    name: "Access to the general community",
    free: true,
    pro: true,
    proPlus: true,
  },
  { name: "OSS sheet", free: true, pro: true, proPlus: true },
  { name: "Onboarding call", free: false, pro: true, proPlus: true },
  {
    name: "OSS guidance (jobs, GSoC, LFX, etc.)",
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: "Pro community",
    free: false,
    pro: true,
    proPlus: true,
  },
  { name: "Weekly live sessions", free: false, pro: true, proPlus: true },
  { name: "Unlimited QnAs", free: false, pro: true, proPlus: true },
  { name: "Weekly contests", free: false, pro: true, proPlus: true },
  {
    name: "Pro modules",
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: "Hand-picked OSS projects",
    free: false,
    pro: true,
    proPlus: true,
  },
  {
    name: "Session recordings",
    free: false,
    pro: true,
    proPlus: true,
  },
  { name: "Private thread", free: false, pro: true, proPlus: true },
  {
    name: "Updates on open source, jobs, tech",
    free: false,
    pro: true,
    proPlus: true,
  },
  { name: "Daily stand-ups", free: false, pro: true, proPlus: true },
  { name: "Pro References", free: false, pro: true, proPlus: true },
  {
    name: "Build in Public Tool (worth $39)",
    upcoming: true,
    free: false,
    pro: false,
    proPlus: true,
  },
  {
    name: "Discount on Merch",
    upcoming: true,
    free: false,
    pro: false,
    proPlus: true,
  },
];

interface PlanTier {
  key: TierKey;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  planId?: string;
  paymentDescription?: string;
}

const Pricing = () => {
  const pathname = usePathname();
  const callbackUrl = `${pathname}#pro-price-card`;

  const yearlyPlanId = process.env.NEXT_PUBLIC_YEARLY_PREMIUM_PLAN_ID;
  const fourYearPlanId = process.env.NEXT_PUBLIC_4YEAR_PREMIUM_PLAN_ID;

  // NOTE: `price` below is a display label only. The actual amount charged and
  // the "≈ ₹…" line both come from the plan record (Plan.price) via
  // getPublicPlan, so the record is the single source of truth. When changing a
  // headline price here, update the matching Plan record's price (and keep the
  // USD label consistent with it) — otherwise the card will advertise one price
  // and charge another.
  const tiers: PlanTier[] = [
    {
      key: "free",
      name: "Free",
      price: "$0",
      period: "forever",
    },
    {
      key: "pro1",
      name: "Pro",
      price: "$49",
      originalPrice: "$89",
      period: "/ year",
      planId: yearlyPlanId,
      paymentDescription: "Annual Subscription",
    },
    {
      key: "pro4",
      name: "Pro+",
      price: "$99",
      originalPrice: "$199",
      period: "/ 4 years",
      planId: fourYearPlanId,
      paymentDescription: "4 Year Subscription",
    },
  ];

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === "#pro-price-card") {
        const element = document.getElementById("pro-price-card");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      if (window.location.hash === "#testimonials") {
        const element = document.getElementById("testimonials");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      if (window.location.hash === "#explore-features") {
        const element = document.getElementById("explore-features");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(handleHashScroll, { timeout: 2000 });
    } else {
      setTimeout(handleHashScroll, 100);
    }
  }, []);

  return (
    <>
      <main className="w-full overflow-hidden flex flex-col items-center justify-center relative">
        {/* SECTION 1 - hero */}
        <section className="relative flex w-full items-center overflow-hidden border-b border-border lg:min-h-screen">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 lg:h-2/5"
            style={{
              maskImage: "linear-gradient(to top, black 0%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 0%, transparent 85%)",
              filter: "blur(10px)",
            }}
          >
            <Image
              src="/assets/card_bg.svg"
              alt=""
              fill
              loading="lazy"
              className="h-full w-full object-cover object-bottom opacity-50"
            />
          </div>
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Opensox{" "}
                <span className="bg-gradient-to-b from-[#a472ea] to-[#432ba0] bg-clip-text text-transparent">
                  Pro.
                </span>
              </h1>
              <p className="text-2xl font-medium tracking-tight text-text-secondary sm:text-3xl">
                a small and effective ecosystem for{" "}
                <a
                  href="/pitch#my-scale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-brand-purple-light decoration-1 underline-offset-4 transition-colors hover:decoration-brand-purple"
                >
                  30
                </a>{" "}
                people.
              </p>
              <p className="text-lg font-medium tracking-tight sm:text-xl">
                learning <span className="text-[#a472ea]">Open Source.</span>{" "}
                <span className="text-[#a472ea]">Build in Public.</span>{" "}
                <span className="text-[#a472ea]">First Principles.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border">
                <Image
                  src="/assets/jackedaj.jpg"
                  alt="jackedAJ"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 384px"
                  className="object-cover object-top"
                />
              </div>
              <p className="text-center text-sm font-medium text-text-secondary">
                directly managed by jackedAJ (no TAs.)
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 - pricing comparison */}
        <section id="pro-price-card" className="w-full border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
            <PricingComparison tiers={tiers} callbackUrl={callbackUrl} />
          </div>
        </section>

        <Features />

        {/* SECTION 3 - testimonials */}
        <TestimonialsSection />
        <div className="w-full border-b border-border text-center py-8 px-4">
          <p className="text-lg mb-4 text-text-secondary">
            <Link
              href="/testimonials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-purple-light hover:text-brand-purple transition-colors underline"
            >
              see more
            </Link>
          </p>
        </div>
        <div className="w-full border-b border-border text-center py-4 font-bold px-4">
          For any doubts or queries, feel free to ping us at{" "}
          <Link
            href="mailto:opensoxlabs@gmail.com"
            className="hover:underline bg-gradient-to-b from-[#a472ea] via-[#a472ea]/80 to-[#432ba0] bg-clip-text text-transparent"
          >
            opensoxlabs@gmail.com
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;

const FEATURE_LABEL_WIDTH = "w-[9.5rem] shrink-0";

const FEATURE_ROW_LAYOUT =
  "flex items-start gap-4 border-b border-border py-3.5 lg:grid lg:grid-cols-[minmax(0,max-content)_1fr] lg:items-center lg:gap-6";

const MOBILE_TABLE_SCROLL =
  "-mx-4 overflow-x-auto overscroll-x-contain px-4 lg:mx-0 lg:overflow-visible lg:px-0";

const PLAN_COLUMNS_GAP = "gap-6 lg:gap-10";

const PlanColumns = ({
  children,
  className = "",
  align = "end",
  role,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
  role?: string;
}) => (
  <div
    role={role}
    className={`flex shrink-0 ${align === "start" ? "ml-0 justify-start pl-0 pr-0" : "ml-auto justify-end pl-8 pr-4 lg:pl-0 lg:pr-6"} ${PLAN_COLUMNS_GAP} ${className}`}
  >
    {children}
  </div>
);

const PlanColumn = ({
  children,
  className = "",
  role,
}: {
  children: React.ReactNode;
  className?: string;
  role?: string;
}) => (
  <div
    role={role}
    className={`flex shrink-0 flex-col items-center px-3 sm:px-4 w-[8rem] sm:w-[10rem] ${className}`}
  >
    {children}
  </div>
);

const UpcomingBadge = () => (
  <span className="inline-flex shrink-0 items-center rounded-md border border-success-border/40 bg-success-bg px-2 py-0.5 text-[10px] font-semibold text-success-text">
    Upcoming
  </span>
);

const FeatureCell = ({ value }: { value: FeatureValue }) => {
  if (value === true) {
    return (
      <Check
        className="h-5 w-5 text-brand-purple-light"
        strokeWidth={2.75}
        aria-label="Included"
      />
    );
  }

  if (value === false) {
    return (
      <X
        className="h-5 w-5 text-destructive"
        strokeWidth={2.75}
        aria-label="Not included"
      />
    );
  }

  return <span className="text-center text-sm text-text-primary">{value}</span>;
};

const PRICING_PLAN_BUTTON_CLASS =
  "w-full !py-2.5 !text-sm !font-semibold";

const PlanColumnHeader = ({
  tier,
  callbackUrl,
}: {
  tier: PlanTier;
  callbackUrl: string;
}) => {
  const router = useRouter();
  const planIdOk = typeof tier.planId === "string" && tier.planId.length > 0;
  const isPaid = tier.key !== "free";

  const { data: publicPlan } = trpc.payment.getPublicPlan.useQuery(
    { planId: tier.planId as string },
    {
      enabled: isPaid && planIdOk,
      staleTime: 5 * 60 * 1000,
    },
  );

  const { data: memberCountData } = trpc.payment.getProMemberCount.useQuery(
    { planId: tier.planId as string },
    {
      enabled: isPaid && planIdOk,
      staleTime: 5 * 60 * 1000,
    },
  );

  return (
    <div className="flex h-full w-full flex-col text-center">
      <div className="flex flex-col items-center">
        <p
          className={`px-3 py-1.5 text-lg font-medium tracking-wide ${isPaid ? "text-brand-purple-light" : "text-text-muted"}`}
        >
          {tier.name}
        </p>
        <div className="flex flex-col items-center gap-0.5">
          {isPaid ? (
            <p className="flex flex-wrap items-baseline justify-center gap-x-1.5 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              <span>{tier.price}</span>
              <span className="text-sm font-normal text-text-muted">
                {tier.period}
              </span>
            </p>
          ) : (
            <p className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              {tier.price}
            </p>
          )}
          {tier.originalPrice ? (
            <span className="text-sm font-normal text-text-muted line-through">
              {tier.originalPrice}
            </span>
          ) : (
            <span className="text-sm invisible select-none" aria-hidden>
              &nbsp;
            </span>
          )}
          {isPaid && planIdOk && publicPlan ? (
            <span className="text-sm font-semibold text-text-primary">
              {formatApproxPlanPrice(publicPlan.price, publicPlan.currency)}
            </span>
          ) : (
            <span className="text-sm invisible select-none" aria-hidden>
              &nbsp;
            </span>
          )}
        </div>
      </div>
      <div className="w-full pt-4">
        {!isPaid ? (
          <PrimaryButton
            classname={PRICING_PLAN_BUTTON_CLASS}
            onClick={() => router.push("/dashboard/home")}
          >
            Start free
          </PrimaryButton>
        ) : (
          <PaymentFlow
            planId={planIdOk ? (tier.planId as string) : ""}
            planName={`Opensox ${tier.name}`}
            description={tier.paymentDescription}
            buttonText={planIdOk ? "Invest" : "Unavailable"}
            buttonClassName={`${PRICING_PLAN_BUTTON_CLASS} ${planIdOk ? "" : "!opacity-60 !cursor-not-allowed"}`}
            callbackUrl={callbackUrl}
            buttonLocation="pricing_page"
          />
        )}
        {isPaid && typeof memberCountData?.count === "number" ? (
          <p className="mt-2 font-heading text-sm font-semibold tracking-tighter text-success-text">
            {memberCountData.count} invested!
          </p>
        ) : (
          <p className="mt-2 text-sm invisible select-none" aria-hidden>
            &nbsp;
          </p>
        )}
      </div>
    </div>
  );
};

const PricingComparison = ({
  tiers,
  callbackUrl,
}: {
  tiers: PlanTier[];
  callbackUrl: string;
}) => {
  const freeTier = tiers.find((t) => t.key === "free")!;
  const proTier = tiers.find((t) => t.key === "pro1")!;
  const proPlusTier = tiers.find((t) => t.key === "pro4")!;

  return (
    <div className="flex flex-col gap-6 lg:gap-14">
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_1fr] lg:items-stretch lg:gap-6">
        <div className="flex flex-col gap-3 pt-4">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Choose your{" "}
            <span className="bg-gradient-to-b from-brand-purple-light to-brand-purple-dark bg-clip-text text-transparent">
              plan.
            </span>
          </h2>
          <p className="max-w-sm text-sm text-text-muted">
            Go Pro or Pro+ to join the ecosystem.
          </p>
        </div>

        <PlanColumns className="h-full items-stretch">
          <PlanColumn className="h-full">
            <PlanColumnHeader tier={freeTier} callbackUrl={callbackUrl} />
          </PlanColumn>
          <PlanColumn className="h-full">
            <PlanColumnHeader tier={proTier} callbackUrl={callbackUrl} />
          </PlanColumn>
          <PlanColumn className="h-full">
            <PlanColumnHeader tier={proPlusTier} callbackUrl={callbackUrl} />
          </PlanColumn>
        </PlanColumns>
      </div>

      <div className="flex flex-col gap-3 pt-4 lg:hidden">
        <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Choose your{" "}
          <span className="bg-gradient-to-b from-brand-purple-light to-brand-purple-dark bg-clip-text text-transparent">
            plan.
          </span>
        </h2>
        <p className="max-w-sm text-sm text-text-muted">
          Go Pro or Pro+ to join the ecosystem.
        </p>
      </div>

      <div className={MOBILE_TABLE_SCROLL}>
        <div className="min-w-[40rem] lg:min-w-0">
          <div className="flex items-stretch pb-6 lg:hidden">
            <div className={FEATURE_LABEL_WIDTH} aria-hidden />
            <PlanColumns align="start" className="items-stretch">
              <PlanColumn className="h-full">
                <PlanColumnHeader tier={freeTier} callbackUrl={callbackUrl} />
              </PlanColumn>
              <PlanColumn className="h-full">
                <PlanColumnHeader tier={proTier} callbackUrl={callbackUrl} />
              </PlanColumn>
              <PlanColumn className="h-full">
                <PlanColumnHeader
                  tier={proPlusTier}
                  callbackUrl={callbackUrl}
                />
              </PlanColumn>
            </PlanColumns>
          </div>

          <div
            className="border-t border-border"
            role="table"
            aria-label="Plan feature comparison"
          >
            <div role="row" className="sr-only">
              <span role="columnheader">Feature</span>
              <span role="columnheader">{freeTier.name}</span>
              <span role="columnheader">{proTier.name}</span>
              <span role="columnheader">{proPlusTier.name}</span>
            </div>
            {comparisonFeatures.map((feature) => (
              <div key={feature.name} className={FEATURE_ROW_LAYOUT} role="row">
                <p
                  role="rowheader"
                  className={`${FEATURE_LABEL_WIDTH} flex min-w-0 flex-wrap items-center gap-2 pr-2 text-sm text-text-primary lg:w-auto lg:pr-6`}
                >
                  <span>{feature.name}</span>
                  {feature.upcoming ? <UpcomingBadge /> : null}
                </p>
                <PlanColumns
                  align="start"
                  role="presentation"
                  className="items-start lg:ml-auto lg:justify-end lg:pr-6 lg:items-center"
                >
                  <PlanColumn
                    role="cell"
                    className="items-start lg:items-center"
                  >
                    <FeatureCell value={feature.free} />
                  </PlanColumn>
                  <PlanColumn
                    role="cell"
                    className="items-start lg:items-center"
                  >
                    <FeatureCell value={feature.pro} />
                  </PlanColumn>
                  <PlanColumn
                    role="cell"
                    className="items-start lg:items-center"
                  >
                    <FeatureCell value={feature.proPlus} />
                  </PlanColumn>
                </PlanColumns>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-text-muted">
        Still not sure?{" "}
        <Link
          href="/pitch"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link-hover underline underline-offset-2 transition-colors"
        >
          Read my pitch to you.
        </Link>
      </p>
    </div>
  );
};

const PremiumTestimonialCard = ({
  username = "Username",
  showPremium = true,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl">{username}</p>
      {showPremium && (
        <div className="bg-gradient-to-b from-[#ad84e7] via-[#986cd6] to-[#432d8e] bg-clip-text text-transparent">
          <p className="">Opensox Pro</p>
        </div>
      )}
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      username: "Tarun Parmar",
      content:
        "Getting the Opensox Pro Subscription has been such a game-changer for me. I really like the personal touch in the way the team guides you-it feels like someone is genuinely there to help you navigate. It gave me the initial push I needed and made it so much easier to cut through all the chaos and focus on the right and simple steps. The best part is, it helps you start your open source journey quickly and I know I can reach out to the team anytime. Honestly, it's been an awesome experience so far!",
      column: 1,
    },
    {
      id: 2,
      username: "Daksh Yadav",
      content:
        "My experience with your guidance and opensox has been great. Your tips have really helped in doing my tasks quicker and better. And I would definitely recommend others to opt for opensox Pro.",
      column: 1,
    },
    {
      id: 3,
      username: "Rishabh R Pathak",
      content: (
        <div className="space-y-3 text-pretty">
          <p>
            Okay so there are a few things I genuinely value about Opensox Pro,
            and I&apos;ll focus on the core points because everything else is
            just a natural extension of these.
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              First, the pricing. To me, it&apos;s more than fair for the kind
              of value on the table. In fact, I see it as something that can
              yield long-term returns if you&apos;re serious about putting in
              the work.
            </li>
            <li>
              The onboarding call was one of the best parts. Spending 30+
              minutes just to understand where I stand, whether I&apos;m
              starting out or already experienced and aligning the guidance with
              my goals. That level of personalization is rare and it set the
              tone right from the start.
            </li>
            <li>
              Another thing l&apos;ve appreciated is the transparency. No
              sugarcoating, no vague talk, you share real experiences, honest
              opinions and advice that actually holds weight. That alone builds
              credibility and trust.
            </li>
            <li>
              And yeah, the support also goes beyond the program itself. Getting
              advice on personal doubts and extra tips outside the set
              curriculum (of course, sometimes, not always lol!).
            </li>
            <li>
              The regular check-ins are also a huge plus. They help track
              progress, keep me accountable, and ensure l&apos;m moving in the
              right direction.
            </li>
            <li>
              Overall, I&apos;d absolutely recommend Opensox Pro to anyone
              serious about open source. The personalized guidance is exactly
              what most of us hope for, since everyone is at a different stage
              of their journey.
            </li>
            <li>
              A personal opinion btw :) My only hope is that the same quality
              continues even as more people join and judging from what l&apos;ve
              seen so far, I&apos;m confident it will.
            </li>
          </ul>
        </div>
      ),
      column: 2,
    },
    {
      id: 4,
      username: "Mahadev Keshari",
      content: "This is really awesome 👍🏼",
      column: 3,
    },
    {
      id: 5,
      username: "Satya Narayan",
      content:
        "Yes I would totally recommend it for anyone who is serious about getting into open source. We have discussed very insightful key methods that are very helpful for a beginner who has no prior experience to start contributing. You as an experienced open source developer and contributor have shared your learnings which come from experience to us which not only makes us understand the complexity of large codebases but gives us a kickstart over other candidates. Your personal guidance is precious and invaluable for us",
      column: 3,
    },
  ];

  const groupedTestimonials = {
    1: testimonials.filter((t) => t.column === 1),
    2: testimonials.filter((t) => t.column === 2),
    3: testimonials.filter((t) => t.column === 3),
  };

  return (
    <div className=" text-white " id="testimonials">
      <Header title="What our Pro customers say about us" />
      <div className="border-b  border-border w-full min-h-[80dvh] grid grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-2 flex flex-col font-medium divide-y divide-border">
          {groupedTestimonials[1].map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 lg:p-10 flex flex-col gap-6"
            >
              <PremiumTestimonialCard username={testimonial.username} />
              <div className="text-pretty">
                {typeof testimonial.content === "string"
                  ? testimonial.content
                  : testimonial.content}
              </div>
            </div>
          ))}
        </div>

        <div className="h-full border-y lg:border-x lg:border-y-0 border-border p-6 lg:p-10 mx-auto flex flex-col gap-6 flex-shrink-0 lg:col-span-3 font-medium">
          {groupedTestimonials[2].map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col gap-6">
              <PremiumTestimonialCard username={testimonial.username} />
              <div>
                {typeof testimonial.content === "string"
                  ? testimonial.content
                  : testimonial.content}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 flex flex-col font-medium divide-y divide-border">
          {groupedTestimonials[3].map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 lg:p-10 flex flex-col gap-6"
            >
              <PremiumTestimonialCard username={testimonial.username} />
              <div className="text-pretty">
                {typeof testimonial.content === "string"
                  ? testimonial.content
                  : testimonial.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

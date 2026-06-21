"use client";
import Header from "@/components/ui/header";
import { Check, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShineBorder } from "@/components/ui/shine-borders";
import PrimaryButton from "@/components/ui/custom-button";
import dynamic from "next/dynamic";
import { trpc } from "@/lib/trpc";
import { formatApproxPlanPrice } from "@/lib/format-plan-price";

const Footer = dynamic(
  () =>
    import("@/components/landing-sections/footer").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

// lazy load PaymentFlow - it's inside pricing card but can wait
const PaymentFlow = dynamic(
  () => import("@/components/payment/PaymentFlow").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

type TierKey = "free" | "pro1" | "pro4";

// each card only lists what it ADDS on top of the previous tier, so the lists
// stay short and readable ("Everything in Free +", "Everything in Pro +")
const freeFeatures = [
  "Project search (legacy)",
  "Access to the general community",
  "30 days OSS sheet",
];

const proFeatures = [
  "Onboarding call",
  "Guidance on anything open source: jobs/internships at commercial OSS companies, GSoC, LFX, etc.",
  "A highly active, small-token, limited community",
  "Weekly live sessions",
  "Unlimited QnAs",
  "Weekly contests on open source, build in public & first principles",
  "Pro modules on open source, build in public & first principles",
  "Hand-picked open source projects",
  "Recordings of all the previous weekly sessions",
  "Private thread to ask something personal",
  "Updates on open source, jobs, tech, etc.",
  "Daily stand-ups",
  "Pro refs: the best resources on the internet",
];

const pro4Features = [
  "First principles mega-module (50+ modules) (upcoming..)",
  "Build in public mega-module (50+ modules) (upcoming..)",
];

interface PlanTier {
  key: TierKey;
  name: string;
  price: string;
  period: string;
  planId?: string;
  paymentDescription?: string;
  badge?: string;
  highlight?: boolean;
  inheritsLabel?: string;
  features: string[];
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
      features: freeFeatures,
    },
    {
      key: "pro1",
      name: "Pro",
      price: "$49",
      period: "/ year",
      planId: yearlyPlanId,
      paymentDescription: "Annual Subscription",
      inheritsLabel: "Everything in Free, plus:",
      features: proFeatures,
    },
    {
      key: "pro4",
      name: "Pro",
      price: "$99",
      period: "/ 4 years",
      planId: fourYearPlanId,
      paymentDescription: "4 Year Subscription",
      badge: "BEST VALUE",
      highlight: true,
      inheritsLabel: "Everything in Pro, plus:",
      features: pro4Features,
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
        <section className="relative flex w-full items-center overflow-hidden border-b border-border lg:min-h-[calc(100svh-73px)]">
          {/* same violet texture that sits at the bottom of the pricing cards,
              faded out toward the top so it blends in instead of reading as a blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 lg:h-2/5"
            style={{
              maskImage:
                "linear-gradient(to top, black 0%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 0%, transparent 85%)",
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
          {/* mirrored texture fading in from the top */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 lg:h-2/5"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 85%)",
            }}
          >
            <Image
              src="/assets/card_bg.svg"
              alt=""
              fill
              loading="lazy"
              className="h-full w-full -scale-y-100 object-cover object-bottom opacity-50"
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
                a small and effective ecosystem for limited people.
              </p>
              <p className="text-lg font-medium tracking-tight sm:text-xl">
                learning{" "}
                <span className="text-[#a472ea]">Open Source.</span>{" "}
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

        {/* SECTION 2 - pricing cards */}
        <section
          id="pro-price-card"
          className="relative w-full overflow-hidden border-b border-border"
        >
          {/* contained soft glow sitting behind the cards (does not bleed up into the hero) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[480px] w-[1100px] max-w-[150%] -translate-x-1/2 rounded-[50%] bg-[#7150E7]/20 blur-[140px]"
          />
          <div className="mx-auto w-full max-w-6xl px-4 py-14 lg:px-8 lg:py-20">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Choose your plan
              </h2>
              <p className="max-w-xl text-text-secondary">
                Start free, or go Pro to join the ecosystem.
              </p>
            </div>
            {/* DOM order is Free -> Pro -> Pro 4yr so mobile (single column)
                reads cheapest-first. On lg the two shorter plans sit stacked in
                the left column while the feature-rich Pro card spans both rows
                on the right, so the columns balance in height. */}
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:grid-rows-2">
              <PlanCard
                tier={tiers[0]}
                callbackUrl={callbackUrl}
                className="lg:col-start-1 lg:row-start-1"
              />
              <PlanCard
                tier={tiers[1]}
                callbackUrl={callbackUrl}
                className="lg:col-start-2 lg:row-span-2"
              />
              <PlanCard
                tier={tiers[2]}
                callbackUrl={callbackUrl}
                className="lg:col-start-1 lg:row-start-2"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3 - testimonials */}
        <TestimonialsSection />
        <div className="w-full border-b border-border text-center py-8 px-4">
          <p className="text-lg mb-4 text-text-secondary">
            <Link
              href="/testimonials"
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

const PlanCard = ({
  tier,
  callbackUrl,
  className,
}: {
  tier: PlanTier;
  callbackUrl: string;
  className?: string;
}) => {
  const planIdOk =
    typeof tier.planId === "string" && tier.planId.length > 0;
  const isPaid = tier.key !== "free";

  // approx INR comes from the plan record's actual price (the amount charged
  // via Razorpay), fetched from the backend.
  const { data: publicPlan } = trpc.payment.getPublicPlan.useQuery(
    { planId: tier.planId ?? "" },
    { enabled: planIdOk }
  );

  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-3xl ${
        tier.highlight
          ? "shadow-[0_0_70px_-20px_rgba(113,80,231,0.55)]"
          : ""
      } ${className ?? ""}`}
    >
      <Image
        src="/assets/card_bg.svg"
        alt=""
        fill
        loading="lazy"
        className="absolute -z-10 h-full w-full object-cover object-bottom"
      />
      <ShineBorder shineColor={["#7150E7", "#C89BFF", "#432BA0"]} />

      <div className="flex flex-col gap-5 p-6 lg:p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="relative h-12 w-12">
            <Image
              src="/assets/logo_var2.svg"
              alt="Opensox"
              fill
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          {tier.badge ? (
            <span className="rounded-full bg-gradient-to-b from-[#7150E7] to-[#432ba0] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {tier.badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {tier.name}
          </h2>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-tight">
              {tier.price}
            </span>
            <span className="pb-1 text-base text-text-tertiary">
              {tier.period}
            </span>
          </div>
          {isPaid && publicPlan ? (
            <p className="text-sm text-text-tertiary">
              {formatApproxPlanPrice(publicPlan.price, publicPlan.currency)}
            </p>
          ) : (
            <p className="text-sm text-transparent select-none">.</p>
          )}
        </div>

        {isPaid ? (
          <PaymentFlow
            planId={planIdOk ? (tier.planId as string) : ""}
            planName="Opensox Pro"
            description={tier.paymentDescription}
            buttonText={planIdOk ? "Upgrade Now" : "Unavailable"}
            buttonClassName={`w-full font-semibold ${
              planIdOk ? "" : "opacity-60 cursor-not-allowed"
            }`}
            callbackUrl={callbackUrl}
            buttonLocation="pricing_page"
          />
        ) : (
          <Link href="/dashboard/home" className="cursor-pointer">
            <PrimaryButton classname="w-full">
              <Terminal />
              Get Started
            </PrimaryButton>
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-dashed border-border-primary p-6 lg:p-7">
        {tier.inheritsLabel ? (
          <p className="mb-1 text-sm font-semibold text-brand-purple-light">
            {tier.inheritsLabel}
          </p>
        ) : null}
        {tier.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 text-sm font-medium"
          >
            <Check
              className="mt-0.5 w-4 flex-shrink-0 text-success-text"
              strokeWidth={3}
            />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="bg-white mix-blend-plus-lighter absolute h-[120px] w-full blur-[60px] right-0 -bottom-20 opacity-80"></div>
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
            Okay so there are a few things I genuinely value about OpenSox Pro,
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
              Overall, I&apos;d absolutely recommend OpenSox Pro to anyone
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

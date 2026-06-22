"use client";
import Header from "@/components/ui/header";
import { Check, CornerDownRight, Target, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShineBorder } from "@/components/ui/shine-borders";
import PrimaryButton from "@/components/ui/custom-button";
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
const opensoxFeatures = [
  {
    id: 1,
    title: "Opensox Advanced search tool",
    description:
      "One and only tool in the market that let you find open source with blizzing speed and scary accuracy. It will have:",
    features: [
      "Faster and accurate search of projects",
      "Higher accuracy (so that you exactly land on your dream open source project)",
      "Advanced filters like, GSOC, YC, funding, hire contributors, trending, niche (like AI, Core ML, Web3, MERN), bounties, and many more.",
    ],
  },
  {
    id: 2,
    title: "30 days Opensox challenge sheet",
    description: [
      "A comprehensive sheet of 30+ modules along with detailed videos to give you a clear path to start rocking in open source.",
      "It will contain videos, resouces and hand made docs.",
      <>
        In each of the 30 steps, you will learn, then apply, If stuck,
        we&apos;ll help and then we&apos;ll do an accountability check.{" "}
        <Link
          href="https://www.youtube.com/playlist?list=PLiWTvT-J4wHhDh-Mngogynfusor-694G-"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-[#a472ea]"
        >
          Check here.
        </Link>
      </>,
    ],
    features: [],
  },
];

type WhySubItem = { kind: "text"; content: string } | { kind: "pro_slots" };

const whySub: WhySubItem[] = [
  {
    kind: "text",
    content:
      "Currently, Opensox 2.0 is in progress (70% done) so till the launch, we are offering Pro plan at a discounted price - $49 for the whole year",
  },
  { kind: "pro_slots" },
  {
    kind: "text",
    content:
      "After the launch, this $49 offer be removed and Opensox Pro will be around ~ $89 for whole year.",
  },
  {
    kind: "text",
    content: "The price of the dollar is constantly increasing.",
  },
];

const freePlanCard = {
  whatYouGetImmediately: [
    "Free filters to search projects (tech stack, competition, activity, etc)",
    "Access to the general community",
  ],
  whatYouGetAfterLaunch: [
    "Everything mentioned above",
    "30 days opensox challenge sheet",
  ],
};

const premiumPlanCard = {
  whatYouGetImmediately: [
    "Everything in free plan +",
    "1:1 session on finding remote jobs and internships in open-source companies.",
    "Quick doubts resolution.",
    "Personalized guidance for GSoC, LFX, Outreachy, etc",
    "Access to Pro Discord where you can ask anything anytime.",
    "Support to enhance skills for open source",
    "GSOC proposal, resume reviews, etc.",
    "Upcoming Pro features",
  ],
  whatYouGetAfterLaunch: [
    "Everything mentioned above",
    "Advanced tool with Pro filters to find open source projects",
    "30 days opensox challenge sheet",
    "Upcoming Pro features.",
  ],
};

const Pricing = () => {
  const pathname = usePathname();
  const callbackUrl = `${pathname}#pro-price-card`;
  const premiumPlanId = process.env.NEXT_PUBLIC_YEARLY_PREMIUM_PLAN_ID;
  const planIdOk =
    typeof premiumPlanId === "string" && premiumPlanId.length > 0;

  const { data: proMemberCountData } = trpc.payment.getProMemberCount.useQuery(
    { planId: premiumPlanId ?? "" },
    { enabled: planIdOk },
  );

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* critical css for LCP element - inline for fastest rendering */
          /* font-family matches Tailwind's font-mono class exactly to ensure consistent fallbacks */
          .lcp-feature-item { display: flex; flex-direction: column; gap: 1rem; width: 100%; flex: 1; }
          .lcp-feature-content { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; }
          .lcp-feature-header { display: flex; gap: 1rem; align-items: center; }
          .lcp-feature-number { font-size: 3.75rem; font-family: var(--font-dm-mono), Menlo, Monaco, "Courier New", monospace; font-weight: 600; background: linear-gradient(to bottom, #a472ea, #341e7b); -webkit-background-clip: text; background-clip: text; color: transparent; }
          .lcp-feature-title { font-size: 1.5rem; font-weight: 500; }
          .lcp-feature-description { font-weight: 500; }
        `,
        }}
      />
      <main className="w-full  overflow-hidden flex flex-col items-center justify-center relative">
        <Header title="We are working on Opensox 2.0" />
        <div className="flex flex-col bg-[#151515]/20 relative w-full ">
          <div className="h-full  pv relative">
            <div className=" py-8 border-b border-[#252525]">
              <h2 className="text-center text-3xl tracking-tight font-medium">
                What is Opensox 2.0?
              </h2>
            </div>
            <div className=" w-full h-full flex flex-col gap-6  border-b border-[#252525]">
              <ul className="flex flex-col lg:flex-row [&>li]:w-full  [&>li]:p-6 divide-y lg:divide-y-0 lg:divide-x divide-[#252525] h-full ">
                {opensoxFeatures.map((feature, index) => {
                  // render first item (LCP element) immediately without animation
                  const isLCPElement = index === 0;

                  if (isLCPElement) {
                    return (
                      <li key={index} className="lcp-feature-item">
                        <div className="lcp-feature-content">
                          <div className="lcp-feature-header">
                            <div className="lcp-feature-number">
                              {index + 1}
                            </div>
                            <div className="flex items-center gap-2">
                              <h3 className="lcp-feature-title">
                                {feature.title}
                              </h3>
                            </div>
                          </div>
                          {Array.isArray(feature.description) ? (
                            <div className="font-medium">
                              {feature.description.map(
                                (sentence, sentenceIndex) => (
                                  <p key={sentenceIndex} className="mb-2">
                                    {sentence}
                                  </p>
                                ),
                              )}
                            </div>
                          ) : (
                            <p className="lcp-feature-description">
                              {feature.description}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 w-full h-full">
                          <ul className="flex flex-col gap-3 w-full h-full pb-8">
                            {feature.features.map((feature, featureIndex) => {
                              return (
                                <li
                                  key={featureIndex}
                                  className="text-sm flex items-center gap-4"
                                >
                                  <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea]" />
                                  {feature}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <motion.li
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.2 + (index - 1) * 0.05,
                      }}
                      key={index}
                      className="flex flex-col gap-4 w-full flex-1"
                    >
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-4 items-center">
                          <div className="text-6xl font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#a472ea] to-[#341e7b]">
                            {index + 1}
                          </div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-medium">
                              {feature.title}
                            </h3>
                          </div>
                        </div>
                        {Array.isArray(feature.description) ? (
                          <div className="font-medium">
                            {feature.description.map(
                              (sentence, sentenceIndex) => (
                                <p key={sentenceIndex} className="mb-2">
                                  {sentence}
                                </p>
                              ),
                            )}
                          </div>
                        ) : (
                          <p className="font-medium">{feature.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full h-full">
                        <ul className="flex flex-col gap-3 w-full h-full pb-8">
                          {feature.features.map((feature, featureIndex) => {
                            return (
                              <li
                                key={featureIndex}
                                className="font- text-sm flex items-center gap-4"
                              >
                                <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea]" />
                                {feature}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="h-full  relative ">
            <div className="py-8 border-b border-[#252525]">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0.15,
                }}
                className="text-center text-3xl tracking-tight font-medium"
              >
                Why should you subscribe to Opensox Pro now?
              </motion.h2>
            </div>
            <div className="w-full border-b border-[#252525]">
              <div className="w-full max-w-2xl mx-auto border-b lg:border-b-0 lg:border-x border-[#252525] p-6 font-medium space-y-2 ">
                {whySub.map((sub, index) => {
                  return (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.2 + index * 0.05,
                      }}
                      key={index}
                      className="flex items-center gap-4"
                    >
                      <Target className="size-5 flex-shrink-0 text-[#a472ea]" />
                      {sub.kind === "pro_slots" ? (
                        planIdOk ? (
                          <span className="min-w-0">
                            This offer is only available for the first 200 (
                            {proMemberCountData !== undefined ? (
                              <span className="text-success-text">
                                {proMemberCountData.count} slots booked
                              </span>
                            ) : (
                              <span className="text-text-muted">…</span>
                            )}
                            ) users
                          </span>
                        ) : (
                          <span className="min-w-0">
                            This offer is only available for the first 200 users
                          </span>
                        )
                      ) : (
                        sub.content
                      )}
                    </motion.p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="relative border-b border-[#252525] lg:pb-10 isolate" style={{ contain: 'layout paint' }}>
            <div className="flex flex-col gap-5 lg:gap-10 py-4 bg-[#151515]/20 h-full relative w-full overflow-hidden  px-4 lg:px-10">
              <div className="absolute inset-0 -top-72">
                <Image
                  src="/assets/layer1.svg"
                  alt="background"
                  fill
                  loading="lazy"
                  className=" w-full h-full  -z-10 opacity-90"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6">
                <PricingCard />
                <SecondaryPricingCard callbackUrl={callbackUrl} />
              </div>
            </div>
          </div>
          <Features />
          <TestimonialsSection />
          <div className="border-b border-border text-center py-8 px-4">
            <p className="text-lg mb-4 text-text-secondary">
              <Link
                href="/testimonials"
                className="text-brand-purple-light hover:text-brand-purple transition-colors underline"
              >
                See what our Pro customers said about us.
              </Link>
            </p>
          </div>
          <div className=" border-b border-[#252525] text-center py-4 font-bold px-4">
            For any doubts or queries, feel free to ping us at{" "}
            <Link
              href="mailto:opensoxlabs@gmail.com"
              className="hover:underline bg-gradient-to-b from-[#a472ea] via-[#a472ea]/80 to-[#432ba0] bg-clip-text text-transparent"
            >
              opensoxlabs@gmail.com
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;

const PricingCard = () => {
  return (
    <div className="py-2">
      <div className=" border-border-primary w-full mx-auto flex h-full">
        <div className="border-dashed border-border-primary w-full lg:w-max mx-auto relative h-full">
          <div className="w-full h-full lg:w-[500px] relative overflow-hidden mx-auto py-10 pb-14 flex flex-col rounded-3xl">
            <Image
              src="/assets/card_bg.svg"
              alt="background"
              fill
              loading="lazy"
              className="object-cover object-bottom w-full h-full absolute -z-10"
            />
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 pb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/logo_var2.svg"
                  alt="background"
                  fill
                  loading="lazy"
                  className="object-cover size-full"
                />
              </div>
            </div>
            <ShineBorder shineColor={["#7150E7", "#C89BFF", "#432BA0"]} />

            <div className="w-full border-dashed border-border-primary px-6 lg:px-10  py-4">
              <h2 className="text-6xl lg:text-[90px] lg:leading-[82px] tracking-tight font-semibold">
                Free
              </h2>
            </div>
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 py-4 ">
              <div className="">
                <Link href="/dashboard/home" className="cursor-pointer z-30">
                  <PrimaryButton classname="w-full">
                    <Terminal />
                    Get Started
                  </PrimaryButton>
                </Link>
              </div>
            </div>
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 py-4 flex flex-col gap-4 flex-1">
              <h2 className="text-lg lg:text-xl tracking-tight text-left font-bold">
                What you get immediately:
              </h2>
              <div className="space-y-3 [&>p]:flex [&>p]:items-center [&>p]:gap-2 [&>p]:font-medium">
                {freePlanCard.whatYouGetImmediately.map((item, index) => {
                  return (
                    <p key={index}>
                      <Check className="w-5 flex-shrink-0" strokeWidth={4} />{" "}
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 py-4 flex flex-col gap-4 h-[244px]">
              <h2 className="text-lg lg:text-xl tracking-tight text-left font-bold">
                What you get after the launch:
              </h2>
              <div className="space-y-3 [&>p]:flex [&>p]:items-center [&>p]:gap-2 [&>p]:font-medium">
                {freePlanCard.whatYouGetAfterLaunch.map((item, index) => {
                  return (
                    <p key={index}>
                      <Check className="w-5 flex-shrink-0" strokeWidth={4} />{" "}
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div 
              className="absolute h-[250px] w-[150%] left-1/2 -translate-x-1/2 -bottom-24 opacity-60 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecondaryPricingCard = ({ callbackUrl }: { callbackUrl: string }) => {
  const premiumPlanId = process.env.NEXT_PUBLIC_YEARLY_PREMIUM_PLAN_ID;
  const planIdOk =
    typeof premiumPlanId === "string" && premiumPlanId.length > 0;

  const { data: publicPlan } = trpc.payment.getPublicPlan.useQuery(
    { planId: premiumPlanId ?? "" },
    { enabled: planIdOk },
  );

  const { data: proMemberCountData } = trpc.payment.getProMemberCount.useQuery(
    { planId: premiumPlanId ?? "" },
    { enabled: planIdOk },
  );

  return (
    <div className="py-2">
      <div className=" border-border-primary w-full mx-auto flex h-full">
        <div className="border-dashed border-border-primary w-full lg:w-max mx-auto relative h-full">
          <div className=" w-full lg:w-[500px] relative overflow-hidden mx-auto py-10 pb-14 flex flex-col h-full rounded-3xl">
            <Image
              src="/assets/card_bg.svg"
              alt="background"
              fill
              loading="lazy"
              className="object-cover object-bottom w-full h-full absolute -z-10"
            />
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 pb-4 flex items-start justify-between gap-3">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/assets/logo_var2.svg"
                  alt="background"
                  fill
                  loading="lazy"
                  className="object-cover size-full"
                />
              </div>
              {planIdOk ? (
                <div
                  className="flex items-center justify-end gap-2 min-w-0 pt-0.5 text-right"
                  role="status"
                  aria-live="polite"
                  aria-label={
                    proMemberCountData !== undefined
                      ? `${proMemberCountData.count} shareholders invested`
                      : "loading shareholder count"
                  }
                >
                  {proMemberCountData !== undefined ? (
                    <>
                      <span
                        className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center"
                        aria-hidden
                      >
                        <span className="absolute size-[18px] rounded-full border border-success-text/50" />
                        <span className="absolute size-[12px] rounded-full border border-success-text/65" />
                        <span className="relative z-10 size-2 rounded-full bg-success-text animate-pulse" />
                      </span>
                      <p className="text-xs sm:text-sm text-success-text font-medium leading-snug">
                        <span className="tabular-nums">
                          {proMemberCountData.count}
                        </span>{" "}
                        shareholders invested
                      </p>
                    </>
                  ) : (
                    <span className="text-xs text-text-muted">…</span>
                  )}
                </div>
              ) : null}
            </div>
            <ShineBorder shineColor={["#7150E7", "#C89BFF", "#432BA0"]} />

            <div
              id="pro-price-card"
              className="w-full border-dashed border-border-primary px-6 lg:px-10  py-4"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <h2 className="text-6xl lg:text-[90px] lg:leading-[82px] tracking-tight font-semibold">
                  $49{" "}
                  <span className="text-3xl lg:text-4xl text-white-400 line-through decoration-2">
                    $89
                  </span>{" "}
                  <span className="text-4xl">/ year</span>
                </h2>
              </div>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                {publicPlan ? (
                  <p className="text-lg text-white-400">
                    {formatApproxPlanPrice(
                      publicPlan.price,
                      publicPlan.currency,
                    )}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 py-4 ">
              <PaymentFlow
                planId={planIdOk ? premiumPlanId : ""}
                planName="Opensox Pro"
                description="Annual Subscription"
                buttonText={planIdOk ? "Invest" : "Unavailable"}
                buttonClassName={`w-full max-w-[500px] mx-auto font-semibold ${
                  planIdOk ? "" : "opacity-60 cursor-not-allowed"
                }`}
                callbackUrl={callbackUrl}
                buttonLocation="pricing_page"
              />
              <div className="flex flex-col items-center gap-2 mt-3">
                <Link
                  href="/pitch"
                  className="text-sm text-text-tertiary hover:text-brand-purple-light transition-colors lowercase"
                >
                  still not sure? read my pitch to you.
                </Link>
              </div>
            </div>
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 py-4 flex flex-col gap-4 flex-1">
              <h2 className="text-lg lg:text-xl tracking-tight text-left font-bold">
                What you get immediately:
              </h2>
              <div className="space-y-3 [&>p]:flex [&>p]:items-center [&>p]:gap-2 [&>p]:font-medium">
                {premiumPlanCard.whatYouGetImmediately.map((item, index) => {
                  return (
                    <p key={index}>
                      <Check className="w-5 flex-shrink-0" strokeWidth={4} />{" "}
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 py-4 flex flex-col gap-4">
              <h2 className="text-lg lg:text-xl tracking-tight text-left font-bold">
                What you get after the launch:
              </h2>
              <div className="space-y-3 [&>p]:flex [&>p]:items-center [&>p]:gap-2 [&>p]:font-medium">
                {premiumPlanCard.whatYouGetAfterLaunch.map((item, index) => {
                  return (
                    <p key={index} className="flex items-center gap-2">
                      <Check className="w-5 flex-shrink-0" strokeWidth={4} />{" "}
                      <span>{item}</span>
                    </p>
                  );
                })}
              </div>
            </div>
            <div 
              className="absolute h-[250px] w-[150%] left-1/2 -translate-x-1/2 -bottom-24 opacity-60 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)' }}
            ></div>
          </div>
        </div>
      </div>
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
      <div className="border-b  border-[#252525] w-full min-h-[80dvh] grid grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-2 flex flex-col font-medium divide-y divide-[#252525]">
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

        <div className="h-full border-y lg:border-x lg:border-y-0 border-[#252525] p-6 lg:p-10 mx-auto flex flex-col gap-6 flex-shrink-0 lg:col-span-3 font-medium">
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

        <div className="lg:col-span-2 flex flex-col font-medium divide-y divide-[#252525]">
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

"use client";
import Footer from "@/components/landing-sections/footer";
import Header from "@/components/ui/header";
import { ShineBorder } from "@/components/ui/shine-borders";
import { motion } from "framer-motion";
import { Check, CornerDownRight, Target, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PrimaryButton from "@/components/ui/custom-button";
import PaymentFlow from "@/components/payment/PaymentFlow";
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
    title: "OX Newsletter",
    description:
      "A newsletter that keeps you ahead in open source world. It will cover:",
    features: [
      "Jobs/internships in opensource projects/companies",
      "Funding news",
      "What's trending in open source ecosystem",
      "Upcoming trends",
      "Tips to ace in open source",
      "What's happening in open source companies?",
    ],
  },
  {
    id: 3,
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

const whySub = [
  {
    content:
      "Currently, Opensox 2.0 is in progress (70% done) so till the launch, we are offering Pro plan at a discounted price - $49 for the whole year",
  },
  {
    content:
      "This offer is only available for the first 1000 (20 slots booked) users",
  },
  {
    content:
      "After the launch, this $49 offer be removed and Opensox Pro will be around ~ $120 for whole year ($10/mo.)",
  },
  {
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
    "Access to Pro Slack where you can ask anything anytime.",
    "Support to enhance skills for open source",
    "GSOC proposal, resume reviews, etc.",
    "Upcoming Pro features",
  ],
  whatYouGetAfterLaunch: [
    "Everything mentioned above",
    "Advanced tool with Pro filters to find open source projects",
    "Pro newsletter",
    "30 days opensox challenge sheet",
    "Upcoming Pro features.",
  ],
};

const Pricing = () => {
  return (
    <>
      <main className="w-full  overflow-hidden flex flex-col items-center justify-center relative">
        <Header title="We are working on Opensox 2.0" />
        <div className="flex flex-col bg-[#151515]/20 backdrop-blur-xl relative w-full ">
          <div className="h-full  pv relative">
            <div className=" py-8 border-b border-[#252525]">
              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.4,
                }}
                className="text-center text-3xl tracking-tight font-medium"
              >
                What is Opensox 2.0?
              </motion.h2>
            </div>
            <div className=" w-full h-full flex flex-col gap-6  border-b border-[#252525]">
              <ul className="flex flex-col lg:flex-row [&>li]:w-full  [&>li]:p-6 divide-y lg:divide-y-0 lg:divide-x divide-[#252525] h-full ">
                {opensoxFeatures.map((feature, index) => {
                  return (
                    <motion.li
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        type: "spring",
                        delay: 0.5 + index * 0.1,
                      }}
                      key={index}
                      className="flex flex-col gap-4 w-full flex-1 "
                    >
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-4">
                          <div className="text-6xl font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#a472ea] to-[#341e7b]">
                            {index + 1}
                          </div>
                          <h3 className="text-2xl font-medium">
                            {feature.title}
                          </h3>
                        </div>
                        {Array.isArray(feature.description) ? (
                          <div className="font-medium">
                            {feature.description.map(
                              (sentence, sentenceIndex) => (
                                <p key={sentenceIndex} className="mb-2">
                                  {sentence}
                                </p>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="font-medium">{feature.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full h-full">
                        <ul className="flex flex-col gap-3 w-full h-full pb-8">
                          {feature.features.map((feature, index) => {
                            return (
                              <li
                                key={index}
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
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.8,
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
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        type: "spring",
                        delay: 0.9 + index * 0.1,
                      }}
                      key={index}
                      className="flex items-center gap-4"
                    >
                      <Target className="size-5 flex-shrink-0 text-[#a472ea]" />
                      {sub.content}
                    </motion.p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="relative border-b border-[#252525] lg:pb-10">
            <div className="flex flex-col gap-5 lg:gap-10 py-4 bg-[#151515]/20 backdrop-blur-xl h-full relative w-full overflow-hidden  px-4 lg:px-10">
              <div className="absolute inset-0 -top-72">
                <Image
                  src="/assets/layer1.svg"
                  alt="background"
                  fill
                  className=" w-full h-full  -z-10 opacity-90"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6">
                <PricingCard />
                <SecondaryPricingCard />
              </div>
            </div>
          </div>
          <TestimonialsSection />
          <div className=" border-b border-[#252525] text-center py-4 font-bold px-4">
            For any doubts or queries, feel free to ping us at{" "}
            <Link
              href="mailto:hi@opensox.ai"
              className="hover:underline bg-gradient-to-b from-[#a472ea] via-[#a472ea]/80 to-[#432ba0] bg-clip-text text-transparent"
            >
              hi@opensox.ai
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
            <ShineBorder shineColor={["#7150E7", "#C89BFF", "#432BA0"]} />
            <Image
              src="/assets/card_bg.svg"
              alt="background"
              fill
              className="object-cover object-bottom w-full h-full absolute -z-10"
            />
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 pb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/logo_var2.svg"
                  alt="background"
                  fill
                  className="object-cover size-full"
                />
              </div>
            </div>

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
            <div className="bg-white mix-blend-plus-lighter absolute h-[100px] w-full blur-[50px] right-0 -bottom-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecondaryPricingCard = () => {
  const premiumPlanId = process.env.NEXT_PUBLIC_YEARLY_PREMIUM_PLAN_ID;
  const planIdOk =
    typeof premiumPlanId === "string" && premiumPlanId.length > 0;

  return (
    <div className="py-2">
      <div className=" border-border-primary w-full mx-auto flex h-full">
        <div className="border-dashed border-border-primary w-full lg:w-max mx-auto relative h-full">
          <div className=" w-full lg:w-[500px] relative overflow-hidden mx-auto py-10 pb-14 flex flex-col h-full rounded-3xl">
            <ShineBorder shineColor={["#7150E7", "#C89BFF", "#432BA0"]} />
            <Image
              src="/assets/card_bg.svg"
              alt="background"
              fill
              className="object-cover object-bottom w-full h-full absolute -z-10"
            />
            <div className="w-full border-dashed border-border-primary px-6 lg:px-10 pb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/logo_var2.svg"
                  alt="background"
                  fill
                  className="object-cover size-full"
                />
              </div>
            </div>

            <div className="w-full border-dashed border-border-primary px-6 lg:px-10  py-4">
              <h2 className="text-6xl lg:text-[90px] lg:leading-[82px] tracking-tight font-semibold">
                $49 <span className="text-4xl">/ year</span>
              </h2>
              <p className="text-lg text-white-400 mt-2">(~ ₹4,351 INR)</p>
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
              />
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
                    <p key={index}>
                      <Check className="w-5 flex-shrink-0" strokeWidth={4} />{" "}
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="bg-white mix-blend-plus-lighter absolute h-[100px] w-full blur-[50px] right-0 -bottom-20"></div>
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
    <div className=" text-white ">
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

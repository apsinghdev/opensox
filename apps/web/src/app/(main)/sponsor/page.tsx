"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Footer from "@/components/landing-sections/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PrimaryButton from "@/components/ui/custom-button";
import Image from "next/image";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import { useRazorpay } from "@/hooks/useRazorpay";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@api/routers/_app";

type RouterOutputs = inferRouterOutputs<AppRouter>;

// Extract planId from environment variable with runtime validation
const SPONSOR_PLAN_ID = process.env.NEXT_PUBLIC_SPONSOR_PLAN_ID || "";

const SponsorPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifyPaymentMutation = trpc.sponsor.verifyPayment.useMutation({
    onSuccess: (data) => {
      // redirect to submission page with payment id after verification
      router.push(`/sponsor/submit?paymentId=${data.paymentId}`);
    },
    onError: (error) => {
      console.error("payment verification failed:", error);
      alert("payment verification failed: " + error.message);
      setLoading(false);
    },
  });

  const { initiatePayment, isLoading: isPaymentLoading } = useRazorpay({
    onSuccess: (response) => {
      // verify payment on backend
      verifyPaymentMutation.mutate({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_subscription_id: response.razorpay_subscription_id,
        razorpay_signature: response.razorpay_signature,
      });
    },
    onFailure: (error) => {
      console.error("payment failed:", error);
      alert("payment failed: " + error.message);
      setLoading(false);
    },
    onDismiss: () => {
      setLoading(false);
    },
  });

  const createSubscriptionMutation =
    trpc.sponsor.createSubscription.useMutation({
      onSuccess: async (
        data: RouterOutputs["sponsor"]["createSubscription"]
      ) => {
        const options = {
          key: data.key,
          name: "OpenSox",
          description: "Monthly Sponsorship - $500",
          subscription_id: data.subscriptionId,
          theme: {
            color: "#4dd0a4",
          },
          options: {
            checkout: {
              method: {
                netbanking: 1, // enable netbanking
                card: 1, // enable card payments
                upi: 1, // enable upi payments
                wallet: 1, // enable wallet payments
              },
            },
          },
        };

        await initiatePayment(options);
      },
      onError: (error) => {
        console.error("subscription creation failed:", error);
        alert("failed to initiate payment. please try again.");
        setLoading(false);
      },
    });

  const handleBecomeSponsor = () => {
    // Validate planId is configured before proceeding
    if (!SPONSOR_PLAN_ID) {
      console.error(
        "❌ CONFIGURATION ERROR: NEXT_PUBLIC_SPONSOR_PLAN_ID is not set in environment variables"
      );
      alert("Sponsor plan is not configured. Please contact support.");
      return;
    }

    setLoading(true);
    // create payment order for $500 monthly sponsorship using env-backed planId
    createSubscriptionMutation.mutate({ planId: SPONSOR_PLAN_ID });
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden isolate">
        <div className="absolute top-0 left-0 w-full h-[50dvh] lg:h-[69dvh] -z-10 overflow-hidden">
          <Image
            src="/assets/bgmain.svg"
            alt="background"
            fill
            className="object-cover max-md:object-top opacity-90"
            priority
          />
          <div className="absolute h-[50%] w-full bg-gradient-to-t from-black via-transparent to-transparent bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Sponsor OpenSox
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              Reach thousands of developers building the next generation of web
              applications. Get your brand in front of our growing community of
              creators and innovators.
            </p>
          </div>

          {/* Stats Section */}
          <div className="w-full grid grid-cols-2 gap-8 md:gap-24 mb-20 md:mb-32 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                10K+
              </div>
              <div className="text-sm md:text-base text-neutral-500 font-medium uppercase tracking-wider">
                Monthly unique visitors
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                50K+
              </div>
              <div className="text-sm md:text-base text-neutral-500 font-medium uppercase tracking-wider">
                Monthly page views
              </div>
            </div>
          </div>

          {/* Sponsor Slots Section */}
          <div className="w-full max-w-6xl mx-auto mb-24 md:mb-40 bg-[#0A0A0A] rounded-[24px] md:rounded-[32px] p-6 md:p-12 border border-neutral-900">
            <p className="text-neutral-400 mb-8 text-lg font-medium">
              Sponsors will be listed below the hero section on homepage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[16/10] w-full rounded-2xl border border-dashed border-neutral-800/60 bg-neutral-900/20 flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-20 h-12 rounded bg-neutral-800/50" />
                  <span className="text-neutral-600 text-sm font-medium">
                    Your logo here
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Sponsor Section */}
          <div className="w-full max-w-6xl mx-auto mb-24 md:mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Why sponsor OpenSox?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Reach Top Talent",
                  description:
                    "Connect with skilled developers, open source contributors, and tech enthusiasts who are actively building and learning.",
                },
                {
                  title: "Brand Visibility",
                  description:
                    "Increase your brand's visibility within the tech community. Your logo will be prominently displayed to thousands of visitors.",
                },
                {
                  title: "Support Open Source",
                  description:
                    "Show your commitment to the open source ecosystem by supporting the tools and resources that developers rely on.",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-3xl bg-black border border-neutral-800 p-8 h-[300px] group"
                >
                  {/* Grid Pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(#555 1px, transparent 1px), linear-gradient(90deg, #555 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                      maskImage:
                        "linear-gradient(to bottom right, black 40%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom right, black 40%, transparent 100%)",
                    }}
                  />

                  {/* Random highlighted squares decoration */}
                  <div className="absolute top-0 right-0 p-10 opacity-20">
                    <div className="w-8 h-8 bg-neutral-600 absolute top-8 right-20" />
                    <div className="w-8 h-8 bg-neutral-700 absolute top-24 right-8" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {card.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="w-full max-w-3xl mx-auto mb-24 md:mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem
                value="item-1"
                className="border border-neutral-800 rounded-xl px-4 md:px-6 bg-neutral-900/30"
              >
                <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline hover:text-green-400 transition-colors py-4 md:py-6">
                  How long does the sponsorship last?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-sm md:text-base pb-4 md:pb-6">
                  Sponsorships are billed monthly. You can cancel your
                  subscription at any time, and your logo will remain on the
                  site until the end of your billing period.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="border border-neutral-800 rounded-xl px-4 md:px-6 bg-neutral-900/30"
              >
                <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline hover:text-green-400 transition-colors py-4 md:py-6">
                  What logo formats do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-sm md:text-base pb-4 md:pb-6">
                  We accept SVG, PNG, and JPG formats. SVG is preferred for the
                  best quality on all screen sizes. If providing a PNG or JPG,
                  please ensure it is high resolution (at least 500px wide).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="border border-neutral-800 rounded-xl px-4 md:px-6 bg-neutral-900/30"
              >
                <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline hover:text-green-400 transition-colors py-4 md:py-6">
                  When will my sponsorship go live?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-sm md:text-base pb-4 md:pb-6">
                  Your sponsorship will be live immediately after payment
                  automatically.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-4"
                className="border border-neutral-800 rounded-xl px-4 md:px-6 bg-neutral-900/30"
              >
                <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline hover:text-green-400 transition-colors py-4 md:py-6">
                  Can I update my link or logo?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-sm md:text-base pb-4 md:pb-6">
                  Yes, absolutely. If you rebrand or want to change the
                  destination URL, just reach out to our support team, and we
                  will update it for you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* CTA Section */}
          <div className="w-full max-w-5xl mx-auto py-12 md:py-20 px-0 md:px-0">
            <div className="relative">
              {/* Dotted Lines Effect */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Horizontal Lines */}
                <div
                  className="absolute top-0 left-[-10%] right-[-10%] h-px border-t border-dashed border-neutral-700"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-[-10%] right-[-10%] h-px border-t border-dashed border-neutral-700"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  }}
                />
                {/* Vertical Lines */}
                <div
                  className="absolute left-0 top-[-20%] bottom-[-20%] w-px border-l border-dashed border-neutral-700"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                  }}
                />
                <div
                  className="absolute right-0 top-[-20%] bottom-[-20%] w-px border-l border-dashed border-neutral-700"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                  }}
                />
              </div>

              <div className="relative bg-[#0A0A0A] p-6 md:p-16 text-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 to-transparent pointer-events-none" />

                <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                      Ready to reach{" "}
                      <span className="text-white">
                        thousands of developers?
                      </span>
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 font-medium max-w-2xl mx-auto leading-tight">
                      Get your <span className="text-green-500">brand</span> in
                      front of our growing{" "}
                      <span className="text-green-500">community</span>.
                    </p>
                  </div>

                  <div className="pt-2 w-full flex justify-center">
                    <PrimaryButton
                      onClick={handleBecomeSponsor}
                      disabled={
                        loading ||
                        createSubscriptionMutation.isPending ||
                        isPaymentLoading
                      }
                      classname="rounded-xl w-full sm:w-auto text-sm sm:text-base py-4 px-8 bg-[#4dd0a4] bg-none border-none shadow-none text-black flex items-center justify-center"
                    >
                      {loading ||
                      createSubscriptionMutation.isPending ||
                      isPaymentLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : null}
                      Become a Sponsor — $500/mo
                      {!loading && !createSubscriptionMutation.isPending && (
                        <ArrowRight className="w-4 h-4 ml-2" />
                      )}
                    </PrimaryButton>
                  </div>

                  <p className="text-neutral-500 text-xs md:text-sm mt-6">
                    Your sponsorship will be live immediately after payment
                    automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SponsorPage;

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { SponsorForm } from "@/components/sponsor/SponsorForm";

const SponsorSubmitPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId");
  const [mounted, setMounted] = useState(false);

  const paymentStatus = trpc.sponsor.checkPaymentStatus.useQuery(
    { paymentId: paymentId! },
    { enabled: !!paymentId, retry: false }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!paymentId) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 px-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Missing Payment Information</h1>
        <p className="text-neutral-400 mb-8">
          Please complete the payment process first.
        </p>
        <button
          onClick={() => router.push("/sponsor")}
          className="
            bg-primary text-primary-foreground
            font-bold py-2 px-6 rounded-lg
            hover:bg-primary/90
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
            transition-colors
          "
        >
          Go to Sponsor Page
        </button>
      </div>
    );
  }

  if (paymentStatus.isLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Verifying Payment...</h1>
      </div>
    );
  }

  if (paymentStatus.isError || !paymentStatus.data?.valid) {
    const reason = paymentStatus.data?.reason || "unknown";
    return (
      <div className="min-h-screen bg-black text-white pt-32 px-4 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-2xl font-bold mb-4">
            Payment Verification Issue
          </h1>
          <p className="text-neutral-400 mb-8">
            {reason === "payment_not_found" &&
              "We could not find this payment in our system."}
            {reason === "payment_not_captured" &&
              "The payment has not been captured yet. Please wait a moment and refresh."}
            {reason === "sponsor_not_found" &&
              "Payment verification is still processing. Please wait a moment."}
            {reason === "unknown" &&
              "We encountered an issue verifying your payment."}
          </p>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-left space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">
              Get in touch with our team
            </h2>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <a
                    href="mailto:hi@opensox.ai"
                    className="text-white hover:text-green-400 transition-colors"
                  >
                    hi@opensox.ai
                  </a>
                  <p className="text-xs text-neutral-600 mt-1">
                    For general inquiries, support, and feedback
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-neutral-500">Phone</p>
                  <a
                    href="tel:+918447500346"
                    className="text-white hover:text-green-400 transition-colors"
                  >
                    +91 844-7500-346
                  </a>
                  <p className="text-xs text-neutral-600 mt-1">
                    Available during business hours (IST)
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-500 mt-6 pt-4 border-t border-neutral-800">
              Payment ID:{" "}
              <code className="text-xs bg-neutral-800 px-2 py-1 rounded">
                {paymentId}
              </code>
            </p>
          </div>

          <button
            onClick={() => router.push("/sponsor")}
            className="bg-primary text-primary-foreground font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Return to Sponsor Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Thank you for your sponsorship!
        </h1>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Please complete the form below with your company details. Your
          sponsorship will go live immediately after submission.
        </p>
      </div>
      <SponsorForm razorpayPaymentId={paymentId} />
    </div>
  );
};

export default SponsorSubmitPage;

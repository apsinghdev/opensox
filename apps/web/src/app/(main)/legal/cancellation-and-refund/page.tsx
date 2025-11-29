/* eslint-disable react/no-unescaped-entities */
import React from "react";
import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalPageHeader,
  LegalSection,
  LegalCard,
  ContactInfo,
  LegalFooter,
  LegalContent,
} from "@/components/legal";

const EFFECTIVE_DATE = "January 8, 2024";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy - Opensox AI",
  description:
    "Learn about Opensox AI's cancellation and refund policy. Currently, we do not support refunds. Contact us with questions before purchasing.",
};

export default function CancellationAndRefundPage() {
  return (
    <LegalPageLayout>
      <LegalPageHeader
        title="Cancellation and Refund Policy"
        effectiveDate={EFFECTIVE_DATE}
      />

      <LegalContent>
        {/* Introduction */}
        <LegalCard>
          <p className="text-lg">
            At Opensox AI, we are committed to providing valuable services to
            our users. However, due to the nature of our digital products and
            services, we maintain the following refund policy:
          </p>
        </LegalCard>

        {/* Refund Policy */}
        <LegalSection title="Refund Policy">
          <LegalCard>
            <p className="text-lg font-semibold text-brand-purple mb-4">
              Currently, we do not support refunds for our services.
            </p>
            <p className="mb-4">
              This policy applies to all subscriptions and one-time purchases
              made on Opensox AI, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pro subscription plans (monthly or annual)</li>
              <li>Any premium features or services</li>
              <li>One-time payments for specific features</li>
            </ul>
          </LegalCard>
        </LegalSection>

        {/* Why No Refunds */}
        <LegalSection title="Why We Don't Offer Refunds">
          <p className="mb-4">
            As a digital service provider offering immediate access to premium
            features, personalized mentoring, and exclusive content, we are
            unable to offer refunds once services have been accessed or
            utilized.
          </p>
          <p>
            We believe in transparency and want to ensure you make an informed
            decision before purchasing.
          </p>
        </LegalSection>

        {/* Before You Purchase */}
        <LegalSection title="Before You Purchase">
          <p className="mb-4">
            We strongly encourage you to take advantage of the following
            resources before making a purchase:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">
                📚 Review Our Features
              </h3>
              <p className="text-sm text-muted">
                Carefully review all features included in your subscription plan
                on our pricing page
              </p>
            </LegalCard>
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">💬 Ask Questions</h3>
              <p className="text-sm text-muted">
                Reach out to us with any questions or concerns before purchasing
              </p>
            </LegalCard>
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">
                🆓 Try Free Features
              </h3>
              <p className="text-sm text-muted">
                Use our free tier to understand how the platform works before
                upgrading
              </p>
            </LegalCard>
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">
                👥 Join Our Community
              </h3>
              <p className="text-sm text-muted">
                Connect with existing users on Discord to hear about their
                experiences
              </p>
            </LegalCard>
          </div>
        </LegalSection>

        {/* Cancellation Policy */}
        <LegalSection title="Subscription Cancellation">
          <p className="mb-4">
            While we don't offer refunds, you can cancel your subscription at
            any time:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>
              <strong>How to Cancel:</strong> You can cancel your subscription
              through your account settings or by contacting us
            </li>
            <li>
              <strong>When It Takes Effect:</strong> Cancellation will take
              effect at the end of your current billing period
            </li>
            <li>
              <strong>Access:</strong> You'll continue to have access to Pro
              features until the end of your paid period
            </li>
            <li>
              <strong>No Partial Refunds:</strong> You will not be charged again
              after cancellation, but no refund will be provided for the
              remaining days of your current billing cycle
            </li>
          </ul>
        </LegalSection>

        {/* Exceptional Circumstances */}
        <LegalSection title="Exceptional Circumstances">
          <p className="mb-4">
            In rare cases, we may consider refunds for exceptional circumstances
            such as:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Technical issues on our end that prevent you from accessing the
              service
            </li>
            <li>Duplicate charges or billing errors</li>
            <li>Unauthorized charges on your account</li>
          </ul>
          <p className="mt-4">
            If you believe you qualify for an exceptional refund, please contact
            us immediately with detailed information about your situation.
          </p>
        </LegalSection>

        {/* Contact Section */}
        <LegalCard variant="highlighted">
          <ContactInfo description="We want you to feel confident in your purchase decision. If you have any questions, concerns, or need clarification about our services before purchasing, please don't hesitate to reach out:" />
        </LegalCard>

        {/* Policy Updates */}
        <LegalSection title="Policy Updates">
          <p>
            We reserve the right to modify this Cancellation and Refund Policy
            at any time. Any changes will be posted on this page with an updated
            effective date. Your continued use of our services after any changes
            constitutes acceptance of the new policy.
          </p>
        </LegalSection>
      </LegalContent>

      <LegalFooter />
    </LegalPageLayout>
  );
}

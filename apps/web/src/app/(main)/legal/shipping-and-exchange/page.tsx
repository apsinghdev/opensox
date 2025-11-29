/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
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
  title: "Shipping and Exchange Policy - Opensox AI",
  description:
    "Opensox AI provides digital software services. As we provide software, we do not support shipping or exchange.",
};

export default function ShippingAndExchangePage() {
  return (
    <LegalPageLayout>
      <LegalPageHeader
        title="Shipping and Exchange Policy"
        effectiveDate={EFFECTIVE_DATE}
      />

      <LegalContent>
        {/* Introduction */}
        <LegalCard>
          <p className="text-lg">
            Opensox AI is a digital software platform that provides online
            services for discovering and contributing to open-source projects.
            As a software service, we do not ship physical products.
          </p>
        </LegalCard>

        {/* No Physical Products */}
        <LegalSection title="Digital Service Only">
          <LegalCard>
            <p className="text-lg font-semibold text-brand-purple mb-4">
              As we provide software services, we do not support shipping or
              exchange.
            </p>
            <p className="mb-4">
              All our products and services are delivered digitally and
              instantly upon purchase:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Instant Access:</strong> Pro features are activated
                immediately after successful payment
              </li>
              <li>
                <strong>Cloud-Based:</strong> All services are accessible
                through your web browser
              </li>
              <li>
                <strong>No Physical Delivery:</strong> There are no physical
                products to ship or exchange
              </li>
              <li>
                <strong>Digital Downloads:</strong> Any resources provided are
                digital and delivered via email or through the platform
              </li>
            </ul>
          </LegalCard>
        </LegalSection>

        {/* What This Means */}
        <LegalSection title="What This Means for You">
          <div className="grid md:grid-cols-2 gap-4">
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">
                ✅ Immediate Access
              </h3>
              <p className="text-sm text-light">
                Start using Pro features right after payment confirmation
              </p>
            </LegalCard>
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">
                🌐 Accessible Anywhere
              </h3>
              <p className="text-sm text-light">
                Access your account from any device with internet connection
              </p>
            </LegalCard>
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">
                🚫 No Waiting Period
              </h3>
              <p className="text-sm text-light">
                No shipping delays or delivery issues to worry about
              </p>
            </LegalCard>
            <LegalCard>
              <h3 className="text-lg font-semibold mb-2">
                🔄 No Exchanges Needed
              </h3>
              <p className="text-sm text-light">
                Digital services are delivered as described with instant access
              </p>
            </LegalCard>
          </div>
        </LegalSection>

        {/* Service Issues */}
        <LegalSection title="If You Experience Service Issues">
          <p className="mb-4">
            While we don't ship physical products, if you experience any
            technical issues with accessing our services:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Contact our support team immediately</li>
            <li>We'll work to resolve any access or technical problems</li>
            <li>
              Our team is committed to ensuring you can use all features you've
              paid for
            </li>
          </ul>
        </LegalSection>

        {/* Subscription Management */}
        <LegalSection title="Managing Your Subscription">
          <p className="mb-4">
            Instead of exchanges, you can manage your subscription through your
            account:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Upgrade:</strong> Move to a higher-tier plan at any time
            </li>
            <li>
              <strong>Cancel:</strong> Cancel your subscription before the next
              billing cycle
            </li>
            <li>
              <strong>Modify:</strong> Update your account settings and
              preferences
            </li>
          </ul>
          <p className="mt-4">
            For more information about cancellations, please see our{" "}
            <Link
              href="/legal/cancellation-and-refund"
              className="text-link hover:text-link-hover transition-colors"
            >
              Cancellation and Refund Policy
            </Link>
            .
          </p>
        </LegalSection>

        {/* Contact Section */}
        <LegalCard variant="highlighted">
          <ContactInfo
            titleText="Need Help?"
            description="If you have questions about our digital services, account access, or subscription management, please contact us:"
          />
        </LegalCard>

        {/* Related Policies */}
        <LegalSection title="Related Policies">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/legal/cancellation-and-refund"
              className="bg-surface-tertiary border border rounded-lg p-4 hover:border-light transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">
                Cancellation & Refund Policy
              </h3>
              <p className="text-sm text-light">
                Learn about our cancellation process and refund policy
              </p>
            </Link>
            <Link
              href="/legal/terms"
              className="bg-surface-tertiary border border rounded-lg p-4 hover:border-light transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">
                Terms and Conditions
              </h3>
              <p className="text-sm text-light">
                Review our complete terms of service
              </p>
            </Link>
          </div>
        </LegalSection>

        {/* Policy Updates */}
        <LegalSection title="Policy Updates">
          <p>
            We reserve the right to modify this Shipping and Exchange Policy at
            any time. Any changes will be posted on this page with an updated
            effective date. Your continued use of our services after any changes
            constitutes acceptance of the new policy.
          </p>
        </LegalSection>
      </LegalContent>

      <LegalFooter />
    </LegalPageLayout>
  );
}

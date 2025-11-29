/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalPageHeader,
  LegalSection,
  LegalCard,
  LegalFooter,
  LegalContent,
} from "@/components/legal";

export const metadata: Metadata = {
  title: "Contact Us - Opensox AI",
  description:
    "Get in touch with Opensox AI. Contact us via email at hi@opensox.ai or call +91 844-7500-346 for support and inquiries.",
};

export default function ContactPage() {
  return (
    <LegalPageLayout>
      <LegalPageHeader
        title="Contact Us"
        subtitle="Get in touch with our team"
      />

      <LegalContent>
        {/* Introduction */}
        <section>
          <p className="text-lg mb-8">
            Have questions, feedback, or need assistance? We're here to help!
            Reach out to us through any of the following channels:
          </p>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Card */}
            <LegalCard className="hover:border-[#363636] transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#252525] rounded-lg">
                  <Mail className="w-6 h-6 text-[#9455f4]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:hi@opensox.ai"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-lg"
                  >
                    hi@opensox.ai
                  </a>
                  <p className="text-sm text-[#b1b1b1] mt-2">
                    For general inquiries, support, and feedback
                  </p>
                </div>
              </div>
            </LegalCard>

            {/* Phone Card */}
            <LegalCard className="hover:border-[#363636] transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#252525] rounded-lg">
                  <Phone className="w-6 h-6 text-[#9455f4]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <a
                    href="tel:+918447500346"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-lg"
                  >
                    +91 844-7500-346
                  </a>
                  <p className="text-sm text-[#b1b1b1] mt-2">
                    Available during business hours (IST)
                  </p>
                </div>
              </div>
            </LegalCard>
          </div>
        </section>

        {/* Response Time */}
        <LegalCard>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Response Time
          </h2>
          <p>
            We typically respond to all inquiries within 24-48 hours during
            business days. For urgent matters, please mention "URGENT" in your
            email subject line.
          </p>
        </LegalCard>

        {/* What to Include */}
        <LegalSection title="When Contacting Us, Please Include:">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your registered email address (if applicable)</li>
            <li>A clear description of your inquiry or issue</li>
            <li>
              Any relevant screenshots or error messages (if reporting a bug)
            </li>
            <li>Your subscription type (Free or Pro) if related to features</li>
          </ul>
        </LegalSection>

        {/* Other Ways to Connect */}
        <LegalSection title="Other Ways to Connect">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Community Discord</h3>
              <p className="mb-2">
                Join our Discord community for real-time discussions, help from
                other users, and updates about Opensox AI.
              </p>
              <a
                href="https://discord.gg/zbHzgMNBrm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Join Discord Community →
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Social Media</h3>
              <p className="mb-2">
                Follow us on social media for updates, tips, and community
                highlights:
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <a
                  href="https://x.com/opensoxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Twitter/X
                </a>
                <a
                  href="https://github.com/apsinghdev/opensox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.youtube.com/channel/UC7QV7uSxlbha-bNPaev5MeQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">GitHub Issues</h3>
              <p className="mb-2">
                Found a bug or have a feature request? Open an issue on our
                GitHub repository:
              </p>
              <a
                href="https://github.com/apsinghdev/opensox/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Report an Issue →
              </a>
            </div>
          </div>
        </LegalSection>
      </LegalContent>

      <LegalFooter />
    </LegalPageLayout>
  );
}

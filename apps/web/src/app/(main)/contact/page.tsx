import React from "react";
import { Mail, Phone, MessageSquare, Github, Youtube } from "lucide-react";
import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalPageHeader,
  LegalSection,
  LegalCard,
  LegalFooter,
  LegalContent,
} from "@/components/legal";

// this page should be static and cdn-cacheable.
// helps a lot if your ttfb is high due to middleware/session work elsewhere.
export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact Us - Opensox AI",
  description:
    "Get in touch with Opensox AI. Email hi@opensox.ai or call +91 844-7500-346 for support and inquiries.",
};

export default function ContactPage() {
  return (
    <LegalPageLayout>
      <LegalPageHeader
        title="Contact Us"
        subtitle="Get in touch with our team"
      />

      <LegalContent>
        {/* Intro */}
        <section>
          <p className="text-lg mb-8 text-text-secondary">
            Have questions, feedback, or need assistance? We&apos;re here to
            help. Reach out through any of the channels below.
          </p>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <LegalCard className="hover:border-border-light transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-surface-tertiary rounded-lg border border-border">
                  <Mail className="w-6 h-6 text-brand-purple-light" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold mb-2 text-text-primary">
                    Email
                  </h3>
                  <a
                    href="mailto:hi@opensox.ai"
                    className="text-link hover:text-link-hover transition-colors text-lg break-all"
                  >
                    hi@opensox.ai
                  </a>
                  <p className="text-sm text-text-tertiary mt-2">
                    General inquiries, support, and feedback
                  </p>
                </div>
              </div>
            </LegalCard>

            {/* Phone */}
            <LegalCard className="hover:border-border-light transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-surface-tertiary rounded-lg border border-border">
                  <Phone className="w-6 h-6 text-brand-purple-light" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold mb-2 text-text-primary">
                    Phone
                  </h3>
                  <a
                    href="tel:+918447500346"
                    className="text-link hover:text-link-hover transition-colors text-lg"
                  >
                    +91 844-7500-346
                  </a>
                  <p className="text-sm text-text-tertiary mt-2">
                    Available during business hours (IST)
                  </p>
                </div>
              </div>
            </LegalCard>
          </div>
        </section>

        {/* Response Time */}
        <LegalCard>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-text-primary">
            Response Time
          </h2>
          <p className="text-text-secondary">
            We typically respond within 24 to 48 hours on business days. For
            urgent matters, include{" "}
            <span className="font-semibold">URGENT</span> in your email subject.
          </p>
        </LegalCard>

        {/* What to include */}
        <LegalSection title="When contacting us, please include:">
          <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
            <li>Your registered email address (if applicable)</li>
            <li>A clear description of your inquiry or issue</li>
            <li>Relevant screenshots or error messages (if reporting a bug)</li>
            <li>Your subscription type (Free or Pro) if related to features</li>
          </ul>
        </LegalSection>

        {/* Other ways */}
        <LegalSection title="Other ways to connect">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">
                Community Discord
              </h3>
              <p className="mb-2 text-text-secondary">
                Join the Discord community for discussions, help from other
                users, and updates about Opensox AI.
              </p>
              <a
                href="https://discord.gg/zbHzgMNBrm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Join Discord Community
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">
                Social Media
              </h3>
              <p className="mb-3 text-text-secondary">
                Follow for updates, tips, and community highlights:
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://x.com/opensoxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover transition-colors"
                >
                  Twitter/X
                </a>
                <a
                  href="https://github.com/apsinghdev/opensox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.youtube.com/channel/UC7QV7uSxlbha-bNPaev5MeQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">
                GitHub Issues
              </h3>
              <p className="mb-2 text-text-secondary">
                Found a bug or have a feature request? Open an issue on GitHub:
              </p>
              <a
                href="https://github.com/apsinghdev/opensox/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
              >
                <Github className="w-4 h-4" />
                Report an Issue
              </a>
            </div>
          </div>
        </LegalSection>
      </LegalContent>

      <LegalFooter />
    </LegalPageLayout>
  );
}

/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        {/* Header */}
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          Terms of Service
        </h1>
        <p className="text-[#b1b1b1] text-lg mb-12">
          Effective date: January 8, 2024
        </p>

        {/* Content */}
        <div className="space-y-8 text-[#e1e1e1] leading-relaxed">
          {/* Introduction */}
          <section>
            <p className="text-lg">
              Welcome to Opensox.ai ("Opensox," "we," "us," or "our"). Please
              read these Terms of Service ("Terms") carefully as they govern
              your use of our platform, website, and services. By accessing or
              using Opensox.ai, you agree to be bound by these Terms. If you do
              not agree to these Terms, please do not use our Services.
            </p>
            <p className="text-lg mt-4">
              For questions or concerns regarding these Terms, please contact us
              at:{" "}
              <a
                href="mailto:hi@opensox.ai"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                hi@opensox.ai
              </a>
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              1. Description of Service
            </h2>
            <p className="mb-4">
              Opensox.ai is a platform designed to help developers discover and
              contribute to open-source projects efficiently. Our Services
              include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Search and Discovery:</strong> Search and filter
                thousands of open-source projects by programming language, tech
                stack, activity level, competition, and niche areas (AI, Core
                ML, Web3, etc.)
              </li>
              <li>
                <strong>Project Information:</strong> View project details,
                beginner-friendly tasks, issue counts, and contribution
                opportunities
              </li>
              <li>
                <strong>Pro Features:</strong> Access to personalized
                mentoring, exclusive newsletter, open-source jobs and internship
                opportunities, and our 30-day contribution challenge
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              2. User Accounts and Registration
            </h2>
            <p className="mb-4">
              To access certain features of Opensox.ai, you may need to create
              an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Provide accurate, current, and complete information during
                registration
              </li>
              <li>Maintain and promptly update your account information</li>
              <li>
                Maintain the security and confidentiality of your account
                credentials
              </li>
              <li>
                Notify us immediately of any unauthorized use of your account
              </li>
              <li>
                Be responsible for all activities that occur under your account
              </li>
            </ul>
            <p className="mt-4">
              You must be at least 13 years old to use our Services. If you are
              under 18, you must have permission from a parent or guardian.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              3. Acceptable Use Policy
            </h2>
            <p className="mb-4">When using Opensox.ai, you agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>
                Scrape, copy, or redistribute project data for commercial
                purposes without permission
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or networks
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of our
                Services
              </li>
              <li>
                Use automated systems (bots, scrapers) without our explicit
                written consent
              </li>
              <li>
                Impersonate any person or entity or misrepresent your
                affiliation
              </li>
              <li>Transmit viruses, malware, or any other malicious code</li>
              <li>
                Collect or harvest personal information of other users without
                consent
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              4. Pro Subscription Services
            </h2>
            <p className="mb-4">
              Opensox.ai offers Pro subscription plans with enhanced
              features including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Personalized Mentoring:</strong> One-on-one guidance for
                open-source contributions
              </li>
              <li>
                <strong>Exclusive Newsletter:</strong> Curated content on
                open-source trends, funding opportunities, jobs, and internships
              </li>
              <li>
                <strong>30-Day Challenge:</strong> Structured program to
                kickstart your open-source journey
              </li>
              <li>
                <strong>Advanced Filters:</strong> Additional search and
                filtering capabilities
              </li>
            </ul>
            <p className="mt-4">
              <strong>Payment Terms:</strong> Pro subscriptions are billed
              in advance on a monthly or annual basis. All fees are
              non-refundable except as required by law. You may cancel your
              subscription at any time, and cancellation will take effect at the
              end of your current billing period.
            </p>
            <p className="mt-4">
              <strong>Price Changes:</strong> We reserve the right to modify
              subscription pricing with at least 30 days' notice. Continued use
              of Pro services after a price change constitutes acceptance of
              the new pricing.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              5. User Data and Privacy
            </h2>
            <p className="mb-4">
              We collect and process personal information as described in our
              Privacy Policy. By using Opensox.ai, you consent to such
              processing and warrant that all data provided by you is accurate.
              We use your data to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Improve our search algorithms and user experience</li>
              <li>Send you newsletters and updates (if subscribed)</li>
              <li>Communicate about your account and our Services</li>
              <li>Analyze usage patterns to enhance our platform</li>
            </ul>
            <p className="mt-4">
              You may update or delete your account information at any time
              through your account settings.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              6. Third-Party Content and Links
            </h2>
            <p>
              Opensox.ai aggregates information about open-source projects
              hosted on third-party platforms (GitHub, GitLab, etc.). We are not
              responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>
                The accuracy, availability, or legality of third-party projects
              </li>
              <li>
                The content, policies, or practices of third-party repositories
              </li>
              <li>
                Your interactions with third-party project maintainers or
                contributors
              </li>
              <li>
                Any issues arising from your contributions to external projects
              </li>
            </ul>
            <p className="mt-4">
              Links to external websites are provided for convenience only. We
              do not endorse or assume responsibility for any third-party sites
              or services.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              7. Intellectual Property Rights
            </h2>
            <p className="mb-4">
              <strong>Our Content:</strong> All content, features, and
              functionality of Opensox.ai (including but not limited to text,
              graphics, logos, software, and design) are owned by Opensox.ai and
              protected by international copyright, trademark, and other
              intellectual property laws.
            </p>
            <p className="mb-4">
              <strong>Your Content:</strong> You retain ownership of preferences
              and any other content you create on our platform. By using our
              Services, you grant us a limited license to use, store, and
              display such content solely to provide and improve our Services.
            </p>
            <p className="mb-4">
              <strong>Open Source Projects:</strong> Information about
              open-source projects displayed on Opensox.ai remains subject to
              the respective licenses of those projects. We do not claim
              ownership of any third-party project data.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              8. Mentoring Services
            </h2>
            <p className="mb-4">
              Pro subscribers may access personalized mentoring services.
              Please note:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Mentoring is provided on a best-effort basis and does not
                guarantee specific outcomes
              </li>
              <li>
                Mentoring advice is educational in nature and does not
                constitute professional career counseling
              </li>
              <li>
                You are responsible for implementing any guidance provided
                during mentoring sessions
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              9. Newsletter and Communications
            </h2>
            <p>
              By subscribing to our newsletter, you consent to receive emails
              about open-source trends, funding opportunities, jobs,
              internships, and platform updates. You may unsubscribe at any time
              using the link provided in our emails or through your account
              settings.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              10. 30-Day Challenge
            </h2>
            <p>
              The 30-Day Challenge is designed to help users build consistent
              open-source contribution habits. Participation is voluntary and:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>
                Does not guarantee acceptance of your contributions by project
                maintainers
              </li>
              <li>Requires your own effort and initiative to complete tasks</li>
              <li>May be modified or discontinued at our discretion</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              11. Disclaimers and Warranties
            </h2>
            <p className="mb-4">
              <strong>AS-IS BASIS:</strong> Opensox.ai is provided "AS IS" and
              "AS AVAILABLE" without warranties of any kind, either express or
              implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Warranties of merchantability or fitness for a particular
                purpose
              </li>
              <li>
                Accuracy, reliability, or completeness of project information
              </li>
              <li>Uninterrupted, secure, or error-free operation</li>
              <li>Results or outcomes from using our Services</li>
            </ul>
            <p className="mt-4">
              You acknowledge that open-source contribution success depends on
              many factors beyond our control, including your skills, effort,
              and acceptance by project maintainers.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              12. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Opensox.ai, its founders
              (including Ajeet Pratap Singh), and affiliates shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of profits, data, or
              opportunities, arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Your use or inability to use our Services</li>
              <li>Any conduct or content of third parties on the platform</li>
              <li>Unauthorized access to your account or data</li>
              <li>
                Interactions with open-source projects discovered through our
                platform
              </li>
            </ul>
            <p className="mt-4">
              Our total liability shall not exceed the amount you paid to
              Opensox.ai in the twelve (12) months preceding the claim, or $100,
              whichever is greater.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              13. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless Opensox.ai and
              its affiliates from any claims, damages, losses, liabilities, and
              expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Your use of our Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your contributions to third-party open-source projects</li>
            </ul>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              14. Termination
            </h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account and
              access to our Services at any time, with or without notice, for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violation of these Terms</li>
              <li>Fraudulent, abusive, or illegal activity</li>
              <li>Extended periods of inactivity</li>
              <li>
                At our sole discretion if we believe it necessary to protect our
                platform or other users
              </li>
            </ul>
            <p className="mt-4">
              You may terminate your account at any time through your account
              settings. Upon termination, your right to use our Services will
              immediately cease, though certain provisions of these Terms will
              survive termination.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              15. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify users of material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>
                Posting the updated Terms on this page with a new "Effective
                date"
              </li>
              <li>
                Sending an email notification to registered users (for
                significant changes)
              </li>
              <li>Displaying a notice on our platform</li>
            </ul>
            <p className="mt-4">
              Your continued use of Opensox.ai after changes take effect
              constitutes acceptance of the revised Terms. If you do not agree
              to the changes, you must discontinue use of our Services.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              16. Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction], without regard to its conflict of
              law provisions.
            </p>
            <p className="mb-4">
              Any disputes arising from these Terms or your use of Opensox.ai
              shall be resolved through:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                <strong>Informal Resolution:</strong> Contact us at
                hi@opensox.ai to attempt good-faith resolution
              </li>
              <li>
                <strong>Binding Arbitration:</strong> If informal resolution
                fails, disputes shall be resolved through binding arbitration
              </li>
            </ol>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              17. General Provisions
            </h2>
            <p className="mb-4">
              <strong>Entire Agreement:</strong> These Terms, along with our
              Privacy Policy, constitute the entire agreement between you and
              Opensox.ai.
            </p>
            <p className="mb-4">
              <strong>Severability:</strong> If any provision of these Terms is
              found to be unenforceable, the remaining provisions will remain in
              full effect.
            </p>
            <p className="mb-4">
              <strong>Waiver:</strong> Our failure to enforce any right or
              provision of these Terms will not be considered a waiver of those
              rights.
            </p>
            <p className="mb-4">
              <strong>Assignment:</strong> You may not assign or transfer these
              Terms without our written consent. We may assign our rights and
              obligations without restriction.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              18. Contact Information
            </h2>
            <p>
              For questions, concerns, or feedback regarding these Terms of
              Service, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:hi@opensox.ai"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  hi@opensox.ai
                </a>
              </p>
              <p>
                <strong>Platform:</strong>{" "}
                <a
                  href="https://opensox.ai"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  opensox.ai
                </a>
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t border-[#252525] pt-8">
            <p className="text-base italic text-[#b1b1b1]">
              By using Opensox.ai, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#252525] text-center text-[#b1b1b1]">
          <p className="text-sm">
            © {new Date().getFullYear()} Opensox AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

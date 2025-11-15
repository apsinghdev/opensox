/* eslint-disable react/no-unescaped-entities */
import React from "react";

const TermsContent = () => {
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
                <strong>Premium Features:</strong> Access to personalized
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
              4. Premium Subscription Services
            </h2>
            <p className="mb-4">
              Opensox.ai offers premium subscription plans with enhanced
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
              <strong>Payment Terms:</strong> Premium subscriptions are billed
              in advance on a monthly or annual basis. All fees are
              non-refundable except as required by law. You may cancel your
              subscription at any time, and cancellation will take effect at the
              end of your current billing period.
            </p>
            <p className="mt-4">
              <strong>Price Changes:</strong> We reserve the right to modify
              subscription pricing with at least 30 days' notice. Continued use
              of premium services after a price change constitutes acceptance of
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
              Premium subscribers may access personalized mentoring services.
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
              10. Community Guidelines
            </h2>
            <p className="mb-4">
              When participating in the Opensox.ai community (Slack, forums,
              events), you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Respect all members regardless of background or experience</li>
              <li>
                Avoid harassment, discrimination, hate speech, or offensive
                behavior
              </li>
              <li>Provide constructive feedback and encourage collaboration</li>
              <li>Avoid sharing others' personal information without consent</li>
            </ul>
            <p className="mt-4">
              We reserve the right to remove or suspend accounts that violate
              these guidelines.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              11. Disclaimers and Limitation of Liability
            </h2>
            <p className="mb-4">
              <strong>Disclaimer:</strong> Opensox.ai is provided on an "as is"
              and "as available" basis. We make no warranties or representations
              about the accuracy or completeness of the content on our platform.
            </p>
            <p className="mb-4">
              <strong>Limitation of Liability:</strong> To the maximum extent
              permitted by law, Opensox.ai and its affiliates shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your access to or use of (or inability to access or use) the Services</li>
              <li>Any conduct or content of any third party on the Services</li>
              <li>Any content obtained from the Services</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content
              </li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              12. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Opensox.ai and
              its affiliates from and against any claims, liabilities, damages,
              losses, and expenses, including reasonable legal and accounting
              fees, arising out of or in any way connected with your access to
              or use of the Services or your violation of these Terms.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              13. Termination
            </h2>
            <p className="mb-4">
              We may suspend or terminate your access to Opensox.ai at any time
              if we believe you have violated these Terms or if necessary to
              protect our platform and users. Upon termination, your right to
              use the Services will immediately cease, but the provisions of
              these Terms intended to survive termination will remain in effect.
            </p>
            <p className="mb-4">
              You may terminate your account by contacting us at
              hi@opensox.ai.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              14. Changes to the Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we make changes,
              we will update the "Effective Date" at the top of this page. By
              continuing to use Opensox.ai after the revised Terms become
              effective, you agree to be bound by the updated Terms.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              15. Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Opensox.ai operates. Any
              disputes arising under or in connection with these Terms shall be
              resolved through binding arbitration or in the courts located in
              the same jurisdiction.
            </p>
            <p>
              If you have any concerns or disputes, we encourage you to contact
              us first so we can try to resolve the issue amicably.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              16. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms or our Services,
              please contact us at:{" "}
              <a
                href="mailto:hi@opensox.ai"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                hi@opensox.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsContent;

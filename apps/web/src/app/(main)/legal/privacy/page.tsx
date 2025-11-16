/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        {/* Header */}
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-[#b1b1b1] text-lg mb-12">
          Effective date: January 8, 2024
        </p>

        {/* Content */}
        <div className="space-y-8 text-[#e1e1e1] leading-relaxed">
          {/* Introduction */}
          <section>
            <p className="text-lg">
              At Opensox AI, we take your privacy seriously. Please read this
              Privacy Policy to learn how we treat your personal data. By using
              or accessing our Services in any manner, you acknowledge that you
              accept the practices and policies outlined below, and you hereby
              consent that we will collect, use and share your information as
              described in this Privacy Policy.
            </p>
            <p className="text-lg mt-4">
              Remember that your use of Opensox AI's Services is at all times
              subject to our{" "}
              <a
                href="/legal/terms"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Terms of Service
              </a>
              , which incorporates this Privacy Policy. Any terms we use in this
              Policy without defining them have the definitions given to them in
              the Terms of Service.
            </p>
          </section>

          {/* What this Privacy Policy Covers */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              What this Privacy Policy Covers
            </h2>
            <p>
              This Privacy Policy covers how we treat Personal Data that we
              gather when you access or use our Services. "Personal Data" means
              any information that identifies or relates to a particular
              individual and also includes information referred to as
              "personally identifiable information" or "personal information"
              under applicable data privacy laws, rules or regulations. This
              Privacy Policy does not cover the practices of companies we don't
              own or control or people we don't manage.
            </p>
          </section>

          {/* Personal Data */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Personal Data
            </h2>

            <h3 className="text-xl lg:text-2xl font-semibold mb-3 mt-6">
              Categories of Personal Data We Collect
            </h3>
            <p className="mb-4">
              This table details the categories of Personal Data that we collect
              and have collected over the past 12 months:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#252525] text-sm">
                <thead>
                  <tr className="bg-[#1a1a1a]">
                    <th className="border border-[#252525] p-3 text-left">
                      Category of Personal Data
                    </th>
                    <th className="border border-[#252525] p-3 text-left">
                      Examples of Personal Data We Collect
                    </th>
                    <th className="border border-[#252525] p-3 text-left">
                      Categories of Third Parties With Whom We Share this
                      Personal Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#252525] p-3">
                      Profile or Contact Data
                    </td>
                    <td className="border border-[#252525] p-3">
                      First and last name
                      <br />
                      Email
                      <br />
                      Unique identifiers such as passwords
                    </td>
                    <td className="border border-[#252525] p-3">
                      Service Providers
                      <br />
                      Business Partners
                      <br />
                      Parties You Authorize, Access or Authenticate
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#252525] p-3">
                      Payment Data
                    </td>
                    <td className="border border-[#252525] p-3">
                      Payment card type
                      <br />
                      Last 4 digits of payment card
                      <br />
                      Billing address, phone number, and email
                    </td>
                    <td className="border border-[#252525] p-3">
                      Payment Processors
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#252525] p-3">
                      Search & Filter Data
                    </td>
                    <td className="border border-[#252525] p-3">
                      Programming languages searched
                      <br />
                      Tech stack preferences
                      <br />
                      Project activity filters
                      <br />
                      Niche area interests (AI, Web3, etc.)
                    </td>
                    <td className="border border-[#252525] p-3">
                      Service Providers
                      <br />
                      Analytics Partners
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#252525] p-3">
                      Device/IP Data
                    </td>
                    <td className="border border-[#252525] p-3">
                      IP address
                      <br />
                      Type of device/operating system/browser used to access the
                      Services
                    </td>
                    <td className="border border-[#252525] p-3">
                      Service Providers
                      <br />
                      Analytics Partners
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#252525] p-3">
                      Web Analytics
                    </td>
                    <td className="border border-[#252525] p-3">
                      Referring webpage/source through which you accessed the
                      Services
                      <br />
                      Non-identifiable request IDs
                      <br />
                      Statistics associated with the interaction between device
                      or browser and the Services
                    </td>
                    <td className="border border-[#252525] p-3">
                      Analytics Partners
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#252525] p-3">
                      Third Party Platform Data
                    </td>
                    <td className="border border-[#252525] p-3">
                      GitHub username and profile information
                      <br />
                      GitHub Bio, URLs, and public profile details
                      <br />
                      Email from authentication providers
                    </td>
                    <td className="border border-[#252525] p-3">
                      Service Providers
                      <br />
                      Analytics Partners
                      <br />
                      Business Partners
                      <br />
                      Parties You Authorize, Access or Authenticate
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#252525] p-3">
                      Geolocation Data
                    </td>
                    <td className="border border-[#252525] p-3">
                      IP-address-based location information
                    </td>
                    <td className="border border-[#252525] p-3">
                      Service Providers
                      <br />
                      Analytics Partners
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Categories of Sources */}
          <section>
            <h3 className="text-xl lg:text-2xl font-semibold mb-3">
              Categories of Sources of Personal Data
            </h3>
            <p className="mb-4">
              We collect Personal Data about you from the following categories
              of sources:
            </p>

            <div className="ml-4 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">You</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>When you provide such information directly to us.</li>
                  <li>
                    When you create an account or use our interactive tools and
                    Services.
                  </li>
                  <li>
                    When you voluntarily provide information in free-form text
                    boxes through the Services or through responses to surveys
                    or questionnaires.
                  </li>
                  <li>When you send us an email or otherwise contact us.</li>
                  <li>
                    When you use the Services and such information is collected
                    automatically.
                    <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                      <li>
                        Through Cookies (defined in the "Tracking Tools and
                        Opt-Out" section below).
                      </li>
                      <li>
                        If you use a location-enabled browser, we may receive
                        information about your location.
                      </li>
                      <li>
                        If you download and install certain applications and
                        software we make available, we may receive and collect
                        information transmitted from your computing device.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Third Parties</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Vendors:</strong> We may use analytics providers to
                    analyze how you interact and engage with the Services, or
                    third parties may help us provide you with customer support.
                  </li>
                  <li>
                    <strong>Advertising Partners:</strong> We receive
                    information about you from some of our vendors who assist us
                    with marketing or promotional services related to how you
                    interact with our websites, applications, products,
                    Services, advertisements or communications.
                  </li>
                  <li>
                    <strong>Social Networks:</strong> If you provide your social
                    network account credentials to us or otherwise sign in to
                    the Services through a third-party site or service (such as
                    GitHub), some content and/or information in those accounts
                    may be transmitted into your account with us.
                  </li>
                  <li>
                    <strong>Open Source Platforms:</strong> We aggregate
                    publicly available data from GitHub and other open-source
                    platforms to provide you with project information and
                    recommendations.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Purposes for Collecting Personal Data */}
          <section>
            <h3 className="text-xl lg:text-2xl font-semibold mb-3">
              Our Commercial or Business Purposes for Collecting Personal Data
            </h3>

            <div className="space-y-4 ml-4">
              <div>
                <h4 className="font-semibold mb-2">
                  Providing, Customizing and Improving the Services
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Creating and managing your account or other user profiles.
                  </li>
                  <li>Processing orders or other transactions; billing.</li>
                  <li>
                    Providing you with the products, services or information you
                    request.
                  </li>
                  <li>
                    Meeting or fulfilling the reason you provided the
                    information to us.
                  </li>
                  <li>Providing support and assistance for the Services.</li>
                  <li>
                    Improving the Services, including testing, research,
                    internal analytics and product development.
                  </li>
                  <li>
                    Personalizing the Services, website content and
                    communications based on your preferences.
                  </li>
                  <li>Doing fraud protection, security and debugging.</li>
                  <li>
                    Filtering and displaying relevant open-source projects based
                    on your search criteria.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Marketing the Services</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Marketing and selling the Services.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Corresponding with You</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Responding to correspondence that we receive from you,
                    contacting you when necessary or requested, and sending you
                    information about Opensox AI or the Services.
                  </li>
                  <li>
                    Sending emails and other communications according to your
                    preferences or that display content that we think will
                    interest you, including our newsletter about open-source
                    trends, jobs, and internships (for Pro subscribers).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Meeting Legal Requirements and Enforcing Legal Terms
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Fulfilling our legal obligations under applicable law,
                    regulation, court order or other legal process, such as
                    preventing, detecting and investigating security incidents
                    and potentially illegal or prohibited activities.
                  </li>
                  <li>
                    Protecting the rights, property or safety of you, Opensox AI
                    or another party.
                  </li>
                  <li>Enforcing any agreements with you.</li>
                  <li>
                    Responding to claims that any posting or other content
                    violates third-party rights.
                  </li>
                  <li>Resolving disputes.</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-[#b1b1b1] italic">
              We will not collect additional categories of Personal Data or use
              the Personal Data we collected for materially different, unrelated
              or incompatible purposes without providing you notice.
            </p>
          </section>

          {/* How We Share Your Personal Data */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              How We Share Your Personal Data
            </h2>
            <p className="mb-4">
              We disclose your Personal Data to the categories of service
              providers and other parties listed in this section.
            </p>

            <div className="space-y-4 ml-4">
              <div>
                <h4 className="font-semibold mb-2">Service Providers</h4>
                <p className="mb-2">
                  These parties help us provide the Services or perform business
                  functions on our behalf. They include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Hosting, technology and communication providers.</li>
                  <li>Security and fraud prevention consultants.</li>
                  <li>Support and customer service vendors.</li>
                  <li>Product fulfillment and delivery providers.</li>
                  <li>
                    <strong>Payment processors:</strong> Our payment processing
                    partner Razorpay Software Private Limited ("Razorpay")
                    collects your voluntarily-provided payment card information
                    necessary to process your payment. Please see{" "}
                    <a
                      href="https://razorpay.com/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Razorpay's privacy policy
                    </a>{" "}
                    for information on its use and storage of your Personal
                    Data.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Analytics Partners</h4>
                <p className="mb-2">
                  These parties provide analytics on web traffic or usage of the
                  Services. They include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Companies that track how users found or were referred to the
                    Services.
                  </li>
                  <li>
                    Companies that track how users interact with the Services.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Business Partners</h4>
                <p className="mb-2">
                  These parties partner with us in offering various services.
                  They include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Businesses that you have a relationship with.</li>
                  <li>
                    Companies that we partner with to offer joint promotional
                    offers or opportunities.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Parties You Authorize, Access or Authenticate
                </h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Third parties you access through the services.</li>
                  <li>Social media services (e.g., GitHub).</li>
                  <li>Other users.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Legal Obligations</h4>
                <p>
                  We may share any Personal Data that we collect with third
                  parties in conjunction with any of the activities set forth
                  under "Meeting Legal Requirements and Enforcing Legal Terms"
                  in the section above.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Business Transfers</h4>
                <p>
                  All of your Personal Data that we collect may be transferred
                  to a third party if we undergo a merger, acquisition,
                  bankruptcy or other transaction in which that third party
                  assumes control of our business (in whole or in part). Should
                  one of these events occur, we will make reasonable efforts to
                  notify you before your information becomes subject to
                  different privacy and security policies and practices.
                </p>
              </div>
            </div>
          </section>

          {/* Data that is Not Personal Data */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Data that is Not Personal Data
            </h2>
            <p>
              We may create aggregated, de-identified or anonymized data from
              the Personal Data we collect, including by removing information
              that makes the data personally identifiable to a particular user.
              We may use such aggregated, de-identified or anonymized data and
              share it with third parties for our lawful business purposes,
              including to analyze, build and improve the Services and promote
              our business, provided that we will not share such data in a
              manner that could identify you.
            </p>
          </section>

          {/* Tracking Tools and Opt-Out */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Tracking Tools and Opt-Out
            </h2>
            <p className="mb-4">
              The Services use cookies and similar technologies such as pixel
              tags, web beacons, clear GIFs and JavaScript (collectively,
              "Cookies") to enable our servers to recognize your web browser,
              tell us how and when you visit and use our Services, analyze
              trends, learn about our user base and operate and improve our
              Services. Cookies are small pieces of data– usually text files –
              placed on your computer, tablet, phone or similar device when you
              use that device to access our Services. We may also supplement the
              information we collect from you with information received from
              third parties, including third parties that have placed their own
              Cookies on your device(s).
            </p>
            <p className="mb-4">
              Please note that because of our use of Cookies, the Services do
              not support "Do Not Track" requests sent from a browser at this
              time.
            </p>

            <h3 className="text-xl font-semibold mb-3">
              Types of Cookies We Use
            </h3>
            <div className="space-y-4 ml-4">
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p>
                  Essential Cookies are required for providing you with features
                  or services that you have requested. For example, certain
                  Cookies enable you to log into secure areas of our Services.
                  Disabling these Cookies may make certain features and services
                  unavailable.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Functional Cookies</h4>
                <p>
                  Functional Cookies are used to record your choices and
                  settings regarding our Services, maintain your preferences
                  over time and recognize you when you return to our Services.
                  These Cookies help us to personalize our content for you,
                  greet you by name and remember your preferences (for example,
                  your choice of language or region, search filters, and dark
                  mode preference).
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Performance/Analytical Cookies
                </h4>
                <p className="mb-2">
                  Performance/Analytical Cookies allow us to understand how
                  visitors use our Services. They do this by collecting
                  information about the number of visitors to the Services, what
                  pages visitors view on our Services and how long visitors are
                  viewing pages on the Services. Performance/Analytical Cookies
                  also help us measure the performance of our advertising
                  campaigns in order to help us improve our campaigns and the
                  Services' content for those who engage with our advertising.
                </p>
                <p>
                  For example, Google LLC ("Google") uses cookies in connection
                  with its Google Analytics services. Google's ability to use
                  and share information collected by Google Analytics about your
                  visits to the Services is subject to the Google Analytics
                  Terms of Use and the Google Privacy Policy. You have the
                  option to opt-out of Google's use of Cookies by visiting{" "}
                  <a
                    href="https://www.google.com/privacy_ads.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    www.google.com/privacy_ads.html
                  </a>{" "}
                  or the Google Analytics Opt-out Browser Add-on at{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    https://tools.google.com/dlpage/gaoptout/
                  </a>
                  .
                </p>
              </div>
            </div>

            <p className="mt-4">
              You can decide whether or not to accept Cookies through your
              internet browser's settings. Most browsers have an option for
              turning off the Cookie feature, which will prevent your browser
              from accepting new Cookies, as well as (depending on the
              sophistication of your browser software) allow you to decide on
              acceptance of each new Cookie in a variety of ways. You can also
              delete all Cookies that are already on your device. If you do
              this, however, you may have to manually adjust some preferences
              every time you visit our website and some of the Services and
              functionalities may not work.
            </p>
            <p className="mt-4">
              To explore what Cookie settings are available to you, look in the
              "preferences" or "options" section of your browser's menu. To find
              out more information about Cookies, including information about
              how to manage and delete Cookies, please visit{" "}
              <a
                href="http://www.allaboutcookies.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                http://www.allaboutcookies.org/
              </a>{" "}
              or{" "}
              <a
                href="https://ico.org.uk/for-the-public/online/cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                https://ico.org.uk/for-the-public/online/cookies/
              </a>{" "}
              if you are located in the European Union.
            </p>
          </section>

          {/* Data Security and Retention */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Data Security and Retention
            </h2>
            <p className="mb-4">
              We seek to protect your Personal Data from unauthorized access,
              use and disclosure using appropriate physical, technical,
              organizational and administrative security measures based on the
              type of Personal Data and how we are processing that data. You
              should also help protect your data by appropriately selecting and
              protecting your password and/or other sign-on mechanism; limiting
              access to your computer or device and browser; and signing off
              after you have finished accessing your account. Although we work
              to protect the security of your account and other data that we
              hold in our records, please be aware that no method of
              transmitting data over the internet or storing data is completely
              secure.
            </p>
            <p>
              We retain Personal Data about you for as long as you have an open
              account with us or as otherwise necessary to provide you with our
              Services. In some cases we retain Personal Data for longer, if
              doing so is necessary to comply with our legal obligations,
              resolve disputes or collect fees owed, or is otherwise permitted
              or required by applicable law, rule or regulation. We may further
              retain information in an anonymous or aggregated form where that
              information would not identify you personally.
            </p>
          </section>

          {/* Personal Data of Children */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Personal Data of Children
            </h2>
            <p>
              As noted in the Terms of Service, we do not knowingly collect or
              solicit Personal Data about children under 13 years of age; if you
              are a child under the age of 13, please do not attempt to register
              for or otherwise use the Services or send us any Personal Data. If
              we learn we have collected Personal Data from a child under 13
              years of age, we will delete that information as quickly as
              possible. If you believe that a child under 13 years of age may
              have provided Personal Data to us, please contact us at{" "}
              <a
                href="mailto:hi@opensox.ai"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                hi@opensox.ai
              </a>
              .
            </p>
          </section>

          {/* State Law Privacy Rights */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              State Law Privacy Rights
            </h2>

            <h3 className="text-xl font-semibold mb-3">
              California Resident Rights
            </h3>
            <p className="mb-4">
              Under California Civil Code Sections 1798.83-1798.84, California
              residents are entitled to contact us to prevent disclosure of
              Personal Data to third parties for such third parties' direct
              marketing purposes; in order to submit such a request, please
              contact us at{" "}
              <a
                href="mailto:hi@opensox.ai"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                hi@opensox.ai
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold mb-3">
              Nevada Resident Rights
            </h3>
            <p>
              If you are a resident of Nevada, you have the right to opt-out of
              the sale of certain Personal Data to third parties who intend to
              license or sell that Personal Data. You can exercise this right by
              contacting us at{" "}
              <a
                href="mailto:hi@opensox.ai"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                hi@opensox.ai
              </a>{" "}
              with the subject line "Nevada Do Not Sell Request" and providing
              us with your name and the email address associated with your
              account.
            </p>
          </section>

          {/* European Union and United Kingdom Data Subject Rights */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              European Union and United Kingdom Data Subject Rights
            </h2>

            <h3 className="text-xl font-semibold mb-3">EU and UK Residents</h3>
            <p className="mb-4">
              If you are a resident of the European Union ("EU"), United Kingdom
              ("UK"), Lichtenstein, Norway or Iceland, you may have additional
              rights under the EU or UK General Data Protection Regulation (the
              "GDPR") with respect to your Personal Data, as outlined below.
            </p>
            <p className="mb-4">
              For this section, we use the terms "Personal Data" and
              "processing" as they are defined in the GDPR, but "Personal Data"
              generally means information that can be used to individually
              identify a person, and "processing" generally covers actions that
              can be performed in connection with data such as collection, use,
              storage and disclosure. Opensox AI will be the controller of your
              Personal Data processed in connection with the Services.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Personal Data Use and Processing Grounds
            </h3>
            <p className="mb-4">
              We will only process your Personal Data if we have a lawful basis
              for doing so. Lawful bases for processing include consent,
              contractual necessity and our "legitimate interests" or the
              legitimate interest of others, as further described below:
            </p>

            <div className="ml-4 space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Contractual Necessity:</h4>
                <p>
                  We process some Personal Data as a matter of "contractual
                  necessity", meaning that we need to process the data to
                  perform under our Terms of Service with you, which enables us
                  to provide you with the Services. When we process data due to
                  contractual necessity, failure to provide such Personal Data
                  will result in your inability to use some or all portions of
                  the Services that require such data.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Legitimate Interest:</h4>
                <p>
                  We process some Personal Data when we believe it furthers the
                  legitimate interest of us or third parties. Examples of these
                  legitimate interests include (as described in more detail
                  above):
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Providing, customizing and improving the Services.</li>
                  <li>Marketing the Services.</li>
                  <li>Corresponding with you.</li>
                  <li>Meeting legal requirements and enforcing legal terms.</li>
                  <li>Completing corporate transactions.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Consent:</h4>
                <p>
                  In some cases, we process Personal Data based on the consent
                  you expressly grant to us at the time we collect such data.
                  When we process Personal Data based on your consent, it will
                  be expressly indicated to you at the point and time of
                  collection.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Other Processing Grounds:
                </h4>
                <p>
                  From time to time we may also need to process Personal Data to
                  comply with a legal obligation, if it is necessary to protect
                  the vital interests of you or other data subjects, or if it is
                  necessary for a task carried out in the public interest.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              EU Data Subject Rights
            </h3>
            <p className="mb-4">
              You have certain rights with respect to your Personal Data,
              including those set forth below. For more information about these
              rights, or to submit a request, please email us at{" "}
              <a
                href="mailto:hi@opensox.ai"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                hi@opensox.ai
              </a>
              . Please note that in some circumstances, we may not be able to
              fully comply with your request, such as if it is frivolous or
              extremely impractical, if it jeopardizes the rights of others, or
              if it is not required by law, but in those circumstances, we will
              still respond to notify you of such a decision. In some cases, we
              may also need you to provide us with additional information, which
              may include Personal Data, if necessary to verify your identity
              and the nature of your request.
            </p>

            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong>Access:</strong> You can request more information about
                the Personal Data we hold about you and request a copy of such
                Personal Data. You can also access certain of your Personal Data
                by logging on to your account.
              </li>
              <li>
                <strong>Rectification:</strong> If you believe that any Personal
                Data we are holding about you is incorrect or incomplete, you
                can request that we correct or supplement such data. You can
                also correct some of this information directly by logging on to
                your account.
              </li>
              <li>
                <strong>Erasure:</strong> You can request that we erase some or
                all of your Personal Data from our systems.
              </li>
              <li>
                <strong>Withdrawal of Consent:</strong> If we are processing
                your Personal Data based on your consent (as indicated at the
                time of collection of such data), you have the right to withdraw
                your consent at any time. Please note, however, that if you
                exercise this right, you may have to then provide express
                consent on a case-by-case basis for the use or disclosure of
                certain of your Personal Data, if such use or disclosure is
                necessary to enable you to utilize some or all of our Services.
              </li>
              <li>
                <strong>Portability:</strong> You can ask for a copy of your
                Personal Data in a machine-readable format. You can also request
                that we transmit the data to another controller where
                technically feasible.
              </li>
              <li>
                <strong>Objection:</strong> You can contact us to let us know
                that you object to the further use or disclosure of your
                Personal Data for certain purposes, such as for direct marketing
                purposes.
              </li>
              <li>
                <strong>Restriction of Processing:</strong> You can ask us to
                restrict further processing of your Personal Data.
              </li>
              <li>
                <strong>Right to File Complaint:</strong> You have the right to
                lodge a complaint about Opensox AI's practices with respect to
                your Personal Data with the supervisory authority of your
                country or EU Member State. A list of Supervisory Authorities is
                available here:{" "}
                <a
                  href="https://edpb.europa.eu/about-edpb/board/members_en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  https://edpb.europa.eu/about-edpb/board/members_en
                </a>
                .
              </li>
            </ul>
          </section>

          {/* Changes to this Privacy Policy */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Changes to this Privacy Policy
            </h2>
            <p>
              We're constantly trying to improve our Services, so we may need to
              change this Privacy Policy from time to time, but we will alert
              you to any such changes by placing a notice on the Opensox AI
              website, by sending you an email and/or by some other means.
              Please note that if you've opted not to receive legal notice
              emails from us (or you haven't provided us with your email
              address), those legal notices will still govern your use of the
              Services, and you are still responsible for reading and
              understanding them. If you use the Services after any changes to
              the Privacy Policy have been posted, that means you agree to all
              of the changes. Use of information we collect is subject to the
              Privacy Policy in effect at the time such information is
              collected.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Contact Information
            </h2>
            <p>
              If you have any questions or comments about this Privacy Policy,
              the ways in which we collect and use your Personal Data or your
              choices and rights regarding such collection and use, please do
              not hesitate to contact us at:
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

"use client";

import React from "react";
import Link from "next/link";

import Footer from "@/components/landing-sections/footer";
import {
  ReturningMemberOffer,
  useReturningMemberOffer,
} from "@/components/payment/ReturningMemberOffer";
import PrimaryButton from "@/components/ui/custom-button";
import Header from "@/components/ui/header";

const Pitch = () => {
  const eligible = useReturningMemberOffer(
    process.env.NEXT_PUBLIC_YEARLY_PREMIUM_PLAN_ID,
  );

  return (
    <>
      <main className="w-full overflow-hidden flex flex-col items-center justify-center relative pt-24 md:pt-28">
        <Header
          title={
            <>
              <span className="font-semibold [font-family:Helvetica,Arial,sans-serif]">
                opensox manifesto
              </span>
            </>
          }
        />
        <div className="flex flex-col bg-surface-secondary/20 backdrop-blur-xl relative w-full">
          <div className="py-8 border-b border-border px-4 lg:px-[60px]">
            <div className="max-w-4xl mx-auto space-y-8 text-text-secondary font-normal text-lg lg:text-xl">
              <p>
                from my journey of{" "}
                <Link
                  href="/blog/my-work-so-far"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover underline"
                >
                  open source
                </Link>
                ,{" "}
                <Link
                  href="/blog/my-work-in-building-in-public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover underline"
                >
                  building in public
                </Link>{" "}
                and{" "}
                <Link
                  href="/blog/my-work-in-indie-hacking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover underline"
                >
                  indie hacking
                </Link>
                , i&apos;ve realized these are the most common problems
                you&apos;re going to face if you are starting these (or any one
                of these):
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  1. lack of exposure
                </h2>
                <p>exposure is knowing what&apos;s possible.</p>
                <p>
                  when i started open source, building in public, and indie
                  hacking, i didn&apos;t even know what was possible.
                </p>
                <p>
                  hence i made wrong decisions and wasted a lot of time and
                  effort.
                </p>
                <p>the same thing happens to you when you start with these.</p>
                <p>
                  if you don&apos;t know what&apos;s possible, you won&apos;t even be
                  able to try something worthy no matter how talented,
                  smart, or hardworking you are.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  2. lack of feedback
                </h2>
                <p>you hustle alone in a corner.</p>
                <p>
                  doing trial and error. when you make a mistake, you won&apos;t
                  realize it until you face the painful consequences.
                </p>
                <p>and that&apos;s the problem with almost every beginner.</p>
                <p>
                  there&apos;s no way someone or something can tell you
                  &quot;hey, this decision you took may not be very good because
                  of X reason. try this instead&quot;.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  3. lack of selling skills
                </h2>
                <p>
                  being a cracked engineer or building a product is one thing,
                  and being able to show the world your capabilities and sell
                  yourself or your product is another.
                </p>
                <p>
                  most people in tech focus on the first part and ignore the
                  second one.
                </p>
                <p>
                  you can't win in open source, building in public, and indie
                  hacking, or in pretty much anything, if you don't know how to
                  sell.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  4. lack of problem solving
                </h2>
                <p>not having a proper mental structure to solve a problem.</p>
                <p>
                  when you don't know how to solve a problem from first
                  principles, you keep on shooting in the dark, hoping something
                  will work.
                </p>
              </div>

              <div className="border-t border-border pt-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  so the goal of opensox is to help you eliminate these 4
                  problems.
                </h2>
                <p>here&apos;s how.</p>
                <ul className="space-y-3 list-disc pl-6">
                  <li>
                    onboarding call. with me. to set up the direction. for your
                    goals.
                  </li>
                  <li>
                    feedback and guidance on{" "}
                    <strong>
                      anything related to open source, building in public, and
                      indie hacking
                    </strong>
                    . be it programs like GSoC, remote opportunities at open
                    source startups, building an audience, or building a
                    product.
                  </li>
                  <li>
                    a highly active, small token, limited community. full of
                    cracked engineers. where you get personal attention from me.
                    24 * 7.
                  </li>
                  <li>weekly live sessions. on the topics of your choice.</li>
                  <li>
                    unlimited QnAs. ask anything. anytime. directly to me. no TA
                    in the middle.
                  </li>
                  <li>
                    dedicated content. on open source. building in public. indie
                    hacking. that you can&apos;t find anywhere else on the
                    internet. only for opensox pro members.
                  </li>
                  <li>
                    hand-picked open source projects. cut the BS. and contribute
                    from day 1.
                  </li>
                  <li>
                    recordings of all the previous weekly sessions. organized by
                    the topics. and timestamps.
                  </li>
                  <li>
                    wanna ask something personal? open a private thread anytime.
                  </li>
                  <li>
                    latest updates. on anything related to open source, jobs,
                    tech, etc.
                  </li>
                  <li>daily stand-ups. for accountability.</li>
                  <li>
                    anything else that i learn, do, or find valuable. i share with
                    my members.
                  </li>
                  <li>
                    all of this with no chaos. just a few limited and quality
                    people.
                  </li>
                  <li>
                    + any upcoming feature in opensox pro will be yours. without
                    a single dime of extra money.
                  </li>
                </ul>
                <p>
                  see a{" "}
                  <Link
                    href="/pricing#explore-features"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline"
                  >
                    glimpse of what you get in opensox pro
                  </Link>
                </p>
              </div>

              <div
                id="my-scale"
                className="border-t border-border pt-8 space-y-4"
              >
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  <a
                    href="/pitch#my-scale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-purple-light decoration-brand-purple-light decoration-1 transition-colors"
                  >
                    but how will you be able to give personal attention and do
                    all of that if the number of opensox pro members grows in
                    the future?
                  </a>
                </h2>
                <p>
                  i thought about this a lot. and made a hard decision to{" "}
                  <Link
                    href="/blog/stay-small"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover underline"
                  >
                    stay small
                  </Link>
                  .
                </p>
                <p>how small?</p>
                <p className="text-brand-purple-light">
                  30 people. a month. only.
                </p>
                <p>but why 30?</p>
                <p>
                  i let 30 new people in each month so i can still answer you
                  myself. your access runs the full year on Pro, or four years
                  on Pro+.
                </p>
                <p>
                  everything you get, like weekly sessions, stand-ups, QnAs, etc.,
                  continues the whole time.
                </p>
                <p>nothing changes in the value you get.</p>
                <p>
                  30 people a month is the cap, so i never take on more people than
                  i can help personally.
                </p>
                <p></p>
              </div>

              <div className="border-t border-border pt-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  how to make the best of opensox?
                </h2>
                <p>
                  opensox pro isn&apos;t a course or program where 100
                  pre-recorded videos will be thrown at you and you&apos;ll be
                  required to watch them and later receive a certificate to add to
                  your linkedin.
                </p>
                <p>
                  opensox pro is a small and effective ecosystem for limited
                  people.
                </p>
                <p>
                  here you make efforts, you get stuck, you get the instant help
                  and feedback, you improve.
                </p>
                <p>
                  here you&apos;re not taught a technology the way class 10th
                  follows a syllabus. you learn how to learn a technology
                  on your own.
                </p>
                <p>the way a true engineer does.</p>
                <p>
                  here the community pushes you to put in the best efforts of
                  your life.
                </p>
                <p>here obsession drives people, not a fixed class schedule.</p>
              </div>

              <div className="border-t border-border pt-8 space-y-6">
                <div id="invest" className="space-y-4 text-center">
                  <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                    how to invest?
                  </h2>
                  {eligible ? (
                    <div className="flex justify-center">
                      <ReturningMemberOffer />
                    </div>
                  ) : null}
                  <div className="flex justify-center">
                    <Link
                      href="/pricing#pro-price-card"
                      className="w-full max-w-[180px]"
                    >
                      <PrimaryButton classname="w-full">im in</PrimaryButton>
                    </Link>
                  </div>
                </div>

                <div className="border-t border-border"></div>

                <p>
                  wanna ask something? shoot it here:{" "}
                  <a
                    href="mailto:opensoxlabs@gmail.com"
                    className="text-link hover:text-link-hover underline"
                  >
                    opensoxlabs@gmail.com
                  </a>{". "}
                  i reply within 2 hrs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pitch;

"use client";

import React from "react";
import Link from "next/link";

import Footer from "@/components/landing-sections/footer";
import PrimaryButton from "@/components/ui/custom-button";
import Header from "@/components/ui/header";

const Pitch = () => {
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
                from{" "}
                <Link
                  href="/blog/my-journey-of-open-source"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover underline"
                >
                  my journey of open source
                </Link>
                , i realized there are 4 of the biggest career-destroying
                problems that someone who starts their tech journey faces.
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  1. lack of exposure
                </h2>
                <p>my definition of exposure is &quot;knowing what&apos;s possible&quot;.</p>
                <p>when i started open source i didn&apos;t even know what&apos;s possible.</p>
                <p>
                  hence i made wrong decisions and wasted a lot of time and
                  effort.
                </p>
                <p>same thing happens with everyone who starts with open source.</p>
                <p>
                  if you don&apos;t know what&apos;s possible, you won&apos;t be
                  able to even try something worthy no matter how talented,
                  smart, or hardworking you are.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  2. lack of feedback
                </h2>
                <p>getting the exposure is sometimes easy.</p>
                <p>
                  i joined twitter and made lots of good friends there and that
                  way i was able to get exposure to the outer world.
                </p>
                <p>but i was still trying alone.</p>
                <p>
                  trial and error. if i made a mistake, i didn&apos;t realize
                  it until i faced the painful consequences.
                </p>
                <p>and that&apos;s the problem with almost all college students.</p>
                <p>
                  there&apos;s no way someone or something can tell them
                  &quot;hey, this decision you took may not be very good because
                  of X reason. try this instead&quot;.
                </p>
                <p>
                  so they become the victims of their own trial and error loop.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  3. lack of selling skills
                </h2>
                <p>
                  nikola tesla died as a poor scientist in a small compartment
                  while thomas edison enjoyed money throughout his life and died
                  with $12M (today&apos;s value $263M) in his assets.
                </p>
                <p>
                  not because thomas edison was smarter than nikola tesla but
                  because he knew how to sell.
                </p>
                <p>how to show off.</p>
                <p>
                  being a cracked engineer is one thing and being able to show
                  the world your capabilities is a different game.
                </p>
                <p>
                  most people in tech focus on the first part and ignore the
                  second one.
                </p>
                <p>
                  and soon enough they realize people who are less talented, less smart,
                  and less hardworking than them are getting salary hikes,
                  starting their own startups, raising VC capital, moving to SF,
                  retiring their parents, buying the dream house and car and
                  doing everything that life can offer.
                </p>
                <p>
                  the difference was not the technical skills but the selling
                  skills.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  4. lack of problem solving
                </h2>
                <p>
                  whenever the term &quot;problem solving&quot; comes up, most
                  people automatically assume &quot;DSA&quot;,
                  &quot;Maths&quot;, &quot;Logic&quot;, etc.
                </p>
                <p>
                  in reality these things are abstractions of something under
                  the hood.
                </p>
                <p>
                  fundamentally, there&apos;s only one problem-solving skill:
                  first principles.
                </p>
                <p>
                  first principles are the mother of every innovation we see
                  around us.
                </p>
                <p>
                  most college students don&apos;t even have basic critical
                  thinking.
                </p>
                <p>and AI and vibe coding have made it worse.</p>
                <p>they can&apos;t ask a question properly (my DMs are the proof).</p>
                <p>they can&apos;t implement a feature without using AI.</p>
                <p>
                  they can&apos;t learn a piece of tech without an 11-hr-long
                  tutorial or blog.
                </p>
                <p>
                  they can&apos;t build a project without looking at a
                  tutorial.
                </p>
                <p>
                  and then they blame the market for not being able to get
                  opportunities.
                </p>
              </div>

              <div className="border-t border-border pt-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  so the goal of opensox is to help you eliminate these 4
                  problems from your life.
                </h2>
                <p>here&apos;s how.</p>
                <ul className="space-y-3 list-disc pl-6">
                  <li>
                    onboarding call. with me. to set up the direction. for your
                    goals in open source.
                  </li>
                  <li>
                    feedback and guidance on <strong>anything related to open source</strong>.
                    be it programs like GSoC, LFX, Summer of Bitcoin or remote
                    jobs and internships at commercial open source startups.
                  </li>
                  <li>
                    a highly active, small token, limited community. full of
                    cracked engineers. where you get personal attention from me.
                    24 * 7 * 365.
                  </li>
                  <li>weekly live sessions. on the topics of your choice.</li>
                  <li>
                    unlimited QnAs. ask anything. anytime. directly to me. no
                    TA in the middle.
                  </li>
                  <li>
                    weekly contests. on open source. build in public. first
                    principles.
                  </li>
                  <li>
                    dedicated content. on open source. build in public. first
                    principles. that you can&apos;t find anywhere else on the
                    internet. only for opensox pro members.
                  </li>
                  <li>
                    hand-picked open source projects. cut the BS. and
                    contribute from day 1.
                  </li>
                  <li>
                    recordings of all the previous weekly sessions. organized by
                    the topics. and timestamps.
                  </li>
                  <li>wanna ask something personal? open a private thread anytime.</li>
                  <li>
                    latest updates. on anything related to open source, jobs,
                    tech, etc.
                  </li>
                  <li>daily stand-ups. for accountability.</li>
                  <li>
                    anything else that i learn. do. find valuable. i share. with
                    my people.
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
                    glimpse of what you get in the opensox pro
                  </Link>
                </p>
              </div>

              <div id="my-scale" className="border-t border-border pt-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  <a
                    href="/pitch#my-scale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-purple-light decoration-brand-purple-light decoration-1 transition-colors"
                  >
                    but how will you be able to give personal attention and do all
                    of that if the number of opensox pro members grows in the
                    future?
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
                <p className="text-brand-purple-light">83 people. a month. only.</p>
                <p>but why 83?</p>
                <p>
                  as per the calculations on the number of current members in
                  the opensox pro community,
                </p>
                <p>10% of the members are highly active.</p>
                <p>30% are active.</p>
                <p>40% are occasionally active.</p>
                <p>and the rest 20% join as a hobby.</p>
                <p>they&apos;re already professionals in something else.</p>
                <p>
                  so 83 is the number i can manage. and give you my personal
                  attention.
                </p>
              </div>

              <div className="border-t border-border pt-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                  how to make the best of opensox?
                </h2>
                <p>
                  opensox pro isn&apos;t a course or program where 100
                  pre-recorded videos will be thrown at you and you&apos;ll be
                  required to watch and later receive a certificate to
                  add to your linkedin.
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
                  here you&apos;re not taught the technologies like the syllabus
                  of class 10th but you engage in methods to learn a
                  technology on your own.
                </p>
                <p>the way a true engineer does.</p>
                <p>
                  here the community pushes you to put in the best efforts of
                  your life.
                </p>
                <p>
                  here obsession drives people, not a fixed class
                  schedule.
                </p>
              </div>

              <div className="border-t border-border pt-8 space-y-6">
                <div id="invest" className="space-y-4 text-center">
                  <h2 className="text-2xl lg:text-3xl font-bold text-brand-purple-light tracking-tight leading-tight [font-family:Helvetica,Arial,sans-serif]">
                    how to invest?
                  </h2>
                  <div className="flex justify-center">
                    <Link href="/pricing#pro-price-card" className="w-full max-w-[180px]">
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
                  </a>{" "}
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

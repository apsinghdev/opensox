"use client";
import Footer from "@/components/landing-sections/footer";
import Header from "@/components/ui/header";
import { motion } from "framer-motion";
import { CornerDownRight, Target } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import PrimaryButton from "@/components/ui/custom-button";
import PaymentFlow from "@/components/payment/PaymentFlow";
import { usePathname } from "next/navigation";

const Pitch = () => {
  const pathname = usePathname();
  const premiumPlanId = process.env.NEXT_PUBLIC_YEARLY_PREMIUM_PLAN_ID;
  const planIdOk =
    typeof premiumPlanId === "string" && premiumPlanId.length > 0;

  const callbackUrl = `${pathname}#invest`;

  useEffect(() => {
    // handle any hash, not just #invest
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // remove the #
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <main className="w-full overflow-hidden flex flex-col items-center justify-center relative">
        <Header
          title={
            <>
              <span className="text-brand-purple-light">&quot;</span>
              opensox ai users are its investors
              <span className="text-brand-purple-light">&quot;</span>
            </>
          }
        />
        <div className="flex flex-col bg-[#151515]/20 backdrop-blur-xl relative w-full">
          {/* Introduction */}
          <div className="h-full pv relative">
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.4,
                }}
                className="max-w-4xl mx-auto space-y-6 text-text-secondary font-medium lowercase"
              >
                <p className="text-lg lg:text-xl">
                  my philosophy to build opensox.ai is simple.
                </p>
                <p className="text-lg lg:text-xl">
                  everyone brings outside investors, and their investors tell
                  them what to do. i consider the user of opensox.ai (basically
                  you) an investor of opensox.ai and you tell me what to do.
                </p>
                <p className="text-lg lg:text-xl">
                  so, following that, everyone writes a pitch for their
                  investors to invest in their startups. likewise, i am writing
                  a pitch for you to invest in opensox.ai.
                </p>
              </motion.div>
            </div>
          </div>

          {/* The Pitch */}
          <div className="h-full relative border-b border-[#252525]">
            <div className="py-8 border-b border-[#252525]">
              <motion.h2
                id="the-pitch"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.5,
                }}
                className="text-center text-3xl lg:text-4xl tracking-tight font-bold text-brand-purple-light px-4 font-mono"
              >
                the pitch
              </motion.h2>
            </div>

            {/* Mission Statement */}
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.6,
                }}
                className="max-w-4xl mx-auto space-y-4"
              >
                <h3
                  id="mission-statement"
                  className="text-2xl lg:text-3xl font-medium text-brand-purple-light font-mono"
                >
                  mission statement
                </h3>
                <p className="text-text-secondary font-medium text-lg lg:text-xl lowercase">
                  the mission is{" "}
                  <span className="underline decoration-brand-purple-light">
                    to provide you the most genuine and authentic help
                  </span>{" "}
                  to get the opportunities (jobs, internships, gsoc, lfx, etc)
                  in open source. i&apos;m creating a product that i wish
                  existed 4 years ago when i started doing open source.
                </p>
              </motion.div>
            </div>

            {/* My Goal */}
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.7,
                }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <h3
                  id="my-goal"
                  className="text-2xl lg:text-3xl font-medium text-brand-purple-light font-mono"
                >
                  my goal
                </h3>
                <p className="text-text-secondary font-medium text-lg lg:text-xl lowercase">
                  when i started open source 4 years ago, i had no one to give
                  me timely human (yes, it&apos;s important) feedback, so i had
                  to learn by trial and error - this took a lot of time, effort,
                  and painful moments.
                </p>
                <p className="text-text-secondary font-medium text-lg lg:text-xl lowercase">
                  so my goal is to build a product that:
                </p>
                <ul className="space-y-3 [&>li]:flex [&>li]:items-start [&>li]:gap-4 [&>li]:text-text-secondary [&>li]:font-medium [&>li]:text-lg [&>li]:lowercase">
                  <li>
                    <CornerDownRight className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>gives you timely human feedback 24/7</span>
                  </li>
                  <li>
                    <CornerDownRight className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>
                      keeps you updated with everything happening in the open
                      source ecosystem
                    </span>
                  </li>
                  <li>
                    <CornerDownRight className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>keeps you aligned with your objectives</span>
                  </li>
                  <li>
                    <CornerDownRight className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>gives you the freedom to ask anything anytime.</span>
                  </li>
                </ul>
                <p className="text-text-secondary font-medium text-lg lg:text-xl pt-4 lowercase">
                  <strong className="text-brand-purple-light">
                    the bottom line
                  </strong>{" "}
                  - my goal is to just save your time. my goal is to make you
                  achieve things in 1 year that took me 3.
                </p>
              </motion.div>
            </div>

            {/* The Plan */}
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.8,
                }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <h3
                  id="the-plan"
                  className="text-2xl lg:text-3xl font-medium text-brand-purple-light font-mono"
                >
                  the plan
                </h3>
                <p className="text-text-secondary font-medium text-lg lg:text-xl lowercase">
                  so what&apos;s my plan for this goal?
                </p>
                <p className="text-text-secondary font-medium text-lg lg:text-xl lowercase">
                  here it is:
                </p>
                <ul className="space-y-4 [&>li]:flex [&>li]:items-start [&>li]:gap-4 [&>li]:text-text-secondary [&>li]:font-medium [&>li]:text-lg [&>li]:lowercase">
                  <li>
                    <Target className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>
                      <strong className="text-text-primary">
                        for timely human feedback 24/7
                      </strong>{" "}
                      = a private slack channel
                    </span>
                  </li>
                  <li>
                    <Target className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>
                      <strong className="text-text-primary">
                        to keep you updated with open source
                      </strong>{" "}
                      = pro newsletters and opensox.ai pro platform
                    </span>
                  </li>
                  <li>
                    <Target className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>
                      <strong className="text-text-primary">
                        for weekly session
                      </strong>{" "}
                      = weekly session every sunday, 10 pm ist.
                    </span>
                  </li>
                  <li>
                    <Target className="size-5 flex-shrink-0 text-[#a472ea] mt-1" />
                    <span>
                      <strong className="text-text-primary">
                        for freedom to ask anything anytime
                      </strong>{" "}
                      = onboarding call + slack channel + pre-session 1:1 (every
                      week).
                    </span>
                  </li>
                </ul>
                <p className="text-text-secondary font-medium text-lg lg:text-xl pt-4 lowercase">
                  it is just the start, every single day i&apos;m working to
                  bring the best possible service to you.
                </p>
              </motion.div>
            </div>

            {/* Philosophies */}
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0.9,
                }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <h3
                  id="philosophies"
                  className="text-2xl lg:text-3xl font-medium text-brand-purple-light font-mono"
                >
                  philosophies i follow
                </h3>

                {/* Philosophy #1 */}
                <div className="space-y-4">
                  <h4
                    id="stay-small-stay-effective"
                    className="text-xl lg:text-2xl font-medium text-brand-purple-light font-mono"
                  >
                    #1 stay small. stay effective.
                  </h4>
                  <div className="space-y-4 text-text-secondary font-medium text-lg lowercase">
                    <p>while building opensox.ai, i had two choices.</p>
                    <p>
                      the first one is &quot;play big. grow huge,&quot; and the
                      second one is &quot;stay small. stay effective&quot;
                    </p>
                    <div className="space-y-3 lowercase">
                      <p>
                        <span className="underline decoration-brand-purple-light decoration-2">
                          if i go by the first choice,
                        </span>
                        <br></br>
                        <br></br>
                        i&apos;ll have to raise funding from the investors, and
                        to keep those investors happy, i&apos;ll have to grow -
                        that&apos;s the only metric they understand.
                        <br></br>
                        <br></br>
                        and then i&apos;ll have to grow in terms of number of
                        users, monthly volume, etc. and when there will be
                        millions of users, i will not be able to provide the
                        users the most important thing they need — the genuine
                        and authentic help by a human (me) time to time.
                        <br></br>
                        <br></br>
                        because a human has a limit on how many people he can
                        help in a single day. and this defeats my main mission
                        statement with which i started in the first place.
                      </p>
                      <div className="border-b border-[#252525] my-4"></div>
                      <p>
                        <span className="underline decoration-brand-purple-light decoration-2">
                          now the second choice — stay small. stay effective.
                        </span>
                      </p>
                      <p>
                        if i go with this approach, i&apos;ll have to sacrifice
                        those fancy dreams of raising millions, being on the
                        front page of magazines, having millions of users, etc.
                        <br></br>
                        <br></br>
                        but the good part is i&apos;ll be able to stay genuine
                        and authentic. you will be able to ping me anytime. even
                        tho, i&apos;ll serve a very tiny portion of the users
                        but i&apos;ll be able to do so at my best. also, because
                        no one is forcing me to grow, i could stay small and
                        effective forever.
                      </p>
                      <p className="font-bold underline decoration-brand-purple-light decoration-2">
                        so i choose the #2 choice. why?
                      </p>
                      <p className="text-brand-purple-light px-4 py-3">
                        because i&apos;d rather choose serving a hundred people
                        by providing them the best value in the market than
                        serving a million with an avg sub-standard product.
                      </p>
                      <p className="text-text-tertiary italic">
                        (for the same reasons, i&apos;ve rejected an{" "}
                        <Link
                          href="https://x.com/ajeetunc/status/1963503678545170571?s=20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link hover:opacity-80 underline"
                        >
                          investment offer
                        </Link>{" "}
                        very recently)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Philosophy #2 */}
                <div className="space-y-4">
                  <h4
                    id="go-beyond-what-you-promise"
                    className="text-xl lg:text-2xl font-medium text-brand-purple-light font-mono"
                  >
                    #2 go beyond what you promise.
                  </h4>
                  <div className="space-y-4 text-text-secondary font-medium text-lg lowercase">
                    <p>
                      even though i focus primarily on open source, we talk
                      about anything in the opensox community, be it learning
                      ai/ml, building projects, building online presence (highly
                      important), getting jobs/opportunities, and a lot.
                    </p>
                    <p>
                      my personal goal is to always deliver more than you
                      expected to make it worth it for you to invest in
                      opensox.ai.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* The Process */}
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 1.0,
                }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <h3
                  id="so-how-small"
                  className="text-2xl lg:text-3xl font-medium text-brand-purple-light font-mono"
                >
                  so how small?
                </h3>
                <p className="text-text-secondary font-medium text-lg lowercase">
                  after calculating everything, i&apos;ve come to the conclusion
                  that i can serve at max{" "}
                  <span className="text-brand-purple-light">
                    5,000 investors in a single year
                  </span>
                  .{" "}
                </p>
                <p className="text-text-secondary font-medium text-lg lowercase">
                  that translates to only ~{" "}
                  <span className="text-brand-purple-light">
                    417 investors a month
                  </span>
                  .
                </p>
                <p className="text-text-secondary font-medium text-lg lowercase">
                  so that means, at max i can only mentor{" "}
                  <span className="text-brand-purple-light">
                    417 investors a month
                  </span>{" "}
                  and at max{" "}
                  <span className="text-brand-purple-light">
                    5000 investors a year
                  </span>{" "}
                  without sacrificing the quality and authenticity.
                </p>
                <p className="text-text-primary font-medium text-xl lg:text-2xl pt-4 lowercase">
                  so it&apos;s simple.
                </p>
                <p className="text-text-primary font-medium text-xl lg:text-2xl lowercase border-2 border-dashed border-brand-purple-light px-4 py-3 rounded-lg inline-block">
                  417 investors. a month. only.
                </p>
              </motion.div>
            </div>

            {/* What Existing Investors Said */}
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 1.1,
                }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <h3
                  id="testimonials"
                  className="text-2xl lg:text-3xl font-medium text-brand-purple-light font-mono"
                >
                  what existing investors said about me?
                </h3>
                <div className="space-y-4 text-text-secondary font-medium text-lg lowercase">
                  <p>
                    check out{" "}
                    <Link
                      href="/pricing#testimonials"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover underline"
                    >
                      reviews
                    </Link>{" "}
                    from investors who&apos;ve invested.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Questions */}
            <div className="py-8 border-b border-[#252525] px-4 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 1.2,
                }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <h3
                  id="questions"
                  className="text-2xl lg:text-3xl font-medium text-brand-purple-light font-mono"
                >
                  questions you may have
                </h3>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <h4
                      id="not-beginner"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      i&apos;m not an absolute beginner, so how does subscribing
                      to opensox.ai make sense to me?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      as i said before, the core goal of opensox.ai is to save
                      your time. so if you try on your own, that&apos;s good
                      too, but in most cases, you&apos;ll learn through trial
                      and error and it may cost you a lot of time.
                      <br></br>
                      <br></br>
                      on the other hand, if you invest in opensox.ai,
                      you&apos;ll have someone (me) to whom you can go to
                      anytime and ask for feedback, and i can tell you
                      &quot;hey, i think this idea won&apos;t work&quot; with a
                      clear reason. and here you&apos;ll be able to avoid a time
                      costing mistake.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="quality-reduce"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      will the quality of your service reduce as you grow?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      never. this is the reason i&apos;m committed to only allow
                      417 investors a month. i can compromise with the growth,
                      revenue, etc, but never with the quality of the service.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="how-opensox-pro-helps"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      how does opensox.ai pro help me?
                    </h4>
                    <ul className="space-y-2 text-text-secondary font-medium text-lg pl-4 lowercase">
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>
                          once you invest in opensox.ai, you&apos;ll immediately
                          get an email with a meet link. that meet will be our
                          onboarding call, in which you and i sit together and
                          talk things through and set our objectives.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>
                          also, you&apos;ll receive the invitation to our
                          internal slack channel, there you&apos;ll receive all
                          the updates like weekly meets, resources, discussions,
                          etc. also, you can ping me there for any doubts.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>
                          at the same time, your pro plan on opensox.ai will get
                          activated, and pro newsletters, pro filters to search
                          open source projects, and other pro features will be
                          unlocked.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>
                          after that, we&apos;ll do weekly sessions where you
                          can ask me anything, and we&apos;ll discuss one
                          particular topic - last week&apos;s was &quot;
                          <Link
                            href="https://www.youtube.com/watch?v=24CdxwRq0PI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link hover:text-link-hover underline"
                          >
                            learning tech from the first principles
                          </Link>
                          &quot;.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>
                          along with this, whatever pro feature/service is
                          added, you&apos;ll get it without any extra charges.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="time-to-results"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      how much time does it take to get the results?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      it is highly subjective because it depends on how much
                      effort you put. but, as per my personal assumption, people
                      who started from zero have started making visible progress
                      within the first month.
                      <br></br>
                      <br></br>
                      for example, satya joined 2 months ago when he was just a
                      beginner, and now he&apos;s making 3-4 good-quality prs
                      every week.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="why-trust"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      why should i trust you?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      in order to check my credibility, you can check my{" "}
                      <Link
                        href="https://gist.github.com/apsinghdev/a19bc3b7e4b188bae30c45ad57c4c47d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:text-link-hover underline"
                      >
                        profile and the work
                      </Link>{" "}
                      i have done so far. and check the{" "}
                      <Link
                        href="/pricing#testimonials"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:text-link-hover underline"
                      >
                        reviews
                      </Link>{" "}
                      of investors who&apos;ve invested.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="alternatives"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      are there any alternatives to what you provide?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      i haven&apos;t found any so far. either people are selling
                      the recorded courses or some pseudo tools like
                      check-ur-github-profile-aura (no hate tho) that don&apos;t
                      seem to be helpful.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="difference-from-course"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      what&apos;s the difference between opensox pro and a
                      course?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      i&apos;ve answered most of it in &quot;how opensox.ai pro
                      can help me&quot;, but if i have to say the difference in
                      brief, then a course is like a dumbbell and opensox.ai pro
                      is like a full-fledged gym with a personal trainer (me).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="for-beginners"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      is it for an absolute beginner?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      yes. (given that you are ready to work hard)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="when-not-to-invest"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      in what cases shouldn&apos;t i invest in opensox pro?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      oh i can tell you some cases when you shouldn&apos;t
                      invest:
                    </p>
                    <ul className="space-y-2 text-text-secondary font-medium text-lg pl-4 lowercase">
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>
                          you&apos;re already an expert in open source
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>you don&apos;t wanna do it fast</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>you wanna learn it the hard way</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CornerDownRight className="size-4 flex-shrink-0 text-[#a472ea] mt-1" />
                        <span>you own 100 acres of land.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4
                      id="best-in-market"
                      className="text-xl font-medium text-brand-purple-light font-mono"
                    >
                      are you the best in the market?
                    </h4>
                    <p className="text-text-secondary font-medium text-lg lowercase">
                      yes. the reasons are given above.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#252525]">
                  <p className="text-text-secondary font-medium text-lg lowercase">
                    my question isn&apos;t here? shoot it here:{" "}
                    <Link
                      href="mailto:hi@opensox.ai"
                      className="text-link hover:text-link-hover underline"
                    >
                      hi@opensox.ai
                    </Link>{" "}
                    i&apos;ll reply within 24 hrs.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* How to Invest */}
            <div
              id="invest"
              className="py-12 border-b border-[#252525] px-4 lg:px-[60px]"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  delay: 1.3,
                }}
                className="max-w-2xl mx-auto space-y-8 text-center"
              >
                <h3 className="text-3xl lg:text-4xl font-medium text-brand-purple-light lowercase font-mono">
                  how to invest in opensox.ai?
                </h3>
                <div className="flex justify-center">
                  {planIdOk ? (
                    <PaymentFlow
                      planId={premiumPlanId}
                      planName="Opensox Pro"
                      description="Annual Subscription"
                      buttonText="Invest"
                      buttonClassName="w-full max-w-md"
                      callbackUrl={callbackUrl}
                      buttonLocation="pitch_page"
                    />
                  ) : (
                    <Link href="/pricing" className="w-full max-w-md">
                      <PrimaryButton classname="w-full">
                        Invest Now
                      </PrimaryButton>
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pitch;

"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSubscription } from "@/hooks/useSubscription";

function PlanLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): JSX.Element {
  const className =
    "text-brand-purple-light hover:underline underline-offset-2";

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

type Week = {
  week: string;
  objective: string;
  todos: ReactNode[];
};

const WEEKS: Week[] = [
  {
    week: "Week 1",
    objective: "Get the fundamentals",
    todos: [
      <>
        Complete modules in the{" "}
        <PlanLink href="/dashboard/sheet">OSS Sheet</PlanLink>.
      </>,
      "70% is theory (what to do and what not to do). 30% is something to implement.",
      "Don't go very deep yet.",
    ],
  },
  {
    week: "Week 2",
    objective: "Explore and find open source projects",
    todos: [
      <>
        In{" "}
        <PlanLink href="https://www.youtube.com/watch?v=bviwfDq-CTo">
          module-3
        </PlanLink>{" "}
        you learned how to explore and find projects. Apply that and find at
        least 2–3.
      </>,
      "Why 2–3? If one project doesn't work out, you can switch without another long hunt.",
      <>
        As a Pro/Pro+ member you also have{" "}
        <PlanLink href="/dashboard/pro/projects">
          Hand-picked OSS projects
        </PlanLink>{" "}
        to explore.
      </>,
    ],
  },
  {
    week: "Week 3",
    objective: "3 tasks on your first project",
    todos: [
      "Task 1 — set up the first project from your list locally.",
      "Task 2 — join its community (Discord, Slack, GitHub Discussions, Matrix, etc.).",
      'Task 3 — introduce yourself. A casual "hi, I\'m here to contribute" is enough. Skip college, address, and life story — nobody reads those paragraphs.',
    ],
  },
  {
    week: "Week 4",
    objective: "Get the first PR merged",
    todos: [
      "Pick an issue in that project.",
      <>
        If you don&apos;t know how, watch{" "}
        <PlanLink href="https://www.youtube.com/watch?v=qJTl0s6_RY4">
          this
        </PlanLink>
        .
      </>,
      "Fix the issue.",
      <>
        To use AI without shipping slop, watch this{" "}
        <PlanLink href="/dashboard/pro/modules/cmss2922r00fd2rd3x6l78kup">
          Pro Module
        </PlanLink>{" "}
        on using AI to implement/fix open source issues.
      </>,
      "Open a PR and ping the maintainer to review it.",
    ],
  },
  {
    week: "Week 5+",
    objective: "Raise the difficulty every week",
    todos: [
      "After the first four weeks, keep increasing the level of issues.",
      "Start small, then pick bigger ones as you go.",
    ],
  },
];

const ProPlanPage = (): JSX.Element | null => {
  const { isPaidUser, isLoading: subscriptionLoading } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    if (!subscriptionLoading && !isPaidUser) {
      router.push("/pricing");
    }
  }, [isPaidUser, subscriptionLoading, router]);

  if (subscriptionLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-ox-content">
        <div
          role="status"
          aria-label="Checking Pro access"
          className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  if (!isPaidUser) {
    return null;
  }

  return (
    <div className="w-full min-h-full bg-ox-content">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12 font-heading font-semibold tracking-tight">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl text-text-primary">
            Pro Plan
          </h1>
          <p className="text-text-secondary text-lg md:text-xl mt-3 leading-relaxed">
            A five-week path from fundamentals to your first merged PR. Then we
            keep leveling up.
          </p>
        </div>

        <ol className="space-y-4">
          {WEEKS.map((week) => (
            <li
              key={week.week}
              className="bg-dash-surface border border-dash-border rounded-xl p-5 md:p-6"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-sm uppercase tracking-tight text-brand-purple-light bg-brand-purple/10 rounded-full px-2.5 py-0.5 shrink-0">
                  {week.week}
                </span>
                <h2 className="text-text-primary text-lg">
                  {week.objective}
                </h2>
              </div>
              <ul className="space-y-2.5 text-base text-text-secondary leading-relaxed">
                {week.todos.map((todo, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-1 rounded-full bg-text-muted shrink-0"
                    />
                    <span>{todo}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-text-muted">
                Stuck? Ping Ajeet in the Discord community.
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 space-y-4">
          <div className="border border-dash-border rounded-xl p-5 md:p-6 space-y-3 text-text-secondary text-base leading-relaxed">
            <p className="text-text-primary">
              Note: Reading this, the weekly plan may look quite easy.
            </p>
            <p>
              But let me make it clear: open source isn&apos;t easy. In your
              journey, you&apos;ll face many problems — not being able to find a
              good project, set it up locally, or find issues, too much
              competition, and so on.
            </p>
            <p>And that&apos;s exactly where I come into the picture.</p>
            <p>
              Whenever you feel stuck and can&apos;t move ahead even after
              trying every method you know, ping me anytime. 24×7×365. I reply
              within 30 min to 1 hour.
            </p>
          </div>
          <div className="border border-brand-purple/30 bg-brand-purple/10 rounded-xl p-5 md:p-6 space-y-3 text-text-secondary text-base leading-relaxed">
            <p className="text-text-primary">Weekly sessions</p>
            <p>
              Along with that, we also do weekly meetings every Sunday at 9 PM
              IST, where you can show up and ask questions, share updates,
              suggest a topic to discuss, or just watch and listen to
              what&apos;s happening.
            </p>
            <p>Thanks!</p>
            <p>See you in the community and weekly sessions!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlanPage;

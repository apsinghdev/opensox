/**
 * Dev-only seed for exercising the Pro Modules DB paths: pagination, search,
 * category filtering, and subscription gating. Uses dummy Bunny GUIDs, so it
 * needs no Bunny account; real video playback is the only thing it can't cover.
 *
 * It also grants the target user an active subscription so the gated list is
 * visible. Re-running is safe: it only clears its own seeded rows (GUIDs that
 * start with "demo-"), leaving any real CMS-added modules untouched.
 *
 * Usage:
 *   pnpm tsx scripts/seed-pro-modules.ts you@example.com
 *   (falls back to the first ADMIN_EMAILS entry if no arg is given)
 */
import { PrismaClient, type ModuleCategory } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Themed titles per category so search has distinct, meaningful terms to match.
const SEED: Record<ModuleCategory, string[]> = {
  open_source: [
    "Making Your First Pull Request",
    "Reading Large Codebases",
    "Understanding Git Internals",
    "Contributing to the Linux Kernel",
    "Writing Good Issues and RFCs",
    "Reviewing Code Like a Maintainer",
    "Docker for Local Dev Setups",
    "Testing Strategies for Libraries",
    "Semantic Versioning in Practice",
    "Triaging Bugs in Big Projects",
    "Open Source Licensing Basics",
    "Becoming a Project Maintainer",
    "Documentation That People Read",
    "Navigating Monorepos",
  ],
  build_in_public: [
    "Launching on Twitter",
    "Growing Your First 100 Users",
    "Sharing Revenue Numbers Openly",
    "Writing a Build Log",
    "Turning Followers into Customers",
    "Shipping in Public Daily",
    "Handling Negative Feedback",
    "Marketing for Engineers",
    "Cold Email That Converts",
    "Building an Audience from Zero",
    "Pricing Your First Product",
    "Storytelling for Founders",
    "Running a Public Beta",
    "Newsletter Growth Tactics",
  ],
  first_principles: [
    "Thinking from First Principles",
    "Mental Models for Engineers",
    "Breaking Down Hard Problems",
    "Reasoning About Tradeoffs",
    "Systems Thinking 101",
    "Estimation and Back-of-Envelope Math",
    "Decision Making Under Uncertainty",
    "Debugging as a Science",
    "Learning How to Learn",
    "Abstraction and Leaky Abstractions",
    "Optimizing for the Right Metric",
    "Avoiding Premature Optimization",
    "Designing for Simplicity",
    "Questioning Your Assumptions",
  ],
};

const CATEGORIES = Object.keys(SEED) as ModuleCategory[];

async function main(): Promise<void> {
  const email = (
    process.argv[2] ||
    process.env.ADMIN_EMAILS?.split(",")[0] ||
    ""
  )
    .trim()
    .toLowerCase();

  if (!email) {
    console.error(
      "Usage: pnpm tsx scripts/seed-pro-modules.ts <email>\n" +
        "(or set ADMIN_EMAILS in .env)"
    );
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(
      `No user found with email "${email}".\n` +
        "Log in through the app once (so the user row is created), then re-run this."
    );
    process.exit(1);
  }

  // Ensure a plan exists to attach the subscription to.
  let plan = await prisma.plan.findFirst({ where: { name: "Pro (dev seed)" } });
  if (!plan) {
    plan = await prisma.plan.create({
      data: { name: "Pro (dev seed)", interval: "yearly", durationMonths: 12, price: 0, currency: "INR" },
    });
  }

  // Grant an active subscription valid for a year if there isn't one already.
  const activeSub = await prisma.subscription.findFirst({
    where: { userId: user.id, status: "active", endDate: { gte: new Date() } },
  });
  if (!activeSub) {
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    await prisma.subscription.create({
      data: { userId: user.id, planId: plan.id, status: "active", endDate },
    });
    console.log(`Granted active subscription to ${email}`);
  } else {
    console.log(`${email} already has an active subscription`);
  }

  // Clear only previously seeded rows so re-runs are idempotent and real
  // CMS-added modules (with real GUIDs) are left alone.
  const cleared = await prisma.proModule.deleteMany({
    where: { bunnyVideoId: { startsWith: "demo-" } },
  });
  if (cleared.count > 0) {
    console.log(`Cleared ${cleared.count} previously seeded modules.`);
  }

  let n = 0;
  for (const category of CATEGORIES) {
    const titles = SEED[category];
    for (let i = 0; i < titles.length; i++) {
      await prisma.proModule.create({
        data: {
          title: titles[i],
          description: `A ${category.replace(/_/g, " ")} module: ${titles[i]}.`,
          category,
          bunnyVideoId: `demo-${category}-${i + 1}`,
          order: i,
          links: {
            create: [
              { label: "GitHub", url: "https://github.com/opensox", order: 0 },
              { label: "Docs", url: "https://example.com/docs", order: 1 },
            ],
          },
        },
      });
      n++;
    }
  }

  console.log(
    `Seeded ${n} modules across ${CATEGORIES.length} categories ` +
      `(${SEED.open_source.length} each).`
  );
  console.log(
    "Pagination: 'All' spans multiple pages (12/page); each category has > 12 " +
      "so per-category pagination is testable too."
  );
  console.log("Search examples: 'docker', 'pricing', 'debugging', 'git'.");
  console.log("Done.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

/**
 * insert 10 dummy text testimonials so the landing marquee can be tested.
 * re-running upserts the same dummy emails and does not touch real rows.
 *
 * requires an explicit local-only opt-in and will abort in production.
 *
 * usage (from apps/api):
 *   ALLOW_DUMMY_TESTIMONIAL_SEED=1 pnpm tsx scripts/seed-dummy-testimonials.ts
 */
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const DUMMIES = [
  {
    email: "dummy.t0@opensox.test",
    name: "Aarav Mehta",
    socialLink: "https://x.com/aaravmehta",
    content:
      "opensox helped me pick a repo i could actually finish. first pr merged in a week.",
  },
  {
    email: "dummy.t1@opensox.test",
    name: "Sofia Alvarez",
    socialLink: "https://linkedin.com/in/sofia-alvarez",
    content:
      "the filters are the whole product. i stopped doom-scrolling github issues.",
  },
  {
    email: "dummy.t2@opensox.test",
    name: "Kenji Tanaka",
    socialLink: "https://x.com/kenjitanaka",
    content:
      "pro modules are the missing map for people who want to contribute but don't know where to start.",
  },
  {
    email: "dummy.t3@opensox.test",
    name: "Maya Chen",
    socialLink: "https://x.com/mayachen",
    content:
      "i used the sheet as a checklist. went from zero oss to a real contribution in 10 days.",
  },
  {
    email: "dummy.t4@opensox.test",
    name: "Omar Haddad",
    socialLink: "https://instagram.com/omarhaddad",
    content:
      "finally a tool that doesn't dump 400 'good first issues' that aren't good or first.",
  },
  {
    email: "dummy.t5@opensox.test",
    name: "Priya Nair",
    socialLink: "https://x.com/priyanair",
    content:
      "the community sessions are better than another youtube tutorial. humans, not slop.",
  },
  {
    email: "dummy.t6@opensox.test",
    name: "Luca Bianchi",
    socialLink: "https://linkedin.com/in/luca-bianchi",
    content:
      "found a project in my stack in minutes. search used to take me a whole afternoon.",
  },
  {
    email: "dummy.t7@opensox.test",
    name: "Hannah Brooks",
    socialLink: "https://x.com/hannahbrooks",
    content:
      "worth it just for the project list. i recommend it to every intern i onboard.",
  },
  {
    email: "dummy.t8@opensox.test",
    name: "Diego Santos",
    socialLink: "https://x.com/diegosantos",
    content:
      "clear, opinionated, and it works. that's rare in this space.",
  },
  {
    email: "dummy.t9@opensox.test",
    name: "Elena Petrova",
    socialLink: "https://linkedin.com/in/elena-petrova",
    content:
      "i was stuck in tutorial hell. opensox gave me a real repo and a reason to ship.",
  },
];

async function main() {
  const optedIn = process.env.ALLOW_DUMMY_TESTIMONIAL_SEED === "1";
  const isProduction = process.env.NODE_ENV === "production";
  if (!optedIn || isProduction) {
    console.error(
      "refusing to seed dummy testimonials. run locally with ALLOW_DUMMY_TESTIMONIAL_SEED=1 (not production)."
    );
    process.exit(1);
  }

  for (const [index, dummy] of DUMMIES.entries()) {
    const user = await prisma.user.upsert({
      where: { email: dummy.email },
      update: { firstName: dummy.name },
      create: {
        email: dummy.email,
        firstName: dummy.name,
        authMethod: "google",
      },
    });

    await prisma.testimonial.upsert({
      where: { userId: user.id },
      update: {
        name: dummy.name,
        content: dummy.content,
        avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
        socialLink: dummy.socialLink,
      },
      create: {
        userId: user.id,
        name: dummy.name,
        content: dummy.content,
        avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
        socialLink: dummy.socialLink,
      },
    });
  }

  console.log(`seeded ${DUMMIES.length} dummy testimonials`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

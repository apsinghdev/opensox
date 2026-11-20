/**
 * Flip a user between "returning member" and "active member" so the 10% rejoin
 * price can be checked on /pricing without waiting for a plan to expire.
 *
 * Uses DATABASE_URL from apps/api/.env. It only changes that user's
 * subscription rows. Discord membership is left alone.
 *
 * Usage, from apps/api:
 *   pnpm member:returning -- you@example.com
 *   pnpm member:returning -- you@example.com --active
 *
 * The first command ends any live subscription (or creates an expired one if
 * they have never subscribed). Log in as that user and open /pricing: Pro and
 * Pro+ show "10% off" and the button says Rejoin.
 *
 * --active turns their latest subscription back on for one year, which hides
 * the discounted price again.
 */
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { SUBSCRIPTION_STATUS } from "../src/constants/subscription.js";
import {
  checkoutAmountForMember,
  returningMemberFilters,
} from "../src/lib/returning-member-price.js";

dotenv.config();

const prisma = new PrismaClient();

function databaseHost(): string {
  const url = process.env.DATABASE_URL;
  if (!url) return "DATABASE_URL is not set";
  try {
    return new URL(url).host;
  } catch {
    return "unparsed";
  }
}

async function isReturning(userId: string): Promise<boolean> {
  const { active, prior } = returningMemberFilters(userId);
  const [live, previous] = await Promise.all([
    prisma.subscription.findFirst({ where: active, select: { id: true } }),
    prisma.subscription.findFirst({ where: prior, select: { id: true } }),
  ]);
  return !live && !!previous;
}

async function printQuotes(userId: string): Promise<void> {
  const plans = await prisma.plan.findMany({ orderBy: { price: "asc" } });
  const returning = await isReturning(userId);

  console.log(`returning member: ${returning ? "yes" : "no"}`);

  for (const plan of plans) {
    const charge = checkoutAmountForMember(
      plan.price,
      plan.currency,
      returning
    );
    console.log(
      `${plan.name}: list ${plan.price} → charge ${charge.amount} ${plan.currency}`
    );
  }
}

async function markReturning(userId: string): Promise<void> {
  const endedAt = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const expired = await prisma.subscription.updateMany({
    where: {
      userId,
      status: SUBSCRIPTION_STATUS.ACTIVE,
      endDate: { gte: new Date() },
    },
    data: {
      status: SUBSCRIPTION_STATUS.EXPIRED,
      endDate: endedAt,
      autoRenew: false,
    },
  });

  console.log(`expired live subscriptions: ${expired.count}`);

  if (await isReturning(userId)) return;

  const plan = await prisma.plan.findFirst({ orderBy: { createdAt: "asc" } });
  if (!plan) {
    throw new Error("No plan exists, so an expired subscription cannot be created");
  }

  const startDate = new Date(endedAt);
  startDate.setMonth(startDate.getMonth() - (plan.durationMonths || 12));

  await prisma.subscription.create({
    data: {
      userId,
      planId: plan.id,
      status: SUBSCRIPTION_STATUS.EXPIRED,
      startDate,
      endDate: endedAt,
      autoRenew: false,
    },
  });

  console.log(`created an expired ${plan.name} subscription`);
}

async function markActive(userId: string): Promise<void> {
  const latest = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { startDate: "desc" },
  });

  if (!latest) {
    throw new Error("This user has no subscription to restore");
  }

  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  await prisma.subscription.update({
    where: { id: latest.id },
    data: {
      status: SUBSCRIPTION_STATUS.ACTIVE,
      endDate,
      autoRenew: false,
    },
  });

  console.log(`restored subscription ${latest.id} until ${endDate.toISOString()}`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const restore = args.includes("--active");
  const email = args.find((arg) => !arg.startsWith("--"));

  if (!email) {
    console.error(
      "Usage: pnpm member:returning -- you@example.com [--active]"
    );
    process.exit(1);
  }

  console.log(`database host: ${databaseHost()}`);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(`No user with email ${email}`);
  }

  if (restore) {
    await markActive(user.id);
  } else {
    await markReturning(user.id);
  }

  await printQuotes(user.id);
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import jwt from "jsonwebtoken";
import type { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { ExtendedPrismaClient } from "../prisma.js";
import { emailService } from "./email.service.js";

type Db = ExtendedPrismaClient | PrismaClient;

const CONFIRM_PURPOSE = "newsletter_confirm";
const CONFIRM_TOKEN_EXPIRES = "48h";

export type ConfirmStatus = "ok" | "already" | "expired";

export type ConfirmResult = {
  status: ConfirmStatus;
};

type ConfirmTokenPayload = {
  email: string;
  source: string;
  purpose: typeof CONFIRM_PURPOSE;
  iat?: number;
};

function getNewsletterTokenSecret(): string {
  const secret =
    process.env.NEWSLETTER_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "NEWSLETTER_TOKEN_SECRET or JWT_SECRET must be configured"
    );
  }
  return secret;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function getConfirmBaseUrl(): string {
  return stripTrailingSlash(
    process.env.NEWSLETTER_CONFIRM_BASE_URL || "https://www.jackedaj.com"
  );
}

function getUnsubscribeBaseUrl(): string {
  return stripTrailingSlash(
    process.env.NEWSLETTER_UNSUBSCRIBE_BASE_URL || "https://www.jackedaj.com"
  );
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeSource(source: string): string {
  return source.trim().toLowerCase();
}

function signConfirmToken(email: string, source: string): string {
  return jwt.sign(
    { email, source, purpose: CONFIRM_PURPOSE },
    getNewsletterTokenSecret(),
    { expiresIn: CONFIRM_TOKEN_EXPIRES }
  );
}

function verifyConfirmToken(token: string): ConfirmTokenPayload | null {
  try {
    const decoded = jwt.verify(token, getNewsletterTokenSecret());
    if (typeof decoded === "string") {
      return null;
    }
    if (
      decoded.purpose !== CONFIRM_PURPOSE ||
      typeof decoded.email !== "string" ||
      typeof decoded.source !== "string"
    ) {
      return null;
    }
    return {
      email: decoded.email,
      source: decoded.source,
      purpose: CONFIRM_PURPOSE,
      ...(typeof decoded.iat === "number" ? { iat: decoded.iat } : {}),
    };
  } catch {
    return null;
  }
}

function buildConfirmUrl(token: string): string {
  return `${getConfirmBaseUrl()}/newsletter/confirm?token=${encodeURIComponent(token)}`;
}

export function newsletterConfirmRedirectUrl(status: ConfirmStatus): string {
  return `${getConfirmBaseUrl()}/newsletter-confirmed.html?status=${status}`;
}

export function newsletterUnsubscribedRedirectUrl(): string {
  return `${getUnsubscribeBaseUrl()}/newsletter-unsubscribed.html`;
}

export const newsletterService = {
  async subscribe(
    db: Db,
    input: { email: string; source: string }
  ): Promise<{ ok: true }> {
    const email = normalizeEmail(input.email);
    const source = normalizeSource(input.source);

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
      select: { unsubscribedAt: true },
    });

    // same success either way; skip mail for active subscribers so we don't leak state.
    if (existing && existing.unsubscribedAt === null) {
      return { ok: true };
    }

    const token = signConfirmToken(email, source);
    const confirmUrl = buildConfirmUrl(token);
    await emailService.sendNewsletterConfirmEmail(email, confirmUrl);
    return { ok: true };
  },

  async confirm(db: Db, token: string): Promise<ConfirmResult> {
    const payload = verifyConfirmToken(token);
    if (!payload) {
      return { status: "expired" };
    }

    const email = normalizeEmail(payload.email);
    const source = normalizeSource(payload.source);

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!existing) {
      try {
        await db.newsletterSubscriber.create({
          data: { email, source },
        });
        return { status: "ok" };
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return { status: "already" };
        }
        throw error;
      }
    }

    if (existing.unsubscribedAt === null) {
      return { status: "already" };
    }

    // leave them unsubscribed unless this token was issued after they
    // unsubscribed (they submitted the form again and got a new confirm email).
    // a stale confirm link must not silently opt them back in.
    const tokenIssuedAtMs = (payload.iat ?? 0) * 1000;
    if (tokenIssuedAtMs <= existing.unsubscribedAt.getTime()) {
      return { status: "expired" };
    }

    await db.newsletterSubscriber.update({
      where: { email },
      data: { unsubscribedAt: null, source },
    });
    return { status: "ok" };
  },

  async unsubscribe(db: Db, token: string): Promise<{ ok: true }> {
    const existing = await db.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token },
      select: { id: true, unsubscribedAt: true },
    });

    if (existing && existing.unsubscribedAt === null) {
      await db.newsletterSubscriber.update({
        where: { id: existing.id },
        data: { unsubscribedAt: new Date() },
      });
    }

    return { ok: true };
  },

  async adminCount(db: Db): Promise<number> {
    return db.newsletterSubscriber.count({
      where: { unsubscribedAt: null },
    });
  },

  async adminList(db: Db) {
    const where = { unsubscribedAt: null };

    const [count, subscribers] = await Promise.all([
      db.newsletterSubscriber.count({ where }),
      db.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          source: true,
          createdAt: true,
        },
      }),
    ]);

    return { count, subscribers };
  },
};

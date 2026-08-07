import dotenv from "dotenv";
import express from "express";
import type { Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./routers/_app.js";
import { createContext } from "./context.js";
import prismaModule from "./prisma.js";
import cors from "cors";
import type { CorsOptions as CorsOptionsType } from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ipBlocker from "./middleware/ipBlock.js";
import crypto from "crypto";
import { paymentService } from "./services/payment.service.js";
import { userService } from "./services/user.service.js";
import { verifyToken } from "./utils/auth.js";
import { SUBSCRIPTION_STATUS } from "./constants/subscription.js";
import { discordService } from "./services/discord.service.js";
import {
  createDiscordOAuthState,
  verifyDiscordOAuthState,
} from "./utils/discord-oauth-state.js";

dotenv.config();

const CRON_SECRET = process.env.CRON_SECRET;
if (!CRON_SECRET) {
  throw new Error("CRON_SECRET is not defined in the environment variables");
}

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:5000"];

// Security headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  })
);

// Apply IP blocking middleware first
app.use(ipBlocker.middleware);

// Different rate limits for different endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`[RATE LIMIT] IP ${req.ip} hit API rate limit`);
    res.status(429).json({ error: "Too many requests from this IP" });
  }
});

// Request size limits (except for webhook - needs raw body)
app.use("/webhook/razorpay", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

// CORS configuration
const corsOptions: CorsOptionsType = {
  origin: (origin, callback) => {
    if (!origin || CORS_ORIGINS.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// Blocked IPs endpoint (admin endpoint)
app.get("/admin/blocked-ips", (req: Request, res: Response) => {
  const blockedIPs = ipBlocker.getBlockedIPs();
  res.json({
    blockedIPs: blockedIPs.map((ip) => ({
      ...ip,
      blockedUntil: new Date(ip.blockedUntil).toISOString(),
    })),
  });
});

// Test endpoint
app.get("/test", apiLimiter, (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Test endpoint is working" });
});

// Discord Community Invite Endpoint (Protected)
app.get("/join-community", apiLimiter, async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized - Authorization header with Bearer token required",
      });
    }

    const token = authHeader.substring(7);

    // Verify token and get user
    let user;
    try {
      user = await verifyToken(token);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const { isPaidUser } = await userService.checkSubscriptionStatus(
      prismaModule.prisma,
      user.id
    );

    if (!isPaidUser) {
      return res.status(403).json({
        error: "Forbidden - Active subscription required to join community",
      });
    }

    if (!discordService.isAutomationEnabled()) {
      return res.status(400).json({
        error: "Discord automation is not enabled",
      });
    }

    const discordAccount = await discordService.getDiscordAccountForUser(user.id);
    if (!discordAccount || !discordAccount.providerAccountId) {
      return res.status(409).json({
        error: "Discord account not connected",
        mode: "automated",
        needsDiscordConnection: true,
      });
    }

    if (!discordAccount.access_token) {
      return res.status(409).json({
        error: "Discord access token missing, please reconnect Discord",
        mode: "automated",
        needsDiscordConnection: true,
      });
    }

    await discordService.addMemberToProGuild(
      discordAccount.providerAccountId,
      discordAccount.access_token
    );

    return res.status(200).json({
      mode: "automated",
      joined: true,
      message: "Connected successfully. You have been added to the pro community.",
    });
  } catch (error: any) {
    console.error("Community invite error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/discord/connect-url", apiLimiter, async (req: Request, res: Response) => {
  try {
    if (!discordService.isAutomationEnabled()) {
      return res.status(400).json({
        error: "Discord automation is not enabled",
      });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized - Authorization header with Bearer token required",
      });
    }

    const token = authHeader.substring(7);
    let user;
    try {
      user = await verifyToken(token);
    } catch {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const { isPaidUser } = await userService.checkSubscriptionStatus(
      prismaModule.prisma,
      user.id
    );
    if (!isPaidUser) {
      return res.status(403).json({
        error: "Forbidden - Active subscription required to join community",
      });
    }

    const state = createDiscordOAuthState(user.id);
    const authUrl = discordService.buildAuthorizationUrl(state);

    return res.status(200).json({ authUrl });
  } catch (error) {
    console.error("Discord connect-url error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get(
  "/discord/community-status",
  apiLimiter,
  async (req: Request, res: Response) => {
    try {
      if (!discordService.isAutomationEnabled()) {
        return res.status(200).json({
          mode: "disabled",
          connected: false,
          joined: false,
        });
      }

      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          error: "Unauthorized - Authorization header with Bearer token required",
        });
      }

      const token = authHeader.substring(7);
      let user;
      try {
        user = await verifyToken(token);
      } catch {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }

      const discordAccount = await discordService.getDiscordAccountForUser(user.id);
      if (!discordAccount?.providerAccountId) {
        return res.status(200).json({
          mode: "automated",
          connected: false,
          joined: false,
        });
      }

      const joined = await discordService.isMemberOfProGuild(
        discordAccount.providerAccountId
      );

      return res.status(200).json({
        mode: "automated",
        connected: true,
        joined,
      });
    } catch (error) {
      console.error("Discord community-status error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.get("/auth/discord/callback", apiLimiter, async (req: Request, res: Response) => {
  const successUrl =
    process.env.DISCORD_CONNECT_SUCCESS_URL ||
    `${CORS_ORIGINS[0]}/dashboard/account?discord=joined`;
  const failureBaseUrl =
    process.env.DISCORD_CONNECT_FAILURE_URL || `${CORS_ORIGINS[0]}/dashboard/account`;

  try {
    if (!discordService.isAutomationEnabled()) {
      return res.redirect(`${failureBaseUrl}?discord=feature_disabled`);
    }

    const code = req.query.code;
    const state = req.query.state;
    if (typeof code !== "string" || typeof state !== "string") {
      return res.redirect(`${failureBaseUrl}?discord=invalid_callback`);
    }

    const statePayload = verifyDiscordOAuthState(state);
    if (!statePayload) {
      return res.redirect(`${failureBaseUrl}?discord=invalid_state`);
    }

    const { isPaidUser } = await userService.checkSubscriptionStatus(
      prismaModule.prisma,
      statePayload.userId
    );
    if (!isPaidUser) {
      return res.redirect(`${failureBaseUrl}?discord=subscription_required`);
    }

    const tokenResponse = await discordService.exchangeCodeForToken(code);
    const discordUser = await discordService.fetchCurrentDiscordUser(
      tokenResponse.access_token
    );

    const discordAccountPayload: {
      userId: string;
      discordUserId: string;
      accessToken: string;
      expiresIn: number;
      tokenType: string;
      refreshToken?: string;
      scope?: string;
    } = {
      userId: statePayload.userId,
      discordUserId: discordUser.id,
      accessToken: tokenResponse.access_token,
      expiresIn: tokenResponse.expires_in,
      tokenType: tokenResponse.token_type,
    };
    if (tokenResponse.refresh_token !== undefined) {
      discordAccountPayload.refreshToken = tokenResponse.refresh_token;
    }
    if (tokenResponse.scope !== undefined) {
      discordAccountPayload.scope = tokenResponse.scope;
    }

    await discordService.upsertDiscordAccount(discordAccountPayload);
    await discordService.addMemberToProGuild(
      discordUser.id,
      tokenResponse.access_token
    );

    return res.redirect(successUrl);
  } catch (error) {
    console.error("Discord callback error:", error);
    return res.redirect(`${failureBaseUrl}?discord=callback_failed`);
  }
});

app.post(
  "/internal/jobs/expire-subscriptions",
  apiLimiter,
  async (req: Request, res: Response) => {
    try {
      const requestSecret = req.headers["x-cron-secret"];
      if (requestSecret !== CRON_SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const expiredSubscriptions = await prismaModule.prisma.subscription.findMany({
        where: {
          status: SUBSCRIPTION_STATUS.ACTIVE,
          endDate: { lt: new Date() },
        },
        include: {
          user: true,
        },
        take: 500,
      });

      if (expiredSubscriptions.length === 0) {
        return res.status(200).json({
          status: "ok",
          expiredCount: 0,
          removedFromDiscordCount: 0,
          skipped: !discordService.isAutomationEnabled(),
        });
      }

      let removedFromDiscordCount = 0;
      let failedDiscordRemovals = 0;
      let expiredCount = 0;

      for (const subscription of expiredSubscriptions) {
        const discordUserId = (subscription.user as any).discordUserId as
          | string
          | null
          | undefined;

        if (!discordService.isAutomationEnabled() || !discordUserId) {
          await prismaModule.prisma.subscription.update({
            where: { id: subscription.id },
            data: { status: SUBSCRIPTION_STATUS.EXPIRED },
          });
          expiredCount += 1;
          continue;
        }

        try {
          await discordService.removeMemberFromProGuild(discordUserId);
          removedFromDiscordCount += 1;
          await prismaModule.prisma.subscription.update({
            where: { id: subscription.id },
            data: { status: SUBSCRIPTION_STATUS.EXPIRED },
          });
          expiredCount += 1;
        } catch (error) {
          failedDiscordRemovals += 1;
          console.error(
            `Failed to remove Discord user ${discordUserId} for subscription ${subscription.id}:`,
            error
          );
        }
      }

      return res.status(200).json({
        status: "ok",
        expiredCount,
        removedFromDiscordCount,
        failedDiscordRemovals,
      });
    } catch (error) {
      console.error("Expire subscriptions job failed:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Razorpay Webhook Handler (Backup Flow)
app.post("/webhook/razorpay", async (req: Request, res: Response) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("RAZORPAY_WEBHOOK_SECRET not configured");
      return res.status(500).json({ error: "Webhook not configured" });
    }

    // Get signature from headers
    const signature = req.headers["x-razorpay-signature"] as string;
    if (!signature) {
      return res.status(400).json({ error: "Missing signature" });
    }

    // Verify webhook signature
    const body = req.body.toString();
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    const isValidSignature = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isValidSignature) {
      console.error("Invalid webhook signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Parse the event
    const event = JSON.parse(body);
    const eventType = event.event;

    // Handle payment.captured event
    if (eventType === "payment.captured") {
      const payment = event.payload.payment.entity;

      // Extract payment details
      const razorpayPaymentId = payment.id;
      const razorpayOrderId = payment.order_id;
      const amount = payment.amount;
      const currency = payment.currency;

      // Get user ID from order notes (should be stored when creating order)
      const notes = payment.notes || {};
      const userId = notes.user_id;

      if (!userId) {
        console.error("User ID not found in payment notes");
        return res.status(400).json({ error: "User ID not found" });
      }

      // Get plan ID from notes
      const planId = notes.plan_id;
      if (!planId) {
        console.error("Plan ID not found in payment notes");
        return res.status(400).json({ error: "Plan ID not found" });
      }

      try {
        await paymentService.fulfillPayment({
          userId,
          planId,
          paymentData: {
            razorpayPaymentId,
            razorpayOrderId,
            amount,
            currency,
          },
          sendConfirmationEmail: true,
        });

        console.log(
          `✅ Webhook: Payment ${razorpayPaymentId} processed successfully`
        );
        return res.status(200).json({ status: "ok" });
      } catch (error: any) {
        console.error("Webhook payment processing error:", error);
        // Return 200 to prevent Razorpay retries for application errors
        return res
          .status(200)
          .json({ status: "ok", note: "Already processed" });
      }
    }

    // Acknowledge other events
    return res.status(200).json({ status: "ok" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Connect to database
prismaModule.connectDB();

// Apply rate limiting to tRPC endpoints
app.use("/trpc", apiLimiter);

// tRPC middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Global error handling
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`tRPC server running on http://localhost:${PORT}`);
});

import type { Request, Response } from "express";
import crypto from "crypto";
import prismaModule from "./prisma.js";
import { rz_instance } from "./clients/razorpay.js";

const { prisma } = prismaModule;


const SPONSOR_MONTHLY_AMOUNT = 50000; // $500 USD
const SPONSOR_CURRENCY = "USD";

export const handleRazorpayWebhook = async (req: Request, res: Response) => {
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
        // req.body is already a buffer because of express.raw() middleware in index.ts
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
        const payload = event.payload;

        console.log(`Received Razorpay webhook: ${eventType}`);

        switch (eventType) {
            case "payment.captured":
                await handlePaymentCaptured(payload);
                break;
            case "subscription.charged":
                await handleSubscriptionCharged(payload);
                break;
            case "subscription.pending":
            case "subscription.halted":
            case "subscription.cancelled":
            case "payment.failed":
                await handleSubscriptionStatusChange(eventType, payload);
                break;
            // Add other events as needed
        }

        return res.status(200).json({ status: "ok" });
    } catch (error: any) {
        console.error("Webhook error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// handle payment.captured event for sponsors
async function handlePaymentCaptured(payload: any) {
    const payment = payload.payment.entity;
    const paymentId = payment.id;
    const orderId = payment.order_id;

    console.log("📥 Webhook: payment.captured", { paymentId, orderId });

    // extract customer contact details from payment entity (if available in webhook)
    let contactName: string | null = null;
    let contactEmail: string | null = null;
    let contactPhone: string | null = null;

    if (payment.contact) {
        contactPhone = String(payment.contact);
    }
    if (payment.email) {
        contactEmail = payment.email;
    }
    if (payment.notes && payment.notes.name) {
        contactName = payment.notes.name;
    }

    // if contact details not in webhook payload, fetch from razorpay api
    if (!contactPhone || !contactEmail) {
        try {
            const paymentDetails = await rz_instance.payments.fetch(paymentId);
            if (paymentDetails.contact && !contactPhone) {
                contactPhone = String(paymentDetails.contact);
            }
            if (paymentDetails.email && !contactEmail) {
                contactEmail = paymentDetails.email;
            }
            if (paymentDetails.notes && paymentDetails.notes.name && !contactName) {
                contactName = paymentDetails.notes.name;
            }
        } catch (error) {
            console.error("failed to fetch payment details from razorpay:", error);
            // continue without contact details if fetch fails
        }
    }

    // Use consistent constants for sponsor payments
    await prisma.payment.upsert({
        where: { razorpayPaymentId: paymentId },
        update: {
            razorpayOrderId: orderId,
            amount: SPONSOR_MONTHLY_AMOUNT,
            currency: SPONSOR_CURRENCY,
            status: "captured",
        },
        create: {
            razorpayPaymentId: paymentId,
            razorpayOrderId: orderId,
            amount: SPONSOR_MONTHLY_AMOUNT,
            currency: SPONSOR_CURRENCY,
            status: "captured",
        },
    });

    // create or update sponsor record with pending_submission status
    const existingSponsor = await prisma.sponsor.findFirst({
        where: { razorpay_payment_id: paymentId },
    });

    if (!existingSponsor) {
        await prisma.sponsor.create({
            data: {
                razorpay_payment_id: paymentId,
                plan_status: "pending_submission",
                company_name: "",
                description: "",
                website: "",
                image_url: "",
                contact_name: contactName,
                contact_email: contactEmail,
                contact_phone: contactPhone,
            },
        });
        console.log("✅ Created sponsor record with pending_submission status");
    } else {
        // Don't overwrite if already submitted
        if (existingSponsor.plan_status !== "active") {
            await prisma.sponsor.update({
                where: { id: existingSponsor.id },
                data: {
                    contact_name: contactName || existingSponsor.contact_name,
                    contact_email: contactEmail || existingSponsor.contact_email,
                    contact_phone: contactPhone || existingSponsor.contact_phone,
                },
            });
            console.log("✅ Updated sponsor contact details");
        } else {
            console.log("ℹ️ Sponsor already active, skipping update");
        }
    }
}

async function handleSubscriptionCharged(payload: any) {
    const payment = payload.payment.entity;
    const subscription = payload.subscription.entity;

    // Update sponsor status to active if it matches a known subscription


    const subId = subscription.id;

    await prisma.sponsor.updateMany({
        where: {
            razorpay_sub_id: subId,
        },
        data: {
            plan_status: "active",
        },
    });
}

async function handleSubscriptionStatusChange(eventType: string, payload: any) {
    const subscription = payload.subscription ? payload.subscription.entity : null;
    const payment = payload.payment ? payload.payment.entity : null;

    let subId = subscription ? subscription.id : null;

    // If we don't have subscription entity directly (e.g. payment.failed), try to get from payment
    if (!subId && payment) {
        // Attempt extraction from description: look for Razorpay-style IDs like "sub_XXXXXXXX"
        const tryExtractSubId = (source: unknown): string | null => {
            if (!source || typeof source !== "string") return null;
            // Prefer explicit "sub_" token
            const explicitMatch = source.match(/\bsub_[a-zA-Z0-9]+\b/);
            if (explicitMatch && explicitMatch[0].trim().length > 0) return explicitMatch[0];

            return null;
        };

        // 1) Description
        const fromDescription = tryExtractSubId(payment.description);

        // 2) Notes.subscription_id (common place to store linkage)
        let fromNotes: string | null = null;
        if (payment.notes && typeof payment.notes === "object") {
            const maybeNoteSubId = (payment.notes as any).subscription_id;
            if (typeof maybeNoteSubId === "string" && maybeNoteSubId.trim().length > 0) {
                // Ensure it looks like a subscription id
                const validated = tryExtractSubId(maybeNoteSubId) ?? maybeNoteSubId;
                if (typeof validated === "string" && validated.trim().length > 0) {
                    fromNotes = validated;
                }
            } else {
                // If notes might contain a free-form string, attempt extraction
                // Some integrations stuff sub_ token in a generic "notes" field
                for (const k of Object.keys(payment.notes)) {
                    const val = (payment.notes as any)[k];
                    const extracted = tryExtractSubId(typeof val === "string" ? val : "");
                    if (extracted) {
                        fromNotes = extracted;
                        break;
                    }
                }
            }
        } else if (typeof payment.notes === "string") {
            fromNotes = tryExtractSubId(payment.notes);
        }

        const candidate = fromDescription || fromNotes;
        if (typeof candidate === "string" && candidate.trim().length > 0) {
            subId = candidate.trim();
        }
    }

    if (!subId) return;

    let newStatus = "active";
    if (eventType === "subscription.pending") newStatus = "pending_payment";
    if (eventType === "subscription.halted") newStatus = "unpaid"; // or halted
    if (eventType === "subscription.cancelled") newStatus = "cancelled";
    if (eventType === "payment.failed") newStatus = "failed";

    await prisma.sponsor.updateMany({
        where: {
            razorpay_sub_id: subId,
        },
        data: {
            plan_status: newStatus,
        },
    });
}


-- CreateTable
CREATE TABLE "TalkToMePurchase" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL DEFAULT 'created',
    "emailSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TalkToMePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TalkToMePurchase_razorpayOrderId_key" ON "TalkToMePurchase"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "TalkToMePurchase_razorpayPaymentId_key" ON "TalkToMePurchase"("razorpayPaymentId");

-- CreateIndex
CREATE INDEX "TalkToMePurchase_email_idx" ON "TalkToMePurchase"("email");

-- CreateIndex
CREATE INDEX "TalkToMePurchase_createdAt_idx" ON "TalkToMePurchase"("createdAt");

-- CreateIndex
CREATE INDEX "TalkToMePurchase_status_idx" ON "TalkToMePurchase"("status");

/*
  Warnings:

  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('created', 'authorized', 'captured', 'refunded', 'failed');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'completed', 'expired');

-- AlterTable: Migrate Payment.status from TEXT to PaymentStatus enum
-- First, temporarily drop NOT NULL constraint to allow safe conversion
ALTER TABLE "Payment" ALTER COLUMN "status" DROP NOT NULL;

-- Convert the column type preserving existing data
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "PaymentStatus" USING status::"PaymentStatus";

-- Backfill any NULLs with a default value if needed (shouldn't be necessary but being safe)
-- If there are NULLs, we'd set a default here, but since original was NOT NULL, this shouldn't be needed

-- Re-add NOT NULL constraint after successful conversion
ALTER TABLE "Payment" ALTER COLUMN "status" SET NOT NULL;

-- AlterTable: Migrate Subscription.status from TEXT to SubscriptionStatus enum
-- First, temporarily drop NOT NULL constraint to allow safe conversion
ALTER TABLE "Subscription" ALTER COLUMN "status" DROP NOT NULL;

-- Convert the column type preserving existing data
ALTER TABLE "Subscription" ALTER COLUMN "status" TYPE "SubscriptionStatus" USING status::"SubscriptionStatus";

-- Backfill any NULLs with a default value if needed (shouldn't be necessary but being safe)
-- If there are NULLs, we'd set a default here, but since original was NOT NULL, this shouldn't be needed

-- Re-add NOT NULL constraint after successful conversion
ALTER TABLE "Subscription" ALTER COLUMN "status" SET NOT NULL;

-- AlterTable: Make Subscription.endDate nullable
ALTER TABLE "Subscription" ALTER COLUMN "endDate" DROP NOT NULL;

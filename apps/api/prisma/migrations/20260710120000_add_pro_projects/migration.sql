-- CreateTable
CREATE TABLE "ProProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "qualities" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProProject_order_idx" ON "ProProject"("order");

-- CreateIndex
CREATE INDEX "ProProject_createdAt_idx" ON "ProProject"("createdAt");

-- CreateTable
CREATE TABLE "QueryCount" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "total_queries" INTEGER NOT NULL,

    CONSTRAINT "QueryCount_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Tutorial" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'english',
    "indexContent" TEXT NOT NULL,
    "mermaidDiagram" TEXT NOT NULL,
    "chapters" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutorial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tutorial_userId_idx" ON "Tutorial"("userId");

-- CreateIndex
CREATE INDEX "Tutorial_repoUrl_idx" ON "Tutorial"("repoUrl");

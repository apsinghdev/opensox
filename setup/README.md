# OpenSox Environment Setup Scripts

This directory contains interactive setup scripts designed to simplify local development setup for **OpenSox** across Windows, Linux, and macOS.

## Quick Start

Run the setup command corresponding to your operating system from the repository root directory (`opensox/`):

### 🪟 Windows (PowerShell)
```powershell
pnpm run setup:windows
```
*Or directly via PowerShell:*
```powershell
powershell -ExecutionPolicy Bypass -File .\setup\setup-windows.ps1
```

---

### 🐧 Linux (Bash)
```bash
pnpm run setup:linux
```
*Or directly via terminal:*
```bash
bash ./setup/setup-linux.sh
```

---

### 🍎 macOS (Zsh / Bash)
```bash
pnpm run setup:mac
```
*Or directly via terminal:*
```bash
bash ./setup/setup-mac.sh
```

---

## What the Setup Script Does

1. **Environment Variables Check (`.env` & `.env.local`)**:
   - Verifies that `apps/api/.env` and `apps/web/.env.local` are present.
   - Checks that essential variables (e.g., `DATABASE_URL`, `JWT_SECRET`, `PORT`, `NEXT_PUBLIC_API_URL`) are populated.
   - If missing, guides you on what values are required to run locally.
   - **Smart Re-run (Idempotency):** If `.env` files are already configured, it skips prompts on subsequent runs.

2. **Dependencies (`pnpm install`)**:
   - Ensures workspace dependencies are installed across `apps/api` and `apps/web`.

3. **Prisma Client Generation (`prisma generate`)**:
   - Generates the Prisma Client typescript definitions needed for `apps/api`.

4. **Database Migrations (`prisma migrate dev`)**:
   - Optionally applies database migrations to your PostgreSQL database.

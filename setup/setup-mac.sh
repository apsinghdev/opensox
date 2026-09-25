#!/usr/bin/env bash

# ==============================================================================
# OpenSox Interactive Setup Script for macOS (Zsh/Bash)
# ==============================================================================

set -e

# Terminal colors
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================================${NC}"
echo -e "${CYAN}         🚀 OpenSox Local Environment Setup (macOS)    ${NC}"
echo -e "${CYAN}========================================================${NC}"
echo ""

ROOT_DIR="$(pwd)"
API_ENV_PATH="${ROOT_DIR}/apps/api/.env"
API_ENV_EXAMPLE="${ROOT_DIR}/apps/api/.env.example"
WEB_ENV_PATH="${ROOT_DIR}/apps/web/.env.local"

# Helper function to check non-empty env key
check_env_key() {
  local file="$1"
  local key="$2"
  if [ ! -f "$file" ]; then
    return 1
  fi
  if grep -qE "^${key}\s*=\s*.+" "$file"; then
    return 0
  else
    return 1
  fi
}

# ------------------------------------------------------------------------------
# 1. API Environment Variables Check (.env)
# ------------------------------------------------------------------------------
echo -e "${YELLOW}🔍 [1/4] Checking apps/api/.env...${NC}"

API_NEEDS_ATTENTION=false

if [ ! -f "$API_ENV_PATH" ]; then
  echo -e "${RED}⚠️  apps/api/.env file is missing!${NC}"
  API_NEEDS_ATTENTION=true
else
  if check_env_key "$API_ENV_PATH" "DATABASE_URL" && check_env_key "$API_ENV_PATH" "JWT_SECRET"; then
    echo -e "${GREEN}✅ apps/api/.env is fully configured with essential keys.${NC}"
  else
    echo -e "${RED}⚠️  apps/api/.env exists but is missing essential variables!${NC}"
    API_NEEDS_ATTENTION=true
  fi
fi

if [ "$API_NEEDS_ATTENTION" = true ]; then
  echo ""
  echo -e "${CYAN}📌 Important environment variables for apps/api/.env:${NC}"
  echo -e "${GRAY}   - DATABASE_URL (e.g., postgresql://postgres:postgres@localhost:5432/opensox?schema=public)${NC}"
  echo -e "${GRAY}   - JWT_SECRET (e.g., a-random-secret-key)${NC}"
  echo -e "${GRAY}   - PORT (default: 8080)${NC}"
  echo ""

  if [ ! -f "$API_ENV_PATH" ]; then
    read -p "Would you like to copy apps/api/.env.example to apps/api/.env now? (Y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
      cp "$API_ENV_EXAMPLE" "$API_ENV_PATH"
      echo -e "${GREEN}✅ Created apps/api/.env from .env.example. Please review and update DATABASE_URL if needed.${NC}"
    else
      echo -e "${YELLOW}Please create apps/api/.env manually with essential keys before running the app.${NC}"
    fi
  fi
fi

echo ""

# ------------------------------------------------------------------------------
# 2. Web Environment Variables Check (.env.local)
# ------------------------------------------------------------------------------
echo -e "${YELLOW}🔍 [2/4] Checking apps/web/.env.local...${NC}"

if [ ! -f "$WEB_ENV_PATH" ]; then
  echo -e "${RED}⚠️  apps/web/.env.local is missing!${NC}"
  echo -e "${CYAN}📌 Essential environment variables for apps/web/.env.local:${NC}"
  echo -e "${GRAY}   - NEXT_PUBLIC_API_URL (default: http://localhost:8080)${NC}"
  echo -e "${GRAY}   - NEXTAUTH_SECRET (e.g., a-random-secret)${NC}"
  echo ""

  read -p "Would you like to create apps/web/.env.local with default local values now? (Y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
    cat <<EOF > "$WEB_ENV_PATH"
# Required for Local Setup
NEXT_PUBLIC_API_URL="http://localhost:8080"
NEXTAUTH_SECRET="opensox-local-dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
EOF
    echo -e "${GREEN}✅ Created apps/web/.env.local!${NC}"
  else
    echo -e "${YELLOW}Please create apps/web/.env.local manually before running the app.${NC}"
  fi
else
  echo -e "${GREEN}✅ apps/web/.env.local is configured.${NC}"
fi

echo ""

# ------------------------------------------------------------------------------
# 3. Dependency Installation (pnpm)
# ------------------------------------------------------------------------------
echo -e "${YELLOW}📦 [3/4] Checking workspace dependencies...${NC}"

if [ ! -d "${ROOT_DIR}/node_modules" ]; then
  echo -e "${CYAN}Installing dependencies with pnpm...${NC}"
  pnpm install
else
  echo -e "${GREEN}✅ Root node_modules found. Checking for updates...${NC}"
  pnpm install --prefer-offline
fi

echo ""

# ------------------------------------------------------------------------------
# 4. Prisma Client Generation & Database Migrations
# ------------------------------------------------------------------------------
echo -e "${YELLOW}🗄️  [4/4] Setting up Prisma Database Client...${NC}"

echo -e "${CYAN}Generating Prisma Client...${NC}"
pnpm --filter api exec prisma generate

echo ""
read -p "Would you like to run database migrations now (requires running PostgreSQL DB)? (y/N) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${CYAN}Running Prisma migrations...${NC}"
  pnpm --filter api exec prisma migrate dev
else
  echo -e "${GRAY}Skipped database migrations. You can run 'pnpm --filter api exec prisma migrate dev' later.${NC}"
fi

# ------------------------------------------------------------------------------
# Setup Complete
# ------------------------------------------------------------------------------
echo ""
echo -e "${GREEN}========================================================${NC}"
echo -e "${GREEN}  OpenSox Setup Complete!${NC}"
echo -e "${GREEN}========================================================${NC}"
echo -e "To start the development servers, run:"
echo -e "${CYAN}   pnpm dev${NC}"
echo ""
echo -e "Local Application URLs (once running):"
echo -e "${CYAN}   Frontend Web:  http://localhost:3000${NC}"
echo -e "${CYAN}   Backend API:   http://localhost:8080${NC}"
echo ""

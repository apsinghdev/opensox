#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}========================================================================${NC}"
echo -e "${BLUE}                    Opensox Setup Wizard                               ${NC}"
echo -e "${BLUE}========================================================================${NC}"
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}ERROR: Docker is not installed. Please install Docker first.${NC}"
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}ERROR: Docker daemon is not running. Please start Docker.${NC}"
    exit 1
fi

echo -e "${GREEN}[OK] Docker is ready${NC}"

# Check for env files
echo ""
echo -e "${YELLOW}Checking environment files...${NC}"

# API env
if [ ! -f "apps/api/.env" ]; then
    echo -e "${YELLOW}   Creating apps/api/.env from template...${NC}"
    cp apps/api/.env.example apps/api/.env
    echo -e "${GREEN}   [OK] Created apps/api/.env${NC}"
else
    echo -e "${GREEN}   [OK] apps/api/.env exists${NC}"
fi

# Web env
if [ ! -f "apps/web/.env.local" ]; then
    if [ -f "apps/web/.env.example" ]; then
        echo -e "${YELLOW}   Creating apps/web/.env.local from template...${NC}"
        cp apps/web/.env.example apps/web/.env.local
        echo -e "${GREEN}   [OK] Created apps/web/.env.local${NC}"
    else
        echo -e "${RED}   [WARN] apps/web/.env.example not found, creating minimal .env.local${NC}"
        cat > apps/web/.env.local << 'EOF'
NEXT_PUBLIC_API_URL="http://localhost:8080"
NEXTAUTH_SECRET="replace-with-a-strong-random-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
EOF
        echo -e "${GREEN}   [OK] Created apps/web/.env.local${NC}"
    fi
else
    echo -e "${GREEN}   [OK] apps/web/.env.local exists${NC}"
fi

# Generate secrets
echo ""
echo -e "${YELLOW}Generating secrets...${NC}"

# Generate JWT_SECRET if placeholder
if grep -q "replace-with-a-strong-random-secret" apps/api/.env 2>/dev/null; then
    JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|JWT_SECRET=replace-with-a-strong-random-secret|JWT_SECRET=$JWT_SECRET|g" apps/api/.env
    else
        sed -i "s|JWT_SECRET=replace-with-a-strong-random-secret|JWT_SECRET=$JWT_SECRET|g" apps/api/.env
    fi
    echo -e "${GREEN}   [OK] Generated JWT_SECRET${NC}"
fi

if grep -q "replace-with-a-strong-random-secret" apps/web/.env.local 2>/dev/null; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|NEXTAUTH_SECRET=replace-with-a-strong-random-secret|NEXTAUTH_SECRET=$NEXTAUTH_SECRET|g" apps/web/.env.local
    else
        sed -i "s|NEXTAUTH_SECRET=replace-with-a-strong-random-secret|NEXTAUTH_SECRET=$NEXTAUTH_SECRET|g" apps/web/.env.local
    fi
    echo -e "${GREEN}   [OK] Generated NEXTAUTH_SECRET${NC}"
fi

# Check Google OAuth
echo ""
echo -e "${YELLOW}Checking Google OAuth configuration...${NC}"
if grep -q "your-google-oauth-client-id" apps/web/.env.local 2>/dev/null; then
    echo -e "${YELLOW}   [WARN] Google OAuth is not configured.${NC}"
    echo ""
    echo -e "   To enable authentication, you need to:"
    echo -e "   1. Go to ${BLUE}https://console.cloud.google.com/apis/credentials${NC}"
    echo -e "   2. Create OAuth 2.0 Client ID"
    echo -e "   3. Add redirect URI: ${BLUE}http://localhost:3000/api/auth/callback/google${NC}"
    echo -e "   4. Copy Client ID and Secret to ${BLUE}apps/web/.env.local${NC}"
    echo ""
    read -p "   Press Enter to continue (OAuth can be configured later)..."
else
    echo -e "${GREEN}   [OK] Google OAuth appears to be configured${NC}"
fi

# Start services
echo ""
echo -e "${YELLOW}Starting services...${NC}"
docker compose up -d --build

echo ""
echo -e "${YELLOW}Waiting for database to be ready...${NC}"
sleep 8

# Run migrations
echo ""
echo -e "${YELLOW}Running database migrations...${NC}"
docker compose exec -T api pnpm exec prisma migrate deploy 2>/dev/null || echo -e "${YELLOW}   [INFO] Migrations may need to be run manually${NC}"

# Seed database
echo ""
echo -e "${YELLOW}Seeding database...${NC}"
docker compose exec -T api pnpm exec prisma db seed 2>/dev/null || echo -e "${YELLOW}   [INFO] Seeding may need to be run manually${NC}"

# Final status
echo ""
echo -e "${GREEN}========================================================================${NC}"
echo -e "${GREEN}                    Setup Complete!                                    ${NC}"
echo -e "${GREEN}========================================================================${NC}"
echo ""
echo -e "  Frontend:  ${BLUE}http://localhost:3000${NC}"
echo -e "  API:       ${BLUE}http://localhost:8080${NC}"
echo ""
echo -e "  Useful commands:"
echo -e "    make logs    - View service logs"
echo -e "    make stop    - Stop all services"
echo -e "    make status  - Check service health"
echo ""
echo -e "${GREEN}========================================================================${NC}"

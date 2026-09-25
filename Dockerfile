FROM node:20 AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace configuration files
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Copy package.json files for all workspaces (for better layer caching)
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies for entire workspace
RUN pnpm install

# Copy shared package source (types directory contains the actual source files)
COPY packages/shared/types ./packages/shared/types
COPY packages/shared/tsconfig.json ./packages/shared/tsconfig.json

# Copy API source and config
COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma

# Build shared package first
WORKDIR /app/packages/shared
RUN pnpm run build

# Generate Prisma client
WORKDIR /app/apps/api
RUN pnpm exec prisma generate

# Build API
RUN pnpm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install OpenSSL and other dependencies required by Prisma
RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Copy workspace configuration
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Copy package.json files
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Copy built artifacts from builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Install all dependencies (needed for Prisma generation)
RUN pnpm install

# Generate Prisma client in production stage
WORKDIR /app/apps/api
RUN pnpm exec prisma generate

# Remove devDependencies after Prisma generation
RUN pnpm install --prod

WORKDIR /app/apps/api

EXPOSE 8080

CMD ["node", "dist/index.js"]
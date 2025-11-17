<h1 align="center">Opensox AI </h1>

<p align="center">
    Building 21st century open-source infrastructure
    <br />
    <a href="https://opensox.ai"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="#introduction"><strong>Introduction</strong></a> ·
    <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
    <a href="#contributing"><strong>Contributing</strong></a> ·
    <a href="https://discord.gg/zbHzgMNBrm"><strong>Discord</strong></a>
</p>


<br/>

## Introduction

Opensox AI is a platform designed to help developers quickly discover open-source projects based on their specific criteria so that you can start contributing in seconds, not in days.

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Prisma](https://www.prisma.io/) – ORM
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Turborepo](https://turbo.build/repo) – monorepo
- [Vercel](https://vercel.com/) – deployments
- [Railway](https://railway.com/) – deployments


## Contributing

We love our contributors! Here’s how you can contribute:

- [Open an issue](https://github.com/apsinghdev/opensox/issues) if you believe you’ve encountered a bug.
- Make a [pull request](https://github.com/apsinghdev/opensox/pulls) to add new features, improve quality of life, or fix bugs.

### Setting up locally

Opensox AI's stack consists of the following elements:

- A backend API built with tRPC and Express.js
- A frontend written in Next.js and TypeScript
- A PostgreSQL database
- A Redis database (in process)
- What's for AI? Coming very soon…

#### Prerequisites

Opensox needs [TypeScript](https://www.typescriptlang.org/download/) and [Node.js >= 18](https://nodejs.org/en/download/package-manager) installations.

## Setup environment variables

Create environment files for both the backend and the frontend before running the apps.

### Backend (`apps/api/.env`)

Copy the example environment file and update it with your values:

```bash
cd apps/api
cp .env.example .env
```

Then edit `apps/api/.env` and fill in the required values:

```bash
# Required
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/opensox?schema=public"
JWT_SECRET="replace-with-a-strong-random-secret"

# Optional (good defaults shown)
PORT=8080
CORS_ORIGINS=http://localhost:3000
NODE_ENV=development

# Optional but needed for GitHub queries to work
# Generate a classic token with "public_repo" access at https://github.com/settings/tokens
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Notes:
- DATABASE_URL: point this to your PostgreSQL instance. Example for local Postgres is shown above.
- JWT_SECRET: generate one, e.g. `openssl rand -base64 32` or `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- CORS_ORIGINS: comma-separated list of allowed origins. Keep `http://localhost:3000` for local web app.

### Frontend (`apps/web/.env.local`)

Create a file at `apps/web/.env.local` with:

```bash
# Required
NEXT_PUBLIC_API_URL="http://localhost:8080"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
NEXTAUTH_SECRET="replace-with-a-strong-random-secret"

# Recommended for production (optional for local dev)
NEXTAUTH_URL="http://localhost:3000"

# Optional analytics (PostHog)
# If you don't use PostHog, you can omit these
# NEXT_PUBLIC_POSTHOG_KEY="phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com" # or https://app.posthog.com
```

Notes:
- NEXT_PUBLIC_API_URL must point to the backend base URL; the frontend calls `${NEXT_PUBLIC_API_URL}/api/...` for auth and data.
- Google OAuth: create credentials in Google Cloud Console (OAuth 2.0 Client ID), add Authorized redirect URIs for NextAuth (e.g., `http://localhost:3000/api/auth/callback/google`).
- NEXTAUTH_SECRET: generate one just like `JWT_SECRET`. It’s used by NextAuth; it can be different from the backend secret.

After creating these files, restart your dev servers so changes take effect.


## Database setup (migrations and seed)

Run these steps once your `DATABASE_URL` is set:

```bash
cd apps/api

# Generate Prisma client (optional if already generated)
npx prisma generate

# Apply migrations locally
npx prisma migrate dev --name init
```

Seed initial data so features relying on it work correctly:

- Option A (recommended): use Prisma Studio to insert the initial row

  ```bash
  npx prisma studio
  ```

  Then open the `QueryCount` model and create a row with:
  - `id`: 1
  - `total_queries`: 0

- Option B: insert directly via SQL (replace the connection string as needed)

  ```bash
  psql "postgresql://USER:PASSWORD@localhost:5432/opensox" \
    -c "INSERT INTO \"QueryCount\" (id, total_queries) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;"
  ```


## Setup environment

1. Fork and clone the opensox repo

```bash
git clone https://github.com/[your-github-username]/opensox.git
```

2. `cd` into `opensox/apps/web` and install dependencies

```bash
pnpm install
```

Now run the dev server:

```bash
pnpm run dev
```

Congrats! Your frontend is running on `localhost:3000`.

3. `cd` into `opensox/apps/api` and install dependencies

```bash
npm install
```

Now run the server:

```bash
pnpm run dev
```

Voila! Your API server is running on `localhost:4000`.

Now you can access your app at `http://localhost:3000`.

## Running the API with Docker

Alternatively, you can run the API server using Docker. A `Dockerfile` is provided in the root directory.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine

### Building and Running

1. Make sure you have your `.env` file set up in `apps/api/.env`. You can copy from `.env.example` (see [Backend environment variables](#backend-appsapienv) section above)

2. From the root directory, build the Docker image:

```bash
docker build -t opensox-api .
```

3. Run the container with your environment variables:

```bash
docker run -p 4000:4000 \
  --env-file apps/api/.env \
  opensox-api
```

Or if you prefer to pass environment variables individually:

```bash
docker run -p 4000:4000 \
  -e DATABASE_URL="postgresql://USER:PASSWORD@host.docker.internal:5432/opensox?schema=public" \
  -e JWT_SECRET="your-secret" \
  -e PORT=4000 \
  opensox-api
```

**Note:** When using Docker, if your database is running on your host machine (not in a container), use `host.docker.internal` instead of `localhost` in your `DATABASE_URL`.

Your API server will be available at `http://localhost:4000`.

### Using Docker Compose (Optional)

For a complete setup with PostgreSQL, you can create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: opensox
      POSTGRES_PASSWORD: opensox
      POSTGRES_DB: opensox
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgresql://opensox:opensox@postgres:5432/opensox?schema=public
      JWT_SECRET: your-secret-key
      PORT: 4000
      NODE_ENV: production
    depends_on:
      - postgres

volumes:
  postgres_data:
```

Then run:

```bash
docker-compose up -d
```

# Newsletter Management

## Quick Start

1. Visit `/admin/newsletter` (team members only)
2. Fill in the newsletter form
3. Click "Generate Code" and "Copy Code"
4. Open `data/newsletters.ts`
5. Paste the code at the start of the `newsletters` array
6. Save and deploy

That's it! ✨

## Example

The admin form generates this:
```typescript
{
  id: "18",
  slug: "january-2025-updates",
  title: "January 2025 Updates",
  content: `...`,
  publishedAt: new Date("2025-01-17"),
  author: "opensox.ai team",
},
```

Just paste it into the newsletters array!

## Our contributors

<a href="https://github.com/apsinghdev/opensox/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=apsinghdev/opensox" />
</a>

## Repo Activity

![Opensox readme activity](https://repobeats.axiom.co/api/embed/e6a9549f6e68c7666aa0524d83647bd34a97b4ca.svg "Repobeats analytics image")

## License

[AGPL 3.0](./LICENSE)
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

## Quick Start (Docker) 🐳

Get up and running in **3 steps**:

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running
- [Make](https://www.gnu.org/software/make/) (pre-installed on Mac/Linux)

### 1. Clone the repository
```bash
git clone https://github.com/apsinghdev/opensox.git
cd opensox
```

### 2. Run setup
```bash
# Mac/Linux
make setup

# Windows (PowerShell)
.\setup.ps1
```

This will automatically:
- ✅ Create environment files from templates
- ✅ Generate secure secrets
- ✅ Start all services (Database, API, Web)
- ✅ Run database migrations
- ✅ Seed initial data

### 3. Configure Google OAuth (Required for login)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or use existing)
3. Configure OAuth consent screen
4. Create OAuth 2.0 Client ID (Web application)
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy credentials to `apps/web/.env.local`:
   ```
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```
7. Restart: `make restart`

**Done! 🎉** Visit http://localhost:3000

---

## Common Commands

| Command | Description |
|---------|-------------|
| `make start` | Start all services |
| `make stop` | Stop all services |
| `make logs` | View live logs |
| `make status` | Check service health |
| `make reset` | Reset database (deletes data) |
| `make studio` | Open Prisma Studio (DB GUI) |
| `make help` | Show all available commands |

---

## Troubleshooting

<details>
<summary>🔴 "Cannot connect to Docker daemon"</summary>

Make sure Docker Desktop is running.
</details>

<details>
<summary>🔴 "Port 3000/8080 is already in use"</summary>

Stop the process using the port:
```bash
# Find process (Mac/Linux)
lsof -i :3000

# Windows PowerShell
netstat -ano | findstr :3000
```
</details>

<details>
<summary>🔴 "OAuth error: redirect_uri_mismatch"</summary>

Ensure your Google OAuth redirect URI exactly matches:
`http://localhost:3000/api/auth/callback/google`
</details>

<details>
<summary>🔴 Database connection errors</summary>

Reset the database:
```bash
make reset
```
</details>

---

<details>
<summary><h2>Manual Setup (without Docker)</h2></summary>

### Prerequisites

Opensox needs [TypeScript](https://www.typescriptlang.org/download/) and [Node.js >= 18](https://nodejs.org/en/download/package-manager) installations.

### Setup environment variables

Create environment files for both the backend and the frontend before running the apps.

#### Backend (`apps/api/.env`)

```bash
cd apps/api
cp .env.example .env
```

Edit `apps/api/.env` and fill in:
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - Generate with `openssl rand -base64 32`

#### Frontend (`apps/web/.env.local`)

```bash
cd apps/web
cp .env.example .env.local
```

Edit `apps/web/.env.local` and fill in your Google OAuth credentials.

### Database setup

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### Run the servers

```bash
# Terminal 1 - API
cd apps/api
pnpm install
pnpm run dev

# Terminal 2 - Web
cd apps/web
pnpm install
pnpm run dev
```

Frontend: http://localhost:3000 | API: http://localhost:8080

</details>


## Our contributors

<a href="https://github.com/apsinghdev/opensox/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=apsinghdev/opensox" />
</a>

## Repo Activity

![Opensox readme activity](https://repobeats.axiom.co/api/embed/e6a9549f6e68c7666aa0524d83647bd34a97b4ca.svg "Repobeats analytics image")

## License

[AGPL 3.0](./LICENSE)
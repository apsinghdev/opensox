<#
Windows helper to bootstrap the opensox monorepo for local development.

Usage (PowerShell as admin or with execution policy allowed):
  powershell -ExecutionPolicy Bypass -File scripts\setup-windows.ps1

What it does:
- Verifies `pnpm` is available
- Runs `pnpm install --ignore-scripts` at repo root to avoid POSIX postinstall errors
- Creates `apps/api/.env` (prompts for DATABASE_URL and JWT_SECRET) if missing
- Runs `pnpm exec prisma generate` and `pnpm exec prisma migrate dev --name init` in `apps/api`
- Creates `apps/web/.env.local` (prompts for NEXTAUTH_SECRET) if missing
- Optionally starts API and Web dev servers in new PowerShell windows
#>

Set-StrictMode -Version Latest

function Prompt-Input($message, $default = $null) {
    if ($null -ne $default -and $default -ne '') {
        $prompt = "$message [$default]: "
    } else {
        $prompt = "$message: "
    }
    $value = Read-Host -Prompt $prompt
    if ([string]::IsNullOrWhiteSpace($value)) { return $default } else { return $value }
}

# repo root (assumes script is in scripts/)
$RepoRoot = Join-Path $PSScriptRoot ".." | Resolve-Path -Relative
$RepoRoot = (Resolve-Path $RepoRoot).ProviderPath

Write-Host "Repository root: $RepoRoot"

# check pnpm
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Error "pnpm not found in PATH. Install Node.js >=18 and run 'npm install -g pnpm' first."
    exit 1
}

Push-Location $RepoRoot
try {
    Write-Host "Running: pnpm install --ignore-scripts (may take a while)"
    pnpm install --ignore-scripts

    # Setup apps/api .env
    $ApiEnv = Join-Path $RepoRoot "apps\api\.env"
    if (-not (Test-Path $ApiEnv)) {
        Write-Host "Creating apps/api/.env"
        $dbUrl = Prompt-Input "DATABASE_URL (postgresql://USER:PASS@localhost:5432/opensox?schema=public)" "postgresql://postgres:password@localhost:5432/opensox?schema=public"
        $jwt = Prompt-Input "JWT_SECRET (random string)" ([guid]::NewGuid().ToString())
        $envLines = @(
            "DATABASE_URL=\"$dbUrl\""
            "JWT_SECRET=$jwt"
        )
        $envLines | Out-File -FilePath $ApiEnv -Encoding UTF8
        Write-Host "Created $ApiEnv"
    } else {
        Write-Host "apps/api/.env already exists — skipping creation"
    }

    # Prisma generate
    Push-Location (Join-Path $RepoRoot "apps\api")
    try {
        Write-Host "Generating Prisma Client"
        pnpm exec prisma generate

        $migrate = Prompt-Input "Run prisma migrate dev --name init now? (y/n)" "y"
        if ($migrate -match '^[Yy]') {
            pnpm exec prisma migrate dev --name init
        } else {
            Write-Host "Skipping migration. You can run 'pnpm exec prisma migrate dev --name init' later."
        }
    } finally { Pop-Location }

    # Setup apps/web .env.local
    $WebEnv = Join-Path $RepoRoot "apps\web\.env.local"
    if (-not (Test-Path $WebEnv)) {
        Write-Host "Creating apps/web/.env.local"
        $apiUrl = Prompt-Input "NEXT_PUBLIC_API_URL" "http://localhost:8080"
        $nextauth = Prompt-Input "NEXTAUTH_SECRET (random string)" ([guid]::NewGuid().ToString())
        $lines = @(
            "NEXT_PUBLIC_API_URL=$apiUrl"
            "NEXTAUTH_SECRET=$nextauth"
            "GOOGLE_CLIENT_ID="
            "GOOGLE_CLIENT_SECRET="
        )
        $lines | Out-File -FilePath $WebEnv -Encoding UTF8
        Write-Host "Created $WebEnv"
    } else {
        Write-Host "apps/web/.env.local already exists — skipping creation"
    }

    # Optionally start dev servers
    $start = Prompt-Input "Start API and Web dev servers now in new windows? (y/n)" "n"
    if ($start -match '^[Yy]') {
        $apiPath = Join-Path $RepoRoot "apps\api"
        $webPath = Join-Path $RepoRoot "apps\web"

        Write-Host "Starting API dev server in new PowerShell window..."
        Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$apiPath'; pnpm run dev"

        Write-Host "Starting Web dev server in new PowerShell window..."
        Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$webPath'; pnpm run dev"
    } else {
        Write-Host "Setup complete. To start servers manually, run the following commands in PowerShell:"
        Write-Host "  cd \"$RepoRoot\"\n  cd apps/api\n  pnpm run dev\n\n  cd $RepoRoot\n  cd apps/web\n  pnpm run dev"
    }

} finally {
    Pop-Location
}

Write-Host "Done."

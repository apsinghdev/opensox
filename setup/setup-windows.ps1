# ==============================================================================
# OpenSox Interactive Setup Script for Windows (PowerShell)
# ==============================================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "         OpenSox Local Environment Setup (Windows)     " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$RootDir = Get-Location
$ApiEnvPath = Join-Path $RootDir "apps\api\.env"
$ApiEnvExample = Join-Path $RootDir "apps\api\.env.example"
$WebEnvPath = Join-Path $RootDir "apps\web\.env.local"

function Test-EnvKey {
    param(
        [string]$FilePath,
        [string]$KeyName
    )
    if (-not (Test-Path $FilePath)) {
        return $false
    }
    $content = Get-Content $FilePath
    foreach ($line in $content) {
        if ($line -match "^$KeyName\s*=\s*(.+)") {
            if ($Matches[1].Trim() -ne "") {
                return $true
            }
        }
    }
    return $false
}

# ------------------------------------------------------------------------------
# 1. API Environment Variables Check (.env)
# ------------------------------------------------------------------------------
Write-Host "[1/4] Checking apps/api/.env..." -ForegroundColor Yellow

$ApiMissing = -not (Test-Path $ApiEnvPath)
$HasDbUrl = Test-EnvKey -FilePath $ApiEnvPath -KeyName "DATABASE_URL"
$HasJwtSecret = Test-EnvKey -FilePath $ApiEnvPath -KeyName "JWT_SECRET"
$ApiIncomplete = (-not $HasDbUrl) -or (-not $HasJwtSecret)

if ($ApiMissing) {
    Write-Host "[WARN] apps/api/.env file is missing!" -ForegroundColor Red
} elseif ($ApiIncomplete) {
    Write-Host "[WARN] apps/api/.env exists but is missing essential variables!" -ForegroundColor Red
} else {
    Write-Host "[OK] apps/api/.env is fully configured with essential keys." -ForegroundColor Green
}

if ($ApiMissing -or $ApiIncomplete) {
    Write-Host ""
    Write-Host "Important environment variables for apps/api/.env:" -ForegroundColor Cyan
    Write-Host "   - DATABASE_URL (e.g., postgresql://postgres:postgres@localhost:5432/opensox?schema=public)" -ForegroundColor Gray
    Write-Host "   - JWT_SECRET (e.g., a-random-secret-key)" -ForegroundColor Gray
    Write-Host "   - PORT (default: 8080)" -ForegroundColor Gray
    Write-Host ""

    if ($ApiMissing) {
        $CreateApiEnv = Read-Host "Would you like to copy apps/api/.env.example to apps/api/.env now? (Y/n)"
        if ($CreateApiEnv -eq "" -or $CreateApiEnv -eq "y" -or $CreateApiEnv -eq "Y") {
            Copy-Item $ApiEnvExample $ApiEnvPath
            Write-Host "[OK] Created apps/api/.env from .env.example. Please review and update DATABASE_URL if needed." -ForegroundColor Green
        } else {
            Write-Host "Please create apps/api/.env manually with essential keys before running the app." -ForegroundColor Yellow
        }
    }
}

Write-Host ""

# ------------------------------------------------------------------------------
# 2. Web Environment Variables Check (.env.local)
# ------------------------------------------------------------------------------
Write-Host "[2/4] Checking apps/web/.env.local..." -ForegroundColor Yellow

$WebMissing = -not (Test-Path $WebEnvPath)

if ($WebMissing) {
    Write-Host "[WARN] apps/web/.env.local is missing!" -ForegroundColor Red
    Write-Host "Essential environment variables for apps/web/.env.local:" -ForegroundColor Cyan
    Write-Host "   - NEXT_PUBLIC_API_URL (default: http://localhost:8080)" -ForegroundColor Gray
    Write-Host "   - NEXTAUTH_SECRET (e.g., a-random-secret)" -ForegroundColor Gray
    Write-Host ""

    $CreateWebEnv = Read-Host "Would you like to create apps/web/.env.local with default local values now? (Y/n)"
    if ($CreateWebEnv -eq "" -or $CreateWebEnv -eq "y" -or $CreateWebEnv -eq "Y") {
        $webLines = @(
            "# Required for Local Setup",
            'NEXT_PUBLIC_API_URL="http://localhost:8080"',
            'NEXTAUTH_SECRET="opensox-local-dev-secret-key"',
            'NEXTAUTH_URL="http://localhost:3000"'
        )
        Set-Content -Path $WebEnvPath -Value $webLines -Encoding UTF8
        Write-Host "[OK] Created apps/web/.env.local!" -ForegroundColor Green
    } else {
        Write-Host "Please create apps/web/.env.local manually before running the app." -ForegroundColor Yellow
    }
} else {
    Write-Host "[OK] apps/web/.env.local is configured." -ForegroundColor Green
}

Write-Host ""

# ------------------------------------------------------------------------------
# 3. Dependency Installation (pnpm)
# ------------------------------------------------------------------------------
Write-Host "[3/4] Checking workspace dependencies..." -ForegroundColor Yellow

if (-not (Test-Path (Join-Path $RootDir "node_modules"))) {
    Write-Host "Installing dependencies with pnpm..." -ForegroundColor Cyan
    pnpm install
} else {
    Write-Host "[OK] Root node_modules found. Checking for updates..." -ForegroundColor Green
    pnpm install --prefer-offline
}

Write-Host ""

# ------------------------------------------------------------------------------
# 4. Prisma Client Generation & Database Migrations
# ------------------------------------------------------------------------------
Write-Host "[4/4] Setting up Prisma Database Client..." -ForegroundColor Yellow

Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
pnpm --filter api exec prisma generate

Write-Host ""
$RunMigration = Read-Host "Would you like to run database migrations now (requires running PostgreSQL DB)? (y/N)"
if ($RunMigration -eq "y" -or $RunMigration -eq "Y") {
    Write-Host "Running Prisma migrations..." -ForegroundColor Cyan
    pnpm --filter api exec prisma migrate dev
} else {
    Write-Host "Skipped database migrations. You can run 'pnpm --filter api exec prisma migrate dev' later." -ForegroundColor Gray
}

# ------------------------------------------------------------------------------
# Setup Complete
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  OpenSox Setup Complete!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host "To start the development servers, run:" -ForegroundColor White
Write-Host "   pnpm dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Local Application URLs (once running):" -ForegroundColor White
Write-Host "   Frontend Web:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend API:   http://localhost:8080" -ForegroundColor Cyan
Write-Host ""

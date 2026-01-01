# Opensox Setup Script for Windows PowerShell
# Run this instead of 'make setup' on Windows

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================================================" -ForegroundColor Blue
Write-Host "                    Opensox Setup Wizard (Windows)                     " -ForegroundColor Blue
Write-Host "========================================================================" -ForegroundColor Blue
Write-Host ""

# Check Docker
Write-Host "Checking Docker..." -ForegroundColor Yellow
try {
    docker info | Out-Null
    Write-Host "[OK] Docker is running" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check for env files
Write-Host ""
Write-Host "Checking environment files..." -ForegroundColor Yellow

# API env
if (-not (Test-Path "apps/api/.env")) {
    Write-Host "   Creating apps/api/.env from template..." -ForegroundColor Yellow
    Copy-Item "apps/api/.env.example" "apps/api/.env"
    Write-Host "   [OK] Created apps/api/.env" -ForegroundColor Green
} else {
    Write-Host "   [OK] apps/api/.env exists" -ForegroundColor Green
}

# Web env
if (-not (Test-Path "apps/web/.env.local")) {
    if (Test-Path "apps/web/.env.example") {
        Write-Host "   Creating apps/web/.env.local from template..." -ForegroundColor Yellow
        Copy-Item "apps/web/.env.example" "apps/web/.env.local"
        Write-Host "   [OK] Created apps/web/.env.local" -ForegroundColor Green
    } else {
        Write-Host "   Creating minimal apps/web/.env.local..." -ForegroundColor Yellow
        @"
NEXT_PUBLIC_API_URL="http://localhost:8080"
NEXTAUTH_SECRET="replace-with-a-strong-random-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
"@ | Out-File -FilePath "apps/web/.env.local" -Encoding UTF8
        Write-Host "   [OK] Created apps/web/.env.local" -ForegroundColor Green
    }
} else {
    Write-Host "   [OK] apps/web/.env.local exists" -ForegroundColor Green
}

# Generate secrets
Write-Host ""
Write-Host "Generating secrets..." -ForegroundColor Yellow

function Generate-Secret {
    $bytes = New-Object byte[] 32
    [Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
    return [Convert]::ToBase64String($bytes)
}

# Update JWT_SECRET if placeholder
$apiEnv = Get-Content "apps/api/.env" -Raw
if ($apiEnv -match "replace-with-a-strong-random-secret") {
    $secret = Generate-Secret
    $apiEnv = $apiEnv -replace "JWT_SECRET=replace-with-a-strong-random-secret", "JWT_SECRET=$secret"
    $apiEnv | Out-File -FilePath "apps/api/.env" -Encoding UTF8 -NoNewline
    Write-Host "   [OK] Generated JWT_SECRET" -ForegroundColor Green
}

# Update NEXTAUTH_SECRET if placeholder
$webEnv = Get-Content "apps/web/.env.local" -Raw
if ($webEnv -match "replace-with-a-strong-random-secret") {
    $secret = Generate-Secret
    $webEnv = $webEnv -replace "NEXTAUTH_SECRET=replace-with-a-strong-random-secret", "NEXTAUTH_SECRET=$secret"
    $webEnv | Out-File -FilePath "apps/web/.env.local" -Encoding UTF8 -NoNewline
    Write-Host "   [OK] Generated NEXTAUTH_SECRET" -ForegroundColor Green
}

# Check Google OAuth
Write-Host ""
Write-Host "Checking Google OAuth configuration..." -ForegroundColor Yellow
$webEnv = Get-Content "apps/web/.env.local" -Raw
if ($webEnv -match "your-google-oauth-client-id") {
    Write-Host "   [WARN] Google OAuth is not configured." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   To enable authentication, you need to:"
    Write-Host "   1. Go to https://console.cloud.google.com/apis/credentials" -ForegroundColor Cyan
    Write-Host "   2. Create OAuth 2.0 Client ID"
    Write-Host "   3. Add redirect URI: http://localhost:3000/api/auth/callback/google" -ForegroundColor Cyan
    Write-Host "   4. Copy Client ID and Secret to apps/web/.env.local" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "   Press Enter to continue (OAuth can be configured later)"
} else {
    Write-Host "   [OK] Google OAuth appears to be configured" -ForegroundColor Green
}

# Start services
Write-Host ""
Write-Host "Starting services..." -ForegroundColor Yellow
docker compose up -d --build

Write-Host ""
Write-Host "Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Run migrations
Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Yellow
try {
    docker compose exec -T api pnpm exec prisma migrate deploy
} catch {
    Write-Host "   [INFO] Migrations may need to be run manually" -ForegroundColor Yellow
}

# Seed database  
Write-Host ""
Write-Host "Seeding database..." -ForegroundColor Yellow
try {
    docker compose exec -T api pnpm exec prisma db seed
} catch {
    Write-Host "   [INFO] Seeding may need to be run manually" -ForegroundColor Yellow
}

# Final status
Write-Host ""
Write-Host "========================================================================" -ForegroundColor Green
Write-Host "                    Setup Complete!                                    " -ForegroundColor Green
Write-Host "========================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "  API:       http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Useful commands:"
Write-Host "    .\setup.ps1           - Run this setup again"
Write-Host "    docker compose logs   - View service logs"
Write-Host "    docker compose down   - Stop all services"
Write-Host "    docker compose ps     - Check service status"
Write-Host ""
Write-Host "========================================================================" -ForegroundColor Green

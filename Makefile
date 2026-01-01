.PHONY: help start stop restart logs clean reset setup dev test status health migrate seed studio shell-api shell-db dev-local logs-api logs-web logs-db migrate-dev

# Default target - show help
help:
	@echo ""
	@echo "========================================================================"
	@echo "                    Opensox Development CLI                            "
	@echo "========================================================================"
	@echo ""
	@echo "  GETTING STARTED:"
	@echo "    make setup     - First-time setup wizard (run this first!)"
	@echo "    make start     - Start all services (DB, API, Web)"
	@echo ""
	@echo "  SERVICE MANAGEMENT:"
	@echo "    make stop      - Stop all services"
	@echo "    make restart   - Restart all services"
	@echo "    make logs      - View logs from all services"
	@echo "    make status    - Check service health"
	@echo ""
	@echo "  DATABASE:"
	@echo "    make migrate   - Run database migrations"
	@echo "    make seed      - Seed database with initial data"
	@echo "    make studio    - Open Prisma Studio (GUI)"
	@echo "    make reset     - Stop services and reset database (DELETES DATA)"
	@echo ""
	@echo "  DEBUGGING:"
	@echo "    make shell-api - Open shell in API container"
	@echo "    make shell-db  - Open psql shell in database"
	@echo "    make logs-api  - View API logs only"
	@echo "    make logs-web  - View Web logs only"
	@echo ""
	@echo "  CLEANUP:"
	@echo "    make clean     - Remove containers, volumes, and build cache"
	@echo ""
	@echo "========================================================================"
	@echo ""

# First-time setup
setup:
	@echo "Starting Opensox setup wizard..."
	@chmod +x ./scripts/setup.sh 2>/dev/null || true
	@./scripts/setup.sh

# Start all services
start:
	@echo "Starting all services..."
	docker compose up -d
	@$(MAKE) --no-print-directory health
	@echo ""
	@echo "Services started successfully!"
	@echo "  Frontend: http://localhost:3000"
	@echo "  API:      http://localhost:8080"
	@echo ""

# Stop all services
stop:
	@echo "Stopping all services..."
	docker compose down

# Restart services
restart: stop start

# View logs
logs:
	docker compose logs -f

logs-api:
	docker compose logs -f api

logs-web:
	docker compose logs -f web

logs-db:
	docker compose logs -f postgres

# Check status
status:
	@docker compose ps

# Health check
health:
	@echo "Waiting for services to be healthy..."
	@sleep 3
	@docker compose ps --format "table {{.Name}}\t{{.Status}}" | head -10

# Database operations
migrate:
	@echo "Running database migrations..."
	docker compose exec api pnpm exec prisma migrate deploy

migrate-dev:
	docker compose exec api pnpm exec prisma migrate dev

seed:
	@echo "Seeding database..."
	docker compose exec api pnpm exec prisma db seed

studio:
	@echo "Opening Prisma Studio..."
	docker compose exec api pnpm exec prisma studio

# Reset database
reset:
	@echo "WARNING: This will delete all data. Are you sure? [y/N] " && read ans && [ $${ans:-N} = y ]
	docker compose down -v
	@$(MAKE) --no-print-directory start
	@$(MAKE) --no-print-directory migrate
	@$(MAKE) --no-print-directory seed

# Clean everything
clean:
	@echo "Cleaning up..."
	docker compose down -v --rmi local --remove-orphans
	rm -rf apps/api/node_modules apps/web/node_modules
	rm -rf apps/api/dist apps/web/.next

# Shell access
shell-api:
	docker compose exec api sh

shell-db:
	docker compose exec postgres psql -U opensox -d opensox

# Development without Docker (uses local Node)
dev-local:
	@echo "Starting local development..."
	pnpm install
	pnpm run dev

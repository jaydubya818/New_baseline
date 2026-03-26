# ============================================================
# Makefile — Shortcuts for common operations
# Usage: make dev, make test, make db-reset, etc.
# ============================================================

.PHONY: dev build start test lint format typecheck clean db db-stop db-reset db-studio setup help

# --- Development ---
dev:                ## Start dev server with Turbopack
	npm run dev

build:              ## Production build
	npm run build

start:              ## Start production server
	npm run start

# --- Quality ---
test:               ## Run all tests (unit + E2E)
	npm run test

test-unit:          ## Run unit tests only
	npm run test:unit

test-e2e:           ## Run E2E tests only
	npm run test:e2e

test-watch:         ## Run unit tests in watch mode
	npm run test:unit:watch

coverage:           ## Run tests with coverage report
	npm run test:coverage

lint:               ## Run ESLint
	npm run lint

lint-fix:           ## Run ESLint with auto-fix
	npm run lint:fix

format:             ## Format all files with Prettier
	npm run format

format-check:       ## Check formatting without writing
	npm run format:check

typecheck:          ## Run TypeScript type checker
	npm run typecheck

# --- Database ---
db:                 ## Start local Postgres
	docker compose up -d

db-stop:            ## Stop local Postgres
	docker compose down

db-reset:           ## Reset database (wipes all data)
	npm run db:reset

db-migrate:         ## Create and apply migration
	npm run db:migrate

db-studio:          ## Open Prisma Studio
	npm run db:studio

db-seed:            ## Seed database
	npm run db:seed

db-generate:        ## Regenerate Prisma client
	npm run db:generate

# --- Setup ---
setup:              ## Full setup: install deps, start DB, generate client, push schema, seed
	npm install
	docker compose up -d
	sleep 2
	npm run db:generate
	npm run db:push
	npm run db:seed
	@echo "✅ Ready — run 'make dev' to start"

clean:              ## Remove build artifacts and node_modules
	npm run clean

secrets-scan:       ## Scan for accidentally committed secrets
	npm run secrets:scan

# --- Help ---
help:               ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help

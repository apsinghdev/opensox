---
alwaysApply: true
---

# Backend Development Rules

## API Design & Security

### Authentication & Authorization
- always validate user authentication before processing protected routes
- use middleware for auth checks; never duplicate auth logic in route handlers
- encrypt sensitive data (passwords, tokens, API keys) before storing in database
- implement rate limiting on all public endpoints to prevent abuse
- validate and sanitize all user inputs to prevent injection attacks

### Error Handling
- never expose internal error details or stack traces in production responses
- use consistent error response format: `{ success: false, error: { code, message } }`
- log errors with context (userId, endpoint, timestamp) for debugging
- handle database connection failures gracefully with retry logic
- return appropriate HTTP status codes (400 for validation, 401 for auth, 500 for server errors)

### Database Operations
- always use parameterized queries or ORM methods to prevent SQL injection
- wrap database transactions in try-catch blocks with proper rollback on failure
- index frequently queried fields for performance optimization
- avoid N+1 queries; use eager loading or batch queries when fetching related data
- validate data against schema before database operations

## Code Organization

### Service Layer Pattern
- separate business logic into service files (`services/` directory)
- keep route handlers thin; delegate complex logic to services
- make services testable by avoiding direct database calls in business logic
- export pure functions from services for easier unit testing

### Type Safety
- define strict TypeScript interfaces for request/response bodies
- use zod or similar for runtime validation of incoming data
- avoid `any` type; use `unknown` for truly dynamic data and narrow with type guards
- export types from shared package for consistency across apps

### Environment & Configuration
- never commit `.env` files or hardcode secrets in code
- validate required environment variables on startup; fail fast if missing
- use type-safe environment variable access with proper defaults
- document all required environment variables in `.env.example`

## Performance & Reliability

### Async Operations
- always await async operations; never forget to handle promise rejections
- use connection pooling for database and external service clients
- implement timeouts for external API calls to prevent hanging requests

### Monitoring & Logging
- log all critical operations (auth attempts, payment processing, data mutations)
- include correlation IDs in logs for request tracing across services
- use structured logging (JSON format) for easier parsing and analysis
- never log sensitive information (passwords, tokens, credit card numbers)

# Notifier

Governify's Notifier microservice. Requires Node.js 24+ and MongoDB.

## Send email

Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` before starting Notifier. Both
are required. Use a sender from a verified Resend domain. Set `JWT_SECRET` to
match Authenticator's deployment secret.

Send `POST /api/v1/emails` with a service JWT in
`Authorization: Bearer <token>` and a JSON body.

```json
{
    "to": "recipient@example.com",
    "subject": "Governance report",
    "text": "Your governance report is ready."
}
```

`to` accepts a valid email address. Include `text`,
`html`, or both. A `202 Accepted` response includes the Resend email ID in
`data.id`.

## Scripts

- `npm install` — Install dependencies
- `npm run dev` — Start in development mode
- `npm run build` — Compile TypeScript to JavaScript
- `npm run start` — Start compiled app

## Features

- Swagger API documentation
- Centralized error handling
- Standardized API responses
- Environment variable management with dotenv
- MongoDB integration with Mongoose
- Structured logging with tags
- Layered architecture (routes, controllers, services, models)
- TypeScript for type safety
- ESLint and Prettier for code quality and formatting
- Unit tests with Vitest
- GitHub Actions CI/CD pipeline
- Health check endpoint
- Husky pre-commit hooks
- Dockerfile for containerization
- Request validation with Express Validator
- Graceful shutdown handling XXXXXXXXXXXXXX
- Rate limiting middleware XXXXXXXXXXXXXXXXXXXXXX
- Helmet for security headers

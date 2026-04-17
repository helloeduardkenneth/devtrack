# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevTrack is a full-stack job application tracker with a monorepo structure:
- `job-tracker-frontend` — React + Vite + TanStack Query + Tailwind CSS 4
- `job-tracker-backend` — Express + Prisma + PostgreSQL

## Development Commands

### Frontend (job-tracker-frontend/)
```bash
npm run dev          # Start dev server (Vite)
npm run build        # TypeScript check + production build
npm run test         # Run Vitest tests
npm run test -- --run src/path/to/file.test.tsx  # Run single test file
npm run lint         # ESLint check
npm run format       # Prettier format all files
npm run format:check # Check formatting
```

### Backend (job-tracker-backend/)
```bash
npm run dev          # Start dev server with hot reload (tsx watch)
npm run db:migrate   # Run Prisma migrations (interactive)
npm run test         # Run Vitest tests with NODE_ENV=test
```

## Architecture

### Backend Structure

Modules follow a **route → controller → service** pattern:

```
src/modules/{module}/
  {module}.routes.ts      # Express route definitions with Swagger docs
  {module}.controller.ts  # Request/response handling, validation
  {module}.service.ts     # Business logic, Prisma operations
  {module}.types.ts       # TypeScript interfaces
  {module}.validation.ts  # Zod schemas
```

**Shared utilities:**
- `src/shared/helpers/jwt.ts` — Token generation/verification
- `src/shared/helpers/password.ts` — bcrypt password hashing
- `src/db/prisma.ts` — Prisma client singleton

**Authentication flow:**
- JWT tokens passed via `Authorization: Bearer <token>` header
- `getUserIdFromRequest()` helper extracts and verifies tokens in controllers
- Token payload contains `userId: number`

### Frontend Structure

**API Layer:** `src/api/`
- Plain async functions using Axios instance
- No hooks here - just data fetching

**State Management:** `src/queries/`
- TanStack Query hooks in `.queries.ts` files (read operations)
- Mutation hooks in `.mutation.ts` files (write operations)
- `queryKeys.ts` centralizes cache keys

**Custom Hooks:** `src/hooks/`
- Page-level state hooks (e.g., `useApplicationsPage`)
- Feature-specific logic (e.g., `useAddJobModal`)

**Components:**
- `src/components/ui/` — shadcn/ui primitives (Button, Input, Form, etc.)
- `src/components/modals/` — Modal components (AddJobModal, DeleteConfirmationModal, ViewApplicationModal)
- `src/components/shared/` — Reusable shared components

### Validation Patterns

**Backend:** Zod schemas in `{module}.validation.ts`
- Use `optionalTrimmedString` pattern for optional string fields
- Salary validation uses `.superRefine()` to enforce min ≤ max

**Frontend:** Same Zod schemas shared via `src/validations/`
- Used with React Hook Form via `@hookform/resolvers/zod`
- Form values differ from API payload (human-readable enums like "Full-time" vs DB enums like "FULL_TIME")

### Status/Priority Constants

Status colors defined in `src/constants/applications.constants.ts`:
```typescript
STATUS_COLORS: Record<ApplicationStatus, string>
// Applied → 'bg-blue-50 text-blue-700 border-blue-200'
// Offer → 'bg-green-50 text-green-700 border-green-200'
// etc.
```

### Database Schema Patterns

Prisma enums use UPPER_SNAKE_CASE (e.g., `FULL_TIME`, `PHONE_SCREEN`)
Frontend uses Title Case (e.g., "Full-time", "Phone Screen")
Mappers in `applications.mappers.ts` handle conversion between formats

### Modal Patterns

Modals use `motion/react` for animations:
- Backdrop with `backdrop-blur-sm`
- Modal card with `rounded-2xl`, `shadow-2xl`
- Top accent bar with gradient
- Staggered entrance animations using `transition={{ delay }}`

### Testing Patterns

**Backend:** Vitest + Supertest
- Test files in `tests/` directory
- Tests hit actual database (no mocks)

**Frontend:** Vitest + React Testing Library + jsdom
- Colocated with source files: `__tests__/Component.test.tsx`
- Mock TanStack Query hooks using `wrapper` option

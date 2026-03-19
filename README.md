```
██████╗ ███████╗██╗   ██╗████████╗██████╗  █████╗  ██████╗██╗  ██╗
██╔══██╗██╔════╝██║   ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
██║  ██║█████╗  ██║   ██║   ██║   ██████╔╝███████║██║     █████╔╝
██║  ██║██╔══╝  ╚██╗ ██╔╝   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗
██████╔╝███████╗ ╚████╔╝    ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
╚═════╝ ╚══════╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
```

# DevTrack (Job Tracker)

DevTrack is a full-stack job application tracker that helps users organize applications, monitor progress, and manage their job hunt with less stress.

---

## Monorepo Structure

- `job-tracker-frontend` — React + Vite + TanStack Query
- `job-tracker-backend` — Express + Prisma + PostgreSQL

---

## Current Features

### Authentication

- `POST /auth/signup`
- `POST /auth/signin`
- JWT-based authentication
- Zod request validation

### User Profile

- `GET /auth/profile` (authenticated)
  - returns:
    - `email`
    - `full_name`
    - `current_job`

### Frontend Integration

- Axios API client with Bearer token interceptor
- Auth context + protected routing
- Profile query hook (`useGetUserProfile`)
- Sidebar user profile integration with loading state handling

### API Docs

- Swagger UI available at:
  - `http://localhost:3000/api-docs`
- Includes Bearer auth scheme for secured endpoints

### Testing

- **Backend:** Vitest + Supertest
  - signup/signin tests
  - profile endpoint auth tests (success, no token, invalid token)
- **Frontend:** Vitest + React Testing Library
  - profile query hook tests (success + error)

---

## Quick Start

### 1) Backend

```bash
cd job-tracker-backend
npm install
npx prisma migrate dev
npm run dev
```

Run backend tests:

```bash
npm test
```

### 2) Frontend

```bash
cd job-tracker-frontend
npm install
npm run dev
```

Run frontend tests:

```bash
npm test
```

---

## Architecture Decisions (Current Implementation)

- **Auth token storage:** token is stored in a cookie from the frontend helper and attached to requests via Axios `Authorization: Bearer <token>` interceptor.
- **Protected pages:** route protection is done in frontend via `ProtectedRoute` + `AuthContext`.
- **Server state management:** TanStack Query is used for API calls and async state (`useGetUserProfile`).
- **Backend structure:** auth module follows route → controller → service flow, with Prisma in service layer.

These choices keep the current code simple and readable for a portfolio project.

---

## Trade-offs / Scope Notes

- Current token approach is practical for learning/demo, but production apps often use stricter session hardening (e.g., httpOnly cookies with refresh-token flow).
- Profile endpoint is implemented inside the auth module (`/auth/profile`) for simplicity.
- Focus was on clear architecture and working feature flow first, before adding broader modules.

---

## Testing Strategy

- Backend tests validate auth flows and token-protected profile endpoint behavior.
- Frontend tests currently focus on query behavior for profile fetching.
- UI integration/e2e coverage is not yet added in this version.

---

## Planned Improvements

- Add centralized auth middleware for protected backend routes
- Add edit/update profile flow
- Add broader frontend UI tests for profile rendering states
- Add CI checks for test + lint on pull requests

---

## Notes

- Commit `prisma/migrations/**` and `schema.prisma` to version control.
- Do **not** commit `.env` or secrets.
- For public sharing, include `.env.example` files (keys only, no secret values).

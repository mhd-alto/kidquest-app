# KidQuest — frontend for the NestJS LMS API

A Next.js (App Router) + Tailwind + Axios frontend built against your
`NestJS_LMS_CRUD_Postman_Collection` API. Visual direction is a playful,
game-like "quest" theme adapted from the KidQuest mobile mock into a
web layout (persistent sidebar + responsive course grid, bottom tab
bar kept on small screens).

## Setup

```bash
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL to your NestJS server
npm run dev
```

Open http://localhost:3000 — you'll land on `/login`, which posts to
`POST /auth/register` and `POST /auth/login` on your API.

## How it's wired to your API

| Screen | Endpoints used |
|---|---|
| Login / Register | `POST /auth/login`, `POST /auth/register`, `GET /auth/profile` |
| Home (`/dashboard`) | `GET /courses`, `GET /videos` (for lesson counts), `GET /enrollments` (for progress), `GET /achievements` + `GET /user-achievements` (for XP) |
| Course detail (`/courses/:id`) | `GET /courses/:id`, `GET /videos`, `GET /enrollments`, `POST /enrollments` (Start Course) |
| Badges (`/badges`) | `GET /badges`, `GET /user-badges` |
| Profile (`/profile`) | `PATCH /users/:id` |

`lib/axios.ts` holds one shared Axios instance: it reads
`NEXT_PUBLIC_API_URL`, attaches the JWT from `localStorage` to every
request, and redirects to `/login` on a 401. `context/AuthContext.tsx`
wraps login/register/logout and exposes the current user everywhere via
`useAuth()`.

## Notes / assumptions

- Your collection doesn't include a login-streak or "days active"
  endpoint, so the weekly **quest trail** on the dashboard is currently
  driven by a placeholder (`enrollments.length`) — swap the
  `streakCompleted` calculation in `app/dashboard/page.tsx` for a real
  endpoint once one exists.
- Course progress is a simple placeholder (0% / 45% / 100% based on
  enrollment `status`) since there's no per-video "completed" field in
  the collection yet.
- The login response shape (`access_token` vs `token` vs `accessToken`)
  is auto-detected in `context/AuthContext.tsx` — adjust
  `extractToken()` if your `AuthService` names it differently.

## Structure

```
app/
  login/ register/         — auth screens
  dashboard/                — home screen (matches the reference design)
  courses/[id]/             — lessons for one course
  badges/  profile/
components/                 — Sidebar, MobileNav, QuestTrail, CourseCard, AppShell
context/AuthContext.tsx      — JWT + current user
lib/axios.ts                 — shared Axios instance + interceptors
lib/api/*.ts                 — one file per resource, matching the Postman collection
```

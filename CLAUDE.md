# Ruckon

Ruckon is a rucking community platform. Owners create communities ($25/month), members join them ($20/month). Members receive a monthly patch, workout program, and access to the community. The app manages community activity, ruck tracking, announcements, leaderboards, and patch fulfillment.

## Stack
- **Framework**: Next.js 15 (App Router, TypeScript strict mode)
- **Database**: Turso (LibSQL/SQLite) with Drizzle ORM
- **Auth**: NextAuth v5 (Auth.js) — email + password credentials
- **Styles**: Tailwind CSS v4 + shadcn/ui
- **Email**: Resend
- **Deployment**: Vercel
- **Package manager**: npm

## Commands
- `npm run dev` — dev server on port 3000
- `npm run build` — production build (run this before every commit)
- `npm run lint` — ESLint
- `npm run db:push` — push schema changes to Turso
- `npm run db:studio` — open Drizzle Studio

## File Organization
- `src/app/(auth)/` — login, signup
- `src/app/(owner)/` — owner-only routes (role-gated in layout.tsx)
- `src/app/(member)/` — member-only routes (role-gated in layout.tsx)
- `src/app/join/[slug]/` — public community landing + join flow
- `src/app/api/` — all Route Handlers
- `src/db/schema.ts` — ALL database tables defined here, never split
- `src/db/queries/` — all db access functions, grouped by domain
- `src/lib/auth.ts` — NextAuth config, session types, role utilities
- `src/types/index.ts` — shared TypeScript types for the whole app

## Roles
- `owner` — creates and manages one community
- `member` — belongs to one community

Routing rules:
- Owner logs in → redirect to /dashboard (or /onboarding/owner if not complete)
- Member logs in → redirect to /feed (or /onboarding/member if first_login_complete is false)
- Members cannot access /dashboard/* routes
- Owners cannot access /feed/* or /member/* routes

## Database Schema (Turso + Drizzle)
users
id, email, password_hash, name, role, community_id,
onboarding_complete (owner), first_login_complete (member), created_at
communities
id, owner_id, name, slug, tagline, logo_url, banner_url,
onboarding_complete, shopify_product_id, created_at
announcements
id, community_id, owner_id, body, image_url, pinned (0/1),
deleted (0/1), created_at
announcement_reactions
id, announcement_id, user_id, emoji, created_at
UNIQUE(announcement_id, user_id, emoji)
ruck_logs
id, user_id, community_id, date, distance_miles, duration_minutes,
weight_lbs, notes, photo_url, created_at
ruck_kudos
id, ruck_log_id, user_id, created_at
UNIQUE(ruck_log_id, user_id)
workouts
id, community_id, content, is_active (0/1), created_at
patches
id, community_id, month, year, image_url, created_at
member_patches
id, user_id, patch_id, earned_at

## Business Logic
- Ruck Work Units (RWU) = weight_lbs × distance_miles
- Streak = consecutive calendar days with at least one ruck_log
- Leaderboard resets weekly (Monday 00:00 UTC) and monthly (1st 00:00 UTC)
- Pinned announcements always appear first in the feed
- Deleted announcements show "This announcement was removed" (soft delete only)
- Kudos are toggleable — one per user per ruck
- Reactions are per-emoji toggleable — one per user per emoji per announcement

## Coding Rules
- TypeScript strict. No `any`. Use `unknown` and narrow properly.
- Server Components by default. "use client" only when state/events required.
- Server Actions for all form mutations. Route Handlers for webhooks + external API calls.
- ALL db access through `src/db/queries/` functions. Never import `db` in components.
- Validate all input with Zod before any db operation.
- Conventional commits: feat:, fix:, docs:, refactor:, chore:, test:
- Commit after every meaningful unit of work. Test before every commit.
- Feature branches only. Never push directly to main.

## Design System
- Background: #0a0a0a
- Card background: #141414
- Border: #2a2a2a
- Primary accent (forest green): #2d6a4f
- Secondary accent (burnt orange): #c9663a
- Text: #f0ebe3
- Muted text: #888888
- Font: bold headers, clean sans-serif body
- Minimum touch target: 44px
- Minimum viewport: 375px (all pages must work at this width)

## DO NOT LIST (update this section whenever Claude makes a mistake)
- Never read or modify .env files
- Never commit directly to main
- Never use `git push --force`
- Never skip or comment out tests
- Never use `any` or `@ts-ignore`
- Never add npm packages without asking
- Never write db queries directly in components or pages
- Never store passwords in plaintext — bcrypt always
- Never expose owner routes to members or vice versa
- Never use inline styles — Tailwind classes only

## Recent Changes
(Updated by session-closer agent at end of each session)
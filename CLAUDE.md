# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing site **and** headless CMS for Metaborong (metaborong.com). Next.js 16 App
Router, React 19, TypeScript, Tailwind v4, MongoDB (native driver, no ORM). Two surfaces
in one app:

1. **Public marketing site** — single `app/page.tsx` composing sections from
   `components/sections/`, plus data-driven service pages and a blog.
2. **Admin CMS** — auth-gated `/admin` blog authoring (TipTap editor), a JSON API under
   `/api/admin/**`, an MCP server at `/api/mcp` for authoring from Claude, and AI-readiness
   scoring via an external MCP.

## Commands

- Dev: `npm run dev` (port 3000).
- Production-like local: `npm run build && PORT=3001 npm run start`.
- Lint: `npm run lint` · Types: `npm run typecheck` (`tsc --noEmit`).
- Unit/integration tests: `npm run test` (Vitest, Node env by default).
  - Single file: `npx vitest run lib/auth.test.ts`
  - By name: `npx vitest run -t "rejects unescaped"`
  - Component tests (`*.test.tsx`) opt into happy-dom via a `// @vitest-environment happy-dom` directive at the top of the file.
- E2E: `npm run test:e2e` (Playwright, Chromium only, `workers: 1`; auto-starts `pnpm dev`).
- Coverage: `npm run test:coverage`.

Tests use `mongodb-memory-server` (one instance per Vitest worker, fresh DB per test) — no
external MongoDB needed. The first run downloads a ~70 MB Mongo binary into the OS cache.

## Architecture

### Marketing site
`app/page.tsx` renders `<Nav>` + ordered `components/sections/*` + `<Footer>`. Section copy
and structured data live alongside components (`*-data.ts`, `lib/schema.ts` JSON-LD).
Service pages are dynamic routes `app/services/[pillar]/[slug]` generated from
`components/sections/services-data.ts` via `generateStaticParams`; all are
`robots: { index: false }` stubs. The blog (`app/blog`) renders published posts from Mongo.

### CMS data layer (`db/`)
Native `mongodb` driver, **no ORM**. Document shapes are TypeScript in `db/schema.ts`;
index specs in `db/collections.ts` are applied lazily (idempotently) on first `getDb()`
per process. `db/client.ts` caches the `MongoClient` on `globalThis` (survives HMR + cold
starts) and exports a `db` **Proxy** that defers to `getDb()` on every access — this is
the test seam: tests re-mock `@/db/client` to substitute an in-memory Db. Four collections,
all with **string UUID v4 `_id`** set by route handlers (never Mongo ObjectIds): `posts`,
`images`, `login_attempts`, `ai_readiness_attempts` (last two are TTL-pruned). No
transactions; rate-limit windows are advisory count-then-insert. Read `db/README.md`
before touching the data layer.

### Auth (`lib/auth.ts`)
Single admin from env (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` bcrypt cost 12). Session is a
jose-signed JWT in HttpOnly cookie `mb_admin_session` (30-day TTL, signed with
`AUTH_SECRET`). CSRF is double-submit: `mb_csrf` (readable by JS) echoed as `X-CSRF-Token`.
`requireAdmin()` is the gate for `/api/admin/**`.

### API conventions
`errorResponse()` in `lib/api.ts` is the **only** way to emit a non-2xx body from an admin
route — it guarantees the `{ error, code, field? }` envelope. Never put stack traces,
env-var names, or upstream URLs in `error` (server-log only). Zod schemas in
`lib/blog-schema.ts` validate at the API boundary; Mongo collections deliberately have **no**
JSON-Schema validator (single source of truth).

### `proxy.ts` (not `middleware.ts`)
Next.js 16 renamed `middleware.ts` → `proxy.ts`. It (a) injects `x-pathname` so the
`/admin` layout can build a `?next=` login redirect, and (b) mirrors Vercel edge geo
headers into an `mb_geo` cookie **only when `mb_consent === 'accepted'`**. Local dev falls
back to `DEV_GEO_*` env vars.

### MCP surfaces
- `/api/mcp` (`app/api/mcp/route.ts`, tools in `lib/mcp/tools.ts`) — JSON-RPC server letting
  Claude author posts. Bearer-gated by `MCP_ADMIN_TOKEN`; returns 503 `MCP_DISABLED` if unset.
- AI-readiness — the editor calls out to an **external** VerseOdin MCP
  (`AI_READINESS_MCP_*`) to score a published post URL; `lib/ai-readiness/`.

### Blog editor
TipTap (`components/admin/editor/`). Content is stored as structured blocks; conversions
live in `lib/blocks-to-md.ts`, `lib/markdown/`, `lib/editor/serialize.ts`.

## Critical Gotchas

- **Next.js 16 has breaking changes vs. training data.** Per `AGENTS.md`, read the relevant
  guide in `node_modules/next/dist/docs/` before writing Next code. Note the
  `middleware.ts` → `proxy.ts` rename above.
- **Escape every `$` as `\$` in `.env.local`.** Next's dotenv-expand treats `$token` as a
  variable and substitutes an empty string — silently mangling `MONGODB_URI`,
  `ADMIN_PASSWORD_HASH` (bcrypt starts `$2b$12$`), `BLOB_READ_WRITE_TOKEN`, and MCP tokens.
  Single quotes do **not** prevent this; only backslash escapes do. Template:
  `.env.local.example`.
- **Never `rm -rf .next` while the dev server is running** — it corrupts served CSS with no
  error.

## Design System

**Always read `DESIGN.md` before any visual or UI decision.** Fonts, colors, spacing,
motion grammar, primitive variants, and section patterns are defined there. Do not deviate
without explicit user approval. In QA/review mode, flag code that doesn't match `DESIGN.md`.
When a section needs a deviation, log it under
`docs/superpowers/specs/<date>-section-<name>.md` per the override rule in `DESIGN.md`.

## Context Documents

- `db/README.md` — CMS data-layer operator notes (indexes, `_id` convention, test DB).
- `.env.local.example` — annotated env var reference (every var, who consumes it).
- `docs/superpowers/specs/` — locked section specs and deviation logs.
- `docs/superpowers/plans/` — implementation plans.
- `docs/cms/` — CMS handoffs and reports.
- `docs/metaborong-seo-strategy.pdf`, `docs/SEO AUDIT.pdf` — SEO strategy and audit.

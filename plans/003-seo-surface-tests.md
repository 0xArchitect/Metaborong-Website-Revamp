# Plan 003: Characterization tests for the SEO surface (JSON-LD, metadata, canonicals)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1259c18..HEAD -- lib/schema.ts "app/services/[pillar]/[slug]/page.tsx" "app/work/[slug]/page.tsx" "app/blog/[slug]/page.tsx"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none (lands best before any refactor of these pages)
- **Category**: tests
- **Planned at**: commit `1259c18`, 2026-06-12

## Why this matters

This site's stated purpose (PRODUCT.md) is to rank and get cited for
service-intent and answer-engine queries — the JSON-LD and metadata ARE the
product. Yet the 697-test suite covers almost exclusively the CMS/API side;
`lib/schema.ts` (organization/website/FAQ/Service schemas), the per-leaf
JSON-LD builder, and the work/blog metadata generators have **zero tests**. A
regression here (a malformed `@context`, a dropped canonical, a noindex leak)
is invisible until rankings die. These are characterization tests: lock in
today's verified-good output.

## Current state

- `lib/schema.ts` — exports `organizationSchema`, `websiteSchema`, `faqSchema`,
  `whyUsAeoSchema`, `serviceSchemas` (array, one per pillar), pre-stringified
  `*Json` variants (`lib/schema.ts:142-147`), and
  `buildServicesOverviewBreadcrumb()`. `BASE = 'https://www.metaborong.com'`.
- `app/services/[pillar]/[slug]/page.tsx` — has a **module-private**
  `buildLeafJsonLd({ pillar, leaf, content, description })` (around line 103)
  returning `Record<string, unknown>[]`: Service + FAQPage + BreadcrumbList +
  HowTo + optional DefinedTermSet (when the leaf authored `keyConcepts`). It is
  rendered at ~line 74–81 via `<script type="application/ld+json">`. Its
  `generateMetadata` returns `robots: { index: false, follow: false }` for
  unresolved leaves and for published-but-unauthored ("coming soon") leaves.
- `app/work/[slug]/page.tsx:30-55` — `generateMetadata` reads
  `caseStudyMeta[slug]` from `lib/work.ts`; canonical is
  `${SITE_ORIGIN}/work/${slug}` (no trailing slash) and
  `alternates.types['text/markdown']` points at `${url}/raw.md`. Returns `{}`
  for unknown slugs. `lib/work.ts` exports `caseStudyMeta` (Record keyed by
  slug: sunset, magic, orbitx, sedax) and `workSlugs`.
- `app/blog/[slug]/page.tsx:20-56` — async `generateMetadata` fetches the post
  from Mongo; canonical is `post.canonical_url ?? 'https://www.metaborong.com/blog/${post.slug}/'`
  (note **trailing slash** — blog URLs keep it, services/work URLs don't);
  unknown slug → `{ title: 'Not found', robots: { index: false, follow: false } }`.
- **Test conventions**: Vitest, Node env by default; component tests opt into
  happy-dom via a `// @vitest-environment happy-dom` directive. DB-touching
  tests follow the exemplar `app/llms.txt/route.test.ts`: `vi.mock('server-only', () => ({}))`,
  `vi.mock('@/db/client', …)` with a `createTestDb()` handle from
  `@/db/test-utils`, `vi.resetModules()` in `beforeEach`, dynamic
  `await import(...)` of the SUT. Match this exactly for the blog test.
- Pure-data tests (no DB) follow e.g. `app/robots.test.ts`: plain describe/it,
  direct imports.
- **Next.js constraint**: page files may only export Next-recognized symbols
  (default, `generateMetadata`, `generateStaticParams`, etc.). To test
  `buildLeafJsonLd` it must be **moved** to `lib/services/leaf-jsonld.ts` and
  imported by the page — a pure move, no logic change.

## Commands you will need

| Purpose        | Command                                  | Expected on success |
|----------------|------------------------------------------|---------------------|
| Single file    | `pnpm vitest run lib/schema.test.ts`     | all pass            |
| Full suite     | `pnpm test`                              | all pass (697 + new)|
| Typecheck      | `pnpm typecheck`                         | exit 0              |
| Build (move check) | `pnpm build`                         | exit 0              |

## Scope

**In scope**:
- `lib/services/leaf-jsonld.ts` (create — moved `buildLeafJsonLd` + its helpers)
- `app/services/[pillar]/[slug]/page.tsx` (only: delete the moved function, add
  the import)
- `lib/schema.test.ts` (create)
- `lib/services/leaf-jsonld.test.ts` (create)
- `app/work/[slug]/page.metadata.test.ts` (create — name it so Vitest picks it
  up; it imports `generateMetadata` from the page module)
- `app/blog/[slug]/page.metadata.test.ts` (create)

**Out of scope** (do NOT touch):
- Any visual/JSX change to the pages. The leaf-page diff must be import-only.
- `app/sitemap.test.ts`, `app/robots.test.ts`, `app/llms.txt/route.test.ts` —
  already green; don't "improve" them.
- Changing any emitted schema content — if a test reveals output that looks
  wrong, characterize what IS emitted and flag it in your report.

## Git workflow

- Branch: `advisor/003-seo-surface-tests` from `design-revamp`.
- Two commits: `refactor(services): extract buildLeafJsonLd to lib for testability`
  then `test(seo): characterize JSON-LD + metadata for schema/work/blog/leaf surfaces`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Extract `buildLeafJsonLd`

Move the function (and any module-private helpers ONLY it uses) from
`app/services/[pillar]/[slug]/page.tsx` to a new `lib/services/leaf-jsonld.ts`,
exporting it. Update the page to import it. Zero logic changes — the moved code
should diff as pure relocation.

**Verify**: `pnpm typecheck` → exit 0; `pnpm build` → exit 0.

### Step 2: `lib/schema.test.ts`

Assert for each exported schema object: `@context === 'https://schema.org'`,
the expected `@type` (Organization / WebSite / FAQPage / Service), `@id`s under
`https://www.metaborong.com`, every URL field absolute and https. Assert each
`*Json` export is `JSON.parse`-able and deep-equals its object counterpart.
Assert `serviceSchemas.length` equals the pillar count from
`components/sections/services-data.ts` (import `pillars` and compare — don't
hardcode 3). Assert `buildServicesOverviewBreadcrumb()` positions are 1..n and
items are absolute URLs.

**Verify**: `pnpm vitest run lib/schema.test.ts` → all pass.

### Step 3: `lib/services/leaf-jsonld.test.ts`

Pick one real published leaf with authored content (resolve via
`getLeafContent` from `lib/services/content` and `pillars` from
services-data; iterate to find the first leaf where `getLeafContent(pillar.id, leaf.slug)`
is defined — don't hardcode a slug that may be renamed). Assert the returned
array: contains exactly one block per expected `@type` (Service, FAQPage,
BreadcrumbList, HowTo; DefinedTermSet iff `content.keyConcepts` is set), every
block has `@context`, the Service `@id` is
`https://www.metaborong.com/services/<pillar>/<slug>#service`, and every block
survives `JSON.stringify` → `JSON.parse` round-trip. Then a **sweep test**:
for EVERY published+authored leaf, build the JSON-LD and assert no block
serializes to a string containing `undefined` and BreadcrumbList positions are
sequential.

**Verify**: `pnpm vitest run lib/services/leaf-jsonld.test.ts` → all pass.

### Step 4: work metadata test

`app/work/[slug]/page.metadata.test.ts`: import `{ generateMetadata }` from
`./page` and `workSlugs` from `@/lib/work`. For each slug: canonical is
`https://www.metaborong.com/work/<slug>` (NO trailing slash),
`alternates.types['text/markdown']` ends `/raw.md`, title and description are
non-empty, openGraph.url === canonical. Unknown slug → `{}` (deep-equal).
Note `params` is a Promise: call as
`generateMetadata({ params: Promise.resolve({ slug }) })`.
If importing the page module pulls in something that breaks under the Node test
env (it imports many components but only at module scope — likely fine since
nothing renders), add `// @vitest-environment happy-dom` at the top of the test
file as the first fallback.

**Verify**: `pnpm vitest run "app/work/[slug]/page.metadata.test.ts"` → all pass.

### Step 5: blog metadata test

`app/blog/[slug]/page.metadata.test.ts`, modeled structurally on
`app/llms.txt/route.test.ts` (server-only mock, db/client mock, resetModules,
dynamic import of the page module). Insert a published post (copy the
`insertPublished` helper pattern from that exemplar), then assert
`generateMetadata`: canonical `https://www.metaborong.com/blog/<slug>/`
(WITH trailing slash); when the post has `canonical_url` set, that value wins;
missing slug → `{ title: 'Not found', robots: { index: false, follow: false } }`.

**Verify**: `pnpm vitest run "app/blog/[slug]/page.metadata.test.ts"` → all pass.

### Step 6: Full gauntlet

**Verify**: `pnpm test` → all pass; `pnpm typecheck` → exit 0; `pnpm build` →
exit 0.

## Test plan

Covered by Steps 2–5 (≈20–30 new assertions across 4 new files + 1 moved
module). Pattern exemplars: `app/llms.txt/route.test.ts` (DB-backed),
`app/robots.test.ts` (pure).

## Done criteria

- [ ] `grep -n "buildLeafJsonLd" "app/services/[pillar]/[slug]/page.tsx"` shows
      only an import, no function definition
- [ ] 4 new test files exist and pass
- [ ] `pnpm test` exits 0 (total test count strictly greater than 697)
- [ ] `pnpm typecheck` and `pnpm build` exit 0
- [ ] Only in-scope files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Moving `buildLeafJsonLd` requires changing its signature or behavior (e.g. it
  closes over page-module state not listed in its parameters).
- Importing `app/work/[slug]/page` in a test throws even under happy-dom —
  do not start mocking component imports; report instead.
- A characterization test reveals output that looks like a live SEO bug (e.g. a
  relative URL in JSON-LD). Write the test to assert current behavior anyway,
  and list the suspected bug in your report.

## Maintenance notes

- These tests freeze today's SEO contract. When copy/taxonomy changes
  legitimately alter output (new pillar, renamed leaf), the sweep tests are
  written against live data so they adapt; only hardcoded-contract tests
  (canonical shapes, trailing-slash policy) should ever need editing — and
  editing them is a signal to re-check Search Console after deploy.
- Trailing-slash policy is asymmetric by design: blog URLs end with `/`,
  services/work URLs don't. Don't let a future "consistency" pass break it.

# Plan 005: Build the /work index page (case-study hub)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1259c18..HEAD -- lib/work.ts app/sitemap.ts app/sitemap.test.ts components/sections/work-preview.tsx`
> If any in-scope-adjacent file changed since this plan was written, compare
> the "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW (new page; no existing routes change)
- **Depends on**: none (coordinate with Plan 004 — both touch the /work area;
  land 004 first to avoid noise)
- **Category**: direction
- **Planned at**: commit `1259c18`, 2026-06-12

## Why this matters

The site has 4 strong case studies (`/work/sunset`, `/work/magic`,
`/work/orbitx`, `/work/sedax`) — the highest-credibility proof on a site whose
job (PRODUCT.md) is convincing technical founders "these people actually ship
hard things." But there is **no `/work` index**: studies are reachable only via
the homepage Work-Preview section and service-leaf cross-links. `/work` 404s
today. A hub page (a) gives every case study a crawlable parent, (b) creates an
SEO landing page for portfolio/case-study-intent queries, and (c) gives nav and
CTAs a stable "see our work" target.

## Current state

- `app/work/` contains only `[slug]/page.tsx` (+ `raw.md` route dir if present).
  **No `app/work/page.tsx`.** `/work` currently 404s.
- `lib/work.ts:5-25` — `CaseStudyMeta` interface: `title`, `description`,
  `logo`, `category`, optional `animatedLogo`, `demoVideo`, `demoPoster`,
  `glowColor`, `seoTitle`, `client`, `services`, `year`, `datePublished`,
  `appCategory`, `appName`, `blendLogo`, `bylineRole`.
  `lib/work.ts:27` `caseStudyMeta` record (slugs: sunset, magic, orbitx, sedax);
  `lib/work.ts:106` `workSlugs`. This is the single source of truth — the index
  page must be driven from it, zero hardcoded slugs.
- `components/sections/work-preview.tsx` — homepage section already rendering
  case-study teaser cards linking `href={'/work/' + p.slug}`. This is the
  closest visual exemplar for card treatment; reuse its patterns (and its data
  approach) rather than inventing a new card.
- `app/sitemap.ts` — includes home, `/blog/`, `/services/`, pillar hubs (URL
  built with `.replace(/\/$/, '')` — **services/work URLs have NO trailing
  slash; blog URLs keep it**), published leaves, the 4 work slugs, posts.
  `app/sitemap.test.ts` asserts `STATIC_ROUTE_COUNT = 42` with a comment
  enumerating the composition — adding `/work` makes it **43** and the comment
  must be updated.
- Page-shell convention (see `app/work/[slug]/page.tsx` and
  `app/services/page.tsx`): page renders `<Nav />` + sections + shared section
  primitives (`Section` from `@/components/ui/section`) + `<ContactCtaSection />`
  + `<Footer />`; `generateMetadata`/`metadata` exports canonical via
  `SITE_ORIGIN` from `@/lib/seo`; JSON-LD emitted via
  `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />`.
- **Design system is law**: `DESIGN.md` at the repo root defines fonts, color
  tokens, spacing, motion grammar, H2 tier patterns, and section grammar.
  CLAUDE.md: "Always read DESIGN.md before any visual or UI decision." Any
  deviation must be logged as a dated row in the DESIGN.md Decisions Log — but
  for this page, don't deviate: compose from existing primitives.
- Copy rules: `docs/writing-guardrails.md` governs ALL visible text (no
  marketing inflation; banned-word list). Em-dashes are fine in visible copy
  but must not appear in alt/ARIA attribute text.

## Commands you will need

| Purpose   | Command                          | Expected on success                |
|-----------|----------------------------------|------------------------------------|
| Dev       | `pnpm dev`                       | page at http://localhost:3000/work |
| Typecheck | `pnpm typecheck`                 | exit 0                             |
| Tests     | `pnpm test`                      | all pass (incl. updated sitemap test) |
| Build     | `pnpm build`                     | exit 0; `/work` listed as static   |

## Suggested executor toolkit

- Read `DESIGN.md` in full BEFORE writing any JSX.
- Read `components/sections/work-preview.tsx` and `app/services/page.tsx` as
  the structural exemplars (hub-page grammar already exists for services).
- If the `frontend-design` or `impeccable` skill is available in your
  environment, invoke it for the card-grid composition pass — but stay within
  DESIGN.md tokens.

## Scope

**In scope**:
- `app/work/page.tsx` (create)
- `app/sitemap.ts` (add the `/work` entry next to the other static routes)
- `app/sitemap.test.ts` (STATIC_ROUTE_COUNT 42 → 43, comment, and an assertion
  that `${SITE_ORIGIN}/work` is present)
- `lib/work.ts` ONLY IF a tiny addition is needed (e.g. exporting a sorted slug
  list); no changes to existing fields.

**Out of scope** (do NOT touch):
- `components/layout/nav.tsx` — adding "Work" to the global nav is a separate
  owner decision (nav is design-locked per memory/DESIGN.md). Note it in your
  report as a recommended follow-up.
- The case-study pages themselves, `work-preview.tsx`, `content/work/*.md`.
- Inventing new copy claims: descriptions come from `caseStudyMeta.description`
  verbatim; the only new copy is the hero heading/intro (≤2 sentences, follow
  writing-guardrails).

## Git workflow

- Branch: `advisor/005-work-index` from `design-revamp`.
- Commits: `feat(work): add /work case-study hub page` then
  `seo(sitemap): include /work hub (42→43 static routes)`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Page skeleton + metadata

Create `app/work/page.tsx`: `<Nav />`, a compact hero (H1 like "Work we've
shipped" register — check writing-guardrails for banned words), the card grid,
`<ContactCtaSection />`, `<Footer />`. Export `metadata`: title
("Our Work — Web3, AI & Product Case Studies | Metaborong" register; verify
against how other pages compose the suffix to avoid a doubled "| Metaborong"),
description, canonical `${SITE_ORIGIN}/work` (NO trailing slash), openGraph +
twitter mirroring `app/work/[slug]/page.tsx:39-55`'s pattern with the shared
`/opengraph-image`.

**Verify**: `pnpm dev` → `curl -s localhost:3000/work | grep -c "<h1"` → 1.

### Step 2: Card grid from caseStudyMeta

Iterate `Object.entries(caseStudyMeta)`. Each card: client/app name
(`appName ?? client`), `category`, `description`, `year`, link to
`/work/<slug>`. Use `logo`/`demoPoster` for visual anchor per the
work-preview.tsx treatment. The whole card is one `<Link>`; interactive targets
≥44px tall; alt text without em-dashes.

**Verify**: `curl -s localhost:3000/work | grep -o 'href="/work/[a-z]*"' | sort -u`
→ exactly 4 distinct slugs.

### Step 3: JSON-LD

Emit one `CollectionPage` block with `@id ${SITE_ORIGIN}/work#collection`,
plus an `ItemList` of the 4 studies (position 1..4, absolute `url`s), plus a
`BreadcrumbList` (Home → Work). Follow the inline-builder style of
`app/work/[slug]/page.tsx` (module-level helper returning blocks, rendered via
the `<script type="application/ld+json">` pattern).

**Verify**: `curl -s localhost:3000/work | grep -o 'application/ld+json' | wc -l`
→ ≥1, and piping the page through a JSON extraction of the first block parses
(`node -e` with a regex extract, or visually confirm valid JSON).

### Step 4: Sitemap + test

Add to the static entries in `app/sitemap.ts` (after `/services/`):
`{ url: \`${SITE_ORIGIN}/work\`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 }`
— no trailing slash. Update `app/sitemap.test.ts`: STATIC_ROUTE_COUNT → 43,
update its composition comment, add an `expect(urls).toContain(\`${SITE_ORIGIN}/work\`)`
style assertion matching the file's existing assertion idiom.

**Verify**: `pnpm vitest run app/sitemap.test.ts` → all pass.

### Step 5: Full gauntlet + visual sanity

**Verify**: `pnpm typecheck && pnpm test && pnpm build` → all exit 0; build
route table lists `/work` as static (○ or ●). Take a screenshot if a browser
tool is available and attach it to your report; otherwise note that visual QA
by the owner is pending.

## Test plan

- Updated `app/sitemap.test.ts` (Step 4) is the only required test change.
- Optional but encouraged: `app/work/page.metadata.test.ts` asserting canonical
  `https://www.metaborong.com/work` and 4 ItemList entries, modeled on Plan
  003's metadata tests if they exist by then.

## Done criteria

- [ ] `/work` renders with 4 case-study cards, all links resolving
- [ ] Canonical is `https://www.metaborong.com/work` (no trailing slash)
- [ ] CollectionPage/ItemList/BreadcrumbList JSON-LD present and parseable
- [ ] Sitemap contains `/work`; `pnpm vitest run app/sitemap.test.ts` passes
- [ ] `pnpm typecheck && pnpm test && pnpm build` all exit 0
- [ ] No DESIGN.md deviations (or each one logged in its Decisions Log)
- [ ] Only in-scope files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- DESIGN.md's section grammar has no pattern that fits a card-grid hub and you
  would need to invent a new visual treatment — the owner picks visual
  directions via live candidates, not executor improvisation.
- The page can't be composed without touching `nav.tsx` or `work-preview.tsx`.
- `caseStudyMeta` fields don't match the Current state excerpt.

## Maintenance notes

- A 5th case study added to `caseStudyMeta` appears automatically; the sitemap
  count test will need 43→44 only when a *static route* is added, not a work
  slug (work slugs are counted as part of the 43 — re-read the test's
  composition comment when touching it).
- Follow-up owner decisions deliberately not in this plan: "Work" in the global
  nav, and whether the homepage Work-Preview CTA should point to `/work`
  instead of the first study.

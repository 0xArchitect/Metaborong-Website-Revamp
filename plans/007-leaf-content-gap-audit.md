# Plan 007: Audit the published-leaf content gap and produce the authoring queue (spike — report only)

> **Executor instructions**: This is an INVESTIGATION plan. You will read code
> and docs and produce a report file — you must NOT modify any source code,
> content, or config. Run every verification command and confirm the expected
> result. If anything in the "STOP conditions" section occurs, stop and report.
> When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1259c18..HEAD -- components/sections/services-data.ts lib/services/content`
> Drift here is fine (content may have been authored since planning) — it just
> means your report supersedes the counts in this plan. Proceed either way.

## Status

- **Priority**: P2
- **Effort**: S (the audit; the authoring it queues is L and out of scope)
- **Risk**: NONE (read-only)
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `1259c18`, 2026-06-12

## Why this matters

The SEO/AEO strategy (PRODUCT.md, SERVICES_PLAN.md, "SEO content map.md") rides
on the service-leaf cluster. `components/sections/services-data.ts` declares
**32 leaves with `status: 'published'`**, but a leaf only gets the full
indexable template when `getLeafContent(pillar, slug)` (from
`lib/services/content`) returns authored content — otherwise
`app/services/[pillar]/[slug]/page.tsx` serves a "Coming soon" Template D stub
with `robots: { index: false, follow: false }`. At planning time the authored
set looked smaller than 32 (e.g. `lib/services/content/product-studio/` has 7
files against ~10–12 Product Studio leaves), meaning some advertised leaves are
invisible to search. Nobody currently has the exact list. This spike produces
it, plus a prioritized authoring queue, so content work — the actual growth
lever — can be scheduled deliberately.

## Current state

- `components/sections/services-data.ts` — pillar/leaf taxonomy; leaves carry
  `status: 'published' | 'coming-soon'` (verify the exact union in the file).
- `lib/services/content/index.ts:92` —
  `export function getLeafContent(pillar: string, slug: string): LeafContent | undefined`.
  Content lives in `lib/services/content/{web3,ai}.ts` and
  `lib/services/content/product-studio/*.ts`.
- `app/services/[pillar]/[slug]/page.tsx` — published+authored → full template
  with JSON-LD; published-but-unauthored or coming-soon → noindex stub
  (metadata branch ~line 55–60: comment "Coming-soon (or published-but-unauthored)
  → noindex stub.").
- `app/sitemap.ts` — includes leaves via `getPublishedLeaves()`. **Check
  whether sitemap inclusion also requires authored content** — if a
  published-but-unauthored leaf is in the sitemap while serving noindex, that
  contradiction is a bug to flag prominently in the report.
- Priority sources for ordering the queue: "SEO content map.md" (keyword
  targets), `SERVICES_PLAN.md` (taxonomy rationale), and
  `docs/services/SERVICES-CONTEXT.md` if present (leaf spec + workflow — the
  reference implementation for authored leaves is the web3 tokenomics leaf).

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Count published leaves | `grep -c "status: 'published'" components/sections/services-data.ts` | a number (32 at planning) |
| Enumerate authored | a small read-only node script via `npx tsx` or careful grep of content exports | list of pillar/slug keys |
| No source changes | `git status --porcelain -- . ':!plans'` | empty |

## Scope

**In scope** (the only file you create/modify):
- `plans/007-report-leaf-content-gap.md` (create)

**Out of scope** (do NOT touch):
- ALL source code, content files, docs, sitemap — read-only spike.
- Authoring any leaf content (that's the follow-up this report enables).

## Git workflow

- Branch: work directly on `design-revamp` is fine (single new file under
  `plans/`), or `advisor/007-leaf-audit` if other plans are in flight.
- One commit: `docs(plans): leaf content-gap audit report`.
- Do NOT push unless the operator instructed it.

## Steps

### Step 1: Build the ground-truth matrix

For every leaf in every pillar in `services-data.ts`, record: pillar id, slug,
declared `status`, and whether `getLeafContent(pillar, slug)` returns content.
The most reliable method: a throwaway script (run with `npx tsx`, do not commit
it) that imports both modules and prints a TSV. If `tsx` is unavailable,
cross-reference exports by reading `lib/services/content/{web3,ai}.ts` keys and
the `product-studio/` filenames against the taxonomy slugs — slugs must match
EXACTLY (watch for renamed slugs; the taxonomy had 308-redirect renames in its
history).

**Verify**: the matrix row count equals the total leaf count in
services-data.ts (published + coming-soon).

### Step 2: Classify

Bucket every leaf: (A) published + authored → live, indexable;
(B) published + NOT authored → **noindex stub wearing a published flag** (the
gap this spike exists to expose); (C) coming-soon (any) → intentional stub.
Also check each bucket-B leaf against `app/sitemap.ts` logic: in or out?

**Verify**: |A| + |B| + |C| = total; record the three counts.

### Step 3: Prioritize bucket B

Order bucket B by: presence in "SEO content map.md" keyword targets first
(quote the target phrase per leaf), then pillar balance (Web3 and AI carry
equal weight per PRODUCT.md — never queue one pillar exclusively), then
intra-pillar commercial weight per SERVICES_PLAN.md. For each leaf, note the
nearest authored sibling to use as the structural template.

### Step 4: Write the report

`plans/007-report-leaf-content-gap.md` with: the full matrix (table), the three
bucket counts, the sitemap-contradiction check result, the prioritized
authoring queue with per-leaf keyword targets and sibling templates, and a
closing "recommended next step" (e.g. "author the top N via the established
leaf-authoring chain, then run the deferred 3-auditor confirmation pass the
owner queued for after AI + SaaS leaves ship").

**Verify**: `git status --porcelain -- . ':!plans'` → empty (nothing outside
plans/ touched).

## Test plan

None — read-only. The report's matrix is its own verification artifact.

## Done criteria

- [ ] `plans/007-report-leaf-content-gap.md` exists with matrix + counts +
      prioritized queue
- [ ] Every published leaf in services-data.ts appears exactly once in the matrix
- [ ] Sitemap-vs-noindex contradiction explicitly confirmed or ruled out
- [ ] No files outside `plans/` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- `getLeafContent`'s signature or the content-module layout doesn't match
  Current state (a refactor landed) — re-derive carefully or escalate.
- You find bucket B is EMPTY (all 32 authored) — excellent news; write a
  one-paragraph report saying so, mark this plan DONE, and recommend retiring
  the "published-but-unauthored" branch comment in the page.

## Maintenance notes

- This report goes stale with every authored leaf — date-stamp it and treat the
  matrix as a snapshot.
- The follow-up authoring work should ride the owner's established chain
  (leaf spec in docs/services/, reference implementation: the web3 tokenomics
  leaf) — not ad-hoc writing. That work is content-L and needs the owner's
  copy-quality gates, so it is deliberately NOT an executor plan.

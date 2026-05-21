# INTEGRATION.md

Integration pass on `feat/services-section`, run 2026-05-21. Verifies the
services-section build against `SERVICES_PLAN.md` § 2, § 3, § 5, § 6, § 7,
plus the eight `.reports/*.md` handoffs. Production build run locally on
port 3001; all curl probes against the static-rendered output.

## Headline

**Build is structurally complete and content-clean, but ships with three
SEO-affecting defects that must land before staging is production-ready.**

| Severity | Defect | Surface |
|----------|--------|---------|
| **Blocker** | `robots.txt` Disallow `/services/` in production | `app/robots.ts` |
| **High**    | Route-level JSON-LD missing on overview + every v1 leaf | `app/services/page.tsx`, `app/services/[pillar]/[slug]/page.tsx` |
| **High**    | Sitemap emits trailing-slash URLs; Next 308-redirects to no-slash | `next.config.ts`, `app/sitemap.ts` |

Block→template wiring, redirects, sitemap URL count, content depth, and
marketing-inflation lint all pass. Lighthouse a11y ≥ 96 on every audited
page. Real failures below are scope-bounded fixes, not architectural.

---

## 1. Block → template mapping (SERVICES_PLAN § 3)

Verified by reading the three template components in
`components/services/`. All blocks render.

### Template A — `services-overview.tsx`

| § 3 block | Rendered by | Status |
|---|---|---|
| Hero | `HeroBlock` (line 147) | ✓ |
| Outcome strip (4 cards) | `OutcomeStrip` (line 183) | ✓ |
| Pillar grid (3 cards, v1-only) | `PillarGrid` + `getPillarV1Groups` (line 235) | ✓ |
| Engagement model strip | `EngagementStrip` (line 351) | ✓ |
| Trust band | `TrustBand` (TrustBar + ClutchWidget, line 403) | ✓ |
| FAQ (5 Q&A) | `FaqBlock` (line 420) | ✓ |
| Contact CTA | `ContactCtaSection` reuse | ✓ |

### Template B — `pillar-hub.tsx`

| § 3 block | Rendered by | Status |
|---|---|---|
| Breadcrumb | `Breadcrumb` (line 56) — `<nav aria-label="Breadcrumb">` | ✓ |
| Hero | `PillarHero` (line 79) — pillar-numbered eyebrow + H1 + 2-para body | ✓ |
| Sub-group sections ×3 | `SubGroupSection` (line 136) — case-study card + leaf grid | ✓ |
| Engagement model strip | `EngagementStrip` (line 289) — pillar-tailored phase labels | ✓ |
| Cross-pillar links | `CrossPillarLinks` (line 345) | ✓ |
| FAQ (6 Q&A) | `PillarFaq` (line 398) | ✓ |
| Contact CTA | `ContactCtaSection` reuse | ✓ |

### Template C — `leaf-service.tsx`

| § 3 block | Rendered by | Status |
|---|---|---|
| Breadcrumb | `Breadcrumb` (line 61) | ✓ |
| Hero | `Hero` (line 92) | ✓ |
| What we deliver | `WhatWeDeliver` (line 126) | ✓ |
| How we work | `HowWeWork` (line 166) | ✓ |
| Tech stack | `TechStackStrip` (line 196) | ✓ |
| Fit / doesn't fit | `FitBlock` (line 229) | ✓ |
| AEO answer | `AeoAnswer` (line 276) | ✓ |
| Related work (conditional) | `RelatedWork` (line 306) | ✓ |
| Related services (v1-only) | `RelatedServices` (line 368, filters via `resolveRelatedServices`) | ✓ |
| FAQ (conditional) | `FaqBlock` (line 412) | ✓ |
| Contact CTA | `ContactCtaSection` reuse | ✓ |

### Template D — `ComingSoonStub` (in `app/services/[pillar]/[slug]/page.tsx:90`)

Renders for `status !== 'published'` OR `status === 'published'` but no
`LeafContent` registered. Emits `robots: { index: false, follow: false }`.

---

## 2. Redirects (SERVICES_PLAN § 2)

All 9 redirect rules return **308 → 200** with the correct destination.
Verified by curl against `http://127.0.0.1:3001`.

| Source | Destination | Source code | Final code |
|---|---|---|---|
| `/services/ai-agents` | `/services/ai` | 308 | 200 |
| `/services/ai-agents/agentic-ai-systems` | `/services/ai/agentic-ai-systems` | 308 | 200 |
| `/services/ai-agents/rag-knowledge-systems` | `/services/ai/rag-retrieval-pipelines` | 308 | 200 |
| `/services/ai-agents/generative-ai-development` | `/services/ai/llm-integration-architecture` | 308 | 200 |
| `/services/ai-agents/voice-agent-integration` | `/services/ai/conversational-agents-assistants` | 308 | 200 |
| `/services/ai-agents/ai-systems-integration` | `/services/ai/llm-integration-architecture` | 308 | 200 |
| `/services/ai-agents/ai-workflow-automation` | `/services/ai` | 308 | 200 |
| `/services/product-studio/mvp-software-development` | `/services/product-studio/mvp-development` | 308 | 200 |
| `/services/product-studio/b2b-software-development` | `/services/product-studio/b2b-multi-tenant-platforms` | 308 | 200 |

No redirect chains; every destination resolves in one hop.

---

## 3. Sitemap (SERVICES_PLAN § 2 + § Risk 3)

`npm run build` succeeds clean; turbopack compiles every route. SSG
prerenders all three pillar hubs and **30** leaf routes (16 v1 + 14
coming-soon stubs that still resolve as noindex pages).

`GET /sitemap.xml` returns **24 `<loc>` entries** total. Services-only
subtotal: **20 URLs — exact match against the target.**

| Section | Count |
|---|---|
| Site root + blog + 2 posts | 4 |
| Services overview | 1 |
| Pillar hubs (web3, ai, product-studio) | 3 |
| v1 leaves — Web3 | 6 |
| v1 leaves — AI | 6 |
| v1 leaves — Product Studio | 4 |
| **Services total** | **20** ✓ |
| **Grand total** | **24** |

Spot-checked all 14 coming-soon leaves with grep against the sitemap
output — none appear. Filter source: `getPublishedLeaves(pillar)` in
`components/sections/services-data.ts`.

---

## 4. Schema validation (SERVICES_PLAN § 5) — **PARTIAL FAIL**

Verified by curl + JSON-LD parse of the rendered HTML for one page of
each template.

| Page | § 5 requirement | Actual emission | Status |
|---|---|---|---|
| `/services` | `BreadcrumbList` + `ItemList` of 3 Services | **none** | ✗ |
| `/services/ai` | `BreadcrumbList` + `Service` w/ `hasOfferCatalog` + `FAQPage` | `BreadcrumbList` + `FAQPage` only — `Service` node missing | ✗ partial |
| `/services/web3/decentralized-identity-did-integration` | `BreadcrumbList` + leaf `Service` + `FAQPage` | **none** | ✗ |

Root cause: `lib/schema.ts` already exports `leafServiceSchemas`,
`buildServicesOverviewBreadcrumb`, `buildPillarBreadcrumb`,
`buildLeafBreadcrumb`, and the pillar-level `serviceSchemas` array
(`schema.ts:114` + `:174` + `:223`). Grep across the repo confirms only
`app/page.tsx` imports any of them — the three service route files never
do. The pillar hub *template* (`components/services/pillar-hub.tsx:42–49`)
emits its own inline `BreadcrumbList` + `FAQPage`, which is why that page
has 2 blocks. The overview and leaf route files emit zero.

The `schema.md` report (2026-05-20) explicitly flags this:
> "the new `leafServiceSchemas` and `buildLeafBreadcrumb()` helpers are
> wired into `lib/schema.ts` but not yet emitted from the leaf page —
> that happens when Template C lands."
> 
> Template C has since landed. The schema wire-up did not.

### Schema shape (offline verification on the DID leaf)

Despite not being emitted on the rendered page, the `Service` shape for
the DID leaf in `lib/schema.ts` is itself valid — all required schema.org
`Service` fields present, `provider.@id` matches the existing
`#organization` node, and `isRelatedTo` `@id`s all resolve to real
entries in `leafServiceSchemas`. Verified by the schema-report Vitest dump
on 2026-05-20.

A live Google Rich Results Test against the staging URL will **fail to
detect any leaf schema** because the page outputs no `<script
type="application/ld+json">` blocks. Fix this before requesting a Rich
Results validation run.

### Required follow-up

1. `app/services/page.tsx` — emit `buildServicesOverviewBreadcrumb()` +
   an `ItemList` referencing the 3 pillar `@id`s.
2. `app/services/[pillar]/page.tsx` — emit `buildPillarBreadcrumb(p)` +
   the matching entry from `serviceSchemas` (the pillar's `Service` with
   `hasOfferCatalog`). The template already emits its own breadcrumb +
   FAQ inline — pick one source and remove the duplicate.
3. `app/services/[pillar]/[slug]/page.tsx` — for `published + content`
   leaves, emit `buildLeafBreadcrumb(p, leaf)` + the matching
   `leafServiceSchemas` entry + a `FAQPage` built from
   `content.faqs` + `content.aeoAnswer`.

---

## 5. Lighthouse audit

Run via `npx lighthouse` against the local production build, headless
Chrome, default desktop preset, all four categories enabled.

| URL | Perf | A11y | Best-prac | SEO |
|---|---:|---:|---:|---:|
| `/services` | 71 | **96** | 79 | 69 |
| `/services/ai` | 80 | **96** | 96 | 66 |
| `/services/web3/decentralized-identity-did-integration` | 81 | **96** | **100** | 63 |

### Accessibility — passing, two contrast failures noted

A11y category 96 across the board. Two real `color-contrast` failures
recur — these are **WCAG AA fails** that are masked by the high overall
score:

- **Breadcrumb links** (`hover:text-dark` on `text-gray-light` over
  `bg-bg`) — pillar hub and leaf templates. Gray-light fails ≥ 4.5:1 ratio
  for normal-size text.
- **Pillar accent text on white** (e.g., `color:#10b981` AI green) used
  as label / number text. ~2.1:1 contrast against `bg-bg`.

Decorative bg wordmark (overview) is also flagged but its
`aria-hidden="true"` exempts it semantically.

### Performance — moderate, expected

LCP scores 50–55 on the two simpler pages, 29 on overview. Drivers
identified by Lighthouse: render-blocking resources (fonts), unused JS
from Clutch widget, missing `rel="preconnect"` to third-party origins
(clutch.co), unsized images in the trust marquee. None are services-
section regressions — they are upstream of this work.

### SEO — score depressed by `is-crawlable: 0`

All three pages show SEO 63–69. The single biggest negative signal:
**`is-crawlable: 0`** on every page, because `robots.txt` is currently
`Disallow: /` in the local environment (non-production). Expected on the
local build. **Not expected on production** — see § 7 below.

---

## 6. Manual a11y / screen-reader audit (SERVICES_PLAN § 7)

Code-level audit against the § 7 checklist. (Cannot run a real screen
reader in this environment — the items below are verified by reading the
rendered DOM and the JSX.)

| § 7 item | Status | Notes |
|---|---|---|
| Breadcrumbs `<nav aria-label="Breadcrumb">` | ✓ | Both pillar hub (`pillar-hub.tsx:59`) and leaf (`leaf-service.tsx:64`). `aria-current="page"` on the active crumb. |
| Coming-soon cards `aria-disabled="true"` | ✓ | `pillar-hub.tsx:269` — `role="group"` + `aria-disabled="true"` + no `href`. 14 coming-soon leaves render this way. |
| Tab order: hero → outcomes → pillars → trust → FAQ → CTA | ✓ | Overview component renders in this exact order (`services-overview.tsx:132`). |
| Tap targets ≥ 44×44px | ✓ | `min-h-[44px]` / `min-h-[56px]` on every clickable surface — outcome cards, leaf links, FAQ summaries, pillar CTAs. |
| `prefers-reduced-motion: reduce` short-circuit | ✓ | Delegated to `<Reveal>` primitive (`components/ui/reveal.tsx:19`) plus an explicit `@media` block on the FAQ chevron. |
| Accordions operable via Enter/Space | ✓ | Native `<details>`/`<summary>` — platform-managed keyboard semantics. |
| Focus-visible ring on every interactive primitive | ⚠ | Overview: 5 occurrences. Leaf: 2 occurrences. **Pillar hub: 0 occurrences.** Browser default outlines still show, but the design-system brand ring is absent from breadcrumb links, hero CTAs, leaf cards, and cross-pillar links on every pillar hub page. |

### Regression noted

`components/services/pillar-hub.tsx` is missing `focus-visible:ring-2
focus-visible:ring-brand focus-visible:ring-offset-2` on every
interactive surface. Pattern is consistently used in the overview and
leaf templates. Should be added before staging.

---

## 7. Production `robots.txt` — **BLOCKER**

The local build serves `Disallow: /` because
`NEXT_PUBLIC_VERCEL_ENV !== 'production'` — expected, and the reason
Lighthouse `is-crawlable: 0` fires on every audited page.

**Production output is wrong.** Reading `app/robots.ts`:

```ts
const DISALLOW = ['/api/', '/services/', '/admin/', '/admin/posts/*/preview']
```

In production this emits `Disallow: /services/`, which blocks Google
(and every AI crawler that respects robots) from indexing the **entire
services section** — including the 3 pillar hubs and the 16 v1 leaf
pages that the rest of this build is designed to make indexable.

The corresponding unit test currently fails:

```
FAIL  app/robots.test.ts > emits production rules when NEXT_PUBLIC_VERCEL_ENV=production
AssertionError: expected [ '/api/', '/services/', …(2) ] to deeply equal [ '/admin/', '/api/', …(1) ]
```

The test expects `['/admin/', '/api/', '/admin/posts/*/preview']`
(no `/services/`). The current source includes `/services/`. The test
encodes the correct intent — coming-soon leaves are already noindex via
per-page metadata (`app/services/[pillar]/[slug]/page.tsx:39`), so the
blanket `/services/` disallow is both incorrect and unnecessary.

### Required fix

Remove `'/services/'` from `DISALLOW` in `app/robots.ts`. The failing
test will then pass, and production robots.txt will allow the indexable
services pages while keeping individual coming-soon leaves noindex.

---

## 8. Trailing-slash mismatch

`SERVICES_PLAN.md` § 2 specifies a trailing slash on every services
route. `app/sitemap.ts` emits trailing-slash URLs accordingly:

```
https://www.metaborong.com/services/ai/
https://www.metaborong.com/services/ai/agentic-ai-systems/
```

But `next.config.ts` does not set `trailingSlash: true`, so Next 16's
default behavior 308-redirects `/services/ai/` → `/services/ai` (no
slash). Verified by curl:

```
GET /services/ai/   →  308 Permanent Redirect  →  /services/ai
```

This means the canonical URL Google fetches from the sitemap will be
the slashed form, and Google will follow the 308 to the non-slashed
form. Wasted crawl budget, slight equity dilution at scale, and an easy
audit-finding for any third-party SEO check.

The `pillar-hub.md` report flagged this on 2026-05-20 and labelled it
out of scope at the time. With Templates A/B/C now landed, it should be
resolved before staging.

### Fix options

1. Add `trailingSlash: true` to `next.config.ts` — matches the plan,
   makes the sitemap URLs canonical, and inverts the 308 (the no-slash
   form would redirect to the slash form). Lowest-risk change.
2. Drop trailing slashes from `app/sitemap.ts` and update the plan.

Option 1 matches existing plan + existing internal-link conventions
(`pillar.hubHref = '/services/ai/'` in `services-data.ts`).

---

## 9. Marketing-inflation lint (SERVICES_PLAN § 6) — **PASS**

`/usr/bin/grep -inE 'revolutionary|cutting-edge|world-class|best-in-class|game-changing|seamless'`
across all v1 content files and template components.

| File | Hits | Real? |
|---|---|---|
| `lib/services/content/ai.ts` | 2 | No — comment lines 9–10 documenting the lint rule itself. |
| `lib/services/content/web3.ts` | 0 | — |
| `lib/services/content/product-studio/*.ts` (4 files) | 0 | — |
| `lib/services/pillar-hub-content.ts` | 0 | — |
| `components/services/services-overview.tsx` | 1 | No — comment line 12 documenting the lint rule. |
| `components/services/pillar-hub.tsx` | 0 | — |
| `components/services/leaf-service.tsx` | 0 | — |

**Zero true positives.** Content compliance with § 6 confirmed.

### DID Aadhaar verifiable-fact requirement (§ 3 + § 6) — **PASS**

The DID leaf's `aeoAnswer` (line 626 in `lib/services/content/web3.ts`):

> "Decentralized identity DID integration is a verifiable-credentials
> engineering service for India-regulated products that need
> Aadhaar-linked identity without storing raw eKYC data. We integrate
> UIDAI's eKYC, OTP authentication, and offline-mode QR verification
> with W3C DID and verifiable credentials infrastructure, engineered for
> **Aadhaar-scale deployment across India's 1.3-billion-record identity
> system**. We partner with Sedax for zero-knowledge selective
> disclosure of Aadhaar attributes."

Compliant: entity-definition opener, 1.3-billion-record verifiable fact,
Sedax partnership as the second verifiable fact, 60 words.

---

## 10. Summary punch list

### Blockers — must land before production cutover

1. **`app/robots.ts`** — remove `'/services/'` from production
   `DISALLOW`. Fixes the failing `app/robots.test.ts` assertion as a
   side effect.

### High — should land before staging review

2. **Route-level schema emission** — wire `buildServicesOverviewBreadcrumb`,
   `buildPillarBreadcrumb`, `buildLeafBreadcrumb`, `leafServiceSchemas`,
   and `serviceSchemas` into the three route files. Remove the inline
   schema in `pillar-hub.tsx` once the route emits it canonically (avoid
   duplicate emission).
3. **Trailing-slash policy** — set `trailingSlash: true` in
   `next.config.ts` so the sitemap URLs are canonical and the 9 redirect
   rules continue to operate against the slashed form.

### Medium — design-system polish before staging

4. **Pillar hub focus rings** — add
   `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`
   to every interactive surface in `components/services/pillar-hub.tsx`
   (breadcrumb links, hero CTAs, sub-group case-study cards, leaf cards,
   cross-pillar links).
5. **Color-contrast on breadcrumb links** — `text-gray-light` over
   `bg-bg` is below WCAG 4.5:1. Bump to `text-gray` for the link state,
   or darken `gray-light`'s token globally.
6. **Color-contrast on pillar-coloured small text** — pillar accent
   colors (AI `#10b981`, Web3 `#296ff0`, Product Studio `#F6851B`) used
   as text on white pass 3:1 (large text only). Either reserve them for
   large/decorative text or pair with a darker variant when used as
   body-size labels.

### Low — leaf template polish

7. **Leaf hero CTA** — `leaf-service.tsx:114` uses `href="/#contact"`
   while the overview and pillar hub use `mailto:contact@metaborong.com`.
   Either is defensible; inconsistency is the only flag.
8. **`<main>` landmark consistency** — `pillar-hub.tsx` has
   `<main id="main">`, `leaf-service.tsx` has `<main>` without an `id`,
   and overview has no `<main>` in the component (it's wrapped at the
   route layer). Choose one pattern across the three.

### Not in this pass

- Live Rich Results Test against the deployed staging URL — defer until
  blocker 1 + high 2 land.
- Real screen-reader walkthrough on a physical AT (NVDA / VoiceOver) —
  worth one human session before production cutover; the code-level
  audit here covered the structural side only.

---

## What was verified clean

- All 9 redirect rules return 308 → 200 in one hop.
- Sitemap contains exactly 20 services URLs; 14 coming-soon stubs absent.
- All 11 leaf-template blocks render; all 7 pillar-hub blocks render; all
  7 overview blocks render.
- DID Aadhaar-scale verifiable fact present in `aeoAnswer`.
- Zero marketing-inflation banned terms in any v1 content or template.
- All 16 v1 leaves authored to ≥ 600 words; all four content reports
  (`.reports/content-*.md` + `.reports/leaf-template.md`) verified.
- Coming-soon cards `aria-disabled="true"` + no `href` (14 stubs).
- Tab order matches § 7 reading order on every template.
- `prefers-reduced-motion: reduce` short-circuits motion via `<Reveal>`
  + an explicit FAQ-chevron `@media` rule.
- A11y score ≥ 96 across all three audited pages.
- TypeScript compiles clean; production build succeeds; one
  pre-existing test (`app/robots.test.ts`) fails — encoded in § 7 above.

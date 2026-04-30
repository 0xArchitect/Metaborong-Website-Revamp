# Homepage Premium Iteration — Design Spec

**Date:** 2026-04-30
**Status:** Approved
**Scope:** Homepage visual system + 3 proof sections (hero, services, navbar) + parallel SEO/GEO content rewrite for all 10 sections + code-side technical SEO additions
**Inspiration:** supermemory.ai (premium feel) — *inspired by, not a clone*
**Prior session:** [2026-04-28 metaborong-website-revamp-design.md](2026-04-28-metaborong-website-revamp-design.md)

---

## 1. Goals

1. Iterate the homepage from "looks fine" to "looks premium" — match the perceived sharpness of supermemory.ai while keeping a distinctive Metaborong identity.
2. Eliminate inconsistencies via a system-level discipline: locked tokens, locked rhythm, locked color roles, three CTA variants, one card pattern.
3. Re-anchor content for SEO/AEO/GEO commercial-intent keywords (per `docs/metaborong-seo-strategy.pdf` Gap 3) without diluting copy quality.
4. Address technical SEO findings from `docs/SEO AUDIT.pdf` that are code-side (schema additions, sitemap, robots, canonical, alt text, server-rendering, llms.txt).
5. Lock a system that propagates cleanly to the remaining 7 sections in follow-up sessions, not stand-alone bespoke work.

## 2. Non-Goals

- Rolling out the new system to remaining 7 sections (trust bar, why us, work preview, testimonials, founders, comparison, FAQ, contact CTA, footer) — deferred to follow-ups; their copy is drafted this session, visual rollout is not.
- Service hub pages (3) and individual service pages (14) — separate sessions.
- Account-side technical SEO: Google Search Console, GA4, Cloudflare CDN, domain authority work — blocked on user account access, separate workstream.
- Case studies — blocked on client content.

## 3. Visual System (the foundation)

### 3.1 Type scale (8 steps, modular, fluid where applicable)

| Step | Size | Usage | Weight | Tracking |
|---|---|---|---|---|
| Display | `clamp(48px, 6vw, 88px)` | Hero H1 only | 500 | -0.03em |
| H2 | `clamp(32px, 4vw, 56px)` | Section titles | 500 | -0.02em |
| H3 | 24px | Card titles | 500 | -0.01em |
| Body-lg | 18px / 1.5 | Hero blockquote, section leads | 400 | normal |
| Body | 16px / 1.6 | Default | 400 | normal |
| Body-sm | 14px / 1.5 | Captions, micro-copy | 400 | normal |
| Mono-sm | 13px JetBrains Mono | Eyebrows, HUD, labels | 500 | 0.02em |
| Eyebrow | 12px uppercase | Section labels | 500 | 0.12em |

Mobile fluid clamps cover 320px → 1536px without breakpoint stutter.

### 3.2 Spacing rhythm (4px base)

- Section padding (vertical): `clamp(80px, 10vw, 160px)`
- Inner gap scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 (px)
- **Locked rhythm rule:** eyebrow → H2 gap = 16px; H2 → body gap = 24px; body → CTA gap = 32px. Identical in every section, no exceptions.

### 3.3 Color roles (Q3-C: discipline by role, not subtraction)

| Token | Hex | Usage rule |
|---|---|---|
| `ink` | `#0a0a0a` | Primary text, dark canvas bg |
| `paper` | `#f5f7ff` | Light canvas bg |
| `paper-2` | `#fafbff` | Subtle alt bg (allowed only as section alternation) |
| `surface` | `#FFFFFF` | Cards / panels on light bg |
| `surface-dark` | `#0f0f0f` | Cards on dark bg |
| `line` | `#e5e8f4` | Borders on light |
| `line-dark` | `rgba(255,255,255,0.06)` | Borders on dark |
| `muted` | `#6b7280` | Body text on light |
| `muted-dark` | `#a8a8a8` | Body text on dark |
| `brand` | `#204AF8` | **Brand chrome ONLY** — logo, links, focus rings, Product pillar identity. Never CTA, never emphasis. |
| `accent` | `#F6851B` | **Primary CTA + Web3 pillar identity ONLY.** When orange is used as a CTA fill, at most one such CTA per viewport-height of scroll. Pillar-identity accents (icon/label/arrow inside the Web3 card) do not count toward this cap — they are small-area identity marks, not attention magnets. |
| `accent-2` | `#3dd685` | **AI pillar identity ONLY** (desaturated from `#4dff9a` — too neon for premium light bg). |

**Inconsistency-killer rules:**
1. Every section bg is one of: `paper`, `paper-2`, `ink`. No fourth bg color.
2. Every section header follows eyebrow → H2 → body rhythm with locked gaps.
3. Every CTA is one of three variants (see 3.4). No fourth.
4. Every card: `border-radius: 16px`, `1px solid` border (light = `line`, dark = `line-dark`), shadow tier system (3 levels: rest / hover / active).
5. Every icon: Lucide React, stroke 1.5px, sizes from {16, 20, 24}. No other icon library, no other stroke widths.

### 3.4 CTA variants (three, locked)

| Variant | Visual | Usage |
|---|---|---|
| Primary | `accent` filled bg, white text, ink outline on hover | Conversion CTAs (Start a project, Let's talk) |
| Secondary | `ink` outline, ink text, `accent` text on hover | Mid-priority actions (See our work) |
| Ghost | Text + chevron arrow, no fill, no border, underline + arrow translate-x:4px on hover | Tertiary, in-card, in-nav links |

### 3.5 Motion grammar (Q6-B: minimal + 1 signature)

- **Section reveal:** 24px translateY + opacity 0→1, `400ms cubic-bezier(0.22, 1, 0.36, 1)`, triggered at 15% viewport entry. Once per section.
- **Hover lift (cards):** -2px translateY, shadow deepens, `200ms ease-out`. No scale.
- **Hover (CTAs / links):** color/underline shift + arrow translate-x:4px, `200ms ease-out`.
- **Signature moment:** Services pillar cards have a slow radial gradient trace following cursor on hover. ~8% opacity, 240px radius, soft falloff, in pillar's accent color. Echoes the orb's HUD aesthetic. **This is the ONLY decorative motion outside the orb.**
- **Reduced motion:** all animations become instant opacity transitions when `prefers-reduced-motion: reduce`.

### 3.6 Responsive rules (first-class, not deferred)

- Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`
- Container: `max-w-[1280px]`, horizontal padding `clamp(24px, 4vw, 48px)`
- Grid pattern: 3-up grids collapse directly to 1-up at `md` (no awkward 2-up middle)
- Touch targets: minimum 44×44px
- Body text minimum 16px on mobile
- No horizontal scroll at any viewport width
- Verification at `375 / 768 / 1280 / 1536` is a per-section completion gate

## 4. Hero (proof section 1)

### 4.1 Layout

- 55/45 split at `lg+`, stacks vertically below `lg`. Orb canvas: full width below `lg`, height `clamp(360px, 60vh, 520px)`.
- Background: `paper` (`#f5f7ff`).
- Left column: eyebrow → Display H1 → 18px blockquote → CTA pair → trust micro-copy. Locked rhythm gaps from §3.2.
- Right column: orb canvas, transparent over `paper`.

### 4.2 Orb restyle (color discipline applied)

- 200 ambient nodes: drop from `#204AF8` to a desaturated `#c8d0ec` (atmosphere, not signal).
- 14 service nodes keep pillar colors with luminance discipline:
  - Web3 (`#F6851B`) — 5 nodes
  - AI (`#3dd685` desaturated) — 5 nodes
  - Product (`#204AF8`) — 4 nodes
  - All service nodes get a 30%-opacity rim/halo to lift them off desaturated atmosphere.
- Edges: opacity 0.16 → 0.10. Less visual noise.
- Auto-rotate speed unchanged (0.058 rad/s).
- HUD label: drop scan-line animation (it competes); keep L-brackets and blinking `_` cursor; swap `rgba(2,6,26,0.94)` to `rgba(10,10,10,0.88)` so it sits naturally on light bg. Pillar color stays as accent border.

### 4.3 Copy structure (slots — final copy from Lane B)

- **Eyebrow (mono-sm uppercase):** positioning line, ≤6 words. Final from Lane B.
- **H1 (Display):** ONE sentence, max 12 words, **must contain primary keyword `web3 development company`**. Final from Lane B.
- **Blockquote (body-lg, `border-left: 2px brand`):** 38-word AEO extraction sentence, **must mention `ai agent development`** (Gap 1 first-mover positioning). Final from Lane B.
- **CTA pair:** Primary "Start a project" (orange filled) + Ghost "See our work" (text + arrow).
- **Trust micro-copy:** 1 line, body-sm, muted, ≤14 words.

### 4.4 Trust bar (sits under hero)

- Left-side eyebrow label "Trusted by" — anchors the marquee narratively.
- Marquee names rendered in mono-sm uppercase with consistent spacing, no logos.
- Marquee speed: existing CSS infinite scroll, unchanged.

### 4.5 Files affected

- `components/hero-orb/orb-scene.tsx` — color constants, edge opacity, ambient node color, HUD style props
- `components/sections/hero.tsx` — layout rebuild + new copy slots
- `components/sections/trust-bar.tsx` — eyebrow label + mono treatment

## 5. Services (proof section 2 — the system reference)

### 5.1 Structure

- Section bg: `ink` (`#0a0a0a`) — rhythm contrast with hero's `paper`, stress-tests color rules on dark.
- Section header: eyebrow ("WHAT WE BUILD") → H2 ("Three pillars. One studio.") → body lead (1 sentence, ~20 words). Locked rhythm gaps.
- 3-up grid at `lg+`, 1-up below `md`. No 2-up middle state.

### 5.2 Pillar card composition (the reusable card pattern)

This card pattern propagates to Why Us, Work Preview, Founders, Testimonials in follow-ups. Locking it here prevents future drift.

- Bg: `surface-dark` (`#0f0f0f`)
- Border: `line-dark` at rest, `rgba(255,255,255,0.12)` on hover
- Border-radius: 16px
- Padding: 40px desktop, 32px mobile
- Internal layout (top to bottom, locked gaps):
  1. Pillar identity row: 20px Lucide icon (pillar color) + mono-sm uppercase pillar label (pillar color) — e.g., `▲ WEB3` in orange
  2. Gap 32px
  3. H3 service category title (white, 24px medium) — **must contain primary keyword** (see §5.4)
  4. Gap 16px
  5. Body description (`muted-dark`, 16px / 1.6, 2 lines max)
  6. Gap 32px
  7. Service list: 4-5 services as inline mono-sm chips, comma-separated text feel (not pills)
  8. Gap 40px (fills to bottom)
  9. Ghost CTA "Explore [pillar] →" in pillar color, hover underlines + arrow translates 4px

### 5.3 Pillar color application (proves §3.3 discipline)

Each card contains exactly 3 small accents in its pillar color: icon + label + CTA arrow. No fills, no bg tints. Net: 9 small accents on a dark section, all serving identity. Disciplined.

### 5.4 Per-card copy targets (final from Lane B)

| Card | H3 | Primary keyword | Secondary keywords | Hub link |
|---|---|---|---|---|
| Web3 | "Web3 Development" | `web3 development company` (720) | `defi development` (390), `web3 consulting` (320), `crypto wallet development` (260) | `/services/web3/` |
| AI | "AI Agent Development" | `ai agent development` (480) | `ai agents defi` (90), `ai smart contract audit` (70) | `/services/ai-agents/` |
| Product | "Product Studio" | brand positioning | n/a | `/services/product-studio/` |

The AI card carries Gap-1 differentiation ("AI Agents in Web3 — first-mover topic"). Body copy explicitly bridges Web3 + AI.

### 5.5 Signature motion (§3.5)

Radial gradient trace on cursor hover, in pillar color, ~8% opacity, 240px radius. Card lift -2px. CTA arrow translate-x:4px.

### 5.6 Click target

Entire card is the link target → hub page. Ghost CTA inside is decorative; arrow animates with card hover.

### 5.7 Files affected

- `components/sections/services.tsx` — full rebuild
- New: `components/ui/pillar-card.tsx` — extracted reusable card
- New: `components/ui/section-header.tsx` — reusable eyebrow→H2→body header

## 6. Navbar (proof section 3)

### 6.1 Structure

- Sticky, height 72px desktop / 64px mobile. **Does not shrink on scroll** (premium restraint, no growing/shrinking gimmicks).
- Bg at top: transparent over hero's `paper`.
- Bg after 24px scroll: `rgba(245, 247, 255, 0.72)` + `backdrop-filter: blur(20px) saturate(140%)` + `1px solid rgba(10,10,10,0.04)` bottom border.
- Transition between states: 200ms opacity on bg layer only — no layout shift.
- 12-col grid, max-w-1280, horizontal padding `clamp(24px, 4vw, 48px)`.

### 6.2 Layout

- **Left:** M-mark logo (28px) + wordmark "Metaborong" (16px medium, ink). One click target → `/`.
- **Center:** `Services ▾` · `Work` · `About` · `Blog`. 14px medium, ink at 80% / full ink on hover. Gaps 40px.
- **Right:** Ghost CTA "Let's talk →" (text + arrow). Arrow translates 4px on hover, text underlines.

### 6.3 Services dropdown

- Trigger: chevron rotates 180° on open, 200ms.
- Panel: 400px wide, anchored to trigger, hover-open desktop / click-open touch.
- Bg: `surface` (white solid, NOT blur — designed feel beats yet another glass surface). Border `1px solid line`, radius 12px, shadow tier 2.
- Internal padding: 8px.
- 3 rows, one per pillar:
  - Row composition: pillar icon (20px, pillar color) + pillar name (16px medium, ink) + service count micro-copy (`5 services`, mono-sm, muted)
  - Below: 1-line description (muted, body-sm — not italic)
  - Hover: row bg → `paper`, 2px left-border in pillar color
  - Click: navigate to hub page
- No nested service lists. Dropdown routes; hub pages list.

### 6.4 Mobile

- Hamburger (Lucide `Menu`, stroke 1.5) → fullscreen panel.
- Panel bg: `ink` with white text — deliberate inversion creates "modal" feel without modal complexity.
- Nav links stack: Services (expandable inline, taps reveal 3 pillar rows), Work, About, Blog. 24px medium, generous gaps.
- Bottom: full-width primary CTA "Let's talk".
- Close: X top-right or any link tap.
- Wordmark hides below `sm`, only M-mark remains in nav.

### 6.5 Files affected

- `components/nav.tsx` — restructure
- New: `components/nav/services-dropdown.tsx`
- New: `components/nav/mobile-menu.tsx`

## 7. Content / SEO / GEO Strategy

### 7.1 Source-of-truth files

- Existing partial: `docs/content/homepage.md`
- Strategy doc: `docs/metaborong-seo-strategy.pdf`
- Audit doc: `docs/SEO AUDIT.pdf`
- Output: `docs/content/homepage-v2.md` (new — does not overwrite v1 until approved)
- Audit output: `docs/content/seo-audit-homepage-v2.md`
- GEO output: `docs/content/geo-extraction-map.md`
- llms.txt source: `docs/content/llms-homepage.txt` → built into `public/llms.txt`

### 7.2 Word count target

≥500 words homepage in raw server-rendered HTML, target 700–800. Old site was 437 (thin). Per-section soft caps: hero 80 / services-section 200 / why-us 120 / work-preview 60 / testimonials 80 / founders 100 / comparison 80 / faq 200 / cta 30 / footer 50 (totals ~1000 raw, ~750 visible after dedup).

### 7.3 Per-section keyword + AEO map

| Section | Primary kw (vol/mo) | Secondary | AEO question | Notes |
|---|---|---|---|---|
| Hero | `web3 development company` (720) | `ai agent development` (480) | "What does Metaborong do?" | H1 must contain primary; blockquote = 38-word AI-extraction sentence with secondary |
| Services — Web3 card | `web3 development company` + `defi development` (390) | `web3 consulting` (320), `crypto wallet development` (260) | "What Web3 services does Metaborong offer?" | H3 + body must contain DeFi/DEX/wallet/token explicitly |
| Services — AI card | `ai agent development` (480) | `ai agents defi` (90), `ai smart contract audit` (70) | "What AI services does Metaborong offer?" | **Gap 1 first-mover** — emphasize AI-in-Web3 |
| Services — Product card | brand positioning | n/a | "What does Metaborong's Product Studio do?" | Less SEO weight, more positioning |
| Why Us | `web3 development partner` long-tail | speed, niche depth | "Why choose Metaborong over a large agency?" | 1 claim + 1 proof per differentiator |
| Work Preview | client brand names | n/a | "Who has Metaborong worked with?" | Project name + outcome metric where available |
| Testimonials | E-E-A-T (named persons) | n/a | "What do clients say about Metaborong?" | Full name + role + company + quote |
| Founders | E-E-A-T (founder authority) | n/a | "Who founded Metaborong?" | Name + role + 1 credibility marker each |
| Comparison | `metaborong vs solulab`, `metaborong vs antier` long-tail | competitor-capture | "How does Metaborong compare to large agencies?" | Honest comparison; targets Gap-3 capture |
| FAQ | long-tail questions | `how much does web3 development cost`, `what is ai agent development`, `how to choose web3 development partner` | 8 distinct extractable Q&As | **Triggers FAQPage rich snippet** — schema required |
| Contact CTA | conversion only | n/a | n/a | 1 sentence, 1 CTA |
| Footer | site architecture | n/a | n/a | Nav links + social + legal |

### 7.4 GEO discipline rules (applied by `seo-geo`)

1. Every claim is a complete sentence with subject ("Metaborong builds X" not "We build X" — AI extractors strip context).
2. No fluff that resists chunking ("we deliver excellence" → cut).
3. Numbers and named entities preferred ("8 named clients" beats "many clients").
4. FAQ Q&As are self-contained — no "see above" references.
5. `llms.txt` lists homepage claims as bullet facts; lives at `public/llms.txt`.

### 7.5 Inconsistency-killer for content

- Every section header: `[eyebrow keyword phrase] / [H2 conversational claim] / [body lead 1-2 sentences]`.
- Every CTA verb is one of three: `Start` / `Explore` / `See` (matches the 3 visual variants).
- Every body paragraph: max 60 words, max 3 sentences.

### 7.6 Content pipeline (sequenced, not parallel)

```
seo-aeo-landing-page-writer (draft)
  → seo-content (audit, score, feedback)
  → seo-aeo-landing-page-writer (revise against feedback)
  → seo-geo (AI-citation pass + extraction map + llms-homepage.txt)
  → final
```

Running these in parallel against the same copy produces conflicting feedback. Pipeline order is fixed.

## 8. Code-side technical SEO additions

Folded into Lane C (§9). Out of scope: account-side items (GSC, GA4, Cloudflare).

### 8.1 Schema (JSON-LD)

- **Organization** — verify expanded with `founder` Person sub-entities (Arnab Ray, Anik Ghosh, Soumojit Ash) for E-E-A-T.
- **WebSite + SearchAction** — verify present.
- **FAQPage** — NEW. Mirrors the homepage FAQ section's 8 Q&As. Triggers FAQ rich snippets.
- **Person** schemas for the 3 founders. Linked via Organization.founder array.
- BreadcrumbList: not needed on homepage root.

### 8.2 `llms.txt`

`public/llms.txt` — markdown. Sections: identity, services, founders, clients, where-to-learn-more. Each entry is one factual sentence with named entity. Generated from `docs/content/llms-homepage.txt`.

### 8.3 Sitemap + robots

- `app/sitemap.ts` — Next.js MetadataRoute.Sitemap. Initial entries: `/`, `/services/web3/`, `/services/ai-agents/`, `/services/product-studio/`, `/about/`, `/contact/`, `/blog/`. Service hub paths included even if pages deferred (fine — they 404 until built; remove from sitemap until live OR ship placeholder pages — **decision: include only routes that return 200**, so on day-of-merge sitemap = `/` only, expand as hubs ship).
- `app/robots.ts` — Next.js MetadataRoute.Robots. Allows all, references sitemap URL.

### 8.4 Canonical + redirects

- Canonical URL form: **`https://metaborong.com/`** (no www, https). Decision locked.
- `next.config.js` — redirects: `www.metaborong.com → metaborong.com`, `http → https`. 301s.
- Verify Next.js Metadata API has `alternates.canonical` on every page (start with `app/page.tsx`).

### 8.5 Image discipline

- Every `<img>` migrated to Next.js `<Image>` component (handles WebP + lazy loading by default).
- Every image has descriptive `alt` attribute (audit found 6 missing on old site; new build needs explicit audit).
- M-mark logo SVG: kept as inline SVG (already is), not Image component.

### 8.6 Server-render verification

Audit found old site at 32% rendered (LLMs miss content). New build uses Server Components for content. Verify by `view-source` on each section header/body — copy must be in raw HTML, not hydrated client-side. Orb canvas is `ssr:false` and that is fine (decorative, not content).

## 9. Subagent dispatch plan

### 9.1 Dependency graph

```
SEQUENTIAL (this session):
  Spec approved
  → Plan written (writing-plans skill)
  → Worktree created (using-git-worktrees skill)
  → Subagent dispatch begins

PARALLEL (3 lanes):

Lane A: Visual Implementation (1 agent: frontend-design + nextjs-best-practices)
  - Design system tokens in app/globals.css (§3)
  - Reusable components: section-header, pillar-card, cta primitives
  - Hero orb restyle (§4.2)
  - Hero section layout + copy slots (§4)
  - Services rebuild (§5) — proof section
  - Navbar restructure (§6)
  - Responsive verify at 375/768/1280/1536

Lane B: Content Pipeline (3 agents, SEQUENCED inside the lane)
  B1: seo-aeo-landing-page-writer → drafts homepage-v2.md
  B2: seo-content → audits, scores, returns feedback
  B1 (revise pass): incorporates B2 feedback
  B3: seo-geo → AI-citation pass + extraction map + llms-homepage.txt

Lane C: Technical SEO additions (1 agent: nextjs-best-practices)
  - FAQPage JSON-LD
  - Person schema for founders
  - Verify Org + WebSite schema
  - public/llms.txt
  - Word count audit (≥500)
  - Server-render verification
  - app/sitemap.ts
  - app/robots.ts
  - Canonical tag audit
  - next/Image migration + alt audit
  - next.config.js redirects (canonical URL form)

MERGE:
  Lane B output (locked copy) → Lane A pulls into proof sections
  Lane C output → drops into app/, public/
  Verification pass (responsive + Lighthouse + manual click-through)
  Code review (superpowers:requesting-code-review)
  Merge to main (superpowers:finishing-a-development-branch)
```

### 9.2 Subagent contracts (what each agent receives)

Every agent's brief includes:
1. Path to this spec doc
2. Path to the implementation plan (from writing-plans)
3. Their specific deliverable file paths
4. Their lane's stop conditions (deliverables exist + verifications pass)
5. **No authority to modify files outside their lane** — prevents merge conflicts

### 9.3 Worktree

Lane A runs in `feature/premium-homepage-v2` worktree (touches code). Lanes B and C touch `docs/content/`, `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`, `next.config.js`, schema files in `app/page.tsx` — same worktree is fine; no overlap with Lane A's component files.

### 9.4 Verification gates (per lane)

- **Lane A:** dev server runs, all 4 viewport widths render without horizontal scroll, hover/motion behaviors work, `prefers-reduced-motion` respected, no console errors.
- **Lane B:** homepage-v2.md complete for all 10 sections, audit report produced, GEO extraction map produced, llms-homepage.txt produced. Word count ≥500 in body copy.
- **Lane C:** sitemap.xml + robots.txt + llms.txt all served at `/sitemap.xml`, `/robots.txt`, `/llms.txt`. JSON-LD validates against schema.org. All `<img>` are `<Image>`. All images have alt. Canonical tag present on `/`.

## 10. Files affected (consolidated)

### New
- `components/ui/section-header.tsx`
- `components/ui/pillar-card.tsx`
- `components/nav/services-dropdown.tsx`
- `components/nav/mobile-menu.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `public/llms.txt`
- `docs/content/homepage-v2.md`
- `docs/content/seo-audit-homepage-v2.md`
- `docs/content/geo-extraction-map.md`
- `docs/content/llms-homepage.txt`

### Modified
- `app/globals.css` — design system tokens (§3)
- `app/page.tsx` — schema additions, canonical
- `app/layout.tsx` — possibly Person/Organization expansion
- `next.config.js` — redirects
- `components/nav.tsx` — restructure
- `components/sections/hero.tsx` — layout + copy
- `components/sections/services.tsx` — full rebuild
- `components/sections/trust-bar.tsx` — eyebrow + mono treatment
- `components/hero-orb/orb-scene.tsx` — color discipline applied

### Untouched (this session — deferred sections)
- `components/sections/why-us.tsx`
- `components/sections/work-preview.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/founders.tsx`
- `components/sections/comparison.tsx`
- `components/sections/faq.tsx` *(except for FAQPage schema additions in app/page.tsx)*
- `components/sections/contact-cta.tsx`
- `components/footer.tsx`

## 11. Open follow-ups (tracked, not in this session)

1. Roll out new system + drafted copy to remaining 7 sections (Task #7).
2. Account-side technical SEO: Google Search Console verification + sitemap submission, GA4 property + conversion events, Cloudflare CDN (Task #8).
3. Service hub pages (3) and individual service pages (14) — separate spec.
4. Case studies — blocked on client content.
5. Founders LinkedIn URLs (placeholders in `components/sections/founders.tsx`).
6. OG image (`/assets/og/og-home.webp`) — referenced in metadata, file missing.
7. Mobile responsiveness pass on the 7 deferred sections.
8. Core Web Vitals audit (LCP < 2.5s, INP < 200ms, CLS < 0.1).

## 12. Approval log

- 2026-04-30 — Q1 (premium definition: all of A-D)
- 2026-04-30 — Q2-D (visual system + 1 proof section, expanded by user to 3 proof sections: hero, services, navbar)
- 2026-04-30 — Q3-C (color discipline by role, keep 3 accents)
- 2026-04-30 — Q5-B (orb restyled, not removed)
- 2026-04-30 — Q6-B (minimal motion + 1 signature)
- 2026-04-30 — Q7-B (proof sections fully + drafts for remaining 7)
- 2026-04-30 — Section 1-6 + amendments approved
- 2026-04-30 — Canonical URL form: `https://metaborong.com/` (no www) approved

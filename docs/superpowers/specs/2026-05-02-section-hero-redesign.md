# Section Spec — Hero Redesign

Supersedes the typography-only refactor in `2026-05-02-section-hero.md`. Inherits the master plan (`2026-05-01-homepage-restructure-master-design.md`).

## Why this exists

The Session 3 token-migration produced a technically-correct hero that visually broke at every viewport: H1 wrapped to 5 lines on a 1440 laptop (text width starved by `max-w-[680px]` minus `xl:px-[128px]` = ~424px usable area), copy and orb floated in disconnected tracks on ultrawide, blockquote and body lead were visually identical, and the right column had no semantic anchor.

This spec rewrites the hero in two phases:

- **Phase 1 — Layout, typography, copy.** Self-contained refactor of `components/sections/hero.tsx`. Independent of orb work.
- **Phase 2 — Orb density (ASCII filler glyphs).** Modifies `components/hero-orb/orb-scene.tsx`. Service nodes + HUD untouched.

Phases can ship in the same session or sequentially. Phase 2 is deferrable.

## Phase 1 — Layout, typography, copy

### Layout strategy

- **Section wrapper:** `min-h-screen grid grid-cols-[60fr_40fr] bg-bg-subtle`. Section caps at `max-w-[1600px] mx-auto` so ultrawide doesn't open a dead zone between columns.
- **Grid shift 55/45 → 60/40:** the copy is the load-bearing element; the orb is a companion. Giving copy more room fixes the H1 wrap *and* tightens the visual coupling between sides.
- **No `max-w-[680px]` on the inner copy stack.** The track itself does the constraining. Inside the column, content uses the full width minus padding.
- **Horizontal padding scale (left column):** `px-[24px] md:px-[48px] lg:px-[64px] xl:px-[80px]`. Reduced from the master-plan global `lg:px-[96px] xl:px-[128px]` *for the hero only* — hero is full-bleed against the orb track, not a centered content island, so the same padding feels claustrophobic. Document as hero-specific deviation; other sections still follow the global scale.
- **Vertical:** `py-[96px]`. With `min-h-screen` + the column being a flex column with `justify-center`, the 96px sets a floor and excess viewport height becomes breathing room.
- **Right column (orb):** `relative overflow-hidden flex items-center justify-center min-h-screen`. **Divider line removed** — the contrasting empty space + the orb's own gravity are enough; a faint border was doing no work.

### Typography hierarchy (revised)

| Role | Treatment |
|---|---|
| Eyebrow chip | `bg-bg`, `border border-border`, `rounded-sm`, `px-3 py-[5px]`. Inside: 7px brand-blue dot + `<Eyebrow>` text. Unchanged from Session 3. |
| H1 | `text-[clamp(40px,5vw,72px)] font-bold tracking-[-0.04em] leading-[1.02] text-dark`. **Deviation from master plan** (locked at `clamp(36px,4.5vw,64px)`): the new H1 is 3 short period-terminated phrases instead of one long phrase, so it earns the bigger ceiling without overflowing. Floor lifted 36→40px because the smaller phrases need presence at mobile-ish widths. Document here so future section refactors don't propagate the bump — H1 stays a hero-only treatment. |
| AEO blockquote | **Promoted.** `border-l-[3px] border-brand pl-5 py-1`. Inner `<p>`: `text-[17px] text-dark leading-[1.6] tracking-[-0.015em] max-w-[560px]`. Dark text + thicker rail + larger size = it now reads as a definitional statement, not a faded sub-paragraph. |
| Body lead | **Demoted.** `text-sm text-gray-light leading-[1.6] tracking-[-0.005em] max-w-[480px]`. Smaller, lighter, less weight competing with the blockquote. |
| CTA row | Unchanged: `flex items-center gap-3`. |
| Micro-copy | Unchanged: `text-xs text-gray-light tracking-[-0.01em]`. |

Vertical rhythm between blocks: eyebrow → 28px → H1 → 24px → blockquote → 24px → body lead → 32px → CTAs → 20px → micro-copy. Use arbitrary-value `mb-[Npx]` per master-plan convention.

### Copy (SEO + AEO + GEO)

**Eyebrow** (unchanged):
> Web3 Development · AI Agents · Product Studio

**H1** (locked):
> Web3 protocols.\
> AI agents.\
> Shipped.

Rendered as three lines, each its own period-terminated phrase. Last word "Shipped." in `text-brand` for the highlight (replaces the old "& AI Agent Studio" highlight). The verb at the end carries the brand voice ("ships, not just consults") and gives the H1 its rhythm.

**AEO blockquote** (rewritten — single sentence, entity-led, citation-friendly):
> Metaborong is a Web3 and AI agent development studio that ships DeFi protocols, autonomous AI systems, and custom SaaS products for founders and crypto-native teams across the US and Europe.

Why this works for AEO/GEO:
- Names "Metaborong" once at sentence-start — strong entity signal for `What is Metaborong?` queries
- Categories enumerated cleanly (`Web3 development studio`, `AI agent studio`) — answers `who builds X` queries
- Outputs enumerated (`DeFi protocols`, `autonomous AI systems`, `SaaS products`) — gets cited on `companies that build [Y]` queries
- Audience + geography in one clause — answers `for [Z] in [region]` queries
- Single sentence, ~35 words, no hedge phrases — optimal for LLM chunking

**Body lead** (trimmed, demoted role):
> For founders who need a technical partner that ships — not an agency that pitches.

One sentence, sets the human voice, picks up "ships, not just consults" positioning from the locked competitive frame.

**Micro-copy** (unchanged):
> No pitch decks. No retainers. Direct from founders.

**CTAs** (unchanged):
> [Start a Project →] [See Our Work]

### Inline visual polish notes

- The H1 highlight word "Shipped." is `text-brand` only — no underline, no slash, no decoration. Color does the work.
- Blockquote is *not* a `<Card variant="quote">` — that primitive is reserved for testimonials with italic body and 32px padding. The hero blockquote is an AEO definition: upright, dark text, brand left-rail. Master-plan card-quote convention does not apply here.
- Eyebrow chip dot bumped 7px → 8px, brand-blue, `rounded-sm`. Makes the chip feel anchored.

## Phase 2 — Orb density (ASCII glyph filler)

Reference: `components/hero-orb/orb-scene.tsx`. Existing scene has 214 total nodes — 14 interactive service nodes + ~200 decorative filler dots, all rendered as point geometries on a Fibonacci sphere. Center has an "M" mark, color-coded service nodes (`#F6851B` Web3, `#10b981` AI, `#204AF8` Product) trigger an HTML HUD label on hover.

### Goal

Replace **only the ~200 filler dots** with ASCII glyphs rendered as `THREE.Sprite`s. The 14 service nodes stay as glowing dots. HUD label feature is untouched.

### Glyph treatment

- Glyph alphabet: `·`, `+`, `*`, `◦`, `╳`, `█` (weighted toward `·` and `+` so the cloud reads as a soft particle field, with denser glyphs as accent)
- Each filler node:
  - `THREE.Sprite` with material from a per-glyph canvas texture (rendered offscreen at mount, cached)
  - Color: `#c8d8ff` (dim blue-white) at ~0.55 opacity — sits behind service nodes in apparent depth
  - Size: 14–22px on screen, varied by glyph (denser glyphs render larger)
  - Font: `JetBrains Mono` 700 — matches existing HUD label typography
- Filler count: 200 → **280** for denser cloud. The Fibonacci distribution stays the same, just more samples. Drop back to 200 only if 4K FPS regresses (see performance budget).

### Service node treatment (unchanged)

- Color-coded glowing `THREE.Points` particles, exactly as today
- Hover → existing HUD label `.orb-label` HTML element
- Auto-rotate + drag interaction unchanged

### What does NOT change

- Sphere geometry, Fibonacci distribution, rotation, drag controls
- Service node count, colors, HUD label, animations in `globals.css`
- Center M-mark
- The `<HeroOrb />` API consumed by `hero.tsx`

### Performance budget

- Sprite textures generated once at scene init (one canvas per unique glyph, not per node) — ~6 textures total, cached
- Re-evaluate FPS on 4K viewports; if degraded, drop filler count back to 200

## Verification

**Phase 1:**
- `pnpm build` clean
- `pnpm dev` at 1440×900: H1 renders on 3 clean lines, no wrapping mid-phrase. Copy and orb visually coupled.
- `pnpm dev` at 2560×1080: section caps at 1600px, copy and orb stay near each other, no dead zone
- `grep 'style={{' components/sections/hero.tsx` → empty
- `grep '#[0-9A-Fa-f]\{3,\}' components/sections/hero.tsx` → empty
- Blockquote visually outweighs body lead (size + color contrast obvious)

**Phase 2:**
- `pnpm dev`: orb cloud is visibly denser, glyphs read as ASCII characters at viewport scale, service nodes still glow distinctly, hover HUD still triggers, no console errors
- `pnpm build` clean
- 60fps on a 1440×900 laptop

## Out of scope

- `<Section>` primitive horizontal-padding update (separate cleanup task — the primitive is stale relative to Session 2 nav refactor)
- Mobile breakpoint pass for the hero (deferred to mobile-pass session)
- Three.js orb structural rewrite — only the filler material changes
- Trust bar, problem section, or any subsequent section

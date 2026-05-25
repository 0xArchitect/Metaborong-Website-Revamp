# Parallel Tail — Per-Terminal Briefs (2026-05-24)

Phase 2 of the homepage revamp (`design-revamp`). The sequential spine (Hero → Trust →
Problem → Services → Work → Why-Us) is shipped. These four sections fan out across
**separate terminals** the user runs. **FAQ stays as-is. Testimonials is handled last,
separately — do not touch it.**

Each brief below is a self-contained opening prompt for a fresh Claude Code terminal.
Copy one brief per terminal.

Target: **implement what `docs/design_handoff_homepage_revamp/Homepage.html` specifies**,
with minor tweaks via `/impeccable layout` + `/impeccable polish`, executed through
`/frontend-design:frontend-design`.

---

## Shared rules (apply to EVERY terminal — restate these in each)

- **Branch:** work in a worktree/branch off the latest `design-revamp`. Rebase onto
  `origin` before merge-back. **Never force-push. Never push unless the user explicitly
  asks.** Commit locally in logical units. Co-author trailer on every commit:
  `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- **File ownership:** you own only your section's component file(s) (listed in the brief).
- **Serialized shared files — one writer at a time:** `app/globals.css`, `app/page.tsx`,
  `DESIGN.md`, `CHANGELOG.md`. All four sections are **already mounted** in `app/page.tsx`,
  so you should need **no** `page.tsx` change. All required tokens already exist, so you
  should need **no** `globals.css` change (if you think you do, coordinate first). The only
  expected shared-file writes are appending your graduation entry to `CHANGELOG.md` (and a
  `DESIGN.md` row only if you changed grammar) — append one section at a time.
- **Verify with `npx tsc --noEmit`, NOT `npm run build`** (rss.xml fails on the PR #26 env
  hold). Lint with `npm run lint`.
- **Never `rm -rf .next` while a dev server runs** (corrupts served CSS silently).
- **Dev server:** `:3000` is someone else's terminal — don't kill it. Start your own on a
  free port, OR verify with a Playwright one-off: set cookie `mb_consent=accepted`, use
  `waitUntil:'domcontentloaded'` + `waitForSelector(...)` (NOT `networkidle` — the Clutch
  widget never lets it settle).
- **Cross-cutting musts:** all values via tokens (no raw hex/px except sanctioned status
  colors); `prefers-reduced-motion` short-circuits non-essential motion; tap targets
  **≥44px**; keyboard-reachable + focus-visible rings; crawlable SSR content; responsive
  desktop + mobile.
- **Token mapping** (handoff CSS var → this project): handoff `--color-cat-studio` →
  **`--color-accent`** (#C2410C, the burnt-orange studio color; there is no `cat-studio`
  token here). `--color-cat-ai` → `--color-ai`. Brand `--color-brand` is unchanged.
- **Process (A2 flow):** `/brainstorming` (keep/borrow disposition) → `/frontend-design`
  build → `/impeccable layout` then `/impeccable polish` → agent-browser/Playwright
  self-check (desktop + <lg) → `/impeccable critique` → `tsc` + lint → `/design-review` →
  graduate (CHANGELOG entry; DESIGN.md only if grammar changed). **Read `DESIGN.md` before
  any visual decision** and flag/log deviations per its override rule.
- **Em-dash rule:** DESIGN.md allows em-dashes in *visible* copy; only strip them from
  screen-reader-announced attribute text (alt/aria). Don't over-correct visible prose.

---

## Brief A — Founders / Team

**Own:** `components/sections/founders.tsx`. **Handoff:** Homepage.html `#founders`
("08 Team"), markup ~L3062–3134, CSS `.team-*` ~L1829–1910.

**Goal:** Bring the founders grid to the handoff's **team-card hairline-seam grid**.

**Keep (do NOT regress):**
- The **real founder data, portraits, and both LinkedIn + X links** already in
  `founders.tsx` (Arnab/Anik/Soumojit; `/founders/*.svg`). The handoff ships blank
  fallback SVGs — ignore those; keep the real content. Copy is A3-locked (synced from
  `docs/superpowers/specs/2026-05-19-founders-copy-audit.md`) — do not edit copy here.
- The monogram-initial fallback for any null image.

**Borrow from handoff:**
- 3-col grid (`md:grid-cols-3`) as a **1px hairline-seam grid**: `gap-[1px]` on a
  `bg-border` field with a `border border-border` frame; each card `bg-bg`, `bg-bg-raised`
  on hover. (Same grammar Work-Preview already adopted — match it for consistency.)
- Card: 96px **square** photo well (`bg-bg-subtle`, `border border-border`, image
  `object-cover`); `h3` 22px/700; **mono role eyebrow in brand color** (`text-brand`,
  11px, `tracking-[.14em]`, uppercase); bio `text-gray` 15px, flex-1; social row
  top-bordered (`border-t border-border-subtle`, `margin-top:auto`).

**Conflict to honor:** handoff social buttons are 32px — **keep them ≥44px** (tap-target
rule wins). The current 44px brand-filled square buttons are fine; you may restyle to the
handoff's outlined look but keep the **hit area ≥44px**. LinkedIn + X reuse the same brand
mark (no X-black — DESIGN.md brand discipline).

---

## Brief B — Comparison

**Own:** `components/sections/comparison.tsx`, `components/sections/comparison-rows.tsx`.
**Handoff:** Homepage.html `#comparison` ("09 Comparison"), markup ~L3136–3211, CSS
`.cmp-*` ~L1911–1988.

**Goal:** Implement the handoff comparison **table** (4 cols: Dimension / Metaborong /
Large Agency / Freelance Team) with the `[00]`–`[03]` mono dimension numbers, the
Metaborong column highlighted, `<b>` brand emphasis on Metaborong cells, the `✓`
structural-advantage marker, and the footnote.

**Keep:** the existing real comparison rows/data if richer than the handoff's; otherwise
use the handoff's 7 rows (Team access, AI-native operations, Engineering standards,
Delivery timeline, Documentation & handover, Process & PM, Track record) and footnote
verbatim. Section eyebrow "Comparison" + H2 "Metaborong vs. large Web3/AI agencies and
freelancers" + lede.

**BANNED-grammar conflict (must resolve):** the handoff styles the Metaborong column with
`td.is-us { border-left: 2px solid var(--color-brand) }` — that is a **side-stripe border,
which DESIGN.md and impeccable explicitly ban.** Do NOT reproduce the left stripe. Carry
the column emphasis with: solid-brand header cell (`th.is-us` = `bg-brand text-white`), the
faint brand column tint (`bg-brand/[0.04]`), and bold brand `<b>` — no colored side stripe.
If you feel a stronger column delineation is needed, use a full `border` on the header cell
or an inset box-shadow, not a left border. Log the deviation-from-handoff in your CHANGELOG
note (it's a deviation *toward* the system, so no DESIGN.md override needed).

**Mobile:** `overflow-x:auto` wrap with `min-width` (handoff uses 720px) so the table
scrolls horizontally on small screens; keep `<th scope>` semantics and the `✓` mark
accessible (it's decorative reinforcement — the footnote explains it; ensure SR users get
the meaning, e.g. `aria-hidden` on the glyph + the footnote carries the text). `cmp-check`
✓ color = **`text-accent`** (burnt-orange), per the token mapping.

---

## Brief C — Contact-CTA (dark)

**Own:** `components/sections/contact-cta.tsx`. **Handoff:** Homepage.html `#contact`
("11 Contact"), markup ~L3294–3324, CSS `.contact-*` ~L2049–2142.

**Goal:** Replace the current contact treatment with the handoff's **dark card**. This is
the locked decision (supersedes the 2026-05-20 painterly-light lock — already logged in
DESIGN.md; just implement).

**Build:**
- Card: `bg-canvas` (#0a0a0a token) + `text-off-white`, `overflow-hidden`, `isolation`.
- Background image `public/contact/landscape.webp` at `opacity-[.35]` +
  `grayscale-[80%] contrast-[1.1]`, `aria-hidden`, `z-0`.
- Two stacked **background** gradient overlays (`z-1`) exactly per the handoff
  (90deg dark→transparent left-weighted + 180deg top/bottom vignette). These are background
  gradients (allowed) — **not** `background-clip:text` gradient text (banned).
- Inner grid `z-2`: `lg:grid-cols-[1.3fr_1fr]`, `items-end`, padding `96px 72px` at lg.
- Left: square brand eyebrow ("Got a project in mind?", brand, with the 8px brand
  `::before` square), **H2** "Tell us what you are building." at **T1**
  (`clamp(36px,5vw,64px)`, weight 800, `leading-[1.0]`, `tracking-[-.04em]`,
  `max-w-[18ch]`, white), body 17px `text-white/85` `max-w-[56ch]`.
- Right (actions): primary button `mailto:contact@metaborong.com?subject=...` ("Start a
  conversation" + arrow), then `contact-meta` mono list (Reply within **12h** / No pitch
  deck. No commitment. / **contact@metaborong.com**).

**Honor:** primary button = the project's `Button` primitive (don't hand-roll). Ensure the
button + links have visible focus rings against the dark card. Tap targets ≥44px. Keep the
section crawlable (real `<a mailto>`).

---

## Brief D — Footer

**Own:** `components/layout/footer.tsx`. **Handoff:** Homepage.html `<footer>` ("12
Footer"), markup ~L3326–3398, CSS `.footer-*` ~L2143–2230.

**Goal:** Adopt the handoff's 4-column footer.

**Build:**
- `footer-top`: `md:grid-cols-[1.4fr_1fr_1fr_1.2fr]`, `border-b border-border`.
  1. **Brand:** the M-mark logo + wordmark + blurb ("Metaborong builds and ships Web3
     protocols, AI agents, and SaaS products — a small, senior, founder-led team.").
  2. **Company:** Work / About (`#founders`) / Blog (`/blog`) / FAQ / Contact.
  3. **Services:** Web3 / Blockchain · AI Agents · Product Studio (all → `#services`).
  4. **Offices:** India / UAE / USA with the mono brand tags + addresses (verbatim from
     handoff markup — real addresses).
- `footer-bottom`: `© 2026 Metaborong Technologies` · `contact@metaborong.com` · social
  (LinkedIn `company/metaborong-technologies`, X `x.com/Metaborong`) as 32px→**≥44px
  hit-area** square buttons. Mono 11px, uppercase, `text-gray-light`.
- Col headings = mono 11px brand-gray uppercase; links `text-dark` → `hover:text-brand`.

**Keep:** if the current footer already has real/legal links or a newsletter the handoff
omits, preserve them (don't drop existing real content to match a simplified mock). Keep it
a **server component** if it currently is (no `'use client'` unless something needs it).
Reuse the existing logo SVG/component rather than pasting raw path markup.

---

## Suggested order / independence

All four are file-disjoint and independently shippable. No ordering constraint. Each
terminal: branch → brainstorm → build → verify live → critique → graduate → leave committed
on its branch for merge-back (rebased onto `origin`, no push unless asked).

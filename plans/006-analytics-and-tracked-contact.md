# Plan 006: Add conversion measurement — Vercel Web Analytics + tracked contact CTA

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1259c18..HEAD -- app/layout.tsx components/sections/contact-cta.tsx components/ui/button.tsx package.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S–M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `1259c18`, 2026-06-12

## Why this matters

PRODUCT.md defines success as "a qualified founder reads two or three sections,
believes the team is real, and books a call." Today the site has **no analytics
of any kind** and the only conversion action is a bare
`mailto:contact@metaborong.com` link — there is no way to answer "is the site
doing its job," "which pages drive contact clicks," or "did the revamp move
anything." This plan adds the minimum credible measurement: Vercel Web
Analytics (cookieless — no consent-banner implications) for page views, plus a
custom `contact_click` event on the primary CTA so the one conversion signal
that exists becomes countable.

## Current state

- `app/layout.tsx` — root layout; imports `./globals.css`,
  `ConsentBanner`/`ConsentRevokePill` from `@/components/consent/consent-banner`,
  `SmoothScroll` from `@/components/providers/smooth-scroll`; body renders
  `<SmoothScroll>{children}</SmoothScroll>` (~line 41) plus the consent
  components. **No analytics component.**
- `package.json` — no analytics dependency. `@vercel/blob` is already a dep, so
  the Vercel SDK family is established. Package manager: pnpm.
- `components/sections/contact-cta.tsx` — a **server component** (no
  `'use client'`). Primary CTA at ~line 43:
  `<Button variant="primary" size="md" href="mailto:contact@metaborong.com?subject=New%20project%20inquiry" arrow="→" className="min-h-[44px]">Start a conversation</Button>`.
- `components/ui/button.tsx` — `Button` renders a plain `<a href>` when `href`
  is set (line 95-97). It does NOT currently accept an `onClick` prop. Do not
  add one (see Scope) — wrap instead.
- `mailto:contact@metaborong.com` also appears in `components/sections/faq.tsx`,
  `components/layout/footer.tsx`, `components/services/services-overview.tsx`,
  `components/services/pillar-hub.tsx`, `components/services/leaf-service.tsx`,
  `app/services/[pillar]/[slug]/page.tsx` — instrumenting all of them is a
  follow-up, not this plan; the wrapper you build must make that adoption a
  one-line change.
- The site has a consent banner gating only the `mb_geo` cookie. Vercel Web
  Analytics is cookieless and stores no identifiers in the browser, so it is
  NOT gated by that consent flow. State this in a code comment at the
  `<Analytics />` site so a future privacy pass doesn't have to re-derive it.
- Context7 rule: before using `@vercel/analytics` APIs, fetch current docs:
  `npx ctx7@latest library "Vercel Analytics" "track custom events Next.js App Router"`
  then `npx ctx7@latest docs <id> "<same question>"`.

## Commands you will need

| Purpose   | Command                            | Expected on success |
|-----------|-------------------------------------|---------------------|
| Install   | `pnpm add @vercel/analytics`        | exit 0              |
| Typecheck | `pnpm typecheck`                    | exit 0              |
| Tests     | `pnpm test`                         | all pass            |
| Build     | `pnpm build`                        | exit 0              |
| Dev smoke | `pnpm dev` + browser                | `/_vercel/insights/script.js` requested (404 locally is normal — the request being made is the success signal) |

## Scope

**In scope**:
- `package.json` / `pnpm-lock.yaml` (add `@vercel/analytics`)
- `app/layout.tsx` (mount `<Analytics />`)
- `components/ui/track-click.tsx` (create — generic client wrapper)
- `components/sections/contact-cta.tsx` (wrap the primary Button only)

**Out of scope** (do NOT touch):
- `components/ui/button.tsx` — keep the primitive analytics-free.
- The other six mailto sites (footer, faq, services) — list them in your report
  as ready-to-adopt follow-ups.
- Any consent-banner change; any Speed Insights / GA / additional vendors.
- Replacing the mailto with a contact form — explicitly deferred (owner's
  email-first model is intentional until decided otherwise).

## Git workflow

- Branch: `advisor/006-analytics` from `design-revamp`.
- One commit: `feat(analytics): Vercel Web Analytics + tracked contact CTA`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Install and mount

`pnpm add @vercel/analytics`. In `app/layout.tsx`, import
`{ Analytics } from '@vercel/analytics/next'` (confirm exact subpath against
the Context7 docs — it changed across majors) and render `<Analytics />` as the
last child of `<body>`, with a one-line comment noting it is cookieless and
therefore outside the mb_consent gate.

**Verify**: `pnpm typecheck` → exit 0; `pnpm build` → exit 0.

### Step 2: Generic TrackClick wrapper

Create `components/ui/track-click.tsx`:

```tsx
'use client'

import { track } from '@vercel/analytics'

// Wraps any server-rendered child with a click-tracking boundary.
// display:contents keeps it out of layout entirely.
export function TrackClick({
  event,
  data,
  children,
}: {
  event: string
  data?: Record<string, string>
  children: React.ReactNode
}) {
  return (
    <span style={{ display: 'contents' }} onClick={() => track(event, data)}>
      {children}
    </span>
  )
}
```

(Adjust the `track` import path per the fetched docs if needed.)

**Verify**: `pnpm typecheck` → exit 0.

### Step 3: Wrap the primary CTA

In `components/sections/contact-cta.tsx`, wrap ONLY the primary Button:

```tsx
<TrackClick event="contact_click" data={{ source: 'contact-cta' }}>
  <Button … >Start a conversation</Button>
</TrackClick>
```

The section stays a server component (client children-as-props is fine).

**Verify**: `pnpm dev`, click the CTA on http://localhost:3000 — no console
error, the mailto still opens, and (if devtools network is checkable) a
queued analytics call appears. Then `pnpm build` → exit 0.

### Step 4: Full gauntlet

**Verify**: `pnpm typecheck && pnpm test && pnpm build` → all exit 0.

## Test plan

No unit tests for the vendor component. One optional test if cheap: a
happy-dom component test asserting `TrackClick` renders its children and calls
a mocked `track` on click (mock `@vercel/analytics` with `vi.mock`), modeled on
any `components/admin/*.test.tsx` for the happy-dom directive pattern.

## Done criteria

- [ ] `@vercel/analytics` in dependencies; `<Analytics />` mounted in layout
- [ ] `components/ui/track-click.tsx` exists; primary contact CTA wrapped
- [ ] CTA still opens the mailto (manual check noted in report)
- [ ] `pnpm typecheck && pnpm test && pnpm build` all exit 0
- [ ] Only in-scope files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The Context7 docs show `<Analytics />` for App Router requires different
  mounting than described (follow the docs, and note the delta).
- Wrapping the Button breaks layout (the arrow/min-height styling) — do not
  restyle; report.
- You are tempted to add tracking to footer/faq/services CTAs — out of scope.

## Maintenance notes

- **Operator follow-up (required for data to appear):** enable Web Analytics on
  the Vercel project (Project → Analytics → Enable). Until then the script
  404s harmlessly.
- Adoption path for the other six mailto sites: wrap each in
  `<TrackClick event="contact_click" data={{ source: '<section>' }}>` — one
  line each, no further infra.
- If the owner later wants a real contact form (deferred direction finding),
  the `contact_click` baseline collected now is the before/after measure for
  that change.

# Plan 001: Upgrade Next.js to 16.2.5 to clear 7 HIGH CVEs

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1259c18..HEAD -- package.json pnpm-lock.yaml`
> If these files changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security / migration
- **Planned at**: commit `1259c18`, 2026-06-12

## Why this matters

`pnpm audit --prod` reports 14 vulnerabilities in `next@16.2.4` — **7 HIGH**
(DoS via Server Components, middleware/proxy bypass, cache poisoning, SSRF via
WebSocket, dynamic route injection), 5 moderate, 2 low. Every one lists the
patched range as `>=16.2.5`. This site is deployed to production at
www.metaborong.com on Vercel, so the routing/middleware-layer issues are live
exposure. A patch-version bump clears all of them.

## Current state

- `package.json` — `"next": "16.2.4"` (exact pin, no caret) and
  `"eslint-config-next": "16.2.4"` in devDependencies. There is no
  `packageManager` field. Package manager is **pnpm** (v10.x, `pnpm-lock.yaml`
  present). Note: `package-lock.json` appears in `.gitignore` — never commit one.
- The repo uses `proxy.ts` at the root (Next 16's rename of `middleware.ts`) —
  the middleware-bypass CVE is relevant to it.
- Verification baseline at planning time: `pnpm typecheck` clean, `pnpm test`
  697 tests green, `pnpm build` succeeds, `pnpm lint` has 48 known problems
  (~35 deferred `set-state-in-effect` errors — NOT yours to fix).

## Commands you will need

| Purpose   | Command          | Expected on success                          |
|-----------|------------------|----------------------------------------------|
| Install   | `pnpm install`   | exit 0, lockfile updated                     |
| Audit     | `pnpm audit --prod` | no `next` advisories remaining            |
| Typecheck | `pnpm typecheck` | exit 0                                       |
| Tests     | `pnpm test`      | 697 tests pass (count may have grown — all pass) |
| Build     | `pnpm build`     | exit 0, "Compiled successfully"              |

## Scope

**In scope** (the only files you should modify):
- `package.json` (the two version strings only)
- `pnpm-lock.yaml` (via `pnpm install`, never by hand)

**Out of scope** (do NOT touch):
- Any application code. If the upgrade requires code changes, that is a STOP
  condition, not an invitation to refactor.
- Other dependency bumps "while you're in there".

## Git workflow

- Branch: create `advisor/001-next-16-2-5` from `design-revamp`.
- One commit, message style matches repo (conventional):
  `chore(deps): upgrade next to 16.2.5 — clears 7 high CVEs`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Bump versions

In `package.json`, change `"next": "16.2.4"` → `"next": "16.2.5"` and
`"eslint-config-next": "16.2.4"` → `"eslint-config-next": "16.2.5"`.
Run `pnpm install`.

**Verify**: `pnpm ls next` → shows `next 16.2.5`.

### Step 2: Confirm advisories cleared

**Verify**: `pnpm audit --prod 2>&1 | grep -c "next@16"` → `0` (no remaining
next advisories; other packages' advisories, if any appear, are out of scope —
report them, don't fix them).

### Step 3: Run the full verification gauntlet

**Verify**, in order:
1. `pnpm typecheck` → exit 0
2. `pnpm test` → all tests pass
3. `pnpm build` → exit 0

If `eslint-config-next@16.2.5` does not exist on the registry (lockstep
releases occasionally lag), leave it at `16.2.4` and note that in your report —
the security fix is in `next` itself.

## Test plan

No new tests — this is a patch upgrade. The existing 697-test suite plus a
production build is the regression net.

## Done criteria

- [ ] `pnpm ls next` shows 16.2.5
- [ ] `pnpm audit --prod` shows zero `next` advisories
- [ ] `pnpm typecheck` exits 0
- [ ] `pnpm test` exits 0
- [ ] `pnpm build` exits 0
- [ ] Only `package.json` + `pnpm-lock.yaml` modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `pnpm build` or `pnpm test` fails after the bump — a patch release should be
  drop-in; a failure means a behavioral change that needs human review.
- The upgrade pulls a new React version or any peer-dependency conflict appears.
- `next@16.2.5` is not the latest patch anymore — install the latest `16.2.x`
  instead and say so; do NOT jump to `16.3.x`/`17.x`.

## Maintenance notes

- The Vercel production deploy happens via PR to `main` (CTO-gated). This bump
  should ride the next release PR.
- Plan 002 (CI) will make `pnpm audit --prod` visible on every PR going
  forward; until then, re-run it manually on a monthly cadence.

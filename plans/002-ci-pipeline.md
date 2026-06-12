# Plan 002: Add a CI pipeline that gates PRs on typecheck + tests + build (and fix the stale doc commands)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1259c18..HEAD -- package.json CLAUDE.md docs/cms/mcp-guide.md`
> If these files changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/001-next-16-2-5-security-upgrade.md (CI should go green on first run; land the security bump first)
- **Category**: dx
- **Planned at**: commit `1259c18`, 2026-06-12

## Why this matters

The repo just moved to a GitHub org (`0xArchitect/Metaborong-Website-Revamp`)
with a PR-gated flow: PRs into `main`, a CTO merges, Vercel auto-deploys `main`
to production (www.metaborong.com). There is **no `.github/` directory** — no
machine check runs before merge, so a broken typecheck, failing test, or
failing build can ship straight to production. The repo already has fast,
deterministic verification commands; this plan wires them to PRs. It also fixes
two doc staleness issues found in the same audit: `CLAUDE.md` documents
commands as `npm run …` though the repo is pnpm-only, and `docs/cms/mcp-guide.md`
references handoff/report files deleted on 2026-06-11.

## Current state

- No `.github/` directory exists.
- `package.json` scripts: `dev`, `build`, `start`, `lint` (`eslint .`),
  `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `test:watch`,
  `test:coverage`, `test:e2e` (`playwright test`). **No `packageManager`
  field** — CI must pin pnpm explicitly. Local pnpm is **10.5.2**; Node should
  be 24 (Vercel's current default runtime).
- `pnpm test` uses **mongodb-memory-server**: one instance per Vitest worker;
  first run downloads a ~70 MB Mongo binary into the OS cache
  (`~/.cache/mongodb-binaries` on Linux). CI must cache this directory or every
  run pays the download.
- `pnpm build` prerenders the blog index (`app/blog/page.tsx`, `revalidate = 60`),
  which calls Mongo through `db/client.ts` → **the build needs a reachable
  `MONGODB_URI`**. Locally this comes from `.env.local`. In CI, provide a
  `mongo` service container (an empty DB is fine — pages render their empty
  states). Also provide a dummy `AUTH_SECRET` of ≥32 chars; it is read lazily
  by `lib/auth.ts` and must not throw if any admin path is touched during
  build. These CI values are throwaway dummies, NOT secrets.
- `pnpm lint` currently exits non-zero: 48 problems, ~35 of them a known,
  owner-deferred `set-state-in-effect` cluster in `components/admin/**`. Lint
  therefore CANNOT be a blocking gate yet — run it as a **non-blocking** job
  (`continue-on-error: true`) so the signal is visible without failing PRs.
- Playwright e2e is CI-aware (`forbidOnly: !!process.env.CI`, retries, webServer
  `pnpm dev`) but needs `E2E_ADMIN_EMAIL`/`E2E_ADMIN_PASSWORD` secrets — **out
  of scope** for this plan (see Maintenance notes).
- `CLAUDE.md` "Commands" section says `npm run dev`, `npm run build && PORT=3001
  npm run start`, `npm run lint`, `npm run typecheck`, `npm run test`,
  `npx vitest run …`, `npm run test:e2e`, `npm run test:coverage` — all should
  be pnpm (`pnpm dev`, `pnpm vitest run …`, etc.). Note the same section
  correctly says e2e "auto-starts `pnpm dev`" — that inconsistency is the tell.
- `docs/cms/mcp-guide.md` lines 10–11 and 466–467 reference
  `docs/cms/handoffs/mcp-be-2026-05-15.md` and
  `docs/cms/reports/mcp-2026-05-15.md`, both deleted from the tree on
  2026-06-11 (recoverable from git history).

## Commands you will need

| Purpose   | Command          | Expected on success      |
|-----------|------------------|--------------------------|
| Typecheck | `pnpm typecheck` | exit 0                   |
| Tests     | `pnpm test`      | all pass                 |
| Build     | `pnpm build`     | exit 0                   |
| YAML sanity | `node -e "require('js-yaml')"` is NOT available — validate the workflow by pushing to a branch or with `gh workflow view` after first run; locally just re-read it carefully | — |

## Scope

**In scope** (the only files you should modify/create):
- `.github/workflows/ci.yml` (create)
- `package.json` (add `"packageManager": "pnpm@10.5.2"` only)
- `CLAUDE.md` (Commands section: npm→pnpm wording only)
- `docs/cms/mcp-guide.md` (the four stale-reference lines only)

**Out of scope** (do NOT touch):
- Fixing lint errors (owner-deferred; Plan backlog).
- Playwright e2e in CI (needs secrets the executor can't provision).
- Vercel configuration, branch-protection settings (operator does those in the
  GitHub/Vercel UI — see Maintenance notes).
- Any application code.

## Git workflow

- Branch: create `advisor/002-ci-pipeline` from `design-revamp`.
- Commits: one for the workflow + packageManager, one for the doc fixes.
  Message style: `ci: add typecheck/test/build gate on PRs` and
  `docs: pnpm-ify CLAUDE.md commands; drop pruned mcp-guide references`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Pin the package manager

Add to `package.json` top level (after `"private": true`):
`"packageManager": "pnpm@10.5.2"`.

**Verify**: `pnpm install` → exit 0 (no warnings about packageManager mismatch).

### Step 2: Create `.github/workflows/ci.yml`

Target shape (adjust only if a step fails for a documented reason):

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main, design-revamp]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    services:
      mongo:
        image: mongo:7
        ports: ['27017:27017']
    env:
      MONGODB_URI: mongodb://localhost:27017/mb-ci
      AUTH_SECRET: ci-dummy-secret-0123456789abcdef0123456789abcdef
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4        # reads packageManager from package.json
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - uses: actions/cache@v4
        with:
          path: ~/.cache/mongodb-binaries
          key: mongodb-binaries-${{ runner.os }}
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build

  lint:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    continue-on-error: true   # 35 known deferred errors — signal, not gate
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
```

**Verify**: file exists; `git diff --stat` shows only the in-scope files.

### Step 3: Fix CLAUDE.md commands

In the `## Commands` section of `CLAUDE.md`, replace every `npm run X` with
`pnpm X` and `npx vitest` with `pnpm vitest`. Do not change any other section.

**Verify**: `grep -n "npm run" CLAUDE.md` → no matches.

### Step 4: Fix mcp-guide stale references

In `docs/cms/mcp-guide.md`, lines ~10–11: replace the sentence pointing at the
handoff/report paths with: "The original build handoff and tester report were
pruned from the tree on 2026-06-11; recover `docs/cms/handoffs/mcp-be-2026-05-15.md`
and `docs/cms/reports/mcp-2026-05-15.md` from git history if needed."
Lines ~466–467 (a reference list at the bottom): apply the same treatment or
delete the two bullets.

**Verify**: `grep -rn "docs/cms/handoffs\|docs/cms/reports" docs/ CLAUDE.md` →
only matches inside the new "recover from git history" sentences (or none).

### Step 5: Local dry-run of what CI will run

Run the three gates exactly as CI will:

**Verify**: `pnpm typecheck && pnpm test && pnpm build` → all exit 0.

## Test plan

No new unit tests. The workflow itself is verified on its first run: after the
operator pushes the branch, `gh run list --workflow=ci.yml --limit 1` should
show a green run. (You cannot do this step yourself — note it in your report.)

## Done criteria

- [ ] `.github/workflows/ci.yml` exists matching the shape above
- [ ] `package.json` has `"packageManager": "pnpm@10.5.2"`
- [ ] `grep -n "npm run" CLAUDE.md` → no matches
- [ ] No stale handoff/report references outside "git history" sentences
- [ ] `pnpm typecheck && pnpm test && pnpm build` all exit 0 locally
- [ ] Only in-scope files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `pnpm build` fails locally even with `MONGODB_URI` set — the CI design
  assumption (build needs only a reachable empty Mongo) is then wrong.
- You are tempted to make `lint` blocking or to fix lint errors — both are
  explicitly out of scope.
- `pnpm install --frozen-lockfile` fails after adding `packageManager` —
  version mismatch between the pin and the lockfile needs human eyes.

## Maintenance notes

- **Operator follow-ups (not the executor's):** (1) enable branch protection on
  `main` requiring the `verify` job; (2) once the 35 lint errors are fixed
  (deferred backlog), flip the `lint` job to blocking by removing
  `continue-on-error`; (3) e2e in CI needs `E2E_ADMIN_EMAIL`/`E2E_ADMIN_PASSWORD`
  repo secrets plus a seeded admin — a future plan.
- The mongo service container means CI tests run against mongodb-memory-server
  (unchanged) while the **build** uses the service container. Don't "simplify"
  by pointing tests at the service container — the test seam is the mocked
  `@/db/client` proxy, by design.

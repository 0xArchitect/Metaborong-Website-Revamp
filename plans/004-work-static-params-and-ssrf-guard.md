# Plan 004: Make /work/[slug] statically generated + add an SSRF guard to the MCP image fetch

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1259c18..HEAD -- "app/work/[slug]/page.tsx" lib/mcp/tools.ts lib/work.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (if Plan 003 landed first, its work-metadata test must still pass)
- **Category**: perf + security
- **Planned at**: commit `1259c18`, 2026-06-12

## Why this matters

Two small, unrelated-but-verified fixes bundled for efficiency:

1. **`/work/[slug]` is rendered on-demand.** The page reads markdown from
   `content/work/<slug>.md` with `fs` and parses it on every request — it has
   no `generateStaticParams`, so on Vercel each case-study hit is a serverless
   invocation. These are 4 fully static proof pages (the highest-credibility
   pages on the site); they should be prerendered at build like the service
   leaves already are.
2. **`fetchImageBytes` in the MCP server fetches arbitrary URLs.** The
   `cms_upload_image` tool accepts a `source.url` and fetches it with no
   protocol or private-address restriction. It is bearer-gated
   (`MCP_ADMIN_TOKEN`), so exploitation requires a leaked token — but with one,
   it becomes an internal-network reconnaissance/exfiltration vector (SSRF).
   Defense-in-depth is cheap here.

## Current state

- `app/work/[slug]/page.tsx` — imports `fs`, `path`; exports `generateMetadata`
  and the default page; **no `generateStaticParams`, no `revalidate`**. Slugs
  resolve via `caseStudyMeta[slug]`; unknown slug → `notFound()`.
- `lib/work.ts:27` — `export const caseStudyMeta: Record<string, CaseStudyMeta>`
  (keys: sunset, magic, orbitx, sedax); `lib/work.ts:106` —
  `export const workSlugs = Object.keys(caseStudyMeta)`.
- `lib/mcp/tools.ts:330-388` — `fetchImageBytes(url)`: handles `data:` URLs
  inline (validated, 8 MB cap), then for everything else does
  `await fetch(url, { signal })` with a 10s timeout, checks `res.ok`,
  content-type starts with `image/`, and the 8 MB cap. **No check that the
  protocol is http(s); no check against private/loopback/link-local hosts.**
  The URL has already passed Zod's `.url()` upstream (format-only).
  Errors are thrown as `ToolError(APP_*, code, message, 'source.url')` — match
  that pattern. The existing validation error uses
  `ToolError(APP_VALIDATION_FAILED, 'VALIDATION_FAILED', '<msg>', 'source.url')`.
- Existing MCP tests: `lib/mcp/tools.test.ts` (and `tools.race.test.ts`) —
  follow their structure for new cases.
- Sitemap note: `app/sitemap.ts` already lists the 4 `/work/<slug>` URLs and
  `app/sitemap.test.ts` asserts them — adding `generateStaticParams` does not
  change the sitemap.

## Commands you will need

| Purpose     | Command                              | Expected on success                   |
|-------------|--------------------------------------|----------------------------------------|
| MCP tests   | `pnpm vitest run lib/mcp`            | all pass                               |
| Full suite  | `pnpm test`                          | all pass                               |
| Typecheck   | `pnpm typecheck`                     | exit 0                                 |
| Build       | `pnpm build`                         | exit 0; `/work/[slug]` listed as prerendered (SSG ●) with 4 paths |

## Scope

**In scope**:
- `app/work/[slug]/page.tsx` (add `generateStaticParams` only)
- `lib/mcp/tools.ts` (the URL-guard addition in/before `fetchImageBytes` only)
- `lib/mcp/tools.test.ts` (new test cases)

**Out of scope** (do NOT touch):
- `parseMarkdown` or any rendering logic in the work page — a refactor of the
  markdown layer was considered and rejected; don't start it.
- `lib/images.ts`, `app/api/admin/images/route.ts` — the admin upload path
  takes multipart bytes, not URLs; no SSRF surface there.
- DNS-rebinding protection (resolving the hostname and pinning the IP) —
  explicitly deferred; document in the code comment that the guard is
  best-effort against literal addresses and obvious names.

## Git workflow

- Branch: `advisor/004-work-ssg-and-ssrf-guard` from `design-revamp`.
- Two commits: `perf(work): prerender case studies via generateStaticParams`
  and `security(mcp): block non-http(s) and private-address URLs in image fetch`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: `generateStaticParams` for /work/[slug]

In `app/work/[slug]/page.tsx`, add (near `generateMetadata`):

```ts
export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }))
}
```

`workSlugs` is already importable from `@/lib/work` (the file already imports
`caseStudyMeta` from there — extend that import). Do NOT add
`dynamicParams = false`; unknown slugs already `notFound()` at request time.

**Verify**: `pnpm build` → exit 0 AND the route table shows `/work/[slug]` as
prerendered with `/work/sunset`, `/work/magic`, `/work/orbitx`, `/work/sedax`
(SSG/● marker), not server-rendered on demand (ƒ).

### Step 2: URL guard in `fetchImageBytes`

In `lib/mcp/tools.ts`, after the `data:` branch and before the `fetch`, add a
guard function (module-private, near `fetchImageBytes`):

```ts
function assertFetchableImageUrl(url: string): void {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new ToolError(APP_VALIDATION_FAILED, 'VALIDATION_FAILED', 'malformed URL', 'source.url')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new ToolError(APP_VALIDATION_FAILED, 'VALIDATION_FAILED', 'only http(s) URLs are fetchable', 'source.url')
  }
  const host = parsed.hostname.toLowerCase()
  // Best-effort SSRF guard: literal private/loopback/link-local addresses and
  // obvious internal names. DNS rebinding is out of scope (token-gated tool).
  const isPrivate =
    host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal') ||
    host === '0.0.0.0' || host === '::1' || host === '[::1]' ||
    /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
    /^\[?f[cd][0-9a-f]{2}:/.test(host) || /^\[?fe80:/.test(host)
  if (isPrivate) {
    throw new ToolError(APP_VALIDATION_FAILED, 'VALIDATION_FAILED', 'URL resolves to a private or local address', 'source.url')
  }
}
```

Call `assertFetchableImageUrl(url)` as the first statement of the non-data
path in `fetchImageBytes`. Use the exact `ToolError` constant names already
imported/defined in the file (check how `APP_VALIDATION_FAILED` is referenced
in the `data:` branch and mirror it).

**Verify**: `pnpm typecheck` → exit 0.

### Step 3: Tests for the guard

In `lib/mcp/tools.test.ts`, following the file's existing structure for
`cms_upload_image` cases, add cases asserting a VALIDATION_FAILED error (the
same error shape existing validation-failure tests assert) for:
`ftp://example.com/x.png`, `file:///etc/passwd`, `http://localhost/x.png`,
`http://127.0.0.1:8080/x.png`, `http://10.0.0.5/x.png`,
`http://192.168.1.1/x.png`, `http://169.254.169.254/latest/meta-data`,
`http://172.16.0.1/x.png`, `http://[::1]/x.png`, `http://internal.local/x.png`.
And one positive case: `https://example.com/x.png` proceeds past the guard
(it will fail at the network layer in tests — assert the error is NOT
VALIDATION_FAILED, or mock fetch the way neighboring tests do if they already
mock it; mirror the file's existing approach to network isolation).

**Verify**: `pnpm vitest run lib/mcp` → all pass.

### Step 4: Full gauntlet

**Verify**: `pnpm test` → all pass; `pnpm build` → exit 0.

## Test plan

Step 3 covers the SSRF guard (10 negative + 1 positive case). Step 1 is
verified by build output; if Plan 003's `app/work/[slug]/page.metadata.test.ts`
exists, run it too — `generateStaticParams` must not affect it.

## Done criteria

- [ ] Build route table shows 4 prerendered /work paths (●, not ƒ)
- [ ] `grep -n "generateStaticParams" "app/work/[slug]/page.tsx"` → 1 match
- [ ] New SSRF tests exist and pass; `pnpm vitest run lib/mcp` exits 0
- [ ] `pnpm test`, `pnpm typecheck`, `pnpm build` all exit 0
- [ ] Only in-scope files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The build does NOT mark /work/[slug] as prerendered after Step 1 — something
  on the page opts into dynamic rendering (a dynamic API like `cookies()`
  somewhere in its import graph) and that needs human review, not workarounds.
- Existing `cms_upload_image` tests fail after Step 2 — a legitimate test
  fixture may use a URL your guard now blocks; report which, don't weaken the
  guard.
- `ToolError` / `APP_VALIDATION_FAILED` symbols don't match the excerpt.

## Maintenance notes

- When a 5th case study is added to `caseStudyMeta`, `generateStaticParams`
  picks it up automatically — nothing to update.
- The SSRF guard is deliberately literal-address-only. If the MCP token ever
  moves to a less-trusted distribution (multiple users), upgrade to a
  resolve-and-pin approach (DNS rebinding protection) — leave this note in
  place until then.

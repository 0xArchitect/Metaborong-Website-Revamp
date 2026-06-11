# metaborong.com

Marketing site and headless CMS for [Metaborong](https://www.metaborong.com) — a Web3 +
AI development studio. Next.js 16 App Router, React 19, TypeScript, Tailwind v4, MongoDB.

Two surfaces in one app:

- **Public site** — homepage, `/services` (3 pillars, 32 leaf pages), `/work` case
  studies, `/blog`. AEO-first: JSON-LD everywhere, `raw.md` mirrors, `llms.txt`.
- **Admin CMS** — auth-gated `/admin` blog authoring (TipTap), JSON API under
  `/api/admin/**`, and an MCP server at `/api/mcp` for authoring from Claude.

## Development

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm lint           # eslint
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest (in-memory MongoDB, no external DB needed)
pnpm test:e2e       # playwright
```

Copy `.env.local.example` to `.env.local` and fill it in (escape every `$` as `\$`).

## Where things are documented

- `CLAUDE.md` — architecture, commands, gotchas. Start here.
- `DESIGN.md` — the design system; single source of truth for all UI decisions.
- `CHANGELOG.md` — dated decision log.
- `db/README.md` — CMS data-layer notes.

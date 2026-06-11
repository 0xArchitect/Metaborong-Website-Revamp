# Services — Context & Working Handoff

> **Purpose.** Single onboarding doc for planning/discussing **all services and
> sub-services** (Web3, AI, Product Studio) so they're easy to author, consistent,
> and SEO/AEO/GEO-optimised. Read this first. It captures what exists today, the
> locked conventions, and the open questions. As of 2026-06-02.

---

## 1. What this is

Metaborong's marketing site (Next.js 16 App Router, React 19, TS, Tailwind v4) has a
**service taxonomy** rendered as dynamic leaf pages. Each "leaf" is one service
(e.g. *Web3 Tokenomics Design*). Goal of the services workstream: showcase every
service **simply** (no over-bearing walls of content) while remaining **citable** by
Google, answer engines (AEO), and LLMs (GEO).

The first leaf taken end-to-end — **`web3-tokenomics-design`** — is the **reference
implementation**. The canonical template + spec were extracted from it (§4). It was
deliberately over-built first (~3,650 words), then trimmed to spec (~1,150). Don't
repeat the over-build; follow the spec.

---

## 2. Architecture — where everything lives

Data-driven. The template is presentation-only; content is typed data.

| Concern | File | Notes |
|---|---|---|
| **Taxonomy** (pillars → sub-groups → leaves, status) | `components/sections/services-data.ts` | Source of truth for what exists + `published` vs `coming-soon`. Also drives homepage services section + nav mega-menu. |
| **Per-leaf SEO** (keyword, title, meta description) | `lib/services/seo-map.ts` | One entry per published leaf. |
| **Content contract** (the type) | `lib/services/leaf-content.ts` | `LeafContent` interface + per-field word budgets + the **canonical block spec** (doc comment). |
| **Authored content** | `lib/services/content/{web3,ai}.ts`, `lib/services/content/product-studio/*` | One `LeafContent` object per published leaf, wired in `content/index.ts`. |
| **The template** (render) | `components/services/leaf-service.tsx` | Server component. Renders the 14-block leaf surface. Shared by EVERY leaf. |
| **Route + JSON-LD** | `app/services/[pillar]/[slug]/page.tsx` | `generateStaticParams` over all leaves; published+authored → full page + schema, else coming-soon noindex stub. `buildLeafJsonLd` emits all structured data. |
| **Pillar hub** | `components/services/pillar-hub.tsx`, route `app/services/[pillar]` | Lists a pillar's leaves. |

**Data flow:** taxonomy (`services-data.ts`) + SEO (`seo-map.ts`) + content
(`content/*`) → route resolves a leaf → `LeafServicePage` renders blocks +
`buildLeafJsonLd` emits schema. Adding a leaf = add to taxonomy, add SEO entry, author a
`LeafContent`, flip status to `published`.

---

## 3. Complete taxonomy (30 leaves: 16 published / 14 coming-soon)

All published leaves have authored content; all coming-soon are noindex stubs.

### Web3 (`#296ff0`) — *Smart contracts, DeFi, NFT, tokenomics, DID. Multichain.*
| Sub-group | Leaf | slug | Status |
|---|---|---|---|
| Strategy | Web3 Tokenomics Design | `web3-tokenomics-design` | **published** ← reference impl |
| Strategy | Protocol Architecture Review | `protocol-architecture-review` | coming-soon |
| Strategy | Web3 Product Discovery | `web3-product-discovery` | coming-soon |
| Product | NFT Marketplace Development | `nft-marketplace-development` | **published** |
| Product | Crypto Wallet Development | `crypto-wallet-development` | coming-soon |
| Product | DAO & Governance Systems | `dao-governance-systems` | coming-soon |
| Engineering | Smart Contract Development | `smart-contract-development` | **published** |
| Engineering | DeFi Protocol Development | `defi-protocol-development` | **published** |
| Engineering | Liquid Staking Vaults | `liquid-staking-vaults` | **published** |
| Engineering | Decentralized Identity & DID Integration | `decentralized-identity-did-integration` | **published** |
| Engineering | Token Launchpad & Distribution | `token-launchpad-distribution` | coming-soon |

### AI (`#0F766E`) — *Copilots, conversational agents, RAG, LLM integration.*
| Sub-group | Leaf | slug | Status |
|---|---|---|---|
| Strategy | AI Audit & Opportunity Assessment | `ai-audit-opportunity-assessment` | **published** |
| Strategy | AI Adoption Roadmap | `ai-adoption-roadmap` | coming-soon |
| Strategy | AI Education & Workshops | `ai-education-workshops` | coming-soon |
| Product | AI Copilots & Internal Tools | `ai-copilots-internal-tools` | **published** |
| Product | Conversational Agents & Assistants | `conversational-agents-assistants` | **published** |
| Product | AI-Augmented Customer Journeys | `ai-augmented-customer-journeys` | coming-soon |
| Engineering | Agentic AI Systems | `agentic-ai-systems` | **published** |
| Engineering | RAG & Retrieval Pipelines | `rag-retrieval-pipelines` | **published** |
| Engineering | LLM Integration & Architecture | `llm-integration-architecture` | **published** |
| Engineering | AI Evaluation & Monitoring | `ai-evaluation-monitoring` | coming-soon |

### Product Studio (`#C2410C`) — *MVP, SaaS, B2B multi-tenant for founders without a CTO.*
| Sub-group | Leaf | slug | Status |
|---|---|---|---|
| Strategy | Product Discovery & Validation | `product-discovery-validation` | **published** |
| Strategy | Technical Architecture Planning | `technical-architecture-planning` | coming-soon |
| Strategy | MVP Scoping & Roadmapping | `mvp-scoping-roadmapping` | coming-soon |
| Product | MVP Development | `mvp-development` | **published** |
| Product | SaaS Product Development | `saas-product-development` | **published** |
| Product | B2B Multi-Tenant Platforms | `b2b-multi-tenant-platforms` | **published** |
| Engineering | Frontend Engineering | `frontend-engineering` | coming-soon |
| Engineering | Backend & API Engineering | `backend-api-engineering` | coming-soon |
| Engineering | Design Systems & Component Libraries | `design-systems-component-libraries` | coming-soon |

Every pillar = 3 sub-groups (**Strategy / Product / Engineering**).

---

## 4. The canonical leaf content spec (LOCKED 2026-06-02)

Lives verbatim in `lib/services/leaf-content.ts`. **Template = "Standard + conditional
proof."** Target **~1,000–1,400 words**, **hard ceiling 1,500**. Depth is added across
the *cluster*, never stacked on one page.

Render order (the live order). Mandatory = every leaf; conditional = only when its
trigger field is authored:

| # | Block | Status | Rule | Schema |
|---|---|---|---|---|
| 1 | Breadcrumb | mandatory (derived) | — | BreadcrumbList |
| 2 | Hero — eyebrow · H1 · lede · CTA · trust chip | mandatory | lede **45–70 w**, problem-frame → entity definition; Clutch 4.9/9-reviews chip + CTA above fold | — |
| 3 | Hero stats row | **conditional** | real proof only, 3 stats | — |
| 4 | "What is X?" AEO answer | mandatory | **40–60 w**, self-contained | (Service desc) |
| 5 | What we deliver | mandatory | 4–5 items ≤14 w; `detail` only if additive | — |
| 6 | Key concepts glossary | **conditional** | concept-heavy leaves only; 4–5 terms × 40–55 w | DefinedTermSet |
| 7 | How we work (phases) | mandatory | 4 × 40–55 w, no artefact re-list | **HowTo** |
| 8 | Tech stack | mandatory | 6–10 items | — |
| 9 | When this fits / doesn't | mandatory | 3 + 3 bullets ~18 w | — |
| 10 | Related work | **conditional** | real engagements only | — |
| 11 | Related services | mandatory | 3 refs, **published only** (resolver drops coming-soon) | — |
| 12 | FAQ | mandatory | **4–5** × 50–80 w, mix definitional + objection | FAQPage |
| 13 | Last reviewed | conditional | keep current | dateModified + reviewedBy |
| 14 | Contact CTA | mandatory | reuses `contact-cta.tsx` | — |

**Per-leaf schema set:** Service + FAQPage + BreadcrumbList + HowTo always;
DefinedTermSet (concept-heavy only); dateModified/reviewedBy (when `lastReviewed`).

**Glossary scope decision:** concept-heavy leaves only (tokenomics, DeFi, liquid
staking, AI agents/RAG, etc.). Execution-only leaves (smart-contract dev, NFT
marketplace, frontend) skip it.

---

## 5. SEO / AEO / GEO infrastructure (already built)

- **Per-leaf JSON-LD** — `buildLeafJsonLd` in the route. Emitted for every published
  leaf (was zero before this workstream).
- **`app/robots.ts`** — `/services/` is crawlable; AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, OAI-SearchBot, Google-Extended, …) explicitly allowed. Coming-soon
  stubs self-noindex.
- **`app/llms.txt/route.ts`** — published leaves emit `name -> URL: description` so LLMs
  can deep-link. (`/llms-full.txt` + `/blog/<slug>/raw.md` also exist for blog.)
- **`app/sitemap.ts`** — published leaves included (priority 0.7).
- **Org-level** — `lib/schema.ts` AggregateRating (4.9 / 9 reviews) mirrored in the hero
  trust chip.

What "good" looks like (proven on tokenomics): head keyword verbatim in
title/H1/meta/lede/AEO; clean H1›H2›H3 outline; 40–60 w AEO passage promoted high;
self-contained FAQ + DefinedTerm passages; HowTo from phases; freshness via
`lastReviewed`; ≥2 related-service links to **published** leaves.

---

## 6. Current state & known gaps (the planning agenda)

- **Depth disparity.** Tokenomics got the full treatment (heroStats, keyConcepts,
  lastReviewed, 5 FAQs). The other 15 published leaves are thinner template fills
  (bare deliverables, 4 FAQs, no glossary/stats/lastReviewed). **HowTo schema + the
  hero trust chip now apply to ALL leaves** (template-level), but content depth is
  uneven.
- **Cluster authority > single-page polish.** Google/LLMs judge topical authority at
  the cluster/site level. One rich page among thin siblings caps its own ceiling. The
  highest-value work is levelling siblings to the mandatory baseline + tightening
  chaining, not deepening any one page further.
- **Chaining.** Related-services must point at **published** leaves (coming-soon refs
  are silently dropped → fewer than 3 links render). `relatedWork` currently points at
  generic `/work`; dedicated case-study pages (e.g. nsASTR/nrETH) are **deferred**.
- **14 coming-soon stubs.** Deciding which to promote/author (and which to merge or
  cut) is part of the services plan.

---

## 7. Working structure / conventions (non-negotiable)

- **Branch:** `design-revamp` (shared with collaborators). Rebase onto `origin`,
  **never force-push**. Commit in logical units; push only when asked.
- **Verify with `npx tsc --noEmit`**, NOT `npm run build` (rss.xml fails on the PR #26
  env hold).
- **DESIGN.md is the operational design authority** — read before any UI change. Token
  scale: spacing 4/8/12/16/24/32/48/64/96/128; colors via tokens (pillar hexes
  `#296ff0`/`#0F766E`/`#C2410C`); Switzer + JetBrains Mono. Motion: one-shot, IO-gated
  `Reveal`, `prefers-reduced-motion` honored. **Bans:** colored side-stripe borders
  (>1px) on cards, gradient text, glassmorphism-by-default, identical card-grid
  monotony.
- **Em-dashes:** allowed in visible prose (DESIGN.md:37); strip only from alt/ARIA
  text. List-introducing em-dashes → prefer colons.
- **Copy tone:** direct, technical, every claim verifiable; no marketing inflation.
- **Dev server:** port `:3000` is already running another terminal's dev server — reuse
  it (HMR), don't kill it; never `rm -rf .next` while it runs. For a separate worktree,
  start on a free port.
- **Co-author trailer on commits:**
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## 8. What the new terminal is for

Plan/discuss **how to showcase all services and sub-services** — efficient + simple +
SEO/AEO/GEO. Starting topic: **how to showcase Web3 services**.

Open questions worth resolving (discussion, not yet implementation):
1. **Sub-group framing.** Is Strategy / Product / Engineering the right cut for buyers,
   or should pillars present differently (by outcome, by stage)? Same across all three
   pillars?
2. **Coming-soon strategy.** Which of the 14 stubs to author, merge, or drop? Thin
   stubs dilute cluster authority.
3. **Levelling plan.** Bring the 15 thin published leaves to the mandatory baseline
   (and glossary on concept-heavy ones) — order/priority.
4. **Chaining graph.** Hub ↔ leaf ↔ sibling internal-link plan; whether to build real
   case-study pages so `relatedWork` stops pointing at generic `/work`.
5. **Showcase surface.** Pillar hub layout + homepage services section — how much to
   show without over-bearing.

**Reference material:** the master plan with the full canonical-spec rationale is at
`~/.claude/plans/so-i-don-t-intend-robust-spring.md` (section "CANONICAL SERVICE-LEAF
CONTENT SPEC"). The reference implementation is `web3-tokenomics-design`
(live at `/services/web3/web3-tokenomics-design`).

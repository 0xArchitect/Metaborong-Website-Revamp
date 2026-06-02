# Web3 Services — Taxonomy & Content-Model Spec

> **Status:** Locked design, pending user review. 2026-06-02.
> **Scope:** Web3 pillar only. AI + Product Studio are out of scope (separate sessions).
> **Branch:** `design-revamp`. Verify with `npx tsc --noEmit` (not `npm run build`).
> **This spec contains no finished copy** — outlines and targets only. UX-copy is authored
> against this spec in tiers (see §8), each tier reviewed before the next.

---

## 1. Decision summary

Consolidate the Web3 pillar to **13 leaves, zero coming-soon stubs**. Each leaf is a real,
published page targeting one distinct head keyword. Depth lives across the cluster, not on
any one page; every page is **Lean** (~650–850 words) except for a glossary add-on on the
7 concept-heavy leaves. Nav + homepage feature a curated subset; the pillar hub shows all 13.

Net change: **6 new pages** to author · **1 Lean revision + rename + reslug** (Web3 Tokenomics Design → **Tokenomics Design**, slug `tokenomics-design` + 308 redirect) · **1 split-out leaf** (Token Launchpad Development — separated from tokenomics for one-entity-per-page AEO) · **2 retitles** · **3 removals** · **0 stubs**.

---

## 2. Final taxonomy (13 leaves)

Sub-group framing (Strategy / Product / Engineering) is kept — validated against Labrys,
which uses the same three-bucket cut.

| Group | Leaf | Slug | State | Glossary | Content tier |
|---|---|---|---|---|---|
| Strategy | Tokenomics Design | `tokenomics-design` | **rename + reslug + Lean trim** (was "Web3 Tokenomics Design" / `web3-tokenomics-design`; 308 redirect) | yes | Lean |
| Strategy | Blockchain Consulting | `blockchain-consulting` | **new** (absorbs arch-review + product-discovery) | no | Lean |
| Product | NFT Marketplace Development | `nft-marketplace-development` | keep | no | Lean |
| Product | Crypto Wallet Development | `crypto-wallet-development` | **promote + new copy** | no | Lean |
| Product | DEX Development | `dex-development` | **new** | no | Lean |
| Product | RWA Tokenization | `rwa-tokenization` | **new** | yes | Lean |
| Product | Token Launchpad Development | `token-launchpad-development` | **new** (split out of tokenomics) | yes | Lean |
| Engineering | Smart Contract Development | `smart-contract-development` | keep | no | Lean |
| Engineering | DeFi Protocol Development | `defi-protocol-development` | keep (narrow to lending/perps/yield/vaults) | yes | Lean |
| Engineering | Liquid Staking & Restaking Vaults | `liquid-staking-vaults` | keep (**retitle**, slug unchanged) | yes | Lean |
| Engineering | Cross-Chain & Bridging | `cross-chain-bridging` | **new** (clubs interoperability + bridging) | yes | Lean |
| Engineering | DID & ZKP Integration | `decentralized-identity-did-integration` | keep (**retitle**, slug unchanged) | yes | Lean |
| Engineering | Enterprise & Private Blockchain Development | `enterprise-blockchain-development` | **new** (merges enterprise integration + private/permissioned) | no | Lean |

**Removals / folds** (delete from `services-data.ts`):
- `protocol-architecture-review` (coming-soon) → folded into **Blockchain Consulting**.
- `web3-product-discovery` (coming-soon) → folded into **Blockchain Consulting**.
- `token-launchpad-distribution` (coming-soon) → **promoted to a standalone leaf, Token Launchpad Development** (`token-launchpad-development`) — *not* folded into tokenomics. A combined "Tokenomics Design and Launchpad" page was tried and reverted: one entity per page wins for AEO/GEO (a clean "What is X?" on each).
- `dao-governance-systems` (coming-soon) → **dropped**.

**Retitles** (display name only — slugs and SEO equity preserved):
- `liquid-staking-vaults`: "Liquid Staking Vaults" → **"Liquid Staking & Restaking Vaults"** (captures LST + LRT keyword).
- `decentralized-identity-did-integration`: "Decentralized Identity & DID Integration" → **"DID & ZKP Integration"** (surfaces ZKP).

---

## 3. Content model — single Lean baseline + glossary add-on

The locked 14-block order (`leaf-content.ts`) is unchanged; this is a **word-budget
deviation**, approved by the user. **All 13 leaves use one Lean budget — there is no Deep
tier.** The only thing that varies between leaves is the glossary. (Tokenomics, currently
~1,150w, is trimmed down to this budget while keeping its glossary — see §4.0.)

| Block | **Lean (all 13 leaves)** |
|---|---|
| Hero lede | 30–45w |
| Hero stats | only if real numbers |
| AEO "What is X" | 40–60w (keep crisp) |
| Deliverables | 4, label only, no detail |
| Glossary (keyConcepts) | only on the 6 concept-heavy leaves |
| Phases | 3 × 35–45w |
| Tech stack | 6–10 |
| Fit | 3 + 3 |
| Related work | only if real case study |
| Related services | 3 |
| FAQ | 3–4 × 40–70w |
| Last reviewed | optional |
| **Total** | **~650–850w (+glossary where present)** |

**Glossary leaves (7):** Tokenomics, DeFi Protocol, Liquid Staking & Restaking,
DID & ZKP, RWA Tokenization, Cross-Chain & Bridging, Token Launchpad Development
(bonding curve, fair launch, allowlist, TGE).

**Canonical-definition-owner rule:** each term is defined **once**, on its owner page;
siblings cross-link instead of re-defining (repeating a passage across siblings dilutes
which page gets cited). E.g. *AMM* / *liquidity pool* live in the **DeFi** glossary; the
**DEX** page links to them rather than redefining.

**Why Lean is SEO/AEO/GEO-safe:** ranking rewards covering query intent, not word count.
Cluster authority comes from breadth (12 interlinked pages) + schema + a couple of deep
pages — not from padding every page. Citability lives in specific passages (AEO answer,
FAQ, glossary), which Lean keeps sharp.

---

## 4. Per-leaf briefs (the 6 new pages) — outlines, not copy

Shared proof library (cite honestly as company-level credibility; do not fabricate
per-service case studies): Neemo Finance (4 Hacken audit rounds), nsASTR (~$20M TVL) +
nrETH, Sedax/UIDAI partnership, **Coin-it** (live token launchpad / bonding-curve project,
case study available — confirm factual descriptor + any public metric at authoring; do not
fabricate), Clutch 4.9 / 9 reviews.

### 4.0 Tokenomics Design — `tokenomics-design` (revision — DONE)
- Was "Web3 Tokenomics Design" / `web3-tokenomics-design`. **Renamed → Tokenomics Design**, **reslugged → `tokenomics-design`** (308 redirect from the old path), **trimmed to the Lean budget** (hero lede 37w, 4 deliverables, 3 phases, 4 FAQs) while keeping the glossary (5 modelling terms), `heroStats`, `lastReviewed`, and the nsASTR/nrETH `relatedWork`.
- Launchpad content was briefly folded in, then **split out** — see §4.7. Tokenomics now cross-links Token Launchpad Development as a sibling.
- Stays a clean single-entity page: "What is tokenomics design?" → modelling definition only.

### 4.1 Blockchain Consulting — `blockchain-consulting`
- **Head kw:** "blockchain consulting services" / "blockchain consulting company". Secondary: protocol architecture review, web3 feasibility, tokenomics review, web3 product discovery.
- **AEO angle:** advisory practice for founders/enterprises evaluating feasibility, architecture, and economic design *before* build; differentiator = our advice is build-tested (audited protocols shipped).
- **Deliverables (4):** protocol architecture review; economic/tokenomics model review; feasibility + chain-selection assessment; discovery-sprint output (scope, risks, roadmap).
- **Phases (3):** Discovery & framing → Architecture & economic review → Recommendation & roadmap.
- **Fit:** wants independent review before committing build budget / chain decision. **Doesn't fit:** just wants a dev shop to start coding immediately.
- **FAQ (3–4):** What does it include? Architecture reviews? How is this different from hiring you to build? Timeline/cost.
- **Glossary:** none.
- **relatedServices:** `web3-tokenomics-design`, `smart-contract-development`, + cross `product-studio/product-discovery-validation`.

### 4.2 Crypto Wallet Development — `crypto-wallet-development`
- **Head kw:** "crypto wallet development (company)". Secondary: custodial wallet, non-custodial / self-custody, MPC wallet, multi-chain wallet, web3 wallet.
- **AEO angle:** engineering practice building custodial + self-custody wallets across EVM/Solana/Cosmos with secure key management.
- **Deliverables (4):** custodial/non-custodial wallet app; key-management/MPC (or seed) architecture; multi-chain account + transaction layer; security review + handover.
- **Phases (3):** Key-management & security spec → Wallet + chain integration build → Hardening & release.
- **Fit:** branded wallet needing real key-management rigor. **Doesn't fit:** throwaway/meme wallet, no security budget.
- **FAQ:** Custodial vs non-custodial? Which chains? MPC/key management? Security posture.
- **Glossary:** none.
- **relatedServices:** `smart-contract-development`, `decentralized-identity-did-integration`, + cross `product-studio/mvp-development`.

### 4.3 DEX Development — `dex-development`
- **Head kw:** "DEX development" / "decentralized exchange development". Secondary: AMM, swap, liquidity pool, orderbook DEX, perp DEX. **Scope owns** DEX/AMM/swap/liquidity-pool (DeFi narrows away from these).
- **AEO angle:** on-chain engineering for decentralized exchanges (AMM or orderbook) with pools, swaps, routing.
- **Deliverables (4):** AMM/orderbook contracts; liquidity-pool + LP/fee logic; swap/routing + frontend; keeper/indexer + audit-ready handover.
- **Phases (3):** Mechanism & pool spec → Contracts + off-chain + frontend → Audit & launch.
- **Fit:** launching a swap/AMM/orderbook. **Doesn't fit:** fork-and-rebrand of an existing DEX.
- **FAQ:** AMM vs orderbook? How does this differ from DeFi protocol dev? Liquidity bootstrapping? Audit.
- **Glossary:** none (AMM/liquidity-pool owned by DeFi; cross-link).
- **relatedServices:** `defi-protocol-development`, `smart-contract-development`, `web3-tokenomics-design`.

### 4.4 RWA Tokenization — `rwa-tokenization`
- **Head kw:** "real-world asset tokenization" / "RWA tokenization". Secondary: asset-backed token, tokenized securities, on-chain treasuries/credit, RWA platform.
- **AEO angle:** representing real-world assets (real estate, treasuries, commodities, private credit) as on-chain tokens with compliance + custody controls.
- **Deliverables (4):** asset-backed/compliance-aware token contracts; KYC/allowlist + transfer-restriction layer; custody + oracle/proof-of-reserve integration; investor portal + admin.
- **Phases (3):** Asset & compliance spec → Token + compliance contracts → Custody integration & launch.
- **Fit:** regulated issuer tokenizing real assets with a compliance workstream. **Doesn't fit:** unbacked "RWA-washing", no compliance scope.
- **FAQ:** What is RWA tokenization? Regulation/compliance? Custody/proof-of-reserve? Which asset classes.
- **Glossary (5):** real-world asset (RWA); asset-backed token; tokenized security; transfer restriction / allowlist; proof-of-reserve / custody.
- **relatedServices:** `web3-tokenomics-design`, `smart-contract-development`, `decentralized-identity-did-integration` (compliance/KYC).

### 4.5 Cross-Chain & Bridging — `cross-chain-bridging`
- **Head kw:** "cross-chain bridge development" / "blockchain interoperability". Secondary: bridge, message passing (GMP), wrapped assets, multichain, lock-and-mint.
- **AEO angle:** moving tokens and messages across blockchains (lock-mint, burn-mint, liquidity bridges) with validation + replay protection.
- **Deliverables (4):** bridge contracts (lock-mint/burn-mint); message-passing/validation layer; relayer/keeper infrastructure; security review + monitoring.
- **Phases (3):** Bridge model & trust spec → Contracts + relayers → Audit & monitored launch.
- **Fit:** protocol needing assets/messages across chains. **Doesn't fit:** an existing canonical bridge already covers the need.
- **FAQ:** Types of bridges? Bridge-hack security? Which chains? Trust model.
- **Glossary (4–5):** cross-chain bridge; lock-and-mint; message passing (GMP); wrapped asset; liquidity bridge.
- **relatedServices:** `smart-contract-development`, `defi-protocol-development`, `liquid-staking-vaults`.

### 4.6 Enterprise & Private Blockchain Development — `enterprise-blockchain-development`
- **Head kw:** "enterprise blockchain development" / "private blockchain development" / "Hyperledger development". Secondary: permissioned blockchain, consortium chain, Hyperledger Fabric, Corda, ERP/CRM integration. **High competition — Tier-3 difficulty; author last.**
- **AEO angle:** building permissioned/private networks (Hyperledger, Corda) and integrating them with enterprise systems (ERP/CRM) for supply chain, finance, identity.
- **Deliverables (4):** permissioned network architecture (Fabric/Corda); chaincode/smart contracts; enterprise system integration (ERP/CRM/API); governance + ops handover.
- **Phases (3):** Network & governance spec → Chaincode + integration build → Pilot & rollout.
- **Fit:** enterprise/consortium needing a private chain + system integration. **Doesn't fit:** public-chain crypto-native product.
- **FAQ:** Private vs public blockchain? Hyperledger vs Corda? Integration with existing systems? Compliance/data residency.
- **Glossary:** none.
- **relatedServices:** `smart-contract-development`, `decentralized-identity-did-integration`, + cross `product-studio/b2b-multi-tenant-platforms`.

### 4.7 Token Launchpad Development — `token-launchpad-development` (DONE — split from tokenomics)
- **Head kw:** "token launchpad development" / "token sale platform development". Secondary: IDO / fair-launch platform, bonding curve, token distribution, vesting contracts.
- **AEO angle:** the on-chain platform a project sells + distributes its token through; built end-to-end (sale, vesting, distribution contracts), engineered for audit. Backed by the Hacken proof.
- **Deliverables (4):** sale contracts (fixed / fair-launch / bonding-curve + allowlist + caps); vesting/distribution contracts; anti-bot/anti-snipe + KYC/allowlist; sale frontend + claim portal + operator dashboard.
- **Phases (3):** Sale & distribution spec → Contracts & frontend → Audit & launch.
- **Glossary (4):** bonding curve, fair launch, allowlist, token generation event (TGE). *(bonding curve lives here now, not on tokenomics — canonical-owner rule.)*
- **relatedServices:** `tokenomics-design`, `smart-contract-development`, `defi-protocol-development`.
- **Group:** Product. **Surfacing:** hub-only (not featured). **`relatedWork: []`** until the Coin-it descriptor is supplied — do not fabricate.

---

## 5. Cluster link map

- **Hub** (`/services/web3/`) lists all 13 and also owns the **"blockchain consulting"** overview intent at the pillar level (in addition to the dedicated leaf).
- **relatedServices** per leaf = 3 refs, **published-only** (the resolver in `leaf-service.tsx` silently drops coming-soon/unpublished). Author each leaf's triple with a **mix that resolves to ≥3 published siblings even mid-rollout** — prefer pointing new pages at already-published siblings so links render before all new pages ship.
- Existing leaves should add 1 ref to a relevant new sibling once it publishes (e.g. DeFi → DEX, Smart Contract → Cross-Chain), tightening the graph. Tracked as a follow-up edit per new page.
- `relatedWork` stays pointing at `/work` (dedicated case-study pages deferred).

---

## 6. Surfacing — nav + homepage (featured set)

Introduce an **optional `featured` ordering** so the curated set is decoupled from array
order and the `slice(0,5)` cap.

Mechanism: numeric `featuredNav` / `featuredHome` rank (1-based display order) on `ChildService`; `getFeaturedLeaves()` sorts ranked leaves, fills from remaining published, caps at N.

- **Nav (5, ranked — all already published, fills now):** 1 `smart-contract-development` · 2 `defi-protocol-development` · 3 `nft-marketplace-development` · 4 `liquid-staking-vaults` · 5 `tokenomics-design`.
- **Homepage section (6, ranked):** 1 `blockchain-consulting` · 2 `enterprise-blockchain-development` · 3 `dex-development` · 4 `rwa-tokenization` · 5 `decentralized-identity-did-integration` · 6 `cross-chain-bridging`. Only DID is published today; the rest fill via fallback until authored (Tier 1).
- **Hub:** shows all 13 (unchanged).

**Render rule:** a slot renders only if the featured leaf is **published**. Until a featured
new page ships, fall back to the next-best **published** leaf (by featured order, then
taxonomy order) so the nav always shows 5 and the homepage 6. As each new page publishes,
it takes its featured slot automatically.

**Fallback for other pillars:** the `featured` flag is optional. AI + Product Studio have no
featured marks this session, so they keep their current `getPublishedLeaves(...).slice(0,5)`
behavior until their own sessions.

**Surfacing (final):** Nav = the proof/core 5 (all published). Homepage = the
new/commercial set (Consulting, Enterprise & Private, DEX, RWA, DID, Cross-Chain & Bridging).
**Hub-only:** Crypto Wallet Development + Token Launchpad Development.

---

## 7. SEO / AEO / GEO wiring

- **`lib/services/seo-map.ts`:** add **7 new entries** — Blockchain Consulting, Crypto Wallet, DEX, RWA, Cross-Chain & Bridging, Enterprise & Private, **Token Launchpad Development** — each with head keyword, title, meta description.
- **Site-wide title dedupe (DONE):** every `seo-map.ts` title carried a trailing `| Metaborong` while the root layout applies a `%s | Metaborong` template — doubling the brand on all 16 leaf pages (e.g. `… | Metaborong | Metaborong`). Stripped the suffix from all titles; the template now adds it once.
- **JSON-LD per leaf** (`buildLeafJsonLd`): Service + FAQPage + BreadcrumbList + HowTo on every leaf; **DefinedTermSet** on the 6 glossary leaves; `dateModified`/`reviewedBy` only where `lastReviewed` is set.
- **`app/sitemap.ts`** + **`app/llms.txt/route.ts`:** auto-include published leaves — no change beyond publishing the new pages.
- **`app/robots.ts`:** unchanged (AI crawlers already allowed; stubs self-noindex — but we now have no stubs in Web3).

---

## 8. Authoring tiers (revised by featured priority)

Featured-new pages first so the nav/homepage fill out; the one non-featured new page last.

- **Tier 0 (structural — DONE):** retitles + DeFi scope-narrow + taxonomy edits (remove 3 stubs) + numeric `featuredNav`/`featuredHome` ranks + nav/homepage wiring + **site-wide leaf-title dedupe** (§7). Nav (proof 5) all-published → fills now.
- **Tokenomics revision + Token Launchpad split — DONE** (§4.0, §4.7): tokenomics renamed/reslugged/trimmed; Token Launchpad authored as a standalone published leaf (Coin-it `relatedWork` pending).
- **Tier 1 (homepage-featured — author next):** Blockchain Consulting, Enterprise & Private Blockchain, DEX, RWA, Cross-Chain & Bridging — **5 new pages**. Enterprise is Tier-3 difficulty but homepage-featured, so authored here.
- **Tier 2 (hub-only — last):** Crypto Wallet Development. = 1 page.

Each page authored as one `LeafContent` object against §4, reviewed before the next.

---

## 9. File-change checklist

- `components/sections/services-data.ts` — add/remove/retitle leaves; narrow DeFi description; add optional `featured` field + Web3 marks.
- `lib/services/leaf-content.ts` — update per-field word-budget comments to the Lean model; document the Deep/Lean + glossary deviation.
- `lib/services/content/web3.ts` — 6 new `LeafContent` objects (tiered); **Tokenomics revision** (trim to Lean + launchpad/bonding-curve + Coin-it); retitle-driven copy touches; DeFi scope narrowing.
- `lib/services/content/index.ts` — register new slugs.
- `lib/services/seo-map.ts` — 5–6 new entries; retitle title tweaks.
- `components/layout/nav.tsx` — use featured set (with published-fallback) instead of raw `slice(0,5)`.
- `components/sections/services-pillars.tsx` — use featured set (cap 6) for the homepage section.
- `app/services/[pillar]/[slug]/page.tsx` / `buildLeafJsonLd` — confirm DefinedTermSet emission on glossary leaves (likely already handled by `keyConcepts` presence).
- `docs/services/SERVICES-CONTEXT.md` — update taxonomy table + content-model section to match this spec (source of truth).

---

## 10. Verification & out of scope

- **Verify:** `npx tsc --noEmit` after each tier. Manual check: nav shows 5 (with fallback), homepage shows 6, hub shows all 12, new pages render + JSON-LD validates.
- **Out of scope:** AI + Product Studio pillars (later sessions); actual UX-copy beyond what's tiered here; dedicated case-study pages (`relatedWork` stays `/work`); trimming Tokenomics from Deep to Lean (optional later).

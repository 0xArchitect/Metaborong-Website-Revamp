// Leaf service page template (Template C in SERVICES_PLAN.md § 3).
//
// Server component. Renders the 11-block leaf surface for v1 published
// leaves. Authored content arrives as a typed `LeafContent` value; the
// taxonomy lookup (pillar label, sub-group label, leaf name, related-leaf
// filtering) is done here so content authors never repeat what the data
// layer already knows.
//
// The template never imports MDX or markdown — every block is structured
// data. Motion is delegated to the `<Section>` primitive's built-in
// `<Reveal>`, which short-circuits under `prefers-reduced-motion: reduce`.
// The FAQ accordion uses native `<details>` so the surface stays fully
// server-rendered with zero JS hydration cost for this template.

import Link from 'next/link'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { Stagger } from '@/components/ui/stagger'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { ContactCtaSection } from '@/components/sections/contact-cta'
import { TokenomicsSupplyVisual } from '@/components/services/tokenomics-supply-visual'
import { LaunchpadBondingCurveVisual } from '@/components/services/launchpad-bonding-curve-visual'
import { SmartContractVisual } from '@/components/services/smart-contract-visual'
import { DefiProtocolVisual } from '@/components/services/defi-protocol-visual'
import { NftMarketplaceVisual } from '@/components/services/nft-marketplace-visual'
import { LiquidStakingVisual } from '@/components/services/liquid-staking-visual'
import { DidVisual } from '@/components/services/did-visual'
import { BlockchainConsultingVisual } from '@/components/services/blockchain-consulting-visual'
import { EnterprisePrivateBlockchainVisual } from '@/components/services/enterprise-private-blockchain-visual'
import { RwaTokenizationVisual } from '@/components/services/rwa-tokenization-visual'
import { CryptoWalletVisual } from '@/components/services/crypto-wallet-visual'
import { CrossChainBridgeVisual } from '@/components/services/cross-chain-bridge-visual'
import { IndexersSubgraphsVisual } from '@/components/services/blockchain-indexers-subgraphs-visual'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { ClutchWidget } from '@/components/sections/clutch-widget'
import { ArrowRight, Check, X } from 'lucide-react'

// Per-leaf hero signature visual (DESIGN.md: one signature visual per section).
// Keyed by `${pillar}/${slug}`; leaves without an entry render a text-only hero.
const heroVisuals: Record<string, React.ComponentType> = {
  'web3/tokenomics-design': TokenomicsSupplyVisual,
  'web3/token-launchpad-development': LaunchpadBondingCurveVisual,
  'web3/smart-contract-development': SmartContractVisual,
  'web3/defi-protocol-development': DefiProtocolVisual,
  'web3/nft-marketplace-development': NftMarketplaceVisual,
  'web3/liquid-staking-vaults': LiquidStakingVisual,
  'web3/decentralized-identity-did-integration': DidVisual,
  'web3/blockchain-consulting': BlockchainConsultingVisual,
  'web3/enterprise-private-blockchain': EnterprisePrivateBlockchainVisual,
  'web3/rwa-tokenization': RwaTokenizationVisual,
  'web3/crypto-wallet-development': CryptoWalletVisual,
  'web3/cross-chain-bridge-development': CrossChainBridgeVisual,
  'web3/blockchain-indexers-subgraphs': IndexersSubgraphsVisual,
}

import {
  pillars,
  getAllLeaves,
  type Pillar,
  type SubGroup,
  type ChildService,
} from '@/components/sections/services-data'
import type { LeafContent, LeafRelatedServiceRef } from '@/lib/services/leaf-content'

// Full-bleed bands (breadcrumb, hero-stats, last-reviewed) sit outside the
// <Section> primitive, so they repeat its canonical gutter + 1280 column here
// to keep every block's side edges aligned top-to-bottom (one constant column).
const BAND_PX = 'px-[16px] sm:px-[24px] md:px-[40px] lg:px-[48px] xl:px-[80px] 2xl:px-[128px]'

interface LeafServicePageProps {
  pillar: Pillar
  subGroup: SubGroup
  leaf: ChildService
  content: LeafContent
}

export function LeafServicePage({ pillar, subGroup, leaf, content }: LeafServicePageProps) {
  const relatedLeaves = resolveRelatedServices(content.relatedServices)

  return (
    <main className="bg-bg">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/', home: true },
          { label: 'Services', href: '/services/' },
          { label: pillar.label, href: pillar.hubHref },
          { label: leaf.name },
        ]}
      />
      <Hero
        pillar={pillar}
        subGroup={subGroup}
        leaf={leaf}
        lede={content.heroLede}
        Visual={heroVisuals[`${pillar.id}/${leaf.slug}`]}
      />
      {content.heroStats && content.heroStats.length > 0 && (
        <HeroStatsRow pillar={pillar} stats={content.heroStats} />
      )}
      <AeoAnswer leaf={leaf} answer={content.aeoAnswer} />
      <WhatWeDeliver pillar={pillar} deliverables={content.deliverables} />
      {content.keyConcepts && content.keyConcepts.length > 0 && (
        <KeyConcepts pillar={pillar} concepts={content.keyConcepts} />
      )}
      <HowWeWork pillar={pillar} phases={content.phases} />
      <TechStackStrip items={content.techStack} />
      <FitBlock pillar={pillar} fit={content.fit} />
      <RelatedWork pillar={pillar} items={content.relatedWork} />
      {relatedLeaves.length > 0 && <RelatedServices items={relatedLeaves} />}
      <FaqBlock faqs={content.faqs} />
      {content.lastReviewed && <LastReviewedLine date={content.lastReviewed} />}
      <ContactCtaSection />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — pillar+sub-group eyebrow, H1 verbatim from data, authored lede.
// ─────────────────────────────────────────────────────────────────────────────

function Hero({
  pillar,
  subGroup,
  leaf,
  lede,
  Visual,
}: {
  pillar: Pillar
  subGroup: SubGroup
  leaf: ChildService
  lede: string
  Visual?: React.ComponentType
}) {
  return (
    <Section maxWidth="xwide" reveal={false}>
      <div
        className={
          Visual
            ? 'grid items-center gap-[48px] lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]'
            : ''
        }
      >
        <div>
          <Reveal>
            <Eyebrow tone={pillar.id} as="p" className="mb-[16px]">
              {pillar.label} · {subGroup.label}
            </Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(32px,4.5vw,56px)] font-bold tracking-[-0.035em] leading-[1.05] text-dark mb-[24px]">
              {leaf.name}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[62ch] text-[17px] md:text-[18px] leading-[1.65] tracking-[-0.01em] text-gray mb-[32px]">
              {lede}
            </p>
          </Reveal>
          <Reveal delay={180} className="flex flex-wrap items-center gap-x-[24px] gap-y-[16px]">
            <Button href="/#contact" variant="primary" size="lg" arrow="→">
              Talk to us
            </Button>
            <ClutchWidget widgetType="2" className="w-[280px] max-w-full" />
          </Reveal>
        </div>
        {Visual && (
          <Reveal delay={120} className="hidden lg:block">
            <Visual />
          </Reveal>
        )}
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// What we deliver — 4–6 concrete artefact cards. Pillar-tinted left rule
// signals which pillar owns the engagement without going logo-noisy.
// ─────────────────────────────────────────────────────────────────────────────

function WhatWeDeliver({
  pillar,
  deliverables,
}: {
  pillar: Pillar
  deliverables: readonly LeafContent['deliverables'][number][]
}) {
  return (
    <Section bg="subtle" maxWidth="xwide" reveal={false}>
      <Reveal>
        <div className="mb-[32px] md:mb-[40px]">
          <Eyebrow as="p" className="mb-[12px]">What we deliver</Eyebrow>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.03em] text-dark">
            Concrete artefacts, not capabilities
          </h2>
        </div>
      </Reveal>
      {/* Numbered spec ledger — oversized mono index + hairline rows, not cards.
          Index inks to the pillar colour on row hover (delight). */}
      <Stagger as="ul" role="list" className="stagger border-t border-border">
        {deliverables.map((d, i) => (
          <li
            key={i}
            style={{ '--i': i, '--pillar-color': pillar.color } as React.CSSProperties}
            className="stag group grid grid-cols-[auto_1fr] items-baseline gap-x-[20px] border-b border-border py-[24px] transition-colors duration-[var(--duration-fast)] hover:bg-bg-raised md:gap-x-[40px] md:py-[28px]"
          >
            <span className="font-mono text-[clamp(30px,4.5vw,52px)] font-bold leading-none tabular-nums text-gray-subtle transition-colors duration-[var(--duration-fast)] group-hover:text-[color:var(--pillar-color)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="text-[clamp(17px,1.6vw,20px)] font-semibold tracking-[-0.02em] leading-[1.35] text-dark">
                {d.label}
              </p>
              {d.detail && (
                <p className="mt-[8px] max-w-[70ch] text-[14px] leading-[1.6] text-gray">{d.detail}</p>
              )}
            </div>
          </li>
        ))}
      </Stagger>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// How we work — numbered phases, ~50-word body each. NOT generic process —
// authored per leaf.
// ─────────────────────────────────────────────────────────────────────────────

function HowWeWork({ pillar, phases }: { pillar: Pillar; phases: readonly LeafContent['phases'][number][] }) {
  return (
    <Section maxWidth="xwide" reveal={false}>
      <Reveal>
        <div className="mb-[32px] md:mb-[40px]">
          <Eyebrow as="p" className="mb-[12px]">How we work</Eyebrow>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.03em] text-dark">
            Engagement phases
          </h2>
        </div>
      </Reveal>
      {/* Process spine — nodes on a connector that draws as the section scrolls
          through the viewport (scroll-scrubbed via animation-timeline). Degrades
          to a fully-drawn static line under no support / reduced motion. */}
      <Stagger
        as="ol"
        role="list"
        style={{ '--pillar-color': pillar.color } as React.CSSProperties}
        className={`stagger phase-spine grid grid-cols-1 gap-y-[40px] md:gap-x-[32px] ${phases.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}
      >
        {phases.map((phase, i) => (
          <li
            key={i}
            style={{ '--i': i } as React.CSSProperties}
            className="stag phase-step relative pl-[60px] md:pl-0 md:pt-[64px]"
          >
            <span className="phase-node" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-[20px] font-bold tracking-[-0.025em] leading-[1.2] text-dark">
              {phase.title}
            </h3>
            <p className="mt-[12px] text-[15px] leading-[1.65] text-gray">{phase.body}</p>
          </li>
        ))}
      </Stagger>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Tech / stack strip — typographic mono marquee with brand-square separators.
// No logos: avoids third-party icon requests and missing-slug breakage, and
// reads as a blueprint capability ledger rather than logo soup.
// ─────────────────────────────────────────────────────────────────────────────

function TechStackStrip({ items }: { items: readonly LeafContent['techStack'][number][] }) {
  // Two identical halves for the seamless translateX(-50%) marquee loop.
  const marqueeItems = [...items, ...items]

  return (
    <section className="bg-bg-subtle py-[32px] md:py-[48px] overflow-hidden border-y border-border" aria-label="Tech stack">
      <Reveal className={`mx-auto w-full max-w-[1280px] mb-[24px] ${BAND_PX}`}>
        <Eyebrow as="p" className="mb-[12px]">Tech stack</Eyebrow>
        <h2 className="text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.025em] text-dark">
          What we build on
        </h2>
      </Reveal>
      <div className="relative flex w-full overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="flex w-max animate-marquee items-center m-0 p-0 list-none will-change-transform hover:[animation-play-state:paused]">
          {marqueeItems.map((tech, i) => (
            <li
              key={`${tech.name}-${i}`}
              className="flex shrink-0 items-baseline gap-[12px] pr-[40px] md:pr-[56px]"
            >
              <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 self-center bg-brand" />
              <span className="font-mono text-[16px] md:text-[20px] font-bold uppercase tracking-[0.04em] text-dark whitespace-nowrap">
                {tech.name}
              </span>
              {tech.category && (
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gray whitespace-nowrap">
                  {tech.category}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// When this fits / when it doesn't — two-column honest-scope block.
// Buyers self-disqualify here.
// ─────────────────────────────────────────────────────────────────────────────

function FitBlock({ pillar, fit }: { pillar: Pillar; fit: LeafContent['fit'] }) {
  return (
    <Section maxWidth="xwide">
      <div className="mb-[32px] md:mb-[40px]">
        <Eyebrow as="p" className="mb-[12px]">Scope</Eyebrow>
        <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.03em] text-dark">
          When this fits and when it doesn&apos;t
        </h2>
      </div>
      {/* Semantic comparison table — fits (✓, pillar) vs doesn't-fit (✗, muted
          tint). A real <table> so AI answer engines lift the markup; full
          borders only (border-t, md:border-r), never side-stripe accents. */}
      <div className="overflow-hidden rounded-[12px] border border-border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">When this engagement fits and when it does not.</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/2 align-top px-[16px] py-[20px] md:border-r border-border md:p-[32px]">
                <span className="flex items-center gap-[8px] font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-dark md:gap-[10px]">
                  <Check className="h-[16px] w-[16px] shrink-0" strokeWidth={2.5} style={{ color: pillar.color }} aria-hidden="true" />
                  This fits when
                </span>
              </th>
              <th scope="col" className="w-1/2 align-top bg-bg-subtle px-[16px] py-[20px] md:p-[32px]">
                <span className="flex items-center gap-[8px] font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-gray md:gap-[10px]">
                  <X className="h-[16px] w-[16px] shrink-0 text-gray-light" strokeWidth={2.5} aria-hidden="true" />
                  This doesn&apos;t fit when
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map((i) => (
              <tr key={i}>
                <td className="align-top border-t border-border px-[16px] py-[20px] md:border-r md:p-[32px]">
                  <span className="flex gap-[8px] text-[15px] leading-[1.55] text-dark md:gap-[12px]">
                    <Check className="mt-[3px] h-[15px] w-[15px] shrink-0" strokeWidth={2.5} style={{ color: pillar.color }} aria-hidden="true" />
                    <span>{fit.fits[i]}</span>
                  </span>
                </td>
                <td className="align-top border-t border-border bg-bg-subtle px-[16px] py-[20px] md:p-[32px]">
                  <span className="flex gap-[8px] text-[15px] leading-[1.55] text-gray md:gap-[12px]">
                    <X className="mt-[3px] h-[15px] w-[15px] shrink-0 text-gray-light" strokeWidth={2.5} aria-hidden="true" />
                    <span>{fit.doesNotFit[i]}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AEO answer block — 40–60 word answer paragraph. Quoted treatment so
// crawlers + screen-readers recognise it as the canonical short answer.
// Schema (`FAQPage` / answer-text) is the route's responsibility.
// ─────────────────────────────────────────────────────────────────────────────

function AeoAnswer({ leaf, answer }: { leaf: ChildService; answer: string }) {
  // Editorial two-column: the question anchors the left, the citable answer
  // fills the right at lede scale. No card, no accent rule, no glyph — the
  // split itself carries the structure and uses the width without a void.
  return (
    <Section bg="subtle" maxWidth="xwide">
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] md:gap-[64px] lg:gap-[96px]">
        <div>
          <Eyebrow as="p" className="mb-[12px]">In short</Eyebrow>
          <h2 className="text-[clamp(24px,2.8vw,34px)] font-bold tracking-[-0.03em] leading-[1.1] text-dark">
            What is {leaf.name}?
          </h2>
        </div>
        <blockquote>
          <p className="max-w-[62ch] text-[clamp(18px,1.8vw,21px)] leading-[1.6] tracking-[-0.01em] text-dark">
            {answer}
          </p>
        </blockquote>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Related work — 1–2 anonymized case-study cards. No invented client names,
// no fabricated metrics.
// ─────────────────────────────────────────────────────────────────────────────

function RelatedWork({
  pillar,
  items,
}: {
  pillar: Pillar
  items: readonly LeafContent['relatedWork'][number][]
}) {
  if (items.length === 0) return null
  return (
    <Section maxWidth="xwide">
      <div className="mb-[32px] md:mb-[40px]">
        <Eyebrow as="p" className="mb-[12px]">Related work</Eyebrow>
        <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.03em] text-dark">
          Shipped engagements
        </h2>
      </div>
      <ul role="list" className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
        {items.map((work, i) => (
          <li key={i}>
            <Link
              href={work.href}
              className="group flex h-full flex-col gap-[12px] border border-border bg-bg p-[24px] no-underline transition-colors duration-[var(--duration-fast)] hover:border-[color:var(--pillar-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              style={{ '--pillar-color': pillar.color } as React.CSSProperties}
              target={work.href.startsWith('http') ? '_blank' : undefined}
              rel={work.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]"
                style={{ color: pillar.color }}
              >
                Live project
              </span>
              <p className="text-[15px] font-semibold text-dark">{work.descriptor}</p>
              <p className="text-[14px] leading-[1.6] text-gray">{work.summary}</p>
              <span className="mt-auto inline-flex items-center gap-[8px] text-[13px] font-semibold text-dark group-hover:text-[var(--pillar-color)]">
                View live project
                <ArrowRight className="h-[16px] w-[16px]" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Related services — 3 sibling/cousin leaf links, filtered to v1 only.
// Coming-soon references are dropped silently by the resolver.
// ─────────────────────────────────────────────────────────────────────────────

interface ResolvedRelated {
  pillar: Pillar
  leaf: ChildService
}

function resolveRelatedServices(refs: readonly LeafRelatedServiceRef[]): ResolvedRelated[] {
  const resolved: ResolvedRelated[] = []
  for (const ref of refs) {
    const pillar = pillars.find((p) => p.id === ref.pillar)
    if (!pillar) continue
    const leaf = getAllLeaves(pillar).find((c) => c.slug === ref.slug)
    if (!leaf || leaf.status !== 'published') continue
    resolved.push({ pillar, leaf })
  }
  return resolved
}

function RelatedServices({ items }: { items: readonly ResolvedRelated[] }) {
  return (
    <Section bg="subtle" maxWidth="xwide">
      <div className="mb-[32px] md:mb-[40px]">
        <Eyebrow as="p" className="mb-[12px]">Related services</Eyebrow>
        <h2 className="text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.025em] text-dark">
          Adjacent engagements
        </h2>
      </div>
      {/* Compact hairline rows, not a card grid. Arrow node slides + inks on hover. */}
      <ul role="list" className="border-t border-border">
        {items.map(({ pillar, leaf }) => (
          <li key={`${pillar.id}/${leaf.slug}`}>
            <Link
              href={`${pillar.hubHref}${leaf.slug}/`}
              className="group grid grid-cols-[1fr_auto] items-center gap-[20px] border-b border-border py-[20px] no-underline transition-colors duration-[var(--duration-fast)] hover:bg-bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset md:py-[24px]"
              style={{ '--pillar-color': pillar.color } as React.CSSProperties}
            >
              <div className="min-w-0">
                <span
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: pillar.color }}
                >
                  {pillar.label}
                </span>
                <h3 className="mt-[6px] text-[17px] font-semibold tracking-[-0.02em] leading-[1.3] text-dark md:text-[19px]">
                  {leaf.name}
                </h3>
                <p className="mt-[4px] max-w-[68ch] text-[14px] leading-[1.55] text-gray">{leaf.description}</p>
              </div>
              <span
                className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-border text-gray transition-[transform,border-color,color] duration-[var(--duration-fast)] group-hover:translate-x-[2px] group-hover:border-[color:var(--pillar-color)] group-hover:text-[color:var(--pillar-color)] motion-reduce:group-hover:translate-x-0"
              >
                <ArrowRight className="h-[16px] w-[16px]" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — mirrors the homepage FAQ section: sticky two-column layout + the shared
// <FaqAccordion> (single-open, closed answers kept in DOM so they stay
// crawlable). Schema (`FAQPage`) is emitted by the route from the same data.
// ─────────────────────────────────────────────────────────────────────────────

function FaqBlock({ faqs }: { faqs: readonly LeafContent['faqs'][number][] }) {
  if (faqs.length === 0) return null
  const items = faqs.map((f) => ({ q: f.question, a: f.answer }))
  return (
    <Section maxWidth="xwide">
      <div className="grid gap-[40px] md:gap-[64px] lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-[96px]">
        <div className="lg:sticky lg:top-[96px] lg:self-start">
          <SectionEyebrow className="mb-[16px]">FAQ</SectionEyebrow>
          <h2 className="text-balance text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.05] tracking-[-0.035em] text-dark">
            Frequently asked questions
          </h2>
          <div className="mt-[32px] hidden border border-border p-[24px] lg:block">
            <p className="text-[15px] font-semibold leading-[1.4] tracking-[-0.02em] text-dark">
              Don&apos;t see your question?
            </p>
            <p className="mt-[8px] text-[14px] leading-[1.5] text-gray">
              Email the founders directly: first reply usually lands the same day.
            </p>
            <a
              href="mailto:contact@metaborong.com?subject=Question%20about%20your%20services"
              className="mt-[18px] inline-flex items-center gap-[6px] text-[13px] font-semibold tracking-[-0.01em] text-dark underline decoration-gray-subtle underline-offset-[3px] transition-colors duration-200 hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              contact@metaborong.com <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <FaqAccordion items={items} />
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero stats row — 3 mono-treated verifiable proof numbers, sits directly
// under Hero. Trust-signal anchor for the top viewport. Pillar-tinted value.
// ─────────────────────────────────────────────────────────────────────────────

function HeroStatsRow({
  pillar,
  stats,
}: {
  pillar: Pillar
  stats: NonNullable<LeafContent['heroStats']>
}) {
  return (
    <section
      aria-label="Engagement proof"
      className={`border-y border-border bg-bg-subtle py-[24px] md:py-[32px] ${BAND_PX}`}
    >
      <Reveal className="mx-auto w-full max-w-[1280px]">
        {/* Proof strip — mono value + label inline, source beneath, hairline
            dividers. A blueprint data row, not the big-number metric template. */}
        <ul
          role="list"
          className="flex flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0"
        >
          {stats.map((stat, i) => (
            <li key={i} className="flex flex-col gap-[3px] py-[14px] sm:flex-1 sm:py-0 sm:pl-[28px] sm:first:pl-0">
              <div className="flex items-baseline gap-[8px]">
                <span
                  className="font-mono text-[20px] font-bold leading-none tabular-nums md:text-[22px]"
                  style={{ color: pillar.color }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] font-semibold tracking-[-0.01em] text-dark">
                  {stat.label}
                </span>
              </div>
              {stat.context && (
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray">
                  {stat.context}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Key concepts — encyclopedic DefinedTerm passages rendered as visible UI.
// Pairs with `DefinedTermSet` JSON-LD emitted by the route. Each definition
// is a self-contained citable passage (~45 words).
// ─────────────────────────────────────────────────────────────────────────────

function KeyConcepts({
  pillar,
  concepts,
}: {
  pillar: Pillar
  concepts: NonNullable<LeafContent['keyConcepts']>
}) {
  return (
    <Section maxWidth="xwide" reveal={false}>
      <Reveal>
        <div className="mb-[32px] md:mb-[40px]">
          <Eyebrow as="p" className="mb-[12px]">Key concepts</Eyebrow>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.03em] text-dark">
            Key terms, defined
          </h2>
        </div>
      </Reveal>
      <Stagger as="dl" className="stagger grid grid-cols-1 gap-x-[48px] gap-y-[36px] md:grid-cols-2">
        {concepts.map((c, i) => (
          <div
            key={i}
            style={{ '--i': i, borderTopColor: pillar.color } as React.CSSProperties}
            className="stag border-t-2 pt-[18px]"
          >
            <dt className="mb-[10px] flex items-baseline gap-[10px] text-[20px] font-bold tracking-[-0.02em] leading-[1.25] text-dark">
              <span aria-hidden="true" className="font-mono text-[12px] font-bold tracking-[0.08em] tabular-nums" style={{ color: pillar.color }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {c.term}
            </dt>
            <dd className="text-[16px] leading-[1.7] text-gray">{c.definition}</dd>
          </div>
        ))}
      </Stagger>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Last reviewed line — E-E-A-T freshness signal. Sits between FAQ and Contact
// CTA. Pairs with `dateModified` + `reviewedBy` in the Service JSON-LD.
// ─────────────────────────────────────────────────────────────────────────────

function LastReviewedLine({ date }: { date: string }) {
  // Format YYYY-MM-DD -> "31 May 2026" for visible display. Schema gets ISO.
  const formatted = formatReviewDate(date)
  return (
    <section
      aria-label="Editorial review"
      className={`border-t border-border-subtle bg-bg py-[24px] ${BAND_PX}`}
    >
      <Reveal className="mx-auto max-w-[1280px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray">
          Last reviewed <time dateTime={date}>{formatted}</time> · Reviewed by Metaborong engineering team
        </p>
      </Reveal>
    </section>
  )
}

function formatReviewDate(iso: string): string {
  // YYYY-MM-DD -> "31 May 2026". Server-rendered, locale-stable.
  const [y, m, d] = iso.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthName = months[Number(m) - 1] ?? m
  return `${Number(d)} ${monthName} ${y}`
}

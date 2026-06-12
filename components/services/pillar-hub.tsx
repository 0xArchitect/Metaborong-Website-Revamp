import Link from 'next/link'
import { Section } from '@/components/ui/section'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Reveal } from '@/components/ui/reveal'
import { ContactCtaSection } from '@/components/sections/contact-cta'
import {
  pillars,
  type Pillar,
  type PillarId,
  type SubGroup,
  type ChildService,
} from '@/components/sections/services-data'
import { pillarHubCopy, type PillarHubCopy, type SubGroupCopy } from '@/lib/services/pillar-hub-content'
import { serviceSchemas } from '@/lib/schema'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'
import { TrackClick } from '@/components/ui/track-click'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { Web3HubVisualChain } from './web3-hub-visual'
import { AiHubVisualAgents } from './ai-hub-visual'
import { ProductStudioHubVisualStack } from './product-studio-hub-visual'

const BASE = 'https://www.metaborong.com'

// Hub hero signature visual, per pillar — every pillar ships one so the three
// hubs read consistently.
const HUB_VISUALS: Partial<Record<PillarId, () => React.ReactNode>> = {
  web3: Web3HubVisualChain,
  ai: AiHubVisualAgents,
  'product-studio': ProductStudioHubVisualStack,
}

/* ----------------------------------------------------------------------------
 * Shared kicker — 8px pillar-colored marker + mono label. Color lives on the
 * (decorative, aria-hidden) square; the label text uses `text-gray` so it
 * clears AA (the brand hues fail 4.5:1 as small text — see DESIGN.md Color).
 * -------------------------------------------------------------------------- */
function Kicker({
  accent,
  children,
  className = '',
}: {
  accent: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-[10px] font-mono text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-gray ${className}`}
    >
      <span aria-hidden="true" className="h-[8px] w-[8px] flex-none" style={{ backgroundColor: accent }} />
      {children}
    </span>
  )
}

/* ---------- TOP-LEVEL ---------- */

export function PillarHub({ pillar }: { pillar: Pillar }) {
  const copy = pillarHubCopy[pillar.id]
  const otherPillars = pillars.filter((p) => p.id !== pillar.id)
  const breadcrumbSchema = buildBreadcrumbSchema(pillar)
  const faqSchema = buildFaqSchema(pillar, copy)
  // Reuse the homepage's per-pillar Service + OfferCatalog node so the hub
  // emits the same entity (with the published-leaf catalog) that ties the
  // leaves to this hub for AI search engines.
  const serviceSchema = serviceSchemas.find((s) =>
    String(s['@id']).endsWith(`#service-${pillar.id}`),
  )

  return (
    <main id="main" aria-labelledby="pillar-hub-heading" className={`pillar-theme-${pillar.id}`}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/', home: true },
          { label: 'Services', href: '/services' },
          { label: pillar.label },
        ]}
      />
      <PillarHero pillar={pillar} copy={copy} />
      {pillar.subGroups.map((sg, i) => (
        <SubGroupSection
          key={sg.id}
          pillar={pillar}
          subGroup={sg}
          copy={copy.subGroups.find((s) => s.id === sg.id)!}
          index={i + 1}
        />
      ))}
      <EngagementStrip pillar={pillar} copy={copy} />
      <CrossPillarLinks current={pillar} others={otherPillars} />
      <PillarFaq pillar={pillar} copy={copy} />
      <ContactCtaSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {serviceSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      ) : null}
    </main>
  )
}

/* ---------- HERO ---------- */

function PillarHero({ pillar, copy }: { pillar: Pillar; copy: PillarHubCopy }) {
  const HeroVisual = HUB_VISUALS[pillar.id]

  const ctas = (
    <div className="flex flex-col items-stretch gap-[12px] sm:flex-row sm:items-center">
      <TrackClick event="book_call_click" data={{ source: 'pillar-hub' }}>
        <button
          type="button"
          className="inline-flex min-h-[44px] cursor-pointer items-stretch justify-center bg-[var(--cta-color,var(--color-brand))] text-[14px] font-semibold tracking-[-0.005em] text-white no-underline"
          data-cal-namespace="30min"
          data-cal-link="anik-metaborong/30min"
          data-cal-config={'{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'}
        >
          <span className="px-[20px] py-[12px]">Talk to us</span>
          <span aria-hidden="true" className="border-l border-white/15 bg-white/10 px-[14px] py-[12px]">→</span>
        </button>
      </TrackClick>
      <Link
        href="/work"
        className="inline-flex min-h-[44px] items-center justify-center border border-border bg-white px-[18px] py-[10px] text-[14px] font-semibold tracking-[-0.005em] text-dark no-underline hover:border-dark"
      >
        Read case studies
      </Link>
    </div>
  )

  // Visual hero: lean text spine on the left, signature SVG on the right.
  if (HeroVisual) {
    return (
      <Section bg="default" maxWidth="xwide" className="pt-[28px] md:pt-[36px] lg:pt-[44px]!">
        <div className="grid items-center gap-[40px] md:gap-[56px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[64px]">
          <div>
            <Kicker accent={pillar.color}>
              <span className="tabular-nums text-gray">{pillar.num}</span>
              <span aria-hidden="true">/</span>
              {pillar.label}
            </Kicker>
            <h1
              id="pillar-hub-heading"
              className="mt-[20px] text-[clamp(34px,4.8vw,60px)] font-bold leading-[1.04] tracking-[-0.035em] text-dark"
            >
              {copy.heading ?? pillar.headline}
            </h1>
            <p className="mt-[20px] text-[16px] font-medium leading-[1.55] tracking-[-0.01em] text-dark md:text-[17px]">
              {copy.positioning}
            </p>
            {copy.aeoAnswer ? (
              <div className="mt-[24px] border-t border-border pt-[20px]">
                <Kicker accent={pillar.color}>In short</Kicker>
                <p className="mt-[12px] text-[15px] leading-[1.65] tracking-[-0.005em] text-gray md:text-[16px]">
                  {copy.aeoAnswer}
                </p>
              </div>
            ) : null}
            <div className="mt-[24px]">{ctas}</div>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <HeroVisual />
          </div>
        </div>
      </Section>
    )
  }

  // Prose hero (AI / Product-Studio): two proof paragraphs + CTAs on the right.
  return (
    <Section bg="default" maxWidth="xwide" className="pt-[28px] md:pt-[36px] lg:pt-[44px]!">
      <div className="grid gap-[40px] md:gap-[56px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[64px]">
        <div>
          <Kicker accent={pillar.color}>
            <span className="tabular-nums text-gray">{pillar.num}</span>
            <span aria-hidden="true">/</span>
            {pillar.label}
          </Kicker>
          <h1
            id="pillar-hub-heading"
            className="mt-[20px] text-[clamp(34px,4.8vw,60px)] font-bold leading-[1.04] tracking-[-0.035em] text-dark"
          >
            {copy.heading ?? pillar.headline}
          </h1>
          <p className="mt-[20px] text-[16px] font-medium leading-[1.55] tracking-[-0.01em] text-dark md:text-[17px]">
            {copy.positioning}
          </p>
          {copy.aeoAnswer ? (
            <div className="mt-[24px] border-t border-border pt-[20px]">
              <Kicker accent={pillar.color}>In short</Kicker>
              <p className="mt-[12px] text-[15px] leading-[1.65] tracking-[-0.005em] text-gray md:text-[16px]">
                {copy.aeoAnswer}
              </p>
            </div>
          ) : null}
        </div>
        <div className="space-y-[16px] md:space-y-[20px]">
          {(copy.heroParagraphs ?? []).map((para, i) => (
            <p
              key={i}
              className="text-[15px] leading-[1.7] tracking-[-0.005em] text-gray md:text-[16px]"
            >
              {para}
            </p>
          ))}
          <div className="pt-[8px]">{ctas}</div>
        </div>
      </div>
    </Section>
  )
}

/* ---------- SUB-GROUP SECTION ----------
 * Each track = a left rail (number marker + H2 + description) and a right
 * column carrying a hairline-divided service manifest (NOT a card grid — see
 * DESIGN.md 2026-05-27 Work-Preview rebuild).
 */

function SubGroupSection({
  pillar,
  subGroup,
  copy,
  index,
}: {
  pillar: Pillar
  subGroup: SubGroup
  copy: SubGroupCopy
  index: number
}) {
  const numLabel = String(index).padStart(2, '0')
  const sectionBg = index % 2 === 0 ? 'subtle' : 'default'
  // Alternate the rail/content sides so consecutive tracks don't read as the
  // same block. DOM order keeps the heading first (reading order + SEO);
  // only the lg visual columns swap.
  const flip = index % 2 === 0
  return (
    <Section
      bg={sectionBg}
      maxWidth="xwide"
      aria-labelledby={`sg-${pillar.id}-${subGroup.id}-heading`}
    >
      <div
        className={`grid gap-[40px] md:gap-[48px] lg:gap-[64px] ${
          flip
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]'
            : 'lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]'
        }`}
      >
        {/* Left rail — number + name + 1-paragraph description */}
        <div className={flip ? 'lg:order-2' : ''}>
          <Kicker accent={pillar.color}>
            <span className="tabular-nums text-gray">[{numLabel}]</span>
            {pillar.label} · {subGroup.label}
          </Kicker>
          <h2
            id={`sg-${pillar.id}-${subGroup.id}-heading`}
            className="mt-[16px] text-[clamp(26px,3.2vw,40px)] font-bold leading-[1.1] tracking-[-0.03em] text-dark"
          >
            {subGroup.label}
          </h2>
          <p className="mt-[16px] text-[15px] leading-[1.7] tracking-[-0.005em] text-gray">
            {copy.description}
          </p>
        </div>

        <div className={flip ? 'lg:order-1' : ''}>
          <ServiceManifest pillar={pillar} leaves={subGroup.children} />
        </div>
      </div>
    </Section>
  )
}

/* ---------- SERVICE MANIFEST — hairline-divided rows, not a card grid ---------- */

function ServiceManifest({ pillar, leaves }: { pillar: Pillar; leaves: readonly ChildService[] }) {
  return (
    <div
      role="list"
      className="border border-border bg-white"
      style={{ '--pillar-color': pillar.color } as React.CSSProperties}
    >
      <div className="flex items-center justify-between border-b border-border px-[16px] py-[12px] md:px-[20px]">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray">Services</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray tabular-nums">
          {String(leaves.length).padStart(2, '0')}
        </span>
      </div>
      {leaves.map((leaf, i) => (
        <Reveal
          key={leaf.slug}
          delay={i * 45}
          role="listitem"
          className="border-b border-border last:border-b-0"
        >
          <ManifestRow pillar={pillar} leaf={leaf} index={i + 1} />
        </Reveal>
      ))}
    </div>
  )
}

function ManifestRow({ pillar, leaf, index }: { pillar: Pillar; leaf: ChildService; index: number }) {
  const num = String(index).padStart(2, '0')
  // Published — full row link.
  if (leaf.status === 'published') {
    return (
      <Link
        href={`${pillar.hubHref}${leaf.slug}`}
        className="group grid grid-cols-[26px_minmax(0,1fr)_auto] items-baseline gap-[14px] px-[16px] py-[16px] no-underline transition-colors duration-[var(--duration-instant)] hover:bg-bg-raised md:px-[20px]"
      >
        <span className="font-mono text-[12px] font-bold tabular-nums text-gray">{num}</span>
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-dark">
            {leaf.name}
          </span>
          <span className="mt-[5px] block text-[13px] leading-[1.55] tracking-[-0.005em] text-gray">
            {leaf.description}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="self-center text-gray transition-colors duration-[var(--duration-instant)] group-hover:text-[var(--pillar-color)]"
        >
          <ArrowUpRight />
        </span>
      </Link>
    )
  }

  // Coming soon — dimmed, non-interactive row.
  return (
    <div
      aria-disabled="true"
      className="grid grid-cols-[26px_minmax(0,1fr)_auto] items-baseline gap-[14px] px-[16px] py-[16px] opacity-60 md:px-[20px]"
    >
      <span className="font-mono text-[12px] font-bold tabular-nums text-gray">{num}</span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-dark">
          {leaf.name}
        </span>
        <span className="mt-[5px] block text-[13px] leading-[1.55] tracking-[-0.005em] text-gray">
          {leaf.description}
        </span>
      </span>
      <span className="self-center font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray">
        Soon
      </span>
    </div>
  )
}

/* ---------- ENGAGEMENT — numbered process timeline ---------- */

function EngagementStrip({ pillar, copy }: { pillar: Pillar; copy: PillarHubCopy }) {
  return (
    <Section bg="default" maxWidth="xwide" aria-labelledby={`engagement-${pillar.id}-heading`}>
      <div className="mb-[28px] md:mb-[36px]">
        <Kicker accent={pillar.color}>How we engage</Kicker>
        <h2
          id={`engagement-${pillar.id}-heading`}
          className="mt-[12px] text-[clamp(22px,2.6vw,32px)] font-bold leading-[1.15] tracking-[-0.025em] text-dark"
        >
          {phaseHeadline(pillar.id, copy)}
        </h2>
      </div>
      <div role="list" className="grid gap-[28px] md:grid-cols-3 md:gap-0">
        {copy.engagement.map((phase, i) => (
          <Reveal
            role="listitem"
            key={phase.label}
            delay={i * 120}
            className="relative border-t-2 border-border pt-[20px] md:pr-[32px]"
          >
            {/* Node tick sitting on the timeline rule */}
            <span
              aria-hidden="true"
              className="absolute -top-[5px] left-0 h-[8px] w-[8px]"
              style={{ backgroundColor: pillar.color }}
            />
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
              <span className="tabular-nums text-dark">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <p className="mt-[12px] text-[17px] font-semibold tracking-[-0.01em] text-dark">{phase.label}</p>
            <p className="mt-[8px] text-[14px] leading-[1.65] tracking-[-0.005em] text-gray">{phase.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function phaseHeadline(id: PillarId, copy: PillarHubCopy): string {
  const labels = copy.engagement.map((p) => p.label).join(' → ')
  switch (id) {
    case 'ai':
      return `${labels}: production AI, not demoware.`
    case 'web3':
      return `${labels}: audit-ready by default.`
    case 'product-studio':
      return `${labels}: one senior team, end to end.`
  }
}

/* ---------- CROSS-PILLAR LINKS — hairline rows ---------- */

function CrossPillarLinks({ current, others }: { current: Pillar; others: Pillar[] }) {
  return (
    <Section bg="subtle" maxWidth="xwide" aria-labelledby={`cross-${current.id}-heading`}>
      <div className="mb-[20px] md:mb-[28px]">
        <Kicker accent={current.color}>Adjacent capabilities</Kicker>
        <h2
          id={`cross-${current.id}-heading`}
          className="mt-[12px] text-[clamp(20px,2.4vw,28px)] font-bold leading-[1.15] tracking-[-0.025em] text-dark"
        >
          The other two pillars
        </h2>
      </div>
      <div role="list" className="border border-border bg-white">
        {others.map((p, i) => (
          <Reveal
            key={p.id}
            delay={i * 90}
            role="listitem"
            className="border-b border-border last:border-b-0"
          >
            <Link
              href={p.hubHref.replace(/\/$/, '')}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[16px] px-[20px] py-[24px] no-underline transition-colors duration-[var(--duration-instant)] hover:bg-bg-raised md:px-[28px] md:py-[28px]"
              style={{ '--pillar-color': p.color } as React.CSSProperties}
            >
              <div>
                <Kicker accent={p.color}>
                  <span className="tabular-nums text-gray">{p.num}</span>
                  {p.label}
                </Kicker>
                <p className="mt-[10px] text-[17px] font-semibold tracking-[-0.01em] text-dark md:text-[19px]">
                  {p.headline}
                </p>
                <p className="mt-[6px] max-w-[64ch] text-[13px] leading-[1.6] tracking-[-0.005em] text-gray">
                  {p.body}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 text-gray transition-colors duration-[var(--duration-instant)] group-hover:text-[var(--pillar-color)]"
              >
                <ArrowUpRight />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------- FAQ — h3 questions for outline + AEO passage segmentation ---------- */

function PillarFaq({ pillar, copy }: { pillar: Pillar; copy: PillarHubCopy }) {
  const items = copy.faqs.map((f) => ({ q: f.q, a: f.a }))
  return (
    <Section bg="default" maxWidth="xwide" aria-labelledby={`faq-${pillar.id}-heading`}>
      <div className="grid gap-[40px] md:gap-[64px] lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-[96px]">
        <div className="lg:sticky lg:top-[96px] lg:self-start">
          <SectionEyebrow className="mb-[16px]">FAQ</SectionEyebrow>
          <h2
            id={`faq-${pillar.id}-heading`}
            className="text-balance text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.05] tracking-[-0.035em] text-dark"
          >
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
              href="mailto:contact@metaborong.com?subject=Question%20about%20Web3%20development"
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

/* ---------- SCHEMA HELPERS ---------- */

function buildBreadcrumbSchema(pillar: Pillar) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
      { '@type': 'ListItem', position: 3, name: pillar.label, item: `${BASE}${pillar.hubHref.replace(/\/$/, '')}` },
    ],
  }
}

function buildFaqSchema(pillar: Pillar, copy: PillarHubCopy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE}${pillar.hubHref.replace(/\/$/, '')}#faq`,
    mainEntity: copy.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/* ---------- ICONS ---------- */

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

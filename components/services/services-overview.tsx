import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { TrackClick } from '@/components/ui/track-click'
import { pillars, getPublishedLeaves, type Pillar } from '@/components/sections/services-data'
import { TrustBar } from '@/components/sections/trust-bar'
import { ClutchWidget } from '@/components/sections/clutch-widget'
import { ContactCtaSection } from '@/components/sections/contact-cta'
import { FaqSection } from '@/components/sections/faq'
import { AEO_ANSWER, OUTCOMES, OVERVIEW_FAQS } from '@/components/services/services-overview-data'

export function ServicesOverview() {
  return (
    <>
      <HeroBlock />
      <OutcomeStrip />
      <PillarGrid />
      <TrustBar />
      <FaqSection items={OVERVIEW_FAQS} />
      <ContactCtaSection />
    </>
  )
}

/* ------------------------------- HERO ------------------------------- */

function HeroBlock() {
  return (
    <Section bg="default" maxWidth="xwide" aria-labelledby="services-overview-heading">
      <div className="max-w-[1000px]">
        <Eyebrow as="p" className="mb-[20px]">
          Services
        </Eyebrow>
        <h1
          id="services-overview-heading"
          className="text-[clamp(38px,5.5vw,76px)] font-bold leading-[1.0] tracking-[-0.04em] text-dark"
        >
          AI, Web3, and product,<br className="hidden md:block" /> one senior team.
        </h1>
        <blockquote className="mt-[24px]">
          <p className="max-w-[60ch] text-[clamp(17px,1.7vw,20px)] leading-[1.5] tracking-[-0.01em] text-dark">
            {AEO_ANSWER}
          </p>
        </blockquote>
        <div className="mt-[28px] flex flex-wrap items-center gap-[12px]">
          <TrackClick event="book_call_click" data={{ source: 'services-overview' }}>
            <Button
              variant="primary"
              size="lg"
              arrow="→"
              data-cal-namespace="30min"
              data-cal-link="anik-metaborong/30min"
              data-cal-config={'{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'}
            >
              Talk to us
            </Button>
          </TrackClick>
          <Button href="/#work" variant="ghost" size="lg">
            Read case studies
          </Button>
        </div>
      </div>

      {/* Full-width spec manifest — capability key/values (not vanity metrics),
          fills the hero width edge to edge while the copy above stays readable. */}
      <div className="mt-[48px]">
        <dl className="grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
          {[
            { k: 'Pillars', v: 'AI · Web3 · Product Studio' },
            { k: 'Chains', v: 'EVM · Solana · Cosmos' },
            { k: 'Team', v: 'Senior engineers, India + global' },
            { k: 'Proof', v: 'PredictRAM · SunsetML · GovTech DID' },
          ].map((spec) => (
            <div key={spec.k} className="flex flex-col gap-[6px] border-b border-r border-border p-[16px] md:p-[20px]">
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-light">
                {spec.k}
              </dt>
              <dd className="text-[14px] font-semibold leading-[1.3] tracking-[-0.01em] text-dark md:text-[15px]">
                {spec.v}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-[20px] flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between">
          <ClutchWidget widgetType="2" className="w-[200px] max-w-full" />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-light">
            Shipped, not promised · audited across EVM, Solana, and Cosmos
          </p>
        </div>
      </div>
    </Section>
  )
}

/* --------------------------- OUTCOME STRIP -------------------------- */

function OutcomeStrip() {
  return (
    <Section bg="subtle" maxWidth="xwide" aria-labelledby="services-outcomes-heading">
      <div>
        <Eyebrow as="p" className="mb-[12px]">
          By outcome
        </Eyebrow>
        <h2
          id="services-outcomes-heading"
          className="text-[clamp(24px,3vw,36px)] font-bold leading-[1.1] tracking-[-0.03em] text-dark"
        >
          Pick by problem, not capability
        </h2>
      </div>

      <ul role="list" className="mt-[40px] grid grid-cols-1 gap-[28px] md:grid-cols-2 md:gap-x-[48px] md:gap-y-[36px]">
        {OUTCOMES.map((o) => (
          <li key={o.title}>
            <a
              href={o.href}
              className="group block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: o.accent }}>
                {o.kicker}
              </span>
              <span className="mt-[8px] flex items-center gap-[8px]">
                <span
                  className="text-[18px] font-bold leading-[1.15] tracking-[-0.025em] text-dark transition-colors duration-[var(--duration-fast)] group-hover:text-[color:var(--hc)]"
                  style={{ ['--hc' as string]: o.accent }}
                >
                  {o.title}
                </span>
                <span
                  className="-translate-x-[4px] opacity-0 transition-[opacity,transform] duration-[var(--duration-fast)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                  style={{ color: o.accent }}
                >
                  <ArrowRight />
                </span>
              </span>
              <span className="mt-[6px] block max-w-[42ch] text-[13px] leading-[1.55] tracking-[-0.005em] text-gray">
                {o.clarifier}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ---------------------------- PILLAR GRID --------------------------- */

function PillarGrid() {
  return (
    <Section bg="default" maxWidth="xwide" aria-labelledby="services-pillars-heading">
      <div className="max-w-[720px]">
        <Eyebrow as="p" className="mb-[12px]">
          Three pillars
        </Eyebrow>
        <h2
          id="services-pillars-heading"
          className="text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.05] tracking-[-0.035em] text-dark"
        >
          AI, Web3, and Product Studio
        </h2>
        <p className="mt-[16px] text-[16px] leading-[1.65] tracking-[-0.005em] text-gray">
          Three pillars, one senior team. Each groups its services into clear tracks, so a build can span AI, on-chain, and product without handoffs.
        </p>
      </div>

      <ul role="list" className="mt-[48px] grid grid-cols-1 gap-[16px] lg:grid-cols-3 lg:gap-[20px]">
        {pillars.map((p) => (
          <PillarCard key={p.id} pillar={p} />
        ))}
      </ul>
    </Section>
  )
}

// Concise pillar card (impeccable live V1, accepted 2026-06-08): oversized
// pillar numeral as the graphic anchor, headline + body, the top-3 published
// leaves as linked chips, and a `N services` hub link carrying the real
// published count. Replaces the prior tall three-subgroup leaf stack. Every
// leaf stays reachable via the chips + hub.
function PillarCard({ pillar }: { pillar: Pillar }) {
  const leaves = getPublishedLeaves(pillar)
  const top = leaves.slice(0, 3)
  return (
    <li
      className="group flex flex-col gap-[14px] border border-border bg-bg p-[24px] transition-colors duration-[var(--duration-fast)] hover:border-[color:var(--pc)] md:p-[28px]"
      style={{ ['--pc' as string]: pillar.color }}
    >
      <div className="flex items-start justify-between">
        <span
          className="font-bold leading-[0.85] tracking-[-0.05em] text-[clamp(44px,5vw,64px)]"
          style={{ color: pillar.color }}
        >
          {pillar.num}
        </span>
        <span
          className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: pillar.color }}
        >
          {pillar.label}
        </span>
      </div>
      <h3 className="text-[20px] font-bold leading-[1.12] tracking-[-0.025em] text-dark">
        {pillar.headline}
      </h3>
      <p className="text-[13px] leading-[1.5] tracking-[-0.005em] text-gray">{pillar.body}</p>
      <ul role="list" className="mt-auto flex flex-wrap gap-[6px] pt-[6px]">
        {top.map((leaf) => (
          <li key={leaf.slug}>
            <a
              href={`${pillar.hubHref}${leaf.slug}/`}
              className="inline-block border border-border px-[8px] py-[4px] font-mono text-[11px] leading-none tracking-[-0.005em] text-gray no-underline transition-colors duration-[var(--duration-instant)] hover:border-[color:var(--pc)] hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {leaf.name}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={pillar.hubHref}
        className="inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[12px] font-bold uppercase tracking-[0.12em] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        style={{ color: pillar.color }}
      >
        {leaves.length} services
        <ArrowRight />
      </a>
    </li>
  )
}

/* ------------------------------ ICONS ------------------------------- */

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

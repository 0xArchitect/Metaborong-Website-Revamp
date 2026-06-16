import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Section } from '@/components/ui/section'
import { FaqSection } from '@/components/sections/faq'
import { pillars, getAllLeaves, type Pillar, type ChildService } from '@/components/sections/services-data'
import { SITE_ORIGIN } from '@/lib/seo'
import { caseStudyMeta, workSlugs, type CaseStudyMeta } from '@/lib/work'
import { SunsetBuilt } from '@/components/work/sunset-built'
import { SunsetResults } from '@/components/work/sunset-results'
import { SunsetTech } from '@/components/work/sunset-tech'
import { MagicBuilt } from '@/components/work/magic-built'
import { MagicResults } from '@/components/work/magic-results'
import { MagicTech } from '@/components/work/magic-tech'
import { WorkBuilt } from '@/components/work/work-built'
import { WorkTech, type TechNode } from '@/components/work/work-tech'
import { WorkResults } from '@/components/work/work-results'
import { UpgradeableMock, GovernanceMock, TreasuryMock } from '@/components/work/orbitx-mocks'
import { OrbitxEscrow } from '@/components/work/orbitx-escrow'
import { SsiMock, OnChainTrustMock, FraudDetectionMock } from '@/components/work/sedax-mocks'
import { SedaxZkp } from '@/components/work/sedax-zkp'
import { WorkDemoVideo } from '@/components/work/work-demo-video'
import { ContactCtaSection } from '@/components/sections/contact-cta'

export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const meta = caseStudyMeta[slug]
  if (!meta) return {}
  const url = `${SITE_ORIGIN}/work/${slug}`
  const ogTitle = meta.seoTitle ?? meta.title
  return {
    title: meta.seoTitle ?? meta.title.split(':')[0],
    description: meta.description,
    alternates: {
      canonical: url,
      types: { 'text/markdown': `${url}/raw.md` },
    },
    openGraph: {
      title: ogTitle,
      description: meta.description,
      url,
      type: 'article',
      images: [{ url: `${SITE_ORIGIN}/opengraph-image`, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: meta.description,
      images: [`${SITE_ORIGIN}/opengraph-image`],
    },
  }
}

function parseMarkdown(content: string) {
  const sections = content.split(/\n## /)
  let directAnswer = '', solution = '', results = '', faq = '', techApproach = ''

  for (let i = 1; i < sections.length; i++) {
    const text = sections[i]
    if (text.startsWith('Direct Answer')) directAnswer = text.replace(/^Direct Answer\n+/, '')
    else if (text.startsWith('What Metaborong Built')) solution = text.replace(/^What Metaborong Built\n+/, '')
    else if (text.startsWith('Results')) results = text.replace(/^Results\n+/, '')
    else if (text.startsWith('Frequently Asked Questions')) faq = text.replace(/^Frequently Asked Questions\n+/, '')
    else if (text.startsWith('Technical Approach')) techApproach = text.replace(/^Technical Approach\n+/, '')
  }

  const solutionParts = solution.split(/\n### /)
  const solutionIntro = solutionParts[0]
  const solutionFeatures: { title: string, body: string }[] = []
  for (let i = 1; i < solutionParts.length; i++) {
    const splitIndex = solutionParts[i].indexOf('\n')
    if (splitIndex !== -1) {
      solutionFeatures.push({ title: solutionParts[i].substring(0, splitIndex).trim(), body: solutionParts[i].substring(splitIndex + 1).trim() })
    } else {
      solutionFeatures.push({ title: solutionParts[i].trim(), body: '' })
    }
  }

  const faqItems: { q: string, a: string }[] = []
  if (faq) {
    const parts = faq.split(/\*\*(.*?)\*\*\n/)
    for (let i = 1; i < parts.length; i += 2) {
      faqItems.push({ q: parts[i].trim(), a: parts[i + 1].trim() })
    }
  }

  return { directAnswer, solutionIntro, solutionFeatures, results, faqItems, techApproach }
}

type ParsedContent = ReturnType<typeof parseMarkdown>

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = caseStudyMeta[slug]
  if (!meta) notFound()

  const filePath = path.join(process.cwd(), 'content', 'work', `${slug}.md`)
  let content = ''
  try { content = fs.readFileSync(filePath, 'utf8') } catch { notFound() }

  const parsed = parseMarkdown(content)

  if (slug === 'sunset') return <SunsetCaseStudy meta={meta} slug={slug} parsed={parsed} />
  if (slug === 'magic') return <MagicCaseStudy meta={meta} slug={slug} parsed={parsed} />
  if (slug === 'orbitx') return <OrbitxCaseStudy meta={meta} slug={slug} parsed={parsed} />
  if (slug === 'sedax') return <SedaxCaseStudy meta={meta} slug={slug} parsed={parsed} />
  // All published case studies have a dedicated branch; a meta entry without one
  // is not renderable.
  notFound()
}

// ─────────────────────────────────────────────────────────────────────────────
// Case-study branches. Each emits Article + BreadcrumbList + FAQPage JSON-LD and
// renders: Hero → Direct answer → Demo → What we built → Technical approach →
// Results → shared FAQ → Related services → CTA. The first migrated study was
// SunsetML; the four below share the WorkHero/Work* primitives.
// ─────────────────────────────────────────────────────────────────────────────

// Section bodies carry a trailing `---` rule (the markdown separator before the
// next `##`). Strip it so the parsed prose never feeds a stray rule into the
// downstream components.
function stripTrailingRule(s: string): string {
  return s.replace(/\s*\n-{3,}\s*$/, '').trim()
}

function SunsetCaseStudy({ meta, slug, parsed }: { meta: CaseStudyMeta; slug: string; parsed: ParsedContent }) {
  const { faqItems } = parsed
  const directAnswer = stripTrailingRule(parsed.directAnswer)
  const techApproach = stripTrailingRule(parsed.techApproach)
  const results = stripTrailingRule(parsed.results)
  const solutionIntro = stripTrailingRule(parsed.solutionIntro)
  const solutionFeatures = parsed.solutionFeatures.map((f) => ({ ...f, body: stripTrailingRule(f.body) }))
  const jsonLd = buildWorkJsonLd(meta, faqItems, slug)
  const related = resolveRelated('ai', SUNSET_RELATED_SLUGS)

  return (
    <main className="flex min-h-screen flex-col">
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <Nav />
      <WorkHero meta={meta} />

      {/* ── DIRECT ANSWER (citable, leads the body) ──────────────────────── */}
      {directAnswer && (
        <Section bg="default" maxWidth="xwide" className="pt-[48px] sm:pt-[72px] lg:pt-[100px] pb-[32px] sm:pb-[48px] lg:pb-[60px]">
          <div className="rounded-[16px] border border-border bg-bg-subtle p-[24px] sm:p-[32px] lg:p-[40px]">
            <span className="block h-[3px] w-[40px] bg-[#c43a00]" />
            <span className="mt-[18px] block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#c43a00]">In short · What is {meta.client ?? 'SunsetML'}?</span>
            <p className="mt-[14px] max-w-[46ch] text-[clamp(19px,2.3vw,28px)] font-bold tracking-[-0.025em] leading-[1.25] text-dark">
              {meta.client ?? 'SunsetML'} is an AI-native writing platform that embeds multi-model AI inside the editor, so writers research, draft, and refine without losing context.
            </p>
            <p className="mt-[14px] max-w-[60ch] text-[15px] sm:text-[16px] leading-[1.6] text-gray">
              Designed and engineered from scratch by Metaborong, as engineering partner and equity co-founder. Writers switch live across four frontier models without breaking flow.
            </p>
            <div className="mt-[22px] flex flex-wrap gap-[8px]">
              {['Contextual PromptBar', 'Live model switching', 'Real-time collaboration', 'Adaptive editor'].map((c) => (
                <span key={c} className="border border-border px-[10px] py-[5px] text-[13px] font-semibold text-gray">{c}</span>
              ))}
            </div>
          </div>
        </Section>
      )}

      <DemoVideo meta={meta} slug={slug} />
      <SunsetBuilt intro={solutionIntro} features={solutionFeatures} />

      {/* ── TECHNICAL APPROACH (routing pipeline, animated signal pulse) ──── */}
      {techApproach && (
        <Section bg="default" maxWidth="xwide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
          <SunsetTech />
        </Section>
      )}

      <SunsetResults results={results} />

      {/* ── FAQ (shared component) ───────────────────────────────────────── */}
      {faqItems.length > 0 && <FaqSection items={faqItems} />}

      <WorkRelatedServices related={related} title="How we build platforms like SunsetML" accent="#c43a00" />
      {/* Sunset-scoped warm accent ramp: deep-orange functional accent (AA-safe,
          same family as the #ff6b35 glows). Overrides the site terracotta locally. */}
      <div style={{ '--color-accent': '#c43a00', '--cta-color': '#c43a00', '--cta-hover': '#a83100' } as React.CSSProperties}>
        <ContactCtaSection />
      </div>
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGIC by Omagic AI — AEO re-architecture, same grammar as SunsetML. Hero →
// Direct answer → Demo → What we built (bespoke vignettes) → Technical approach
// (generation pipeline) → Results (qualitative) → shared FAQ → Related services
// → CTA. Per-slug accent #6d28d9 (AA-safe violet, the #a855f7 family).
// ─────────────────────────────────────────────────────────────────────────────

const MAGIC_RELATED_SLUGS = [
  'ai-video-generation',
  'generative-ai-development',
  'genai-apis-backend-integration',
]

function MagicCaseStudy({ meta, slug, parsed }: { meta: CaseStudyMeta; slug: string; parsed: ParsedContent }) {
  const { faqItems } = parsed
  const directAnswer = stripTrailingRule(parsed.directAnswer)
  const techApproach = stripTrailingRule(parsed.techApproach)
  const results = stripTrailingRule(parsed.results)
  const solutionIntro = stripTrailingRule(parsed.solutionIntro)
  const solutionFeatures = parsed.solutionFeatures.map((f) => ({ ...f, body: stripTrailingRule(f.body) }))
  const jsonLd = buildWorkJsonLd(meta, faqItems, slug)
  const related = resolveRelated('ai', MAGIC_RELATED_SLUGS)

  return (
    <main className="flex min-h-screen flex-col">
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <Nav />
      <WorkHero meta={meta} />

      {/* ── DIRECT ANSWER (citable, leads the body) ──────────────────────── */}
      {directAnswer && (
        <Section bg="default" maxWidth="xwide" className="pt-[48px] sm:pt-[72px] lg:pt-[100px] pb-[32px] sm:pb-[48px] lg:pb-[60px]">
          <div className="rounded-[16px] border border-border bg-bg-subtle p-[24px] sm:p-[32px] lg:p-[40px]">
            <span className="block h-[3px] w-[40px] bg-[#6d28d9]" />
            <span className="mt-[18px] block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#6d28d9]">In short · What is MAGIC?</span>
            <p className="mt-[14px] max-w-[52ch] text-[clamp(19px,2.3vw,28px)] font-bold tracking-[-0.025em] leading-[1.25] text-dark">
              MAGIC is an AI creative automation platform that turns a single product image into product videos, CGI scene visuals, and marketplace packshots, generated automatically and at scale without a photography studio.
            </p>
            <p className="mt-[14px] max-w-[60ch] text-[15px] sm:text-[16px] leading-[1.6] text-gray">
              Built ground-up by Metaborong as engineering partner for{' '}
              <a href="https://omagic.ai/" target="_blank" rel="noopener" className="font-semibold text-[#6d28d9] underline decoration-[#6d28d9]/30 underline-offset-2 hover:decoration-[#6d28d9]">Omagic AI</a>, using controlled generation pipelines built for brand consistency and production reliability across Amazon, Flipkart, Shopify, and Meta Ads.
            </p>
            <div className="mt-[22px] flex flex-wrap gap-[8px]">
              {['Image-to-video', 'Controlled generation', 'AI packshots', 'Multi-platform output'].map((c) => (
                <span key={c} className="border border-border px-[10px] py-[5px] text-[13px] font-semibold text-gray">{c}</span>
              ))}
            </div>
          </div>
        </Section>
      )}

      <DemoVideo meta={meta} slug={slug} />
      <MagicBuilt intro={solutionIntro} features={solutionFeatures} />

      {/* ── TECHNICAL APPROACH (generation pipeline) ─────────────────────── */}
      {techApproach && (
        <Section bg="default" maxWidth="xwide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
          <MagicTech />
        </Section>
      )}

      <MagicResults results={results} />

      {/* ── FAQ (shared component) ───────────────────────────────────────── */}
      {faqItems.length > 0 && <FaqSection items={faqItems} />}

      <WorkRelatedServices related={related} title="How we build platforms like MAGIC" accent="#6d28d9" />
      {/* MAGIC-scoped accent ramp: AA-safe violet (the #a855f7 hero-glow family). */}
      <div style={{ '--color-accent': '#6d28d9', '--cta-color': '#6d28d9', '--cta-hover': '#581ca8' } as React.CSSProperties}>
        <ContactCtaSection />
      </div>
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// OrbitX — stablecoin banking infrastructure. Same AEO grammar. Accent #0e7490
// (AA-safe teal, the #22d3ee hero-glow family); related = published Web3 leaves.
// ─────────────────────────────────────────────────────────────────────────────

const ORBITX_RELATED_SLUGS = ['smart-contract-development', 'defi-protocol-development', 'crypto-wallet-development']

const ORBITX_TECH_NODES: readonly TechNode[] = [
  { n: '01', name: 'Stablecoin rails', tech: 'USDC in and out', note: 'fiat and crypto workflows' },
  { n: '02', name: 'Smart contract core', tech: 'UUPS proxy · RBAC', note: 'upgradeable, permissioned', chips: ['Upgrade safety', 'Timelock delays', 'Multi-sig ops', 'On-chain audit'] },
  { n: '03', name: 'Treasury and yield', tech: 'Aave · Morpho on Base', note: 'yield on idle reserves' },
  { n: '04', name: 'Settlement', chips: ['Payments', 'Escrow', 'Treasury', 'Cross-border'], chipsActiveFirst: true },
]

const ORBITX_TECH_INTRO = "OrbitX runs as one cohesive banking protocol on Coinbase's Base network: an upgradeable contract core gated by timelock governance and role-based access, a USDC treasury earning DeFi yield, and an on-chain escrow that settles against milestones, all sharing one secure architecture."

function OrbitxCaseStudy({ meta, slug, parsed }: { meta: CaseStudyMeta; slug: string; parsed: ParsedContent }) {
  const { faqItems } = parsed
  const directAnswer = stripTrailingRule(parsed.directAnswer)
  const techApproach = stripTrailingRule(parsed.techApproach)
  const results = stripTrailingRule(parsed.results)
  const solutionIntro = stripTrailingRule(parsed.solutionIntro)
  const solutionFeatures = parsed.solutionFeatures.map((f) => ({ ...f, body: stripTrailingRule(f.body) }))
  const jsonLd = buildWorkJsonLd(meta, faqItems, slug)
  const related = resolveRelated('web3', ORBITX_RELATED_SLUGS)
  const mocks = [<UpgradeableMock key="u" />, <GovernanceMock key="g" />, <TreasuryMock key="t" />, <OrbitxEscrow key="e" />]

  return (
    <main className="flex min-h-screen flex-col">
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <Nav />
      <WorkHero meta={meta} />

      {directAnswer && (
        <Section bg="default" maxWidth="xwide" className="pt-[48px] sm:pt-[72px] lg:pt-[100px] pb-[32px] sm:pb-[48px] lg:pb-[60px]">
          <div className="rounded-[16px] border border-border bg-bg-subtle p-[24px] sm:p-[32px] lg:p-[40px]">
            <span className="block h-[3px] w-[40px] bg-[#0e7490]" />
            <span className="mt-[18px] block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#0e7490]">In short · What is OrbitX?</span>
            <p className="mt-[14px] max-w-[54ch] text-[clamp(19px,2.3vw,28px)] font-bold tracking-[-0.025em] leading-[1.25] text-dark">
              OrbitX is a stablecoin banking infrastructure platform that lets businesses spend, send, receive, and manage USDC-linked funds globally through smart contracts, treasury systems, and on-chain settlement.
            </p>
            <p className="mt-[14px] max-w-[62ch] text-[15px] sm:text-[16px] leading-[1.6] text-gray">
              Re-architected from an early MVP into production-grade banking infrastructure by Metaborong as development partner, on Coinbase&apos;s Base network.{' '}
              <a href="https://orbitxpay.com/" target="_blank" rel="noopener" className="font-semibold text-[#0e7490] underline decoration-[#0e7490]/30 underline-offset-2 hover:decoration-[#0e7490]">OrbitX</a> runs live in production.
            </p>
            <div className="mt-[22px] flex flex-wrap gap-[8px]">
              {['Smart contracts', 'USDC treasury', 'On-chain escrow', 'Timelock governance'].map((c) => (
                <span key={c} className="border border-border px-[10px] py-[5px] text-[13px] font-semibold text-gray">{c}</span>
              ))}
            </div>
          </div>
        </Section>
      )}

      <DemoVideo meta={meta} slug={slug} />
      <WorkBuilt intro={solutionIntro} features={solutionFeatures} mocks={mocks} accent="#0e7490" />

      {techApproach && (
        <Section bg="default" maxWidth="xwide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
          <WorkTech intro={ORBITX_TECH_INTRO} nodes={ORBITX_TECH_NODES} accent="#0e7490" />
        </Section>
      )}

      <WorkResults results={results} glow="#22d3ee" />
      {faqItems.length > 0 && <FaqSection items={faqItems} />}
      <WorkRelatedServices related={related} title="How we build platforms like OrbitX" accent="#0e7490" />
      {/* OrbitX-scoped accent ramp: AA-safe teal (the #22d3ee hero-glow family). */}
      <div style={{ '--color-accent': '#0e7490', '--cta-color': '#0e7490', '--cta-hover': '#0a5a70' } as React.CSSProperties}>
        <ContactCtaSection />
      </div>
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SEDAX — blockchain eKYC with Zero-Knowledge Proofs. Same AEO grammar. Accent
// #047857 (AA-safe emerald, the #10b981 hero-glow family); related = Web3 leaves.
// ─────────────────────────────────────────────────────────────────────────────

const SEDAX_RELATED_SLUGS = ['decentralized-identity-did-integration', 'smart-contract-development', 'enterprise-private-blockchain']

const SEDAX_TECH_NODES: readonly TechNode[] = [
  { n: '01', name: 'Identity claim', tech: 'Held in user wallet', note: 'W3C Verifiable Credentials' },
  { n: '02', name: 'Zero-Knowledge Proof', tech: 'Prove without revealing', note: 'no raw data transmitted', chips: ['Age', 'Nationality', 'Credential', 'Liveness'] },
  { n: '03', name: 'On-chain trust', tech: 'Issue · verify · revoke', note: 'tamper-evident ledger' },
  { n: '04', name: 'Verified', chips: ['Reusable KYC', 'KYC/AML audit', 'GDPR · DPDP', 'No PII stored'], chipsActiveFirst: true },
]

const SEDAX_TECH_INTRO = 'SEDAX verifies identity across three layers: claims held in a user-controlled wallet as W3C Verifiable Credentials, a Zero-Knowledge Proof core that confirms a claim without transmitting the underlying data, and a tamper-evident ledger recording issuance, verification, and revocation, with AI-assisted liveness and document checks guarding onboarding.'

function SedaxCaseStudy({ meta, slug, parsed }: { meta: CaseStudyMeta; slug: string; parsed: ParsedContent }) {
  const { faqItems } = parsed
  const directAnswer = stripTrailingRule(parsed.directAnswer)
  const techApproach = stripTrailingRule(parsed.techApproach)
  const results = stripTrailingRule(parsed.results)
  const solutionIntro = stripTrailingRule(parsed.solutionIntro)
  const solutionFeatures = parsed.solutionFeatures.map((f) => ({ ...f, body: stripTrailingRule(f.body) }))
  const jsonLd = buildWorkJsonLd(meta, faqItems, slug)
  const related = resolveRelated('web3', SEDAX_RELATED_SLUGS)
  const mocks = [<SedaxZkp key="z" />, <SsiMock key="s" />, <OnChainTrustMock key="t" />, <FraudDetectionMock key="f" />]

  return (
    <main className="flex min-h-screen flex-col">
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <Nav />
      <WorkHero meta={meta} />

      {directAnswer && (
        <Section bg="default" maxWidth="xwide" className="pt-[48px] sm:pt-[72px] lg:pt-[100px] pb-[32px] sm:pb-[48px] lg:pb-[60px]">
          <div className="rounded-[16px] border border-border bg-bg-subtle p-[24px] sm:p-[32px] lg:p-[40px]">
            <span className="block h-[3px] w-[40px] bg-[#3254fb]" />
            <span className="mt-[18px] block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#3254fb]">In short · What is SEDAX?</span>
            <p className="mt-[14px] max-w-[54ch] text-[clamp(19px,2.3vw,28px)] font-bold tracking-[-0.025em] leading-[1.25] text-dark">
              SEDAX is a blockchain eKYC platform that verifies identity with Zero-Knowledge Proofs, so users prove who they are without sharing the underlying personal data.
            </p>
            <p className="mt-[14px] max-w-[62ch] text-[15px] sm:text-[16px] leading-[1.6] text-gray">
              Built from the ground up by Metaborong as development partner on self-sovereign identity and W3C Verifiable Credentials.{' '}
              <a href="https://www.sedax.in/" target="_blank" rel="noopener" className="font-semibold text-[#3254fb] underline decoration-[#3254fb]/30 underline-offset-2 hover:decoration-[#3254fb]">SEDAX</a> replaces centralized document collection with privacy-first, reusable verification.
            </p>
            <div className="mt-[22px] flex flex-wrap gap-[8px]">
              {['Zero-Knowledge Proofs', 'Self-sovereign identity', 'Verifiable credentials', 'Reusable KYC'].map((c) => (
                <span key={c} className="border border-border px-[10px] py-[5px] text-[13px] font-semibold text-gray">{c}</span>
              ))}
            </div>
          </div>
        </Section>
      )}

      <DemoVideo meta={meta} slug={slug} />
      <WorkBuilt intro={solutionIntro} features={solutionFeatures} mocks={mocks} accent="#3254fb" />

      {techApproach && (
        <Section bg="default" maxWidth="xwide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
          <WorkTech intro={SEDAX_TECH_INTRO} nodes={SEDAX_TECH_NODES} accent="#3254fb" />
        </Section>
      )}

      <WorkResults results={results} glow="#3254fb" />
      {faqItems.length > 0 && <FaqSection items={faqItems} />}
      <WorkRelatedServices related={related} title="How we build platforms like SEDAX" accent="#3254fb" />
      {/* SEDAX-scoped accent ramp: electric blue matching hero glow */}
      <div style={{ '--color-accent': '#3254fb', '--cta-color': '#3254fb', '--cta-hover': '#2642d9' } as React.CSSProperties}>
        <ContactCtaSection />
      </div>
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared blocks — used by every case-study branch.
// ─────────────────────────────────────────────────────────────────────────────

function WorkHero({ meta }: { meta: CaseStudyMeta }) {
  const client = meta.client ?? meta.title.split(':')[0]
  // Visible authorship + publish date (E-E-A-T). Only migrated studies carry a
  // datePublished; legacy slugs render unchanged.
  const publishedLabel = meta.datePublished
    ? new Date(meta.datePublished).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : null

  const [titlePrefix, ...titleSuffixParts] = meta.title.split(':')
  const titleSuffix = titleSuffixParts.length > 0 ? titleSuffixParts.join(':').trim() : null

  return (
    <section className={`relative flex flex-col justify-end overflow-hidden bg-[#0a0a0a] ${meta.bannerLogo ? 'min-h-0 pt-[80px] sm:pt-[96px] lg:pt-[112px]' : 'min-h-[100svh] pt-[100px] sm:pt-[120px] lg:pt-[160px]'}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {meta.bannerLogo ? (
          <>
            {/* Top black section to ensure Nav and Eyebrow are super clear */}
            <div className="absolute top-0 inset-x-0 h-[50%] bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />

            {/* Ambient glow for banner layout — shifted upwards */}
            <div
              className="absolute bottom-[10%] left-[-20%] right-[-20%] h-[80vh] mix-blend-screen opacity-50 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 75%, ${meta.glowColor ?? '#3b5bff'} 0%, transparent 70%)`,
                filter: 'blur(120px)',
              }}
            />
            {/* Secondary bloom, shifted upwards slightly */}
            <div
              className="absolute bottom-[5%] left-[-10%] right-[-10%] h-[40vh] opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 75%, ${meta.glowColor ?? '#3b5bff'} 0%, transparent 60%)`,
                filter: 'blur(100px)',
              }}
            />
          </>
        ) : (
          <>
            {/* Primary orb — behind logo, large + very blurry for soft bloom */}
            <div
              className="absolute rounded-full"
              style={{
                top: '-10%', right: '-10%',
                width: '70%', height: '70%',
                background: `radial-gradient(ellipse at center, ${meta.glowColor ?? '#3b5bff'}55 0%, transparent 70%)`,
                filter: 'blur(60px)',
              }}
            />
            {/* Tight bright inner core */}
            <div
              className="absolute rounded-full"
              style={{
                top: '0%', right: '0%',
                width: '40%', height: '45%',
                background: `radial-gradient(ellipse at top right, ${meta.glowColor ?? '#3b5bff'}88 0%, transparent 60%)`,
                filter: 'blur(40px)',
              }}
            />
            {/* Subtle secondary scatter bloom */}
            <div
              className="absolute rounded-full mix-blend-screen"
              style={{
                top: '15%', right: '5%',
                width: '35%', height: '40%',
                background: `radial-gradient(ellipse at center, ${meta.glowColor ?? '#3b5bff'}44 0%, transparent 55%)`,
                filter: 'blur(80px)',
                opacity: 0.6,
              }}
            />
            {/* Dark vignette bottom-left keeps text readable */}
            <div className="absolute bottom-0 left-0 h-[65%] w-[65%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.9),transparent_65%)]" />
            {/* Hard bottom fade to solid black */}
            <div className="absolute bottom-0 inset-x-0 h-[35%] bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </>
        )}
      </div>

      {/* Animated Logo — floats with glow underneath, NO hard box (Only for Square Logo) */}
      {!meta.bannerLogo && (
        meta.liveLink ? (
          <a
            href={meta.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[72px] sm:top-[88px] lg:top-[100px] right-[16px] sm:right-[24px] md:right-[40px] lg:right-[80px] xl:right-[128px] w-[110px] sm:w-[150px] md:w-[190px] lg:w-[240px] aspect-square group block z-20"
            aria-label={`Visit ${client} live website`}
          >
            {/* Soft coloured glow halo beneath the logo */}
            <div
              className="absolute inset-[-20%] rounded-full opacity-100 group-hover:opacity-80 transition-opacity duration-300"
              style={{
                background: `radial-gradient(ellipse at center, ${meta.glowColor ?? '#3b5bff'}33 0%, transparent 65%)`,
                filter: 'blur(24px)',
              }}
            />
            {meta.animatedLogo ? (
              <video
                src={meta.animatedLogo}
                autoPlay muted loop playsInline
                aria-hidden="true"
                className={`relative w-full h-full object-cover rounded-[16px] sm:rounded-[20px] transition-transform duration-[400ms] ease-out group-hover:scale-[1.03] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]${meta.blendLogo ? ' mix-blend-screen' : ''}`}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-[400ms] ease-out group-hover:scale-105">
                <img src={meta.logo} alt="" className="h-[40px] sm:h-[56px] object-contain invert opacity-80" />
              </div>
            )}
          </a>
        ) : (
          <div className="absolute top-[72px] sm:top-[88px] lg:top-[100px] right-[16px] sm:right-[24px] md:right-[40px] lg:right-[80px] xl:right-[128px] w-[110px] sm:w-[150px] md:w-[190px] lg:w-[240px] aspect-square z-20">
            {/* Soft coloured glow halo beneath the logo */}
            <div
              className="absolute inset-[-20%] rounded-full"
              style={{
                background: `radial-gradient(ellipse at center, ${meta.glowColor ?? '#3b5bff'}33 0%, transparent 65%)`,
                filter: 'blur(24px)',
              }}
            />
            {meta.animatedLogo ? (
              <video
                src={meta.animatedLogo}
                autoPlay muted loop playsInline
                aria-hidden="true"
                className={`relative w-full h-full object-cover rounded-[16px] sm:rounded-[20px]${meta.blendLogo ? ' mix-blend-screen' : ''}`}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={meta.logo} alt="" className="h-[40px] sm:h-[56px] object-contain invert opacity-80" />
              </div>
            )}
          </div>
        )
      )}

      {/* Main Content Flow */}
      <div className={`relative z-10 mx-auto w-full max-w-[1280px] px-[16px] sm:px-[24px] md:px-[48px] lg:px-[80px] xl:px-[128px] flex flex-col ${meta.bannerLogo ? 'pb-[24px] sm:pb-[40px]' : 'flex-1 justify-end pb-[48px] sm:pb-[64px] lg:pb-[100px]'}`}>
        
        {/* Eyebrow & Breadcrumb */}
        <div className={meta.bannerLogo ? 'mb-[8px] sm:mb-[16px] shrink-0' : 'mb-[16px]'}>
          <Link
            href="/#work"
            className="group -my-[14px] inline-flex items-center gap-[7px] py-[14px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-white/65 transition-colors duration-[var(--duration-fast)] hover:text-white"
          >
            <ArrowLeft
              size={13}
              strokeWidth={2.5}
              aria-hidden
              className="transition-transform duration-[var(--duration-base)] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[3px]"
            />
            <span className="relative inline-block">
              All Work
              <span
                aria-hidden
                className="absolute -bottom-[3px] left-0 h-[1px] w-full origin-left scale-x-0 bg-white/70 transition-transform duration-[var(--duration-base)] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </span>
          </Link>
        </div>

        {/* LinkedIn-style Horizontal Banner */}
        {meta.bannerLogo && (
          meta.liveLink ? (
            <a
              href={meta.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full h-[25vh] min-h-[180px] sm:min-h-[260px] lg:min-h-[340px] max-h-[450px] rounded-[16px] sm:rounded-[24px] overflow-hidden group block pointer-events-auto shrink-0 mb-[16px] sm:mb-[24px] z-0"
              aria-label={`Visit ${client} live website`}
            >
              {/* Edge blending removed per user request */}
              {meta.animatedLogo ? (
                <video
                  src={meta.animatedLogo}
                  autoPlay muted loop playsInline
                  aria-hidden="true"
                  className={`relative z-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]${meta.blendLogo ? ' mix-blend-screen' : ''}`}
                />
              ) : (
                <div className="relative z-0 w-full h-full flex items-center justify-center bg-white/5">
                  <img src={meta.logo} alt="" className="h-[40px] sm:h-[64px] object-contain invert opacity-80 transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]" />
                </div>
              )}
            </a>
          ) : (
            <div className="relative w-full h-[25vh] min-h-[180px] sm:min-h-[260px] lg:min-h-[340px] max-h-[450px] rounded-[16px] sm:rounded-[24px] overflow-hidden group block pointer-events-none shrink-0 mb-[16px] sm:mb-[24px] z-0">
              {/* Edge blending removed per user request */}
              {meta.animatedLogo ? (
                <video
                  src={meta.animatedLogo}
                  autoPlay muted loop playsInline
                  aria-hidden="true"
                  className={`relative z-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]${meta.blendLogo ? ' mix-blend-screen' : ''}`}
                />
              ) : (
                <div className="relative z-0 w-full h-full flex items-center justify-center bg-white/5">
                  <img src={meta.logo} alt="" className="h-[40px] sm:h-[64px] object-contain invert opacity-80 transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]" />
                </div>
              )}
            </div>
          )
        )}

        {/* Title and Metadata */}
        <div className={`relative z-10 ${meta.bannerLogo ? 'mt-auto' : ''}`}>
          {titleSuffix ? (
            <h2 className={`text-[clamp(24px,3.5vw,48px)] font-medium tracking-[-0.02em] leading-[1.1] text-white/80 ${meta.bannerLogo ? 'max-w-full' : 'max-w-[min(620px,70vw)] sm:max-w-[min(700px,72vw)] lg:max-w-[900px]'} pr-[16px] ${publishedLabel ? 'mb-[16px] sm:mb-[24px]' : 'mb-[24px] sm:mb-[32px]'}`}>
              {titleSuffix}
            </h2>
          ) : (
            <h1 className={`text-[clamp(28px,5vw,80px)] font-bold tracking-[-0.04em] leading-[1.0] text-white pr-[16px] ${meta.bannerLogo ? 'max-w-full' : 'max-w-[min(620px,70vw)] sm:max-w-[min(700px,72vw)] lg:max-w-[900px]'} ${publishedLabel ? 'mb-[24px] sm:mb-[32px]' : 'mb-[40px] sm:mb-[56px]'}`}>
              {meta.title}
            </h1>
          )}
          {publishedLabel && (
            <p className="mb-[40px] sm:mb-[56px] text-[13px] sm:text-[14px] font-medium text-white/55">
              By Metaborong, {meta.bylineRole ?? 'engineering partner and equity co-founder'}
              <span className="mx-[8px] text-white/30">·</span>
              Published {publishedLabel}
            </p>
          )}
          <div className="flex flex-wrap gap-x-[32px] sm:gap-x-[48px] gap-y-[20px] border-t border-white/10 pt-[28px] sm:pt-[36px]">
            {[
              { label: 'Client', value: client },
              { label: 'Category', value: meta.category },
              { label: 'Services', value: meta.services ?? 'Platform Engineering' },
              { label: 'Year', value: meta.year ?? '2024' },
            ].map(item => (
              <div key={item.label} className="flex flex-col gap-[6px]">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{item.label}</span>
                <span className="text-[13px] sm:text-[15px] font-medium text-white/80">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoVideo({ meta, slug }: { meta: CaseStudyMeta; slug: string }) {
  return (
    <Section bg="default" maxWidth="xwide" className="pb-[48px] sm:pb-[72px] lg:pb-[100px]">
      <div className={`w-full aspect-video sm:aspect-[16/9] lg:aspect-[21/9] rounded-[12px] sm:rounded-[20px] lg:rounded-[24px] bg-canvas border border-border/10 shadow-xl flex items-center justify-center relative overflow-hidden${meta.demoVideo ? '' : ' group cursor-pointer'}`}>
        {meta.demoVideo ? (
          <WorkDemoVideo src={meta.demoVideo} poster={meta.demoPoster} label={`${meta.appName ?? meta.client ?? meta.title.split(':')[0]} product demo`} />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
            <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all duration-500 z-10">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[17px] border-l-white border-b-[10px] border-b-transparent ml-[4px]" />
            </div>
            <div className="absolute bottom-[16px] sm:bottom-[24px] left-[16px] sm:left-[24px] right-[16px] sm:right-[24px] flex justify-between items-center text-white/50 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase z-10">
              <span className="flex items-center gap-[8px]"><span className="w-[6px] h-[6px] bg-red-500 rounded-full animate-pulse" />{slug} Demo</span>
              <span className="hidden sm:inline">00:00 / 02:45</span>
            </div>
          </>
        )}
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Related services — internal links from a case study to published
// AI service leaves. Resolved + filtered to published so a coming-soon leaf is
// dropped silently.
// ─────────────────────────────────────────────────────────────────────────────

const SUNSET_RELATED_SLUGS = [
  'generative-ai-development',
  'ai-copilots-internal-tools',
  'genai-apis-backend-integration',
]

function resolveRelated(pillarId: string, slugs: string[]): { pillar: Pillar; leaf: ChildService }[] {
  const pillar = pillars.find((p) => p.id === pillarId)
  if (!pillar) return []
  const leaves = getAllLeaves(pillar)
  return slugs.map((slug) => leaves.find((l) => l.slug === slug && l.status === 'published'))
    .filter((l): l is ChildService => Boolean(l))
    .map((leaf) => ({ pillar, leaf }))
}

function WorkRelatedServices({ related, title, accent }: { related: { pillar: Pillar; leaf: ChildService }[]; title: string; accent: string }) {
  if (related.length === 0) return null
  return (
    <Section bg="subtle" maxWidth="xwide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
      <div className="mb-[32px] sm:mb-[40px]">
        <h2 className="mb-[16px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>Related services</h2>
        <p className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.025em] leading-[1.1] text-dark max-w-[640px]">
          {title}
        </p>
      </div>
      <ul role="list" className="border-t border-border" style={{ '--rs-accent': accent } as React.CSSProperties}>
        {related.map(({ pillar, leaf }) => (
          <li key={leaf.slug} className="border-b border-border">
            <Link
              href={`${pillar.hubHref}${leaf.slug}/`}
              className="group grid grid-cols-[1fr_auto] items-center gap-[20px] py-[20px] px-[16px] md:px-[24px] -mx-[16px] md:-mx-[24px] rounded-[12px] md:rounded-[16px] no-underline transition-colors duration-[var(--duration-fast)] hover:bg-bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rs-accent)] focus-visible:ring-inset md:py-[24px]"
            >
              <div className="min-w-0">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: accent }}>{pillar.label}</span>
                <h3 className="mt-[6px] text-[17px] font-semibold tracking-[-0.02em] leading-[1.3] text-dark md:text-[19px]">{leaf.name}</h3>
                <p className="mt-[4px] max-w-[68ch] text-[14px] leading-[1.55] text-gray">{leaf.description}</p>
              </div>
              <span className="flex shrink-0 items-center justify-center text-gray transition-[transform,color] duration-[var(--duration-fast)] group-hover:translate-x-[6px] group-hover:text-[var(--rs-accent)] motion-reduce:group-hover:translate-x-0 mr-2">
                <span aria-hidden="true" className="text-[22px] sm:text-[26px] md:text-[30px] font-light leading-none">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD — Article + BreadcrumbList + FAQPage. Slug-agnostic: every migrated
// case study (sunset, magic, …) emits the same three blocks from its meta.
// ─────────────────────────────────────────────────────────────────────────────

function buildWorkJsonLd(meta: CaseStudyMeta, faqItems: { q: string; a: string }[], slug: string): Record<string, unknown>[] {
  const url = `${SITE_ORIGIN}/work/${slug}`
  const appName = meta.appName ?? meta.client ?? meta.title.split(':')[0]
  const publisher = {
    '@type': 'Organization',
    name: 'Metaborong',
    url: SITE_ORIGIN,
    logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo.png` },
  }

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: `${SITE_ORIGIN}/opengraph-image`,
    datePublished: meta.datePublished,
    dateModified: meta.datePublished,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: { '@type': 'Organization', name: 'Metaborong', url: SITE_ORIGIN },
    publisher,
    about: { '@type': 'SoftwareApplication', name: appName, applicationCategory: meta.appCategory ?? 'Software' },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_ORIGIN}/#work` },
      { '@type': 'ListItem', position: 3, name: appName, item: url },
    ],
  }

  const blocks: Record<string, unknown>[] = [article, breadcrumb]

  if (faqItems.length > 0) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((qa) => ({
        '@type': 'Question',
        name: qa.q,
        acceptedAnswer: { '@type': 'Answer', text: qa.a },
      })),
    })
  }

  return blocks
}

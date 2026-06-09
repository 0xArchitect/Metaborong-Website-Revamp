import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Markdown } from '@/components/ui/markdown'
import { Section } from '@/components/ui/section'
import { FaqSection } from '@/components/sections/faq'
import { pillars, getAllLeaves, type Pillar, type ChildService } from '@/components/sections/services-data'
import { SITE_ORIGIN } from '@/lib/seo'
import { caseStudyMeta, type CaseStudyMeta } from '@/lib/work'
import { SunsetBuilt } from '@/components/work/sunset-built'
import { SunsetResults } from '@/components/work/sunset-results'
import { SunsetTech } from '@/components/work/sunset-tech'
import { WorkDemoVideo } from '@/components/work/work-demo-video'
import { ContactCtaSection } from '@/components/sections/contact-cta'

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
  let directAnswer = '', overview = '', problem = '', solution = '', results = '', faq = '', tech = '', techApproach = '', industry = ''

  for (let i = 1; i < sections.length; i++) {
    const text = sections[i]
    if (text.startsWith('Direct Answer')) directAnswer = text.replace(/^Direct Answer\n+/, '')
    else if (text.startsWith('Overview')) overview = text.replace(/^Overview\n+/, '')
    else if (text.startsWith('The Problem')) problem = text.replace(/^The Problem\n+/, '')
    else if (text.startsWith('What Metaborong Built')) solution = text.replace(/^What Metaborong Built\n+/, '')
    else if (text.startsWith('Results')) results = text.replace(/^Results\n+/, '')
    else if (text.startsWith('Frequently Asked Questions')) faq = text.replace(/^Frequently Asked Questions\n+/, '')
    else if (text.startsWith('Technologies') || text.startsWith('Technology Stack')) tech = text.replace(/^(Technologies|Technology Stack)\n+/, '')
    else if (text.startsWith('Technical Approach')) techApproach = text.replace(/^Technical Approach\n+/, '')
    else if (text.startsWith('Industry Applications')) industry = text.replace(/^Industry Applications\n+/, '')
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

  const techItems: { category: string, items: string[] }[] = []
  if (tech) {
    const lines = tech.split('\n').filter(l => l.includes('**'))
    lines.forEach(line => {
      const match = line.match(/\*\*(.*?):\*\*(.*)/)
      if (match) {
        techItems.push({ category: match[1].trim(), items: match[2].split(',').map(i => i.trim()) })
      }
    })
  }

  return { directAnswer, overview, problem, solutionIntro, solutionFeatures, results, faqItems, techItems, techApproach, industry }
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
  return <LegacyCaseStudy meta={meta} slug={slug} parsed={parsed} />
}

// ─────────────────────────────────────────────────────────────────────────────
// SunsetML — AEO re-architecture. Hero → Direct answer → Problem → Demo →
// What we built → Technical approach → Results → Tech marquee → shared FAQ →
// Related services → CTA. Emits Article + BreadcrumbList + FAQPage JSON-LD.
// Other case studies stay on <LegacyCaseStudy> until their own migration.
// ─────────────────────────────────────────────────────────────────────────────

// Section bodies carry a trailing `---` rule (the markdown separator before the
// next `##`). The legacy grid render filtered it out incidentally; the prose
// blocks below render via <Markdown>, so strip it to avoid a stray <hr>.
function stripTrailingRule(s: string): string {
  return s.replace(/\s*\n-{3,}\s*$/, '').trim()
}

function SunsetCaseStudy({ meta, slug, parsed }: { meta: CaseStudyMeta; slug: string; parsed: ParsedContent }) {
  const { faqItems } = parsed
  const directAnswer = stripTrailingRule(parsed.directAnswer)
  const problem = stripTrailingRule(parsed.problem)
  const techApproach = stripTrailingRule(parsed.techApproach)
  const results = stripTrailingRule(parsed.results)
  const solutionIntro = stripTrailingRule(parsed.solutionIntro)
  const solutionFeatures = parsed.solutionFeatures.map((f) => ({ ...f, body: stripTrailingRule(f.body) }))
  const jsonLd = buildSunsetJsonLd(meta, faqItems, slug)
  const related = resolveSunsetRelated()

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
          <div className="grid grid-cols-1 gap-[12px] lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-[80px]">
            <div>
              <h2 className="mb-[10px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand">In short</h2>
              <p className="text-[clamp(20px,2.6vw,32px)] font-bold tracking-[-0.025em] leading-[1.15] text-dark">What is {meta.client ?? 'SunsetML'}?</p>
            </div>
            <div className="text-[17px] sm:text-[19px] leading-[1.6] text-dark [&_p]:mb-[16px] [&_p:last-child]:mb-0">
              <Markdown content={directAnswer} />
            </div>
          </div>
        </Section>
      )}

      {/* ── PROBLEM (standalone) ─────────────────────────────────────────── */}
      {problem && (
        <Section bg="default" maxWidth="xwide" className="pb-[32px] sm:pb-[48px] lg:pb-[60px]">
          <div className="max-w-[800px]">
            <h2 className="mb-[20px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-accent">The Problem</h2>
            <div className="text-[16px] sm:text-[18px] leading-[1.7] text-gray">
              <Markdown content={problem} />
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

      <SunsetRelatedServices related={related} />
      <ContactCtaSection />
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy case-study render — preserves the original fixed pipeline + styling
// byte-for-byte for magic / orbitx / sedax until each is migrated.
// ─────────────────────────────────────────────────────────────────────────────

function LegacyCaseStudy({ meta, slug, parsed }: { meta: CaseStudyMeta; slug: string; parsed: ParsedContent }) {
  const { overview, problem, solutionIntro, solutionFeatures, results, faqItems, techItems, techApproach, industry } = parsed
  const allTech = techItems.flatMap(t => t.items)

  return (
    <main className="flex min-h-screen flex-col">
      <Nav />
      <WorkHero meta={meta} />

      {/* ── OVERVIEW & PROBLEM ───────────────────────────────────────────── */}
      <Section bg="default" maxWidth="xwide" className="pt-[48px] sm:pt-[72px] lg:pt-[100px] pb-[32px] sm:pb-[48px] lg:pb-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] xl:gap-[120px]">
          <div>
            <h2 className="mb-[20px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand">Overview</h2>
            <div className="text-[16px] sm:text-[18px] leading-[1.7] text-dark">
              <Markdown content={overview} />
            </div>
          </div>
          <div className="rounded-[12px] bg-bg-raised p-[24px] sm:p-[40px] border border-border">
            <h2 className="mb-[20px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-accent">The Problem</h2>
            <div className="text-[15px] sm:text-[16px] leading-[1.7] text-gray">
              <Markdown content={problem} />
            </div>
          </div>
        </div>
      </Section>

      <DemoVideo meta={meta} slug={slug} />
      <SolutionFeatures solutionIntro={solutionIntro} solutionFeatures={solutionFeatures} />
      <TechApproachIndustry techApproach={techApproach} industry={industry} />
      <ResultsBand results={results} />
      <TechMarquee allTech={allTech} />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      {faqItems.length > 0 && (
        <Section bg="default" maxWidth="wide" className="py-[48px] sm:py-[72px] lg:py-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] sm:gap-[48px] lg:gap-[80px]">
            <div className="md:col-span-4">
              <h2 className="text-[clamp(24px,3.5vw,40px)] font-bold tracking-[-0.035em] text-dark leading-[1.1]">
                Frequently<br />Asked Questions
              </h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-[12px] sm:gap-[16px]">
              {faqItems.map((item, i) => (
                <details key={i} className="group border border-border bg-bg-raised rounded-[8px] overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-[16px] sm:p-[24px] text-[14px] sm:text-[16px] font-bold tracking-[-0.01em] text-dark transition-colors hover:bg-bg-subtle outline-none focus-visible:ring-2 focus-visible:ring-brand">
                    <span className="pr-[16px]">{item.q}</span>
                    <span className="flex-shrink-0 flex h-[22px] w-[22px] sm:h-[24px] sm:w-[24px] items-center justify-center rounded-full border border-border text-[13px] transition-transform duration-300 group-open:rotate-180">↓</span>
                  </summary>
                  <div className="px-[16px] sm:px-[24px] pb-[16px] sm:pb-[24px] text-[14px] sm:text-[15px] leading-[1.65] text-gray">
                    <Markdown content={item.a} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      )}

      <WorkCta />
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared blocks — rendered identically by both paths.
// ─────────────────────────────────────────────────────────────────────────────

function WorkHero({ meta }: { meta: CaseStudyMeta }) {
  const client = meta.client ?? meta.title.split(':')[0]
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0a0a0a] pt-[100px] sm:pt-[120px] lg:pt-[160px]">
      {/*
        Gradient system: soft, massively-blurred orbs that blend seamlessly.
        The primary orb sits behind/around the logo (top-right).
        Color comes from per-project glowColor metadata.
      */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
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
      </div>

      {/* Animated Logo — floats with glow underneath, NO hard box */}
      <div
        className="absolute top-[72px] sm:top-[88px] lg:top-[100px] right-[16px] sm:right-[24px] md:right-[40px] lg:right-[80px] xl:right-[128px]
                   w-[110px] sm:w-[150px] md:w-[190px] lg:w-[240px] aspect-square"
      >
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
            className="relative w-full h-full object-cover rounded-[16px] sm:rounded-[20px]"
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={meta.logo} alt="" className="h-[40px] sm:h-[56px] object-contain invert opacity-80" />
          </div>
        )}
      </div>

      {/* Hero text */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-[16px] sm:px-[24px] md:px-[48px] lg:px-[80px] xl:px-[128px] pb-[48px] sm:pb-[64px] lg:pb-[100px]">
        <Link
          href="/#work"
          className="group -my-[12px] mb-[8px] inline-flex items-center gap-[5px] py-[12px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-white/50 transition-colors duration-[var(--duration-instant)] hover:text-white"
        >
          <span className="transition-transform duration-[var(--duration-instant)] group-hover:-translate-x-[2px] inline-block">←</span>
          <span>All Work</span>
        </Link>
        <span className="block mb-[20px] font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand">{meta.category}</span>
        {/* Title must not overlap the logo on mobile — cap width */}
        <h1 className="text-[clamp(28px,5vw,80px)] font-bold tracking-[-0.04em] leading-[1.0] text-white max-w-[min(620px,70vw)] sm:max-w-[min(700px,72vw)] lg:max-w-[900px] mb-[40px] sm:mb-[56px]">
          {meta.title}
        </h1>
        <div className="flex flex-wrap gap-x-[32px] sm:gap-x-[48px] gap-y-[20px] border-t border-white/10 pt-[28px] sm:pt-[36px]">
          {[
            { label: 'Client', value: client },
            { label: 'Category', value: meta.category },
            { label: 'Services', value: meta.services ?? 'Platform Engineering' },
            { label: 'Year', value: meta.year ?? '2024' },
          ].map(item => (
            <div key={item.label} className="flex flex-col gap-[6px]">
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{item.label}</span>
              <span className="text-[13px] sm:text-[15px] font-medium text-white/80">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoVideo({ meta, slug }: { meta: CaseStudyMeta; slug: string }) {
  return (
    <Section bg="default" maxWidth="xwide" className="pb-[48px] sm:pb-[72px] lg:pb-[100px]">
      <div className="w-full aspect-video sm:aspect-[16/9] lg:aspect-[21/9] rounded-[12px] sm:rounded-[20px] lg:rounded-[24px] bg-canvas border border-border/10 shadow-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
        {meta.demoVideo ? (
          <WorkDemoVideo src={meta.demoVideo} poster={meta.demoPoster} />
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

function SolutionFeatures({ solutionIntro, solutionFeatures }: { solutionIntro: string; solutionFeatures: { title: string; body: string }[] }) {
  return (
    <Section bg="default" maxWidth="wide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
      <div className="mb-[48px] sm:mb-[72px] lg:mb-[100px] max-w-[800px]">
        <h2 className="mb-[20px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand">What Metaborong Built</h2>
        <div className="text-[18px] sm:text-[22px] md:text-[26px] leading-[1.45] tracking-[-0.02em] text-dark font-bold">
          <Markdown content={solutionIntro} />
        </div>
      </div>

      {solutionFeatures.length > 0 && (
        <div className="flex flex-col gap-[56px] sm:gap-[80px] lg:gap-[120px]">
          {solutionFeatures.map((feat, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[400px_1fr] gap-[24px] sm:gap-[32px] lg:gap-[64px] items-start">
              <div className="flex flex-row lg:flex-col gap-[16px] sm:gap-[20px] items-start">
                <span className="flex-shrink-0 flex h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] items-center justify-center rounded-full bg-brand text-white font-mono font-bold text-[13px] sm:text-[15px] shadow-lg shadow-brand/20">
                  0{i + 1}
                </span>
                <h3 className="text-[22px] sm:text-[28px] lg:text-[36px] font-bold tracking-[-0.03em] text-dark leading-[1.1] lg:sticky lg:top-[100px]">{feat.title}</h3>
              </div>
              <div className="pt-0 lg:pt-[8px]">
                <Markdown content={feat.body} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}

function TechApproachIndustry({ techApproach, industry }: { techApproach: string; industry: string }) {
  if (!techApproach && !industry) return null
  return (
    <Section bg="default" maxWidth="wide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
      {techApproach && (
        <div className="mb-[56px] sm:mb-[72px]">
          <h2 className="mb-[32px] sm:mb-[40px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Technical Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-border/40 rounded-[16px] sm:rounded-[20px] overflow-hidden">
            {techApproach.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('*')).map((line, i) => (
              <div key={i} className="bg-white p-[20px] sm:p-[28px] lg:p-[32px] flex flex-col gap-[12px] hover:bg-bg-subtle transition-colors duration-300">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-brand/50 tracking-[0.2em]">0{i + 1}</span>
                <p className="text-[14px] sm:text-[15px] font-medium leading-[1.6] text-dark tracking-[-0.01em]">
                  {line.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {industry && (
        <div>
          <h2 className="mb-[32px] sm:mb-[40px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Industry Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-border/40 rounded-[16px] sm:rounded-[20px] overflow-hidden">
            {industry.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('*')).map((line, i) => (
              <div key={i} className="bg-white p-[20px] sm:p-[28px] lg:p-[32px] flex flex-col gap-[12px] hover:bg-bg-subtle transition-colors duration-300">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-brand/50 tracking-[0.2em]">0{i + 1}</span>
                <p className="text-[14px] sm:text-[15px] font-medium leading-[1.6] text-dark tracking-[-0.01em]">
                  {line.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}

function ResultsBand({ results }: { results: string }) {
  if (!results) return null
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-[64px] sm:py-[100px] lg:py-[140px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-[60%] w-[50%] bg-[radial-gradient(ellipse_at_top_left,#3b5bff40,transparent_65%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-[16px] sm:px-[24px] md:px-[48px] lg:px-[80px] xl:px-[128px]">
        <h2 className="mb-[40px] sm:mb-[56px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Results & Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[20px] lg:gap-[24px]">
          {results.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('*')).map((line, i) => {
            const raw = line.replace(/^[-*]\s*/, '')
            const colonIdx = raw.indexOf(':')
            const splitAt = colonIdx > 0 ? colonIdx : -1
            const metric = splitAt > 0 ? raw.substring(0, splitAt).replace(/\*\*(.*?)\*\*/g, '$1') : ''
            const desc = splitAt > 0 ? raw.substring(splitAt + 1).trim().replace(/\*\*(.*?)\*\*/g, '$1') : raw.replace(/\*\*(.*?)\*\*/g, '$1')
            return (
              <div key={i} className="flex flex-col gap-[20px] sm:gap-[24px] rounded-[16px] sm:rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-[24px] sm:p-[32px] lg:p-[40px] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 group">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white/20 tracking-[0.2em]">0{i + 1}</span>
                <div className="flex flex-col gap-[10px]">
                  {metric ? (
                    <>
                      <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-white">{metric}</p>
                      <p className="text-[13px] sm:text-[14px] font-medium leading-[1.6] text-white/40">{desc}</p>
                    </>
                  ) : (
                    <p className="text-[14px] sm:text-[15px] font-medium leading-[1.6] text-white/70">{desc}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TechMarquee({ allTech }: { allTech: string[] }) {
  if (allTech.length === 0) return null
  return (
    <section className="bg-bg-subtle py-[48px] sm:py-[64px] overflow-hidden border-t border-b border-border">
      <div className="relative flex w-full">
        <div className="flex w-fit animate-marquee items-center gap-[28px] sm:gap-[40px] pr-[28px] sm:pr-[40px]">
          {[...allTech, ...allTech, ...allTech, ...allTech].map((tech, i) => (
            <div key={i} className="flex items-center gap-[28px] sm:gap-[40px] shrink-0">
              <span className="font-mono text-[14px] sm:text-[18px] md:text-[22px] font-bold tracking-[-0.02em] text-brand uppercase whitespace-nowrap">{tech}</span>
              <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-brand/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkCta() {
  return (
    <Section bg="dark" maxWidth="xwide" className="text-center py-[64px] sm:py-[80px] lg:py-[100px]">
      <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] text-white mb-[20px] sm:mb-[24px]">
        Ready to build?
      </h2>
      <p className="text-gray-subtle mb-[32px] sm:mb-[40px] max-w-[500px] mx-auto text-[15px] sm:text-[16px] leading-[1.6] px-[16px]">
        If you are building an AI agent or a Web3 protocol and need a team that takes ownership from architecture to deployment, we should talk.
      </p>
      <a
        href="mailto:contact@metaborong.com"
        className="inline-flex h-[48px] sm:h-[52px] items-center justify-center rounded-[4px] bg-brand px-[24px] sm:px-[32px] text-[14px] sm:text-[15px] font-bold tracking-[0.02em] text-white transition-colors hover:bg-brand/90"
      >
        Book an exploration call
      </a>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Related services — internal links from the SunsetML case study to published
// AI service leaves. Resolved + filtered to published so a coming-soon leaf is
// dropped silently.
// ─────────────────────────────────────────────────────────────────────────────

const SUNSET_RELATED_SLUGS = [
  'generative-ai-development',
  'ai-copilots-internal-tools',
  'genai-apis-backend-integration',
]

function resolveSunsetRelated(): { pillar: Pillar; leaf: ChildService }[] {
  const ai = pillars.find((p) => p.id === 'ai')
  if (!ai) return []
  const leaves = getAllLeaves(ai)
  return SUNSET_RELATED_SLUGS.map((slug) => leaves.find((l) => l.slug === slug && l.status === 'published'))
    .filter((l): l is ChildService => Boolean(l))
    .map((leaf) => ({ pillar: ai, leaf }))
}

function SunsetRelatedServices({ related }: { related: { pillar: Pillar; leaf: ChildService }[] }) {
  if (related.length === 0) return null
  return (
    <Section bg="subtle" maxWidth="xwide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
      <div className="mb-[32px] sm:mb-[40px]">
        <h2 className="mb-[16px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand">Related services</h2>
        <p className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.025em] leading-[1.1] text-dark max-w-[640px]">
          How we build platforms like SunsetML
        </p>
      </div>
      <ul role="list" className="border-t border-border">
        {related.map(({ pillar, leaf }) => (
          <li key={leaf.slug}>
            <Link
              href={`${pillar.hubHref}${leaf.slug}/`}
              className="group grid grid-cols-[1fr_auto] items-center gap-[20px] border-b border-border py-[20px] no-underline transition-colors duration-[var(--duration-fast)] hover:bg-bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset md:py-[24px]"
            >
              <div className="min-w-0">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">{pillar.label}</span>
                <h3 className="mt-[6px] text-[17px] font-semibold tracking-[-0.02em] leading-[1.3] text-dark md:text-[19px]">{leaf.name}</h3>
                <p className="mt-[4px] max-w-[68ch] text-[14px] leading-[1.55] text-gray">{leaf.description}</p>
              </div>
              <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-border text-gray transition-[transform,border-color,color] duration-[var(--duration-fast)] group-hover:translate-x-[2px] group-hover:border-brand group-hover:text-brand motion-reduce:group-hover:translate-x-0">
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD — Article + BreadcrumbList + FAQPage for the SunsetML case study.
// ─────────────────────────────────────────────────────────────────────────────

function buildSunsetJsonLd(meta: CaseStudyMeta, faqItems: { q: string; a: string }[], slug: string): Record<string, unknown>[] {
  const url = `${SITE_ORIGIN}/work/${slug}`
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
    about: { '@type': 'SoftwareApplication', name: 'SunsetML', applicationCategory: 'AI writing platform' },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_ORIGIN}/#work` },
      { '@type': 'ListItem', position: 3, name: meta.client ?? 'SunsetML', item: url },
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

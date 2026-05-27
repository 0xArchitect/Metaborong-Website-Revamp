import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Markdown } from '@/components/ui/markdown'
import { Section } from '@/components/ui/section'

interface CaseStudyMeta {
  title: string
  description: string
  logo: string
  category: string
  animatedLogo?: string
  demoVideo?: string
  glowColor?: string  // CSS colour for hero glow — defaults to brand blue
}

const METADATA: Record<string, CaseStudyMeta> = {
  sunset: {
    title: 'SUNSET: How Metaborong Built an AI-Native Writing Platform That Eliminates Creative Friction',
    description: 'Metaborong engineered SUNSET, an AI writing platform with a contextual prompt bar, multi-model AI support, and a distraction-free editor built for creators and teams.',
    logo: '/clients/sunset.svg',
    category: 'AI · Platform',
    animatedLogo: '/works/sunset/animated-logo.mp4',
    demoVideo: '/works/sunset/demo.mp4',
    glowColor: '#ff6b35'  // warm orange matching SUNSET brand
  },
  magic: {
    title: 'MAGIC by Omagic AI: How Metaborong Built a Scalable AI Product Video and Creative Automation Platform for E-commerce',
    description: 'Metaborong built MAGIC, an AI creative automation platform generating product videos, CGI visuals, and ad creatives from a single product image. Built for e-commerce at scale.',
    logo: '/clients/magic.svg',
    category: 'AI · Automation',
    glowColor: '#a855f7'  // purple/violet
  },
  orbitx: {
    title: 'OrbitX: How Metaborong Engineered a Production-Grade Stablecoin Banking Infrastructure for Global Payments',
    description: 'Metaborong built OrbitX, a stablecoin banking infrastructure with smart contracts, escrow systems, USDC treasury management, and on-chain governance on Coinbase Base Network.',
    logo: '/clients/orbitx.svg',
    category: 'Web3 · Fintech',
    glowColor: '#22d3ee'  // cyan/teal
  },
  sedax: {
    title: 'SEDAX: How Metaborong Built a Blockchain eKYC Platform with Zero-Knowledge Proof Identity Verification',
    description: 'Metaborong engineered SEDAX, a blockchain eKYC platform using Zero-Knowledge Proofs, self-sovereign identity, and verifiable credentials for privacy-first digital identity verification.',
    logo: '/clients/sedax.svg',
    category: 'Web3 · Identity',
    glowColor: '#10b981'  // emerald
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const meta = METADATA[slug]
  if (!meta) return {}
  return {
    title: meta.title.split(':')[0],
    description: meta.description,
  }
}

function parseMarkdown(content: string) {
  const sections = content.split(/\n## /)
  let overview = '', problem = '', solution = '', results = '', faq = '', tech = '', techApproach = '', industry = ''

  for (let i = 1; i < sections.length; i++) {
    const text = sections[i]
    if (text.startsWith('Overview')) overview = text.replace(/^Overview\n+/, '')
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

  return { overview, problem, solutionIntro, solutionFeatures, results, faqItems, techItems, techApproach, industry }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = METADATA[slug]
  if (!meta) notFound()

  const filePath = path.join(process.cwd(), 'content', 'work', `${slug}.md`)
  let content = ''
  try { content = fs.readFileSync(filePath, 'utf8') } catch { notFound() }

  const { overview, problem, solutionIntro, solutionFeatures, results, faqItems, techItems, techApproach, industry } = parseMarkdown(content)
  const allTech = techItems.flatMap(t => t.items)

  return (
    <main className="flex min-h-screen flex-col">
      <Nav backHref="/#work" backLabel="All Work" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
          <span className="block mb-[20px] font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{meta.category}</span>
          {/* Title must not overlap the logo on mobile — cap width */}
          <h1 className="text-[clamp(28px,5vw,80px)] font-bold tracking-[-0.04em] leading-[1.0] text-white max-w-[min(620px,70vw)] sm:max-w-[min(700px,72vw)] lg:max-w-[900px] mb-[40px] sm:mb-[56px]">
            {meta.title}
          </h1>
          <div className="flex flex-wrap gap-x-[32px] sm:gap-x-[48px] gap-y-[20px] border-t border-white/10 pt-[28px] sm:pt-[36px]">
            {[
              { label: 'Client', value: meta.title.split(':')[0] },
              { label: 'Category', value: meta.category },
              { label: 'Services', value: 'Platform Engineering' },
              { label: 'Year', value: '2024' },
            ].map(item => (
              <div key={item.label} className="flex flex-col gap-[6px]">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{item.label}</span>
                <span className="text-[13px] sm:text-[15px] font-medium text-white/80">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* ── DEMO VIDEO ───────────────────────────────────────────────────── */}
      <Section bg="default" maxWidth="xwide" className="pb-[48px] sm:pb-[72px] lg:pb-[100px]">
        <div className="w-full aspect-video sm:aspect-[16/9] lg:aspect-[21/9] rounded-[12px] sm:rounded-[20px] lg:rounded-[24px] bg-canvas border border-border/10 shadow-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
          {meta.demoVideo ? (
            <video src={meta.demoVideo} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
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

      {/* ── SOLUTION / FEATURES ─────────────────────────────────────────── */}
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

      {/* ── TECHNICAL APPROACH / INDUSTRY ────────────────────────────────── */}
      {(techApproach || industry) && (
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
      )}

      {/* ── RESULTS ──────────────────────────────────────────────────────── */}
      {results && (
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
      )}

      {/* ── TECH MARQUEE ─────────────────────────────────────────────────── */}
      {allTech.length > 0 && (
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
      )}

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

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
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

      <Footer />
    </main>
  )
}

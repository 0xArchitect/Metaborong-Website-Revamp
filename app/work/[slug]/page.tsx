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
}

const METADATA: Record<string, CaseStudyMeta> = {
  sunset: {
    title: 'SUNSET: How Metaborong Built an AI-Native Writing Platform That Eliminates Creative Friction',
    description: 'Metaborong engineered SUNSET, an AI writing platform with a contextual prompt bar, multi-model AI support, and a distraction-free editor built for creators and teams.',
    logo: '/clients/sunset.svg',
    category: 'AI · Platform',
    animatedLogo: '/works/sunset/animated-logo.mp4',
    demoVideo: '/works/sunset/demo.mp4'
  },
  magic: {
    title: 'MAGIC by Omagic AI: How Metaborong Built a Scalable AI Product Video and Creative Automation Platform for E-commerce',
    description: 'Metaborong built MAGIC, an AI creative automation platform generating product videos, CGI visuals, and ad creatives from a single product image. Built for e-commerce at scale.',
    logo: '/clients/magic.svg',
    category: 'AI · Automation'
  },
  orbitx: {
    title: 'OrbitX: How Metaborong Engineered a Production-Grade Stablecoin Banking Infrastructure for Global Payments',
    description: 'Metaborong built OrbitX, a stablecoin banking infrastructure with smart contracts, escrow systems, USDC treasury management, and on-chain governance on Coinbase Base Network.',
    logo: '/clients/orbitx.svg',
    category: 'Web3 · Fintech'
  },
  sedax: {
    title: 'SEDAX: How Metaborong Built a Blockchain eKYC Platform with Zero-Knowledge Proof Identity Verification',
    description: 'Metaborong engineered SEDAX, a blockchain eKYC platform using Zero-Knowledge Proofs, self-sovereign identity, and verifiable credentials for privacy-first digital identity verification.',
    logo: '/clients/sedax.svg',
    category: 'Web3 · Identity'
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const meta = METADATA[slug]
  if (!meta) return {}

  return {
    title: meta.title.split(':')[0], // E.g. SUNSET, MAGIC by Omagic AI
    description: meta.description,
  }
}

function parseMarkdown(content: string) {
  const sections = content.split(/\n## /)

  let overview = ''
  let problem = ''
  let solution = ''
  let results = ''
  let faq = ''
  let tech = ''
  let techApproach = ''
  let industry = ''

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

  // Parse Solution Features
  const solutionParts = solution.split(/\n### /)
  const solutionIntro = solutionParts[0]
  const solutionFeatures: { title: string, body: string }[] = []
  if (solutionParts.length > 1) {
    for (let i = 1; i < solutionParts.length; i++) {
      const splitIndex = solutionParts[i].indexOf('\n')
      if (splitIndex !== -1) {
        solutionFeatures.push({
          title: solutionParts[i].substring(0, splitIndex).trim(),
          body: solutionParts[i].substring(splitIndex + 1).trim()
        })
      } else {
        solutionFeatures.push({
          title: solutionParts[i].trim(),
          body: ''
        })
      }
    }
  }

  // Parse FAQ
  const faqItems: { q: string, a: string }[] = []
  if (faq) {
    const parts = faq.split(/\*\*(.*?)\*\*\n/)
    for (let i = 1; i < parts.length; i += 2) {
      faqItems.push({
        q: parts[i].trim(),
        a: parts[i + 1].trim()
      })
    }
  }

  // Parse Tech
  const techItems: { category: string, items: string[] }[] = []
  if (tech) {
    const lines = tech.split('\n').filter(l => l.includes('**'))
    lines.forEach(line => {
      const match = line.match(/\*\*(.*?):\*\*(.*)/)
      if (match) {
        techItems.push({
          category: match[1].trim(),
          items: match[2].split(',').map(i => i.trim())
        })
      }
    })
  }

  return { overview, problem, solutionIntro, solutionFeatures, results, faqItems, techItems, techApproach, industry }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = METADATA[slug]
  if (!meta) {
    notFound()
  }

  const filePath = path.join(process.cwd(), 'content', 'work', `${slug}.md`)
  let content = ''
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    notFound()
  }

  const { overview, problem, solutionIntro, solutionFeatures, results, faqItems, techItems, techApproach, industry } = parseMarkdown(content)

  // Flatten all tech items into a single array for the marquee
  const allTech = techItems.flatMap(t => t.items)

  return (
    <main className="flex min-h-screen flex-col">
      <Nav />

      {/* Hero Section — Dark with logo-radiated gradient */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0a0a0a] pt-[140px] lg:pt-[180px]">
        {/* Gradient radiates from the top-right where the logo sits — vivid layers */}
        <div className="pointer-events-none absolute inset-0">
          {/* Wide base bloom */}
          <div className="absolute top-0 right-0 h-[80%] w-[70%] bg-[radial-gradient(ellipse_at_top_right,#3b5bff55,transparent_60%)]" />
          {/* Tight bright core directly behind logo */}
          <div className="absolute top-[-5%] right-[-5%] h-[55%] w-[55%] bg-[radial-gradient(ellipse_at_top_right,#3b5bffaa,transparent_50%)]" />
          {/* Mid accent */}
          <div className="absolute top-[10%] right-[5%] h-[45%] w-[40%] bg-[radial-gradient(ellipse_at_top_right,#6b8affcc,transparent_40%)] mix-blend-screen opacity-50" />
          {/* Dark vignette bottom-left to keep text readable */}
          <div className="absolute bottom-0 left-0 h-[60%] w-[60%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.85),transparent_65%)]" />
          {/* Subtle sweep across bottom */}
          <div className="absolute bottom-0 inset-x-0 h-[30%] bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Animated Logo — top right corner, large */}
        <div className="absolute top-[100px] lg:top-[120px] right-[24px] md:right-[48px] lg:right-[80px] xl:right-[128px] w-[160px] lg:w-[260px] aspect-square rounded-[20px] overflow-hidden opacity-90">
          {meta.animatedLogo ? (
            <video src={meta.animatedLogo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img src={meta.logo} alt="" className="h-[64px] object-contain invert opacity-80" />
            </div>
          )}
        </div>

        {/* Hero text */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-[24px] md:px-[48px] lg:px-[80px] xl:px-[128px] pb-[80px] lg:pb-[120px]">
          <div className="mb-[32px] flex items-center gap-[16px]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{meta.category}</span>
          </div>
          <h1 className="text-[clamp(40px,6vw,88px)] font-bold tracking-[-0.04em] leading-[0.95] text-white max-w-[900px] mb-[64px]">
            {meta.title}
          </h1>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-x-[64px] gap-y-[24px] border-t border-white/10 pt-[40px]">
            {[
              { label: 'Client', value: meta.title.split(':')[0] },
              { label: 'Category', value: meta.category },
              { label: 'Services', value: 'Platform Engineering' },
              { label: 'Year', value: '2024' },
            ].map(item => (
              <div key={item.label} className="flex flex-col gap-[8px]">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{item.label}</span>
                <span className="text-[15px] font-medium text-white/80">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Overview & Problem */}
      <Section bg="default" maxWidth="xwide" className="pt-[80px] lg:pt-[120px] pb-[40px] lg:pb-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] lg:gap-[120px]">
          <div>
            <h2 className="mb-[24px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">Overview</h2>
            <div className="prose-container text-[18px] leading-[1.7] text-dark">
              <Markdown content={overview} />
            </div>
          </div>
          <div className="rounded-[12px] bg-bg-raised p-[32px] sm:p-[48px] border border-border">
            <h2 className="mb-[24px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">The Problem</h2>
            <div className="prose-container text-[16px] leading-[1.7] text-gray">
              <Markdown content={problem} />
            </div>
          </div>
        </div>
      </Section>

      {/* Project Demo Video Placeholder */}
      <Section bg="default" maxWidth="xwide" className="pb-[80px] lg:pb-[120px]">
        <div className="w-full aspect-[16/9] lg:aspect-[21/9] rounded-[16px] lg:rounded-[24px] bg-canvas border border-border/10 shadow-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
          {meta.demoVideo ? (
            <video src={meta.demoVideo} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              {/* Faux cinematic lighting */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

              {/* Play Button */}
              <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 z-10">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-[6px]" />
              </div>

              {/* Video Controls HUD */}
              <div className="absolute bottom-[24px] left-[24px] right-[24px] flex justify-between items-center text-white/50 font-mono text-[11px] font-bold tracking-[0.14em] uppercase z-10">
                <span className="flex items-center gap-[12px]">
                  <span className="w-[8px] h-[8px] bg-red-500 rounded-full animate-pulse" />
                  {slug} Product Demo
                </span>
                <span>00:00 / 02:45</span>
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Solution */}
      <Section bg="default" maxWidth="wide" className="py-[80px] lg:py-[120px] border-t border-border">
        <div className="mb-[80px] lg:mb-[120px] max-w-[800px]">
          <h2 className="mb-[24px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">What Metaborong Built</h2>
          <div className="text-[20px] md:text-[28px] leading-[1.5] tracking-[-0.02em] text-dark font-bold">
            <Markdown content={solutionIntro} />
          </div>
        </div>

        {solutionFeatures.length > 0 && (
          <div className="flex flex-col gap-[80px] lg:gap-[160px]">
            {solutionFeatures.map((feat, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[32px] lg:gap-[80px] items-start">
                <div className="flex flex-col gap-[24px] sticky top-[120px]">
                  <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-brand text-white font-mono font-bold text-[15px] shadow-lg shadow-brand/20">
                    0{i + 1}
                  </span>
                  <h3 className="text-[32px] lg:text-[40px] font-bold tracking-[-0.03em] text-dark leading-[1.1]">{feat.title}</h3>
                </div>
                <div className="pt-[12px]">
                  <Markdown content={feat.body} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Technical Approach — Visual card grid */}
      {(techApproach || industry) && (
        <Section bg="default" maxWidth="wide" className="py-[100px] lg:py-[140px] border-t border-border">
          {techApproach && (
            <div className="mb-[80px]">
              <h2 className="mb-[48px] font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Technical Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-border/40 rounded-[20px] overflow-hidden">
                {techApproach
                  .split('\n')
                  .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
                  .map((line, i) => (
                    <div key={i} className="bg-white p-[32px] flex flex-col gap-[16px] hover:bg-bg-subtle transition-colors duration-300">
                      <span className="font-mono text-[10px] font-bold text-brand/50 tracking-[0.2em]">0{i + 1}</span>
                      <p className="text-[15px] font-medium leading-[1.6] text-dark tracking-[-0.01em]">
                        {line.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                      </p>
                    </div>
                  ))}
              </div>
              {/* Also render any prose that's not list items */}
              {techApproach.split('\n').filter(l => l.trim() && !l.trim().startsWith('-') && !l.trim().startsWith('*')).length > 0 && (
                <div className="mt-[40px] prose-container text-[17px] leading-[1.7] text-gray">
                  <Markdown content={techApproach.split('\n').filter(l => l.trim() && !l.trim().startsWith('-') && !l.trim().startsWith('*')).join('\n')} />
                </div>
              )}
            </div>
          )}
          {industry && (
            <div>
              <h2 className="mb-[48px] font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Industry Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-border/40 rounded-[20px] overflow-hidden">
                {industry
                  .split('\n')
                  .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
                  .map((line, i) => (
                    <div key={i} className="bg-white p-[32px] flex flex-col gap-[16px] hover:bg-bg-subtle transition-colors duration-300">
                      <span className="font-mono text-[10px] font-bold text-brand/50 tracking-[0.2em]">0{i + 1}</span>
                      <p className="text-[15px] font-medium leading-[1.6] text-dark tracking-[-0.01em]">
                        {line.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {/* Results & Impact — Stat callout cards */}
      {results && (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-[100px] lg:py-[160px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 h-[60%] w-[50%] bg-[radial-gradient(ellipse_at_top_left,var(--color-brand)/25%,transparent_65%)] blur-[2px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-[24px] md:px-[48px] lg:px-[80px] xl:px-[128px]">
            <h2 className="mb-[64px] font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Results & Impact</h2>
            {/* Parse bullet points into big stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {results
                .split('\n')
                .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
                .map((line, i) => {
                  const raw = line.replace(/^[-*]\s*/, '')
                  // Split on colon or dash inside the text to separate metric from description
                  const colonIdx = raw.indexOf(':')
                  const dashIdx = raw.indexOf(' — ')
                  const splitAt = colonIdx > 0 ? colonIdx : dashIdx > 0 ? dashIdx : -1
                  const metric = splitAt > 0 ? raw.substring(0, splitAt).replace(/\*\*(.*?)\*\*/g, '$1') : ''
                  const desc = splitAt > 0 ? raw.substring(splitAt + 1).trim().replace(/\*\*(.*?)\*\*/g, '$1') : raw.replace(/\*\*(.*?)\*\*/g, '$1')
                  return (
                    <div key={i} className="flex flex-col justify-between gap-[24px] rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-[32px] lg:p-[40px] backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 group">
                      <span className="font-mono text-[10px] font-bold text-white/20 tracking-[0.2em]">0{i + 1}</span>
                      <div className="flex flex-col gap-[12px]">
                        {metric ? (
                          <>
                            <p className="text-[22px] md:text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-white group-hover:text-white transition-colors">{metric}</p>
                            <p className="text-[14px] font-medium leading-[1.6] text-white/40">{desc}</p>
                          </>
                        ) : (
                          <p className="text-[15px] font-medium leading-[1.6] text-white/70">{desc}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
            {/* Any non-list prose */}
            {results.split('\n').filter(l => l.trim() && !l.trim().startsWith('-') && !l.trim().startsWith('*')).length > 0 && (
              <div className="mt-[64px] max-w-[800px] text-[20px] md:text-[28px] leading-[1.4] tracking-[-0.02em] font-medium text-white/80 [&_strong]:text-brand">
                <Markdown content={results.split('\n').filter(l => l.trim() && !l.trim().startsWith('-') && !l.trim().startsWith('*')).join('\n')} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Technologies Marquee */}
      {allTech.length > 0 && (
        <section className="bg-bg-subtle py-[80px] overflow-hidden border-t border-b border-border">
          <div className="relative flex w-full flex-col gap-[16px]">
            <div className="flex w-fit animate-marquee items-center gap-[40px] pr-[40px]">
              {[...allTech, ...allTech, ...allTech, ...allTech].map((tech, i) => (
                <div key={i} className="flex items-center gap-[40px] shrink-0">
                  <span className="font-mono text-[18px] md:text-[24px] font-bold tracking-[-0.02em] text-brand uppercase">{tech}</span>
                  <div className="w-[6px] h-[6px] rounded-full bg-brand/30" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <Section bg="default" maxWidth="wide" className="py-[80px] lg:py-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[48px] lg:gap-[80px]">
            <div className="md:col-span-4">
              <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold tracking-[-0.035em] text-dark leading-[1.1]">
                Frequently<br />Asked Questions
              </h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-[16px]">
              {faqItems.map((item, i) => (
                <details key={i} className="group border border-border bg-bg-raised rounded-[8px] overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-[24px] text-[16px] font-bold tracking-[-0.01em] text-dark transition-colors hover:bg-bg-subtle outline-none focus-visible:ring-2 focus-visible:ring-brand">
                    {item.q}
                    <span className="ml-[16px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-border text-[14px] transition-transform duration-300 group-open:rotate-180">
                      ↓
                    </span>
                  </summary>
                  <div className="px-[24px] pb-[24px] text-[15px] leading-[1.65] text-gray">
                    <Markdown content={item.a} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Contact CTA */}
      <Section bg="dark" maxWidth="xwide" className="text-center py-[100px]">
        <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em] text-white mb-[24px]">
          Ready to build?
        </h2>
        <p className="text-gray-subtle mb-[40px] max-w-[500px] mx-auto text-[16px] leading-[1.6]">
          If you are building an AI agent or a Web3 protocol and need a team that takes ownership from architecture to deployment, we should talk.
        </p>
        <a
          href="mailto:contact@metaborong.com"
          className="inline-flex h-[52px] items-center justify-center rounded-[4px] bg-brand px-[32px] text-[15px] font-bold tracking-[0.02em] text-white transition-colors hover:bg-brand/90"
        >
          Book an exploration call
        </a>
      </Section>

      <Footer />
    </main>
  )
}

import { Section } from '@/components/ui/section'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'

type Project = { name: string; title: string; category: string; logo: string; slug: string }

const projects: Project[] = [
  { 
    name: 'SUNSET', 
    title: 'An AI-native writing platform that eliminates creative friction.',
    category: 'AI · Platform', 
    logo: '/clients/sunset.svg',
    slug: 'sunset'
  },
  { 
    name: 'MAGIC', 
    title: 'A scalable AI creative automation platform for e-commerce.',
    category: 'AI · Automation', 
    logo: '/clients/magic.svg',
    slug: 'magic'
  },
  { 
    name: 'OrbitX', 
    title: 'A production-grade stablecoin banking infrastructure.',
    category: 'Web3 · Fintech', 
    logo: '/clients/orbitx.svg',
    slug: 'orbitx'
  },
  { 
    name: 'SEDAX', 
    title: 'A blockchain eKYC platform with Zero-Knowledge Proof identity.',
    category: 'Web3 · Identity', 
    logo: '/clients/sedax.svg',
    slug: 'sedax'
  },
]

export function WorkPreviewSection() {
  return (
    <Section bg="default" maxWidth="xwide">
      <div className="mb-[20px] flex flex-col gap-[18px] sm:mb-[24px] sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-[16px]">
          <SectionEyebrow>Our work</SectionEyebrow>
          <h2 className="text-balance text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.035em] text-dark">What we&apos;ve built</h2>
        </div>
        <a href="/#contact" className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-brand no-underline">Talk to us →</a>
      </div>
      <p className="mb-[36px] max-w-[600px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray sm:mb-[48px]">
        Live products across Web3, AI, fintech, and SaaS — each engineered for production and shipped with founders we still work with.
      </p>
      <div className="relative mt-[24px] [--cw:calc(100vw-32px)] sm:[--cw:calc(100vw-48px)]">
        <div
          data-lenis-prevent
          className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-[16px] lg:gap-[1px] lg:bg-border lg:border lg:border-border pb-[24px] -mx-[16px] px-[16px] sm:-mx-[24px] sm:px-[24px] md:mx-0 md:px-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map(p => (
            <div
              key={p.name}
              className="snap-center snap-always shrink-0 w-[calc(100vw-32px)] sm:w-[calc(100vw-48px)] md:w-auto md:max-w-none flex"
            >
              <div className="group flex w-full flex-col gap-[20px] min-h-[240px] rounded-[12px] border border-border bg-bg px-[24px] py-[28px] transition-colors duration-[250ms] hover:bg-bg-raised motion-reduce:transition-none lg:rounded-none lg:border-0">
                <div className="flex h-[36px] items-center justify-start">
                  <img src={p.logo} alt={p.name} className="h-full max-w-[120px] object-contain brightness-0 opacity-80" />
                </div>
                <div className="flex flex-col gap-[10px] mt-[8px]">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray">{p.category}</div>
                  <h3 className="text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-dark">{p.title}</h3>
                </div>
                <a href={`/work/${p.slug}`} className="mt-auto inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-dark no-underline transition-colors duration-[150ms] group-hover:text-brand">Read case study <span aria-hidden="true">→</span></a>
              </div>
            </div>
          ))}
        </div>

        {/* Floating swipe hint arrow (Left) */}
        <div 
          className="pointer-events-none absolute md:hidden text-gray opacity-80 motion-safe:animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          style={{ top: 'calc(50% - 12px)', left: 'calc(var(--cw) * 0.04)', transform: 'translate(-50%, -50%)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>

        {/* Floating swipe hint arrow (Right) */}
        <div 
          className="pointer-events-none absolute md:hidden text-gray opacity-80 motion-safe:animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          style={{ top: 'calc(50% - 12px)', right: 'calc(var(--cw) * 0.04)', transform: 'translate(50%, -50%)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </Section>
  )
}


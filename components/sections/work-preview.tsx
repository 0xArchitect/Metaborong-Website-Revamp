import { Section } from '@/components/ui/section'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'

type Project = { name: string; title: string; category: string; pillar: 'AI' | 'Web3'; logo: string; slug: string }

const projects: Project[] = [
  {
    name: 'SUNSET',
    title: 'An AI-native writing platform that eliminates creative friction.',
    category: 'AI · Platform',
    pillar: 'AI',
    logo: '/clients/sunset.svg',
    slug: 'sunset',
  },
  {
    name: 'MAGIC',
    title: 'A scalable AI creative automation platform for e-commerce.',
    category: 'AI · Automation',
    pillar: 'AI',
    logo: '/clients/magic.svg',
    slug: 'magic',
  },
  {
    name: 'OrbitX',
    title: 'A production-grade stablecoin banking infrastructure.',
    category: 'Web3 · Fintech',
    pillar: 'Web3',
    logo: '/clients/orbitx.svg',
    slug: 'orbitx',
  },
  {
    name: 'SEDAX',
    title: 'A blockchain eKYC platform with Zero-Knowledge Proof identity.',
    category: 'Web3 · Identity',
    pillar: 'Web3',
    logo: '/clients/sedax.svg',
    slug: 'sedax',
  },
]

const pillarText = (p: Project['pillar']) => (p === 'AI' ? 'text-ai' : 'text-brand')

export function WorkPreviewSection() {
  return (
    <Section
      bg="default"
      maxWidth="xwide"
      className="lg:flex lg:min-h-[calc(100svh-56px)] lg:flex-col lg:justify-center lg:py-[clamp(24px,4svh,72px)]! [&>div]:w-full"
    >
      <div className="mb-[20px] flex flex-col gap-[18px] sm:mb-[24px] sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-[16px]">
          <SectionEyebrow>Our work</SectionEyebrow>
          <h2 className="text-balance text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.035em] text-dark">What we&apos;ve built</h2>
        </div>
        <a href="/#contact" className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-brand no-underline">Talk to us →</a>
      </div>
      <p className="mb-[36px] max-w-[600px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray">
        Live products across Web3, AI, fintech, and SaaS — each engineered for production and shipped with founders we still work with.
      </p>

      <div className="border border-border bg-bg">
        <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-[20px] py-[12px]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-light">Production</span>
          <span className="inline-flex items-center gap-[8px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-light">
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-brand" /> {projects.length} live
          </span>
        </div>

        {projects.map(p => (
          <a
            key={p.name}
            href={`/work/${p.slug}`}
            className="group flex flex-col gap-[12px] border-b border-border p-[20px] no-underline transition-colors duration-[200ms] last:border-b-0 hover:bg-bg-raised motion-reduce:transition-none lg:grid lg:grid-cols-[150px_minmax(0,1fr)_auto] lg:items-center lg:gap-[24px] lg:py-[22px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.logo} alt={p.name} className="h-[26px] max-w-[120px] self-start object-contain opacity-80 brightness-0 lg:h-[24px] lg:self-center" />
            <div className="flex flex-col gap-[6px]">
              <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${pillarText(p.pillar)}`}>{p.category}</span>
              <h3 className="text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-dark">{p.title}</h3>
            </div>
            <span className="inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-dark transition-colors duration-[150ms] group-hover:text-brand lg:min-h-0">
              Read case study <span aria-hidden="true">→</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  )
}

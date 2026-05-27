import { Section } from '@/components/ui/section'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'

type Project = { name: string; category: string; color: string }

// Per-card one-liners deferred until case studies land (docs/content/homepage.md) —
// no fabricated outcomes. Names + categories only.
const projects: Project[] = [
  { name: 'KGeN',               category: 'Web3 · Gaming', color: '#296ff0' },
  { name: 'DATA3 AI',           category: 'AI · Data',     color: '#0F766E' },
  { name: 'Bionic',             category: 'Web3 · DeFi',   color: '#296ff0' },
  { name: 'Bayan — AI Chatbot', category: 'AI · Voice',    color: '#0F766E' },
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
        Live products across DeFi, AI, gaming, and SaaS — each shipped with founders we still work with. Case studies are on the way.
      </p>
      <div className="relative mt-[24px] [--cw:calc(100vw-32px)] sm:[--cw:calc(100vw-48px)]">
        <div
          data-lenis-prevent
          className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] lg:grid lg:grid-cols-4 lg:gap-[1px] lg:bg-border lg:border lg:border-border pb-[24px] -mx-[16px] px-[16px] sm:-mx-[24px] sm:px-[24px] lg:mx-0 lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map(p => (
            <div
              key={p.name}
              className="snap-center snap-always shrink-0 w-[calc(100vw-32px)] sm:w-[calc(100vw-48px)] md:w-[calc(50vw-32px)] lg:w-auto lg:max-w-none flex"
            >
              <div className="group flex w-full flex-col gap-[20px] min-h-[240px] rounded-[12px] border border-border bg-bg px-[24px] py-[28px] transition-colors duration-[250ms] hover:bg-bg-raised motion-reduce:transition-none lg:rounded-none lg:border-0">
                {/* Solid pillar-colored monogram square — placeholder until case-study art. */}
                <span
                  aria-hidden="true"
                  className="flex h-[56px] w-[56px] flex-none items-center justify-center text-[28px] font-bold tracking-[-0.04em] text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.name.charAt(0)}
                </span>
                <div className="flex flex-col gap-[8px]">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray">{p.category}</div>
                  <h3 className="text-[20px] font-bold leading-[1.15] tracking-[-0.025em] text-dark">{p.name}</h3>
                </div>
                <a href="/#contact" className="mt-auto inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-dark no-underline transition-colors duration-[150ms] group-hover:text-brand">Read more <span aria-hidden="true">→</span></a>
              </div>
            </div>
          ))}
        </div>

        {/* Static swipe affordances (mobile lane) — no infinite animation per DESIGN.md. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute lg:hidden text-gray opacity-70"
          style={{ top: 'calc(50% - 12px)', left: 'calc(var(--cw) * 0.04)', transform: 'translate(-50%, -50%)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute lg:hidden text-gray opacity-70"
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

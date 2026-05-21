import { Section } from '@/components/ui/section'
import { Pill } from '@/components/ui/pill'

type Project = { name: string; category: string; color: string }

// Per-card one-liners deferred until case studies land (docs/content/homepage.md) —
// no fabricated outcomes. Names + categories only.
const projects: Project[] = [
  { name: 'KGeN',               category: 'Web3 · Gaming', color: '#296ff0' },
  { name: 'DATA3 AI',           category: 'AI · Data',     color: '#10b981' },
  { name: 'Bionic',             category: 'Web3 · DeFi',   color: '#296ff0' },
  { name: 'Bayan — AI Chatbot', category: 'AI · Voice',    color: '#10b981' },
]

export function WorkPreviewSection() {
  return (
    <Section bg="default" maxWidth="xwide" divider>
      <div className="mb-[20px] flex flex-col gap-[18px] sm:mb-[24px] sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-[16px]">
          <Pill>Our work</Pill>
          <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.035em] text-dark">What we&apos;ve built</h2>
        </div>
        <a href="/#contact" className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-brand no-underline">Talk to us →</a>
      </div>
      <p className="mb-[36px] max-w-[600px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray sm:mb-[48px]">
        Live products across DeFi, AI, gaming, and SaaS — each shipped with founders we still work with. Case studies are on the way.
      </p>
      <div className="relative mt-[24px] [--cw:calc(100vw-32px)] sm:[--cw:calc(100vw-48px)]">
        <div
          data-lenis-prevent
          className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] lg:grid lg:grid-cols-4 lg:gap-[16px] pb-[24px] -mx-[16px] px-[16px] sm:-mx-[24px] sm:px-[24px] lg:mx-0 lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map(p => (
            <div
              key={p.name}
              className="snap-center snap-always shrink-0 w-[calc(100vw-32px)] sm:w-[calc(100vw-48px)] md:w-[calc(50vw-32px)] lg:w-auto lg:max-w-none flex"
            >
              <div className="flex w-full flex-col gap-[12px] rounded-[12px] border border-border px-[20px] py-[24px] transition-[transform,box-shadow,border-color] duration-[250ms] hover:-translate-y-[2px] hover:border-brand/30 hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-[24px] sm:py-[28px] lg:px-[28px] lg:py-[32px]">
                {/* Blueprint-hairline panel + corner monogram — placeholder until case-study art. */}
                <div
                  className="relative mb-[8px] h-[96px] overflow-hidden rounded-[8px] border border-border"
                  style={{ backgroundImage: `repeating-linear-gradient(45deg, ${p.color}1a 0, ${p.color}1a 1px, transparent 1px, transparent 9px)` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[10px] top-[8px] font-mono text-[12px] font-bold uppercase tracking-[0.1em]"
                    style={{ color: p.color }}
                  >
                    {p.name.charAt(0)}
                  </span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: p.color }}>{p.category}</div>
                <h3 className="text-[18px] font-bold tracking-[-0.025em] text-dark">{p.name}</h3>
                <a href="/#contact" className="mt-auto inline-flex min-h-[44px] items-center text-[13px] font-medium text-brand no-underline">Read more →</a>
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

import { Section } from '@/components/ui/section'

type Pillar = 'web3' | 'ai'

type Project = { name: string; mark: string; category: string; pillar: Pillar }

const projects: Project[] = [
  { name: 'KGeN',               mark: 'KGeN',   category: 'Web3 · Gaming', pillar: 'web3' },
  { name: 'DATA3 AI',           mark: 'DATA3',  category: 'AI · Data',     pillar: 'ai' },
  { name: 'Bionic',             mark: 'Bionic', category: 'Web3 · DeFi',   pillar: 'web3' },
  { name: 'Bayan — AI Chatbot', mark: 'Bayan',  category: 'AI · Voice',    pillar: 'ai' },
]

// Pillar-keyed tile styling. Literal class strings so Tailwind's JIT picks them
// up. Colors resolve to the --color-brand / --color-ai tokens (no raw hex).
const pillarStyles: Record<Pillar, { tile: string; ghost: string; dot: string; cat: string; hoverBorder: string }> = {
  web3: { tile: 'border-brand/15 bg-brand/[0.04]', ghost: 'text-brand/[0.14]', dot: 'bg-brand', cat: 'text-brand', hoverBorder: 'group-hover:border-brand/40 group-focus-within:border-brand/40' },
  ai:   { tile: 'border-ai/25 bg-ai/[0.05]',       ghost: 'text-ai/[0.16]',    dot: 'bg-ai',    cat: 'text-ai',    hoverBorder: 'group-hover:border-ai/40 group-focus-within:border-ai/40' },
}

export function WorkPreviewSection() {
  return (
    <Section bg="default" maxWidth="xwide" label="Our work">
      <div className="mb-[20px] flex flex-col gap-[18px] sm:mb-[24px] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.035em] text-dark">What we&apos;ve built</h2>
        </div>
        <a href="/#contact" className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-brand no-underline">Talk to us →</a>
      </div>
      <p className="mb-[36px] max-w-[600px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray sm:mb-[48px]">
        Live products across DeFi, AI, gaming, and SaaS — each shipped with founders we still work with. Case studies are on the way.
      </p>
      <div className="relative mt-[24px]">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] lg:grid lg:grid-cols-4 lg:gap-[16px] pb-[24px] -mx-[16px] px-[16px] sm:-mx-[24px] sm:px-[24px] lg:mx-0 lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map(p => {
            const s = pillarStyles[p.pillar]
            return (
              <div
                key={p.name}
                className="group snap-center snap-always shrink-0 w-[78vw] max-w-[300px] sm:w-[58vw] sm:max-w-[340px] md:w-[44vw] md:max-w-[380px] lg:w-auto lg:max-w-none flex"
              >
                <div className={`flex w-full flex-col gap-[12px] rounded-[12px] border border-border px-[20px] py-[24px] sm:px-[24px] sm:py-[28px] lg:px-[28px] lg:py-[32px] transition-[border-color,transform,box-shadow] duration-[250ms] ease-out hover:shadow-[var(--shadow-sm)] motion-safe:hover:-translate-y-[2px] motion-safe:focus-within:-translate-y-[2px] ${s.hoverBorder}`}>
                  {/* Ghost-wordmark tile (footer idiom) — pillar-keyed, replaces the
                      empty placeholder panel so the absence of a thumbnail reads as
                      intentional brand chrome. */}
                  <div className={`relative mb-[8px] aspect-[16/9] overflow-hidden rounded-[8px] border ${s.tile}`}>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute bottom-[6px] left-[14px] select-none whitespace-nowrap text-[clamp(38px,6.5vw,56px)] font-black leading-none tracking-[-0.04em] ${s.ghost}`}
                    >
                      {p.mark}
                    </span>
                    <span aria-hidden="true" className={`absolute right-[12px] top-[12px] h-[12px] w-[12px] rounded-[3px] ${s.dot}`} />
                  </div>
                  <div className={`text-[11px] font-semibold uppercase tracking-[0.06em] ${s.cat}`}>{p.category}</div>
                  <h3 className="text-[18px] font-bold tracking-[-0.025em] text-dark">{p.name}</h3>
                  <a href="/#contact" className="mt-auto inline-flex min-h-[44px] items-center text-[13px] font-medium text-brand no-underline">Read more →</a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

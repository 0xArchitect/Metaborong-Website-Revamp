import { SectionEyebrow } from '@/components/ui/section-eyebrow'
import { Section } from '@/components/ui/section'
import { ComparisonRows, type Row } from '@/components/sections/comparison-rows'

const rows: Row[] = [
  { label: 'Team access',                    mbBold: 'Founder-led',                    mbRest: ', no account-manager layer',          large: 'Tiered through account managers',       free: 'Direct, varies by contractor' },
  { label: 'AI-native operations',           mbBold: 'Agentic AI',                     mbRest: ' runs spec, review, and QA workflows', large: 'Manual handoffs across teams',         free: 'Manual, per-contractor' },
  { label: 'Engineering standards',          mbBold: 'Code review, CI/CD',             mbRest: ', and automated tests on every change', large: 'Standards vary by team and engagement', free: 'Practices vary by contractor' },
  { label: 'Delivery timeline',              mbBold: '4–12 weeks',                     mbRest: ' per engagement',                     large: '3–6 months or longer',                  free: 'Variable, project-dependent' },
  { label: 'Documentation and handover',     mbBold: 'Architecture docs and runbooks', mbRest: ' shipped with the build',             large: 'Scoped as a separate phase',            free: 'Often informal' },
  { label: 'Process and project management', mbBold: 'Integrated',                     mbRest: ' across engineering, PM, and operations', large: 'Siloed across separate teams',       free: 'Ad hoc, project-dependent' },
  { label: 'Track record',                   mbBold: '25+ products',                   mbRest: ' in production',                      large: 'Hundreds of clients', largeCheck: true, free: 'Portfolio varies by team' },
]

const headCell = 'px-[20px] py-[clamp(9px,1.3svh,16px)] text-left align-top border-b border-border font-mono text-[11px] font-bold uppercase tracking-[0.14em]'

export function ComparisonSection() {
  return (
    <Section
      bg="default"
      maxWidth="xwide"
      reveal={false}
      className="lg:flex lg:min-h-[calc(100svh-56px)] lg:flex-col lg:justify-center lg:py-[clamp(16px,3svh,48px)]! [&>div]:w-full"
    >
      <div className="mb-[clamp(14px,2.4svh,28px)]">
        <SectionEyebrow className="mb-[clamp(10px,1.5svh,16px)]">Comparison</SectionEyebrow>
        <h2 className="mb-[clamp(10px,1.4svh,14px)] text-balance text-[clamp(24px,2.8vw,38px)] font-bold leading-[1.05] tracking-[-0.035em] text-dark">
          Metaborong vs. large Web3/AI agencies and freelancers
        </h2>
        <p className="max-w-[760px] text-[clamp(14px,1.05vw,16px)] leading-[1.55] tracking-[-0.01em] text-gray">
          A side-by-side comparison of Metaborong — a lean Web3 and AI development studio with integrated delivery across engineering, project management, and operations — against large agencies and freelance teams.
        </p>
      </div>
      <div className="hidden border border-border lg:block lg:overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-[13px]">
          <caption className="sr-only">
            Comparison of Metaborong, large Web3 or AI agencies, and freelance teams across seven operational dimensions: team access, AI-native operations, engineering standards, delivery timeline, documentation and handover, process and project management, and track record.
          </caption>
          <thead>
            <tr>
              <th scope="col" className={`${headCell} w-[22%] bg-bg-subtle text-gray`}>
                <span className="mb-[4px] block text-[9px] tracking-[0.14em] text-gray-light">[00]</span>
                Dimension
              </th>
              <th scope="col" className={`${headCell} w-[26%] bg-brand text-white`}>
                <span className="mb-[4px] block text-[9px] tracking-[0.14em] text-white/70">[01]</span>
                Metaborong
              </th>
              <th scope="col" className={`${headCell} w-[26%] bg-bg-subtle text-gray`}>
                <span className="mb-[4px] block text-[9px] tracking-[0.14em] text-gray-light">[02]</span>
                Large Web3 / AI Agency
              </th>
              <th scope="col" className={`${headCell} w-[26%] bg-bg-subtle text-gray`}>
                <span className="mb-[4px] block text-[9px] tracking-[0.14em] text-gray-light">[03]</span>
                Freelance Team
              </th>
            </tr>
          </thead>
          <ComparisonRows rows={rows} />
        </table>
      </div>

      {/* Stacked dimension cards — <lg (no horizontal scroll on phones/portrait tablets). */}
      <div className="flex flex-col gap-[12px] lg:hidden">
        {rows.map((r) => (
          <article key={r.label} className="border border-border bg-bg">
            <p className="border-b border-border bg-bg-subtle px-[16px] py-[10px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-dark">
              {r.label}
            </p>
            <dl className="divide-y divide-border-subtle">
              <div className="bg-brand/[0.04] px-[16px] py-[12px]">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Metaborong</dt>
                <dd className="mt-[4px] text-[14px] leading-[1.5] text-dark">
                  <b className="font-bold text-brand">{r.mbBold}</b>
                  {r.mbRest}
                </dd>
              </div>
              <div className="px-[16px] py-[12px]">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-light">Large Web3 / AI Agency</dt>
                <dd className="mt-[4px] text-[14px] leading-[1.5] text-gray">
                  {r.large}
                  {r.largeCheck && <span aria-hidden="true" className="ml-[6px] font-bold text-accent">✓</span>}
                </dd>
              </div>
              <div className="px-[16px] py-[12px]">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-light">Freelance Team</dt>
                <dd className="mt-[4px] text-[14px] leading-[1.5] text-gray">{r.free}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="mt-[clamp(12px,2svh,18px)] max-w-[72ch] font-mono text-[12px] leading-[1.55] text-gray">
        <span className="mr-[4px] font-bold text-accent">✓</span>
        marks where the alternative has a structural advantage. Large agencies bring longer track records and procurement maturity. Metaborong&apos;s edge is integrated delivery — one senior team across engineering, project management, and operations, with fewer handoffs and faster decisions.
      </p>
    </Section>
  )
}

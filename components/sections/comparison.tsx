import { Section } from '@/components/ui/section'
import { ComparisonTable, type ComparisonRow } from '@/components/sections/comparison-table'

const rows: ComparisonRow[] = [
  { label: 'Team access',                     mb: 'Founder-led, no account-manager layer',                       large: 'Tiered through account managers',     free: 'Direct, varies by contractor' },
  { label: 'AI-native operations',            mb: 'Agentic AI runs spec, review, and QA workflows',              large: 'Manual handoffs across teams',         free: 'Manual, per-contractor' },
  { label: 'Engineering standards',           mb: 'Code review, CI/CD, and automated tests on every change',     large: 'Standards vary by team and engagement', free: 'Practices vary by contractor' },
  { label: 'Delivery timeline',               mb: '4–12 weeks per engagement',                                   large: '3–6 months or longer',                  free: 'Variable, project-dependent' },
  { label: 'Documentation and handover',      mb: 'Architecture docs and runbooks shipped with the build',       large: 'Scoped as a separate phase',            free: 'Often informal' },
  { label: 'Process and project management',  mb: 'Integrated across engineering, PM, and operations',           large: 'Siloed across separate teams',          free: 'Ad hoc, project-dependent' },
  { label: 'Track record',                    mb: '25+ products in production',                                  large: 'Hundreds of clients ✓',                 free: 'Portfolio varies by team' },
]

export function ComparisonSection() {
  return (
    <Section bg="default" maxWidth="xwide" label="Comparison">
      <div className="mb-[24px] md:mb-[32px]">
        <h2 className="mb-[16px] text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.035em] text-dark">
          Metaborong vs. large Web3/AI agencies and freelancers
        </h2>
        <p className="max-w-[760px] text-[16px] leading-[1.65] tracking-[-0.01em] text-gray">
          A side-by-side comparison of Metaborong — a lean Web3 and AI development studio with integrated delivery across engineering, project management, and operations — against large agencies and freelance teams.
        </p>
      </div>
      <ComparisonTable rows={rows} />
      <p className="mt-[16px] max-w-[920px] text-[12px] leading-[1.6] text-gray">
        ✓ marks where the alternative has a structural advantage. Large agencies bring longer track records and procurement maturity. Metaborong&apos;s edge is integrated delivery — one senior team across engineering, project management, and operations, with fewer handoffs and faster decisions.
      </p>
    </Section>
  )
}

import { Section } from '@/components/ui/section'
import { Markdown } from '@/components/ui/markdown'
import { SunsetPromptBar } from './sunset-promptbar'
import { ModelSwitchMock, AdaptiveMock, CollabMock } from './sunset-mocks'

// "What Metaborong Built" — product-mock vignette rows. Each locked-copy
// feature is paired with a stylized mock of the real SunsetML feature, sides
// alternating, so the section shows the app instead of reading like a document.
// Mocks are matched to features by order (see content/work/sunset.md ###s).

const MOCKS = [<SunsetPromptBar key="p" />, <ModelSwitchMock key="m" />, <AdaptiveMock key="a" />, <CollabMock key="c" />]

export function SunsetBuilt({
  intro,
  features,
}: {
  intro: string
  features: { title: string; body: string }[]
}) {
  return (
    <Section bg="default" maxWidth="wide" className="py-[48px] sm:py-[72px] lg:py-[100px] border-t border-border">
      <div className="mb-[44px] max-w-[760px] sm:mb-[64px] lg:mb-[88px]">
        <h2 className="mb-[18px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand">What Metaborong Built</h2>
        <div className="text-[19px] font-semibold leading-[1.4] tracking-[-0.02em] text-dark sm:text-[22px]">
          <Markdown content={intro} />
        </div>
      </div>

      <div className="flex flex-col gap-[56px] sm:gap-[80px] lg:gap-[104px]">
        {features.map((feat, i) => {
          const flip = i % 2 === 1
          return (
            <div key={i} className="grid items-start gap-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[72px]">
              <div className={`lg:pt-[6px] ${flip ? 'lg:order-2' : ''}`}>{MOCKS[i] ?? null}</div>
              <div className={flip ? 'lg:order-1' : ''}>
                <span className="font-mono text-[12px] font-bold tracking-[0.12em] text-brand/45">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-[10px] text-[24px] font-bold leading-[1.1] tracking-[-0.03em] text-dark sm:text-[30px] lg:text-[34px]">
                  {feat.title}
                </h3>
                <div className="mt-[16px] max-w-[42ch] text-[15px] leading-[1.7] text-gray sm:text-[16px]">
                  <Markdown content={feat.body} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

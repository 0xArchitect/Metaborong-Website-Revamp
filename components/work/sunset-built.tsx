import { Section } from '@/components/ui/section'
import { SunsetPromptBar } from './sunset-promptbar'
import { ModelSwitchMock, AdaptiveMock, CollabMock } from './sunset-mocks'

// "What Metaborong Built" — alternating product-mock vignette rows. Each
// locked-copy feature is paired with a stylized mock of the real SunsetML
// feature (mock and copy swap sides each row, vertically centered) so the
// section shows the app instead of reading like a document. Prose renders as
// plain paragraphs (not <Markdown>) so the type scale and rhythm stay
// controlled — keeps the section compact and edge-consistent.

const MOCKS = [<SunsetPromptBar key="p" />, <ModelSwitchMock key="m" />, <AdaptiveMock key="a" />, <CollabMock key="c" />]

type Feat = { title: string; body: string }

function paras(text: string): string[] {
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
}

export function SunsetBuilt({ intro, features }: { intro: string; features: Feat[] }) {
  return (
    <Section bg="default" maxWidth="xwide" className="py-[44px] sm:py-[64px] lg:py-[88px] border-t border-border">
      <div className="mb-[36px] max-w-[680px] sm:mb-[48px] lg:mb-[64px]">
        <h2 className="mb-[16px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand">What Metaborong Built</h2>
        {paras(intro).map((p, i) => (
          <p key={i} className="text-[16px] font-medium leading-[1.55] tracking-[-0.015em] text-dark/80 sm:text-[17px]">
            {p}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-[40px] sm:gap-[56px] lg:gap-[72px]">
        {features.map((feat, i) => {
          const flip = i % 2 === 1
          return (
            <div key={i} className="grid items-center gap-[20px] sm:gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[56px] xl:gap-[72px]">
              <div className={flip ? 'lg:order-2' : ''}>
                <div className="mx-auto max-w-[420px] lg:mx-0 lg:max-w-none">{MOCKS[i] ?? null}</div>
              </div>
              <div className={flip ? 'lg:order-1' : ''}>
                <span className="font-mono text-[12px] font-bold tracking-[0.12em] text-brand/45">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-[8px] text-[22px] font-bold leading-[1.1] tracking-[-0.03em] text-dark sm:text-[26px] lg:text-[30px]">{feat.title}</h3>
                <div className="mt-[14px] max-w-[46ch] space-y-[12px] text-[15px] leading-[1.65] text-gray sm:text-[16px]">
                  {paras(feat.body).map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

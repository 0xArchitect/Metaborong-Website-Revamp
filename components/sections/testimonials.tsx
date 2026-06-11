import { Section } from '@/components/ui/section'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'
import { ClutchWidget } from '@/components/sections/clutch-widget'
import { clutchProfileUrl } from '@/lib/links'
// Verbatim review highlights from the verified Clutch profile
// (clutch.co/profile/metaborong-technologies-private). Surfaced natively (white,
// borderless, crawlable) as the section's main element; the live Clutch type-16
// review-collector badge sits top-right as the verifiable third-party marker.
// The live widget is the source of truth for rating/count — never hardcode the
// numbers. Refresh quotes when the Clutch profile changes.
const reviews = [
  { quote: 'Their implementation and prompt product delivery stood out.', role: 'Executive', company: 'Sedax Data Solutions' },
  { quote: 'They had great teamwork and the ability to understand and adapt to the business problems.', role: 'President', company: 'Digital Financial Aid Corporation' },
  { quote: 'All works were delivered within the promised deadlines with proper deliverables.', role: 'Executive', company: 'SBS Construction' },
  { quote: 'Their ability to translate IT concepts into solutions for the food and beverage sector was particularly impressive.', role: 'CEO', company: 'Taisi' },
  { quote: 'They provided strategic insights that directly impacted revenue optimization and stock management.', role: 'CEO', company: 'Miniso Greece' },
  { quote: 'They did not just build a tool; they designed a solution tailored to our business model and revenue goals.', role: 'General Manager', company: 'Mayada Marketing Services' },
]

export function TestimonialsSection() {
  return (
    <Section
      bg="default"
      maxWidth="xwide"
      divider
      reveal={false}
      className="lg:flex lg:min-h-[calc(100svh-56px)] lg:flex-col lg:justify-center lg:py-[clamp(24px,4svh,72px)]!"
    >
      <div className="mb-[clamp(20px,3.5svh,44px)] grid grid-cols-1 items-end gap-[clamp(20px,3vw,40px)] lg:grid-cols-[1fr_minmax(0,400px)]">
        <div className="flex flex-col">
          <SectionEyebrow className="mb-[14px]">Social proof</SectionEyebrow>
          <h2 className="max-w-[20ch] text-balance text-[clamp(24px,2.7vw,38px)] font-bold leading-[1.08] tracking-[-0.035em] text-dark">
            Reviewed and verified on Clutch
          </h2>
          <p className="mt-[12px] max-w-[58ch] text-[clamp(13px,1vw,15px)] leading-[1.55] tracking-[-0.01em] text-gray">
            Real clients rate our work on Clutch, the independent review platform for B2B service providers. Every review is verified, every reviewer is named.
          </p>
        </div>
        <div className="w-full lg:justify-self-end">
          <ClutchWidget widgetType="16" height={90} className="w-full" />
        </div>
      </div>

      <div className="relative [--cw:calc(100vw-32px)] sm:[--cw:calc(100vw-48px)]">
        {/* Pull-quote mark anchors each card; stars + name sit in a meta row. */}
        <ul className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] md:grid md:gap-x-[clamp(28px,3.5vw,56px)] md:gap-y-[clamp(16px,2.6svh,32px)] md:grid-cols-2 lg:grid-cols-3 pb-[24px] -mx-[16px] px-[16px] sm:-mx-[24px] sm:px-[24px] md:mx-0 md:px-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((r) => (
            <li
              key={r.company}
              className="snap-center snap-always shrink-0 w-[calc(100vw-32px)] sm:w-[calc(100vw-48px)] md:w-auto md:max-w-none flex flex-col justify-between border border-border bg-white p-[24px] sm:p-[32px]"
            >
              <figure className="flex h-full flex-col">
                <span aria-hidden="true" className="block font-mono font-bold leading-[0.7] text-accent text-[46px] h-[30px]">“</span>
                <blockquote className="mt-[4px] text-[clamp(14px,1.2vw,18px)] font-medium leading-[1.45] tracking-[-0.01em] text-dark">
                  {r.quote}
                </blockquote>
                <div className="mt-[20px] md:mt-auto flex items-center gap-[10px] border-t border-border-subtle pt-[14px]">
                  <span aria-hidden="true" className="text-[12px] tracking-[2px] text-accent">★★★★★</span>
                  <figcaption className="font-mono text-[11px] uppercase tracking-[0.1em] text-gray">
                    <b className="font-bold text-dark">{r.role}</b>, {r.company}
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>

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

      <a href={clutchProfileUrl} target="_blank" rel="noopener noreferrer" className="sr-only">
        Read Metaborong&apos;s verified client reviews on Clutch.
      </a>
    </Section>
  )
}

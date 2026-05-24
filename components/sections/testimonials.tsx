import { Section } from '@/components/ui/section'
import { Pill } from '@/components/ui/pill'
import { ClutchWidget } from '@/components/sections/clutch-widget'
import { clutchProfileUrl } from '@/lib/links'

const rating = '4.9'
const reviewCount = '9'

// Curated review IDs surfaced by the official Clutch type-3 reviews widget.
const clutchReviewIds = '457842,454740,453781,439014,438481'

// Social proof. Split panel, both halves equal-height (lg:items-stretch) so their
// top and bottom edges stay parallel: left = aggregate trust (crawlable figures +
// AggregateRating JSON-LD on the Organization node in lib/schema.ts + outbound link),
// right = the live Clutch reviews widget. An aria-hidden fallback sits behind the
// (opaque) iframe so the panel is never blank if Clutch's CDN is blocked.
export function TestimonialsSection() {
  return (
    <Section bg="default" maxWidth="xwide" divider reveal={false}>
      <div className="mb-[clamp(28px,4vw,44px)] flex flex-col">
        <Pill className="mb-[16px]">Social proof</Pill>
        <h2 className="max-w-[20ch] text-balance text-[clamp(26px,2.9vw,40px)] font-bold leading-[1.08] tracking-[-0.035em] text-dark">
          Reviewed and verified on Clutch
        </h2>
        <p className="mt-[14px] max-w-[60ch] text-[clamp(14px,1.05vw,16px)] leading-[1.6] tracking-[-0.01em] text-gray">
          Real clients rate our work on Clutch, the independent review platform for B2B service providers. Every review is verified, every reviewer is named.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-stretch lg:gap-[24px]">
        {/* Left: aggregate trust panel */}
        <div className="flex flex-col border border-border">
          <div className="flex items-center justify-between border-b border-border px-[clamp(20px,2.5vw,28px)] py-[14px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-light">
            <span className="inline-flex items-center gap-[8px]">
              <span aria-hidden="true" className="inline-block h-[8px] w-[8px] bg-brand" />
              Verified · Clutch
            </span>
            <span className="normal-case tracking-[0.04em] text-gray">clutch.co</span>
          </div>

          <div className="flex flex-1 flex-col justify-center px-[clamp(20px,2.5vw,32px)] py-[clamp(24px,3vw,36px)]">
            <div className="flex items-baseline gap-[12px]">
              <span className="text-[clamp(64px,7vw,104px)] font-bold leading-[0.82] tracking-[-0.045em] text-dark tabular-nums">
                {rating}
              </span>
              <span className="font-mono text-[13px] tracking-[0.04em] text-gray-light">/ 5.0</span>
            </div>
            <div aria-hidden="true" className="mt-[12px] text-[18px] tracking-[3px] text-accent">
              ★★★★★
            </div>
            <p className="mt-[12px] font-mono text-[12px] tracking-[0.04em] text-gray">
              <b className="font-bold text-dark">{reviewCount} verified</b> client reviews
            </p>
          </div>

          <a
            href={clutchProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-[8px] border-t border-border px-[clamp(20px,2.5vw,32px)] py-[18px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand no-underline transition-colors hover:bg-brand/[0.04]"
          >
            View all reviews on Clutch
            <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]">→</span>
          </a>
        </div>

        {/* Right: live Clutch reviews widget, with a behind-the-iframe fallback */}
        <div className="relative min-h-[320px] border border-border">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[8px] px-[24px] text-center"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-light">
              Verified · Clutch
            </span>
            <span className="text-[14px] leading-[1.5] text-gray">
              {reviewCount} verified client reviews · {rating} / 5.0
            </span>
          </div>
          <ClutchWidget
            widgetType="3"
            height={320}
            reviews={clutchReviewIds}
            className="relative h-full w-full"
          />
        </div>
      </div>

      <p className="sr-only">
        Metaborong is rated {rating} out of 5 based on {reviewCount} verified client reviews on Clutch.
      </p>
    </Section>
  )
}

import { Section } from '@/components/ui/section'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'
import { ClutchWidget } from '@/components/sections/clutch-widget'
import { clutchProfileUrl } from '@/lib/links'

const rating = '4.9'
const reviewCount = '9'

// Verbatim review highlights from the verified Clutch profile
// (clutch.co/profile/metaborong-technologies-private). Surfaced natively (white,
// borderless, crawlable) as the section's main element; the live Clutch type-16
// review-collector badge sits top-right as the verifiable third-party marker.
// Aggregate figures are mirrored in AggregateRating JSON-LD on the Organization
// node (lib/schema.ts). Refresh quotes when the Clutch profile changes.
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

      <ul className="grid grid-cols-1 gap-x-[clamp(28px,3.5vw,56px)] gap-y-[clamp(16px,2.6svh,32px)] md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={r.company}>
            <figure className="flex h-full flex-col">
              <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-gray-light">
                [{String(i + 1).padStart(2, '0')}]
              </span>
              <span aria-hidden="true" className="mt-[10px] text-[14px] tracking-[3px] text-accent">★★★★★</span>
              <blockquote className="mt-[10px] text-[clamp(13px,1.05vw,16px)] leading-[1.5] tracking-[-0.01em] text-dark">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-auto pt-[14px] font-mono text-[11px] uppercase tracking-[0.1em] text-gray">
                <b className="font-bold text-dark">{r.role}</b>, {r.company}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <a href={clutchProfileUrl} target="_blank" rel="noopener noreferrer" className="sr-only">
        Metaborong is rated {rating} out of 5 based on {reviewCount} verified client reviews on Clutch.
      </a>
    </Section>
  )
}

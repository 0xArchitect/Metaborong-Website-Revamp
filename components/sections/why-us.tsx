// components/sections/why-us.tsx
import { clutchProfileUrl } from '@/lib/links'
import { WhyUsSlider } from '@/components/sections/why-us-slider'
import { LEDE } from '@/components/sections/why-us-data'

export function WhyUsSection() {
  return (
    <section id="why-us" aria-label="Why founders choose Metaborong" className="bg-bg">
      {/* Crawlable summary (visible lede dropped for the single-viewport pin). The
          visible H2 lives inside <WhyUsSlider>; the section is labelled directly to
          avoid a duplicate heading in the a11y tree. */}
      <p className="sr-only">{LEDE}</p>
      <a href={clutchProfileUrl} target="_blank" rel="noopener noreferrer" className="sr-only">
        Metaborong is independently rated by verified clients on Clutch
      </a>
      <WhyUsSlider />
    </section>
  )
}

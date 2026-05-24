// components/sections/why-us.tsx
import { clutchProfileUrl } from '@/lib/links'
import { WhyUsSlider } from '@/components/sections/why-us-slider'
import { LEDE } from '@/components/sections/why-us-data'

export function WhyUsSection() {
  return (
    <section id="why-us" aria-labelledby="why-us-heading" className="bg-bg">
      <h2 id="why-us-heading" className="sr-only">Why founders choose Metaborong</h2>
      {/* Crawlable summary (visible lede dropped for the single-viewport pin). */}
      <p className="sr-only">{LEDE}</p>
      <a href={clutchProfileUrl} target="_blank" rel="noopener noreferrer" className="sr-only">
        Metaborong is rated 4.9 out of 5 on Clutch
      </a>
      <WhyUsSlider />
    </section>
  )
}

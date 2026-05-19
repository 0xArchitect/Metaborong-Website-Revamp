import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export function ContactCtaSection() {
  return (
    <Section bg="default" maxWidth="xwide">
      <div className="relative isolate text-center">
        {/* Decorative ASCII-hills raster, anchored to the content-box bottom.
            Figma 233:261 (frame ≈ content width, not viewport-bleed). Static,
            aria-hidden; section is fully legible on bg-bg without it. */}
        <img
          src="/contact/ascii-hills.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto max-h-[clamp(220px,42vw,460px)] w-full select-none object-cover object-bottom"
        />
        <div className="mx-auto max-w-[640px]">
          <h2 className="text-[clamp(34px,5vw,56px)] font-black uppercase leading-[1.03] tracking-[-0.03em] text-dark">
            Tell us the build. We&apos;ll send the approach.
          </h2>
          <p className="mx-auto mt-[20px] max-w-[560px] text-[16px] leading-[1.6] tracking-[-0.01em] text-gray">
            No pitch deck, no discovery-call gauntlet — a written approach to your Web3 or AI build, straight from a founder.
          </p>
          <div className="mt-[32px] flex flex-col items-center gap-[16px]">
            <Button
              variant="primary"
              size="lg"
              href="mailto:contact@metaborong.com?subject=New%20project%20inquiry"
              arrow="→"
              className="min-h-[44px]"
            >
              Email us
            </Button>
            <p className="text-[13px] tracking-[-0.005em] text-gray">
              Most teams hear back within 12 hours.
            </p>
          </div>
          <a
            href="mailto:contact@metaborong.com"
            className="mt-[20px] inline-block text-[14px] tracking-[-0.01em] text-gray no-underline transition-[color] duration-[var(--duration-instant)] hover:text-dark"
          >
            contact@metaborong.com
          </a>
        </div>
      </div>
    </Section>
  )
}

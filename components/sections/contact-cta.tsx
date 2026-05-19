import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export function ContactCtaSection() {
  return (
    <Section
      bg="default"
      maxWidth="xwide"
      className="relative isolate overflow-hidden"
    >
      {/* Decorative grassy-hills band (Figma 233:261 / asset 237:341):
          full-bleed, anchored flush to the section's bottom edge, behind
          the content. The asset's feathered, transparent hilltops blend
          into bg-bg; the content column reserves enough bottom space that
          every line of copy sits on white (AA-safe — keeps the FINDING-001
          fix while restoring the Figma composition). */}
      <img
        src="/contact/ascii-hills.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -bottom-[48px] left-1/2 -z-10 h-[clamp(240px,44vw,580px)] w-screen max-w-none -translate-x-1/2 select-none object-cover object-top md:-bottom-[64px] lg:-bottom-[72px]"
      />
      <div className="relative mx-auto max-w-[640px] pb-[clamp(180px,32vw,400px)] text-center">
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
    </Section>
  )
}

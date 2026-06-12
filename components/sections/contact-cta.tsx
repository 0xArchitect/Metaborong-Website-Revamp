import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { TrackClick } from '@/components/ui/track-click'

export function ContactCtaSection() {
  return (
    <Section bg="default" maxWidth="xwide">
      <div className="relative isolate overflow-hidden bg-canvas text-off-white">
        {/* Background landscape (Figma Super-Visuals node 1:19), muted to a texture. */}
        <img
          src="/contact/landscape.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover opacity-[.35] grayscale-[80%] contrast-[1.1]"
        />
        {/* Two stacked background gradients: left-weighted dark→transparent wash +
            top/bottom vignette so the copy clears AA over the image. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,10,10,.92) 0%, rgba(10,10,10,.7) 55%, rgba(10,10,10,.3) 100%), linear-gradient(180deg, rgba(10,10,10,.4) 0%, transparent 30%, transparent 70%, rgba(10,10,10,.7) 100%)',
          }}
        />

        <div className="relative z-[2] grid grid-cols-1 items-end gap-[32px] px-[32px] pt-[56px] pb-[64px] lg:grid-cols-[1.3fr_1fr] lg:gap-[56px] lg:px-[72px] lg:py-[96px]">
          <div>
            <div className="mb-[20px] inline-flex items-center gap-[10px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-off-white">
              <span aria-hidden="true" className="inline-block h-[8px] w-[8px] bg-[var(--cta-color,var(--color-brand))]" />
              Got a project in mind?
            </div>
            <h2 className="max-w-[18ch] text-balance text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.0] tracking-[-0.04em] text-white">
              Tell us what you are building.
            </h2>
            <p className="mt-[20px] max-w-[56ch] text-[17px] leading-[1.55] text-white/85">
              We build what large agencies under-deliver and freelancers can&apos;t architect, across Web3 protocols, AI agents, and SaaS products. Tell us what you are building. We will tell you how we would approach it, no pitch deck, no fluff, no commitment required.
            </p>
          </div>

          <div className="flex flex-col items-start gap-[18px]">
            <TrackClick event="contact_click" data={{ source: 'contact-cta' }}>
              <Button
                variant="primary"
                size="md"
                href="mailto:contact@metaborong.com?subject=New%20project%20inquiry"
                arrow="→"
                className="min-h-[44px]"
              >
                Start a conversation
              </Button>
            </TrackClick>
            <div className="flex flex-col gap-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
              <span>
                Reply within <b className="font-bold text-white">12h</b>
              </span>
              <span>No pitch deck. No commitment.</span>
              <span>
                <b className="font-bold text-white">contact@metaborong.com</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

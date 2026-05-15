export function ContactCtaSection() {
  return (
    <section className="bg-canvas px-[16px] py-[72px] text-center sm:px-[24px] md:px-[48px] md:py-[88px] lg:px-[96px] lg:py-[96px] xl:px-[128px]">
      <div className="mx-auto max-w-[600px]">
        <h2 className="mb-[18px] text-[clamp(34px,5vw,64px)] font-bold leading-[1.03] tracking-[-0.04em] text-white">
          Tell us the build. We&apos;ll send the approach.
        </h2>
        <p className="mx-auto mb-[28px] max-w-[460px] text-[16px] leading-[1.65] tracking-[-0.01em] text-white/55 md:mb-[36px] md:text-[17px]">
          No pitch deck. No discovery-call gauntlet. Just a written approach you can take or leave.
        </p>
        <div className="flex flex-col items-stretch justify-center gap-[12px] sm:flex-row sm:items-center">
          <a
            href="mailto:contact@metaborong.com?subject=New%20project%20inquiry"
            className="inline-flex min-h-[44px] items-stretch justify-center bg-brand text-[15px] font-semibold tracking-[-0.01em] text-white no-underline [font-feature-settings:'tnum']"
          >
            <span className="px-[22px] py-[12px]">Email us</span>
            <span aria-hidden="true" className="border-l border-white/15 bg-white/10 px-[16px] py-[12px]">→</span>
          </a>
          <a
            href="mailto:contact@metaborong.com"
            className="inline-flex min-h-[44px] items-center justify-center px-[8px] py-[10px] text-[15px] tracking-[-0.01em] text-white/55 no-underline transition-colors duration-[var(--duration-instant)] hover:text-white"
          >
            contact@metaborong.com
          </a>
        </div>
        <p className="mt-[24px] text-[13px] tracking-[-0.005em] text-white/35">
          Most teams hear back within 12 hours.
        </p>
      </div>
    </section>
  )
}

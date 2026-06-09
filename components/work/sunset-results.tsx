// SunsetML "Results & Impact" — oversized editorial figures on the dark band,
// no card grid. The four display figures mirror content/work/sunset.md Results
// (locked, user-supplied); the qualitative outcomes are parsed from the same
// markdown so prose stays single-sourced.

const FIGURES = [
  { value: '350', label: 'on the waitlist' },
  { value: '75', label: 'early users' },
  { value: '4', label: 'frontier models' },
  { value: '2026', label: 'shipped 0 → production' },
]

export function SunsetResults({ results }: { results: string }) {
  // Qualitative outcome lines = bullets with no "metric:" prefix.
  const outcomes = results
    .split('\n')
    .filter((l) => /^\s*[-*]/.test(l))
    .map((l) => l.replace(/^\s*[-*]\s*/, '').trim())
    .filter((b) => !b.includes(':'))
    .map((b) => b.replace(/\*\*/g, ''))

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-[64px] sm:py-[100px] lg:py-[132px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-[60%] w-[50%] bg-[radial-gradient(ellipse_at_top_left,#3b5bff40,transparent_65%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-[16px] sm:px-[24px] md:px-[48px] lg:px-[80px] xl:px-[128px]">
        <h2 className="mb-[40px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 sm:mb-[56px]">
          Results &amp; Impact
        </h2>

        {/* Oversized figures — hairline-separated, no cards. */}
        <div className="grid grid-cols-2 border-t border-white/15 lg:grid-cols-4">
          {FIGURES.map((f, i) => (
            <div
              key={f.value}
              className={`border-b border-white/15 py-[28px] sm:py-[36px] lg:border-b-0 ${
                i % 2 === 0 ? 'pr-[20px]' : 'pl-[20px] sm:pl-[28px]'
              } lg:px-0 ${i > 0 ? 'lg:border-l lg:border-white/15 lg:pl-[28px] xl:pl-[40px]' : ''}`}
            >
              <p className="text-[clamp(48px,7vw,84px)] font-bold leading-[0.95] tracking-[-0.04em] text-white [font-feature-settings:'tnum']">
                {f.value}
              </p>
              <p className="mt-[10px] text-[13px] font-medium leading-[1.4] tracking-[-0.01em] text-white/45 sm:text-[14px]">
                {f.label}
              </p>
            </div>
          ))}
        </div>

        {/* Qualitative outcomes — flowing lines, not tiles. */}
        {outcomes.length > 0 && (
          <ul className="mt-[40px] grid gap-x-[48px] gap-y-[14px] sm:mt-[52px] md:grid-cols-2 lg:max-w-[1000px]">
            {outcomes.map((o, i) => (
              <li key={i} className="flex gap-[12px] text-[15px] leading-[1.6] text-white/70 sm:text-[16px]">
                <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-brand" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

import { Fragment } from 'react'

// MAGIC "Results & Impact" — qualitative dark band, no figure grid. MAGIC's
// engagement carries no published metrics, so Results leads with the build
// credential and lists outcome statements (parsed from content/work/magic.md)
// rather than fabricated numbers. #a855f7 decorative bloom bookends the hero.

function renderBold(s: string) {
  // Render **bold** spans inside an outcome line; everything else plain.
  return s.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-white">{part}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export function MagicResults({ results }: { results: string }) {
  const lines = results.split('\n')
  const intro = lines.filter((l) => l.trim() && !/^\s*[-*]/.test(l)).join(' ').trim()
  const outcomes = lines
    .filter((l) => /^\s*[-*]/.test(l))
    .map((l) => l.replace(/^\s*[-*]\s*/, '').trim())

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-[64px] sm:py-[100px] lg:py-[132px]">
      {/* Purple bloom — same MAGIC accent as the hero glow (#a855f7). */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[10%] left-0 h-[70%] w-[55%] bg-[radial-gradient(ellipse_at_top_left,#a855f745,transparent_66%)]" />
        <div className="absolute top-0 left-[6%] h-[48%] w-[36%] bg-[radial-gradient(ellipse_at_center,#a855f722,transparent_60%)] blur-[50px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-[16px] sm:px-[24px] md:px-[48px] lg:px-[80px] xl:px-[128px]">
        <h2 className="mb-[28px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/55 sm:mb-[36px]">
          Results &amp; Impact
        </h2>

        {intro && (
          <p className="mb-[40px] max-w-[900px] text-[clamp(22px,3vw,34px)] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:mb-[52px]">
            {intro}
          </p>
        )}

        {outcomes.length > 0 && (
          <ul className="grid gap-x-[48px] gap-y-[16px] border-t border-white/15 pt-[32px] md:grid-cols-2 lg:max-w-[1040px]">
            {outcomes.map((o, i) => (
              <li key={i} className="flex gap-[12px] text-[15px] leading-[1.6] text-white/70 sm:text-[16px]">
                <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#a855f7]" />
                <span>{renderBold(o)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

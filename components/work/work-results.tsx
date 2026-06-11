import { Fragment, type ReactNode } from 'react'

// Generic "Results & Impact" — qualitative dark band, no figure grid (for case
// studies with no published metrics). Leads with a build-credential statement
// and lists outcome bullets parsed from the md. Renders inline **bold** and
// [text](url) links. `glow` is the bright decorative accent (good contrast on
// the dark band); used for the bloom, bullet dots, and link text.

function renderInline(s: string, glow: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push(<Fragment key={key++}>{s.slice(last, m.index)}</Fragment>)
    if (m[1]) {
      out.push(
        <a key={key++} href={m[2]} target="_blank" rel="noopener" className="font-semibold underline underline-offset-2" style={{ color: glow }}>{m[1]}</a>,
      )
    } else {
      out.push(<strong key={key++} className="font-semibold text-white">{m[3]}</strong>)
    }
    last = re.lastIndex
  }
  if (last < s.length) out.push(<Fragment key={key++}>{s.slice(last)}</Fragment>)
  return out
}

export function WorkResults({ results, glow }: { results: string; glow: string }) {
  const lines = results.split('\n')
  const intro = lines.filter((l) => l.trim() && !/^\s*[-*]/.test(l)).join(' ').trim()
  const outcomes = lines
    .filter((l) => /^\s*[-*]/.test(l))
    .map((l) => l.replace(/^\s*[-*]\s*/, '').trim())

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-[64px] sm:py-[100px] lg:py-[132px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[10%] left-0 h-[70%] w-[55%]" style={{ background: `radial-gradient(ellipse at top left, ${glow}45, transparent 66%)` }} />
        <div className="absolute top-0 left-[6%] h-[48%] w-[36%] blur-[50px]" style={{ background: `radial-gradient(ellipse at center, ${glow}22, transparent 60%)` }} />
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
                <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ backgroundColor: glow }} />
                <span>{renderInline(o, glow)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

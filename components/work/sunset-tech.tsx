// SunsetML "Technical Approach" — a routing pipeline rendered as a labelled
// flow (Editor surface → NestJS orchestration → model providers) on a vertical
// spine, with an animated signal pulse running down it and the four concurrency
// constraints tagged on the routing node. Shows the architecture instead of
// describing it; no card structures. Pulse is pure CSS, reduced-motion-safe.

const NODES = [
  { n: '01', name: 'Editor surface', tech: 'Next.js · React · Framer Motion', note: 'low-noise, real-time UI' },
  { n: '02', name: 'Orchestration', tech: 'NestJS', note: 'contextual routing + collaboration' },
  { n: '03', name: 'Model providers', tech: '', note: '' },
] as const

const CONSTRAINTS = ['Low-latency response', 'Realtime sync', 'Multi-model routing', 'Uninterrupted typing']
const MODELS = ['GPT-5.5', 'GPT-5.4 mini', 'Claude Sonnet 4.6', 'Claude Opus 4.7']

export function SunsetTech() {
  return (
    <div className="grid gap-[32px] lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-[72px]">
      <div>
        <h2 className="mb-[16px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#c43a00]">Technical Approach</h2>
        <p className="max-w-[42ch] text-[15px] leading-[1.65] text-gray sm:text-[16px]">
          A contextual routing layer keeps AI assistance invisible until it is needed and near-instant when called, so switching across GPT-5.5, GPT-5.4 mini, Claude Sonnet 4.6, and Claude Opus 4.7 never interrupts the writing session.
        </p>
      </div>

      <div className="relative pl-[26px]">
        <span aria-hidden className="absolute left-[4px] top-[10px] bottom-[10px] w-[2px] bg-border" />
        <span aria-hidden className="mb-techpulse absolute left-[1px] h-[8px] w-[8px] rounded-full bg-brand" />
        <div className="flex flex-col gap-[28px]">
          {NODES.map((node, i) => (
            <div key={i} className="relative">
              <span aria-hidden className="absolute left-[-26px] top-[5px] h-[10px] w-[10px] rounded-full border-2 border-brand bg-bg" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">{node.n} · {node.name}</span>
              {node.tech && <p className="mt-[4px] text-[16px] font-semibold tracking-[-0.01em] text-dark">{node.tech}</p>}
              {node.note && <p className="mt-[2px] text-[13px] text-gray">{node.note}</p>}
              {i === 1 && (
                <div className="mt-[12px] flex flex-wrap gap-[6px]">
                  {CONSTRAINTS.map((c) => (
                    <span key={c} className="border border-border px-[10px] py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-gray">{c}</span>
                  ))}
                </div>
              )}
              {i === 2 && (
                <div className="mt-[10px] flex flex-wrap gap-[8px]">
                  {MODELS.map((m, j) => (
                    <span key={m} className={`border px-[10px] py-[5px] text-[13px] font-semibold ${j === 0 ? 'border-brand bg-brand/[0.06] text-dark' : 'border-border text-gray'}`}>{m}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes mb-techpulse { 0%,100% { top: 0; opacity: 0 } 10% { opacity: 1 } 72% { top: calc(100% - 8px); opacity: 1 } 86%,100% { opacity: 0 } }
        .mb-techpulse { animation: mb-techpulse 2.8s cubic-bezier(0.4,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .mb-techpulse { display: none; } }
      `}</style>
    </div>
  )
}

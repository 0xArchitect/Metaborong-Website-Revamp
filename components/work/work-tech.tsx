// Generic "Technical Approach" — the system rendered as a labelled flow on a
// vertical spine, with optional per-node chips (plain constraint tags, or an
// active-first output set). Static. Accent is the per-study functional colour.

export type TechNode = {
  n: string
  name: string
  tech?: string
  note?: string
  chips?: readonly string[]
  chipsActiveFirst?: boolean
}

export function WorkTech({ intro, nodes, accent }: { intro: string; nodes: readonly TechNode[]; accent: string }) {
  return (
    <div className="grid gap-[32px] lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-[72px]">
      <div>
        <h2 className="mb-[16px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>Technical Approach</h2>
        <p className="max-w-[42ch] text-[15px] leading-[1.65] text-gray sm:text-[16px]">{intro}</p>
      </div>

      <div className="relative pl-[26px]">
        <div className="flex flex-col gap-[28px]">
          {nodes.map((node, i) => (
            <div key={i} className="relative">
              {i < nodes.length - 1 && (
                <span aria-hidden className="absolute left-[-22px] top-[14px] h-[calc(100%+28px)] w-[2px] bg-border" />
              )}
              <span aria-hidden className="absolute left-[-26px] top-[9px] h-[10px] w-[10px] rounded-full border-2 bg-bg" style={{ borderColor: accent }} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: accent }}>{node.n} · {node.name}</span>
              {node.tech && <p className="mt-[4px] text-[16px] font-semibold tracking-[-0.01em] text-dark">{node.tech}</p>}
              {node.note && <p className="mt-[2px] text-[13px] text-gray">{node.note}</p>}
              {node.chips && node.chipsActiveFirst && (
                <div className="mt-[10px] flex flex-wrap gap-[8px]">
                  {node.chips.map((c, j) => (
                    <span
                      key={c}
                      className={`border px-[10px] py-[5px] text-[13px] font-semibold ${j === 0 ? 'text-dark' : 'border-border text-gray'}`}
                      style={j === 0 ? { borderColor: accent, backgroundColor: `${accent}10` } : undefined}
                    >{c}</span>
                  ))}
                </div>
              )}
              {node.chips && !node.chipsActiveFirst && (
                <div className="mt-[12px] flex flex-wrap gap-[6px]">
                  {node.chips.map((c) => (
                    <span key={c} className="border border-border px-[10px] py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-gray">{c}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

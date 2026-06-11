// MAGIC "Technical Approach" — the generation pipeline rendered as a labelled
// flow (one product image → controlled generation → cloud GPU render →
// multi-format output) on a vertical spine, with the four production constraints
// tagged on the generation node and the output formats on the final node. Shows
// the architecture instead of describing it; static. #6d28d9 is MAGIC's accent.

const NODES = [
  { n: '01', name: 'Source image', tech: 'Single product photo', note: 'one input, any SKU' },
  { n: '02', name: 'Controlled generation', tech: 'Scene templates · Deterministic rendering', note: 'brand-consistent, repeatable' },
  { n: '03', name: 'Cloud GPU render', tech: 'Concurrent generation jobs', note: 'high-volume throughput' },
  { n: '04', name: 'Multi-format output', tech: '', note: '' },
] as const

const CONSTRAINTS = ['Brand consistency', 'Deterministic output', 'Concurrent GPU throughput', 'Format standardization']
const OUTPUTS = ['Product videos', 'CGI scenes', 'Packshots', 'Platform formats']

export function MagicTech() {
  return (
    <div className="grid gap-[32px] lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-[72px]">
      <div>
        <h2 className="mb-[16px] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#6d28d9]">Technical Approach</h2>
        <p className="max-w-[42ch] text-[15px] leading-[1.65] text-gray sm:text-[16px]">
          A controlled generation architecture turns one product image into platform-specific videos, CGI scenes, and packshots, each rendered to the same brand specification, so output stays consistent across thousands of SKUs instead of drifting between assets.
        </p>
      </div>

      <div className="relative pl-[26px]">
        <div className="flex flex-col gap-[28px]">
          {NODES.map((node, i) => (
            <div key={i} className="relative">
              {/* Per-segment connector so the line terminates at the last circle. */}
              {i < NODES.length - 1 && (
                <span aria-hidden className="absolute left-[-22px] top-[14px] h-[calc(100%+28px)] w-[2px] bg-border" />
              )}
              <span aria-hidden className="absolute left-[-26px] top-[9px] h-[10px] w-[10px] rounded-full border-2 border-[#6d28d9] bg-bg" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#6d28d9]">{node.n} · {node.name}</span>
              {node.tech && <p className="mt-[4px] text-[16px] font-semibold tracking-[-0.01em] text-dark">{node.tech}</p>}
              {node.note && <p className="mt-[2px] text-[13px] text-gray">{node.note}</p>}
              {i === 1 && (
                <div className="mt-[12px] flex flex-wrap gap-[6px]">
                  {CONSTRAINTS.map((c) => (
                    <span key={c} className="border border-border px-[10px] py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-gray">{c}</span>
                  ))}
                </div>
              )}
              {i === 3 && (
                <div className="mt-[10px] flex flex-wrap gap-[8px]">
                  {OUTPUTS.map((m, j) => (
                    <span key={m} className={`border px-[10px] py-[5px] text-[13px] font-semibold ${j === 0 ? 'border-[#6d28d9] bg-[#6d28d9]/[0.06] text-dark' : 'border-border text-gray'}`}>{m}</span>
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

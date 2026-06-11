// Static CSS/SVG product vignettes for the MAGIC "What we built" section. Each
// mock stands in for a real feature so the section shows the platform instead of
// describing it. No images, no canvas — tokenized surfaces only. The #6d28d9 /
// #a855f7 purple is MAGIC's per-slug accent (see DESIGN.md decisions log).

// Controlled generation: identical-framed outputs from one scene template.
export function ControlledGenerationMock() {
  return (
    <div
      className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]"
      aria-hidden="true"
    >
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Scene template</span>
        <span className="inline-flex items-center gap-[6px] rounded-full bg-[#6d28d9]/10 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#6d28d9]">
          <span className="h-[5px] w-[5px] rounded-full bg-[#6d28d9]" /> deterministic
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[8px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-[8px] border border-border"
            style={{ background: 'linear-gradient(135deg,#f4f1fb,#e9e3f7)' }}
          >
            {/* identical framing across every tile — the point is consistency */}
            <span className="absolute inset-[6px] rounded-[5px] border border-[#6d28d9]/20" />
            <span className="absolute bottom-[9px] left-1/2 h-[42%] w-[30%] -translate-x-1/2 rounded-[3px] bg-[#6d28d9]/30" />
          </div>
        ))}
      </div>
      <div className="mt-[12px] flex items-center gap-[8px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">Output</span>
        <span className="h-[6px] flex-1 rounded-full bg-[#6d28d9]/15" />
        <span className="font-mono text-[10px] text-gray">consistent · 1,000s SKUs</span>
      </div>
    </div>
  )
}

// AI packshots: marketplace-ready product images on white, multiple aspects.
export function PackshotGridMock() {
  return (
    <div
      className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]"
      aria-hidden="true"
    >
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Packshots</span>
        <span className="font-mono text-[11px] text-gray">white bg · listing-ready</span>
      </div>
      <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-4">
        {['1:1', '4:5', '1:1', '16:9'].map((ar, i) => (
          <div key={i} className="flex flex-col gap-[5px]">
            <div className="relative aspect-square overflow-hidden rounded-[8px] border border-border bg-white">
              <span className="absolute bottom-[12px] left-1/2 h-[5px] w-[20px] -translate-x-1/2 rounded-full bg-dark/5" />
              <span className="absolute bottom-[12px] left-1/2 h-[40%] w-[30%] -translate-x-1/2 rounded-[4px] bg-[#6d28d9]/30" />
              <span className="absolute bottom-[26px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[#6d28d9]/40" />
            </div>
            <span className="text-center font-mono text-[9px] uppercase tracking-[0.08em] text-gray">{ar}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Multi-platform distribution: one source fans out to every channel format.
const PLATFORMS = [
  { name: 'Amazon', ar: '1:1' },
  { name: 'Reels / TikTok', ar: '9:16' },
  { name: 'Meta Ads', ar: '4:5' },
  { name: 'Performance Max', ar: '16:9' },
]

export function MultiPlatformMock() {
  return (
    <div
      className="w-full overflow-hidden rounded-[14px] border border-border bg-bg p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]"
      aria-hidden="true"
    >
      <div className="mb-[14px] flex items-center gap-[10px]">
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] border border-[#6d28d9] bg-[#6d28d9]/[0.06]">
          <span className="h-[16px] w-[12px] rounded-[3px] bg-[#6d28d9]/40" />
        </span>
        <span className="font-mono text-[11px] text-gray">
          one source <span className="text-[#6d28d9]">→</span> every channel
        </span>
      </div>
      <ul className="flex flex-col gap-[8px]">
        {PLATFORMS.map((p) => (
          <li key={p.name} className="flex items-center justify-between rounded-[9px] border border-border px-[12px] py-[9px]">
            <span className="flex items-center gap-[10px]">
              <span className="h-[8px] w-[8px] rounded-full bg-[#6d28d9]" />
              <span className="text-[13px] font-semibold tracking-[-0.01em] text-dark">{p.name}</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray">{p.ar} · auto-fit</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Static CSS/SVG product vignettes for the SunsetML "What we built" section.
// Each mock stands in for a real feature so the section shows the app instead
// of describing it. No images, no canvas — tokenized surfaces only.

// Live multi-model switching: a model picker with one active model.
const MODELS = [
  { name: 'GPT-5.5', tag: 'OpenAI', active: true },
  { name: 'GPT-5.4 mini', tag: 'OpenAI', active: false },
  { name: 'Claude Sonnet 4.6', tag: 'Anthropic', active: false },
  { name: 'Claude Opus 4.7', tag: 'Anthropic', active: false },
]

export function ModelSwitchMock() {
  return (
    <div
      className="w-full rounded-[14px] border border-border bg-canvas p-[16px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:p-[20px]"
      aria-hidden="true"
    >
      <div className="mb-[14px] flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gray">Model</span>
        <span className="font-mono text-[11px] text-gray-light">switch anytime ⌘M</span>
      </div>
      <ul className="flex flex-col gap-[8px]">
        {MODELS.map((m) => (
          <li
            key={m.name}
            className={`flex items-center justify-between rounded-[9px] border px-[14px] py-[11px] transition-colors ${
              m.active ? 'border-brand bg-brand/[0.06]' : 'border-border bg-bg'
            }`}
          >
            <span className="flex items-center gap-[10px]">
              <span className={`h-[8px] w-[8px] rounded-full ${m.active ? 'bg-brand' : 'bg-border'}`} />
              <span className={`text-[14px] font-semibold tracking-[-0.01em] ${m.active ? 'text-dark' : 'text-gray'}`}>{m.name}</span>
            </span>
            {m.active ? (
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-brand">active</span>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-light">{m.tag}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Adaptive writing environment: focus mode on, chrome dimmed, tone presets.
export function AdaptiveMock() {
  return (
    <div
      className="w-full overflow-hidden rounded-[14px] border border-border bg-canvas shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-border/70 px-[16px] py-[11px]">
        <div className="flex items-center gap-[8px] opacity-40">
          <span className="h-[6px] w-[22px] rounded-full bg-border" />
          <span className="h-[6px] w-[14px] rounded-full bg-border" />
          <span className="h-[6px] w-[18px] rounded-full bg-border" />
        </div>
        <span className="inline-flex items-center gap-[6px] rounded-full bg-brand/10 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-brand">
          <span className="h-[5px] w-[5px] rounded-full bg-brand" /> Focus
        </span>
      </div>
      <div className="px-[20px] py-[22px]">
        <div className="flex flex-col gap-[9px]">
          <span className="h-[9px] w-[88%] rounded-full bg-dark/85" />
          <span className="h-[9px] w-[96%] rounded-full bg-dark/15" />
          <span className="h-[9px] w-[78%] rounded-full bg-dark/15" />
          <span className="h-[9px] w-[64%] rounded-full bg-dark/15" />
        </div>
        <div className="mt-[20px] flex items-center gap-[7px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-light">Tone</span>
          {['Crisp', 'Warm', 'Formal'].map((t, i) => (
            <span
              key={t}
              className={`rounded-full border px-[10px] py-[4px] text-[11px] font-medium ${
                i === 0 ? 'border-brand bg-brand/[0.06] text-dark' : 'border-border text-gray-light'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Real-time collaboration: live cursors + a comment thread on a draft.
export function CollabMock() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[14px] border border-border bg-canvas px-[20px] py-[24px] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] sm:px-[26px]"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-[10px]">
        <span className="h-[9px] w-[92%] rounded-full bg-dark/15" />
        <span className="h-[9px] w-[74%] rounded-full bg-dark/15" />
        {/* line with cursor A */}
        <span className="relative h-[9px] w-[84%] rounded-full bg-dark/15">
          <span className="absolute -top-[3px] left-[58%] h-[15px] w-[2px] bg-brand">
            <span className="absolute -top-[16px] left-0 whitespace-nowrap rounded-[4px] bg-brand px-[6px] py-[2px] text-[9px] font-bold text-white">Ravi</span>
          </span>
        </span>
        <span className="h-[9px] w-[66%] rounded-full bg-dark/15" />
        {/* line with cursor B */}
        <span className="relative h-[9px] w-[80%] rounded-full bg-dark/15">
          <span className="absolute -top-[3px] left-[34%] h-[15px] w-[2px] bg-dark/70">
            <span className="absolute -top-[16px] left-0 whitespace-nowrap rounded-[4px] bg-dark px-[6px] py-[2px] text-[9px] font-bold text-white">Ana</span>
          </span>
        </span>
        <span className="h-[9px] w-[88%] rounded-full bg-dark/15" />
        <span className="h-[9px] w-[58%] rounded-full bg-dark/15" />
      </div>
      {/* comment thread */}
      <div className="mt-[18px] flex flex-col gap-[12px] rounded-[10px] border border-border bg-bg-subtle px-[12px] py-[12px]">
        <div className="flex items-start gap-[10px]">
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">A</span>
          <div className="flex flex-col gap-[2px]">
            <span className="text-[12px] font-semibold text-dark">Ana commented</span>
            <span className="text-[12px] leading-[1.5] text-gray">Tighten this line before we ship?</span>
          </div>
        </div>
        <div className="flex items-start gap-[10px] border-t border-border/70 pt-[10px]">
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-dark text-[10px] font-bold text-white">R</span>
          <div className="flex flex-col gap-[2px]">
            <span className="text-[12px] font-semibold text-dark">Ravi replied</span>
            <span className="text-[12px] leading-[1.5] text-gray">Done — pushed the edit live.</span>
          </div>
        </div>
      </div>
      {/* live presence footer */}
      <div className="mt-[14px] flex items-center justify-between">
        <span className="inline-flex items-center gap-[7px] font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-gray">
          <span className="h-[6px] w-[6px] rounded-full bg-brand" /> 2 editing now
        </span>
        <span className="flex -space-x-[6px]">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-canvas bg-brand text-[9px] font-bold text-white">R</span>
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-canvas bg-dark text-[9px] font-bold text-white">A</span>
        </span>
      </div>
    </div>
  )
}

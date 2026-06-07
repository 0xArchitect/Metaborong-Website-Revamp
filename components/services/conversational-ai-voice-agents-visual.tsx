// Signature visual for the Conversational AI & Voice Agents leaf hero. A turn
// exchange (user ↔ agent) with a voice waveform and a clean hand-off branch to a
// human — the reason / call-tools / hand-off loop the copy describes, with voice
// as a first-class channel. AI signature grammar: one-shot draw + fade,
// reduced-motion final-state fallback, var(--color-*) tokens (teal = --color-ai),
// mono labels, aria-hidden, 460x380 viewBox.

export function ConversationalAiVoiceAgentsVisual() {
  // waveform bar heights (symmetric around mid)
  const bars = [10, 20, 32, 16, 26, 38, 14, 22, 30, 12]
  return (
    <figure className="cva relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="h-auto w-full">
        <defs>
          <marker id="cva-ar" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="var(--color-ai)" />
          </marker>
        </defs>

        {/* turn edges */}
        <g className="cva-edge" stroke="var(--color-ai)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path className="cva-draw" pathLength={1} d="M168,120 H214" markerEnd="url(#cva-ar)" />
          <path className="cva-draw" pathLength={1} d="M214,196 H168" markerEnd="url(#cva-ar)" />
          <path className="cva-draw" pathLength={1} d="M300,210 Q330,250 330,276" markerEnd="url(#cva-ar)" />
        </g>

        {/* user turn */}
        <g className="cva-bubble" style={{ ['--d' as string]: '0.2s' }}>
          <rect x="36" y="98" width="132" height="44" rx="10" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="52" y="125" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">user</text>
        </g>

        {/* agent turn */}
        <g className="cva-bubble" style={{ ['--d' as string]: '0.45s' }}>
          <rect x="214" y="98" width="150" height="44" rx="10" fill="var(--color-bg)" stroke="var(--color-ai)" strokeWidth="1.5" />
          <text x="230" y="125" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-ai)">agent</text>
        </g>

        {/* voice waveform (agent speaks) */}
        <g className="cva-wave" style={{ ['--d' as string]: '0.85s' }}>
          {bars.map((h, i) => (
            <line key={i} x1={224 + i * 14} y1={174 - h / 2} x2={224 + i * 14} y2={174 + h / 2}
              stroke="var(--color-ai)" strokeWidth="3" strokeLinecap="round" opacity={0.45 + (h / 38) * 0.55} />
          ))}
        </g>
        <text className="cva-wave" style={{ ['--d' as string]: '0.85s' }} x="36" y="180" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">voice</text>

        {/* human hand-off */}
        <g className="cva-handoff" style={{ ['--d' as string]: '1.3s' }}>
          <rect x="282" y="276" width="96" height="40" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="330" y="300" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="var(--color-gray)">human</text>
        </g>

        {/* labels */}
        <g className="cva-label" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em" fill="var(--color-gray-light)">
          <text x="36" y="76">{'// listen · reason · respond'}</text>
          <text x="36" y="342">tools · barge-in · clean hand-off</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.cva .cva-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
.cva .cva-bubble, .cva .cva-wave, .cva .cva-handoff, .cva .cva-label { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .cva .cva-bubble { animation: cvaFade 0.5s ease-out var(--d) forwards; }
  .cva .cva-wave { animation: cvaFade 0.5s ease-out var(--d) forwards; }
  .cva .cva-handoff { animation: cvaFade 0.5s ease-out var(--d) forwards; }
  .cva .cva-draw { animation: cvaDraw 0.5s cubic-bezier(0.65,0,0.35,1) forwards; }
  .cva .cva-draw:nth-of-type(1) { animation-delay: 0.4s; }
  .cva .cva-draw:nth-of-type(2) { animation-delay: 0.65s; }
  .cva .cva-draw:nth-of-type(3) { animation-delay: 1.15s; }
  .cva .cva-label { animation: cvaFade 0.6s ease-out 1.5s forwards; }
  @keyframes cvaDraw { to { stroke-dashoffset: 0; } }
  @keyframes cvaFade { to { opacity: 1; } }
}
@media (prefers-reduced-motion: reduce) {
  .cva .cva-draw { stroke-dashoffset: 0; }
  .cva .cva-bubble, .cva .cva-wave, .cva .cva-handoff, .cva .cva-label { opacity: 1; }
}
`

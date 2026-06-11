// Signature visual for the Blockchain Indexers & Subgraphs leaf hero (DESIGN.md:
// one signature visual per section, blueprint grammar, one-shot motion). A
// pipeline: a stream of on-chain blocks feeds an indexer node that emits a
// queryable GraphQL graph/table. Pure SVG; the connecting strokes draw once on
// mount (hero is above the fold) and short-circuit to the final state under
// prefers-reduced-motion. Decorative — aria-hidden, lg+ only.

export function IndexersSubgraphsVisual() {
  return (
    <figure className="index-viz relative w-full max-w-[460px]" aria-hidden="true">
      <style precedence="default">{css}</style>
      <svg viewBox="0 0 460 380" role="img" className="w-full h-auto">
        {/* block stream — incoming chain blocks on the left */}
        <g className="index-blocks" stroke="var(--color-border)" strokeWidth="1.5" fill="var(--color-bg)">
          <rect x="24" y="80" width="44" height="44" rx="3" />
          <rect x="24" y="148" width="44" height="44" rx="3" />
          <rect x="24" y="216" width="44" height="44" rx="3" />
          <rect x="24" y="284" width="44" height="44" rx="3" />
        </g>
        <g className="index-label" fill="var(--color-gray)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="24" y="68">BLOCKS</text>
        </g>

        {/* feed strokes — blocks flowing into the indexer */}
        <g className="index-feed" stroke="var(--color-brand)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path pathLength={1} d="M68,102 C120,102 150,150 188,164" />
          <path pathLength={1} d="M68,170 C120,170 150,172 188,176" />
          <path pathLength={1} d="M68,238 C120,238 150,200 188,192" />
          <path pathLength={1} d="M68,306 C120,306 150,224 188,208" />
        </g>

        {/* indexer node — the transform stage */}
        <g className="index-core">
          <rect x="188" y="146" width="84" height="84" rx="4" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <line x1="206" y1="170" x2="254" y2="170" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="206" y1="188" x2="254" y2="188" stroke="var(--color-gray-light)" strokeWidth="1.5" />
          <line x1="206" y1="206" x2="240" y2="206" stroke="var(--color-gray-light)" strokeWidth="1.5" />
        </g>
        <g className="index-label" fill="var(--color-brand)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="188" y="138">INDEXER</text>
        </g>

        {/* emit strokes — indexer feeding the query graph */}
        <g className="index-emit" stroke="var(--color-brand)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path pathLength={1} d="M272,170 C310,170 330,118 364,112" />
          <path pathLength={1} d="M272,188 C310,188 330,188 364,188" />
          <path pathLength={1} d="M272,206 C310,206 330,258 364,264" />
        </g>

        {/* query graph — emitted queryable nodes on the right */}
        <g className="index-graph">
          <line x1="388" y1="112" x2="388" y2="188" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="388" y1="188" x2="388" y2="264" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="388" cy="112" r="11" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
          <circle cx="388" cy="188" r="11" fill="var(--color-brand)" />
          <circle cx="388" cy="264" r="11" fill="var(--color-bg)" stroke="var(--color-brand)" strokeWidth="2" />
        </g>
        <g className="index-label" fill="var(--color-brand)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          <text x="356" y="300">QUERY</text>
        </g>

        {/* GraphQL query snippet under the graph */}
        <g className="index-label" fill="var(--color-gray)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.03em">
          <text x="120" y="346">{'{ events(first: 100) { id block } }'}</text>
          <text x="120" y="362" fill="var(--color-gray-light)">{'// indexed, reorg-safe, chain-head sync'}</text>
        </g>
      </svg>
    </figure>
  )
}

const css = `
.index-viz .index-feed path,
.index-viz .index-emit path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.index-viz .index-blocks,
.index-viz .index-core,
.index-viz .index-graph,
.index-viz .index-label { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .index-viz .index-blocks { animation: indexFade 0.6s ease-out 0.1s forwards; }
  .index-viz .index-feed path { animation: indexDraw 1s cubic-bezier(0.65,0,0.35,1) 0.3s forwards; }
  .index-viz .index-core { animation: indexFade 0.6s ease-out 0.8s forwards; }
  .index-viz .index-emit path { animation: indexDraw 1s cubic-bezier(0.65,0,0.35,1) 1.1s forwards; }
  .index-viz .index-graph { animation: indexFade 0.6s ease-out 1.6s forwards; }
  .index-viz .index-label { animation: indexFade 0.6s ease-out 1.9s forwards; }
  @keyframes indexDraw { to { stroke-dashoffset: 0; } }
  @keyframes indexFade { to { opacity: 1; } }
}

/* Reduced motion / no-JS: render the final composed state immediately. */
@media (prefers-reduced-motion: reduce) {
  .index-viz .index-feed path,
  .index-viz .index-emit path { stroke-dashoffset: 0; }
  .index-viz .index-blocks,
  .index-viz .index-core,
  .index-viz .index-graph,
  .index-viz .index-label { opacity: 1; }
}
`

export interface ProblemQA {
  q: string
  a: string
}

export const PROBLEM_QA: ProblemQA[] = [
  {
    q: 'Why is building in Web3 and AI hard?',
    a: 'Web3 and AI move in windows, not roadmaps. A new chain, a new agent paradigm, or a regulatory shift opens an output window that closes within weeks. Most teams need months to assemble, agree, and ship. By the time they’re ready to build, the relevant window has already closed.',
  },
  {
    q: 'How fast does Metaborong ship?',
    a: 'Metaborong targets production delivery inside the open trend window — typically week three to week six from specification to shipped code. Speed comes from one senior team that owns architecture, engineering, and deployment continuously, without re-bidding talent across phases or handing off across vendor boundaries.',
  },
  {
    q: 'Why do agencies and freelancers miss trend windows?',
    a: 'Large agencies optimise for multi-quarter, scope-locked engagements; they ship months after the window closes. Freelance teams ship quickly but fragment ownership across roles, producing code that breaks once user load and edge cases arrive. Trend-driven products need both speed and architectural durability.',
  },
  {
    q: 'What is a trend window in Web3 and AI?',
    a: 'A trend window is the period between a market shift opening and the same shift dissolving — a new chain launch, a new agent paradigm, or a regulatory change. In Web3 and AI, these windows typically last four to eight weeks. Products that ship after the window has closed face a different market than the one they were specified for.',
  },
]

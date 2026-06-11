import { PROBLEM_QA } from './problem-qa-data'

export function ProblemAEOAccordion() {
  return (
    <details className="problem-aeo">
      <summary>
        <span>Common questions about the trend window</span>
      </summary>
      <div className="problem-aeo-body">
        {PROBLEM_QA.map((qa, i) => (
          <div key={i}>
            <h3 className="problem-aeo-q">{qa.q}</h3>
            <p className="problem-aeo-a">{qa.a}</p>
          </div>
        ))}
      </div>
    </details>
  )
}

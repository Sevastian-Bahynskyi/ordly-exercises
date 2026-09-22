import { CheckCircle2, XCircle } from 'lucide-react'

export function Feedback({ correct, explanation }: { correct: boolean; explanation?: string }) {
  return (
    <div className={`feedback ${correct ? 'feedback-good' : 'feedback-bad'}`} role="status">
      <div className="feedback-title">
        {correct ? <CheckCircle2 size={19} /> : <XCircle size={19} />}
        <strong>{correct ? 'Correct' : 'Not quite'}</strong>
      </div>
      {explanation && <div>{explanation}</div>}
    </div>
  )
}

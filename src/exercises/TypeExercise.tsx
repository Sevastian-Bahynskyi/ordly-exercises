import { useState } from 'react'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { PrimaryButton } from '../components/PrimaryButton'
import { GlossText } from '../components/GlossText'
import type { TypeExercise as T } from '../types'
import type { ExerciseProps } from './common'
import { normalize } from './common'

type Draft = { value: string }

export function TypeExercise({ exercise, draft, result, onDraftChange, onComplete }: ExerciseProps<T, Draft>) {
  const [submittedEmpty, setSubmittedEmpty] = useState(false)
  const value = draft?.value ?? ''
  const accepted = exercise.accepted.map(normalize)
  function submit() {
    if (!value.trim()) { setSubmittedEmpty(true); return }
    onComplete(accepted.includes(normalize(value)), value)
  }
  return (
    <ExerciseFrame badge="Type" title={exercise.title} instruction={exercise.instruction ?? 'Type a short answer.'}>
      <div className="prompt-panel"><GlossText text={exercise.prompt} glosses={exercise.glosses} /></div>
      <input
        className="answer-input"
        value={result?.completed ? String(result.response ?? '') : value}
        onChange={(e) => { setSubmittedEmpty(false); onDraftChange({ value: e.target.value }) }}
        placeholder={exercise.placeholder ?? 'Type here…'}
        disabled={result?.completed}
        autoCapitalize="sentences"
        autoCorrect="off"
        onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
      />
      {submittedEmpty && <div className="inline-hint">Write an answer first.</div>}
      {!result?.completed && <PrimaryButton onClick={submit}>Check</PrimaryButton>}
      {result?.completed && <Feedback correct={result.correct} explanation={result.correct ? exercise.explanation : `${exercise.answerLabel ?? 'Answer'}: ${exercise.accepted[0]}. ${exercise.explanation ?? ''}`} />}
    </ExerciseFrame>
  )
}

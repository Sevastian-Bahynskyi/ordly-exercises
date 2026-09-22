import { Check, X } from 'lucide-react'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import type { BinaryExercise as T } from '../types'
import type { ExerciseProps } from './common'

export function BinaryExercise({ exercise, result, onComplete }: ExerciseProps<T>) {
  const selected = result?.response as boolean | undefined
  return (
    <ExerciseFrame badge="True or false" title={exercise.title} instruction={exercise.instruction ?? 'Is this statement correct?'}>
      <div className="prompt-panel statement">{exercise.statement}</div>
      <div className="binary-grid">
        <button type="button" className={`binary-button ${selected === true ? 'selected' : ''}`} disabled={result?.completed} onClick={() => onComplete(exercise.correct === true, true)}><Check />{exercise.trueLabel ?? 'True'}</button>
        <button type="button" className={`binary-button ${selected === false ? 'selected' : ''}`} disabled={result?.completed} onClick={() => onComplete(exercise.correct === false, false)}><X />{exercise.falseLabel ?? 'False'}</button>
      </div>
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

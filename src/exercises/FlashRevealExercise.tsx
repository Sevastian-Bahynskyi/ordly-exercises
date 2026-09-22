import { Eye } from 'lucide-react'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { GlossText } from '../components/GlossText'
import type { FlashRevealExercise as T } from '../types'
import type { ExerciseProps } from './common'

type Draft = { revealed: boolean }

export function FlashRevealExercise({ exercise, draft, result, onDraftChange, onComplete }: ExerciseProps<T, Draft>) {
  const revealed = result?.completed || draft?.revealed || false
  return (
    <ExerciseFrame badge="Recall" title={exercise.title} instruction={exercise.instruction ?? 'Think of the answer before revealing it.'}>
      <div className="flash-card">
        <div className="flash-prompt"><GlossText text={exercise.prompt} glosses={exercise.glosses} /></div>
        {revealed ? <div className="flash-answer">{exercise.answer}</div> : <button type="button" className="reveal-button" onClick={() => onDraftChange({ revealed: true })}><Eye size={20} />Reveal</button>}
      </div>
      {revealed && !result?.completed && (
        <div className="binary-grid">
          <button type="button" className="binary-button" onClick={() => onComplete(true, 'known')}>{exercise.knownLabel ?? 'I knew it'}</button>
          <button type="button" className="binary-button" onClick={() => onComplete(false, 'unknown')}>{exercise.unknownLabel ?? 'Not yet'}</button>
        </div>
      )}
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

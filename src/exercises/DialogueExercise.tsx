import { MessageCircle } from 'lucide-react'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { ChoiceGrid } from '../components/ChoiceGrid'
import { GlossText } from '../components/GlossText'
import type { DialogueExercise as T } from '../types'
import type { ExerciseProps } from './common'

export function DialogueExercise({ exercise, result, onComplete }: ExerciseProps<T>) {
  const selected = result?.response as string | undefined
  return (
    <ExerciseFrame badge="Dialogue" title={exercise.title} instruction={exercise.instruction ?? 'Choose the most natural reply.'}>
      <div className="dialogue">
        <div className="speech speech-a"><MessageCircle size={17} /><span><GlossText text={exercise.speakerA} glosses={exercise.glosses} /></span></div>
        <div className="speech speech-b"><GlossText text={exercise.speakerBPrompt} glosses={exercise.glosses} /></div>
      </div>
      <ChoiceGrid options={exercise.options} selected={selected} disabled={result?.completed} correct={exercise.answer} onChoose={(value) => onComplete(value === exercise.answer, value)} />
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

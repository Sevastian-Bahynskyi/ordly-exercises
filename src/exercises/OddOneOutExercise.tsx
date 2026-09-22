import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { ChoiceGrid } from '../components/ChoiceGrid'
import { GlossText } from '../components/GlossText'
import type { OddOneOutExercise as T } from '../types'
import type { ExerciseProps } from './common'

export function OddOneOutExercise({ exercise, result, onComplete }: ExerciseProps<T>) {
  const selected = result?.response as string | undefined
  return (
    <ExerciseFrame badge="Odd one out" title={exercise.title} instruction={exercise.instruction ?? 'Which item does not belong?'}>
      {exercise.prompt && <div className="prompt-panel"><GlossText text={exercise.prompt} glosses={exercise.glosses} /></div>}
      <ChoiceGrid options={exercise.items} selected={selected} disabled={result?.completed} correct={exercise.answer} onChoose={(value) => onComplete(value === exercise.answer, value)} />
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

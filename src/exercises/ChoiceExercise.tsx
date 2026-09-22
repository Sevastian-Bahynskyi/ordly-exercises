import { ChoiceGrid } from '../components/ChoiceGrid'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import type { ChoiceExercise as T } from '../types'
import type { ExerciseProps } from './common'

export function ChoiceExercise({ exercise, result, onComplete }: ExerciseProps<T>) {
  const selected = result?.response as string | undefined
  return (
    <ExerciseFrame badge="Choose" title={exercise.title} instruction={exercise.instruction ?? 'Tap one answer.'}>
      <div className="prompt-panel">{exercise.prompt}</div>
      <ChoiceGrid
        options={exercise.options}
        selected={selected}
        disabled={result?.completed}
        correct={exercise.answer}
        onChoose={(value) => onComplete(value === exercise.answer, value)}
      />
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

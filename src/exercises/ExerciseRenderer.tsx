import type { Exercise, ExerciseResult } from '../types'
import { BinaryExercise } from './BinaryExercise'
import { CategorySortExercise } from './CategorySortExercise'
import { ChoiceExercise } from './ChoiceExercise'
import { DialogueExercise } from './DialogueExercise'
import { DragGapExercise } from './DragGapExercise'
import { FlashRevealExercise } from './FlashRevealExercise'
import { ListenChoiceExercise } from './ListenChoiceExercise'
import { MatchExercise } from './MatchExercise'
import { OddOneOutExercise } from './OddOneOutExercise'
import { OrderExercise } from './OrderExercise'
import { TypeExercise } from './TypeExercise'

export function ExerciseRenderer({
  exercise,
  draft,
  result,
  onDraftChange,
  onComplete,
}: {
  exercise: Exercise
  draft: unknown
  result?: ExerciseResult
  onDraftChange: (draft: unknown) => void
  onComplete: (correct: boolean, response?: unknown) => void
}) {
  const props = { draft: draft as any, result, onDraftChange: onDraftChange as any, onComplete }
  switch (exercise.type) {
    case 'choice': return <ChoiceExercise exercise={exercise} {...props} />
    case 'match': return <MatchExercise exercise={exercise} {...props} />
    case 'drag-gap': return <DragGapExercise exercise={exercise} {...props} />
    case 'order': return <OrderExercise exercise={exercise} {...props} />
    case 'type': return <TypeExercise exercise={exercise} {...props} />
    case 'binary': return <BinaryExercise exercise={exercise} {...props} />
    case 'odd-one-out': return <OddOneOutExercise exercise={exercise} {...props} />
    case 'category-sort': return <CategorySortExercise exercise={exercise} {...props} />
    case 'dialogue': return <DialogueExercise exercise={exercise} {...props} />
    case 'listen-choice': return <ListenChoiceExercise exercise={exercise} {...props} />
    case 'flash-reveal': return <FlashRevealExercise exercise={exercise} {...props} />
  }
}

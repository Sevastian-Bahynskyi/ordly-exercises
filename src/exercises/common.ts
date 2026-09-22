export type ExerciseProps<T, D = unknown> = {
  exercise: T
  draft: D | undefined
  result?: { completed: boolean; correct: boolean; attempts: number; response?: unknown }
  onDraftChange: (draft: D) => void
  onComplete: (correct: boolean, response?: unknown) => void
}

export function normalize(value: string) {
  return value.trim().toLocaleLowerCase('da-DK').replace(/[.,!?;:]+$/g, '').replace(/\s+/g, ' ')
}

export type ExerciseType =
  | 'choice'
  | 'match'
  | 'drag-gap'
  | 'order'
  | 'type'
  | 'binary'
  | 'odd-one-out'
  | 'category-sort'
  | 'dialogue'
  | 'listen-choice'
  | 'flash-reveal'

export type BaseExercise = {
  id: string
  type: ExerciseType
  title: string
  instruction?: string
  focusWords?: string[]
  explanation?: string
  /**
   * Supporting-word translations shown only when the learner taps a word.
   * Never include the current answer/target here when that would reveal it.
   * Keys should match the visible Danish form, e.g. { besked: 'сообщение' }.
   */
  glosses?: Record<string, string>
}

export type ChoiceExercise = BaseExercise & {
  type: 'choice'
  prompt: string
  options: string[]
  answer: string
}

export type MatchExercise = BaseExercise & {
  type: 'match'
  pairs: Array<{ left: string; right: string }>
}

export type DragGapExercise = BaseExercise & {
  type: 'drag-gap'
  before: string
  after: string
  options: string[]
  answer: string
}

export type OrderExercise = BaseExercise & {
  type: 'order'
  tokens: string[]
  answer: string[]
}

export type TypeExercise = BaseExercise & {
  type: 'type'
  prompt: string
  accepted: string[]
  placeholder?: string
  answerLabel?: string
}

export type BinaryExercise = BaseExercise & {
  type: 'binary'
  statement: string
  correct: boolean
  trueLabel?: string
  falseLabel?: string
}

export type OddOneOutExercise = BaseExercise & {
  type: 'odd-one-out'
  prompt?: string
  items: string[]
  answer: string
}

export type CategorySortExercise = BaseExercise & {
  type: 'category-sort'
  categories: string[]
  items: Array<{ text: string; category: string }>
}

export type DialogueExercise = BaseExercise & {
  type: 'dialogue'
  speakerA: string
  speakerBPrompt: string
  options: string[]
  answer: string
}

export type ListenChoiceExercise = BaseExercise & {
  type: 'listen-choice'
  text: string
  options: string[]
  answer: string
}

export type FlashRevealExercise = BaseExercise & {
  type: 'flash-reveal'
  prompt: string
  answer: string
  knownLabel?: string
  unknownLabel?: string
}

export type Exercise =
  | ChoiceExercise
  | MatchExercise
  | DragGapExercise
  | OrderExercise
  | TypeExercise
  | BinaryExercise
  | OddOneOutExercise
  | CategorySortExercise
  | DialogueExercise
  | ListenChoiceExercise
  | FlashRevealExercise

export type PracticeSession = {
  id: string
  title: string
  subtitle: string
  level: string
  exercises: Exercise[]
}

export type ExerciseResult = {
  completed: boolean
  correct: boolean
  attempts: number
  response?: unknown
}

export type SessionProgress = {
  sessionId: string
  currentIndex: number
  completed: boolean
  results: Record<string, ExerciseResult>
  drafts: Record<string, unknown>
}

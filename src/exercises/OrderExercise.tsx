import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { PrimaryButton } from '../components/PrimaryButton'
import type { OrderExercise as T } from '../types'
import type { ExerciseProps } from './common'

type Token = { id: string; text: string }
type Draft = { bank: Token[]; built: Token[] }

function SortableToken({ token, disabled, onTap }: { token: Token; disabled?: boolean; onTap: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: token.id, disabled })
  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`word-token ${isDragging ? 'dragging' : ''}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      disabled={disabled}
      onClick={onTap}
      {...attributes}
      {...listeners}
    >{token.text}</button>
  )
}

export function OrderExercise({ exercise, draft, result, onDraftChange, onComplete }: ExerciseProps<T, Draft>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const initial: Draft = {
    bank: exercise.tokens.map((text, index) => ({ id: `${exercise.id}-${index}`, text })),
    built: [],
  }
  const state = draft ?? initial

  function moveToBuilt(token: Token) {
    if (result?.completed) return
    onDraftChange({ bank: state.bank.filter((x) => x.id !== token.id), built: [...state.built, token] })
  }
  function moveToBank(token: Token) {
    if (result?.completed) return
    onDraftChange({ built: state.built.filter((x) => x.id !== token.id), bank: [...state.bank, token] })
  }
  function dragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = state.built.findIndex((x) => x.id === active.id)
    const newIndex = state.built.findIndex((x) => x.id === over.id)
    if (oldIndex >= 0 && newIndex >= 0) onDraftChange({ ...state, built: arrayMove(state.built, oldIndex, newIndex) })
  }
  const builtText = state.built.map((x) => x.text)

  return (
    <ExerciseFrame badge="Word order" title={exercise.title} instruction={exercise.instruction ?? 'Tap words to build the sentence. Drag the built words to reorder them.'}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}>
        <SortableContext items={state.built.map((x) => x.id)} strategy={horizontalListSortingStrategy}>
          <div className="build-zone">
            {state.built.length === 0 && <span className="build-placeholder">Build your sentence here</span>}
            {state.built.map((token) => <SortableToken key={token.id} token={token} disabled={result?.completed} onTap={() => moveToBank(token)} />)}
          </div>
        </SortableContext>
      </DndContext>
      <div className="token-bank">
        {state.bank.map((token) => <button type="button" className="word-token" key={token.id} disabled={result?.completed} onClick={() => moveToBuilt(token)}>{token.text}</button>)}
      </div>
      {!result?.completed && <PrimaryButton disabled={state.built.length !== exercise.answer.length} onClick={() => onComplete(JSON.stringify(builtText) === JSON.stringify(exercise.answer), builtText)}>Check</PrimaryButton>}
      {result?.completed && <Feedback correct={result.correct} explanation={result.correct ? exercise.explanation : `Correct: ${exercise.answer.join(' ')} ${exercise.explanation ?? ''}`} />}
    </ExerciseFrame>
  )
}

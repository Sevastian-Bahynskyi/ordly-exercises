import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import type { DragGapExercise as T } from '../types'
import type { ExerciseProps } from './common'

type Draft = { selected?: string }

function DragToken({ value, disabled, onTap }: { value: string; disabled?: boolean; onTap: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: value, disabled })
  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`word-token ${isDragging ? 'dragging' : ''}`}
      style={{ transform: CSS.Translate.toString(transform) }}
      onClick={onTap}
      disabled={disabled}
      {...listeners}
      {...attributes}
    >
      {value}
    </button>
  )
}

function Gap({ selected, active }: { selected?: string; active: boolean }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'gap', disabled: !active })
  return <span ref={setNodeRef} className={`gap-target ${isOver ? 'over' : ''}`}>{selected ?? 'drop here'}</span>
}

export function DragGapExercise({ exercise, draft, result, onDraftChange, onComplete }: ExerciseProps<T, Draft>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const selected = result?.completed ? (result.response as string) : draft?.selected

  function submit(value: string) {
    if (result?.completed) return
    onComplete(value === exercise.answer, value)
  }

  function onDragEnd(event: DragEndEvent) {
    if (event.over?.id === 'gap') submit(String(event.active.id))
  }

  return (
    <ExerciseFrame badge="Drag & drop" title={exercise.title} instruction={exercise.instruction ?? 'Drag a word into the gap. You can also tap a word, then tap the gap.'}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="gap-sentence">
          <span>{exercise.before}</span>
          <button type="button" className="gap-button" disabled={result?.completed || !draft?.selected} onClick={() => draft?.selected && submit(draft.selected)}>
            <Gap selected={selected} active={!result?.completed} />
          </button>
          <span>{exercise.after}</span>
        </div>
        <div className="token-bank">
          {exercise.options.map((option) => (
            <DragToken key={option} value={option} disabled={result?.completed} onTap={() => onDraftChange({ selected: option })} />
          ))}
        </div>
      </DndContext>
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

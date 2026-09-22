import { useMemo, useRef } from 'react'
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { GlossText } from '../components/GlossText'
import type { DragGapExercise as T } from '../types'
import type { ExerciseProps } from './common'
import { shuffleDifferent } from '../utils/shuffle'

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

export function DragGapExercise({ exercise, result, onComplete }: ExerciseProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const selected = result?.completed ? (result.response as string) : undefined
  const optionOrder = useMemo(() => shuffleDifferent(exercise.options), [exercise])
  const submittedRef = useRef(Boolean(result?.completed))

  function submit(value: string) {
    if (result?.completed || submittedRef.current) return
    submittedRef.current = true
    onComplete(value === exercise.answer, value)
  }

  function onDragEnd(event: DragEndEvent) {
    if (event.over?.id === 'gap') submit(String(event.active.id))
  }

  return (
    <ExerciseFrame badge="Drag & drop" title={exercise.title} instruction={exercise.instruction ?? 'Drag a word into the gap, or simply tap a word.'}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="gap-sentence">
          <span><GlossText text={exercise.before} glosses={exercise.glosses} /></span>
          <span className="gap-button">
            <Gap selected={selected} active={!result?.completed} />
          </span>
          <span><GlossText text={exercise.after} glosses={exercise.glosses} /></span>
        </div>
        <div className="token-bank">
          {optionOrder.map((option) => (
            <DragToken key={option} value={option} disabled={result?.completed} onTap={() => submit(option)} />
          ))}
        </div>
      </DndContext>
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

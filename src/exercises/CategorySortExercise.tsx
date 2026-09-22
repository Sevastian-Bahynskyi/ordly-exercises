import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { PrimaryButton } from '../components/PrimaryButton'
import type { CategorySortExercise as T } from '../types'
import type { ExerciseProps } from './common'

type Draft = { assignments: Record<string, string> }

function Item({ text, disabled, onTap }: { text: string; disabled?: boolean; onTap: () => void }) {
  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({ id: text, disabled })
  return <button ref={setNodeRef} type="button" className={`word-token ${isDragging ? 'dragging' : ''}`} style={{ transform: CSS.Translate.toString(transform) }} disabled={disabled} onClick={onTap} {...attributes} {...listeners}>{text}</button>
}
function Bucket({ name, children }: { name: string; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: name })
  return <div ref={setNodeRef} className={`category-bucket ${isOver ? 'over' : ''}`}><div className="category-title">{name}</div>{children}</div>
}

export function CategorySortExercise({ exercise, draft, result, onDraftChange, onComplete }: ExerciseProps<T, Draft>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const state = draft ?? { assignments: {} }
  const unassigned = exercise.items.filter((item) => !state.assignments[item.text])
  function assign(text: string, category: string) { onDraftChange({ assignments: { ...state.assignments, [text]: category } }) }
  function dragEnd(event: DragEndEvent) {
    if (!event.over) return
    const category = String(event.over.id)
    if (exercise.categories.includes(category)) assign(String(event.active.id), category)
  }
  function tap(text: string) {
    const current = state.assignments[text]
    const index = current ? exercise.categories.indexOf(current) : -1
    assign(text, exercise.categories[(index + 1) % exercise.categories.length])
  }
  function check() {
    const ok = exercise.items.every((item) => state.assignments[item.text] === item.category)
    onComplete(ok, state.assignments)
  }
  return (
    <ExerciseFrame badge="Sort" title={exercise.title} instruction={exercise.instruction ?? 'Drag items into groups. On mobile, tapping an item cycles it through the groups.'}>
      <DndContext sensors={sensors} onDragEnd={dragEnd}>
        <div className="token-bank left-bank">{unassigned.map((item) => <Item key={item.text} text={item.text} disabled={result?.completed} onTap={() => tap(item.text)} />)}</div>
        <div className="category-grid">
          {exercise.categories.map((category) => (
            <Bucket key={category} name={category}>
              {exercise.items.filter((item) => state.assignments[item.text] === category).map((item) => (
                <button type="button" className="assigned-chip" key={item.text} disabled={result?.completed} onClick={() => tap(item.text)}>{item.text}</button>
              ))}
            </Bucket>
          ))}
        </div>
      </DndContext>
      {!result?.completed && <PrimaryButton disabled={Object.keys(state.assignments).length !== exercise.items.length} onClick={check}>Check</PrimaryButton>}
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

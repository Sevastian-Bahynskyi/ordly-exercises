import { useMemo, useState } from 'react'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import type { MatchExercise as T } from '../types'
import type { ExerciseProps } from './common'

type Draft = { selected?: string; matched: string[]; mistakes: number; rightOrder: string[] }

export function MatchExercise({ exercise, draft, result, onDraftChange, onComplete }: ExerciseProps<T, Draft>) {
  const initial = useMemo<Draft>(() => ({
    selected: undefined,
    matched: [],
    mistakes: 0,
    rightOrder: [...exercise.pairs.map((p) => p.right)].sort(() => Math.random() - 0.5),
  }), [exercise])
  const state = draft ?? initial
  const [flash, setFlash] = useState(false)

  function chooseLeft(left: string) {
    if (result?.completed || state.matched.includes(left)) return
    onDraftChange({ ...state, selected: left })
  }

  function chooseRight(right: string) {
    if (result?.completed || !state.selected) return
    const pair = exercise.pairs.find((p) => p.left === state.selected)
    if (!pair) return
    if (pair.right === right) {
      const matched = [...state.matched, state.selected]
      onDraftChange({ ...state, selected: undefined, matched })
      if (matched.length === exercise.pairs.length) onComplete(state.mistakes === 0, matched)
    } else {
      setFlash(true)
      setTimeout(() => setFlash(false), 420)
      onDraftChange({ ...state, selected: undefined, mistakes: state.mistakes + 1 })
    }
  }

  return (
    <ExerciseFrame badge="Match" title={exercise.title} instruction={exercise.instruction ?? 'Match each Danish word with its meaning.'}>
      <div className={`match-grid ${flash ? 'shake' : ''}`}>
        <div className="match-column">
          <div className="column-label">Danish</div>
          {exercise.pairs.map((pair) => (
            <button
              type="button"
              key={pair.left}
              disabled={result?.completed || state.matched.includes(pair.left)}
              className={`match-tile ${state.selected === pair.left ? 'selected' : ''} ${state.matched.includes(pair.left) ? 'matched' : ''}`}
              onClick={() => chooseLeft(pair.left)}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="match-column">
          <div className="column-label">Meaning</div>
          {state.rightOrder.map((right) => {
            const left = exercise.pairs.find((p) => p.right === right)?.left
            const matched = !!left && state.matched.includes(left)
            return (
              <button type="button" key={right} disabled={result?.completed || matched} className={`match-tile ${matched ? 'matched' : ''}`} onClick={() => chooseRight(right)}>
                {right}
              </button>
            )
          })}
        </div>
      </div>
      {result?.completed && <Feedback correct={result.correct} explanation={exercise.explanation} />}
    </ExerciseFrame>
  )
}

import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import { ExerciseFrame } from '../components/ExerciseFrame'
import { Feedback } from '../components/Feedback'
import { ChoiceGrid } from '../components/ChoiceGrid'
import type { ListenChoiceExercise as T } from '../types'
import type { ExerciseProps } from './common'

export function ListenChoiceExercise({ exercise, result, onComplete }: ExerciseProps<T>) {
  const [unsupported, setUnsupported] = useState(false)
  const selected = result?.response as string | undefined
  function speak() {
    if (!('speechSynthesis' in window)) { setUnsupported(true); return }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(exercise.text)
    utterance.lang = 'da-DK'
    utterance.rate = 0.88
    window.speechSynthesis.speak(utterance)
  }
  return (
    <ExerciseFrame badge="Listen" title={exercise.title} instruction={exercise.instruction ?? 'Listen, then choose the meaning.'}>
      <button type="button" className="listen-button" onClick={speak}><Volume2 size={23} />Play Danish</button>
      {unsupported && <div className="inline-hint">Audio is unavailable in this browser. Text: {exercise.text}</div>}
      <ChoiceGrid options={exercise.options} selected={selected} disabled={result?.completed} correct={exercise.answer} onChoose={(value) => onComplete(value === exercise.answer, value)} />
      {result?.completed && <Feedback correct={result.correct} explanation={`${exercise.text}. ${exercise.explanation ?? ''}`} />}
    </ExerciseFrame>
  )
}

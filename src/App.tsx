import { useEffect, useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { currentSession } from './session/currentSession'
import { blankProgress, clearProgress, loadProgress, saveProgress } from './storage/progress'
import type { ExerciseResult, SessionProgress } from './types'
import { ExerciseRenderer } from './exercises/ExerciseRenderer'
import { PrimaryButton } from './components/PrimaryButton'

export default function App() {
  const [progress, setProgress] = useState<SessionProgress>(() => loadProgress(currentSession))

  useEffect(() => { saveProgress(progress) }, [progress])

  const exercise = currentSession.exercises[progress.currentIndex]
  const doneCount = Object.values(progress.results).filter((r) => r.completed).length
  const percent = currentSession.exercises.length ? (doneCount / currentSession.exercises.length) * 100 : 0

  const weakWords = useMemo(() => {
    const words: string[] = []
    currentSession.exercises.forEach((item) => {
      if (progress.results[item.id]?.completed && !progress.results[item.id]?.correct) {
        item.focusWords?.forEach((word) => { if (!words.includes(word)) words.push(word) })
      }
    })
    return words
  }, [progress.results])

  function setDraft(draft: unknown) {
    setProgress((prev) => ({ ...prev, drafts: { ...prev.drafts, [exercise.id]: draft } }))
  }

  function complete(correct: boolean, response?: unknown) {
    setProgress((prev) => {
      const old = prev.results[exercise.id]
      const result: ExerciseResult = {
        completed: true,
        correct,
        attempts: (old?.attempts ?? 0) + 1,
        response,
      }
      return { ...prev, results: { ...prev.results, [exercise.id]: result } }
    })
  }

  function next() {
    setProgress((prev) => {
      if (prev.currentIndex >= currentSession.exercises.length - 1) return { ...prev, completed: true }
      return { ...prev, currentIndex: prev.currentIndex + 1 }
    })
  }

  function reset() {
    if (!window.confirm('Reset this practice session and erase saved progress?')) return
    clearProgress(currentSession)
    setProgress(blankProgress(currentSession))
  }

  if (progress.completed) {
    const correct = Object.values(progress.results).filter((r) => r.correct).length
    const score = Math.round((correct / currentSession.exercises.length) * 100)
    return (
      <main className="app-shell">
        <header className="topbar"><div><strong>Ordly Exercises</strong><span>{currentSession.level} · progress saved</span></div><button className="icon-button" onClick={reset} aria-label="Reset"><RotateCcw size={19}/></button></header>
        <section className="summary-card">
          <div className="exercise-badge">Session complete</div>
          <div className="summary-score">{score}%</div>
          <p>{correct} of {currentSession.exercises.length} exercises completed without a mistake.</p>
          <div className="weak-panel">
            <strong>Words to revisit</strong>
            <div className="tag-list">
              {(weakWords.length ? weakWords : ['No weak words this round']).map((word) => <span className="tag" key={word}>{word}</span>)}
            </div>
          </div>
          <PrimaryButton onClick={() => { clearProgress(currentSession); setProgress(blankProgress(currentSession)) }}>Start a fresh round</PrimaryButton>
        </section>
      </main>
    )
  }

  const currentResult = progress.results[exercise.id]
  return (
    <main className="app-shell">
      <header className="topbar">
        <div><strong>Ordly Exercises</strong><span>{currentSession.level} · progress saved</span></div>
        <button className="icon-button" onClick={reset} aria-label="Reset practice"><RotateCcw size={19}/></button>
      </header>

      <div className="session-meta">
        <div><strong>{currentSession.title}</strong><span>{currentSession.subtitle}</span></div>
        <span>{progress.currentIndex + 1} / {currentSession.exercises.length}</span>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.max(3, percent)}%` }} /></div>

      <ExerciseRenderer
        exercise={exercise}
        draft={progress.drafts[exercise.id]}
        result={currentResult}
        onDraftChange={setDraft}
        onComplete={complete}
      />

      {currentResult?.completed && <PrimaryButton className="next-button" onClick={next}>{progress.currentIndex === currentSession.exercises.length - 1 ? 'See result' : 'Next'}</PrimaryButton>}
      <div className="storage-note">Your progress is stored in this browser on this device.</div>
    </main>
  )
}

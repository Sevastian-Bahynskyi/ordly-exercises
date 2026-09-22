import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, RotateCcw } from 'lucide-react'
import { currentSession } from './session/currentSession'
import { blankProgress, clearProgress, loadProgress, saveProgress } from './storage/progress'
import type { ExerciseResult, SessionProgress } from './types'
import { ExerciseRenderer } from './exercises/ExerciseRenderer'
import { PrimaryButton } from './components/PrimaryButton'
import { PronunciationAudio } from './components/PronunciationAudio'

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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
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
        <header className="glass-toolbar">
          <div className="toolbar-brand">
            <strong>Ordly</strong>
            <span>Practice</span>
          </div>
          <button className="glass-icon-button" onClick={reset} aria-label="Reset practice">
            <RotateCcw size={18} strokeWidth={2.1} />
          </button>
        </header>

        <section className="summary-card session-enter">
          <div className="exercise-badge">Session complete</div>
          <div className="summary-score">{score}%</div>
          <p>{correct} of {currentSession.exercises.length} exercises completed without a mistake.</p>
          <div className="weak-panel">
            <strong>Words to revisit</strong>
            <div className="tag-list">
              {(weakWords.length ? weakWords : ['No weak words this round']).map((word) => <span className="tag" key={word}>{word}</span>)}
            </div>
          </div>
          {!!currentSession.suggestedWords?.length && (
            <div className="suggested-panel">
              <div className="suggested-heading">
                <strong>Useful words to add next</strong>
                <span>Chosen to combine naturally with vocabulary from this session.</span>
              </div>
              <div className="suggested-word-list">
                {currentSession.suggestedWords.map((word) => (
                  <article className="suggested-word" key={word.danish}>
                    <div className="suggested-word-top">
                      <strong>{word.danish}</strong>
                      <span>{word.translation}</span>
                    </div>
                    <div className="suggested-example">{word.example}</div>
                    {word.exampleTranslation && <div className="suggested-example-translation">{word.exampleTranslation}</div>}
                    {!!word.connectsTo?.length && (
                      <div className="suggested-connects">Works with: {word.connectsTo.join(', ')}</div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}
          <PrimaryButton onClick={() => { clearProgress(currentSession); setProgress(blankProgress(currentSession)) }}>
            Start a fresh round
          </PrimaryButton>
        </section>
      </main>
    )
  }

  const currentResult = progress.results[exercise.id]

  return (
    <main className="app-shell">
      <header className="glass-toolbar">
        <div className="toolbar-brand">
          <strong>Ordly</strong>
          <span>Practice</span>
        </div>
        <div className="toolbar-status">{currentSession.level}</div>
        <button className="glass-icon-button" onClick={reset} aria-label="Reset practice">
          <RotateCcw size={18} strokeWidth={2.1} />
        </button>
      </header>

      <div className="progress-row">
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Session progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
        >
          <div className="progress-fill" style={{ width: `${Math.max(3, percent)}%` }} />
        </div>
        <div className="compact-step-counter" aria-label={`Exercise ${progress.currentIndex + 1} of ${currentSession.exercises.length}`}>
          <strong>{progress.currentIndex + 1}</strong>
          <span>/ {currentSession.exercises.length}</span>
        </div>
      </div>

      <div className="exercise-stage" key={exercise.id}>
        <ExerciseRenderer
          exercise={exercise}
          draft={progress.drafts[exercise.id]}
          result={currentResult}
          onDraftChange={setDraft}
          onComplete={complete}
        />
      </div>

      {currentResult?.completed && (
        <PronunciationAudio
          words={exercise.focusWords}
          audioByWord={currentSession.audioByWord}
        />
      )}

      {currentResult?.completed && (
        <div className="next-action">
          <PrimaryButton className="next-button" onClick={next}>
            <span>{progress.currentIndex === currentSession.exercises.length - 1 ? 'See result' : 'Continue'}</span>
            <ChevronRight size={19} strokeWidth={2.25} />
          </PrimaryButton>
        </div>
      )}

      <div className="storage-note">Progress saves automatically on this iPhone.</div>
    </main>
  )
}

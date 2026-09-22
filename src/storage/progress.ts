import type { PracticeSession, SessionProgress } from '../types'

const PREFIX = 'ordly-exercises:'

export function blankProgress(session: PracticeSession): SessionProgress {
  return {
    sessionId: session.id,
    currentIndex: 0,
    completed: false,
    results: {},
    drafts: {},
  }
}

export function loadProgress(session: PracticeSession): SessionProgress {
  try {
    const raw = localStorage.getItem(PREFIX + session.id)
    if (!raw) return blankProgress(session)
    const parsed = JSON.parse(raw) as SessionProgress
    if (parsed.sessionId !== session.id) return blankProgress(session)
    return {
      ...blankProgress(session),
      ...parsed,
      currentIndex: Math.max(0, Math.min(parsed.currentIndex ?? 0, session.exercises.length - 1)),
      results: parsed.results ?? {},
      drafts: parsed.drafts ?? {},
    }
  } catch {
    return blankProgress(session)
  }
}

export function saveProgress(progress: SessionProgress) {
  localStorage.setItem(PREFIX + progress.sessionId, JSON.stringify(progress))
}

export function clearProgress(session: PracticeSession) {
  localStorage.removeItem(PREFIX + session.id)
}

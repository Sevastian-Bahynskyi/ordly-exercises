import type { Exercise, PracticeSession } from '../types'
import { supabase } from '../lib/supabase'

const QUEUE_KEY = 'ordly-exercises:evidence-pending:v1'

type PendingEvidence = {
  id: string
  session_id: string
  target_key: string
  entry_id: string
  payload: Record<string, unknown>
}

function readQueue(): PendingEvidence[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeQueue(items: PendingEvidence[]) {
  try {
    if (items.length === 0) localStorage.removeItem(QUEUE_KEY)
    else localStorage.setItem(QUEUE_KEY, JSON.stringify(items))
  } catch {
    // Practice still works if localStorage is temporarily unavailable.
  }
}

function assistanceFor(exercise: Exercise) {
  if (exercise.type === 'type') return 'none'
  if (exercise.type === 'flash-reveal') return 'model'
  return 'choices'
}

export function queueExerciseEvidence(
  session: PracticeSession,
  exercise: Exercise,
  correct: boolean,
  responseMs: number,
) {
  if (!session.evidenceSessionId || !session.entryIdByWord || !exercise.evidenceWords?.length) return

  const now = new Date().toISOString()
  const queue = readQueue()
  const words = [...new Set(exercise.evidenceWords)]

  for (const word of words) {
    const entryId = session.entryIdByWord[word]
    if (!entryId) continue

    const id = crypto.randomUUID()
    const skill = exercise.evidenceSkill ?? 'meaning'
    const targetKey = `entry:${entryId}:${skill}`

    queue.push({
      id,
      session_id: session.evidenceSessionId,
      target_key: targetKey,
      entry_id: entryId,
      payload: {
        id,
        sessionId: session.evidenceSessionId,
        taskId: exercise.id,
        targetKey,
        entryId,
        kind: `ordly-${exercise.type}`,
        objective: skill,
        result: correct ? 'correct' : 'incorrect',
        rating: null,
        assistance: assistanceFor(exercise),
        modality: 'typed',
        responseMs: Math.max(0, Math.round(responseMs)),
        at: now,
        exposedAt: now,
        lastExposureAt: null,
        replays: 0,
        newTarget: false,
        promptVersion: 1,
        source: 'ordly-exercises',
        level: session.level,
        practiceSessionId: session.id,
        exerciseId: exercise.id,
      },
    })
  }

  writeQueue(queue)
}

export async function flushPracticeEvidence() {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return

  let queue = readQueue()
  if (queue.length === 0) return

  for (const item of [...queue]) {
    const { error } = await supabase.from('practice_attempts').insert(item)
    if (error && error.code !== '23505') return
    queue = queue.filter((queued) => queued.id !== item.id)
    writeQueue(queue)
  }
}

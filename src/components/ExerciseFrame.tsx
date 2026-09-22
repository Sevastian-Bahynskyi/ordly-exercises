import type { ReactNode } from 'react'

export function ExerciseFrame({
  badge,
  title,
  instruction,
  children,
}: {
  badge: string
  title: string
  instruction?: string
  children: ReactNode
}) {
  return (
    <section className="exercise-card">
      <div className="exercise-badge">{badge}</div>
      <h1>{title}</h1>
      {instruction && <p className="exercise-instruction">{instruction}</p>}
      <div className="exercise-body">{children}</div>
    </section>
  )
}

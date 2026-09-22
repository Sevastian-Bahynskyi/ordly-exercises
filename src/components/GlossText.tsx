import { useEffect, useId, useState } from 'react'

function normalizeToken(token: string) {
  return token.toLocaleLowerCase('da-DK')
}

export function GlossText({
  text,
  glosses,
}: {
  text: string
  glosses?: Record<string, string>
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const id = useId()

  useEffect(() => {
    if (openIndex === null) return
    const close = () => setOpenIndex(null)
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [openIndex])

  if (!glosses || Object.keys(glosses).length === 0) return <>{text}</>

  const normalizedGlosses = Object.fromEntries(
    Object.entries(glosses).map(([word, meaning]) => [normalizeToken(word), meaning]),
  )
  const parts = text.split(/([\p{L}ÆØÅæøå'-]+)/gu)

  return (
    <>
      {parts.map((part, index) => {
        const meaning = normalizedGlosses[normalizeToken(part)]
        if (!meaning) return <span key={index}>{part}</span>

        const tooltipId = `${id}-${index}`
        const open = openIndex === index

        return (
          <span className="gloss-wrap" key={index}>
            <button
              type="button"
              className="gloss-word"
              aria-expanded={open}
              aria-describedby={open ? tooltipId : undefined}
              onClick={(event) => {
                event.stopPropagation()
                setOpenIndex(open ? null : index)
              }}
              onBlur={() => {
                window.setTimeout(() => setOpenIndex((current) => current === index ? null : current), 100)
              }}
            >
              {part}
            </button>
            {open && (
              <span id={tooltipId} role="tooltip" className="gloss-tooltip">
                {meaning}
              </span>
            )}
          </span>
        )
      })}
    </>
  )
}

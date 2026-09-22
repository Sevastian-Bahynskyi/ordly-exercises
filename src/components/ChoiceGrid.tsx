import { useMemo } from 'react'
import { shuffleDifferent } from '../utils/shuffle'

export function ChoiceGrid({
  options,
  selected,
  disabled,
  correct,
  onChoose,
}: {
  options: string[]
  selected?: string
  disabled?: boolean
  correct?: string
  onChoose: (value: string) => void
}) {
  const optionOrder = useMemo(() => shuffleDifferent(options), [options])

  return (
    <div className="choice-grid">
      {optionOrder.map((option) => {
        const classes = ['choice-button']
        if (selected === option) classes.push('selected')
        if (disabled && correct === option) classes.push('correct')
        if (disabled && selected === option && selected !== correct) classes.push('wrong')
        return (
          <button
            type="button"
            key={option}
            className={classes.join(' ')}
            disabled={disabled}
            onClick={() => onChoose(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

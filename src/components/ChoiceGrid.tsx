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
  return (
    <div className="choice-grid">
      {options.map((option) => {
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

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapWith]] = [result[swapWith], result[index]]
  }
  return result
}

export function shuffleDifferent<T>(items: readonly T[]): T[] {
  if (items.length < 2) return [...items]

  const result = shuffle(items)
  const unchanged = result.every((item, index) => Object.is(item, items[index]))
  if (!unchanged) return result

  return [...result.slice(1), result[0]]
}

export function derange<T>(items: readonly T[]): T[] {
  if (items.length < 2) return [...items]

  for (let attempt = 0; attempt < 16; attempt += 1) {
    const result = shuffle(items)
    if (result.every((item, index) => !Object.is(item, items[index]))) return result
  }

  const offset = 1 + Math.floor(Math.random() * (items.length - 1))
  return items.map((_, index) => items[(index + offset) % items.length])
}

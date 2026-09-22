import type { ButtonHTMLAttributes } from 'react'

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props
  return <button {...rest} className={`primary-button ${className}`} />
}

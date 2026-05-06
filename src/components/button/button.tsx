import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './button.module.css'

type ButtonProps = {
  label?: string
  children?: ReactNode
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  label,
  children,
  fullWidth = false,
  className,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  const content = children ?? label ?? 'Boton'
  const classes = [
    styles.button,
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      {...buttonProps}
    >
      <span>{content}</span>
    </button>
  )
}

export default Button
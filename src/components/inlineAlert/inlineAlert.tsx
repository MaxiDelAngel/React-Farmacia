import type { ReactNode } from 'react'
import styles from './inlineAlert.module.css'

type InlineAlertVariant = 'info' | 'warning' | 'error' | 'success'

type InlineAlertProps = {
  message?: ReactNode
  children?: ReactNode
  variant?: InlineAlertVariant
  compact?: boolean
}

function InlineAlert({ message, children, variant = 'info', compact = false }: InlineAlertProps) {
  const classes = [styles.alert, styles[variant], compact ? styles.compact : ''].filter(Boolean).join(' ')

  return <div className={classes}>{children ?? message}</div>
}

export default InlineAlert
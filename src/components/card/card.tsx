import styles from './card.module.css'

type CardProps = {
  title: string
  value: string
  subtitle?: string
}

function Card({ title, value, subtitle }: CardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </article>
  )
}

export default Card
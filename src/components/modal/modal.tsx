import { useEffect, type ReactNode } from 'react'
import styles from './modal.module.css'

type ModalProps = {
	isOpen: boolean
	title?: string
	body: ReactNode
	footer?: ReactNode
	onClose: () => void
	closeOnOverlayClick?: boolean
}

function Modal({
	isOpen,
	title,
	body,
	footer,
	onClose,
	closeOnOverlayClick = true,
}: ModalProps) {
	useEffect(() => {
		if (!isOpen) return

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div
			className={styles.overlay}
			role="button"
			tabIndex={-1}
			aria-label="Cerrar modal"
			onClick={closeOnOverlayClick ? onClose : undefined}
		>
			<section
				className={styles.modal}
				role="dialog"
				aria-modal="true"
				aria-label={title ?? 'Modal'}
				onClick={(event) => event.stopPropagation()}
			>
				<header className={styles.header}>
					{title ? <h2 className={styles.title}>{title}</h2> : <span />}
					<button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
						x
					</button>
				</header>

				<div className={styles.body}>{body}</div>

				{footer ? <footer className={styles.footer}>{footer}</footer> : null}
			</section>
		</div>
	)
}

export default Modal

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../../i18n/useI18n'
import { IconButton } from './IconButton'

export interface ModalProps {
  open: boolean
  onClose: () => void
  /** Visible title; also the dialog's accessible name. */
  title: string
  children: ReactNode
  /** Hide the ✕ button when the child must pick an option. Escape still closes. */
  hideCloseButton?: boolean
}

/** Simple accessible dialog: portal, backdrop, Escape to close, focus moved in and restored. */
export function Modal({ open, onClose, title, children, hideCloseButton = false }: ModalProps) {
  const { t } = useI18n()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div
        aria-hidden="true"
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-night-900/50"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-bubble bg-cloud p-6 shadow-float motion-safe:animate-pop-in"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id={titleId} className="text-kid-lg font-bold text-night-700">
            {title}
          </h2>
          {hideCloseButton ? null : (
            <IconButton label={t('common.close')} icon="✕" onClick={onClose} />
          )}
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

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

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Accessible dialog: portal, backdrop, Escape to close, Tab/Shift+Tab kept inside,
 * the app behind it made inert, and focus restored on close.
 */
export function Modal({ open, onClose, title, children, hideCloseButton = false }: ModalProps) {
  const { t } = useI18n()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Focus in on open, restore on close; make the app behind the dialog inert.
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const appRoot = document.getElementById('root')
    const wasInert = appRoot?.hasAttribute('inert') ?? false
    appRoot?.setAttribute('inert', '')
    panelRef.current?.focus()
    return () => {
      if (appRoot && !wasInert) appRoot.removeAttribute('inert')
      previouslyFocused?.focus?.()
    }
  }, [open])

  // Escape closes; Tab / Shift+Tab wrap within the dialog.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) {
        event.preventDefault()
        panelRef.current.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      const inside = panelRef.current.contains(active)
      if (event.shiftKey && (active === first || !inside || active === panelRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div
        aria-hidden="true"
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-night-900/50"
        onClick={() => onCloseRef.current()}
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
            <IconButton label={t('common.close')} icon="✕" onClick={() => onCloseRef.current()} />
          )}
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

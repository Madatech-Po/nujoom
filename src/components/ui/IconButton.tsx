import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible name (required: the icon alone says nothing to a screen reader). */
  label: string
  icon: ReactNode
  tone?: 'light' | 'solid'
}

/** Round 56px icon-only button. */
export function IconButton({
  label,
  icon,
  tone = 'light',
  className = '',
  type = 'button',
  ...rest
}: IconButtonProps) {
  const toneClasses =
    tone === 'solid' ? 'bg-night-600 text-white' : 'bg-cloud text-night-700 ring-2 ring-night-200'
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={[
        'inline-flex size-tap shrink-0 items-center justify-center rounded-full text-kid-md shadow-pop transition',
        'motion-safe:active:translate-y-1 active:shadow-pop-pressed disabled:opacity-50',
        toneClasses,
        className,
      ].join(' ')}
      {...rest}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )
}

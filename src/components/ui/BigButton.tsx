import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type BigButtonVariant = 'primary' | 'secondary' | 'success' | 'danger'

const variantClasses: Record<BigButtonVariant, string> = {
  primary: 'bg-night-600 text-white',
  secondary: 'bg-cloud text-night-700 ring-2 ring-night-200',
  success: 'bg-meadow-700 text-white',
  danger: 'bg-berry-700 text-white',
}

export interface BigButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BigButtonVariant
  /** Decorative icon shown before the label (inline start, so it mirrors in RTL). */
  icon?: ReactNode
  fullWidth?: boolean
  size?: 'md' | 'lg'
}

/** Main action button for children: ≥56px (72px for size="lg"), big text, pressable shadow. */
export function BigButton({
  variant = 'primary',
  icon,
  fullWidth = false,
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...rest
}: BigButtonProps) {
  const sizeClasses = size === 'lg' ? 'min-h-tap-lg px-8 text-kid-lg' : 'min-h-tap px-6 text-kid-md'
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-3 rounded-kid font-bold shadow-pop transition',
        'motion-safe:active:translate-y-1 active:shadow-pop-pressed',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </button>
  )
}

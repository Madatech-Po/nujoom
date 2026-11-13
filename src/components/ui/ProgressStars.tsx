import { useI18n } from '../../i18n/useI18n'

export interface ProgressStarsProps {
  /** Stars earned (clamped to 0..max). */
  count: number
  max?: number
  size?: 'md' | 'lg'
}

/** Row of earned / empty stars, e.g. the 0–3 stars of a round. Announced as "2 of 3 stars". */
export function ProgressStars({ count, max = 3, size = 'md' }: ProgressStarsProps) {
  const { t } = useI18n()
  const earned = Math.max(0, Math.min(max, Math.floor(count)))
  const textSize = size === 'lg' ? 'text-kid-xl' : 'text-kid-lg'
  return (
    <div
      role="img"
      aria-label={t('stars.progress', { count: earned, max })}
      className={`flex items-center gap-1 ${textSize}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          data-earned={i < earned}
          aria-hidden="true"
          className={i < earned ? 'motion-safe:animate-pop-in' : 'opacity-25 grayscale'}
          style={i < earned ? { animationDelay: `${i * 150}ms` } : undefined}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}

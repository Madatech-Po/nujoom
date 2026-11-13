import { useEffect, useRef } from 'react'
import { useI18n } from '../../i18n/useI18n'
import { audio, type AudioEngine } from '../../lib/audio'

export interface CelebrationProps {
  show: boolean
  /** Message announced and shown; defaults to "Well done!" in the current language. */
  message?: string
  /** Optional cheer sound. */
  sound?: string
  engine?: AudioEngine
  /** Auto-dismiss after this many ms (0 = stay until onDone is called elsewhere). */
  durationMs?: number
  onDone?: () => void
}

// Fixed positions (inline-start based, so the burst mirrors in RTL) — no randomness, stable tests.
const BURST = [
  { start: '8%', top: '18%', delay: 0 },
  { start: '78%', top: '12%', delay: 120 },
  { start: '20%', top: '70%', delay: 240 },
  { start: '70%', top: '64%', delay: 80 },
  { start: '45%', top: '8%', delay: 200 },
  { start: '50%', top: '78%', delay: 160 },
]

/** Full-screen "stars burst" shown after a good answer or a finished round. */
export function Celebration({
  show,
  message,
  sound,
  engine = audio,
  durationMs = 1800,
  onDone,
}: CelebrationProps) {
  const { t } = useI18n()
  // Keep the latest callback without restarting the sound/timer when its identity changes.
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    if (!show) return
    if (sound) void engine.play(sound)
    if (!durationMs) return
    const timer = window.setTimeout(() => onDoneRef.current?.(), durationMs)
    return () => window.clearTimeout(timer)
  }, [show, sound, engine, durationMs])

  if (!show) return null

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="celebration"
      className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
    >
      {BURST.map((star, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute text-kid-xl motion-safe:animate-pop-in"
          style={{ insetInlineStart: star.start, top: star.top, animationDelay: `${star.delay}ms` }}
        >
          ⭐
        </span>
      ))}
      <p className="rounded-bubble bg-cloud px-8 py-4 text-kid-xl font-bold text-night-700 shadow-float motion-safe:animate-pop-in">
        {message ?? t('celebration.default')}
      </p>
    </div>
  )
}

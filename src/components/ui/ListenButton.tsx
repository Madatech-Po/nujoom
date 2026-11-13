import { useState } from 'react'
import { useI18n } from '../../i18n/useI18n'
import { audio, type AudioEngine } from '../../lib/audio'

export interface ListenButtonProps {
  /** Instruction sound to play (e.g. "tap the letter you hear"). */
  src: string
  engine?: AudioEngine
  size?: 'md' | 'lg'
}

/**
 * The "listen" speaker button every instruction screen shows, so text is never the only cue.
 * Pulses while the sound is starting.
 */
export function ListenButton({ src, engine = audio, size = 'lg' }: ListenButtonProps) {
  const { t } = useI18n()
  const [busy, setBusy] = useState(false)
  const sizeClasses = size === 'lg' ? 'size-tap-lg text-kid-lg' : 'size-tap text-kid-md'

  async function handleClick() {
    engine.unlock()
    setBusy(true)
    try {
      await engine.play(src)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t('audio.listen')}
      title={t('audio.listen')}
      data-busy={busy}
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-full bg-star-400 text-night-900 shadow-pop transition',
        'motion-safe:active:translate-y-1 active:shadow-pop-pressed',
        busy ? 'motion-safe:animate-twinkle' : '',
        sizeClasses,
      ].join(' ')}
    >
      <span aria-hidden="true">🔊</span>
    </button>
  )
}

import { IconButton } from '../components/ui/IconButton'
import { useI18n } from '../i18n/useI18n'
import { audio, type AudioEngine } from '../lib/audio'
import { useMuted } from '../lib/useMuted'

/** Header speaker toggle; the choice is remembered on the device. */
export function MuteToggle({ engine = audio }: { engine?: AudioEngine }) {
  const { t } = useI18n()
  const muted = useMuted(engine)
  return (
    <IconButton
      label={muted ? t('audio.unmute') : t('audio.mute')}
      icon={muted ? '🔇' : '🔈'}
      aria-pressed={muted}
      data-testid="mute-toggle"
      onClick={() => engine.toggleMuted()}
    />
  )
}

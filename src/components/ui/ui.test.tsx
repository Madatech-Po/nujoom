import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { I18nProvider } from '../../i18n/I18nProvider'
import { LANGUAGE_STORAGE_KEY, messages, translate } from '../../i18n'
import { AudioEngine } from '../../lib/audio'
import { MuteToggle } from '../../app/MuteToggle'
import { AvatarBadge } from './AvatarBadge'
import { BigButton } from './BigButton'
import { Card } from './Card'
import { Celebration } from './Celebration'
import { IconButton } from './IconButton'
import { ListenButton } from './ListenButton'
import { Modal } from './Modal'
import { ProgressStars } from './ProgressStars'

function wrap(ui: ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>)
}

function stubEngine() {
  const engine = new AudioEngine({ createContext: () => null, storage: null })
  const play = vi.spyOn(engine, 'play').mockResolvedValue(true)
  const unlock = vi.spyOn(engine, 'unlock')
  return { engine, play, unlock }
}

beforeEach(() => window.localStorage.clear())

describe('BigButton', () => {
  it('is a real button with a tap-size class and fires onClick', async () => {
    const onClick = vi.fn()
    render(
      <BigButton onClick={onClick} icon="▶">
        Play
      </BigButton>,
    )
    const button = screen.getByRole('button', { name: 'Play' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button.className).toContain('min-h-tap')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('uses the larger target for size="lg" and does not fire when disabled', async () => {
    const onClick = vi.fn()
    render(
      <BigButton size="lg" disabled onClick={onClick}>
        Go
      </BigButton>,
    )
    const button = screen.getByRole('button', { name: 'Go' })
    expect(button.className).toContain('min-h-tap-lg')
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('IconButton', () => {
  it('exposes its label as the accessible name and hides the icon', () => {
    render(<IconButton label="Close" icon="✕" />)
    const button = screen.getByRole('button', { name: 'Close' })
    expect(button.className).toContain('size-tap')
    expect(button.querySelector('[aria-hidden="true"]')).toHaveTextContent('✕')
  })
})

describe('Card', () => {
  it('renders children with the chosen tone', () => {
    render(<Card tone="star">ب</Card>)
    expect(screen.getByText('ب').className).toContain('ring-star-400')
  })
})

describe('ProgressStars', () => {
  it('announces earned stars in Arabic digits and clamps the count', () => {
    wrap(<ProgressStars count={5} max={3} />)
    expect(screen.getByRole('img')).toHaveAccessibleName(
      translate('ar', 'stars.progress', { count: 3, max: 3 }),
    )
    expect(screen.getByRole('img').querySelectorAll('[data-earned="true"]')).toHaveLength(3)
  })

  it('announces in English when English is active', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    wrap(<ProgressStars count={2} />)
    expect(screen.getByRole('img')).toHaveAccessibleName('2 of 3 stars')
  })
})

describe('AvatarBadge', () => {
  it('shows an emoji avatar and the nickname', () => {
    render(<AvatarBadge avatar="🦁" name="Lulu" selected />)
    expect(screen.getByText('Lulu')).toBeInTheDocument()
    expect(screen.getByText('🦁')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders built-in image avatars as decorative images', () => {
    const { container } = render(<AvatarBadge avatar="/avatars/lion.svg" />)
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })
})

describe('Modal', () => {
  it('renders an accessible dialog, closes on Escape, backdrop and the ✕ button', async () => {
    const onClose = vi.fn()
    wrap(
      <Modal open title="Pick a level" onClose={onClose}>
        <p>content</p>
      </Modal>,
    )
    const dialog = screen.getByRole('dialog', { name: 'Pick a level' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    await userEvent.click(screen.getByTestId('modal-backdrop'))
    await userEvent.click(screen.getByRole('button', { name: messages.ar['common.close'] }))
    expect(onClose).toHaveBeenCalledTimes(3)
  })

  it('renders nothing when closed', () => {
    wrap(
      <Modal open={false} title="x" onClose={() => {}}>
        hidden
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})

describe('Celebration', () => {
  it('announces the default message, plays the sound and auto-dismisses', () => {
    vi.useFakeTimers()
    const { engine, play } = stubEngine()
    const onDone = vi.fn()
    wrap(<Celebration show sound="/cheer.mp3" engine={engine} durationMs={1000} onDone={onDone} />)
    expect(screen.getByRole('status')).toHaveTextContent(messages.ar['celebration.default'])
    expect(play).toHaveBeenCalledWith('/cheer.mp3')
    act(() => vi.advanceTimersByTime(1000))
    expect(onDone).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('renders nothing when hidden', () => {
    wrap(<Celebration show={false} />)
    expect(screen.queryByTestId('celebration')).toBeNull()
  })
})

describe('ListenButton', () => {
  it('unlocks audio and plays the instruction sound, labelled "Listen"', async () => {
    const { engine, play, unlock } = stubEngine()
    wrap(<ListenButton src="/say-ba.mp3" engine={engine} />)
    const button = screen.getByRole('button', { name: messages.ar['audio.listen'] })
    expect(button.className).toContain('size-tap-lg')
    await userEvent.click(button)
    expect(unlock).toHaveBeenCalled()
    expect(play).toHaveBeenCalledWith('/say-ba.mp3')
  })
})

describe('MuteToggle', () => {
  it('toggles mute with a label that says what the tap will do', async () => {
    const engine = new AudioEngine({ createContext: () => null, storage: null })
    wrap(<MuteToggle engine={engine} />)
    const button = screen.getByTestId('mute-toggle')
    expect(button).toHaveAccessibleName(messages.ar['audio.mute'])
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(button)
    expect(engine.isMuted()).toBe(true)
    expect(button).toHaveAccessibleName(messages.ar['audio.unmute'])
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })
})

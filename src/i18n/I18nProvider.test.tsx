import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nProvider } from './I18nProvider'
import { useI18n } from './useI18n'
import { LANGUAGE_STORAGE_KEY, messages } from './index'
import { LanguageToggle } from '../app/LanguageToggle'

function Probe() {
  const { t, lang, dir } = useI18n()
  return (
    <p data-testid="probe" data-lang={lang} data-dir={dir}>
      {t('home.tagline')}
    </p>
  )
}

function renderWithToggle() {
  return render(
    <I18nProvider>
      <Probe />
      <LanguageToggle />
    </I18nProvider>,
  )
}

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('lang')
  document.documentElement.removeAttribute('dir')
})

describe('I18nProvider', () => {
  it('defaults to Arabic and sets <html lang="ar" dir="rtl">', () => {
    renderWithToggle()
    expect(screen.getByTestId('probe')).toHaveTextContent(messages.ar['home.tagline'])
    expect(document.documentElement).toHaveAttribute('lang', 'ar')
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
  })

  it('toggles to English (ltr) and remembers the choice on the device', async () => {
    renderWithToggle()
    await userEvent.click(screen.getByTestId('language-toggle'))

    expect(screen.getByTestId('probe')).toHaveTextContent(messages.en['home.tagline'])
    expect(screen.getByTestId('probe')).toHaveAttribute('data-dir', 'ltr')
    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(document.documentElement).toHaveAttribute('dir', 'ltr')
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en')

    await userEvent.click(screen.getByTestId('language-toggle'))
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('ar')
  })

  it('starts in the stored language', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    renderWithToggle()
    expect(screen.getByTestId('probe')).toHaveAttribute('data-lang', 'en')
    expect(document.documentElement).toHaveAttribute('dir', 'ltr')
  })

  it('ignores an unknown stored value and falls back to Arabic', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'fr')
    renderWithToggle()
    expect(screen.getByTestId('probe')).toHaveAttribute('data-lang', 'ar')
  })

  it('labels the toggle for screen readers with the target language and shows its glyph', () => {
    renderWithToggle()
    const toggle = screen.getByRole('button', { name: messages.ar['language.toggle.label'] })
    expect(toggle).toHaveTextContent(messages.ar['language.toggle.glyph'])
  })

  it('marks the toggle with the target language so screen readers use the right voice', async () => {
    renderWithToggle()
    const toggle = screen.getByTestId('language-toggle')
    // Arabic page: the label "Switch to English" is English.
    expect(document.documentElement).toHaveAttribute('lang', 'ar')
    expect(toggle).toHaveAttribute('lang', 'en')

    await userEvent.click(toggle)
    // English page: the label "التبديل إلى العربية" is Arabic.
    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(toggle).toHaveAttribute('lang', 'ar')
  })

  it('throws a clear error when used outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useI18n())).toThrow(/I18nProvider/)
    spy.mockRestore()
  })
})

describe('message files', () => {
  it('have the same keys and no empty strings in both languages', () => {
    expect(Object.keys(messages.en).sort()).toEqual(Object.keys(messages.ar).sort())
    for (const lang of ['ar', 'en'] as const) {
      for (const value of Object.values(messages[lang])) expect(value.trim()).not.toBe('')
    }
  })
})

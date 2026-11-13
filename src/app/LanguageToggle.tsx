import { useI18n } from '../i18n/useI18n'

/** Shows the OTHER language's glyph (EN / ع) so a pre-reader can spot it; the label is for screen readers. */
export function LanguageToggle() {
  const { t, toggleLanguage } = useI18n()
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t('language.toggle.label')}
      data-testid="language-toggle"
      className="flex size-14 items-center justify-center rounded-full bg-white text-xl font-bold text-indigo-700 shadow-md ring-2 ring-indigo-200 transition active:scale-95 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
    >
      <span aria-hidden="true">{t('language.toggle.glyph')}</span>
    </button>
  )
}

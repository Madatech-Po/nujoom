import { useI18n } from '../i18n/useI18n'

/**
 * Shows the OTHER language's glyph (EN / ع) so a pre-reader can spot it; the label is for screen
 * readers. Glyph and label are written in the target language, so the button carries that
 * language in `lang` and screen readers pronounce it with the right voice.
 */
export function LanguageToggle() {
  const { t, lang, toggleLanguage } = useI18n()
  const target = lang === 'ar' ? 'en' : 'ar'
  return (
    <button
      type="button"
      lang={target}
      onClick={toggleLanguage}
      aria-label={t('language.toggle.label')}
      data-testid="language-toggle"
      className="flex size-tap items-center justify-center rounded-full bg-cloud text-xl font-bold text-night-700 shadow-pop ring-2 ring-night-200 transition motion-safe:active:translate-y-1 active:shadow-pop-pressed"
    >
      <span aria-hidden="true">{t('language.toggle.glyph')}</span>
    </button>
  )
}

import { useCallback, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, type I18nValue } from './context'
import {
  applyDocumentLanguage,
  languageDirection,
  readStoredLanguage,
  storeLanguage,
  translate,
  type Language,
} from './index'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(readStoredLanguage)

  useLayoutEffect(() => {
    applyDocumentLanguage(lang)
  }, [lang])

  const setLanguage = useCallback((next: Language) => {
    storeLanguage(next)
    setLang(next)
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir: languageDirection[lang],
      t: (key) => translate(lang, key),
      setLanguage,
      toggleLanguage: () => setLanguage(lang === 'ar' ? 'en' : 'ar'),
    }),
    [lang, setLanguage],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

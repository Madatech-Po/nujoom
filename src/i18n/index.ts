import ar from './ar.json'
import en from './en.json'

export type Language = 'ar' | 'en'
export type Direction = 'rtl' | 'ltr'
export type MessageKey = keyof typeof ar

export const messages: Record<Language, Record<MessageKey, string>> = { ar, en }
export const defaultLanguage: Language = 'ar'
export const languageDirection: Record<Language, Direction> = { ar: 'rtl', en: 'ltr' }

/** localStorage key for the device-level language choice (per-child preference comes later). */
export const LANGUAGE_STORAGE_KEY = 'nujoom.lang'

export function isLanguage(value: unknown): value is Language {
  return value === 'ar' || value === 'en'
}

export type MessageVars = Record<string, string | number>

const numberLocale: Record<Language, string> = { ar: 'ar-EG', en: 'en' }

/** Looks up a message and fills `{name}` placeholders; numbers use the language's digits. */
export function translate(lang: Language, key: MessageKey, vars?: MessageVars): string {
  const template = messages[lang][key]
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name]
    if (value === undefined) return match
    return typeof value === 'number' ? value.toLocaleString(numberLocale[lang]) : value
  })
}

export function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return isLanguage(stored) ? stored : defaultLanguage
  } catch {
    return defaultLanguage
  }
}

export function storeLanguage(lang: Language): void {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  } catch {
    // Private mode / storage blocked: the choice simply won't persist.
  }
}

/** Sets <html lang dir> so the whole page (and the browser) mirrors correctly. */
export function applyDocumentLanguage(lang: Language): void {
  const root = document.documentElement
  root.lang = lang
  root.dir = languageDirection[lang]
}

// Minimal message lookup for the scaffold. The full i18n setup (language switching,
// persisted preference, <html dir>) arrives with NUJ-11.
import ar from './ar.json'
import en from './en.json'

export type Language = 'ar' | 'en'
export type MessageKey = keyof typeof ar

export const messages: Record<Language, Record<MessageKey, string>> = { ar, en }
export const defaultLanguage: Language = 'ar'

export function t(key: MessageKey, lang: Language = defaultLanguage): string {
  return messages[lang][key]
}

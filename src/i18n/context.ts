import { createContext } from 'react'
import type { Direction, Language, MessageKey, MessageVars } from './index'

export interface I18nValue {
  lang: Language
  dir: Direction
  t: (key: MessageKey, vars?: MessageVars) => string
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export const I18nContext = createContext<I18nValue | null>(null)

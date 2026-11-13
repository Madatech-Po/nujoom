import type { ReactNode } from 'react'
import { useI18n } from '../i18n/useI18n'
import { LanguageToggle } from './LanguageToggle'
import { MuteToggle } from './MuteToggle'

/**
 * Mobile-first frame: full dynamic height, safe-area padding, header with the app name at the
 * inline start and the sound + language toggles at the inline end (mirrors automatically in RTL).
 * Safe-area insets are physical (left/right) on purpose — they describe the device, not the text.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useI18n()
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-night-50 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] text-night-900">
      <header className="flex items-center justify-between gap-3 px-4 py-3">
        <div data-testid="app-brand" className="flex items-center gap-2">
          <span aria-hidden="true" className="text-3xl">
            ⭐
          </span>
          <span className="text-2xl font-bold text-night-700">{t('app.name')}</span>
        </div>
        <div className="flex items-center gap-2">
          <MuteToggle />
          <LanguageToggle />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-6">{children}</main>
    </div>
  )
}

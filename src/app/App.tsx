import { I18nProvider } from '../i18n/I18nProvider'
import { useI18n } from '../i18n/useI18n'
import { AppShell } from './AppShell'

function Home() {
  const { t } = useI18n()
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <span aria-hidden="true" className="text-7xl">
        ⭐
      </span>
      <h1 className="text-5xl font-bold text-indigo-700">{t('app.name')}</h1>
      <p className="text-xl">{t('home.tagline')}</p>
    </section>
  )
}

export function App() {
  return (
    <I18nProvider>
      <AppShell>
        <Home />
      </AppShell>
    </I18nProvider>
  )
}

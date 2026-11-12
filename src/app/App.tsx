import { t } from '../i18n'

export function App() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-indigo-50 p-4 text-center">
      <span aria-hidden="true" className="text-7xl">
        ⭐
      </span>
      <h1 className="text-5xl font-bold text-indigo-700">{t('app.name')}</h1>
      <p className="text-xl text-indigo-900">{t('home.tagline')}</p>
    </main>
  )
}

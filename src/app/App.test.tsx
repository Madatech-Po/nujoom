import { render, screen } from '@testing-library/react'
import { App } from './App'
import { messages } from '../i18n'

describe('App', () => {
  it('renders the Arabic app name and tagline by default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('نجوم')
    expect(screen.getByText('نتعلم الحروف ونجمع النجوم')).toBeInTheDocument()
  })

  it('has the same message keys in Arabic and English', () => {
    expect(Object.keys(messages.en).sort()).toEqual(Object.keys(messages.ar).sort())
  })
})

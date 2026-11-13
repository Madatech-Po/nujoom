import { render, screen } from '@testing-library/react'
import { App } from './App'
import { messages } from '../i18n'

beforeEach(() => window.localStorage.clear())

describe('App', () => {
  it('renders the Arabic app name and tagline by default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(messages.ar['app.name'])
    expect(screen.getByText(messages.ar['home.tagline'])).toBeInTheDocument()
  })

  it('shows the language toggle in the shell header', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toContainElement(screen.getByTestId('language-toggle'))
  })
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted font (no request to Google: keeps children's IPs private and works offline).
import '@fontsource/baloo-bhaijaan-2/400.css'
import '@fontsource/baloo-bhaijaan-2/600.css'
import '@fontsource/baloo-bhaijaan-2/700.css'
import './index.css'
import { App } from './app/App.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

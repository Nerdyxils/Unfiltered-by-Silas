import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UnfilteredLandingPage from './components/UnfilteredLandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnfilteredLandingPage />
  </StrictMode>,
)

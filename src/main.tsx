import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ordly-exercises/sw.js', {
      scope: '/ordly-exercises/',
    }).catch(() => {
      // Practice still works online if service-worker registration is unavailable.
    })
  })
}

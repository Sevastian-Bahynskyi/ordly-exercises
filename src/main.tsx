import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const preventGestureZoom = (event: Event) => event.preventDefault()
const preventMultiTouchZoom = (event: TouchEvent) => {
  if (event.touches.length > 1) event.preventDefault()
}

document.addEventListener('gesturestart', preventGestureZoom, { passive: false })
document.addEventListener('gesturechange', preventGestureZoom, { passive: false })
document.addEventListener('gestureend', preventGestureZoom, { passive: false })
document.addEventListener('touchmove', preventMultiTouchZoom, { passive: false })

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

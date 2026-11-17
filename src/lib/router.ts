import { useEffect, useSyncExternalStore } from 'react'

const NAVIGATE_EVENT = 'rootsense:navigate'
let navigated = false

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(NAVIGATE_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(NAVIGATE_EVENT, onChange)
  }
}

const currentHref = () => window.location.pathname + window.location.search

export function useLocation() {
  const href = useSyncExternalStore(subscribe, currentHref)
  const url = new URL(href, window.location.origin)
  return { path: url.pathname.replace(/\/+$/, '') || '/', params: url.searchParams }
}

export function navigate(to: string) {
  if (to === currentHref()) return
  navigated = true
  window.history.pushState(null, '', to)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
  window.scrollTo({ top: 0, behavior: 'instant' })
}

window.addEventListener('popstate', () => {
  navigated = true
})

export const hasNavigated = () => navigated

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

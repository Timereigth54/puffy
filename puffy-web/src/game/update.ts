// Getting a new version onto an installed tablet. The offline copy is about
// 14 MB, so a new version downloads in the background and waits. It is applied
// when Puffy goes to the background (never in front of a child mid-play), or
// when a grown-up taps "Update now". Before this, an installed Puffy could stay
// on an old version for days (a Samsung tablet did, 2026-09-29).
import { registerSW } from 'virtual:pwa-register'

export type UpdateStatus = 'unsupported' | 'checking' | 'current' | 'downloading' | 'ready' | 'offline'

let status: UpdateStatus = 'unsupported'
let registration: ServiceWorkerRegistration | undefined
let apply: ((reload?: boolean) => Promise<void>) | null = null
const listeners = new Set<(s: UpdateStatus) => void>()

function set(s: UpdateStatus) {
  status = s
  listeners.forEach((l) => l(s))
}

export function startUpdates() {
  if (!('serviceWorker' in navigator) || apply) return
  set('checking')
  apply = registerSW({
    immediate: true,
    onNeedRefresh: () => set('ready'),
    onRegisteredSW: (_url, reg) => {
      registration = reg
      reg?.addEventListener('updatefound', () => {
        set('downloading')
        // Watch the download itself: the library's "ready" callback does not
        // fire on every path (it missed one in testing), this always does.
        const worker = reg.installing
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && reg.waiting && navigator.serviceWorker.controller) set('ready')
          if (worker.state === 'redundant') set('current')
        })
      })
      void checkForUpdate()
    },
    onRegisterError: () => set('unsupported'),
  })
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && status === 'ready') applyUpdate()
    if (document.visibilityState === 'visible') void checkForUpdate()
  })
}

export async function checkForUpdate() {
  if (!registration || status === 'downloading' || status === 'ready') return
  set('checking')
  try {
    await registration.update()
    if (registration.waiting) set('ready')
    else if (registration.installing) set('downloading')
    else set('current')
  } catch {
    set('offline')
  }
}

/** Switches to the downloaded version and reloads the page. */
export function applyUpdate() {
  void apply?.(true)
}

export function onUpdateStatus(listener: (s: UpdateStatus) => void): () => void {
  listeners.add(listener)
  listener(status)
  return () => {
    listeners.delete(listener)
  }
}

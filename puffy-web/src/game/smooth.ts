// Smooth mode: the light version of the bathroom (no blur, soft shadows,
// ripples or wall bubbles) for devices that cannot keep up. It used to be
// switched on only by guessing from memory and processor count, which iPhones
// do not report, so an iPhone never got it. Now Puffy also measures its own
// frame rate during play and switches smooth mode on when it runs slow.

export type SmoothSetting = 'auto' | 'on' | 'off'

/** Below this, Puffy looks choppy: smooth mode switches itself on. */
export const SLOW_FPS = 45

export interface DeviceSpeed {
  /** Frames per second measured during the latest play. */
  fps: number
  /** Whether smooth mode was already on while measuring. */
  withSmooth: boolean
  /** ISO date and time of the measurement. */
  at: string
  /** Slow plays with full effects in a row. */
  slowRuns: number
  /** Set after SLOW_RUNS slow plays in a row. Stays until a grown-up clears it. */
  autoSmooth: boolean
}

/**
 * Slow plays in a row before smooth mode switches itself on. One is not
 * enough: a single hiccup (the first play after a 14 MB update downloads, say)
 * would otherwise switch it on for good. A smooth play resets the count.
 */
export const SLOW_RUNS = 2

const KEY = 'puffy.device'

export function loadSpeed(): DeviceSpeed | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as DeviceSpeed) : null
  } catch {
    return null
  }
}

export function saveSpeed(s: DeviceSpeed | null) {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s))
    else localStorage.removeItem(KEY)
  } catch {
    /* private mode: measured again next time */
  }
}

/** The old guess: 2 GB of memory or less, 2 cores or fewer, or ?lite in the address. */
export function looksWeak(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number }
  return (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) || (navigator.hardwareConcurrency ?? 8) <= 2 || location.search.includes('lite')
}

export function smoothOn(setting: SmoothSetting, weak: boolean, speed: DeviceSpeed | null): boolean {
  if (setting === 'on') return true
  if (setting === 'off') return false
  return weak || (speed?.autoSmooth ?? false)
}

/** The record after one measurement. SLOW_RUNS slow plays in a row with full effects turn automatic smooth mode on. */
export function afterMeasuring(prev: DeviceSpeed | null, fps: number, withSmooth: boolean, at: string): DeviceSpeed {
  const before = prev?.slowRuns ?? 0
  // A play measured in smooth mode says nothing about full effects: the count stands.
  const slowRuns = withSmooth ? before : fps < SLOW_FPS ? before + 1 : 0
  return { fps, withSmooth, at, slowRuns, autoSmooth: (prev?.autoSmooth ?? false) || slowRuns >= SLOW_RUNS }
}

/** Frames per second over `ms`, or null if Puffy was hidden meanwhile (the count would mean nothing). */
export function measureFps(ms = 4000): Promise<number | null> {
  return new Promise((resolve) => {
    let frames = 0
    let start = 0
    const tick = (t: number) => {
      if (document.visibilityState !== 'visible') return resolve(null)
      if (!start) start = t
      else frames++
      if (t - start < ms) requestAnimationFrame(tick)
      else resolve(frames / ((t - start) / 1000))
    }
    requestAnimationFrame(tick)
  })
}

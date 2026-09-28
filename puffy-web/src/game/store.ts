// Everything stays on the device. Settings and progress live in localStorage;
// the parent's recording of the child's name lives in IndexedDB.
import type { Progress, Settings } from './types'

const PROGRESS_KEY = 'puffy.progress'
const SETTINGS_KEY = 'puffy.settings'
export const PROGRESS_VERSION = 1

export const DEFAULT_SETTINGS: Settings = {
  ageMode: 0,
  voiceOn: true,
  textLevel: 'off',
  spitSound: 'silly',
  hints: 'always',
  timeLimitMinutes: null,
}

export function freshProgress(): Progress {
  return {
    version: PROGRESS_VERSION,
    childName: null,
    hasNameRecording: false,
    onboarded: false,
    discovered: [],
    discoveredAt: {},
    feedCounts: {},
    secondsPlayed: 0,
    sessions: 0,
    unseenStickers: [],
  }
}

function read<T>(key: string): Partial<T> | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Partial<T>) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode or full storage: play continues without saving */
  }
}

/** Merges stored data over defaults so older saves gain new fields instead of breaking. */
export function loadProgress(): Progress {
  const stored = read<Progress>(PROGRESS_KEY)
  return { ...freshProgress(), ...(stored ?? {}), version: PROGRESS_VERSION }
}

export function saveProgress(p: Progress) {
  write(PROGRESS_KEY, p)
}

export function loadSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...(read<Settings>(SETTINGS_KEY) ?? {}) }
}

export function saveSettings(s: Settings) {
  write(SETTINGS_KEY, s)
}

// ─── Name recording (IndexedDB) ─────────────────────────────────────────────
const DB = 'puffy'
const STORE = 'recordings'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveNameRecording(blob: Blob | null): Promise<boolean> {
  try {
    const db = await openDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      if (blob) tx.objectStore(STORE).put(blob, 'name')
      else tx.objectStore(STORE).delete('name')
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
    return true
  } catch {
    return false
  }
}

export async function loadNameRecording(): Promise<Blob | null> {
  try {
    const db = await openDb()
    return await new Promise<Blob | null>((resolve) => {
      const req = db.transaction(STORE).objectStore(STORE).get('name')
      req.onsuccess = () => resolve((req.result as Blob) ?? null)
      req.onerror = () => resolve(null)
    })
  } catch {
    return null
  }
}

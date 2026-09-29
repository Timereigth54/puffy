// Everything stays on the device, in localStorage.
import { levelForAge } from '../data/content'
import { ARRIVAL_ORDER } from './learning'
import type { Level, Progress, Settings, TextLevel } from './types'

const PROGRESS_KEY = 'puffy.progress'
const SETTINGS_KEY = 'puffy.settings'
export const PROGRESS_VERSION = 3

export const DEFAULT_SETTINGS: Settings = {
  childAge: null,
  level: 1,
  levelChosenByHand: false,
  voiceOn: true,
  spitSound: 'silly',
  hints: 'always',
  snacks: 'one-by-one',
  smooth: 'auto',
  timeLimitMinutes: null,
}

/** Words on screen follow the level: none for the youngest, formulas for the oldest. */
export function textForLevel(level: Level): TextLevel {
  if (level <= 1) return 'off'
  return level === 2 ? 'names' : 'formulas'
}

export function freshProgress(): Progress {
  return {
    version: PROGRESS_VERSION,
    childName: null,
    onboarded: false,
    discovered: [],
    discoveredAt: {},
    feedCounts: {},
    secondsPlayed: 0,
    sessions: 0,
    unseenStickers: [],
    arrived: [],
    lastArrivalDay: null,
    learning: {},
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
  const stored = read<Progress & { hasNameRecording?: boolean }>(PROGRESS_KEY) ?? {}
  delete stored.hasNameRecording
  // Version 2 and earlier had the starter six from the start. A child who has
  // already played keeps them; new players see snacks arrive one by one.
  if (stored.arrived === undefined && (stored.onboarded || (stored.discovered?.length ?? 0) > 0)) {
    stored.arrived = ARRIVAL_ORDER.slice(0, 6)
  }
  return { ...freshProgress(), ...stored, version: PROGRESS_VERSION }
}

export function saveProgress(p: Progress) {
  write(PROGRESS_KEY, p)
}

export function loadSettings(): Settings {
  const stored = (read<Settings & { ageMode?: number; textLevel?: string }>(SETTINGS_KEY) ?? {}) as Partial<Settings> & {
    ageMode?: number
    textLevel?: string
  }
  // Version 1 had ageMode 0 (Tiny Lab) or 1 (Element Friends) and a separate textLevel.
  if (stored.level === undefined && stored.ageMode !== undefined) stored.level = stored.ageMode === 1 ? 2 : 1
  delete stored.ageMode
  delete stored.textLevel
  const s = { ...DEFAULT_SETTINGS, ...stored }
  if (s.childAge !== null && !s.levelChosenByHand) s.level = levelForAge(s.childAge)
  return s
}

export function saveSettings(s: Settings) {
  write(SETTINGS_KEY, s)
}

/**
 * Earlier builds could store a recording of the child's name in IndexedDB.
 * The feature is gone (DECISIONS.md), so any stored recording is deleted.
 */
export function deleteLegacyNameRecording() {
  try {
    indexedDB.deleteDatabase('puffy')
  } catch {
    /* nothing stored, or IndexedDB unavailable */
  }
}

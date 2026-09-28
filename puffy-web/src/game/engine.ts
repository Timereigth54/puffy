import {
  COMBOS,
  COMBO_MAP,
  CHEERS,
  ELEMENT_MAP,
  ENCOURAGEMENT_LINES,
  FALLBACK_NOUNS,
  LONER_LINES,
  NOBLE_GAS_IDS,
  PRAISE_PREFIXES,
  REJECTION_LINES,
  SPICY_LINES,
  SPICY_MAP,
  TAG_NOUNS,
  THINKING_LINES,
  USE_LINES,
  normalizeKey,
} from '../data/content'
import type { Combo, Element, Outcome } from './types'

/** One spoken beat: a line of text, or the child's name (recorded clip or spoken text). */
export type Beat = string | { name: true }
export type Script = Beat[]

// ─── Resolution ─────────────────────────────────────────────────────────────
export function resolve(inputs: readonly string[], discovered: readonly string[]): Outcome {
  const key = normalizeKey(inputs)
  const combo = COMBO_MAP[key]
  if (combo) return { kind: 'discovery', combo, firstTime: !discovered.includes(combo.id) }

  const spicy = SPICY_MAP[key]
  if (spicy) return { kind: 'spicy', spicy }

  const nobleId = inputs.find((id) => NOBLE_GAS_IDS.includes(id))
  if (nobleId) {
    const otherId = inputs.find((id) => id !== nobleId) ?? nobleId
    return { kind: 'loner', noble: ELEMENT_MAP[nobleId], other: ELEMENT_MAP[otherId] }
  }

  if (inputs.length === 2 && inputs[0] === inputs[1]) {
    return { kind: 'same', element: ELEMENT_MAP[inputs[0]] }
  }

  return { kind: 'unknown', inputs: [...inputs] }
}

// ─── Variant banks ──────────────────────────────────────────────────────────
/**
 * Shuffled bag per key. Never returns the same item twice in a row for a key,
 * including across the boundary when the bag is refilled.
 */
export class NoRepeatBank {
  private bags = new Map<string, string[]>()
  private last = new Map<string, string>()
  private rand: () => number

  constructor(rand: () => number = Math.random) {
    this.rand = rand
  }

  pick(key: string, items: readonly string[]): string {
    if (items.length === 0) throw new Error(`empty bank: ${key}`)
    if (items.length === 1) return items[0]
    let bag = this.bags.get(key)
    if (!bag || bag.length === 0) {
      bag = shuffle([...items], this.rand)
      const prev = this.last.get(key)
      // bag pops from the end; keep the previous pick away from the end
      if (prev !== undefined && bag[bag.length - 1] === prev) {
        ;[bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]]
      }
      this.bags.set(key, bag)
    }
    const choice = bag.pop()!
    this.last.set(key, choice)
    return choice
  }
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const bank = new NoRepeatBank()

export function nounsFor(a: Element, b: Element): string[] {
  const out: string[] = []
  for (const tn of TAG_NOUNS) {
    const [t1, t2] = tn.tags
    if ((a.tags.includes(t1) && b.tags.includes(t2)) || (a.tags.includes(t2) && b.tags.includes(t1))) {
      out.push(...tn.nouns)
    }
  }
  return out
}

// ─── Scripts ────────────────────────────────────────────────────────────────
export function discoveryScript(combo: Combo, firstTime: boolean, useName: boolean): Script {
  const name = combo.result.displayName.toLowerCase()
  if (!firstTime) return [`${combo.result.displayName}! ${bank.pick('cheer', CHEERS)}`]
  const prefix = bank.pick('praise', PRAISE_PREFIXES)
  const line = prefix.endsWith('!') ? `${prefix} ${capitalize(name)}!` : `${prefix} ${name}!`
  return [useName ? { name: true } : 'Wow!', line]
}

export interface SillySequence {
  thinking: string
  /** "maybe a bubble that never pops?" */
  idea: string
  use: string
  rejection: string
  reason: string
  encouragement: string
}

export function lonerSequence(noble: Element, other: Element): SillySequence {
  const nouns = nounsFor(noble, other)
  const noun = bank.pick(`noun:${normalizeKey([noble.id, other.id])}`, nouns.length ? nouns : FALLBACK_NOUNS)
  return {
    thinking: bank.pick('thinking', THINKING_LINES),
    idea: `Maybe ${noun}?`,
    use: bank.pick('use', USE_LINES),
    rejection: bank.pick('rejection', REJECTION_LINES),
    reason: bank.pick('loner', LONER_LINES).replace('{name}', noble.name),
    encouragement: bank.pick('encourage', ENCOURAGEMENT_LINES),
  }
}

export function spicyLine(): string {
  return bank.pick('spicy', SPICY_LINES)
}

export function sameLine(el: Element): string {
  return `Two ${el.name.toLowerCase()}s? That’s still ${el.name.toLowerCase()}!`
}

export function hintLine(combo: Combo): string {
  const [a, b] = combo.inputs.map((id) => ELEMENT_MAP[id].name.toLowerCase())
  return a === b ? `What if you tried two ${a}s?` : `What if you tried ${a} with ${b}?`
}

// ─── Adaptive helpers ───────────────────────────────────────────────────────
/** An undiscovered combo that uses at least one of the tried elements, and only elements on the tray. */
export function hintFor(tried: readonly string[], discovered: readonly string[], tray: readonly string[]): Combo | null {
  const pool = undiscovered(discovered, tray)
  const related = pool.filter((c) => c.inputs.some((i) => tried.includes(i)))
  const list = related.length ? related : pool
  return list.length ? list[Math.floor(Math.random() * list.length)] : null
}

/** Easy-win guarantee: a likely combo from what is on the tray. */
export function easyWin(discovered: readonly string[], tray: readonly string[]): Combo | null {
  const pool = undiscovered(discovered, tray)
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null
}

function undiscovered(discovered: readonly string[], tray: readonly string[]): Combo[] {
  return COMBOS.filter((c) => !discovered.includes(c.id) && c.inputs.every((i) => tray.includes(i)))
}

/**
 * When a child struggles, shrink the tray to `cap` snacks while keeping as many
 * undiscovered combos reachable as possible. Returns element ids in tray order.
 */
export function focusedTray(all: readonly string[], discovered: readonly string[], cap: number): string[] {
  if (all.length <= cap) return [...all]
  const score = new Map(all.map((id) => [id, 0]))
  for (const c of COMBOS) {
    if (discovered.includes(c.id) || !c.inputs.every((i) => all.includes(i))) continue
    for (const id of new Set(c.inputs)) score.set(id, (score.get(id) ?? 0) + 1)
  }
  const keep = [...all].sort((a, b) => (score.get(b) ?? 0) - (score.get(a) ?? 0)).slice(0, cap)
  return all.filter((id) => keep.includes(id))
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

import {
  COMBOS,
  COMBO_MAP,
  ELEMENT_MAP,
  FALLBACK_IDEA,
  NOBLE_GAS_IDS,
  NOBLE_METAL_PAIRS,
  SPICY_MAP,
  TAG_NOUNS,
  VOICE,
  normalizeKey,
  type IdeaArtId,
  type TagNoun,
} from '../data/content'
import type { Combo, Element, Level, Outcome, SpicyPair } from './types'
import { discoveryLines, ideaLine, repeatLine, spicyBuiltLines } from './lines'

export { hintLine, nobleMetalLine, sameLine } from './lines'

/** One spoken beat. The narrator never says the child's name (DECISIONS.md). */
export type Beat = string
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

  const metalId = inputs.find((id) => NOBLE_METAL_PAIRS[id])
  if (metalId) {
    const otherId = inputs.find((id) => id !== metalId)!
    if (NOBLE_METAL_PAIRS[metalId].includes(otherId)) {
      return { kind: 'noble-metal', metal: ELEMENT_MAP[metalId], other: ELEMENT_MAP[otherId] }
    }
  }

  return { kind: 'unknown', inputs: [...inputs].sort() }
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

export function ideasFor(a: Element, b: Element): TagNoun[] {
  return TAG_NOUNS.filter((tn) => {
    const [t1, t2] = tn.tags
    return (a.tags.includes(t1) && b.tags.includes(t2)) || (a.tags.includes(t2) && b.tags.includes(t1))
  })
}

// ─── Scripts ────────────────────────────────────────────────────────────────
export function discoveryScript(combo: Combo, firstTime: boolean, level: Level): Script {
  const v = VOICE[level]
  if (!firstTime) return [repeatLine(combo, level, bank.pick(`cheer${level}`, v.cheers))]
  return discoveryLines(combo, level, bank.pick(`praise${level}`, v.praise))
}

export interface SillySequence {
  thinking: string
  /** "Flying house!" (level 1), "House!" (level 0), "Maybe a flying house?" (2–3) */
  idea: string
  art: IdeaArtId
  /** Puffy giggles at its own idea: "Hee hee!" */
  silly: string
  rejection: string
  /** Why helium said no. Empty at level 0. */
  reason: string
  encouragement: string
}

export function lonerSequence(noble: Element, other: Element, level: Level): SillySequence {
  const v = VOICE[level]
  const ideas = ideasFor(noble, other)
  const pool = ideas.length ? ideas : [FALLBACK_IDEA]
  const noun = bank.pick(`noun:${normalizeKey([noble.id, other.id])}`, pool.map((i) => i.noun))
  const idea = pool.find((i) => i.noun === noun)!
  return {
    thinking: bank.pick(`thinking${level}`, v.thinking),
    idea: ideaLine(idea, level),
    art: idea.art,
    silly: bank.pick(`silly${level}`, v.silly),
    rejection: bank.pick(`rejection${level}`, v.rejection),
    reason: v.loner.length ? bank.pick(`loner${level}`, v.loner).replace('{name}', noble.name) : '',
    encouragement: bank.pick(`encourage${level}`, v.encourage),
  }
}

export function spicyScript(spicy: SpicyPair, level: Level): Script {
  const built = spicyBuiltLines(spicy, level)
  return built.length ? built : [bank.pick(`spicy${level}`, VOICE[level].spicy)]
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

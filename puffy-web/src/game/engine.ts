import {
  COMBO_MAP,
  ELEMENT_MAP,
  TAG_NOUNS,
  USE_TEMPLATES,
  USES,
  THINKING_LINES,
  REJECTION_LINES,
  ENCOURAGEMENT_LINES,
  NOBLE_GAS_IDS,
  NOBLE_METAL_IDS,
  NOBLE_GAS_LINES,
  NOBLE_METAL_LINES,
  normalizeKey,
} from '../data/content'
import type { Combo } from './types'

export type ResolveResult =
  | { type: 'success'; combo: Combo; isFirstTime: boolean }
  | { type: 'noble-gas'; elementName: string }
  | { type: 'noble-metal'; elementName: string }
  | { type: 'invalid'; inputs: string[] }

export function resolve(inputs: string[], discovered: string[]): ResolveResult {
  const key = normalizeKey(inputs)
  const combo = COMBO_MAP[key]
  if (combo) {
    return { type: 'success', combo, isFirstTime: !discovered.includes(combo.id) }
  }
  const nobleGas = inputs.find((id) => NOBLE_GAS_IDS.includes(id))
  if (nobleGas) {
    return { type: 'noble-gas', elementName: ELEMENT_MAP[nobleGas].name }
  }
  const nobleMetal = inputs.find((id) => NOBLE_METAL_IDS.includes(id))
  if (nobleMetal) {
    return { type: 'noble-metal', elementName: ELEMENT_MAP[nobleMetal].name }
  }
  return { type: 'invalid', inputs }
}

// ─── Variant banks: shuffle without immediate repeat ───────────────────────
export class VariantBank {
  private pools = new Map<string, string[]>()

  pick(poolKey: string, items: string[], avoid?: string): string {
    let pool = this.pools.get(poolKey)
    if (!pool || pool.length === 0) {
      pool = [...items].sort(() => Math.random() - 0.5)
      // Make sure the first pick isn't a repeat of the last one
      if (avoid && pool.length > 1 && pool[pool.length - 1] === avoid) {
        const first = pool[0]
        pool[0] = pool[pool.length - 1]
        pool[pool.length - 1] = first
      }
      this.pools.set(poolKey, pool)
    }
    const choice = pool.pop()!
    return choice
  }

  pickNoun(tagsA: string[], tagsB: string[], avoid?: string): string {
    // find a tag-noun entry where either ordering of the two tags matches
    const entries: string[] = []
    for (const tn of TAG_NOUNS) {
      const [t1, t2] = tn.tags
      if (
        (tagsA.includes(t1) && tagsB.includes(t2)) ||
        (tagsA.includes(t2) && tagsB.includes(t1))
      ) {
        entries.push(...tn.nouns)
      }
    }
    const pool = entries.length > 0 ? entries : ['a very silly something']
    const bankKey = 'noun-' + [...tagsA, ...tagsB].sort().join('|')
    return this.pick(bankKey, pool, avoid)
  }
}

export const bank = new VariantBank()

export interface InvalidLine {
  thinking: string
  idea: string // "maybe a floating gold balloon?"
  use: string // "It could be used for a gold parade!"
  rejection: string
  encouragement: string
}

export function generateInvalidLine(inputs: string[]): InvalidLine {
  const a = ELEMENT_MAP[inputs[0]]
  const b = ELEMENT_MAP[inputs[1]]
  const thinking = bank.pick('thinking', THINKING_LINES)
  const noun = bank.pickNoun(a.tags, b.tags)
  const useTemplate = bank.pick('useTemplate', USE_TEMPLATES)
  const use = bank.pick('use', USES)
  const useFilled = useTemplate
    .replace('{use}', use)
    .replace('{place}', use)
  return {
    thinking,
    idea: `maybe ${noun}?`,
    use: useFilled,
    rejection: bank.pick('rejection', REJECTION_LINES),
    encouragement: bank.pick('encouragement', ENCOURAGEMENT_LINES),
  }
}

export function generateNobleLine(kind: 'gas' | 'metal', elementName: string) {
  const templates = kind === 'gas' ? NOBLE_GAS_LINES : NOBLE_METAL_LINES
  return {
    thinking: bank.pick('thinking', THINKING_LINES),
    idea: templates[Math.floor(Math.random() * templates.length)].replace(
      '{name}',
      elementName,
    ),
    use: '',
    rejection: bank.pick('rejection', REJECTION_LINES),
    encouragement: bank.pick('encouragement', ENCOURAGEMENT_LINES),
  }
}

// Adaptive difficulty: gentle hint after 3 failed tries on the same pair
export function hintFor(inputs: string[]): string | null {
  const key = normalizeKey(inputs)
  const others = Object.values(COMBO_MAP).filter(
    (c) => c.inputs.some((i) => inputs.includes(i)) && normalizeKey(c.inputs) !== key,
  )
  if (others.length === 0) return null
  const hint = others[Math.floor(Math.random() * others.length)]
  const [a, b] = hint.inputs
  return `What if you tried ${ELEMENT_MAP[a].name} with ${ELEMENT_MAP[b].name}? They love making ${hint.result.displayName}!`
}

// Easy-win guarantee: surface a likely combo if nothing discovered recently
export function easyWin(unlockedElementIds: string[], discovered: string[]): Combo | null {
  const candidates = Object.values(COMBO_MAP).filter(
    (c) =>
      !discovered.includes(c.id) &&
      c.inputs.every((i) => unlockedElementIds.includes(i)),
  )
  if (candidates.length === 0) return null
  return candidates[Math.floor(Math.random() * candidates.length)]
}

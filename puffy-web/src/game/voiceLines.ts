// Every line the narrator can say, at every level, for pre-rendering voice
// clips. voiceLines.test.ts checks that runtime scripts only use lines listed here.
import { COMBOS, ELEMENTS, FALLBACK_IDEA, NOBLE_GAS_IDS, SPICY, TAG_NOUNS, VOICE } from '../data/content'
import { discoveryLines, hintLine, ideaLine, rememberLine, repeatLine, sameLine, spicyBuiltLines } from './lines'
import type { Level } from './types'

export const LEVEL_IDS: Level[] = [0, 1, 2, 3]

export function allLines(): string[] {
  const lines = new Set<string>()
  const add = (xs: readonly (string | null)[]) => xs.forEach((x) => x && lines.add(x))
  for (const level of LEVEL_IDS) {
    const v = VOICE[level]
    add([v.intro, v.feedPuffy, v.firstGrab, v.bookFound, v.bookEmpty, v.sleep, v.unknown])
    add(v.grab)
    add(v.idle)
    add(v.thinking)
    add(v.silly)
    add(v.rejection)
    add(v.encourage)
    add(v.spicy)
    for (const s of SPICY) add(spicyBuiltLines(s, level))
    for (const c of COMBOS) {
      for (const p of v.praise) add(discoveryLines(c, level, p))
      for (const ch of v.cheers) add([repeatLine(c, level, ch)])
      add([rememberLine(c, level), hintLine(c, level)])
    }
    for (const idea of [...TAG_NOUNS, FALLBACK_IDEA]) add([ideaLine(idea, level)])
    for (const el of ELEMENTS) {
      add([sameLine(el, level)])
      if (NOBLE_GAS_IDS.includes(el.id)) add(v.loner.map((l) => l.replace('{name}', el.name)))
    }
  }
  return [...lines]
}

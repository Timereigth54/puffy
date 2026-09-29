// Every line the narrator can say, at every level, for pre-rendering voice
// clips. voiceLines.test.ts checks that runtime scripts only use lines listed here.
import { ELEMENT_MAP, FALLBACK_IDEA, NOBLE_GAS_IDS, NOBLE_METAL_PAIRS, SPICY, TAG_NOUNS, VOICE, combosFor, elementsFor, packFor } from '../data/content'
import { arrivalLine, askLine, discoveryLines, hintLine, ideaLine, nobleMetalLine, otherLine, rememberLine, repeatLine, rightLine, sameLine, showLine, spicyBuiltLines, touchLine } from './lines'
import { skillsFor } from './learning'
import type { Level } from './types'

export const LEVEL_IDS: Level[] = [0, 1, 2, 3]

export function allLines(): string[] {
  const lines = new Set<string>()
  const add = (xs: readonly (string | null)[]) => xs.forEach((x) => x && lines.add(x))
  for (const level of LEVEL_IDS) {
    const v = VOICE[level]
    add([v.intro, v.feedPuffy, v.bookFound, v.bookEmpty, v.sleep, v.unknown])
    add(v.idle)
    add(v.thinking)
    add(v.silly)
    add(v.rejection)
    add(v.encourage)
    add(v.spicy)
    // Only what this level can meet: toddlers never meet pack 2, so it gets no toddler clips.
    const pack = packFor(level)
    for (const s of SPICY) if (s.inputs.every((i) => ELEMENT_MAP[i].pack <= pack)) add(spicyBuiltLines(s, level))
    for (const c of combosFor(level)) {
      for (const p of v.praise) add(discoveryLines(c, level, p))
      for (const ch of v.cheers) add([repeatLine(c, level, ch)])
      add([rememberLine(c, level), hintLine(c, level)])
    }
    for (const idea of [...TAG_NOUNS, FALLBACK_IDEA]) add([ideaLine(idea, level)])
    for (const el of elementsFor(level)) {
      add([sameLine(el, level)])
      if (NOBLE_METAL_PAIRS[el.id]) add([nobleMetalLine(el, level)])
      if (NOBLE_GAS_IDS.includes(el.id)) add(v.loner.map((l) => l.replace('{name}', el.name)))
      // Learning ladder: only the lines this level can reach.
      const skills = skillsFor(el, level)
      const letters = level >= 2 ? [true] : skills.includes('letter') ? [false, true] : [false]
      const numbers = level >= 3 ? [true] : skills.includes('number') ? [false, true] : [false]
      for (const letter of letters) for (const number of numbers) add([touchLine(el, level, { letter, number })])
      for (const skill of skills) add([askLine(el, skill, level), rightLine(el, skill, level), showLine(el, skill, level)])
      add([otherLine(el, level), arrivalLine(el, level)])
    }
  }
  return [...lines]
}

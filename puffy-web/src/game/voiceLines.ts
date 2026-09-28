// Every line the narrator can say, for pre-rendering voice clips.
// voiceLines.test.ts checks that runtime scripts only use lines listed here.
import {
  CHEERS,
  COMBOS,
  ELEMENTS,
  ENCOURAGEMENT_LINES,
  FALLBACK_NOUNS,
  GRAB_LINES,
  IDLE_LINES,
  LONER_LINES,
  NOBLE_GAS_IDS,
  PRAISE_PREFIXES,
  REJECTION_LINES,
  SPICY_LINES,
  TAG_NOUNS,
  THINKING_LINES,
  UNKNOWN_LINE,
  SILLY_LINES,
} from '../data/content'
import { discoveryLine, hintLine, ideaLine, rememberLine, repeatLine, sameLine } from './lines'

export const FIXED_LINES = [
  'Hi! Puffy is hungry!',
  'Feed Puffy!',
  'Ooh! Snack!',
  'Look! Your stickers!',
  'Go find snacks!',
  'Puffy is sleepy. Night night!',
]

export function allLines(): string[] {
  const lines = new Set<string>(FIXED_LINES)
  const add = (xs: readonly string[]) => xs.forEach((x) => lines.add(x))
  add(GRAB_LINES)
  add(IDLE_LINES)
  add(THINKING_LINES)
  add(SILLY_LINES)
  add(REJECTION_LINES)
  add(ENCOURAGEMENT_LINES)
  add(SPICY_LINES)
  lines.add(UNKNOWN_LINE)
  for (const c of COMBOS) {
    for (const p of PRAISE_PREFIXES) lines.add(discoveryLine(c, p))
    for (const ch of CHEERS) lines.add(repeatLine(c, ch))
    lines.add(rememberLine(c))
    lines.add(hintLine(c))
    lines.add(c.facts.toddler)
  }
  for (const tn of TAG_NOUNS) tn.nouns.forEach((n) => lines.add(ideaLine(n)))
  FALLBACK_NOUNS.forEach((n) => lines.add(ideaLine(n)))
  for (const el of ELEMENTS) {
    lines.add(sameLine(el))
    if (NOBLE_GAS_IDS.includes(el.id)) LONER_LINES.forEach((l) => lines.add(l.replace('{name}', el.name)))
  }
  return [...lines]
}

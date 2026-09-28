// Sentence builders shared by the game (engine.ts) and the voice inventory
// (voiceLines.ts), so every line the narrator can say has a recorded clip.
// Each builder takes the level: 0 single words ... 3 explanations.
import { ELEMENT_MAP, type TagNoun } from '../data/content'
import type { Combo, Element, Level, SpicyPair } from './types'

/** Normalizes line text to the manifest key. Used by audio.ts at runtime and by tools/render-voice.mjs. */
export function lineKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .trim()
}

const lower = (s: string) => s.toLowerCase()
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** "Hydrogen and oxygen" / "Two carbons" */
function pairPhrase(combo: Combo): string {
  const [a, b] = combo.inputs.map((id) => lower(ELEMENT_MAP[id].name))
  return a === b ? `Two ${a}s` : `${cap(a)} and ${b}`
}

/** A first discovery, one line per beat. */
export function discoveryLines(combo: Combo, level: Level, praise: string): string[] {
  const r = combo.result
  switch (level) {
    case 0:
      return [praise, `${r.word}!`]
    case 1:
      return [`${praise} ${r.spoken}!`]
    case 2:
      return [`${praise} ${lower(r.displayName)}!`, combo.facts.kid]
    case 3:
      return [`${pairPhrase(combo)} made ${lower(r.displayName)}!`, `That’s ${r.formulaSpoken}.`, combo.facts.junior]
  }
}

export function repeatLine(combo: Combo, level: Level, cheer: string): string {
  const r = combo.result
  switch (level) {
    case 0:
      return `${r.word}! ${cheer}`
    case 1:
      return `${r.spoken}! ${cheer}`
    case 2:
      return `${r.displayName} again! ${cheer}`
    case 3:
      return `${r.displayName} again, ${r.formulaSpoken}. ${cheer}`
  }
}

export function rememberLine(combo: Combo, level: Level): string {
  const r = combo.result
  switch (level) {
    case 0:
      return `${r.word}!`
    case 1:
      return `${r.spoken}! Remember?`
    case 2:
      return `Remember? You made ${lower(r.displayName)}!`
    case 3:
      return `${r.displayName}. That’s ${r.formulaSpoken}.`
  }
}

export function ideaLine(idea: TagNoun, level: Level): string {
  switch (level) {
    case 0:
      return `${idea.word}!`
    case 1:
      return `${idea.noun}!`
    default:
      return `Maybe ${idea.phrase}?`
  }
}

export function sameLine(el: Element, level: Level): string {
  const n = lower(el.name)
  switch (level) {
    case 0:
      return 'Same!'
    case 1:
      return `Still ${n}!`
    case 2:
      return `Two ${n}s are still just ${n}!`
    case 3:
      return `${el.name} and ${n} is still just ${n}. Same element, nothing new!`
  }
}

/** Level 0 gets no spoken hint: the snacks just glow. */
export function hintLine(combo: Combo, level: Level): string | null {
  const [a, b] = combo.inputs.map((id) => lower(ELEMENT_MAP[id].name))
  const same = a === b
  switch (level) {
    case 0:
      return null
    case 1:
      return same ? `Try two ${a}s!` : `Try ${a} and ${b}!`
    case 2:
      return same ? `Try two ${a}s together!` : `Try ${a} with ${b}!`
    case 3:
      return same ? `Try two ${a}s. What could they make?` : `Try ${a} with ${b}. What could they make?`
  }
}

/** Levels 2–3 name the real substance; levels 0–1 use the fixed spicy bank. */
export function spicyBuiltLines(spicy: SpicyPair, level: Level): string[] {
  if (level === 2) return [`Whoa, too spicy! ${spicy.name} is real, but it’s only for grown-ups.`]
  if (level === 3) return [`That would make ${lower(spicy.name)}. It’s real, but ${lower(spicy.why.charAt(0)) + spicy.why.slice(1)}`, 'Too dangerous for Puffy!']
  return []
}

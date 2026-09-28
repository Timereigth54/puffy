// Sentence builders shared by the game (engine.ts) and the voice inventory
// (voiceLines.ts), so every line the narrator can say has a recorded clip.
import { ELEMENT_MAP } from '../data/content'
import type { Combo, Element } from './types'

/** Normalizes line text to the manifest key. Used by audio.ts at runtime and by tools/render-voice.mjs. */
export function lineKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .trim()
}

export function discoveryLine(combo: Combo, prefix: string): string {
  return `${prefix} ${combo.result.spoken}!`
}

export function repeatLine(combo: Combo, cheer: string): string {
  return `${combo.result.spoken}! ${cheer}`
}

export function rememberLine(combo: Combo): string {
  return `${combo.result.spoken}! Remember?`
}

export function ideaLine(noun: string): string {
  return `Maybe ${noun}?`
}

export function sameLine(el: Element): string {
  return `Still ${el.name.toLowerCase()}!`
}

export function hintLine(combo: Combo): string {
  const [a, b] = combo.inputs.map((id) => ELEMENT_MAP[id].name.toLowerCase())
  return a === b ? `Try two ${a}s!` : `Try ${a} and ${b}!`
}

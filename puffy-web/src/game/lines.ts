// Sentence builders shared by the game (engine.ts) and the voice inventory
// (voiceLines.ts), so every line the narrator can say has a recorded clip.
// Each builder takes the level: 0 single words ... 3 explanations.
import { ELEMENT_MAP, type TagNoun } from '../data/content'
import type { Combo, Element, Level, Skill, SpicyPair } from './types'

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

/** Gold with something it will not react with. Levels 2–3 only: younger levels never meet gold. */
export function nobleMetalLine(metal: Element, level: Level): string {
  return level === 3
    ? `${metal.name} is a noble metal. It almost never reacts, so it stays shiny.`
    : `${metal.name} almost never mixes, so it stays shiny!`
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

// ─── Learning ladder (game/learning.ts) ─────────────────────────────────────
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

/** 8 -> "eight", 79 -> "seventy-nine". Up to 99, which covers every element a child meets here. */
export function numberWord(n: number): string {
  if (n < 20) return ONES[n]
  const t = TENS[Math.floor(n / 10)]
  return n % 10 ? `${t}-${ONES[n % 10]}` : t
}

/**
 * Said whenever a child touches a snack: it names what the snack shows.
 * "Oxygen!", then "O! Oxygen!" once letters are on the foam, then
 * "Oxygen! Number eight!" once numbers are.
 */
export function touchLine(el: Element, level: Level, shows: { letter: boolean; number: boolean }): string {
  if (level > 0 && shows.number) return `${el.name}! Number ${numberWord(el.atomicNumber)}!`
  if (level > 0 && shows.letter) return `${el.symbolSpoken}! ${el.name}!`
  return `${el.name}!`
}

/** Puffy asks for one snack. */
export function askLine(el: Element, skill: Skill, level: Level): string {
  const n = lower(el.name)
  const s = el.symbolSpoken
  const two = s.includes(' ')
  const w = numberWord(el.atomicNumber)
  switch (skill) {
    case 'name':
      return level === 0 ? `${el.name}, please!` : level === 1 ? `Puffy wants ${n}!` : `Puffy wants ${n}! Can you find it?`
    case 'letter':
      return level === 1 ? `Puffy wants ${s}!` : level === 2 ? `Puffy wants the letter${two ? 's' : ''} ${s}!` : `Puffy wants the element with the symbol ${s}!`
    case 'number':
      return level === 3 ? `Puffy wants element number ${w}!` : `Puffy wants number ${w}!`
  }
}

/** The child fed the snack Puffy asked for. */
export function rightLine(el: Element, skill: Skill, level: Level): string {
  const n = lower(el.name)
  const s = el.symbolSpoken
  const w = numberWord(el.atomicNumber)
  switch (skill) {
    case 'name':
      return level <= 1 ? `Yes! ${el.name}!` : `Yes! That’s ${n}!`
    case 'letter':
      return level === 1 ? `Yes! ${s}! ${el.name}!` : level === 2 ? `Yes! ${s} is for ${n}!` : `Yes! ${s} is the symbol for ${n}.`
    case 'number':
      return level === 1 ? `Yes! Number ${w}! ${el.name}!` : level === 2 ? `Yes! ${el.name} is number ${w}!` : `Yes! ${el.name} is element number ${w}.`
  }
}

/** First beat after feeding a different snack: name what was eaten. Puffy still enjoys it. */
export function otherLine(fed: Element, level: Level): string {
  if (level === 0) return `${fed.name}!`
  if (level === 1) return `${fed.name}! Yum!`
  return `Yum! That was ${lower(fed.name)}.`
}

/** Second beat: show the one Puffy wanted, while it glows. */
export function showLine(want: Element, skill: Skill, level: Level): string {
  const n = lower(want.name)
  const s = want.symbolSpoken
  const w = numberWord(want.atomicNumber)
  switch (skill) {
    case 'name':
      return level === 0 ? `${want.name} here!` : level === 1 ? `${want.name} is here!` : `${want.name} is this one!`
    case 'letter':
      return level === 1 ? `${s} is ${n}!` : level === 2 ? `${s} is for ${n}, this one!` : `${s} is the symbol for ${n}, this one.`
    case 'number':
      return level === 3 ? `${want.name} is element number ${w}, this one.` : `Number ${w} is ${n}, this one!`
  }
}

/** A new snack drops into the tub. */
export function arrivalLine(el: Element, level: Level): string {
  const n = lower(el.name)
  switch (level) {
    case 0:
      return `Hi, ${n}!`
    case 1:
      return `New friend! ${el.name}!`
    case 2:
      return `A new friend! Say hi to ${n}!`
    case 3:
      return `A new element: ${n}, number ${numberWord(el.atomicNumber)}!`
  }
}

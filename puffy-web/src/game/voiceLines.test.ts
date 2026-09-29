import { describe, expect, it } from 'vitest'
import { ELEMENT_MAP, SPICY, VOICE, combosFor, elementsFor, packFor } from '../data/content'
import { discoveryScript, hintLine, lonerSequence, nobleMetalLine, sameLine, spicyScript } from './engine'
import { arrivalLine, askLine, lineKey, otherLine, rightLine, showLine, touchLine } from './lines'
import { skillsFor, snackShows } from './learning'
import type { ElementLearning, Skill } from './types'
import { LEVEL_IDS, allLines } from './voiceLines'

const known = new Set(allLines().map(lineKey))
const covered = (s: string) => expect(known.has(lineKey(s)), s).toBe(true)
const words = (s: string) => s.split(/\s+/).filter(Boolean).length

describe('voice inventory', () => {
  it('covers every discovery line the engine can produce, at every level', () => {
    for (const level of LEVEL_IDS)
      for (let n = 0; n < 20; n++)
        for (const c of combosFor(level)) {
          discoveryScript(c, true, level).forEach(covered)
          discoveryScript(c, false, level).forEach(covered)
        }
  })
  it('covers every silly-idea sequence line, at every level', () => {
    for (const level of LEVEL_IDS)
      for (let n = 0; n < 30; n++)
        for (const other of elementsFor(level).map((e) => e.id).filter((id) => id !== 'He'))
          for (const [field, text] of Object.entries(lonerSequence(ELEMENT_MAP.He, ELEMENT_MAP[other], level)))
            if (field !== 'art' && text) covered(text) // art is a drawing key, not speech
  })
  it('covers spicy, same and hint lines, at every level', () => {
    for (const level of LEVEL_IDS) {
      const spicy = SPICY.filter((s) => s.inputs.every((i) => ELEMENT_MAP[i].pack <= packFor(level)))
      for (let n = 0; n < 10; n++) for (const s of spicy) spicyScript(s, level).forEach(covered)
      for (const el of elementsFor(level)) covered(sameLine(el, level))
      if (level >= 2) covered(nobleMetalLine(ELEMENT_MAP.Au, level))
      combosFor(level).forEach((c) => {
        const h = hintLine(c, level)
        if (h) covered(h)
      })
    }
  })
  it('covers every learning-ladder line a level can reach', () => {
    const known = { stage: 'known' as const, teachHits: 3, recent: [] }
    for (const level of LEVEL_IDS)
      for (const el of elementsFor(level)) {
        const skills = skillsFor(el, level)
        // every point on the ladder: nothing known, then each skill known in turn
        for (let k = 0; k <= skills.length; k++) {
          const learning: ElementLearning = Object.fromEntries(skills.slice(0, k).map((s) => [s, known]))
          for (const voiceOn of [true, false]) covered(touchLine(el, level, snackShows(learning, el, level, voiceOn)))
        }
        for (const skill of skills) [askLine, rightLine, showLine].forEach((f) => covered(f(el, skill, level)))
        covered(otherLine(el, level))
        covered(arrivalLine(el, level))
      }
  })
  it('has no two lines that collide on the same key', () => {
    const lines = allLines()
    expect(new Set(lines.map(lineKey)).size).toBe(lines.length)
  })
})

describe('levels grow in words', () => {
  it('level 0 never says more than two words in one line', () => {
    const v = VOICE[0]
    const lines = [v.intro, v.feedPuffy, ...v.idle, ...v.silly, ...v.rejection, ...v.encourage, ...v.spicy]
    for (let n = 0; n < 10; n++) for (const c of combosFor(0)) lines.push(...discoveryScript(c, true, 0), ...discoveryScript(c, false, 0))
    for (const el of elementsFor(0)) {
      lines.push(touchLine(el, 0, { letter: false, number: false }), otherLine(el, 0), arrivalLine(el, 0))
      for (const skill of skillsFor(el, 0) as Skill[]) lines.push(askLine(el, skill, 0), rightLine(el, skill, 0), showLine(el, skill, 0))
    }
    for (const l of lines) expect(words(l), l).toBeLessThanOrEqual(2)
  })
  it('each level says more, on average, than the one below', () => {
    const avg = (level: 0 | 1 | 2 | 3) => {
      // the same discoveries at every level, so the averages compare like with like
      const combos = combosFor(0)
      const ls = combos.flatMap((c) => discoveryScript(c, true, level))
      return ls.reduce((n, l) => n + words(l), 0) / combos.length
    }
    expect(avg(1)).toBeGreaterThan(avg(0))
    expect(avg(2)).toBeGreaterThan(avg(1))
    expect(avg(3)).toBeGreaterThan(avg(2))
  })
})

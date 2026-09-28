import { describe, expect, it } from 'vitest'
import { COMBOS, ELEMENT_MAP, SPICY, VOICE } from '../data/content'
import { discoveryScript, hintLine, lonerSequence, sameLine, spicyScript } from './engine'
import { lineKey } from './lines'
import { LEVEL_IDS, allLines } from './voiceLines'

const known = new Set(allLines().map(lineKey))
const covered = (s: string) => expect(known.has(lineKey(s)), s).toBe(true)
const words = (s: string) => s.split(/\s+/).filter(Boolean).length

describe('voice inventory', () => {
  it('covers every discovery line the engine can produce, at every level', () => {
    for (const level of LEVEL_IDS)
      for (let n = 0; n < 20; n++)
        for (const c of COMBOS) {
          discoveryScript(c, true, level).forEach(covered)
          discoveryScript(c, false, level).forEach(covered)
        }
  })
  it('covers every silly-idea sequence line, at every level', () => {
    for (const level of LEVEL_IDS)
      for (let n = 0; n < 30; n++)
        for (const other of ['H', 'O', 'C', 'Na', 'Cl'])
          for (const [field, text] of Object.entries(lonerSequence(ELEMENT_MAP.He, ELEMENT_MAP[other], level)))
            if (field !== 'art' && text) covered(text) // art is a drawing key, not speech
  })
  it('covers spicy, same and hint lines, at every level', () => {
    for (const level of LEVEL_IDS) {
      for (let n = 0; n < 10; n++) for (const s of SPICY) spicyScript(s, level).forEach(covered)
      covered(sameLine(ELEMENT_MAP.Na, level))
      COMBOS.forEach((c) => {
        const h = hintLine(c, level)
        if (h) covered(h)
      })
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
    const lines = [v.intro, v.feedPuffy, v.firstGrab, ...v.grab, ...v.idle, ...v.silly, ...v.rejection, ...v.encourage, ...v.spicy]
    for (let n = 0; n < 10; n++) for (const c of COMBOS) lines.push(...discoveryScript(c, true, 0), ...discoveryScript(c, false, 0))
    for (const l of lines) expect(words(l), l).toBeLessThanOrEqual(2)
  })
  it('each level says more, on average, than the one below', () => {
    const avg = (level: 0 | 1 | 2 | 3) => {
      const ls = COMBOS.flatMap((c) => discoveryScript(c, true, level))
      return ls.reduce((n, l) => n + words(l), 0) / COMBOS.length
    }
    expect(avg(1)).toBeGreaterThan(avg(0))
    expect(avg(2)).toBeGreaterThan(avg(1))
    expect(avg(3)).toBeGreaterThan(avg(2))
  })
})

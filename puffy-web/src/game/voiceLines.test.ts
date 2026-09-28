import { describe, expect, it } from 'vitest'
import { COMBOS, ELEMENT_MAP } from '../data/content'
import { discoveryScript, hintLine, lonerSequence, sameLine, spicyLine } from './engine'
import { lineKey } from './lines'
import { allLines } from './voiceLines'

const known = new Set(allLines().map(lineKey))
const covered = (s: string) => expect(known.has(lineKey(s)), s).toBe(true)

describe('voice inventory', () => {
  it('covers every discovery line the engine can produce', () => {
    for (let n = 0; n < 40; n++)
      for (const c of COMBOS) {
        for (const b of discoveryScript(c, true, false)) if (typeof b === 'string') covered(b)
        for (const b of discoveryScript(c, false, false)) if (typeof b === 'string') covered(b)
      }
  })
  it('covers every silly-idea sequence line', () => {
    for (let n = 0; n < 60; n++)
      for (const other of ['H', 'O', 'C', 'Na', 'Cl'])
        for (const [field, text] of Object.entries(lonerSequence(ELEMENT_MAP.He, ELEMENT_MAP[other])))
          if (field !== 'art') covered(text) // art is a drawing key, not speech
  })
  it('covers spicy, same and hint lines', () => {
    for (let n = 0; n < 20; n++) covered(spicyLine())
    covered(sameLine(ELEMENT_MAP.Na))
    COMBOS.forEach((c) => covered(hintLine(c)))
  })
  it('has no two lines that collide on the same key', () => {
    const lines = allLines()
    expect(new Set(lines.map(lineKey)).size).toBe(lines.length)
  })
})

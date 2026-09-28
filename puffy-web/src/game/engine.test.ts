import { describe, expect, it } from 'vitest'
import { COMBOS, ELEMENTS, ELEMENT_MAP, SPICY, normalizeKey } from '../data/content'
import { NoRepeatBank, focusedTray, hintFor, ideasFor, lonerSequence, resolve, discoveryScript } from './engine'

const ids = ELEMENTS.map((e) => e.id)
const allPairs: [string, string][] = []
for (let i = 0; i < ids.length; i++) for (let j = i; j < ids.length; j++) allPairs.push([ids[i], ids[j]])

describe('starter pack coverage', () => {
  it('has 21 unordered pairs', () => {
    expect(allPairs).toHaveLength(21)
  })

  it('classifies every pair, and none falls through to "unknown"', () => {
    for (const p of allPairs) expect(resolve(p, []).kind, p.join('+')).not.toBe('unknown')
  })

  it('resolves both orders of a pair to the same outcome', () => {
    for (const [a, b] of allPairs) expect(resolve([a, b], [])).toEqual(resolve([b, a], []))
  })

  it('never lists a pair as both a discovery and spicy', () => {
    const combos = new Set(COMBOS.map((c) => normalizeKey(c.inputs)))
    for (const s of SPICY) expect(combos.has(normalizeKey(s.inputs))).toBe(false)
  })

  it('only sends noble-gas pairs through the silly "nope" sequence', () => {
    for (const p of allPairs) {
      const o = resolve(p, [])
      if (o.kind === 'loner') expect(p).toContain('He')
    }
  })

  it('has two drawn silly ideas for every loner pair', () => {
    for (const p of allPairs) {
      const o = resolve(p, [])
      if (o.kind !== 'loner') continue
      expect(ideasFor(o.noble, o.other).length, p.join('+')).toBe(2)
    }
  })

  it('numbers book plates 1..n without gaps', () => {
    expect(COMBOS.map((c) => c.plate).sort((a, b) => a - b)).toEqual(COMBOS.map((_, i) => i + 1))
  })
})

describe('accuracy rule', () => {
  const words = (s: string) => s.toLowerCase()
  it('never says "new element"', () => {
    for (const c of COMBOS) for (const f of Object.values(c.facts)) expect(words(f)).not.toContain('new element')
  })
  it('never tells the child a real substance is "not real"', () => {
    for (let n = 0; n < 50; n++) {
      const seq = lonerSequence(ELEMENT_MAP.He, ELEMENT_MAP.O)
      expect(Object.values(seq).join(' ').toLowerCase()).not.toContain('not real')
    }
  })
})

describe('outcomes', () => {
  it('marks repeat discoveries', () => {
    expect(resolve(['H', 'O'], ['water'])).toMatchObject({ kind: 'discovery', firstTime: false })
    expect(resolve(['O', 'H'], [])).toMatchObject({ kind: 'discovery', firstTime: true })
  })
  it('treats Cl+Cl as spicy (real chlorine gas), not as a failure', () => {
    expect(resolve(['Cl', 'Cl'], []).kind).toBe('spicy')
  })
  it('treats Na+Na as still sodium', () => {
    expect(resolve(['Na', 'Na'], []).kind).toBe('same')
  })
  it('He+He is a discovery (helium gas)', () => {
    expect(resolve(['He', 'He'], [])).toMatchObject({ kind: 'discovery' })
  })
  it('uses the name only when asked', () => {
    const water = COMBOS[0]
    expect(discoveryScript(water, true, true)[0]).toEqual({ name: true })
    expect(discoveryScript(water, true, false)).toHaveLength(1)
    expect(discoveryScript(water, false, true).some((b) => typeof b !== 'string')).toBe(false)
  })
})

describe('NoRepeatBank', () => {
  it('never repeats a line back-to-back, across many refills', () => {
    let seed = 7
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    const b = new NoRepeatBank(rand)
    const items = ['a', 'b', 'c']
    let prev = ''
    for (let i = 0; i < 3000; i++) {
      const x = b.pick('k', items)
      expect(x).not.toBe(prev)
      prev = x
    }
  })
})

describe('adaptive helpers', () => {
  it('hints only at combos whose snacks are on the tray', () => {
    const tray = ['H', 'O', 'C', 'He']
    for (let n = 0; n < 50; n++) {
      const h = hintFor(['He', 'H'], [], tray)
      expect(h).not.toBeNull()
      expect(h!.inputs.every((i) => tray.includes(i))).toBe(true)
    }
  })
  it('focused tray keeps undiscovered combos reachable', () => {
    const tray = focusedTray(ids, ['water'], 4)
    expect(tray).toHaveLength(4)
    const reachable = COMBOS.filter((c) => c.id !== 'water' && c.inputs.every((i) => tray.includes(i)))
    expect(reachable.length).toBeGreaterThanOrEqual(3)
  })
})

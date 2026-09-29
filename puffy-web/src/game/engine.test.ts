import { describe, expect, it } from 'vitest'
import { COMBOS, ELEMENTS, ELEMENT_MAP, NOT_YET, SPICY, normalizeKey } from '../data/content'
import { NoRepeatBank, focusedTray, hintFor, ideasFor, lonerSequence, resolve, discoveryScript } from './engine'

function pairsOf(ids: string[]) {
  const out: [string, string][] = []
  for (let i = 0; i < ids.length; i++) for (let j = i; j < ids.length; j++) out.push([ids[i], ids[j]])
  return out
}
const allPairs = pairsOf(ELEMENTS.map((e) => e.id))
const starterPairs = pairsOf(ELEMENTS.filter((e) => e.pack === 1).map((e) => e.id))
const notYet = new Set(NOT_YET.map((p) => normalizeKey(p)))

describe('every pair has an honest answer', () => {
  it('has 21 starter pairs and 78 pairs with pack 2', () => {
    expect(starterPairs).toHaveLength(21)
    expect(allPairs).toHaveLength(78)
  })

  it('never answers a starter pair with "doesn’t know that one yet"', () => {
    for (const p of starterPairs) expect(resolve(p, []).kind, p.join('+')).not.toBe('unknown')
  })

  it('answers "doesn’t know that one yet" only for pairs listed in NOT_YET, on purpose', () => {
    for (const p of allPairs) {
      const unknown = resolve(p, []).kind === 'unknown'
      expect(unknown, p.join('+')).toBe(notYet.has(normalizeKey(p)))
    }
    expect(notYet.size).toBe(NOT_YET.length)
  })

  it('counts pack 2 outcomes as planned: 11 discoveries, 11 spicy, 5 shiny gold, 6 helium, 5 same, 19 not yet', () => {
    const packTwo = allPairs.filter((p) => p.some((id) => ELEMENT_MAP[id].pack === 2))
    const count: Record<string, number> = {}
    for (const p of packTwo) {
      const k = resolve(p, []).kind
      count[k] = (count[k] ?? 0) + 1
    }
    expect(count).toEqual({ discovery: 11, spicy: 11, 'noble-metal': 5, loner: 6, same: 5, unknown: 19 })
  })

  it('only gold stays shiny', () => {
    for (const p of allPairs) {
      const o = resolve(p, [])
      if (o.kind === 'noble-metal') expect(p).toContain('Au')
    }
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

  it('numbers book plates 1..n without gaps, starter plates first', () => {
    expect(COMBOS.map((c) => c.plate).sort((a, b) => a - b)).toEqual(COMBOS.map((_, i) => i + 1))
    const starter = COMBOS.filter((c) => c.inputs.every((i) => ELEMENT_MAP[i].pack === 1))
    expect(Math.max(...starter.map((c) => c.plate))).toBe(starter.length)
  })

  it('calls a mixture a mixture: it has no single formula', () => {
    for (const c of COMBOS.filter((x) => x.kind === 'mixture')) {
      expect(c.facts.kid.toLowerCase(), c.id).toContain('mixture')
      expect(c.result.formula, c.id).toContain('+')
    }
  })
})

describe('accuracy rule', () => {
  const words = (s: string) => s.toLowerCase()
  it('never says "new element"', () => {
    for (const c of COMBOS) for (const f of Object.values(c.facts)) expect(words(f)).not.toContain('new element')
  })
  it('never tells the child a real substance is "not real"', () => {
    for (const level of [0, 1, 2, 3] as const)
      for (let n = 0; n < 30; n++) {
        const seq = lonerSequence(ELEMENT_MAP.He, ELEMENT_MAP.O, level)
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
  it('explains more at higher levels: level 3 says the formula, level 0 does not', () => {
    const water = COMBOS[0]
    expect(discoveryScript(water, true, 3).join(' ')).toContain('H two O')
    expect(discoveryScript(water, true, 0).join(' ')).not.toContain('H two O')
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
    const tray = focusedTray(ELEMENTS.map((e) => e.id), ['water'], 4)
    expect(tray).toHaveLength(4)
    const reachable = COMBOS.filter((c) => c.id !== 'water' && c.inputs.every((i) => tray.includes(i)))
    expect(reachable.length).toBeGreaterThanOrEqual(3)
  })
})

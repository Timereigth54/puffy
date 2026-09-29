import { describe, expect, it } from 'vitest'
import { COMBOS, ELEMENTS, ELEMENT_MAP } from '../data/content'
import {
  ARRIVAL_ORDER,
  activeSkill,
  dayKey,
  learn,
  nextArrival,
  nextAsk,
  record,
  roster,
  levelSnacks,
  skillStatus,
  skillsFor,
  snackShows,
  starterRoster,
  type Ask,
} from './learning'
import { numberWord } from './lines'
import type { ElementLearning, SkillProgress } from './types'

const D1 = '2026-09-01'
const D2 = '2026-09-02'

function answers(list: [ok: boolean, day: string][], mode: 'teach' | 'check' = 'check', start?: SkillProgress) {
  let sp = start
  for (const [ok, day] of list) sp = record(sp, mode, ok, day)
  return sp!
}
const checking: SkillProgress = { stage: 'check', teachHits: 3, recent: [] }

describe('teach, then check, then known', () => {
  it('moves to checking after three right answers while taught', () => {
    expect(answers([[true, D1], [true, D1]], 'teach').stage).toBe('teach')
    expect(answers([[true, D1], [true, D1], [true, D1]], 'teach').stage).toBe('check')
  })
  it('a wrong answer while taught costs nothing', () => {
    expect(answers([[true, D1], [false, D1], [true, D1], [true, D1]], 'teach').stage).toBe('check')
  })
  it('is not known after five right checks on one day: it needs a second day', () => {
    const five: [boolean, string][] = [[true, D1], [true, D1], [true, D1], [true, D1], [true, D1]]
    expect(answers([...five, [true, D1]], 'check', checking).stage).toBe('check')
    expect(answers([[true, D1], [true, D1], [true, D1], [true, D1], [true, D2]], 'check', checking).stage).toBe('known')
  })
  it('counts only the last six checks', () => {
    // one early miss, then five right on two days: known
    const sp = answers([[false, D1], [true, D1], [true, D1], [true, D2], [true, D2], [true, D2]], 'check', checking)
    expect(sp.stage).toBe('known')
    // two misses apart inside the last six: not yet
    expect(answers([[true, D1], [false, D1], [true, D1], [false, D2], [true, D2], [true, D2]], 'check', checking).stage).toBe('check')
  })
  it('goes back to teaching after two wrong checks in a row', () => {
    const sp = answers([[true, D1], [false, D1], [false, D1]], 'check', checking)
    expect(sp).toEqual({ stage: 'teach', teachHits: 0, recent: [] })
  })
  it('never lowers a known skill, and reviews change nothing', () => {
    const known: SkillProgress = { stage: 'known', teachHits: 3, recent: [] }
    expect(record(known, 'check', false, D1)).toBe(known)
    expect(record(checking, 'review', false, D1)).toBe(checking)
  })
  it('a guesser rarely passes: random picks from three snacks are known in under 5% of 2000 tries', () => {
    let seed = 7
    const rand = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31)
    let passed = 0
    for (let t = 0; t < 2000; t++) {
      let sp: SkillProgress = checking
      // twelve checks over three days, each right one time in three
      for (let i = 0; i < 12 && sp.stage === 'check'; i++) sp = record(sp, 'check', rand() < 1 / 3, `d${Math.floor(i / 4)}`)
      if (sp.stage === 'known') passed++
    }
    expect(passed / 2000).toBeLessThan(0.05)
  })
})

describe('what each level teaches', () => {
  it('age 1 learns names only', () => {
    for (const el of ELEMENTS) expect(skillsFor(el, 0)).toEqual(['name'])
  })
  it('ages 2–3 learn letters and numbers up to ten, but not sodium’s Latin letters', () => {
    expect(skillsFor(ELEMENT_MAP.O, 1)).toEqual(['name', 'letter', 'number'])
    expect(skillsFor(ELEMENT_MAP.Cl, 1)).toEqual(['name', 'letter'])
    expect(skillsFor(ELEMENT_MAP.Na, 1)).toEqual(['name'])
  })
  it('age 4 and up learns every skill for every snack', () => {
    for (const el of ELEMENTS) expect(skillsFor(el, 2)).toEqual(['name', 'letter', 'number'])
  })
  it('learns in order: letters only after the name is known', () => {
    const O = ELEMENT_MAP.O
    expect(activeSkill(undefined, O, 1, true)).toBe('name')
    expect(activeSkill({ name: { stage: 'check', teachHits: 3, recent: [] } }, O, 1, true)).toBe('name')
    expect(activeSkill({ name: { stage: 'known', teachHits: 3, recent: [] } }, O, 1, true)).toBe('letter')
  })
  it('with the narrator off, names are skipped and letters start', () => {
    expect(activeSkill(undefined, ELEMENT_MAP.O, 1, false)).toBe('letter')
    expect(activeSkill(undefined, ELEMENT_MAP.O, 0, false)).toBeNull()
  })
  it('shows letters on a snack once they are being learned, and at age 4 and up always', () => {
    const nameKnown: ElementLearning = { name: { stage: 'known', teachHits: 3, recent: [] } }
    expect(snackShows(undefined, ELEMENT_MAP.O, 1, true)).toEqual({ letter: false, number: false })
    expect(snackShows(nameKnown, ELEMENT_MAP.O, 1, true)).toEqual({ letter: true, number: false })
    expect(snackShows(undefined, ELEMENT_MAP.O, 2, true).letter).toBe(true)
    expect(snackShows(undefined, ELEMENT_MAP.O, 3, true)).toEqual({ letter: true, number: true })
  })
})

describe('asking', () => {
  it('asks about a skill being learned, in teach mode first', () => {
    const a = nextAsk(['H', 'O', 'C'], {}, 1, true, null, () => 0)
    expect(a).toEqual({ element: 'H', skill: 'name', mode: 'teach' })
  })
  it('does not ask for the same snack twice in a row when there is a choice', () => {
    for (let r = 0; r < 1; r += 0.1) expect(nextAsk(['H', 'O', 'C'], {}, 1, true, 'H', () => r)?.element).not.toBe('H')
  })
  it('reviews a known skill when everything is known', () => {
    const known = { stage: 'known' as const, teachHits: 3, recent: [] }
    const learning = { H: { name: known }, O: { name: known }, C: { name: known } }
    expect(nextAsk(['H', 'O', 'C'], learning, 0, true, null, () => 0)).toEqual({ element: 'H', skill: 'name', mode: 'review' })
  })
  it('records into the right element and skill', () => {
    const ask: Ask = { element: 'O', skill: 'name', mode: 'teach' }
    expect(learn({}, ask, true, D1)).toEqual({ O: { name: { stage: 'teach', teachHits: 1, recent: [] } } })
    const same = {}
    expect(learn(same, ask, false, D1)).toBe(same)
  })
})

describe('snacks arrive one by one', () => {
  const taught = (ids: string[]) => Object.fromEntries(ids.map((id) => [id, { name: { stage: 'check' as const, teachHits: 3, recent: [] } }]))
  const makeable = (ids: string[]) => COMBOS.filter((c) => c.inputs.every((i) => ids.includes(i))).map((c) => c.id)

  it('toddlers start with hydrogen, oxygen and carbon; older children with the starter six', () => {
    expect(starterRoster(1)).toEqual(['H', 'O', 'C'])
    expect(starterRoster(2)).toEqual(ARRIVAL_ORDER.slice(0, 6))
  })
  it('keeps pack 2 for ages 4 and up', () => {
    expect(levelSnacks(1)).toEqual(ARRIVAL_ORDER.slice(0, 6))
    expect(levelSnacks(2)).toEqual(ARRIVAL_ORDER)
    expect(roster([...ARRIVAL_ORDER], 1)).toEqual(ARRIVAL_ORDER.slice(0, 6))
    expect(roster([], 3, true)).toEqual(ARRIVAL_ORDER)
    expect(ARRIVAL_ORDER.slice(6).every((id) => ELEMENT_MAP[id].pack === 2)).toBe(true)
    expect([...ARRIVAL_ORDER].sort()).toEqual(ELEMENTS.map((e) => e.id).sort())
  })
  it('every arrival brings at least one new discovery', () => {
    for (let n = 3; n < ARRIVAL_ORDER.length; n++) {
      const before = makeable(ARRIVAL_ORDER.slice(0, n))
      const after = makeable(ARRIVAL_ORDER.slice(0, n + 1))
      expect(after.length, ARRIVAL_ORDER[n]).toBeGreaterThan(before.length)
    }
  })
  it('waits until everything on the tray is found and every name has been taught', () => {
    const three = ['H', 'O', 'C']
    expect(nextArrival([], 1, makeable(three).slice(1), taught(three), true, null, D1)).toBeNull()
    expect(nextArrival([], 1, makeable(three), {}, true, null, D1)).toBeNull()
    expect(nextArrival([], 1, makeable(three), taught(three), true, null, D1)).toBe('He')
    // with the narrator off, names cannot be taught, so they do not hold arrivals back
    expect(nextArrival([], 1, makeable(three), {}, false, null, D1)).toBe('He')
  })
  it('brings at most one new snack a day, and stops when all have come', () => {
    const four = ['H', 'O', 'C', 'He']
    expect(nextArrival(['He'], 1, makeable(four), taught(four), true, D1, D1)).toBeNull()
    expect(nextArrival(['He'], 1, makeable(four), taught(four), true, D1, D2)).toBe('Cl')
    const six = ARRIVAL_ORDER.slice(0, 6)
    expect(nextArrival(six, 1, makeable(six), taught(six), true, null, D1)).toBeNull()
    expect(nextArrival(six, 2, makeable(six), taught(six), true, null, D1)).toBe('N')
    expect(nextArrival(ARRIVAL_ORDER, 3, makeable(ARRIVAL_ORDER), taught(ARRIVAL_ORDER), true, null, D1)).toBeNull()
  })
  it('brings nothing when a grown-up has let every snack in', () => {
    const six = ARRIVAL_ORDER.slice(0, 6)
    expect(nextArrival(six, 2, makeable(six), taught(six), true, null, D1, true)).toBeNull()
  })
  it('keeps arrival order in the tray', () => {
    expect(roster(['Na', 'He'], 1)).toEqual(['H', 'O', 'C', 'He', 'Na'])
  })
})

describe('grown-ups page status', () => {
  it('names each state honestly', () => {
    const O = ELEMENT_MAP.O
    expect(skillStatus(undefined, O, 1, true, 'name')).toBe('learning')
    expect(skillStatus(undefined, O, 1, true, 'letter')).toBe('not-yet')
    expect(skillStatus(undefined, O, 1, false, 'name')).toBe('needs-sound')
    expect(skillStatus(undefined, ELEMENT_MAP.Na, 1, true, 'letter')).toBe('later')
    expect(skillStatus({ name: { stage: 'check', teachHits: 3, recent: [] } }, O, 1, true, 'name')).toBe('checking')
  })
})

describe('helpers', () => {
  it('says numbers as words', () => {
    expect([1, 8, 11, 17, 20, 26, 79].map(numberWord)).toEqual(['one', 'eight', 'eleven', 'seventeen', 'twenty', 'twenty-six', 'seventy-nine'])
  })
  it('makes a local date key', () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
  })
})

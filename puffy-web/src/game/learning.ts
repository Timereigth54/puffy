// The learning ladder: how a child comes to know each element before they can
// read. Pure functions only; PlayScreen asks, App stores. See DECISIONS.md
// "Learning ladder" for why each rule is the way it is.
//
// Each element is learned in three skills, in order:
//   name   Puffy says "oxygen", the child finds it
//   letter Puffy shows O, the child finds it
//   number Puffy shows 8, the child finds it
// Each skill is first TAUGHT (the answer is visible on the snack, so the
// child can match it), then CHECKED (the answer is hidden), then KNOWN.
import { COMBOS, ELEMENT_MAP, packFor } from '../data/content'
import type { Element, ElementLearning, Level, Skill, SkillProgress } from './types'

export const SKILLS: Skill[] = ['name', 'letter', 'number']

/** Right answers while taught before Puffy starts checking. */
export const TEACH_HITS = 3
/**
 * Known = CHECK_HITS right of the last CHECK_WINDOW checks, on CHECK_DAYS
 * different days. Simulated: a child guessing at random among three snacks
 * passes about 3% of the time; one who is right 90% of the time needs about
 * six checks. (3 of 4 let 10% of guessers through.)
 */
export const CHECK_WINDOW = 6
export const CHECK_HITS = 5
export const CHECK_DAYS = 2
/** Puffy asks for a snack on every ASK_EVERY-th turn. */
export const ASK_EVERY = 2

/**
 * The order snacks arrive in. Each arrival brings at least one new discovery
 * (learning.test.ts checks). Starter pack: helium brings helium gas, chlorine
 * tummy acid, sodium salt; sodium is last because its letters (Na) do not
 * match its English name. Pack 2, ages 4 and up only: nitrogen, iron,
 * magnesium, sulfur (fool's gold with iron), copper, gold (rose gold with copper).
 */
export const ARRIVAL_ORDER = ['H', 'O', 'C', 'He', 'Cl', 'Na', 'N', 'Fe', 'Mg', 'S', 'Cu', 'Au']

/** Every snack this level can ever have: the starter six below age 4, all twelve from 4. */
export function levelSnacks(level: Level): string[] {
  return ARRIVAL_ORDER.filter((id) => ELEMENT_MAP[id].pack <= packFor(level))
}

/** Toddlers start with three snacks (three new words); older children with the starter six. */
export function starterRoster(level: Level): string[] {
  return ARRIVAL_ORDER.slice(0, level <= 1 ? 3 : 6)
}

/** The snacks in the tub, in arrival order. With all = true, every snack for the level. */
export function roster(arrived: readonly string[], level: Level, all = false): string[] {
  const allowed = levelSnacks(level)
  if (all) return allowed
  const have = new Set([...starterRoster(level), ...arrived])
  return allowed.filter((id) => have.has(id))
}

/** Local calendar date, YYYY-MM-DD. */
export function dayKey(d: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/**
 * Which skills a level teaches for an element.
 * Age 1 learns names only. Ages 2–3 add letters and numbers, except letters
 * that do not match the English name (Na) and numbers above ten, which wait
 * for age 4. A number is only taught once the letters are.
 */
export function skillsFor(el: Element, level: Level): Skill[] {
  const out: Skill[] = ['name']
  if (level === 0) return out
  if (el.latinSymbol && level < 2) return out
  out.push('letter')
  if (el.atomicNumber <= 10 || level >= 2) out.push('number')
  return out
}

/**
 * The skill being learned now, or null when every skill for this level is known.
 * With the narrator off, names cannot be checked, so they are skipped and
 * letters start straight away.
 */
export function activeSkill(learning: ElementLearning | undefined, el: Element, level: Level, voiceOn: boolean): Skill | null {
  for (const s of skillsFor(el, level)) {
    if (learning?.[s]?.stage === 'known') continue
    if (s === 'name' && !voiceOn) continue
    return s
  }
  return null
}

/** True once the child has reached this skill (it is being learned or is known). */
export function reached(learning: ElementLearning | undefined, el: Element, level: Level, voiceOn: boolean, skill: Skill): boolean {
  const list = skillsFor(el, level)
  const i = list.indexOf(skill)
  if (i < 0) return false
  const current = activeSkill(learning, el, level, voiceOn)
  return current === null || list.indexOf(current) >= i
}

/** What a snack shows on its foam: its letters, its number. */
export function snackShows(learning: ElementLearning | undefined, el: Element, level: Level, voiceOn: boolean) {
  return {
    letter: level >= 2 || reached(learning, el, level, voiceOn, 'letter'),
    number: level >= 3 || reached(learning, el, level, voiceOn, 'number'),
  }
}

/** How far a skill has come, for the grown-ups page. */
export type SkillStatus = 'later' | 'needs-sound' | 'not-yet' | 'learning' | 'checking' | 'known'
export function skillStatus(learning: ElementLearning | undefined, el: Element, level: Level, voiceOn: boolean, skill: Skill): SkillStatus {
  if (!skillsFor(el, level).includes(skill)) return 'later'
  const stage = learning?.[skill]?.stage
  if (stage === 'known') return 'known'
  if (skill === 'name' && !voiceOn) return 'needs-sound'
  if (!reached(learning, el, level, voiceOn, skill)) return 'not-yet'
  return stage === 'check' ? 'checking' : 'learning'
}

// ─── Asking ─────────────────────────────────────────────────────────────────
/** teach: the answer is on the snack. check: it is hidden. review: a known skill, for practice only. */
export type AskMode = 'teach' | 'check' | 'review'
export interface Ask {
  element: string
  skill: Skill
  mode: AskMode
}

function stageOf(learning: Record<string, ElementLearning>, id: string, skill: Skill) {
  return learning[id]?.[skill]?.stage ?? 'teach'
}

/**
 * What Puffy asks for next. Prefers skills still being learned; when every
 * snack's skills are known, reviews a known one. Avoids asking for the same
 * snack twice in a row when there is a choice.
 */
export function nextAsk(
  tray: readonly string[],
  learning: Record<string, ElementLearning>,
  level: Level,
  voiceOn: boolean,
  lastElement: string | null,
  rand: () => number = Math.random,
): Ask | null {
  const learningNow: Ask[] = []
  const reviews: Ask[] = []
  for (const id of tray) {
    const el = ELEMENT_MAP[id]
    const skill = activeSkill(learning[id], el, level, voiceOn)
    if (skill) {
      learningNow.push({ element: id, skill, mode: stageOf(learning, id, skill) === 'check' ? 'check' : 'teach' })
    }
    for (const s of skillsFor(el, level)) {
      if (learning[id]?.[s]?.stage === 'known' && (s !== 'name' || voiceOn)) reviews.push({ element: id, skill: s, mode: 'review' })
    }
  }
  const pool = learningNow.length ? learningNow : reviews
  if (!pool.length) return null
  const fresh = pool.filter((a) => a.element !== lastElement)
  const list = fresh.length ? fresh : pool
  return list[Math.floor(rand() * list.length)]
}

/** One answer to one ask. Never lowers a known skill. */
export function record(sp: SkillProgress | undefined, mode: AskMode, ok: boolean, day: string): SkillProgress {
  const cur: SkillProgress = sp ?? { stage: 'teach', teachHits: 0, recent: [] }
  if (mode === 'review' || cur.stage === 'known') return cur
  if (mode === 'teach') {
    if (cur.stage !== 'teach' || !ok) return cur
    const teachHits = cur.teachHits + 1
    return teachHits >= TEACH_HITS ? { stage: 'check', teachHits, recent: [] } : { ...cur, teachHits }
  }
  const recent = [...cur.recent, { ok, day }].slice(-CHECK_WINDOW)
  const hits = recent.filter((r) => r.ok)
  if (hits.length >= CHECK_HITS && new Set(hits.map((r) => r.day)).size >= CHECK_DAYS) {
    return { stage: 'known', teachHits: cur.teachHits, recent }
  }
  // Two misses in a row: back to teaching with the answer visible. No child is left guessing.
  const last2 = recent.slice(-2)
  if (last2.length === 2 && last2.every((r) => !r.ok)) return { stage: 'teach', teachHits: 0, recent: [] }
  return { ...cur, recent }
}

export function learn(learning: Record<string, ElementLearning>, ask: Ask, ok: boolean, day: string): Record<string, ElementLearning> {
  const el = learning[ask.element] ?? {}
  const prev = el[ask.skill]
  const next = record(prev, ask.mode, ok, day)
  const unchanged = next === prev || (!prev && next.stage === 'teach' && next.teachHits === 0)
  if (unchanged) return learning
  return { ...learning, [ask.element]: { ...el, [ask.skill]: next } }
}

// ─── Arrivals ───────────────────────────────────────────────────────────────
/**
 * The next snack to arrive, or null. A new snack arrives when the child has
 * made everything the current snacks can make, and has been taught every
 * current snack's name (so new words do not pile onto unlearned ones).
 * At most one arrival a day. Nothing arrives when a grown-up has let every
 * snack in at once (all = true): they are already in the tub.
 */
export function nextArrival(
  arrived: readonly string[],
  level: Level,
  discovered: readonly string[],
  learning: Record<string, ElementLearning>,
  voiceOn: boolean,
  lastArrivalDay: string | null,
  today: string,
  all = false,
): string | null {
  if (all) return null
  const tray = roster(arrived, level)
  const next = levelSnacks(level).find((id) => !tray.includes(id))
  if (!next || lastArrivalDay === today) return null
  const reachable = COMBOS.filter((c) => c.inputs.every((i) => tray.includes(i)))
  if (reachable.some((c) => !discovered.includes(c.id))) return null
  if (voiceOn && tray.some((id) => stageOf(learning, id, 'name') === 'teach')) return null
  return next
}

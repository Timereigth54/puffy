export type Family = 'gas' | 'metal' | 'nonmetal' | 'noble'

export interface Facts {
  toddler: string
  kid: string
  junior: string
}

export interface Element {
  id: string
  symbol: string
  name: string
  atomicNumber: number
  color: string
  family: Family
  /** Foam cut: the silhouette the snack is cut into. */
  shape: 'round' | 'drop' | 'block' | 'star' | 'leaf' | 'balloon' | 'cloud' | 'hexagon' | 'heart' | 'bar' | 'triangle' | 'rhombus'
  face: 'giggly' | 'breathy' | 'sturdy' | 'eager' | 'sneaky' | 'floaty'
  tags: string[]
  personality: string
  facts: Facts
  /** How the narrator says the symbol, letter by letter: "H", "N A". */
  symbolSpoken: string
  /** 1 = the starter six, every age. 2 = harder chemistry, ages 4 and up. */
  pack: 1 | 2
  /** The symbol comes from an old or Latin name (Na from natrium), so it does not match the English name's first sound. */
  latinSymbol?: boolean
}

/** Art ids for the result illustrations drawn in ResultArt.tsx. */
export type ArtId =
  | 'water'
  | 'rocket'
  | 'breath'
  | 'fizz'
  | 'salt'
  | 'flame'
  | 'diamond'
  | 'tummy'
  | 'balloon'
  | 'air'
  | 'spray'
  | 'giggle'
  | 'rust'
  | 'steel'
  | 'pyrite'
  | 'penny'
  | 'firework'
  | 'ring'
  | 'flash'
  | 'flakes'
  | 'wrench'
  | 'powder'
  | 'crystal'
  | 'nugget'

export interface Combo {
  id: string
  inputs: [string, string]
  /**
   * 'compound' = different elements bonded; 'element' = still one element (H₂, diamond, helium gas);
   * 'mixture' = mixed but not bonded, so no formula of its own (steel, rose gold).
   */
  kind: 'compound' | 'element' | 'mixture'
  result: {
    displayName: string
    /** What the narrator says to a toddler: a short, true nickname. */
    spoken: string
    /** One word for the youngest level, matching the picture: "Water", "Fire", "Balloon". */
    word: string
    /** How the oldest level says the formula aloud: "H two O". */
    formulaSpoken: string
    formula: string
    art: ArtId
    color: string
  }
  facts: Facts
  celebration: 'small' | 'medium' | 'large'
  /** Plate number in the Discovery Book, 1-based. */
  plate: number
}

/** A real substance that is not a toddler snack. Puffy spits it straight out. */
export interface SpicyPair {
  inputs: [string, string]
  name: string
  formula: string
  why: string
}

/**
 * A real answer that is not a sticker: the two do not react, do not mix, or
 * only melt into an ordinary alloy. Said at levels 2–3 (pack 2 only).
 */
export interface FactPair {
  inputs: [string, string]
  /** On screen, a few words: "Won't mix!" */
  caption: string
  /** Level 2 */
  kid: string
  /** Level 3 */
  junior: string
}

export type Outcome =
  | { kind: 'discovery'; combo: Combo; firstTime: boolean }
  | { kind: 'spicy'; spicy: SpicyPair }
  | { kind: 'same'; element: Element }
  | { kind: 'loner'; noble: Element; other: Element }
  /** Gold with something it will not react with: it stays shiny. */
  | { kind: 'noble-metal'; metal: Element; other: Element }
  /** A true "no": they will not react or mix, or only make a plain alloy. */
  | { kind: 'fact'; fact: FactPair }
  | { kind: 'unknown'; inputs: string[] }

export type PuffyState =
  | 'idle'
  | 'hungry'
  | 'gulp'
  | 'chewing'
  | 'thinking'
  | 'delighted'
  | 'spitting'
  | 'proud'
  | 'curious'
  | 'shrug'
  | 'sad'
  | 'encouraging'
  | 'spicy'
  | 'sleepy'

export type Screen = 'splash' | 'onboarding' | 'home' | 'play' | 'book' | 'gate' | 'parent'

/**
 * 0 Giggles (age 1): single words. 1 Tiny Lab (2–3): one to three words.
 * 2 Element Friends (4–5): short sentences, symbols and names on screen.
 * 3 Real Chemist (6–8): explanations, formulas on screen.
 */
export type Level = 0 | 1 | 2 | 3

export type TextLevel = 'off' | 'names' | 'formulas'

export interface Settings {
  /** The child's age in years, as a grown-up entered it. Sets the level unless the level was chosen by hand. */
  childAge: number | null
  level: Level
  levelChosenByHand: boolean
  voiceOn: boolean
  spitSound: 'silly' | 'sweet'
  hints: 'always' | 'sometimes' | 'never'
  /** New snacks arrive one at a time as the child learns, or all are there from the start. */
  snacks: 'one-by-one' | 'all'
  timeLimitMinutes: number | null
}

/**
 * The three things a child learns about each element, in this order:
 * its name (hears "oxygen", finds it), its letters (sees O, finds it),
 * its number (sees 8, finds it). See DECISIONS.md "Learning ladder".
 */
export type Skill = 'name' | 'letter' | 'number'

export interface SkillProgress {
  /** teach: Puffy asks with the answer visible. check: asks with it hidden. known: passed the check. */
  stage: 'teach' | 'check' | 'known'
  /** Right answers while being taught. Three moves the skill to check. */
  teachHits: number
  /** Latest check answers, oldest first, at most six. day is the local date, YYYY-MM-DD. */
  recent: { ok: boolean; day: string }[]
}

export type ElementLearning = Partial<Record<Skill, SkillProgress>>

export interface Progress {
  version: number
  /** Shown to grown-ups only. The narrator never says it (see DECISIONS.md). */
  childName: string | null
  onboarded: boolean
  discovered: string[]
  /** ISO date per combo id, for the parent dashboard. */
  discoveredAt: Record<string, string>
  feedCounts: Record<string, number>
  secondsPlayed: number
  sessions: number
  /** Stickers not yet tapped in the book: they pulse until seen. */
  unseenStickers: string[]
  /** Snacks that arrived during play, beyond the level's starting snacks. */
  arrived: string[]
  /** Local date of the last arrival: at most one new snack a day. */
  lastArrivalDay: string | null
  /** Per element id: how far the child has come on each skill. */
  learning: Record<string, ElementLearning>
}

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
  shape: 'round' | 'drop' | 'block' | 'star' | 'leaf' | 'balloon'
  face: 'giggly' | 'breathy' | 'sturdy' | 'eager' | 'sneaky' | 'floaty'
  tags: string[]
  personality: string
  facts: Facts
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

export interface Combo {
  id: string
  inputs: [string, string]
  /** 'compound' = different elements bonded; 'element' = still one element (H₂, diamond, helium gas). */
  kind: 'compound' | 'element'
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

export type Outcome =
  | { kind: 'discovery'; combo: Combo; firstTime: boolean }
  | { kind: 'spicy'; spicy: SpicyPair }
  | { kind: 'same'; element: Element }
  | { kind: 'loner'; noble: Element; other: Element }
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
  timeLimitMinutes: number | null
}

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
}

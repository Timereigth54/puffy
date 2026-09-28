export interface Element {
  id: string
  symbol: string
  name: string
  atomicNumber: number
  color: string
  shape: string
  tags: string[]
  personality: string
  facts: {
    toddler: string
    kid: string
    junior: string
  }
}

export interface ComboResult {
  displayName: string
  formula: string
  animation: string
  color: string
}

export interface Combo {
  id: string
  inputs: string[]
  matchMode: 'any-order' | 'exact-order'
  result: ComboResult
  facts: {
    toddler: string
    kid: string
    junior: string
  }
  celebration: 'small' | 'medium' | 'large'
  unlocksSticker: boolean
}

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
  | 'sleepy'

export type Screen =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'play'
  | 'book'
  | 'parent-gate'
  | 'parent'

export type AgeMode = 0 | 1 | 2 | 3 | 4

export interface Settings {
  ageMode: AgeMode
  voiceOn: boolean
  textLevel: 'off' | 'symbols' | 'names' | 'formulas' | 'equations'
  spitSound: 'silly' | 'sweet'
  hints: 'always' | 'sometimes' | 'never'
  timeLimitMinutes: number | null // null = none
}

export interface Progress {
  childName: string | null
  discovered: string[] // combo ids
  feedCounts: Record<string, number> // element id -> times fed
  attempts: Record<string, number> // normalized pair key -> attempt count
  totalFeeds: number
  secondsPlayed: number
  onboarded: boolean
  puffyStage: number // 0..5 growth stages
}

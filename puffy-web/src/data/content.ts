import type { Combo, Element, Level, SpicyPair } from '../game/types'

// ─── Starter pack (Mode 0, ages 2–3) ────────────────────────────────────────
// Six snacks chosen so that every one of the 21 possible pairs has an honest
// answer a toddler can enjoy. See DECISIONS.md "Starter pack" for why N was
// swapped for He.
export const ELEMENTS: Element[] = [
  {
    id: 'H',
    symbol: 'H',
    name: 'Hydrogen',
    atomicNumber: 1,
    color: '#7FD4FF',
    family: 'gas',
    shape: 'round',
    face: 'giggly',
    tags: ['light', 'float', 'fuel', 'water', 'tiny'],
    personality: 'The lightest, floatiest snack. Always drifting upward.',
    facts: {
      toddler: 'Hydrogen is so light it floats away!',
      kid: 'Hydrogen is the lightest element in the universe.',
      junior: 'Hydrogen is element 1, with one proton and one electron.',
    },
  },
  {
    id: 'O',
    symbol: 'O',
    name: 'Oxygen',
    atomicNumber: 8,
    color: '#4FC3F7',
    family: 'gas',
    shape: 'drop',
    face: 'breathy',
    tags: ['breathe', 'fire', 'bubbles', 'air'],
    personality: 'Breathy and bubbly, always surrounded by tiny bubbles.',
    facts: {
      toddler: 'Oxygen is the air you breathe in!',
      kid: 'Oxygen helps you breathe and helps fires burn.',
      junior: 'Oxygen is element 8. About a fifth of the air is O₂.',
    },
  },
  {
    id: 'C',
    symbol: 'C',
    name: 'Carbon',
    atomicNumber: 6,
    color: '#5B5560',
    family: 'nonmetal',
    shape: 'block',
    face: 'sturdy',
    tags: ['strong', 'building', 'pencil', 'dark'],
    personality: 'Strong and steady. Builds everything living.',
    facts: {
      toddler: 'Carbon is in pencils, and in you!',
      kid: 'Carbon is in every living thing, and in pencil lead.',
      junior: 'Carbon is element 6. It makes four bonds, the backbone of life.',
    },
  },
  {
    id: 'Na',
    symbol: 'Na',
    name: 'Sodium',
    atomicNumber: 11,
    color: '#FFD966',
    family: 'metal',
    shape: 'star',
    face: 'eager',
    tags: ['salty', 'soft', 'eager', 'shiny'],
    personality: 'Eager, salty, a tiny bit sparky. Loves to react!',
    facts: {
      toddler: 'Sodium is the salty part of salt!',
      kid: 'Sodium is a soft metal. You could cut it with a butter knife.',
      junior: 'Sodium is element 11. It reacts fiercely with water.',
    },
  },
  {
    id: 'Cl',
    symbol: 'Cl',
    name: 'Chlorine',
    atomicNumber: 17,
    color: '#7FD48F',
    family: 'nonmetal',
    shape: 'leaf',
    face: 'sneaky',
    tags: ['clean', 'green', 'pool', 'sneaky'],
    personality: 'Clean, green, a little sneaky. Keeps pools sparkly.',
    facts: {
      toddler: 'Chlorine keeps swimming pools clean!',
      kid: 'Chlorine is a greenish gas that cleans pool water.',
      junior: 'Chlorine is element 17, a halogen that disinfects water.',
    },
  },
  {
    id: 'He',
    symbol: 'He',
    name: 'Helium',
    atomicNumber: 2,
    color: '#E6C8FF',
    family: 'noble',
    shape: 'balloon',
    face: 'floaty',
    tags: ['light', 'float', 'balloon', 'party', 'squeaky'],
    personality: 'Floaty and shy. Never holds hands with anyone.',
    facts: {
      toddler: 'Helium makes balloons float up, up, up!',
      kid: 'Helium is a noble gas. It almost never joins other elements.',
      junior: 'Helium is element 2. Its full outer shell makes it unreactive.',
    },
  },
]

export const ELEMENT_MAP: Record<string, Element> = Object.fromEntries(
  ELEMENTS.map((e) => [e.id, e]),
)

export function normalizeKey(inputs: readonly string[]): string {
  return [...inputs].sort().join('+')
}

// ─── Discoveries: the nine stickers of the starter book ─────────────────────
export const COMBOS: Combo[] = [
  {
    id: 'water',
    inputs: ['H', 'O'],
    kind: 'compound',
    result: { displayName: 'Water', spoken: 'Water', word: 'Water', formulaSpoken: 'H two O', formula: 'H₂O', art: 'water', color: '#4FB8F0' },
    facts: {
      toddler: 'Drink it! Splash it!',
      kid: 'Water is a compound: two hydrogens and one oxygen.',
      junior: 'Water is polar. That is why ice floats.',
    },
    celebration: 'large',
    plate: 1,
  },
  {
    id: 'hydrogen-gas',
    inputs: ['H', 'H'],
    kind: 'element',
    result: { displayName: 'Hydrogen gas', spoken: 'Hydrogen', word: 'Hydrogen', formulaSpoken: 'H two', formula: 'H₂', art: 'rocket', color: '#7FD4FF' },
    facts: {
      toddler: 'Rockets go zoom!',
      kid: 'Two hydrogens holding hands make hydrogen gas. Rockets burn it.',
      junior: 'H₂ is the lightest gas. Rockets burn it with oxygen.',
    },
    celebration: 'medium',
    plate: 2,
  },
  {
    id: 'oxygen-gas',
    inputs: ['O', 'O'],
    kind: 'element',
    result: { displayName: 'Oxygen gas', spoken: 'Oxygen', word: 'Oxygen', formulaSpoken: 'O two', formula: 'O₂', art: 'breath', color: '#4FC3F7' },
    facts: {
      toddler: 'Big breath in!',
      kid: 'Two oxygens holding hands make the air you breathe.',
      junior: 'O₂ makes up about 21% of the air.',
    },
    celebration: 'medium',
    plate: 3,
  },
  {
    id: 'carbon-dioxide',
    inputs: ['C', 'O'],
    kind: 'compound',
    result: { displayName: 'Carbon dioxide', spoken: 'Fizzy gas', word: 'Bubbles', formulaSpoken: 'C O two', formula: 'CO₂', art: 'fizz', color: '#9FB6C8' },
    facts: {
      toddler: 'Fizzy bubbles!',
      kid: 'Carbon dioxide is a compound. You breathe it out.',
      junior: 'CO₂ is what you exhale. Plants use it to grow.',
    },
    celebration: 'medium',
    plate: 4,
  },
  {
    id: 'salt',
    inputs: ['Na', 'Cl'],
    kind: 'compound',
    result: { displayName: 'Salt', spoken: 'Salt', word: 'Salt', formulaSpoken: 'sodium chloride', formula: 'NaCl', art: 'salt', color: '#F4EDE4' },
    facts: {
      toddler: 'Crunchy! Salty!',
      kid: 'Salt is a compound of sodium and chlorine.',
      junior: 'NaCl is an ionic crystal. It dissolves into Na⁺ and Cl⁻.',
    },
    celebration: 'large',
    plate: 5,
  },
  {
    id: 'methane',
    inputs: ['C', 'H'],
    kind: 'compound',
    result: { displayName: 'Methane', spoken: 'Stove gas', word: 'Fire', formulaSpoken: 'C H four', formula: 'CH₄', art: 'flame', color: '#FFB24D' },
    facts: {
      toddler: 'Little blue fire!',
      kid: 'Methane is a compound of carbon and hydrogen. Stoves burn it.',
      junior: 'CH₄ is the main part of natural gas.',
    },
    celebration: 'medium',
    plate: 6,
  },
  {
    id: 'diamond',
    inputs: ['C', 'C'],
    kind: 'element',
    result: { displayName: 'Diamond', spoken: 'Diamond', word: 'Diamond', formulaSpoken: 'pure carbon', formula: 'C', art: 'diamond', color: '#BFE9FF' },
    facts: {
      toddler: 'Super shiny!',
      kid: 'A diamond is still carbon, with every carbon holding hands very tightly.',
      junior: 'Diamond is carbon in a rigid 3D lattice. Graphite is carbon in sheets.',
    },
    celebration: 'large',
    plate: 7,
  },
  {
    id: 'hydrochloric-acid',
    inputs: ['H', 'Cl'],
    kind: 'compound',
    result: { displayName: 'Tummy acid', spoken: 'Tummy juice', word: 'Tummy', formulaSpoken: 'H C L', formula: 'HCl', art: 'tummy', color: '#C6E377' },
    facts: {
      toddler: 'It mashes food!',
      kid: 'Hydrochloric acid is a compound. A little of it helps your tummy digest.',
      junior: 'HCl in water is hydrochloric acid, the acid in your stomach.',
    },
    celebration: 'medium',
    plate: 8,
  },
  {
    id: 'helium-gas',
    inputs: ['He', 'He'],
    kind: 'element',
    result: { displayName: 'Helium gas', spoken: 'Helium', word: 'Balloon', formulaSpoken: 'H E', formula: 'He', art: 'balloon', color: '#E6C8FF' },
    facts: {
      toddler: 'Balloons float up!',
      kid: 'Helium never holds hands, not even with helium. It just floats.',
      junior: 'Helium is monatomic: its atoms stay single, even as a gas.',
    },
    celebration: 'medium',
    plate: 9,
  },
]

export const COMBO_MAP: Record<string, Combo> = Object.fromEntries(
  COMBOS.map((c) => [normalizeKey(c.inputs), c]),
)
export const COMBO_BY_ID: Record<string, Combo> = Object.fromEntries(
  COMBOS.map((c) => [c.id, c]),
)

// ─── Real, but not a toddler snack ──────────────────────────────────────────
// These pairs DO make real substances. Puffy never calls them "not real".
export const SPICY: SpicyPair[] = [
  { inputs: ['Cl', 'Cl'], name: 'Chlorine gas', formula: 'Cl₂', why: 'It is a poisonous gas.' },
  { inputs: ['Cl', 'O'], name: 'Chlorine dioxide', formula: 'ClO₂', why: 'Grown-ups use it to bleach paper.' },
  { inputs: ['C', 'Cl'], name: 'Carbon tetrachloride', formula: 'CCl₄', why: 'It is a harsh chemical cleaner.' },
  { inputs: ['H', 'Na'], name: 'Sodium hydride', formula: 'NaH', why: 'It fizzes and burns when it touches water.' },
  { inputs: ['C', 'Na'], name: 'Sodium carbide', formula: 'Na₂C₂', why: 'It reacts wildly with water.' },
  { inputs: ['Na', 'O'], name: 'Sodium oxide', formula: 'Na₂O', why: 'It turns into a strong lye in water.' },
]
export const SPICY_MAP: Record<string, SpicyPair> = Object.fromEntries(
  SPICY.map((s) => [normalizeKey(s.inputs), s]),
)

export const NOBLE_GAS_IDS = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn']

// ─── Silly-idea engine ──────────────────────────────────────────────────────
// Pairs one tag from each element to a silly thing Puffy imagines. Each idea
// is drawn (IdeaArt.tsx) so the joke works with no sound and no text.
export interface TagNoun {
  tags: [string, string]
  /** Level 1: "Flying house". */
  noun: string
  /** Level 0: one word, matching the drawing. */
  word: string
  /** Levels 2–3: with its article, "a flying house". */
  phrase: string
  art: IdeaArtId
}

export type IdeaArtId =
  | 'feather'
  | 'puddle'
  | 'bubble'
  | 'candles'
  | 'house'
  | 'scribble'
  | 'fries'
  | 'disco'
  | 'pool'
  | 'pickle'
  | 'squiggle'

// Every "nope" pair is helium plus one other snack, so two ideas per pair.
export const TAG_NOUNS: TagNoun[] = [
  { tags: ['float', 'light'], noun: 'Floaty feather', word: 'Feather', phrase: 'a floaty feather', art: 'feather' },
  { tags: ['party', 'water'], noun: 'Flying puddle', word: 'Puddle', phrase: 'a flying puddle', art: 'puddle' },
  { tags: ['balloon', 'bubbles'], noun: 'Forever bubble', word: 'Bubble', phrase: 'a bubble that never pops', art: 'bubble' },
  { tags: ['party', 'fire'], noun: 'Flying candles', word: 'Candles', phrase: 'some flying birthday candles', art: 'candles' },
  { tags: ['float', 'building'], noun: 'Flying house', word: 'House', phrase: 'a flying house', art: 'house' },
  { tags: ['balloon', 'dark'], noun: 'Scribble balloon', word: 'Scribble', phrase: 'a scribbly balloon', art: 'scribble' },
  { tags: ['float', 'salty'], noun: 'Flying fries', word: 'Fries', phrase: 'some flying french fries', art: 'fries' },
  { tags: ['party', 'shiny'], noun: 'Disco star', word: 'Star', phrase: 'a disco star', art: 'disco' },
  { tags: ['float', 'pool'], noun: 'Sky pool', word: 'Pool', phrase: 'a swimming pool in the sky', art: 'pool' },
  { tags: ['balloon', 'green'], noun: 'Pickle balloon', word: 'Pickle', phrase: 'a pickle balloon', art: 'pickle' },
]

export const FALLBACK_IDEA: TagNoun = { tags: ['', ''], noun: 'Silly thing', word: 'Silly', phrase: 'something silly', art: 'squiggle' }

// ─── The narrator, level by level ───────────────────────────────────────────
// Level 0 (age 1) single words. Level 1 (2–3) one to three words. Level 2
// (4–5) short sentences. Level 3 (6–8) explanations. Sentence builders that
// combine these with a discovery live in game/lines.ts.
export interface VoiceBank {
  intro: string
  feedPuffy: string
  firstGrab: string
  bookFound: string
  bookEmpty: string
  sleep: string
  unknown: string
  grab: string[]
  idle: string[]
  thinking: string[]
  silly: string[]
  rejection: string[]
  encourage: string[]
  /** Said before a first discovery. Level 2+ joins it to the name: "You made water!" */
  praise: string[]
  cheers: string[]
  /** Why helium said no. {name} is the noble gas. Empty at level 0: too many words. */
  loner: string[]
  /** Levels 0–1: fixed lines for a harsh real substance. Levels 2–3 build theirs in lines.ts. */
  spicy: string[]
}

export const VOICE: Record<Level, VoiceBank> = {
  0: {
    intro: 'Hi! Puffy!',
    feedPuffy: 'Yum!',
    firstGrab: 'Ooh!',
    bookFound: 'Look!',
    bookEmpty: 'Snacks!',
    sleep: 'Night night!',
    unknown: 'Hmm?',
    grab: ['Ooh!', 'Yum!'],
    idle: ['Yum yum?', 'Hungry!'],
    thinking: ['Hmm?', 'Ooh…'],
    silly: ['Hee hee!', 'Ha ha!'],
    rejection: ['Uh-oh!', 'Oops!'],
    encourage: ['Again!', 'More!'],
    praise: ['Yay!', 'Wow!'],
    cheers: ['Yay!', 'Again!'],
    loner: [],
    spicy: ['Hot!', 'Hot hot!'],
  },
  1: {
    intro: 'Hi! Puffy is hungry!',
    feedPuffy: 'Feed Puffy!',
    firstGrab: 'Ooh! Snack!',
    bookFound: 'Look! Your stickers!',
    bookEmpty: 'Go find snacks!',
    sleep: 'Puffy is sleepy. Night night!',
    unknown: 'Hmm? Don’t know!',
    grab: ['Ooh!', 'Yum!', 'Snack!'],
    idle: ['Hungry!', 'More snacks?', 'Yum yum?', 'Feed Puffy!'],
    thinking: ['Hmmm…', 'Ooh…', 'Hmm hmm…', 'Let’s see…'],
    silly: ['Hee hee!', 'Silly!', 'Wheee!', 'So funny!', 'Boing!'],
    rejection: ['Nope!', 'Uh-oh!', 'No no!'],
    encourage: ['Oh no! Try again!', 'Oh no! Again!', 'Try another!', 'One more!'],
    praise: ['Wow!', 'Yay!', 'Ta-da!'],
    cheers: ['Yay!', 'Again!', 'Yum!', 'Hooray!'],
    loner: ['{name} won’t hold hands!', '{name} likes to be alone!'],
    spicy: ['Too hot!', 'Hot hot hot!', 'Yikes! Too spicy!', 'Too hot! Grown-ups only!'],
  },
  2: {
    intro: 'Hi! This is Puffy. Puffy is a hungry cloud!',
    feedPuffy: 'Let’s feed Puffy two snacks!',
    firstGrab: 'Ooh, a snack!',
    bookFound: 'Look at all the things you made!',
    bookEmpty: 'Let’s go make something!',
    sleep: 'Puffy is sleepy now. Let’s play again later!',
    unknown: 'Hmm, Puffy doesn’t know that one yet!',
    grab: ['Ooh, good one!', 'Yummy snack!', 'Ooh, a snack!'],
    idle: ['Puffy is still hungry!', 'Which snacks should we try?', 'Feed Puffy two snacks!'],
    thinking: ['Hmm, let me think…', 'Ooh, what could it be?'],
    silly: ['Hee hee, that’s silly!', 'Ha ha, so silly!'],
    rejection: ['But nope!', 'But that doesn’t work!'],
    encourage: ['Let’s try another one!', 'Try two different snacks!'],
    praise: ['You made', 'Look, you made', 'Wow, you made'],
    cheers: ['Great job!', 'You did it again!'],
    loner: ['{name} won’t hold hands with anyone!', '{name} likes to float all by itself!'],
    spicy: [],
  },
  3: {
    intro: 'Hi! This is Puffy, a chemistry cloud. Feed Puffy two elements and see what they make!',
    feedPuffy: 'Pick two elements for Puffy!',
    firstGrab: 'Good pick!',
    bookFound: 'Here is everything you have discovered.',
    bookEmpty: 'No discoveries yet. Let’s start experimenting!',
    sleep: 'Puffy is tired. Time for a break!',
    unknown: 'Hmm, Puffy doesn’t know that reaction yet.',
    grab: ['Good pick!', 'Interesting element!', 'Nice choice!'],
    idle: ['Which two elements should we combine?', 'Try mixing two elements!', 'Puffy is ready for an experiment!'],
    thinking: ['Let me think…', 'Hmm, what will happen?'],
    silly: ['Ha ha, what a silly idea!', 'Hee hee, imagine that!'],
    rejection: ['But no, that won’t work.', 'Nope, nothing happens.'],
    encourage: ['Try a different pair!', 'Let’s test another combination!'],
    praise: ['You discovered', 'You made'],
    cheers: ['Correct!', 'Nice chemistry!'],
    loner: ['{name} is a noble gas. It almost never joins other elements.', '{name} has a full outer shell, so it stays on its own.'],
    spicy: [],
  },
}

export const LEVELS: { level: Level; name: string; ages: string; note: string }[] = [
  { level: 0, name: 'Giggles', ages: 'age 1', note: 'Single happy words, no text on screen.' },
  { level: 1, name: 'Tiny Lab', ages: 'ages 2–3', note: 'One to three words, no text on screen.' },
  { level: 2, name: 'Element Friends', ages: 'ages 4–5', note: 'Short sentences, simple facts, element symbols and names on screen.' },
  { level: 3, name: 'Real Chemist', ages: 'ages 6–8', note: 'Full explanations, formulas and chemistry facts.' },
]

export function levelForAge(age: number): Level {
  if (age < 2) return 0
  if (age < 4) return 1
  if (age < 6) return 2
  return 3
}

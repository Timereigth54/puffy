import type { Combo, Element, SpicyPair } from '../game/types'

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
    shape: 'square',
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
    result: { displayName: 'Water', formula: 'H₂O', art: 'water', color: '#4FB8F0' },
    facts: {
      toddler: 'Water! You drink it, splash it, swim in it!',
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
    result: { displayName: 'Hydrogen gas', formula: 'H₂', art: 'rocket', color: '#7FD4FF' },
    facts: {
      toddler: 'Hydrogen gas! Rockets zoom with it!',
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
    result: { displayName: 'Oxygen gas', formula: 'O₂', art: 'breath', color: '#4FC3F7' },
    facts: {
      toddler: 'Oxygen gas! Take a big deep breath!',
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
    result: { displayName: 'Carbon dioxide', formula: 'CO₂', art: 'fizz', color: '#9FB6C8' },
    facts: {
      toddler: 'Carbon dioxide! The fizzy bubbles in soda!',
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
    result: { displayName: 'Salt', formula: 'NaCl', art: 'salt', color: '#F4EDE4' },
    facts: {
      toddler: 'Salt! Crunchy and salty!',
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
    result: { displayName: 'Methane', formula: 'CH₄', art: 'flame', color: '#FFB24D' },
    facts: {
      toddler: 'Methane! The little blue flame on a stove!',
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
    result: { displayName: 'Diamond', formula: 'C', art: 'diamond', color: '#BFE9FF' },
    facts: {
      toddler: 'Diamond! Carbon holding hands with carbon, super tight!',
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
    result: { displayName: 'Tummy acid', formula: 'HCl', art: 'tummy', color: '#C6E377' },
    facts: {
      toddler: 'Tummy acid! Your tummy uses it to mash up food!',
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
    result: { displayName: 'Helium gas', formula: 'He', art: 'balloon', color: '#E6C8FF' },
    facts: {
      toddler: 'Helium gas! It floats balloons!',
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

// ─── Silly-idea engine banks ────────────────────────────────────────────────
// Pairs one tag from each element to a silly thing Puffy imagines.
export interface TagNoun {
  tags: [string, string]
  nouns: string[]
}

export const TAG_NOUNS: TagNoun[] = [
  { tags: ['balloon', 'fuel'], nouns: ['a balloon that runs on burps'] },
  { tags: ['squeaky', 'tiny'], nouns: ['a trumpet for a mouse'] },
  { tags: ['party', 'water'], nouns: ['a water balloon that floats away'] },
  { tags: ['float', 'light'], nouns: ['a feather that forgot to fall'] },
  { tags: ['squeaky', 'breathe'], nouns: ['a voice as squeaky as a duck'] },
  { tags: ['balloon', 'bubbles'], nouns: ['a bubble that never pops'] },
  { tags: ['party', 'fire'], nouns: ['birthday candles that fly'] },
  { tags: ['float', 'air'], nouns: ['a kite with no string'] },
  { tags: ['float', 'building'], nouns: ['a house that floats away'] },
  { tags: ['balloon', 'dark'], nouns: ['a balloon made of pencil scribbles'] },
  { tags: ['party', 'strong'], nouns: ['a piñata nobody can break'] },
  { tags: ['squeaky', 'pencil'], nouns: ['a pencil that squeaks when it writes'] },
  { tags: ['float', 'salty'], nouns: ['flying french fries'] },
  { tags: ['balloon', 'soft'], nouns: ['a squishy balloon pillow'] },
  { tags: ['squeaky', 'eager'], nouns: ['a squeaky toy that cannot sit still'] },
  { tags: ['party', 'shiny'], nouns: ['a disco ball that bounces'] },
  { tags: ['float', 'pool'], nouns: ['a swimming pool in the sky'] },
  { tags: ['balloon', 'green'], nouns: ['a pickle balloon'] },
  { tags: ['squeaky', 'clean'], nouns: ['squeaky-clean bubbles'] },
  { tags: ['party', 'sneaky'], nouns: ['a surprise party for a frog'] },
]

export const FALLBACK_NOUNS = ['a very silly something', 'a wobbly whatsit', 'a giggly thingamajig']

/** Sentences about what the silly thing could be used for. Each is a full sentence so it can be recorded as one clip. */
export const USE_LINES = [
  'It could be used for a teddy bear parade!',
  'Great for a squirrel talent show!',
  'Perfect for a penguin pool party!',
  'Imagine it at a birthday party!',
  'Imagine it on the moon!',
  'It could be used for napping knights!',
  'Great for a dragon’s kitchen!',
  'Perfect for cloud school show-and-tell!',
]

export const THINKING_LINES = ['Hmmm…', 'Let me see…', 'Ooh, what’s this…', 'Hmm hmm hmm…', 'Wait a second…']

export const REJECTION_LINES = ['But nope!', 'But no way!', 'But it doesn’t work!', 'But not today!']

export const ENCOURAGEMENT_LINES = [
  'Oh no, try again!',
  'Oh no! Let’s try another one!',
  'Oh no! What else?',
  'Oh no! One more time!',
  'Oh no! You can do it!',
]

export const LONER_LINES = [
  '{name} doesn’t hold hands with anyone. It’s a loner!',
  '{name} is shy. It never mixes with other snacks!',
  '{name} likes to float all by itself!',
]

export const SPICY_LINES = [
  'Whoa! That one’s real, but it’s grown-up science. Too spicy for Puffy!',
  'Ooh, spicy! That’s a real one, but only for grown-up scientists!',
  'Hot hot hot! It’s real, but way too spicy for Puffy!',
]

export const PRAISE_PREFIXES = ['You discovered', 'You made', 'Look at that!']
export const CHEERS = ['Yeaah!', 'Nice!', 'You got it!', 'Woo-hoo!']

export const GRAB_LINES = ['Ooh!', 'Yum!', 'Snack!']

export const IDLE_LINES = [
  'Puffy is still hungry!',
  'Got more snacks?',
  'What should we try?',
  'Puffy wants a yummy snack!',
]

export const UNKNOWN_LINE = 'Hmm… Puffy doesn’t know that recipe yet!'

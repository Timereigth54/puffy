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
    result: { displayName: 'Water', spoken: 'Water', formula: 'H₂O', art: 'water', color: '#4FB8F0' },
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
    result: { displayName: 'Hydrogen gas', spoken: 'Hydrogen', formula: 'H₂', art: 'rocket', color: '#7FD4FF' },
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
    result: { displayName: 'Oxygen gas', spoken: 'Oxygen', formula: 'O₂', art: 'breath', color: '#4FC3F7' },
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
    result: { displayName: 'Carbon dioxide', spoken: 'Fizzy gas', formula: 'CO₂', art: 'fizz', color: '#9FB6C8' },
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
    result: { displayName: 'Salt', spoken: 'Salt', formula: 'NaCl', art: 'salt', color: '#F4EDE4' },
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
    result: { displayName: 'Methane', spoken: 'Stove gas', formula: 'CH₄', art: 'flame', color: '#FFB24D' },
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
    result: { displayName: 'Diamond', spoken: 'Diamond', formula: 'C', art: 'diamond', color: '#BFE9FF' },
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
    result: { displayName: 'Tummy acid', spoken: 'Tummy juice', formula: 'HCl', art: 'tummy', color: '#C6E377' },
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
    result: { displayName: 'Helium gas', spoken: 'Helium', formula: 'He', art: 'balloon', color: '#E6C8FF' },
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

// ─── Silly-idea engine banks ────────────────────────────────────────────────
// Toddler words only: one to three words a line. Pairs one tag from each
// element to a silly thing Puffy imagines.
export interface TagNoun {
  tags: [string, string]
  nouns: string[]
}

export const TAG_NOUNS: TagNoun[] = [
  { tags: ['balloon', 'fuel'], nouns: ['a burp balloon'] },
  { tags: ['squeaky', 'tiny'], nouns: ['a mouse trumpet'] },
  { tags: ['party', 'water'], nouns: ['a flying puddle'] },
  { tags: ['float', 'light'], nouns: ['a floaty feather'] },
  { tags: ['squeaky', 'breathe'], nouns: ['a squeaky duck voice'] },
  { tags: ['balloon', 'bubbles'], nouns: ['a forever bubble'] },
  { tags: ['party', 'fire'], nouns: ['flying candles'] },
  { tags: ['float', 'air'], nouns: ['a kite, no string'] },
  { tags: ['float', 'building'], nouns: ['a flying house'] },
  { tags: ['balloon', 'dark'], nouns: ['a scribble balloon'] },
  { tags: ['party', 'strong'], nouns: ['a rock piñata'] },
  { tags: ['squeaky', 'pencil'], nouns: ['a squeaky pencil'] },
  { tags: ['float', 'salty'], nouns: ['flying fries'] },
  { tags: ['balloon', 'soft'], nouns: ['a squishy balloon'] },
  { tags: ['squeaky', 'eager'], nouns: ['a bouncy squeaker'] },
  { tags: ['party', 'shiny'], nouns: ['a disco star'] },
  { tags: ['float', 'pool'], nouns: ['a sky pool'] },
  { tags: ['balloon', 'green'], nouns: ['a pickle balloon'] },
  { tags: ['squeaky', 'clean'], nouns: ['squeaky soap'] },
  { tags: ['party', 'sneaky'], nouns: ['a frog party'] },
]

export const FALLBACK_NOUNS = ['a silly thing', 'a wobbly thing', 'a giggly thing']

/** Puffy giggles at its own idea. */
export const SILLY_LINES = ['Hee hee!', 'Silly!', 'Wheee!', 'So funny!', 'Boing!']

export const THINKING_LINES = ['Hmmm…', 'Ooh…', 'Hmm hmm…', 'Let’s see…']

export const REJECTION_LINES = ['Nope!', 'Uh-oh!', 'No no!']

export const ENCOURAGEMENT_LINES = ['Oh no! Try again!', 'Oh no! Again!', 'Try another!', 'One more!']

/** True reason, toddler-sized: helium does not bond with anything. */
export const LONER_LINES = ['{name} won’t hold hands!', '{name} likes to be alone!']

/** Real substances that are not for Puffy. Never "not real". */
export const SPICY_LINES = ['Too hot!', 'Hot hot hot!', 'Yikes! Too spicy!', 'Too hot! Grown-ups only!']

export const PRAISE_PREFIXES = ['Wow!', 'Yay!', 'Ta-da!']
export const CHEERS = ['Yay!', 'Again!', 'Yum!', 'Hooray!']

export const GRAB_LINES = ['Ooh!', 'Yum!', 'Snack!']

export const IDLE_LINES = ['Hungry!', 'More snacks?', 'Yum yum?', 'Feed Puffy!']

export const UNKNOWN_LINE = 'Hmm? Don’t know!'

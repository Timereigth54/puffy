import type { Combo, Element, Level, SpicyPair } from '../game/types'

// ─── Starter pack (Mode 0, ages 2–3) ────────────────────────────────────────
// Six snacks chosen so that every one of the 21 possible pairs has an honest
// answer a toddler can enjoy. See DECISIONS.md "Starter pack" for why N was
// swapped for He.
export const ELEMENTS: Element[] = [
  {
    id: 'H',
    symbol: 'H',
    symbolSpoken: 'H',
    pack: 1,
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
    symbolSpoken: 'O',
    pack: 1,
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
    symbolSpoken: 'C',
    pack: 1,
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
    symbolSpoken: 'N A',
    pack: 1,
    latinSymbol: true,
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
    symbolSpoken: 'C L',
    pack: 1,
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
    symbolSpoken: 'H E',
    pack: 1,
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

  // ─── Pack 2: harder chemistry, ages 4 and up (levels 2–3) ─────────────────
  {
    id: 'N',
    symbol: 'N',
    symbolSpoken: 'N',
    pack: 2,
    name: 'Nitrogen',
    atomicNumber: 7,
    color: '#A9B8FF',
    family: 'gas',
    shape: 'cloud',
    face: 'breathy',
    tags: ['air', 'bubbles', 'light'],
    personality: 'Calm and everywhere. Most of the air is nitrogen.',
    facts: {
      toddler: 'Most of the air is nitrogen!',
      kid: 'Nitrogen is most of the air you breathe, about four parts in five.',
      junior: 'Nitrogen is element 7. N₂ makes up about 78% of the air.',
    },
  },
  {
    id: 'Fe',
    symbol: 'Fe',
    symbolSpoken: 'F E',
    latinSymbol: true,
    pack: 2,
    name: 'Iron',
    atomicNumber: 26,
    color: '#7E8894',
    family: 'metal',
    shape: 'hexagon',
    face: 'sturdy',
    tags: ['strong', 'building', 'dark', 'magnet'],
    personality: 'Strong and magnetic. Holds up bridges.',
    facts: {
      toddler: 'Iron is strong, and magnets love it!',
      kid: 'Iron is a strong metal. Magnets stick to it, and your blood uses it too.',
      junior: 'Iron is element 26. Its symbol Fe comes from its Latin name, ferrum.',
    },
  },
  {
    id: 'Mg',
    symbol: 'Mg',
    symbolSpoken: 'M G',
    pack: 2,
    name: 'Magnesium',
    atomicNumber: 12,
    color: '#CFE3E8',
    family: 'metal',
    shape: 'triangle',
    face: 'eager',
    tags: ['fire', 'light'],
    personality: 'Light and fiery. Burns with a dazzling white flash.',
    facts: {
      toddler: 'Magnesium burns super bright!',
      kid: 'Magnesium is a light metal that burns with a dazzling white light.',
      junior: 'Magnesium is element 12. It is in fireworks, and in the green of every leaf.',
    },
  },
  {
    id: 'S',
    symbol: 'S',
    symbolSpoken: 'S',
    pack: 2,
    name: 'Sulfur',
    atomicNumber: 16,
    color: '#E6E05A',
    family: 'nonmetal',
    shape: 'rhombus',
    face: 'sneaky',
    tags: ['yellow', 'fire', 'smelly'],
    personality: 'Yellow and a bit smelly. Loves volcanoes.',
    facts: {
      toddler: 'Sulfur is yellow and smelly!',
      kid: 'Sulfur is a yellow element found near volcanoes.',
      junior: 'Sulfur is element 16. It burns with a blue flame.',
    },
  },
  {
    id: 'Cu',
    symbol: 'Cu',
    symbolSpoken: 'C U',
    latinSymbol: true,
    pack: 2,
    name: 'Copper',
    atomicNumber: 29,
    color: '#D9825B',
    family: 'metal',
    shape: 'heart',
    face: 'eager',
    tags: ['shiny', 'green', 'wire'],
    personality: 'Warm and shiny. Carries electricity through wires.',
    facts: {
      toddler: 'Copper is in wires and pennies!',
      kid: 'Copper carries electricity in wires. Old copper turns green.',
      junior: 'Copper is element 29. Cu comes from its Latin name, cuprum.',
    },
  },
  {
    id: 'Au',
    symbol: 'Au',
    symbolSpoken: 'A U',
    latinSymbol: true,
    pack: 2,
    name: 'Gold',
    atomicNumber: 79,
    color: '#E0A526',
    family: 'metal',
    shape: 'bar',
    face: 'giggly',
    tags: ['shiny', 'treasure'],
    personality: 'Shiny and calm. Almost never changes.',
    facts: {
      toddler: 'Gold is shiny treasure!',
      kid: 'Gold almost never reacts, so it stays shiny for thousands of years.',
      junior: 'Gold is element 79. Au comes from its Latin name, aurum.',
    },
  },
]

export const ELEMENT_MAP: Record<string, Element> = Object.fromEntries(
  ELEMENTS.map((e) => [e.id, e]),
)

export function normalizeKey(inputs: readonly string[]): string {
  return [...inputs].sort().join('+')
}

// ─── Discoveries: nine starter stickers, eleven more in pack 2 ──────────────
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

  // ─── Pack 2 ────────────────────────────────────────────────────────────────
  {
    id: 'nitrogen-gas',
    inputs: ['N', 'N'],
    kind: 'element',
    result: { displayName: 'Nitrogen gas', spoken: 'Nitrogen', word: 'Air', formulaSpoken: 'N two', formula: 'N₂', art: 'air', color: '#A9B8FF' },
    facts: {
      toddler: 'Most of the air!',
      kid: 'Two nitrogens holding hands make nitrogen gas, most of the air around you.',
      junior: 'N₂ has a triple bond, one of the strongest there is. That is why it rarely reacts.',
    },
    celebration: 'medium',
    plate: 10,
  },
  {
    id: 'ammonia',
    inputs: ['N', 'H'],
    kind: 'compound',
    result: { displayName: 'Ammonia', spoken: 'Ammonia', word: 'Cleaner', formulaSpoken: 'N H three', formula: 'NH₃', art: 'spray', color: '#BFE3F2' },
    facts: {
      toddler: 'Sniff! Stinky clean!',
      kid: 'Ammonia is a compound of nitrogen and hydrogen. It is in some cleaners and in plant food.',
      junior: 'NH₃ is made in huge amounts. Most of it becomes fertiliser for farms.',
    },
    celebration: 'medium',
    plate: 11,
  },
  {
    id: 'laughing-gas',
    inputs: ['N', 'O'],
    kind: 'compound',
    result: { displayName: 'Laughing gas', spoken: 'Laughing gas', word: 'Giggle', formulaSpoken: 'N two O', formula: 'N₂O', art: 'giggle', color: '#FFD1E8' },
    facts: {
      toddler: 'Hee hee!',
      kid: 'Laughing gas is a compound of nitrogen and oxygen. Dentists use it to help people relax.',
      junior: 'N₂O is nitrous oxide. Nitrogen and oxygen can also make NO and NO₂.',
    },
    celebration: 'large',
    plate: 12,
  },
  {
    id: 'rust',
    inputs: ['Fe', 'O'],
    kind: 'compound',
    result: { displayName: 'Rust', spoken: 'Rust', word: 'Rust', formulaSpoken: 'F E two O three', formula: 'Fe₂O₃', art: 'rust', color: '#B5562E' },
    facts: {
      toddler: 'Old and orange!',
      kid: 'Rust is iron oxide. Iron slowly joins with oxygen when it gets wet.',
      junior: 'Rust is mostly Fe₂O₃. Water speeds it up, which is why a bike left in the rain rusts.',
    },
    celebration: 'medium',
    plate: 13,
  },
  {
    id: 'steel',
    inputs: ['Fe', 'C'],
    kind: 'mixture',
    result: { displayName: 'Steel', spoken: 'Steel', word: 'Bridge', formulaSpoken: 'iron with a little carbon', formula: 'Fe + C', art: 'steel', color: '#8FA0B0' },
    facts: {
      toddler: 'Super strong!',
      kid: 'Steel is iron with a little carbon mixed in. It is a mixture, not a compound.',
      junior: 'Steel is an alloy: a mixture, so it has no formula of its own. A little carbon makes iron much harder.',
    },
    celebration: 'large',
    plate: 14,
  },
  {
    id: 'fools-gold',
    inputs: ['Fe', 'S'],
    kind: 'compound',
    result: { displayName: 'Fool’s gold', spoken: 'Fool’s gold', word: 'Cube', formulaSpoken: 'F E S two', formula: 'FeS₂', art: 'pyrite', color: '#D4B24C' },
    facts: {
      toddler: 'Shiny cubes!',
      kid: 'Fool’s gold is a compound of iron and sulfur. It looks like gold, but it is not.',
      junior: 'Fool’s gold is pyrite, FeS₂. It grows in rocks as shiny cubes.',
    },
    celebration: 'large',
    plate: 15,
  },
  {
    id: 'magnesium-oxide',
    inputs: ['Mg', 'O'],
    kind: 'compound',
    result: { displayName: 'Magnesium oxide', spoken: 'Magnesium oxide', word: 'Flash', formulaSpoken: 'M G O', formula: 'MgO', art: 'flash', color: '#F4F4F8' },
    facts: {
      toddler: 'Flash! So bright!',
      kid: 'Magnesium oxide is a compound of magnesium and oxygen. Burning magnesium makes it in a bright white flash.',
      junior: 'MgO is the white powder left after magnesium burns in air.',
    },
    celebration: 'large',
    plate: 16,
  },
  {
    id: 'magnesium-chloride',
    inputs: ['Mg', 'Cl'],
    kind: 'compound',
    result: { displayName: 'Magnesium chloride', spoken: 'Bath flakes', word: 'Bath', formulaSpoken: 'M G C L two', formula: 'MgCl₂', art: 'flakes', color: '#E3F1F7' },
    facts: {
      toddler: 'Bath flakes!',
      kid: 'Magnesium chloride is a compound of magnesium and chlorine. People put its flakes in bath water.',
      junior: 'MgCl₂ is taken from seawater. It is also used to make magnesium metal.',
    },
    celebration: 'medium',
    plate: 17,
  },
  {
    id: 'copper-oxide',
    inputs: ['Cu', 'O'],
    kind: 'compound',
    result: { displayName: 'Copper oxide', spoken: 'Copper oxide', word: 'Penny', formulaSpoken: 'C U O', formula: 'CuO', art: 'penny', color: '#5A4A48' },
    facts: {
      toddler: 'Dark penny!',
      kid: 'Copper oxide is a compound of copper and oxygen. Copper heated in air turns black with it.',
      junior: 'CuO is black. The green on old copper roofs is a different copper compound.',
    },
    celebration: 'medium',
    plate: 18,
  },
  {
    id: 'copper-chloride',
    inputs: ['Cu', 'Cl'],
    kind: 'compound',
    result: { displayName: 'Copper chloride', spoken: 'Copper chloride', word: 'Firework', formulaSpoken: 'C U C L two', formula: 'CuCl₂', art: 'firework', color: '#4FC9B0' },
    facts: {
      toddler: 'Blue-green sparkle!',
      kid: 'Copper chloride is a compound of copper and chlorine. It makes blue-green colours in fireworks.',
      junior: 'CuCl₂ turns a flame blue-green: heated copper gives off light of that colour.',
    },
    celebration: 'large',
    plate: 19,
  },
  {
    id: 'rose-gold',
    inputs: ['Au', 'Cu'],
    kind: 'mixture',
    result: { displayName: 'Rose gold', spoken: 'Rose gold', word: 'Ring', formulaSpoken: 'gold with copper', formula: 'Au + Cu', art: 'ring', color: '#E8A58C' },
    facts: {
      toddler: 'Pink gold!',
      kid: 'Rose gold is gold with copper mixed in. It is a mixture, not a compound.',
      junior: 'Rose gold is an alloy. The more copper, the pinker it is.',
    },
    celebration: 'medium',
    plate: 20,
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
  // Pack 2
  { inputs: ['C', 'N'], name: 'Cyanogen', formula: '(CN)₂', why: 'It is a poisonous gas.' },
  { inputs: ['Na', 'N'], name: 'Sodium azide', formula: 'NaN₃', why: 'It is the poisonous powder that fills car airbags.' },
  { inputs: ['N', 'Cl'], name: 'Nitrogen trichloride', formula: 'NCl₃', why: 'It can explode.' },
  { inputs: ['Fe', 'Cl'], name: 'Iron chloride', formula: 'FeCl₃', why: 'It eats into metal, so grown-ups use it to etch circuit boards.' },
  { inputs: ['Au', 'Cl'], name: 'Gold chloride', formula: 'AuCl₃', why: 'It is a harsh chemical that burns skin.' },
  { inputs: ['Mg', 'H'], name: 'Magnesium hydride', formula: 'MgH₂', why: 'It fizzes and burns when it touches water.' },
  { inputs: ['H', 'S'], name: 'Hydrogen sulfide', formula: 'H₂S', why: 'It is a poisonous gas that smells of rotten eggs.' },
  { inputs: ['S', 'O'], name: 'Sulfur dioxide', formula: 'SO₂', why: 'It is a choking gas that volcanoes puff out.' },
  { inputs: ['C', 'S'], name: 'Carbon disulfide', formula: 'CS₂', why: 'It is a poisonous liquid that catches fire easily.' },
  { inputs: ['S', 'Cl'], name: 'Sulfur dichloride', formula: 'SCl₂', why: 'It is a harsh liquid that burns skin.' },
  { inputs: ['Na', 'S'], name: 'Sodium sulfide', formula: 'Na₂S', why: 'It turns into a strong lye in water.' },
]
export const SPICY_MAP: Record<string, SpicyPair> = Object.fromEntries(
  SPICY.map((s) => [normalizeKey(s.inputs), s]),
)

export const NOBLE_GAS_IDS = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn']

/**
 * Gold with these does not react under any conditions a child could picture,
 * so Puffy says it stays shiny. Gold with chlorine is spicy (AuCl₃), gold with
 * copper is rose gold, and gold with the metals is on the NOT_YET list.
 */
export const NOBLE_METAL_PAIRS: Record<string, string[]> = { Au: ['H', 'O', 'N', 'C', 'S'] }

/**
 * Pairs that answer "Puffy doesn't know that one yet". Each is listed on
 * purpose: engine.test.ts fails if any pair falls through to "unknown"
 * without being here. Several do make real substances (iron nitride, copper
 * sulfide, magnesium sulfide...); they are left for a later pack rather than
 * called "not real".
 */
export const NOT_YET: [string, string][] = [
  ['N', 'Fe'], ['N', 'Cu'], ['N', 'Mg'], ['N', 'S'],
  ['Fe', 'H'], ['Fe', 'Na'], ['Fe', 'Cu'], ['Fe', 'Au'], ['Fe', 'Mg'],
  ['Cu', 'H'], ['Cu', 'C'], ['Cu', 'Na'], ['Cu', 'Mg'], ['Cu', 'S'],
  ['Au', 'Na'], ['Au', 'Mg'],
  ['Mg', 'C'], ['Mg', 'Na'], ['Mg', 'S'],
]

/** The snacks and discoveries a level can meet: the starter pack below age 4, both packs from 4. */
export function packFor(level: Level): 1 | 2 {
  return level >= 2 ? 2 : 1
}
export function elementsFor(level: Level): Element[] {
  return ELEMENTS.filter((e) => e.pack <= packFor(level))
}
export function combosFor(level: Level): Combo[] {
  const pack = packFor(level)
  return COMBOS.filter((c) => c.inputs.every((i) => ELEMENT_MAP[i].pack <= pack))
}

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
  | 'crown'
  | 'banana'
  | 'squiggle'

// Every "nope" pair is helium plus one other snack, so two ideas per pair.
// Pack 2 snacks reuse these through their tags, plus a crown and a banana.
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
  // Pack 2 (helium with gold, helium with sulfur)
  { tags: ['float', 'treasure'], noun: 'Flying crown', word: 'Crown', phrase: 'a flying crown', art: 'crown' },
  { tags: ['balloon', 'yellow'], noun: 'Banana balloon', word: 'Banana', phrase: 'a banana balloon', art: 'banana' },
]

export const FALLBACK_IDEA: TagNoun = { tags: ['', ''], noun: 'Silly thing', word: 'Silly', phrase: 'something silly', art: 'squiggle' }

// ─── The narrator, level by level ───────────────────────────────────────────
// Level 0 (age 1) single words. Level 1 (2–3) one to three words. Level 2
// (4–5) short sentences. Level 3 (6–8) explanations. Sentence builders that
// combine these with a discovery live in game/lines.ts.
export interface VoiceBank {
  intro: string
  feedPuffy: string
  bookFound: string
  bookEmpty: string
  sleep: string
  unknown: string
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
    bookFound: 'Look!',
    bookEmpty: 'Snacks!',
    sleep: 'Night night!',
    unknown: 'Hmm?',
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
    bookFound: 'Look! Your stickers!',
    bookEmpty: 'Go find snacks!',
    sleep: 'Puffy is sleepy. Night night!',
    unknown: 'Hmm? Don’t know!',
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
    bookFound: 'Look at all the things you made!',
    bookEmpty: 'Let’s go make something!',
    sleep: 'Puffy is sleepy now. Let’s play again later!',
    unknown: 'Hmm, Puffy doesn’t know that one yet!',
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
    bookFound: 'Here is everything you have discovered.',
    bookEmpty: 'No discoveries yet. Let’s start experimenting!',
    sleep: 'Puffy is tired. Time for a break!',
    unknown: 'Hmm, Puffy doesn’t know that reaction yet.',
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

import type { Element, Combo } from '../game/types'

// ─── Elements: Starter pack (Mode 0, ages 2–3) ──────────────────────────────
export const ELEMENTS: Element[] = [
  {
    id: 'H',
    symbol: 'H',
    name: 'Hydrogen',
    atomicNumber: 1,
    color: '#7FD4FF',
    shape: 'round-bouncy',
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
    shape: 'round-breathy',
    tags: ['breathe', 'fire', 'bubbles', 'rust'],
    personality: 'Breathy and bubbly, always surrounded by tiny bubbles.',
    facts: {
      toddler: 'Oxygen is the air you breathe!',
      kid: 'Oxygen helps fires burn and helps you breathe.',
      junior: 'Oxygen is element 8. About a fifth of the air is O₂.',
    },
  },
  {
    id: 'C',
    symbol: 'C',
    name: 'Carbon',
    atomicNumber: 6,
    color: '#4A4A4A',
    shape: 'blocky',
    tags: ['strong', 'building', 'life', 'dark'],
    personality: 'Strong and steady. Builds everything living.',
    facts: {
      toddler: 'Carbon is inside you and in pencils!',
      kid: 'Carbon is in every living thing, and in pencil lead.',
      junior: 'Carbon is element 6. It makes four bonds — the backbone of life.',
    },
  },
  {
    id: 'N',
    symbol: 'N',
    name: 'Nitrogen',
    atomicNumber: 7,
    color: '#A0C4FF',
    shape: 'round-calm',
    tags: ['cool', 'calm', 'air', 'sleepy'],
    personality: 'Cool, calm, a little sleepy. Most of the air is nitrogen.',
    facts: {
      toddler: 'Nitrogen is most of the air around you!',
      kid: 'Almost four fifths of the air is nitrogen.',
      junior: 'Nitrogen is element 7. It makes up about 78% of the atmosphere.',
    },
  },
  {
    id: 'Na',
    symbol: 'Na',
    name: 'Sodium',
    atomicNumber: 11,
    color: '#FFD966',
    shape: 'square-eager',
    tags: ['eager', 'salty', 'spark', 'soft'],
    personality: 'Eager, salty, a tiny bit sparky. Loves to react!',
    facts: {
      toddler: 'Sodium is the salty part of salt!',
      kid: 'Sodium is a soft metal — you can cut it with a knife.',
      junior: 'Sodium is element 11. It reacts fiercely with water.',
    },
  },
  {
    id: 'Cl',
    symbol: 'Cl',
    name: 'Chlorine',
    atomicNumber: 17,
    color: '#7FD48F',
    shape: 'round-mischief',
    tags: ['clean', 'green', 'sneaky', 'sharp'],
    personality: 'Clean, green, a little sneaky. Keeps pools sparkly.',
    facts: {
      toddler: 'Chlorine keeps swimming pools clean!',
      kid: 'Chlorine is a greenish gas that cleans water.',
      junior: 'Chlorine is element 17. It is a halogen that disinfects water.',
    },
  },
]

export const ELEMENT_MAP: Record<string, Element> = Object.fromEntries(
  ELEMENTS.map((e) => [e.id, e]),
)

// ─── Combos: 10 real combos for the starter pack ────────────────────────────
export const COMBOS: Combo[] = [
  {
    id: 'water',
    inputs: ['H', 'O'],
    matchMode: 'any-order',
    result: {
      displayName: 'Water',
      formula: 'H₂O',
      animation: 'water_splash',
      color: '#4FC3F7',
    },
    facts: {
      toddler: 'Water! You drink it, splash it, swim in it!',
      kid: 'Water is H two O. Two hydrogens and one oxygen.',
      junior: 'Water is polar. That is why ice floats.',
    },
    celebration: 'medium',
    unlocksSticker: true,
  },
  {
    id: 'hydrogen-gas',
    inputs: ['H', 'H'],
    matchMode: 'any-order',
    result: {
      displayName: 'Hydrogen gas',
      formula: 'H₂',
      animation: 'balloon_float',
      color: '#B3E5FC',
    },
    facts: {
      toddler: 'Hydrogen gas floats up, up, up!',
      kid: 'Two hydrogens make hydrogen gas. It fills balloons!',
      junior: 'H₂ is the lightest gas. Rockets burn it with oxygen.',
    },
    celebration: 'small',
    unlocksSticker: true,
  },
  {
    id: 'oxygen-gas',
    inputs: ['O', 'O'],
    matchMode: 'any-order',
    result: {
      displayName: 'Oxygen gas',
      formula: 'O₂',
      animation: 'deep_breath',
      color: '#81D4FA',
    },
    facts: {
      toddler: 'Oxygen gas! Take a deep breath!',
      kid: 'Two oxygens make the air you breathe.',
      junior: 'O₂ makes up about 21% of the atmosphere.',
    },
    celebration: 'small',
    unlocksSticker: true,
  },
  {
    id: 'nitrogen-gas',
    inputs: ['N', 'N'],
    matchMode: 'any-order',
    result: {
      displayName: 'Nitrogen gas',
      formula: 'N₂',
      animation: 'blue_mist',
      color: '#A0C4FF',
    },
    facts: {
      toddler: 'Nitrogen gas! Cool, misty air!',
      kid: 'Two nitrogens make most of the air around you.',
      junior: 'N₂ is very stable. That is why it rarely reacts.',
    },
    celebration: 'small',
    unlocksSticker: true,
  },
  {
    id: 'salt',
    inputs: ['Na', 'Cl'],
    matchMode: 'any-order',
    result: {
      displayName: 'Salt',
      formula: 'NaCl',
      animation: 'salt_shaker',
      color: '#F5F5F5',
    },
    facts: {
      toddler: 'Salt! Crunchy and salty!',
      kid: 'Sodium plus chlorine makes table salt!',
      junior: 'NaCl is an ionic crystal. It dissolves into Na⁺ and Cl⁻.',
    },
    celebration: 'medium',
    unlocksSticker: true,
  },
  {
    id: 'carbon-dioxide',
    inputs: ['C', 'O'],
    matchMode: 'any-order',
    result: {
      displayName: 'Carbon dioxide',
      formula: 'CO₂',
      animation: 'bubbles_out',
      color: '#B0BEC5',
    },
    facts: {
      toddler: 'Carbon dioxide! Bubbles in fizzy drinks!',
      kid: 'Carbon and oxygen make the bubbles you breathe out.',
      junior: 'CO₂ is what you exhale. Plants use it to grow.',
    },
    celebration: 'medium',
    unlocksSticker: true,
  },
  {
    id: 'ammonia',
    inputs: ['H', 'N'],
    matchMode: 'any-order',
    result: {
      displayName: 'Ammonia',
      formula: 'NH₃',
      animation: 'clean_sparkle',
      color: '#C8E6C9',
    },
    facts: {
      toddler: 'Ammonia! Squeaky clean sparkle!',
      kid: 'Hydrogen and nitrogen make a strong cleaner smell.',
      junior: 'NH₃ is a base. Farmers use it in fertilizer.',
    },
    celebration: 'small',
    unlocksSticker: true,
  },
  {
    id: 'hydrochloric-acid',
    inputs: ['H', 'Cl'],
    matchMode: 'any-order',
    result: {
      displayName: 'Hydrochloric acid',
      formula: 'HCl',
      animation: 'fizzy',
      color: '#DCE775',
    },
    facts: {
      toddler: 'Fizzy bubbles! Your tummy makes this to digest food!',
      kid: 'Hydrogen and chlorine make a fizz that helps digest food.',
      junior: 'HCl is the acid in your stomach. It breaks down food.',
    },
    celebration: 'medium',
    unlocksSticker: true,
  },
  {
    id: 'sodium-oxide',
    inputs: ['Na', 'O'],
    matchMode: 'any-order',
    result: {
      displayName: 'Sodium oxide',
      formula: 'Na₂O',
      animation: 'powder_puff',
      color: '#FFFFFF',
    },
    facts: {
      toddler: 'White powder puff! Poof!',
      kid: 'Sodium and oxygen make a soft white powder.',
      junior: 'Na₂O is a basic oxide. It reacts with water.',
    },
    celebration: 'small',
    unlocksSticker: true,
  },
  {
    id: 'methane',
    inputs: ['C', 'H'],
    matchMode: 'any-order',
    result: {
      displayName: 'Methane',
      formula: 'CH₄',
      animation: 'little_flame',
      color: '#FFB74D',
    },
    facts: {
      toddler: 'Methane! A tiny warm flame!',
      kid: 'Carbon and hydrogen make the gas that cooks food.',
      junior: 'CH₄ is the main part of natural gas.',
    },
    celebration: 'medium',
    unlocksSticker: true,
  },
]

export const COMBO_MAP: Record<string, Combo> = Object.fromEntries(
  COMBOS.map((c) => [normalizeKey(c.inputs), c]),
)

export function normalizeKey(inputs: string[]): string {
  return [...inputs].sort().join('+')
}

// ─── Invalid combo engine: template banks ───────────────────────────────────
export interface TagNoun {
  tags: [string, string]
  nouns: string[]
}

export const TAG_NOUNS: TagNoun[] = [
  { tags: ['light', 'shiny'], nouns: ['a floating gold balloon'] },
  { tags: ['heavy', 'shiny'], nouns: ['a very expensive paperweight'] },
  { tags: ['heavy', 'float'], nouns: ['a sinking balloon'] },
  { tags: ['strong', 'soft'], nouns: ['a pillow made of iron'] },
  { tags: ['tiny', 'heavy'], nouns: ['a pocket-sized anvil'] },
  { tags: ['fuel', 'water'], nouns: ['a burning puddle'] },
  { tags: ['breathe', 'shine'], nouns: ['a glowing breath'] },
  { tags: ['light', 'fire'], nouns: ['a flying campfire'] },
  { tags: ['float', 'fire'], nouns: ['a hot-air balloon on fire'] },
  { tags: ['float', 'strong'], nouns: ['a floating castle'] },
  { tags: ['float', 'dark'], nouns: ['a rain cloud that never rains'] },
  { tags: ['tiny', 'fire'], nouns: ['a candle that fits in your ear'] },
  { tags: ['water', 'fire'], nouns: ['a boiling swimming pool'] },
  { tags: ['water', 'rust'], nouns: ['a rusty water fountain'] },
  { tags: ['water', 'breathe'], nouns: ['breathable soup'] },
  { tags: ['water', 'bubbles'], nouns: ['a bubble bath for fish'] },
  { tags: ['water', 'life'], nouns: ['a soup that grows legs'] },
  { tags: ['water', 'calm'], nouns: ['a very relaxed ocean'] },
  { tags: ['fuel', 'breathe'], nouns: ['a burp-powered rocket'] },
  { tags: ['fuel', 'bubbles'], nouns: ['a soda-powered race car'] },
  { tags: ['fuel', 'strong'], nouns: ['an unbreakable bonfire'] },
  { tags: ['fire', 'clean'], nouns: ['a self-cleaning barbecue'] },
  { tags: ['fire', 'calm'], nouns: ['a campfire that whispers'] },
  { tags: ['fire', 'sleepy'], nouns: ['a pillow that stays warm'] },
  { tags: ['fire', 'sharp'], nouns: ['a knife that toasts bread'] },
  { tags: ['fire', 'salty'], nouns: ['a popcorn machine volcano'] },
  { tags: ['fire', 'spark'], nouns: ['a birthday cake fireworks show'] },
  { tags: ['bubbles', 'clean'], nouns: ['a soap that never stops bubbling'] },
  { tags: ['bubbles', 'salty'], nouns: ['fizzy french fries'] },
  { tags: ['bubbles', 'spark'], nouns: ['a sparkler bubble bath'] },
  { tags: ['bubbles', 'dark'], nouns: ['a mystery bubble that whispers'] },
  { tags: ['bubbles', 'cool'], nouns: ['ice-cold soda rain'] },
  { tags: ['rust', 'clean'], nouns: ['a self-rusting bathtub'] },
  { tags: ['rust', 'salty'], nouns: ['a ship-flavored pretzel'] },
  { tags: ['strong', 'salty'], nouns: ['a salt lick for giants'] },
  { tags: ['strong', 'sharp'], nouns: ['a sword made of spaghetti'] },
  { tags: ['strong', 'calm'], nouns: ['a rock that does yoga'] },
  { tags: ['strong', 'clean'], nouns: ['a weightlifting bar of soap'] },
  { tags: ['strong', 'sleepy'], nouns: ['a mattress made of steel'] },
  { tags: ['building', 'life'], nouns: ['a house that eats dinner'] },
  { tags: ['building', 'clean'], nouns: ['a self-scrubbing skyscraper'] },
  { tags: ['building', 'bubbles'], nouns: ['an apartment full of bubble wrap'] },
  { tags: ['building', 'sharp'], nouns: ['a cheese-grater bridge'] },
  { tags: ['dark', 'clean'], nouns: ['a black hole vacuum cleaner'] },
  { tags: ['dark', 'sharp'], nouns: ['a shadow with teeth'] },
  { tags: ['dark', 'calm'], nouns: ['a very chill cave'] },
  { tags: ['dark', 'salty'], nouns: ['a grumpy ocean at night'] },
  { tags: ['dark', 'air'], nouns: ['a shadow you can breathe'] },
  { tags: ['dark', 'cool'], nouns: ['a popsicle that never melts'] },
  { tags: ['dark', 'spark'], nouns: ['a lightning bug nightlight'] },
  { tags: ['cool', 'calm'], nouns: ['a nap in a refrigerator'] },
  { tags: ['cool', 'sleepy'], nouns: ['a pillow made of snow'] },
  { tags: ['cool', 'air'], nouns: ['an air conditioner for penguins'] },
  { tags: ['cool', 'salty'], nouns: ['frozen pickle juice'] },
  { tags: ['cool', 'sharp'], nouns: ['an ice pick made of ice'] },
  { tags: ['cool', 'clean'], nouns: ['a freezer that smells like lemons'] },
  { tags: ['calm', 'sleepy'], nouns: ['a lullaby made of fog'] },
  { tags: ['calm', 'salty'], nouns: ['a very relaxed pretzel'] },
  { tags: ['calm', 'eager'], nouns: ['a hyperactive sloth'] },
  { tags: ['calm', 'green'], nouns: ['a meditation garden for frogs'] },
  { tags: ['air', 'sleepy'], nouns: ['a yawn you can bottle'] },
  { tags: ['air', 'salty'], nouns: ['a breeze that tastes like chips'] },
  { tags: ['air', 'sharp'], nouns: ['a breeze that cuts sandwiches'] },
  { tags: ['air', 'green'], nouns: ['a wind that smells like pickles'] },
  { tags: ['air', 'eager'], nouns: ['an impatient gust of wind'] },
  { tags: ['sleepy', 'salty'], nouns: ['a nap seasoned with salt'] },
  { tags: ['sleepy', 'soft'], nouns: ['a pillow that snores'] },
  { tags: ['sleepy', 'spark'], nouns: ['a nightlight with hiccups'] },
  { tags: ['sleepy', 'clean'], nouns: ['a blanket that does laundry'] },
  { tags: ['sleepy', 'green'], nouns: ['a moss-covered pillow'] },
  { tags: ['eager', 'salty'], nouns: ['a pretzel that jumps around'] },
  { tags: ['eager', 'clean'], nouns: ['a toothbrush that cannot wait'] },
  { tags: ['eager', 'sharp'], nouns: ['a scissors that runs everywhere'] },
  { tags: ['eager', 'green'], nouns: ['a pickle that does cartwheels'] },
  { tags: ['eager', 'spark'], nouns: ['a firework that goes off early'] },
  { tags: ['salty', 'soft'], nouns: ['a marshmallow that tastes like the sea'] },
  { tags: ['salty', 'green'], nouns: ['seaweed-flavored popcorn'] },
  { tags: ['salty', 'sharp'], nouns: ['a salt-shooter water gun'] },
  { tags: ['soft', 'clean'], nouns: ['a sponge that hugs you back'] },
  { tags: ['soft', 'green'], nouns: ['a fuzzy pickle'] },
  { tags: ['soft', 'sharp'], nouns: ['a cactus pillow'] },
  { tags: ['soft', 'spark'], nouns: ['a pillow with static electricity'] },
  { tags: ['spark', 'clean'], nouns: ['a lightning-powered dishwasher'] },
  { tags: ['spark', 'sharp'], nouns: ['a thunderbolt letter opener'] },
  { tags: ['spark', 'green'], nouns: ['an electric pickle'] },
  { tags: ['spark', 'sneaky'], nouns: ['a sneaky static shock'] },
  { tags: ['clean', 'green'], nouns: ['a soap bubble jungle'] },
  { tags: ['clean', 'sharp'], nouns: ['a razor made of soap'] },
  { tags: ['clean', 'sneaky'], nouns: ['a soap that hides from dirt'] },
  { tags: ['green', 'sharp'], nouns: ['a blade of grass that cuts grass'] },
  { tags: ['green', 'sneaky'], nouns: ['a pickle in disguise'] },
  { tags: ['sneaky', 'sharp'], nouns: ['a ninja needle'] },
]

export const USE_TEMPLATES = [
  'It could be used for {use}!',
  'Great for {use}!',
  'Imagine it at {place}!',
  'Perfect for {use}!',
]

export const USES = [
  'a gold parade',
  'decorating clouds',
  'a birthday party',
  'napping knights',
  'a dragon’s kitchen',
  'a squirrel talent show',
  'the world’s tiniest circus',
  'a very fancy sandwich',
  'cloud school show-and-tell',
  'a penguin pool party',
  'the moon’s grand opening',
]

export const THINKING_LINES = [
  'Hmmm…',
  'Let me see…',
  'Ooh, what’s this…',
  'Hmm hmm hmm…',
  'Wait a second…',
]

export const REJECTION_LINES = [
  'But nope!',
  'But that’s not real!',
  'But it doesn’t work!',
  'But no way!',
]

export const ENCOURAGEMENT_LINES = [
  'Oh no, try again!',
  'Oh no, let’s try another one!',
  'Oh no, what else?',
  'Oh no, one more time!',
]

export const CELEBRATION_SMALL = ['Yeaah!', 'Nice!', 'You got it!', 'Woo!']

export const CELEBRATION_PRAISE = ['You discovered', 'You made', 'Look at that']

export const NOBLE_GAS_LINES = [
  '{name} doesn’t like to hold hands with anyone. It’s a loner!',
]

export const NOBLE_METAL_LINES = [
  '{name} is very fancy. It doesn’t mix with just anything!',
]

export const NOBLE_GAS_IDS = ['He', 'Ne', 'Ar']
export const NOBLE_METAL_IDS = ['Au', 'Pt']

export const IDLE_LINES = [
  'Puffy is still hungry!',
  'Got more snacks?',
  'What should we try?',
  'Puffy wants a yummy snack!',
]

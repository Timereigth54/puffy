// Screenshots of the learning ladder and pack 2 for review, into ../.impeccable/review/.
// Needs a production preview on :4173 (npm run build && npx vite preview --port 4173).
// Run: node tools/capture-ladder.mjs
import { chromium, webkit } from '@playwright/test'

const OUT = '../.impeccable/review/'
const ALL = ['water', 'hydrogen-gas', 'oxygen-gas', 'carbon-dioxide', 'salt', 'methane', 'diamond', 'hydrochloric-acid', 'helium-gas',
  'nitrogen-gas', 'ammonia', 'laughing-gas', 'rust', 'steel', 'fools-gold', 'magnesium-oxide', 'magnesium-chloride', 'copper-oxide', 'copper-chloride', 'rose-gold',
  'iron-nitride', 'magnesium-nitride', 'copper-sulfide', 'blue-gold']
const known = { stage: 'known', teachHits: 3, recent: [] }

async function open(browser, w, h, settings, progress) {
  const p = await browser.newPage({ viewport: { width: w, height: h } })
  await p.addInitScript(([s, pr]) => {
    localStorage.setItem('puffy.settings', JSON.stringify({ voiceOn: false, ...s }))
    localStorage.setItem('puffy.progress', JSON.stringify({ onboarded: true, childName: 'Ada', ...pr }))
  }, [settings, progress])
  await p.goto('http://localhost:4173/')
  await p.waitForTimeout(2200)
  return p
}
const play = async (p) => {
  await p.getByRole('button', { name: 'Play' }).click({ force: true })
  await p.waitForTimeout(1800)
}

const wk = await webkit.launch()
// A toddler's first tub, three snacks, then Puffy's first ask
let p = await open(wk, 1180, 820, { childAge: 3, level: 1 }, { arrived: [] })
await play(p)
await p.screenshot({ path: OUT + 'ladder-toddler-three.png' })
await p.getByRole('button', { name: 'Hydrogen' }).click({ force: true })
await p.getByRole('button', { name: 'Oxygen' }).click({ force: true })
await p.locator('.thought--crave').waitFor({ timeout: 15000 })
await p.waitForTimeout(800)
await p.screenshot({ path: OUT + 'ladder-ask-letter.png' })
await p.close()

// Numbers: letters known for H, O, C, so Puffy teaches numbers (dots up to ten)
const lettersKnown = { H: { name: known, letter: known }, O: { name: known, letter: known }, C: { name: known, letter: known } }
p = await open(wk, 1180, 820, { childAge: 3, level: 1 }, { arrived: ['He'], learning: lettersKnown, discovered: ['water'] })
await play(p)
await p.getByRole('button', { name: 'Hydrogen' }).click({ force: true })
await p.getByRole('button', { name: 'Oxygen' }).click({ force: true })
await p.locator('.thought--crave').waitFor({ timeout: 15000 })
await p.waitForTimeout(800)
await p.screenshot({ path: OUT + 'ladder-ask-number.png' })
await p.close()

// Pack 2: twelve snacks on an iPad, then the twenty-plate book
p = await open(wk, 1180, 820, { childAge: 5, level: 2, snacks: 'all' }, { discovered: ALL })
await play(p)
await p.screenshot({ path: OUT + 'pack2-ipad-play.png' })
await p.getByRole('button', { name: 'Iron' }).click({ force: true })
await p.getByRole('button', { name: 'Sulfur' }).click({ force: true })
await p.locator('.discovery').waitFor({ timeout: 15000 })
await p.waitForTimeout(700)
await p.screenshot({ path: OUT + 'pack2-ipad-discovery.png' })
await p.close()
p = await open(wk, 1180, 820, { childAge: 5, level: 2 }, { discovered: ALL })
await p.getByRole('button', { name: 'Discovery book' }).click({ force: true })
await p.waitForTimeout(1500)
await p.screenshot({ path: OUT + 'pack2-ipad-book.png' })
await p.close()
await wk.close()

const cr = await chromium.launch()
p = await open(cr, 1024, 600, { childAge: 5, level: 2, snacks: 'all' }, {})
await play(p)
await p.screenshot({ path: OUT + 'pack2-fire7-play.png' })
await p.close()
p = await open(cr, 800, 1280, { childAge: 5, level: 2, snacks: 'all' }, {})
await play(p)
await p.screenshot({ path: OUT + 'pack2-portrait-play.png' })
await p.close()
p = await open(cr, 800, 1280, { childAge: 5, level: 2 }, { discovered: ALL })
await p.getByRole('button', { name: 'Discovery book' }).click({ force: true })
await p.waitForTimeout(1500)
await p.screenshot({ path: OUT + 'pack2-portrait-book.png' })
await p.close()
// Grown-ups: the learning table
p = await open(cr, 1180, 820, { childAge: 3, level: 1 }, { arrived: ['He'], learning: { H: { name: known, letter: { stage: 'check', teachHits: 3, recent: [] } }, O: { name: { stage: 'check', teachHits: 3, recent: [] } } } })
await p.getByRole('button', { name: 'Grown-ups' }).click()
const [x, y] = (await p.locator('.gate__q').textContent()).match(/(\d+) \+ (\d+)/).slice(1).map(Number)
for (const d of String(x + y)) await p.getByRole('button', { name: d, exact: true }).click()
await p.getByRole('heading', { name: /is learning/ }).scrollIntoViewIfNeeded()
await p.waitForTimeout(400)
await p.screenshot({ path: OUT + 'ladder-grownups.png' })
await p.close()
await cr.close()
console.log('done')

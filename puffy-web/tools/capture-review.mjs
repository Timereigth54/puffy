// Captures the design-review screenshots into ../.impeccable/review/.
// Needs a production preview on :4173 (npm run build && npx vite preview --port 4173).
// Run: node tools/capture-review.mjs
import { webkit, chromium } from '@playwright/test'
const OUT = '../.impeccable/review/'
async function page(browser, w, h, q = '', mode = 0, discovered = ['water', 'salt', 'diamond']) {
  const p = await browser.newPage({ viewport: { width: w, height: h } })
  await p.addInitScript(([mode, discovered]) => {
    localStorage.setItem('puffy.settings', JSON.stringify({ voiceOn: false, ageMode: mode, textLevel: mode ? 'names' : 'off' }))
    localStorage.setItem('puffy.progress', JSON.stringify({ onboarded: true, childName: 'Ada', discovered, unseenStickers: ['diamond'] }))
  }, [mode, discovered])
  await p.goto('http://localhost:4173/' + q)
  await p.waitForTimeout(2500)
  return p
}
async function drag(p, name) {
  const a = await p.getByRole('button', { name, exact: true }).boundingBox()
  const b = await p.locator('.puffy-anchor').boundingBox()
  await p.mouse.move(a.x + a.width / 2, a.y + a.height / 2); await p.mouse.down()
  await p.mouse.move(b.x + b.width / 2, b.y + b.height * 0.55, { steps: 10 }); await p.mouse.up()
}
const wk = await webkit.launch()
let p = await page(wk, 1180, 820); await p.screenshot({ path: OUT + 'ipad-home.png' })
await p.getByRole('button', { name: 'Play' }).click({ force: true }); await p.waitForTimeout(1200); await p.screenshot({ path: OUT + 'ipad-play.png' })
await drag(p, 'Carbon'); await p.waitForTimeout(500); await drag(p, 'Hydrogen')
await p.locator('.discovery').waitFor({ timeout: 15000 }); await p.waitForTimeout(700); await p.screenshot({ path: OUT + 'ipad-discovery.png' })
await p.close()
p = await page(wk, 1180, 820, '', 1); await p.getByRole('button', { name: 'Play' }).click({ force: true }); await p.waitForTimeout(1200)
await drag(p, 'Helium'); await p.waitForTimeout(500); await drag(p, 'Carbon')
await p.locator('.thought__text').waitFor({ timeout: 15000 }); await p.waitForTimeout(500); await p.screenshot({ path: OUT + 'ipad-thought-mode1.png' })
await p.close()
p = await page(wk, 1180, 820); await p.getByRole('button', { name: 'Discovery book' }).click({ force: true }); await p.waitForTimeout(1500); await p.screenshot({ path: OUT + 'ipad-book.png' })
await p.close(); await wk.close()
const cr = await chromium.launch()
p = await page(cr, 1024, 600, '?lite'); await p.getByRole('button', { name: 'Play' }).click({ force: true }); await p.waitForTimeout(1200); await p.screenshot({ path: OUT + 'fire7-play-lite.png' })
await p.close()
p = await page(cr, 800, 1280); await p.screenshot({ path: OUT + 'tablet-portrait-home.png' }); await p.close()
p = await page(cr, 600, 1024); await p.getByRole('button', { name: 'Play' }).click({ force: true }); await p.waitForTimeout(1200); await p.screenshot({ path: OUT + 'fire7-portrait-play.png' }); await p.close()
p = await page(cr, 1180, 820); await p.getByRole('button', { name: 'Grown-ups' }).click()
const [x, y] = (await p.locator('.gate__q').textContent()).match(/(\d+) \+ (\d+)/).slice(1).map(Number)
for (const d of String(x + y)) await p.getByRole('button', { name: d, exact: true }).click()
await p.waitForTimeout(600); await p.screenshot({ path: OUT + 'ipad-parent.png' }); await p.close()
await cr.close()
console.log('captured')

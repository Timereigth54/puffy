import { expect, test, type Page } from '@playwright/test'

// Voice is turned off in every test so beats run on their silent timings;
// headless browsers have no speech voices and would wait on fallbacks.
async function seed(page: Page, opts: { onboarded?: boolean; settings?: Record<string, unknown> } = {}) {
  await page.addInitScript(
    ({ onboarded, settings }) => {
      if (sessionStorage.getItem('seeded')) return
      sessionStorage.setItem('seeded', '1')
      localStorage.clear()
      localStorage.setItem('puffy.settings', JSON.stringify({ voiceOn: false, ...settings }))
      if (onboarded) localStorage.setItem('puffy.progress', JSON.stringify({ onboarded: true, childName: 'Ada' }))
    },
    { onboarded: opts.onboarded ?? true, settings: opts.settings ?? {} },
  )
  await page.goto('/')
}

async function progress(page: Page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem('puffy.progress') ?? '{}'))
}

/** Drags a snack out of the water and drops it on Puffy with real pointer moves. */
async function feed(page: Page, name: string) {
  const snack = page.getByRole('button', { name, exact: true })
  const from = (await snack.boundingBox())!
  const to = (await page.locator('.puffy-anchor').boundingBox())!
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2)
  await page.mouse.down()
  for (let i = 1; i <= 12; i++) {
    const t = i / 12
    await page.mouse.move(from.x + from.width / 2 + (to.x + to.width / 2 - from.x - from.width / 2) * t, from.y + from.height / 2 + (to.y + to.height * 0.58 - from.y - from.height / 2) * t)
  }
  await page.mouse.up()
}

async function toPlay(page: Page) {
  await page.getByRole('button', { name: 'Play' }).click()
  await expect(page.getByRole('button', { name: 'Hydrogen' })).toBeVisible()
}

test('first launch: wake Puffy, skip the name, land in guided play', async ({ page }) => {
  await seed(page, { onboarded: false })
  await page.getByRole('button', { name: 'Puffy' }).click({ timeout: 15000 })
  await expect(page.getByRole('dialog', { name: /what should Puffy call your child/i })).toBeVisible({ timeout: 15000 })
  await page.getByRole('button', { name: 'Skip for now' }).click()
  await expect(page.getByRole('button', { name: 'Hydrogen' })).toBeVisible({ timeout: 15000 })
  await expect(page.locator('.snack.is-hinted')).toHaveCount(2)
})

test('dragging hydrogen then oxygen discovers water and saves it', async ({ page }) => {
  await seed(page)
  await toPlay(page)
  await feed(page, 'Hydrogen')
  await expect(page.locator('.belly-snack')).toHaveCount(1)
  await feed(page, 'Oxygen')
  await expect(page.locator('[data-outcome="discovery"]')).toBeAttached({ timeout: 15000 })
  await expect.poll(async () => (await progress(page)).discovered, { timeout: 15000 }).toContain('water')
})

test('dropping a snack outside Puffy feeds nothing', async ({ page }) => {
  await seed(page)
  await toPlay(page)
  const snack = (await page.getByRole('button', { name: 'Carbon', exact: true }).boundingBox())!
  await page.mouse.move(snack.x + 40, snack.y + 40)
  await page.mouse.down()
  // Empty wall to the left, well clear of Puffy on every screen size.
  const vp = page.viewportSize()!
  await page.mouse.move(vp.width * 0.1, vp.height * 0.4, { steps: 8 })
  await page.mouse.up()
  await expect(page.locator('.belly-snack')).toHaveCount(0)
})

test('tap-tap: tapping a second snack swaps the held one; tapping Puffy feeds it', async ({ page }) => {
  await seed(page)
  await toPlay(page)
  await page.getByRole('button', { name: 'Sodium' }).click()
  await page.getByRole('button', { name: 'Hydrogen' }).click()
  await expect(page.locator('.snack.is-held')).toHaveAttribute('aria-label', 'Hydrogen')
  await page.getByRole('button', { name: 'Puffy' }).click()
  await expect(page.locator('.belly-snack')).toHaveCount(1)
  await page.getByRole('button', { name: 'Oxygen' }).click()
  await page.getByRole('button', { name: 'Oxygen' }).click() // tapping the held snack again also feeds it
  await expect.poll(async () => (await progress(page)).discovered, { timeout: 15000 }).toContain('water')
})

test('helium with anything gets the soap-bubble silly idea, never a discovery', async ({ page }) => {
  await seed(page, { settings: { textLevel: 'names', ageMode: 1 } })
  await toPlay(page)
  await feed(page, 'Helium')
  await feed(page, 'Carbon')
  await expect(page.locator('[data-outcome="loner"]')).toBeAttached({ timeout: 15000 })
  expect((await progress(page)).discovered ?? []).toHaveLength(0)
})

test('chlorine with chlorine is spicy and named honestly', async ({ page }) => {
  await seed(page, { settings: { textLevel: 'formulas', ageMode: 1 } })
  await toPlay(page)
  await feed(page, 'Chlorine')
  await feed(page, 'Chlorine')
  await expect(page.locator('[data-outcome="spicy"]')).toBeAttached({ timeout: 15000 })
  expect((await progress(page)).discovered ?? []).toHaveLength(0)
})

test('parent gate rejects a wrong sum and opens on the right one', async ({ page }) => {
  await seed(page)
  await page.getByRole('button', { name: 'Grown-ups' }).click()
  const q = page.locator('.gate__q')
  const sum = async () => {
    const [a, b] = (await q.textContent())!.match(/(\d+) \+ (\d+)/)!.slice(1).map(Number)
    return a + b
  }
  // Every sum is 11..15, so "10" is always wrong.
  const first = await sum()
  await page.getByRole('button', { name: '1', exact: true }).click()
  await page.getByRole('button', { name: '0', exact: true }).click()
  await expect(page.locator('.gate__msg')).toBeVisible()
  expect(first).toBeGreaterThan(10)
  for (const digit of String(await sum())) await page.getByRole('button', { name: digit, exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Grown-ups' })).toBeVisible()
  await expect(page.getByText('What Ada found')).toBeVisible()
})

test('when the time limit passes, Puffy falls asleep', async ({ page }) => {
  await seed(page, { settings: { timeLimitMinutes: 0.2 } })
  await toPlay(page)
  await expect(page.locator('.puffy--sleepy')).toBeVisible({ timeout: 30000 })
  await expect(page.getByRole('button', { name: 'Hydrogen' })).toHaveCount(0)
})

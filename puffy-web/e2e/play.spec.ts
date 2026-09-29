import { expect, test, type Page } from '@playwright/test'

// Voice is turned off in every test so beats run on their silent timings;
// headless browsers have no speech voices and would wait on fallbacks.
async function seed(page: Page, opts: { onboarded?: boolean; settings?: Record<string, unknown>; progress?: Record<string, unknown> } = {}) {
  await page.addInitScript(
    ({ onboarded, settings, extra }) => {
      if (sessionStorage.getItem('seeded')) return
      sessionStorage.setItem('seeded', '1')
      localStorage.clear()
      localStorage.setItem('puffy.settings', JSON.stringify({ voiceOn: false, childAge: onboarded ? 3 : null, ...settings }))
      if (onboarded) localStorage.setItem('puffy.progress', JSON.stringify({ onboarded: true, childName: 'Ada', ...extra }))
    },
    { onboarded: opts.onboarded ?? true, settings: opts.settings ?? {}, extra: opts.progress ?? {} },
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

test('first launch: wake Puffy, pick an age, land in guided play at that level', async ({ page }) => {
  await seed(page, { onboarded: false })
  await page.getByRole('button', { name: 'Puffy' }).click({ timeout: 15000 })
  await expect(page.getByRole('dialog', { name: /how old is your child/i })).toBeVisible({ timeout: 15000 })
  await page.getByRole('radio', { name: '5', exact: true }).click()
  await expect(page.getByText(/Element Friends/)).toBeVisible()
  await page.getByRole('button', { name: /Let.s play/ }).click()
  await expect(page.getByRole('button', { name: 'Hydrogen' })).toBeVisible({ timeout: 15000 })
  await expect(page.locator('.snack.is-hinted')).toHaveCount(2)
  const settings = await page.evaluate(() => JSON.parse(localStorage.getItem('puffy.settings') ?? '{}'))
  expect(settings).toMatchObject({ childAge: 5, level: 2 })
  // Element Friends shows element symbols on the snacks
  await expect(page.locator('.float-slot .snack-symbol').first()).toBeVisible()
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

test('one tap sends a snack flying into Puffy; two taps make water', async ({ page }) => {
  await seed(page)
  await toPlay(page)
  await page.getByRole('button', { name: 'Hydrogen' }).click()
  await expect(page.locator('.belly-snack')).toHaveCount(1, { timeout: 5000 })
  await page.getByRole('button', { name: 'Oxygen' }).click()
  await expect.poll(async () => (await progress(page)).discovered, { timeout: 15000 }).toContain('water')
})

test('a third tap while Puffy is full feeds nothing extra', async ({ page }) => {
  await seed(page)
  await toPlay(page)
  await page.getByRole('button', { name: 'Hydrogen' }).click()
  await page.getByRole('button', { name: 'Carbon' }).click()
  await page.getByRole('button', { name: 'Sodium' }).click()
  await expect.poll(async () => Object.values((await progress(page)).feedCounts ?? {}).reduce((a: number, b) => a + (b as number), 0), { timeout: 8000 }).toBe(2)
})

test('age 1 shows no words; age 7 shows the formula on a discovery', async ({ page }) => {
  await seed(page, { settings: { childAge: 1, level: 0 } })
  await toPlay(page)
  await expect(page.locator('.snack-symbol')).toHaveCount(0)
  await page.evaluate(() => {
    localStorage.setItem('puffy.settings', JSON.stringify({ voiceOn: false, childAge: 7, level: 3 }))
  })
  await page.reload()
  await toPlay(page)
  await page.getByRole('button', { name: 'Hydrogen' }).click()
  await page.getByRole('button', { name: 'Oxygen' }).click()
  await expect(page.locator('.discovery__formula')).toHaveText('H₂O', { timeout: 15000 })
})

test('helium with anything gets the soap-bubble silly idea, never a discovery', async ({ page }) => {
  await seed(page, { settings: { childAge: 4, level: 2 } })
  await toPlay(page)
  await feed(page, 'Helium')
  await feed(page, 'Carbon')
  await expect(page.locator('[data-outcome="loner"]')).toBeAttached({ timeout: 15000 })
  expect((await progress(page)).discovered ?? []).toHaveLength(0)
})

test('chlorine with chlorine is spicy and named honestly', async ({ page }) => {
  await seed(page, { settings: { childAge: 7, level: 3 } })
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

// ─── Learning ladder and pack 2 ─────────────────────────────────────────────
const snacks = (page: Page) => page.locator('.float-slot')

test('a new toddler starts with three snacks, and Puffy asks for one after the first turn', async ({ page }) => {
  await seed(page, { progress: { arrived: [] } })
  await toPlay(page)
  await expect(snacks(page)).toHaveCount(3)
  await page.getByRole('button', { name: 'Hydrogen' }).click()
  await page.getByRole('button', { name: 'Oxygen' }).click()
  await expect.poll(async () => (await progress(page)).discovered, { timeout: 15000 }).toContain('water')
  // With the narrator off, names are skipped: Puffy asks for letters, answer visible (teach).
  const stage = page.locator('.play-stage')
  await expect(stage).toHaveAttribute('data-ask', /^(H|O|C):letter:teach$/, { timeout: 10000 })
  await expect(page.getByRole('button', { name: 'What Puffy wants' })).toBeVisible()
  const want = (await stage.getAttribute('data-ask'))!.split(':')[0]
  const name = { H: 'Hydrogen', O: 'Oxygen', C: 'Carbon' }[want]!
  await page.getByRole('button', { name, exact: true }).click()
  await expect.poll(async () => (await progress(page)).learning?.[want]?.letter?.teachHits, { timeout: 8000 }).toBe(1)
})

test('feeding a different snack is never wrong: Puffy eats it and the wanted one glows', async ({ page }) => {
  await seed(page, { progress: { arrived: [] } })
  await toPlay(page)
  await page.getByRole('button', { name: 'Hydrogen' }).click()
  await page.getByRole('button', { name: 'Oxygen' }).click()
  const stage = page.locator('.play-stage')
  await expect(stage).toHaveAttribute('data-ask', /:letter:teach$/, { timeout: 15000 })
  const want = (await stage.getAttribute('data-ask'))!.split(':')[0]
  const other = ['H', 'O', 'C'].find((id) => id !== want)!
  const names: Record<string, string> = { H: 'Hydrogen', O: 'Oxygen', C: 'Carbon' }
  await page.getByRole('button', { name: names[other], exact: true }).click()
  await expect(page.locator('.belly-snack')).toHaveCount(1, { timeout: 5000 })
  await expect(page.getByRole('button', { name: names[want], exact: true })).toHaveClass(/is-hinted/)
  expect((await progress(page)).learning ?? {}).toEqual({})
})

test('a new snack arrives once everything on the tray is found', async ({ page }) => {
  const found = ['water', 'hydrogen-gas', 'oxygen-gas', 'carbon-dioxide', 'methane', 'diamond']
  await seed(page, { progress: { arrived: [], discovered: found } })
  await toPlay(page)
  await expect(page.getByRole('button', { name: 'Helium' })).toBeVisible({ timeout: 10000 })
  await expect(snacks(page)).toHaveCount(4)
  await expect.poll(async () => (await progress(page)).arrived).toEqual(['He'])
})

test('from age 4, pack 2 brings harder chemistry: iron and oxygen make rust', async ({ page }) => {
  // The starter book is complete, which once staged a fake "arrival" that blocked taps when every snack was let in.
  const starter = ['water', 'hydrogen-gas', 'oxygen-gas', 'carbon-dioxide', 'salt', 'methane', 'diamond', 'hydrochloric-acid', 'helium-gas']
  await seed(page, { settings: { childAge: 5, level: 2, snacks: 'all' }, progress: { discovered: starter } })
  await toPlay(page)
  await expect(snacks(page)).toHaveCount(12)
  await page.getByRole('button', { name: 'Iron' }).click()
  await page.getByRole('button', { name: 'Oxygen' }).click()
  await expect(page.locator('.discovery__name')).toHaveText('Rust', { timeout: 15000 })
  await expect.poll(async () => (await progress(page)).discovered, { timeout: 15000 }).toContain('rust')
})

test('gold with oxygen stays shiny, and says so', async ({ page }) => {
  await seed(page, { settings: { childAge: 7, level: 3, snacks: 'all' } })
  await toPlay(page)
  await page.getByRole('button', { name: 'Gold' }).click()
  await page.getByRole('button', { name: 'Oxygen' }).click()
  await expect(page.locator('[data-outcome="noble-metal"]')).toBeAttached({ timeout: 15000 })
  await expect(page.locator('.caption')).toHaveText('Gold stays shiny!')
})

test('toddlers never get pack 2, even with every snack let in', async ({ page }) => {
  await seed(page, { settings: { childAge: 3, level: 1, snacks: 'all' } })
  await toPlay(page)
  await expect(snacks(page)).toHaveCount(6)
  await expect(page.getByRole('button', { name: 'Iron' })).toHaveCount(0)
})

test('iron and magnesium get a true answer: they won’t mix', async ({ page }) => {
  await seed(page, { settings: { childAge: 5, level: 2, snacks: 'all' } })
  await toPlay(page)
  await page.getByRole('button', { name: 'Iron' }).click()
  await page.getByRole('button', { name: 'Magnesium' }).click()
  await expect(page.locator('[data-outcome="fact"]')).toBeAttached({ timeout: 15000 })
  await expect(page.locator('.caption')).toHaveText('Won’t mix!')
})

test('the book holds twenty-four plates from age 4, nine below', async ({ page }) => {
  await seed(page, { settings: { childAge: 5, level: 2 } })
  await page.getByRole('button', { name: 'Discovery book' }).click()
  await expect(page.locator('.plate')).toHaveCount(24)
  await page.evaluate(() => localStorage.setItem('puffy.settings', JSON.stringify({ voiceOn: false, childAge: 3, level: 1 })))
  await page.reload()
  await page.getByRole('button', { name: 'Discovery book' }).click()
  await expect(page.locator('.plate')).toHaveCount(9)
})

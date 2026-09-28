import { defineConfig, devices } from '@playwright/test'

// End-to-end tests drive the real app with pointer input at iPad size.
// WebKit is the engine inside iPad Safari; Chromium covers Android tablets.
export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    viewport: { width: 1180, height: 820 },
    hasTouch: true,
    // Buttons bob and wobble forever; reduced motion lets Playwright see them as stable.
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'webkit-ipad', use: { ...devices['Desktop Safari'], viewport: { width: 1180, height: 820 }, hasTouch: true } },
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1180, height: 820 }, hasTouch: true } },
    // Kids' tablets: Amazon Fire 7 (1024x600) and Galaxy Tab A (1340x800) run Chromium-based browsers.
    { name: 'fire-7', use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 600 }, hasTouch: true } },
    { name: 'galaxy-tab', use: { ...devices['Desktop Chrome'], viewport: { width: 1340, height: 800 }, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run build && npx vite preview --port 4173 --strictPort',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})

/// <reference types="vitest/config" />
import { execSync } from 'node:child_process'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Shown on the grown-ups page, so anyone can tell which version a tablet runs.
const commit = (() => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'dev'
  }
})()

export default defineConfig({
  define: { __BUILD__: JSON.stringify({ commit, date: new Date().toISOString().slice(0, 10) }) },
  // Relative base so the same build works on GitHub Pages (/<repo>/) and locally.
  base: './',
  plugins: [
    react(),
    VitePWA({
      // A new version waits until Puffy is in the background, or a grown-up taps
      // "Update now" (src/game/update.ts). Never a reload in front of a child.
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Puffy — Feed the Cloud',
        short_name: 'Puffy',
        description: 'A toddler-first chemistry playground. Feed Puffy the cloud.',
        start_url: './',
        scope: './',
        display: 'fullscreen',
        orientation: 'landscape',
        background_color: '#FFD1E8',
        theme_color: '#FFD1E8',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Everything, including recorded voice clips, is cached so play works offline.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json,mp3,m4a,ogg,wav}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: 'index.html',
      },
    }),
  ],
  server: { port: 3000 },
  test: { exclude: ['e2e/**', 'node_modules/**'] },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})

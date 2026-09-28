# Handoff

What exists right now, how it is wired, and what the next person must know. Last updated 2026-09-28.

## What Puffy is

A toddler chemistry game. A child drags element "snacks" (H, O, C, Na, Cl, He) into Puffy, a pink cloud. Puffy chews and either discovers something real (9 stickers), says a real-but-harsh substance is "too hot", or, for helium, imagines something silly and says "Oh no! Try again!". The full product spec is `puffy_app.txt`. Product facts are in `PRODUCT.md`, choices and rejected options in `DECISIONS.md`.

## Where it runs

- **Live:** https://timereigth54.github.io/puffy/ (GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main`).
- **On a tablet:** open that URL in Safari (iPad) or Chrome/Silk (Android, Fire), then Share → *Add to Home Screen*. After the first load it works offline.
- **Repo:** github.com/Timereigth54/puffy (public).

## Run it locally

Needs Node 20+ (built with Node 24).

```
cd puffy-web
npm ci
npm run dev          # http://localhost:3000, also on your Wi-Fi via --host
npm test             # 21 unit tests (vitest)
npx playwright install webkit chromium   # once
npx playwright test  # 8 scenarios x 4 device sizes
npm run build        # production build in puffy-web/dist
```

A tablet on the same Wi-Fi can open the dev server's network URL, but microphone recording and offline mode need HTTPS, so use the Pages URL for real device tests.

## How it is wired

```
puffy-web/src/
  App.tsx              screens, saving, session clock, bedtime, parent gate, light mode
  data/content.ts      THE CONTENT: elements, 9 discoveries, spicy pairs, every narrator word
  game/engine.ts       resolve(pair) -> discovery | spicy | same | loner | unknown; no-repeat banks; hints
  game/lines.ts        sentence builders shared by the game and the voice renderer
  game/voiceLines.ts   every line the narrator can say (input to the voice renderer)
  game/audio.ts        synthesized Puffy sounds + narrator (MP3 clip, else browser speech)
  game/store.ts        localStorage (settings incl. age and level, progress); deletes old name recordings
  components/          Puffy (cloud body layer + face layer), SnackArt, ResultArt, Bathroom, Icons, NameRecorder
  screens/             Onboarding, Home, Play, Book, ParentGate, ParentZone, Sleep
  styles/              tokens.css (palette, sizes), world.css (child screens), parent.css
puffy-web/public/voice/  142 MP3 clips + manifest.json (generated; do not edit by hand)
puffy-web/tools/         render-voice.mjs (Piper -> MP3), make-icons.mjs (icon.svg -> PNGs)
puffy-web/e2e/           Playwright tests
.impeccable/             design direction brief (the "bath time" contract)
```

**To add content:** edit `data/content.ts`. `npm test` fails if any pair of snacks has no honest answer, if a line has no voice clip, or if any text says "new element" or "not real". Then re-render voice (below).

## Voice clips

Narrator clips are generated offline with **Kokoro** (v1.0, voice `af_heart`, speed 0.88). The older Piper voice is still available with `--engine piper`. One-time setup on Windows (paths are relative to the repo root; `tools/kokoro/` and `tools/kokoro-venv/` are git-ignored, about 355 MB and 400 MB):

1. `python -m venv tools/kokoro-venv` then `tools/kokoro-venv/Scripts/python -m pip install kokoro-onnx soundfile` (built with Python 3.14, kokoro-onnx 0.4.x, onnxruntime 1.30).
2. Download `kokoro-v1.0.onnx` and `voices-v1.0.bin` from github.com/thewh1teagle/kokoro-onnx/releases (tag `model-files-v1.0`) into `tools/kokoro/`. On this PC curl needed `--ssl-no-revoke`.
3. `cd puffy-web && node tools/render-voice.mjs` renders only missing clips; `--force` re-renders all (389 lines took about 20 minutes on the build PC).

On macOS or Linux, set `KOKORO_PYTHON` and `KOKORO_DIR`. A voice actor's recordings can replace the MP3s later: keep the file names from `manifest.json`.

## Levels

A grown-up picks the child's age at first launch; it sets one of four levels (`LEVELS` and `VOICE` in `data/content.ts`, sentence builders in `game/lines.ts`):

| Level | Ages | Narrator | On screen |
|---|---|---|---|
| 0 Giggles | 1 | single words ("Yay!", "Water!") | no text |
| 1 Tiny Lab | 2–3 | one to three words ("Ta-da! Water!") | no text |
| 2 Element Friends | 4–5 | short sentences and a simple fact | symbols, names |
| 3 Real Chemist | 6–8 | explanation, formula, chemistry fact | symbols, names, formulas |

All levels use the same six snacks and nine discoveries for now.

## State of things

**Works and is tested:**
- the full loop,
- tap-to-feed (one tap flies a snack into Puffy) and drag-to-feed,
- all four outcome kinds at all four levels,
- onboarding by age,
- the book,
- the parent gate and parent zone (with a voice check),
- bedtime,
- the offline build,
- silly ideas drawn in the thought bubble, so the joke works with no sound and no text.

Tests: 23 unit tests and 40 e2e runs (10 scenarios × WebKit iPad, Chromium iPad, Fire 7 size, Galaxy Tab size) pass locally.

**Not checked. Read before trusting the above:**
- **Only the owner's Samsung tablet has run Puffy**, and that was an earlier build with the Piper voice. This build (Kokoro voice, levels, tap-to-feed) has run only in desktop browser engines at tablet sizes.
- **Nobody has listened to the Kokoro clips in the game.** Three samples were sent to the owner. An automated check on 2026-09-29 showed all 389 decode, none is silent, and speaking rate is 6–20 characters/second (median 13).
- **Frame rate on a low-end tablet is unknown.** Light mode exists but is untuned. Floating snacks add six always-running CSS animations.
- **No child has played it.**

## Known gaps and next steps

1. Owner: test this build on the Samsung; listen to the new voice; try each age.
2. Watch toddlers play for 10 minutes each (the owner's sister's children), noting taps that miss, laughs and hesitations.
3. Harder content at higher levels: packs 2–5, 3–4 tummy slots, heat and spark. Not started.
4. Amazon Kids+ profiles block unlisted websites; see DECISIONS.md.
5. App Store build: needs a Mac or cloud Mac and an Apple Developer account. Not started.

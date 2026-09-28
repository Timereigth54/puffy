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
  game/store.ts        localStorage (settings, progress) + IndexedDB (recorded name)
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

Narrator clips are generated offline with Piper. One-time setup on Windows (paths are relative to the repo root; `tools/piper/` is git-ignored because it is ~135 MB):

1. Download `piper_windows_amd64.zip` from github.com/rhasspy/piper/releases (tag 2023.11.14-2) and unzip it into `tools/piper/`, so that `tools/piper/piper/piper.exe` exists.
2. Download `en_US-lessac-high.onnx` and `en_US-lessac-high.onnx.json` from huggingface.co/rhasspy/piper-voices (path `en/en_US/lessac/high/`) into `tools/piper/`.
3. `cd puffy-web && node tools/render-voice.mjs` renders only missing clips (about 3 s per line on the build PC); `--force` re-renders all.

On macOS or Linux, set `PIPER_EXE` and `PIPER_MODEL` to your paths. A voice actor's recordings can replace the MP3s later: keep the file names from `manifest.json`.

## State of things

**Works and is tested:**
- the full loop,
- all four outcome kinds,
- onboarding with name recording,
- the book,
- the parent gate and parent zone,
- bedtime,
- the offline build,
- silly ideas drawn in the thought bubble, so the joke works with no sound and no text.

Tests: 21 unit tests and 32 e2e runs (8 scenarios × WebKit iPad, Chromium iPad, Fire 7 size, Galaxy Tab size) pass locally.

**Not checked. Read before trusting the above:**
- **No real device has run Puffy yet**, not an iPad, a Fire tablet or a Galaxy Tab. The e2e tests use desktop browser engines at tablet sizes. Playwright's WebKit is close to Safari but is not Safari.
- **Nobody has listened to the voice clips.** An automated check on 2026-09-28 showed all 142 decode, none is silent, and speaking rate is 6–18 characters/second (median 10; the lines are now short words, e.g. "Too hot!" is 0.65 s). Warmth and pronunciation are unjudged.
- **Name recording (MediaRecorder) has not been tried on iPad Safari or a Fire tablet.**
- **Frame rate on a low-end tablet is unknown.** Light mode exists but is untuned.
- **No child has played it.** The blueprint's success criteria (first combo within 60 s, laughs at the silly idea) are untested.

## Known gaps and next steps

1. Owner: open the Pages URL on a real iPad and a kids' tablet; listen to the voice; try recording a name.
2. Watch one 2–3-year-old play for 10 minutes (blueprint §23).
3. Amazon Kids+ profiles block unlisted websites. A parent must allow the URL, or Puffy needs an Appstore wrapper later (see DECISIONS.md).
4. Content packs 2–5 (up to the full periodic table), 3–4 tummy slots, heat and spark: not started.
5. App Store build: needs a Mac or cloud Mac and an Apple Developer account. Not started.

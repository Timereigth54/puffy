# Handoff

What exists right now, how it is wired, and what the next person must know. Last updated 2026-09-29.

## What Puffy is

A chemistry game for ages 1–8. A child feeds element "snacks" into Puffy, a pink cloud. Puffy chews, then does one of these:

- discovers something real (a sticker),
- says a real-but-harsh substance is "too hot",
- says gold "stays shiny",
- tells a true "no" ("won't mix", "won't join", "metal mix"),
- for helium, imagines something silly and says "Oh no! Try again!".

**Two content packs:**
- **Starter pack (every age):** H, O, C, He, Cl, Na and 9 stickers.
- **Pack 2 (ages 4 and up):** adds N, Fe, Mg, S, Cu, Au and 15 more stickers. Every one of the 78 pairs has a real answer.

**The learning ladder.** Snacks arrive one at a time. Every other turn, Puffy asks for one snack, first by name, then by letters, then by number. The goal is that a child knows the elements' names, symbols and numbers by the time they can read.

**Where to read more:**
- full product spec: `puffy_app.txt`,
- product facts: `PRODUCT.md`,
- choices and rejected options: `DECISIONS.md`.

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
npm test             # 55 unit tests (vitest)
npx playwright install webkit chromium   # once
npx playwright test  # 18 scenarios x 4 device sizes
node tools/capture-ladder.mjs   # review screenshots of the ladder and pack 2 (needs vite preview on :4173)
npm run build        # production build in puffy-web/dist
```

A tablet on the same Wi-Fi can open the dev server's network URL, but microphone recording and offline mode need HTTPS, so use the Pages URL for real device tests.

## How it is wired

```
puffy-web/src/
  App.tsx              screens, saving, session clock, bedtime, parent gate, light mode
  data/content.ts      THE CONTENT: 12 elements in 2 packs, 24 discoveries, spicy pairs, FACTS (true "no"s), every narrator word
  game/engine.ts       resolve(pair) -> discovery | spicy | same | loner | noble-metal | fact | unknown (fallback, unused); no-repeat banks; hints
  game/learning.ts     the learning ladder: skills per level, teach/check/known rules, what Puffy asks, when snacks arrive
  game/layout.ts       where each floating snack sits, for 1 to 12 snacks, landscape and portrait
  game/lines.ts        sentence builders shared by the game and the voice renderer
  game/voiceLines.ts   every line the narrator can say (input to the voice renderer)
  game/audio.ts        synthesized Puffy sounds + narrator (MP3 clip, else browser speech)
  game/store.ts        localStorage (settings incl. age and level, progress); deletes old name recordings
  components/          Puffy (cloud body layer + face layer), SnackArt, ResultArt, Bathroom, Icons, NameRecorder
  screens/             Onboarding, Home, Play, Book, ParentGate, ParentZone, Sleep
  styles/              tokens.css (palette, sizes), world.css (child screens), parent.css
puffy-web/public/voice/  985 MP3 clips + manifest.json (generated; do not edit by hand)
puffy-web/tools/         render-voice.mjs (Kokoro or Piper -> MP3), make-icons.mjs (icon.svg -> PNGs), capture-review.mjs and capture-ladder.mjs (review screenshots)
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

**What each level gets:**
- **Levels 0–1:** the starter six and 9 stickers.
- **Levels 2–3:** also pack 2, for 12 snacks and 24 stickers.

## Learning ladder (game/learning.ts)

**Every touch names the snack.** The label grows with what the snack shows: "Oxygen!", then "O! Oxygen!", then "Oxygen! Number eight!".

**Puffy asks for one snack on every other turn.**
- **Answering:** the first snack fed answers the ask. Tapping the bubble repeats the question.
- **Wrong snack:** it is still eaten, and the wanted one glows while the narrator shows it.

**Skills, in order: name → letters → number.** Each skill has three stages:
- **teach:** the answer is visible (the snack in the bubble, or letters and numbers on the foam). Three right answers move it on.
- **check:** the answer is hidden.
- **known:** 5 right of the last 6 checks, on 2 different days. Two misses in a row return the skill to teach.

**What each age learns:**
- **Age 1:** names only.
- **Ages 2–3:** letters and numbers too, but not Latin symbols (Na) and not numbers over 10.
- **Narrator off:** names are skipped.

**How snacks arrive:**
- **Starting tray:** toddlers start with H, O, C. Older children start with the starter six.
- **When the next one comes:** when everything on the tray is found and every name on it has been taught. At most one a day.
- **Order:** He, Cl, Na, then (ages 4+) N, Fe, Mg, S, Cu, Au.
- **Override:** Grown-ups → New snacks → All at once.

**Grown-ups page:** a "What … is learning" table shows each element's status per skill, from the stored answers.

**Where it is stored:** in `progress.learning`, `progress.arrived` and `progress.lastArrivalDay` (localStorage, progress version 3).

**Old saves:**
- A save that has already played keeps the starter six.
- To watch snacks arrive on a device that has played before, use Grown-ups → Reset progress.

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
- silly ideas drawn in the thought bubble, so the joke works with no sound and no text,
- the learning ladder: asks, teach→check→known, wrong answers, arrivals, the grown-ups learning table,
- pack 2 at ages 4 and up, with a real answer for every one of the 78 pairs.

**Tests (2026-09-29):**
- **Unit:** 55 unit tests pass.
- **End to end:** 72 e2e runs pass locally (18 scenarios × WebKit iPad, Chromium iPad, Fire 7 size, Galaxy Tab size).
- **What the unit tests cover:** the ladder rules, including a simulated random guesser against the "known" rule.
- **What the e2e tests cover:**
  - a toddler's first three snacks,
  - an ask being answered right and wrong,
  - an arrival,
  - rust,
  - iron with magnesium giving a true "won't mix",
  - gold staying shiny,
  - no pack 2 below age 4,
  - the 24-plate book.
- **Screenshots:** in `.impeccable/review/ladder-*.png` and `pack2-*.png`.

**Found and fixed while testing:** with "New snacks: All at once", Puffy staged a fake arrival of a snack already in the tub and ignored taps for about 3 seconds, once a day. The rust e2e test now starts from a finished starter book to catch this.

**Not checked. Read before trusting the above:**
- **Only the owner's Samsung tablet has run Puffy**, and that was an earlier build with the Piper voice. This build (Kokoro voice, levels, tap-to-feed) has run only in desktop browser engines at tablet sizes.
- **Nobody has listened to the Kokoro clips in the game.** Three samples were sent to the owner. An automated check on 2026-09-29 showed all 389 decode, none is silent, and speaking rate is 6–20 characters/second (median 13).
- **Frame rate on a low-end tablet is unknown.** Light mode exists but is untuned. Floating snacks add one always-running animation pair per snack: up to twelve with pack 2.
- **No child has played it.** In particular, nobody knows yet whether a 2-year-old understands the "Puffy wants…" bubble, or whether the ladder's pace (three teach answers, then checks over two days) is too slow or too fast. The thresholds are constants at the top of `game/learning.ts`.
- **Download size:** the offline download is now about 13.7 MB, up from 4.7 MB, mostly voice clips. On a slow connection the first load of the installed app takes longer.
- **Nobody has listened to the new narrator lines.** An automated check on 2026-09-29 found all 985 manifest entries have a clip, at 6–20 characters/second (median 14). The durations are consistent with letters being spoken: "H E! Helium!" is 0.6 s longer than "Helium!". Names, letters ("H E", "C L") and numbers are read by Kokoro from text. Whether it says the letters as letters has not been heard.
- **The pack 2 chemistry facts have not been checked by a chemist.**

## Known gaps and next steps

1. **Owner: test this build on the Samsung.**
   - Reset progress, pick age 3, and watch the first three snacks.
   - Set age 5 with "All at once" to see pack 2.
   - Listen to the letter and number lines.
2. **Watch children play for 10 minutes each** (the owner's sister's children). Note:
   - taps that miss,
   - whether they look at the "Puffy wants…" bubble,
   - laughs,
   - hesitations.
3. **Tune the ladder from what is seen.** The candidates are `TEACH_HITS`, `CHECK_HITS`/`CHECK_WINDOW`/`CHECK_DAYS` and `ASK_EVERY` in `game/learning.ts`.
4. **Later packs:** 3–4 tummy slots, heat and spark. The first ten elements in order (adding Li, Be, B, F, Ne) would let numbers 1–10 be learned as a counting row; not started.
5. Amazon Kids+ profiles block unlisted websites; see DECISIONS.md.
6. App Store build: needs a Mac or cloud Mac and an Apple Developer account. Not started.

# Decisions

Every choice that closed off an alternative, with the reason. Newest last.

---

## 2026-09-28 — Web app (PWA) first, native later

**Chosen:** React + TypeScript + Vite, shipped as an installable offline web app.
**Rejected:** the blueprint's Swift / SwiftUI / SpriteKit stack, for now.
**Why:** the build machine is Windows, and Xcode does not run on Windows. The first goal is watching a 2–3-year-old play on an iPad; a PWA reaches an iPad in days. Owner approved.
**Not decided:** whether the App Store build is a Capacitor wrapper of this code or a native rewrite. Either way it needs a Mac (or cloud Mac) and an Apple Developer account.

## 2026-09-28 — Starter pack: nitrogen replaced by helium

**Chosen:** H, O, C, Na, Cl, He.
**Rejected:** the blueprint's H, O, C, N, Na, Cl.
**Why:** with the blueprint's six, 8 of the 11 "invalid" pairs are real substances (Cl₂, NO/N₂O, NaH, ClO₂, CCl₄, NaN₃, cyanogen, Na₂C₂). The game would have told children real chemistry is "not real", breaking pillar 4. With helium, the only "nope" answers involve a noble gas, which truly does not react. The blueprint's figure of 26 invalid pairs was also wrong: six elements give 21 unordered pairs, 11 of them non-combos.
**Cost:** ammonia and nitrogen gas leave the starter pack. They can return in pack 2.

## 2026-09-28 — Four honest outcomes instead of "real / fake"

**Chosen:** every pair resolves to one of:
- *discovery* (9 stickers: water, hydrogen gas, oxygen gas, carbon dioxide, salt, methane, diamond, tummy acid, helium gas),
- *spicy* (real but harsh: Cl₂, ClO₂, CCl₄, NaH, Na₂C₂, Na₂O). Puffy fans its mouth: "real, but grown-up science, too spicy for Puffy",
- *same* (Na+Na: "still sodium"),
- *loner* (helium with anything else). This is the only path that runs the silly-idea sequence and the sad beat, and its reason line is true ("Helium doesn't hold hands with anyone").

**Rejected:** a single "invalid" bucket; "Puffy doesn't know that recipe yet" for starter pairs (kept only as a fallback for future content gaps).
**Why:** honesty plus a safety lesson; "too spicy" is also funny, which the sad path is not.
**Consequence:** the starter book has 9 stickers, not the blueprint's 10.

## 2026-09-28 — C+C is "Diamond", H+Cl is "Tummy acid"

Diamond is still carbon (no new element is claimed; the fact text says so). "Tummy acid" is the toddler name for hydrochloric acid; the formula HCl shows in Formulas mode. Sodium oxide moved to *spicy* because it is caustic and means nothing to a toddler.

## 2026-09-28 — Visual direction: bath time

**Chosen:** a 1950s pink-tile bathroom. Snacks are foam bath cutouts floating in the tub, Puffy is a steam cloud, and the silly idea is a soap bubble. Recorded in `.impeccable/surfaces/puffy-web-src-app-tsx.md`.
**How it was chosen:** Impeccable's direction roll (seed c664457f) assigned candidate 5 of a list ranked before the roll. The other candidates were Eric Carle tissue collage, a puffy-sticker book, fuzzy felt, clay, wooden toys and a highchair tray. Six catalog challengers were all declined for a 2-year-old audience; each donated one discipline (listed in the brief).
**Rejected:** the generic pastel-gradient kids-app look KIWI started with, and emoji as result art.
**Blueprint palette kept** as a binding brand commitment.

## 2026-09-28 — Snack silhouettes differ, not just colours

Hydrogen round, oxygen drop, carbon block, sodium star, chlorine leaf, helium balloon. Two blues (H, O) would otherwise be hard to tell apart for toddlers and for colour-blind parents. Sodium changed from a square to a star so it does not match carbon's block.

## 2026-09-28 — Element Friends mode shows the symbol as the snack

In Mode 1 the face's mouth is replaced by the symbol in foam letters. A symbol printed under a full face read as teeth in testing.

## 2026-09-28 — Voice: pre-rendered Piper clips, browser speech as fallback

**Chosen:** every narrator line is rendered offline with Piper (`en_US-lessac-high`) to a 48 kbps MP3, keyed by normalized text in `public/voice/manifest.json`. A line with no clip uses the browser's speech synthesis.
**Rejected:** browser speech only (robotic, the blueprint's High/High risk); a paid TTS service (account, bill, network); waiting for a voice actor before any testing.
**Why:** free, offline, reproducible from `tools/render-voice.mjs`, and swappable. A voice actor's recordings can later replace the MP3s under the same manifest.
**Limit:** nobody on the build side has listened to the clips for warmth. The owner must.

## 2026-09-28 — Child's name: parent recording, typed name as fallback

The parent records the name once with the tablet microphone (MediaRecorder). It is stored in IndexedDB on the device. With no recording, the typed name is spoken by the device voice. Name used on about 1 in 3 first discoveries, never in a "no".

## 2026-09-28 — After the guided first combo, stay in play

**Rejected:** the blueprint's "auto-advance to Home" after onboarding.
**Why:** a toddler who just succeeded should keep feeding Puffy; a menu interrupts the loop.

## 2026-09-28 — Bedtime is derived, with no countdown

When the parent's time limit nears, the bathroom light warms toward evening over the last 20%. At the limit Puffy falls asleep and stays asleep until a grown-up opens the gate. A web app cannot close itself, so "the app closes gracefully" became "Puffy sleeps".

## 2026-09-28 — Adaptive difficulty kept small

Kept: hint on the 3rd miss of the same pair (or 4 misses in a row), tray shrinks to the 4 snacks with the most undiscovered combos after 5 misses in a row and resets after the next discovery, easy-win highlight after 3 minutes with no discovery, idle nudge after 15 s.
**Rejected for now:** "shorten chew if child quits mid-chew", "lower narrator frequency if ignored". There is no data to tune them against yet.

## 2026-09-28 — img2threejs 3D Puffy not used in this build

**Why:** a Three.js Puffy would add ~150 KB gzipped, a GPU cost on older iPads, and would make the 14 facial expressions harder to author than in SVG. The blueprint's own rule is to test the loop "with circles" first. Revisit after the first child test if Puffy's look is judged too flat.

## 2026-09-28 — GitHub repo public, deployed with GitHub Pages

Code is at github.com/Timereigth54/puffy. It was created private; the owner then chose to make it public so GitHub Pages (free tier) can serve the app over HTTPS. HTTPS is required for offline mode and for recording the child's name on a real tablet.
**Rejected:** Cloudflare Pages with a private repo (one more account).

## 2026-09-28 — Narration in toddler words (owner request)

Every narrator line is one to three words a 2-year-old knows ("Ta-da! Water!", "Too hot!", "Oh no! Try again!", "Helium won't hold hands!").
**Rejected:** the blueprint's full sentences ("It could be used for a gold parade!"). The owner said they read like speech to adults.
**How honesty survives:** each discovery has a short spoken name that is still true (Fizzy gas for CO₂, Stove gas for methane, Tummy juice for HCl, Hydrogen for H₂). The real name and formula stay on screen in Element Friends mode and in the parent zone.

## 2026-09-28 — Puffy is a pink cumulus, not cotton candy (owner request)

A cotton-candy version (fibrous turbulence texture, scalloped tufts) was built and rejected by the owner as "cotton candy stuffed together". The current body is soft shaded billows with a feathered edge, lit from the top-left and darker underneath, the way a real cloud reads. The body is a static layer (filters painted once); the face is a separate light layer that blinks and follows the finger.

## 2026-09-28 — Target includes kids' tablets, not only iPads (owner)

Amazon Fire Kids and Samsung Galaxy Tab Kids tablets are in scope. Consequences:
- **Light mode**, chosen automatically on ≤ 2 GB memory or ≤ 2 cores (and forced with `?lite`), drops blur filters, drop shadows, water ripples and wall bubbles.
- The e2e suite runs at Fire 7 (1024×600) and Galaxy Tab A (1340×800) sizes as well as iPad.
- **Not checked:** a real Fire or Galaxy device. Frame rate on a Fire 7 is unknown.
- **Not decided:** Amazon Kids+ profiles only allow parent-approved websites. Parents will need to add the Puffy URL to the allowed list, or Puffy needs an Appstore listing (a wrapped web app) later.

## 2026-09-28 — Sound can never break play

Found by the WebKit e2e run: with no `window.AudioContext`, every sound effect threw, and the throw inside feed() stopped the chew. Sound now uses `AudioContext` or `webkitAudioContext`, is silent if neither exists, plays voice through an `<audio>` element as a fallback, and every effect is wrapped in a try/catch.

## 2026-09-28 — Bouncy easing kept

Impeccable's detector flags overshoot easing (`--ease-squish`, the jelly, foam and bubble wobbles) as dated. It is kept on purpose: squash and stretch is the literal motion of foam, jelly and soap bubbles, and the owner asked for more playful motion.

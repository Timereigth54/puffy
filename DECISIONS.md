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

## 2026-09-29 — Owner test on a Samsung tablet: five changes

The owner and others tested on a Samsung Galaxy tablet (no iPad available). Their findings and what changed:

**1. Tap feeds directly.** Dragging may be too hard for ages 1–4. One tap now makes the snack bounce and fly in an arc into Puffy's mouth; dragging still works.
*Rejected:* the blueprint's tap-then-tap-Puffy "holding" style, which was one step too many for a toddler.

**2. Bigger snacks that float.** Snacks are about 30% bigger (`--float-size`, 110–200 px). Each drifts slowly (±16 px sideways, ±12 px up and down, 6–10 s cycles) around a fixed home spot: an arc under Puffy in landscape, two rows in portrait.
*Rejected:* free-roaming snacks across the whole screen. Moving targets are hard for 1–4-year-olds to hit, so each snack stays where a hand expects it.

**3. Age sets the level; the narrator explains more as the level rises.** A grown-up picks the child's age at first launch:
- **Giggles (age 1):** single words.
- **Tiny Lab (2–3):** one to three words.
- **Element Friends (4–5):** short sentences, symbols and names on screen.
- **Real Chemist (6–8):** explanations and formulas.

Words on screen follow the level; there is no separate setting. A grown-up can change the level by hand.
- *Tested:* level 0 never says more than two words in a line, and each level says more on average than the one below.
- *Not done:* more elements or harder chemistry at higher levels. All levels still use the same six snacks and nine discoveries; content packs 2–5 are the next step.

**4. The child's name is no longer spoken, and name recording is removed.** A parent's recording sounded jarring next to the narrator ("like it screamed the name"), and a typed name could only be read by the device voice, which is the most robotic of all. The name is now shown on the grown-ups page only. Any recording left from an earlier build is deleted from the device on first launch.
*Rejected:* keeping the recording with volume normalisation; the mismatch was in the voice, not only the loudness.

**5. Narrator re-recorded with Kokoro.** The Piper voice sounded robotic on the Samsung. All lines, at all four levels, are now rendered with Kokoro v1.0 (`af_heart`, speed 0.88), an offline neural voice. `tools/render-voice.mjs --engine piper` still works.
- *Not checked:* whether the owner finds Kokoro natural enough. Samples were sent for a listen.
- *Also added:* the grown-ups page shows whether the tablet is playing the recorded clips or its own voice, with a "Test the voice" button.

**Grown-ups entry.** The owner could not find the settings ("upgrade menu"). The tiny gear is now a labelled "Grown-ups" button on the home and bedtime screens.

## 2026-09-29 — Learning ladder: name, then letters, then number (owner request)

The owner asked for progressive growth, so that a child truly knows the elements by the time they can read letters and numbers.

**The bridge:** an element's symbol is made of letters and its atomic number is a number. A child who learns "O is oxygen" and "hydrogen is number one" before reading can already read the elements when reading arrives.

**Chosen:** each element is learned in three skills, in order. The code is `game/learning.ts`.
- **Name:** Puffy says "oxygen" and the child finds it.
- **Letters:** Puffy shows O and the child finds it.
- **Number:** Puffy shows 8, with eight dots up to ten, and the child finds it.

**How each skill is learned:**
- **Taught first.** The answer is visible, so the child can match it. For names, the bubble shows the snack itself. For letters and numbers, the snacks carry theirs.
- **Then checked.** The answer is hidden. The name is heard only, and the snacks hide their letters or numbers while Puffy asks.
- **Order:** a letter is taught only after the name is known, and a number only after the letters.

**Supporting mechanics:**
- **Naming on touch.** Every touch names the snack ("Oxygen!", then "O! Oxygen!", then "Oxygen! Number eight!"), the way a grown-up names things for a toddler. This replaced the random "Ooh!" grab lines.
- **The ask.** Puffy asks for one snack on every other turn. The first snack fed answers it.
- **Wrong answers.** A wrong snack is still eaten, named ("Carbon! Yum!"), and the wanted one glows while the narrator shows it. There is no fail state and no score.

**"Known" = 5 right of the last 6 checks, on at least 2 different days.**
- *Rejected:* 3 of the last 4. Simulated with a random guesser on a three-snack tray, it passed 10% of the time.
- *Now:* 5 of 6 passes a guesser about 3% of the time (1% on four snacks). A child who is right 90% of the time needs about six checks.
- *The two-day rule* is there so the number measures remembering, not one lucky afternoon.
- *Two check misses in a row* send the skill back to teaching. A known skill is never lowered.

**What each age learns:**
- **Age 1:** names only.
- **Ages 2–3:** letters and numbers too, except two cases:
  - Latin symbols (Na, Fe, Cu, Au) wait until age 4, because they do not match the English name's first sound. That would teach the wrong phonics just as letter sounds are learned.
  - Numbers above ten wait until age 4, beyond toddler counting.
- **Narrator off:** names cannot be checked. The name step is skipped, and the grown-ups page says "Needs sound".

**Not known:** whether any child learns from this. The rules are unit-tested; no child has played them.

## 2026-09-29 — Snacks arrive one at a time

**Chosen:**
- **Starting snacks:** toddlers (ages 1–3) start with three snacks: hydrogen, oxygen and carbon, three new words. Older children start with the starter six.
- **When a new snack arrives:** only when two things are true:
  - everything the current snacks can make has been found,
  - every current snack's name has been taught (three right answers with the picture shown).
- **Pace:** at most one arrival a day.
- **Order:** H, O, C, He, Cl, Na, then pack 2: N, Fe, Mg, S, Cu, Au. A test checks that every arrival brings at least one new discovery.
- **Starting point for the first three:** they need no new discovery, but they are all friendly. Hydrogen, oxygen and carbon make six discoveries and nothing spicy.

**Parent override:** Grown-ups → "New snacks: All at once" puts every snack for the level in the tub. It exists for testing and for bored children.

**Migration:** a save from before this change is treated as follows:
- If it has played (onboarded, or anything discovered), it keeps the starter six.
- A new player starts at three.
- To see arrivals on the owner's tablet, reset progress in Grown-ups.

**Rejected:** all snacks from the start (a toddler meets six new words at once), and arrival by time played (it rewards sitting, not learning).

## 2026-09-29 — Pack 2: harder chemistry for ages 4 and up

The owner's reminder in this session: the job includes harder chemistry for older children. This is the pack planned in HANDOFF.

**Six new snacks, levels 2–3 only:**
- **The snacks:** nitrogen (cloud shape), iron (hexagon), magnesium (triangle), sulfur (diamond), copper (heart) and gold (ingot). Levels 0–1 keep the starter six, even with "All at once".
- **Shape changes from the plan:** a lightning bolt for magnesium and a crescent for sulfur were planned. Both were too narrow to hold a face, so each became a rounded triangle and a rounded diamond.

**Eleven discoveries, plates 10–20:**
- **Gases and compounds:** N₂, NH₃ ammonia, N₂O laughing gas, Fe₂O₃ rust, FeS₂ fool's gold, MgO, MgCl₂ bath flakes, CuO copper oxide, CuCl₂ (blue-green fireworks).
- **Mixtures:** steel and rose gold are marked `mixture`, not compound. Their "formula" is shown as "Fe + C" and "Au + Cu", and their facts say "a mixture, not a compound". A test enforces both.

**Eleven spicy pairs:** cyanogen, sodium azide, NCl₃, FeCl₃, AuCl₃, MgH₂, H₂S, SO₂, CS₂, SCl₂, Na₂S.

**Gold stays shiny:** a new outcome for gold with H, O, N, C or S. The level 2 line is "Gold almost never mixes, so it stays shiny!"; level 3 adds "noble metal".

**Nineteen "Puffy doesn't know that one yet" pairs** (superseded the same day: see "Every pair gets a real answer" below), each listed by name in `NOT_YET`:
- **How the test uses it:** the test fails if any pair gives that answer without being on the list, or if a starter pair ever gives it.
- **Why not "not real":** several of these pairs do make real substances (iron nitride, copper sulfide, magnesium sulfide…). They are left for a later pack rather than called "not real".

**Helium with each new snack:** still the silly idea. Tags on the new snacks reuse existing drawn ideas, plus two new drawings: a flying crown for gold and a banana balloon for sulfur.

**Book:** twenty plates from age 4, nine below. It became twenty-four, six across, with the entry below.

**Layout:** snack spots are now computed from the snack count (`game/layout.ts`):
- up to six: one arc,
- seven to twelve: two rows (three rows of four in portrait), with smaller snacks, at least 84 px.

**Not checked:**
- the chemistry facts against a chemist,
- the new art at real tablet size by the owner,
- twelve snacks' frame rate on a Fire 7.

## 2026-09-29 — Every pair gets a real answer (owner request)

The owner asked for "the part where all the elements can be combined". Two readings were offered, and they chose: every pair gives a real answer, still two snacks at a time. The 3–4 snack tummy was the other option and is not started.

The 19 "doesn't know that one yet" pairs from pack 2 were replaced as follows.

**4 discoveries, plates 21–24:**
- iron nitride Fe₄N (the hard skin on nitrided steel tools),
- magnesium nitride Mg₃N₂ (magnesium burns even in nitrogen),
- copper sulfide CuS (covellite, a deep-blue mineral),
- blue gold (gold with iron, a mixture).

**3 spicy pairs:**
- sulfur nitride S₄N₄ (explodes when bumped),
- magnesium carbide (gives off a burning gas in water),
- magnesium sulfide (gives off poisonous gas in water).

**12 true "no"s**, a new `fact` outcome with a caption and one sentence per level:
- **Won't mix:** metals that separate even when melted (Fe+Mg, Fe+Na, Cu+Na, Mg+Na), and iron and copper, which separate as they cool.
- **Won't join:** Cu+C, Fe+H, Cu+H, N+Cu. Each reason is a real fact. For example, copper is melted in carbon pots, and hydrogen makes steel brittle.
- **Metal mix:** Au+Mg and Cu+Mg melt into ordinary alloys. Au+Na makes a compound made only in labs.

**What the test checks now:** none of the 78 pairs answers "doesn't know that one yet". The `unknown` outcome stays only as a fallback for future content.

**Rejected:** calling the metal pairs "spicy". They are not harsh, and "too hot" would teach something false. Making every pair a sticker was also rejected, because an alloy of two metals nobody uses is not a discovery worth a plate.

**Not checked:**
- the new facts against a chemist, in particular the Cu+Na and Fe+Cu mixing claims and "blue-grey shine" for blue gold.

## 2026-09-29 — Updates wait for the background; smooth mode measures itself

**Updates:** a new version installs when Puffy goes to the background, or when a grown-up taps Update now.
- *Rejected:* reloading the moment a new version is ready. It would restart the game in front of a child mid-turn.
- *Rejected:* keeping "only after a full close", which left the owner's Samsung on an old version.

**Smooth mode:** switched on by measuring frames per second during play, not only by guessing from memory and processor count. iPhones do not report memory, so the guess never fired on them.
- *Rule:* two slow plays in a row, below 45 fps.
- *Rejected:* a single slow play. One bad reading, such as the first play during a 14 MB download, would turn it on for good.
- *Rejected:* re-measuring in smooth mode to switch it off again. A play in smooth mode says nothing about full effects.
- *Instead:* a grown-up can clear it with "Try full effects again".

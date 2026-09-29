# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + TypeScript + Vite, shipped as an installable offline web app (PWA). Chosen with the owner on 2026-09-28 over the blueprint's native Swift/SpriteKit stack because the build machine is Windows and the first goal is a real child test on an iPad. A native wrapper (Capacitor) is a later, undecided step. Source of the full product spec: `puffy_app.txt`.

## Users

- **Primary:** a child aged 2–3 on an iPad in landscape, playing with no reading ability, often on a parent's lap or alone on a sofa. Job: feed Puffy, see something happen, laugh, try again.
- **Secondary:** the parent. Sets up the child's name, controls settings and time limits behind a parental gate, looks at what the child discovered.
- Later audiences (ages 4–8, Modes 1–4) are in the spec but are not the first test.

## Product Purpose

A toddler-first chemistry playground that grows with the child: snacks arrive one at a time, and Puffy's asks teach each element's name, then its letters, then its number, so the elements are familiar by the time the child can read. Harder chemistry (pack 2: nitrogen, iron, magnesium, sulfur, copper, gold) opens from age 4. The child drags element "snacks" into a pink cloud pet named Puffy. Puffy chews and spits out a real compound (water, salt, carbon dioxide) or, for a combination it does not know, imagines something silly and invites another try. Success for the first test: a 2–3-year-old completes a combo within 60 seconds of a single demo, laughs at the silly-idea sequence, and asks to play again. No child cries or gets stuck.

## Positioning

Real chemistry that stays honest at every age — Puffy never says a real compound is "not real" and never says two elements made "a new element" — delivered through a pet relationship rather than a quiz. The silly-idea engine turns a non-result into a joke instead of a failure.

## Operating Context

- iPad Safari, landscape, touch only, possibly installed to the home screen and played offline.
- Sessions of 5–15 minutes, often with sound on in a living room.
- Parent sets up once (name recording, age mode) and then leaves the child alone.

## Capabilities and Constraints

- Fully offline after first load. No network calls during play, no analytics, no ads, no accounts, no third-party SDKs.
- Voice-first: ages 1–3 see no words in the child's view. Once a child is learning an element's letters or number, that single symbol or number appears on the snack; it is the thing being learned, not reading matter (DECISIONS.md "Learning ladder").
- No timers, scores, fail states, or buzzers in the child's view.
- Sad state never lasts longer than 0.8 s before Puffy recovers.
- Parent zone is behind a math gate.
- Child's name is recorded in the parent's voice on the device and never leaves it.
- Undecided: native App Store build, business model, voice actor, localization.

## Brand Commitments

- Name: Puffy. Species: cloud. Personality: always hungry, easily amazed, a little clumsy, never scary, never disappointed in the child.
- Palette in blueprint §16 is binding: Puffy body #FFB6D5, Puffy shadow #E68FBF, background #FFE4F0 → #FFD1E8, gases #7FD4FF, metals #C9A227, nonmetals #7FD48F, accent #FFD966, sad #B0B0C0.
- Puffy is non-verbal (sounds only). A separate narrator speaks words.

## Evidence on Hand

- `puffy_app.txt`: full blueprint.
- No recorded voice, no commissioned art, no user testing yet. Do not claim test results that do not exist.

## Product Principles

1. Failure is never a dead end: every action gets a warm response within 100 ms.
2. Honest chemistry at every age, even when that means "Puffy doesn't know that one yet."
3. A two-year-old can play with zero reading and zero adult help after one demo.
4. Nurturing over winning: the relationship with Puffy is the reward.
5. Boring, local, cheap: nothing that needs an account or a server to work.

## Accessibility & Inclusion

- Touch targets at least 88 pt, snacks ideally 120 pt.
- Drag and tap-tap input both work.
- Respect reduced motion; nothing flashes.
- Game must remain understandable with sound off (visual feedback for every beat).

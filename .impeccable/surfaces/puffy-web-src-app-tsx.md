---
version: 1
slug: "puffy-web-src-app-tsx"
primary_target: "puffy-web/src/App.tsx"
related_targets: []
---

# Puffy game app (all child-facing screens)

Scope: splash, onboarding, home, play, discovery book, result overlay. Parent gate and parent zone inherit the world in a quieter register. Mode: experience (the child is inside the game). Build path: code-led (no image generation available).

Audience and job: a 2–3-year-old on an iPad in landscape, no reading. Feed Puffy, see something happen, laugh, try again. Parent sets up once.

Constraints: PRODUCT.md palette is binding. No text in Mode 0 child view. Snacks at least 88pt, ideally 120pt. Every touch answers within 100ms. Reduced motion respected.

## Direction contract

THESIS: Bath time is a toddler's first chemistry lab. Puffy is a steam cloud hovering over a pink-tiled tub; element snacks are foam bath letters bobbing in the water. Refuses the pastel-gradient-mascot kids app with floating cards and rounded UI buttons.

OWN-WORLD: 1950s pink-tile bathroom. #FFD1E8 square tiles, pale grout, one tile unit sets every size. Foam-cut snacks: thick sliced-foam edge, flat saturated family colour, soft inset shade. Bathwater band with bubbles and a waterline. One window light from top-left governs every highlight. No cards, no glass, no chrome.

STORY: the child sees Puffy hungry, pulls a foam snack out of the water, feeds it, watches the chew, then gets a splash of discovery or a soap-bubble thought with a silly idea.

FIRST VIEWPORT: landscape iPad. Tile wall full-bleed. Puffy about 40% of height, centred in the upper third. Water band across the bottom 30% with six bobbing foam snacks at 120pt. Home is a rubber-duck tile top-left.

SIGNATURE INTERACTION: pulling a snack out of the water: ripple rings, drips, Puffy leans toward the finger and opens wide.

FORM: bath time, position 5 of 7, seed c664457f.

RAISES (from declined challengers): Datamatics: the tile grid is a real modular grid, everything snaps to tile units. Nixie counter: every state change is a physical event (squish, splash, pop), never an abstract fade. Indoor sun: one light source for every highlight and shadow. Daylight section: as a parent time limit nears, the bathroom light warms toward evening with no countdown. Doll atelier: each discovery is named and numbered like a plate in the book. Chaekgeori: empty book tiles show the tile back, a silhouette waiting.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

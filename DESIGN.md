---
name: Puffy
description: A toddler-first chemistry playground set in a 1950s pink-tile bathroom at bath time.
colors:
  tile-top: "#FFE4F0"
  tile-bottom: "#FFD1E8"
  grout: "#FFF5FA"
  puffy: "#FFB6D5"
  puffy-shadow: "#E68FBF"
  puffy-crown: "#FFEAF3"
  puffy-cheek: "#FF8FBF"
  puffy-ink: "#5C2744"
  gas: "#7FD4FF"
  metal: "#C9A227"
  nonmetal: "#7FD48F"
  accent: "#FFD966"
  sad: "#B0B0C0"
  water: "#D8F1FF"
  water-deep: "#AEE0FB"
  water-line: "#F4FBFF"
  suds: "#FFFFFF"
  enamel: "#FFFCFA"
  enamel-shade: "#F3DBE7"
  enamel-edge: "#E7C3D6"
  ink: "#3A2233"
  ink-soft: "#6B4A5E"
  plum: "#A8457A"
  plum-deep: "#85305F"
  plum-soft: "#FBE3EF"
  jelly-green: "#35A85A"
  jelly-deep: "#2B8C4A"
  danger: "#C23B55"
  rec-live: "#D9435F"
typography:
  foam-display:
    fontFamily: "Sniglet, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(30px, 5.5vh, 52px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0.01em"
  foam-formula:
    fontFamily: "Sniglet, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(22px, 3.6vh, 34px)"
    fontWeight: 800
  foam-caption:
    fontFamily: "Sniglet, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(15px, 2.4vh, 22px)"
    fontWeight: 800
    lineHeight: 1.15
  cabinet-title:
    fontFamily: "Sniglet, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(24px, 3.4vh, 30px)"
    fontWeight: 800
    lineHeight: 1.15
  cabinet-heading:
    fontFamily: "Sniglet, ui-rounded, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.2
  keypad:
    fontFamily: "Sniglet, ui-rounded, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    fontFeature: "tnum"
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  note:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  segment: "10px"
  control: "12px"
  segment-track: "14px"
  panel: "16px"
  pill: "999px"
  bubble: "50%"
spacing:
  tile: "clamp(52px, 8vmin, 96px)"
  snack: "clamp(88px, 16vmin, 150px)"
  tub: "clamp(140px, 22vh, 260px)"
  rim: "clamp(34px, 6vh, 56px)"
  gap: "10px"
  stack: "16px"
  section: "22px"
  panel: "clamp(20px, 4vw, 36px)"
components:
  bath-toy-button:
    backgroundColor: "{colors.suds}"
    rounded: "{rounded.bubble}"
    padding: "16px"
    size: "96px"
  jelly-play-button:
    backgroundColor: "{colors.jelly-green}"
    rounded: "{rounded.bubble}"
    size: "clamp(130px, 27vh, 230px)"
  foam-snack:
    size: "{spacing.snack}"
  book-plate:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10%"
    size: "min(20vh, 22vw)"
  book-plate-empty:
    backgroundColor: "{colors.enamel-shade}"
    rounded: "{rounded.control}"
  plate-tag:
    backgroundColor: "{colors.suds}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  cabinet-panel:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel}"
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.suds}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "48px"
  button-primary-active:
    backgroundColor: "{colors.plum-deep}"
    textColor: "{colors.suds}"
  button-quiet:
    backgroundColor: "{colors.plum-soft}"
    textColor: "{colors.plum-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "48px"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.suds}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "48px"
  button-record-live:
    backgroundColor: "{colors.rec-live}"
    textColor: "{colors.suds}"
  icon-button:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.control}"
    padding: "12px"
    size: "48px"
  field-input:
    backgroundColor: "{colors.suds}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "52px"
  keypad-key:
    backgroundColor: "{colors.suds}"
    textColor: "{colors.ink}"
    typography: "{typography.keypad}"
    rounded: "{rounded.control}"
    height: "64px"
  keypad-key-active:
    backgroundColor: "{colors.plum-soft}"
  segmented-track:
    backgroundColor: "{colors.plum-soft}"
    rounded: "{rounded.segment-track}"
    padding: "4px"
  segmented-option:
    textColor: "{colors.plum-deep}"
    rounded: "{rounded.segment}"
    padding: "0 14px"
    height: "44px"
  segmented-option-on:
    backgroundColor: "{colors.suds}"
    textColor: "{colors.ink}"
---

# Design System: Puffy

## Overview

**Creative North Star: "Bath Time Is the Lab"**

Puffy lives in a 1950s pink-tile bathroom at bath time. The whole screen is the room. A glazed tile wall runs full-bleed, a band of bathwater with a white enamel rim fills the bottom fifth, and every object in the room is a bath thing: element snacks are foam cutouts bobbing half-submerged in the water, the corner controls are bath toys (a rubber duck, a sticker book) floating inside soap bubbles, the silly idea arrives in a soap bubble, and discoveries slap onto the wet tiles and then collect on a tile panel. Puffy is a pink cumulus with a row of top puffs, a flat base, one top-left light and a feathered edge, with no outline.

One window light sits top-left and governs every highlight and every shadow. Highlights sit top-left on tiles, snacks, bubbles and Puffy's crowns; shade and cast shadows fall down-right. Every state change is a physical event (a squish, a splash, a pop, a wobble) rather than an abstract fade. Density is low: the child view carries Puffy, six snacks, two toys and at most one result at a time.

There are two registers. The child surface is the bathroom itself: Mode 0 has no text at all, and Mode 1 adds Sniglet foam letters on the snacks and short captions. The grown-up surface (parent gate and parent zone) is a white-enamel bathroom cabinet that opens over a dimmed room: flat fills, a system body face, Sniglet headings, one plum accent. The build also ships an automatic light mode (`.is-lite`) for low-end kids' tablets that drops filters and ambient effects while keeping every object and every state.

**Key Characteristics:**
- Full-bleed room: tile wall, bathwater band, enamel rim. No floating cards on the child surface.
- One top-left light for every highlight and shadow.
- Foam, soap bubble, jelly and enamel are the only materials.
- Squash-and-stretch motion on a bounce curve, used deliberately.
- Child surface is wordless in Mode 0; words appear only as foam letters in Mode 1.
- Grown-up surface is a quiet enamel cabinet in the same palette.

## Colors

A warm pink room, cool blue water and white enamel, with element colours as the only saturated notes and one plum ink for all text.

### Primary
- **Puffy Pink** (`puffy`): Puffy's body mid-tone and the brand colour. Binding (blueprint).
- **Puffy Shade** (`puffy-shadow`): the shaded lower mass of Puffy. Binding (blueprint). The cloud body gradient runs from Crown Blush (`puffy-crown`) at the top through Puffy Pink to a deeper pink at the flat base.
- **Cheek Pink** (`puffy-cheek`): Puffy's cheeks at 55% opacity and the cheeks on the floaty snack face.
- **Cloud Plum** (`puffy-ink`): Puffy's eyes, brows and mouth lines. Slightly warmer than text ink so the face reads as part of the cloud.

### Secondary
- **Gas Sky** (`gas`), **Nonmetal Mint** (`nonmetal`), **Metal Gold** (`metal`): the element family colours. Binding (blueprint). Hydrogen renders in Gas Sky and chlorine in Nonmetal Mint. Metal Gold appears only in discovery confetti in the current build.
- Per-element snack colours live in the content data, not in this token set. Oxygen uses a deeper gas blue (#4FC3F7) so it can sit next to hydrogen, helium uses a lilac (#E6C8FF) because the blueprint has no noble-gas colour, and sodium and carbon diverge from their families (see Do's and Don'ts).

### Tertiary
- **Bath Yolk** (`accent`): the one attention colour. Used for the "something new" dot on the sticker-book bubble, the ring on a newly added book plate, the hint glow on a suggested snack, and sodium's star. Binding (blueprint).
- **Jelly Green** (`jelly-green`, `jelly-deep`): the wobbling play button only. Jelly Deep also tints its cast shadow.

### Neutral
- **Tile Top / Tile Bottom** (`tile-top`, `tile-bottom`): the wall gradient, lighter near the window. Binding (blueprint).
- **Grout** (`grout`): 3px grout lines between tiles.
- **Bathwater** (`water`, `water-deep`, `water-line`): the water band gradient and the back wave crest.
- **Suds White** (`suds`): suds, soap-bubble highlights, splash rings, foam-letter fill, enamel highlights and grown-up input fields.
- **Enamel** (`enamel`, `enamel-shade`, `enamel-edge`): the tub rim, book plates and the parent cabinet. Enamel Edge is the 1.5px inset stroke on fields and keys.
- **Plum Ink** (`ink`): all text and all snack faces. **Soft Plum** (`ink-soft`): secondary text, icon buttons, notes.
- **Plum** (`plum`, `plum-deep`, `plum-soft`): the grown-up accent. Plum fills the primary button and the focus ring; Plum Deep is its pressed state and quiet-button text; Plum Soft is quiet-button and segmented-track fill.
- **Sad Grey** (`sad`): binding (blueprint) but not rendered yet. Puffy's sad state is shown by desaturating the cloud (saturate 0.55) and a blue tear.
- **Danger** and **Record Live** (`danger`, `rec-live`): grown-up surface only, for the destructive button and the live name-recording button.

### Named Rules
**The Blueprint Rule.** Puffy Pink, Puffy Shade, the tile gradient, the three family colours, Bath Yolk and Sad Grey are binding brand values. Never retune them for a screen; add a new token instead.

**The One Yolk Rule.** Bath Yolk means "look here". It appears on at most one or two things at a time and never as a fill for large areas.

**The Plum Ink Rule.** Every piece of text and every face line is plum, never black. Plum Ink (`ink`) for text and snack faces, Cloud Plum (`puffy-ink`) for Puffy's face.

## Typography

**Display Font:** Sniglet (with ui-rounded, system-ui fallback), self-hosted via @fontsource at weight 800.
**Body Font:** the system UI stack (system-ui, -apple-system, Segoe UI, Roboto).

**Character:** Sniglet at 800 is a fat, rounded face that reads as cut foam when it is filled white and stroked in plum ink. The system face does the grown-up work plainly so the cabinet feels like a utility, not a second game.

### Hierarchy
- **Foam Display** (800, clamp(30px, 5.5vh, 52px), 1.05): discovery names and Mode 1 captions. White fill with a 7px plum-ink stroke painted under the fill.
- **Foam Formula** (800, clamp(22px, 3.6vh, 34px)): the formula next to a discovery name, in Plum Deep.
- **Foam Letter** (800, 40 SVG units on a 120-unit snack): element symbols on Mode 1 snacks, white fill with a 4-unit plum-ink stroke.
- **Foam Caption** (800, clamp(15px, 2.4vh, 22px), 1.15): the short line under a soap-bubble thought in Mode 1, plum ink, balanced wrap.
- **Cabinet Title** (800, clamp(24px, 3.4vh, 30px), 1.15): the cabinet's title.
- **Cabinet Heading** (800, 20px, 1.2): section headings inside the parent zone.
- **Keypad** (800, 26px, tabular numerals): gate keys; the gate entry uses the same face at 36px.
- **Body** (400, 16px, 1.5): parent zone text. Hints cap at 60ch, setting notes at 46ch.
- **Label** (600, 15-16px): button labels, field labels, setting labels, found-item names.
- **Note** (400, 14px): setting notes and footers, in Soft Plum.

### Named Rules
**The Foam Letter Rule.** On the child surface, words are objects: Sniglet 800, white fill, plum stroke painted beneath (`paint-order: stroke`). Plain flat text on the child surface is limited to the small thought caption.

**The Zero Words Rule.** Mode 0 renders no text anywhere in the child's view. Any child-surface text must be gated behind the parent's words-on-screen setting.

**The Tabular Count Rule.** Every number on the grown-up surface (found counts, gate entry, keypad) uses tabular numerals.

## Layout

The child surface is a fixed, full-viewport stage with no scrolling. It is layered back to front: tile wall, window light (soft-light blend), wall bubbles, the tub (water, snacks, front water veil, enamel rim), the stage (Puffy, results, toys), then the evening overlay.

- **Tile unit** (`spacing.tile`): the wall's tile size and the base for the corner toy bubbles (1.55 tiles, never under 96px).
- **Snack** (`spacing.snack`): 88px minimum, up to 150px. Six snacks sit evenly spaced along the waterline, which crosses each snack about 60% of the way down so they float in the water.
- **Tub** (`spacing.tub`, `spacing.rim`): the water band plus the enamel rim along the bottom.
- **Puffy** is centred horizontally near the top, about 48vh tall in landscape. The play button sits to the right at 82% across; discoveries land upper right; the soap-bubble thought sits upper left below the duck so the duck stays tappable.
- **Corners:** home (duck) top-left, book top-right, both inset max(2vw, 12px) from the side and max(2vh, 10px) from the top. On the home screen the parent gear takes the top-left corner.
- **Book:** a 3-column grid of square plates, each min(20vh, 22vw), with gaps at 8% of the plate size, centred at the top.
- **Portrait** (phones and tablets): snacks shrink to clamp(88px, 14vw, 120px), Puffy moves to 12vh, and the play button, discovery, thought and held snack stack centrally above the tub.
- **Grown-up cabinet:** a centred panel, min(680px, 100%) wide, scrolling inside itself, padded clamp(20px, 4vw, 36px). Sections are separated by a 1px Enamel Shade rule and 22px of padding. Controls use a 10px gap; field stacks use 16px.

### Named Rules
**The No-Scroll Room Rule.** The child surface never scrolls, never paginates and never shows chrome. The room is the viewport.

**The 88 Floor Rule.** No child-facing target is smaller than 88px. Snacks start at 88px, toy bubbles at 96px, the play button at 130px.

## Elevation & Depth

Depth is a single-light system, not a stacking scale. The one window light is top-left, so every cast shadow is a soft, plum-tinted drop-shadow offset down-right, and every highlight is a white radial glaze at the top-left. Shadows are tinted with Puffy's cast plum (rgba(166, 60, 120, ...)) on the wall and with blue-grey (rgba(90, 140, 175, ...)) on objects in the water. The grown-up cabinet is the only surface that lifts off the room, with one large soft shadow over a plum dim.

### Shadow Vocabulary
- **Puffy cast** (`filter: drop-shadow(18px 26px 20px rgba(166, 60, 120, 0.22))`): Puffy's shadow on the wall.
- **Snack in water** (`filter: drop-shadow(3px 5px 4px rgba(90, 140, 175, 0.28))`): foam snacks bobbing in the bath.
- **Held / dragged snack** (`drop-shadow(10px 16px 12px rgba(166, 60, 120, 0.3))`): a snack lifted out of the water toward Puffy.
- **Toy bubble** (`box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.75), 6px 10px 16px rgba(166, 60, 120, 0.2)`): the white bubble rim plus a soft cast.
- **Book plate** (`box-shadow: inset 0 0 0 4px #fff, 5px 8px 12px rgba(166, 60, 120, 0.2)`): an enamel plate on the wall. Empty plates are pressed in instead (`inset 4px 6px 10px rgba(166, 60, 120, 0.18)`).
- **Cabinet** (`box-shadow: inset 0 0 0 1px #fff, 0 20px 50px rgba(58, 34, 51, 0.28)`): the grown-up panel over a rgba(58, 34, 51, 0.38) dim.

### Named Rules
**The Window Light Rule.** Highlights sit top-left and shadows fall down-right, on every object. A shadow cast in any other direction is wrong.

**The Soft Cast Rule.** Cast shadows in the room are always blurred and tinted plum or water blue. The only hard offset in the world is a foam snack's cut edge, which is the foam's own thickness, not a shadow.

**The Lite Room Rule.** Under `.is-lite` every filter is dropped and steam, wall bubbles, caustics, cloud creases and cloud crowns are hidden. Depth must still read from gradients and the foam edge alone.

## Shapes

Round and soft throughout. Puffy, the soap bubbles, the suds and the splash rings are circles; bubbles wobble their border radius slightly while they float. Snacks are six foam silhouettes (round, drop, rounded block, star, leaf, balloon), each with a flat colour top face, a darker foam edge offset down-right (the top colour darkened 28%) and a white glaze top-left. Tiles are square with a 3px grout line and a small top-left bevel. Enamel objects (book plates, cabinet controls) use gently curved corners (12px); the cabinet panel is 16px; the segmented track is 14px with 10px options; plate tags are pills. Nothing on the child surface has a stroked outline except the foam letters' plum stroke and the white bubble rims.

## Components

### Bath-Toy Bubble (corner buttons)
Toys floating in soap bubbles, the child's only navigation.
- **Shape:** a circle, 1.55 tiles and never under 96px, padded 16px.
- **Material:** an iridescent conic film (pink, sky, mint, butter, lilac), a white inner wash, a white top-left glint and a 3px white rim. The toy inside (rubber duck for home, sticker book for the Discovery Book, jelly play for returning to play) has its own soft drop shadow.
- **Motion:** the bubble floats and slightly stretches (3.2s); the toy tilts ±6deg (2.6s). Press squishes it (scale 1.14/0.86 then 0.94/1.06). When a discovery flies to the book, the bubble receives it with a scale-and-tilt pop.
- **News:** a 22px Bath Yolk dot with a 4px white ring pulses at the top-right when the book has something new.

### Jelly Play Button
A green jelly sweet with a white play triangle.
- **Size:** clamp(130px, 27vh, 230px), right side of the home screen.
- **Motion:** it wobbles continuously (scale and rotation, 1.8s) and squishes on press. It never just pulses.

### Foam Snack
- **Shape:** one of six silhouettes on a 120 x 124 grid, at `spacing.snack`.
- **Colour:** a flat element colour on top, the same colour 28% darker as the foam edge, a white top-left glaze.
- **Face:** plum-ink eyes with white catchlights and a mouth matched to the element's personality. In Mode 1 the face is replaced by the foam letter, with small eyes kept above it.
- **States:** bobbing and tilting ±3deg at rest, staggered per snack; a white ripple ring on the waterline; lifted on press; faded to 28-35% while dragged or held; a Bath Yolk glow when hinted.

### Puffy
- **Body:** a pink cumulus built from six top puffs, five body lobes and a flat rounded base, filled with a vertical gradient from Crown Blush to Puffy Pink to a deeper base pink, shaded away from the window, with blurred fold creases under the puffs and white blurred crowns. The edge is feathered by a soft blur merge. The body is painted once and only ever moved by transforms.
- **Face:** a separate light SVG layer: white eyes with plum pupils and catchlights, cheek ellipses, a mouth per state, and small cream sparkles.
- **Belly window:** eaten snacks show faintly through the lower body (multiply blend) and churn while Puffy chews.
- **States:** hungry, gulp, chewing, thinking, curious, delighted, spitting, proud, shrug, sad, encouraging, spicy and sleepy are each a pose with its own squash, stretch or tilt. Puffy leans and looks toward the finger during a drag.

### Soap-Bubble Thought
- The silly idea appears inside a large iridescent soap bubble (the toy-bubble film with a denser white wash) with two small trailing stem bubbles, and the two fed snacks orbit it. It pops (scale 1.25, fade, 0.22s) when done. In Mode 1 a Foam Caption sits beneath it.

### Discovery
- The result art slaps onto the wall with a white splash bloom, then wobbles gently. Its name and formula sit beneath it in Foam Display and Foam Formula when words are on. Confetti in the family colours, Bath Yolk and Cheek Pink bursts from it. It then flies toward the sticker-book bubble.

### Book Plates (Discovery Book)
- **Corner Style:** gently curved (12px).
- **Background:** an Enamel plate with a white top-left glint and a 4px white inset border; lifted by the Book plate shadow.
- **Empty:** a pressed-in pink plate showing the discovery as a faint plum ghost silhouette, with no animation.
- **New:** a Bath Yolk ring pulses around it. Tapping a found plate wiggles its art.
- **Tag:** a white pill at the bottom edge with the plate number (13px, Soft Plum, tabular) and name (16px, 800, plum ink), in Sniglet.

### Buttons (grown-up)
- **Shape:** gently curved (12px), at least 48px tall, 18px side padding, label weight 600, optional 20px icon with an 8px gap.
- **Primary:** Plum fill, white text. Pressed: Plum Deep and scale 0.98 (96ms).
- **Quiet:** Plum Soft fill, Plum Deep text.
- **Danger:** Danger fill, white text, for destructive actions only.
- **Record:** Quiet until live; when recording it turns Record Live with a pulsing 6px halo.
- **Disabled:** 45% opacity.
- **Icon button:** 48px square, Soft Plum icon, transparent; Plum Soft fill on press.

### Inputs / Fields
- **Style:** white fill, 52px tall, 12px corners, 16px side padding, 18px text, with a 1.5px Enamel Edge inset stroke.
- **Focus:** the inset stroke becomes 2px Plum. Elsewhere, focus is a 3px Plum outline with a 3px offset.

### Parent Gate Keypad
- A 3-column keypad of white 64px keys with the Enamel Edge inset, Sniglet 800 tabular numerals, pressed to Plum Soft at scale 0.96. The quiet key (backspace) is transparent with a 30px icon. Above it, a 132 x 64px white entry well shows the typed answer at 36px.

### Segmented Control
- **Style:** a Plum Soft track (14px corners, 4px padding) holding 44px-tall options (10px corners) with Plum Deep text.
- **Selected:** a white option in plum ink, weight 600, with a 1px soft plum shadow.

### Cabinet
- The parent gate and parent zone open as a white-enamel cabinet over the dimmed room. It rises 24px and fades in over 0.28s, with a close icon button top-right and a Sniglet title.

## Do's and Don'ts

### Do:
- **Do** light every object from the top-left: glint top-left, shade and cast down-right.
- **Do** make every state change a physical event: squish, splash, pop, wobble, slap. Use the bounce curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for arrivals and presses; it is intentional here.
- **Do** keep every child-facing target at 88px or more, snacks at `spacing.snack`, and toy bubbles at 96px or more.
- **Do** build new child-surface objects from the world's materials: foam cutout, soap bubble, jelly, enamel, bathwater, tile.
- **Do** render child-surface words only as foam letters (Sniglet 800, white fill, plum-ink stroke), and only when the parent has turned words on.
- **Do** keep Puffy a pink cumulus: a row of top puffs, a flat base, one top-left light and a feathered edge, with no outline.
- **Do** give every new effect a `.is-lite` fallback that keeps the object and its state readable without filters or blend modes.
- **Do** collapse animation under reduced motion; the build sets every animation and transition to 0.01ms.
- **Do** use tabular numerals for every count on the grown-up surface.

### Don't:
- **Don't** put any text in the Mode 0 child view.
- **Don't** add timers, scores, fail states, countdowns or red "wrong" signals to the child surface. A nearing time limit warms the room toward evening instead.
- **Don't** put floating cards, panels or flat UI buttons on the child surface. Controls are toys in bubbles or the jelly button.
- **Don't** use black or grey text anywhere; text is plum.
- **Don't** give Puffy a hard outline or draw Puffy as cotton candy or steam.
- **Don't** retune the blueprint colours. Sodium in Bath Yolk (#FFD966) and carbon in slate (#5B5560, a lightened take on the blueprint's #4A4A4A so its face reads) follow the blueprint's own per-element table (§20), which is more specific than its family colours (§16). Where the two conflict, the element table wins. New elements take their family colour unless §20-style content gives one.
- Steam over Puffy appears only in the spicy state (hot steam). A calm Puffy never steams.
- **Don't** use Bath Yolk as a large fill or on more than one or two things at once.
- **Don't** show the plum cabinet treatment, parent controls or system-face text inside the child room, apart from the faint parent gear on the home screen.

# DESIGN.md: ravindra-siso.vercel.app, redesigned

Built with the `awwwards` skill (juliobsz/skills). The bar is Site of the Day; the site is for
Ravindra and the people who might hire him.

## Brief (Phase 0)

- **Subject:** Ravindra Sisodia. Designer and AI engineer. Born in Jodhpur, Rajasthan; based in
  Bengaluru. Builds brands and the apps they live inside. Shipped three Mac apps on Product Hunt
  in seven weeks (Chit #3, Crew #7, Notchling #8), built with Claude Code. Twelve selected works
  2022 to 2026 (Zop.Dev, YES Bank, CEAT, Tata Capital, Strand, VOC, Federate, Lyke and more),
  seven written case studies (Zop.Dev and ScreenRoot). Rides a Royal Enfield: "pixels by day,
  petrol by dusk".
- **Audience:** founders and design leads hiring a founding or senior product designer who also
  ships code; recruiters; the Product Hunt and Dribbble crowd.
- **Job:** get him hired for the next end-to-end build. One action: email.
- **Assets (all real):** portrait.jpg 1400x933, face cutout, Jodhpur fort photo 2220x1400, bike
  photo 1480x830, Pune photo, product shots of Chit, Crew and Notchling, the six Crew sprite
  species with blink, sleep and walk frames, twelve project thumbnails, the seven case texts.
- **Constraints from the owner (memory):** text 100 percent legible, photo subjects fully
  visible (no text over the fort or the bike, no scrims), never remove a project, no em dashes,
  no section symbol, ink never pure black, one accent, 1 px lines.
- **Language:** English. **Stack:** Astro (content-only showcase, GL hero, page transitions).
- **Assumptions:** none invented. Every number on the site comes from the current site or the
  case texts. Where a case study only has a qualitative outcome, the page says what shipped.

## Concept (Phase 1)

| | A. Suryanagari (name + place) | B. Jali (material + place) | C. The session (process) |
|---|---|---|---|
| Idea | Ravindra means lord of the sun and Jodhpur is the Sun City, so one sun lights the whole site: it rises with the loader, crosses the page as you scroll, and every shadow, dot and colour follows it | Every image is seen through a jali, the carved stone screen of Mehrangarh: the dots of the dither are the holes in the stone, and the screen opens as you come close | The site is a Claude Code session: a crew of sprites builds each section while you watch, hooks fire as you scroll, and the footer prints a Chit receipt of what you saw |
| Anchor | Ravi = sun, Indra = lord; Jodhpur's nickname Suryanagari, 300+ sunny days | Mehrangarh's jalis; the dithered portrait he already uses | Crew and Chit are his products; hooks are his material |
| Layout rule | A horizon line runs through the site; sections are hours of one day; everything hangs from the light | Lattice grid; images masked by stone pattern | Terminal log; rows assemble |
| Motion verb | sweep, like a shadow across a wall | open, like a shutter of stone | build, like a hook firing |
| Signature | The name on the wall casts a hard shadow that swings as the sun moves; the dithered portrait is lit from the same source | A closed lattice over each cover that opens on approach | Sprites walk in and lay the rows |
| Screenshot | 7 am: the name with a long sharp shadow across a blue wall, the portrait half in light, the small sun on the frame edge reading "07:12 Jodhpur" | A fort photo half revealed through stone | A receipt listing the visit |
| O / F / Fe / P | 4 / 5 / 4 / 2 | 4 / 4 / 4 / 3 | 4 / 4 / 3 / 2 |

**Pick A.** It is the only one nobody else can own (his name and his city say the same thing),
and it generates everything: light direction, shadow length, the dither density, the chapter
colours, the time labels, the loader (sunrise), the transition (dusk and dawn), the 404 (night).
Steal from B for the material: the light arrives through a jali, so it is made of dots. The
dither on the portrait and the reveals of every image are ordered-dither lattices lit from the
sun's side; where the visitor points, the lattice opens and the photo shows clear. Steal from C
for the 404 only: a Crew sprite asleep at night.

Swap test: put another designer in the sentence and "the sun lights the site" becomes a style.
Put Ravindra from Suryanagari in it and it is a fact about him. Portability 2.

```
Idea:        Ravindra means lord of the sun and he comes from the Sun City, so one sun lights the
             whole site and everything on it follows the light.
Metaphor:    one day in Jodhpur, from a blue-washed morning wall to a desert dusk; the light
             comes in through a jali, which is why it is made of dots.
Signature:   the hero name casts a hard projected shadow that swings and shortens as the sun
             climbs with scroll (patterns.md 1 driver + 4 decorative copy); the dithered portrait
             is a GL plane lit from the same sun (custom imageFragment: ordered dither, lit side
             fine and bright, far side coarse and dark; the lattice opens around the pointer).
Emotion:     a sunlit wall at seven in the morning. Warm, sharp, quiet. Then the shadow moves.
Motion verb: sweep. Reveals wipe along the light's direction, hovers are a band of light passing
             over the target, page transitions are dusk (night rises from the ground) and dawn
             (it lifts from the top), the loader is the sun rising over a horizon line.
Screenshot:  "Ravindra Sisodia" in heavy expanded type with a long shadow angled across a
             Jodhpur-blue wall, the dithered portrait half lit, the sun disc on the frame edge
             with "07:12 Jodhpur".
```

## System (Phase 2)

### Palette (from Jodhpur: lime-washed blue walls, chalk, sandstone, the sun, the night)

| Role | Value | Where |
|---|---|---|
| ground | `#2E4CA6` Jodhpur wall | home morning and afternoon chapters, index page |
| ink | `#F3EEE4` chalk | text on blue (6.7:1) |
| muted | `#C3CCEA` | secondary text on blue (6.0:1) |
| line | `rgb(243 238 228 / 0.18)` | hairlines on blue |
| accent | `#FFB742` sun | the sun disc, focus ring, one CTA, the lit edge of hovers |
| curtain | `#0E1431` night | loader ground, transitions, contact chapter, 404 |
| noon ground | `#F0E9DC` sunlit chalk | launches chapter, case pages (reading) |
| noon ink | `#17265C` indigo | text on chalk (11:1) |
| noon muted | `#4F5B86` | secondary on chalk (5.6:1) |

Chapters: dawn (loader, night to blue), morning (hero, blue), noon (launches and how it ships,
chalk), afternoon (selected work and story, blue), dusk and night (contact, night indigo). The
ground tweens between chapters on scroll through one `data-chapter` on `<html>`; every text
colour reads `--c-fg`, so nothing is ever left in the wrong ink. Each chapter is a motivated
change (the sun's height), not a decoration.

### Type

- **Archivo** (Google, variable: wdth 62 to 125, wght 100 to 900). One family, two
  personalities: the name and section titles at wdth 125 wght 800 (expanded, heavy, a wall
  inscription); body and UI at wdth 100 wght 400 to 500. Display tracking -0.035em at mega,
  -0.02em at xl. Leading 0.86 for the name, 0.95 for titles, 1.5 body.
- **JetBrains Mono** (Google, variable) for data only: times, dates, launch points, coordinates.
  Never for decorative labels.
- Scale: `--t-mega clamp(3.4rem, 1rem + 11.5vw, 13rem)`, `--t-xl clamp(2.25rem, 1.2rem + 4.4vw, 5.5rem)`,
  `--t-l clamp(1.6rem, 1.2rem + 1.8vw, 2.75rem)`, `--t-m clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem)`,
  `--t-body clamp(1rem, 0.95rem + 0.2vw, 1.125rem)`, `--t-s 0.875rem`, `--t-xs 0.75rem`.
- Body measure 60ch max. Numbers tabular. Real apostrophes.

### Grid and rhythm

12 columns, gutter `clamp(1rem, 0.6rem + 1.6vw, 2.5rem)`, outer margin = gutter. Three strong
lines: col 1, col 5, col 9. Text blocks start on col 5 unless they are the display line.
Four-corner frame: wordmark top-left, nav top-right, the sun and its time bottom-left, "Email me"
bottom-right. The frame steps aside when scrolling down and returns on scroll up.
Rhythm: hero 190svh (sticky stage), launches airy (28u), how-it-ships normal (16u), index tight
(rows), story airy, contact full viewport.

### Shape and motion

- Radius 0. Lines 1 px. No shadows except the projected ones that belong to the concept.
- Eases: `expo.out` entrances, `expo.inOut` curtains, `power3.out` hovers. Big slow, small fast.
  Stagger 40 to 80 ms.
- Reveals: `clip-path` wipes from the lit side (the sun's side), never fade-up on every section.
- Hover (primary targets): a band of light sweeps across the target from the sun's side, the
  label slides inside its clip (one treatment, reused for nav, CTA and project rows). Utility
  links change colour only.
- Idle: the sun creeps with real time (a few tenths of a degree per minute) and leans with the
  pointer by 8 percent, so shadows move while the visitor reads. Off under reduced motion.

### Composition plan

```
HERO (poster + scene, 190svh sticky)         LAUNCHES (asymmetric pairs, noon chalk)
+------------------------------------------+ +------------------------------------------+
| RAVINDRA SISODIA     Work  Story  Email  | | Three launches,                          |
|                                          | | three top tens.                          |
| Ravindra       .....:::::::::::....      | |                                          |
| Sisodia      .:::: dithered :::::.       | | #3  Chit          [receipt image ]       |
|   \\\\ shadow \\\\  portrait, lit  ::    | |     a printed receipt of your day        |
|       \\\\\\\\\\     from the left        | |     226 pts  Sep 26 2026  Swift          |
|                                          | |                                          |
| (o) 07:12 Jodhpur     Email me ->        | | [crew image]        #7  Crew             |
+------------------------------------------+ |                     141 pts  Aug 7       |
                                             | #8  Notchling      [notch image]         |
HOW IT SHIPS (statement + list)              +------------------------------------------+
+------------------------------------------+
| The launches are the output.             | SELECTED WORK (index list + cursor preview)
| The system behind them is the real work. | +------------------------------------------+
|                                          | | 01 Zop.Dev marketing site  Brand Web 2026|
| My own design skill  ............        | | 02 Zop.Dev brand kit       Brand     2026|
| Hooks, not polling   ............        | | 03 YES Bank app UI         Product   2023|
| Agents that review   ............        | | 04 CEAT Tyres website      Web       2023|
| Transcripts as data  ............        | | 05 Recommendation engine   Product   2025|
+------------------------------------------+ | 06 Onboarding 20 to 7 min  Product   2025|
                                             | All work, nineteen ->                    |
STORY (two asymmetric pairs, photos clear)   +------------------------------------------+
+------------------------------------------+
| [ Mehrangarh photo, 7 cols ]  Jodhpur,   | CONTACT (footer as finale, night)
|                                Rajasthan.| +------------------------------------------+
|                                the place | | Pitch me something impossible.           |
|                                where i   | |                                          |
|                                grew with | | sisodia.ravindra10@gmail.com  [Email me] |
|                                design.   | |                                          |
| Pixels by day,   [ bike photo, 7 cols ]  | | instagram github linkedin dribbble       |
| petrol by dusk.                          | | ______________ horizon ______________    |
|                                          | | RAVINDRA SISODIA   Jodhpur 18:40, set   |
+------------------------------------------+ +------------------------------------------+

CASE PAGE (noon chalk, sun pinned high)      404 (night, sun pinned down)
+------------------------------------------+ +------------------------------------------+
| <- Work                                  | | The sun is down on this one.             |
| Chit                                     | |   (zzz sprite asleep)                    |
| A printed receipt of your day.           | | Back to the morning ->                   |
| Client Year Role                         | +------------------------------------------+
| [ hero image, GL, instant ]              |
| Context / Idea / Craft figures / Outcome |
| Next: Crew ->                            |
+------------------------------------------+
```

### Genericness test

A generic model given "redesign my portfolio" lands on: near-black, one acid accent, Inter,
a fade-up on every section, a horizontal gallery. Changed: the ground is a specific wall colour
from his city; the type is one wide heavy family set like an inscription; nothing fades up,
things are lit; the signature is a shadow with a real sun behind it; the index is a list with
previews, not a gallery; the loader shows a sunrise with a real time, not a counter.

Defaults avoided: Inter and Instrument Serif (the current site), eyebrow labels, "01 02 03" on
things that are not a sequence (the index numbers are a sequence: the order he chose), mono on
every label (mono only on data), the four-corner frame kept because every corner carries real
information.

### Pass two, critic at 7.0, and what changed

A blind critic scored pass two 7 / 7 / 7 / 7 (Design, Usability, Creativity, Content). Its reading
of the idea matched the card. Fixed from its list: the frame now steps aside on any scroll (the
ticker reads the native position), back and forward land with reveals finished, the sunrise plays
once per session and only on the home page, section padding is clamped to the viewport, inner
pages keep the sun on the frame and carry the hour the visitor left at, rolled labels are
generated from `data-text` so assistive tech reads them once, title links answer with the
underline-to-band treatment at rest, figures keep their own proportions, the corner clock is
captioned as the site's day, the home list drops its index numbers, the 404 tail is closed, and
phone rows without a thumbnail show their kind instead. Removed one accessory: the count-up on
launch points.

### Pass three and four, critics at 7.7 and 7.2

Both read the idea as the card has it. The second asked for the inner pages to carry the day, the
loader to respect slow phones, and the index card to stop occluding rows: done (the sun now
moves a quarter of a day per inner page, a 2.2 s safety net paints the page without the sunrise
when the script is late, the card rides the lane between columns). The third caught the pads I
had put under the frame corners reading as boxes over text, so the frame now returns on a band
of the page colour instead, the email corner lives only at the top of the page, and the sun
dial moved out of the fixed frame into the hero's own bottom-left block. Also from its list: the
footer wordmark sized to its container, phone shadows cast straight down, the index sentence
generated from the data, the cue on every phone row, the footer clock sentence naming both
clocks, the dither pitch following the plane so the phone portrait keeps its face, and GL planes
sampling the largest image candidate.

### Decisions written down

- Idle motion: yes, through the driver (sun creeps with real time, leans with the pointer).
- No-GL and reduced motion: the portrait shows as a pre-dithered PNG, photos show clear, the
  ground paints each chapter's static colour, shadows sit at the chapter's default angle.
- Loader on first visit only, 1.1 to 2.2 s, counts the sunrise time (real, computed for Jodhpur
  on the visitor's date).
- Touch: no hover dependence. Index rows show inline thumbnails; the portrait lattice opens
  with scroll velocity instead of the pointer.

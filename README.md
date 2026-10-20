# ravindra-siso.vercel.app

Ravindra Sisodia's portfolio, rebuilt as an Astro site around one idea: Ravindra means lord of
the sun and Jodhpur is the Sun City, so one sun lights the whole site. The concept, the three
alternatives and the full system are in `DESIGN.md`.

## Where things live

- `src/data/site.ts`: every visible string, the launches, the nineteen works, the ten case
  studies, the story and the contact block. Edit content here, never in markup.
- `src/pages/`: `index.astro` (home), `work/index.astro` (the index), `work/[slug].astro`
  (one page per case in `cases`), `404.astro`.
- `src/layouts/Base.astro`: head, SEO, the persisted layers, loader, frame, footer slot.
- `src/components/`: `Loader.astro` (the sunrise), `Frame.astro` (four corners),
  `Footer.astro` (inner pages).
- `src/motion/`: `sun.ts` (the driver: scroll to sun position to shadows, dither, chapters),
  `setup.ts` (loader, transition, hovers, index preview, real clock), `solar.ts` (sunrise and
  sunset arithmetic for Jodhpur), `idle.ts` (the idle input).
- `src/engine/`: the motion engine from the `awwwards` skill (Lenis on the GSAP ticker,
  reveals, loader, transitions, OGL planes). `gl/shaders.ts` holds the sun-lit ordered dither.
- `src/styles/`: `tokens.css` (palette, type, the sun variables), `engine.css`, `site.css`.
- `src/assets/`: photos and product shots (optimized by Astro at build). `public/img/`:
  the pre-dithered portrait for the no-WebGL path, cursor previews, sprites.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

## QA (the awwwards skill's loop)

```bash
S=~/.claude/skill-sources/juliobsz-skills/awwwards/scripts
npm run build && node $S/serve.mjs dist --port 4400 &
node $S/audit.mjs http://127.0.0.1:4400/
node $S/shoot.mjs http://127.0.0.1:4400/ --crawl --nav
```

Regenerate the share image after a hero change: `node $S/og.mjs http://127.0.0.1:4400/ --out public/og.png`, then rebuild.

## Deploy

Vercel, zero config: `vercel.json` pins the Astro preset and `package.json` pins Node 24.
Push to the repo that backs ravindra-siso.vercel.app and Vercel builds `dist/`.

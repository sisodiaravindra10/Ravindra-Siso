// The driver. One variable, the sun's place in the day (p: 0 dawn .. 1 dusk), fans out to every
// visual that carries the concept: the projected shadow of the name, the hard shadows on small
// objects, the sun disc on the frame, the clock, the GL planes' lit side, and the chapter ground.
// Scroll drives it on the home page; inner pages pin it ([data-state] on <main>). The pointer
// leans it by a few percent and real time creeps it, so shadows keep moving while nobody scrolls.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion } from '../engine';
import { sun as glSun } from '../engine/gl';
import { idle } from './idle';
import { clockFor } from './solar';

type State = { p: number; x: number; alt: number; warm: number; chapter: string };

let current = 0;           // latest scroll-driven value
let pinnedState: number | null = null;
let defaultChapter = 'morning';
let chapterLocked = false; // inner pages keep their chapter
let sectionDriven = false; // on the home page the sections hand the chapter over
let clocks: HTMLElement[] = [];
let last = '';
let lastSunX = -9;

export function map(p: number): State {
  const c = Math.max(0, Math.min(1, p));
  const x = -1 + 2 * c;                          // east → west
  const alt = Math.sin(Math.PI * c);             // 0 at the horizon, 1 at noon
  const warm = 1 - Math.pow(alt, 0.6);           // warm at dawn and dusk
  const chapter = c < 0.05 ? 'dawn' : c > 0.96 ? 'night' : c > 0.86 ? 'dusk' : c > 0.6 ? 'afternoon' : c > 0.36 ? 'noon' : 'morning';
  return { p: c, x, alt, warm, chapter };
}

function apply(p: number, drift = 0) {
  const s = map(p);
  const c = drift ? map(p + drift) : s;
  const h = document.documentElement;
  const lean = prefersReducedMotion() ? 0 : idle.x * 0.16;
  const x = Math.max(-1, Math.min(1, c.x + lean));
  const alt = Math.max(0.06, c.alt);
  // Capped so the shadow's tail stays inside the hero stage and never smears into the next section.
  const len = Math.max(0.12, Math.min(0.42, 0.22 / Math.tan(alt * Math.PI * 0.5 * 0.9 + 0.08)));
  // --sun-x feeds box-shadows, which repaint: write it only when it has moved a real amount.
  if (Math.abs(x - lastSunX) > 0.03) { lastSunX = x; h.style.setProperty('--sun-x', x.toFixed(3)); }
  h.style.setProperty('--sun-alt', alt.toFixed(3));
  h.style.setProperty('--sh-len', len.toFixed(3));
  h.style.setProperty('--sh-skew', `${(-x * 38).toFixed(1)}deg`);
  h.style.setProperty('--sh-x', `${(-x * 0.07 * (1 + (1 - alt))).toFixed(3)}em`);
  h.style.setProperty('--sh-y', `${(0.03 + (1 - alt) * 0.07).toFixed(3)}em`);
  h.style.setProperty('--sun-pos', `${(6 + (x + 1) * 44).toFixed(1)}%`);
  h.style.setProperty('--warm', c.warm.toFixed(3));
  glSun.x = x; glSun.y = alt; glSun.warm = c.warm;
  if (!chapterLocked && !sectionDriven && h.dataset.chapter !== s.chapter) h.dataset.chapter = s.chapter;
  // The clock is a pure function of scroll; only the light breathes at rest.
  const label = clockFor(s.p);
  if (label !== last) { last = label; for (const el of clocks) el.textContent = label; }
}

const tick = () => {
  // A slow swing of about a minute of the site's day, plus real time creeping the sun along (a site-minute every ~40 s).
  const drift = prefersReducedMotion() ? 0 : Math.sin(idle.t * 0.35) * 0.045 + idle.t * 0.00002;
  apply(current, drift);
};

export function startSun() {
  // Home: the scroll is the day. Inner pages: the day goes on from the hour you arrived, a quarter of it per page.
  onScroll(({ progress }) => { current = pinnedState === null ? progress : Math.min(1, pinnedState + progress * 0.25); });
  onPage(() => {
    const main = document.getElementById('main');
    const pin = main?.dataset.state;
    // Inner pages start at their own hour (noon for a case, afternoon for the index, night for the 404).
    pinnedState = pin ? parseFloat(pin) : null;
    chapterLocked = !!main?.dataset.chapter;
    clocks = [...document.querySelectorAll<HTMLElement>('[data-clock]')];
    last = '';
    if (chapterLocked) document.documentElement.dataset.chapter = main!.dataset.chapter!;
    else document.documentElement.dataset.chapter = defaultChapter;
    current = pinnedState ?? 0;
    apply(current);
    gsap.ticker.add(tick);
    // Sections can hand the chapter over as they arrive, so the ground changes where the content does.
    const triggers = [...document.querySelectorAll<HTMLElement>('[data-chapter-at]')].map((el) =>
      ScrollTrigger.create({
        trigger: el, start: 'top 55%', end: 'bottom 55%',
        onToggle: (st) => { if (st.isActive && !chapterLocked) document.documentElement.dataset.chapter = el.dataset.chapterAt!; },
      }));
    sectionDriven = triggers.length > 0;
    return () => { gsap.ticker.remove(tick); triggers.forEach((t) => t.kill()); sectionDriven = false; };
  });
}

/** The scroll-driven chapter from sections wins over the computed one on the home page. */
export const sunState = () => map(pinnedState ?? current);

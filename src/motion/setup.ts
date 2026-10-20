// Global motion for this site: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, setLoaderExit, setLoaderFormat, setLoaderProgress, setTransition } from '../engine';
import { startIdle } from './idle';
import { startSun } from './sun';
import { fmtTime, sunTimes, altitude } from './solar';
import { site } from '../data/site';

const { lat, lon, tz } = site.origin;

function loader() {
  // The loader counts the last forty minutes before today's real sunrise in Jodhpur.
  const t = sunTimes(new Date(), lat, lon);
  const rise = t.rise.getTime();
  setLoaderFormat((p) => fmtTime(new Date(rise - (100 - p) * 24000), tz));
  setLoaderProgress((p) => {
    const disc = document.querySelector<HTMLElement>('[data-loader-sun]');
    if (disc) disc.style.translate = `0 ${(1 - p / 100) * 140}%`;
  });
  setLoaderExit((root) => {
    const disc = root.querySelector<HTMLElement>('[data-loader-sun]');
    const frameSun = document.querySelector<HTMLElement>('[data-frame-sun]');
    const tl = gsap.timeline();
    const b = frameSun?.getBoundingClientRect();
    if (disc && frameSun && b && b.width > 0) {
      const a = disc.getBoundingClientRect();
      tl.to(disc, { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width, duration: 0.7, ease: ease.inOut }, 0);
    }
    tl.to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.45, ease: ease.inOut, stagger: 0.04 }, 0);
    tl.to(root, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.75, ease: ease.inOut }, 0.1); // night lifts from the top: dawn
    return tl;
  });
}

function transition() {
  // Dusk: night rises from the ground. Dawn: it lifts from the top on the new page.
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.95, ease: ease.inOut })
      .set(c, { autoAlpha: 0 })
      .set(c.querySelector('.curtain__panel'), { clipPath: 'inset(100% 0% 0% 0%)' }),
  });
}

function frameAway() {
  // Read the native scroll position on the ticker so every kind of scroll counts (wheel, drag, keyboard, script).
  let last = 0;
  gsap.ticker.add(() => {
    const y = scrollY;
    if (Math.abs(y - last) < 4) return;
    const h = document.documentElement.classList;
    h.toggle('scrolled', y > 8);
    h.toggle('frame-away', y > 160 && y > last);
    last = y;
  });
}

function indexPreview() {
  onPage(() => {
    const list = document.querySelector('[data-index]');
    const box = document.querySelector<HTMLElement>('.preview');
    if (!list || !box || isTouch() || prefersReducedMotion()) return;
    const img = box.querySelector('img')!;
    const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3.out' });
    const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
    let lastX = 0, px = 0, py = 0;
    // The card rides the empty track between the kind and year columns; only its height follows the pointer.
    const laneEl = list.querySelector<HTMLElement>('.index__year');
    const lane = () => {
      const kind = list.querySelector<HTMLElement>('.index__kind');
      if (kind && laneEl) { const a = kind.getBoundingClientRect().right; const b = laneEl.getBoundingClientRect().left; return (a + b) / 2; }
      return innerWidth * 0.73;
    };
    let shown = false;
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      x(lane()); y(py); rot(gsap.utils.clamp(-6, 6, (px - lastX) * 0.3)); lastX = px;
      // The card lives only while the pointer is over the list itself.
      if (shown && !list.contains(document.elementFromPoint(px, py))) hide();
    };
    const show = (e: Event) => {
      const src = (e.currentTarget as HTMLElement).dataset.preview;
      if (!src) return hide();
      if (img.getAttribute('src') !== src) img.src = src;
      shown = true;
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
    };
    const hide = () => { shown = false; gsap.to(box, { autoAlpha: 0, scale: 0.9, duration: 0.15, ease: 'expo.out', overwrite: true }); };
    list.querySelectorAll<HTMLAnchorElement>('a[data-preview]').forEach((a) => { a.addEventListener('pointerenter', show); a.addEventListener('focus', show); a.addEventListener('blur', hide); });
    list.addEventListener('pointerleave', hide);
    addEventListener('pointermove', move);
    const off = onScroll(() => { if (!list.contains(document.elementFromPoint(px, py))) hide(); });
    return () => { removeEventListener('pointermove', move); off(); };
  });
}

function realClock() {
  // Footer: the real time in Jodhpur and whether the sun is up, from the visitor's clock.
  onPage(() => {
    const el = document.querySelector<HTMLElement>('[data-now]');
    if (!el) return;
    const home = !document.getElementById('main')?.dataset.state;
    const paint = () => {
      const now = new Date();
      const t = sunTimes(now, lat, lon);
      const alt = altitude(now, lat, lon);
      const up = alt > 0;
      const lead = home ? "That was this page's day, dawn to dusk. " : '';
      el.textContent = `${lead}In the real Jodhpur it is ${fmtTime(now, tz)}, and the sun ${up ? `is up, ${Math.round(alt)} degrees, setting at ${fmtTime(t.set, tz)}` : `set at ${fmtTime(t.set, tz)} and rises at ${fmtTime(t.rise, tz)}`}.`;
    };
    paint();
    const id = setInterval(paint, 30000);
    return () => clearInterval(id);
  });
}

function buttonFill() {
  onPage(() => {
    if (isTouch() || prefersReducedMotion()) return; // CSS covers these
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
      const fill = btn.querySelector<HTMLElement>('.btn__fill');
      if (!fill) return;
      const from = (e: PointerEvent) => { const r = btn.getBoundingClientRect(); return `${e.clientX - r.left}px ${e.clientY - r.top}px`; };
      let closed = true;
      const open = (at: string) => {
        if (closed) gsap.set(fill, { clipPath: `circle(0% at ${at})` });
        closed = false;
        btn.classList.add('is-filled');
        gsap.to(fill, { clipPath: `circle(150% at ${at})`, duration: 0.6, ease: ease.soft, overwrite: true });
      };
      const close = (at: string) => {
        btn.classList.remove('is-filled');
        gsap.to(fill, { clipPath: `circle(0% at ${at})`, duration: 0.5, ease: ease.soft, overwrite: true, onComplete: () => { closed = true; } });
      };
      const enter = (e: PointerEvent) => open(from(e));
      const leave = (e: PointerEvent) => close(from(e));
      const focus = () => btn.matches(':focus-visible') && open('50% 50%');
      const blur = () => close('50% 50%');
      btn.addEventListener('pointerenter', enter); btn.addEventListener('pointerleave', leave);
      btn.addEventListener('focus', focus); btn.addEventListener('blur', blur);
      off.push(() => {
        btn.removeEventListener('pointerenter', enter); btn.removeEventListener('pointerleave', leave);
        btn.removeEventListener('focus', focus); btn.removeEventListener('blur', blur);
      });
    });
    return () => off.forEach((f) => f());
  });
}

export function setupMotion() {
  startIdle();
  loader();
  transition();
  frameAway();
  startSun();
  indexPreview();
  buttonFill();
  realClock();
}

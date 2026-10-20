// Astro adapter (ClientRouter). Call start(setup) once from the layout's <script>.
// The leave animation runs IN PARALLEL with fetching the next page, so transitions add no latency.
// Back/forward (navigationType 'traverse') skips the curtain and lands with the intro finished.
import { boot, cleanup, enter, leave, syncFlags } from './index';

let navigating = false;
let traverse = false;

export function start(setup?: () => void) {
  document.addEventListener('astro:before-preparation', (e) => {
    navigating = true;
    traverse = e.navigationType === 'traverse';
    if (traverse) return;
    const load = e.loader;
    e.loader = async () => { await Promise.all([leave(), load()]); };
  });
  document.addEventListener('astro:before-swap', () => cleanup());
  document.addEventListener('astro:after-swap', () => {
    syncFlags(); // Astro replaces <html> attributes; restore flags before paint
    document.getElementById('loader')?.remove(); // the loader is first-load only
    document.documentElement.classList.remove('frame-away', 'scrolled'); // the frame returns on every new page
  });
  document.addEventListener('astro:page-load', () => {
    if (!navigating) return void boot(setup); // first load (boot is idempotent)
    navigating = false;
    enter({ transition: !traverse, instant: traverse });
  });
  // Module scripts run after parsing: boot now instead of waiting for the first astro:page-load.
  boot(setup);
}

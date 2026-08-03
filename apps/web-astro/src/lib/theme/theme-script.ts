/**
 * Anti-FOUC + theme toggle helpers (vanilla, zero framework).
 * Applied preference lives in localStorage under `fv-theme`.
 * `system` removes `data-theme` so CSS `prefers-color-scheme` governs.
 */
export const THEME_STORAGE_KEY = 'fv-theme';

/** Inline <head> script — must stay tiny and dependency-free. */
export const THEME_ANTI_FOUC_SCRIPT = `(function(){try{var m=localStorage.getItem('${THEME_STORAGE_KEY}');if(m==='dark'||m==='light'){document.documentElement.setAttribute('data-theme',m);}}catch(e){}})();`;

/** Inline module for the theme toggle button (runs after paint, not critical). */
export const THEME_TOGGLE_SCRIPT = `
(function () {
  var KEY = '${THEME_STORAGE_KEY}';
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  function resolved() {
    var m = document.documentElement.getAttribute('data-theme');
    if (m === 'dark' || m === 'light') return m;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(mode) {
    if (mode === 'system') {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem(KEY, 'system'); } catch (e) {}
    } else {
      document.documentElement.setAttribute('data-theme', mode);
      try { localStorage.setItem(KEY, mode); } catch (e) {}
    }
    var color = getComputedStyle(document.documentElement).getPropertyValue('--fv-bg-page').trim();
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta && color) meta.setAttribute('content', color);
    btn.setAttribute('aria-pressed', resolved() === 'dark' ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    apply(resolved() === 'dark' ? 'light' : 'dark');
  });

  btn.setAttribute('aria-pressed', resolved() === 'dark' ? 'true' : 'false');
})();
`;

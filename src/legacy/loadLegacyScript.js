import legacyAppUrl from './app.js?url';

const LEGACY_LOADER_KEY = '__cmrLegacyAppLoadPromise';

export function loadLegacyScript() {
  if (window[LEGACY_LOADER_KEY]) return window[LEGACY_LOADER_KEY];

  window[LEGACY_LOADER_KEY] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${legacyAppUrl}?v=${Date.now()}`;
    script.dataset.cmrLegacyApp = 'true';
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => {
      delete window[LEGACY_LOADER_KEY];
      script.remove();
      reject(new Error('Impossible de charger le moteur legacy'));
    };
    document.body.appendChild(script);
  });

  return window[LEGACY_LOADER_KEY];
}

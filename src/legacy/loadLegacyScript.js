import legacyAppUrl from './app.js?url';

export function loadLegacyScript() {
  return new Promise((resolve, reject) => {
    const previous = document.querySelector('script[data-cmr-legacy-app="true"]');
    if (previous) previous.remove();

    const script = document.createElement('script');
    script.src = `${legacyAppUrl}?v=${Date.now()}`;
    script.dataset.cmrLegacyApp = 'true';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Impossible de charger le moteur legacy'));
    document.body.appendChild(script);
  });
}

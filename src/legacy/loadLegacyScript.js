export function loadLegacyScript() {
  return new Promise((resolve, reject) => {
    const previous = document.querySelector('script[data-cmr-legacy-app="true"]');
    if (previous) previous.remove();

    const script = document.createElement('script');
    script.src = `js/app.js?v=${Date.now()}`;
    script.dataset.cmrLegacyApp = 'true';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Impossible de charger js/app.js'));
    document.body.appendChild(script);
  });
}

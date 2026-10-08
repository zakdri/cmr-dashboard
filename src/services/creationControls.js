const CREATION_LABEL_PATTERN = /^(?:\+\s*)?(?:ajouter|creer|publier|deposer|soumettre|contribuer|proposer|nouveau|nouvelle|envoyer|poster|commenter)\b/i;
const CREATION_HANDLER_PATTERN = /(?:add|create|submit|publish|deposit|contrib|propos|nouveau|new|ajout|creer|publ)/i;
const CONTROL_SELECTOR = 'button, a[role="button"], input[type="button"], input[type="submit"]';

function normalized(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isCreationControl(control) {
  if (control.closest('.login-page, .profile-page')) return false;

  const label = normalized(
    control.value
      || control.getAttribute('aria-label')
      || control.getAttribute('title')
      || control.textContent,
  );
  const handler = normalized(
    control.getAttribute('onclick')
      || control.getAttribute('data-handler')
      || control.getAttribute('data-action'),
  );

  return CREATION_LABEL_PATTERN.test(label) || CREATION_HANDLER_PATTERN.test(handler);
}

function concealCreationControls(root) {
  const controls = root.matches?.(CONTROL_SELECTOR)
    ? [root]
    : root.querySelectorAll?.(CONTROL_SELECTOR) || [];

  controls.forEach((control) => {
    if (!isCreationControl(control)) return;
    control.dataset.cmrCreationControl = 'true';

    const form = control.closest('form');
    if (form && !form.matches('.login-form, .profile-form')) {
      form.dataset.cmrCreationSurface = 'true';
    }

    const publisher = control.closest('.forum-publisher-panel');
    if (publisher) publisher.dataset.cmrCreationSurface = 'true';
  });
}

export function installCreationControlGuard() {
  concealCreationControls(document);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) concealCreationControls(node);
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}

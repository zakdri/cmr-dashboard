import React, { useEffect, useMemo, useRef, useState } from "react";
import { icons } from "lucide";
import { platformBaseUrl } from "../services/moovappsPlatform.js";

const EMBEDDED_STYLE_ID = "cmr-embedded-service-style";
const SHELL_HINT_SELECTOR = [
  "header",
  "aside",
  "nav",
  '[role="banner"]',
  '[role="navigation"]',
  ".app-header",
  ".main-header",
  ".page-header-wrapper",
  ".topbar",
  ".top-bar",
  ".app-sidebar",
  ".main-sidebar",
  ".left-sidebar",
  ".side-bar",
  ".sidebar",
  ".sidenav",
  ".side-nav",
  ".navigation-drawer",
].join(",");

function shallowShellCandidates(body, maxDepth = 5) {
  const candidates = new Set(body.querySelectorAll(SHELL_HINT_SELECTOR));
  let level = Array.from(body.children);
  for (let depth = 0; depth < maxDepth && level.length; depth += 1) {
    level.forEach((element) => candidates.add(element));
    level = level.flatMap((element) => Array.from(element.children));
  }
  return candidates;
}

function FrameIcon({ name }) {
  const iconNode = icons[name];
  if (!iconNode) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconNode.map(([tag, attributes], index) => React.createElement(tag, { ...attributes, key: `${tag}-${index}` }))}
    </svg>
  );
}

function reserveEmbeddedControlIconSpace(frameDocument) {
  const controls = frameDocument.querySelectorAll([
    'input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"])',
    '[role="combobox"]',
    '[contenteditable="true"]',
  ].join(','));

  controls.forEach((control) => {
    const controlRect = control.getBoundingClientRect();
    const scope = control.parentElement;
    if (!scope || controlRect.width < 80 || controlRect.height < 20) return;

    const candidates = scope.querySelectorAll([
      'button',
      'a',
      '[role="button"]',
      '[class*="clear" i]',
      '[class*="remove" i]',
      '[class*="delete" i]',
      '[class*="close" i]',
    ].join(','));

    const icon = Array.from(candidates).find((candidate) => {
      if (candidate === control || candidate.contains(control)) return false;
      const marker = [
        candidate.className,
        candidate.getAttribute('aria-label'),
        candidate.getAttribute('title'),
        candidate.textContent,
      ].map((value) => String(value || '')).join(' ').toLowerCase();
      if (!/(?:clear|remove|delete|close|effacer|supprimer|retirer|annuler|^[\s×✕✖x]+$)/i.test(marker.trim())) return false;

      const iconRect = candidate.getBoundingClientRect();
      const verticallyAligned = iconRect.bottom > controlRect.top && iconRect.top < controlRect.bottom;
      const insideControl = iconRect.right > controlRect.left && iconRect.left < controlRect.right;
      return verticallyAligned && insideControl && iconRect.width <= 42 && iconRect.height <= 42;
    });

    if (!icon) return;
    const iconRect = icon.getBoundingClientRect();
    if (iconRect.left < controlRect.left + controlRect.width / 2) {
      const padding = Math.max(34, Math.ceil(iconRect.right - controlRect.left + 8));
      control.style.setProperty('padding-left', `${padding}px`, 'important');
    } else {
      const padding = Math.max(34, Math.ceil(controlRect.right - iconRect.left + 8));
      control.style.setProperty('padding-right', `${padding}px`, 'important');
    }
  });
}

function findChoiceRows(list) {
  const semanticRows = Array.from(list.querySelectorAll('[role="option"], [role="radio"], [role="checkbox"], li, tr'));
  if (semanticRows.length >= 8) {
    const groups = new Map();
    semanticRows.forEach((row) => {
      const parent = row.parentElement;
      if (!parent) return;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(row);
    });
    const largestGroup = Array.from(groups.entries()).sort((left, right) => right[1].length - left[1].length)[0];
    if (largestGroup?.[1].length >= 8) return { container: largestGroup[0], rows: largestGroup[1] };
  }

  const listRect = list.getBoundingClientRect();
  const rows = Array.from(list.children).filter((child) => {
    if (child.dataset.cmrChoicePagination === 'true') return false;
    const rect = child.getBoundingClientRect();
    return rect.width > listRect.width * 0.45 && rect.height >= 24 && rect.height <= 90;
  });
  return rows.length >= 8 ? { container: list, rows } : null;
}

function paginateEmbeddedChoiceList(frameDocument, list) {
  const existingState = list.__cmrChoicePagination;
  if (existingState) {
    existingState.render();
    return;
  }

  const choiceRows = findChoiceRows(list);
  if (!choiceRows || choiceRows.rows.length <= 10) return;
  const { container, rows } = choiceRows;
  const pageSize = 10;
  const controls = frameDocument.createElement('div');
  controls.dataset.cmrChoicePagination = 'true';
  controls.setAttribute('role', 'navigation');
  controls.setAttribute('aria-label', 'Pagination des utilisateurs');
  controls.innerHTML = `
    <button type="button" data-cmr-page-previous aria-label="Page précédente">‹</button>
    <span data-cmr-page-status></span>
    <span class="cmr-pagination-jump">
      <label>Aller à <input type="number" min="1" data-cmr-page-input aria-label="Numéro de page"></label>
      <button type="button" data-cmr-page-go>Aller</button>
    </span>
    <button type="button" data-cmr-page-next aria-label="Page suivante">›</button>
  `;
  container.insertAdjacentElement('afterend', controls);

  const state = {
    page: 0,
    rows,
    controls,
    render: null,
  };
  state.render = () => {
    const pageCount = Math.max(1, Math.ceil(state.rows.length / pageSize));
    state.page = Math.min(Math.max(state.page, 0), pageCount - 1);
    const start = state.page * pageSize;
    state.rows.forEach((row, index) => {
      row.style.setProperty('display', index >= start && index < start + pageSize ? '' : 'none', 'important');
    });
    const previous = controls.querySelector('[data-cmr-page-previous]');
    const next = controls.querySelector('[data-cmr-page-next]');
    previous.disabled = state.page === 0;
    next.disabled = state.page === pageCount - 1;
    controls.querySelector('[data-cmr-page-status]').textContent = `Page ${state.page + 1} sur ${pageCount}`;
    const pageInput = controls.querySelector('[data-cmr-page-input]');
    pageInput.max = String(pageCount);
    pageInput.value = String(state.page + 1);
  };
  controls.querySelector('[data-cmr-page-previous]').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.page -= 1;
    state.render();
  });
  controls.querySelector('[data-cmr-page-next]').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.page += 1;
    state.render();
  });
  const goToPage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const requestedPage = Math.floor(Number(controls.querySelector('[data-cmr-page-input]').value));
    if (!Number.isFinite(requestedPage)) return;
    state.page = requestedPage - 1;
    state.render();
  };
  controls.querySelector('[data-cmr-page-go]').addEventListener('click', goToPage);
  controls.querySelector('[data-cmr-page-input]').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') goToPage(event);
  });
  list.__cmrChoicePagination = state;
  if (container !== list) container.__cmrChoicePagination = state;
  state.render();
}

function findEmbeddedChoiceOverlay(frameDocument, list) {
  const frameWindow = frameDocument.defaultView;
  let candidate = list;
  const fallback = list.parentElement || list;
  for (let depth = 0; candidate && candidate !== frameDocument.body && depth < 8; depth += 1, candidate = candidate.parentElement) {
    const styles = frameWindow?.getComputedStyle(candidate);
    const zIndex = Number.parseInt(styles?.zIndex || '0', 10);
    const role = candidate.getAttribute('role');
    if (role === 'dialog' || ['absolute', 'fixed'].includes(styles?.position) || zIndex > 1) return candidate;
  }
  return fallback;
}

function installEmbeddedChoiceClose(frameDocument, list) {
  const overlay = findEmbeddedChoiceOverlay(frameDocument, list);
  if (!overlay || overlay.dataset.cmrChoiceClosable === 'true') return;
  overlay.dataset.cmrChoiceClosable = 'true';

  const close = frameDocument.createElement('button');
  close.type = 'button';
  close.dataset.cmrChoiceClose = 'true';
  close.setAttribute('aria-label', 'Fermer la liste des utilisateurs');
  close.setAttribute('title', 'Fermer');
  close.textContent = '×';
  overlay.appendChild(close);

  const closeOverlay = () => {
    if (overlay.__cmrChoiceClosing) return;
    overlay.__cmrChoiceClosing = true;
    const escapeOptions = { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true };
    frameDocument.activeElement?.dispatchEvent(new KeyboardEvent('keydown', escapeOptions));
    frameDocument.dispatchEvent(new KeyboardEvent('keydown', escapeOptions));
    frameDocument.dispatchEvent(new KeyboardEvent('keyup', escapeOptions));
    overlay.dataset.cmrChoiceClosed = 'true';
    overlay.hidden = true;
    frameDocument.documentElement.style.removeProperty('overflow');
    frameDocument.body?.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('overflow');
    document.body.style.removeProperty('overflow');
    overlay.__cmrChoiceClosing = false;
  };
  close.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeOverlay();
  });
  overlay.__cmrCloseChoiceOverlay = closeOverlay;

  if (frameDocument.documentElement.dataset.cmrChoiceCloseListener !== 'true') {
    frameDocument.documentElement.dataset.cmrChoiceCloseListener = 'true';
    frameDocument.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      frameDocument.querySelectorAll('[data-cmr-choice-closable="true"]:not([hidden])')
        .forEach((openOverlay) => openOverlay.__cmrCloseChoiceOverlay?.());
    });
    frameDocument.addEventListener('click', (event) => {
      const trigger = event.target.closest('button, a, [role="button"]');
      if (!trigger || trigger.dataset.cmrChoiceClose === 'true') return;
      const marker = [trigger.className, trigger.title, trigger.getAttribute('aria-label'), trigger.textContent]
        .map((value) => String(value || ''))
        .join(' ')
        .toLowerCase();
      const sitsBesideField = Boolean(trigger.parentElement?.querySelector('input, [role="combobox"], [contenteditable="true"]'));
      if (!sitsBesideField && !/(?:select|lookup|picker|choisir|rechercher|\.\.\.)/.test(marker)) return;
      frameDocument.querySelectorAll('[data-cmr-choice-closed="true"]').forEach((closedOverlay) => {
        closedOverlay.hidden = false;
        delete closedOverlay.dataset.cmrChoiceClosed;
      });
    }, true);
  }
}

function constrainEmbeddedChoiceLists(frameDocument) {
  const frameWindow = frameDocument.defaultView;
  const viewportHeight = frameDocument.documentElement.clientHeight || frameWindow?.innerHeight || window.innerHeight;
  const markChoiceList = (list) => {
    const rect = list.getBoundingClientRect();
    const availableHeight = viewportHeight - Math.max(120, rect.top + 24);
    const maxHeight = Math.max(220, Math.min(520, availableHeight));
    if (list.dataset.cmrEmbeddedChoiceListMaxHeight === String(maxHeight)) return;
    list.dataset.cmrEmbeddedChoiceList = 'true';
    list.dataset.cmrEmbeddedChoiceListMaxHeight = String(maxHeight);
    list.style.setProperty('height', 'auto', 'important');
    list.style.setProperty('max-height', `${maxHeight}px`, 'important');
    list.style.setProperty('overflow-y', 'auto', 'important');
    list.style.setProperty('overflow-x', 'hidden', 'important');
    list.style.setProperty('overscroll-behavior', 'contain', 'important');
    list.style.setProperty('scrollbar-gutter', 'stable', 'important');
    list.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
    paginateEmbeddedChoiceList(frameDocument, list);
    installEmbeddedChoiceClose(frameDocument, list);
  };
  const controls = Array.from(frameDocument.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
    .filter((control) => {
      const rect = control.getBoundingClientRect();
      const styles = frameWindow?.getComputedStyle(control);
      return rect.width > 0 && rect.height > 0 && styles?.display !== 'none' && styles?.visibility !== 'hidden';
    });
  const choiceLists = new Set();

  controls.forEach((control) => {
    let candidate = control.parentElement;
    for (let depth = 0; candidate && depth < 7; depth += 1, candidate = candidate.parentElement) {
      const optionCount = candidate.querySelectorAll('input[type="radio"], input[type="checkbox"]').length;
      if (optionCount < 8) continue;
      const rect = candidate.getBoundingClientRect();
      if (rect.width < 260 || Math.max(rect.height, candidate.scrollHeight) < 300) continue;
      choiceLists.add(candidate);
      break;
    }
  });

  frameDocument.querySelectorAll([
    '[role="listbox"]',
    '[role="dialog"] [role="list"]',
    '[class*="listbox" i]',
    '[class*="user" i][class*="list" i]',
    '[class*="people" i][class*="list" i]',
    '[class*="picker" i] [class*="list" i]',
    '[class*="selector" i] [class*="list" i]',
  ].join(',')).forEach((list) => {
    const optionCount = list.querySelectorAll('li, tr, [role="option"], [role="radio"], [role="checkbox"]').length;
    if (optionCount >= 8) choiceLists.add(list);
  });

  frameDocument.querySelectorAll('div, ul, section, tbody').forEach((candidate) => {
    const rect = candidate.getBoundingClientRect();
    if (rect.width < 280 || Math.max(rect.height, candidate.scrollHeight) < viewportHeight * 0.55) return;
    const rows = Array.from(candidate.children).filter((child) => {
      const childRect = child.getBoundingClientRect();
      return childRect.width > rect.width * 0.45 && childRect.height >= 24 && childRect.height <= 90;
    });
    if (rows.length < 8) return;

    let overlay = candidate;
    let hasOverlayAncestor = false;
    for (let depth = 0; overlay && depth < 6; depth += 1, overlay = overlay.parentElement) {
      const styles = frameWindow?.getComputedStyle(overlay);
      const zIndex = Number.parseInt(styles?.zIndex || '0', 10);
      if (['absolute', 'fixed', 'sticky'].includes(styles?.position) || zIndex > 0 || overlay.getAttribute('role') === 'dialog') {
        hasOverlayAncestor = true;
        break;
      }
    }
    if (hasOverlayAncestor) choiceLists.add(candidate);
  });

  choiceLists.forEach(markChoiceList);
}

function applyEmbeddedLayout(frameDocument) {
  const body = frameDocument?.body;
  if (!body) return;
  const viewportWidth = frameDocument.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = frameDocument.documentElement.clientHeight || window.innerHeight;

  if (!frameDocument.getElementById(EMBEDDED_STYLE_ID)) {
    const style = frameDocument.createElement("style");
    style.id = EMBEDDED_STYLE_ID;
    style.textContent = `
      [data-cmr-embedded-hidden="true"] { display: none !important; }
      [data-cmr-embedded-shell-layout="true"] { grid-template-columns: minmax(0, 1fr) !important; }
      html, body { margin: 0 !important; padding-top: 0 !important; min-height: 0 !important; }
      body {
        color: #1e293b !important;
        font-family: "Segoe UI", Inter, Arial, sans-serif !important;
      }
      body > main, #app > main, [role="main"], .main-content, .page-content, .content-wrapper, .app-content {
        margin-left: 0 !important;
        margin-top: 0 !important;
        width: 100% !important;
        max-width: none !important;
      }
      input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]), select, textarea {
        box-sizing: border-box !important;
        max-width: 100% !important;
        min-height: 40px !important;
        padding: 8px 11px !important;
        border: 1px solid #cbd5e1 !important;
        border-radius: 6px !important;
        background: #fff !important;
        color: #1e293b !important;
        font-family: inherit !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
      }
      textarea {
        min-height: 110px !important;
        resize: vertical !important;
      }
      input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):focus,
      select:focus,
      textarea:focus {
        outline: none !important;
        border-color: #256cb5 !important;
        box-shadow: 0 0 0 3px rgba(37, 108, 181, 0.16) !important;
      }
      label { color: #334155 !important; line-height: 1.4 !important; }
      button { font-family: inherit !important; }
      [data-cmr-embedded-choice-list="true"] {
        scrollbar-width: thin !important;
        scrollbar-color: #94a3b8 #f8fafc !important;
      }
      [data-cmr-embedded-choice-list="true"]::-webkit-scrollbar { width: 10px !important; }
      [data-cmr-embedded-choice-list="true"]::-webkit-scrollbar-track { background: #f8fafc !important; }
      [data-cmr-embedded-choice-list="true"]::-webkit-scrollbar-thumb {
        border: 2px solid #f8fafc !important;
        border-radius: 6px !important;
        background: #94a3b8 !important;
      }
      [data-cmr-choice-pagination="true"] {
        position: sticky !important;
        bottom: 0 !important;
        z-index: 3 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 12px !important;
        min-height: 44px !important;
        padding: 6px 10px !important;
        border-top: 1px solid #e2e8f0 !important;
        background: #fff !important;
        color: #334155 !important;
        font-size: 12px !important;
        font-weight: 700 !important;
      }
      [data-cmr-choice-pagination="true"] button {
        display: inline-grid !important;
        place-items: center !important;
        width: 32px !important;
        height: 32px !important;
        padding: 0 !important;
        border: 1px solid #cbd5e1 !important;
        border-radius: 6px !important;
        background: #fff !important;
        color: #256cb5 !important;
        font-size: 20px !important;
        line-height: 1 !important;
        cursor: pointer !important;
      }
      [data-cmr-choice-pagination="true"] button:disabled {
        color: #cbd5e1 !important;
        cursor: default !important;
      }
      [data-cmr-choice-pagination="true"] .cmr-pagination-jump {
        display: inline-flex !important;
        align-items: center !important;
        gap: 5px !important;
      }
      [data-cmr-choice-pagination="true"] .cmr-pagination-jump label {
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        font-size: 11px !important;
      }
      [data-cmr-choice-pagination="true"] .cmr-pagination-jump input {
        width: 54px !important;
        height: 32px !important;
        padding: 4px 6px !important;
        border: 1px solid #cbd5e1 !important;
        border-radius: 6px !important;
        text-align: center !important;
      }
      [data-cmr-choice-pagination="true"] [data-cmr-page-go] {
        width: auto !important;
        min-width: 48px !important;
        padding: 0 8px !important;
        font-size: 11px !important;
      }
      [data-cmr-choice-closable="true"] { position: relative !important; }
      [data-cmr-choice-close="true"] {
        position: sticky !important;
        top: 8px !important;
        right: 8px !important;
        z-index: 20 !important;
        float: right !important;
        display: grid !important;
        place-items: center !important;
        width: 34px !important;
        height: 34px !important;
        margin: 8px !important;
        padding: 0 !important;
        border: 1px solid #cbd5e1 !important;
        border-radius: 50% !important;
        background: #fff !important;
        color: #334155 !important;
        box-shadow: 0 4px 12px rgba(15, 23, 42, .12) !important;
        font-size: 22px !important;
        line-height: 1 !important;
        cursor: pointer !important;
      }
      [data-cmr-choice-close="true"]:hover {
        border-color: #256cb5 !important;
        color: #256cb5 !important;
      }
    `;
    frameDocument.head?.appendChild(style);
  }

  reserveEmbeddedControlIconSpace(frameDocument);
  constrainEmbeddedChoiceLists(frameDocument);

  shallowShellCandidates(body).forEach((element) => {
    if (element.dataset.cmrEmbeddedHidden === "true") return;
    const rect = element.getBoundingClientRect();
    const styles = frameDocument.defaultView?.getComputedStyle(element);
    if (!styles || styles.display === "none" || styles.visibility === "hidden") return;
    const matchesShellHint = element.matches(SHELL_HINT_SELECTOR);
    const containsHeaderControls = Boolean(
      element.querySelector('input[type="search"], input[placeholder*="recher" i], [class*="search" i]')
      && element.querySelector('img, svg, [class*="avatar" i], [class*="logo" i]'),
    );
    const containsNavigationControls = element.querySelectorAll("a, button").length >= 3;

    const isTopShell = rect.top <= 24
      && rect.height >= 36
      && rect.height <= 190
      && rect.width >= viewportWidth * 0.55
      && (matchesShellHint || ["fixed", "sticky"].includes(styles.position) || containsHeaderControls);
    const isSideShell = rect.left <= 12
      && rect.width >= 36
      && rect.width <= 320
      && rect.height >= Math.max(280, viewportHeight * 0.45)
      && (matchesShellHint || containsNavigationControls);

    if (!isTopShell && !isSideShell) return;
    element.dataset.cmrEmbeddedHidden = "true";
    if (isSideShell && element.parentElement && element.parentElement !== body) {
      element.parentElement.dataset.cmrEmbeddedShellLayout = "true";
    }
  });
}

function resolveServiceUrl(path, language) {
  if (!path) return "";
  try {
    const source = /^https?:\/\//i.test(path)
      ? path
      : `${platformBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
    const url = new URL(source);
    if (url.origin !== window.location.origin || url.pathname.includes("/cmr-dashboard/")) return "";
    if (!url.searchParams.has("origin")) url.searchParams.set("origin", "cmr");
    if (!url.searchParams.has("lang")) url.searchParams.set("lang", language);
    return url.toString();
  } catch {
    return "";
  }
}

export default function PlatformServiceFrame({ path, title = "Service", active = true, language = "fr" }) {
  const iframeRef = useRef(null);
  const observersRef = useRef([]);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("loading");
  const [height, setHeight] = useState("70vh");
  const [attempt, setAttempt] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const serviceUrl = useMemo(() => resolveServiceUrl(path, language), [path, language]);

  useEffect(() => {
    if (active && !started) setStarted(true);
  }, [active, started]);

  useEffect(() => {
    if (!active) setExpanded(false);
  }, [active]);

  useEffect(() => {
    if (!expanded) return undefined;
    document.body.classList.add("service-frame-expanded");
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("service-frame-expanded");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  useEffect(() => () => document.body.classList.remove("service-frame-expanded"), []);

  useEffect(() => {
    if (!started || !serviceUrl) return undefined;
    const iframe = iframeRef.current;
    if (!iframe) return undefined;
    let observedFrameWindow = null;
    setStatus("loading");
    setHeight("70vh");
    const clearObservers = () => {
      observersRef.current.forEach((observer) => observer.disconnect());
      observersRef.current = [];
    };
    const timeout = window.setTimeout(() => setStatus((current) => current === "loading" ? "timeout" : current), 20000);
    const resize = () => {
      try {
        const frameDocument = iframe.contentDocument;
        if (!frameDocument?.body) return;
        frameDocument.documentElement.setAttribute("lang", language);
        frameDocument.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
        applyEmbeddedLayout(frameDocument);
        const nextHeight = Math.max(frameDocument.body.scrollHeight, frameDocument.body.offsetHeight);
        if (nextHeight > 0) setHeight(`${nextHeight}px`);
      } catch {
        // Same-origin access can be unavailable while Moovapps redirects.
      }
    };
    const handleLoad = () => {
      window.clearTimeout(timeout);
      iframe.style.visibility = "hidden";
      clearObservers();
      resize();
      try {
        const body = iframe.contentDocument?.body;
        if (body) {
          const mutationObserver = new MutationObserver(() => {
            applyEmbeddedLayout(iframe.contentDocument);
            window.requestAnimationFrame(resize);
          });
          mutationObserver.observe(body, { childList: true, subtree: true, attributes: true });
          const resizeObserver = new ResizeObserver(() => window.requestAnimationFrame(resize));
          resizeObserver.observe(body);
          observersRef.current = [mutationObserver, resizeObserver];
          observedFrameWindow = iframe.contentWindow;
          observedFrameWindow?.addEventListener("beforeunload", concealFrame);
        }
      } catch {
        // The iframe remains usable even if its height cannot be observed.
      }
      iframe.style.visibility = "visible";
      setStatus("ready");
    };
    const concealFrame = () => {
      iframe.style.visibility = "hidden";
    };
    const handleError = () => {
      window.clearTimeout(timeout);
      setStatus("error");
    };
    iframe.addEventListener("load", handleLoad);
    iframe.addEventListener("error", handleError);
    return () => {
      window.clearTimeout(timeout);
      iframe.removeEventListener("load", handleLoad);
      iframe.removeEventListener("error", handleError);
      observedFrameWindow?.removeEventListener("beforeunload", concealFrame);
      clearObservers();
    };
  }, [started, serviceUrl, attempt, language]);

  if (!serviceUrl) return <p className="section-intro">Lien de service invalide.</p>;
  if (!started) return null;

  return (
    <div className={`platform-service-frame${expanded ? " is-expanded" : ""}`}>
      <div className="platform-service-frame-toolbar">
        <button
          type="button"
          className="cmr-org-fullscreen-button"
          onClick={() => setExpanded((current) => !current)}
          aria-pressed={expanded}
          title={expanded ? "Réduire le service" : "Masquer l’en-tête et agrandir le service"}
        >
          <FrameIcon name={expanded ? "Minimize2" : "Maximize2"} />
          <span>{expanded ? "Réduire" : "Agrandir"}</span>
        </button>
      </div>
      {status !== "ready" ? (
        <div className="platform-service-frame-status">
          {status === "loading" ? <span>Chargement du service...</span> : (
            <div>
              <p>{status === "timeout" ? "Le chargement a expiré." : "Échec du chargement du service."}</p>
              <button type="button" className="primary-btn" onClick={() => setAttempt((value) => value + 1)}>Réessayer</button>
              <a href={serviceUrl} target="_blank" rel="noopener noreferrer">Ouvrir dans un nouvel onglet</a>
            </div>
          )}
        </div>
      ) : null}
      <iframe
        key={attempt}
        ref={iframeRef}
        src={serviceUrl}
        title={title}
        scrolling={expanded ? "auto" : "no"}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-top-navigation-by-user-activation"
        style={{ height }}
      />
    </div>
  );
}

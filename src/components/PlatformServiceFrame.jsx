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
    `;
    frameDocument.head?.appendChild(style);
  }

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
          title={expanded ? "Réafficher le panneau droit" : "Masquer le panneau droit et agrandir le service"}
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
        scrolling="no"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-top-navigation-by-user-activation"
        style={{ height }}
      />
    </div>
  );
}

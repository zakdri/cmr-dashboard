import { useEffect, useState } from "react";
import { documentsApiUrl, normalizeGedDocument, shouldUseDocumentsApi } from "./gedDocuments.js";

export function useViewActive(viewId) {
  const [active, setActive] = useState(() => {
    const element = document.getElementById(`view-${viewId}`);
    return Boolean(element?.classList.contains("active"));
  });

  useEffect(() => {
    const element = document.getElementById(`view-${viewId}`);
    if (!element) return undefined;

    const update = () => setActive(element.classList.contains("active"));
    update();

    const observer = new MutationObserver(update);
    observer.observe(element, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [viewId]);

  return active;
}

export function useGedDocuments(path, options = {}) {
  const enabled = options.enabled ?? true;
  const [state, setState] = useState({
    loading: shouldUseDocumentsApi() && enabled,
    error: null,
    documents: [],
  });

  useEffect(() => {
    let cancelled = false;
    if (!shouldUseDocumentsApi() || !enabled || !path) {
      setState({ loading: false, error: null, documents: [] });
      return () => {
        cancelled = true;
      };
    }

    setState({ loading: true, error: null, documents: [] });
    fetch(documentsApiUrl(path), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        if (!cancelled) {
          const documents = (Array.isArray(payload.data) ? payload.data : []).map(normalizeGedDocument);
          setState({ loading: false, error: null, documents });
        }
      })
      .catch((error) => {
        if (!cancelled) setState({ loading: false, error, documents: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [path, enabled]);

  return state;
}

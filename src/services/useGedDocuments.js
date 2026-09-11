import { useEffect, useState } from "react";
import {
  GED_DOCUMENTS_CHANGED_EVENT,
  fetchGedDocuments,
  gedPathsOverlap,
  readCachedGedDocuments,
  shouldUseDocumentsApi,
} from "./gedDocuments.js";

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
  const initialDocuments = shouldUseDocumentsApi() && enabled ? readCachedGedDocuments(path) : null;
  const [state, setState] = useState({
    loading: shouldUseDocumentsApi() && enabled && initialDocuments === null,
    error: null,
    documents: initialDocuments || [],
  });

  useEffect(() => {
    let cancelled = false;
    let requestNumber = 0;
    let loadingPromise = null;
    let lastRevalidation = 0;
    if (!shouldUseDocumentsApi() || !enabled || !path) {
      setState({ loading: false, error: null, documents: [] });
      return () => {
        cancelled = true;
      };
    }

    const cachedDocuments = readCachedGedDocuments(path);
    setState({
      loading: cachedDocuments === null,
      error: null,
      documents: cachedDocuments || [],
    });

    async function load({ refresh = false, preserveDocuments = false } = {}) {
      if (loadingPromise) return loadingPromise;

      const currentRequest = ++requestNumber;
      setState((current) => ({
        loading: !preserveDocuments,
        error: null,
        documents: preserveDocuments ? current.documents : [],
      }));

      loadingPromise = (async () => {
        try {
          const result = await fetchGedDocuments(path, { refresh });
          if (!cancelled && currentRequest === requestNumber) {
            setState({ loading: false, error: null, documents: result.documents });
          }
          return result;
        } catch (error) {
          if (!cancelled && currentRequest === requestNumber) {
            setState((current) => ({ loading: false, error, documents: current.documents }));
          }
          return null;
        } finally {
          loadingPromise = null;
        }
      })();

      return loadingPromise;
    }

    const revalidate = () => {
      const now = Date.now();
      if (loadingPromise || now - lastRevalidation < 1000) return loadingPromise;
      lastRevalidation = now;
      return load({ refresh: true, preserveDocuments: true });
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") revalidate();
    };
    const handleDocumentsChanged = (event) => {
      if (!event.detail?.path || gedPathsOverlap(path, event.detail.path)) revalidate();
    };

    async function loadInitialDocuments() {
      const result = await load({
        refresh: cachedDocuments !== null,
        preserveDocuments: cachedDocuments !== null,
      });
      if (cachedDocuments === null && result?.meta?.cache === "hit") revalidate();
    }

    loadInitialDocuments();
    window.addEventListener("focus", revalidate);
    window.addEventListener(GED_DOCUMENTS_CHANGED_EVENT, handleDocumentsChanged);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", revalidate);
      window.removeEventListener(GED_DOCUMENTS_CHANGED_EVENT, handleDocumentsChanged);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [path, enabled]);

  return state;
}

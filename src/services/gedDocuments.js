export const GED_ROOT_PATH = "Intranet CMR";
export const GED_DOCUMENTS_CHANGED_EVENT = "cmr:ged-documents-changed";
const GED_SESSION_CACHE_PREFIX = "cmr-ged-documents:";
const gedDocumentsMemoryCache = new Map();
const gedDocumentsRequests = new Map();

export function shouldUseDocumentsApi() {
  return !window.location.hostname.toLowerCase().endsWith("github.io");
}

export function joinGedPath(...parts) {
  return parts
    .flatMap((part) => String(part || "").split("/"))
    .map((part) => part.trim())
    .filter(Boolean)
    .join("/");
}

export function normalizeGedKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function gedPathsOverlap(left, right) {
  const leftPath = joinGedPath(left);
  const rightPath = joinGedPath(right);
  return leftPath === rightPath
    || leftPath.startsWith(`${rightPath}/`)
    || rightPath.startsWith(`${leftPath}/`);
}

export function notifyGedDocumentsChanged(path = GED_ROOT_PATH, detail = {}) {
  window.dispatchEvent(new CustomEvent(GED_DOCUMENTS_CHANGED_EVENT, {
    detail: { ...detail, path: joinGedPath(path) },
  }));
}

export function readCachedGedDocuments(path) {
  const normalizedPath = joinGedPath(path);
  if (gedDocumentsMemoryCache.has(normalizedPath)) return gedDocumentsMemoryCache.get(normalizedPath);

  const cacheKey = `${GED_SESSION_CACHE_PREFIX}${encodeURIComponent(normalizedPath)}`;
  for (const storage of [sessionStorage, localStorage]) {
    try {
      const stored = storage.getItem(cacheKey);
      if (stored === null) continue;
      const documents = JSON.parse(stored);
      if (!Array.isArray(documents)) continue;
      gedDocumentsMemoryCache.set(normalizedPath, documents);
      return documents;
    } catch {
      // Continue with the next cache layer.
    }
  }

  return null;
}

export function writeCachedGedDocuments(path, documents) {
  const normalizedPath = joinGedPath(path);
  gedDocumentsMemoryCache.set(normalizedPath, documents);

  const cacheKey = `${GED_SESSION_CACHE_PREFIX}${encodeURIComponent(normalizedPath)}`;
  const value = JSON.stringify(documents);
  for (const storage of [sessionStorage, localStorage]) {
    try {
      storage.setItem(cacheKey, value);
    } catch {
      // The in-memory cache remains available when browser storage is unavailable.
    }
  }
}

export function documentsApiUrl(path, params = {}) {
  const url = new URL("api/documents.php", document.baseURI);
  url.searchParams.set("path", path);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  return url.toString();
}

export function normalizeGedDocument(item) {
  const protocolUri = item.protocolUri || "";
  const fileName = item.fileName || item.title || "document.pdf";
  return {
    ...item,
    title: item.title || fileName,
    label: item.label || item.title || fileName,
    fileName,
    file: protocolUri
      ? documentsApiUrl(GED_ROOT_PATH, { action: "download", protocolUri, fileName })
      : item.file || fileName,
  };
}

export async function fetchGedDocuments(path, options = {}) {
  const normalizedPath = joinGedPath(path);
  const refresh = options.refresh === true;
  if (!shouldUseDocumentsApi()) return { documents: [], meta: { cache: "disabled" } };

  if (!refresh) {
    const cachedDocuments = readCachedGedDocuments(normalizedPath);
    if (cachedDocuments !== null) {
      return { documents: cachedDocuments, meta: { cache: "browser" } };
    }
  }

  const requestKey = `${normalizedPath}|${refresh ? "refresh" : "cached"}`;
  if (gedDocumentsRequests.has(requestKey)) return gedDocumentsRequests.get(requestKey);

  const request = fetch(documentsApiUrl(normalizedPath, refresh ? { refresh: "1" } : {}), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const documents = (Array.isArray(payload.data) ? payload.data : []).map(normalizeGedDocument);
      writeCachedGedDocuments(normalizedPath, documents);
      return { documents, meta: payload.meta || {} };
    })
    .finally(() => {
      gedDocumentsRequests.delete(requestKey);
    });

  gedDocumentsRequests.set(requestKey, request);
  return request;
}

if (typeof window !== "undefined") {
  window.CMR_GED_DOCUMENTS = {
    fetchDocuments: fetchGedDocuments,
    readCache: readCachedGedDocuments,
    writeCache: writeCachedGedDocuments,
  };
}

export function groupDocumentsByFirstSegment(documents, fallbackLabel) {
  const groups = new Map();
  documents.forEach((doc) => {
    const label = doc.segments?.[0] || doc.folderLabel || fallbackLabel;
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(doc);
  });
  return Array.from(groups.entries()).map(([title, items]) => ({ title, items }));
}

export function mergeDocumentsIntoGroups(groups, documents, options = {}) {
  const itemsKey = options.itemsKey || "items";
  const getGroupLabel = options.getGroupLabel || ((group) => group.title || group.label || group.year);
  const createGroup = options.createGroup || ((title, items) => ({ title, [itemsKey]: items }));
  const documentGroups = groupDocumentsByFirstSegment(documents, options.fallbackLabel || "Documents");
  const documentsByGroup = new Map(documentGroups.map((group) => [normalizeGedKey(group.title), group]));
  const usedGroups = new Set();

  const merged = (groups || []).map((group) => {
    const key = normalizeGedKey(getGroupLabel(group));
    const documentGroup = documentsByGroup.get(key);
    if (documentGroup) usedGroups.add(key);
    return { ...group, [itemsKey]: documentGroup?.items || [] };
  });

  documentGroups.forEach((group) => {
    const key = normalizeGedKey(group.title);
    if (!usedGroups.has(key)) merged.push(createGroup(group.title, group.items));
  });

  return merged;
}

export function filterDocuments(documents, query, fields = ["title", "fileName", "folderLabel"]) {
  const term = query.trim().toLowerCase();
  if (!term) return documents;
  return documents.filter((doc) => fields.map((field) => doc[field] || "").join(" ").toLowerCase().includes(term));
}

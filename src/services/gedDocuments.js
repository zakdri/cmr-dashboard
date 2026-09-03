export const GED_ROOT_PATH = "Intranet CMR";

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

export function groupDocumentsByFirstSegment(documents, fallbackLabel) {
  const groups = new Map();
  documents.forEach((doc) => {
    const label = doc.segments?.[0] || doc.folderLabel || fallbackLabel;
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(doc);
  });
  return Array.from(groups.entries()).map(([title, items]) => ({ title, items }));
}

export function filterDocuments(documents, query, fields = ["title", "fileName", "folderLabel"]) {
  const term = query.trim().toLowerCase();
  if (!term) return documents;
  return documents.filter((doc) => fields.map((field) => doc[field] || "").join(" ").toLowerCase().includes(term));
}

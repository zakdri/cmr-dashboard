export function readableContentValue(value, separator = "\n") {
  if (Array.isArray(value)) return value.map((item) => readableContentValue(item, separator)).filter(Boolean).join(separator);
  if (value === null || value === undefined) return "";
  if (typeof value !== "object") return String(value).trim();
  return readableContentValue(
    value.label
    ?? value.name
    ?? value.title
    ?? value.value
    ?? value.displayName
    ?? value.sys_Title
    ?? "",
    separator,
  );
}

function referenceFromUrl(value) {
  const text = String(value || "").trim();
  if (!text.includes("downloadReference=")) return "";
  try {
    return new URL(text, document.baseURI).searchParams.get("downloadReference") || "";
  } catch {
    return "";
  }
}

export function extractDownloadReference(value, visited = new Set(), allowPlainString = true) {
  if (!value) return "";
  if (typeof value === "string") return referenceFromUrl(value) || (allowPlainString ? value.trim() : "");
  if (typeof value !== "object" || visited.has(value)) return "";
  visited.add(value);

  if (Array.isArray(value)) {
    for (const entry of value) {
      const reference = extractDownloadReference(entry, visited, true);
      if (reference) return reference;
    }
    return "";
  }

  const directReference = value.downloadReference
    || value.downloadreference
    || value.downloadRef
    || value.reference
    || value["@downloadReference"];
  if (typeof directReference === "string" && directReference.trim()) return directReference.trim();

  for (const nested of Object.values(value)) {
    const reference = typeof nested === "string"
      ? referenceFromUrl(nested)
      : extractDownloadReference(nested, visited, false);
    if (reference) return reference;
  }
  return "";
}

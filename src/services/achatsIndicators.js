import { listTextContent } from "./moovappsPlatform.js";

let achatsIndicatorsRequest = null;

function readableValue(value) {
  if (Array.isArray(value)) return value.map(readableValue).filter(Boolean).join(", ");
  if (value === null || value === undefined) return "";
  if (typeof value !== "object") return String(value).trim();
  return readableValue(
    value.label
    ?? value.name
    ?? value.title
    ?? value.value
    ?? value.displayName
    ?? ""
  );
}

export function normalizeAchatsIndicators(records = []) {
  return records
    .map((record, index) => ({
      id: String(record?.sys_CurrentResourceId || record?.sys_Reference || record?.id || `achats-indicator-${index}`),
      label: readableValue(record?.sys_Title),
      value: readableValue(record?.Valeur),
    }))
    .filter((indicator) => indicator.label && indicator.value);
}

export function applyAchatsIndicators(indicators = []) {
  const sections = window.CMR_DATA?.data?.achatsSections;
  if (!Array.isArray(sections)) return;

  const indicatorsSection = sections.find((section) => section.title === "Indicateurs");
  if (!indicatorsSection) return;
  indicatorsSection.metrics = indicators;
}

export function loadAchatsIndicators() {
  if (!achatsIndicatorsRequest) {
    achatsIndicatorsRequest = listTextContent("achatsindicators")
      .then(({ data }) => normalizeAchatsIndicators(data))
      .catch((error) => {
        achatsIndicatorsRequest = null;
        throw error;
      });
  }
  return achatsIndicatorsRequest;
}

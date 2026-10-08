import { fetchWorkflowNotificationsPayload, isDemoMode } from "./moovappsPlatform.js";

const INTERNAL_WORKFLOW_TARGETS = [
  { group: "rh", key: "offresFormation", aliases: ["offres de formation", "offre de formation"] },
  { group: "rh", key: "offres", aliases: ["postes vacants", "poste vacant", "appel a candidature interne", "appel candidature"] },
  { group: "rh", key: "mobilite", aliases: ["gestion de mobilite", "demande de mobilite", "mobilite spontanee", "mobilite"] },
  { group: "rh", key: "formation", aliases: ["gestion de formation", "demande de formation", "formation spontanee"] },
  { group: "achats", key: "preparation-ppa", aliases: ["preparation du plan previsionnel des achats", "preparation ppa"] },
  { group: "achats", key: "actualisation-ppa", aliases: ["actualisation du plan previsionnel des achats", "actualisation ppa"] },
  { group: "achats", key: "fiches-projets", aliases: ["fiches projets", "fiche projet"] },
  { group: "achats", key: "preparation-dce", aliases: ["preparation et validation du dossier de consultation", "preparation dce"] },
  { group: "achats", key: "publication-attribution", aliases: ["lancement et suivi des achats", "publication attribution", "gestion des achats"] },
];

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function textValue(value) {
  if (value == null) return "";
  if (["string", "number", "boolean"].includes(typeof value)) return String(value).trim();
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = textValue(item);
      if (result) return result;
    }
    return "";
  }
  if (typeof value === "object") {
    for (const key of ["value", "string", "url", "path", "href", "label"]) {
      const result = textValue(value[key]);
      if (result) return result;
    }
  }
  return "";
}

function findNamedValue(value, expectedName) {
  if (!value || typeof value !== "object") return "";
  if (String(value.name || "").toLowerCase() === expectedName.toLowerCase()) {
    return textValue(value.value ?? value.label);
  }
  for (const [key, nested] of Object.entries(value)) {
    if (key.toLowerCase() === expectedName.toLowerCase()) {
      const result = textValue(nested);
      if (result) return result;
    }
  }
  for (const nested of Object.values(value)) {
    if (!nested || typeof nested !== "object") continue;
    const result = findNamedValue(nested, expectedName);
    if (result) return result;
  }
  return "";
}

export function normalizeWorkflowPath(value) {
  return String(value || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/([^:])\/{2,}/g, "$1/");
}

function cleanWorkflowLabel(value) {
  return String(value || "Tâche workflow").replace(/\s*\(\d+(?:\.\d+)*\)\s*$/, "").trim();
}

function formatNotificationDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { date: "Tâches", time: "" };
  return {
    date: new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date),
    time: new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(date),
  };
}

function normalizeWorkflowNotification(element, index) {
  const header = element?.header || {};
  const reference = findNamedValue(element?.body, "sys_Reference") || String(header.reference || "").trim();
  const currentStep = findNamedValue(element?.body, "sys_CurrentSteps");
  const serviceFront = normalizeWorkflowPath(
    findNamedValue(element, "Service_Front")
      || header.Service_Front
      || header.serviceFront,
  );
  const workflowLabel = cleanWorkflowLabel(
    header["resource-definition"]?.label || header.catalog?.label || "Tâche workflow",
  );
  const date = formatNotificationDate(header["modified-date"] || header["created-date"]);

  return {
    id: String(header.id || header["protocol-uri"] || `${reference}-${index}`),
    type: "workflow",
    title: [workflowLabel, reference].filter(Boolean).join(" · "),
    desc: currentStep || "Tâche à traiter",
    description: currentStep || "Tâche à traiter",
    date: date.date,
    time: date.time,
    unread: false,
    workflowTask: true,
    serviceFront,
    taskUri: normalizeWorkflowPath(header.uri),
    modifiedAt: header["modified-date"] || header["created-date"] || "",
  };
}

export async function loadWorkflowNotifications() {
  if (isDemoMode()) return [];
  const data = await fetchWorkflowNotificationsPayload();
  return asArray(data?.view?.body?.element)
    .map(normalizeWorkflowNotification)
    .sort((left, right) => String(right.modifiedAt).localeCompare(String(left.modifiedAt)));
}

export function applyWorkflowNotifications(items) {
  const data = window.CMR_DATA?.data;
  if (!data) return;
  const notifications = Array.isArray(items) ? items : [];
  data.workflowNotificationsActive = true;
  data.notifData = notifications;
  data.notificationsHeader = {
    ...(data.notificationsHeader || {}),
    description: "Vos tâches workflow en attente",
  };
  data.header = data.header || {};
  data.header.notifications = {
    ...(data.header.notifications || {}),
    badge: String(notifications.length),
    items: notifications.slice(0, 2),
  };
  window.CMR_WORKFLOW_NOTIFICATIONS = notifications;
}

function comparablePath(value) {
  const normalized = normalizeWorkflowPath(value).replace(/[?#].*$/, "").replace(/\/$/, "").toLowerCase();
  try {
    return new URL(normalized, window.location.origin).pathname.replace(/\/$/, "").toLowerCase();
  } catch {
    return normalized;
  }
}

function pathsMatch(left, right) {
  const leftPath = comparablePath(left);
  const rightPath = comparablePath(right);
  return Boolean(leftPath && rightPath && (leftPath === rightPath || leftPath.endsWith(rightPath) || rightPath.endsWith(leftPath)));
}

function comparableLabel(value) {
  return normalizeWorkflowPath(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function configuredWorkflowTarget(serviceFront, notificationText = "") {
  const services = window.CMR_PLATFORM_CONFIG?.services || {};
  for (const target of INTERNAL_WORKFLOW_TARGETS) {
    const configuredPath = services[target.group]?.[target.key]?.path;
    if (pathsMatch(serviceFront, configuredPath)) return target;
  }

  const serviceLabel = comparableLabel([serviceFront, notificationText].filter(Boolean).join(" "));
  return INTERNAL_WORKFLOW_TARGETS.find((target) =>
    target.aliases.some((alias) => serviceLabel.includes(comparableLabel(alias))),
  ) || null;
}

export function openWorkflowNotification(notification) {
  if (!notification) return;
  document.getElementById("notifDropdown")?.classList.remove("active");
  const target = configuredWorkflowTarget(
    notification.serviceFront,
    [notification.title, notification.desc, notification.description].filter(Boolean).join(" "),
  );
  if (target?.group === "rh") {
    const rhTabs = { offres: "offres", mobilite: "mobilite", formation: "formation", offresFormation: "offres-formation" };
    window.openSubmenuView?.("rh", rhTabs[target.key] || target.key);
    return;
  }
  if (target?.group === "achats") {
    window.switchView?.("achats");
    window.dispatchEvent(new CustomEvent("cmr:achats-service", { detail: { serviceKey: target.key } }));
    return;
  }

  console.warn("Aucune rubrique interne configurée pour Service_Front :", notification.serviceFront);
}

export function openWorkflowNotificationById(id) {
  const notification = (window.CMR_WORKFLOW_NOTIFICATIONS || []).find((item) => String(item.id) === String(id));
  openWorkflowNotification(notification);
}

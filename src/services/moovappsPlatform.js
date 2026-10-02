const DEFAULT_LIBRARY_PROTOCOL_URI = "uri://vdoc/datastore/036-000002-000";
const DEFAULT_GED_ROOT_PATH = "Intranet CMR";
const FOLDER_CACHE_KEY = "cmr-ged-folder-uris:v1";
const FOLDER_CACHE_MAX_AGE = 24 * 60 * 60 * 1000;
const REST_TOKEN_KEY = "cmr-rest-token:v1";
const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;
const GED_MEDIA_SELECTOR = [
  'img[src*="ged-file/"]',
  'video[src*="ged-file/"]',
  'audio[src*="ged-file/"]',
  'source[src*="ged-file/"]',
  '[data-ged-media-uri]',
].join(",");
const gedMediaObjectUrlCache = new Map();
const gedMediaObjectUrls = new Set();
let gedMediaObserver = null;

const DEFAULT_TEXT_SPACES = {
  faq: { id: "121", viewId: "814", transport: "session", fields: ["sys_Title", "Reponse"], required: ["sys_Title", "Reponse"] },
  ideas: { id: "120", viewId: "816", transport: "session", fields: ["sys_Title", "Description", "Qualite"], required: ["sys_Title", "Description", "Qualite"] },
  reports: { id: "123", viewId: "807", transport: "session", fields: ["sys_Title", "Type", "Description"], required: ["sys_Title", "Type", "Description"] },
  stats: { id: "126", viewId: "809", transport: "session", fields: [], required: [] },
  direction: { id: "125", viewId: "810", transport: "session", fields: [], required: [] },
};

const DEFAULT_INNOVATION_SPACES = {
  project: {
    id: "511786",
    viewId: "513659",
    required: ["sys_Title", "SyntheseDuProjet"],
    fields: ["sys_Title", "SyntheseDuProjet", "Objectif", "EquipeProjet", "Mentor", "Insights"],
    files: { image: "ImageDuProjet" },
    folder: "Intranet CMR/Espace Innovation/Fiches Projets/Suivi des projets",
  },
  spontaneous: {
    id: "512140",
    viewId: "513737",
    required: ["sys_Title", "Theme", "DescriptionDeLIdee"],
    fields: ["sys_Title", "Theme", "DescriptionDeLIdee"],
    files: {},
    folder: "Intranet CMR/Espace Innovation/Espace Idées/Dépôt d idée spontanée",
  },
  "cmr-innov": {
    id: "512002",
    viewId: "513704",
    required: ["sys_Title", "Description"],
    fields: ["sys_Title", "Description"],
    files: { image: "Image" },
    folder: "Intranet CMR/Espace Innovation/Espace Idées/CMR Innov",
  },
  "project-idea": {
    id: "512282",
    viewId: "513770",
    required: ["sys_Title", "Theme"],
    fields: ["sys_Title", "Theme", "Periode"],
    files: { image: "ImageIllustrative", documents: "SupportsDocumentaires" },
    folder: "Intranet CMR/Espace Innovation/Fiches Projets/Projets Idées",
  },
  event: {
    id: "512449",
    viewId: "513812",
    required: ["sys_Title", "Date", "Description"],
    fields: ["sys_Title", "Date", "Description"],
    files: { image: "Image" },
    folder: "Intranet CMR/Espace Innovation/Innov Event",
  },
};

let authenticationDialog = null;
let authenticationRetryAfter = 0;

export const AUTH_STATUS = {
  SUCCESS: 200,
  INVALID_CREDENTIALS: 401,
  ACCOUNT_LOCKED: 403,
  SERVER_ERROR: 500,
};

export class PlatformApiError extends Error {
  constructor(message, { status = 0, payload = null, code = "PLATFORM_ERROR" } = {}) {
    super(message);
    this.name = "PlatformApiError";
    this.status = status;
    this.payload = payload;
    this.code = code;
  }
}

export function platformBaseUrl() {
  const configured = window.CMR_PLATFORM_CONFIG?.platform?.contextPath;
  const contextPath = configured || `/${window.location.pathname.split("/").filter(Boolean)[0] || ""}`;
  return `${window.location.origin}${String(contextPath).replace(/\/$/, "")}`;
}

export function isDemoMode() {
  const hostname = window.location.hostname.toLowerCase();
  return import.meta.env.DEV || !hostname || hostname.endsWith(".github.io");
}

export function platformUrl(path) {
  return `${platformBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
}

async function readResponse(response) {
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 1000) };
  }
}

async function navigationRequest(path, { method = "GET", json, headers = {} } = {}) {
  const options = {
    method,
    credentials: "include",
    cache: "no-store",
    headers: { Accept: "application/json", ...headers },
  };
  if (json !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(json);
  }
  return fetch(platformUrl(`/navigation${path}`), options);
}

export async function checkSession() {
  try {
    const response = await navigationRequest("/auth/iau");
    return response.status === 200 || response.status === 301;
  } catch (error) {
    console.error("Vérification de la session Moovapps impossible :", error);
    return false;
  }
}

export async function isTwoFactorEnabled() {
  try {
    const response = await navigationRequest("/auth/2FA");
    if (!response.ok) return false;
    return Boolean((await response.json())?.enabled);
  } catch {
    return false;
  }
}

export async function verifyCredentials(login, password) {
  try {
    const response = await navigationRequest("/auth/verify", {
      method: "POST",
      json: { login: String(login || "").trim(), password: String(password || "") },
    });
    return { status: response.status, body: await readResponse(response) };
  } catch (error) {
    console.error("Connexion Moovapps impossible :", error);
    return { status: AUTH_STATUS.SERVER_ERROR, body: null };
  }
}

export async function getCurrentUser() {
  try {
    const response = await navigationRequest("/users/me");
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Chargement du profil Moovapps impossible :", error);
    return null;
  }
}

export async function updateCurrentUser(values) {
  const normalizedAvatar = typeof values.avatar === "string" && values.avatar.startsWith("data:")
    ? values.avatar.split(",")[1] || ""
    : values.avatar;
  const payload = {
    login: values.login,
    firstName: String(values.firstName || "").trim(),
    lastName: String(values.lastName || "").trim(),
    ...(values.avatar !== undefined ? { avatar: normalizedAvatar } : {}),
    lang: values.lang || "fr",
    oldPassword: String(values.oldPassword || "").trim(),
    newPassword: String(values.newPassword || "").trim(),
    confirmPassword: String(values.confirmPassword || "").trim(),
  };
  const response = await navigationRequest("/users/me/update", { method: "POST", json: payload });
  if (!response.ok) {
    const body = await readResponse(response);
    throw new PlatformApiError(requestError("Mise à jour du profil", response.status, body), {
      status: response.status,
      payload: body,
    });
  }
  return getCurrentUser();
}

export async function logout() {
  try {
    await navigationRequest("/auth/logout", { method: "POST", json: {} });
  } finally {
    clearRestToken();
  }
}

export function userInitials(user = {}) {
  const firstName = String(user.firstName || "").trim();
  const lastName = String(user.lastName || "").trim();
  if (firstName || lastName) return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const name = String(user.fullName || user.displayName || "").trim();
  return name ? name.split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase() : "";
}

export function resolvePlatformAssetUrl(value) {
  const source = String(value || "").trim();
  if (!source) return "";
  if (/^(data:|blob:)/i.test(source)) return source;
  if (/^https?:/i.test(source)) {
    try {
      return new URL(source).origin === window.location.origin ? source : "";
    } catch {
      return "";
    }
  }
  if (source.startsWith("/9j/")) return `data:image/jpeg;base64,${source}`;
  if (source.startsWith("iVBORw0KGgo")) return `data:image/png;base64,${source}`;
  return source.startsWith("/") ? `${platformBaseUrl()}${source}` : source;
}

export function applyCurrentUser(user) {
  if (!user) return;
  window.CMR_CURRENT_USER = user;
  const header = window.CMR_DATA?.data?.header;
  if (header) {
    const name = user.fullName || user.displayName || `${user.firstName || ""} ${user.lastName || ""}`.trim();
    header.user = {
      ...(header.user || {}),
      name: name || header.user?.name || "Utilisateur",
      avatar: userInitials(user),
      avatarUrl: resolvePlatformAssetUrl(user.avatar),
    };
  }
  window.dispatchEvent(new CustomEvent("cmr:user-updated", { detail: { user } }));
}

function requestError(label, status, payload) {
  if (status === 401 || status === 403) {
    return `${label} : accès refusé (session expirée ou droits insuffisants, HTTP ${status}).`;
  }
  const detail = payload?.message || payload?.error || "";
  return `${label} : HTTP ${status}${detail ? ` - ${detail}` : ""}`;
}

export async function loadPlatformConfig() {
  window.CMR_PLATFORM_CONFIG = window.CMR_PLATFORM_CONFIG || {};
  try {
    const response = await fetch(new URL("config/platform-config.json", document.baseURI), {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return window.CMR_PLATFORM_CONFIG;
    const config = await response.json();
    if (config && typeof config === "object") window.CMR_PLATFORM_CONFIG = config;
  } catch (error) {
    console.warn("Configuration Moovapps indisponible : valeurs par défaut utilisées.", error);
  }
  return window.CMR_PLATFORM_CONFIG;
}

export function registerGedServiceWorker() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext || isDemoMode()) return;
  const serviceWorkerUrl = new URL("ged-sw.js", document.baseURI);
  const scope = new URL("./", document.baseURI).pathname;
  navigator.serviceWorker.register(serviceWorkerUrl.pathname, { scope })
    .catch((error) => console.warn("Service worker GED indisponible :", error));
}

function gedMediaRequest(element) {
  const protocolUri = element.dataset.gedMediaUri || "";
  const fileName = element.dataset.gedMediaName || "media";
  if (protocolUri) {
    return {
      key: protocolUri,
      source: `protocol:${protocolUri}`,
      load: () => fetchGedFile(protocolUri, fileName),
    };
  }

  const source = element.getAttribute("src") || "";
  if (!/(?:^|\/)ged-file\//i.test(source)) return null;
  return {
    key: source,
    source,
    load: () => fetchGedFileFromUrl(source),
  };
}

async function hydrateGedMediaElement(element) {
  const request = gedMediaRequest(element);
  if (!request || element.dataset.gedMediaLoading === request.source) return;
  element.dataset.gedMediaLoading = request.source;

  if (!gedMediaObjectUrlCache.has(request.key)) {
    const pending = request.load()
      .then(({ blob }) => {
        const objectUrl = URL.createObjectURL(blob);
        gedMediaObjectUrls.add(objectUrl);
        return objectUrl;
      })
      .catch((error) => {
        gedMediaObjectUrlCache.delete(request.key);
        throw error;
      });
    gedMediaObjectUrlCache.set(request.key, pending);
  }

  try {
    const objectUrl = await gedMediaObjectUrlCache.get(request.key);
    if (!element.isConnected || element.dataset.gedMediaLoading !== request.source) return;
    element.src = objectUrl;
    element.removeAttribute("data-ged-media-uri");
    element.removeAttribute("data-ged-media-name");
    element.removeAttribute("data-ged-media-loading");
    if (element.tagName === "SOURCE") element.parentElement?.load?.();
  } catch (error) {
    element.removeAttribute("data-ged-media-loading");
    console.warn("Média GED indisponible :", error?.message || error);
  }
}

function hydrateGedMediaTree(root) {
  if (!(root instanceof Element) && root !== document) return;
  if (root instanceof Element && root.matches(GED_MEDIA_SELECTOR)) hydrateGedMediaElement(root);
  root.querySelectorAll?.(GED_MEDIA_SELECTOR).forEach(hydrateGedMediaElement);
}

export function installGedMediaResolver() {
  if (gedMediaObserver || isDemoMode()) return;
  hydrateGedMediaTree(document);
  gedMediaObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        hydrateGedMediaTree(mutation.target);
        return;
      }
      mutation.addedNodes.forEach((node) => hydrateGedMediaTree(node));
    });
  });
  gedMediaObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "data-ged-media-uri", "data-ged-media-name"],
  });
  window.addEventListener("beforeunload", () => {
    gedMediaObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    gedMediaObjectUrls.clear();
  }, { once: true });
}

export async function flowRequest(module, command, body) {
  const query = new URLSearchParams({ module, cmd: command, flowmode: "json" });
  const response = await fetch(platformUrl(`/navigation/flow?${query}`), {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await readResponse(response);
  if (!response.ok) throw new PlatformApiError(requestError(`Flux ${module}/${command}`, response.status, payload), { status: response.status, payload });
  if (!payload || typeof payload !== "object" || payload.raw !== undefined) {
    throw new PlatformApiError(`Flux ${module}/${command} : réponse invalide.`, { status: response.status, payload, code: "MOOVAPPS_INVALID_JSON" });
  }
  return payload;
}

export async function sessionApiRequest(path, { method = "GET", json, headers = {} } = {}) {
  const options = {
    method,
    credentials: "include",
    cache: "no-store",
    headers: { Accept: "application/json", ...headers },
  };
  if (json !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(json);
  }
  const response = await fetch(platformUrl(`/navigation/api/v2${path}`), options);
  const payload = await readResponse(response);
  if (!response.ok) throw new PlatformApiError(requestError(`Session ${method} ${path}`, response.status, payload), { status: response.status, payload });
  return { status: response.status, data: payload };
}

function getRestToken() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(REST_TOKEN_KEY) || "null");
    if (stored?.token && (!stored.expiresAt || stored.expiresAt > Date.now())) return stored.token;
  } catch {
    // Ignore invalid browser cache.
  }
  return "";
}

function clearRestToken() {
  try {
    sessionStorage.removeItem(REST_TOKEN_KEY);
  } catch {
    // Browser storage is optional.
  }
}

async function currentLogin() {
  try {
    const response = await fetch(platformUrl("/navigation/users/me"), { credentials: "include", headers: { Accept: "application/json" } });
    if (!response.ok) return "";
    const user = await response.json();
    return String(user?.login || user?.username || user?.userName || user?.sys_Login || "").trim();
  } catch {
    return "";
  }
}

export async function authenticateRest(login, password) {
  try {
    const response = await fetch(platformUrl("/api/v2/authentication"), {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ login, password }),
    });
    const payload = await readResponse(response);
    if (!response.ok || typeof payload?.token !== "string" || !payload.token) return false;
    const expiresAt = Date.parse(payload.expiration || "") || 0;
    sessionStorage.setItem(REST_TOKEN_KEY, JSON.stringify({ token: payload.token, expiresAt }));
    return true;
  } catch {
    return false;
  }
}

function requestRestAuthentication() {
  if (authenticationDialog) return authenticationDialog;
  authenticationDialog = new Promise((resolve) => {
    currentLogin().then((login) => {
      const overlay = document.createElement("div");
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.style.cssText = "position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif";
      const form = document.createElement("form");
      form.style.cssText = "background:#fff;border-radius:8px;padding:24px;width:min(400px,92vw);box-shadow:0 20px 50px rgba(0,0,0,.25);display:flex;flex-direction:column;gap:10px";
      const inputStyle = "padding:10px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px";
      form.innerHTML = `
        <div style="font-weight:800;font-size:16px">Confirmer votre mot de passe</div>
        <div style="font-size:13px;color:#475569;line-height:1.5">Pour lire et enregistrer les contenus Moovapps, saisissez de nouveau votre mot de passe. Il n'est pas conservé.</div>
        <input name="login" autocomplete="username" placeholder="Identifiant" style="${inputStyle}">
        <input name="password" type="password" autocomplete="current-password" placeholder="Mot de passe" style="${inputStyle}">
        <div data-error style="color:#b91c1c;font-size:12px;min-height:16px"></div>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button type="button" data-cancel style="padding:9px 14px;border:1px solid #cbd5e1;background:#fff;border-radius:6px;cursor:pointer">Annuler</button>
          <button type="submit" style="padding:9px 16px;border:0;background:#1d4ed8;color:#fff;border-radius:6px;font-weight:700;cursor:pointer">Valider</button>
        </div>`;
      overlay.appendChild(form);
      document.body.appendChild(overlay);
      const loginInput = form.elements.login;
      const passwordInput = form.elements.password;
      const error = form.querySelector("[data-error]");
      loginInput.value = login;
      (login ? passwordInput : loginInput).focus();
      const finish = (result) => {
        overlay.remove();
        authenticationDialog = null;
        resolve(result);
      };
      form.querySelector("[data-cancel]").addEventListener("click", () => finish(false));
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        error.textContent = "";
        if (await authenticateRest(loginInput.value.trim(), passwordInput.value)) finish(true);
        else {
          error.textContent = "Identifiant ou mot de passe incorrect.";
          passwordInput.value = "";
          passwordInput.focus();
        }
      });
    });
  });
  return authenticationDialog;
}

export async function restApiRequest(path, { method = "GET", json, formData, headers = {} } = {}) {
  let token = getRestToken();
  if (!token && Date.now() > authenticationRetryAfter) {
    const authenticated = await requestRestAuthentication();
    if (!authenticated) authenticationRetryAfter = Date.now() + 60_000;
    token = getRestToken();
  }
  const options = {
    method,
    credentials: "include",
    cache: "no-store",
    headers: { Accept: "application/json", ...(token ? { "X-AUTHENTICATION-KEY": token } : {}), ...headers },
  };
  if (formData) options.body = formData;
  else if (json !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(json);
  }
  const response = await fetch(platformUrl(`/api/v2${path}`), options);
  const payload = await readResponse(response);
  if (!response.ok) {
    if (response.status === 401 && token) clearRestToken();
    throw new PlatformApiError(requestError(`API ${method} ${path}`, response.status, payload), { status: response.status, payload });
  }
  return { status: response.status, data: payload };
}

function asArray(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  return typeof value === "object" && Object.keys(value).length ? [value] : [];
}

function cleanPath(value) {
  return String(value || "").replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

function pathSegments(value) {
  return cleanPath(value).split("/").filter(Boolean);
}

function normalizedText(value) {
  return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function compactText(value) {
  return normalizedText(value).replace(/[^a-z0-9]+/g, "");
}

function wordsKey(value) {
  const ignored = new Set(["a", "au", "aux", "d", "de", "des", "du", "l", "la", "le", "les"]);
  return normalizedText(value).split(/[^a-z0-9]+/).filter((word) => word && !ignored.has(word)).join("");
}

function levenshtein(left, right) {
  if (left === right) return 0;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        current[rightIndex - 1] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[right.length];
}

function exactSegment(left, right) {
  return compactText(left) === compactText(right);
}

function compatibleSegment(left, right) {
  const compactLeft = compactText(left);
  const compactRight = compactText(right);
  if (Math.min(compactLeft.length, compactRight.length) < 4) return false;
  if (compactLeft.startsWith(compactRight) || compactRight.startsWith(compactLeft)) return true;
  const wordsLeft = wordsKey(left);
  const wordsRight = wordsKey(right);
  if (wordsLeft.length >= 4 && wordsLeft === wordsRight) return true;
  const longest = Math.max(wordsLeft.length, wordsRight.length);
  return longest >= 8 && levenshtein(wordsLeft, wordsRight) <= (longest >= 32 ? 2 : 1);
}

function exactPrefix(path, prefix) {
  return prefix.length <= path.length && prefix.every((segment, index) => exactSegment(path[index], segment));
}

function compatiblePrefix(path, prefix) {
  return prefix.length <= path.length && prefix.every((segment, index) => exactSegment(path[index], segment) || compatibleSegment(path[index], segment));
}

function prefixOffset(path, prefix) {
  if (!prefix.length) return 0;
  for (let index = 0; index <= path.length - prefix.length; index += 1) {
    if (exactPrefix(path.slice(index), prefix)) return index;
  }
  return null;
}

function readFolderCache() {
  try {
    const value = JSON.parse(localStorage.getItem(FOLDER_CACHE_KEY) || "null");
    if (value?.map && Date.now() - Number(value.savedAt || 0) < FOLDER_CACHE_MAX_AGE) return value.map;
  } catch {
    // Invalid cache is ignored.
  }
  return {};
}

function writeFolderCache(map) {
  try {
    localStorage.setItem(FOLDER_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), map }));
  } catch {
    // Browser storage is optional.
  }
}

function findCachedFolder(map, requestedPath) {
  const requested = pathSegments(requestedPath);
  const entries = Object.entries(map)
    .map(([path, protocolUri]) => [cleanPath(path), String(protocolUri || "").trim()])
    .filter(([path, protocolUri]) => path && protocolUri)
    .sort((left, right) => pathSegments(right[0]).length - pathSegments(left[0]).length);
  const exact = entries.find(([path]) => exactPrefix(requested, pathSegments(path)));
  if (exact) return { path: exact[0], protocolUri: exact[1] };
  const candidates = entries.filter(([path]) => compatiblePrefix(requested, pathSegments(path)));
  if (!candidates.length) return { path: "", protocolUri: "" };
  const maxDepth = Math.max(...candidates.map(([path]) => pathSegments(path).length));
  const deepest = candidates.filter(([path]) => pathSegments(path).length === maxDepth);
  return deepest.length === 1 ? { path: deepest[0][0], protocolUri: deepest[0][1] } : { path: "", protocolUri: "" };
}

function libraryProtocolUri() {
  return window.CMR_PLATFORM_CONFIG?.ged?.libraryProtocolUri || DEFAULT_LIBRARY_PROTOCOL_URI;
}

function libraryViewBody(scopeType, protocolUri, maxLevel) {
  return {
    view: {
      "@xmlns:vw1": "http://www.axemble.com/vdoc/view",
      header: {
        scopes: { [scopeType]: { "@protocol-uri": protocolUri, "@self-closing": "true" } },
        configuration: { param: { "@name": "maxlevel", "@value": String(maxLevel), "@self-closing": "true" } },
        definition: {
          "@class": "com.axemble.vdoc.sdk.interfaces.IFolder",
          definition: { "@class": "com.axemble.vdoc.sdk.interfaces.IFile", "@self-closing": "true" },
        },
      },
    },
  };
}

async function libraryView(scopeType, protocolUri, maxLevel) {
  return flowRequest("library", "view", libraryViewBody(scopeType, protocolUri, maxLevel));
}

function findFolder(response, requestedName) {
  const folders = asArray(response?.view?.body?.folder).filter((folder) => folder && typeof folder === "object");
  const exact = folders.find((folder) => exactSegment(String(folder["@name"] || ""), requestedName));
  if (exact) return exact;
  const compatible = folders.filter((folder) => compatibleSegment(String(folder["@name"] || ""), requestedName));
  return compatible.length === 1 ? compatible[0] : null;
}

async function resolveGedFolder(requestedPath) {
  const cache = { ...readFolderCache() };
  const cached = findCachedFolder(cache, requestedPath);
  let currentPath = cached.path;
  let currentUri = cached.protocolUri;
  let remaining = pathSegments(requestedPath);
  let scopeType = "library";
  let scopeUri = libraryProtocolUri();
  if (currentPath && currentUri) {
    remaining = remaining.slice(pathSegments(currentPath).length);
    scopeType = "folder";
    scopeUri = currentUri;
  }
  for (const segment of remaining) {
    const response = await libraryView(scopeType, scopeUri, 1);
    const folder = findFolder(response, segment);
    if (!folder?.["@protocol-uri"]) {
      writeFolderCache(cache);
      return { path: "", protocolUri: "" };
    }
    const actualName = String(folder["@name"] || "").trim() || segment;
    currentPath = cleanPath(currentPath ? `${currentPath}/${actualName}` : actualName);
    currentUri = String(folder["@protocol-uri"]);
    cache[currentPath] = currentUri;
    scopeType = "folder";
    scopeUri = currentUri;
  }
  writeFolderCache(cache);
  return { path: currentPath, protocolUri: currentUri };
}

function relativeIntranetPath(path) {
  const parts = pathSegments(path);
  const root = pathSegments(DEFAULT_GED_ROOT_PATH);
  const offset = prefixOffset(parts, root);
  return offset === null ? cleanPath(path) : parts.slice(offset + root.length).join("/");
}

function normalizeResource(resource, folderPath, filterSegments) {
  const folderSegments = pathSegments(folderPath);
  const offset = prefixOffset(folderSegments, filterSegments);
  if (offset === null) return null;
  const segments = folderSegments.slice(offset + filterSegments.length);
  const fileName = String(resource["@reference"] || "Document");
  return {
    id: String(resource["@id"] || resource["@protocol-uri"] || fileName),
    title: fileName,
    label: fileName,
    fileName,
    protocolUri: String(resource["@protocol-uri"] || ""),
    folderPath,
    folderLabel: segments.join("/") || filterSegments[filterSegments.length - 1] || "",
    segments,
    intranetPath: relativeIntranetPath(folderPath),
    createdAt: String(resource["@created-date"] || ""),
    updatedAt: String(resource["@modified-date"] || ""),
  };
}

function reportedFolderPath(folder, parentPath, filterSegments) {
  const reported = cleanPath(folder["@path"] || "");
  if (reported && prefixOffset(pathSegments(reported), filterSegments) !== null) return reported;
  const name = String(folder["@name"] || "").trim();
  return cleanPath(name ? (parentPath ? `${parentPath}/${name}` : name) : (parentPath || reported));
}

function collectGedTree(folders, documents, folderEntries, filterSegments, parentPath) {
  folders.forEach((folder) => {
    if (!folder || typeof folder !== "object") return;
    const folderPath = reportedFolderPath(folder, parentPath, filterSegments);
    const folderSegments = pathSegments(folderPath);
    const offset = prefixOffset(folderSegments, filterSegments);
    if (offset !== null) {
      const segments = folderSegments.slice(offset + filterSegments.length);
      if (segments.length) {
        folderEntries.push({
          id: String(folder["@id"] || folder["@protocol-uri"] || folderPath),
          title: String(folder["@name"] || segments[segments.length - 1]),
          folderPath,
          folderLabel: segments.join("/"),
          segments,
          protocolUri: String(folder["@protocol-uri"] || ""),
        });
      }
    }
    asArray(folder.resource).forEach((resource) => {
      const normalized = normalizeResource(resource, folderPath, filterSegments);
      if (normalized) documents.push(normalized);
    });
    collectGedTree(asArray(folder.folder), documents, folderEntries, filterSegments, folderPath);
  });
}

export async function listGedDocuments(path) {
  const requestedPath = cleanPath(path) || `${DEFAULT_GED_ROOT_PATH}/Organisation & RSE/SMI`;
  const resolved = await resolveGedFolder(requestedPath);
  const scopeType = resolved.protocolUri ? "folder" : "library";
  const scopeUri = resolved.protocolUri || libraryProtocolUri();
  const filterPath = resolved.path && pathSegments(resolved.path).length === pathSegments(requestedPath).length ? resolved.path : requestedPath;
  const filterSegments = pathSegments(filterPath);
  const response = await libraryView(scopeType, scopeUri, -1);
  const documents = [];
  const folders = [];
  const rootPath = scopeType === "folder" ? filterPath : "/DefaultOrganization/GED";
  asArray(response?.view?.body?.resource).forEach((resource) => {
    const normalized = normalizeResource(resource, rootPath, filterSegments);
    if (normalized) documents.push(normalized);
  });
  collectGedTree(asArray(response?.view?.body?.folder), documents, folders, filterSegments, rootPath);
  return {
    data: documents,
    folders,
    meta: {
      source: "moovapps",
      libraryProtocolUri: libraryProtocolUri(),
      scopeType,
      scopeProtocolUri: resolved.protocolUri,
      scopeProtocolPath: resolved.path,
      filterPath: requestedPath,
      resolvedFilterPath: filterPath,
      count: documents.length,
      cache: "miss",
    },
  };
}

export function gedDownloadUrl(protocolUri, fileName = "document.pdf", { download = false } = {}) {
  const url = new URL(`ged-file/${encodeURIComponent(fileName || "document")}`, document.baseURI);
  url.searchParams.set("protocolUri", protocolUri);
  if (download) url.searchParams.set("download", "1");
  return url.toString();
}

function gedFileRequestBody(protocolUri) {
  return {
    get: {
      "@xmlns:d1": "http://www.axemble.com/vdoc/file",
      body: {
        resource: {
          "@class": "com.axemble.vdoc.sdk.interfaces.IFile",
          header: { "@protocol-uri": protocolUri, "@self-closing": "true" },
        },
      },
    },
  };
}

export async function fetchGedFile(protocolUri, fallbackName = "document") {
  if (!protocolUri) {
    throw new PlatformApiError("Document GED : référence manquante.", { code: "PROTOCOL_URI_REQUIRED" });
  }

  const payload = await flowRequest("library", "get", gedFileRequestBody(protocolUri));
  const attachments = payload?.resource?.header?.attachments?.file;
  const attachment = Array.isArray(attachments) ? attachments[0] : attachments;
  const content = attachment?.content;
  if (!content?.["@uri"]) {
    throw new PlatformApiError("Document GED : pièce jointe introuvable.", { status: 404, code: "ATTACHMENT_NOT_FOUND" });
  }

  const attachmentPath = String(content["@uri"]);
  const response = await fetch(platformUrl(`/portal${attachmentPath.startsWith("/") ? "" : "/"}${attachmentPath}`), {
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new PlatformApiError(`Téléchargement GED : HTTP ${response.status}.`, {
      status: response.status,
      code: "MOOVAPPS_DOWNLOAD_FAILED",
    });
  }

  const fileName = String(content["@name"] || fallbackName || "document");
  const receivedBlob = await response.blob();
  const extension = fileName.split(".").pop()?.toLowerCase();
  const knownType = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    mp4: "video/mp4",
    webm: "video/webm",
  }[extension];
  const blob = knownType && receivedBlob.type !== knownType
    ? receivedBlob.slice(0, receivedBlob.size, knownType)
    : receivedBlob;

  return { blob, fileName };
}

export async function fetchGedFileFromUrl(value) {
  const url = new URL(String(value || ""), document.baseURI);
  const protocolUri = url.searchParams.get("protocolUri");
  if (!protocolUri) {
    const response = await fetch(url, { credentials: "include", cache: "no-store" });
    if (!response.ok) throw new PlatformApiError(`Téléchargement : HTTP ${response.status}.`, { status: response.status });
    return { blob: await response.blob(), fileName: decodeURIComponent(url.pathname.split("/").pop() || "document") };
  }
  return fetchGedFile(protocolUri, decodeURIComponent(url.pathname.split("/").pop() || "document"));
}

function configSpace(group, key, defaults) {
  const normalizedKey = String(key || "").trim().toLowerCase();
  const fallback = defaults[normalizedKey];
  if (!fallback) throw new PlatformApiError(`Espace inconnu : ${key}`, { status: 400, code: "UNKNOWN_SPACE" });
  return { key: normalizedKey, ...fallback, ...(window.CMR_PLATFORM_CONFIG?.[group]?.[normalizedKey] || {}) };
}

export async function listTextContent(space) {
  const config = configSpace("textSpaces", space, DEFAULT_TEXT_SPACES);
  const request = String(config.transport || "rest").toLowerCase() === "session" ? sessionApiRequest : restApiRequest;
  const path = request === sessionApiRequest
    ? `/datauniverse/views?id=${encodeURIComponent(config.viewId)}&range=0-200`
    : `/workflows/views/${encodeURIComponent(config.viewId)}`;
  const { data } = await request(path);
  return { data, meta: { source: "moovapps", space: config.key, viewId: config.viewId, transport: config.transport || "rest" } };
}

export async function createTextContent(space, values = {}) {
  const config = configSpace("textSpaces", space, DEFAULT_TEXT_SPACES);
  const cleanValues = {};
  const fields = config.fields || [];
  (fields.length ? fields : Object.keys(values)).forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(values, field)) cleanValues[field] = typeof values[field] === "string" ? values[field].trim() : values[field];
  });
  (config.required || []).forEach((field) => {
    if (!cleanValues[field]) throw new PlatformApiError(`Champ obligatoire manquant : ${field}`, { status: 422, code: "FIELD_REQUIRED" });
  });
  const sessionTransport = String(config.transport || "rest").toLowerCase() === "session";
  const request = sessionTransport ? sessionApiRequest : restApiRequest;
  const path = sessionTransport ? `/datauniverse?tableId=${encodeURIComponent(config.id)}` : `/datauniverse/${encodeURIComponent(config.id)}`;
  const { data } = await request(path, { method: "POST", json: { values: cleanValues } });
  return { data, meta: { source: "moovapps", space: config.key, dataUniverseId: config.id, transport: config.transport || "rest" } };
}

function innovationSpace(space) {
  return configSpace("innovationSpaces", space, DEFAULT_INNOVATION_SPACES);
}

export async function listInnovationContent(space) {
  const config = innovationSpace(space);
  const { data } = await restApiRequest(`/workflows/views/${encodeURIComponent(config.viewId)}`);
  return { data, meta: { space: config.key, viewId: config.viewId } };
}

export function innovationFileUrl(reference) {
  return reference ? platformUrl(`/api/v2/files/${encodeURIComponent(reference)}`) : "";
}

function findUploadedFile(value) {
  if (!value || typeof value !== "object") return null;
  const guid = value.guid ?? value["@guid"];
  const fileName = value.fileName ?? value.name ?? value["@name"];
  if (typeof guid === "string" && guid) return { guid, fileName: typeof fileName === "string" && fileName ? fileName : "fichier" };
  for (const nested of Object.values(value)) {
    const found = findUploadedFile(nested);
    if (found) return found;
  }
  return null;
}

async function uploadFile(file) {
  if (file.size > MAX_UPLOAD_SIZE) throw new PlatformApiError(`Fichier trop volumineux (25 Mo maximum) : ${file.name}`, { status: 413, code: "FILE_TOO_LARGE" });
  const formData = new FormData();
  formData.append("file", file, file.name);
  const { data } = await restApiRequest("/files", { method: "POST", formData });
  const uploaded = findUploadedFile(data);
  if (!uploaded) throw new PlatformApiError("Téléversement du fichier : référence introuvable.", { code: "MOOVAPPS_FILE_UPLOAD_FAILED", payload: data });
  return uploaded;
}

async function publishFileToGed(file, folderPath) {
  try {
    const folder = await resolveGedFolder(folderPath);
    if (!folder.protocolUri) return { ok: false, message: "Dossier documentaire introuvable", path: folderPath };
    const uploaded = await uploadFile(file);
    const response = await flowRequest("library", "create", {
      create: {
        header: {},
        body: {
          resource: {
            "@class": "com.axemble.vdoc.sdk.interfaces.IFile",
            header: {
              "@reference": file.name,
              "@description": "Pièce jointe publiée depuis l'intranet CMR",
              folder: { "@protocol-uri": folder.protocolUri, "@self-closing": "true" },
              attachments: { file: { content: { "@name": uploaded.fileName, "@guid": uploaded.guid, "@self-closing": "true" } } },
            },
            body: {},
          },
        },
      },
    });
    return { ok: true, path: folderPath, fileName: uploaded.fileName, response };
  } catch (error) {
    return { ok: false, path: folderPath, message: error?.message || String(error) };
  }
}

export async function submitInnovationContent(space, values = {}, files = {}) {
  const config = innovationSpace(space);
  const cleanValues = {};
  (config.fields || []).forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(values, field)) cleanValues[field] = typeof values[field] === "string" ? values[field].trim() : values[field];
  });
  (config.required || []).forEach((field) => {
    if (cleanValues[field] === undefined || cleanValues[field] === null || cleanValues[field] === "") {
      throw new PlatformApiError(`Champ obligatoire manquant : ${field}`, { status: 422, code: "FIELD_REQUIRED" });
    }
  });
  const uploads = [];
  for (const [inputName, fieldName] of Object.entries(config.files || {})) {
    const file = files?.[inputName];
    if (!file?.size) continue;
    const uploaded = await uploadFile(file);
    cleanValues[fieldName] = [uploaded];
    uploads.push({ file, reference: uploaded });
  }
  const { data } = await restApiRequest(`/datauniverse/${encodeURIComponent(config.id)}`, { method: "POST", json: { values: cleanValues } });
  const ged = [];
  for (const upload of uploads) ged.push(await publishFileToGed(upload.file, config.folder));
  return { data, files: uploads.map((upload) => upload.reference), ged, meta: { space: config.key, dataUniverseId: config.id, folder: config.folder } };
}

function formatNewsDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

function sanitizeNewsHtml(value) {
  if (!value) return "";
  const allowedTags = new Set(["a", "abbr", "b", "blockquote", "br", "code", "div", "em", "figcaption", "figure", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "ol", "p", "pre", "span", "strong", "sub", "sup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "u", "ul"]);
  const allowedAttributes = new Set(["href", "src", "alt", "title", "colspan", "rowspan", "width", "height", "target", "rel", "dir", "lang", "style"]);
  const blockedTags = new Set(["script", "style", "iframe", "object", "embed", "form", "link", "meta", "svg", "math"]);
  const documentNode = new DOMParser().parseFromString(String(value), "text/html");
  const clean = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.COMMENT_NODE) {
        child.remove();
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      const tag = child.tagName.toLowerCase();
      if (blockedTags.has(tag)) {
        child.remove();
        return;
      }
      clean(child);
      if (!allowedTags.has(tag)) {
        child.replaceWith(...Array.from(child.childNodes));
        return;
      }
      Array.from(child.attributes).forEach((attribute) => {
        const name = attribute.name.toLowerCase();
        const content = attribute.value.trim();
        if (!allowedAttributes.has(name) || name.startsWith("on") ||
          ((name === "href" || name === "src") && /^(javascript|vbscript|data:text)/i.test(content)) ||
          (name === "style" && /expression|url\(|javascript:/i.test(content))) {
          child.removeAttribute(attribute.name);
        }
      });
      if (tag === "a") {
        child.setAttribute("target", "_blank");
        child.setAttribute("rel", "noopener noreferrer");
      }
      if (tag === "img" && child.getAttribute("src")) {
        child.setAttribute("src", resolvePlatformAssetUrl(child.getAttribute("src")));
      }
    });
  };
  clean(documentNode.body);
  return documentNode.body.innerHTML;
}

async function newsRequest(path, options = {}) {
  const response = await navigationRequest(path, options);
  const payload = await readResponse(response);
  if (!response.ok) {
    throw new PlatformApiError(requestError("Actualités", response.status, payload), { status: response.status, payload });
  }
  if (!payload || typeof payload !== "object" || payload.raw !== undefined) {
    throw new PlatformApiError("Actualités : réponse Moovapps invalide.", { status: response.status, payload, code: "MOOVAPPS_INVALID_JSON" });
  }
  return payload;
}

export async function loadNewsDetails(article) {
  if (!article || article.detailLoaded || !article.protocolURI) return article;
  try {
    const details = await newsRequest("/news/details", {
      method: "POST",
      json: { protocolURI: article.protocolURI },
    });
    article.contentHtml = sanitizeNewsHtml(details?.contenu);
    article.heroImage = resolvePlatformAssetUrl(details?.diaporamaURL);
    article.attachments = (details?.piecesJointes || []).map((attachment) => ({
      name: attachment.name,
      extension: attachment.extension,
      url: resolvePlatformAssetUrl(attachment.url),
    }));
    if (details?.auteur) article.author = details.auteur;
    article.detailLoaded = true;
    article.detailError = false;
  } catch (error) {
    article.detailError = true;
    console.error("Chargement du détail de l'actualité impossible :", error);
  }
  return article;
}

export async function loadMoovappsNews() {
  const applicationData = window.CMR_DATA?.data;
  if (!applicationData) return null;
  try {
    const rawItems = [];
    let page = 1;
    let hasNext = true;
    while (hasNext && page <= 20) {
      const payload = await newsRequest(`/news?page=${page}&limit=50`);
      rawItems.push(...(payload?.items || []));
      hasNext = Boolean(payload?.hasNext);
      page += 1;
    }
    const fallbackImage = applicationData.actualitesLabels?.fallbackImage || "";
    const articles = rawItems.map((item, index) => {
      const category = item.rubriqueActuality || item.espaceActuality || "Actualités";
      const tags = [item.rubriqueActuality, item.espaceActuality].filter(Boolean);
      return {
        id: 1000 + index,
        protocolURI: item.protocolURI,
        title: item.titre || "",
        category,
        date: formatNewsDate(item.datePublication),
        author: item.auteur || "",
        image: item.imageURL ? resolvePlatformAssetUrl(item.imageURL) : fallbackImage,
        excerpt: item.resume || "",
        content: item.resume ? [item.resume] : [],
        tags: tags.length ? tags : [category],
        detailLoaded: false,
      };
    });
    applicationData.actuData = articles;
    const allFilter = (applicationData.actualitesFilters || []).find((filter) => filter.value === "all") || { label: "Toutes", value: "all" };
    const categories = [...new Set(articles.map((article) => article.category))].sort((left, right) => left.localeCompare(right, "fr"));
    applicationData.actualitesFilters = [{ ...allFilter, active: true }, ...categories.map((category) => ({ label: category, value: category }))];
    if (applicationData.dashboardNews) {
      const toDashboardItem = (article) => ({
        title: article.title,
        meta: `${article.category} • ${article.date}`,
        image: article.image || fallbackImage,
        alt: article.title,
        handler: `goToActualites(${article.id}); return false;`,
      });
      const dashboardItems = articles.slice(0, 3).map(toDashboardItem);
      applicationData.dashboardNews = { ...applicationData.dashboardNews, slides: dashboardItems, miniItems: dashboardItems };
    }
    return articles;
  } catch (error) {
    console.error("Actualités Moovapps indisponibles, conservation des données locales :", error);
    return null;
  }
}

export function exposePlatformApi() {
  window.CMR_PLATFORM = {
    isDemo: isDemoMode(),
    loadConfig: loadPlatformConfig,
    auth: {
      checkSession,
      twoFactorEnabled: isTwoFactorEnabled,
      verify: verifyCredentials,
      authenticateRest,
      currentUser: getCurrentUser,
      updateUser: updateCurrentUser,
      logout,
    },
    news: { load: loadMoovappsNews, loadDetails: loadNewsDetails, resolveUrl: resolvePlatformAssetUrl },
    ged: { list: listGedDocuments, downloadUrl: gedDownloadUrl, fetchFile: fetchGedFile, fetchFileFromUrl: fetchGedFileFromUrl },
    textContent: { list: listTextContent, create: createTextContent },
    innovation: { list: listInnovationContent, submit: submitInnovationContent, fileUrl: innovationFileUrl },
  };
}

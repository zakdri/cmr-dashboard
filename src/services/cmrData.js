const DATA_ROOT = 'data/';
const ROOT_MANIFEST = `${DATA_ROOT}cmr-data.json`;

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Impossible de charger ${url} (${response.status})`);
  }
  return response.json();
}

function resolveFrom(parentUrl, relativePath) {
  return new URL(relativePath, new URL(parentUrl, document.baseURI)).toString();
}

async function loadDataset(moduleUrl, dataset) {
  if (dataset.type === 'array') {
    if (!Array.isArray(dataset.files)) {
      throw new Error(`Liste de fichiers invalide pour ${dataset.key}`);
    }
    return Promise.all(
      dataset.files.map(file => fetchJson(resolveFrom(moduleUrl, file)))
    );
  }

  if (dataset.type === 'object') {
    if (!Array.isArray(dataset.entries)) {
      throw new Error(`Liste d'entrées invalide pour ${dataset.key}`);
    }
    const entries = await Promise.all(
      dataset.entries.map(async entry => [
        entry.key,
        await fetchJson(resolveFrom(moduleUrl, entry.file))
      ])
    );
    return Object.fromEntries(entries);
  }

  if (!dataset.file) {
    throw new Error(`Fichier manquant pour ${dataset.key}`);
  }
  return fetchJson(resolveFrom(moduleUrl, dataset.file));
}

async function loadModule(moduleReference) {
  if (typeof moduleReference === 'object' && moduleReference.bundle) {
    const bundle = await fetchJson(
      resolveFrom(DATA_ROOT, moduleReference.bundle)
    );
    if (!bundle.data || typeof bundle.data !== 'object') {
      throw new Error(`Bundle de module invalide : ${moduleReference.bundle}`);
    }
    return bundle.data;
  }

  const modulePath =
    typeof moduleReference === 'string'
      ? moduleReference
      : moduleReference.manifest;
  const moduleUrl = resolveFrom(DATA_ROOT, modulePath);
  const moduleManifest = await fetchJson(moduleUrl);

  if (!Array.isArray(moduleManifest.datasets)) {
    throw new Error(`Manifest de module invalide : ${modulePath}`);
  }

  const datasets = await Promise.all(
    moduleManifest.datasets.map(async dataset => [
      dataset.key,
      await loadDataset(moduleUrl, dataset)
    ])
  );

  return Object.fromEntries(datasets);
}

async function loadModularData(manifest) {
  const modules = await Promise.all(manifest.modules.map(loadModule));
  const data = {};

  for (const moduleData of modules) {
    for (const [key, value] of Object.entries(moduleData)) {
      if (Object.hasOwn(data, key)) {
        throw new Error(`Clé de données dupliquée : ${key}`);
      }
      data[key] = value;
    }
  }

  return data;
}

async function loadLegacySpaces(manifest) {
  const spaces = await Promise.all(
    manifest.spaces.map(file => fetchJson(`${DATA_ROOT}${file}`))
  );

  return spaces.reduce(
    (accumulator, space) => ({ ...accumulator, ...(space.data || {}) }),
    {}
  );
}

export async function loadApplicationData() {
  window.CMR_DATA = { data: {} };
  const manifest = await fetchJson(ROOT_MANIFEST);

  let data;
  if (Array.isArray(manifest.modules)) {
    data = await loadModularData(manifest);
  } else if (Array.isArray(manifest.spaces)) {
    data = await loadLegacySpaces(manifest);
  } else {
    window.CMR_DATA = manifest;
    return;
  }

  window.CMR_DATA = {
    ...manifest,
    data
  };
}

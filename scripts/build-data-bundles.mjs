import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const dataRoot = path.join(projectRoot, "data");
const rootManifestPath = path.join(dataRoot, "cmr-data.json");

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function mergeData(target, source, context) {
  for (const [key, value] of Object.entries(source || {})) {
    if (!Object.hasOwn(target, key)) {
      target[key] = structuredClone(value);
    } else if (Array.isArray(target[key]) && Array.isArray(value)) {
      target[key].push(...structuredClone(value));
    } else if (isObject(target[key]) && isObject(value)) {
      mergeData(target[key], value, context);
    } else {
      throw new Error(`Collision sur ${key} dans ${context}`);
    }
  }

  return target;
}

const rootManifest = await readJson(rootManifestPath);
const moduleReferences = [];
const globalKeys = new Set();

for (const moduleReference of rootManifest.modules || []) {
  const manifestRelativePath =
    typeof moduleReference === "string"
      ? moduleReference
      : moduleReference.manifest;

  if (!manifestRelativePath) {
    throw new Error("Une référence de module ne contient pas de manifeste.");
  }

  const manifestPath = path.join(dataRoot, manifestRelativePath);
  const moduleDirectory = path.dirname(manifestPath);
  const moduleManifest = await readJson(manifestPath);
  const data = {};

  for (const reference of moduleManifest.fichiers || []) {
    const fragment = await readJson(
      path.join(moduleDirectory, reference.fichier),
    );
    if (!isObject(fragment.data)) {
      throw new Error(
        `Fragment invalide : ${manifestRelativePath}/${reference.fichier}`,
      );
    }
    mergeData(data, fragment.data, reference.fichier);
  }

  for (const key of Object.keys(data)) {
    if (globalKeys.has(key)) {
      throw new Error(`Clé de données dupliquée entre rubriques : ${key}`);
    }
    globalKeys.add(key);
  }

  const bundleRelativePath = path.posix.join(
    path.posix.dirname(manifestRelativePath),
    "bundle.json",
  );

  await writeJson(path.join(dataRoot, bundleRelativePath), {
    module: moduleManifest.module,
    generatedFrom: "manifest.json",
    data,
  });

  moduleReferences.push({
    name: moduleManifest.module,
    manifest: manifestRelativePath,
    bundle: bundleRelativePath,
  });
}

await writeJson(rootManifestPath, {
  ...rootManifest,
  modules: moduleReferences,
});

console.log(
  `${moduleReferences.length} bundles de données générés (${globalKeys.size} clés).`,
);

import assert from "node:assert/strict";
import fs from "node:fs";

const configuration = JSON.parse(
  fs.readFileSync("data/rubriques/reglementation/configuration-generale.json", "utf8"),
).data;
const navigation = JSON.parse(
  fs.readFileSync("data/rubriques/navigation/sous-menus/reglementation.json", "utf8"),
).data.sidebarSubmenus.reglementation.items;

assert.deepEqual(
  navigation.map(({ label }) => label),
  [
    "Bibliothèque des modèles",
    "Gouvernance",
    "Jurisprudence",
    "Légal et réglementaire",
    "Veille juridique",
  ],
);

const expectedSections = {
  modeles: [["Bibliothèque des modèles", "Bibliothèque des modèles", []]],
  gouvernance: [["Arrêtés", "Gouvernance/Arrêtés", []]],
  jurisprudence: [["Contentieux", "Jurisprudence/Contentieux", []]],
  "legal-reglementaire": [
    ["Divers", "Légal & Réglementaires/Divers", []],
    ["Environnement", "Légal & Réglementaires/Environnement", []],
    ["Finance et comptabilité", "Légal & Réglementaires/Finance et comptabilité", []],
    ["Gouvernance", "Légal & Réglementaires/Gouvernance", ["Arrêtés", "Décrets", "Lois"]],
    ["Marchés publics", "Légal & Réglementaires/Marchés publics", []],
    ["Prestations pour le compte des tiers", "Légal & Réglementaires/Prestations pour le compte des tiers", []],
    ["Régime civil", "Légal & Réglementaires/Régime civil", ["Arrêtés", "Circulaires", "Décrets", "Lois"]],
    ["Régime complémentaire", "Légal & Réglementaires/Régime complémentaire", []],
    ["Régime des non-cotisants", "Légal & Réglementaires/Régime des non-cotisants", ["Arrêtés", "Lois"]],
    ["Régime militaires", "Légal & Réglementaires/Régime militaires", ["Arrêtés", "Décrets", "Lois"]],
    ["Régime particulier", "Légal & Réglementaires/Régime particulier", []],
    ["Santé et sécurité au travail (SST)", "Légal & Réglementaires/Santé et sécurité au travail (SST)", []],
    ["Systèmes d’information et transformation numérique", "Légal & Réglementaires/Systèmes d’information et transformation numérique", []],
  ],
  "veille-juridique": [["Retraite", "Veille juridique/Retraite", []]],
};

for (const [sectionId, expectedFolders] of Object.entries(expectedSections)) {
  const section = configuration.regSectionConfig[sectionId];
  assert.ok(section, `Rubrique manquante : ${sectionId}`);
  assert.deepEqual(
    section.subs.map(({ label, path, folders = [] }) => [label, path, folders]),
    expectedFolders,
    `Arborescence incorrecte : ${sectionId}`,
  );
}

assert.deepEqual(Object.keys(configuration.regSectionConfig), Object.keys(expectedSections));

const civilRegime = configuration.regSectionConfig["legal-reglementaire"].subs.find(
  ({ id }) => id === "legal-regime-civil",
);
assert.equal(civilRegime.includeAllFilter, false);
assert.equal(civilRegime.defaultFolder, "Arrêtés");
assert.deepEqual(civilRegime.filterLabels, { Circulaires: "Circulaire" });

const nonContributorRegime = configuration.regSectionConfig["legal-reglementaire"].subs.find(
  ({ id }) => id === "legal-regime-non-cotisants",
);
assert.equal(nonContributorRegime.includeAllFilter, false);
assert.equal(nonContributorRegime.defaultFolder, "Arrêtés");
assert.deepEqual(nonContributorRegime.folders, ["Arrêtés", "Lois"]);

const militaryRegime = configuration.regSectionConfig["legal-reglementaire"].subs.find(
  ({ id }) => id === "legal-regime-militaires",
);
assert.equal(militaryRegime.includeAllFilter, false);
assert.equal(militaryRegime.defaultFolder, "Arrêtés");
assert.deepEqual(militaryRegime.folders, ["Arrêtés", "Décrets", "Lois"]);

const documentsApi = fs.readFileSync("public/api/smi-documents.php", "utf8");
assert.match(
  documentsApi,
  /collect_documents\([\s\S]*?\$documentScope,\s*\$rootResourceFolderPath\s*\);/,
  "Le repli GED doit conserver le chemin racine réel pour filtrer la rubrique demandée.",
);
console.log("Arborescence Réglementaire conforme.");

import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { build } from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const data = JSON.parse(fs.readFileSync("data/rubriques/strategie-et-projets/bundle.json", "utf8")).data;
const space = data.strategieProjetsSpace;
const orientations = space.strategy.orientations;
const expected = [
  "Client-Centric",
  "Investissement diversifié et innovant",
  "Transformation interne",
  "Bonne gouvernance et RSE",
  "Transformation managériale",
  "Digital et Innovation",
  "Confiance avec les parties prenantes",
];
assert.deepEqual(orientations.map((item) => item.title), expected);
assert.equal(new Set(orientations.map((item) => item.id)).size, 7);
for (const project of space.projects.items) {
  assert.ok(orientations.some((item) => item.id === project.orientationId));
  for (const field of ["title", "description", "team", "expectedResults"]) assert.ok(project[field]);
}
for (const charter of space.strategy.review.charters) assert.ok(fs.existsSync(charter.image));

globalThis.window = { CMR_DATA: { data }, location: { hostname: "zakdri.github.io" } };
let stateIndex = 0;
let stateOverride = {};
const react = { ...React, useState(initial) {
  const [value, setValue] = React.useState(initial);
  const index = stateIndex++;
  return [Object.hasOwn(stateOverride, index) ? stateOverride[index] : value, setValue];
} };
const compiled = await build({ entryPoints: ["src/sections/views/ProjetsSection.jsx"], bundle: true, write: false, platform: "node", format: "cjs", packages: "external" });
const module = { exports: {} };
const require = createRequire(import.meta.url);
new Function("require", "module", "exports", compiled.outputFiles[0].text)(name => name === "react" ? react : require(name), module, module.exports);
function render(override = {}) {
  stateIndex = 0;
  stateOverride = override;
  return renderToStaticMarkup(React.createElement(module.exports.default));
}

const vision = render();
assert.ok(vision.includes(space.intro));
assert.equal((vision.match(/class="km-navbar governance-tabbar cmr-space-tabs"/g) || []).length, 2);
assert.ok(vision.includes('class="content-card cmr-strategy-vision"'));
assert.ok(vision.includes(space.strategy.vision.statement));
assert.equal((vision.match(/<article>/g) || []).length >= 6, true);
for (const item of [...space.strategy.vision.strategicOrientations, ...space.strategy.vision.enablers]) {
  assert.ok(vision.includes(item.title));
}
assert.ok(vision.includes("Vision &amp; Orientations"));
assert.ok(vision.includes("Plan stratégique"));
for (const orientation of orientations) assert.ok(vision.includes(orientation.title));
assert.ok(vision.includes("Aucun document PDF disponible dans ce dossier."));
assert.ok(!vision.includes("Plan stratégique CMR"));
assert.ok(!vision.includes("Feuille de route des orientations"));
assert.ok(!vision.includes(space.exampleLabel));

const visionWithPdf = render({ 4: { loading: false, error: null, documents: [{ title: "Document stratégique.pdf", fileName: "Document stratégique.pdf", file: "/api/documents.php?action=download&protocolUri=pdf" }] } });
assert.ok(visionWithPdf.includes('class="cmr-strategy-pdf-frame"'));
assert.ok(visionWithPdf.includes("Document stratégique.pdf"));
assert.ok(visionWithPdf.includes("download=1"));
const projectSource = fs.readFileSync("src/sections/views/ProjetsSection.jsx", "utf8");
assert.ok(projectSource.includes('"Stratégie & Projets CMR"'));
assert.ok(projectSource.includes('"Stratégie CMR"'));
assert.ok(projectSource.includes('"Vision & Orientations"'));

const review = render({ 1: "review" });
assert.ok(review.includes("Bilan stratégique"));
assert.equal((review.match(/class="cmr-space-charter"/g) || []).length, space.strategy.review.charters.length);
assert.equal((review.match(/class="cmr-space-kpi"/g) || []).length, space.strategy.review.kpis.length);

const approach = render({ 0: "projects" });
assert.ok(approach.includes("Démarche"));
assert.equal(space.projects.approach.steps.length, 6);
assert.deepEqual(space.projects.approach.steps.map(({ title, subtitle, items }) => ({ title, subtitle, items })), [
  { title: "Je lance mon projet", subtitle: "Cadrer et démarrer le projet", items: ["Comprendre le besoin", "Définir le périmètre", "Identifier les parties prenantes", "Constituer l’équipe projet", "Cadrer le projet"] },
  { title: "Je planifie mon projet", subtitle: "Organiser l’exécution", items: ["Construire le planning", "Identifier les ressources", "Définir les jalons", "Anticiper les risques", "Valider les documents de cadrage"] },
  { title: "Je pilote mon projet", subtitle: "Assurer l’avancement", items: ["Suivre l’exécution du projet", "Coordonner les acteurs", "Gérer les risques", "Produire le reporting"] },
  { title: "Je clôture mon projet", subtitle: "Améliorer continuellement les projets", items: ["Retours d’expérience", "Bonnes pratiques", "Leçons apprises", "Facteurs de succès", "Amélioration continue"] },
  { title: "Gouvernance projet", subtitle: "Obtenir les décisions", items: ["Participer aux comités de suivi", "Présenter l’avancement", "Escalader les blocages", "Demander les arbitrages", "Suivre les décisions"] },
  { title: "Boîte à outils", subtitle: "Fournir des outils pratiques", items: ["Modèles de documents"] },
]);
assert.equal(space.projects.approach.steps[5].note, "ajouter les liens d’accès aux modèles des document : charte projet et matrice RACI,\nLien d’accès à MS Project");
assert.equal(space.projects.approach.footerText, "LA CULTURE PROJET, UN LEVIER DE PERFORMANCE COLLECTIVE");
assert.equal((approach.match(/class="cmr-space-approach-step cmr-space-approach-/g) || []).length, 6);
for (const step of space.projects.approach.steps) {
  assert.ok(approach.includes(step.title));
  assert.ok(approach.includes(step.subtitle));
  for (const item of step.items) assert.ok(approach.includes(item));
}
assert.ok(approach.includes(space.projects.approach.footerText));
assert.ok(!approach.includes(space.exampleLabel));

const projects = render({ 0: "projects", 2: "projects" });
assert.ok(projects.includes("Résultats escomptés"));
assert.equal((projects.match(/aria-pressed="/g) || []).length, space.projects.items.length);
for (const project of space.projects.items) assert.ok(projects.includes(project.title));
const filtered = render({ 0: "projects", 2: "projects", 3: "digital" });
assert.ok(filtered.includes("Refonte de l’intranet"));
assert.ok(!filtered.includes("Parcours de service usager"));
const empty = render({ 0: "projects", 2: "projects", 3: "confiance" });
assert.ok(empty.includes("Aucun projet dans cette orientation."));

console.log("PASS: strategy and projects views, seven orientations, sample media/KPI, documents, project fields and filtering.");

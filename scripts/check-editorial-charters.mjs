import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const data = read('data/rubriques/communication-interne/bundle.json').data;
const root = 'Intranet CMR/Communication interne/Communication interne';
const folder = data.communicationInterneSections.find(section => section.id === 'chartes').title;
const documentPath = `${root}/${folder}`;
const documents = ['Charte Anti-Corruption.pdf', 'Code Ethique.pdf', 'Politique Anti-Fraude.pdf', 'Procedure Conflits.pdf'].map((fileName, index) => ({
  id: `charter-${index}`, title: fileName, fileName, extension: 'pdf',
  file: `/moovapps/cmr-dashboard/ged-file/${encodeURIComponent(fileName)}?protocolUri=charter-${index}`,
  segments: [folder], folderLabel: folder,
}));
const otherDocument = { ...documents[0], id: 'note', title: 'Unrelated note.pdf', segments: ['Notes de service'] };
globalThis.window = { CMR_DATA: { data }, location: { hostname: 'cmr.intra' } };
let stateIndex = 0;
let detail = '';
let query = '';
let selectedFolder = '';
let selectedYear = 'Tous';
let requested = [];
let testState = {};
globalThis.__editorialGed = (path, options) => {
  requested.push({ path, enabled: options.enabled });
  return { documents: path === root ? [...documents, otherDocument] : documents, loading: false, error: null, ...testState };
};
const compiled = await build({
  entryPoints: ['src/sections/views/CommunicationInterneSection.jsx'],
  bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external',
  plugins: [{ name: 'mock-ged-hook', setup(build) {
    build.onLoad({ filter: /useGedDocuments\.js$/ }, () => ({
      contents: 'export const useViewActive = () => true; export const useGedDocuments = (...args) => globalThis.__editorialGed(...args);', loader: 'js',
    }));
  } }],
});
const require = createRequire(import.meta.url);
const react = { ...React, useState(initial) {
  const [value, setter] = React.useState(initial);
  const index = stateIndex++;
  return [index === 1 ? detail : index === 2 ? selectedYear : index === 3 ? query : index === 5 ? selectedFolder : value, setter];
} };
const module = { exports: {} };
new Function('require', 'module', 'exports', compiled.outputFiles[0].text)(name => name === 'react' ? react : require(name), module, module.exports);
function render(nextDetail = '', nextQuery = '', nextState = {}, nextFolder = '', nextYear = 'Tous') {
  stateIndex = 0;
  requested = [];
  detail = nextDetail;
  query = nextQuery;
  selectedFolder = nextFolder;
  selectedYear = nextYear;
  testState = nextState;
  return renderToStaticMarkup(React.createElement(module.exports.default));
}
const overview = render();
const charterCard = overview.match(/<section\b[\s\S]*?<\/section>/g).find(block => block.includes(`</div>${folder}</div>`));
assert.ok(charterCard);
assert.ok(requested.some(call => call.path === root && call.enabled));
for (const doc of documents.slice(0, 3)) assert.ok(charterCard.includes(doc.title), charterCard);
assert.ok(!charterCard.includes(documents[3].title));
assert.ok(!charterCard.includes(otherDocument.title));
assert.ok(!overview.includes('Flash institutionnel'));

const full = render('chartes');
assert.ok(requested.some(call => call.path === documentPath && call.enabled));
for (const doc of documents) assert.ok(full.includes(doc.title));
assert.ok(full.includes('Rechercher dans'));
assert.ok(!full.includes('charter-editor'));
assert.ok(!full.includes('Appliquer'));
const filtered = render('chartes', 'ethique');
assert.ok(filtered.includes(documents[1].title));
assert.ok(!filtered.includes(documents[0].title));
assert.ok(render('chartes', '', { documents: [] }).includes('Aucun contenu trouv'));
assert.ok(render('chartes', '', { documents: [], loading: true }).includes('Chargement des documents Moovapps'));
const failure = render('chartes', '', { documents: [], error: new Error('Offline') });
assert.ok(failure.includes('ne sont pas disponibles'));
assert.ok(!failure.includes('Aucun contenu trouv'));
assert.ok(render('', '', { documents: [], error: new Error('Offline') }).includes('ne sont pas disponibles'));
console.log('PASS: editorial charter GED path and enabled fetch, overview isolation, document list, search, loading/error/empty states.');

const recruitment = data.communicationInterneSections.find(section => section.id === 'recrutement');
const expectedFolders = [
  'Chef de la Division Planification et Contrôle de Gestion',
  'Chef de la Division Sécurité de l’Information',
  'Chef de Service Administration des Ressources Humaines',
  'Chef du Service Communication Externe et Coopération Internationale',
  'Chef du Service Contrôle de Gestion',
  'Chef du Service Gouvernance',
];
assert.deepEqual(recruitment.folderFilters, expectedFolders);
assert.ok(!recruitment.filterByYear);
const recruitmentDocuments = expectedFolders.map((name, index) => ({
  id: `recruitment-${index}`, title: `Avis poste ${index}.pdf`, year: index % 2 ? '2025' : '2026',
  file: `/moovapps/cmr-dashboard/ged-file/${encodeURIComponent(`Avis poste ${index}.pdf`)}?protocolUri=recruitment-${index}`,
  segments: [name], folderLabel: name,
}));
recruitmentDocuments[1].segments[0] = "Chef de la Division Securite de l'Information";
recruitmentDocuments.push({ ...recruitmentDocuments[0], id: 'nested', title: 'Liste orale.pdf', segments: [expectedFolders[0], 'Resultats'] });
recruitmentDocuments.push({ ...recruitmentDocuments[5], id: 'fallback', title: 'Decision finale.pdf', segments: undefined, folderLabel: `${expectedFolders[5]}/Resultats` });
recruitmentDocuments.push({ id: 'root', title: 'Document racine.pdf', segments: [], folderLabel: 'Recrutement' });
const recruitmentState = { documents: recruitmentDocuments };
const all = render('recrutement', '', recruitmentState);
assert.ok(requested.some(call => call.path === `${root}/Recrutement` && call.enabled));
assert.equal((all.match(/aria-pressed=/g) || []).length, 7);
assert.ok(!all.includes('>2026</button>'));
assert.ok(!all.includes('>2025</button>'));
for (const doc of recruitmentDocuments) assert.ok(all.includes(doc.title));
for (const [index, name] of expectedFolders.entries()) {
  const filtered = render('recrutement', '', recruitmentState, name, '2024');
  assert.ok(filtered.includes(recruitmentDocuments[index].title));
  for (const other of recruitmentDocuments.slice(0, 6).filter((_, otherIndex) => index !== otherIndex)) {
    assert.ok(!filtered.includes(other.title), `${name} must not include ${other.title}`);
  }
  assert.ok(!filtered.includes('Document racine.pdf'));
}
assert.ok(render('recrutement', '', recruitmentState, expectedFolders[0]).includes('Liste orale.pdf'));
assert.ok(render('recrutement', '', recruitmentState, expectedFolders[5]).includes('Decision finale.pdf'));
const searched = render('recrutement', 'orale', recruitmentState, expectedFolders[0]);
assert.ok(searched.includes('Liste orale.pdf'));
assert.ok(!searched.includes('Avis poste 0.pdf'));
assert.ok(render('recrutement', 'absent', recruitmentState, expectedFolders[0]).includes('Aucun contenu trouv'));
const manyDocuments = Array.from({ length: 12 }, (_, index) => ({ ...recruitmentDocuments[0], id: `many-${index}`, title: `Document ${index}.pdf` }));
const paginated = render('recrutement', '', { documents: manyDocuments }, expectedFolders[0]);
assert.ok(paginated.includes('cmr-document-pagination'));
assert.equal((paginated.match(/class="doc-item"/g) || []).length, 10);
const yearSection = data.communicationInterneSections.find(section => section.filterByYear);
assert.ok(yearSection);
const yearly = render(yearSection.id, '', { documents: recruitmentDocuments }, '', '2025');
assert.ok(yearly.includes('Avis poste 1.pdf'));
assert.ok(!yearly.includes('Avis poste 0.pdf'));
console.log('PASS: six recruitment folder filters, exact folder isolation, nested documents, search, pagination, and other sections year filters.');

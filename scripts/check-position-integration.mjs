import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const app = fs.readFileSync('src/legacy/app.js', 'utf8');
const data = JSON.parse(fs.readFileSync('data/rubriques/organisation-smi-culture/bundle.json', 'utf8')).data;
function findOrgNode(node, posteId) {
  if (node.posteId === posteId) return node;
  for (const child of [...(node.children || []), ...(node.hiddenChildren || []), ...(node.secondaryChildren || [])]) {
    const found = findOrgNode(child, posteId);
    if (found) return found;
  }
  return null;
}
for (const [posteId, personName, photo] of [
  ['division-planification-controle-gestion', 'Fatima KOURSS', 'fatima-kourss.jpg'],
  ['division-securite-information', 'Nabil CHIADMI', 'nabil-chiadmi.png'],
  ['pole-ressources', 'Mohamed ESSAIDI', 'mohamed-essaidi.png'],
]) {
  const node = findOrgNode(data.orgData, posteId);
  assert.equal(node?.personName, personName);
  assert.ok(node.photo.endsWith(photo));
  assert.ok(fs.existsSync(node.photo));
}
assert.equal(findOrgNode(data.orgData, 'pole-ressources').interim, true);
assert.equal(findOrgNode(data.orgData, 'pole-systeme-information-transformation-digitale').personName, 'Mohamed ESSAIDI');
const containers = { orgTree: {}, governanceOrgTree: {}, postesList: {}, postesCount: {}, postesPagination: {} };
const gedStates = new Map();
const context = vm.createContext({
  document: { getElementById: id => containers[id] },
  lucide: { createIcons() {} },
  getCmrData: (key, fallback) => data[key] ?? fallback,
  shouldUseDocumentsApi: () => true,
  GED_ROOT_PATH: 'Intranet CMR',
  joinGedPath: (...parts) => parts.join('/'),
  getGedDocumentsState: path => gedStates.get(path) || ({ documents: [] }),
  gedDocumentsState: new Map(),
  getGedFileKind: () => 'PDF',
});

function codeBetween(start, end) {
  const from = app.indexOf(start);
  const to = app.indexOf(end, from + start.length);
  assert.ok(from >= 0 && to > from, start);
  return app.slice(from, to);
}

vm.runInContext([
  codeBetween('function escapeHtml(', 'const GED_ROOT_PATH'),
  codeBetween('function normalizeGedText(', 'function normalizeGedDocument('),
  codeBetween("const orgData = getCmrData('orgData'", 'function toggleOrgChildren('),
  codeBetween('function flattenOrgNodes(', 'function openPosteDetail('),
].join('\n'), context);

const run = code => vm.runInContext(code, context);
run("renderOrgTree('orgTree', 'org'); renderOrgTree('governanceOrgTree', 'governance-org');");
for (const id of ['orgTree', 'governanceOrgTree']) {
  const html = containers[id].innerHTML;
  assert.ok(html.includes('Fatima KOURSS'));
  assert.ok(html.includes('Nabil CHIADMI'));
  assert.ok(html.includes('Par intérim'));
  const ficheIds = [...html.matchAll(/onclick="openPosteFromOrg\('([^']+)'\)"/g)].map(match => match[1]);
  assert.equal(ficheIds.length, 78, `${id}: every fiche is reachable`);
  assert.equal(new Set(ficheIds).size, 78);
  assert.ok(!ficheIds.includes('dg'));
  assert.ok(!ficheIds.includes('secretariat-general'));
  assert.deepEqual(new Set(ficheIds), new Set(data.postesData.map(poste => poste.id)));
}
const allIds = [...(containers.orgTree.innerHTML + containers.governanceOrgTree.innerHTML).matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(allIds).size, allIds.length, 'Independent chart identifiers');

run("renderPostesList('');");
assert.match(containers.postesCount.textContent, /80 postes/);
assert.equal((containers.postesList.innerHTML.match(/data-poste-id=/g) || []).length, 6);
assert.match(containers.postesPagination.innerHTML, /sur 14/);
for (const id of ['dg', 'secretariat-general']) {
  assert.match(containers.postesList.innerHTML, new RegExp(`data-poste-id="${id}" disabled`));
  assert.ok(!containers.postesList.innerHTML.includes(`onclick="openPosteDetail('${id}'`));
}
run("searchPostes('Data Lab');");
assert.match(containers.postesCount.textContent, /1 poste/);
assert.match(containers.postesList.innerHTML, /Data Lab/);

for (const poste of data.postesData) {
  context.testPoste = poste;
  const html = run('buildPosteDetailHtml(testPoste.id)');
  for (const text of [...poste.missions, ...poste.competences]) {
    context.testText = text;
    assert.ok(html.includes(run('escapeHtml(testText)')), `${poste.id}: complete manual text`);
  }
  assert.ok(!html.includes('>Profil<'));
  assert.ok(html.includes('Pièces jointes'));
  // Arbitrary filenames must resolve from either the reference title or the manual alias.
  for (const folderTitle of [poste.titre, ...poste.folderAliases]) {
    context.testFolder = folderTitle;
    const matches = run(`
      postesGedDocuments = [
        { segments: ['Fiches et fonctions de postes', testFolder], file: '/api/download?id=1', fileName: 'document-sans-nom-de-personne.pdf' },
        { segments: ['Fiches et fonctions de postes', 'Autre fonction'], file: '/api/download?id=2', fileName: 'autre.pdf' }
      ];
      getPosteAttachments(testPoste);
    `);
    assert.equal(matches.length, 1, `${poste.id}: correct folder`);
    assert.equal(matches[0].file, '/api/download?id=1');
  }
}
const integrationPoste = data.postesData.find(poste => poste.id === 'chef-de-service-developpement-et-integration');
context.testPoste = integrationPoste;
const integrationFolderPath = run('getPosteGedFolderPath(testPoste)');
assert.equal(
  integrationFolderPath,
  "Intranet CMR/Organisation & RSE/Organisation/Fiches et fonctions de postes/Pôle Système d'Information et Transformation Digitale/Division Étude et Développement/CHef de Service développement et intégration",
);
gedStates.set(integrationFolderPath, { documents: [{ segments: [], file: '/api/download?id=integration', fileName: 'fiche-arbitraire.pdf' }] });
const directMatches = run('getPosteAttachments(testPoste)');
assert.equal(directMatches.length, 1);
assert.equal(directMatches[0].file, '/api/download?id=integration');

const clientsPoste = data.postesData.find(poste => poste.id === 'pole-clients');
context.testPoste = clientsPoste;
const clientsFolderPath = run('getPosteGedFolderPath(testPoste)');
gedStates.set(clientsFolderPath, {
  documents: [
    { segments: [], file: '/api/download?id=pole-clients', fileName: 'Chef de Pôle Clients.pdf' },
    { segments: ['Division Expérience Clients'], file: '/api/download?id=division-clients', fileName: 'Chef de Division Expérience Clients.pdf' },
    { segments: ['Division Expérience Clients', 'Chef de Service Écoute Clients et Partenariats'], file: '/api/download?id=service-clients', fileName: 'Chef de Service Écoute Clients et Partenariats.pdf' },
  ],
});
const clientsMatches = run('getPosteAttachments(testPoste)');
assert.deepEqual(clientsMatches.map(item => item.file), ['/api/download?id=pole-clients']);
assert.equal(run("buildPosteDetailHtml('dg')"), '');
assert.equal(run("buildPosteDetailHtml('secretariat-general')"), '');
assert.ok(run("buildPosteDetailHtml('pole-ressources')").includes('Par intérim'));
console.log('PASS: 78 complete fiches, both charts, unique IDs, pagination/search, no DG/SG fiche, isolated folder-based attachments.');

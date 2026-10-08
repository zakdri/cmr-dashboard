import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const data = Object.assign({}, ...read('data/cmr-data.json').modules.map(module => read(`data/${module.bundle}`).data));
const platformConfig = read('public/config/platform-config.json');
const app = fs.readFileSync('src/legacy/app.js', 'utf8');
const css = fs.readFileSync('css/styles.css', 'utf8');
const governanceSource = fs.readFileSync('src/sections/views/GouvernanceSection.jsx', 'utf8');
const institutionnelSource = fs.readFileSync('src/sections/views/InstitutionnelSection.jsx', 'utf8');
assert.equal(data.referentiels.length, 24);
assert.deepEqual(data.referentiels.slice(0, 3).map(item => item.dossier), [
  'Procédures SMI',
  'Processus Accueil et Réclamations',
  'Processus Actuarielles et techniques',
]);
assert.equal(data.referentiels.at(-1).dossier, 'Processus Partenariat et Coopération');
assert.match(app, /'Organisation & RSE', 'Organisation', 'Manuels des procédures'/);
assert.match(app, /foldersPaginationKey = 'organisation-referentiel-folders'/);
assert.match(
  app,
  /publications:\s*['"]Articles & bilans['"]/,
  'La rubrique KM Articles / bilans doit lire directement le dossier GED Articles & bilans.'
);
function between(start, end) {
  const from = app.indexOf(start);
  const to = app.indexOf(end, from + start.length);
  assert.ok(from >= 0 && to > from, start);
  return app.slice(from, to);
}

assert.deepEqual(data.actuData.map(article => article.id), [1, 2, 3]);
for (const article of data.actuData) {
  assert.ok(fs.existsSync(article.image), article.image);
  assert.ok(article.content.length > 0);
}
const contractProgrammeArticle = data.actuData.find(article => article.id === 1);
assert.match(contractProgrammeArticle.title, /2025-2027$/);
assert.match(contractProgrammeArticle.content[0], /période 2025-2027/);
assert.ok(contractProgrammeArticle.tags.includes('2025-2027'));
assert.doesNotMatch(JSON.stringify(data.dashboardNews), /2026-2028/);
assert.deepEqual(data.actuData.slice(0, 2).map(article => article.date), ['12/01/2026', '12/01/2026']);
assert.ok(data.dashboardNews.miniItems.slice(0, 2).every(item => item.meta.endsWith('12/01/2026')));
const displayedNews = [...data.dashboardNews.slides, ...data.dashboardNews.miniItems];
assert.deepEqual(data.vieSocialeEvents.map(item => item.title), [
  'Collecte solidaire',
  'Rabat Run',
  'Octobre Rose',
]);
assert.deepEqual(data.vieSocialeEvents.map(item => item.dateLabel), [
  '10 Septembre 2026',
  '18 Mai 2025',
  'Du 1er octobre au 31 octobre',
]);
assert.deepEqual(data.vieSocialeGallery, []);
assert.equal(data.vieSocialeIntro.title, 'Bienvenue dans l’espace Vie Sociale de la CMR');
assert.equal(data.vieSocialeIntro.paragraphs.length, 4);
assert.equal(data.vieSocialeIntro.highlight, 'Ensemble, faisons vivre la convivialité, la solidarité et l’esprit d’équipe au sein de la CMR.');
assert.equal(data.academyPages.onboarding.daysTitle, 'Journées OnBoarding');
assert.equal(data.academyPages.onboarding.daysDescription, "Journées d'intégration des nouveaux collaborateurs");
assert.deepEqual(data.academyPages.onboarding.days, []);
assert.equal(data.academyPages.onboarding.galleryByYear, undefined);
assert.equal(data.academyPages.onboarding.galleryTitle, 'Galerie OnBoarding');
assert.equal(data.academyPages.levelup.filterTitle, 'Thèmes');
assert.equal(data.academyPages.levelup.showThemeFilter, false);
assert.equal(data.academyPages.levelup.themeFilterTitle, undefined);
const academySource = fs.readFileSync('src/sections/views/AcademySection.jsx', 'utf8');
const communicationSource = fs.readFileSync('src/sections/views/CommunicationInterneSection.jsx', 'utf8');
assert.match(academySource, /normalizeGedKey\(segment\) === "journees onboarding"/);
assert.match(academySource, /normalizeGedKey\(segment\) === "image a la une"/);
assert.match(academySource, /foldersBelowDay\.length === 0/);
assert.match(academySource, /galleryYears = allDays\.filter\(\(day\) => \/\^\\d\{4\}\$\//);
assert.match(academySource, /!page\.horizontalFilter && page\.showThemeFilter !== false/);
assert.match(academySource, /selectedDayTitle, setSelectedDayTitle\] = useState\(""\)/);
assert.match(academySource, /days\.find\(\(day\) => day\.title === selectedDayTitle\) \|\| \{\}/);
assert.match(academySource, /function AcademyImageItem[\s\S]*?<img src=\{item\.file\}/);
assert.match(academySource, /if \(isImage\) return <AcademyImageItem item=\{item\}/);
assert.match(css, /\.academy-content-media img\s*\{[^}]*object-fit:\s*contain/s);
assert.match(academySource, /function AcademyImagePreview[\s\S]*?Image précédente[\s\S]*?Image suivante/);
assert.match(academySource, /mentorPreviewIndex[\s\S]*?mentoringImages/);
assert.match(css, /\.academy-content-media-trigger\s*\{[^}]*cursor:\s*zoom-in/s);
assert.match(communicationSource, /className="communication-lightbox"[\s\S]*?showPrevious[\s\S]*?showNext/);
assert.match(communicationSource, /event\.key === "ArrowLeft"[\s\S]*?event\.key === "ArrowRight"/);
assert.match(css, /\.communication-lightbox-stage > img\s*\{[^}]*object-fit:\s*contain/s);
assert.match(app, /function switchOrgGovCultureCommunicationMode\(mode\)/);
assert.match(app, /Documentation QSE - RSE[\s\S]*?Galerie QSE - RSE/);
assert.match(app, /qse-communication-gallery[\s\S]*?<img src=/);
assert.match(css, /\.qse-communication-gallery\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s);
assert.match(css, /#actu-detail-panel\s*\{[^}]*max-width:\s*980px[^}]*margin-inline:\s*auto/s);
assert.match(css, /#actu-detail-panel \.actu-detail-card\s*\{[^}]*width:\s*100%[^}]*max-width:\s*none/s);
assert.match(css, /\.vie-sociale-intro\s*\{[^}]*background:\s*#fff[^}]*border-radius:\s*8px/s);
assert.match(css, /\.vie-sociale-intro-toggle\s*\{[^}]*justify-content:\s*flex-start[^}]*gap:\s*8px/s);
const vieSocialeSource = fs.readFileSync('src/sections/views/VieSocialeSection.jsx', 'utf8');
assert.match(vieSocialeSource, /GED_ROOT_PATH,[\s\S]*?"Vie Sociale",[\s\S]*?"Galerie Vie Sociale"/);
assert.match(vieSocialeSource, /galleryState\.documents[\s\S]*?IMAGE_EXTENSIONS/);
const expectedNewsOrder = [data.actuData[1], data.actuData[0], data.actuData[2]];
assert.deepEqual(data.dashboardNews.miniItems.map(item => item.title), expectedNewsOrder.map(item => item.title));
for (const [index, item] of data.dashboardNews.miniItems.entries()) {
  assert.equal(item.handler, `goToActualites(${expectedNewsOrder[index].id}); return false;`);
  assert.equal(item.image, expectedNewsOrder[index].image);
}
assert.match(app, /actualitesDisplayOrder = new Map\(\[\[2, 0\], \[1, 1\]\]\)/);
assert.deepEqual(new Set(displayedNews.map(item => item.title)), new Set(data.actuData.map(item => item.title)));
assert.equal(data.dashboardRightSidebar.quote.text, '« Seul, on va plus vite, ensemble, on va plus loin. »');
assert.deepEqual(data.dashboardRightSidebar.agenda.cmrItems.map(item => item.date), ['2026-02-11', '2026-02-12', '2026-02-13', '2026-03-08']);
const expectedFlashTexts = [
  "De nouvelles bornes d'information arrivent dans nos espaces صلة",
  'Découvrez le nouvel intranet de la CMR',
  'نبسط المساطر من أجل مرتفقينا، الدورية رقم 8/2026',
  'SMACAF Accéder au support de sensibilisation',
];
assert.deepEqual(data.cmrNewsItems.map(item => item.text), expectedFlashTexts);
assert.deepEqual(data.cmrNewsItems.map(item => item.id), [
  'bornes-information-sila',
  'nouvel-intranet-cmr',
  'simplification-procedures-8-2026',
  'smacaf-support-sensibilisation',
]);
const flashSection = data.communicationInterneSections.find(section => section.id === 'flash-info');
const legalPositionsSection = data.communicationInterneSections.find(section => section.id === 'notes-juridiques');
assert.equal(legalPositionsSection.status, undefined);
assert.deepEqual(flashSection.items.map(item => item.title), expectedFlashTexts);
assert.equal(data.communicationInterneCards.find(card => card.icon === 'zap').items.length, 4);
assert.equal(data.dashboardRightSidebar.flashInfo.subject, data.cmrNewsItems[0].text);
const tickerModal = { active: false };
tickerModal.classList = { add() { tickerModal.active = true; }, remove() { tickerModal.active = false; } };
const tickerNodes = {
  tickerDetailModal: tickerModal,
  tickerDetailHeading: {},
  tickerDetailSubtitle: {},
  tickerDetailBody: {},
  tickerDetailMedia: { style: {} },
  tickerDetailImage: { removeAttribute(attribute) { delete this[attribute]; } },
  tickerDetailImageTitle: {},
};
const tickerGedImages = [
  { fileName: 'SMACAF.jpg', title: 'SMACAF.jpg', file: '/ged/smacaf.jpg' },
  { fileName: 'المنشور رقم 8-2026.jpg', title: 'المنشور رقم 8-2026.jpg', file: '/ged/circulaire-8-2026.jpg' },
];
const tickerContext = vm.createContext({
  cmrNewsItems: data.cmrNewsItems,
  document: { getElementById: id => tickerNodes[id] },
  window: {},
  lucide: { createIcons() {} },
  GED_ROOT_PATH: 'Intranet CMR',
  joinGedPath: (...parts) => parts.join('/'),
  shouldUseDocumentsApi: () => true,
  fetchGedDocuments: async () => tickerGedImages,
});
vm.runInContext(between('const FLASH_INFO_IMAGE_EXTENSIONS', 'async function goToFlashDetailFromModal('), tickerContext);
await vm.runInContext("openTickerDetail('nouvel-intranet-cmr')", tickerContext);
assert.equal(tickerModal.active, true);
assert.equal(
  tickerNodes.tickerDetailBody.textContent,
  data.cmrNewsItems.find(item => item.id === 'nouvel-intranet-cmr').text,
);
assert.equal(tickerNodes.tickerDetailMedia.style.display, 'none');
await vm.runInContext("openTickerDetail('smacaf-support-sensibilisation')", tickerContext);
assert.equal(tickerNodes.tickerDetailImage.src, '/ged/smacaf.jpg');
assert.equal(tickerNodes.tickerDetailMedia.style.display, 'grid');
assert.equal(tickerNodes.tickerDetailImageTitle.textContent, expectedFlashTexts[3]);
await vm.runInContext("openTickerDetail('simplification-procedures-8-2026')", tickerContext);
assert.equal(tickerNodes.tickerDetailImage.src, '/ged/circulaire-8-2026.jpg');
vm.runInContext('closeTickerDetailModal()', tickerContext);
assert.equal(tickerModal.active, false);
const tickerWrapper = { innerHTML: '' };
const populateContext = vm.createContext({
  cmrNewsItems: data.cmrNewsItems,
  document: { getElementById: () => tickerWrapper },
  escapeHtml: value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;'),
});
vm.runInContext(between('function shuffleArray(', '// Initialize ticker after'), populateContext);
for (let pass = 0; pass < 2; pass++) {
  vm.runInContext('populateTicker()', populateContext);
  assert.equal((tickerWrapper.innerHTML.match(/class="ticker-item"/g) || []).length, 4);
  for (const item of data.cmrNewsItems) assert.ok(tickerWrapper.innerHTML.includes(`data-news-id="${item.id}"`));
}
const tickerStyles = fs.readFileSync('css/styles.css', 'utf8');
assert.equal((tickerStyles.match(/animation: ticker 12s linear infinite/g) || []).length, 2);
assert.ok(!tickerStyles.includes('animation: ticker 60s'));

const expectedApps = [
  ['ERSAL', 'externalLinks.ersal.url', 'Métiers'],
  ['OPEN TEXT', 'externalLinks.openText.url', 'Outils Collaboratifs'],
  ['BPM MOOVAPS', 'externalLinks.bpmMoovapps.url', 'Organisation'],
  ['CRM', 'externalLinks.crm.url', 'Métiers'],
  ['ATTAKMILI', 'externalLinks.attakmili.url', 'Métiers'],
  ['INFIRMITE', 'externalLinks.infirmite.url', 'Métiers'],
  ['HELPDESK', 'externalLinks.helpdesk.url', 'Support & IT'],
  ['PORTAIL', 'externalLinks.portailCmr.url', 'Métiers'],
  ['PWA (PROJETS)', 'externalLinks.pwa.url', 'Pilotage'],
  ['GESTION DE PRESENCE', 'externalLinks.gestionPresence.url', 'Ressources Humaines'],
  ['FILE D’ATTENTE RABAT', 'externalLinks.filesAttente.rabat.url', 'Métiers'],
  ['FILE D’ATTENTE CASABLANCA', 'externalLinks.filesAttente.casablanca.url', 'Métiers'],
  ['FILE D’ATTENTE TETOUAN', 'externalLinks.filesAttente.tetouan.url', 'Métiers'],
  ['FILE D’ATTENTE OUJDA', 'externalLinks.filesAttente.oujda.url', 'Métiers'],
  ['FILE D’ATTENTE ERRACHIDIA', 'externalLinks.filesAttente.errachidia.url', 'Métiers'],
  ['FILE D’ATTENTE FES', 'externalLinks.filesAttente.fes.url', 'Métiers'],
  ['FILE D’ATTENTE MARRAKECH', 'externalLinks.filesAttente.marrakech.url', 'Métiers'],
  ['FILE D’ATTENTE AGADIR', 'externalLinks.filesAttente.agadir.url', 'Métiers'],
  ['FILE D’ATTENTE LAAYOUNE', 'externalLinks.filesAttente.laayoune.url', 'Métiers'],
  ['FILE D’ATTENTE BENI MELLAL', 'externalLinks.filesAttente.beniMellal.url', 'Métiers'],
  ['FILE D’ATTENTE SALE', 'externalLinks.filesAttente.sale.url', 'Métiers'],
];
for (const [title, configKey, domain] of expectedApps) {
  const matches = data.applicationsCategories.flatMap(category => category.items.filter(item => item.title === title).map(item => ({ ...item, domain: category.title })));
  assert.equal(matches.length, 1, title);
  assert.equal(matches[0].configKey, configKey, title);
  assert.equal(matches[0].domain, domain, title);
  assert.ok(matches[0].icon, title);
}

// Execute the quick-access handlers and actual tab-switching code.
const nodes = Object.fromEntries(data.rhTabs.map(tab => [`page-rh-${tab.id}`, { style: { display: 'none' } }]));
const navItems = data.rhTabs.map(tab => ({ id: tab.id, active: false, classList: { remove() {}, add() {} } }));
const nav = {
  querySelectorAll: () => navItems.map(item => ({ classList: { remove() { item.active = false; } } })),
  querySelector: selector => {
    const item = navItems.find(item => selector.includes(`"${item.id}"`));
    return item && { classList: { add() { item.active = true; } } };
  },
};
const context = vm.createContext({
  submenuSelections: { rh: null },
  document: { getElementById: id => nodes[id], querySelector: () => nav },
  window: { dispatchEvent(event) { context.lastTabEvent = event.detail.tab; } },
  CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
  hideSidebarSubmenu() {},
  switchView(id) { context.activeView = id; vm.runInContext('switchRhPageTab(submenuSelections.rh)', context); },
});
vm.runInContext(between('function openSubmenuView(', 'function applySubmenuSelection(') + between('function switchRhPageTab(', '// ORGANISATION & GOUVERNANCE'), context);
for (const [label, tab] of [['Demande de mobilité', 'mobilite'], ['Demande de formation', 'formation']]) {
  const item = data.dashboardQuickAccess.items.find(item => item.label === label);
  assert.ok(item);
  vm.runInContext(`(function(){ ${item.handler} })()`, context);
  assert.equal(context.activeView, 'rh');
  assert.equal(context.submenuSelections.rh, tab);
  assert.equal(context.lastTabEvent, tab);
  assert.equal(nodes[`page-rh-${tab}`].style.display, 'block');
  assert.equal(navItems.find(item => item.id === tab).active, true);
  assert.equal(Object.values(nodes).filter(item => item.style.display === 'block').length, 1);
}
// Render the affected React views without contacting any intranet service.
globalThis.window = { CMR_DATA: { data }, CMR_PLATFORM_CONFIG: platformConfig, location: { hostname: 'zakdri.github.io', origin: 'https://zakdri.github.io' }, localStorage: { getItem: () => JSON.stringify(['Mobilité spontanée', 'Formation spontanée', 'HelpDesk', 'Réservation de salles']) } };
globalThis.document = { getElementById: () => null };
const compiled = await build({
  stdin: { contents: ['Dashboard', 'Academy', 'Rh', 'Applis', 'Innovation', 'CommunicationInterne'].map(name => `export { default as ${name} } from './src/sections/views/${name}Section.jsx';`).join('\n') + "\nexport { default as Modals } from './src/components/layout/ModalsTemplate.jsx';", resolveDir: process.cwd(), loader: 'js' },
  bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external',
});
const module = { exports: {} };
new Function('require', 'module', 'exports', compiled.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const html = Object.fromEntries(Object.entries(module.exports).map(([name, Component]) => [name, renderToStaticMarkup(React.createElement(Component))]));
for (const text of expectedFlashTexts) {
  const renderedText = text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;');
  assert.ok(html.CommunicationInterne.includes(renderedText));
}
const flashModalHtml = html.Modals.slice(html.Modals.indexOf('id="tickerDetailModal"'), html.Modals.indexOf('id="pdfPreviewModal"'));
assert.ok(flashModalHtml.includes('id="tickerDetailBody"'));
assert.ok(flashModalHtml.includes('id="tickerDetailImage"'));
assert.ok(flashModalHtml.includes('id="tickerDetailImageTitle"'));
assert.match(app, /function renderFlashDetailPage\([\s\S]*?actu-detail-title[\s\S]*?matchedImage/);
assert.match(app, /async function goToFlashDetailFromModal\([\s\S]*?Flash Infos[\s\S]*?findFlashInfoImage/);
assert.match(fs.readFileSync('src/sections/views/CommunicationInterneSection.jsx', 'utf8'), /openCommFlashDetail/);
assert.ok(flashModalHtml.includes('aria-label="Fermer la fenêtre"'));
assert.ok(!flashModalHtml.includes('Consulter'));
assert.ok(!flashModalHtml.includes('consent-modal-footer'));
assert.equal((html.Dashboard.match(/class="news-item-mini"/g) || []).length, 3);
assert.ok(html.Dashboard.includes('class="ticker-viewport"'));
assert.ok(!html.Dashboard.includes('Indicateurs RH'));
assert.ok(!html.Dashboard.includes('Statistiques'));
assert.ok(!html.Dashboard.includes('Réservation de salles'));
assert.ok(!html.Dashboard.includes('>Gouvernance<'));
assert.ok(!html.Dashboard.includes('>Capital Idées<'));
assert.ok(!html.Dashboard.includes('>Annuaire<'));
assert.equal(data.dashboardCards.find(card => card.title === 'Vie RH').source, 'rhRecentDocuments');
assert.match(fs.readFileSync('src/sections/views/DashboardSection.jsx', 'utf8'), /function buildRhRecentDashboardItems[\s\S]*?updatedAt \|\| latest\.createdAt/);
assert.ok(html.Dashboard.includes('Demande de formation'));
assert.ok(html.Dashboard.includes('Demande de mobilité'));
assert.ok(html.Dashboard.includes('href="http://pc/"'));
assert.equal((html.Academy.match(/Rubrique en cours d’alimentation\./g) || []).length, 2);
assert.ok(!data.academyHeader.underConstruction);
for (const tab of data.academyTabs) {
  assert.ok(html.Academy.includes(`id="page-academy-${tab.id}"`));
  assert.equal(Boolean(tab.underConstruction), ['talent', 'click'].includes(tab.id));
}
assert.ok(html.Academy.includes('Circuit de validation'));
for (const item of data.academyPages.formation.workflows) assert.ok(html.Academy.includes(item.title));
assert.ok(!html.Academy.includes("Journée d'intégration Siège"));
assert.ok(!html.Academy.includes('Découverte des métiers'));
assert.ok(html.Academy.includes('Rechercher un contenu Level Up...'));
const academyPanels = Object.fromEntries(data.academyTabs.map(tab => [`page-academy-${tab.id}`, { style: { display: 'none' } }]));
const academyContext = vm.createContext({ document: { getElementById: id => academyPanels[id] }, event: null });
vm.runInContext(between('function switchAcademyPageTab(', '// RH PAGE TAB LOGIC'), academyContext);
for (const tab of data.academyTabs) {
  vm.runInContext(`switchAcademyPageTab(${JSON.stringify(tab.id)})`, academyContext);
  assert.equal(academyPanels[`page-academy-${tab.id}`].style.display, 'block');
  assert.equal(Object.values(academyPanels).filter(panel => panel.style.display === 'block').length, 1);
}
assert.ok(html.Rh.includes('id="page-rh-formation"'));
assert.ok(html.Rh.includes('Documents RH'));
assert.ok(html.Rh.includes('<h3>Chartes</h3>'));
assert.ok(!html.Rh.includes('Chartes RH'));
assert.equal(data.rhTabs.find(tab => tab.id === 'documents').label, 'Documents RH');
assert.equal(data.sidebarSubmenus.rh.items.find(item => item.tab === 'documents').label, 'Documents RH');
assert.equal(data.rhTabs.some(tab => tab.id === 'indicateurs'), false);
assert.equal(data.sidebarSubmenus.rh.items.some(item => item.tab === 'indicateurs'), false);
assert.ok(!html.Rh.includes('id="page-rh-indicateurs"'));
assert.equal(data.rhPages.indicateurs, undefined);
assert.equal(data.rhPages.enquetes.indicators.length, 10);
assert.equal(data.rhPages.enquetes.responses, 289);
assert.equal(data.rhPages.enquetes.population, 403);
assert.equal(data.rhPages.enquetes.participation, '72 %');
assert.equal(data.rhPages.enquetes.kpis, undefined);
assert.deepEqual(data.rhPages.enquetes.summary.map(item => item.value), ['79 %', '89 %', '86 %']);
assert.equal((html.Rh.match(/class="content-card rh-indicator-card"/g) || []).length, 10);
assert.match(css, /\.rh-indicators-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/s);
assert.match(css, /\.innovation-project-cover-scroll\s*\{[^}]*width:\s*min\(100%,\s*1078px\)[^}]*margin-inline:\s*auto/s);
assert.match(css, /\.innovation-project-detail-body\s*\{[^}]*width:\s*min\(100%,\s*1078px\)[^}]*margin-inline:\s*auto/s);
for (const item of data.rhPages.enquetes.indicators) {
  assert.ok(html.Rh.includes(item.title));
  assert.ok(html.Rh.includes(item.value));
}
assert.ok(html.Innovation.includes('Synthèse du projet'));
assert.ok(html.Innovation.includes('<textarea id="projectSummary"'));
assert.ok(html.Innovation.includes('<textarea id="projectObjective"'));
assert.ok(html.Innovation.includes('<textarea id="projectTeam"'));
assert.ok(html.Innovation.includes('<textarea id="projectInsights"'));
assert.ok(html.Innovation.includes('<input id="projectTitle"'));
assert.ok(html.Innovation.includes('<input id="projectMentor"'));
assert.ok(html.Innovation.includes('id="cmrInnovTitle"'));
assert.ok(html.Innovation.includes('id="cmrInnovImage"'));
assert.ok(html.Innovation.includes('id="cmrInnovDescription"'));
for (const removedId of ['cmrInnovTheme', 'cmrInnovStart', 'cmrInnovEnd', 'cmrInnovDocs']) {
  assert.ok(!html.Innovation.includes(`id="${removedId}"`));
}
const platformClient = fs.readFileSync('src/services/moovappsPlatform.js', 'utf8');
const cmrInnovApi = platformClient.slice(
  platformClient.indexOf('"cmr-innov": {'),
  platformClient.indexOf('"project-idea": {'),
);
assert.ok(cmrInnovApi.includes('id: "512002"'));
assert.ok(cmrInnovApi.includes('viewId: "513704"'));
assert.ok(cmrInnovApi.includes('required: ["sys_Title", "Description"]'));
assert.ok(cmrInnovApi.includes('fields: ["sys_Title", "Description"]'));
assert.ok(cmrInnovApi.includes('files: { image: "Image" }'));
assert.ok(!cmrInnovApi.includes('Theme'));
assert.ok(!cmrInnovApi.includes('Periode'));
assert.ok(!cmrInnovApi.includes('SupportsDocumentaires'));
const projectIdeaApi = platformClient.slice(
  platformClient.indexOf('"project-idea": {'),
  platformClient.indexOf('event: {'),
);
assert.ok(projectIdeaApi.includes('id: "512282"'));
assert.ok(projectIdeaApi.includes('viewId: "513770"'));
assert.ok(projectIdeaApi.includes('required: ["sys_Title", "Theme"]'));
assert.ok(projectIdeaApi.includes('fields: ["sys_Title", "Theme", "Periode"]'));
assert.ok(projectIdeaApi.includes('files: { image: "ImageIllustrative", documents: "SupportsDocumentaires" }'));
assert.ok(!app.includes('innovationCmrInnovThemeOptions'));
assert.ok(app.includes("getCmrData('innovationProjectIdeaThemeOptions', [])"));
assert.deepEqual(data.innovationProjectIdeaThemeOptions, [
  'RSE',
  'Technologie',
  'Excellence Opérationnelle',
  'Expérience client',
  'Expérience collaborateur',
  'Transformation managériale',
]);
assert.ok(app.includes("const projectIdeaFields = ['Theme', 'Periode', 'ImageIllustrative', 'SupportsDocumentaires']"));
assert.ok(app.includes("const cmrInnovFields = ['Description', 'Image']"));
assert.match(app, /getWorkflowViewItems\(payload\)\s*\.filter\(item => innovationViewItemMatchesSpace\(space, item\)\)/);
assert.match(app, /function renderInnovationProjectIdeaDetail\(\)[\s\S]*?<h3>Thème<\/h3>[\s\S]*?project\.theme[\s\S]*?<h3>Période<\/h3>[\s\S]*?project\.period[\s\S]*?renderInnovationAttachments\(project\.documents\)/);
const innovationSchema = vm.createContext({});
vm.runInContext(between('function innovationViewItemMatchesSpace(', 'function innovationFileEntries('), innovationSchema);
const cmrInnovRecord = { sys_Title: 'Innov', Description: 'Description CMR Innov', Image: [{ downloadReference: 'cmr-image' }] };
const projectIdeaRecord = { sys_Title: 'Projet idée', Theme: 'RSE', Periode: { startDate: '2026-01-01' }, ImageIllustrative: [{ downloadReference: 'idea-image' }] };
assert.equal(vm.runInContext('innovationViewItemMatchesSpace("cmr-innov", record)', vm.createContext({ ...innovationSchema, record: cmrInnovRecord })), true);
assert.equal(vm.runInContext('innovationViewItemMatchesSpace("cmr-innov", record)', vm.createContext({ ...innovationSchema, record: projectIdeaRecord })), false);
assert.equal(vm.runInContext('innovationViewItemMatchesSpace("project-idea", record)', vm.createContext({ ...innovationSchema, record: projectIdeaRecord })), true);
assert.equal(vm.runInContext('innovationViewItemMatchesSpace("project-idea", record)', vm.createContext({ ...innovationSchema, record: cmrInnovRecord })), false);
assert.ok(html.Innovation.includes('id="projectObjective"'));
assert.ok(governanceSource.includes('"Système de gouvernance", "Conseil d\'administration"'));
assert.ok(governanceSource.includes('"Règlement Intérieur CA"'));
for (const [, href] of expectedApps) assert.ok(html.Applis.includes(href));

// Moovapps availability must never hide the SMI roles or governance text.
const smiNodes = { orgGovSmiPilotage: {}, orgGovSmiGovernance: {} };
const smi = vm.createContext({
  document: { getElementById: id => smiNodes[id] },
  orgGovSmiPilotageRoles: data.orgGovSmiPilotageRoles,
  orgGovSmiPilotageRole: null,
  orgGovSmiGovernanceInstances: data.orgGovSmiGovernanceInstances,
  orgGovSmiGovernanceInstance: null,
  GED_ROOT_PATH: 'Intranet CMR', joinGedPath: (...parts) => parts.join('/'),
  shouldUseSmiDocumentsApi: () => true,
  getGedDocumentsState: () => smi.state,
  renderGedLoading: () => 'LOADING', renderGedError: () => 'ERROR', renderGedEmpty: () => 'EMPTY',
  renderGedDocItem: item => `<a href="${item.file}">${item.fileName}</a>`,
  lucide: { createIcons() {} },
});
vm.runInContext(between('function normalizeGedText(', 'function normalizeGedDocument(') + between('function renderOrgGovSmiReferenceAttachments(', 'function renderOrgGovSmiCertification('), smi);
for (const state of [
  { documents: [], loading: true, loaded: false },
  { documents: [], error: new Error('Unavailable') },
  { documents: [], loaded: true },
  { documents: [{ fileName: 'Liste_Nominative_Pilotes_Processus.pdf', file: '/ged/pilotes' }, { fileName: 'PV_Revue_Direction.pdf', file: '/ged/revue' }], loaded: true },
]) {
  smi.state = state;
  vm.runInContext('renderOrgGovSmiPilotage(); renderOrgGovSmiGovernance();', smi);
  assert.ok(smiNodes.orgGovSmiPilotage.innerHTML.includes('Responsabilités'));
  assert.ok(smiNodes.orgGovSmiPilotage.innerHTML.includes(data.orgGovSmiPilotageRoles[0].authority));
  assert.ok(smiNodes.orgGovSmiGovernance.innerHTML.includes(data.orgGovSmiGovernanceInstances[0].missions));
}
assert.ok(smiNodes.orgGovSmiPilotage.innerHTML.includes('/ged/pilotes'));
assert.ok(smiNodes.orgGovSmiGovernance.innerHTML.includes('/ged/revue'));
const kmRexSource = read('data/rubriques/knowledge-management/sous-rubriques/retours-experience.json');
const kmContributionsSource = read('data/rubriques/knowledge-management/sous-rubriques/contributions.json');
const kmCommunitiesSource = read('data/rubriques/knowledge-management/sous-rubriques/communautes-et-discussions.json');
const homeKmSource = read('data/rubriques/accueil/cartes/knowledge-management.json');
assert.deepEqual(kmRexSource.data.kmRexData, []);
assert.deepEqual(kmContributionsSource.data.kmContribData, []);
assert.deepEqual(kmCommunitiesSource.data.kmCommunautes, []);
assert.deepEqual(kmCommunitiesSource.data.kmThreads, []);
assert.deepEqual(homeKmSource.data.dashboardCards[0].tabs.find(tab => tab.id === 'rex')?.items, []);
assert.match(app, /rex:\s*'REX'/);
assert.match(app, /contributions:\s*'Contributions'/);
assert.match(app, /getGedDocumentsState\(joinGedPath\(GED_ROOT_PATH, gedViewPathMap\.km, gedKmPathMap\.rex\), renderKmRex\)/);
assert.match(app, /getGedDocumentsState\(joinGedPath\(GED_ROOT_PATH, gedViewPathMap\.km, gedKmPathMap\.contributions\), renderKmContributions\)/);
assert.doesNotMatch(JSON.stringify(kmRexSource), /Refonte intranet|Processus tickets IT/);
assert.doesNotMatch(JSON.stringify(kmContributionsSource), /doublons GED|PV comité/);
assert.doesNotMatch(JSON.stringify(kmCommunitiesSource), /Communauté BI|Communauté RH|Power BI|Mobilité interne|nommage datasets/);
const directionMessageSource = read('data/rubriques/organisation-smi-culture/sous-rubriques/mot-de-la-direction.json');
assert.deepEqual(directionMessageSource.data.orgGovPages.direction, { enabled: false });
assert.doesNotMatch(institutionnelSource, /Point d’étape sur la feuille de route 2026|Télécharger la note|Voir l’actualité liée/);
const cultureQuizSource = read('data/rubriques/organisation-smi-culture/sous-rubriques/quiz-auto-evaluation-qse-rse.json');
const achatsCpsSource = read('data/rubriques/achats/sous-rubriques/bibliotheque-cps.json');
assert.deepEqual(cultureQuizSource.data.orgGovCultureQuizzes, []);
assert.deepEqual(achatsCpsSource.data.achatsSections[0].tree, []);
assert.equal(achatsCpsSource.data.achatsSections[0].title, 'Recueil CPS');
assert.equal(achatsCpsSource.data.achatsSections[0].gedFolder, 'Bibliothèque documentaire des CPS');
assert.doesNotMatch(JSON.stringify(cultureQuizSource), /Quiz qualité|Auto-évaluation SST|124 participations|98 participations/);
assert.doesNotMatch(JSON.stringify(achatsCpsSource), /AO 12\/2026|AO 08\/2026|AO 31\/2025|CPS_AO_/);
const achatsIndicatorsSource = read('data/rubriques/achats/sous-rubriques/indicateurs-achats.json');
assert.deepEqual(
  achatsIndicatorsSource.data.achatsSections[0].metrics.map(metric => metric.value),
  ['33', '71,74%', '278', '11,84 j'],
);
const governanceNavigationSource = read('data/rubriques/navigation/sous-menus/gouvernance.json');
assert.equal(
  governanceNavigationSource.data.sidebarSubmenus.gouvernance.items.find(item => item.tab === 'systeme')?.label,
  'Instances de gouvernance',
);
const organisationConfigSource = read('data/rubriques/organisation-smi-culture/configuration-generale.json');
assert.deepEqual(
  organisationConfigSource.data.orgGovMainTabs.map(tab => tab.id),
  ['organisation', 'smi', 'culture-qse-rse'],
);
assert.equal(organisationConfigSource.data.orgGovSectionConfig.overview, undefined);
assert.match(app, /if \(viewId === 'institutionnel'\)[\s\S]*?switchOrgGovTab\('organigramme'\)/);
const organisationChartSource = read('data/rubriques/organisation-smi-culture/sous-rubriques/organigramme.json');
assert.equal(organisationChartSource.data.orgData.personName, 'Lotfi BOUJENDAR');
assert.equal(organisationChartSource.data.orgData.role, 'Directeur');
assert.equal(organisationChartSource.data.orgData.functionTitle, 'Directeur');
assert.equal(organisationChartSource.data.orgData.displayPeople, true);
assert.equal(organisationChartSource.data.orgData.displayServicePeople, true);
assert.equal(organisationChartSource.data.orgData.children.find(node => node.posteId === 'audit-interne').personName, 'Amal SEBAAI');
const secretariatGeneral = organisationChartSource.data.orgData.children.find(node => node.posteId === 'secretariat-general');
const poleClients = secretariatGeneral.children.find(node => node.posteId === 'pole-clients');
const relationClient = poleClients.hiddenChildren.find(node => node.posteId === 'division-relation-client');
const animationReseau = relationClient.children.find(node => node.posteId === 'chef-de-service-animation-du-reseau');
assert.equal(animationReseau.children.filter(node => node.role === 'Délégation régionale').length, 11);
assert.equal(animationReseau.children.at(-1).functionTitle, "Chef de Centre d'Accueil de Rabat");
assert.equal(relationClient.children.some(node => node.posteId === 'chef-de-delegation'), false);
const poleOperations = secretariatGeneral.children.find(node => node.posteId === 'pole-operations');
const concessionRights = poleOperations.hiddenChildren.find(node => node.posteId === 'division-concession-droits');
assert.ok(concessionRights.children.some(node => node.posteId === 'chef-de-service-verification-et-concession'));
const portfolioPole = secretariatGeneral.children.find(node => node.posteId === 'pole-gestion-portefeuille');
assert.ok(portfolioPole.hiddenChildren.some(node => node.posteId === 'chef-de-service-conformite-et-controle-interne'));
assert.ok(portfolioPole.hiddenChildren.some(node => node.posteId === 'chef-de-service-recherche-et-analyse'));
const portfolioManagement = portfolioPole.hiddenChildren.find(node => node.posteId === 'division-gestion-portefeuille-gestion');
assert.equal(portfolioManagement.children.some(node => node.posteId === 'chef-de-service-conformite-et-controle-interne'), false);
const resourcesPole = secretariatGeneral.children.find(node => node.posteId === 'pole-ressources');
const financeDivision = resourcesPole.hiddenChildren.find(node => node.posteId === 'division-financiere-comptable');
assert.deepEqual(
  financeDivision.children.map(node => node.posteId),
  ['chef-de-service-comptabilite', 'chef-de-service-financier', 'chef-du-service-recouvrement'],
);
assert.match(app, /function renderOrgServiceNode\(service, prefix, namespace, depth = 0\)/);
assert.match(app, /function toggleOrgSubordinates\(panelId, button\)/);
assert.match(app, /class="cmr-org-subordinate-toggle"/);
assert.match(app, /class="cmr-org-subordinate-tree"[^>]*hidden/);
assert.match(css, /\.cmr-org-subordinate-tree\s*\{/);
assert.match(css, /\.cmr-org-subordinate-tree\[hidden\]\s*\{[\s\S]*?display:\s*none;/);
assert.match(css, /\.cmr-org-direct-unit--service\s*\{[\s\S]*?padding-top:\s*80px;/);
assert.match(css, /\.cmr-org-direct-unit--service::before\s*\{[\s\S]*?height:\s*114px;/);
assert.match(css, /@media \(max-width: 680px\)[\s\S]*?\.cmr-org-direct-unit--main\s*\{[\s\S]*?order:\s*-1;/);
const rhOffersSource = read('data/rubriques/ressources-humaines/sous-rubriques/offres-emploi.json');
assert.deepEqual(rhOffersSource.data.rhOffresList, []);
assert.deepEqual(rhOffersSource.data.offresData, {});
assert.doesNotMatch(JSON.stringify(rhOffersSource), /Chef de Projet BI|Communication Digital|Risques & Actuariat/);
assert.match(app, /const offresData = getCmrData\('offresData', \{\}\);/);
const academyFormationSource = read('data/rubriques/cmr-academy/sous-rubriques/formation.json');
assert.match(academyFormationSource.data.academyPages.formation.description, /l’ensemble des demandes de formation/);
assert.match(kmRexSource.data.kmPages.rex.description, /partager les enseignements issus des projets/);
assert.match(kmCommunitiesSource.data.kmPages.communautes.description, /Un espace dédié aux échanges/);
const headerSource = read('data/rubriques/entete/barre-superieure.json');
const headerQuickLinkLabels = headerSource.data.header.quickLinks.items.map(item => item.label);
for (const label of ['Helpdesk', 'Demande de mobilité', 'Demande de formation', 'Outlook']) {
  assert.ok(headerQuickLinkLabels.includes(label));
}
assert.doesNotMatch(fs.readFileSync('src/sections/views/DashboardSection.jsx', 'utf8'), /<QuickAccess quickAccess=/);
const vieSocialeLightboxSource = fs.readFileSync('src/sections/views/VieSocialeSection.jsx', 'utf8');
assert.match(vieSocialeLightboxSource, /const \[previewIndex, setPreviewIndex\] = useState\(null\)/);
assert.match(vieSocialeLightboxSource, /className="communication-lightbox"/);
assert.match(vieSocialeLightboxSource, /showPreviousImage/);
assert.match(vieSocialeLightboxSource, /showNextImage/);
console.log('PASS: requested content, 21 application links/domains, RH quick-access navigation, React renders, SMI content with loading/error/empty/live documents.');

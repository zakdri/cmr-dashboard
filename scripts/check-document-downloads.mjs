import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const app = fs.readFileSync('src/legacy/app.js', 'utf8');
const start = app.indexOf('async function openResolvedGedDocument(');
const end = app.indexOf('// ====== Preview PDF (', start);
const opened = [];
const previews = [];
const errors = [];
let resolved = null;
let lookups = 0;
const context = vm.createContext({
  window: { open: (...args) => opened.push(args) },
  openPdfPreviewModal: (...args) => previews.push(args),
  resolveGedDocumentForClick: async () => { lookups++; return resolved; },
  shouldUseDocumentsApi: () => true,
  alert: message => errors.push(message),
  Blob: class { constructor() { throw new Error('Live downloads must never create demo content'); } },
});
vm.runInContext(app.slice(start, end), context);

const name = "Journées d'intégration 2025.pptx";
for (const prefix of ['http://localhost/moovapps/cmr-dashboard/', '/moovapps/cmr-dashboard/', '', './', '../']) {
  const url = `${prefix}ged-file/${encodeURIComponent(name)}?protocolUri=uri%3A%2F%2Ffile&download=1`;
  await context.openMockDownload(url, name);
  assert.equal(opened.at(-1)[0], url, 'Navigate to the real binary endpoint');
  assert.equal(opened.at(-1)[2], 'noopener');
}
assert.equal(lookups, 0, 'Direct GED URLs do not fall through to demo downloads');
await context.openMockDownload('/moovapps/cmr-dashboard/ged-file/Guide.pdf?protocolUri=uri%3A%2F%2Fguide', 'Guide');
assert.equal(previews.length, 1, 'PDF preview is preserved');

resolved = {file: '/moovapps/cmr-dashboard/ged-file/Slides.pptx?protocolUri=slides&download=1', title: 'Slides'};
await context.openMockDownload('Slides.pptx', 'Slides');
assert.equal(opened.at(-1)[0], resolved.file);
resolved = null;
await context.openMockDownload('Missing.pptx', 'Missing');
assert.equal(errors.length, 1, 'Missing live documents show an error instead of a fake PPTX');
assert.match(errors[0], /Moovapps/);
console.log('PASS: direct GED downloads, filename resolution, PDF preview, missing-document handling; no demo PPTX.');

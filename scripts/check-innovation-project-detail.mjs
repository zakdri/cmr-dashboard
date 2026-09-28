import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync("src/legacy/app.js", "utf8");
const css = fs.readFileSync("css/styles.css", "utf8");

function between(start, end) {
  const from = app.indexOf(start);
  const to = app.indexOf(end, from + start.length);
  assert.ok(from >= 0 && to > from, start);
  return app.slice(from, to);
}

const detail = { innerHTML: "" };
const context = vm.createContext({
  selectedProjectSheetId: "project-test",
  projectSheets: [{
    id: "project-test",
    image: "images/project.jpg",
    title: "Projet test",
    summary: "Synthèse du projet test",
    objective: "Premier objectif\nDeuxième objectif",
    team: "Équipe A",
    mentor: "Sponsor A",
    insights: "Premier paragraphe.\n\nDeuxième paragraphe.\nTroisième ligne.",
    documents: [],
  }],
  document: { getElementById: () => detail },
  escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },
  renderInnovationAttachments: () => "",
});

vm.runInContext(between("function renderInnovationProjectDetail()", "function selectInnovationProjectIdea("), context);
vm.runInContext("renderInnovationProjectDetail()", context);

assert.ok(detail.innerHTML.includes('class="innovation-project-cover-detail"'));
assert.ok(!detail.innerHTML.includes('width="640"'));
assert.ok(detail.innerHTML.includes("Synthèse du projet test"));
assert.ok(detail.innerHTML.includes("Premier paragraphe.\n\nDeuxième paragraphe.\nTroisième ligne."));
assert.ok(detail.innerHTML.includes('class="innovation-project-text-section innovation-project-insights"'));
assert.match(css, /\.innovation-project-cover-detail\s*\{[^}]*width:\s*100%/s);
assert.match(css, /\.innovation-project-cover-detail\s*\{[^}]*height:\s*auto/s);
assert.match(css, /\.innovation-project-cover-detail\s*\{[^}]*max-width:\s*1078px/s);
assert.match(css, /\.innovation-project-cover-detail\s*\{[^}]*object-fit:\s*contain/s);
assert.ok(!css.includes(".innovation-project-cover-detail { height: 250px; }"));
assert.match(css, /\.innovation-project-copy\s*\{[^}]*white-space:\s*pre-wrap/s);

const eventDetail = { innerHTML: "" };
const eventContext = vm.createContext({
  selectedInnovEventId: "event-test",
  innovEventItems: [{
    id: "event-test",
    image: "images/event.jpg",
    title: "Innov Event test",
    description: "Description de l’événement",
    documents: [],
  }],
  document: { getElementById: () => eventDetail },
  escapeHtml: context.escapeHtml,
  renderInnovationAttachments: () => "",
});

vm.runInContext(between("function renderInnovEventDetail()", "function renderInnovEvent()"), eventContext);
vm.runInContext("renderInnovEventDetail()", eventContext);
assert.ok(eventDetail.innerHTML.includes('class="innovation-project-cover-detail"'));
assert.ok(eventDetail.innerHTML.includes('src="images/event.jpg"'));
assert.ok(eventDetail.innerHTML.includes("Description de l’événement"));
assert.ok(app.includes("|| targetId === 'innovationEventCards'"));

console.log("PASS: project and Innov Event images fill their detail cards.");

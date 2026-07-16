import React, { useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getRhData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.rhHeader || {},
    tabs: data.rhTabs || [],
    pages: data.rhPages || {},
    offresIntro: data.rhOffresIntro || "",
    offresFilters: data.rhOffresFilters || {},
    offresList: data.rhOffresList || [],
  };
}

function SectionIntro({ text }) {
  if (!text) return null;
  return <p className="section-intro">{text}</p>;
}

function IconBox({ icon = "file-text", style }) {
  return (
    <div className="doc-icon-large" style={style}>
      <i data-lucide={icon} style={{ width: 24, height: 24 }} />
    </div>
  );
}

function SimpleCard({ item, onClick }) {
  return (
    <div className={`doc-card${onClick ? "" : " static-card"}`} onClick={onClick}>
      <IconBox icon={item.icon} style={item.iconStyle} />
      <div className="doc-card-title">{item.title}</div>
      {item.description ? <p style={{ fontSize: 12, color: "var(--text-light)" }}>{item.description}</p> : null}
      {item.meta || item.action ? (
        <div className="doc-card-meta">
          <span>{item.meta || item.action}</span>
          <i data-lucide={item.actionIcon || "chevron-right"} style={{ width: 16 }} />
        </div>
      ) : null}
    </div>
  );
}

function WorkflowCard({ workflow }) {
  return (
    <div className="content-card" style={{ marginTop: 20 }}>
      <h3>{workflow.title}</h3>
      <p style={{ color: "var(--text-light)", marginTop: 6 }}>{workflow.description}</p>
      <div className="km-grid" style={{ marginTop: 18 }}>
        {(workflow.steps || []).map((step, index) => (
          <div className="doc-card static-card" key={step.title}>
            <div
              className="doc-icon-large"
              style={{ background: step.background || "#eff6ff", color: step.color || "#2563eb" }}
            >
              {index + 1}
            </div>
            <div className="doc-card-title">{step.title}</div>
            <p style={{ fontSize: 12, color: "var(--text-light)" }}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerPage({ page }) {
  const profile = page.profile || {};
  const [openStep, setOpenStep] = useState(page.pathSteps?.[0]?.title || "");
  return (
    <div id="page-rh-carriere" className="km-tab-content" style={{ display: "block" }}>
      <SectionIntro text={page.description} />
      <div className="rh-career-layout">
        <div className="doc-card static-card rh-profile-card">
          <div className="rh-profile-head">
            <IconBox icon="user-round" style={{ background: "#eff6ff", color: "#2563eb" }} />
            <div>
              <div className="doc-card-title">{profile.title}</div>
              <p>Informations principales du collaborateur.</p>
            </div>
          </div>
          <div style={{ display: "grid", gap: 10, marginTop: 18, textAlign: "left" }}>
            {(profile.fields || []).map((field) => (
              <div className="rh-profile-field" key={field.label}>
                <strong>{field.label}</strong>
                <span>{field.value}</span>
              </div>
            ))}
          </div>
          <button className="primary-btn rh-profile-action">{profile.action}</button>
        </div>

        <div className="content-card rh-path-card">
          <h3>{page.pathTitle}</h3>
          <SectionIntro text={page.pathDescription} />
          <div className="rh-path-list">
            {(page.pathSteps || []).map((step) => (
              <details
                className="rh-path-panel"
                key={step.title}
                open={openStep === step.title}
                onToggle={(event) => {
                  if (event.currentTarget.open) setOpenStep(step.title);
                }}
              >
                <summary>
                  <span>{step.title}</span>
                  <i data-lucide="chevron-down" />
                </summary>
                <div className="rh-path-panel-body">
                  <p>{step.description}</p>
                  <div className="rh-path-attachments">
                    {(step.attachments || []).map((attachment) => (
                      <span key={attachment}>{attachment}</span>
                    ))}
                  </div>
                  <button className="secondary-btn">{step.linkLabel}</button>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormationPage({ page }) {
  const [query, setQuery] = useState("");
  const workflows = (page.workflows || []).filter((item) =>
    [item.title, item.description, item.meta].join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div id="page-rh-formation" className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder="Rechercher un workflow formation..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="km-grid" style={{ marginTop: 18 }}>
        {workflows.map((item) => <SimpleCard item={item} key={item.title} />)}
      </div>
      <WorkflowCard workflow={page.validation || {}} />
    </div>
  );
}

function DocumentsPage({ page }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const categories = (page.categories || []).map((category) => ({
    ...category,
    items: (category.items || []).filter((item) =>
      [item.title, item.description, item.meta].join(" ").toLowerCase().includes(term),
    ),
  }));

  return (
    <div id="page-rh-documents" className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder="Rechercher un document RH..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {categories.filter((category) => !term || category.items.length).map((category) => (
        <div className="content-card" style={{ marginTop: 18 }} key={category.title}>
          <h3>{category.title}</h3>
          <div className="km-grid" style={{ marginTop: 16 }}>
            {(category.items || []).map((item) => <SimpleCard item={item} key={item.title} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function OffresPage({ offresIntro, offresList, offresFilters }) {
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState((offresFilters.directions || [])[0] || "");
  const [niveau, setNiveau] = useState((offresFilters.niveaux || [])[0] || "");
  const term = query.trim().toLowerCase();
  const filteredOffres = offresList.filter((offre) => {
    const haystack = [offre.title, offre.meta, offre.published, offre.status].join(" ").toLowerCase();
    const matchSearch = haystack.includes(term);
    const matchDirection = !direction || direction.startsWith("Toutes") || haystack.includes(direction.toLowerCase());
    const matchNiveau = !niveau || niveau.startsWith("Tous") || haystack.includes(niveau.toLowerCase());
    return matchSearch && matchDirection && matchNiveau;
  });

  return (
    <div id="page-rh-offres" className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={offresIntro} />
      <div id="offres-liste">
        <div className="section-search-row">
          <i data-lucide="search" style={{ width: 18 }} />
          <input
            placeholder="Rechercher un poste vacant..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="filter-row">
          <select className="filter-select" value={direction} onChange={(event) => setDirection(event.target.value)}>
            {(offresFilters.directions || []).map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="filter-select" value={niveau} onChange={(event) => setNiveau(event.target.value)}>
            {(offresFilters.niveaux || []).map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {filteredOffres.map((offre) => (
            <div className="doc-row rh-offer-row" key={offre.id} onClick={(event) => runLegacyHandler(event, `showOffrefiche('${offre.id}')`)}>
              <div>
                <strong>{offre.title}</strong>
                <p style={{ color: "var(--text-light)", marginTop: 4 }}>{offre.meta}</p>
                <small>{offre.published}</small>
              </div>
              <span style={{ background: offre.statusBackground, color: offre.statusColor, padding: "6px 12px", borderRadius: 20, fontWeight: 700 }}>{offre.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div id="offres-fiche" className="content-card" style={{ display: "none", marginTop: 18 }}>
        <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "showOffresListe()")}>Retour</button>
        <div className="rh-job-head">
          <div>
            <h3 id="fiche-titre" />
            <p id="fiche-meta" />
          </div>
          <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "showOffreFormulaire()")}>Postuler</button>
        </div>
        <div className="rh-job-info-grid">
          <div className="rh-job-info">
            <i data-lucide="building-2" />
            <span>Direction</span>
            <strong id="fiche-direction" />
          </div>
          <div className="rh-job-info">
            <i data-lucide="map-pin" />
            <span>Lieu</span>
            <strong id="fiche-lieu" />
          </div>
          <div className="rh-job-info">
            <i data-lucide="badge-check" />
            <span>Niveau</span>
            <strong id="fiche-niveau" />
          </div>
          <div className="rh-job-info">
            <i data-lucide="calendar-days" />
            <span>Date limite</span>
            <strong id="fiche-date" />
          </div>
        </div>
        <div className="rh-job-section">
          <h4>Mission</h4>
          <p id="fiche-mission" />
        </div>
        <div className="rh-job-section">
          <h4>Profil recherché</h4>
          <ul id="fiche-profil" />
        </div>
      </div>
      <div id="offres-formulaire" className="content-card" style={{ display: "none", marginTop: 18 }}>
        <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "showOffrefiche(currentOffre)")}>Retour</button>
        <h3 id="form-poste-titre" style={{ marginTop: 16 }} />
        <div className="form-grid">
          <input placeholder="Motivation" />
          <input placeholder="CV PDF" />
        </div>
        <button className="primary-btn">Envoyer la candidature</button>
      </div>
    </div>
  );
}

function MobilitePage({ page }) {
  return (
    <div id="page-rh-mobilite" className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <WorkflowCard workflow={page.workflow || {}} />
      <div className="content-card" style={{ marginTop: 20 }}>
        <h3>{page.formTitle}</h3>
        <div className="form-grid" style={{ marginTop: 16 }}>
          {(page.fields || []).map((field) => <input key={field} placeholder={field} />)}
        </div>
        <button className="primary-btn">{page.submitLabel}</button>
      </div>
    </div>
  );
}

function EnquetesPage({ page }) {
  const [query, setQuery] = useState("");
  const [selectedSurveyTitle, setSelectedSurveyTitle] = useState(page.surveys?.[0]?.title || "");
  const [historyYear, setHistoryYear] = useState(page.historyYears?.[0] || "Tous");
  const term = query.trim().toLowerCase();
  const surveys = (page.surveys || []).filter((survey) =>
    [survey.title, survey.description, survey.longDescription, survey.theme]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
  const detail =
    surveys.find((survey) => survey.title === selectedSurveyTitle) ||
    surveys[0] ||
    page.surveys?.[0] ||
    {};
  const history = (page.history || []).filter((item) => historyYear === "Tous" || item.year === historyYear);

  return (
    <div id="page-rh-enquetes" className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <div className="km-grid" style={{ marginTop: 18 }}>
        {(page.kpis || []).map((kpi) => (
          <div className="doc-card static-card rh-kpi-card" key={kpi.label}>
            <div style={{ fontSize: 28, fontWeight: 900, color: kpi.color }}>{kpi.value}</div>
            <div className="doc-card-title">{kpi.label}</div>
            <p style={{ color: "var(--text-light)", fontSize: 12 }}>{kpi.trend}</p>
          </div>
        ))}
      </div>
      <div className="rh-two-column">
        <div className="content-card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <h3>{page.surveysTitle}</h3>
            <button className="primary-btn">{page.proposeLabel}</button>
          </div>
          <div className="section-search-row" style={{ marginTop: 14 }}>
            <i data-lucide="search" style={{ width: 18 }} />
            <input
              placeholder="Rechercher une enquête..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            {surveys.map((survey) => (
              <SimpleCard
                item={survey}
                key={survey.title}
                onClick={() => setSelectedSurveyTitle(survey.title)}
              />
            ))}
          </div>
        </div>
        <div className="content-card">
          <h3>{detail.title}</h3>
          <p style={{ color: "var(--text-light)" }}>{detail.longDescription}</p>
          <div className="doc-card-meta">
            <span>{detail.theme}</span>
            <a href={detail.accessUrl || "#"}>{detail.accessLabel}</a>
          </div>
          <button className="primary-btn" style={{ marginTop: 16 }}>{detail.submitLabel}</button>
        </div>
      </div>
      <div className="rh-enquete-history-layout">
        <div className="content-card">
          <h3>{page.historyTitle}</h3>
          <div className="academy-horizontal-filter">
            {["Tous", ...(page.historyYears || [])].map((year) => (
              <button
                className={`filter-pill${year === historyYear ? " active" : ""}`}
                key={year}
                onClick={() => setHistoryYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
          <div className="rh-enquete-list">
            {history.map((item) => <SimpleCard item={item} key={item.title} />)}
          </div>
        </div>
        <div className="content-card">
          <h3>{page.reportsTitle}</h3>
          <div className="rh-enquete-list">
            {(page.reports || []).map((item) => <SimpleCard item={item} key={item.title} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ForumsPage({ page }) {
  const [query, setQuery] = useState("");
  const items = (page.items || []).filter((item) =>
    [item.title, item.description, item.meta].join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div id="page-rh-forums" className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder="Rechercher un forum ou groupe..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="km-grid" style={{ marginTop: 18 }}>
        {items.map((item) => <SimpleCard item={item} key={item.title} />)}
      </div>
    </div>
  );
}

export default function RhSection() {
  const { header, tabs, pages, offresIntro, offresFilters, offresList } = getRhData();

  return (
    <div id="view-rh" className="view-section km-container">
      <div className="km-header">
        <h2>{header.title}</h2>
        <p>{header.description}</p>
      </div>
      <div className="km-navbar" style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 30, borderBottom: "2px solid #e2e8f0", overflowX: "auto" }}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <div className={`km-nav-item${index === 0 ? " active" : ""}`} onClick={(event) => runLegacyHandler(event, `switchRhPageTab('${tab.id}')`)} style={{ whiteSpace: "nowrap", padding: "12px 16px" }}>
              {tab.label}
            </div>
            {index < tabs.length - 1 ? <span style={{ color: "#cbd5e1" }}>|</span> : null}
          </React.Fragment>
        ))}
      </div>
      <CareerPage page={pages.carriere || {}} />
      <FormationPage page={pages.formation || {}} />
      <DocumentsPage page={pages.documents || {}} />
      <OffresPage offresIntro={offresIntro} offresFilters={offresFilters} offresList={offresList} />
      <MobilitePage page={pages.mobilite || {}} />
      <EnquetesPage page={pages.enquetes || {}} />
      <ForumsPage page={pages.forums || {}} />
    </div>
  );
}

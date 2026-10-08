import React, { useEffect, useMemo, useState } from "react";
import DocumentTypeIcon from "../../components/DocumentTypeIcon.jsx";
import LucideIcon from "../../components/LucideIcon.jsx";
import PaginatedDocuments from "../../components/PaginatedDocuments.jsx";
import { FormationPage } from "./AcademySection.jsx";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import PlatformServiceFrame from "../../components/PlatformServiceFrame.jsx";
import {
  GED_ROOT_PATH,
  joinGedPath,
  mergeDocumentsIntoGroups,
  normalizeGedKey,
  shouldUseDocumentsApi,
} from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

function getRhData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.rhHeader || {},
    tabs: data.rhTabs || [],
    pages: data.rhPages || {},
    offresIntro: data.rhOffresIntro || "",
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
      <LucideIcon name={icon} style={{ width: 24, height: 24 }} />
    </div>
  );
}

function GedDocumentCard({ documentItem }) {
  const title = documentItem.title || documentItem.label || documentItem.fileName;
  return (
    <SimpleCard
      item={{
        title,
        documentItem,
        actionIcon: "download",
      }}
      onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(documentItem.file)},${JSON.stringify(title)})`)}
    />
  );
}

function SimpleCard({ item, onClick }) {
  return (
    <div className={`doc-card${onClick ? "" : " static-card"}`} onClick={onClick}>
      <DocumentTypeIcon documentItem={item.documentItem || item} />
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
  useEffect(() => { window.lucide?.createIcons(); }, [workflow]);

  return (
    <div className="content-card rh-workflow" style={{ marginTop: 20 }}>
      <h3>{workflow.title}</h3>
      <p style={{ color: "var(--text-light)", marginTop: 6 }}>{workflow.description}</p>
      <ol className="rh-workflow-chain" style={{ "--workflow-count": Math.max(1, workflow.steps?.length || 0) }}>
        {(workflow.steps || []).map((step, index) => (
          <li className="rh-workflow-step" key={step.title}>
            <span
              className="rh-workflow-number"
              style={{ background: step.background || "#eff6ff", color: step.color || "#2563eb" }}
            >
              {index + 1}
            </span>
            {index < workflow.steps.length - 1 ? <span className="rh-workflow-connector" aria-hidden="true" /> : null}
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CareerAttachment({ attachment }) {
  const title = attachment.title || attachment.fileName || attachment.label || "Document";
  const extension = (attachment.fileName || title).match(/\.([a-z0-9]{2,5})$/i)?.[1]?.toUpperCase() || "DOC";
  const kind = /^(PPT|PPTX)$/.test(extension) ? "presentation" : extension === "PDF" ? "pdf" : "document";

  useEffect(() => { window.lucide?.createIcons(); }, []);

  return (
    <button
      type="button"
      className="rh-path-attachment"
      title={`Télécharger ${title}`}
      aria-label={`Télécharger ${title}`}
      onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(attachment.file)},${JSON.stringify(title)})`)}
    >
      <span className={`rh-path-file-kind rh-path-file-kind--${kind}`} aria-hidden="true">{extension}</span>
      <span className="rh-path-file-title">{title}</span>
      <span className="rh-path-file-action" aria-hidden="true"><i data-lucide="download" /></span>
    </button>
  );
}

function CareerPage({ page, active }) {
  const profile = page.profile || {};
  const [currentUser, setCurrentUser] = useState(() => window.CMR_CURRENT_USER || null);
  const [openStep, setOpenStep] = useState(page.pathSteps?.[0]?.title || "");
  const gedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Mes Services RH", "Ma Carrière"), { enabled: active });
  useEffect(() => {
    const handleUserUpdated = (event) => setCurrentUser(event.detail?.user || window.CMR_CURRENT_USER || null);
    window.addEventListener("cmr:user-updated", handleUserUpdated);
    return () => window.removeEventListener("cmr:user-updated", handleUserUpdated);
  }, []);
  const fallbackFields = Object.fromEntries((profile.fields || []).map((field) => [field.label, field.value]));
  const profileFields = currentUser
    ? [
        {
          label: "Nom",
          value: currentUser.fullName
            || currentUser.displayName
            || `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
            || "Non renseigné",
        },
        { label: "Poste", value: currentUser.poste || currentUser.Poste || currentUser.function || "Non renseigné" },
        { label: "Affectation", value: currentUser.affectation || currentUser.Affectation || "Non renseignée" },
      ]
    : [
        { label: "Nom", value: window.CMR_DATA?.data?.header?.user?.name || "Utilisateur" },
        { label: "Poste", value: fallbackFields.Poste || "Non renseigné" },
        { label: "Affectation", value: fallbackFields.Affectation || "Non renseignée" },
      ];
  const gedByFolder = useMemo(() => {
    const map = new Map();
    gedState.documents.forEach((doc) => {
      const key = doc.segments?.[0] || "";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(doc);
    });
    return map;
  }, [gedState.documents]);
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
            {profileFields.map((field) => (
              <div className="rh-profile-field" key={field.label}>
                <strong>{field.label}</strong>
                <span>{field.value}</span>
              </div>
            ))}
          </div>
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
                    <PaginatedDocuments items={shouldUseDocumentsApi()
                      ? (gedByFolder.get(step.title) || [])
                      : (step.attachments || []).map((attachment) => ({ title: attachment, file: attachment }))
                    } resetKey={step.title}>
                      {(attachments) => attachments.map((attachment) => (
                        <CareerAttachment attachment={attachment} key={attachment.file || attachment.title} />
                      ))}
                    </PaginatedDocuments>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsPage({ page, active }) {
  const [query, setQuery] = useState("");
  const gedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Mes Services RH", "Documents RH"), { enabled: active });
  const term = query.trim().toLowerCase();
  const sourceCategories = shouldUseDocumentsApi()
    ? mergeDocumentsIntoGroups(page.categories || [], gedState.documents, { fallbackLabel: "Documents RH" })
    : (page.categories || []);
  const categories = sourceCategories
    .filter((category) => !["chartes", "chartes rh"].includes(normalizeGedKey(category.title)))
    .map((category) => ({
      ...category,
      items: (category.items || []).filter((item) =>
        [item.title, item.description, item.meta, item.fileName, item.folderLabel].join(" ").toLowerCase().includes(term),
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
      {gedState.loading ? <div style={{ padding: 14, color: "#64748b", fontSize: 13 }}>Chargement des documents RH...</div> : null}
      {gedState.error ? <div style={{ padding: 12, color: "#9a3412", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, fontSize: 12 }}>Les documents RH Moovapps ne sont pas disponibles pour le moment.</div> : null}
      {categories.filter((category) => !term || normalizeGedKey(category.title).includes(normalizeGedKey(term)) || category.items.length).map((category) => (
        <div className="content-card" style={{ marginTop: 18 }} key={category.title}>
          <h3>{category.title}</h3>
          <div className="km-grid" style={{ marginTop: 16 }}>
            <PaginatedDocuments items={category.items || []} resetKey={`${category.title}:${query}`}>
              {(visibleDocuments) => shouldUseDocumentsApi() ? visibleDocuments.map((item) => (
                <GedDocumentCard documentItem={item} key={item.id || item.fileName} />
              )) : visibleDocuments.map((item) => (
                <SimpleCard
                  item={item}
                  key={item.title}
                  onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(item.title)},${JSON.stringify(item.title)})`)}
                />
              ))}
            </PaginatedDocuments>
          </div>
        </div>
      ))}
    </div>
  );
}

function documentMatchesFolderPath(documentItem, folderPath) {
  const documentSegments = (documentItem.segments?.length
    ? documentItem.segments
    : String(documentItem.folderLabel || "").split("/"))
    .filter(Boolean)
    .map(normalizeGedKey);
  const expectedSegments = (folderPath || []).map(normalizeGedKey);
  if (!expectedSegments.length || documentSegments.length < expectedSegments.length) return false;

  return expectedSegments.every((segment, index) => documentSegments[index] === segment)
    || expectedSegments.every((segment, index) =>
      documentSegments[documentSegments.length - expectedSegments.length + index] === segment,
    );
}

function AttakmiliDocuments({ documents, resetKey }) {
  return (
    <div className="rh-attakmili-documents">
      <PaginatedDocuments items={documents} resetKey={resetKey}>
        {(visibleDocuments) => visibleDocuments.map((documentItem) => (
          <GedDocumentCard documentItem={documentItem} key={documentItem.id || documentItem.fileName} />
        ))}
      </PaginatedDocuments>
      {!documents.length ? <p className="empty-state">Aucun document disponible.</p> : null}
    </div>
  );
}

function AttakmiliTextContent({ content = {} }) {
  return (
    <div className="rh-attakmili-text-content" dir="rtl" lang="ar">
      {content.intro ? <p>{content.intro}</p> : null}
      {content.heading ? <h5>{content.heading}</h5> : null}
      {content.responsible ? <p>{content.responsible}</p> : null}
      <dl>
        {content.office ? <><dt>المكتب</dt><dd>{content.office}</dd></> : null}
        {content.phone ? <><dt>الهاتف</dt><dd>{content.phone}</dd></> : null}
        {content.email ? <><dt>البريد الإلكتروني</dt><dd><a href={`mailto:${content.email}`}>{content.email}</a></dd></> : null}
      </dl>
    </div>
  );
}

function AttakmiliPage({ page, active }) {
  const [query, setQuery] = useState("");
  const gedState = useGedDocuments(
    joinGedPath(GED_ROOT_PATH, "Mes Services RH", "ATTAKMILI PLUS"),
    { enabled: active },
  );
  const term = query.trim().toLowerCase();
  const filteredDocuments = gedState.documents.filter((documentItem) =>
    [documentItem.title, documentItem.fileName, documentItem.folderLabel]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );

  return (
    <div id="page-rh-attakmili" className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder={page.searchPlaceholder || "Rechercher un document ATTAKMILI +..."}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {gedState.loading ? <div className="rh-attakmili-status">Chargement des documents ATTAKMILI +...</div> : null}
      {gedState.error ? <div className="rh-attakmili-error">Les documents ATTAKMILI + ne sont pas disponibles pour le moment.</div> : null}
      <div className="rh-attakmili-grid">
        {(page.blocks || []).map((block) => (
          <section className="content-card rh-attakmili-block" key={block.title}>
            <div className="rh-attakmili-block-title">
              <IconBox icon={block.icon} style={{ background: "#eff6ff", color: "#256cb5" }} />
              <h3>{block.title}</h3>
            </div>
            {block.children?.length ? block.children.map((child) => {
              const documents = filteredDocuments.filter((documentItem) =>
                documentMatchesFolderPath(documentItem, child.folderPath),
              );
              return (
                <div className="rh-attakmili-child" key={child.title}>
                  {!child.content ? <h4>{child.title}</h4> : null}
                  {child.content ? <AttakmiliTextContent content={child.content} /> : null}
                  {documents.length || !child.content ? (
                    <AttakmiliDocuments documents={documents} resetKey={`${child.title}:${query}`} />
                  ) : null}
                </div>
              );
            }) : (
              <AttakmiliDocuments
                documents={filteredDocuments.filter((documentItem) =>
                  documentMatchesFolderPath(documentItem, block.folderPath),
                )}
                resetKey={`${block.title}:${query}`}
              />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function OffresPage({ offresIntro, offresList }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const filteredOffres = offresList.filter((offre) =>
    [offre.title, offre.meta, offre.published, offre.status].join(" ").toLowerCase().includes(term),
  );

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
          {!filteredOffres.length ? <p className="empty-state">Aucun poste vacant.</p> : null}
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

function ConfiguredServicePage({ pageId, page, active, serviceKey, title }) {
  const configuredPath = window.CMR_PLATFORM_CONFIG?.services?.rh?.[serviceKey]?.path;
  const path = configuredPath || page.service?.path || "";
  return (
    <div id={pageId} className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <PlatformServiceFrame path={path} title={page.workflow?.title || title} active={active} />
    </div>
  );
}

function ServiceDemoPage({ pageId, page, title }) {
  return (
    <div id={pageId} className="km-tab-content" style={{ display: "none" }}>
      <SectionIntro text={page.description} />
      <div className="content-card">
        <h3>{page.title || title}</h3>
      </div>
    </div>
  );
}

function IndicatorsSummary({ page }) {
  const indicators = page.indicators || [];
  useEffect(() => { window.lucide?.createIcons(); }, [indicators.length]);
  if (!indicators.length) return null;
  return (
    <div className="rh-enquetes-indicators">
      <div className="content-card rh-indicators-overview">
        <div className="rh-indicators-overview-heading"><h3>{page.indicatorsTitle || "Synthèse des résultats"} {page.year}</h3><span>{page.period}</span></div>
        <div className="rh-indicators-survey">
          <div><strong>{page.population}</strong><span>Collaborateurs</span></div>
          <div><strong>{page.responses}</strong><span>Réponses collectées</span></div>
          <div><strong>{page.participation}</strong><span>Taux de participation</span></div>
        </div>
      </div>
      <section className="rh-indicators-section" aria-label="Synthèse des indicateurs clés">
        <h3>Synthèse des indicateurs clés</h3>
        <div className="rh-indicators-grid">
          {indicators.map((item) => (
            <article className="content-card rh-indicator-card" key={item.question}>
              <div className="rh-indicator-card-top"><span className="rh-indicator-icon"><i data-lucide={item.icon} aria-hidden="true" /></span><span className="rh-indicator-question">{item.question}</span></div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <strong className="rh-indicator-value">{item.value}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="rh-indicators-section" aria-label="Résultats de synthèse">
        <h3>Résultats de synthèse</h3>
        <div className="rh-indicators-summary">
          {(page.summary || []).map((item) => <div className="content-card rh-indicators-summary-item" key={item.label}><span>{item.label}{item.question ? ` · ${item.question}` : ""}</span><strong>{item.value}</strong></div>)}
        </div>
      </section>
      <p className="rh-indicators-methodology">Marge d’erreur : {page.methodology?.marginOfError} · Niveau de confiance : {page.methodology?.confidence} · Répondants en français : {page.methodology?.frenchResponses} · Répondants en arabe : {page.methodology?.arabicResponses}</p>
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
      <IndicatorsSummary page={page} />
      <div className="rh-two-column">
        <div className="content-card">
          <h3>{page.surveysTitle}</h3>
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
            {!surveys.length ? <p className="empty-state">Aucune enquête disponible.</p> : null}
          </div>
        </div>
        <div className="content-card">
          {detail.title ? (
            <>
              <h3>{detail.title}</h3>
              <p style={{ color: "var(--text-light)" }}>{detail.longDescription}</p>
              <div className="doc-card-meta">
                <span>{detail.theme}</span>
                <a href={detail.accessUrl || "#"} target="_blank" rel="noopener noreferrer">{detail.accessLabel}</a>
              </div>
            </>
          ) : <p className="empty-state">Sélectionnez une enquête disponible.</p>}
        </div>
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
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
          {!history.length ? <p className="empty-state">Aucun historique disponible.</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function RhSection() {
  const { header, tabs, pages, offresIntro, offresList } = getRhData();
  const isViewActive = useViewActive("rh");
  const demoMode = Boolean(window.CMR_PLATFORM?.isDemo);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "carriere");
  const formationGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "CMR Academy", "Formation"), { enabled: !demoMode && isViewActive && activeTab === "formation" });

  useEffect(() => {
    const syncTab = (event) => setActiveTab(event.detail?.tab || tabs[0]?.id || "carriere");
    window.addEventListener("cmr:rh-tab", syncTab);
    return () => window.removeEventListener("cmr:rh-tab", syncTab);
  }, [tabs]);

  return (
    <div id="view-rh" className="view-section km-container">
      <div className="km-header">
        <h2>{header.title}</h2>
        <p>{header.description}</p>
      </div>
      <div className="km-navbar" style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 30, borderBottom: "2px solid #e2e8f0", overflowX: "auto" }}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <div data-rh-tab={tab.id} className={`km-nav-item${activeTab === tab.id ? " active" : ""}`} onClick={(event) => { setActiveTab(tab.id); runLegacyHandler(event, `switchRhPageTab('${tab.id}')`); }} style={{ whiteSpace: "nowrap", padding: "12px 16px" }}>
              {tab.label}
            </div>
            {index < tabs.length - 1 ? <span style={{ color: "#cbd5e1" }}>|</span> : null}
          </React.Fragment>
        ))}
      </div>
      <CareerPage page={pages.carriere || {}} active={isViewActive && activeTab === "carriere"} />
      <DocumentsPage page={pages.documents || {}} active={isViewActive && activeTab === "documents"} />
      <AttakmiliPage page={pages.attakmili || {}} active={isViewActive && activeTab === "attakmili"} />
      {demoMode
        ? <OffresPage offresIntro={offresIntro} offresList={offresList} />
        : <ConfiguredServicePage pageId="page-rh-offres" page={{ description: offresIntro, ...(pages.offres || {}) }} active={isViewActive && activeTab === "offres"} serviceKey="offres" title="Postes vacants" />}
      {demoMode
        ? <MobilitePage page={pages.mobilite || {}} />
        : <ConfiguredServicePage pageId="page-rh-mobilite" page={pages.mobilite || {}} active={isViewActive && activeTab === "mobilite"} serviceKey="mobilite" title="Mobilité spontanée" />}
      {demoMode
        ? <FormationPage pageId="page-rh-formation" page={pages.formation || {}} documents={formationGedState.documents} loading={false} apiEnabled={false} />
        : <ConfiguredServicePage pageId="page-rh-formation" page={pages.formation || {}} active={isViewActive && activeTab === "formation"} serviceKey="formation" title="Demande de formation" />}
      {demoMode
        ? <ServiceDemoPage pageId="page-rh-offres-formation" page={pages.offresFormation || {}} title="Offres de formation" />
        : <ConfiguredServicePage pageId="page-rh-offres-formation" page={pages.offresFormation || {}} active={isViewActive && activeTab === "offres-formation"} serviceKey="offresFormation" title="Offres de formation" />}
      <EnquetesPage page={pages.enquetes || {}} />
    </div>
  );
}

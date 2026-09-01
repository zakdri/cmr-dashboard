import React, { useEffect, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getOrgGovData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.orgGovHeader || {},
    tabs: data.orgGovMainTabs || [],
    overview: data.orgGovOverview || [],
    smallCards: data.orgGovSmallCards || [],
    pages: data.orgGovPages || {},
    strategieDocs: data.orgGovStrategieDocs || [],
  };
}

function CardTitle({ title, icon, iconClass }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${iconClass}`}>
        <i data-lucide={icon} style={{ width: 20, height: 20 }} />
      </div>
      {title}
    </div>
  );
}

function OverviewCard({ card }) {
  return (
    <a
      href="#"
      className="app-card-large"
      onClick={(event) => runLegacyHandler(event, card.handler)}
      style={{ "--hover-bg": card.hoverBg, "--hover-border": card.hoverBorder }}
    >
      <div
        className="app-card-icon-large"
        style={{ background: card.iconBackground }}
      >
        <i data-lucide={card.icon} style={{ width: 24, height: 24 }} />
      </div>
      <div className="app-card-content">
        <span className="app-card-title-large">{card.title}</span>
        <p className="app-card-desc">{card.desc}</p>
        <div className="app-card-action">
          {card.action}
          <i data-lucide="arrow-right" style={{ width: 14 }} />
        </div>
      </div>
    </a>
  );
}

function SmallCard({ card }) {
  return (
    <>
      <div className="app-category-title">{card.sectionTitle}</div>
      <div className="km-grid" style={{ marginBottom: 40 }}>
        <div
          className="doc-card"
          style={{ cursor: "pointer" }}
          onClick={(event) => runLegacyHandler(event, card.handler)}
        >
          <div className="doc-icon-large" style={card.iconStyle}>
            <i data-lucide={card.icon} style={{ width: 24, height: 24 }} />
          </div>
          <div className="doc-card-title">{card.title}</div>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginTop: 8,
            }}
          >
            {card.desc}
          </p>
          <div className="doc-card-meta">
            <span style={{ color: card.actionColor, fontWeight: 700 }}>
              {card.action}
            </span>
            <i data-lucide="arrow-right" style={{ width: 16 }} />
          </div>
        </div>
      </div>
    </>
  );
}

function SimpleDocCard({ doc }) {
  return (
    <div
      className="doc-card"
      style={{ cursor: "pointer" }}
      onClick={(event) =>
        runLegacyHandler(
          event,
          `openMockDownload('${doc.file}','${doc.downloadTitle}');`,
        )
      }
    >
      <div className="doc-icon-large pdf">
        <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
      </div>
      <div className="doc-card-title">{doc.title}</div>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-light)",
          marginTop: 8,
        }}
      >
        {doc.description}
      </p>
      <div className="doc-card-meta">
        <span>{doc.action}</span>
        <i data-lucide="download" style={{ width: 16, color: "#94a3b8" }} />
      </div>
    </div>
  );
}

function DynamicCardPage({ page, children }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle title={page.title} icon={page.icon} iconClass={page.iconClass} />
      </div>
      {children}
    </div>
  );
}

function SummaryText({ children }) {
  if (!children) return null;
  return (
    <p style={{ color: "var(--text-light)", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>
      {children}
    </p>
  );
}

export default function InstitutionnelSection() {
  const { header, tabs, overview, smallCards, pages, strategieDocs } =
    getOrgGovData();
  const [isOrgChartExpanded, setIsOrgChartExpanded] = useState(false);

  useEffect(() => {
    if (!isOrgChartExpanded) return undefined;

    document.body.classList.add("org-chart-expanded");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOrgChartExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("org-chart-expanded");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOrgChartExpanded]);

  useEffect(() => {
    requestAnimationFrame(() => window.lucide?.createIcons());
  }, [isOrgChartExpanded]);

  return (
    <>
      <div id="view-institutionnel" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="orgGovMainNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 12,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {index > 0 && (
                <span
                  style={{
                    color: "#cbd5e1",
                    fontWeight: 300,
                    fontSize: 18,
                    lineHeight: 1,
                    alignSelf: "center",
                    flexShrink: 0,
                  }}
                >
                  |
                </span>
              )}
              <div
                data-orggov-section={tab.id}
                className={`km-nav-item${index === 0 ? " active" : ""}`}
                onClick={(event) =>
                  runLegacyHandler(event, `switchOrgGovSection('${tab.id}')`)
                }
                style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
              >
                {tab.label}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div
          className="km-navbar"
          id="orgGovSubNavbar"
          style={{
            display: "none",
            alignItems: "center",
            gap: 0,
            marginBottom: 24,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>

        <div
          id="page-orggov-overview"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          {overview.map((section) => (
            <React.Fragment key={section.title}>
              <div className="app-category-title">{section.title}</div>
              <div
                className="app-grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 24,
                  marginBottom: 40,
                }}
              >
                {(section.cards || []).map((card) => (
                  <OverviewCard key={card.title} card={card} />
                ))}
              </div>
            </React.Fragment>
          ))}
          {smallCards.map((card) => (
            <SmallCard key={card.title} card={card} />
          ))}
        </div>

        <div
          id="page-orggov-organigramme"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <SummaryText>{pages.organisation?.description}</SummaryText>
          <div
            className={`cmr-org-chart-viewer${
              isOrgChartExpanded ? " is-expanded" : ""
            }`}
          >
            <div className="cmr-org-chart-toolbar">
              <div>
                <div className="app-category-title" style={{ margin: 0 }}>
                  {pages.organigramme?.title}
                </div>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: 13,
                    color: "var(--text-light)",
                  }}
                >
                  {pages.organigramme?.description}
                </p>
              </div>
              <button
                type="button"
                className="cmr-org-fullscreen-button"
                onClick={() => setIsOrgChartExpanded((expanded) => !expanded)}
                aria-pressed={isOrgChartExpanded}
                title={
                  isOrgChartExpanded
                    ? "Réduire l’organigramme"
                    : "Agrandir l’organigramme dans la page"
                }
              >
                <i
                  data-lucide={isOrgChartExpanded ? "minimize-2" : "maximize-2"}
                  aria-hidden="true"
                />
                <span>
                  {isOrgChartExpanded ? "Réduire" : "Agrandir"}
                </span>
              </button>
            </div>
            <div className="cmr-org-chart-shell">
              <div id="orgTree" />
            </div>
          </div>
        </div>

        <div
          id="page-orggov-postes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <SummaryText>{pages.organisation?.description}</SummaryText>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <div>
              <div className="app-category-title" style={{ margin: 0 }}>
                {pages.postes?.title}
              </div>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 13,
                  color: "var(--text-light)",
                }}
              >
                {pages.postes?.description}
              </p>
            </div>
            <div className="actu-search-wrap" style={{ maxWidth: 420 }}>
              <i data-lucide="search" className="actu-search-icon" />
              <input
                id="postesSearchInput"
                type="text"
                className="actu-search-input"
                placeholder={pages.postes?.searchPlaceholder || "Rechercher une fiche ou une fonction..."}
                onInput={(event) =>
                  runLegacyHandler(event, "searchPostes(this.value)")
                }
              />
            </div>
          </div>
          <div
            className="dashboard-grid cmr-position-workspace"
          >
            <div className="dashboard-card cmr-position-list-panel">
              <div className="card-header">
                <CardTitle
                  title={pages.postes?.listTitle}
                  icon="briefcase"
                  iconClass="purple"
                />
                <span id="postesCount" className="cmr-position-count" />
              </div>
              <div id="postesList" className="doc-list" />
              <div id="postesPagination" className="cmr-position-pagination" />
            </div>
            <div className="dashboard-card cmr-position-detail-panel">
              <div className="card-header">
                <CardTitle
                  title={pages.postes?.detailTitle}
                  icon="file-text"
                  iconClass="orange"
                />
              </div>
              <div
                id="postesDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                {pages.postes?.emptyDetail}
              </div>
            </div>
          </div>
        </div>

        <div
          id="page-orggov-presentation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.presentation?.title}
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 26,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <i data-lucide="presentation" style={{ width: 20, height: 20 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>
                  {pages.presentation?.panelTitle}
                </div>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.7",
                  }}
                >
                  {pages.presentation?.description}
                </p>
              </div>
            </div>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e2e8f0",
                margin: "18px 0",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 14,
              }}
            >
              {(pages.presentation?.items || []).map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#1e293b" }}>
                    {item.title}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      color: "var(--text-light)",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          id="page-orggov-strategie"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.strategie?.title}
          </div>
          <div className="km-grid">
            {strategieDocs.map((doc) => (
              <SimpleDocCard key={doc.file} doc={doc} />
            ))}
          </div>
        </div>

        <div
          id="page-orggov-referentiels"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <SummaryText>{pages.organisation?.description}</SummaryText>
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.referentiels?.title}
          </div>
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.referentiels?.foldersTitle}
                  icon="folder"
                  iconClass="purple"
                />
              </div>
              <div id="refDossiers" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.referentiels?.documentsTitle}
                  icon="file-text"
                  iconClass="blue"
                />
              </div>
              <div id="refDocs" className="doc-list" />
            </div>
          </div>
        </div>

        <div
          id="page-orggov-comites"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.comites?.title}
          </div>
          <div
            className="dashboard-grid"
            style={{
              gridTemplateColumns: "1.2fr 1.8fr",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.comites?.listTitle}
                  icon="users-round"
                  iconClass="orange"
                />
              </div>
              <div id="comitesList" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.comites?.detailTitle}
                  icon="file-text"
                  iconClass="green"
                />
              </div>
              <div
                id="comitesDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                {pages.comites?.emptyDetail}
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle
                title={pages.comites?.timelineTitle}
                icon="calendar-range"
                iconClass="blue"
              />
            </div>
            <div style={{ padding: 18 }}>
              <div id="orgGovComitesTimeline" />
            </div>
          </div>
        </div>

        <div id="page-orggov-smi-politiques" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-politiques"] || {}}>
            <div id="orgGovSmiPolitiques" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-cartographie" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-cartographie"] || {}}>
            <div id="orgGovSmiCartographie" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-dossiers" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-dossiers"] || {}}>
            <div id="orgGovSmiDossiers" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-pilotage" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-pilotage"] || {}}>
            <div id="orgGovSmiPilotage" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-gouvernance-interne" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-gouvernance-interne"] || {}}>
            <div id="orgGovSmiGovernance" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-audits" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-audits"] || {}}>
            <div id="orgGovSmiAudits" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-certification" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-certification"] || {}}>
            <div id="orgGovSmiCertification" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-normes" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{pages.smi?.description}</SummaryText>
          <DynamicCardPage page={pages["smi-normes"] || {}}>
            <div id="orgGovSmiNormes" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-cartographie" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages.cartographie || {}}>
            <div id="orgGovCartographie" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-kpi-strategiques" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["kpi-strategiques"] || {}}>
            <div id="orgGovKpiStrategiques" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-rapports-gouvernance" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["rapports-gouvernance"] || {}}>
            <div id="orgGovRapportsGouvernance" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>

        {[
          ["culture-contenus", "orgGovCultureContents"],
          ["culture-faq", "orgGovCultureFaq"],
          ["culture-communication", "orgGovCultureCommunication"],
          ["culture-quiz", "orgGovCultureQuiz"],
          ["culture-idees", "orgGovCultureIdeas"],
          ["culture-remontees", "orgGovCultureRemontees"],
          ["culture-stats", "orgGovCultureStats"],
        ].map(([id, hostId]) => (
          <div key={id} id={`page-orggov-${id}`} className="km-tab-content" style={{ display: "none" }}>
            <SummaryText>{pages["culture-qse-rse"]?.description}</SummaryText>
            <DynamicCardPage page={pages[id] || {}}>
              <div id={hostId} style={{ padding: 18 }} />
            </DynamicCardPage>
          </div>
        ))}

        <div
          id="page-orggov-direction"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.direction?.title}
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 26,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                DG
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--cmr-primary)",
                      background: "#eff6ff",
                      padding: "4px 10px",
                      borderRadius: 999,
                    }}
                  >
                    {pages.direction?.badge}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <i data-lucide="calendar" style={{ width: 14, height: 14 }} />
                    {pages.direction?.date}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 18,
                    color: "#0f172a",
                    marginTop: 10,
                  }}
                >
                  {pages.direction?.messageTitle}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.8",
                  }}
                >
                  {pages.direction?.message}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    className="secondary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, pages.direction?.downloadHandler)
                    }
                  >
                    Télécharger la note
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, pages.direction?.newsHandler)
                    }
                  >
                    Voir l’actualité liée
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

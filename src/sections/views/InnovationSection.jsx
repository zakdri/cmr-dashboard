import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getInnovationData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.innovationHeader || {},
    tabs: data.innovationTabs || [],
    pages: data.innovationPages || {},
    axisFilters: data.innovationAxisFilters || [],
    roleFilters: data.innovationRoleFilters || [],
  };
}

function CardTitle({ page, titleKey = "title", iconKey = "icon", iconClassKey = "iconClass" }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${page[iconClassKey]}`}>
        <i data-lucide={page[iconKey]} style={{ width: 20, height: 20 }} />
      </div>
      {page[titleKey]}
    </div>
  );
}

function DashboardCard({ page, children, action, titleKey, iconKey, iconClassKey }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle page={page} titleKey={titleKey} iconKey={iconKey} iconClassKey={iconClassKey} />
        {action}
      </div>
      {children}
    </div>
  );
}

export default function InnovationSection() {
  const { header, tabs, pages, axisFilters, roleFilters } = getInnovationData();
  const ideation = pages.ideation || {};
  const social = pages.social || {};
  const openlab = pages.openlab || {};
  const excelway = pages.excelway || {};

  return (
    <>
      <div id="view-innovation" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 30,
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {index > 0 && (
                <span style={{ color: "#cbd5e1", fontWeight: 300, fontSize: 18, lineHeight: 1, alignSelf: "center", flexShrink: 0 }}>
                  |
                </span>
              )}
              <div
                className={`km-nav-item${index === 0 ? " active" : ""}`}
                onClick={(event) => runLegacyHandler(event, `switchInnovationTab('${tab.id}')`)}
                style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
              >
                {tab.label}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div id="page-innovation-ideation" className="km-tab-content" style={{ display: "block" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard
              page={ideation}
              action={
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "toggleIdeaForm(true)")}>
                  Proposer une idée
                </button>
              }
            >
              <div id="ideaList" className="doc-list" />
            </DashboardCard>
            <div className="dashboard-card" id="ideaFormCard" style={{ display: "none" }}>
              <div className="card-header">
                <CardTitle page={ideation} titleKey="formTitle" iconKey="formIcon" iconClassKey="formIconClass" />
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "toggleIdeaForm(false)")}>
                  Fermer
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input id="ideaTitle" className="actu-search-input" placeholder="Titre de l'idée" />
                  <select id="ideaAxis" className="actu-search-input" style={{ height: 40 }}>
                    {(ideation.axisOptions || []).map((axis) => (
                      <option value={axis} key={axis}>
                        {axis}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  id="ideaDesc"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder="Décrire l'idée, le besoin ou le problème à résoudre..."
                  defaultValue={""}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitIdea()")}>
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
            <DashboardCard page={ideation} titleKey="detailTitle" iconKey="detailIcon" iconClassKey="detailIconClass">
              <div id="ideaDetail" style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
                {ideation.emptyDetail}
              </div>
            </DashboardCard>
          </div>
        </div>
        <div id="page-innovation-suivi" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.suivi || {}}>
            <div id="innovationProjects" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-innovation-veille" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.veille || {}}>
            <div id="innovationFeed" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-innovation-social" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={social} titleKey="commentsTitle" iconKey="commentsIcon" iconClassKey="commentsIconClass">
              <div id="innovationComments" style={{ padding: 18 }} />
            </DashboardCard>
            <DashboardCard page={social} titleKey="reactionsTitle" iconKey="reactionsIcon" iconClassKey="reactionsIconClass">
              <div id="innovationReactions" style={{ padding: 18 }} />
            </DashboardCard>
          </div>
        </div>
        <div id="page-innovation-ateliers" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.ateliers || {}}>
            <div id="innovationEvents" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-innovation-axes" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.axes || {}}>
            <div style={{ padding: 18 }}>
              <div id="innovationAxesFilters" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {axisFilters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`actu-filter-btn${filter.active ? " active" : ""}`}
                    onClick={(event) => runLegacyHandler(event, `filterInnovationAxis('${filter.value}', this)`)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div id="innovationAxesGrid" className="km-grid" style={{ marginTop: 18 }} />
            </div>
          </DashboardCard>
        </div>
        <div id="page-innovation-openlab" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={openlab} titleKey="portfolioTitle" iconKey="portfolioIcon" iconClassKey="portfolioIconClass">
              <div id="openlabPortfolio" className="doc-list" />
            </DashboardCard>
            <DashboardCard page={openlab} titleKey="dashboardTitle" iconKey="dashboardIcon" iconClassKey="dashboardIconClass">
              <div id="openlabDashboard" style={{ padding: 18 }} />
            </DashboardCard>
          </div>
        </div>
        <div id="page-innovation-excelway" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={excelway} titleKey="listTitle" iconKey="listIcon" iconClassKey="listIconClass">
              <div id="innovationExcelwayList" className="doc-list" />
            </DashboardCard>
            <DashboardCard page={excelway} titleKey="panelTitle" iconKey="panelIcon" iconClassKey="panelIconClass">
              <div id="innovationExcelwayPanel" style={{ padding: 18 }} />
            </DashboardCard>
          </div>
        </div>
        <div id="page-innovation-droits" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.droits || {}}>
            <div style={{ padding: 18 }}>
              <p style={{ margin: 0, color: "var(--text-light)", fontSize: 13, lineHeight: "1.7" }}>
                {pages.droits?.description}
              </p>
              <div id="innovationRoleFilters" style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {roleFilters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`actu-filter-btn${filter.active ? " active" : ""}`}
                    onClick={(event) => runLegacyHandler(event, `setInnovationRole('${filter.value}', this)`)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div id="innovationAccessPanel" style={{ marginTop: 16 }} />
            </div>
          </DashboardCard>
        </div>
      </div>
    </>
  );
}

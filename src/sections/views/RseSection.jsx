import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getRseData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.rseHeader || {},
    pages: data.rsePages || {},
  };
}

function CardTitle({ page }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${page.iconClass}`}>
        <i data-lucide={page.icon} style={{ width: 20, height: 20 }} />
      </div>
      {page.title}
    </div>
  );
}

function DashboardCard({ page, children, action }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle page={page} />
        {action}
      </div>
      {children}
    </div>
  );
}

function DetailCard({ page, id, emptyText }) {
  return (
    <DashboardCard page={page}>
      <div
        id={id}
        style={{
          padding: 18,
          color: "var(--text-light)",
          fontSize: 13,
        }}
      >
        {emptyText}
      </div>
    </DashboardCard>
  );
}

export default function RseSection() {
  const { header, pages } = getRseData();
  const idees = pages.idees || {};
  const contributions = pages.contributions || {};

  return (
    <>
      <div id="view-rse" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="rseMainNavbar"
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
        ></div>
        <div
          className="km-navbar"
          id="rseSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 30,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>
        {["politiques", "chartes", "codes", "guides"].map((id, index) => (
          <div
            key={id}
            id={`page-rse-${id}`}
            className="km-tab-content"
            style={{ display: index === 0 ? "block" : "none" }}
          >
            <div className="km-grid" id={`rse${id[0].toUpperCase()}${id.slice(1)}Grid`} />
          </div>
        ))}
        <div id="page-rse-rapports" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.rapports || {}}>
            <div id="rseRapportsList" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-rse-actions" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.actions || {}}>
            <div id="rseActionsGrid" className="km-grid" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-rse-infos" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.infos || {}}>
            <div id="rseInfos" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-rse-idees" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard
              page={idees}
              action={
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "toggleRseIdeaForm(true)")}>
                  {idees.submitLabel}
                </button>
              }
            >
              <div id="rseIdeaList" className="doc-list" />
            </DashboardCard>
            <div className="dashboard-card" id="rseIdeaForm" style={{ display: "none" }}>
              <div className="card-header">
                <CardTitle page={{ title: idees.formTitle, icon: idees.formIcon, iconClass: idees.formIconClass }} />
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "toggleRseIdeaForm(false)")}>
                  {idees.closeLabel}
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input id="rseIdeaTitle" className="actu-search-input" placeholder={idees.titlePlaceholder} />
                <textarea id="rseIdeaDesc" className="actu-search-input" style={{ marginTop: 12, height: 120, paddingTop: 10 }} placeholder={idees.descriptionPlaceholder} defaultValue={""} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitRseIdea()")}>
                    {idees.sendLabel}
                  </button>
                </div>
              </div>
            </div>
            <DetailCard page={{ title: idees.detailTitle, icon: idees.detailIcon, iconClass: idees.detailIconClass }} id="rseIdeaDetail" emptyText={idees.emptyDetail} />
          </div>
        </div>
        <div id="page-rse-contributions" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard
              page={contributions}
              action={
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "toggleRseContributionForm(true)")}>
                  {contributions.publishLabel}
                </button>
              }
            >
              <div id="rseContribList" className="doc-list" />
            </DashboardCard>
            <div className="dashboard-card" id="rseContribForm" style={{ display: "none" }}>
              <div className="card-header">
                <CardTitle page={{ title: contributions.formTitle, icon: contributions.formIcon, iconClass: contributions.formIconClass }} />
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "toggleRseContributionForm(false)")}>
                  {contributions.closeLabel}
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input id="rseContribTitle" className="actu-search-input" placeholder={contributions.titlePlaceholder} />
                <textarea id="rseContribBody" className="actu-search-input" style={{ marginTop: 12, height: 120, paddingTop: 10 }} placeholder={contributions.bodyPlaceholder} defaultValue={""} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitRseContribution()")}>
                    {contributions.publishLabel}
                  </button>
                </div>
              </div>
            </div>
            <DetailCard page={{ title: contributions.detailTitle, icon: contributions.detailIcon, iconClass: contributions.detailIconClass }} id="rseContribDetail" emptyText={contributions.emptyDetail} />
          </div>
        </div>
        <div id="page-rse-rex" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.rex || {}}>
            <div id="rseRexList" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-rse-axes" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.axes || {}}>
            <div style={{ padding: 18 }}>
              <div id="rseAxisFilters" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(pages.axes?.filters || []).map((filter) => (
                  <button
                    key={filter.value}
                    className={`actu-filter-btn${filter.active ? " active" : ""}`}
                    onClick={(event) => runLegacyHandler(event, `filterRseAxis('${filter.value}', this)`)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div id="rseAxesGrid" className="km-grid" style={{ marginTop: 18 }} />
            </div>
          </DashboardCard>
        </div>
        <div id="page-rse-echanges" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.echanges || {}}>
            <div id="rseEchanges" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-rse-sensibilisation" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.sensibilisation || {}}>
            <div id="rseSensibilisation" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-rse-animation" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.animation || {}}>
            <div id="rseAnimation" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
      </div>
    </>
  );
}

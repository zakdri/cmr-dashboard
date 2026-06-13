import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getQseData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.qseHeader || {},
    pages: data.qsePages || {},
    ideaTypes: data.qseIdeaTypes || [],
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

function DashboardCard({ page, children }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle page={page} />
      </div>
      {children}
    </div>
  );
}

export default function QseSection() {
  const { header, pages, ideaTypes } = getQseData();
  const auditsColumns = pages.audits?.columns || [];

  return (
    <>
      <div id="view-qse" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="qseMainNavbar"
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
          id="qseSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 16,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>
        <div id="page-qse-politiques" className="km-tab-content" style={{ display: "block" }}>
          <div className="km-grid" id="qsePolitiquesGrid" />
        </div>
        <div id="page-qse-referentiels" className="km-tab-content" style={{ display: "none" }}>
          <div className="km-grid" id="qseReferentielsGrid" />
        </div>
        <div id="page-qse-docs" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.docs || {}}>
            <div id="qseSmiDocs" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-qse-contenus" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.contenus || {}}>
            <div id="qsePedago" className="km-grid" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-qse-audits" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.audits || {}}>
            <div style={{ padding: 18 }}>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      {auditsColumns.map((column, index) => (
                        <th
                          key={column}
                          style={{
                            padding: "12px 16px",
                            textAlign: index === auditsColumns.length - 1 ? "right" : "left",
                            fontWeight: 700,
                            color: "#475569",
                          }}
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody id="qseAuditsTable" />
                </table>
              </div>
            </div>
          </DashboardCard>
        </div>
        <div id="page-qse-resultats-audits" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages["resultats-audits"] || {}}>
            <div id="qseResultatsAudits" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-qse-indicateurs" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.indicateurs || {}}>
            <div id="qseKpis" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-qse-idees" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.idees || {}}>
            <div style={{ padding: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input id="qseIdeaTitle" className="actu-search-input" placeholder="Titre de l'idée" />
                <select id="qseIdeaType" className="actu-search-input" style={{ height: 40 }}>
                  {ideaTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                id="qseIdeaDesc"
                className="actu-search-input"
                style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                placeholder="Décrire l'idée..."
                defaultValue={""}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitQseIdea()")}>
                  Soumettre
                </button>
              </div>
            </div>
            <div id="qseIdeaList" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-qse-contributions" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.contributions || {}}>
            <div style={{ padding: 18 }}>
              <div className="km-grid" id="qseContributionsGrid" />
            </div>
          </DashboardCard>
        </div>
        <div id="page-qse-remontees" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.remontees || {}}>
            <div style={{ padding: 18 }}>
              <input id="qseRemTitle" className="actu-search-input" placeholder="Titre de la remontée" />
              <textarea
                id="qseRemDesc"
                className="actu-search-input"
                style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                placeholder="Décrire la remontée terrain..."
                defaultValue={""}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitQseRemontee()")}>
                  Déclarer
                </button>
              </div>
            </div>
            <div id="qseRemList" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-qse-stats" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.stats || {}}>
            <div id="qseStats" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
        <div id="page-qse-culture" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.culture || {}}>
            <div id="qseCulture" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>
        <div id="page-qse-culture-portail" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages["culture-portail"] || {}}>
            <div id="qseCulturePortail" className="km-grid" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function QseSection() {
  return (
    <>
      <div id="view-qse" className="view-section km-container">
        <div className="km-header">
          <h2>Espace QSE</h2>
          <p>
            Qualité, sécurité, environnement — référentiels, SMI,
            sensibilisation, pilotage, participation et culture QSE,
            conformément au cadrage CMS.
          </p>
        </div>
        {/* Sous‑rubriques (niveau 1) */}
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
        {/* Sous‑rubriques (niveau 2 — selon sous‑rubrique principale) */}
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
        <div
          id="page-qse-politiques"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="km-grid" id="qsePolitiquesGrid" />
        </div>
        <div
          id="page-qse-referentiels"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid" id="qseReferentielsGrid" />
        </div>
        <div
          id="page-qse-docs"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="folder-open"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Documents SMI
              </div>
            </div>
            <div
              id="qseSmiDocs"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-qse-contenus"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i
                    data-lucide="megaphone"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Contenus pédagogiques
              </div>
            </div>
            <div id="qsePedago" className="km-grid" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-qse-audits"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="clipboard-check"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Audits
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        Audit
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        Statut
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        Rapport
                      </th>
                    </tr>
                  </thead>
                  <tbody id="qseAuditsTable" />
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          id="page-qse-resultats-audits"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i
                    data-lucide="clipboard-list"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Résultats d'audits — synthèses
              </div>
            </div>
            <div id="qseResultatsAudits" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-qse-indicateurs"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="gauge" style={{ width: 20, height: 20 }} />
                </div>
                Indicateurs QSE
              </div>
            </div>
            <div id="qseKpis" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-qse-idees"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i
                    data-lucide="lightbulb"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Boîte à idées QSE
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <input
                  id="qseIdeaTitle"
                  className="actu-search-input"
                  placeholder="Titre"
                />
                <select
                  id="qseIdeaType"
                  className="actu-search-input"
                  style={{ height: 40 }}
                >
                  <option value="Qualité">Qualité</option>
                  <option value="Sécurité">Sécurité</option>
                  <option value="Environnement">Environnement</option>
                </select>
              </div>
              <textarea
                id="qseIdeaDesc"
                className="actu-search-input"
                style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                placeholder="Votre idée…"
                defaultValue={""}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "submitQseIdea()")
                  }
                >
                  Soumettre
                </button>
              </div>
            </div>
            <div
              id="qseIdeaList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-qse-contributions"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="users" style={{ width: 20, height: 20 }} />
                </div>
                Contributions collaborateurs
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="km-grid" id="qseContributionsGrid" />
            </div>
          </div>
        </div>
        <div
          id="page-qse-remontees"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="alert-triangle"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Remontées terrain
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <input
                id="qseRemTitle"
                className="actu-search-input"
                placeholder="Objet / anomalie"
              />
              <textarea
                id="qseRemDesc"
                className="actu-search-input"
                style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                placeholder="Description…"
                defaultValue={""}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "submitQseRemontee()")
                  }
                >
                  Déclarer
                </button>
              </div>
            </div>
            <div
              id="qseRemList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-qse-stats"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="bar-chart-3"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Statistiques
              </div>
            </div>
            <div id="qseStats" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-qse-culture"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i data-lucide="sparkles" style={{ width: 20, height: 20 }} />
                </div>
                Culture QSE — sensibilisation globale
              </div>
            </div>
            <div
              id="qseCulture"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-qse-culture-portail"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="layout-grid"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Portail Culture QSE
              </div>
            </div>
            <div
              id="qseCulturePortail"
              className="km-grid"
              style={{ padding: 18 }}
            />
          </div>
        </div>
      </div>
      {/* SITD VIEW (table conforme — onglet 15. Espace SITD) */}
    </>
  );
}

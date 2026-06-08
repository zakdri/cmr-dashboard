import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function ReglementationSection() {
  return (
    <>
      <div id="view-reglementation" className="view-section km-container">
        <div className="km-header">
          <h2>Espace Réglementaire</h2>
          <p>
            Référentiels réglementaires et internes, structuration, recherche,
            GED, gouvernance, validation, traçabilité et archivage —
            conformément au cadrage CMS.
          </p>
        </div>
        {/* Sous‑rubriques (niveau 1) */}
        <div
          className="km-navbar"
          id="regMainNavbar"
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
          id="regSubNavbar"
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
        {/* Référentiels réglementaires */}
        <div
          id="page-reg-textes"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="file-text"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Textes officiels
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="regTextesSearch"
                  className="actu-search-input"
                  placeholder="Rechercher un texte, une référence, un mot-clé…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderRegTextes()")
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTextesType('all', this)")
                  }
                >
                  Tous
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTextesType('Loi', this)")
                  }
                >
                  Lois
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTextesType('Décret', this)")
                  }
                >
                  Décrets
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setRegTextesType('Circulaire', this)",
                    )
                  }
                >
                  Circulaires
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setRegTextesType('Décision', this)",
                    )
                  }
                >
                  Décisions
                </button>
              </div>
              <div id="regTextesList" className="doc-list" />
            </div>
          </div>
        </div>
        {/* Structuration */}
        <div
          id="page-reg-thematiques"
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
                Thématiques
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTheme('all', this)")
                  }
                >
                  Toutes
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTheme('Retraite', this)")
                  }
                >
                  Retraite
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTheme('Gouvernance', this)")
                  }
                >
                  Gouvernance
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTheme('Finance', this)")
                  }
                >
                  Finance
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegTheme('Sécurité', this)")
                  }
                >
                  Sécurité
                </button>
              </div>
              <div className="km-grid" id="regThematicsGrid" />
            </div>
          </div>
        </div>
        {/* Référentiels internes */}
        <div
          id="page-reg-procedures"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="list-checks"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Procédures
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="regProcSearch"
                  className="actu-search-input"
                  placeholder="Rechercher une procédure…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderRegProcedures()")
                  }
                />
              </div>
              <div id="regProceduresList" className="doc-list" />
            </div>
          </div>
        </div>
        <div
          id="page-reg-notes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i
                    data-lucide="book-open"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Notes / guides
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div id="regNotesList" className="doc-list" />
            </div>
          </div>
        </div>
        {/* Recherche */}
        <div
          id="page-reg-moteur"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="search" style={{ width: 20, height: 20 }} />
                </div>
                Moteur de recherche
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap">
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="regGlobalSearch"
                  className="actu-search-input"
                  placeholder="Recherche multi-sources (textes, procédures, notes)…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderRegGlobalSearch()")
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 12,
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegGlobalScope('all', this)")
                  }
                >
                  Tout
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegGlobalScope('textes', this)")
                  }
                >
                  Textes
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setRegGlobalScope('procedures', this)",
                    )
                  }
                >
                  Procédures
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegGlobalScope('notes', this)")
                  }
                >
                  Notes
                </button>
              </div>
              <div
                id="regGlobalResults"
                className="doc-list"
                style={{ marginTop: 12 }}
              />
            </div>
          </div>
        </div>
        {/* GED */}
        <div
          id="page-reg-ged"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="database" style={{ width: 20, height: 20 }} />
                </div>
                Archivage — lien GED
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.7",
                  }}
                >
                  Accéder aux versions archivées via la GED (maquette).
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "openMockDownload('Lien_GED.pdf','Accès GED')",
                    )
                  }
                >
                  Lien / accès GED
                </button>
              </div>
              <div
                style={{
                  marginTop: 14,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 900, color: "#0f172a" }}>
                  Dernières versions archivées
                </div>
                <div
                  id="regGedList"
                  className="doc-list"
                  style={{ marginTop: 10 }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Gouvernance */}
        <div
          id="page-reg-gestion"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i data-lucide="settings" style={{ width: 20, height: 20 }} />
                </div>
                Gestion des contenus (back‑office)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "regCreateContent()")
                  }
                >
                  Créer un contenu
                </button>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "renderRegGestion()")
                  }
                >
                  Rafraîchir
                </button>
              </div>
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
                        Contenu
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        Type
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody id="regGestionTable" />
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Validation */}
        <div
          id="page-reg-workflow"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="check-circle-2"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Workflow validation
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  color: "var(--text-light)",
                  fontSize: 13,
                  lineHeight: "1.7",
                  marginBottom: 12,
                }}
              >
                Validation obligatoire avant publication (maquette).
              </div>
              <div id="regWorkflowQueue" className="doc-list" />
            </div>
          </div>
        </div>
        {/* Traçabilité */}
        <div
          id="page-reg-historique"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="history" style={{ width: 20, height: 20 }} />
                </div>
                Historique (journal)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegHistoryFilter('all', this)")
                  }
                >
                  Tout
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setRegHistoryFilter('create', this)",
                    )
                  }
                >
                  Créations
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setRegHistoryFilter('update', this)",
                    )
                  }
                >
                  Modifications
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setRegHistoryFilter('validate', this)",
                    )
                  }
                >
                  Validations
                </button>
              </div>
              <div id="regHistoryList" className="doc-list" />
            </div>
          </div>
        </div>
        {/* Archivage */}
        <div
          id="page-reg-archives"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i data-lucide="archive" style={{ width: 20, height: 20 }} />
                </div>
                Documents actifs / archivés
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "setRegArchiveMode('actifs', this)")
                  }
                >
                  Actifs{" "}
                  <span style={{ opacity: ".7", fontSize: 10 }}>
                    (en vigueur)
                  </span>
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setRegArchiveMode('archives', this)",
                    )
                  }
                >
                  Archivés{" "}
                  <span style={{ opacity: ".7", fontSize: 10 }}>
                    (indicateur)
                  </span>
                </button>
              </div>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="filter" style={{ width: 16 }} />
                <input
                  id="regArchiveTag"
                  className="actu-search-input"
                  placeholder="Filtrer / identifier par tag (ex: 2026, retraite, finance)…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderRegArchives()")
                  }
                />
              </div>
              <div id="regArchivesList" className="doc-list" />
            </div>
          </div>
        </div>
      </div>
      {/* COLLABORATIFS VIEW */}
    </>
  );
}

import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function DocumentairesSection() {
  return (
    <>
      <div id="view-documentaires" className="view-section km-container">
        <div className="km-header">
          <h2>Espaces métiers</h2>
          <p>
            Domaines métiers, référentiels, livrables, intégration SI,
            structuration et médiathèque.
          </p>
        </div>
        {/* Sous‑rubriques (niveau 1) */}
        <div
          className="km-navbar"
          id="metiersMainNavbar"
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
          id="metiersSubNavbar"
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
        {/* Structuration métier */}
        <div
          id="page-metiers-domaines"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="network" style={{ width: 20, height: 20 }} />
                </div>
                Domaines métiers
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
                Organisation des espaces selon les différents métiers de la CMR
                (maquette).
              </div>
              <div id="metiersDomainesNav" className="km-grid" />
              <div
                id="metiersDomainesDetail"
                style={{
                  marginTop: 12,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 14,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un domaine.
              </div>
            </div>
          </div>
        </div>
        {/* Référentiels métiers */}
        <div
          id="page-metiers-referentiels"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="folder-open"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Fournisseurs / projets / applications
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="metiersRefSearch"
                  className="actu-search-input"
                  placeholder="Rechercher (référentiel, application, projet…)…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersReferentiels()")
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
                    runLegacyHandler(event, "setMetiersRefType('all', this)")
                  }
                >
                  Tous
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setMetiersRefType('Fournisseur', this)",
                    )
                  }
                >
                  Fournisseurs
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setMetiersRefType('Projet', this)")
                  }
                >
                  Projets
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setMetiersRefType('Application', this)",
                    )
                  }
                >
                  Applications
                </button>
              </div>
              <div id="metiersRefList" className="doc-list" />
            </div>
          </div>
        </div>
        {/* Documents métiers */}
        <div
          id="page-metiers-livrables"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="file-stack"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Livrables
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="metiersLivSearch"
                  className="actu-search-input"
                  placeholder="Rechercher un livrable…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersLivrables()")
                  }
                />
              </div>
              <div id="metiersLivList" className="doc-list" />
            </div>
          </div>
        </div>
        {/* Intégration SI */}
        <div
          id="page-metiers-si"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i data-lucide="plug" style={{ width: 20, height: 20 }} />
                </div>
                Systèmes existants
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr .6fr",
                  gap: 12,
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    Accès / intégration SI
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      color: "var(--text-light)",
                      fontSize: 13,
                      lineHeight: "1.7",
                    }}
                  >
                    Permettre l’accès ou l’intégration avec d’autres outils SI
                    (maquette). Dépend SI.
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className="primary-btn"
                      onClick={(event) =>
                        runLegacyHandler(
                          event,
                          "openMockDownload('Catalogue_APIs_SI.pdf','Catalogue APIs SI')",
                        )
                      }
                    >
                      Catalogue APIs
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={(event) =>
                        runLegacyHandler(
                          event,
                          "openMockDownload('Guide_SSO_Acces.pdf','Guide SSO & Accès')",
                        )
                      }
                    >
                      Guide accès
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    Widget état
                  </div>
                  <div
                    id="metiersSiWidget"
                    style={{
                      marginTop: 10,
                      color: "var(--text-light)",
                      fontSize: 13,
                      lineHeight: "1.7",
                    }}
                  />
                  <button
                    className="actu-filter-btn"
                    style={{ marginTop: 10 }}
                    onClick={(event) =>
                      runLegacyHandler(event, "renderMetiersSiWidget(true)")
                    }
                  >
                    Actualiser
                  </button>
                </div>
              </div>
              <div
                style={{
                  marginTop: 12,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 900, color: "#0f172a" }}>
                  Systèmes connectés
                </div>
                <div
                  id="metiersSiList"
                  className="doc-list"
                  style={{ marginTop: 10 }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Structuration */}
        <div
          id="page-metiers-thematiques"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="tags" style={{ width: 20, height: 20 }} />
                </div>
                Thématiques
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="filter" style={{ width: 16 }} />
                <input
                  id="metiersThemeSearch"
                  className="actu-search-input"
                  placeholder="Filtrer / navigation (ex: liquidation, contrôle, SI)…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersThemes()")
                  }
                />
              </div>
              <div className="km-grid" id="metiersThemesGrid" />
            </div>
          </div>
        </div>
        {/* Multimédia métier */}
        <div
          id="page-metiers-mediatheque"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i data-lucide="image" style={{ width: 20, height: 20 }} />
                </div>
                Médiathèque métier
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="metiersMediaSearch"
                  className="actu-search-input"
                  placeholder="Rechercher un média…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersMedia()")
                  }
                />
              </div>
              <div
                id="metiersMediaGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                  gap: 12,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* INNOVATION VIEW */}
    </>
  );
}

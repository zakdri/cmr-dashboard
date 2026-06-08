import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function RseSection() {
  return (
    <>
      <div id="view-rse" className="view-section km-container">
        <div className="km-header">
          <h2>Espace RSE</h2>
          <p>
            Référentiels RSE, reporting, initiatives, participation et
            animation.
          </p>
        </div>
        {/* Sous‑rubriques (niveau 1) */}
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
        {/* Sous‑rubriques (niveau 2 — selon sous‑rubrique principale) */}
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
        <div
          id="page-rse-politiques"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="km-grid" id="rsePolitiquesGrid" />
        </div>
        <div
          id="page-rse-chartes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid" id="rseChartesGrid" />
        </div>
        <div
          id="page-rse-codes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid" id="rseCodesGrid" />
        </div>
        <div
          id="page-rse-guides"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid" id="rseGuidesGrid" />
        </div>
        <div
          id="page-rse-rapports"
          className="km-tab-content"
          style={{ display: "none" }}
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
                Rapports RSE
              </div>
            </div>
            <div
              id="rseRapportsList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-rse-actions"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="heart-handshake"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Actions RSE
              </div>
            </div>
            <div
              id="rseActionsGrid"
              className="km-grid"
              style={{ padding: 18 }}
            />
          </div>
        </div>
        <div
          id="page-rse-infos"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="info" style={{ width: 20, height: 20 }} />
                </div>
                Information RSE
              </div>
            </div>
            <div
              id="rseInfos"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-rse-idees"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
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
                  Idées RSE
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleRseIdeaForm(true)")
                  }
                >
                  Soumettre
                </button>
              </div>
              <div id="rseIdeaList" className="doc-list" />
            </div>
            <div
              className="dashboard-card"
              id="rseIdeaForm"
              style={{ display: "none" }}
            >
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="square-pen"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Nouvelle idée RSE
                </div>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleRseIdeaForm(false)")
                  }
                >
                  Fermer
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input
                  id="rseIdeaTitle"
                  className="actu-search-input"
                  placeholder="Titre"
                />
                <textarea
                  id="rseIdeaDesc"
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
                      runLegacyHandler(event, "submitRseIdea()")
                    }
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Détail
                </div>
              </div>
              <div
                id="rseIdeaDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez une idée.
              </div>
            </div>
          </div>
        </div>
        <div
          id="page-rse-contributions"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon green">
                    <i
                      data-lucide="message-square-plus"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Contributions
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleRseContributionForm(true)")
                  }
                >
                  Publier
                </button>
              </div>
              <div id="rseContribList" className="doc-list" />
            </div>
            <div
              className="dashboard-card"
              id="rseContribForm"
              style={{ display: "none" }}
            >
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="square-pen"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Nouvelle contribution
                </div>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleRseContributionForm(false)")
                  }
                >
                  Fermer
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input
                  id="rseContribTitle"
                  className="actu-search-input"
                  placeholder="Titre"
                />
                <textarea
                  id="rseContribBody"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder="Contenu…"
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
                      runLegacyHandler(event, "submitRseContribution()")
                    }
                  >
                    Publier
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Détail
                </div>
              </div>
              <div
                id="rseContribDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez une contribution.
              </div>
            </div>
          </div>
        </div>
        <div
          id="page-rse-rex"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i data-lucide="sparkles" style={{ width: 20, height: 20 }} />
                </div>
                Retours d’expérience RSE
              </div>
            </div>
            <div
              id="rseRexList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-rse-axes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="sliders-horizontal"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Axes stratégiques (filtres / navigation)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                id="rseAxisFilters"
                style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "filterRseAxis('all', this)")
                  }
                >
                  Tous
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterRseAxis('Environnement', this)",
                    )
                  }
                >
                  Environnement
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "filterRseAxis('Social', this)")
                  }
                >
                  Social
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterRseAxis('Gouvernance', this)",
                    )
                  }
                >
                  Gouvernance
                </button>
              </div>
              <div
                id="rseAxesGrid"
                className="km-grid"
                style={{ marginTop: 18 }}
              />
            </div>
          </div>
        </div>
        <div
          id="page-rse-echanges"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="message-circle"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Échanges participatifs
              </div>
            </div>
            <div id="rseEchanges" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-rse-sensibilisation"
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
                Sensibilisation
              </div>
            </div>
            <div id="rseSensibilisation" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-rse-animation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="party-popper"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Animation (campagnes / sondages)
              </div>
            </div>
            <div id="rseAnimation" style={{ padding: 18 }} />
          </div>
        </div>
      </div>
      {/* QSE VIEW */}
    </>
  );
}

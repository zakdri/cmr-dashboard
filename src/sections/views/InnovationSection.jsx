import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function InnovationSection() {
  return (
    <>
      <div id="view-innovation" className="view-section km-container">
        <div className="km-header">
          <h2>Espace Innovation</h2>
          <p>
            Idéation, suivi des projets, veille, interactions sociales,
            ateliers/challenges et gouvernance d’accès.
          </p>
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
          <div
            className="km-nav-item active"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('ideation')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Boîte à idées
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('suivi')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Suivi des projets
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('veille')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Veille
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('social')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Interactions sociales
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('ateliers')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Ateliers / Challenges
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('axes')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Axes d’innovation
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('openlab')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            OpenLab / Portefeuille
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('excelway')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            ExcelWay
          </div>
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
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchInnovationTab('droits')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Gestion des droits
          </div>
        </div>
        {/* TAB: IDEATION (Formulaire + liste) */}
        <div
          id="page-innovation-ideation"
          className="km-tab-content"
          style={{ display: "block" }}
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
                  Boîte à idées
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleIdeaForm(true)")
                  }
                >
                  Déposer une idée
                </button>
              </div>
              <div id="ideaList" className="doc-list" />
            </div>
            <div
              className="dashboard-card"
              id="ideaFormCard"
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
                  Nouvelle idée
                </div>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleIdeaForm(false)")
                  }
                >
                  Fermer
                </button>
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
                    id="ideaTitle"
                    className="actu-search-input"
                    placeholder="Titre de l’idée"
                  />
                  <select
                    id="ideaAxis"
                    className="actu-search-input"
                    style={{ height: 40 }}
                  >
                    <option value="Digital">Digital</option>
                    <option value="Processus">Processus</option>
                    <option value="Service">Service</option>
                    <option value="Data/IA">Data/IA</option>
                  </select>
                </div>
                <textarea
                  id="ideaDesc"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder="Décrivez l’idée, le bénéfice, les risques…"
                  defaultValue={""}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  <button
                    className="primary-btn"
                    onClick={(event) => runLegacyHandler(event, "submitIdea()")}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-card" id="ideaDetailCard">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Détail idée
                </div>
              </div>
              <div
                id="ideaDetail"
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
        {/* TAB: SUIVI PROJETS (Liste/dashboard) */}
        <div
          id="page-innovation-suivi"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="kanban" style={{ width: 20, height: 20 }} />
                </div>
                Suivi des projets d’innovation
              </div>
            </div>
            <div id="innovationProjects" style={{ padding: 18 }} />
          </div>
        </div>
        {/* TAB: VEILLE (Liste/flux) */}
        <div
          id="page-innovation-veille"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="newspaper"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Veille stratégique
              </div>
            </div>
            <div
              id="innovationFeed"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: SOCIAL (Commentaires + réactions + votes) */}
        <div
          id="page-innovation-social"
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
                  <div className="card-icon orange">
                    <i
                      data-lucide="message-circle"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Commentaires
                </div>
              </div>
              <div id="innovationComments" style={{ padding: 18 }} />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon pink">
                    <i data-lucide="heart" style={{ width: 20, height: 20 }} />
                  </div>
                  Réactions &amp; votes
                </div>
              </div>
              <div id="innovationReactions" style={{ padding: 18 }} />
            </div>
          </div>
        </div>
        {/* TAB: ATELIERS (Liste/calendrier) */}
        <div
          id="page-innovation-ateliers"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="calendar" style={{ width: 20, height: 20 }} />
                </div>
                Ateliers / challenges
              </div>
            </div>
            <div id="innovationEvents" style={{ padding: 18 }} />
          </div>
        </div>
        {/* TAB: AXES (Filtres/catégories) */}
        <div
          id="page-innovation-axes"
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
                Axes d’innovation
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                id="innovationAxesFilters"
                style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "filterInnovationAxis('all', this)")
                  }
                >
                  Tous
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterInnovationAxis('Digital', this)",
                    )
                  }
                >
                  Digital
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterInnovationAxis('Processus', this)",
                    )
                  }
                >
                  Processus
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterInnovationAxis('Service', this)",
                    )
                  }
                >
                  Service
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterInnovationAxis('Data/IA', this)",
                    )
                  }
                >
                  Data/IA
                </button>
              </div>
              <div
                id="innovationAxesGrid"
                className="km-grid"
                style={{ marginTop: 18 }}
              />
            </div>
          </div>
        </div>
        {/* TAB: OPENLAB (Page/dashboard) */}
        <div
          id="page-innovation-openlab"
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
                  <div className="card-icon purple">
                    <i data-lucide="layers" style={{ width: 20, height: 20 }} />
                  </div>
                  OpenLab / Portefeuille
                </div>
              </div>
              <div id="openlabPortfolio" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="bar-chart-3"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Tableau de bord
                </div>
              </div>
              <div id="openlabDashboard" style={{ padding: 18 }} />
            </div>
          </div>
        </div>
        {/* TAB: EXCELWAY (Widget/interface intégré) */}
        <div
          id="page-innovation-excelway"
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
                      data-lucide="app-window"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  ExcelWay (intégration)
                </div>
              </div>
              <div id="innovationExcelwayList" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="workflow"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Widget intégré
                </div>
              </div>
              <div id="innovationExcelwayPanel" style={{ padding: 18 }} />
            </div>
          </div>
        </div>
        {/* TAB: DROITS (Affichage conditionnel) */}
        <div
          id="page-innovation-droits"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="key" style={{ width: 20, height: 20 }} />
                </div>
                Gestion des droits
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-light)",
                  fontSize: 13,
                  lineHeight: "1.7",
                }}
              >
                Affichage conditionnel (maquette) : filtrer/restreindre selon
                profil.
              </p>
              <div
                id="innovationRoleFilters"
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setInnovationRole('collaborateur', this)",
                    )
                  }
                >
                  Collaborateur
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setInnovationRole('manager', this)",
                    )
                  }
                >
                  Manager
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setInnovationRole('admin', this)")
                  }
                >
                  Admin
                </button>
              </div>
              <div id="innovationAccessPanel" style={{ marginTop: 16 }} />
            </div>
          </div>
        </div>
      </div>
      {/* RÉGLEMENTAIRE VIEW */}
    </>
  );
}

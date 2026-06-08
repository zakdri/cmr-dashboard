import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function InstitutionnelSection() {
  return (
    <>
      <div id="view-institutionnel" className="view-section km-container">
        <div className="km-header">
          <h2>Organisation &amp; Gouvernance</h2>
          <p>
            Organisation, gouvernance, référentiel SMI, cartographie des
            processus et pilotage stratégique.
          </p>
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
          <div
            className="km-nav-item active"
            onClick={(event) =>
              runLegacyHandler(event, "switchOrgGovSection('overview')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Vue d’ensemble
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
              runLegacyHandler(event, "switchOrgGovSection('organisation')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Organisation
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
              runLegacyHandler(event, "switchOrgGovSection('referentiel-smi')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Référentiel SMI
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
              runLegacyHandler(event, "switchOrgGovSection('cartographie')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Cartographie
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
              runLegacyHandler(event, "switchOrgGovSection('gouvernance')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Gouvernance
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
              runLegacyHandler(event, "switchOrgGovSection('direction')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Direction
          </div>
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
        {/* TAB: OVERVIEW */}
        <div
          id="page-orggov-overview"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="app-category-title">Organisation</div>
          <div
            className="app-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 40,
            }}
          >
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('organigramme'); return false;",
                )
              }
              style={{ "--hover-bg": "#f0f9ff", "--hover-border": "#bae6fd" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                }}
              >
                <i data-lucide="network" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Organigramme</span>
                <p className="app-card-desc">
                  Organigramme interactif (directions, entités, rattachements).
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('annuaire'); return false;")
              }
              style={{ "--hover-bg": "#f8fafc", "--hover-border": "#cbd5e1" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #64748b, #475569)",
                }}
              >
                <i data-lucide="id-card" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Fiches collaborateurs
                </span>
                <p className="app-card-desc">
                  Annuaire interne (profil, contact, fonction, rattachement).
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('postes'); return false;",
                )
              }
              style={{ "--hover-bg": "#f0fdf4", "--hover-border": "#bbf7d0" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                }}
              >
                <i data-lucide="briefcase" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Fiches de postes</span>
                <p className="app-card-desc">
                  Responsabilités et missions (page structurée).
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
          </div>
          <div className="app-category-title">Gouvernance</div>
          <div
            className="app-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 40,
            }}
          >
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('presentation'); return false;",
                )
              }
              style={{ "--hover-bg": "#eff6ff", "--hover-border": "#bfdbfe" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                }}
              >
                <i
                  data-lucide="presentation"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Présentation globale
                </span>
                <p className="app-card-desc">
                  Instances, rôles, périmètres (page dédiée).
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('strategie'); return false;",
                )
              }
              style={{ "--hover-bg": "#fff7ed", "--hover-border": "#fed7aa" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                }}
              >
                <i data-lucide="target" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Plan stratégique</span>
                <p className="app-card-desc">
                  Consultation + téléchargement des documents structurants.
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('referentiels'); return false;",
                )
              }
              style={{ "--hover-bg": "#fdf4ff", "--hover-border": "#e9d5ff" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                }}
              >
                <i data-lucide="book-open" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Référentiels organisationnels
                </span>
                <p className="app-card-desc">
                  Référentiels / politiques / documents (liste + dossier).
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('comites'); return false;",
                )
              }
              style={{ "--hover-bg": "#f8fafc", "--hover-border": "#cbd5e1" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #334155, #0f172a)",
                }}
              >
                <i
                  data-lucide="users-round"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Comités</span>
                <p className="app-card-desc">
                  Instances (liste/dossier) + PV (téléchargement).
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('kpi-strategiques'); return false;",
                )
              }
              style={{ "--hover-bg": "#f0fdf4", "--hover-border": "#bbf7d0" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #059669)",
                }}
              >
                <i data-lucide="gauge" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">KPI stratégiques</span>
                <p className="app-card-desc">
                  Tableaux de bord et indicateurs de pilotage.
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('rapports-gouvernance'); return false;",
                )
              }
              style={{ "--hover-bg": "#fef2f2", "--hover-border": "#fecaca" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #991b1b)",
                }}
              >
                <i
                  data-lucide="folder-lock"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Rapports gouvernance
                </span>
                <p className="app-card-desc">
                  Dossiers CA et rapports de gouvernance.
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
          </div>
          <div className="app-category-title">
            Référentiel SMI &amp; cartographie
          </div>
          <div
            className="app-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 40,
            }}
          >
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('smi-politiques'); return false;",
                )
              }
              style={{ "--hover-bg": "#f0fdf4", "--hover-border": "#bbf7d0" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                <i
                  data-lucide="shield-check"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Politiques SMI</span>
                <p className="app-card-desc">
                  Politiques et référentiels SMI centralisés.
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('smi-dossiers'); return false;",
                )
              }
              style={{ "--hover-bg": "#eff6ff", "--hover-border": "#bfdbfe" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                }}
              >
                <i
                  data-lucide="folder-tree"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Dossiers processus</span>
                <p className="app-card-desc">
                  Documentation processus métier (GED-like).
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('smi-audits'); return false;",
                )
              }
              style={{ "--hover-bg": "#fff7ed", "--hover-border": "#fed7aa" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                <i
                  data-lucide="clipboard-check"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Audits SMI</span>
                <p className="app-card-desc">Audits et constats SMI publiés.</p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('cartographie'); return false;",
                )
              }
              style={{ "--hover-bg": "#fdf4ff", "--hover-border": "#e9d5ff" }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                }}
              >
                <i data-lucide="git-branch" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Cartographie des processus
                </span>
                <p className="app-card-desc">
                  Vue graphique interactive des processus.
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
          </div>
          <div className="app-category-title">Direction</div>
          <div className="km-grid" style={{ marginBottom: 40 }}>
            <div
              className="doc-card"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchOrgGovTab('direction'); return false;",
                )
              }
            >
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#1d4ed8" }}
              >
                <i
                  data-lucide="message-square-text"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">Mot de la Direction</div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-light)",
                  marginTop: 8,
                }}
              >
                Message institutionnel (page dédiée).
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#1d4ed8", fontWeight: 700 }}>Lire</span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          <div className="app-category-title">Accueil espace</div>
          <div className="km-grid">
            <div
              className="doc-card"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "switchView('dashboard'); return false;",
                )
              }
            >
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#15803d" }}
              >
                <i data-lucide="home" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Accueil intranet</div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-light)",
                  marginTop: 8,
                }}
              >
                Accès à l’accueil et aux raccourcis principaux.
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#15803d", fontWeight: 700 }}>
                  Ouvrir
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
        </div>
        {/* TAB: ORGANIGRAMME (Organigramme interactif) */}
        <div
          id="page-orggov-organigramme"
          className="km-tab-content"
          style={{ display: "none" }}
        >
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
                Organigramme
              </div>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 13,
                  color: "var(--text-light)",
                }}
              >
                Naviguer dans les directions et entités. Cliquer pour
                développer/réduire.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                className="secondary-btn"
                onClick={(event) => runLegacyHandler(event, "expandAllOrg()")}
              >
                Développer tout
              </button>
              <button
                className="secondary-btn"
                onClick={(event) => runLegacyHandler(event, "collapseAllOrg()")}
              >
                Réduire
              </button>
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 18,
            }}
          >
            <div id="orgTree" />
          </div>
        </div>
        {/* TAB: POSTES (Page structurée) */}
        <div
          id="page-orggov-postes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
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
                Fiches de postes
              </div>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 13,
                  color: "var(--text-light)",
                }}
              >
                Consulter une fiche de poste (missions, responsabilités,
                compétences).
              </p>
            </div>
            <div className="actu-search-wrap" style={{ maxWidth: 420 }}>
              <i data-lucide="search" className="actu-search-icon" />
              <input
                id="postesSearchInput"
                type="text"
                className="actu-search-input"
                placeholder="Rechercher un poste…"
                onInput={(event) =>
                  runLegacyHandler(event, "renderPostesList(this.value)")
                }
              />
            </div>
          </div>
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="briefcase"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Liste
                </div>
              </div>
              <div id="postesList" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon orange">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Fiche de poste
                </div>
              </div>
              <div
                id="postesDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un poste dans la liste.
              </div>
            </div>
          </div>
        </div>
        {/* TAB: PRÉSENTATION GLOBALE (Page dédiée) */}
        <div
          id="page-orggov-presentation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            Présentation globale
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
                <i
                  data-lucide="presentation"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}
                >
                  Gouvernance interne
                </div>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.7",
                  }}
                >
                  Accédez à la structure de gouvernance : instances, comités,
                  responsabilités, et processus de décision. Cette page
                  centralise les éléments de référence pour comprendre “qui
                  décide quoi” et “comment”.
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
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 800, color: "#1e293b" }}>
                  Instances
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: "var(--text-light)",
                    lineHeight: "1.6",
                  }}
                >
                  Conseil, comités, réunions de pilotage.
                </div>
              </div>
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 800, color: "#1e293b" }}>
                  Rôles &amp; responsabilités
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: "var(--text-light)",
                    lineHeight: "1.6",
                  }}
                >
                  RACI simplifié des décisions clés.
                </div>
              </div>
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 800, color: "#1e293b" }}>
                  Documents
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: "var(--text-light)",
                    lineHeight: "1.6",
                  }}
                >
                  Référentiels, charte, PV, notes.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: STRATÉGIE (Consultation / téléchargement) */}
        <div
          id="page-orggov-strategie"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            Plan stratégique
          </div>
          <div className="km-grid">
            <div
              className="doc-card"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "openMockDownload('Plan_Strategique_CMR_2026-2028.pdf','Plan stratégique 2026-2028 (version de référence)');",
                )
              }
            >
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Plan_Strategique_CMR_2026-2028.pdf
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 8,
                }}
              >
                Document structurant (consultation / téléchargement).
              </p>
              <div className="doc-card-meta">
                <span>Télécharger</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "openMockDownload('Feuille_de_route_2026.pdf','Feuille de route 2026 (projets majeurs)');",
                )
              }
            >
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Feuille_de_route_2026.pdf</div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 8,
                }}
              >
                Calendrier, jalons et indicateurs.
              </p>
              <div className="doc-card-meta">
                <span>Télécharger</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TAB: RÉFÉRENTIELS (Liste / dossier) */}
        <div
          id="page-orggov-referentiels"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            Référentiels organisationnels
          </div>
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i data-lucide="folder" style={{ width: 20, height: 20 }} />
                  </div>
                  Dossiers
                </div>
              </div>
              <div id="refDossiers" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Documents
                </div>
              </div>
              <div id="refDocs" className="doc-list" />
            </div>
          </div>
        </div>
        {/* TAB: COMITÉS (Rubrique Comités) */}
        <div
          id="page-orggov-comites"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            Rubrique Comités
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
                <div className="card-title">
                  <div className="card-icon orange">
                    <i
                      data-lucide="users-round"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Liste des comités
                </div>
              </div>
              <div id="comitesList" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon green">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Dossier du comité
                </div>
              </div>
              <div
                id="comitesDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un comité.
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="calendar-range"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Décisions &amp; comptes rendus
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div id="orgGovComitesTimeline" />
            </div>
          </div>
        </div>
        <div
          id="page-orggov-smi-politiques"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="shield-check"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Politiques SMI
              </div>
            </div>
            <div
              id="orgGovSmiPolitiques"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-orggov-smi-dossiers"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="folder-tree"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Dossiers processus
              </div>
            </div>
            <div
              id="orgGovSmiDossiers"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-orggov-smi-audits"
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
                Audits SMI
              </div>
            </div>
            <div
              id="orgGovSmiAudits"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        <div
          id="page-orggov-cartographie"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i
                    data-lucide="git-branch"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Cartographie des processus
              </div>
            </div>
            <div id="orgGovCartographie" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-orggov-kpi-strategiques"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="gauge" style={{ width: 20, height: 20 }} />
                </div>
                KPI stratégiques
              </div>
            </div>
            <div id="orgGovKpiStrategiques" style={{ padding: 18 }} />
          </div>
        </div>
        <div
          id="page-orggov-rapports-gouvernance"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="folder-lock"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Rapports gouvernance
              </div>
            </div>
            <div
              id="orgGovRapportsGouvernance"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: DIRECTION (Mot de la Direction) */}
        <div
          id="page-orggov-direction"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            Mot de la Direction
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
                    Organisation &amp; Gouvernance
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
                    <i
                      data-lucide="calendar"
                      style={{ width: 14, height: 14 }}
                    />{" "}
                    25 Avril 2026
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
                  Point d’étape sur la feuille de route 2026
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.8",
                  }}
                >
                  Chers collaborateurs, nous poursuivons la modernisation de nos
                  processus et de notre organisation. L’objectif de ce trimestre
                  est de renforcer la gouvernance des projets, d’améliorer la
                  qualité de service et de consolider nos référentiels.
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
                      runLegacyHandler(
                        event,
                        "openMockDownload('Note_DG_2026_T2.pdf','Note DG — priorités du trimestre');",
                      )
                    }
                  >
                    Télécharger la note
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "goToActualites(1);")
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
      {/* ANNUAIRE VIEW (rubrique séparée) */}
    </>
  );
}

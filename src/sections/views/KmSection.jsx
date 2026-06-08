import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function KmSection() {
  return (
    <>
      <div id="view-km" className="view-section km-container">
        <div className="km-header">
          <h2>Knowledge Management</h2>
          <p>
            Référentiels, capitalisation (REX), e‑learning, communautés,
            structuration et accès GED/GLPI.
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
              runLegacyHandler(event, "switchPageKmTab('referentiels')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Référentiels métiers
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
              runLegacyHandler(event, "switchPageKmTab('glossaire')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Glossaire
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
              runLegacyHandler(event, "switchPageKmTab('rex')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            REX
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
              runLegacyHandler(event, "switchPageKmTab('elearning')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            E‑learning
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
              runLegacyHandler(event, "switchPageKmTab('pedagogie')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Pédagogie métier
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
              runLegacyHandler(event, "switchPageKmTab('communautes')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Communautés
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
              runLegacyHandler(event, "switchPageKmTab('amoa')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            AMOA / Conduite du changement
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
              runLegacyHandler(event, "switchPageKmTab('docs')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Docs formalisés
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
              runLegacyHandler(event, "switchPageKmTab('contributions')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Contributions
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
              runLegacyHandler(event, "switchPageKmTab('categorisation')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Catégorisation
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
              runLegacyHandler(event, "switchPageKmTab('livrables')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Livrables projets
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
              runLegacyHandler(event, "switchPageKmTab('modeles')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Modèles / formulaires
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
              runLegacyHandler(event, "switchPageKmTab('publications')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Articles / bilans
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
              runLegacyHandler(event, "switchPageKmTab('ged')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            GED
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
              runLegacyHandler(event, "switchPageKmTab('glpi')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            GLPI
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
              runLegacyHandler(event, "switchPageKmTab('supports')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Supports pédagogiques
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
              runLegacyHandler(event, "switchPageKmTab('stories')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Sources stories
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
              runLegacyHandler(event, "switchPageKmTab('campagnes')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Campagnes interaction
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
              runLegacyHandler(event, "switchPageKmTab('audit-risque')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Audit &amp; conformité
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
              runLegacyHandler(event, "switchPageKmTab('capsules-ux')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Capsules UX
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
              runLegacyHandler(event, "switchPageKmTab('regimes-processus')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Régimes &amp; processus
          </div>
        </div>
        {/* TAB: RÉFÉRENTIELS MÉTIERS (Liste/dossier) */}
        <div
          id="page-km-referentiels"
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
                  <div className="card-icon purple">
                    <i data-lucide="folder" style={{ width: 20, height: 20 }} />
                  </div>
                  Référentiels métiers
                </div>
              </div>
              <div id="kmRefFolders" className="doc-list" />
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
                  Guides pratiques
                </div>
              </div>
              <div style={{ padding: "14px 18px" }}>
                <div className="actu-search-wrap" style={{ maxWidth: 420 }}>
                  <i data-lucide="search" className="actu-search-icon" />
                  <input
                    id="kmRefSearch"
                    type="text"
                    className="actu-search-input"
                    placeholder="Rechercher un guide…"
                    onInput={(event) =>
                      runLegacyHandler(event, "renderKmReferentiels()")
                    }
                  />
                </div>
              </div>
              <div id="kmRefDocs" className="doc-list" />
            </div>
          </div>
        </div>
        {/* TAB: GLOSSAIRE (Liste/index + recherche) */}
        <div
          id="page-km-glossaire"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="book-open"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Glossaire
              </div>
            </div>
            <div style={{ padding: "14px 18px" }}>
              <div className="actu-search-wrap" style={{ maxWidth: 520 }}>
                <i data-lucide="search" className="actu-search-icon" />
                <input
                  id="kmGlossSearch"
                  type="text"
                  className="actu-search-input"
                  placeholder="Rechercher un terme…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderKmGlossaire()")
                  }
                />
              </div>
            </div>
            <div
              id="kmGlossList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: REX (Article/document + contribution) */}
        <div
          id="page-km-rex"
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
                      data-lucide="sparkles"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Capitalisation (REX)
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleKmRexForm(true)")
                  }
                >
                  Soumettre un REX
                </button>
              </div>
              <div style={{ padding: "14px 18px" }}>
                <div className="actu-search-wrap" style={{ maxWidth: 520 }}>
                  <i data-lucide="search" className="actu-search-icon" />
                  <input
                    id="kmRexSearch"
                    type="text"
                    className="actu-search-input"
                    placeholder="Rechercher un REX…"
                    onInput={(event) =>
                      runLegacyHandler(event, "renderKmRex()")
                    }
                  />
                </div>
              </div>
              <div id="kmRexList" className="doc-list" />
            </div>
            <div
              className="dashboard-card"
              id="kmRexFormCard"
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
                  Soumettre un REX
                </div>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleKmRexForm(false)")
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
                    id="kmRexTitle"
                    className="actu-search-input"
                    placeholder="Titre du REX"
                  />
                  <select
                    id="kmRexTheme"
                    className="actu-search-input"
                    style={{ height: 40 }}
                  >
                    <option value="Projet">Projet</option>
                    <option value="Processus">Processus</option>
                    <option value="Outil">Outil</option>
                  </select>
                </div>
                <textarea
                  id="kmRexDesc"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder="Description / leçons apprises…"
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
                    onClick={(event) =>
                      runLegacyHandler(event, "submitKmRex()")
                    }
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-card" id="kmRexDetailCard">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Détail REX
                </div>
              </div>
              <div
                id="kmRexDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un REX.
              </div>
            </div>
          </div>
        </div>
        {/* TAB: E-LEARNING (Lecteur/galerie) */}
        <div
          id="page-km-elearning"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="play-circle"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                E‑learning
              </div>
            </div>
            <div
              id="kmElearningGrid"
              className="km-grid"
              style={{ padding: 18 }}
            />
          </div>
        </div>
        {/* TAB: PÉDAGOGIE MÉTIER (Page/carte) */}
        <div
          id="page-km-pedagogie"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i
                    data-lucide="book-open"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Pédagogie métier
              </div>
            </div>
            <div
              id="kmPedagogieGrid"
              className="km-grid"
              style={{ padding: 18 }}
            />
          </div>
        </div>
        {/* TAB: COMMUNAUTÉS (Forum/groupe) */}
        <div
          id="page-km-communautes"
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
                    <i data-lucide="users" style={{ width: 20, height: 20 }} />
                  </div>
                  Communautés de pratique
                </div>
              </div>
              <div id="kmCommList" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon orange">
                    <i
                      data-lucide="message-circle"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Dernières discussions
                </div>
              </div>
              <div id="kmCommThreads" className="doc-list" />
            </div>
          </div>
        </div>
        {/* TAB: AMOA (Page / liste) */}
        <div
          id="page-km-amoa"
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
                    <i
                      data-lucide="clipboard-list"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  AMOA / Conduite du changement
                </div>
              </div>
              <div className="doc-list" id="kmAmoaList" />
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
                  Détail
                </div>
              </div>
              <div
                id="kmAmoaDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un élément.
              </div>
            </div>
          </div>
        </div>
        {/* TAB: DOCS FORMALISÉS (Liste/dossier) */}
        <div
          id="page-km-docs"
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
                  <div className="card-icon blue">
                    <i
                      data-lucide="folder-open"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Documents formalisés
                </div>
              </div>
              <div id="kmDocsFolders" className="doc-list" />
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
                  Liste
                </div>
              </div>
              <div id="kmDocsList" className="doc-list" />
            </div>
          </div>
        </div>
        {/* TAB: CONTRIBUTIONS (Formulaire/liste) */}
        <div
          id="page-km-contributions"
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
                      data-lucide="message-square-plus"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Contributions terrain
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleKmContributionForm(true)")
                  }
                >
                  Contribuer
                </button>
              </div>
              <div id="kmContribList" className="doc-list" />
            </div>
            <div
              className="dashboard-card"
              id="kmContribFormCard"
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
                    runLegacyHandler(event, "toggleKmContributionForm(false)")
                  }
                >
                  Fermer
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input
                  id="kmContribTitle"
                  className="actu-search-input"
                  placeholder="Titre"
                />
                <textarea
                  id="kmContribBody"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder="Votre contribution…"
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
                    onClick={(event) =>
                      runLegacyHandler(event, "submitKmContribution()")
                    }
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-card" id="kmContribDetailCard">
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
                id="kmContribDetail"
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
        {/* TAB: CATÉGORISATION (Navigation / filtres) */}
        <div
          id="page-km-categorisation"
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
                Catégorisation &amp; filtres
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <p
                style={{
                  margin: "0 0 14px 0",
                  fontSize: 13,
                  color: "var(--text-light)",
                }}
              >
                Filtrer les contenus KM par thématique / type / entité
                (navigation &amp; filtres).
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "filterKmCatalogue('all', this)")
                  }
                >
                  Tous
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterKmCatalogue('Document', this)",
                    )
                  }
                >
                  Documents
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterKmCatalogue('Article', this)",
                    )
                  }
                >
                  Articles
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "filterKmCatalogue('Media', this)")
                  }
                >
                  Média
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "filterKmCatalogue('Forum', this)")
                  }
                >
                  Forum
                </button>
              </div>
              <div style={{ marginTop: 14 }} className="actu-search-wrap">
                <i data-lucide="search" className="actu-search-icon" />
                <input
                  id="kmCatSearch"
                  type="text"
                  className="actu-search-input"
                  placeholder="Rechercher dans KM…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderKmCatalogue()")
                  }
                />
              </div>
            </div>
            <div
              id="kmCatalogueList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: LIVRABLES (Dossier / accès) */}
        <div
          id="page-km-livrables"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="package" style={{ width: 20, height: 20 }} />
                </div>
                Livrables projets
              </div>
            </div>
            <div
              id="kmLivrablesList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: MODÈLES (Liste + téléchargement) */}
        <div
          id="page-km-modeles"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i
                    data-lucide="layout-template"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Modèles / formulaires
              </div>
            </div>
            <div
              id="kmModelesList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: PUBLICATIONS (Liste/page) */}
        <div
          id="page-km-publications"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="newspaper"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Articles / bilans
              </div>
            </div>
            <div
              id="kmPubList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: GED (Accès GED / intégration) */}
        <div
          id="page-km-ged"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="database" style={{ width: 20, height: 20 }} />
                </div>
                GED (intégration / accès)
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
                Accès à la GED (ex: OpenText). Cette section sert de point
                d’entrée et de recherche fédérée.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 14,
                }}
              >
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "openMockDownload('Guide_Connexion_GED.pdf','Guide connexion GED')",
                    )
                  }
                >
                  Guide de connexion
                </button>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "openMockDownload('Convention_Nommage.pdf','Convention de nommage')",
                    )
                  }
                >
                  Convention de nommage
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: GLPI (Accès GLPI) */}
        <div
          id="page-km-glpi"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="life-buoy"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                GLPI (support / incidents)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <div
                  style={{
                    flex: 1,
                    minWidth: 260,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    Consulter des tickets
                  </div>
                  <p
                    style={{
                      margin: "8px 0 0 0",
                      color: "var(--text-light)",
                      fontSize: 12,
                      lineHeight: "1.6",
                    }}
                  >
                    Widget / liste des incidents (maquette).
                  </p>
                  <div
                    style={{ marginTop: 12 }}
                    className="doc-list"
                    id="kmGlpiTickets"
                  />
                </div>
                <div
                  style={{
                    flex: 1,
                    minWidth: 260,
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    Créer une demande
                  </div>
                  <p
                    style={{
                      margin: "8px 0 0 0",
                      color: "var(--text-light)",
                      fontSize: 12,
                      lineHeight: "1.6",
                    }}
                  >
                    Formulaire (maquette).
                  </p>
                  <input
                    id="kmGlpiTitle"
                    className="actu-search-input"
                    placeholder="Objet"
                  />
                  <textarea
                    id="kmGlpiDesc"
                    className="actu-search-input"
                    style={{ marginTop: 12, height: 110, paddingTop: 10 }}
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
                        runLegacyHandler(event, "submitKmGlpi()")
                      }
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: SUPPORTS PÉDAGOGIQUES (Galerie/liste) */}
        <div
          id="page-km-supports"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i
                    data-lucide="graduation-cap"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Supports pédagogiques
              </div>
            </div>
            <div
              id="kmSupportsGrid"
              className="km-grid"
              style={{ padding: 18 }}
            />
          </div>
        </div>
        {/* TAB: SOURCES STORIES (Cards/carrousel) */}
        <div
          id="page-km-stories"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.6fr 1.4fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon orange">
                    <i
                      data-lucide="sparkles"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Sources stories
                </div>
              </div>
              <div
                id="kmStoriesGrid"
                style={{
                  padding: 18,
                  display: "grid",
                  gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                  gap: 12,
                }}
              />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="newspaper"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  À valoriser
                </div>
              </div>
              <div
                id="kmStoriesHighlight"
                className="doc-list"
                style={{ padding: "0 18px 18px 18px" }}
              />
            </div>
          </div>
        </div>
        {/* TAB: CAMPAGNES D'INTERACTION (Formulaire/sondage) */}
        <div
          id="page-km-campagnes"
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
                  Campagnes de collecte
                </div>
              </div>
              <div id="kmCampagnesList" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="clipboard-list"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Participer
                </div>
              </div>
              <div
                id="kmCampagnesDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez une campagne.
              </div>
            </div>
          </div>
        </div>
        {/* TAB: AUDIT & CONFORMITÉ */}
        <div
          id="page-km-audit-risque"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="shield-check"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Audit &amp; conformité
              </div>
            </div>
            <div
              id="kmAuditRisqueList"
              className="doc-list"
              style={{ padding: "0 18px 18px 18px" }}
            />
          </div>
        </div>
        {/* TAB: CAPSULES UX */}
        <div
          id="page-km-capsules-ux"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="play-circle"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Capsules UX projet SI
              </div>
            </div>
            <div
              id="kmCapsulesUxGrid"
              className="km-grid"
              style={{ padding: 18 }}
            />
          </div>
        </div>
        {/* TAB: RÉGIMES & PROCESSUS */}
        <div
          id="page-km-regimes-processus"
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
                      data-lucide="network"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Régimes &amp; processus
                </div>
              </div>
              <div id="kmRegimesProcessList" className="doc-list" />
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
                  Détail métier
                </div>
              </div>
              <div
                id="kmRegimesProcessDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un contenu métier.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* APPLIS VIEW */}
    </>
  );
}

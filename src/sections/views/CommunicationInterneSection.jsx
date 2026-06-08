import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function CommunicationInterneSection() {
  return (
    <>
      <div
        id="view-communication-interne"
        className="view-section km-container"
      >
        <div className="km-header">
          <h2>Communication interne</h2>
          <p>
            Informations institutionnelles, flash, événements et contenus
            éditoriaux.
          </p>
        </div>
        <div
          className="dashboard-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {/* Actualités institutionnelles */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="newspaper"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Actualités institutionnelles
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(); return false;")
                }
                style={{ whiteSpace: "nowrap" }}
              >
                Voir tout
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(1); return false;")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  ACTU
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Contrat programme État‑CMR 2026‑2028
                  </div>
                  <div className="doc-meta">
                    Organisation &amp; Gouvernance • À la une
                  </div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(2); return false;")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  DIR
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Tenue du Conseil d’Administration
                  </div>
                  <div className="doc-meta">Gouvernance • 2 jours</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(8); return false;")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  DIG
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Feuille de route digitale 2026
                  </div>
                  <div className="doc-meta">Digital • 1 Avril</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* Flash d'information */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i data-lucide="zap" style={{ width: 20, height: 20 }} />
                </div>
                Flash d’information
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "openCommFlashDetail('strategie-roadmap'); return false;",
                  )
                }
                style={{ whiteSpace: "nowrap" }}
              >
                Voir
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "openTickerDetail('it-maint-paie')")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  IT
                </div>
                <div className="doc-info">
                  <div className="doc-title">Maintenance serveur “Paie”</div>
                  <div className="doc-meta">Ce vendredi • 18:00</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "openTickerDetail('social-colonies')")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  SOC
                </div>
                <div className="doc-info">
                  <div className="doc-title">Colonies de vacances 2026</div>
                  <div className="doc-meta">Inscriptions ouvertes</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "openTickerDetail('strategie-roadmap')",
                  )
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  STR
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Lancement feuille de route 2026
                  </div>
                  <div className="doc-meta">Stratégie • Aujourd’hui</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* Événements */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="calendar" style={{ width: 20, height: 20 }} />
                </div>
                Événements
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('agenda-interne'); return false;",
                  )
                }
                style={{ whiteSpace: "nowrap" }}
              >
                Agenda
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('agenda-interne'); return false;",
                  )
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  EVT
                </div>
                <div className="doc-info">
                  <div className="doc-title">Comité de pilotage</div>
                  <div className="doc-meta">Aujourd’hui • 14:00</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('agenda-interne'); return false;",
                  )
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  RDV
                </div>
                <div className="doc-info">
                  <div className="doc-title">Point d’avancement</div>
                  <div className="doc-meta">Demain • 16:30</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('agenda-interne'); return false;",
                  )
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  AT
                </div>
                <div className="doc-info">
                  <div className="doc-title">Atelier cybersécurité</div>
                  <div className="doc-meta">12 Mai • 14:30</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* Contenus éditoriaux */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i
                    data-lucide="file-text"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Contenus éditoriaux
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(); return false;")
                }
                style={{ whiteSpace: "nowrap" }}
              >
                Consulter
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(4); return false;")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#fdf4ff",
                    color: "#9333ea",
                    fontWeight: 800,
                  }}
                >
                  INT
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Interview — Retour d’expérience “Digit‑Passe”
                  </div>
                  <div className="doc-meta">Innovation • 3 jours</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(10); return false;")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  DOS
                </div>
                <div className="doc-info">
                  <div className="doc-title">Dossier — Comité d’audit</div>
                  <div className="doc-meta">Gouvernance • Mars</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(9); return false;")
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  SOC
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Article — Colonies de vacances 2026
                  </div>
                  <div className="doc-meta">Social • 28 Mars</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* Multimédia */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i
                    data-lucide="play-circle"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Multimédia
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('mediatheque'); return false;",
                  )
                }
                style={{ whiteSpace: "nowrap" }}
              >
                Voir
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "openSubmenuView('mediatheque','videos'); return false;",
                  )
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#fdf4ff",
                    color: "#d946ef",
                    fontWeight: 800,
                  }}
                >
                  VID
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Capsule vidéo — Rétrospective Q1
                  </div>
                  <div className="doc-meta">3 min • À regarder</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "openMockDownload('Podcast_Parlons_Transformation_Episode_2.mp3','Podcast — Parlons transformation'); return false;",
                  )
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  POD
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Podcast — Parlons transformation
                  </div>
                  <div className="doc-meta">Épisode 2 • 12 min</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div
                className="doc-item"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "openSubmenuView('mediatheque','photos'); return false;",
                  )
                }
              >
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  IMG
                </div>
                <div className="doc-info">
                  <div className="doc-title">Galerie photos — Vie CMR</div>
                  <div className="doc-meta">Derniers événements</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* Filtrage des contenus */}
          <div className="dashboard-card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="sliders-horizontal"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Filtrage des contenus
              </div>
            </div>
            <div className="actu-page-header" style={{ padding: 0, margin: 0 }}>
              <div className="actu-page-title-row" style={{ gap: 10 }}>
                <div>
                  <p className="actu-page-sub" style={{ margin: 0 }}>
                    Filtrer par thématique ou entité.
                  </p>
                </div>
              </div>
              <div className="actu-search-wrap" style={{ maxWidth: 420 }}>
                <i data-lucide="search" className="actu-search-icon" />
                <input
                  id="commInterneSearchInput"
                  type="text"
                  className="actu-search-input"
                  placeholder="Rechercher dans la communication interne..."
                  onInput={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInternePreview(this.value)",
                    )
                  }
                />
              </div>
            </div>
            <div style={{ margin: "16px 0 0 0" }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Thématiques
              </div>
              <div
                id="commInterneThemeFilters"
                className="actu-filters"
                style={{ margin: 0 }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneCategory('all', this)",
                    )
                  }
                >
                  Toutes
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneCategory('Gouvernance', this)",
                    )
                  }
                >
                  Gouvernance
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneCategory('Digital', this)",
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
                      "filterCommInterneCategory('Innovation', this)",
                    )
                  }
                >
                  Innovation
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneCategory('Formation', this)",
                    )
                  }
                >
                  Formation
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneCategory('Social', this)",
                    )
                  }
                >
                  Social
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneCategory('Stratégie', this)",
                    )
                  }
                >
                  Stratégie
                </button>
              </div>
            </div>
            <div style={{ margin: "12px 0 0 0" }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Métiers / entités
              </div>
              <div
                id="commInterneMetierFilters"
                className="actu-filters"
                style={{ margin: 0 }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneMetier('all', this)",
                    )
                  }
                >
                  Tous
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneMetier('direction', this)",
                    )
                  }
                >
                  Direction
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneMetier('rh', this)",
                    )
                  }
                >
                  RH
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneMetier('digital', this)",
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
                      "filterCommInterneMetier('audit', this)",
                    )
                  }
                >
                  Audit
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInterneMetier('social', this)",
                    )
                  }
                >
                  Social
                </button>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    fontWeight: 700,
                  }}
                >
                  Aperçu (contenu réel)
                </div>
                <button
                  className="actu-filter-btn"
                  style={{ padding: "8px 12px" }}
                  onClick={(event) =>
                    runLegacyHandler(event, "goToActualitesFromCommInterne();")
                  }
                >
                  Voir tous les contenus
                </button>
              </div>
              <div id="commInternePreview" className="doc-list" />
            </div>
          </div>
        </div>
      </div>
      {/* ===== END COMMUNICATION INTERNE VIEW ===== */}
      {/* ===== AGENDA INTERNE VIEW (Communication interne) ===== */}
    </>
  );
}

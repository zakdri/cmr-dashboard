import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function RhSection() {
  return (
    <>
      <div id="view-rh" className="view-section km-container">
        <div className="km-header">
          <h2>Ressources Humaines</h2>
          <p>
            Gérez votre carrière, accédez à vos documents et découvrez nos
            opportunités internes.
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
              runLegacyHandler(event, "switchRhPageTab('carriere')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Ma Carrière
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
              runLegacyHandler(event, "switchRhPageTab('formation')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Formation
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
              runLegacyHandler(event, "switchRhPageTab('documents')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Documents RH
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
              runLegacyHandler(event, "switchRhPageTab('offres')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Postes Vacants
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
              runLegacyHandler(event, "switchRhPageTab('managers')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Espace Managers
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
              runLegacyHandler(event, "switchRhPageTab('enquetes')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Enquêtes RH
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
              runLegacyHandler(event, "switchRhPageTab('applis')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Mes Applis
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
              runLegacyHandler(event, "switchRhPageTab('forums')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Forums &amp; Groupes
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
              runLegacyHandler(event, "switchRhPageTab('viesociale')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Vie Sociale
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
              runLegacyHandler(event, "switchRhPageTab('activites')")
            }
            style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
          >
            Activités
          </div>
        </div>
        {/* TAB: MA CARRIÈRE */}
        <div
          id="page-rh-carriere"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="km-grid">
            <div className="doc-card" style={{ cursor: "default" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#3b82f6" }}
              >
                <i data-lucide="user" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Profil Collaborateur</div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-main)",
                  marginTop: 8,
                }}
              >
                <p>
                  <strong>Poste :</strong> Consultant Senior
                </p>
                <p>
                  <strong>Département :</strong> Digital &amp; Innovation
                </p>
                <p>
                  <strong>Ancienneté :</strong> 4 ans
                </p>
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  Modifier le profil
                </span>
                <i data-lucide="external-link" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "default" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i
                  data-lucide="trending-up"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">Évolution &amp; Objectifs</div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-main)",
                  marginTop: 8,
                }}
              >
                <p>
                  <strong>Entretien Annuel :</strong> Réalisé le 15/01/2026
                </p>
                <p>
                  <strong>Objectifs fixés :</strong> 5/5
                </p>
                <p>
                  <strong>Bonus atteint :</strong> 100%
                </p>
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  Voir le compte-rendu
                </span>
                <i data-lucide="file-text" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "default" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fdf2f8", color: "#db2777" }}
              >
                <i data-lucide="award" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Compétences &amp; Badges</div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "#fdf2f8",
                    border: "1px solid #fbcfe8",
                    padding: "4px 8px",
                    borderRadius: 20,
                    fontSize: 10,
                    color: "#be185d",
                  }}
                >
                  Agilité
                </span>
                <span
                  style={{
                    background: "#fdf2f8",
                    border: "1px solid #fbcfe8",
                    padding: "4px 8px",
                    borderRadius: 20,
                    fontSize: 10,
                    color: "#be185d",
                  }}
                >
                  Design Thinking
                </span>
                <span
                  style={{
                    background: "#fdf2f8",
                    border: "1px solid #fbcfe8",
                    padding: "4px 8px",
                    borderRadius: 20,
                    fontSize: 10,
                    color: "#be185d",
                  }}
                >
                  Tech Expert
                </span>
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#db2777", fontWeight: 600 }}>
                  Espace Compétences
                </span>
                <i data-lucide="chevron-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Parcours Collaborateur Timeline */}
          <div style={{ marginTop: 36 }}>
            <div className="app-category-title" style={{ marginBottom: 20 }}>
              Parcours Collaborateur
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "28px 32px",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-light)",
                  marginBottom: 28,
                }}
              >
                Suivez les différentes étapes du cycle de vie du collaborateur :
                onboarding, mobilité, départ.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 0,
                  position: "relative",
                }}
              >
                {/* Timeline line */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    right: 20,
                    height: 3,
                    background:
                      "linear-gradient(to right, #3b82f6, #8b5cf6, #f59e0b, #ef4444)",
                    borderRadius: 2,
                    zIndex: 0,
                  }}
                />
                {/* Steps */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#3b82f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #eff6ff",
                    }}
                  >
                    <i
                      data-lucide="door-open"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      Onboarding
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      Intégration &amp; accueil
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#dbeafe",
                        color: "#1d4ed8",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      Complété
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#8b5cf6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #f5f3ff",
                    }}
                  >
                    <i
                      data-lucide="briefcase"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      Prise de poste
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      Objectifs &amp; formation
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#ede9fe",
                        color: "#6d28d9",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      En cours
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#f59e0b",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #fffbeb",
                    }}
                  >
                    <i
                      data-lucide="repeat"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      Mobilité
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      Interne / promotion
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      À venir
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#ef4444",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #fef2f2",
                    }}
                  >
                    <i
                      data-lucide="log-out"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      Départ
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      Offboarding
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#fee2e2",
                        color: "#991b1b",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      N/A
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: FORMATION */}
        <div
          id="page-rh-formation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          {/* Catalogue de formation */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Catalogue de Formation
          </div>
          {/* Filtres */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Rechercher une formation..."
              style={{
                flex: 1,
                minWidth: 200,
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#1e293b",
              }}
            />
            <select
              id="filtre-theme"
              onChange={(event) =>
                runLegacyHandler(event, "filtrerCatalogue()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#475569",
              }}
            >
              <option value>Tous les thèmes</option>
              <option value="management">Management</option>
              <option value="data">Data &amp; IA</option>
              <option value="conformite">Conformité</option>
              <option value="softskills">Soft Skills</option>
              <option value="digital">Digital</option>
            </select>
            <select
              id="filtre-type"
              onChange={(event) =>
                runLegacyHandler(event, "filtrerCatalogue()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#475569",
              }}
            >
              <option value>Tous les types</option>
              <option value="interne">Interne</option>
              <option value="externe">Externe</option>
              <option value="elearning">e-Learning</option>
              <option value="certification">Certification</option>
            </select>
            <select
              id="filtre-duree"
              onChange={(event) =>
                runLegacyHandler(event, "filtrerCatalogue()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#475569",
              }}
            >
              <option value>Toutes les durées</option>
              <option value="court">Court (≤ 8h)</option>
              <option value="moyen">Moyen (8–20h)</option>
              <option value="long">Long (&gt; 20h)</option>
            </select>
            <button
              onClick={(event) =>
                runLegacyHandler(event, "reinitialiserFiltres()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#64748b",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Réinitialiser
            </button>
          </div>
          <div
            id="catalogue-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <div
              className="doc-card catalogue-item"
              data-theme="management"
              data-type="interne"
              data-duree="moyen"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#3b82f6" }}
              >
                <i data-lucide="book-open" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Leadership &amp; Management</div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                12 modules · 18h · Interne
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  S'inscrire
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card catalogue-item"
              data-theme="data"
              data-type="elearning"
              data-duree="moyen"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i
                  data-lucide="bar-chart-2"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                Data &amp; Intelligence Artificielle
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                8 modules · 12h · e-Learning
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  S'inscrire
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card catalogue-item"
              data-theme="conformite"
              data-type="externe"
              data-duree="court"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#fff7ed", color: "#ea580c" }}
              >
                <i data-lucide="shield" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Conformité &amp; Réglementation
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                5 modules · 8h · Externe
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#ea580c", fontWeight: 600 }}>
                  S'inscrire
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card catalogue-item"
              data-theme="softskills"
              data-type="interne"
              data-duree="moyen"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#fdf2f8", color: "#db2777" }}
              >
                <i data-lucide="users" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Soft Skills &amp; Communication
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                10 modules · 15h · Interne
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#db2777", fontWeight: 600 }}>
                  S'inscrire
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Supports Pédagogiques */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Supports Pédagogiques &amp; e-Learning
          </div>
          <div className="km-grid" style={{ marginBottom: 36 }}>
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#fef3c7", color: "#d97706" }}
              >
                <i data-lucide="video" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Module e-Learning : Excel Avancé
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                Vidéo · 2h30
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#d97706", fontWeight: 600 }}>Lire</span>
                <i data-lucide="play" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card">
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Guide Agilité – CMR Way.pdf</div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                Document · 34 pages
              </p>
              <div className="doc-card-meta">
                <span>Télécharger</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i data-lucide="mic" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Podcast : Intelligence Émotionnelle
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                Audio · 45min
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  Écouter
                </span>
                <i data-lucide="headphones" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Demande de Formation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div className="app-category-title" style={{ marginBottom: 0 }}>
              Demande de Formation
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={(event) =>
                  runLegacyHandler(event, "showDemandeForm()")
                }
                id="btn-nouvelle-demande"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--cmr-primary)",
                  color: "#fff",
                  border: "none",
                  padding: "9px 16px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                <i data-lucide="plus" style={{ width: 14 }} /> Nouvelle demande
              </button>
              <button
                onClick={(event) =>
                  runLegacyHandler(event, "showDemandeSuivi()")
                }
                id="btn-suivi-demande"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#fff",
                  color: "#475569",
                  border: "1px solid #e2e8f0",
                  padding: "9px 16px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                <i data-lucide="list" style={{ width: 14 }} /> Suivi des
                demandes
              </button>
            </div>
          </div>
          {/* Formulaire de soumission */}
          <div
            id="demande-form-section"
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 28,
              marginBottom: 36,
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "var(--text-light)",
                marginBottom: 20,
              }}
            >
              Renseignez les informations de votre demande. Elle sera transmise
              à votre manager puis à la RH.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Intitulé de la formation *
                </label>
                <input
                  type="text"
                  placeholder="Ex : Formation Management Agile"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Type de formation *
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                >
                  <option>Interne</option>
                  <option>Externe</option>
                  <option>e-Learning</option>
                  <option>Certification</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Date souhaitée *
                </label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Justification *
                </label>
                <input
                  type="text"
                  placeholder="Lien avec objectifs / projet"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
            <button
              onClick={(event) => runLegacyHandler(event, "showDemandeSuivi()")}
              className="primary-btn"
              style={{ width: "100%" }}
            >
              Soumettre la demande
            </button>
          </div>
          {/* Suivi des demandes */}
          <div
            id="demande-suivi-section"
            style={{ display: "none", marginBottom: 36 }}
          >
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
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      Formation demandée
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      Type
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      Date souhaitée
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      Soumise le
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      Power BI – Tableaux de bord avancés
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      e-Learning
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      Mai 2026
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      10/04/2026
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: "#dcfce7",
                          color: "#15803d",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        Validée RH
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      Leadership &amp; Influence
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      Externe
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      Juin 2026
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      18/04/2026
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: "#fef3c7",
                          color: "#92400e",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        En attente manager
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      Certification PMP
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      Certification
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      Sept 2026
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      22/04/2026
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: "#fee2e2",
                          color: "#991b1b",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        Refusée
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Workflow visuel */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                marginTop: 16,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Circuit de validation d'une demande
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#3b82f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="user"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    Collaborateur
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>Soumet</div>
                </div>
                <div style={{ flex: 1, height: 2, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#f59e0b",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="users"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    Manager
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    Valide / refuse
                  </div>
                </div>
                <div style={{ flex: 1, height: 2, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#16a34a",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="shield-check"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    RH
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    Valide &amp; planifie
                  </div>
                </div>
                <div style={{ flex: 1, height: 2, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#8b5cf6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="check-circle"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    Confirmée
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    Notification
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Historique des formations */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Historique des Formations
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
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    Formation
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    Durée
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    Design Thinking &amp; Innovation
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    Externe
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    10–12 Jan 2026
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    3 jours
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#15803d",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Validée
                    </span>
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    Gestion de Projet Agile (PMI-ACP)
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    Certification
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    5 Mars 2025
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    5 jours
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#15803d",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Validée
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    Power BI – Tableau de bord avancé
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    e-Learning
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    Avr 2026
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    6h
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      En cours
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* TAB: DOCUMENTS RH */}
        <div
          id="page-rh-documents"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Mes Documents RH
          </div>
          <div className="km-grid" style={{ marginBottom: 36 }}>
            <div
              className="doc-card"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "openPdfPreviewModal('docs/Demande_Attestation_de_Travail.pdf','Demande d\\'Attestation de Travail')",
                )
              }
            >
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Demande d'Attestation de Travail.pdf
              </div>
              <div className="doc-card-meta">
                <span>Formulaire</span>
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
                  "openPdfPreviewModal('docs/Reglement_Interieur_2026.pdf','Règlement Intérieur 2026')",
                )
              }
            >
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Règlement Intérieur 2026.pdf</div>
              <div className="doc-card-meta">
                <span>Information</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card">
              <div className="doc-icon-large word">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Modèle Demande de Congé Exceptionnel.docx
              </div>
              <div className="doc-card-meta">
                <span>Formulaire</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* Valeurs & Chartes */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Valeurs &amp; Chartes RH
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#fffbeb",
                "--hover-border": "#fde68a",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                }}
              >
                <i data-lucide="heart" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Charte des Valeurs CMR
                </span>
                <p className="app-card-desc">
                  Les 5 valeurs fondatrices qui guident notre organisation.
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
              style={{
                "--hover-bg": "#f5f3ff",
                "--hover-border": "#ddd6fe",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                }}
              >
                <i
                  data-lucide="shield-check"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Charte Éthique &amp; Déontologie
                </span>
                <p className="app-card-desc">
                  Principes d'intégrité et comportements attendus.
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
              style={{
                "--hover-bg": "#f0fdf4",
                "--hover-border": "#bbf7d0",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                <i data-lucide="leaf" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">Charte RSE</span>
                <p className="app-card-desc">
                  Engagements sociaux et environnementaux de la CMR.
                </p>
                <div className="app-card-action">
                  Consulter
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
          </div>
          {/* Référentiels RH */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Référentiels RH Réglementaires
          </div>
          <div className="km-grid">
            <div className="doc-card" style={{ cursor: "pointer" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fef2f2", color: "#dc2626" }}
              >
                <i data-lucide="scale" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Statut du Personnel CMR</div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                Texte réglementaire · Mise à jour 2026
              </p>
              <div className="doc-card-meta">
                <span>Dossier</span>
                <i
                  data-lucide="folder-open"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "pointer" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fef2f2", color: "#dc2626" }}
              >
                <i data-lucide="book" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Procédures RH Internes</div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                Procédures · 15 documents
              </p>
              <div className="doc-card-meta">
                <span>Dossier</span>
                <i
                  data-lucide="folder-open"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "pointer" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fef2f2", color: "#dc2626" }}
              >
                <i
                  data-lucide="list-checks"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                Référentiel des Emplois &amp; Compétences
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                GPEC · Version 2025
              </p>
              <div className="doc-card-meta">
                <span>Dossier</span>
                <i
                  data-lucide="folder-open"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TAB: POSTES VACANTS */}
        <div
          id="page-rh-offres"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          {/* ÉTAPE 1 : LISTE */}
          <div id="offres-liste">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 14, color: "var(--text-light)" }}>
                Consultez et postulez aux postes vacants en interne.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <select
                  style={{
                    padding: "8px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#475569",
                  }}
                >
                  <option>Toutes les directions</option>
                  <option>DSI</option>
                  <option>Direction Financière</option>
                  <option>Direction de la Communication</option>
                  <option>Direction Technique</option>
                </select>
                <select
                  style={{
                    padding: "8px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#475569",
                  }}
                >
                  <option>Tous les niveaux</option>
                  <option>Cadre</option>
                  <option>Expert</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  cursor: "pointer",
                }}
                onClick={(event) =>
                  runLegacyHandler(event, "showOffrefiche('bi')")
                }
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#fff7ed",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="briefcase"
                    style={{ width: 22, height: 22, color: "#ea580c" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    Chef de Projet BI (H/F)
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 3,
                    }}
                  >
                    Direction des Systèmes d'Information · Casablanca · Cadre
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>
                    Publié il y a 3 jours · 2 candidatures
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  Ouvert
                </span>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 18, color: "#94a3b8", flexShrink: 0 }}
                />
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  cursor: "pointer",
                }}
                onClick={(event) =>
                  runLegacyHandler(event, "showOffrefiche('comdig')")
                }
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#fff7ed",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="briefcase"
                    style={{ width: 22, height: 22, color: "#ea580c" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    Responsable Communication Digital (H/F)
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 3,
                    }}
                  >
                    Direction de la Communication · Siège · Manager
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>
                    Publié il y a 5 jours · 4 candidatures
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  Ouvert
                </span>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 18, color: "#94a3b8", flexShrink: 0 }}
                />
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  cursor: "pointer",
                }}
                onClick={(event) =>
                  runLegacyHandler(event, "showOffrefiche('actuariat')")
                }
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#fff7ed",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="briefcase"
                    style={{ width: 22, height: 22, color: "#ea580c" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    Analyste Risques &amp; Actuariat (H/F)
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 3,
                    }}
                  >
                    Direction Technique · Casablanca · Expert
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>
                    Clôture le 30/04/2026 · 7 candidatures
                  </div>
                </div>
                <span
                  style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  Clôture imminente
                </span>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 18, color: "#94a3b8", flexShrink: 0 }}
                />
              </div>
            </div>
          </div>
          {/* ÉTAPE 2 : FICHE POSTE */}
          <div id="offres-fiche" style={{ display: "none" }}>
            <button
              onClick={(event) => runLegacyHandler(event, "showOffresListe()")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                marginBottom: 20,
              }}
            >
              <i data-lucide="arrow-left" style={{ width: 16 }} /> Retour aux
              postes vacants
            </button>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 20,
                  marginBottom: 28,
                }}
              >
                <div>
                  <div
                    id="fiche-titre"
                    style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}
                  />
                  <div
                    id="fiche-meta"
                    style={{
                      fontSize: 13,
                      color: "var(--text-light)",
                      marginTop: 6,
                    }}
                  />
                </div>
                <button
                  onClick={(event) =>
                    runLegacyHandler(event, "showOffreFormulaire()")
                  }
                  style={{
                    background: "#ea580c",
                    color: "#fff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Postuler à ce poste
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Direction
                  </div>
                  <div
                    id="fiche-direction"
                    style={{
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Lieu
                  </div>
                  <div
                    id="fiche-lieu"
                    style={{
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Niveau
                  </div>
                  <div
                    id="fiche-niveau"
                    style={{
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Date limite
                  </div>
                  <div
                    id="fiche-date"
                    style={{
                      fontWeight: 600,
                      color: "#ea580c",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#1e293b",
                    marginBottom: 10,
                  }}
                >
                  Mission principale
                </div>
                <div
                  id="fiche-mission"
                  style={{ fontSize: 13, color: "#475569", lineHeight: "1.7" }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#1e293b",
                    marginBottom: 10,
                  }}
                >
                  Profil recherché
                </div>
                <ul
                  id="fiche-profil"
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    lineHeight: "1.9",
                    paddingLeft: 20,
                  }}
                />
              </div>
            </div>
          </div>
          {/* ÉTAPE 3 : FORMULAIRE DE CANDIDATURE */}
          <div id="offres-formulaire" style={{ display: "none" }}>
            <button
              onClick={(event) =>
                runLegacyHandler(event, "showOffrefiche(currentOffre)")
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                marginBottom: 20,
              }}
            >
              <i data-lucide="arrow-left" style={{ width: 16 }} /> Retour à la
              fiche poste
            </button>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 32,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 6,
                }}
              >
                Formulaire de Candidature
              </div>
              <div
                id="form-poste-titre"
                style={{
                  fontSize: 13,
                  color: "var(--text-light)",
                  marginBottom: 28,
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom et prénom"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Matricule *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : CMR-2021-0456"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Poste actuel *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre intitulé de poste actuel"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Direction actuelle *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre direction actuelle"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Ancienneté *
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  >
                    <option>Moins de 2 ans</option>
                    <option>2 – 5 ans</option>
                    <option>5 – 10 ans</option>
                    <option>Plus de 10 ans</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    placeholder="prenom.nom@cmr.ma"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Lettre de motivation *
                </label>
                <textarea
                  rows={5}
                  placeholder="Expliquez votre intérêt pour ce poste et les compétences que vous apporteriez..."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                  defaultValue={""}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  CV / Portfolio (optionnel)
                </label>
                <div
                  style={{
                    border: "2px dashed #e2e8f0",
                    borderRadius: 8,
                    padding: 20,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onMouseOver={(event) =>
                    runLegacyHandler(event, "this.style.borderColor='#3b82f6'")
                  }
                  onMouseOut={(event) =>
                    runLegacyHandler(event, "this.style.borderColor='#e2e8f0'")
                  }
                >
                  <i
                    data-lucide="upload-cloud"
                    style={{
                      width: 28,
                      height: 28,
                      color: "#94a3b8",
                      marginBottom: 8,
                    }}
                  />
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    Déposer votre fichier ici ou{" "}
                    <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                      parcourir
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                    PDF, DOC – max 5 Mo
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={(event) =>
                    runLegacyHandler(event, "showOffrefiche(currentOffre)")
                  }
                  style={{
                    flex: 1,
                    padding: 12,
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    background: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    color: "#475569",
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "alert('Candidature soumise avec succès ! Vous recevrez une confirmation par email.')",
                    )
                  }
                  style={{
                    flex: 2,
                    padding: 12,
                    border: "none",
                    borderRadius: 8,
                    background: "#ea580c",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Soumettre ma candidature
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: ESPACE MANAGERS */}
        <div
          id="page-rh-managers"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            Ressources dédiées aux managers : guides, outils et boîte à outils
            RH.
          </p>
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Guides &amp; Outils
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#f0f9ff",
                "--hover-border": "#bae6fd",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                }}
              >
                <i data-lucide="book-open" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Guide du Manager CMR
                </span>
                <p className="app-card-desc">
                  Toutes les pratiques RH essentielles pour bien manager.
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
              style={{
                "--hover-bg": "#f0fdf4",
                "--hover-border": "#bbf7d0",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                <i
                  data-lucide="clipboard-list"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Conduite des Entretiens
                </span>
                <p className="app-card-desc">
                  Grilles et bonnes pratiques pour l'entretien annuel.
                </p>
                <div className="app-card-action">
                  Télécharger
                  <i data-lucide="download" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#fff7ed",
                "--hover-border": "#fed7aa",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                <i data-lucide="users" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Gestion des Absences
                </span>
                <p className="app-card-desc">
                  Procédures et formulaires de gestion des absences.
                </p>
                <div className="app-card-action">
                  Accéder
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#fdf2f8",
                "--hover-border": "#fbcfe8",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #db2777)",
                }}
              >
                <i data-lucide="bar-chart" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  Tableaux de Bord RH
                </span>
                <p className="app-card-desc">
                  Suivi des indicateurs d'équipe : turnover, absentéisme,
                  formation.
                </p>
                <div className="app-card-action">
                  Voir
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
          </div>
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Calendrier RH Manager
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 12,
                  background: "#eff6ff",
                  borderRadius: 8,
                }}
              >
                <div style={{ minWidth: 48, textAlign: "center" }}>
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#2563eb" }}
                  >
                    30
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>AVRL</div>
                </div>
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                  >
                    Clôture des évaluations de performance T1
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    Tous les managers · En ligne
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 12,
                  background: "#f0fdf4",
                  borderRadius: 8,
                }}
              >
                <div style={{ minWidth: 48, textAlign: "center" }}>
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#16a34a" }}
                  >
                    15
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>MAI</div>
                </div>
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                  >
                    Atelier Managers : Feedback 360°
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    Salle A · 9h00–12h00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: ENQUÊTES RH */}
        <div
          id="page-rh-enquetes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            Baromètres sociaux, enquêtes d'engagement et indicateurs RH.
          </p>
          {/* Dashboard KPIs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#16a34a" }}>
                87%
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                Taux d'engagement
              </div>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>
                ↑ +3% vs 2025
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#3b82f6" }}>
                4.2/5
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                Satisfaction manager
              </div>
              <div style={{ fontSize: 11, color: "#3b82f6", marginTop: 4 }}>
                ↑ +0.4 vs 2025
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#f59e0b" }}>
                92%
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                Taux de participation
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                Baromètre 2025
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#8b5cf6" }}>
                3.8%
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                Taux d'absentéisme
              </div>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>
                ↓ -0.5% vs 2025
              </div>
            </div>
          </div>
          {/* Enquêtes actives */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Enquêtes en cours
          </div>
          <div className="km-grid" style={{ marginBottom: 32 }}>
            <div
              className="doc-card"
              style={{ borderLeft: "4px solid #3b82f6" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#3b82f6" }}
              >
                <i data-lucide="clipboard" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Baromètre Social 2026</div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                Clôture le 05/05/2026 · 156 répondants
              </p>
              <div
                style={{
                  height: 6,
                  background: "#f1f5f9",
                  borderRadius: 3,
                  margin: "12px 0",
                }}
              >
                <div
                  style={{
                    width: "65%",
                    height: "100%",
                    background: "#3b82f6",
                    borderRadius: 3,
                  }}
                />
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  Répondre
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ borderLeft: "4px solid #16a34a" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i data-lucide="smile" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Enquête Bien-être au Travail</div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                Clôture le 10/05/2026 · 89 répondants
              </p>
              <div
                style={{
                  height: 6,
                  background: "#f1f5f9",
                  borderRadius: 3,
                  margin: "12px 0",
                }}
              >
                <div
                  style={{
                    width: "40%",
                    height: "100%",
                    background: "#16a34a",
                    borderRadius: 3,
                  }}
                />
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  Répondre
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Résultats précédents */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Résultats des Enquêtes Précédentes
          </div>
          <div className="km-grid">
            <div className="doc-card">
              <div className="doc-icon-large pdf">
                <i
                  data-lucide="file-bar-chart"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                Baromètre Social 2025 – Résultats
              </div>
              <div className="doc-card-meta">
                <span>Rapport</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card">
              <div className="doc-icon-large pdf">
                <i
                  data-lucide="file-bar-chart"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                Enquête Télétravail 2025 – Synthèse
              </div>
              <div className="doc-card-meta">
                <span>Rapport</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TAB: MES APPLIS RH */}
        <div
          id="page-rh-applis"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            Accédez à l'ensemble des applications RH depuis un point unique.
          </p>
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Applications RH
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                transition: "box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="user-check"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  SIRH
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Gestion RH
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="calendar"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  Congés
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Gestion absences
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="dollar-sign"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  Paie
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Bulletins de paie
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="graduation-cap"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  LMS
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Formations en ligne
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #ec4899, #db2777)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="target"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  Performance
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Objectifs &amp; éval.
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="message-circle"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  Helpdesk RH
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Support &amp; tickets
                </div>
              </div>
            </a>
          </div>
        </div>
        {/* TAB: FORUMS & GROUPES (Collaboration RH) */}
        <div
          id="page-rh-forums"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 14, color: "var(--text-light)" }}>
                Échangez sur les sujets RH avec vos collègues et les communautés
                métier.
              </div>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                padding: "9px 18px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <i data-lucide="plus" style={{ width: 15, height: 15 }} /> Nouveau
              post
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#eff6ff",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="message-square"
                    style={{ width: 20, height: 20, color: "#3b82f6" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}
                  >
                    Forum Bien-être &amp; QVT
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    243 membres · 12 discussions actives
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Actif
                </span>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  SB
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                  >
                    Sarah B. ·{" "}
                    <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                      il y a 2h
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>
                    "Quelles sont vos pratiques pour maintenir l'équilibre
                    travail / vie perso en télétravail ?"
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="thumbs-up" style={{ width: 13 }} /> 14
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#3b82f6",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="message-circle" style={{ width: 13 }} />{" "}
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#f5f3ff",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="users"
                    style={{ width: 20, height: 20, color: "#8b5cf6" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}
                  >
                    Communauté Managers
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    87 membres · 6 discussions actives
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Actif
                </span>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#8b5cf6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  KA
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                  >
                    Karim A. ·{" "}
                    <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                      hier
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>
                    "Partage de la nouvelle grille d'entretien annuel 2026 — vos
                    retours sont les bienvenus."
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="thumbs-up" style={{ width: 13 }} /> 31
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#8b5cf6",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="message-circle" style={{ width: 13 }} />{" "}
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#fff7ed",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="lightbulb"
                    style={{ width: 20, height: 20, color: "#ea580c" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}
                  >
                    Communauté Innovation RH
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    134 membres · 8 discussions actives
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Actif
                </span>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#ea580c",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  NB
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                  >
                    Nadia B. ·{" "}
                    <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                      il y a 3 jours
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>
                    "Comment intégrez-vous l'IA dans vos processus RH ? Retours
                    d'expérience bienvenus."
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="thumbs-up" style={{ width: 13 }} /> 22
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#ea580c",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="message-circle" style={{ width: 13 }} />{" "}
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: VIE SOCIALE (Événements / Photos / Initiatives) */}
        <div
          id="page-rh-viesociale"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            Valorisez la vie interne et l'engagement collaborateur : événements,
            photos et initiatives collaboratives.
          </p>
          {/* Feed événements */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            Événements &amp; Initiatives
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 110,
                  minHeight: 100,
                  background: "linear-gradient(135deg,#ec4899,#db2777)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                  05
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  MAI 2026
                </div>
              </div>
              <div style={{ padding: "16px 20px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    Journée Portes Ouvertes CMR
                  </div>
                  <span
                    style={{
                      background: "#fdf2f8",
                      color: "#be185d",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Événement
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  Siège CMR · 9h00 – 17h00 · Ouvert à tous
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                  Découvrez les coulisses de la CMR et les projets en cours lors
                  de notre grande journée annuelle.
                </div>
                <button
                  style={{
                    marginTop: 12,
                    background: "#db2777",
                    color: "#fff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Participer
                </button>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 110,
                  minHeight: 100,
                  background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                  20
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  MAI 2026
                </div>
              </div>
              <div style={{ padding: "16px 20px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    Team Building Digital 2026
                  </div>
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Initiative
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  Salle Innovation · Direction Digital &amp; IT
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                  Hackathon interne, défis collaboratifs et remise des trophées
                  CMR Digital Awards.
                </div>
                <button
                  style={{
                    marginTop: 12,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Participer
                </button>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 110,
                  minHeight: 100,
                  background: "linear-gradient(135deg,#f59e0b,#d97706)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                  12
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  JUIN 2026
                </div>
              </div>
              <div style={{ padding: "16px 20px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    Fête de Fin d'Année CMR
                  </div>
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Événement
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  Hôtel Sofitel Rabat · 19h00 · Sur invitation
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                  Soirée annuelle de célébration des réussites et de cohésion
                  entre toutes les équipes CMR.
                </div>
                <button
                  style={{
                    marginTop: 12,
                    background: "#d97706",
                    color: "#fff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Participer
                </button>
              </div>
            </div>
          </div>
          {/* Galerie photos */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <i
              data-lucide="image"
              style={{ width: 16, height: 16, color: "#64748b" }}
            />
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>
              Galerie Photos
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 8,
            }}
          >
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src="images/intranet/news_contract.jpg"
                alt="Signature du contrat programme"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src="images/intranet/news_board.jpg"
                alt="Conseil d'administration CMR"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src="images/intranet/news_academy.jpg"
                alt="Session CMR Academy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src="images/intranet/slider_cmr_tech.png"
                alt="Innovation et transformation digitale"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src="images/intranet/slider_partnership.png"
                alt="Partenariat CMR"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src="images/intranet/slider1.png"
                alt="Temps fort intranet CMR"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src="images/intranet/slider2.png"
                alt="Initiative collaborateurs"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                background: "#f8fafc",
                border: "2px dashed #e2e8f0",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: 4,
              }}
            >
              <i
                data-lucide="plus-circle"
                style={{ width: 24, height: 24, color: "#94a3b8" }}
              />
              <span style={{ fontSize: 11, color: "#94a3b8" }}>Voir tout</span>
            </div>
          </div>
        </div>
        {/* TAB: ACTIVITÉS (Vie Interne) */}
        <div
          id="page-rh-activites"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 20,
            }}
          >
            Mettez en avant les initiatives des services.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 16,
            }}
          >
            <div
              className="doc-card"
              style={{ cursor: "pointer", border: "1px dashed #e2e8f0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#fdf2f8",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    data-lucide="heart"
                    style={{ width: 18, height: 18, color: "#db2777" }}
                  />
                </div>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  Association Solidarité CMR
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                Collecte de dons pour les employés en difficulté. Jusqu'au
                30/04/2026.
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#db2777", fontWeight: 600 }}>
                  Consulter
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ cursor: "pointer", border: "1px dashed #e2e8f0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#eff6ff",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    data-lucide="trophy"
                    style={{ width: 18, height: 18, color: "#3b82f6" }}
                  />
                </div>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  Tournoi Sportif CMR 2026
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                Football, tennis de table, course à pied. Inscriptions ouvertes
                jusqu'au 15/05.
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  Consulter
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ cursor: "pointer", border: "1px dashed #e2e8f0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#fef3c7",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    data-lucide="coffee"
                    style={{ width: 18, height: 18, color: "#d97706" }}
                  />
                </div>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  Petit-déjeuner Métiers
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                Rencontres mensuelles inter-directions. Prochain : 05/05/2026,
                Cafétéria Siège.
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#d97706", fontWeight: 600 }}>
                  Consulter
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* VIE SOCIALE VIEW */}
    </>
  );
}

import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function DashboardSection() {
  return (
    <>
      <div id="view-dashboard" className="view-section active">
        {" "}
        {/* DASHBOARD VIEW START */}
        {/* NEWS TICKER */}
        <div className="news-ticker-container">
          <div className="ticker-label">
            <i data-lucide="zap" style={{ width: 16, height: 16 }} />
            FLASH INFO
          </div>
          <div className="ticker-wrapper" id="tickerWrapper">
            {/* Content will be injected by JS */}
          </div>
        </div>
        {/* ACTUALITÉS SECTION REFINED */}
        <div className="dashboard-card news-card-v2">
          {/* NEWS SLIDER MINI */}
          <div className="news-slider-mini">
            <a
              href="#"
              className="news-slide-mini active"
              onClick={(event) =>
                runLegacyHandler(event, "goToActualites(1); return false;")
              }
            >
              <img
                src="images/intranet/news_contract.jpg"
                alt="Signature Contrat Programme"
              />
              <div className="mini-overlay">
                <div className="mini-news-title">
                  Signature du nouveau contrat programme Etat-CMR 2026-2028
                </div>
                <div
                  className="news-item-meta-mini"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Portée Stratégique • Hier
                </div>
              </div>
            </a>
            <a
              href="#"
              className="news-slide-mini"
              onClick={(event) =>
                runLegacyHandler(event, "goToActualites(2); return false;")
              }
            >
              <img
                src="images/intranet/news_board.jpg"
                alt="Conseil d'Administration"
              />
              <div className="mini-overlay">
                <div className="mini-news-title">
                  Tenue de la session ordinaire du Conseil d'Administration
                </div>
                <div
                  className="news-item-meta-mini"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Gouvernance • 2 jours
                </div>
              </div>
            </a>
            <a
              href="#"
              className="news-slide-mini"
              onClick={(event) =>
                runLegacyHandler(event, "goToActualites(5); return false;")
              }
            >
              <img src="images/intranet/news_academy.jpg" alt="CMR Academy" />
              <div className="mini-overlay">
                <div className="mini-news-title">
                  Lancement des nouveaux ateliers de la "CMR Academy"
                </div>
                <div
                  className="news-item-meta-mini"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Formation &amp; Développement • 1 semaine
                </div>
              </div>
            </a>
            <div
              className="carousel-indicators"
              style={{ right: 20, bottom: 15, zIndex: 10 }}
            >
              <div
                className="carousel-dot active"
                onClick={(event) => runLegacyHandler(event, "goToMiniSlide(0)")}
              />
              <div
                className="carousel-dot"
                onClick={(event) => runLegacyHandler(event, "goToMiniSlide(1)")}
              />
              <div
                className="carousel-dot"
                onClick={(event) => runLegacyHandler(event, "goToMiniSlide(2)")}
              />
            </div>
          </div>
          <div className="news-content-area">
            <div
              className="card-header"
              style={{ padding: 0, marginBottom: 24 }}
            >
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="newspaper"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Actualités
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(); return false;")
                }
              >
                Voir tout
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            {/* NEWS LIST MINI */}
            <div className="news-list-mini">
              <a
                href="#"
                className="news-item-mini"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(3); return false;")
                }
              >
                <img
                  src="images/intranet/slider_cmr_tech.png"
                  alt="Signature Electronique"
                />
                <div className="news-item-content-mini">
                  <div className="news-item-title-mini">
                    Déploiement de la solution de signature électronique
                  </div>
                  <div className="news-item-meta-mini">
                    Direction Digitale • Janv 2026
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="news-item-mini"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(4); return false;")
                }
              >
                <img src="images/intranet/slider2.png" alt="Innovation" />
                <div className="news-item-content-mini">
                  <div className="news-item-title-mini">
                    Résultats de la campagne d'innovation "Digit-Passe"
                  </div>
                  <div className="news-item-meta-mini">
                    Comité Innovation • 3 jours
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="news-item-mini"
                onClick={(event) =>
                  runLegacyHandler(event, "goToActualites(5); return false;")
                }
              >
                <img src="images/intranet/slider3.png" alt="RH" />
                <div className="news-item-content-mini">
                  <div className="news-item-title-mini">
                    Lancement du programme de formation "CMR Academy"
                  </div>
                  <div className="news-item-meta-mini">
                    Ressources Humaines • 1 semaine
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* MESSAGE DE LA DIRECTION (DG) */}
        <div
          className="dashboard-card"
          id="dgMessageCard"
          style={{ marginBottom: 24 }}
        >
          <div className="card-header" style={{ marginBottom: 16 }}>
            <div className="card-title">
              <div className="card-icon orange">
                <i data-lucide="megaphone" style={{ width: 20, height: 20 }} />
              </div>
              Message de la Direction
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: "linear-gradient(135deg, #fb923c, #f59e0b)",
                color: "white",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
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
                  marginBottom: 8,
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
                  <i data-lucide="calendar" style={{ width: 14, height: 14 }} />
                  25 Avril 2026
                </span>
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                  marginBottom: 6,
                  color: "var(--text-main)",
                }}
              >
                Point d’étape sur la feuille de route 2026
              </div>
              <div
                style={{
                  color: "var(--text-light)",
                  fontSize: 13,
                  lineHeight: "1.6",
                }}
              >
                Chers collaborateurs, je souhaite partager les priorités du
                trimestre et remercier les équipes mobilisées sur les chantiers
                de transformation. Retrouvez les décisions clés et les
                prochaines étapes dans l’espace Organisation &amp; Gouvernance.
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: "#f1f5f9",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--text-light)",
                    }}
                  >
                    <i data-lucide="user" style={{ width: 16, height: 16 }} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-light)" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--text-main)",
                        lineHeight: "1.1",
                      }}
                    >
                      Direction Générale
                    </div>
                    <div style={{ lineHeight: "1.1" }}>CMR Maroc</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    className="secondary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "markDgMessageRead()")
                    }
                    style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Marquer comme lu
                  </button>
                  <a
                    href="#"
                    className="primary-btn"
                    style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                    onClick={(event) =>
                      runLegacyHandler(event, "goToDgMessage(); return false;")
                    }
                  >
                    Lire le message
                    <i
                      data-lucide="arrow-right"
                      style={{ width: 14, height: 14 }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* QUICK ACCESS BAR */}
        <section className="quick-access-bar">
          <div className="quick-access-header">
            <div
              className="quick-access-title"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(event, "toggleModal('editModal')")
              }
            >
              <i
                data-lucide="layout-grid"
                style={{ width: 20, height: 20, color: "var(--cmr-primary)" }}
              />
              Accès Rapides
            </div>
            <button
              className="manage-btn"
              onClick={(event) =>
                runLegacyHandler(event, "toggleModal('editModal')")
              }
            >
              <i data-lucide="settings-2" style={{ width: 14, height: 14 }} />
              Gérer
            </button>
          </div>
          <div className="quick-access-grid">
            <a href="#" className="quick-access-item">
              <div className="quick-access-icon">
                <i
                  data-lucide="calendar-plus"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <span className="quick-access-label">Congés</span>
            </a>
            <a href="#" className="quick-access-item">
              <div className="quick-access-icon">
                <i data-lucide="door-open" style={{ width: 20, height: 20 }} />
              </div>
              <span className="quick-access-label">Réservation</span>
            </a>
            <a href="#" className="quick-access-item">
              <div className="quick-access-icon">
                <i data-lucide="file-text" style={{ width: 20, height: 20 }} />
              </div>
              <span className="quick-access-label">Note de frais</span>
            </a>
            <a href="#" className="quick-access-item">
              <div className="quick-access-icon">
                <i
                  data-lucide="sticky-note"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <span className="quick-access-label">Bloc-note</span>
            </a>
            <a href="#" className="quick-access-item">
              <div className="quick-access-icon">
                <i data-lucide="ticket" style={{ width: 20, height: 20 }} />
              </div>
              <span className="quick-access-label">Support IT</span>
            </a>
            <a href="#" className="quick-access-item">
              <div className="quick-access-icon">
                <i data-lucide="book-open" style={{ width: 20, height: 20 }} />
              </div>
              <span className="quick-access-label">Documentation</span>
            </a>
          </div>
        </section>
        {/* DASHBOARD GRID */}
        <div className="dashboard-grid">
          {/* MES APPLICATIONS */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="layers" style={{ width: 20, height: 20 }} />
                </div>
                Mes Applications
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(event, "switchView('applis'); return false;")
                }
              >
                Voir tout
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="app-grid">
              <div className="app-item">
                <div
                  className="app-icon"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  }}
                >
                  <i data-lucide="users" style={{ width: 22, height: 22 }} />
                </div>
                <span className="app-name">SIRH</span>
              </div>
              <div className="app-item">
                <div
                  className="app-icon"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  }}
                >
                  <i data-lucide="banknote" style={{ width: 22, height: 22 }} />
                </div>
                <span className="app-name">Paie</span>
              </div>
              <div className="app-item">
                <div
                  className="app-icon"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #9333ea)",
                  }}
                >
                  <i
                    data-lucide="folder-open"
                    style={{ width: 22, height: 22 }}
                  />
                </div>
                <span className="app-name">GED</span>
              </div>
              <div className="app-item">
                <div
                  className="app-icon"
                  style={{
                    background: "linear-gradient(135deg, #ec4899, #db2777)",
                  }}
                >
                  <i
                    data-lucide="life-buoy"
                    style={{ width: 22, height: 22 }}
                  />
                </div>
                <span className="app-name">Support</span>
              </div>
              <div className="app-item">
                <div
                  className="app-icon"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                  }}
                >
                  <i
                    data-lucide="megaphone"
                    style={{ width: 22, height: 22 }}
                  />
                </div>
                <span className="app-name">Com</span>
              </div>
              <div className="app-item">
                <div
                  className="app-icon"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  }}
                >
                  <i
                    data-lucide="book-user"
                    style={{ width: 22, height: 22 }}
                  />
                </div>
                <span className="app-name">Annuaire</span>
              </div>
            </div>
          </div>
          {/* STATISTIQUES */}
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
              <a href="#" className="card-action">
                Actualiser
                <i data-lucide="refresh-cw" style={{ width: 14, height: 14 }} />
              </a>
            </div>
            <div className="stat-grid">
              <div className="stat-item blue">
                <div className="stat-value">87%</div>
                <div className="stat-label">Productivité</div>
                <i
                  data-lucide="trending-up"
                  className="stat-icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
              <div className="stat-item green">
                <div className="stat-value">152</div>
                <div className="stat-label">Utilisateurs</div>
                <i
                  data-lucide="users"
                  className="stat-icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
              <div className="stat-item purple">
                <div className="stat-value">12</div>
                <div className="stat-label">Projets</div>
                <i
                  data-lucide="briefcase"
                  className="stat-icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
              <div className="stat-item orange">
                <div className="stat-value">98%</div>
                <div className="stat-label">Satisfaction</div>
                <i
                  data-lucide="star"
                  className="stat-icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
            </div>
          </div>
          {/* INDICATEURS RH / KPI SOCIAUX */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="heart-handshake"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Indicateurs RH
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(event, "switchView('rh'); return false;")
                }
              >
                Voir plus
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="stat-grid">
              <div className="stat-item blue">
                <div className="stat-value">94%</div>
                <div className="stat-label">Engagement</div>
                <i
                  data-lucide="smile"
                  className="stat-icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
              <div className="stat-item green">
                <div className="stat-value">4.2</div>
                <div className="stat-label">Baromètre</div>
                <i
                  data-lucide="gauge"
                  className="stat-icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
              <div className="stat-item purple">
                <div className="stat-value">18</div>
                <div className="stat-label">Postes vacants</div>
                <i
                  data-lucide="user-plus"
                  className="stat-icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
            </div>
          </div>
          {/* WIDGETS DYNAMIQUES (ÉVÉNEMENTS / FORMATIONS / ALERTES) */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="sparkles" style={{ width: 20, height: 20 }} />
                </div>
                Widgets dynamiques
              </div>
              <a
                href="#"
                className="card-action"
                style={{ whiteSpace: "nowrap" }}
              >
                Actualiser
                <i data-lucide="refresh-cw" style={{ width: 14, height: 14 }} />
              </a>
            </div>
            <div className="doc-list">
              <div className="doc-item">
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
                  <div className="doc-title">Événements</div>
                  <div className="doc-meta">
                    À venir • Agenda &amp; inscriptions
                  </div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  FOR
                </div>
                <div className="doc-info">
                  <div className="doc-title">Formations</div>
                  <div className="doc-meta">
                    Nouveautés • Parcours &amp; e-learning
                  </div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  ALT
                </div>
                <div className="doc-info">
                  <div className="doc-title">Alertes</div>
                  <div className="doc-meta">
                    Infos importantes • À surveiller
                  </div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* GOUVERNANCE (COMITÉS / COMPTES RENDUS) */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i data-lucide="landmark" style={{ width: 20, height: 20 }} />
                </div>
                Gouvernance
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                Voir plus
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div className="doc-item">
                <div className="doc-icon pdf">PDF</div>
                <div className="doc-info">
                  <div className="doc-title">
                    Compte rendu — Comité de Direction
                  </div>
                  <div className="doc-meta">Mars 2026 • Validé</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div className="doc-icon doc">DOC</div>
                <div className="doc-info">
                  <div className="doc-title">
                    Ordre du jour — Conseil d'Administration
                  </div>
                  <div className="doc-meta">Avril 2026 • À venir</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div className="doc-icon xls">XLS</div>
                <div className="doc-info">
                  <div className="doc-title">Suivi décisions — Comités</div>
                  <div className="doc-meta">Mis à jour hier</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* PUBLICATION CROISÉE */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="share-2" style={{ width: 20, height: 20 }} />
                </div>
                Publication croisée
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(event, "switchView('admin'); return false;")
                }
                style={{ whiteSpace: "nowrap" }}
              >
                Gérer
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  AUTO
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Actualités → Accueil + Rubrique “Organisation &amp;
                    Gouvernance”
                  </div>
                  <div className="doc-meta">
                    Règle active • Affichage en double entrée
                  </div>
                </div>
                <i
                  data-lucide="check-circle"
                  style={{ width: 16, height: 16, color: "#16a34a" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  RH
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Vie RH → Accueil + RH &amp; Mobilité
                  </div>
                  <div className="doc-meta">
                    Règle active • Visibilité collaborateurs
                  </div>
                </div>
                <i
                  data-lucide="check-circle"
                  style={{ width: 16, height: 16, color: "#16a34a" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  OPT
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Événements → Accueil + Vie sociale
                  </div>
                  <div className="doc-meta">
                    Optionnel • Selon type d’événement
                  </div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* VIE RH (NOMINATIONS / RECRUTEMENTS / DÉPARTS) */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="users-round"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Vie RH
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(event, "switchView('rh'); return false;")
                }
              >
                Voir plus
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  NEW
                </div>
                <div className="doc-info">
                  <div className="doc-title">Nominations</div>
                  <div className="doc-meta">3 mouvements • Cette semaine</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  HR
                </div>
                <div className="doc-info">
                  <div className="doc-title">Recrutements</div>
                  <div className="doc-meta">2 arrivées • Avril 2026</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  OUT
                </div>
                <div className="doc-info">
                  <div className="doc-title">Départs</div>
                  <div className="doc-meta">1 départ • Mois en cours</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* VIE INTERNE (INFOS ÉVÉNEMENTIELLES) */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="calendar-clock"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Vie interne
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('vie-sociale'); return false;",
                  )
                }
              >
                Voir plus
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div className="doc-item">
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
                  <div className="doc-title">
                    Séminaire interne — Transformation digitale
                  </div>
                  <div className="doc-meta">Jeu 07 Mai • 10:00</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  COM
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Atelier — Bonnes pratiques cybersécurité
                  </div>
                  <div className="doc-meta">Mar 12 Mai • 14:30</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  INF
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Note interne — Organisation des horaires été
                  </div>
                  <div className="doc-meta">Publié aujourd’hui</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* PILOTAGE INSTITUTIONNEL (MISES À JOUR STRATÉGIQUES) */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i data-lucide="compass" style={{ width: 20, height: 20 }} />
                </div>
                Pilotage institutionnel
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                Voir plus
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="doc-list">
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  STR
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Mise à jour — Feuille de route stratégique 2026
                  </div>
                  <div className="doc-meta">Publié il y a 2 jours</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  PRJ
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Point d’avancement — Programme de transformation
                  </div>
                  <div className="doc-meta">
                    Comité de pilotage • Semaine prochaine
                  </div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
              <div className="doc-item">
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  KPI
                </div>
                <div className="doc-info">
                  <div className="doc-title">
                    Synthèse trimestrielle — Indicateurs clés
                  </div>
                  <div className="doc-meta">T1 2026 • À consulter</div>
                </div>
                <i
                  data-lucide="chevron-right"
                  style={{ width: 16, height: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* RUBRIQUES INSTITUTIONNELLES (MACRO-BLOCS) */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="building-2"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Rubriques institutionnelles
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
                style={{ whiteSpace: "nowrap", flexWrap: "nowrap" }}
              >
                Voir plus
                <i
                  data-lucide="arrow-right"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div
              className="quick-access-grid"
              id="instShortcutsGrid"
              style={{
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i data-lucide="network" style={{ width: 20, height: 20 }} />
                </div>
                <span className="quick-access-label">Organisation</span>
              </a>
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i data-lucide="target" style={{ width: 20, height: 20 }} />
                </div>
                <span className="quick-access-label">Stratégie</span>
              </a>
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i data-lucide="landmark" style={{ width: 20, height: 20 }} />
                </div>
                <span className="quick-access-label">Gouvernance</span>
              </a>
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i
                    data-lucide="file-text"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                <span className="quick-access-label">Référentiels</span>
              </a>
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i
                    data-lucide="handshake"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                <span className="quick-access-label">Partenariats</span>
              </a>
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i
                    data-lucide="book-open"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                <span className="quick-access-label">Textes</span>
              </a>
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i
                    data-lucide="bar-chart-3"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                <span className="quick-access-label">Indicateurs</span>
              </a>
              <a
                href="#"
                className="quick-access-item inst-shortcut"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('institutionnel'); return false;",
                  )
                }
              >
                <div className="quick-access-icon">
                  <i
                    data-lucide="clipboard-list"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                <span className="quick-access-label">Décisions</span>
              </a>
            </div>
          </div>
          {/* KNOWLEDGE MANAGEMENT */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="library" style={{ width: 20, height: 20 }} />
                </div>
                Knowledge Management
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "openSubmenuView('km','referentiels'); return false;",
                  )
                }
              >
                Explorer
                <i data-lucide="compass" style={{ width: 14, height: 14 }} />
              </a>
            </div>
            <div className="km-tabs">
              <button
                className="km-tab active"
                onClick={(event) =>
                  runLegacyHandler(event, "switchKmTab('referentiels')")
                }
              >
                Référentiels
              </button>
              <button
                className="km-tab"
                onClick={(event) =>
                  runLegacyHandler(event, "switchKmTab('rex')")
                }
              >
                REX
              </button>
            </div>
            <div id="km-referentiels" className="km-content active">
              <div className="doc-list">
                <div className="doc-item">
                  <div className="doc-icon pdf">PDF</div>
                  <div className="doc-info">
                    <div className="doc-title">
                      Guide des indicateurs de retraite
                    </div>
                    <div className="doc-meta">
                      Référentiels métiers • Version 2026
                    </div>
                  </div>
                  <i
                    data-lucide="download"
                    style={{ width: 16, height: 16, color: "#94a3b8" }}
                  />
                </div>
                <div className="doc-item">
                  <div className="doc-icon xls">XLS</div>
                  <div className="doc-info">
                    <div className="doc-title">Procédure SSO &amp; accès</div>
                    <div className="doc-meta">Référentiels SI • Mis à jour</div>
                  </div>
                  <i
                    data-lucide="download"
                    style={{ width: 16, height: 16, color: "#94a3b8" }}
                  />
                </div>
                <div className="doc-item">
                  <div className="doc-icon doc">DOC</div>
                  <div className="doc-info">
                    <div className="doc-title">
                      Charte KM – bonnes pratiques
                    </div>
                    <div className="doc-meta">
                      Structuration • Semaine dernière
                    </div>
                  </div>
                  <i
                    data-lucide="download"
                    style={{ width: 16, height: 16, color: "#94a3b8" }}
                  />
                </div>
              </div>
            </div>
            <div id="km-rex" className="km-content">
              <div className="doc-list">
                <div className="doc-item">
                  <div
                    className="doc-icon"
                    style={{ background: "#f0fdf4", color: "#16a34a" }}
                  >
                    <i data-lucide="rss" style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="doc-info">
                    <div className="doc-title">
                      REX – Refonte intranet: adoption
                    </div>
                    <div className="doc-meta">Projet • Avr 2026</div>
                  </div>
                </div>
                <div className="doc-item">
                  <div
                    className="doc-icon"
                    style={{ background: "#fdf4ff", color: "#d946ef" }}
                  >
                    <i
                      data-lucide="trending-up"
                      style={{ width: 18, height: 18 }}
                    />
                  </div>
                  <div className="doc-info">
                    <div className="doc-title">REX – Processus tickets IT</div>
                    <div className="doc-meta">Processus • Mars 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* BOÎTE À IDÉES */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i
                    data-lucide="lightbulb"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Boîte à Idées
              </div>
              <a
                href="#"
                className="card-action"
                onClick={(event) =>
                  runLegacyHandler(
                    event,
                    "switchView('innovation'); return false;",
                  )
                }
              >
                Contribuer
                <i
                  data-lucide="plus-circle"
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
            <div className="idee-stats">
              <div className="idee-stat">
                <div className="idee-number">47</div>
                <div className="idee-label">Votes en cours</div>
              </div>
              <div className="idee-stat">
                <div className="idee-number">12</div>
                <div className="idee-label">En évaluation</div>
              </div>
            </div>
            <div className="idee-progress">
              <div className="idee-check">
                <i data-lucide="check" style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <div
                  style={{ fontSize: 16, fontWeight: 700, color: "#14532d" }}
                >
                  5 Idées
                </div>
                <div style={{ fontSize: 12, color: "#15803d" }}>
                  Implémentées ce mois
                </div>
              </div>
              <i
                data-lucide="arrow-right"
                style={{
                  width: 16,
                  height: 16,
                  color: "#15803d",
                  marginLeft: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>{" "}
      {/* END DASHBOARD VIEW */}
      {/* ===== FLASH INFO DETAIL VIEW ===== */}
    </>
  );
}

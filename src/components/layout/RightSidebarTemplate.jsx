import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function RightSidebarTemplate() {
  return (
    <>
      {/* RIGHT SIDEBAR */}
      <aside className="sidebar-right" id="rightSidebar">
        {/* CITATION DU JOUR */}
        <div className="quote-block">
          <div className="right-block-header">
            <div
              className="right-block-icon"
              style={{ background: "var(--cmr-primary)", color: "white" }}
            >
              <i data-lucide="quote" style={{ width: 18, height: 18 }} />
            </div>
            <strong>Citation du Jour</strong>
          </div>
          <div
            className="quote-text"
            style={{
              color: "#1e293b",
              fontSize: 15,
              fontStyle: "italic",
              lineHeight: "1.6",
              display: "block",
            }}
          >
            "L'innovation distingue les leaders des suiveurs. Notre ambition est
            de transformer chaque défi en opportunité de croissance."
          </div>
        </div>
        {/* HUMEUR DU JOUR */}
        <div className="right-block">
          <div className="right-block-header">
            <div
              className="right-block-icon"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
              }}
            >
              <i data-lucide="smile" style={{ width: 18, height: 18 }} />
            </div>
            <span id="mood-title">Humeur du jour</span>
          </div>
          <div className="mood-results" id="moodResults">
            <div className="mood-stat">
              <span className="mood-stat-label">🤩</span>
              <div className="mood-stat-bar-bg">
                <div
                  className="mood-stat-bar-fill"
                  style={{ background: "#22c55e" }}
                  data-percent={45}
                />
              </div>
              <span className="mood-stat-percent">45%</span>
            </div>
            <div className="mood-stat">
              <span className="mood-stat-label">😊</span>
              <div className="mood-stat-bar-bg">
                <div
                  className="mood-stat-bar-fill"
                  style={{ background: "#84cc16" }}
                  data-percent={30}
                />
              </div>
              <span className="mood-stat-percent">30%</span>
            </div>
            <div className="mood-stat">
              <span className="mood-stat-label">😐</span>
              <div className="mood-stat-bar-bg">
                <div
                  className="mood-stat-bar-fill"
                  style={{ background: "#eab308" }}
                  data-percent={15}
                />
              </div>
              <span className="mood-stat-percent">15%</span>
            </div>
            <div className="mood-stat">
              <span className="mood-stat-label">🙁</span>
              <div className="mood-stat-bar-bg">
                <div
                  className="mood-stat-bar-fill"
                  style={{ background: "#f97316" }}
                  data-percent={7}
                />
              </div>
              <span className="mood-stat-percent">7%</span>
            </div>
            <div className="mood-stat">
              <span className="mood-stat-label">😡</span>
              <div className="mood-stat-bar-bg">
                <div
                  className="mood-stat-bar-fill"
                  style={{ background: "#ef4444" }}
                  data-percent={3}
                />
              </div>
              <span className="mood-stat-percent">3%</span>
            </div>
            <button
              className="retry-mood-btn"
              onClick={(event) => runLegacyHandler(event, "resetMood()")}
            >
              <i data-lucide="rotate-ccw" style={{ width: 14, height: 14 }} />
              Changer d'avis
            </button>
          </div>
          <div className="mood-buttons" id="moodButtons">
            <button
              className="mood-btn"
              data-mood="great"
              onClick={(event) => runLegacyHandler(event, "selectMood(this)")}
            >
              <i data-lucide="laugh" style={{ width: 20, height: 20 }} />
            </button>
            <button
              className="mood-btn"
              data-mood="good"
              onClick={(event) => runLegacyHandler(event, "selectMood(this)")}
            >
              <i data-lucide="smile" style={{ width: 20, height: 20 }} />
            </button>
            <button
              className="mood-btn"
              data-mood="neutral"
              onClick={(event) => runLegacyHandler(event, "selectMood(this)")}
            >
              <i data-lucide="meh" style={{ width: 20, height: 20 }} />
            </button>
            <button
              className="mood-btn"
              data-mood="bad"
              onClick={(event) => runLegacyHandler(event, "selectMood(this)")}
            >
              <i data-lucide="frown" style={{ width: 20, height: 20 }} />
            </button>
            <button
              className="mood-btn"
              data-mood="terrible"
              onClick={(event) => runLegacyHandler(event, "selectMood(this)")}
            >
              <i data-lucide="angry" style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>
        {/* AGENDAS WIDGET */}
        {/* AGENDAS WIDGET */}
        <div className="right-block">
          <div className="right-block-header">
            <div
              className="right-block-icon"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
              }}
            >
              <i
                data-lucide="calendar-check"
                style={{ width: 18, height: 18 }}
              />
            </div>
            <strong>Agendas</strong>
            <button
              className="manage-btn"
              style={{
                marginLeft: "auto",
                background: "rgba(0,0,0,0.03)",
                border: "none",
                padding: "4px 8px",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#64748b",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              <i data-lucide="settings-2" style={{ width: 12, height: 12 }} />
              Gérer
            </button>
          </div>
          {/* Pill Tabs */}
          <div
            style={{
              background: "#f1f5f9",
              padding: 4,
              borderRadius: 12,
              display: "flex",
              marginBottom: 20,
            }}
          >
            <button
              id="tab-perso-btn"
              onClick={(event) =>
                runLegacyHandler(event, "openAgendaTab('perso')")
              }
              className="agenda-tab-btn active"
              style={{
                flex: 1,
                textAlign: "center",
                padding: 8,
                background: "white",
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                color: "#f59e0b",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              Ma Journée
            </button>
            <button
              id="tab-cmr-btn"
              onClick={(event) =>
                runLegacyHandler(event, "openAgendaTab('cmr')")
              }
              className="agenda-tab-btn"
              style={{
                flex: 1,
                textAlign: "center",
                padding: 8,
                background: "transparent",
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 500,
                color: "#64748b",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              Calendrier CMR
            </button>
          </div>
          {/* CONTENT: PERSO */}
          <div
            id="agenda-perso-list"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {/* Agenda Item 1 */}
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div
                style={{
                  background: "#eff6ff",
                  color: "#3b82f6",
                  width: 45,
                  height: 45,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800 }}>14:00</span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: 4,
                  }}
                >
                  Comité de Pilotage
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <i
                      data-lucide="map-pin"
                      style={{ width: 10, height: 10 }}
                    />{" "}
                    Salle A
                  </div>
                  <button
                    style={{
                      background: "#eff6ff",
                      color: "#3b82f6",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <i data-lucide="video" style={{ width: 12, height: 12 }} />
                    Rejoindre
                  </button>
                </div>
              </div>
            </div>
            {/* Agenda Item 2 (Meeting) */}
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div
                style={{
                  background: "#eff6ff",
                  color: "#3b82f6",
                  width: 45,
                  height: 45,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800 }}>16:30</span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: 4,
                  }}
                >
                  Point d'avancement
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <i data-lucide="video" style={{ width: 10, height: 10 }} />{" "}
                    Teams
                  </div>
                  <button
                    style={{
                      background: "#eff6ff",
                      color: "#3b82f6",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <i data-lucide="video" style={{ width: 12, height: 12 }} />
                    Rejoindre
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* CONTENT: CMR */}
          <div
            id="agenda-cmr-list"
            style={{ display: "none", flexDirection: "column", gap: 12 }}
          >
            {/* Event 1 */}
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  overflow: "hidden",
                  width: 45,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    background: "#ef4444",
                    color: "white",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "2px 0",
                  }}
                >
                  FÉV
                </div>
                <div
                  style={{
                    padding: "4px 0",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#1e293b",
                  }}
                >
                  15
                </div>
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
                >
                  Assemblée Générale
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  Auditorium Principal
                </div>
              </div>
            </div>
            {/* Event 2 */}
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  overflow: "hidden",
                  width: 45,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "2px 0",
                  }}
                >
                  MAR
                </div>
                <div
                  style={{
                    padding: "4px 0",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#1e293b",
                  }}
                >
                  08
                </div>
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
                >
                  Journée de la Femme
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  Événement Interne
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ANNIVERSAIRES */}
        <div className="right-block">
          <div className="right-block-header">
            <div
              className="right-block-icon"
              style={{
                background: "linear-gradient(135deg, #ec4899, #db2777)",
              }}
            >
              <i data-lucide="cake" style={{ width: 18, height: 18 }} />
            </div>
            Anniversaires
          </div>
          <div className="team-list" style={{ gap: 16 }}>
            <div
              className="team-member"
              style={{
                background: "white",
                padding: 16,
                borderRadius: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                border: "none",
              }}
            >
              <div
                className="member-avatar"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  width: 44,
                  height: 44,
                  color: "white",
                  boxShadow: "0 4px 10px rgba(245, 158, 11, 0.2)",
                }}
              >
                <i
                  data-lucide="party-popper"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <div className="member-info">
                <span className="member-name" style={{ fontSize: 15 }}>
                  Yassine Benali
                </span>
                <span
                  className="member-role"
                  style={{ color: "#f59e0b", fontWeight: 700 }}
                >
                  Aujourd'hui • Marketing
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* FLASH INFO */}
        <div className="flash-info-card">
          <div className="right-block-header">
            <div
              className="right-block-icon"
              style={{ background: "#ef4444", color: "white" }}
            >
              <i data-lucide="bell-ring" style={{ width: 18, height: 18 }} />
            </div>
            <strong>Flash Info</strong>
            <span className="live-badge" style={{ marginLeft: "auto" }}>
              LIVE
            </span>
          </div>
          <div className="flash-content-box">
            <div className="flash-subject">Maintenance Serveur</div>
            <div className="flash-desc">
              Ce soir à partir de 18h00. Indisponibilité estimée: 2h.
            </div>
          </div>
        </div>
        {/* MA FORMATION */}
        <div className="right-block">
          <div className="right-block-header">
            <div
              className="right-block-icon"
              style={{ background: "var(--cmr-primary)" }}
            >
              <i
                data-lucide="graduation-cap"
                style={{ width: 18, height: 18 }}
              />
            </div>
            <strong>Ma Formation</strong>
          </div>
          <div className="formation-item">
            <div className="formation-icon-box">
              <i data-lucide="shield-check" style={{ width: 18, height: 18 }} />
            </div>
            <div className="member-info">
              <span
                className="member-name"
                style={{ fontSize: 14, fontWeight: 700 }}
              >
                Cybersécurité 101
              </span>
              <span
                className="member-role"
                style={{
                  color: "var(--cmr-primary)",
                  fontWeight: 700,
                  fontSize: 11,
                }}
              >
                Obligatoire
              </span>
            </div>
          </div>
          <div className="formation-progress-container">
            <div className="formation-label">
              <span>Progression</span>
              <span>35%</span>
            </div>
            <div className="formation-bar-bg">
              <div className="formation-bar-fill" style={{ width: "35%" }} />
            </div>
            <button className="formation-btn">Reprendre</button>
          </div>
        </div>
      </aside>
    </>
  );
}

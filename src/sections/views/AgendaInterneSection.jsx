import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function AgendaInterneSection() {
  return (
    <>
      <div id="view-agenda-interne" className="view-section km-container">
        <div className="km-header">
          <h2>Agenda interne</h2>
          <p>
            Calendrier des événements internes : comités, ateliers et
            initiatives.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          <button
            className="actu-back-btn"
            onClick={(event) =>
              runLegacyHandler(event, "switchView('communication-interne')")
            }
            style={{ margin: 0 }}
          >
            <i data-lucide="arrow-left" style={{ width: 16, height: 16 }} />
            Retour à Communication interne
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                padding: "8px 12px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                color: "#475569",
              }}
            >
              <i data-lucide="chevron-left" style={{ width: 14, height: 14 }} />
            </button>
            <div style={{ fontWeight: 700, color: "#1e293b" }}>
              Semaine en cours
            </div>
            <button
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                padding: "8px 12px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                color: "#475569",
              }}
            >
              <i
                data-lucide="chevron-right"
                style={{ width: 14, height: 14 }}
              />
            </button>
          </div>
        </div>
        <div
          className="dashboard-grid"
          style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
        >
          {/* Calendrier (placeholder UX) */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="calendar-days"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Calendrier
              </div>
            </div>
            <div style={{ padding: "18px 18px 22px 18px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 8,
                  fontSize: 11,
                  color: "#94a3b8",
                  marginBottom: 10,
                }}
              >
                <div>Lun</div>
                <div>Mar</div>
                <div>Mer</div>
                <div>Jeu</div>
                <div>Ven</div>
                <div>Sam</div>
                <div>Dim</div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    height: 36,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  —
                </div>
                <div
                  style={{
                    height: 36,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  —
                </div>
                <div
                  style={{
                    height: 36,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  —
                </div>
                <div
                  style={{
                    height: 36,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  —
                </div>
                <div
                  style={{
                    height: 36,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1d4ed8",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  Aujourd’hui
                </div>
                <div
                  style={{
                    height: 36,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  —
                </div>
                <div
                  style={{
                    height: 36,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  —
                </div>
              </div>
              <div
                style={{
                  marginTop: 14,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  color: "#475569",
                  lineHeight: "1.6",
                }}
              >
                Astuce : cette vue est dédiée à l’“Agenda interne”
                (Communication interne) pour éviter le mélange avec “Vie
                Sociale”.
              </div>
            </div>
          </div>
          {/* Liste des événements */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i data-lucide="list" style={{ width: 20, height: 20 }} />
                </div>
                Prochains événements
              </div>
            </div>
            <div className="doc-list">
              <div className="doc-item" style={{ cursor: "default" }}>
                <div
                  className="doc-icon"
                  style={{
                    background: "#eff6ff",
                    color: "#256cb5",
                    fontWeight: 800,
                  }}
                >
                  14:00
                </div>
                <div className="doc-info">
                  <div className="doc-title">Comité de pilotage</div>
                  <div className="doc-meta">Aujourd’hui • Salle A • Teams</div>
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
                  Réunion
                </span>
              </div>
              <div className="doc-item" style={{ cursor: "default" }}>
                <div
                  className="doc-icon"
                  style={{
                    background: "#f0fdf4",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  16:30
                </div>
                <div className="doc-info">
                  <div className="doc-title">Point d’avancement</div>
                  <div className="doc-meta">Demain • NAAMS • Teams</div>
                </div>
                <span
                  style={{
                    background: "#f0fdf4",
                    color: "#15803d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Suivi
                </span>
              </div>
              <div className="doc-item" style={{ cursor: "default" }}>
                <div
                  className="doc-icon"
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    fontWeight: 800,
                  }}
                >
                  12 Mai
                </div>
                <div className="doc-info">
                  <div className="doc-title">Atelier cybersécurité</div>
                  <div className="doc-meta">12 Mai • 14:30 • Auditorium</div>
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
                  Atelier
                </span>
              </div>
              <div className="doc-item" style={{ cursor: "default" }}>
                <div
                  className="doc-icon"
                  style={{
                    background: "#fdf2f8",
                    color: "#be185d",
                    fontWeight: 800,
                  }}
                >
                  20 Mai
                </div>
                <div className="doc-info">
                  <div className="doc-title">Team Building Digital 2026</div>
                  <div className="doc-meta">20 Mai • Salle Innovation</div>
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
                  Initiative
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== END AGENDA INTERNE VIEW ===== */}
    </>
  );
}

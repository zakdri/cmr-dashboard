import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function AcademySection() {
  return (
    <>
      <div id="view-academy" className="view-section km-container">
        <div className="km-header">
          <h2>CMR Academy</h2>
          <p>
            Développez vos compétences avec nos programmes de formation
            sur-mesure.
          </p>
        </div>
        <div
          className="km-navbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 30,
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: 0,
          }}
        >
          <div
            className="km-nav-item active"
            onClick={(event) =>
              runLegacyHandler(event, "switchAcademyPageTab('catalogue')")
            }
          >
            Catalogue
          </div>
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchAcademyPageTab('formations')")
            }
          >
            Mes Formations
          </div>
          <div
            className="km-nav-item"
            onClick={(event) =>
              runLegacyHandler(event, "switchAcademyPageTab('certificats')")
            }
          >
            Mes Certificats
          </div>
        </div>
        {/* TAB: CATALOGUE */}
        <div
          id="page-academy-catalogue"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="km-grid">
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#eef2ff", color: "#4f46e5" }}
              >
                <i data-lucide="users" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Management &amp; Leadership</div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                Développez votre posture de manager et motivez vos équipes.
              </p>
              <div className="doc-card-meta">
                <span>6 parcours</span>
                <i data-lucide="chevron-right" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i data-lucide="cpu" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Compétences Digitales</div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                Maîtrisez les outils numériques de demain.
              </p>
              <div className="doc-card-meta">
                <span>12 modules</span>
                <i data-lucide="chevron-right" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#fdf2f8", color: "#db2777" }}
              >
                <i data-lucide="heart" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">Soft Skills</div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                Communication, intelligence émotionnelle et bien-être.
              </p>
              <div className="doc-card-meta">
                <span>8 modules</span>
                <i data-lucide="chevron-right" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#fff7ed", color: "#ea580c" }}
              >
                <i
                  data-lucide="shield-check"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">Conformité &amp; Risques</div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                Réglementations, éthique et sécurité de l'information.
              </p>
              <div className="doc-card-meta">
                <span>4 parcours</span>
                <i data-lucide="chevron-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
        </div>
        {/* TAB: MES FORMATIONS */}
        <div
          id="page-academy-formations"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid">
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#3b82f6" }}
              >
                <i
                  data-lucide="play-circle"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">Cybersécurité 101</div>
              <div style={{ marginTop: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  <span>Progression</span>
                  <span>35%</span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#f1f5f9",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "35%",
                      height: "100%",
                      background: "#3b82f6",
                    }}
                  />
                </div>
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 700 }}>
                  En cours
                </span>
                <button
                  style={{
                    background: "#eff6ff",
                    color: "#3b82f6",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Reprendre
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: MES CERTIFICATS */}
        <div
          id="page-academy-certificats"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid">
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#fdf4ff", color: "#a855f7" }}
              >
                <i data-lucide="award" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                Certification Management 2025
              </div>
              <div className="doc-card-meta">
                <span>Délivré le 12/12/2025</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RH VIEW */}
    </>
  );
}

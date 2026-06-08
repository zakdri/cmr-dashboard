import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function AchatsSection() {
  return (
    <>
      <div id="view-achats" className="view-section km-container">
        <div className="km-header">
          <h2>Espace Achats</h2>
          <p>Support opérationnel, accès PPA et référentiel fournisseurs.</p>
        </div>
        <div className="km-grid">
          <div className="doc-card" style={{ cursor: "pointer" }}>
            <div
              className="doc-icon-large"
              style={{ background: "#fdf2f8", color: "#db2777" }}
            >
              <i data-lucide="shopping-bag" style={{ width: 24, height: 24 }} />
            </div>
            <div className="doc-card-title">
              Plan Prévisionnel des Achats (PPA)
            </div>
            <div className="doc-card-meta">
              <span>Version 2026 consolidée</span>
              <i data-lucide="download" style={{ width: 16 }} />
            </div>
          </div>
          <div className="doc-card" style={{ cursor: "pointer" }}>
            <div
              className="doc-icon-large"
              style={{ background: "#eff6ff", color: "#3b82f6" }}
            >
              <i data-lucide="book-check" style={{ width: 24, height: 24 }} />
            </div>
            <div className="doc-card-title">Référentiel Fournisseurs</div>
            <div className="doc-card-meta">
              <span>Dernière MAJ: 3 jours</span>
              <i data-lucide="external-link" style={{ width: 16 }} />
            </div>
          </div>
        </div>
      </div>
      {/* MÉDIATHÈQUE VIEW */}
    </>
  );
}

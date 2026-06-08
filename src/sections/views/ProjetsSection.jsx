import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function ProjetsSection() {
  return (
    <>
      <div id="view-projets" className="view-section km-container">
        <div className="km-header">
          <h2>Espace Projets</h2>
          <p>
            Vision transverse du portefeuille projets (Fiches, Indicateurs,
            Livrables).
          </p>
        </div>
        <div className="km-grid">
          <div className="doc-card">
            <div
              className="doc-icon-large"
              style={{ background: "#eff6ff", color: "#3b82f6" }}
            >
              <i data-lucide="briefcase" style={{ width: 24, height: 24 }} />
            </div>
            <div className="doc-card-title">Projet Refonte Intranet</div>
            <p style={{ fontSize: 13, marginTop: 8 }}>
              Phase 2 : Conception SFD / Maquettes
            </p>
            <div
              style={{
                height: 6,
                background: "#f1f5f9",
                borderRadius: 3,
                overflow: "hidden",
                marginTop: 10,
              }}
            >
              <div
                style={{ width: "70%", height: "100%", background: "#3b82f6" }}
              />
            </div>
            <div className="doc-card-meta">
              <span style={{ fontWeight: 600 }}>Ouvert</span>
              <span>Progression: 70%</span>
            </div>
          </div>
        </div>
      </div>
      {/* DOCUMENTAIRES VIEW */}
    </>
  );
}

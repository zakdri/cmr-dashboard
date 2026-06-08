import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function DgMessageSection() {
  return (
    <>
      <div id="view-dg-message" className="view-section km-container">
        <button
          className="actu-back-btn"
          onClick={(event) =>
            runLegacyHandler(event, "switchView('dashboard')")
          }
        >
          <i data-lucide="arrow-left" style={{ width: 16, height: 16 }} />
          Retour à l'accueil
        </button>
        <div className="actu-detail-card" id="dgMessageDetailContent">
          <div className="actu-detail-body">
            <div className="actu-detail-meta-row">
              <span className="actu-detail-category">
                Organisation &amp; Gouvernance
              </span>
              <span className="actu-detail-date">
                <i data-lucide="calendar" style={{ width: 13, height: 13 }} />
                25 Avril 2026
              </span>
              <span className="actu-detail-author">
                <i data-lucide="user" style={{ width: 13, height: 13 }} />
                Direction Générale
              </span>
            </div>
            <h1 className="actu-detail-title">
              Point d’étape sur la feuille de route 2026
            </h1>
            <div className="actu-detail-content">
              <p>Chers collaborateurs,</p>
              <p>
                Je souhaite partager les priorités du trimestre et remercier les
                équipes mobilisées sur les chantiers de transformation. Notre
                ambition est de renforcer la qualité de service, de moderniser
                nos outils et d’accélérer la simplification de nos processus.
              </p>
              <p>
                Les prochaines semaines seront consacrées au déploiement
                progressif des évolutions de l’intranet, à la consolidation des
                référentiels institutionnels et au suivi des décisions des
                comités.
              </p>
              <p style={{ marginTop: 18 }}>
                <strong>Direction Générale</strong>
                <br />
                CMR Maroc
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ===== END DG MESSAGE DETAIL VIEW ===== */}
      {/* KM VIEW */}
    </>
  );
}

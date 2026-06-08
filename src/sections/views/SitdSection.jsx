import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function SitdSection() {
  return (
    <>
      <div id="view-sitd" className="view-section km-container">
        <div className="km-header">
          <h2>Espace SI / SITD</h2>
          <p>
            Sécurité du SI, référentiel IT, intégration, pilotage, contrats de
            services et SEAU — conformément au cadrage CMS.
          </p>
        </div>
        <div
          className="km-navbar"
          id="sitdMainNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 12,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>
        <div
          className="km-navbar"
          id="sitdSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 24,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>
        <div id="sitdPageHost" />
      </div>
      {/* ARC VIEW (table conforme — onglet 16. Audit, Risque & Conformité) */}
    </>
  );
}

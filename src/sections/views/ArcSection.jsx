import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function ArcSection() {
  return (
    <>
      <div id="view-arc" className="view-section km-container">
        <div className="km-header">
          <h2>Espace Audit, Risque &amp; Conformité</h2>
          <p>
            Audit interne, risque &amp; conformité, contrôle permanent et
            sensibilisation — conformément au cadrage CMS.
          </p>
        </div>
        <div
          className="km-navbar"
          id="arcMainNavbar"
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
          id="arcSubNavbar"
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
        <div id="arcPageHost" />
      </div>
      {/* ADMINISTRATION VIEW */}
    </>
  );
}

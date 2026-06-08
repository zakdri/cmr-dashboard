import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function FlashDetailSection() {
  return (
    <>
      <div id="view-flash-detail" className="view-section km-container">
        <button
          className="actu-back-btn"
          onClick={(event) =>
            runLegacyHandler(
              event,
              "switchView(flashDetailBackView || 'dashboard')",
            )
          }
        >
          <i data-lucide="arrow-left" style={{ width: 16, height: 16 }} />
          Retour à l'accueil
        </button>
        <div className="actu-detail-card" id="flashDetailContent">
          {/* Injected by JS */}
        </div>
      </div>
      {/* ===== END FLASH INFO DETAIL VIEW ===== */}
      {/* ===== DG MESSAGE DETAIL VIEW ===== */}
    </>
  );
}

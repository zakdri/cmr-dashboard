import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

const getDgMessageData = () => window.CMR_DATA?.data?.dashboardDgMessage || {};

export default function DgMessageSection() {
  const dgMessage = getDgMessageData();
  const detail = dgMessage.detail || {};

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
                {dgMessage.category}
              </span>
              <span className="actu-detail-date">
                <i data-lucide={detail.dateIcon} style={{ width: 13, height: 13 }} />
                {dgMessage.date}
              </span>
              <span className="actu-detail-author">
                <i data-lucide={detail.authorIcon} style={{ width: 13, height: 13 }} />
                {dgMessage.author}
              </span>
            </div>
            <h1 className="actu-detail-title">
              {dgMessage.headline}
            </h1>
            <div className="actu-detail-content">
              {(detail.paragraphs || []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p style={{ marginTop: 18 }}>
                <strong>{detail.signature?.author}</strong>
                <br />
                {detail.signature?.organization}
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

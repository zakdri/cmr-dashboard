import React, { useEffect, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { renderLucideIcons } from "../../lucideLocal.js";
import { loadInfoExpress } from "../../services/infoExpress.js";
import { isDemoMode } from "../../services/moovappsPlatform.js";

function demoInfoExpress() {
  const subject = window.CMR_DATA?.data?.dashboardRightSidebar?.flashInfo?.subject;
  return subject ? [{ id: "demo-info-express-page", title: subject }] : [];
}

export default function InfoExpressSection() {
  const [items, setItems] = useState(isDemoMode() ? demoInfoExpress() : []);

  useEffect(() => {
    let cancelled = false;
    if (isDemoMode()) return undefined;

    loadInfoExpress()
      .then((records) => {
        if (!cancelled) setItems(records);
      })
      .catch((error) => console.error("Liste Info Express Moovapps indisponible :", error));

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => renderLucideIcons());
  }, [items]);

  return (
    <div id="view-info-express" className="view-section notif-page-container">
      <div className="notif-page-header">
        <div className="notif-page-title-row">
          <div className="card-icon red" style={{ width: 42, height: 42 }}>
            <i data-lucide="bell-ring" style={{ width: 22, height: 22 }} />
          </div>
          <div>
            <h2 className="actu-page-title">Info Express</h2>
            <p className="actu-page-sub">Toutes les informations à retenir</p>
          </div>
        </div>
        <button
          type="button"
          className="secondary-btn"
          onClick={(event) => runLegacyHandler(event, "switchView('dashboard')")}
        >
          <i data-lucide="arrow-left" style={{ width: 15, height: 15 }} />
          Retour
        </button>
      </div>

      <div className="notif-page-list">
        {items.map((item) => (
          <article className="notif-page-item" key={item.id}>
            <div className="notif-page-icon" style={{ background: "#fff1f2", color: "#ef4444" }}>
              <i data-lucide="bell-ring" style={{ width: 20, height: 20 }} />
            </div>
            <div className="notif-page-body">
              <div className="notif-page-item-title">{item.title}</div>
            </div>
            <span className="live-badge">LIVE</span>
          </article>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="actu-empty" style={{ display: "flex" }}>
          <i data-lucide="bell-off" style={{ width: 44, height: 44, color: "#cbd5e1" }} />
          <p>Aucune information express.</p>
        </div>
      ) : null}
    </div>
  );
}

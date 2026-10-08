import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

const getAgendaInterneData = () => window.CMR_DATA?.data?.agendaInterne || {};

const tagStyle = {
  padding: "3px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 600,
};

function CardTitle({ iconClass, icon, title }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${iconClass}`}>
        <i data-lucide={icon} style={{ width: 20, height: 20 }} />
      </div>
      {title}
    </div>
  );
}

export default function AgendaInterneSection() {
  const agendaInterne = getAgendaInterneData();
  const header = agendaInterne.header || {};
  const events = agendaInterne.events || {};

  return (
    <>
      <div id="view-agenda-interne" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div style={{ marginBottom: 18 }}>
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
        </div>
        <div className="dashboard-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle iconClass={events.iconClass} icon={events.icon} title={events.title} />
            </div>
            <div className="doc-list">
              {(events.items || []).map((item) => (
                <div className="doc-item" style={{ cursor: "default" }} key={`${item.time}-${item.title}`}>
                  <div className="doc-icon" style={item.iconStyle}>{item.time}</div>
                  <div className="doc-info">
                    <div className="doc-title">{item.title}</div>
                    <div className="doc-meta">{item.meta}</div>
                  </div>
                  <span style={{ ...tagStyle, ...item.tagStyle }}>{item.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

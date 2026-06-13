import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

const getAgendaInterneData = () => window.CMR_DATA?.data?.agendaInterne || {};

const navButtonStyle = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  padding: "8px 12px",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  color: "#475569",
};

const weekDaysGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7,1fr)",
  gap: 8,
  fontSize: 11,
  color: "#94a3b8",
  marginBottom: 10,
};

const calendarGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7,1fr)",
  gap: 8,
};

const calendarCellBaseStyle = {
  height: 36,
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#94a3b8",
  fontSize: 12,
};

const calendarCellActiveStyle = {
  ...calendarCellBaseStyle,
  background: "#eff6ff",
  color: "#1d4ed8",
  fontWeight: 700,
};

const hintStyle = {
  marginTop: 14,
  padding: "12px 14px",
  borderRadius: 12,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  fontSize: 12,
  color: "#475569",
  lineHeight: "1.6",
};

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
  const calendar = agendaInterne.calendar || {};
  const events = agendaInterne.events || {};

  return (
    <>
      <div id="view-agenda-interne" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={navButtonStyle}>
              <i
                data-lucide="chevron-left"
                style={{ width: 14, height: 14 }}
              />
            </button>
            <div style={{ fontWeight: 700, color: "#1e293b" }}>
              Semaine en cours
            </div>
            <button style={navButtonStyle}>
              <i
                data-lucide="chevron-right"
                style={{ width: 14, height: 14 }}
              />
            </button>
          </div>
        </div>
        <div
          className="dashboard-grid"
          style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle
                iconClass={calendar.iconClass}
                icon={calendar.icon}
                title={calendar.title}
              />
            </div>
            <div style={{ padding: "18px 18px 22px 18px" }}>
              <div style={weekDaysGridStyle}>
                {(calendar.weekDays || []).map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div style={calendarGridStyle}>
                {(calendar.cells || []).map((cell, index) => (
                  <div
                    style={cell.active ? calendarCellActiveStyle : calendarCellBaseStyle}
                    key={`${cell.label}-${index}`}
                  >
                    {cell.label}
                  </div>
                ))}
              </div>
              <div style={hintStyle}>{calendar.hint}</div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle
                iconClass={events.iconClass}
                icon={events.icon}
                title={events.title}
              />
            </div>
            <div className="doc-list">
              {(events.items || []).map((item) => (
                <div className="doc-item" style={{ cursor: "default" }} key={`${item.time}-${item.title}`}>
                  <div className="doc-icon" style={item.iconStyle}>
                    {item.time}
                  </div>
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

import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getAlertsData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.alertsHeader || {},
    labels: data.alertsLabels || {},
    alerts: data.alertsData || [],
    icons: data.alertIcons || {},
  };
}

export default function AlertesSection() {
  const { header, labels, alerts, icons } = getAlertsData();

  return (
    <div id="view-alertes" className="view-section notif-page-container">
      <div className="notif-page-header">
        <div className="notif-page-title-row">
          <div
            className={`card-icon ${header.iconClass}`}
            style={{ width: 42, height: 42 }}
          >
            <i data-lucide={header.icon} style={{ width: 22, height: 22 }} />
          </div>
          <div>
            <h2 className="actu-page-title">{header.title}</h2>
            <p className="actu-page-sub">{header.description}</p>
          </div>
        </div>
      </div>

      <div className="notif-page-list">
        {alerts.map((alert) => {
          const icon = icons[alert.type] || {};
          const hasAction = Boolean(alert.actionHandler);
          const ItemWrapper = hasAction ? "a" : "div";

          return (
            <ItemWrapper
              className={`notif-page-item${alert.unread ? " unread" : ""}`}
              href={hasAction ? "#" : undefined}
              key={alert.id}
              onClick={
                hasAction
                  ? (event) => runLegacyHandler(event, alert.actionHandler)
                  : undefined
              }
              style={
                hasAction
                  ? { color: "inherit", cursor: "pointer", textDecoration: "none" }
                  : undefined
              }
            >
              <div
                className="notif-page-icon"
                style={{ background: icon.bg, color: icon.color }}
              >
                <i data-lucide={icon.icon} style={{ width: 20, height: 20 }} />
              </div>
              <div className="notif-page-body">
                <div className="notif-page-item-title">{alert.title}</div>
                <div className="notif-page-item-desc">{alert.desc}</div>
                <div className="notif-page-item-time">
                  <i data-lucide="clock" style={{ width: 11, height: 11 }} />
                  {alert.time}
                </div>
              </div>
              <div className="notif-page-item-right">
                <span
                  style={{
                    color: icon.color || "#64748b",
                    fontSize: 12,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  {alert.level}
                </span>
                {alert.unread && <div className="notif-unread-dot" />}
              </div>
            </ItemWrapper>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <div className="actu-empty" style={{ display: "flex" }}>
          <i
            data-lucide="bell-off"
            style={{ width: 48, height: 48, color: "#cbd5e1" }}
          />
          <p>{labels.emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

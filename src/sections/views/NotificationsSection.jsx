import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getNotificationsData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.notificationsHeader || {},
    tabs: data.notificationsTabs || [],
    notifications: data.notifData || [],
  };
}

export default function NotificationsSection() {
  const { header, tabs, notifications } = getNotificationsData();
  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const badgeValue = (tab) => {
    if (tab.value === "all") return notifications.length;
    if (tab.value === "unread") return unreadCount;
    return null;
  };
  const tabLabel = (tab) => {
    if (tab.value === "all") return "Toutes";
    if (tab.value === "unread") return "Non lues";
    return tab.label;
  };

  return (
    <>
      <div
        id="view-notifications"
        className="view-section notif-page-container"
      >
        <div className="notif-page-header">
          <div className="notif-page-title-row">
            <div className={`card-icon ${header.iconClass}`} style={{ width: 42, height: 42 }}>
              <i data-lucide={header.icon} style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="actu-page-title">{header.title}</h2>
              <p className="actu-page-sub">{header.description}</p>
            </div>
          </div>
          <div className="notif-page-actions">
            <button
              className="notif-mark-all-btn"
              onClick={(event) =>
                runLegacyHandler(event, "markAllNotifsRead()")
              }
            >
              <i data-lucide="check-check" style={{ width: 15, height: 15 }} />
              Tout marquer lu
            </button>
          </div>
        </div>
        {/* Filter tabs */}
        <div className="notif-page-tabs" id="notifPageTabs">
          {tabs.map((tab) => {
            const count = badgeValue(tab);
            return (
              <button
                key={tab.value}
                className={`notif-tab${tab.active ? " active" : ""}`}
                onClick={(event) =>
                  runLegacyHandler(event, `filterNotifPage('${tab.value}', this)`)
                }
              >
                {tabLabel(tab)}{" "}
                {tab.badgeId && (
                  <span className={`notif-tab-badge${tab.badgeClassName ? ` ${tab.badgeClassName}` : ""}`} id={tab.badgeId}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {/* Notifications list */}
        <div className="notif-page-list" id="notifPageList">
          {/* Rendered by JS */}
        </div>
        <div
          className="actu-empty"
          id="notifPageEmpty"
          style={{ display: "none" }}
        >
          <i
            data-lucide="bell-off"
            style={{ width: 48, height: 48, color: "#cbd5e1" }}
          />
          <p>Aucune notification à afficher.</p>
        </div>
      </div>
      {/* ===== END NOTIFICATIONS VIEW ===== */}
      {/* ===== ACTUALITÉS VIEW ===== */}
    </>
  );
}

import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function NotificationsSection() {
  return (
    <>
      <div
        id="view-notifications"
        className="view-section notif-page-container"
      >
        <div className="notif-page-header">
          <div className="notif-page-title-row">
            <div className="card-icon blue" style={{ width: 42, height: 42 }}>
              <i data-lucide="bell" style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="actu-page-title">Notifications</h2>
              <p className="actu-page-sub">
                Toutes vos notifications et alertes
              </p>
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
          <button
            className="notif-tab active"
            onClick={(event) =>
              runLegacyHandler(event, "filterNotifPage('all', this)")
            }
          >
            Toutes{" "}
            <span className="notif-tab-badge" id="notifTabAll">
              15
            </span>
          </button>
          <button
            className="notif-tab"
            onClick={(event) =>
              runLegacyHandler(event, "filterNotifPage('unread', this)")
            }
          >
            Non lues{" "}
            <span className="notif-tab-badge unread" id="notifTabUnread">
              5
            </span>
          </button>
          <button
            className="notif-tab"
            onClick={(event) =>
              runLegacyHandler(event, "filterNotifPage('document', this)")
            }
          >
            Documents
          </button>
          <button
            className="notif-tab"
            onClick={(event) =>
              runLegacyHandler(event, "filterNotifPage('meeting', this)")
            }
          >
            Réunions
          </button>
          <button
            className="notif-tab"
            onClick={(event) =>
              runLegacyHandler(event, "filterNotifPage('rh', this)")
            }
          >
            RH
          </button>
          <button
            className="notif-tab"
            onClick={(event) =>
              runLegacyHandler(event, "filterNotifPage('system', this)")
            }
          >
            Système
          </button>
          <button
            className="notif-tab"
            onClick={(event) =>
              runLegacyHandler(event, "filterNotifPage('innovation', this)")
            }
          >
            Innovation
          </button>
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
          <p>Aucune notification dans cette catégorie.</p>
        </div>
      </div>
      {/* ===== END NOTIFICATIONS VIEW ===== */}
      {/* ===== ACTUALITÉS VIEW ===== */}
    </>
  );
}

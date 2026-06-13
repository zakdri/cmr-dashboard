import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

const getHeaderData = () => window.CMR_DATA?.data?.header || {};

export default function HeaderTemplate() {
  const header = getHeaderData();
  const notifications = header.notifications || {};
  const quickLinks = header.quickLinks || {};
  const user = header.user || {};

  return (
    <>
      {/* TOP HEADER */}
      <header className="top-header">
        <div
          className="header-logo"
          onClick={(event) =>
            runLegacyHandler(event, "switchView('dashboard')")
          }
        >
          <svg viewBox="0 0 207.08 58.4" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path
                className="cls-3"
                d="M125.08,47.33c-1.73-3.72-2.88-7.6-4.1-11.16-5.28,6.78-9.12,14.45-11.62,21.95,8.5,0,14.85-2.25,19.81-5.61-1.77-1.46-3.17-3.19-4.09-5.18"
              />
              <path
                className="cls-3"
                d="M177.67,16.05c-18.03-3.86-30.18-.65-41.34,6.2-1.15.71-2.27,1.46-3.36,2.25,3.97,2.98,7.48,6.98,10.24,11.86,1.56-2.5,3-4.87,4.46-6.9,5.97-8.29,13.55-14.64,30-13.41"
              />
              <path
                className="cls-2"
                d="M156.02,23.57c21.65-5.5,20.31,10.2,26.62,23.76,3.35,7.2,12.92,11.07,24.44,11.07-2.3-32.82-29.41-49.19-51.06-34.83"
              />
              <path
                className="cls-3"
                d="M88.48,31.88c.55-.84,1.09-1.65,1.64-2.41,5.98-8.29,13.55-14.63,30-13.41-18.03-3.86-30.18-.65-41.34,6.2-.17.1-.33.21-.5.32,3.8,2.27,7.27,5.4,10.2,9.3"
              />
              <path
                className="cls-3"
                d="M67.42,31.53c-7.38,7.79-12.51,17.32-15.6,26.59,10.49,0,17.7-3.43,23.08-8.14-.64-.83-1.19-1.71-1.62-2.65-2.52-5.42-3.82-11.18-5.86-15.8"
              />
              <path
                className="cls-2"
                d="M132.98,24.5c-10.03-7.52-23.04-8.54-34.51-.93,15.71-3.99,19.32,3.18,22.52,12.6,3.39-4.35,7.38-8.33,11.99-11.67"
              />
              <path
                className="cls-2"
                d="M129.18,52.5c4.68,3.86,12,5.9,20.35,5.9-.6-8.55-2.88-15.98-6.31-22.04-3.49,5.59-7.61,11.79-14.04,16.14"
              />
              <path
                className="cls-1"
                d="M132.98,24.5c-4.61,3.33-8.6,7.32-11.99,11.67,1.21,3.56,2.36,7.44,4.1,11.16.92,1.98,2.32,3.71,4.09,5.18,6.43-4.35,10.55-10.56,14.04-16.14-2.76-4.88-6.27-8.88-10.24-11.86"
              />
              <path
                className="cls-3"
                d="M68.31,16.05c-18.03-3.86-30.18-.65-41.34,6.2C13.26,30.67,4.48,44.68,0,58.12c24.43,0,31.05-18.59,38.31-28.65,5.98-8.29,13.55-14.64,30-13.41"
              />
              <path
                className="cls-2"
                d="M74.9,49.98c4.26,5.5,12.8,8.43,22.82,8.43-.75-10.79-4.19-19.8-9.23-26.53-3.6,5.54-7.38,12.67-13.58,18.1"
              />
              <path
                className="cls-2"
                d="M78.28,22.57c-9.56-5.7-21.23-5.9-31.62,1,12.99-3.3,17.7,1.03,20.76,7.96,3.19-3.37,6.81-6.41,10.87-8.96"
              />
              <path
                className="cls-1"
                d="M88.48,31.88c-2.93-3.91-6.4-7.04-10.2-9.3-4.05,2.55-7.67,5.59-10.87,8.96,2.04,4.61,3.33,10.38,5.86,15.8.44.94.98,1.82,1.62,2.65,6.21-5.43,9.99-12.56,13.59-18.1"
              />
              <path
                className="cls-3"
                d="M28.07,9.87c0,3.45-2.8,6.25-6.25,6.25s-6.25-2.8-6.25-6.25,2.8-6.25,6.25-6.25,6.25,2.8,6.25,6.25"
              />
              <path
                className="cls-3"
                d="M83.46,8.87c0,3.83-3.11,6.94-6.94,6.94s-6.94-3.11-6.94-6.94,3.11-6.94,6.94-6.94,6.94,3.11,6.94,6.94"
              />
              <path
                className="cls-3"
                d="M143.37,7.98c0,4.41-3.58,7.98-7.98,7.98s-7.98-3.57-7.98-7.98,3.57-7.98,7.98-7.98,7.98,3.57,7.98,7.98"
              />
            </g>
          </svg>
        </div>
        <div className="search-container">
          <div className="search-pill">
            <i
              data-lucide="search"
              style={{ width: 20, height: 20, color: "#94a3b8" }}
            />
            <input type="text" placeholder="Rechercher dans l'intranet..." />
            <i
              data-lucide="command"
              style={{ width: 16, height: 16, color: "#cbd5e1" }}
            />
          </div>
        </div>
        <div className="header-actions">
          <div style={{ position: "relative" }}>
            <button
              className="header-icon-btn"
              onClick={(event) =>
                runLegacyHandler(event, "toggleDropdown('notifDropdown')")
              }
            >
              <i data-lucide="bell" style={{ width: 20, height: 20 }} />
              <span className="badge">{notifications.badge}</span>
            </button>
            <div className="header-dropdown" id="notifDropdown">
              <div className="dropdown-header">
                Notifications
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--cmr-primary)",
                    cursor: "pointer",
                  }}
                >
                  Tout marquer lu
                </span>
              </div>
              {(notifications.items || []).map((item) => (
                <div className="notif-item" key={`${item.title}-${item.time}`}>
                  <div className="notif-title">{item.title}</div>
                  <div className="notif-desc">{item.description}</div>
                  <div className="notif-time">{item.time}</div>
                </div>
              ))}
              <div className="notif-voir-tout">
                <button
                  className="notif-voir-tout-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "goToNotifications(); return false;",
                    )
                  }
                >
                  <i data-lucide="bell" style={{ width: 14, height: 14 }} />
                  Voir toutes les notifications
                  <i
                    data-lucide="arrow-right"
                    style={{ width: 14, height: 14 }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <button
              className="header-icon-btn"
              onClick={(event) =>
                runLegacyHandler(event, "toggleDropdown('quickLinksDropdown')")
              }
            >
              <i data-lucide="layout-grid" style={{ width: 20, height: 20 }} />
            </button>
            <div
              className="header-dropdown"
              id="quickLinksDropdown"
              style={{ width: 320 }}
            >
              <div className="dropdown-header">
                Accès Rapides
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--cmr-primary)",
                    cursor: "pointer",
                  }}
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleModal('editModal')")
                  }
                >
                  Gérer
                </span>
              </div>
              <div className="quick-links-grid">
                {(quickLinks.items || []).map((item) => (
                  <a href={item.href} className="quick-link-item" key={item.label}>
                    <div className="quick-link-icon">
                      <i data-lucide={item.icon} style={{ width: 18 }} />
                    </div>
                    <span className="quick-link-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div
              className="header-user-pill"
              onClick={(event) =>
                runLegacyHandler(event, "toggleDropdown('userDropdown')")
              }
            >
              <div className="header-avatar">{user.avatar}</div>
              <span className="header-user-name">{user.name}</span>
              <i
                data-lucide="chevron-down"
                style={{ width: 16, height: 16, color: "#94a3b8" }}
              />
            </div>
            <div className="header-dropdown" id="userDropdown">
              <div className="dropdown-header">Mon Compte</div>
              <a href="#" className="dropdown-item">
                <i data-lucide="user" />
                Mon Profil
              </a>
              <a href="#" className="dropdown-item">
                <i data-lucide="settings" />
                Paramètres
              </a>
              <a href="#" className="dropdown-item logout">
                <i data-lucide="log-out" />
                Déconnexion
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

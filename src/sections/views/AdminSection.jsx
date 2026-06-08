import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function AdminSection() {
  return (
    <>
      <div id="view-admin" className="view-section km-container">
        <div className="km-header">
          <h2>Administration &amp; Pilotage</h2>
          <p>
            Espace réservé aux administrateurs pour piloter la plateforme,
            paramétrer les menus et les habilitations.
          </p>
        </div>
        {/* Sous‑rubriques (niveau 1) */}
        <div
          className="km-navbar"
          id="adminMainNavbar"
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
          id="adminSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 30,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>
        {/* Utilisateurs */}
        <div
          id="page-admin-comptes"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.7fr 1.3fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i data-lucide="users" style={{ width: 20, height: 20 }} />
                  </div>
                  Gestion comptes
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleAdminUserForm(true)")
                  }
                >
                  Créer
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="adminUserSearch"
                    className="actu-search-input"
                    placeholder="Rechercher un utilisateur…"
                    onInput={(event) =>
                      runLegacyHandler(event, "renderAdminUsers()")
                    }
                  />
                </div>
              </div>
              <div
                id="adminUsersTableWrap"
                style={{ padding: "0 18px 18px 18px" }}
              />
            </div>
            <div
              className="dashboard-card"
              id="adminUserFormCard"
              style={{ display: "none" }}
            >
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon green">
                    <i
                      data-lucide="user-plus"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Nouveau compte
                </div>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleAdminUserForm(false)")
                  }
                >
                  Fermer
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input
                  id="adminNewName"
                  className="actu-search-input"
                  placeholder="Nom complet"
                />
                <input
                  id="adminNewEmail"
                  className="actu-search-input"
                  placeholder="Email"
                  style={{ marginTop: 12, paddingLeft: 14 }}
                />
                <select
                  id="adminNewProfil"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 44 }}
                >
                  <option value="Administrateur">Administrateur</option>
                  <option value="Contributeur">Contributeur</option>
                  <option value="Utilisateur">Utilisateur</option>
                </select>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 12,
                  }}
                >
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "adminCreateUser()")
                    }
                  >
                    Créer
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="id-card"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Détail
                </div>
              </div>
              <div
                id="adminUserDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un utilisateur.
              </div>
            </div>
          </div>
        </div>
        {/* Habilitations */}
        <div
          id="page-admin-roles"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon orange">
                    <i data-lucide="key" style={{ width: 20, height: 20 }} />
                  </div>
                  Rôles
                </div>
              </div>
              <div
                id="adminRolesList"
                className="doc-list"
                style={{ padding: 18 }}
              />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="user-cog"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Attribution
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <select
                    id="adminRoleUser"
                    className="actu-search-input"
                    style={{ height: 44 }}
                  />
                  <select
                    id="adminRolePick"
                    className="actu-search-input"
                    style={{ height: 44 }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  <button
                    className="secondary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "adminRemoveRole()")
                    }
                  >
                    Retirer
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "adminAssignRole()")
                    }
                  >
                    Attribuer
                  </button>
                </div>
                <div
                  id="adminRoleInfo"
                  style={{
                    marginTop: 12,
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.7",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Accès */}
        <div
          id="page-admin-acces"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i
                    data-lucide="shield-check"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Droits d’accès
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr .8fr",
                  gap: 12,
                }}
              >
                <select
                  id="adminAccessUser"
                  className="actu-search-input"
                  style={{ height: 44 }}
                />
                <select
                  id="adminAccessScope"
                  className="actu-search-input"
                  style={{ height: 44 }}
                >
                  <option value="RH">RH</option>
                  <option value="KM">KM</option>
                  <option value="RSE">RSE</option>
                  <option value="QSE">QSE</option>
                  <option value="Médiathèque">Médiathèque</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "adminRestrictAccess()")
                  }
                >
                  Restreindre
                </button>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "adminGrantAccess()")
                  }
                >
                  Attribuer
                </button>
              </div>
              <div id="adminAccessTableWrap" style={{ marginTop: 12 }} />
              <div
                style={{
                  marginTop: 12,
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: 14,
                  padding: 12,
                  color: "#9a3412",
                  fontSize: 13,
                  lineHeight: "1.7",
                }}
              >
                Zone critique sécurité (maquette).
              </div>
            </div>
          </div>
        </div>
        {/* Pilotage: usage */}
        <div
          id="page-admin-usage"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="bar-chart-3"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Usage plateforme (dashboard)
              </div>
            </div>
            <div id="adminUsageDash" style={{ padding: 18 }} />
          </div>
        </div>
        {/* Pilotage: reporting */}
        <div
          id="page-admin-reporting"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon purple">
                  <i data-lucide="gauge" style={{ width: 20, height: 20 }} />
                </div>
                Reporting &amp; indicateurs (KPI)
              </div>
            </div>
            <div id="adminReportingDash" style={{ padding: 18 }} />
          </div>
        </div>
        {/* CMS */}
        <div
          id="page-admin-cms"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i
                    data-lucide="layout-template"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                CMS (interface admin)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "adminCreateCms()")
                  }
                >
                  Publier
                </button>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "renderAdminCms()")
                  }
                >
                  Rafraîchir
                </button>
              </div>
              <div id="adminCmsTableWrap" style={{ marginTop: 12 }} />
            </div>
          </div>
        </div>
        {/* Sécurité */}
        <div
          id="page-admin-securite"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i data-lucide="lock" style={{ width: 20, height: 20 }} />
                  </div>
                  Accès restreint
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.7",
                  }}
                >
                  Limiter l’accès aux fonctionnalités d’administration
                  (maquette).
                </div>
                <div style={{ marginTop: 12 }}>
                  <input
                    id="adminAuthUser"
                    className="actu-search-input"
                    placeholder="Identifiant admin"
                  />
                  <input
                    id="adminAuthPass"
                    className="actu-search-input"
                    placeholder="Mot de passe"
                    style={{ marginTop: 12, paddingLeft: 14 }}
                    type="password"
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 12,
                    }}
                  >
                    <button
                      className="primary-btn"
                      onClick={(event) =>
                        runLegacyHandler(event, "adminAuthenticate()")
                      }
                    >
                      Authentifier
                    </button>
                  </div>
                </div>
                <div
                  id="adminAuthState"
                  style={{
                    marginTop: 12,
                    color: "var(--text-light)",
                    fontSize: 13,
                  }}
                />
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon green">
                    <i data-lucide="shield" style={{ width: 20, height: 20 }} />
                  </div>
                  Contrôle d’accès
                </div>
              </div>
              <div id="adminAccessControl" style={{ padding: 18 }} />
            </div>
          </div>
        </div>
        {/* Traçabilité */}
        <div
          id="page-admin-tracabilite"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="history" style={{ width: 20, height: 20 }} />
                </div>
                Journal des actions (log)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "setAdminLogFilter('all', this)")
                  }
                >
                  Tout
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setAdminLogFilter('create', this)")
                  }
                >
                  Créer
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setAdminLogFilter('update', this)")
                  }
                >
                  Modifier
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setAdminLogFilter('auth', this)")
                  }
                >
                  Authentifier
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setAdminLogFilter('access', this)")
                  }
                >
                  Accès
                </button>
              </div>
              <div id="adminLogList" className="doc-list" />
            </div>
          </div>
        </div>
        {/* Performance */}
        <div
          id="page-admin-performance"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="activity" style={{ width: 20, height: 20 }} />
                </div>
                Performance (dashboard)
              </div>
            </div>
            <div id="adminPerfDash" style={{ padding: 18 }} />
          </div>
        </div>
      </div>
    </>
  );
}

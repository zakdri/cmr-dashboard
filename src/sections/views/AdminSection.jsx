import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getAdminData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.adminHeader || {},
    cards: data.adminPageCards || {},
    labels: data.adminLabels || {},
    profiles: data.adminProfileOptions || [],
    scopes: data.adminAccessScopes || [],
    logFilters: data.adminLogFilters || [],
  };
}

function CardTitle({ page, titleKey = "title", iconKey = "icon", iconClassKey = "iconClass" }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${page[iconClassKey]}`}>
        <i data-lucide={page[iconKey]} style={{ width: 20, height: 20 }} />
      </div>
      {page[titleKey]}
    </div>
  );
}

function DashboardCard({ page, children, action, titleKey, iconKey, iconClassKey, id, style }) {
  return (
    <div className="dashboard-card" id={id} style={style}>
      <div className="card-header">
        <CardTitle page={page} titleKey={titleKey} iconKey={iconKey} iconClassKey={iconClassKey} />
        {action}
      </div>
      {children}
    </div>
  );
}

export default function AdminSection() {
  const { header, cards, labels, profiles, scopes, logFilters } = getAdminData();
  const comptes = cards.comptes || {};
  const roles = cards.roles || {};
  const acces = cards.acces || {};
  const securite = cards.securite || {};

  return (
    <>
      <div id="view-admin" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
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
        />
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
        />

        <div id="page-admin-comptes" className="km-tab-content" style={{ display: "block" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.7fr 1.3fr", gap: 24 }}>
            <DashboardCard
              page={comptes}
              titleKey="listTitle"
              iconKey="listIcon"
              iconClassKey="listIconClass"
              action={
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "toggleAdminUserForm(true)")}>
                  Créer
                </button>
              }
            >
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input id="adminUserSearch" className="actu-search-input" placeholder="Rechercher un utilisateur..." onInput={(event) => runLegacyHandler(event, "renderAdminUsers()")} />
                </div>
              </div>
              <div id="adminUsersTableWrap" style={{ padding: "0 18px 18px 18px" }} />
            </DashboardCard>

            <DashboardCard
              id="adminUserFormCard"
              page={comptes}
              titleKey="formTitle"
              iconKey="formIcon"
              iconClassKey="formIconClass"
              style={{ display: "none" }}
              action={
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "toggleAdminUserForm(false)")}>
                  Fermer
                </button>
              }
            >
              <div style={{ padding: 18 }}>
                <input id="adminNewName" className="actu-search-input" placeholder="Nom complet" />
                <input id="adminNewEmail" className="actu-search-input" placeholder="Email professionnel" style={{ marginTop: 12, paddingLeft: 14 }} />
                <select id="adminNewProfil" className="actu-search-input" style={{ marginTop: 12, height: 44 }}>
                  {profiles.map((profile) => (
                    <option value={profile} key={profile}>
                      {profile}
                    </option>
                  ))}
                </select>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "adminCreateUser()")}>
                    Créer
                  </button>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard page={comptes} titleKey="detailTitle" iconKey="detailIcon" iconClassKey="detailIconClass">
              <div id="adminUserDetail" style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
                {comptes.emptyDetail}
              </div>
            </DashboardCard>
          </div>
        </div>

        <div id="page-admin-roles" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={roles} titleKey="rolesTitle" iconKey="rolesIcon" iconClassKey="rolesIconClass">
              <div id="adminRolesList" className="doc-list" style={{ padding: 18 }} />
            </DashboardCard>
            <DashboardCard page={roles} titleKey="assignTitle" iconKey="assignIcon" iconClassKey="assignIconClass">
              <div style={{ padding: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <select id="adminRoleUser" className="actu-search-input" style={{ height: 44 }} />
                  <select id="adminRolePick" className="actu-search-input" style={{ height: 44 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
                  <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "adminRemoveRole()")}>
                    Retirer
                  </button>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "adminAssignRole()")}>
                    Attribuer
                  </button>
                </div>
                <div id="adminRoleInfo" style={{ marginTop: 12, color: "var(--text-light)", fontSize: 13, lineHeight: "1.7" }} />
              </div>
            </DashboardCard>
          </div>
        </div>

        <div id="page-admin-acces" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={acces}>
            <div style={{ padding: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 12 }}>
                <select id="adminAccessUser" className="actu-search-input" style={{ height: 44 }} />
                <select id="adminAccessScope" className="actu-search-input" style={{ height: 44 }}>
                  {scopes.map((scope) => (
                    <option value={scope} key={scope}>
                      {scope}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "adminRestrictAccess()")}>
                  Restreindre
                </button>
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "adminGrantAccess()")}>
                  Attribuer
                </button>
              </div>
              <div id="adminAccessTableWrap" style={{ marginTop: 12 }} />
              <div style={{ marginTop: 12, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 14, padding: 12, color: "#9a3412", fontSize: 13, lineHeight: "1.7" }}>
                {acces.criticalMessage}
              </div>
            </div>
          </DashboardCard>
        </div>

        <div id="page-admin-usage" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={cards.usage || {}}>
            <div id="adminUsageDash" style={{ padding: 18 }} />
          </DashboardCard>
        </div>

        <div id="page-admin-reporting" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={cards.reporting || {}}>
            <div id="adminReportingDash" style={{ padding: 18 }} />
          </DashboardCard>
        </div>

        <div id="page-admin-cms" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={cards.cms || {}}>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "adminCreateCms()")}>
                  Publier
                </button>
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "renderAdminCms()")}>
                  Rafraîchir
                </button>
              </div>
              <div id="adminCmsTableWrap" style={{ marginTop: 12 }} />
            </div>
          </DashboardCard>
        </div>

        <div id="page-admin-securite" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={securite} titleKey="authTitle" iconKey="authIcon" iconClassKey="authIconClass">
              <div style={{ padding: 18 }}>
                <div style={{ color: "var(--text-light)", fontSize: 13, lineHeight: "1.7" }}>{securite.authDescription}</div>
                <div style={{ marginTop: 12 }}>
                  <input id="adminAuthUser" className="actu-search-input" placeholder="Identifiant" />
                  <input id="adminAuthPass" className="actu-search-input" placeholder="Mot de passe" style={{ marginTop: 12, paddingLeft: 14 }} type="password" />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                    <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "adminAuthenticate()")}>
                      Authentifier
                    </button>
                  </div>
                </div>
                <div id="adminAuthState" style={{ marginTop: 12, color: "var(--text-light)", fontSize: 13 }} />
              </div>
            </DashboardCard>
            <DashboardCard page={securite} titleKey="controlTitle" iconKey="controlIcon" iconClassKey="controlIconClass">
              <div id="adminAccessControl" style={{ padding: 18 }} />
            </DashboardCard>
          </div>
        </div>

        <div id="page-admin-tracabilite" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={cards.tracabilite || {}}>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                {logFilters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`actu-filter-btn${filter.active ? " active" : ""}`}
                    onClick={(event) => runLegacyHandler(event, `setAdminLogFilter('${filter.value}', this)`)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div id="adminLogList" className="doc-list" />
            </div>
          </DashboardCard>
        </div>

        <div id="page-admin-performance" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={cards.performance || {}}>
            <div id="adminPerfDash" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
      </div>
    </>
  );
}

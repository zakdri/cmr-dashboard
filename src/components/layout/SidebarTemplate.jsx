import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function SidebarTemplate() {
  return (
    <>
      <div>
        {/* LEFT SIDEBAR */}
        <aside className="sidebar-left">
          <nav className="sidebar-nav">
            {/* Group 1: Priority Access */}
            <div
              id="nav-dashboard"
              className="nav-item active"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('dashboard')")
              }
            >
              <i data-lucide="home" />
              <span>Accueil</span>
            </div>
            <div
              id="nav-applis"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('applis')")
              }
            >
              <i data-lucide="layers" />
              <span>Mes Applications</span>
            </div>
            {/* Group 2: HR, Social & Learning */}
            <div
              id="nav-rh"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('rh')")
              }
            >
              <i data-lucide="users" />
              <span>RH &amp; Mobilité</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-academy"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('academy')")
              }
            >
              <i data-lucide="graduation-cap" />
              <span>CMR Academy</span>
            </div>
            <div
              id="nav-vie-sociale"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('vie-sociale')")
              }
            >
              <i data-lucide="coffee" />
              <span>Vie Sociale</span>
            </div>
            <div
              id="nav-communication-interne"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('communication-interne')")
              }
            >
              <i data-lucide="megaphone" />
              <span>Communication interne</span>
            </div>
            {/* Group 3: Work, Docs & Collab */}
            <div
              id="nav-km"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('km')")
              }
            >
              <i data-lucide="brain" />
              <span>Knowledge Management</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-documentaires"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('documentaires')")
              }
            >
              <i data-lucide="folder-open" />
              <span>Espaces métiers</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-collaboratifs"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('collaboratifs')")
              }
            >
              <i data-lucide="network" />
              <span>Espaces collaboratifs</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-projets"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('projets')")
              }
            >
              <i data-lucide="briefcase" />
              <span>Projets</span>
            </div>
            {/* Group 4: Sub-departments & Institutional */}
            <div
              id="nav-institutionnel"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('institutionnel')")
              }
            >
              <i data-lucide="landmark" />
              <span>Organisation &amp; Gouvernance</span>
            </div>
            <div
              id="nav-annuaire"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('annuaire')")
              }
            >
              <i data-lucide="users" />
              <span>Annuaire</span>
            </div>
            <div
              id="nav-reglementation"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "toggleSidebarSubmenu('reglementation')",
                )
              }
            >
              <i data-lucide="shield-check" />
              <span>Réglementation</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-achats"
              className="nav-item"
              onClick={(event) =>
                runLegacyHandler(event, "switchView('achats')")
              }
            >
              <i data-lucide="shopping-cart" />
              <span>Achats</span>
            </div>
            <div
              id="nav-rse"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('rse')")
              }
            >
              <i data-lucide="leaf" />
              <span>RSE</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-qse"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('qse')")
              }
            >
              <i data-lucide="badge-check" />
              <span>QSE</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-sitd"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('sitd')")
              }
            >
              <i data-lucide="server" />
              <span>Espace SI / SITD</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-arc"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('arc')")
              }
            >
              <i data-lucide="shield-check" />
              <span>Audit, Risque &amp; Conformité</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-mediatheque"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('mediatheque')")
              }
            >
              <i data-lucide="clapperboard" />
              <span>Médiathèque</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-innovation"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('innovation')")
              }
            >
              <i data-lucide="lightbulb" />
              <span>Innovation</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
            <div
              id="nav-admin"
              className="nav-item has-submenu"
              onClick={(event) =>
                runLegacyHandler(event, "toggleSidebarSubmenu('admin')")
              }
            >
              <i data-lucide="settings" />
              <span>Administration &amp; Pilotage</span>
              <i data-lucide="chevron-right" className="submenu-indicator" />
            </div>
          </nav>
        </aside>
        <aside className="sidebar-submenu-panel" id="sidebarSubmenu">
          <div className="submenu-title" id="submenuTitle">
            Sous-menu
          </div>
          <div className="submenu-list" id="submenuList" />
        </aside>
      </div>
    </>
  );
}

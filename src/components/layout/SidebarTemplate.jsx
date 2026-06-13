import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getSidebarData() {
  const data = window.CMR_DATA?.data || {};
  return {
    items: data.sidebarMainItems || [],
  };
}

export default function SidebarTemplate() {
  const { items } = getSidebarData();

  return (
    <>
      <div>
        <aside className="sidebar-left">
          <nav className="sidebar-nav">
            {items.map((item) => (
              <div
                key={item.id}
                id={`nav-${item.id}`}
                className={[
                  "nav-item",
                  item.active ? "active" : "",
                  item.hasSubmenu ? "has-submenu" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={(event) => runLegacyHandler(event, item.handler)}
              >
                <i data-lucide={item.icon} />
                <span>{item.label}</span>
                {item.hasSubmenu && (
                  <i data-lucide="chevron-right" className="submenu-indicator" />
                )}
              </div>
            ))}
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

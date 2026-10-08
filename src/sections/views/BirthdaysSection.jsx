import React, { useEffect, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { renderLucideIcons } from "../../lucideLocal.js";
import { loadBirthdayPeople } from "../../services/birthdays.js";
import { isDemoMode } from "../../services/moovappsPlatform.js";

function demoBirthdayPeople() {
  const items = window.CMR_DATA?.data?.dashboardRightSidebar?.birthdays?.items || [];
  return items.map((item, index) => ({
    id: `demo-birthday-page-${index}`,
    name: item.name,
    affectation: String(item.role || "").split("•").slice(1).join("•").trim(),
  }));
}

export default function BirthdaysSection() {
  const [people, setPeople] = useState(isDemoMode() ? demoBirthdayPeople() : []);

  useEffect(() => {
    let cancelled = false;
    if (isDemoMode()) return undefined;

    loadBirthdayPeople()
      .then((items) => {
        if (!cancelled) setPeople(items);
      })
      .catch((error) => console.error("Liste des anniversaires Moovapps indisponible :", error));

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => renderLucideIcons());
  }, [people]);

  return (
    <div id="view-birthdays" className="view-section notif-page-container">
      <div className="notif-page-header">
        <div className="notif-page-title-row">
          <div className="card-icon pink" style={{ width: 42, height: 42 }}>
            <i data-lucide="cake" style={{ width: 22, height: 22 }} />
          </div>
          <div>
            <h2 className="actu-page-title">Anniversaires professionnels</h2>
            <p className="actu-page-sub">Aujourd&apos;hui</p>
          </div>
        </div>
        <button
          type="button"
          className="secondary-btn"
          onClick={(event) => runLegacyHandler(event, "switchView('dashboard')")}
        >
          <i data-lucide="arrow-left" style={{ width: 15, height: 15 }} />
          Retour
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14,
        }}
      >
        {people.map((person) => (
          <article
            key={person.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 18,
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
            }}
          >
            <div
              className="member-avatar"
              style={{
                width: 46,
                height: 46,
                flex: "0 0 46px",
                color: "white",
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              }}
            >
              <i data-lucide="party-popper" style={{ width: 20, height: 20 }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "#1e293b", fontSize: 15, fontWeight: 800 }}>{person.name}</div>
              <div style={{ marginTop: 4, color: "#f59e0b", fontSize: 12, fontWeight: 700 }}>
                Aujourd&apos;hui{person.affectation ? ` • ${person.affectation}` : ""}
              </div>
            </div>
          </article>
        ))}
      </div>

      {people.length === 0 ? (
        <div className="actu-empty" style={{ display: "flex" }}>
          <i data-lucide="cake" style={{ width: 44, height: 44, color: "#cbd5e1" }} />
          <p>Aucun anniversaire aujourd&apos;hui.</p>
        </div>
      ) : null}
    </div>
  );
}

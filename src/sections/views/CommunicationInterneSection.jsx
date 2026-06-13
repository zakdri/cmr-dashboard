import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getCommunicationInterneData() {
  return {
    header: window.CMR_DATA?.data?.communicationInterneHeader || {},
    cards: window.CMR_DATA?.data?.communicationInterneCards || [],
    filterCard: window.CMR_DATA?.data?.communicationInterneFilterCard || {}
  };
}

function CommunicationCard({ card }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="card-title">
          <div className={`card-icon ${card.iconClass}`}>
            <i data-lucide={card.icon} style={{ width: 20, height: 20 }} />
          </div>
          {card.title}
        </div>
        <a
          href="#"
          className="card-action"
          onClick={(event) => runLegacyHandler(event, card.actionHandler)}
          style={{ whiteSpace: "nowrap" }}
        >
          {card.action}
          <i data-lucide="arrow-right" style={{ width: 14, height: 14 }} />
        </a>
      </div>
      <div className="doc-list">
        {(card.items || []).map((item) => (
          <div
            className="doc-item"
            key={`${card.title}-${item.title}`}
            onClick={(event) => runLegacyHandler(event, item.handler)}
          >
            <div className="doc-icon" style={item.labelStyle}>
              {item.label}
            </div>
            <div className="doc-info">
              <div className="doc-title">{item.title}</div>
              <div className="doc-meta">{item.meta}</div>
            </div>
            <i
              data-lucide="chevron-right"
              style={{ width: 16, height: 16, color: "#94a3b8" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CommunicationInterneSection() {
  const { header, cards, filterCard } = getCommunicationInterneData();

  return (
    <>
      <div
        id="view-communication-interne"
        className="view-section km-container"
      >
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="dashboard-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {cards.map((card) => (
            <CommunicationCard key={card.title} card={card} />
          ))}

          <div className="dashboard-card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <div className="card-title">
                <div className={`card-icon ${filterCard.iconClass}`}>
                  <i
                    data-lucide={filterCard.icon}
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                {filterCard.title}
              </div>
            </div>
            <div className="actu-page-header" style={{ padding: 0, margin: 0 }}>
              <div className="actu-page-title-row" style={{ gap: 10 }}>
                <div>
                  <p className="actu-page-sub" style={{ margin: 0 }}>
                    {filterCard.subtitle}
                  </p>
                </div>
              </div>
              <div className="actu-search-wrap" style={{ maxWidth: 420 }}>
                <i data-lucide="search" className="actu-search-icon" />
                <input
                  id="commInterneSearchInput"
                  type="text"
                  className="actu-search-input"
                  placeholder="Rechercher un contenu..."
                  onInput={(event) =>
                    runLegacyHandler(
                      event,
                      "filterCommInternePreview(this.value)",
                    )
                  }
                />
              </div>
            </div>
            <div style={{ margin: "16px 0 0 0" }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {filterCard.themesTitle}
              </div>
              <div
                id="commInterneThemeFilters"
                className="actu-filters"
                style={{ margin: 0 }}
              >
                {(filterCard.themes || []).map((theme) => (
                  <button
                    key={theme.id}
                    className={`actu-filter-btn${theme.active ? " active" : ""}`}
                    onClick={(event) =>
                      runLegacyHandler(
                        event,
                        `filterCommInterneCategory('${theme.id}', this)`,
                      )
                    }
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ margin: "12px 0 0 0" }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {filterCard.entitiesTitle}
              </div>
              <div
                id="commInterneMetierFilters"
                className="actu-filters"
                style={{ margin: 0 }}
              >
                {(filterCard.entities || []).map((entity) => (
                  <button
                    key={entity.id}
                    className={`actu-filter-btn${entity.active ? " active" : ""}`}
                    onClick={(event) =>
                      runLegacyHandler(
                        event,
                        `filterCommInterneMetier('${entity.id}', this)`,
                      )
                    }
                  >
                    {entity.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    fontWeight: 700,
                  }}
                >
                  {filterCard.previewTitle}
                </div>
                <button
                  className="actu-filter-btn"
                  style={{ padding: "8px 12px" }}
                  onClick={(event) =>
                    runLegacyHandler(event, "goToActualitesFromCommInterne();")
                  }
                >
                  {filterCard.previewAction}
                </button>
              </div>
              <div id="commInternePreview" className="doc-list" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

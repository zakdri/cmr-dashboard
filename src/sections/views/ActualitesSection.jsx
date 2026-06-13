import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getActualitesData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.actualitesHeader || {},
    filters: data.actualitesFilters || [],
    articles: data.actuData || [],
  };
}

export default function ActualitesSection() {
  const { header, filters, articles } = getActualitesData();

  return (
    <>
      <div id="view-actualites" className="view-section actu-container">
        {/* LIST PANEL */}
        <div id="actu-list-panel">
          <div className="actu-page-header">
            <div className="actu-page-title-row">
              <div className={`card-icon ${header.iconClass}`} style={{ width: 42, height: 42 }}>
                <i data-lucide={header.icon} style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <h2 className="actu-page-title">{header.title}</h2>
                <p className="actu-page-sub">{header.description}</p>
              </div>
            </div>
            {/* Search Bar */}
            <div className="actu-search-wrap">
              <i data-lucide="search" className="actu-search-icon" />
              <input
                type="text"
                id="actuSearchInput"
                className="actu-search-input"
                placeholder="Rechercher une actualité..."
                onInput={(event) =>
                  runLegacyHandler(event, "filterActu(this.value)")
                }
              />
            </div>
          </div>
          {/* Category Filter */}
          <div className="actu-filters" id="actuFilters">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`actu-filter-btn${filter.active ? " active" : ""}`}
                onClick={(event) =>
                  runLegacyHandler(event, `filterByCategory('${filter.value}', this)`)
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
          {/* Results count */}
          <div className="actu-results-info" id="actuResultsInfo">
            <span id="actuCount">{articles.length}</span> résultat(s)
          </div>
          {/* Articles Grid */}
          <div className="actu-grid" id="actuGrid">
            {/* Rendered by JS */}
          </div>
          {/* Empty state */}
          <div
            className="actu-empty"
            id="actuEmpty"
            style={{ display: "none" }}
          >
            <i
              data-lucide="search-x"
              style={{ width: 48, height: 48, color: "#cbd5e1" }}
            />
            <p>Aucune actualité trouvée.</p>
          </div>
        </div>
        {/* DETAIL PANEL */}
        <div id="actu-detail-panel" style={{ display: "none" }}>
          <button
            className="actu-back-btn"
            onClick={(event) => runLegacyHandler(event, "backToActuList()")}
          >
            <i data-lucide="arrow-left" style={{ width: 16, height: 16 }} />
            Retour aux actualités
          </button>
          <div className="actu-detail-card" id="actuDetailContent">
            {/* Injected by JS */}
          </div>
        </div>
      </div>
      {/* ===== END ACTUALITÉS VIEW ===== */}
      {/* ===== COMMUNICATION INTERNE VIEW ===== */}
    </>
  );
}

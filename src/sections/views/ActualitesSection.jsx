import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function ActualitesSection() {
  return (
    <>
      <div id="view-actualites" className="view-section actu-container">
        {/* LIST PANEL */}
        <div id="actu-list-panel">
          <div className="actu-page-header">
            <div className="actu-page-title-row">
              <div className="card-icon blue" style={{ width: 42, height: 42 }}>
                <i data-lucide="newspaper" style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <h2 className="actu-page-title">Actualités</h2>
                <p className="actu-page-sub">
                  Toutes les dernières informations de la CMR
                </p>
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
            <button
              className="actu-filter-btn active"
              onClick={(event) =>
                runLegacyHandler(event, "filterByCategory('all', this)")
              }
            >
              Toutes
            </button>
            <button
              className="actu-filter-btn"
              onClick={(event) =>
                runLegacyHandler(event, "filterByCategory('Gouvernance', this)")
              }
            >
              Gouvernance
            </button>
            <button
              className="actu-filter-btn"
              onClick={(event) =>
                runLegacyHandler(event, "filterByCategory('Digital', this)")
              }
            >
              Digital
            </button>
            <button
              className="actu-filter-btn"
              onClick={(event) =>
                runLegacyHandler(event, "filterByCategory('Innovation', this)")
              }
            >
              Innovation
            </button>
            <button
              className="actu-filter-btn"
              onClick={(event) =>
                runLegacyHandler(event, "filterByCategory('Formation', this)")
              }
            >
              Formation
            </button>
            <button
              className="actu-filter-btn"
              onClick={(event) =>
                runLegacyHandler(event, "filterByCategory('Social', this)")
              }
            >
              Social
            </button>
            <button
              className="actu-filter-btn"
              onClick={(event) =>
                runLegacyHandler(event, "filterByCategory('Stratégie', this)")
              }
            >
              Stratégie
            </button>
          </div>
          {/* Results count */}
          <div className="actu-results-info" id="actuResultsInfo">
            <span id="actuCount">10</span> actualités trouvées
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
            <p>Aucune actualité ne correspond à votre recherche.</p>
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

import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getAnnuaireData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.annuaireHeader || {},
    cards: data.annuaireQuickCards || [],
    labels: data.annuaireLabels || {},
  };
}

export default function AnnuaireSection() {
  const { header, cards, labels } = getAnnuaireData();

  return (
    <>
      <div id="view-annuaire" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div className="km-grid" style={{ marginBottom: 20 }}>
          {cards.map((card) => (
            <div
              className="doc-card"
              key={card.title}
              style={{ cursor: "pointer" }}
              onClick={(event) => runLegacyHandler(event, card.handler)}
            >
              <div className="doc-icon-large" style={card.iconStyle}>
                <i data-lucide={card.icon} style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">{card.title}</div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-light)",
                  marginTop: 8,
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <div className="app-category-title" style={{ margin: 0 }}>
            {labels.searchTitle}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <div className="actu-search-wrap" style={{ maxWidth: 360, flex: 1 }}>
              <i data-lucide="search" className="actu-search-icon" />
              <input
                id="annuaireSearchInput"
                type="text"
                className="actu-search-input"
                placeholder={labels.searchPlaceholder}
                onInput={(event) =>
                  runLegacyHandler(event, "renderAnnuaireList()")
                }
              />
            </div>
            <select
              id="annuaireDirectionFilter"
              onChange={(event) =>
                runLegacyHandler(event, "renderAnnuaireList()")
              }
              style={{
                height: 40,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#fff",
                padding: "0 12px",
                fontSize: 12,
                color: "#475569",
                minWidth: 190,
              }}
            >
              <option value="">{labels.allDirectionsLabel}</option>
            </select>
            <select
              id="annuaireFonctionFilter"
              onChange={(event) =>
                runLegacyHandler(event, "renderAnnuaireList()")
              }
              style={{
                height: 40,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#fff",
                padding: "0 12px",
                fontSize: 12,
                color: "#475569",
                minWidth: 190,
              }}
            >
              <option value="">{labels.allFunctionsLabel}</option>
            </select>
            <button
              className="secondary-btn"
              onClick={(event) =>
                runLegacyHandler(event, "resetAnnuaireFilters()")
              }
            >
              {labels.resetLabel}
            </button>
          </div>
        </div>
        <div
          className="dashboard-grid"
          style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="users" style={{ width: 20, height: 20 }} />
                </div>
                {labels.resultsTitle}
              </div>
              <div
                id="annuaireCount"
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  fontWeight: 700,
                }}
              >
                {labels.initialCount}
              </div>
            </div>
            <div id="annuaireList" className="doc-list" />
          </div>
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="user" style={{ width: 20, height: 20 }} />
                </div>
                {labels.profileTitle}
              </div>
            </div>
            <div
              id="annuaireDetail"
              style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}
            >
              {labels.emptyDetail}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getMetiersData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.metiersHeader || {},
    pages: data.metiersPages || {},
  };
}

function CardTitle({ page }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${page.iconClass}`}>
        <i data-lucide={page.icon} style={{ width: 20, height: 20 }} />
      </div>
      {page.title}
    </div>
  );
}

export default function DocumentairesSection() {
  const { header, pages } = getMetiersData();
  const domaines = pages.domaines || {};
  const referentiels = pages.referentiels || {};
  const livrables = pages.livrables || {};
  const si = pages.si || {};
  const thematiques = pages.thematiques || {};
  const mediatheque = pages.mediatheque || {};

  return (
    <>
      <div id="view-documentaires" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="metiersMainNavbar"
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
          id="metiersSubNavbar"
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
        <div
          id="page-metiers-domaines"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle page={domaines} />
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  color: "var(--text-light)",
                  fontSize: 13,
                  lineHeight: "1.7",
                  marginBottom: 12,
                }}
              >
                {domaines.intro}
              </div>
              <div id="metiersDomainesNav" className="km-grid" />
              <div
                id="metiersDomainesDetail"
                style={{
                  marginTop: 12,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 14,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                {domaines.emptyDetail}
              </div>
            </div>
          </div>
        </div>
        <div
          id="page-metiers-referentiels"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle page={referentiels} />
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="metiersRefSearch"
                  className="actu-search-input"
                  placeholder={referentiels.searchPlaceholder}
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersReferentiels()")
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                {(referentiels.filters || []).map((filter) => (
                  <button
                    key={filter.type}
                    className={`actu-filter-btn${filter.active ? " active" : ""}`}
                    onClick={(event) =>
                      runLegacyHandler(
                        event,
                        `setMetiersRefType('${filter.type}', this)`,
                      )
                    }
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div id="metiersRefList" className="doc-list" />
            </div>
          </div>
        </div>
        <div
          id="page-metiers-livrables"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle page={livrables} />
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="metiersLivSearch"
                  className="actu-search-input"
                  placeholder={livrables.searchPlaceholder}
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersLivrables()")
                  }
                />
              </div>
              <div id="metiersLivList" className="doc-list" />
            </div>
          </div>
        </div>
        <div
          id="page-metiers-si"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle page={si} />
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr .6fr",
                  gap: 12,
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    {si.integrationTitle}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      color: "var(--text-light)",
                      fontSize: 13,
                      lineHeight: "1.7",
                    }}
                  >
                    {si.integrationDescription}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className="primary-btn"
                      onClick={(event) =>
                        runLegacyHandler(event, si.primaryAction?.handler)
                      }
                    >
                      {si.primaryAction?.label}
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={(event) =>
                        runLegacyHandler(event, si.secondaryAction?.handler)
                      }
                    >
                      {si.secondaryAction?.label}
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    {si.widgetTitle}
                  </div>
                  <div
                    id="metiersSiWidget"
                    style={{
                      marginTop: 10,
                      color: "var(--text-light)",
                      fontSize: 13,
                      lineHeight: "1.7",
                    }}
                  />
                  <button
                    className="actu-filter-btn"
                    style={{ marginTop: 10 }}
                    onClick={(event) =>
                      runLegacyHandler(event, "renderMetiersSiWidget(true)")
                    }
                  >
                    {si.refreshLabel}
                  </button>
                </div>
              </div>
              <div
                style={{
                  marginTop: 12,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 900, color: "#0f172a" }}>
                  {si.systemsTitle}
                </div>
                <div
                  id="metiersSiList"
                  className="doc-list"
                  style={{ marginTop: 10 }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="page-metiers-thematiques"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle page={thematiques} />
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="filter" style={{ width: 16 }} />
                <input
                  id="metiersThemeSearch"
                  className="actu-search-input"
                  placeholder={thematiques.searchPlaceholder}
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersThemes()")
                  }
                />
              </div>
              <div className="km-grid" id="metiersThemesGrid" />
            </div>
          </div>
        </div>
        <div
          id="page-metiers-mediatheque"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle page={mediatheque} />
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="metiersMediaSearch"
                  className="actu-search-input"
                  placeholder={mediatheque.searchPlaceholder}
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMetiersMedia()")
                  }
                />
              </div>
              <div
                id="metiersMediaGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                  gap: 12,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

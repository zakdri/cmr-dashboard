import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getRegData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.regHeader || {},
    pages: data.regPages || {},
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

function FilterButtons({ filters = [], handler }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 12,
      }}
    >
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`actu-filter-btn${filter.active ? " active" : ""}`}
          onClick={(event) =>
            runLegacyHandler(event, `${handler}('${filter.value}', this)`)
          }
        >
          {filter.label}{" "}
          {filter.suffix && (
            <span style={{ opacity: ".7", fontSize: 10 }}>
              {filter.suffix}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function SearchInput({ id, icon = "search", placeholder, onInput }) {
  return (
    <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
      <i data-lucide={icon} style={{ width: 16 }} />
      <input
        id={id}
        className="actu-search-input"
        placeholder={placeholder}
        onInput={(event) => runLegacyHandler(event, onInput)}
      />
    </div>
  );
}

function SimpleCardPage({ page, children }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle page={page} />
      </div>
      {children}
    </div>
  );
}

export default function ReglementationSection() {
  const { header, pages } = getRegData();

  return (
    <>
      <div id="view-reglementation" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="regMainNavbar"
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
          id="regSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 16,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>

        <div id="page-reg-textes" className="km-tab-content" style={{ display: "block" }}>
          <SimpleCardPage page={pages.textes || {}}>
            <div style={{ padding: 18 }}>
              <SearchInput
                id="regTextesSearch"
                placeholder="Rechercher un texte..."
                onInput="renderRegTextes()"
              />
              <FilterButtons
                filters={pages.textes?.filters}
                handler="setRegTextesType"
              />
              <div id="regTextesList" className="doc-list" />
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-thematiques" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.thematiques || {}}>
            <div style={{ padding: 18 }}>
              <FilterButtons
                filters={pages.thematiques?.filters}
                handler="setRegTheme"
              />
              <div className="km-grid" id="regThematicsGrid" />
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-procedures" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.procedures || {}}>
            <div style={{ padding: 18 }}>
              <SearchInput
                id="regProcSearch"
                placeholder="Rechercher une procédure..."
                onInput="renderRegProcedures()"
              />
              <div id="regProceduresList" className="doc-list" />
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-notes" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.notes || {}}>
            <div style={{ padding: 18 }}>
              <div id="regNotesList" className="doc-list" />
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-moteur" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.moteur || {}}>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap">
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="regGlobalSearch"
                  className="actu-search-input"
                  placeholder="Recherche globale..."
                  onInput={(event) =>
                    runLegacyHandler(event, "renderRegGlobalSearch()")
                  }
                />
              </div>
              <div style={{ marginTop: 12 }}>
                <FilterButtons
                  filters={pages.moteur?.filters}
                  handler="setRegGlobalScope"
                />
              </div>
              <div
                id="regGlobalResults"
                className="doc-list"
                style={{ marginTop: 12 }}
              />
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-ged" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.ged || {}}>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.7",
                  }}
                >
                  {pages.ged?.description}
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, pages.ged?.actionHandler)
                  }
                >
                  {pages.ged?.action}
                </button>
              </div>
              <div
                style={{
                  marginTop: 14,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 900, color: "#0f172a" }}>
                  {pages.ged?.latestTitle}
                </div>
                <div
                  id="regGedList"
                  className="doc-list"
                  style={{ marginTop: 10 }}
                />
              </div>
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-gestion" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.gestion || {}}>
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
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "regCreateContent()")
                  }
                >
                  Créer un contenu
                </button>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "renderRegGestion()")
                  }
                >
                  Rafraîchir
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {(pages.gestion?.columns || []).map((column, index) => (
                        <th
                          key={column}
                          style={{
                            padding: "12px 16px",
                            textAlign:
                              index === (pages.gestion?.columns || []).length - 1
                                ? "right"
                                : "left",
                            fontWeight: 700,
                            color: "#475569",
                          }}
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody id="regGestionTable" />
                </table>
              </div>
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-workflow" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.workflow || {}}>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  color: "var(--text-light)",
                  fontSize: 13,
                  lineHeight: "1.7",
                  marginBottom: 12,
                }}
              >
                {pages.workflow?.description}
              </div>
              <div id="regWorkflowQueue" className="doc-list" />
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-historique" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.historique || {}}>
            <div style={{ padding: 18 }}>
              <FilterButtons
                filters={pages.historique?.filters}
                handler="setRegHistoryFilter"
              />
              <div id="regHistoryList" className="doc-list" />
            </div>
          </SimpleCardPage>
        </div>

        <div id="page-reg-archives" className="km-tab-content" style={{ display: "none" }}>
          <SimpleCardPage page={pages.archives || {}}>
            <div style={{ padding: 18 }}>
              <FilterButtons
                filters={pages.archives?.filters}
                handler="setRegArchiveMode"
              />
              <SearchInput
                id="regArchiveTag"
                icon="filter"
                placeholder="Rechercher dans les archives..."
                onInput="renderRegArchives()"
              />
              <div id="regArchivesList" className="doc-list" />
            </div>
          </SimpleCardPage>
        </div>
      </div>
    </>
  );
}

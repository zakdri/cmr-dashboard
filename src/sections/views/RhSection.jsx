import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getRhData() {
  return {
    header: window.CMR_DATA?.data?.rhHeader || {},
    tabs: window.CMR_DATA?.data?.rhTabs || [],
    pages: window.CMR_DATA?.data?.rhPages || {},
    offresIntro: window.CMR_DATA?.data?.rhOffresIntro || "",
    offresFilters: window.CMR_DATA?.data?.rhOffresFilters || {},
    offresList: window.CMR_DATA?.data?.rhOffresList || []
  };
}

function DocCard({ card, className = "doc-card" }) {
  return (
    <div
      className={className}
      data-theme={card.theme}
      data-type={card.type}
      data-duree={card.duree}
      style={card.cardStyle || { cursor: "pointer" }}
      onClick={
        card.onClick
          ? (event) => runLegacyHandler(event, card.onClick)
          : undefined
      }
    >
      <div
        className={card.iconClass || "doc-icon-large"}
        style={card.iconStyle}
      >
        <i
          data-lucide={card.icon || "file-text"}
          style={{ width: 24, height: 24 }}
        />
      </div>
      <div className="doc-card-title">{card.title}</div>
      {card.description ? (
        <p
          style={{
            fontSize: 12,
            color: "var(--text-light)",
            marginTop: 6,
          }}
        >
          {card.description}
        </p>
      ) : null}
      <div className="doc-card-meta">
        <span style={card.actionStyle}>{card.action}</span>
        <i
          data-lucide={card.actionIcon || "arrow-right"}
          style={card.actionIconStyle || { width: 16 }}
        />
      </div>
    </div>
  );
}

function AppLargeCard({ card }) {
  return (
    <a
      href={card.href || "#"}
      className="app-card-large"
      style={{
        "--hover-bg": card.hoverBg,
        "--hover-border": card.hoverBorder,
        textDecoration: "none",
      }}
    >
      <div
        className="app-card-icon-large"
        style={{ background: card.iconBackground }}
      >
        <i data-lucide={card.icon} style={{ width: 24, height: 24 }} />
      </div>
      <div className="app-card-content">
        <span className="app-card-title-large">{card.title}</span>
        <p className="app-card-desc">{card.description}</p>
        <div className="app-card-action">
          {card.action}
          <i data-lucide={card.actionIcon || "arrow-right"} style={{ width: 14 }} />
        </div>
      </div>
    </a>
  );
}

function StatusTable({ table }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          {(table.columns || []).map((column) => (
            <th
              key={column}
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontWeight: 600,
                color: "#475569",
              }}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(table.rows || []).map((row, rowIndex) => (
          <tr
            key={`${row.title}-${rowIndex}`}
            style={
              rowIndex < table.rows.length - 1
                ? { borderBottom: "1px solid #f1f5f9" }
                : undefined
            }
          >
            {(row.cells || []).map((cell, cellIndex) => (
              <td
                key={`${cell}-${cellIndex}`}
                style={{
                  padding: "12px 16px",
                  color: cellIndex === 0 ? "#1e293b" : "var(--text-light)",
                  fontWeight: cellIndex === 0 ? 500 : undefined,
                }}
              >
                {cell}
              </td>
            ))}
            <td style={{ padding: "12px 16px" }}>
              <span
                style={{
                  background: row.statusBackground,
                  color: row.statusColor,
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function RhSection() {
  const { header, tabs, pages, offresIntro, offresFilters, offresList } =
    getRhData();
  const carrierePage = pages.carriere || {};
  const formationPage = pages.formation || {};
  const documentsPage = pages.documents || {};
  const managersPage = pages.managers || {};
  const enquetesPage = pages.enquetes || {};
  const rhApplisPage = pages.applis || {};
  const forumsPage = pages.forums || {};
  const vieSocialePage = pages.viesociale || {};
  const activitesPage = pages.activites || {};

  return (
    <>
      <div id="view-rh" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 30,
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <div
                className={`km-nav-item${index === 0 ? " active" : ""}`}
                onClick={(event) =>
                  runLegacyHandler(event, `switchRhPageTab('${tab.id}')`)
                }
                style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
              >
                {tab.label}
              </div>
              {index < tabs.length - 1 ? (
                <span
                  style={{
                    color: "#cbd5e1",
                    fontWeight: 300,
                    fontSize: 18,
                    lineHeight: 1,
                    alignSelf: "center",
                    flexShrink: 0,
                  }}
                >
                  |
                </span>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        {/* TAB: MA CARRIÈRE */}
        <div
          id="page-rh-carriere"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="km-grid">
            <div className="doc-card" style={{ cursor: "default" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#3b82f6" }}
              >
                <i data-lucide="user" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {carrierePage.cards?.[0]?.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-main)",
                  marginTop: 8,
                }}
              >
                <p>
                  <strong>{carrierePage.cards?.[0]?.fields?.[0]?.label}</strong>{" "}
                  {carrierePage.cards?.[0]?.fields?.[0]?.value}
                </p>
                <p>
                  <strong>{carrierePage.cards?.[0]?.fields?.[1]?.label}</strong>{" "}
                  {carrierePage.cards?.[0]?.fields?.[1]?.value}
                </p>
                <p>
                  <strong>{carrierePage.cards?.[0]?.fields?.[2]?.label}</strong>{" "}
                  {carrierePage.cards?.[0]?.fields?.[2]?.value}
                </p>
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  {carrierePage.cards?.[0]?.action}
                </span>
                <i data-lucide="external-link" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "default" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i
                  data-lucide="trending-up"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {carrierePage.cards?.[1]?.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-main)",
                  marginTop: 8,
                }}
              >
                <p>
                  <strong>{carrierePage.cards?.[1]?.fields?.[0]?.label}</strong>{" "}
                  {carrierePage.cards?.[1]?.fields?.[0]?.value}
                </p>
                <p>
                  <strong>{carrierePage.cards?.[1]?.fields?.[1]?.label}</strong>{" "}
                  {carrierePage.cards?.[1]?.fields?.[1]?.value}
                </p>
                <p>
                  <strong>{carrierePage.cards?.[1]?.fields?.[2]?.label}</strong>{" "}
                  {carrierePage.cards?.[1]?.fields?.[2]?.value}
                </p>
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  {carrierePage.cards?.[1]?.action}
                </span>
                <i data-lucide="file-text" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "default" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fdf2f8", color: "#db2777" }}
              >
                <i data-lucide="award" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {carrierePage.cards?.[2]?.title}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "#fdf2f8",
                    border: "1px solid #fbcfe8",
                    padding: "4px 8px",
                    borderRadius: 20,
                    fontSize: 10,
                    color: "#be185d",
                  }}
                >
                  {carrierePage.cards?.[2]?.badges?.[0]}
                </span>
                <span
                  style={{
                    background: "#fdf2f8",
                    border: "1px solid #fbcfe8",
                    padding: "4px 8px",
                    borderRadius: 20,
                    fontSize: 10,
                    color: "#be185d",
                  }}
                >
                  {carrierePage.cards?.[2]?.badges?.[1]}
                </span>
                <span
                  style={{
                    background: "#fdf2f8",
                    border: "1px solid #fbcfe8",
                    padding: "4px 8px",
                    borderRadius: 20,
                    fontSize: 10,
                    color: "#be185d",
                  }}
                >
                  {carrierePage.cards?.[2]?.badges?.[2]}
                </span>
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#db2777", fontWeight: 600 }}>
                  {carrierePage.cards?.[2]?.action}
                </span>
                <i data-lucide="chevron-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Parcours Collaborateur Timeline */}
          <div style={{ marginTop: 36 }}>
            <div className="app-category-title" style={{ marginBottom: 20 }}>
              {carrierePage.timelineTitle}
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "28px 32px",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-light)",
                  marginBottom: 28,
                }}
              >
                {carrierePage.timelineIntro}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 0,
                  position: "relative",
                }}
              >
                {/* Timeline line */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    right: 20,
                    height: 3,
                    background:
                      "linear-gradient(to right, #3b82f6, #8b5cf6, #f59e0b, #ef4444)",
                    borderRadius: 2,
                    zIndex: 0,
                  }}
                />
                {/* Steps */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#3b82f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #eff6ff",
                    }}
                  >
                    <i
                      data-lucide="door-open"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      {carrierePage.timeline?.[0]?.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      {carrierePage.timeline?.[0]?.description}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#dbeafe",
                        color: "#1d4ed8",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {carrierePage.timeline?.[0]?.status}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#8b5cf6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #f5f3ff",
                    }}
                  >
                    <i
                      data-lucide="briefcase"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      {carrierePage.timeline?.[1]?.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      {carrierePage.timeline?.[1]?.description}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#ede9fe",
                        color: "#6d28d9",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {carrierePage.timeline?.[1]?.status}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#f59e0b",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #fffbeb",
                    }}
                  >
                    <i
                      data-lucide="repeat"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      {carrierePage.timeline?.[2]?.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      {carrierePage.timeline?.[2]?.description}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {carrierePage.timeline?.[2]?.status}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#ef4444",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px #fef2f2",
                    }}
                  >
                    <i
                      data-lucide="log-out"
                      style={{ width: 18, height: 18, color: "#fff" }}
                    />
                  </div>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1e293b",
                      }}
                    >
                      {carrierePage.timeline?.[3]?.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-light)",
                        marginTop: 4,
                      }}
                    >
                      {carrierePage.timeline?.[3]?.description}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        background: "#fee2e2",
                        color: "#991b1b",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {carrierePage.timeline?.[3]?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: FORMATION */}
        <div
          id="page-rh-formation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          {/* Catalogue de formation */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {formationPage.catalogueTitle}
          </div>
          {/* Filtres */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Rechercher une formation..."
              style={{
                flex: 1,
                minWidth: 200,
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#1e293b",
              }}
            />
            <select
              id="filtre-theme"
              onChange={(event) =>
                runLegacyHandler(event, "filtrerCatalogue()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#475569",
              }}
            >
              <option value>Tous les thèmes</option>
              <option value="management">Management</option>
              <option value="data">Data &amp; IA</option>
              <option value="conformite">Conformité</option>
              <option value="softskills">Soft Skills</option>
              <option value="digital">Digital</option>
            </select>
            <select
              id="filtre-type"
              onChange={(event) =>
                runLegacyHandler(event, "filtrerCatalogue()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#475569",
              }}
            >
              <option value>Tous les types</option>
              <option value="interne">Interne</option>
              <option value="externe">Externe</option>
              <option value="elearning">e-Learning</option>
              <option value="certification">Certification</option>
            </select>
            <select
              id="filtre-duree"
              onChange={(event) =>
                runLegacyHandler(event, "filtrerCatalogue()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#475569",
              }}
            >
              <option value>Toutes les durées</option>
              <option value="court">Court (≤ 8h)</option>
              <option value="moyen">Moyen (8–20h)</option>
              <option value="long">Long (&gt; 20h)</option>
            </select>
            <button
              onClick={(event) =>
                runLegacyHandler(event, "reinitialiserFiltres()")
              }
              style={{
                padding: "9px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                color: "#64748b",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Réinitialiser
            </button>
          </div>
          <div
            id="catalogue-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <div
              className="doc-card catalogue-item"
              data-theme="management"
              data-type="interne"
              data-duree="moyen"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#3b82f6" }}
              >
                <i
                  data-lucide={formationPage.catalogue?.[0]?.icon || "book-open"}
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {formationPage.catalogue?.[0]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {formationPage.catalogue?.[0]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  {formationPage.catalogue?.[0]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card catalogue-item"
              data-theme="data"
              data-type="elearning"
              data-duree="moyen"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i
                  data-lucide={formationPage.catalogue?.[1]?.icon || "bar-chart-2"}
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {formationPage.catalogue?.[1]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {formationPage.catalogue?.[1]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  {formationPage.catalogue?.[1]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card catalogue-item"
              data-theme="conformite"
              data-type="externe"
              data-duree="court"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#fff7ed", color: "#ea580c" }}
              >
                <i
                  data-lucide={formationPage.catalogue?.[2]?.icon || "shield"}
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {formationPage.catalogue?.[2]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {formationPage.catalogue?.[2]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#ea580c", fontWeight: 600 }}>
                  {formationPage.catalogue?.[2]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card catalogue-item"
              data-theme="softskills"
              data-type="interne"
              data-duree="moyen"
              style={{ cursor: "pointer" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#fdf2f8", color: "#db2777" }}
              >
                <i
                  data-lucide={formationPage.catalogue?.[3]?.icon || "users"}
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {formationPage.catalogue?.[3]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {formationPage.catalogue?.[3]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#db2777", fontWeight: 600 }}>
                  {formationPage.catalogue?.[3]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Supports Pédagogiques */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {formationPage.supportsTitle}
          </div>
          <div className="km-grid" style={{ marginBottom: 36 }}>
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#fef3c7", color: "#d97706" }}
              >
                <i
                  data-lucide={formationPage.supports?.[0]?.icon || "video"}
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {formationPage.supports?.[0]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {formationPage.supports?.[0]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#d97706", fontWeight: 600 }}>
                  {formationPage.supports?.[0]?.action}
                </span>
                <i data-lucide="play" style={{ width: 16 }} />
              </div>
            </div>
            <div className="doc-card">
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {formationPage.supports?.[1]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {formationPage.supports?.[1]?.description}
              </p>
              <div className="doc-card-meta">
                <span>{formationPage.supports?.[1]?.action}</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card">
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i
                  data-lucide={formationPage.supports?.[2]?.icon || "mic"}
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {formationPage.supports?.[2]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {formationPage.supports?.[2]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  {formationPage.supports?.[2]?.action}
                </span>
                <i data-lucide="headphones" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Demande de Formation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div className="app-category-title" style={{ marginBottom: 0 }}>
              {formationPage.demandeTitle}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={(event) =>
                  runLegacyHandler(event, "showDemandeForm()")
                }
                id="btn-nouvelle-demande"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--cmr-primary)",
                  color: "#fff",
                  border: "none",
                  padding: "9px 16px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                <i data-lucide="plus" style={{ width: 14 }} /> Nouvelle demande
              </button>
              <button
                onClick={(event) =>
                  runLegacyHandler(event, "showDemandeSuivi()")
                }
                id="btn-suivi-demande"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#fff",
                  color: "#475569",
                  border: "1px solid #e2e8f0",
                  padding: "9px 16px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                <i data-lucide="list" style={{ width: 14 }} /> Suivi des
                demandes
              </button>
            </div>
          </div>
          {/* Formulaire de soumission */}
          <div
            id="demande-form-section"
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 28,
              marginBottom: 36,
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "var(--text-light)",
                marginBottom: 20,
              }}
            >
              {formationPage.demandeIntro}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Intitulé de la formation *
                </label>
                <input
                  type="text"
                  placeholder="Ex : Formation Management Agile"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Type de formation *
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                >
                  <option>Interne</option>
                  <option>Externe</option>
                  <option>e-Learning</option>
                  <option>Certification</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Date souhaitée *
                </label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Justification *
                </label>
                <input
                  type="text"
                  placeholder="Lien avec objectifs / projet"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#1e293b",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
            <button
              onClick={(event) => runLegacyHandler(event, "showDemandeSuivi()")}
              className="primary-btn"
              style={{ width: "100%" }}
            >
              Soumettre la demande
            </button>
          </div>
          {/* Suivi des demandes */}
          <div
            id="demande-suivi-section"
            style={{ display: "none", marginBottom: 36 }}
          >
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
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {formationPage.demandesTable?.columns?.[0]}
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {formationPage.demandesTable?.columns?.[1]}
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {formationPage.demandesTable?.columns?.[2]}
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {formationPage.demandesTable?.columns?.[3]}
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {formationPage.demandesTable?.columns?.[4]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[0]?.cells?.[0]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[0]?.cells?.[1]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[0]?.cells?.[2]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[0]?.cells?.[3]}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: "#dcfce7",
                          color: "#15803d",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {formationPage.demandesTable?.rows?.[0]?.status}
                      </span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[1]?.cells?.[0]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[1]?.cells?.[1]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[1]?.cells?.[2]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[1]?.cells?.[3]}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: "#fef3c7",
                          color: "#92400e",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {formationPage.demandesTable?.rows?.[1]?.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[2]?.cells?.[0]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[2]?.cells?.[1]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[2]?.cells?.[2]}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--text-light)",
                      }}
                    >
                      {formationPage.demandesTable?.rows?.[2]?.cells?.[3]}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: "#fee2e2",
                          color: "#991b1b",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {formationPage.demandesTable?.rows?.[2]?.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Workflow visuel */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                marginTop: 16,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {formationPage.workflowTitle}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#3b82f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="user"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    {formationPage.workflow?.[0]?.label}
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    {formationPage.workflow?.[0]?.description}
                  </div>
                </div>
                <div style={{ flex: 1, height: 2, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#f59e0b",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="users"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    {formationPage.workflow?.[1]?.label}
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    {formationPage.workflow?.[1]?.description}
                  </div>
                </div>
                <div style={{ flex: 1, height: 2, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#16a34a",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="shield-check"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    {formationPage.workflow?.[2]?.label}
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    {formationPage.workflow?.[2]?.description}
                  </div>
                </div>
                <div style={{ flex: 1, height: 2, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#8b5cf6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <i
                      data-lucide="check-circle"
                      style={{ width: 16, color: "#fff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 6,
                    }}
                  >
                    {formationPage.workflow?.[3]?.label}
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>
                    {formationPage.workflow?.[3]?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Historique des formations */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {formationPage.historiqueTitle}
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
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {formationPage.historiqueTable?.columns?.[0]}
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {formationPage.historiqueTable?.columns?.[1]}
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {formationPage.historiqueTable?.columns?.[2]}
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {formationPage.historiqueTable?.columns?.[3]}
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {formationPage.historiqueTable?.columns?.[4]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {formationPage.historiqueTable?.rows?.[0]?.cells?.[0]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[0]?.cells?.[1]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[0]?.cells?.[2]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[0]?.cells?.[3]}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#15803d",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {formationPage.historiqueTable?.rows?.[0]?.status}
                    </span>
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {formationPage.historiqueTable?.rows?.[1]?.cells?.[0]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[1]?.cells?.[1]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[1]?.cells?.[2]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[1]?.cells?.[3]}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#15803d",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {formationPage.historiqueTable?.rows?.[1]?.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {formationPage.historiqueTable?.rows?.[2]?.cells?.[0]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[2]?.cells?.[1]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[2]?.cells?.[2]}
                  </td>
                  <td
                    style={{ padding: "12px 16px", color: "var(--text-light)" }}
                  >
                    {formationPage.historiqueTable?.rows?.[2]?.cells?.[3]}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {formationPage.historiqueTable?.rows?.[2]?.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* TAB: DOCUMENTS RH */}
        <div
          id="page-rh-documents"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {documentsPage.documentsTitle}
          </div>
          <div className="km-grid" style={{ marginBottom: 36 }}>
            <div
              className="doc-card"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "openPdfPreviewModal('docs/Demande_Attestation_de_Travail.pdf','Demande d\\'Attestation de Travail')",
                )
              }
            >
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {documentsPage.documents?.[0]?.title}
              </div>
              <div className="doc-card-meta">
                <span>{documentsPage.documents?.[0]?.action}</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ cursor: "pointer" }}
              onClick={(event) =>
                runLegacyHandler(
                  event,
                  "openPdfPreviewModal('docs/Reglement_Interieur_2026.pdf','Règlement Intérieur 2026')",
                )
              }
            >
              <div className="doc-icon-large pdf">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {documentsPage.documents?.[1]?.title}
              </div>
              <div className="doc-card-meta">
                <span>{documentsPage.documents?.[1]?.action}</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card">
              <div className="doc-icon-large word">
                <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {documentsPage.documents?.[2]?.title}
              </div>
              <div className="doc-card-meta">
                <span>{documentsPage.documents?.[2]?.action}</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
          {/* Valeurs & Chartes */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {documentsPage.chartesTitle}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#fffbeb",
                "--hover-border": "#fde68a",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                }}
              >
                <i data-lucide="heart" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  {documentsPage.chartes?.[0]?.title}
                </span>
                <p className="app-card-desc">
                  {documentsPage.chartes?.[0]?.description}
                </p>
                <div className="app-card-action">
                  {documentsPage.chartes?.[0]?.action}
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#f5f3ff",
                "--hover-border": "#ddd6fe",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                }}
              >
                <i
                  data-lucide="shield-check"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  {documentsPage.chartes?.[1]?.title}
                </span>
                <p className="app-card-desc">
                  {documentsPage.chartes?.[1]?.description}
                </p>
                <div className="app-card-action">
                  {documentsPage.chartes?.[1]?.action}
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#f0fdf4",
                "--hover-border": "#bbf7d0",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                <i data-lucide="leaf" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  {documentsPage.chartes?.[2]?.title}
                </span>
                <p className="app-card-desc">
                  {documentsPage.chartes?.[2]?.description}
                </p>
                <div className="app-card-action">
                  {documentsPage.chartes?.[2]?.action}
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
          </div>
          {/* Référentiels RH */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {documentsPage.referentielsTitle}
          </div>
          <div className="km-grid">
            <div className="doc-card" style={{ cursor: "pointer" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fef2f2", color: "#dc2626" }}
              >
                <i data-lucide="scale" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {documentsPage.referentiels?.[0]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {documentsPage.referentiels?.[0]?.description}
              </p>
              <div className="doc-card-meta">
                <span>{documentsPage.referentiels?.[0]?.action}</span>
                <i
                  data-lucide="folder-open"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "pointer" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fef2f2", color: "#dc2626" }}
              >
                <i data-lucide="book" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {documentsPage.referentiels?.[1]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {documentsPage.referentiels?.[1]?.description}
              </p>
              <div className="doc-card-meta">
                <span>{documentsPage.referentiels?.[1]?.action}</span>
                <i
                  data-lucide="folder-open"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card" style={{ cursor: "pointer" }}>
              <div
                className="doc-icon-large"
                style={{ background: "#fef2f2", color: "#dc2626" }}
              >
                <i
                  data-lucide="list-checks"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {documentsPage.referentiels?.[2]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {documentsPage.referentiels?.[2]?.description}
              </p>
              <div className="doc-card-meta">
                <span>{documentsPage.referentiels?.[2]?.action}</span>
                <i
                  data-lucide="folder-open"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TAB: POSTES VACANTS */}
        <div
          id="page-rh-offres"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          {/* ÉTAPE 1 : LISTE */}
          <div id="offres-liste">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 14, color: "var(--text-light)" }}>
                {offresIntro}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <select
                  style={{
                    padding: "8px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#475569",
                  }}
                >
                  {(offresFilters.directions || []).map((direction) => (
                    <option key={direction}>{direction}</option>
                  ))}
                </select>
                <select
                  style={{
                    padding: "8px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#475569",
                  }}
                >
                  {(offresFilters.niveaux || []).map((niveau) => (
                    <option key={niveau}>{niveau}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {offresList.map((offre) => (
                <div
                  key={offre.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    cursor: "pointer",
                  }}
                  onClick={(event) =>
                    runLegacyHandler(event, `showOffrefiche('${offre.id}')`)
                  }
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "#fff7ed",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      data-lucide="briefcase"
                      style={{ width: 22, height: 22, color: "#ea580c" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#1e293b",
                      }}
                    >
                      {offre.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-light)",
                        marginTop: 3,
                      }}
                    >
                      {offre.meta}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}
                    >
                      {offre.published}
                    </div>
                  </div>
                  <span
                    style={{
                      background: offre.statusBackground,
                      color: offre.statusColor,
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {offre.status}
                  </span>
                  <i
                    data-lucide="chevron-right"
                    style={{ width: 18, color: "#94a3b8", flexShrink: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* ÉTAPE 2 : FICHE POSTE */}
          <div id="offres-fiche" style={{ display: "none" }}>
            <button
              onClick={(event) => runLegacyHandler(event, "showOffresListe()")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                marginBottom: 20,
              }}
            >
              <i data-lucide="arrow-left" style={{ width: 16 }} /> Retour aux
              postes vacants
            </button>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 20,
                  marginBottom: 28,
                }}
              >
                <div>
                  <div
                    id="fiche-titre"
                    style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}
                  />
                  <div
                    id="fiche-meta"
                    style={{
                      fontSize: 13,
                      color: "var(--text-light)",
                      marginTop: 6,
                    }}
                  />
                </div>
                <button
                  onClick={(event) =>
                    runLegacyHandler(event, "showOffreFormulaire()")
                  }
                  style={{
                    background: "#ea580c",
                    color: "#fff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Postuler à ce poste
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Direction
                  </div>
                  <div
                    id="fiche-direction"
                    style={{
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Lieu
                  </div>
                  <div
                    id="fiche-lieu"
                    style={{
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Niveau
                  </div>
                  <div
                    id="fiche-niveau"
                    style={{
                      fontWeight: 600,
                      color: "#1e293b",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Date limite
                  </div>
                  <div
                    id="fiche-date"
                    style={{
                      fontWeight: 600,
                      color: "#ea580c",
                      marginTop: 4,
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#1e293b",
                    marginBottom: 10,
                  }}
                >
                  Mission principale
                </div>
                <div
                  id="fiche-mission"
                  style={{ fontSize: 13, color: "#475569", lineHeight: "1.7" }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#1e293b",
                    marginBottom: 10,
                  }}
                >
                  Profil recherché
                </div>
                <ul
                  id="fiche-profil"
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    lineHeight: "1.9",
                    paddingLeft: 20,
                  }}
                />
              </div>
            </div>
          </div>
          {/* ÉTAPE 3 : FORMULAIRE DE CANDIDATURE */}
          <div id="offres-formulaire" style={{ display: "none" }}>
            <button
              onClick={(event) =>
                runLegacyHandler(event, "showOffrefiche(currentOffre)")
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                marginBottom: 20,
              }}
            >
              <i data-lucide="arrow-left" style={{ width: 16 }} /> Retour à la
              fiche poste
            </button>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 32,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 6,
                }}
              >
                Formulaire de Candidature
              </div>
              <div
                id="form-poste-titre"
                style={{
                  fontSize: 13,
                  color: "var(--text-light)",
                  marginBottom: 28,
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom et prénom"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Matricule *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : CMR-2021-0456"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Poste actuel *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre intitulé de poste actuel"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Direction actuelle *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre direction actuelle"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Ancienneté *
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  >
                    <option>Moins de 2 ans</option>
                    <option>2 – 5 ans</option>
                    <option>5 – 10 ans</option>
                    <option>Plus de 10 ans</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    placeholder="prenom.nom@cmr.ma"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 13,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Lettre de motivation *
                </label>
                <textarea
                  rows={5}
                  placeholder="Expliquez votre intérêt pour ce poste et les compétences que vous apporteriez..."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                  defaultValue={""}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  CV / Portfolio (optionnel)
                </label>
                <div
                  style={{
                    border: "2px dashed #e2e8f0",
                    borderRadius: 8,
                    padding: 20,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onMouseOver={(event) =>
                    runLegacyHandler(event, "this.style.borderColor='#3b82f6'")
                  }
                  onMouseOut={(event) =>
                    runLegacyHandler(event, "this.style.borderColor='#e2e8f0'")
                  }
                >
                  <i
                    data-lucide="upload-cloud"
                    style={{
                      width: 28,
                      height: 28,
                      color: "#94a3b8",
                      marginBottom: 8,
                    }}
                  />
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    Déposer votre fichier ici ou{" "}
                    <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                      parcourir
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                    PDF, DOC – max 5 Mo
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={(event) =>
                    runLegacyHandler(event, "showOffrefiche(currentOffre)")
                  }
                  style={{
                    flex: 1,
                    padding: 12,
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    background: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    color: "#475569",
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "alert('Candidature soumise avec succès ! Vous recevrez une confirmation par email.')",
                    )
                  }
                  style={{
                    flex: 2,
                    padding: 12,
                    border: "none",
                    borderRadius: 8,
                    background: "#ea580c",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Soumettre ma candidature
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: ESPACE MANAGERS */}
        <div
          id="page-rh-managers"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            {managersPage.intro}
          </p>
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {managersPage.guidesTitle}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#f0f9ff",
                "--hover-border": "#bae6fd",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                }}
              >
                <i data-lucide="book-open" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  {managersPage.guides?.[0]?.title}
                </span>
                <p className="app-card-desc">
                  {managersPage.guides?.[0]?.description}
                </p>
                <div className="app-card-action">
                  {managersPage.guides?.[0]?.action}
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#f0fdf4",
                "--hover-border": "#bbf7d0",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                <i
                  data-lucide="clipboard-list"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  {managersPage.guides?.[1]?.title}
                </span>
                <p className="app-card-desc">
                  {managersPage.guides?.[1]?.description}
                </p>
                <div className="app-card-action">
                  {managersPage.guides?.[1]?.action}
                  <i data-lucide="download" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#fff7ed",
                "--hover-border": "#fed7aa",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                <i data-lucide="users" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  {managersPage.guides?.[2]?.title}
                </span>
                <p className="app-card-desc">
                  {managersPage.guides?.[2]?.description}
                </p>
                <div className="app-card-action">
                  {managersPage.guides?.[2]?.action}
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
            <a
              href="#"
              className="app-card-large"
              style={{
                "--hover-bg": "#fdf2f8",
                "--hover-border": "#fbcfe8",
                textDecoration: "none",
              }}
            >
              <div
                className="app-card-icon-large"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #db2777)",
                }}
              >
                <i data-lucide="bar-chart" style={{ width: 24, height: 24 }} />
              </div>
              <div className="app-card-content">
                <span className="app-card-title-large">
                  {managersPage.guides?.[3]?.title}
                </span>
                <p className="app-card-desc">
                  {managersPage.guides?.[3]?.description}
                </p>
                <div className="app-card-action">
                  {managersPage.guides?.[3]?.action}
                  <i data-lucide="arrow-right" style={{ width: 14 }} />
                </div>
              </div>
            </a>
          </div>
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {managersPage.calendarTitle}
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 12,
                  background: "#eff6ff",
                  borderRadius: 8,
                }}
              >
                <div style={{ minWidth: 48, textAlign: "center" }}>
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#2563eb" }}
                  >
                    {managersPage.calendar?.[0]?.day}
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>
                    {managersPage.calendar?.[0]?.month}
                  </div>
                </div>
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                  >
                    {managersPage.calendar?.[0]?.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    {managersPage.calendar?.[0]?.meta}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 12,
                  background: "#f0fdf4",
                  borderRadius: 8,
                }}
              >
                <div style={{ minWidth: 48, textAlign: "center" }}>
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#16a34a" }}
                  >
                    {managersPage.calendar?.[1]?.day}
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>
                    {managersPage.calendar?.[1]?.month}
                  </div>
                </div>
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                  >
                    {managersPage.calendar?.[1]?.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    {managersPage.calendar?.[1]?.meta}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: ENQUÊTES RH */}
        <div
          id="page-rh-enquetes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            {enquetesPage.intro}
          </p>
          {/* Dashboard KPIs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#16a34a" }}>
                {enquetesPage.kpis?.[0]?.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                {enquetesPage.kpis?.[0]?.label}
              </div>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>
                {enquetesPage.kpis?.[0]?.trend}
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#3b82f6" }}>
                {enquetesPage.kpis?.[1]?.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                {enquetesPage.kpis?.[1]?.label}
              </div>
              <div style={{ fontSize: 11, color: "#3b82f6", marginTop: 4 }}>
                {enquetesPage.kpis?.[1]?.trend}
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#f59e0b" }}>
                {enquetesPage.kpis?.[2]?.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                {enquetesPage.kpis?.[2]?.label}
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                {enquetesPage.kpis?.[2]?.trend}
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#8b5cf6" }}>
                {enquetesPage.kpis?.[3]?.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                {enquetesPage.kpis?.[3]?.label}
              </div>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>
                {enquetesPage.kpis?.[3]?.trend}
              </div>
            </div>
          </div>
          {/* Enquêtes actives */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {enquetesPage.activeTitle}
          </div>
          <div className="km-grid" style={{ marginBottom: 32 }}>
            <div
              className="doc-card"
              style={{ borderLeft: "4px solid #3b82f6" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#eff6ff", color: "#3b82f6" }}
              >
                <i data-lucide="clipboard" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {enquetesPage.active?.[0]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {enquetesPage.active?.[0]?.description}
              </p>
              <div
                style={{
                  height: 6,
                  background: "#f1f5f9",
                  borderRadius: 3,
                  margin: "12px 0",
                }}
              >
                <div
                  style={{
                    width: "65%",
                    height: "100%",
                    background: "#3b82f6",
                    borderRadius: 3,
                  }}
                />
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  {enquetesPage.active?.[0]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ borderLeft: "4px solid #16a34a" }}
            >
              <div
                className="doc-icon-large"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <i data-lucide="smile" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">
                {enquetesPage.active?.[1]?.title}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 6,
                }}
              >
                {enquetesPage.active?.[1]?.description}
              </p>
              <div
                style={{
                  height: 6,
                  background: "#f1f5f9",
                  borderRadius: 3,
                  margin: "12px 0",
                }}
              >
                <div
                  style={{
                    width: "40%",
                    height: "100%",
                    background: "#16a34a",
                    borderRadius: 3,
                  }}
                />
              </div>
              <div className="doc-card-meta">
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  {enquetesPage.active?.[1]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
          {/* Résultats précédents */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {enquetesPage.resultsTitle}
          </div>
          <div className="km-grid">
            <div className="doc-card">
              <div className="doc-icon-large pdf">
                <i
                  data-lucide="file-bar-chart"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {enquetesPage.results?.[0]?.title}
              </div>
              <div className="doc-card-meta">
                <span>{enquetesPage.results?.[0]?.action}</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
            <div className="doc-card">
              <div className="doc-icon-large pdf">
                <i
                  data-lucide="file-bar-chart"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div className="doc-card-title">
                {enquetesPage.results?.[1]?.title}
              </div>
              <div className="doc-card-meta">
                <span>{enquetesPage.results?.[1]?.action}</span>
                <i
                  data-lucide="download"
                  style={{ width: 16, color: "#94a3b8" }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TAB: MES APPLIS RH */}
        <div
          id="page-rh-applis"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            {rhApplisPage.intro}
          </p>
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {rhApplisPage.title}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                transition: "box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="user-check"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {rhApplisPage.items?.[0]?.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {rhApplisPage.items?.[0]?.description}
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="calendar"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {rhApplisPage.items?.[1]?.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {rhApplisPage.items?.[1]?.description}
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="dollar-sign"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {rhApplisPage.items?.[2]?.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {rhApplisPage.items?.[2]?.description}
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="graduation-cap"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {rhApplisPage.items?.[3]?.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {rhApplisPage.items?.[3]?.description}
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #ec4899, #db2777)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="target"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {rhApplisPage.items?.[4]?.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {rhApplisPage.items?.[4]?.description}
                </div>
              </div>
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "24px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(
                  event,
                  "this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'",
                )
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.boxShadow='none'")
              }
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  data-lucide="message-circle"
                  style={{ width: 24, height: 24, color: "#fff" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {rhApplisPage.items?.[5]?.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {rhApplisPage.items?.[5]?.description}
                </div>
              </div>
            </a>
          </div>
        </div>
        {/* TAB: FORUMS & GROUPES (Collaboration RH) */}
        <div
          id="page-rh-forums"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 14, color: "var(--text-light)" }}>
                {forumsPage.intro}
              </div>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                padding: "9px 18px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <i data-lucide="plus" style={{ width: 15, height: 15 }} />{" "}
              Nouveau post
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#eff6ff",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="message-square"
                    style={{ width: 20, height: 20, color: "#3b82f6" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}
                  >
                    {forumsPage.items?.[0]?.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    {forumsPage.items?.[0]?.meta}
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {forumsPage.items?.[0]?.status}
                </span>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {forumsPage.items?.[0]?.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                  >
                    {forumsPage.items?.[0]?.author} ·{" "}
                    <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                      {forumsPage.items?.[0]?.when}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>
                    "{forumsPage.items?.[0]?.message}"
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="thumbs-up" style={{ width: 13 }} />{" "}
                      {forumsPage.items?.[0]?.likes}
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#3b82f6",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="message-circle" style={{ width: 13 }} />{" "}
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#f5f3ff",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="users"
                    style={{ width: 20, height: 20, color: "#8b5cf6" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}
                  >
                    {forumsPage.items?.[1]?.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    {forumsPage.items?.[1]?.meta}
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {forumsPage.items?.[1]?.status}
                </span>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#8b5cf6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {forumsPage.items?.[1]?.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                  >
                    {forumsPage.items?.[1]?.author} ·{" "}
                    <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                      {forumsPage.items?.[1]?.when}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>
                    "{forumsPage.items?.[1]?.message}"
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="thumbs-up" style={{ width: 13 }} />{" "}
                      {forumsPage.items?.[1]?.likes}
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#8b5cf6",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="message-circle" style={{ width: 13 }} />{" "}
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#fff7ed",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    data-lucide="lightbulb"
                    style={{ width: 20, height: 20, color: "#ea580c" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}
                  >
                    {forumsPage.items?.[2]?.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-light)",
                      marginTop: 2,
                    }}
                  >
                    {forumsPage.items?.[2]?.meta}
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {forumsPage.items?.[2]?.status}
                </span>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#ea580c",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {forumsPage.items?.[2]?.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                  >
                    {forumsPage.items?.[2]?.author} ·{" "}
                    <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                      {forumsPage.items?.[2]?.when}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>
                    "{forumsPage.items?.[2]?.message}"
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="thumbs-up" style={{ width: 13 }} />{" "}
                      {forumsPage.items?.[2]?.likes}
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        fontSize: 12,
                        color: "#ea580c",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <i data-lucide="message-circle" style={{ width: 13 }} />{" "}
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TAB: VIE SOCIALE (Événements / Photos / Initiatives) */}
        <div
          id="page-rh-viesociale"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 24,
            }}
          >
            {vieSocialePage.intro}
          </p>
          {/* Feed événements */}
          <div className="app-category-title" style={{ marginBottom: 16 }}>
            {vieSocialePage.eventsTitle}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 110,
                  minHeight: 100,
                  background: "linear-gradient(135deg,#ec4899,#db2777)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                  {vieSocialePage.events?.[0]?.day}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {vieSocialePage.events?.[0]?.month}
                </div>
              </div>
              <div style={{ padding: "16px 20px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    {vieSocialePage.events?.[0]?.title}
                  </div>
                  <span
                    style={{
                      background: "#fdf2f8",
                      color: "#be185d",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {vieSocialePage.events?.[0]?.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  {vieSocialePage.events?.[0]?.meta}
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                  {vieSocialePage.events?.[0]?.description}
                </div>
                <button
                  style={{
                    marginTop: 12,
                    background: "#db2777",
                    color: "#fff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {vieSocialePage.events?.[0]?.button}
                </button>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 110,
                  minHeight: 100,
                  background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                  {vieSocialePage.events?.[1]?.day}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {vieSocialePage.events?.[1]?.month}
                </div>
              </div>
              <div style={{ padding: "16px 20px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    {vieSocialePage.events?.[1]?.title}
                  </div>
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {vieSocialePage.events?.[1]?.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  {vieSocialePage.events?.[1]?.meta}
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                  {vieSocialePage.events?.[1]?.description}
                </div>
                <button
                  style={{
                    marginTop: 12,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {vieSocialePage.events?.[1]?.button}
                </button>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 110,
                  minHeight: 100,
                  background: "linear-gradient(135deg,#f59e0b,#d97706)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                  {vieSocialePage.events?.[2]?.day}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {vieSocialePage.events?.[2]?.month}
                </div>
              </div>
              <div style={{ padding: "16px 20px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                  >
                    {vieSocialePage.events?.[2]?.title}
                  </div>
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {vieSocialePage.events?.[2]?.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  {vieSocialePage.events?.[2]?.meta}
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                  {vieSocialePage.events?.[2]?.description}
                </div>
                <button
                  style={{
                    marginTop: 12,
                    background: "#d97706",
                    color: "#fff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {vieSocialePage.events?.[2]?.button}
                </button>
              </div>
            </div>
          </div>
          {/* Galerie photos */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <i
              data-lucide="image"
              style={{ width: 16, height: 16, color: "#64748b" }}
            />
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>
              {vieSocialePage.galleryTitle}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 8,
            }}
          >
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src={vieSocialePage.gallery?.[0]?.src}
                alt={vieSocialePage.gallery?.[0]?.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src={vieSocialePage.gallery?.[1]?.src}
                alt={vieSocialePage.gallery?.[1]?.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src={vieSocialePage.gallery?.[2]?.src}
                alt={vieSocialePage.gallery?.[2]?.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src={vieSocialePage.gallery?.[3]?.src}
                alt={vieSocialePage.gallery?.[3]?.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src={vieSocialePage.gallery?.[4]?.src}
                alt={vieSocialePage.gallery?.[4]?.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src={vieSocialePage.gallery?.[5]?.src}
                alt={vieSocialePage.gallery?.[5]?.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
              }}
              onMouseOver={(event) =>
                runLegacyHandler(event, "this.style.opacity='0.88'")
              }
              onMouseOut={(event) =>
                runLegacyHandler(event, "this.style.opacity='1'")
              }
            >
              <img
                src={vieSocialePage.gallery?.[6]?.src}
                alt={vieSocialePage.gallery?.[6]?.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(event) =>
                  runLegacyHandler(
                    event,
                    "this.src='images/intranet/slider1.png'",
                  )
                }
              />
            </div>
            <div
              style={{
                aspectRatio: 1,
                background: "#f8fafc",
                border: "2px dashed #e2e8f0",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: 4,
              }}
            >
              <i
                data-lucide="plus-circle"
                style={{ width: 24, height: 24, color: "#94a3b8" }}
              />
              <span style={{ fontSize: 11, color: "#94a3b8" }}>
                Voir tout
              </span>
            </div>
          </div>
        </div>
        {/* TAB: ACTIVITÉS (Vie Sociale) */}
        <div
          id="page-rh-activites"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginBottom: 20,
            }}
          >
            {activitesPage.intro}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 16,
            }}
          >
            <div
              className="doc-card"
              style={{ cursor: "pointer", border: "1px dashed #e2e8f0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#fdf2f8",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    data-lucide="heart"
                    style={{ width: 18, height: 18, color: "#db2777" }}
                  />
                </div>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {activitesPage.items?.[0]?.title}
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                {activitesPage.items?.[0]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#db2777", fontWeight: 600 }}>
                  {activitesPage.items?.[0]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ cursor: "pointer", border: "1px dashed #e2e8f0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#eff6ff",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    data-lucide="trophy"
                    style={{ width: 18, height: 18, color: "#3b82f6" }}
                  />
                </div>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {activitesPage.items?.[1]?.title}
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                {activitesPage.items?.[1]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  {activitesPage.items?.[1]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
            <div
              className="doc-card"
              style={{ cursor: "pointer", border: "1px dashed #e2e8f0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#fef3c7",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    data-lucide="coffee"
                    style={{ width: 18, height: 18, color: "#d97706" }}
                  />
                </div>
                <div
                  style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}
                >
                  {activitesPage.items?.[2]?.title}
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                {activitesPage.items?.[2]?.description}
              </p>
              <div className="doc-card-meta">
                <span style={{ color: "#d97706", fontWeight: 600 }}>
                  {activitesPage.items?.[2]?.action}
                </span>
                <i data-lucide="arrow-right" style={{ width: 16 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* VIE SOCIALE VIEW */}
    </>
  );
}

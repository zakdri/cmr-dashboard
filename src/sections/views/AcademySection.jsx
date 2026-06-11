import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getAcademyData() {
  return {
    header: window.CMR_DATA?.data?.academyHeader || {},
    tabs: window.CMR_DATA?.data?.academyTabs || [],
    catalogue: window.CMR_DATA?.data?.academyCatalogue || [],
    formations: window.CMR_DATA?.data?.academyFormations || [],
    certificats: window.CMR_DATA?.data?.academyCertificats || []
  };
}

export default function AcademySection() {
  const { header, tabs, catalogue, formations, certificats } = getAcademyData();

  return (
    <>
      <div id="view-academy" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 30,
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: 0,
          }}
        >
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`km-nav-item${index === 0 ? " active" : ""}`}
              onClick={(event) =>
                runLegacyHandler(event, `switchAcademyPageTab('${tab.id}')`)
              }
            >
              {tab.label}
            </div>
          ))}
        </div>
        {/* TAB: CATALOGUE */}
        <div
          id="page-academy-catalogue"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div className="km-grid">
            {catalogue.map((item) => (
              <div className="doc-card" key={item.title}>
                <div className="doc-icon-large" style={item.iconStyle}>
                  <i
                    data-lucide={item.icon}
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <div className="doc-card-title">{item.title}</div>
                <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                  {item.description}
                </p>
                <div className="doc-card-meta">
                  <span>{item.meta}</span>
                  <i data-lucide="chevron-right" style={{ width: 16 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* TAB: MES FORMATIONS */}
        <div
          id="page-academy-formations"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid">
            {formations.map((formation) => (
              <div className="doc-card" key={formation.title}>
                <div className="doc-icon-large" style={formation.iconStyle}>
                  <i
                    data-lucide={formation.icon}
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <div className="doc-card-title">{formation.title}</div>
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      marginBottom: 4,
                    }}
                  >
                    <span>{formation.progressLabel}</span>
                    <span>{formation.progress}</span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "#f1f5f9",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: formation.progress,
                        height: "100%",
                        background: formation.progressColor,
                      }}
                    />
                  </div>
                </div>
                <div className="doc-card-meta">
                  <span style={formation.statusStyle}>{formation.status}</span>
                  <button
                    style={{
                      background: "#eff6ff",
                      color: "#3b82f6",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {formation.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* TAB: MES CERTIFICATS */}
        <div
          id="page-academy-certificats"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="km-grid">
            {certificats.map((certificat) => (
              <div className="doc-card" key={certificat.title}>
                <div className="doc-icon-large" style={certificat.iconStyle}>
                  <i
                    data-lucide={certificat.icon}
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <div className="doc-card-title">{certificat.title}</div>
                <div className="doc-card-meta">
                  <span>{certificat.meta}</span>
                  <i
                    data-lucide="download"
                    style={{ width: 16, color: "#94a3b8" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ACADEMY VIEW */}
    </>
  );
}

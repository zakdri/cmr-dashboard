import React from "react";

function getSitdData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.sitdHeader || {},
  };
}

export default function SitdSection() {
  const { header } = getSitdData();

  return (
    <>
      <div id="view-sitd" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="sitdMainNavbar"
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
          id="sitdSectionSummary"
          style={{
            color: "var(--text-light)",
            fontSize: 13,
            lineHeight: 1.7,
            marginBottom: 12,
          }}
        ></div>
        <div
          className="km-navbar"
          id="sitdSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 24,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>
        <div id="sitdPageHost" />
      </div>
      {/* ARC VIEW (table conforme — onglet 16. Audit, Risque & Conformité) */}
    </>
  );
}

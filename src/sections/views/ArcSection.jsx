import React from "react";

function getArcData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.arcHeader || {},
    accessControl: data.arcAccessControl || {},
  };
}

export default function ArcSection() {
  const { header, accessControl } = getArcData();

  return (
    <>
      <div id="view-arc" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        {accessControl.description ? (
          <div className="arc-access-note">
            <strong>{accessControl.scope} - {accessControl.level}</strong>
            <p style={{ color: "var(--text-light)", marginTop: 6 }}>{accessControl.description}</p>
          </div>
        ) : null}
        <div
          className="km-navbar"
          id="arcMainNavbar"
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
          id="arcSubNavbar"
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
        <div id="arcPageHost" />
      </div>
      {/* ADMINISTRATION VIEW */}
    </>
  );
}

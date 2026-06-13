import React from "react";

function getProjetsData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.projetsHeader || {},
    items: data.projetsItems || [],
  };
}

export default function ProjetsSection() {
  const { header, items } = getProjetsData();

  return (
    <>
      <div id="view-projets" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div className="km-grid">
          {items.map((project) => (
            <div className="doc-card" key={project.id}>
              <div className="doc-icon-large" style={project.iconStyle}>
                <i data-lucide={project.icon} style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">{project.title}</div>
              <p style={{ fontSize: 13, marginTop: 8 }}>{project.description}</p>
              <div
                style={{
                  height: 6,
                  background: "#f1f5f9",
                  borderRadius: 3,
                  overflow: "hidden",
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    width: `${project.progress}%`,
                    height: "100%",
                    background: project.progressColor,
                  }}
                />
              </div>
              <div className="doc-card-meta">
                <span style={{ fontWeight: 600 }}>{project.status}</span>
                <span>
                  Progression: {project.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* DOCUMENTAIRES VIEW */}
    </>
  );
}

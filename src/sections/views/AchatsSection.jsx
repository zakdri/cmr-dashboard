import React from "react";

function getAchatsData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.achatsHeader || {},
    cards: data.achatsCards || [],
  };
}

export default function AchatsSection() {
  const { header, cards } = getAchatsData();

  return (
    <>
      <div id="view-achats" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div className="km-grid">
          {cards.map((card) => (
            <div className="doc-card" style={{ cursor: "pointer" }} key={card.title}>
              <div className="doc-icon-large" style={card.iconStyle}>
                <i data-lucide={card.icon} style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">{card.title}</div>
              <div className="doc-card-meta">
                <span>{card.meta}</span>
                <i data-lucide={card.actionIcon} style={{ width: 16 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

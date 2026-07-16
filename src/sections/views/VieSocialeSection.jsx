import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getVieSocialeData() {
  return {
    header: window.CMR_DATA?.data?.vieSocialeHeader || {},
    intro: window.CMR_DATA?.data?.vieSocialeIntro || "",
    eventsTitle: window.CMR_DATA?.data?.vieSocialeEventsTitle || "",
    events: window.CMR_DATA?.data?.vieSocialeEvents || [],
    galleryTitle: window.CMR_DATA?.data?.vieSocialeGalleryTitle || "",
    gallery: window.CMR_DATA?.data?.vieSocialeGallery || []
  };
}

export default function VieSocialeSection() {
  const {
    header,
    intro,
    eventsTitle,
    events,
    galleryTitle,
    gallery
  } = getVieSocialeData();

  return (
    <>
      <div id="view-vie-sociale" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <p
          style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}
        >
          {intro}
        </p>
        {/* Feed événements */}
        <div className="app-category-title" style={{ marginBottom: 16 }}>
          {eventsTitle}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 32,
          }}
        >
          {events.map((eventItem) => (
            <div
              key={eventItem.title}
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
                  background: eventItem.dateBackground,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                  {eventItem.day}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {eventItem.month}
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
                    {eventItem.title}
                  </div>
                  <span
                    style={{
                      background: eventItem.tagStyle?.background,
                      color: eventItem.tagStyle?.color,
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {eventItem.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  {eventItem.meta}
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                  {eventItem.description}
                </div>
                {eventItem.button ? (
                  <button
                    style={{
                      marginTop: 12,
                      background: eventItem.buttonBackground,
                      color: "#fff",
                      border: "none",
                      padding: "7px 16px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {eventItem.button}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
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
            {galleryTitle}
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 8,
          }}
        >
          {gallery.map((image) => (
            <div
              key={image.src}
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
                src={image.src}
                alt={image.alt}
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
          ))}
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
      {/* VIE SOCIALE VIEW */}
    </>
  );
}

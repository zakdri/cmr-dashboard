import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { GED_ROOT_PATH, joinGedPath, shouldUseDocumentsApi } from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

const VIE_SOCIALE_GALLERY_PATH = joinGedPath(
  GED_ROOT_PATH,
  "Vie Sociale",
  "Galerie Vie Sociale",
);
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "bmp", "avif", "svg"]);

function EmphasizedText({ text, phrases = [] }) {
  const matchingPhrases = phrases.filter((phrase) => text.includes(phrase));
  if (!matchingPhrases.length) return text;
  const pattern = new RegExp(`(${matchingPhrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, index) =>
    matchingPhrases.includes(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part,
  );
}

function getVieSocialeData() {
  return {
    header: window.CMR_DATA?.data?.vieSocialeHeader || {},
    bienEtre: window.CMR_DATA?.data?.bienEtre || {},
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
    bienEtre,
    intro,
    eventsTitle,
    events,
    galleryTitle,
    gallery: staticGallery
  } = getVieSocialeData();
  const [activeRubric, setActiveRubric] = useState("bien-etre");
  const [introExpanded, setIntroExpanded] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);
  const isViewActive = useViewActive("vie-sociale");
  const galleryState = useGedDocuments(VIE_SOCIALE_GALLERY_PATH, { enabled: isViewActive });
  const gedGallery = galleryState.documents
    .filter((item) => IMAGE_EXTENSIONS.has((item.fileName || item.title || "").split(".").pop()?.toLowerCase()))
    .map((item) => ({
      src: item.file,
      alt: item.title || item.fileName || "Photo Vie Sociale",
      id: item.protocolUri || item.fileName,
    }));
  const gallery = shouldUseDocumentsApi() ? gedGallery : staticGallery;
  const previewImage = Number.isInteger(previewIndex) ? gallery[previewIndex] : null;
  const showPreviousImage = () => setPreviewIndex((current) => (current - 1 + gallery.length) % gallery.length);
  const showNextImage = () => setPreviewIndex((current) => (current + 1) % gallery.length);

  useEffect(() => {
    window.lucide?.createIcons();
  }, [introExpanded]);

  useEffect(() => {
    if (!previewImage) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setPreviewIndex(null);
      if (event.key === "ArrowLeft" && gallery.length > 1) showPreviousImage();
      if (event.key === "ArrowRight" && gallery.length > 1) showNextImage();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.lucide?.createIcons();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewImage, gallery.length]);

  useEffect(() => {
    if (Number.isInteger(previewIndex) && previewIndex >= gallery.length) setPreviewIndex(null);
  }, [gallery.length, previewIndex]);

  return (
    <>
      <div id="view-vie-sociale" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <nav className="vie-sociale-tabs" aria-label="Rubriques Bien être et Vie sociale">
          <button
            type="button"
            className={activeRubric === "bien-etre" ? "active" : ""}
            onClick={() => setActiveRubric("bien-etre")}
          >
            Bien être
          </button>
          <button
            type="button"
            className={activeRubric === "vie-sociale" ? "active" : ""}
            onClick={() => setActiveRubric("vie-sociale")}
          >
            Vie sociale
          </button>
        </nav>
        {activeRubric === "bien-etre" ? (
          <section className="bien-etre-section" aria-labelledby="bienEtreTitle">
            <div className="bien-etre-heading">
              <h3 id="bienEtreTitle">{bienEtre.title}</h3>
              <p>{bienEtre.description}</p>
            </div>
            <div className="bien-etre-grid">
              {(bienEtre.blocks || []).map((block) => (
                <article className="bien-etre-card" key={block.title}>
                  <span className={`bien-etre-card-icon ${block.iconClass || "blue"}`}>
                    <i data-lucide={block.icon} aria-hidden="true" />
                  </span>
                  <h4>{block.title}</h4>
                  <i className="bien-etre-card-arrow" data-lucide="chevron-right" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>
        ) : (
          <>
        <section className={`vie-sociale-intro${introExpanded ? " expanded" : ""}`}>
          <button
            type="button"
            className="vie-sociale-intro-toggle"
            aria-expanded={introExpanded}
            aria-controls="vieSocialeIntroContent"
            onClick={() => setIntroExpanded((expanded) => !expanded)}
          >
            <span>{intro.title}</span>
            <i data-lucide={introExpanded ? "chevron-down" : "chevron-right"} aria-hidden="true" />
          </button>
          {introExpanded ? (
            <div id="vieSocialeIntroContent" className="vie-sociale-intro-content">
              {(intro.paragraphs || []).map((paragraph) => (
                <p key={paragraph}><EmphasizedText text={paragraph} phrases={intro.emphasis} /></p>
              ))}
              <p className="vie-sociale-intro-highlight">{intro.highlight}</p>
            </div>
          ) : null}
        </section>
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
          {shouldUseDocumentsApi() && galleryState.loading ? (
            <p className="empty-state">Chargement des images...</p>
          ) : null}
          {shouldUseDocumentsApi() && galleryState.error ? (
            <p className="empty-state">Les images de la GED ne sont pas disponibles pour le moment.</p>
          ) : null}
          {gallery.map((image, index) => (
            <button
              type="button"
              key={image.id || image.src}
              aria-label={`Agrandir ${image.alt || "la photo"}`}
              onClick={() => setPreviewIndex(index)}
              style={{
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#e2e8f0",
                border: 0,
                padding: 0,
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
            </button>
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
          </>
        )}
      </div>
      {previewImage ? createPortal(
        <div
          className="communication-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Aperçu de ${previewImage.alt || "la photo"}`}
          onClick={() => setPreviewIndex(null)}
        >
          <div className="communication-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="communication-lightbox-header">
              <div>
                <strong>{previewImage.alt}</strong>
                <span>{previewIndex + 1} / {gallery.length}</span>
              </div>
              <button type="button" className="communication-lightbox-close" onClick={() => setPreviewIndex(null)} aria-label="Fermer l’aperçu">
                <i data-lucide="x" />
              </button>
            </div>
            <div className="communication-lightbox-stage">
              {gallery.length > 1 ? (
                <button type="button" className="communication-lightbox-arrow previous" onClick={showPreviousImage} aria-label="Photo précédente">
                  <i data-lucide="chevron-left" />
                </button>
              ) : null}
              <img src={previewImage.src} alt={previewImage.alt || "Photo Vie Sociale"} />
              {gallery.length > 1 ? (
                <button type="button" className="communication-lightbox-arrow next" onClick={showNextImage} aria-label="Photo suivante">
                  <i data-lucide="chevron-right" />
                </button>
              ) : null}
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
      {/* VIE SOCIALE VIEW */}
    </>
  );
}

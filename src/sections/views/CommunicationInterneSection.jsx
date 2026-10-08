import React, { useEffect, useMemo, useState } from "react";
import DocumentTypeIcon from "../../components/DocumentTypeIcon.jsx";
import PaginatedDocuments from "../../components/PaginatedDocuments.jsx";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { GED_ROOT_PATH, joinGedPath, normalizeGedKey, shouldUseDocumentsApi } from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

const mediaThumbnails = [
  "images/intranet/news_board.jpg",
  "images/intranet/news_contract.jpg",
  "images/intranet/news_academy.jpg",
  "images/intranet/slider1.png",
];

const communicationGedPathMap = {
  recrutement: "Recrutement",
  "notes-service": "Notes de service",
  "notes-juridiques": "Notes & Prises de position juridiques",
  chartes: "Chartes éditoriales",
};

function getCommunicationData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.communicationInterneHeader || {},
    sections: data.communicationInterneSections || [],
    newsItems: data.cmrNewsItems || [],
    mediaImages: data.mediaImages || [],
    mediaVideos: data.mediaVideos || [],
  };
}

function ContentRow({ item, onActivate }) {
  const title = item.title || item.fileName;
  const meta = [item.date, item.meta || item.folderLabel || item.fileName].filter(Boolean).join(" · ");
  const isActionable = Boolean(item.file || onActivate);
  const Row = isActionable ? "button" : "div";

  return (
    <Row
      type={isActionable ? "button" : undefined}
      className="doc-item"
      onClick={onActivate || (item.file ? (event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(item.file)},${JSON.stringify(title)})`) : undefined)}
    >
      <DocumentTypeIcon documentItem={item} size="compact" />
      <div className="doc-info">
        <div className="doc-title">{title}</div>
        <div className="doc-meta">{meta}</div>
      </div>
      {isActionable ? <i data-lucide="chevron-right" /> : null}
    </Row>
  );
}

function GedStatus({ state }) {
  if (!shouldUseDocumentsApi()) return null;
  if (state.loading) return <p className="empty-state">Chargement des documents Moovapps...</p>;
  if (state.error) return <p className="empty-state">Les documents Moovapps ne sont pas disponibles pour le moment.</p>;
  return null;
}

function gedTopFolder(item) {
  return item?.segments?.[0] || String(item?.folderLabel || "").split("/")[0] || "";
}

function gedYear(item) {
  const candidates = [item?.year, gedTopFolder(item)];
  return String(candidates.find((value) => /^\d{4}$/.test(String(value || "").trim())) || "").trim();
}

function MediaGallery({ items, type, query, state }) {
  const [previewIndex, setPreviewIndex] = useState(null);
  const term = query.trim().toLowerCase();
  const visible = items.filter((item) => [item.title, item.category, item.date].join(" ").toLowerCase().includes(term));
  const previewItem = Number.isInteger(previewIndex) ? visible[previewIndex] : null;
  const showPrevious = () => setPreviewIndex((current) => (current - 1 + visible.length) % visible.length);
  const showNext = () => setPreviewIndex((current) => (current + 1) % visible.length);

  useEffect(() => {
    setPreviewIndex(null);
  }, [query, type]);

  useEffect(() => {
    if (!previewItem) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setPreviewIndex(null);
      if (event.key === "ArrowLeft" && visible.length > 1) showPrevious();
      if (event.key === "ArrowRight" && visible.length > 1) showNext();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.lucide?.createIcons();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewItem, visible.length]);

  return (
    <>
      <div className="communication-media-grid">
        <GedStatus state={state} />
        <PaginatedDocuments items={visible} resetKey={`${type}:${query}`}>
          {(visibleMedia) => visibleMedia.map((item, index) => {
            const itemIndex = visible.indexOf(item);
            return (
              <article className="communication-media-card" key={item.id || item.protocolUri || item.fileName}>
                {item.mediaKind === "video" ? (
                  <video controls preload="metadata" src={item.file} />
                ) : (
                  <button
                    type="button"
                    className="communication-media-preview-trigger"
                    onClick={() => setPreviewIndex(itemIndex)}
                    aria-label={`Agrandir ${item.title || "la photo"}`}
                  >
                    <img src={item.file || mediaThumbnails[index % mediaThumbnails.length]} alt={item.title || ""} loading="lazy" />
                  </button>
                )}
                <div>
                  <span>{type}</span>
                  <h4>{item.title}</h4>
                  <p>{item.category} · {item.date}</p>
                  {item.mediaKind === "video" ? (
                    <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(item.file)},${JSON.stringify(item.title)})`)}>
                      <i data-lucide="play" />
                      Consulter
                    </button>
                  ) : (
                    <button className="secondary-btn" onClick={() => setPreviewIndex(itemIndex)}>
                      <i data-lucide="maximize-2" />
                      Aperçu
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </PaginatedDocuments>
        {!state.loading && !visible.length ? <p className="empty-state">Aucun média trouvé.</p> : null}
      </div>
      {previewItem ? (
        <div className="communication-lightbox" role="dialog" aria-modal="true" aria-label={`Aperçu de ${previewItem.title || "la photo"}`} onClick={() => setPreviewIndex(null)}>
          <div className="communication-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="communication-lightbox-header">
              <div>
                <strong>{previewItem.title}</strong>
                <span>{previewIndex + 1} / {visible.length}</span>
              </div>
              <button type="button" className="communication-lightbox-close" onClick={() => setPreviewIndex(null)} aria-label="Fermer l'aperçu">
                <i data-lucide="x" />
              </button>
            </div>
            <div className="communication-lightbox-stage">
              {visible.length > 1 ? (
                <button type="button" className="communication-lightbox-arrow previous" onClick={showPrevious} aria-label="Photo précédente">
                  <i data-lucide="chevron-left" />
                </button>
              ) : null}
              <img src={previewItem.file} alt={previewItem.title || "Photo"} />
              {visible.length > 1 ? (
                <button type="button" className="communication-lightbox-arrow next" onClick={showNext} aria-label="Photo suivante">
                  <i data-lucide="chevron-right" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function CommunicationInterneSection() {
  const { header, sections, newsItems, mediaImages, mediaVideos } = getCommunicationData();
  const [activeArea, setActiveArea] = useState("communication");
  const [detailId, setDetailId] = useState("");
  const [year, setYear] = useState("Tous");
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState("photos");
  const [folder, setFolder] = useState("");
  const isViewActive = useViewActive("communication-interne");
  const detail = sections.find((section) => section.id === detailId);
  const detailGedPath = detail
    ? joinGedPath(GED_ROOT_PATH, "Communication interne", "Communication interne", communicationGedPathMap[detail.id] || detail.title)
    : GED_ROOT_PATH;
  const overviewGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Communication interne", "Communication interne"), { enabled: isViewActive && activeArea === "communication" && !detail });
  const detailGedState = useGedDocuments(detailGedPath, { enabled: isViewActive && activeArea === "communication" && Boolean(detail) });
  const photoGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Communication interne", "Médiathèque", "Photothèque"), { enabled: isViewActive && activeArea === "media" });
  const videoGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Communication interne", "Médiathèque", "Vidéothèque"), { enabled: isViewActive && activeArea === "media" });
  const usesEditorialItems = detail?.id === "flash-info";
  const detailSourceItems = shouldUseDocumentsApi() && !usesEditorialItems ? detailGedState.documents : detail?.items || [];
  const years = useMemo(() => {
    const fallbackYears = (detail?.items || []).map((item) => item.year);
    const gedFolderYears = (detailGedState.folders || []).map(gedYear);
    const gedDocumentYears = (detailGedState.documents || []).map(gedYear);
    const sourceYears = shouldUseDocumentsApi() && detail?.filterByYear
      ? [...gedFolderYears, ...gedDocumentYears]
      : fallbackYears;
    const uniqueYears = Array.from(new Set(sourceYears.filter((item) => /^\d{4}$/.test(String(item || "")))))
      .sort((left, right) => Number(left) - Number(right));
    return ["Tous", ...uniqueYears];
  }, [detail, detailGedState.documents, detailGedState.folders]);
  const detailItems = detailSourceItems.filter((item) => {
    const term = query.trim().toLowerCase();
    const haystack = [item.title, item.meta, item.date, item.fileName, item.folderLabel].join(" ").toLowerCase();
    const documentFolder = gedTopFolder(item);
    const matchesFolder = !detail?.folderFilters || !folder || normalizeGedKey(documentFolder) === normalizeGedKey(folder);
    const matchesYear = !detail?.filterByYear || year === "Tous" || gedYear(item) === year;
    return matchesFolder && matchesYear && (!term || haystack.includes(term));
  });
  const imageExtensions = new Set(["jpg", "jpeg", "png", "gif", "webp", "bmp", "avif", "svg"]);
  const videoExtensions = new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]);
  const mapMedia = (item, mediaKind) => ({
    ...item,
    mediaKind,
    category: item.segments?.[0] || item.folderLabel || (mediaKind === "video" ? "Vidéothèque" : "Photothèque"),
    date: item.updatedAt || item.createdAt || "",
  });
  const apiImages = photoGedState.documents
    .filter((item) => imageExtensions.has((item.fileName || item.title || "").split(".").pop()?.toLowerCase()))
    .map((item) => mapMedia(item, "image"));
  const apiVideos = videoGedState.documents
    .filter((item) => videoExtensions.has((item.fileName || item.title || "").split(".").pop()?.toLowerCase()))
    .map((item) => mapMedia(item, "video"));
  const visibleMediaImages = shouldUseDocumentsApi() ? apiImages : mediaImages;
  const visibleMediaVideos = shouldUseDocumentsApi() ? apiVideos : mediaVideos;
  const flashRow = (item) => {
    const newsItem = newsItems.find((candidate) => normalizeGedKey(candidate.text) === normalizeGedKey(item.title || item.fileName));
    return (
      <ContentRow
        item={item}
        key={item.id || item.fileName || item.title}
        onActivate={newsItem ? (event) => runLegacyHandler(event, `openCommFlashDetail(${JSON.stringify(newsItem.id)})`) : undefined}
      />
    );
  };

  useEffect(() => {
    window.lucide?.createIcons();
  }, [activeArea, detailId, year, query, mediaType, folder, detailGedState, overviewGedState]);

  useEffect(() => {
    if (detail?.filterByYear && !years.includes(year)) setYear("Tous");
  }, [detail, year, years]);

  return (
    <div id="view-communication-interne" className="view-section km-container">
      <div className="km-header"><h2>{header.title}</h2><p>{header.description}</p></div>
      <div className="km-navbar communication-main-navbar">
        <button type="button" className={`km-nav-item${activeArea === "communication" ? " active" : ""}`} onClick={() => { setActiveArea("communication"); setDetailId(""); }}>Communication Interne</button>
        <span className="km-nav-separator">|</span>
        <button type="button" className={`km-nav-item${activeArea === "media" ? " active" : ""}`} onClick={() => setActiveArea("media")}>Médiathèque</button>
      </div>

      {activeArea === "communication" && !detail ? (
        <>
          <p className="section-intro">Retrouvez les recrutements, notes de service, prises de position, Flash Info et chartes éditoriales publiés par les entités responsables.</p>
          <div className="communication-block-grid">
            {sections.map((section) => (
              <section className="content-card communication-block" key={section.id}>
                <div className="card-header">
                  <div className="card-title"><div className={`card-icon ${section.iconClass}`}><i data-lucide={section.icon} /></div>{section.title}</div>
                  {section.status ? <span className="status-badge">{section.status}</span> : <button className="card-action" onClick={() => { setDetailId(section.id); setFolder(""); setYear("Tous"); setQuery(""); }}>Voir plus<i data-lucide="arrow-right" /></button>}
                </div>
                <p>{section.description}</p>
                  <div className="doc-list">
                    {(() => {
                      const folder = communicationGedPathMap[section.id] || section.title;
                      const previewItems = shouldUseDocumentsApi() && section.id !== "flash-info"
                        ? overviewGedState.documents.filter((doc) => normalizeGedKey(doc.segments?.[0]) === normalizeGedKey(folder)).slice(0, 3)
                        : (section.items || []).slice(0, section.id === "flash-info" ? 4 : 3);
                      if (overviewGedState.loading && shouldUseDocumentsApi()) return <p className="empty-state">Chargement...</p>;
                      if (section.id === "chartes") {
                        if (overviewGedState.error && shouldUseDocumentsApi()) return <GedStatus state={overviewGedState} />;
                        if (!previewItems.length) return <p className="empty-state">Aucun document trouvé.</p>;
                      }
                      return previewItems.map((item) => section.id === "flash-info" ? flashRow(item) : <ContentRow item={item} key={item.id || item.fileName || item.title} />);
                    })()}
                  </div>
              </section>
            ))}
          </div>
        </>
      ) : null}

      {activeArea === "communication" && detail ? (
        <div className="content-card communication-detail-page">
          <div className="communication-detail-header">
            <button className="secondary-btn" onClick={() => { setDetailId(""); setQuery(""); setYear("Tous"); setFolder(""); }}><i data-lucide="arrow-left" />Retour</button>
            <div><h3>{detail.title}</h3><p>{detail.description}</p></div>
          </div>
            <>
              <div className="communication-filter-row">
                {detail.folderFilters ? (
                  <div className="communication-folder-filters" role="group" aria-label="Dossiers de recrutement">
                    {["", ...detail.folderFilters].map((name) => (
                      <button type="button" className={`filter-pill${folder === name ? " active" : ""}`} aria-pressed={folder === name} key={name} onClick={() => setFolder(name)}>
                        <i data-lucide={name ? "folder" : "folders"} aria-hidden="true" />
                        <span>{name || "Tous"}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
                {detail.filterByYear ? <div className="academy-horizontal-filter">{years.map((item) => <button className={`filter-pill${year === item ? " active" : ""}`} key={item} onClick={() => setYear(item)}>{item}</button>)}</div> : null}
                <div className="section-search-row"><i data-lucide="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Rechercher dans ${detail.title.toLowerCase()}...`} /></div>
              </div>
              <GedStatus state={detailGedState} />
              <div className="doc-list communication-full-list">
                <PaginatedDocuments items={detailItems} resetKey={`${detail.id}:${year}:${folder}:${query}`}>
                  {(visibleItems) => visibleItems.map((item) => detail.id === "flash-info" ? flashRow(item) : <ContentRow item={item} key={item.id || item.fileName || item.title} />)}
                </PaginatedDocuments>
                {!detailGedState.loading && !detailGedState.error && !detailItems.length ? <p className="empty-state">Aucun contenu trouvé.</p> : null}
              </div>
            </>
        </div>
      ) : null}

      {activeArea === "media" ? (
        <div>
          <p className="section-intro">La Médiathèque de Communication Interne regroupe la Photothèque et la Vidéothèque de la CMR.</p>
          <div className="academy-horizontal-filter">
            <button className={`filter-pill${mediaType === "photos" ? " active" : ""}`} onClick={() => setMediaType("photos")}>Photothèque</button>
            <button className={`filter-pill${mediaType === "videos" ? " active" : ""}`} onClick={() => setMediaType("videos")}>Vidéothèque</button>
          </div>
          <div className="section-search-row communication-media-search"><i data-lucide="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un média..." /></div>
          <MediaGallery
            items={mediaType === "photos" ? visibleMediaImages : visibleMediaVideos}
            type={mediaType === "photos" ? "Photo" : "Vidéo"}
            query={query}
            state={mediaType === "photos" ? photoGedState : videoGedState}
          />
        </div>
      ) : null}
    </div>
  );
}

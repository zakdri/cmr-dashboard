import React, { useEffect, useMemo, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { GED_ROOT_PATH, joinGedPath, shouldUseDocumentsApi } from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

const mediaThumbnails = [
  "images/intranet/news_board.jpg",
  "images/intranet/news_contract.jpg",
  "images/intranet/news_academy.jpg",
  "images/intranet/slider1.png",
];

const communicationGedPathMap = {
  recrutements: "Recrutement",
  notes: "Notes de service",
  juridique: "Notes & Prises de position juridiques",
};

function getCommunicationData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.communicationInterneHeader || {},
    sections: data.communicationInterneSections || [],
    mediaImages: data.mediaImages || [],
    mediaVideos: data.mediaVideos || [],
  };
}

function ContentRow({ item }) {
  const title = item.title || item.fileName;
  const kind = (item.kind || item.extension || "DOC").toUpperCase();
  const meta = [item.date, item.meta || item.folderLabel || item.fileName].filter(Boolean).join(" · ");

  return (
    <button
      type="button"
      className="doc-item"
      onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(item.file || title)},${JSON.stringify(title)})`)}
    >
      <div className={`doc-icon${kind === "PDF" ? " pdf" : ""}`} style={kind === "PDF" ? undefined : { background: "#eff6ff", color: "#256cb5" }}>
        {kind}
      </div>
      <div className="doc-info">
        <div className="doc-title">{title}</div>
        <div className="doc-meta">{meta}</div>
      </div>
      <i data-lucide="chevron-right" />
    </button>
  );
}

function GedStatus({ state }) {
  if (!shouldUseDocumentsApi()) return null;
  if (state.loading) return <p className="empty-state">Chargement des documents Moovapps...</p>;
  if (state.error) return <p className="empty-state">Les documents Moovapps ne sont pas disponibles pour le moment.</p>;
  return null;
}

function MediaGallery({ items, type, query }) {
  const term = query.trim().toLowerCase();
  const visible = items.filter((item) => [item.title, item.category, item.date].join(" ").toLowerCase().includes(term));

  return (
    <div className="communication-media-grid">
      {visible.map((item, index) => (
        <article className="communication-media-card" key={item.id}>
          <img src={mediaThumbnails[index % mediaThumbnails.length]} alt="" />
          <div>
            <span>{type}</span>
            <h4>{item.title}</h4>
            <p>{item.category} · {item.date}</p>
            <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(item.file)},${JSON.stringify(item.title)})`)}>
              <i data-lucide={type === "Vidéo" ? "play" : "eye"} />
              Consulter
            </button>
          </div>
        </article>
      ))}
      {!visible.length ? <p className="empty-state">Aucun média trouvé.</p> : null}
    </div>
  );
}

export default function CommunicationInterneSection() {
  const { header, sections, mediaImages, mediaVideos } = getCommunicationData();
  const [activeArea, setActiveArea] = useState("communication");
  const [detailId, setDetailId] = useState("");
  const [year, setYear] = useState("Tous");
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState("photos");
  const [charter, setCharter] = useState({ title: "Flash institutionnel", tone: "Institutionnel", accent: "Bleu CMR" });
  const isViewActive = useViewActive("communication-interne");
  const detail = sections.find((section) => section.id === detailId);
  const detailGedPath = detail
    ? joinGedPath(GED_ROOT_PATH, "Communication interne", "Communication interne", communicationGedPathMap[detail.id] || detail.title)
    : GED_ROOT_PATH;
  const overviewGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Communication interne", "Communication interne"), { enabled: isViewActive && activeArea === "communication" && !detail });
  const detailGedState = useGedDocuments(detailGedPath, { enabled: isViewActive && activeArea === "communication" && Boolean(detail) && detail.id !== "chartes" });
  const years = useMemo(() => ["Tous", ...Array.from(new Set((detail?.items || []).map((item) => item.year)))], [detail]);
  const detailSourceItems = shouldUseDocumentsApi() && detail?.id !== "chartes" && !detailGedState.error ? detailGedState.documents : detail?.items || [];
  const detailItems = detailSourceItems.filter((item) => {
    const term = query.trim().toLowerCase();
    const haystack = [item.title, item.meta, item.date, item.fileName, item.folderLabel].join(" ").toLowerCase();
    return (year === "Tous" || item.year === year) && (!term || haystack.includes(term));
  });

  useEffect(() => {
    window.lucide?.createIcons();
  }, [activeArea, detailId, year, query, mediaType, charter, detailGedState]);

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
                  {section.status ? <span className="status-badge">{section.status}</span> : <button className="card-action" onClick={() => setDetailId(section.id)}>Voir plus<i data-lucide="arrow-right" /></button>}
                </div>
                <p>{section.description}</p>
                {section.id === "chartes" ? (
                  <div className="charter-mini-preview" style={{ borderColor: charter.accent === "Vert" ? "#16a34a" : "#256cb5" }}><strong>{charter.title}</strong><span>{charter.tone}</span></div>
                ) : (
                  <div className="doc-list">
                    {(() => {
                      const folder = communicationGedPathMap[section.id] || section.title;
                      const previewItems = shouldUseDocumentsApi() && !overviewGedState.error
                        ? overviewGedState.documents.filter((doc) => doc.segments?.[0] === folder).slice(0, 3)
                        : (section.items || []).slice(0, 3);
                      if (overviewGedState.loading && shouldUseDocumentsApi()) return <p className="empty-state">Chargement...</p>;
                      return previewItems.map((item) => <ContentRow item={item} key={item.id || item.fileName || item.title} />);
                    })()}
                  </div>
                )}
              </section>
            ))}
          </div>
        </>
      ) : null}

      {activeArea === "communication" && detail ? (
        <div className="content-card communication-detail-page">
          <div className="communication-detail-header">
            <button className="secondary-btn" onClick={() => { setDetailId(""); setQuery(""); setYear("Tous"); }}><i data-lucide="arrow-left" />Retour</button>
            <div><h3>{detail.title}</h3><p>{detail.description}</p></div>
          </div>
          {detail.id === "chartes" ? (
            <div className="charter-editor-layout">
              <form className="charter-editor">
                <label>Titre de la publication<input value={charter.title} onChange={(event) => setCharter({ ...charter, title: event.target.value })} /></label>
                <label>Tonalité<select value={charter.tone} onChange={(event) => setCharter({ ...charter, tone: event.target.value })}><option>Institutionnel</option><option>Information rapide</option><option>Événementiel</option></select></label>
                <label>Couleur d'accent<select value={charter.accent} onChange={(event) => setCharter({ ...charter, accent: event.target.value })}><option>Bleu CMR</option><option>Vert</option></select></label>
                <button type="button" className="primary-btn">Appliquer à la publication</button>
              </form>
              <div className="charter-publication-preview" style={{ borderTopColor: charter.accent === "Vert" ? "#16a34a" : "#256cb5" }}><span>Aperçu</span><h4>{charter.title}</h4><p>Une mise en forme adaptée à une publication de type {charter.tone.toLowerCase()}.</p></div>
            </div>
          ) : (
            <>
              <div className="communication-filter-row">
                {detail.filterByYear ? <div className="academy-horizontal-filter">{years.map((item) => <button className={`filter-pill${year === item ? " active" : ""}`} key={item} onClick={() => setYear(item)}>{item}</button>)}</div> : null}
                <div className="section-search-row"><i data-lucide="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Rechercher dans ${detail.title.toLowerCase()}...`} /></div>
              </div>
              <GedStatus state={detailGedState} />
              <div className="doc-list communication-full-list">
                {detailItems.map((item) => <ContentRow item={item} key={item.id || item.fileName || item.title} />)}
                {!detailGedState.loading && !detailItems.length ? <p className="empty-state">Aucun contenu trouvé.</p> : null}
              </div>
            </>
          )}
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
          <MediaGallery items={mediaType === "photos" ? mediaImages : mediaVideos} type={mediaType === "photos" ? "Photo" : "Vidéo"} query={query} />
        </div>
      ) : null}
    </div>
  );
}

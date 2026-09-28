import React, { useEffect, useState } from "react";
import PaginatedDocuments from "../../components/PaginatedDocuments.jsx";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import {
  GED_ROOT_PATH,
  filterDocuments,
  joinGedPath,
  normalizeGedKey,
  shouldUseDocumentsApi,
} from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

function getAcademyData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.academyHeader || {},
    tabs: data.academyTabs || [],
    pages: data.academyPages || {},
  };
}

function DocCard({ item }) {
  return (
    <button
      type="button"
      className="doc-card static-card academy-doc-card"
      onClick={item.file ? (event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(item.file)},${JSON.stringify(item.title)})`) : undefined}
    >
      <div className="doc-icon-large" style={{ background: "#eff6ff", color: "#2563eb" }}>
        <i data-lucide={item.icon || "file-text"} style={{ width: 24, height: 24 }} />
      </div>
      <div className="doc-card-title">{item.title}</div>
      {item.description ? <p style={{ fontSize: 12, color: "var(--text-light)" }}>{item.description}</p> : null}
      {item.meta ? <div className="doc-card-meta"><span>{item.meta}</span><i data-lucide="download" style={{ width: 16 }} /></div> : null}
    </button>
  );
}

function AcademyImageItem({ item, className = "", onPreview }) {
  const image = <img src={item.file} alt={item.title || item.fileName || "Image"} />;
  return (
    <figure className={`academy-content-media${className ? ` ${className}` : ""}`}>
      {onPreview ? (
        <button type="button" className="academy-content-media-trigger" onClick={onPreview} aria-label={`Agrandir ${item.title || item.fileName || "l'image"}`}>
          {image}
        </button>
      ) : image}
      <figcaption>{item.title || item.fileName}</figcaption>
    </figure>
  );
}

function MentoringItem({ item, onPreview }) {
  const isImage = onboardingImagePattern.test(item.fileName || item.title || "");
  if (!isImage) return <DocCard item={item} />;
  return <AcademyImageItem item={item} className="academy-mentoring-media" onPreview={onPreview} />;
}

function AcademyImagePreview({ items, index, onChange, onClose }) {
  const item = Number.isInteger(index) ? items[index] : null;
  const move = (delta) => onChange((index + delta + items.length) % items.length);

  useEffect(() => {
    if (!item) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && items.length > 1) move(-1);
      if (event.key === "ArrowRight" && items.length > 1) move(1);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.lucide?.createIcons();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, items.length]);

  if (!item) return null;
  return (
    <div className="communication-lightbox" role="dialog" aria-modal="true" aria-label={`Aperçu de ${item.title || "l'image"}`} onClick={onClose}>
      <div className="communication-lightbox-panel" onClick={(event) => event.stopPropagation()}>
        <div className="communication-lightbox-header">
          <div><strong>{item.title || item.fileName}</strong><span>{index + 1} / {items.length}</span></div>
          <button type="button" className="communication-lightbox-close" onClick={onClose} aria-label="Fermer l'aperçu"><i data-lucide="x" /></button>
        </div>
        <div className="communication-lightbox-stage">
          {items.length > 1 ? <button type="button" className="communication-lightbox-arrow previous" onClick={() => move(-1)} aria-label="Image précédente"><i data-lucide="chevron-left" /></button> : null}
          <img src={item.file} alt={item.title || item.fileName || "Image Mentorat"} />
          {items.length > 1 ? <button type="button" className="communication-lightbox-arrow next" onClick={() => move(1)} aria-label="Image suivante"><i data-lucide="chevron-right" /></button> : null}
        </div>
      </div>
    </div>
  );
}

function EmptyDocuments({ loading }) {
  return <div style={{ color: "var(--text-light)", fontSize: 13 }}>{loading ? "Chargement des documents..." : "Aucun document."}</div>;
}

const onboardingImagePattern = /\.(?:avif|bmp|gif|jpe?g|png|webp)$/i;
const academyVideoPattern = /\.(?:m4v|mov|mp4|ogv|webm)$/i;

function AcademyMediaSlider({ items }) {
  const [index, setIndex] = useState(0);
  const item = items[index] || items[0];

  useEffect(() => {
    setIndex(0);
  }, [items.map((media) => media.protocolUri || media.file || media.title).join("|")]);

  if (!item) return null;
  const isVideo = academyVideoPattern.test(item.fileName || item.title || item.file || "");
  const move = (delta) => setIndex((current) => (current + delta + items.length) % items.length);

  return (
    <section className="academy-media-slider" aria-label="Médias Level Up">
      <div
        className="academy-media-slider-stage"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" && items.length > 1) move(-1);
          if (event.key === "ArrowRight" && items.length > 1) move(1);
        }}
        aria-live="polite"
      >
        {isVideo ? (
          <video src={item.file} controls preload="metadata" aria-label={item.title || item.fileName} />
        ) : (
          <img src={item.file} alt={item.title || item.fileName || "Média Level Up"} />
        )}
        {items.length > 1 ? (
          <>
            <button type="button" className="academy-media-slider-arrow previous" onClick={() => move(-1)} aria-label="Média précédent">‹</button>
            <button type="button" className="academy-media-slider-arrow next" onClick={() => move(1)} aria-label="Média suivant">›</button>
          </>
        ) : null}
      </div>
      <div className="academy-media-slider-footer">
        <div>
          <strong>{item.title || item.fileName}</strong>
          {item.theme ? <span>{item.theme}</span> : null}
        </div>
        <span>{index + 1} / {items.length}</span>
      </div>
      {items.length > 1 ? (
        <div className="academy-media-slider-thumbnails" aria-label="Tous les médias Level Up">
          {items.map((media, mediaIndex) => {
            const mediaIsVideo = academyVideoPattern.test(media.fileName || media.title || media.file || "");
            return (
              <button
                type="button"
                className={mediaIndex === index ? "active" : ""}
                key={media.protocolUri || media.file || media.title}
                onClick={() => setIndex(mediaIndex)}
                aria-label={`Afficher ${media.title || `le média ${mediaIndex + 1}`}`}
                aria-current={mediaIndex === index ? "true" : undefined}
              >
                {mediaIsVideo
                  ? <span>Vidéo</span>
                  : <img src={media.file} alt="" loading="lazy" />}
              </button>
            );
          })}
        </div>
      ) : null}
      {items.length > 1 ? (
        <div className="academy-media-slider-dots" aria-label="Choisir un média">
          {items.map((media, mediaIndex) => (
            <button
              type="button"
              className={mediaIndex === index ? "active" : ""}
              key={media.protocolUri || media.file || media.title}
              onClick={() => setIndex(mediaIndex)}
              aria-label={`Afficher le média ${mediaIndex + 1}`}
              aria-current={mediaIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function getDocumentSegments(documentItem) {
  if (Array.isArray(documentItem.segments)) return documentItem.segments.filter(Boolean);
  return String(documentItem.folderLabel || "").split("/").filter(Boolean);
}

function isOnboardingDayDocument(documentItem) {
  return getDocumentSegments(documentItem).some(
    (segment) => normalizeGedKey(segment) === "journees onboarding",
  );
}

function buildOnboardingDays(documents) {
  const daysByFolder = new Map();

  documents.forEach((documentItem) => {
    if (!onboardingImagePattern.test(documentItem.fileName || documentItem.title || "")) return;

    const segments = getDocumentSegments(documentItem);
    const daysIndex = segments.findIndex(
      (segment) => normalizeGedKey(segment) === "journees onboarding",
    );
    const folderTitle = segments[daysIndex + 1];
    if (daysIndex < 0 || !folderTitle) return;

    if (!daysByFolder.has(folderTitle)) {
      daysByFolder.set(folderTitle, {
        title: folderTitle,
        description: "Journée d'intégration des nouveaux collaborateurs",
        details: "Journée d'intégration des nouveaux collaborateurs",
        cover: null,
        gallery: [],
      });
    }

    const day = daysByFolder.get(folderTitle);
    const foldersBelowDay = segments.slice(daysIndex + 2);
    const isCover = foldersBelowDay.some(
      (segment) => normalizeGedKey(segment) === "image a la une",
    );

    if (isCover && !day.cover) day.cover = documentItem.file;
    if (foldersBelowDay.length === 0) day.gallery.push(documentItem.file);
  });

  return Array.from(daysByFolder.values())
    .map((day) => ({
      ...day,
      image: day.cover || day.gallery[0] || "",
      gallery: Array.from(new Set(day.gallery)),
    }))
    .sort((left, right) => right.title.localeCompare(left.title, "fr", { numeric: true }));
}

export function FormationPage({ page, documents, loading, apiEnabled, pageId = "page-academy-formation" }) {
  const [query, setQuery] = useState("");
  const workflows = apiEnabled
    ? filterDocuments(documents, query)
    : (page.workflows || []).filter((item) =>
      [item.title, item.description, item.meta].join(" ").toLowerCase().includes(query.trim().toLowerCase()),
    );

  return (
    <div id={pageId} className="km-tab-content" style={{ display: "none" }}>
      <p className="section-intro">{page.description}</p>
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input placeholder="Rechercher une demande de formation..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <div className="km-grid" style={{ marginTop: 18 }}>
        <PaginatedDocuments items={workflows} resetKey={query}>
          {(visibleDocuments) => visibleDocuments.map((item) => <DocCard item={item} key={item.protocolUri || item.title} />)}
        </PaginatedDocuments>
        {apiEnabled && workflows.length === 0 ? <EmptyDocuments loading={loading} /> : null}
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <h3>{page.validation?.title}</h3>
        <p>{page.validation?.description}</p>
        <div className="km-grid" style={{ marginTop: 16 }}>
          {(page.validation?.steps || []).map((step) => (
            <div className="doc-card static-card academy-doc-card" key={step.title}>
              <div className="doc-icon-large" style={{ background: step.background, color: step.color }}>
                <i data-lucide="check-circle" style={{ width: 24, height: 24 }} />
              </div>
              <div className="doc-card-title">{step.title}</div>
              <p style={{ fontSize: 12, color: "var(--text-light)" }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingPage({ page, documents, loading, apiEnabled }) {
  const [query, setQuery] = useState("");
  const [selectedDayTitle, setSelectedDayTitle] = useState("");
  const [activeGalleryYear, setActiveGalleryYear] = useState("");
  const [mentorPreviewIndex, setMentorPreviewIndex] = useState(null);
  const term = query.trim().toLowerCase();
  const filterItems = (items = []) =>
    items.filter((item) =>
      [item.title, item.description, item.meta].join(" ").toLowerCase().includes(term),
    );
  const apiDocuments = filterDocuments(documents, query);
  const guides = apiEnabled
    ? apiDocuments.filter((item) => !normalizeGedKey(item.intranetPath).includes("mentor") && !isOnboardingDayDocument(item))
    : filterItems(page.guides);
  const allDays = apiEnabled ? buildOnboardingDays(documents) : filterItems(page.days);
  const days = allDays.filter((item) =>
    [item.title, item.description].join(" ").toLowerCase().includes(term),
  );
  const mentoring = apiEnabled
    ? apiDocuments.filter((item) => normalizeGedKey(item.intranetPath).includes("mentor"))
    : filterItems(page.mentoring);
  const mentoringImages = mentoring.filter((item) => onboardingImagePattern.test(item.fileName || item.title || ""));
  const selectedDay = days.find((day) => day.title === selectedDayTitle) || {};
  const galleryYears = allDays.filter((day) => /^\d{4}$/.test(day.title));
  const activeGallery = galleryYears.find((day) => day.title === activeGalleryYear) || galleryYears[0] || {};

  useEffect(() => {
    setMentorPreviewIndex(null);
  }, [query]);

  return (
    <div id="page-academy-onboarding" className="km-tab-content" style={{ display: "block" }}>
      <p className="section-intro">{page.description}</p>
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder="Rechercher dans OnBoarding..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <h3>{page.guidesTitle}</h3>
        <p>{page.guidesDescription}</p>
        <div className="academy-doc-grid academy-doc-row-scroll">
          <PaginatedDocuments items={guides} resetKey={query}>
            {(visibleDocuments) => visibleDocuments.map((item) => <DocCard item={item} key={item.protocolUri || item.title} />)}
          </PaginatedDocuments>
          {apiEnabled && guides.length === 0 ? <EmptyDocuments loading={loading} /> : null}
        </div>
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <h3>{page.daysTitle}</h3>
        <p>{page.daysDescription}</p>
        <div className="academy-event-grid">
          {days.map((item) => (
            <div
              className={`academy-event-card${item.title === selectedDay.title ? " active" : ""}`}
              key={item.title}
              onClick={() => setSelectedDayTitle(item.title)}
            >
              {item.image ? <img className="academy-event-image" src={item.image} alt={item.title} /> : null}
              <div className="academy-event-body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedDay.title ? (
          <div className="academy-day-detail">
            <h4>{selectedDay.title}</h4>
            <p>{selectedDay.details}</p>
            <div className="academy-gallery-grid">
              {(selectedDay.gallery || []).map((src, index) => (
                <img src={src} alt={`${selectedDay.title} - photo ${index + 1}`} key={src} />
              ))}
            </div>
          </div>
        ) : <EmptyDocuments loading={apiEnabled && loading} />}
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <h3>{page.mentoringTitle}</h3>
        <p>{page.mentoringDescription}</p>
        <div className="academy-doc-grid academy-doc-row-scroll">
          <PaginatedDocuments items={mentoring} resetKey={query}>
            {(visibleDocuments) => visibleDocuments.map((item) => (
              <MentoringItem
                item={item}
                key={item.protocolUri || item.title}
                onPreview={onboardingImagePattern.test(item.fileName || item.title || "")
                  ? () => setMentorPreviewIndex(mentoringImages.indexOf(item))
                  : undefined}
              />
            ))}
          </PaginatedDocuments>
          {apiEnabled && mentoring.length === 0 ? <EmptyDocuments loading={loading} /> : null}
        </div>
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <h3>{page.galleryTitle}</h3>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          {galleryYears.map((year) => (
            <button
              type="button"
              className={`filter-pill${year.title === activeGallery.title ? " active" : ""}`}
              key={year.title}
              onClick={() => setActiveGalleryYear(year.title)}
            >
              {year.title}
            </button>
          ))}
        </div>
        {activeGallery.title ? (
          <div className="academy-gallery-grid">
            {(activeGallery.gallery || []).map((src, index) => (
              <img src={src} alt={`${activeGallery.title} - photo ${index + 1}`} key={src} />
            ))}
          </div>
        ) : <EmptyDocuments loading={apiEnabled && loading} />}
      </div>
      <AcademyImagePreview
        items={mentoringImages}
        index={mentorPreviewIndex}
        onChange={setMentorPreviewIndex}
        onClose={() => setMentorPreviewIndex(null)}
      />
    </div>
  );
}

function DomainPage({ id, page, documents, loading, apiEnabled }) {
  const apiDomains = Array.from(new Set(documents.map((item) => item.segments?.[1]).filter(Boolean)));
  const domains = apiEnabled ? apiDomains : (page.domains || []);
  const [selected, setSelected] = useState((page.domains || [])[0] || "");
  const effectiveSelected = domains.includes(selected) ? selected : (domains[0] || "");
  const [selectedTheme, setSelectedTheme] = useState("Tous");
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const sourceContents = apiEnabled ? documents.map((item) => ({
    ...item,
    domain: item.segments?.[1] || item.folderLabel || "Documents",
    theme: item.segments?.[2] || item.folderLabel || "Documents",
    type: item.fileName?.split(".").pop()?.toUpperCase() || "Document",
  })) : (page.contents || []);
  const availableThemes = ["Tous", ...Array.from(new Set(sourceContents
    .filter((item) => !effectiveSelected || item.domain === effectiveSelected)
    .map((item) => item.theme)
    .filter(Boolean)))];
  const contents = sourceContents.filter((item) => {
    const matchDomain = !effectiveSelected || item.domain === effectiveSelected;
    const matchTheme = page.showThemeFilter === false || selectedTheme === "Tous" || item.theme === selectedTheme;
    const matchSearch = [item.title, item.theme, item.type, item.domain]
      .join(" ")
      .toLowerCase()
      .includes(term);
    return matchDomain && matchTheme && matchSearch;
  });
  const mediaContents = id === "levelup"
    ? contents.filter((item) => onboardingImagePattern.test(item.fileName || item.title || item.file || "")
      || academyVideoPattern.test(item.fileName || item.title || item.file || ""))
    : [];
  const documentContents = id === "levelup"
    ? contents.filter((item) => !mediaContents.includes(item))
    : contents;

  return (
    <div id={`page-academy-${id}`} className="km-tab-content" style={{ display: "none" }}>
      <p className="section-intro">{page.description}</p>
      <div className={page.horizontalFilter ? "academy-click-layout" : "academy-domain-layout"}>
        <div className="content-card">
          <h3>{page.filterTitle || "Domaines"}</h3>
          <div className={page.horizontalFilter ? "academy-horizontal-filter" : ""} style={page.horizontalFilter ? undefined : { display: "grid", gap: 10, marginTop: 16 }}>
            {domains.map((domain) => (
              <button
                className={`filter-pill${domain === effectiveSelected ? " active" : ""}`}
                key={domain}
                onClick={() => {
                  setSelected(domain);
                  setSelectedTheme("Tous");
                }}
                style={{ textAlign: "left" }}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
        <div className="content-card">
          <h3>{effectiveSelected || "Documents"}</h3>
          {!page.horizontalFilter && page.showThemeFilter !== false ? (
            <>
              <div className="academy-theme-label">{page.themeFilterTitle || "Thèmes"}</div>
              <div className="academy-horizontal-filter">
                {availableThemes.map((theme) => (
                  <button
                    className={`filter-pill${theme === selectedTheme ? " active" : ""}`}
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </>
          ) : null}
          <div className="section-search-row" style={{ marginTop: 14 }}>
            <i data-lucide="search" style={{ width: 18 }} />
            <input
              placeholder={page.searchPlaceholder || "Rechercher un contenu..."}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          {mediaContents.length > 0 ? <AcademyMediaSlider items={mediaContents} /> : null}
          <div className="academy-doc-grid">
            <PaginatedDocuments items={documentContents} resetKey={`${effectiveSelected}:${selectedTheme}:${query}`}>
              {(visibleDocuments) => visibleDocuments.map((item) => {
                const isImage = onboardingImagePattern.test(item.fileName || item.title || "");
                if (isImage) return <AcademyImageItem item={item} key={item.protocolUri || item.title} />;
                return (
                  <button
                    type="button"
                    className="doc-card static-card academy-doc-card"
                    key={item.protocolUri || item.title}
                    onClick={item.file ? (event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(item.file)},${JSON.stringify(item.title)})`) : undefined}
                  >
                    <div className="doc-icon-large" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                      <i data-lucide="play-circle" style={{ width: 24, height: 24 }} />
                    </div>
                    <div className="doc-card-title">{item.title}</div>
                    <p style={{ fontSize: 12, color: "var(--text-light)" }}>{item.theme}</p>
                    <div className="doc-card-meta">
                      <span>{item.type}</span>
                      <i data-lucide="chevron-right" style={{ width: 16 }} />
                    </div>
                  </button>
                );
              })}
            </PaginatedDocuments>
            {apiEnabled && contents.length === 0 ? <EmptyDocuments loading={loading} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AcademySection() {
  const { header, tabs, pages } = getAcademyData();
  const active = useViewActive("academy");
  const apiEnabled = shouldUseDocumentsApi();
  const gedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "CMR Academy"), { enabled: active && !header.underConstruction });
  const documentsForTab = (tabId) => gedState.documents.filter((item) => {
    const tab = tabs.find((candidate) => candidate.id === tabId);
    const documentGroup = normalizeGedKey(item.segments?.[0] || item.folderLabel);
    const tabKey = normalizeGedKey(tab?.label || tabId);
    const belongsToKnownTab = tabs.some((candidate) => {
      const candidateKey = normalizeGedKey(candidate.label || candidate.id);
      return documentGroup === candidateKey || documentGroup.includes(candidateKey);
    });
    if (documentGroup === tabKey || documentGroup.includes(tabKey)) return true;
    return tabId === "onboarding" && !belongsToKnownTab;
  });

  if (header.underConstruction) {
    return (
      <div id="view-academy" className="view-section km-container">
        <div className="km-header"><h2>{header.title}</h2></div>
        <p role="status">{header.statusMessage}</p>
      </div>
    );
  }

  return (
    <div id="view-academy" className="view-section km-container">
      <div className="km-header">
        <h2>{header.title}</h2>
        <p>{header.description}</p>
      </div>
      <div className="km-navbar" style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 30, borderBottom: "2px solid #e2e8f0" }}>
        {tabs.map((tab, index) => (
          <div key={tab.id} className={`km-nav-item${index === 0 ? " active" : ""}`} onClick={(event) => runLegacyHandler(event, `switchAcademyPageTab('${tab.id}')`)}>
            {tab.label}
          </div>
        ))}
      </div>
      {tabs.map((tab, index) => {
        if (tab.underConstruction) {
          return (
            <div key={tab.id} id={`page-academy-${tab.id}`} className="km-tab-content" style={{ display: index === 0 ? "block" : "none" }}>
              <p role="status">{header.statusMessage}</p>
            </div>
          );
        }
        const pageProps = { page: pages[tab.id] || {}, documents: documentsForTab(tab.id), loading: gedState.loading, apiEnabled };
        if (tab.id === "onboarding") return <OnboardingPage key={tab.id} {...pageProps} />;
        return <DomainPage key={tab.id} id={tab.id} {...pageProps} />;
      })}
    </div>
  );
}

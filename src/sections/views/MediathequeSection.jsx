import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getMediaData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.mediaHeader || {},
    pages: data.mediaPages || {},
    categories: data.mediaCategories || [],
    integrationItems: data.mediaIntegrationItems || [],
    labels: data.mediaLabels || {},
  };
}

function CardTitle({ page, titleKey = "title", iconKey = "icon", iconClassKey = "iconClass" }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${page[iconClassKey]}`}>
        <i data-lucide={page[iconKey]} style={{ width: 20, height: 20 }} />
      </div>
      {page[titleKey]}
    </div>
  );
}

function DashboardCard({ page, children, titleKey, iconKey, iconClassKey }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle page={page} titleKey={titleKey} iconKey={iconKey} iconClassKey={iconClassKey} />
      </div>
      {children}
    </div>
  );
}

function SearchInput({ id, placeholder, handler, marginBottom = 0 }) {
  return (
    <div className="actu-search-wrap" style={marginBottom ? { marginBottom } : undefined}>
      <i data-lucide="search" style={{ width: 16 }} />
      <input
        id={id}
        className="actu-search-input"
        placeholder={placeholder}
        onInput={(event) => runLegacyHandler(event, handler)}
      />
    </div>
  );
}

export default function MediathequeSection() {
  const { header, pages, categories, integrationItems, labels } = getMediaData();

  return (
    <>
      <div id="view-mediatheque" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="mediaMainNavbar"
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
          id="mediaSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 30,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>
        <div id="page-media-home" className="km-tab-content" style={{ display: "block" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.4fr 1.6fr", gap: 24 }}>
            <DashboardCard page={pages.home || {}} titleKey="mainTitle" iconKey="mainIcon" iconClassKey="mainIconClass">
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg,#eff6ff,#fff7ed)",
                    border: "1px solid #e2e8f0",
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>{pages.home?.heroTitle}</div>
                  <div style={{ marginTop: 6, color: "var(--text-light)", fontSize: 13, lineHeight: "1.7" }}>
                    {pages.home?.heroDescription}
                  </div>
                  <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {(pages.home?.buttons || []).map((button) => (
                      <button
                        key={button.label}
                        className={button.className}
                        onClick={(event) => runLegacyHandler(event, button.handler)}
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 14 }} className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="mediaGlobalSearch"
                    className="actu-search-input"
                    placeholder="Rechercher dans la médiathèque..."
                    onInput={(event) => runLegacyHandler(event, "renderMediaSearch()")}
                  />
                </div>
                <div id="mediaSearchPreview" className="doc-list" style={{ marginTop: 12 }} />
              </div>
            </DashboardCard>
            <DashboardCard page={pages.home || {}} titleKey="featuredTitle" iconKey="featuredIcon" iconClassKey="featuredIconClass">
              <div style={{ padding: 18 }}>
                <div id="mediaCarousel" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }} />
                <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button className="actu-filter-btn" onClick={(event) => runLegacyHandler(event, "rotateMediaCarousel()")}>
                    Actualiser
                  </button>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, pages.home?.consultHandler)}>
                    Consulter
                  </button>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
        <div id="page-media-images" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.images || {}}>
            <div style={{ padding: 18 }}>
              <SearchInput id="mediaImgSearch" placeholder="Rechercher une image..." handler="renderMediaImages()" marginBottom={12} />
              <div id="mediaImagesGrid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12 }} />
            </div>
          </DashboardCard>
        </div>
        <div id="page-media-videos" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.3fr 1.7fr", gap: 24 }}>
            <DashboardCard page={pages.videos || {}}>
              <div style={{ padding: 18 }}>
                <SearchInput id="mediaVidSearch" placeholder="Rechercher une vidéo..." handler="renderMediaVideos()" />
              </div>
              <div id="mediaVideosList" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
            </DashboardCard>
            <DashboardCard page={pages.videos || {}} titleKey="playerTitle" iconKey="playerIcon" iconClassKey="playerIconClass">
              <div id="mediaVideoPlayer" style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
                {pages.videos?.emptyPlayer}
              </div>
            </DashboardCard>
          </div>
        </div>
        <div id="page-media-categories" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.categories || {}}>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                {categories.map((category) => (
                  <button
                    key={category.value}
                    className={`actu-filter-btn${category.active ? " active" : ""}`}
                    onClick={(event) => runLegacyHandler(event, `setMediaCategory('${category.value}', this)`)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <div id="mediaCategoriesGrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }} />
            </div>
          </DashboardCard>
        </div>
        <div id="page-media-consultation" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.25fr 1.75fr", gap: 24 }}>
            <DashboardCard page={pages.consultation || {}} titleKey="galleryTitle" iconKey="galleryIcon" iconClassKey="galleryIconClass">
              <div id="mediaConsultList" className="doc-list" style={{ padding: 18 }} />
            </DashboardCard>
            <DashboardCard page={pages.consultation || {}} titleKey="readerTitle" iconKey="readerIcon" iconClassKey="readerIconClass">
              <div id="mediaConsultDetail" style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
                {pages.consultation?.emptyReader}
              </div>
            </DashboardCard>
          </div>
        </div>
        <div id="page-media-telechargement" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.telechargement || {}}>
            <div style={{ padding: 18 }}>
              <div
                style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 14, padding: 12, color: "#9a3412", fontSize: 13, lineHeight: "1.7" }}
                dangerouslySetInnerHTML={{ __html: pages.telechargement?.notice || "" }}
              />
              <div id="mediaDownloadList" className="doc-list" style={{ marginTop: 12 }} />
            </div>
          </DashboardCard>
        </div>
        <div id="page-media-integration" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.integration || {}}>
            <div style={{ padding: 18 }}>
              <div style={{ color: "var(--text-light)", fontSize: 13, lineHeight: "1.7" }}>
                {pages.integration?.description}
              </div>
              <div className="km-grid" style={{ marginTop: 12 }}>
                {integrationItems.map((item) => (
                  <div
                    key={item.title}
                    className="doc-card"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => runLegacyHandler(event, item.handler)}
                  >
                    <div className="doc-icon-large" style={{ background: item.background, color: item.color }}>
                      <i data-lucide={item.icon} style={{ width: 24, height: 24 }} />
                    </div>
                    <div className="doc-card-title">{item.title}</div>
                    <div className="doc-card-meta">
                      <span>Consulter</span>
                      <i data-lucide="arrow-right" style={{ width: 16 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, pages.integration?.buttonHandler)}>
                  Consulter
                </button>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </>
  );
}

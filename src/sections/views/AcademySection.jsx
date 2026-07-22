import React, { useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

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
    <div className="doc-card static-card academy-doc-card">
      <div className="doc-icon-large" style={{ background: "#eff6ff", color: "#2563eb" }}>
        <i data-lucide={item.icon || "file-text"} style={{ width: 24, height: 24 }} />
      </div>
      <div className="doc-card-title">{item.title}</div>
      {item.description ? <p style={{ fontSize: 12, color: "var(--text-light)" }}>{item.description}</p> : null}
      {item.meta ? <div className="doc-card-meta"><span>{item.meta}</span><i data-lucide="download" style={{ width: 16 }} /></div> : null}
    </div>
  );
}

function FormationPage({ page }) {
  const [query, setQuery] = useState("");
  const workflows = (page.workflows || []).filter((item) =>
    [item.title, item.description, item.meta].join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div id="page-academy-formation" className="km-tab-content" style={{ display: "none" }}>
      <p className="section-intro">{page.description}</p>
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input placeholder="Rechercher un workflow formation..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <div className="km-grid" style={{ marginTop: 18 }}>
        {workflows.map((item) => <DocCard item={item} key={item.title} />)}
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

function OnboardingPage({ page }) {
  const [query, setQuery] = useState("");
  const [activeYear, setActiveYear] = useState((page.galleryYears || [])[0] || "");
  const [showAllGuides, setShowAllGuides] = useState(false);
  const [selectedDayTitle, setSelectedDayTitle] = useState(page.days?.[0]?.title || "");
  const term = query.trim().toLowerCase();
  const filterItems = (items = []) =>
    items.filter((item) =>
      [item.title, item.description, item.meta].join(" ").toLowerCase().includes(term),
    );
  const guides = filterItems(page.guides);
  const days = filterItems(page.days);
  const mentoring = filterItems(page.mentoring);
  const visibleGuides = showAllGuides ? guides : guides.slice(0, 3);
  const selectedDay = days.find((day) => day.title === selectedDayTitle) || days[0] || {};
  const galleryImages = page.galleryByYear?.[activeYear] || [];

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
          {visibleGuides.map((item) => <DocCard item={item} key={item.title} />)}
        </div>
        {guides.length > 3 ? (
          <button className="secondary-btn" style={{ marginTop: 16 }} onClick={() => setShowAllGuides(!showAllGuides)}>
            {showAllGuides ? "Voir moins" : "Voir plus"}
          </button>
        ) : null}
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
              <img className="academy-event-image" src={item.image} alt="" />
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
              {(selectedDay.gallery || []).map((src) => (
                <img src={src} alt="" key={src} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <h3>{page.mentoringTitle}</h3>
        <p>{page.mentoringDescription}</p>
        <div className="academy-doc-grid academy-doc-row-scroll">
          {mentoring.map((item) => <DocCard item={item} key={item.title} />)}
        </div>
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <h3>{page.galleryTitle}</h3>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          {(page.galleryYears || []).map((year, index) => (
            <button
              className={`filter-pill${year === activeYear ? " active" : ""}`}
              key={year}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="academy-gallery-grid">
          {galleryImages.map((image) => (
            <img src={image.src} alt={image.alt} key={image.src} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainPage({ id, page }) {
  const domains = page.domains || [];
  const [selected, setSelected] = useState(domains[0] || "");
  const [selectedTheme, setSelectedTheme] = useState("Tous");
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const availableThemes = ["Tous", ...Array.from(new Set((page.contents || [])
    .filter((item) => !selected || item.domain === selected)
    .map((item) => item.theme)
    .filter(Boolean)))];
  const contents = (page.contents || []).filter((item) => {
    const matchDomain = !selected || item.domain === selected;
    const matchTheme = selectedTheme === "Tous" || item.theme === selectedTheme;
    const matchSearch = [item.title, item.theme, item.type, item.domain]
      .join(" ")
      .toLowerCase()
      .includes(term);
    return matchDomain && matchTheme && matchSearch;
  });

  return (
    <div id={`page-academy-${id}`} className="km-tab-content" style={{ display: "none" }}>
      <p className="section-intro">{page.description}</p>
      <div className={page.horizontalFilter ? "academy-click-layout" : "academy-domain-layout"}>
        <div className="content-card">
          <h3>{page.filterTitle || "Domaines"}</h3>
          <div className={page.horizontalFilter ? "academy-horizontal-filter" : ""} style={page.horizontalFilter ? undefined : { display: "grid", gap: 10, marginTop: 16 }}>
            {domains.map((domain) => (
              <button
                className={`filter-pill${domain === selected ? " active" : ""}`}
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
          <h3>{selected}</h3>
          {!page.horizontalFilter ? (
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
          <div className="academy-doc-grid">
            {contents.map((item) => (
              <div className="doc-card static-card academy-doc-card" key={item.title}>
                <div className="doc-icon-large" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  <i data-lucide="play-circle" style={{ width: 24, height: 24 }} />
                </div>
                <div className="doc-card-title">{item.title}</div>
                <p style={{ fontSize: 12, color: "var(--text-light)" }}>{item.theme}</p>
                <div className="doc-card-meta">
                  <span>{item.type}</span>
                  <i data-lucide="chevron-right" style={{ width: 16 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AcademySection() {
  const { header, tabs, pages } = getAcademyData();

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
      <OnboardingPage page={pages.onboarding || {}} />
      <FormationPage page={pages.formation || {}} />
      <DomainPage id="levelup" page={pages.levelup || {}} />
      <DomainPage id="talent" page={pages.talent || {}} />
      <DomainPage id="click" page={pages.click || {}} />
    </div>
  );
}

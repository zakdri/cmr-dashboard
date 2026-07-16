import React, { useEffect, useMemo, useState } from "react";

function getAchatsData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.achatsHeader || {},
    sections: data.achatsSections || [],
  };
}

function WorkflowList({ items = [] }) {
  const [query, setQuery] = useState("");
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder="Rechercher un workflow..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="achats-workflow-list">
        {filteredItems.map((item, index) => (
          <div className="achats-workflow-row" key={item}>
            <div className="achats-step-index">{index + 1}</div>
            <div>
              <strong>{item}</strong>
              <p>Accéder au workflow et suivre les étapes de traitement.</p>
            </div>
            <i data-lucide="chevron-right" style={{ width: 18 }} />
          </div>
        ))}
      </div>
    </>
  );
}

function MetricGrid({ metrics = [] }) {
  return (
    <div className="achats-metric-grid">
      {metrics.map((metric) => (
        <div className="doc-card static-card achats-metric-card" key={metric.label}>
          <div className="achats-metric-value">{metric.value}</div>
          <div className="doc-card-title">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}

function DocumentList({ documents = [] }) {
  const [query, setQuery] = useState("");
  const filteredDocuments = documents.filter((item) => {
    const term = query.trim().toLowerCase();
    return [item.title, item.type].join(" ").toLowerCase().includes(term);
  });

  return (
    <>
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder="Rechercher un document..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="achats-doc-list">
        {filteredDocuments.map((item) => (
          <div className="doc-row achats-document-row" key={item.title}>
            <div>
              <strong>{item.title}</strong>
              <p>Document public disponible en consultation.</p>
            </div>
            <span>{item.type}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function CpsTree({ tree = [] }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const filteredTree = tree
    .map((year) => {
      const children = (year.children || []).filter((child) =>
        [year.year, child.title, ...(child.docs || [])]
          .join(" ")
          .toLowerCase()
          .includes(term),
      );
      return { ...year, children };
    })
    .filter((year) => !term || year.year.toLowerCase().includes(term) || year.children.length);

  return (
    <>
      <div className="section-search-row">
        <i data-lucide="search" style={{ width: 18 }} />
        <input
          placeholder="Rechercher par année, appel d'offres ou CPS..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="achats-tree-list">
        {filteredTree.map((year) => (
          <details className="doc-card static-card achats-tree-card" key={year.year} open>
            <summary>{year.year}</summary>
            {(year.children || []).map((child) => (
              <div className="achats-tree-node" key={child.title}>
                <strong>{child.title}</strong>
                {(child.docs || []).map((doc) => (
                  <div className="doc-card-meta" key={doc}>
                    <span>{doc}</span>
                    <i data-lucide="download" style={{ width: 16 }} />
                  </div>
                ))}
              </div>
            ))}
          </details>
        ))}
      </div>
    </>
  );
}

function SectionBody({ section }) {
  if (section.metrics) return <MetricGrid metrics={section.metrics} />;
  if (section.tree) return <CpsTree tree={section.tree} />;
  if (section.documents) return <DocumentList documents={section.documents} />;
  return <WorkflowList items={section.items || []} />;
}

export default function AchatsSection() {
  const { header, sections } = getAchatsData();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = useMemo(
    () => sections[activeIndex] || sections[0] || {},
    [sections, activeIndex],
  );

  useEffect(() => {
    window.lucide?.createIcons();
  }, [activeIndex]);

  return (
    <div id="view-achats" className="view-section km-container">
      <div className="km-header">
        <h2>{header.title}</h2>
        <p>{header.description}</p>
      </div>

      <div className="km-navbar achats-navbar">
        {sections.map((section, index) => (
          <button
            className={`achats-tab${index === activeIndex ? " active" : ""}`}
            key={section.title}
            onClick={() => setActiveIndex(index)}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="content-card achats-detail-card">
        <div className="achats-detail-head">
          <div className="doc-icon-large" style={activeSection.iconStyle}>
            <i data-lucide={activeSection.icon || "folder"} style={{ width: 24, height: 24 }} />
          </div>
          <div>
            <h3>{activeSection.title}</h3>
            <p>{activeSection.description}</p>
          </div>
        </div>
        {activeSection.summary ? (
          <p className="achats-summary">{activeSection.summary}</p>
        ) : null}
        <SectionBody section={activeSection} />
      </div>
    </div>
  );
}

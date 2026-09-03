import React, { useEffect, useMemo, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { GED_ROOT_PATH, groupDocumentsByFirstSegment, joinGedPath, shouldUseDocumentsApi } from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

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

function GedStatus({ state, label = "documents" }) {
  if (!shouldUseDocumentsApi()) return null;
  if (state.loading) return <div style={{ padding: 14, color: "#64748b", fontSize: 13 }}>Chargement des {label}...</div>;
  if (state.error) return <div style={{ padding: 12, color: "#9a3412", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, fontSize: 12 }}>Les documents Moovapps ne sont pas disponibles pour le moment.</div>;
  return null;
}

function GedRow({ documentItem }) {
  const title = documentItem.title || documentItem.label || documentItem.fileName;
  return (
    <button
      className="doc-row achats-document-row"
      type="button"
      onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(documentItem.file)},${JSON.stringify(title)})`)}
    >
      <div>
        <strong>{title}</strong>
        <p>{documentItem.folderLabel || documentItem.fileName}</p>
      </div>
      <span>{documentItem.extension || "DOC"}</span>
    </button>
  );
}

function DocumentList({ documents = [], gedPath, active }) {
  const [query, setQuery] = useState("");
  const gedState = useGedDocuments(gedPath, { enabled: active });
  const sourceDocuments = shouldUseDocumentsApi() && !gedState.error ? gedState.documents : documents;
  const filteredDocuments = sourceDocuments.filter((item) => {
    const term = query.trim().toLowerCase();
    return [item.title, item.type, item.fileName, item.folderLabel].join(" ").toLowerCase().includes(term);
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
      <GedStatus state={gedState} />
      <div className="achats-doc-list">
        {shouldUseDocumentsApi() && !gedState.error ? filteredDocuments.map((item) => (
          <GedRow documentItem={item} key={item.id || item.fileName} />
        )) : filteredDocuments.map((item) => (
          <div className="doc-row achats-document-row" key={item.title}>
            <div>
              <strong>{item.title}</strong>
              <p>Document public disponible en consultation.</p>
            </div>
            <span>{item.type}</span>
          </div>
        ))}
        {!gedState.loading && !filteredDocuments.length ? <p className="empty-state">Aucun document trouvé.</p> : null}
      </div>
    </>
  );
}

function CpsTree({ tree = [], gedPath, active }) {
  const [query, setQuery] = useState("");
  const gedState = useGedDocuments(gedPath, { enabled: active });
  const term = query.trim().toLowerCase();
  const gedTree = groupDocumentsByFirstSegment(gedState.documents, "Documents").map((group) => ({
    year: group.title,
    children: groupDocumentsByFirstSegment(
      group.items.map((item) => ({ ...item, segments: item.segments?.slice(1) || [] })),
      group.title,
    ).map((child) => ({ title: child.title, docs: child.items })),
  }));
  const sourceTree = shouldUseDocumentsApi() && !gedState.error ? gedTree : tree;
  const filteredTree = sourceTree
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
      <GedStatus state={gedState} />
      <div className="achats-tree-list">
        {filteredTree.map((year) => (
          <details className="doc-card static-card achats-tree-card" key={year.year} open>
            <summary>{year.year}</summary>
            {(year.children || []).map((child) => (
              <div className="achats-tree-node" key={child.title}>
                <strong>{child.title}</strong>
                {(child.docs || []).map((doc) => (
                  <button
                    className="doc-card-meta"
                    key={typeof doc === "object" ? doc.id || doc.fileName : doc}
                    type="button"
                    style={{ width: "100%", border: 0, background: "transparent", cursor: "pointer" }}
                    onClick={(event) => {
                      if (typeof doc === "object") {
                        runLegacyHandler(event, `openMockDownload(${JSON.stringify(doc.file)},${JSON.stringify(doc.title)})`);
                      }
                    }}
                  >
                    <span>{typeof doc === "object" ? doc.title : doc}</span>
                    <i data-lucide="download" style={{ width: 16 }} />
                  </button>
                ))}
              </div>
            ))}
          </details>
        ))}
        {!gedState.loading && !filteredTree.length ? <p className="empty-state">Aucun document trouvé.</p> : null}
      </div>
    </>
  );
}

function SectionBody({ section, active }) {
  const gedPath = joinGedPath(GED_ROOT_PATH, "Espace Achats", section.title);
  if (section.metrics) return <MetricGrid metrics={section.metrics} />;
  if (section.tree) return <CpsTree tree={section.tree} gedPath={gedPath} active={active} />;
  if (section.documents) return <DocumentList documents={section.documents} gedPath={gedPath} active={active} />;
  return <WorkflowList items={section.items || []} />;
}

export default function AchatsSection() {
  const { header, sections } = getAchatsData();
  const isViewActive = useViewActive("achats");
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
        <SectionBody section={activeSection} active={isViewActive} />
      </div>
    </div>
  );
}

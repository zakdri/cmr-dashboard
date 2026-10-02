import React, { useEffect, useMemo, useState } from "react";
import PaginatedDocuments from "../../components/PaginatedDocuments.jsx";
import PlatformServiceFrame from "../../components/PlatformServiceFrame.jsx";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import {
  GED_ROOT_PATH,
  groupDocumentsByFirstSegment,
  joinGedPath,
  normalizeGedKey,
  shouldUseDocumentsApi,
} from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

function getAchatsData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.achatsHeader || {},
    sections: data.achatsSections || [],
  };
}

function WorkflowSubsections({ items = [], active }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] || items[0];
  const configuredPath = activeItem?.serviceKey
    ? window.CMR_PLATFORM_CONFIG?.services?.achats?.[activeItem.serviceKey]?.path
    : "";
  const servicePath = configuredPath || activeItem?.service?.path || "";
  const showService = !window.CMR_PLATFORM?.isDemo && Boolean(servicePath);

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  useEffect(() => {
    window.lucide?.createIcons();
  }, [activeIndex]);

  if (!activeItem) return null;

  return (
    <div className="achats-workflow-subsections">
      <div className="achats-workflow-tabs" role="tablist" aria-label="Sous-rubriques de la gestion des achats">
        {items.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`achats-workflow-tab${index === activeIndex ? " active" : ""}`}
            key={item.title}
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {showService ? (
          <PlatformServiceFrame path={servicePath} title={activeItem.title} active={active} />
        ) : (
          <div className="achats-workflow-panel">
            <span className="achats-workflow-panel-icon"><i data-lucide={activeItem.icon || "workflow"} /></span>
            <div>
              <h4>{activeItem.title}</h4>
              <p>{activeItem.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricGrid({ metrics = [], updatedAt }) {
  return (
    <>
      <div className="achats-metric-grid">
        {metrics.map((metric) => (
          <div className="doc-card static-card achats-metric-card" key={metric.label}>
            <div className="achats-metric-value">{metric.value}</div>
            <div className="doc-card-title">{metric.label}</div>
          </div>
        ))}
      </div>
      {updatedAt ? <p className="achats-last-update">{updatedAt}</p> : null}
    </>
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
      </div>
      <span>{documentItem.extension || "DOC"}</span>
    </button>
  );
}

function DocumentList({ documents = [], gedPath, active }) {
  const [query, setQuery] = useState("");
  const gedState = useGedDocuments(gedPath, { enabled: active });
  const sourceDocuments = shouldUseDocumentsApi() ? gedState.documents : documents;
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
        <PaginatedDocuments items={filteredDocuments} resetKey={query}>
          {(visibleDocuments) => shouldUseDocumentsApi() && !gedState.error ? visibleDocuments.map((item) => (
            <GedRow documentItem={item} key={item.id || item.fileName} />
          )) : visibleDocuments.map((item) => (
            <div className="doc-row achats-document-row" key={item.title}>
              <div>
                <strong>{item.title}</strong>
                <p>Document public disponible en consultation.</p>
              </div>
              <span>{item.type}</span>
            </div>
          ))}
        </PaginatedDocuments>
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
  const gedYears = new Map(gedTree.map((year) => [normalizeGedKey(year.year), year]));
  const usedYears = new Set();
  const mergedTree = tree.map((year) => {
    const yearKey = normalizeGedKey(year.year);
    const gedYear = gedYears.get(yearKey);
    if (gedYear) usedYears.add(yearKey);
    const gedChildren = new Map((gedYear?.children || []).map((child) => [normalizeGedKey(child.title), child]));
    const usedChildren = new Set();
    const children = (year.children || []).map((child) => {
      const childKey = normalizeGedKey(child.title);
      const gedChild = gedChildren.get(childKey);
      if (gedChild) usedChildren.add(childKey);
      return { ...child, docs: gedChild?.docs || [] };
    });
    (gedYear?.children || []).forEach((child) => {
      if (!usedChildren.has(normalizeGedKey(child.title))) children.push(child);
    });
    return { ...year, children };
  });
  gedTree.forEach((year) => {
    if (!usedYears.has(normalizeGedKey(year.year))) mergedTree.push(year);
  });
  const sourceTree = shouldUseDocumentsApi() ? mergedTree : tree;
  const filteredTree = sourceTree
    .map((year) => {
      const children = (year.children || []).filter((child) =>
        [year.year, child.title, ...(child.docs || []).map((doc) => typeof doc === "object" ? doc.title || doc.fileName : doc)]
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
          <details className="achats-tree-year" key={year.year} open>
            <summary><span>{year.year}</span><small>{year.children?.length || 0} mois</small></summary>
            <PaginatedDocuments items={year.children || []} pageSize={6} resetKey={`${year.year}:${query}`}>
              {(visibleMonths) => (
                <div className="achats-month-grid">
                  {visibleMonths.map((child) => (
                    <section className="achats-month-card" key={child.title}>
                      <header>
                        <span className="achats-month-icon"><i data-lucide="folder" /></span>
                        <div><strong>{child.title}</strong><small>{child.docs?.length || 0} document(s)</small></div>
                      </header>
                      <div className="achats-month-documents">
                        <PaginatedDocuments items={child.docs || []} resetKey={`${year.year}:${child.title}:${query}`}>
                          {(visibleDocuments) => visibleDocuments.map((doc) => {
                            const title = typeof doc === "object" ? doc.title : doc;
                            const extension = String(title || "").split(".").pop()?.toUpperCase() || "PDF";
                            return (
                              <button
                                className="achats-cps-document"
                                key={typeof doc === "object" ? doc.id || doc.fileName : doc}
                                type="button"
                                onClick={(event) => {
                                  if (typeof doc === "object") {
                                    runLegacyHandler(event, `openMockDownload(${JSON.stringify(doc.file)},${JSON.stringify(doc.title)})`);
                                  }
                                }}
                              >
                                <span className="achats-cps-file-kind">{extension}</span>
                                <span>{title}</span>
                                <i data-lucide="download" aria-hidden="true" />
                              </button>
                            );
                          })}
                        </PaginatedDocuments>
                        {!child.docs?.length ? <p className="empty-state">Aucun document dans ce mois.</p> : null}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </PaginatedDocuments>
            {!year.children?.length ? <p className="empty-state">Aucun CPS disponible pour cette année.</p> : null}
          </details>
        ))}
        {!gedState.loading && !filteredTree.length ? <p className="empty-state">Aucun document trouvé.</p> : null}
      </div>
    </>
  );
}

function SectionBody({ section, active }) {
  const gedPath = joinGedPath(GED_ROOT_PATH, "Espace Achats", section.gedFolder || section.title);
  if (section.metrics) return <MetricGrid metrics={section.metrics} updatedAt={section.updatedAt} />;
  if (section.tree) return <CpsTree tree={section.tree} gedPath={gedPath} active={active} />;
  if (section.documents) return <DocumentList documents={section.documents} gedPath={gedPath} active={active} />;
  if (section.subsections) return <WorkflowSubsections items={section.subsections} active={active} />;
  return null;
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

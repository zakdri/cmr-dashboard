import React, { useEffect, useMemo, useState } from "react";
import { icons } from "lucide";
import PaginatedDocuments from "../../components/PaginatedDocuments.jsx";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { GED_ROOT_PATH, getDocumentFileKind, joinGedPath, normalizeGedKey, shouldUseDocumentsApi } from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

function getOrgGovData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.orgGovHeader || {},
    tabs: data.orgGovMainTabs || [],
    overview: data.orgGovOverview || [],
    smallCards: data.orgGovSmallCards || [],
    pages: data.orgGovPages || {},
    strategieDocs: data.orgGovStrategieDocs || [],
    rsePortal: data.orgGovRsePortal || {},
  };
}

function ReactLucideIcon({ name, ...props }) {
  const iconName = String(name || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  const iconNode = icons[iconName];
  if (!iconNode) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {iconNode.map(([tag, attributes], index) => React.createElement(tag, { ...attributes, key: `${tag}-${index}` }))}
    </svg>
  );
}

function CardTitle({ title, icon, iconClass }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${iconClass}`}>
        <i data-lucide={icon} style={{ width: 20, height: 20 }} />
      </div>
      {title}
    </div>
  );
}

function OverviewCard({ card }) {
  return (
    <a
      href="#"
      className="app-card-large"
      onClick={(event) => runLegacyHandler(event, card.handler)}
      style={{ "--hover-bg": card.hoverBg, "--hover-border": card.hoverBorder }}
    >
      <div
        className="app-card-icon-large"
        style={{ background: card.iconBackground }}
      >
        <i data-lucide={card.icon} style={{ width: 24, height: 24 }} />
      </div>
      <div className="app-card-content">
        <span className="app-card-title-large">{card.title}</span>
        <p className="app-card-desc">{card.desc}</p>
        <div className="app-card-action">
          {card.action}
          <i data-lucide="arrow-right" style={{ width: 14 }} />
        </div>
      </div>
    </a>
  );
}

function SmallCard({ card }) {
  return (
    <>
      <div className="app-category-title">{card.sectionTitle}</div>
      <div className="km-grid" style={{ marginBottom: 40 }}>
        <div
          className="doc-card"
          style={{ cursor: "pointer" }}
          onClick={(event) => runLegacyHandler(event, card.handler)}
        >
          <div className="doc-icon-large" style={card.iconStyle}>
            <i data-lucide={card.icon} style={{ width: 24, height: 24 }} />
          </div>
          <div className="doc-card-title">{card.title}</div>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-light)",
              marginTop: 8,
            }}
          >
            {card.desc}
          </p>
          <div className="doc-card-meta">
            <span style={{ color: card.actionColor, fontWeight: 700 }}>
              {card.action}
            </span>
            <i data-lucide="arrow-right" style={{ width: 16 }} />
          </div>
        </div>
      </div>
    </>
  );
}

function SimpleDocCard({ doc }) {
  return (
    <div
      className="doc-card"
      style={{ cursor: "pointer" }}
      onClick={(event) =>
        runLegacyHandler(
          event,
          `openMockDownload(${JSON.stringify(doc.file)},${JSON.stringify(doc.downloadTitle || doc.title)});`,
        )
      }
    >
      <div className="doc-icon-large pdf">
        <i data-lucide="file-text" style={{ width: 24, height: 24 }} />
      </div>
      <div className="doc-card-title">{doc.title}</div>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-light)",
          marginTop: 8,
        }}
      >
        {doc.description}
      </p>
      <div className="doc-card-meta">
        <span>{doc.action}</span>
        <i data-lucide="download" style={{ width: 16, color: "#94a3b8" }} />
      </div>
    </div>
  );
}

function DynamicCardPage({ page, children }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle title={page.title} icon={page.icon} iconClass={page.iconClass} />
      </div>
      {children}
    </div>
  );
}

function SummaryText({ children }) {
  if (!children) return null;
  return (
    <p style={{ color: "var(--text-light)", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>
      {children}
    </p>
  );
}

function GedFolderBrowser({ documents = [], folders = [], loading = false, error = null }) {
  const [currentPath, setCurrentPath] = useState([]);

  const allFolderSegments = useMemo(() => {
    const paths = new Map();
    [...folders, ...documents].forEach((item) => {
      const segments = Array.isArray(item.segments)
        ? item.segments.filter(Boolean)
        : String(item.folderLabel || "").split("/").filter(Boolean);
      segments.forEach((_, index) => {
        const path = segments.slice(0, index + 1);
        paths.set(path.map(normalizeGedKey).join("/"), path);
      });
    });
    return Array.from(paths.values());
  }, [documents, folders]);

  const pathStartsWith = (segments, prefix) => prefix.every(
    (segment, index) => normalizeGedKey(segments[index]) === normalizeGedKey(segment),
  );

  const childFolders = useMemo(() => {
    const children = new Map();
    allFolderSegments.forEach((segments) => {
      if (!pathStartsWith(segments, currentPath) || segments.length <= currentPath.length) return;
      const name = segments[currentPath.length];
      const path = [...currentPath, name];
      children.set(normalizeGedKey(name), { name, path });
    });
    return Array.from(children.values()).sort((left, right) => left.name.localeCompare(right.name, "fr"));
  }, [allFolderSegments, currentPath]);

  const directDocuments = useMemo(() => documents.filter((documentItem) => {
    const segments = Array.isArray(documentItem.segments)
      ? documentItem.segments.filter(Boolean)
      : String(documentItem.folderLabel || "").split("/").filter(Boolean);
    return segments.length === currentPath.length && pathStartsWith(segments, currentPath);
  }), [documents, currentPath]);

  const countDocumentsBelow = (folderPath) => documents.filter((documentItem) => {
    const segments = Array.isArray(documentItem.segments) ? documentItem.segments : [];
    return pathStartsWith(segments, folderPath);
  }).length;

  return (
    <div className="cmr-job-folder-browser">
      <div className="cmr-job-folder-toolbar">
        <button
          type="button"
          className="cmr-job-folder-back"
          onClick={() => setCurrentPath((path) => path.slice(0, -1))}
          disabled={!currentPath.length}
          title="Revenir au dossier précédent"
        >
          <ReactLucideIcon name="arrow-left" />
        </button>
        <nav aria-label="Fil d’Ariane des fiches de postes">
          <button type="button" onClick={() => setCurrentPath([])}>Fiches de postes</button>
          {currentPath.map((segment, index) => (
            <React.Fragment key={`${segment}-${index}`}>
              <ReactLucideIcon name="chevron-right" />
              <button type="button" onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}>{segment}</button>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {loading ? <p className="empty-state">Chargement de l’arborescence Moovapps...</p> : null}
      {!loading && error ? <p className="empty-state">L’arborescence Moovapps n’est pas disponible pour le moment.</p> : null}

      {!loading && !error && childFolders.length ? (
        <div className="cmr-job-folder-grid">
          {childFolders.map((folder) => (
            <button type="button" key={folder.path.join("/")} onClick={() => setCurrentPath(folder.path)}>
              <span className="cmr-job-folder-icon"><ReactLucideIcon name="folder" /></span>
              <strong>{folder.name}</strong>
              <small>{countDocumentsBelow(folder.path)} document(s)</small>
              <ReactLucideIcon className="cmr-job-folder-open" name="chevron-right" />
            </button>
          ))}
        </div>
      ) : null}

      {!loading && !error && directDocuments.length ? (
        <div className="cmr-job-document-section">
          <h4>Documents</h4>
          <div className="cmr-job-document-grid">
            {directDocuments.map((documentItem) => (
              <button
                type="button"
                key={documentItem.id || documentItem.protocolUri || documentItem.fileName}
                onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(documentItem.file)},${JSON.stringify(documentItem.title)})`)}
              >
                <span><ReactLucideIcon name="file-text" /></span>
                <div><strong>{documentItem.title || documentItem.fileName}</strong></div>
                <ReactLucideIcon name="download" />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {!loading && !error && !childFolders.length && !directDocuments.length ? (
        <p className="empty-state">Ce dossier est vide.</p>
      ) : null}
    </div>
  );
}

function RseDocumentRows({ documents = [], emptyLabel = "Aucun document disponible." }) {
  if (!documents.length) return <p className="empty-state">{emptyLabel}</p>;
  return (
    <div className="doc-list rse-portal-documents">
      <PaginatedDocuments items={documents}>
        {(visibleDocuments) => visibleDocuments.map((documentItem) => (
          <button
            type="button"
            className="doc-item"
            key={documentItem.id || documentItem.fileName}
            onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(documentItem.file)},${JSON.stringify(documentItem.title)})`)}
          >
            <span className="doc-icon rse-portal-file-icon">{getDocumentFileKind(documentItem)}</span>
            <span className="doc-info"><strong className="doc-title">{documentItem.title || documentItem.fileName}</strong></span>
            <ReactLucideIcon name="download" />
          </button>
        ))}
      </PaginatedDocuments>
    </div>
  );
}

function RseReferenceBrowser({ items = [], documents = [], icon = "book-open", loading = false, horizontal = false }) {
  const normalizedItems = useMemo(() => items.map((item) => (
    typeof item === "string" ? { title: item, folder: item } : item
  )), [items]);
  const [selectedTitle, setSelectedTitle] = useState(normalizedItems[0]?.title || "");
  const selectedItem = normalizedItems.find((item) => item.title === selectedTitle) || normalizedItems[0] || {};

  useEffect(() => {
    if (!normalizedItems.some((item) => item.title === selectedTitle)) {
      setSelectedTitle(normalizedItems[0]?.title || "");
    }
  }, [normalizedItems, selectedTitle]);

  const matchingDocuments = useMemo(() => {
    const selectedKey = normalizeGedKey(selectedItem.title);
    const selectedFolderKey = normalizeGedKey(selectedItem.folder);
    if (!selectedKey) return [];
    const selectedTokens = selectedKey.split(" ").filter((token) => token.length > 2);

    return documents.filter((documentItem) => {
      const documentFolders = (documentItem.segments || []).slice(1).map(normalizeGedKey);
      if (selectedFolderKey && documentFolders.includes(selectedFolderKey)) return true;

      const documentKey = normalizeGedKey(
        [documentItem.title, documentItem.fileName, ...(documentItem.segments || []).slice(1)]
          .filter(Boolean)
          .join(" "),
      );
      return documentKey.includes(selectedKey) || selectedTokens.every((token) => documentKey.includes(token));
    });
  }, [documents, selectedItem]);

  return (
    <div className={`rse-two-pane${horizontal ? " rse-browser-horizontal" : ""}`}>
      <div className="rse-reference-list">
        {normalizedItems.map((item) => (
          <button
            type="button"
            key={item.title}
            className={`rse-reference-option${selectedItem.title === item.title ? " active" : ""}`}
            onClick={() => setSelectedTitle(item.title)}
            aria-pressed={selectedItem.title === item.title}
          >
            <ReactLucideIcon name={icon} />
            <strong>{item.title}</strong>
            <ReactLucideIcon className="rse-reference-chevron" name="chevron-right" />
          </button>
        ))}
      </div>

      <div className="rse-document-list-panel" aria-live="polite">
        <h4>{selectedItem.title || "Documents RSE"}</h4>
        {loading ? <p className="rse-portal-loading">Chargement des documents RSE...</p> : null}
        {!loading ? (
          <RseDocumentRows
            documents={matchingDocuments}
            emptyLabel="Aucun fichier correspondant n'est disponible dans la GED."
          />
        ) : null}
      </div>
    </div>
  );
}

function RseGovernanceBrowser({ governance = {}, documents = [], loading = false }) {
  const roles = governance.roles || [];
  const committee = governance.committee || {};
  const [activeSpace, setActiveSpace] = useState("roles");
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id || "");
  const selectedRole = roles.find((role) => role.id === selectedRoleId) || roles[0] || {};
  const documentSegments = (documentItem) => (documentItem.segments?.length
    ? documentItem.segments
    : String(documentItem.folderLabel || "").split("/"))
    .map((segment) => segment.trim())
    .filter(Boolean);
  const hasDocumentFolder = (documentItem, folder) => documentSegments(documentItem)
    .some((segment) => normalizeGedKey(segment) === normalizeGedKey(folder));
  const rolesFolder = governance.rolesFolder || "Rôles et responsabilités";
  const generalRoleDocuments = documents.filter((documentItem) => {
    const segments = documentSegments(documentItem).map(normalizeGedKey);
    const rolesFolderIndex = segments.indexOf(normalizeGedKey(rolesFolder));
    return rolesFolderIndex >= 0 && rolesFolderIndex === segments.length - 1;
  });
  const committeeDocuments = documents.filter((documentItem) => (
    hasDocumentFolder(documentItem, committee.folder || committee.title || "Comité RSE")
  ));

  useEffect(() => {
    if (!roles.some((role) => role.id === selectedRoleId)) {
      setSelectedRoleId(roles[0]?.id || "");
    }
  }, [roles, selectedRoleId]);

  return (
    <div className="rse-governance-browser">
      <div className="rse-governance-tabs" role="tablist" aria-label="Organisation et Gouvernance RSE">
        <button
          type="button"
          role="tab"
          aria-selected={activeSpace === "roles"}
          className={activeSpace === "roles" ? "active" : ""}
          onClick={() => setActiveSpace("roles")}
        >
          <ReactLucideIcon name="users-round" />
          Rôles et responsabilités
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSpace === "committee"}
          className={activeSpace === "committee" ? "active" : ""}
          onClick={() => setActiveSpace("committee")}
        >
          <ReactLucideIcon name="presentation" />
          Comité RSE
        </button>
      </div>

      {activeSpace === "roles" ? (
        <div role="tabpanel">
          <div className="rse-two-pane rse-governance-content">
            <div className="rse-governance-sidebar">
              <div className="rse-reference-list">
                {roles.map((role) => (
                  <button
                    type="button"
                    key={role.id}
                    className={`rse-reference-option${selectedRole.id === role.id ? " active" : ""}`}
                    aria-pressed={selectedRole.id === role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                  >
                    <ReactLucideIcon name="user-round-check" />
                    <strong>{role.title}</strong>
                    <ReactLucideIcon className="rse-reference-chevron" name="chevron-right" />
                  </button>
                ))}
              </div>
            </div>
            <article className="rse-governance-detail">
              <h4>{selectedRole.title}</h4>
              {selectedRole.summary ? <p>{selectedRole.summary}</p> : null}
              <h5>Responsabilités</h5>
              <ul>{(selectedRole.responsibilities || []).map((item) => <li key={item}>{item}</li>)}</ul>
              <h5>Document d'organisation RSE</h5>
              {loading ? <p className="rse-portal-loading">Chargement des documents...</p> : null}
              {!loading ? <RseDocumentRows documents={generalRoleDocuments} emptyLabel="Aucun document d'organisation RSE disponible." /> : null}
            </article>
          </div>
        </div>
      ) : (
        <div className="rse-two-pane rse-governance-content" role="tabpanel">
          <div className="rse-governance-sidebar">
            <div className="rse-reference-list">
              <div>
                <ReactLucideIcon name="presentation" />
                <strong>{committee.title || "Comité RSE"}</strong>
              </div>
            </div>
            <section className="rse-governance-sidebar-documents">
              <h4>Document associé</h4>
              {loading ? <p className="rse-portal-loading">Chargement des documents...</p> : null}
              {!loading ? <RseDocumentRows documents={committeeDocuments} emptyLabel="Aucun document associé au Comité RSE." /> : null}
            </section>
          </div>
          <div className="rse-governance-committee-detail">
            <article className="rse-governance-detail">
              <h4>Missions</h4>
              <ul>{(committee.missions || []).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="rse-governance-detail">
              <h4>Composition</h4>
              <ul>{(committee.composition || []).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}

function RseDomainsBrowser({ domains = [], documents = [], loading = false }) {
  const [selectedDomainTitle, setSelectedDomainTitle] = useState(domains[0]?.title || "");
  const selectedDomain = domains.find((domain) => domain.title === selectedDomainTitle) || domains[0] || {};

  useEffect(() => {
    if (!domains.some((domain) => domain.title === selectedDomainTitle)) {
      setSelectedDomainTitle(domains[0]?.title || "");
    }
  }, [domains, selectedDomainTitle]);

  const engagementGroups = useMemo(() => {
    const domainKey = normalizeGedKey(selectedDomain.title);
    const groups = new Map();

    (selectedDomain.engagements || []).forEach((engagement) => {
      const item = typeof engagement === "string" ? { title: engagement } : engagement;
      groups.set(normalizeGedKey(item.title), { ...item, documents: [] });
    });

    documents.forEach((documentItem) => {
      const segments = documentItem.segments || [];
      const domainIndex = segments.findIndex((segment, index) => {
        if (index === 0) return false;
        const segmentKey = normalizeGedKey(segment);
        return segmentKey.includes(domainKey) || domainKey.includes(segmentKey);
      });
      if (domainIndex < 0) return;

      const engagementTitle = segments[domainIndex + 1] || documentItem.title;
      const engagementKey = normalizeGedKey(engagementTitle);
      const existing = groups.get(engagementKey) || { title: engagementTitle, documents: [] };
      const metadataKeywords = Array.isArray(documentItem.keywords)
        ? documentItem.keywords
        : Array.isArray(documentItem.tags)
          ? documentItem.tags
          : [];
      const pathKeywords = segments.slice(domainIndex + 2);
      groups.set(engagementKey, {
        ...existing,
        description: existing.description || documentItem.description || "",
        keywords: existing.keywords || [...metadataKeywords, ...pathKeywords],
        documents: [...existing.documents, documentItem],
      });
    });

    return Array.from(groups.values());
  }, [documents, selectedDomain]);

  const [selectedEngagementTitle, setSelectedEngagementTitle] = useState("");

  useEffect(() => {
    if (!engagementGroups.some((engagement) => engagement.title === selectedEngagementTitle)) {
      setSelectedEngagementTitle(engagementGroups[0]?.title || "");
    }
  }, [engagementGroups, selectedEngagementTitle]);

  const selectedEngagement = engagementGroups.find((engagement) => engagement.title === selectedEngagementTitle);

  return (
    <div className="rse-domains-browser">
      <nav className="rse-domain-selector" aria-label="Domaines d'engagement RSE">
        {domains.map((domain) => (
          <button
            type="button"
            key={domain.title}
            className={selectedDomain.title === domain.title ? "active" : ""}
            style={{ "--rse-domain-color": domain.color }}
            onClick={() => setSelectedDomainTitle(domain.title)}
            aria-pressed={selectedDomain.title === domain.title}
          >
            <span aria-hidden="true" />
            <strong>{domain.title}</strong>
            <ReactLucideIcon name="chevron-right" />
          </button>
        ))}
      </nav>

      <section className="rse-domain-details" style={{ "--rse-domain-color": selectedDomain.color }}>
        <span className="rse-domain-details-label">Objectif du domaine</span>
        <h4>{selectedDomain.objective}</h4>
        <div className="rse-domain-engagements-heading">Engagements associés</div>
        {engagementGroups.length ? (
          <div className="rse-domain-engagements">
            {engagementGroups.map((engagement) => (
              <button
                type="button"
                key={engagement.title}
                className={selectedEngagement?.title === engagement.title ? "active" : ""}
                onClick={() => setSelectedEngagementTitle(engagement.title)}
              >
                <strong>{engagement.title}</strong>
                {engagement.description ? <span>{engagement.description}</span> : null}
                {engagement.keywords?.length ? <small>{engagement.keywords.join(" · ")}</small> : null}
              </button>
            ))}
          </div>
        ) : (
          <p className="rse-domain-empty">Aucun engagement n'est encore renseigné dans la GED.</p>
        )}
      </section>

      <aside className="rse-domain-documents">
        <h4>Documents associés</h4>
        {loading ? <p className="rse-portal-loading">Chargement des fiches d'engagement...</p> : null}
        {!loading ? (
          <RseDocumentRows
            documents={selectedEngagement?.documents || []}
            emptyLabel="Aucune fiche d'engagement disponible pour cette sélection."
          />
        ) : null}
      </aside>
    </div>
  );
}

function RsePortalContent({ portal, documents, loading }) {
  const documentsByFolder = useMemo(() => {
    const groups = new Map();
    documents.forEach((documentItem) => {
      const folder = documentItem.segments?.[0] || documentItem.folderLabel || "";
      const key = normalizeGedKey(folder);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(documentItem);
    });
    return groups;
  }, [documents]);
  const folderDocuments = (folder) => documentsByFolder.get(normalizeGedKey(folder)) || [];
  const banner = portal.banner || {};
  const presentation = portal.presentation || {};
  const policies = portal.politiques || {};
  const domains = portal.domains || {};
  const references = portal.documents || {};
  const governance = portal.governance || {};
  const evaluation = portal.evaluation || {};
  const resources = portal.resources || {};
  const loadingMessage = loading ? <p className="rse-portal-loading">Chargement des documents RSE...</p> : null;

  const Banner = () => (
    <div className="rse-portal-banner">
      <img src={banner.logo} alt="Logo RSE CMR responsable et citoyenne" />
      <h3>{banner.tagline}</h3>
    </div>
  );

  return (
    <>
      <div id="page-orggov-rse-presentation" className="km-tab-content" style={{ display: "none" }}>
        <Banner />
        <section className="rse-presentation-layout">
          <div className="rse-presentation-copy"><h3>{presentation.title}</h3>{(presentation.paragraphs || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <figure className="rse-domains-visual"><img src={presentation.visual} alt="Les six domaines d’engagement RSE de la CMR" /></figure>
        </section>
      </div>

      <div id="page-orggov-rse-politiques" className="km-tab-content" style={{ display: "none" }}>
        <Banner />
        <section className="rse-portal-section"><h3>{policies.title}</h3><p>{policies.description}</p><RseReferenceBrowser items={policies.items || []} documents={folderDocuments(policies.folder)} icon="file-check" loading={loading} /></section>
      </div>

      <div id="page-orggov-rse-domaines" className="km-tab-content" style={{ display: "none" }}>
        <Banner />
        <section className="rse-portal-section"><h3>{domains.title}</h3><p>{domains.description}</p><RseDomainsBrowser domains={domains.items || []} documents={folderDocuments(domains.folder)} loading={loading} /></section>
      </div>

      <div id="page-orggov-rse-documents" className="km-tab-content" style={{ display: "none" }}>
        <Banner />
        <section className="rse-portal-section"><h3>{references.title}</h3><p>{references.description}</p><RseReferenceBrowser items={references.items || []} documents={folderDocuments(references.folder)} loading={loading} /></section>
      </div>

      <div id="page-orggov-rse-gouvernance" className="km-tab-content" style={{ display: "none" }}>
        <Banner />
        <section className="rse-portal-section"><h3>{governance.title}</h3><p>{governance.description}</p><RseGovernanceBrowser governance={governance} documents={folderDocuments(governance.folder)} loading={loading} /></section>
      </div>

      <div id="page-orggov-rse-evaluation" className="km-tab-content" style={{ display: "none" }}>
        <Banner />
        <section className="rse-portal-section"><h3>{evaluation.title}</h3><p>{evaluation.description}</p>{loadingMessage}<RseDocumentRows documents={folderDocuments(evaluation.folder)} emptyLabel="Aucun certificat ou label RSE disponible." /></section>
      </div>

      <div id="page-orggov-rse-ressources" className="km-tab-content" style={{ display: "none" }}>
        <Banner />
        <section className="rse-portal-section"><h3>{resources.title}</h3><p>{resources.description}</p><RseReferenceBrowser items={resources.categories || []} documents={folderDocuments(resources.folder)} icon="folder-open" loading={loading} horizontal /></section>
      </div>
    </>
  );
}

export default function InstitutionnelSection() {
  const { header, tabs, overview, smallCards, pages, strategieDocs, rsePortal } =
    getOrgGovData();
  const [activeSection, setActiveSection] = useState(tabs[0]?.id || "overview");
  const [isOrgChartExpanded, setIsOrgChartExpanded] = useState(false);
  const isViewActive = useViewActive("institutionnel");
  const apiEnabled = shouldUseDocumentsApi();
  const directionGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Organisation & RSE", "Direction"), {
    enabled: isViewActive && activeSection === "direction",
  });
  const visibleStrategieDocs = apiEnabled ? directionGedState.documents : strategieDocs;
  const rseGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Organisation & RSE", rsePortal.gedFolder || "RSE"), {
    enabled: isViewActive && activeSection === "rse",
  });
  const jobDescriptionsGedState = useGedDocuments(
    joinGedPath(GED_ROOT_PATH, "Organisation & RSE", "Organisation", "Fiches de postes"),
    { enabled: isViewActive && activeSection === "organisation" },
  );

  useEffect(() => {
    if (!isOrgChartExpanded) return undefined;

    document.body.classList.add("org-chart-expanded");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOrgChartExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("org-chart-expanded");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOrgChartExpanded]);

  useEffect(() => {
    requestAnimationFrame(() => window.lucide?.createIcons());
  }, [isOrgChartExpanded]);

  useEffect(() => {
    const closeExpandedOrgChart = () => setIsOrgChartExpanded(false);
    const syncSection = (event) => setActiveSection(event.detail?.section || tabs[0]?.id || "overview");
    window.addEventListener("cmr:close-org-chart-expanded", closeExpandedOrgChart);
    window.addEventListener("cmr:orggov-section", syncSection);
    return () => {
      window.removeEventListener("cmr:close-org-chart-expanded", closeExpandedOrgChart);
      window.removeEventListener("cmr:orggov-section", syncSection);
      document.body.classList.remove("org-chart-expanded");
    };
  }, [tabs]);

  return (
    <>
      <div id="view-institutionnel" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="orgGovMainNavbar"
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
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {index > 0 && (
                <span
                  style={{
                    color: "#cbd5e1",
                    fontWeight: 300,
                    fontSize: 18,
                    lineHeight: 1,
                    alignSelf: "center",
                    flexShrink: 0,
                  }}
                >
                  |
                </span>
              )}
              <div
                data-orggov-section={tab.id}
                className={`km-nav-item${activeSection === tab.id ? " active" : ""}`}
                onClick={(event) =>
                  runLegacyHandler(event, `switchOrgGovSection('${tab.id}')`)
                }
                style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
              >
                {tab.label}
              </div>
            </React.Fragment>
          ))}
        </div>
        <SummaryText>{({
          organisation: pages.organisation?.description,
          smi: pages.smi?.description,
          rse: rsePortal.description,
          "culture-qse-rse": pages["culture-qse-rse"]?.description,
        })[activeSection]}</SummaryText>
        <div
          className="km-navbar"
          id="orgGovSubNavbar"
          style={{
            display: "none",
            alignItems: "center",
            gap: 0,
            marginBottom: 24,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>

        <div
          id="page-orggov-overview"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          {overview.map((section) => (
            <React.Fragment key={section.title}>
              <div className="app-category-title">{section.title}</div>
              <div
                className="app-grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 24,
                  marginBottom: 40,
                }}
              >
                {(section.cards || []).map((card) => (
                  <OverviewCard key={card.title} card={card} />
                ))}
              </div>
            </React.Fragment>
          ))}
          {smallCards.map((card) => (
            <SmallCard key={card.title} card={card} />
          ))}
        </div>

        <div
          id="page-orggov-organigramme"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className={`cmr-org-chart-viewer${
              isOrgChartExpanded ? " is-expanded" : ""
            }`}
          >
            <div className="cmr-org-chart-toolbar">
              <div>
                <div className="app-category-title" style={{ margin: 0 }}>
                  {pages.organigramme?.title}
                </div>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: 13,
                    color: "var(--text-light)",
                  }}
                >
                  {pages.organigramme?.description}
                </p>
              </div>
              <button
                type="button"
                className="cmr-org-fullscreen-button"
                onClick={() => setIsOrgChartExpanded((expanded) => !expanded)}
                aria-pressed={isOrgChartExpanded}
                title={
                  isOrgChartExpanded
                    ? "Réduire l’organigramme"
                    : "Agrandir l’organigramme dans la page"
                }
              >
                <i
                  data-lucide={isOrgChartExpanded ? "minimize-2" : "maximize-2"}
                  aria-hidden="true"
                />
                <span>
                  {isOrgChartExpanded ? "Réduire" : "Agrandir"}
                </span>
              </button>
            </div>
            <div className="cmr-org-chart-shell">
              <div id="orgTree" />
            </div>
          </div>
        </div>

        <div
          id="page-orggov-postes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <div>
              <div className="app-category-title" style={{ margin: 0 }}>
                {pages.postes?.title}
              </div>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 13,
                  color: "var(--text-light)",
                }}
              >
                {pages.postes?.description}
              </p>
            </div>
            <div className="actu-search-wrap" style={{ maxWidth: 420 }}>
              <i data-lucide="search" className="actu-search-icon" />
              <input
                id="postesSearchInput"
                type="text"
                className="actu-search-input"
                placeholder={pages.postes?.searchPlaceholder || "Rechercher une fiche ou une fonction..."}
                onInput={(event) =>
                  runLegacyHandler(event, "searchPostes(this.value)")
                }
              />
            </div>
          </div>
          <div
            className="dashboard-grid cmr-position-workspace"
          >
            <div className="dashboard-card cmr-position-list-panel">
              <div className="card-header">
                <CardTitle
                  title={pages.postes?.listTitle}
                  icon="briefcase"
                  iconClass="purple"
                />
                <span id="postesCount" className="cmr-position-count" />
              </div>
              <div id="postesList" className="doc-list" />
              <div id="postesPagination" className="cmr-position-pagination" />
            </div>
            <div className="dashboard-card cmr-position-detail-panel">
              <div className="card-header">
                <CardTitle
                  title={pages.postes?.detailTitle}
                  icon="file-text"
                  iconClass="orange"
                />
              </div>
              <div
                id="postesDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                {pages.postes?.emptyDetail}
              </div>
            </div>
          </div>
        </div>

        <div
          id="page-orggov-fiches-postes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="cmr-job-folder-heading">
            <div>
              <div className="app-category-title" style={{ margin: 0 }}>
                {pages.fichesPostes?.title || "Fiches de postes"}
              </div>
              <p>{pages.fichesPostes?.description}</p>
            </div>
            <ReactLucideIcon name="folders" />
          </div>
          <GedFolderBrowser
            documents={jobDescriptionsGedState.documents}
            folders={jobDescriptionsGedState.folders}
            loading={jobDescriptionsGedState.loading}
            error={jobDescriptionsGedState.error}
          />
        </div>

        <div
          id="page-orggov-presentation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.presentation?.title}
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 26,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <i data-lucide="presentation" style={{ width: 20, height: 20 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>
                  {pages.presentation?.panelTitle}
                </div>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "var(--text-light)",
                    fontSize: 13,
                    lineHeight: "1.7",
                  }}
                >
                  {pages.presentation?.description}
                </p>
              </div>
            </div>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e2e8f0",
                margin: "18px 0",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 14,
              }}
            >
              {(pages.presentation?.items || []).map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#1e293b" }}>
                    {item.title}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      color: "var(--text-light)",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          id="page-orggov-strategie"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.strategie?.title}
          </div>
          <div className="km-grid">
            <PaginatedDocuments items={visibleStrategieDocs}>
              {(visibleDocuments) => visibleDocuments.map((doc) => (
                <SimpleDocCard key={doc.protocolUri || doc.file} doc={doc} />
              ))}
            </PaginatedDocuments>
            {apiEnabled && visibleStrategieDocs.length === 0 ? (
              <div style={{ color: "var(--text-light)", fontSize: 13 }}>
                {directionGedState.loading ? "Chargement des documents..." : "Aucun document."}
              </div>
            ) : null}
          </div>
        </div>

        <div
          id="page-orggov-referentiels"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.referentiels?.title}
          </div>
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.referentiels?.foldersTitle}
                  icon="folder"
                  iconClass="purple"
                />
              </div>
              <div id="refDossiers" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.referentiels?.documentsTitle}
                  icon="file-text"
                  iconClass="blue"
                />
              </div>
              <div id="refDocs" className="doc-list" />
            </div>
          </div>
        </div>

        <div
          id="page-orggov-comites"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="app-category-title" style={{ marginBottom: 14 }}>
            {pages.comites?.title}
          </div>
          <div
            className="dashboard-grid"
            style={{
              gridTemplateColumns: "1.2fr 1.8fr",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.comites?.listTitle}
                  icon="users-round"
                  iconClass="orange"
                />
              </div>
              <div id="comitesList" className="doc-list" />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <CardTitle
                  title={pages.comites?.detailTitle}
                  icon="file-text"
                  iconClass="green"
                />
              </div>
              <div
                id="comitesDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                {pages.comites?.emptyDetail}
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header">
              <CardTitle
                title={pages.comites?.timelineTitle}
                icon="calendar-range"
                iconClass="blue"
              />
            </div>
            <div style={{ padding: 18 }}>
              <div id="orgGovComitesTimeline" />
            </div>
          </div>
        </div>

        <div id="page-orggov-smi-politiques" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-politiques"] || {}}>
            <div id="orgGovSmiPolitiques" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-chartes-codes" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-chartes-codes"] || {}}>
            <div id="orgGovSmiChartesCodes" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-cartographie" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-cartographie"] || {}}>
            <div id="orgGovSmiCartographie" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-dossiers" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-dossiers"] || {}}>
            <div id="orgGovSmiDossiers" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-pilotage" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-pilotage"] || {}}>
            <div id="orgGovSmiPilotage" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-gouvernance-interne" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-gouvernance-interne"] || {}}>
            <div id="orgGovSmiGovernance" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-audits" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-audits"] || {}}>
            <div id="orgGovSmiAudits" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-certification" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-certification"] || {}}>
            <div id="orgGovSmiCertification" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-smi-normes" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["smi-normes"] || {}}>
            <div id="orgGovSmiNormes" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-cartographie" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages.cartographie || {}}>
            <div id="orgGovCartographie" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-kpi-strategiques" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["kpi-strategiques"] || {}}>
            <div id="orgGovKpiStrategiques" style={{ padding: 18 }} />
          </DynamicCardPage>
        </div>
        <div id="page-orggov-rapports-gouvernance" className="km-tab-content" style={{ display: "none" }}>
          <DynamicCardPage page={pages["rapports-gouvernance"] || {}}>
            <div id="orgGovRapportsGouvernance" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DynamicCardPage>
        </div>

        {[
          ["culture-contenus", "orgGovCultureContents"],
          ["culture-faq", "orgGovCultureFaq"],
          ["culture-communication", "orgGovCultureCommunication"],
          ["culture-quiz", "orgGovCultureQuiz"],
          ["culture-idees", "orgGovCultureIdeas"],
          ["culture-remontees", "orgGovCultureRemontees"],
          ["culture-stats", "orgGovCultureStats"],
        ].map(([id, hostId]) => (
          <div key={id} id={`page-orggov-${id}`} className="km-tab-content" style={{ display: "none" }}>
            <DynamicCardPage page={pages[id] || {}}>
              <div id={hostId} style={{ padding: 18 }} />
            </DynamicCardPage>
          </div>
        ))}

        <RsePortalContent
          portal={rsePortal}
          documents={rseGedState.documents}
          loading={rseGedState.loading}
        />

        <div id="page-orggov-direction" className="km-tab-content" style={{ display: "none" }} />
      </div>
    </>
  );
}

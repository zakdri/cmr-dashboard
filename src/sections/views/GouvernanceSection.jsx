import React, { useEffect, useMemo, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { GED_ROOT_PATH, joinGedPath, shouldUseDocumentsApi } from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

function getGovernanceData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.governanceHeader || {},
    tabs: data.governanceTabs || [],
    director: data.governanceDirector || {},
    board: data.governanceBoard || {},
    committees: data.governanceCommittees || [],
    missions: data.governanceMissions || "",
    values: data.governanceValues || [],
    orgChart: data.governanceOrgChart || {},
  };
}

function SectionTitle({ icon, title, description }) {
  return (
    <div className="content-card governance-section-card">
      <div className="card-title">
        <div className="card-icon blue"><i data-lucide={icon} /></div>
        <div><h3>{title}</h3>{description ? <p>{description}</p> : null}</div>
      </div>
    </div>
  );
}

function DocumentRow({ file }) {
  const isGedDoc = file && typeof file === "object";
  const title = isGedDoc ? file.title || file.fileName : String(file || "").replaceAll("_", " ");
  const downloadFile = isGedDoc ? file.file : file;

  return (
    <button className="doc-row" type="button" onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(downloadFile)},${JSON.stringify(title)})`)}>
      <div className="doc-icon pdf">PDF</div>
      <div className="doc-info">
        <div className="doc-title">{title}</div>
        <div className="doc-meta">{isGedDoc ? file.folderLabel || file.fileName : "Document de gouvernance"}</div>
      </div>
      <i data-lucide="download" />
    </button>
  );
}

function GedStatus({ state }) {
  if (!shouldUseDocumentsApi()) return null;
  if (state.loading) return <p className="empty-state">Chargement des documents Moovapps...</p>;
  if (state.error) return <p className="empty-state">Les documents Moovapps ne sont pas disponibles pour le moment.</p>;
  return null;
}

function GovernanceNav({ items, activeId, onSelect, className = "" }) {
  return (
    <div className={`km-navbar governance-tabbar ${className}`.trim()}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 ? <span className="km-nav-separator">|</span> : null}
          <button type="button" data-governance-tab={item.id} className={`km-nav-item${activeId === item.id ? " active" : ""}`} onClick={() => onSelect(item.id)}>
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

function BoardPage({ board }) {
  const panels = [
    { title: "Description", icon: "file-text", iconClass: "blue", content: <p>{board.description}</p> },
    { title: "Missions", icon: "target", iconClass: "green", content: <ul>{(board.missions || []).map((item) => <li key={item}>{item}</li>)}</ul> },
    { title: "Composition", icon: "users-round", iconClass: "purple", content: <p>{board.composition}</p> },
    { title: "Règlement intérieur du Conseil", icon: "file-check-2", iconClass: "orange", content: <DocumentRow file={board.regulation} /> },
    { title: "Composition actuelle", icon: "network", iconClass: "blue", content: <div className="governance-composition-grid">{(board.currentComposition || []).map((item) => <div key={item}><i data-lucide="user-round-check" /><span>{item}</span></div>)}</div> },
  ];

  return <div className="governance-collapse-list">{panels.map((panel, index) => <details key={panel.title} open={index === 0}><summary><span className="governance-collapse-heading"><span className={`card-icon ${panel.iconClass}`}><i data-lucide={panel.icon} /></span><span>{panel.title}</span></span><i className="governance-collapse-chevron" data-lucide="chevron-down" /></summary><div className="governance-collapse-content">{panel.content}</div></details>)}</div>;
}

function CommitteeFilters({ committees, selected, onSelect }) {
  return <div className="governance-committee-filters">{committees.map((committee) => <button className={`governance-committee-card${committee.id === selected ? " active" : ""}`} key={committee.id} onClick={() => onSelect(committee.id)}><i data-lucide="landmark" /><span>{committee.name}</span></button>)}</div>;
}

export default function GouvernanceSection() {
  const { header, tabs, director, board, committees, missions, values, orgChart } = getGovernanceData();
  const [activeTab, setActiveTab] = useState("mot-directeur");
  const [systemTab, setSystemTab] = useState("conseil");
  const [selectedCommittee, setSelectedCommittee] = useState(committees[0]?.id || "");
  const [documentQuery, setDocumentQuery] = useState("");
  const isViewActive = useViewActive("gouvernance");
  const governanceGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Gouvernance", "Système de gouvernance", "Espace documentaire"), { enabled: isViewActive && activeTab === "systeme" && systemTab === "documents" });
  const committeesGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Gouvernance", "Système de gouvernance", "Comités spécialisés"), { enabled: isViewActive && activeTab === "systeme" && systemTab === "comites" });
  const committee = useMemo(() => committees.find((item) => item.id === selectedCommittee) || committees[0] || {}, [committees, selectedCommittee]);
  const documents = shouldUseDocumentsApi() && !governanceGedState.error
    ? governanceGedState.documents.filter((doc) => [doc.title, doc.fileName, doc.folderLabel].join(" ").toLowerCase().includes(documentQuery.toLowerCase()))
    : (committee.documents || []).filter((file) => file.toLowerCase().includes(documentQuery.toLowerCase()));
  const committeeGedDocs = shouldUseDocumentsApi() && !committeesGedState.error
    ? committeesGedState.documents.filter((doc) => [doc.title, doc.fileName, doc.folderLabel, doc.folderPath].join(" ").toLowerCase().includes((committee.name || "").toLowerCase()))
    : [];

  useEffect(() => {
    function switchTab(event) { setActiveTab(event.detail?.tab || "mot-directeur"); }
    window.addEventListener("cmr:governance-tab", switchTab);
    window.lucide?.createIcons();
    return () => window.removeEventListener("cmr:governance-tab", switchTab);
  }, []);

  useEffect(() => { window.lucide?.createIcons(); }, [activeTab, systemTab, selectedCommittee, documentQuery, governanceGedState, committeesGedState]);

  return (
    <div id="view-gouvernance" className="view-section km-container">
      <div className="km-header"><h2>{header.title}</h2><p>{header.description}</p></div>
      <div id="governanceMainNavbar">
        <GovernanceNav items={tabs} activeId={activeTab} onSelect={setActiveTab} className="governance-navbar" />
      </div>

      {activeTab === "mot-directeur" ? <article className="content-card governance-director-article"><img src={director.photo} alt="Directeur Général de la CMR" /><div><span className="governance-eyebrow">Mot du Directeur</span><h3>{director.title}</h3><p>{director.description}</p><div className="governance-signature">{director.name}</div></div></article> : null}

      {activeTab === "systeme" ? (
        <div>
          <p className="section-intro">Le système de gouvernance regroupe les instances décisionnelles, les comités spécialisés et leurs documents de référence.</p>
          <GovernanceNav className="governance-system-tabs" activeId={systemTab} onSelect={setSystemTab} items={[{ id: "conseil", label: "Conseil d'administration" }, { id: "comites", label: "Comités spécialisés" }, { id: "documents", label: "Espace documentaire" }]} />
          {systemTab === "conseil" ? <div className="content-card governance-system-panel"><h3>Conseil d'administration</h3><p className="section-intro">Instance centrale d'orientation, de décision et de supervision de la CMR.</p><BoardPage board={board} /></div> : null}
          {systemTab === "comites" ? <div className="content-card governance-system-panel"><h3>Comités spécialisés</h3><CommitteeFilters committees={committees} selected={selectedCommittee} onSelect={setSelectedCommittee} /><div className="governance-committee-detail"><h4>{committee.name}</h4><p>{committee.description}</p><div className="governance-detail-grid"><div><h5>Missions</h5><ul>{(committee.missions || []).map((item) => <li key={item}>{item}</li>)}</ul></div><div><h5>Membres</h5><ul>{(committee.members || []).map((item) => <li key={item}>{item}</li>)}</ul></div></div><GedStatus state={committeesGedState} />{committeeGedDocs.length ? committeeGedDocs.map((doc) => <DocumentRow file={doc} key={doc.id || doc.fileName} />) : <DocumentRow file={committee.charter} />}</div></div> : null}
          {systemTab === "documents" ? <div className="content-card governance-system-panel"><div className="governance-access-note"><i data-lucide="lock-keyhole" /><div><strong>Accès restreint</strong><span>Les documents sont affichés selon les habilitations du profil connecté.</span></div></div><div className="section-search-row"><i data-lucide="search" /><input value={documentQuery} onChange={(event) => setDocumentQuery(event.target.value)} placeholder="Rechercher un document de gouvernance..." /></div><GedStatus state={governanceGedState} /><div className="governance-document-list">{documents.map((file) => <DocumentRow file={file} key={typeof file === "string" ? file : file.id || file.fileName} />)}{!governanceGedState.loading && !documents.length ? <p className="empty-state">Aucun document trouvé.</p> : null}</div></div> : null}
        </div>
      ) : null}

      {activeTab === "missions-valeurs" ? <div className="governance-missions-layout"><SectionTitle icon="target" title="Nos Missions" description={missions} /><div className="content-card"><h3>Nos Valeurs</h3><div className="governance-values-map">{values.map((value) => <div className={`governance-value governance-value-${value.id}`} key={value.id}><i data-lucide={value.icon} /><span>{value.label}</span></div>)}</div></div></div> : null}

      {activeTab === "organigramme" ? <div className="content-card governance-org-chart"><h3>Organigramme de la CMR</h3><p className="section-intro">Une vue synthétique des principaux rattachements de l'organisation.</p><img src={orgChart.image} alt="Organigramme de la CMR" /><button className="primary-btn" onClick={(event) => runLegacyHandler(event, "switchView('institutionnel'); switchOrgGovTab('organigramme')")}>{orgChart.linkLabel}<i data-lucide="arrow-right" /></button></div> : null}
    </div>
  );
}

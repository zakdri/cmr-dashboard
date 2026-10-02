import React, { useEffect, useMemo, useState } from "react";
import { icons } from "lucide";
import PaginatedDocuments from "../../components/PaginatedDocuments.jsx";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";
import { GED_ROOT_PATH, getDocumentFileKind, joinGedPath, shouldUseDocumentsApi } from "../../services/gedDocuments.js";
import { useGedDocuments, useViewActive } from "../../services/useGedDocuments.js";

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

function getGovernanceData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.governanceHeader || {},
    tabs: data.governanceTabs || [],
    director: data.governanceDirector || {},
    board: data.governanceBoard || {},
    committees: data.governanceCommittees || [],
    committeesIntroduction: data.governanceCommitteesIntroduction || "",
    missions: data.governanceMissions || "",
    missionItems: data.governanceMissionItems || [],
    values: data.governanceValues || [],
    orgChart: data.governanceOrgChart || {},
  };
}

function MemberTable({ members = [] }) {
  return (
    <div className="governance-member-table-wrap">
      <table className="governance-member-table">
        <thead><tr><th>Membre</th><th>Qualité</th></tr></thead>
        <tbody>{members.map((member, index) => <tr key={`${member.name}-${index}`}><td>{member.name}</td><td>{member.role}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function CurrentComposition({ groups = [] }) {
  return <div className="governance-composition-sections">{groups.map((group) => <section key={group.title}><h5>{group.title}</h5><MemberTable members={group.members} /></section>)}</div>;
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
  const fileKind = getDocumentFileKind(isGedDoc ? file : downloadFile);

  return (
    <button className="doc-row" type="button" onClick={(event) => runLegacyHandler(event, `openMockDownload(${JSON.stringify(downloadFile)},${JSON.stringify(title)})`)}>
      <div className={`doc-icon${fileKind === "PDF" ? " pdf" : ""}`}>{fileKind}</div>
      <div className="doc-info">
        <div className="doc-title">{title}</div>
        {!isGedDoc ? <div className="doc-meta">Document de gouvernance</div> : null}
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
  const [openPanel, setOpenPanel] = useState("Description");
  const panels = [
    { title: "Description", icon: "file-text", iconClass: "blue", content: <p className="governance-rich-text">{board.description}</p> },
    { title: "Missions", icon: "target", iconClass: "green", content: <><p className="governance-rich-text">{board.missionsIntroduction}</p><ul>{(board.missions || []).map((item) => <li key={item}>{item}</li>)}</ul></> },
    { title: "Composition", icon: "users-round", iconClass: "purple", content: <p className="governance-rich-text">{board.composition}</p> },
    { title: "Composition actuelle", icon: "network", iconClass: "blue", content: <CurrentComposition groups={board.currentComposition} /> },
  ];

  return <div className="governance-collapse-list">{panels.map((panel) => <details key={panel.title} open={openPanel === panel.title}><summary onClick={(event) => { event.preventDefault(); setOpenPanel((current) => current === panel.title ? null : panel.title); }}><span className="governance-collapse-heading"><span className={`card-icon ${panel.iconClass}`}><i data-lucide={panel.icon} /></span><span>{panel.title}</span></span><i className="governance-collapse-chevron" data-lucide="chevron-down" /></summary><div className="governance-collapse-content">{panel.content}</div></details>)}</div>;
}

function CommitteeFilters({ committees, selected, onSelect }) {
  return <div className="governance-committee-filters">{committees.map((committee) => <button className={`governance-committee-card${committee.id === selected ? " active" : ""}`} key={committee.id} onClick={() => onSelect(committee.id)}><i data-lucide="landmark" /><span>{committee.name}</span></button>)}</div>;
}

export default function GouvernanceSection() {
  const { header, tabs, director, board, committees, committeesIntroduction, missions, missionItems } = getGovernanceData();
  const [activeTab, setActiveTab] = useState("mot-directeur");
  const [systemTab, setSystemTab] = useState("conseil");
  const [selectedCommittee, setSelectedCommittee] = useState(committees[0]?.id || "");
  const [documentQuery, setDocumentQuery] = useState("");
  const [isOrgChartExpanded, setIsOrgChartExpanded] = useState(false);
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(0);
  const isViewActive = useViewActive("gouvernance");
  const apiEnabled = shouldUseDocumentsApi();
  const governanceGedState = useGedDocuments(joinGedPath(GED_ROOT_PATH, "Gouvernance"), { enabled: isViewActive && activeTab === "systeme" });
  const committee = useMemo(() => committees.find((item) => item.id === selectedCommittee) || committees[0] || {}, [committees, selectedCommittee]);
  const selectedMission = missionItems[selectedMissionIndex] || missionItems[0] || {};
  const missionIcons = ["briefcase-business", "landmark", "chart-no-axes-combined"];
  const documents = apiEnabled
    ? governanceGedState.documents.filter((doc) => [doc.title, doc.fileName, doc.folderLabel].join(" ").toLowerCase().includes(documentQuery.toLowerCase()))
    : (committee.documents || []).filter((file) => file.toLowerCase().includes(documentQuery.toLowerCase()));

  useEffect(() => {
    function switchTab(event) { setActiveTab(event.detail?.tab || "mot-directeur"); }
    window.addEventListener("cmr:governance-tab", switchTab);
    window.lucide?.createIcons();
    return () => window.removeEventListener("cmr:governance-tab", switchTab);
  }, []);

  useEffect(() => { window.lucide?.createIcons(); }, [activeTab, systemTab, selectedCommittee, documentQuery, governanceGedState]);

  useEffect(() => {
    if (activeTab !== "organigramme") {
      setIsOrgChartExpanded(false);
      return undefined;
    }
    const frame = requestAnimationFrame(() => {
      window.renderOrgTree?.("governanceOrgTree", "governance-org");
      window.lucide?.createIcons();
    });
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);

  useEffect(() => {
    if (!isOrgChartExpanded) return undefined;
    document.body.classList.add("org-chart-expanded");
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOrgChartExpanded(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("org-chart-expanded");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOrgChartExpanded]);

  return (
    <div id="view-gouvernance" className="view-section km-container">
      <div className="km-header"><h2>{header.title}</h2><p>{header.description}</p></div>
      <div id="governanceMainNavbar">
        <GovernanceNav
          items={tabs}
          activeId={activeTab}
          onSelect={(tabId) => {
            setActiveTab(tabId);
            window.switchGovernanceTab?.(tabId);
          }}
          className="governance-navbar"
        />
      </div>

      {activeTab === "mot-directeur" ? (
        <article className="content-card governance-director-article">
          <img
            src={director.photo}
            alt="M. Lotfi Boujendar, Directeur de la Caisse Marocaine de la Retraite"
          />
          <div>
            <span className="governance-eyebrow">Mot du Directeur</span>
            <h3>{director.title}</h3>
            <p>{director.description}</p>
            <div className="governance-signature">
              <span>{director.signatureTitle}</span>
              <strong>{director.name}</strong>
            </div>
          </div>
        </article>
      ) : null}

      {activeTab === "systeme" ? (
        <div>
          <GovernanceNav className="governance-system-tabs" activeId={systemTab} onSelect={setSystemTab} items={[{ id: "conseil", label: "Conseil d’Administration" }, { id: "comites", label: "Comités spécialisés" }, { id: "documents", label: "Espace documentaire" }]} />
          {systemTab === "conseil" ? <div className="content-card governance-system-panel"><h3>Conseil d’Administration</h3><p className="section-intro">{board.introduction}</p><BoardPage board={board} /></div> : null}
          {systemTab === "comites" ? <div className="content-card governance-system-panel"><h3>Comités spécialisés</h3><p className="section-intro">{committeesIntroduction}</p><CommitteeFilters committees={committees} selected={selectedCommittee} onSelect={setSelectedCommittee} /><div className="governance-committee-detail"><h4>{committee.name}</h4><p className="governance-rich-text">{committee.description}</p><div className="governance-committee-section"><h5>Principales Missions</h5><ul>{(committee.missions || []).map((item) => <li key={item}>{item}</li>)}</ul></div><div className="governance-committee-section"><h5>Membres du comité</h5><MemberTable members={committee.members} /></div></div></div> : null}
          {systemTab === "documents" ? <div className="content-card governance-system-panel"><div className="governance-access-note"><ReactLucideIcon name="lock-keyhole" /><div><strong>Accès restreint</strong></div></div><div className="section-search-row"><i data-lucide="search" /><input value={documentQuery} onChange={(event) => setDocumentQuery(event.target.value)} placeholder="Rechercher un document de gouvernance..." /></div><GedStatus state={governanceGedState} /><div className="governance-document-list"><PaginatedDocuments items={documents} resetKey={documentQuery}>{(visibleDocuments) => visibleDocuments.map((file) => <DocumentRow file={file} key={typeof file === "string" ? file : file.id || file.fileName} />)}</PaginatedDocuments>{!governanceGedState.loading && !documents.length ? <p className="empty-state">Aucun document trouvé.</p> : null}</div></div> : null}
        </div>
      ) : null}

      {activeTab === "missions-valeurs" ? <div className="governance-missions-layout"><SectionTitle icon="target" title="Nos Missions" description={missions} /><div className="governance-mission-filters">{missionItems.map((mission, index) => <button type="button" className={`governance-committee-card${index === selectedMissionIndex ? " active" : ""}`} key={mission.title} onClick={() => setSelectedMissionIndex(index)} aria-pressed={index === selectedMissionIndex}><ReactLucideIcon name={missionIcons[index] || "target"} /><span>{mission.title}</span></button>)}</div><article className="governance-mission-detail"><div className="governance-mission-detail-heading"><span><ReactLucideIcon name={missionIcons[selectedMissionIndex] || "target"} /></span><h3>{`Mission ${selectedMissionIndex + 1} – ${selectedMission.title || ""}`}</h3></div><p>{selectedMission.description}</p>{selectedMission.items?.length ? <ul>{selectedMission.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}</article><div className="content-card"><h3>Nos Valeurs</h3><img className="governance-values-image" src="images/intranet/gouvernance-valeurs.png" alt="Valeurs de la CMR : Innovation, Collaboration, Client Centric, Agilité et Durabilité" /></div></div> : null}

      {activeTab === "organigramme" ? (
        <div className={`cmr-org-chart-viewer${isOrgChartExpanded ? " is-expanded" : ""}`}>
          <div className="cmr-org-chart-toolbar">
            <div>
              <div className="app-category-title" style={{ margin: 0 }}>Organigramme</div>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--text-light)" }}>Découvrez l’organisation interne de la CMR.</p>
            </div>
            <button
              type="button"
              className="cmr-org-fullscreen-button"
              onClick={() => setIsOrgChartExpanded((expanded) => !expanded)}
              aria-pressed={isOrgChartExpanded}
              title={isOrgChartExpanded ? "Réduire l’organigramme" : "Agrandir l’organigramme dans la page"}
            >
              <i data-lucide={isOrgChartExpanded ? "minimize-2" : "maximize-2"} aria-hidden="true" />
              <span>{isOrgChartExpanded ? "Réduire" : "Agrandir"}</span>
            </button>
          </div>
          <div className="cmr-org-chart-shell">
            <div id="governanceOrgTree" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

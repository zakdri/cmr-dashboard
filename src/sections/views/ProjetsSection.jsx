import React, { useEffect, useState } from "react";
import { icons } from "lucide";
import { GED_ROOT_PATH, joinGedPath, normalizeGedKey } from "../../services/gedDocuments.js";
import { configuredLink, fetchGedFile } from "../../services/moovappsPlatform.js";
import { useGedDocuments } from "../../services/useGedDocuments.js";

const STRATEGY_VISION_PATH = joinGedPath(
  GED_ROOT_PATH,
  "Stratégie & Projets CMR",
  "Stratégie CMR",
  "Vision & Orientations",
);

const PROJECT_TOOLS_PATH = joinGedPath(
  GED_ROOT_PATH,
  "Stratégie & Projets CMR",
  "Projets CMR",
  "Démarche",
  "Mes outils",
);

function LucideIcon({ name, ...props }) {
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

async function downloadProjectTool(event, documentItem, fallbackName) {
  if (!documentItem?.protocolUri) return;
  event.preventDefault();

  try {
    const { blob, fileName } = await fetchGedFile(documentItem.protocolUri, fallbackName);
    if (!blob?.size) throw new Error("Fichier vide");

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName || fallbackName || "document";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch (error) {
    console.error("Téléchargement de l’outil projet impossible :", error);
    window.alert("Le document est indisponible dans Moovapps. Veuillez réessayer.");
  }
}

function getSpace() {
  const data = window.CMR_DATA?.data || {};
  return { header: data.projetsHeader || {}, content: data.strategieProjetsSpace || {} };
}

function Tabs({ items, active, change, label }) {
  return (
    <div className="km-navbar governance-tabbar cmr-space-tabs" role="tablist" aria-label={label}>
      {items.map(({ id, title }, index) => (
        <React.Fragment key={id}>
          {index > 0 ? <span className="km-nav-separator" aria-hidden="true">|</span> : null}
          <button type="button" role="tab" aria-selected={active === id} className={`km-nav-item${active === id ? " active" : ""}`} onClick={() => change(id)}>{title}</button>
        </React.Fragment>
      ))}
    </div>
  );
}

function StrategicPlanDocument({ plan }) {
  const state = useGedDocuments(STRATEGY_VISION_PATH);
  const documentItem = state.documents.find((item) => /\.pdf$/i.test(item.fileName || item.title || ""));
  const [fileState, setFileState] = useState(() => ({
    loading: Boolean(documentItem?.protocolUri),
    url: documentItem?.protocolUri ? "" : documentItem?.file || "",
    error: null,
  }));

  useEffect(() => {
    let cancelled = false;
    let objectUrl = "";
    if (!documentItem?.protocolUri) {
      setFileState({ loading: false, url: documentItem?.file || "", error: null });
      return () => {};
    }

    setFileState({ loading: true, url: "", error: null });
    fetchGedFile(documentItem.protocolUri, documentItem.fileName)
      .then(({ blob }) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setFileState({ loading: false, url: objectUrl, error: null });
      })
      .catch((error) => {
        if (!cancelled) setFileState({ loading: false, url: "", error });
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [documentItem?.protocolUri, documentItem?.file, documentItem?.fileName]);

  const previewUrl = fileState.url;

  return (
    <section className="cmr-space-section cmr-space-documents cmr-strategy-document">
      <div className="cmr-space-heading"><h4>{plan?.title}</h4></div>
      {plan?.description ? <p>{plan.description}</p> : null}
      {state.loading ? <p className="empty-state">Chargement du document Moovapps...</p> : null}
      {!state.loading && state.error ? <p className="empty-state">Le document Moovapps n’est pas disponible pour le moment.</p> : null}
      {!state.loading && !state.error && !documentItem ? <p className="empty-state">Aucun document PDF disponible dans ce dossier.</p> : null}
      {documentItem && fileState.loading ? <p className="empty-state">Chargement de l’aperçu...</p> : null}
      {documentItem && fileState.error ? <p className="empty-state">L’aperçu du document n’est pas disponible pour le moment.</p> : null}
      {documentItem && previewUrl ? (
        <div className="cmr-strategy-pdf">
          <div className="cmr-strategy-pdf-actions">
            <a className="secondary-btn" href={previewUrl} target="_blank" rel="noreferrer"><LucideIcon name="external-link" />Ouvrir</a>
            <a className="secondary-btn" href={previewUrl} download={documentItem.fileName}><LucideIcon name="download" />Télécharger</a>
          </div>
          <iframe className="cmr-strategy-pdf-frame" src={previewUrl} title={documentItem.title || documentItem.fileName || "Document PDF"} />
        </div>
      ) : null}
    </section>
  );
}

function Vision({ strategy }) {
  return (
    <div className="cmr-space-content">
      <div className="cmr-space-heading"><h3>Vision &amp; Orientations</h3></div>
      <section className="content-card cmr-strategy-vision">
        <blockquote>« {strategy.vision?.statement} »</blockquote>
        <div className="cmr-strategy-band-title">Nos Orientations Stratégiques</div>
        <div className="cmr-strategy-os-grid">
          {(strategy.vision?.strategicOrientations || []).map((item) => <article key={item.code}><LucideIcon name={item.icon} /><p><strong>{item.code}</strong> - {item.title}</p></article>)}
        </div>
        <div className="cmr-strategy-band-title">Nos Enablers</div>
        <div className="cmr-strategy-enablers">
          {(strategy.vision?.enablers || []).map((item, index) => <article key={`${item.code}-${index}`}><p><strong>{item.code}</strong> - {item.title}</p><LucideIcon name={item.icon} /></article>)}
        </div>
      </section>
      <StrategicPlanDocument plan={strategy.plan} />
    </div>
  );
}

function Review({ review, exampleLabel }) {
  const charters = review.charters || [];
  const kpis = review.kpis || [];
  return (
    <div className="cmr-space-content">
      <div className="cmr-space-heading"><h3>{review.title}</h3>{exampleLabel ? <span className="cmr-space-example">{exampleLabel}</span> : null}</div>
      <p className="cmr-space-lead">{review.summary}</p>
      {charters.length ? <section className="cmr-space-section">
        <h4>Chartes</h4>
        <div className="cmr-space-charters">
          {charters.map((charter) => <article className="cmr-space-charter" key={charter.id}><img src={charter.image} alt={charter.imageAlt} loading="lazy" /><div><strong>{charter.title}</strong><p>{charter.description}</p></div></article>)}
        </div>
      </section> : null}
      {kpis.length ? <section className="cmr-space-section"><h4>KPI</h4><div className="cmr-space-kpis">{kpis.map((kpi) => <div className="cmr-space-kpi" key={kpi.id}><strong>{kpi.value}</strong><span>{kpi.label}</span></div>)}</div></section> : null}
    </div>
  );
}

function Approach({ approach }) {
  const toolsState = useGedDocuments(PROJECT_TOOLS_PATH);
  const toolDocument = (tool) => {
    const aliases = (tool.documentAliases?.length ? tool.documentAliases : [tool.label])
      .map(normalizeGedKey)
      .filter(Boolean);
    return toolsState.documents.find((documentItem) => {
      const documentKey = normalizeGedKey(
        [documentItem.title, documentItem.fileName, documentItem.folderLabel].filter(Boolean).join(" "),
      );
      return aliases.some((alias) => documentKey.includes(alias));
    });
  };

  return (
    <div className="cmr-space-content">
      <section className="cmr-project-journey">
        <header className="cmr-project-journey-header">
          <div><h3>{approach.heading}</h3><p>{approach.tagline}</p></div>
          <strong>{approach.slogan}</strong>
        </header>

        <div className="cmr-space-approach" aria-label="Étapes du parcours du chef de projet">
          {(approach.steps || []).map((step, index) => <article className={`cmr-space-approach-step cmr-space-approach-${step.tone || "blue"}`} key={step.id}><span className="cmr-space-step-number">{String(index + 1).padStart(2, "0")}</span><div className="cmr-space-step-heading"><span className="cmr-space-step-icon"><LucideIcon name={step.icon} /></span><h4>{step.title}</h4></div><p className="cmr-space-step-subtitle">{step.subtitle}</p><ul>{(step.items || []).map((item) => <li key={item}>{item}</li>)}</ul></article>)}
        </div>

        <section className="cmr-project-transverse cmr-project-governance">
          <div className="cmr-project-transverse-title"><span><LucideIcon name={approach.governance?.icon} /></span><div><h4>{approach.governance?.title}</h4><p>{approach.governance?.subtitle}</p></div></div>
          <div className="cmr-project-governance-items">
            {(approach.governance?.items || []).map((item) => <div key={item.title}><span><LucideIcon name={item.icon} /></span><p><strong>{item.title}</strong><small>{item.description}</small></p></div>)}
          </div>
        </section>

        <section className="cmr-project-transverse cmr-project-tools">
          <div className="cmr-project-transverse-title"><span><LucideIcon name={approach.tools?.icon} /></span><div><h4>{approach.tools?.title}</h4><p>{approach.tools?.subtitle}</p></div></div>
          <div className="cmr-project-tool-links">
            {(approach.tools?.items || []).map((item) => {
              const tool = typeof item === "string" ? { label: item } : item;
              if (tool.external) {
                return <a key={tool.label} href={configuredLink(tool.configKey, tool.href || "#")} target="_blank" rel="noopener noreferrer">{tool.label}<LucideIcon name="external-link" /></a>;
              }

              const documentItem = toolDocument(tool);
              if (!documentItem) return <span key={tool.label} title="Document non disponible dans la GED">{tool.label}</span>;

              const fileName = documentItem.fileName || documentItem.title || `${tool.label}.pdf`;
              const isPdf = /\.pdf$/i.test(fileName);
              const href = documentItem.file || "#";
              return (
                <a
                  key={tool.label}
                  href={href}
                  target={isPdf ? "_blank" : undefined}
                  rel={isPdf ? "noreferrer" : undefined}
                  download={isPdf || documentItem.protocolUri ? undefined : fileName}
                  onClick={isPdf ? undefined : (event) => downloadProjectTool(event, documentItem, fileName)}
                >
                  {tool.label}<LucideIcon name={isPdf ? "external-link" : "download"} />
                </a>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}

function Projects({ axes = [] }) {
  const [selectedAxisId, setSelectedAxisId] = useState(axes[0]?.id || "");
  const selectedAxis = axes.find((axis) => axis.id === selectedAxisId) || axes[0];

  useEffect(() => {
    if (!axes.some((axis) => axis.id === selectedAxisId)) setSelectedAxisId(axes[0]?.id || "");
  }, [axes, selectedAxisId]);

  return (
    <div className="cmr-space-content">
      <div className="cmr-space-heading"><h3>Projets CMR</h3></div>
      {selectedAxis ? (
        <div className="cmr-pas-layout">
          <nav className="cmr-pas-axis-list" aria-label="Orientations stratégiques et enablers">
            {axes.map((axis) => (
              <button
                type="button"
                key={axis.id}
                className={selectedAxis.id === axis.id ? "active" : ""}
                aria-pressed={selectedAxis.id === axis.id}
                onClick={() => setSelectedAxisId(axis.id)}
              >
                <span>{axis.code}</span>
                <strong>{axis.title}</strong>
                <small>{axis.projects?.length || 0} projet(s)</small>
                <LucideIcon name="chevron-right" />
              </button>
            ))}
          </nav>

          <section className="cmr-pas-table-panel">
            <header><span>{selectedAxis.code}</span><h4>{selectedAxis.title}</h4></header>
            <div className="cmr-pas-table-scroll">
              <table>
                <colgroup><col /><col className="cmr-pas-year-column" /><col className="cmr-pas-structure-column" /></colgroup>
                <thead><tr><th>Projets stratégiques</th><th>Année</th><th>Structure</th></tr></thead>
                <tbody>
                  {(selectedAxis.projects || []).map((project, index) => (
                    <tr key={`${project.project}-${project.year}-${index}`}>
                      <td>{project.project}</td>
                      <td>{project.year}</td>
                      <td>{project.structure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : <p className="cmr-space-empty">Aucun projet disponible.</p>}
    </div>
  );
}

export default function ProjetsSection() {
  const { header, content } = getSpace();
  const [major, setMajor] = useState("strategy");
  const [strategyPage, setStrategyPage] = useState("vision");
  const [projectsPage, setProjectsPage] = useState("approach");
  const strategy = content.strategy || {};
  const projects = content.projects || {};
  return (
    <div id="view-projets" className="view-section km-container cmr-space">
      <div className="km-header"><h2>{header.title}</h2>{header.description ? <p>{header.description}</p> : null}</div>
      <p className="cmr-space-intro">{content.intro}</p>
      <Tabs label="Rubriques de Stratégie et Projets CMR" items={[{ id: "strategy", title: strategy.title || "Stratégie CMR" }, { id: "projects", title: projects.title || "Projets CMR" }]} active={major} change={setMajor} />
      <div className="cmr-space-summary"><h3>{major === "strategy" ? strategy.title : projects.title}</h3><p>{major === "strategy" ? strategy.summary : projects.summary}</p></div>
      {major === "strategy" ? (
        <>
          <Tabs label="Sous-rubriques Stratégie CMR" items={[{ id: "vision", title: "Vision & Orientations" }, { id: "review", title: "Bilan stratégique" }]} active={strategyPage} change={setStrategyPage} />
          {strategyPage === "vision" ? <Vision strategy={strategy} /> : <Review review={strategy.review || {}} exampleLabel={content.exampleLabel} />}
        </>
      ) : (
        <>
          <Tabs label="Sous-rubriques Projets CMR" items={[{ id: "approach", title: "Démarche" }, { id: "projects", title: "Projets CMR" }]} active={projectsPage} change={setProjectsPage} />
          {projectsPage === "approach" ? <Approach approach={projects.approach || {}} /> : <Projects axes={projects.axes || []} />}
        </>
      )}
    </div>
  );
}

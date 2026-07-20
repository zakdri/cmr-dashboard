import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getInnovationData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.innovationHeader || {},
    tabs: data.innovationTabs || [],
    pages: data.innovationPages || {},
    spontaneousThemes: data.innovationSpontaneousThemeOptions || [],
    cmrInnovThemes: data.innovationCmrInnovThemeOptions || [],
  };
}

function CardTitle({ page }) {
  return (
    <div className="card-title">
      <div className={`card-icon ${page.iconClass}`}>
        <i data-lucide={page.icon} style={{ width: 20, height: 20 }} />
      </div>
      {page.title}
    </div>
  );
}

function DashboardCard({ page, children, action }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle page={page} />
        {action}
      </div>
      {children}
    </div>
  );
}

function SubNav({ items, activeId }) {
  return (
    <div
      className="km-navbar"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        marginBottom: 16,
        borderBottom: "1px solid #e2e8f0",
        overflowX: "auto",
        flexWrap: "nowrap",
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
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
            className={`km-nav-item${item.id === activeId ? " active" : ""}`}
            onClick={(event) => runLegacyHandler(event, item.handler)}
            style={{ whiteSpace: "nowrap", padding: "10px 14px" }}
          >
            {item.label}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function FormControl({ label, children }) {
  return (
    <label htmlFor={children.props.id} style={{ display: "grid", gap: 7, minWidth: 0 }}>
      <span style={{ color: "var(--text-dark)", fontSize: 13, fontWeight: 700, lineHeight: 1.35 }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function Field({ id, label, placeholder, as = "input", type = "text" }) {
  if (as === "textarea") {
    return (
      <FormControl label={label || placeholder}>
        <textarea
          id={id}
          className="actu-search-input"
          placeholder={placeholder}
          style={{ height: 96, paddingTop: 10 }}
        />
      </FormControl>
    );
  }

  return (
    <FormControl label={label || placeholder}>
      <input id={id} className="actu-search-input" type={type} placeholder={placeholder} />
    </FormControl>
  );
}

function SearchField({ id, placeholder, handler }) {
  return (
    <div style={{ padding: "0 18px 12px" }}>
      <input
        id={id}
        className="actu-search-input"
        type="search"
        placeholder={placeholder}
        onInput={(event) => runLegacyHandler(event, handler)}
      />
    </div>
  );
}

function ThemeSelect({ id, themes, label = "Thème" }) {
  return (
    <FormControl label={label}>
      <select id={id} className="actu-search-input" style={{ height: 40 }}>
        {themes.map((theme) => (
          <option value={theme} key={theme}>
            {theme}
          </option>
        ))}
      </select>
    </FormControl>
  );
}

function FileInput({ id, accept, label }) {
  return (
    <FormControl label={label}>
      <input
        id={id}
        className="actu-search-input"
        type="file"
        accept={accept}
        style={{ paddingTop: 8 }}
      />
    </FormControl>
  );
}

export default function InnovationSection() {
  const { header, tabs, pages, spontaneousThemes, cmrInnovThemes } = getInnovationData();
  const suivi = pages.suivi || {};
  const espaceIdees = pages["espace-idees"] || {};
  const innovEvent = pages["innov-event"] || {};

  return (
    <div id="view-innovation" className="view-section km-container">
      <div className="km-header">
        <h2>{header.title}</h2>
        <p>{header.description}</p>
      </div>

      <div
        className="km-navbar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          marginBottom: 18,
          borderBottom: "2px solid #e2e8f0",
          overflowX: "auto",
          flexWrap: "nowrap",
        }}
      >
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            {index > 0 && (
              <span style={{ color: "#cbd5e1", fontWeight: 300, fontSize: 18, lineHeight: 1, alignSelf: "center", flexShrink: 0 }}>
                |
              </span>
            )}
            <div
              data-innovation-tab={tab.id}
              className={`km-nav-item${index === 0 ? " active" : ""}`}
              onClick={(event) => runLegacyHandler(event, `switchInnovationTab('${tab.id}')`)}
              style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
            >
              {tab.label}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div id="page-innovation-suivi" className="km-tab-content" style={{ display: "block" }}>
        <p style={{ color: "var(--text-light)", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
          {suivi.description}
        </p>
        <SubNav
          activeId="fiches-projets"
          items={[
            { id: "fiches-projets", label: suivi.projectSheetLabel, handler: "switchInnovationProjectSub('fiches-projets')" },
            { id: "projets-idees", label: suivi.projectIdeasLabel, handler: "switchInnovationProjectSub('projets-idees')" },
          ]}
        />

        <div id="innovationProjectFiches" className="innovation-project-sub">
          <DashboardCard
            page={suivi}
            action={
              <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "toggleInnovationProjectForm()")}>
                {suivi.addProjectLabel}
              </button>
            }
          >
            <div id="innovationProjectForm" style={{ display: "none", padding: 18, borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FileInput id="projectImage" accept="image/*" label="Image du projet" />
                <Field id="projectTitle" placeholder="Titre du projet" />
                <Field id="projectSummary" placeholder="Synthèse du projet" />
                <Field id="projectObjective" placeholder="Objectif" />
                <Field id="projectTeam" placeholder="Équipe projet" />
                <Field id="projectMentor" placeholder="Mentor" />
              </div>
              <div style={{ marginTop: 12 }}>
                <Field id="projectInsights" placeholder="Insights" as="textarea" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitInnovationProject()")}>
                  Ajouter
                </button>
              </div>
            </div>
            <SearchField
              id="projectSheetSearch"
              placeholder="Rechercher une fiche projet..."
              handler="renderInnovationProjectCards()"
            />
            <div id="innovationProjectCards" style={{ padding: 18 }} />
          </DashboardCard>
        </div>

        <div id="innovationProjectIdeas" className="innovation-project-sub" style={{ display: "none" }}>
          <DashboardCard page={{ ...suivi, title: suivi.projectIdeasLabel, icon: "lightbulb", iconClass: "green" }}>
            <SearchField
              id="projectIdeaSearch"
              placeholder="Rechercher un projet idée..."
              handler="renderInnovationProjectIdeaCards()"
            />
            <div id="innovationProjectIdeaCards" style={{ padding: 18 }} />
          </DashboardCard>
        </div>
      </div>

      <div id="page-innovation-project-detail" className="km-tab-content" style={{ display: "none" }}>
        <DashboardCard
          page={{ ...suivi, title: suivi.projectDetailTitle, icon: "file-text", iconClass: "purple" }}
          action={
            <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "backToInnovationProjectList('fiches-projets')")}>
              Retour
            </button>
          }
        >
          <div id="innovationProjectDetail" style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
            Sélectionnez un projet.
          </div>
        </DashboardCard>
      </div>

      <div id="page-innovation-project-idea-detail" className="km-tab-content" style={{ display: "none" }}>
        <DashboardCard
          page={{ ...suivi, title: suivi.ideaDetailTitle, icon: "file-text", iconClass: "purple" }}
          action={
            <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "backToInnovationProjectList('projets-idees')")}>
              Retour
            </button>
          }
        >
          <div id="innovationProjectIdeaDetail" style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
            Sélectionnez un projet idée.
          </div>
        </DashboardCard>
      </div>

      <div id="page-innovation-espace-idees" className="km-tab-content" style={{ display: "none" }}>
        <p style={{ color: "var(--text-light)", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
          {espaceIdees.description}
        </p>
        <SubNav
          activeId="depot-idee"
          items={[
            { id: "depot-idee", label: espaceIdees.spontaneousLabel, handler: "switchInnovationIdeaSub('depot-idee')" },
            { id: "cmr-innov", label: espaceIdees.cmrInnovLabel, handler: "switchInnovationIdeaSub('cmr-innov')" },
          ]}
        />

        <div id="innovationIdeaSpontaneous" className="dashboard-grid innovation-idea-sub" style={{ gridTemplateColumns: "1.1fr .9fr", gap: 24 }}>
          <DashboardCard
            page={{ ...espaceIdees, title: "Boîte à idées" }}
            action={
              <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "focusInnovationField('spontaneousIdeaTitle')")}>
                {espaceIdees.ideaButton}
              </button>
            }
          >
            <SearchField
              id="spontaneousIdeaSearch"
              placeholder="Rechercher une idée..."
              handler="renderInnovationEspaceIdees()"
            />
            <div id="innovationSpontaneousIdeas" className="doc-list" />
          </DashboardCard>
          <DashboardCard page={{ ...espaceIdees, title: espaceIdees.ideaFormTitle, icon: "square-pen", iconClass: "blue" }}>
            <div style={{ padding: 18, display: "grid", gap: 12 }}>
              <Field id="spontaneousIdeaTitle" placeholder="Titre de l'idée" />
              <ThemeSelect id="spontaneousIdeaTheme" themes={spontaneousThemes} />
              <Field id="spontaneousIdeaDesc" placeholder="Description de l'idée" as="textarea" />
              <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitSpontaneousIdea()")}>
                {espaceIdees.sendLabel}
              </button>
            </div>
          </DashboardCard>
        </div>

        <div id="innovationIdeaCmrInnov" className="dashboard-grid innovation-idea-sub" style={{ display: "none", gridTemplateColumns: "1.1fr .9fr", gap: 24 }}>
          <DashboardCard
            page={{ ...espaceIdees, title: "CMR Innov", icon: "sparkles", iconClass: "green" }}
            action={
              <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "focusInnovationField('cmrInnovTitle')")}>
                {espaceIdees.innovButton}
              </button>
            }
          >
            <SearchField
              id="cmrInnovSearch"
              placeholder="Rechercher un innov..."
              handler="renderInnovationEspaceIdees()"
            />
            <div id="innovationCmrInnovList" className="doc-list" />
          </DashboardCard>
          <DashboardCard page={{ ...espaceIdees, title: espaceIdees.innovFormTitle, icon: "square-pen", iconClass: "blue" }}>
            <div style={{ padding: 18, display: "grid", gap: 12 }}>
              <Field id="cmrInnovTitle" label="Titre" placeholder="Saisir le titre" />
              <ThemeSelect id="cmrInnovTheme" themes={cmrInnovThemes} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field id="cmrInnovStart" label="Période - Du" placeholder="Du" type="date" />
                <Field id="cmrInnovEnd" label="Période - Au" placeholder="Au" type="date" />
              </div>
              <FileInput id="cmrInnovImage" accept="image/*" label="Image illustrative" />
              <FileInput id="cmrInnovDocs" accept="application/pdf" label="Supports documentaires (PDF uniquement)" />
              <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitCmrInnov()")}>
                {espaceIdees.sendLabel}
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>

      <div id="page-innovation-innov-event" className="km-tab-content" style={{ display: "none" }}>
        <p style={{ color: "var(--text-light)", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
          {innovEvent.description}
        </p>
        <DashboardCard page={innovEvent}>
          <SearchField
            id="innovEventSearch"
            placeholder="Rechercher un Innov Event..."
            handler="renderInnovEvent()"
          />
          <div id="innovationEventCards" style={{ padding: 18 }} />
        </DashboardCard>
      </div>

      <div id="page-innovation-event-detail" className="km-tab-content" style={{ display: "none" }}>
        <DashboardCard
          page={{ ...innovEvent, title: innovEvent.detailTitle, icon: "file-text", iconClass: "purple" }}
          action={
            <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "backToInnovationEventList()")}>
              Retour
            </button>
          }
        >
          <div id="innovationEventDetail" style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
            Sélectionnez un Innov Event.
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

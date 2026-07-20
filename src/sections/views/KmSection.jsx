import React, { useEffect, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getKmData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.kmHeader || {},
    tabs: data.kmTabs || [],
    pages: data.kmPages || {},
  };
}

function Separator() {
  return (
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
  );
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

function DashboardCard({ page, children, action, titleKey, iconKey, iconClassKey, id, style }) {
  return (
    <div className="dashboard-card" id={id} style={style}>
      <div className="card-header">
        <CardTitle page={page} titleKey={titleKey} iconKey={iconKey} iconClassKey={iconClassKey} />
        {action}
      </div>
      {children}
    </div>
  );
}

function SearchBlock({ id, placeholder, handler, maxWidth = 520 }) {
  return (
    <div style={{ padding: "14px 18px" }}>
      <div className="actu-search-wrap" style={{ maxWidth }}>
        <i data-lucide="search" className="actu-search-icon" />
        <input
          id={id}
          type="text"
          className="actu-search-input"
          placeholder={placeholder}
          onInput={(event) => runLegacyHandler(event, handler)}
        />
      </div>
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
          {index > 0 && <Separator />}
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

function SimpleListPage({ id, page, listId, grid = false, children }) {
  return (
    <div id={`page-km-${id}`} className="km-tab-content" style={{ display: "none" }}>
      <DashboardCard page={page}>
        {children || <div id={listId} className={grid ? "km-grid" : "doc-list"} style={grid ? { padding: 18 } : { padding: "0 18px 18px 18px" }} />}
      </DashboardCard>
    </div>
  );
}

function DetailPane({ id, cardId, page, titleKey = "detailTitle", iconKey = "detailIcon", iconClassKey = "detailIconClass", emptyKey = "emptyDetail" }) {
  return (
    <DashboardCard id={cardId} page={page} titleKey={titleKey} iconKey={iconKey} iconClassKey={iconClassKey}>
      <div id={id} style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}>
        {page[emptyKey]}
      </div>
    </DashboardCard>
  );
}

export default function KmSection() {
  const { header, tabs, pages } = getKmData();
  const referentiels = pages.referentiels || {};
  const rex = pages.rex || {};
  const communautes = pages.communautes || {};
  const amoa = pages.amoa || {};
  const docs = pages.docs || {};
  const contributions = pages.contributions || {};
  const categorisation = pages.categorisation || {};
  const ged = pages.ged || {};
  const glpi = pages.glpi || {};
  const stories = pages.stories || {};
  const campagnes = pages.campagnes || {};
  const regimesProcessus = pages["regimes-processus"] || {};
  const integrationKm = pages["integration-km"] || {};
  const integrationMedia = window.CMR_DATA?.data?.kmIntegrationMedia || [];
  const [integrationQuery, setIntegrationQuery] = useState("");
  const visibleIntegrationMedia = integrationMedia.filter((item) => [item.title, item.meta, item.file].join(" ").toLowerCase().includes(integrationQuery.trim().toLowerCase()));

  useEffect(() => { window.lucide?.createIcons(); }, [integrationQuery]);

  return (
    <>
      <div id="view-km" className="view-section km-container">
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
            marginBottom: 30,
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {index > 0 && <Separator />}
              <div
                data-km-tab={tab.id}
                className={`km-nav-item${index === 0 ? " active" : ""}`}
                onClick={(event) => runLegacyHandler(event, `switchPageKmTab('${tab.id}')`)}
                style={{ whiteSpace: "nowrap", padding: "12px 16px" }}
              >
                {tab.label}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div id="page-km-referentiels" className="km-tab-content" style={{ display: "block" }}>
          <SummaryText>{referentiels.description}</SummaryText>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={referentiels} titleKey="foldersTitle" iconKey="foldersIcon" iconClassKey="foldersIconClass">
              <div id="kmRefFolders" className="doc-list" />
            </DashboardCard>
            <DashboardCard page={referentiels} titleKey="guidesTitle" iconKey="guidesIcon" iconClassKey="guidesIconClass">
              <SearchBlock id="kmRefSearch" placeholder="Rechercher un référentiel..." handler="renderKmReferentiels()" maxWidth={420} />
              <div id="kmRefDocs" className="doc-list" />
            </DashboardCard>
          </div>
        </div>

        <div id="page-km-glossaire" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={pages.glossaire || {}}>
            <SearchBlock id="kmGlossSearch" placeholder="Rechercher un terme..." handler="renderKmGlossaire()" />
            <div id="kmGlossList" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>

        <div id="page-km-rex" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{rex.description}</SummaryText>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard
              page={rex}
              titleKey="listTitle"
              iconKey="listIcon"
              iconClassKey="listIconClass"
              action={
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "toggleKmRexForm(true)")}>
                  Soumettre un REX
                </button>
              }
            >
              <SearchBlock id="kmRexSearch" placeholder="Rechercher un REX..." handler="renderKmRex()" />
              <div id="kmRexList" className="doc-list" />
            </DashboardCard>
            <DashboardCard
              id="kmRexFormCard"
              page={rex}
              titleKey="formTitle"
              iconKey="formIcon"
              iconClassKey="formIconClass"
              style={{ display: "none" }}
              action={
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "toggleKmRexForm(false)")}>
                  Fermer
                </button>
              }
            >
              <div style={{ padding: 18 }}>
                <p style={{ margin: "0 0 12px", color: "var(--text-light)", fontSize: 12, lineHeight: 1.6 }}>
                  {rex.habilitationNote}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input id="kmRexTitle" className="actu-search-input" placeholder="Titre du REX" />
                  <select id="kmRexTheme" className="actu-search-input" style={{ height: 40 }}>
                    {(rex.themeOptions || []).map((theme) => (
                      <option value={theme} key={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea id="kmRexDesc" className="actu-search-input" style={{ marginTop: 12, height: 120, paddingTop: 10 }} placeholder="Décrire le retour d'expérience..." defaultValue={""} />
                <input id="kmRexAttachment" className="actu-search-input" type="file" style={{ marginTop: 12, paddingTop: 8 }} />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitKmRex()")}>
                    Envoyer
                  </button>
                </div>
              </div>
            </DashboardCard>
            <DetailPane id="kmRexDetail" cardId="kmRexDetailCard" page={rex} />
          </div>
        </div>

        <SimpleListPage id="elearning" page={pages.elearning || {}} listId="kmElearningGrid" grid />
        <SimpleListPage id="pedagogie" page={pages.pedagogie || {}} listId="kmPedagogieGrid" grid />

        <div id="page-km-communautes" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{communautes.description}</SummaryText>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={communautes} titleKey="communitiesTitle" iconKey="communitiesIcon" iconClassKey="communitiesIconClass">
              <div id="kmCommList" className="doc-list" />
            </DashboardCard>
            <DashboardCard page={communautes} titleKey="threadsTitle" iconKey="threadsIcon" iconClassKey="threadsIconClass">
              <div id="kmCommThreads" className="doc-list" />
            </DashboardCard>
          </div>
        </div>

        <div id="page-km-amoa" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={amoa} titleKey="listTitle" iconKey="listIcon" iconClassKey="listIconClass">
              <div className="doc-list" id="kmAmoaList" />
            </DashboardCard>
            <DetailPane id="kmAmoaDetail" page={amoa} />
          </div>
        </div>

        <div id="page-km-docs" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={docs} titleKey="foldersTitle" iconKey="foldersIcon" iconClassKey="foldersIconClass">
              <div id="kmDocsFolders" className="doc-list" />
            </DashboardCard>
            <DashboardCard page={docs} titleKey="listTitle" iconKey="listIcon" iconClassKey="listIconClass">
              <div id="kmDocsList" className="doc-list" />
            </DashboardCard>
          </div>
        </div>

        <div id="page-km-contributions" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{contributions.description}</SummaryText>
          <SubNav
            activeId="contributions"
            items={[
              { id: "contributions", label: contributions.contributionsLabel, handler: "switchKmContributionSub('contributions')" },
              { id: "campagnes", label: contributions.campaignsLabel, handler: "switchKmContributionSub('campagnes')" },
            ]}
          />
          <div id="kmContributionsSub" className="km-contribution-sub dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard
              page={contributions}
              titleKey="listTitle"
              iconKey="listIcon"
              iconClassKey="listIconClass"
              action={
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "toggleKmContributionForm(true)")}>
                  Contribuer
                </button>
              }
            >
              <SummaryText>{contributions.contributionsDescription}</SummaryText>
              <div id="kmContribList" className="doc-list" />
            </DashboardCard>
            <DashboardCard
              id="kmContribFormCard"
              page={contributions}
              titleKey="formTitle"
              iconKey="formIcon"
              iconClassKey="formIconClass"
              style={{ display: "none" }}
              action={
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, "toggleKmContributionForm(false)")}>
                  Fermer
                </button>
              }
            >
              <div style={{ padding: 18 }}>
                <input id="kmContribTitle" className="actu-search-input" placeholder="Titre de la contribution" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                  <input id="kmContribStart" className="actu-search-input" type="date" />
                  <input id="kmContribEnd" className="actu-search-input" type="date" />
                </div>
                <textarea id="kmContribBody" className="actu-search-input" style={{ marginTop: 12, height: 120, paddingTop: 10 }} placeholder="Contenu de la contribution..." defaultValue={""} />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
                  <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitKmContribution()")}>
                    Envoyer
                  </button>
                </div>
              </div>
            </DashboardCard>
            <DetailPane id="kmContribDetail" cardId="kmContribDetailCard" page={contributions} />
          </div>
          <div id="kmCampaignsSub" className="km-contribution-sub dashboard-grid" style={{ display: "none", gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={contributions} titleKey="campaignsLabel" iconKey="listIcon" iconClassKey="listIconClass">
              <SummaryText>{contributions.campaignsDescription}</SummaryText>
              <div id="kmCampagnesList" className="doc-list" />
            </DashboardCard>
            <DetailPane id="kmCampagnesDetail" page={{ ...contributions, detailTitle: "Détail campagne" }} />
          </div>
        </div>

        <div id="page-km-categorisation" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={categorisation}>
            <div style={{ padding: 18 }}>
              <p style={{ margin: "0 0 14px 0", fontSize: 13, color: "var(--text-light)" }}>
                {categorisation.description}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(categorisation.filters || []).map((filter) => (
                  <button
                    key={filter.value}
                    className={`actu-filter-btn${filter.active ? " active" : ""}`}
                    onClick={(event) => runLegacyHandler(event, `filterKmCatalogue('${filter.value}', this)`)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 14 }} className="actu-search-wrap">
                <i data-lucide="search" className="actu-search-icon" />
                <input id="kmCatSearch" type="text" className="actu-search-input" placeholder="Rechercher dans le catalogue..." onInput={(event) => runLegacyHandler(event, "renderKmCatalogue()")} />
              </div>
            </div>
            <div id="kmCatalogueList" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
          </DashboardCard>
        </div>

        <SimpleListPage id="livrables" page={pages.livrables || {}} listId="kmLivrablesList" />
        <SimpleListPage id="modeles" page={pages.modeles || {}} listId="kmModelesList" />
        <SimpleListPage id="publications" page={pages.publications || {}} listId="kmPubList" />

        <div id="page-km-integration-km" className="km-tab-content" style={{ display: "none" }}>
          <SummaryText>{integrationKm.description}</SummaryText>
          <DashboardCard page={integrationKm}>
            <div style={{ padding: 18 }}>
              <div className="section-search-row"><i data-lucide="search" /><input value={integrationQuery} onChange={(event) => setIntegrationQuery(event.target.value)} placeholder="Rechercher un média métier..." /></div>
              <div className="km-grid" style={{ marginTop: 16 }}>
                {visibleIntegrationMedia.map((item) => <button className="doc-card km-integration-card" key={item.title} onClick={(event) => runLegacyHandler(event, `openMockDownload('${item.file}','${item.title}')`)}><div className="doc-icon-large" style={{ background: "#eff6ff", color: "#256cb5" }}><i data-lucide={item.icon} /></div><div className="doc-card-title">{item.title}</div><p>{item.meta}</p><div className="doc-card-meta"><span>Consulter</span><i data-lucide="arrow-right" /></div></button>)}
              </div>
            </div>
          </DashboardCard>
        </div>

        <div id="page-km-ged" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={ged}>
            <div style={{ padding: 18 }}>
              <p style={{ margin: 0, color: "var(--text-light)", fontSize: 13, lineHeight: "1.7" }}>
                {ged.description}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                <button className="primary-btn" onClick={(event) => runLegacyHandler(event, ged.primaryActionHandler)}>
                  Guide de connexion
                </button>
                <button className="secondary-btn" onClick={(event) => runLegacyHandler(event, ged.secondaryActionHandler)}>
                  Convention de nommage
                </button>
              </div>
            </div>
          </DashboardCard>
        </div>

        <div id="page-km-glpi" className="km-tab-content" style={{ display: "none" }}>
          <DashboardCard page={glpi}>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 260, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: 16 }}>
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>{glpi.ticketsTitle}</div>
                  <p style={{ margin: "8px 0 0 0", color: "var(--text-light)", fontSize: 12, lineHeight: "1.6" }}>
                    {glpi.ticketsDescription}
                  </p>
                  <div style={{ marginTop: 12 }} className="doc-list" id="kmGlpiTickets" />
                </div>
                <div style={{ flex: 1, minWidth: 260, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 16 }}>
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>{glpi.requestTitle}</div>
                  <p style={{ margin: "8px 0 0 0", color: "var(--text-light)", fontSize: 12, lineHeight: "1.6" }}>
                    {glpi.requestDescription}
                  </p>
                  <input id="kmGlpiTitle" className="actu-search-input" placeholder="Objet de la demande" />
                  <textarea id="kmGlpiDesc" className="actu-search-input" style={{ marginTop: 12, height: 110, paddingTop: 10 }} placeholder="Décrire la demande..." defaultValue={""} />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                    <button className="primary-btn" onClick={(event) => runLegacyHandler(event, "submitKmGlpi()")}>
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        <SimpleListPage id="supports" page={pages.supports || {}} listId="kmSupportsGrid" grid />

        <div id="page-km-stories" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.6fr 1.4fr", gap: 24 }}>
            <DashboardCard page={stories} titleKey="listTitle" iconKey="listIcon" iconClassKey="listIconClass">
              <div id="kmStoriesGrid" style={{ padding: 18, display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }} />
            </DashboardCard>
            <DashboardCard page={stories} titleKey="highlightTitle" iconKey="highlightIcon" iconClassKey="highlightIconClass">
              <div id="kmStoriesHighlight" className="doc-list" style={{ padding: "0 18px 18px 18px" }} />
            </DashboardCard>
          </div>
        </div>

        <div id="page-km-campagnes" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={campagnes} titleKey="listTitle" iconKey="listIcon" iconClassKey="listIconClass">
              <div id="kmCampagnesList" className="doc-list" />
            </DashboardCard>
            <DetailPane id="kmCampagnesDetail" page={campagnes} />
          </div>
        </div>

        <SimpleListPage id="audit-risque" page={pages["audit-risque"] || {}} listId="kmAuditRisqueList" />
        <SimpleListPage id="capsules-ux" page={pages["capsules-ux"] || {}} listId="kmCapsulesUxGrid" grid />

        <div id="page-km-regimes-processus" className="km-tab-content" style={{ display: "none" }}>
          <div className="dashboard-grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}>
            <DashboardCard page={regimesProcessus} titleKey="listTitle" iconKey="listIcon" iconClassKey="listIconClass">
              <div id="kmRegimesProcessList" className="doc-list" />
            </DashboardCard>
            <DetailPane id="kmRegimesProcessDetail" page={regimesProcessus} />
          </div>
        </div>
      </div>
      {/* APPLIS VIEW */}
    </>
  );
}

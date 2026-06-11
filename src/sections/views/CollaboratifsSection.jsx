import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

function getCollabData() {
  const data = window.CMR_DATA?.data || {};
  return {
    header: data.collabHeader || {},
    pages: data.collabPages || {},
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

function TitledCard({ page, children, headerAction }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <CardTitle page={page} />
        {headerAction}
      </div>
      {children}
    </div>
  );
}

export default function CollaboratifsSection() {
  const { header, pages } = getCollabData();
  const forums = pages.forums || {};
  const groupes = pages.groupes || {};
  const echanges = pages.echanges || {};
  const rex = pages.rex || {};
  const animation = pages.animation || {};
  const vieinterne = pages.vieinterne || {};

  return (
    <>
      <div id="view-collaboratifs" className="view-section km-container">
        <div className="km-header">
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div
          className="km-navbar"
          id="collabMainNavbar"
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
        ></div>
        <div
          className="km-navbar"
          id="collabSubNavbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 30,
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        ></div>

        <div
          id="page-collab-forums"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.6fr 1.4fr", gap: 24 }}
          >
            <TitledCard
              page={forums}
              headerAction={
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleForumComposer(true)")
                  }
                >
                  {forums.newTopicLabel}
                </button>
              }
            >
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="collabForumSearch"
                    className="actu-search-input"
                    placeholder={forums.searchPlaceholder}
                    onInput={(event) =>
                      runLegacyHandler(event, "renderCollabForums()")
                    }
                  />
                </div>
              </div>
              <div
                id="collabForumList"
                className="doc-list"
                style={{ padding: "0 18px 18px 18px" }}
              />
            </TitledCard>
            <div
              className="dashboard-card"
              id="collabForumComposer"
              style={{ display: "none" }}
            >
              <div className="card-header">
                <CardTitle
                  page={{
                    title: forums.composerTitle,
                    icon: forums.composerIcon,
                    iconClass: forums.composerIconClass,
                  }}
                />
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleForumComposer(false)")
                  }
                >
                  {forums.closeLabel}
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input
                  id="forumTitle"
                  className="actu-search-input"
                  placeholder={forums.titlePlaceholder}
                />
                <textarea
                  id="forumBody"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 130, paddingTop: 10 }}
                  placeholder={forums.bodyPlaceholder}
                  defaultValue={""}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "postForumThread()")
                    }
                  >
                    {forums.publishLabel}
                  </button>
                </div>
              </div>
            </div>
            <TitledCard
              page={{
                title: forums.detailTitle,
                icon: forums.detailIcon,
                iconClass: forums.detailIconClass,
              }}
            >
              <div
                id="collabForumDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                {forums.emptyDetail}
              </div>
            </TitledCard>
          </div>
        </div>

        <div
          id="page-collab-groupes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.3fr 1.7fr", gap: 24 }}
          >
            <TitledCard page={groupes}>
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="collabGroupSearch"
                    className="actu-search-input"
                    placeholder={groupes.searchPlaceholder}
                    onInput={(event) =>
                      runLegacyHandler(event, "renderCollabGroups()")
                    }
                  />
                </div>
              </div>
              <div
                id="collabGroupList"
                className="doc-list"
                style={{ padding: "0 18px 18px 18px" }}
              />
            </TitledCard>
            <TitledCard
              page={{
                title: groupes.detailTitle,
                icon: groupes.detailIcon,
                iconClass: groupes.detailIconClass,
              }}
            >
              <div style={{ padding: 18 }}>
                <div
                  id="collabGroupDetail"
                  style={{ color: "var(--text-light)", fontSize: 13 }}
                >
                  {groupes.emptyDetail}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    {groupes.latestTitle}
                  </div>
                  <div
                    id="collabGroupThreads"
                    className="doc-list"
                    style={{ marginTop: 10 }}
                  />
                </div>
              </div>
            </TitledCard>
          </div>
        </div>

        <div
          id="page-collab-echanges"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <TitledCard
              page={echanges}
              headerAction={
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleCollabPostForm(true)")
                  }
                >
                  {echanges.publishLabel}
                </button>
              }
            >
              <div
                id="collabPostForm"
                style={{
                  display: "none",
                  padding: 18,
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <textarea
                  id="collabPostText"
                  className="actu-search-input"
                  style={{ height: 120, paddingTop: 10 }}
                  placeholder={echanges.postPlaceholder}
                  defaultValue={""}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  <button
                    className="secondary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "toggleCollabPostForm(false)")
                    }
                  >
                    {echanges.cancelLabel}
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "publishCollabPost()")
                    }
                  >
                    {echanges.publishLabel}
                  </button>
                </div>
              </div>
              <div
                id="collabFeed"
                className="doc-list"
                style={{ padding: 18 }}
              />
            </TitledCard>
            <TitledCard
              page={{
                title: echanges.commentsTitle,
                icon: echanges.commentsIcon,
                iconClass: echanges.commentsIconClass,
              }}
            >
              <div style={{ padding: 18 }}>
                <div
                  id="collabFeedDetail"
                  style={{ color: "var(--text-light)", fontSize: 13 }}
                >
                  {echanges.emptyDetail}
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                  <input
                    id="collabCommentText"
                    className="actu-search-input"
                    placeholder={echanges.commentPlaceholder}
                    style={{ height: 40, paddingLeft: 14 }}
                  />
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "addCollabComment()")
                    }
                  >
                    {echanges.commentLabel}
                  </button>
                </div>
                <div
                  id="collabCommentsList"
                  className="doc-list"
                  style={{ marginTop: 12 }}
                />
              </div>
            </TitledCard>
          </div>
        </div>

        <div
          id="page-collab-rex"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <TitledCard page={rex}>
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="collabRexSearch"
                    className="actu-search-input"
                    placeholder={rex.searchPlaceholder}
                    onInput={(event) =>
                      runLegacyHandler(event, "renderCollabRex()")
                    }
                  />
                </div>
              </div>
              <div
                id="collabRexList"
                className="doc-list"
                style={{ padding: "0 18px 18px 18px" }}
              />
            </TitledCard>
            <TitledCard
              page={{
                title: rex.detailTitle,
                icon: rex.detailIcon,
                iconClass: rex.detailIconClass,
              }}
            >
              <div
                id="collabRexDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                {rex.emptyDetail}
              </div>
            </TitledCard>
          </div>
        </div>

        <div
          id="page-collab-animation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.5fr 1.5fr", gap: 24 }}
          >
            <TitledCard page={animation}>
              <div
                id="collabEvents"
                className="doc-list"
                style={{ padding: 18 }}
              />
            </TitledCard>
            <TitledCard
              page={{
                title: animation.formTitle,
                icon: animation.formIcon,
                iconClass: animation.formIconClass,
              }}
            >
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <input
                    id="collabEventTitle"
                    className="actu-search-input"
                    placeholder={animation.eventTitlePlaceholder}
                  />
                  <input
                    id="collabEventDate"
                    className="actu-search-input"
                    placeholder={animation.eventDatePlaceholder}
                    style={{ paddingLeft: 14 }}
                  />
                </div>
                <textarea
                  id="collabEventDesc"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder={animation.eventDescriptionPlaceholder}
                  defaultValue={""}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "createCollabEvent()")
                    }
                  >
                    {animation.createLabel}
                  </button>
                </div>
                <div
                  style={{
                    marginTop: 12,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    {animation.selectedTitle}
                  </div>
                  <div
                    id="collabEventDetail"
                    style={{
                      marginTop: 8,
                      color: "var(--text-light)",
                      fontSize: 13,
                    }}
                  >
                    {animation.emptyDetail}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 10,
                    }}
                  >
                    <button
                      className="primary-btn"
                      onClick={(event) =>
                        runLegacyHandler(event, "joinCollabEvent()")
                      }
                    >
                      {animation.joinLabel}
                    </button>
                  </div>
                </div>
              </div>
            </TitledCard>
          </div>
        </div>

        <div
          id="page-collab-vieinterne"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.3fr 1.7fr", gap: 24 }}
          >
            <TitledCard
              page={vieinterne}
              headerAction={
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleCultureComposer(true)")
                  }
                >
                  {vieinterne.publishLabel}
                </button>
              }
            >
              <div
                id="cultureComposer"
                style={{
                  display: "none",
                  padding: 18,
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <input
                  id="cultureTitle"
                  className="actu-search-input"
                  placeholder={vieinterne.titlePlaceholder}
                />
                <textarea
                  id="cultureBody"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder={vieinterne.bodyPlaceholder}
                  defaultValue={""}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  <button
                    className="secondary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "toggleCultureComposer(false)")
                    }
                  >
                    {vieinterne.cancelLabel}
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "publishCulturePost()")
                    }
                  >
                    {vieinterne.publishLabel}
                  </button>
                </div>
              </div>
              <div
                id="collabCultureFeed"
                className="doc-list"
                style={{ padding: 18 }}
              />
            </TitledCard>
            <TitledCard
              page={{
                title: vieinterne.galleryTitle,
                icon: vieinterne.galleryIcon,
                iconClass: vieinterne.galleryIconClass,
              }}
            >
              <div style={{ padding: 18 }}>
                <div
                  id="collabCultureGallery"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                    gap: 12,
                  }}
                />
              </div>
            </TitledCard>
          </div>
        </div>
      </div>
    </>
  );
}

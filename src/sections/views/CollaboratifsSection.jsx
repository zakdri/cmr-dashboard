import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function CollaboratifsSection() {
  return (
    <>
      <div id="view-collaboratifs" className="view-section km-container">
        <div className="km-header">
          <h2>Espaces collaboratifs</h2>
          <p>Forums, communautés, échanges, partage (REX) et vie interne.</p>
        </div>
        {/* Sous‑rubriques (niveau 1) */}
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
        {/* Sous‑rubriques (niveau 2 — selon sous‑rubrique principale) */}
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
        {/* Discussions */}
        <div
          id="page-collab-forums"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.6fr 1.4fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="message-square"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Forums
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleForumComposer(true)")
                  }
                >
                  Nouveau sujet
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="collabForumSearch"
                    className="actu-search-input"
                    placeholder="Rechercher un sujet…"
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
            </div>
            <div
              className="dashboard-card"
              id="collabForumComposer"
              style={{ display: "none" }}
            >
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon green">
                    <i
                      data-lucide="square-pen"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Publier
                </div>
                <button
                  className="secondary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleForumComposer(false)")
                  }
                >
                  Fermer
                </button>
              </div>
              <div style={{ padding: 18 }}>
                <input
                  id="forumTitle"
                  className="actu-search-input"
                  placeholder="Titre du sujet"
                />
                <textarea
                  id="forumBody"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 130, paddingTop: 10 }}
                  placeholder="Votre message…"
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
                    Publier
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="messages-square"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Détail / Répondre
                </div>
              </div>
              <div
                id="collabForumDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un sujet.
              </div>
            </div>
          </div>
        </div>
        {/* Communautés */}
        <div
          id="page-collab-groupes"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.3fr 1.7fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon orange">
                    <i data-lucide="users" style={{ width: 20, height: 20 }} />
                  </div>
                  Groupes thématiques
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="collabGroupSearch"
                    className="actu-search-input"
                    placeholder="Rechercher un groupe…"
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
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="activity"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Espace du groupe
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  id="collabGroupDetail"
                  style={{ color: "var(--text-light)", fontSize: 13 }}
                >
                  Sélectionnez un groupe.
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
                    Derniers échanges
                  </div>
                  <div
                    id="collabGroupThreads"
                    className="doc-list"
                    style={{ marginTop: 10 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Échanges */}
        <div
          id="page-collab-echanges"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon pink">
                    <i
                      data-lucide="sparkles"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Discussions libres
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleCollabPostForm(true)")
                  }
                >
                  Publier
                </button>
              </div>
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
                  placeholder="Partagez une info, une question, un message…"
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
                    Annuler
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "publishCollabPost()")
                    }
                  >
                    Publier
                  </button>
                </div>
              </div>
              <div
                id="collabFeed"
                className="doc-list"
                style={{ padding: 18 }}
              />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="message-circle"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Commentaires
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  id="collabFeedDetail"
                  style={{ color: "var(--text-light)", fontSize: 13 }}
                >
                  Sélectionnez une publication.
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                  <input
                    id="collabCommentText"
                    className="actu-search-input"
                    placeholder="Ajouter un commentaire…"
                    style={{ height: 40, paddingLeft: 14 }}
                  />
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "addCollabComment()")
                    }
                  >
                    Commenter
                  </button>
                </div>
                <div
                  id="collabCommentsList"
                  className="doc-list"
                  style={{ marginTop: 12 }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Partage */}
        <div
          id="page-collab-rex"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon green">
                    <i
                      data-lucide="book-open"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Informations / REX
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="collabRexSearch"
                    className="actu-search-input"
                    placeholder="Rechercher un article / REX…"
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
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon purple">
                    <i
                      data-lucide="file-text"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Lecture
                </div>
              </div>
              <div
                id="collabRexDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un article.
              </div>
            </div>
          </div>
        </div>
        {/* Animation */}
        <div
          id="page-collab-animation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.5fr 1.5fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon orange">
                    <i
                      data-lucide="party-popper"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Communautés internes
                </div>
              </div>
              <div
                id="collabEvents"
                className="doc-list"
                style={{ padding: 18 }}
              />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i data-lucide="mic" style={{ width: 20, height: 20 }} />
                  </div>
                  Animer / Participer
                </div>
              </div>
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
                    placeholder="Titre évènement"
                  />
                  <input
                    id="collabEventDate"
                    className="actu-search-input"
                    placeholder="Date (ex: 15 Mai 2026)"
                    style={{ paddingLeft: 14 }}
                  />
                </div>
                <textarea
                  id="collabEventDesc"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder="Description…"
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
                    Animer
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
                    Évènement sélectionné
                  </div>
                  <div
                    id="collabEventDetail"
                    style={{
                      marginTop: 8,
                      color: "var(--text-light)",
                      fontSize: 13,
                    }}
                  >
                    Sélectionnez un évènement.
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
                      Participer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Vie interne */}
        <div
          id="page-collab-vieinterne"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.3fr 1.7fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon pink">
                    <i data-lucide="heart" style={{ width: 20, height: 20 }} />
                  </div>
                  Culture interne
                </div>
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "toggleCultureComposer(true)")
                  }
                >
                  Publier
                </button>
              </div>
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
                  placeholder="Titre"
                />
                <textarea
                  id="cultureBody"
                  className="actu-search-input"
                  style={{ marginTop: 12, height: 120, paddingTop: 10 }}
                  placeholder="Message…"
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
                    Annuler
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "publishCulturePost()")
                    }
                  >
                    Publier
                  </button>
                </div>
              </div>
              <div
                id="collabCultureFeed"
                className="doc-list"
                style={{ padding: 18 }}
              />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i data-lucide="image" style={{ width: 20, height: 20 }} />
                  </div>
                  Galerie
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
      {/* ACHATS VIEW */}
    </>
  );
}

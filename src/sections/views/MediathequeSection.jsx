import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function MediathequeSection() {
  return (
    <>
      <div id="view-mediatheque" className="view-section km-container">
        <div className="km-header">
          <h2>Médiathèque</h2>
          <p>
            Accès central aux médias, photothèque, vidéothèque, catégories et
            intégrations.
          </p>
        </div>
        {/* Sous‑rubriques (niveau 1) */}
        <div
          className="km-navbar"
          id="mediaMainNavbar"
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
          id="mediaSubNavbar"
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
        {/* Accès central */}
        <div
          id="page-media-home"
          className="km-tab-content"
          style={{ display: "block" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.4fr 1.6fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="compass"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Page principale
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg,#eff6ff,#fff7ed)",
                    border: "1px solid #e2e8f0",
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    Point d’entrée Médiathèque
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      color: "var(--text-light)",
                      fontSize: 13,
                      lineHeight: "1.7",
                    }}
                  >
                    Centraliser l’ensemble des contenus multimédias de la CMR.
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className="primary-btn"
                      onClick={(event) =>
                        runLegacyHandler(
                          event,
                          "openSubmenuView('mediatheque','photos')",
                        )
                      }
                    >
                      Photothèque
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={(event) =>
                        runLegacyHandler(
                          event,
                          "openSubmenuView('mediatheque','videos')",
                        )
                      }
                    >
                      Vidéothèque
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={(event) =>
                        runLegacyHandler(
                          event,
                          "openSubmenuView('mediatheque','structuration')",
                        )
                      }
                    >
                      Catégories
                    </button>
                  </div>
                </div>
                <div style={{ marginTop: 14 }} className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="mediaGlobalSearch"
                    className="actu-search-input"
                    placeholder="Rechercher un média (image, vidéo)…"
                    onInput={(event) =>
                      runLegacyHandler(event, "renderMediaSearch()")
                    }
                  />
                </div>
                <div
                  id="mediaSearchPreview"
                  className="doc-list"
                  style={{ marginTop: 12 }}
                />
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon pink">
                    <i
                      data-lucide="sparkles"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  À la une
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  id="mediaCarousel"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                    gap: 12,
                  }}
                />
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    className="actu-filter-btn"
                    onClick={(event) =>
                      runLegacyHandler(event, "rotateMediaCarousel()")
                    }
                  >
                    Changer la sélection
                  </button>
                  <button
                    className="primary-btn"
                    onClick={(event) =>
                      runLegacyHandler(
                        event,
                        "openSubmenuView('mediatheque','acces-contenus')",
                      )
                    }
                  >
                    Consulter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Photothèque */}
        <div
          id="page-media-images"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon pink">
                  <i data-lucide="image" style={{ width: 20, height: 20 }} />
                </div>
                Images (galerie)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div className="actu-search-wrap" style={{ marginBottom: 12 }}>
                <i data-lucide="search" style={{ width: 16 }} />
                <input
                  id="mediaImgSearch"
                  className="actu-search-input"
                  placeholder="Rechercher une image…"
                  onInput={(event) =>
                    runLegacyHandler(event, "renderMediaImages()")
                  }
                />
              </div>
              <div
                id="mediaImagesGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                  gap: 12,
                }}
              />
            </div>
          </div>
        </div>
        {/* Vidéothèque */}
        <div
          id="page-media-videos"
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
                    <i data-lucide="video" style={{ width: 20, height: 20 }} />
                  </div>
                  Vidéos
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div className="actu-search-wrap">
                  <i data-lucide="search" style={{ width: 16 }} />
                  <input
                    id="mediaVidSearch"
                    className="actu-search-input"
                    placeholder="Rechercher une vidéo…"
                    onInput={(event) =>
                      runLegacyHandler(event, "renderMediaVideos()")
                    }
                  />
                </div>
              </div>
              <div
                id="mediaVideosList"
                className="doc-list"
                style={{ padding: "0 18px 18px 18px" }}
              />
            </div>
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="play-circle"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Lecteur vidéo
                </div>
              </div>
              <div
                id="mediaVideoPlayer"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez une vidéo.
              </div>
            </div>
          </div>
        </div>
        {/* Structuration */}
        <div
          id="page-media-categories"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="tags" style={{ width: 20, height: 20 }} />
                </div>
                Catégories (filtres / navigation)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <button
                  className="actu-filter-btn active"
                  onClick={(event) =>
                    runLegacyHandler(event, "setMediaCategory('all', this)")
                  }
                >
                  Toutes
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setMediaCategory('Institutionnel', this)",
                    )
                  }
                >
                  Institutionnel
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setMediaCategory('Process', this)")
                  }
                >
                  Process
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "setMediaCategory('Évènement', this)",
                    )
                  }
                >
                  Évènement
                </button>
                <button
                  className="actu-filter-btn"
                  onClick={(event) =>
                    runLegacyHandler(event, "setMediaCategory('SI', this)")
                  }
                >
                  SI
                </button>
              </div>
              <div
                id="mediaCategoriesGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                  gap: 12,
                }}
              />
            </div>
          </div>
        </div>
        {/* Accès contenus */}
        <div
          id="page-media-consultation"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "1.25fr 1.75fr", gap: 24 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="card-icon blue">
                    <i
                      data-lucide="gallery-vertical-end"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                  Galerie
                </div>
              </div>
              <div
                id="mediaConsultList"
                className="doc-list"
                style={{ padding: 18 }}
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
                  Lecteur
                </div>
              </div>
              <div
                id="mediaConsultDetail"
                style={{
                  padding: 18,
                  color: "var(--text-light)",
                  fontSize: 13,
                }}
              >
                Sélectionnez un média.
              </div>
            </div>
          </div>
        </div>
        <div
          id="page-media-telechargement"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon orange">
                  <i data-lucide="download" style={{ width: 20, height: 20 }} />
                </div>
                Téléchargement
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: 14,
                  padding: 12,
                  color: "#9a3412",
                  fontSize: 13,
                  lineHeight: "1.7",
                }}
              >
                Espace réservé aux <strong>utilisateurs habilités</strong>{" "}
                (maquette).
              </div>
              <div
                id="mediaDownloadList"
                className="doc-list"
                style={{ marginTop: 12 }}
              />
            </div>
          </div>
        </div>
        {/* Intégration */}
        <div
          id="page-media-integration"
          className="km-tab-content"
          style={{ display: "none" }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i
                    data-lucide="git-merge"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                Espaces intranet (réutilisation)
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div
                style={{
                  color: "var(--text-light)",
                  fontSize: 13,
                  lineHeight: "1.7",
                }}
              >
                Permettre la réutilisation des médias dans d’autres espaces
                (intégration transverse).
              </div>
              <div className="km-grid" style={{ marginTop: 12 }}>
                <div
                  className="doc-card"
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "openMockDownload('Integration_RH.pdf','Intégration – RH')",
                    )
                  }
                >
                  <div
                    className="doc-icon-large"
                    style={{ background: "#eff6ff", color: "#1d4ed8" }}
                  >
                    <i data-lucide="users" style={{ width: 24, height: 24 }} />
                  </div>
                  <div className="doc-card-title">RH &amp; Mobilité</div>
                  <div className="doc-card-meta">
                    <span>Réutiliser</span>
                    <i data-lucide="arrow-right" style={{ width: 16 }} />
                  </div>
                </div>
                <div
                  className="doc-card"
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "openMockDownload('Integration_Communication.pdf','Intégration – Communication')",
                    )
                  }
                >
                  <div
                    className="doc-icon-large"
                    style={{ background: "#fdf4ff", color: "#7c3aed" }}
                  >
                    <i
                      data-lucide="megaphone"
                      style={{ width: 24, height: 24 }}
                    />
                  </div>
                  <div className="doc-card-title">Communication interne</div>
                  <div className="doc-card-meta">
                    <span>Réutiliser</span>
                    <i data-lucide="arrow-right" style={{ width: 16 }} />
                  </div>
                </div>
                <div
                  className="doc-card"
                  style={{ cursor: "pointer" }}
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "openMockDownload('Integration_KM.pdf','Intégration – KM')",
                    )
                  }
                >
                  <div
                    className="doc-icon-large"
                    style={{ background: "#ecfdf5", color: "#059669" }}
                  >
                    <i data-lucide="brain" style={{ width: 24, height: 24 }} />
                  </div>
                  <div className="doc-card-title">Knowledge Management</div>
                  <div className="doc-card-meta">
                    <span>Réutiliser</span>
                    <i data-lucide="arrow-right" style={{ width: 16 }} />
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="primary-btn"
                  onClick={(event) =>
                    runLegacyHandler(
                      event,
                      "openMockDownload('Media_Embed_Snippet.txt','Snippet d’intégration')",
                    )
                  }
                >
                  Réutiliser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RSE VIEW */}
      {/* ===== NOTIFICATIONS VIEW ===== */}
    </>
  );
}

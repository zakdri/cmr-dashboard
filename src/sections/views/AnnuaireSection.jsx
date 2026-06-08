import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function AnnuaireSection() {
  return (
    <>
      <div id="view-annuaire" className="view-section km-container">
        <div className="km-header">
          <h2>Annuaire</h2>
          <p>
            Recherche multicritère (nom, entité, fonction) + fiche profil +
            rattachement hiérarchique + coordonnées.
          </p>
        </div>
        <div className="km-grid" style={{ marginBottom: 20 }}>
          <div
            className="doc-card"
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              runLegacyHandler(
                event,
                "document.getElementById('annuaireSearchInput')?.focus()",
              )
            }
          >
            <div
              className="doc-icon-large"
              style={{ background: "#eff6ff", color: "#2563eb" }}
            >
              <i data-lucide="search" style={{ width: 24, height: 24 }} />
            </div>
            <div className="doc-card-title">Recherche collaborateurs</div>
            <p
              style={{ fontSize: 13, color: "var(--text-light)", marginTop: 8 }}
            >
              Nom, entité, fonction et coordonnées.
            </p>
          </div>
          <div
            className="doc-card"
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              runLegacyHandler(event, "focusAnnuaireDetail()")
            }
          >
            <div
              className="doc-icon-large"
              style={{ background: "#f0fdf4", color: "#16a34a" }}
            >
              <i data-lucide="id-card" style={{ width: 24, height: 24 }} />
            </div>
            <div className="doc-card-title">Profil collaborateur</div>
            <p
              style={{ fontSize: 13, color: "var(--text-light)", marginTop: 8 }}
            >
              Fiche profil détaillée du collaborateur sélectionné.
            </p>
          </div>
          <div
            className="doc-card"
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              runLegacyHandler(event, "switchOrgGovTab('organigramme')")
            }
          >
            <div
              className="doc-icon-large"
              style={{ background: "#fdf4ff", color: "#9333ea" }}
            >
              <i data-lucide="network" style={{ width: 24, height: 24 }} />
            </div>
            <div className="doc-card-title">Rattachement hiérarchique</div>
            <p
              style={{ fontSize: 13, color: "var(--text-light)", marginTop: 8 }}
            >
              Vue hiérarchique et lien direct vers l’organigramme.
            </p>
          </div>
          <div
            className="doc-card"
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              runLegacyHandler(event, "focusAnnuaireDetail()")
            }
          >
            <div
              className="doc-icon-large"
              style={{ background: "#fff7ed", color: "#ea580c" }}
            >
              <i data-lucide="mail" style={{ width: 24, height: 24 }} />
            </div>
            <div className="doc-card-title">Coordonnées pro</div>
            <p
              style={{ fontSize: 13, color: "var(--text-light)", marginTop: 8 }}
            >
              Email, téléphone et localisation professionnelle.
            </p>
          </div>
        </div>
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
          <div className="app-category-title" style={{ margin: 0 }}>
            Recherche collaborateurs
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <div
              className="actu-search-wrap"
              style={{ maxWidth: 360, flex: 1 }}
            >
              <i data-lucide="search" className="actu-search-icon" />
              <input
                id="annuaireSearchInput"
                type="text"
                className="actu-search-input"
                placeholder="Rechercher (nom, entité, fonction)…"
                onInput={(event) =>
                  runLegacyHandler(event, "renderAnnuaireList()")
                }
              />
            </div>
            <select
              id="annuaireDirectionFilter"
              onChange={(event) =>
                runLegacyHandler(event, "renderAnnuaireList()")
              }
              style={{
                height: 40,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#fff",
                padding: "0 12px",
                fontSize: 12,
                color: "#475569",
                minWidth: 190,
              }}
            >
              <option value>Toutes les entités</option>
            </select>
            <select
              id="annuaireFonctionFilter"
              onChange={(event) =>
                runLegacyHandler(event, "renderAnnuaireList()")
              }
              style={{
                height: 40,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#fff",
                padding: "0 12px",
                fontSize: 12,
                color: "#475569",
                minWidth: 190,
              }}
            >
              <option value>Toutes les fonctions</option>
            </select>
            <button
              className="secondary-btn"
              onClick={(event) =>
                runLegacyHandler(event, "resetAnnuaireFilters()")
              }
            >
              Réinitialiser
            </button>
          </div>
        </div>
        <div
          className="dashboard-grid"
          style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: 24 }}
        >
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon blue">
                  <i data-lucide="users" style={{ width: 20, height: 20 }} />
                </div>
                Résultats
              </div>
              <div
                id="annuaireCount"
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  fontWeight: 700,
                }}
              >
                0 collaborateur
              </div>
            </div>
            <div id="annuaireList" className="doc-list" />
          </div>
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon green">
                  <i data-lucide="user" style={{ width: 20, height: 20 }} />
                </div>
                Profil collaborateur
              </div>
            </div>
            <div
              id="annuaireDetail"
              style={{ padding: 18, color: "var(--text-light)", fontSize: 13 }}
            >
              Sélectionnez un collaborateur dans la liste.
            </div>
          </div>
        </div>
      </div>
      {/* PROJETS VIEW */}
    </>
  );
}

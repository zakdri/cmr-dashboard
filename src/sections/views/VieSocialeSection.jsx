import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function VieSocialeSection() {
  return (
    <>
      <div id="view-vie-sociale" className="view-section km-container">
        <div className="km-header">
          <h2>Espace Vie Sociale</h2>
          <p>
            Renforcez la cohésion interne : Événements, Galerie photos et
            Capsules vidéo.
          </p>
        </div>
        <p
          style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}
        >
          Valorisez la vie interne et l'engagement collaborateur : événements,
          photos et initiatives collaboratives.
        </p>
        {/* Feed événements */}
        <div className="app-category-title" style={{ marginBottom: 16 }}>
          Événements &amp; Initiatives
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
            }}
          >
            <div
              style={{
                width: 110,
                minHeight: 100,
                background: "linear-gradient(135deg,#ec4899,#db2777)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                05
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                MAI 2026
              </div>
            </div>
            <div style={{ padding: "16px 20px", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                >
                  Journée Portes Ouvertes CMR
                </div>
                <span
                  style={{
                    background: "#fdf2f8",
                    color: "#be185d",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Événement
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                Siège CMR · 9h00 – 17h00 · Ouvert à tous
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                Découvrez les coulisses de la CMR et les projets en cours lors
                de notre grande journée annuelle.
              </div>
              <button
                style={{
                  marginTop: 12,
                  background: "#db2777",
                  color: "#fff",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Participer
              </button>
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
            }}
          >
            <div
              style={{
                width: 110,
                minHeight: 100,
                background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                20
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                MAI 2026
              </div>
            </div>
            <div style={{ padding: "16px 20px", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                >
                  Team Building Digital 2026
                </div>
                <span
                  style={{
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Initiative
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                Salle Innovation · Direction Digital &amp; IT
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                Hackathon interne, défis collaboratifs et remise des trophées
                CMR Digital Awards.
              </div>
              <button
                style={{
                  marginTop: 12,
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Participer
              </button>
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
            }}
          >
            <div
              style={{
                width: 110,
                minHeight: 100,
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                12
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                JUIN 2026
              </div>
            </div>
            <div style={{ padding: "16px 20px", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}
                >
                  Fête de Fin d'Année CMR
                </div>
                <span
                  style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Événement
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  marginTop: 4,
                }}
              >
                Hôtel Sofitel Rabat · 19h00 · Sur invitation
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
                Soirée annuelle de célébration des réussites et de cohésion
                entre toutes les équipes CMR.
              </div>
              <button
                style={{
                  marginTop: 12,
                  background: "#d97706",
                  color: "#fff",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Participer
              </button>
            </div>
          </div>
        </div>
        {/* Galerie photos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <i
            data-lucide="image"
            style={{ width: 16, height: 16, color: "#64748b" }}
          />
          <span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>
            Galerie Photos
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 8,
          }}
        >
          <div
            style={{
              aspectRatio: 1,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              background: "#e2e8f0",
            }}
            onMouseOver={(event) =>
              runLegacyHandler(event, "this.style.opacity='0.88'")
            }
            onMouseOut={(event) =>
              runLegacyHandler(event, "this.style.opacity='1'")
            }
          >
            <img
              src="images/intranet/news_contract.jpg"
              alt="Signature du contrat programme"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) =>
                runLegacyHandler(
                  event,
                  "this.src='images/intranet/slider1.png'",
                )
              }
            />
          </div>
          <div
            style={{
              aspectRatio: 1,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              background: "#e2e8f0",
            }}
            onMouseOver={(event) =>
              runLegacyHandler(event, "this.style.opacity='0.88'")
            }
            onMouseOut={(event) =>
              runLegacyHandler(event, "this.style.opacity='1'")
            }
          >
            <img
              src="images/intranet/news_board.jpg"
              alt="Conseil d'administration CMR"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) =>
                runLegacyHandler(
                  event,
                  "this.src='images/intranet/slider1.png'",
                )
              }
            />
          </div>
          <div
            style={{
              aspectRatio: 1,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              background: "#e2e8f0",
            }}
            onMouseOver={(event) =>
              runLegacyHandler(event, "this.style.opacity='0.88'")
            }
            onMouseOut={(event) =>
              runLegacyHandler(event, "this.style.opacity='1'")
            }
          >
            <img
              src="images/intranet/news_academy.jpg"
              alt="Session CMR Academy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) =>
                runLegacyHandler(
                  event,
                  "this.src='images/intranet/slider1.png'",
                )
              }
            />
          </div>
          <div
            style={{
              aspectRatio: 1,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              background: "#e2e8f0",
            }}
            onMouseOver={(event) =>
              runLegacyHandler(event, "this.style.opacity='0.88'")
            }
            onMouseOut={(event) =>
              runLegacyHandler(event, "this.style.opacity='1'")
            }
          >
            <img
              src="images/intranet/slider_cmr_tech.png"
              alt="Innovation et transformation digitale"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) =>
                runLegacyHandler(
                  event,
                  "this.src='images/intranet/slider1.png'",
                )
              }
            />
          </div>
          <div
            style={{
              aspectRatio: 1,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              background: "#e2e8f0",
            }}
            onMouseOver={(event) =>
              runLegacyHandler(event, "this.style.opacity='0.88'")
            }
            onMouseOut={(event) =>
              runLegacyHandler(event, "this.style.opacity='1'")
            }
          >
            <img
              src="images/intranet/slider_partnership.png"
              alt="Partenariat CMR"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) =>
                runLegacyHandler(
                  event,
                  "this.src='images/intranet/slider1.png'",
                )
              }
            />
          </div>
          <div
            style={{
              aspectRatio: 1,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              background: "#e2e8f0",
            }}
            onMouseOver={(event) =>
              runLegacyHandler(event, "this.style.opacity='0.88'")
            }
            onMouseOut={(event) =>
              runLegacyHandler(event, "this.style.opacity='1'")
            }
          >
            <img
              src="images/intranet/slider3.png"
              alt="Temps fort vie sociale"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) =>
                runLegacyHandler(
                  event,
                  "this.src='images/intranet/slider1.png'",
                )
              }
            />
          </div>
          <div
            style={{
              aspectRatio: 1,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              background: "#e2e8f0",
            }}
            onMouseOver={(event) =>
              runLegacyHandler(event, "this.style.opacity='0.88'")
            }
            onMouseOut={(event) =>
              runLegacyHandler(event, "this.style.opacity='1'")
            }
          >
            <img
              src="images/intranet/slider2.png"
              alt="Initiative collaborateurs"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) =>
                runLegacyHandler(
                  event,
                  "this.src='images/intranet/slider1.png'",
                )
              }
            />
          </div>
          <div
            style={{
              aspectRatio: 1,
              background: "#f8fafc",
              border: "2px dashed #e2e8f0",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              gap: 4,
            }}
          >
            <i
              data-lucide="plus-circle"
              style={{ width: 24, height: 24, color: "#94a3b8" }}
            />
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Voir tout</span>
          </div>
        </div>
      </div>
      {/* ORGANISATION & GOUVERNANCE VIEW (id technique conservé) */}
    </>
  );
}

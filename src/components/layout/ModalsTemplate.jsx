import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

export default function ModalsTemplate() {
  return (
    <>
      <div>
        {/* MODALS (PLACED AT BODY LEVEL FOR FULL-SCREEN BACKDROP) */}
        <div className="modal-overlay" id="editModal">
          <div className="edit-modal">
            <div className="modal-title">
              <i
                data-lucide="layout-grid"
                style={{ color: "var(--cmr-primary)" }}
              />
              Personnaliser vos raccourcis
            </div>
            <div className="edit-grid">
              <div className="edit-item active">
                <span>Congés</span>
                <i
                  data-lucide="check-circle"
                  style={{ width: 18, color: "var(--cmr-primary)" }}
                />
              </div>
              <div className="edit-item active">
                <span>Réservation</span>
                <i
                  data-lucide="check-circle"
                  style={{ width: 18, color: "var(--cmr-primary)" }}
                />
              </div>
              <div className="edit-item active">
                <span>Note de frais</span>
                <i
                  data-lucide="check-circle"
                  style={{ width: 18, color: "var(--cmr-primary)" }}
                />
              </div>
              <div className="edit-item">
                <span>Annuaire</span>
                <i
                  data-lucide="circle"
                  style={{ width: 18, color: "#cbd5e1" }}
                />
              </div>
              <div className="edit-item active">
                <span>Bloc-note</span>
                <i
                  data-lucide="check-circle"
                  style={{ width: 18, color: "var(--cmr-primary)" }}
                />
              </div>
              <div className="edit-item active">
                <span>Documentation</span>
                <i
                  data-lucide="check-circle"
                  style={{ width: 18, color: "var(--cmr-primary)" }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="secondary-btn"
                onClick={(event) =>
                  runLegacyHandler(event, "toggleModal('editModal')")
                }
              >
                Annuler
              </button>
              <button
                className="primary-btn"
                onClick={(event) =>
                  runLegacyHandler(event, "toggleModal('editModal')")
                }
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
        <div className="modal-overlay" id="consent0908Modal">
          <div className="consent-modal">
            <div className="consent-modal-header">
              <div className="consent-modal-icon">
                <i
                  data-lucide="shield-check"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <div className="consent-modal-title">
                Conformité Loi 09-08
                <span className="consent-modal-subtitle">
                  Protection des données personnelles
                </span>
              </div>
            </div>
            <div className="consent-modal-content">
              <p>
                Pour accéder à l’Intranet, nous vous informons que certaines
                données peuvent être traitées pour assurer le fonctionnement du
                portail, la sécurité et l’amélioration du service.
              </p>
              <p>
                En cliquant sur <strong>J’accepte</strong>, vous confirmez avoir
                pris connaissance de cette information et consentez au
                traitement de vos données conformément à la Loi 09-08.
              </p>
              <a
                className="consent-modal-link"
                href="#"
                onClick={(event) => runLegacyHandler(event, "return false;")}
              >
                Lire la politique de confidentialité
              </a>
              <div
                className="consent-modal-warning"
                id="consent0908Warning"
                style={{ display: "none" }}
              >
                Pour continuer, vous devez accepter.
              </div>
            </div>
            <div className="consent-modal-footer">
              <button
                className="secondary-btn"
                onClick={(event) =>
                  runLegacyHandler(event, "declineConsent0908()")
                }
              >
                Je refuse
              </button>
              <button
                className="primary-btn"
                onClick={(event) =>
                  runLegacyHandler(event, "acceptConsent0908()")
                }
              >
                J’accepte
              </button>
            </div>
          </div>
        </div>
        <div className="modal-overlay" id="tickerDetailModal">
          <div
            className="consent-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tickerDetailTitle"
          >
            <div className="consent-modal-header">
              <div className="consent-modal-icon">
                <i data-lucide="zap" style={{ width: 20, height: 20 }} />
              </div>
              <div className="consent-modal-title" id="tickerDetailTitle">
                Détail Flash Info
                <span
                  className="consent-modal-subtitle"
                  id="tickerDetailSubtitle"
                />
              </div>
              <button
                className="consent-modal-close"
                type="button"
                onClick={(event) =>
                  runLegacyHandler(event, "closeTickerDetailModal()")
                }
                aria-label="Fermer la fenêtre"
              >
                ×
              </button>
            </div>
            <div className="consent-modal-content">
              <p id="tickerDetailBody" style={{ marginBottom: 0 }} />
            </div>
            <div className="consent-modal-footer">
              <button
                className="primary-btn"
                onClick={(event) =>
                  runLegacyHandler(event, "goToFlashDetailFromModal()")
                }
              >
                Consulter
              </button>
            </div>
          </div>
        </div>
        {/* PDF PREVIEW MODAL */}
        <div className="modal-overlay" id="pdfPreviewModal">
          <div
            className="pdf-preview-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdfPreviewTitle"
          >
            <div className="pdf-preview-header">
              <div className="pdf-preview-title" id="pdfPreviewTitle">
                Aperçu document
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  className="secondary-btn"
                  style={{ padding: "10px 14px" }}
                  onClick={(event) =>
                    runLegacyHandler(event, "closePdfPreview()")
                  }
                >
                  Fermer
                </button>
              </div>
            </div>
            <iframe
              className="pdf-preview-frame"
              id="pdfPreviewFrame"
              title="Aperçu PDF"
            />
          </div>
        </div>
      </div>
    </>
  );
}

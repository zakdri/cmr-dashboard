import React, { useEffect, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

const QUICK_ACCESS_STORAGE_KEY = "cmr.quickAccess.selectedLabels";

const getModalsData = () => window.CMR_DATA?.data?.modals || {};

function getQuickAccessItems(modals) {
  return (
    (typeof window !== "undefined" &&
      window.CMR_DATA?.data?.dashboardQuickAccess?.items) ||
    modals.quickAccess?.fallbackItems ||
    []
  );
}

function getSavedQuickAccessLabels(items) {
  const fallbackLabels = items.map((item) => item.label);

  if (typeof window === "undefined") return fallbackLabels;

  try {
    const savedLabels = JSON.parse(
      window.localStorage.getItem(QUICK_ACCESS_STORAGE_KEY) || "null",
    );
    if (!Array.isArray(savedLabels)) return fallbackLabels;

    const availableLabels = new Set(fallbackLabels);
    const validSavedLabels = savedLabels.filter((label) =>
      availableLabels.has(label),
    );

    return validSavedLabels.length > 0 ? validSavedLabels : fallbackLabels;
  } catch {
    return fallbackLabels;
  }
}

export default function ModalsTemplate() {
  const modals = getModalsData();
  const consent0908 = modals.consent0908 || {};
  const tickerDetail = modals.tickerDetail || {};
  const quickAccessItems = getQuickAccessItems(modals);
  const [selectedLabels, setSelectedLabels] = useState(() =>
    getSavedQuickAccessLabels(quickAccessItems),
  );

  useEffect(() => {
    setSelectedLabels((currentLabels) => {
      const availableLabels = quickAccessItems.map((item) => item.label);
      const validCurrentLabels = currentLabels.filter((label) =>
        availableLabels.includes(label),
      );

      return validCurrentLabels.length > 0
        ? validCurrentLabels
        : getSavedQuickAccessLabels(quickAccessItems);
    });
  }, [quickAccessItems]);

  useEffect(() => {
    window.lucide?.createIcons();
  }, [selectedLabels]);

  function toggleQuickAccessItem(label) {
    setSelectedLabels((currentLabels) =>
      currentLabels.includes(label)
        ? currentLabels.filter((currentLabel) => currentLabel !== label)
        : [...currentLabels, label],
    );
  }

  function closeEditModal(event) {
    setSelectedLabels(getSavedQuickAccessLabels(quickAccessItems));
    runLegacyHandler(event, "toggleModal('editModal')");
  }

  function saveQuickAccessSelection(event) {
    window.localStorage.setItem(
      QUICK_ACCESS_STORAGE_KEY,
      JSON.stringify(selectedLabels),
    );
    window.dispatchEvent(
      new CustomEvent("cmr:quick-access-updated", {
        detail: { labels: selectedLabels },
      }),
    );
    runLegacyHandler(event, "toggleModal('editModal')");
  }

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
              {quickAccessItems.map((item) => (
                <div
                  className={`edit-item${
                    selectedLabels.includes(item.label) ? " active" : ""
                  }`}
                  key={item.label}
                  onClick={() => toggleQuickAccessItem(item.label)}
                >
                  <span>{item.label}</span>
                  <i
                    data-lucide={
                    selectedLabels.includes(item.label)
                        ? "check-circle"
                        : "circle"
                    }
                    style={{
                      width: 18,
                      color: selectedLabels.includes(item.label)
                        ? "var(--cmr-primary)"
                        : "#cbd5e1",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="secondary-btn"
                onClick={closeEditModal}
              >
                Annuler
              </button>
              <button
                className="primary-btn"
                onClick={saveQuickAccessSelection}
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
              {(consent0908.paragraphs || []).map((paragraph) => {
                const parts = paragraph.split(consent0908.acceptHighlight);
                return (
                  <p key={paragraph}>
                    {parts[0]}
                    {parts.length > 1 && <strong>{consent0908.acceptHighlight}</strong>}
                    {parts.slice(1).join(consent0908.acceptHighlight)}
                  </p>
                );
              })}
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
                Détail Info Express
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

import React, { useEffect } from "react";

function getApplicationCategories() {
  return window.CMR_DATA?.data?.applicationsCategories || [];
}

export default function ApplisSection() {
  const categories = getApplicationCategories();

  useEffect(() => {
    window.lucide?.createIcons();
  }, [categories]);

  return (
    <div id="view-applis" className="view-section">
      <div className="km-header">
        <h2>Mes Applications</h2>
        <p>Accédez rapidement à tous vos outils métiers et services.</p>
      </div>

      {categories.map((category, categoryIndex) => (
        <React.Fragment key={category.id}>
          <div className="app-category-title">{category.title}</div>
          <div
            className="app-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: categoryIndex === categories.length - 1 ? 0 : 40,
            }}
          >
            {(category.items || []).map((app) => (
              <a
                key={app.id}
                href={app.href || "#"}
                className="app-card-large"
                style={{
                  "--hover-bg": app.hoverBg || "#f8fafc",
                  "--hover-border": app.hoverBorder || "#e2e8f0",
                }}
              >
                <div
                  className="app-card-icon-large"
                  style={{ background: app.iconBackground || "#2563eb" }}
                >
                  <i
                    data-lucide={app.icon || "layers"}
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <div className="app-card-content">
                  <span className="app-card-title-large">{app.title}</span>
                  <p className="app-card-desc">{app.description}</p>
                  <div className="app-card-action">
                    {app.action || "Ouvrir"}
                    <i
                      data-lucide={app.actionIcon || "arrow-right"}
                      style={{ width: 14 }}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

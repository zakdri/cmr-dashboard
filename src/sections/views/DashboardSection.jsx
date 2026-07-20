import React, { useEffect, useMemo, useState } from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

const QUICK_ACCESS_STORAGE_KEY = "cmr.quickAccess.selectedLabels";

function getDashboardData() {
  const data = window.CMR_DATA?.data || {};
  return {
    ticker: data.dashboardTicker || {},
    news: data.dashboardNews || {},
    dgMessage: data.dashboardDgMessage || {},
    quickAccess: data.dashboardQuickAccess || {},
    cards: data.dashboardCards || [],
    vieSocialeEvents: data.vieSocialeEvents || [],
  };
}

function getSavedQuickAccessLabels(items) {
  const fallbackLabels = items.map((item) => item.label);

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

function CardHeader({ card }) {
  const actionLabel = card.actionIcon === "refresh-cw" ? "Actualiser" : "Voir plus";
  return (
    <div className="card-header">
      <div className="card-title">
        <div className={`card-icon ${card.iconClass}`}>
          <i data-lucide={card.icon} style={{ width: 20, height: 20 }} />
        </div>
        {card.title}
      </div>
      {card.actionLabel && (
        <a
          href="#"
          className="card-action"
          style={card.actionNoWrap ? { whiteSpace: "nowrap" } : undefined}
          onClick={
            card.actionHandler
              ? (event) => runLegacyHandler(event, card.actionHandler)
              : undefined
          }
        >
          {actionLabel}
          <i
            data-lucide={card.actionIcon || "arrow-right"}
            style={{ width: 14, height: 14 }}
          />
        </a>
      )}
    </div>
  );
}

function DocIcon({ item }) {
  if (item.badgeClass) {
    return <div className={`doc-icon ${item.badgeClass}`}>{item.badge}</div>;
  }
  if (item.iconBadge) {
    return (
      <div
        className="doc-icon"
        style={{ background: item.background, color: item.color }}
      >
        <i data-lucide={item.iconBadge} style={{ width: 18, height: 18 }} />
      </div>
    );
  }
  return (
    <div
      className="doc-icon"
      style={{
        background: item.background,
        color: item.color,
        fontWeight: 800,
      }}
    >
      {item.badge}
    </div>
  );
}

function DocList({ items = [] }) {
  return (
    <div className="doc-list">
      {items.map((item) => {
        const ItemWrapper = item.handler ? "a" : "div";

        return (
          <ItemWrapper
            className="doc-item"
            href={item.handler ? "#" : undefined}
            key={`${item.title}-${item.meta}`}
            onClick={
              item.handler
                ? (event) => runLegacyHandler(event, item.handler)
                : undefined
            }
            style={item.handler ? { color: "inherit", textDecoration: "none" } : undefined}
          >
            <DocIcon item={item} />
            <div className="doc-info">
              <div className="doc-title">{item.title}</div>
              <div className="doc-meta">{item.meta}</div>
            </div>
            {item.icon && (
              <i
                data-lucide={item.icon}
                style={{
                  width: 16,
                  height: 16,
                  color: item.iconColor || "#94a3b8",
                }}
              />
            )}
          </ItemWrapper>
        );
      })}
    </div>
  );
}

function AppsCard({ card }) {
  return (
    <div className="dashboard-card">
      <CardHeader card={card} />
      <div className="app-grid">
        {(card.items || []).slice(0, 4).map((item) => (
          <div className="app-item" key={item.label}>
            <div className="app-icon" style={{ background: item.background }}>
              <i data-lucide={item.icon} style={{ width: 22, height: 22 }} />
            </div>
            <span className="app-name">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsCard({ card }) {
  const maxItems = Number.isInteger(card.maxItems) ? card.maxItems : card.items?.length;

  return (
    <div className="dashboard-card">
      <CardHeader card={card} />
      <div className="stat-grid">
        {(card.items || []).slice(0, maxItems).map((item) => (
          <div className={`stat-item ${item.className}`} key={item.label}>
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
            <i
              data-lucide={item.icon}
              className="stat-icon"
              style={{ width: 40, height: 40 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DocListCard({ card }) {
  return (
    <div className="dashboard-card">
      <CardHeader card={card} />
      <DocList items={card.items} />
    </div>
  );
}

const monthIndexes = {
  JANVIER: 0,
  FÉVRIER: 1,
  FEVRIER: 1,
  MARS: 2,
  AVRIL: 3,
  MAI: 4,
  JUIN: 5,
  JUILLET: 6,
  AOÛT: 7,
  AOUT: 7,
  SEPTEMBRE: 8,
  OCTOBRE: 9,
  NOVEMBRE: 10,
  DÉCEMBRE: 11,
  DECEMBRE: 11,
};

function parseVieSocialeEventDate(event) {
  const [monthName, year] = (event.month || "").split(" ");
  return new Date(
    Number(year) || 0,
    monthIndexes[monthName] ?? 0,
    Number(event.day) || 1,
  ).getTime();
}

function formatVieSocialeEventDate(event) {
  const [monthName = "", year = ""] = (event.month || "").split(" ");
  const monthLabel = monthName.charAt(0) + monthName.slice(1).toLowerCase();
  return `${event.day} ${monthLabel} ${year}`.trim();
}

function buildVieSocialeDashboardItems(events, maxItems) {
  return [...events]
    .sort((eventA, eventB) => parseVieSocialeEventDate(eventB) - parseVieSocialeEventDate(eventA))
    .slice(0, maxItems)
    .map((event) => ({
      badge: event.tag === "Initiative" ? "INI" : "EVT",
      title: event.title,
      meta: `${formatVieSocialeEventDate(event)} • ${event.meta}`,
      background: event.tagStyle?.background || "#eff6ff",
      color: event.tagStyle?.color || "#256cb5",
      icon: "chevron-right",
      handler: "switchView('vie-sociale'); return false;",
    }));
}

function hydrateDashboardCard(card, dataSources) {
  if (card.source !== "vieSocialeEvents") return card;

  return {
    ...card,
    items: buildVieSocialeDashboardItems(
      dataSources.vieSocialeEvents,
      card.maxItems || 3,
    ),
  };
}

function ShortcutsCard({ card }) {
  return (
    <div className="dashboard-card">
      <CardHeader card={card} />
      <div
        className="quick-access-grid"
        id="instShortcutsGrid"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {(card.items || []).map((item) => (
          <a
            href="#"
            className="quick-access-item inst-shortcut"
            key={item.label}
            onClick={(event) =>
              runLegacyHandler(
                event,
                "switchView('institutionnel'); return false;",
              )
            }
          >
            <div className="quick-access-icon">
              <i data-lucide={item.icon} style={{ width: 20, height: 20 }} />
            </div>
            <span className="quick-access-label">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function KmCard({ card }) {
  return (
    <div className="dashboard-card">
      <CardHeader card={card} />
      <div className="km-tabs">
        {(card.tabs || []).map((tab, index) => (
          <button
            key={tab.id}
            className={`km-tab${index === 0 ? " active" : ""}`}
            onClick={(event) =>
              runLegacyHandler(event, `switchKmTab('${tab.id}')`)
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      {(card.tabs || []).map((tab, index) => (
        <div
          key={tab.id}
          id={`km-${tab.id}`}
          className={`km-content${index === 0 ? " active" : ""}`}
        >
          <DocList items={tab.items} />
        </div>
      ))}
    </div>
  );
}

function IdeasCard({ card }) {
  return (
    <div className="dashboard-card">
      <CardHeader card={card} />
      <div className="idee-stats">
        {(card.stats || []).map((stat) => (
          <div className="idee-stat" key={stat.label}>
            <div className="idee-number">{stat.value}</div>
            <div className="idee-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="idee-progress">
        <div className="idee-check">
          <i data-lucide="check" style={{ width: 18, height: 18 }} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#14532d" }}>
            {card.progress?.value}
          </div>
          <div style={{ fontSize: 12, color: "#15803d" }}>
            {card.progress?.label}
          </div>
        </div>
        <i
          data-lucide="arrow-right"
          style={{
            width: 16,
            height: 16,
            color: "#15803d",
            marginLeft: "auto",
          }}
        />
      </div>
    </div>
  );
}

function DashboardCard({ card }) {
  if (card.type === "apps") return <AppsCard card={card} />;
  if (card.type === "stats") return <StatsCard card={card} />;
  if (card.type === "shortcuts") return <ShortcutsCard card={card} />;
  if (card.type === "km") return <KmCard card={card} />;
  if (card.type === "ideas") return <IdeasCard card={card} />;
  return <DocListCard card={card} />;
}

function NewsBlock({ news }) {
  return (
    <div className="dashboard-card news-card-v2">
      <div className="news-slider-mini">
        {(news.slides || []).map((slide, index) => (
          <a
            href="#"
            key={slide.title}
            className={`news-slide-mini${index === 0 ? " active" : ""}`}
            onClick={(event) => runLegacyHandler(event, slide.handler)}
          >
            <img src={slide.image} alt={slide.alt} />
            <div className="mini-overlay">
              <div className="mini-news-title">{slide.title}</div>
              <div
                className="news-item-meta-mini"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {slide.meta}
              </div>
            </div>
          </a>
        ))}
        <div
          className="carousel-indicators"
          style={{ right: 20, bottom: 15, zIndex: 10 }}
        >
          {(news.slides || []).map((slide, index) => (
            <div
              key={slide.title}
              className={`carousel-dot${index === 0 ? " active" : ""}`}
              onClick={(event) =>
                runLegacyHandler(event, `goToMiniSlide(${index})`)
              }
            />
          ))}
        </div>
      </div>
      <div className="news-content-area">
        <div className="card-header" style={{ padding: 0, marginBottom: 24 }}>
          <div className="card-title">
            <div className={`card-icon ${news.iconClass}`}>
              <i data-lucide={news.icon} style={{ width: 20, height: 20 }} />
            </div>
            {news.title}
          </div>
          <a
            href="#"
            className="card-action"
            onClick={(event) => runLegacyHandler(event, news.actionHandler)}
          >
            Voir tout
            <i data-lucide="arrow-right" style={{ width: 14, height: 14 }} />
          </a>
        </div>
        <div className="news-list-mini">
          {(news.miniItems || []).map((item) => (
            <a
              href="#"
              className="news-item-mini"
              key={item.title}
              onClick={(event) => runLegacyHandler(event, item.handler)}
            >
              <img src={item.image} alt={item.alt} />
              <div className="news-item-content-mini">
                <div className="news-item-title-mini">{item.title}</div>
                <div className="news-item-meta-mini">{item.meta}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function DgMessage({ message }) {
  return (
    <div className="dashboard-card" id="dgMessageCard" style={{ marginBottom: 24 }}>
      <div className="card-header" style={{ marginBottom: 16 }}>
        <div className="card-title">
          <div className={`card-icon ${message.iconClass}`}>
            <i data-lucide={message.icon} style={{ width: 20, height: 20 }} />
          </div>
          {message.title}
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "linear-gradient(135deg, #fb923c, #f59e0b)",
            color: "white",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
          }}
        >
          {message.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--cmr-primary)",
                background: "#eff6ff",
                padding: "4px 10px",
                borderRadius: 999,
              }}
            >
              {message.category}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--text-light)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <i data-lucide="calendar" style={{ width: 14, height: 14 }} />
              {message.date}
            </span>
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 6,
              color: "var(--text-main)",
            }}
          >
            {message.headline}
          </div>
          <div
            style={{
              color: "var(--text-light)",
              fontSize: 13,
              lineHeight: "1.6",
            }}
          >
            {message.body}
          </div>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: "#f1f5f9",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--text-light)",
                }}
              >
                <i data-lucide="user" style={{ width: 16, height: 16 }} />
              </div>
              <div style={{ fontSize: 12, color: "var(--text-light)" }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: "var(--text-main)",
                    lineHeight: "1.1",
                  }}
                >
                  {message.author}
                </div>
                <div style={{ lineHeight: "1.1" }}>{message.organization}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                className="secondary-btn"
                onClick={(event) =>
                  runLegacyHandler(event, "markDgMessageRead()")
                }
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  whiteSpace: "nowrap",
                }}
              >
                Marquer comme lu
              </button>
              <a
                href="#"
                className="primary-btn"
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
                onClick={(event) =>
                  runLegacyHandler(event, "goToDgMessage(); return false;")
                }
              >
                Lire le message
                <i data-lucide="arrow-right" style={{ width: 14, height: 14 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAccess({ quickAccess }) {
  return (
    <section className="quick-access-bar">
      <div className="quick-access-header">
        <div
          className="quick-access-title"
          style={{ cursor: "pointer" }}
          onClick={(event) => runLegacyHandler(event, "toggleModal('editModal')")}
        >
          <i
            data-lucide="layout-grid"
            style={{ width: 20, height: 20, color: "var(--cmr-primary)" }}
          />
          {quickAccess.title}
        </div>
        <button
          className="manage-btn"
          onClick={(event) => runLegacyHandler(event, "toggleModal('editModal')")}
        >
          <i data-lucide="settings-2" style={{ width: 14, height: 14 }} />
          Gérer
        </button>
      </div>
      <div className="quick-access-grid">
        {(quickAccess.items || []).map((item) => (
          <a href="#" className="quick-access-item" key={item.label}>
            <div className="quick-access-icon">
              <i data-lucide={item.icon} style={{ width: 20, height: 20 }} />
            </div>
            <span className="quick-access-label">{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function DashboardSection() {
  const { ticker, news, dgMessage, quickAccess, cards, vieSocialeEvents } = getDashboardData();
  const quickAccessItems = quickAccess.items || [];
  const [selectedQuickAccessLabels, setSelectedQuickAccessLabels] = useState(
    () => getSavedQuickAccessLabels(quickAccessItems),
  );

  useEffect(() => {
    setSelectedQuickAccessLabels(getSavedQuickAccessLabels(quickAccessItems));
  }, [quickAccessItems]);

  useEffect(() => {
    function handleQuickAccessUpdated(event) {
      setSelectedQuickAccessLabels(event.detail?.labels || []);
    }

    window.addEventListener(
      "cmr:quick-access-updated",
      handleQuickAccessUpdated,
    );
    return () => {
      window.removeEventListener(
        "cmr:quick-access-updated",
        handleQuickAccessUpdated,
      );
    };
  }, []);

  useEffect(() => {
    window.lucide?.createIcons();
  }, [selectedQuickAccessLabels]);

  const visibleQuickAccess = useMemo(
    () => ({
      ...quickAccess,
      items: quickAccessItems.filter((item) =>
        selectedQuickAccessLabels.includes(item.label),
      ),
    }),
    [quickAccess, quickAccessItems, selectedQuickAccessLabels],
  );
  const hydratedCards = useMemo(
    () => cards.map((card) => hydrateDashboardCard(card, { vieSocialeEvents })),
    [cards, vieSocialeEvents],
  );

  return (
    <>
      <div id="view-dashboard" className="view-section active">
        <div className="news-ticker-container">
          <div className="ticker-label">
            <i data-lucide="zap" style={{ width: 16, height: 16 }} />
            FLASH INFO
          </div>
          <div className="ticker-wrapper" id="tickerWrapper"></div>
        </div>
        <NewsBlock news={news} />
        <QuickAccess quickAccess={visibleQuickAccess} />
        <div className="dashboard-grid">
          {hydratedCards.map((card) => (
            <DashboardCard card={card} key={card.title} />
          ))}
        </div>
      </div>
    </>
  );
}

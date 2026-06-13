import React from "react";
import { runLegacyHandler } from "../../legacy/runLegacyHandler.js";

const getRightSidebarData = () =>
  window.CMR_DATA?.data?.dashboardRightSidebar || {};

const iconSize18 = { width: 18, height: 18 };
const iconSize20 = { width: 20, height: 20 };
const iconSize12 = { width: 12, height: 12 };
const iconSize10 = { width: 10, height: 10 };

const manageButtonStyle = {
  marginLeft: "auto",
  background: "rgba(0,0,0,0.03)",
  border: "none",
  padding: "4px 8px",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 4,
  color: "#64748b",
  fontSize: 11,
  fontWeight: 600,
};

const tabWrapperStyle = {
  background: "#f1f5f9",
  padding: 4,
  borderRadius: 12,
  display: "flex",
  marginBottom: 20,
};

const activeTabStyle = {
  flex: 1,
  textAlign: "center",
  padding: 8,
  background: "white",
  border: "none",
  borderRadius: 10,
  fontSize: 12,
  fontWeight: 700,
  color: "#f59e0b",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  cursor: "pointer",
  transition: "0.2s",
};

const inactiveTabStyle = {
  flex: 1,
  textAlign: "center",
  padding: 8,
  background: "transparent",
  border: "none",
  borderRadius: 10,
  fontSize: 12,
  fontWeight: 500,
  color: "#64748b",
  cursor: "pointer",
  transition: "0.2s",
};

const agendaItemStyle = {
  padding: 16,
  borderRadius: 20,
  background: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  display: "flex",
  alignItems: "center",
  gap: 15,
};

const timeBoxStyle = {
  background: "#eff6ff",
  color: "#3b82f6",
  width: 45,
  height: 45,
  borderRadius: 14,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const agendaTitleStyle = {
  fontSize: 13,
  fontWeight: 700,
  color: "#1e293b",
  marginBottom: 4,
};

const agendaMetaRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const agendaMetaStyle = {
  fontSize: 11,
  color: "#64748b",
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const joinButtonStyle = {
  background: "#eff6ff",
  color: "#3b82f6",
  border: "none",
  padding: "4px 10px",
  borderRadius: 6,
  fontSize: 10,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const dateBoxStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 14,
  overflow: "hidden",
  width: 45,
  textAlign: "center",
};

const birthdayCardStyle = {
  background: "white",
  padding: 16,
  borderRadius: 20,
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  border: "none",
};

function RightBlockIcon({ icon, style }) {
  return (
    <div className="right-block-icon" style={style}>
      <i data-lucide={icon} style={iconSize18} />
    </div>
  );
}

function PersonalAgendaItem({ item }) {
  return (
    <div style={agendaItemStyle}>
      <div style={timeBoxStyle}>
        <span style={{ fontSize: 11, fontWeight: 800 }}>{item.time}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={agendaTitleStyle}>{item.title}</div>
        <div style={agendaMetaRowStyle}>
          <div style={agendaMetaStyle}>
            <i data-lucide={item.metaIcon} style={iconSize10} /> {item.meta}
          </div>
          <button style={joinButtonStyle}>
            <i data-lucide="video" style={iconSize12} />
            Rejoindre
          </button>
        </div>
      </div>
    </div>
  );
}

function CmrAgendaItem({ item }) {
  return (
    <div style={agendaItemStyle}>
      <div style={dateBoxStyle}>
        <div
          style={{
            background: item.monthBackground,
            color: "white",
            fontSize: 9,
            fontWeight: 700,
            padding: "2px 0",
          }}
        >
          {item.month}
        </div>
        <div
          style={{
            padding: "4px 0",
            fontSize: 13,
            fontWeight: 800,
            color: "#1e293b",
          }}
        >
          {item.day}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
          {item.title}
        </div>
        <div style={{ fontSize: 11, color: "#64748b" }}>{item.meta}</div>
      </div>
    </div>
  );
}

export default function RightSidebarTemplate() {
  const rightSidebar = getRightSidebarData();
  const quote = rightSidebar.quote || {};
  const mood = rightSidebar.mood || {};
  const agenda = rightSidebar.agenda || {};
  const birthdays = rightSidebar.birthdays || {};
  const flashInfo = rightSidebar.flashInfo || {};
  const agendaTabs = agenda.tabs || [];
  const personalTab = agendaTabs.find((tab) => tab.id === "perso") || {};
  const cmrTab = agendaTabs.find((tab) => tab.id === "cmr") || {};

  return (
    <>
      <aside className="sidebar-right" id="rightSidebar">
        <div className="quote-block">
          <div className="right-block-header">
            <RightBlockIcon icon={quote.icon} style={quote.iconStyle} />
            <strong>{quote.title}</strong>
          </div>
          <div
            className="quote-text"
            style={{
              color: "#1e293b",
              fontSize: 15,
              fontStyle: "italic",
              lineHeight: "1.6",
              display: "block",
            }}
          >
            {quote.text}
          </div>
        </div>

        <div className="right-block">
          <div className="right-block-header">
            <RightBlockIcon icon={mood.icon} style={mood.iconStyle} />
            <span id="mood-title">{mood.title}</span>
          </div>
          <div className="mood-results" id="moodResults">
            {(mood.results || []).map((item) => (
              <div className="mood-stat" key={item.emoji}>
                <span className="mood-stat-label">{item.emoji}</span>
                <div className="mood-stat-bar-bg">
                  <div
                    className="mood-stat-bar-fill"
                    style={{ background: item.color }}
                    data-percent={item.percent}
                  />
                </div>
                <span className="mood-stat-percent">{item.percent}%</span>
              </div>
            ))}
            <button
              className="retry-mood-btn"
              onClick={(event) => runLegacyHandler(event, "resetMood()")}
            >
              <i data-lucide="rotate-ccw" style={{ width: 14, height: 14 }} />
              Changer d'avis
            </button>
          </div>
          <div className="mood-buttons" id="moodButtons">
            {(mood.buttons || []).map((button) => (
              <button
                className="mood-btn"
                data-mood={button.mood}
                key={button.mood}
                onClick={(event) => runLegacyHandler(event, "selectMood(this)")}
              >
                <i data-lucide={button.icon} style={iconSize20} />
              </button>
            ))}
          </div>
        </div>

        <div className="right-block">
          <div className="right-block-header">
            <RightBlockIcon icon={agenda.icon} style={agenda.iconStyle} />
            <strong>{agenda.title}</strong>
            <button className="manage-btn" style={manageButtonStyle}>
              <i data-lucide="settings-2" style={iconSize12} />
              Gérer
            </button>
          </div>
          <div style={tabWrapperStyle}>
            <button
              id={personalTab.buttonId}
              onClick={(event) =>
                runLegacyHandler(event, "openAgendaTab('perso')")
              }
              className="agenda-tab-btn active"
              style={activeTabStyle}
            >
              Ma Journée
            </button>
            <button
              id={cmrTab.buttonId}
              onClick={(event) => runLegacyHandler(event, "openAgendaTab('cmr')")}
              className="agenda-tab-btn"
              style={inactiveTabStyle}
            >
              Calendrier CMR
            </button>
          </div>
          <div
            id={personalTab.listId}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {(agenda.personalItems || []).map((item) => (
              <PersonalAgendaItem
                item={item}
                key={`${item.time}-${item.title}`}
              />
            ))}
          </div>
          <div
            id={cmrTab.listId}
            style={{ display: "none", flexDirection: "column", gap: 12 }}
          >
            {(agenda.cmrItems || []).map((item) => (
              <CmrAgendaItem item={item} key={`${item.month}-${item.day}`} />
            ))}
          </div>
        </div>

        <div className="right-block">
          <div className="right-block-header">
            <RightBlockIcon icon={birthdays.icon} style={birthdays.iconStyle} />
            {birthdays.title}
          </div>
          <div className="team-list" style={{ gap: 16 }}>
            {(birthdays.items || []).map((item) => (
              <div className="team-member" style={birthdayCardStyle} key={item.name}>
                <div className="member-avatar" style={birthdays.avatarStyle}>
                  <i data-lucide={birthdays.avatarIcon} style={iconSize20} />
                </div>
                <div className="member-info">
                  <span className="member-name" style={{ fontSize: 15 }}>
                    {item.name}
                  </span>
                  <span
                    className="member-role"
                    style={{ color: "#f59e0b", fontWeight: 700 }}
                  >
                    {item.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flash-info-card">
          <div className="right-block-header">
            <RightBlockIcon icon={flashInfo.icon} style={flashInfo.iconStyle} />
            <strong>{flashInfo.title}</strong>
            <span className="live-badge" style={{ marginLeft: "auto" }}>
              {flashInfo.badge}
            </span>
          </div>
          <div className="flash-content-box">
            <div className="flash-subject">{flashInfo.subject}</div>
            <div className="flash-desc">{flashInfo.description}</div>
          </div>
        </div>
      </aside>
    </>
  );
}

import React, { useEffect, useMemo, useState } from "react";

function getForumData() {
  const data = window.CMR_DATA?.data || {};
  return { header: data.collabHeader || {}, threads: data.collabForumThreads || [], themes: data.collabForumThemes || [] };
}

export default function CollaboratifsSection() {
  const { header, threads: initialThreads, themes } = getForumData();
  const [threads, setThreads] = useState(initialThreads);
  const [selectedId, setSelectedId] = useState(initialThreads[0]?.id || "");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("Tous");
  const [reply, setReply] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [showPublisher, setShowPublisher] = useState(false);
  const visibleThreads = useMemo(() => threads.filter((item) => {
    const term = query.trim().toLowerCase();
    return (theme === "Tous" || item.theme === theme) && (!term || [item.title, item.body, item.theme].join(" ").toLowerCase().includes(term));
  }), [threads, query, theme]);
  const selected = threads.find((item) => item.id === selectedId) || visibleThreads[0];

  useEffect(() => { window.lucide?.createIcons(); }, [selectedId, query, theme, threads, showPublisher]);

  function addReply(event) {
    event.preventDefault();
    const message = reply.trim();
    if (!message || !selected) return;
    setThreads((items) => items.map((item) => item.id === selected.id ? { ...item, replies: [...(item.replies || []), { author: anonymous ? "Anonyme" : "Vous", date: "À l'instant", text: message }] } : item));
    setReply("");
  }

  return (
    <div id="view-collaboratifs" className="view-section km-container">
      <div className="km-header"><h2>{header.title}</h2><p>{header.description}</p></div>
      <div id="collabMainNavbar" className="km-navbar forum-navbar"><div className="km-nav-item active">Discussions</div></div>
      <p className="section-intro">Les sujets sont publiés par la DCH. Les collaborateurs peuvent les consulter et participer aux échanges, avec la possibilité de commenter anonymement.</p>
      <div className="content-card forum-toolbar"><div className="forum-toolbar-heading"><div><h3>Rechercher dans les discussions</h3><p>Filtrez les sujets publiés par la DCH par mot-clé ou par thème.</p></div><span>{visibleThreads.length} sujet(s)</span></div><div className="section-search-row"><i data-lucide="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un sujet..." /></div><div className="academy-horizontal-filter">{["Tous", ...themes].map((item) => <button className={`filter-pill${theme === item ? " active" : ""}`} key={item} onClick={() => setTheme(item)}>{item}</button>)}</div></div>
      <div className="forum-layout">
        <section className="content-card forum-list-panel"><div className="card-title"><div className="card-icon blue"><i data-lucide="messages-square" /></div>Sujets en discussion</div><div className="doc-list">{visibleThreads.map((thread) => <button className={`doc-item forum-topic${selected?.id === thread.id ? " active" : ""}`} key={thread.id} onClick={() => setSelectedId(thread.id)}><div className="doc-icon" style={{ background: "#eff6ff", color: "#256cb5" }}>DCH</div><div className="doc-info"><div className="doc-title">{thread.title}</div><div className="doc-meta">{thread.theme} · {thread.date} · {(thread.replies || []).length} commentaire(s)</div></div><i data-lucide="chevron-right" /></button>)}{!visibleThreads.length ? <p className="empty-state">Aucun sujet trouvé.</p> : null}</div></section>
        <section className="content-card forum-detail-panel">{selected ? <><div className="forum-topic-header"><span className="forum-theme-badge">{selected.theme}</span><span>{selected.date}</span></div><h3>{selected.title}</h3><p className="forum-topic-body">{selected.body}</p><div className="forum-author"><i data-lucide="badge-check" />Publié par {selected.author || "DCH"}</div><div className="forum-replies"><h4>Messages et commentaires</h4>{(selected.replies || []).map((item, index) => <article key={`${item.author}-${index}`}><div><strong>{item.author}</strong><span>{item.date}</span></div><p>{item.text}</p></article>)}</div><form className="forum-reply-form" onSubmit={addReply}><textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Ajouter un message ou un commentaire..." /><div><label className="forum-anonymous-option"><input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} />Publier anonymement</label><button className="primary-btn" type="submit"><i data-lucide="send" />Publier</button></div></form></> : <p className="empty-state">Sélectionnez un sujet.</p>}</section>
      </div>
      <section className="content-card forum-publisher-panel"><div className="forum-publisher-header"><div><span className="forum-publisher-icon"><i data-lucide="lock-keyhole" /></span><div><h3>Publication d'un sujet</h3><p>Fonction réservée aux profils habilités de la DCH.</p></div></div><div><span className="access-badge">DCH uniquement</span><button className="secondary-btn" type="button" onClick={() => setShowPublisher(!showPublisher)}>{showPublisher ? "Masquer le formulaire" : "Afficher le formulaire"}<i data-lucide={showPublisher ? "chevron-up" : "chevron-down"} /></button></div></div>{showPublisher ? <div className="forum-publisher-form"><div className="governance-access-note"><i data-lucide="shield-check" /><div><strong>Publication restreinte</strong><span>Seuls les profils habilités DCH peuvent créer un sujet.</span></div></div><div className="forum-publisher-fields"><label>Titre<input type="text" placeholder="Titre du sujet" disabled /></label><label>Thème<select disabled><option>Sélectionner un thème</option>{themes.map((item) => <option key={item}>{item}</option>)}</select></label><label className="forum-publisher-subject">Sujet<textarea placeholder="Contenu du sujet" disabled /></label></div><div className="forum-publisher-actions"><button className="primary-btn" type="button" disabled>Publier le sujet</button></div></div> : null}</section>
    </div>
  );
}

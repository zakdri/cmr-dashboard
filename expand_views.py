import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Navigation Links
nav_updates = [
    (r'<a href="#" class="nav-item">\s*<i data-lucide="coffee"></i>\s*<span>Vie Sociale</span>\s*</a>', 
     r'<div id="nav-vie-sociale" class="nav-item" onclick="switchView(\'vie-sociale\')">\n                    <i data-lucide="coffee"></i>\n                    <span>Vie Sociale</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="folder-open"></i>\s*<span>Documentaires</span>\s*</a>', 
     r'<div id="nav-documentaires" class="nav-item" onclick="switchView(\'documentaires\')">\n                    <i data-lucide="folder-open"></i>\n                    <span>Documentaires</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="network"></i>\s*<span>Collaboratifs</span>\s*</a>', 
     r'<div id="nav-collaboratifs" class="nav-item" onclick="switchView(\'collaboratifs\')">\n                    <i data-lucide="network"></i>\n                    <span>Collaboratifs</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="briefcase"></i>\s*<span>Projets</span>\s*</a>', 
     r'<div id="nav-projets" class="nav-item" onclick="switchView(\'projets\')">\n                    <i data-lucide="briefcase"></i>\n                    <span>Projets</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="landmark"></i>\s*<span>Institutionnel</span>\s*</a>', 
     r'<div id="nav-institutionnel" class="nav-item" onclick="switchView(\'institutionnel\')">\n                    <i data-lucide="landmark"></i>\n                    <span>Institutionnel</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="shield-check"></i>\s*<span>Réglementation</span>\s*</a>', 
     r'<div id="nav-reglementation" class="nav-item" onclick="switchView(\'reglementation\')">\n                    <i data-lucide="shield-check"></i>\n                    <span>Réglementation</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="shopping-cart"></i>\s*<span>Achats</span>\s*</a>', 
     r'<div id="nav-achats" class="nav-item" onclick="switchView(\'achats\')">\n                    <i data-lucide="shopping-cart"></i>\n                    <span>Achats</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="leaf"></i>\s*<span>RSE</span>\s*</a>', 
     r'<div id="nav-rse" class="nav-item" onclick="switchView(\'rse\')">\n                    <i data-lucide="leaf"></i>\n                    <span>RSE</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="lightbulb"></i>\s*<span>Innovation</span>\s*</a>', 
     r'<div id="nav-innovation" class="nav-item" onclick="switchView(\'innovation\')">\n                    <i data-lucide="lightbulb"></i>\n                    <span>Innovation</span>\n                </div>'),
    (r'<a href="#" class="nav-item">\s*<i data-lucide="settings"></i>\s*<span>Administration & Pilotage</span>\s*</a>', 
     r'<div id="nav-admin" class="nav-item" onclick="switchView(\'admin\')">\n                    <i data-lucide="settings"></i>\n                    <span>Administration & Pilotage</span>\n                </div>')
]

for old_tag, new_tag in nav_updates:
    content = re.sub(old_tag, new_tag, content)

# 2. Inject HTML Views before <aside class="sidebar-right"
injection_marker = r'</main>\s*<!-- RIGHT SIDEBAR -->'

new_views = """
            <!-- VIE SOCIALE VIEW -->
            <div id="view-vie-sociale" class="view-section km-container">
                <div class="km-header">
                    <h2>Espace Vie Sociale</h2>
                    <p>Renforcez la cohésion interne : Événements, Galerie photos et Capsules vidéo.</p>
                </div>
                <div class="km-grid">
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large" style="background: #fdf2f8; color: #db2777;">
                            <i data-lucide="camera" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Galerie Photos</div>
                        <p style="font-size: 13px; color: var(--text-light); margin-top: 8px;">Dernières photos des événements CMR.</p>
                        <div class="doc-card-meta">
                            <span style="color: #db2777; font-weight: 600;">Ouvrir</span>
                            <i data-lucide="image" style="width: 16px;"></i>
                        </div>
                    </div>
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large" style="background: #eff6ff; color: #3b82f6;">
                            <i data-lucide="calendar" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Événements à venir</div>
                        <p style="font-size: 13px; color: var(--text-light); margin-top: 8px;">Team building, conférences, fêtes.</p>
                        <div class="doc-card-meta">
                            <span style="color: #3b82f6; font-weight: 600;">S'inscrire</span>
                            <i data-lucide="calendar-plus" style="width: 16px;"></i>
                        </div>
                    </div>
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large" style="background: #f0fdf4; color: #16a34a;">
                            <i data-lucide="video" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Capsules Vidéo</div>
                        <p style="font-size: 13px; color: var(--text-light); margin-top: 8px;">Interviews, rétrospectives.</p>
                        <div class="doc-card-meta">
                            <span style="color: #16a34a; font-weight: 600;">Regarder</span>
                            <i data-lucide="play-circle" style="width: 16px;"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- INSTITUTIONNEL VIEW -->
            <div id="view-institutionnel" class="view-section km-container">
                <div class="km-header">
                    <h2>Espace Institutionnel</h2>
                    <p>Organisation, Gouvernance, Plan stratégique et Référentiels.</p>
                </div>
                <div class="app-category-title">Organisation</div>
                <div class="app-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 40px;">
                    <a href="#" class="app-card-large" style="--hover-bg: #f0f9ff; --hover-border: #bae6fd;">
                        <div class="app-card-icon-large" style="background: linear-gradient(135deg, #0ea5e9, #0284c7);">
                            <i data-lucide="network" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="app-card-content">
                            <span class="app-card-title-large">Organigramme Interactif</span>
                            <p class="app-card-desc">Visualisez l'organisation des directions opérationnelles de la CMR.</p>
                            <div class="app-card-action">Consulter<i data-lucide="arrow-right" style="width: 14px;"></i></div>
                        </div>
                    </a>
                    <a href="#" class="app-card-large" style="--hover-bg: #fff7ed; --hover-border: #fed7aa;">
                        <div class="app-card-icon-large" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                            <i data-lucide="target" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="app-card-content">
                            <span class="app-card-title-large">Plan Stratégique</span>
                            <p class="app-card-desc">Objectifs et axes de la stratégie CMR 2026-2028.</p>
                            <div class="app-card-action">Consulter<i data-lucide="arrow-right" style="width: 14px;"></i></div>
                        </div>
                    </a>
                </div>
                <div class="app-category-title">Gouvernance & Mémentos</div>
                <div class="km-grid">
                    <div class="doc-card">
                        <div class="doc-icon-large pdf"><i data-lucide="file-text" style="width: 24px; height: 24px;"></i></div>
                        <div class="doc-card-title">Règlement Intérieur 2026.pdf</div>
                        <div class="doc-card-meta"><span>Dernière version</span><i data-lucide="download" style="width: 16px; color: #94a3b8;"></i></div>
                    </div>
                </div>
            </div>

            <!-- PROJETS VIEW -->
            <div id="view-projets" class="view-section km-container">
                <div class="km-header">
                    <h2>Espace Projets</h2>
                    <p>Vision transverse du portefeuille projets (Fiches, Indicateurs, Livrables).</p>
                </div>
                <div class="km-grid">
                    <div class="doc-card">
                        <div class="doc-icon-large" style="background: #eff6ff; color: #3b82f6;"><i data-lucide="briefcase" style="width: 24px; height: 24px;"></i></div>
                        <div class="doc-card-title">Projet Refonte Intranet</div>
                        <p style="font-size: 13px; margin-top: 8px;">Phase 2 : Conception SFD / Maquettes</p>
                        <div style="height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; margin-top: 10px;">
                            <div style="width: 70%; height: 100%; background: #3b82f6;"></div>
                        </div>
                        <div class="doc-card-meta"><span style="font-weight: 600;">Ouvert</span><span>Progression: 70%</span></div>
                    </div>
                </div>
            </div>

            <!-- DOCUMENTAIRES VIEW -->
            <div id="view-documentaires" class="view-section km-container">
                <div class="km-header">
                    <h2>Espaces Documentaires</h2>
                    <p>Gestion des documents actifs avec métadonnées et lien GED.</p>
                </div>
                <div class="km-grid">
                    <div class="doc-card">
                        <div class="doc-icon-large folder"><i data-lucide="folder" style="width: 24px; height: 24px;"></i></div>
                        <div class="doc-card-title">Documents Publics</div>
                        <div class="doc-card-meta"><span>12 fichiers</span><i data-lucide="chevron-right" style="width: 16px;"></i></div>
                    </div>
                </div>
            </div>
            
            <!-- INNOVATION VIEW -->
            <div id="view-innovation" class="view-section km-container">
                <div class="km-header">
                    <h2>Espace Innovation</h2>
                    <p>Dépôt d’idées, Vote collaboratif et Suivi d'évolution.</p>
                </div>
                <div class="dashboard-card" style="margin-top: 20px;">
                    <div class="card-header pb-4 border-b border-gray-100">
                        <div class="card-title">Campagne d'idéation "Digit-Passe"</div>
                        <button class="primary-btn">Déposer une idée</button>
                    </div>
                    <div style="padding: 20px 0;">
                        <p style="color: var(--text-light);">Aucune nouvelle idée soumise aujourd'hui.</p>
                    </div>
                </div>
            </div>
"""

content = re.sub(injection_marker, new_views + "\n</main>\n        <!-- RIGHT SIDEBAR -->", content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully via python hook")

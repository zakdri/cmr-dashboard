import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

injection_marker = r'</main>\s*<!-- RIGHT SIDEBAR -->'

new_views = r"""
            <!-- RÉGLEMENTATION VIEW -->
            <div id="view-reglementation" class="view-section km-container">
                <div class="km-header">
                    <h2>Espace Réglementation</h2>
                    <p>Centralisation des textes réglementaires, normes et référentiels officiels.</p>
                </div>
                <div class="km-grid">
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large pdf" style="color: #dc2626; background: #fee2e2;">
                            <i data-lucide="scale" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Dahirs & Lois</div>
                        <div class="doc-card-meta">
                            <span>Sélection Officielle</span>
                        </div>
                    </div>
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large word" style="color: #2563eb; background: #dbeafe;">
                            <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Circulaires & Décisions</div>
                        <div class="doc-card-meta">
                            <span>Publications par année</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- COLLABORATIFS VIEW -->
            <div id="view-collaboratifs" class="view-section km-container">
                <div class="km-header">
                    <h2>Espaces Collaboratifs</h2>
                    <p>Forums, groupes de travail et espaces de partage transverses.</p>
                </div>
                <div class="app-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
                    <a href="#" class="app-card-large" style="--hover-bg: #f8fafc; --hover-border: #cbd5e1;">
                        <div class="app-card-icon-large" style="background: #eab308; color: white;">
                            <i data-lucide="users" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="app-card-content">
                            <span class="app-card-title-large">Communautés Métiers</span>
                            <p class="app-card-desc">Groupes d'échanges et bonnes pratiques.</p>
                            <div class="app-card-action">Rejoindre<i data-lucide="arrow-right" style="width: 14px;"></i></div>
                        </div>
                    </a>
                    <a href="#" class="app-card-large" style="--hover-bg: #f0f9ff; --hover-border: #bae6fd;">
                        <div class="app-card-icon-large" style="background: #0284c7; color: white;">
                            <i data-lucide="message-square" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="app-card-content">
                            <span class="app-card-title-large">Forums de discussion</span>
                            <p class="app-card-desc">Questions techniques et entraide interne.</p>
                            <div class="app-card-action">Consulter<i data-lucide="arrow-right" style="width: 14px;"></i></div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- ACHATS VIEW -->
            <div id="view-achats" class="view-section km-container">
                <div class="km-header">
                    <h2>Espace Achats</h2>
                    <p>Support opérationnel, accès PPA et référentiel fournisseurs.</p>
                </div>
                <div class="km-grid">
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large" style="background: #fdf2f8; color: #db2777;">
                            <i data-lucide="shopping-bag" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Plan Prévisionnel des Achats (PPA)</div>
                        <div class="doc-card-meta">
                            <span>Version 2026 consolidée</span>
                            <i data-lucide="download" style="width: 16px;"></i>
                        </div>
                    </div>
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large" style="background: #eff6ff; color: #3b82f6;">
                            <i data-lucide="book-check" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Référentiel Fournisseurs</div>
                        <div class="doc-card-meta">
                            <span>Dernière MAJ: 3 jours</span>
                            <i data-lucide="external-link" style="width: 16px;"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RSE VIEW -->
            <div id="view-rse" class="view-section km-container">
                <div class="km-header">
                    <h2>Espace RSE</h2>
                    <p>Politique de Responsabilité Sociétale de l'Entreprise.</p>
                </div>
                <div class="km-grid">
                    <div class="doc-card" style="cursor: pointer;">
                        <div class="doc-icon-large" style="background: #f0fdf4; color: #16a34a;">
                            <i data-lucide="leaf" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="doc-card-title">Politique & Rapports RSE</div>
                        <div class="doc-card-meta">
                            <span>Dernier rapport 2025</span>
                            <i data-lucide="download" style="width: 16px;"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ADMINISTRATION VIEW -->
            <div id="view-admin" class="view-section km-container">
                <div class="km-header">
                    <h2>Administration & Pilotage</h2>
                    <p>Espace réservé aux administrateurs pour piloter la plateforme, paramétrer les menus et les habilitations.</p>
                </div>
                <div class="app-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
                    <a href="#" class="app-card-large" style="--hover-bg: #fff1f2; --hover-border: #fecdd3;">
                        <div class="app-card-icon-large" style="background: #be123c; color: white;">
                            <i data-lucide="key" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="app-card-content">
                            <span class="app-card-title-large">Gestion des Habilitations</span>
                            <p class="app-card-desc">Synchronisation LDAP et rôles.</p>
                        </div>
                    </a>
                    <a href="#" class="app-card-large" style="--hover-bg: #f8fafc; --hover-border: #cbd5e1;">
                        <div class="app-card-icon-large" style="background: #475569; color: white;">
                            <i data-lucide="activity" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div class="app-card-content">
                            <span class="app-card-title-large">Reporting & Usages</span>
                            <p class="app-card-desc">Métrique d'utilisation et statistiques de consultation.</p>
                        </div>
                    </a>
                </div>
            </div>
"""

content = re.sub(injection_marker, new_views + "\n</main>\n        <!-- RIGHT SIDEBAR -->", content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated remaining successfully")

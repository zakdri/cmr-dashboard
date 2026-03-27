import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

correct_nav_html = """<nav class="sidebar-nav">
                <!-- Group 1: Priority Access -->
                <div id="nav-dashboard" class="nav-item active" onclick="switchView('dashboard')">
                    <i data-lucide="home"></i>
                    <span>Accueil</span>
                </div>
                <div id="nav-applis" class="nav-item" onclick="switchView('applis')">
                    <i data-lucide="layers"></i>
                    <span>Mes Applications</span>
                </div>

                <!-- Group 2: HR, Social & Learning -->
                <div id="nav-rh" class="nav-item has-submenu" onclick="toggleSidebarSubmenu('rh')">
                    <i data-lucide="users"></i>
                    <span>RH & Mobilité</span>
                    <i data-lucide="chevron-right" class="submenu-indicator"></i>
                </div>
                <div id="nav-academy" class="nav-item" onclick="switchView('academy')">
                    <i data-lucide="graduation-cap"></i>
                    <span>CMR Academy</span>
                </div>
                <div id="nav-vie-sociale" class="nav-item" onclick="switchView('vie-sociale')">
                    <i data-lucide="coffee"></i>
                    <span>Vie Sociale</span>
                </div>

                <!-- Group 3: Work, Docs & Collab -->
                <div id="nav-km" class="nav-item has-submenu" onclick="toggleSidebarSubmenu('km')">
                    <i data-lucide="brain"></i>
                    <span>Knowledge Management</span>
                    <i data-lucide="chevron-right" class="submenu-indicator"></i>
                </div>
                <div id="nav-documentaires" class="nav-item" onclick="switchView('documentaires')">
                    <i data-lucide="folder-open"></i>
                    <span>Documentaires</span>
                </div>
                <div id="nav-collaboratifs" class="nav-item" onclick="switchView('collaboratifs')">
                    <i data-lucide="network"></i>
                    <span>Collaboratifs</span>
                </div>
                <div id="nav-projets" class="nav-item" onclick="switchView('projets')">
                    <i data-lucide="briefcase"></i>
                    <span>Projets</span>
                </div>

                <!-- Group 4: Sub-departments & Institutional -->
                <div id="nav-institutionnel" class="nav-item" onclick="switchView('institutionnel')">
                    <i data-lucide="landmark"></i>
                    <span>Institutionnel</span>
                </div>
                <div id="nav-reglementation" class="nav-item" onclick="switchView('reglementation')">
                    <i data-lucide="shield-check"></i>
                    <span>Réglementation</span>
                </div>
                <div id="nav-achats" class="nav-item" onclick="switchView('achats')">
                    <i data-lucide="shopping-cart"></i>
                    <span>Achats</span>
                </div>
                <div id="nav-rse" class="nav-item" onclick="switchView('rse')">
                    <i data-lucide="leaf"></i>
                    <span>RSE</span>
                </div>
                <div id="nav-innovation" class="nav-item" onclick="switchView('innovation')">
                    <i data-lucide="lightbulb"></i>
                    <span>Innovation</span>
                </div>
                <div id="nav-admin" class="nav-item" onclick="switchView('admin')">
                    <i data-lucide="settings"></i>
                    <span>Administration & Pilotage</span>
                </div>
            </nav>"""

text = re.sub(r'<nav class="sidebar-nav">.*?</nav>', correct_nav_html, text, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Nav fixed correctly")

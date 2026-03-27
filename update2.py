import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

nav_html_old = r'<nav class="sidebar-nav">.*?</nav>'
nav_html_new = """<nav class="sidebar-nav">
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
                <a href="#" class="nav-item">
                    <i data-lucide="coffee"></i>
                    <span>Vie Sociale</span>
                </a>

                <!-- Group 3: Work, Docs & Collab -->
                <div id="nav-km" class="nav-item has-submenu" onclick="toggleSidebarSubmenu('km')">
                    <i data-lucide="brain"></i>
                    <span>Knowledge Management</span>
                    <i data-lucide="chevron-right" class="submenu-indicator"></i>
                </div>
                <a href="#" class="nav-item">
                    <i data-lucide="folder-open"></i>
                    <span>Documentaires</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="network"></i>
                    <span>Collaboratifs</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="briefcase"></i>
                    <span>Projets</span>
                </a>

                <!-- Group 4: Sub-departments & Institutional -->
                <a href="#" class="nav-item">
                    <i data-lucide="landmark"></i>
                    <span>Institutionnel</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="shield-check"></i>
                    <span>Réglementation</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="shopping-cart"></i>
                    <span>Achats</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="leaf"></i>
                    <span>RSE</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="lightbulb"></i>
                    <span>Innovation</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="settings"></i>
                    <span>Administration & Pilotage</span>
                </a>
            </nav>"""

content = re.sub(nav_html_old, nav_html_new, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated nav successfully with priorities")

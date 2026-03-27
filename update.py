import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update the nav-item CSS to support vertical scrolling
nav_css_old = r"""        \.nav-item \{
            width: 100%;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
            color: rgba\(255, 255, 255, 0\.7\);
            text-decoration: none;
            transition: all 0\.3s;
            cursor: pointer;
            position: relative;
        \}"""

nav_css_new = """        .nav-item {
            width: 100%;
            height: 80px;
            min-height: 80px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: all 0.3s;
            cursor: pointer;
            position: relative;
        }"""
content = re.sub(nav_css_old, nav_css_new, content, flags=re.MULTILINE)

nav_i_old = r"""        \.nav-item i \{
            width: 24px;
            height: 24px;
        \}"""
nav_i_new = """        .nav-item i {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }"""
content = re.sub(nav_i_old, nav_i_new, content, flags=re.MULTILINE)

nav_span_old = r"""        \.nav-item span \{
            font-size: 10px;
            font-weight: 600;
            text-align: center;
            line-height: 1\.2;
        \}"""
nav_span_new = """        .nav-item span {
            font-size: 10px;
            font-weight: 600;
            text-align: center;
            line-height: 1.2;
            padding: 0 4px;
            word-break: break-word;
        }"""
content = re.sub(nav_span_old, nav_span_new, content, flags=re.MULTILINE)

# 2. Update the left sidebar navigation
nav_html_old = r'<nav class="sidebar-nav">.*?</nav>'
nav_html_new = """<nav class="sidebar-nav">
                <div id="nav-dashboard" class="nav-item active" onclick="switchView('dashboard')">
                    <i data-lucide="home"></i>
                    <span>Page d'Accueil</span>
                </div>
                <a href="#" class="nav-item">
                    <i data-lucide="landmark"></i>
                    <span>Espace Institutionnel</span>
                </a>
                <div id="nav-km" class="nav-item has-submenu" onclick="toggleSidebarSubmenu('km')">
                    <i data-lucide="brain"></i>
                    <span>Espace Knowledge Management</span>
                    <i data-lucide="chevron-right" class="submenu-indicator"></i>
                </div>
                <a href="#" class="nav-item">
                    <i data-lucide="shield-check"></i>
                    <span>Espace Réglementation</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="lightbulb"></i>
                    <span>Espace Innovation</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="leaf"></i>
                    <span>Espace RSE</span>
                </a>
                <div id="nav-rh" class="nav-item has-submenu" onclick="toggleSidebarSubmenu('rh')">
                    <i data-lucide="users"></i>
                    <span>Espace RH & Mobilité</span>
                    <i data-lucide="chevron-right" class="submenu-indicator"></i>
                </div>
                <div id="nav-academy" class="nav-item" onclick="switchView('academy')">
                    <i data-lucide="graduation-cap"></i>
                    <span>Espace CMR Academy</span>
                </div>
                <a href="#" class="nav-item">
                    <i data-lucide="briefcase"></i>
                    <span>Espace Projets</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="shopping-cart"></i>
                    <span>Espace Achats</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="coffee"></i>
                    <span>Espace Vie Sociale</span>
                </a>
                <div id="nav-applis" class="nav-item" onclick="switchView('applis')">
                    <i data-lucide="layers"></i>
                    <span>Espace Mes Applications</span>
                </div>
                <a href="#" class="nav-item">
                    <i data-lucide="network"></i>
                    <span>Espaces Collaboratifs</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="folder-open"></i>
                    <span>Espaces Documentaires</span>
                </a>
                <a href="#" class="nav-item">
                    <i data-lucide="settings"></i>
                    <span>Espaces Administration & Pilotage</span>
                </a>
            </nav>"""
content = re.sub(nav_html_old, nav_html_new, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")

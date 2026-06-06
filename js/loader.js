const CMR_SECTIONS = [
    {
        "id": "dashboard",
        "file": "sections/dashboard.html"
    },
    {
        "id": "flash-detail",
        "file": "sections/flash-detail.html"
    },
    {
        "id": "dg-message",
        "file": "sections/dg-message.html"
    },
    {
        "id": "km",
        "file": "sections/km.html"
    },
    {
        "id": "applis",
        "file": "sections/applis.html"
    },
    {
        "id": "academy",
        "file": "sections/academy.html"
    },
    {
        "id": "rh",
        "file": "sections/rh.html"
    },
    {
        "id": "vie-sociale",
        "file": "sections/vie-sociale.html"
    },
    {
        "id": "institutionnel",
        "file": "sections/institutionnel.html"
    },
    {
        "id": "annuaire",
        "file": "sections/annuaire.html"
    },
    {
        "id": "projets",
        "file": "sections/projets.html"
    },
    {
        "id": "documentaires",
        "file": "sections/documentaires.html"
    },
    {
        "id": "innovation",
        "file": "sections/innovation.html"
    },
    {
        "id": "reglementation",
        "file": "sections/reglementation.html"
    },
    {
        "id": "collaboratifs",
        "file": "sections/collaboratifs.html"
    },
    {
        "id": "achats",
        "file": "sections/achats.html"
    },
    {
        "id": "mediatheque",
        "file": "sections/mediatheque.html"
    },
    {
        "id": "notifications",
        "file": "sections/notifications.html"
    },
    {
        "id": "actualites",
        "file": "sections/actualites.html"
    },
    {
        "id": "communication-interne",
        "file": "sections/communication-interne.html"
    },
    {
        "id": "agenda-interne",
        "file": "sections/agenda-interne.html"
    },
    {
        "id": "rse",
        "file": "sections/rse.html"
    },
    {
        "id": "qse",
        "file": "sections/qse.html"
    },
    {
        "id": "sitd",
        "file": "sections/sitd.html"
    },
    {
        "id": "arc",
        "file": "sections/arc.html"
    },
    {
        "id": "admin",
        "file": "sections/admin.html"
    }
];

const CMR_COMPONENTS = [
    { id: 'header', file: 'components/header.html', target: 'header-root' },
    { id: 'sidebar', file: 'components/sidebar.html', target: 'sidebar-root' },
    { id: 'right-sidebar', file: 'components/right-sidebar.html', target: 'right-sidebar-root' },
    { id: 'modals', file: 'components/modals.html', target: 'modals-root' }
];

async function loadHtmlFile(file) {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`Impossible de charger ${file} (${response.status})`);
    }
    return response.text();
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Impossible de charger ${src}`));
        document.body.appendChild(script);
    });
}

function loadApplicationScript() {
    return loadScript('js/app.js');
}

async function loadComponentsFromHtmlFiles() {
    const html = await Promise.all(CMR_COMPONENTS.map(component => loadHtmlFile(component.file)));
    return CMR_COMPONENTS.map((component, index) => ({ ...component, html: html[index] }));
}

async function loadComponentsFromScriptFiles() {
    window.CMR_COMPONENT_TEMPLATES = window.CMR_COMPONENT_TEMPLATES || {};
    await Promise.all(
        CMR_COMPONENTS.map(component => {
            const scriptFile = component.file
                .replace(/^components\//, 'js/components/')
                .replace(/\.html$/, '.js');
            return loadScript(scriptFile);
        })
    );

    return CMR_COMPONENTS.map(component => {
        const html = window.CMR_COMPONENT_TEMPLATES[component.id];
        if (!html) {
            throw new Error(`Composant introuvable: ${component.id}`);
        }
        return { ...component, html };
    });
}

async function loadSectionsFromHtmlFiles() {
    return Promise.all(CMR_SECTIONS.map(section => loadHtmlFile(section.file)));
}

async function loadSectionsFromScriptFiles() {
    window.CMR_SECTION_TEMPLATES = window.CMR_SECTION_TEMPLATES || {};
    await Promise.all(
        CMR_SECTIONS.map(section => {
            const scriptFile = section.file
                .replace(/^sections\//, 'js/sections/')
                .replace(/\.html$/, '.js');
            return loadScript(scriptFile);
        })
    );

    return CMR_SECTIONS.map(section => {
        const html = window.CMR_SECTION_TEMPLATES[section.id];
        if (!html) {
            throw new Error(`Rubrique introuvable: ${section.id}`);
        }
        return html;
    });
}

function renderComponents(components) {
    components.forEach(component => {
        const target = document.getElementById(component.target);
        if (target) target.innerHTML = component.html;
    });
}

async function loadPage() {
    const sectionsHost = document.getElementById('sections-root');
    if (!sectionsHost) return;

    try {
        const useScriptTemplates = location.protocol === 'file:';
        const [components, sections] = await Promise.all([
            useScriptTemplates ? loadComponentsFromScriptFiles() : loadComponentsFromHtmlFiles(),
            useScriptTemplates ? loadSectionsFromScriptFiles() : loadSectionsFromHtmlFiles()
        ]);

        renderComponents(components);
        sectionsHost.innerHTML = sections.join('\n');
        document.dispatchEvent(new CustomEvent('cmr:page-ready'));
        await loadApplicationScript();
        document.dispatchEvent(new CustomEvent('cmr:app-ready'));
    } catch (error) {
        console.error(error);
        sectionsHost.innerHTML = `
            <div class="dashboard-card" style="padding:24px;max-width:760px;">
                <div class="card-title" style="margin-bottom:10px;">Chargement impossible</div>
                <p style="color:var(--text-light);line-height:1.7;">
                    Les rubriques et composants sont dans des fichiers separes. Verifiez que les dossiers
                    <code>components</code>, <code>sections</code>, <code>js/components</code> et
                    <code>js/sections</code> sont bien presents avec <code>index.html</code>.
                </p>
            </div>`;
    }
}

loadPage();

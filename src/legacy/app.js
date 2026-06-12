function openAgendaTab(tabName) {
                        // Reset buttons
                        document.getElementById('tab-perso-btn').style.background = 'transparent';
                        document.getElementById('tab-perso-btn').style.color = '#64748b';
                        document.getElementById('tab-perso-btn').style.boxShadow = 'none';

                        document.getElementById('tab-cmr-btn').style.background = 'transparent';
                        document.getElementById('tab-cmr-btn').style.color = '#64748b';
                        document.getElementById('tab-cmr-btn').style.boxShadow = 'none';

                        // Hide Lists
                        document.getElementById('agenda-perso-list').style.display = 'none';
                        document.getElementById('agenda-cmr-list').style.display = 'none';

                        // Set Active
                        document.getElementById('tab-' + tabName + '-btn').style.background = 'white';
                        document.getElementById('tab-' + tabName + '-btn').style.color = '#f59e0b';
                        document.getElementById('tab-' + tabName + '-btn').style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                        document.getElementById('agenda-' + tabName + '-list').style.display = 'flex';
                    }

// Initialize Lucide icons
        lucide.createIcons();

        const cmrDataStore = window.CMR_DATA?.data || {};

        function getCmrData(key, fallback) {
            const value = cmrDataStore[key];
            if (value === undefined) return fallback;
            if (value && typeof value === 'object') {
                return JSON.parse(JSON.stringify(value));
            }
            return value;
        }

        // Main Carousel functionality
        let currentSlide = 0;
        const mainSlides = document.querySelectorAll('.carousel-section .carousel-slide');
        const mainDots = document.querySelectorAll('.carousel-section .carousel-dot');
        const totalMainSlides = mainSlides.length;

        function showSlide(index) {
            mainSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            mainDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function goToSlide(index) {
            showSlide(index);
        }

        function nextSlide() {
            if (!totalMainSlides) return;
            let next = (currentSlide + 1) % totalMainSlides;
            showSlide(next);
        }

        if (totalMainSlides) {
            setInterval(nextSlide, 5000);
        }

        // Mini News Slider functionality
        let currentMiniSlide = 0;
        const miniSliderContainer = document.querySelector('.news-slider-mini');
        const miniSlides = document.querySelectorAll('.news-slider-mini .news-slide-mini');
        const miniDots = document.querySelectorAll('.news-slider-mini .carousel-dot');
        const totalMiniSlides = miniSlides.length;

        function showMiniSlide(index) {
            miniSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            miniDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentMiniSlide = index;
        }

        function goToMiniSlide(index) {
            showMiniSlide(index);
        }

        function nextMiniSlide() {
            if (!totalMiniSlides) return;
            let next = (currentMiniSlide + 1) % totalMiniSlides;
            showMiniSlide(next);
        }

        let miniInterval = totalMiniSlides ? setInterval(nextMiniSlide, 4000) : null;

        // Pause on hover
        if (miniSliderContainer && totalMiniSlides) {
            miniSliderContainer.addEventListener('mouseenter', () => {
                clearInterval(miniInterval);
            });

            miniSliderContainer.addEventListener('mouseleave', () => {
                miniInterval = setInterval(nextMiniSlide, 4000);
            });
        }



        // Mood selection
        function selectMood(btn) {
            document.querySelectorAll('.mood-btn').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            // Change title
            document.getElementById('mood-title').textContent = "L'humeur de l'équipe";

            // Show results
            const results = document.getElementById('moodResults');
            results.classList.add('active');

            // Hide buttons
            document.getElementById('moodButtons').style.display = 'none';

            // Animate bars
            setTimeout(() => {
                document.querySelectorAll('.mood-stat-bar-fill').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-percent') + '%';
                });
            }, 100);
        }

        function resetMood() {
            // Restore title
            document.getElementById('mood-title').textContent = "Humeur du jour";

            // Hide results
            document.getElementById('moodResults').classList.remove('active');

            // Reset bars
            document.querySelectorAll('.mood-stat-bar-fill').forEach(bar => {
                bar.style.width = '0';
            });

            // Show buttons again
            const buttons = document.getElementById('moodButtons');
            buttons.style.display = 'flex';
            buttons.style.opacity = '1';
            buttons.style.pointerEvents = 'auto';

            document.querySelectorAll('.mood-btn').forEach(b => {
                b.classList.remove('active');
            });
        }

        // Toggle Dropdowns
        function toggleDropdown(id) {
            // Close other dropdowns
            document.querySelectorAll('.header-dropdown').forEach(d => {
                if (d.id !== id) d.classList.remove('active');
            });
            document.getElementById(id).classList.toggle('active');
            event.stopPropagation();
        }

        // Toggle Modal
        function toggleModal(id) {
            document.getElementById(id).classList.toggle('active');
        }

        // Global click to close dropdowns
        window.onclick = function (event) {
            if (!event.target.closest('.header-actions') && !event.target.closest('.header-user-pill')) {
                document.querySelectorAll('.header-dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
            if (!event.target.closest('.sidebar-submenu-panel') && !event.target.closest('.nav-item.has-submenu')) {
                hideSidebarSubmenu();
            }
            if (event.target.classList.contains('modal-overlay')) {
                event.target.classList.remove('active');
            }
        }

        // Calendar day selection
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', function () {
                if (!this.textContent) return;
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('today'));
                this.classList.add('today');
            });
        });

        // Random News Ticker (cliquable -> pop-up)
        const cmrNewsItems = getCmrData('cmrNewsItems', []);

        function escapeHtml(str) {
            return String(str)
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#039;');
        }

        function openTickerDetail(newsId) {
            const item = cmrNewsItems.find(x => x.id === newsId);
            const modal = document.getElementById('tickerDetailModal');
            if (!item || !modal) return;

            window.__activeTickerItem = item;
            const subtitle = document.getElementById('tickerDetailSubtitle');
            const body = document.getElementById('tickerDetailBody');
            if (subtitle) subtitle.textContent = item.category;
            if (body) body.textContent = item.text;

            modal.classList.add('active');
            lucide.createIcons();
        }

        function closeTickerDetailModal() {
            const modal = document.getElementById('tickerDetailModal');
            if (!modal) return;
            modal.classList.remove('active');
        }

        function goToFlashDetailFromModal() {
            const item = window.__activeTickerItem;
            if (!item) return;

            const detail = document.getElementById('flashDetailContent');
            if (detail) {
                detail.innerHTML = `
                <div class="actu-detail-body">
                    <div class="actu-detail-meta-row">
                        <span class="actu-detail-category">${escapeHtml(item.category)}</span>
                        <span class="actu-detail-date">
                            <i data-lucide="zap" style="width:14px;height:14px;"></i>
                            Flash info
                        </span>
                        <span class="actu-detail-author">
                            <i data-lucide="broadcast" style="width:14px;height:14px;"></i>
                            Intranet
                        </span>
                    </div>
                    <h1 class="actu-detail-title">Détail Flash Info</h1>
                    <div class="actu-detail-content">
                        <p>${escapeHtml(item.text)}</p>
                        <p>Dans le cadre de l'amelioration continue de la qualite de vie au travail, cette communication vise a partager les premiers indicateurs et a renforcer l'alignement entre les equipes. Les retours collectes montrent une bonne mobilisation et une volonte commune d'avancer sur des actions concretes.</p>
                        <p>Les principaux points de vigilance concernent la fluidite de l'information, la simplification de certains processus internes et l'accompagnement des collaborateurs dans les phases de changement. Plusieurs propositions ont deja ete remontees par les managers de proximite et feront l'objet d'un suivi structure.</p>
                        <p>Sur les prochaines semaines, un plan d'action detaille sera deploie avec des jalons clairs, des responsables identifies et des points d'etape periodiques. L'objectif est de transformer ces resultats en mesures visibles et utiles pour l'ensemble des collaborateurs.</p>
                        <p>Merci a toutes les equipes pour leur implication. Une nouvelle synthese sera partagee prochainement afin de presenter l'avancement, les resultats intermediaires et les ajustements retenus.</p>
                    </div>
                </div>`;
            }

            const modal = document.getElementById('tickerDetailModal');
            if (modal) modal.classList.remove('active');
            switchView('flash-detail');
            lucide.createIcons();
        }

        function goToDgMessage() {
            switchView('dg-message');
            const main = document.querySelector('.main-content');
            if (main) main.scrollTop = 0;
            lucide.createIcons();
        }

        function markDgMessageRead() {
            try {
                localStorage.setItem('cmrDgMessageRead_v1', '1');
            } catch (e) { }
            const card = document.getElementById('dgMessageCard');
            if (card) card.style.display = 'none';
            scheduleEqualizeDashboardCards();
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function populateTicker() {
            const wrapper = document.getElementById('tickerWrapper');
            if (!wrapper) return;

            const shuffledNews = shuffleArray([...cmrNewsItems]);
            // Take 6 items randomly
            const selectedNews = shuffledNews.slice(0, 6);

            const newsHtml = selectedNews.map(item => {
                const label = escapeHtml(item.category);
                const text = escapeHtml(item.text);
                return `<span class="ticker-item" role="button" tabindex="0" data-news-id="${escapeHtml(item.id)}"><strong>${label} :</strong> ${text}</span>`;
            }).join('');

            // Duplicate content for seamless loop
            wrapper.innerHTML = newsHtml + newsHtml;
        }

        // Initialize ticker after section HTML has been injected.
        populateTicker();

        // Click + keyboard access for ticker items (event delegation)
        document.addEventListener('click', (e) => {
            const el = e.target.closest?.('.ticker-item');
            if (!el) return;
            const id = el.getAttribute('data-news-id');
            if (id) openTickerDetail(id);
        });

        document.addEventListener('keydown', (e) => {
            const el = e.target?.closest?.('.ticker-item');
            if (!el) return;
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            const id = el.getAttribute('data-news-id');
            if (id) openTickerDetail(id);
        });

// ... (existing scripts) ...

        const sidebarSubmenuConfig = getCmrData('sidebarSubmenus', {});

        let activeSidebarSubmenu = null;
        const submenuSelections = {
            km: null,
            rse: null,
            qse: null,
            rh: null,
            reglementation: null,
            documentaires: null,
            collaboratifs: null,
            mediatheque: null,
            admin: null,
            innovation: null,
            sitd: null,
            arc: null
        };

        function hideSidebarSubmenu() {
            const panel = document.getElementById('sidebarSubmenu');
            if (!panel) return;
            panel.classList.remove('active');
            document.body.classList.remove('submenu-open');
            document.querySelectorAll('.nav-item.has-submenu').forEach(el => {
                el.classList.remove('submenu-open');
            });
            activeSidebarSubmenu = null;
        }

        function toggleSidebarSubmenu(type) {
            const panel = document.getElementById('sidebarSubmenu');
            const title = document.getElementById('submenuTitle');
            const list = document.getElementById('submenuList');
            const config = sidebarSubmenuConfig[type];
            if (!panel || !title || !list || !config) return;

            if (activeSidebarSubmenu === type && panel.classList.contains('active')) {
                hideSidebarSubmenu();
                return;
            }

            title.textContent = config.title;
            const selectedTab = getActiveSubmenuTab(type);
            list.innerHTML = config.items.map(item => {
                const isActive = item.tab === selectedTab ? ' active' : '';
                return `<button class="submenu-item${isActive}" onclick="openSubmenuView('${type}', '${item.tab}')">${item.label}<i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i></button>`;
            }).join('');

            activeSidebarSubmenu = type;
            panel.classList.add('active');
            document.body.classList.add('submenu-open');
            document.querySelectorAll('.nav-item.has-submenu').forEach(el => {
                el.classList.remove('submenu-open');
            });
            const currentNav = document.getElementById('nav-' + type);
            if (currentNav) {
                currentNav.classList.add('submenu-open');
            }
            lucide.createIcons();

            if (typeof event !== 'undefined' && event) {
                event.stopPropagation();
            }
        }

        function openSubmenuView(viewId, tabId) {
            if (submenuSelections[viewId] !== undefined) {
                submenuSelections[viewId] = tabId;
            }

            switchView(viewId);

            if (viewId === 'km') {
                switchPageKmTab(tabId);
            }

            if (viewId === 'rse') {
                switchRseSection(tabId);
            }

            if (viewId === 'qse') {
                switchQseSection(tabId);
            }

            if (viewId === 'reglementation') {
                switchRegSection(tabId);
            }

            if (viewId === 'documentaires') {
                switchMetiersSection(tabId);
            }

            if (viewId === 'collaboratifs') {
                switchCollabSection(tabId);
            }

            if (viewId === 'mediatheque') {
                switchMediaSection(tabId);
            }

            if (viewId === 'admin') {
                switchAdminSection(tabId);
            }

            if (viewId === 'innovation') {
                switchInnovationTab(tabId);
            }

            if (viewId === 'rh') {
                switchRhPageTab(tabId);
            }

            if (viewId === 'sitd') {
                switchSitdSection(tabId);
            }

            if (viewId === 'arc') {
                switchArcSection(tabId);
            }

            renderInPageSubmenuNavbar(viewId);
            hideSidebarSubmenu();
        }

        function renderInPageSubmenuNavbar(viewId) {
            const config = sidebarSubmenuConfig[viewId];
            if (!config || !config.items) return;

            const containerMap = {
                documentaires: 'metiersMainNavbar',
                reglementation: 'regMainNavbar',
                collaboratifs: 'collabMainNavbar',
                mediatheque: 'mediaMainNavbar',
                rse: 'rseMainNavbar',
                qse: 'qseMainNavbar',
                sitd: 'sitdMainNavbar',
                arc: 'arcMainNavbar',
                admin: 'adminMainNavbar'
            };

            const containerId = containerMap[viewId];
            if (!containerId) return;

            const nav = document.getElementById(containerId);
            if (!nav) return;

            const selectedTab = getActiveSubmenuTab(viewId) || config.items[0]?.tab || '';
            nav.innerHTML = config.items.map((it, idx) => {
                const active = it.tab === selectedTab ? ' active' : '';
                return `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item${active}" onclick="openSubmenuView('${viewId}','${it.tab}')" style="white-space:nowrap; padding: 12px 16px;">${it.label}</div>
                `;
            }).join('');
        }

        function getActiveSubmenuTab(type) {
            return submenuSelections[type] || '';
        }

        // SPA LOGIC
        function switchView(viewId) {
            hideSidebarSubmenu();

            // Toggle Body Class for Layout changes
            if (viewId === 'km') {
                document.body.classList.add('km-active');
            } else {
                document.body.classList.remove('km-active');
            }

            document.querySelectorAll('.view-section').forEach(el => {
                el.classList.remove('active');
            });
            document.getElementById('view-' + viewId).classList.add('active');

            // Update Sidebar Active State
            document.querySelectorAll('.nav-item').forEach(el => {
                el.classList.remove('active');
            });

            const activeNavLink = document.getElementById('nav-' + viewId);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }

            // Render in-page submenus (niveau 1) when available
            renderInPageSubmenuNavbar(viewId);

            // Ensure a default selection when user enters a view directly
            const config = sidebarSubmenuConfig[viewId];
            if (config?.items?.length && submenuSelections[viewId] === null) {
                submenuSelections[viewId] = config.items[0].tab;
                // Apply selection without recursion (we are already in switchView)
                if (viewId === 'rse') switchRseSection(submenuSelections[viewId]);
                if (viewId === 'qse') switchQseSection(submenuSelections[viewId]);
                if (viewId === 'reglementation') switchRegSection(submenuSelections[viewId]);
                if (viewId === 'documentaires') switchMetiersSection(submenuSelections[viewId]);
                if (viewId === 'collaboratifs') switchCollabSection(submenuSelections[viewId]);
                if (viewId === 'mediatheque') switchMediaSection(submenuSelections[viewId]);
                if (viewId === 'admin') switchAdminSection(submenuSelections[viewId]);
                if (viewId === 'km') switchPageKmTab(submenuSelections[viewId]);
                if (viewId === 'rh') switchRhPageTab(submenuSelections[viewId]);
                if (viewId === 'innovation') switchInnovationTab(submenuSelections[viewId]);
                if (viewId === 'sitd') switchSitdSection(submenuSelections[viewId]);
                if (viewId === 'arc') switchArcSection(submenuSelections[viewId]);
                renderInPageSubmenuNavbar(viewId);
            }
        }

        // KM TAB LOGIC (Dashboard Widget)
        function switchKmTab(tabId) {
            // Update Nav Items
            const widgetTabs = document.querySelectorAll('.km-tab');
            widgetTabs.forEach(el => el.classList.remove('active'));
            // Find the button that was clicked - this is a bit loose but works for the widget
            // In a real app we'd pass 'this' or use event delegation more strictly
            if (event && event.target) {
                event.target.classList.add('active');
            }

            // Update Content
            document.querySelectorAll('.km-content').forEach(el => {
                el.classList.remove('active');
            });
            const content = document.getElementById('km-' + tabId);
            if (content) content.classList.add('active');
        }

        // KM PAGE TAB LOGIC (Full Page)
        function switchPageKmTab(tabId) {
            submenuSelections.km = tabId;

            const kmNavbar = document.querySelector('#view-km .km-navbar');
            if (kmNavbar) {
                kmNavbar.querySelectorAll('.km-nav-item').forEach(el => {
                    el.classList.remove('active');
                });

                const targetNav = kmNavbar.querySelector(`[onclick="switchPageKmTab('${tabId}')"]`);
                if (targetNav) {
                    targetNav.classList.add('active');
                }
            }

            // Update Content
            // We need to target the specific page tabs, not the widget ones
            const pageTabs = [
                'page-km-referentiels',
                'page-km-glossaire',
                'page-km-rex',
                'page-km-elearning',
                'page-km-pedagogie',
                'page-km-communautes',
                'page-km-amoa',
                'page-km-docs',
                'page-km-contributions',
                'page-km-categorisation',
                'page-km-livrables',
                'page-km-modeles',
                'page-km-publications',
                'page-km-ged',
                'page-km-glpi',
                'page-km-supports',
                'page-km-stories',
                'page-km-campagnes',
                'page-km-audit-risque',
                'page-km-capsules-ux',
                'page-km-regimes-processus'
            ];
            pageTabs.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            const targetEl = document.getElementById('page-km-' + tabId);
            if (targetEl) targetEl.style.display = 'block';

            // Lazy renders
            if (tabId === 'referentiels') renderKmReferentiels();
            if (tabId === 'glossaire') renderKmGlossaire();
            if (tabId === 'rex') renderKmRex();
            if (tabId === 'elearning') renderKmElearning();
            if (tabId === 'pedagogie') renderKmPedagogie();
            if (tabId === 'communautes') renderKmCommunautes();
            if (tabId === 'amoa') renderKmAmoa();
            if (tabId === 'docs') renderKmDocs();
            if (tabId === 'contributions') renderKmContributions();
            if (tabId === 'categorisation') renderKmCatalogue();
            if (tabId === 'livrables') renderKmLivrables();
            if (tabId === 'modeles') renderKmModeles();
            if (tabId === 'publications') renderKmPublications();
            if (tabId === 'glpi') renderKmGlpi();
            if (tabId === 'supports') renderKmSupports();
            if (tabId === 'stories') renderKmStories();
            if (tabId === 'campagnes') renderKmCampagnes();
            if (tabId === 'audit-risque') renderKmAuditRisque();
            if (tabId === 'capsules-ux') renderKmCapsulesUx();
            if (tabId === 'regimes-processus') renderKmRegimesProcessus();

            lucide.createIcons();
        }

        // ACADEMY PAGE TAB LOGIC
        function switchAcademyPageTab(tabId) {
            // Update Nav Items
            if (event && event.target && event.target.parentElement) {
                const navItems = event.target.parentElement.querySelectorAll('.km-nav-item');
                navItems.forEach(el => el.classList.remove('active'));
                event.target.classList.add('active');
            }

            // Update Content
            const pageTabs = ['page-academy-catalogue', 'page-academy-formations', 'page-academy-certificats'];
            pageTabs.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            const targetEl = document.getElementById('page-academy-' + tabId);
            if (targetEl) targetEl.style.display = 'block';
        }

        // RH PAGE TAB LOGIC
        function switchRhPageTab(tabId) {
            // "CMR Academy" existe déjà comme vue dédiée (view-academy).
            // Pour éviter les doublons divergents, on redirige l'onglet RH vers cette vue unique.
            if (tabId === 'academy') {
                switchView('academy');
                return;
            }

            submenuSelections.rh = tabId;

            // Update Nav Items
            const rhNavbar = document.querySelector('#view-rh .km-navbar');
            if (rhNavbar) {
                rhNavbar.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = rhNavbar.querySelector(`[onclick="switchRhPageTab('${tabId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }

            // Update Content
            const pageTabs = ['page-rh-carriere', 'page-rh-formation', 'page-rh-documents', 'page-rh-offres', 'page-rh-managers', 'page-rh-enquetes', 'page-rh-applis', 'page-rh-forums', 'page-rh-viesociale', 'page-rh-activites'];
            pageTabs.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            const targetEl = document.getElementById('page-rh-' + tabId);
            if (targetEl) targetEl.style.display = 'block';
        }

        // ORGANISATION & GOUVERNANCE (complément Orga & Gouvernance intégré)
        const orgGovSectionConfig = getCmrData('orgGovSectionConfig', {});

        let orgGovSection = 'overview';

        function orgGovShowPage(pageId) {
            const all = [
                'overview', 'organigramme', 'postes', 'presentation', 'strategie', 'referentiels',
                'comites', 'direction', 'smi-politiques', 'smi-dossiers', 'smi-audits',
                'cartographie', 'kpi-strategiques', 'rapports-gouvernance'
            ];
            all.forEach(p => {
                const el = document.getElementById('page-orggov-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-orggov-' + pageId);
            if (target) target.style.display = 'block';

            if (pageId === 'organigramme') renderOrgTree();
            if (pageId === 'postes') renderPostesList(document.getElementById('postesSearchInput')?.value || '');
            if (pageId === 'referentiels') renderReferentiels();
            if (pageId === 'comites') { renderComites(); renderOrgGovComitesTimeline(); }
            if (pageId === 'smi-politiques') renderOrgGovSmiPolitiques();
            if (pageId === 'smi-dossiers') renderOrgGovSmiDossiers();
            if (pageId === 'smi-audits') renderOrgGovSmiAudits();
            if (pageId === 'cartographie') renderOrgGovCartographie();
            if (pageId === 'kpi-strategiques') renderOrgGovKpiStrategiques();
            if (pageId === 'rapports-gouvernance') renderOrgGovRapportsGouvernance();
            lucide.createIcons();
        }

        function switchOrgGovSection(sectionId) {
            orgGovSection = sectionId;
            const mainNav = document.getElementById('orgGovMainNavbar');
            const subNav = document.getElementById('orgGovSubNavbar');
            if (mainNav) {
                mainNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = mainNav.querySelector(`[onclick="switchOrgGovSection('${sectionId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }
            const config = orgGovSectionConfig[sectionId];
            if (config?.page) {
                if (subNav) subNav.style.display = 'none';
                orgGovShowPage(config.page);
                return;
            }
            if (config?.subs && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchOrgGovSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
                switchOrgGovSub(config.defaultSub);
            }
            lucide.createIcons();
        }

        function switchOrgGovSub(subId) {
            const subNav = document.getElementById('orgGovSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchOrgGovSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }
            orgGovShowPage(subId);
        }

        function switchOrgGovTab(tabId) {
            const map = {
                overview: ['overview'],
                organigramme: ['organisation', 'organigramme'],
                postes: ['organisation', 'postes'],
                presentation: ['organisation', 'presentation'],
                strategie: ['organisation', 'strategie'],
                referentiels: ['organisation', 'referentiels'],
                comites: ['gouvernance', 'comites'],
                direction: ['direction'],
                'smi-politiques': ['referentiel-smi', 'smi-politiques'],
                'smi-dossiers': ['referentiel-smi', 'smi-dossiers'],
                'smi-audits': ['referentiel-smi', 'smi-audits'],
                cartographie: ['cartographie'],
                'kpi-strategiques': ['gouvernance', 'kpi-strategiques'],
                'rapports-gouvernance': ['gouvernance', 'rapports-gouvernance']
            };
            const route = map[tabId] || ['overview'];
            switchOrgGovSection(route[0]);
            if (route[1]) switchOrgGovSub(route[1]);
        }

        // ====== ORGANIGRAMME (simple interactive tree) ======
        const orgData = getCmrData('orgData', {});

        function renderOrgNode(node, depth = 0) {
            const hasChildren = (node.children || []).length > 0;
            const id = `org_${Math.random().toString(16).slice(2)}`;
            return `
                <div style="margin-left:${depth * 18}px; padding:10px 10px; border-radius:12px; border:1px solid #e2e8f0; background:#fff; margin-bottom:10px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:34px;height:34px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;display:grid;place-items:center;color:#334155;">
                                <i data-lucide="${hasChildren ? 'network' : 'user'}" style="width:16px;height:16px;"></i>
                            </div>
                            <div>
                                <div style="font-weight:900;color:#0f172a;font-size:13px;">${node.name}</div>
                                <div style="font-size:12px;color:var(--text-light);margin-top:2px;">${node.role}</div>
                            </div>
                        </div>
                        ${hasChildren ? `<button class="actu-filter-btn" style="padding:8px 10px;" onclick="toggleOrgChildren('${id}')">Détails</button>` : ``}
                    </div>
                    ${hasChildren ? `<div id="${id}" data-org-collapsed="true" style="display:none; margin-top:10px;">${(node.children || []).map(c => renderOrgNode(c, depth + 1)).join('')}</div>` : ``}
                </div>
            `;
        }

        function renderOrgTree() {
            const container = document.getElementById('orgTree');
            if (!container) return;
            container.innerHTML = renderOrgNode(orgData, 0);
            lucide.createIcons();
        }

        function toggleOrgChildren(id) {
            const el = document.getElementById(id);
            if (!el) return;
            const collapsed = el.getAttribute('data-org-collapsed') === 'true';
            el.style.display = collapsed ? 'block' : 'none';
            el.setAttribute('data-org-collapsed', collapsed ? 'false' : 'true');
            lucide.createIcons();
        }

        function expandAllOrg() {
            document.querySelectorAll('#orgTree [data-org-collapsed]').forEach(el => {
                el.style.display = 'block';
                el.setAttribute('data-org-collapsed', 'false');
            });
            lucide.createIcons();
        }

        function collapseAllOrg() {
            document.querySelectorAll('#orgTree [data-org-collapsed]').forEach(el => {
                el.style.display = 'none';
                el.setAttribute('data-org-collapsed', 'true');
            });
            lucide.createIcons();
        }

        // ====== ANNUAIRE (list + detailed profile) ======
        const annuaireData = getCmrData('annuaireData', []);
        const annuaireLabels = getCmrData('annuaireLabels', {});
        let annuaireSelectedId = null;

        function initAnnuaireFilters() {
            const dirSel = document.getElementById('annuaireDirectionFilter');
            const fnSel = document.getElementById('annuaireFonctionFilter');
            if (!dirSel || !fnSel) return;

            const uniq = (arr) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));

            const dirs = uniq(annuaireData.map(a => a.direction).filter(Boolean));
            const fns = uniq(annuaireData.map(a => a.fonction).filter(Boolean));

            dirSel.innerHTML = `<option value="">${annuaireLabels.allDirectionsLabel || ''}</option>` + dirs.map(d => `<option value="${d}">${d}</option>`).join('');
            fnSel.innerHTML = `<option value="">${annuaireLabels.allFunctionsLabel || ''}</option>` + fns.map(f => `<option value="${f}">${f}</option>`).join('');
        }

        function resetAnnuaireFilters() {
            const q = document.getElementById('annuaireSearchInput');
            const dirSel = document.getElementById('annuaireDirectionFilter');
            const fnSel = document.getElementById('annuaireFonctionFilter');
            if (q) q.value = '';
            if (dirSel) dirSel.value = '';
            if (fnSel) fnSel.value = '';
            renderAnnuaireList();
        }

        function renderAnnuaireList() {
            const list = document.getElementById('annuaireList');
            const count = document.getElementById('annuaireCount');
            const detail = document.getElementById('annuaireDetail');
            if (!list) return;
            const query = (document.getElementById('annuaireSearchInput')?.value || '').trim().toLowerCase();
            const dir = document.getElementById('annuaireDirectionFilter')?.value || '';
            const fn = document.getElementById('annuaireFonctionFilter')?.value || '';

            const items = annuaireData.filter(p => {
                const matchDir = !dir || p.direction === dir;
                const matchFn = !fn || p.fonction === fn;
                const matchQ = !query || [p.nom, p.direction, p.fonction, p.email, p.tel, p.localisation, p.managerLabel].some(v => (v || '').toLowerCase().includes(query));
                return matchDir && matchFn && matchQ;
            });

            if (count) {
                count.textContent = `${items.length} ${items.length > 1 ? (annuaireLabels.collaboratorPlural || '') : (annuaireLabels.collaboratorSingular || '')}`;
            }

            if (items.length === 0) {
                list.innerHTML = `<div style="padding:14px 16px;color:var(--text-light);font-size:12px;">${annuaireLabels.emptyResult || ''}</div>`;
                annuaireSelectedId = null;
                if (detail) {
                    detail.innerHTML = `${annuaireLabels.emptyFilteredDetail || ''}`;
                }
                return;
            }

            if (!items.some(p => p.id === annuaireSelectedId)) {
                annuaireSelectedId = items[0].id;
            }

            list.innerHTML = items.map(p => `
                <div class="doc-item" data-annuaire-id="${p.id}" onclick="openAnnuaireDetail('${p.id}')"
                    style="${annuaireSelectedId === p.id ? 'background:#eff6ff;border-color:#bfdbfe;' : ''}">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">${p.nom.split(' ').slice(0,2).map(s => s[0]).join('').toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${p.nom}</div>
                        <div class="doc-meta">${p.fonction} • ${p.direction} • ${p.localisation}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            openAnnuaireDetail(annuaireSelectedId, false);
            lucide.createIcons();
        }

        function syncAnnuaireSelectionUI() {
            document.querySelectorAll('[data-annuaire-id]').forEach(el => {
                const isActive = el.getAttribute('data-annuaire-id') === annuaireSelectedId;
                el.style.background = isActive ? '#eff6ff' : '';
                el.style.borderColor = isActive ? '#bfdbfe' : '';
            });
        }

        function focusAnnuaireDetail() {
            const detail = document.getElementById('annuaireDetail');
            if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function buildMiniOrg(p) {
            const manager = p.managerId ? annuaireData.find(x => x.id === p.managerId) : null;
            const managerName = manager ? manager.nom : (p.managerLabel || p.direction || '—');
            const path = (p.orgPath || ['CMR', p.direction, p.nom]).filter(Boolean);

            const nodes = path.map((label, idx) => {
                const isLast = idx === path.length - 1;
                const bg = isLast ? '#eff6ff' : '#f8fafc';
                const bd = isLast ? '#bfdbfe' : '#e2e8f0';
                const col = isLast ? '#1d4ed8' : '#334155';
                return `
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:30px;height:30px;border-radius:10px;background:${bg};border:1px solid ${bd};display:grid;place-items:center;color:${col};flex-shrink:0;">
                            <i data-lucide="${isLast ? 'user' : 'layers'}" style="width:14px;height:14px;"></i>
                        </div>
                        <div style="font-weight:${isLast ? 900 : 700};color:#0f172a;font-size:12px;">${label}</div>
                    </div>
                    ${!isLast ? `<div style="height:14px;border-left:2px solid #e2e8f0;margin-left:14px;"></div>` : ``}
                `;
            }).join('');

            return `
                <div style="margin-top:14px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                        <div style="font-weight:900;color:#0f172a;font-size:13px;">${annuaireLabels.hierarchyTitle || ''}</div>
                        <button class="actu-filter-btn" style="padding:8px 10px;" onclick="switchOrgGovTab('organigramme')">${annuaireLabels.openOrgLabel || ''}</button>
                    </div>
                    <div style="margin-top:10px;color:var(--text-light);font-size:12px;">${annuaireLabels.managerLabel || ''} : <strong style="color:#0f172a;">${managerName}</strong></div>
                    <div style="margin-top:12px;padding:12px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
                        ${nodes}
                    </div>
                </div>
            `;
        }

        async function copyText(value) {
            try {
                await navigator.clipboard.writeText(value);
            } catch (e) {
                const ta = document.createElement('textarea');
                ta.value = value;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
            }
        }

        function openAnnuaireDetail(id, scrollToDetail = true) {
            const p = annuaireData.find(x => x.id === id);
            const detail = document.getElementById('annuaireDetail');
            if (!p || !detail) return;
            annuaireSelectedId = id;
            detail.innerHTML = `
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
                    <div style="width:44px;height:44px;border-radius:14px;background:#eff6ff;color:#1d4ed8;display:grid;place-items:center;font-weight:900;">${p.nom.split(' ').slice(0,2).map(s => s[0]).join('').toUpperCase()}</div>
                    <div>
                        <div style="font-weight:900;color:#0f172a;font-size:16px;">${p.nom}</div>
                        <div style="margin-top:2px;color:var(--text-light);font-size:12px;">${p.fonction} • ${p.direction}</div>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:800;">${annuaireLabels.emailLabel || ''}</div>
                        <div style="margin-top:6px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                            <div style="font-size:12px;color:#0f172a;font-weight:700;word-break:break-word;">${p.email}</div>
                            <div style="display:flex;gap:8px;flex-wrap:wrap;">
                                <a class="actu-filter-btn" style="padding:8px 10px;text-decoration:none;" href="mailto:${p.email}">${annuaireLabels.writeLabel || ''}</a>
                                <button class="actu-filter-btn" style="padding:8px 10px;" onclick="copyText('${p.email}')">${annuaireLabels.copyLabel || ''}</button>
                            </div>
                        </div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:800;">${annuaireLabels.phoneLabel || ''}</div>
                        <div style="margin-top:6px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                            <div style="font-size:12px;color:#0f172a;font-weight:700;word-break:break-word;">${p.tel}</div>
                            <div style="display:flex;gap:8px;flex-wrap:wrap;">
                                <a class="actu-filter-btn" style="padding:8px 10px;text-decoration:none;" href="tel:${p.tel.replace(/\s+/g,'')}">${annuaireLabels.callLabel || ''}</a>
                                <button class="actu-filter-btn" style="padding:8px 10px;" onclick="copyText('${p.tel}')">${annuaireLabels.copyLabel || ''}</button>
                            </div>
                        </div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:800;">${annuaireLabels.locationLabel || ''}</div>
                        <div style="margin-top:4px;font-size:12px;color:#0f172a;font-weight:700;">${p.localisation}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:800;">${annuaireLabels.entityLabel || ''}</div>
                        <div style="margin-top:4px;font-size:12px;color:#0f172a;font-weight:700;">${p.direction}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;grid-column:1/-1;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:800;">${annuaireLabels.managerDetailLabel || ''}</div>
                        <div style="margin-top:4px;font-size:12px;color:#0f172a;font-weight:700;">${p.managerLabel || p.direction || '—'}</div>
                    </div>
                </div>
                ${buildMiniOrg(p)}
            `;
            syncAnnuaireSelectionUI();
            if (scrollToDetail) focusAnnuaireDetail();
            lucide.createIcons();
        }

        // ====== FICHES DE POSTES (list + structured page) ======
        const postesData = getCmrData('postesData', []);

        function renderPostesList(q) {
            const list = document.getElementById('postesList');
            if (!list) return;
            const query = (q || '').trim().toLowerCase();
            const items = postesData.filter(p => !query || [p.titre, p.famille].some(v => (v || '').toLowerCase().includes(query)));
            if (items.length === 0) {
                list.innerHTML = `<div style="padding:14px 16px;color:var(--text-light);font-size:12px;">Aucun poste.</div>`;
                return;
            }
            list.innerHTML = items.map(p => `
                <div class="doc-item" onclick="openPosteDetail('${p.id}')">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">${p.famille.slice(0,3).toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${p.titre}</div>
                        <div class="doc-meta">${p.famille}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function openPosteDetail(id) {
            const p = postesData.find(x => x.id === id);
            const detail = document.getElementById('postesDetail');
            if (!p || !detail) return;
            detail.innerHTML = `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${p.titre}</div>
                <div style="margin-top:4px;color:var(--text-light);font-size:12px;">Famille : <strong>${p.famille}</strong></div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0;">
                <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;">
                        <div style="font-weight:900;color:#1e293b;font-size:13px;">Missions</div>
                        <ul style="margin:10px 0 0 18px;color:#475569;font-size:12px;line-height:1.8;">${p.missions.map(m => `<li>${m}</li>`).join('')}</ul>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;">
                        <div style="font-weight:900;color:#1e293b;font-size:13px;">Compétences</div>
                        <ul style="margin:10px 0 0 18px;color:#475569;font-size:12px;line-height:1.8;">${p.competences.map(m => `<li>${m}</li>`).join('')}</ul>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;grid-column:1/-1;">
                        <div style="font-weight:900;color:#1e293b;font-size:13px;">Profil</div>
                        <ul style="margin:10px 0 0 18px;color:#475569;font-size:12px;line-height:1.8;">${p.profil.map(m => `<li>${m}</li>`).join('')}</ul>
                    </div>
                </div>
            `;
        }

        // ====== RÉFÉRENTIELS (dossier + documents) ======
        const referentiels = getCmrData('referentiels', []);
        let currentRef = 'r1';

        function renderReferentiels() {
            const d = document.getElementById('refDossiers');
            const docs = document.getElementById('refDocs');
            if (!d || !docs) return;
            d.innerHTML = referentiels.map(x => `
                <div class="doc-item" onclick="openReferentiel('${x.id}')">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">REF</div>
                    <div class="doc-info">
                        <div class="doc-title">${x.dossier}</div>
                        <div class="doc-meta">${x.docs.length} documents</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            openReferentiel(currentRef);
            lucide.createIcons();
        }

        function openReferentiel(id) {
            currentRef = id;
            const docs = document.getElementById('refDocs');
            const r = referentiels.find(x => x.id === id);
            if (!docs || !r) return;
            docs.innerHTML = r.docs.map(doc => `
                <div class="doc-item" onclick="openMockDownload('${doc.file}','${doc.label}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">PDF</div>
                    <div class="doc-info">
                        <div class="doc-title">${doc.label}</div>
                        <div class="doc-meta">${doc.file}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // ====== COMITÉS (liste + dossier) ======
        const comitesData = getCmrData('comitesData', []);
        let currentComite = 'k1';

        function renderComites() {
            const list = document.getElementById('comitesList');
            if (!list) return;
            list.innerHTML = comitesData.map(c => `
                <div class="doc-item" onclick="openComite('${c.id}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">COM</div>
                    <div class="doc-info">
                        <div class="doc-title">${c.nom}</div>
                        <div class="doc-meta">${c.periodicite}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            openComite(currentComite);
            lucide.createIcons();
        }

        function openComite(id) {
            currentComite = id;
            const detail = document.getElementById('comitesDetail');
            const c = comitesData.find(x => x.id === id);
            if (!detail || !c) return;
            detail.innerHTML = `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${c.nom}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">Périodicité : <strong>${c.periodicite}</strong></div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0;">
                <div style="font-weight:900;color:#1e293b;font-size:13px;margin-bottom:10px;">Procès-verbaux</div>
                <div class="doc-list">
                    ${c.docs.map(d => `
                        <div class="doc-item" onclick="openMockDownload('${d.file}','${d.label}')">
                            <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">PV</div>
                            <div class="doc-info">
                                <div class="doc-title">${d.label}</div>
                                <div class="doc-meta">${d.file}</div>
                            </div>
                            <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                        </div>
                    `).join('')}
                </div>
            `;
            lucide.createIcons();
        }

        // ====== COMPLÉMENT ORGA & GOUVERNANCE (écrans fonctionnels) ======
        const orgGovSmiPolitiquesData = getCmrData('orgGovSmiPolitiquesData', []);

        const orgGovSmiDossiersData = getCmrData('orgGovSmiDossiersData', []);
        let orgGovSmiDossierCurrent = 'dp1';

        const orgGovSmiAuditsData = getCmrData('orgGovSmiAuditsData', []);

        const orgGovProcessusMap = getCmrData('orgGovProcessusMap', {});
        let orgGovProcessusSelected = 'pilotage';

        const orgGovComitesTimelineData = getCmrData('orgGovComitesTimelineData', []);

        const orgGovRapportsGouvernanceData = getCmrData('orgGovRapportsGouvernanceData', []);
        const orgGovKpiStrategiquesData = getCmrData('orgGovKpiStrategiquesData', { metrics: [], documents: [] });

        function renderOrgGovSmiPolitiques() {
            const list = document.getElementById('orgGovSmiPolitiques');
            if (!list) return;
            list.innerHTML = orgGovSmiPolitiquesData.map(d => `
                <div class="doc-item" onclick="openMockDownload('${d.file}','${d.title}')">
                    <div class="doc-icon" style="background:#f0fdf4;color:#166534;font-weight:900;">SMI</div>
                    <div class="doc-info">
                        <div class="doc-title">${d.title}</div>
                        <div class="doc-meta">Référentiel · Dossiers documentaires</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function openOrgGovSmiDossier(id) {
            orgGovSmiDossierCurrent = id;
            const docsHost = document.getElementById('orgGovSmiDossiersDocs');
            const folder = orgGovSmiDossiersData.find(x => x.id === id);
            if (!docsHost || !folder) return;
            docsHost.innerHTML = folder.docs.map(doc => `
                <div class="doc-item" onclick="openMockDownload('${doc.file}','${doc.label}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">PDF</div>
                    <div class="doc-info">
                        <div class="doc-title">${doc.label}</div>
                        <div class="doc-meta">${folder.dossier}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderOrgGovSmiDossiers() {
            const host = document.getElementById('orgGovSmiDossiers');
            if (!host) return;
            host.innerHTML = `
                <div class="dashboard-grid" style="grid-template-columns:1.1fr 1.9fr;gap:18px;padding:18px;">
                    <div>
                        <div style="font-weight:900;color:#0f172a;font-size:13px;margin-bottom:10px;">Dossiers processus</div>
                        <div id="orgGovSmiDossiersFolders" class="doc-list"></div>
                    </div>
                    <div>
                        <div style="font-weight:900;color:#0f172a;font-size:13px;margin-bottom:10px;">Documents</div>
                        <div id="orgGovSmiDossiersDocs" class="doc-list"></div>
                    </div>
                </div>
            `;
            const folders = document.getElementById('orgGovSmiDossiersFolders');
            if (folders) {
                folders.innerHTML = orgGovSmiDossiersData.map(f => `
                    <div class="doc-item" onclick="openOrgGovSmiDossier('${f.id}')">
                        <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">GED</div>
                        <div class="doc-info">
                            <div class="doc-title">${f.dossier}</div>
                            <div class="doc-meta">${f.docs.length} document(s)</div>
                        </div>
                        <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                    </div>
                `).join('');
            }
            openOrgGovSmiDossier(orgGovSmiDossierCurrent);
            lucide.createIcons();
        }

        function renderOrgGovSmiAudits() {
            const list = document.getElementById('orgGovSmiAudits');
            if (!list) return;
            list.innerHTML = orgGovSmiAuditsData.map(a => `
                <div class="doc-item" onclick="openMockDownload('${a.file}','${a.title}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">AUD</div>
                    <div class="doc-info">
                        <div class="doc-title">${a.title}</div>
                        <div class="doc-meta">${a.date} · Dossiers</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function selectOrgGovProcessus(id) {
            orgGovProcessusSelected = id;
            renderOrgGovCartographie();
        }

        function renderOrgGovCartographie() {
            const root = document.getElementById('orgGovCartographie');
            if (!root) return;
            const current = orgGovProcessusMap[orgGovProcessusSelected];
            const nodes = Object.entries(orgGovProcessusMap).map(([id, p]) => {
                const active = id === orgGovProcessusSelected;
                return `
                    <button type="button" onclick="selectOrgGovProcessus('${id}')"
                        style="padding:10px 12px;border-radius:12px;border:1px solid ${active ? '#93c5fd' : '#e2e8f0'};background:${active ? '#eff6ff' : '#fff'};color:#0f172a;font-weight:${active ? 900 : 600};font-size:12px;cursor:pointer;text-align:left;">
                        ${p.label}
                    </button>
                `;
            }).join('');
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:18px;">${nodes}</div>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px;">
                    <div style="font-weight:900;color:#0f172a;font-size:16px;">${current.label}</div>
                    <p style="margin-top:8px;color:var(--text-light);font-size:13px;line-height:1.65;">${current.desc}</p>
                    <div style="margin-top:14px;font-size:12px;font-weight:900;color:#64748b;">Interactions / processus liés</div>
                    <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px;">
                        ${current.links.map(l => `
                            <button type="button" class="actu-filter-btn" onclick="selectOrgGovProcessus('${l.id}')">${l.label}</button>
                        `).join('')}
                    </div>
                    <div style="margin-top:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:var(--text-light);font-size:12px;">
                        <i data-lucide="git-branch" style="width:14px;height:14px;"></i>
                        Vue graphique (maquette) — naviguer entre processus
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        function renderOrgGovKpiStrategiques() {
            const root = document.getElementById('orgGovKpiStrategiques');
            if (!root) return;
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;">
                    ${(orgGovKpiStrategiquesData.metrics || []).map(metric => `
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                            <div style="font-size:11px;color:#94a3b8;font-weight:900;">${metric.label}</div>
                            <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${metric.value}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top:16px;display:grid;grid-template-columns:1.4fr 1fr;gap:14px;">
                    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                        <div style="font-weight:900;color:#0f172a;font-size:13px;">${orgGovKpiStrategiquesData.chartTitle || ''}</div>
                        <div style="margin-top:12px;height:140px;border-radius:12px;background:linear-gradient(180deg,#eff6ff,#fff);border:1px dashed #bfdbfe;display:grid;place-items:center;color:#64748b;font-size:12px;">
                            ${orgGovKpiStrategiquesData.chartPlaceholder || ''}
                        </div>
                    </div>
                    <div class="doc-list" style="margin:0;">
                        ${(orgGovKpiStrategiquesData.documents || []).map(doc => `
                            <div class="doc-item" onclick="openMockDownload('${doc.file}','${doc.title}')">
                                <div class="doc-icon" style="background:#f0fdf4;color:#166534;font-weight:900;">KPI</div>
                                <div class="doc-info">
                                    <div class="doc-title">${doc.title}</div>
                                    <div class="doc-meta">${doc.meta}</div>
                                </div>
                                <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        function renderOrgGovRapportsGouvernance() {
            const list = document.getElementById('orgGovRapportsGouvernance');
            if (!list) return;
            list.innerHTML = orgGovRapportsGouvernanceData.map(r => `
                <div class="doc-item" onclick="openMockDownload('${r.file}','${r.title}')">
                    <div class="doc-icon" style="background:#fef2f2;color:#b91c1c;font-weight:900;">CA</div>
                    <div class="doc-info">
                        <div class="doc-title">${r.title}</div>
                        <div class="doc-meta">${r.dossier} · Dossiers documentaires</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderOrgGovComitesTimeline() {
            const host = document.getElementById('orgGovComitesTimeline');
            if (!host) return;
            host.innerHTML = orgGovComitesTimelineData.map((item, idx) => {
                const badgeColor = item.type === 'KPI' ? '#f0fdf4' : (item.type === 'Décision' ? '#fff7ed' : '#eff6ff');
                const badgeText = item.type === 'KPI' ? '#166534' : (item.type === 'Décision' ? '#c2410c' : '#1d4ed8');
                return `
                    <div style="display:flex;gap:14px;${idx < orgGovComitesTimelineData.length - 1 ? 'padding-bottom:18px;border-left:2px solid #e2e8f0;margin-left:8px;padding-left:18px;' : 'padding-left:18px;margin-left:8px;'}">
                        <div style="width:10px;height:10px;border-radius:999px;background:#2563eb;margin-left:-24px;margin-top:6px;flex-shrink:0;border:2px solid #fff;box-shadow:0 0 0 2px #dbeafe;"></div>
                        <div style="flex:1;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                                <span style="font-size:12px;color:var(--text-light);">${item.date} · ${item.comite}</span>
                                <span style="font-size:11px;font-weight:900;color:${badgeText};background:${badgeColor};padding:4px 10px;border-radius:999px;">${item.type}</span>
                            </div>
                            <div style="margin-top:8px;font-weight:900;color:#0f172a;font-size:14px;">${item.title}</div>
                            <div style="margin-top:6px;font-size:12px;color:var(--text-light);">KPI / suivi : <strong style="color:#0f172a;">${item.kpi}</strong></div>
                            <button type="button" class="actu-filter-btn" style="margin-top:10px;" onclick="openMockDownload('${item.file}','${item.title}')">Consulter le document</button>
                        </div>
                    </div>
                `;
            }).join('');
            lucide.createIcons();
        }

        // ====== Téléchargement (mock) ======
        function openMockDownload(filename, title) {
            // Pour tous les PDF consultables: ouvrir un preview modal (pas de redirection)
            const name = (filename || '').toString();
            if (/\.pdf(\?.*)?$/i.test(name)) {
                const url = (/^(https?:)?\/\//i.test(name) || name.includes('/')) ? name : ('docs/' + name);
                openPdfPreviewModal(url, title || filename);
                return;
            }

            try {
                const content = [
                    title || filename,
                    '',
                    '---',
                    'Fichier de démonstration (mock) pour maquette UI.',
                    'Remplacer par un vrai fichier PDF/GED et un lien sécurisé.',
                    '---',
                    'Généré le : ' + new Date().toISOString()
                ].join('\\n');
                const blob = new Blob([content], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename || 'document.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(url), 500);
            } catch (e) {
                alert('Téléchargement indisponible dans ce navigateur.');
            }
        }

        // ====== Preview PDF (même onglet / viewer PDF navigateur) ======
        // Exemple: ouvrir un vrai PDF (servi par ton serveur/GED) dans le même onglet.
        // Le navigateur bascule alors sur son viewer PDF (Chrome/Acrobat).
        function openPdfPreviewSameTab(pdfUrl) {
            if (!pdfUrl) return;
            window.location.assign(pdfUrl);
        }

        // ====== Preview PDF (MODAL, sans redirection) ======
        let pdfPreviewObjectUrl = null;

        function closePdfPreview() {
            const modal = document.getElementById('pdfPreviewModal');
            const frame = document.getElementById('pdfPreviewFrame');
            if (frame) frame.src = 'about:blank';
            if (modal) modal.classList.remove('active');
            if (pdfPreviewObjectUrl) {
                URL.revokeObjectURL(pdfPreviewObjectUrl);
                pdfPreviewObjectUrl = null;
            }
        }

        // Petit PDF valide (1 page) encodé en base64 pour l'exemple (fallback).
        const SAMPLE_PDF_BASE64 =
            'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1szIDAgUl0+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9Db250ZW50cyA0IDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pj4+PgplbmRvYmoKNCAwIG9iago8PC9MZW5ndGggMTQ0Pj4Kc3RyZWFtCkJUIAovRjEgMjQgVGYKNzIgNzIwIFRkCihQcmV2aWV3IFBERiAtIEV4ZW1wbGUpIFRqCjAgLTE4IFRkCihSZW1wbGFjZXIgcGFyIHVuIHZyYWkgZmljaGllciApIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjIgMDAwMDAgbiAKMDAwMDAwMDExMiAwMDAwMCBuIAowMDAwMDAwMjQzIDAwMDAwIG4gCjAwMDAwMDA0MjYgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0OTgKJSVFT0Y=';

        function openPdfPreviewModal(pdfUrl, title) {
            const modal = document.getElementById('pdfPreviewModal');
            const frame = document.getElementById('pdfPreviewFrame');
            const ttl = document.getElementById('pdfPreviewTitle');
            if (!modal || !frame || !ttl) return;

            ttl.textContent = title || 'Aperçu document';
            modal.classList.add('active');

            // Clean previous object URL if any
            if (pdfPreviewObjectUrl) {
                URL.revokeObjectURL(pdfPreviewObjectUrl);
                pdfPreviewObjectUrl = null;
            }

            // Try to load real PDF; fallback to sample PDF if missing.
            const tryFetch = async () => {
                try {
                    if (!pdfUrl) throw new Error('missing url');
                    const res = await fetch(pdfUrl, { cache: 'no-store' });
                    if (!res.ok) throw new Error('not ok');
                    const blob = await res.blob();
                    pdfPreviewObjectUrl = URL.createObjectURL(blob);
                    frame.src = pdfPreviewObjectUrl;
                } catch (e) {
                    const bytes = Uint8Array.from(atob(SAMPLE_PDF_BASE64), c => c.charCodeAt(0));
                    const blob = new Blob([bytes], { type: 'application/pdf' });
                    pdfPreviewObjectUrl = URL.createObjectURL(blob);
                    frame.src = pdfPreviewObjectUrl;
                }
            };

            tryFetch();
        }

        // ESC pour fermer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closePdfPreview();
        });

        // ===== Innovation (table conforme) =====
        const innovationTabs = [
            'page-innovation-ideation',
            'page-innovation-suivi',
            'page-innovation-veille',
            'page-innovation-social',
            'page-innovation-ateliers',
            'page-innovation-axes',
            'page-innovation-openlab',
            'page-innovation-excelway',
            'page-innovation-droits'
        ];

        function switchInnovationTab(tabId) {
            const nav = document.querySelector('#view-innovation .km-navbar');
            if (nav) {
                nav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = nav.querySelector(`[onclick="switchInnovationTab('${tabId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }

            innovationTabs.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-innovation-' + tabId);
            if (target) target.style.display = 'block';

            // lazy renders
            if (tabId === 'ideation') renderIdeas();
            if (tabId === 'suivi') renderInnovationProjects();
            if (tabId === 'veille') renderInnovationFeed();
            if (tabId === 'social') renderInnovationSocial();
            if (tabId === 'ateliers') renderInnovationEvents();
            if (tabId === 'axes') renderInnovationAxes();
            if (tabId === 'openlab') renderOpenLab();
            if (tabId === 'excelway') renderInnovationExcelway();
            if (tabId === 'droits') renderInnovationAccess();
            lucide.createIcons();
        }

        // Ideation: formulaire + liste + détail
        let ideas = getCmrData('ideas', [
            { id: 'i1', title: 'Assistant IA pour tri des demandes', axis: 'Data/IA', score: 42, desc: 'Automatiser le tri/catégorisation des demandes (GLPI / mail) + routage.', comments: 5 },
            { id: 'i2', title: 'Dématérialisation PV comités', axis: 'Processus', score: 28, desc: 'PV standardisés, signature et archivage GED avec métadonnées.', comments: 2 },
            { id: 'i3', title: 'Tableau de bord satisfaction interne', axis: 'Service', score: 19, desc: 'KPIs + feedback loop pour actions RH/communication.', comments: 1 }
        ]);
        let selectedIdeaId = null;
        function toggleIdeaForm(open) {
            const card = document.getElementById('ideaFormCard');
            if (card) card.style.display = open ? 'block' : 'none';
        }
        function renderIdeas() {
            const list = document.getElementById('ideaList');
            const detail = document.getElementById('ideaDetail');
            if (!list || !detail) return;
            if (!ideas.some(x => x.id === selectedIdeaId)) {
                selectedIdeaId = ideas[0]?.id || null;
            }
            list.innerHTML = ideas.map(i => `
                <div class="doc-item" onclick="selectedIdeaId='${i.id}'; renderIdeas();">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">ID</div>
                    <div class="doc-info">
                        <div class="doc-title">${i.title}</div>
                        <div class="doc-meta">${i.axis} • Score ${i.score} • ${i.comments} commentaires</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const sel = ideas.find(x => x.id === selectedIdeaId) || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">Axe: <strong>${sel.axis}</strong> • Score: <strong>${sel.score}</strong></div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
                <div style="color:#475569;font-size:13px;line-height:1.8;">${sel.desc}</div>
                <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="actu-filter-btn" onclick="voteIdea('${sel.id}', 1)">Voter +1</button>
                    <button class="actu-filter-btn" onclick="voteIdea('${sel.id}', -1)">Voter -1</button>
                    <button class="actu-filter-btn" onclick="openMockDownload('Dossier_Idee_${sel.id}.pdf','Dossier idée – ${sel.title}')">Exporter</button>
                </div>
            ` : 'Sélectionnez une idée.';
            lucide.createIcons();
        }
        function voteIdea(id, delta) {
            ideas = ideas.map(i => i.id === id ? { ...i, score: Math.max(0, i.score + delta) } : i);
            renderIdeas();
        }
        function submitIdea() {
            const title = (document.getElementById('ideaTitle')?.value || '').trim();
            const axis = (document.getElementById('ideaAxis')?.value || 'Digital').trim();
            const desc = (document.getElementById('ideaDesc')?.value || '').trim();
            if (!title || !desc) return;
            const id = 'i' + Math.random().toString(16).slice(2);
            ideas = [{ id, title, axis, score: 0, desc, comments: 0 }, ...ideas];
            document.getElementById('ideaTitle').value = '';
            document.getElementById('ideaDesc').value = '';
            toggleIdeaForm(false);
            renderIdeas();
        }

        // Suivi projets: liste/dashboard
        const innovationProjects = getCmrData('innovationProjects', [
            { name: 'Portail idées – MVP', status: 'En cours', progress: 55 },
            { name: 'Démat PV comités', status: 'À lancer', progress: 0 },
            { name: 'Assistant IA tri demandes', status: 'Étude', progress: 20 }
        ]);
        function renderInnovationProjects() {
            const root = document.getElementById('innovationProjects');
            if (!root) return;
            root.innerHTML = innovationProjects.map(p => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;margin-bottom:12px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
                        <div style="font-weight:900;color:#0f172a;">${p.name}</div>
                        <span style="background:#f8fafc;border:1px solid #e2e8f0;color:#475569;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:800;">${p.status}</span>
                    </div>
                    <div style="margin-top:10px;height:6px;background:#f1f5f9;border-radius:999px;overflow:hidden;">
                        <div style="width:${p.progress}%;height:100%;background:#3b82f6;"></div>
                    </div>
                    <div style="margin-top:8px;color:var(--text-light);font-size:12px;">Avancement: ${p.progress}%</div>
                </div>
            `).join('');
        }

        // Veille: flux
        const innovationFeed = getCmrData('innovationFeed', [
            { title: 'Tendances IA 2026 (secteur public)', meta: 'Article • 2j', source: 'Veille' },
            { title: 'Design sprint: réduire le time-to-value', meta: 'Dossier • 1s', source: 'OpenLab' },
            { title: 'Exemples d’innovation services', meta: 'Note • 3s', source: 'Benchmark' }
        ]);
        function renderInnovationFeed() {
            const list = document.getElementById('innovationFeed');
            if (!list) return;
            list.innerHTML = innovationFeed.map(i => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#ecfdf5;color:#059669;font-weight:900;">VEI</div>
                    <div class="doc-info">
                        <div class="doc-title">${i.title}</div>
                        <div class="doc-meta">${i.meta} • ${i.source}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // Social: commentaires + réactions + votes
        let socialComments = getCmrData('socialComments', [
            { author: 'Collaborateur 02', when: 'il y a 2h', text: 'Très bonne idée, on peut commencer par un POC sur une catégorie.' },
            { author: 'Collaborateur 03', when: 'hier', text: 'Attention aux données sensibles, prévoir anonymisation.' }
        ]);
        let socialReactions = getCmrData('socialReactions', { like: 31, idea: 12, fire: 6 });
        let socialVotes = getCmrData('socialVotes', [
            { label: 'Assistant IA tri demandes', score: 72 },
            { label: 'Démat PV comités', score: 54 },
            { label: 'Dashboard satisfaction', score: 29 }
        ]);
        function renderInnovationSocial() {
            const c = document.getElementById('innovationComments');
            const r = document.getElementById('innovationReactions');
            if (!c || !r) return;
            c.innerHTML = `
                <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
                    <input id="socialCommentInput" class="actu-search-input" placeholder="Ajouter un commentaire…">
                    <button class="primary-btn" onclick="addInnovationComment()">Commenter</button>
                </div>
                ${socialComments.map(x => `
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin-bottom:10px;">
                        <div style="font-weight:900;color:#0f172a;font-size:12px;">${x.author} <span style="font-weight:600;color:#94a3b8;">• ${x.when}</span></div>
                        <div style="margin-top:6px;color:#475569;font-size:12px;line-height:1.7;">${x.text}</div>
                    </div>
                `).join('')}
            `;
            r.innerHTML = `
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="actu-filter-btn" onclick="react('like')">👍 Like (${socialReactions.like})</button>
                    <button class="actu-filter-btn" onclick="react('idea')">💡 Idée (${socialReactions.idea})</button>
                    <button class="actu-filter-btn" onclick="react('fire')">🔥 Wow (${socialReactions.fire})</button>
                </div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0;">
                <div style="font-weight:900;color:#0f172a;margin-bottom:10px;">Vote / priorisation</div>
                ${socialVotes.map(v => `
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;margin-bottom:10px;">
                        <div style="font-weight:800;color:#0f172a;font-size:12px;">${v.label}</div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <button class="actu-filter-btn" onclick="voteSocial('${v.label}',1)">+1</button>
                            <div style="font-weight:900;color:#1d4ed8;">${v.score}</div>
                            <button class="actu-filter-btn" onclick="voteSocial('${v.label}',-1)">-1</button>
                        </div>
                    </div>
                `).join('')}
            `;
            lucide.createIcons();
        }
        function addInnovationComment() {
            const v = (document.getElementById('socialCommentInput')?.value || '').trim();
            if (!v) return;
            socialComments = [{ author: 'Vous', when: 'à l’instant', text: v }, ...socialComments];
            renderInnovationSocial();
        }
        function react(k) { socialReactions[k] = (socialReactions[k] || 0) + 1; renderInnovationSocial(); }
        function voteSocial(label, d) {
            socialVotes = socialVotes.map(v => v.label === label ? { ...v, score: Math.max(0, v.score + d) } : v);
            renderInnovationSocial();
        }

        // Ateliers/challenges: liste/calendrier
        const innovationEvents = getCmrData('innovationEvents', [
            { date: '05 Mai 2026', title: 'Atelier Design Sprint', meta: 'Salle Innovation • 09:00' },
            { date: '20 Mai 2026', title: 'Challenge idées – Data/IA', meta: 'En ligne • 14:00' }
        ]);
        function renderInnovationEvents() {
            const root = document.getElementById('innovationEvents');
            if (!root) return;
            root.innerHTML = innovationEvents.map(e => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;">
                    <div style="width:92px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:10px;text-align:center;color:#1d4ed8;font-weight:900;font-size:12px;">${e.date}</div>
                    <div style="flex:1;">
                        <div style="font-weight:900;color:#0f172a;">${e.title}</div>
                        <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${e.meta}</div>
                        <button class="primary-btn" style="margin-top:10px;" onclick="openMockDownload('Inscription_${e.title.replace(/\\s+/g,'_')}.pdf','Inscription – ${e.title}')">Participer</button>
                    </div>
                </div>
            `).join('');
        }

        // Axes: filtres/catégories
        let innovationAxisFilter = 'all';
        const innovationAxes = getCmrData('innovationAxes', [
            { axis: 'Digital', title: 'Automatisation & self‑service', desc: 'Portails, signature, workflows.' },
            { axis: 'Processus', title: 'Simplification', desc: 'Réduire délais, standardiser.' },
            { axis: 'Service', title: 'Expérience usager', desc: 'Feedback, qualité de service.' },
            { axis: 'Data/IA', title: 'Data & IA', desc: 'Analyse, prédiction, assistants.' }
        ]);
        function filterInnovationAxis(a, btn) {
            innovationAxisFilter = a;
            document.querySelectorAll('#innovationAxesFilters .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderInnovationAxes();
        }
        function renderInnovationAxes() {
            const grid = document.getElementById('innovationAxesGrid');
            if (!grid) return;
            const items = innovationAxes.filter(x => innovationAxisFilter === 'all' || x.axis === innovationAxisFilter);
            grid.innerHTML = items.map(x => `
                <div class="doc-card" style="cursor:pointer;" onclick="switchInnovationTab('ideation')">
                    <div class="doc-icon-large" style="background:#f0fdf4;color:#15803d;"><i data-lucide="target" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${x.axis} — ${x.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:8px;line-height:1.6;">${x.desc}</p>
                    <div class="doc-card-meta"><span style="color:#15803d;font-weight:800;">Voir les idées</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // OpenLab/portfolio: page/dashboard
        const openlabItems = getCmrData('openlabItems', [
            { title: 'OpenLab – POC IA', meta: 'En cours • 3 initiatives' },
            { title: 'Portefeuille 2026', meta: '12 projets • 4 axes' }
        ]);
        function renderOpenLab() {
            const list = document.getElementById('openlabPortfolio');
            const dash = document.getElementById('openlabDashboard');
            if (!list || !dash) return;
            list.innerHTML = openlabItems.map(x => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">LAB</div>
                    <div class="doc-info">
                        <div class="doc-title">${x.title}</div>
                        <div class="doc-meta">${x.meta}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            dash.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Idées</div>
                        <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${ideas.length}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Projets</div>
                        <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${innovationProjects.length}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Ateliers</div>
                        <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${innovationEvents.length}</div>
                    </div>
                </div>
                <div style="margin-top:12px;color:var(--text-light);font-size:12px;line-height:1.6;">Tableau de bord (maquette) — à brancher sur les données réelles OpenLab/portefeuille.</div>
            `;
            lucide.createIcons();
        }

        function renderInnovationExcelway() {
            const list = document.getElementById('innovationExcelwayList');
            const panel = document.getElementById('innovationExcelwayPanel');
            if (!list || !panel) return;

            list.innerHTML = ideas.map(i => `
                <div class="doc-item" onclick="openMockDownload('ExcelWay_Idee_${i.id}.pdf','Export ExcelWay – ${i.title}')">
                    <div class="doc-icon" style="background:#ecfdf5;color:#16a34a;font-weight:900;">EXW</div>
                    <div class="doc-info">
                        <div class="doc-title">${i.title}</div>
                        <div class="doc-meta">${i.axis} • Score ${i.score}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');

            panel.innerHTML = `
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                    <div style="font-weight:900;color:#0f172a;">Widget ExcelWay (maquette)</div>
                    <p style="margin:8px 0 0 0;color:var(--text-light);font-size:12px;line-height:1.6;">Publication et gestion des idées via outil externe intégré. Remplacer par iframe / API sécurisée.</p>
                    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                            <div style="font-size:11px;color:#94a3b8;font-weight:900;">Idées synchronisées</div>
                            <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${ideas.length}</div>
                        </div>
                        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                            <div style="font-size:11px;color:#94a3b8;font-weight:900;">Projets suivis</div>
                            <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${innovationProjects.length}</div>
                        </div>
                        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                            <div style="font-size:11px;color:#94a3b8;font-weight:900;">Connecteur</div>
                            <div style="margin-top:6px;font-size:14px;font-weight:900;color:#16a34a;">Actif (mock)</div>
                        </div>
                    </div>
                    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
                        <button class="primary-btn" onclick="openMockDownload('ExcelWay_Integration_Guide.pdf','Guide intégration ExcelWay')">Guide intégration</button>
                        <button class="secondary-btn" onclick="openMockDownload('ExcelWay_API_Spec.pdf','Spécification API ExcelWay')">Spécification API</button>
                        <button class="secondary-btn" onclick="openMockDownload('ExcelWay_Widget_Config.pdf','Configuration widget ExcelWay')">Configurer</button>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        // Droits: affichage conditionnel
        let innovationRole = 'collaborateur';
        function setInnovationRole(role, btn) {
            innovationRole = role;
            document.querySelectorAll('#innovationRoleFilters .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderInnovationAccess();
        }
        function renderInnovationAccess() {
            const panel = document.getElementById('innovationAccessPanel');
            if (!panel) return;
            const access = {
                collaborateur: ['Soumettre une idée', 'Consulter la veille', 'Commenter'],
                manager: ['Tout collaborateur', 'Prioriser / classer', 'Voir suivi projets'],
                admin: ['Tout manager', 'Gérer axes', 'Gérer droits', 'Intégration ExcelWay']
            };
            const items = access[innovationRole] || [];
            panel.innerHTML = `
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                    <div style="font-weight:900;color:#0f172a;">Profil actif : ${innovationRole}</div>
                    <ul style="margin:10px 0 0 18px;color:#475569;font-size:12px;line-height:1.9;">
                        ${items.map(x => `<li>${x}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // ===== RSE (table conforme) =====
        const rsePages = ['politiques','chartes','codes','guides','rapports','actions','infos','idees','contributions','rex','axes','echanges','sensibilisation','animation'];
        let rseSection = 'referentiels';
        let rseSub = 'politiques';

        const rseSectionConfig = getCmrData('rseSectionConfig', {});

        function switchRseSection(sectionId) {
            rseSection = sectionId;
            const config = rseSectionConfig[sectionId];
            const subNav = document.getElementById('rseSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchRseSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }

            switchRseSub(config?.defaultSub || 'politiques');
            lucide.createIcons();
        }

        function switchRseSub(subId) {
            rseSub = subId;
            const subNav = document.getElementById('rseSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchRseSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }

            rsePages.forEach(p => {
                const el = document.getElementById('page-rse-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-rse-' + subId);
            if (target) target.style.display = 'block';

            // lazy renders
            if (subId === 'politiques') renderRseReferentiels('politiques');
            if (subId === 'chartes') renderRseReferentiels('chartes');
            if (subId === 'codes') renderRseReferentiels('codes');
            if (subId === 'guides') renderRseReferentiels('guides');
            if (subId === 'rapports') renderRseRapports();
            if (subId === 'actions') renderRseActions();
            if (subId === 'infos') renderRseInfos();
            if (subId === 'idees') renderRseIdeas();
            if (subId === 'contributions') renderRseContributions();
            if (subId === 'rex') renderRseRex();
            if (subId === 'axes') renderRseAxes();
            if (subId === 'echanges') renderRseEchanges();
            if (subId === 'sensibilisation') renderRseSensibilisation();
            if (subId === 'animation') renderRseAnimation();
            lucide.createIcons();
        }

        const rseLabels = getCmrData('rseLabels', {});
        const rseReferentiels = getCmrData('rseReferentiels', {});

        function renderRseReferentiels(type) {
            const map = {
                politiques: 'rsePolitiquesGrid',
                chartes: 'rseChartesGrid',
                codes: 'rseCodesGrid',
                guides: 'rseGuidesGrid'
            };
            const id = map[type];
            const grid = document.getElementById(id);
            if (!grid) return;
            const icon = type === 'politiques' ? 'file-text' : type === 'chartes' ? 'scroll-text' : type === 'codes' ? 'shield-check' : 'leaf';
            grid.innerHTML = (rseReferentiels[type] || []).map(d => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${d.file}','${d.title}')">
                    <div class="doc-icon-large pdf" style="background:#f8fafc;color:#475569;">
                        <i data-lucide="${icon}" style="width:24px;height:24px;"></i>
                    </div>
                    <div class="doc-card-title">${d.title}</div>
                    <div class="doc-card-meta"><span>${rseLabels.consultLabel || ''}</span><i data-lucide="download" style="width:16px;color:#94a3b8;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        const rseRapports = getCmrData('rseRapports', []);
        function renderRseRapports() {
            const list = document.getElementById('rseRapportsList');
            if (!list) return;
            list.innerHTML = rseRapports.map(r => `
                <div class="doc-item" onclick="openMockDownload('${r.file}','${r.title}')">
                    <div class="doc-icon" style="background:#f0fdf4;color:#15803d;font-weight:900;">RSE</div>
                    <div class="doc-info">
                        <div class="doc-title">${r.title}</div>
                        <div class="doc-meta">${r.meta}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        const rseActions = getCmrData('rseActions', []);
        function renderRseActions() {
            const grid = document.getElementById('rseActionsGrid');
            if (!grid) return;
            grid.innerHTML = rseActions.map(a => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('Action_RSE_${a.title.replace(/\\s+/g,'_')}.pdf','${a.title}')">
                    <div class="doc-icon-large" style="background:#f0fdf4;color:#15803d;"><i data-lucide="heart-handshake" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${a.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:8px;">${a.meta}</p>
                    <div class="doc-card-meta"><span>${a.tag}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        const rseInfos = getCmrData('rseInfos', []);
        function renderRseInfos() {
            const list = document.getElementById('rseInfos');
            if (!list) return;
            list.innerHTML = rseInfos.map(i => `
                <div class="doc-item" onclick="openMockDownload('Info_RSE_${i.title.replace(/\\s+/g,'_')}.pdf','${i.title}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">INFO</div>
                    <div class="doc-info">
                        <div class="doc-title">${i.title}</div>
                        <div class="doc-meta">${i.meta}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        let rseIdeas = getCmrData('rseIdeas', []);
        let rseIdeaSelected = null;
        function toggleRseIdeaForm(open) {
            const el = document.getElementById('rseIdeaForm');
            if (el) el.style.display = open ? 'block' : 'none';
        }
        function renderRseIdeas() {
            const list = document.getElementById('rseIdeaList');
            const detail = document.getElementById('rseIdeaDetail');
            if (!list || !detail) return;
            if (!rseIdeas.some(x => x.id === rseIdeaSelected)) {
                rseIdeaSelected = rseIdeas[0]?.id || null;
            }
            list.innerHTML = rseIdeas.map(i => `
                <div class="doc-item" onclick="rseIdeaSelected='${i.id}'; renderRseIdeas();">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">IDE</div>
                    <div class="doc-info">
                        <div class="doc-title">${i.title}</div>
                        <div class="doc-meta">${rseLabels.scoreLabel || ''} ${i.score}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const sel = rseIdeas.find(x => x.id === rseIdeaSelected) || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:10px;color:#475569;font-size:13px;line-height:1.8;">${sel.desc}</div>
                <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="actu-filter-btn" onclick="voteRseIdea('${sel.id}',1)">${rseLabels.voteUpLabel || ''}</button>
                    <button class="actu-filter-btn" onclick="voteRseIdea('${sel.id}',-1)">${rseLabels.voteDownLabel || ''}</button>
                </div>
            ` : (getCmrData('rsePages', {}).idees?.emptyDetail || '');
            lucide.createIcons();
        }
        function voteRseIdea(id, d) { rseIdeas = rseIdeas.map(i => i.id===id ? { ...i, score: Math.max(0, i.score + d) } : i); renderRseIdeas(); }
        function submitRseIdea() {
            const title = (document.getElementById('rseIdeaTitle')?.value || '').trim();
            const desc = (document.getElementById('rseIdeaDesc')?.value || '').trim();
            if (!title || !desc) return;
            rseIdeas = [{ id: 'rsi'+Math.random().toString(16).slice(2), title, desc, score: 0 }, ...rseIdeas];
            document.getElementById('rseIdeaTitle').value = '';
            document.getElementById('rseIdeaDesc').value = '';
            toggleRseIdeaForm(false);
            renderRseIdeas();
        }

        let rseContrib = getCmrData('rseContrib', []);
        let rseContribSelected = null;
        function toggleRseContributionForm(open) {
            const el = document.getElementById('rseContribForm');
            if (el) el.style.display = open ? 'block' : 'none';
        }
        function renderRseContributions() {
            const list = document.getElementById('rseContribList');
            const detail = document.getElementById('rseContribDetail');
            if (!list || !detail) return;
            if (!rseContrib.some(x => x.id === rseContribSelected)) {
                rseContribSelected = rseContrib[0]?.id || null;
            }
            list.innerHTML = rseContrib.map(c => `
                <div class="doc-item" onclick="rseContribSelected='${c.id}'; renderRseContributions();">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">PUB</div>
                    <div class="doc-info">
                        <div class="doc-title">${c.title}</div>
                        <div class="doc-meta">${c.date}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const sel = rseContrib.find(x => x.id === rseContribSelected) || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${sel.date}</div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
                <div style="color:#475569;font-size:13px;line-height:1.8;">${sel.body}</div>
            ` : (getCmrData('rsePages', {}).contributions?.emptyDetail || '');
            lucide.createIcons();
        }
        function submitRseContribution() {
            const title = (document.getElementById('rseContribTitle')?.value || '').trim();
            const body = (document.getElementById('rseContribBody')?.value || '').trim();
            if (!title || !body) return;
            rseContrib = [{ id: 'rsc'+Math.random().toString(16).slice(2), title, body, date: rseLabels.todayLabel || '' }, ...rseContrib];
            document.getElementById('rseContribTitle').value = '';
            document.getElementById('rseContribBody').value = '';
            toggleRseContributionForm(false);
            renderRseContributions();
        }

        const rseRex = getCmrData('rseRex', []);
        function renderRseRex() {
            const list = document.getElementById('rseRexList');
            if (!list) return;
            list.innerHTML = rseRex.map(r => `
                <div class="doc-item" onclick="openMockDownload('${r.file}','${r.title}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">REX</div>
                    <div class="doc-info">
                        <div class="doc-title">${r.title}</div>
                        <div class="doc-meta">${r.meta}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        let rseAxisFilter = 'all';
        const rseAxes = getCmrData('rseAxes', []);
        function filterRseAxis(axis, btn) {
            rseAxisFilter = axis;
            document.querySelectorAll('#rseAxisFilters .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderRseAxes();
        }
        function renderRseAxes() {
            const grid = document.getElementById('rseAxesGrid');
            if (!grid) return;
            const items = rseAxes.filter(a => rseAxisFilter === 'all' || a.axis === rseAxisFilter);
            grid.innerHTML = items.map(a => `
                <div class="doc-card">
                    <div class="doc-icon-large" style="background:#f0fdf4;color:#15803d;"><i data-lucide="target" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${a.axis} — ${a.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:8px;line-height:1.6;">${a.desc}</p>
                    <div class="doc-card-meta"><span>${rseLabels.filterLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        let rseEchanges = getCmrData('rseEchanges', []);
        function renderRseEchanges() {
            const root = document.getElementById('rseEchanges');
            if (!root) return;
            root.innerHTML = `
                <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
                    <input id="rseEchangeInput" class="actu-search-input" placeholder="${rseLabels.messagePlaceholder || ''}">
                    <button class="primary-btn" onclick="addRseEchange()">${rseLabels.commentLabel || ''}</button>
                </div>
                ${rseEchanges.map(x => `
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin-bottom:10px;">
                        <div style="font-weight:900;color:#0f172a;font-size:12px;">${x.author} <span style="font-weight:600;color:#94a3b8;">• ${x.when}</span></div>
                        <div style="margin-top:6px;color:#475569;font-size:12px;line-height:1.7;">${x.text}</div>
                    </div>
                `).join('')}
            `;
        }
        function addRseEchange() {
            const v = (document.getElementById('rseEchangeInput')?.value || '').trim();
            if (!v) return;
            rseEchanges = [{ author: rseLabels.currentUserLabel || '', when: rseLabels.nowLabel || '', text: v }, ...rseEchanges];
            renderRseEchanges();
        }

        const rseSensibilisation = getCmrData('rseSensibilisation', []);
        function renderRseSensibilisation() {
            const root = document.getElementById('rseSensibilisation');
            if (!root) return;
            root.innerHTML = rseSensibilisation.map(s => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;margin-bottom:12px;">
                    <div style="font-weight:900;color:#0f172a;">${s.title}</div>
                    <div style="margin-top:6px;color:var(--text-light);font-size:12px;line-height:1.7;">${s.desc}</div>
                    <button class="primary-btn" style="margin-top:10px;" onclick="openMockDownload('Sensibilisation_${s.title.replace(/\\s+/g,'_')}.pdf','${s.title}')">${rseLabels.participateLabel || ''}</button>
                </div>
            `).join('');
        }

        const rseAnimation = getCmrData('rseAnimation', []);
        function renderRseAnimation() {
            const root = document.getElementById('rseAnimation');
            if (!root) return;
            root.innerHTML = rseAnimation.map(a => `
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px;margin-bottom:12px;">
                    <div style="font-weight:900;color:#0f172a;">${a.title}</div>
                    <div style="margin-top:6px;color:var(--text-light);font-size:12px;line-height:1.7;">${a.desc}</div>
                    <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
                        <button class="primary-btn" onclick="openMockDownload('Animation_${a.title.replace(/\\s+/g,'_')}.pdf','${a.title}')">${rseLabels.participateLabel || ''}</button>
                        <button class="secondary-btn" onclick="openMockDownload('Resultats_${a.title.replace(/\\s+/g,'_')}.pdf','${rseLabels.resultsPrefix || ''} – ${a.title}')">${rseLabels.resultsLabel || ''}</button>
                    </div>
                </div>
            `).join('');
        }

        // ===== SITD (table conforme — onglet 15. Espace SITD) =====
        const sitdFeatures = getCmrData('sitdFeatures', []);

        const sitdFeaturesById = Object.fromEntries(sitdFeatures.map(f => [f.id, f]));

        const sitdSectionConfig = getCmrData('sitdSectionConfig', {});
        const sitdLabels = getCmrData('sitdLabels', {});
        const sitdSensibilisationCards = getCmrData('sitdSensibilisationCards', []);
        const sitdDashboardKpis = getCmrData('sitdDashboardKpis', []);

        let sitdSection = 'securite-si';
        let sitdSub = 'sensibilisation-cyber';

        let sitdCampagnes = getCmrData('sitdCampagnes', []);

        let sitdElearningModules = getCmrData('sitdElearningModules', []);

        let sitdSupports = getCmrData('sitdSupports', []);

        let sitdBonnesPratiques = getCmrData('sitdBonnesPratiques', []);

        let sitdGlpiTickets = getCmrData('sitdGlpiTickets', []);

        let sitdEnquetes = getCmrData('sitdEnquetes', []);

        const sitdSlaRows = getCmrData('sitdSlaRows', []);

        const sitdOutilsSeau = getCmrData('sitdOutilsSeau', []);

        const sitdDocsExploitation = getCmrData('sitdDocsExploitation', []);

        function renderSitdUxContent(f) {
            const id = f.id;
            if (id === 'sensibilisation-cyber') {
                return `
                    <div class="km-grid">
                        ${sitdSensibilisationCards.map(c => `
                            <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('Sensibilisation_${c.title.replace(/\\s+/g,'_')}.pdf','${c.title}')">
                                <div class="doc-icon-large" style="background:${c.color};color:${c.iconColor};"><i data-lucide="${c.icon}" style="width:24px;height:24px;"></i></div>
                                <div class="doc-card-title">${c.title}</div>
                                <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${sitdLabels.sensibilisationMeta || ''}</p>
                                <div class="doc-card-meta"><span style="color:${c.iconColor};font-weight:600;">${sitdLabels.accessLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            if (id === 'modules-elearning') {
                return `
                    <div class="km-grid">
                        ${sitdElearningModules.map(m => `
                            <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${m.file}','${m.title}')">
                                <div class="doc-icon-large" style="background:#eff6ff;color:#3b82f6;"><i data-lucide="play-circle" style="width:24px;height:24px;"></i></div>
                                <div class="doc-card-title">${m.title}</div>
                                <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${m.duree} · ${m.niveau} · ${sitdLabels.elearningMetaSuffix || ''}</p>
                                <div class="doc-card-meta"><span style="color:#3b82f6;font-weight:600;">${sitdLabels.startLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                            </div>
                        `).join('')}
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${sitdLabels.elearningNote || ''}</p>
                `;
            }
            if (id === 'supports-pedagogiques') {
                return `
                    <div class="doc-list">
                        ${sitdSupports.map(s => `
                            <div class="doc-item" onclick="openMockDownload('${s.file}','${s.title}')">
                                <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">${s.type}</div>
                                <div class="doc-info"><div class="doc-title">${s.title}</div><div class="doc-meta">${sitdLabels.supportMetaPrefix || ''} · ${s.type}</div></div>
                                <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            if (id === 'campagnes-si') {
                return `
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        ${sitdCampagnes.map(c => `
                            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                                <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                                    <div>
                                        <div style="font-weight:900;color:#0f172a;">${c.title}</div>
                                        <div style="margin-top:4px;font-size:12px;color:var(--text-light);">${c.date} · ${c.status}</div>
                                    </div>
                                    <button class="actu-filter-btn" onclick="openMockDownload('Campagne_${c.title.replace(/\\s+/g,'_')}.pdf','${c.title}')">${sitdLabels.detailLabel || ''}</button>
                                </div>
                                <div style="margin-top:10px;height:8px;background:#f1f5f9;border-radius:999px;overflow:hidden;">
                                    <div style="width:${c.progress}%;height:100%;background:linear-gradient(90deg,#3b82f6,#6366f1);"></div>
                                </div>
                                <div style="margin-top:6px;font-size:11px;color:#64748b;">${sitdLabels.campaignProgressPrefix || ''} ${c.progress}%</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            if (id === 'bonnes-pratiques-it') {
                return `
                    <div class="actu-search-wrap" style="max-width:420px;margin-bottom:14px;">
                        <i data-lucide="search" class="actu-search-icon"></i>
                        <input id="sitdBpSearch" class="actu-search-input" placeholder="${sitdLabels.searchBpPlaceholder || ''}" oninput="renderSitdBonnesPratiques()">
                    </div>
                    <div id="sitdBpList" class="doc-list"></div>
                `;
            }
            if (id === 'glpi') {
                return `
                    <div style="display:grid;grid-template-columns:1.4fr .6fr;gap:12px;align-items:start;">
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                            <div style="font-weight:900;color:#0f172a;">${sitdLabels.glpiWidgetTitle || ''}</div>
                            <div id="sitdGlpiList" class="doc-list" style="margin-top:12px;"></div>
                            <div style="margin-top:12px;display:grid;gap:10px;">
                                <input id="sitdGlpiTitle" class="actu-search-input" placeholder="${sitdLabels.glpiTitlePlaceholder || ''}">
                                <textarea id="sitdGlpiDesc" class="actu-search-input" style="height:90px;padding-top:10px;" placeholder="${sitdLabels.glpiDescriptionPlaceholder || ''}"></textarea>
                                <button class="primary-btn" onclick="submitSitdGlpi()">${sitdLabels.glpiCreateLabel || ''}</button>
                            </div>
                        </div>
                        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                            <div style="font-weight:900;color:#0f172a;">${sitdLabels.glpiAccessTitle || ''}</div>
                            <p style="margin-top:8px;font-size:12px;color:var(--text-light);line-height:1.6;">${sitdLabels.glpiAccessDescription || ''}</p>
                            <button class="primary-btn" style="margin-top:12px;width:100%;" onclick="openMockDownload('${sitdLabels.glpiOpenFile || ''}','${sitdLabels.glpiOpenTitle || ''}')">${sitdLabels.glpiOpenLabel || ''}</button>
                        </div>
                    </div>
                `;
            }
            if (id === 'tableaux-bord-si') {
                return `
                    <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;">
                        ${sitdDashboardKpis.map(kpi => `
                            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                                <div style="font-size:11px;color:#94a3b8;font-weight:900;">${kpi.label}</div>
                                <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${kpi.value}</div>
                            </div>
                        `).join('')}
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${sitdLabels.dashboardNote || ''}</p>
                `;
            }
            if (id === 'enquetes-satisfaction') {
                return `
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        ${sitdEnquetes.map(e => `
                            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                                <div style="font-weight:900;color:#0f172a;">${e.title}</div>
                                <div style="margin-top:6px;font-size:12px;color:var(--text-light);">${sitdLabels.participationPrefix || ''} ${e.participation} · ${e.statut}</div>
                                <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
                                    ${e.statut === 'Ouverte'
                                        ? `<button class="primary-btn" onclick="alert('${sitdLabels.surveyThanks || ''}')">${sitdLabels.respondLabel || ''}</button>`
                                        : `<button class="secondary-btn" onclick="openMockDownload('${sitdLabels.surveyResultsFile || ''}','${sitdLabels.surveyResultsTitle || ''}')">${sitdLabels.analyzeLabel || ''}</button>`}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${sitdLabels.surveyNote || ''}</p>
                `;
            }
            if (id === 'sla') {
                return `
                    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                        <table style="width:100%;border-collapse:collapse;font-size:13px;">
                            <thead>
                                <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                                    ${(sitdLabels.slaColumns || []).map((column, index, columns) => `
                                        <th style="padding:12px 16px;text-align:${index === columns.length - 1 ? 'right' : 'left'};">${column}</th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${sitdSlaRows.map(r => `
                                    <tr style="border-bottom:1px solid #f1f5f9;">
                                        <td style="padding:12px 16px;font-weight:700;color:#0f172a;">${r.service}</td>
                                        <td style="padding:12px 16px;color:var(--text-light);">${r.engagement}</td>
                                        <td style="padding:12px 16px;color:var(--text-light);">${r.indicateur}</td>
                                        <td style="padding:12px 16px;color:var(--text-light);">${r.statut}</td>
                                        <td style="padding:12px 16px;text-align:right;">
                                            <button class="actu-filter-btn" onclick="openMockDownload('SLA_${r.service.replace(/\\s+/g,'_')}.pdf','${r.service}')">${sitdLabels.consultLabel || ''}</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
            if (id === 'repertoire-outils') {
                return `
                    <div class="km-grid">
                        ${sitdOutilsSeau.map(o => `
                            <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('Outil_${o.nom.replace(/\\s+/g,'_')}.pdf','${o.nom}')">
                                <div class="doc-icon-large" style="background:#f8fafc;color:#475569;"><i data-lucide="wrench" style="width:24px;height:24px;"></i></div>
                                <div class="doc-card-title">${o.nom}</div>
                                <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${o.role} · ${o.acces}</p>
                                <div class="doc-card-meta"><span>${sitdLabels.consultSheetLabel || ''}</span><i data-lucide="external-link" style="width:16px;"></i></div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            if (id === 'documentation-exploitation') {
                return `
                    <div class="doc-list">
                        ${sitdDocsExploitation.map(d => `
                            <div class="doc-item" onclick="openMockDownload('${d.file}','${d.title}')">
                                <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">DOC</div>
                                <div class="doc-info">
                                    <div class="doc-title">${d.title}</div>
                                    <div class="doc-meta">${sitdLabels.docMetaPrefix || ''} · ${d.dossier}</div>
                                </div>
                                <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            return '';
        }

        function renderSitdBonnesPratiques() {
            const list = document.getElementById('sitdBpList');
            if (!list) return;
            const q = (document.getElementById('sitdBpSearch')?.value || '').trim().toLowerCase();
            const filtered = sitdBonnesPratiques.filter(bp =>
                !q || bp.title.toLowerCase().includes(q) || bp.categorie.toLowerCase().includes(q)
            );
            list.innerHTML = filtered.map(bp => `
                <div class="doc-item" onclick="openMockDownload('${bp.file}','${bp.title}')">
                    <div class="doc-icon" style="background:#f0fdf4;color:#166534;font-weight:900;">${bp.categorie.slice(0, 3).toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${bp.title}</div>
                        <div class="doc-meta">${bp.categorie} · ${sitdLabels.bpMetaSuffix || ''}</div>
                    </div>
                    <i data-lucide="folder-open" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('') || `<div style="padding:12px;color:var(--text-light);font-size:13px;">${sitdLabels.emptyResult || ''}</div>`;
        }

        function renderSitdGlpi() {
            const list = document.getElementById('sitdGlpiList');
            if (!list) return;
            list.innerHTML = sitdGlpiTickets.map(t => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#ecfdf5;color:#047857;font-weight:900;">${t.id}</div>
                    <div class="doc-info"><div class="doc-title">${t.title}</div><div class="doc-meta">${t.meta}</div></div>
                </div>
            `).join('');
        }

        function submitSitdGlpi() {
            const title = (document.getElementById('sitdGlpiTitle')?.value || '').trim();
            const desc = (document.getElementById('sitdGlpiDesc')?.value || '').trim();
            if (!title) return;
            sitdGlpiTickets = [{ id: 'INC-' + Math.floor(2400 + Math.random() * 100), title, meta: (sitdLabels.newTicketPrefix || '') + (desc ? sitdLabels.withDescriptionLabel || '' : sitdLabels.withoutDescriptionLabel || '') }, ...sitdGlpiTickets];
            const t = document.getElementById('sitdGlpiTitle');
            const d = document.getElementById('sitdGlpiDesc');
            if (t) t.value = '';
            if (d) d.value = '';
            renderSitdGlpi();
        }

        function renderSitdPage(subId) {
            const f = sitdFeaturesById[subId];
            const host = document.getElementById('sitdPageHost');
            if (!f || !host) return;
            host.innerHTML = `
                <div class="dashboard-card">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="card-icon blue"><i data-lucide="layout-template" style="width:20px;height:20px;"></i></div>
                            ${f.sousRubrique}
                        </div>
                    </div>
                    <div style="padding:0 18px 14px 18px;color:var(--text-light);font-size:13px;line-height:1.65;border-bottom:1px solid #f1f5f9;">
                        ${f.description}
                    </div>
                    <div style="padding:18px;">${renderSitdUxContent(f)}</div>
                </div>
            `;
            if (subId === 'bonnes-pratiques-it') renderSitdBonnesPratiques();
            if (subId === 'glpi') renderSitdGlpi();
            lucide.createIcons();
        }

        function switchSitdSection(sectionId) {
            sitdSection = sectionId;
            submenuSelections.sitd = sectionId;
            const config = sitdSectionConfig[sectionId];
            const subNav = document.getElementById('sitdSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchSitdSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchSitdSub(config?.defaultSub || 'sensibilisation-cyber');
            renderInPageSubmenuNavbar('sitd');
            lucide.createIcons();
        }

        function switchSitdSub(subId) {
            sitdSub = subId;
            const subNav = document.getElementById('sitdSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchSitdSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }
            renderSitdPage(subId);
        }

        // ===== ARC (table conforme — onglet 16. Audit, Risque & Conformité) =====
        const arcFeatures = getCmrData('arcFeatures', []);

        const arcFeaturesById = Object.fromEntries(arcFeatures.map(f => [f.id, f]));

        const arcSectionConfig = getCmrData('arcSectionConfig', {});
        const arcLabels = getCmrData('arcLabels', {});
        const arcPresentation = getCmrData('arcPresentation', {});

        let arcSection = 'audit-interne';
        let arcSub = 'charte-audit';

        const arcCharteDocs = getCmrData('arcCharteDocs', []);

        const arcPlansAudit = getCmrData('arcPlansAudit', []);

        let arcRapportsPv = getCmrData('arcRapportsPv', []);

        const arcPolitiquesChartes = getCmrData('arcPolitiquesChartes', []);

        const arcCndpItems = getCmrData('arcCndpItems', []);

        const arcPcaCapsules = getCmrData('arcPcaCapsules', []);

        const arcPlansAnnuels = getCmrData('arcPlansAnnuels', []);

        const arcManuelsControle = getCmrData('arcManuelsControle', []);

        const arcSmacafItems = getCmrData('arcSmacafItems', []);

        const arcSensibilisationItems = getCmrData('arcSensibilisationItems', []);

        function renderArcUxContent(f) {
            const id = f.id;
            if (id === 'charte-audit') {
                return `
                    <div class="doc-list">
                        ${arcCharteDocs.map(d => `
                            <div class="doc-item" onclick="openMockDownload('${d.file}','${d.title}')">
                                <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">PDF</div>
                                <div class="doc-info">
                                    <div class="doc-title">${d.title}</div>
                                    <div class="doc-meta">Page / PDF · ${d.date} · ${arcLabels.charteMetaSuffix || ''}</div>
                                </div>
                                <i data-lucide="eye" style="width:16px;height:16px;color:#94a3b8;"></i>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            if (id === 'plan-audit') {
                return `
                    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                        <table style="width:100%;border-collapse:collapse;font-size:13px;">
                            <thead>
                                <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                                    ${(arcLabels.planAuditColumns || []).map((column, index, columns) => `
                                        <th style="padding:12px 16px;text-align:${index === columns.length - 1 ? 'right' : 'left'};">${column}</th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${arcPlansAudit.map(p => `
                                    <tr style="border-bottom:1px solid #f1f5f9;">
                                        <td style="padding:12px 16px;font-weight:700;color:#0f172a;">${p.periode}</td>
                                        <td style="padding:12px 16px;color:var(--text-light);">${p.type}</td>
                                        <td style="padding:12px 16px;color:var(--text-light);">${p.statut}</td>
                                        <td style="padding:12px 16px;text-align:right;">
                                            <button class="actu-filter-btn" onclick="openMockDownload('${p.file}','${arcLabels.planAuditTitlePrefix || ''} ${p.periode}')">${arcLabels.consultLabel || ''}</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${arcLabels.planAuditNote || ''}</p>
                `;
            }
            if (id === 'rapports-pv') {
                return `
                    <div id="arcRapportsList" class="doc-list"></div>
                `;
            }
            if (id === 'presentation-activites') {
                return `
                    <div style="display:flex;flex-direction:column;gap:14px;">
                        <div style="background:linear-gradient(135deg,#eff6ff,#f8fafc);border:1px solid #bfdbfe;border-radius:14px;padding:20px;">
                            <div style="font-size:11px;font-weight:900;color:#1d4ed8;text-transform:uppercase;letter-spacing:.04em;">${arcPresentation.eyebrow || ''}</div>
                            <div style="margin-top:8px;font-size:16px;font-weight:900;color:#0f172a;">${arcPresentation.title || ''}</div>
                            <p style="margin-top:10px;font-size:13px;color:#475569;line-height:1.7;">
                                ${arcPresentation.description || ''}
                            </p>
                        </div>
                        <div class="km-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));">
                            ${(arcPresentation.cards || []).map(card => `
                                <div class="doc-card" style="cursor:default;">
                                    <div class="doc-card-title">${card.title}</div>
                                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${card.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${arcPresentation.note || ''}</p>
                `;
            }
            if (id === 'politiques-chartes') {
                return `
                    <div id="arcPolitiquesList" class="doc-list"></div>
                `;
            }
            if (id === 'cndp') {
                return `
                    <div class="km-grid">
                        ${arcCndpItems.map(c => `
                            <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${c.file}','${c.title}')">
                                <div class="doc-icon-large" style="background:#f0fdf4;color:#166534;"><i data-lucide="file-text" style="width:24px;height:24px;"></i></div>
                                <div class="doc-card-title">${c.title}</div>
                                <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${c.ref} · ${c.date} · ${arcLabels.cndpMetaSuffix || ''}</p>
                                <div class="doc-card-meta"><span>${arcLabels.consultLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                            </div>
                        `).join('')}
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${arcLabels.cndpNote || ''}</p>
                `;
            }
            if (id === 'pca') {
                return `
                    <div class="km-grid">
                        ${arcPcaCapsules.map(c => `
                            <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${c.file}','${c.title}')">
                                <div class="doc-icon-large" style="background:#eff6ff;color:#2563eb;"><i data-lucide="life-buoy" style="width:24px;height:24px;"></i></div>
                                <div class="doc-card-title">${c.title}</div>
                                <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${c.type} · ${c.duree} · ${arcLabels.pcaMetaSuffix || ''}</p>
                                <div class="doc-card-meta"><span>${arcLabels.consultLabel || ''}</span><i data-lucide="play" style="width:16px;"></i></div>
                            </div>
                        `).join('')}
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${arcLabels.pcaNote || ''}</p>
                `;
            }
            if (id === 'plans-annuels') {
                return `
                    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                        <table style="width:100%;border-collapse:collapse;font-size:13px;">
                            <thead>
                                <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                                    ${(arcLabels.plansAnnuelsColumns || []).map((column, index, columns) => `
                                        <th style="padding:12px 16px;text-align:${index === columns.length - 1 ? 'right' : 'left'};">${column}</th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${arcPlansAnnuels.map(p => `
                                    <tr style="border-bottom:1px solid #f1f5f9;">
                                        <td style="padding:12px 16px;font-weight:700;color:#0f172a;">${p.plan}</td>
                                        <td style="padding:12px 16px;color:var(--text-light);">${p.domaine}</td>
                                        <td style="padding:12px 16px;color:var(--text-light);">${p.statut}</td>
                                        <td style="padding:12px 16px;text-align:right;">
                                            <button class="actu-filter-btn" onclick="openMockDownload('${p.file}','${p.plan}')">${arcLabels.consultLabel || ''}</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
            if (id === 'manuels-controle') {
                return `
                    <div class="actu-search-wrap" style="max-width:420px;margin-bottom:14px;">
                        <i data-lucide="search" class="actu-search-icon"></i>
                        <input id="arcManuelsSearch" class="actu-search-input" placeholder="${arcLabels.searchManuelsPlaceholder || ''}" oninput="renderArcManuels()">
                    </div>
                    <div id="arcManuelsList" class="doc-list"></div>
                `;
            }
            if (id === 'smacaf') {
                return `
                    <div id="arcSmacafList" class="doc-list">
                        ${arcSmacafItems.map(s => `
                            <div class="doc-item" onclick="openMockDownload('${s.file}','${s.title}')">
                                <div class="doc-icon" style="background:#f5f3ff;color:#6d28d9;font-weight:900;">SM</div>
                                <div class="doc-info">
                                    <div class="doc-title">${s.title}</div>
                                    <div class="doc-meta">${s.meta} · ${arcLabels.smacafMetaSuffix || ''}</div>
                                </div>
                                <i data-lucide="folder-open" style="width:16px;height:16px;color:#94a3b8;"></i>
                            </div>
                        `).join('')}
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${arcLabels.smacafNote || ''}</p>
                `;
            }
            if (id === 'culture-risque-conformite') {
                return `
                    <div class="km-grid">
                        ${arcSensibilisationItems.map(s => {
                            const click = s.type === 'Quiz'
                                ? `alert('${arcLabels.quizAlert || ''}')`
                                : `openMockDownload('${s.file}','${s.title.replace(/'/g, "\\'")}')`;
                            const icon = s.type === 'Vidéo' ? 'play-circle' : s.type === 'Quiz' ? 'help-circle' : 'image';
                            return `
                            <div class="doc-card" style="cursor:pointer;" onclick="${click}">
                                <div class="doc-icon-large" style="background:#fdf4ff;color:#7c3aed;"><i data-lucide="${icon}" style="width:24px;height:24px;"></i></div>
                                <div class="doc-card-title">${s.title}</div>
                                <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${s.type} · ${s.duree} · ${arcLabels.sensibilisationMetaSuffix || ''}</p>
                                <div class="doc-card-meta"><span>${s.type === 'Quiz' ? arcLabels.participateLabel || '' : arcLabels.consultLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                            </div>`;
                        }).join('')}
                    </div>
                    <p style="margin-top:12px;font-size:12px;color:var(--text-light);">${arcLabels.sensibilisationNote || ''}</p>
                `;
            }
            return '';
        }

        function renderArcRapportsPv() {
            const list = document.getElementById('arcRapportsList');
            if (!list) return;
            list.innerHTML = arcRapportsPv.map(r => `
                <div class="doc-item" onclick="openMockDownload('${r.file}','${r.title}')">
                    <div class="doc-icon" style="background:#fef2f2;color:#b91c1c;font-weight:900;">S</div>
                    <div class="doc-info">
                        <div class="doc-title">${r.title}</div>
                        <div class="doc-meta">${r.meta} · ${arcLabels.rapportsMetaSuffix || ''} · ${r.sensibilite}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
        }

        function renderArcPolitiques() {
            const list = document.getElementById('arcPolitiquesList');
            if (!list) return;
            list.innerHTML = arcPolitiquesChartes.map(p => `
                <div class="doc-item" onclick="openMockDownload('${p.file}','${p.title}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">${p.dossier.slice(0, 3).toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${p.title}</div>
                        <div class="doc-meta">${p.dossier} · ${arcLabels.politiquesMetaSuffix || ''}</div>
                    </div>
                    <i data-lucide="folder" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
        }

        function renderArcManuels() {
            const list = document.getElementById('arcManuelsList');
            if (!list) return;
            const q = (document.getElementById('arcManuelsSearch')?.value || '').trim().toLowerCase();
            const filtered = arcManuelsControle.filter(m =>
                !q || m.title.toLowerCase().includes(q) || m.dossier.toLowerCase().includes(q)
            );
            list.innerHTML = filtered.map(m => `
                <div class="doc-item" onclick="openMockDownload('${m.file}','${m.title}')">
                    <div class="doc-icon" style="background:#f0fdf4;color:#166534;font-weight:900;">${m.dossier.slice(0, 3).toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${m.title}</div>
                        <div class="doc-meta">${m.dossier} · ${arcLabels.manuelsMetaSuffix || ''}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('') || `<div style="padding:12px;color:var(--text-light);font-size:13px;">${arcLabels.emptyResult || ''}</div>`;
        }

        function renderArcPage(subId) {
            const f = arcFeaturesById[subId];
            const host = document.getElementById('arcPageHost');
            if (!f || !host) return;
            host.innerHTML = `
                <div class="dashboard-card">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="card-icon blue"><i data-lucide="layout-template" style="width:20px;height:20px;"></i></div>
                            ${f.sousRubrique}
                        </div>
                        </div>
                    <div style="padding:0 18px 14px 18px;color:var(--text-light);font-size:13px;line-height:1.65;border-bottom:1px solid #f1f5f9;">
                        ${f.description}
                    </div>
                    <div style="padding:18px;">${renderArcUxContent(f)}</div>
                </div>
            `;
            if (subId === 'rapports-pv') renderArcRapportsPv();
            if (subId === 'politiques-chartes') renderArcPolitiques();
            if (subId === 'manuels-controle') renderArcManuels();
            lucide.createIcons();
        }

        function switchArcSection(sectionId) {
            arcSection = sectionId;
            submenuSelections.arc = sectionId;
            const config = arcSectionConfig[sectionId];
            const subNav = document.getElementById('arcSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchArcSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchArcSub(config?.defaultSub || 'charte-audit');
            renderInPageSubmenuNavbar('arc');
            lucide.createIcons();
        }

        function switchArcSub(subId) {
            arcSub = subId;
            const subNav = document.getElementById('arcSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchArcSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }
            renderArcPage(subId);
        }

        // ===== QSE (table conforme — onglet 9. QSE + Complément QSE) =====
        const qsePages = ['politiques','referentiels','docs','contenus','audits','resultats-audits','indicateurs','idees','contributions','remontees','stats','culture','culture-portail'];

        const qseSectionConfig = getCmrData('qseSectionConfig', {});

        let qseSection = 'referentiels';
        let qseSub = 'politiques';

        function switchQseSection(sectionId) {
            qseSection = sectionId;
            submenuSelections.qse = sectionId;
            const config = qseSectionConfig[sectionId];
            const subNav = document.getElementById('qseSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchQseSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchQseSub(config?.defaultSub || 'politiques');
            renderInPageSubmenuNavbar('qse');
            lucide.createIcons();
        }

        function switchQseSub(subId) {
            qseSub = subId;
            const subNav = document.getElementById('qseSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchQseSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }
            qsePages.forEach(p => {
                const el = document.getElementById('page-qse-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-qse-' + subId);
            if (target) target.style.display = 'block';

            if (subId === 'politiques') renderQsePolitiques();
            if (subId === 'referentiels') renderQseReferentiels();
            if (subId === 'docs') renderQseSmiDocs();
            if (subId === 'contenus') renderQsePedago();
            if (subId === 'audits') renderQseAudits();
            if (subId === 'resultats-audits') renderQseResultatsAudits();
            if (subId === 'indicateurs') renderQseKpis();
            if (subId === 'idees') renderQseIdeas();
            if (subId === 'contributions') renderQseContributions();
            if (subId === 'remontees') renderQseRemontees();
            if (subId === 'stats') renderQseStats();
            if (subId === 'culture') renderQseCulture();
            if (subId === 'culture-portail') renderQseCulturePortail();
            lucide.createIcons();
        }

        const qseLabels = getCmrData('qseLabels', {});
        const qseKpisData = getCmrData('qseKpisData', {});
        const qseStatsData = getCmrData('qseStatsData', {});
        const qsePolitiques = getCmrData('qsePolitiques', []);
        const qseReferentiels = getCmrData('qseReferentiels', []);
        const qseSmiDocs = getCmrData('qseSmiDocs', []);
        const qsePedago = getCmrData('qsePedago', []);
        const qseAudits = getCmrData('qseAudits', []);
        const qseCultureItems = getCmrData('qseCultureItems', []);
        const qseCulturePortailItems = getCmrData('qseCulturePortailItems', []);
        const qseResultatsAudits = getCmrData('qseResultatsAudits', []);
        const qseContributions = getCmrData('qseContributions', []);

        function renderQsePolitiques() {
            const grid = document.getElementById('qsePolitiquesGrid');
            if (!grid) return;
            grid.innerHTML = qsePolitiques.map(d => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${d.file}','${d.title}')">
                    <div class="doc-icon-large pdf" style="background:#f8fafc;color:#475569;"><i data-lucide="file-text" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${d.title}</div>
                    <div class="doc-card-meta"><span>${qseLabels.consultLabel || ''}</span><i data-lucide="download" style="width:16px;color:#94a3b8;"></i></div>
                </div>
            `).join('');
        }
        function renderQseReferentiels() {
            const grid = document.getElementById('qseReferentielsGrid');
            if (!grid) return;
            grid.innerHTML = qseReferentiels.map(d => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${d.file}','${d.title}')">
                    <div class="doc-icon-large pdf" style="background:#f8fafc;color:#475569;"><i data-lucide="shield-check" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${d.title}</div>
                    <div class="doc-card-meta"><span>${qseLabels.consultLabel || ''}</span><i data-lucide="download" style="width:16px;color:#94a3b8;"></i></div>
                </div>
            `).join('');
        }
        function renderQseSmiDocs() {
            const list = document.getElementById('qseSmiDocs');
            if (!list) return;
            list.innerHTML = qseSmiDocs.map(d => `
                <div class="doc-item" onclick="openMockDownload('${d.file}','${d.title}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">SMI</div>
                    <div class="doc-info"><div class="doc-title">${d.title}</div><div class="doc-meta">${qseLabels.smiMeta || ''}</div></div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
        }
        function renderQsePedago() {
            const grid = document.getElementById('qsePedago');
            if (!grid) return;
            grid.innerHTML = qsePedago.map(p => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${p.file}','${p.title}')">
                    <div class="doc-icon-large" style="background:#fdf4ff;color:#7c3aed;"><i data-lucide="megaphone" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${p.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${p.meta}</p>
                    <div class="doc-card-meta"><span>${qseLabels.consultLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
        }
        function renderQseAudits() {
            const body = document.getElementById('qseAuditsTable');
            if (!body) return;
            body.innerHTML = qseAudits.map(a => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                    <td style="padding:12px 16px;color:#0f172a;font-weight:700;">${a.title}</td>
                    <td style="padding:12px 16px;color:var(--text-light);">${a.date}</td>
                    <td style="padding:12px 16px;color:var(--text-light);">${a.status}</td>
                    <td style="padding:12px 16px;text-align:right;">
                        <button class="actu-filter-btn" onclick="openMockDownload('${a.report}','${a.title}')">${qseLabels.downloadLabel || ''}</button>
                    </td>
                </tr>
            `).join('');
        }
        function renderQseKpis() {
            const root = document.getElementById('qseKpis');
            if (!root) return;
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                    ${(qseKpisData.items || []).map(kpi => `
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                            <div style="font-size:11px;color:#94a3b8;font-weight:900;">${kpi.label}</div>
                            <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${kpi.value}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top:12px;color:var(--text-light);font-size:12px;line-height:1.6;">${qseKpisData.description || ''}</div>
            `;
        }
        let qseIdeaItems = getCmrData('qseIdeaItems', []);
        function renderQseIdeas() {
            const list = document.getElementById('qseIdeaList');
            if (!list) return;
            list.innerHTML = qseIdeaItems.map(i => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">IDE</div>
                    <div class="doc-info"><div class="doc-title">${i.title}</div><div class="doc-meta">${i.type} • ${i.date}</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
        }
        function submitQseIdea() {
            const t = (document.getElementById('qseIdeaTitle')?.value || '').trim();
            const ty = (document.getElementById('qseIdeaType')?.value || qseLabels.defaultIdeaType || '').trim();
            const d = (document.getElementById('qseIdeaDesc')?.value || '').trim();
            if (!t || !d) return;
            qseIdeaItems = [{ title: t, type: ty, date: qseLabels.todayLabel || '' }, ...qseIdeaItems];
            document.getElementById('qseIdeaTitle').value = '';
            document.getElementById('qseIdeaDesc').value = '';
            renderQseIdeas();
        }

        let qseRemontees = getCmrData('qseRemontees', []);
        function renderQseRemontees() {
            const list = document.getElementById('qseRemList');
            if (!list) return;
            list.innerHTML = qseRemontees.map(r => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">ALR</div>
                    <div class="doc-info"><div class="doc-title">${r.title}</div><div class="doc-meta">${r.date}</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }
        function submitQseRemontee() {
            const t2 = (document.getElementById('qseRemTitle')?.value || '').trim();
            const d2 = (document.getElementById('qseRemDesc')?.value || '').trim();
            if (!t2 || !d2) return;
            qseRemontees = [{ title: t2, date: qseLabels.todayLabel || '' }, ...qseRemontees];
            document.getElementById('qseRemTitle').value = '';
            document.getElementById('qseRemDesc').value = '';
            renderQseRemontees();
        }
        function renderQseStats() {
            const root = document.getElementById('qseStats');
            if (!root) return;
            const statsCounts = {
                remontees: qseRemontees.length,
                idees: qseIdeaItems.length,
                audits: qseAudits.length
            };
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                    ${(qseStatsData.items || []).map(stat => `
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                            <div style="font-size:11px;color:#94a3b8;font-weight:900;">${stat.label}</div>
                            <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${statsCounts[stat.source] || 0}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top:12px;color:var(--text-light);font-size:12px;line-height:1.6;">${qseStatsData.description || ''}</div>
            `;
        }
        function renderQseCulture() {
            const list = document.getElementById('qseCulture');
            if (!list) return;
            list.innerHTML = qseCultureItems.map(c => `
                <div class="doc-item" onclick="openMockDownload('${c.file}','${c.title}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">QSE</div>
                    <div class="doc-info"><div class="doc-title">${c.title}</div><div class="doc-meta">${c.meta}</div></div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${c.file}','${c.title}')">${qseLabels.consultLabel || ''}</button>
                        <button class="primary-btn" style="padding:8px 12px;" onclick="event.stopPropagation(); openMockDownload('Participation_${c.title.replace(/\\s+/g,'_')}.pdf','Participation – ${c.title}')">${qseLabels.participateLabel || ''}</button>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        }
        function renderQseCulturePortail() {
            const grid = document.getElementById('qseCulturePortail');
            if (!grid) return;
            grid.innerHTML = qseCulturePortailItems.map(c => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${c.file}','${c.title}')">
                    <div class="doc-icon-large" style="background:#eff6ff;color:#2563eb;"><i data-lucide="${c.type === 'Vidéo' ? 'play-circle' : 'megaphone'}" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${c.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${c.type} · ${qseLabels.portalMetaSuffix || ''}</p>
                    <div class="doc-card-meta"><span>${qseLabels.consultLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }
        function renderQseResultatsAudits() {
            const root = document.getElementById('qseResultatsAudits');
            if (!root) return;
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:14px;">
                    ${qseResultatsAudits.map(r => `
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px;">
                            <div style="font-weight:900;color:#0f172a;">${r.title}</div>
                            <div style="margin-top:6px;font-size:12px;color:var(--text-light);">${qseLabels.kpiPrefix || ''} ${r.kpi}</div>
                            <button class="primary-btn" style="margin-top:10px;" onclick="openMockDownload('${r.file}','${r.title}')">${qseLabels.resultDownloadLabel || ''}</button>
                        </div>
                    `).join('')}
                </div>
                
            `;
        }
        function renderQseContributions() {
            const grid = document.getElementById('qseContributionsGrid');
            if (!grid) return;
            grid.innerHTML = qseContributions.map(c => `
                <div class="doc-card" style="cursor:pointer;" onclick="alert('${qseLabels.contributionAlert || ''}')">
                    <div class="doc-icon-large" style="background:#f0fdf4;color:#16a34a;"><i data-lucide="lightbulb" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${c.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${c.auteur} · ${c.votes} votes · ${qseLabels.contributionMetaSuffix || ''}</p>
                    <div class="doc-card-meta"><span>${qseLabels.participateLabel || ''}</span><i data-lucide="heart" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // ===== RÉGLEMENTAIRE (table conforme — onglet 10. Réglementaire) =====
        const regPages = ['textes','thematiques','procedures','notes','moteur','ged','gestion','workflow','historique','archives'];

        const regSectionConfig = getCmrData('regSectionConfig', {});

        let regSection = 'referentiels';
        let regSub = 'textes';
        let regTextesType = 'all';
        let regTheme = 'all';
        let regGlobalScope = 'all';
        let regHistoryFilter = 'all';
        let regArchiveMode = 'actifs';

        const regPagesConfig = getCmrData('regPages', {});
        const regThemes = getCmrData('regThemes', []);
        const regLabels = getCmrData('regLabels', {});
        const regTextesItems = getCmrData('regTextesItems', []);
        const regProcedures = getCmrData('regProcedures', []);
        const regNotes = getCmrData('regNotes', []);
        const regGedArchives = getCmrData('regGedArchives', []);
        let regGestionItems = getCmrData('regGestionItems', []);
        let regWorkflowQueue = getCmrData('regWorkflowQueue', []);
        let regHistory = getCmrData('regHistory', []);
        const regArchiveDocs = getCmrData('regArchiveDocs', []);

        function switchRegSection(sectionId) {
            regSection = sectionId;
            submenuSelections.reglementation = sectionId;
            const config = regSectionConfig[sectionId];
            const subNav = document.getElementById('regSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchRegSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchRegSub(config?.defaultSub || config?.subs?.[0]?.id || 'textes');
            renderInPageSubmenuNavbar('reglementation');
            lucide.createIcons();
        }

        function switchRegSub(subId) {
            regSub = subId;
            const subNav = document.getElementById('regSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchRegSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }
            regPages.forEach(p => {
                const el = document.getElementById('page-reg-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-reg-' + subId);
            if (target) target.style.display = 'block';

            if (subId === 'textes') renderRegTextes();
            if (subId === 'thematiques') renderRegThematics();
            if (subId === 'procedures') renderRegProcedures();
            if (subId === 'notes') renderRegNotes();
            if (subId === 'moteur') renderRegGlobalSearch();
            if (subId === 'ged') renderRegGed();
            if (subId === 'gestion') renderRegGestion();
            if (subId === 'workflow') renderRegWorkflow();
            if (subId === 'historique') renderRegHistory();
            if (subId === 'archives') renderRegArchives();
            lucide.createIcons();
        }

        function setRegTextesType(type, el) {
            regTextesType = type;
            document.querySelectorAll('#page-reg-textes .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderRegTextes();
        }
        function renderRegTextes() {
            const root = document.getElementById('regTextesList');
            if (!root) return;
            const q = (document.getElementById('regTextesSearch')?.value || '').toLowerCase().trim();
            const items = regTextesItems.filter(i => {
                const typeOk = regTextesType === 'all' || i.type === regTextesType;
                const qOk = !q || (i.title + ' ' + i.ref + ' ' + i.tags.join(' ')).toLowerCase().includes(q);
                return typeOk && qOk;
            });
            root.innerHTML = items.map(i => `
                <div class="doc-item" onclick="openMockDownload('${i.file}','${i.title}')">
                    <div class="doc-icon" style="background:#ecfdf5;color:#059669;font-weight:900;">${i.type.slice(0,3).toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${i.title}</div>
                        <div class="doc-meta">${i.type} • ${i.ref} • ${i.date} • ${regLabels.tagsLabel || ''}: ${i.tags.join(', ')}</div>
                    </div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${i.file}','${i.title}')">${regLabels.consultLabel || ''}</button>
                        <button class="primary-btn" style="padding:8px 12px;" onclick="event.stopPropagation(); openMockDownload('${i.file}','${regLabels.downloadLabel || ''} – ${i.title}')">${regLabels.downloadLabel || ''}</button>
                    </div>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">${regLabels.noResult || ''}</div>`;
            lucide.createIcons();
        }

        function setRegTheme(theme, el) {
            regTheme = theme;
            document.querySelectorAll('#page-reg-thematiques .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderRegThematics();
        }
        function renderRegThematics() {
            const grid = document.getElementById('regThematicsGrid');
            if (!grid) return;
            const themes = regThemes.filter(t => regTheme === 'all' || t.title === regTheme);
            grid.innerHTML = themes.map(t => `
                <div class="doc-card" style="cursor:pointer;" onclick="setRegTextesType('all', null); switchRegSection('referentiels'); document.getElementById('regTextesSearch').value='${t.title.toLowerCase()}'; renderRegTextes();">
                    <div class="doc-icon-large" style="background:#f8fafc;color:#475569;"><i data-lucide="${t.icon}" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${t.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;line-height:1.6;">${t.desc}</p>
                    <div class="doc-card-meta"><span>${regLabels.browseLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;color:#94a3b8;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderRegProcedures() {
            const root = document.getElementById('regProceduresList');
            if (!root) return;
            const q = (document.getElementById('regProcSearch')?.value || '').toLowerCase().trim();
            const items = regProcedures.filter(p => !q || (p.title + ' ' + p.meta + ' ' + (p.tags||[]).join(' ')).toLowerCase().includes(q));
            root.innerHTML = items.map(p => `
                <div class="doc-item" onclick="openMockDownload('${p.file}','${p.title}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">PRC</div>
                    <div class="doc-info"><div class="doc-title">${p.title}</div><div class="doc-meta">${p.meta}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${p.file}','${p.title}')">${regLabels.consultLabel || ''}</button>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">${regLabels.noProcedure || ''}</div>`;
            lucide.createIcons();
        }

        function renderRegNotes() {
            const root = document.getElementById('regNotesList');
            if (!root) return;
            root.innerHTML = regNotes.map(n => `
                <div class="doc-item" onclick="openMockDownload('${n.file}','${n.title}')">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">GDE</div>
                    <div class="doc-info"><div class="doc-title">${n.title}</div><div class="doc-meta">${n.meta}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${n.file}','${n.title}')">${regLabels.consultLabel || ''}</button>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function setRegGlobalScope(scope, el) {
            regGlobalScope = scope;
            document.querySelectorAll('#page-reg-moteur .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderRegGlobalSearch();
        }
        function renderRegGlobalSearch() {
            const root = document.getElementById('regGlobalResults');
            if (!root) return;
            const q = (document.getElementById('regGlobalSearch')?.value || '').toLowerCase().trim();
            if (!q) {
                root.innerHTML = `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">${regLabels.searchPrompt || ''}</div>`;
                return;
            }
            const hit = (kind, title, meta, file) => ({ kind, title, meta, file });
            const all = [
                ...regTextesItems.map(i => hit('textes', i.title, `${i.type} • ${i.ref} • ${i.date}`, i.file)),
                ...regProcedures.map(p => hit('procedures', p.title, p.meta, p.file)),
                ...regNotes.map(n => hit('notes', n.title, n.meta, n.file))
            ].filter(h => (regGlobalScope === 'all' || h.kind === regGlobalScope) && (h.title + ' ' + h.meta).toLowerCase().includes(q));
            root.innerHTML = all.map(h => `
                <div class="doc-item" onclick="openMockDownload('${h.file}','${h.title}')">
                    <div class="doc-icon" style="background:#f8fafc;color:#475569;font-weight:900;">${h.kind.slice(0,3).toUpperCase()}</div>
                    <div class="doc-info"><div class="doc-title">${h.title}</div><div class="doc-meta">${h.meta}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${h.file}','${h.title}')">${regLabels.openLabel || ''}</button>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">${regLabels.noResult || ''}</div>`;
            lucide.createIcons();
        }

        function renderRegGed() {
            const root = document.getElementById('regGedList');
            if (!root) return;
            root.innerHTML = regGedArchives.map(a => `
                <div class="doc-item" onclick="openMockDownload('${a.file}','${a.title}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">GED</div>
                    <div class="doc-info"><div class="doc-title">${a.title}</div><div class="doc-meta">${a.meta}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${a.file}','${a.title}')">${regLabels.consultLabel || ''}</button>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function regCreateContent() {
            const id = 'gc' + Math.random().toString(16).slice(2, 8);
            regGestionItems = [{ id, title: regLabels.newContentTitle || '', type: regLabels.newContentType || '', status: regLabels.draftStatus || '' }, ...regGestionItems];
            regHistory = [{ id: 'h' + Date.now(), kind: 'create', text: `${regLabels.createdPrefix || ''} ${regLabels.newContentTitle || ''}`, date: regLabels.todayLabel || '' }, ...regHistory];
            renderRegGestion();
        }
        function regSetStatus(id, status) {
            regGestionItems = regGestionItems.map(it => it.id === id ? { ...it, status } : it);
            regHistory = [{ id: 'h' + Date.now(), kind: status === (regLabels.publishedStatus || '') ? 'validate' : 'update', text: `${regLabels.statusPrefix || ''} ${status} – ${regGestionItems.find(x => x.id === id)?.title || regLabels.contentFallback || ''}`, date: regLabels.todayLabel || '' }, ...regHistory];
            renderRegGestion();
        }
        function renderRegGestion() {
            const body = document.getElementById('regGestionTable');
            if (!body) return;
            body.innerHTML = regGestionItems.map(it => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                    <td style="padding:12px 16px;color:#0f172a;font-weight:700;">${it.title}</td>
                    <td style="padding:12px 16px;color:var(--text-light);">${it.type}</td>
                    <td style="padding:12px 16px;color:var(--text-light);">${it.status}</td>
                    <td style="padding:12px 16px;text-align:right;">
                        <button class="actu-filter-btn" onclick="regSetStatus('${it.id}','${regLabels.validationStatus || ''}')">${regLabels.submitLabel || ''}</button>
                        <button class="actu-filter-btn" onclick="regSetStatus('${it.id}','${regLabels.publishedStatus || ''}')">${regLabels.publishLabel || ''}</button>
                    </td>
                </tr>
            `).join('');
        }

        function regValidate(id, approved) {
            const item = regWorkflowQueue.find(x => x.id === id);
            regWorkflowQueue = regWorkflowQueue.filter(x => x.id !== id);
            regHistory = [{ id: 'h' + Date.now(), kind: 'validate', text: `${approved ? (regLabels.validationPrefix || '') : (regLabels.rejectionPrefix || '')}: ${item?.title || regLabels.contentFallback || ''}`, date: regLabels.todayLabel || '' }, ...regHistory];
            renderRegWorkflow();
        }
        function renderRegWorkflow() {
            const root = document.getElementById('regWorkflowQueue');
            if (!root) return;
            root.innerHTML = regWorkflowQueue.map(it => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#ecfdf5;color:#059669;font-weight:900;">WF</div>
                    <div class="doc-info"><div class="doc-title">${it.title}</div><div class="doc-meta">${it.owner} • ${it.date}</div></div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <button class="actu-filter-btn" onclick="regValidate('${it.id}', false)">${regLabels.rejectLabel || ''}</button>
                        <button class="primary-btn" style="padding:8px 12px;" onclick="regValidate('${it.id}', true)">${regLabels.validateLabel || ''}</button>
                    </div>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">${regLabels.noPending || ''}</div>`;
            lucide.createIcons();
        }

        function setRegHistoryFilter(kind, el) {
            regHistoryFilter = kind;
            document.querySelectorAll('#page-reg-historique .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderRegHistory();
        }
        function renderRegHistory() {
            const root = document.getElementById('regHistoryList');
            if (!root) return;
            const items = regHistory.filter(h => regHistoryFilter === 'all' || h.kind === regHistoryFilter);
            root.innerHTML = items.map(h => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#f8fafc;color:#475569;font-weight:900;">LOG</div>
                    <div class="doc-info"><div class="doc-title">${h.text}</div><div class="doc-meta">${h.date}</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function setRegArchiveMode(mode, el) {
            regArchiveMode = mode;
            document.querySelectorAll('#page-reg-archives .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderRegArchives();
        }
        function renderRegArchives() {
            const root = document.getElementById('regArchivesList');
            if (!root) return;
            const tag = (document.getElementById('regArchiveTag')?.value || '').toLowerCase().trim();
            const items = regArchiveDocs.filter(d => d.state === regArchiveMode && (!tag || d.tags.join(' ').toLowerCase().includes(tag)));
            root.innerHTML = items.map(d => `
                <div class="doc-item" onclick="openMockDownload('${d.file}','${d.title}')">
                    <div class="doc-icon" style="background:#fff1f2;color:#be123c;font-weight:900;">ARC</div>
                    <div class="doc-info">
                        <div class="doc-title">${d.title}</div>
                        <div class="doc-meta">
                            <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:800;background:${d.state === 'actifs' ? '#ecfdf5' : '#f1f5f9'};color:${d.state === 'actifs' ? '#047857' : '#64748b'};margin-right:6px;">${d.state === 'actifs' ? (regLabels.activeLabel || '') : (regLabels.archivedLabel || '')}</span>
                            ${regLabels.archiveTagsLabel || ''}: ${d.tags.join(', ')}
                        </div>
                    </div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${d.file}','${d.title}')">${regLabels.consultLabel || ''}</button>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">${regLabels.noDocument || ''}</div>`;
            lucide.createIcons();
        }

        // ===== ESPACES MÉTIERS (table conforme, via sidebar -> sous-rubriques) =====
        const metiersPages = ['domaines','referentiels','livrables','si','thematiques','mediatheque'];

        const metiersSectionConfig = getCmrData('metiersSectionConfig', {});

        let metiersSection = 'structuration-metier';
        let metiersSub = 'domaines';
        let metiersRefType = 'all';

        const metiersPagesConfig = getCmrData('metiersPages', {});
        const metiersDomains = getCmrData('metiersDomains', []);
        const metiersReferentiels = getCmrData('metiersReferentiels', []);
        const metiersLivrables = getCmrData('metiersLivrables', []);
        const metiersSiSystems = getCmrData('metiersSiSystems', []);
        const metiersThemes = getCmrData('metiersThemes', []);
        const metiersMedia = getCmrData('metiersMedia', []);

        function switchMetiersSection(sectionId) {
            metiersSection = sectionId;
            const config = metiersSectionConfig[sectionId];
            const subNav = document.getElementById('metiersSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchMetiersSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchMetiersSub(config?.defaultSub || config?.subs?.[0]?.id || 'domaines');
            lucide.createIcons();
        }

        function switchMetiersSub(subId) {
            metiersSub = subId;
            const subNav = document.getElementById('metiersSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchMetiersSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }

            metiersPages.forEach(p => {
                const el = document.getElementById('page-metiers-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-metiers-' + subId);
            if (target) target.style.display = 'block';

            if (subId === 'domaines') renderMetiersDomains();
            if (subId === 'referentiels') renderMetiersReferentiels();
            if (subId === 'livrables') renderMetiersLivrables();
            if (subId === 'si') renderMetiersSi();
            if (subId === 'thematiques') renderMetiersThemes();
            if (subId === 'mediatheque') renderMetiersMedia();
            lucide.createIcons();
        }

        function renderMetiersDomains() {
            const grid = document.getElementById('metiersDomainesNav');
            const detail = document.getElementById('metiersDomainesDetail');
            if (!grid || !detail) return;
            grid.innerHTML = metiersDomains.map(d => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMetiersDomain('${d.id}')">
                    <div class="doc-icon-large" style="background:#eff6ff;color:#2563eb;"><i data-lucide="folder" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${d.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;line-height:1.6;">${d.desc}</p>
                    <div class="doc-card-meta"><span>Naviguer</span><i data-lucide="arrow-right" style="width:16px;color:#94a3b8;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
            // default detail
            if (metiersDomains[0]) openMetiersDomain(metiersDomains[0].id);
        }

        function openMetiersDomain(id) {
            const d = metiersDomains.find(x => x.id === id);
            const detail = document.getElementById('metiersDomainesDetail');
            if (!d || !detail) return;
            detail.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                    <div>
                        <div style="font-weight:900;color:#0f172a;">${d.title}</div>
                        <div style="margin-top:6px;">${d.desc}</div>
                    </div>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <button class="primary-btn" onclick="openMockDownload('Catalogue_${d.title}.pdf','Catalogue – ${d.title}')">Ouvrir l’espace</button>
                        <button class="secondary-btn" onclick="openMockDownload('Plan_${d.title}.pdf','Plan – ${d.title}')">Plan</button>
                    </div>
                </div>
                <div style="margin-top:12px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Docs</div>
                        <div style="margin-top:6px;font-size:20px;font-weight:900;color:#0f172a;">${Math.floor(20 + Math.random()*40)}</div>
                    </div>
                    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Référentiels</div>
                        <div style="margin-top:6px;font-size:20px;font-weight:900;color:#0f172a;">${Math.floor(5 + Math.random()*15)}</div>
                    </div>
                    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Médias</div>
                        <div style="margin-top:6px;font-size:20px;font-weight:900;color:#0f172a;">${Math.floor(3 + Math.random()*12)}</div>
                    </div>
                </div>
            `;
        }

        function setMetiersRefType(type, el) {
            metiersRefType = type;
            document.querySelectorAll('#page-metiers-referentiels .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderMetiersReferentiels();
        }

        function renderMetiersReferentiels() {
            const root = document.getElementById('metiersRefList');
            if (!root) return;
            const q = (document.getElementById('metiersRefSearch')?.value || '').toLowerCase().trim();
            const items = metiersReferentiels.filter(i => {
                const typeOk = metiersRefType === 'all' || i.type === metiersRefType;
                const qOk = !q || (i.title + ' ' + i.meta).toLowerCase().includes(q);
                return typeOk && qOk;
            });
            root.innerHTML = items.map(i => `
                <div class="doc-item" onclick="openMockDownload('${i.file}','${i.title}')">
                    <div class="doc-icon" style="background:#ecfdf5;color:#059669;font-weight:900;">${i.type.slice(0,3).toUpperCase()}</div>
                    <div class="doc-info"><div class="doc-title">${i.title}</div><div class="doc-meta">${i.meta}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${i.file}','${i.title}')">Consulter</button>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">Aucun résultat.</div>`;
            lucide.createIcons();
        }

        function renderMetiersLivrables() {
            const root = document.getElementById('metiersLivList');
            if (!root) return;
            const q = (document.getElementById('metiersLivSearch')?.value || '').toLowerCase().trim();
            const items = metiersLivrables.filter(l => !q || (l.title + ' ' + l.meta).toLowerCase().includes(q));
            root.innerHTML = items.map(l => `
                <div class="doc-item" onclick="openMockDownload('${l.file}','${l.title}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">DOC</div>
                    <div class="doc-info"><div class="doc-title">${l.title}</div><div class="doc-meta">${l.meta}</div></div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${l.file}','${l.title}')">Consulter</button>
                        <button class="primary-btn" style="padding:8px 12px;" onclick="event.stopPropagation(); openMockDownload('${l.file}','Téléchargement – ${l.title}')">Télécharger</button>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderMetiersSiWidget(force) {
            const root = document.getElementById('metiersSiWidget');
            if (!root) return;
            const now = new Date();
            const health = force ? (Math.random() > 0.2 ? 'OK' : 'Dégradé') : 'OK';
            root.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
                    <div style="font-size:12px;color:#94a3b8;">Dernier check</div>
                    <div style="font-size:12px;color:#94a3b8;">${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <div style="margin-top:8px;font-weight:900;color:${health === 'OK' ? '#16a34a' : '#f97316'};">${health}</div>
                <div style="margin-top:8px;font-size:12px;color:var(--text-light);line-height:1.6;">${metiersPagesConfig.si?.widgetDescription || ''}</div>
            `;
        }

        function renderMetiersSi() {
            renderMetiersSiWidget(false);
            const root = document.getElementById('metiersSiList');
            if (!root) return;
            root.innerHTML = metiersSiSystems.map(s => `
                <div class="doc-item" onclick="openMockDownload('${s.file}','${s.title}')">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">SI</div>
                    <div class="doc-info"><div class="doc-title">${s.title}</div><div class="doc-meta">${s.meta} • ${s.status}</div></div>
                    <button class="primary-btn" style="padding:8px 12px;" onclick="event.stopPropagation(); openMockDownload('${s.file}','Accéder – ${s.title}')">Accéder</button>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderMetiersThemes() {
            const grid = document.getElementById('metiersThemesGrid');
            if (!grid) return;
            const q = (document.getElementById('metiersThemeSearch')?.value || '').toLowerCase().trim();
            const items = metiersThemes.filter(t => !q || (t.title + ' ' + t.desc + ' ' + t.tag).toLowerCase().includes(q));
            grid.innerHTML = items.map(t => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('Theme_${t.title}.pdf','Thématique – ${t.title}')">
                    <div class="doc-icon-large" style="background:#f8fafc;color:#475569;"><i data-lucide="tag" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${t.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;line-height:1.6;">${t.desc}</p>
                    <div class="doc-card-meta"><span>Filtrer / naviguer</span><i data-lucide="arrow-right" style="width:16px;color:#94a3b8;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderMetiersMedia() {
            const grid = document.getElementById('metiersMediaGrid');
            if (!grid) return;
            const q = (document.getElementById('metiersMediaSearch')?.value || '').toLowerCase().trim();
            const items = metiersMedia.filter(m => !q || (m.title + ' ' + m.meta).toLowerCase().includes(q));
            grid.innerHTML = items.map(m => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                    <div style="height:110px;background:linear-gradient(135deg,#fdf4ff,#eff6ff);display:flex;align-items:center;justify-content:center;">
                        <i data-lucide="play-circle" style="width:28px;height:28px;color:#475569;"></i>
                    </div>
                    <div style="padding:12px;">
                        <div style="font-weight:900;color:#0f172a;font-size:13px;line-height:1.4;">${m.title}</div>
                        <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${m.meta}</div>
                        <div style="display:flex;justify-content:flex-end;margin-top:10px;">
                            <button class="actu-filter-btn" onclick="openMockDownload('${m.file}','${m.title}')">Consulter</button>
                        </div>
                    </div>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 2px;">Aucun média.</div>`;
            lucide.createIcons();
        }

        // ===== ESPACES COLLABORATIFS (table conforme, via sidebar -> sous-rubriques) =====
        const collabPages = ['forums','groupes','echanges','rex','animation','vieinterne'];
        const collabText = getCmrData('collabPages', {});
        const collabSectionConfig = getCmrData('collabSectionConfig', {});

        let collabSection = 'discussions';
        let collabSub = 'forums';

        let collabForumThreads = getCmrData('collabForumThreads', []);
        let collabActiveThreadId = null;

        let collabGroups = getCmrData('collabGroups', []);
        let collabJoinedGroups = new Set(['g2']);
        let collabActiveGroupId = null;
        let collabGroupThreads = getCmrData('collabGroupThreads', []);

        let collabPosts = getCmrData('collabPosts', []);
        let collabActivePostId = null;

        let collabRex = getCmrData('collabRex', []);
        let collabActiveRexId = null;

        let collabEvents = getCmrData('collabEvents', []);
        let collabActiveEventId = null;

        let collabCulturePosts = getCmrData('collabCulturePosts', []);
        const collabGallery = getCmrData('collabGallery', []);

        function switchCollabSection(sectionId) {
            collabSection = sectionId;
            const config = collabSectionConfig[sectionId];
            const subNav = document.getElementById('collabSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchCollabSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchCollabSub(config?.defaultSub || config?.subs?.[0]?.id || 'forums');
            lucide.createIcons();
        }

        function switchCollabSub(subId) {
            collabSub = subId;
            const subNav = document.getElementById('collabSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchCollabSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }

            collabPages.forEach(p => {
                const el = document.getElementById('page-collab-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-collab-' + subId);
            if (target) target.style.display = 'block';

            if (subId === 'forums') renderCollabForums();
            if (subId === 'groupes') renderCollabGroups();
            if (subId === 'echanges') renderCollabFeed();
            if (subId === 'rex') renderCollabRex();
            if (subId === 'animation') renderCollabEvents();
            if (subId === 'vieinterne') renderCollabCulture();
            lucide.createIcons();
        }

        function toggleForumComposer(open) {
            const card = document.getElementById('collabForumComposer');
            if (!card) return;
            card.style.display = open ? 'block' : 'none';
        }

        function renderCollabForums() {
            const root = document.getElementById('collabForumList');
            if (!root) return;
            const q = (document.getElementById('collabForumSearch')?.value || '').toLowerCase().trim();
            const items = collabForumThreads.filter(t => !q || (t.title + ' ' + t.body).toLowerCase().includes(q));
            if (!items.some(t => t.id === collabActiveThreadId)) {
                collabActiveThreadId = items[0]?.id || null;
            }
            root.innerHTML = items.map(t => `
                <div class="doc-item" onclick="openForumThread('${t.id}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">FOR</div>
                    <div class="doc-info"><div class="doc-title">${t.title}</div><div class="doc-meta">${t.author} • ${t.date} • ${t.replies.length} réponse(s)</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 18px 18px;">${collabText.forums?.emptyList || ''}</div>`;
            if (collabActiveThreadId) openForumThread(collabActiveThreadId);
            lucide.createIcons();
        }

        function openForumThread(id) {
            collabActiveThreadId = id;
            const t = collabForumThreads.find(x => x.id === id);
            const root = document.getElementById('collabForumDetail');
            if (!t || !root) return;
            root.innerHTML = `
                <div style="font-weight:900;color:#0f172a;">${t.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${t.author} • ${t.date}</div>
                <div style="margin-top:12px;color:#334155;line-height:1.7;font-size:13px;">${t.body}</div>
                <div style="margin-top:14px;font-weight:900;color:#0f172a;">${collabText.forums?.replyTitle || ''}</div>
                <div style="margin-top:8px;">
                    ${(t.replies.length ? t.replies.map(r => `
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:12px;margin-bottom:10px;">
                            <div style="font-size:12px;color:var(--text-light);">${r.author} • ${r.date}</div>
                            <div style="margin-top:6px;font-size:13px;color:#334155;line-height:1.6;">${r.text}</div>
                        </div>
                    `).join('') : `<div style="color:var(--text-light);font-size:13px;">${collabText.forums?.emptyReplies || ''}</div>`)}
                </div>
                <div style="margin-top:12px;display:flex;gap:10px;">
                    <input id="forumReplyText" class="actu-search-input" placeholder="${collabText.forums?.replyPlaceholder || ''}" style="height:40px;padding-left:14px;">
                    <button class="primary-btn" onclick="replyForumThread()">${collabText.forums?.replyLabel || ''}</button>
                </div>
            `;
        }

        function postForumThread() {
            const title = (document.getElementById('forumTitle')?.value || '').trim();
            const body = (document.getElementById('forumBody')?.value || '').trim();
            if (!title || !body) return;
            const id = 't' + Date.now();
            collabForumThreads = [{ id, title, author: 'Moi', date: 'Aujourd’hui', body, replies: [] }, ...collabForumThreads];
            document.getElementById('forumTitle').value = '';
            document.getElementById('forumBody').value = '';
            toggleForumComposer(false);
            renderCollabForums();
            openForumThread(id);
        }

        function replyForumThread() {
            const txt = (document.getElementById('forumReplyText')?.value || '').trim();
            if (!txt || !collabActiveThreadId) return;
            collabForumThreads = collabForumThreads.map(t => {
                if (t.id !== collabActiveThreadId) return t;
                return { ...t, replies: [...t.replies, { author: 'Moi', date: 'Aujourd’hui', text: txt }] };
            });
            document.getElementById('forumReplyText').value = '';
            openForumThread(collabActiveThreadId);
            renderCollabForums();
        }

        function renderCollabGroups() {
            const root = document.getElementById('collabGroupList');
            if (!root) return;
            const q = (document.getElementById('collabGroupSearch')?.value || '').toLowerCase().trim();
            const items = collabGroups.filter(g => !q || (g.name + ' ' + g.desc).toLowerCase().includes(q));
            if (!items.some(g => g.id === collabActiveGroupId)) {
                collabActiveGroupId = items[0]?.id || null;
            }
            root.innerHTML = items.map(g => `
                <div class="doc-item" onclick="openCollabGroup('${g.id}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">GRP</div>
                    <div class="doc-info"><div class="doc-title">${g.name}</div><div class="doc-meta">${g.members} membres • ${g.desc}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); toggleJoinGroup('${g.id}')">${collabJoinedGroups.has(g.id) ? (collabText.groupes?.leaveLabel || '') : (collabText.groupes?.joinLabel || '')}</button>
                </div>
            `).join('');
            if (collabActiveGroupId) openCollabGroup(collabActiveGroupId);
            lucide.createIcons();
        }

        function toggleJoinGroup(id) {
            if (collabJoinedGroups.has(id)) collabJoinedGroups.delete(id);
            else collabJoinedGroups.add(id);
            renderCollabGroups();
            renderCollabGroupDetail();
        }

        function openCollabGroup(id) {
            collabActiveGroupId = id;
            renderCollabGroupDetail();
        }

        function renderCollabGroupDetail() {
            const g = collabGroups.find(x => x.id === collabActiveGroupId);
            const detail = document.getElementById('collabGroupDetail');
            const threads = document.getElementById('collabGroupThreads');
            if (!g || !detail || !threads) return;
            detail.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                    <div>
                        <div style="font-weight:900;color:#0f172a;">${g.name}</div>
                        <div style="margin-top:6px;color:var(--text-light);font-size:13px;line-height:1.7;">${g.desc}</div>
                        <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${g.members} membres</div>
                    </div>
                    <div style="display:flex;gap:10px;">
                        <button class="primary-btn" onclick="toggleJoinGroup('${g.id}')">${collabJoinedGroups.has(g.id) ? (collabText.groupes?.exchangeLabel || '') : (collabText.groupes?.joinExchangeLabel || '')}</button>
                    </div>
                </div>
            `;
            const items = collabGroupThreads.filter(t => t.groupId === g.id);
            threads.innerHTML = items.map(t => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">MSG</div>
                    <div class="doc-info"><div class="doc-title">${t.title}</div><div class="doc-meta">${t.meta}</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;">${collabText.groupes?.emptyThreads || ''}</div>`;
            lucide.createIcons();
        }

        function toggleCollabPostForm(open) {
            const form = document.getElementById('collabPostForm');
            if (!form) return;
            form.style.display = open ? 'block' : 'none';
        }

        function renderCollabFeed() {
            const root = document.getElementById('collabFeed');
            if (!root) return;
            if (!collabPosts.some(p => p.id === collabActivePostId)) {
                collabActivePostId = collabPosts[0]?.id || null;
            }
            root.innerHTML = collabPosts.map(p => `
                <div class="doc-item" onclick="openCollabPost('${p.id}')">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">PUB</div>
                    <div class="doc-info"><div class="doc-title">${p.author}</div><div class="doc-meta">${p.date} • ${p.comments.length} commentaire(s)</div><div style="margin-top:6px;color:#334155;font-size:13px;line-height:1.6;">${p.text}</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            if (collabActivePostId) openCollabPost(collabActivePostId);
            lucide.createIcons();
        }

        function publishCollabPost() {
            const txt = (document.getElementById('collabPostText')?.value || '').trim();
            if (!txt) return;
            const id = 'p' + Date.now();
            collabPosts = [{ id, author: 'Moi', date: 'Aujourd’hui', text: txt, comments: [] }, ...collabPosts];
            document.getElementById('collabPostText').value = '';
            toggleCollabPostForm(false);
            renderCollabFeed();
            openCollabPost(id);
        }

        function openCollabPost(id) {
            collabActivePostId = id;
            const p = collabPosts.find(x => x.id === id);
            const detail = document.getElementById('collabFeedDetail');
            if (!p || !detail) return;
            detail.innerHTML = `
                <div style="font-weight:900;color:#0f172a;">${p.author}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${p.date}</div>
                <div style="margin-top:12px;color:#334155;line-height:1.7;font-size:13px;">${p.text}</div>
            `;
            renderCollabComments();
        }

        function renderCollabComments() {
            const p = collabPosts.find(x => x.id === collabActivePostId);
            const root = document.getElementById('collabCommentsList');
            if (!p || !root) return;
            root.innerHTML = p.comments.map(c => `
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:12px;margin-bottom:10px;">
                    <div style="font-size:12px;color:var(--text-light);">${c.author} • ${c.date}</div>
                    <div style="margin-top:6px;font-size:13px;color:#334155;line-height:1.6;">${c.text}</div>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;">${collabText.echanges?.emptyComments || ''}</div>`;
        }

        function addCollabComment() {
            const txt = (document.getElementById('collabCommentText')?.value || '').trim();
            if (!txt || !collabActivePostId) return;
            collabPosts = collabPosts.map(p => {
                if (p.id !== collabActivePostId) return p;
                return { ...p, comments: [...p.comments, { author: 'Moi', date: 'Aujourd’hui', text: txt }] };
            });
            document.getElementById('collabCommentText').value = '';
            renderCollabFeed();
            openCollabPost(collabActivePostId);
        }

        function renderCollabRex() {
            const root = document.getElementById('collabRexList');
            if (!root) return;
            const q = (document.getElementById('collabRexSearch')?.value || '').toLowerCase().trim();
            const items = collabRex.filter(r => !q || (r.title + ' ' + r.body).toLowerCase().includes(q));
            if (!items.some(r => r.id === collabActiveRexId)) {
                collabActiveRexId = items[0]?.id || null;
            }
            root.innerHTML = items.map(r => `
                <div class="doc-item" onclick="openCollabRex('${r.id}')">
                    <div class="doc-icon" style="background:#ecfdf5;color:#059669;font-weight:900;">REX</div>
                    <div class="doc-info"><div class="doc-title">${r.title}</div><div class="doc-meta">${r.date}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${r.file}','${r.title}')">${collabText.rex?.consultLabel || ''}</button>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;padding:6px 18px 18px;">${collabText.rex?.emptyList || ''}</div>`;
            if (collabActiveRexId) openCollabRex(collabActiveRexId);
            lucide.createIcons();
        }

        function openCollabRex(id) {
            collabActiveRexId = id;
            const r = collabRex.find(x => x.id === id);
            const root = document.getElementById('collabRexDetail');
            if (!r || !root) return;
            root.innerHTML = `
                <div style="font-weight:900;color:#0f172a;">${r.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${r.date}</div>
                <div style="margin-top:12px;color:#334155;line-height:1.7;font-size:13px;">${r.body}</div>
                <div style="margin-top:12px;display:flex;justify-content:flex-end;">
                    <button class="primary-btn" onclick="openMockDownload('${r.file}','${r.title}')">${collabText.rex?.consultLabel || ''}</button>
                </div>
            `;
        }

        function renderCollabEvents() {
            const root = document.getElementById('collabEvents');
            if (!root) return;
            if (!collabEvents.some(e => e.id === collabActiveEventId)) {
                collabActiveEventId = collabEvents[0]?.id || null;
            }
            root.innerHTML = collabEvents.map(e => `
                <div class="doc-item" onclick="openCollabEvent('${e.id}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">EVT</div>
                    <div class="doc-info"><div class="doc-title">${e.title}</div><div class="doc-meta">${e.date} • ${e.participants} participants</div><div style="margin-top:6px;color:#334155;font-size:13px;line-height:1.6;">${e.desc}</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            if (collabActiveEventId) openCollabEvent(collabActiveEventId);
            lucide.createIcons();
        }

        function createCollabEvent() {
            const title = (document.getElementById('collabEventTitle')?.value || '').trim();
            const date = (document.getElementById('collabEventDate')?.value || '').trim();
            const desc = (document.getElementById('collabEventDesc')?.value || '').trim();
            if (!title || !date || !desc) return;
            const id = 'e' + Date.now();
            collabEvents = [{ id, title, date, desc, participants: 0 }, ...collabEvents];
            document.getElementById('collabEventTitle').value = '';
            document.getElementById('collabEventDate').value = '';
            document.getElementById('collabEventDesc').value = '';
            renderCollabEvents();
            openCollabEvent(id);
        }

        function openCollabEvent(id) {
            collabActiveEventId = id;
            const e = collabEvents.find(x => x.id === id);
            const root = document.getElementById('collabEventDetail');
            if (!e || !root) return;
            root.innerHTML = `
                <div style="font-weight:900;color:#0f172a;">${e.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${e.date} • ${e.participants} participants</div>
                <div style="margin-top:10px;color:#334155;font-size:13px;line-height:1.7;">${e.desc}</div>
            `;
        }

        function joinCollabEvent() {
            if (!collabActiveEventId) return;
            collabEvents = collabEvents.map(e => e.id === collabActiveEventId ? { ...e, participants: e.participants + 1 } : e);
            renderCollabEvents();
            openCollabEvent(collabActiveEventId);
        }

        function toggleCultureComposer(open) {
            const card = document.getElementById('cultureComposer');
            if (!card) return;
            card.style.display = open ? 'block' : 'none';
        }

        function publishCulturePost() {
            const title = (document.getElementById('cultureTitle')?.value || '').trim();
            const body = (document.getElementById('cultureBody')?.value || '').trim();
            if (!title || !body) return;
            const id = 'c' + Date.now();
            collabCulturePosts = [{ id, title, body, date: 'Aujourd’hui' }, ...collabCulturePosts];
            document.getElementById('cultureTitle').value = '';
            document.getElementById('cultureBody').value = '';
            toggleCultureComposer(false);
            renderCollabCulture();
        }

        function renderCollabCulture() {
            const feed = document.getElementById('collabCultureFeed');
            const gal = document.getElementById('collabCultureGallery');
            if (!feed || !gal) return;
            feed.innerHTML = collabCulturePosts.map(p => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#fce7f3;color:#db2777;font-weight:900;">VIE</div>
                    <div class="doc-info"><div class="doc-title">${p.title}</div><div class="doc-meta">${p.date}</div><div style="margin-top:6px;color:#334155;font-size:13px;line-height:1.6;">${p.body}</div></div>
                    <button class="actu-filter-btn" onclick="openMockDownload('Culture_${p.title.replace(/\\s+/g,'_')}.pdf','${p.title}')">${collabText.vieinterne?.consultLabel || ''}</button>
                </div>
            `).join('');
            gal.innerHTML = collabGallery.map(i => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                    <div style="height:92px;background:linear-gradient(135deg,#eff6ff,#fff7ed);display:flex;align-items:center;justify-content:center;">
                        <i data-lucide="image" style="width:22px;height:22px;color:#475569;"></i>
                    </div>
                    <div style="padding:10px;">
                        <div style="font-weight:900;color:#0f172a;font-size:12px;line-height:1.4;">${i.title}</div>
                        <div style="display:flex;justify-content:flex-end;margin-top:8px;">
                            <button class="actu-filter-btn" onclick="openMockDownload('${i.file}','${i.title}')">${collabText.vieinterne?.consultLabel || ''}</button>
                        </div>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // ===== MÉDIATHÈQUE (table conforme, via sidebar -> sous-rubriques) =====
        const mediaPages = ['home','images','videos','categories','consultation','telechargement','integration'];

        const mediaSectionConfig = getCmrData('mediaSectionConfig', {});

        let mediaSection = 'acces';
        let mediaSub = 'home';
        let mediaCategory = 'all';
        let mediaActiveVideoId = null;
        let mediaActiveConsultId = null;

        const mediaLabels = getCmrData('mediaLabels', {});
        const mediaImages = getCmrData('mediaImages', []);
        const mediaVideos = getCmrData('mediaVideos', []);

        function switchMediaSection(sectionId) {
            mediaSection = sectionId;
            const config = mediaSectionConfig[sectionId];
            const subNav = document.getElementById('mediaSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchMediaSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchMediaSub(config?.defaultSub || config?.subs?.[0]?.id || 'home');
            lucide.createIcons();
        }

        function switchMediaSub(subId) {
            mediaSub = subId;
            const subNav = document.getElementById('mediaSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchMediaSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }

            mediaPages.forEach(p => {
                const el = document.getElementById('page-media-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-media-' + subId);
            if (target) target.style.display = 'block';

            if (subId === 'home') renderMediaHome();
            if (subId === 'images') renderMediaImages();
            if (subId === 'videos') renderMediaVideos();
            if (subId === 'categories') renderMediaCategories();
            if (subId === 'consultation') renderMediaConsultation();
            if (subId === 'telechargement') renderMediaDownloads();
            if (subId === 'integration') renderMediaIntegration();
            lucide.createIcons();
        }

        function renderMediaHome() {
            rotateMediaCarousel(true);
            renderMediaSearch();
        }

        function rotateMediaCarousel(initial) {
            const root = document.getElementById('mediaCarousel');
            if (!root) return;
            const pool = [...mediaImages.slice(0, 2), ...mediaVideos.slice(0, 1)];
            const shuffled = pool.sort(() => Math.random() - 0.5);
            root.innerHTML = shuffled.map(it => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;cursor:pointer;" onclick="openMockDownload('${it.file}','${it.title}')">
                    <div style="height:90px;background:linear-gradient(135deg,#eff6ff,#fdf4ff);display:flex;align-items:center;justify-content:center;">
                        <i data-lucide="${it.id?.startsWith('vid') ? 'video' : 'image'}" style="width:22px;height:22px;color:#475569;"></i>
                    </div>
                    <div style="padding:10px;">
                        <div style="font-weight:900;color:#0f172a;font-size:12px;line-height:1.4;">${it.title}</div>
                        <div style="margin-top:6px;color:var(--text-light);font-size:11px;">${it.category} • ${it.date}</div>
                    </div>
                </div>
            `).join('');
            if (!initial) lucide.createIcons();
        }

        function renderMediaSearch() {
            const root = document.getElementById('mediaSearchPreview');
            if (!root) return;
            const q = (document.getElementById('mediaGlobalSearch')?.value || '').toLowerCase().trim();
            if (!q) {
                root.innerHTML = `<div style="color:var(--text-light);font-size:13px;">${mediaLabels.searchPrompt || ''}</div>`;
                return;
            }
            const pool = [
                ...mediaImages.map(i => ({ kind: mediaLabels.kindImage || '', ...i })),
                ...mediaVideos.map(v => ({ kind: mediaLabels.kindVideo || '', ...v }))
            ].filter(it => (it.title + ' ' + it.category).toLowerCase().includes(q));
            root.innerHTML = pool.slice(0, 6).map(it => `
                <div class="doc-item" onclick="openMockDownload('${it.file}','${it.title}')">
                    <div class="doc-icon" style="background:#f8fafc;color:#475569;font-weight:900;">${it.kind.slice(0,3).toUpperCase()}</div>
                    <div class="doc-info"><div class="doc-title">${it.title}</div><div class="doc-meta">${it.kind} • ${it.category} • ${it.date}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${it.file}','${it.title}')">${mediaLabels.openLabel || ''}</button>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;">${mediaLabels.emptyResult || ''}</div>`;
            lucide.createIcons();
        }

        function renderMediaImages() {
            const grid = document.getElementById('mediaImagesGrid');
            if (!grid) return;
            const q = (document.getElementById('mediaImgSearch')?.value || '').toLowerCase().trim();
            const items = mediaImages.filter(i => !q || (i.title + ' ' + i.category).toLowerCase().includes(q));
            grid.innerHTML = items.map(i => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                    <div style="height:96px;background:linear-gradient(135deg,#fce7f3,#eff6ff);display:flex;align-items:center;justify-content:center;">
                        <i data-lucide="image" style="width:22px;height:22px;color:#475569;"></i>
                    </div>
                    <div style="padding:10px;">
                        <div style="font-weight:900;color:#0f172a;font-size:12px;line-height:1.4;">${i.title}</div>
                        <div style="margin-top:6px;color:var(--text-light);font-size:11px;">${i.category} • ${i.date}</div>
                        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;">
                            <button class="actu-filter-btn" onclick="openMockDownload('${i.file}','${i.title}')">${mediaLabels.consultLabel || ''}</button>
                            <button class="primary-btn" style="padding:8px 12px;" onclick="openMockDownload('${i.file}','${mediaLabels.downloadPrefix || ''} ${i.title}')">${mediaLabels.downloadLabel || ''}</button>
                        </div>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderMediaVideos() {
            const root = document.getElementById('mediaVideosList');
            if (!root) return;
            const q = (document.getElementById('mediaVidSearch')?.value || '').toLowerCase().trim();
            const items = mediaVideos.filter(v => !q || (v.title + ' ' + v.desc + ' ' + v.category).toLowerCase().includes(q));
            root.innerHTML = items.map(v => `
                <div class="doc-item" onclick="openMediaVideo('${v.id}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">VID</div>
                    <div class="doc-info"><div class="doc-title">${v.title}</div><div class="doc-meta">${v.category} • ${v.date}</div></div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <button class="actu-filter-btn" onclick="event.stopPropagation(); openMediaVideo('${v.id}')">${mediaLabels.readLabel || ''}</button>
                        <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('${v.file}','${v.title}')">${mediaLabels.consultLabel || ''}</button>
                    </div>
                </div>
            `).join('');
            if (!mediaActiveVideoId && items[0]) openMediaVideo(items[0].id);
            lucide.createIcons();
        }

        function openMediaVideo(id) {
            mediaActiveVideoId = id;
            const v = mediaVideos.find(x => x.id === id);
            const root = document.getElementById('mediaVideoPlayer');
            if (!v || !root) return;
            root.innerHTML = `
                <div style="background:linear-gradient(135deg,#eff6ff,#fff7ed);border:1px solid #e2e8f0;border-radius:16px;height:180px;display:flex;align-items:center;justify-content:center;">
                    <i data-lucide="play" style="width:28px;height:28px;color:#475569;"></i>
                </div>
                <div style="margin-top:12px;font-weight:900;color:#0f172a;">${v.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${v.category} • ${v.date}</div>
                <div style="margin-top:10px;color:#334155;font-size:13px;line-height:1.7;">${v.desc}</div>
                <div style="margin-top:12px;display:flex;justify-content:flex-end;gap:10px;">
                    <button class="actu-filter-btn" onclick="openMockDownload('${v.file}','${v.title}')">${mediaLabels.consultLabel || ''}</button>
                </div>
            `;
            lucide.createIcons();
        }

        function setMediaCategory(cat, el) {
            mediaCategory = cat;
            document.querySelectorAll('#page-media-categories .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderMediaCategories();
        }

        function renderMediaCategories() {
            const grid = document.getElementById('mediaCategoriesGrid');
            if (!grid) return;
            const pool = [
                ...mediaImages.map(i => ({ kind: 'image', ...i })),
                ...mediaVideos.map(v => ({ kind: 'video', ...v }))
            ].filter(it => mediaCategory === 'all' || it.category === mediaCategory);
            grid.innerHTML = pool.map(it => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${it.file}','${it.title}')">
                    <div class="doc-icon-large" style="background:#f8fafc;color:#475569;"><i data-lucide="${it.kind === 'video' ? 'video' : 'image'}" style="width:24px;height:24px;"></i></div>
                    <div class="doc-card-title">${it.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;line-height:1.6;">${it.category} • ${it.date}</p>
                    <div class="doc-card-meta"><span>${mediaLabels.filterLabel || ''}</span><i data-lucide="arrow-right" style="width:16px;color:#94a3b8;"></i></div>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;">${mediaLabels.emptyContent || ''}</div>`;
            lucide.createIcons();
        }

        function renderMediaConsultation() {
            const list = document.getElementById('mediaConsultList');
            const detail = document.getElementById('mediaConsultDetail');
            if (!list || !detail) return;
            const pool = [
                ...mediaImages.map(i => ({ kind: mediaLabels.kindImage || '', ...i })),
                ...mediaVideos.map(v => ({ kind: mediaLabels.kindVideo || '', ...v }))
            ];
            list.innerHTML = pool.map(it => `
                <div class="doc-item" onclick="openMediaConsult('${it.id}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">${it.kind.slice(0,3).toUpperCase()}</div>
                    <div class="doc-info"><div class="doc-title">${it.title}</div><div class="doc-meta">${it.kind} • ${it.category} • ${it.date}</div></div>
                    <button class="actu-filter-btn" onclick="event.stopPropagation(); openMediaConsult('${it.id}')">${mediaLabels.consultLabel || ''}</button>
                </div>
            `).join('');
            if (!mediaActiveConsultId && pool[0]) openMediaConsult(pool[0].id);
        }

        function openMediaConsult(id) {
            mediaActiveConsultId = id;
            const it = mediaImages.find(x => x.id === id) || mediaVideos.find(x => x.id === id);
            const kind = id.startsWith('vid') ? mediaLabels.kindVideo || '' : mediaLabels.kindImage || '';
            const detail = document.getElementById('mediaConsultDetail');
            if (!it || !detail) return;
            detail.innerHTML = `
                <div style="font-weight:900;color:#0f172a;">${it.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${kind} • ${it.category} • ${it.date}</div>
                <div style="margin-top:12px;background:linear-gradient(135deg,#eff6ff,#fdf4ff);border:1px solid #e2e8f0;border-radius:16px;height:160px;display:flex;align-items:center;justify-content:center;">
                    <i data-lucide="${kind === 'Vidéo' ? 'video' : 'image'}" style="width:26px;height:26px;color:#475569;"></i>
                </div>
                <div style="margin-top:12px;display:flex;justify-content:flex-end;">
                    <button class="primary-btn" onclick="openMockDownload('${it.file}','${it.title}')">${mediaLabels.consultLabel || ''}</button>
                </div>
            `;
            lucide.createIcons();
        }

        function renderMediaDownloads() {
            const root = document.getElementById('mediaDownloadList');
            if (!root) return;
            const pool = [...mediaImages, ...mediaVideos].slice(0, 6);
            root.innerHTML = pool.map(it => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">DL</div>
                    <div class="doc-info"><div class="doc-title">${it.title}</div><div class="doc-meta">${it.category} • ${it.date}</div></div>
                    <button class="primary-btn" style="padding:8px 12px;" onclick="openMockDownload('${it.file}','${mediaLabels.downloadPrefix || ''} ${it.title}')">${mediaLabels.downloadLabel || ''}</button>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderMediaIntegration() {
            // content is static; ensure icons are refreshed
            lucide.createIcons();
        }

        // ===== ADMINISTRATION & PILOTAGE (table conforme, via sidebar -> sous-rubriques) =====
        const adminPages = ['comptes','roles','acces','usage','reporting','cms','securite','tracabilite','performance'];

        const adminSectionConfig = {
            utilisateurs: { subs: [{ id: 'comptes', label: 'Gestion comptes' }], defaultSub: 'comptes' },
            habilitations: { subs: [{ id: 'roles', label: 'Rôles' }], defaultSub: 'roles' },
            acces: { subs: [{ id: 'acces', label: 'Droits d’accès' }], defaultSub: 'acces' },
            usage: { subs: [{ id: 'usage', label: 'Usage plateforme' }], defaultSub: 'usage' },
            reporting: { subs: [{ id: 'reporting', label: 'Reporting' }], defaultSub: 'reporting' },
            cms: { subs: [{ id: 'cms', label: 'CMS' }], defaultSub: 'cms' },
            securite: { subs: [{ id: 'securite', label: 'Accès restreint' }], defaultSub: 'securite' },
            tracabilite: { subs: [{ id: 'tracabilite', label: 'Journal des actions' }], defaultSub: 'tracabilite' },
            performance: { subs: [{ id: 'performance', label: 'Performance' }], defaultSub: 'performance' }
        };

        let adminSection = 'utilisateurs';
        let adminSub = 'comptes';
        let adminActiveUserId = null;
        let adminIsAuthenticated = false;
        let adminLogFilter = 'all';

        let adminUsers = getCmrData('adminUsers', [
            { id: 'u1', name: 'Admin 01', email: 'admin01@cmr.ma', profil: 'Administrateur', status: 'Actif' },
            { id: 'u2', name: 'Contributeur 03', email: 'cont03@cmr.ma', profil: 'Contributeur', status: 'Actif' },
            { id: 'u3', name: 'Utilisateur 12', email: 'user12@cmr.ma', profil: 'Utilisateur', status: 'Désactivé' }
        ]);

        const adminRoles = getCmrData('adminRoles', [
            { id: 'r_admin', name: 'Administrateur', desc: 'Tous droits (admin).' },
            { id: 'r_contrib', name: 'Contributeur', desc: 'Publier / modifier contenus.' },
            { id: 'r_user', name: 'Utilisateur', desc: 'Consulter.' }
        ]);

        let adminUserRoles = getCmrData('adminUserRoles', {
            u1: 'Administrateur',
            u2: 'Contributeur',
            u3: 'Utilisateur'
        });

        let adminAccess = getCmrData('adminAccess', [
            { userId: 'u1', scope: 'Administration', level: 'Accès' },
            { userId: 'u2', scope: 'KM', level: 'Accès' },
            { userId: 'u2', scope: 'Médiathèque', level: 'Restreint' }
        ]);

        let adminCmsItems = getCmrData('adminCmsItems', [
            { id: 'c1', title: 'Page – Accueil (bannière)', status: 'Publié', updated: 'Avr 2026' },
            { id: 'c2', title: 'Bloc – Communication interne', status: 'Brouillon', updated: 'Mars 2026' }
        ]);

        let adminLogs = getCmrData('adminLogs', [
            { id: 'l1', kind: 'access', text: 'Accès attribué: u2 → KM', date: 'Avr 2026' },
            { id: 'l2', kind: 'update', text: 'CMS modifié: Page – Accueil', date: 'Mars 2026' },
            { id: 'l3', kind: 'auth', text: 'Authentification admin (OK)', date: 'Fév 2026' }
        ]);

        function switchAdminSection(sectionId) {
            adminSection = sectionId;
            const config = adminSectionConfig[sectionId];
            const subNav = document.getElementById('adminSubNavbar');
            if (config && subNav) {
                subNav.innerHTML = config.subs.map((s, idx) => `
                    ${idx > 0 ? `<span style="color:#cbd5e1;font-weight:300;font-size:18px;line-height:1;align-self:center;flex-shrink:0;">|</span>` : ``}
                    <div class="km-nav-item" onclick="switchAdminSub('${s.id}')" style="white-space:nowrap; padding: 10px 14px;">${s.label}</div>
                `).join('');
                subNav.style.display = (config.subs.length <= 1) ? 'none' : 'flex';
            }
            switchAdminSub(config?.defaultSub || config?.subs?.[0]?.id || 'comptes');
            lucide.createIcons();
        }

        function switchAdminSub(subId) {
            adminSub = subId;
            const subNav = document.getElementById('adminSubNavbar');
            if (subNav) {
                subNav.querySelectorAll('.km-nav-item').forEach(el => el.classList.remove('active'));
                const targetNav = subNav.querySelector(`[onclick="switchAdminSub('${subId}')"]`);
                if (targetNav) targetNav.classList.add('active');
            }

            adminPages.forEach(p => {
                const el = document.getElementById('page-admin-' + p);
                if (el) el.style.display = 'none';
            });
            const target = document.getElementById('page-admin-' + subId);
            if (target) target.style.display = 'block';

            if (subId === 'comptes') { renderAdminUsers(); renderAdminUserSelectors(); }
            if (subId === 'roles') { renderAdminRoles(); renderAdminUserSelectors(); }
            if (subId === 'acces') { renderAdminAccess(); renderAdminUserSelectors(); }
            if (subId === 'usage') renderAdminUsage();
            if (subId === 'reporting') renderAdminReporting();
            if (subId === 'cms') renderAdminCms();
            if (subId === 'securite') renderAdminSecurity();
            if (subId === 'tracabilite') renderAdminLogs();
            if (subId === 'performance') renderAdminPerformance();
            lucide.createIcons();
        }

        function pushAdminLog(kind, text) {
            adminLogs = [{ id: 'l' + Date.now(), kind, text, date: 'Aujourd’hui' }, ...adminLogs];
        }

        function toggleAdminUserForm(open) {
            const card = document.getElementById('adminUserFormCard');
            if (!card) return;
            card.style.display = open ? 'block' : 'none';
        }

        function adminCreateUser() {
            const name = (document.getElementById('adminNewName')?.value || '').trim();
            const email = (document.getElementById('adminNewEmail')?.value || '').trim();
            const profil = (document.getElementById('adminNewProfil')?.value || 'Utilisateur').trim();
            if (!name || !email) return;
            const id = 'u' + Date.now();
            adminUsers = [{ id, name, email, profil, status: 'Actif' }, ...adminUsers];
            adminActiveUserId = id;
            adminUserRoles[id] = profil;
            pushAdminLog('create', `Compte créé: ${name}`);
            document.getElementById('adminNewName').value = '';
            document.getElementById('adminNewEmail').value = '';
            toggleAdminUserForm(false);
            renderAdminUsers();
            renderAdminUserSelectors();
            openAdminUser(id);
        }

        function setAdminUserStatus(id, status) {
            adminUsers = adminUsers.map(u => u.id === id ? { ...u, status } : u);
            pushAdminLog('update', `Compte ${status.toLowerCase()}: ${adminUsers.find(u => u.id === id)?.name || id}`);
            renderAdminUsers();
            renderAdminUserSelectors();
            if (adminActiveUserId === id) openAdminUser(id);
        }

        function openAdminUser(id) {
            adminActiveUserId = id;
            const u = adminUsers.find(x => x.id === id);
            const root = document.getElementById('adminUserDetail');
            if (!u || !root) return;
            const role = adminUserRoles[id] || u.profil;
            root.innerHTML = `
                <div style="font-weight:900;color:#0f172a;">${u.name}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${u.email}</div>
                <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Profil</div>
                        <div style="margin-top:6px;font-weight:900;color:#0f172a;">${role}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Statut</div>
                        <div style="margin-top:6px;font-weight:900;color:#0f172a;">${u.status}</div>
                    </div>
                </div>
                <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;">
                    <button class="actu-filter-btn" onclick="setAdminUserStatus('${u.id}','Actif')">Activer</button>
                    <button class="actu-filter-btn" onclick="setAdminUserStatus('${u.id}','Désactivé')">Désactiver</button>
                    <button class="primary-btn" onclick="openMockDownload('Profil_${u.name.replace(/\\s+/g,'_')}.pdf','Profil – ${u.name}')">Modifier</button>
                </div>
            `;
        }

        function renderAdminUsers() {
            const wrap = document.getElementById('adminUsersTableWrap');
            const detail = document.getElementById('adminUserDetail');
            if (!wrap) return;
            const q = (document.getElementById('adminUserSearch')?.value || '').toLowerCase().trim();
            const items = adminUsers.filter(u => !q || (u.name + ' ' + u.email + ' ' + u.profil).toLowerCase().includes(q));
            if (!items.some(u => u.id === adminActiveUserId)) {
                adminActiveUserId = items[0]?.id || null;
            }
            wrap.innerHTML = `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                    <table style="width:100%;border-collapse:collapse;font-size:13px;">
                        <thead>
                            <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Nom</th>
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Profil</th>
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Statut</th>
                                <th style="padding:12px 16px;text-align:right;font-weight:700;color:#475569;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(u => `
                                <tr style="border-bottom:1px solid #f1f5f9;cursor:pointer;" onclick="openAdminUser('${u.id}')">
                                    <td style="padding:12px 16px;color:#0f172a;font-weight:700;">${u.name}<div style="font-size:12px;color:var(--text-light);font-weight:400;margin-top:2px;">${u.email}</div></td>
                                    <td style="padding:12px 16px;color:var(--text-light);">${adminUserRoles[u.id] || u.profil}</td>
                                    <td style="padding:12px 16px;color:var(--text-light);">${u.status}</td>
                                    <td style="padding:12px 16px;text-align:right;">
                                        <button class="actu-filter-btn" onclick="event.stopPropagation(); openMockDownload('Edit_${u.id}.pdf','Modifier – ${u.name}')">Modifier</button>
                                        <button class="actu-filter-btn" onclick="event.stopPropagation(); setAdminUserStatus('${u.id}','Désactivé')">Désactiver</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            if (adminActiveUserId) {
                openAdminUser(adminActiveUserId);
            } else if (detail) {
                detail.innerHTML = 'Aucun utilisateur ne correspond à la recherche.';
            }
            lucide.createIcons();
        }

        function renderAdminUserSelectors() {
            const selUser1 = document.getElementById('adminRoleUser');
            const selUser2 = document.getElementById('adminAccessUser');
            if (selUser1) selUser1.innerHTML = adminUsers.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
            if (selUser2) selUser2.innerHTML = adminUsers.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
            const rolePick = document.getElementById('adminRolePick');
            if (rolePick) rolePick.innerHTML = adminRoles.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
            if (selUser1) selUser1.onchange = renderAdminRoleInfo;
            renderAdminRoleInfo();
        }

        function renderAdminRoles() {
            const root = document.getElementById('adminRolesList');
            if (!root) return;
            root.innerHTML = adminRoles.map(r => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">ROL</div>
                    <div class="doc-info"><div class="doc-title">${r.name}</div><div class="doc-meta">${r.desc}</div></div>
                    <button class="actu-filter-btn" onclick="openMockDownload('Role_${r.name}.pdf','Rôle – ${r.name}')">Détail</button>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderAdminRoleInfo() {
            const userId = document.getElementById('adminRoleUser')?.value;
            const root = document.getElementById('adminRoleInfo');
            if (!root || !userId) return;
            const u = adminUsers.find(x => x.id === userId);
            const role = adminUserRoles[userId] || u?.profil || '—';
            root.innerHTML = `Rôle actuel: <strong>${role}</strong>`;
        }

        function adminAssignRole() {
            const userId = document.getElementById('adminRoleUser')?.value;
            const role = document.getElementById('adminRolePick')?.value;
            if (!userId || !role) return;
            adminUserRoles[userId] = role;
            pushAdminLog('update', `Rôle attribué: ${adminUsers.find(u => u.id === userId)?.name || userId} → ${role}`);
            renderAdminUsers();
            renderAdminRoleInfo();
        }

        function adminRemoveRole() {
            const userId = document.getElementById('adminRoleUser')?.value;
            if (!userId) return;
            adminUserRoles[userId] = 'Utilisateur';
            pushAdminLog('update', `Rôle retiré: ${adminUsers.find(u => u.id === userId)?.name || userId}`);
            renderAdminUsers();
            renderAdminRoleInfo();
        }

        function adminGrantAccess() {
            const userId = document.getElementById('adminAccessUser')?.value;
            const scope = document.getElementById('adminAccessScope')?.value;
            if (!userId || !scope) return;
            adminAccess = adminAccess.filter(a => !(a.userId === userId && a.scope === scope));
            adminAccess = [{ userId, scope, level: 'Accès' }, ...adminAccess];
            pushAdminLog('access', `Accès attribué: ${adminUsers.find(u => u.id === userId)?.name || userId} → ${scope}`);
            renderAdminAccess();
        }

        function adminRestrictAccess() {
            const userId = document.getElementById('adminAccessUser')?.value;
            const scope = document.getElementById('adminAccessScope')?.value;
            if (!userId || !scope) return;
            adminAccess = adminAccess.filter(a => !(a.userId === userId && a.scope === scope));
            adminAccess = [{ userId, scope, level: 'Restreint' }, ...adminAccess];
            pushAdminLog('access', `Accès restreint: ${adminUsers.find(u => u.id === userId)?.name || userId} → ${scope}`);
            renderAdminAccess();
        }

        function renderAdminAccess() {
            const wrap = document.getElementById('adminAccessTableWrap');
            if (!wrap) return;
            wrap.innerHTML = `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                    <table style="width:100%;border-collapse:collapse;font-size:13px;">
                        <thead>
                            <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Utilisateur</th>
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Espace</th>
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Niveau</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${adminAccess.map(a => `
                                <tr style="border-bottom:1px solid #f1f5f9;">
                                    <td style="padding:12px 16px;color:#0f172a;font-weight:700;">${adminUsers.find(u => u.id === a.userId)?.name || a.userId}</td>
                                    <td style="padding:12px 16px;color:var(--text-light);">${a.scope}</td>
                                    <td style="padding:12px 16px;color:${a.level === 'Accès' ? '#16a34a' : '#f97316'};font-weight:800;">${a.level}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        function renderAdminUsage() {
            const root = document.getElementById('adminUsageDash');
            if (!root) return;
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#94a3b8;font-weight:900;">Visites</div><div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${Math.floor(800 + Math.random()*500)}</div></div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#94a3b8;font-weight:900;">Utilisateurs actifs</div><div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${Math.floor(120 + Math.random()*80)}</div></div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#94a3b8;font-weight:900;">Temps moyen</div><div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${(3 + Math.random()*3).toFixed(1)}m</div></div>
                </div>
                <div style="margin-top:12px;color:var(--text-light);font-size:12px;line-height:1.6;">KPI/data (maquette) — consulter.</div>
            `;
        }

        function renderAdminReporting() {
            const root = document.getElementById('adminReportingDash');
            if (!root) return;
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;">
                    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#1d4ed8;font-weight:900;">Docs publiés</div><div style="margin-top:6px;font-size:20px;font-weight:900;color:#0f172a;">${Math.floor(30 + Math.random()*40)}</div></div>
                    <div style="background:#ecfdf5;border:1px solid #bbf7d0;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#16a34a;font-weight:900;">Téléchargements</div><div style="margin-top:6px;font-size:20px;font-weight:900;color:#0f172a;">${Math.floor(200 + Math.random()*400)}</div></div>
                    <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#7c3aed;font-weight:900;">Tickets</div><div style="margin-top:6px;font-size:20px;font-weight:900;color:#0f172a;">${Math.floor(10 + Math.random()*40)}</div></div>
                    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#ea580c;font-weight:900;">Incidents</div><div style="margin-top:6px;font-size:20px;font-weight:900;color:#0f172a;">${Math.floor(1 + Math.random()*8)}</div></div>
                </div>
                <div style="margin-top:12px;display:flex;justify-content:flex-end;">
                    <button class="primary-btn" onclick="openMockDownload('Reporting_Admin.pdf','Reporting admin')">Analyser</button>
                </div>
            `;
        }

        function adminCreateCms() {
            const id = 'c' + Date.now();
            adminCmsItems = [{ id, title: 'Nouveau contenu (CMS)', status: 'Brouillon', updated: 'Aujourd’hui' }, ...adminCmsItems];
            pushAdminLog('create', 'CMS: nouveau contenu créé');
            renderAdminCms();
        }

        function adminCmsSetStatus(id, status) {
            adminCmsItems = adminCmsItems.map(c => c.id === id ? { ...c, status, updated: 'Aujourd’hui' } : c);
            pushAdminLog('update', `CMS: ${status} – ${adminCmsItems.find(c => c.id === id)?.title || id}`);
            renderAdminCms();
        }

        function renderAdminCms() {
            const wrap = document.getElementById('adminCmsTableWrap');
            if (!wrap) return;
            wrap.innerHTML = `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                    <table style="width:100%;border-collapse:collapse;font-size:13px;">
                        <thead>
                            <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Contenu</th>
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">Statut</th>
                                <th style="padding:12px 16px;text-align:left;font-weight:700;color:#475569;">MAJ</th>
                                <th style="padding:12px 16px;text-align:right;font-weight:700;color:#475569;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${adminCmsItems.map(c => `
                                <tr style="border-bottom:1px solid #f1f5f9;">
                                    <td style="padding:12px 16px;color:#0f172a;font-weight:700;">${c.title}</td>
                                    <td style="padding:12px 16px;color:var(--text-light);">${c.status}</td>
                                    <td style="padding:12px 16px;color:var(--text-light);">${c.updated}</td>
                                    <td style="padding:12px 16px;text-align:right;">
                                        <button class="actu-filter-btn" onclick="openMockDownload('Edit_${c.id}.pdf','Modifier – ${c.title}')">Modifier</button>
                                        <button class="actu-filter-btn" onclick="adminCmsSetStatus('${c.id}','Publié')">Publier</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        function adminAuthenticate() {
            const user = (document.getElementById('adminAuthUser')?.value || '').trim();
            const pass = (document.getElementById('adminAuthPass')?.value || '').trim();
            adminIsAuthenticated = Boolean(user && pass);
            pushAdminLog('auth', `Authentification admin (${adminIsAuthenticated ? 'OK' : 'KO'})`);
            renderAdminSecurity();
        }

        function renderAdminSecurity() {
            const state = document.getElementById('adminAuthState');
            const panel = document.getElementById('adminAccessControl');
            if (state) state.innerHTML = adminIsAuthenticated ? `<strong style="color:#16a34a;">Authentifié</strong>` : `<strong style="color:#f97316;">Non authentifié</strong>`;
            if (!panel) return;
            panel.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Accès restreints</div>
                        <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${adminIsAuthenticated ? 'Ouvert' : 'Fermé'}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Tentatives</div>
                        <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${Math.floor(1 + Math.random()*4)}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Règles</div>
                        <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">3</div>
                    </div>
                </div>
                <div style="margin-top:12px;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:12px;color:#9a3412;font-size:13px;line-height:1.7;">
                    ${adminIsAuthenticated ? 'Accès autorisé aux fonctionnalités d’administration.' : 'Veuillez vous authentifier pour accéder aux fonctions restreintes.'}
                </div>
            `;
        }

        function setAdminLogFilter(kind, el) {
            adminLogFilter = kind;
            document.querySelectorAll('#page-admin-tracabilite .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (el) el.classList.add('active');
            renderAdminLogs();
        }

        function renderAdminLogs() {
            const root = document.getElementById('adminLogList');
            if (!root) return;
            const items = adminLogs.filter(l => adminLogFilter === 'all' || l.kind === adminLogFilter);
            root.innerHTML = items.map(l => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#f8fafc;color:#475569;font-weight:900;">LOG</div>
                    <div class="doc-info"><div class="doc-title">${l.text}</div><div class="doc-meta">${l.date}</div></div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('') || `<div style="color:var(--text-light);font-size:13px;">Aucune entrée.</div>`;
            lucide.createIcons();
        }

        function renderAdminPerformance() {
            const root = document.getElementById('adminPerfDash');
            if (!root) return;
            root.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#94a3b8;font-weight:900;">Temps réponse</div><div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${Math.floor(120 + Math.random()*120)}ms</div></div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#94a3b8;font-weight:900;">Erreurs</div><div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${Math.floor(Math.random()*6)}</div></div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;"><div style="font-size:11px;color:#94a3b8;font-weight:900;">Disponibilité</div><div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${(99.1 + Math.random()*0.8).toFixed(2)}%</div></div>
                </div>
                <div style="margin-top:12px;display:flex;justify-content:flex-end;">
                    <button class="primary-btn" onclick="openMockDownload('Perf_Admin.pdf','Performance plateforme')">Analyser</button>
                </div>
            `;
        }
        // ===== KM DATA + RENDERS (table conforme) =====
        let kmRefActive = 'metiers';
        const kmReferentiels = getCmrData('kmReferentiels', [
            { id: 'metiers', label: 'Référentiels métiers', docs: [
                { file: 'Guide_Indicateurs_Retraite.pdf', label: 'Guide des indicateurs de retraite', type: 'Document' },
                { file: 'Guide_Instruction_Dossiers.pdf', label: 'Guide d’instruction des dossiers', type: 'Document' }
            ]},
            { id: 'systemes', label: 'Référentiels SI', docs: [
                { file: 'Guide_Espace_Collaborateur.pdf', label: 'Guide espace collaborateur (SI)', type: 'Document' },
                { file: 'Procédure_SSO.pdf', label: 'Procédure SSO & accès', type: 'Document' }
            ]}
        ]);

        const kmGlossaire = getCmrData('kmGlossaire', [
            { term: 'SFD', def: 'Spécifications Fonctionnelles Détaillées.' },
            { term: 'REX', def: 'Retour d’expérience (leçons apprises).' },
            { term: 'GED', def: 'Gestion Électronique des Documents.' },
            { term: 'AMOA', def: 'Assistance à Maîtrise d’Ouvrage.' }
        ]);

        let kmRexData = getCmrData('kmRexData', [
            { id: 'rx1', title: 'REX – Refonte intranet: adoption', theme: 'Projet', date: 'Avr 2026', body: 'Ce qui a fonctionné: démos courtes, sponsors métier. À améliorer: clarifier les owners dès le début.' },
            { id: 'rx2', title: 'REX – Processus tickets IT', theme: 'Processus', date: 'Mars 2026', body: 'Standardiser les catégories et définir un SLA visible dans GLPI.' }
        ]);
        let kmRexSelected = null;

        const kmElearning = getCmrData('kmElearning', [
            { title: 'Excel avancé (e‑learning)', meta: '2h30 • Niveau avancé', cta: 'Lancer' },
            { title: 'Cyber sécurité 101', meta: '35% • En cours', cta: 'Reprendre' },
            { title: 'Sensibilisation GED', meta: '20 min • Micro‑learning', cta: 'Démarrer' }
        ]);

        const kmPedagogieMetier = getCmrData('kmPedagogieMetier', [
            { title: 'Comprendre le parcours liquidation', meta: 'Page métier • Retraite', desc: 'Présentation synthétique des étapes et points de vigilance.', file: 'Pedagogie_Liquidation.pdf' },
            { title: 'Rôle du contrôle interne dans les régimes', meta: 'Article métier • Contrôle', desc: 'Repères pratiques pour les nouveaux arrivants et les relais métier.', file: 'Pedagogie_Controle_Interne.pdf' },
            { title: 'Cycle de traitement d’un dossier assuré', meta: 'Fiche métier • Processus', desc: 'Vue simple des acteurs, documents et validations.', file: 'Pedagogie_Dossier_Assure.pdf' }
        ]);

        const kmCommunautes = getCmrData('kmCommunautes', [
            { id: 'co1', name: 'Communauté BI & Data', members: 128, threads: 12 },
            { id: 'co2', name: 'Communauté RH', members: 87, threads: 6 },
            { id: 'co3', name: 'Communauté Qualité & Process', members: 54, threads: 4 }
        ]);
        const kmThreads = getCmrData('kmThreads', [
            { communityId: 'co1', title: 'Bonnes pratiques Power BI', meta: 'BI & Data • 2h', badge: 'Actif' },
            { communityId: 'co2', title: 'Mobilité interne – retours', meta: 'RH • hier', badge: 'Nouveau' },
            { communityId: 'co1', title: 'Convention de nommage datasets', meta: 'BI & Data • 3j', badge: 'En cours' }
        ]);

        const kmAmoa = getCmrData('kmAmoa', [
            { id: 'a1', title: 'AMOA – Refonte e‑Service', meta: 'Dossier • Digital', body: 'Ateliers, story mapping, backlog. Livrables: SFD, PV ateliers, plan de conduite du changement.' },
            { id: 'a2', title: 'Conduite du changement – GED', meta: 'Kit • Organisation', body: 'Plan de com, supports, formation, accompagnement des référents.' }
        ]);
        let kmAmoaSelected = null;

        let kmDocsActive = 'procedures';
        const kmDocs = getCmrData('kmDocs', [
            { id: 'procedures', label: 'Procédures', docs: [
                { file: 'Procedure_Traitement_Pension.pdf', label: 'Procédure traitement pension', type: 'Document' },
                { file: 'Procedure_Accueil_Usager.pdf', label: 'Procédure accueil usager', type: 'Document' }
            ]},
            { id: 'politiques', label: 'Politiques', docs: [
                { file: 'Politique_Securite_SI.pdf', label: 'Politique sécurité SI', type: 'Document' }
            ]}
        ]);

        let kmContribData = getCmrData('kmContribData', [
            { id: 'ct1', title: 'Astuce: réduire les doublons GED', date: 'Avr 2026', body: 'Utiliser la convention de nommage + métadonnées obligatoires.' },
            { id: 'ct2', title: 'Check‑list avant PV comité', date: 'Mars 2026', body: 'Ordre du jour, participants, décisions, actions, annexes.' }
        ]);
        let kmContribSelected = null;

        let kmCatalogueType = 'all';
        const kmCatalogueItems = getCmrData('kmCatalogueItems', [
            { type: 'Document', title: 'Guide des indicateurs de retraite', meta: 'Référentiels métiers' },
            { type: 'Article', title: 'Bilan – Digital Q1', meta: 'Articles / bilans' },
            { type: 'Forum', title: 'Bonnes pratiques Power BI', meta: 'Communautés' },
            { type: 'Media', title: 'Capsule vidéo – GED', meta: 'Supports pédagogiques' },
            { type: 'Article', title: 'Comprendre le parcours liquidation', meta: 'Pédagogie métier' },
            { type: 'Article', title: 'Story – Transformation du parcours assuré', meta: 'Sources stories' },
            { type: 'Document', title: 'Rubrique Audit & conformité', meta: 'KM Audit & Risque' },
            { type: 'Media', title: 'Capsule UX – Parcours e‑Service', meta: 'Capsules UX' },
            { type: 'Article', title: 'Régimes de retraite CMR', meta: 'Régimes & processus' }
        ]);

        const kmLivrables = getCmrData('kmLivrables', [
            { title: 'SFD – Refonte intranet', file: 'SFD_Refonte_Intranet_v1.pdf' },
            { title: 'PV ateliers – AMOA e‑Service', file: 'PV_Ateliers_eService.pdf' },
            { title: 'Plan de déploiement', file: 'Plan_Deploiement.pdf' }
        ]);

        const kmModeles = getCmrData('kmModeles', [
            { title: 'Modèle PV comité', file: 'Modele_PV_Comite.docx' },
            { title: 'Modèle note de service', file: 'Modele_Note_Service.docx' },
            { title: 'Formulaire expression de besoin', file: 'Formulaire_EDB.docx' }
        ]);

        const kmPublications = getCmrData('kmPublications', [
            { title: 'Bilan SI – Mars 2026', meta: 'Article • SI', file: 'Bilan_SI_Mars_2026.pdf' },
            { title: 'Bilan RH – T1 2026', meta: 'Article • RH', file: 'Bilan_RH_T1_2026.pdf' }
        ]);

        let kmGlpiTickets = getCmrData('kmGlpiTickets', [
            { id: 't1', title: 'Accès VPN', meta: 'Ouvert • P2' },
            { id: 't2', title: 'Incident impression', meta: 'En cours • P3' }
        ]);

        const kmSupports = getCmrData('kmSupports', [
            { title: 'Capsule vidéo – GED', meta: '3 min', file: 'Capsule_GED.mp4' },
            { title: 'Infographie – Sécurité SI', meta: 'PDF', file: 'Infographie_Securite.pdf' },
            { title: 'Guide – Bonnes pratiques KM', meta: 'PDF', file: 'Guide_Bonnes_Pratiques_KM.pdf' }
        ]);

        const kmStories = getCmrData('kmStories', [
            { title: 'Story – Transformation du parcours assuré', type: 'Article', meta: 'Communication transverse', file: 'Story_Parcours_Assure.pdf' },
            { title: 'Story – Refonte intranet en 5 étapes', type: 'Media', meta: 'Projet SI', file: 'Story_Refonte_Intranet.mp4' },
            { title: 'Story – Modernisation GED', type: 'Article', meta: 'KM transverse', file: 'Story_Modernisation_GED.pdf' }
        ]);

        let kmCampagnesSelected = 'cmp1';
        let kmCampagnes = getCmrData('kmCampagnes', [
            { id: 'cmp1', title: 'Collecte bonnes pratiques accueil', audience: 'Collaborateurs', type: 'Sondage', responses: 28, desc: 'Recueillir les bonnes pratiques terrain pour enrichir le référentiel accueil.' },
            { id: 'cmp2', title: 'Partage astuces GED', audience: 'Métiers', type: 'Formulaire', responses: 16, desc: 'Identifier les usages récurrents à capitaliser dans la GED et les conventions de nommage.' }
        ]);

        const kmAuditRisque = getCmrData('kmAuditRisque', [
            { title: 'Rubrique Audit & conformité', meta: 'Dossiers / articles', file: 'KM_Audit_Conformite.pdf' },
            { title: 'Bonnes pratiques gestion des risques', meta: 'Documentation métier', file: 'Bonnes_Pratiques_Risques.pdf' },
            { title: 'Synthèse conformité réglementaire', meta: 'Article de synthèse', file: 'Synthese_Conformite_Reglementaire.pdf' }
        ]);

        const kmCapsulesUx = getCmrData('kmCapsulesUx', [
            { title: 'Capsule UX – Parcours e‑Service', meta: 'Vidéo projet SI • 4 min', file: 'Capsule_UX_eService.mp4' },
            { title: 'Capsule UX – Onboarding intranet', meta: 'Vidéo projet SI • 3 min', file: 'Capsule_UX_Intranet.mp4' },
            { title: 'Capsule UX – Recherche GED', meta: 'Capsule usage • 2 min', file: 'Capsule_UX_GED.mp4' }
        ]);

        let kmRegimesProcessSelected = 'rp1';
        const kmRegimesProcessus = getCmrData('kmRegimesProcessus', [
            { id: 'rp1', title: 'Régimes de retraite CMR', meta: 'Page métier • onboarding', body: 'Présentation des principaux régimes, de leurs spécificités et des points d’attention pour les nouvelles recrues.', file: 'Regimes_Retraite_CMR.pdf' },
            { id: 'rp2', title: 'Processus de liquidation', meta: 'Infographie • processus', body: 'Vue simplifiée des étapes, contrôles et interactions métier nécessaires au traitement d’un dossier.', file: 'Processus_Liquidation_Infographie.pdf' },
            { id: 'rp3', title: 'Processus de révision / mise à jour', meta: 'Fiche métier • processus', body: 'Repères sur les opérations de mise à jour, pièces justificatives et contrôles associés.', file: 'Processus_Revision_MAJ.pdf' }
        ]);

        function renderKmReferentiels() {
            const folders = document.getElementById('kmRefFolders');
            const docs = document.getElementById('kmRefDocs');
            if (!folders || !docs) return;
            const q = (document.getElementById('kmRefSearch')?.value || '').trim().toLowerCase();
            folders.innerHTML = kmReferentiels.map(f => `
                <div class="doc-item" onclick="kmRefActive='${f.id}'; renderKmReferentiels();">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">REF</div>
                    <div class="doc-info">
                        <div class="doc-title">${f.label}</div>
                        <div class="doc-meta">${f.docs.length} documents</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const active = kmReferentiels.find(x => x.id === kmRefActive) || kmReferentiels[0];
            const items = (active?.docs || []).filter(d => !q || d.label.toLowerCase().includes(q) || d.file.toLowerCase().includes(q));
            docs.innerHTML = items.map(d => `
                <div class="doc-item" onclick="openMockDownload('${d.file}','${d.label}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">PDF</div>
                    <div class="doc-info">
                        <div class="doc-title">${d.label}</div>
                        <div class="doc-meta">${d.file}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmGlossaire() {
            const list = document.getElementById('kmGlossList');
            if (!list) return;
            const q = (document.getElementById('kmGlossSearch')?.value || '').trim().toLowerCase();
            const items = kmGlossaire.filter(x => !q || x.term.toLowerCase().includes(q) || x.def.toLowerCase().includes(q));
            list.innerHTML = items.map(x => `
                <div style="padding:12px 0;border-top:1px solid #f1f5f9;">
                    <div style="font-weight:900;color:#0f172a;">${x.term}</div>
                    <div style="margin-top:4px;color:var(--text-light);font-size:12px;line-height:1.6;">${x.def}</div>
                </div>
            `).join('') || `<div style="padding:14px 0;color:var(--text-light);font-size:12px;">Aucun terme.</div>`;
        }

        function renderKmRex() {
            const list = document.getElementById('kmRexList');
            const detail = document.getElementById('kmRexDetail');
            if (!list || !detail) return;
            const q = (document.getElementById('kmRexSearch')?.value || '').trim().toLowerCase();
            const items = kmRexData.filter(r => !q || r.title.toLowerCase().includes(q) || r.theme.toLowerCase().includes(q) || r.body.toLowerCase().includes(q));
            list.innerHTML = items.map(r => `
                <div class="doc-item" onclick="kmRexSelected='${r.id}'; renderKmRex();">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">REX</div>
                    <div class="doc-info">
                        <div class="doc-title">${r.title}</div>
                        <div class="doc-meta">${r.theme} • ${r.date}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('') || `<div style="padding:14px 16px;color:var(--text-light);font-size:12px;">Aucun REX.</div>`;
            const sel = kmRexData.find(x => x.id === kmRexSelected) || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${sel.theme} • ${sel.date}</div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
                <div style="color:#475569;font-size:13px;line-height:1.8;">${sel.body}</div>
            ` : `Sélectionnez un REX.`;
            lucide.createIcons();
        }

        function toggleKmRexForm(open) {
            const card = document.getElementById('kmRexFormCard');
            if (card) card.style.display = open ? 'block' : 'none';
        }

        function submitKmRex() {
            const title = (document.getElementById('kmRexTitle')?.value || '').trim();
            const theme = (document.getElementById('kmRexTheme')?.value || 'Projet').trim();
            const desc = (document.getElementById('kmRexDesc')?.value || '').trim();
            if (!title || !desc) return;
            const id = 'rx' + Math.random().toString(16).slice(2);
            kmRexData = [{ id, title, theme, date: 'Aujourd’hui', body: desc }, ...kmRexData];
            document.getElementById('kmRexTitle').value = '';
            document.getElementById('kmRexDesc').value = '';
            toggleKmRexForm(false);
            renderKmRex();
        }

        function renderKmElearning() {
            const grid = document.getElementById('kmElearningGrid');
            if (!grid) return;
            grid.innerHTML = kmElearning.map(c => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('Module_${c.title.replace(/\\s+/g,'_')}.pdf','${c.title}')">
                    <div class="doc-icon-large" style="background:#eff6ff;color:#2563eb;">
                        <i data-lucide="play-circle" style="width: 24px; height: 24px;"></i>
                    </div>
                    <div class="doc-card-title">${c.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${c.meta}</p>
                    <div class="doc-card-meta"><span style="color:#2563eb;font-weight:800;">${c.cta}</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmPedagogie() {
            const grid = document.getElementById('kmPedagogieGrid');
            if (!grid) return;
            grid.innerHTML = kmPedagogieMetier.map(p => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${p.file}','${p.title}')">
                    <div class="doc-icon-large" style="background:#f5f3ff;color:#7c3aed;">
                        <i data-lucide="book-open" style="width:24px;height:24px;"></i>
                    </div>
                    <div class="doc-card-title">${p.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${p.meta}</p>
                    <p style="font-size:12px;color:#475569;margin-top:8px;line-height:1.6;">${p.desc}</p>
                    <div class="doc-card-meta"><span style="color:#7c3aed;font-weight:800;">Consulter</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmCommunautes() {
            const list = document.getElementById('kmCommList');
            const threads = document.getElementById('kmCommThreads');
            if (!list || !threads) return;
            list.innerHTML = kmCommunautes.map(c => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#f0fdf4;color:#15803d;font-weight:900;">COM</div>
                    <div class="doc-info">
                        <div class="doc-title">${c.name}</div>
                        <div class="doc-meta">${c.members} membres • ${c.threads} discussions</div>
                    </div>
                    <span style="background:#dcfce7;color:#15803d;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;">Rejoindre</span>
                </div>
            `).join('');
            threads.innerHTML = kmThreads.map(t => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">MSG</div>
                    <div class="doc-info">
                        <div class="doc-title">${t.title}</div>
                        <div class="doc-meta">${t.meta}</div>
                    </div>
                    <span style="background:#f8fafc;border:1px solid #e2e8f0;color:#475569;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;">${t.badge}</span>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmAmoa() {
            const list = document.getElementById('kmAmoaList');
            const detail = document.getElementById('kmAmoaDetail');
            if (!list || !detail) return;
            list.innerHTML = kmAmoa.map(x => `
                <div class="doc-item" onclick="kmAmoaSelected='${x.id}'; renderKmAmoa();">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">AMOA</div>
                    <div class="doc-info">
                        <div class="doc-title">${x.title}</div>
                        <div class="doc-meta">${x.meta}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const sel = kmAmoa.find(x => x.id === kmAmoaSelected) || kmAmoa[0];
            kmAmoaSelected = sel?.id || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${sel.meta}</div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
                <div style="color:#475569;font-size:13px;line-height:1.8;">${sel.body}</div>
            ` : 'Sélectionnez un élément.';
            lucide.createIcons();
        }

        function renderKmDocs() {
            const folders = document.getElementById('kmDocsFolders');
            const list = document.getElementById('kmDocsList');
            if (!folders || !list) return;
            folders.innerHTML = kmDocs.map(f => `
                <div class="doc-item" onclick="kmDocsActive='${f.id}'; renderKmDocs();">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">DOC</div>
                    <div class="doc-info">
                        <div class="doc-title">${f.label}</div>
                        <div class="doc-meta">${f.docs.length} documents</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const active = kmDocs.find(x => x.id === kmDocsActive) || kmDocs[0];
            list.innerHTML = (active?.docs || []).map(d => `
                <div class="doc-item" onclick="openMockDownload('${d.file}','${d.label}')">
                    <div class="doc-icon" style="background:#f0fdf4;color:#15803d;font-weight:900;">PDF</div>
                    <div class="doc-info">
                        <div class="doc-title">${d.label}</div>
                        <div class="doc-meta">${d.file}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmContributions() {
            const list = document.getElementById('kmContribList');
            const detail = document.getElementById('kmContribDetail');
            if (!list || !detail) return;
            list.innerHTML = kmContribData.map(c => `
                <div class="doc-item" onclick="kmContribSelected='${c.id}'; renderKmContributions();">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">K</div>
                    <div class="doc-info">
                        <div class="doc-title">${c.title}</div>
                        <div class="doc-meta">${c.date}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const sel = kmContribData.find(x => x.id === kmContribSelected) || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${sel.date}</div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
                <div style="color:#475569;font-size:13px;line-height:1.8;">${sel.body}</div>
            ` : `Sélectionnez une contribution.`;
            lucide.createIcons();
        }

        function toggleKmContributionForm(open) {
            const card = document.getElementById('kmContribFormCard');
            if (card) card.style.display = open ? 'block' : 'none';
        }

        function submitKmContribution() {
            const title = (document.getElementById('kmContribTitle')?.value || '').trim();
            const body = (document.getElementById('kmContribBody')?.value || '').trim();
            if (!title || !body) return;
            const id = 'ct' + Math.random().toString(16).slice(2);
            kmContribData = [{ id, title, date: 'Aujourd’hui', body }, ...kmContribData];
            document.getElementById('kmContribTitle').value = '';
            document.getElementById('kmContribBody').value = '';
            toggleKmContributionForm(false);
            renderKmContributions();
        }

        function filterKmCatalogue(type, btn) {
            kmCatalogueType = type;
            document.querySelectorAll('#view-km .actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderKmCatalogue();
        }

        function renderKmCatalogue() {
            const list = document.getElementById('kmCatalogueList');
            if (!list) return;
            const q = (document.getElementById('kmCatSearch')?.value || '').trim().toLowerCase();
            const items = kmCatalogueItems.filter(i => {
                const matchType = kmCatalogueType === 'all' || i.type === kmCatalogueType;
                const matchQ = !q || i.title.toLowerCase().includes(q) || i.meta.toLowerCase().includes(q) || i.type.toLowerCase().includes(q);
                return matchType && matchQ;
            });
            list.innerHTML = items.map(i => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#f8fafc;color:#475569;font-weight:900;">${i.type.slice(0,3).toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${i.title}</div>
                        <div class="doc-meta">${i.meta}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('') || `<div style="padding:14px 16px;color:var(--text-light);font-size:12px;">Aucun contenu.</div>`;
            lucide.createIcons();
        }

        function renderKmLivrables() {
            const list = document.getElementById('kmLivrablesList');
            if (!list) return;
            list.innerHTML = kmLivrables.map(l => `
                <div class="doc-item" onclick="openMockDownload('${l.file}','${l.title}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">LIV</div>
                    <div class="doc-info">
                        <div class="doc-title">${l.title}</div>
                        <div class="doc-meta">${l.file}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmModeles() {
            const list = document.getElementById('kmModelesList');
            if (!list) return;
            list.innerHTML = kmModeles.map(m => `
                <div class="doc-item" onclick="openMockDownload('${m.file}','${m.title}')">
                    <div class="doc-icon" style="background:#fdf4ff;color:#7c3aed;font-weight:900;">TPL</div>
                    <div class="doc-info">
                        <div class="doc-title">${m.title}</div>
                        <div class="doc-meta">${m.file}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmPublications() {
            const list = document.getElementById('kmPubList');
            if (!list) return;
            list.innerHTML = kmPublications.map(p => `
                <div class="doc-item" onclick="openMockDownload('${p.file}','${p.title}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">ART</div>
                    <div class="doc-info">
                        <div class="doc-title">${p.title}</div>
                        <div class="doc-meta">${p.meta}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmGlpi() {
            const list = document.getElementById('kmGlpiTickets');
            if (!list) return;
            list.innerHTML = kmGlpiTickets.map(t => `
                <div class="doc-item">
                    <div class="doc-icon" style="background:#f0fdf4;color:#15803d;font-weight:900;">IT</div>
                    <div class="doc-info">
                        <div class="doc-title">${t.title}</div>
                        <div class="doc-meta">${t.meta}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function submitKmGlpi() {
            const title = (document.getElementById('kmGlpiTitle')?.value || '').trim();
            const desc = (document.getElementById('kmGlpiDesc')?.value || '').trim();
            if (!title || !desc) return;
            kmGlpiTickets = [{ id: 't' + Math.random().toString(16).slice(2), title, meta: 'Envoyé • Nouveau' }, ...kmGlpiTickets];
            document.getElementById('kmGlpiTitle').value = '';
            document.getElementById('kmGlpiDesc').value = '';
            renderKmGlpi();
        }

        function renderKmSupports() {
            const grid = document.getElementById('kmSupportsGrid');
            if (!grid) return;
            grid.innerHTML = kmSupports.map(s => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${s.file}','${s.title}')">
                    <div class="doc-icon-large" style="background:#fdf4ff;color:#a855f7;">
                        <i data-lucide="graduation-cap" style="width: 24px; height: 24px;"></i>
                    </div>
                    <div class="doc-card-title">${s.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${s.meta}</p>
                    <div class="doc-card-meta"><span style="color:#7c3aed;font-weight:800;">Consulter</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmStories() {
            const grid = document.getElementById('kmStoriesGrid');
            const list = document.getElementById('kmStoriesHighlight');
            if (!grid || !list) return;
            grid.innerHTML = kmStories.map(s => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;cursor:pointer;" onclick="openMockDownload('${s.file}','${s.title}')">
                    <div style="height:96px;background:linear-gradient(135deg,#eff6ff,#fff7ed);display:flex;align-items:center;justify-content:center;">
                        <i data-lucide="${s.type === 'Media' ? 'play-circle' : 'newspaper'}" style="width:22px;height:22px;color:#475569;"></i>
                    </div>
                    <div style="padding:12px;">
                        <div style="font-weight:900;color:#0f172a;font-size:13px;line-height:1.4;">${s.title}</div>
                        <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${s.type} • ${s.meta}</div>
                    </div>
                </div>
            `).join('');
            list.innerHTML = kmStories.map(s => `
                <div class="doc-item" onclick="openMockDownload('${s.file}','${s.title}')">
                    <div class="doc-icon" style="background:#fff7ed;color:#ea580c;font-weight:900;">STO</div>
                    <div class="doc-info">
                        <div class="doc-title">${s.title}</div>
                        <div class="doc-meta">${s.meta}</div>
                    </div>
                    <i data-lucide="arrow-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmCampagnes() {
            const list = document.getElementById('kmCampagnesList');
            const detail = document.getElementById('kmCampagnesDetail');
            if (!list || !detail) return;
            list.innerHTML = kmCampagnes.map(c => `
                <div class="doc-item" onclick="kmCampagnesSelected='${c.id}'; renderKmCampagnes();">
                    <div class="doc-icon" style="background:#ecfdf5;color:#16a34a;font-weight:900;">INT</div>
                    <div class="doc-info">
                        <div class="doc-title">${c.title}</div>
                        <div class="doc-meta">${c.type} • ${c.responses} participation(s)</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const sel = kmCampagnes.find(x => x.id === kmCampagnesSelected) || kmCampagnes[0];
            kmCampagnesSelected = sel?.id || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${sel.type} • Audience : ${sel.audience}</div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
                <div style="color:#475569;font-size:13px;line-height:1.8;">${sel.desc}</div>
                <div style="margin-top:14px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Participations</div>
                        <div style="margin-top:6px;font-size:22px;font-weight:900;color:#0f172a;">${sel.responses}</div>
                    </div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;">
                        <div style="font-size:11px;color:#94a3b8;font-weight:900;">Canal</div>
                        <div style="margin-top:6px;font-size:14px;font-weight:900;color:#0f172a;">Formulaire / sondage</div>
                    </div>
                </div>
                <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:14px;">
                    <button class="secondary-btn" onclick="openMockDownload('Campagne_${sel.id}.pdf','${sel.title}')">Consulter</button>
                    <button class="primary-btn" onclick="participateKmCampagne('${sel.id}')">Participer</button>
                </div>
            ` : 'Sélectionnez une campagne.';
            lucide.createIcons();
        }

        function participateKmCampagne(id) {
            kmCampagnes = kmCampagnes.map(c => c.id === id ? { ...c, responses: c.responses + 1 } : c);
            renderKmCampagnes();
        }

        function renderKmAuditRisque() {
            const list = document.getElementById('kmAuditRisqueList');
            if (!list) return;
            list.innerHTML = kmAuditRisque.map(d => `
                <div class="doc-item" onclick="openMockDownload('${d.file}','${d.title}')">
                    <div class="doc-icon" style="background:#eff6ff;color:#1d4ed8;font-weight:900;">AUD</div>
                    <div class="doc-info">
                        <div class="doc-title">${d.title}</div>
                        <div class="doc-meta">${d.meta}</div>
                    </div>
                    <i data-lucide="download" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmCapsulesUx() {
            const grid = document.getElementById('kmCapsulesUxGrid');
            if (!grid) return;
            grid.innerHTML = kmCapsulesUx.map(c => `
                <div class="doc-card" style="cursor:pointer;" onclick="openMockDownload('${c.file}','${c.title}')">
                    <div class="doc-icon-large" style="background:#fff7ed;color:#ea580c;">
                        <i data-lucide="play-circle" style="width:24px;height:24px;"></i>
                    </div>
                    <div class="doc-card-title">${c.title}</div>
                    <p style="font-size:12px;color:var(--text-light);margin-top:6px;">${c.meta}</p>
                    <div class="doc-card-meta"><span style="color:#ea580c;font-weight:800;">Consulter</span><i data-lucide="arrow-right" style="width:16px;"></i></div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderKmRegimesProcessus() {
            const list = document.getElementById('kmRegimesProcessList');
            const detail = document.getElementById('kmRegimesProcessDetail');
            if (!list || !detail) return;
            list.innerHTML = kmRegimesProcessus.map(r => `
                <div class="doc-item" onclick="kmRegimesProcessSelected='${r.id}'; renderKmRegimesProcessus();">
                    <div class="doc-icon" style="background:#ecfdf5;color:#16a34a;font-weight:900;">KM</div>
                    <div class="doc-info">
                        <div class="doc-title">${r.title}</div>
                        <div class="doc-meta">${r.meta}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');
            const sel = kmRegimesProcessus.find(x => x.id === kmRegimesProcessSelected) || kmRegimesProcessus[0];
            kmRegimesProcessSelected = sel?.id || null;
            detail.innerHTML = sel ? `
                <div style="font-weight:900;color:#0f172a;font-size:16px;">${sel.title}</div>
                <div style="margin-top:6px;color:var(--text-light);font-size:12px;">${sel.meta}</div>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
                <div style="color:#475569;font-size:13px;line-height:1.8;">${sel.body}</div>
                <div style="display:flex;justify-content:flex-end;margin-top:14px;">
                    <button class="primary-btn" onclick="openMockDownload('${sel.file}','${sel.title}')">Consulter</button>
                </div>
            ` : 'Sélectionnez un contenu métier.';
            lucide.createIcons();
        }

        // ===== CATALOGUE – FILTRES =====
        function filtrerCatalogue() {
            const theme = document.getElementById('filtre-theme').value;
            const type = document.getElementById('filtre-type').value;
            const duree = document.getElementById('filtre-duree').value;
            document.querySelectorAll('.catalogue-item').forEach(card => {
                const matchTheme = !theme || card.dataset.theme === theme;
                const matchType  = !type  || card.dataset.type  === type;
                const matchDuree = !duree || card.dataset.duree === duree;
                card.style.display = (matchTheme && matchType && matchDuree) ? '' : 'none';
            });
        }
        function reinitialiserFiltres() {
            document.getElementById('filtre-theme').value = '';
            document.getElementById('filtre-type').value  = '';
            document.getElementById('filtre-duree').value = '';
            document.querySelectorAll('.catalogue-item').forEach(c => c.style.display = '');
        }

        // ===== DEMANDE DE FORMATION – SOUMETTRE / SUIVRE =====
        function showDemandeForm() {
            document.getElementById('demande-form-section').style.display = 'block';
            document.getElementById('demande-suivi-section').style.display = 'none';
            document.getElementById('btn-nouvelle-demande').style.background = 'var(--cmr-primary)';
            document.getElementById('btn-nouvelle-demande').style.color = '#fff';
            document.getElementById('btn-suivi-demande').style.background = '#fff';
            document.getElementById('btn-suivi-demande').style.color = '#475569';
            lucide.createIcons();
        }
        function showDemandeSuivi() {
            document.getElementById('demande-form-section').style.display = 'none';
            document.getElementById('demande-suivi-section').style.display = 'block';
            document.getElementById('btn-suivi-demande').style.background = 'var(--cmr-primary)';
            document.getElementById('btn-suivi-demande').style.color = '#fff';
            document.getElementById('btn-nouvelle-demande').style.background = '#fff';
            document.getElementById('btn-nouvelle-demande').style.color = '#475569';
            lucide.createIcons();
        }

        // ===== POSTES VACANTS – 3-STEP FLOW =====
        const offresData = getCmrData('offresData', {
            bi: {
                titre: 'Chef de Projet BI (H/F)',
                direction: 'Direction des Systèmes d\'Information',
                lieu: 'Casablanca',
                niveau: 'Cadre',
                date: '15/05/2026',
                mission: 'Piloter les projets de Business Intelligence de la DSI : recueil des besoins métiers, conception des tableaux de bord, supervision des développements et suivi de la qualité des livrables.',
                profil: ['Bac+5 en Informatique, Data ou équivalent', 'Minimum 5 ans d\'expérience en BI / Data', 'Maîtrise de Power BI, SQL, et des architectures datawarehouse', 'Capacité à fédérer des équipes transverses', 'Certifications PMP ou PRINCE2 appréciées']
            },
            comdig: {
                titre: 'Responsable Communication Digital (H/F)',
                direction: 'Direction de la Communication',
                lieu: 'Siège – Rabat',
                niveau: 'Manager',
                date: '20/05/2026',
                mission: 'Définir et piloter la stratégie de communication digitale de la CMR : gestion des canaux numériques, production de contenus, animation des communautés en ligne et reporting des performances.',
                profil: ['Bac+5 en Communication, Marketing Digital ou équivalent', 'Minimum 7 ans d\'expérience dont 3 en management', 'Maîtrise des outils CMS, réseaux sociaux, SEO et analytics', 'Excellentes capacités rédactionnelles (français/arabe)', 'Créativité et sens de l\'innovation']
            },
            actuariat: {
                titre: 'Analyste Risques & Actuariat (H/F)',
                direction: 'Direction Technique',
                lieu: 'Casablanca',
                niveau: 'Expert',
                date: '30/04/2026',
                mission: 'Réaliser les études actuarielles et les modélisations de risques nécessaires à la gestion des régimes de retraite : projections financières, provisionnement, stress tests et reporting réglementaire.',
                profil: ['Bac+5 en Actuariat, Mathématiques ou Statistiques', 'Minimum 4 ans d\'expérience en actuariat retraite ou assurance', 'Maîtrise de R, Python et des outils actuariels', 'Connaissance de la réglementation des régimes de retraite au Maroc', 'Aptitude à synthétiser des analyses complexes']
            }
        });
        let currentOffre = null;

        function showOffrefiche(id) {
            currentOffre = id;
            const d = offresData[id];
            if (!d) return;
            document.getElementById('offres-liste').style.display = 'none';
            document.getElementById('offres-formulaire').style.display = 'none';
            document.getElementById('offres-fiche').style.display = 'block';
            document.getElementById('fiche-titre').textContent = d.titre;
            document.getElementById('fiche-meta').textContent = d.direction + ' · ' + d.lieu + ' · ' + d.niveau;
            document.getElementById('fiche-direction').textContent = d.direction;
            document.getElementById('fiche-lieu').textContent = d.lieu;
            document.getElementById('fiche-niveau').textContent = d.niveau;
            document.getElementById('fiche-date').textContent = d.date;
            document.getElementById('fiche-mission').textContent = d.mission;
            const ul = document.getElementById('fiche-profil');
            ul.innerHTML = '';
            d.profil.forEach(p => { const li = document.createElement('li'); li.textContent = p; ul.appendChild(li); });
            lucide.createIcons();
        }

        function showOffreFormulaire() {
            const d = offresData[currentOffre];
            document.getElementById('offres-fiche').style.display = 'none';
            document.getElementById('offres-formulaire').style.display = 'block';
            document.getElementById('form-poste-titre').textContent = 'Candidature pour : ' + (d ? d.titre : '');
            lucide.createIcons();
        }

        function showOffresListe() {
            document.getElementById('offres-fiche').style.display = 'none';
            document.getElementById('offres-formulaire').style.display = 'none';
            document.getElementById('offres-liste').style.display = 'block';
            lucide.createIcons();
        }

        // ===== ACTUALITÉS PAGE LOGIC =====

        const actuData = getCmrData('actuData', [
            {
                id: 1,
                title: "Signature du nouveau contrat programme État-CMR 2026-2028",
                category: "Stratégie",
                date: "22 Avril 2026",
                author: "Direction Générale",
                image: "images/intranet/news_contract.jpg",
                excerpt: "La CMR et l'État marocain ont officialisé leur partenariat stratégique pour les trois prochaines années, marquant une étape clé dans la modernisation du système de retraite.",
                content: [
                    "La Caisse Marocaine des Retraites (CMR) et l'État marocain ont procédé à la signature du nouveau contrat programme pour la période 2026-2028. Cet accord stratégique définit les grandes orientations de la CMR pour les trois prochaines années.",
                    "Le contrat prévoit notamment le renforcement de la gouvernance institutionnelle, la modernisation des systèmes d'information, l'amélioration de la qualité de service aux pensionnés et la consolidation de l'équilibre financier du régime.",
                    "Cette signature s'inscrit dans la continuité des réformes engagées depuis 2023 et vise à faire de la CMR un acteur de référence en matière de protection sociale au Maroc. Les investissements prévus dans le cadre de ce contrat s'élèvent à plusieurs centaines de millions de dirhams.",
                    "Le Directeur Général de la CMR a exprimé sa satisfaction quant à cet accord, soulignant l'importance de la confiance renouvelée de l'État dans les capacités de la Caisse à mener à bien sa mission de service public."
                ],
                tags: ["Stratégie", "Gouvernance", "Contrat Programme", "2026-2028"]
            },
            {
                id: 2,
                title: "Tenue de la session ordinaire du Conseil d'Administration",
                category: "Gouvernance",
                date: "21 Avril 2026",
                author: "Secrétariat Général",
                image: "images/intranet/news_board.jpg",
                excerpt: "Le Conseil d'Administration de la CMR s'est réuni en session ordinaire pour examiner les résultats financiers du premier trimestre 2026 et valider les orientations stratégiques.",
                content: [
                    "Le Conseil d'Administration de la Caisse Marocaine des Retraites (CMR) a tenu sa session ordinaire du premier trimestre 2026. La réunion a été présidée par M. le Ministre de l'Économie et des Finances.",
                    "Parmi les points à l'ordre du jour figuraient l'examen des résultats financiers de la CMR pour le premier trimestre 2026, la présentation du tableau de bord des indicateurs clés de performance, ainsi que la validation du plan d'action de la Direction pour le reste de l'année.",
                    "Le Conseil a également examiné plusieurs projets de convention avec des partenaires institutionnels et a donné son accord de principe pour le lancement d'une étude actuarielle globale du régime.",
                    "Les membres du Conseil ont salué les performances enregistrées par la CMR, notamment en matière de délai de traitement des dossiers de pension et de satisfaction des pensionnés."
                ],
                tags: ["Gouvernance", "Conseil d'Administration", "Finance", "Pilotage"]
            },
            {
                id: 3,
                title: "Déploiement de la solution de signature électronique",
                category: "Digital",
                date: "Janvier 2026",
                author: "Direction Digitale",
                image: "images/intranet/slider_cmr_tech.png",
                excerpt: "La CMR franchit une nouvelle étape dans sa transformation digitale avec le déploiement d'une solution de signature électronique certifiée pour tous les processus internes.",
                content: [
                    "Dans le cadre de sa stratégie de transformation digitale, la CMR a procédé au déploiement d'une solution de signature électronique certifiée. Ce projet, porté par la Direction Digitale, concerne l'ensemble des processus documentaires internes.",
                    "La solution adoptée est conforme aux exigences légales marocaines en matière de signature électronique et garantit l'authenticité, l'intégrité et la non-répudiation de tous les documents signés numériquement.",
                    "Dans une première phase, plus de 500 collaborateurs ont été équipés et formés à l'utilisation de cette solution. L'objectif est de couvrir l'ensemble des employés de la CMR d'ici la fin du premier semestre 2026.",
                    "Cette initiative permettra de réduire significativement les délais de traitement des documents, d'éliminer les flux papier et de contribuer à l'objectif de neutralité carbone de la Caisse."
                ],
                tags: ["Digital", "Signature Électronique", "Transformation", "Innovation"]
            },
            {
                id: 4,
                title: "Résultats de la campagne d'innovation \"Digit-Passe\"",
                category: "Innovation",
                date: "20 Avril 2026",
                author: "Comité Innovation",
                image: "images/intranet/slider2.png",
                excerpt: "La campagne d'innovation interne \"Digit-Passe\" a permis de collecter plus de 120 idées innovantes de la part des collaborateurs. Les lauréats ont été récompensés lors d'une cérémonie officielle.",
                content: [
                    "La deuxième édition de la campagne d'innovation interne \"Digit-Passe\" s'est clôturée avec un bilan très positif. Lancée en janvier 2026, la campagne a mobilisé plus de 300 collaborateurs qui ont soumis collectivement plus de 120 propositions d'innovation.",
                    "Un jury composé de membres de la Direction Générale, de la Direction Digitale et d'experts externes a évalué les projets selon des critères d'impact, de faisabilité et d'originalité.",
                    "Trois projets lauréats ont été retenus : une application mobile de suivi des dossiers de pension, un chatbot intelligent pour les pensionnés, et un tableau de bord prédictif pour la gestion actuarielle.",
                    "Les équipes gagnantes recevront un accompagnement pour la mise en œuvre de leurs projets ainsi qu'une dotation financière. La Direction Générale a souligné l'importance de cultiver la culture de l'innovation au sein de la CMR."
                ],
                tags: ["Innovation", "Digit-Passe", "Collaborateurs", "Projets"]
            },
            {
                id: 5,
                title: "Lancement du programme de formation \"CMR Academy\"",
                category: "Formation",
                date: "15 Avril 2026",
                author: "Ressources Humaines",
                image: "images/intranet/news_academy.jpg",
                excerpt: "La CMR Academy lance une nouvelle vague de formations pour renforcer les compétences des collaborateurs dans les domaines du digital, du management et des métiers de la retraite.",
                content: [
                    "La CMR Academy, plateforme de développement des compétences de la Caisse Marocaine des Retraites, lance sa nouvelle vague de formations pour le premier semestre 2026.",
                    "Au programme : des formations en management stratégique, en transformation digitale, en actuariat, ainsi que des modules spécialisés sur les nouvelles réglementations en matière de retraite. Plus de 50 formations sont proposées, dont une grande partie en e-learning.",
                    "Cette initiative s'inscrit dans la politique de développement des ressources humaines de la CMR, qui vise à faire de chaque collaborateur un acteur de la performance collective. Le budget consacré à la formation pour 2026 a été augmenté de 20% par rapport à l'année précédente.",
                    "Les collaborateurs peuvent consulter le catalogue de formations et s'inscrire directement via le portail RH. Les responsables d'équipe sont invités à identifier les besoins de formation de leurs collaborateurs et à planifier les départs en formation."
                ],
                tags: ["Formation", "CMR Academy", "RH", "Compétences"]
            },
            {
                id: 6,
                title: "Partenariat CMR – CNOPS : échange de données sécurisé",
                category: "Stratégie",
                date: "10 Avril 2026",
                author: "Direction Générale",
                image: "images/intranet/slider_partnership.png",
                excerpt: "La CMR et la CNOPS ont signé un accord d'échange de données pour améliorer la coordination entre les régimes de retraite et d'assurance maladie au bénéfice des fonctionnaires.",
                content: [
                    "La CMR et la Caisse Nationale des Organismes de Prévoyance Sociale (CNOPS) ont conclu un accord cadre pour l'échange sécurisé de données entre les deux institutions.",
                    "Cet accord permettra d'automatiser la transmission d'informations relatives aux départs à la retraite, ce qui facilitera le basculement des fonctionnaires vers le régime d'assurance maladie des retraités (RAMED fonctionnel).",
                    "Le projet, qui sera mis en œuvre sur 12 mois, s'appuiera sur une infrastructure d'échange de données sécurisée respectant les exigences de la CNDP en matière de protection des données personnelles.",
                    "Cette initiative illustre la volonté des deux institutions de coordonner leurs actions pour améliorer le service rendu aux fonctionnaires et simplifier leurs démarches administratives."
                ],
                tags: ["Partenariat", "CNOPS", "Données", "Interopérabilité"]
            },
            {
                id: 7,
                title: "Enquête de satisfaction interne : 85% de taux de participation",
                category: "Social",
                date: "5 Avril 2026",
                author: "Ressources Humaines",
                image: "images/intranet/slider3.png",
                excerpt: "L'enquête annuelle de satisfaction interne a enregistré un taux de participation record de 85%, témoignant de l'engagement des collaborateurs envers la vie de la CMR.",
                content: [
                    "La troisième édition de l'enquête annuelle de satisfaction interne de la CMR a enregistré un taux de participation exceptionnel de 85%, soit une progression de 12 points par rapport à 2025.",
                    "Les résultats globaux sont encourageants : 78% des collaborateurs se déclarent satisfaits de leur cadre de travail, 72% estiment que la communication interne s'est améliorée, et 80% se sentent fiers de travailler pour la CMR.",
                    "Des axes d'amélioration ont également été identifiés, notamment en matière de mobilité interne, d'équilibre vie professionnelle – vie personnelle et de digitalisation des processus RH. Un plan d'action sera élaboré sur la base de ces résultats.",
                    "La Direction des Ressources Humaines a remercié l'ensemble des collaborateurs pour leur participation et leur engagement, et s'est engagée à communiquer sur les actions mises en place en réponse aux retours exprimés."
                ],
                tags: ["Social", "Satisfaction", "RH", "Enquête"]
            },
            {
                id: 8,
                title: "Feuille de route digitale 2026 : cap sur la transformation",
                category: "Digital",
                date: "1 Avril 2026",
                author: "Direction Digitale",
                image: "images/intranet/slider1.png",
                excerpt: "La Direction Digitale présente la feuille de route 2026 qui couvre 15 projets majeurs de transformation numérique, incluant l'IA, la data et l'expérience client.",
                content: [
                    "La Direction Digitale de la CMR a dévoilé sa feuille de route pour l'année 2026. Ce document stratégique définit 15 projets prioritaires de transformation numérique qui seront menés tout au long de l'année.",
                    "Parmi les projets phares figurent le déploiement d'un assistant virtuel basé sur l'intelligence artificielle pour les pensionnés, la refonte du portail e-service, la mise en place d'une plateforme de data analytics et l'automatisation des processus administratifs.",
                    "Un budget de 45 millions de dirhams a été alloué à ces projets, qui devraient générer des gains d'efficacité significatifs et améliorer substantiellement l'expérience des pensionnés et des affiliés.",
                    "La Direction Digitale a mis en place une cellule de pilotage dédiée qui assurera le suivi de l'avancement des projets et la communication régulière auprès des équipes."
                ],
                tags: ["Digital", "IA", "Data", "Transformation", "2026"]
            },
            {
                id: 9,
                title: "Colonies de vacances 2026 : inscriptions ouvertes",
                category: "Social",
                date: "28 Mars 2026",
                author: "Action Sociale",
                image: "images/intranet/slider3.png",
                excerpt: "Les inscriptions pour les colonies de vacances d'été 2026 sont ouvertes. Les collaborateurs peuvent inscrire leurs enfants de 7 à 16 ans via le portail social.",
                content: [
                    "La CMR annonce l'ouverture des inscriptions pour les colonies de vacances d'été 2026, destinées aux enfants des collaborateurs âgés de 7 à 16 ans.",
                    "Trois destinations sont proposées cette année : Témara (juillet, 3 semaines), Oujda (août, 2 semaines) et une nouveauté, un camp de montagne à Ifrane (juillet-août, 2 semaines). Chaque colonie proposera des activités sportives, culturelles et éducatives.",
                    "Les tarifs sont subventionnés par le fonds d'action sociale de la CMR. Les collaborateurs bénéficient d'une réduction de 60% sur le tarif plein, avec des facilités de paiement échelonné.",
                    "Les inscriptions se font exclusivement en ligne via le portail d'action sociale. La date limite de dépôt des dossiers est fixée au 30 avril 2026. Pour tout renseignement complémentaire, contacter le service Action Sociale au poste 4510."
                ],
                tags: ["Social", "Action Sociale", "Vacances", "Famille"]
            },
            {
                id: 10,
                title: "Réunion du comité d'audit : bilan et perspectives",
                category: "Gouvernance",
                date: "20 Mars 2026",
                author: "Audit Interne",
                image: "images/intranet/news_board.jpg",
                excerpt: "Le comité d'audit de la CMR a tenu sa réunion trimestrielle pour examiner les résultats du plan d'audit 2026 et valider les recommandations issues des missions réalisées.",
                content: [
                    "Le comité d'audit de la CMR s'est réuni pour sa session trimestrielle. La réunion, présidée par le Président du Comité, a réuni les membres du Conseil d'Administration en charge de la supervision de l'audit et de la gestion des risques.",
                    "Le responsable de l'audit interne a présenté l'état d'avancement du plan d'audit 2026. Six missions ont été réalisées depuis le début de l'année, portant sur les domaines des systèmes d'information, de la gestion financière et des processus RH.",
                    "Le taux d'implémentation des recommandations issues des audits précédents a atteint 87%, témoignant de l'engagement de l'ensemble des directions dans l'amélioration continue des processus.",
                    "Le comité a également examiné la cartographie des risques mise à jour et validé les priorités du plan d'audit pour le deuxième semestre 2026. Une attention particulière sera portée aux risques liés à la transformation digitale et à la cybersécurité."
                ],
                tags: ["Gouvernance", "Audit", "Risques", "Contrôle Interne"]
            }
        ]);

        let actuCurrentCategory = 'all';
        let actuCurrentSearch = '';

        // ===== Communication interne preview (real content) =====
        let commInterneCategory = 'all';
        let commInterneSearch = '';
        let commInterneMetier = 'all';

        const commInterneMetierRules = {
            direction: ['direction générale', 'secrétariat général', 'gouvernance', 'pilotage'],
            rh: ['ressources humaines', 'rh', 'formation', 'compétences'],
            digital: ['direction digitale', 'digital', 'ia', 'data', 'transformation', 'interopérabilité'],
            audit: ['audit interne', 'audit', 'contrôle interne', 'risques'],
            social: ['action sociale', 'social', 'satisfaction', 'famille']
        };

        function getFilteredCommInterneActu() {
            const savedCat = actuCurrentCategory;
            const savedSearch = actuCurrentSearch;
            actuCurrentCategory = commInterneCategory;
            actuCurrentSearch = commInterneSearch;
            const res = getFilteredActu().filter(a => {
                if (commInterneMetier === 'all') return true;
                const rules = commInterneMetierRules[commInterneMetier] || [];
                const haystack = [
                    a.category || '',
                    a.author || '',
                    ...(a.tags || [])
                ].join(' ').toLowerCase();
                return rules.some(rule => haystack.includes(rule));
            });
            actuCurrentCategory = savedCat;
            actuCurrentSearch = savedSearch;
            return res;
        }

        function renderCommInternePreview() {
            const container = document.getElementById('commInternePreview');
            if (!container) return;

            const items = getFilteredCommInterneActu().slice(0, 6);
            if (items.length === 0) {
                container.innerHTML = `
                    <div style="padding:14px 16px;color:var(--text-light);font-size:12px;">
                        Aucun contenu ne correspond au filtre/recherche.
                    </div>
                `;
                return;
            }

            container.innerHTML = items.map(a => `
                <div class="doc-item" onclick="goToActualitesFromCommInterne(${a.id}); return false;">
                    <div class="doc-icon" style="background:#f8fafc;color:#475569;font-weight:800;">${(a.category || '').slice(0,3).toUpperCase()}</div>
                    <div class="doc-info">
                        <div class="doc-title">${a.title}</div>
                        <div class="doc-meta">${a.category} • ${a.date}</div>
                    </div>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;color:#94a3b8;"></i>
                </div>
            `).join('');

            lucide.createIcons();
        }

        function filterCommInternePreview(query) {
            commInterneSearch = query || '';
            renderCommInternePreview();
        }

        function filterCommInterneCategory(cat, btn) {
            commInterneCategory = cat;
            const root = document.getElementById('commInterneThemeFilters');
            if (root) {
                root.querySelectorAll('.actu-filter-btn').forEach(b => b.classList.remove('active'));
            }
            if (btn) btn.classList.add('active');
            renderCommInternePreview();
        }

        function filterCommInterneMetier(metier, btn) {
            commInterneMetier = metier;
            const root = document.getElementById('commInterneMetierFilters');
            if (root) {
                root.querySelectorAll('.actu-filter-btn').forEach(b => b.classList.remove('active'));
            }
            if (btn) btn.classList.add('active');
            renderCommInternePreview();
        }

        let flashDetailBackView = 'dashboard';

        function openCommFlashDetail(newsId) {
            const item = cmrNewsItems.find(x => x.id === newsId);
            if (!item) return;
            flashDetailBackView = 'communication-interne';
            window.__activeTickerItem = item;
            goToFlashDetailFromModal();
        }

        function goToActualitesFromCommInterne(articleId) {
            // Open Actualités and apply same filters/search
            switchView('actualites');
            document.getElementById('actu-list-panel').style.display = 'block';
            document.getElementById('actu-detail-panel').style.display = 'none';

            actuCurrentCategory = commInterneCategory;
            actuCurrentSearch = commInterneSearch;

            const searchInput = document.getElementById('actuSearchInput');
            if (searchInput) searchInput.value = commInterneSearch;

            document.querySelectorAll('#view-actualites .actu-filter-btn').forEach(b => {
                const label = (b.textContent || '').trim();
                const isAll = commInterneCategory === 'all' && label === 'Toutes';
                const isMatch = commInterneCategory !== 'all' && label === commInterneCategory;
                b.classList.toggle('active', isAll || isMatch);
            });

            renderActuGrid(getFilteredActu());
            if (articleId) setTimeout(() => openActuDetail(articleId), 50);
        }

        function renderActuGrid(articles) {
            const grid = document.getElementById('actuGrid');
            const empty = document.getElementById('actuEmpty');
            const countEl = document.getElementById('actuCount');

            if (!grid) return;

            if (articles.length === 0) {
                grid.innerHTML = '';
                empty.style.display = 'flex';
                countEl.textContent = '0';
                return;
            }

            empty.style.display = 'none';
            countEl.textContent = articles.length;

            grid.innerHTML = articles.map(a => `
                <div class="actu-card" onclick="openActuDetail(${a.id})">
                    <img class="actu-card-img" src="${a.image}" alt="${a.title}" onerror="this.src='images/intranet/slider1.png'">
                    <div class="actu-card-body">
                        <span class="actu-card-category">${a.category}</span>
                        <div class="actu-card-title">${a.title}</div>
                        <div class="actu-card-excerpt">${a.excerpt}</div>
                        <div class="actu-card-footer">
                            <span class="actu-card-meta">
                                <i data-lucide="calendar" style="width:12px;height:12px;"></i>
                                ${a.date}
                            </span>
                            <span class="actu-card-readmore">
                                Lire plus
                                <i data-lucide="arrow-right" style="width:12px;height:12px;"></i>
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');

            lucide.createIcons();
        }

        function getFilteredActu() {
            return actuData.filter(a => {
                const matchCat = actuCurrentCategory === 'all' || a.category === actuCurrentCategory;
                const q = actuCurrentSearch.trim().toLowerCase();
                const matchSearch = !q ||
                    a.title.toLowerCase().includes(q) ||
                    a.excerpt.toLowerCase().includes(q) ||
                    a.category.toLowerCase().includes(q) ||
                    a.author.toLowerCase().includes(q) ||
                    (a.tags || []).some(t => t.toLowerCase().includes(q));
                return matchCat && matchSearch;
            });
        }

        function filterActu(query) {
            actuCurrentSearch = query;
            renderActuGrid(getFilteredActu());
        }

        function filterByCategory(cat, btn) {
            actuCurrentCategory = cat;
            document.querySelectorAll('.actu-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderActuGrid(getFilteredActu());
        }

        function openActuDetail(id) {
            const article = actuData.find(a => a.id === id);
            if (!article) return;

            const container = document.getElementById('actuDetailContent');
            container.innerHTML = `
                <img class="actu-detail-hero" src="${article.image}" alt="${article.title}" onerror="this.src='images/intranet/slider1.png'">
                <div class="actu-detail-body">
                    <div class="actu-detail-meta-row">
                        <span class="actu-detail-category">${article.category}</span>
                        <span class="actu-detail-date">
                            <i data-lucide="calendar" style="width:13px;height:13px;"></i>
                            ${article.date}
                        </span>
                        <span class="actu-detail-author">
                            <i data-lucide="user" style="width:13px;height:13px;"></i>
                            ${article.author}
                        </span>
                    </div>
                    <h1 class="actu-detail-title">${article.title}</h1>
                    <div class="actu-detail-content">
                        ${article.content.map(p => `<p>${p}</p>`).join('')}
                    </div>
                    <hr class="actu-detail-divider">
                    <div class="actu-detail-tags">
                        ${article.tags.map(t => `<span class="actu-detail-tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            document.getElementById('actu-list-panel').style.display = 'none';
            document.getElementById('actu-detail-panel').style.display = 'block';

            // Scroll to top of main content
            const main = document.querySelector('.main-content');
            if (main) main.scrollTop = 0;

            lucide.createIcons();
        }

        function backToActuList() {
            document.getElementById('actu-list-panel').style.display = 'block';
            document.getElementById('actu-detail-panel').style.display = 'none';
        }

        function goToActualites(articleId) {
            switchView('actualites');
            // Reset state
            document.getElementById('actu-list-panel').style.display = 'block';
            document.getElementById('actu-detail-panel').style.display = 'none';
            actuCurrentCategory = 'all';
            actuCurrentSearch = '';
            const searchInput = document.getElementById('actuSearchInput');
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.actu-filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
            renderActuGrid(actuData);
            if (articleId) {
                setTimeout(() => openActuDetail(articleId), 50);
            }
        }

        // ===== NOTIFICATIONS PAGE LOGIC =====

        const notifData = getCmrData('notifData', [
            { id: 1,  type: 'document',    title: 'Nouveau document publié',         desc: 'La procédure RH 2026 est maintenant disponible dans KM.',         time: 'Il y a 10 min',  date: "Aujourd'hui",  unread: true  },
            { id: 2,  type: 'meeting',     title: 'Réunion Direction',               desc: 'La réunion du CODIR commencera dans 15 minutes.',                  time: 'Il y a 25 min',  date: "Aujourd'hui",  unread: true  },
            { id: 3,  type: 'innovation',  title: 'Félicitations !',                 desc: 'Votre idée "Digit-Passe" a été validée par le comité.',            time: 'Hier, 16:45',    date: 'Hier',         unread: true  },
            { id: 4,  type: 'rh',          title: 'Évaluation annuelle ouverte',     desc: 'La campagne d\'évaluation 2026 est lancée. Date limite : 28 fév.', time: 'Hier, 10:00',    date: 'Hier',         unread: false },
            { id: 5,  type: 'system',      title: 'Maintenance planifiée',           desc: 'Maintenance du serveur Paie vendredi à 18h00.',                    time: 'Hier, 08:30',    date: 'Hier',         unread: false },
            { id: 6,  type: 'document',    title: 'Note de service partagée',        desc: 'La note de service N°12/2026 relative aux congés a été publiée.', time: '22 Avr, 14:00',  date: '22 Avr',       unread: false },
            { id: 7,  type: 'meeting',     title: 'Compte-rendu disponible',         desc: 'Le compte-rendu de la réunion du 20 avril est disponible.',        time: '21 Avr, 09:15',  date: '21 Avr',       unread: false },
            { id: 8,  type: 'rh',          title: 'Solde de congés mis à jour',      desc: 'Votre solde de congés annuels a été actualisé pour 2026.',         time: '20 Avr, 16:00',  date: '20 Avr',       unread: false },
            { id: 9,  type: 'innovation',  title: 'Nouvelle idée soumise',           desc: 'Une nouvelle idée "Smart Archivage" a été soumise à votre équipe.','time': '19 Avr, 11:00', date: '19 Avr',       unread: false },
            { id: 10, type: 'system',      title: 'Mise à jour système',             desc: 'Le portail intranet a été mis à jour vers la version 4.2.',        time: '18 Avr, 07:00',  date: '18 Avr',       unread: false },
            { id: 11, type: 'document',    title: 'Rapport mensuel disponible',      desc: 'Le rapport de performance de mars 2026 est disponible.',           time: '17 Avr, 15:30',  date: '17 Avr',       unread: false },
            { id: 12, type: 'meeting',     title: 'Invitation : Comité d\'audit',    desc: 'Vous êtes invité(e) à la réunion du comité d\'audit le 15 mai.',   time: '15 Avr, 09:00',  date: '15 Avr',       unread: false },
            { id: 13, type: 'rh',          title: 'Formation disponible',            desc: 'Nouveau module "Management Agile" disponible sur CMR Academy.',    time: '14 Avr, 10:00',  date: '14 Avr',       unread: false },
            { id: 14, type: 'system',      title: 'Alerte sécurité',                 desc: 'Connexion depuis un nouvel appareil détectée sur votre compte.',   time: '12 Avr, 22:10',  date: '12 Avr',       unread: false },
            { id: 15, type: 'document',    title: 'Procédure IT mise à jour',        desc: 'La charte informatique 2026 a été mise à jour. Merci de la signer.','time': '10 Avr, 08:00', date: '10 Avr',       unread: false }
        ]);

        const notifIcons = getCmrData('notifIcons', {
            document:   { bg: '#dbeafe', color: '#2563eb', icon: 'file-text' },
            meeting:    { bg: '#fef3c7', color: '#d97706', icon: 'calendar' },
            rh:         { bg: '#f0fdf4', color: '#16a34a', icon: 'user-check' },
            innovation: { bg: '#fdf4ff', color: '#9333ea', icon: 'lightbulb' },
            system:     { bg: '#fff1f2', color: '#dc2626', icon: 'settings' }
        });

        let notifCurrentFilter = 'all';

        function renderNotifPage(items) {
            const list = document.getElementById('notifPageList');
            const empty = document.getElementById('notifPageEmpty');
            if (!list) return;

            if (items.length === 0) {
                list.innerHTML = '';
                empty.style.display = 'flex';
                return;
            }
            empty.style.display = 'none';

            // Group by date
            const groups = {};
            items.forEach(n => {
                if (!groups[n.date]) groups[n.date] = [];
                groups[n.date].push(n);
            });

            let html = '';
            Object.entries(groups).forEach(([date, notifs]) => {
                html += `<div class="notif-page-date-sep">${date}</div>`;
                notifs.forEach(n => {
                    const ic = notifIcons[n.type] || notifIcons.document;
                    html += `
                        <div class="notif-page-item${n.unread ? ' unread' : ''}" id="notif-item-${n.id}" onclick="markNotifRead(${n.id})">
                            <div class="notif-page-icon" style="background:${ic.bg};color:${ic.color};">
                                <i data-lucide="${ic.icon}" style="width:20px;height:20px;"></i>
                            </div>
                            <div class="notif-page-body">
                                <div class="notif-page-item-title">${n.title}</div>
                                <div class="notif-page-item-desc">${n.desc}</div>
                                <div class="notif-page-item-time">
                                    <i data-lucide="clock" style="width:11px;height:11px;"></i>
                                    ${n.time}
                                </div>
                            </div>
                            <div class="notif-page-item-right">
                                ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
                            </div>
                        </div>`;
                });
            });

            list.innerHTML = html;
            lucide.createIcons();
        }

        function filterNotifPage(filter, btn) {
            notifCurrentFilter = filter;
            document.querySelectorAll('.notif-tab').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');

            let filtered;
            if (filter === 'all')    filtered = notifData;
            else if (filter === 'unread') filtered = notifData.filter(n => n.unread);
            else                     filtered = notifData.filter(n => n.type === filter);

            renderNotifPage(filtered);
        }

        function markNotifRead(id) {
            const n = notifData.find(x => x.id === id);
            if (n && n.unread) {
                n.unread = false;
                updateNotifBadge();
                // Re-render current filter
                filterNotifPage(notifCurrentFilter, null);
            }
        }

        function markAllNotifsRead() {
            notifData.forEach(n => n.unread = false);
            updateNotifBadge();
            filterNotifPage(notifCurrentFilter, null);
        }

        function updateNotifBadge() {
            const unreadCount = notifData.filter(n => n.unread).length;
            // Header badge
            const badge = document.querySelector('.header-icon-btn .badge');
            if (badge) {
                badge.textContent = unreadCount;
                badge.style.display = unreadCount > 0 ? 'flex' : 'none';
            }
            // Tab badges
            const tabAll = document.getElementById('notifTabAll');
            if (tabAll) tabAll.textContent = notifData.length;
            const tabUnread = document.getElementById('notifTabUnread');
            if (tabUnread) tabUnread.textContent = unreadCount;
        }

        function goToNotifications() {
            // Close the dropdown
            document.getElementById('notifDropdown').classList.remove('active');
            switchView('notifications');
        }

        // ===== CONSENTEMENT LOI 09-08 =====
        const CONSENT_0908_KEY = 'cmrConsent0908_v1';

        function openConsent0908Modal() {
            const modal = document.getElementById('consent0908Modal');
            if (!modal) return;
            modal.classList.add('active');
            const warn = document.getElementById('consent0908Warning');
            if (warn) warn.style.display = 'none';
            lucide.createIcons();
        }

        function closeConsent0908Modal() {
            const modal = document.getElementById('consent0908Modal');
            if (!modal) return;
            modal.classList.remove('active');
        }

        function acceptConsent0908() {
            try {
                localStorage.setItem(CONSENT_0908_KEY, JSON.stringify({ acceptedAt: new Date().toISOString() }));
            } catch (e) {
                // If storage is blocked, keep UX working for session
            }
            closeConsent0908Modal();
        }

        function declineConsent0908() {
            const warn = document.getElementById('consent0908Warning');
            if (warn) warn.style.display = 'block';
        }

        function initializeConsentAndDashboardState() {
            let hasConsent = false;
            try {
                hasConsent = Boolean(localStorage.getItem(CONSENT_0908_KEY));
            } catch (e) {
                hasConsent = false;
            }
            if (!hasConsent) {
                openConsent0908Modal();
            }

            // Hide DG message if already read
            try {
                const dgRead = Boolean(localStorage.getItem('cmrDgMessageRead_v1'));
                const card = document.getElementById('dgMessageCard');
                if (dgRead && card) card.style.display = 'none';
            } catch (e) { }
        }

        initializeConsentAndDashboardState();

        // ===== DASHBOARD: UNIFORMISER LA TAILLE DES CARDS =====
        function equalizeDashboardCardHeights() {
            const dashboard = document.getElementById('view-dashboard');
            if (!dashboard || !dashboard.classList.contains('active')) return;

            const cards = Array.from(document.querySelectorAll('#view-dashboard .dashboard-grid .dashboard-card'));
            if (cards.length === 0) return;

            // Reset first (so we measure natural heights)
            cards.forEach(c => (c.style.minHeight = ''));

            // Measure max
            let maxH = 0;
            cards.forEach(c => {
                const h = c.getBoundingClientRect().height;
                if (h > maxH) maxH = h;
            });

            // Apply (avoid tiny rounding jitter)
            const target = Math.ceil(maxH);
            cards.forEach(c => (c.style.minHeight = target + 'px'));
        }

        let _eqCardsTimer = null;
        function scheduleEqualizeDashboardCards() {
            if (_eqCardsTimer) clearTimeout(_eqCardsTimer);
            _eqCardsTimer = setTimeout(() => {
                requestAnimationFrame(equalizeDashboardCardHeights);
            }, 80);
        }

        window.addEventListener('load', scheduleEqualizeDashboardCards);
        window.addEventListener('resize', scheduleEqualizeDashboardCards);

        // Initialize actualités grid when switching to that view
        const origSwitchView = switchView;
        switchView = function(viewId) {
            origSwitchView(viewId);
            if (viewId === 'dashboard') {
                scheduleEqualizeDashboardCards();
            }
            if (viewId === 'communication-interne') {
                // Ensure icons render when opening this view
                lucide.createIcons();
                // Render real content preview under "Filtrage des contenus"
                renderCommInternePreview();
            }
            if (viewId === 'institutionnel') {
                // Default tab + render initial content
                switchOrgGovTab('overview');
            }
            if (viewId === 'annuaire') {
                lucide.createIcons();
                initAnnuaireFilters();
                renderAnnuaireList();
            }
            if (viewId === 'km') {
                // Default KM tab and populate content (avoid empty screens)
                switchPageKmTab(getActiveSubmenuTab('km') || 'referentiels');
            }
            if (viewId === 'innovation') {
                switchInnovationTab(getActiveSubmenuTab('innovation') || 'ideation');
            }
            if (viewId === 'rse') {
                switchRseSection('referentiels');
            }
            if (viewId === 'qse') {
                switchQseSection(getActiveSubmenuTab('qse') || 'referentiels');
            }
            if (viewId === 'sitd') {
                switchSitdSection(getActiveSubmenuTab('sitd') || 'securite-si');
            }
            if (viewId === 'arc') {
                switchArcSection(getActiveSubmenuTab('arc') || 'audit-interne');
            }
            if (viewId === 'reglementation') {
                switchRegSection(getActiveSubmenuTab('reglementation') || 'referentiels');
            }
            if (viewId === 'documentaires') {
                switchMetiersSection(getActiveSubmenuTab('documentaires') || 'structuration-metier');
            }
            if (viewId === 'collaboratifs') {
                switchCollabSection(getActiveSubmenuTab('collaboratifs') || 'discussions');
            }
            if (viewId === 'mediatheque') {
                switchMediaSection(getActiveSubmenuTab('mediatheque') || 'acces');
            }
            if (viewId === 'admin') {
                switchAdminSection(getActiveSubmenuTab('admin') || 'utilisateurs');
            }
            if (viewId === 'actualites') {
                const listPanel = document.getElementById('actu-list-panel');
                const detailPanel = document.getElementById('actu-detail-panel');
                if (listPanel) listPanel.style.display = 'block';
                if (detailPanel) detailPanel.style.display = 'none';
                renderActuGrid(actuData);
            }
            if (viewId === 'notifications') {
                notifCurrentFilter = 'all';
                document.querySelectorAll('.notif-tab').forEach((b, i) => b.classList.toggle('active', i === 0));
                renderNotifPage(notifData);
            }
        };

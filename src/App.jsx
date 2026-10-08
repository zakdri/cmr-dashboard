import React, { useEffect, useState } from 'react';
import cmrLoadingLogo from '../images/intranet/cmr-logo-login.png';
import {
  HeaderTemplate,
  SidebarTemplate,
  RightSidebarTemplate,
  ModalsTemplate
} from './components/layout/index.jsx';
import { loadLegacyScript } from './legacy/loadLegacyScript.js';
import { sections } from './sections/index.jsx';
import { loadApplicationData } from './services/cmrData.js';
import { renderLucideIcons } from './lucideLocal.js';
import LoginView from './components/auth/LoginView.jsx';
import { installCreationControlGuard } from './services/creationControls.js';
import { applyFlashInfo, loadFlashInfo } from './services/flashInfo.js';
import { applyAchatsIndicators, loadAchatsIndicators } from './services/achatsIndicators.js';
import { applyWorkflowNotifications, loadWorkflowNotifications, openWorkflowNotificationById } from './services/workflowNotifications.js';
import {
  applyCurrentUser,
  checkSession,
  getCurrentUser,
  isDemoMode,
  isTwoFactorEnabled,
  loadMoovappsNews,
  verifyCredentials
} from './services/moovappsPlatform.js';

function ErrorState() {
  return (
    <div style={{ padding: 24, maxWidth: 760, background: 'white', borderRadius: 16 }}>
      <div style={{ marginBottom: 10, fontWeight: 800 }}>Chargement impossible</div>
      <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>
        Une erreur est survenue pendant le chargement de l’application.
      </p>
    </div>
  );
}

export default function App() {
  const [authState, setAuthState] = useState('checking');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => installCreationControlGuard(), []);

  useEffect(() => {
    let cancelled = false;

    async function bootAuthenticated() {
      try {
        document.dispatchEvent(new CustomEvent('cmr:page-ready'));
        await loadApplicationData();
        const demoMode = isDemoMode();
        const [user, flashInfo, achatsIndicators, , workflowNotifications] = await Promise.all([
          demoMode ? null : getCurrentUser(),
          demoMode ? null : loadFlashInfo().catch((loadError) => {
            console.error('Chargement des Flash Info impossible :', loadError);
            return [];
          }),
          demoMode ? null : loadAchatsIndicators().catch((loadError) => {
            console.error('Chargement des indicateurs Achats impossible :', loadError);
            return [];
          }),
          demoMode ? null : loadMoovappsNews(),
          demoMode ? null : loadWorkflowNotifications().catch((loadError) => {
            console.error('Chargement des notifications workflow impossible :', loadError);
            return [];
          })
        ]);
        if (cancelled) return;
        if (!demoMode && !user) {
          setReady(false);
          setAuthState('login');
          return;
        }
        applyCurrentUser(user);
        if (!demoMode) applyFlashInfo(flashInfo);
        if (!demoMode) applyAchatsIndicators(achatsIndicators);
        if (!demoMode) applyWorkflowNotifications(workflowNotifications);
        window.openWorkflowNotificationById = openWorkflowNotificationById;
        setAuthState('authenticated');
        setReady(true);
      } catch (bootError) {
        console.error(bootError);
        if (!cancelled) {
          setError(bootError);
          setAuthState('authenticated');
        }
      }
    }

    async function boot() {
      const authDisabled = isDemoMode() || window.CMR_PLATFORM_CONFIG?.auth?.enabled === false;
      if (authDisabled || await checkSession()) {
        await bootAuthenticated();
        return;
      }
      if (cancelled) return;
      setTwoFactorEnabled(await isTwoFactorEnabled());
      if (!cancelled) setAuthState('login');
    }

    if (authState === 'checking') boot();

    async function verifyVisibleSession() {
      if (isDemoMode() || document.visibilityState !== 'visible' || authState !== 'authenticated') return;
      if (!await checkSession() && !cancelled) {
        setReady(false);
        setAuthState('login');
      }
    }
    if (authState === 'authenticated') document.addEventListener('visibilitychange', verifyVisibleSession);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', verifyVisibleSession);
    };
  }, [authState]);

  async function handleLogin(login, password) {
    const result = await verifyCredentials(login, password);
    if (![200, 301].includes(result.status)) return { ok: false, status: result.status };
    setError(null);
    setReady(false);
    setAuthState('checking');
    return { ok: true, status: result.status };
  }

  useEffect(() => {
    let cancelled = false;

    async function bootLegacyInteractions() {
      if (!ready || error) return;

      try {
        await loadLegacyScript();
        if (cancelled) return;
        document.dispatchEvent(new CustomEvent('cmr:app-ready'));
      } catch (bootError) {
        console.error(bootError);
        if (!cancelled) setError(bootError);
      }
    }

    bootLegacyInteractions();

    return () => {
      cancelled = true;
    };
  }, [ready, error]);

  useEffect(() => {
    if (ready && !error) {
      requestAnimationFrame(() => renderLucideIcons());
    }
  }, [ready, error]);

  if (authState === 'login') {
    return <LoginView twoFactorEnabled={twoFactorEnabled} onLogin={handleLogin} />;
  }

  if (authState === 'checking') {
    return (
      <div className="app-loading" role="status" aria-label="Chargement de l’intranet">
        <div className="app-loading-brand" aria-hidden="true">
          <img src={cmrLoadingLogo} alt="" />
          <span className="app-loading-progress" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="header-root">
        <HeaderTemplate />
      </div>

      <div className="layout-container">
        <div id="sidebar-root">
          <SidebarTemplate />
        </div>

        <main className="main-content" id="sections-root">
          {error ? <ErrorState /> : null}
          {ready && !error
            ? sections.map(({ id, Component }) => <Component key={id} />)
            : null}
        </main>

        <div id="right-sidebar-root">
          <RightSidebarTemplate />
        </div>
      </div>

      <div id="modals-root">
        <ModalsTemplate />
      </div>
    </>
  );
}

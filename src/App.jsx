import React, { useEffect, useState } from 'react';
import {
  HeaderTemplate,
  SidebarTemplate,
  RightSidebarTemplate,
  ModalsTemplate
} from './components/layout/index.jsx';
import { loadLegacyScript } from './legacy/loadLegacyScript.js';
import { sections } from './sections/index.jsx';
import { loadApplicationData } from './services/cmrData.js';

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
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        document.dispatchEvent(new CustomEvent('cmr:page-ready'));
        await loadApplicationData();
        if (cancelled) return;
        setReady(true);
      } catch (bootError) {
        console.error(bootError);
        if (!cancelled) setError(bootError);
      }
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

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

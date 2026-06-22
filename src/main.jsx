import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/latin-300.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/inter/latin-800.css';
import App from './App.jsx';
import './lucideLocal.js';
import '../css/styles.css';

document.documentElement.classList.add('notranslate');
document.documentElement.setAttribute('translate', 'no');
document.body.classList.add('notranslate');
document.body.setAttribute('translate', 'no');

const rootElement = document.getElementById('root');
rootElement.setAttribute('translate', 'no');

createRoot(rootElement).render(
  <App />
);

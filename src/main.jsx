import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
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

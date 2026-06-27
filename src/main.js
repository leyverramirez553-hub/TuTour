import { createRoot } from 'react-dom/client';
import { html } from './jsx.js';
import { Providers } from './mainProviders.js';
import { App } from './App.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('TuTour could not start because the #root element was not found.');
}

createRoot(rootElement).render(html`<${Providers}><${App} /></${Providers}>`);

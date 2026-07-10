import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { html } from './jsx.js';
import { useGuideStore } from './store/useGuideStore.js';
import { Layout } from './components/Layout.js';
import { Home } from './pages/Home.js';
import { Places } from './pages/Places.js';
import { Itinerary } from './pages/Itinerary.js';
import { Experiences } from './pages/Experiences.js';
import { Safety } from './pages/Safety.js';
import { MapPage } from './pages/MapPage.js';
import { Events } from './pages/Events.js';
import { Settings } from './pages/Settings.js';
import { Chatbot } from './pages/Chatbot.js';
import { Services } from './pages/Services.js';
import { TrustCenter } from './pages/TrustCenter.js';
import { NotFound } from './pages/NotFound.js';
import { trackPageView } from './utils/analytics.js';

function GoogleAnalyticsRouteTracker() {
  const location = useLocation();

  React.useEffect(() => {
    const pagePath = `${location.pathname}${location.search || ''}`;
    trackPageView(pagePath, document.title || 'TuTour');
  }, [location.pathname, location.search]);

  return null;
}

export function App() {
  const dark = useGuideStore(s => s.dark);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return html`
    <${HashRouter}>
      <${GoogleAnalyticsRouteTracker} />
      <${Routes}>
        <${Route} element=${html`<${Layout} />`}>
          <${Route} path="/" element=${html`<${Home} />`} />
          <${Route} path="/places" element=${html`<${Places} />`} />
          <${Route} path="/itinerary" element=${html`<${Itinerary} />`} />
          <${Route} path="/experiences" element=${html`<${Experiences} />`} />
          <${Route} path="/safety" element=${html`<${Safety} />`} />
          <${Route} path="/map" element=${html`<${MapPage} />`} />
          <${Route} path="/events" element=${html`<${Events} />`} />
          <${Route} path="/chat" element=${html`<${Chatbot} />`} />
          <${Route} path="/services" element=${html`<${Services} />`} />
          <${Route} path="/trust-center" element=${html`<${TrustCenter} />`} />
          <${Route} path="/trust-center/:slug" element=${html`<${TrustCenter} />`} />
          <${Route} path="/settings" element=${html`<${Settings} />`} />
          <${Route} path="*" element=${html`<${NotFound} />`} />
        </${Route}>
      </${Routes}>
    </${HashRouter}>
  `;
}

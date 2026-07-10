import React from 'react';
import {BedDouble, Bot, CalendarDays, Globe2, Landmark, Map, Moon, MoreVertical, Route, Settings as SettingsIcon, ShieldCheck, Sparkles, Sun, WifiOff} from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { languages } from '../data/i18n.js';
import { useLanguage } from '../i18n.js';
import { localizedGoogleMapsUrl, localizeGoogleMapAnchors } from '../utils/googleMapsLinks.js';
import { trackEvent } from '../utils/analytics.js';
import { FloatingLocalGuide } from './FloatingLocalGuide.js';
import { HotelsPopup } from './HotelsPopup.js';

export function navClass({ isActive }) {
  return `focus-ring min-h-[38px] rounded-[var(--radius-md)] border-2 px-2.5 py-1.5 flex flex-col items-center justify-center gap-1 text-xs font-black ${isActive ? 'border-[hsl(var(--accent))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-sm)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.58)] hover:bg-[hsl(var(--muted))]'}`;
}

const navLabelsByLanguage = {
  en: { home: 'Home', places: 'Places', hotels: 'Hotels', itinerary: 'Itinerary', map: 'Map', events: 'Events' },
  es: { home: 'Inicio', places: 'Lugares', hotels: 'Hoteles', itinerary: 'Itinerario', map: 'Mapa', events: 'Eventos' },
  fr: { home: 'Accueil', places: 'Lieux', hotels: 'Hôtels', itinerary: 'Itinéraire', map: 'Carte', events: 'Événements' },
  de: { home: 'Start', places: 'Orte', hotels: 'Hotels', itinerary: 'Route', map: 'Karte', events: 'Events' },
  it: { home: 'Inizio', places: 'Luoghi', hotels: 'Hotel', itinerary: 'Itinerario', map: 'Mappa', events: 'Eventi' },
  pt: { home: 'Início', places: 'Lugares', hotels: 'Hotéis', itinerary: 'Roteiro', map: 'Mapa', events: 'Eventos' },
  ja: { home: 'ホーム', places: 'スポット', hotels: 'ホテル', itinerary: '旅程', map: '地図', events: 'イベント' },
  zh: { home: '首页', places: '地点', hotels: '酒店', itinerary: '行程', map: '地图', events: '活动' }
};

const logoSvg = '/api/apps/romcWH54d4SR/assets/TuTournewLogobigger.png';

export function Layout() {
  const { t, language: lang, setLanguage } = useLanguage();
  const setStoreLanguage = useGuideStore(s => s.setLanguage);
  const dark = useGuideStore(s => s.dark);
  const toggleDark = useGuideStore(s => s.toggleDark);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [hotelsOpen, setHotelsOpen] = React.useState(false);
  const [online, setOnline] = React.useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  const location = useLocation();

  // Sync back to standard store whenever language from hook changes
  React.useEffect(() => {
    setStoreLanguage(lang);
  }, [lang, setStoreLanguage]);

  React.useEffect(() => {
    const syncOnline = () => setOnline(navigator.onLine);
    window.addEventListener('online', syncOnline);
    window.addEventListener('offline', syncOnline);
    return () => { window.removeEventListener('online', syncOnline); window.removeEventListener('offline', syncOnline); };
  }, []);

  React.useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => {
      const target = event.target;
      if (!target || typeof target.closest !== 'function' || !target.closest('[data-header-menu]')) setMenuOpen(false);
    };
    const onKey = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  React.useEffect(() => {
    localizeGoogleMapAnchors(document, lang);
    const observer = new MutationObserver(() => localizeGoogleMapAnchors(document, lang));
    observer.observe(document.body, { childList: true, subtree: true });
    const localizeBeforeNavigation = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if (!anchor || anchor.hasAttribute('download')) return;
      const href = anchor.getAttribute('href');
      const localized = localizedGoogleMapsUrl(href, lang);
      if (localized && localized !== href) anchor.setAttribute('href', localized);
    };
    document.addEventListener('click', localizeBeforeNavigation, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', localizeBeforeNavigation, true);
    };
  }, [lang]);

  const navLabels = navLabelsByLanguage[lang] || navLabelsByLanguage.en;
  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    trackEvent('language_changed', { language: nextLanguage, previous_language: lang });
    setLanguage(nextLanguage);
  };
  const handleThemeToggle = () => {
    const nextTheme = dark ? 'light' : 'dark';
    toggleDark();
    trackEvent('theme_changed', { theme: nextTheme });
  };
  const handleMenuToggle = () => {
    const nextOpen = !menuOpen;
    setMenuOpen(nextOpen);
    trackEvent('menu_toggle', { state: nextOpen ? 'open' : 'closed' });
  };
  const openHotelsPopup = () => {
    setHotelsOpen(true);
    trackEvent('select_content', { content_type: 'hotel_popup', item_id: 'hotels' });
  };
  const closeHotelsPopup = () => {
    setHotelsOpen(false);
    trackEvent('modal_closed', { modal_name: 'hotels' });
  };
  const nav = [
    { to: '/', label: navLabels.home || t('home'), icon: Sparkles },
    { to: '/places', label: navLabels.places || t('places'), icon: Landmark },
    { to: '/itinerary', label: navLabels.itinerary || t('itinerary'), icon: Route },
    { to: '/map', label: navLabels.map || t('map'), icon: Map },
    { to: '/events', label: navLabels.events || t('events', 'Events'), icon: CalendarDays },
    { to: '/hotels', label: navLabels.hotels || 'Hotels', icon: BedDouble, popup: 'hotels' }
  ];

  return html`
    <div className="min-h-screen safe-bottom w-full overflow-x-hidden">
      ${!online ? html`<div role="status" className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-[hsl(var(--destructive))] px-3 py-2 text-center text-xs font-black text-white"><${WifiOff} className="h-4 w-4" />${t('offlineMode')}: ${t('offlineReady')}</div>` : null}
      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto max-w-6xl px-3 py-2 flex items-center gap-2 justify-between min-w-0">
          <${Link} to="/" className="tutour-logo-link focus-ring inline-flex items-center shrink-0 rounded-[var(--radius-md)]" aria-label="TuTour Oaxaca home">
            <img className="tutour-image-logo" src=${logoSvg} alt="TuTour" />
          </${Link}>
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
            ${nav.map(item => { const Icon = item.icon; return item.popup === 'hotels' ? html`<button key=${item.to} type="button" onClick=${openHotelsPopup} className=${`focus-ring inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 py-2 text-sm font-black ${hotelsOpen ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-sm)]' : 'border-[hsl(var(--border)/0.72)] bg-[hsl(var(--card)/0.64)] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.55)] hover:bg-[hsl(var(--muted)/0.72)]'}`} aria-haspopup="dialog" aria-expanded=${hotelsOpen ? 'true' : 'false'}><${Icon} className="h-4 w-4" />${item.label}</button>` : html`<${NavLink} key=${item.to} to=${item.to} className=${({ isActive }) => `focus-ring inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 py-2 text-sm font-black ${isActive ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-sm)]' : 'border-[hsl(var(--border)/0.72)] bg-[hsl(var(--card)/0.64)] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.55)] hover:bg-[hsl(var(--muted)/0.72)]'}`}><${Icon} className="h-4 w-4" />${item.label}</${NavLink}>`; })}
          </nav>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center">
              <div className="flex items-center justify-end gap-1">
                <label className="sr-only" htmlFor="language">${t('language')}</label>
                <div className="relative"><${Globe2} className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--muted-foreground))]" /><select id="language" value=${lang} onChange=${handleLanguageChange} className="focus-ring min-h-[28px] w-[86px] rounded-[var(--radius-sm)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] pl-6 pr-4 text-[11px] font-semibold leading-none">${languages.map(l => html`<option key=${l.code} value=${l.code}>${l.label}</option>`)}</select></div>
                <div className="relative" data-header-menu="true">
                  <button type="button" onClick=${handleMenuToggle} aria-haspopup="menu" aria-expanded=${menuOpen} aria-label=${t('settings')} className="focus-ring grid h-8 min-h-0 w-8 place-items-center rounded-full bg-[hsl(var(--muted))] p-0 text-[hsl(var(--foreground))] overflow-hidden">
                    <${MoreVertical} className="h-3.5 w-3.5" />
                  </button>
                  ${menuOpen ? html`<div role="menu" className="absolute right-0 top-[calc(100%+.35rem)] z-50 max-h-[min(72vh,34rem)] w-[min(22rem,calc(100vw-1rem))] overflow-y-auto rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-1.5 text-sm shadow-[var(--shadow-lg)]">
                    <${Link} role="menuitem" to="/settings" onClick=${() => setMenuOpen(false)} className="focus-ring flex min-h-[38px] items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 font-black text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"><${SettingsIcon} className="h-4 w-4 text-[hsl(var(--primary))]" />${t('settings')}</${Link}>
                    <${Link} role="menuitem" to="/chat" onClick=${() => setMenuOpen(false)} className="focus-ring flex min-h-[38px] items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 font-black text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"><${Bot} className="h-4 w-4 text-[hsl(var(--primary))]" />${t('chatbot')}</${Link}>
                    <${Link} role="menuitem" to="/safety" onClick=${() => setMenuOpen(false)} className="focus-ring flex min-h-[38px] items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 font-black text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"><${ShieldCheck} className="h-4 w-4 text-[hsl(var(--primary))]" />${t('safety')}</${Link}>
                    <div className="my-1 h-px bg-[hsl(var(--border))]" aria-hidden="true"></div>
                    <${Link} role="menuitem" to="/trust-center" onClick=${() => setMenuOpen(false)} className="focus-ring flex min-h-[38px] items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 font-black text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"><${ShieldCheck} className="h-4 w-4 text-[hsl(var(--primary))]" />${t('trustCenter', 'Trust Center')}</${Link}>
                  </div>` : null}
                </div>
              </div>
              <button onClick=${handleThemeToggle} className="focus-ring grid h-8 min-h-0 w-8 place-items-center rounded-full bg-[hsl(var(--muted))] p-0 text-[hsl(var(--foreground))]" aria-label=${t('darkMode')}>${dark ? html`<${Sun} className="h-3.5 w-3.5" />` : html`<${Moon} className="h-3.5 w-3.5" />`}</button>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-3 py-4 md:py-6 overflow-x-hidden"><${Outlet} /></main>
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-[hsl(var(--border))] bg-[hsl(var(--card)/0.97)] backdrop-blur-xl md:hidden"><div className="grid grid-cols-6 gap-0.5 px-1.5 py-1.5">${nav.map(item => { const Icon = item.icon; return item.popup === 'hotels' ? html`<button key=${item.to} type="button" onClick=${openHotelsPopup} className=${navClass({ isActive: hotelsOpen })} aria-haspopup="dialog" aria-expanded=${hotelsOpen ? 'true' : 'false'}><${Icon} className="h-4 w-4" /><span className="text-[9px] leading-tight truncate max-w-full">${item.label}</span></button>` : html`<${NavLink} key=${item.to} to=${item.to} className=${navClass}><${Icon} className="h-4 w-4" /><span className="text-[9px] leading-tight truncate max-w-full">${item.label}</span></${NavLink}>`; })}</div></nav>
      <nav className="bottom-nav hidden md:block lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[hsl(var(--border))] bg-[hsl(var(--card)/0.97)] shadow-[0_-10px_28px_rgba(80,40,15,.08)] backdrop-blur-xl"><div className="mx-auto grid max-w-6xl grid-cols-6 gap-0.5 px-2 py-1.5">${nav.map(item => { const Icon = item.icon; return item.popup === 'hotels' ? html`<button key=${item.to} type="button" onClick=${openHotelsPopup} className=${navClass({ isActive: hotelsOpen })} aria-haspopup="dialog" aria-expanded=${hotelsOpen ? 'true' : 'false'}><${Icon} className="h-4 w-4" /><span className="text-[10px] leading-tight truncate max-w-full">${item.label}</span></button>` : html`<${NavLink} key=${item.to} to=${item.to} className=${navClass}><${Icon} className="h-4 w-4" /><span className="text-[10px] leading-tight truncate max-w-full">${item.label}</span></${NavLink}>`; })}</div></nav>
      <${HotelsPopup} isOpen=${hotelsOpen} onClose=${closeHotelsPopup} currentLang=${lang} />
      ${location.pathname === '/chat' ? null : html`<${FloatingLocalGuide} />`}
    </div>
  `;
}

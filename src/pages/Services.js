import React from 'react';
import {PlugZap} from 'lucide-react';
import { html } from '../jsx.js';
import { useLanguage } from '../i18n.js';
import { CapabilityHub } from '../components/CapabilityHub.js';

export function Services() {
  const { t } = useLanguage();
  const [authLoading, setAuthLoading] = React.useState(true);
  const [authUser, setAuthUser] = React.useState(null);
  const [authError, setAuthError] = React.useState('');

  React.useEffect(() => {
    let active = true;
    const auth = window.genmb && window.genmb.auth;
    if (!auth || !auth.ready || !auth.onAuthStateChange) {
      setAuthLoading(false);
      setAuthError(t('authUnavailable', 'Authentication is not available right now.'));
      return undefined;
    }
    auth.ready().then(() => {
      if (!active) return;
      setAuthUser(auth.getUser ? auth.getUser() : null);
      setAuthLoading(false);
    }).catch((err) => {
      if (!active) return;
      setAuthError(err && err.message ? err.message : t('authFailed', 'Authentication failed. Please try again.'));
      setAuthLoading(false);
    });
    const unsubscribe = auth.onAuthStateChange(user => {
      if (active) setAuthUser(user || null);
    });
    return () => {
      active = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return html`<div className="grid gap-4 min-w-0 pb-20">
    <section className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-slate-950 p-4 text-white shadow-[var(--shadow-sm)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,216,77,.35),transparent_16rem),linear-gradient(120deg,rgba(72,33,11,.95),rgba(10,20,31,.88))]"></div>
      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-black uppercase tracking-wide"><${PlugZap} className="h-4 w-4 text-yellow-300" />GenMB SDK</p>
        <h1 className="mt-3 text-2xl font-black md:text-4xl">${t('capabilityHubTitle', 'Connected services')}</h1>
        <p className="mt-1.5 max-w-3xl text-sm font-semibold text-white/88">${t('capabilityHubIntro', 'TuTour is connected to authentication, i18n, translation, KV storage, relational database, Maps & Places, AI guide, and contact form services.')}</p>
        ${authError ? html`<p role="alert" className="mt-3 rounded-[var(--radius-md)] bg-white/14 p-2 text-xs font-bold text-yellow-100">${authError}</p>` : null}
      </div>
    </section>
    <${CapabilityHub} authUser=${authUser} authLoading=${authLoading} />
  </div>`;
}

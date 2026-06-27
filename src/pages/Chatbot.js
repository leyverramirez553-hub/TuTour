import React from 'react';
import {Bot, Loader2, Send, Sparkles} from 'lucide-react';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { t } from '../data/i18n.js';
import { places } from '../data/places.js';

const chatHeroImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Andador%20Macedonio%20Alcal%C3%A1%20Oaxaca%2001.jpg?width=1400';

export function buildSystemPrompt(lang, profile, user = null, dbContext = '') {
  const topStops = places.slice(0, 14).map(p => `${p.name} (${p.category}, ${p.area})`).join('; ');
  const travelerName = user && user.name ? ` You are helping ${user.name}. Be friendly and personalize suggestions when helpful.` : '';
  const databaseContext = dbContext ? ` Traveler database notes: ${dbContext}.` : '';
  return `You are TuTour, a friendly Oaxaca local-style tour guide.${travelerName} Reply in language code ${lang}. Recommend only practical Oaxaca stops, food, culture, nature, mezcal, artisan, market, and safety advice. Keep answers concise, warm, and specific. Mention current-hours checks on Google Maps when relevant. Markets and archaeological sites should be suggested for morning; Jardín Etnobotánico should not be suggested at night. Traveler profile: pace ${profile.pace || 'balanced'}, budget ${profile.budget || 'mid'}, transport ${profile.transport || 'mixed'}, interests ${(profile.interests || []).join(', ') || 'food,culture'}.${databaseContext} Curated TuTour stops include: ${topStops}.`;
}

export function Chatbot() {
  const lang = useGuideStore(s => s.language);
  const profile = useGuideStore(s => s.profile || {});
  const pace = useGuideStore(s => s.pace);
  const transport = useGuideStore(s => s.transport);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [user, setUser] = React.useState(null);
  const [authLoading, setAuthLoading] = React.useState(true);
  const [dbContext, setDbContext] = React.useState('');
  const systemProfile = { ...profile, pace, transport };
  const interestsKey = Array.isArray(profile.interests) ? profile.interests.join('|') : '';

  React.useEffect(() => {
    let active = true;
    const auth = window.genmb && window.genmb.auth;
    if (!auth || !auth.ready || !auth.onAuthStateChange) {
      setAuthLoading(false);
      return undefined;
    }
    auth.ready().then(() => {
      if (!active) return;
      setUser(auth.getUser ? auth.getUser() : null);
      setAuthLoading(false);
    }).catch(() => {
      if (!active) return;
      setAuthLoading(false);
    });
    const unsubscribe = auth.onAuthStateChange(nextUser => {
      if (active) setUser(nextUser || null);
    });
    return () => {
      active = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    let active = true;
    const loadDbContext = async () => {
      if (!user || !user.id) { setDbContext(''); return; }
      try {
        const table = window.genmb && window.genmb.db && window.genmb.db.travel_notes ? window.genmb.db.travel_notes : null;
        if (!table || !table.list) { setDbContext(''); return; }
        const result = await table.list({ 'filter[user_id]': user.id, sort: 'createdAt:desc', limit: 5 });
        if (!active) return;
        const summary = (result.data || []).map(note => note.text || note.title || note.note).filter(Boolean).slice(0, 5).join(' | ');
        setDbContext(summary);
      } catch (err) {
        if (active) setDbContext('');
      }
    };
    loadDbContext();
    return () => { active = false; };
  }, [user && user.id]);

  React.useEffect(() => {
    if (window.genmb && window.genmb.chatbot && window.genmb.chatbot.setSystemPrompt) {
      try { window.genmb.chatbot.setSystemPrompt(buildSystemPrompt(lang, systemProfile, user, dbContext)); } catch (err) {}
    }
  }, [lang, pace, transport, profile.budget, interestsKey, user && user.name, dbContext]);

  const sendMessage = async (textOverride = '') => {
    const text = (textOverride || input).trim();
    if (!text || loading) return;
    setError(''); setSuccess('');
    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg].slice(-10);
    setMessages(prev => [...prev, userMsg]);
    setInput(''); setLoading(true);
    try {
      if (!window.genmb || !window.genmb.chatbot || !window.genmb.chatbot.send) throw new Error(t(lang, 'chatUnavailable'));
      const reply = await window.genmb.chatbot.send(text, { history, systemPrompt: buildSystemPrompt(lang, systemProfile, user, dbContext), maxTokens: 520 });
      if (typeof reply !== 'string') throw new Error(t(lang, 'chatFailed'));
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setSuccess(t(lang, 'chatSuccess'));
      window.setTimeout(() => setSuccess(''), 1800);
    } catch (err) {
      const msg = err && err.message ? err.message : t(lang, 'chatFailed');
      setError(msg);
      setMessages(prev => [...prev, { role: 'assistant', content: t(lang, 'chatFallback') }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event) => { event.preventDefault(); sendMessage(); };
  const suggestions = [t(lang, 'chatSuggestFood'), t(lang, 'chatSuggestSafety'), t(lang, 'chatSuggestRain')];

  return html`<div className="grid gap-4 min-w-0">
    <section className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-slate-950 p-4 text-white shadow-[var(--shadow-sm)]">
      <div className="absolute inset-0 bg-cover bg-center opacity-38" style=${{ backgroundImage: `linear-gradient(120deg, rgba(0,0,0,.72), rgba(0,0,0,.32)), url(${chatHeroImage})` }}></div>
      <div className="relative flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-white/18 text-yellow-300 backdrop-blur"><${Bot} className="h-6 w-6" /></span><div className="min-w-0"><h1 className="text-2xl md:text-4xl font-black">${t(lang, 'chatbot')}</h1><p className="mt-1.5 text-sm font-semibold text-white/88">${t(lang, 'chatIntro')}</p>${authLoading ? html`<p className="mt-2 text-xs font-bold text-white/78">${t(lang, 'loading')}</p>` : user && user.name ? html`<p className="mt-2 text-xs font-bold text-yellow-300">${user.name} · personalized chat enabled${dbContext ? ' · database context loaded' : ''}</p>` : null}</div></div>
    </section>
    <section className="grid min-h-[54vh] overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[var(--shadow-sm)]">
      <div className="max-h-[58vh] overflow-y-auto p-3 md:p-4">
        ${messages.length === 0 ? html`<div className="grid place-items-center rounded-[var(--radius-lg)] bg-[hsl(var(--muted)/0.55)] p-7 text-center"><${Sparkles} className="h-8 w-8 text-[hsl(var(--primary))]" /><p className="mt-3 text-lg font-black">${t(lang, 'chatEmpty')}</p><div className="mt-3 flex flex-wrap justify-center gap-2">${suggestions.map(s => html`<button key=${s} type="button" onClick=${() => sendMessage(s)} disabled=${loading} className="focus-ring rounded-full bg-[hsl(var(--card))] px-3 py-1.5 text-xs font-black shadow-[var(--shadow-sm)] disabled:opacity-60">${s}</button>`)}</div></div>` : html`<div className="grid gap-2.5">${messages.map((m, idx) => html`<div key=${idx} className=${`max-w-[88%] rounded-[var(--radius-lg)] px-3 py-2.5 text-sm font-semibold leading-relaxed ${m.role === 'user' ? 'ml-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'mr-auto bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'}`}>${m.content}</div>`)}</div>`}
        ${loading ? html`<div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--muted))] px-3 py-2 text-sm font-black"><${Loader2} className="h-4 w-4 animate-spin" />${t(lang, 'chatTyping')}</div>` : null}
      </div>
      <div className="border-t border-[hsl(var(--border))] p-3">
        ${error ? html`<p role="alert" className="mb-2 rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2 text-xs font-bold text-[hsl(var(--destructive))]">${error}</p>` : null}
        ${success ? html`<p className="mb-2 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold text-[hsl(var(--secondary))]">${success}</p>` : null}
        <form onSubmit=${onSubmit} className="flex gap-2">
          <label className="sr-only" htmlFor="chat-input">${t(lang, 'chatInput')}</label>
          <input id="chat-input" value=${input} onInput=${e => setInput(e.target.value)} disabled=${loading} placeholder=${t(lang, 'chatPlaceholder')} className="focus-ring min-h-[44px] flex-1 rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 text-sm font-semibold disabled:opacity-60" />
          <button type="submit" disabled=${loading || !input.trim()} className="focus-ring inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-4 text-sm font-black text-[hsl(var(--primary-foreground))] disabled:opacity-60"><${Send} className="h-4 w-4" />${t(lang, 'send')}</button>
        </form>
      </div>
    </section>
  </div>`;
}

import React from 'react';
import {CheckCircle2, Database, Languages, Loader2, Mail, MapPin, PlusCircle, Search, Trash2, WalletCards} from 'lucide-react';
import { html } from '../jsx.js';
import { useLanguage } from '../i18n.js';

const emptyContact = { name: '', email: '', subject: 'TuTour Oaxaca question', message: '' };
const newId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
const dbTable = () => window.genmb && window.genmb.db && window.genmb.db.travel_notes ? window.genmb.db.travel_notes : null;
const kvScope = (user) => `tutour:memo:${user && user.id ? user.id : 'guest'}:`;

export function CapabilityHub({ authUser = null, authLoading = false }) {
  const { t, language } = useLanguage();
  const [contact, setContact] = React.useState(emptyContact);
  const [contactLoading, setContactLoading] = React.useState(false);
  const [contactError, setContactError] = React.useState('');
  const [contactSuccess, setContactSuccess] = React.useState('');

  const [kvNotes, setKvNotes] = React.useState([]);
  const [kvText, setKvText] = React.useState('');
  const [kvLoading, setKvLoading] = React.useState(false);
  const [kvError, setKvError] = React.useState('');
  const [kvSuccess, setKvSuccess] = React.useState('');

  const [dbNotes, setDbNotes] = React.useState([]);
  const [dbText, setDbText] = React.useState('');
  const [dbLoading, setDbLoading] = React.useState(false);
  const [dbError, setDbError] = React.useState('');
  const [dbSuccess, setDbSuccess] = React.useState('');

  const [sourceText, setSourceText] = React.useState('Carry small cash, drink water, and use registered taxis after dark.');
  const [translatedText, setTranslatedText] = React.useState('');
  const [translationLoading, setTranslationLoading] = React.useState(false);
  const [translationError, setTranslationError] = React.useState('');
  const [translationSuccess, setTranslationSuccess] = React.useState('');

  const [placeQuery, setPlaceQuery] = React.useState('coffee near Santo Domingo Oaxaca');
  const [placeResults, setPlaceResults] = React.useState([]);
  const [placesLoading, setPlacesLoading] = React.useState(false);
  const [placesError, setPlacesError] = React.useState('');
  const [placesSuccess, setPlacesSuccess] = React.useState('');

  React.useEffect(() => {
    if (authUser) {
      setContact(prev => ({ ...prev, name: prev.name || authUser.name || '', email: prev.email || authUser.email || '' }));
    }
  }, [authUser && authUser.id, authUser && authUser.email, authUser && authUser.name]);

  const loadKvNotes = React.useCallback(async () => {
    setKvLoading(true); setKvError('');
    try {
      if (!window.genmb || !window.genmb.kv || !window.genmb.kv.list) throw new Error(t('capabilityKvUnavailable', 'Key-value storage is not available right now.'));
      const result = await window.genmb.kv.list(kvScope(authUser));
      const notes = (result.data || []).map(row => row.value).filter(Boolean).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setKvNotes(notes);
    } catch (err) {
      setKvError(err && err.message ? err.message : t('capabilityKvLoadFailed', 'Could not load saved quick notes.'));
    } finally {
      setKvLoading(false);
    }
  }, [authUser && authUser.id, language]);

  const loadDbNotes = React.useCallback(async () => {
    if (!authUser || !authUser.id) { setDbNotes([]); return; }
    setDbLoading(true); setDbError('');
    try {
      const table = dbTable();
      if (!table || !table.list) throw new Error(t('capabilityDbUnavailable', 'Relational database table travel_notes is not configured yet.'));
      const result = await table.list({ 'filter[user_id]': authUser.id, sort: 'createdAt:desc', limit: 10 });
      setDbNotes(result.data || []);
    } catch (err) {
      setDbError(err && err.message ? err.message : t('capabilityDbLoadFailed', 'Could not load database notes.'));
    } finally {
      setDbLoading(false);
    }
  }, [authUser && authUser.id, language]);

  React.useEffect(() => { loadKvNotes(); }, [loadKvNotes]);
  React.useEffect(() => { loadDbNotes(); }, [loadDbNotes]);

  const showTemporary = (setter, value) => {
    setter(value);
    window.setTimeout(() => setter(''), 2200);
  };

  const submitContact = async (event) => {
    event.preventDefault();
    setContactError(''); setContactSuccess(''); setContactLoading(true);
    try {
      if (!window.genmb || !window.genmb.contactForm || !window.genmb.contactForm.submit) throw new Error(t('capabilityContactUnavailable', 'Contact form service is not available right now.'));
      await window.genmb.contactForm.submit(contact);
      showTemporary(setContactSuccess, t('capabilityContactSuccess', 'Message sent to the TuTour team.'));
      setContact(authUser ? { ...emptyContact, name: authUser.name || '', email: authUser.email || '' } : emptyContact);
    } catch (err) {
      setContactError(err && err.message ? err.message : t('capabilityContactFailed', 'Could not send the message.'));
    } finally {
      setContactLoading(false);
    }
  };

  const addKvNote = async (event) => {
    event.preventDefault();
    if (!kvText.trim()) return;
    setKvLoading(true); setKvError(''); setKvSuccess('');
    try {
      if (!window.genmb || !window.genmb.kv || !window.genmb.kv.set) throw new Error(t('capabilityKvUnavailable', 'Key-value storage is not available right now.'));
      const note = { id: newId(), text: kvText.trim(), userId: authUser && authUser.id ? authUser.id : 'guest', createdAt: Date.now() };
      await window.genmb.kv.set(`${kvScope(authUser)}${note.id}`, note);
      setKvNotes(prev => [note, ...prev]);
      setKvText('');
      showTemporary(setKvSuccess, t('capabilityKvSaved', 'Quick note saved.'));
    } catch (err) {
      setKvError(err && err.message ? err.message : t('capabilityKvSaveFailed', 'Could not save quick note.'));
    } finally {
      setKvLoading(false);
    }
  };

  const deleteKvNote = async (note) => {
    setKvLoading(true); setKvError(''); setKvSuccess('');
    try {
      if (!window.genmb || !window.genmb.kv || !window.genmb.kv.delete) throw new Error(t('capabilityKvUnavailable', 'Key-value storage is not available right now.'));
      await window.genmb.kv.delete(`${kvScope(authUser)}${note.id}`);
      setKvNotes(prev => prev.filter(item => item.id !== note.id));
      showTemporary(setKvSuccess, t('capabilityKvDeleted', 'Quick note deleted.'));
    } catch (err) {
      setKvError(err && err.message ? err.message : t('capabilityKvDeleteFailed', 'Could not delete quick note.'));
    } finally {
      setKvLoading(false);
    }
  };

  const addDbNote = async (event) => {
    event.preventDefault();
    if (!authUser || !authUser.id || !dbText.trim()) return;
    setDbLoading(true); setDbError(''); setDbSuccess('');
    try {
      const table = dbTable();
      if (!table || !table.create) throw new Error(t('capabilityDbUnavailable', 'Relational database table travel_notes is not configured yet.'));
      const created = await table.create({ user_id: authUser.id, text: dbText.trim(), language, createdAt: new Date().toISOString() });
      setDbNotes(prev => [created, ...prev]);
      setDbText('');
      showTemporary(setDbSuccess, t('capabilityDbSaved', 'Database note saved.'));
    } catch (err) {
      setDbError(err && err.message ? err.message : t('capabilityDbSaveFailed', 'Could not save database note.'));
    } finally {
      setDbLoading(false);
    }
  };

  const deleteDbNote = async (note) => {
    if (!authUser || !authUser.id || !note || !note.id) return;
    const ok = window.confirm(t('capabilityDbDeleteConfirm', 'Delete this database note?'));
    if (!ok) return;
    setDbLoading(true); setDbError(''); setDbSuccess('');
    try {
      const table = dbTable();
      if (!table || !table.delete) throw new Error(t('capabilityDbUnavailable', 'Relational database table travel_notes is not configured yet.'));
      await table.delete(note.id);
      setDbNotes(prev => prev.filter(item => item.id !== note.id));
      showTemporary(setDbSuccess, t('capabilityDbDeleted', 'Database note deleted.'));
    } catch (err) {
      setDbError(err && err.message ? err.message : t('capabilityDbDeleteFailed', 'Could not delete database note.'));
    } finally {
      setDbLoading(false);
    }
  };

  const translateSample = async (event) => {
    event.preventDefault();
    setTranslationLoading(true); setTranslationError(''); setTranslationSuccess(''); setTranslatedText('');
    try {
      if (!window.genmb || !window.genmb.translate || !window.genmb.translate.text) throw new Error(t('capabilityTranslateUnavailable', 'Translation service is not available right now.'));
      const result = await window.genmb.translate.text(sourceText, language);
      setTranslatedText(result && result.translated ? result.translated : sourceText);
      showTemporary(setTranslationSuccess, t('translateSuccess', 'Translated successfully!'));
    } catch (err) {
      setTranslationError(err && err.message ? err.message : t('translateFailed', 'Translation failed. Showing the original text.'));
    } finally {
      setTranslationLoading(false);
    }
  };

  const searchPlaces = async (event) => {
    event.preventDefault();
    setPlacesLoading(true); setPlacesError(''); setPlacesSuccess(''); setPlaceResults([]);
    try {
      if (!window.genmb || !window.genmb.maps || !window.genmb.maps.places || !window.genmb.maps.places.search) throw new Error(t('capabilityMapsUnavailable', 'Maps & Places service is not available right now.'));
      const result = await window.genmb.maps.places.search(placeQuery, { location: 'Oaxaca, Mexico', language });
      const results = (result && result.results ? result.results : []).slice(0, 5);
      setPlaceResults(results);
      showTemporary(setPlacesSuccess, results.length ? t('capabilityPlacesFound', 'Places search completed.') : t('noResults', 'No results found.'));
    } catch (err) {
      setPlacesError(err && err.message ? err.message : t('capabilityPlacesFailed', 'Could not search Google Places.'));
    } finally {
      setPlacesLoading(false);
    }
  };

  const inputClass = 'focus-ring min-h-[42px] w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 text-sm font-semibold disabled:opacity-60';
  const cardClass = 'rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-sm)]';
  const buttonClass = 'focus-ring inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-3 text-sm font-black text-[hsl(var(--primary-foreground))] disabled:opacity-60';

  return html`<section className="grid gap-3">
    <div className="grid gap-3 lg:grid-cols-2">
      <div className=${cardClass}>
        <h3 className="flex items-center gap-2 text-lg font-black"><${Mail} className="h-5 w-5 text-[hsl(var(--primary))]" />${t('capabilityContactTitle', 'Contact TuTour')}</h3>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">${t('capabilityContactIntro', 'Send a real message through the GenMB contact form connector.')}</p>
        ${contactError ? html`<p role="alert" className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2 text-xs font-bold text-[hsl(var(--destructive))]">${contactError}</p>` : null}
        ${contactSuccess ? html`<p className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold text-[hsl(var(--secondary))]">${contactSuccess}</p>` : null}
        <form onSubmit=${submitContact} className="mt-3 grid gap-2">
          <input value=${contact.name} onInput=${e => setContact(prev => ({ ...prev, name: e.target.value }))} disabled=${contactLoading} placeholder=${t('capabilityName', 'Name')} className=${inputClass} />
          <input type="email" value=${contact.email} onInput=${e => setContact(prev => ({ ...prev, email: e.target.value }))} disabled=${contactLoading} placeholder=${t('capabilityEmail', 'Email')} className=${inputClass} />
          <input value=${contact.subject} onInput=${e => setContact(prev => ({ ...prev, subject: e.target.value }))} disabled=${contactLoading} placeholder=${t('capabilitySubject', 'Subject')} className=${inputClass} />
          <textarea value=${contact.message} onInput=${e => setContact(prev => ({ ...prev, message: e.target.value }))} disabled=${contactLoading} placeholder=${t('capabilityMessage', 'How can we help?')} className="focus-ring min-h-[96px] w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-sm font-semibold disabled:opacity-60"></textarea>
          <button type="submit" disabled=${contactLoading || !contact.name.trim() || !contact.email.trim() || !contact.message.trim()} className=${buttonClass}>${contactLoading ? html`<${Loader2} className="h-4 w-4 animate-spin" />${t('loading', 'Loading...')}` : html`<${Mail} className="h-4 w-4" />${t('send', 'Send')}`}</button>
        </form>
      </div>

      <div className=${cardClass}>
        <h3 className="flex items-center gap-2 text-lg font-black"><${Languages} className="h-5 w-5 text-[hsl(var(--primary))]" />${t('translateDemo', 'Translation Test')}</h3>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">${t('capabilityTranslateIntro', 'Translate guide text into the current app language using the Translation SDK.')}</p>
        ${translationError ? html`<p role="alert" className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2 text-xs font-bold text-[hsl(var(--destructive))]">${translationError}</p>` : null}
        ${translationSuccess ? html`<p className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold text-[hsl(var(--secondary))]">${translationSuccess}</p>` : null}
        <form onSubmit=${translateSample} className="mt-3 grid gap-2">
          <textarea value=${sourceText} onInput=${e => setSourceText(e.target.value)} disabled=${translationLoading} className="focus-ring min-h-[92px] w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-sm font-semibold disabled:opacity-60"></textarea>
          <button type="submit" disabled=${translationLoading || !sourceText.trim()} className=${buttonClass}>${translationLoading ? html`<${Loader2} className="h-4 w-4 animate-spin" />${t('translating', 'Translating...')}` : html`<${Languages} className="h-4 w-4" />${t('translateTest', 'Test Translation')}`}</button>
        </form>
        <div className="mt-3 rounded-[var(--radius-md)] border border-dashed border-[hsl(var(--border))] p-3 text-sm font-semibold text-[hsl(var(--muted-foreground))]">${translatedText || t('capabilityTranslationEmpty', 'Translated text appears here.')}</div>
      </div>

      <div className=${cardClass}>
        <h3 className="flex items-center gap-2 text-lg font-black"><${WalletCards} className="h-5 w-5 text-[hsl(var(--primary))]" />${t('capabilityKvTitle', 'Quick notes (KV Store)')}</h3>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">${t('capabilityKvIntro', 'Save small travel reminders in a user-scoped key-value namespace.')}</p>
        ${kvError ? html`<p role="alert" className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2 text-xs font-bold text-[hsl(var(--destructive))]">${kvError}</p>` : null}
        ${kvSuccess ? html`<p className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold text-[hsl(var(--secondary))]">${kvSuccess}</p>` : null}
        <form onSubmit=${addKvNote} className="mt-3 flex gap-2"><input value=${kvText} onInput=${e => setKvText(e.target.value)} disabled=${kvLoading} placeholder=${t('capabilityKvPlaceholder', 'Example: buy mezcal tasting tickets')} className=${inputClass} /><button type="submit" disabled=${kvLoading || !kvText.trim()} className=${buttonClass}>${kvLoading ? html`<${Loader2} className="h-4 w-4 animate-spin" />` : html`<${PlusCircle} className="h-4 w-4" />`}</button></form>
        <div className="mt-3 grid gap-2">${kvLoading && !kvNotes.length ? html`<p className="text-sm font-bold text-[hsl(var(--muted-foreground))]">${t('loading', 'Loading...')}</p>` : kvNotes.length ? kvNotes.map(note => html`<div key=${note.id} className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-2 text-sm font-semibold"><span className="min-w-0 flex-1">${note.text}</span><button type="button" onClick=${() => deleteKvNote(note)} disabled=${kvLoading} className="focus-ring rounded-[var(--radius-sm)] p-1 text-[hsl(var(--destructive))] disabled:opacity-60"><${Trash2} className="h-4 w-4" /><span className="sr-only">${t('capabilityDelete', 'Delete')}</span></button></div>`) : html`<p className="rounded-[var(--radius-md)] border border-dashed border-[hsl(var(--border))] p-3 text-sm font-bold text-[hsl(var(--muted-foreground))]">${t('capabilityKvEmpty', 'No quick notes saved yet.')}</p>`}</div>
      </div>

      <div className=${cardClass}>
        <h3 className="flex items-center gap-2 text-lg font-black"><${Database} className="h-5 w-5 text-[hsl(var(--primary))]" />${t('capabilityDbTitle', 'Trip notes (Relational DB)')}</h3>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">${t('capabilityDbIntro', 'Signed-in travelers can save structured records with their user ID.')}</p>
        ${dbError ? html`<p role="alert" className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2 text-xs font-bold text-[hsl(var(--destructive))]">${dbError}</p>` : null}
        ${dbSuccess ? html`<p className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold text-[hsl(var(--secondary))]">${dbSuccess}</p>` : null}
        ${!authUser ? html`<p className="mt-3 rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-3 text-sm font-bold">${t('capabilityDbSignIn', 'Sign in to use relational database notes.')}</p>` : html`<form onSubmit=${addDbNote} className="mt-3 flex gap-2"><input value=${dbText} onInput=${e => setDbText(e.target.value)} disabled=${dbLoading} placeholder=${t('capabilityDbPlaceholder', 'Example: ask hotel about taxi pickup')} className=${inputClass} /><button type="submit" disabled=${dbLoading || !dbText.trim()} className=${buttonClass}>${dbLoading ? html`<${Loader2} className="h-4 w-4 animate-spin" />` : html`<${PlusCircle} className="h-4 w-4" />`}</button></form>`}
        <div className="mt-3 grid gap-2">${dbLoading && !dbNotes.length ? html`<p className="text-sm font-bold text-[hsl(var(--muted-foreground))]">${t('loading', 'Loading...')}</p>` : dbNotes.length ? dbNotes.map(note => html`<div key=${note.id} className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-2 text-sm font-semibold"><span className="min-w-0 flex-1">${note.text || note.title || note.note || t('savedTrip', 'Saved trip')}</span><button type="button" onClick=${() => deleteDbNote(note)} disabled=${dbLoading} className="focus-ring rounded-[var(--radius-sm)] p-1 text-[hsl(var(--destructive))] disabled:opacity-60"><${Trash2} className="h-4 w-4" /><span className="sr-only">${t('capabilityDelete', 'Delete')}</span></button></div>`) : html`<p className="rounded-[var(--radius-md)] border border-dashed border-[hsl(var(--border))] p-3 text-sm font-bold text-[hsl(var(--muted-foreground))]">${t('capabilityDbEmpty', 'No database notes yet.')}</p>`}</div>
      </div>

      <div className=${`${cardClass} lg:col-span-2`}>
        <h3 className="flex items-center gap-2 text-lg font-black"><${MapPin} className="h-5 w-5 text-[hsl(var(--primary))]" />${t('capabilityPlacesTitle', 'Maps & Places search')}</h3>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">${t('capabilityPlacesIntro', 'Search Google Places for fresh Oaxaca stops, then open the full map page for routing.')}</p>
        ${placesError ? html`<p role="alert" className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2 text-xs font-bold text-[hsl(var(--destructive))]">${placesError}</p>` : null}
        ${placesSuccess ? html`<p className="mt-2 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold text-[hsl(var(--secondary))]">${placesSuccess}</p>` : null}
        <form onSubmit=${searchPlaces} className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]"><input value=${placeQuery} onInput=${e => setPlaceQuery(e.target.value)} disabled=${placesLoading} className=${inputClass} /><button type="submit" disabled=${placesLoading || !placeQuery.trim()} className=${buttonClass}>${placesLoading ? html`<${Loader2} className="h-4 w-4 animate-spin" />${t('loading', 'Loading...')}` : html`<${Search} className="h-4 w-4" />${t('search', 'Search')}`}</button></form>
        <div className="mt-3 grid gap-2 md:grid-cols-2">${placesLoading && !placeResults.length ? html`<p className="text-sm font-bold text-[hsl(var(--muted-foreground))]">${t('loading', 'Loading...')}</p>` : placeResults.length ? placeResults.map((place, index) => html`<article key=${place.place_id || place.id || index} className="rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-3"><h4 className="font-black">${place.name || place.displayName || t('map', 'Map')}</h4><p className="mt-1 text-xs font-bold text-[hsl(var(--muted-foreground))]">${place.formatted_address || place.formattedAddress || place.vicinity || 'Oaxaca, México'}</p><p className="mt-1 text-xs font-black">${place.rating ? `★ ${place.rating}` : t('capabilityPlacesLive', 'Live Places result')}</p></article>`) : html`<p className="rounded-[var(--radius-md)] border border-dashed border-[hsl(var(--border))] p-3 text-sm font-bold text-[hsl(var(--muted-foreground))]">${t('capabilityPlacesEmpty', 'Search results appear here.')}</p>`}</div>
      </div>
    </div>
  </section>`;
}

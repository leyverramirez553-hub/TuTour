import React from 'react';
import {CheckCircle2, ChevronDown, LocateFixed, LogIn, LogOut, Mail, MapPin, Settings as SettingsIcon, Trash2, UserRound, Users, X} from 'lucide-react';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { languages } from '../data/i18n.js';
import { useLanguage } from '../i18n.js';

const settingsHeroImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Z%C3%B3calo%20Oaxaca%20de%20Ju%C3%A1rez%20Mexico.jpg?width=1400';

export function Settings() {
  const { t, language: lang, setLanguage } = useLanguage();
  const dark = useGuideStore(s => s.dark);
  const toggleDark = useGuideStore(s => s.toggleDark);
  const currency = useGuideStore(s => s.currency);
  const setCurrency = useGuideStore(s => s.setCurrency);
  const pace = useGuideStore(s => s.pace);
  const setPace = useGuideStore(s => s.setPace);
  const transport = useGuideStore(s => s.transport);
  const setTransport = useGuideStore(s => s.setTransport);
  const userLocation = useGuideStore(s => s.userLocation);
  const setUserLocation = useGuideStore(s => s.setUserLocation);
  const resetStore = useGuideStore(s => s.resetStore);
  const profile = useGuideStore(s => s.profile || {});
  const updateProfile = useGuideStore(s => s.updateProfile || s.setProfile);

  const [profileOpen, setProfileOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [profileSaveError, setProfileSaveError] = React.useState('');
  const [locating, setLocating] = React.useState(false);
  const [locationMessage, setLocationMessage] = React.useState('');
  const [locationError, setLocationError] = React.useState('');
  const [authLoading, setAuthLoading] = React.useState(true);
  const [authUser, setAuthUser] = React.useState(null);
  const [authError, setAuthError] = React.useState('');
  const [authSuccess, setAuthSuccess] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [logoutLoading, setLogoutLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    const auth = window.genmb && window.genmb.auth;
    if (!auth || !auth.ready || !auth.onAuthStateChange) {
      setAuthLoading(false);
      return undefined;
    }
    auth.ready().then(() => {
      if (!active) return;
      setAuthUser(auth.getUser ? auth.getUser() : null);
      setAuthLoading(false);
    }).catch(() => {
      if (!active) return;
      setAuthError(t('authTempUnavailable', 'Authentication is temporarily unavailable.'));
      setAuthLoading(false);
    });
    const unsubscribe = auth.onAuthStateChange(user => {
      if (active) setAuthUser(user || null);
    });
    return () => {
      active = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [lang]);

  const clearAuthFeedback = () => {
    setAuthError('');
    setAuthSuccess('');
  };
  const showAuthSuccess = (message) => {
    setAuthSuccess(message);
    window.setTimeout(() => setAuthSuccess(''), 2400);
  };

  const handleGoogleLogin = async () => {
    clearAuthFeedback();
    if (!window.genmb || !window.genmb.auth || !window.genmb.auth.signIn) {
      setAuthError(t('googleSignInUnavailable', 'Google sign-in is not available right now.'));
      return;
    }
    setGoogleLoading(true);
    try {
      const user = await window.genmb.auth.signIn();
      if (user) showAuthSuccess(`${t('signedInAs', 'Signed in as')} ${user.name || user.email || t('traveler', 'traveler')}.`);
    } catch (err) {
      setAuthError(err && err.message ? err.message : t('signInFailed', 'Sign-in failed.'));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleMagicLink = async (event) => {
    event.preventDefault();
    clearAuthFeedback();
    if (!email.trim()) {
      setAuthError(t('enterEmailMagicLink', 'Enter your email to receive a magic link.'));
      return;
    }
    if (!window.genmb || !window.genmb.auth || !window.genmb.auth.sendMagicLink) {
      setAuthError(t('emailSignInUnavailable', 'Email sign-in is not available right now.'));
      return;
    }
    setEmailLoading(true);
    try {
      await window.genmb.auth.sendMagicLink(email.trim());
      showAuthSuccess(t('checkEmailSignInLink', 'Check your email for a sign-in link.'));
    } catch (err) {
      setAuthError(err && err.message ? err.message : t('unableSendMagicLink', 'Unable to send magic link.'));
    } finally {
      setEmailLoading(false);
    }
  };

  const handleLogout = async () => {
    clearAuthFeedback();
    if (!window.genmb || !window.genmb.auth || !window.genmb.auth.signOut) {
      setAuthError(t('signOutUnavailable', 'Sign out is not available right now.'));
      return;
    }
    setLogoutLoading(true);
    try {
      await window.genmb.auth.signOut();
      showAuthSuccess(t('signedOutSuccessfully', 'Signed out successfully.'));
    } catch (err) {
      setAuthError(err && err.message ? err.message : t('signOutFailed', 'Sign out failed.'));
    } finally {
      setLogoutLoading(false);
    }
  };

  const savedLat = userLocation && Number.isFinite(Number(userLocation.lat)) ? Number(userLocation.lat) : null;
  const savedLng = userLocation && Number.isFinite(Number(userLocation.lng)) ? Number(userLocation.lng) : null;
  const hasSavedLocation = savedLat !== null && savedLng !== null;
  const savedAccuracy = userLocation && Number.isFinite(Number(userLocation.accuracy)) ? Number(userLocation.accuracy) : 0;
  const control = 'focus-ring min-h-[42px] w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 text-sm font-semibold';
  const save = () => {
    setProfileSaveError('');
    try {
      if (typeof updateProfile !== 'function') throw new Error('Profile saving is not available right now.');
      updateProfile({ lastSavedAt: new Date().toISOString() });
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setSaved(false);
      setProfileSaveError(err && err.message ? err.message : 'Profile saving failed.');
    }
  };
  const setProfile = (key, value) => {
    setProfileSaveError('');
    if (typeof updateProfile !== 'function') {
      setProfileSaveError('Profile saving is not available right now.');
      return;
    }
    updateProfile({ [key]: value });
    setSaved(false);
  };
  const locate = () => {
    setLocationError(''); setLocationMessage('');
    if (!navigator.geolocation) { setLocationError(t('locationUnavailable')); return; }
    setLocating(true);
    try {
      navigator.geolocation.getCurrentPosition(
        pos => { setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: Math.round(pos.coords.accuracy || 0), updatedAt: new Date().toISOString() }); setLocationMessage(t('locationSaved')); setLocating(false); },
        err => { setLocationError(err.code === 1 ? t('locationDenied') : t('locationError')); setLocating(false); },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
      );
    } catch (err) { setLocationError(t('locationError')); setLocating(false); }
  };
  const clearLocation = () => { setUserLocation(null); setLocationError(''); setLocationMessage(t('locationCleared')); };
  const toggleInterest = (value) => {
    const current = Array.isArray(profile.interests) ? profile.interests : [];
    setProfile('interests', current.includes(value) ? current.filter(i => i !== value) : [...current, value]);
  };
  const interestOptions = ['food', 'culture', 'nature', 'markets', 'mezcal', 'artisan', 'dayTrips'];
  const options = {
    travelerType: ['solo', 'couple', 'family', 'friends', 'business'],
    ageRange: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    tripLength: ['1-2', '3-5', '6-9', '10+'],
    firstVisit: ['yes', 'no', 'unsure'],
    budget: ['low', 'mid', 'high', 'luxury'],
    accommodationArea: ['centro', 'north', 'east', 'outside'],
    dietary: ['none', 'vegetarian', 'vegan', 'glutenFree', 'halalKosher'],
    accessibility: ['none', 'mobility', 'visual', 'hearing'],
    planningGoal: ['authentic', 'comfort', 'adventure', 'learning', 'nightlife', 'wellness']
  };
  const selectField = (key) => html`<label className="grid gap-1.5"><span className="text-sm font-bold">${t(key)}</span><select value=${profile[key] || options[key][0]} onChange=${e => setProfile(key, e.target.value)} className=${control}>${options[key].map(v => html`<option key=${v} value=${v}>${t(v)}</option>`)}</select></label>`;

  return html`
    <div className="grid gap-4 min-w-0 pb-20">
      <section className="relative overflow-hidden rounded-[var(--radius-lg)] bg-slate-950 border border-[hsl(var(--border))] p-4 text-white shadow-[var(--shadow-sm)]">
        <div className="absolute inset-0 bg-cover bg-center opacity-42" style=${{ backgroundImage: `linear-gradient(120deg, rgba(0,0,0,.76), rgba(0,0,0,.30)), url(${settingsHeroImage})` }}></div>
        <div className="relative">
          <h1 className="flex items-center gap-2 text-2xl md:text-4xl font-black"><${SettingsIcon} className="h-6 w-6 text-yellow-300" />${t('settings')}</h1>
          <p className="mt-1.5 text-sm font-semibold text-white/88">${t('settingsIntro')}</p>
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 shadow-[var(--shadow-sm)] grid gap-3">
        <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]"><${UserRound} className="h-5 w-5" /></span><div><h2 className="text-xl font-black">${t('account', 'Account')}</h2><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">${t('accountSyncIntro', 'Sign in to sync your travel planning context across supported sessions.')}</p></div></div>
        ${authLoading ? html`<p className="rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-2.5 text-sm font-bold">${t('loadingAccount', 'Loading account…')}</p>` : null}
        ${authError ? html`<p role="alert" className="rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2.5 text-sm font-bold text-[hsl(var(--destructive))]">${authError}</p>` : null}
        ${authSuccess ? html`<p className="rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2.5 text-sm font-bold text-[hsl(var(--secondary))]">${authSuccess}</p>` : null}
        ${authUser ? html`<div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-3"><div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-[hsl(var(--primary)/0.15)]">${authUser.picture ? html`<img src=${authUser.picture} alt=${authUser.name || authUser.email || t('traveler', 'Traveler')} className="h-full w-full object-cover" referrerPolicy="no-referrer" />` : html`<${CheckCircle2} className="h-5 w-5 text-[hsl(var(--primary))]" />`}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-black">${authUser.name || t('traveler', 'Traveler')}</p><p className="truncate text-xs text-[hsl(var(--muted-foreground))]">${authUser.email || t('signedIn', 'Signed in')}</p></div><button onClick=${handleLogout} disabled=${logoutLoading} className="focus-ring inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[hsl(var(--border))] px-3 text-sm font-black disabled:opacity-60"><${LogOut} className="h-4 w-4" />${logoutLoading ? t('signingOut', 'Signing out…') : t('logout')}</button></div>` : html`<div className="grid gap-2 sm:grid-cols-[1fr_auto]"><form onSubmit=${handleMagicLink} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end"><label className="grid gap-1.5"><span className="text-sm font-bold">${t('email', 'Email')}</span><input type="email" value=${email} onInput=${e => setEmail(e.target.value)} placeholder=${t('emailPlaceholder', 'you@example.com')} className=${control} disabled=${emailLoading || googleLoading} /></label><button type="submit" disabled=${emailLoading || googleLoading} className="focus-ring inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[hsl(var(--border))] px-4 text-sm font-black disabled:opacity-60"><${Mail} className="h-4 w-4" />${emailLoading ? t('sending', 'Sending…') : t('magicLink', 'Magic link')}</button></form><button onClick=${handleGoogleLogin} disabled=${googleLoading || emailLoading} className="focus-ring inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-4 text-sm font-black text-[hsl(var(--primary-foreground))] disabled:opacity-60"><${LogIn} className="h-4 w-4" />${googleLoading ? t('signingIn', 'Signing in…') : t('continueWithGoogle', 'Continue with Google')}</button></div>`}
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-[var(--radius-lg)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 shadow-[var(--shadow-sm)] grid gap-3">
          <h2 className="text-xl font-black">${t('preferences')}</h2>
          <label className="grid gap-1.5"><span className="text-sm font-bold">${t('language')}</span><select value=${lang} onChange=${e => setLanguage(e.target.value)} className=${control}>${languages.map(l => html`<option key=${l.code} value=${l.code}>${l.nativeLabel || l.label}${l.englishLabel && l.englishLabel !== (l.nativeLabel || l.label) ? ` — ${l.englishLabel}` : ''}</option>`)}</select></label>
          <label className="grid gap-1.5"><span className="text-sm font-bold">${t('currency')}</span><select value=${currency || 'MXN'} onChange=${e => setCurrency(e.target.value)} className=${control}><option value="MXN">MXN</option><option value="USD">USD</option><option value="EUR">EUR</option></select></label>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 shadow-[var(--shadow-sm)] grid gap-3">
          <h2 className="text-xl font-black">${t('routePrefs')}</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1.5"><span className="text-sm font-bold">${t('pace_text') || t('pace')}</span><select value=${pace} onChange=${e => setPace(e.target.value)} className=${control}><option value="relaxed">${t('relaxed')}</option><option value="balanced">${t('balanced')}</option><option value="packed">${t('packed_text') || t('packed')}</option></select></label>
            <label className="grid gap-1.5"><span className="text-sm font-bold">${t('transport')}</span><select value=${transport} onChange=${e => setTransport(e.target.value)} className=${control}><option value="walkTaxi">${t('walkTaxi')}</option><option value="driver">${t('driver')}</option><option value="public">${t('public')}</option></select></label>
          </div>
          <button onClick=${toggleDark} className="focus-ring min-h-[42px] rounded-[var(--radius-md)] bg-[hsl(var(--accent))] px-4 text-sm font-black text-black">${dark ? t('lightMode') : t('darkMode')}</button>
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 shadow-[var(--shadow-sm)] grid gap-3">
        <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] text-[hsl(var(--secondary))]"><${MapPin} className="h-5 w-5" /></span><div><h2 className="text-xl font-black">${t('location')}</h2><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">${t('locationIntro')}</p></div></div>
        ${hasSavedLocation ? html`<p className="rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-2.5 text-sm font-bold">${t('savedLocation')}: ${savedLat.toFixed(5)}, ${savedLng.toFixed(5)}${savedAccuracy ? ` · ±${savedAccuracy}m` : ''}</p>` : null}
        ${locationError ? html`<p role="alert" className="rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2.5 text-sm font-bold text-[hsl(var(--destructive))]">${locationError}</p>` : null}
        ${locationMessage ? html`<p className="rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2.5 text-sm font-bold text-[hsl(var(--secondary))]">${locationMessage}</p>` : null}
        <div className="grid gap-2 sm:grid-cols-2">
          <button onClick=${locate} disabled=${locating} className="focus-ring min-h-[42px] inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-4 text-sm font-black text-[hsl(var(--primary-foreground))] disabled:opacity-60"><${LocateFixed} className="h-4 w-4" />${locating ? t('loading') : (hasSavedLocation ? t('updateLocation') : t('useCurrentLocation'))}</button>
          <button onClick=${clearLocation} disabled=${locating || !hasSavedLocation} className="focus-ring min-h-[42px] inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[hsl(var(--border))] px-4 text-sm font-black disabled:opacity-50"><${X} className="h-4 w-4" />${t('clearLocation')}</button>
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-2 shadow-[var(--shadow-sm)] min-w-0">
        <button type="button" onClick=${() => setProfileOpen(!profileOpen)} aria-expanded=${profileOpen} aria-controls="tourism-profile-panel" className=${`focus-ring flex min-h-[48px] w-full items-center justify-between gap-3 rounded-[var(--radius-md)] px-3 py-2 text-left ${profileOpen ? 'bg-[hsl(var(--muted))]' : 'bg-[hsl(var(--primary)/0.10)] hover:bg-[hsl(var(--primary)/0.14)]'}`}>
          <span className="flex items-center gap-2 min-w-0"><${Users} className="h-4.5 w-4.5 shrink-0 text-[hsl(var(--primary))]" /><span className="min-w-0"><strong className="block text-base font-black leading-tight">${t('buildProfile')}</strong><span className="block truncate text-xs text-[hsl(var(--muted-foreground))]">${t('profileIntro')}</span></span></span>
          <${ChevronDown} className=${`h-5 w-5 shrink-0 transition ${profileOpen ? 'rotate-180' : ''}`} />
        </button>
        ${profileOpen ? html`<div id="tourism-profile-panel" className="mt-3 grid gap-3 px-2 pb-2">
          <div className="grid gap-3 md:grid-cols-3">
            ${selectField('travelerType')}
            <label className="grid gap-1.5"><span className="text-sm font-bold">${t('groupSize')}</span><input type="number" min="1" max="20" value=${profile.groupSize || '2'} onInput=${e => setProfile('groupSize', e.target.value)} className=${control} /></label>
            ${selectField('ageRange')}
            ${selectField('tripLength')}
            ${selectField('firstVisit')}
            ${selectField('budget')}
            ${selectField('accommodationArea')}
            ${selectField('dietary')}
            ${selectField('accessibility')}
            ${selectField('planningGoal')}
          </div>
          <div className="grid gap-2"><span className="text-sm font-bold">${t('topInterests')}</span><div className="flex flex-wrap gap-2">${interestOptions.map(i => html`<button key=${i} type="button" onClick=${() => toggleInterest(i)} className=${`focus-ring min-h-[34px] rounded-full px-3 py-1 text-xs font-black ${(profile.interests || []).includes(i) ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--muted))]'}`}>${t(i)}</button>`)}</div></div>
          ${profileSaveError ? html`<p role="alert" className="rounded-[var(--radius-md)] bg-[hsl(var(--destructive)/0.12)] p-2.5 text-sm font-bold text-[hsl(var(--destructive))]">${profileSaveError}</p>` : null}
          ${saved ? html`<p className="rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2.5 text-sm font-bold text-[hsl(var(--secondary))]">${t('profileSaved')}</p>` : null}
          <button onClick=${save} className="focus-ring min-h-[42px] rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-4 text-sm font-black text-[hsl(var(--primary-foreground))]">${t('saveProfile')}</button>
        </div>` : null}
      </section>

      <section className="mt-6 px-2">
        <button onClick=${() => { if (confirm(t('resetConfirm'))) { resetStore(); alert(t('appReset')); window.location.reload(); } }} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-[hsl(var(--destructive)/0.2)] px-4 py-3 text-sm font-black text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.05)] transition-all uppercase tracking-wider"><${Trash2} className="h-4 w-4" />${t('resetApp')}</button>
      </section>
    </div>
  `;
}

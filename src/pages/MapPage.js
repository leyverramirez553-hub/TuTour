import React from 'react';
import {Car, Loader2, MapPin, PlusCircle, Route, Sparkles} from 'lucide-react';
import { html } from '../jsx.js';
import { places, placeMapLink, requestedMapLink } from '../data/places.js';
import { PlaceCard } from '../components/PlaceCard.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { t } from '../data/i18n.js';
import { localizedGoogleMapsUrl } from '../utils/googleMapsLinks.js';
import { isCloseToOaxacaCentro, isMezcalItineraryPlace } from '../utils/itinerary.js';
import { placeForPlacesPage, placesPageAdditionalCards, removedPlaceCardIds } from './Places.js';

export let leafletPromise = null;
export const mapPlaces = [...places, ...placesPageAdditionalCards].reduce((list, place) => {
  const displayPlace = placeForPlacesPage(place);
  if (!place || !displayPlace || removedPlaceCardIds.includes(place.id) || removedPlaceCardIds.includes(displayPlace.id) || displayPlace.category === 'coast') return list;
  list.push(displayPlace);
  return list;
}, []);
export const mapHeroImage = '/api/apps/romcWH54d4SR/assets/TuTourMapbackground.jpg';

export function loadLeaflet() {
  leafletPromise = leafletPromise || Promise.resolve(null);
  return leafletPromise;
}

export const categoryMeta = {
  food: { icon: '🍽️', color: '#d95f02' }, culture: { icon: '🏛️', color: '#7b3fb2' }, nature: { icon: '🌿', color: '#2f855a' }, markets: { icon: '🧺', color: '#c2410c' }, mezcal: { icon: '🥃', color: '#15803d' }, artisan: { icon: '🧶', color: '#be185d' }, dayTrips: { icon: '🚌', color: '#2563eb' }
};

export const archaeologicalIds = new Set(['monte-alban', 'mitla', 'yacula']);
export const morningOnlyIds = new Set(['hierve-el-agua']);
export const nightBlockedIds = new Set(['jardin-etnobotanico', 'museo-culturas', 'textile-museum', 'vida-nueva-cooperative', 'alfareria-dona-rosa', 'jacobo-maria-angeles', 'parador-turistico-real-matlatl-mezcaleria', 'taller-manos-magicas', 'alebrijes-oaxaca-magico']);
export const isArchaeologicalSite = (place) => archaeologicalIds.has(place.id) || /arqueol[óo]gica|archaeological|archaeology|ruins|ancient|zapotec.*city/i.test(`${place.name} ${place.bestFor} ${place.localTip}`);
export const slotAllowedForMapAdd = (place, slot) => {
  if (isMezcalItineraryPlace(place)) return slot === 'afternoon' || (slot === 'night' && isCloseToOaxacaCentro(place));
  if (morningOnlyIds.has(place.id)) return slot === 'morning';
  if (isArchaeologicalSite(place)) return slot === 'morning';
  if (nightBlockedIds.has(place.id)) return slot !== 'night';
  if (place.category === 'markets') return slot === 'morning';
  return true;
};

export const validCoordinate = (value) => Number.isFinite(Number(value));
export const hasValidCoords = (place) => place && validCoordinate(place.lat) && validCoordinate(place.lng);
export const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
export const mapLinkFor = (place, lang = 'en') => localizedGoogleMapsUrl((place && place.maps) || placeMapLink(place), lang);
export const requestedMapHref = (lang = 'en') => localizedGoogleMapsUrl(requestedMapLink, lang);

export const directionsHref = (place, mode = 'walking', userLocation = null, lang = 'en') => mapLinkFor(place, lang);

export function popupContent(place, lang, onSelect) {
  const wrap = document.createElement('button');
  wrap.type = 'button';
  wrap.className = 'grid w-[220px] max-w-[72vw] gap-1 rounded-xl bg-white p-2 text-left text-stone-900 shadow-xl';
  wrap.addEventListener('click', () => onSelect(place));
  const title = document.createElement('strong'); title.className = 'block text-sm leading-tight'; title.textContent = place.name;
  const meta = document.createElement('span'); meta.className = 'text-xs text-stone-600'; meta.textContent = `★ ${place.rating} · ${t(lang, place.category)}`;
  const hint = document.createElement('span'); hint.className = 'text-[11px] font-bold text-orange-800'; hint.textContent = t(lang, 'viewDetails');
  wrap.append(title, meta, hint);
  return wrap;
}

export function GoogleStopsMap({ lang, userLocation, selectedId, onSelect, onReady, onError, places: placesForMap = mapPlaces }) {
  const generatedId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const elementId = `tutour-google-map-${generatedId}`;
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;
    const renderGoogleMap = async () => {
      try {
        if (!window.genmb || !window.genmb.maps || typeof window.genmb.maps.render !== 'function') {
          throw new Error(t(lang, 'mapTilesUnavailable'));
        }
        const center = hasValidCoords(userLocation) ? { lat: Number(userLocation.lat), lng: Number(userLocation.lng) } : { lat: 17.061, lng: -96.724 };
        const visiblePlaces = placesForMap.filter(hasValidCoords);
        const markerPlaces = visiblePlaces.slice();
        const markers = visiblePlaces.map(place => ({
          lat: Number(place.lat),
          lng: Number(place.lng),
          title: place.name,
          label: (categoryMeta[place.category] && categoryMeta[place.category].icon) || place.emoji || '📍'
        }));
        if (hasValidCoords(userLocation)) {
          markers.unshift({ lat: Number(userLocation.lat), lng: Number(userLocation.lng), title: t(lang, 'mapSavedLocation'), label: '📍' });
          markerPlaces.unshift(null);
        }
        const map = await window.genmb.maps.render(elementId, { center, zoom: userLocation ? 14 : 12, markers });
        if (cancelled) return;
        const renderedMarkers = Array.isArray(map && map.markers) ? map.markers : [];
        renderedMarkers.forEach((marker, index) => {
          const place = markerPlaces[index];
          if (!place || !marker) return;
          try {
            if (typeof marker.addListener === 'function') marker.addListener('click', () => onSelect && onSelect(place));
            else if (typeof marker.on === 'function') marker.on('click', () => onSelect && onSelect(place));
          } catch (err) {}
        });
        mapRef.current = map;
        onReady && onReady('google');
      } catch (err) {
        if (!cancelled) onError && onError(err);
      }
    };
    renderGoogleMap();
    return () => {
      cancelled = true;
      if (mapRef.current && typeof mapRef.current.destroy === 'function') {
        try { mapRef.current.destroy(); } catch (err) {}
      }
      mapRef.current = null;
    };
  }, [elementId, lang, userLocation, placesForMap]);

  return html`<div className="relative h-full w-full">
    <div id=${elementId} className="h-full w-full" role="application" aria-label=${`${t(lang, 'map')} Google Maps Oaxaca`}></div>
    ${selectedId ? html`<div className="pointer-events-none absolute left-2 top-2 max-w-[75%] rounded-full bg-[hsl(var(--card)/0.92)] px-3 py-1 text-[11px] font-black text-[hsl(var(--foreground))] shadow-[var(--shadow-sm)] backdrop-blur">Google Maps · ${placesForMap.find(place => place.id === selectedId)?.name || 'Oaxaca'}</div>` : null}
  </div>`;
}

export const LeafletStopsMap = GoogleStopsMap;

export function SelectedPlaceCard({ place, lang, addToItinerary, userLocation }) {
  if (!place) return html`<div className="rounded-[var(--radius-lg)] border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-xs font-bold text-[hsl(var(--muted-foreground))]">${t(lang, 'mapIntro')}</div>`;
  return html`<div className="grid gap-2" aria-live="polite">
    <${PlaceCard} place=${place} />
    <div className="grid grid-cols-3 gap-1.5 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.82)] p-2 shadow-[var(--shadow-sm)]">
      <a href=${directionsHref(place, 'walking', userLocation, lang)} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-1 rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-2 py-1.5 text-[11px] font-black text-[hsl(var(--primary-foreground))]"><${Route} className="h-3 w-3" />${t(lang, 'walk')}</a>
      <a href=${directionsHref(place, 'driving', userLocation, lang)} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[hsl(var(--border))] px-2 py-1.5 text-[11px] font-black"><${Car} className="h-3 w-3" />${t(lang, 'drive')}</a>
      <button type="button" onClick=${() => addToItinerary(place)} className="focus-ring inline-flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[hsl(var(--border))] px-2 py-1.5 text-[11px] font-black"><${PlusCircle} className="h-3 w-3" />${t(lang, 'addToPlan')}</button>
    </div>
  </div>`;
}

export function MapPage() {
  const lang = useGuideStore(s => s.language), favorites = useGuideStore(s => s.favorites), toggleFavorite = useGuideStore(s => s.toggleFavorite), itinerary = useGuideStore(s => s.itinerary), setItinerary = useGuideStore(s => s.setItinerary), userLocation = useGuideStore(s => s.userLocation);
  const [status, setStatus] = React.useState('loading');
  const [message, setMessage] = React.useState('');
  const [added, setAdded] = React.useState('');
  const [selected, setSelected] = React.useState(mapPlaces.find(hasValidCoords) || mapPlaces[0] || null);
  const selectedPlace = selected && mapPlaces.find(place => place.id === selected.id) ? selected : (mapPlaces.find(hasValidCoords) || mapPlaces[0] || null);

  const addToItinerary = React.useCallback((place) => {
    const slots = ['morning', 'afternoon', 'night'];
    const withoutDuplicate = itinerary.filter(item => item && item.place && item.place.id !== place.id && item.place.category !== 'coast');
    const nextSlot = slots.find(slot => !withoutDuplicate.some(item => item.slot === slot) && slotAllowedForMapAdd(place, slot)) || slots.find(slot => slotAllowedForMapAdd(place, slot)) || 'morning';
    const next = [...withoutDuplicate.filter(item => item.slot !== nextSlot), { slot: nextSlot, place, note: `${t(lang, 'addFromMapNote')} ${place.area}.`, reason: `${t(lang, 'addFromMapReason')} ${t(lang, place.category)} · ★ ${place.rating}.` }];
    setItinerary(slots.map(slot => next.find(item => item.slot === slot)).filter(Boolean).slice(0, 3));
    setSelected(place); setAdded(`${place.name} ${t(lang, 'addedToItinerary')}`); window.setTimeout(() => setAdded(''), 2400);
  }, [itinerary, setItinerary, lang]);

  const handleMapError = React.useCallback((err) => { setStatus('ready'); setMessage(err && err.message ? err.message : t(lang, 'mapTilesUnavailable')); }, [lang]);

  return html`<div className="map-page grid gap-4 min-w-0">
    <section className="map-hero-card" aria-labelledby="map-title">
      <div className="map-hero-image" style=${{ backgroundImage: `url(${mapHeroImage})` }}></div>
      <div className="map-hero-content">
        <p className="map-kicker"><${MapPin} className="h-5 w-5" />Oaxaca, México</p>
        <h1 id="map-title"><span>${t(lang, 'mapHeroExplore')}</span><span className="text-yellow-400">Oaxaca</span><span>${t(lang, 'mapHeroOnMap')}</span></h1>
        <div className="map-wave" aria-hidden="true"><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span></div>
        <p>${t(lang, 'mapIntro')}</p>
        <div className="map-hero-pills"><span><${Sparkles} className="h-3.5 w-3.5" />${mapPlaces.length} ${t(lang, 'stopCount')}</span><span>Google Maps</span><span>${userLocation ? t(lang, 'mapSavedLocation') : t(lang, 'mapLiveLinks')}</span></div>
      </div>
    </section>

    <section className="map-panel-card">
      <div className="p-3 md:p-3.5"><h2 className="text-xl md:text-2xl font-black">${t(lang, 'map')}</h2><p className="mt-1 max-w-3xl text-xs md:text-sm text-[hsl(var(--muted-foreground))]">${t(lang, 'mapIntro')}</p></div>
      ${message ? html`<p role="status" className="mx-3 mb-2 rounded-[var(--radius-md)] bg-[hsl(var(--muted))] p-2 text-xs font-bold text-[hsl(var(--muted-foreground))]">${message}</p>` : null}
      ${added ? html`<p className="mx-3 mb-2 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold text-[hsl(var(--secondary))]">${added}</p>` : null}
      <div className="grid gap-2 px-3 pb-3 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="relative h-[28vh] min-h-[180px] max-h-[300px] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[hsl(var(--muted))] md:h-[32vh] md:min-h-[220px]">
          <${GoogleStopsMap} lang=${lang} userLocation=${userLocation} selectedId=${selectedPlace && selectedPlace.id} onSelect=${setSelected} onReady=${() => { setStatus('ready'); setMessage(''); }} onError=${handleMapError} places=${mapPlaces} />
          ${status === 'loading' ? html`<div className="absolute inset-0 z-10 grid place-items-center bg-[hsl(var(--card)/0.72)]"><span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--card))] px-4 py-2 text-sm font-black shadow-[var(--shadow-sm)]"><${Loader2} className="h-4 w-4 animate-spin" />${t(lang, 'loading')}</span></div>` : null}
        </div>
        <${SelectedPlaceCard} place=${selectedPlace} lang=${lang} favorites=${favorites} toggleFavorite=${toggleFavorite} addToItinerary=${addToItinerary} userLocation=${userLocation} />
      </div>
      <div className="grid gap-2 border-t border-[hsl(var(--border))] p-2.5 sm:flex sm:items-center sm:justify-between"><p className="text-[11px] font-bold text-[hsl(var(--muted-foreground))]">${mapPlaces.length} ${t(lang, 'stopCount')} · Google Maps · ${userLocation ? t(lang, 'mapSavedLocation') : 'Oaxaca, México'}</p></div>
    </section>
  </div>`;
}

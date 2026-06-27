import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isSlotAllowedForItineraryPlace } from '../utils/itinerary.js';

const defaultProfile = { travelerType: 'couple', groupSize: '2', ageRange: '25-34', tripLength: '3-5', firstVisit: 'yes', budget: 'mid', accommodationArea: 'centro', interests: ['food', 'culture'], dietary: 'none', accessibility: 'none', planningGoal: 'authentic' };
const removedCategoryIds = ['xochimilco-aqueduct', 'puerto-escondido', 'huatulco', 'el-tendajon-diego'];
const safeStorage = {
  getItem: (name) => { try { return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(name) : null; } catch (err) { return null; } },
  setItem: (name, value) => { try { if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem(name, value); } catch (err) {} },
  removeItem: (name) => { try { if (typeof window !== 'undefined' && window.localStorage) window.localStorage.removeItem(name); } catch (err) {} }
};
const safeArray = value => Array.isArray(value) ? value : [];
const safePersisted = persisted => (persisted && typeof persisted === 'object') ? persisted : {};
const safeLocation = value => {
  if (!value || typeof value !== 'object') return null;
  const lat = Number(value.lat), lng = Number(value.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { ...value, lat, lng, accuracy: Number.isFinite(Number(value.accuracy)) ? Number(value.accuracy) : 0 };
};
const itinerarySlots = ['morning', 'afternoon', 'night'];
const safeItinerary = value => {
  const items = [];
  safeArray(value).forEach(item => {
    if (!item || typeof item !== 'object' || !item.place || typeof item.place !== 'object' || !item.place.id || removedCategoryIds.includes(item.place.id) || item.place.category === 'coast') return;
    const slot = isSlotAllowedForItineraryPlace(item.place, item.slot) ? item.slot : itinerarySlots.find(candidate => isSlotAllowedForItineraryPlace(item.place, candidate));
    if (!slot) return;
    const normalized = { ...item, slot };
    const day = normalized.day || 1;
    const existingIndex = items.findIndex(existing => (existing.day || 1) === day && existing.slot === slot);
    if (existingIndex >= 0) items[existingIndex] = normalized;
    else items.push(normalized);
  });
  return items;
};
const safeSavedItineraries = value => safeArray(value).map(item => ({ ...safePersisted(item), itinerary: safeItinerary(item && item.itinerary) })).filter(item => (item.id || item.name || item.itinerary.length) && item.itinerary.length);
const safeFavorites = value => safeArray(value).filter(id => !removedCategoryIds.includes(id));

const initialState = {
  language: 'en', category: 'all', search: '', dark: false, itinerary: [], savedItineraries: [], favorites: [], offlineReady: false, currency: 'MXN', pace: 'balanced', transport: 'walkTaxi', profile: defaultProfile, userLocation: null
};

export const useGuideStore = create(persist((set, get) => ({
  ...initialState,
  setLanguage: (language) => set({ language }), setCategory: (category) => set({ category }), setSearch: (search) => set({ search }), toggleDark: () => set({ dark: !get().dark }), setItinerary: (itinerary) => set({ itinerary: safeItinerary(itinerary) }),
  saveItinerary: (itinerary, meta = {}) => set({ offlineReady: true, savedItineraries: [{ id: Date.now(), name: meta.name || 'Oaxaca 1-day trip', date: meta.date || new Date().toISOString().slice(0, 10), userId: meta.userId || 'local', itinerary: safeItinerary(itinerary) }, ...safeSavedItineraries(get().savedItineraries)].filter(item => item.itinerary.length).slice(0, 8) }),
  renameItinerary: (id, name) => set({ savedItineraries: safeSavedItineraries(get().savedItineraries).map(s => s.id === id ? { ...s, name } : s) }),
  deleteItinerary: (id) => set({ savedItineraries: safeSavedItineraries(get().savedItineraries).filter(s => s.id !== id) }),
  toggleFavorite: (id) => set({ favorites: removedCategoryIds.includes(id) ? safeFavorites(get().favorites) : (safeFavorites(get().favorites).includes(id) ? safeFavorites(get().favorites).filter(x => x !== id) : [...safeFavorites(get().favorites), id]), offlineReady: true }),
  setOfflineReady: (offlineReady) => set({ offlineReady }), setUserLocation: (userLocation) => set({ userLocation: safeLocation(userLocation) }), setCurrency: (currency) => set({ currency: currency || 'MXN' }),
  setProfile: (profile) => set({ profile: { ...defaultProfile, ...safePersisted(get().profile), ...safePersisted(profile) } }), updateProfile: (profile) => set({ profile: { ...defaultProfile, ...safePersisted(get().profile), ...safePersisted(profile) } }), setPace: (pace) => set({ pace }), setTransport: (transport) => set({ transport }), resetStore: () => set(initialState)
}), {
  name: 'tutour-guide-state-v5',
  storage: createJSONStorage(() => safeStorage),
  merge: (persistedState, currentState) => {
    const persisted = safePersisted(persistedState);
    return {
      ...currentState,
      ...persisted,
      itinerary: safeItinerary(persisted.itinerary),
      savedItineraries: safeSavedItineraries(persisted.savedItineraries),
      favorites: safeFavorites(persisted.favorites)
    };
  }
}));

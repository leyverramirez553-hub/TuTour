import React from 'react';
import { buildPlaceLocaleEntries } from './data/placeLocaleEntries.js';
import enLocale from './locales/en.json';
import esLocale from './locales/es.json';
import frLocale from './locales/fr.json';
import deLocale from './locales/de.json';
import itLocale from './locales/it.json';
import ptLocale from './locales/pt.json';
import jaLocale from './locales/ja.json';
import zhLocale from './locales/zh.json';

const bundledLocales = {
  en: enLocale,
  es: esLocale,
  fr: frLocale,
  de: deLocale,
  it: itLocale,
  pt: ptLocale,
  ja: jaLocale,
  zh: zhLocale
};

// Pre-bundled English fallback to ensure instantaneous first-paint render with zero delay or flicker
const enFallback = {
  "appName": "FOOD TOURS COMING SOON!!!",
  "saved": "Saved",
  "save": "Save",
  "saveTrip": "Save trip",
  "savedTrip": "Saved trip",
  "noSaved": "No saved trips or favorites yet.",
  "accountSaved": "Saved to this signed-in profile and this device.",
  "guestSaved": "Saved locally on this device until you sign in.",
  "photos": "Photos",
  "directions": "Directions",
  "addToPlan": "Add to plan",
  "addedToItinerary": "added to itinerary.",
  "addFromMapNote": "Added from the live map near",
  "addFromMapReason": "Selected from the map because it matches",
  "openingHours": "Opening hours",
  "estimatedCost": "Estimated cost",
  "bestTime": "Best time",
  "nearbyStops": "Nearby stops",
  "whatToBring": "What to bring",
  "accessibilityNotes": "Accessibility notes",
  "bookingTips": "Booking tips",
  "viewDetails": "View details",
  "view": "View",
  "regenerate": "Regenerate",
  "tripName": "Trip name",
  "loading": "Loading...",
  "translateFailed": "Some text could not be translated. Showing original recommendations.",
  "experiences": "Experiences",
  "experiencesIntro": "Booking-style Oaxaca activities with local context, safety notes, meeting points, prices, ratings, and language availability.",
  "bookingStyle": "Best of Oaxaca today",
  "reserve": "Check availability",
  "offlineMode": "Offline trip mode",
  "offlineReady": "Offline-ready",
  "offlineSaved": "Saved for offline trip mode.",
  "downloadPlan": "Download plan",
  "savedTripsFavorites": "Saved Trips & Favorites",
  "notFoundText": "This Oaxaca path is not on the guide map.",
  "multiDayPlan": "Multi-day trip",
  "buildMultiDayPlan": "Build multi-day plan",
  "multiDayIntro": "Plan several days before you arrive with morning, afternoon, and night stops ready for each day.",
  "tripLengthDays": "Trip length",
  "day": "Day",
  "description": "Description",
  "chatbot": "AI guide",
  "chatIntro": "Ask TuTour for Oaxaca recommendations, itinerary tweaks, food ideas, transport tips, and safety advice.",
  "chatEmpty": "Ask your Oaxaca guide anything.",
  "chatInput": "Chat message",
  "chatPlaceholder": "Ask about markets, safety, mezcal, rain plans...",
  "chatTyping": "TuTour is thinking...",
  "chatSuccess": "Reply received.",
  "chatFailed": "The AI guide could not reply. Please try again.",
  "chatUnavailable": "AI chatbot is not available right now.",
  "chatFallback": "Sorry, I could not reach the AI guide. You can still use the curated places, map, itinerary, and safety pages.",
  "chatSuggestFood": "Plan a safe food morning near Centro",
  "chatSuggestSafety": "What should I avoid at night?",
  "chatSuggestRain": "Suggest a rainy-day Oaxaca plan",
  "send": "Send",
  "travelStyle": "Travel style",
  "relaxedStyle": "Relaxed",
  "foodieStyle": "Foodie-focused",
  "cultureStyle": "Culture-heavy",
  "natureStyle": "Nature-heavy",
  "familyStyle": "Family-friendly",
  "budgetStyle": "Budget",
  "startLocation": "Starting area",
  "transportPref": "Transport",
  "walking": "Walking",
  "taxi": "Taxi",
  "mixed": "Mixed",
  "pace": "Pace",
  "balanced": "Balanced",
  "packed": "Packed",
  "budget": "Budget",
  "walkingTolerance": "Walking tolerance",
  "low": "Low",
  "medium": "Medium",
  "high": "High",
  "value": "Value",
  "midRange": "Mid-range",
  "premium": "Premium",
  "luxury": "Luxury",
  "preferredCategories": "Preferred categories",
  "mustSeeSaved": "Must-see saved places",
  "aiGuideTitle": "AI local guide",
  "aiGuideText": "Generate a personalized guide note in your selected language with pacing, local context, transport, and safety tips.",
  "aiGenerate": "Ask AI guide",
  "aiRegenerate": "Refresh AI guide",
  "aiLoading": "Generating...",
  "aiPlaceholder": "Your AI tour-guide briefing will appear here after generation.",
  "aiEmpty": "Generate the itinerary first, then ask the AI guide for richer local advice.",
  "aiSuccess": "AI guide generated successfully.",
  "aiRateLimit": "Rate limit exceeded (100 requests/hour). Please try again later.",
  "aiRequestFailed": "AI guide request failed. Please try again.",
  "openInGoogleMaps": "Open in Google Maps",
  "settings": "Settings",
  "settingsIntro": "Manage your guide profile, language, route style, currency, and display options.",
  "profile": "Profile",
  "preferences": "User settings",
  "routePrefs": "Route preferences",
  "language": "Language",
  "currency": "Currency",
  "pace_text": "Travel pace",
  "transport": "Transport style",
  "relaxed": "Relaxed",
  "packed_text": "Packed",
  "walkTaxi": "Walk + taxi",
  "driver": "Private driver",
  "public": "Public transit",
  "darkMode": "Dark mode",
  "lightMode": "Light mode",
  "login": "Sign in",
  "logout": "Sign out",
  "guest": "Guest traveler",
  "signInHint": "Sign in to personalize this guide",
  "authFailed": "Authentication failed. Please try again.",
  "authUnavailable": "Authentication is not available right now.",
  "location": "Location",
  "locationIntro": "Save your current position so the map can orient you and open directions from where you are.",
  "useCurrentLocation": "Use my current location",
  "updateLocation": "Update location",
  "clearLocation": "Clear location",
  "locationSaved": "Location saved for the map.",
  "locationCleared": "Location cleared.",
  "locationUnavailable": "Location is not available on this device or browser.",
  "locationDenied": "Location permission was denied. Enable location access and try again.",
  "locationError": "Could not get your location. Please try again.",
  "savedLocation": "Saved location",
  "buildProfile": "Build your profile",
  "profileIntro": "Answer tourism-sector questions so TuTour can personalize tours and understand visitor trends.",
  "saveProfile": "Save profile",
  "profileSaved": "Profile saved for tour personalization.",
  "travelerType": "Traveler type",
  "groupSize": "Group size",
  "ageRange": "Age range",
  "tripLength": "Trip length",
  "firstVisit": "First time in Oaxaca?",
  "budget_level": "Daily budget level",
  "accommodationArea": "Where are you staying?",
  "topInterests": "Top interests",
  "dietary": "Dietary needs",
  "accessibility": "Accessibility needs",
  "planningGoal": "Main trip goal",
  "solo": "Solo",
  "couple": "Couple",
  "family": "Family",
  "friends": "Friends",
  "business": "Business",
  "yes": "Yes",
  "no": "No",
  "unsure": "Not sure",
  "low_budget": "Value",
  "mid": "Mid-range",
  "high_budget": "Premium",
  "luxury_budget": "Luxury",
  "centro": "Centro / historic core",
  "north": "North / Reforma",
  "east": "Jalatlaco / east",
  "outside": "Outside city",
  "none": "None",
  "vegetarian": "Vegetarian",
  "vegan": "Vegan",
  "glutenFree": "Gluten-free",
  "halalKosher": "Halal / kosher",
  "mobility": "Mobility support",
  "visual": "Visual support",
  "hearing": "Hearing support",
  "authentic": "Authentic local life",
  "comfort": "Comfort and easy logistics",
  "adventure": "Adventure",
  "learning": "Culture and learning",
  "nightlife": "Nightlife",
  "wellness": "Wellness",
  "resetApp": "Reset App Data",
  "resetConfirm": "Are you sure? This will clear all saved trips, favorites, and settings.",
  "appReset": "App data cleared successfully.",
  "translateDemo": "Translation Test",
  "translateTest": "Test Translation",
  "translating": "Translating...",
  "translateSuccess": "Translated successfully!",
  "home": "Home",
  "places": "Places",
  "itinerary": "Itinerary",
  "safety": "Safety",
  "map": "Map",
  "heroTitle": "Your local-style guide to Oaxaca",
  "heroText": "Discover markets, mole, artisan villages, ruins, forests, mezcal, and sunset viewpoints with practical safety guidance.",
  "explore": "Explore places",
  "build": "Build 1-day plan",
  "categories": "Categories",
  "all": "All",
  "food": "Food",
  "culture": "Culture",
  "nature": "Nature",
  "markets": "Markets",
  "mezcal": "Mezcal",
  "artisan": "Artisan",
  "coast": "Coast",
  "dayTrips": "Day trips",
  "viewpoints": "Viewpoints",
  "databaseBadge": "Expanded TuTour-style database",
  "stopCount": "local stops",
  "searchHint": "Search by place, neighborhood, category, or local tip",
  "search": "Search Oaxaca stops",
  "rating": "Rating",
  "duration": "Suggested time",
  "bestFor": "Best for",
  "localTip": "Local tip",
  "safetyTip": "Safety tip",
  "openMap": "Open in Google Maps",
  "curated": "Curated recommendations",
  "generate": "Generate itinerary",
  "morning": "Morning",
  "afternoon": "Afternoon",
  "night": "Night",
  "emptyPlan": "Generate a day plan to see Oaxaca with smart pacing.",
  "refresh": "Regenerate",
  "guideNote": "Guide note",
  "safetyTitle": "Safety advice from local travel patterns",
  "emergency": "Emergency number in Mexico: 911",
  "noResults": "No matching places. Try a different search or category.",
  "mapIntro": "Use this map view to orient yourself. Each stop includes a direct Google Maps link for current hours, reviews, transit, and photos."
};

export const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];
const normalizeLanguage = (lang) => supportedLanguages.includes(lang) ? lang : 'en';
const languageStorage = {
  get: () => {
    try {
      return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('oaxaca_language') : null;
    } catch (err) {
      return null;
    }
  },
  set: (value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem('oaxaca_language', value);
    } catch (err) {}
  }
};
const placeLocaleEntries = buildPlaceLocaleEntries('en');
const fallbackWithPlaceEntries = { ...enFallback, ...placeLocaleEntries };

let currentLanguage = normalizeLanguage(languageStorage.get() || 'en');
const dictionaryCache = {
  en: fallbackWithPlaceEntries
};

const listeners = new Set();

export const safeTranslate = (translator, key, fallback = '') => {
  if (!key) return fallback || '';
  try {
    const value = translator(key);
    return value === key || value === undefined || value === null ? (fallback || '') : value;
  } catch (err) {
    return fallback || '';
  }
};

export const safeTranslateArray = (translator, keysOrValues = [], fallbacks = []) => {
  const source = Array.isArray(keysOrValues) ? keysOrValues : [];
  const fallbackList = Array.isArray(fallbacks) ? fallbacks : [];
  return source.map((item, index) => {
    if (item && typeof item === 'object') {
      const key = item.key || item.translationKey;
      const fallback = item.fallback ?? item.value ?? fallbackList[index] ?? '';
      return safeTranslate(translator, key, fallback);
    }
    return safeTranslate(translator, item, fallbackList[index] ?? item ?? '');
  }).filter(value => value !== undefined && value !== null && String(value).trim());
};

export const safeTranslateNested = (translator, keyMap = {}, fallbackMap = {}) => {
  if (!keyMap || typeof keyMap !== 'object') return {};
  return Object.entries(keyMap).reduce((result, [field, value]) => {
    if (Array.isArray(value)) result[field] = safeTranslateArray(translator, value, fallbackMap[field]);
    else if (value && typeof value === 'object') result[field] = safeTranslateNested(translator, value, fallbackMap[field] || {});
    else result[field] = safeTranslate(translator, value, fallbackMap[field] ?? '');
    return result;
  }, {});
};

async function loadAutoTranslations(lang, providedEntries = {}) {
  if (lang === 'en' || typeof window === 'undefined' || !window.genmb || !window.genmb.translate || !window.genmb.translate.batch) return {};
  const cacheKey = `i18n:auto:${lang}`;
  let cached = {};
  try {
    if (window.genmb.kv && window.genmb.kv.get) cached = (await window.genmb.kv.get(cacheKey)) || {};
  } catch (err) {
    cached = {};
  }
  const missingKeys = Object.keys(enFallback).filter(key => providedEntries[key] === undefined && typeof enFallback[key] === 'string' && enFallback[key].trim());
  const untranslatedKeys = missingKeys.filter(key => !cached[key]);
  if (!untranslatedKeys.length) return cached;
  try {
    const values = untranslatedKeys.map(key => enFallback[key]);
    const translatedValues = await window.genmb.translate.batch(values, lang);
    const updates = {};
    untranslatedKeys.forEach((key, index) => { updates[key] = translatedValues[index] || enFallback[key]; });
    const merged = { ...cached, ...updates };
    try {
      if (window.genmb.kv && window.genmb.kv.set) await window.genmb.kv.set(cacheKey, merged);
    } catch (err) {}
    return merged;
  } catch (err) {
    return cached;
  }
}

async function loadLocaleFile(lang) {
  const normalizedLang = normalizeLanguage(lang);
  if (dictionaryCache[normalizedLang]) return dictionaryCache[normalizedLang];
  const generatedPlaceEntries = buildPlaceLocaleEntries(normalizedLang);
  const data = bundledLocales[normalizedLang] || bundledLocales.en || {};
  dictionaryCache[normalizedLang] = { ...fallbackWithPlaceEntries, ...generatedPlaceEntries, ...data };
  return dictionaryCache[normalizedLang];
}

// Ensure initial load matches the saved language immediately or asynchronously
loadLocaleFile(currentLanguage).then(() => listeners.forEach(cb => cb(currentLanguage))).catch(() => {});

export function useLanguage() {
  const [language, setLanguageState] = React.useState(currentLanguage);
  const [isLoading, setIsLoading] = React.useState(!dictionaryCache[currentLanguage]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const handleUpdate = (newLang) => {
      setLanguageState(newLang);
      setIsLoading(false);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const setLanguage = async (newLang) => {
    const normalizedLang = normalizeLanguage(newLang);
    setIsLoading(true);
    setError('');
    try {
      await loadLocaleFile(normalizedLang);
      currentLanguage = normalizedLang;
      languageStorage.set(normalizedLang);
      listeners.forEach(cb => cb(normalizedLang));
    } catch (err) {
      setError(enFallback.translateFailed);
      currentLanguage = 'en';
      listeners.forEach(cb => cb('en'));
    } finally {
      setIsLoading(false);
    }
  };

  const t = (key, fallback = '') => {
    const dict = dictionaryCache[language] || fallbackWithPlaceEntries;
    const value = dict[key];
    if (value !== undefined && value !== null) return value;
    const fallbackValue = fallbackWithPlaceEntries[key];
    if (fallbackValue !== undefined && fallbackValue !== null) return fallbackValue;
    return fallback || key;
  };

  return {
    t,
    language,
    setLanguage,
    isLoading,
    error,
    safeT: (key, fallback = '') => safeTranslate(t, key, fallback),
    safeTArray: (keysOrValues = [], fallbacks = []) => safeTranslateArray(t, keysOrValues, fallbacks),
    safeTNested: (keyMap = {}, fallbackMap = {}) => safeTranslateNested(t, keyMap, fallbackMap)
  };
}

export { enFallback, placeLocaleEntries, fallbackWithPlaceEntries, currentLanguage, dictionaryCache, listeners, loadLocaleFile, loadAutoTranslations };

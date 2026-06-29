# TuTour
Polished multilingual Oaxaca tourism guide with curated recommendations, safety advice, Google Maps links, AI local guide chat, and 1-day / multi-day itinerary planning.

## Masterplan

- Help Oaxaca visitors discover food, mezcal, markets, artisan stops, culture, nature, events, services, experiences, and day trips with practical local context.
- Turn discovery into action with favorites, “add to plan”, generated itineraries, Google Maps directions, map search, saved/offline trip cues, and downloadable plans.
- Render traveler-facing copy in English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese, with safe fallbacks to curated English/default place data.
- Use GenMB capabilities progressively: auth, maps/search, AI chat/text, translation, contact form, KV quick notes, relational DB travel notes, audit/auth-backed workflows.
- Preserve local-guide usefulness: night transport, hydration, market etiquette, accessibility notes, rain plans, cultural customs, and safety advice.

## Tech Stack & Architecture

- **Runtime:** React SPA mounted by `src/main.js` into `#root` in `index.html`.
- **Routing:** `src/App.js` uses `HashRouter`, `Routes`, and shared `src/components/Layout.js`. Hash routing is intentional for static/preview hosting; do not switch to browser history unless server rewrites are added.
- **Component syntax:** This codebase does **not** use JSX. `src/jsx.js` binds `htm` to `React.createElement`; components return `html` templates:
  ```js
  return html`<section className="...">${content}</section>`;
  ```
- **Providers:** `src/mainProviders.js` currently returns `React.Fragment`. Add app-wide providers there, not in `src/main.js`.
- **Styling:** Tailwind CDN is loaded in `index.html`; app CSS is split by concern:
  - `styles/main.css` — Oaxaca theme tokens, cards, glass UI, dark mode, shadows, focus rings.
  - `styles/logo-fix.css` — TuTour image logo sizing/cropping.
  - `styles/layout-improvements.css` — safe-area handling, responsive spacing, mobile overflow fixes.
  - `styles/home-tabs-compact.css` — compact home tab layout.
- **Icons:** `lucide-react` powers navigation, cards, itinerary controls, settings, chatbot, and capability demos.
- **State:** `src/store/useGuideStore.js` is the persistent client store for selected category, mirrored language, dark mode, favorites, itinerary stops, route preferences, saved/offline trips, and trip state.
- **Dark mode:** `src/App.js` watches `useGuideStore(s => s.dark)` and toggles `document.documentElement.classList`.
- **I18n:** `src/i18n.js` exposes `useLanguage()`. Supported language metadata is in `src/data/i18n.js`; locale bundles are `src/locales/*.json`; settings copy is in `src/data/settingsI18n.js`; place-specific overrides are in `src/data/placeLocaleEntries.js`.
- **Language sync gotcha:** `src/components/Layout.js` and `src/components/CategoryFilter.js` mirror `useLanguage()` into `useGuideStore`. Keep this because itinerary generation, Google Maps URL localization, floating chat, and utilities read the store language.
- **Curated data:** `src/data/places.js` is the main static guide database: categories, places, Google Maps URLs, ratings, prices/durations, coordinates/areas, safety tips, photos, events, services, experiences, day trips, and itinerary metadata.
- **Place translation fallback:** `src/components/PlaceCard.js` uses `placeFieldKeyFor()`, `descriptionKeyFor()`, `translatedPlaceField()`, and `translatedOrFallback()`. Missing translations intentionally fall back to curated place fields; never render blank recommendation text.
- **Images:** `src/components/PlaceCard.js` contains targeted Google/asset image overrides and deterministic `fallbackPlaceImageFor()` Picsum seeds. Prefer real Google Maps/photo assets where available, but keep fallback URLs stable.
- **Maps:** `src/utils/googleMapsLinks.js` localizes Google Maps URLs. `Layout.js` calls `localizeGoogleMapAnchors(document, lang)`, attaches a `MutationObserver`, and localizes links again before click navigation.
- **External services:** `index.html` injects GenMB SDKs under `window.genmb` for auth, AI/chat, email/contact, KV, relational DB, maps/search, translate, and audit-log. Code must guard capability availability because preview/deploy contexts can differ.

## File Structure

```text
index.html                         App shell; Tailwind CDN, CSS links, GenMB SDK injection, #root.
CLAUDE.md                          Project instructions/documentation; keep aligned with this document.
src/main.js                        React entrypoint mounting App through Providers.
src/mainProviders.js               App-wide provider hook point; currently Fragment only.
src/jsx.js                         htm binding used instead of JSX.
src/App.js                         HashRouter routes and dark-mode html class toggle.
src/components/Layout.js           Header/nav, language controls, dark toggle, offline banner, Google Maps localization, FloatingLocalGuide.
src/components/CategoryFilter.js   Category pills; validates selected category and mirrors language to store.
src/components/PlaceCard.js        Recommendation card, ratings, favorites/add-to-plan, image overrides, translation fallback helpers.
src/components/FloatingLocalGuide.js Floating AI local guide chat with optional geolocation and Oaxaca prompt context.
src/components/CapabilityHub.js    Settings/demo hub for GenMB contact, KV notes, DB notes, translation, and map search.
src/data/places.js                 Curated Oaxaca places/events/services/experiences/day trips and map/link metadata.
src/data/i18n.js                   Supported languages plus shared/default translation keys.
src/data/placeLocaleEntries.js     Place-specific localized text overrides.
src/data/settingsI18n.js           Settings-page translation copy.
src/i18n.js                        Language hook, locale loading/lookup, fallback behavior.
src/locales/en.json                English locale bundle.
src/locales/es.json                Spanish locale bundle.
src/locales/fr.json                French locale bundle.
src/locales/de.json                German locale bundle.
src/locales/it.json                Italian locale bundle.
src/locales/pt.json                Portuguese locale bundle.
src/locales/ja.json                Japanese locale bundle.
src/locales/zh.json                Chinese locale bundle.
src/pages/Home.js                  Landing/discovery page and compact tabs.
src/pages/Places.js                Browse/filter curated recommendations.
src/pages/Itinerary.js             1-day and multi-day planner, saved/downloadable trips, AI guide note.
src/pages/MapPage.js               Map/search experience and selected stop cards.
src/pages/Events.js                Oaxaca events listings.
src/pages/Experiences.js           Booking-style activities with safety/meeting context.
src/pages/Services.js              Traveler services and practical help.
src/pages/Safety.js                Safety guidance and local etiquette.
src/pages/Settings.js              Language/theme/account/capability controls.
src/pages/Chatbot.js               Full AI guide page and shared `buildSystemPrompt()`.
src/pages/NotFound.js              Localized fallback route.
src/store/useGuideStore.js         Persistent client state/actions.
src/utils/googleMapsLinks.js       URL localization helpers for Google Maps anchors.
src/utils/itinerary.js             Itinerary generation/scoring/slot utilities.
styles/main.css                    Theme, cards, glass surfaces, dark mode, focus rings.
styles/logo-fix.css                Logo-specific fixes.
styles/layout-improvements.css     Safe-area and responsive layout fixes.
styles/home-tabs-compact.css       Home tab density overrides.
```

## Key Features

### Multilingual Oaxaca guide

- Supported languages are defined in `src/data/i18n.js`: `en`, `es`, `fr`, `de`, `it`, `pt`, `ja`, `zh`.
- Traveler-facing UI should use `useLanguage().t(key, fallback)` from `src/i18n.js`.
- Do not hardcode visible English strings unless they are data fallbacks or developer-only labels.
- Keep `languages[].placeCards = true` unless a language loses place-card coverage.

### Curated recommendations

- Main place data lives in `src/data/places.js`.
- Primary place categories include food, mezcal, markets, artisan, culture, nature, and day trips. `CategoryFilter.js` intentionally hides `dayTrips` from the compact primary category pills.
- `PlaceCard.js` requirements:
  - Show photo, rating, area/address, category, duration/price, description, highlights, local tips, safety tip, opening hours, and Google Maps directions where available.
  - Allow favorite/save and add-to-itinerary actions through `useGuideStore.js`.
  - Use `targetedPlaceImageOverrides` first, then curated `place.photo` if present, then `fallbackPlaceImageFor(place)`.
  - Translation keys use `place.${place.id}.${field}` unless overridden by `place.translationKeys`.

### Itinerary planning

- `src/pages/Itinerary.js` and `src/utils/itinerary.js` support original 1-day generation with morning/afternoon/night slots plus multi-day planning.
- Itinerary inputs include travel style, starting area, transport preference, pace, budget, walking tolerance, preferred categories, saved must-see places, and trip length.
- Generated plans should balance category fit, geography, opening practicality, local safety, and not overpack low-walking/relaxed routes.
- Download/save/offline cues must keep working for guests via local store and for signed-in users where GenMB auth is available.

### AI local guide

- `src/pages/Chatbot.js` is the full chat page.
- `src/components/FloatingLocalGuide.js` is the persistent floating chat.
- `buildSystemPrompt()` from `Chatbot.js` is reused by the floating guide; keep shared prompt behavior Oaxaca-specific.
- AI answers must stay focused on Oaxaca recommendations, etiquette, food, transport, maps, itinerary changes, and safety. If AI is unavailable, show curated fallback guidance instead of breaking the UI.
- Optional geolocation in `FloatingLocalGuide.js` should only be used after user action and must handle denied/unavailable states.

### Map and Google Maps integration

- Each curated place should include enough metadata for maps: name, address/area, `googleMapsUrl` or place link, and coordinates when possible.
- `src/utils/googleMapsLinks.js` localizes URLs to the selected language.
- `src/components/Layout.js` mutates Google Maps anchors after render; this is intentional because many links are generated by cards/search results.
- `src/pages/MapPage.js` should tolerate interactive tile/search failures and still expose selected stop cards and Google Maps links.

### Events, experiences, services, and safety

- `src/pages/Events.js`, `Experiences.js`, `Services.js`, and `Safety.js` render additional structured travel content from `src/data/places.js`.
- Experiences should feel booking-style: ratings, prices, meeting points, duration, language availability, safety notes, and “check availability” style CTAs.
- Safety content should remain practical and non-alarmist: registered taxis/ride-hail at night, hydration/sun, market etiquette, mezcal pacing, cash awareness, rain plans, and accessibility.

### GenMB capabilities and data models

Frontend code uses browser SDKs under `window.genmb`; no local backend files exist in this repo. Always feature-detect methods before calling.

Important SDK usages:

- `window.genmb.auth` — sign in/out, user profile, auth state.
- `window.genmb.contactForm.submit(contact)` — contact submissions from `CapabilityHub.js`.
- `window.genmb.kv.list/set/delete` — quick guest/user notes using key scope `tutour:memo:{userId|guest}:`.
- `window.genmb.db.travel_notes` — relational DB travel notes in `CapabilityHub.js`.
- `window.genmb.translate` — translation helper/demo.
- `window.genmb.maps` — map/place search helper/demo.
- AI/chat/text capability is used by `Chatbot.js`, `FloatingLocalGuide.js`, and itinerary guide notes.

Database tables configured externally:

- User/profile/i18n: `userProfiles`, `locales`, `translationNamespaces`, `translationKeys`, `translationValues`.
- Recommendations: `recommendationCategories`, `categoryTranslations`, `places`, `placeTranslations`, `tags`, `tagTranslations`, `placeTags`, `safetyAdvice`, `safetyAdviceTranslations`.
- User content: `savedPlaces`, `itineraries`, `itineraryItems`, `chatSessions`, `chatMessages`, `contactSubmissions`, `adminContactNotes`, `travel_notes`.
- KV backing: `keyValueEntries`.

## Design Guidelines

- Visual identity: polished Oaxaca tourism style, warm orange accent, cream/card surfaces, glassy sticky header, rounded cards, dense mobile-friendly controls.
- Theme colors and tokens live in `styles/main.css`; use existing CSS variables such as `--primary`, `--accent`, `--card`, `--border`, `--foreground`, `--muted`, and radius/shadow variables.
- Tailwind utility classes are used directly in components; custom CSS should only be added when repeated patterns or responsive/safe-area fixes are needed.
- Preserve `.focus-ring` on interactive elements for accessibility.
- Header logo uses `logoSvg` in `src/components/Layout.js` pointing to `/api/apps/romcWH54d4SR/assets/TuTournewLogobigger.png`; sizing is controlled by `styles/logo-fix.css` and GenMB visual-edit styles in `index.html`.
- Responsive behavior:
  - Desktop shows centered nav in header.
  - Smaller screens rely on compact navigation/menu patterns in `Layout.js`.
  - Keep `overflow-x-hidden`, safe bottom spacing, and viewport-fit behavior to avoid mobile horizontal scrolling/notch issues.
- Dark mode is class-based on `<html class="dark">`; do not implement a separate theme system.

## App Flow

1. **Browse**
   - User lands on `#/`.
   - `Layout.js` provides language/theme/nav, offline banner, and floating guide.
   - User can open places, map, events, itinerary, or menu/settings.

2. **Discover a place**
   - User opens `#/places` or category tabs.
   - `CategoryFilter.js` updates `useGuideStore.category`.
   - `PlaceCard.js` displays localized/fallback data, safety/local tips, favorite, add-to-plan, and directions.
   - Google Maps links are localized globally by `Layout.js`.

3. **Build an itinerary**
   - User opens `#/itinerary`.
   - Chooses style, pace, transport, categories, budget, saved must-sees, and day count.
   - `src/utils/itinerary.js` builds morning/afternoon/night plans.
   - User can save, download, regenerate, or request an AI guide note.

4. **Use map**
   - User opens `#/map`.
   - Searches/explores places and opens Google Maps for selected stops.
   - If interactive map tiles/search are unavailable, fallback text/cards remain usable.

5. **Ask AI guide**
   - User opens floating guide or `#/chat`.
   - Optional location can be saved after permission.
   - AI responds in selected language using Oaxaca-specific prompt context.
   - On capability failure, UI shows a localized error/fallback.

6. **Settings/capabilities**
   - User opens `#/settings`.
   - Can change language/theme, auth where available, and use `CapabilityHub.js` demos for contact, KV notes, DB notes, translation, and map search.
   - Edge case: guest KV notes use guest scope; DB notes require signed-in `authUser.id`.

Key edge cases:

- Missing translation: show curated default, not blank text.
- Unsupported/stale category in store: reset to `all`.
- Offline: display banner but keep saved/local guide content usable.
- GenMB capability missing: show localized unavailable message.
- Google Maps link generated after render: rely on `MutationObserver` localization.
- Popup/auth failures: leave guest mode functional.

## Conventions

- Use named exports for components: `export function Places() { ... }`.
- Components must import `html` from `../jsx.js` or `./jsx.js`; do not introduce JSX syntax unless the build pipeline is changed.
- Translation:
  - UI copy: add keys to `src/data/i18n.js` and/or `src/locales/*.json`.
  - Settings copy: update `src/data/settingsI18n.js`.
  - Place copy: update `src/data/places.js` fallbacks and `src/data/placeLocaleEntries.js` or locale bundles.
  - Always pass a fallback for new non-critical copy: `t('newKey', 'Readable fallback')`.
- Place IDs should be stable kebab-case; translation keys and image override maps depend on them.
- Add a new page:
  1. Create `src/pages/NewPage.js` returning `html`.
  2. Import it in `src/App.js`.
  3. Add a `Route` under the `Layout` route.
  4. Add navigation in `src/components/Layout.js` if it is a primary destination.
  5. Add locale keys for labels.
- Add a new recommendation:
  1. Add the item to `src/data/places.js` with stable `id`, category, area/address, coordinates if known, Google Maps URL, safety/local tips, duration/price/rating, and image if available.
  2. Add localized fields to `src/data/placeLocaleEntries.js` or locale bundles.
  3. Add targeted image override in `PlaceCard.js` only when a reliable asset/Google image exists.
  4. Verify it appears in `Places`, `MapPage`, and itinerary generation.
- Styling convention: prefer Tailwind utilities using existing theme variables. Add CSS only to the relevant stylesheet by concern.
- Keep all generated/visual-edit comments in `index.html` unless intentionally replacing the affected asset/layout.

## Platform (GenMB)

This app is built and hosted on GenMB.

**Runtime:** Browser sandbox (iframe) or Cloud Run. No Node.js server — all code runs client-side unless `backend/` exists.

**Dependencies:** CDN-only (esm.sh, cdn.tailwindcss.com, unpkg). Use ES module imports with full CDN URLs. No `npm install` at runtime.

**Entry point:** `index.html` must include all CDN script tags. Tailwind via CDN with inline config.

**Built-in services (relative API paths only, never hardcode domains):**
- `/api/ai/completion` — AI proxy | `/api/data/{appId}/*` — PostgreSQL (DataConnect SDK)
- `/api/storage/{appId}/*` — File uploads (GCS) | `/api/auth/google/*` — Google OAuth
- `/api/contact/submit` — Contact form | SDKs: `window.genmb.db`, `.storage`, `.auth`

**File structure:** `index.html` (entry), `src/` (source), `styles/` (CSS), `backend/` (optional FastAPI), `CLAUDE.md` (this file).

**Cannot:** Install npm packages at runtime, access filesystem, make direct server-side calls from frontend, modify infra.

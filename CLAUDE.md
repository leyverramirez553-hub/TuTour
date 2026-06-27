# TuTour
Polished multilingual Oaxaca tourism guide with curated recommendations, safety advice, Google Maps links, AI local-guide demos, and 1-day itinerary generation.

## Masterplan

- Help Oaxaca visitors discover vetted food, mezcal, market, artisan, culture, nature, event, service, experience, and day-trip stops with practical local context.
- Keep the main travel guide static-host friendly: browse, filter, favorite, plan, save/offline mode, map links, and itinerary generation run client-side from curated data.
- Render traveler-facing UI in English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese, falling back to curated source text when translations are missing.
- Use GenMB capabilities as progressive enhancements only: auth, AI chat, contact, maps/search, translate, KV notes, and `travel_notes` DB demos must never block core browsing.
- Convert discovery into action through “add to plan,” favorites, directions, booking-style cards, floating AI local guide, and generated morning/afternoon/night Oaxaca plans.

## Tech Stack & Architecture

- **Runtime:** React SPA mounted by `src/main.js` into `#root` in `index.html`.
- **Routing:** `src/App.js` uses `HashRouter`, nested `Routes`, and shared `src/components/Layout.js`. Hash routing is intentional for static/preview hosting; do not switch to browser history unless server rewrites are added.
- **Templates:** Components do **not** use JSX. `src/jsx.js` binds `htm` to `React.createElement`; write UI as:
  ```js
  return html`<section className="...">${content}</section>`;
  ```
- **Styling:** Tailwind CDN is loaded in `index.html`; app-specific CSS lives in:
  - `styles/main.css` — theme variables, Oaxaca palette, dark mode, glass UI, cards, focus rings, shadows.
  - `styles/logo-fix.css` — TuTour image logo sizing/cropping.
  - `styles/layout-improvements.css` — safe-area, mobile overflow, responsive spacing.
  - `styles/home-tabs-compact.css` — compact home tab layout.
- **Icons:** `lucide-react` powers navigation, cards, itinerary controls, chatbot, settings, and capability demos.
- **State:** `src/store/useGuideStore.js` is the persistent client store for selected category, mirrored language, dark mode, favorites, itinerary stops, route preferences, saved/offline trips, and trip state.
- **Providers:** `src/mainProviders.js` currently returns `React.Fragment`; add app-wide providers there instead of editing `src/main.js`.
- **Dark mode:** `src/App.js` watches `useGuideStore(s => s.dark)` and toggles `document.documentElement.classList`.
- **I18n:** `src/i18n.js` exposes `useLanguage()`. Language metadata is in `src/data/i18n.js`; bundles are in `src/locales/*.json`; settings copy is in `src/data/settingsI18n.js`; per-place translations are in `src/data/placeLocaleEntries.js`.
- **Language sync gotcha:** `src/components/Layout.js` and `src/components/CategoryFilter.js` mirror `useLanguage()` into `useGuideStore`. Preserve this: itinerary generation, Google Maps localization, generated links, and utilities read the store language.
- **Curated data:** `src/data/places.js` is the primary static database: categories, place records, Google Maps URLs, ratings, prices, coordinates/areas, safety tips, photos, events, services, experiences, and itinerary metadata.
- **Place translations:** `src/components/PlaceCard.js` derives keys with `placeFieldKeyFor()`, `descriptionKeyFor()`, and `translatedPlaceField()`. Missing translations intentionally fall back to curated place fields.
- **Maps:** `src/utils/googleMapsLinks.js` localizes Google Maps URLs. `Layout.js` calls `localizeGoogleMapAnchors(document, lang)` and attaches a `MutationObserver`, so links inserted after render receive selected-language parameters.
- **GenMB SDK:** `index.html` injects optional `window.genmb` SDKs for auth, KV, DB, maps, contact form, translate, and AI. Always guard `window.genmb.*` before use.

## File Structure

```txt
index.html                         Tailwind/CSS entry, metadata, injected GenMB SDK capabilities.
src/main.js                        React entry; mounts App with Providers.
src/mainProviders.js               App-wide provider hook point; currently Fragment only.
src/jsx.js                         htm binding; required for non-JSX templates.
src/App.js                         HashRouter routes and dark-mode document toggle.
src/components/Layout.js           Shared shell, header/nav, language menu, offline banner, Google Maps link localization, floating guide.
src/components/CategoryFilter.js   Home/place category chips; syncs i18n language into guide store.
src/components/PlaceCard.js        Recommendation card, ratings, image fallbacks/overrides, translation-key helpers.
src/components/FloatingLocalGuide.js Optional AI chat widget with geolocation prompts and localized copy.
src/components/CapabilityHub.js    Settings capability demos: auth-aware contact, KV notes, DB notes, translate, maps search.
src/pages/Home.js                  Landing page and compact tabbed discovery.
src/pages/Places.js                Filterable curated recommendation list.
src/pages/Itinerary.js             1-day/multi-day planner, saved trips, AI guide note integration.
src/pages/MapPage.js               Oaxaca stop map/list and map fallback behavior.
src/pages/Events.js                Curated events page.
src/pages/Experiences.js           Booking-style activities/experiences page.
src/pages/Services.js              Traveler services page.
src/pages/Safety.js                Practical Oaxaca safety advice.
src/pages/Chatbot.js               Full AI guide page and shared `buildSystemPrompt()`.
src/pages/Settings.js              Language/theme/auth/settings and CapabilityHub.
src/pages/NotFound.js              Route fallback.
src/data/places.js                 Static Oaxaca places/events/services/experiences and map helpers.
src/data/i18n.js                   Supported languages and common translation source text.
src/data/placeLocaleEntries.js     Per-place localized copy.
src/data/settingsI18n.js           Settings-page localized copy.
src/locales/*.json                 Locale bundles for en/es/fr/de/it/pt/ja/zh.
src/store/useGuideStore.js         Persistent client store for guide state.
src/utils/itinerary.js             Client itinerary selection/generation helpers.
src/utils/googleMapsLinks.js       Language-aware Google Maps URL builder/localizer.
styles/*.css                       App visual system, logo fixes, layout/mobile fixes, home tab compacting.
CLAUDE.md                          Project guidance; keep in sync with this document.
```

## Key Features

### Multilingual Oaxaca Guide
- All user-facing navigation, labels, safety, itinerary, settings, chatbot prompts, and place cards should use `useLanguage().t(...)`.
- Supported language codes: `en`, `es`, `fr`, `de`, `it`, `pt`, `ja`, `zh`.
- Place cards must use `translatedPlaceField(t, place, field, fallback)` or related helpers from `src/components/PlaceCard.js`; do not inline raw `place.description` unless it is a fallback.
- If adding a visible place field, update `placeCardVisibleFields` and translations.

### Curated Recommendations
- Data source is `src/data/places.js`, not a live Google Places database.
- Cards include Google Maps directions, rating, price/duration, safety tip, local tip, best time, nearby stops, accessibility/booking notes where available.
- `CategoryFilter.js` intentionally shows compact priority categories: `food`, `mezcal`, `markets`, `artisan`, `culture`, `nature`, plus `all`; `dayTrips` exists in data but is excluded from the main compact filter.

### Itinerary Generator
- `src/pages/Itinerary.js` and `src/utils/itinerary.js` generate Oaxaca plans from curated metadata and current store preferences.
- Required output shape for 1-day plan: morning, afternoon, night.
- Itinerary state/favorites/saved trips persist via `useGuideStore.js`.
- Add-to-plan actions should use store actions instead of page-local arrays so the map, saved/offline state, and itinerary page stay in sync.

### Maps and Directions
- Place-level directions use Google Maps URLs from `src/data/places.js` / `placeMapLink`.
- `src/utils/googleMapsLinks.js` adds selected-language parameters.
- `Layout.js` localizes existing and newly inserted map anchors using a `MutationObserver`; avoid manual duplicate localization unless building a URL directly.

### AI Guide
- Full chat lives in `src/pages/Chatbot.js`; floating quick chat lives in `src/components/FloatingLocalGuide.js`.
- `FloatingLocalGuide.js` imports `buildSystemPrompt` from `Chatbot.js`; keep prompt changes centralized where possible.
- AI must be optional. If `window.genmb.ai` is missing or fails, show localized fallback and keep curated guide usable.
- Floating guide may use browser geolocation, but denied/unavailable location must gracefully degrade to area-based questions.

### Settings and GenMB Capability Demos
- `src/pages/Settings.js` hosts account/language/theme controls and `CapabilityHub`.
- `src/components/CapabilityHub.js` demonstrates:
  - `window.genmb.contactForm.submit(contact)`
  - `window.genmb.kv.list/set/delete(...)` for quick notes
  - `window.genmb.db.travel_notes.list/create/delete(...)` for signed-in DB notes
  - `window.genmb.translate` for sample translation
  - `window.genmb.maps` for live place search
- These are demos/progressive enhancements; always show helpful unavailable errors rather than hard failures.

### Backend / API Surface
There is no custom app backend in this repo. External APIs are the injected GenMB browser SDKs in `index.html`.

Configured/generated database tables include: `userProfiles`, `locales`, `translationNamespaces`, `translationKeys`, `translationValues`, `keyValueEntries`, `recommendationCategories`, `categoryTranslations`, `places`, `placeTranslations`, `tags`, `tagTranslations`, `placeTags`, `safetyAdvice`, `safetyAdviceTranslations`, `savedPlaces`, `itineraries`, `itineraryItems`, `chatSessions`, `chatMessages`, `contactSubmissions`, `adminContactNotes`, and `travel_notes`.

Current app code directly uses only the `travel_notes` table via `window.genmb.db.travel_notes` in `CapabilityHub.js`, plus capability SDKs for auth, KV, contact form, translate, maps, and AI.

## Design Guidelines

- Visual style: polished travel marketplace inspired by GetYourGuide, adapted to Oaxaca with warm orange accents, card-heavy layouts, rounded corners, glass header, bold compact controls, and high-contrast CTA states.
- Primary theme color is orange (`#f97316` via `theme-color` and CSS variables); use existing CSS variables such as `--primary`, `--accent`, `--card`, `--border`, `--foreground`, `--muted`, `--destructive`.
- Use Tailwind utility classes plus existing CSS variables; prefer existing card/button patterns from `PlaceCard.js`, `Layout.js`, and `CategoryFilter.js`.
- Typography is system/Tailwind default with heavy weights for navigation, chips, and CTA labels (`font-black`, `font-bold`).
- Responsive behavior:
  - Desktop uses full header nav.
  - Mobile uses compact layout and overflow protection from `styles/layout-improvements.css`.
  - Respect safe-area padding via `safe-bottom`.
- Logo is an image at `/api/apps/romcWH54d4SR/assets/TuTournewLogobigger.png`; keep sizing controlled by `styles/logo-fix.css`.

## App Flow

- **Browse:** User lands on `/`, chooses category chips, opens `/places`, reviews cards, favorites stops, adds stops to itinerary, or opens Google Maps directions.
- **Plan:** User opens `/itinerary`, sets travel preferences, generates a 1-day morning/afternoon/night plan, optionally saves/downloads/offline-saves it, and can request an AI guide note.
- **Map:** User opens `/map`, views curated stops spatially/listed, opens selected stop details and localized Google Maps links. If interactive map tiles fail, the stop card and links remain usable.
- **Events/Experiences/Services:** Users browse booking-style or practical Oaxaca recommendations from static curated data.
- **Safety:** Users read practical localized safety advice; safety copy should remain direct and conservative.
- **AI:** User opens `/chat` or floating chat; if AI is unavailable, they receive fallback guidance and are routed back to curated features.
- **Settings:** User changes language/theme, signs in if SDK exists, tests optional contact/KV/DB/translate/maps capabilities.
- **Offline edge case:** `Layout.js` listens to `online/offline`; offline banner appears and saved/offline trips remain accessible from client state.
- **Unknown route:** `src/pages/NotFound.js` handles all unmatched hash paths.

## Conventions

- Use named exports for components and utilities.
- Keep components as functions returning `html\`\`` templates; never introduce JSX syntax unless the build pipeline is changed.
- Add a new page by:
  1. Creating `src/pages/NewPage.js`.
  2. Importing it in `src/App.js`.
  3. Adding a `<Route>` under the `Layout` route.
  4. Adding nav/menu links in `src/components/Layout.js` only if it is a primary destination.
  5. Adding locale keys to `src/data/i18n.js` and all `src/locales/*.json` as needed.
- Add a new place by updating `src/data/places.js`; include stable `id`, category, name, description, area/address, Google Maps URL, and practical travel fields. Add per-place translations in `src/data/placeLocaleEntries.js`.
- Stable IDs matter: place image overrides, translation keys, saved favorites, and itinerary references depend on place IDs.
- When adding external/Google Maps links, use helpers from `src/utils/googleMapsLinks.js` or let `Layout.js` localize anchors.
- Guard every `window.genmb` access. Never make auth, AI, KV, DB, maps, or translate required for core guide functionality.
- Prefer store actions in `src/store/useGuideStore.js` for shared state; avoid duplicating favorites/itinerary state in pages.
- Keep `CLAUDE.md` and this project documentation synchronized when architecture, routes, capabilities, or data conventions change.

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

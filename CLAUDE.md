# TuTour
Polished multilingual Oaxaca tourism guide with curated recommendations, Google Maps actions, safety advice, AI-guide demos, and 1-day itinerary planning.

## Masterplan
- Help Oaxaca travelers discover trusted food, mezcal, markets, artisan, culture, nature, hotels, events, services, and local experiences in a mobile-first guide.
- Turn discovery into action with favorites, manual itinerary stops, generated morning/afternoon/night plans, route preferences, and localized Google Maps links.
- Render traveler-facing UI in 8 languages: English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese.
- Provide local-guide context beyond listings: safety, etiquette, accessibility/rain hints, after-dark transport advice, booking notes, and trust/legal content.
- Remain useful as a mostly static SPA; GenMB auth/database/KV/email/translate/AI/Places capabilities are optional and must fail gracefully.

## Tech Stack & Architecture
- **Runtime:** Vite React SPA. `src/main.js` mounts `<Providers><App /></Providers>` into `#root`; `src/mainProviders.js` currently returns a fragment and is reserved for future global providers.
- **Templates:** Most source files are `.js` but use `htm`, not JSX. Always import `html` from `src/jsx.js`.
  - `src/jsx.js` binds `htm` to `React.createElement`, injects stable keys into array children, and special-renders allowlisted bare lucide icons.
  - Gotcha: if adding a bare lucide icon directly in an `html` template, add its component name to `iconNames` in `src/jsx.js` or render explicitly as `<${Icon} className="..." />`.
- **Routing:** `src/App.js` uses `HashRouter` for static/preview hosting. Do not switch to browser routing unless deployment supports rewrites.
  - Routes: `/`, `/places`, `/itinerary`, `/experiences`, `/safety`, `/map`, `/events`, `/chat`, `/services`, `/trust-center`, `/trust-center/:slug`, `/settings`, catch-all `*`.
  - `GoogleAnalyticsRouteTracker` sends GA4 page views manually because `index.html` initializes GA with `send_page_view: false`.
- **Layout shell:** `src/components/Layout.js` owns persistent header/nav, logo, language selector, dark-mode toggle, online/offline indicator, Hotels popup, floating AI guide, mobile overflow menu, Google Maps anchor localization, analytics events, and `<Outlet />`.
- **State:** `src/store/useGuideStore.js` is the shared client store for selected category, mirrored language, dark mode, favorites, itinerary stops, route preferences, saved/offline-trip affordances, and trip metadata.
- **I18n:** `src/i18n.js` exposes `useLanguage()`. Language metadata and fallback `t(lang,key)` live in `src/data/i18n.js`; locale bundles are in `src/locales/{en,es,fr,de,it,pt,ja,zh}.json`; settings copy is in `src/data/settingsI18n.js`; localized place copy is in `src/data/placeLocaleEntries.js`.
  - Important: `Layout.js` and `CategoryFilter.js` mirror `useLanguage().language` into `useGuideStore`. Keep this sync because itinerary utilities, Maps localization, floating chat, `NotFound`, and store-driven UI read language from the store.
- **Data:** Oaxaca recommendations are static in `src/data/places.js`, localized/enriched by `src/data/placeLocaleEntries.js`. Trust/legal content is static in `src/data/trustCenter.js`.
- **Styling:** Tailwind is loaded from CDN in `index.html`; there is no Tailwind build step. Use Tailwind utilities plus CSS variables/classes from `styles/main.css`, `styles/logo-fix.css`, `styles/layout-improvements.css`, and `styles/home-tabs-compact.css`.
- **Analytics:** GA4 property `G-1EZS6LNB16` is initialized in `index.html`. Use `trackEvent()` and `trackPageView()` from `src/utils/analytics.js`; analytics must never block UI.
- **Maps:** `src/utils/googleMapsLinks.js` builds localized Google Maps URLs. `Layout.js` calls `localizeGoogleMapAnchors(document, lang)`, watches DOM mutations, and rewrites Google Maps anchors before navigation.
- **External capabilities:** `index.html` injects GenMB SDKs under `window.genmb`. Current app uses them opportunistically in `CapabilityHub.js`, `Chatbot.js`, and `FloatingLocalGuide.js`; every call must check availability and show a graceful localized error/fallback.
- **Backend/API:** No app-owned backend code is in this repo. Available managed surfaces are client SDKs:
  - `window.genmb.auth`: sign-in/out/session/user helpers.
  - `window.genmb.contactForm.submit(contact)`: contact submission.
  - `window.genmb.kv.{list,set,delete}`: quick memo storage.
  - `window.genmb.db.travel_notes.{list,create,delete}` when configured.
  - `window.genmb.translate.translate(...)`, AI/chat APIs, and Places/search SDKs if present.

## File Structure
```text
index.html                         # SPA host; GA4, Tailwind CDN, CSS links, GenMB SDK injection, #root
src/main.js                        # React root bootstrap with Providers and App
src/mainProviders.js               # Placeholder provider wrapper; currently Fragment only
src/App.js                         # HashRouter routes, dark class sync, manual GA page tracking
src/jsx.js                         # htm binding, stable keys, bare lucide icon allowlist
src/i18n.js                        # useLanguage hook and locale loading interface

src/components/Layout.js           # App shell: nav, language/theme controls, maps localization, modals, floating guide
src/components/CategoryFilter.js   # Category pills; filters store category and mirrors language into store
src/components/PlaceCard.js        # Recommendation card actions: maps, favorite, itinerary, badges/details
src/components/FloatingLocalGuide.js # Global AI chat bubble with optional location and AI fallback handling
src/components/HotelsPopup.js      # Static multilingual hotel recommendations modal
src/components/CapabilityHub.js    # Settings/demo hub for auth, contact, KV, DB notes, translate, places capabilities

src/pages/Home.js                  # Landing page and discovery entry points
src/pages/Places.js                # Category/list browsing for static Oaxaca places
src/pages/Itinerary.js             # Manual/generated 1-day plan UI and route preferences
src/pages/Experiences.js           # Curated tours/local experiences content
src/pages/Safety.js                # Practical safety and etiquette guidance
src/pages/MapPage.js               # Map-oriented list/links view
src/pages/Events.js                # Oaxaca events/festivals page
src/pages/Chatbot.js               # Full AI-guide page; exports buildSystemPrompt used by floating guide
src/pages/Services.js              # Traveler services/resources
src/pages/Settings.js              # Language, preferences, capability demos
src/pages/TrustCenter.js           # Legal/trust content list and slug detail route
src/pages/NotFound.js              # Localized 404 using store language

src/data/places.js                 # Canonical static place records/categories
src/data/placeLocaleEntries.js     # Localized summaries/descriptions for places
src/data/i18n.js                   # Language metadata and fallback translation lookup
src/data/settingsI18n.js           # Settings/capability localized copy
src/data/trustCenter.js            # Static trust/legal articles
src/locales/*.json                 # UI translation bundles for en/es/fr/de/it/pt/ja/zh

src/store/useGuideStore.js         # Shared persistent UI/trip state
src/utils/analytics.js             # Safe GA4 wrappers
src/utils/googleMapsLinks.js       # Localized Google Maps URL builders/rewriters
src/utils/itinerary.js             # 1-day itinerary generation and helper logic

styles/main.css                    # Theme variables, core components, dark-mode tokens
styles/logo-fix.css                # Logo sizing/visual corrections
styles/layout-improvements.css     # Header/nav/responsive polish
styles/home-tabs-compact.css       # Compact home tab styling
vite.config.ts                     # Vite configuration
tsconfig*.json                     # TS config only for tooling/config; app source is JS
CLAUDE.md                          # Project guidance; keep aligned with this document
```

## Key Features
- **Multilingual UI**
  - Supported language codes: `en`, `es`, `fr`, `de`, `it`, `pt`, `ja`, `zh`.
  - All traveler-facing text should come from `useLanguage().t`, locale JSON, `src/data/i18n.js`, `settingsI18n.js`, or localized data entries.
  - If adding copy, update all locale bundles or provide a sensible English fallback through `t(lang,key)`.

- **Recommendation browsing**
  - `src/data/places.js` is the canonical place database. Expected fields include stable `id/slug`, category, name, summaries/descriptions, address/area, Google Maps URL/place data, image metadata, tags, safety/accessibility notes, and practical trip metadata used by cards/itinerary.
  - `CategoryFilter.js` intentionally displays preferred order `food`, `mezcal`, `markets`, `artisan`, `culture`, `nature`, then `all`; it excludes `dayTrips` from the compact filter.
  - `PlaceCard.js` should preserve core actions: open localized Google Maps, favorite/unfavorite, add/remove itinerary stop, and render localized/local-guide notes.

- **1-day itinerary generator**
  - `src/pages/Itinerary.js` and `src/utils/itinerary.js` create a morning/afternoon/night Oaxaca plan from curated places and user preferences.
  - Keep generated plans practical: avoid excessive cross-town travel, respect category diversity, include safety/transport hints, and localize labels/copy.
  - Store manual stops and generated plan state through `useGuideStore.js` so navigation does not reset trip work.

- **Google Maps actions**
  - All external map links must be Google Maps URLs and should pass through helpers in `src/utils/googleMapsLinks.js`.
  - `Layout.js` rewrites anchors globally for selected language; do not bypass it with custom click handlers that navigate before localization.

- **AI local guide**
  - `src/pages/Chatbot.js` contains the full chat experience and exports `buildSystemPrompt`; `FloatingLocalGuide.js` imports it for the global chat bubble.
  - Prompts must stay Oaxaca-specific, safety-conscious, multilingual, and grounded in `places`.
  - AI must be optional: if no GenMB AI/chat capability exists, show localized unavailable/error text and keep the rest of the app usable.

- **Safety, services, events, experiences, trust**
  - `Safety.js` provides local practical advice, especially registered taxis/ride-hailing after dark, hydration, market etiquette, cash, weather, and accessibility.
  - `Experiences.js`, `Events.js`, and `Services.js` are curated informational pages, not booking engines.
  - `TrustCenter.js` uses `src/data/trustCenter.js` and supports both index and `/trust-center/:slug`.

- **Capability demos / managed data**
  - `CapabilityHub.js` demonstrates optional GenMB contact, KV, relational `travel_notes`, translate, and places/search functionality.
  - Known database tables available in the environment include `userProfiles`, `locales`, translation tables, `recommendationCategories`, `places`, `placeTranslations`, `tags`, `safetyAdvice`, `savedPlaces`, `itineraries`, `itineraryItems`, `chatSessions`, `chatMessages`, `contactSubmissions`, and `travel_notes`.
  - Current production UX is still static-first; do not make browsing depend on DB availability unless adding complete loading/error/empty fallbacks.

## Design Guidelines
- **Visual style:** Polished travel marketplace feel inspired by GetYourGuide, adapted to Oaxaca: warm, colorful, card-based, image-forward, rounded surfaces, heavy CTA typography, and local-guide trust cues.
- **Colors:** Primary orange uses `#f97316`/CSS theme variable `--primary`; accent/borders/cards come from HSL CSS variables in `styles/main.css`. Preserve dark-mode token support via `document.documentElement.classList.toggle('dark', dark)` in `App.js`.
- **Typography:** Tailwind utility typography with bold/black headings and compact mobile labels. Avoid adding external font dependencies unless added globally in `index.html`.
- **Responsive behavior:** Mobile-first. Header nav is compact with overflow menu; cards and page sections should stack on small screens and become grids on larger screens. Touch targets should remain ~44px+ where actions are primary.
- **Images/logo:** Logo path in `Layout.js` is `/api/apps/romcWH54d4SR/assets/TuTournewLogobigger.png`. Hotel cards use static image seeds/URLs in `HotelsPopup.js`; place images should remain tied to place data or Google Maps-oriented records.

## App Flow
- **Discover places:** User lands on `/`, opens `/places`, selects a category, reviews cards, opens Google Maps, favorites places, or adds stops to itinerary.
- **Plan a day:** User opens `/itinerary`, reviews manual stops/preferences, generates a morning/afternoon/night plan, adjusts route preferences, and uses Maps links for navigation.
- **Ask for guidance:** User opens `/chat` or the floating guide, optionally shares location, asks about Oaxaca food/safety/etiquette/nearby stops, and receives localized advice if AI is available.
- **Travel prep:** User checks `/safety`, `/services`, `/events`, `/experiences`, hotels popup, and `/trust-center` for practical context.
- **Settings/capabilities:** User opens `/settings` to change language/theme and test optional contact/notes/translation capabilities.
- **Edge cases:**
  - Offline state is shown in `Layout.js`; static pages should still render.
  - Missing GenMB SDKs must not throw.
  - Unsupported route renders localized `NotFound.js`.
  - Unsupported category resets to `all` in `CategoryFilter.js`.
  - Analytics failures are swallowed by `src/utils/analytics.js`.

## Conventions
- **Component style:** Export named React functions from `.js` files and return `html\`...\`` templates. Do not introduce JSX syntax unless build config is changed and existing files are migrated consistently.
- **Imports:** Use explicit `.js` extensions for local modules. Import `React` when using hooks/fragments.
- **State access:** Prefer selector form: `useGuideStore(s => s.someValue)` to avoid unnecessary rerenders.
- **Localization:** Never hardcode traveler-facing English in new UI unless it is temporary fallback text passed to `t(key, fallback)` or mirrored into all locale files. Keep language and store language synchronized if a new component depends on store-driven utilities.
- **Styling:** Use Tailwind CDN classes and existing CSS variables (`--primary`, `--accent`, `--border`, `--card`, `--muted`, radius/shadow vars). No Tailwind config/build-only classes.
- **Analytics:** Track meaningful user actions with `trackEvent('event_name', safeParams)`. Do not send complex objects; `analytics.js` stringifies/sanitizes but concise primitives are preferred.
- **Adding a new page:**
  1. Create `src/pages/NewPage.js` using `html` from `../jsx.js`.
  2. Add a `<Route>` in `src/App.js`.
  3. Add nav entry in `Layout.js` only if it is primary navigation; localize nav labels in `navLabelsByLanguage`.
  4. Add translations to `src/locales/*.json` or relevant data i18n file.
  5. Emit analytics for important CTAs and ensure Google Maps links use `googleMapsLinks.js`.
- **Adding a new place/category:**
  1. Add canonical data in `src/data/places.js` with stable IDs/slugs and Google Maps URL.
  2. Add localized entries in `src/data/placeLocaleEntries.js`.
  3. Add category labels in locale/i18n data if the category is new.
  4. Update category ordering/filter behavior in `CategoryFilter.js` only if it should be a visible top-level filter.
- **Gotchas:** `index.html` contains GenMB visual-edit CSS and injected SDK code; avoid deleting unless intentionally removing platform integrations. `tsconfig.json` does not type-check app JS, so rely on runtime review for `.js` changes.

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

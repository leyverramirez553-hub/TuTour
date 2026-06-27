# TuTour

A polished multilingual Oaxaca tourism guide with curated food, culture, and nature recommendations, safety advice, Google Maps links, and a 1-day itinerary generator.

## Generated with GenMB

This project was generated using [GenMB](https://genmb.com) - AI-powered application builder.

### Original Prompt

> “Build a tourism app for Oaxaca with categories (food, culture, nature), a list of places, and a button that generates a 1-day itinerary (morning, afternoon, night).” It should act as a tour guide with local recommendations and safety advice.
Use getyourguide.com as an example and refine the graphics. Use google map to build the data base for all stops and also use google maps pictures per recommendation. Have the app work in most common languages, and have it render all text in the chosen language.


## Getting Started

### Prerequisites

- Node.js 18+

### Running Locally

```bash
npm install
npm run dev
```

## Framework

This project uses **React-Ts**.

## Progressive Web App (PWA)

This app is PWA-enabled and can be installed on mobile devices!

### PWA Files Included

- `manifest.json` - App manifest for installability
- `service-worker.js` - Caching and offline support
- `offline.html` - Offline fallback page
- `install-prompt.js` - "Add to Home Screen" install banner

### Installing on Mobile

1. Open the deployed app in your mobile browser
2. A custom install banner will appear after 2 seconds
3. Tap "Install" to add the app to your home screen
4. On iOS: Tap the share button and select "Add to Home Screen" (iOS shows instructions)

### Testing PWA Locally

PWA features require HTTPS to work. For local testing:

```bash
# Option 1: Use a local HTTPS server
npx local-web-server --https

# Option 2: Use Chrome's DevTools
# Open DevTools > Application > Service Workers
# Check "Bypass for network" to test offline mode
```

## License

MIT

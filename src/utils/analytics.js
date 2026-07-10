export const GA_MEASUREMENT_ID = 'G-1EZS6LNB16';

const safeAnalyticsValue = (value) => {
  if (value === null || value === undefined) return undefined;
  if (['string', 'number', 'boolean'].includes(typeof value)) return value;
  if (Array.isArray(value)) return value.map(item => safeAnalyticsValue(item)).filter(item => item !== undefined).join(', ');
  return String(value);
};

const safeParams = (params = {}) => Object.fromEntries(
  Object.entries(params)
    .map(([key, value]) => [key, safeAnalyticsValue(value)])
    .filter(([, value]) => value !== undefined && value !== '')
);

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, safeParams(params));
  } catch (error) {
    // Analytics should never interrupt the traveler experience.
  }
}

export function trackPageView(pagePath, pageTitle) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle || (typeof document !== 'undefined' ? document.title : 'TuTour'),
      page_location: window.location.href
    });
  } catch (error) {
    // Analytics should never interrupt the traveler experience.
  }
}

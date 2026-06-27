export const googleMapsLanguageCode = (language = 'en') => {
  const normalized = String(language || 'en').toLowerCase();
  const languageMap = {
    en: 'en',
    es: 'es',
    fr: 'fr',
    de: 'de',
    it: 'it',
    pt: 'pt-BR',
    ja: 'ja',
    zh: 'zh-CN'
  };
  return languageMap[normalized] || normalized.split('-')[0] || 'en';
};

export const googleMapsApiKey = () => '';

export const isGoogleMapsHost = (hostname = '') => {
  const host = String(hostname || '').toLowerCase();
  return host === 'maps.app.goo.gl' || host === 'google.com' || host === 'www.google.com' || host.endsWith('.google.com');
};

export const isGoogleMapsUrl = (url = '') => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim(), typeof window !== 'undefined' && window.location ? window.location.href : undefined);
    return isGoogleMapsHost(parsed.hostname) && (/\/(maps|search|place|dir|embed)\b/i.test(parsed.pathname) || parsed.hostname === 'maps.app.goo.gl');
  } catch (err) {
    return /google\.com\/maps|maps\.app\.goo\.gl/i.test(url);
  }
};

export const localizedGoogleMapsUrl = (url, language = 'en') => {
  if (!url || typeof url !== 'string') return url || '';
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) return url;

  const hl = googleMapsLanguageCode(language);

  try {
    const parsed = new URL(trimmed, typeof window !== 'undefined' && window.location ? window.location.href : undefined);
    if (!isGoogleMapsUrl(parsed.toString())) return url;

    // `hl` localizes Google Maps web links, embeds, short-link redirects, and photos.
    parsed.searchParams.set('hl', hl);
    parsed.searchParams.set('language', hl);
    return parsed.toString();
  } catch (err) {
    if (!/google\.com\/maps|maps\.app\.goo\.gl/i.test(trimmed)) return url;
    const separator = trimmed.includes('?') ? '&' : '?';
    const params = new URLSearchParams({ hl, language: hl });
    return `${trimmed}${separator}${params.toString()}`;
  }
};

export const localizeGoogleMapAnchors = (root = document, language = 'en') => {
  if (!root || !root.querySelectorAll) return;
  root.querySelectorAll('a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    const localized = localizedGoogleMapsUrl(href, language);
    if (localized && localized !== href) anchor.setAttribute('href', localized);
  });
};

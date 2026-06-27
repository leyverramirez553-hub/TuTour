import React from 'react';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { useLanguage } from '../i18n.js';
import { placeCategories } from '../data/places.js';

export function CategoryFilter() {
  const { t, language } = useLanguage();
  const storeLanguage = useGuideStore(s => s.language);
  const setStoreLanguage = useGuideStore(s => s.setLanguage);
  const category = useGuideStore(s => s.category);
  const setCategory = useGuideStore(s => s.setCategory);
  const preferredOrder = ['food', 'mezcal', 'markets', 'artisan', 'culture', 'nature'];
  const availableCats = placeCategories.filter(cat => cat !== 'dayTrips');
  const cats = React.useMemo(() => [...preferredOrder.filter(cat => availableCats.includes(cat)), 'all'], []);
  React.useEffect(() => {
    if (!cats.includes(category)) setCategory('all');
  }, [category, setCategory, cats]);
  React.useEffect(() => {
    if (storeLanguage !== language) setStoreLanguage(language);
  }, [storeLanguage, language, setStoreLanguage]);
  return html`
    <div className="flex flex-wrap gap-1.5" aria-label=${t('categories')}>
      ${cats.map(cat => html`
        <button key=${cat} type="button" onClick=${() => setCategory(cat)} className=${`focus-ring min-h-[34px] rounded-full border-2 px-3 py-1 text-xs font-black ${category === cat ? 'border-[hsl(var(--accent))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-sm)]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.58)] hover:bg-[hsl(var(--muted))]'}`}>
          ${t(cat)}
        </button>
      `)}
    </div>
  `;
}
import { Link } from 'react-router-dom';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { t } from '../data/i18n.js';

export function NotFound() {
  const lang = useGuideStore(s => s.language);
  return html`
    <div className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-10 text-center shadow-[var(--shadow-sm)]">
      <div className="text-7xl">🗺️</div>
      <h1 className="mt-4 text-4xl font-black">404</h1>
      <p className="mt-2 text-[hsl(var(--muted-foreground))]">${t(lang, 'notFoundText')}</p>
      <${Link} to="/" className="focus-ring mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-6 py-3 font-black text-[hsl(var(--primary-foreground))]">${t(lang, 'home')}</${Link}>
    </div>
  `;
}
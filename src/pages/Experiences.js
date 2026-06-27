import {Clock, Languages, MapPin, ShieldCheck, Star} from 'lucide-react';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { t } from '../data/i18n.js';

const experiences = [
  { title: 'Mezcal tasting with small producers', image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=900&q=75', duration: '2.5 hr', price: '$45–$85', rating: '4.8', meeting: 'Santo Domingo', langs: 'EN / ES', highlights: ['Guided agave flight', 'Snack pairing', 'Responsible ride advice'], safety: 'Eat before tasting and arrange transport before the last pour.' },
  { title: 'Oaxacan cooking class', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=75', duration: '4 hr', price: '$65–$120', rating: '4.9', meeting: 'Mercado Sánchez Pascuas', langs: 'EN / ES / FR', highlights: ['Market shopping', 'Mole or salsa lesson', 'Shared lunch'], safety: 'Tell the host dietary needs early and carry small bills for market purchases.' },
  { title: 'Monte Albán guided morning tour', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=900&q=75', duration: '3.5 hr', price: '$35–$70', rating: '4.7', meeting: 'Centro hotel pickup', langs: 'EN / ES', highlights: ['Archaeologist-style context', 'Valley viewpoints', 'Early cooler visit'], safety: 'Use sun protection and stay within marked archaeological paths.' },
  { title: 'Artisan villages route', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=75', duration: '6 hr', price: '$80–$160', rating: '4.8', meeting: 'Zócalo / hotel pickup', langs: 'EN / ES', highlights: ['Teotitlán textiles', 'Barro negro', 'Workshop demos'], safety: 'Confirm return pickup time before entering spread-out workshops.' },
  { title: 'Hierve el Agua day trip', image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=900&q=75', duration: '8 hr', price: '$55–$140', rating: '4.6', meeting: 'Centro pickup point', langs: 'EN / ES / PT', highlights: ['Petrified waterfalls', 'Mineral pools', 'Mitla or Tule add-on'], safety: 'Roads are winding; wear grippy shoes near wet rock.' },
  { title: 'Market food walk', image: 'https://images.unsplash.com/photo-1587135991058-8816b028691f?auto=format&fit=crop&w=900&q=75', duration: '3 hr', price: '$35–$75', rating: '4.9', meeting: 'Mercado 20 de Noviembre', langs: 'EN / ES / DE', highlights: ['Tlayudas and tasajo', 'Mole tasting', 'Chocolate stop'], safety: 'Go in daylight, keep your phone tucked away in dense aisles, and pace tastings.' }
];

export function Experiences() {
  const lang = useGuideStore(s => s.language);
  return html`<div className="grid gap-4 min-w-0">
    <section className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[var(--shadow-md)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--primary)/.2),transparent),url('https://commons.wikimedia.org/wiki/Special:FilePath/Mercado%2020%20de%20Noviembre%20Oaxaca.jpg?width=1400')] bg-cover bg-center opacity-25"></div>
      <div className="relative"><span className="rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-xs font-black text-black">${t(lang, 'bookingStyle')}</span><h1 className="mt-3 text-2xl md:text-4xl font-black">${t(lang, 'experiences')}</h1><p className="mt-1.5 max-w-2xl text-sm font-semibold text-[hsl(var(--muted-foreground))]">${t(lang, 'experiencesIntro')}</p></div>
    </section>
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      ${experiences.map(exp => html`<article key=${exp.title} className="overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[var(--shadow-sm)] transition-[var(--transition-smooth)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
        <div className="relative h-36 bg-[hsl(var(--muted))]"><div className="skeleton absolute inset-0"></div><img src=${exp.image} alt=${exp.title} className="relative h-36 w-full object-cover" /><span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-black text-black"><${Star} className="inline h-3 w-3 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" /> ${exp.rating}</span></div>
        <div className="grid gap-2 p-3"><h2 className="text-lg font-black leading-tight">${exp.title}</h2><div className="grid grid-cols-2 gap-1 text-xs font-bold text-[hsl(var(--muted-foreground))]"><span><${Clock} className="inline h-3.5 w-3.5" /> ${exp.duration}</span><span>${exp.price}</span><span><${MapPin} className="inline h-3.5 w-3.5" /> ${exp.meeting}</span><span><${Languages} className="inline h-3.5 w-3.5" /> ${exp.langs}</span></div><ul className="grid gap-1 text-xs font-semibold">${exp.highlights.map(h => html`<li key=${h}>• ${h}</li>`)}</ul><p className="rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.12)] p-2 text-xs font-bold"><${ShieldCheck} className="inline h-3.5 w-3.5 text-[hsl(var(--secondary))]" /> ${exp.safety}</p><a href=${`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${exp.title} Oaxaca`)}`} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-[38px] items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-3 py-2 text-sm font-black text-[hsl(var(--primary-foreground))]">${t(lang, 'reserve')}</a></div>
      </article>`)}
    </section>
  </div>`;
}

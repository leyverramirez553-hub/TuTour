import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {ArrowLeft, FileText, ShieldCheck} from 'lucide-react';
import { html } from '../jsx.js';
import { useLanguage } from '../i18n.js';
import { findTrustDocument, trustCenterDocuments } from '../data/trustCenter.js';

const TRUST_DOCUMENT_TRANSLATION_VERSION = 'v2';
const TRUST_DOCUMENT_TRANSLATION_CHUNK_LIMIT = 1800;
const TRUST_DOCUMENT_TRANSLATION_SDK_WAIT_MS = 3000;
const TRUST_DOCUMENT_TRANSLATION_SDK_POLL_MS = 150;

function trustDocumentTranslationCacheKey(slug, language) {
  return `trust-document:${TRUST_DOCUMENT_TRANSLATION_VERSION}:${slug}:${language}`;
}

function readCachedTrustDocumentTranslation(slug, language) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return '';
    return window.localStorage.getItem(trustDocumentTranslationCacheKey(slug, language)) || '';
  } catch (err) {
    return '';
  }
}

function writeCachedTrustDocumentTranslation(slug, language, value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(trustDocumentTranslationCacheKey(slug, language), value);
    }
  } catch (err) {}
}

function splitTrustDocumentForTranslation(content) {
  const lines = String(content || '').split('\n');
  const chunks = [];
  let current = '';

  lines.forEach((line, index) => {
    const addition = `${index === 0 ? '' : '\n'}${line}`;
    if (current && (current.length + addition.length) > TRUST_DOCUMENT_TRANSLATION_CHUNK_LIMIT) {
      chunks.push(current);
      current = line;
    } else {
      current += addition;
    }
  });

  if (current) chunks.push(current);
  return chunks;
}

function trustTranslationSdkReady() {
  return typeof window !== 'undefined' && window.genmb && window.genmb.translate && window.genmb.translate.batch;
}

function waitForTrustTranslationSdk(timeoutMs = TRUST_DOCUMENT_TRANSLATION_SDK_WAIT_MS) {
  if (trustTranslationSdkReady()) return Promise.resolve(true);
  return new Promise(resolve => {
    const startedAt = Date.now();
    const check = () => {
      if (trustTranslationSdkReady()) {
        resolve(true);
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        resolve(false);
        return;
      }
      window.setTimeout(check, TRUST_DOCUMENT_TRANSLATION_SDK_POLL_MS);
    };
    check();
  });
}

async function translateTrustDocumentContent(content, language) {
  if (!content || language === 'en') return content || '';
  const sdkReady = await waitForTrustTranslationSdk();
  if (!sdkReady) {
    throw new Error('Translation is not available right now. Showing the original document.');
  }
  const chunks = splitTrustDocumentForTranslation(content);
  const translatedChunks = await window.genmb.translate.batch(chunks, language);
  return translatedChunks.map((chunk, index) => chunk || chunks[index] || '').join('\n');
}

export function TrustCenter() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const document = slug ? findTrustDocument(slug) : null;
  const [translatedContent, setTranslatedContent] = React.useState('');
  const [translationLoading, setTranslationLoading] = React.useState(false);
  const [translationError, setTranslationError] = React.useState('');

  React.useEffect(() => {
    if (!document || !document.content) {
      setTranslatedContent('');
      setTranslationError('');
      setTranslationLoading(false);
      return;
    }

    if (language === 'en') {
      setTranslatedContent(document.content);
      setTranslationError('');
      setTranslationLoading(false);
      return;
    }

    let cancelled = false;
    const cached = readCachedTrustDocumentTranslation(document.slug, language);
    if (cached) {
      setTranslatedContent(cached);
      setTranslationError('');
      setTranslationLoading(false);
      return () => { cancelled = true; };
    }

    setTranslatedContent('');
    setTranslationError('');
    setTranslationLoading(true);

    translateTrustDocumentContent(document.content, language)
      .then(value => {
        if (cancelled) return;
        const nextValue = value || document.content;
        setTranslatedContent(nextValue);
        writeCachedTrustDocumentTranslation(document.slug, language, nextValue);
      })
      .catch(err => {
        if (cancelled) return;
        setTranslatedContent(document.content);
        setTranslationError(err?.message || 'Some text could not be translated. Showing the original document.');
      })
      .finally(() => {
        if (!cancelled) setTranslationLoading(false);
      });

    return () => { cancelled = true; };
  }, [document, language]);

  const documentCards = trustCenterDocuments.map(item => html`
    <${Link}
      key=${item.slug}
      to=${`/trust-center/${item.slug}`}
      className="focus-ring group flex min-h-[88px] items-start gap-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border)/0.82)] bg-[hsl(var(--card)/0.78)] p-4 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.62)] hover:bg-[hsl(var(--muted)/0.72)]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--primary)/0.13)] text-[hsl(var(--primary))]"><${FileText} className="h-5 w-5" /></span>
      <span className="min-w-0">
        <span className="block text-sm font-black text-[hsl(var(--foreground))]">${t(item.titleKey, item.fallback)}</span>
        <span className="mt-1 block text-xs font-semibold text-[hsl(var(--muted-foreground))]"></span>
      </span>
    </${Link}>
  `);

  if (slug && !document) {
    return html`<div className="grid gap-4 pb-20">
      <section className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.78)] p-5 shadow-[var(--shadow-sm)]">
        <p className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-xs font-black uppercase tracking-wide text-[hsl(var(--primary))]"><${ShieldCheck} className="h-4 w-4" />${t('trustCenter', 'Trust Center')}</p>
        <h1 className="mt-3 text-2xl font-black text-[hsl(var(--foreground))] md:text-4xl">${t('documentNotFound', 'Document not found')}</h1>
        <p className="mt-2 max-w-2xl text-sm font-semibold text-[hsl(var(--muted-foreground))]">${t('documentNotFoundText', 'This Trust Center file is not available yet. Return to the index to choose another document.')}</p>
        <${Link} to="/trust-center" className="focus-ring mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-2 text-sm font-black text-[hsl(var(--primary-foreground))]"><${ArrowLeft} className="h-4 w-4" />${t('backToTrustCenter', 'Back to Trust Center')}</${Link}>
      </section>
    </div>`;
  }

  if (document) {
    return html`<div className="grid gap-4 pb-20">
      <section className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.82)] p-5 shadow-[var(--shadow-sm)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.18),transparent_18rem),radial-gradient(circle_at_85%_20%,hsl(var(--accent)/0.16),transparent_16rem)]"></div>
        <div className="relative">
          <${Link} to="/trust-center" className="focus-ring inline-flex min-h-[34px] items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.7)] px-3 py-1.5 text-xs font-black text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"><${ArrowLeft} className="h-3.5 w-3.5" />${t('backToTrustCenter', 'Back to Trust Center')}</${Link}>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-xs font-black uppercase tracking-wide text-[hsl(var(--primary))]"><${FileText} className="h-4 w-4" />${t('trustCenter', 'Trust Center')}</p>
          <h1 className="mt-3 text-2xl font-black text-[hsl(var(--foreground))] md:text-4xl">${t(document.titleKey, document.fallback)}</h1>
          ${document.content ? html`<div className="mt-4 rounded-[var(--radius-lg)] border border-[hsl(var(--primary)/0.28)] bg-[hsl(var(--primary)/0.08)] p-4">
            ${translationLoading ? html`<p className="mb-3 rounded-full bg-[hsl(var(--card)/0.74)] px-3 py-2 text-xs font-black text-[hsl(var(--primary))]" role="status">${t('translating', 'Translating...')}</p>` : null}
            ${translationError ? html`<p className="mb-3 rounded-[var(--radius-md)] border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-700 dark:text-red-200" role="alert">${translationError}</p>` : null}
            <div className="whitespace-pre-line text-sm font-semibold leading-7 text-[hsl(var(--foreground))] md:text-[0.95rem]">${translatedContent || (translationLoading ? '' : document.content)}</div>
          </div>` : html`<div className="mt-4 rounded-[var(--radius-lg)] border border-dashed border-[hsl(var(--primary)/0.42)] bg-[hsl(var(--primary)/0.08)] p-4">
            <p className="text-base font-black text-[hsl(var(--foreground))]">${t('legalTextComingSoon', 'Legal text coming soon.')}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[hsl(var(--muted-foreground))]">${t('trustPlaceholderBody', 'This placeholder file is ready in the Trust Center menu. The full legal text will be added later.')}</p>
          </div>`}
        </div>
      </section>
    </div>`;
  }

  return html`<div className="grid gap-4 pb-20">
    <section className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-slate-950 p-5 text-white shadow-[var(--shadow-sm)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(240,102,10,.42),transparent_18rem),radial-gradient(circle_at_82%_22%,rgba(113,38,150,.42),transparent_16rem),linear-gradient(120deg,rgba(35,18,48,.96),rgba(112,45,12,.9))]"></div>
      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-black uppercase tracking-wide"><${ShieldCheck} className="h-4 w-4 text-orange-200" />${t('trustCenter', 'Trust Center')}</p>
        <h1 className="mt-3 text-2xl font-black md:text-4xl">${t('trustCenterIndex', 'Trust Center Index')}</h1>
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-white/88">${t('trustCenterIntro', 'Find TuTour legal, safety, data, AI, security, accessibility, and transparency files. Legal text will be added later.')}</p>
      </div>
    </section>
    <section className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.62)] p-4 shadow-[var(--shadow-sm)]">
      <h2 className="text-lg font-black text-[hsl(var(--foreground))]">${t('trustDocuments', 'Trust Center files')}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">${documentCards}</div>
    </section>
  </div>`;
}

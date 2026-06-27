import React from 'react';
import {Bot, Compass, Loader2, MapPin, MessageCircle, Send, ShieldCheck, Sparkles, Utensils, X} from 'lucide-react';
import { html } from '../jsx.js';
import { useLanguage } from '../i18n.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { places } from '../data/places.js';
import { buildSystemPrompt } from '../pages/Chatbot.js';

const floatingGuideCopy = {
  en: {
    label: 'Open AI local guide chat', title: 'AI local guide', subtitle: 'Oaxaca-focused help in your language', input: 'Ask about Oaxaca food, safety, etiquette, or places...', empty: 'Ask me about Oaxaca.', intro: 'I can recommend nearby stops, explain etiquette, suggest food, and share practical safety advice.', useLocation: 'Use my location', locationSaved: 'Location saved. Ask what is nearby.', locationDenied: 'Location permission was denied. You can still ask about an area like Centro, Jalatlaco, or Reforma.', locationUnavailable: 'Location is not available on this device or browser.', send: 'Send', close: 'Close chat', thinking: 'TuTour is thinking...', error: 'The AI guide could not reply. Please try again.', unavailable: 'AI chatbot is not available right now.', nearby: 'What is near me right now?', food: 'Recommend local food near Centro', etiquette: 'Explain Oaxaca cultural etiquette', safety: 'What should I avoid at night?' },
  es: {
    label: 'Abrir chat de guía local IA', title: 'Guía local IA', subtitle: 'Ayuda enfocada en Oaxaca en tu idioma', input: 'Pregunta sobre comida, seguridad, etiqueta o lugares de Oaxaca...', empty: 'Pregúntame sobre Oaxaca.', intro: 'Puedo recomendar paradas cercanas, explicar etiqueta, sugerir comida y dar consejos prácticos de seguridad.', useLocation: 'Usar mi ubicación', locationSaved: 'Ubicación guardada. Pregunta qué hay cerca.', locationDenied: 'Se denegó el permiso de ubicación. Aun así puedes preguntar por una zona como Centro, Jalatlaco o Reforma.', locationUnavailable: 'La ubicación no está disponible en este dispositivo o navegador.', send: 'Enviar', close: 'Cerrar chat', thinking: 'TuTour está pensando...', error: 'La guía IA no pudo responder. Inténtalo de nuevo.', unavailable: 'El chatbot IA no está disponible ahora.', nearby: '¿Qué hay cerca de mí ahora?', food: 'Recomienda comida local cerca del Centro', etiquette: 'Explica la etiqueta cultural de Oaxaca', safety: '¿Qué debo evitar de noche?' },
  fr: {
    label: 'Ouvrir le chat du guide local IA', title: 'Guide local IA', subtitle: 'Aide centrée sur Oaxaca dans votre langue', input: 'Demandez cuisine, sécurité, étiquette ou lieux à Oaxaca...', empty: 'Posez-moi une question sur Oaxaca.', intro: 'Je peux recommander des lieux proches, expliquer l’étiquette, suggérer où manger et donner des conseils de sécurité.', useLocation: 'Utiliser ma position', locationSaved: 'Position enregistrée. Demandez ce qui est proche.', locationDenied: 'L’autorisation de localisation a été refusée. Vous pouvez demander une zone comme Centro, Jalatlaco ou Reforma.', locationUnavailable: 'La localisation n’est pas disponible sur cet appareil ou navigateur.', send: 'Envoyer', close: 'Fermer le chat', thinking: 'TuTour réfléchit...', error: 'Le guide IA n’a pas pu répondre. Réessayez.', unavailable: 'Le chatbot IA n’est pas disponible pour le moment.', nearby: 'Qu’y a-t-il près de moi maintenant ?', food: 'Recommande de la cuisine locale près du Centro', etiquette: 'Explique l’étiquette culturelle à Oaxaca', safety: 'Que faut-il éviter la nuit ?' },
  de: {
    label: 'KI-Ortsguide-Chat öffnen', title: 'KI-Ortsguide', subtitle: 'Oaxaca-Hilfe in deiner Sprache', input: 'Frage zu Essen, Sicherheit, Etikette oder Orten in Oaxaca...', empty: 'Frag mich etwas über Oaxaca.', intro: 'Ich kann nahe Stopps empfehlen, Etikette erklären, Essen vorschlagen und praktische Sicherheitstipps geben.', useLocation: 'Standort nutzen', locationSaved: 'Standort gespeichert. Frag, was in der Nähe ist.', locationDenied: 'Standortberechtigung wurde abgelehnt. Du kannst trotzdem nach Centro, Jalatlaco oder Reforma fragen.', locationUnavailable: 'Standort ist auf diesem Gerät oder Browser nicht verfügbar.', send: 'Senden', close: 'Chat schließen', thinking: 'TuTour denkt nach...', error: 'Der KI-Guide konnte nicht antworten. Bitte erneut versuchen.', unavailable: 'Der KI-Chatbot ist derzeit nicht verfügbar.', nearby: 'Was ist gerade in meiner Nähe?', food: 'Empfiehl lokales Essen nahe Centro', etiquette: 'Erkläre kulturelle Etikette in Oaxaca', safety: 'Was sollte ich nachts vermeiden?' },
  it: {
    label: 'Apri chat guida locale IA', title: 'Guida locale IA', subtitle: 'Aiuto su Oaxaca nella tua lingua', input: 'Chiedi di cibo, sicurezza, etichetta o luoghi a Oaxaca...', empty: 'Chiedimi qualcosa su Oaxaca.', intro: 'Posso consigliare luoghi vicini, spiegare l’etichetta, suggerire cibo e dare consigli pratici di sicurezza.', useLocation: 'Usa la mia posizione', locationSaved: 'Posizione salvata. Chiedi cosa c’è vicino.', locationDenied: 'Permesso posizione negato. Puoi comunque chiedere di zone come Centro, Jalatlaco o Reforma.', locationUnavailable: 'La posizione non è disponibile su questo dispositivo o browser.', send: 'Invia', close: 'Chiudi chat', thinking: 'TuTour sta pensando...', error: 'La guida IA non ha potuto rispondere. Riprova.', unavailable: 'Il chatbot IA non è disponibile ora.', nearby: 'Cosa c’è vicino a me adesso?', food: 'Consiglia cibo locale vicino al Centro', etiquette: 'Spiega l’etichetta culturale di Oaxaca', safety: 'Cosa dovrei evitare di notte?' },
  pt: {
    label: 'Abrir chat do guia local IA', title: 'Guia local IA', subtitle: 'Ajuda sobre Oaxaca no seu idioma', input: 'Pergunte sobre comida, segurança, etiqueta ou lugares em Oaxaca...', empty: 'Pergunte-me sobre Oaxaca.', intro: 'Posso recomendar lugares próximos, explicar etiqueta, sugerir comida e dar dicas práticas de segurança.', useLocation: 'Usar minha localização', locationSaved: 'Localização salva. Pergunte o que há por perto.', locationDenied: 'Permissão de localização negada. Você ainda pode perguntar por Centro, Jalatlaco ou Reforma.', locationUnavailable: 'Localização não disponível neste dispositivo ou navegador.', send: 'Enviar', close: 'Fechar chat', thinking: 'TuTour está pensando...', error: 'O guia IA não conseguiu responder. Tente novamente.', unavailable: 'O chatbot IA não está disponível agora.', nearby: 'O que há perto de mim agora?', food: 'Recomende comida local perto do Centro', etiquette: 'Explique a etiqueta cultural de Oaxaca', safety: 'O que devo evitar à noite?' },
  ja: {
    label: 'AIローカルガイドチャットを開く', title: 'AIローカルガイド', subtitle: '選択中の言語でオアハカ案内', input: 'オアハカの食事、安全、マナー、場所について質問...', empty: 'オアハカについて聞いてください。', intro: '近くのスポット、文化的マナー、食事案、安全アドバイスを案内できます。', useLocation: '現在地を使う', locationSaved: '現在地を保存しました。近くの場所を聞いてください。', locationDenied: '位置情報の許可が拒否されました。Centro、Jalatlaco、Reformaなどのエリアでも質問できます。', locationUnavailable: 'この端末またはブラウザでは位置情報を利用できません。', send: '送信', close: 'チャットを閉じる', thinking: 'TuTourが考えています...', error: 'AIガイドが応答できませんでした。もう一度お試しください。', unavailable: '現在AIチャットボットは利用できません。', nearby: '今、近くには何がありますか？', food: 'Centro近くのローカルフードを教えて', etiquette: 'オアハカの文化的マナーを説明して', safety: '夜に避けるべきことは？' },
  zh: {
    label: '打开AI本地向导聊天', title: 'AI本地向导', subtitle: '用所选语言提供瓦哈卡帮助', input: '询问瓦哈卡美食、安全、礼仪或地点...', empty: '向我询问瓦哈卡。', intro: '我可以推荐附近地点、解释文化礼仪、建议美食，并提供实用安全建议。', useLocation: '使用我的位置', locationSaved: '位置已保存。可以询问附近有什么。', locationDenied: '位置权限被拒绝。你仍可以询问 Centro、Jalatlaco 或 Reforma 等区域。', locationUnavailable: '此设备或浏览器无法使用位置。', send: '发送', close: '关闭聊天', thinking: 'TuTour正在思考...', error: 'AI向导无法回复。请再试一次。', unavailable: 'AI聊天机器人现在不可用。', nearby: '我现在附近有什么？', food: '推荐Centro附近的本地美食', etiquette: '解释瓦哈卡文化礼仪', safety: '晚上应该避免什么？' }
};

const fallbackCopy = floatingGuideCopy.en;
const categoryPriority = ['food', 'culture', 'nature', 'markets', 'mezcal', 'artisan'];

const toRadians = value => (Number(value) * Math.PI) / 180;

const distanceKm = (from, place) => {
  if (!from || !Number.isFinite(Number(from.lat)) || !Number.isFinite(Number(from.lng)) || !Number.isFinite(Number(place.lat)) || !Number.isFinite(Number(place.lng))) return Infinity;
  const radius = 6371;
  const dLat = toRadians(place.lat - from.lat);
  const dLng = toRadians(place.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(place.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const placeText = (place, language, field) => {
  const localized = place.localized && place.localized[language] && place.localized[language][field];
  return localized || place[field] || '';
};

const GUIDE_TIP_MAX = 90;
const trimGuideTip = value => {
  const text = String(value || '').trim();
  return text.length > GUIDE_TIP_MAX ? `${text.slice(0, GUIDE_TIP_MAX - 1).trimEnd()}…` : text;
};

const compactPlaceSummary = (place, language, userLocation = null) => {
  const km = userLocation ? distanceKm(userLocation, place) : null;
  const distanceText = Number.isFinite(km) ? `, ${km.toFixed(km < 10 ? 1 : 0)}km` : '';
  const tip = trimGuideTip(placeText(place, language, 'safetyTip') || placeText(place, language, 'localTip') || placeText(place, language, 'bestFor') || placeText(place, language, 'description'));
  return `- ${placeText(place, language, 'name')} (${place.category}, ${placeText(place, language, 'area')}${distanceText})${tip ? `: ${tip}` : ''}`;
};

// Build a compact place list that stays within charBudget. The AI-proxy hard-rejects
// any prompt over 4000 chars, so the place context must be bounded — the old version
// emitted ~10k chars (24 places × full tips) and the SDK threw "Message too long"
// before any request, which surfaced as "The AI guide could not reply".
const curatedPlaceContext = (language, userLocation, charBudget = 640) => {
  const base = categoryPriority.flatMap(category => places.filter(place => place.category === category).slice(0, 4));
  const nearest = userLocation
    ? places.filter(place => Number.isFinite(Number(place.lat)) && Number.isFinite(Number(place.lng))).map(place => ({ place, km: distanceKm(userLocation, place) })).sort((a, b) => a.km - b.km).slice(0, 8).map(item => item.place)
    : [];
  const unique = [...nearest, ...base].filter((place, index, list) => place && place.id && list.findIndex(other => other.id === place.id) === index);
  const lines = [];
  let used = 0;
  for (const place of unique) {
    const line = compactPlaceSummary(place, language, userLocation);
    if (lines.length > 0 && used + line.length + 1 > charBudget) break;
    lines.push(line);
    used += line.length + 1;
  }
  return lines.join('\n');
};

// Keep the assembled system prompt well under the 4000-char AI-proxy limit so there
// is room for the conversation history + user message the chatbot SDK appends.
const MAX_GUIDE_PROMPT = 2600;

const buildFloatingPrompt = (language, profile, user, userLocation) => {
  const locationContext = userLocation ? `The traveler shared an approximate current location: ${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}. Use nearby place distances only as rough guidance.` : 'The traveler has not shared current location; ask for their neighborhood or starting point when nearby advice depends on location.';
  const core = `${buildSystemPrompt(language, profile, user)}\nYou are the floating TuTour AI local guide. Stay strictly focused on Oaxaca tourism: local recommendations, nearby Oaxaca places, cultural etiquette, food options, transport pacing, and practical safety advice. If asked about non-Oaxaca or non-tourism topics, politely redirect to Oaxaca travel help. Respond in language code ${language}, matching the user's selected app language. If uncertain about current hours, closures, prices, reservations, or road conditions, tell the traveler to confirm on Google Maps before going. Do not invent live conditions. ${locationContext}`;
  const appContext = curatedPlaceContext(language, userLocation, Math.max(0, MAX_GUIDE_PROMPT - core.length - 32));
  const full = appContext ? `${core}\nNearby TuTour place notes:\n${appContext}` : core;
  return full.length > MAX_GUIDE_PROMPT ? full.slice(0, MAX_GUIDE_PROMPT) : full;
};

export function FloatingLocalGuide() {
  const { language } = useLanguage();
  const copy = floatingGuideCopy[language] || fallbackCopy;
  const profile = useGuideStore(s => s.profile || {});
  const pace = useGuideStore(s => s.pace);
  const transport = useGuideStore(s => s.transport);
  const userLocation = useGuideStore(s => s.userLocation);
  const setUserLocation = useGuideStore(s => s.setUserLocation);
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [locationLoading, setLocationLoading] = React.useState(false);
  const [notice, setNotice] = React.useState('');
  const [error, setError] = React.useState('');
  const [user, setUser] = React.useState(null);
  const panelRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const systemProfile = { ...profile, pace, transport };
  const suggestions = [copy.nearby, copy.food, copy.etiquette, copy.safety];

  React.useEffect(() => {
    let active = true;
    const auth = window.genmb && window.genmb.auth;
    if (!auth || !auth.ready || !auth.onAuthStateChange) return undefined;
    auth.ready().then(() => {
      if (active && auth.getUser) setUser(auth.getUser() || null);
    }).catch(() => {});
    const unsubscribe = auth.onAuthStateChange(nextUser => { if (active) setUser(nextUser || null); });
    return () => {
      active = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = event => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 80);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const saveCurrentLocation = async () => {
    if (locationLoading) return;
    setError('');
    setNotice('');
    if (!navigator.geolocation) {
      setError(copy.locationUnavailable);
      return;
    }
    setLocationLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 12000, maximumAge: 180000 });
      });
      setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude, accuracy: position.coords.accuracy || 0, savedAt: Date.now() });
      setNotice(copy.locationSaved);
      window.setTimeout(() => setNotice(''), 2500);
    } catch (err) {
      setError(err && err.code === 1 ? copy.locationDenied : (err && err.message ? err.message : copy.locationUnavailable));
    } finally {
      setLocationLoading(false);
    }
  };

  const sendMessage = async (overrideText = '') => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;
    setError('');
    setNotice('');
    const userMsg = { role: 'user', content: text };
    const history = [...messages, userMsg].slice(-6);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      if (!window.genmb || !window.genmb.chatbot || !window.genmb.chatbot.send) throw new Error(copy.unavailable);
      const reply = await window.genmb.chatbot.send(text, {
        history,
        systemPrompt: buildFloatingPrompt(language, systemProfile, user, userLocation),
        maxTokens: 560
      });
      if (typeof reply !== 'string') throw new Error(copy.error);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      const message = err && err.message ? err.message : copy.error;
      setError(message);
      setMessages(prev => [...prev, { role: 'assistant', content: copy.error }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    sendMessage();
  };

  return html`
    <div className="floating-guide" aria-live="polite">
      ${open ? html`
        <section ref=${panelRef} className="floating-guide-panel" role="dialog" aria-modal="false" aria-label=${copy.title}>
          <div className="floating-guide-header">
            <div className="floating-guide-avatar"><${Bot} className="h-5 w-5" /></div>
            <div className="floating-guide-heading">
              <h2>${copy.title}</h2>
              <p>${copy.subtitle}</p>
            </div>
            <button type="button" className="floating-guide-icon-button" onClick=${() => setOpen(false)} aria-label=${copy.close}><${X} className="h-4 w-4" /></button>
          </div>
          <div className="floating-guide-tools">
            <button type="button" onClick=${saveCurrentLocation} disabled=${locationLoading} className="floating-guide-location-button">
              ${locationLoading ? html`<${Loader2} className="h-3.5 w-3.5 animate-spin" />` : html`<${MapPin} className="h-3.5 w-3.5" />`}
              ${copy.useLocation}
            </button>
            ${userLocation ? html`<span className="floating-guide-location-chip"><${Compass} className="h-3.5 w-3.5" />${copy.nearby}</span>` : null}
          </div>
          ${error ? html`<p role="alert" className="floating-guide-error">${error}</p>` : null}
          ${notice ? html`<p className="floating-guide-notice">${notice}</p>` : null}
          <div className="floating-guide-messages">
            ${messages.length === 0 ? html`
              <div className="floating-guide-empty">
                <${Sparkles} className="h-6 w-6" />
                <strong>${copy.empty}</strong>
                <p>${copy.intro}</p>
                <div className="floating-guide-suggestions">
                  ${suggestions.map((suggestion, index) => {
                    const SuggestIcon = index === 1 ? Utensils : index === 2 ? Sparkles : index === 3 ? ShieldCheck : MapPin;
                    return html`<button key=${suggestion} type="button" onClick=${() => sendMessage(suggestion)} disabled=${loading} className="floating-guide-suggestion"><${SuggestIcon} className="h-3.5 w-3.5" />${suggestion}</button>`;
                  })}
                </div>
              </div>` : html`
              <div className="floating-guide-thread">
                ${messages.map((message, index) => html`<div key=${`${message.role}-${index}`} className=${`floating-guide-bubble ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}>${message.content}</div>`)}
              </div>`}
            ${loading ? html`<div className="floating-guide-typing"><${Loader2} className="h-4 w-4 animate-spin" />${copy.thinking}</div>` : null}
          </div>
          <form className="floating-guide-form" onSubmit=${onSubmit}>
            <label className="sr-only" htmlFor="floating-guide-input">${copy.input}</label>
            <input ref=${inputRef} id="floating-guide-input" value=${input} onInput=${event => setInput(event.target.value)} disabled=${loading} placeholder=${copy.input} />
            <button type="submit" disabled=${loading || !input.trim()} aria-label=${copy.send}><${Send} className="h-4 w-4" /><span>${copy.send}</span></button>
          </form>
        </section>` : null}
      <button type="button" className="floating-guide-toggle" onClick=${() => setOpen(prev => !prev)} aria-label=${copy.label} aria-expanded=${open}>
        <${MessageCircle} className="h-6 w-6" />
        <span>${copy.title}</span>
      </button>
    </div>
  `;
}

import {AlertTriangle, CheckCircle2, ShieldCheck} from 'lucide-react';
import { html } from '../jsx.js';
import { safetyAdvice } from '../data/places.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { t } from '../data/i18n.js';

const safetyHeroImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Monte%20Alban%2C%20Oaxaca%2C%20Mexico.jpg?width=1400';

const safetyAdviceByLanguage = {
  en: safetyAdvice,
  es: [
    'Usa taxis oficiales, autos coordinados por tu hotel o servicios confiables por la noche.',
    'Lleva billetes pequeños, una copia de tu identificación y solo la tarjeta bancaria que necesites ese día.',
    'Hidrátate seguido; la altitud de Oaxaca hace que el sol y el mezcal se sientan más fuertes de lo esperado.',
    'En mercados y fiestas, mantén teléfono y cartera seguros y evita bloquear pasillos de vendedores para tomar fotos.',
    'Revisa horarios actuales en mapas porque museos, zonas arqueológicas y jardines pueden cambiar por festivos.',
    'Para salidas fuera de la ciudad, sal temprano, confirma la hora de regreso y comparte tu plan con tu alojamiento.',
    'Para catas de mezcal, come antes, toma agua y organiza transporte antes de empezar.',
    'Para pueblos artesanos y sitios arqueológicos, confirma el taxi de regreso o punto de encuentro antes de salir de la ciudad.'
  ],
  fr: [
    'Utilisez des taxis officiels, des voitures organisées par votre hôtel ou des services fiables la nuit.',
    'Gardez de petites coupures, une copie de votre pièce d’identité et seulement la carte bancaire nécessaire pour la journée.',
    'Hydratez-vous souvent ; l’altitude de Oaxaca rend le soleil et le mezcal plus forts qu’on ne l’imagine.',
    'Dans les marchés et les fêtes, gardez téléphone et portefeuille en sécurité et évitez de bloquer les allées pour les photos.',
    'Vérifiez les horaires actuels sur les cartes, car musées, sites archéologiques et jardins peuvent changer pendant les fêtes.',
    'Pour les excursions hors de la ville, partez tôt, confirmez l’heure de retour et partagez votre plan avec votre hébergement.',
    'Pour les dégustations de mezcal, mangez avant, buvez de l’eau et organisez le transport avant de commencer.',
    'Pour les villages artisanaux et les sites archéologiques, confirmez le taxi de retour ou le point de rendez-vous avant de quitter la ville.'
  ],
  de: [
    'Nutze nachts offizielle Taxis, vom Hotel organisierte Wagen oder zuverlässige Fahrdienste.',
    'Trage kleine Scheine, eine Ausweiskopie und nur die Bankkarte bei dir, die du für den Tag brauchst.',
    'Trinke oft Wasser; durch die Höhenlage von Oaxaca wirken Sonne und Mezcal stärker als erwartet.',
    'Halte auf Märkten und Festen Handy und Geldbeutel sicher und blockiere keine Händlergänge für Fotos.',
    'Prüfe aktuelle Öffnungszeiten in Karten-Apps, da Museen, Ruinen und Gärten an Feiertagen abweichen können.',
    'Starte bei Ausflügen außerhalb der Stadt früh, bestätige die Rückfahrt und teile deinen Plan mit deiner Unterkunft.',
    'Iss vor Mezcal-Verkostungen, trinke Wasser und organisiere den Transport, bevor du beginnst.',
    'Bestätige für Handwerksdörfer und archäologische Stätten Rücktaxi oder Tourabholung, bevor du die Stadt verlässt.'
  ],
  it: [
    'Di notte usa taxi ufficiali, auto organizzate dall’hotel o servizi di trasporto affidabili.',
    'Porta banconote piccole, una copia del documento e solo la carta bancaria necessaria per la giornata.',
    'Bevi spesso acqua: l’altitudine di Oaxaca rende sole e mezcal più intensi del previsto.',
    'Nei mercati e durante le feste tieni al sicuro telefono e portafoglio e non bloccare i corridoi dei venditori per fare foto.',
    'Controlla gli orari aggiornati sulle mappe perché musei, rovine e giardini possono cambiare durante le festività.',
    'Per gite fuori città parti presto, conferma l’orario di ritorno e condividi il piano con il tuo alloggio.',
    'Per le degustazioni di mezcal mangia prima, bevi acqua e organizza il trasporto prima di iniziare.',
    'Per villaggi artigiani e siti archeologici conferma taxi di ritorno o punto di ritiro del tour prima di lasciare la città.'
  ],
  pt: [
    'À noite, use táxis oficiais, carros organizados pelo hotel ou serviços de transporte confiáveis.',
    'Leve notas pequenas, uma cópia do seu documento e apenas o cartão bancário necessário para o dia.',
    'Hidrate-se com frequência; a altitude de Oaxaca faz o sol e o mezcal parecerem mais fortes do que o esperado.',
    'Em mercados e festas, mantenha celular e carteira seguros e evite bloquear corredores de vendedores para tirar fotos.',
    'Confira horários atuais nos mapas, pois museus, ruínas e jardins podem mudar em feriados.',
    'Para passeios fora da cidade, saia cedo, confirme o horário de retorno e compartilhe seu plano com a hospedagem.',
    'Para degustações de mezcal, coma antes, beba água e organize o transporte antes de começar.',
    'Para vilarejos artesanais e sítios arqueológicos, confirme o táxi de volta ou o ponto de encontro antes de sair da cidade.'
  ],
  ja: [
    '夜は公式タクシー、宿泊先が手配した車、または信頼できる配車サービスを利用しましょう。',
    '少額紙幣、身分証のコピー、その日に必要な銀行カードだけを持ち歩きましょう。',
    'こまめに水分補給を。オアハカの標高では、日差しやメスカルが予想以上に強く感じられます。',
    '市場や祭りではスマートフォンと財布を安全に保ち、写真撮影で通路をふさがないようにしましょう。',
    '博物館、遺跡、庭園は祝日などで営業時間が変わることがあるため、地図で最新情報を確認しましょう。',
    '市外への日帰り旅行は早めに出発し、帰りの時間を確認し、宿泊先に予定を共有しましょう。',
    'メスカルの試飲では、事前に食事をし、水を飲み、開始前に移動手段を手配しましょう。',
    '工芸村や遺跡では、市内を出る前に帰りのタクシーやツアー集合場所を確認しましょう。'
  ],
  zh: [
    '夜间请使用官方出租车、酒店安排的车辆或可靠的叫车服务。',
    '随身携带小额现金、身份证件复印件，以及当天需要的一张银行卡即可。',
    '经常补水；瓦哈卡海拔较高，阳光和梅斯卡尔酒的感觉会比预期更强。',
    '在市场和节庆活动中，请保管好手机和钱包，拍照时不要堵住摊贩通道。',
    '请在地图上查看当前营业时间，因为博物馆、遗址和植物园在节假日期间可能调整时间。',
    '前往城外一日游时请早出发，确认返程时间，并把计划告知住宿处。',
    '参加梅斯卡尔品鉴前请先吃东西、喝水，并在开始前安排好交通。',
    '前往手工艺村和考古遗址前，请确认返程出租车或旅行团接送点。'
  ]
};

export function Safety() {
  const lang = useGuideStore(s => s.language);
  const localizedAdvice = safetyAdviceByLanguage[lang] || safetyAdvice;

  return html`
    <div className="grid gap-4 min-w-0">
      <section className="relative overflow-hidden rounded-[var(--radius-lg)] bg-slate-950 border border-[hsl(var(--border))] p-4 text-white shadow-[var(--shadow-sm)]">
        <div className="absolute inset-0 bg-cover bg-center opacity-42" style=${{ backgroundImage: `linear-gradient(120deg, rgba(0,0,0,.76), rgba(0,0,0,.28)), url(${safetyHeroImage})` }}></div>
        <div className="relative flex items-start gap-3 min-w-0"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-white/18 text-emerald-200 backdrop-blur"><${ShieldCheck} className="h-6 w-6" /></span><div className="min-w-0"><h1 className="text-2xl md:text-4xl font-black">${t(lang, 'safetyTitle')}</h1><p className="mt-2 inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-red-500/24 px-3 py-2 text-sm font-black text-white ring-1 ring-red-200/35"><${AlertTriangle} className="h-4 w-4 shrink-0" />${t(lang, 'emergency')}</p></div></div>
      </section>
      <section className="grid gap-2.5">
        ${localizedAdvice.map((advice, idx) => html`<div key=${idx} className="rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3.5 shadow-[var(--shadow-sm)] flex gap-2.5"><${CheckCircle2} className="h-5 w-5 shrink-0 text-[hsl(var(--secondary))]" /><p className="text-sm font-semibold">${advice}</p></div>`)}
      </section>
    </div>
  `;
}

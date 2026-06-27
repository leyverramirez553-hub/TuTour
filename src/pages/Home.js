import { useState } from 'react';
import {CalendarDays, Camera, Compass, Heart, Map, MapPin, PiggyBank, ShieldCheck, Sparkles} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { useLanguage } from '../i18n.js';
import { places } from '../data/places.js';
import { generateItinerary } from '../utils/itinerary.js';

const homeCopy = {
  en: {
    eyebrow: 'Oaxaca local guide',
    title: 'Experience Oaxaca, not someone else’s tour',
    subtitle: 'Discover authentic places, local advice, safety insights, and flexible itineraries designed for independent travelers.',
    ctaExplore: 'Start Exploring',
    ctaPlan: 'Generate 1-day itinerary',
    ctaMap: 'Open map',
    promise: 'Spend more on Oaxaca itself—and less on tour fees.',
    buildDay: 'Build My Day',
    stampOne: 'Local knowledge.',
    stampTwo: 'Real experiences.',
    stampThree: 'Your way.',
    tabsTitle: 'Why TuTour?',
    foodTab: 'Taste markets, mole, tlayudas, memelas, and mezcal with practical timing tips.',
    cultureTab: 'Visit Santo Domingo, museums, artisan villages, textiles, alebrijes, and ruins.',
    natureTab: 'Plan viewpoints, gardens, ancient trees, petrified waterfalls, and easy outdoor breaks.',
    saveMoneyTitle: 'Save Money',
    saveMoneyText: 'Spend your budget on local restaurants, artisans, mezcal producers, and experiences instead of expensive guided tours.',
    exploreFreelyTitle: 'Explore Freely',
    exploreFreelyText: 'Move at your own pace. Stay longer where you love it, follow live map links, and skip what does not interest you.',
    buildMemoriesTitle: 'Create Real Memories',
    buildMemoriesText: 'Create your own Oaxaca stories with local context, safety advice, and recommendations that feel personal—not scripted.',
    sooooWhyTitle: 'Soooo why TuTour...?',
    supportLocalTitle: 'Support Local Oaxaca',
    picksTitle: 'Local recommendations',
    viewAll: 'View all',
    guideTitle: '1-day tour guide plan',
    guideText: 'Tap generate and TuTour builds morning, afternoon, and night stops with safety-aware pacing.',
    safetyTitle: 'Safety advice',
    safetyText: 'Use registered taxis at night, confirm current hours on Google Maps, carry cash for markets, and avoid isolated areas after dark.',
    closePopup: 'Close popup'
  },
  es: {
    eyebrow: 'Guía local de Oaxaca',
    title: 'Vive Oaxaca, no el tour de otra persona',
    subtitle: 'Descubre lugares auténticos, consejos locales, seguridad e itinerarios flexibles para viajeros independientes.',
    ctaExplore: 'Empezar a explorar',
    ctaPlan: 'Generar itinerario de 1 día',
    ctaMap: 'Abrir mapa',
    promise: 'Gasta más en Oaxaca y menos en tarifas de tours.',
    buildDay: 'Armar mi día',
    stampOne: 'Conocimiento local.',
    stampTwo: 'Experiencias reales.',
    stampThree: 'A tu manera.',
    tabsTitle: '¿Por qué TuTour?',
    foodTab: 'Prueba mercados, mole, tlayudas, memelas y mezcal con consejos prácticos de horario.',
    cultureTab: 'Visita Santo Domingo, museos, pueblos artesanos, textiles, alebrijes y ruinas.',
    natureTab: 'Planea miradores, jardines, árboles antiguos, cascadas petrificadas y pausas al aire libre.',
    saveMoneyTitle: 'Ahorra dinero',
    saveMoneyText: 'Gasta tu presupuesto en restaurantes locales, artesanos, productores de mezcal y experiencias en lugar de tours caros.',
    exploreFreelyTitle: 'Explora libremente',
    exploreFreelyText: 'Muévete a tu ritmo. Quédate más donde te encante, sigue enlaces de mapa en vivo y salta lo que no te interese.',
    buildMemoriesTitle: 'Crea recuerdos reales',
    buildMemoriesText: 'Crea tus propias historias de Oaxaca con contexto local, consejos de seguridad y recomendaciones personales, no guionizadas.',
    sooooWhyTitle: 'Entonces, ¿por qué TuTour...?',
    supportLocalTitle: 'Apoya Oaxaca local',
    picksTitle: 'Recomendaciones locales',
    viewAll: 'Ver todo',
    guideTitle: 'Plan de guía turística de 1 día',
    guideText: 'Toca generar y TuTour crea paradas de mañana, tarde y noche con ritmo seguro.',
    safetyTitle: 'Consejos de seguridad',
    safetyText: 'Usa taxis registrados de noche, confirma horarios actuales en Google Maps, lleva efectivo a mercados y evita zonas aisladas después de oscurecer.',
    closePopup: 'Cerrar ventana'
  },
  fr: {
    eyebrow: 'Guide local d’Oaxaca',
    title: 'Vivez Oaxaca, pas le circuit de quelqu’un d’autre',
    subtitle: 'Découvrez des lieux authentiques, des conseils locaux, des informations de sécurité et des itinéraires flexibles pour voyageurs indépendants.',
    ctaExplore: 'Commencer l’exploration',
    ctaPlan: 'Générer l’itinéraire 1 jour',
    ctaMap: 'Ouvrir la carte',
    promise: 'Dépensez plus pour Oaxaca, et moins en frais de visite.',
    buildDay: 'Construire ma journée',
    stampOne: 'Savoir local.',
    stampTwo: 'Expériences réelles.',
    stampThree: 'À votre façon.',
    tabsTitle: 'Pourquoi TuTour ?',
    foodTab: 'Goûtez marchés, mole, tlayudas, memelas et mezcal avec des conseils horaires pratiques.',
    cultureTab: 'Visitez Santo Domingo, musées, villages artisans, textiles, alebrijes et ruines.',
    natureTab: 'Planifiez belvédères, jardins, arbres anciens, cascades pétrifiées et pauses nature.',
    saveMoneyTitle: 'Économisez',
    saveMoneyText: 'Consacrez votre budget aux restaurants locaux, artisans, producteurs de mezcal et expériences plutôt qu’à des visites guidées coûteuses.',
    exploreFreelyTitle: 'Explorez librement',
    exploreFreelyText: 'Avancez à votre rythme. Restez plus longtemps là où vous aimez, suivez les liens de carte et évitez ce qui ne vous intéresse pas.',
    buildMemoriesTitle: 'Créez de vrais souvenirs',
    buildMemoriesText: 'Créez vos propres histoires d’Oaxaca avec contexte local, conseils de sécurité et recommandations personnelles, pas scénarisées.',
    sooooWhyTitle: 'Alors, pourquoi TuTour... ?',
    supportLocalTitle: 'Soutenez Oaxaca local',
    picksTitle: 'Recommandations locales',
    viewAll: 'Tout voir',
    guideTitle: 'Plan de guide 1 jour',
    guideText: 'Touchez générer et TuTour crée les arrêts du matin, de l’après-midi et du soir avec un rythme sûr.',
    safetyTitle: 'Conseils de sécurité',
    safetyText: 'Utilisez des taxis enregistrés la nuit, vérifiez les horaires sur Google Maps, gardez de l’argent liquide pour les marchés et évitez les zones isolées après la nuit.',
    closePopup: 'Fermer la fenêtre'
  },
  de: {
    eyebrow: 'Lokaler Oaxaca-Guide',
    title: 'Erlebe Oaxaca, nicht die Tour eines anderen',
    subtitle: 'Entdecke authentische Orte, lokale Tipps, Sicherheitshinweise und flexible Routen für unabhängige Reisende.',
    ctaExplore: 'Entdeckung starten',
    ctaPlan: '1-Tages-Route erstellen',
    ctaMap: 'Karte öffnen',
    promise: 'Gib mehr für Oaxaca selbst aus – und weniger für Tourgebühren.',
    buildDay: 'Meinen Tag bauen',
    stampOne: 'Lokales Wissen.',
    stampTwo: 'Echte Erlebnisse.',
    stampThree: 'Dein Weg.',
    tabsTitle: 'Warum TuTour?',
    foodTab: 'Probiere Märkte, Mole, Tlayudas, Memelas und Mezcal mit praktischen Zeittipps.',
    cultureTab: 'Besuche Santo Domingo, Museen, Handwerksdörfer, Textilien, Alebrijes und Ruinen.',
    natureTab: 'Plane Aussichtspunkte, Gärten, alte Bäume, versteinerte Wasserfälle und leichte Naturpausen.',
    saveMoneyTitle: 'Geld sparen',
    saveMoneyText: 'Gib dein Budget für lokale Restaurants, Kunsthandwerker, Mezcal-Produzenten und Erlebnisse aus statt für teure geführte Touren.',
    exploreFreelyTitle: 'Frei erkunden',
    exploreFreelyText: 'Bewege dich in deinem Tempo. Bleib länger, wo es dir gefällt, nutze Kartenlinks und überspringe, was dich nicht interessiert.',
    buildMemoriesTitle: 'Echte Erinnerungen schaffen',
    buildMemoriesText: 'Gestalte deine eigenen Oaxaca-Geschichten mit lokalem Kontext, Sicherheitstipps und persönlichen Empfehlungen statt einem Skript.',
    sooooWhyTitle: 'Alsooo, warum TuTour...?',
    supportLocalTitle: 'Lokales Oaxaca unterstützen',
    picksTitle: 'Lokale Empfehlungen',
    viewAll: 'Alle ansehen',
    guideTitle: '1-Tages-Reiseplan',
    guideText: 'Tippe auf Erstellen und TuTour plant Morgen, Nachmittag und Abend mit sicherem Tempo.',
    safetyTitle: 'Sicherheitstipps',
    safetyText: 'Nutze nachts registrierte Taxis, prüfe aktuelle Öffnungszeiten auf Google Maps, nimm Bargeld für Märkte mit und meide abgelegene Bereiche nach Einbruch der Dunkelheit.',
    closePopup: 'Popup schließen'
  },
  it: {
    eyebrow: 'Guida locale di Oaxaca',
    title: 'Vivi Oaxaca, non il tour di qualcun altro',
    subtitle: 'Scopri luoghi autentici, consigli locali, note di sicurezza e itinerari flessibili per viaggiatori indipendenti.',
    ctaExplore: 'Inizia a esplorare',
    ctaPlan: 'Genera itinerario di 1 giorno',
    ctaMap: 'Apri mappa',
    promise: 'Spendi di più per Oaxaca e meno per le tariffe dei tour.',
    buildDay: 'Crea la mia giornata',
    stampOne: 'Conoscenza locale.',
    stampTwo: 'Esperienze reali.',
    stampThree: 'A modo tuo.',
    tabsTitle: 'Perché TuTour?',
    foodTab: 'Assaggia mercati, mole, tlayudas, memelas e mezcal con consigli pratici sugli orari.',
    cultureTab: 'Visita Santo Domingo, musei, villaggi artigiani, tessuti, alebrijes e rovine.',
    natureTab: 'Pianifica punti panoramici, giardini, alberi antichi, cascate pietrificate e pause nella natura.',
    saveMoneyTitle: 'Risparmia',
    saveMoneyText: 'Usa il budget per ristoranti locali, artigiani, produttori di mezcal ed esperienze invece che per costosi tour guidati.',
    exploreFreelyTitle: 'Esplora liberamente',
    exploreFreelyText: 'Muoviti al tuo ritmo. Resta più a lungo dove ti piace, segui i link alle mappe e salta ciò che non ti interessa.',
    buildMemoriesTitle: 'Crea ricordi veri',
    buildMemoriesText: 'Crea le tue storie di Oaxaca con contesto locale, consigli di sicurezza e raccomandazioni personali, non un copione.',
    sooooWhyTitle: 'Allora, perché TuTour...?',
    supportLocalTitle: 'Sostieni Oaxaca locale',
    picksTitle: 'Consigli locali',
    viewAll: 'Vedi tutto',
    guideTitle: 'Piano guida di 1 giorno',
    guideText: 'Tocca genera e TuTour crea tappe di mattina, pomeriggio e sera con ritmo sicuro.',
    safetyTitle: 'Consigli di sicurezza',
    safetyText: 'Usa taxi registrati di notte, conferma gli orari su Google Maps, porta contanti per i mercati ed evita zone isolate dopo il buio.',
    closePopup: 'Chiudi popup'
  },
  pt: {
    eyebrow: 'Guia local de Oaxaca',
    title: 'Viva Oaxaca, não o tour de outra pessoa',
    subtitle: 'Descubra lugares autênticos, conselhos locais, segurança e roteiros flexíveis para viajantes independentes.',
    ctaExplore: 'Começar a explorar',
    ctaPlan: 'Gerar roteiro de 1 dia',
    ctaMap: 'Abrir mapa',
    promise: 'Gaste mais em Oaxaca e menos em taxas de excursão.',
    buildDay: 'Montar meu dia',
    stampOne: 'Conhecimento local.',
    stampTwo: 'Experiências reais.',
    stampThree: 'Do seu jeito.',
    tabsTitle: 'Por que TuTour?',
    foodTab: 'Prove mercados, mole, tlayudas, memelas e mezcal com dicas práticas de horário.',
    cultureTab: 'Visite Santo Domingo, museus, vilas artesanais, tecidos, alebrijes e ruínas.',
    natureTab: 'Planeje mirantes, jardins, árvores antigas, cachoeiras petrificadas e pausas ao ar livre.',
    saveMoneyTitle: 'Economize',
    saveMoneyText: 'Use seu orçamento em restaurantes locais, artesãos, produtores de mezcal e experiências em vez de passeios guiados caros.',
    exploreFreelyTitle: 'Explore livremente',
    exploreFreelyText: 'Viaje no seu ritmo. Fique mais onde gostar, siga links de mapa em tempo real e pule o que não interessar.',
    buildMemoriesTitle: 'Crie memórias reais',
    buildMemoriesText: 'Crie suas próprias histórias de Oaxaca com contexto local, dicas de segurança e recomendações pessoais, não roteirizadas.',
    sooooWhyTitle: 'Entãooo, por que TuTour...?',
    supportLocalTitle: 'Apoie Oaxaca local',
    picksTitle: 'Recomendações locais',
    viewAll: 'Ver tudo',
    guideTitle: 'Plano de guia de 1 dia',
    guideText: 'Toque em gerar e o TuTour monta manhã, tarde e noite com ritmo seguro.',
    safetyTitle: 'Dicas de segurança',
    safetyText: 'Use táxis registrados à noite, confirme horários atuais no Google Maps, leve dinheiro para mercados e evite áreas isoladas depois do anoitecer.',
    closePopup: 'Fechar janela'
  },
  ja: {
    eyebrow: 'オアハカ現地ガイド',
    title: '誰かのツアーではなく、自分のオアハカを体験',
    subtitle: '本物の場所、地元の助言、安全情報、自由な旅程を独立旅行者向けにまとめました。',
    ctaExplore: '探索を始める',
    ctaPlan: '1日プランを作成',
    ctaMap: '地図を開く',
    promise: 'ツアー料金より、オアハカそのものにもっと使いましょう。',
    buildDay: '今日のプランを作る',
    stampOne: '地元の知識。',
    stampTwo: '本物の体験。',
    stampThree: '自分らしく。',
    tabsTitle: 'なぜTuTour？',
    foodTab: '市場、モレ、トラユーダ、メメラ、メスカルを実用的な時間のコツと一緒に楽しむ。',
    cultureTab: 'サント・ドミンゴ、博物館、職人村、織物、アレブリヘ、遺跡を訪れる。',
    natureTab: '展望台、庭園、古木、石化した滝、気軽な屋外休憩を計画する。',
    saveMoneyTitle: 'お金を節約',
    saveMoneyText: '高額なガイドツアーではなく、地元の食堂、職人、メスカル生産者、体験に予算を使えます。',
    exploreFreelyTitle: '自由に探索',
    exploreFreelyText: '自分のペースで移動。好きな場所に長く滞在し、地図リンクを使い、興味のない場所は飛ばせます。',
    buildMemoriesTitle: '本当の思い出を作る',
    buildMemoriesText: '地元の背景、安全アドバイス、自分に合うおすすめで、台本ではないオアハカの物語を作れます。',
    sooooWhyTitle: 'それで、なぜTuTour...？',
    supportLocalTitle: '地元オアハカを応援',
    picksTitle: '地元のおすすめ',
    viewAll: 'すべて見る',
    guideTitle: '1日ツアーガイドプラン',
    guideText: '生成をタップすると、TuTourが午前・午後・夜 of 立ち寄り先を安全なペースで組みます。',
    safetyTitle: '安全アドバイス',
    safetyText: '夜は登録タクシーを使い、Google Mapsで最新営業時間を確認し、市場用に現金を持ち、暗くなった後は人通りの少ない場所を避けましょう。',
    closePopup: 'ポップアップを閉じる'
  },
  zh: {
    eyebrow: '瓦哈卡本地指南',
    title: '体验瓦哈卡，而不是别人的旅行团',
    subtitle: '为独立旅行者发现真实地点、本地建议、安全提示和灵活行程。',
    ctaExplore: '开始探索',
    ctaPlan: '生成一日行程',
    ctaMap: '打开地图',
    promise: '把更多预算花在瓦哈卡本身，而不是旅行团费用上。',
    buildDay: '安排我的一天',
    stampOne: '本地知识。',
    stampTwo: '真实体验。',
    stampThree: '你的方式。',
    tabsTitle: '为什么选择 TuTour？',
    foodTab: '品尝市场、mole、tlayudas、memelas 和 mezcal，并获得实用时间建议。',
    cultureTab: '参观 Santo Domingo、博物馆、手工艺村、纺织品、alebrijes 和遗迹。',
    natureTab: '安排观景点、花园、古树、石化瀑布和轻松的户外休息。',
    saveMoneyTitle: '省钱',
    saveMoneyText: '把预算花在本地餐馆、手工艺人、mezcal 生产者和体验上，而不是昂贵的导游团。',
    exploreFreelyTitle: '自由探索',
    exploreFreelyText: '按自己的节奏行动。喜欢的地方多停留，使用实时地图链接，跳过不感兴趣的内容。',
    buildMemoriesTitle: '创造真实回忆',
    buildMemoriesText: '通过本地背景、安全建议和个性化推荐，创造属于自己的瓦哈卡故事，而不是照着脚本旅行。',
    sooooWhyTitle: '那么，为什么选择 TuTour...？',
    supportLocalTitle: '支持本地瓦哈卡',
    picksTitle: '本地推荐',
    viewAll: '查看全部',
    guideTitle: '一日导游计划',
    guideText: '点击生成，TuTour 会按上午、下午、夜晚安排节奏安全的停靠点。',
    safetyTitle: '安全建议',
    safetyText: '夜间使用正规出租车，在 Google Maps 确认当前营业时间，为市场准备现金，天黑后避开偏僻区域。',
    closePopup: '关闭弹窗'
  }
};

const whyTuTourInfo = [
  { key: 'saveMoney', titleKey: 'saveMoneyTitle', textKey: 'saveMoneyText', category: 'food', icon: PiggyBank, circle: 'bg-orange-700', wave: 'text-orange-500', card: 'from-orange-50 via-fuchsia-50 to-orange-100/80 border-orange-200' },
  { key: 'exploreFreely', titleKey: 'exploreFreelyTitle', textKey: 'exploreFreelyText', category: 'nature', icon: Map, circle: 'bg-purple-700', wave: 'text-purple-500', card: 'from-purple-50 via-orange-50 to-fuchsia-50 border-purple-200' },
  { key: 'buildMemories', titleKey: 'buildMemoriesTitle', textKey: 'buildMemoriesText', category: 'culture', icon: Camera, circle: 'bg-fuchsia-700', wave: 'text-fuchsia-500', card: 'from-fuchsia-50 via-violet-50 to-orange-50 border-fuchsia-200' },
  { key: 'supportLocalOaxaca', titleKey: 'supportLocalTitle', title: 'Support Local Oaxaca', textKey: null, category: 'local', icon: Heart, circle: 'bg-purple-800', wave: 'text-orange-500', card: 'from-purple-50 via-orange-50 to-fuchsia-50 border-purple-200' },
  { key: 'sooooWhyTuTour', titleKey: 'sooooWhyTitle', title: 'Soooo why TuTour...?', textKey: null, category: 'guide', icon: Sparkles, circle: 'bg-orange-800', wave: 'text-purple-500', card: 'from-orange-50 via-purple-50 to-orange-100/80 border-orange-200' }
];

const saveMoneyPopupCopy = {
  en: {
    subtitle: 'Spend More on Oaxaca. Less on Tour Fees.',
    paragraphs: [
      'Traditional tours can cost a significant portion of a travel budget before you even buy a meal, artisan craft, or local experience.',
      'TuTour helps you discover Oaxaca independently using local knowledge, curated recommendations, safety advice, and flexible itineraries.',
      'Instead of spending your budget on guide fees, you can:',
      'Every peso saved on tour costs can become a peso spent inside Oaxaca\'s local economy.',
      'TuTour doesn\'t replace Oaxaca\'s tourism sector—it helps distribute tourism spending across the communities, markets, workshops, and businesses that make Oaxaca unique.',
      'Your budget goes further. Oaxaca benefits more.'
    ],
    bullets: ['Enjoy more local restaurants', 'Buy directly from artisans', 'Visit mezcal producers', 'Support family-owned businesses', 'Extend your trip budget']
  },
  es: {
    subtitle: 'Gasta más en Oaxaca. Menos en tarifas de tours.',
    paragraphs: [
      'Los tours tradicionales pueden consumir una parte importante del presupuesto de viaje antes de comprar una comida, una artesanía o una experiencia local.',
      'TuTour te ayuda a descubrir Oaxaca de forma independiente con conocimiento local, recomendaciones curadas, consejos de seguridad e itinerarios flexibles.',
      'En lugar de gastar tu presupuesto en tarifas de guía, puedes:',
      'Cada peso ahorrado en costos de tour puede convertirse en un peso gastado dentro de la economía local de Oaxaca.',
      'TuTour no reemplaza al sector turístico de Oaxaca: ayuda a distribuir el gasto turístico entre las comunidades, mercados, talleres y negocios que hacen única a Oaxaca.',
      'Tu presupuesto rinde más. Oaxaca se beneficia más.'
    ],
    bullets: ['Disfrutar más restaurantes locales', 'Comprar directamente a artesanos', 'Visitar productores de mezcal', 'Apoyar negocios familiares', 'Extender tu presupuesto de viaje']
  },
  fr: {
    subtitle: 'Dépensez plus à Oaxaca. Moins en frais de visite.',
    paragraphs: [
      'Les visites traditionnelles peuvent absorber une part importante du budget de voyage avant même un repas, un artisanat ou une expérience locale.',
      'TuTour vous aide à découvrir Oaxaca en autonomie grâce au savoir local, aux recommandations sélectionnées, aux conseils de sécurité et aux itinéraires flexibles.',
      'Au lieu de consacrer votre budget aux frais de guide, vous pouvez :',
      'Chaque peso économisé sur les visites peut devenir un peso dépensé dans l’économie locale d’Oaxaca.',
      'TuTour ne remplace pas le secteur touristique d’Oaxaca : il aide à répartir les dépenses touristiques entre les communautés, marchés, ateliers et entreprises qui rendent Oaxaca unique.',
      'Votre budget va plus loin. Oaxaca en bénéficie davantage.'
    ],
    bullets: ['Profiter de plus de restaurants locaux', 'Acheter directement auprès des artisans', 'Visiter des producteurs de mezcal', 'Soutenir des entreprises familiales', 'Allonger votre budget de voyage']
  },
  de: {
    subtitle: 'Mehr für Oaxaca ausgeben. Weniger für Tourgebühren.',
    paragraphs: [
      'Traditionelle Touren können einen erheblichen Teil des Reisebudgets kosten, bevor du überhaupt eine Mahlzeit, ein Kunsthandwerk oder ein lokales Erlebnis kaufst.',
      'TuTour hilft dir, Oaxaca unabhängig zu entdecken – mit lokalem Wissen, kuratierten Empfehlungen, Sicherheitshinweisen und flexiblen Routen.',
      'Anstatt dein Budget für Guide-Gebühren auszugeben, kannst du:',
      'Jeder Peso, den du bei Tourkosten sparst, kann in Oaxacas lokaler Wirtschaft ausgegeben werden.',
      'TuTour ersetzt Oaxacas Tourismussektor nicht – es hilft, Tourismuseinnahmen auf die Gemeinden, Märkte, Werkstätten und Betriebe zu verteilen, die Oaxaca einzigartig machen.',
      'Dein Budget reicht weiter. Oaxaca profitiert mehr.'
    ],
    bullets: ['Mehr lokale Restaurants genießen', 'Direkt bei Kunsthandwerkern kaufen', 'Mezcal-Produzenten besuchen', 'Familienbetriebe unterstützen', 'Dein Reisebudget verlängern']
  },
  it: {
    subtitle: 'Spendi di più a Oaxaca. Meno in tariffe per tour.',
    paragraphs: [
      'I tour tradizionali possono assorbire una parte significativa del budget di viaggio prima ancora di acquistare un pasto, un oggetto artigianale o un’esperienza locale.',
      'TuTour ti aiuta a scoprire Oaxaca in autonomia con conoscenza locale, consigli curati, suggerimenti di sicurezza e itinerari flessibili.',
      'Invece di spendere il budget in tariffe per guide, puoi:',
      'Ogni peso risparmiato sui costi dei tour può diventare un peso speso nell’economia locale di Oaxaca.',
      'TuTour non sostituisce il settore turistico di Oaxaca: aiuta a distribuire la spesa turistica tra comunità, mercati, laboratori e attività che rendono Oaxaca unica.',
      'Il tuo budget va più lontano. Oaxaca ne beneficia di più.'
    ],
    bullets: ['Goderti più ristoranti locali', 'Comprare direttamente dagli artigiani', 'Visitare produttori di mezcal', 'Sostenere attività familiari', 'Allungare il budget del viaggio']
  },
  pt: {
    subtitle: 'Gaste mais em Oaxaca. Menos em taxas de excursão.',
    paragraphs: [
      'Passeios tradicionais podem consumir uma parte significativa do orçamento de viagem antes mesmo de você comprar uma refeição, artesanato ou experiência local.',
      'O TuTour ajuda você a descobrir Oaxaca de forma independente com conhecimento local, recomendações selecionadas, conselhos de segurança e roteiros flexíveis.',
      'Em vez de gastar seu orçamento com guias, você pode:',
      'Cada peso economizado em custos de excursão pode virar um peso gasto dentro da economia local de Oaxaca.',
      'O TuTour não substitui o setor turístico de Oaxaca — ele ajuda a distribuir os gastos turísticos pelas comunidades, mercados, oficinas e negócios que tornam Oaxaca única.',
      'Seu orçamento vai mais longe. Oaxaca se beneficia mais.'
    ],
    bullets: ['Aproveitar mais restaurantes locais', 'Comprar diretamente de artesãos', 'Visitar produtores de mezcal', 'Apoiar negócios familiares', 'Estender seu orçamento de viagem']
  },
  ja: {
    subtitle: 'ツアー料金を抑えて、オアハカでより多く使う。',
    paragraphs: [
      '従来のツアーは、食事や工芸品、地元体験を購入する前に、旅の予算の大きな部分を占めることがあります。',
      'TuTourは、地元の知識、厳選されたおすすめ、安全アドバイス、柔軟な旅程を使って、オアハカを自分のペースで発見する手助けをします。',
      'ガイド料金に予算を使う代わりに、次のことができます。',
      'ツアー費用で節約した1ペソは、オアハカの地域経済の中で使う1ペソになります。',
      'TuTourはオアハカの観光業に取って代わるものではありません。オアハカを特別にしている地域、マーケット、工房、事業者へ観光支出を広げる手助けをします。',
      '予算はさらに伸び、オアハカにもより多く還元されます。'
    ],
    bullets: ['地元レストランをもっと楽しむ', '職人から直接購入する', 'メスカル生産者を訪ねる', '家族経営の店を支援する', '旅の予算を長持ちさせる']
  },
  zh: {
    subtitle: '把更多预算花在瓦哈卡，少花在旅行团费用上。',
    paragraphs: [
      '传统旅行团可能在你购买一顿饭、一件手工艺品或一次本地体验之前，就占用旅行预算的很大一部分。',
      'TuTour 通过本地知识、精选推荐、安全建议和灵活行程，帮助你独立探索瓦哈卡。',
      '与其把预算花在导游费用上，你可以：',
      '每一比索省下来的旅行团费用，都可以变成花在瓦哈卡本地经济中的一比索。',
      'TuTour 并不取代瓦哈卡的旅游业——它帮助把旅游消费分配到让瓦哈卡独特的社区、市场、作坊和商家。',
      '你的预算走得更远。瓦哈卡受益更多。'
    ],
    bullets: ['享受更多本地餐厅', '直接向手工艺人购买', '参观 mezcal 生产者', '支持家庭经营企业', '延长你的旅行预算']
  }
};

const exploreFreelyPopupCopy = {
  en: {
    title: '',
    subtitle: 'Travel at Your Own Pace.',
    intro: [
      'Not every traveler wants the same experience.',
      'Some people want to spend an hour photographing a colorful street.',
      'Others want to stay all afternoon in a market tasting food.',
      'Traditional tours follow schedules.',
      'TuTour follows you.'
    ],
    lead: 'With live maps, local recommendations, safety guidance, and flexible itineraries, you can:',
    bullets: ['Stay longer where you feel inspired', 'Skip places that don\'t interest you', 'Change plans at any moment', 'Discover unexpected places', 'Build your day around your interests'],
    closing: ['There is no group to keep up with.', 'No timetable to follow.', 'No guide rushing you to the next stop.', 'Oaxaca becomes yours to explore.']
  },
  es: {
    title: '',
    subtitle: 'Viaja a tu propio ritmo.',
    intro: [
      'No todos los viajeros quieren la misma experiencia.',
      'Algunas personas quieren pasar una hora fotografiando una calle colorida.',
      'Otras quieren quedarse toda la tarde en un mercado probando comida.',
      'Los tours tradicionales siguen horarios.',
      'TuTour te sigue a ti.'
    ],
    lead: 'Con mapas en vivo, recomendaciones locales, orientación de seguridad e itinerarios flexibles, puedes:',
    bullets: ['Quedarte más tiempo donde te sientas inspirado', 'Saltar lugares que no te interesen', 'Cambiar planes en cualquier momento', 'Descubrir lugares inesperados', 'Construir tu día alrededor de tus intereses'],
    closing: ['No hay grupo al que seguirle el paso.', 'No hay horario obligatorio.', 'No hay guía apurándote hacia la siguiente parada.', 'Oaxaca se vuelve tuya para explorar.']
  },
  fr: {
    title: 'Explorez librement',
    subtitle: 'Voyagez à votre propre rythme.',
    intro: [
      'Tous les voyageurs ne recherchent pas la même expérience.',
      'Certains veulent passer une heure à photographier une rue colorée.',
      'D’autres veulent rester tout l’après-midi dans un marché à goûter la cuisine.',
      'Les visites traditionnelles suivent des horaires.',
      'TuTour vous suit.'
    ],
    lead: 'Avec des cartes en direct, des recommandations locales, des conseils de sécurité et des itinéraires flexibles, vous pouvez :',
    bullets: ['Rester plus longtemps là où vous vous sentez inspiré', 'Ignorer les lieux qui ne vous intéressent pas', 'Changer de plan à tout moment', 'Découvrir des lieux inattendus', 'Construire votre journée autour de vos intérêts'],
    closing: ['Il n’y a pas de groupe à suivre.', 'Aucun horaire imposé.', 'Aucun guide ne vous presse vers l’arrêt suivant.', 'Oaxaca devient vôtre à explorer.']
  },
  de: {
    title: 'Frei erkunden',
    subtitle: 'Reise in deinem eigenen Tempo.',
    intro: [
      'Nicht jeder Reisende möchte dieselbe Erfahrung.',
      'Manche möchten eine Stunde lang eine farbenfrohe Straße fotografieren.',
      'Andere möchten den ganzen Nachmittag auf einem Markt bleiben und Essen probieren.',
      'Traditionelle Touren folgen Zeitplänen.',
      'TuTour folgt dir.'
    ],
    lead: 'Mit Live-Karten, lokalen Empfehlungen, Sicherheitshinweisen und flexiblen Routen kannst du:',
    bullets: ['Länger bleiben, wo du dich inspiriert fühlst', 'Orte überspringen, die dich nicht interessieren', 'Pläne jederzeit ändern', 'Unerwartete Orte entdecken', 'Deinen Tag nach deinen Interessen gestalten'],
    closing: ['Es gibt keine Gruppe, mit der du Schritt halten musst.', 'Keinen Zeitplan, dem du folgen musst.', 'Keinen Guide, der dich zur nächsten Station drängt.', 'Oaxaca wird dein Ort zum Erkunden.']
  },
  it: {
    title: 'Esplora liberamente',
    subtitle: 'Viaggia al tuo ritmo.',
    intro: [
      'Non tutti i viaggiatori desiderano la stessa esperienza.',
      'Alcuni vogliono passare un’ora a fotografare una strada colorata.',
      'Altri vogliono restare tutto il pomeriggio in un mercato ad assaggiare cibo.',
      'I tour tradizionali seguono orari prestabiliti.',
      'TuTour segue te.'
    ],
    lead: 'Con mappe live, consigli locali, indicazioni di sicurezza e itinerari flessibili, puoi:',
    bullets: ['Restare più a lungo dove ti senti ispirato', 'Saltare i luoghi che non ti interessano', 'Cambiare piano in qualsiasi momento', 'Scoprire luoghi inaspettati', 'Costruire la giornata intorno ai tuoi interessi'],
    closing: ['Non c’è un gruppo da seguire.', 'Nessun orario da rispettare.', 'Nessuna guida che ti spinge alla prossima tappa.', 'Oaxaca diventa tua da esplorare.']
  },
  pt: {
    title: 'Explore livremente',
    subtitle: 'Viaje no seu próprio ritmo.',
    intro: [
      'Nem todo viajante quer a mesma experiência.',
      'Algumas pessoas querem passar uma hora fotografando uma rua colorida.',
      'Outras querem ficar a tarde inteira em um mercado provando comida.',
      'Passeios tradicionais seguem horários.',
      'O TuTour segue você.'
    ],
    lead: 'Com mapas ao vivo, recomendações locais, orientação de segurança e roteiros flexíveis, você pode:',
    bullets: ['Ficar mais tempo onde se sentir inspirado', 'Pular lugares que não interessam', 'Mudar planos a qualquer momento', 'Descobrir lugares inesperados', 'Construir seu dia em torno dos seus interesses'],
    closing: ['Não há grupo para acompanhar.', 'Nenhum horário para seguir.', 'Nenhum guia apressando você para a próxima parada.', 'Oaxaca se torna sua para explorar.']
  },
  ja: {
    title: '自由に探索',
    subtitle: '自分のペースで旅する。',
    intro: [
      'すべての旅行者が同じ体験を求めているわけではありません。',
      '色鮮やかな通りを1時間かけて撮影したい人もいます。',
      '市場で午後いっぱい食べ歩きをしたい人もいます。',
      '従来のツアーはスケジュールに従います。',
      'TuTourはあなたに合わせます。'
    ],
    lead: 'ライブマップ、地元のおすすめ、安全ガイド、柔軟な旅程があれば、次のことができます。',
    bullets: ['心が動く場所に長く滞在する', '興味のない場所を飛ばす', 'いつでも予定を変える', '思いがけない場所を発見する', '自分の興味に合わせて1日を組み立てる'],
    closing: ['歩調を合わせるグループはありません。', '従うべき時間割もありません。', '次の場所へ急かすガイドもいません。', 'オアハカはあなた自身が探索する場所になります。']
  },
  zh: {
    title: '自由探索',
    subtitle: '按照自己的节奏旅行。',
    intro: [
      '并不是每位旅行者都想要同一种体验。',
      '有些人想花一小时拍摄一条色彩丰富的街道。',
      '另一些人想整个下午待在市场里品尝美食。',
      '传统旅行团按时间表走。',
      'TuTour 跟随你。'
    ],
    lead: '借助实时地图、本地推荐、安全指引和灵活行程，你可以：',
    bullets: ['在感到有灵感的地方停留更久', '跳过不感兴趣的地点', '随时改变计划', '发现意想不到的地方', '围绕自己的兴趣安排一天'],
    closing: ['没有需要跟上的团队。', '没有必须遵守的时间表。', '没有导游催你去下一站。', '瓦哈卡成为属于你的探索之地。']
  }
};

const buildMemoriesPopupCopy = {
  en: {
    title: '',
    subtitle: 'Create Your Own Story.',
    paragraphs: [
      'Many tours tell visitors exactly where to stand, what to photograph, what to eat, and what to think.',
      'The result is often the same experience repeated thousands of times.',
      'TuTour helps travelers discover Oaxaca through their own choices.',
      'The moments you remember most often aren\'t the ones planned by someone else.',
      'They\'re the unexpected conversations.',
      'The hidden courtyard you found by accident.',
      'The market stall recommended by a local.',
      'The sunset you stayed to watch because nobody was telling you it was time to leave.',
      'These become your memories.',
      'Not a script.',
      'Not a schedule.',
      'Not someone else\'s story.',
      'The best experiences are the ones you discover yourself.'
    ]
  },
  es: {
    title: '',
    subtitle: 'Crea tu propia historia.',
    paragraphs: [
      'Muchos tours les dicen a los visitantes exactamente dónde pararse, qué fotografiar, qué comer y qué pensar.',
      'El resultado suele ser la misma experiencia repetida miles de veces.',
      'TuTour ayuda a los viajeros a descubrir Oaxaca a través de sus propias decisiones.',
      'Los momentos que más recuerdas no suelen ser los planeados por otra persona.',
      'Son las conversaciones inesperadas.',
      'El patio escondido que encontraste por accidente.',
      'El puesto del mercado recomendado por alguien local.',
      'El atardecer que te quedaste a mirar porque nadie te decía que era hora de irte.',
      'Eso se convierte en tus recuerdos.',
      'No un guion.',
      'No un horario.',
      'No la historia de otra persona.',
      'Las mejores experiencias son las que descubres por ti mismo.'
    ]
  },
  fr: {
    title: 'Créez de vrais souvenirs',
    subtitle: 'Créez votre propre histoire.',
    paragraphs: [
      'Beaucoup de visites disent aux visiteurs exactement où se placer, quoi photographier, quoi manger et quoi penser.',
      'Le résultat est souvent la même expérience répétée des milliers de fois.',
      'TuTour aide les voyageurs à découvrir Oaxaca à travers leurs propres choix.',
      'Les moments dont on se souvient le plus ne sont souvent pas ceux planifiés par quelqu’un d’autre.',
      'Ce sont les conversations inattendues.',
      'La cour cachée trouvée par hasard.',
      'Le stand de marché recommandé par une personne locale.',
      'Le coucher de soleil que vous êtes resté regarder parce que personne ne vous disait qu’il fallait partir.',
      'Ceux-ci deviennent vos souvenirs.',
      'Pas un script.',
      'Pas un horaire.',
      'Pas l’histoire de quelqu’un d’autre.',
      'Les meilleures expériences sont celles que vous découvrez vous-même.'
    ]
  },
  de: {
    title: 'Echte Erinnerungen schaffen',
    subtitle: 'Schreibe deine eigene Geschichte.',
    paragraphs: [
      'Viele Touren sagen Besuchern ganz genau, wo sie stehen, was sie fotografieren, was sie essen und was sie denken sollen.',
      'Das Ergebnis ist oft dieselbe Erfahrung, tausendfach wiederholt.',
      'TuTour hilft Reisenden, Oaxaca durch ihre eigenen Entscheidungen zu entdecken.',
      'Die Momente, an die du dich am meisten erinnerst, sind oft nicht die, die jemand anderes geplant hat.',
      'Es sind die unerwarteten Gespräche.',
      'Der versteckte Innenhof, den du zufällig gefunden hast.',
      'Der Marktstand, den dir jemand aus der Gegend empfohlen hat.',
      'Der Sonnenuntergang, den du weiter angeschaut hast, weil niemand sagte, dass es Zeit zum Gehen ist.',
      'Das werden deine Erinnerungen.',
      'Kein Skript.',
      'Kein Zeitplan.',
      'Nicht die Geschichte eines anderen.',
      'Die besten Erlebnisse sind die, die du selbst entdeckst.'
    ]
  },
  it: {
    title: 'Crea ricordi veri',
    subtitle: 'Crea la tua storia.',
    paragraphs: [
      'Molti tour dicono ai visitatori esattamente dove stare, cosa fotografare, cosa mangiare e cosa pensare.',
      'Il risultato è spesso la stessa esperienza ripetuta migliaia di volte.',
      'TuTour aiuta i viaggiatori a scoprire Oaxaca attraverso le proprie scelte.',
      'I momenti che ricordi di più spesso non sono quelli pianificati da qualcun altro.',
      'Sono le conversazioni inaspettate.',
      'Il cortile nascosto trovato per caso.',
      'La bancarella del mercato consigliata da una persona del posto.',
      'Il tramonto che sei rimasto a guardare perché nessuno ti diceva che era ora di andare.',
      'Questi diventano i tuoi ricordi.',
      'Non un copione.',
      'Non un programma.',
      'Non la storia di qualcun altro.',
      'Le esperienze migliori sono quelle che scopri da solo.'
    ]
  },
  pt: {
    title: 'Crie memórias reais',
    subtitle: 'Crie sua própria história.',
    paragraphs: [
      'Muitos passeios dizem aos visitantes exatamente onde ficar, o que fotografar, o que comer e o que pensar.',
      'O resultado costuma ser a mesma experiência repetida milhares de vezes.',
      'O TuTour ajuda viajantes a descobrir Oaxaca por meio de suas próprias escolhas.',
      'Os momentos que você mais lembra geralmente não são aqueles planejados por outra pessoa.',
      'São as conversas inesperadas.',
      'O pátio escondido que você encontrou por acaso.',
      'A barraca do mercado recomendada por alguém local.',
      'O pôr do sol que você ficou para assistir porque ninguém dizia que era hora de ir embora.',
      'Isso se torna suas memórias.',
      'Não um roteiro.',
      'Não uma programação.',
      'Não a história de outra pessoa.',
      'As melhores experiências são aquelas que você descobre por conta própria.'
    ]
  },
  ja: {
    title: '本当の思い出を作る',
    subtitle: '自分だけの物語を作る。',
    paragraphs: [
      '多くのツアーは、どこに立ち、何を撮り、何を食べ、何を考えるべきかまで訪問者に指示します。',
      'その結果、同じ体験が何千回も繰り返されることがよくあります。',
      'TuTourは、旅行者が自分の選択でオアハカを発見できるようにします。',
      '最も心に残る瞬間は、誰かが計画したものではないことが多いものです。',
      '思いがけない会話。',
      '偶然見つけた隠れた中庭。',
      '地元の人に勧められた市場の屋台。',
      '誰にも出発を急かされず、見続けた夕日。',
      'それらがあなたの思い出になります。',
      '台本ではありません。',
      '予定表でもありません。',
      '誰か別の人の物語でもありません。',
      '最高の体験は、自分で発見するものです。'
    ]
  },
  zh: {
    title: '创造真实回忆',
    subtitle: '创造属于你自己的故事。',
    paragraphs: [
      '许多旅行团会准确告诉游客该站在哪里、拍什么、吃什么、以及该怎么想。',
      '结果往往是同一种体验被重复成千上万次。',
      'TuTour 帮助旅行者通过自己的选择发现瓦哈卡。',
      '你最常记住的时刻，往往不是别人为你安排好的。',
      '而是那些意想不到的对话。',
      '偶然发现的隐秘庭院。',
      '当地人推荐的市场摊位。',
      '因为没人催你离开而留下来看的日落。',
      '这些才会成为你的回忆。',
      '不是脚本。',
      '不是日程表。',
      '不是别人的故事。',
      '最好的体验，是你亲自发现的体验。'
    ]
  }
};

const supportLocalPopupCopy = {
  en: {
    eyebrow: '',
    subtitle: 'Keep Tourism Local.',
    intro: 'Oaxaca\'s culture is created by thousands of people:',
    bullets: ['Artisans', 'Market vendors', 'Family restaurants', 'Mezcal producers', 'Musicians', 'Small business owners'],
    paragraphs: [
      'TuTour helps travelers connect directly with these experiences.',
      'When visitors spend locally, more tourism revenue reaches the people who preserve Oaxaca\'s traditions and culture every day.',
      'The goal isn\'t to replace guides or organized tours.',
      'The goal is to give travelers another option—one that encourages independent exploration while helping tourism dollars reach more corners of Oaxaca.',
      'More local connections. More local impact.'
    ]
  },
  es: {
    eyebrow: '',
    subtitle: 'Mantén el turismo local.',
    intro: 'La cultura de Oaxaca es creada por miles de personas:',
    bullets: ['Artesanos', 'Vendedores de mercados', 'Restaurantes familiares', 'Productores de mezcal', 'Músicos', 'Pequeños negocios'],
    paragraphs: [
      'TuTour ayuda a los viajeros a conectar directamente con estas experiencias.',
      'Cuando los visitantes gastan localmente, más ingresos del turismo llegan a las personas que preservan las tradiciones y la cultura de Oaxaca todos los días.',
      'El objetivo no es reemplazar a los guías ni a los tours organizados.',
      'El objetivo es dar a los viajeros otra opción: una que fomente la exploración independiente y ayude a que el dinero del turismo llegue a más rincones de Oaxaca.',
      'Más conexiones locales. Más impacto local.'
    ]
  },
  fr: {
    eyebrow: 'Soutenez Oaxaca local',
    subtitle: 'Gardons le tourisme local.',
    intro: 'La culture d’Oaxaca est créée par des milliers de personnes :',
    bullets: ['Artisans', 'Vendeurs de marché', 'Restaurants familiaux', 'Producteurs de mezcal', 'Musiciens', 'Petites entreprises'],
    paragraphs: [
      'TuTour aide les voyageurs à se connecter directement à ces expériences.',
      'Lorsque les visiteurs dépensent localement, une plus grande part des revenus touristiques atteint les personnes qui préservent chaque jour les traditions et la culture d’Oaxaca.',
      'Le but n’est pas de remplacer les guides ou les visites organisées.',
      'Le but est d’offrir aux voyageurs une autre option : une option qui encourage l’exploration indépendante tout en aidant les dollars du tourisme à atteindre davantage de coins d’Oaxaca.',
      'Plus de connexions locales. Plus d’impact local.'
    ]
  },
  de: {
    eyebrow: 'Lokales Oaxaca unterstützen',
    subtitle: 'Tourismus lokal halten.',
    intro: 'Oaxacas Kultur wird von Tausenden Menschen geschaffen:',
    bullets: ['Kunsthandwerker', 'Marktverkäufer', 'Familienrestaurants', 'Mezcal-Produzenten', 'Musiker', 'Kleine Unternehmen'],
    paragraphs: [
      'TuTour hilft Reisenden, direkt mit diesen Erlebnissen in Kontakt zu kommen.',
      'Wenn Besucher lokal ausgeben, erreicht mehr Tourismuseinkommen die Menschen, die Oaxacas Traditionen und Kultur jeden Tag bewahren.',
      'Das Ziel ist nicht, Guides oder organisierte Touren zu ersetzen.',
      'Das Ziel ist, Reisenden eine weitere Option zu geben – eine, die unabhängiges Erkunden fördert und hilft, Tourismuseinnahmen in mehr Ecken Oaxacas zu bringen.',
      'Mehr lokale Verbindungen. Mehr lokale Wirkung.'
    ]
  },
  it: {
    eyebrow: 'Sostieni Oaxaca locale',
    subtitle: 'Mantieni il turismo locale.',
    intro: 'La cultura di Oaxaca è creata da migliaia di persone:',
    bullets: ['Artigiani', 'Venditori dei mercati', 'Ristoranti familiari', 'Produttori di mezcal', 'Musicisti', 'Piccole imprese'],
    paragraphs: [
      'TuTour aiuta i viaggiatori a connettersi direttamente con queste esperienze.',
      'Quando i visitatori spendono localmente, una quota maggiore delle entrate turistiche arriva alle persone che preservano ogni giorno le tradizioni e la cultura di Oaxaca.',
      'L’obiettivo non è sostituire guide o tour organizzati.',
      'L’obiettivo è offrire ai viaggiatori un’altra opzione: una che incoraggi l’esplorazione indipendente e aiuti i dollari del turismo a raggiungere più angoli di Oaxaca.',
      'Più connessioni locali. Più impatto locale.'
    ]
  },
  pt: {
    eyebrow: 'Apoie Oaxaca local',
    subtitle: 'Mantenha o turismo local.',
    intro: 'A cultura de Oaxaca é criada por milhares de pessoas:',
    bullets: ['Artesãos', 'Vendedores de mercado', 'Restaurantes familiares', 'Produtores de mezcal', 'Músicos', 'Pequenos negócios'],
    paragraphs: [
      'O TuTour ajuda viajantes a se conectarem diretamente com essas experiências.',
      'Quando visitantes gastam localmente, mais receita do turismo chega às pessoas que preservam as tradições e a cultura de Oaxaca todos os dias.',
      'O objetivo não é substituir guias ou passeios organizados.',
      'O objetivo é dar aos viajantes outra opção — uma que incentive a exploração independente enquanto ajuda o dinheiro do turismo a chegar a mais cantos de Oaxaca.',
      'Mais conexões locais. Mais impacto local.'
    ]
  },
  ja: {
    eyebrow: '地元オアハカを応援',
    subtitle: '観光を地域に残す。',
    intro: 'オアハカの文化は、何千もの人々によって作られています。',
    bullets: ['職人', '市場の販売者', '家族経営のレストラン', 'メスカル生産者', '音楽家', '小規模事業者'],
    paragraphs: [
      'TuTourは、旅行者がこうした体験と直接つながる手助けをします。',
      '訪問者が地元でお金を使うことで、オアハカの伝統と文化を日々守る人々に、より多くの観光収入が届きます。',
      '目的は、ガイドや組織されたツアーを置き換えることではありません。',
      '目的は、旅行者にもう一つの選択肢を提供することです。独立した探索を促しながら、観光のお金がオアハカのより多くの場所に届くようにする選択肢です。',
      'より多くの地元とのつながり。より大きな地域への影響。'
    ]
  },
  zh: {
    eyebrow: '支持本地瓦哈卡',
    subtitle: '让旅游留在本地。',
    intro: '瓦哈卡的文化由成千上万的人共同创造：',
    bullets: ['手工艺人', '市场摊主', '家庭餐馆', 'Mezcal 生产者', '音乐人', '小企业主'],
    paragraphs: [
      'TuTour 帮助旅行者直接连接这些体验。',
      '当游客在本地消费时，更多旅游收入会到达每天守护瓦哈卡传统与文化的人们手中。',
      '目标不是取代导游或有组织的旅行团。',
      '目标是给旅行者另一个选择——鼓励独立探索，同时帮助旅游资金到达瓦哈卡更多角落。',
      '更多本地连接。更多本地影响。'
    ]
  }
};

const whyTuTourMissionPopupCopy = {
  en: {
    eyebrow: '',
    title: 'Why TuTour Exists',
    subtitle: 'Tourism Should Feel Personal.',
    paragraphs: [
      'TuTour was created around a simple idea:',
      'Travelers don\'t need a script to experience Oaxaca.',
      'They need trustworthy local information, practical safety guidance, flexible planning tools, and the freedom to explore.',
      'The result is a more personal journey, a stronger connection with local culture, and a tourism model that helps spread economic benefits throughout the community.',
      'Local knowledge. Real experiences. Your way.'
    ]
  },
  es: {
    eyebrow: '',
    title: 'Por qué existe TuTour',
    subtitle: 'El turismo debe sentirse personal.',
    paragraphs: [
      'TuTour nació de una idea sencilla:',
      'Los viajeros no necesitan un guion para vivir Oaxaca.',
      'Necesitan información local confiable, orientación práctica de seguridad, herramientas flexibles de planificación y la libertad de explorar.',
      'El resultado es un viaje más personal, una conexión más fuerte con la cultura local y un modelo turístico que ayuda a distribuir beneficios económicos en toda la comunidad.',
      'Conocimiento local. Experiencias reales. A tu manera.'
    ]
  },
  fr: {
    eyebrow: 'Alors, pourquoi TuTour... ?',
    title: 'Pourquoi TuTour existe',
    subtitle: 'Le tourisme devrait être personnel.',
    paragraphs: [
      'TuTour a été créé autour d’une idée simple :',
      'Les voyageurs n’ont pas besoin d’un script pour vivre Oaxaca.',
      'Ils ont besoin d’informations locales fiables, de conseils pratiques de sécurité, d’outils de planification flexibles et de la liberté d’explorer.',
      'Le résultat est un voyage plus personnel, un lien plus fort avec la culture locale et un modèle touristique qui aide à répartir les bénéfices économiques dans toute la communauté.',
      'Savoir local. Expériences réelles. À votre façon.'
    ]
  },
  de: {
    eyebrow: 'Alsooo, warum TuTour...?',
    title: 'Warum TuTour existiert',
    subtitle: 'Tourismus sollte persönlich sein.',
    paragraphs: [
      'TuTour entstand aus einer einfachen Idee:',
      'Reisende brauchen kein Skript, um Oaxaca zu erleben.',
      'Sie brauchen vertrauenswürdige lokale Informationen, praktische Sicherheitshinweise, flexible Planungstools und die Freiheit zu erkunden.',
      'Das Ergebnis ist eine persönlichere Reise, eine stärkere Verbindung zur lokalen Kultur und ein Tourismusmodell, das wirtschaftliche Vorteile in der ganzen Gemeinschaft verteilt.',
      'Lokales Wissen. Echte Erlebnisse. Dein Weg.'
    ]
  },
  it: {
    eyebrow: 'Allora, perché TuTour...?',
    title: 'Perché esiste TuTour',
    subtitle: 'Il turismo dovrebbe essere personale.',
    paragraphs: [
      'TuTour è nato da un’idea semplice:',
      'I viaggiatori non hanno bisogno di un copione per vivere Oaxaca.',
      'Hanno bisogno di informazioni locali affidabili, consigli pratici sulla sicurezza, strumenti di pianificazione flessibili e libertà di esplorare.',
      'Il risultato è un viaggio più personale, un legame più forte con la cultura locale e un modello turistico che aiuta a distribuire benefici economici in tutta la comunità.',
      'Conoscenza locale. Esperienze reali. A modo tuo.'
    ]
  },
  pt: {
    eyebrow: 'Entãooo, por que TuTour...?',
    title: 'Por que o TuTour existe',
    subtitle: 'O turismo deve parecer pessoal.',
    paragraphs: [
      'O TuTour foi criado a partir de uma ideia simples:',
      'Viajantes não precisam de um roteiro pronto para viver Oaxaca.',
      'Eles precisam de informações locais confiáveis, orientação prática de segurança, ferramentas flexíveis de planejamento e liberdade para explorar.',
      'O resultado é uma jornada mais pessoal, uma conexão mais forte com a cultura local e um modelo de turismo que ajuda a espalhar benefícios econômicos por toda a comunidade.',
      'Conhecimento local. Experiências reais. Do seu jeito.'
    ]
  },
  ja: {
    eyebrow: 'それで、なぜTuTour...？',
    title: 'TuTourが存在する理由',
    subtitle: '観光はもっと自分らしく感じられるべきです。',
    paragraphs: [
      'TuTourは、シンプルな考えから生まれました。',
      '旅行者がオアハカを体験するために台本は必要ありません。',
      '必要なのは、信頼できる地元情報、実用的な安全ガイド、柔軟な計画ツール、そして自由に探索することです。',
      'その結果、より個人的な旅、地域文化とのより強いつながり、そして地域全体に経済的な恩恵を広げる観光モデルが生まれます。',
      '地元の知識。本物の体験。自分らしく。'
    ]
  },
  zh: {
    eyebrow: '那么，为什么选择 TuTour...？',
    title: 'TuTour 存在的原因',
    subtitle: '旅游应该更有个人感。',
    paragraphs: [
      'TuTour 围绕一个简单的想法而创建：',
      '旅行者不需要照着脚本来体验瓦哈卡。',
      '他们需要可信赖的本地信息、实用的安全指导、灵活的规划工具，以及自由探索的空间。',
      '结果是一段更个人化的旅程、与本地文化更深的连接，以及一种帮助经济收益在社区中更广泛流动的旅游模式。',
      '本地知识。真实体验。你的方式。'
    ]
  }
};

const localKnowledgeIcon = '/api/apps/romcWH54d4SR/assets/localknowledgeicon1.png';
const heroBackgroundImage = '/api/apps/romcWH54d4SR/assets/tutourbackground2.png';

export function Home() {
  const { t, language: lang } = useLanguage();
  const setItinerary = useGuideStore(s => s.setItinerary);
  const navigate = useNavigate();
  const [activeWhyPopup, setActiveWhyPopup] = useState(null);
  const copy = homeCopy[lang] || homeCopy.en;
  const guidePlaces = places.filter(place => place.category !== 'coast');
  const build = () => { setItinerary(generateItinerary(guidePlaces)); navigate('/itinerary'); };
  const openWhyPopup = (item) => setActiveWhyPopup(item);
  const closeWhyPopup = () => setActiveWhyPopup(null);
  const saveMoneyPopup = saveMoneyPopupCopy[lang] || saveMoneyPopupCopy.en;
  const exploreFreelyPopup = exploreFreelyPopupCopy[lang] || exploreFreelyPopupCopy.en;
  const buildMemoriesPopup = buildMemoriesPopupCopy[lang] || buildMemoriesPopupCopy.en;
  const supportLocalPopup = supportLocalPopupCopy[lang] || supportLocalPopupCopy.en;
  const whyTuTourMissionPopup = whyTuTourMissionPopupCopy[lang] || whyTuTourMissionPopupCopy.en;
  const titleParts = lang === 'en' ? ['Experience', 'Oaxaca,', 'Not Someone Else’s Tour'] : [copy.title];

  return html`
    <div className="grid gap-4 min-w-0">
      <section className="home-hero-section relative overflow-hidden rounded-[1.65rem] border-2 border-[hsl(var(--border))] bg-slate-950 shadow-[var(--shadow-lg)]">
        <div className="home-hero-fill relative min-h-[560px] p-6 text-white sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-fuchsia-950 to-orange-950"></div>
          <div className="absolute inset-0" style=${{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,.74), rgba(0,0,0,.18) 52%, rgba(0,0,0,.28)), url(${heroBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
          <div className="relative z-10 flex min-h-[calc(560px-3rem)] max-w-3xl flex-col justify-center sm:min-h-[calc(560px-4rem)] lg:min-h-[calc(560px-5rem)]">
            <p className="inline-flex w-fit items-center gap-2 rounded-2xl border-2 border-yellow-400 bg-black/28 px-4 py-2 text-sm font-black shadow-[0_0_0_1px_rgba(255,255,255,.14)] backdrop-blur">
              <${MapPin} className="h-5 w-5" />
              Oaxaca, México
            </p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-black leading-[.9] tracking-tight sm:text-6xl lg:text-7xl">
              ${titleParts.map((part, index) => html`<span key=${`${part}-${index}`} className=${index === 1 && lang === 'en' ? 'block text-orange-300' : 'block'}>${part}</span>`)}
            </h1>
            <div className="mt-4 flex max-w-md items-center gap-1 text-3xl font-black leading-none text-fuchsia-300" aria-hidden="true">
              <span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span>
            </div>
            <p className="mt-5 max-w-xl text-xl font-semibold leading-relaxed text-white/92">${copy.subtitle}</p>
            <p className="mt-4 flex max-w-xl items-start gap-3 text-lg font-black leading-snug text-orange-300">
              <${Heart} className="mt-1 h-7 w-7 flex-none fill-current" />
              <span>${copy.promise}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <${Link} to="/places" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-fuchsia-300 bg-gradient-to-r from-orange-500 to-purple-700 px-6 py-3 text-base font-black text-white shadow-[0_14px_30px_rgba(0,0,0,.32)] hover:from-orange-400 hover:to-fuchsia-700">
                <${Compass} className="h-5 w-5" />
                ${copy.ctaExplore}
              </${Link}>
              <button type="button" onClick=${build} className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-orange-300 bg-purple-950/58 px-6 py-3 text-base font-black text-white shadow-[0_14px_30px_rgba(0,0,0,.24)] backdrop-blur hover:bg-purple-900/75">
                <${Sparkles} className="h-5 w-5 text-orange-300" />
                ${copy.buildDay}
              </button>
            </div>
          </div>
          <img src=${localKnowledgeIcon} alt="" aria-hidden="true" className="pointer-events-none absolute right-4 top-4 z-20 w-[14.6484375rem] max-w-[66.25%] origin-top-right scale-125 drop-shadow-[0_18px_28px_rgba(0,0,0,.45)] sm:right-5 sm:top-5 sm:w-[17.08984375rem] lg:right-6 lg:top-6 lg:w-[19.53125rem]" loading="lazy" />
        </div>
      </section>

      <section className="home-why-tabs-section overflow-hidden rounded-[1.75rem] border-2 border-orange-200 bg-[#fff2e8] p-5 text-[#321249] shadow-[0_18px_45px_rgba(98,38,132,.12)] sm:p-7 lg:p-8">
        <div className="mb-6 flex items-center justify-center gap-3 text-center sm:gap-5">
          <span className="text-3xl drop-shadow-sm" aria-hidden="true">😇😁</span>
          <h2 className="text-3xl font-black leading-none tracking-tight text-[#4c1d95] drop-shadow-[0_3px_0_rgba(255,255,255,.9)] sm:text-4xl lg:text-5xl">${copy.tabsTitle}</h2>
          <span className="text-3xl drop-shadow-sm" aria-hidden="true">😁😇</span>
        </div>
        <div className="home-why-tabs-grid grid gap-4 lg:grid-cols-5">
          ${whyTuTourInfo.map(item => { const Icon = item.icon; return html`
            <button key=${item.key} type="button" onClick=${() => openWhyPopup(item)} className=${`home-why-tab focus-ring group flex min-h-[300px] flex-col rounded-[1.65rem] border-2 bg-gradient-to-br ${item.card} p-5 text-left shadow-[inset_0_0_24px_rgba(255,255,255,.72),0_10px_24px_rgba(53,34,24,.08)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_0_24px_rgba(255,255,255,.78),0_18px_34px_rgba(53,34,24,.16)] sm:p-6`} aria-haspopup="dialog" aria-expanded=${activeWhyPopup && activeWhyPopup.key === item.key ? 'true' : 'false'} aria-label=${item.textKey ? `${copy[item.titleKey]} - ${copy[item.textKey]}` : (copy[item.titleKey] || item.title)}>
              <div className="home-why-tab-body flex flex-1 items-start gap-5">
                <span className=${`home-why-tab-icon mt-1 inline-flex h-20 w-20 flex-none items-center justify-center rounded-full ${item.circle} text-white shadow-[0_10px_20px_rgba(53,34,24,.18)] sm:h-24 sm:w-24`}>
                  <${Icon} className="h-11 w-11 sm:h-12 sm:w-12" strokeWidth=${2.4} />
                </span>
                <h3 className="text-2xl font-black leading-tight text-[#4c1d95] sm:text-3xl">${copy[item.titleKey] || item.title}</h3>
                ${item.textKey ? html`<p className="mt-5 text-lg font-semibold leading-8 text-[#5b2a37]">${copy[item.textKey]}</p>` : null}
              </div>
              <div className=${`home-why-tab-wave mt-6 flex justify-center text-4xl font-black leading-none ${item.wave}`} aria-hidden="true">
                <span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span><span>~</span>
              </div>
            </button>
          `; })}
        </div>
      </section>

      ${activeWhyPopup && html`
        <div className="home-why-popup-backdrop fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation" onClick=${event => { if (event.target === event.currentTarget) closeWhyPopup(); }}>
          <section className=${`w-full ${activeWhyPopup.key === 'saveMoney' ? 'max-w-xl' : 'max-w-2xl'} max-h-[calc(100vh-2rem)] overflow-hidden rounded-[1.75rem] border-2 border-orange-200 bg-[#fff7ef] text-[#321249] shadow-[0_28px_80px_rgba(0,0,0,.38)]`} role="dialog" aria-modal="true" aria-labelledby="home-why-popup-title">
            <div className=${`flex items-center justify-between gap-4 border-b-2 border-orange-200 bg-gradient-to-r ${activeWhyPopup.card} px-5 py-4 sm:px-6`}>
              <h2 id="home-why-popup-title" className="text-2xl font-black leading-tight text-[#4c1d95] sm:text-3xl">${copy[activeWhyPopup.titleKey] || activeWhyPopup.title}</h2>
              <button type="button" onClick=${closeWhyPopup} className="focus-ring inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-[#4c1d95]/25 bg-white/82 text-3xl font-black leading-none text-[#4c1d95] shadow-[0_8px_18px_rgba(53,34,24,.12)] hover:bg-white" aria-label=${copy.closePopup}>
                ×
              </button>
            </div>
            <div className="min-h-[280px] bg-white/62 p-5 sm:min-h-[360px] sm:p-6">
              ${activeWhyPopup.key === 'saveMoney' ? html`
                <div className="mx-auto max-h-[62vh] max-w-xl space-y-3 overflow-y-auto pr-1 text-[#321249]">
                  <p className="text-xl font-black leading-tight text-[#4c1d95] sm:text-2xl">${saveMoneyPopup.subtitle}</p>
                  <p className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${saveMoneyPopup.paragraphs[0]}</p>
                  <p className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${saveMoneyPopup.paragraphs[1]}</p>
                  <p className="text-sm font-black leading-7 text-[#321249] sm:text-base">${saveMoneyPopup.paragraphs[2]}</p>
                  <ul className="grid gap-2 rounded-2xl border-2 border-orange-200 bg-orange-50/80 p-4 text-sm font-black text-[#4c1d95] shadow-[inset_0_0_18px_rgba(255,255,255,.75)] sm:text-base">
                    ${saveMoneyPopup.bullets.map(item => html`<li key=${item} className="flex items-start gap-2"><span className="mt-1 text-orange-600" aria-hidden="true">✹</span><span>${item}</span></li>`)}
                  </ul>
                  <p className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${saveMoneyPopup.paragraphs[3]}</p>
                  <p className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${saveMoneyPopup.paragraphs[4]}</p>
                  <p className="rounded-2xl bg-[#4c1d95] px-4 py-3 text-base font-black leading-7 text-orange-100 shadow-[0_12px_24px_rgba(76,29,149,.18)] sm:text-lg">${saveMoneyPopup.paragraphs[5]}</p>
                </div>
              ` : null}
              ${activeWhyPopup.key === 'exploreFreely' ? html`
                <div className="mx-auto max-h-[62vh] max-w-xl space-y-4 overflow-y-auto pr-1 text-[#321249]">
                  <p className="text-lg font-black uppercase tracking-[0.16em] text-orange-600">${exploreFreelyPopup.title}</p>
                  <p className="text-xl font-black leading-tight text-[#4c1d95] sm:text-2xl">${exploreFreelyPopup.subtitle}</p>
                  ${exploreFreelyPopup.intro.map(item => html`<p key=${item} className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${item}</p>`)}
                  <p className="text-sm font-black leading-7 text-[#321249] sm:text-base">${exploreFreelyPopup.lead}</p>
                  <ul className="grid gap-2 rounded-2xl border-2 border-purple-200 bg-purple-50/80 p-4 text-sm font-black text-[#4c1d95] shadow-[inset_0_0_18px_rgba(255,255,255,.75)] sm:text-base">
                    ${exploreFreelyPopup.bullets.map(item => html`<li key=${item} className="flex items-start gap-2"><span className="mt-1 text-orange-600" aria-hidden="true">✹</span><span>${item}</span></li>`)}
                  </ul>
                  ${exploreFreelyPopup.closing.map((item, index) => index === exploreFreelyPopup.closing.length - 1
                    ? html`<p key=${item} className="rounded-2xl bg-[#4c1d95] px-4 py-3 text-base font-black leading-7 text-orange-100 shadow-[0_12px_24px_rgba(76,29,149,.18)] sm:text-lg">${item}</p>`
                    : html`<p key=${item} className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${item}</p>`)}
                </div>
              ` : null}
              ${activeWhyPopup.key === 'buildMemories' ? html`
                <div className="mx-auto max-h-[62vh] max-w-xl space-y-4 overflow-y-auto pr-1 text-[#321249]">
                  <p className="text-lg font-black uppercase tracking-[0.16em] text-orange-600">${buildMemoriesPopup.title}</p>
                  <p className="text-xl font-black leading-tight text-[#4c1d95] sm:text-2xl">${buildMemoriesPopup.subtitle}</p>
                  ${buildMemoriesPopup.paragraphs.map((item, index) => index >= buildMemoriesPopup.paragraphs.length - 5
                    ? html`<p key=${item} className=${index === buildMemoriesPopup.paragraphs.length - 1 ? 'rounded-2xl bg-[#4c1d95] px-4 py-3 text-base font-black leading-7 text-orange-100 shadow-[0_12px_24px_rgba(76,29,149,.18)] sm:text-lg' : 'text-sm font-black leading-7 text-[#321249] sm:text-base'}>${item}</p>`
                    : html`<p key=${item} className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${item}</p>`)}
                </div>
              ` : null}
              ${activeWhyPopup.key === 'supportLocalOaxaca' ? html`
                <div className="mx-auto max-h-[62vh] max-w-xl space-y-4 overflow-y-auto pr-1 text-[#321249]">
                  <p className="text-lg font-black uppercase tracking-[0.16em] text-orange-600"></p>
                  <p className="text-xl font-black leading-tight text-[#4c1d95] sm:text-2xl">${supportLocalPopup.subtitle}</p>
                  <p className="text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base">${supportLocalPopup.intro}</p>
                  <ul className="grid gap-2 rounded-2xl border-2 border-orange-200 bg-orange-50/80 p-4 text-sm font-black text-[#4c1d95] shadow-[inset_0_0_18px_rgba(255,255,255,.75)] sm:grid-cols-2 sm:text-base">
                    ${supportLocalPopup.bullets.map(item => html`<li key=${item} className="flex items-start gap-2"><span className="mt-1 text-orange-600" aria-hidden="true">✹</span><span>${item}</span></li>`)}
                  </ul>
                  ${supportLocalPopup.paragraphs.map((item, index) => index === supportLocalPopup.paragraphs.length - 1
                    ? html`<p key=${item} className="rounded-2xl bg-[#4c1d95] px-4 py-3 text-base font-black leading-7 text-orange-100 shadow-[0_12px_24px_rgba(76,29,149,.18)] sm:text-lg">${item}</p>`
                    : html`<p key=${item} className=${index === 2 ? 'text-sm font-black leading-7 text-[#321249] sm:text-base' : 'text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base'}>${item}</p>`)}
                </div>
              ` : null}
              ${activeWhyPopup.key === 'sooooWhyTuTour' ? html`
                <div className="mx-auto max-h-[62vh] max-w-xl space-y-4 overflow-y-auto pr-1 text-[#321249]">
                  <p className="text-lg font-black uppercase tracking-[0.16em] text-orange-600"></p>
                  <p className="text-xl font-black leading-tight text-[#4c1d95] sm:text-2xl">${whyTuTourMissionPopup.title}</p>
                  <p className="rounded-2xl border-2 border-orange-200 bg-orange-50/80 px-4 py-3 text-base font-black leading-7 text-[#4c1d95] shadow-[inset_0_0_18px_rgba(255,255,255,.75)] sm:text-lg">${whyTuTourMissionPopup.subtitle}</p>
                  ${whyTuTourMissionPopup.paragraphs.map((item, index) => index === whyTuTourMissionPopup.paragraphs.length - 1
                    ? html`<p key=${item} className="rounded-2xl bg-[#4c1d95] px-4 py-3 text-base font-black leading-7 text-orange-100 shadow-[0_12px_24px_rgba(76,29,149,.18)] sm:text-lg">${item}</p>`
                    : html`<p key=${item} className=${index === 1 ? 'text-base font-black leading-7 text-[#321249] sm:text-lg' : 'text-sm font-semibold leading-7 text-[#5b2a37] sm:text-base'}>${item}</p>`)}
                </div>
              ` : null}
            </div>
          </section>
        </div>
      `}

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-[var(--radius-lg)] border-2 border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.14)] p-4 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-2"><${CalendarDays} className="h-5 w-5 text-[hsl(var(--primary))]" /><h2 className="text-lg font-black">${copy.guideTitle}</h2></div>
          <p className="mt-2 text-sm font-semibold text-[hsl(var(--muted-foreground))]">${copy.guideText}</p>
          <button type="button" onClick=${build} className="focus-ring mt-3 w-full rounded-full border-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary))] px-4 py-2 text-sm font-black text-[hsl(var(--primary-foreground))]">${copy.ctaPlan}</button>
        </div>
        <div className="rounded-[var(--radius-lg)] border-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-2"><${ShieldCheck} className="h-5 w-5 text-[hsl(var(--secondary))]" /><h2 className="text-lg font-black">${copy.safetyTitle}</h2></div>
          <p className="mt-2 text-sm font-semibold text-[hsl(var(--muted-foreground))]">${copy.safetyText}</p>
          <${Link} to="/safety" className="focus-ring mt-3 inline-flex rounded-full border-2 border-[hsl(var(--border))] px-4 py-2 text-sm font-black text-[hsl(var(--foreground))]">${t('safety')}</${Link}>
        </div>
        <${Link} to="/map" className="focus-ring flex items-center gap-2 rounded-[var(--radius-lg)] border-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-sm font-black text-[hsl(var(--foreground))] shadow-[var(--shadow-sm)]"><${MapPin} className="h-5 w-5 text-[hsl(var(--primary))]" />${copy.ctaMap}</${Link}>
      </section>
    </div>
  `;
}

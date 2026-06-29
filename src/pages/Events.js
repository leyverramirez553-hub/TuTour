import React from 'react';
import {CalendarDays, ExternalLink, MapPin, Megaphone, ShieldCheck, Sparkles} from 'lucide-react';
import { html } from '../jsx.js';
import { useLanguage } from '../i18n.js';

const officialCalendarUrl = 'https://oaxaca.travel/index.php/es/component/jevents/monthcalendar/2026/1/31?Itemid=0';
const eventHeroBackgroundImage = '/api/apps/romcWH54d4SR/assets/TuTourEventsimage.png';

const eventCopy = {
  en: {
    kicker: 'Oaxaca.travel calendar board',
    title: 'Oaxaca Events',
    subtitle: 'A bulletin-board style monthly calendar based on the official Oaxaca Travel events calendar, with practical tour-guide context for visitors.',
    source: 'Official source page',
    sourceNote: 'Use the official calendar link for last-minute changes, cancellations, extra dates, and full program details.',
    all: 'All months',
    board: 'Monthly bulletin board',
    featured: 'Featured calendar notes',
    time: 'Time',
    place: 'Place',
    tip: 'Guide tip',
    safety: 'Safety note',
    directions: 'Directions',
    askAi: 'Ask AI',
    hideAi: 'Hide AI info',
    aiHeading: 'AI local guide notes',
    aiLoading: 'Asking AI...',
    aiEmpty: 'AI did not return more details yet. Try again in a moment.',
    aiErrorFallback: 'AI guide could not load right now.',
    aiRateLimit: 'AI request limit reached (100 requests/hour). Please try again later.',
    verify: 'Verify official details',
    empty: 'No listed bulletin notes for this month yet. Check the official Oaxaca Travel calendar for new posts.',
    updated: 'Curated from official Oaxaca tourism calendar listings and major visitor traditions available for 2026.'
  },
  es: {
    kicker: 'Tablero del calendario de Oaxaca.travel',
    title: 'Eventos de Oaxaca',
    subtitle: 'Un calendario mensual estilo tablero de anuncios basado en el calendario oficial de Oaxaca Travel, con contexto práctico de guía para visitantes.',
    source: 'Página oficial fuente',
    sourceNote: 'Usa el enlace del calendario oficial para cambios de último momento, cancelaciones, fechas extra y detalles completos del programa.',
    all: 'Todos los meses',
    board: 'Tablero mensual',
    featured: 'Notas destacadas del calendario',
    time: 'Horario',
    place: 'Lugar',
    tip: 'Consejo de guía',
    safety: 'Nota de seguridad',
    directions: 'Cómo llegar',
    askAi: 'Preguntar a IA',
    hideAi: 'Ocultar info IA',
    aiHeading: 'Notas de guía local por IA',
    aiLoading: 'Consultando a la IA...',
    aiEmpty: 'La IA todavía no devolvió más detalles. Inténtalo de nuevo en un momento.',
    aiErrorFallback: 'La guía IA no pudo cargar ahora.',
    aiRateLimit: 'Límite de solicitudes de IA alcanzado (100 solicitudes/hora). Inténtalo más tarde.',
    verify: 'Verificar detalles oficiales',
    empty: 'Todavía no hay avisos para este mes. Consulta el calendario oficial de Oaxaca Travel para nuevas publicaciones.',
    updated: 'Curado a partir de publicaciones oficiales del calendario turístico de Oaxaca y grandes tradiciones para visitantes disponibles para 2026.'
  },
  fr: {
    kicker: 'Tableau du calendrier Oaxaca.travel',
    title: 'Événements à Oaxaca',
    subtitle: 'Un calendrier mensuel façon tableau d’affichage basé sur le calendrier officiel Oaxaca Travel, avec des conseils pratiques de guide pour les visiteurs.',
    source: 'Page source officielle',
    sourceNote: 'Utilisez le lien du calendrier officiel pour les changements de dernière minute, annulations, dates ajoutées et détails complets du programme.',
    all: 'Tous les mois',
    board: 'Tableau mensuel',
    featured: 'Notes de calendrier à la une',
    time: 'Horaire',
    place: 'Lieu',
    tip: 'Conseil de guide',
    safety: 'Conseil de sécurité',
    directions: 'Itinéraire',
    askAi: 'Demander à l’IA',
    hideAi: 'Masquer l’info IA',
    aiHeading: 'Notes de guide local par IA',
    aiLoading: 'Interrogation de l’IA...',
    aiEmpty: 'L’IA n’a pas encore renvoyé plus de détails. Réessayez dans un instant.',
    aiErrorFallback: 'Le guide IA ne peut pas se charger pour le moment.',
    aiRateLimit: 'Limite de demandes IA atteinte (100 demandes/heure). Réessayez plus tard.',
    verify: 'Vérifier les détails officiels',
    empty: 'Aucune note annoncée pour ce mois pour le moment. Consultez le calendrier officiel Oaxaca Travel pour les nouveautés.',
    updated: 'Sélection réalisée à partir des annonces officielles du calendrier touristique d’Oaxaca et des grandes traditions de visite disponibles pour 2026.'
  },
  de: {
    kicker: 'Oaxaca.travel-Kalenderbrett',
    title: 'Veranstaltungen in Oaxaca',
    subtitle: 'Ein monatlicher Kalender im Pinnwand-Stil auf Basis des offiziellen Oaxaca-Travel-Veranstaltungskalenders, mit praktischen Guide-Hinweisen für Reisende.',
    source: 'Offizielle Quellseite',
    sourceNote: 'Nutze den offiziellen Kalenderlink für kurzfristige Änderungen, Absagen, Zusatztermine und vollständige Programmdetails.',
    all: 'Alle Monate',
    board: 'Monatliche Pinnwand',
    featured: 'Ausgewählte Kalenderhinweise',
    time: 'Zeit',
    place: 'Ort',
    tip: 'Guide-Tipp',
    safety: 'Sicherheitshinweis',
    directions: 'Route',
    askAi: 'KI fragen',
    hideAi: 'KI-Info ausblenden',
    aiHeading: 'Lokale Guide-Hinweise per KI',
    aiLoading: 'KI wird gefragt...',
    aiEmpty: 'Die KI hat noch keine weiteren Details geliefert. Versuche es gleich erneut.',
    aiErrorFallback: 'Der KI-Guide kann gerade nicht geladen werden.',
    aiRateLimit: 'KI-Anfragelimit erreicht (100 Anfragen/Stunde). Bitte versuche es später erneut.',
    verify: 'Offizielle Details prüfen',
    empty: 'Für diesen Monat sind noch keine Pinnwand-Hinweise gelistet. Prüfe den offiziellen Oaxaca-Travel-Kalender auf neue Beiträge.',
    updated: 'Kuratierte Auswahl aus offiziellen Oaxaca-Tourismuskalendereinträgen und großen Besuchertraditionen für 2026.'
  },
  it: {
    kicker: 'Bacheca calendario Oaxaca.travel',
    title: 'Eventi di Oaxaca',
    subtitle: 'Un calendario mensile in stile bacheca basato sul calendario ufficiale Oaxaca Travel, con contesto pratico da guida per i visitatori.',
    source: 'Pagina ufficiale fonte',
    sourceNote: 'Usa il link del calendario ufficiale per cambi dell’ultimo minuto, cancellazioni, date aggiuntive e dettagli completi del programma.',
    all: 'Tutti i mesi',
    board: 'Bacheca mensile',
    featured: 'Note calendario in evidenza',
    time: 'Orario',
    place: 'Luogo',
    tip: 'Consiglio guida',
    safety: 'Nota di sicurezza',
    directions: 'Indicazioni',
    askAi: 'Chiedi all’IA',
    hideAi: 'Nascondi info IA',
    aiHeading: 'Note da guida locale con IA',
    aiLoading: 'Sto chiedendo all’IA...',
    aiEmpty: 'L’IA non ha ancora restituito altri dettagli. Riprova tra poco.',
    aiErrorFallback: 'La guida IA non può caricarsi ora.',
    aiRateLimit: 'Limite di richieste IA raggiunto (100 richieste/ora). Riprova più tardi.',
    verify: 'Verifica dettagli ufficiali',
    empty: 'Non ci sono ancora avvisi per questo mese. Controlla il calendario ufficiale Oaxaca Travel per nuovi post.',
    updated: 'Selezione curata da inserzioni ufficiali del calendario turistico di Oaxaca e grandi tradizioni per visitatori disponibili per il 2026.'
  },
  pt: {
    kicker: 'Painel do calendário Oaxaca.travel',
    title: 'Eventos de Oaxaca',
    subtitle: 'Um calendário mensal em estilo mural de avisos baseado no calendário oficial Oaxaca Travel, com contexto prático de guia para visitantes.',
    source: 'Página oficial de origem',
    sourceNote: 'Use o link do calendário oficial para mudanças de última hora, cancelamentos, datas extras e detalhes completos da programação.',
    all: 'Todos os meses',
    board: 'Mural mensal',
    featured: 'Notas em destaque do calendário',
    time: 'Horário',
    place: 'Local',
    tip: 'Dica de guia',
    safety: 'Nota de segurança',
    directions: 'Rotas',
    askAi: 'Perguntar à IA',
    hideAi: 'Ocultar info IA',
    aiHeading: 'Notas de guia local por IA',
    aiLoading: 'Perguntando à IA...',
    aiEmpty: 'A IA ainda não retornou mais detalhes. Tente novamente em instantes.',
    aiErrorFallback: 'O guia de IA não pôde carregar agora.',
    aiRateLimit: 'Limite de solicitações de IA atingido (100 solicitações/hora). Tente novamente mais tarde.',
    verify: 'Verificar detalhes oficiais',
    empty: 'Ainda não há avisos listados para este mês. Consulte o calendário oficial Oaxaca Travel para novas publicações.',
    updated: 'Curadoria feita a partir de listagens oficiais do calendário turístico de Oaxaca e grandes tradições para visitantes disponíveis para 2026.'
  },
  ja: {
    kicker: 'Oaxaca.travel カレンダー掲示板',
    title: 'オアハカのイベント',
    subtitle: '公式 Oaxaca Travel のイベントカレンダーをもとに、旅行者向けの実用的なガイド情報を添えた月別の掲示板スタイルカレンダーです。',
    source: '公式ソースページ',
    sourceNote: '直前の変更、キャンセル、追加日程、詳しいプログラムは公式カレンダーリンクで確認してください。',
    all: 'すべての月',
    board: '月別掲示板',
    featured: '注目のカレンダー情報',
    time: '時間',
    place: '場所',
    tip: 'ガイドのヒント',
    safety: '安全メモ',
    directions: '行き方',
    askAi: 'AIに質問',
    hideAi: 'AI情報を隠す',
    aiHeading: 'AIによるローカルガイド情報',
    aiLoading: 'AIに確認中...',
    aiEmpty: 'AIから追加情報が返ってきませんでした。少し待って再試行してください。',
    aiErrorFallback: '現在AIガイドを読み込めません。',
    aiRateLimit: 'AIリクエスト上限に達しました（100件/時間）。後でもう一度お試しください。',
    verify: '公式詳細を確認',
    empty: 'この月の掲示板情報はまだありません。新しい投稿は公式 Oaxaca Travel カレンダーで確認してください。',
    updated: '2026年に公開されているオアハカ公式観光カレンダー情報と主要な旅行者向け伝統行事からキュレーションしています。'
  },
  zh: {
    kicker: 'Oaxaca.travel 日历公告板',
    title: '瓦哈卡活动',
    subtitle: '基于 Oaxaca Travel 官方活动日历制作的月度公告板式日历，并加入面向游客的实用导游提示。',
    source: '官方来源页面',
    sourceNote: '请使用官方日历链接确认临时变更、取消、新增日期和完整活动安排。',
    all: '所有月份',
    board: '月度公告板',
    featured: '精选日历提示',
    time: '时间',
    place: '地点',
    tip: '导游建议',
    safety: '安全提示',
    directions: '导航',
    askAi: '询问 AI',
    hideAi: '隐藏 AI 信息',
    aiHeading: 'AI 本地导游提示',
    aiLoading: '正在询问 AI...',
    aiEmpty: 'AI 暂时没有返回更多详情。请稍后再试。',
    aiErrorFallback: 'AI 导游现在无法加载。',
    aiRateLimit: '已达到 AI 请求限制（100 次/小时）。请稍后再试。',
    verify: '查看官方详情',
    empty: '本月暂时没有公告信息。请查看 Oaxaca Travel 官方日历获取新发布内容。',
    updated: '根据 2026 年可用的瓦哈卡官方旅游日历条目和主要游客传统整理。'
  }
};

const monthLabels = {
  en: { all: 'All', january: 'January', june: 'June', july: 'July', october: 'October', december: 'December' },
  es: { all: 'Todo', january: 'Enero', june: 'Junio', july: 'Julio', october: 'Octubre', december: 'Diciembre' },
  fr: { all: 'Tout', january: 'Janvier', june: 'Juin', july: 'Juillet', october: 'Octobre', december: 'Décembre' },
  de: { all: 'Alle', january: 'Januar', june: 'Juni', july: 'Juli', october: 'Oktober', december: 'Dezember' },
  it: { all: 'Tutto', january: 'Gennaio', june: 'Giugno', july: 'Luglio', october: 'Ottobre', december: 'Dicembre' },
  pt: { all: 'Tudo', january: 'Janeiro', june: 'Junho', july: 'Julho', october: 'Outubro', december: 'Dezembro' },
  ja: { all: 'すべて', january: '1月', june: '6月', july: '7月', october: '10月', december: '12月' },
  zh: { all: '全部', january: '一月', june: '六月', july: '七月', october: '十月', december: '十二月' }
};

const events = [
  {
    id: 'jan-official-calendar', month: 'january', day: '31', date: '2026-01-31', time: 'Official monthly calendar', venue: 'Oaxaca.travel', query: 'Oaxaca Travel events calendar',
    title: {
      en: 'Official January calendar page', es: 'Página oficial del calendario de enero', fr: 'Page officielle du calendrier de janvier', de: 'Offizielle Januar-Kalenderseite', it: 'Pagina ufficiale del calendario di gennaio', pt: 'Página oficial do calendário de janeiro', ja: '1月の公式カレンダーページ', zh: '一月官方日历页面'
    },
    summary: {
      en: 'The requested Oaxaca.travel January 2026 calendar link is kept here as the source anchor for this new bulletin-board page.',
      es: 'El enlace solicitado del calendario Oaxaca.travel de enero de 2026 se conserva aquí como ancla fuente para esta nueva página tipo tablero.',
      fr: 'Le lien demandé vers le calendrier Oaxaca.travel de janvier 2026 est conservé ici comme point source de cette nouvelle page tableau.',
      de: 'Der gewünschte Oaxaca.travel-Link zum Januar-Kalender 2026 bleibt hier als Quellenanker für diese neue Pinnwand-Seite erhalten.',
      it: 'Il link richiesto al calendario Oaxaca.travel di gennaio 2026 resta qui come fonte per questa nuova pagina bacheca.',
      pt: 'O link solicitado do calendário Oaxaca.travel de janeiro de 2026 fica aqui como âncora de origem desta nova página mural.',
      ja: '指定された Oaxaca.travel 2026年1月カレンダーリンクを、この新しい掲示板ページの参照元として掲載しています。',
      zh: '用户指定的 Oaxaca.travel 2026 年一月日历链接保留在这里，作为这个新公告板页面的来源锚点。'
    },
    tip: {
      en: 'Use this official month view before building a January route; tourism calendars can add cultural notices close to the date.',
      es: 'Usa esta vista mensual oficial antes de armar una ruta de enero; los calendarios turísticos pueden agregar avisos culturales cerca de la fecha.',
      fr: 'Consultez cette vue mensuelle officielle avant de créer un itinéraire de janvier; des annonces culturelles peuvent être ajoutées près de la date.',
      de: 'Nutze diese offizielle Monatsansicht, bevor du eine Januar-Route planst; Kulturhinweise können kurz vor dem Datum ergänzt werden.',
      it: 'Usa questa vista mensile ufficiale prima di creare un itinerario di gennaio; gli avvisi culturali possono essere aggiunti vicino alla data.',
      pt: 'Use esta visão mensal oficial antes de montar uma rota de janeiro; avisos culturais podem aparecer perto da data.',
      ja: '1月のルートを作る前に公式月表示を確認しましょう。文化イベント情報は直前に追加されることがあります。',
      zh: '制定一月路线前先查看官方月视图；旅游日历可能会在临近日期时新增文化公告。'
    },
    safety: {
      en: 'Confirm hours on the source site, especially around holidays and road closures.', es: 'Confirma horarios en la fuente oficial, especialmente en días festivos y cierres viales.', fr: 'Confirmez les horaires sur le site source, surtout pendant les jours fériés et fermetures de routes.', de: 'Prüfe Öffnungszeiten auf der Quellseite, besonders an Feiertagen und bei Straßensperrungen.', it: 'Conferma gli orari sul sito fonte, soprattutto durante festività e chiusure stradali.', pt: 'Confirme horários no site fonte, especialmente em feriados e bloqueios de vias.', ja: '祝日や道路規制がある時期は、公式サイトで時間を確認してください。', zh: '请在来源网站确认时间，特别是假期和道路封闭期间。'
    }
  },
  {
    id: 'world-cup-streams', month: 'june', day: '11', date: '2026-06-11', time: '08:00–24:00', venue: 'Oaxaca City public screening points', query: 'Oaxaca City Mexico Zocalo',
    title: { en: 'Live World Cup screenings', es: 'Transmisiones en vivo por la Copa Mundial', fr: 'Retransmissions en direct de la Coupe du Monde', de: 'Live-Übertragungen der Weltmeisterschaft', it: 'Dirette della Coppa del Mondo', pt: 'Transmissões ao vivo da Copa do Mundo', ja: 'ワールドカップのライブ上映', zh: '世界杯现场直播' },
    summary: { en: 'Official calendar listing for public live screenings during the football World Cup season.', es: 'Publicación del calendario oficial para transmisiones públicas en vivo durante la temporada mundialista.', fr: 'Annonce du calendrier officiel pour des projections publiques pendant la Coupe du Monde.', de: 'Offizieller Kalendereintrag für öffentliche Live-Übertragungen während der WM.', it: 'Voce del calendario ufficiale per proiezioni pubbliche durante la Coppa del Mondo.', pt: 'Listagem oficial para transmissões públicas ao vivo durante a Copa do Mundo.', ja: 'サッカーのワールドカップ期間中に行われる公共ライブ上映の公式カレンダー掲載です。', zh: '官方日历中发布的世界杯期间公共现场直播活动。' },
    tip: { en: 'Arrive early for shaded seating and combine it with a Centro food stop.', es: 'Llega temprano para encontrar sombra y combínalo con una parada de comida en el Centro.', fr: 'Arrivez tôt pour une place à l’ombre et combinez avec une halte gourmande dans le Centro.', de: 'Komme früh für schattige Plätze und verbinde es mit einem Essensstopp im Centro.', it: 'Arriva presto per posti all’ombra e abbinalo a una tappa gastronomica in Centro.', pt: 'Chegue cedo para lugares com sombra e combine com uma parada gastronômica no Centro.', ja: '日陰の席を確保するため早めに到着し、セントロの食事スポットと組み合わせましょう。', zh: '早点到可找阴凉座位，也可搭配市中心美食停留。' },
    safety: { en: 'In crowds, keep your phone and wallet in a front pocket or zipped bag.', es: 'En multitudes, guarda celular y cartera en bolsa cerrada o bolsillo delantero.', fr: 'Dans la foule, gardez téléphone et portefeuille dans une poche avant ou un sac fermé.', de: 'In Menschenmengen Telefon und Geldbörse vorne oder in einer verschlossenen Tasche tragen.', it: 'Tra la folla tieni telefono e portafoglio in una tasca anteriore o borsa chiusa.', pt: 'Em multidões, mantenha celular e carteira no bolso da frente ou bolsa fechada.', ja: '混雑時はスマホと財布を前ポケットかファスナー付きバッグに入れてください。', zh: '人多时请把手机和钱包放在前袋或拉链包内。' }
  },
  {
    id: 'andabus-free-routes', month: 'july', day: '06–17', date: '2026-07-06', time: 'Check daily schedule', venue: 'El Llano to Parque Primavera Cho Ndobá', query: 'Parque Primavera Cho Ndoba Oaxaca',
    title: { en: 'Free AndaBus routes', es: 'Rutas de AndaBus gratuitas', fr: 'Itinéraires AndaBus gratuits', de: 'Kostenlose AndaBus-Routen', it: 'Percorsi AndaBus gratuiti', pt: 'Rotas gratuitas do AndaBus', ja: '無料 AndaBus ルート', zh: '免费 AndaBus 路线' },
    summary: { en: 'Visitor-friendly transport note listed by Oaxaca Travel for moving between event areas and main visitor zones.', es: 'Aviso de transporte para visitantes publicado por Oaxaca Travel para moverse entre zonas de eventos y áreas turísticas principales.', fr: 'Note de transport pour visiteurs publiée par Oaxaca Travel afin de relier zones d’événements et quartiers touristiques.', de: 'Besucherfreundlicher Verkehrshinweis von Oaxaca Travel für Wege zwischen Veranstaltungsbereichen und Besucherzonen.', it: 'Avviso di trasporto per visitatori pubblicato da Oaxaca Travel per spostarsi tra aree evento e zone turistiche.', pt: 'Aviso de transporte para visitantes divulgado pela Oaxaca Travel para circular entre áreas de eventos e zonas turísticas.', ja: 'イベントエリアと主要観光エリアを移動しやすくするため Oaxaca Travel に掲載された交通情報です。', zh: 'Oaxaca Travel 发布的游客交通提示，方便在活动区域和主要游客区之间移动。' },
    tip: { en: 'Use it for daytime hops, then switch to registered taxis or app rides late at night.', es: 'Úsalo para traslados de día y cambia a taxis registrados o apps por la noche.', fr: 'Utilisez-le en journée, puis prenez taxis enregistrés ou applis de transport tard le soir.', de: 'Nutze es tagsüber; spät abends besser registrierte Taxis oder Fahr-Apps nehmen.', it: 'Usalo di giorno; la sera tardi passa a taxi registrati o app di trasporto.', pt: 'Use durante o dia; à noite prefira táxis registrados ou apps.', ja: '日中の移動に使い、夜遅くは登録タクシーや配車アプリに切り替えましょう。', zh: '白天短途移动可使用，深夜建议改用正规出租车或叫车应用。' },
    safety: { en: 'Check the last return time before you leave your first stop.', es: 'Consulta el último horario de regreso antes de salir de tu primera parada.', fr: 'Vérifiez le dernier retour avant de quitter votre premier arrêt.', de: 'Prüfe die letzte Rückfahrt, bevor du deinen ersten Stopp verlässt.', it: 'Controlla l’ultimo ritorno prima di lasciare la prima tappa.', pt: 'Confira o último retorno antes de sair da primeira parada.', ja: '最初の停留所を出る前に最終戻り便の時間を確認してください。', zh: '离开第一个站点前请先确认末班返回时间。' }
  },
  {
    id: 'quesillo-fair', month: 'july', day: '18–20', date: '2026-07-18', time: 'From 10:00', venue: 'Reyes Etla', query: 'Reyes Etla Oaxaca',
    title: { en: 'Queso y Quesillo Fair 2026', es: 'Expo Feria del Queso y Quesillo 2026', fr: 'Foire du queso et du quesillo 2026', de: 'Queso- und Quesillo-Messe 2026', it: 'Fiera del queso e quesillo 2026', pt: 'Feira do queso e quesillo 2026', ja: 'チーズとケシージョのフェア 2026', zh: '2026 奶酪与 Quesillo 博览会' },
    summary: { en: 'A local food celebration in Reyes Etla, the community strongly associated with Oaxaca’s famous quesillo.', es: 'Celebración gastronómica local en Reyes Etla, comunidad muy asociada con el famoso quesillo oaxaqueño.', fr: 'Fête gastronomique locale à Reyes Etla, commune étroitement liée au célèbre quesillo d’Oaxaca.', de: 'Lokales Food-Fest in Reyes Etla, einer Gemeinde, die eng mit Oaxacas berühmtem Quesillo verbunden ist.', it: 'Celebrazione gastronomica locale a Reyes Etla, comunità legata al celebre quesillo di Oaxaca.', pt: 'Celebração gastronômica local em Reyes Etla, comunidade ligada ao famoso quesillo de Oaxaca.', ja: 'オアハカ名物ケシージョと深く結びつく Reyes Etla の地元食イベントです。', zh: 'Reyes Etla 的本地美食庆典，这个社区与瓦哈卡著名的 quesillo 奶酪密切相关。' },
    tip: { en: 'Go hungry, carry cash, and ask vendors which producers are family-run.', es: 'Ve con hambre, lleva efectivo y pregunta qué productores son negocios familiares.', fr: 'Venez avec faim, prenez du liquide et demandez quels producteurs sont familiaux.', de: 'Komme hungrig, nimm Bargeld mit und frage nach familiengeführten Produzenten.', it: 'Vieni affamato, porta contanti e chiedi quali produttori sono familiari.', pt: 'Vá com fome, leve dinheiro e pergunte quais produtores são familiares.', ja: 'お腹を空かせて、現金を持ち、家族経営の生産者を聞いてみましょう。', zh: '空腹前往，带现金，并询问哪些摊主是家庭经营。' },
    safety: { en: 'Use planned transport back to Oaxaca City; rural return rides can be limited after dark.', es: 'Planifica el regreso a Oaxaca de Juárez; el transporte rural puede ser limitado después de oscurecer.', fr: 'Prévoyez le retour vers Oaxaca; les transports ruraux peuvent être limités après la nuit.', de: 'Plane die Rückfahrt nach Oaxaca-Stadt; ländliche Verbindungen sind nach Einbruch der Dunkelheit begrenzt.', it: 'Organizza il rientro a Oaxaca; i trasporti rurali possono essere limitati dopo il buio.', pt: 'Planeje a volta a Oaxaca; transportes rurais podem ser limitados à noite.', ja: 'オアハカ市への帰りを事前に計画しましょう。暗くなると郊外の移動手段は限られます。', zh: '请提前安排返回瓦哈卡市的交通；天黑后乡村返程选择可能有限。' }
  },
  {
    id: 'guelaguetza', month: 'july', day: '20 / 27', date: '2026-07-20', time: 'Morning and evening functions', venue: 'Auditorio Guelaguetza', query: 'Auditorio Guelaguetza Oaxaca',
    title: { en: 'Guelaguetza Mondays on the Hill', es: 'Lunes del Cerro de la Guelaguetza', fr: 'Lundis du Cerro de la Guelaguetza', de: 'Guelaguetza-Montage am Hügel', it: 'Lunedì del Cerro della Guelaguetza', pt: 'Segundas do Cerro da Guelaguetza', ja: 'ゲラゲッツァ「丘の月曜日」', zh: 'Guelaguetza 山丘星期一' },
    summary: { en: 'Oaxaca’s major cultural celebration, with delegations sharing music, dance, dress, and regional identity.', es: 'La gran celebración cultural de Oaxaca, con delegaciones que comparten música, danza, vestimenta e identidad regional.', fr: 'La grande fête culturelle d’Oaxaca, avec délégations, musique, danse, tenues et identités régionales.', de: 'Oaxacas großes Kulturfest mit Delegationen, Musik, Tanz, Trachten und regionaler Identität.', it: 'La grande festa culturale di Oaxaca, con delegazioni, musica, danza, abiti e identità regionali.', pt: 'A grande celebração cultural de Oaxaca, com delegações, música, dança, trajes e identidade regional.', ja: '音楽、踊り、衣装、地域アイデンティティを代表団が披露するオアハカ最大級の文化祭です。', zh: '瓦哈卡重要文化庆典，各地区代表展示音乐、舞蹈、服饰与地域身份。' },
    tip: { en: 'Buy only through official channels, arrive early, and make a simple post-show exit plan.', es: 'Compra solo por canales oficiales, llega temprano y define un plan sencillo para salir después.', fr: 'Achetez uniquement par canaux officiels, arrivez tôt et prévoyez une sortie simple après le spectacle.', de: 'Kaufe nur über offizielle Kanäle, komm früh und plane eine einfache Abreise nach der Show.', it: 'Compra solo tramite canali ufficiali, arriva presto e prepara un piano semplice per uscire dopo.', pt: 'Compre apenas por canais oficiais, chegue cedo e planeje a saída depois do espetáculo.', ja: 'チケットは公式ルートのみで購入し、早めに到着し、終了後の帰り方を決めておきましょう。', zh: '仅通过官方渠道购票，提前到达，并规划好演出后的离场路线。' },
    safety: { en: 'Expect crowds around Cerro del Fortín; agree on a meeting point if traveling in a group.', es: 'Habrá multitudes cerca del Cerro del Fortín; acuerden un punto de reunión si van en grupo.', fr: 'Attendez-vous à la foule près du Cerro del Fortín; fixez un point de rendez-vous en groupe.', de: 'Rund um den Cerro del Fortín ist mit Menschenmengen zu rechnen; vereinbart einen Treffpunkt.', it: 'Aspettati folla vicino al Cerro del Fortín; stabilite un punto d’incontro se siete in gruppo.', pt: 'Espere multidões perto do Cerro del Fortín; combine um ponto de encontro se estiver em grupo.', ja: 'Cerro del Fortín 周辺は混雑します。グループ旅行なら集合場所を決めてください。', zh: 'Cerro del Fortín 附近人潮较多；同行者请提前约定集合点。' }
  },
  {
    id: 'dia-muertos', month: 'october', day: '31–02', date: '2026-10-31', time: 'Evening programs vary', venue: 'Centro Histórico and neighborhoods', query: 'Centro Historico Oaxaca',
    title: { en: 'Day of the Dead season', es: 'Temporada de Día de Muertos', fr: 'Saison du Jour des Morts', de: 'Tag-der-Toten-Saison', it: 'Stagione del Giorno dei Morti', pt: 'Temporada do Dia dos Mortos', ja: '死者の日シーズン', zh: '亡灵节季节' },
    summary: { en: 'Altars, comparsas, cemeteries, markets, and neighborhood celebrations make late October and early November one of Oaxaca’s most memorable periods.', es: 'Altares, comparsas, panteones, mercados y fiestas barriales hacen que finales de octubre e inicios de noviembre sean inolvidables en Oaxaca.', fr: 'Autels, comparsas, cimetières, marchés et fêtes de quartier rendent cette période inoubliable à Oaxaca.', de: 'Altäre, Comparsas, Friedhöfe, Märkte und Stadtteilfeste machen diese Zeit in Oaxaca besonders eindrucksvoll.', it: 'Altari, comparsas, cimiteri, mercati e feste di quartiere rendono questo periodo memorabile a Oaxaca.', pt: 'Altares, comparsas, cemitérios, mercados e festas de bairro tornam esse período inesquecível em Oaxaca.', ja: '祭壇、コンパルサ、墓地、市場、地区のお祝いがあり、オアハカで最も印象的な時期の一つです。', zh: '祭坛、游行、墓地、市集和街区庆典让十月底至十一月初成为瓦哈卡最难忘的时期之一。' },
    tip: { en: 'Respect altars and cemetery rituals; ask before photographing people or private offerings.', es: 'Respeta altares y rituales en panteones; pregunta antes de fotografiar personas u ofrendas privadas.', fr: 'Respectez autels et rituels; demandez avant de photographier personnes ou offrandes privées.', de: 'Respektiere Altäre und Friedhofsrituale; frage vor Fotos von Menschen oder privaten Opfergaben.', it: 'Rispetta altari e rituali; chiedi prima di fotografare persone o offerte private.', pt: 'Respeite altares e rituais; peça permissão antes de fotografar pessoas ou oferendas privadas.', ja: '祭壇や墓地の儀式を尊重し、人や個人のお供えを撮る前に許可を得ましょう。', zh: '尊重祭坛和墓地仪式；拍摄人物或私人供品前请先征得同意。' },
    safety: { en: 'Book lodging and transport early; use well-lit routes when moving between late-night events.', es: 'Reserva hospedaje y transporte con anticipación; usa rutas iluminadas entre eventos nocturnos.', fr: 'Réservez logement et transport tôt; choisissez des routes éclairées entre événements nocturnes.', de: 'Unterkunft und Transport früh buchen; nachts gut beleuchtete Wege nutzen.', it: 'Prenota alloggio e trasporto in anticipo; usa percorsi illuminati tra eventi notturni.', pt: 'Reserve hospedagem e transporte cedo; use rotas iluminadas entre eventos noturnos.', ja: '宿と交通は早めに予約し、夜のイベント間は明るい道を使ってください。', zh: '请提前预订住宿和交通；夜间活动之间移动时选择照明良好的路线。' }
  },
  {
    id: 'radishes-night', month: 'december', day: '23', date: '2026-12-23', time: 'Afternoon and evening', venue: 'Zócalo de Oaxaca', query: 'Zocalo Oaxaca',
    title: { en: 'Night of the Radishes', es: 'Noche de Rábanos', fr: 'Nuit des Radis', de: 'Nacht der Radieschen', it: 'Notte dei Ravanelli', pt: 'Noite dos Rabanetes', ja: 'ラディッシュの夜', zh: '萝卜之夜' },
    summary: { en: 'A beloved Christmas-season Oaxaca tradition where artisans carve elaborate scenes from radishes and natural materials.', es: 'Querida tradición navideña oaxaqueña donde artesanos tallan escenas elaboradas con rábanos y materiales naturales.', fr: 'Tradition oaxaquénienne de Noël où des artisans sculptent des scènes élaborées dans des radis et matériaux naturels.', de: 'Beliebte Weihnachtstradition in Oaxaca, bei der Kunsthandwerker aufwendige Szenen aus Radieschen und Naturmaterialien schnitzen.', it: 'Amata tradizione natalizia di Oaxaca con scene elaborate scolpite in ravanelli e materiali naturali.', pt: 'Tradicional celebração natalina de Oaxaca com cenas esculpidas em rabanetes e materiais naturais.', ja: '職人がラディッシュや自然素材で精巧な場面を彫る、オアハカの人気クリスマス伝統行事です。', zh: '瓦哈卡深受喜爱的圣诞季传统，工匠用萝卜和天然材料雕刻复杂场景。' },
    tip: { en: 'Lines can be long; pair it with an early dinner nearby and keep your evening flexible.', es: 'Las filas pueden ser largas; combínalo con una cena temprana cerca y mantén la noche flexible.', fr: 'Les files peuvent être longues; prévoyez un dîner tôt à proximité et gardez la soirée flexible.', de: 'Die Schlangen können lang sein; plane ein frühes Abendessen in der Nähe und bleib flexibel.', it: 'Le code possono essere lunghe; abbinalo a una cena presto nelle vicinanze.', pt: 'As filas podem ser longas; combine com jantar cedo por perto e deixe a noite flexível.', ja: '行列が長くなることがあります。近くで早めの夕食を取り、夜の予定は柔軟にしましょう。', zh: '排队可能很长；可先在附近早晚餐，并保持晚间安排灵活。' },
    safety: { en: 'Stay with your group in the Zócalo crowd and avoid carrying unnecessary valuables.', es: 'Permanece con tu grupo en la multitud del Zócalo y evita llevar objetos de valor innecesarios.', fr: 'Restez avec votre groupe dans la foule du Zócalo et évitez les objets de valeur inutiles.', de: 'Bleib in der Zócalo-Menge bei deiner Gruppe und trage keine unnötigen Wertsachen.', it: 'Resta con il gruppo nella folla dello Zócalo ed evita valori non necessari.', pt: 'Fique com seu grupo na multidão do Zócalo e evite levar objetos de valor desnecessários.', ja: 'ソカロの人混みではグループから離れず、不要な貴重品は持たないでください。', zh: '在索卡洛广场人群中请与同伴同行，避免携带不必要的贵重物品。' }
  }
];

const months = ['all', 'january', 'june', 'july', 'october', 'december'];
const getLocalized = (field, lang) => field?.[lang] || field?.en || '';
const languageNames = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  zh: 'Chinese'
};

export function Events() {
  const { language } = useLanguage();
  const lang = eventCopy[language] ? language : 'en';
  const copy = eventCopy[lang];
  const labels = monthLabels[lang] || monthLabels.en;
  const [activeMonth, setActiveMonth] = React.useState('july');
  const [expandedAiId, setExpandedAiId] = React.useState(null);
  const [aiLoadingId, setAiLoadingId] = React.useState(null);
  const [aiDetails, setAiDetails] = React.useState({});
  const [aiErrors, setAiErrors] = React.useState({});
  const visibleEvents = activeMonth === 'all' ? events : events.filter(event => event.month === activeMonth);

  const renderAiText = (text) => String(text || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map((line, index) => html`<p key=${`${index}-${line.slice(0, 18)}`} className="leading-relaxed">${line}</p>`);

  const askEventAi = async (event) => {
    const cached = aiDetails[event.id];
    if (expandedAiId === event.id && cached) {
      setExpandedAiId(null);
      return;
    }

    setExpandedAiId(event.id);
    if (cached || aiLoadingId === event.id) return;

    setAiLoadingId(event.id);
    setAiErrors(prev => ({ ...prev, [event.id]: '' }));

    try {
      const prompt = [
        `Write in ${languageNames[lang] || 'English'} for a visitor in Oaxaca.`,
        'You are TuTour, a practical, culturally respectful local tour guide for Oaxaca.',
        `Event: ${getLocalized(event.title, lang)}`,
        `Date/month: ${labels[event.month]} ${event.day}, 2026`,
        `Time: ${event.time}`,
        `Place: ${event.venue}`,
        `Known visitor note: ${getLocalized(event.summary, lang)}`,
        `Existing guide tip: ${getLocalized(event.tip, lang)}`,
        `Existing safety note: ${getLocalized(event.safety, lang)}`,
        'Add concise local context that a friendly Oaxaca tour guide would share: what to expect, how to plan arrival/exit, nearby food or culture ideas, etiquette, and safety reminders. Do not invent exact ticket prices, exact schedules, or official claims; tell users to verify official details when needed.'
      ].join('\n');

      let text = '';
      const response = await fetch('/api/ai/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          appId: window.GENMB_APP_ID,
          maxTokens: 320
        })
      });

      if (!response.ok) {
        throw new Error(response.status === 429 ? copy.aiRateLimit : copy.aiErrorFallback);
      }

      const json = await response.json();
      text = typeof json?.data?.text === 'string' ? json.data.text.trim() : '';
      if (!text) throw new Error(copy.aiEmpty);
      setAiDetails(prev => ({ ...prev, [event.id]: text }));
    } catch (err) {
      setAiErrors(prev => ({ ...prev, [event.id]: err?.message || copy.aiErrorFallback }));
    } finally {
      setAiLoadingId(null);
    }
  };

  return html`
    <div className="grid gap-4 min-w-0 events-page">
      <section className="relative overflow-hidden rounded-[1.35rem] border-2 border-[hsl(var(--border))] bg-[#321249] p-5 text-[#fff7ec] shadow-[var(--shadow-lg)] md:p-8">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80" style=${{ backgroundImage: `linear-gradient(135deg, rgba(50,18,73,.86), rgba(240,102,10,.50)), radial-gradient(circle at 12% 12%, rgba(251,146,60,.42), transparent 16rem), url(${eventHeroBackgroundImage})` }} aria-hidden="true"></div>
        <div className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[.08em] text-[#ffe7a3]"><${Megaphone} className="h-4 w-4" />${copy.kicker}</span>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-none tracking-[-.05em] md:text-5xl">${copy.title}</h1>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-relaxed text-[#fff7ec]/90 md:text-base">${copy.subtitle}</p>
          </div>
          <a href=${officialCalendarUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-[44px] w-fit items-center justify-center gap-2 rounded-full border-2 border-[#f0abfc] bg-[#f0660a] px-4 py-2 text-sm font-black text-white shadow-[0_12px_30px_rgba(0,0,0,.24)] hover:bg-[#9333ea]">
            ${copy.source} <${ExternalLink} className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="grid gap-3 rounded-[1.2rem] border-2 border-[hsl(var(--border))] bg-[hsl(var(--card)/.9)] p-4 shadow-[var(--shadow-sm)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black tracking-[-.03em]">${copy.board}</h2>
            <p className="text-xs font-bold text-[hsl(var(--muted-foreground))]">${copy.updated}</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            ${months.map(month => html`<button key=${month} type="button" onClick=${() => setActiveMonth(month)} className=${`focus-ring min-h-[36px] flex-none rounded-full border px-3 py-1.5 text-xs font-black ${activeMonth === month ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--muted)/.48)] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/.55)]'}`}>${labels[month] || month}</button>`)}
          </div>
        </div>
        <p className="rounded-[var(--radius-md)] bg-[hsl(var(--primary)/.10)] p-3 text-xs font-bold text-[hsl(var(--muted-foreground))]">${copy.sourceNote}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid gap-3">
          ${visibleEvents.length ? visibleEvents.map(event => html`
            <article key=${event.id} className="relative overflow-hidden rounded-[1.15rem] border-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-sm)]">
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-[#f0660a] via-[#d946ef] to-[#7e22ce]"></div>
              <div className="grid gap-3 pl-2 md:grid-cols-[5.5rem_1fr]">
                <div className="flex md:block">
                  <div className="grid min-h-[4.4rem] min-w-[4.8rem] place-items-center rounded-[1rem] bg-[#321249] px-2 text-center text-[#fff7ec] shadow-[var(--shadow-sm)]">
                    <span className="text-[.68rem] font-black uppercase text-[#fcd34d]">${labels[event.month]}</span>
                    <strong className="text-lg font-black leading-none">${event.day}</strong>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-black tracking-[-.03em]">${getLocalized(event.title, lang)}</h3>
                      <p className="text-sm font-semibold leading-relaxed text-[hsl(var(--muted-foreground))]">${getLocalized(event.summary, lang)}</p>
                    </div>
                    <a href=${officialCalendarUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-[34px] flex-none items-center justify-center gap-1 rounded-full border border-[hsl(var(--primary)/.55)] bg-[hsl(var(--primary)/.10)] px-3 py-1.5 text-xs font-black text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]">${copy.verify}<${ExternalLink} className="h-3.5 w-3.5" /></a>
                  </div>
                  <div className="grid gap-2 text-xs font-bold text-[hsl(var(--foreground))] md:grid-cols-2">
                    <span className="rounded-[var(--radius-md)] bg-[hsl(var(--muted)/.52)] p-2"><${CalendarDays} className="inline h-3.5 w-3.5 text-[hsl(var(--primary))]" /> ${copy.time}: ${event.time}</span>
                    <span className="rounded-[var(--radius-md)] bg-[hsl(var(--muted)/.52)] p-2"><${MapPin} className="inline h-3.5 w-3.5 text-[hsl(var(--primary))]" /> ${copy.place}: ${event.venue}</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <p className="rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-xs font-bold leading-relaxed"><${Sparkles} className="inline h-3.5 w-3.5 text-[#d946ef]" /> ${copy.tip}: ${getLocalized(event.tip, lang)}</p>
                    <p className="rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.10)] p-3 text-xs font-bold leading-relaxed"><${ShieldCheck} className="inline h-3.5 w-3.5 text-[hsl(var(--secondary))]" /> ${copy.safety}: ${getLocalized(event.safety, lang)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href=${`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.query)}`} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-[38px] w-fit items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] px-3 py-2 text-xs font-black text-[hsl(var(--card))] hover:bg-[hsl(var(--secondary))]">${copy.directions}<${MapPin} className="h-3.5 w-3.5" /></a>
                    <button type="button" onClick=${() => askEventAi(event)} disabled=${aiLoadingId === event.id} aria-expanded=${expandedAiId === event.id} className="focus-ring inline-flex min-h-[38px] w-fit items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[#d946ef]/70 bg-[#321249] px-3 py-2 text-xs font-black text-[#fff7ec] shadow-[0_10px_22px_rgba(50,18,73,.18)] hover:bg-[#7e22ce] disabled:cursor-not-allowed disabled:opacity-70">
                      ${aiLoadingId === event.id ? copy.aiLoading : (expandedAiId === event.id && aiDetails[event.id] ? copy.hideAi : copy.askAi)}<${Sparkles} className="h-3.5 w-3.5 text-[#fcd34d]" />
                    </button>
                  </div>
                  ${expandedAiId === event.id ? html`
                    <div className="rounded-[1rem] border border-[#d946ef]/45 bg-[linear-gradient(135deg,rgba(50,18,73,.96),rgba(126,34,206,.82))] p-3 text-[#fff7ec] shadow-[var(--shadow-sm)]" aria-live="polite">
                      <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[.08em] text-[#fcd34d]"><${Sparkles} className="h-4 w-4" />${copy.aiHeading}</div>
                      ${aiLoadingId === event.id ? html`<p className="text-sm font-bold">${copy.aiLoading}</p>` : aiErrors[event.id] ? html`<p className="rounded-[var(--radius-md)] border border-red-300/50 bg-red-500/20 p-2 text-sm font-bold text-red-50">${aiErrors[event.id]}</p>` : aiDetails[event.id] ? html`<div className="grid gap-2 text-sm font-semibold">${renderAiText(aiDetails[event.id])}</div>` : html`<p className="text-sm font-bold">${copy.aiEmpty}</p>`}
                    </div>
                  ` : null}
                </div>
              </div>
            </article>
          `) : html`<div className="rounded-[1rem] border-2 border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted)/.35)] p-6 text-center text-sm font-black text-[hsl(var(--muted-foreground))]">${copy.empty}</div>`}
        </div>
        <aside className="h-fit rounded-[1.15rem] border-2 border-[hsl(var(--border))] bg-[linear-gradient(180deg,hsl(var(--card)),hsl(var(--muted)/.42))] p-4 shadow-[var(--shadow-sm)]">
          <h2 className="text-lg font-black tracking-[-.03em]">${copy.featured}</h2>
          <div className="mt-3 grid gap-2">
            ${events.slice(2, 6).map(event => html`<button key=${`${event.id}-jump`} type="button" onClick=${() => setActiveMonth(event.month)} className="focus-ring grid w-full gap-1 rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.76)] p-3 text-left hover:border-[hsl(var(--primary)/.58)] hover:bg-[hsl(var(--primary)/.08)]">
              <span className="text-[.68rem] font-black uppercase text-[hsl(var(--primary))]">${labels[event.month]} · ${event.day}</span>
              <strong className="text-sm font-black leading-tight">${getLocalized(event.title, lang)}</strong>
            </button>`)}
          </div>
        </aside>
      </section>
    </div>
  `;
}

import { places } from './places.js';
import { i18n } from './i18n.js';

export const placeCardLocaleFields = ['name', 'category', 'area', 'address', 'duration', 'price', 'priceLabel', 'description', 'bestFor', 'highlights', 'localTip', 'safetyTip', 'bestTime', 'nearby', 'bring', 'accessibility', 'booking', 'openingHours'];

export const defaultFieldFallbacks = {
  bring: 'Water, sun protection, small bills, and comfortable shoes.',
  accessibility: 'Historic streets may have uneven sidewalks; confirm step-free access before you go.',
  booking: 'Reserve popular restaurants, tastings, and guided sites ahead.'
};

const localizedDefaultFieldFallbacks = {
  es: {
    bring: 'Agua, protección solar, billetes pequeños y zapatos cómodos.',
    accessibility: 'Las calles históricas pueden tener banquetas irregulares; confirma el acceso sin escalones antes de ir.',
    booking: 'Reserva con anticipación restaurantes populares, degustaciones y sitios guiados.'
  },
  fr: {
    bring: 'Eau, protection solaire, petites coupures et chaussures confortables.',
    accessibility: 'Les rues historiques peuvent avoir des trottoirs irréguliers ; confirmez l’accès sans marche avant de partir.',
    booking: 'Réservez à l’avance les restaurants populaires, dégustations et sites guidés.'
  },
  de: {
    bring: 'Wasser, Sonnenschutz, kleine Scheine und bequeme Schuhe.',
    accessibility: 'Historische Straßen können unebene Gehwege haben; kläre stufenlosen Zugang vor dem Besuch.',
    booking: 'Reserviere beliebte Restaurants, Verkostungen und geführte Orte im Voraus.'
  },
  it: {
    bring: 'Acqua, protezione solare, banconote piccole e scarpe comode.',
    accessibility: 'Le strade storiche possono avere marciapiedi irregolari; verifica l’accesso senza gradini prima di andare.',
    booking: 'Prenota in anticipo ristoranti popolari, degustazioni e siti guidati.'
  },
  pt: {
    bring: 'Água, protetor solar, notas pequenas e sapatos confortáveis.',
    accessibility: 'Ruas históricas podem ter calçadas irregulares; confirme acesso sem degraus antes de ir.',
    booking: 'Reserve restaurantes populares, degustações e locais guiados com antecedência.'
  },
  ja: {
    bring: '水、日よけ、小額紙幣、歩きやすい靴を持参しましょう。',
    accessibility: '歴史地区の歩道は不規則な場合があります。段差のないアクセスを事前に確認してください。',
    booking: '人気レストラン、試飲、ガイド付き施設は事前予約がおすすめです。'
  },
  zh: {
    bring: '带上水、防晒用品、小额现金和舒适的鞋子。',
    accessibility: '历史街区的人行道可能不平整；出发前请确认无台阶通行条件。',
    booking: '热门餐厅、品鉴和导览景点建议提前预订。'
  }
};

const zocaloEn = {
  name: 'Zócalo de la Ciudad de Oaxaca',
  category: 'Culture',
  area: 'Plaza de la Constitución',
  address: 'Plaza de la Constitución, Centro, 68000 Oaxaca de Juárez, Oax., México',
  duration: '45 min',
  price: 'Free',
  priceLabel: 'Free',
  description: 'A fresh culture card for Oaxaca City’s central square: the shaded civic heart where cathedral views, cafés, marimba music, public art, vendors, and everyday Oaxacan life come together.',
  bestFor: 'central plaza, cathedral views, people-watching, local music, first-time city orientation',
  highlights: 'central plaza, cathedral views, people-watching, local music, first-time city orientation',
  localTip: 'Start here in daylight, then walk toward the cathedral and Andador Alcalá. Late afternoon is best for shade, music, and the evening paseo.',
  safetyTip: 'It is one of the easiest Centro meeting points, but keep phones and wallets secure in crowds, stay aware during demonstrations, and use well-lit streets or registered transport late at night.',
  bestTime: 'Late afternoon into early evening for shade, plaza life, music, and warmer light on the historic buildings',
  openingHours: 'Open 24/7 as a public plaza; cafés, vendors, events, and crowd levels vary by day',
  nearby: 'Catedral Metropolitana, Mercado 20 de Noviembre, Mercado Benito Juárez, Andador Alcalá, Basílica de Nuestra Señora de la Soledad',
  bring: 'Small bills for snacks or cafés, water, a charged phone, and a secure crossbody bag',
  accessibility: 'Mostly flat public plaza paths with some uneven historic paving, curb edges, and dense crowds during events.',
  booking: 'No booking needed; check Google Maps or city event notices for festivals, demonstrations, and temporary closures.'
};

const monteAlbanEn = {
  name: 'Zona Arqueológica de Monte Albán',
  category: 'Culture',
  area: 'Santa Cruz Xoxocotlán',
  address: 'Zona Arqueológica de Monte Albán, Santa Cruz Xoxocotlán, Oaxaca, México',
  duration: '3 hr',
  price: '$$',
  priceLabel: '$$',
  description: 'A brand-new culture recommendation card for Oaxaca’s essential hilltop archaeological site, with Zapotec plazas, tombs, temples, carved stones, a small museum, and sweeping views across the Central Valleys.',
  bestFor: 'Zapotec archaeology, panoramic valley views, guided history, photography, first Oaxaca culture day',
  highlights: 'hilltop ruins, Grand Plaza, carved stones, tombs, museum, Central Valleys views',
  localTip: 'Go early, hire a certified guide at the entrance if available, and start at the museum before walking the Grand Plaza so the site’s Zapotec history is easier to read.',
  safetyTip: 'Visit in daylight, bring water and sun protection, stay on marked paths, watch uneven stone steps, and use an official tour, trusted taxi, or pre-arranged driver for the return.',
  bestTime: 'Morning for cooler weather, clearer views, fewer crowds, and better light on the stone platforms',
  openingHours: 'Hours and ticket rules can change; confirm same-day details on Google Maps before leaving Oaxaca City',
  nearby: 'Atzompa, San Bartolo Coyotepec, Cuilápam de Guerrero, Oaxaca City Centro, Museo de las Culturas de Oaxaca',
  bring: 'Hat, sunscreen, water, comfortable shoes with grip, small cash for tickets or guide tips, and a charged phone',
  accessibility: 'Expect exposed sun, gravel, stairs, uneven stone, and long walking distances; confirm accessible routes and mobility support before visiting.',
  booking: 'No app booking needed for a self-guided visit; book a guide, driver, or tour ahead during busy seasons and holiday weekends.'
};

const placeFieldOverrides = {
  'zocalo-ciudad-oaxaca': {
    en: zocaloEn,
    es: {
      ...zocaloEn,
      category: 'Cultura',
      price: 'Gratis',
      priceLabel: 'Gratis',
      description: 'Una nueva tarjeta cultural para la plaza central de Oaxaca: el corazón cívico sombreado donde se juntan vistas de la catedral, cafés, música de marimba, arte público, vendedores y vida cotidiana oaxaqueña.',
      bestFor: 'plaza central, vistas de la catedral, observar gente, música local, primera orientación por la ciudad',
      highlights: 'plaza central, vistas de la catedral, observar gente, música local, primera orientación por la ciudad',
      localTip: 'Empieza aquí con luz de día y camina hacia la catedral y el Andador Alcalá. La tarde es ideal por la sombra, la música y el paseo vespertino.',
      safetyTip: 'Es uno de los puntos de encuentro más fáciles del Centro, pero guarda bien celular y cartera en multitudes, pon atención durante manifestaciones y usa calles iluminadas o transporte registrado tarde en la noche.',
      bestTime: 'Final de la tarde e inicio de la noche por la sombra, la vida de plaza, la música y la luz cálida en los edificios históricos',
      openingHours: 'Abierto 24/7 como plaza pública; cafés, vendedores, eventos y niveles de gente varían por día',
      bring: 'Billetes pequeños para antojitos o cafés, agua, celular cargado y bolsa cruzada segura',
      accessibility: 'Senderos de plaza mayormente planos, con algo de pavimento histórico irregular, bordes de banqueta y multitudes en eventos.',
      booking: 'No requiere reserva; revisa Google Maps o avisos de la ciudad para festivales, manifestaciones y cierres temporales.'
    },
    fr: { ...zocaloEn, name: 'Zócalo de la ville d’Oaxaca', category: 'Culture', price: 'Gratuit', priceLabel: 'Gratuit', description: 'Une fiche culturelle pour la place centrale ombragée d’Oaxaca, avec cathédrale, cafés, marimba, art public, vendeurs et vie quotidienne locale.', bestFor: 'place centrale, cathédrale, vie locale, musique, première orientation', highlights: 'place centrale, cathédrale, vie locale, musique, première orientation' },
    de: { ...zocaloEn, name: 'Zócalo der Stadt Oaxaca', category: 'Kultur', price: 'Kostenlos', priceLabel: 'Kostenlos', description: 'Eine Kulturkarte für Oaxacas schattigen Hauptplatz mit Kathedralblick, Cafés, Marimba, öffentlicher Kunst, Händlern und Alltagsleben.', bestFor: 'zentraler Platz, Kathedrale, Menschenbeobachtung, Musik, Orientierung', highlights: 'zentraler Platz, Kathedrale, Menschenbeobachtung, Musik, Orientierung' },
    it: { ...zocaloEn, name: 'Zócalo della Città di Oaxaca', category: 'Cultura', price: 'Gratuito', priceLabel: 'Gratuito', description: 'Una scheda culturale per la piazza centrale ombreggiata di Oaxaca, con cattedrale, caffè, marimba, arte pubblica, venditori e vita quotidiana.', bestFor: 'piazza centrale, cattedrale, vita locale, musica, primo orientamento', highlights: 'piazza centrale, cattedrale, vita locale, musica, primo orientamento' },
    pt: { ...zocaloEn, name: 'Zócalo da Cidade de Oaxaca', category: 'Cultura', price: 'Gratuito', priceLabel: 'Gratuito', description: 'Um cartão cultural para a praça central sombreada de Oaxaca, com catedral, cafés, marimba, arte pública, vendedores e vida cotidiana.', bestFor: 'praça central, catedral, vida local, música, primeira orientação', highlights: 'praça central, catedral, vida local, música, primeira orientação' },
    ja: { ...zocaloEn, name: 'オアハカ市ソカロ', category: '文化', area: 'プラサ・デ・ラ・コンスティトゥシオン', price: '無料', priceLabel: '無料', duration: '45分', description: 'オアハカ中心広場の文化カード。大聖堂、カフェ、マリンバ音楽、公共アート、露店、日常のにぎわいが集まる木陰の広場です。', bestFor: '中央広場、大聖堂、地元の雰囲気、音楽、街歩きの起点', highlights: '中央広場、大聖堂、地元の雰囲気、音楽、街歩きの起点' },
    zh: { ...zocaloEn, name: '瓦哈卡市索卡洛广场', category: '文化', area: '宪法广场', price: '免费', priceLabel: '免费', duration: '45分钟', description: '瓦哈卡中央广场的文化卡片：这里有树荫、大教堂景观、咖啡馆、马林巴音乐、公共艺术、摊贩和日常生活。', bestFor: '中央广场、大教堂、当地生活、音乐、初次城市定位', highlights: '中央广场、大教堂、当地生活、音乐、初次城市定位' }
  },
  'monte-alban': {
    en: monteAlbanEn,
    es: {
      ...monteAlbanEn,
      name: 'Zona Arqueológica de Monte Albán',
      category: 'Cultura',
      area: 'Santa Cruz Xoxocotlán',
      address: 'Zona Arqueológica de Monte Albán, Santa Cruz Xoxocotlán, Oaxaca, México',
      duration: '3 h',
      description: 'Una tarjeta cultural completamente nueva para el sitio arqueológico imprescindible de Oaxaca en lo alto del cerro, con plazas zapotecas, tumbas, templos, piedras talladas, museo pequeño y vistas amplias de los Valles Centrales.',
      bestFor: 'arqueología zapoteca, vistas panorámicas del valle, historia con guía, fotografía, primer día cultural en Oaxaca',
      highlights: 'ruinas en la cima, Gran Plaza, piedras talladas, tumbas, museo, vistas de los Valles Centrales',
      localTip: 'Ve temprano, contrata un guía certificado en la entrada si está disponible y empieza por el museo antes de caminar la Gran Plaza para entender mejor la historia zapoteca.',
      safetyTip: 'Visita con luz de día, lleva agua y protección solar, no salgas de los senderos marcados, cuida los escalones irregulares y usa tour oficial, taxi confiable o chofer reservado para regresar.',
      bestTime: 'Mañana para clima más fresco, vistas más claras, menos gente y mejor luz sobre las plataformas de piedra',
      openingHours: 'Los horarios y reglas de boletos pueden cambiar; confirma los detalles del día en Google Maps antes de salir de Oaxaca',
      nearby: 'Atzompa, San Bartolo Coyotepec, Cuilápam de Guerrero, Centro de Oaxaca, Museo de las Culturas de Oaxaca',
      bring: 'Sombrero, bloqueador, agua, zapatos cómodos con agarre, efectivo pequeño para boletos o propinas de guía y celular cargado',
      accessibility: 'Espera sol directo, grava, escaleras, piedra irregular y largas distancias a pie; confirma rutas accesibles y apoyo de movilidad antes de visitar.',
      booking: 'No se necesita reserva de app para visita libre; reserva guía, chofer o tour con anticipación en temporadas altas y fines de semana festivos.'
    },
    fr: {
      ...monteAlbanEn,
      category: 'Culture',
      duration: '3 h',
      price: '$$',
      priceLabel: '$$',
      description: 'Une toute nouvelle fiche culture pour le grand site archéologique perché d’Oaxaca, avec places zapotèques, tombes, temples, pierres sculptées, petit musée et vues sur les Vallées centrales.',
      bestFor: 'archéologie zapotèque, vues panoramiques, histoire guidée, photographie, première journée culturelle',
      highlights: 'ruines en hauteur, Grande Place, pierres sculptées, tombes, musée, vues sur les vallées',
      localTip: 'Venez tôt, prenez un guide certifié à l’entrée si possible et commencez par le musée avant la Grande Place pour mieux comprendre l’histoire zapotèque.',
      safetyTip: 'Visitez de jour, apportez eau et protection solaire, restez sur les sentiers marqués, surveillez les marches irrégulières et prévoyez un transport fiable pour le retour.',
      bestTime: 'Le matin pour plus de fraîcheur, des vues plus nettes, moins de monde et une belle lumière sur la pierre',
      openingHours: 'Horaires et billets peuvent changer ; vérifiez les détails du jour sur Google Maps avant de partir',
      nearby: 'Atzompa, San Bartolo Coyotepec, Cuilápam de Guerrero, Centro d’Oaxaca, Museo de las Culturas de Oaxaca',
      bring: 'Chapeau, crème solaire, eau, chaussures adhérentes, petites espèces et téléphone chargé',
      accessibility: 'Prévoir soleil, gravier, escaliers, pierres irrégulières et longues distances ; confirmez les parcours accessibles avant la visite.',
      booking: 'Pas de réservation dans l’app pour une visite libre ; réservez guide, chauffeur ou excursion en période chargée.'
    },
    de: {
      ...monteAlbanEn,
      category: 'Kultur',
      duration: '3 Std.',
      description: 'Eine brandneue Kulturkarte für Oaxacas wichtigste Ausgrabungsstätte auf dem Hügel mit zapotekischen Plätzen, Gräbern, Tempeln, Steinreliefs, kleinem Museum und weitem Talblick.',
      bestFor: 'zapotekische Archäologie, Panoramablicke, geführte Geschichte, Fotografie, erster Kulturtag',
      highlights: 'Hügelruinen, Große Plaza, Steinreliefs, Gräber, Museum, Blick auf die Zentraltäler',
      localTip: 'Geh früh hin, nimm wenn möglich am Eingang einen zertifizierten Guide und starte im Museum, bevor du über die Große Plaza läufst.',
      safetyTip: 'Besuche die Stätte bei Tageslicht, nimm Wasser und Sonnenschutz mit, bleibe auf markierten Wegen, achte auf unebene Stufen und nutze zuverlässigen Rücktransport.',
      bestTime: 'Morgens für kühleres Wetter, klarere Sicht, weniger Besucher und gutes Licht auf den Steinplattformen',
      openingHours: 'Öffnungszeiten und Ticketregeln können wechseln; prüfe Tagesdetails vor der Abfahrt auf Google Maps',
      nearby: 'Atzompa, San Bartolo Coyotepec, Cuilápam de Guerrero, Oaxaca Centro, Museo de las Culturas de Oaxaca',
      bring: 'Hut, Sonnenschutz, Wasser, griffige Schuhe, kleines Bargeld und geladenes Telefon',
      accessibility: 'Rechne mit Sonne, Kies, Treppen, unebenem Stein und langen Wegen; barrierearme Routen vorher bestätigen.',
      booking: 'Für Selbstbesuch keine App-Buchung nötig; Guide, Fahrer oder Tour in Hochsaison vorab buchen.'
    },
    it: {
      ...monteAlbanEn,
      category: 'Cultura',
      duration: '3 h',
      price: '$$',
      priceLabel: '$$',
      description: 'Una scheda cultura completamente nuova per il sito archeologico collinare essenziale di Oaxaca, con piazze zapoteche, tombe, templi, pietre scolpite, piccolo museo e viste sulle Valli Centrali.',
      bestFor: 'archeologia zapoteca, viste panoramiche, storia guidata, fotografia, primo giorno culturale',
      highlights: 'rovine collinari, Grande Piazza, pietre scolpite, tombe, museo, viste sulle valli',
      localTip: 'Vai presto, prendi una guida certificata all’ingresso se disponibile e inizia dal museo prima di attraversare la Grande Piazza.',
      safetyTip: 'Visita di giorno, porta acqua e protezione solare, resta sui sentieri segnati, attenzione ai gradini irregolari e organizza un rientro affidabile.',
      bestTime: 'Mattina per clima più fresco, viste più limpide, meno folla e luce migliore sulla pietra',
      openingHours: 'Orari e biglietti possono cambiare; controlla Google Maps prima di partire',
      nearby: 'Atzompa, San Bartolo Coyotepec, Cuilápam de Guerrero, Centro di Oaxaca, Museo de las Culturas de Oaxaca',
      bring: 'Cappello, crema solare, acqua, scarpe con grip, contanti piccoli e telefono carico',
      accessibility: 'Aspettati sole, ghiaia, scale, pietra irregolare e lunghe camminate; conferma percorsi accessibili prima della visita.',
      booking: 'Non serve prenotazione app per visita autonoma; prenota guida, autista o tour nei periodi affollati.'
    },
    pt: {
      ...monteAlbanEn,
      category: 'Cultura',
      duration: '3 h',
      price: '$$',
      priceLabel: '$$',
      description: 'Um cartão cultural totalmente novo para o sítio arqueológico essencial de Oaxaca no alto do morro, com praças zapotecas, tumbas, templos, pedras esculpidas, pequeno museu e vistas dos Vales Centrais.',
      bestFor: 'arqueologia zapoteca, vistas panorâmicas, história com guia, fotografia, primeiro dia cultural',
      highlights: 'ruínas no alto, Grande Praça, pedras esculpidas, tumbas, museu, vistas dos vales',
      localTip: 'Vá cedo, contrate um guia certificado na entrada se houver e comece pelo museu antes da Grande Praça para entender melhor a história zapoteca.',
      safetyTip: 'Visite de dia, leve água e protetor solar, fique nas trilhas marcadas, cuidado com degraus irregulares e use transporte confiável para voltar.',
      bestTime: 'Manhã para clima mais fresco, vistas mais claras, menos gente e melhor luz na pedra',
      openingHours: 'Horários e regras de ingresso podem mudar; confirme no Google Maps antes de sair',
      nearby: 'Atzompa, San Bartolo Coyotepec, Cuilápam de Guerrero, Centro de Oaxaca, Museo de las Culturas de Oaxaca',
      bring: 'Chapéu, protetor solar, água, sapatos com aderência, dinheiro trocado e celular carregado',
      accessibility: 'Espere sol, cascalho, escadas, pedra irregular e longas caminhadas; confirme rotas acessíveis antes de visitar.',
      booking: 'Não precisa reservar no app para visita livre; reserve guia, motorista ou tour em épocas movimentadas.'
    },
    ja: {
      ...monteAlbanEn,
      name: 'モンテ・アルバン遺跡',
      category: '文化',
      area: 'サンタ・クルス・ショショコトラン',
      address: 'Zona Arqueológica de Monte Albán, Santa Cruz Xoxocotlán, Oaxaca, Mexico',
      duration: '3時間',
      price: '$$',
      priceLabel: '$$',
      description: 'オアハカで必見の丘の上の考古遺跡を紹介する新しい文化カード。サポテカの広場、墓、神殿、石彫、小さな博物館、中央渓谷の大パノラマを楽しめます。',
      bestFor: 'サポテカ考古学、渓谷の眺望、ガイド解説、写真、最初の文化散策',
      highlights: '丘の遺跡、大広場、石彫、墓、博物館、中央渓谷の景色',
      localTip: '早めに訪れ、可能なら入口で公認ガイドを頼みましょう。大広場を歩く前に博物館を見ると歴史が理解しやすくなります。',
      safetyTip: '日中に訪れ、水と日よけを持参し、表示された道を外れず、不規則な石段に注意してください。帰りは信頼できるタクシーやツアーが安心です。',
      bestTime: '朝。涼しく、眺めがよく、人も少なく、石の遺構にきれいな光が入ります',
      openingHours: '営業時間やチケット規則は変わることがあります。出発前にGoogle Mapsで当日の情報を確認してください',
      nearby: 'Atzompa、San Bartolo Coyotepec、Cuilápam de Guerrero、オアハカ中心部、Museo de las Culturas de Oaxaca',
      bring: '帽子、日焼け止め、水、滑りにくい靴、入場料やガイド用の小額現金、充電済みの携帯電話',
      accessibility: '日差し、砂利、階段、不規則な石道、長い徒歩移動があります。必要に応じてアクセス可能なルートを事前に確認してください。',
      booking: '自由見学にアプリ予約は不要です。繁忙期や連休はガイド、運転手、ツアーの事前予約がおすすめです。'
    },
    zh: {
      ...monteAlbanEn,
      name: '蒙特阿尔班考古遗址',
      category: '文化',
      area: 'Santa Cruz Xoxocotlán',
      address: 'Zona Arqueológica de Monte Albán, Santa Cruz Xoxocotlán, Oaxaca, Mexico',
      duration: '3小时',
      price: '$$',
      priceLabel: '$$',
      description: '这是瓦哈卡必看的山顶考古遗址全新文化卡片，包含萨波特克广场、墓葬、神庙、石刻、小型博物馆以及中央山谷全景。',
      bestFor: '萨波特克考古、山谷全景、导览历史、摄影、瓦哈卡第一天文化行程',
      highlights: '山顶遗址、大广场、石刻、墓葬、博物馆、中央山谷景观',
      localTip: '建议早点去，如入口有认证导游可考虑聘请；先看博物馆再走大广场，更容易理解萨波特克历史。',
      safetyTip: '白天参观，带水和防晒，留在标记路线内，注意不平整石阶，并使用正规旅行团、可信出租车或预订司机返回。',
      bestTime: '上午，天气较凉、视野更清晰、人更少，石台上的光线也更适合拍照',
      openingHours: '开放时间和门票规则可能变化；离开瓦哈卡市前请在 Google Maps 确认当天信息',
      nearby: 'Atzompa、San Bartolo Coyotepec、Cuilápam de Guerrero、瓦哈卡市中心、Museo de las Culturas de Oaxaca',
      bring: '帽子、防晒霜、水、防滑舒适鞋、小额现金和充好电的手机',
      accessibility: '现场日晒、碎石、台阶、不平石路和长距离步行较多；如有无障碍需求请提前确认路线。',
      booking: '自由参观无需应用预订；旺季和节假日周末建议提前预订导游、司机或旅行团。'
    }
  }
};

const recommendationPrefixes = {
  es: { description: 'Recomendación local', bestFor: 'Ideal para', highlights: 'Destacado', localTip: 'Consejo local', safetyTip: 'Consejo de seguridad', bestTime: 'Mejor momento', nearby: 'Cerca de', bring: 'Lleva', accessibility: 'Accesibilidad', booking: 'Reserva', openingHours: 'Horario' },
  fr: { description: 'Recommandation locale', bestFor: 'Idéal pour', highlights: 'À retenir', localTip: 'Conseil local', safetyTip: 'Conseil sécurité', bestTime: 'Meilleur moment', nearby: 'À proximité', bring: 'À apporter', accessibility: 'Accessibilité', booking: 'Réservation', openingHours: 'Horaires' },
  de: { description: 'Lokale Empfehlung', bestFor: 'Gut für', highlights: 'Highlight', localTip: 'Lokaler Tipp', safetyTip: 'Sicherheitstipp', bestTime: 'Beste Zeit', nearby: 'In der Nähe', bring: 'Mitbringen', accessibility: 'Barrierefreiheit', booking: 'Buchung', openingHours: 'Öffnungszeiten' },
  it: { description: 'Consiglio locale', bestFor: 'Ideale per', highlights: 'In evidenza', localTip: 'Consiglio locale', safetyTip: 'Consiglio sicurezza', bestTime: 'Momento migliore', nearby: 'Vicino a', bring: 'Porta', accessibility: 'Accessibilità', booking: 'Prenotazione', openingHours: 'Orari' },
  pt: { description: 'Recomendação local', bestFor: 'Ideal para', highlights: 'Destaque', localTip: 'Dica local', safetyTip: 'Dica de segurança', bestTime: 'Melhor horário', nearby: 'Perto de', bring: 'Leve', accessibility: 'Acessibilidade', booking: 'Reserva', openingHours: 'Horário' },
  ja: { description: '地元のおすすめ', bestFor: 'おすすめ', highlights: '注目ポイント', localTip: '地元のコツ', safetyTip: '安全のコツ', bestTime: 'おすすめ時間', nearby: '周辺', bring: '持ち物', accessibility: 'アクセシビリティ', booking: '予約', openingHours: '営業時間' },
  zh: { description: '本地推荐', bestFor: '适合', highlights: '亮点', localTip: '当地建议', safetyTip: '安全建议', bestTime: '最佳时间', nearby: '附近', bring: '携带', accessibility: '无障碍', booking: '预订', openingHours: '营业时间' }
};

export const stableKey = (place, field) => place?.translationKeys?.[field] || `place.${place.id}.${field}`;

export const valueForField = (place, field, lang = 'en') => {
  if (!place) return '';
  const localizedValue = place.localized?.[lang]?.[field];
  if (localizedValue !== undefined && localizedValue !== null && String(localizedValue).trim()) return localizedValue;
  const override = placeFieldOverrides[place.id]?.[lang]?.[field] ?? placeFieldOverrides[place.id]?.en?.[field];
  if (override !== undefined && override !== null && String(override).trim()) return override;
  const defaults = lang === 'en' ? defaultFieldFallbacks : (localizedDefaultFieldFallbacks[lang] || defaultFieldFallbacks);
  if (field === 'address') return place.address || `${place.area || ''}, Oaxaca, México`;
  if (field === 'priceLabel') return place.priceLabel || place.price || '';
  if (field === 'price') return place.priceLabel || place.price || '';
  if (field === 'description') return place.description || place.bestFor || '';
  if (field === 'highlights') return place.highlights || place.bestFor || '';
  if (field === 'bestFor') return place.bestFor || place.highlights || '';
  if (field === 'openingHours') return place.openingHours || place.bestTime || '';
  if (field === 'bestTime') return place.bestTime || place.openingHours || '';
  if (field === 'nearby') return place.nearby || place.area || '';
  return place[field] || defaults[field] || '';
};

const localizeCategory = (value, lang) => (i18n[lang] && i18n[lang][value]) || value;

const localizeFieldValue = (place, field, value, lang) => {
  if (lang === 'en' || !value) return value;
  if (placeFieldOverrides[place.id]?.[lang]?.[field]) return value;
  if (field === 'category') return localizeCategory(value, lang);
  if (field === 'name' || field === 'area' || field === 'address') return value;
  const prefixes = recommendationPrefixes[lang] || recommendationPrefixes.es;
  if (field === 'duration' || field === 'price' || field === 'priceLabel') return value;
  const prefix = prefixes[field];
  return prefix ? `${prefix}: ${value}` : value;
};

export function buildPlaceLocaleEntries(lang = 'en') {
  return places.reduce((entries, place) => {
    if (!place?.id) return entries;
    placeCardLocaleFields.forEach(field => {
      const value = valueForField(place, field, lang);
      if (value !== undefined && value !== null && String(value).trim()) entries[stableKey(place, field)] = String(localizeFieldValue(place, field, value, lang));
    });
    return entries;
  }, {});
}

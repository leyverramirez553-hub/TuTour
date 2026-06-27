import React from 'react';
import {MapPin, Search, ShieldCheck, Sparkles} from 'lucide-react';
import { html } from '../jsx.js';
import { gmaps, gphotos, placeCategories, places } from '../data/places.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { useLanguage } from '../i18n.js';
import { CategoryFilter } from '../components/CategoryFilter.js';
import { PlaceCard } from '../components/PlaceCard.js';

export const localRecommendations = { en: 'Local Favorites', es: 'Favoritos locales', fr: 'Favoris locaux', de: 'Lokale Favoriten', it: 'Preferiti locali', pt: 'Favoritos locais', ja: '地元の人気スポット', zh: '本地热门推荐' };
export const removedPlaceCardIds = ['puerto-escondido', 'huatulco', 'el-tendajon', 'el-tendajon-diego', 'el-hijuelo-mezcaleria', 'mercado-20-noviembre-comedores', 'mercado-20-noviembre-pasillo-humo', 'alebrijes-oaxaca-magico', 'alebrijes-oaxaca-magicos', 'yagul', 'yacula', 'yagul-culture-card', 'basilica-soledad-culture-card', 'basilica-de-nuestra-senora-de-la-soledad', 'basilica-nuestra-senora-soledad', 'museo-filatelia-oaxaca', 'museo-de-filatelia-de-oaxaca', 'museo-filatelia', 'mufi', 'levadura-de-olla', 'extra-google-levadura-de-olla', 'mercado-municipal-martin-gonzalez', 'mercado-de-tlacolula-market-card', 'mitla'];
export const placesDesignImage = '/api/apps/romcWH54d4SR/assets/20220606_113625.jpg';
export const mercadoDeTlacolulaImage = '/api/apps/romcWH54d4SR/assets/visual-editor/MercadoSánchezPascuas.jpg';
export const andadorTuristicoAlcalaImage = '/api/apps/romcWH54d4SR/assets/visual-editor/AndadorTurístico.jpg';
export const yagulImage = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHCXFsbUv0nFT2eynjRSb1mGAeofNWlRjakUaEb_OjCXeTgpZDCPUd00QMFVoTe5UUtMtPybTjbIjW_94Y2E-a4z8YpM6Ebsvx26epXU6h3EeXYA3mARQRAYUh8moRmXOrtHDWUFlrMW-PI=w408-h306-k-no';
export const hierveElAguaImage = '/api/apps/romcWH54d4SR/assets/visual-editor/HierveelAgua.jpg';
export const arbolDelTuleImage = '/api/apps/romcWH54d4SR/assets/visual-editor/ÁrboldelTule.jpg';
export const parqueElLlanoImage = '/api/apps/romcWH54d4SR/assets/visual-editor/ElLlano.jpg';
export const cerroFortinImage = '/api/apps/romcWH54d4SR/assets/visual-editor/ElMiradordelCerrodelFortin.jpg';
export const temploSantoDomingoImage = '/api/apps/romcWH54d4SR/assets/visual-editor/TemplodeSantoDomingodeGuzmán.jpg';
export const mufiImage = '/api/apps/romcWH54d4SR/assets/visual-editor/MuseoDeLaFilateliaMUFI.jpg';
export const sanFelipeFoothillsImage = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEF-NL-8ImQGiuOpLqHNdEewBSXP0G6DcEmrWRB5WFte1hxRnRa31UuFblbuJq4cUPiDmotimqGgrj-ud5tn8qjVnzrjO-ydE2Sr5B-WALOtkuSXMB9OupNXl3zXVLcwnrzAT4=w408-h544-k-no';
export const basilicaSoledadImage = '/api/apps/romcWH54d4SR/assets/visual-editor/BasílicadeNuestraSeñoradelaSoledad.jpg';

export const cultureCategories = { en: 'Culture', es: 'Cultura', fr: 'Culture', de: 'Kultur', it: 'Cultura', pt: 'Cultura', ja: '文化', zh: '文化' };
export const natureCategories = { en: 'Nature', es: 'Naturaleza', fr: 'Nature', de: 'Natur', it: 'Natura', pt: 'Natureza', ja: '自然', zh: '自然' };
export const marketCategories = { en: 'Markets', es: 'Mercados', fr: 'Marchés', de: 'Märkte', it: 'Mercati', pt: 'Mercados', ja: '市場', zh: '市场' };
export const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

export const localizedByLanguage = (english, localized = {}, categories = cultureCategories) => Object.fromEntries(languages.map(lang => [lang, {
  ...english,
  ...(localized[lang] || {}),
  category: localized[lang]?.category || categories[lang] || english.category
}]));

export const cardOverride = (localizedData, extra) => ({
  category: extra?.category || 'culture',
  name: localizedData.en.name,
  area: localizedData.en.area,
  address: localizedData.en.address,
  rating: extra?.rating || 4.8,
  duration: localizedData.en.duration,
  emoji: extra?.emoji || '📍',
  accent: extra?.accent || '24 75% 44%',
  price: localizedData.en.price,
  priceLabel: localizedData.en.priceLabel,
  neighborhood: extra?.neighborhood || localizedData.en.area,
  bestFor: localizedData.en.bestFor,
  highlights: localizedData.en.highlights,
  localTip: localizedData.en.localTip,
  safetyTip: localizedData.en.safetyTip,
  description: localizedData.en.description,
  image: extra?.image,
  maps: extra?.maps,
  photos: extra?.photos,
  lat: extra?.lat,
  lng: extra?.lng,
  bestTime: localizedData.en.bestTime,
  openingHours: localizedData.en.openingHours,
  nearby: localizedData.en.nearby,
  bring: localizedData.en.bring,
  accessibility: localizedData.en.accessibility,
  booking: localizedData.en.booking,
  localized: localizedData,
  ...extra
});

const freePrice = { en: 'Free', es: 'Gratis', fr: 'Gratuit', de: 'Kostenlos', it: 'Gratuito', pt: 'Gratuito', ja: '無料', zh: '免费' };
const simpleLocalizedCopy = (english, localized = {}, categories = cultureCategories) => localizedByLanguage(english, Object.fromEntries(languages.map(lang => [lang, {
  ...(localized[lang] || {}),
  price: localized[lang]?.price || (english.price === 'Free' ? freePrice[lang] : english.price),
  priceLabel: localized[lang]?.priceLabel || (english.priceLabel === 'Free' ? freePrice[lang] : english.priceLabel)
}])), categories);

export const andadorLocalized = simpleLocalizedCopy({
  name: 'Andador Turístico Macedonio Alcalá', category: 'Culture', area: 'Centro Histórico', address: 'Andador Turístico Macedonio Alcalá, Centro Histórico, 68000 Oaxaca de Juárez, Oax., México', price: 'Free', priceLabel: 'Free', duration: '45 min',
  description: 'Oaxaca’s signature pedestrian corridor, where historic stone facades, galleries, cafés, street performers, and everyday city life connect Santo Domingo with the Zócalo.',
  bestFor: 'pedestrian culture walk, galleries, street musicians, colonial architecture, local cafés, evening paseo', highlights: 'car-free cultural corridor, galleries, cafés, historic facades, artisan shops, Santo Domingo to Zócalo walk',
  localTip: 'Walk it slowly from Santo Domingo toward the Zócalo, ducking into galleries and courtyards along the way. Late afternoon has the best light and local paseo energy.', safetyTip: 'It is central and walkable, but can get crowded. Keep phones and wallets secure, use well-lit side streets after dark, and avoid blocking foot traffic for photos.',
  bestTime: 'Late afternoon into early evening', openingHours: 'Open-air pedestrian street; individual shops vary', nearby: 'Templo de Santo Domingo, Museo de las Culturas, Museo de los Pintores Oaxaqueños, Teatro Macedonio Alcalá, Zócalo de Oaxaca', bring: 'Comfortable shoes, water, a charged phone, small cash, and a light layer for evening', accessibility: 'Mostly pedestrian, but expect uneven historic paving, curbs, occasional crowds, and narrow shop entrances.', booking: 'No booking needed for the walk; reserve ahead only for specific events, restaurants, concerts, or guided architecture walks.'
}, {
  es: { category: 'Cultura', description: 'El corredor peatonal más representativo de Oaxaca, donde fachadas históricas, galerías, cafés, artistas callejeros y vida cotidiana conectan Santo Domingo con el Zócalo.' },
  fr: { description: 'La promenade piétonne emblématique d’Oaxaca, entre façades historiques, galeries, cafés, artistes de rue et vie quotidienne.' },
  de: { category: 'Kultur', duration: '45 Min.', description: 'Oaxacas wichtigste Fußgängerachse mit historischen Fassaden, Galerien, Cafés, Straßenmusik und Alltagsleben.' },
  it: { category: 'Cultura', description: 'Il corridoio pedonale simbolo di Oaxaca, tra facciate storiche, gallerie, caffè, artisti di strada e vita quotidiana.' },
  pt: { category: 'Cultura', description: 'O corredor de pedestres mais emblemático de Oaxaca, com fachadas históricas, galerias, cafés, artistas de rua e vida local.' },
  ja: { category: '文化', name: 'Andador Turístico Macedonio Alcalá（マセドニオ・アルカラ歩行者通り）', area: 'セントロ・イストリコ', duration: '45分', description: 'サント・ドミンゴとソカロを結ぶ、オアハカを代表する歩行者天国。歴史的な建物、ギャラリー、カフェ、路上演奏、街の日常を楽しめます。' },
  zh: { category: '文化', name: 'Andador Turístico Macedonio Alcalá（马塞多尼奥·阿尔卡拉步行街）', area: '历史中心', duration: '45分钟', description: '瓦哈卡标志性的步行文化走廊，历史石质外立面、画廊、咖啡馆、街头艺人和日常城市生活连接圣多明各与索卡洛广场。' }
});

export const yagulLocalized = localizedByLanguage({
  name: 'Yagul', category: 'Culture', area: 'Tlacolula Valley', address: 'Zona Arqueológica de Yagul, Tlacolula de Matamoros, Oaxaca, Mexico', price: '$$', priceLabel: '$$', duration: '2 hr',
  description: 'A dramatic Zapotec archaeological site above the Tlacolula Valley, known for fortress-like hilltop views, a ball court, palace patios, tombs, and a quieter atmosphere than the region’s busiest ruins.',
  bestFor: 'Zapotec archaeology, valley viewpoints, ancient architecture, photography, quieter culture day trips', highlights: 'hilltop fortress, large ball court, palace courtyards, tombs, panoramic Tlacolula Valley views',
  localTip: 'Go early and take your time climbing to the viewpoint above the ruins.', safetyTip: 'The site is exposed, hot, and uneven. Bring water, sun protection, shoes with grip, and use registered transport or a trusted driver.',
  bestTime: 'Morning for cooler temperatures, softer light, and quieter paths', openingHours: 'Confirm current hours on Google Maps before leaving Oaxaca City', nearby: 'Mitla, Tlacolula de Matamoros, Teotitlán del Valle, Árbol del Tule, Santiago Matatlán', bring: 'Water, hat, sunscreen, grippy walking shoes, camera, small cash for entrance, and a confirmed return ride', accessibility: 'Expect gravel, stone steps, slopes, uneven paths, exposed sun, and limited shade.', booking: 'No app booking needed; buy entry onsite when open and consider a local guide or private driver for context.'
});

export const arbolDelTuleLocalized = simpleLocalizedCopy({
  name: 'Árbol del Tule', category: 'Nature', area: 'Santa María del Tule', address: 'Santa María del Tule, Oaxaca, México', price: '$', priceLabel: '$', duration: '45 min',
  description: 'A magnificent living landmark in Santa María del Tule: an ancient Montezuma cypress with an enormous sculptural trunk, shaded church courtyard, and a relaxed village-plaza atmosphere just east of Oaxaca City.',
  bestFor: 'ancient trees, nature photography, family-friendly stops, eastern-valley day trips, quiet village plazas', highlights: 'massive Montezuma cypress, shaded church courtyard, village plaza, local ice cream stands, easy eastern-valley route stop',
  localTip: 'Go in the morning or late afternoon for softer light, then walk the plaza for nieves, snacks, or coffee.', safetyTip: 'The plaza is calm and family-friendly, but watch traffic near the road, keep phones secure while taking photos, use marked crossings, and arrange reliable transport.',
  bestTime: 'Morning for cooler air and fewer groups, or late afternoon for soft light', openingHours: 'Outdoor plaza access is generally available daily; confirm courtyard access and local events on Google Maps before going', nearby: 'Teotitlán del Valle, Mitla, Tlacolula de Matamoros, Santiago Matatlán, Hierve el Agua', bring: 'Water, sun hat, camera, small cash, and comfortable shoes', accessibility: 'The plaza is flat, though curbs, uneven paving, crowds, and narrow sidewalks can affect access.', booking: 'No advance booking needed; visit independently or include it with a guided eastern-valley day tour.'
}, {
  es: { category: 'Naturaleza', description: 'Un magnífico monumento vivo en Santa María del Tule: un antiguo ahuehuete con un tronco monumental y ambiente relajado de plaza de pueblo.' },
  fr: { category: 'Nature', description: 'Un magnifique monument vivant à Santa María del Tule : un cyprès de Montezuma millénaire au tronc gigantesque dans une place de village paisible.' },
  de: { category: 'Natur', duration: '45 Min.', description: 'Ein prächtiges lebendes Wahrzeichen in Santa María del Tule: eine uralte Montezuma-Zypresse mit gewaltigem Stamm und entspannter Dorfplatz-Atmosphäre.' },
  it: { category: 'Natura', description: 'Un magnifico monumento vivente a Santa María del Tule: un antichissimo cipresso di Montezuma dal tronco monumentale in una tranquilla piazza di paese.' },
  pt: { category: 'Natureza', description: 'Um magnífico monumento vivo em Santa María del Tule: um antigo cipreste de Montezuma com tronco colossal e clima relaxado de praça de vilarejo.' },
  ja: { category: '自然', name: 'トゥーレの木', area: 'サンタ・マリア・デル・トゥーレ', duration: '45分', description: 'サンタ・マリア・デル・トゥーレにある見事な生きるランドマーク。巨大な幹を持つ古代の木と村の広場の雰囲気が魅力です。' },
  zh: { category: '自然', name: '图莱之树', area: '圣玛丽亚德尔图莱', duration: '45分钟', description: '圣玛丽亚德尔图莱一处宏伟的活地标：古老落羽杉拥有雕塑般巨大的树干，旁边是宁静的村庄广场。' }
}, natureCategories);

export const hierveLocalized = simpleLocalizedCopy({
  name: 'Cascadas Petrificadas de Hierve el Agua', category: 'Nature', area: 'San Lorenzo Albarradas', address: 'Cascadas Petrificadas de Hierve el Agua, San Lorenzo Albarradas, Oaxaca, México', price: '$$', priceLabel: '$$', duration: '3 hr',
  description: 'A brand-new nature recommendation for the mineral terraces of Hierve el Agua: cliff-edge pools, petrified waterfall formations, warm valley views, and a slow scenic stop that rewards early arrivals.',
  bestFor: 'mineral pools, petrified waterfall formations, mountain views, photography, nature day trips from Oaxaca City', highlights: 'turquoise mineral pools, calcified cliff formations, Sierra Norte panoramas, short walking paths, community-run viewpoint areas',
  localTip: 'Leave Oaxaca City early, pause for photos before swimming, and ask your driver to build in time for Mitla or a small mezcal stop on the way back.', safetyTip: 'Rock edges, steps, and pool surfaces can be slick. Wear grippy sandals or walking shoes, keep children away from cliff edges, hydrate often, and carry cash for community fees and bathrooms.',
  bestTime: 'Arrive between 8 AM and 10 AM for calmer pools, cooler walking conditions, and clean photo angles before larger tours arrive', openingHours: 'Community access hours can change; confirm same-day opening, road conditions, and fees on Google Maps before departing', nearby: 'San Lorenzo Albarradas, San Pablo Villa de Mitla, Santiago Matatlán, Teotitlán del Valle, Tlacolula de Matamoros', bring: 'Swimwear, towel, change of clothes, grippy shoes, biodegradable sunscreen, sun hat, water, snacks, camera, and small cash', accessibility: 'Expect uneven stone, gravel, steps, exposed sun, and steep approaches. This stop is difficult for wheelchairs or travelers with limited mobility without strong assistance.', booking: 'Book a reputable day tour or private driver if you do not have a car; independent visitors should confirm the route and community fee stops before leaving.'
}, {
  es: { category: 'Naturaleza', duration: '3 h', description: 'Una recomendación de naturaleza renovada para las terrazas minerales de Hierve el Agua: pozas al borde del acantilado, formaciones petrificadas y vistas cálidas del valle.' },
  fr: { category: 'Nature', duration: '3 h', description: 'Une recommandation nature pour les terrasses minérales de Hierve el Agua: bassins au bord des falaises, formations pétrifiées et vues sur la vallée.' },
  de: { category: 'Natur', duration: '3 Std.', description: 'Eine Naturkarte für die Mineralterrassen von Hierve el Agua: Becken am Klippenrand, versteinerte Wasserfallformen und warme Talblicke.' },
  it: { category: 'Natura', duration: '3 h', description: 'Una scheda natura per le terrazze minerali di Hierve el Agua: piscine sul bordo della scogliera, formazioni pietrificate e viste sulla valle.' },
  pt: { category: 'Natureza', duration: '3 h', description: 'Um cartão de natureza para os terraços minerais de Hierve el Agua: piscinas na beira do penhasco, formações petrificadas e vistas do vale.' },
  ja: { category: '自然', name: 'イエルベ・エル・アグアの石化滝', area: 'サン・ロレンソ・アルバラーダス', duration: '3時間', description: 'イエルベ・エル・アグアの鉱物テラスを紹介する自然カード。崖沿いの天然プール、石化した滝のような地形、谷の眺めが魅力です。' },
  zh: { category: '自然', name: 'Hierve el Agua 石化瀑布', area: '圣洛伦索阿尔巴拉达斯', duration: '3小时', description: '为 Hierve el Agua 矿物台地打造的自然卡片：悬崖边天然矿物池、石化瀑布地貌和开阔山谷景色。' }
}, natureCategories);

export const parqueElLlanoLocalized = simpleLocalizedCopy({
  name: 'Parque El Llano', category: 'Nature', area: 'El Llano, Centro Norte', address: 'Parque El Llano, Av. Juárez, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Free', priceLabel: 'Free', duration: '45 min',
  description: 'A refreshed nature card for Oaxaca’s beloved city park: wide shaded paths, mature trees, fountains, snack vendors, benches, and everyday local life just north of the historic core.',
  bestFor: 'shaded city strolls, people-watching, family time, morning coffee walks, relaxed local park life', highlights: 'tree-lined paths, fountains, benches, weekend vendors, easy Centro Norte green space',
  localTip: 'Come in the morning for a calm walk with coffee nearby, or return around sunset when families, joggers, and snack vendors make the park feel especially local.', safetyTip: 'It is a comfortable central park, but keep valuables zipped on benches, stay on busier lit paths after dark, and use a taxi or ride app if returning late to a quiet street.',
  bestTime: 'Morning for shade and quieter paths, or early evening for local life and cooler air', openingHours: 'Open-air public park; confirm current conditions and nearby business hours on Google Maps before going', nearby: 'Barrio de Jalatlaco, Santo Domingo, Andador Alcalá, El Tendajón Oaxaca', bring: 'Comfortable shoes, water, a light layer for evening, small cash for snacks, and a secure crossbody bag', accessibility: 'Main paths are generally flat, but expect uneven paving, curbs, tree roots, and busy crossings around the park edges.', booking: 'No booking needed; visit independently and use the Google Maps link for directions or recent photos.'
}, {
  es: { category: 'Naturaleza', price: 'Gratis', priceLabel: 'Gratis', description: 'Una nueva tarjeta de naturaleza para el parque urbano más querido de Oaxaca: senderos con sombra, árboles maduros, fuentes, antojitos, bancas y vida local.' },
  fr: { category: 'Nature', description: 'Une carte nature pour ce parc adoré d’Oaxaca: allées ombragées, grands arbres, fontaines, vendeurs de snacks, bancs et vie locale.' },
  de: { category: 'Natur', duration: '45 Min.', description: 'Eine Naturkarte für Oaxacas beliebten Stadtpark: schattige Wege, alte Bäume, Brunnen, Snackstände, Bänke und lokales Alltagsleben.' },
  it: { category: 'Natura', description: 'Una scheda natura per l’amato parco cittadino di Oaxaca: viali ombreggiati, alberi maturi, fontane, venditori, panchine e vita locale.' },
  pt: { category: 'Natureza', description: 'Um cartão de natureza para o querido parque urbano de Oaxaca: caminhos sombreados, árvores maduras, fontes, vendedores, bancos e vida local.' },
  ja: { category: '自然', name: 'パルケ・エル・リャノ', area: 'エル・リャノ、セントロ北部', duration: '45分', description: 'オアハカで親しまれている市街地公園の自然カード。木陰の小道、大きな木々、噴水、軽食屋台、地元の日常を感じられます。' },
  zh: { category: '自然', name: 'Parque El Llano 埃尔亚诺公园', area: 'El Llano，历史中心北部', duration: '45分钟', description: '为瓦哈卡深受喜爱的城市公园打造的自然卡片：阴凉步道、成熟树木、喷泉、小吃摊、长椅和本地生活。' }
}, natureCategories);

export const cerroFortinLocalized = simpleLocalizedCopy({
  name: 'Mirador del Cerro del Fortín', category: 'Nature', area: 'Cerro del Fortín', address: 'Cerro del Fortín, Oaxaca de Juárez, Oaxaca, México', price: 'Free', priceLabel: 'Free', duration: '60 min',
  description: 'A brand-new nature stop above Oaxaca City with breezy hillside paths, wide valley views, native vegetation, and a golden-hour lookout that feels close to Centro but calmer than the main plazas.',
  bestFor: 'city viewpoints, fresh air, hillside walks, sunset photos, low-key nature breaks near Centro', highlights: 'panoramic Oaxaca views, hillside greenery, golden-hour photos, Guelaguetza-area lookout, quick nature escape',
  localTip: 'Go in the morning or before sunset, take your time at the viewpoint, and combine it with nearby Centro cafés or a daylight taxi loop rather than rushing on foot in the heat.', safetyTip: 'Visit in daylight or early evening, stay on visible paths, bring water, avoid isolated trails after dark, and use a trusted taxi or ride app for return if the streets feel quiet.',
  bestTime: 'Morning for cooler air or late afternoon for warm light over the valley', openingHours: 'Open-air viewpoint area; confirm current access, events, and road conditions on Google Maps before going', nearby: 'Auditorio Guelaguetza, Centro Histórico, Santo Domingo, Parque El Llano, Barrio de Xochimilco', bring: 'Water, sun hat, comfortable shoes, a charged phone, light layer for breeze, and small cash for transport', accessibility: 'Expect slopes, steps, uneven pavement, and exposed sun; travelers with limited mobility should use vehicle access as close as possible.', booking: 'No booking needed; use the Google Maps link for current directions, photos, and recent visitor updates.'
}, {
  es: { category: 'Naturaleza', name: 'Mirador del Cerro del Fortín', area: 'Cerro del Fortín', duration: '60 min', description: 'Una parada de naturaleza nueva sobre la ciudad de Oaxaca, con senderos de ladera, vistas amplias del valle, vegetación nativa y un mirador ideal al atardecer.' },
  fr: { category: 'Nature', name: 'Belvédère du Cerro del Fortín', area: 'Cerro del Fortín', duration: '60 min', description: 'Une nouvelle halte nature au-dessus d’Oaxaca, avec sentiers de colline, vues sur la vallée, végétation locale et belvédère idéal en fin de journée.' },
  de: { category: 'Natur', name: 'Aussichtspunkt Cerro del Fortín', area: 'Cerro del Fortín', duration: '60 Min.', description: 'Ein neuer Naturstopp oberhalb von Oaxaca-Stadt mit luftigen Hügelwegen, weitem Talblick, lokaler Vegetation und schönem Licht am späten Nachmittag.' },
  it: { category: 'Natura', name: 'Mirador del Cerro del Fortín', area: 'Cerro del Fortín', duration: '60 min', description: 'Una nuova tappa natura sopra Oaxaca, con sentieri collinari ventilati, ampie viste sulla valle, vegetazione locale e un belvedere perfetto al tramonto.' },
  pt: { category: 'Natureza', name: 'Mirante do Cerro del Fortín', area: 'Cerro del Fortín', duration: '60 min', description: 'Uma nova parada de natureza acima da cidade de Oaxaca, com caminhos na encosta, vistas amplas do vale, vegetação local e um mirante perfeito no fim da tarde.' },
  ja: { category: '自然', name: 'セロ・デル・フォルティン展望台', area: 'セロ・デル・フォルティン', duration: '60分', description: 'オアハカ市街を見下ろす新しい自然スポット。風の通る丘の小道、谷の広い眺め、在来植物、夕方の光が美しい展望ポイントが魅力です。' },
  zh: { category: '自然', name: 'Cerro del Fortín 山顶观景台', area: 'Cerro del Fortín', duration: '60分钟', description: '位于瓦哈卡市上方的全新自然站点，拥有通风的山坡步道、开阔山谷景观、本土植被，以及适合黄昏拍照的观景点。' }
}, natureCategories);

export const sanFelipeFoothillsLocalized = simpleLocalizedCopy({
  name: 'San Felipe del Agua Foothill Walk', category: 'Nature', area: 'San Felipe del Agua', address: 'San Felipe del Agua, Oaxaca de Juárez, Oax., México', price: 'Free', priceLabel: 'Free', duration: '75 min',
  description: 'A brand-new nature card for a calm north-side Oaxaca walk: hillside air, leafy residential lanes, mountain views, birdsong, and a restorative green break above the city bustle.',
  bestFor: 'quiet nature walk, foothill views, fresh air, neighborhood greenery, low-key morning exercise', highlights: 'Sierra Norte foothills, leafy streets, valley views, birdsong, calmer north-side Oaxaca atmosphere',
  localTip: 'Go early, keep the route simple around the church and lower foothill lanes, and pair the walk with coffee or breakfast nearby instead of pushing onto isolated trails.', safetyTip: 'Visit in daylight, stay on visible streets or busy paths, bring water, avoid isolated hillside sections after dark, and use a trusted taxi or ride app for the return.',
  bestTime: 'Morning for cooler air, softer light, and calmer neighborhood streets', openingHours: 'Open-air neighborhood walk; confirm current routes, road access, and recent visitor notes on Google Maps before going', nearby: 'San Felipe del Agua, Colonia Reforma, Parque El Llano, Cerro del Fortín, Centro Histórico', bring: 'Water, sun hat, comfortable walking shoes, a charged phone, light layer, and small cash for a café or taxi', accessibility: 'Expect slopes, uneven sidewalks, narrow streets, occasional traffic, and limited shade in some sections; choose lower streets if mobility is limited.', booking: 'No booking needed; use the Google Maps link for directions and consider a local walking guide if you want to explore beyond the neighborhood streets.'
}, {
  es: { category: 'Naturaleza', name: 'Caminata de Laderas de San Felipe del Agua', area: 'San Felipe del Agua', price: 'Gratis', priceLabel: 'Gratis', duration: '75 min', description: 'Una nueva tarjeta de naturaleza para una caminata tranquila al norte de Oaxaca: aire de ladera, calles arboladas, vistas de montaña, canto de aves y una pausa verde sobre la ciudad.', bestFor: 'caminata tranquila, vistas de ladera, aire fresco, vegetación de barrio, ejercicio matutino', highlights: 'laderas de la Sierra Norte, calles arboladas, vistas del valle, canto de aves, ambiente tranquilo', localTip: 'Ve temprano, mantén una ruta sencilla por la iglesia y las calles bajas, y combínala con café o desayuno cerca en lugar de internarte en senderos aislados.', safetyTip: 'Visita con luz de día, permanece en calles visibles o caminos concurridos, lleva agua, evita zonas aisladas al anochecer y usa taxi confiable o app para regresar.' },
  fr: { category: 'Nature', name: 'Balade des contreforts de San Felipe del Agua', duration: '75 min', description: 'Une nouvelle carte nature pour une marche calme au nord d’Oaxaca, avec air de colline, rues arborées, vues de montagne, oiseaux et pause verte au-dessus de la ville.' },
  de: { category: 'Natur', name: 'San-Felipe-del-Agua-Hügelspaziergang', duration: '75 Min.', description: 'Eine neue Naturkarte für einen ruhigen Spaziergang im Norden Oaxacas mit Hügelluft, grünen Wohnstraßen, Bergblick, Vogelstimmen und einer entspannten Pause über der Stadt.' },
  it: { category: 'Natura', name: 'Passeggiata sulle colline di San Felipe del Agua', duration: '75 min', description: 'Una nuova scheda natura per una camminata tranquilla a nord di Oaxaca, tra aria di collina, strade alberate, viste sui monti, uccelli e una pausa verde sopra la città.' },
  pt: { category: 'Natureza', name: 'Caminhada nas Encostas de San Felipe del Agua', duration: '75 min', description: 'Um novo cartão de natureza para uma caminhada tranquila ao norte de Oaxaca, com ar de encosta, ruas arborizadas, vistas das montanhas, canto de aves e pausa verde acima da cidade.' },
  ja: { category: '自然', name: 'サン・フェリペ・デル・アグア丘陵散歩', area: 'サン・フェリペ・デル・アグア', duration: '75分', price: '無料', priceLabel: '無料', description: 'オアハカ北側の静かな自然散歩カード。丘陵の空気、木陰の住宅街、山の眺め、鳥の声、街の喧騒から離れた緑の休憩を楽しめます。' },
  zh: { category: '自然', name: 'San Felipe del Agua 山麓步道', area: 'San Felipe del Agua', duration: '75分钟', price: '免费', priceLabel: '免费', description: '一张全新的自然地点卡片：在瓦哈卡北侧安静散步，感受山麓空气、绿荫街道、山景、鸟鸣，以及远离市中心喧闹的绿色休息。' }
}, natureCategories);

export const temploSantoDomingoLocalized = localizedByLanguage({
  name: 'Templo de Santo Domingo de Guzmán', category: 'Culture', area: 'Centro Histórico', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Free', priceLabel: 'Free', duration: '60 min',
  description: 'A brand-new culture stop at Oaxaca’s landmark Baroque church, with gilded chapels, carved stone details, a grand plaza, and easy links to the surrounding Santo Domingo museums and gardens.',
  bestFor: 'baroque architecture, sacred art, historic photography, Centro walks, evening plaza atmosphere', highlights: 'gold-leaf interior, carved façade, Santo Domingo plaza, colonial architecture, museum-and-garden district',
  localTip: 'Visit respectfully outside service times, then linger on the plaza for photos and pair it with Andador Alcalá, the cultural museum, or nearby cafés.', safetyTip: 'The plaza is central and busy, but keep valuables zipped, watch uneven stone and curbs, and use well-lit streets or registered transport late at night.',
  bestTime: 'Late morning for interior details or golden hour for the façade and plaza', openingHours: 'Church access can change for services and events; confirm same-day details on Google Maps before visiting', nearby: 'Museo de las Culturas de Oaxaca, Jardín Etnobotánico, Andador Alcalá, Museo de Filatelia de Oaxaca, Parque El Llano', bring: 'A charged phone, water, comfortable shoes, modest layers for church entry, and small cash for nearby stops', accessibility: 'Expect historic stone paving, thresholds, crowds, and occasional steps around the church and plaza; confirm step-free access before visiting.', booking: 'No booking is usually needed for a casual visit; reserve ahead only for guided history walks or special cultural programs.'
}, {
  es: {
    name: 'Templo de Santo Domingo de Guzmán', category: 'Cultura', area: 'Centro Histórico', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Gratis', priceLabel: 'Gratis', duration: '60 min',
    description: 'Una parada cultural nueva en el templo barroco más emblemático de Oaxaca, con capillas doradas, detalles de cantera, una plaza monumental y conexiones fáciles con museos y jardines de Santo Domingo.',
    bestFor: 'arquitectura barroca, arte sacro, fotografía histórica, caminatas por el Centro, ambiente de plaza', highlights: 'interior dorado, fachada tallada, plaza de Santo Domingo, arquitectura colonial, zona de museos y jardines',
    localTip: 'Visita con respeto fuera de horarios de misa y quédate un momento en la plaza para fotos antes de seguir al Andador Alcalá, el museo o cafés cercanos.', safetyTip: 'La plaza es céntrica y concurrida, pero lleva valores cerrados, cuida la cantera irregular y usa rutas iluminadas o transporte registrado tarde en la noche.',
    bestTime: 'Final de la mañana para ver detalles interiores o atardecer para la fachada y la plaza', openingHours: 'El acceso al templo puede cambiar por misas y eventos; confirma detalles del día en Google Maps antes de visitar', nearby: 'Museo de las Culturas de Oaxaca, Jardín Etnobotánico, Andador Alcalá, Museo de Filatelia de Oaxaca, Parque El Llano', bring: 'Celular cargado, agua, zapatos cómodos, ropa discreta para entrar al templo y efectivo pequeño para paradas cercanas', accessibility: 'Hay pavimento histórico, umbrales, multitudes y algunos escalones alrededor del templo y la plaza; confirma acceso sin escalones antes de visitar.', booking: 'Normalmente no requiere reserva; reserva solo para recorridos históricos guiados o programas culturales especiales.'
  },
  fr: {
    name: 'Temple de Santo Domingo de Guzmán', category: 'Culture', area: 'Centre historique', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., Mexique', price: 'Gratuit', priceLabel: 'Gratuit', duration: '60 min',
    description: 'Une nouvelle halte culturelle dans l’église baroque emblématique d’Oaxaca, avec chapelles dorées, détails de pierre sculptée, grande place et accès facile aux musées et jardins de Santo Domingo.',
    bestFor: 'architecture baroque, art sacré, photographie historique, promenades dans le Centro, ambiance de place', highlights: 'intérieur doré, façade sculptée, place Santo Domingo, architecture coloniale, secteur musées et jardins',
    localTip: 'Visitez respectueusement hors offices, puis restez sur la place pour les photos avant de rejoindre l’Andador Alcalá, le musée ou les cafés voisins.', safetyTip: 'La place est centrale et fréquentée, mais gardez vos objets de valeur fermés, surveillez les pavés irréguliers et privilégiez les rues éclairées le soir.',
    bestTime: 'Fin de matinée pour les détails intérieurs ou heure dorée pour la façade et la place', openingHours: 'L’accès à l’église peut changer selon les offices et événements ; vérifiez les détails du jour sur Google Maps avant la visite', nearby: 'Museo de las Culturas de Oaxaca, Jardín Etnobotánico, Andador Alcalá, Museo de Filatelia de Oaxaca, Parque El Llano', bring: 'Téléphone chargé, eau, chaussures confortables, tenue respectueuse pour l’église et petites espèces', accessibility: 'Prévoir pavés historiques, seuils, foule et quelques marches autour de l’église et de la place ; confirmez un accès sans marche.', booking: 'Pas de réservation nécessaire en général ; réservez seulement pour visites historiques guidées ou programmes spéciaux.'
  },
  de: {
    name: 'Templo de Santo Domingo de Guzmán', category: 'Kultur', area: 'Historisches Zentrum', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., Mexiko', price: 'Kostenlos', priceLabel: 'Kostenlos', duration: '60 Min.',
    description: 'Ein neuer Kulturstopp an Oaxacas barocker Wahrzeichenkirche mit vergoldeten Kapellen, gemeißelten Steindetails, großer Plaza und kurzen Wegen zu den Museen und Gärten von Santo Domingo.',
    bestFor: 'Barockarchitektur, sakrale Kunst, historische Fotografie, Centro-Spaziergänge, Plaza-Atmosphäre', highlights: 'vergoldeter Innenraum, geschnitzte Fassade, Santo-Domingo-Plaza, Kolonialarchitektur, Museums- und Gartenviertel',
    localTip: 'Besuche die Kirche respektvoll außerhalb der Gottesdienste und bleib danach für Fotos auf der Plaza, bevor du zum Andador Alcalá, Museum oder Café weitergehst.', safetyTip: 'Die Plaza ist zentral und belebt; Wertsachen geschlossen tragen, auf unebene Steine achten und spät abends beleuchtete Wege oder registrierten Transport nutzen.',
    bestTime: 'Später Vormittag für Innenraumdetails oder goldene Stunde für Fassade und Plaza', openingHours: 'Der Zugang zur Kirche kann wegen Gottesdiensten und Veranstaltungen wechseln; Tagesdetails vor dem Besuch auf Google Maps prüfen', nearby: 'Museo de las Culturas de Oaxaca, Jardín Etnobotánico, Andador Alcalá, Museo de Filatelia de Oaxaca, Parque El Llano', bring: 'Geladenes Telefon, Wasser, bequeme Schuhe, respektvolle Kleidung für den Kirchenbesuch und kleines Bargeld', accessibility: 'Historisches Steinpflaster, Schwellen, Menschenmengen und einzelne Stufen sind möglich; stufenfreien Zugang vorher bestätigen.', booking: 'Für spontane Besuche meist keine Buchung nötig; nur für geführte Historienrundgänge oder Sonderprogramme reservieren.'
  },
  it: {
    name: 'Tempio di Santo Domingo de Guzmán', category: 'Cultura', area: 'Centro Storico', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., Messico', price: 'Gratuito', priceLabel: 'Gratuito', duration: '60 min',
    description: 'Una nuova tappa culturale nella chiesa barocca simbolo di Oaxaca, con cappelle dorate, dettagli in pietra scolpita, una grande piazza e collegamenti facili con musei e giardini di Santo Domingo.',
    bestFor: 'architettura barocca, arte sacra, fotografia storica, passeggiate nel Centro, atmosfera di piazza', highlights: 'interno dorato, facciata scolpita, piazza Santo Domingo, architettura coloniale, zona musei e giardini',
    localTip: 'Visita con rispetto fuori dagli orari di messa, poi fermati in piazza per le foto prima di proseguire verso Andador Alcalá, il museo o i caffè vicini.', safetyTip: 'La piazza è centrale e frequentata, ma tieni chiusi gli oggetti di valore, fai attenzione alla pietra irregolare e usa strade illuminate la sera.',
    bestTime: 'Tarda mattina per i dettagli interni o golden hour per facciata e piazza', openingHours: 'L’accesso alla chiesa può cambiare per messe ed eventi; conferma su Google Maps prima della visita', nearby: 'Museo de las Culturas de Oaxaca, Jardín Etnobotánico, Andador Alcalá, Museo de Filatelia de Oaxaca, Parque El Llano', bring: 'Telefono carico, acqua, scarpe comode, abbigliamento rispettoso per entrare in chiesa e contanti piccoli', accessibility: 'Aspettati pavimentazione storica, soglie, folla e qualche gradino intorno alla chiesa e alla piazza; conferma percorsi senza gradini.', booking: 'Di solito non serve prenotare; prenota solo per visite storiche guidate o programmi speciali.'
  },
  pt: {
    name: 'Templo de Santo Domingo de Guzmán', category: 'Cultura', area: 'Centro Histórico', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Gratuito', priceLabel: 'Gratuito', duration: '60 min',
    description: 'Uma nova parada cultural na igreja barroca mais emblemática de Oaxaca, com capelas douradas, detalhes de pedra talhada, uma praça ampla e fácil conexão com museus e jardins de Santo Domingo.',
    bestFor: 'arquitetura barroca, arte sacra, fotografia histórica, caminhadas pelo Centro, clima de praça', highlights: 'interior dourado, fachada talhada, praça de Santo Domingo, arquitetura colonial, área de museus e jardins',
    localTip: 'Visite com respeito fora dos horários de missa e fique alguns minutos na praça para fotos antes de seguir ao Andador Alcalá, museu ou cafés próximos.', safetyTip: 'A praça é central e movimentada, mas mantenha valores fechados, cuidado com pedras irregulares e use ruas iluminadas ou transporte registrado à noite.',
    bestTime: 'Fim da manhã para detalhes internos ou fim de tarde para a fachada e a praça', openingHours: 'O acesso à igreja pode mudar por missas e eventos; confirme detalhes do dia no Google Maps antes de visitar', nearby: 'Museo de las Culturas de Oaxaca, Jardín Etnobotánico, Andador Alcalá, Museo de Filatelia de Oaxaca, Parque El Llano', bring: 'Celular carregado, água, sapatos confortáveis, roupa respeitosa para entrar na igreja e dinheiro trocado', accessibility: 'Há piso histórico, soleiras, multidões e alguns degraus ao redor da igreja e da praça; confirme rotas sem degraus antes de ir.', booking: 'Normalmente não precisa reservar; reserve apenas para caminhadas históricas guiadas ou programas especiais.'
  },
  ja: {
    name: 'サント・ドミンゴ・デ・グスマン教会', category: '文化', area: '歴史地区', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '無料', priceLabel: '無料', duration: '60分',
    description: 'オアハカを代表するバロック様式の教会を紹介する新しい文化カード。金色に輝く礼拝堂、彫刻された石の細部、広い広場、周辺の博物館や庭園へのアクセスが魅力です。',
    bestFor: 'バロック建築、宗教美術、歴史写真、中心部散策、広場の雰囲気', highlights: '金色の内部装飾、彫刻されたファサード、サント・ドミンゴ広場、植民地建築、博物館と庭園のエリア',
    localTip: 'ミサの時間を避けて敬意をもって見学し、その後は広場で写真を撮ってからアンダドール・アルカラ、博物館、近くのカフェへ向かいましょう。', safetyTip: '広場は中心部で人通りがありますが、貴重品は閉じて持ち、石畳や縁石に注意し、夜遅くは明るい道か登録済み交通を利用してください。',
    bestTime: '午前遅めは内部の細部、夕方はファサードと広場の光がきれいです', openingHours: '教会への入場はミサや行事で変わることがあります。訪問前にGoogle Mapsで当日の情報を確認してください', nearby: 'Museo de las Culturas de Oaxaca、Jardín Etnobotánico、Andador Alcalá、Museo de Filatelia de Oaxaca、Parque El Llano', bring: '充電済みの携帯、水、歩きやすい靴、教会入場に配慮した服装、近隣で使う小額現金', accessibility: '教会と広場周辺には歴史的な石畳、敷居、人混み、段差があります。訪問前に段差の少ない入口を確認してください。', booking: '通常の見学は予約不要です。歴史ガイドツアーや特別プログラムのみ事前予約を検討してください。'
  },
  zh: {
    name: '圣多明各·德·古斯曼教堂', category: '文化', area: '历史中心', address: 'C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '免费', priceLabel: '免费', duration: '60分钟',
    description: '一张全新的文化地点卡片：介绍瓦哈卡标志性的巴洛克教堂，拥有金色礼拜堂、精雕石材细节、宏伟广场，并可轻松衔接圣多明各周边博物馆和花园。',
    bestFor: '巴洛克建筑、宗教艺术、历史摄影、市中心步行、广场氛围', highlights: '金色内饰、雕刻立面、圣多明各广场、殖民时期建筑、博物馆与花园街区',
    localTip: '请避开弥撒时间并保持尊重地参观，之后可在广场拍照，再前往阿尔卡拉步行街、博物馆或附近咖啡馆。', safetyTip: '广场位于市中心且人流较多，但请拉好贵重物品，注意不平石路和路缘，深夜使用照明良好的路线或正规交通。',
    bestTime: '上午较晚适合看室内细节，黄昏适合拍立面和广场', openingHours: '教堂开放可能因弥撒和活动而变化；参观前请在 Google Maps 确认当天信息', nearby: 'Museo de las Culturas de Oaxaca、Jardín Etnobotánico、Andador Alcalá、Museo de Filatelia de Oaxaca、Parque El Llano', bring: '充好电的手机、水、舒适鞋、适合进入教堂的得体衣物和附近消费用小额现金', accessibility: '教堂和广场周边可能有历史石铺地、门槛、人群和少量台阶；参观前请确认少台阶入口。', booking: '普通参观通常无需预约；历史导览或特别文化项目可提前预订。'
  }
}, cultureCategories);

export const mufiLocalized = localizedByLanguage({
  name: 'Museo de Filatelia de Oaxaca (MUFI)', category: 'Culture', area: 'Centro Histórico', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', price: '$', priceLabel: '$', duration: '45 min',
  description: 'A brand-new culture card for MUFI, a calm design-forward museum near Santo Domingo where stamps, postal art, graphic collections, courtyards, and rotating exhibitions make a thoughtful short stop.',
  bestFor: 'postal art, graphic design, quiet galleries, museum courtyards, rainy-day culture, Santo Domingo walks', highlights: 'stamp collections, postal history, modern galleries, peaceful courtyard, rotating exhibitions, central location',
  localTip: 'Pair MUFI with Santo Domingo, the Jardín Etnobotánico, or Andador Alcalá. Take time in the courtyard and check the current exhibition before choosing how long to stay.', safetyTip: 'Visit in daylight or early evening, keep valuables zipped on busy Centro sidewalks, watch uneven stone near Santo Domingo, and use well-lit streets or registered transport late at night.',
  bestTime: 'Late morning or mid-afternoon, when the galleries feel calm and it fits easily between Centro walks', openingHours: 'Museum hours and exhibitions can change; confirm same-day details on Google Maps before visiting', nearby: 'Templo de Santo Domingo de Guzmán, Jardín Etnobotánico, Andador Alcalá, Parque El Llano, Museo de las Culturas de Oaxaca', bring: 'A charged phone, small cash or card, comfortable shoes, water, and a light layer for gallery rooms', accessibility: 'Expect historic-building transitions, thresholds, possible steps, and courtyard surfaces; confirm accessible entry before going.', booking: 'No app booking needed for a casual visit; reserve ahead only for special talks, workshops, or guided cultural programs.'
}, {
  es: { name: 'Museo de Filatelia de Oaxaca (MUFI)', category: 'Cultura', area: 'Centro Histórico', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', price: '$', priceLabel: '$', duration: '45 min', description: 'Una nueva tarjeta cultural para MUFI, un museo tranquilo y de diseño cerca de Santo Domingo, con timbres, arte postal, colecciones gráficas, patios y exposiciones temporales.', bestFor: 'arte postal, diseño gráfico, galerías tranquilas, patios de museo, plan cultural con lluvia, caminata por Santo Domingo', highlights: 'colecciones de timbres, historia postal, galerías modernas, patio tranquilo, exposiciones temporales, ubicación céntrica', localTip: 'Combina MUFI con Santo Domingo, el Jardín Etnobotánico o el Andador Alcalá. Tómate tiempo en el patio y revisa la exposición actual al llegar.', safetyTip: 'Visita con luz de día o al inicio de la noche, lleva valores cerrados en banquetas concurridas, cuida la cantera irregular y usa calles iluminadas o transporte registrado tarde.' },
  fr: { name: 'Musée de la philatélie d’Oaxaca (MUFI)', category: 'Culture', area: 'Centre historique', duration: '45 min', description: 'Nouvelle carte culturelle pour MUFI, un musée calme près de Santo Domingo consacré aux timbres, à l’art postal, aux collections graphiques, aux patios et expositions temporaires.', bestFor: 'art postal, design graphique, galeries calmes, patios, culture par temps de pluie', highlights: 'collections de timbres, histoire postale, galeries modernes, cour paisible, expositions temporaires', localTip: 'Associez MUFI à Santo Domingo, au Jardin ethnobotanique ou à l’Andador Alcalá, puis prenez le temps de voir la cour et l’exposition du moment.', safetyTip: 'Venez de jour ou en début de soirée, gardez vos objets fermés dans le Centro et utilisez des rues éclairées ou un transport enregistré tard le soir.' },
  de: { name: 'Museo de Filatelia de Oaxaca (MUFI)', category: 'Kultur', area: 'Historisches Zentrum', duration: '45 Min.', description: 'Eine neue Kulturkarte für MUFI, ein ruhiges, designorientiertes Museum nahe Santo Domingo mit Briefmarken, Postkunst, grafischen Sammlungen, Höfen und Wechselausstellungen.', bestFor: 'Postkunst, Grafikdesign, ruhige Galerien, Museumshöfe, Regentagskultur', highlights: 'Briefmarkensammlungen, Postgeschichte, moderne Galerien, ruhiger Hof, Wechselausstellungen', localTip: 'Kombiniere MUFI mit Santo Domingo, dem Jardín Etnobotánico oder Andador Alcalá und prüfe vor Ort die aktuelle Ausstellung.', safetyTip: 'Tagsüber oder am frühen Abend besuchen, Wertsachen geschlossen tragen, unebene Steine beachten und spät helle Wege oder registrierten Transport nutzen.' },
  it: { name: 'Museo di Filatelia di Oaxaca (MUFI)', category: 'Cultura', area: 'Centro Storico', duration: '45 min', description: 'Una nuova scheda culturale per MUFI, museo tranquillo e curato vicino a Santo Domingo con francobolli, arte postale, collezioni grafiche, cortili e mostre temporanee.', bestFor: 'arte postale, design grafico, gallerie tranquille, cortili, cultura nei giorni di pioggia', highlights: 'collezioni di francobolli, storia postale, gallerie moderne, cortile tranquillo, mostre temporanee', localTip: 'Abbina MUFI a Santo Domingo, al Jardín Etnobotánico o all’Andador Alcalá e controlla la mostra in corso all’arrivo.', safetyTip: 'Visita di giorno o in prima serata, tieni chiusi gli oggetti di valore nel Centro e usa strade illuminate o trasporto registrato tardi.' },
  pt: { name: 'Museu de Filatelia de Oaxaca (MUFI)', category: 'Cultura', area: 'Centro Histórico', duration: '45 min', description: 'Um novo cartão cultural para o MUFI, museu tranquilo e bem desenhado perto de Santo Domingo, com selos, arte postal, coleções gráficas, pátios e exposições temporárias.', bestFor: 'arte postal, design gráfico, galerias tranquilas, pátios de museu, cultura em dia de chuva', highlights: 'coleções de selos, história postal, galerias modernas, pátio tranquilo, exposições temporárias', localTip: 'Combine o MUFI com Santo Domingo, o Jardín Etnobotánico ou o Andador Alcalá e confira a exposição atual ao chegar.', safetyTip: 'Visite de dia ou no começo da noite, mantenha valores fechados no Centro e use ruas iluminadas ou transporte registrado tarde.' },
  ja: { name: 'オアハカ切手博物館（MUFI）', category: '文化', area: '歴史地区', duration: '45分', description: 'サント・ドミンゴ近くの落ち着いた文化スポット。切手、郵便アート、グラフィック資料、中庭、企画展示を楽しめるMUFIの新しいカードです。', bestFor: '郵便アート、グラフィックデザイン、静かな展示室、中庭、雨の日の文化体験', highlights: '切手コレクション、郵便史、モダンな展示室、静かな中庭、企画展', localTip: 'サント・ドミンゴ、エトノボタニコ庭園、アルカラ歩行者通りと組み合わせるのがおすすめ。到着時に現在の展示を確認しましょう。', safetyTip: '日中または早い夕方に訪れ、中心部の混雑した歩道では貴重品を閉じて持ち、夜遅くは明るい道か登録済み交通を利用してください。' },
  zh: { name: '瓦哈卡集邮博物馆（MUFI）', category: '文化', area: '历史中心', duration: '45分钟', description: 'MUFI 是圣多明各附近一处安静且设计感强的文化地点，展示邮票、邮政艺术、平面收藏、庭院空间和轮换展览。', bestFor: '邮政艺术、平面设计、安静展厅、博物馆庭院、雨天文化行程', highlights: '邮票收藏、邮政历史、现代展厅、宁静庭院、轮换展览', localTip: '可与圣多明各、民族植物园或阿尔卡拉步行街一起安排；到达时先查看当前展览。', safetyTip: '建议白天或傍晚较早前往，在市中心繁忙人行道上拉好贵重物品，夜间使用照明良好的路线或正规交通。' }
}, cultureCategories);

export const basilicaSoledadLocalized = localizedByLanguage({
  name: 'Basílica de Nuestra Señora de la Soledad', category: 'Culture', area: 'Centro Histórico', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Free', priceLabel: 'Free', duration: '45 min',
  description: 'A brand-new culture stop for Oaxaca’s beloved patron-saint basilica, with a carved stone façade, a quiet plaza, devotional art, and an easy Centro walk west of the Zócalo.',
  bestFor: 'sacred architecture, local devotion, colonial stonework, peaceful Centro walks, photography', highlights: 'baroque façade, Basilica plaza, patron-saint devotion, carved cantera details, central historic setting',
  localTip: 'Visit respectfully outside Mass times, then pause in the plaza before walking back toward the Zócalo, Mercado 20 de Noviembre, or nearby cafés.', safetyTip: 'Go in daylight or early evening, keep valuables zipped on surrounding Centro streets, watch uneven paving, and use lit routes or registered transport late at night.',
  bestTime: 'Late morning for quieter interiors or late afternoon for warm light on the façade', openingHours: 'Church access can change for Masses and feast days; confirm same-day hours on Google Maps before visiting', nearby: 'Zócalo de Oaxaca, Mercado 20 de Noviembre, Catedral Metropolitana, Andador Alcalá, Museo de los Pintores Oaxaqueños', bring: 'Comfortable shoes, water, a charged phone, modest layers for church entry, and small cash for nearby snacks or candles', accessibility: 'Expect historic stone paving, curbs, thresholds, and occasional crowds around services; confirm step-free access before visiting.', booking: 'No booking is needed for a respectful casual visit; reserve only for guided history walks or special religious-cultural tours.'
}, {
  es: { name: 'Basílica de Nuestra Señora de la Soledad', category: 'Cultura', area: 'Centro Histórico', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Gratis', priceLabel: 'Gratis', duration: '45 min', description: 'Una nueva parada cultural para la querida basílica de la patrona de Oaxaca, con fachada de cantera labrada, plaza tranquila, arte devocional y caminata fácil por el Centro.', bestFor: 'arquitectura religiosa, devoción local, cantera colonial, caminatas tranquilas por el Centro, fotografía', highlights: 'fachada barroca, plaza de la Basílica, devoción a la patrona, detalles de cantera, entorno histórico céntrico', localTip: 'Visita con respeto fuera de horarios de misa y haz una pausa en la plaza antes de caminar al Zócalo, Mercado 20 de Noviembre o cafés cercanos.', safetyTip: 'Ve con luz de día o al inicio de la noche, lleva valores cerrados, cuida el pavimento irregular y usa rutas iluminadas o transporte registrado tarde.', bestTime: 'Final de la mañana para interiores más tranquilos o atardecer para la luz cálida en la fachada', openingHours: 'El acceso puede cambiar por misas y festividades; confirma horarios del día en Google Maps antes de visitar', nearby: 'Zócalo de Oaxaca, Mercado 20 de Noviembre, Catedral Metropolitana, Andador Alcalá, Museo de los Pintores Oaxaqueños', bring: 'Zapatos cómodos, agua, celular cargado, ropa discreta para entrar al templo y efectivo pequeño para antojitos o velas', accessibility: 'Hay cantera histórica, banquetas, umbrales y posibles multitudes durante servicios; confirma acceso sin escalones antes de visitar.', booking: 'No requiere reserva para una visita respetuosa; reserva solo para caminatas históricas guiadas o recorridos religiosos-culturales.' },
  fr: { name: 'Basilique Notre-Dame de la Solitude', category: 'Culture', area: 'Centre historique', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., Mexique', price: 'Gratuit', priceLabel: 'Gratuit', duration: '45 min', description: 'Une nouvelle halte culturelle dans la basilique dédiée à la patronne d’Oaxaca, avec façade de pierre sculptée, place paisible, art dévotionnel et promenade facile dans le Centro.', bestFor: 'architecture sacrée, dévotion locale, pierre coloniale, promenades calmes dans le Centro, photo', highlights: 'façade baroque, place de la basilique, dévotion à la patronne, détails en cantera, cadre historique central', localTip: 'Visitez avec respect hors offices, puis faites une pause sur la place avant de rejoindre le Zócalo, le Mercado 20 de Noviembre ou les cafés voisins.', safetyTip: 'Venez de jour ou en début de soirée, gardez vos objets fermés, surveillez les pavés irréguliers et utilisez des rues éclairées tard le soir.', bestTime: 'Fin de matinée pour un intérieur plus calme ou fin d’après-midi pour la lumière chaude sur la façade', openingHours: 'L’accès peut changer selon les offices et fêtes religieuses ; vérifiez les horaires du jour sur Google Maps', nearby: 'Zócalo d’Oaxaca, Mercado 20 de Noviembre, cathédrale métropolitaine, Andador Alcalá, Museo de los Pintores Oaxaqueños', bring: 'Chaussures confortables, eau, téléphone chargé, tenue respectueuse et petites espèces', accessibility: 'Prévoir pavés historiques, trottoirs, seuils et foule possible pendant les offices ; confirmez l’accès sans marche.', booking: 'Pas de réservation nécessaire pour une visite respectueuse ; réservez seulement une visite historique ou religieuse guidée.' },
  de: { name: 'Basilika Unserer Lieben Frau der Einsamkeit', category: 'Kultur', area: 'Historisches Zentrum', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., Mexiko', price: 'Kostenlos', priceLabel: 'Kostenlos', duration: '45 Min.', description: 'Ein neuer Kulturstopp an Oaxacas beliebter Basilika der Schutzpatronin mit geschnitzter Steinfassade, ruhiger Plaza, Andachtskunst und einfachem Centro-Spaziergang.', bestFor: 'sakrale Architektur, lokale Verehrung, koloniale Steinmetzkunst, ruhige Centro-Spaziergänge, Fotografie', highlights: 'barocke Fassade, Basilika-Plaza, Schutzpatroninnen-Verehrung, Cantera-Details, zentrale historische Lage', localTip: 'Besuche die Kirche respektvoll außerhalb der Gottesdienste und pausiere auf der Plaza, bevor du zum Zócalo, Markt oder Café weitergehst.', safetyTip: 'Tagsüber oder am frühen Abend gehen, Wertsachen geschlossen tragen, unebenes Pflaster beachten und spät helle Wege oder registrierten Transport nutzen.', bestTime: 'Später Vormittag für ruhigere Innenräume oder später Nachmittag für warmes Licht auf der Fassade', openingHours: 'Der Zugang kann wegen Messen und Feiertagen wechseln; Tageszeiten vorher auf Google Maps prüfen', nearby: 'Zócalo de Oaxaca, Mercado 20 de Noviembre, Kathedrale, Andador Alcalá, Museo de los Pintores Oaxaqueños', bring: 'Bequeme Schuhe, Wasser, geladenes Telefon, respektvolle Kleidung und kleines Bargeld', accessibility: 'Historisches Steinpflaster, Bordsteine, Schwellen und Menschenmengen bei Gottesdiensten sind möglich; stufenfreien Zugang vorher bestätigen.', booking: 'Keine Buchung für einen respektvollen Besuch nötig; nur für geführte historische oder religiöse Rundgänge reservieren.' },
  it: { name: 'Basilica di Nostra Signora della Solitudine', category: 'Cultura', area: 'Centro Storico', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., Messico', price: 'Gratuito', priceLabel: 'Gratuito', duration: '45 min', description: 'Una nuova tappa culturale nella basilica della patrona di Oaxaca, con facciata in pietra scolpita, piazza tranquilla, arte devozionale e facile passeggiata nel Centro.', bestFor: 'architettura sacra, devozione locale, pietra coloniale, passeggiate tranquille in centro, fotografia', highlights: 'facciata barocca, piazza della basilica, devozione alla patrona, dettagli in cantera, contesto storico centrale', localTip: 'Visita con rispetto fuori dagli orari di messa, poi fermati in piazza prima di camminare verso lo Zócalo, il mercato o i caffè vicini.', safetyTip: 'Vai di giorno o in prima serata, tieni chiusi gli oggetti di valore, fai attenzione alla pavimentazione irregolare e usa strade illuminate tardi.', bestTime: 'Tarda mattina per interni più tranquilli o tardo pomeriggio per luce calda sulla facciata', openingHours: 'L’accesso può cambiare per messe e feste; conferma gli orari del giorno su Google Maps', nearby: 'Zócalo di Oaxaca, Mercado 20 de Noviembre, cattedrale metropolitana, Andador Alcalá, Museo de los Pintores Oaxaqueños', bring: 'Scarpe comode, acqua, telefono carico, abbigliamento rispettoso e contanti piccoli', accessibility: 'Aspettati pavimentazione storica, marciapiedi, soglie e folla durante le funzioni; conferma l’accesso senza gradini.', booking: 'Non serve prenotare per una visita rispettosa; prenota solo tour storici o religiosi guidati.' },
  pt: { name: 'Basílica de Nossa Senhora da Solidão', category: 'Cultura', area: 'Centro Histórico', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Gratuito', priceLabel: 'Gratuito', duration: '45 min', description: 'Uma nova parada cultural na basílica da padroeira de Oaxaca, com fachada de pedra entalhada, praça tranquila, arte devocional e caminhada fácil pelo Centro.', bestFor: 'arquitetura sacra, devoção local, cantaria colonial, caminhadas tranquilas no Centro, fotografia', highlights: 'fachada barroca, praça da basílica, devoção à padroeira, detalhes de cantera, cenário histórico central', localTip: 'Visite com respeito fora dos horários de missa e pare na praça antes de caminhar ao Zócalo, mercado ou cafés próximos.', safetyTip: 'Vá de dia ou no começo da noite, mantenha valores fechados, cuidado com piso irregular e use ruas iluminadas ou transporte registrado tarde.', bestTime: 'Fim da manhã para interiores mais tranquilos ou fim da tarde para luz quente na fachada', openingHours: 'O acesso pode mudar por missas e festas; confirme os horários do dia no Google Maps', nearby: 'Zócalo de Oaxaca, Mercado 20 de Noviembre, Catedral Metropolitana, Andador Alcalá, Museo de los Pintores Oaxaqueños', bring: 'Sapatos confortáveis, água, celular carregado, roupa respeitosa e dinheiro trocado', accessibility: 'Há piso histórico, guias, soleiras e possível movimento durante missas; confirme acesso sem degraus antes da visita.', booking: 'Não é preciso reservar para uma visita respeitosa; reserve apenas tours históricos ou religiosos guiados.' },
  ja: { name: 'ヌエストラ・セニョーラ・デ・ラ・ソレダッド聖堂', category: '文化', area: '歴史地区', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '無料', priceLabel: '無料', duration: '45分', description: 'オアハカの守護聖母に捧げられた聖堂を紹介する新しい文化カード。彫刻された石造ファサード、静かな広場、信仰美術、ソカロ西側の歩きやすい中心部散策が魅力です。', bestFor: '宗教建築、地元の信仰、植民地時代の石細工、静かな中心部散策、写真', highlights: 'バロック様式のファサード、聖堂広場、守護聖母への信仰、カンテラ石の細部、歴史地区の立地', localTip: 'ミサの時間を避けて敬意をもって訪れ、広場で少し休んでからソカロや市場、近くのカフェへ歩くのがおすすめです。', safetyTip: '日中または夕方早めに訪れ、貴重品は閉じて持ち、不規則な石畳に注意し、夜遅くは明るい道か登録済み交通を利用してください。', bestTime: '静かな内部を見るなら午前遅め、ファサードの光なら夕方がおすすめです', openingHours: 'ミサや祝祭日で入場時間が変わることがあります。訪問前にGoogleマップで当日の時間を確認してください', nearby: 'オアハカ・ソカロ、11月20日市場、メトロポリタン大聖堂、アンダドール・アルカラ、オアハカ画家美術館', bring: '歩きやすい靴、水、充電済みの携帯、教会に配慮した服装、小額現金', accessibility: '歴史的な石畳、縁石、敷居、礼拝時の混雑がある場合があります。段差の少ない入口を事前に確認してください。', booking: '敬意ある通常見学に予約は不要です。歴史や宗教文化のガイドツアーのみ予約を検討してください。' },
  zh: { name: '孤独圣母圣殿', category: '文化', area: '历史中心', address: 'Av. de la Independencia 107, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '免费', priceLabel: '免费', duration: '45分钟', description: '一张全新的文化地点卡片：介绍瓦哈卡深受敬爱的主保圣母圣殿，这里有雕刻石质立面、安静广场、宗教艺术，并可从索卡洛向西轻松步行抵达。', bestFor: '宗教建筑、本地信仰、殖民时期石雕、安静的历史中心散步、摄影', highlights: '巴洛克立面、圣殿广场、主保圣母信仰、石雕细节、历史中心位置', localTip: '请避开弥撒时间并保持尊重地参观，然后在广场稍作停留，再步行前往索卡洛、市场或附近咖啡馆。', safetyTip: '建议白天或傍晚较早前往，拉好贵重物品，注意不平石路，深夜使用照明良好的路线或正规交通。', bestTime: '上午较晚适合安静参观内部，傍晚适合拍摄立面的暖色光线', openingHours: '开放时间可能因弥撒和节庆而变化；参观前请在 Google 地图确认当天时间', nearby: '瓦哈卡索卡洛、11月20日市场、大都会大教堂、阿尔卡拉步行街、瓦哈卡画家博物馆', bring: '舒适鞋、水、充好电的手机、适合进入教堂的得体衣物和小额现金', accessibility: '可能有历史石铺地、路缘、门槛以及礼拜期间人群；参观前请确认少台阶入口。', booking: '普通尊重参观无需预约；只有历史或宗教文化导览需要提前预订。' }
}, cultureCategories);

export const museoTextilOaxacaLocalized = localizedByLanguage({
  name: 'Museo Textil de Oaxaca', category: 'Culture', area: 'Centro Histórico', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Free', priceLabel: 'Free', duration: '60 min',
  description: 'A brand-new culture card for Oaxaca’s textile heritage: airy galleries, woven pieces, dye traditions, contemporary fiber art, and a peaceful courtyard stop close to the Zócalo and Andador Alcalá.',
  bestFor: 'textile traditions, design lovers, quiet galleries, rainy-day culture, families, Centro walks', highlights: 'woven collections, natural dye stories, rotating exhibitions, colonial courtyard, artisan context, central location',
  localTip: 'Pair it with Andador Alcalá or a coffee nearby, then look for weaving, dye, or embroidery details before shopping so you understand the work behind each textile.', safetyTip: 'Visit in daylight or early evening, keep valuables zipped on busy Centro sidewalks, watch uneven stone thresholds, and use well-lit streets or registered transport late at night.',
  bestTime: 'Late morning or mid-afternoon when galleries are calm and it fits easily between Centro walks', openingHours: 'Exhibition access can change; confirm same-day hours, events, and temporary closures on Google Maps before visiting', nearby: 'Zócalo de Oaxaca, Andador Alcalá, Teatro Macedonio Alcalá, Museo de los Pintores Oaxaqueños, Mercado 20 de Noviembre', bring: 'A charged phone, water, comfortable shoes, small cash or card for the museum shop, and a light layer for galleries', accessibility: 'Expect historic-building transitions, courtyards, thresholds, and possible steps; confirm accessible entry before going.', booking: 'No app booking needed for a casual visit; reserve ahead only for workshops, talks, or special textile programs.'
}, {
  es: { name: 'Museo Textil de Oaxaca', category: 'Cultura', area: 'Centro Histórico', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Gratis', priceLabel: 'Gratis', duration: '60 min', description: 'Una nueva tarjeta cultural para el patrimonio textil de Oaxaca: galerías luminosas, piezas tejidas, tintes naturales, arte textil contemporáneo y un patio tranquilo cerca del Zócalo.', bestFor: 'tradiciones textiles, amantes del diseño, galerías tranquilas, plan cultural con lluvia, familias, caminatas por el Centro', highlights: 'colecciones tejidas, historias de tintes naturales, exposiciones temporales, patio colonial, contexto artesanal, ubicación céntrica', localTip: 'Combínalo con el Andador Alcalá o un café cercano, y observa detalles de tejido, tinte y bordado antes de comprar para valorar mejor cada pieza.', safetyTip: 'Visita con luz de día o al inicio de la noche, lleva valores cerrados en banquetas concurridas, cuida umbrales irregulares y usa rutas iluminadas tarde.', bestTime: 'Final de la mañana o media tarde, cuando las galerías están tranquilas', openingHours: 'El acceso a exposiciones puede cambiar; confirma horarios, eventos y cierres temporales en Google Maps antes de visitar', nearby: 'Zócalo de Oaxaca, Andador Alcalá, Teatro Macedonio Alcalá, Museo de los Pintores Oaxaqueños, Mercado 20 de Noviembre', bring: 'Celular cargado, agua, zapatos cómodos, efectivo pequeño o tarjeta para la tienda y una capa ligera', accessibility: 'Puede haber transiciones de edificio histórico, patios, umbrales y escalones; confirma entrada accesible antes de ir.', booking: 'No requiere reserva de app para visita casual; reserva solo para talleres, charlas o programas textiles especiales.' },
  fr: { name: 'Musée textile d’Oaxaca', category: 'Culture', area: 'Centre historique', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., Mexique', price: 'Gratuit', priceLabel: 'Gratuit', duration: '60 min', description: 'Nouvelle carte culturelle dédiée au patrimoine textile d’Oaxaca : galeries lumineuses, pièces tissées, teintures naturelles, art textile contemporain et cour paisible près du Zócalo.', bestFor: 'traditions textiles, design, galeries calmes, culture par temps de pluie, familles, promenades dans le Centro', highlights: 'collections tissées, teintures naturelles, expositions temporaires, cour coloniale, contexte artisanal, emplacement central', localTip: 'Associez la visite à l’Andador Alcalá ou à un café voisin, puis observez tissage, teinture et broderie avant d’acheter des textiles.', safetyTip: 'Venez de jour ou en début de soirée, gardez vos objets fermés dans le Centro, surveillez les seuils irréguliers et utilisez des rues éclairées tard le soir.', bestTime: 'Fin de matinée ou milieu d’après-midi, quand les galeries sont calmes', openingHours: 'Les accès aux expositions peuvent changer ; vérifiez horaires, événements et fermetures sur Google Maps avant la visite', nearby: 'Zócalo d’Oaxaca, Andador Alcalá, Teatro Macedonio Alcalá, Museo de los Pintores Oaxaqueños, Mercado 20 de Noviembre', bring: 'Téléphone chargé, eau, chaussures confortables, petites espèces ou carte pour la boutique et couche légère', accessibility: 'Bâtiment historique avec transitions, cours, seuils et marches possibles ; confirmez l’entrée accessible avant de venir.', booking: 'Pas de réservation app nécessaire ; réservez seulement pour ateliers, conférences ou programmes textiles spéciaux.' },
  de: { name: 'Textilmuseum Oaxaca', category: 'Kultur', area: 'Historisches Zentrum', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., Mexiko', price: 'Kostenlos', priceLabel: 'Kostenlos', duration: '60 Min.', description: 'Eine neue Kulturkarte zum Textilerbe Oaxacas: helle Galerien, Webarbeiten, Naturfarben, zeitgenössische Faserkunst und ein ruhiger Hof nahe dem Zócalo.', bestFor: 'Textiltraditionen, Designfans, ruhige Galerien, Regentagskultur, Familien, Centro-Spaziergänge', highlights: 'Websammlungen, Naturfarben, Wechselausstellungen, Kolonialhof, Kunsthandwerkskontext, zentrale Lage', localTip: 'Kombiniere den Besuch mit Andador Alcalá oder einem Café und achte vor dem Einkauf auf Web-, Färbe- und Stickdetails.', safetyTip: 'Tagsüber oder am frühen Abend besuchen, Wertsachen geschlossen tragen, unebene Schwellen beachten und spät helle Wege oder registrierten Transport nutzen.', bestTime: 'Später Vormittag oder Nachmittag, wenn die Galerien ruhiger sind', openingHours: 'Ausstellungszugang kann wechseln; Tageszeiten, Veranstaltungen und Schließungen vorher auf Google Maps prüfen', nearby: 'Zócalo de Oaxaca, Andador Alcalá, Teatro Macedonio Alcalá, Museo de los Pintores Oaxaqueños, Mercado 20 de Noviembre', bring: 'Geladenes Telefon, Wasser, bequeme Schuhe, kleines Bargeld oder Karte für den Shop und leichte Schicht', accessibility: 'Historisches Gebäude mit Übergängen, Höfen, Schwellen und möglichen Stufen; barrierearmen Eingang vorher bestätigen.', booking: 'Keine App-Buchung für spontane Besuche nötig; nur für Workshops, Vorträge oder besondere Textilprogramme reservieren.' },
  it: { name: 'Museo Tessile di Oaxaca', category: 'Cultura', area: 'Centro Storico', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., Messico', price: 'Gratuito', priceLabel: 'Gratuito', duration: '60 min', description: 'Una nuova scheda culturale sul patrimonio tessile di Oaxaca: gallerie luminose, pezzi tessuti, tinture naturali, arte tessile contemporanea e un cortile tranquillo vicino allo Zócalo.', bestFor: 'tradizioni tessili, design, gallerie tranquille, cultura nei giorni di pioggia, famiglie, passeggiate in centro', highlights: 'collezioni tessute, tinture naturali, mostre temporanee, cortile coloniale, contesto artigianale, posizione centrale', localTip: 'Abbinalo all’Andador Alcalá o a un caffè vicino, poi osserva dettagli di tessitura, tintura e ricamo prima di comprare tessuti.', safetyTip: 'Visita di giorno o in prima serata, tieni chiusi gli oggetti di valore nel Centro, attenzione alle soglie irregolari e usa strade illuminate tardi.', bestTime: 'Tarda mattina o metà pomeriggio, quando le gallerie sono più tranquille', openingHours: 'L’accesso alle mostre può cambiare; conferma orari, eventi e chiusure su Google Maps prima della visita', nearby: 'Zócalo di Oaxaca, Andador Alcalá, Teatro Macedonio Alcalá, Museo de los Pintores Oaxaqueños, Mercado 20 de Noviembre', bring: 'Telefono carico, acqua, scarpe comode, contanti piccoli o carta per il negozio e strato leggero', accessibility: 'Edificio storico con passaggi, cortili, soglie e possibili gradini; conferma l’ingresso accessibile prima.', booking: 'Non serve prenotazione app per una visita casuale; prenota solo workshop, conferenze o programmi tessili speciali.' },
  pt: { name: 'Museu Têxtil de Oaxaca', category: 'Cultura', area: 'Centro Histórico', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., México', price: 'Gratuito', priceLabel: 'Gratuito', duration: '60 min', description: 'Um novo cartão cultural para o patrimônio têxtil de Oaxaca: galerias arejadas, peças tecidas, tintes naturais, arte têxtil contemporânea e pátio tranquilo perto do Zócalo.', bestFor: 'tradições têxteis, design, galerias tranquilas, cultura em dia de chuva, famílias, caminhadas pelo Centro', highlights: 'coleções tecidas, histórias de tintes naturais, exposições temporárias, pátio colonial, contexto artesanal, localização central', localTip: 'Combine com o Andador Alcalá ou um café próximo e observe detalhes de tecelagem, tingimento e bordado antes de comprar tecidos.', safetyTip: 'Visite de dia ou no começo da noite, mantenha valores fechados no Centro, cuidado com soleiras irregulares e use ruas iluminadas tarde.', bestTime: 'Fim da manhã ou meio da tarde, quando as galerias estão calmas', openingHours: 'O acesso às exposições pode mudar; confirme horários, eventos e fechamentos no Google Maps antes de visitar', nearby: 'Zócalo de Oaxaca, Andador Alcalá, Teatro Macedonio Alcalá, Museo de los Pintores Oaxaqueños, Mercado 20 de Noviembre', bring: 'Celular carregado, água, sapatos confortáveis, dinheiro trocado ou cartão para a loja e camada leve', accessibility: 'Prédio histórico com transições, pátios, soleiras e possíveis degraus; confirme entrada acessível antes de ir.', booking: 'Não precisa reservar no app para visita casual; reserve apenas oficinas, palestras ou programas têxteis especiais.' },
  ja: { name: 'オアハカ織物博物館', category: '文化', area: '歴史地区', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '無料', priceLabel: '無料', duration: '60分', description: 'オアハカの織物文化を紹介する新しい文化カード。明るい展示室、織物作品、天然染料、現代のファイバーアート、ソカロ近くの静かな中庭を楽しめます。', bestFor: '織物文化、デザイン好き、静かなギャラリー、雨の日の文化体験、家族、中心部散策', highlights: '織物コレクション、天然染料、企画展示、コロニアルな中庭、工芸の背景、中心部の立地', localTip: 'アンダドール・アルカラや近くのカフェと組み合わせ、買い物前に織り、染め、刺繍の細部を見て職人技を理解しましょう。', safetyTip: '日中または早い夕方に訪れ、中心部の歩道では貴重品を閉じて持ち、不規則な段差に注意し、夜遅くは明るい道か登録済み交通を使ってください。', bestTime: '展示室が落ち着く午前遅めまたは午後半ば', openingHours: '展示の入場状況は変わることがあります。訪問前にGoogleマップで当日の時間、イベント、臨時休館を確認してください', nearby: 'オアハカ・ソカロ、Andador Alcalá、Teatro Macedonio Alcalá、Museo de los Pintores Oaxaqueños、11月20日市場', bring: '充電済みの携帯、水、歩きやすい靴、ミュージアムショップ用の小額現金またはカード、薄い羽織り', accessibility: '歴史的建物のため、通路、中庭、敷居、段差がある場合があります。訪問前にアクセシブル入口を確認してください。', booking: '通常見学にアプリ予約は不要です。ワークショップ、講演、特別な織物プログラムのみ事前予約を検討してください。' },
  zh: { name: '瓦哈卡纺织博物馆', category: '文化', area: '历史中心', address: 'Miguel Hidalgo 917, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '免费', priceLabel: '免费', duration: '60分钟', description: '一张全新的文化地点卡片：介绍瓦哈卡的纺织传统，包含通透展厅、织物作品、天然染色、当代纤维艺术，以及靠近索卡洛的安静庭院。', bestFor: '纺织传统、设计爱好者、安静展厅、雨天文化行程、家庭、历史中心步行', highlights: '织物收藏、天然染色故事、轮换展览、殖民风格庭院、手工艺背景、中心位置', localTip: '可与阿尔卡拉步行街或附近咖啡馆一起安排；购买纺织品前先观察织造、染色和刺绣细节，更能理解每件作品的工艺。', safetyTip: '建议白天或傍晚较早前往，在市中心繁忙人行道上拉好贵重物品，注意不平门槛，深夜使用照明良好的路线或正规交通。', bestTime: '上午较晚或下午中段，展厅较安静，也适合穿插在市中心步行中', openingHours: '展览开放可能变化；参观前请在 Google 地图确认当天时间、活动和临时闭馆信息', nearby: '瓦哈卡索卡洛、阿尔卡拉步行街、马塞多尼奥·阿尔卡拉剧院、瓦哈卡画家博物馆、11月20日市场', bring: '充好电的手机、水、舒适鞋、博物馆商店用小额现金或银行卡，以及室内薄外套', accessibility: '历史建筑内可能有过渡空间、庭院、门槛和少量台阶；如有无障碍需求，请提前确认入口。', booking: '普通参观无需应用预订；工作坊、讲座或特别纺织项目可提前预约。' }
}, cultureCategories);

export const museoPintoresOaxaquenosLocalized = localizedByLanguage({
  name: 'Museo de los Pintores Oaxaqueños', category: 'Culture', area: 'Centro Histórico', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '$', priceLabel: '$', duration: '60 min',
  description: 'A brand-new culture stop for Oaxaca’s contemporary art scene, set in a central historic building with rotating exhibitions, Oaxacan painters, graphic work, quiet galleries, and an easy walk from the Zócalo.',
  bestFor: 'Oaxacan painting, contemporary exhibitions, graphic art, rainy-day culture, relaxed Centro gallery time', highlights: 'rotating exhibitions, Oaxacan artists, historic building, quiet galleries, central location, short culture stop',
  localTip: 'Pair it with the Zócalo, Teatro Macedonio Alcalá, or a coffee stop nearby. Check the current exhibition on arrival because the strongest rooms change through the year.', safetyTip: 'The museum is central and best visited in daylight or early evening. Keep valuables zipped on busy sidewalks, watch traffic on Independencia, and use lit streets or registered transport late at night.',
  bestTime: 'Late morning or mid-afternoon when the galleries are calm and it fits naturally between Centro walks', openingHours: 'Exhibition hours can change; confirm same-day opening, ticket details, and temporary closures on Google Maps before visiting', nearby: 'Zócalo de Oaxaca, Teatro Macedonio Alcalá, Templo de Santo Domingo de Guzmán, Andador Alcalá, Catedral Metropolitana', bring: 'A charged phone, small cash for entry if required, water, comfortable shoes, and a light layer for gallery rooms', accessibility: 'Expect historic-building transitions, stairs or uneven flooring in some areas, and variable gallery access; confirm accessible entry before going.', booking: 'No app booking needed for a casual visit; reserve only for special openings, guided visits, talks, or workshops.'
}, {
  es: {
    name: 'Museo de los Pintores Oaxaqueños', category: 'Cultura', area: 'Centro Histórico', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '$', priceLabel: '$', duration: '60 min',
    description: 'Una parada cultural nueva para el arte contemporáneo de Oaxaca, en un edificio histórico del Centro con exposiciones temporales, pintura oaxaqueña, gráfica, salas tranquilas y caminata fácil desde el Zócalo.',
    bestFor: 'pintura oaxaqueña, exposiciones contemporáneas, gráfica, plan cultural con lluvia, galerías tranquilas en el Centro', highlights: 'exposiciones temporales, artistas oaxaqueños, edificio histórico, salas tranquilas, ubicación céntrica, pausa cultural breve',
    localTip: 'Combínalo con el Zócalo, el Teatro Macedonio Alcalá o un café cercano. Revisa la exposición al llegar porque las salas principales cambian durante el año.', safetyTip: 'Está en zona céntrica y conviene visitarlo con luz de día o al inicio de la noche. Lleva valores cerrados en banquetas concurridas, cuida el tráfico de Independencia y usa calles iluminadas o transporte registrado tarde en la noche.',
    bestTime: 'Final de la mañana o media tarde, cuando las salas están tranquilas y encaja bien entre caminatas por el Centro', openingHours: 'Los horarios de exposición pueden cambiar; confirma apertura, boletos y cierres temporales en Google Maps antes de visitar', nearby: 'Zócalo de Oaxaca, Teatro Macedonio Alcalá, Templo de Santo Domingo de Guzmán, Andador Alcalá, Catedral Metropolitana', bring: 'Celular cargado, efectivo pequeño por si hay cuota, agua, zapatos cómodos y una capa ligera para salas interiores', accessibility: 'Puede haber transiciones de edificio histórico, escaleras o pisos irregulares en algunas zonas y acceso variable por sala; confirma entrada accesible antes de ir.', booking: 'No requiere reserva de app para visita casual; reserva solo para inauguraciones, visitas guiadas, charlas o talleres.'
  },
  fr: {
    name: 'Musée des peintres oaxaquénien·ne·s', category: 'Culture', area: 'Centre historique', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., Mexique', price: '$', priceLabel: '$', duration: '60 min',
    description: 'Une nouvelle halte culturelle pour l’art contemporain d’Oaxaca, dans un bâtiment historique central avec expositions temporaires, peintres oaxaquénien·ne·s, art graphique et galeries calmes.',
    bestFor: 'peinture oaxaquénienne, expositions contemporaines, art graphique, jour de pluie, pause galerie au centre', highlights: 'expositions temporaires, artistes d’Oaxaca, bâtiment historique, galeries calmes, emplacement central',
    localTip: 'Associez la visite au Zócalo, au Teatro Macedonio Alcalá ou à un café voisin, et vérifiez l’exposition du moment en arrivant.', safetyTip: 'Le secteur est central; privilégiez le jour ou le début de soirée, gardez vos objets fermés et utilisez des rues éclairées ou un transport enregistré tard le soir.',
    bestTime: 'Fin de matinée ou milieu d’après-midi pour des salles plus calmes', openingHours: 'Les horaires peuvent changer; vérifiez ouverture, billets et fermetures sur Google Maps avant la visite', nearby: 'Zócalo d’Oaxaca, Teatro Macedonio Alcalá, Templo de Santo Domingo de Guzmán, Andador Alcalá, cathédrale', bring: 'Téléphone chargé, petites espèces, eau, chaussures confortables et couche légère', accessibility: 'Bâtiment historique avec transitions, marches ou sols irréguliers possibles; confirmez l’entrée accessible avant de venir.', booking: 'Pas de réservation app nécessaire; réservez seulement pour vernissages, visites guidées, conférences ou ateliers.'
  },
  de: {
    name: 'Museum der oaxaqueñischen Maler', category: 'Kultur', area: 'Historisches Zentrum', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., Mexiko', price: '$', priceLabel: '$', duration: '60 Min.',
    description: 'Ein neuer Kulturstopp für Oaxacas zeitgenössische Kunstszene in einem historischen Gebäude mit wechselnden Ausstellungen, oaxaqueñischer Malerei, Grafik und ruhigen Galerien.',
    bestFor: 'oaxaqueñische Malerei, zeitgenössische Ausstellungen, Grafik, Regentage, entspannte Galeriezeit im Zentrum', highlights: 'wechselnde Ausstellungen, lokale Künstler, historisches Gebäude, ruhige Galerien, zentrale Lage',
    localTip: 'Kombiniere den Besuch mit dem Zócalo, Teatro Macedonio Alcalá oder einem Café in der Nähe und prüfe die aktuelle Ausstellung vor Ort.', safetyTip: 'Zentral gelegen; tagsüber oder am frühen Abend besuchen, Wertsachen geschlossen tragen und spät abends beleuchtete Wege oder registrierten Transport nutzen.',
    bestTime: 'Später Vormittag oder Nachmittag, wenn die Räume ruhiger sind', openingHours: 'Öffnungszeiten können wechseln; Tagesinfos, Tickets und Schließungen auf Google Maps prüfen', nearby: 'Zócalo de Oaxaca, Teatro Macedonio Alcalá, Templo de Santo Domingo de Guzmán, Andador Alcalá, Kathedrale', bring: 'Geladenes Telefon, kleines Bargeld, Wasser, bequeme Schuhe und leichte Schicht', accessibility: 'Historisches Gebäude mit Übergängen, möglichen Stufen oder unebenem Boden; barrierearmen Eingang vorher bestätigen.', booking: 'Keine App-Buchung nötig; nur für Eröffnungen, Führungen, Vorträge oder Workshops reservieren.'
  },
  it: {
    name: 'Museo dei Pittori Oaxaqueñi', category: 'Cultura', area: 'Centro Storico', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., Messico', price: '$', priceLabel: '$', duration: '60 min',
    description: 'Una nuova tappa culturale per l’arte contemporanea di Oaxaca, in un edificio storico centrale con mostre temporanee, pittura oaxaqueña, grafica e gallerie tranquille.',
    bestFor: 'pittura oaxaqueña, mostre contemporanee, arte grafica, giornate di pioggia, gallerie tranquille in centro', highlights: 'mostre temporanee, artisti di Oaxaca, edificio storico, gallerie calme, posizione centrale',
    localTip: 'Abbinalo allo Zócalo, al Teatro Macedonio Alcalá o a un caffè vicino e controlla la mostra in corso all’arrivo.', safetyTip: 'La zona è centrale; visita di giorno o prima sera, tieni chiusi gli oggetti di valore e usa strade illuminate o trasporto registrato tardi.',
    bestTime: 'Tarda mattina o metà pomeriggio, quando le sale sono più tranquille', openingHours: 'Gli orari possono cambiare; conferma apertura, biglietti e chiusure su Google Maps prima della visita', nearby: 'Zócalo di Oaxaca, Teatro Macedonio Alcalá, Templo de Santo Domingo de Guzmán, Andador Alcalá, cattedrale', bring: 'Telefono carico, contanti piccoli, acqua, scarpe comode e strato leggero', accessibility: 'Edificio storico con passaggi, possibili scale o pavimenti irregolari; conferma l’ingresso accessibile prima.', booking: 'Non serve prenotazione app; prenota solo per inaugurazioni, visite guidate, conferenze o laboratori.'
  },
  pt: {
    name: 'Museu dos Pintores Oaxaquenhos', category: 'Cultura', area: 'Centro Histórico', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '$', priceLabel: '$', duration: '60 min',
    description: 'Uma nova parada cultural para a arte contemporânea de Oaxaca, em um prédio histórico central com exposições temporárias, pintura oaxaquenha, gráfica e galerias tranquilas.',
    bestFor: 'pintura oaxaquenha, exposições contemporâneas, arte gráfica, dia de chuva, pausa em galerias no centro', highlights: 'exposições temporárias, artistas de Oaxaca, prédio histórico, galerias calmas, localização central',
    localTip: 'Combine com o Zócalo, o Teatro Macedonio Alcalá ou um café próximo e confira a exposição atual ao chegar.', safetyTip: 'A área é central; visite de dia ou no começo da noite, mantenha valores fechados e use ruas iluminadas ou transporte registrado tarde.',
    bestTime: 'Fim da manhã ou meio da tarde, quando as salas estão mais tranquilas', openingHours: 'Horários podem mudar; confirme abertura, ingressos e fechamentos no Google Maps antes de visitar', nearby: 'Zócalo de Oaxaca, Teatro Macedonio Alcalá, Templo de Santo Domingo de Guzmán, Andador Alcalá, catedral', bring: 'Celular carregado, dinheiro trocado, água, sapatos confortáveis e camada leve', accessibility: 'Prédio histórico com transições, possíveis escadas ou piso irregular; confirme entrada acessível antes de ir.', booking: 'Não precisa reservar no app; reserve apenas para aberturas, visitas guiadas, palestras ou oficinas.'
  },
  ja: {
    name: 'オアハカ画家美術館', category: '文化', area: '歴史地区', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '$', priceLabel: '$', duration: '60分',
    description: 'オアハカの現代アートを楽しめる新しい文化スポット。中心部の歴史的建物で、企画展、オアハカの絵画、版画、静かなギャラリーを見られます。',
    bestFor: 'オアハカ絵画、現代展示、版画、雨の日の文化体験、中心部の静かなギャラリー時間', highlights: '企画展、オアハカの作家、歴史的建物、静かな展示室、中心部の立地',
    localTip: 'ソカロ、テアトロ・マセドニオ・アルカラ、近くのカフェと組み合わせるのがおすすめ。展示内容は時期で変わるので到着時に確認しましょう。', safetyTip: '中心部にありますが、日中または夕方早めの訪問が安心です。混雑する歩道では貴重品を閉じ、夜遅くは明るい道か登録済み交通を使いましょう。',
    bestTime: '午前遅めまたは午後半ば。展示室が落ち着き、中心部散策の合間に入りやすい時間です', openingHours: '展示時間は変わることがあります。訪問前にGoogleマップで開館、チケット、臨時休館を確認してください', nearby: 'オアハカ・ソカロ、Teatro Macedonio Alcalá、Templo de Santo Domingo de Guzmán、Andador Alcalá、大聖堂', bring: '充電済みの携帯、小額現金、水、歩きやすい靴、館内用の薄い羽織り', accessibility: '歴史的建物のため段差、階段、床の不整がある場合があります。アクセシブル入口を事前に確認してください。', booking: '通常見学にアプリ予約は不要です。オープニング、ガイドツアー、講演、ワークショップのみ予約を検討してください。'
  },
  zh: {
    name: '瓦哈卡画家博物馆', category: '文化', area: '历史中心', address: 'Av. de la Independencia 607, Centro, 68000 Oaxaca de Juárez, Oax., México', price: '$', priceLabel: '$', duration: '60分钟',
    description: '这是瓦哈卡当代艺术的一处全新文化站点，位于市中心历史建筑内，包含轮换展览、瓦哈卡绘画、版画作品、安静展厅，并可从索卡洛广场轻松步行抵达。',
    bestFor: '瓦哈卡绘画、当代展览、版画艺术、雨天文化计划、市中心安静画廊时间', highlights: '轮换展览、瓦哈卡艺术家、历史建筑、安静展厅、市中心位置',
    localTip: '可与索卡洛广场、马塞多尼奥·阿尔卡拉剧院或附近咖啡馆一起安排。展览会随季节变化，到达时先查看当前展览。', safetyTip: '这里位于市中心，建议白天或傍晚早些时候参观。在繁忙人行道上拉好贵重物品，注意 Independencia 街车流，深夜使用明亮道路或正规交通。',
    bestTime: '上午较晚或下午中段，展厅较安静，也适合穿插在市中心步行行程中', openingHours: '展览时间可能变化；参观前请在 Google 地图确认开放、票务和临时闭馆信息', nearby: '瓦哈卡索卡洛广场、Teatro Macedonio Alcalá、Templo de Santo Domingo de Guzmán、Andador Alcalá、大教堂', bring: '充好电的手机、小额现金、水、舒适鞋和室内薄外套', accessibility: '历史建筑内可能有过渡空间、楼梯或不平地面；如有无障碍需求，请提前确认入口。', booking: '普通参观无需应用预订；开幕活动、导览、讲座或工作坊可提前预约。'
  }
}, cultureCategories);

export const tlacolulaSundayMarketLocalized = simpleLocalizedCopy({
  name: 'Tianguis Dominical de Tlacolula', category: 'Markets', area: 'Tlacolula de Matamoros', address: 'Tlacolula de Matamoros, Oaxaca, México', price: '$', priceLabel: '$', duration: '2 hr',
  description: 'A brand-new market card for Tlacolula’s Sunday tianguis: a sprawling valley market of barbacoa aromas, produce aisles, textiles, clay, baskets, spices, flowers, and one of Oaxaca’s most memorable local market walks.',
  bestFor: 'Sunday market walk, barbacoa, produce stalls, textiles, baskets, spices, eastern-valley day trips', highlights: 'Sunday tianguis, barbacoa stands, market aisles, woven goods, clay pieces, valley-route food stops',
  localTip: 'Go on Sunday morning, walk one loop before buying, then choose a busy barbacoa or memela stand and keep small bills ready for snacks, textiles, and produce.', safetyTip: 'Visit in daylight, keep bags zipped in crowded aisles, carry small cash separately, confirm return transport before wandering far, and avoid flashing phones while negotiating or photographing.',
  bestTime: 'Sunday morning to early afternoon, before the densest market crowds and heat build up', openingHours: 'Sunday market activity changes by vendor; confirm current conditions and road time on Google Maps before leaving Oaxaca City', nearby: 'Templo de Santa María de la Asunción, Teotitlán del Valle, Mitla, Árbol del Tule, Santiago Matatlán', bring: 'Small bills, reusable tote, hat, water, hand sanitizer, comfortable shoes, and a saved pickup point', accessibility: 'Expect crowded aisles, uneven pavement, curbs, vendor tarps, carts, and limited seating; visitors with mobility needs should go early with a companion.', booking: 'No booking needed; for an easier visit, hire a trusted driver or join an eastern-valley market tour that includes pickup and return timing.'
}, {
  es: { category: 'Mercados', name: 'Tianguis Dominical de Tlacolula', area: 'Tlacolula de Matamoros', address: 'Tlacolula de Matamoros, Oaxaca, México', duration: '2 h', description: 'Una nueva tarjeta de mercado para el tianguis dominical de Tlacolula: barbacoa, frutas y verduras, textiles, barro, canastas, especias, flores y una de las caminatas de mercado más memorables de Oaxaca.', bestFor: 'tianguis dominical, barbacoa, puestos de frutas y verduras, textiles, canastas, especias, ruta de Valles Centrales', highlights: 'tianguis dominical, puestos de barbacoa, pasillos de mercado, textiles, barro, comida de valle', localTip: 'Ve el domingo por la mañana, da una vuelta antes de comprar y elige un puesto concurrido de barbacoa o memelas; lleva billetes pequeños.', safetyTip: 'Visita con luz de día, mantén la bolsa cerrada en pasillos llenos, separa el efectivo, confirma el transporte de regreso y evita mostrar el teléfono al negociar o tomar fotos.', bestTime: 'Domingo por la mañana hasta primeras horas de la tarde, antes del calor y las multitudes más densas', openingHours: 'La actividad cambia por vendedor; confirma condiciones y tiempo de camino en Google Maps antes de salir', nearby: 'Templo de Santa María de la Asunción, Teotitlán del Valle, Mitla, Árbol del Tule, Santiago Matatlán', bring: 'Billetes pequeños, bolsa reutilizable, sombrero, agua, gel antibacterial, zapatos cómodos y punto de recogida guardado', accessibility: 'Hay pasillos concurridos, pavimento irregular, banquetas, lonas, carritos y pocos asientos; si tienes movilidad limitada, ve temprano con acompañante.', booking: 'No requiere reserva; para una visita más fácil, contrata chofer confiable o tour de mercados de los Valles Centrales.' },
  fr: { category: 'Marchés', name: 'Tianguis dominical de Tlacolula', duration: '2 h', description: 'Une nouvelle carte marché pour le tianguis du dimanche de Tlacolula : barbacoa, produits frais, textiles, poterie, paniers, épices, fleurs et une marche de marché inoubliable.', bestFor: 'marché du dimanche, barbacoa, produits frais, textiles, paniers, épices, excursion dans la vallée', highlights: 'tianguis du dimanche, stands de barbacoa, allées du marché, textiles, poterie, haltes gourmandes', localTip: 'Venez dimanche matin, faites un tour complet avant d’acheter, puis choisissez un stand fréquenté de barbacoa ou de memelas avec de petites coupures.', safetyTip: 'Visitez de jour, gardez le sac fermé, répartissez les espèces, confirmez le transport retour et évitez d’exposer le téléphone en négociant ou en photographiant.' },
  de: { category: 'Märkte', name: 'Sonntags-Tianguis von Tlacolula', duration: '2 Std.', description: 'Eine neue Marktkarte für den sonntäglichen Tianguis von Tlacolula: Barbacoa-Duft, Obst- und Gemüsegänge, Textilien, Tonwaren, Körbe, Gewürze, Blumen und einer der eindrucksvollsten Marktspaziergänge Oaxacas.', bestFor: 'Sonntagsmarkt, Barbacoa, Obst- und Gemüsestände, Textilien, Körbe, Gewürze, Osttal-Route', highlights: 'Sonntags-Tianguis, Barbacoa-Stände, Marktgänge, Webwaren, Tonstücke, Tal-Essensstopps', localTip: 'Geh Sonntagvormittag, mache erst eine Runde und wähle dann einen belebten Barbacoa- oder Memela-Stand; kleine Scheine bereithalten.', safetyTip: 'Bei Tageslicht besuchen, Tasche geschlossen halten, Bargeld getrennt tragen, Rücktransport bestätigen und Handy beim Handeln oder Fotografieren nicht offen zeigen.' },
  it: { category: 'Mercati', name: 'Tianguis domenicale di Tlacolula', duration: '2 h', description: 'Una nuova scheda mercato per il tianguis domenicale di Tlacolula: barbacoa, prodotti freschi, tessuti, ceramica, cesti, spezie, fiori e una delle passeggiate di mercato più memorabili di Oaxaca.', bestFor: 'mercato domenicale, barbacoa, banchi di prodotti freschi, tessuti, cesti, spezie, gite nella valle orientale', highlights: 'tianguis domenicale, banchi di barbacoa, corsie del mercato, tessuti, ceramiche, tappe gastronomiche', localTip: 'Vai la domenica mattina, fai un giro prima di comprare e scegli un banco affollato di barbacoa o memelas con banconote piccole.', safetyTip: 'Visita di giorno, tieni la borsa chiusa, dividi il contante, conferma il rientro e non mostrare troppo il telefono mentre tratti o fotografi.' },
  pt: { category: 'Mercados', name: 'Tianguis Dominical de Tlacolula', duration: '2 h', description: 'Um novo cartão de mercado para o tianguis de domingo de Tlacolula: aromas de barbacoa, hortifrútis, têxteis, barro, cestos, especiarias, flores e uma caminhada de mercado inesquecível.', bestFor: 'mercado de domingo, barbacoa, bancas de produtos, têxteis, cestos, especiarias, rota do vale oriental', highlights: 'tianguis de domingo, bancas de barbacoa, corredores de mercado, peças tecidas, barro, comida do vale', localTip: 'Vá no domingo de manhã, dê uma volta antes de comprar e escolha uma banca movimentada de barbacoa ou memelas; leve notas pequenas.', safetyTip: 'Visite de dia, mantenha a bolsa fechada, separe dinheiro pequeno, confirme transporte de volta e evite exibir o celular ao negociar ou fotografar.' },
  ja: { category: '市場', name: 'トラコルーラ日曜市', area: 'トラコルーラ・デ・マタモロス', duration: '2時間', description: 'トラコルーラの日曜ティアンギスを紹介する新しい市場カード。バルバコアの香り、青果、織物、陶器、かご、スパイス、花が並び、オアハカらしい市場歩きを楽しめます。', bestFor: '日曜市、バルバコア、青果屋台、織物、かご、スパイス、東バレーの日帰りルート', highlights: '日曜ティアンギス、バルバコア屋台、市場の通路、織物、陶器、谷の食の立ち寄り先', localTip: '日曜の午前に訪れ、まず一周してから買い物を。混んでいるバルバコアやメメラの店を選び、小額紙幣を用意しましょう。', safetyTip: '日中に訪れ、混雑した通路ではバッグを閉じ、現金を分けて持ち、帰りの交通を確認し、交渉や撮影中にスマホを目立たせないでください。' },
  zh: { category: '市场', name: 'Tlacolula 周日集市', area: '特拉科卢拉德马塔莫罗斯', duration: '2小时', description: '为 Tlacolula 周日 tianguis 打造的全新市场卡片：烤羊肉香气、蔬果通道、纺织品、陶器、篮子、香料、鲜花，以及瓦哈卡最难忘的本地市场漫步之一。', bestFor: '周日集市、barbacoa 烤肉、蔬果摊、纺织品、篮子、香料、东部山谷一日游', highlights: '周日 tianguis、barbacoa 摊位、市场通道、编织品、陶器、山谷美食停靠点', localTip: '周日上午前往，购买前先完整逛一圈，再选择人气高的 barbacoa 或 memela 摊位，并准备小额现金。', safetyTip: '请在白天前往，在拥挤通道中拉好包，现金分开放，逛远前确认返程交通，议价或拍照时避免显眼展示手机。' }
}, marketCategories);

export const mercadoDeTlacolulaLocalized = localizedByLanguage({
  name: 'Mercado de Tlacolula', category: 'Markets', area: 'Tlacolula de Matamoros', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., México', price: '$', priceLabel: '$', duration: '2 hr',
  description: 'A brand-new market card for Mercado de Tlacolula: a classic eastern-valley market known for Sunday tianguis energy, barbacoa aromas, produce aisles, textiles, spices, baskets, flowers, and one of Oaxaca’s most memorable local market walks.',
  bestFor: 'Sunday market walk, barbacoa, produce stalls, textiles, baskets, spices, eastern-valley day trips', highlights: 'Mercado de Tlacolula, Sunday tianguis, barbacoa stands, produce aisles, textiles, clay pieces, valley-route food stops',
  localTip: 'Go on Sunday morning for the fullest market energy, walk one loop before buying, and choose a busy barbacoa or memela stand. Carry small bills and ask politely before photographing vendors.', safetyTip: 'Visit in daylight, keep your bag zipped in crowded aisles, use small cash, confirm return transport before wandering far, and avoid flashing phones while negotiating or photographing.',
  bestTime: 'Sunday morning to early afternoon, before the densest market crowds and heat build up', openingHours: 'Market activity varies by day and vendor; confirm current activity on Google Maps before leaving Oaxaca City', nearby: 'Templo de Santa María de la Asunción, Teotitlán del Valle, Mitla, Árbol del Tule, Santiago Matatlán', bring: 'Small bills, reusable tote, hat, water, hand sanitizer, comfortable shoes, and a saved pickup point', accessibility: 'Expect crowded aisles, uneven pavement, curbs, vendor tarps, carts, and limited seating; visitors with mobility needs should go early with a companion.', booking: 'No booking needed; for an easier visit, hire a trusted driver or join an eastern-valley market tour that includes pickup and return timing.'
}, {
  es: { name: 'Mercado de Tlacolula', category: 'Mercados', area: 'Tlacolula de Matamoros', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., México', price: '$', priceLabel: '$', duration: '2 h', description: 'Una tarjeta nueva de mercado para el Mercado de Tlacolula: un clásico de los Valles Centrales con energía de tianguis dominical, barbacoa, frutas y verduras, textiles, especias, canastas, flores y una de las caminatas de mercado más memorables de Oaxaca.', bestFor: 'tianguis dominical, barbacoa, puestos de frutas y verduras, textiles, canastas, especias, ruta de Valles Centrales', highlights: 'Mercado de Tlacolula, tianguis dominical, puestos de barbacoa, pasillos de mercado, textiles, barro, comida de valle', localTip: 'Ve el domingo por la mañana para vivir el mercado completo, da una vuelta antes de comprar y elige un puesto concurrido de barbacoa o memelas; lleva billetes pequeños.', safetyTip: 'Visita con luz de día, mantén la bolsa cerrada en pasillos llenos, separa el efectivo, confirma el transporte de regreso y evita mostrar el teléfono al negociar o tomar fotos.', bestTime: 'Domingo por la mañana hasta primeras horas de la tarde, antes del calor y las multitudes más densas', openingHours: 'La actividad cambia por día y vendedor; confirma condiciones y tiempo de camino en Google Maps antes de salir', nearby: 'Templo de Santa María de la Asunción, Teotitlán del Valle, Mitla, Árbol del Tule, Santiago Matatlán', bring: 'Billetes pequeños, bolsa reutilizable, sombrero, agua, gel antibacterial, zapatos cómodos y punto de recogida guardado', accessibility: 'Hay pasillos concurridos, pavimento irregular, banquetas, lonas, carritos y pocos asientos; si tienes movilidad limitada, ve temprano con acompañante.', booking: 'No requiere reserva; para una visita más fácil, contrata chofer confiable o tour de mercados de los Valles Centrales.' },
  fr: { name: 'Marché de Tlacolula', category: 'Marchés', area: 'Tlacolula de Matamoros', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., Mexique', duration: '2 h', description: 'Une nouvelle fiche marché pour le Mercado de Tlacolula : marché de quartier pratique avec produits frais, comptoirs de cuisine, tortillas, fruits de saison et rythme local loin des axes touristiques les plus chargés.', bestFor: 'marché de quartier, produits frais, cuisine locale simple, tortillas fraîches, achats quotidiens, photos discrètes', highlights: 'marché municipal, allées de produits, comptoirs de cuisine, tortillas, fruits, commerce de quartier', localTip: 'Venez le matin, faites un tour avant d’acheter et choisissez les stands fréquentés. Prenez de petites coupures et demandez avant de photographier.', safetyTip: 'Visitez de jour, gardez le sac fermé, utilisez de petites espèces, surveillez sols humides et seuils irréguliers, puis repartez par une route éclairée ou un taxi fiable.' },
  de: { name: 'Mercado de Tlacolula', category: 'Märkte', area: 'Tlacolula de Matamoros', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., Mexiko', duration: '2 Std.', description: 'Eine neue Marktkarte für den Mercado de Tlacolula: ein praktischer Viertelmarkt mit Obst- und Gemüsegängen, Essensständen, frischen Tortillas, saisonalem Obst und lokalem Alltag abseits der vollsten Touristenwege.', bestFor: 'Viertelmarkt, Obst und Gemüse, einfaches lokales Essen, frische Tortillas, Alltagseinkäufe, diskrete Fotos', highlights: 'kommunaler Markt, Produktgänge, Essensstände, Tortillas, Obst, Nachbarschaftshandel', localTip: 'Geh morgens, drehe vor dem Einkauf eine Runde und wähle gut besuchte Stände. Kleine Scheine mitnehmen und vor Fotos höflich fragen.', safetyTip: 'Bei Tageslicht besuchen, Tasche geschlossen halten, kleines Bargeld nutzen, auf nasse Böden achten und mit beleuchteter Route oder verlässlichem Taxi zurückkehren.' },
  it: { name: 'Mercado de Tlacolula', category: 'Mercati', area: 'Tlacolula de Matamoros', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., Messico', duration: '2 h', description: 'Una nuova scheda mercato per il Mercado de Tlacolula: mercato di quartiere pratico con prodotti freschi, banchi di cibo pronto, tortillas, frutta di stagione e ritmo locale lontano dai corridoi turistici più affollati.', bestFor: 'mercato di quartiere, prodotti freschi, cibo locale semplice, tortillas fresche, spesa quotidiana, foto discrete', highlights: 'mercato municipale, corsie di prodotti, banchi di cibo, tortillas, frutta, commercio di quartiere', localTip: 'Vai al mattino, fai un giro prima di comprare e scegli i banchi più frequentati. Porta banconote piccole e chiedi prima di fotografare.', safetyTip: 'Visita di giorno, tieni la borsa chiusa, usa contanti piccoli, attenzione a pavimenti bagnati e soglie irregolari, e rientra con taxi affidabile o percorso illuminato.' },
  pt: { name: 'Mercado de Tlacolula', category: 'Mercados', area: 'Tlacolula de Matamoros', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., México', duration: '2 h', description: 'Um novo cartão de mercado para o Mercado de Tlacolula: mercado de bairro prático com produtos frescos, bancas de comida preparada, tortillas, frutas da estação e ritmo local longe dos corredores turísticos mais cheios.', bestFor: 'mercado de bairro, produtos frescos, comida local casual, tortillas frescas, compras do dia a dia, fotos discretas', highlights: 'mercado municipal, corredores de produtos, bancas de comida, tortillas, frutas, comércio de bairro', localTip: 'Vá pela manhã, dê uma volta antes de comprar e escolha bancas movimentadas. Leve notas pequenas e peça permissão antes de fotografar.', safetyTip: 'Visite de dia, mantenha a bolsa fechada, use dinheiro trocado, cuidado com piso molhado e soleiras irregulares, e volte por rota iluminada ou táxi confiável.' },
  ja: { name: 'トラコルーラ市場', category: '市場', area: 'トラコルーラ・デ・マタモロス', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., México', price: '$', priceLabel: '$', duration: '2時間', description: 'Mercado de Tlacolula を紹介する新しい市場カード。青果の通路、惣菜カウンター、焼きたてのトルティーヤ、季節の果物、観光客の多い通りから少し離れた日常的なローカル感を楽しめます。', bestFor: '地区の市場歩き、青果屋台、気軽な地元料理、焼きたてトルティーヤ、日常の買い物、控えめな写真', highlights: '市営市場、青果通路、惣菜カウンター、トルティーヤ、果物、地区の日常商い', localTip: '朝に訪れ、買う前に一周して、混んでいる食べ物や青果の店を選びましょう。小額紙幣を持ち、撮影前には必ず許可を得てください。', safetyTip: '日中に訪れ、混雑した通路ではバッグを閉じ、小額現金を使い、濡れた床や段差に注意してください。帰りは明るい道か信頼できるタクシーを利用しましょう。' },
  zh: { name: 'Tlacolula 市场', category: '市场', area: '特拉科卢拉德马塔莫罗斯', address: 'Mercado de Tlacolula, Tlacolula de Matamoros, Oax., México', price: '$', priceLabel: '$', duration: '2小时', description: '为 Mercado de Tlacolula 打造的全新市场卡片：这里有蔬果通道、熟食摊位、新鲜玉米饼、时令水果，以及远离最拥挤旅游街区的日常本地节奏。', bestFor: '社区市场漫步、蔬果摊、轻松本地小吃、新鲜玉米饼、日常购物、低调拍照', highlights: '市政市场、蔬果通道、熟食摊、新鲜玉米饼、水果、社区日常商业', localTip: '建议上午前往，购买前先慢慢绕一圈，选择人气较高的食物或蔬果摊。准备小额现金，拍摄摊主或商品前请礼貌询问。', safetyTip: '请在白天前往，在拥挤通道中拉好包，使用小额现金，注意湿滑地面和不平门槛，离开时选择明亮路线或可靠出租车。' }
}, marketCategories);

export const arbolOverride = (id) => cardOverride(arbolDelTuleLocalized, {
  id,
  category: 'nature',
  rating: 4.8,
  emoji: '🌳',
  accent: '104 42% 31%',
  neighborhood: 'Santa María del Tule',
  lat: 17.0464,
  lng: -96.6353,
  image: arbolDelTuleImage,
  maps: 'https://www.google.com/maps/search/?api=1&query=%C3%81rbol%20del%20Tule%20Santa%20Mar%C3%ADa%20del%20Tule%20Oaxaca',
  photos: 'https://www.google.com/maps/search/%C3%81rbol%20del%20Tule%20Santa%20Mar%C3%ADa%20del%20Tule%20Oaxaca%20photos'
});

export const normalizedPlaceText = (value = '') => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const matchesArbolDelTule = (place = {}) => {
  const haystack = normalizedPlaceText(`${place.id || ''} ${place.name || ''} ${place.area || ''} ${place.address || ''} ${place.description || ''}`);
  return (haystack.includes('arbol') && haystack.includes('tule')) || haystack.includes('santa maria del tule');
};

export const jalatlacoMuralsImage = '/api/apps/romcWH54d4SR/assets/visual-editor/BarriodeJalatlacomurals.jpg';

export const jalatlacoMuralsLocalized = localizedByLanguage({
  name: 'Jalatlaco Mural Walk', category: 'Culture', area: 'Barrio de Jalatlaco', address: 'Barrio de Jalatlaco, Oaxaca de Juárez, Oax., México', price: 'Free', priceLabel: 'Free', duration: '60 min',
  description: 'A brand-new culture card for wandering Jalatlaco’s colorful mural streets, cobblestone lanes, letter arch photo spot, cafés, boutique hotels, and neighborhood corners that show Oaxaca’s everyday creative energy.',
  bestFor: 'murals, street photography, colorful streets, neighborhood walk, cafés, relaxed culture stop', highlights: 'mural-filled streets, Jalatlaco letter arch, cobblestones, cafés, colorful houses, easy Centro-adjacent walk',
  localTip: 'Go slowly in the morning or late afternoon, start near the Jalatlaco letter arch, then follow the side streets for murals, coffee, and quieter photo angles away from traffic.', safetyTip: 'Visit in daylight or early evening, keep phones secure while taking photos, watch uneven cobblestones and curbs, and use well-lit streets or registered transport after dark.',
  bestTime: 'Morning for quieter lanes or late afternoon for warm color on the murals', openingHours: 'Open-air neighborhood walk; individual cafés and shops vary, so confirm current hours on Google Maps before going', nearby: 'Parque El Llano, Santo Domingo, Andador Alcalá, El Tendajón Oaxaca, Lechoncito de Oro', bring: 'Comfortable shoes, water, a charged phone or camera, sun protection, and small cash for cafés or snacks', accessibility: 'Expect cobblestones, narrow sidewalks, curbs, traffic crossings, and occasional slopes; travelers with mobility needs should move slowly and choose wider streets.', booking: 'No booking needed; visit independently in daylight or join a guided photo or neighborhood walk for extra context.'
}, {
  es: { name: 'Paseo de Murales de Jalatlaco', category: 'Cultura', area: 'Barrio de Jalatlaco', price: 'Gratis', priceLabel: 'Gratis', duration: '60 min', description: 'Una nueva tarjeta cultural para caminar por las calles llenas de murales de Jalatlaco, con empedrado, arco de letras, cafés, hoteles boutique y rincones coloridos del barrio.', bestFor: 'murales, fotografía urbana, calles coloridas, paseo de barrio, cafés, cultura tranquila', highlights: 'calles con murales, arco de letras de Jalatlaco, empedrado, cafés, casas coloridas, caminata cerca del Centro', localTip: 'Ve por la mañana o al final de la tarde, empieza cerca del arco de letras y sigue por calles laterales para encontrar murales, café y mejores ángulos.', safetyTip: 'Visita con luz de día o al inicio de la noche, cuida el celular al tomar fotos, mira el empedrado y usa calles iluminadas o transporte registrado después de oscurecer.' },
  fr: { name: 'Promenade des fresques de Jalatlaco', category: 'Culture', area: 'Barrio de Jalatlaco', price: 'Gratuit', priceLabel: 'Gratuit', duration: '60 min', description: 'Une nouvelle fiche culturelle pour parcourir les rues colorées de Jalatlaco, entre fresques murales, pavés, arche de lettres, cafés et coins photogéniques du quartier.', bestFor: 'fresques, photo de rue, rues colorées, balade de quartier, cafés', highlights: 'rues peintes, arche de Jalatlaco, pavés, cafés, maisons colorées, promenade près du Centro', localTip: 'Allez-y le matin ou en fin d’après-midi, commencez près de l’arche et suivez les rues latérales pour des fresques et angles plus calmes.', safetyTip: 'Visitez de jour ou en début de soirée, gardez le téléphone en sécurité, surveillez les pavés et utilisez des rues éclairées ou un transport enregistré après la nuit.' },
  de: { name: 'Jalatlaco-Muralspaziergang', category: 'Kultur', area: 'Barrio de Jalatlaco', price: 'Kostenlos', priceLabel: 'Kostenlos', duration: '60 Min.', description: 'Eine neue Kulturkarte für Jalatlacos farbenfrohe Straßen mit Murals, Kopfsteinpflaster, Buchstabenbogen, Cafés, Boutique-Hotels und kreativen Viertel-Ecken.', bestFor: 'Murals, Straßenfotografie, bunte Straßen, Viertelspaziergang, Cafés', highlights: 'Mural-Straßen, Jalatlaco-Buchstabenbogen, Kopfsteinpflaster, Cafés, bunte Häuser, Centro-nahe Runde', localTip: 'Geh morgens oder am späten Nachmittag, starte am Buchstabenbogen und folge Seitenstraßen für ruhigere Murals und Fotowinkel.', safetyTip: 'Bei Tageslicht oder frühem Abend besuchen, Handy beim Fotografieren sicher halten, Kopfsteinpflaster beachten und nach Dunkelheit helle Straßen oder registrierten Transport nutzen.' },
  it: { name: 'Passeggiata dei murales di Jalatlaco', category: 'Cultura', area: 'Barrio de Jalatlaco', price: 'Gratuito', priceLabel: 'Gratuito', duration: '60 min', description: 'Una nuova scheda cultura per esplorare le strade colorate di Jalatlaco, tra murales, ciottoli, arco con lettere, caffè e angoli creativi del quartiere.', bestFor: 'murales, fotografia urbana, strade colorate, passeggiata di quartiere, caffè', highlights: 'strade con murales, arco di Jalatlaco, ciottoli, caffè, case colorate, passeggiata vicino al Centro', localTip: 'Vai al mattino o nel tardo pomeriggio, inizia dall’arco e segui le vie laterali per murales e foto più tranquille.', safetyTip: 'Visita di giorno o in prima serata, tieni sicuro il telefono mentre fotografi, fai attenzione ai ciottoli e usa strade illuminate o trasporto registrato dopo il buio.' },
  pt: { name: 'Caminhada dos Murais de Jalatlaco', category: 'Cultura', area: 'Barrio de Jalatlaco', price: 'Gratuito', priceLabel: 'Gratuito', duration: '60 min', description: 'Um novo cartão cultural para caminhar pelas ruas coloridas de Jalatlaco, com murais, paralelepípedos, arco de letras, cafés e cantos criativos do bairro.', bestFor: 'murais, fotografia de rua, ruas coloridas, caminhada de bairro, cafés', highlights: 'ruas com murais, arco de letras de Jalatlaco, paralelepípedos, cafés, casas coloridas, caminhada perto do Centro', localTip: 'Vá de manhã ou no fim da tarde, comece no arco de letras e siga pelas ruas laterais para murais e ângulos mais tranquilos.', safetyTip: 'Visite de dia ou no começo da noite, mantenha o celular seguro ao fotografar, cuidado com o piso irregular e use ruas iluminadas ou transporte registrado após escurecer.' },
  ja: { name: 'ハラトラコ壁画散歩', category: '文化', area: 'ハラトラコ地区', address: 'Barrio de Jalatlaco, Oaxaca de Juárez, Oax., México', price: '無料', priceLabel: '無料', duration: '60分', description: 'ハラトラコのカラフルな壁画通りを歩く新しい文化カード。石畳、文字アーチ、カフェ、ブティックホテル、写真映えする街角を楽しめます。', bestFor: '壁画、ストリート写真、色鮮やかな通り、地区散歩、カフェ', highlights: '壁画の通り、ハラトラコ文字アーチ、石畳、カフェ、カラフルな家、セントロ近くの散歩', localTip: '朝または夕方に、文字アーチ付近から始めて脇道をゆっくり歩くと、静かな壁画や写真スポットが見つかります。', safetyTip: '日中または早い夕方に訪れ、撮影中のスマホ管理に注意し、石畳や縁石に気をつけ、暗くなったら明るい道や登録済み交通を利用してください。' },
  zh: { name: 'Jalatlaco 壁画街区漫步', category: '文化', area: 'Jalatlaco 街区', address: 'Barrio de Jalatlaco, Oaxaca de Juárez, Oax., México', price: '免费', priceLabel: '免费', duration: '60分钟', description: '一张全新的文化地点卡片：漫步 Jalatlaco 色彩鲜明的壁画街道、鹅卵石小巷、字母拱门、咖啡馆、精品酒店和充满创意的街角。', bestFor: '壁画、街头摄影、彩色街道、街区漫步、咖啡馆、轻松文化停靠', highlights: '壁画街道、Jalatlaco 字母拱门、鹅卵石路、咖啡馆、彩色房屋、靠近历史中心的步行路线', localTip: '建议早晨或傍晚慢慢逛，从 Jalatlaco 字母拱门附近开始，再走进侧街寻找壁画、咖啡和更安静的拍照角度。', safetyTip: '建议白天或傍晚较早前往；拍照时收好手机，注意鹅卵石路和路缘，天黑后使用照明良好的街道或正规交通。' }
});

export const extraPlaceCategoryNames = {
  food: { en: 'Food', es: 'Comida', fr: 'Cuisine', de: 'Essen', it: 'Cibo', pt: 'Comida', ja: '食事', zh: '美食' },
  culture: cultureCategories,
  nature: natureCategories,
  markets: marketCategories,
  mezcal: { en: 'Mezcal', es: 'Mezcal', fr: 'Mezcal', de: 'Mezcal', it: 'Mezcal', pt: 'Mezcal', ja: 'メスカル', zh: '梅斯卡尔' },
  artisan: { en: 'Artisan', es: 'Artesanía', fr: 'Artisanat', de: 'Kunsthandwerk', it: 'Artigianato', pt: 'Artesanato', ja: '工芸', zh: '手工艺' }
};

export const extraPlaceCategoryImages = {
  food: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFtc5I_akratNyPFvBKIgAQk-sBhCwm4YwZ1PAk8VKd5r_kTJ9GVDUS45rdtAjP17gmL1vc2frRGAdJefZUed_Dsu_tfX2SFRz3RUzmtQbIbbjNuG8SO0j4knh0QknxKIHiiabPrw=w408-h544-k-no',
  culture: temploSantoDomingoImage,
  nature: hierveElAguaImage,
  markets: mercadoDeTlacolulaImage,
  mezcal: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHSyhDyKuHdYG1H1L-lFJpxldzAndDzrMajpPqVEHIK5zEOjWSVcDlX17sMoG5hIJHmPn8pNMJ7CJGRwx8n_zH2oN_7-kmx-OmHH5nha30StCb5lUQ5WSJKYwLLP0Bj1JMYf6uihvqpY2c=w408-h306-k-no',
  artisan: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGWbR79zE6YDFhLr02plYHjA4TeD7XRiZ2KUIGiTHvluZVLG7bEImk8r9j08VzIEE54LcvLoQXAMkIBjgo5a5DUdi7ADCOsSzPJ1k2DJV9PxgoxUEcJbjjGXkSJOZr2aPxfLs2C=w408-h306-k-no'
};

export const extraPlaceCategoryDefaults = {
  food: { duration: '75 min', emoji: '🍽️', accent: '18 71% 42%', price: '$$' },
  culture: { duration: '75 min', emoji: '🏛️', accent: '275 48% 42%', price: '$' },
  nature: { duration: '2 hr', emoji: '🌿', accent: '145 42% 34%', price: '$' },
  markets: { duration: '75 min', emoji: '🧺', accent: '28 78% 45%', price: '$' },
  mezcal: { duration: '90 min', emoji: '🥃', accent: '82 34% 35%', price: '$$' },
  artisan: { duration: '90 min', emoji: '🎨', accent: '24 75% 44%', price: '$$' }
};

export const extraPlaceCopy = {
  en: {
    description: (item) => `A newly added Oaxaca recommendation for ${item.name}, curated from Google Maps references so travelers can compare current directions, recent visitor photos, and nearby stops before going.`,
    bestFor: (item) => item.bestFor || `${item.type || 'local recommendation'}, neighborhood exploring, independent Oaxaca planning, Google Maps handoff`,
    highlights: (item) => item.highlights || `${item.name}, ${item.area}, local context, photos, practical route planning`,
    localTip: (item) => item.localTip || `Open the Google Maps photos before you go, save the stop offline, and pair it with another nearby place in ${item.area} to avoid backtracking.`,
    safetyTip: (item) => item.safetyTip || `Confirm current hours and route conditions on Google Maps, visit in daylight when possible, keep valuables zipped, and use trusted transport after dark.`,
    bestTime: () => 'Morning or late afternoon, after confirming current hours on Google Maps',
    openingHours: () => 'Hours can change; confirm the live listing on Google Maps before leaving',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => 'Water, comfortable shoes, small bills, a charged phone, and the Google Maps listing saved offline',
    accessibility: () => 'Expect uneven sidewalks, historic paving, narrow entrances, or rural surfaces; verify accessibility on Google Maps before visiting.',
    booking: () => 'No TuTour booking is required; reserve ahead only for restaurants, tastings, workshops, or guided visits that request it.'
  },
  es: {
    description: (item) => `Nueva recomendación de Oaxaca para ${item.name}, curada con referencias de Google Maps para comparar indicaciones actuales, fotos recientes y paradas cercanas antes de ir.`,
    bestFor: (item) => item.bestForEs || 'recomendación local, explorar barrios, planear Oaxaca de forma independiente, enlace a Google Maps',
    highlights: (item) => item.highlightsEs || item.highlights || `${item.name}, ${item.area}, contexto local, fotos, planeación práctica de ruta`,
    localTip: (item) => item.localTipEs || `Abre las fotos de Google Maps antes de salir, guarda la parada sin conexión y combínala con otro lugar cercano en ${item.area}.`,
    safetyTip: () => 'Confirma horarios y ruta en Google Maps, visita con luz de día cuando sea posible, lleva valores cerrados y usa transporte confiable después de oscurecer.',
    bestTime: () => 'Mañana o final de la tarde, después de confirmar horarios en Google Maps',
    openingHours: () => 'Los horarios pueden cambiar; confirma la ficha activa en Google Maps antes de salir',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => 'Agua, zapatos cómodos, billetes pequeños, celular cargado y la ficha de Google Maps guardada',
    accessibility: () => 'Puede haber banquetas irregulares, cantera histórica, entradas estrechas o superficies rurales; verifica accesibilidad en Google Maps.',
    booking: () => 'No requiere reserva de TuTour; reserva solo restaurantes, catas, talleres o visitas guiadas que lo pidan.'
  },
  fr: {
    description: (item) => `Nouvelle recommandation à Oaxaca pour ${item.name}, sélectionnée avec des références Google Maps afin de vérifier itinéraires, photos récentes et haltes voisines avant la visite.`,
    bestFor: () => 'recommandation locale, exploration de quartier, planification indépendante, lien Google Maps',
    highlights: (item) => item.highlights || `${item.name}, ${item.area}, contexte local, photos, itinéraire pratique`,
    localTip: (item) => `Consultez les photos Google Maps, enregistrez l'arrêt hors ligne et combinez-le avec une autre adresse proche à ${item.area}.`,
    safetyTip: () => 'Vérifiez horaires et itinéraires sur Google Maps, privilégiez le jour, gardez vos objets fermés et utilisez un transport fiable après la nuit.',
    bestTime: () => 'Matin ou fin d’après-midi, après vérification des horaires sur Google Maps',
    openingHours: () => 'Les horaires changent; vérifiez la fiche Google Maps avant de partir',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => 'Eau, chaussures confortables, petites coupures, téléphone chargé et fiche Google Maps enregistrée',
    accessibility: () => 'Prévoir trottoirs irréguliers, pavés, entrées étroites ou surfaces rurales; vérifiez l’accessibilité sur Google Maps.',
    booking: () => 'Aucune réservation TuTour; réservez seulement restaurants, dégustations, ateliers ou visites guidées qui le demandent.'
  },
  de: {
    description: (item) => `Neue Oaxaca-Empfehlung für ${item.name}, mit Google-Maps-Referenzen kuratiert, damit du aktuelle Routen, Fotos und nahe Stopps prüfen kannst.`,
    bestFor: () => 'lokale Empfehlung, Viertel erkunden, unabhängige Planung, Google-Maps-Übergabe',
    highlights: (item) => item.highlights || `${item.name}, ${item.area}, lokaler Kontext, Fotos, praktische Routenplanung`,
    localTip: (item) => `Öffne vorher die Google-Maps-Fotos, speichere den Stopp offline und kombiniere ihn mit einem nahegelegenen Ort in ${item.area}.`,
    safetyTip: () => 'Prüfe Zeiten und Route auf Google Maps, gehe möglichst bei Tageslicht, trage Wertsachen geschlossen und nutze nach Dunkelheit vertrauenswürdigen Transport.',
    bestTime: () => 'Morgens oder später Nachmittag, nach Prüfung der Zeiten auf Google Maps',
    openingHours: () => 'Zeiten können wechseln; prüfe vor dem Aufbruch den Live-Eintrag auf Google Maps',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => 'Wasser, bequeme Schuhe, kleine Scheine, geladenes Telefon und gespeicherten Google-Maps-Eintrag',
    accessibility: () => 'Unebene Gehwege, historisches Pflaster, enge Eingänge oder ländliche Böden sind möglich; Barrierefreiheit auf Google Maps prüfen.',
    booking: () => 'Keine TuTour-Buchung nötig; reserviere nur Restaurants, Verkostungen, Workshops oder Führungen, die es verlangen.'
  },
  it: {
    description: (item) => `Nuova raccomandazione per Oaxaca: ${item.name}, curata con riferimenti Google Maps per controllare indicazioni, foto recenti e tappe vicine prima di partire.`,
    bestFor: () => 'consiglio locale, esplorazione di quartiere, pianificazione indipendente, link Google Maps',
    highlights: (item) => item.highlights || `${item.name}, ${item.area}, contesto locale, foto, pianificazione pratica`,
    localTip: (item) => `Guarda le foto di Google Maps, salva la tappa offline e abbinala a un altro luogo vicino a ${item.area}.`,
    safetyTip: () => 'Conferma orari e percorso su Google Maps, visita di giorno quando possibile, tieni chiusi gli oggetti di valore e usa trasporto affidabile dopo il buio.',
    bestTime: () => 'Mattina o tardo pomeriggio, dopo aver confermato gli orari su Google Maps',
    openingHours: () => 'Gli orari possono cambiare; controlla la scheda Google Maps prima di uscire',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => 'Acqua, scarpe comode, contanti piccoli, telefono carico e scheda Google Maps salvata',
    accessibility: () => 'Possibili marciapiedi irregolari, pavé storico, ingressi stretti o superfici rurali; verifica l’accessibilità su Google Maps.',
    booking: () => 'Nessuna prenotazione TuTour; prenota solo ristoranti, degustazioni, laboratori o visite guidate che lo richiedono.'
  },
  pt: {
    description: (item) => `Nova recomendação de Oaxaca para ${item.name}, curada com referências do Google Maps para conferir rotas atuais, fotos recentes e paradas próximas antes de ir.`,
    bestFor: () => 'recomendação local, explorar bairros, planejamento independente, link para Google Maps',
    highlights: (item) => item.highlights || `${item.name}, ${item.area}, contexto local, fotos, planejamento prático`,
    localTip: (item) => `Abra as fotos do Google Maps, salve a parada offline e combine com outro lugar próximo em ${item.area}.`,
    safetyTip: () => 'Confirme horários e rota no Google Maps, visite de dia quando possível, mantenha valores fechados e use transporte confiável depois de escurecer.',
    bestTime: () => 'Manhã ou fim da tarde, depois de confirmar horários no Google Maps',
    openingHours: () => 'Horários podem mudar; confirme a ficha ativa no Google Maps antes de sair',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => 'Água, sapatos confortáveis, notas pequenas, celular carregado e ficha do Google Maps salva',
    accessibility: () => 'Pode haver calçadas irregulares, piso histórico, entradas estreitas ou superfícies rurais; verifique acessibilidade no Google Maps.',
    booking: () => 'Não requer reserva no TuTour; reserve apenas restaurantes, degustações, oficinas ou visitas guiadas que pedirem.'
  },
  ja: {
    description: (item) => `${item.name} の新しいオアハカおすすめカードです。Google マップの参照で、最新ルート、写真、近くの立ち寄り先を確認できます。`,
    bestFor: () => 'ローカルおすすめ、地区散策、自由な旅程づくり、Google マップ連携',
    highlights: (item) => item.highlights || `${item.name}、${item.area}、地域情報、写真、実用的なルート計画`,
    localTip: (item) => `出発前に Google マップの写真を見て、スポットを保存し、${item.area} 周辺の別の場所と組み合わせましょう。`,
    safetyTip: () => '営業時間とルートを Google マップで確認し、できれば日中に訪問し、貴重品を閉じて持ち、暗くなったら信頼できる交通手段を使ってください。',
    bestTime: () => 'Google マップで営業時間を確認した後の午前または夕方前',
    openingHours: () => '営業時間は変わる場合があります。出発前に Google マップで確認してください',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => '水、歩きやすい靴、小額現金、充電済みの携帯、保存した Google マップ情報',
    accessibility: () => '歩道の凹凸、石畳、狭い入口、未舗装面がある場合があります。Google マップでアクセシビリティを確認してください。',
    booking: () => 'TuTour 予約は不要です。レストラン、試飲、工房、ガイド付き訪問のみ必要に応じて予約してください。'
  },
  zh: {
    description: (item) => `${item.name} 的全新瓦哈卡推荐卡片，基于 Google 地图参考，方便出发前查看当前路线、近期照片和附近站点。`,
    bestFor: () => '本地推荐、街区探索、自由规划、Google 地图跳转',
    highlights: (item) => item.highlights || `${item.name}、${item.area}、本地背景、照片、实用路线规划`,
    localTip: (item) => `出发前先查看 Google 地图照片，离线保存站点，并与 ${item.area} 附近的另一个地点搭配安排。`,
    safetyTip: () => '请在 Google 地图确认营业时间和路线，尽量白天前往，拉好贵重物品，天黑后使用可靠交通。',
    bestTime: () => '在 Google 地图确认时间后的上午或傍晚前',
    openingHours: () => '营业时间可能变化；出发前请确认 Google 地图实时信息',
    nearby: (item) => item.nearby || `${item.area}, Oaxaca`,
    bring: () => '水、舒适鞋、小额现金、充好电的手机，以及已保存的 Google 地图信息',
    accessibility: () => '可能有不平人行道、历史石路、狭窄入口或乡村路面；请先在 Google 地图确认无障碍信息。',
    booking: () => '无需 TuTour 预订；只有餐厅、品鉴、工坊或导览要求时才需提前预约。'
  }
};

export const extraPlaceCardSources = [
  { slug: 'catedral-metropolitana-oaxaca', category: 'culture', name: 'Catedral Metropolitana de Oaxaca', area: 'Centro Histórico', type: 'cathedral, sacred art, plaza architecture', rating: 4.8, image: '/api/apps/romcWH54d4SR/assets/visual-editor/CatedralMetropolitanadeOaxacaNuestraSeñoradelaAsunción.jpg' },
  { slug: 'teatro-macedonio-alcala-culture', category: 'culture', name: 'Teatro Macedonio Alcalá', area: 'Centro Histórico', type: 'theater architecture, performances, historic interiors', rating: 4.8, image: '/api/apps/romcWH54d4SR/assets/visual-editor/TEATROMACEDONIOALCALÁ.jpg' },
  { slug: 'museo-rufino-tamayo', category: 'culture', name: 'Museo de Arte Prehispánico Rufino Tamayo', area: 'Centro Histórico', type: 'prehispanic art, museum galleries, quiet culture stop', rating: 4.7, image: '/api/apps/romcWH54d4SR/assets/visual-editor/MuseodeArtePrehispánicodeMéxicoRufinoTamayo.jpg' },
  { slug: 'museo-belber-jimenez', category: 'culture', name: 'Museo Belber Jiménez', area: 'Centro Histórico', type: 'folk art, jewelry, private collection, historic house', rating: 4.7, image: '/api/apps/romcWH54d4SR/assets/visual-editor/MUSEOBELBER.jpg' },
  { slug: 'centro-fotografico-manuel-alvarez-bravo', category: 'culture', name: 'Centro Fotográfico Manuel Álvarez Bravo', area: 'Centro Histórico', type: 'photography exhibitions, courtyard, visual culture', rating: 4.7, image: '/api/apps/romcWH54d4SR/assets/visual-editor/CentroFotográficoManuelÁlvarezBravo.jpg' },
  { slug: 'iago-oaxaca', category: 'culture', name: 'Instituto de Artes Gráficas de Oaxaca (IAGO)', area: 'Centro Histórico', type: 'graphic arts, library, Francisco Toledo legacy', rating: 4.8, image: '/api/apps/romcWH54d4SR/assets/visual-editor/InstitutodeArtesGráficasdeOaxaca.jpg' },
  { slug: 'biblioteca-henestrosa', category: 'culture', name: 'Biblioteca Henestrosa', area: 'Centro Histórico', type: 'library courtyard, cultural talks, reading rooms', rating: 4.7, image: '/api/apps/romcWH54d4SR/assets/visual-editor/CasadelaCiudadBibliotecaAndrésHenestrosa.jpg' },
  { slug: 'museo-casa-juarez', category: 'culture', name: 'Museo de Sitio Casa Juárez', area: 'Centro Histórico', type: 'Benito Juárez history, historic house, civic memory', rating: 4.7, image: '/api/apps/romcWH54d4SR/assets/visual-editor/MuseodeSitioCasaJuárez.jpg' },
  { slug: 'ex-convento-cuilapam', category: 'culture', name: 'Ex Convento de Cuilápam de Guerrero', area: 'Cuilápam de Guerrero', type: 'open-air convent, colonial architecture, valley day trip', rating: 4.8, image: '/api/apps/romcWH54d4SR/assets/visual-editor/ExConventofCuilapamdeGuerrero.jpg' },
  { slug: 'zona-arqueologica-atzompa', category: 'culture', name: 'Zona Arqueológica de Atzompa', area: 'Santa María Atzompa', type: 'Zapotec archaeology, valley views, quieter ruins', rating: 4.7, image: '/api/apps/romcWH54d4SR/assets/visual-editor/ZonaArqueológicadeAtzompa.jpg' },
  { slug: 'zona-arqueologica-dainzu', category: 'culture', name: 'Zona Arqueológica de Dainzú', area: 'Tlacolula Valley', type: 'archaeology, carved stones, eastern-valley route', rating: 4.6, image: '/api/apps/romcWH54d4SR/assets/visual-editor/ZonaArqueológicaDainzú.jpg' },
  { slug: 'zona-arqueologica-lambityeco', category: 'culture', name: 'Zona Arqueológica de Lambityeco', area: 'Tlacolula Valley', type: 'archaeology, stucco masks, salt-production history', rating: 4.6, image: '/api/apps/romcWH54d4SR/assets/visual-editor/ZonaArqueológicadeLambityeco.jpg' },
  { slug: 'zona-arqueologica-zaachila', category: 'culture', name: 'Zona Arqueológica de Zaachila', area: 'Villa de Zaachila', type: 'Zapotec tombs, town plaza, archaeology day trip', rating: 4.6, image: '/api/apps/romcWH54d4SR/assets/visual-editor/ZonaArqueológicadeZaachila.jpg' },
  { slug: 'templo-tlacochahuaya', category: 'culture', name: 'Templo de San Jerónimo Tlacochahuaya', area: 'San Jerónimo Tlacochahuaya', type: 'painted church, organ heritage, eastern-valley culture', rating: 4.8, image: '/api/apps/romcWH54d4SR/assets/visual-editor/ConventodeSanJeronimo.jpg' },
  { slug: 'zona-arqueologica-mitla-oaxaca', category: 'culture', name: 'Zona Arqueológica de Mitla Oaxaca', area: 'San Pablo Villa de Mitla', address: 'Zona Arqueológica de Mitla, San Pablo Villa de Mitla, Oaxaca, México', type: 'Zapotec archaeological site, geometric stone mosaics, ancient palaces, eastern-valley culture route', rating: 4.8, duration: '2 hr', price: '$$', bestFor: 'Zapotec archaeology, geometric stone mosaics, ancient palaces, history lovers, photography, eastern-valley day trips', bestForEs: 'arqueología zapoteca, grecas de piedra, palacios antiguos, amantes de la historia, fotografía, ruta de Valles Centrales', highlights: 'Zona Arqueológica de Mitla Oaxaca, geometric stone mosaics, ancient palace patios, colonial church context, eastern-valley culture route', highlightsEs: 'Zona Arqueológica de Mitla Oaxaca, grecas geométricas de piedra, patios de palacios antiguos, contexto de iglesia colonial, ruta cultural de los Valles Centrales', localTip: 'Go in the morning for cooler light, hire a local guide if you want deeper context on the mosaics, and pair Mitla with Árbol del Tule, Teotitlán del Valle, or a responsible mezcal stop on the eastern-valley route.', localTipEs: 'Ve por la mañana para tener mejor temperatura y luz, contrata guía local si quieres entender las grecas con más contexto, y combínalo con el Árbol del Tule, Teotitlán del Valle o una parada responsable de mezcal en la ruta de Valles Centrales.', safetyTip: 'The site has exposed sun, stone steps, and uneven surfaces. Bring water, sun protection, shoes with grip, keep valuables zipped, and use trusted transport or a confirmed tour for the return.', nearby: 'San Pablo Villa de Mitla, Mercado de Artesanías de Mitla, Hierve el Agua route, Teotitlán del Valle, Santiago Matatlán', maps: 'https://www.google.com/maps/search/?api=1&query=Zona%20Arqueol%C3%B3gica%20de%20Mitla%20Oaxaca', photos: 'https://www.google.com/maps/search/Zona%20Arqueol%C3%B3gica%20de%20Mitla%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/ZonaArqueológicadeMitla.jpg' },
  { slug: 'alfonsina-oaxaca', category: 'food', name: 'Alfonsina', area: 'San Juan Bautista la Raya', type: 'chef-led meal, corn, family kitchen, destination lunch', rating: 4.8, duration: '2 hr', price: '$$$' },
  { slug: 'mercado-gastronomico-zaachila', category: 'food', name: 'Mercado Gastronómico de Zaachila', area: 'Villa de Zaachila', address: 'Mercado Gastronómico de Zaachila, Villa de Zaachila, Oaxaca, México', type: 'traditional food market, local cooks, barbacoa, empanadas, market lunch near Zaachila plaza', rating: 4.7, duration: '75 min', price: '$', bestFor: 'traditional Zaachila food, market lunch, local cooks, barbacoa, empanadas, families, southern-valley day trips', bestForEs: 'comida tradicional de Zaachila, almuerzo de mercado, cocineras locales, barbacoa, empanadas, familias, ruta de Valles del Sur', highlights: 'Mercado Gastronómico de Zaachila, local food stalls, barbacoa, empanadas, market seating, Villa de Zaachila route', highlightsEs: 'Mercado Gastronómico de Zaachila, puestos de comida local, barbacoa, empanadas, mesas de mercado, ruta de Villa de Zaachila', localTip: 'Go for breakfast or lunch, walk the stalls before choosing, follow the busiest counters, and pair it with the Zaachila archaeological zone or town plaza if you are already in the southern valley.', localTipEs: 'Ve para desayunar o comer, recorre los puestos antes de elegir, busca los mostradores con más movimiento y combínalo con la zona arqueológica o la plaza de Zaachila si ya estás en los Valles del Sur.', safetyTip: 'Visit in daylight, keep bags zipped in busy aisles, carry small bills, ask before photographing vendors, and confirm return transport before leaving Zaachila.', nearby: 'Zona Arqueológica de Zaachila, Villa de Zaachila town center, southern valley route, Cuilápam de Guerrero', maps: 'https://www.google.com/maps/search/?api=1&query=Mercado%20Gastron%C3%B3mico%20de%20Zaachila%20Villa%20de%20Zaachila%20Oaxaca', photos: 'https://www.google.com/maps/search/Mercado%20Gastron%C3%B3mico%20de%20Zaachila%20Villa%20de%20Zaachila%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/MercadoGastronómicodeZaachila.jpg' },
  { slug: 'plaza-de-las-nieves-oaxaca', category: 'food', name: 'Plaza de las Nieves Oaxaca', area: 'Centro Histórico', address: 'Plaza de las Nieves, Oaxaca de Juárez, Oaxaca, México', type: 'traditional Oaxacan nieves, dessert plaza, local ice cream flavors, quick Centro food stop', rating: 4.7, duration: '35 min', price: '$', bestFor: 'traditional Oaxacan nieves, dessert break, local flavors, family-friendly snack stop, Centro walking route', bestForEs: 'nieves tradicionales oaxaqueñas, pausa dulce, sabores locales, antojito familiar, ruta caminable del Centro', highlights: 'Plaza de las Nieves Oaxaca, traditional nieves, seasonal fruit flavors, casual dessert stop, Centro Histórico route', highlightsEs: 'Plaza de las Nieves Oaxaca, nieves tradicionales, sabores de fruta de temporada, parada dulce informal, ruta del Centro Histórico', localTip: 'Go in the afternoon between Centro walks, compare the flavors before ordering, and try a regional nieve flavor like leche quemada, tuna, mezcal, or seasonal fruit if available.', localTipEs: 'Ve por la tarde entre caminatas del Centro, compara sabores antes de pedir y prueba una nieve regional como leche quemada, tuna, mezcal o fruta de temporada si está disponible.', safetyTip: 'Visit in daylight or early evening, keep valuables zipped while ordering, watch uneven sidewalks and curb edges around the plaza, and use well-lit streets or trusted transport after dark.', nearby: 'Centro Histórico, Zócalo de Oaxaca, Andador Alcalá, Templo de Santo Domingo, Mercado 20 de Noviembre', maps: 'https://www.google.com/maps/search/?api=1&query=Plaza%20de%20las%20Nieves%20Oaxaca', photos: 'https://www.google.com/maps/search/Plaza%20de%20las%20Nieves%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/PlazadeLasNieves.jpg' },
  { slug: 'las-quince-letras', category: 'food', name: 'Las Quince Letras', area: 'Centro Histórico', type: 'classic Oaxacan cooking, moles, traditional dining', rating: 4.6 },
  { slug: 'la-olla-oaxaca', category: 'food', name: 'La Olla', area: 'Centro Histórico', address: 'Reforma 402, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax., México', type: 'traditional Oaxacan restaurant, chef Pilar Cabrera, mole negro, maíz sampler, vegetarian-friendly plates', rating: 4.6, duration: '90 min', price: '$$', bestFor: 'traditional Oaxacan cooking, mole negro, seasonal local ingredients, relaxed Centro lunch or dinner, vegetarian-friendly choices', highlights: 'Bib Gourmand restaurant, Reforma 402 address, Chef Pilar Cabrera, mole negro, maíz sampler, colorful patio-style dining', localTip: 'Reserve if you want dinner, ask what seasonal mole or maíz dishes are available, and pair it with Santo Domingo or Andador Alcalá because it is in the same walkable Centro area.', safetyTip: 'Use the Reforma 402 Google Maps listing for directions, keep valuables zipped on busy Centro sidewalks, and choose well-lit streets or registered transport after dinner.', nearby: 'Templo de Santo Domingo, Andador Alcalá, Jardín Etnobotánico, Museo de las Culturas, Centro Histórico', maps: 'https://www.google.com/maps/search/?api=1&query=La%20Olla%20Reforma%20402%20Oaxaca', photos: 'https://www.google.com/maps/search/La%20Olla%20Reforma%20402%20Oaxaca%20photos' },
  { slug: 'el-tendajon-oaxaca', category: 'food', name: 'El Tendajon', area: 'Oaxaca de Juárez', address: 'El Tendajon, Oaxaca de Juárez, Oaxaca, México', type: 'contemporary Oaxacan comfort food, relaxed cantina-style meal, local sourcing, creative classics', rating: 4.6, duration: '75 min', price: '$$', bestFor: 'contemporary Oaxacan comfort food, casual cantina-style dining, local ingredients, relaxed lunch or dinner', highlights: 'Oaxacan flavors, relaxed dining room, local sourcing, creative classics, Google Maps photo handoff', localTip: 'Check the daily specials before ordering, ask staff what is most typical that day, and pair it with a walk through Jalatlaco, El Llano, or Santo Domingo if the route works for you.', safetyTip: 'Confirm current hours in Google Maps before going, keep valuables zipped on Centro sidewalks, and use a taxi, ride app, or well-lit route if visiting at night.', nearby: 'Parque El Llano, Barrio de Jalatlaco, Santo Domingo, Centro Histórico', maps: 'https://www.google.com/maps/search/?api=1&query=El%20Tendajon%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca', photos: 'https://www.google.com/maps/search/El%20Tendajon%20Oaxaca%20photos', image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGTOtr0BdyrGNJwE0Vwi3Zf_5m0aewEfWpDxh2B2B2rsEiJoDi7YL37ICEV8vb4XkqnQ1Sqr6eUzHC85QIUqcKLacqhDcqmQoq5jZkrrvGdWBtUutl4DzCH7QXNgr8PTVQLWfMX8A=s1360-w1360-h1020-rw' },
  { slug: 'origen-oaxaca', category: 'food', name: 'Origen', area: 'Centro Histórico', type: 'modern Oaxacan cuisine, seasonal menu, refined dinner', rating: 4.7, price: '$$$' },
  { slug: 'ancestral-cocina-tradicional', category: 'food', name: 'Ancestral Cocina Tradicional', area: 'Xochimilco', type: 'traditional Oaxaca kitchen, courtyard meal, heritage recipes', rating: 4.7 },
  { slug: 'zandunga-oaxaca', category: 'food', name: 'Zandunga', area: 'Centro Histórico', type: 'Isthmus cuisine, garnachas, moles, festive dinner', rating: 4.6 },
  { slug: 'tacos-del-carmen', category: 'food', name: 'Tacos del Carmen', area: 'Centro Histórico', type: 'morning tacos, local breakfast, quick street-food stop', rating: 4.7, duration: '45 min', price: '$' },
  { slug: 'nieves-chaguita', category: 'food', name: 'Nieves Chagüita', area: 'Centro Histórico', type: 'traditional nieves, dessert stop, local flavors', rating: 4.6, duration: '30 min', price: '$' },
  { slug: 'chocolate-mayordomo-centro', category: 'food', name: 'Chocolate Mayordomo Centro', area: 'Centro Histórico', type: 'Oaxacan chocolate, edible souvenirs, hot chocolate', rating: 4.6, duration: '45 min', price: '$' },
  { slug: 'pan-am-oaxaca', category: 'food', name: 'Pan:am', area: 'Centro Histórico', type: 'bakery, brunch, coffee, pastries', rating: 4.6 },
  { slug: 'cafe-brujula', category: 'food', name: 'Café Brújula', area: 'Centro Histórico', type: 'Oaxacan coffee, quick break, casual meetup', rating: 4.5, duration: '45 min', price: '$' },
  { slug: 'masea-trigo-y-maiz', category: 'food', name: 'Masea Trigo y Maíz', area: 'Centro Histórico', type: 'bakery, masa, coffee, breakfast stop', rating: 4.6 },
  { slug: 'los-pacos-oaxaca', category: 'food', name: 'Los Pacos', area: 'Centro Histórico', type: 'mole tasting, traditional plates, family dining', rating: 4.6 },
  { slug: 'mercado-de-la-merced-oaxaca', category: 'markets', name: 'Mercado de La Merced Oaxaca', area: 'Barrio de la Merced', address: 'Mercado de La Merced Oaxaca, Barrio de la Merced, Oaxaca de Juárez, Oax., México', type: 'traditional neighborhood market, breakfast stalls, empanadas, local fondas, produce aisles', rating: 4.6, duration: '75 min', price: '$', bestFor: 'traditional market breakfast, empanadas, local fondas, produce stalls, neighborhood market walk near Centro', highlights: 'Mercado de La Merced Oaxaca, breakfast counters, empanadas, produce aisles, everyday neighborhood shopping, Google Maps photo handoff', localTip: 'Go in the morning for the liveliest breakfast counters, make one loop before choosing a stall, bring small bills, and ask politely before taking photos of vendors or food prep.', localTipEs: 'Ve por la mañana para encontrar más movimiento en los desayunos, da una vuelta antes de elegir puesto, lleva billetes pequeños y pregunta antes de fotografiar vendedores o comida.', safetyTip: 'Visit in daylight, keep your bag zipped in crowded aisles, watch wet floors and uneven sidewalks around the market, and use a well-lit route or trusted transport if leaving after dark.', nearby: 'Barrio de la Merced, Centro Histórico, Parque El Llano, Templo de Santo Domingo', maps: 'https://www.google.com/maps/search/?api=1&query=Mercado%20de%20La%20Merced%20Oaxaca%20Barrio%20de%20la%20Merced', photos: 'https://www.google.com/maps/search/Mercado%20de%20La%20Merced%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/MercadodeLaMerced.jpg' },
  { slug: 'mercado-ocotlan', category: 'markets', name: 'Mercado Ocotlán', area: 'Ocotlán de Morelos', address: 'Mercado Ocotlán, Ocotlán de Morelos, Oaxaca, México', type: 'Friday market, produce aisles, barbacoa, empanadas, crafts, valley day trip', rating: 4.7, duration: '2 hr', price: '$', bestFor: 'Friday market walk, traditional foods, produce stalls, crafts, valley-route day trip, local market photography', highlights: 'Ocotlán market, Friday tianguis, barbacoa and empanadas, produce aisles, artisan goods, Ocotlán de Morelos plaza route', localTip: 'Go on Friday morning if you want the fullest tianguis energy, walk the aisles before eating, carry small bills, and pair it with Ocotlán de Morelos town center or nearby artisan villages.', localTipEs: 'Ve el viernes por la mañana para vivir el tianguis completo, recorre los pasillos antes de comer, lleva billetes pequeños y combínalo con el centro de Ocotlán o pueblos artesanos cercanos.', safetyTip: 'Visit in daylight, keep bags zipped in crowded aisles, ask before photographing vendors, confirm return transport from Ocotlán de Morelos, and avoid flashing phones while paying or negotiating.', nearby: 'Ocotlán de Morelos town center, Parroquia de Santo Domingo de Guzmán, artisan villages, southern valley route', maps: 'https://www.google.com/maps/search/?api=1&query=Mercado%20Ocotl%C3%A1n%20Ocotl%C3%A1n%20de%20Morelos%20Oaxaca', photos: 'https://www.google.com/maps/search/Mercado%20Ocotl%C3%A1n%20Ocotl%C3%A1n%20de%20Morelos%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/MercadoMorelosOcotlán.jpg' },
  { slug: 'mercado-municipal-martin-gonzalez-tlacolula', category: 'markets', name: 'Mercado Municipal Martín González Tlacolula', area: 'Tlacolula de Matamoros', address: 'Mercado Municipal Martín González Tlacolula, Tlacolula de Matamoros, Oaxaca, México', type: 'municipal market, Tlacolula produce aisles, local food counters, everyday valley shopping, market photography', rating: 4.6, duration: '75 min', price: '$', bestFor: 'Tlacolula municipal market walk, produce stalls, casual local food, everyday valley shopping, neighborhood exploring', highlights: 'Mercado Municipal Martín González Tlacolula, produce aisles, prepared-food counters, local vendors, everyday market rhythm, Google Maps photo handoff', localTip: 'Go in the morning, make one slow loop before buying, bring small bills, and choose busy food or produce stalls where turnover looks fresh.', localTipEs: 'Ve por la mañana, da una vuelta tranquila antes de comprar, lleva billetes pequeños y elige puestos de comida o fruta que se vean concurridos y frescos.', safetyTip: 'Visit in daylight, keep your bag zipped in crowded aisles, ask before photographing vendors, watch for wet floors or uneven thresholds, and confirm your return transport before leaving Tlacolula.', nearby: 'Tlacolula de Matamoros, Templo de Santa María de la Asunción, Sunday tianguis route, Teotitlán del Valle, Mitla', maps: 'https://www.google.com/maps/search/?api=1&query=Mercado%20Municipal%20Mart%C3%ADn%20Gonz%C3%A1lez%20Tlacolula%20de%20Matamoros%20Oaxaca', photos: 'https://www.google.com/maps/search/Mercado%20Municipal%20Mart%C3%ADn%20Gonz%C3%A1lez%20Tlacolula%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/MercadoMunicipalMartínGonzálezTlacolula.jpg' },
  { slug: 'mercado-sanchez-pascuas', category: 'markets', name: 'Mercado Sánchez Pascuas', area: 'Centro Norte', type: 'neighborhood market, produce, breakfast counters', rating: 4.6 },
  { slug: 'mercado-iv-centenario', category: 'markets', name: 'Mercado IV Centenario', area: 'Centro Histórico', type: 'local market, prepared food, plaza route', rating: 4.5 },
  { slug: 'mercado-de-artesanias-oaxaca', category: 'artisan', name: 'Mercado de Artesanías de Oaxaca', area: 'Centro Histórico', type: 'textiles, leather, crafts, souvenir shopping', rating: 4.6 },
  { slug: 'villa-de-etla-municipal-market', category: 'markets', name: 'Villa de Etla Municipal Market', area: 'Villa de Etla', address: 'Mercado Municipal de Villa de Etla, Villa de Etla, Oaxaca, México', type: 'municipal market, quesillo, local snacks, produce stalls, regional food stop', rating: 4.6, duration: '75 min', price: '$', bestFor: 'municipal market walk, quesillo shopping, regional snacks, produce stalls, low-key Villa de Etla stop', highlights: 'Villa de Etla Municipal Market, quesillo, local food counters, produce aisles, regional market rhythm, Google Maps photo handoff', localTip: 'Go in the morning, make one slow loop before buying, try local quesillo or a simple market snack, and bring small bills for quick purchases.', localTipEs: 'Ve por la mañana, da una vuelta tranquila antes de comprar, prueba quesillo local o un antojito de mercado y lleva billetes pequeños para compras rápidas.', safetyTip: 'Visit in daylight, keep your bag zipped in crowded aisles, ask before photographing vendors, watch uneven sidewalks around the market, and confirm return transport before leaving Villa de Etla.', nearby: 'Villa de Etla town center, San Agustín Etla, northern valley route, Oaxaca de Juárez', maps: 'https://www.google.com/maps/search/?api=1&query=Mercado%20Municipal%20Villa%20de%20Etla%20Oaxaca', photos: 'https://www.google.com/maps/search/Mercado%20Municipal%20Villa%20de%20Etla%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/VilladeEtlaMunicipalMarket.jpg' },
  { slug: 'mercado-artesanias-atitlan', category: 'markets', name: 'Mercado de Artesanías de Santa María Atzompa', area: 'Santa María Atzompa', type: 'pottery market, green glaze, artisan shopping', rating: 4.6 },
  { slug: 'parque-ecoturistico-huayapam', category: 'nature', name: 'Parque Ecoturístico Huayápam', area: 'San Andrés Huayápam', address: 'Parque Ecoturístico Huayápam, San Andrés Huayápam, Oaxaca, México', type: 'ecotourism park, reservoir views, foothill trails, family-friendly nature, local food stop', rating: 4.7, duration: '2 hr', price: '$', bestFor: 'easy nature escape near Oaxaca City, reservoir views, foothill air, family walks, casual outdoor lunch, birdwatching', highlights: 'Parque Ecoturístico Huayápam, reservoir scenery, shaded walking areas, foothill views, local food spots, quick nature break from the city', localTip: 'Go in the morning or late afternoon for cooler air, walk slowly around the water and shaded areas, and pair it with a simple lunch in Huayápam rather than rushing back to Centro.', localTipEs: 'Ve por la mañana o al final de la tarde para clima más fresco, camina con calma junto al agua y las zonas con sombra, y combínalo con una comida sencilla en Huayápam antes de volver al Centro.', safetyTip: 'Visit in daylight, wear shoes with grip for dirt or uneven paths, bring water and sun protection, keep valuables zipped, and use trusted transport for the return if you are not driving.', nearby: 'San Andrés Huayápam, Oaxaca de Juárez, Sierra Norte foothills, Parque Ciudad de las Canteras, local Huayápam restaurants', maps: 'https://www.google.com/maps/search/?api=1&query=Parque%20Ecotur%C3%ADstico%20Huay%C3%A1pam%20San%20Andr%C3%A9s%20Huay%C3%A1pam%20Oaxaca', photos: 'https://www.google.com/maps/search/Parque%20Ecotur%C3%ADstico%20Huay%C3%A1pam%20San%20Andr%C3%A9s%20Huay%C3%A1pam%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/ParqueEcoturísticoHuayápam.jpg' },
  { slug: 'parque-ciudad-canteras', category: 'nature', name: 'Parque Ciudad de las Canteras', area: 'Santa María Ixcotel', type: 'urban park, shaded walk, family-friendly nature', rating: 4.6 },
  { slug: 'centro-ecoturistico-benito-juarez', category: 'nature', name: 'Centro Ecoturistico Benito Juárez', area: 'Sierra Norte', address: 'Centro Ecoturistico Benito Juárez, Sierra Norte, Oaxaca, México', type: 'community ecotourism, cloud forest, hanging bridge, mountain views, hiking trails', rating: 4.8, duration: 'Full day', price: '$$', bestFor: 'community ecotourism, cloud forest hikes, hanging bridge views, mountain scenery, full-day Sierra Norte nature trips', bestForEs: 'ecoturismo comunitario, caminatas en bosque de niebla, vistas desde puente colgante, paisajes de montaña, excursiones de día completo a la Sierra Norte', highlights: 'Centro Ecoturistico Benito Juárez, Sierra Norte cloud forest, hanging bridge, mountain viewpoints, community trails, Google Maps photo handoff', highlightsEs: 'Centro Ecoturistico Benito Juárez, bosque de niebla de la Sierra Norte, puente colgante, miradores de montaña, senderos comunitarios, fotos de Google Maps', localTip: 'Leave Oaxaca City early, confirm road and weather conditions before departing, and plan enough time for the hanging bridge, forest trails, a simple community meal, and a relaxed return before dark.', localTipEs: 'Sal temprano de Oaxaca, confirma camino y clima antes de salir, y deja tiempo suficiente para el puente colgante, senderos del bosque, una comida comunitaria sencilla y volver con calma antes de oscurecer.', safetyTip: 'Mountain weather can change quickly. Bring layers, water, cash, shoes with grip, and use trusted transport or an organized community ecotourism visit rather than improvising a late return.', nearby: 'Pueblos Mancomunados, Llano Grande, Cuajimoloyas, Sierra Norte trails, Oaxaca de Juárez', maps: 'https://www.google.com/maps/search/?api=1&query=Centro%20Ecoturistico%20Benito%20Ju%C3%A1rez%20Sierra%20Norte%20Oaxaca', photos: 'https://www.google.com/maps/search/Centro%20Ecoturistico%20Benito%20Ju%C3%A1rez%20Sierra%20Norte%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/CentroEcoturisticoBenitoJuárez.jpg' },
  { slug: 'san-isidro-llano-grande-pueblos-mancomunados', category: 'nature', name: 'San Isidro Llano Grande Pueblos Mancomunados', area: 'Sierra Norte', address: 'San Isidro Llano Grande, Pueblos Mancomunados, Sierra Norte, Oaxaca, México', type: 'community ecotourism, forest hiking, cabins, misty mountain landscapes', rating: 4.8, duration: 'Full day', price: '$$', bestFor: 'Pueblos Mancomunados community ecotourism, forest hiking, mountain cabins, birdwatching, cool-weather nature day trips', bestForEs: 'ecoturismo comunitario en Pueblos Mancomunados, caminatas de bosque, cabañas de montaña, observación de aves, excursiones de naturaleza con clima fresco', highlights: 'San Isidro Llano Grande Pueblos Mancomunados, Sierra Norte forest trails, community cabins, misty viewpoints, mountain air, Google Maps photo handoff', highlightsEs: 'San Isidro Llano Grande Pueblos Mancomunados, senderos de bosque en la Sierra Norte, cabañas comunitarias, miradores con neblina, aire de montaña, fotos de Google Maps', localTip: 'Plan this as a full-day or overnight Sierra Norte stop, confirm community services before leaving Oaxaca City, and bring warm layers because the mountain weather feels very different from Centro.', localTipEs: 'Planea esta parada de la Sierra Norte como día completo o pernocta, confirma servicios comunitarios antes de salir de Oaxaca y lleva capas abrigadoras porque el clima de montaña es muy distinto al Centro.', safetyTip: 'Use trusted transport or an organized community ecotourism visit, avoid starting trails late, bring cash, water, grippy shoes, offline maps, and confirm your return before dark.', nearby: 'Pueblos Mancomunados, Centro Ecoturístico Benito Juárez, Cuajimoloyas, Sierra Norte trails, Oaxaca de Juárez', maps: 'https://www.google.com/maps/search/?api=1&query=San%20Isidro%20Llano%20Grande%20Pueblos%20Mancomunados%20Sierra%20Norte%20Oaxaca', photos: 'https://www.google.com/maps/search/San%20Isidro%20Llano%20Grande%20Pueblos%20Mancomunados%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/SanIsidroLlanoGrandePueblosMancomunados.jpg' },
  { slug: 'cuajimoloyas', category: 'nature', name: 'Cuajimoloyas', area: 'Sierra Norte', type: 'mountain village, forest trails, ecotourism', rating: 4.8, duration: 'Full day', price: '$$' },
  { slug: 'apoala-waterfalls', category: 'nature', name: 'Cascadas de Apoala', area: 'Santiago Apoala', type: 'waterfalls, canyon, Mixteca nature route', rating: 4.8, duration: 'Full day', price: '$$' },
  { slug: 'san-jose-del-pacifico', category: 'nature', name: 'San José del Pacífico', area: 'Sierra Sur', type: 'mountain views, cloud forest, slow village stay', rating: 4.8, duration: 'Full day', price: '$$' },
  { slug: 'laguna-manialtepec', category: 'nature', name: 'Laguna de Manialtepec', area: 'Costa de Oaxaca', type: 'lagoon, bioluminescence tours, birdwatching', rating: 4.7, duration: '3 hr', price: '$$' },
  { slug: 'el-hijuelo-mezcaleria-new', category: 'mezcal', name: 'El Hijuelo Mezcalería', area: 'Oaxaca de Juárez', address: 'El Hijuelo Mezcalería, Oaxaca de Juárez, Oaxaca, México', type: 'mezcalería, agave tasting, relaxed local bar, Google Maps photo handoff', rating: 4.7, duration: '75 min', price: '$$', bestFor: 'mezcal tasting, agave discovery, relaxed evening stop, local recommendations, travelers using a taxi or walking from nearby Centro areas', bestForEs: 'cata de mezcal, descubrir agaves, parada tranquila de tarde-noche, recomendaciones locales, viajeros que caminan desde zonas cercanas del Centro o usan taxi', highlights: 'El Hijuelo Mezcalería, mezcal pours, agave conversation, relaxed Oaxaca stop, Google Maps directions and photos', highlightsEs: 'El Hijuelo Mezcalería, copas de mezcal, conversación sobre agaves, parada relajada en Oaxaca, indicaciones y fotos de Google Maps', localTip: 'Go for a slow tasting rather than a rushed drink, ask which agaves are available that day, and save the Google Maps listing so your return route is clear before the first pour.', localTipEs: 'Ve para una cata tranquila y no solo una copa rápida, pregunta qué agaves tienen ese día y guarda la ficha de Google Maps para tener clara la ruta de regreso antes de probar.', safetyTip: 'Taste responsibly, eat beforehand, drink water between pours, avoid driving, keep valuables zipped, and use a trusted taxi, ride app, or well-lit walking route after dark.', nearby: 'Centro Histórico, Andador Alcalá, Santo Domingo, Zócalo de Oaxaca, local mezcal bars', maps: 'https://www.google.com/maps/search/?api=1&query=El%20Hijuelo%20Mezcaler%C3%ADa%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca%20M%C3%A9xico', photos: 'https://www.google.com/maps/search/El%20Hijuelo%20Mezcaler%C3%ADa%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca%20photos', image: '/api/apps/romcWH54d4SR/assets/visual-editor/ElHijueloMezcalería.jpg' },
  { slug: 'parador-turistico-real-matlatl-mezcaleria', category: 'mezcal', name: 'Parador Turístico Real Matlatl Mezcalería', area: 'San Pablo Villa de Mitla', address: 'Parador Turístico Real Matlatl Mezcalería, San Pablo Villa de Mitla, Oaxaca, México', type: 'mezcal tasting, agave education, Mitla route stop, traditional mezcalería', rating: 4.8, duration: '90 min', price: '$$', bestFor: 'mezcal tasting, learning about agave, a relaxed stop on the Mitla route, travelers with a designated driver', highlights: 'Real Matlatl mezcalería, Mitla-area route, agave spirits, tasting stop, Google Maps photo handoff', localTip: 'Make this a daytime stop when visiting Mitla or the eastern valley, taste slowly, ask about the agaves, and save the exact Google Maps listing before you leave Oaxaca City.', safetyTip: 'Taste responsibly, arrange a trusted driver or tour before drinking, confirm current hours on Google Maps, and keep valuables zipped during transport stops.', nearby: 'Zona Arqueológica de Mitla, Santiago Matatlán, Tlacolula Valley, Árbol del Tule', maps: 'https://www.google.com/maps/search/?api=1&query=Parador%20Tur%C3%ADstico%20Real%20Matlatl%20Mezcaler%C3%ADa%20San%20Pablo%20Villa%20de%20Mitla%20Oaxaca', photos: 'https://www.google.com/maps/search/Parador%20Tur%C3%ADstico%20Real%20Matlatl%20Mezcaler%C3%ADa%20San%20Pablo%20Villa%20de%20Mitla%20Oaxaca%20photos' },
  { slug: 'mezcaleria-cuish', category: 'mezcal', name: 'Mezcalería Cuish', area: 'Centro Histórico', type: 'mezcal tasting, small producers, relaxed bar', rating: 4.7 },
  { slug: 'los-amantes-mezcaleria', category: 'mezcal', name: 'Mezcalería Los Amantes', area: 'Centro Histórico', type: 'mezcal tasting, intimate bar, agave education', rating: 4.6 },
  { slug: 'archivo-maguey', category: 'mezcal', name: 'Archivo Maguey', area: 'Centro Histórico', type: 'mezcal, music, late-evening cultural bar', rating: 4.6 },
  { slug: 'lalocura-mezcal', category: 'mezcal', name: 'Lalocura Mezcal', area: 'Santa Catarina Minas', type: 'clay-pot mezcal, palenque visit, agave learning', rating: 4.8, duration: '2 hr', price: '$$' },
  { slug: 'mezcal-vago-elote', category: 'mezcal', name: 'Mezcal Vago Oaxaca Tasting Reference', area: 'Oaxaca de Juárez', type: 'mezcal education, bottle research, agave styles', rating: 4.6 },
  { slug: 'la-casa-de-las-artesanias-oaxaca', category: 'artisan', name: 'La Casa de las Artesanías de Oaxaca', area: 'Centro Histórico', type: 'curated crafts, textiles, pottery, fair shopping', rating: 4.7 },
  { slug: 'aripo-oaxaca', category: 'artisan', name: 'ARIPO Oaxaca', area: 'Centro Histórico', type: 'state artisan shop, textiles, ceramics, woodcarving', rating: 4.6 },
  { slug: 'maro-oaxaca', category: 'artisan', name: 'MARO Mujeres Artesanas de las Regiones de Oaxaca', area: 'Centro Histórico', type: 'women artisan cooperative, textiles, regional crafts', rating: 4.7 },
  { slug: 'jacobo-maria-angeles-workshop', category: 'artisan', name: 'Jacobo y María Ángeles', area: 'San Martín Tilcajete', type: 'alebrijes, master workshop, Zapotec symbolism', rating: 4.8 },
  { slug: 'casa-don-taurino', category: 'artisan', name: 'Casa Don Taurino', area: 'San Martín Tilcajete', type: 'alebrije workshop, painting demo, artisan family visit', rating: 4.7 },
  { slug: 'barro-negro-san-bartolo', category: 'artisan', name: 'Barro Negro Workshops of San Bartolo Coyotepec', area: 'San Bartolo Coyotepec', type: 'black pottery, artisan demonstrations, village route', rating: 4.8 },
  { slug: 'teotitlan-weaving-workshops', category: 'artisan', name: 'Teotitlán del Valle Weaving Workshops', area: 'Teotitlán del Valle', type: 'wool rugs, natural dyes, weaving families', rating: 4.8 },
  { slug: 'santa-maria-atzompa-pottery', category: 'artisan', name: 'Santa María Atzompa Pottery Workshops', area: 'Santa María Atzompa', type: 'green pottery, family workshops, clay traditions', rating: 4.7 }
];

export const createExtraLocalizedPlace = (item) => Object.fromEntries(languages.map(lang => {
  const copy = extraPlaceCopy[lang] || extraPlaceCopy.en;
  const categoryName = extraPlaceCategoryNames[item.category]?.[lang] || item.category;
  return [lang, {
    name: item.name,
    category: categoryName,
    area: item.area,
    address: item.address || `${item.name}, ${item.area}, Oaxaca, México`,
    duration: item.duration || extraPlaceCategoryDefaults[item.category]?.duration || '75 min',
    price: item.price || extraPlaceCategoryDefaults[item.category]?.price || '$',
    priceLabel: item.price || extraPlaceCategoryDefaults[item.category]?.price || '$',
    description: copy.description(item),
    bestFor: copy.bestFor(item),
    highlights: copy.highlights(item),
    localTip: copy.localTip(item),
    safetyTip: copy.safetyTip(item),
    bestTime: copy.bestTime(item),
    openingHours: copy.openingHours(item),
    nearby: copy.nearby(item),
    bring: copy.bring(item),
    accessibility: copy.accessibility(item),
    booking: copy.booking(item)
  }];
}));

export const extraRecommendedPlaceCards = extraPlaceCardSources.map(item => {
  const defaults = extraPlaceCategoryDefaults[item.category] || extraPlaceCategoryDefaults.culture;
  const localized = createExtraLocalizedPlace(item);
  const query = `${item.name} ${item.area} Oaxaca México`;
  return {
    id: `extra-google-${item.slug}`,
    category: item.category,
    name: item.name,
    area: item.area,
    address: item.address || `${item.name}, ${item.area}, Oaxaca, México`,
    rating: item.rating || 4.7,
    duration: item.duration || defaults.duration,
    emoji: item.emoji || defaults.emoji,
    accent: item.accent || defaults.accent,
    price: item.price || defaults.price,
    priceLabel: item.price || defaults.price,
    neighborhood: item.neighborhood || item.area,
    bestFor: localized.en.bestFor,
    highlights: localized.en.highlights,
    localTip: localized.en.localTip,
    safetyTip: localized.en.safetyTip,
    description: localized.en.description,
    bestTime: localized.en.bestTime,
    openingHours: localized.en.openingHours,
    nearby: localized.en.nearby,
    bring: localized.en.bring,
    accessibility: localized.en.accessibility,
    booking: localized.en.booking,
    image: item.image || extraPlaceCategoryImages[item.category] || extraPlaceCategoryImages.culture,
    maps: item.maps || gmaps(query),
    photos: item.photos || gphotos(query),
    localized
  };
});

export const placesPageAdditionalCards = [
  ...extraRecommendedPlaceCards,
  cardOverride(mufiLocalized, {
    id: 'museo-filatelia-oaxaca-mufi-culture-card',
    category: 'culture',
    rating: 4.8,
    emoji: '✉️',
    accent: '275 48% 42%',
    neighborhood: 'Centro Histórico',
    image: mufiImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Museo%20de%20Filatelia%20de%20Oaxaca%20MUFI%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Museo%20de%20Filatelia%20de%20Oaxaca%20MUFI%20Oaxaca%20photos',
    lat: 17.0665,
    lng: -96.7223
  }),
  cardOverride(basilicaSoledadLocalized, {
    id: 'basilica-nuestra-senora-de-la-soledad-culture-card',
    category: 'culture',
    rating: 4.8,
    emoji: '⛪',
    accent: '24 75% 44%',
    neighborhood: 'Centro Histórico',
    image: basilicaSoledadImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica%20de%20Nuestra%20Se%C3%B1ora%20de%20la%20Soledad%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Bas%C3%ADlica%20de%20Nuestra%20Se%C3%B1ora%20de%20la%20Soledad%20Oaxaca%20photos',
    lat: 17.0607,
    lng: -96.7286
  })
];

export const placeDisplayOverrides = {
  'teatro-macedonio': cardOverride(sanFelipeFoothillsLocalized, {
    id: 'san-felipe-del-agua-foothill-walk-nature-card',
    category: 'nature',
    rating: 4.8,
    emoji: '🌿',
    accent: '145 42% 34%',
    neighborhood: 'San Felipe del Agua',
    image: sanFelipeFoothillsImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=San%20Felipe%20del%20Agua%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca',
    photos: 'https://www.google.com/maps/search/San%20Felipe%20del%20Agua%20Oaxaca%20nature%20walk%20photos',
    lat: 17.1008,
    lng: -96.7129
  }),
  'teatro-macedonio-alcala': cardOverride(sanFelipeFoothillsLocalized, {
    id: 'san-felipe-del-agua-foothill-walk-nature-card',
    category: 'nature',
    rating: 4.8,
    emoji: '🌿',
    accent: '145 42% 34%',
    neighborhood: 'San Felipe del Agua',
    image: sanFelipeFoothillsImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=San%20Felipe%20del%20Agua%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca',
    photos: 'https://www.google.com/maps/search/San%20Felipe%20del%20Agua%20Oaxaca%20nature%20walk%20photos',
    lat: 17.1008,
    lng: -96.7129
  }),
  'arco-letras-jalatlaco': cardOverride(jalatlacoMuralsLocalized, {
    id: 'jalatlaco-mural-walk-culture-card',
    category: 'culture',
    rating: 4.8,
    emoji: '🎨',
    accent: '24 75% 44%',
    neighborhood: 'Jalatlaco',
    image: jalatlacoMuralsImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Barrio%20de%20Jalatlaco%20murals%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Barrio%20de%20Jalatlaco%20murals%20Oaxaca%20photos',
    lat: 17.0672,
    lng: -96.7149
  }),
  'museo-culturas': cardOverride(temploSantoDomingoLocalized, {
    id: 'templo-santo-domingo-guzman-culture-card',
    category: 'culture',
    rating: 4.8,
    emoji: '🏛️',
    accent: '24 75% 44%',
    neighborhood: 'Centro Histórico',
    image: temploSantoDomingoImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Templo%20de%20Santo%20Domingo%20de%20Guzm%C3%A1n%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Templo%20de%20Santo%20Domingo%20de%20Guzm%C3%A1n%20Oaxaca%20photos',
    lat: 17.0653,
    lng: -96.7237
  }),
  'andador-alcala': cardOverride(andadorLocalized, {
    id: 'andador-turistico-alcala-culture-card',
    category: 'culture',
    rating: 4.8,
    emoji: '🚶',
    accent: '24 75% 44%',
    neighborhood: 'Centro Histórico',
    image: andadorTuristicoAlcalaImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Andador%20Tur%C3%ADstico%20Macedonio%20Alcal%C3%A1%20Centro%20Hist%C3%B3rico%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Andador%20Tur%C3%ADstico%20Macedonio%20Alcal%C3%A1%20Oaxaca%20photos',
    lat: 17.0638,
    lng: -96.7235
  }),
  'aqueduct-arcos-xochimilco': cardOverride(cerroFortinLocalized, {
    id: 'cerro-del-fortin-nature-card',
    category: 'nature',
    rating: 4.7,
    emoji: '🌄',
    accent: '145 42% 34%',
    neighborhood: 'Cerro del Fortín',
    image: cerroFortinImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Mirador%20Cerro%20del%20Fort%C3%ADn%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Mirador%20Cerro%20del%20Fort%C3%ADn%20Oaxaca%20photos',
    lat: 17.0717,
    lng: -96.7316
  }),
  'parque-llano': cardOverride(parqueElLlanoLocalized, {
    id: 'parque-el-llano-nature-card',
    category: 'nature',
    rating: 4.7,
    emoji: '🌳',
    accent: '150 38% 38%',
    neighborhood: 'El Llano',
    image: parqueElLlanoImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Parque%20El%20Llano%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Parque%20El%20Llano%20Oaxaca%20photos',
    lat: 17.0693,
    lng: -96.7173
  }),
  'arbol-del-tule': arbolOverride('arbol-del-tule'),
  'arbol-tule': arbolOverride('arbol-tule'),
  'el-arbol-del-tule': arbolOverride('el-arbol-del-tule'),
  'arbol-del-tule-oaxaca': arbolOverride('arbol-del-tule-oaxaca'),
  'arbol-del-tule-santa-maria-del-tule': arbolOverride('arbol-del-tule-santa-maria-del-tule'),
  'arbol-del-tule-santa-maria-del-tule-oaxaca': arbolOverride('arbol-del-tule-santa-maria-del-tule-oaxaca'),
  'santa-maria-del-tule': arbolOverride('santa-maria-del-tule'),
  'tule-tree': arbolOverride('tule-tree'),
  'ahuehuete-del-tule': arbolOverride('ahuehuete-del-tule'),
  'hierve-el-agua': cardOverride(hierveLocalized, {
    id: 'hierve-el-agua-nature-card',
    category: 'nature',
    rating: 4.8,
    emoji: '💧',
    accent: '197 62% 38%',
    neighborhood: 'San Lorenzo Albarradas',
    image: hierveElAguaImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=Cascadas%20Petrificadas%20de%20Hierve%20el%20Agua%20San%20Lorenzo%20Albarradas%20Oaxaca',
    photos: 'https://www.google.com/maps/search/Cascadas%20Petrificadas%20de%20Hierve%20el%20Agua%20Oaxaca%20photos',
    lat: 16.8658,
    lng: -96.2764
  }),
  'teatro-macedonio': cardOverride(sanFelipeFoothillsLocalized, {
    id: 'san-felipe-del-agua-foothill-walk-nature-card',
    category: 'nature',
    rating: 4.8,
    emoji: '🌿',
    accent: '145 42% 34%',
    neighborhood: 'San Felipe del Agua',
    image: sanFelipeFoothillsImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=San%20Felipe%20del%20Agua%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca',
    photos: 'https://www.google.com/maps/search/San%20Felipe%20del%20Agua%20Oaxaca%20nature%20walk%20photos',
    lat: 17.1008,
    lng: -96.7129
  }),
  'teatro-macedonio-alcala': cardOverride(sanFelipeFoothillsLocalized, {
    id: 'san-felipe-del-agua-foothill-walk-nature-card',
    category: 'nature',
    rating: 4.8,
    emoji: '🌿',
    accent: '145 42% 34%',
    neighborhood: 'San Felipe del Agua',
    image: sanFelipeFoothillsImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=San%20Felipe%20del%20Agua%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca',
    photos: 'https://www.google.com/maps/search/San%20Felipe%20del%20Agua%20Oaxaca%20nature%20walk%20photos',
    lat: 17.1008,
    lng: -96.7129
  }),
  'teatro-macedonio-alcalá': cardOverride(sanFelipeFoothillsLocalized, {
    id: 'san-felipe-del-agua-foothill-walk-nature-card',
    category: 'nature',
    rating: 4.8,
    emoji: '🌿',
    accent: '145 42% 34%',
    neighborhood: 'San Felipe del Agua',
    image: sanFelipeFoothillsImage,
    maps: 'https://www.google.com/maps/search/?api=1&query=San%20Felipe%20del%20Agua%20Oaxaca%20de%20Ju%C3%A1rez%20Oaxaca',
    photos: 'https://www.google.com/maps/search/San%20Felipe%20del%20Agua%20Oaxaca%20nature%20walk%20photos',
    lat: 17.1008,
    lng: -96.7129
  })
};

export const placeForPlacesPage = (place) => {
  if (!place) return place;
  if (placeDisplayOverrides[place.id]) return { ...place, ...placeDisplayOverrides[place.id] };
  if (matchesArbolDelTule(place)) return { ...place, ...arbolOverride(place.id || 'arbol-del-tule') };
  return place;
};

export const placesCopy = {
  en: { curatedTitle: 'Local Favorites', curatedIntro: 'A phone-first Oaxaca guide inspired by local walks: image-rich stops, safety context, Google Maps handoffs, and practical tips for each neighborhood.', empty: 'No local favorites found. Try a broader search.', activeCategory: 'Active category', localDatabase: 'Curated local database', mapsPhotos: 'Google Maps photos', safetyNotes: 'Safety notes included', results: 'places ready' },
  es: { curatedTitle: 'Favoritos locales', curatedIntro: 'Guía móvil de Oaxaca inspirada en caminatas locales: paradas visuales, contexto de seguridad, enlaces a Google Maps y consejos prácticos por barrio.', empty: 'No se encontraron lugares. Prueba una búsqueda más amplia.', activeCategory: 'Categoría activa', localDatabase: 'Base local curada', mapsPhotos: 'Fotos de Google Maps', safetyNotes: 'Consejos de seguridad', results: 'lugares listos' },
  fr: { curatedTitle: 'Favoris locaux', curatedIntro: 'Guide Oaxaca pensé pour mobile avec haltes visuelles, contexte sécurité, liens Google Maps et conseils pratiques par quartier.', empty: 'Aucun lieu trouvé. Essayez une recherche plus large.', activeCategory: 'Catégorie active', localDatabase: 'Base locale sélectionnée', mapsPhotos: 'Photos Google Maps', safetyNotes: 'Conseils sécurité inclus', results: 'lieux prêts' },
  de: { curatedTitle: 'Lokale Favoriten', curatedIntro: 'Ein mobiler Oaxaca-Guide mit bildstarken Stopps, Sicherheitskontext, Google-Maps-Links und praktischen Tipps je Viertel.', empty: 'Keine Orte gefunden. Versuche eine breitere Suche.', activeCategory: 'Aktive Kategorie', localDatabase: 'Kuratierte lokale Datenbank', mapsPhotos: 'Google-Maps-Fotos', safetyNotes: 'Sicherheitshinweise', results: 'Orte bereit' },
  it: { curatedTitle: 'Preferiti locali', curatedIntro: 'Guida mobile di Oaxaca con tappe ricche di immagini, contesto di sicurezza, link Google Maps e consigli pratici per quartiere.', empty: 'Nessun luogo trovato. Prova una búsqueda più ampia.', activeCategory: 'Categoria attiva', localDatabase: 'Database locale curato', mapsPhotos: 'Foto Google Maps', safetyNotes: 'Note di sicurezza incluse', results: 'luoghi pronti' },
  pt: { curatedTitle: 'Favoritos locais', curatedIntro: 'Guia móvel de Oaxaca com paradas visuais, contexto de segurança, links do Google Maps e dicas práticas por bairro.', empty: 'Nenhum lugar encontrado. Tente uma busca mais ampla.', activeCategory: 'Categoria activa', localDatabase: 'Base local curada', mapsPhotos: 'Fotos do Google Maps', safetyNotes: 'Dicas de segurança incluídas', results: 'lugares prontos' },
  ja: { curatedTitle: '地元の人気スポット', curatedIntro: 'スマホ向けのオアハカガイド。写真豊かな立ち寄り先、安全情報、Google マップへのリンク、地区ごとの実用的なヒントをまとめています。', empty: '場所が見つかりません。検索範囲を広げてください。', activeCategory: '選択中のカテゴリ', localDatabase: '厳選ローカルデータベース', mapsPhotos: 'Google マップ写真', safetyNotes: '安全メモ付き', results: '件のスポット' },
  zh: { curatedTitle: '本地热门推荐', curatedIntro: '面向手机的瓦哈卡指南：图片丰富的站点、安全背景、Google 地图跳转和每个街区的实用建议。', empty: '未找到地点。请尝试更宽泛的搜索。', activeCategory: '当前类别', localDatabase: '精选本地数据库', mapsPhotos: 'Google 地图照片', safetyNotes: '包含安全建议', results: '个地点可选' }
};

export function Places() {
  const { t, language: lang } = useLanguage();
  const category = useGuideStore(s => s.category);
  const search = useGuideStore(s => s.search);
  const setSearch = useGuideStore(s => s.setSearch);
  const copy = placesCopy[lang] || placesCopy.en;
  const lowerSearch = search.trim().toLowerCase();
  const visibleCategoryLabels = placeCategories.filter(c => c !== 'dayTrips' && c !== 'coast').map(c => t(c)).join(' / ');
  const curatedPlaces = [...places, ...placesPageAdditionalCards].filter(place => {
    const displayPlace = placeForPlacesPage(place);
    if (removedPlaceCardIds.includes(place.id) || removedPlaceCardIds.includes(displayPlace.id) || displayPlace.category === 'coast') return false;
    const categoryMatch = category === 'all' || displayPlace.category === category;
    const localized = displayPlace.localized?.[lang] || displayPlace.localized?.en || {};
    const searchText = `${displayPlace.name || ''} ${localized.name || ''} ${displayPlace.area || ''} ${localized.area || ''} ${displayPlace.description || ''} ${localized.description || ''} ${displayPlace.bestFor || ''} ${localized.bestFor || ''} ${displayPlace.localTip || ''} ${localized.localTip || ''}`.toLowerCase();
    return categoryMatch && (!lowerSearch || searchText.includes(lowerSearch));
  });
  const activeCategoryLabel = category === 'all' ? t('all') : t(category);
  const heroStats = [
    { icon: Sparkles, label: copy.localDatabase },
    { icon: MapPin, label: copy.mapsPhotos },
    { icon: ShieldCheck, label: copy.safetyNotes }
  ];

  return html`<div className="places-page grid gap-3 min-w-0">
    <section className="places-hero-card" aria-label=${copy.curatedTitle}>
      <div className="places-hero-image" style=${{ backgroundImage: `url(${placesDesignImage})` }}></div>
      <div className="places-hero-content">
        <p className="places-kicker"><span>${copy.activeCategory}</span><strong>${activeCategoryLabel}</strong></p>
        <h1>${localRecommendations[lang] || localRecommendations.en}</h1>
        <p className="places-hero-intro">${copy.curatedIntro}</p>
        <div className="places-stat-row" aria-label=${visibleCategoryLabels}>
          <span className="places-count-pill">${curatedPlaces.length} ${copy.results}</span>
          ${heroStats.map(stat => html`<span key=${stat.label} className="places-mini-stat"><${stat.icon} className="h-3.5 w-3.5" />${stat.label}</span>`)}
        </div>
        <label className="places-search-panel">
          <span className="sr-only">${t('search')}</span>
          <${Search} className="h-4 w-4" />
          <input type="search" inputMode="search" enterKeyHint="search" autoComplete="off" value=${search} onInput=${e => setSearch(e.target.value)} placeholder=${t('search')} />
        </label>
      </div>
    </section>

    <section className="places-control-card" aria-label=${t('categories')}>
      <div className="places-filter-shell"><${CategoryFilter} /></div>
    </section>

    <section className="places-results-section" aria-label=${copy.curatedTitle}>
      <div className="places-section-heading">
        <h2>${copy.curatedTitle}</h2>
        <span>${curatedPlaces.length} ${copy.results}</span>
      </div>
      ${curatedPlaces.length ? html`<div className="places-results-grid">${curatedPlaces.map(place => html`<${PlaceCard} key=${place.id} place=${placeForPlacesPage(place)} />`)}</div>` : html`<div className="places-empty-state">${copy.empty}</div>`}
    </section>
  </div>`;
}

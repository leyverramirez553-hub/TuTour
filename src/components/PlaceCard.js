import React from 'react';
import {Camera, ExternalLink, Heart, MapPin, ShieldCheck, Star, StarHalf} from 'lucide-react';
import { html } from '../jsx.js';
import { useGuideStore } from '../store/useGuideStore.js';
import { useLanguage } from '../i18n.js';
import { placeMapLink } from '../data/places.js';
import { localizedGoogleMapsUrl } from '../utils/googleMapsLinks.js';

export function StarRating({ rating }) {
  const safeRating = Number.isFinite(Number(rating)) ? Number(rating) : 0;
  const fullStars = Math.max(0, Math.min(5, Math.floor(safeRating)));
  const hasHalfStar = safeRating % 1 >= 0.5 && fullStars < 5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));
  return html`<div className="flex items-center gap-0.5 text-[hsl(var(--accent))]">${Array.from({ length: fullStars }).map((_, i) => html`<${Star} key=${`f-${i}`} className="h-2 w-2 fill-current" />`)}${hasHalfStar ? html`<${StarHalf} key="half" className="h-2 w-2 fill-current" />` : null}${Array.from({ length: emptyStars }).map((_, i) => html`<${Star} key=${`e-${i}`} className="h-2 w-2 opacity-25" />`)}</div>`;
}

export const descriptionKeyFor = (place) => place?.descriptionKey || `${String(place?.id || '').replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())}Description`;
export const placeFieldKeyFor = (place, field) => place?.translationKeys?.[field] || `place.${place?.id}.${field}`;
export const translatedOrFallback = (t, key, fallback = '') => {
  const value = t(key);
  return value === key ? fallback : value;
};
export const translatedPlaceField = (t, place, field, fallback = '') => translatedOrFallback(t, placeFieldKeyFor(place, field), fallback);

export const recommendationFields = ['description', 'bestFor', 'highlights', 'localTip', 'safetyTip', 'bestTime', 'nearby', 'bring', 'accessibility', 'booking'];
export const placeCardVisibleFields = ['name', 'category', 'area', 'address', 'duration', 'price', 'priceLabel', 'description', 'bestFor', 'highlights', 'localTip', 'safetyTip', 'bestTime', 'nearby', 'bring', 'accessibility', 'booking', 'openingHours'];
export const translationKeysForPlaceCard = (place) => placeCardVisibleFields.reduce((keys, field) => ({ ...keys, [field]: placeFieldKeyFor(place, field) }), {});
export const untranslatedRecommendationFields = (t, place) => recommendationFields.filter(field => {
  const legacyKey = field === 'description' ? descriptionKeyFor(place) : placeFieldKeyFor(place, field);
  return t(legacyKey) === legacyKey && place?.[field];
});

export const museoCulturasImage = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE3JRHYj30HZx_2XUgc5bx42Nh6u3mgEG7g-xmnBmCvyj6jD3OFbiv1vhrguraQaWyPuEBilmD6cvEf-UPxW_lrzzcKKMs-d4m0NY-t33pa5WrXrtzFmoAJWAeGBpPDx5gfVBgxEQ=w408-h544-k-no';
export const arcoLetrasJalatlacoImage = '/api/apps/romcWH54d4SR/assets/visual-editor/BarriodeJalatlacomurals.jpg';
export const jardinEtnobotanicoImage = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHYD9sNdost0eLhn-XtMUgQWS71q7RS9hhBJvXWUNo7KbnUv3kvpHp8kFVMwbWnKIXDhIZNgtdTk8eSqKc66Moj7EATraj6EXvxKu9SKlpTAtnA2xQ4HPjhnqW0F3NdUQCbTB3fxQ=w408-h306-k-no';
export const memelasDonaValeImage = '/api/apps/romcWH54d4SR/assets/visual-editor/MemelasDoñaVale.jpg';
export const tlayudasLibresDonaMarthaImage = '/api/apps/romcWH54d4SR/assets/visual-editor/TlayudasLibresDoñaMartha.jpg';
export const lechoncitoDeOroImage = '/api/apps/romcWH54d4SR/assets/visual-editor/LechoncitodeOro.jpg';
export const tallerManosMagicasImage = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHbh_El8xAX0aSH-NIekle4rQdLqwEekKNX5rHVa5NTTVmZDt9cbCJkXUrWaPiOlgq-mpWI0RS950uKu5xMP3HFpenliNMfTGS5JJ33AcYhtOQeYwuTyz4sfwpER2Be980JDPE=w408-h306-k-no';
export const mercado20DeNoviembreImage = '/api/apps/romcWH54d4SR/assets/visual-editor/Mercado20denoviembre.jpg';

export const placeImageSubjectFor = (place = {}) => {
  const rawCategory = String(place.category || '').toLowerCase();
  const rawText = `${place.id || ''} ${place.name || ''} ${place.area || ''}`.toLowerCase();
  if (rawCategory.includes('food') || rawText.includes('mercado') || rawText.includes('market') || rawText.includes('tlayuda') || rawText.includes('memela') || rawText.includes('comedor')) return 'Oaxaca food market';
  if (rawCategory.includes('nature') || rawText.includes('hierve') || rawText.includes('tule') || rawText.includes('garden') || rawText.includes('jardin') || rawText.includes('jardín')) return 'Oaxaca natural landscape';
  if (rawCategory.includes('mezcal') || rawText.includes('mezcal') || rawText.includes('agave') || rawText.includes('matlat')) return 'Oaxaca agave mezcal';
  if (rawCategory.includes('market') || rawText.includes('artesania') || rawText.includes('artesanía') || rawText.includes('craft') || rawText.includes('barro')) return 'Oaxaca artisan market';
  if (rawCategory.includes('culture') || rawText.includes('museo') || rawText.includes('templo') || rawText.includes('iglesia') || rawText.includes('mitla') || rawText.includes('monte')) return 'Oaxaca cultural landmark';
  return 'Oaxaca travel recommendation';
};

export const fallbackPlaceImageFor = (place = {}) => {
  const subject = placeImageSubjectFor(place);
  const seedSource = `${place.id || place.name || subject}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'oaxaca-place';
  return `https://picsum.photos/seed/${encodeURIComponent(`tutour-${subject}-${seedSource}`)}/640/360`;
};

export const targetedPlaceImageOverrides = {
  'museo-culturas': museoCulturasImage,
  'arco-letras-jalatlaco': arcoLetrasJalatlacoImage,
  'memelas-dona-vale': memelasDonaValeImage,
  'tlayudas-libres': tlayudasLibresDonaMarthaImage,
  'tlayudas-libres-dona-martha': tlayudasLibresDonaMarthaImage,
  'lechoncito-de-oro': lechoncitoDeOroImage,
  'taller-manos-magicas': tallerManosMagicasImage,
  'mercado-20-noviembre': mercado20DeNoviembreImage,
  'mercado-20-noviembre-pasillo-humo': mercado20DeNoviembreImage,
  'mercado-20-noviembre-comedores': mercado20DeNoviembreImage,
  'central-abastos': '/api/apps/romcWH54d4SR/assets/visual-editor/CentraldeAbastosdeOaxaca.jpg',
  'mercado-organico-la-cosecha': '/api/apps/romcWH54d4SR/assets/visual-editor/LaCosechaOrganicMarket.jpg',
  'tianguis-domingo-tlacolula': '/api/apps/romcWH54d4SR/assets/visual-editor/TianguisdeDomingoenTlacolula.jpg',
  'extra-google-mercado-iv-centenario': '/api/apps/romcWH54d4SR/assets/visual-editor/MercadoIVCentenario.jpg',
  'extra-google-mercado-de-artesanias-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/MercadodeArtesaníasdeOaxaca.jpg',
  'vida-nueva-cooperative': '/api/apps/romcWH54d4SR/assets/visual-editor/VidaNuevaWomensWeavingCooperative.jpg',
  'alfareria-dona-rosa': '/api/apps/romcWH54d4SR/assets/visual-editor/AlfareriaDoñaRosa.jpg',
  'extra-google-la-casa-de-las-artesanias-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/LaCasadelasArtesaníasdeOaxaca.jpg',
  'extra-google-aripo-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/Aripo.jpg',
  'extra-google-maro-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/MujeresArtesanasdelasRegionesdeOaxaca.jpg',
  'extra-google-jacobo-maria-angeles-workshop': '/api/apps/romcWH54d4SR/assets/visual-editor/JacoboMaríaÁngeles.jpg',
  'extra-google-casa-don-taurino': '/api/apps/romcWH54d4SR/assets/visual-editor/CasaDonTaurino.jpg',
  'extra-google-barro-negro-san-bartolo': '/api/apps/romcWH54d4SR/assets/visual-editor/TalleresdeBarroNegroenSanBartoloCoyotepec.png',
  'extra-google-teotitlan-weaving-workshops': '/api/apps/romcWH54d4SR/assets/visual-editor/TalleresdeTelarenTeotitlán.png',
  'extra-google-santa-maria-atzompa-pottery': '/api/apps/romcWH54d4SR/assets/visual-editor/TalleresdeBarroenSantaMaríaAtzompa.png',
  'extra-google-alfonsina-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/Alfonsina.jpg',
  'extra-google-las-quince-letras': '/api/apps/romcWH54d4SR/assets/visual-editor/LasQuinceLetras.jpg',
  'extra-google-la-olla-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/LaOlla.jpg',
  'extra-google-el-tendajon-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/ElTendajon.jpg',
  'extra-google-origen-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/Origen.jpg',
  'extra-google-ancestral-cocina-tradicional': '/api/apps/romcWH54d4SR/assets/visual-editor/AncestralCocinaTradicional.jpg',
  'extra-google-zandunga-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/ZandungaSaborIstmeño.jpg',
  'extra-google-tacos-del-carmen': '/api/apps/romcWH54d4SR/assets/visual-editor/TacosdelCarmen.jpg',
  'extra-google-nieves-chaguita': '/api/apps/romcWH54d4SR/assets/visual-editor/NievesChagüita.jpg',
  'extra-google-chocolate-mayordomo-centro': '/api/apps/romcWH54d4SR/assets/visual-editor/ChocolateMayordomo.jpg',
  'extra-google-pan-am-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/PanAm.jpg',
  'extra-google-cafe-brujula': '/api/apps/romcWH54d4SR/assets/visual-editor/CafeBrujula.jpg',
  'extra-google-masea-trigo-y-maiz': '/api/apps/romcWH54d4SR/assets/visual-editor/MaseaporTierradelSol.jpg',
  'extra-google-los-pacos-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/LosPacos.jpg',
  'mezcaloteca': '/api/apps/romcWH54d4SR/assets/visual-editor/LaMezcaloteca.jpg',
  'in-situ': '/api/apps/romcWH54d4SR/assets/visual-editor/MezcaleríaInSitu.png',
  'extra-google-parador-turistico-real-matlatl-mezcaleria': '/api/apps/romcWH54d4SR/assets/visual-editor/ParadorTurísticoRealMatlatlMezcalería.jpg',
  'extra-google-mezcaleria-cuish': '/api/apps/romcWH54d4SR/assets/visual-editor/MEZCALERIACUISHPORFIRIO.jpg',
  'extra-google-los-amantes-mezcaleria': '/api/apps/romcWH54d4SR/assets/visual-editor/LosAmantesMezcalería.jpg',
  'extra-google-archivo-maguey': '/api/apps/romcWH54d4SR/assets/visual-editor/ArchivoMaguey-Mezcalería.jpg',
  'extra-google-lalocura-mezcal': '/api/apps/romcWH54d4SR/assets/visual-editor/MezcalLalocura.jpg',
  'extra-google-mezcal-vago-elote': '/api/apps/romcWH54d4SR/assets/visual-editor/MezcalVAGO.jpg',
  'santo-domingo': 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE1Fj05_IIaCY_NKmhLp4YQnfXecccko_uvBSURoYcM7Og-lnKzdEPzHfO1P0q_3H0r4hYjVhiKR4MZyUgNrqg1X5EbFkX_CXx4eR7dbtmNpZVKIKOhPFb_QLZP-jd8ZJX2X0h_=w408-h544-k-no',
  'mitla': '/api/apps/romcWH54d4SR/assets/visual-editor/ZonaArqueológicadeMitla.jpg',
  'jardin-etnobotanico': jardinEtnobotanicoImage,
  'extra-google-parque-ciudad-canteras': '/api/apps/romcWH54d4SR/assets/visual-editor/ParqueCiudaddelasCanteras.jpg',
  'extra-google-cuajimoloyas': '/api/apps/romcWH54d4SR/assets/visual-editor/CuajimoloyasSierraNorte.jpg',
  'extra-google-apoala-waterfalls': '/api/apps/romcWH54d4SR/assets/visual-editor/CascadasdeSantiagoApoala.jpg',
  'extra-google-san-jose-del-pacifico': '/api/apps/romcWH54d4SR/assets/visual-editor/SanJosédelPacifico.jpg',
  'extra-google-laguna-manialtepec': '/api/apps/romcWH54d4SR/assets/visual-editor/LagunadeManialtepec.jpg',
  'hierve-el-agua': '/api/apps/romcWH54d4SR/assets/visual-editor/HierveelAgua.jpg'
};
export const targetedHeroImageRemovals = new Set([]);
export const targetedHeroImageRestorations = new Set(['mercado-artesanias-barro-negro', 'memelas-dona-vale', 'tlayudas-libres', 'tlayudas-libres-dona-martha']);

export const categoryName = { en: 'Culture', es: 'Cultura', fr: 'Culture', de: 'Kultur', it: 'Cultura', pt: 'Cultura', ja: '文化', zh: '文化' };
export const marketCategoryName = { en: 'Markets', es: 'Mercados', fr: 'Marchés', de: 'Märkte', it: 'Mercati', pt: 'Mercados', ja: '市場', zh: '市场' };
export const mezcalCategoryName = { en: 'Mezcal', es: 'Mezcal', fr: 'Mezcal', de: 'Mezcal', it: 'Mezcal', pt: 'Mezcal', ja: 'メスカル', zh: '梅斯卡尔' };
export const freeWord = { en: 'Free', es: 'Gratis', fr: 'Gratuit', de: 'Kostenlos', it: 'Gratuito', pt: 'Gratuito', ja: '無料', zh: '免费' };
export const simpleLocalized = (name, category = 'Culture') => ({ en: { name, category }, es: { name, category: category === 'Culture' ? 'Cultura' : category } });
export const realMatlatlLocalized = {
  en: {
    name: 'Real Matlatl Mezcal Experience', category: 'Mezcal', area: 'Santiago Matatlán', address: 'Santiago Matatlán, Oaxaca, México', duration: '90 min', price: '$$', priceLabel: '$$',
    description: 'A refreshed mezcal-route stop in Santiago Matatlán focused on agave landscapes, traditional palenque methods, guided tasting, and a clear introduction to why this town is known as a mezcal capital.',
    bestFor: 'guided mezcal tasting, agave education, palenque visit, eastern-valley route, small-group learning', highlights: 'mezcal tasting, cooked agave aromas, fermentation vats, stills, Matatlán agave country',
    localTip: 'Ask the guide to explain the roasted agave, fermentation, and distillation steps before tasting; comparing aromas before and after production makes the pours easier to understand.',
    safetyTip: 'Do not drive after tasting. Hire a driver, join a tour, hydrate between pours, eat before visiting, and confirm your return transport before the first sample.',
    bestTime: 'Late morning or early afternoon as part of a Tule, Teotitlán, Mitla, or Matatlán route', openingHours: 'Confirm same-day tasting hours and tour availability on Google Maps before departing',
    nearby: 'Santiago Matatlán palenques, Mitla, Tlacolula de Matamoros, Teotitlán del Valle, Árbol del Tule', bring: 'Water, sun hat, small cash, ID if requested, and a non-driving transport plan',
    accessibility: 'Palenque areas may include gravel, packed earth, steps, smoke, and uneven surfaces; confirm access needs before arriving.', booking: 'Book a driver or guided mezcal route if tasting; independent visitors should confirm hours, tasting options, and pickup timing in advance.'
  },
  es: {
    name: 'Experiencia Mezcalera Real Matlatl', category: 'Mezcal', area: 'Santiago Matatlán', address: 'Santiago Matatlán, Oaxaca, México', duration: '90 min', price: '$$', priceLabel: '$$',
    description: 'Una parada renovada de la ruta del mezcal en Santiago Matatlán, centrada en paisajes de agave, métodos tradicionales de palenque, cata guiada y una introducción clara a la capital del mezcal.',
    bestFor: 'cata guiada de mezcal, educación sobre agave, visita de palenque, ruta de valles orientales, aprendizaje en grupo pequeño', highlights: 'cata de mezcal, aromas de agave cocido, tinas de fermentación, alambiques, paisaje agavero de Matatlán',
    localTip: 'Pide que expliquen el agave cocido, la fermentación y la destilación antes de probar; comparar aromas ayuda a entender cada copa.',
    safetyTip: 'No manejes después de la cata. Contrata chofer, únete a un tour, hidrátate entre copas, come antes de ir y confirma el transporte de regreso antes de iniciar.',
    bestTime: 'Media mañana o primeras horas de la tarde dentro de una ruta por Tule, Teotitlán, Mitla o Matatlán', openingHours: 'Confirma horarios de cata y disponibilidad del día en Google Maps antes de salir',
    nearby: 'Palenques de Santiago Matatlán, Mitla, Tlacolula de Matamoros, Teotitlán del Valle, Árbol del Tule', bring: 'Agua, sombrero, efectivo pequeño, identificación si la solicitan y transporte sin manejar',
    accessibility: 'Los palenques pueden tener grava, tierra compacta, escalones, humo y superficies irregulares; confirma necesidades de acceso antes de llegar.', booking: 'Reserva chofer o ruta guiada si vas a catar; si vas por tu cuenta, confirma horarios, opciones de degustación y hora de recogida.'
  },
  fr: {
    name: 'Expérience Mezcal Real Matlatl', category: 'Mezcal', area: 'Santiago Matatlán', address: 'Santiago Matatlán, Oaxaca, Mexique', duration: '90 min', price: '$$', priceLabel: '$$',
    description: 'Une halte mezcal renouvelée à Santiago Matatlán, entre paysages d’agave, méthodes traditionnelles de palenque, dégustation guidée et introduction claire à la capitale du mezcal.',
    bestFor: 'dégustation guidée de mezcal, pédagogie sur l’agave, visite de palenque, route des vallées orientales', highlights: 'dégustation de mezcal, agave cuit, cuves de fermentation, alambics, paysages d’agave de Matatlán',
    localTip: 'Demandez une explication du broyage, de la fermentation et de la distillation avant la dégustation.',
    safetyTip: 'Ne conduisez pas après la dégustation. Prenez un chauffeur ou une visite guidée, buvez de l’eau et confirmez le retour avant de commencer.',
    bestTime: 'Fin de matinée ou début d’après-midi dans une route vers Tule, Teotitlán, Mitla ou Matatlán', openingHours: 'Vérifiez les horaires et disponibilités du jour sur Google Maps avant de partir',
    nearby: 'Palenques de Santiago Matatlán, Mitla, Tlacolula de Matamoros, Teotitlán del Valle, Árbol del Tule', bring: 'Eau, chapeau, petites espèces, pièce d’identité si demandée et transport sans conduite',
    accessibility: 'Les palenques peuvent avoir gravier, terre, marches, fumée et sols irréguliers; confirmez l’accès avant la visite.', booking: 'Réservez un chauffeur ou une route guidée si vous dégustez; confirmez horaires et prise en charge à l’avance.'
  },
  de: {
    name: 'Real Matlatl Mezcal-Erlebnis', category: 'Mezcal', area: 'Santiago Matatlán', address: 'Santiago Matatlán, Oaxaca, Mexiko', duration: '90 Min.', price: '$$', priceLabel: '$$',
    description: 'Ein erneuerter Mezcal-Stopp in Santiago Matatlán mit Agavenlandschaften, traditionellen Palenque-Methoden, geführter Verkostung und klarer Einführung in die Mezcal-Hauptstadt.',
    bestFor: 'geführte Mezcal-Verkostung, Agavenkunde, Palenque-Besuch, Route im östlichen Tal', highlights: 'Mezcal-Verkostung, gekochte Agave, Fermentation, Brennapparate, Agavenland Matatlán',
    localTip: 'Lass dir vor dem Probieren geröstete Agave, Fermentation und Destillation erklären.',
    safetyTip: 'Fahre nach der Verkostung nicht selbst. Buche Fahrer oder Tour, trinke Wasser und bestätige die Rückfahrt vor dem ersten Glas.',
    bestTime: 'Später Vormittag oder früher Nachmittag als Teil einer Route nach Tule, Teotitlán, Mitla oder Matatlán', openingHours: 'Aktuelle Verkostungszeiten und Verfügbarkeit vorab auf Google Maps prüfen',
    nearby: 'Palenques von Santiago Matatlán, Mitla, Tlacolula de Matamoros, Teotitlán del Valle, Árbol del Tule', bring: 'Wasser, Sonnenhut, kleines Bargeld, ggf. Ausweis und eine Transportlösung ohne Selbstfahren',
    accessibility: 'Palenques können Kies, Erde, Stufen, Rauch und unebene Flächen haben; Zugang vorher bestätigen.', booking: 'Bei Verkostung Fahrer oder geführte Route buchen; Zeiten, Optionen und Abholung vorher bestätigen.'
  },
  it: {
    name: 'Esperienza Mezcal Real Matlatl', category: 'Mezcal', area: 'Santiago Matatlán', address: 'Santiago Matatlán, Oaxaca, Messico', duration: '90 min', price: '$$', priceLabel: '$$',
    description: 'Una tappa mezcal rinnovata a Santiago Matatlán, tra paesaggi di agave, metodi tradizionali di palenque, degustazione guidata e introduzione alla capitale del mezcal.',
    bestFor: 'degustazione guidata di mezcal, educazione sull’agave, visita al palenque, ruta delle valli orientali', highlights: 'degustazione mezcal, agave cotta, vasche di fermentazione, alambicchi, agavi di Matatlán',
    localTip: 'Chiedete di spiegare agave cotta, fermentazione e distillazione prima della degustazione.',
    safetyTip: 'Non guidate dopo l’assaggio. Usate autista o tour, bevete acqua e confermate il rientro prima di iniziare.',
    bestTime: 'Tarda mattina o primo pomeriggio in una ruta con Tule, Teotitlán, Mitla o Matatlán', openingHours: 'Confermate orari e disponibilità del giorno su Google Maps prima di partire',
    nearby: 'Palenques di Santiago Matatlán, Mitla, Tlacolula de Matamoros, Teotitlán del Valle, Árbol del Tule', bring: 'Acqua, cappello, contanti piccoli, documento se richiesto e trasporto senza guidare',
    accessibility: 'I palenques possono avere ghiaia, terra battuta, gradini, fumo e superfici irregolari; verificate l’accesso prima.', booking: 'Prenotate autista o tour guidato se degustate; confermate orari, opzioni e ritiro in anticipo.'
  },
  pt: {
    name: 'Experiência de Mezcal Real Matlatl', category: 'Mezcal', area: 'Santiago Matatlán', address: 'Santiago Matatlán, Oaxaca, México', duration: '90 min', price: '$$', priceLabel: '$$',
    description: 'Uma parada renovada de mezcal em Santiago Matatlán, com paisagens de agave, métodos tradicionais de palenque, degustação guiada e introdução clara à capital do mezcal.',
    bestFor: 'degustação guiada de mezcal, educação sobre agave, visita a palenque, rota dos vales orientais', highlights: 'degustação de mezcal, agave cozido, fermentação, alambiques, paisagem de agave de Matatlán',
    localTip: 'Peça uma explicação sobre agave cozido, fermentação e destilação antes de provar.',
    safetyTip: 'Não dirija após a degustação. Contrate motorista ou tour, beba água e confirme o retorno antes da primeira amostra.',
    bestTime: 'Fim da manhã ou começo da tarde em uma rota com Tule, Teotitlán, Mitla ou Matatlán', openingHours: 'Confirme horários e disponibilidade do dia no Google Maps antes de sair',
    nearby: 'Palenques de Santiago Matatlán, Mitla, Tlacolula de Matamoros, Teotitlán del Valle, Árbol del Tule', bring: 'Água, chapéu, dinheiro trocado, documento se solicitado e transporte sem dirigir',
    accessibility: 'Palenques podem ter cascalho, terra, degraus, fumaça e superfícies irregulares; confirme acesso antes.', booking: 'Reserve motorista ou rota guiada se for degustar; confirme horários, opções e retirada com antecedência.'
  },
  ja: {
    name: 'Real Matlatl メスカル体験', category: 'メスカル', area: 'サンティアゴ・マタトラン', address: 'Santiago Matatlán, Oaxaca, México', duration: '90分', price: '$$', priceLabel: '$$',
    description: 'サンティアゴ・マタトランの新しいメスカル体験カード。アガベ畑、伝統的なパレンケ、ガイド付き試飲を通して、メスカルの町として知られる理由を学べます。',
    bestFor: 'ガイド付きメスカル試飲、アガベ学習、パレンケ見学、東バレーのルート', highlights: 'メスカル試飲、蒸し焼きアガベ、発酵槽、蒸留器、マタトランのアガベ風景',
    localTip: '試飲前に、焼いたアガベ、発酵、蒸留の流れを説明してもらうと味の違いが分かりやすくなります。',
    safetyTip: '試飲後は運転しないでください。運転手やツアーを手配し、水を飲み、最初の一杯の前に帰りの交通を確認しましょう。',
    bestTime: 'トゥーレ、テオティトラン、ミトラ、マタトランを巡る午前遅めまたは午後早め', openingHours: '出発前にGoogleマップで当日の試飲時間と空き状況を確認してください',
    nearby: 'サンティアゴ・マタトランのパレンケ、ミトラ、トラコルラ、テオティトラン・デル・バジェ、トゥーレの木', bring: '水、帽子、小額現金、必要な場合は身分証、運転しない移動手段',
    accessibility: 'パレンケには砂利、土、段差、煙、不整地がある場合があります。必要なアクセス条件は事前に確認してください。', booking: '試飲する場合は運転手またはガイド付きルートの予約がおすすめです。時間、試飲内容、迎車を事前に確認しましょう。'
  },
  zh: {
    name: 'Real Matlatl 梅斯卡尔体验', category: '梅斯卡尔', area: '圣地亚哥·马塔特兰', address: 'Santiago Matatlán, Oaxaca, México', duration: '90分钟', price: '$$', priceLabel: '$$',
    description: '位于圣地亚哥·马塔特兰的全新梅斯卡尔路线卡片，重点介绍龙舌兰景观、传统 palenque 工艺、导览品鉴，以及这座小镇为何被称为梅斯卡尔之都。',
    bestFor: '导览梅斯卡尔品鉴、龙舌兰知识、palenque 参观、东部山谷路线、小团学习', highlights: '梅斯卡尔品鉴、熟龙舌兰香气、发酵槽、蒸馏器、马塔特兰龙舌兰田',
    localTip: '品尝前请向导解释烤熟龙舌兰、发酵和蒸馏步骤；先闻香气再品尝，会更容易理解每一杯。',
    safetyTip: '品鉴后不要开车。请雇司机或参加旅行团，杯间补水，出发前先用餐，并在第一杯前确认返程交通。',
    bestTime: '上午较晚或下午较早，可与图莱、特奥蒂特兰、米特拉或马塔特兰路线结合', openingHours: '出发前请在 Google 地图确认当天品鉴时间和导览可用性',
    nearby: '圣地亚哥·马塔特兰 palenques、米特拉、特拉科卢拉、特奥蒂特兰德尔瓦耶、图莱之树', bring: '水、遮阳帽、小额现金、如需则带身份证件，以及不自驾的交通方案',
    accessibility: 'Palenque 区域可能有碎石、土路、台阶、烟雾和不平地面；如有无障碍需求，请提前确认。', booking: '如要品鉴，建议预订司机或导览梅斯卡尔路线；自由行请提前确认营业时间、品鉴选项和接送时间。'
  }
};
export const laAsuncionOaxacaPlaceCard = {
  id: 'mercado-artesanias-la-asuncion-oaxaca',
  name: 'Mercado de Artesanías La Asunción Oaxaca',
  category: 'Markets',
  area: 'Oaxaca de Juárez',
  address: 'Centro Histórico, Oaxaca de Juárez, Oax., México',
  duration: '45–75 min',
  price: '$',
  priceLabel: '$',
  rating: 4.6,
  accent: '24 88% 48%',
  image: '/api/apps/romcWH54d4SR/assets/visual-editor/MercadodeArtesaníasLaAsunciónAtzompa.jpg',
  maps: 'https://www.google.com/maps/search/?api=1&query=Mercado%20de%20Artesan%C3%ADas%20La%20Asunci%C3%B3n%20Oaxaca%20Oaxaca%20de%20Ju%C3%A1rez',
  photos: 'https://www.google.com/maps/search/Mercado%20de%20Artesan%C3%ADas%20La%20Asunci%C3%B3n%20Oaxaca%20photos',
  description: 'A dedicated artisan market in Oaxaca de Juárez for browsing locally made green-glazed pottery, everyday clay pieces, decorative ceramics, and family workshop stalls without the rush of the city center.',
  bestFor: 'artisan market, pottery shopping, ceramics, local makers, Oaxaca day trip',
  highlights: 'green-glazed pottery, ceramic bowls and figurines, artisan stalls, village workshop atmosphere, direct-maker shopping',
  localTip: 'Bring small bills and ask which pieces are made by the seller’s family; many artisans can explain firing styles, care, and safe packing for travel.',
  safetyTip: 'Visit during daylight, keep purchases close while loading taxis, and arrange return transportation before you wander farther into residential streets.',
  bestTime: 'Late morning to early afternoon, especially after breakfast in Oaxaca City and before the hottest part of the day',
  openingHours: 'Confirm same-day stall hours on Google Maps before departing; market activity can vary by season and artisan availability.',
  nearby: 'Oaxaca de Juárez pottery workshops, Oaxaca archaeological zone, Oaxaca City Centro, Mercado de Abastos',
  bring: 'Small cash, reusable tote, wrapping material for fragile ceramics, sun protection, and a rideshare or taxi plan.',
  accessibility: 'Market aisles and surrounding sidewalks may be uneven or narrow; confirm step-free access and parking needs before visiting.',
  booking: 'No advance booking is usually needed for browsing; book a pottery workshop or guide separately if you want a hands-on visit.',
  localized: {
    en: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: 'Markets', area: 'Oaxaca de Juárez', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45–75 min', price: '$', priceLabel: '$',
      description: 'A dedicated artisan market in Oaxaca de Juárez for browsing locally made green-glazed pottery, everyday clay pieces, decorative ceramics, and family workshop stalls without the rush of the city center.',
      bestFor: 'artisan market, pottery shopping, ceramics, local makers, Oaxaca day trip', highlights: 'green-glazed pottery, ceramic bowls and figurines, artisan stalls, village workshop atmosphere, direct-maker shopping',
      localTip: 'Bring small bills and ask which pieces are made by the seller’s family; many artisans can explain firing styles, care, and safe packing for travel.',
      safetyTip: 'Visit during daylight, keep purchases close while loading taxis, and arrange return transportation before you wander farther into residential streets.',
      bestTime: 'Late morning to early afternoon, especially after breakfast in Oaxaca City and before the hottest part of the day', openingHours: 'Confirm same-day stall hours on Google Maps before departing; market activity can vary by season and artisan availability.',
      nearby: 'Oaxaca de Juárez pottery workshops, Oaxaca archaeological zone, Oaxaca City Centro, Mercado de Abastos', bring: 'Small cash, reusable tote, wrapping material for fragile ceramics, sun protection, and a rideshare or taxi plan.',
      accessibility: 'Market aisles and surrounding sidewalks may be uneven or narrow; confirm step-free access and parking needs before visiting.', booking: 'No advance booking is usually needed for browsing; book a pottery workshop or guide separately if you want a hands-on visit.'
    },
    es: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: 'Mercados', area: 'Oaxaca de Juárez', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45–75 min', price: '$', priceLabel: '$',
      description: 'Un mercado artesanal en Oaxaca de Juárez para recorrer barro vidriado verde, piezas de uso diario, cerámica decorativa y puestos familiares sin la prisa del centro de la ciudad.',
      bestFor: 'mercado artesanal, compra de barro, cerámica, artesanos locales, escapada a Oaxaca', highlights: 'barro verde vidriado, cuencos y figuras de cerámica, puestos artesanales, ambiente de taller de pueblo, compra directa al creador',
      localTip: 'Lleva billetes pequeños y pregunta qué piezas hizo la familia del vendedor; muchos artesanos explican técnicas de cocción, cuidado y empaque seguro.',
      safetyTip: 'Visita de día, mantén tus compras cerca al subir al taxi y organiza el transporte de regreso antes de caminar por calles residenciales.',
      bestTime: 'Final de la mañana o primeras horas de la tarde, después de desayunar en Oaxaca y antes del calor fuerte', openingHours: 'Confirma horarios del día en Google Maps antes de salir; la actividad puede variar por temporada y disponibilidad de artesanos.',
      nearby: 'Talleres alfareros de Oaxaca de Juárez, zona arqueológica de Oaxaca, Centro de Oaxaca, Mercado de Abastos', bring: 'Efectivo pequeño, bolsa reutilizable, material para envolver cerámica frágil, protección solar y plan de taxi o app.',
      accessibility: 'Los pasillos y banquetas cercanas pueden ser irregulares o estrechos; confirma acceso sin escalones y estacionamiento si lo necesitas.', booking: 'Normalmente no necesitas reservar para recorrer; reserva aparte un taller de barro o guía si quieres una visita práctica.'
    },
    fr: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: 'Marchés', area: 'Oaxaca de Juárez', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45–75 min', price: '$', priceLabel: '$',
      description: 'Un marché d’artisans à Oaxaca de Juárez pour découvrir poteries vertes vernissées, pièces utilitaires, céramiques décoratives et stands familiaux loin de l’agitation du centre.',
      bestFor: 'marché artisanal, achats de poterie, céramique, artisans locaux, excursion à Oaxaca', highlights: 'poterie verte vernissée, bols et figurines en céramique, stands d’artisans, ambiance de village, achat direct',
      localTip: 'Apportez de petites coupures et demandez quelles pièces sont faites par la famille du vendeur; beaucoup expliquent cuisson, entretien et emballage.',
      safetyTip: 'Venez de jour, gardez vos achats près de vous en montant en taxi et organisez le retour avant de vous éloigner dans les rues résidentielles.',
      bestTime: 'Fin de matinée ou début d’après-midi, après le petit-déjeuner à Oaxaca et avant la chaleur', openingHours: 'Vérifiez les horaires du jour sur Google Maps avant de partir; l’activité varie selon la saison et les artisans.',
      nearby: 'Ateliers de poterie de Oaxaca de Juárez, zone archéologique d’Oaxaca, Centro de Oaxaca, Mercado de Abastos', bring: 'Petites espèces, sac réutilisable, protection pour céramique fragile, soleil et plan taxi/VTC.',
      accessibility: 'Les allées et trottoirs peuvent être irréguliers ou étroits; confirmez l’accès sans marche et le stationnement si nécessaire.', booking: 'Pas de réservation pour flâner; réservez séparément un atelier de poterie ou un guide pour une visite pratique.'
    },
    de: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: 'Märkte', area: 'Oaxaca de Juárez', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45–75 Min.', price: '$', priceLabel: '$',
      description: 'Ein Kunsthandwerksmarkt in Oaxaca de Juárez für grün glasierte Keramik, Alltagsgeschirr, dekorative Stücke und Familienstände abseits der Hektik des Zentrums.',
      bestFor: 'Kunsthandwerksmarkt, Keramikkauf, Töpferei, lokale Hersteller, Oaxaca-Ausflug', highlights: 'grün glasierte Keramik, Schalen und Figuren, Kunsthandwerksstände, Dorfwerkstatt-Atmosphäre, Direktkauf',
      localTip: 'Nimm kleine Scheine mit und frage, welche Stücke von der Familie gemacht wurden; viele erklären Brand, Pflege und sicheres Verpacken.',
      safetyTip: 'Besuche den Markt bei Tageslicht, halte Einkäufe beim Taxi nah bei dir und organisiere die Rückfahrt, bevor du weiter in Wohnstraßen gehst.',
      bestTime: 'Später Vormittag bis früher Nachmittag, nach dem Frühstück in Oaxaca und vor der größten Hitze', openingHours: 'Prüfe Tageszeiten auf Google Maps; Marktaktivität kann je nach Saison und Verfügbarkeit der Kunsthandwerker variieren.',
      nearby: 'Töpferwerkstätten von Oaxaca de Juárez, archäologische Zone Oaxaca, Oaxaca Centro, Mercado de Abastos', bring: 'Kleines Bargeld, Stofftasche, Verpackung für fragile Keramik, Sonnenschutz und Taxi-/Rideshare-Plan.',
      accessibility: 'Gänge und Gehwege können uneben oder schmal sein; stufenfreien Zugang und Parken vorher bestätigen.', booking: 'Zum Stöbern meist keine Buchung nötig; Töpferworkshop oder Guide separat reservieren.'
    },
    it: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: 'Mercati', area: 'Oaxaca de Juárez', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45–75 min', price: '$', priceLabel: '$',
      description: 'Un mercato artigianale a Oaxaca de Juárez dove cercare ceramica verde invetriata, pezzi d’uso quotidiano, ceramiche decorative e banchi familiari senza la fretta del centro.',
      bestFor: 'mercato artigianale, acquisto ceramiche, artigiani locali, gita ad Oaxaca', highlights: 'ceramica verde invetriata, ciotole e figurine, banchi artigianali, atmosfera di bottega di paese, acquisto diretto',
      localTip: 'Porta banconote piccole e chiedi quali pezzi sono fatti dalla famiglia del venditore; molti spiegano cottura, cura e imballaggio.',
      safetyTip: 'Visita di giorno, tieni vicini gli acquisti salendo in taxi e organizza il ritorno prima di addentrarti nelle strade residenziali.',
      bestTime: 'Tarda mattina o primo pomeriggio, dopo colazione a Oaxaca e prima del caldo più intenso', openingHours: 'Controlla gli orari del giorno su Google Maps; l’attività varia per stagione e disponibilità degli artigiani.',
      nearby: 'Laboratori di ceramica di Oaxaca de Juárez, zona archeologica di Oaxaca, Centro di Oaxaca, Mercado de Abastos', bring: 'Contanti piccoli, borsa riutilizzabile, materiale per avvolgere ceramiche fragili, protezione solare e piano taxi.',
      accessibility: 'Corsie e marciapiedi possono essere irregolari o stretti; conferma accesso senza gradini e parcheggio se necessario.', booking: 'Di solito non serve prenotare per visitare; prenota a parte un laboratorio o una guida per un’esperienza pratica.'
    },
    pt: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: 'Mercados', area: 'Oaxaca de Juárez', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45–75 min', price: '$', priceLabel: '$',
      description: 'Um mercado artesanal em Oaxaca de Juárez para ver cerâmica verde vitrificada, peças do dia a dia, cerâmica decorativa e bancas familiares sem a correria do centro.',
      bestFor: 'mercado artesanal, compras de cerâmica, artesãos locais, passeio a Oaxaca', highlights: 'cerâmica verde vitrificada, tigelas e figuras, bancas artesanais, ambiente de oficina de vila, compra direta',
      localTip: 'Leve notas pequenas e pergunte quais peças foram feitas pela família do vendedor; muitos explicam queima, cuidados e embalagem segura.',
      safetyTip: 'Visite durante o dia, mantenha compras perto ao entrar no táxi e organize o retorno antes de caminhar por ruas residenciais.',
      bestTime: 'Fim da manhã ou começo da tarde, após o café da manhã em Oaxaca e antes do calor forte', openingHours: 'Confirme os horários do dia no Google Maps antes de sair; a atividade varia por temporada e disponibilidade dos artesãos.',
      nearby: 'Oficinas de cerâmica de Oaxaca de Juárez, zona arqueológica de Oaxaca, Centro de Oaxaca, Mercado de Abastos', bring: 'Dinheiro trocado, sacola reutilizável, material para proteger cerâmica frágil, proteção solar e plano de táxi/app.',
      accessibility: 'Corredores e calçadas podem ser irregulares ou estreitos; confirme acesso sem degraus e estacionamento se precisar.', booking: 'Normalmente não é preciso reservar para visitar; reserve oficina de cerâmica ou guia separadamente se quiser uma experiência prática.'
    },
    ja: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: '市場', area: 'サンタ・マリア・オアハカ', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45〜75分', price: '$', priceLabel: '$',
      description: 'サンタ・マリア・オアハカの工芸市場。緑釉の陶器、日用品の土器、装飾陶器、家族経営の屋台を、中心部の混雑を避けて見て回れます。',
      bestFor: '工芸市場、陶器探し、地元職人、オアハカ日帰り', highlights: '緑釉陶器、陶器の器と人形、職人の屋台、村の工房らしい雰囲気、作り手から直接購入',
      localTip: '小額紙幣を持参し、売り手の家族が作った作品を尋ねましょう。焼成方法、手入れ、梱包を教えてくれることがあります。',
      safetyTip: '日中に訪れ、タクシーに乗る時は購入品を手元に。住宅街を歩く前に帰りの交通手段を決めておきましょう。',
      bestTime: 'オアハカ市内で朝食後、暑さが強くなる前の午前遅めから午後早め', openingHours: '出発前にGoogleマップで当日の営業時間を確認。季節や職人の都合で変わることがあります。',
      nearby: 'サンタ・マリア・オアハカの陶芸工房、オアハカ遺跡、オアハカ中心部、メルカド・デ・アバストス', bring: '小額現金、再利用バッグ、割れ物用の包材、日よけ、タクシーまたは配車アプリの計画。',
      accessibility: '通路や周辺歩道は狭い、または凹凸がある場合があります。段差なしアクセスや駐車は事前確認を。', booking: '見学だけなら通常予約不要。陶芸体験やガイド付き訪問は別途予約しましょう。'
    },
    zh: {
      name: 'Mercado de Artesanías La Asunción Oaxaca', category: '市场', area: '圣玛丽亚·瓦哈卡', address: 'Centro Histórico, Oaxaca de Juárez, Oax., México', duration: '45–75分钟', price: '$', priceLabel: '$',
      description: '圣玛丽亚·瓦哈卡的手工艺市场，可浏览当地绿色釉陶、日用陶器、装饰陶瓷和家庭工坊摊位，节奏比市中心更从容。',
      bestFor: '手工艺市场、陶器购物、当地匠人、瓦哈卡一日游', highlights: '绿色釉陶、陶碗和陶偶、手工艺摊位、村镇工坊氛围、直接向创作者购买',
      localTip: '带小额现金，并询问哪些作品出自摊主家庭；许多匠人会说明烧制、保养和安全打包方法。',
      safetyTip: '建议白天前往，上出租车时看好购买品，走进住宅街前先安排好返程交通。',
      bestTime: '上午较晚到下午较早，适合在瓦哈卡市早餐后、天气最热前前往', openingHours: '出发前请在 Google 地图确认当天摊位时间；市场活跃度会随季节和匠人安排变化。',
      nearby: '圣玛丽亚·瓦哈卡陶艺工坊、瓦哈卡考古区、瓦哈卡市中心、Mercado de Abastos', bring: '小额现金、环保袋、易碎陶器包装材料、防晒用品，以及出租车或网约车计划。',
      accessibility: '市场通道和周边人行道可能不平或较窄；如需无台阶通行或停车，请提前确认。', booking: '单纯逛市场通常无需预约；如需陶艺工作坊或导览，请另行预订。'
    }
  }
};

export const targetedPlaceContentOverrides = {
  'mercado-artesanias-santa-maria-atzompa': laAsuncionOaxacaPlaceCard,
  'mercado-artesanias-atzompa': laAsuncionOaxacaPlaceCard,
  'mercado-artesanias-barro-negro': laAsuncionOaxacaPlaceCard
};

export const shouldReplaceOaxacaArtisanMarket = (place = {}) => {
  const possibleNames = [place.name, place.localized?.en?.name, place.localized?.es?.name].filter(Boolean).map(value => String(value).toLowerCase());
  return possibleNames.some(value => value.includes('mercado de artesanías de santa maría atzompa') || value.includes('mercado de artesanias de santa maria atzompa'));
};

export function PlaceCard({ place }) {
  const contentOverride = targetedPlaceContentOverrides[place?.id] || (shouldReplaceOaxacaArtisanMarket(place) ? laAsuncionOaxacaPlaceCard : null);
  const cardPlace = contentOverride ? { ...place, ...contentOverride, localized: { ...(place.localized || {}), ...(contentOverride.localized || {}) } } : place;
  const { t, language } = useLanguage();
  const favorites = useGuideStore(s => s.favorites);
  const toggleFavorite = useGuideStore(s => s.toggleFavorite);
  const [details, setDetails] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => { setImgError(false); setDetails(false); }, [cardPlace?.id]);

  if (!cardPlace) return null;

  const localizedValue = (field) => {
    const value = cardPlace.localized?.[language]?.[field] ?? cardPlace.localized?.en?.[field];
    return value !== undefined && value !== null && String(value).trim() ? value : null;
  };
  const placeText = (field, fallback = '') => localizedValue(field) || translatedPlaceField(t, cardPlace, field, fallback);
  const name = placeText('name', cardPlace.name);
  const category = placeText('category', t(cardPlace.category));
  const area = placeText('area', cardPlace.area || 'Oaxaca');
  const duration = placeText('duration', cardPlace.duration || '45 min');
  const price = placeText('price', cardPlace.priceLabel || cardPlace.price || '$');
  const highlights = placeText('highlights', cardPlace.highlights || cardPlace.bestFor || category);
  const localTip = placeText('localTip', cardPlace.localTip || translatedOrFallback(t, 'place.default.localTip', 'Confirm current hours before you go.'));
  const safetyTip = placeText('safetyTip', cardPlace.safetyTip || translatedOrFallback(t, 'place.default.safetyTip', 'Visit in daylight and keep valuables secure.'));
  const bestTime = placeText('bestTime', cardPlace.bestTime || cardPlace.openingHours || 'Morning or late afternoon');
  const openingHours = placeText('openingHours', cardPlace.openingHours || bestTime);
  const nearby = placeText('nearby', cardPlace.nearby || area);
  const bring = placeText('bring', cardPlace.bring || 'Water, sun protection, small bills, and comfortable shoes.');
  const accessibility = placeText('accessibility', cardPlace.accessibility || 'Historic streets may have uneven sidewalks; confirm step-free access before you go.');
  const booking = placeText('booking', cardPlace.booking || 'Reserve popular restaurants, tastings, and guided sites ahead.');
  const fallbackAddress = `${area}, Oaxaca, México`;
  const address = placeText('address', translatedOrFallback(t, 'place.addressTemplate', fallbackAddress).replace('{area}', area));
  const descriptionText = localizedValue('description') || translatedOrFallback(t, descriptionKeyFor(cardPlace), placeText('description', cardPlace.description || cardPlace.bestFor || highlights));
  const liked = favorites.includes(cardPlace.id);
  const detailRows = [['estimatedCost', price], ['bestTime', openingHours], ['nearbyStops', nearby], ['whatToBring', bring], ['accessibilityNotes', accessibility], ['bookingTips', booking]];
  const toggleCardDetails = () => setDetails(value => !value);
  const onCardKeyDown = (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleCardDetails(); } };
  const toggleSaved = (event) => { event.stopPropagation(); toggleFavorite(cardPlace.id); };
  const stopCardToggle = event => event.stopPropagation();

  const existingCardImage = targetedPlaceImageOverrides[cardPlace.id] || cardPlace.image;
  const cardImageSubject = placeImageSubjectFor(cardPlace);
  const fallbackCardImage = fallbackPlaceImageFor(cardPlace);
  const cardImage = existingCardImage || fallbackCardImage;
  const renderedCardImage = imgError && existingCardImage ? fallbackCardImage : cardImage;
  const showTextImageFallback = imgError && !existingCardImage;
  const hideHeroImage = false;
  const mapHref = localizedGoogleMapsUrl(cardPlace.maps || placeMapLink(cardPlace), language);
  const photosHref = cardPlace.photos ? localizedGoogleMapsUrl(cardPlace.photos, language) : '';
  const isMercado20PasilloCard = cardPlace.id === 'mercado-20-noviembre-pasillo-humo';
  const isMercado20ExactAddressCard = isMercado20PasilloCard || cardPlace.id === 'mercado-20-noviembre-comedores';
  const isElTendajonExactAddressCard = cardPlace.id === 'el-tendajon-oaxaca';
  const mercado20Address = 'Miguel Cabrera 116, OAX_RE_BENITO JUAREZ, Centro, 68000 Oaxaca de Juárez, Oax.';
  const mercado20CanonicalMapHref = localizedGoogleMapsUrl('https://www.google.com/maps/place/Mercado+20+de+Noviembre/@17.0588698,-96.7249288,17z/data=!3m1!4b1!4m6!3m5!1s0x85c7224018ee911d:0xf952676839a8c642!8m2!3d17.0588698!4d-96.7249288!16s%2Fg%2F1v_z8pcy', language);
  const elTendajonAddress = 'Calle de José María Pino Suárez 409, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax.';
  const elTendajonMapHref = localizedGoogleMapsUrl('https://www.google.com/maps/search/?api=1&query=El%20Tendaj%C3%B3n%20Calle%20de%20Jos%C3%A9%20Mar%C3%ADa%20Pino%20Su%C3%A1rez%20409%2C%20RUTA%20INDEPENDENCIA%2C%20Centro%2C%2068000%20Oaxaca%20de%20Ju%C3%A1rez%2C%20Oax.', language);
  const displayName = isMercado20PasilloCard ? 'Mercado 20 de Noviembre' : name;
  const displayAddress = isElTendajonExactAddressCard ? elTendajonAddress : isMercado20ExactAddressCard ? mercado20Address : address;
  const displayMapHref = isElTendajonExactAddressCard ? elTendajonMapHref : isMercado20ExactAddressCard ? mercado20CanonicalMapHref : mapHref;
  const curatedLabel = translatedOrFallback(t, 'place.curatedLabel', 'curated');
  const popularChoice = translatedOrFallback(t, 'place.popularChoice', '🔥 Popular choice');

  return html`<article role="button" tabIndex="0" onClick=${toggleCardDetails} onKeyDown=${onCardKeyDown} aria-expanded=${details} aria-label=${`${displayName}. ${details ? t('view') : t('viewDetails')}`} className="art-card group rounded-[var(--radius-lg)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-[var(--shadow-sm)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-[var(--transition-smooth)] cursor-pointer focus-ring"><div className="relative min-h-20 overflow-hidden" style=${{ background: `linear-gradient(135deg, hsl(${cardPlace.accent || '24 75% 44%'} / .92), hsl(var(--foreground) / .72))` }}>${hideHeroImage ? null : !showTextImageFallback && renderedCardImage ? html`<img data-genmb-img=${cardImageSubject} src=${renderedCardImage} alt=${displayName} onError=${() => setImgError(true)} className="h-24 w-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer-when-downgrade" />` : html`<div className="grid h-24 place-items-center bg-[hsl(var(--muted))] px-2 text-center text-[11px] font-black text-[hsl(var(--muted-foreground))]">${displayName}</div>`}${cardPlace.category === 'food' ? html`<div className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded-full bg-[hsl(var(--accent))] px-1.5 py-0.5 text-[8px] font-black text-black shadow-sm"><span>${popularChoice}</span></div>` : null}<div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-1 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-2 text-[9px] font-black text-white"><span className="rounded-full bg-[hsl(var(--primary))] px-1.5 py-0.5 shadow-sm uppercase tracking-wide text-[7px]">${category}</span><div className="flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md px-1.5 py-0.5 border border-white/10"><${StarRating} rating=${cardPlace.rating} /><span className="text-[9px]">${Number(cardPlace.rating || 0).toFixed(1)}</span><span className="opacity-70 font-medium">(${curatedLabel})</span></div><span className="rounded-full bg-white/15 backdrop-blur-md px-1.5 py-0.5 border border-white/10 font-bold">${duration}</span></div></div><div className="p-2.5 pt-2"><div className="flex items-start justify-between gap-2 min-w-0"><div className="min-w-0 flex-1"><h3 className="text-[14px] font-black leading-tight tracking-tight break-words text-[hsl(var(--foreground))]">${displayName}</h3><p className="mt-0.5 flex items-center gap-1 text-[10.5px] font-semibold text-[hsl(var(--muted-foreground))]"><${MapPin} className="h-2.5 w-2.5 shrink-0 text-[hsl(var(--primary))]" />${displayAddress}</p></div><button type="button" aria-label=${`${t('save')}: ${displayName}`} onClick=${toggleSaved} className=${`focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${liked ? 'bg-[hsl(var(--destructive)/0.14)] text-[hsl(var(--destructive))] scale-105' : 'bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted)/0.8)]'}`}><${Heart} className=${`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`} /></button></div><div className="mt-2 space-y-2"><div className="text-[11.5px] leading-snug text-[hsl(var(--foreground)/0.95)]"><p className="font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest text-[7px] mb-0.5 opacity-80">${t('description')}</p><p className="font-medium text-[11.5px] leading-snug line-clamp-2">${descriptionText}. ${localTip}</p></div><div className="grid grid-cols-2 gap-1.5 text-[10px]"><div className="rounded-[var(--radius-md)] border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--muted)/0.2)] p-1.5 shadow-inner-sm"><p className="font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest text-[7px] mb-0.5 opacity-70">${t('bestFor')}</p><p className="font-bold text-[hsl(var(--foreground))] line-clamp-1">${highlights}</p></div><div className="rounded-[var(--radius-md)] border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--muted)/0.2)] p-1.5 shadow-inner-sm"><p className="font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest text-[7px] mb-0.5 opacity-70">${t('localTip')}</p><p className="font-bold text-[hsl(var(--foreground))] line-clamp-1">${localTip}</p></div></div></div>${details ? html`<div className="mt-2 grid gap-1 rounded-[var(--radius-md)] bg-[hsl(var(--muted)/0.4)] p-2 text-[10px] border border-[hsl(var(--border)/0.3)]">${detailRows.map(row => html`<div key=${row[0]} className="flex justify-between gap-2 py-0.5 border-b border-[hsl(var(--border)/0.15)] last:border-0"><strong className="shrink-0 text-[hsl(var(--muted-foreground))]">${t(row[0])}</strong><span className="text-right font-bold text-[hsl(var(--foreground))]">${row[1]}</span></div>`)}<div className="mt-1 rounded-[var(--radius-md)] bg-[hsl(var(--secondary)/0.08)] border border-[hsl(var(--secondary)/0.15)] p-1.5 text-[10.5px] flex items-start gap-1.5 shadow-sm"><div className="mt-0.5 rounded-full bg-[hsl(var(--secondary)/0.15)] p-0.5"><${ShieldCheck} className="h-3 w-3 shrink-0 text-[hsl(var(--secondary))]" /></div><span className="leading-snug"><strong className="text-[hsl(var(--secondary))] font-black">${t('safetyTip')}:</strong> ${safetyTip}</span></div><div className="mt-1 grid grid-cols-1 gap-1.5 sm:grid-cols-2">${photosHref ? html`<a onClick=${stopCardToggle} className="focus-ring min-h-[32px] inline-flex items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[hsl(var(--primary)/0.28)] bg-[hsl(var(--card))] px-2 py-1 text-[11px] font-black text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.08)] active:scale-95 transition-all shadow-sm" href=${photosHref} target="_blank" rel="noreferrer"><${Camera} className="h-3 w-3" />${t('photos')}</a>` : null}<a onClick=${stopCardToggle} className="focus-ring min-h-[32px] inline-flex items-center justify-center gap-1 rounded-[var(--radius-md)] bg-[hsl(var(--primary))] px-2 py-1 text-[11px] font-black text-[hsl(var(--primary-foreground))] hover:brightness-110 active:scale-95 transition-all shadow-sm" href=${displayMapHref} target="_blank" rel="noreferrer"><${ExternalLink} className="h-3 w-3" />${t('openInGoogleMaps')}</a></div></div>` : null}</div></article>`;
}

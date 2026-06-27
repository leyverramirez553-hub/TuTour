export const itineraryNightBlockedIds = new Set(['jardin-etnobotanico', 'museo-culturas', 'textile-museum', 'vida-nueva-cooperative', 'alfareria-dona-rosa', 'jacobo-maria-angeles', 'parador-turistico-real-matlatl-mezcaleria', 'taller-manos-magicas', 'alebrijes-oaxaca-magico']);
export const itineraryMorningOnlyIds = new Set(['hierve-el-agua', 'memelas-dona-vale', 'itani']);
export const itineraryArchaeologicalIds = new Set(['monte-alban', 'mitla', 'yacula']);
export const isNightBlockedItineraryPlace = (place) => place && itineraryNightBlockedIds.has(place.id);
export const isItineraryArchaeologicalSite = (place) => place && (itineraryArchaeologicalIds.has(place.id) || /arqueol[óo]gica|archaeological|archaeology|ruins|ancient|zapotec.*city/i.test(`${place.name || ''} ${place.bestFor || ''} ${place.localTip || ''}`));
export const isMarketOrInsideMarketItineraryPlace = (place) => {
  if (!place) return false;
  if (place.category === 'markets' || itineraryMorningOnlyIds.has(place.id)) return true;
  const identityText = `${place.id || ''} ${place.name || ''} ${place.area || ''} ${place.neighborhood || ''}`;
  const contextText = `${place.bestFor || ''} ${place.description || ''}`;
  return /\b(mercado|market|tianguis|abastos)\b/i.test(identityText) || /\b(market breakfast|market lunch|market energy|market food|market hall|market stalls|market dishes|food stalls)\b/i.test(contextText);
};
export const isSlotAllowedForItineraryPlace = (place, slot) => {
  if (!place) return false;
  if (itineraryMorningOnlyIds.has(place.id)) return slot === 'morning';
  if (slot === 'night' && isNightBlockedItineraryPlace(place)) return false;
  if (slot !== 'morning' && (isMarketOrInsideMarketItineraryPlace(place) || isItineraryArchaeologicalSite(place))) return false;
  return true;
};

export function generateItinerary(places, options = {}) {
  const activePlaces = places;
  const pace = options.pace || options.style || 'balanced';
  const budget = options.budget || 'mid';
  const preferred = options.categories && options.categories.length ? options.categories : null;
  const style = options.style || 'relaxed';
  const walking = options.walking || 'medium';
  const mustSee = Array.isArray(options.mustSee) ? options.mustSee : [];
  const catsByStyle = {
    relaxed: [['culture', 'nature', 'markets'], ['nature', 'artisan'], ['food', 'culture']],
    foodie: [['markets', 'food'], ['food', 'mezcal'], ['food', 'mezcal']],
    culture: [['culture'], ['artisan', 'culture', 'dayTrips'], ['culture', 'food']],
    nature: [['nature'], ['dayTrips', 'nature'], ['food', 'nature']],
    family: [['nature', 'culture'], ['artisan'], ['food']],
    budget: [['markets', 'culture', 'nature'], ['nature'], ['food', 'culture']]
  };
  const baseSlots = catsByStyle[style] || catsByStyle.relaxed;
  const slotNames = ['morning', 'afternoon', 'night'];
  const visitorHourRules = {
    'hierve-el-agua': { allowed: ['morning'], note: ' Hierve el Agua closes in the afternoon, so it is intentionally kept as a morning-only recommendation. Leave early, confirm current Google Maps hours before departing, and plan your return before the afternoon closure window.' },
    'itani': { allowed: ['morning'], note: ' Itanoní closes early, so it is intentionally kept as a morning-only recommendation. Confirm current Google Maps hours before leaving.' },
    'jardin-etnobotanico': { allowed: ['morning', 'afternoon'], note: ' Jardín Etnobotánico is kept out of night plans because its last entrance/tour window is around 5–6pm; confirm the exact current tour time on Google Maps before leaving.' },
    'museo-culturas': { allowed: ['morning', 'afternoon'], note: ' Museum stops are kept before night because cultural venues commonly close by early evening; verify same-day hours on Google Maps.' },
    'textile-museum': { allowed: ['morning', 'afternoon'], note: ' Museum stops are kept before night because cultural venues commonly close by early evening; verify same-day hours on Google Maps.' },
    'vida-nueva-cooperative': { allowed: ['morning', 'afternoon'], note: ' Vida Nueva Women’s Weaving Cooperative closes in the afternoon, so it is intentionally kept out of night plans. Visit earlier in the day and confirm current Google Maps hours before leaving.' },
    'alfareria-dona-rosa': { allowed: ['morning', 'afternoon'], note: ' Alfarería Doña Rosa closes in the afternoon, so it is intentionally kept out of night plans. Visit earlier in the day and confirm current Google Maps hours before leaving.' },
    'jacobo-maria-angeles': { allowed: ['morning', 'afternoon'], note: ' Jacobo & María Ángeles closes in the afternoon, so it is intentionally kept out of night plans. Visit in the morning or afternoon and confirm current Google Maps hours before leaving.' },
    'taller-manos-magicas': { allowed: ['morning', 'afternoon'], note: ' Taller Manos Mágicas closes in the afternoon, so it is intentionally kept out of night plans. Visit earlier in the day and confirm current Google Maps hours before leaving.' },
    'alebrijes-oaxaca-magico': { allowed: ['morning', 'afternoon'], note: ' Alebrijes Oaxaca Mágico closes in the afternoon, so it is intentionally kept out of night plans. Visit earlier in the day and confirm current Google Maps hours before leaving.' },
    'parador-turistico-real-matlatl-mezcaleria': { allowed: ['morning', 'afternoon'], note: ' Parador Turístico Real Matlatl Mezcalería closes in the afternoon, so it is intentionally kept out of night plans. Visit earlier in the day, confirm current Google Maps hours before leaving, and arrange a sober return driver.' },
    'teatro-macedonio': { allowed: ['morning', 'afternoon', 'night'], note: ' For Teatro Macedonio Alcalá, only use night if there is a confirmed performance or posted opening on Google Maps.' }
  };
  const removeUnsafeTimeCategories = (cats, slot) => slot === 'morning' ? cats : cats.filter(c => c !== 'markets');
  const slots = baseSlots.map((cats, index) => {
    const slot = slotNames[index] || 'morning';
    const combined = preferred ? [...new Set([...cats.filter(c => preferred.includes(c)), ...preferred, ...cats])] : cats;
    return removeUnsafeTimeCategories(combined, slot);
  });
  const seedText = `${style}-${pace}-${budget}-${walking}-${options.startLocation || 'Centro'}-${options.transport || 'mixed'}-${(preferred || []).join(',')}-${mustSee.join(',')}-${options.seed || options.regenerationSeed || ''}`;
  const daySeed = seedText.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), new Date().getDate());
  const used = new Set(options.usedIds || []);
  const budgetRank = { low: 1, mid: 2, high: 3, luxury: 4 };
  const priceRank = { 'Free': 0, '$': 1, '$$': 2, '$$$': 3 };
  const centralAreas = ['Centro', 'Santo Domingo', 'Centro Histórico', 'Centro Norte', 'Jalatlaco', 'Xochimilco', 'El Llano', 'Coast'];
  const fitsBudget = (p) => budget === 'luxury' || (priceRank[p.price] || 2) <= (budgetRank[budget] || 2);
  const fitsWalk = (p) => walking !== 'low' || (centralAreas.includes(p.neighborhood) && !['dayTrips', 'mezcal'].includes(p.category));
  const fitsRoute = (p) => options.transport !== 'walking' || centralAreas.includes(p.neighborhood);
  const fitsKnownServiceHours = (p, slot) => {
    if (!p) return false;
    return !visitorHourRules[p.id] || visitorHourRules[p.id].allowed.includes(slot);
  };
  const fitsSlot = (p, slot) => isSlotAllowedForItineraryPlace(p, slot) && fitsKnownServiceHours(p, slot);
  const ranked = (list) => [...list].sort((a, b) => (mustSee.includes(b.id) - mustSee.includes(a.id)) || (b.rating - a.rating));
  const inCats = (cats, slot) => ranked(activePlaces.filter(p => cats.includes(p.category) && fitsSlot(p, slot) && fitsBudget(p) && fitsWalk(p) && fitsRoute(p)));
  const pick = (list, offset, slot) => {
    const fallback = ranked(activePlaces.filter(p => fitsSlot(p, slot) && fitsBudget(p) && fitsRoute(p)));
    const pool = list.length ? list : fallback;
    const must = pool.find(p => mustSee.includes(p.id) && !used.has(p.id) && fitsSlot(p, slot));
    if (must) { used.add(must.id); return must; }
    for (let i = 0; i < pool.length; i += 1) {
      const item = pool[(daySeed + offset + i) % pool.length];
      if (!used.has(item.id) && fitsSlot(item, slot)) { used.add(item.id); return item; }
    }
    return pool.find(p => fitsSlot(p, slot)) || fallback[0] || activePlaces.find(p => fitsSlot(p, slot)) || null;
  };
  const transport = options.transport === 'walking' ? 'walking only among nearby Centro stops' : options.transport === 'taxi' ? 'using registered taxis between areas' : 'mixing walkable streets with taxis for longer hops';
  const start = options.startLocation || 'Centro';
  const timingNote = (place, slot) => {
    if (visitorHourRules[place.id] && visitorHourRules[place.id].note) return visitorHourRules[place.id].note;
    if (isMarketOrInsideMarketItineraryPlace(place) && slot === 'morning') return ' Markets and in-market food stands, including Memelas Doña Vale, are placed only in the morning because many Oaxaca markets close or become less advisable later in the day.';
    if (isItineraryArchaeologicalSite(place) && slot === 'morning') return ' Archaeological sites are scheduled in the morning only because they close later in the day and the midday/afternoon heat can be a factor.';
    return ' Confirm current Google Maps service hours before departing, especially around holidays, private events, and last-entry windows.';
  };
  const why = (place, slot) => `Selected for your ${pace} pace, ${budget} budget, ${walking} walking tolerance, ${transport}, and ${style} focus; ${mustSee.includes(place.id) ? 'it is one of your must-see saved places and ' : ''}${place.name} fits the ${slot} with ${place.bestFor}.${timingNote(place, slot)}`;
  return [
    { slot: 'morning', place: pick(inCats(slots[0], 'morning'), 0, 'morning'), note: `Start from ${start}; this plan begins with the shortest practical hop and ${transport}.`, reason: '' },
    { slot: 'afternoon', place: pick(inCats(slots[1], 'afternoon'), 5, 'afternoon'), note: `Keep the afternoon realistic: hydrate, avoid markets, in-market food stands, archaeological sites in late-day heat, cross-valley backtracking, and check last-entry windows. Use ${transport} as needed.`, reason: '' },
    { slot: 'night', place: pick(inCats(slots[2], 'night'), 11, 'night'), note: `End with an easy return plan: ${transport}, well-lit streets, confirmed current hours on Google Maps, and no markets, in-market food stands, archaeological sites, or last-entry garden/artisan workshop stops at night.`, reason: '' }
  ].map(item => ({ ...item, reason: item.place ? why(item.place, item.slot) : 'No safe, open stop matched this time slot. Adjust your filters or choose a different travel style.' }));
}

export function generateMultiDayItinerary(places, options = {}) {
  const activePlaces = places;
  const days = Math.max(2, Math.min(7, Number(options.days) || 3));
  const usedIds = [];
  const plans = [];
  for (let day = 1; day <= days; day += 1) {
    const dayStyles = ['relaxed', 'culture', 'foodie', 'nature', 'family', 'budget'];
    const dayOptions = {
      ...options,
      style: day === 1 ? options.style : dayStyles[(day + dayStyles.indexOf(options.style || 'relaxed')) % dayStyles.length],
      seed: `${options.seed || ''}-day-${day}`,
      usedIds
    };
    const plan = generateItinerary(activePlaces, dayOptions).map(item => ({ ...item, day }));
    plan.forEach(item => { if (item.place && item.place.id) usedIds.push(item.place.id); });
    plans.push(...plan);
  }
  return plans;
}

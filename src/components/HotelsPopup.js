import React, { useState } from 'react';
import {BedDouble, MapPin, Star, Info, ExternalLink} from 'lucide-react';
import { html } from '../jsx.js';

const hotelsData = [
  {
    id: 'quinta-real',
    name: 'Quinta Real Oaxaca',
    stars: 5,
    price: '$$$$',
    areaKey: 'centro',
    imageSeed: 'quinta-real-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Quinta+Real+Oaxaca',
    desc: {
      en: 'A luxurious 5-star hotel housed in a beautiful, meticulously restored 16th-century convent with stone archways and lush gardens.',
      es: 'Un lujoso hotel de 5 estrellas ubicado en un hermoso convento del siglo XVI meticulosamente restaurado con arcos de piedra y frondosos jardines.',
      fr: 'Un hôtel de luxe 5 étoiles installé dans un magnifique couvent du XVIe siècle méticuleusement restauré avec des arcades en pierre et des jardins luxuriants.',
      de: 'Ein luxuriöses 5-Sterne-Hotel in einem wunderschönen, sorgfältig restaurierten Kloster aus dem 16. Jahrhundert mit Steinbögen und üppigen Gärten.',
      it: 'Un lussuoso hotel a 5 stelle ospitato in uno splendido convento del XVI secolo meticolosamente restaurato con arcate in pietra e lussureggianti giardini.',
      pt: 'Um luxuoso hotel 5 estrelas instalado em um belo convento do século XVI meticulosamente restaurado com arcos de pedra e jardins verdejantes.',
      ja: '石造りのアーチや緑豊かな庭園が美しい、細部まで修復された16世紀の修道院を利用した豪華な5つ星ホテル。',
      zh: '一家奢华的五星级酒店，坐落在经过精心修复、配有石拱门和繁茂花园的16世纪美丽修道院中。'
    },
    tag: {
      en: 'Historic Luxury',
      es: 'Lujo Histórico',
      fr: 'Luxe Historique',
      de: 'Historischer Luxus',
      it: 'Lusso Storico',
      pt: 'Luxo Histórico',
      ja: '歴史ある贅沢',
      zh: '历史奢华'
    }
  },
  {
    id: 'los-amantes',
    name: 'Hotel Los Amantes',
    stars: 5,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'los-amantes-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Los+Amantes+Oaxaca',
    desc: {
      en: 'Contemporary luxury meets local Oaxacan crafts. Features a breathtaking rooftop terrace overlooking the majestic Santo Domingo Temple.',
      es: 'El lujo contemporáneo se une a la artesanía local oaxaqueña. Cuenta con una impresionante terraza con vista al majestuoso Templo de Santo Domingo.',
      fr: 'Le luxe contemporain rencontre l\'artisanat local d\'Oaxaca. Dispose d\'une terrasse sur le toit offrant une vue imprenable sur le majestueux temple de Santo Domingo.',
      de: 'Zeitgenössischer Luxus trifft auf lokales oaxacanisches Handwerk. Mit einer atemberaubenden Dachterrasse mit Blick auf den majestätischen Santo-Domingo-Tempel.',
      it: 'Il lusso contemporaneo incontra l\'artigianato locale di Oaxaca. Offre una terrazza panoramica con vista spettacolare sul maestoso tempio di Santo Domingo.',
      pt: 'O luxo contemporâneo encontra o artesanato local de Oaxaca. Dispõe de um terraço deslumbrante com vista para o majestoso Templo de Santo Domingo.',
      ja: '現代的なラグジュアリーと地元の工芸が融合。荘厳なサントドミンゴ聖堂を見渡せる絶景のルーフトップテラスが魅力。',
      zh: '现代奢华与瓦哈卡当地手工艺的交融。拥有一个令人惊叹的屋顶露台，可俯瞰壮丽的圣多明各圣殿。'
    },
    tag: {
      en: 'Santo Domingo View',
      es: 'Vista a Santo Domingo',
      fr: 'Vue Santo Domingo',
      de: 'Blick auf Santo Domingo',
      it: 'Vista Santo Domingo',
      pt: 'Vista Santo Domingo',
      ja: 'サントドミンゴの眺め',
      zh: '圣多明各景观'
    }
  },
  {
    id: 'city-centro',
    name: 'Hotel City Centro by Marriott Oaxaca',
    stars: 4,
    price: '$$',
    areaKey: 'east',
    imageSeed: 'city-centro-by-marriott-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+City+Centro+by+Marriott+Oaxaca',
    desc: {
      en: 'A bold Marriott stay in Jalatlaco with its iconic pink façade, modern rooms, a rooftop pool, and easy access to Oaxaca’s historic center.',
      es: 'Una llamativa estancia Marriott en Jalatlaco con su icónica fachada rosa, habitaciones modernas, alberca en la azotea y fácil acceso al centro histórico de Oaxaca.',
      fr: 'Une adresse Marriott audacieuse à Jalatlaco avec sa façade rose emblématique, des chambres modernes, une piscine sur le toit et un accès facile au centre historique d’Oaxaca.',
      de: 'Ein auffälliges Marriott-Hotel in Jalatlaco mit ikonischer rosa Fassade, modernen Zimmern, Dachpool und einfachem Zugang zum historischen Zentrum von Oaxaca.',
      it: 'Un vivace soggiorno Marriott a Jalatlaco con l’iconica facciata rosa, camere moderne, piscina sul tetto e facile accesso al centro storico di Oaxaca.',
      pt: 'Uma estadia Marriott marcante em Jalatlaco, com fachada rosa icônica, quartos modernos, piscina na cobertura e fácil acesso ao centro histórico de Oaxaca.',
      ja: 'ハラトラコ地区にあるマリオット系の印象的なホテル。象徴的なピンクの外観、モダンな客室、屋上プールがあり、オアハカ歴史地区へも行きやすい滞在先です。',
      zh: '位于哈拉特拉科（Jalatlaco）的醒目万豪酒店，拥有标志性粉色外观、现代客房、屋顶泳池，并可轻松前往瓦哈卡历史中心。'
    },
    tag: {
      en: 'Marriott in Jalatlaco',
      es: 'Marriott en Jalatlaco',
      fr: 'Marriott à Jalatlaco',
      de: 'Marriott in Jalatlaco',
      it: 'Marriott a Jalatlaco',
      pt: 'Marriott em Jalatlaco',
      ja: 'ハラトラコのマリオット',
      zh: '哈拉特拉科万豪'
    }
  },
  {
    id: 'azul',
    name: 'Hotel Azul de Oaxaca',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'azul-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Azul+de+Oaxaca',
    desc: {
      en: 'An art-centric boutique hotel designed in collaboration with famous Oaxacan visual artists, offering custom-designed patios.',
      es: 'Un hotel boutique centrado en el arte diseñado en colaboración con famosos artistas visuales oaxaqueños, con hermosos patios de diseño.',
      fr: 'Un hôtel boutique axé sur l\'art, conçu en collaboration avec de célèbres artistes plasticiens d\'Oaxaca, proposant de magnifiques patios design.',
      de: 'Ein kunstorientiertes Boutique-Hotel, das in Zusammenarbeit mit berühmten oaxacanischen Künstlern gestaltet wurde und wunderschöne Designer-Innenhöfe bietet.',
      it: 'Un boutique hotel incentrato sull\'arte, progettato in collaborazione con famosi artisti visivi di Oaxaca, che offre splendidi cortili di design.',
      pt: 'Um hotel boutique focado em arte, projetado em colaboração com renomados artistas visuais de Oaxaca, com belíssimos pátios de design.',
      ja: '有名なオアハカ人美術家とのコラボレーションで設計された、カスタムメイドの中庭が魅力のアート感覚ブティックホテル。',
      zh: '一家以艺术为核心的精品酒店，与瓦哈卡著名视觉艺术家合作设计，拥有独具匠心的设计感庭院。'
    },
    tag: {
      en: 'Art Boutique',
      es: 'Boutique de Arte',
      fr: 'Boutique d\'Art',
      de: 'Kunst-Boutique',
      it: 'Art Boutique',
      pt: 'Boutique de Arte',
      ja: 'アートブティック',
      zh: '艺术精品'
    }
  },
  {
    id: 'selina',
    name: 'Selina Oaxaca',
    stars: 3,
    price: '$',
    areaKey: 'centro',
    imageSeed: 'selina-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Selina+Oaxaca',
    desc: {
      en: 'A lively co-working hostel with a beautiful plant-filled patio, library, and daily community events perfect for social travelers and digital nomads.',
      es: 'Un animado hostal con coworking, un hermoso patio lleno de plantas, biblioteca y eventos diarios, ideal para viajeros sociables y nómadas digitales.',
      fr: 'Une auberge dynamique avec espace de coworking, un splendide patio végétalisé, une bibliothèque et des événements quotidiens, parfaits pour rencontrer des gens.',
      de: 'Ein lebendiges Co-Working-Hostel mit einem wunderschönen, pflanzenreichen Innenhof, einer Bibliothek und täglichen Community-Events für digitale Nomaden.',
      it: 'Un vivace ostello con spazio co-working, un bellissimo patio ricco di piante, biblioteca ed eventi comunitari giornalieri, perfetto per fare amicizia.',
      pt: 'Um hostel animado com espaço de co-working, um belo pátio cheio de plantas, biblioteca e eventos diários, perfeito para viajantes e nômades digitais.',
      ja: '植物にあふれる中庭、コワーキングスペース、ライブラリ、毎日の交流イベントが揃い、ノマドや旅人同士の出会いに最適。',
      zh: '一个充满活力的共享办公青年旅舍，拥有绿植环绕的美丽庭院、图书馆和日常社群活动，极适合社交旅行者和数字游民。'
    },
    tag: {
      en: 'Social & Coworking',
      es: 'Social y Coworking',
      fr: 'Social & Coworking',
      de: 'Gemeinschaft & Coworking',
      it: 'Social & Coworking',
      pt: 'Social e Coworking',
      ja: '交流＆コワーキング',
      zh: '社交与办公'
    }
  },
  {
    id: 'casa-oaxaca',
    name: 'Casa Oaxaca Hotel',
    stars: 5,
    price: '$$$$',
    areaKey: 'centro',
    imageSeed: 'casa-oaxaca-hotel',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Oaxaca+El+Hotel',
    desc: {
      en: 'An exclusive, intimate 7-room boutique hotel known for its award-winning gourmet cuisine, peaceful central patio, and pool.',
      es: 'Un exclusivo e íntimo hotel boutique de 7 habitaciones conocido por su galardonada cocina gourmet, su tranquilo patio central y su piscina.',
      fr: 'Hôtel boutique de charme exclusif de 7 chambres, réputé pour sa cuisine gastronomique primée, son calme patio central et sa piscine.',
      de: 'Ein exklusives, intimes Boutique-Hotel mit nur 7 Zimmern, bekannt für preisgekrönte Gourmetküche, einen ruhigen Innenhof und Pool.',
      it: 'Un esclusivo e intimo boutique hotel di 7 camere, rinomato per la sua premiata cucina gourmet, il tranquillo cortile centrale e la piscina.',
      pt: 'Um exclusivo e intimista hotel boutique de 7 quartos, famoso por sua premiada culinária gourmet, pátio central sossegado e piscina.',
      ja: '受賞歴のあるグルメ料理、静かな中央パティオ、プールで知られる、全7室のみの限定的でアットホームなブティックホテル。',
      zh: '一家高档且温馨的7房精品酒店，以屡获殊荣的美食、静谧的中央庭院以及室外泳池而闻名。'
    },
    tag: {
      en: 'Gourmet & Intimate',
      es: 'Gastronomía íntima',
      fr: 'Gastronomie & Intimité',
      de: 'Gourmet & Familiär',
      it: 'Gourmet & Intimo',
      pt: 'Gastronômico e Íntimo',
      ja: '極上グルメ＆隠れ家',
      zh: '顶级美食与私密'
    }
  },
  {
    id: 'santo-origen',
    name: 'Hotel Casa Santo Origen',
    stars: 5,
    price: '$$$$',
    areaKey: 'north',
    imageSeed: 'santo-origen',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Casa+Santo+Origen',
    desc: {
      en: 'A peaceful, high-end luxury escape nestled in the foothills of San Felipe del Agua, offering superb privacy and mountain views.',
      es: 'Una tranquila escapada de gran lujo en las faldas de San Felipe del Agua, que ofrece una magnífica privacidad y vistas a la montaña.',
      fr: 'Une retraite calme et de grand luxe nichée au pied de San Felipe del Agua, offrant une superbe intimité et des vues sur la montagne.',
      de: 'Ein ruhiger, luxuriöser Rückzugsort am Fuße des San Felipe del Agua, der hervorragende Privatsphäre und Bergblick bietet.',
      it: 'Un rifugio tranquillo e di lusso adagiato ai piedi di San Felipe del Agua, che offre una straordinaria riservatezza e vista sulla montagna.',
      pt: 'Um refúgio tranquilo e de luxo aninhado nas encostas de San Felipe del Agua, oferecendo excelente privacidade e vistas para as montanhas.',
      ja: 'サン・フェリペ・デル・アグアの麓に位置し、圧倒的なプライベート空間と素晴らしい山の景色が自慢の贅沢な隠れ家ホテル。',
      zh: '坐落在圣菲利佩德尔阿瓜（San Felipe del Agua）山麓中的一处幽静高端奢华度假地，享有极佳的私密性和山景。'
    },
    tag: {
      en: 'Luxury Mountain Escape',
      es: 'Escape de Lujo en Montaña',
      fr: 'Retraite de Luxe en Montagne',
      de: 'Luxuriöser Bergrückzug',
      it: 'Rifugio di Lusso tra i Monti',
      pt: 'Refúgio de Luxo na Montanha',
      ja: '山中の豪華リゾート',
      zh: '山间奢华避世'
    }
  },
  {
    id: 'paulina',
    name: 'Paulina Youth Hostel',
    stars: 3,
    price: '$',
    areaKey: 'centro',
    imageSeed: 'paulina-hostel',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Paulina+Youth+Hostel+Oaxaca',
    desc: {
      en: 'Traditional architecture with clean, social rooms and generous local hospitality, located steps away from Oaxacas central markets.',
      es: 'Arquitectura tradicional con habitaciones limpias y compartidas, y una gran hospitalidad local, a solo unos pasos de los mercados de Oaxaca.',
      fr: 'Architecture traditionnelle avec des chambres propres et chaleureuses, et une hospitalité unique, à deux pas des marchés centraux.',
      de: 'Traditionelle Architektur mit sauberen Schlafsälen und herzlicher Gastfreundschaft, nur wenige Schritte von den zentralen Märkten entfernt.',
      it: 'Architettura tradizionale con camere pulite e comuni e un\'accogliente ospitalità locale, a pochi passi dai mercati principali.',
      pt: 'Arquitetura mexicana tradicional com quartos limpos e compartilhados, e excelente hospitalidade local, a passos dos mercados de Oaxaca.',
      ja: '昔ながらのメキシコ建築、清潔で親しみやすい客室、アットホームな素晴らしいおもてなし。オアハカの中央市場からすぐ近く。',
      zh: '具有传统墨西哥风情的建筑，提供干净且利于社交的房间，洋溢着当地人的好客热情，距离瓦哈卡中心市场仅几步之遥。'
    },
    tag: {
      en: 'Traditional Budget',
      es: 'Económico Tradicional',
      fr: 'Traditionnel Économique',
      de: 'Traditionell & Günstig',
      it: 'Económico Tradizionale',
      pt: 'Econômico Tradicional',
      ja: '伝統的＆格安宿',
      zh: '传统高性价比'
    }
  },
  {
    id: 'nana-vida',
    name: 'NaNa Vida Hotel Oaxaca',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'nana-vida-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=NaNa+Vida+Hotel+Oaxaca',
    desc: {
      en: 'A friendly boutique stay in Centro with a leafy courtyard, colorful design details, and an easy walk to major sights.'
    },
    tag: {
      en: 'Warm Boutique Classic'
    }
  },
  {
    id: 'pug-seal',
    name: 'Pug Seal Oaxaca',
    stars: 5,
    price: '$$$$',
    areaKey: 'centro',
    imageSeed: 'pug-seal-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pug+Seal+Oaxaca',
    desc: {
      en: 'A design-forward luxury stay with polished interiors, intimate service, and a refined base near central Oaxaca highlights.'
    },
    tag: {
      en: 'Design Mansion Stay'
    }
  },
  {
    id: 'casa-carmen-morelos',
    name: 'Casa Carmen Morelos',
    stars: 4,
    price: '$$$',
    areaKey: 'north',
    imageSeed: 'casa-carmen-morelos',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Carmen+Morelos+Oaxaca',
    desc: {
      en: 'A quiet boutique option with elegant rooms and a relaxed residential feel, ideal for travelers wanting calm after busy sightseeing days.'
    },
    tag: {
      en: 'Quiet Boutique Retreat'
    }
  },
  {
    id: 'casa-antonieta',
    name: 'Casa Antonieta',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'casa-antonieta-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Antonieta+Oaxaca',
    desc: {
      en: 'A stylish city stay known for clean contemporary rooms, café culture, and a prime location near Santo Domingo and Alcalá.'
    },
    tag: {
      en: 'Stylish City Base'
    }
  },
  {
    id: 'hotel-escondido',
    name: 'Hotel Escondido Oaxaca',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'hotel-escondido-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Escondido+Oaxaca',
    desc: {
      en: 'A serene boutique hotel with understated design, a restful courtyard atmosphere, and easy access to Oaxaca’s food and culture scene.'
    },
    tag: {
      en: 'Serene Boutique Hideaway'
    }
  },
  {
    id: 'grana-bnb',
    name: 'Grana B&B',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'grana-bnb-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grana+B%26B+Oaxaca',
    desc: {
      en: 'A polished bed-and-breakfast in the historic center with warm hospitality, handsome interiors, and strong walkability.'
    },
    tag: {
      en: 'Elegant B&B Stay'
    }
  },
  {
    id: 'casa-bugambilias',
    name: 'Casa de las Bugambilias',
    stars: 4,
    price: '$$$',
    areaKey: 'north',
    imageSeed: 'casa-bugambilias-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+de+las+Bugambilias+Oaxaca',
    desc: {
      en: 'A long-loved guesthouse with personalized service, homey charm, and a peaceful setting that still keeps Centro within reach.'
    },
    tag: {
      en: 'Charming Guesthouse'
    }
  },
  {
    id: 'hotel-hacienda-los-laureles-spa-oaxaca',
    name: 'Hotel Hacienda Los Laureles Spa Oaxaca',
    stars: 5,
    price: '$$$$',
    areaKey: 'north',
    imageSeed: 'hotel-hacienda-los-laureles-spa-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Hacienda+Los+Laureles+Spa+Oaxaca',
    desc: {
      en: 'A refined hacienda-style hotel and spa in northern Oaxaca with garden courtyards, restful wellness amenities, and a quiet resort-like atmosphere.'
    },
    tag: {
      en: 'Spa Hacienda Retreat'
    }
  },
  {
    id: 'hotel-con-corazon',
    name: 'Hotel con Corazón Oaxaca',
    stars: 3,
    price: '$$',
    areaKey: 'east',
    imageSeed: 'hotel-con-corazon-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+con+Corazon+Oaxaca',
    desc: {
      en: 'A bright social-impact stay with comfortable rooms and a welcoming feel, well suited to travelers who like purpose-driven lodging.'
    },
    tag: {
      en: 'Social Impact Stay'
    }
  },
  {
    id: 'marialicia-suites',
    name: 'Marialicia Suites',
    stars: 4,
    price: '$$$',
    areaKey: 'north',
    imageSeed: 'marialicia-suites-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Marialicia+Suites+Oaxaca',
    desc: {
      en: 'A relaxed suites-style option with extra space, tidy design, and a quieter feel for longer or slower-paced stays in Oaxaca.'
    },
    tag: {
      en: 'Spacious Suites'
    }
  },
  {
    id: 'casa-siete-balcones',
    name: 'Casa de Siete Balcones',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'casa-siete-balcones',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+de+Siete+Balcones+Oaxaca',
    desc: {
      en: 'A character-rich stay near Santo Domingo with classic architecture, balcony views, and a central location for culture-focused trips.'
    },
    tag: {
      en: 'Historic Balcony Stay'
    }
  },
  {
    id: 'casa-catrina',
    name: 'Casa Catrina Hotel Boutique',
    stars: 4,
    price: '$$$',
    areaKey: 'north',
    imageSeed: 'casa-catrina-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Catrina+Hotel+Boutique+Oaxaca',
    desc: {
      en: 'An intimate boutique hotel with classic Oaxacan touches, calm common spaces, and a polished atmosphere for couples or slower travel.'
    },
    tag: {
      en: 'Romantic Boutique'
    }
  },
  {
    id: 'parador-alcala',
    name: 'Hotel Parador de Alcalá',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'parador-de-alcala-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Parador+de+Alcala+Oaxaca',
    desc: {
      en: 'A comfortable central hotel near the pedestrian core, ideal for visitors who want straightforward access to restaurants and museums.'
    },
    tag: {
      en: 'Central Walkable Pick'
    }
  },
  {
    id: 'casona-oaxaca',
    name: 'Hotel Casona Oaxaca',
    stars: 4,
    price: '$$',
    areaKey: 'centro',
    imageSeed: 'hotel-casona-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Casona+Oaxaca',
    desc: {
      en: 'A dependable historic-center option with a traditional feel, good walkability, and easy access to markets and everyday local life.'
    },
    tag: {
      en: 'Classic Centro Stay'
    }
  },
  {
    id: 'casa-del-sotano',
    name: 'Hotel Casa del Sótano',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'casa-del-sotano-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Casa+del+Sotano+Oaxaca',
    desc: {
      en: 'A hillside boutique stay just above the busiest center streets, offering a slightly tucked-away feel while staying close to the action.'
    },
    tag: {
      en: 'Tucked-Away Centro'
    }
  },
  {
    id: 'naura-centro',
    name: "Hotel Boutique Na'ura Centro",
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'naura-centro-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Boutique+Na%27ura+Centro+Oaxaca',
    desc: {
      en: 'A modern boutique hotel with rooftop appeal and an easy central location for travelers mixing sightseeing, dining, and evening walks.'
    },
    tag: {
      en: 'Modern Rooftop Pick'
    }
  },
  {
    id: 'parador-san-miguel',
    name: 'Parador San Miguel Oaxaca',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'parador-san-miguel-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parador+San+Miguel+Oaxaca',
    desc: {
      en: 'A colorful colonial-style stay with decorative interiors and a convenient location for guests who want a classic Oaxaca ambiance.'
    },
    tag: {
      en: 'Colonial Color & Charm'
    }
  },
  {
    id: 'los-pilares',
    name: 'Los Pilares Hotel',
    stars: 4,
    price: '$$$',
    areaKey: 'north',
    imageSeed: 'los-pilares-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Los+Pilares+Hotel+Oaxaca',
    desc: {
      en: 'A calm boutique favorite in the Reforma side of town with intimate patios and a quieter residential pace.'
    },
    tag: {
      en: 'Quiet Reforma Favorite'
    }
  },
  {
    id: 'parador-san-agustin',
    name: 'Hotel Parador San Agustín',
    stars: 3,
    price: '$$',
    areaKey: 'centro',
    imageSeed: 'parador-san-agustin-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Parador+San+Agustin+Oaxaca',
    desc: {
      en: 'A practical heritage-style stay in Centro that works well for travelers prioritizing location and a classic courtyard atmosphere.'
    },
    tag: {
      en: 'Heritage Value Stay'
    }
  },
  {
    id: 'agrado-guest-house',
    name: 'Agrado Guest House Oaxaca',
    stars: 4,
    price: '$$$',
    areaKey: 'centro',
    imageSeed: 'agrado-guest-house-oaxaca',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Agrado+Guest+House+Oaxaca',
    desc: {
      en: 'A design-minded guest house with calm common areas, polished hospitality, and an easy Centro base for food, galleries, and evening strolls.'
    },
    tag: {
      en: 'Design Guest House'
    }
  },
  {
    id: 'jalatlaco-boutique',
    name: 'Jalatlaco Hotel Boutique',
    stars: 3,
    price: '$$',
    areaKey: 'east',
    imageSeed: 'jalatlaco-hotel-boutique',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jalatlaco+Hotel+Boutique+Oaxaca',
    desc: {
      en: 'A simple boutique stay in one of Oaxaca’s most photogenic neighborhoods, ideal for travelers who want murals, cafés, and easy strolls.'
    },
    tag: {
      en: 'Jalatlaco Neighborhood Stay'
    }
  }
];

const hotelImageOverrides = {
  'quinta-real-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/QuintaRealOaxaca.jpg',
  'los-amantes-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelLosAmantesOaxaca.jpg',
  'city-centro-by-marriott-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/CityCentrobyMarriottOaxaca.jpg',
  'azul-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelAzulOaxaca.jpg',
  'selina-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/SelinaOaxaca.jpg',
  'casa-oaxaca-hotel': '/api/apps/romcWH54d4SR/assets/visual-editor/CasaOaxacaHotel.jpg',
  'santo-origen': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelCasaSantoOrigen.jpg',
  'paulina-hostel': '/api/apps/romcWH54d4SR/assets/visual-editor/PaulinaYouthHostel.jpg',
  'nana-vida-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/NaNaVidaHotelBoutique.jpg',
  'pug-seal-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HOTELPUGSEALOAXACA.jpg',
  'casa-carmen-morelos': '/api/apps/romcWH54d4SR/assets/visual-editor/CasaCarmenMorelosOaxaca.jpg',
  'casa-antonieta-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/CasaAntonietaOaxaca.jpg',
  'hotel-escondido-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelEscondidoOaxaca.jpg',
  'grana-bnb-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/GRANABBOaxaca.jpg',
  'casa-bugambilias-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/CasadelasBugambiliasBBOaxaca.jpg',
  'hotel-hacienda-los-laureles-spa-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelHaciendaLosLaurelesSpaOaxaca.jpg',
  'hotel-con-corazon-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelconCorazónOaxaca.jpg',
  'marialicia-suites-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/MarialiciaSuitesOaxaca.jpg',
  'casa-siete-balcones': '/api/apps/romcWH54d4SR/assets/visual-editor/CasadeSieteBalconesHotelBoutiqueOaxaca.jpg',
  'casa-catrina-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelCasaCatrinaOaxaca.jpg',
  'parador-de-alcala-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelParadordeAlcaláOaxaca.jpg',
  'hotel-casona-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/CasonaOaxaca.jpg',
  'casa-del-sotano-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/LaCasadelSótanoOaxaca.jpg',
  'naura-centro-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelBoutiqueNauraCentroOaxaca.jpg',
  'parador-san-miguel-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/ParadorSanMiguelOaxacahotelboutique.jpg',
  'los-pilares-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/LosPilaresHotelOaxaca.jpg',
  'parador-san-agustin-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/HotelParadorSanAgustínOaxaca.jpg',
  'agrado-guest-house-oaxaca': '/api/apps/romcWH54d4SR/assets/visual-editor/AgradoGuestHouse.jpg',
  'jalatlaco-hotel-boutique': '/api/apps/romcWH54d4SR/assets/visual-editor/JalatlacoCasaBoutiqueOaxaca.jpg'
};

const labels = {
  en: {
    title: 'Oaxaca Hotels & Stays',
    subtitle: 'Curated accommodations from historic luxury retreats to budget-friendly social hubs.',
    all: 'All Areas',
    centro: 'Centro / Historic Core',
    east: 'Jalatlaco / East',
    north: 'North / Reforma',
    price: 'Price',
    area: 'Area',
    viewOnMap: 'View on Google Maps',
    safetyTitle: 'Hotel & Area Safety Advice',
    safetyTip: 'Book registered site-based taxis at night, select Jalatlaco or Centro for walkability, and always carry a physical hotel card with the address written down.',
    noResults: 'No hotels found matching this area.',
    translating: 'Translating hotel details…',
    translationWarning: 'Some hotel details could not be translated right now:'
  },
  es: {
    title: 'Hoteles y Lugares para Hospedarse',
    subtitle: 'Hospedajes locales curados, desde retiros boutique históricos hasta hostales de ambiente social.',
    all: 'Todas las áreas',
    centro: 'Centro Histórico',
    east: 'Jalatlaco / Este',
    north: 'Norte / Reforma',
    price: 'Precio',
    area: 'Zona',
    viewOnMap: 'Ver en Google Maps',
    safetyTitle: 'Consejos de Seguridad en tu Hospedaje',
    safetyTip: 'Reserva taxis de sitio oficiales por la noche, elige Jalatlaco o el Centro para trasladarte a pie y lleva siempre una tarjeta física del hotel con su dirección.',
    noResults: 'No se encontraron hoteles en esta zona.',
    translating: 'Traduciendo detalles del hotel…',
    translationWarning: 'Algunos detalles del hotel no se pudieron traducir en este momento:'
  },
  fr: {
    title: 'Hôtels et Hébergements à Oaxaca',
    subtitle: 'Sélection d\'hébergements, des havres de paix historiques aux auberges conviviales et économiques.',
    all: 'Toutes les zones',
    centro: 'Centre Historique',
    east: 'Jalatlaco / Est',
    north: 'Nord / Reforma',
    price: 'Prix',
    area: 'Quartier',
    viewOnMap: 'Voir sur Google Maps',
    safetyTitle: 'Conseils de Sécurité - Hébergement',
    safetyTip: 'Commandez des taxis officiels agréés la nuit, préférez Jalatlaco ou le Centre pour vos sorties pédestres, et conservez toujours la carte de l\'hôtel sur vous.',
    noResults: 'Aucun hôtel trouvé dans ce quartier.',
    translating: 'Traduction des détails des hôtels…',
    translationWarning: 'Certains détails des hôtels ne peuvent pas être traduits pour le moment :'
  },
  de: {
    title: 'Oaxaca Hotels & Unterkünfte',
    subtitle: 'Ausgewählte Unterkünfte, von historischen Boutique-Retreats bis hin zu budgetfreundlichen Hostels.',
    all: 'Alle Bereiche',
    centro: 'Historisches Zentrum',
    east: 'Jalatlaco / Osten',
    north: 'Norden / Reforma',
    price: 'Preis',
    area: 'Viertel',
    viewOnMap: 'Auf Google Maps anzeigen',
    safetyTitle: 'Sicherheitshinweise für Unterkünfte',
    safetyTip: 'Bestelle nachts offizielle Funktaxis, wähle Jalatlaco oder das Zentrum für eine gute fußläufige Anbindung und nimm eine physische Hotel-Visitenkarte mit.',
    noResults: 'Keine Hotels in diesem Bereich gefunden.',
    translating: 'Hoteldetails werden übersetzt…',
    translationWarning: 'Einige Hoteldetails konnten gerade nicht übersetzt werden:'
  },
  it: {
    title: 'Hotel e Alloggi a Oaxaca',
    subtitle: 'Soggiorni locali selezionati, dai lussuosi rifugi storici agli ostelli ricchi di vita comunitaria.',
    all: 'Tutte le aree',
    centro: 'Centro Storico',
    east: 'Jalatlaco / Est',
    north: 'Nord / Reforma',
    price: 'Prezzo',
    area: 'Zona',
    viewOnMap: 'Vedi su Google Maps',
    safetyTitle: 'Consigli di Sicurezza per l\'Alloggio',
    safetyTip: 'Usa taxi ufficiali registrati di notte, alloggia a Jalatlaco o in Centro per muoverti a piedi la sera e porta sempre una tessera fisica dell\'hotel con l\'indirizzo.',
    noResults: 'Nessun hotel trovato in questa zona.',
    translating: 'Traduzione dei dettagli degli hotel…',
    translationWarning: 'Alcuni dettagli degli hotel non possono essere tradotti in questo momento:'
  },
  pt: {
    title: 'Hotéis e Hospedagens em Oaxaca',
    subtitle: 'Acomodações curadas, de retiros de luxo históricos a hostels de excelente convívio social.',
    all: 'Todas as áreas',
    centro: 'Centro Histórico',
    east: 'Jalatlaco / Leste',
    north: 'Norte / Reforma',
    price: 'Preço',
    area: 'Bairro',
    viewOnMap: 'Ver no Google Maps',
    safetyTitle: 'Dicas de Segurança em Hospedagens',
    safetyTip: 'Chame táxis oficiais credenciados à noite, prefira Jalatlaco ou Centro para poder caminhar sossegado e tenha sempre um cartão impresso com o endereço do hotel.',
    noResults: 'Nenhum hotel encontrado neste bairro.',
    translating: 'Traduzindo detalhes do hotel…',
    translationWarning: 'Alguns detalhes do hotel não puderam ser traduzidos agora:'
  },
  ja: {
    title: 'オアハカのホテル・宿泊施設',
    subtitle: '歴史的な極上隠れ家から、親しみやすい格安ホステルまで厳選されたおすすめの滞在先。',
    all: 'すべてのエリア',
    centro: '市街地歴史地区 (セントロ)',
    east: 'ハラトラコ / 東部',
    north: '北部 / レフォルマ',
    price: '価格',
    area: 'エリア',
    viewOnMap: 'Googleマップで見る',
    safetyTitle: '滞在先とエリアの安全アドバイス',
    safetyTip: '夜間の移動は必ず登録された公認タクシーを利用し、徒歩の散策にはハラトラコや市街地を選び、ホテルの住所が書かれたカードを常時携帯しましょう。',
    noResults: 'このエリアに該当するホテルが見つかりませんでした。',
    translating: 'ホテルの詳細を翻訳しています…',
    translationWarning: '一部のホテル詳細は現在翻訳できませんでした:'
  },
  zh: {
    title: '瓦哈卡精选酒店与住宿',
    subtitle: '精心挑选的住宿推荐，从极具历史韵味的奢华度假酒店到高性价比的社交青年旅舍。',
    all: '所有区域',
    centro: '历史街区中心 (Centro)',
    east: '哈拉特拉科 / 东区 (Jalatlaco)',
    north: '北区 / 雷福马 (Reforma)',
    price: '价格',
    area: '地段',
    viewOnMap: '在 Google 地图查看',
    safetyTitle: '住宿与出行安全建议',
    safetyTip: '夜间出行请呼叫正规有登记的出租车，散步活动建议选择哈拉特拉科（Jalatlaco）或市中心（Centro），并随身携带印有酒店地址的实体名片。',
    noResults: '暂无该区域的酒店。',
    translating: '正在翻译酒店详情…',
    translationWarning: '部分酒店详情暂时无法翻译：'
  }
};

export function HotelsPopup({ isOpen, onClose, currentLang = 'en' }) {
  const [selectedArea, setSelectedArea] = useState('all');
  const [autoTranslations, setAutoTranslations] = useState({});
  const [translationLoading, setTranslationLoading] = useState(false);
  const [translationError, setTranslationError] = useState('');
  const l = labels[currentLang] || labels.en;

  React.useEffect(() => {
    let cancelled = false;

    const translateMissingHotelCopy = async () => {
      if (!isOpen || currentLang === 'en' || !window.genmb?.translate?.batch) {
        if (!cancelled) {
          setTranslationLoading(false);
          setTranslationError('');
        }
        return;
      }

      const missingHotels = hotelsData.filter((hotel) => {
        const existing = autoTranslations[`${hotel.id}:${currentLang}`] || {};
        return (!hotel.desc[currentLang] && !existing.desc) || (!hotel.tag[currentLang] && !existing.tag);
      });

      if (!missingHotels.length) {
        if (!cancelled) {
          setTranslationLoading(false);
          setTranslationError('');
        }
        return;
      }

      setTranslationLoading(true);
      setTranslationError('');

      try {
        const inputs = missingHotels.flatMap((hotel) => [hotel.desc.en, hotel.tag.en]);
        const translated = await window.genmb.translate.batch(inputs, currentLang);

        if (cancelled) return;

        const nextTranslations = {};
        missingHotels.forEach((hotel, index) => {
          nextTranslations[`${hotel.id}:${currentLang}`] = {
            desc: hotel.desc[currentLang] || translated[index * 2] || hotel.desc.en,
            tag: hotel.tag[currentLang] || translated[index * 2 + 1] || hotel.tag.en
          };
        });

        setAutoTranslations((prev) => ({ ...prev, ...nextTranslations }));
      } catch (err) {
        if (!cancelled) {
          setTranslationError(err.message || 'Translation failed.');
        }
      } finally {
        if (!cancelled) {
          setTranslationLoading(false);
        }
      }
    };

    translateMissingHotelCopy();

    return () => {
      cancelled = true;
    };
  }, [currentLang, isOpen]);

  if (!isOpen) return null;

  const filteredHotels = selectedArea === 'all'
    ? hotelsData
    : hotelsData.filter(h => h.areaKey === selectedArea);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/seed/oaxaca-hotel-fallback/600/400';
  };

  const translatedHotelField = (hotel, field) => {
    const cached = autoTranslations[`${hotel.id}:${currentLang}`];
    if (field === 'desc') return hotel.desc[currentLang] || cached?.desc || hotel.desc.en;
    return hotel.tag[currentLang] || cached?.tag || hotel.tag.en;
  };

  return html`
    <div className="home-why-popup-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" role="presentation" onClick=${event => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="w-full max-w-4xl max-h-[calc(100vh-1.5rem)] md:max-h-[calc(100vh-3rem)] overflow-hidden rounded-[1.75rem] border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] shadow-[var(--shadow-lg)] flex flex-col" role="dialog" aria-modal="true" aria-labelledby="hotels-popup-title">
        <div className="flex items-center justify-between gap-4 border-b-2 border-orange-200 bg-gradient-to-r from-orange-500/20 via-purple-500/10 to-orange-500/20 px-4 py-3 sm:px-6 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-md shrink-0">
              <${BedDouble} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 id="hotels-popup-title" className="text-xl sm:text-2xl font-black leading-tight text-[#4c1d95] dark:text-orange-300 truncate">${l.title}</h2>
              <p className="hidden sm:block text-[11px] font-semibold text-[hsl(var(--muted-foreground))] truncate max-w-md">${l.subtitle}</p>
            </div>
          </div>
          <button type="button" onClick=${onClose} className="focus-ring inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xl font-black text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] cursor-pointer shadow-sm" aria-label=${l.closePopup || 'Close popup'}>
            ×
          </button>
        </div>

        <div className="px-4 py-2 bg-[hsl(var(--muted)/0.42)] border-b border-[hsl(var(--border)/0.5)] flex gap-1 overflow-x-auto scrollbar-none shrink-0" aria-label="Hotels neighborhoods filter">
          ${['all', 'centro', 'east', 'north'].map(area => html`
            <button
              key=${area}
              type="button"
              onClick=${() => setSelectedArea(area)}
              className=${`focus-ring px-3.5 py-1 text-xs font-black rounded-full border-2 whitespace-nowrap cursor-pointer transition-all ${
                selectedArea === area
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm'
                  : 'border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.58)] hover:bg-[hsl(var(--muted))]'
              }`}
            >
              ${l[area] || area}
            </button>
          `)}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="p-3 rounded-xl border border-orange-300 bg-orange-50/70 dark:bg-orange-950/20 text-[#321249] dark:text-orange-200 flex items-start gap-2.5 shadow-sm">
            <span className="mt-0.5 p-1 rounded-full bg-orange-500 text-white shrink-0"><${Info} className="h-3.5 w-3.5" /></span>
            <div className="text-xs">
              <strong className="block font-black text-orange-800 dark:text-orange-300 mb-0.5">${l.safetyTitle}</strong>
              <p className="font-semibold leading-relaxed">${l.safetyTip}</p>
            </div>
          </div>

          ${translationLoading && currentLang !== 'en'
            ? html`<div className="rounded-xl border border-purple-300 bg-purple-50/70 px-3 py-2 text-[11px] font-bold text-purple-900 dark:border-purple-700 dark:bg-purple-950/20 dark:text-purple-200">${l.translating}</div>`
            : null}

          ${translationError
            ? html`<div className="rounded-xl border border-amber-300 bg-amber-50/80 px-3 py-2 text-[11px] font-semibold text-amber-900 dark:border-amber-700 dark:bg-amber-950/20 dark:text-amber-200">${l.translationWarning} ${translationError}</div>`
            : null}

          ${filteredHotels.length === 0
            ? html`<div className="text-center py-10 font-black text-[hsl(var(--muted-foreground))]">${l.noResults}</div>`
            : html`
              <div className="grid gap-4 sm:grid-cols-2">
                ${filteredHotels.map(hotel => html`
                  <article key=${hotel.id} className="group overflow-hidden rounded-2xl border-2 border-[hsl(var(--border)/0.72)] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary)/0.58)] hover:shadow-md transition-all flex flex-col">
                    <div className="relative h-44 w-full bg-[hsl(var(--muted))] overflow-hidden shrink-0">
                      <img
                        data-genmb-img="hotel recommendation"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src=${hotelImageOverrides[hotel.imageSeed] || `https://picsum.photos/seed/${hotel.imageSeed}/600/400`}
                        alt=${hotel.name}
                        onError=${handleImageError}
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-black tracking-wide uppercase bg-purple-900/90 text-orange-200 rounded-full border border-orange-400/50 backdrop-blur-md">
                        ${translatedHotelField(hotel, 'tag')}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-1.5">
                        <h3 className="text-[15px] font-black leading-tight text-[#4c1d95] dark:text-orange-200">${hotel.name}</h3>
                        <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                          ${Array.from({ length: hotel.stars }).map((_, i) => html`<${Star} key=${i} className="h-3.5 w-3.5 fill-current" />`)}
                        </div>
                      </div>

                      <p className="text-xs font-medium leading-relaxed text-[hsl(var(--muted-foreground))] flex-1">
                        ${translatedHotelField(hotel, 'desc')}
                      </p>

                      <div className="pt-2 border-t border-[hsl(var(--border)/0.38)] flex items-center justify-between gap-2 text-[11px] font-bold">
                        <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]">
                          <${MapPin} className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                          <span>${l[hotel.areaKey]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[hsl(var(--muted-foreground))]">${l.price}:</span>
                          <span className="font-black text-[hsl(var(--primary))]">${hotel.price}</span>
                        </div>
                      </div>

                      <a
                        href=${hotel.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring mt-2 inline-flex items-center justify-center gap-1.5 min-h-[34px] rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-orange-600 px-3.5 py-1.5 text-[11px] font-black shadow-sm"
                      >
                        <span>${l.viewOnMap}</span>
                        <${ExternalLink} className="h-3 w-3" />
                      </a>
                    </div>
                  </article>
                `)}
              </div>
            `
          }
        </div>
      </section>
    </div>
  `;
}

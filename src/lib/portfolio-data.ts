
import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";

export type PortfolioItemType = {
  id: string;
  title: string;
  category: "E-commerce" | "Connective" | "Landing" | "Catálogo" | "Servicios";
  sector: string;
  image?: ImagePlaceholder;
  description: string;
  services: string[];
  website?: string;
  client: string;
  challenge: string;
  solution: string;
  parallaxImages?: {
    laptop: string;
    phone: string;
  };
};

export type ContentPortfolioItemType = {
  id: string;
  title: string;
  type: "Reel" | "Campaña de Fotos" | "Video Corporativo";
  sector: string;
  client: string;
  image?: ImagePlaceholder;
  url: string;
};

const getScreenshotDir = (website?: string): string | null => {
  if (!website) return null;
  return website
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/.*$/, '')
    .split(/[^a-zA-Z0-9._-]/)[0];
};

const screenshotFiles: Record<string, string> = {
  "abevolks.com": "197.png",
  "additum.org": "Copia de 1.png",
  "adventuresgi.com": "5.png",
  "arco-techos.mx": "185.png",
  "asrfloraldesing.com": "101.png",
  "atleticamd.com": "157.png",
  "festivaldecineloscabos.mx": "1.png",
  "audifonosdeasa.com": "113.png",
  "auditoriosantiago.com": "89.png",
  "bhdmx.com": "145.png",
  "bove.com.mx": "173.png",
  "buffaloribs.info": "9.png",
  "buscoalhombredemivida.com": "69.png",
  "caficon.info": "45.png",
  "cenotesanisidro.com": "61.png",
  "ciemsacv.com": "13.png",
  "cirujano-maxilofacial.com": "93.png",
  "concamin.comenor.org.mx": "73.png",
  "consultorescaf.mx": "213.png",
  "core31.com.mx": "161.png",
  "cucubecerra.com": "21.png",
  "cuestiondepolemica.com": "169.png",
  "cursosdeinglesbrooklyn.com": "153.png",
  "distribuidoradepvc.com.mx": "193.png",
  "elconejo.com.mx": "133.png",
  "electrica-sanmiguel.com": "85.png",
  "elisawagnericp.com": "189.png",
  "epicrides.com.mx": "137.png",
  "epidemic.mx": "217.png",
  "everydaygroup.ca": "25.png",
  "floraenvia.com.mx": "53.png",
  "flotillassegurascrm.mx": "65.png",
  "grupojaia.com.mx": "77.png",
  "hiperprint.mx": "105.png",
  "ixagaleather.com.mx": "57.png",
  "jazaguilar.com": "181.png",
  "kohui.com.mx": "125.png",
  "laminadeoro.com": "17.png",
  "lasdeliciasdelcampo.com": "49.png",
  "latribuenmexico.com": "29.png",
  "lifeinsuranceexpert.ca": "237.png",
  "maestrodelmedia.com": "117.png",
  "maestrosdelmedia.com": "41.png",
  "mawsoluciones.com": "121.png",
  "meigas.es": "229.png",
  "niu-coliving.com": "201.png",
  "papierwaren.com.mx": "221.png",
  "pisosepoxicoslexfor.com": "129.png",
  "plantforst.com": "37.png",
  "propertytraders.online": "81.png",
  "psepowerbatteries.com": "177.png",
  "rapidpre.mx": "233.png",
  "sifsa.mx": "209.png",
  "simtex.com.mx": "33.png",
  "smallbumpers.mx": "141.png",
  "suministroshebe.com": "149.png",
  "toshiba.com.mx": "225.png",
  "traktobuss.com": "100.png",
  "turismar.com.mx": "109.png",
  "valor-compartido.com": "165.png",
  "voltagroup.com.mx": "205.png",
};

const placeholderImages = PlaceHolderImages.filter(
  (img) => img.id.startsWith("portfolio-web-")
);

let imageCounter = 0;

const getNextImage = () => {
  if (placeholderImages.length === 0) return undefined;
  const image = placeholderImages[imageCounter];
  imageCounter = (imageCounter + 1) % placeholderImages.length;
  return image;
}

export const contentPortfolioItems: ContentPortfolioItemType[] = [
  {
    "id": "plaza-azul",
    "title": "Plaza Azul",
    "type": "Reel",
    "sector": "Ropa y Moda",
    "client": "Plaza Azul",
    "image": { id: "plaza-azul-img", description: "Plaza Azul", imageUrl: "/images/Plaza Azul.png", imageHint: "plaza azul" },
    "url": "https://www.tiktok.com/@plaza_azul"
  },
  {
    "id": "biofert",
    "title": "Biofert",
    "type": "Campaña de Fotos",
    "sector": "Salud",
    "client": "Biofert",
    "image": { id: "biofert-img", description: "Biofert", imageUrl: "/images/content/biofert.jpg", imageHint: "biofert" },
    "url": "https://www.instagram.com/biofert_/"
  },
  {
    "id": "centro-urologico",
    "title": "Centro Urológico",
    "type": "Reel",
    "sector": "Salud",
    "client": "Centro Urológico",
    "image": { id: "centro-urologico-img", description: "Centro Urológico", imageUrl: "/images/Urologo.png", imageHint: "centro urologico" },
    "url": "https://www.instagram.com/centrourologico"
  },
  {
    "id": "huesos-y-articulaciones",
    "title": "Huesos y Articulaciones",
    "type": "Reel",
    "sector": "Salud",
    "client": "Huesos y Articulaciones",
    "image": PlaceHolderImages.find(img => img.id === 'content-salud-3'),
    "url": "https://www.facebook.com/HuesosyArticulaciones"
  },
  {
    "id": "grupo-deasa",
    "title": "Grupo Deasa",
    "type": "Campaña de Fotos",
    "sector": "Salud",
    "client": "Grupo Deasa",
    "image": { id: "deasa-img", description: "Grupo Deasa", imageUrl: "/images/content/deasa.jpg", imageHint: "grupo deasa" },
    "url": "https://www.facebook.com/grupodeasaoficial?locale=es_LA"
  },
  {
    "id": "medical-tower",
    "title": "Medical Tower",
    "type": "Reel",
    "sector": "Salud",
    "client": "Medical Tower",
    "image": { id: "medical-tower-img", description: "MIT Medical Tower", imageUrl: "/images/content/medical-tower.jpg", imageHint: "mit medical tower" },
    "url": "https://www.tiktok.com/@mit.medical.tower"
  },
  {
    "id": "technosim",
    "title": "Technosim",
    "type": "Campaña de Fotos",
    "sector": "Salud",
    "client": "Technosim",
    "image": { id: "tecnosim-img", description: "Technosim", imageUrl: "/images/content/tecnosim.png", imageHint: "tecnosim" },
    "url": "https://www.facebook.com/profile.php?id=61578682690139"
  },
  {
    "id": "niu-coliving",
    "title": "NIU Coliving",
    "type": "Reel",
    "sector": "Turismo",
    "client": "NIU Coliving",
    "image": PlaceHolderImages.find(img => img.id === 'content-turismo-1'),
    "url": "https://www.instagram.com/niu_coliving/"
  },
  {
    "id": "cenote-san-isidro-content",
    "title": "Cenote San Isidro",
    "type": "Reel",
    "sector": "Turismo",
    "client": "Cenote San Isidro",
    "image": PlaceHolderImages.find(img => img.id === 'content-turismo-2'),
    "url": "https://www.facebook.com/profile.php?id=61572579834917"
  },
  {
    "id": "saudade-do-brazil",
    "title": "Saudade do Brazil",
    "type": "Reel",
    "sector": "Restaurantes",
    "client": "Saudade do Brazil",
    "image": PlaceHolderImages.find(img => img.id === 'content-restaurante-1'),
    "url": "https://www.instagram.com/saudadedobrazil.mx/"
  },
  {
    "id": "polanco-santino",
    "title": "Polanco Santino",
    "type": "Reel",
    "sector": "Restaurantes",
    "client": "Polanco Santino",
    "image": { id: "polanco-santino-img", description: "Polanco Santino", imageUrl: "/images/Polanco Santino.png", imageHint: "polanco santino" },
    "url": "https://www.instagram.com/polancosantino/?hl=es"
  },
  {
    "id": "santa-carne-y-mas",
    "title": "Santa Carne y Más",
    "type": "Reel",
    "sector": "Restaurantes",
    "client": "Santa Carne y Más",
    "image": PlaceHolderImages.find(img => img.id === 'content-restaurante-3'),
    "url": "https://www.facebook.com/santacarneymas/reels/"
  },
  {
    "id": "don-jose-steakhouse",
    "title": "Don José Steakhouse",
    "type": "Reel",
    "sector": "Restaurantes",
    "client": "Don José Steakhouse",
    "image": PlaceHolderImages.find(img => img.id === 'content-restaurante-4'),
    "url": "https://www.instagram.com/donjosesteakhouse/"
  },
  {
    "id": "las-delicias-del-campo-content",
    "title": "Las Delicias del Campo",
    "type": "Campaña de Fotos",
    "sector": "Restaurantes",
    "client": "Las Delicias del Campo",
    "image": PlaceHolderImages.find(img => img.id === 'content-restaurante-5'),
    "url": "https://www.instagram.com/lasdeliciasdelcampomexico/"
  },
  {
    "id": "wapas",
    "title": "Wapas",
    "type": "Reel",
    "sector": "Restaurantes",
    "client": "Wapas",
    "image": PlaceHolderImages.find(img => img.id === 'content-restaurante-6'),
    "url": "https://www.tiktok.com/@laswapas_oficial"
  },
  {
    "id": "paolo-gourmet-content",
    "title": "Paolo Gourmet",
    "type": "Campaña de Fotos",
    "sector": "Restaurantes",
    "client": "Paolo Gourmet",
    "image": PlaceHolderImages.find(img => img.id === 'content-restaurante-7'),
    "url": "https://www.facebook.com/profile.php?id=61578410386269"
  },
  {
    "id": "buffalo-ribs-content",
    "title": "Buffalo Ribs",
    "type": "Reel",
    "sector": "Restaurantes",
    "client": "Buffalo Ribs",
    "image": PlaceHolderImages.find(img => img.id === 'content-restaurante-8'),
    "url": "https://www.tiktok.com/@buffalo_ribs_"
  },
  {
    "id": "electrica-san-miguel",
    "title": "Electrica San Miguel de México",
    "type": "Campaña de Fotos",
    "sector": "Industrial",
    "client": "Electrica San Miguel de México",
    "image": PlaceHolderImages.find(img => img.id === 'content-industrial-1'),
    "url": "https://www.facebook.com/electricasanmigueldemexico/?locale=es_LA"
  },
  {
    "id": "sinube",
    "title": "SiNube",
    "type": "Reel",
    "sector": "Software",
    "client": "SiNube",
    "image": PlaceHolderImages.find(img => img.id === 'content-software-1'),
    "url": "https://www.facebook.com/sinube?locale=es_LA"
  },
  {
    "id": "gruas-y-polipastos",
    "title": "Gruas y Polipastos",
    "type": "Reel",
    "sector": "Industrial",
    "client": "Gruas y Polipastos",
    "image": PlaceHolderImages.find(img => img.id === 'content-industrial-2'),
    "url": "https://www.instagram.com/gruasypolipastos"
  },
  {
    "id": "dfac-content",
    "title": "DFAC",
    "type": "Campaña de Fotos",
    "sector": "Industrial",
    "client": "DFAC",
    "image": PlaceHolderImages.find(img => img.id === 'content-industrial-3'),
    "url": "https://www.facebook.com/bandasdepvcymonosparacimbra"
  },
  {
    "id": "turismar-content",
    "title": "Turismar",
    "type": "Campaña de Fotos",
    "sector": "Industrial",
    "client": "Turismar",
    "image": PlaceHolderImages.find(img => img.id === 'content-industrial-4'),
    "url": "https://www.facebook.com/rentaturismar"
  },
  {
    "id": "maqtech",
    "title": "Maqtech",
    "type": "Campaña de Fotos",
    "sector": "Industrial",
    "client": "Maqtech",
    "image": PlaceHolderImages.find(img => img.id === 'content-industrial-5'),
    "url": "https://www.facebook.com/profile.php?id=61570233765991"
  },
  {
    "id": "dra-karen-carrillo",
    "title": "Dra. Karen Carrillo",
    "type": "Reel",
    "sector": "Influencers",
    "client": "Dra. Karen Carrillo",
    "image": PlaceHolderImages.find(img => img.id === 'content-influencer-1'),
    "url": "https://www.instagram.com/drakarencarrillo/"
  },
  {
    "id": "ricardo-garza",
    "title": "Ricardo Garza",
    "type": "Reel",
    "sector": "Influencers",
    "client": "Ricardo Garza",
    "image": PlaceHolderImages.find(img => img.id === 'content-influencer-2'),
    "url": "https://www.instagram.com/ricardogarzamx/?hl=es"
  },
  {
    "id": "haide-unique",
    "title": "Haide Unique",
    "type": "Reel",
    "sector": "Influencers",
    "client": "Haide Unique",
    "image": PlaceHolderImages.find(img => img.id === 'content-influencer-3'),
    "url": "https://www.instagram.com/haideuniquemex/"
  },
  {
    "id": "nizmenur",
    "title": "Nizmenur",
    "type": "Reel",
    "sector": "Influencers",
    "client": "Nizmenur",
    "image": PlaceHolderImages.find(img => img.id === 'content-influencer-4'),
    "url": "https://www.instagram.com/nizmenur/?hl=es-la"
  },
  {
    "id": "gi-alpine",
    "title": "Gi Alpine",
    "type": "Reel",
    "sector": "Influencers",
    "client": "Gi Alpine",
    "image": PlaceHolderImages.find(img => img.id === 'content-influencer-5'),
    "url": "https://www.instagram.com/gi.alpine?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },
  {
    "id": "dc-solutions-ti",
    "title": "DC Solutions TI",
    "type": "Campaña de Fotos",
    "sector": "Servicios Profesionales",
    "client": "DC Solutions TI",
    "image": PlaceHolderImages.find(img => img.id === 'content-servicios-1'),
    "url": "https://www.facebook.com/dcsolutionsTI"
  },
  {
    "id": "benjamin-jv",
    "title": "Benjamin JV",
    "type": "Reel",
    "sector": "Servicios Profesionales",
    "client": "Benjamin JV",
    "image": PlaceHolderImages.find(img => img.id === 'content-servicios-2'),
    "url": "https://www.instagram.com/benjamin_jv/"
  },
  {
    "id": "consultoria-luz-sistemica",
    "title": "Consultoría Luz Sistémica",
    "type": "Campaña de Fotos",
    "sector": "Servicios Profesionales",
    "client": "Consultoría Luz Sistémica",
    "image": PlaceHolderImages.find(img => img.id === 'content-servicios-3'),
    "url": "https://www.facebook.com/ConsultoriaLuzSistemica/"
  },
  {
    "id": "caf-consultores",
    "title": "CAF Consultores",
    "type": "Campaña de Fotos",
    "sector": "Servicios Profesionales",
    "client": "CAF Consultores",
    "image": PlaceHolderImages.find(img => img.id === 'content-servicios-4'),
    "url": "https://www.facebook.com/consultorescafmx"
  },
  {
    "id": "epidemic-content",
    "title": "Epidemic",
    "type": "Campaña de Fotos",
    "sector": "Ropa y Moda",
    "client": "Epidemic",
    "image": PlaceHolderImages.find(img => img.id === 'content-ropa-1'),
    "url": "https://www.facebook.com/profile.php?id=61579397999096"
  },
  {
    "id": "agel-dori",
    "title": "Agel Dori",
    "type": "Reel",
    "sector": "Ropa y Moda",
    "client": "Agel Dori",
    "image": PlaceHolderImages.find(img => img.id === 'content-ropa-2'),
    "url": "https://www.instagram.com/angeldori_deseo_interior?igsh=enlwaWNrdWNjb2Qw"
  },
  {
    "id": "cucu-becerra-content",
    "title": "Cucu Becerra",
    "type": "Reel",
    "sector": "Ropa y Moda",
    "client": "Cucu Becerra",
    "image": PlaceHolderImages.find(img => img.id === 'content-ropa-3'),
    "url": "https://www.instagram.com/cucubecerra_mx?igsh=NzZxcWRkeHp4NjQx"
  }
];


export const portfolioItems: PortfolioItemType[] = [
  {
    "id": "additum",
    "title": "Desarrollo Integral del Sitio Web para Additum.org",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Proyecto de diseño y desarrollo web para additum.org, una empresa del sector de servicios profesionales. El objetivo fue crear una plataforma digital eficiente, moderna y accesible que reflejara la profesionalidad de la marca y facilitara la interacción con sus clientes.",
    "services": [
      "Análisis y consultoría de requerimientos",
      "Diseño UX/UI personalizado",
      "Desarrollo front-end y back-end",
      "Implementación de CMS para gestión de contenidos",
      "Diseño responsivo para dispositivos móviles",
      "Optimización SEO",
      "Integración de formularios y herramientas interactivas",
      "Pruebas de usabilidad y rendimiento",
      "Capacitación para gestión del sitio",
      "Soporte y mantenimiento continuo"
    ],
    "website": "additum.org",
    "client": "additum.org",
    "challenge": "El desafío principal fue diseñar y desarrollar un sitio web que transmitiera la confianza y profesionalismo propios del sector de servicios profesionales, que además garantizara una experiencia de usuario óptima en todos los dispositivos y facilitara la comunicación con potenciales clientes.",
    "solution": "Nuestra solución fue crear un sitio web integral con un diseño limpio y moderno, adaptable a dispositivos móviles y optimizado para motores de búsqueda. Implementamos un sistema de gestión de contenidos que permite a la empresa actualizar fácilmente su información. También integramos herramientas de contacto eficientes que mejoran la comunicación con los usuarios, junto con un mantenimiento constante para asegurar el buen funcionamiento y la seguridad del sitio.",
  },
  {
    "id": "adventuresgi",
    "title": "Desarrollo del Sitio Web adventuresgi.com para Actividades Recreativas",
    "category": "Connective",
    "sector": "Actividades Recreativas",
    "description": "Creación de una plataforma web interactiva para AdventuresGI.com, destinada a promover y facilitar la reserva de actividades recreativas innovadoras y seguras, con un diseño moderno y experiencia de usuario optimizada.",
    "services": [
      "Diseño y desarrollo web responsive",
      "Implementación de sistema de reservas en línea",
      "Optimización de la experiencia de usuario (UX)",
      "Integración de gestión de contenidos (CMS)",
      "Optimización SEO",
      "Mantenimiento y soporte técnico"
    ],
    "website": "adventuresgi.com",
    "client": "AdventuresGI.com",
    "challenge": "AdventuresGI.com requería un sitio web capaz de transmitir la emoción y accesibilidad de sus actividades recreativas, facilitando a los usuarios la navegación y reserva de manera segura y rápida. Además, el desafío incluía integrar un sistema de reservas eficiente, un diseño visual atractivo y una plataforma robusta que soportara actualizaciones frecuentes de contenido.",
    "solution": "Desarrollamos un sitio web responsivo con un diseño visual impactante y navegación intuitiva que permite a los usuarios explorar y reservar actividades con facilidad. Integramos un sistema de reservas en tiempo real y configuramos un gestor de contenidos para que el cliente pueda actualizar la información constantemente. También optimizamos la velocidad, seguridad y posicionamiento SEO para asegurar una excelente experiencia y visibilidad en línea.",
  },
  {
    "id": "buffaloribs.info",
    "title": "Desarrollo Web para BuffaloRibs.info",
    "category": "Landing",
    "sector": "Restaurantes",
    "description": "Creación integral del sitio web para BuffaloRibs, un restaurante especializado en costillas al estilo americano, con el objetivo de mejorar su presencia digital y facilitar la interacción con sus clientes.",
    "services": [
      "Diseño UI/UX",
      "Desarrollo web responsive",
      "Integración de sistema de reservas y pedidos en línea",
      "Optimización SEO",
      "Redacción de contenido",
      "Gestión de hosting y mantenimiento",
      "Soporte y actualización continua"
    ],
    "website": "buffaloribs.info",
    "client": "BuffaloRibs",
    "challenge": "BuffaloRibs necesitaba un sitio web atractivo y funcional que reflejara su identidad gastronómica y sirviera como plataforma para reservas y pedidos online, todo accesible desde cualquier dispositivo.",
    "solution": "Desarrollamos un sitio web responsivo con diseño visual impactante y navegación intuitiva. Implementamos un sistema de reservas y pedidos integrado, optimizado para móviles, y creamos contenido dinámico para promocionar eventos y ofertas. Todo ello con un enfoque en velocidad, seguridad y experiencia de usuario.",
  },
  {
    "id": "ixagaleather",
    "title": "Desarrollo de sitio web para Ixaga Leather",
    "category": "E-commerce",
    "sector": "Ropa y Moda",
    "description": "Diseñamos y desarrollamos el sitio web ixagaleather.com.mx para una marca mexicana líder en ropa y calzado de piel, buscando reflejar la calidad y exclusividad de sus productos.",
    "services": [
      "Diseño y desarrollo web responsivo",
      "Implementación de tienda en línea (e-commerce)",
      "Integración de sistema de gestión de contenido (CMS)",
      "Optimización SEO inicial",
      "Consultoría en experiencia de usuario (UX)",
      "Soporte técnico y mantenimiento"
    ],
    "website": "ixagaleather.com.mx",
    "client": "Ixaga Leather",
    "challenge": "Crear una plataforma digital atractiva, intuitiva y funcional que reflejara la artesanía y calidad de los productos de Ixaga Leather, permitiendo una experiencia de compra en línea segura y amigable, además de garantizar facilidad para que el equipo pueda gestionar el sitio de forma autónoma.",
    "solution": "Desarrollamos un sitio con diseño moderno y responsive, optimizado para diferentes dispositivos, integrando una tienda en línea segura con métodos de pago flexibles y un CMS personalizado para la gestión eficiente de productos y contenido. Se implementaron además estrategias básicas de SEO y mejoras en la navegación para maximizar la experiencia del usuario y mejorar la visibilidad online de la marca.",
  },
  {
    "id": "epicrides",
    "title": "EpicRides - Plataforma Digital para Eventos",
    "category": "E-commerce",
    "sector": "Eventos",
    "description": "Desarrollo integral del sitio web para EpicRides, una empresa especializada en eventos de motociclismo extremo, enfocado en ofrecer una experiencia online emocionante y funcional para sus usuarios.",
    "services": [
      "Diseño y desarrollo web a medida",
      "Implementación de sistema de registro en línea",
      "Integración de mapas interactivos y rutas de eventos",
      "Diseño responsivo para dispositivos móviles",
      "Optimización SEO y rendimiento web",
      "Integración con redes sociales y herramientas de marketing digital"
    ],
    "website": "epicrides.com.mx",
    "client": "EpicRides",
    "challenge": "EpicRides necesitaba una plataforma digital que capturara la energía y emoción de sus eventos, facilitando la inscripción de participantes y el acceso a información crítica como rutas y horarios. Además, el sitio debía soportar picos de tráfico y ser accesible desde cualquier dispositivo.",
    "solution": "Creamos un sitio web dinámico y atractivo con sistema de registro seguro, mapas interactivos de rutas, blog informativo y diseño responsivo que optimiza la experiencia en móviles. También se implementaron mecanismos para garantizar estabilidad y velocidad, y se integraron redes sociales para ampliar la difusión del evento.",
  },
  {
    "id": "ciemsacv",
    "title": "Desarrollo del Sitio Web para CIEM SACV",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Diseño y desarrollo integral del sitio web ciemsacv.com, enfocado en el sector de servicios profesionales para mejorar su presencia digital y comunicación con clientes potenciales.",
    "services": [
      "Análisis y planificación del proyecto",
      "Diseño UX/UI personalizado",
      "Desarrollo web responsivo",
      "Optimización SEO",
      "Integración de sistemas de contacto",
      "Pruebas de usabilidad y lanzamiento",
      "Soporte y mantenimiento post-lanzamiento"
    ],
    "website": "ciemsacv.com",
    "client": "CIEM SACV",
    "challenge": "El principal desafío fue construir una plataforma digital que transmitiera la profesionalidad y confianza propias del sector de servicios profesionales, asegurando una experiencia de usuario clara y accesible que destacara sus competencias y servicios en un mercado competitivo.",
    "solution": "Implementamos un diseño moderno y responsivo adaptado a todas las plataformas, desarrollamos contenido optimizado para mejorar la visibilidad en buscadores, e integramos sistemas de contacto eficientes para facilitar la comunicación con clientes, garantizando una solución completa que cubriera todas las necesidades del cliente.",
  },
  {
    "id": "floraenvia",
    "title": "Rediseño y Desarrollo Web para FloraEnvia",
    "category": "E-commerce",
    "sector": "Florería",
    "description": "Desarrollamos un sitio web moderno y funcional para FloraEnvia, una florería que necesitaba fortalecer su presencia digital y facilitar la experiencia de compra de sus clientes.",
    "services": [
      "Diseño web responsivo",
      "Desarrollo de comercio electrónico",
      "Integración de pasarelas de pago",
      "Optimización SEO",
      "Implementación de chat en vivo",
      "Consultoría UX/UI",
      "Mantenimiento y soporte técnico"
    ],
    "website": "floraenvia.com.mx",
    "client": "FloraEnvia",
    "challenge": "FloraEnvia necesitaba un sitio web que reflejara la frescura y calidad de sus arreglos florales, con una experiencia de usuario sencilla y atractiva que permitiera la personalización de pedidos y opciones de entrega flexibles. Además, el sitio debía ser competitivo en el mercado digital y estar optimizado para dispositivos móviles.",
    "solution": "Creamos un sitio web visualmente atractivo y responsivo que muestra el catálogo de productos con filtros personalizados. Implementamos un sistema de pago seguro, personalización de arreglos, optimizamos la velocidad y SEO, y añadimos un chat en vivo para soporte en tiempo real, proporcionando así una experiencia completa y satisfactoria para los usuarios.",
  },
  {
    "id": "simtex",
    "title": "Desarrollo Integral del Sitio Web de Simtex",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Creación de un sitio web profesional y funcional para Simtex, una empresa del sector servicios profesionales, que refleje su experiencia y facilite la interacción con sus clientes.",
    "services": [
      "Diseño y desarrollo web responsivo",
      "Optimización SEO",
      "Integración de formularios de contacto",
      "Consultoría en experiencia de usuario (UX)",
      "Desarrollo front-end y back-end"
    ],
    "website": "simtex.com.mx",
    "client": "Simtex",
    "challenge": "Simtex necesitaba un sitio web que representara su profesionalismo y experiencia en el sector servicios profesionales, garantizando una navegación sencilla y efectiva para sus usuarios y mejorando su visibilidad online. El reto consistía en crear una plataforma atractiva y funcional que se adaptara a múltiples dispositivos y optimizara la comunicación con sus clientes potenciales.",
    "solution": "Diseñamos y desarrollamos un sitio web moderno y responsivo, alineado con la identidad corporativa de Simtex. Implementamos una estructura clara para que los usuarios accedieran fácilmente a la información y servicios. Añadimos formularios de contacto optimizados para facilitar la interacción, y aplicamos técnicas de SEO para mejorar su posicionamiento en buscadores, logrando destacar su presencia online y atraer a más clientes.",
  },
  {
    "id": "latribuenmexico",
    "title": "Desarrollo Web para LaTribuenMexico.com",
    "category": "Landing",
    "sector": "Actividades Recreativas",
    "description": "Creación del sitio web para La Tribu en México, una plataforma dedicada a actividades recreativas que ofrece experiencias culturales y de entretenimiento únicas.",
    "services": [
      "Diseño Web Personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización para Dispositivos Móviles",
      "Integración de Sistemas de Reserva",
      "SEO Básico",
      "Mantenimiento y Soporte Técnico"
    ],
    "website": "latribuenmexico.com",
    "client": "La Tribu México",
    "challenge": "El desafío principal fue diseñar un sitio web atractivo, funcional y fácil de usar que transmitiera la esencia cultural y recreativa de La Tribu México, permitiendo a los usuarios explorar y reservar actividades de manera intuitiva. Además, era necesario garantizar una óptima experiencia en múltiples dispositivos, manteniendo una velocidad de carga rápida y facilidad de administración para el cliente.",
    "solution": "Desarrollamos un sitio web con un diseño visual impactante y representativo del espíritu de La Tribu, utilizando tecnologías web modernas para asegurar un rendimiento y usabilidad óptimos. Implementamos un sistema de reservas integrado, adaptamos el contenido para dispositivos móviles y aplicamos técnicas de SEO para mejorar la visibilidad en buscadores. Todo ello acompañado de un panel de administración sencillo para que el cliente pueda gestionar fácilmente las actividades y reservas.",
  },
  {
    "id": "laminadeoro",
    "title": "Lamina de Oro - Desarrollo Web Integral",
    "category": "E-commerce",
    "sector": "Otros",
    "description": "Diseño y desarrollo de un sitio web corporativo para LaminadeOro, una empresa dedicada a productos y servicios en el sector de otros. El objetivo fue crear una plataforma atractiva que refleje la identidad de la marca y facilite la experiencia del usuario.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para dispositivos móviles",
      "Integración de sistemas de gestión de contenido",
      "SEO básico y optimización de rendimiento"
    ],
    "website": "laminadeoro.com",
    "client": "LaminadeOro",
    "challenge": "El principal desafío fue construir un sitio web que no solo representara fielmente la imagen y valores de LaminadeOro, sino que también ofreciera una experiencia de usuario intuitiva y atractiva, asegurando compatibilidad con múltiples dispositivos y navegadores en un sector poco convencional, donde la comunicación visual es clave para destacar.",
    "solution": "Desarrollamos una solución integral que incluyó un diseño visual impactante y coherente con la marca, una arquitectura web optimizada y responsive, así como la implementación de herramientas que facilitan la actualización y gestión de contenido para el cliente. Además, se aseguró la correcta performance del sitio para ofrecer una experiencia fluida, incrementando la visibilidad online y fortaleciendo la presencia digital de LaminadeOro.",
  },
  {
    "id": "cenotesanisidro",
    "title": "Desarrollo del Sitio Web para Cenotes San Isidro",
    "category": "E-commerce",
    "sector": "Actividades Recreativas",
    "description": "Diseño y desarrollo de un sitio web para Cenotes San Isidro, empresa dedicada a actividades recreativas en entornos naturales, con el objetivo de mejorar su presencia digital y facilitar la reserva de experiencias.",
    "services": [
      "Diseño web responsivo",
      "Desarrollo de plataforma de reservas",
      "Optimización SEO",
      "Integración de contenido multimedia",
      "Consultoría UX/UI"
    ],
    "website": "cenotesanisidro.com",
    "client": "Cenotes San Isidro",
    "challenge": "El principal desafío consistió en crear una plataforma web atractiva y funcional que reflejara la belleza natural de los cenotes y la variedad de actividades recreativas, además de facilitar la interacción y reserva en línea para un público diverso, desde turistas locales hasta internacionales.",
    "solution": "Desarrollamos un sitio web visualmente impactante y fácil de usar, con fotografías en alta resolución y diseño responsivo para dispositivos móviles. Implementamos un sistema de reservas intuitivo y seguro, optimizamos el contenido para motores de búsqueda y mejoramos la experiencia del usuario mediante una navegación clara y accesible, asegurando un aumento en la captación de clientes y una mejor comunicación digital para Cenotes San Isidro.",
  },
  {
    "id": "auditoriosantiago",
    "title": "Desarrollo Web para Auditorio Santiago",
    "category": "Connective",
    "sector": "Eventos",
    "description": "Creación de un sitio web moderno y funcional para Auditorio Santiago, un espacio dedicado a la organización y promoción de eventos.",
    "services": [
      "Diseño web responsive",
      "Desarrollo de sitios web",
      "Integración de sistemas de reserva y contacto"
    ],
    "website": "auditoriosantiago.com",
    "client": "Auditorio Santiago",
    "challenge": "El principal desafío fue diseñar un sitio web que reflejara la sofisticación y versatilidad del espacio para eventos, permitiendo a los usuarios encontrar información clara sobre los servicios y reservar espacios de manera sencilla, todo en un entorno visualmente atractivo y accesible desde dispositivos móviles.",
    "solution": "Desarrollamos una plataforma web integral que incluye un diseño atractivo y responsivo, facilitando la navegación en todo tipo de dispositivos. Implementamos un sistema de reservas y contacto fácil de usar para que los clientes puedan gestionar sus eventos de forma rápida. Además, optimizamos el sitio para mejorar la visibilidad en buscadores y proporcionar una experiencia de usuario fluida y profesional.",
  },
  {
    "id": "buscoalhombredemivida",
    "title": "Busco al Hombre de Mi Vida",
    "category": "Connective",
    "sector": "Eventos",
    "description": "Desarrollo integral del sitio web para la plataforma Buscoalhombredemivida.com, dedicada a eventos de citas y encuentros amorosos en el sector de eventos.",
    "services": [
      "Diseño y desarrollo web personalizado",
      "Implementación de sistema de gestión de eventos",
      "Optimización para experiencia de usuario y dispositivos móviles"
    ],
    "website": "buscoalhombredemivida.com",
    "client": "Buscoalhombredemivida.com",
    "challenge": "El reto principal consistió en crear una plataforma atractiva y funcional que permitiera a los usuarios registrarse, buscar y participar en eventos de citas de manera fácil e interactiva, garantizando un alto rendimiento y escalabilidad para soportar un crecimiento rápido de usuarios.",
    "solution": "Desarrollamos un sitio web a medida con una interfaz intuitiva, integrando funcionalidades clave como perfiles de usuario, sistema de gestión y calendario de eventos, y herramientas de comunicación entre participantes. Además, optimizamos la experiencia para dispositivos móviles y aseguramos un backend robusto, permitiendo al cliente manejar eficientemente su base de usuarios y eventos.",
  },
  {
    "id": "flotillassegurascrm",
    "title": "Desarrollo y Diseño del Sitio Web Flotillas Seguras CRM",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación integral del sitio web flotillassegurascrm.mx, enfocado en el sector industrial para gestionar flotillas de vehículos de manera eficiente y segura.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo de plataforma CRM",
      "Optimización para dispositivos móviles"
    ],
    "website": "flotillassegurascrm.mx",
    "client": "Flotillas Seguras CRM",
    "challenge": "El desafío principal fue desarrollar una plataforma web intuitiva y segura que permitiera a las empresas del sector industrial gestionar sus flotillas de vehículos de forma eficiente, facilitando el seguimiento, mantenimiento y control de sus unidades en tiempo real, todo esto con un diseño profesional que reflejara la seriedad y confianza del sector.",
    "solution": "Desarrollamos una solución web completa que incluyó un diseño responsive y accesible, integrado con un CRM personalizado para gestionar la información de las flotillas. Implementamos funcionalidades para el seguimiento en tiempo real, reportes automáticos y alertas que optimizan la gestión del parque vehicular, mejorando así la eficiencia y seguridad operativa de nuestros clientes.",
  },
  {
    "id": "electrica-sanmiguel",
    "title": "Desarrollo del Sitio Web para Electrica San Miguel",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación y desarrollo integral del sitio web para Electrica San Miguel, empresa dedicada al sector industrial, con el objetivo de mejorar su presencia digital y facilitar el acceso a sus servicios.",
    "services": [
      "Diseño y desarrollo web personalizado",
      "Optimización para dispositivos móviles",
      "Integración de contenido y funcionalidades específicas para el sector industrial"
    ],
    "website": "electrica-sanmiguel.com",
    "client": "Electrica San Miguel",
    "challenge": "Electrica San Miguel necesitaba un sitio web moderno y funcional que representara de manera clara y profesional sus servicios industriales, además de mejorar la experiencia de usuario y la accesibilidad desde diversos dispositivos.",
    "solution": "Desarrollamos un sitio web responsivo con un diseño adaptado a la identidad visual de Electrica San Miguel, optimizando la navegación y destacando sus servicios clave. Implementamos funcionalidades específicas para el sector industrial, asegurando una plataforma sólida, fácil de actualizar y que proyecta confianza y profesionalismo.",
  },
  {
    "id": "plantforst",
    "title": "Diseño y Desarrollo Web para Plantforst",
    "category": "E-commerce",
    "sector": "Otros",
    "description": "Proyecto integral de desarrollo web para Plantforst.com, un sitio enfocado en el sector Otros, que necesitaba modernizar su presencia digital para mejorar la experiencia de usuario y ampliar su alcance.",
    "services": [
      "Diseño Web Personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización para SEO y Rendimiento",
      "Integración de Sistemas",
      "Soporte y Mantenimiento"
    ],
    "website": "plantforst.com",
    "client": "Plantforst.com",
    "challenge": "El desafío principal fue crear un sitio web que reflejara la esencia y profesionalismo de Plantforst.com en un sector poco convencional, asegurando una navegación intuitiva y una presentación clara de sus servicios y productos, además de cumplir con requisitos de funcionalidad específicos y escalabilidad futura.",
    "solution": "Desarrollamos una plataforma web moderna y responsiva, adaptada a las necesidades únicas de Plantforst.com. Implementamos un diseño atractivo y funcional, optimizamos la estructura para SEO y mejoramos la velocidad de carga. También integramos sistemas personalizados que facilitan la gestión de contenido y la interacción con usuarios, garantizando una experiencia óptima y preparada para crecimiento futuro.",
  },
  {
    "id": "lasdeliciasdelcampo",
    "title": "Las Delicias del Campo - Restaurante",
    "category": "E-commerce",
    "sector": "Restaurantes",
    "description": "Desarrollo integral del sitio web para Las Delicias del Campo, un restaurante que busca ofrecer una experiencia digital atractiva y funcional para sus clientes.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo frontend y backend",
      "Optimización para dispositivos móviles",
      "Integración de menú interactivo",
      "Implementación de sistema de reservas online",
      "SEO básico para posicionamiento local"
    ],
    "website": "lasdeliciasdelcampo.com",
    "client": "Las Delicias del Campo",
    "challenge": "El principal desafío fue crear un sitio web que no solo reflejara la esencia y calidez del restaurante, sino que también facilitara a los usuarios la consulta del menú y la reserva de mesa de forma rápida y sencilla, todo con una experiencia visual atractiva y funcional en distintos dispositivos.",
    "solution": "Desarrollamos un sitio web responsive con un diseño visualmente atractivo que refleja la identidad del restaurante. Implementamos un menú interactivo fácil de navegar y un sistema de reservas online integrado, optimizado para móviles y con tiempos de carga eficientes para mejorar la experiencia del usuario. Además, trabajamos en aspectos básicos de SEO para mejorar la visibilidad local del restaurante en buscadores.",
  },
  {
    "id": "asrfloraldesing",
    "title": "Desarrollo del Sitio Web para ASR Floral Design",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Creación integral del sitio web para ASR Floral Design, empresa dedicada a servicios profesionales en diseño floral.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para SEO y experiencia de usuario"
    ],
    "website": "asrfloraldesing.com",
    "client": "ASR Floral Design",
    "challenge": "El principal desafío fue desarrollar un sitio web que reflejara la elegancia y profesionalismo de ASR Floral Design, ofreciendo una experiencia visual atractiva y funcional para capturar la esencia creativa del negocio floral, asegurando una navegación intuitiva y rápida adaptada a dispositivos móviles.",
    "solution": "Diseñamos y desarrollamos un sitio web a medida con un enfoque visual impactante y moderno, integrando funcionalidades responsive para dispositivos móviles, optimizando la velocidad de carga y mejorando la estructura para SEO. Incorporamos galerías visuales y secciones claras para presentar los servicios profesionales, facilitando el contacto y la conversión de visitantes en clientes.",
  },
  {
    "id": "mawsoluciones",
    "title": "Desarrollo Integral del Sitio Web MawSoluciones.com",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Creación y desarrollo completo del sitio web para MawSoluciones.com, una empresa dedicada a servicios profesionales, enfocándonos en una experiencia de usuario óptima y un diseño funcional que refleje la identidad y valores del cliente.",
    "services": [
      "Diseño Web Personalizado",
      "Desarrollo Front-end y Back-end",
      "Optimización SEO",
      "Integración de Sistemas",
      "Mantenimiento y Soporte Técnico"
    ],
    "website": "mawsoluciones.com",
    "client": "MawSoluciones.com",
    "challenge": "El principal desafío fue desarrollar una plataforma web que comunicara de manera efectiva y profesional los servicios ofrecidos, adaptándose a las necesidades específicas del sector de servicios profesionales. El sitio debía combinar funcionalidad, estética y facilidad de navegación para facilitar la conversión de visitantes en clientes potenciales.",
    "solution": "Diseñamos y desarrollamos un sitio web a medida con un enfoque en la usabilidad y la experiencia del usuario, implementando tecnologías modernas para garantizar un rendimiento óptimo. Se integraron funcionalidades que permitieron una gestión eficiente del contenido por parte del cliente y se optimizó el sitio para posicionamiento en buscadores, asegurando así mayor visibilidad y alcance de la marca.",
  },
  {
    "id": "audifonosdeasa",
    "title": "Desarrollo de Sitio Web para Audífonos De Asa",
    "category": "Connective",
    "sector": "Salud",
    "description": "Creación de un sitio web profesional y funcional para Audífonos De Asa, una empresa del sector médico especializada en soluciones auditivas.",
    "services": [
      "Diseño y desarrollo web",
      "Optimización para dispositivos móviles",
      "Integración de sistemas de contacto y consultas"
    ],
    "website": "audifonosdeasa.com",
    "client": "Audífonos De Asa",
    "challenge": "El principal desafío fue desarrollar una plataforma web que transmitiera confianza y profesionalismo en el sector médico, facilitando la interacción con clientes que buscan soluciones auditivas especializadas. Además, debíamos asegurar que la página fuera accesible, fácil de navegar y adaptada a diversos dispositivos, cumpliendo con las normativas del sector.",
    "solution": "Implementamos un diseño limpio y accesible que refleja la profesionalidad de Audífonos De Asa, optimizamos la experiencia de usuario para garantizar facilidad de navegación desde cualquier dispositivo y desarrollamos funciones específicas para la gestión de consultas y contacto directo con los especialistas, asegurando así una comunicación eficaz y una experiencia satisfactoria para los usuarios.",
  },
  {
    "id": "propertytraders",
    "title": "Property Traders - Plataforma Inmobiliaria Online",
    "category": "Connective",
    "sector": "Inmobiliaria",
    "description": "Desarrollo integral de un sitio web para Property Traders, una empresa del sector inmobiliario que necesitaba una plataforma moderna, intuitiva y eficiente para conectar compradores y vendedores.",
    "services": [
      "Diseño y desarrollo web responsivo",
      "Integración de sistema de búsqueda avanzada de propiedades",
      "Optimización SEO para el sector inmobiliario"
    ],
    "website": "propertytraders.online",
    "client": "Property Traders",
    "challenge": "Property Traders requería una plataforma digital que facilitara la búsqueda y gestión de propiedades en línea. El desafío principal era crear una experiencia de usuario fluida y accesible, que permitiera a los usuarios encontrar fácilmente propiedades relevantes y a la empresa gestionar eficientemente su inventario sin complicaciones técnicas.",
    "solution": "Desarrollamos un sitio web personalizado con un diseño claro y atractivo, optimizado para dispositivos móviles y con una interfaz de búsqueda avanzada que permite filtrar propiedades por múltiples criterios. Además, implementamos un sistema de gestión de contenidos para que los administradores puedan actualizar el inventario fácilmente y aplicamos técnicas de SEO para mejorar la visibilidad en motores de búsqueda, aumentando así el alcance y la captación de clientes potenciales.",
  },
  {
    "id": "cirujano-maxilofacial",
    "title": "Desarrollo Web para Cirujano Maxilofacial",
    "category": "Connective",
    "sector": "Salud",
    "description": "Creación de un sitio web profesional para un especialista en cirugía maxilofacial, orientado a ofrecer información clara y accesible a pacientes potenciales.",
    "services": [
      "Diseño y desarrollo web a medida",
      "Optimización para SEO en sector médico",
      "Integración de formulario de contacto y agenda de citas",
      "Diseño responsivo para dispositivos móviles"
    ],
    "website": "cirujano-maxilofacial.com",
    "client": "cirujano-maxilofacial.com",
    "challenge": "El principal desafío fue desarrollar un sitio web que transmitiera profesionalismo y confianza en un sector altamente especializado como el médico. Además, era fundamental que el contenido fuera accesible y claro para pacientes que buscan información médica especializada, garantizando una navegación sencilla y una correcta presentación de los servicios clínicos ofrecidos.",
    "solution": "Implementamos un diseño moderno y limpio, con estructura intuitiva para facilitar la navegación del usuario. Potenciamos la visibilidad en buscadores mediante técnicas de SEO específicas para el sector médico. Incluimos funcionalidades como formularios de contacto y sistemas de agendamiento para facilitar la comunicación directa entre pacientes y el especialista. Finalmente, garantizamos un diseño responsive que ofrece una experiencia óptima en cualquier dispositivo.",
  },
  {
    "id": "suministroshebe",
    "title": "Desarrollo del sitio web para Suministros Hebe",
    "category": "E-commerce",
    "sector": "Industrial",
    "description": "Proyecto integral de desarrollo web para Suministros Hebe, empresa dedicada al sector industrial, con el objetivo de modernizar su presencia digital y optimizar la experiencia del usuario.",
    "services": [
      "Diseño y desarrollo web responsivo",
      "Integración de catálogo de productos industriales",
      "Optimización SEO para sector industrial",
      "Implementación de sistema de contacto y cotizaciones",
      "Mantenimiento y soporte web"
    ],
    "website": "suministroshebe.com",
    "client": "Suministros Hebe",
    "challenge": "El desafío principal fue construir un sitio web que reflejara la robustez y profesionalismo del sector industrial, al mismo tiempo que resultara fácil de navegar para clientes técnicos y corporativos. Además, se necesitaba integrar un catálogo detallado de productos con especificaciones técnicas, asegurar una carga rápida pese al volumen de información y garantizar que el sitio fuera accesible desde múltiples dispositivos.",
    "solution": "Se diseñó y desarrolló una plataforma web moderna, responsiva y altamente funcional, adaptada a las necesidades específicas de Suministros Hebe. Se implementó un catálogo de productos con filtros avanzados para facilitar la búsqueda, optimización SEO para mejorar la visibilidad en motores de búsqueda, y una interfaz intuitiva para que los clientes pudieran acceder a la información y solicitar cotizaciones fácilmente. Además, se brindó soporte continuo para mantener el sitio actualizado y funcional.",
  },
  {
    "id": "cursosdeinglesbrooklyn",
    "title": "Desarrollo Web para Cursos de Inglés Brooklyn",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Creación de un sitio web integral para una academia de inglés en Brooklyn, optimizado para atraer estudiantes interesados en aprender inglés de manera efectiva y accesible.",
    "services": [
      "Diseño y desarrollo web personalizado",
      "Optimización SEO para el sector educativo",
      "Implementación de sistemas de inscripción y contacto en línea"
    ],
    "website": "cursosdeinglesbrooklyn.com",
    "client": "Cursos de Inglés Brooklyn",
    "challenge": "El principal desafío fue diseñar un sitio web que no solo representara la identidad de la academia Cursos de Inglés Brooklyn, sino que también facilitara el acceso a la información y la inscripción de nuevos estudiantes en un sector altamente competitivo. Además, era crucial que el sitio fuera fácil de usar para personas de todas las edades y niveles tecnológicos.",
    "solution": "Desarrollamos un sitio web moderno y responsivo con una estructura clara y navegación intuitiva. Implementamos formularios de inscripción simples y accesibles, junto con contenido optimizado para SEO que mejora la visibilidad del sitio en buscadores. También incorporamos elementos visuales atractivos y testimonios para generar confianza y motivar a los visitantes a convertirse en estudiantes.",
  },
  {
    "id": "pisosepoxicoslexfor",
    "title": "Sitio Web para Pisos Epóxicos Lexfor",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Desarrollo completo del sitio web para Pisos Epóxicos Lexfor, una empresa dedicada al sector industrial especializada en revestimientos y pisos epóxicos.",
    "services": [
      "Diseño web responsivo",
      "Desarrollo front-end y back-end",
      "Optimización SEO para sector industrial",
      "Integración de catálogo de productos",
      "Soporte y mantenimiento web"
    ],
    "website": "pisosepoxicoslexfor.com",
    "client": "Pisos Epóxicos Lexfor",
    "challenge": "El desafío principal fue crear un sitio web que reflejara la fortaleza y profesionalismo de una empresa del sector industrial dedicada a pisos epóxicos. Se necesitaba una plataforma que fuera visualmente atractiva pero también funcional, capaz de mostrar detalladamente los servicios y productos, y que lograra captar clientes potenciales en un mercado competitivo.",
    "solution": "Desarrollamos un sitio web moderno y responsivo con un diseño que transmite robustez y confianza, adaptado a dispositivos móviles y de escritorio. Implementamos un sistema de catálogo para mostrar los diferentes tipos de pisos epóxicos que ofrecen, junto con descripciones técnicas y galerías de proyectos realizados. También optimizamos el sitio para motores de búsqueda específicos del sector industrial, mejorando la visibilidad online y atrayendo tráfico cualificado. Finalmente, proveímos soporte continuo para asegurar el correcto funcionamiento y actualización del sitio.",
  },
  {
    "id": "traktobuss",
    "title": "Desarrollo del sitio web para Traktobuss",
    "category": "E-commerce",
    "sector": "Industrial",
    "description": "Creación y desarrollo integral del sitio web para Traktobuss, enfocado en el sector industrial, buscando potenciar su presencia online y mejorar la interacción con sus clientes.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para SEO",
      "Integración de sistemas de contacto y soporte",
      "Testing y puesta en marcha"
    ],
    "website": "traktobuss.com",
    "client": "Traktobuss",
    "challenge": "El principal desafío fue desarrollar una plataforma web que reflejara la robustez y profesionalismo del sector industrial, asegurando una experiencia de usuario intuitiva y accesible, además de integrar funcionalidades que faciliten la interacción con clientes industriales y la presentación clara de sus productos y servicios.",
    "solution": "Implementamos un diseño personalizado que transmitiera la fuerza y confiabilidad propia del sector industrial de Traktobuss. Desarrollamos el sitio con tecnologías modernas, optimizando la velocidad y la accesibilidad. Se integraron formularios de contacto y funcionalidades específicas para la interacción con clientes, además de optimizar el sitio para posicionamiento en buscadores, asegurando mayor visibilidad y alcance.",
  },
  {
    "id": "atleticamd",
    "title": "Desarrollo del Sitio Web para AtleticaMD",
    "category": "Connective",
    "sector": "Salud",
    "description": "Desarrollo integral del sitio web para AtleticaMD, una clínica dedicada al sector médico especializado en medicina deportiva y rehabilitación.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo frontend y backend",
      "Optimización para dispositivos móviles",
      "Integración de sistemas de reservas y consultas",
      "SEO básico para mejorar visibilidad",
      "Soporte y mantenimiento post-lanzamiento"
    ],
    "website": "atleticamd.com",
    "client": "AtleticaMD",
    "challenge": "Crear un sitio web funcional y atractivo que transmitiera confianza y profesionalismo en el sector médico, facilitando a los pacientes el acceso a información, servicios y la posibilidad de agendar citas en línea de manera sencilla y segura.",
    "solution": "Desarrollamos un sitio web intuitivo y moderno con un diseño responsive que se adapta a todos los dispositivos. Implementamos un sistema de reservas integrado que permite a los pacientes agendar sus citas fácilmente. Además, optimizamos el contenido para mejorar la visibilidad en buscadores y aseguramos la seguridad y confidencialidad de los datos de los usuarios.",
  },
  {
    "id": "elconejo",
    "title": "Desarrollo del sitio web para ElConejo.com.mx",
    "category": "E-commerce",
    "sector": "Industrial",
    "description": "Diseño y desarrollo integral del sitio web para ElConejo.com.mx, una empresa del sector industrial, enfocándonos en mejorar su presencia digital y funcionalidad.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para SEO",
      "Integración de sistemas de gestión de contenido",
      "Adaptación móvil (responsive design)",
      "Consultoría y mantenimiento web"
    ],
    "website": "elconejo.com.mx",
    "client": "ElConejo.com.mx",
    "challenge": "El principal desafío fue crear un sitio web que reflejara la robustez y eficiencia del sector industrial en el que se posiciona ElConejo.com.mx, asegurando una experiencia de usuario óptima y un diseño atractivo que facilitara la presentación clara de sus productos y servicios técnicos sin perder profesionalismo.",
    "solution": "Desarrollamos un sitio web moderno y funcional que incorpora un diseño sobrio y profesional, optimizado para dispositivos móviles y motores de búsqueda. Implementamos una estructura clara y fácil de navegar, con secciones informativas, catálogos digitales y formularios de contacto eficientes para mejorar la interacción con los clientes y potenciales socios. Además, brindamos soporte técnico continuo para asegurar el correcto funcionamiento del sitio.",
  },
  {
    "id": "kohui",
    "title": "Desarrollo del Sitio Web kohui.com.mx",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Desarrollo integral del sitio web para kohui.com.mx, ofreciendo una plataforma profesional y funcional para el sector de servicios profesionales.",
    "services": [
      "Diseño y desarrollo web personalizado",
      "Optimización para dispositivos móviles",
      "Implementación de SEO básico",
      "Integración de sistemas de contacto y formularios",
      "Asesoría en contenido y estructura web"
    ],
    "website": "kohui.com.mx",
    "client": "Kohui Servicios Profesionales",
    "challenge": "El principal desafío fue crear un sitio web que reflejara la profesionalidad y confianza de Kohui, a la vez que fuera fácil de navegar para sus clientes potenciales. Se requería un diseño moderno, funcional y adaptado a dispositivos móviles para maximizar el alcance y la interacción con los usuarios.",
    "solution": "Desarrollamos un sitio web completamente personalizado, centrado en la experiencia del usuario y optimizado para todos los dispositivos. Implementamos una estructura clara y un diseño atractivo que reflejara la identidad de Kohui. Además, incluimos formularios de contacto funcionales y estrategias básicas de SEO para mejorar la visibilidad en buscadores, garantizando así una plataforma eficiente y profesional para el cliente.",
  },
  {
    "id": "maestrodelmedia",
    "title": "Desarrollo Integral del Sitio Web maestrodelmedia.com",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Creación y desarrollo de un sitio web profesional para maestrodelmedia.com, enfocada en reforzar la presencia digital del cliente en el sector de Servicios Profesionales mediante un diseño moderno y funcionalidad optimizada.",
    "services": [
      "Diseño Web Personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización SEO",
      "Integración de Sistemas de Contacto",
      "Hosting y Mantenimiento Web"
    ],
    "website": "maestrodelmedia.com",
    "client": "maestrodelmedia.com",
    "challenge": "El desafío principal fue crear una plataforma digital profesional que reflejara la calidad y experiencia del cliente en el sector de servicios profesionales, asegurando una navegación amigable, diseño atractivo y adaptabilidad en dispositivos móviles, además de la integración eficiente de herramientas para la captación y gestión de clientes potenciales.",
    "solution": "Desarrollamos un sitio web completamente personalizado desde cero, implementando un diseño responsive y moderno que garantiza una experiencia de usuario excelente en todos los dispositivos. Integramos funcionalidades clave para la comunicación directa con clientes, optimizamos el contenido para motores de búsqueda y establecimos un sistema de mantenimiento continuo para asegurar el rendimiento y la seguridad del sitio.",
  },
  {
    "id": "psepowerbatteries",
    "title": "Desarrollo del sitio web para PSE Power Batteries",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación y desarrollo de un sitio web profesional para PSE Power Batteries, empresa del sector industrial especializada en productos para baterías.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para SEO",
      "Integración de sistemas de contacto y soporte",
      "Consultoría tecnológica"
    ],
    "website": "psepowerbatteries.com",
    "client": "PSE Power Batteries",
    "challenge": "PSE Power Batteries necesitaba una plataforma digital moderna y funcional que reflejara la calidad y profesionalismo de sus productos industriales, capaz de captar nuevos clientes y facilitar la comunicación con sus proveedores y usuarios finales.",
    "solution": "Diseñamos y desarrollamos un sitio web adaptativo y fácil de navegar que presenta de manera clara y atractiva el portafolio de productos de PSE Power Batteries. Incorporamos funcionalidades para agilizar el contacto y soporte, optimizamos el sitio para mejorar su posicionamiento en buscadores y garantizamos una experiencia de usuario eficiente en todos los dispositivos.",
  },
  {
    "id": "caficon.info",
    "title": "Desarrollo del Sitio Web para caficon.info",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Creación y desarrollo integral del sitio web de caficon.info, enfocado en destacar sus servicios profesionales de manera efectiva y atractiva.",
    "services": [
      "Diseño Web Personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización para Motores de Búsqueda (SEO)",
      "Integración de herramientas interactivas",
      "Soporte y Mantenimiento Técnico"
    ],
    "website": "caficon.info",
    "client": "caficon.info",
    "challenge": "La principal dificultad fue construir un sitio web que reflejara profesionalismo, confianza y claridad en la presentación de los servicios ofrecidos, asegurando una experiencia amigable y accesible para los usuarios en un mercado altamente competitivo.",
    "solution": "Desarrollamos un diseño moderno, responsivo y visualmente atractivo que comunica claramente la propuesta de valor de caficon.info. Implementamos funcionalidades interactivas y optimizamos el sitio para lograr velocidad y buen posicionamiento en buscadores, asegurando que los visitantes puedan encontrar fácilmente la información que necesitan y conectar con los servicios profesionales ofrecidos.",
  },
  {
    "id": "distribuidoradepvc",
    "title": "Desarrollo del sitio web para Distribuidora de PVC",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación de un sitio web corporativo para Distribuidora de PVC, empresa del sector industrial dedicada a la distribución de materiales de PVC.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo web responsivo",
      "Optimización SEO básica",
      "Integración de catálogo de productos",
      "Consultoría en experiencia de usuario"
    ],
    "website": "distribuidoradepvc.com.mx",
    "client": "Distribuidora de PVC",
    "challenge": "Distribuidora de PVC requería una presencia digital sólida para llegar a sus clientes industriales y facilitar el acceso a información sobre sus productos, enfrentando el reto de comunicar eficientemente su catálogo técnico y mantener una experiencia de usuario sencilla y profesional.",
    "solution": "Diseñamos y desarrollamos un sitio web moderno, responsivo y optimizado para motores de búsqueda, integrando un catálogo organizado y accesible que facilita la navegación y búsqueda de productos técnicos. Implementamos una arquitectura de información clara para mejorar la usabilidad y potenciamos la imagen corporativa con un diseño acorde al sector industrial.",
  },
  {
    "id": "papierwaren",
    "title": "papierwaren.com.mx",
    "category": "Connective",
    "sector": "Servicios",
    "description": "Desarrollo completo del sitio web papierwaren.com.mx, orientado al sector Active, con enfoque en funcionalidad y experiencia de usuario.",
    "services": [
      "Diseño y desarrollo web",
      "Integración de sistemas de e-commerce",
      "Optimización para dispositivos móviles"
    ],
    "website": "papierwaren.com.mx",
    "client": "papierwaren.com.mx",
    "challenge": "Crear una plataforma web que reflejara la identidad de la marca en el sector Active, ofreciendo una navegación ágil y atractiva, además de integrar funcionalidades para una experiencia de compra óptima y segura.",
    "solution": "Desarrollamos un sitio web moderno y responsivo, con interfaz intuitiva y sistema de comercio electrónico integrado, garantizando una experiencia fluida en todos los dispositivos y maximizando la conversión y satisfacción del usuario.",
  },
  {
    "id": "maestrosdelmedia",
    "title": "Desarrollo Integral del Sitio Web maestrodelmedia.com",
    "category": "Connective",
    "sector": "Servicios",
    "description": "Creación y desarrollo de un sitio web profesional para maestrodelmedia.com, enfocada en reforzar la presencia digital del cliente en el sector de Servicios Profesionales mediante un diseño moderno y funcionalidad optimizada.",
    "services": [
      "Diseño Web Personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización SEO",
      "Integración de Sistemas de Contacto",
      "Hosting y Mantenimiento Web"
    ],
    "website": "maestrosdelmedia.com",
    "client": "MaestrosDelMedia.com",
    "challenge": "El desafío principal fue crear una plataforma digital profesional que reflejara la calidad y experiencia del cliente en el sector de servicios profesionales, asegurando una navegación amigable, diseño atractivo y adaptabilidad en dispositivos móviles, además de la integración eficiente de herramientas para la captación y gestión de clientes potenciales.",
    "solution": "Desarrollamos un sitio web completamente personalizado desde cero, implementando un diseño responsive y moderno que garantiza una experiencia de usuario excelente en todos los dispositivos. Integramos funcionalidades clave para la comunicación directa con clientes, optimizamos el contenido para motores de búsqueda y establecimos un sistema de mantenimiento continuo para asegurar el rendimiento y la seguridad del sitio.",
  },
  {
    "id": "smallbumpers",
    "title": "Desarrollo Web para Small Bumpers",
    "category": "E-commerce",
    "sector": "Servicios",
    "description": "Creación y desarrollo integral del sitio web smallbumpers.mx, una plataforma dedicada a productos Active que ofrece una experiencia óptima y funcional para sus usuarios.",
    "services": [
      "Diseño y desarrollo web a medida",
      "Optimización para dispositivos móviles",
      "Integración de funcionalidades específicas para el sector Active",
      "SEO básico y optimización de velocidad"
    ],
    "website": "smallbumpers.mx",
    "client": "Small Bumpers",
    "challenge": "El desafío principal consistió en desarrollar un sitio web que representara adecuadamente la marca Small Bumpers dentro del sector Active, garantizando una experiencia de usuario fluida, una navegación intuitiva y un diseño atractivo que reflejara la calidad de sus productos. Además, era esencial crear una plataforma que fuera completamente funcional en dispositivos móviles y optimizada para motores de búsqueda.",
    "solution": "Nuestra solución fue desarrollar un sitio web moderno y responsivo que se adaptara perfectamente a diferentes dispositivos, implementando un diseño atractivo y funcional que destacó los productos y valores de Small Bumpers. Incorporamos características específicas para mejorar la interacción del usuario y facilitamos una estructura optimizada para SEO, asegurando una mejor visibilidad en línea. Además, brindamos soporte continuo para mantener y mejorar la plataforma conforme evolucionan las necesidades del cliente.",
  },
  {
    "id": "bhdmx",
    "title": "Desarrollo y Diseño del Sitio Web www.bhdmx.com",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Desarrollo integral del sitio web para BHDMX, una empresa del sector de servicios profesionales, con enfoque en la experiencia de usuario, funcionalidad y adaptabilidad.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo frontend y backend",
      "Optimización para dispositivos móviles",
      "Integración de sistemas y funcionalidades",
      "Consultoría UX/UI"
    ],
    "website": "www.bhdmx.com",
    "client": "BHDMX",
    "challenge": "El desafío principal fue crear un sitio web que reflejara profesionalismo y confianza, a la vez que proporcionara una experiencia intuitiva y accesible para los usuarios en un sector altamente competitivo. Además, era crucial integrar funcionalidades específicas que facilitaran la interacción y comunicación con los clientes.",
    "solution": "Implementamos un diseño moderno y limpio que resaltara la identidad corporativa de BHDMX, combinado con un desarrollo adaptable para todos los dispositivos. Integramos funcionalidades interactivas que mejoran la comunicación con los usuarios y optimizamos la estructura para un rendimiento rápido y eficaz. Nuestro enfoque fue garantizar que el sitio no solo fuera visualmente atractivo sino también altamente funcional y fácil de navegar.",
  },
  {
    "id": "bove",
    "title": "Desarrollo Integral del Sitio Web para Bove.com.mx",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Diseño y desarrollo de un sitio web para Bove, una empresa del sector industrial, enfocándonos en una solución digital eficiente y funcional que refleje la identidad y servicios de la compañía.",
    "services": [
      "Diseño web a medida",
      "Desarrollo front-end y back-end",
      "Optimización para SEO y velocidad",
      "Integración de sistemas de contacto y formularios",
      "Adaptabilidad móvil (responsive design)"
    ],
    "website": "bove.com.mx",
    "client": "Bove.com.mx",
    "challenge": "El principal desafío fue crear un sitio web que no solo reflejara la identidad robusta y técnica de una empresa del sector industrial, sino que también facilitara a los usuarios la navegación y acceso a información compleja de manera clara y amigable. Además, se requería optimizar el sitio para soportar altos volúmenes de tráfico y garantizar un rendimiento estable y rápido en todo momento.",
    "solution": "Desarrollamos una plataforma web personalizada con un diseño limpio y profesional que resalta los valores y servicios de Bove. Implementamos tecnologías modernas para asegurar una carga rápida y una interfaz intuitiva, facilitando el acceso a información técnica y contacto directo con la empresa. También integramos herramientas de optimización SEO para mejorar la visibilidad en buscadores y garantizamos compatibilidad y adaptabilidad en dispositivos móviles, todo esto brindando una experiencia de usuario fluida y eficiente.",
  },
  {
    "id": "core31",
    "title": "Desarrollo del sitio web core31.com.mx para Sector Inmobiliario",
    "category": "Connective",
    "sector": "Inmobiliaria",
    "description": "Creación integral del sitio web para Core31, una empresa del sector inmobiliario, con el objetivo de fortalecer su presencia digital y facilitar la conexión con potenciales clientes.",
    "services": [
      "Diseño web responsivo",
      "Desarrollo front-end y back-end",
      "Optimización SEO",
      "Integración de sistemas de gestión inmobiliaria",
      "Implementación de formularios de contacto y generación de leads"
    ],
    "website": "core31.com.mx",
    "client": "Core31",
    "challenge": "El reto principal fue desarrollar un sitio web que reflejara la modernidad y profesionalismo del sector inmobiliario, asegurando una excelente experiencia de usuario y fácil navegación para distintos tipos de usuarios, desde compradores hasta agentes inmobiliarios. Además, era importante integrar funcionalidades específicas para la gestión de propiedades y generación de leads, garantizando rapidez, seguridad y escalabilidad.",
    "solution": "Diseñamos y desarrollamos un sitio web completo y responsivo que presenta la información de manera clara y atractiva, con una navegación intuitiva adaptada a dispositivos móviles y de escritorio. Implementamos un sistema integrado para la gestión de propiedades, permitiendo actualizaciones rápidas y administración eficiente. Incorporamos estrategias SEO y formularios optimizados para captar clientes potenciales, asegurando un rendimiento óptimo y una experiencia positiva para los usuarios.",
  },
  {
    "id": "concaminenor",
    "title": "Desarrollo del Sitio Web para CONCAMIN",
    "category": "E-commerce",
    "sector": "Servicios Profesionales",
    "description": "Diseño y desarrollo integral del sitio web de CONCAMIN, una organización clave en el sector de Servicios Profesionales, para optimizar su presencia digital y mejorar la experiencia de sus usuarios en línea.",
    "services": [
      "Diseño web responsive",
      "Desarrollo a medida",
      "Optimización UX/UI",
      "Integración de sistemas",
      "Mantenimiento y soporte"
    ],
    "website": "concamin.comenor.org.mx",
    "client": "CONCAMIN",
    "challenge": "El principal desafío fue crear un sitio web que reflejara la relevancia y profesionalismo de CONCAMIN dentro del sector de servicios profesionales, al mismo tiempo que facilitara el acceso a información y servicios para sus usuarios diversos, desde empresarios hasta autoridades. Además, era fundamental asegurar una estructura clara y navegación intuitiva, compatible con dispositivos móviles y con tiempos de carga óptimos.",
    "solution": "Desarrollamos un sitio web moderno y responsivo con un diseño profesional y adaptable a todos los dispositivos. Implementamos una arquitectura clara y un sistema de gestión de contenidos que permite actualizaciones ágiles. Mejoramos la experiencia de usuario con navegación intuitiva, accesibilidad y optimización para buscadores. También incorporamos funcionalidades específicas para atender las necesidades del cliente y se estableció un plan de mantenimiento continuo para asegurar la performance y seguridad del sitio.",
  },
  {
    "id": "cuestiondepolemica",
    "title": "Desarrollo del sitio web cuestiondepolemica.com",
    "category": "Connective",
    "sector": "Noticias",
    "description": "Creación integral del sitio web para Cuestión de Polémica, un portal de noticias dinámico y atractivo.",
    "services": [
      "Diseño web responsivo",
      "Desarrollo front-end y back-end",
      "Integración de gestión de contenidos (CMS)",
      "Optimización para SEO",
      "Implementación de seguridad web",
      "Soporte y mantenimiento"
    ],
    "website": "www.cuestiondepolemica.com",
    "client": "Cuestión de Polémica",
    "challenge": "El principal desafío fue desarrollar una plataforma de noticias que pueda manejar grandes volúmenes de contenido en tiempo real, garantizando a la vez una experiencia de usuario fluida y atractiva. Además, fue vital crear un sistema que permitiera una fácil actualización y gestión de noticias por parte del equipo editorial sin necesidad de conocimientos técnicos avanzados.",
    "solution": "Desarrollamos un sitio web robusto con un CMS personalizado para facilitar la publicación y gestión de contenido. Implementamos un diseño responsivo para acceso óptimo desde cualquier dispositivo y optimizamos la estructura del sitio para mejorar el posicionamiento en buscadores. Se incorporaron medidas de seguridad avanzadas para proteger tanto los datos como la integridad del sitio, y se brindó soporte continuo para asegurar la estabilidad y actualización del sistema.",
  },
  {
    "id": "valor-compartido",
    "title": "Valor Compartido - Portal de Noticias",
    "category": "Connective",
    "sector": "Noticias",
    "description": "Desarrollo integral de un sitio web dinámico y actualizado para Valor Compartido, un portal dedicado a ofrecer noticias relevantes y de interés general.",
    "services": [
      "Diseño y desarrollo web",
      "Integración de sistema de gestión de contenidos (CMS)",
      "Optimización para dispositivos móviles",
      "Implementación de herramientas SEO",
      "Soporte y mantenimiento continuo"
    ],
    "website": "valor-compartido.com",
    "client": "Valor Compartido",
    "challenge": "Crear un sitio web que permita la publicación rápida y eficiente de noticias, garantizando una experiencia de usuario atractiva y accesible desde cualquier dispositivo, además de asegurar una gestión de contenido ágil para el equipo editorial.",
    "solution": "Desarrollamos un sitio web responsivo con un CMS personalizado que facilita la actualización constante de noticias. Implementamos un diseño limpio y moderno que mejora la legibilidad y navegación del usuario. Además, optimizamos el sitio para SEO y dispositivos móviles, asegurando un alcance amplio y una experiencia óptima en todas las plataformas.",
  },
  {
    "id": "niu-coliving",
    "title": "Diseño y Desarrollo Web para NIU Coliving",
    "category": "Connective",
    "sector": "Inmobiliaria",
    "description": "Desarrollo integral de un sitio web para NIU Coliving, una empresa inmobiliaria especializada en espacios compartidos y coliving.",
    "services": [
      "Diseño UX/UI personalizado",
      "Desarrollo web responsivo",
      "Integración de contenido dinámico",
      "Optimización SEO básica",
      "Consultoría tecnológica"
    ],
    "website": "niu-coliving.com",
    "client": "NIU Coliving",
    "challenge": "Crear un sitio web que reflejara la esencia moderna y comunitaria de NIU Coliving, facilitando la navegación y el acceso a información detallada sobre sus espacios inmobiliarios compartidos, al tiempo que se aseguraba una experiencia intuitiva para usuarios variados y un diseño adaptable a dispositivos móviles.",
    "solution": "Diseñamos y desarrollamos un sitio web con una interfaz limpia y amigable, optimizada para móviles y escritorio. Implementamos una estructura clara de contenidos que resalta los beneficios y características de los espacios coliving, con detalles visuales atractivos y navegación sencilla. Además, optimizamos el rendimiento y posicionamiento inicial para asegurar visibilidad y una experiencia de usuario fluida.",
  },
  {
    "id": "jazaguilar",
    "title": "Desarrollo del sitio web jazaguilar.com para el sector industrial",
    "category": "E-commerce",
    "sector": "Industrial",
    "description": "Diseño y desarrollo integral del sitio web para jazaguilar.com, enfocado en el sector industrial, ofreciendo una plataforma funcional y estéticamente profesional que representa los valores y servicios de la empresa.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para experiencia de usuario",
      "Implementación de CMS para gestión de contenido",
      "Optimización SEO básica",
      "Hosting y mantenimiento web"
    ],
    "website": "jazaguilar.com",
    "client": "Jaz Aguilar",
    "challenge": "El principal desafío fue crear un sitio web robusto y profesional que reflejara la identidad y servicios del sector industrial, asegurando facilidad de uso y acceso a la información para distintos tipos de usuarios, además de mantener un diseño moderno y funcional en un mercado altamente competitivo.",
    "solution": "Diseñamos y desarrollamos un sitio web a medida que integró un diseño atractivo y profesional, con una estructura clara y navegación intuitiva. Se implementó un sistema de gestión de contenido para que el cliente pueda actualizar fácilmente la información y se optimizó el sitio para mejorar la experiencia del usuario y posicionamiento en buscadores. También se brindó soporte continuo para hosting y mantenimiento, garantizando la estabilidad y seguridad del sitio.",
  },
  {
    "id": "elisawagnericp",
    "title": "Diseño y Desarrollo del Sitio Web elisawagnericp.com",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Desarrollo completo del sitio web para Elisa Wagner, un negocio en el sector de servicios profesionales, con el objetivo de fortalecer su presencia online y facilitar la conexión con sus clientes potenciales.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para SEO",
      "Integración de sistemas de contacto y reservas",
      "Soporte y mantenimiento web"
    ],
    "website": "elisawagnericp.com",
    "client": "Elisa Wagner",
    "challenge": "Crear un sitio web profesional y atractivo que reflejara la identidad y valores de Elisa Wagner, facilitando la comunicación directa con sus clientes y proporcionando una experiencia de usuario intuitiva, en un sector altamente competitivo donde la confianza y la presentación personal son clave.",
    "solution": "Diseñamos un sitio web moderno y responsivo que combina estética profesional con funcionalidad. Implementamos una estructura clara y accesible que facilita la navegación y pone en valor la experiencia y servicios de Elisa Wagner. Además, integramos sistemas de contacto y reservas eficaces, asegurando una comunicación fluida con sus clientes. Finalmente, garantizamos la optimización SEO para mejorar la visibilidad en motores de búsqueda y proporcionamos soporte continuo para mantener la web actualizada.",
  },
  {
    "id": "arco-techos",
    "title": "Desarrollo del Sitio Web para Arco Techos",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación de una plataforma web robusta y funcional para Arco Techos, empresa del sector industrial, destacando sus servicios y productos industriales con un diseño moderno y una experiencia de usuario optimizada.",
    "services": [
      "Diseño y Desarrollo Web",
      "Optimización para Motores de Búsqueda (SEO)",
      "Integración de Contenidos Multimedia",
      "Desarrollo Responsive",
      "Consultoría y Estrategia Digital"
    ],
    "website": "arco-techos.mx",
    "client": "Arco Techos",
    "challenge": "El principal desafío fue diseñar y desarrollar un sitio web que reflejara la fortaleza y profesionalismo del sector industrial, específicamente para Arco Techos, mostrando sus productos y servicios de manera clara y atractiva. Además, era esencial que el sitio fuera accesible desde cualquier dispositivo y tuviera un rendimiento óptimo para mejorar la experiencia del usuario y posicionar adecuadamente el sitio en buscadores.",
    "solution": "Desarrollamos una plataforma web personalizada con un diseño limpio, moderno y adaptativo que se ajusta a diversos dispositivos móviles y de escritorio. Integramos contenido visual y textual de alta calidad para destacar los productos y capacidades de Arco Techos. Además, implementamos técnicas de SEO para mejorar la visibilidad del sitio en buscadores, y se ofreció una navegación intuitiva para facilitar el acceso a la información por parte de clientes potenciales y socios.",
  },
  {
    "id": "abevolks",
    "title": "Desarrollo Web para AbeVolks",
    "category": "E-commerce",
    "sector": "Industrial",
    "description": "Creación de un sitio web profesional y funcional para AbeVolks, una empresa del sector industrial, con el objetivo de mejorar su presencia digital y facilitar la comunicación con sus clientes.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización para SEO y usabilidad",
      "Integración de sistemas de gestión de contenido",
      "Soporte y mantenimiento"
    ],
    "website": "abevolks.com",
    "client": "AbeVolks",
    "challenge": "El principal desafío fue diseñar y desarrollar un sitio web que reflejara la fortaleza y profesionalismo de AbeVolks en el sector industrial, asegurando una experiencia de usuario intuitiva y accesible a sus clientes potenciales y actuales, además de integrar sistemas que permitan una gestión eficiente del contenido y productos.",
    "solution": "Implementamos un diseño web moderno y robusto adaptado a la identidad corporativa de AbeVolks, con una estructura clara y navegable que facilita el acceso a información clave. Desarrollamos funcionalidades específicas para el sector industrial, asegurando una plataforma segura, escalable y optimizada para SEO, acompañada de una capacitación para el equipo en la gestión del contenido del sitio.",
  },
  {
    "id": "sifsa",
    "title": "Desarrollo Web para SIFSA",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Creación y puesta en marcha del sitio web www.sifsa.mx, diseñado para ofrecer servicios profesionales en línea con una imagen corporativa sólida y funcionalidad óptima.",
    "services": [
      "Diseño web a medida",
      "Desarrollo front-end y back-end",
      "Optimización para dispositivos móviles",
      "Integración de sistemas de contacto y formularios",
      "SEO básico para posicionamiento en buscadores"
    ],
    "website": "www.sifsa.mx",
    "client": "SIFSA",
    "challenge": "El desafío principal fue diseñar y desarrollar un sitio web profesional que reflejara la calidad y confianza de los servicios ofrecidos por SIFSA, asegurando una experiencia de usuario intuitiva y accesible para diversos públicos, además de garantizar un rendimiento óptimo y compatibilidad con múltiples dispositivos.",
    "solution": "Implementamos un diseño moderno y responsivo, optimizado para una navegación fluida en cualquier dispositivo. Desarrollamos funcionalidades específicas para facilitar el contacto con clientes potenciales mediante formularios integrados. También realizamos optimizaciones básicas de SEO para mejorar la visibilidad del sitio en buscadores, asegurando que la presencia digital de SIFSA estuviera alineada con sus objetivos comerciales.",
  },
  {
    "id": "voltagroup",
    "title": "Desarrollo del sitio web para Voltagroup",
    "category": "Connective",
    "sector": "Noticias",
    "description": "Proyecto integral de desarrollo web para Voltagroup, un portal de noticias actualizadas y relevantes en México.",
    "services": [
      "Diseño web responsivo",
      "Desarrollo front-end y back-end",
      "Optimización para motores de búsqueda (SEO)",
      "Integración de CMS para gestión de contenido",
      "Soporte y mantenimiento continuo"
    ],
    "website": "voltagroup.com.mx",
    "client": "Voltagroup",
    "challenge": "Crear una plataforma dinámica y escalable que permitiera la publicación frecuente de noticias en diferentes categorías, garantizando una experiencia de usuario fluida y rápida, tanto en dispositivos móviles como en escritorio. Además, era fundamental que el sitio manejara altos volúmenes de tráfico sin pérdida de rendimiento y que facilitara a los editores la administración de contenido.",
    "solution": "Desarrollamos un sitio web a la medida utilizando tecnologías modernas que aseguran una carga rápida y una navegación intuitiva. Implementamos un sistema de gestión de contenido personalizado para que el equipo editorial pudiera publicar y actualizar noticias de manera sencilla y eficiente. Se optimizó el rendimiento para manejar picos de tráfico y se diseñó una interfaz responsiva que mejora la experiencia en dispositivos móviles. También se aplicaron estrategias SEO para aumentar la visibilidad del portal en buscadores.",
  },
  {
    "id": "grupojaia",
    "title": "Rediseño y Desarrollo Integral del Sitio Web para Grupo Jaia",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Proyecto de desarrollo web para Grupo Jaia, una empresa del sector de servicios profesionales, enfocado en mejorar su presencia digital, usabilidad y comunicación con sus clientes a través de una plataforma moderna y funcional.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo web responsivo",
      "Optimización UX/UI",
      "Integración de contenido dinámico",
      "SEO básico",
      "Soporte y mantenimiento"
    ],
    "website": "grupojaia.com.mx",
    "client": "Grupo Jaia",
    "challenge": "El desafío principal fue transformar el sitio web de Grupo Jaia en una plataforma atractiva y funcional que reflejara la profesionalidad del sector servicios, mejorando la experiencia del usuario y facilitando el acceso a la información sobre sus servicios, todo bajo una estructura adaptable a múltiples dispositivos.",
    "solution": "Implementamos un diseño moderno y responsivo que garantiza una óptima visualización en cualquier dispositivo. Se estructuró la información de manera clara y accesible para facilitar la navegación. Además, integramos funcionalidades para la actualización dinámica de contenido y mejoramos la velocidad de carga. Finalmente, realizamos optimizaciones de SEO básicas para aumentar la visibilidad en motores de búsqueda y proporcionamos soporte continuo para asegurar el correcto funcionamiento del sitio.",
  },
  {
    "id": "turismar",
    "title": "Desarrollo Integral del Sitio Web para Turismar",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación y lanzamiento del sitio web turismar.com.mx, enfocado en el sector industrial para mejorar la presencia digital y funcionalidad de la empresa.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización SEO y rendimiento"
    ],
    "website": "turismar.com.mx",
    "client": "Turismar",
    "challenge": "El desafío principal fue construir una plataforma digital que reflejara de manera precisa la solidez y experiencia de Turismar en el sector industrial. Se necesitaba un sitio web que no solo fuera visualmente atractivo, sino que también ofreciera navegación intuitiva, información clara y estuviera optimizado para atraer y retener a clientes potenciales en un mercado competitivo.",
    "solution": "Nuestra solución consistió en diseñar y desarrollar un sitio web personalizado que incorporó un diseño moderno y profesional, con una estructura de contenido organizada y fácil de navegar. Implementamos tecnologías web actuales para garantizar rapidez y compatibilidad móvil, además de aplicar técnicas SEO para mejorar la visibilidad en buscadores. Así, ofrecimos a Turismar una plataforma digital robusta, funcional y alineada con su identidad corporativa.",
  },
  {
    "id": "hiperprint",
    "title": "Desarrollo del sitio web para Hiperprint.mx",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación y desarrollo integral del sitio web para Hiperprint.mx, una empresa del sector industrial dedicada a la impresión especializada.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo web a medida",
      "Optimización para SEO",
      "Integración de funcionalidades industriales",
      "Mantenimiento y soporte técnico"
    ],
    "website": "hiperprint.mx",
    "client": "Hiperprint.mx",
    "challenge": "El desafío principal fue crear un sitio web que reflejara la fortaleza y especialización de Hiperprint en el sector industrial, con una interfaz intuitiva que facilitara la presentación de sus servicios y productos técnicos sin perder la identidad industrial robusta que caracteriza a la marca.",
    "solution": "Nuestra solución consistió en diseñar y desarrollar un sitio web personalizado que combina un diseño visual impactante con funcionalidades específicas para el sector industrial. Implementamos una navegación clara y estructurada para que los clientes industriales pudieran encontrar fácilmente la información técnica y de contacto. Además, optimizamos el sitio para motores de búsqueda, asegurando mayor visibilidad online, y proporcionamos mantenimiento continuo para garantizar su funcionamiento óptimo.",
  },
  {
    "id": "consultorescaf",
    "title": "Consultores CAF",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Desarrollo completo del sitio web para Consultores CAF, una firma dedicada a brindar servicios profesionales de consultoría empresarial.",
    "services": [
      "Diseño y desarrollo web",
      "Optimización para motores de búsqueda (SEO)",
      "Implementación de sistemas de gestión de contenido"
    ],
    "website": "consultorescaf.mx",
    "client": "Consultores CAF",
    "challenge": "Crear un sitio web profesional y funcional que reflejara la experiencia y confiabilidad de Consultores CAF, al mismo tiempo que facilitara la navegación y acceso a la información para sus clientes potenciales en un sector altamente competitivo.",
    "solution": "Diseñamos y desarrollamos un sitio web personalizado que transmitiera confianza y profesionalismo, con una estructura clara y contenido optimizado para SEO. Además, implementamos un sistema de gestión de contenido que permite a Consultores CAF actualizar fácilmente su información y servicios, garantizando una experiencia de usuario fluida y efectiva.",
  },
  {
    "id": "epidemic",
    "title": "Epidemic.mx - Plataforma de Moda en Línea",
    "category": "E-commerce",
    "sector": "Ropa y Moda",
    "description": "Desarrollo integral de un sitio web para Epidemic.mx, una marca de ropa enfocada en ofrecer moda contemporánea y accesible.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Integración de e-commerce",
      "Optimización para dispositivos móviles",
      "SEO básico y analítica web"
    ],
    "website": "epidemic.mx",
    "client": "Epidemic.mx",
    "challenge": "Crear una plataforma en línea atractiva y funcional que reflejara la identidad de una marca de ropa juvenil y moderna, permitiendo a los usuarios navegar fácilmente y comprar productos con una experiencia amigable y segura.",
    "solution": "Desarrollamos un sitio web con un diseño limpio y atractivo que destaca los productos de forma clara y visual. Implementamos un sistema de comercio electrónico robusto para gestionar inventarios y pagos seguros, junto con una experiencia responsiva para que los usuarios puedan acceder desde cualquier dispositivo. Además, optimizamos la velocidad del sitio y la visibilidad en buscadores para atraer tráfico relevante.",
  },
  {
    "id": "rapidpre",
    "title": "Desarrollo del Sitio Web para RapidPre",
    "category": "Connective",
    "sector": "Industrial",
    "description": "Creación y desarrollo integral del sitio web rapidpre.mx para una empresa del sector industrial, mejorando su presencia digital y facilitando la comunicación con sus clientes.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo front-end y back-end",
      "Optimización SEO",
      "Integración de sistemas de contacto y formularios",
      "Hosting y mantenimiento web"
    ],
    "website": "rapidpre.mx",
    "client": "RapidPre",
    "challenge": "RapidPre necesitaba un sitio web que reflejara la robustez y eficiencia de su empresa en el sector industrial, pero contaba con una presencia digital limitada y un sitio web desactualizado que no representaba adecuadamente sus servicios y productos técnicos.",
    "solution": "Desarrollamos un sitio web moderno y funcional que traduce la esencia industrial de RapidPre a una experiencia digital clara y accesible. Implementamos un diseño responsivo, optimizado para SEO, con integración de formularios de contacto y sistemas amigables para el usuario que facilitan la interacción con los clientes. Además, proporcionamos mantenimiento continuo para garantizar la actualización y el rendimiento del sitio.",
  },
  {
    "id": "toshiba",
    "title": "Desarrollo Web para Toshiba México",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Proyecto integral de desarrollo web para Toshiba México enfocado en el sector de servicios profesionales, con el objetivo de mejorar la presencia digital y la experiencia del usuario.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización SEO",
      "Integración de sistemas de gestión de contenido",
      "Soporte y mantenimiento continuo"
    ],
    "website": "www.toshiba.com.mx",
    "client": "Toshiba México",
    "challenge": "Crear un sitio web moderno, funcional y fácil de navegar que reflejara la calidad y profesionalismo de Toshiba en el sector de servicios profesionales, mejorando la experiencia del usuario y facilitando el acceso a información clave y servicios.",
    "solution": "Implementamos un diseño web a medida con tecnología de vanguardia, optimizando la estructura para mejorar la usabilidad y el posicionamiento en buscadores, integrando herramientas para una administración eficiente del contenido y garantizando la performance y seguridad del sitio para ofrecer una experiencia óptima a los usuarios.",
  },
  {
    "id": "meigas.es",
    "title": "Desarrollo Integral del Sitio Web de Meigas",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Proyecto de desarrollo web completo para Meigas, una empresa del sector de Servicios Profesionales, implementando una plataforma moderna y eficiente que refleja su identidad corporativa y facilita la interacción con sus clientes.",
    "services": [
      "Diseño web personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización para motores de búsqueda (SEO)",
      "Integración de sistemas de contacto",
      "Testing y aseguramiento de calidad",
      "Implementación de hosting y mantenimiento"
    ],
    "website": "www.meigas.es",
    "client": "Meigas",
    "challenge": "Meigas necesitaba un sitio web que no solo representara fielmente su imagen corporativa, sino que también ofreciera una experiencia de usuario fluida y accesible para destacar en un sector competitivo como el de Servicios Profesionales. Además, el reto incluía integrar funcionalidades específicas que facilitaran la comunicación directa con sus clientes y el posicionamiento digital para aumentar su visibilidad.",
    "solution": "Realizamos un desarrollo web integral que abarcó desde el diseño personalizado adaptado a la identidad visual de Meigas hasta la implementación de funcionalidades avanzadas para mejorar la experiencia del usuario y la interacción con el sitio. Se optimizó el contenido para SEO, se integraron sistemas eficientes de contacto y se garantizó un sitio web responsivo y rápido. Finalmente, proporcionamos soporte continuo para el mantenimiento y mejora del sitio.",
  },
  {
    "id": "lifeinsuranceexpert.ca",
    "title": "Desarrollo Integral del Sitio Web LifeInsuranceExpert.ca",
    "category": "Connective",
    "sector": "Servicios Profesionales",
    "description": "Proyecto de desarrollo web para LifeInsuranceExpert.ca, una referencia en servicios profesionales de seguros de vida, orientado a mejorar la presencia digital y optimizar la experiencia del usuario.",
    "services": [
      "Diseño y desarrollo web personalizado",
      "Optimización para motores de búsqueda (SEO)",
      "Integración de herramientas interactivas y formularios de contacto"
    ],
    "website": "lifeinsuranceexpert.ca",
    "client": "LifeInsuranceExpert.ca",
    "challenge": "El principal desafío fue crear un sitio web que transmitiera confianza y profesionalismo en un sector tan sensible como el de seguros de vida. Era fundamental ofrecer una navegación clara que facilitara a los usuarios encontrar información valiosa y asesoría con rapidez, al mismo tiempo que se aseguraba una experiencia intuitiva y accesible desde múltiples dispositivos.",
    "solution": "Desarrollamos una plataforma web moderna y responsiva que combina un diseño elegante con una estructura clara y funcional. Incorporamos elementos visuales que refuerzan la confianza y botones de llamada a la acción fáciles de usar para mejorar la interacción con los usuarios. Además, implementamos un sistema de optimización SEO para aumentar la visibilidad del sitio en buscadores, y configuramos formularios personalizados para captar prospectos de manera efectiva, garantizando así una experiencia completa y satisfactoria para el cliente.",
  },
  {
    "id": "everydaygroup.ca",
    "title": "Desarrollo del Sitio Web para Everyday Group",
    "category": "Connective",
    "sector": "Actividades Recreativas",
    "description": "Creación integral del sitio web everydaygroup.ca, enfocado en actividades recreativas, para mejorar la presencia digital y la interacción con sus usuarios.",
    "services": [
      "Diseño Web Personalizado",
      "Desarrollo Frontend y Backend",
      "Optimización para Dispositivos Móviles",
      "Integración de Herramientas Interactivas",
      "SEO Básico para Mejorar Visibilidad"
    ],
    "website": "everydaygroup.ca",
    "client": "Everyday Group",
    "challenge": "Desarrollar un sitio web atractivo, funcional y accesible que reflejara la naturaleza dinámica y recreativa de Everyday Group, facilitando a los usuarios la exploración de actividades y la interacción con la marca en un entorno digital intuitivo y seguro.",
    "solution": "Diseñamos y desarrollamos un sitio completamente personalizado que combina un diseño moderno y amigable con funcionalidades específicas para el sector recreativo. Implementamos una estructura clara y navegable, optimizamos el sitio para dispositivos móviles y garantizamos tiempos de carga rápidos, asegurando así una óptima experiencia del usuario y mayor engagement.",
  },
  {
    "id": "cucubecerra",
    "title": "Desarrollo del Sitio Web cucubecerra.com",
    "category": "E-commerce",
    "sector": "Ropa y Moda",
    "description": "Creación y diseño integral de la tienda en línea para una marca de ropa, enfocada en mejorar la experiencia del usuario y potenciar las ventas digitales.",
    "services": [
      "Diseño UX/UI",
      "Desarrollo Web a Medida",
      "Optimización para Móviles",
      "Integración de E-commerce",
      "SEO Básico",
      "Mantenimiento y Soporte Técnico"
    ],
    "website": "cucubecerra.com",
    "client": "Cucubecerra",
    "challenge": "El desafío principal fue desarrollar un sitio web atractivo y funcional para la marca de ropa cucubecerra.com que reflejara la esencia de la marca, facilitara la navegación y ofreciera una experiencia de compra sencilla y segura para los usuarios, asegurando también una buena performance en distintos dispositivos.",
    "solution": "Nuestra solución fue crear un diseño personalizado que representara la identidad visual de la marca, implementamos un sistema de comercio electrónico intuitivo y seguro, optimizamos la plataforma para dispositivos móviles y aplicamos técnicas de SEO básico para mejorar la visibilidad en buscadores. Además, brindamos mantenimiento continuo para asegurar el correcto funcionamiento del sitio.",
  }
].map(item => {
  if (!item.image) {
    const screenshotDir = getScreenshotDir(item.website);
    const screenshotFile = screenshotDir ? screenshotFiles[screenshotDir] : null;
    if (screenshotDir && screenshotFile) {
      item.image = {
        id: `screenshot-${item.id}`,
        description: item.title,
        imageUrl: `/images/screenshots/${screenshotDir}/${screenshotFile}`,
        imageHint: item.title,
      };
    } else {
      const nextImage = getNextImage();
      if (nextImage) {
        item.image = nextImage;
      }
    }
  }
  return item;
});

export const portfolioCategories = Array.from(new Set(portfolioItems.map(item => item.category)));
export const portfolioSectors = Array.from(new Set(portfolioItems.map(item => item.sector)));

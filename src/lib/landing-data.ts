import type { Metadata } from "next";

/**
 * Contenido de las landings de servicio (dirigido por datos).
 *
 * ⚠️ TODO PRECIOS: los valores `price` están como placeholder ("$ —").
 * Reemplázalos con los precios reales antes de publicar. El flag
 * `pricesArePlaceholder: true` en cada bloque `packages` es un recordatorio
 * deliberado; cámbialo a `false` cuando ya tengan precio real.
 *
 * Este archivo es TS plano (sin JSX ni "use client") para poder importarse
 * desde server components y construir metadata.
 */

export type LandingMetadata = {
  title: string; // sin sufijo; el root layout aplica el template "%s | MAW Soluciones"
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
};

export type Cta = { label: string; href: string };

export type LandingHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  media?: { type: "video" | "image"; src: string; poster?: string };
};

export type FeatureCard = { icon: string; title: string; description: string };

export type Stat = { value: string; label: string };

export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: string; // PLACEHOLDER "$ —"
  priceNote?: string;
  highlight?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
};

export type ProcessStep = { step: number; title: string; description: string };

export type Faq = { question: string; answer: string };

export type LeadFormConfig = {
  heading: string;
  subheading?: string;
  source: string; // etiqueta para prospects_maw.source
  defaultInterest: string; // prellena el campo "servicio de interés"
};

export type ServiceLanding = {
  slug: string;
  metadata?: LandingMetadata;
  hero?: LandingHero;
  features?: { heading: string; subheading?: string; cards: FeatureCard[] };
  stats?: { heading?: string; items: Stat[] };
  packages?: {
    heading: string;
    subheading?: string;
    pricesArePlaceholder: boolean;
    note?: string;
    tiers: Package[];
  };
  process?: { heading: string; subheading?: string; steps: ProcessStep[] };
  faq?: { heading: string; items: Faq[] };
  leadForm: LeadFormConfig;
};

const WA = "https://wa.me/5633774723";
const PRICE = "$ —"; // TODO PRECIOS

export const landings: Record<string, ServiceLanding> = {
  // ─────────────────────────────────────────────────────────────────────────
  "desarrollo-web": {
    slug: "desarrollo-web",
    metadata: {
      title: "Diseño y Desarrollo Web Profesional en México",
      description:
        "Creamos sitios web profesionales, rápidos y optimizados para SEO. Desarrollo web en México para empresas, pymes y emprendedores. Next.js, React y más.",
      keywords: [
        "desarrollo web México",
        "diseño web profesional México",
        "crear sitio web empresa México",
        "agencia web México",
        "desarrollo web Next.js México",
        "páginas web para empresas",
      ],
      canonicalPath: "/servicios/desarrollo-web",
      ogTitle: "Desarrollo Web Profesional México | MAW Soluciones",
      ogDescription:
        "Sitios web modernos, rápidos y con alto rendimiento SEO para posicionar tu empresa en Google México. Tecnología de vanguardia.",
    },
    hero: {
      eyebrow: "Desarrollo Web",
      title: "Tu sitio web no es un gasto, es tu mejor vendedor",
      subtitle:
        "Diseñamos y desarrollamos sitios rápidos, optimizados para SEO y pensados para convertir visitantes en clientes. La base de todo tu ecosistema digital.",
      primaryCta: { label: "Cotizar mi sitio", href: "#cotizar" },
      secondaryCta: { label: "Hablar por WhatsApp", href: WA },
    },
    features: {
      heading: "Lo que construimos para ti",
      subheading: "Sitios que cargan rápido, posicionan en Google y venden.",
      cards: [
        { icon: "Rocket", title: "Landing Pages de conversión", description: "Páginas enfocadas en una sola acción: que el visitante te contacte o compre." },
        { icon: "Globe", title: "Sitios empresariales", description: "Presencia profesional, multipágina, lista para escalar con tu negocio." },
        { icon: "ShoppingCart", title: "E-commerce", description: "Tiendas en línea con pasarela de pago, catálogo y gestión de pedidos." },
        { icon: "Gauge", title: "Velocidad y rendimiento", description: "Optimización de carga y Core Web Vitals para no perder clientes ni ranking." },
        { icon: "Search", title: "SEO On-Page", description: "Estructura técnica y contenido optimizado para que Google te encuentre." },
        { icon: "Smartphone", title: "100% responsive", description: "Se ve y funciona perfecto en celular, tablet y escritorio." },
      ],
    },
    stats: {
      heading: "Resultados que respaldan el trabajo",
      items: [
        { value: "+90", label: "Proyectos entregados" },
        { value: "<2s", label: "Tiempo de carga objetivo" },
        { value: "100%", label: "Diseño responsive" },
        { value: "24/7", label: "Tu sitio vendiendo" },
      ],
    },
    packages: {
      heading: "Planes de desarrollo web",
      subheading: "Elige el nivel que se ajusta a tu operación. Transparencia total.",
      pricesArePlaceholder: true,
      note: "Todos los planes incluyen dominio y hosting el primer año, certificado SSL y capacitación de uso.",
      tiers: [
        {
          id: "landing",
          name: "Landing Page",
          tagline: "Presencia esencial",
          price: PRICE,
          priceNote: "/ proyecto",
          features: ["1 página de alta conversión", "Diseño responsive", "Dominio + hosting (1er año)", "SEO On-Page básico", "Formulario de contacto", "Google My Business"],
          ctaLabel: "Cotizar Landing",
        },
        {
          id: "empresarial",
          name: "Sitio Empresarial",
          tagline: "Crecimiento y autoridad",
          price: PRICE,
          priceNote: "/ proyecto",
          highlight: true,
          features: ["Hasta 6 páginas", "SEO On-Page completo", "Google Analytics 4 + Search Console", "10 correos corporativos", "Respaldos automáticos", "Mantenimiento anual incluido"],
          ctaLabel: "Cotizar Sitio",
        },
        {
          id: "ecommerce",
          name: "E-Commerce",
          tagline: "Tienda en línea completa",
          price: PRICE,
          priceNote: "/ proyecto",
          features: ["Tienda WooCommerce o a la medida", "Pasarelas: Mercado Pago y PayPal", "Alta de los primeros 20 productos", "SEO avanzado e-commerce", "Respaldos automáticos", "Mantenimiento anual incluido"],
          ctaLabel: "Cotizar Tienda",
        },
      ],
    },
    process: {
      heading: "Cómo trabajamos tu proyecto",
      steps: [
        { step: 1, title: "Descubrimiento", description: "Entendemos tu negocio, objetivos y a quién le vendes." },
        { step: 2, title: "Diseño", description: "Definimos estructura, identidad y experiencia de usuario." },
        { step: 3, title: "Desarrollo", description: "Programamos un sitio rápido, seguro y optimizado para SEO." },
        { step: 4, title: "Lanzamiento", description: "Publicamos, medimos y te capacitamos para que tomes el control." },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { question: "¿Cuánto tarda el desarrollo?", answer: "Una landing puede estar lista en 1-2 semanas; un sitio empresarial o e-commerce entre 3 y 6 semanas, según el alcance." },
        { question: "¿El sitio incluye dominio y hosting?", answer: "Sí, todos los planes incluyen dominio y hosting el primer año, además del certificado SSL." },
        { question: "¿Podré actualizar el contenido yo mismo?", answer: "Sí. Te entregamos capacitación para que puedas editar textos e imágenes sin depender de nosotros." },
        { question: "¿Optimizan para Google?", answer: "Sí, todo sitio incluye SEO On-Page. En planes superiores agregamos Analytics, Search Console y SEO avanzado." },
      ],
    },
    leadForm: {
      heading: "Cuéntanos sobre tu proyecto",
      subheading: "Déjanos tus datos y te enviamos una propuesta a tu medida.",
      source: "Landing Desarrollo Web",
      defaultInterest: "Desarrollo Web",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  automatizacion: {
    slug: "automatizacion",
    metadata: {
      title: "Automatización de Marketing y Procesos Empresariales en México",
      description:
        "Automatiza tus ventas, seguimiento de clientes y procesos de negocio con MAW Soluciones. Chatbots, CRM automatizado, cobranza recurrente y más para empresas en México.",
      keywords: [
        "automatización marketing México",
        "chatbot para empresas",
        "CRM automatizado México",
        "automatización ventas",
        "n8n México",
        "procesos automatizados empresa",
      ],
      canonicalPath: "/servicios/automatizacion",
      ogTitle: "Automatización de Marketing y Procesos | MAW Soluciones México",
      ogDescription:
        "Ahorra tiempo y escala tu negocio con automatización inteligente. Chatbots, flujos de ventas y CRM automatizado para empresas mexicanas.",
    },
    hero: {
      eyebrow: "Automatización",
      title: "Deja que los procesos repetitivos trabajen solos",
      subtitle:
        "Implementamos chatbots, flujos de venta, seguimiento de clientes y cobranza automática que trabajan 24/7 para que tú te enfoques en crecer.",
      primaryCta: { label: "Automatizar mi negocio", href: "#cotizar" },
      secondaryCta: { label: "Hablar por WhatsApp", href: WA },
    },
    features: {
      heading: "Lo que automatizamos",
      subheading: "Sistemas inteligentes que nutren leads y liberan tu tiempo.",
      cards: [
        { icon: "Bot", title: "Chatbots con IA", description: "Atienden, califican y agendan clientes en WhatsApp y tu sitio, todo el día." },
        { icon: "Workflow", title: "Flujos de venta", description: "Seguimiento automático de prospectos para que ningún lead se enfríe." },
        { icon: "Calendar", title: "Agendamiento automático", description: "Tus clientes reservan citas solos, sincronizado con tu calendario." },
        { icon: "CreditCard", title: "Cobranza recurrente", description: "Recordatorios y cobros automáticos para reducir la cartera vencida." },
        { icon: "TrendingUp", title: "Análisis de tendencias", description: "Reportes automáticos que te dicen qué funciona y qué optimizar." },
        { icon: "Repeat", title: "Integraciones", description: "Conectamos tus herramientas (CRM, hojas, correo, WhatsApp) en un solo flujo." },
      ],
    },
    stats: {
      heading: "El impacto de automatizar",
      items: [
        { value: "24/7", label: "Atención sin descanso" },
        { value: "-70%", label: "Tareas manuales" },
        { value: "x3", label: "Velocidad de respuesta" },
        { value: "0", label: "Leads sin seguimiento" },
      ],
    },
    packages: {
      heading: "Planes de automatización",
      subheading: "Desde un chatbot hasta un ecosistema completo de procesos.",
      pricesArePlaceholder: true,
      note: "Incluye levantamiento de procesos, implementación y capacitación del equipo.",
      tiers: [
        {
          id: "inicial",
          name: "Inicial",
          tagline: "Da el primer paso",
          price: PRICE,
          priceNote: "/ mes",
          features: ["Chatbot en WhatsApp", "Respuestas automáticas", "Captura de leads", "1 integración", "Reporte mensual"],
          ctaLabel: "Empezar",
        },
        {
          id: "crecimiento",
          name: "Crecimiento",
          tagline: "Escala tus ventas",
          price: PRICE,
          priceNote: "/ mes",
          highlight: true,
          features: ["Todo lo del plan Inicial", "Flujos de seguimiento de ventas", "Agendamiento automático", "Hasta 3 integraciones", "Dashboard de métricas"],
          ctaLabel: "Crecer ahora",
        },
        {
          id: "integral",
          name: "Integral",
          tagline: "Automatiza todo el negocio",
          price: PRICE,
          priceNote: "/ mes",
          features: ["Todo lo del plan Crecimiento", "Cobranza recurrente automática", "CRM automatizado", "Integraciones ilimitadas", "Soporte prioritario"],
          ctaLabel: "Cotizar Integral",
        },
      ],
    },
    process: {
      heading: "Nuestro proceso",
      steps: [
        { step: 1, title: "Diagnóstico", description: "Mapeamos tus procesos actuales y detectamos qué quita más tiempo." },
        { step: 2, title: "Diseño del flujo", description: "Definimos la automatización ideal y las herramientas a conectar." },
        { step: 3, title: "Implementación", description: "Construimos y probamos los flujos sin interrumpir tu operación." },
        { step: 4, title: "Optimización", description: "Medimos resultados y ajustamos para exprimir cada automatización." },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { question: "¿Necesito conocimientos técnicos?", answer: "No. Nosotros implementamos todo y te capacitamos para usarlo en lenguaje sencillo." },
        { question: "¿Funciona con WhatsApp?", answer: "Sí. La mayoría de nuestros chatbots y flujos operan directamente sobre WhatsApp Business." },
        { question: "¿Se integra con mis herramientas actuales?", answer: "Sí, conectamos CRM, hojas de cálculo, correo, calendarios y más según tu stack." },
        { question: "¿Cuánto tarda en implementarse?", answer: "Un chatbot básico en días; un ecosistema completo de procesos entre 2 y 4 semanas." },
      ],
    },
    leadForm: {
      heading: "Automaticemos tu negocio",
      subheading: "Cuéntanos qué proceso te quita más tiempo y te proponemos la solución.",
      source: "Landing Automatización",
      defaultInterest: "Automatización",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "creacion-de-contenido": {
    slug: "creacion-de-contenido",
    metadata: {
      title: "Creación de Contenido Digital para Marcas en México",
      description:
        "Producción de contenido de alto impacto: videos, fotos, reels, posts y estrategia de contenidos para redes sociales y web. Agencia de contenido digital líder en México.",
      keywords: [
        "creación de contenido México",
        "producción de contenido digital",
        "agencia de contenido México",
        "estrategia de contenidos",
        "videos para redes sociales",
        "content marketing México",
      ],
      canonicalPath: "/servicios/creacion-de-contenido",
      ogTitle: "Creación de Contenido Digital México | MAW Soluciones",
      ogDescription:
        "Contenido que conecta con tu audiencia y convierte seguidores en clientes. Videos, fotos y estrategia de contenidos para empresas en México.",
    },
    hero: {
      eyebrow: "Creación de Contenido",
      title: "Contenido que conecta y convierte seguidores en clientes",
      subtitle:
        "Planeamos, grabamos y editamos contenido atractivo para tus redes: reels, videos, fotos y carruseles con estrategia detrás de cada publicación.",
      primaryCta: { label: "Quiero contenido", href: "#cotizar" },
      secondaryCta: { label: "Hablar por WhatsApp", href: WA },
    },
    features: {
      heading: "Lo que producimos",
      subheading: "Contenido con estrategia, no solo bonito.",
      cards: [
        { icon: "Video", title: "Reels y videos cortos", description: "Formato rey de las redes: dinámicos, con gancho y pensados para viralizar." },
        { icon: "Camera", title: "Fotografía de producto y marca", description: "Imágenes profesionales que elevan la percepción de tu negocio." },
        { icon: "PenTool", title: "Diseño de posts y carruseles", description: "Piezas gráficas con tu identidad y copy que detiene el scroll." },
        { icon: "Megaphone", title: "Estrategia de contenidos", description: "Calendario editorial alineado a tus objetivos de marca y venta." },
        { icon: "Mic", title: "Guion y copywriting", description: "Mensajes persuasivos que comunican valor y mueven a la acción." },
        { icon: "BarChart3", title: "Medición y mejora", description: "Analizamos qué contenido funciona para producir más de lo que vende." },
      ],
    },
    stats: {
      heading: "Por qué el contenido importa",
      items: [
        { value: "+20", label: "Piezas mensuales" },
        { value: "x5", label: "Más alcance orgánico" },
        { value: "4K", label: "Calidad de producción" },
        { value: "100%", label: "Hecho a tu marca" },
      ],
    },
    packages: {
      heading: "Planes de contenido",
      subheading: "Producción constante para mantener tu marca viva y creciendo.",
      pricesArePlaceholder: true,
      note: "Incluye estrategia, producción, edición y publicación. Grabación en nuestro estudio en planes superiores.",
      tiers: [
        {
          id: "esencial",
          name: "Esencial",
          tagline: "Presencia constante",
          price: PRICE,
          priceNote: "/ mes",
          features: ["12 publicaciones al mes", "8 videos + 4 posts", "1 sesión de grabación", "Estrategia básica", "Reporte mensual"],
          ctaLabel: "Empezar",
        },
        {
          id: "pro",
          name: "Pro",
          tagline: "Acelera tu crecimiento",
          price: PRICE,
          priceNote: "/ mes",
          highlight: true,
          features: ["16 publicaciones al mes", "12 videos + 4 posts", "2 sesiones en estudio", "Estrategia de contenidos", "Reels optimizados para alcance"],
          ctaLabel: "Crecer ahora",
        },
        {
          id: "premium",
          name: "Premium",
          tagline: "Marca de alto impacto",
          price: PRICE,
          priceNote: "/ mes",
          features: ["20 publicaciones al mes", "12 videos + 8 posts", "2 sesiones en estudio", "Estrategia + guion completo", "Video podcast mensual"],
          ctaLabel: "Cotizar Premium",
        },
      ],
    },
    process: {
      heading: "Cómo creamos tu contenido",
      steps: [
        { step: 1, title: "Estrategia", description: "Definimos mensajes, formatos y calendario según tus objetivos." },
        { step: 2, title: "Producción", description: "Grabamos y fotografiamos con equipo profesional en nuestro estudio." },
        { step: 3, title: "Edición", description: "Editamos, diseñamos y optimizamos cada pieza para su plataforma." },
        { step: 4, title: "Publicación y análisis", description: "Publicamos, medimos resultados y ajustamos la estrategia." },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { question: "¿Yo tengo que aparecer en cámara?", answer: "No es obligatorio. Trabajamos con producto, marca, animaciones o vocería según prefieras." },
        { question: "¿Dónde se graba?", answer: "En nuestro estudio profesional en CDMX o, según el plan, en tu locación." },
        { question: "¿En qué redes publican?", answer: "Instagram, Facebook, TikTok y YouTube. Adaptamos cada pieza al formato de cada red." },
        { question: "¿Incluye la estrategia o solo la producción?", answer: "Ambas. Cada plan incluye estrategia de contenidos además de la producción y publicación." },
      ],
    },
    leadForm: {
      heading: "Creemos tu contenido",
      subheading: "Cuéntanos sobre tu marca y armamos un plan de contenido para ti.",
      source: "Landing Contenido",
      defaultInterest: "Creación de Contenido",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "desarrollo-a-la-medida": {
    slug: "desarrollo-a-la-medida",
    metadata: {
      title: "Desarrollo de Software a la Medida en México",
      description:
        "Desarrollamos software, sistemas y plataformas digitales 100% a la medida para tu empresa en México. Soluciones escalables, seguras y adaptadas a tus necesidades.",
      keywords: [
        "desarrollo software a la medida México",
        "desarrollo sistemas empresariales",
        "software personalizado México",
        "plataforma digital a medida",
        "desarrollo web a la medida",
      ],
      canonicalPath: "/servicios/desarrollo-a-la-medida",
      ogTitle: "Desarrollo de Software a la Medida México | MAW Soluciones",
      ogDescription:
        "Tu visión, nuestra tecnología. Sistemas y plataformas digitales construidos específicamente para los procesos y objetivos de tu empresa en México.",
    },
    hero: {
      eyebrow: "Software a la Medida",
      title: "Cuando lo genérico no alcanza, lo construimos a tu medida",
      subtitle:
        "Desarrollamos sistemas, plataformas y apps diseñadas exactamente para los procesos de tu empresa. Escalables, seguras y 100% tuyas.",
      primaryCta: { label: "Cotizar mi sistema", href: "#cotizar" },
      secondaryCta: { label: "Hablar por WhatsApp", href: WA },
    },
    features: {
      heading: "Lo que desarrollamos",
      subheading: "Tecnología hecha a la medida de tu operación.",
      cards: [
        { icon: "Code2", title: "Sistemas internos", description: "Plataformas para administrar tu operación, inventario, ventas o logística." },
        { icon: "Smartphone", title: "Apps móviles y web", description: "Aplicaciones iOS, Android y PWA con experiencia de usuario profesional." },
        { icon: "Database", title: "Integraciones y APIs", description: "Conectamos tus sistemas con servicios externos y bases de datos." },
        { icon: "LayoutDashboard", title: "Dashboards y reportes", description: "Paneles de control con la información clave de tu negocio en tiempo real." },
        { icon: "ShieldCheck", title: "Seguridad y escalabilidad", description: "Arquitectura robusta que crece contigo sin perder rendimiento." },
        { icon: "Headphones", title: "Soporte y mantenimiento", description: "Acompañamiento post-entrega para que todo siga funcionando." },
      ],
    },
    stats: {
      heading: "Construido para durar",
      items: [
        { value: "100%", label: "A tu medida" },
        { value: "∞", label: "Escalabilidad" },
        { value: "iOS / Android", label: "Multiplataforma" },
        { value: "24/7", label: "Soporte disponible" },
      ],
    },
    packages: {
      heading: "Modelos de proyecto",
      subheading: "Desde un MVP hasta una plataforma completa a la medida.",
      pricesArePlaceholder: true,
      note: "Cada proyecto a la medida se cotiza según alcance. Estos rangos son orientativos.",
      tiers: [
        {
          id: "mvp",
          name: "MVP",
          tagline: "Valida tu idea",
          price: PRICE,
          priceNote: "/ proyecto",
          features: ["Producto mínimo viable", "1 plataforma (web o móvil)", "Funcionalidades core", "Diseño UX/UI", "Despliegue inicial"],
          ctaLabel: "Cotizar MVP",
        },
        {
          id: "plataforma",
          name: "Plataforma",
          tagline: "Tu sistema completo",
          price: PRICE,
          priceNote: "/ proyecto",
          highlight: true,
          features: ["App web + móvil", "Panel de administración", "Integraciones y APIs", "Base de datos a la medida", "Soporte 3 meses incluido"],
          ctaLabel: "Cotizar Plataforma",
        },
        {
          id: "enterprise",
          name: "Enterprise",
          tagline: "Operación a gran escala",
          price: PRICE,
          priceNote: "/ proyecto",
          features: ["Arquitectura escalable", "Múltiples módulos", "Integraciones avanzadas", "SLA y soporte prioritario", "Roadmap de evolución"],
          ctaLabel: "Agendar reunión",
        },
      ],
    },
    process: {
      heading: "Cómo construimos tu software",
      steps: [
        { step: 1, title: "Levantamiento", description: "Entendemos a fondo tus procesos, necesidades y objetivos." },
        { step: 2, title: "Arquitectura y diseño", description: "Definimos la solución técnica y el diseño de la experiencia." },
        { step: 3, title: "Desarrollo iterativo", description: "Construimos por etapas con entregas y validaciones contigo." },
        { step: 4, title: "Despliegue y soporte", description: "Lanzamos, capacitamos y damos mantenimiento continuo." },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { question: "¿El software queda 100% mío?", answer: "Sí. Desarrollamos a la medida y el código y la propiedad son tuyos." },
        { question: "¿Cómo se cotiza un proyecto a la medida?", answer: "Tras un levantamiento de requerimientos te entregamos una propuesta con alcance, tiempos e inversión." },
        { question: "¿Hacen apps para iOS y Android?", answer: "Sí, desarrollamos apps nativas y multiplataforma, además de aplicaciones web progresivas (PWA)." },
        { question: "¿Dan mantenimiento después de entregar?", answer: "Sí, ofrecemos planes de soporte y evolución para que tu sistema siga creciendo." },
      ],
    },
    leadForm: {
      heading: "Construyamos tu solución",
      subheading: "Cuéntanos qué necesitas resolver y te proponemos cómo construirlo.",
      source: "Landing Desarrollo a la Medida",
      defaultInterest: "Desarrollo a la Medida",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  apps: {
    slug: "apps",
    metadata: {
      title: "Desarrollo de Aplicaciones Móviles y Web en México",
      description:
        "Desarrollamos apps móviles iOS y Android y aplicaciones web a medida para empresas en México. UX profesional, rendimiento óptimo y tecnología moderna.",
      keywords: [
        "desarrollo de apps México",
        "aplicaciones móviles México",
        "app iOS Android México",
        "desarrollo app empresas México",
        "app a medida México",
        "aplicaciones web progresivas",
      ],
      canonicalPath: "/servicios/apps",
      ogTitle: "Desarrollo de Apps Móviles y Web México | MAW Soluciones",
      ogDescription:
        "Transforma tu idea en una app profesional. Desarrollo de aplicaciones móviles y web para empresas en México con experiencia de usuario excepcional.",
    },
    hero: {
      eyebrow: "Desarrollo de Apps",
      title: "Tu idea, convertida en una app que la gente quiere usar",
      subtitle:
        "Diseñamos y desarrollamos aplicaciones móviles y web robustas para Android, iOS y sistemas internos a la medida, con experiencia de usuario impecable.",
      primaryCta: { label: "Comenzar mi app", href: "#cotizar" },
      secondaryCta: { label: "Hablar por WhatsApp", href: WA },
    },
    features: {
      heading: "Lo que desarrollamos",
      subheading: "Apps que combinan diseño, rendimiento y resultados.",
      cards: [
        { icon: "Smartphone", title: "Apps móviles iOS y Android", description: "Aplicaciones nativas y multiplataforma listas para las tiendas." },
        { icon: "Globe", title: "Aplicaciones web (PWA)", description: "Apps que corren en el navegador, rápidas e instalables." },
        { icon: "LayoutDashboard", title: "Paneles de administración", description: "Controla usuarios, contenido y operación desde un solo lugar." },
        { icon: "Database", title: "Backend y bases de datos", description: "Infraestructura segura y escalable detrás de tu aplicación." },
        { icon: "Palette", title: "Diseño UX/UI", description: "Interfaces intuitivas pensadas para que tus usuarios no se vayan." },
        { icon: "Headphones", title: "Soporte continuo", description: "Mantenimiento, actualizaciones y mejoras después del lanzamiento." },
      ],
    },
    stats: {
      heading: "Apps con propósito",
      items: [
        { value: "iOS / Android", label: "Multiplataforma" },
        { value: "PWA", label: "Web instalable" },
        { value: "UX", label: "Diseño centrado en el usuario" },
        { value: "24/7", label: "Soporte disponible" },
      ],
    },
    packages: {
      heading: "Modelos de proyecto",
      subheading: "Desde un MVP para validar hasta una app de producción completa.",
      pricesArePlaceholder: true,
      note: "Cada app se cotiza según alcance y plataformas. Estos rangos son orientativos.",
      tiers: [
        {
          id: "mvp",
          name: "MVP",
          tagline: "Lanza y valida",
          price: PRICE,
          priceNote: "/ proyecto",
          features: ["1 plataforma", "Funciones esenciales", "Diseño UX/UI", "Publicación en tienda", "Analítica básica"],
          ctaLabel: "Cotizar MVP",
        },
        {
          id: "completa",
          name: "App Completa",
          tagline: "Producto de producción",
          price: PRICE,
          priceNote: "/ proyecto",
          highlight: true,
          features: ["iOS + Android", "Backend y panel admin", "Notificaciones push", "Integraciones de pago", "Soporte 3 meses"],
          ctaLabel: "Cotizar App",
        },
        {
          id: "escalable",
          name: "Escalable",
          tagline: "Crece sin límites",
          price: PRICE,
          priceNote: "/ proyecto",
          features: ["Arquitectura escalable", "Módulos avanzados", "Integraciones a la medida", "SLA y soporte prioritario", "Roadmap de evolución"],
          ctaLabel: "Agendar reunión",
        },
      ],
    },
    process: {
      heading: "Cómo creamos tu app",
      steps: [
        { step: 1, title: "Descubrimiento", description: "Definimos el alcance, usuarios y funcionalidades clave." },
        { step: 2, title: "Diseño UX/UI", description: "Prototipamos la experiencia antes de escribir una línea de código." },
        { step: 3, title: "Desarrollo", description: "Construimos la app por etapas con entregas validadas." },
        { step: 4, title: "Lanzamiento", description: "Publicamos en tiendas, medimos y damos soporte continuo." },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { question: "¿Publican la app en App Store y Google Play?", answer: "Sí, nos encargamos del proceso de publicación en ambas tiendas." },
        { question: "¿Qué es una PWA y me conviene?", answer: "Una app web instalable que funciona sin pasar por las tiendas. Es ideal para validar rápido y reducir costos." },
        { question: "¿Cuánto cuesta desarrollar una app?", answer: "Depende del alcance y plataformas. Tras un breve levantamiento te damos una propuesta con inversión y tiempos." },
        { question: "¿Dan mantenimiento después del lanzamiento?", answer: "Sí, ofrecemos planes de soporte, actualizaciones y nuevas funciones." },
      ],
    },
    leadForm: {
      heading: "Hagamos tu app realidad",
      subheading: "Cuéntanos tu idea y te proponemos cómo llevarla a las pantallas.",
      source: "Landing Apps",
      defaultInterest: "Desarrollo de Apps",
    },
  },

  // ─── Páginas ricas: solo se usan secciones de conversión que les faltan ───
  "sitio-web": {
    slug: "sitio-web",
    stats: {
      heading: "Sitios que trabajan por ti",
      items: [
        { value: "+90", label: "Proyectos entregados" },
        { value: "<2s", label: "Tiempo de carga objetivo" },
        { value: "100%", label: "Diseño responsive" },
        { value: "24/7", label: "Tu sitio vendiendo" },
      ],
    },
    process: {
      heading: "Cómo trabajamos tu sitio",
      steps: [
        { step: 1, title: "Descubrimiento", description: "Entendemos tu negocio, objetivos y a quién le vendes." },
        { step: 2, title: "Diseño", description: "Definimos estructura, identidad y experiencia de usuario." },
        { step: 3, title: "Desarrollo", description: "Programamos un sitio rápido, seguro y optimizado para SEO." },
        { step: 4, title: "Lanzamiento", description: "Publicamos, medimos y te capacitamos para que tomes el control." },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { question: "¿Cuánto tarda mi sitio?", answer: "Una landing en 1-2 semanas; un sitio empresarial o e-commerce entre 3 y 6 semanas, según el alcance." },
        { question: "¿Incluye dominio y hosting?", answer: "Sí, todos los planes incluyen dominio y hosting el primer año más certificado SSL." },
        { question: "¿Podré editar el contenido yo mismo?", answer: "Sí, te capacitamos para editar textos e imágenes sin depender de nosotros." },
        { question: "¿Optimizan para Google?", answer: "Sí, todos los planes incluyen SEO On-Page; los superiores agregan Analytics y SEO avanzado." },
      ],
    },
    leadForm: {
      heading: "Cotiza tu sitio web",
      subheading: "Déjanos tus datos y te enviamos una propuesta a tu medida.",
      source: "Landing Sitio Web",
      defaultInterest: "Sitio Web",
    },
  },

  "redes-sociales": {
    slug: "redes-sociales",
    stats: {
      heading: "Resultados que generamos",
      items: [
        { value: "x5", label: "Más alcance orgánico" },
        { value: "+20", label: "Publicaciones mensuales" },
        { value: "4", label: "Plataformas de Ads" },
        { value: "ROI", label: "Cada peso medido" },
      ],
    },
    process: {
      heading: "Cómo gestionamos tus redes",
      steps: [
        { step: 1, title: "Estrategia", description: "Definimos mensajes, formatos y calendario según tus objetivos." },
        { step: 2, title: "Producción", description: "Grabamos y diseñamos el contenido en nuestro estudio profesional." },
        { step: 3, title: "Publicación y Ads", description: "Publicamos y amplificamos con campañas pagadas segmentadas." },
        { step: 4, title: "Reporte y optimización", description: "Junta mensual de resultados y ajustes basados en datos." },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { question: "¿Incluye creación de contenido?", answer: "Sí, planeamos, grabamos, editamos y publicamos el contenido por ti." },
        { question: "¿La inversión en Ads va incluida?", answer: "Nuestro fee es por gestión y producción; el presupuesto de pauta se define aparte contigo." },
        { question: "¿En qué redes trabajan?", answer: "Meta (Facebook/Instagram), TikTok, YouTube, LinkedIn y Google Ads según el plan." },
        { question: "¿Recibo reportes?", answer: "Sí, todos los planes incluyen reporte mensual y junta de resultados." },
      ],
    },
    leadForm: {
      heading: "Hagamos crecer tu marca",
      subheading: "Cuéntanos sobre tu negocio y armamos tu estrategia de redes y Ads.",
      source: "Landing Redes/Ads",
      defaultInterest: "Publicidad y Redes Sociales",
    },
  },
};

export function getLandingData(slug: string): ServiceLanding | undefined {
  return landings[slug];
}

export function buildMetadata(slug: string): Metadata {
  const data = landings[slug];
  if (!data?.metadata) return {};
  const m = data.metadata;
  const url = `https://mawsoluciones.com${m.canonicalPath}`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: url },
    openGraph: { url, title: m.ogTitle, description: m.ogDescription },
  };
}

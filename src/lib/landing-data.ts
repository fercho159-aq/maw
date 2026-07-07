import type { Metadata } from "next";

/**
 * Contenido de las landings de servicio (dirigido por datos).
 *
 * PRECIOS: definidos según investigación de mercado MX 2025-2026 (agencias
 * PyME y competidores como marketinglab.mx). Proyectos (web/apps) usan precio
 * "Desde" porque varían por alcance; servicios recurrentes (redes, contenido,
 * automatización) son mensualidad. Ajústalos cuando cambie tu lista de precios.
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
  /** Brochures descargables (PDF). Se renderizan como botones "Ver Brochure". */
  brochures?: Cta[];
  /** Línea corta de confianza bajo los CTAs, p. ej. "Diagnóstico gratuito · Sin compromiso". */
  ctaNote?: string;
  media?: { type: "video" | "image"; src: string; poster?: string };
};

export type FeatureCard = { title: string; description: string };

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

/** Barra de confianza bajo el hero (message-match con el anuncio de Google Ads). */
export type TrustItem = { label: string };
export type LandingTrustBar = { items: TrustItem[] };

/**
 * Bloque de calificación: filtra prospectos no ideales antes del formulario.
 * Clave para landings de Google Ads (mejora calidad de lead / baja CPL).
 */
export type LandingQualification = {
  heading: string;
  subheading?: string;
  forYou: string[]; // "Esto es para ti si…"
  notForYou: string[]; // "Quizá no es para ti si…"
};

/** CTA fija (barra inferior móvil + botón flotante) hacia el formulario. */
export type LandingStickyCta = {
  label: string;
  href: string; // normalmente "#cotizar"
  whatsappHref?: string;
};

export type ServiceLanding = {
  slug: string;
  metadata?: LandingMetadata;
  hero?: LandingHero;
  trustBar?: LandingTrustBar;
  features?: { heading: string; subheading?: string; cards: FeatureCard[] };
  qualification?: LandingQualification;
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
  stickyCta?: LandingStickyCta;
};

const WA = "https://wa.me/5633774723";

export const landings: Record<string, ServiceLanding> = {
  "desarrollo-web": {
    slug: "desarrollo-web",
    hero: {
      eyebrow: "Diseño y desarrollo web profesional",
      title: "Tu sitio web no vende. Te hacemos uno que sí.",
      subtitle: "Diseñamos y programamos sitios web rápidos, optimizados para Google y pensados para convertir visitas en clientes. Sin plantillas genéricas, sin sorpresas en el precio.",
      primaryCta: {
        label: "Cotizar mi sitio web",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      }
    },
    trustBar: {
      items: [
        {
          label: "Carga en menos de 2 segundos"
        },
        {
          label: "Optimizado para SEO desde el día 1"
        },
        {
          label: "100% responsivo (móvil primero)"
        },
        {
          label: "Garantía de soporte 30 días"
        },
        {
          label: "Next.js y React de nivel empresarial"
        }
      ]
    },
    features: {
      heading: "Un sitio web que trabaja para tu negocio, no solo que se ve bonito",
      subheading: "Cada decisión de diseño y código está pensada para que más visitantes te contacten y te compren.",
      cards: [
        {
          title: "Diseño a la medida de tu marca",
          description: "Nada de plantillas recicladas. Diseñamos cada sección para reflejar tu negocio y guiar al visitante hacia la acción que te interesa."
        },
        {
          title: "Velocidad que retiene visitas",
          description: "Sitios ultrarrápidos con Next.js. Cada segundo de carga cuenta: la lentitud cuesta clientes y posiciones en Google."
        },
        {
          title: "SEO técnico incluido",
          description: "Estructura, metadatos, velocidad y datos estructurados listos para que Google te encuentre y te posicione."
        },
        {
          title: "Perfecto en cualquier pantalla",
          description: "Más del 70% de tus visitas llegan desde el celular. Tu sitio se verá impecable en móvil, tablet y escritorio."
        },
        {
          title: "Enfoque en conversión",
          description: "Botones, formularios y llamados a la acción ubicados con criterio de ventas, no solo estética."
        },
        {
          title: "Capacitación y soporte",
          description: "Te entregamos tu sitio funcionando y te enseñamos a administrarlo. No te dejamos colgado tras el lanzamiento."
        }
      ]
    },
    qualification: {
      heading: "¿Es este servicio para ti?",
      subheading: "Trabajamos mejor con negocios que toman su presencia digital en serio. Mira si encajamos.",
      forYou: [
        "Tienes un negocio o marca y tu sitio actual se ve viejo, lento o no genera contactos.",
        "Quieres un sitio profesional que transmita confianza y cierre ventas, no solo presencia.",
        "Estás invirtiendo (o vas a invertir) en publicidad y necesitas una página que convierta.",
        "Buscas un proveedor serio con código limpio, no una plantilla de $2,000 que se rompe en 3 meses.",
        "Valoras la velocidad y el SEO como ventaja competitiva."
      ],
      notForYou: [
        "Buscas el sitio más barato posible sin importar la calidad.",
        "Necesitas algo para mañana sin tiempo para definir objetivos ni contenido.",
        "No tienes claro qué hace tu negocio ni a quién le vendes.",
        "Prefieres armarlo tú mismo en un editor gratuito."
      ]
    },
    stats: {
      heading: "Resultados que respaldan nuestro trabajo",
      items: [
        {
          value: "+120",
          label: "Sitios entregados"
        },
        {
          value: "<2s",
          label: "Tiempo de carga promedio"
        },
        {
          value: "95+",
          label: "Puntaje en Google PageSpeed"
        },
        {
          value: "30 días",
          label: "Soporte post-lanzamiento incluido"
        }
      ]
    },
    packages: {
      heading: "Planes de desarrollo web",
      subheading: "Precios claros según el alcance de tu proyecto. Sin letras chiquitas.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. El alcance final se confirma tras una llamada de diagnóstico gratuita.",
      tiers: [
        {
          id: "esencial",
          name: "Esencial",
          tagline: "Presencia profesional",
          price: "Desde $12,000",
          priceNote: "/ proyecto",
          features: [
            "Sitio de hasta 5 secciones",
            "Diseño a la medida y responsivo",
            "SEO básico on-page",
            "Formulario de contacto + WhatsApp",
            "Carga optimizada y segura (SSL)"
          ],
          ctaLabel: "Quiero el plan Esencial"
        },
        {
          id: "profesional",
          name: "Profesional",
          tagline: "Crecimiento y autoridad",
          price: "Desde $24,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "Sitio de hasta 10 secciones/páginas",
            "Diseño premium orientado a conversión",
            "SEO técnico completo + blog",
            "Integración con analítica y píxeles de Ads",
            "Capacitación para administrar tu sitio",
            "Soporte prioritario 60 días"
          ],
          ctaLabel: "Quiero el plan Profesional"
        },
        {
          id: "ecommerce",
          name: "E-commerce / a medida",
          tagline: "Tienda o sistema completo",
          price: "Desde $45,000",
          priceNote: "/ proyecto",
          features: [
            "Tienda en línea o funcionalidad a medida",
            "Pasarela de pagos y gestión de pedidos",
            "Panel de administración",
            "SEO avanzado + estrategia de contenido",
            "Integraciones (CRM, inventario, envíos)",
            "Soporte premium 90 días"
          ],
          ctaLabel: "Quiero el plan E-commerce"
        }
      ]
    },
    process: {
      heading: "Cómo construimos tu sitio web",
      steps: [
        {
          step: 1,
          title: "Diagnóstico",
          description: "Llamada gratuita para entender tu negocio, objetivos y a quién le vendes. Definimos alcance y propuesta clara."
        },
        {
          step: 2,
          title: "Diseño",
          description: "Creamos el diseño visual y la estructura de cada sección. Lo apruebas antes de programar una sola línea."
        },
        {
          step: 3,
          title: "Desarrollo",
          description: "Programamos tu sitio con código limpio, rápido y optimizado para Google. Revisamos en cada pantalla."
        },
        {
          step: 4,
          title: "Lanzamiento",
          description: "Publicamos, configuramos analítica y te capacitamos. Quedas con soporte para los primeros días."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuánto tarda en estar listo mi sitio?",
          answer: "Un sitio Esencial toma de 2 a 3 semanas; uno Profesional, de 4 a 6; un e-commerce o sistema a medida, de 6 a 10 semanas. Depende de qué tan rápido nos entregues tu contenido."
        },
        {
          question: "¿El precio incluite hosting y dominio?",
          answer: "El desarrollo es aparte del hosting y dominio, pero te asesoramos y configuramos todo. El costo de hosting/dominio es bajo (desde ~$1,500/año) y te decimos exactamente qué contratar."
        },
        {
          question: "¿Yo voy a poder editar mi sitio después?",
          answer: "Sí. Te entregamos capacitación y, según el plan, un panel para que actualices textos, imágenes y blog sin depender de un programador."
        },
        {
          question: "¿Y si solo quiero rediseñar mi sitio actual?",
          answer: "Perfecto. Hacemos rediseños conservando lo que funciona y mejorando velocidad, diseño y SEO. Te cotizamos según el estado actual."
        },
        {
          question: "¿Trabajan con negocios fuera de mi ciudad?",
          answer: "Sí, trabajamos con clientes en todo México de forma remota. Todo el proceso lo llevamos por videollamada, WhatsApp y correo."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu sitio web profesional",
      subheading: "Cuéntanos sobre tu proyecto y te enviamos una propuesta clara en menos de 24 horas hábiles.",
      source: "landing-desarrollo-web",
      defaultInterest: "Diseño y desarrollo web"
    },
    stickyCta: {
      label: "Cotizar mi sitio web",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Diseño y Desarrollo Web Profesional en México",
      description: "Creamos sitios web profesionales, rápidos y optimizados para SEO que convierten visitas en clientes. Desarrollo web a la medida con Next.js y React. Cotiza hoy.",
      keywords: [
        "desarrollo web México",
        "diseño web profesional",
        "crear sitio web empresa",
        "agencia de desarrollo web",
        "página web para negocio",
        "desarrollo web Next.js"
      ],
      canonicalPath: "/servicios/desarrollo-web",
      ogTitle: "Diseño y Desarrollo Web Profesional que Vende | MAW Soluciones",
      ogDescription: "Sitios web rápidos, optimizados para Google y diseñados para convertir. Sin plantillas genéricas. Cotiza tu proyecto hoy."
    }
  },
  "sitio-web": {
    slug: "sitio-web",
    hero: {
      eyebrow: "Sitios web y landing pages que venden",
      title: "Necesitas una página que convierta, no solo que exista",
      subtitle: "Creamos sitios web y landing pages diseñadas con una sola misión: convertir tu tráfico en clientes y solicitudes. Ideales para campañas de Google y Meta Ads.",
      primaryCta: {
        label: "Cotizar mi página",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      },
      brochures: [
        { label: "Ver Brochure", href: "/brochures/sitio-web.pdf" }
      ]
    },
    trustBar: {
      items: [
        {
          label: "Diseñadas para convertir"
        },
        {
          label: "Listas en días, no meses"
        },
        {
          label: "Optimizadas para móvil"
        },
        {
          label: "Compatibles con Google y Meta Ads"
        },
        {
          label: "Pago seguro y dominio propio"
        }
      ]
    },
    features: {
      heading: "Landing pages pensadas para vender, no para presumir",
      subheading: "Aplicamos principios de conversión probados para que cada visita tenga más probabilidad de convertirse en cliente.",
      cards: [
        {
          title: "Estructura orientada a conversión",
          description: "Gancho, beneficios, prueba social y un llamado a la acción claro. Cada bloque empuja al visitante a contactarte."
        },
        {
          title: "Entrega rápida",
          description: "Tu landing puede estar lista en pocos días para que no pierdas tiempo ni presupuesto de campaña."
        },
        {
          title: "Lista para Ads",
          description: "Con píxeles y conversiones configuradas para Google y Meta Ads. Tus campañas miden y optimizan de verdad."
        },
        {
          title: "Velocidad y móvil primero",
          description: "Carga inmediata en celular, donde llega la mayoría del tráfico pagado. Menos rebote, más leads."
        },
        {
          title: "Copy persuasivo incluido",
          description: "No solo diseñamos: escribimos los textos con lenguaje de ventas para tu público mexicano."
        },
        {
          title: "Medición de resultados",
          description: "Conectamos analítica para que sepas cuántos leads genera tu página y de dónde vienen."
        }
      ]
    },
    qualification: {
      heading: "¿Esta solución es para ti?",
      subheading: "Las landing pages funcionan mejor con un objetivo claro. Revisa si es tu caso.",
      forYou: [
        "Vas a invertir en Google o Meta Ads y necesitas dónde aterrizar el tráfico.",
        "Quieres generar solicitudes, citas o ventas de un producto o servicio específico.",
        "Tu sitio actual es demasiado general y no convierte el tráfico pagado.",
        "Buscas lanzar rápido y empezar a medir resultados.",
        "Tienes una oferta concreta que quieres promocionar."
      ],
      notForYou: [
        "Necesitas un sitio corporativo grande con muchas secciones (ahí te conviene Desarrollo Web).",
        "No tienes una oferta o servicio definido todavía.",
        "Buscas solo 'presencia' sin intención de generar leads.",
        "No piensas invertir en tráfico ni promoción."
      ]
    },
    stats: {
      heading: "Lo que logra una landing bien hecha",
      items: [
        {
          value: "x2-x3",
          label: "Más conversión vs. sitio genérico"
        },
        {
          value: "3-5 días",
          label: "Tiempo típico de entrega"
        },
        {
          value: "<1.5s",
          label: "Carga en móvil"
        },
        {
          value: "100%",
          label: "Lista para campañas de Ads"
        }
      ]
    },
    packages: {
      heading: "Planes de landing pages y sitios de venta",
      subheading: "Desde una landing de campaña hasta un sitio de ventas completo.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. El copy y las imágenes base están incluidos; producción de fotografía/video se cotiza aparte.",
      tiers: [
        {
          id: "landing",
          name: "Landing de campaña",
          tagline: "Una oferta, máxima conversión",
          price: "Desde $7,500",
          priceNote: "/ proyecto",
          features: [
            "Una landing page enfocada en un objetivo",
            "Copy persuasivo incluido",
            "Formulario + botón de WhatsApp",
            "Píxel de Meta y Google configurado",
            "Diseño responsivo y rápido"
          ],
          ctaLabel: "Quiero una landing"
        },
        {
          id: "ventas",
          name: "Sitio de ventas",
          tagline: "Multipágina para convertir",
          price: "Desde $16,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "Hasta 4 páginas/landings conectadas",
            "Copy y estructura de conversión",
            "SEO básico + analítica completa",
            "Integración con Ads y WhatsApp",
            "Diseño premium a la medida",
            "Soporte 30 días"
          ],
          ctaLabel: "Quiero un sitio de ventas"
        },
        {
          id: "premium",
          name: "Embudo completo",
          tagline: "Captura, nutre y cierra",
          price: "Desde $28,000",
          priceNote: "/ proyecto",
          features: [
            "Landings + página de gracias + seguimiento",
            "Integración con CRM o email marketing",
            "Automatización de respuesta a leads",
            "A/B testing inicial",
            "Optimización de conversión continua (1 mes)",
            "Soporte prioritario 60 días"
          ],
          ctaLabel: "Quiero un embudo completo"
        }
      ]
    },
    process: {
      heading: "Cómo creamos tu landing",
      steps: [
        {
          step: 1,
          title: "Brief de oferta",
          description: "Definimos tu oferta, tu público objetivo y la acción que quieres que realicen los visitantes."
        },
        {
          step: 2,
          title: "Copy y diseño",
          description: "Escribimos los textos persuasivos y diseñamos la estructura de conversión. Lo apruebas."
        },
        {
          step: 3,
          title: "Montaje y medición",
          description: "Programamos la página, instalamos píxeles y conectamos analítica y WhatsApp."
        },
        {
          step: 4,
          title: "Publicación",
          description: "Lanzamos tu landing lista para recibir tráfico de campañas. Quedas listo para vender."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuál es la diferencia con un sitio web normal?",
          answer: "Una landing tiene un solo objetivo (generar un lead o venta) y elimina distracciones. Un sitio normal informa sobre todo tu negocio. Para campañas de Ads, las landings convierten mucho mejor."
        },
        {
          question: "¿Ustedes escriben los textos?",
          answer: "Sí. El copy persuasivo está incluido. Solo necesitamos que nos cuentes sobre tu oferta y tu cliente ideal."
        },
        {
          question: "¿Puedo usarla con mis campañas de Google y Facebook?",
          answer: "Para eso está diseñada. Instalamos los píxeles y eventos de conversión para que tus campañas optimicen correctamente."
        },
        {
          question: "¿También manejan la publicidad?",
          answer: "Sí, podemos gestionar tus campañas de Google, Meta y TikTok Ads. Pregúntanos por el servicio de Publicidad Digital."
        },
        {
          question: "¿Qué tan rápido la tengo lista?",
          answer: "Una landing de campaña suele estar lista en 3 a 5 días hábiles una vez que tenemos tu información."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu landing de alta conversión",
      subheading: "Cuéntanos qué quieres promocionar y te enviamos una propuesta en menos de 24 horas hábiles.",
      source: "landing-sitio-web",
      defaultInterest: "Sitio web / Landing page"
    },
    stickyCta: {
      label: "Cotizar mi landing",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Landing Pages y Sitios Web que Convierten | México",
      description: "Diseñamos landing pages y sitios de venta optimizados para convertir tu tráfico de Google y Meta Ads en clientes. Listas en días. Cotiza hoy.",
      keywords: [
        "landing page México",
        "página web que convierte",
        "landing para Google Ads",
        "diseño de landing page",
        "sitio web de ventas",
        "página para campañas Meta Ads"
      ],
      canonicalPath: "/servicios/sitio-web",
      ogTitle: "Landing Pages que Convierten Tráfico en Clientes | MAW Soluciones",
      ogDescription: "Páginas diseñadas para vender, listas para tus campañas de Google y Meta Ads. Entrega en días. Cotiza ahora."
    }
  },
  "creacion-de-contenido": {
    slug: "creacion-de-contenido",
    hero: {
      eyebrow: "Creación de contenido para redes",
      title: "Tus redes piden contenido. Nosotros lo producimos por ti.",
      subtitle: "Reels, fotos y video que detienen el scroll y posicionan tu marca. Olvídate de improvisar publicaciones: te entregamos contenido profesional, listo para publicar.",
      primaryCta: {
        label: "Cotizar mi contenido",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      },
      brochures: [
        { label: "Ver Brochure", href: "/brochures/contenido-y-ads.pdf" }
      ]
    },
    trustBar: {
      items: [
        {
          label: "Reels que detienen el scroll"
        },
        {
          label: "Foto y video profesional"
        },
        {
          label: "Contenido listo cada mes"
        },
        {
          label: "Edición de nivel agencia"
        },
        {
          label: "Pensado para crecer tu marca"
        }
      ]
    },
    features: {
      heading: "Contenido que se ve profesional y que tu audiencia quiere ver",
      subheading: "Producimos, editamos y entregamos. Tú solo publicas (o lo publicamos por ti).",
      cards: [
        {
          title: "Reels y videos cortos",
          description: "Formato rey de Instagram y TikTok. Editamos con ganchos, ritmo y subtítulos para maximizar alcance."
        },
        {
          title: "Fotografía de producto y marca",
          description: "Imágenes que hacen ver tu negocio profesional y aumentan la confianza de quien te descubre."
        },
        {
          title: "Diseño de publicaciones",
          description: "Carruseles y gráficos con identidad de marca consistente, no plantillas genéricas."
        },
        {
          title: "Calendario de contenido",
          description: "Planeamos qué publicar y cuándo, alineado a fechas clave y a los objetivos de tu negocio."
        },
        {
          title: "Edición de nivel agencia",
          description: "Color, sonido, transiciones y subtítulos cuidados. Tu contenido compite con las marcas grandes."
        },
        {
          title: "Contenido que también vende",
          description: "No solo bonito: incluimos llamados a la acción para que tu contenido genere mensajes y ventas."
        }
      ]
    },
    qualification: {
      heading: "¿Es para ti este servicio?",
      subheading: "Producir contenido constante da resultados cuando hay compromiso. Revisa si encajas.",
      forYou: [
        "Quieres publicar contenido profesional constante pero no tienes tiempo ni equipo.",
        "Tu marca se ve amateur frente a la competencia y quieres dar el salto.",
        "Tienes un producto o servicio que se luce en foto y video.",
        "Buscas crecer en redes con material de calidad, no improvisado.",
        "Entiendes que el contenido es una inversión a mediano plazo."
      ],
      notForYou: [
        "Esperas volverte viral con una sola publicación.",
        "No quieres aparecer en cámara ni facilitar acceso a tu producto/local.",
        "Buscas el precio más bajo sin importar la calidad.",
        "No tienes claro qué vende tu negocio ni a quién."
      ]
    },
    stats: {
      heading: "Por qué el contenido profesional rinde",
      items: [
        {
          value: "x5",
          label: "Más alcance con video vs. imagen"
        },
        {
          value: "+200",
          label: "Piezas producidas al mes (equipo)"
        },
        {
          value: "8-12",
          label: "Piezas mensuales por plan"
        },
        {
          value: "48h",
          label: "Entrega tras la sesión"
        }
      ]
    },
    packages: {
      heading: "Planes de creación de contenido",
      subheading: "Mensualidad para mantener tus redes activas con material profesional.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. Una sesión de grabación al mes incluida. Traslados fuera de zona se cotizan aparte.",
      tiers: [
        {
          id: "starter",
          name: "Starter",
          tagline: "Presencia constante",
          price: "$6,500",
          priceNote: "/ mes",
          features: [
            "1 sesión de grabación al mes",
            "4 reels editados con subtítulos",
            "4 publicaciones/gráficos de marca",
            "Calendario de contenido básico",
            "Entrega lista para publicar"
          ],
          ctaLabel: "Quiero el plan Starter"
        },
        {
          id: "growth",
          name: "Growth",
          tagline: "Crecimiento real",
          price: "$11,000",
          priceNote: "/ mes",
          highlight: true,
          features: [
            "1-2 sesiones de grabación al mes",
            "8 reels editados premium",
            "8 publicaciones/carruseles de marca",
            "Sesión de fotografía de producto",
            "Calendario y estrategia de contenido",
            "Reporte mensual de desempeño"
          ],
          ctaLabel: "Quiero el plan Growth"
        },
        {
          id: "pro",
          name: "Pro",
          tagline: "Marca de alto impacto",
          price: "$18,000",
          priceNote: "/ mes",
          features: [
            "2 sesiones de grabación al mes",
            "12+ reels editados premium",
            "12 publicaciones + fotografía pro",
            "Guionización y dirección creativa",
            "Estrategia y publicación gestionada",
            "Reporte y optimización mensual"
          ],
          ctaLabel: "Quiero el plan Pro"
        }
      ]
    },
    process: {
      heading: "Cómo producimos tu contenido",
      steps: [
        {
          step: 1,
          title: "Estrategia",
          description: "Definimos tu mensaje, tono y los temas que conectan con tu audiencia y venden tu negocio."
        },
        {
          step: 2,
          title: "Grabación",
          description: "Sesión de foto y video profesional. Nos encargamos de la dirección, el equipo y la guía."
        },
        {
          step: 3,
          title: "Edición",
          description: "Editamos con ganchos, subtítulos, color y sonido de nivel agencia. Tú revisas y apruebas."
        },
        {
          step: 4,
          title: "Entrega",
          description: "Recibes tu contenido listo para publicar, o lo publicamos por ti según tu plan."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Tengo que salir yo en los videos?",
          answer: "No siempre. Trabajamos con tu producto, tu equipo, tu local o material de archivo. Pero el contenido con rostro humano suele rendir mejor, y te ayudamos a sentirte cómodo frente a cámara."
        },
        {
          question: "¿Dónde se hacen las grabaciones?",
          answer: "En tu local, en exteriores o en locación según el plan y el concepto. Lo definimos en la estrategia mensual."
        },
        {
          question: "¿Ustedes publican o solo entregan?",
          answer: "Depende del plan. En Starter y Growth puedes publicar tú o agregar gestión; en Pro la publicación gestionada está incluida."
        },
        {
          question: "¿Cuántas piezas recibo al mes?",
          answer: "Entre 8 y 24 piezas según el plan, combinando reels, publicaciones y fotografía. Lo verás detallado en cada plan."
        },
        {
          question: "¿Hay permanencia mínima?",
          answer: "Recomendamos mínimo 3 meses porque el contenido da resultados acumulativos. El primer mes ya verás un salto de calidad notable."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu producción de contenido",
      subheading: "Cuéntanos de tu marca y armamos una propuesta de contenido a tu medida.",
      source: "landing-creacion-de-contenido",
      defaultInterest: "Creación de contenido"
    },
    stickyCta: {
      label: "Cotizar mi contenido",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Creación de Contenido para Redes Sociales | Reels, Foto y Video",
      description: "Producimos reels, fotografía y video profesional para tus redes sociales. Contenido listo para publicar que hace crecer tu marca. Cotiza tu plan mensual.",
      keywords: [
        "creación de contenido para redes",
        "producción de reels México",
        "contenido para Instagram y TikTok",
        "fotografía para redes sociales",
        "video para marcas",
        "agencia de contenido digital"
      ],
      canonicalPath: "/servicios/creacion-de-contenido",
      ogTitle: "Creación de Contenido Profesional para Redes | MAW Soluciones",
      ogDescription: "Reels, foto y video que detienen el scroll y hacen crecer tu marca. Contenido listo para publicar cada mes."
    }
  },
  "redes-sociales": {
    slug: "redes-sociales",
    hero: {
      eyebrow: "Publicidad digital y gestión de redes",
      title: "Tus campañas no generan ventas. Nosotros las hacemos rentables.",
      subtitle: "Gestionamos tus redes sociales y tu publicidad en Meta, Google y TikTok Ads con estrategia, contenido y optimización constante. Más clientes, menos presupuesto desperdiciado.",
      primaryCta: {
        label: "Quiero más clientes",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      },
      brochures: [
        { label: "Ver Brochure", href: "/brochures/contenido-y-ads.pdf" }
      ]
    },
    trustBar: {
      items: [
        {
          label: "+500 marcas confían en nosotros"
        },
        {
          label: "Optimización semanal de campañas"
        },
        {
          label: "Reportes claros de resultados"
        },
        {
          label: "Partners de Meta y Google"
        },
        {
          label: "Estrategia, contenido y pauta"
        }
      ]
    },
    features: {
      heading: "Una máquina de adquisición de clientes, no solo 'publicaciones'",
      subheading: "Combinamos contenido que conecta con pauta que vende. Cada peso invertido lo medimos.",
      cards: [
        {
          title: "Gestión de campañas Ads",
          description: "Creamos, segmentamos y optimizamos tus campañas en Meta, Google y TikTok para conseguir el menor costo por resultado."
        },
        {
          title: "Gestión de redes sociales",
          description: "Publicamos, respondemos y mantenemos tus perfiles activos y profesionales con una estrategia detrás."
        },
        {
          title: "Optimización constante",
          description: "Revisamos tus campañas semanalmente y movemos presupuesto a lo que funciona. Sin 'echar y olvidar'."
        },
        {
          title: "Reportes que entiendes",
          description: "Nada de métricas vanidosas. Te mostramos leads, ventas y costo por resultado en lenguaje claro."
        },
        {
          title: "Contenido para anuncios",
          description: "Producimos creativos pensados para vender: el éxito de una campaña depende del anuncio, no solo de la segmentación."
        },
        {
          title: "Estrategia multicanal",
          description: "Definimos en qué plataforma está tu cliente y cómo combinarlas para captar y reimpactar."
        }
      ]
    },
    qualification: {
      heading: "¿Trabajamos juntos?",
      subheading: "La publicidad digital funciona con presupuesto y compromiso. Sé honesto contigo mismo.",
      forYou: [
        "Tienes un negocio que ya vende y quieres escalar con publicidad rentable.",
        "Puedes invertir al menos $5,000/mes en pauta, además del servicio.",
        "Quieres un equipo que se haga responsable de los resultados, no que improvise.",
        "Buscas medir cada peso invertido y tomar decisiones con datos.",
        "Entiendes que los resultados se construyen en 2-3 meses, no de la noche a la mañana."
      ],
      notForYou: [
        "Esperas resultados milagrosos con $1,000 de pauta al mes.",
        "Buscas a alguien que solo 'suba posts bonitos' sin estrategia.",
        "No tienes un producto o servicio validado que ya genere ventas.",
        "Quieres cancelar al primer mes sin dar tiempo a optimizar."
      ]
    },
    stats: {
      heading: "Resultados que generamos para nuestros clientes",
      items: [
        {
          value: "+500",
          label: "Marcas gestionadas"
        },
        {
          value: "-35%",
          label: "Costo por lead promedio optimizado"
        },
        {
          value: "x4",
          label: "Retorno promedio sobre la inversión"
        },
        {
          value: "Semanal",
          label: "Optimización de campañas"
        }
      ]
    },
    packages: {
      heading: "Planes de publicidad digital",
      subheading: "Elige según en cuántas plataformas quieres estar presente. Gestión profesional de principio a fin.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. Compromiso mínimo de 4 meses + costo único de setup inicial. La inversión en pauta (presupuesto de anuncios) se paga aparte directamente a la plataforma.",
      tiers: [
        {
          id: "prime",
          name: "PRIME",
          tagline: "Una plataforma, máxima atención",
          price: "$9,000",
          priceNote: "/ mes",
          features: [
            "Gestión de 1 plataforma (Meta, Google o TikTok)",
            "Estrategia y configuración de campañas",
            "Optimización semanal de pauta",
            "4 creativos para anuncios al mes",
            "Reporte mensual de resultados",
            "Soporte por WhatsApp"
          ],
          ctaLabel: "Quiero PRIME"
        },
        {
          id: "elite",
          name: "ELITE",
          tagline: "El más elegido por las marcas",
          price: "$13,000",
          priceNote: "/ mes",
          highlight: true,
          features: [
            "Gestión de 3 plataformas a tu elección",
            "Estrategia multicanal integrada",
            "Optimización semanal + remarketing",
            "8 creativos para anuncios al mes",
            "Reporte quincenal + reunión mensual",
            "Soporte prioritario"
          ],
          ctaLabel: "Quiero ELITE"
        },
        {
          id: "ultimate",
          name: "ULTIMATE",
          tagline: "Dominio total de canales",
          price: "$20,000",
          priceNote: "/ mes",
          features: [
            "Gestión de 4 plataformas (Meta, Google, TikTok y más)",
            "Estrategia avanzada de embudo completo",
            "Optimización continua + A/B testing",
            "12+ creativos para anuncios al mes",
            "Reporte semanal + reuniones quincenales",
            "Gestor de cuenta dedicado"
          ],
          ctaLabel: "Quiero ULTIMATE"
        }
      ]
    },
    process: {
      heading: "Cómo hacemos rentable tu publicidad",
      steps: [
        {
          step: 1,
          title: "Diagnóstico",
          description: "Analizamos tu negocio, tu mercado y tus campañas actuales para detectar dónde está el dinero."
        },
        {
          step: 2,
          title: "Estrategia",
          description: "Definimos plataformas, públicos, presupuestos y mensajes. Creamos los anuncios que vamos a probar."
        },
        {
          step: 3,
          title: "Lanzamiento",
          description: "Configuramos y lanzamos las campañas con todo el seguimiento de conversiones instalado."
        },
        {
          step: 4,
          title: "Optimización",
          description: "Revisamos semanalmente, mejoramos lo que funciona y escalamos. Te reportamos los resultados."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿El precio incluye el presupuesto de los anuncios?",
          answer: "No. El plan es por la gestión profesional. El presupuesto de pauta (lo que pagas a Meta, Google o TikTok) es aparte y lo controlas tú. Te recomendamos cuánto invertir según tus objetivos."
        },
        {
          question: "¿Cuánto debo invertir en pauta?",
          answer: "Depende de tu sector y meta, pero recomendamos mínimo $5,000/mes en pauta para tener datos suficientes y optimizar. Lo definimos juntos en la estrategia."
        },
        {
          question: "¿Por qué hay un compromiso mínimo de 4 meses?",
          answer: "Porque la publicidad digital se optimiza con datos. Los primeros meses recopilamos información para que el algoritmo y la estrategia rindan al máximo. En 1 mes no se ve el verdadero potencial."
        },
        {
          question: "¿Ustedes hacen los anuncios o yo los entrego?",
          answer: "Nosotros producimos los creativos incluidos en tu plan. Si necesitas más volumen de contenido, puedes sumar nuestro servicio de creación de contenido."
        },
        {
          question: "¿Qué pasa si no veo resultados?",
          answer: "Optimizamos constantemente y somos transparentes con los números. Si una estrategia no funciona, la ajustamos. Trabajamos con metas claras desde el inicio para que sepas qué esperar."
        }
      ]
    },
    leadForm: {
      heading: "Solicita tu estrategia de publicidad",
      subheading: "Cuéntanos sobre tu negocio y te preparamos una propuesta de campañas a tu medida.",
      source: "landing-redes-sociales",
      defaultInterest: "Publicidad digital / Redes sociales"
    },
    stickyCta: {
      label: "Quiero más clientes",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Publicidad Digital y Gestión de Redes | Meta, Google y TikTok Ads",
      description: "Gestionamos tus campañas de Meta, Google y TikTok Ads con estrategia y optimización constante. +500 marcas. Más clientes, menos presupuesto desperdiciado. Cotiza hoy.",
      keywords: [
        "publicidad digital México",
        "agencia de Meta Ads",
        "campañas de Google Ads",
        "gestión de redes sociales",
        "publicidad en TikTok Ads",
        "agencia de marketing digital"
      ],
      canonicalPath: "/servicios/redes-sociales",
      ogTitle: "Publicidad Digital que Genera Ventas Reales | MAW Soluciones",
      ogDescription: "Campañas de Meta, Google y TikTok Ads gestionadas y optimizadas para conseguir más clientes. +500 marcas confían en nosotros."
    }
  },
  "automatizacion": {
    slug: "automatizacion",
    hero: {
      eyebrow: "Automatización de marketing y procesos",
      title: "Dejas dinero en la mesa por procesos manuales. Los automatizamos.",
      subtitle: "Automatizamos seguimiento de leads, respuestas, recordatorios y tareas repetitivas para que tu equipo venda más y trabaje menos. Conectamos tus herramientas y dejamos de perder clientes por lentitud.",
      primaryCta: {
        label: "Cotizar mi automatización",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      }
    },
    trustBar: {
      items: [
        {
          label: "Respuestas automáticas 24/7"
        },
        {
          label: "Conectamos tus herramientas"
        },
        {
          label: "Adiós a tareas repetitivas"
        },
        {
          label: "Más leads atendidos, menos perdidos"
        },
        {
          label: "Implementación a la medida"
        }
      ]
    },
    features: {
      heading: "Automatiza lo repetitivo y enfócate en vender",
      subheading: "Cada lead sin respuesta es una venta perdida. Construimos flujos que trabajan solos.",
      cards: [
        {
          title: "Respuesta automática a leads",
          description: "Tus prospectos reciben respuesta inmediata por WhatsApp o correo, aunque sea de madrugada. La velocidad cierra ventas."
        },
        {
          title: "Integración de herramientas",
          description: "Conectamos tu formulario, CRM, WhatsApp, correo y hojas de cálculo para que la información fluya sola."
        },
        {
          title: "Seguimiento automatizado",
          description: "Secuencias de mensajes que nutren a tus prospectos y los recuerdan cerrar, sin que tú muevas un dedo."
        },
        {
          title: "Recordatorios y citas",
          description: "Confirmaciones y recordatorios automáticos que reducen las citas perdidas y los 'se me olvidó'."
        },
        {
          title: "Captura y organización de datos",
          description: "Cada lead queda registrado y clasificado automáticamente. Cero información perdida en chats."
        },
        {
          title: "Reportes automáticos",
          description: "Recibe tus números clave de forma periódica sin armar reportes a mano cada semana."
        }
      ]
    },
    qualification: {
      heading: "¿La automatización es para ti?",
      subheading: "Funciona cuando ya tienes flujo de trabajo o leads que estás perdiendo. Revisa.",
      forYou: [
        "Recibes leads o mensajes pero se te escapan por falta de seguimiento rápido.",
        "Tu equipo pierde horas en tareas repetitivas (copiar datos, mandar el mismo mensaje, recordatorios).",
        "Usas varias herramientas que no se hablan entre sí.",
        "Quieres atender a más clientes sin contratar más personal.",
        "Buscas dejar de depender de la memoria de tu equipo."
      ],
      notForYou: [
        "Aún no tienes leads ni procesos definidos que automatizar.",
        "Buscas una solución mágica sin querer documentar cómo trabaja tu negocio.",
        "No estás dispuesto a pagar las herramientas que la automatización requiere.",
        "Prefieres seguir haciendo todo manualmente."
      ]
    },
    stats: {
      heading: "Lo que recuperas al automatizar",
      items: [
        {
          value: "+15h",
          label: "Ahorradas por semana (promedio)"
        },
        {
          value: "<1 min",
          label: "Tiempo de respuesta a leads"
        },
        {
          value: "+30%",
          label: "Más leads convertidos"
        },
        {
          value: "24/7",
          label: "Tu negocio responde siempre"
        }
      ]
    },
    packages: {
      heading: "Planes de automatización",
      subheading: "Desde un flujo puntual hasta la automatización integral de tu operación.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. El costo de las herramientas externas (CRM, WhatsApp API, etc.) corre por tu cuenta; te asesoramos en la selección.",
      tiers: [
        {
          id: "flujo",
          name: "Flujo esencial",
          tagline: "Resuelve tu mayor cuello de botella",
          price: "Desde $8,000",
          priceNote: "/ proyecto",
          features: [
            "1 automatización a la medida",
            "Respuesta o seguimiento automático de leads",
            "Conexión de hasta 2 herramientas",
            "Documentación del flujo",
            "Soporte 15 días"
          ],
          ctaLabel: "Quiero un flujo"
        },
        {
          id: "sistema",
          name: "Sistema automatizado",
          tagline: "Automatiza tu captación y seguimiento",
          price: "Desde $18,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "Hasta 4 automatizaciones conectadas",
            "Captura, clasificación y seguimiento de leads",
            "Integración de CRM, WhatsApp y correo",
            "Recordatorios y reportes automáticos",
            "Capacitación al equipo",
            "Soporte 30 días"
          ],
          ctaLabel: "Quiero un sistema"
        },
        {
          id: "operacion",
          name: "Operación integral",
          tagline: "Automatiza todo el negocio",
          price: "Desde $35,000",
          priceNote: "/ proyecto",
          features: [
            "Automatización de ventas, operación y postventa",
            "Integraciones múltiples a la medida",
            "Flujos avanzados con condiciones y ramas",
            "Tableros de control en tiempo real",
            "Mantenimiento y mejoras 60 días",
            "Asesoría estratégica de procesos"
          ],
          ctaLabel: "Quiero la operación integral"
        }
      ]
    },
    process: {
      heading: "Cómo automatizamos tu negocio",
      steps: [
        {
          step: 1,
          title: "Diagnóstico",
          description: "Mapeamos tus procesos y detectamos dónde pierdes tiempo, leads o dinero."
        },
        {
          step: 2,
          title: "Diseño del flujo",
          description: "Diseñamos las automatizaciones y las herramientas a conectar. Te explicamos cómo quedará."
        },
        {
          step: 3,
          title: "Implementación",
          description: "Construimos y conectamos todo. Probamos cada flujo con casos reales antes de activarlo."
        },
        {
          step: 4,
          title: "Activación",
          description: "Ponemos en marcha la automatización, capacitamos a tu equipo y damos soporte."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Qué herramientas usan para automatizar?",
          answer: "Trabajamos con herramientas como n8n, Make, Zapier, WhatsApp API y conexiones directas a tu CRM o sistema. Elegimos la mejor combinación según tu caso y presupuesto."
        },
        {
          question: "¿Necesito tener un CRM ya?",
          answer: "No es obligatorio. Si no tienes, te recomendamos uno (o usamos algo simple como hojas de cálculo o nuestro CRM). También ofrecemos implementación de CRM como servicio aparte."
        },
        {
          question: "¿Las automatizaciones se pueden romper?",
          answer: "Cualquier integración puede requerir mantenimiento si una herramienta cambia. Por eso incluimos soporte y ofrecemos planes de mantenimiento para mantener todo funcionando."
        },
        {
          question: "¿Cuánto tarda la implementación?",
          answer: "Un flujo esencial toma 1-2 semanas; un sistema completo, de 3 a 5; una operación integral puede tomar más según la complejidad."
        },
        {
          question: "¿Esto reemplaza a mi equipo?",
          answer: "No. Libera a tu equipo de lo repetitivo para que se enfoque en vender y atender mejor. Multiplica su capacidad, no lo sustituye."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu automatización",
      subheading: "Cuéntanos qué proceso te quita tiempo o leads y te proponemos cómo automatizarlo.",
      source: "landing-automatizacion",
      defaultInterest: "Automatización de marketing y procesos"
    },
    stickyCta: {
      label: "Cotizar mi automatización",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Automatización de Marketing y Procesos para Negocios | México",
      description: "Automatizamos seguimiento de leads, respuestas, recordatorios y tareas repetitivas. Conecta tus herramientas, atiende más clientes y ahorra horas a la semana. Cotiza hoy.",
      keywords: [
        "automatización de procesos México",
        "automatización de marketing",
        "automatizar seguimiento de leads",
        "integración de herramientas negocio",
        "automatización WhatsApp",
        "flujos automatizados empresa"
      ],
      canonicalPath: "/servicios/automatizacion",
      ogTitle: "Automatiza tu Negocio y Deja de Perder Clientes | MAW Soluciones",
      ogDescription: "Respuestas, seguimiento y tareas repetitivas en piloto automático. Atiende más leads y ahorra horas cada semana."
    }
  },
  "automatizacion-y-desarrollo": {
    slug: "automatizacion-y-desarrollo",
    hero: {
      eyebrow: "Automatización + desarrollo a la medida",
      title: "Tu operación necesita un sistema propio, no más parches",
      subtitle: "Combinamos software a la medida con automatización inteligente para resolver lo que ninguna herramienta de catálogo soluciona. Un sistema hecho para cómo trabaja tu negocio.",
      primaryCta: {
        label: "Cotizar mi solución",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      }
    },
    trustBar: {
      items: [
        {
          label: "Software a la medida"
        },
        {
          label: "Automatización integrada"
        },
        {
          label: "Conexión con tus sistemas"
        },
        {
          label: "Tableros de control en tiempo real"
        },
        {
          label: "Solución hecha para tu operación"
        }
      ]
    },
    features: {
      heading: "Software hecho a tu medida que además se automatiza solo",
      subheading: "No adaptamos tu negocio a un software genérico. Construimos el sistema que tu operación necesita.",
      cards: [
        {
          title: "Desarrollo a la medida",
          description: "Programamos exactamente la herramienta que tu negocio necesita, sin pagar por funciones que no usas."
        },
        {
          title: "Automatización integrada",
          description: "El sistema no solo guarda datos: ejecuta tareas, envía mensajes y actúa solo según tus reglas."
        },
        {
          title: "Integración con lo que ya usas",
          description: "Conectamos tu nuevo sistema con tus herramientas actuales, WhatsApp, contabilidad o lo que necesites."
        },
        {
          title: "Tableros de control",
          description: "Visualiza el estado de tu operación en tiempo real, con la información que de verdad importa."
        },
        {
          title: "Escalable y seguro",
          description: "Arquitectura pensada para crecer con tu negocio, con respaldo y seguridad de los datos."
        },
        {
          title: "Soporte y evolución",
          description: "Tu sistema crece contigo. Damos mantenimiento y agregamos funciones conforme avanzas."
        }
      ]
    },
    qualification: {
      heading: "¿Esta solución es para ti?",
      subheading: "El desarrollo a medida con automatización es una inversión seria. Revisa si es tu momento.",
      forYou: [
        "Ya intentaste con software de catálogo y ninguno se adapta a cómo trabajas.",
        "Tienes procesos complejos que combinan datos, tareas y comunicación.",
        "Pierdes tiempo y dinero conectando manualmente herramientas que no se hablan.",
        "Quieres un sistema que sea una ventaja competitiva, no un parche.",
        "Tienes presupuesto para invertir en una solución a largo plazo."
      ],
      notForYou: [
        "Buscas una solución barata e inmediata de catálogo.",
        "Tu proceso es simple y una herramienta existente lo resuelve.",
        "No tienes claro cómo funciona tu operación internamente.",
        "No piensas darle mantenimiento ni evolución al sistema."
      ]
    },
    stats: {
      heading: "Lo que logras con un sistema propio",
      items: [
        {
          value: "100%",
          label: "A la medida de tu operación"
        },
        {
          value: "+20h",
          label: "Ahorradas por semana al equipo"
        },
        {
          value: "1 solo",
          label: "Sistema en vez de 5 herramientas"
        },
        {
          value: "Tiempo real",
          label: "Control total de tu negocio"
        }
      ]
    },
    packages: {
      heading: "Planes de automatización + desarrollo",
      subheading: "Cada proyecto es único; estos son rangos de referencia según la complejidad.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. El alcance y precio final se definen tras un diagnóstico técnico. Puede operar bajo modelo de mensualidad de mantenimiento.",
      tiers: [
        {
          id: "modulo",
          name: "Módulo a la medida",
          tagline: "Resuelve un proceso clave",
          price: "Desde $30,000",
          priceNote: "/ proyecto",
          features: [
            "Sistema enfocado en un proceso",
            "Automatizaciones del flujo principal",
            "Integración con 1-2 herramientas",
            "Panel de administración",
            "Capacitación y soporte 30 días"
          ],
          ctaLabel: "Quiero un módulo"
        },
        {
          id: "plataforma",
          name: "Plataforma operativa",
          tagline: "Centraliza tu negocio",
          price: "Desde $70,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "Sistema multimódulo a la medida",
            "Automatización de ventas y operación",
            "Integraciones múltiples",
            "Tableros de control en tiempo real",
            "Roles y permisos de usuario",
            "Mantenimiento y mejoras 90 días"
          ],
          ctaLabel: "Quiero una plataforma"
        },
        {
          id: "enterprise",
          name: "Solución integral",
          tagline: "Tu sistema central de operación",
          price: "Cotización a medida",
          priceNote: "según alcance",
          features: [
            "Sistema completo end-to-end",
            "Automatización avanzada con reglas de negocio",
            "Integraciones complejas y APIs propias",
            "Arquitectura escalable en la nube",
            "Equipo dedicado al proyecto",
            "Contrato de soporte y evolución continua"
          ],
          ctaLabel: "Solicitar cotización"
        }
      ]
    },
    process: {
      heading: "Cómo construimos tu sistema",
      steps: [
        {
          step: 1,
          title: "Diagnóstico técnico",
          description: "Analizamos a fondo tu operación y definimos qué debe hacer el sistema y qué automatizar."
        },
        {
          step: 2,
          title: "Arquitectura y diseño",
          description: "Diseñamos la estructura, las pantallas y los flujos de automatización. Lo validas antes de programar."
        },
        {
          step: 3,
          title: "Desarrollo por etapas",
          description: "Programamos en entregas para que veas avances y des retroalimentación temprano."
        },
        {
          step: 4,
          title: "Lanzamiento y soporte",
          description: "Implementamos, migramos datos, capacitamos a tu equipo y damos soporte y evolución."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuál es la diferencia con un software de catálogo?",
          answer: "Un software de catálogo te obliga a adaptarte a sus funciones. Nosotros construimos exactamente lo que tu negocio necesita y le sumamos automatización, así no pagas por lo que no usas ni te falta lo que sí."
        },
        {
          question: "¿Cuánto cuesta realmente mi proyecto?",
          answer: "Depende del alcance. Los rangos son referencia; tras un diagnóstico técnico te damos una cotización cerrada y un plan de entregas claro."
        },
        {
          question: "¿Cuánto tarda en estar listo?",
          answer: "Un módulo toma de 4 a 8 semanas; una plataforma, de 2 a 4 meses; una solución integral se define por etapas. Entregamos por partes para que uses lo primero pronto."
        },
        {
          question: "¿El sistema es mío?",
          answer: "Sí. Te entregamos la propiedad de tu sistema. No quedas atado a una mensualidad obligatoria, aunque recomendamos un plan de mantenimiento."
        },
        {
          question: "¿Puede conectarse con lo que ya uso?",
          answer: "Sí. Integramos tu nuevo sistema con CRM, contabilidad, WhatsApp, e-commerce o cualquier herramienta que tenga forma de conectarse."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu sistema a la medida",
      subheading: "Cuéntanos qué necesita resolver tu operación y agendamos un diagnóstico técnico gratuito.",
      source: "landing-automatizacion-y-desarrollo",
      defaultInterest: "Automatización + desarrollo a la medida"
    },
    stickyCta: {
      label: "Cotizar mi solución",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Automatización y Desarrollo de Software a la Medida | México",
      description: "Sistemas a la medida con automatización integrada para tu operación. Resolvemos lo que ningún software de catálogo soluciona. Diagnóstico técnico gratuito. Cotiza hoy.",
      keywords: [
        "desarrollo de software a la medida",
        "automatización empresarial México",
        "sistema a la medida para negocio",
        "software personalizado",
        "automatización de operaciones",
        "desarrollo de sistemas empresariales"
      ],
      canonicalPath: "/servicios/automatizacion-y-desarrollo",
      ogTitle: "Software a la Medida + Automatización para tu Negocio | MAW Soluciones",
      ogDescription: "Un sistema hecho para cómo trabaja tu empresa, con automatización integrada. Deja de pagar parches. Cotiza tu solución."
    }
  },
  "desarrollo-a-la-medida": {
    slug: "desarrollo-a-la-medida",
    hero: {
      eyebrow: "Software y sistemas a la medida",
      title: "Ningún software hace lo que tu negocio necesita. Lo construimos.",
      subtitle: "Desarrollamos sistemas, plataformas y software a la medida para resolver problemas específicos de tu operación. Tecnología que se adapta a ti, no al revés.",
      primaryCta: {
        label: "Cotizar mi software",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      }
    },
    trustBar: {
      items: [
        {
          label: "Código limpio y escalable"
        },
        {
          label: "Tus datos, seguros y tuyos"
        },
        {
          label: "Paneles y reportes a medida"
        },
        {
          label: "Propiedad total del sistema"
        },
        {
          label: "Soporte y evolución continua"
        }
      ]
    },
    features: {
      heading: "Tecnología construida exactamente para tu negocio",
      subheading: "Desde sistemas de gestión hasta plataformas completas. Tú defines el problema, nosotros el sistema.",
      cards: [
        {
          title: "Desarrollo a la medida",
          description: "Construimos software con la lógica exacta de tu negocio, sin amarrarte a las limitaciones de una herramienta genérica."
        },
        {
          title: "Sistemas de gestión",
          description: "Plataformas internas para administrar clientes, inventario, proyectos, pagos o lo que tu operación requiera."
        },
        {
          title: "Bases de datos robustas",
          description: "Tu información organizada, segura y accesible. Adiós a los datos dispersos en mil archivos de Excel."
        },
        {
          title: "Aplicaciones web",
          description: "Sistemas accesibles desde cualquier navegador, para que tu equipo trabaje desde donde sea."
        },
        {
          title: "Seguro y escalable",
          description: "Arquitectura moderna que crece con tu negocio y protege tus datos y los de tus clientes."
        },
        {
          title: "Acompañamiento real",
          description: "No desaparecemos tras la entrega. Damos soporte y evolucionamos el sistema conforme creces."
        }
      ]
    },
    qualification: {
      heading: "¿El desarrollo a la medida es para ti?",
      subheading: "Es la mejor opción cuando lo estándar ya no alcanza. Revisa si es tu caso.",
      forYou: [
        "Tienes un proceso o necesidad que ningún software de catálogo resuelve bien.",
        "Operas con Excel y archivos sueltos y ya se te volvió un caos.",
        "Quieres un sistema que sea ventaja competitiva de tu negocio.",
        "Necesitas que el software se adapte a tu forma de trabajar, no al revés.",
        "Ves la tecnología como una inversión, no como un gasto."
      ],
      notForYou: [
        "Una herramienta de catálogo ya cubre lo que necesitas.",
        "Buscas la opción más barata sin importar el resultado.",
        "No tienes claro qué problema quieres resolver.",
        "Necesitas algo funcionando en pocos días."
      ]
    },
    stats: {
      heading: "Lo que ganas con software propio",
      items: [
        {
          value: "100%",
          label: "Hecho a tu medida"
        },
        {
          value: "0",
          label: "Funciones inútiles que pagar"
        },
        {
          value: "Tuyo",
          label: "Propiedad total del código"
        },
        {
          value: "Escalable",
          label: "Crece con tu negocio"
        }
      ]
    },
    packages: {
      heading: "Planes de desarrollo a la medida",
      subheading: "El precio depende del alcance; estos rangos te orientan según el tamaño del proyecto.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. El alcance final se define tras un diagnóstico técnico gratuito.",
      tiers: [
        {
          id: "mvp",
          name: "MVP / herramienta",
          tagline: "Valida tu idea o resuelve un caso",
          price: "Desde $25,000",
          priceNote: "/ proyecto",
          features: [
            "Sistema enfocado en una función clave",
            "Base de datos y panel de administración",
            "Aplicación web responsiva",
            "Hasta 2 roles de usuario",
            "Soporte 30 días"
          ],
          ctaLabel: "Quiero un MVP"
        },
        {
          id: "sistema",
          name: "Sistema completo",
          tagline: "Gestiona tu operación",
          price: "Desde $60,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "Sistema multimódulo a la medida",
            "Roles, permisos y reportes",
            "Integraciones con tus herramientas",
            "Tableros de control",
            "Migración de tus datos actuales",
            "Soporte y mejoras 90 días"
          ],
          ctaLabel: "Quiero un sistema completo"
        },
        {
          id: "plataforma",
          name: "Plataforma a medida",
          tagline: "Producto digital robusto",
          price: "Cotización a medida",
          priceNote: "según alcance",
          features: [
            "Plataforma compleja end-to-end",
            "Arquitectura escalable en la nube",
            "APIs y módulos avanzados",
            "Seguridad y respaldo de nivel empresarial",
            "Equipo dedicado al proyecto",
            "Contrato de soporte y evolución"
          ],
          ctaLabel: "Solicitar cotización"
        }
      ]
    },
    process: {
      heading: "Cómo desarrollamos tu software",
      steps: [
        {
          step: 1,
          title: "Diagnóstico",
          description: "Entendemos a fondo el problema que quieres resolver y definimos qué debe hacer el sistema."
        },
        {
          step: 2,
          title: "Diseño y plan",
          description: "Diseñamos pantallas, estructura de datos y un plan de entregas con tiempos y costo claros."
        },
        {
          step: 3,
          title: "Desarrollo iterativo",
          description: "Programamos por etapas y te mostramos avances reales para ajustar sobre la marcha."
        },
        {
          step: 4,
          title: "Entrega y soporte",
          description: "Implementamos, migramos datos, capacitamos y acompañamos la evolución de tu sistema."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuánto cuesta desarrollar mi software?",
          answer: "Depende totalmente del alcance. Los rangos son referencia; tras un diagnóstico gratuito te damos una cotización cerrada con plan de entregas."
        },
        {
          question: "¿Cuánto tarda?",
          answer: "Un MVP toma de 4 a 8 semanas; un sistema completo, de 2 a 4 meses; una plataforma compleja se trabaja por etapas. Entregamos por partes para que uses lo primero cuanto antes."
        },
        {
          question: "¿El código es mío?",
          answer: "Sí, te entregamos la propiedad del sistema y su código. No quedas atado a una mensualidad obligatoria."
        },
        {
          question: "¿Pueden migrar mis datos actuales?",
          answer: "Sí. Migramos tu información desde Excel, otra herramienta o tu sistema actual para que arranques sin perder nada."
        },
        {
          question: "¿Qué tecnología usan?",
          answer: "Tecnologías modernas y probadas (como React, Next.js, Node y bases de datos robustas) que aseguran un sistema rápido, seguro y fácil de mantener."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu software a la medida",
      subheading: "Cuéntanos qué problema quieres resolver y agendamos un diagnóstico técnico gratuito.",
      source: "landing-desarrollo-a-la-medida",
      defaultInterest: "Software / sistemas a la medida"
    },
    stickyCta: {
      label: "Cotizar mi software",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Desarrollo de Software y Sistemas a la Medida | México",
      description: "Desarrollamos software, plataformas y sistemas a la medida para tu negocio. Tecnología que se adapta a tu operación, no al revés. Diagnóstico gratuito. Cotiza hoy.",
      keywords: [
        "desarrollo de software a la medida",
        "sistema a la medida México",
        "software personalizado para empresas",
        "desarrollo de sistemas de gestión",
        "aplicación web a la medida",
        "programación a la medida"
      ],
      canonicalPath: "/servicios/desarrollo-a-la-medida",
      ogTitle: "Software a la Medida para tu Negocio | MAW Soluciones",
      ogDescription: "Sistemas y plataformas construidos para resolver tu problema específico. Tecnología que se adapta a ti. Cotiza tu proyecto."
    }
  },
  "apps": {
    slug: "apps",
    hero: {
      eyebrow: "Desarrollo de apps móviles",
      title: "Quieres tu propia app. Te la desarrollamos para Android y iOS.",
      subtitle: "Diseñamos y programamos aplicaciones móviles para Android y iOS que tus clientes amen usar. De la idea a la App Store y Google Play, con un equipo que te acompaña.",
      primaryCta: {
        label: "Cotizar mi app",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      },
      brochures: [
        { label: "Ver Brochure", href: "/brochures/apps-y-desarrollo.pdf" }
      ]
    },
    trustBar: {
      items: [
        {
          label: "Android e iOS"
        },
        {
          label: "Publicación en las tiendas"
        },
        {
          label: "Diseño UX/UI cuidado"
        },
        {
          label: "Código mantenible y tuyo"
        },
        {
          label: "Soporte tras el lanzamiento"
        }
      ]
    },
    features: {
      heading: "Apps que tus usuarios disfrutan y que tu negocio aprovecha",
      subheading: "Un solo código para Android e iOS: más rápido, más económico y más fácil de mantener.",
      cards: [
        {
          title: "Android e iOS a la vez",
          description: "Desarrollamos con tecnología multiplataforma para llegar a ambos sistemas sin duplicar el costo."
        },
        {
          title: "Diseño UX/UI profesional",
          description: "Interfaces intuitivas y atractivas que hacen que tus usuarios se queden y vuelvan."
        },
        {
          title: "Funcionalidad a la medida",
          description: "Notificaciones, pagos, perfiles, geolocalización, chat... construimos lo que tu app necesita."
        },
        {
          title: "Backend incluido",
          description: "Tu app conectada a una base de datos sólida y un panel para que administres su contenido."
        },
        {
          title: "Publicación en las tiendas",
          description: "Nos encargamos del proceso de publicación en App Store y Google Play. Tú no peleas con la burocracia."
        },
        {
          title: "Soporte y actualizaciones",
          description: "Damos mantenimiento y actualizamos tu app conforme cambian los sistemas operativos."
        }
      ]
    },
    qualification: {
      heading: "¿Una app es lo que tu negocio necesita?",
      subheading: "Una app es una gran inversión; asegúrate de que sea el camino correcto.",
      forYou: [
        "Tu negocio necesita una herramienta que tus clientes usen de forma recurrente.",
        "Quieres ofrecer pedidos, reservas, fidelización o un servicio desde el celular.",
        "Tienes una idea de producto digital que requiere presencia en las tiendas.",
        "Buscas un canal directo con tus usuarios (notificaciones, perfil, historial).",
        "Cuentas con presupuesto para una inversión de mediano plazo."
      ],
      notForYou: [
        "Lo que necesitas en realidad es un sitio web (más rápido y económico).",
        "No tienes claro qué problema resolvería la app para tus usuarios.",
        "Esperas miles de descargas sin un plan de promoción.",
        "Buscas el desarrollo más barato sin importar la calidad."
      ]
    },
    stats: {
      heading: "Por qué nuestro enfoque conviene",
      items: [
        {
          value: "2 en 1",
          label: "Android e iOS, un solo código"
        },
        {
          value: "-40%",
          label: "Costo vs. desarrollar por separado"
        },
        {
          value: "Tuya",
          label: "Propiedad total de la app"
        },
        {
          value: "App Store + Play",
          label: "Publicación incluida"
        }
      ]
    },
    packages: {
      heading: "Planes de desarrollo de apps",
      subheading: "El precio depende de la complejidad; estos rangos te orientan.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. Las cuentas de desarrollador (Apple ~$99 USD/año, Google ~$25 USD único) corren por tu cuenta. Alcance final tras diagnóstico.",
      tiers: [
        {
          id: "mvp",
          name: "App MVP",
          tagline: "Lanza tu primera versión",
          price: "Desde $45,000",
          priceNote: "/ proyecto",
          features: [
            "App Android e iOS (multiplataforma)",
            "Hasta 5 pantallas principales",
            "Funcionalidad esencial a la medida",
            "Backend y panel de administración",
            "Publicación en tiendas + soporte 30 días"
          ],
          ctaLabel: "Quiero un MVP"
        },
        {
          id: "completa",
          name: "App completa",
          tagline: "Producto listo para escalar",
          price: "Desde $90,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "App Android e iOS con UX/UI premium",
            "Funcionalidad avanzada (pagos, notificaciones, perfiles)",
            "Backend robusto + panel completo",
            "Integraciones con tus sistemas",
            "Pruebas y optimización",
            "Soporte y actualizaciones 90 días"
          ],
          ctaLabel: "Quiero una app completa"
        },
        {
          id: "plataforma",
          name: "App + plataforma",
          tagline: "Producto digital robusto",
          price: "Cotización a medida",
          priceNote: "según alcance",
          features: [
            "App + panel web + APIs propias",
            "Arquitectura escalable en la nube",
            "Funcionalidad compleja a la medida",
            "Seguridad de nivel empresarial",
            "Equipo dedicado",
            "Contrato de soporte y evolución"
          ],
          ctaLabel: "Solicitar cotización"
        }
      ]
    },
    process: {
      heading: "Cómo desarrollamos tu app",
      steps: [
        {
          step: 1,
          title: "Descubrimiento",
          description: "Definimos para qué sirve la app, quién la usará y qué funciones tendrá la primera versión."
        },
        {
          step: 2,
          title: "Diseño UX/UI",
          description: "Diseñamos cada pantalla y el flujo de uso. Lo apruebas antes de programar."
        },
        {
          step: 3,
          title: "Desarrollo",
          description: "Programamos la app y el backend por etapas, con avances que puedes probar en tu celular."
        },
        {
          step: 4,
          title: "Publicación",
          description: "Lanzamos en App Store y Google Play, y damos soporte tras el lanzamiento."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿La app funciona en Android y iPhone?",
          answer: "Sí. Desarrollamos con tecnología multiplataforma (como React Native/Flutter), por lo que tu app funciona en ambos sistemas con un solo desarrollo, ahorrando tiempo y dinero."
        },
        {
          question: "¿Cuánto cuesta hacer una app?",
          answer: "Depende de las funciones. Un MVP arranca desde $45,000; una app completa desde $90,000. Tras un diagnóstico te damos una cotización cerrada."
        },
        {
          question: "¿Cuánto tarda el desarrollo?",
          answer: "Un MVP toma de 6 a 10 semanas; una app completa, de 3 a 5 meses. Trabajamos por etapas para que veas avances pronto."
        },
        {
          question: "¿Ustedes la publican en las tiendas?",
          answer: "Sí. Nos encargamos del proceso de publicación en App Store y Google Play. Solo necesitas las cuentas de desarrollador a tu nombre."
        },
        {
          question: "¿Tal vez me conviene más un sitio web?",
          answer: "A veces sí. Si tu necesidad se resuelve en navegador, un sitio o app web es más rápido y económico. Te asesoramos con honestidad en el diagnóstico."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu app móvil",
      subheading: "Cuéntanos tu idea y agendamos una sesión para definir el alcance y darte una propuesta.",
      source: "landing-apps",
      defaultInterest: "Desarrollo de app móvil"
    },
    stickyCta: {
      label: "Cotizar mi app",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Desarrollo de Apps Móviles Android e iOS | México",
      description: "Diseñamos y desarrollamos apps móviles para Android e iOS a la medida. De la idea a la App Store y Google Play. Un solo código, doble alcance. Cotiza tu app hoy.",
      keywords: [
        "desarrollo de apps México",
        "crear app móvil",
        "desarrollo de aplicaciones Android iOS",
        "hacer una app para mi negocio",
        "agencia de desarrollo de apps",
        "app a la medida"
      ],
      canonicalPath: "/servicios/apps",
      ogTitle: "Desarrollo de Apps Móviles Android e iOS | MAW Soluciones",
      ogDescription: "Tu app para Android y iOS, de la idea a la tienda. Diseño cuidado y funcionalidad a la medida. Cotiza tu app."
    }
  },
  "crm": {
    slug: "crm",
    hero: {
      eyebrow: "CRM y gestión de clientes",
      title: "Pierdes clientes en chats y notas sueltas. Un CRM lo soluciona.",
      subtitle: "Implementamos y configuramos un CRM a la medida de tu negocio para que dejes de perder leads, des seguimiento ordenado y cierres más ventas. Toda tu relación con clientes en un solo lugar.",
      primaryCta: {
        label: "Cotizar mi CRM",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      }
    },
    trustBar: {
      items: [
        {
          label: "Todos tus clientes en un lugar"
        },
        {
          label: "Seguimiento que no se escapa"
        },
        {
          label: "Conectado a WhatsApp"
        },
        {
          label: "Visibilidad de tu embudo"
        },
        {
          label: "Implementación y capacitación"
        }
      ]
    },
    features: {
      heading: "Un CRM que tu equipo sí va a usar",
      subheading: "No solo instalamos una herramienta: la configuramos para tu proceso de ventas y capacitamos a tu gente.",
      cards: [
        {
          title: "Centraliza tus clientes",
          description: "Todos tus contactos, conversaciones e historial en un solo lugar. Adiós a buscar en mil chats y notas."
        },
        {
          title: "Embudo de ventas visual",
          description: "Ve en qué etapa está cada prospecto y qué falta para cerrar. Nada se queda olvidado."
        },
        {
          title: "Integración con WhatsApp",
          description: "Conecta tu CRM con WhatsApp para registrar y dar seguimiento a las conversaciones sin perder ninguna."
        },
        {
          title: "Recordatorios y tareas",
          description: "El CRM le recuerda a tu equipo a quién contactar y cuándo. El seguimiento deja de depender de la memoria."
        },
        {
          title: "Reportes de ventas",
          description: "Mide cuántos leads entran, cuántos cierran y dónde se atoran. Toma decisiones con datos."
        },
        {
          title: "Capacitación incluida",
          description: "Entrenamos a tu equipo para que adopte el CRM y realmente lo use. Una herramienta sin uso no sirve."
        }
      ]
    },
    qualification: {
      heading: "¿Necesitas un CRM?",
      subheading: "Un CRM rinde cuando ya tienes flujo de clientes que organizar. Revisa.",
      forYou: [
        "Recibes leads por varios canales y se te pierden o se enfrían sin seguimiento.",
        "Manejas tus clientes en chats, libretas o Excel y ya es un desorden.",
        "Tienes un equipo de ventas y no sabes en qué está cada quién.",
        "Quieres saber cuántos prospectos tienes y cuántos cierras realmente.",
        "Buscas profesionalizar tu proceso de ventas."
      ],
      notForYou: [
        "Aún no recibes leads ni tienes clientes que gestionar.",
        "Tu volumen es tan bajo que una libreta te alcanza.",
        "No estás dispuesto a que tu equipo cambie de hábitos.",
        "Buscas que el CRM venda solo sin nadie que le dé seguimiento."
      ]
    },
    stats: {
      heading: "Lo que mejora con un CRM bien implementado",
      items: [
        {
          value: "+30%",
          label: "Más cierres con seguimiento ordenado"
        },
        {
          value: "0",
          label: "Leads perdidos por olvido"
        },
        {
          value: "1 vista",
          label: "Todo tu embudo de un vistazo"
        },
        {
          value: "WhatsApp",
          label: "Integrado a tu canal principal"
        }
      ]
    },
    packages: {
      heading: "Planes de implementación de CRM",
      subheading: "Desde la puesta en marcha básica hasta un CRM totalmente integrado y automatizado.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. La licencia mensual del CRM (si aplica) corre por tu cuenta; te recomendamos la mejor opción para tu presupuesto.",
      tiers: [
        {
          id: "setup",
          name: "Puesta en marcha",
          tagline: "Tu CRM funcionando",
          price: "Desde $7,000",
          priceNote: "/ proyecto",
          features: [
            "Configuración del CRM a tu proceso",
            "Embudo de ventas personalizado",
            "Importación de tus contactos actuales",
            "Capacitación básica al equipo",
            "Soporte 15 días"
          ],
          ctaLabel: "Quiero la puesta en marcha"
        },
        {
          id: "integrado",
          name: "CRM integrado",
          tagline: "Conectado y automatizado",
          price: "Desde $16,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "Configuración completa + embudos",
            "Integración con WhatsApp y formularios web",
            "Automatización de seguimiento básico",
            "Reportes y tableros de ventas",
            "Capacitación completa al equipo",
            "Soporte 30 días"
          ],
          ctaLabel: "Quiero el CRM integrado"
        },
        {
          id: "gestion",
          name: "CRM + gestión mensual",
          tagline: "Lo implementamos y lo cuidamos",
          price: "$4,500",
          priceNote: "/ mes",
          features: [
            "Todo lo del CRM integrado",
            "Administración y optimización mensual",
            "Nuevas automatizaciones cada mes",
            "Soporte continuo a tu equipo",
            "Reporte mensual de desempeño de ventas",
            "Mejoras según crece tu negocio"
          ],
          ctaLabel: "Quiero gestión mensual"
        }
      ]
    },
    process: {
      heading: "Cómo implementamos tu CRM",
      steps: [
        {
          step: 1,
          title: "Diagnóstico",
          description: "Entendemos tu proceso de ventas actual y cómo llegan y se atienden tus clientes."
        },
        {
          step: 2,
          title: "Configuración",
          description: "Configuramos el CRM con tu embudo, etapas e integraciones. Importamos tus contactos."
        },
        {
          step: 3,
          title: "Capacitación",
          description: "Entrenamos a tu equipo con casos reales para que adopte la herramienta sin fricción."
        },
        {
          step: 4,
          title: "Acompañamiento",
          description: "Damos soporte en las primeras semanas y ajustamos lo que haga falta para que se use."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Qué CRM usan?",
          answer: "Trabajamos con CRMs líderes (como HubSpot, Pipedrive, Kommo/amoCRM, entre otros) y también podemos implementar uno a la medida. Recomendamos el mejor según tu proceso y presupuesto."
        },
        {
          question: "¿Se conecta con WhatsApp?",
          answer: "Sí. Integramos tu CRM con WhatsApp para que cada conversación quede registrada y con seguimiento, sin perder leads en el chat."
        },
        {
          question: "¿El precio incluye la licencia del CRM?",
          answer: "El plan cubre la implementación y configuración. La licencia mensual del CRM (si la herramienta la cobra) es aparte; muchas tienen planes accesibles e incluso gratuitos para empezar."
        },
        {
          question: "¿Mi equipo va a saber usarlo?",
          answer: "Sí. La capacitación está incluida y la hacemos con tu proceso real. Un CRM solo sirve si el equipo lo usa, por eso lo cuidamos tanto."
        },
        {
          question: "¿Pueden automatizar el seguimiento?",
          answer: "Sí. Desde recordatorios hasta secuencias de mensajes automáticos. En los planes integrado y de gestión mensual sumamos automatizaciones."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu CRM",
      subheading: "Cuéntanos cómo gestionas hoy a tus clientes y te proponemos el CRM ideal para tu negocio.",
      source: "landing-crm",
      defaultInterest: "CRM y gestión de clientes"
    },
    stickyCta: {
      label: "Cotizar mi CRM",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Implementación de CRM y Gestión de Clientes | México",
      description: "Implementamos y configuramos tu CRM a la medida: centraliza clientes, da seguimiento ordenado y cierra más ventas. Integración con WhatsApp y capacitación. Cotiza hoy.",
      keywords: [
        "implementación de CRM México",
        "CRM para pymes",
        "gestión de clientes",
        "CRM con WhatsApp",
        "sistema de seguimiento de ventas",
        "configurar CRM negocio"
      ],
      canonicalPath: "/servicios/crm",
      ogTitle: "CRM para Dejar de Perder Clientes | MAW Soluciones",
      ogDescription: "Centraliza tus clientes, ordena tu seguimiento y cierra más ventas. CRM implementado, integrado a WhatsApp y con capacitación."
    }
  },
  "erp": {
    slug: "erp",
    hero: {
      eyebrow: "Sistemas ERP y de operación a la medida",
      title: "Su operación ya rebasó al Excel.\nUn sistema la ordena — o la opera solo.",
      subtitle: "Ventas, inventario, facturación CFDI y finanzas en un solo sistema, armado sobre la forma en que su empresa ya trabaja. Si el modelo lo permite, el sistema también opera solo: reservas, pagos y accesos por QR.",
      primaryCta: {
        label: "Solicitar diagnóstico",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      },
      ctaNote: "Diagnóstico sin costo · Respuesta el mismo día",
      media: {
        type: "image",
        src: "/images/studio/erp-suite.png"
      }
    },
    trustBar: {
      items: [
        {
          label: "Inventario en tiempo real"
        },
        {
          label: "Facturación y finanzas integradas"
        },
        {
          label: "Procesos conectados entre áreas"
        },
        {
          label: "Autoservicio: pagos, QR e IoT"
        },
        {
          label: "Implementación y capacitación"
        }
      ]
    },
    features: {
      heading: "Toda la operación en un solo sistema",
      subheading: "Lo configuramos sobre sus procesos reales y migramos sus datos. Nadie empieza de cero.",
      cards: [
        {
          title: "Inventario y almacén",
          description: "Existencias en tiempo real, alertas de stock mínimo y trazabilidad por lote."
        },
        {
          title: "Ventas y facturación",
          description: "De la cotización a la factura CFDI 4.0 sin recapturar información."
        },
        {
          title: "Compras y proveedores",
          description: "Órdenes de compra y cuentas por pagar bajo control, con historial por proveedor."
        },
        {
          title: "Finanzas y reportes",
          description: "Flujo, márgenes y cobranza a la vista de dirección, no en veinte archivos."
        },
        {
          title: "Operación autónoma",
          description: "Reservas, pagos y accesos por QR conectados a su equipo físico (IoT)."
        },
        {
          title: "Capacitación por área",
          description: "Entrenamos a cada área con sus propios casos. Un sistema que nadie usa es dinero tirado."
        }
      ]
    },
    qualification: {
      heading: "¿Su empresa necesita un ERP?",
      subheading: "Un ERP rinde cuando la operación ya rebasó a las hojas de cálculo. Revise.",
      forYou: [
        "La operación se controla en Excel y los números ya no cuadran entre áreas.",
        "Su equipo captura la misma información en varios lugares.",
        "Dirección no sabe cuánto gana por producto o por sucursal.",
        "Se factura fuera del sistema y conciliar toma días.",
        "Quiere un modelo de autoservicio que opere sin personal fijo."
      ],
      notForYou: [
        "El volumen de operación aún se controla bien a mano (por ahora).",
        "Solo necesita gestionar clientes y seguimiento comercial: eso es un CRM.",
        "Nadie en la organización está dispuesto a cambiar procesos."
      ]
    },
    stats: {
      heading: "Lo que mejora con un ERP bien implementado",
      items: [
        {
          value: "1 sistema",
          label: "Toda la operación conectada"
        },
        {
          value: "1 captura",
          label: "Cada dato se registra una sola vez"
        },
        {
          value: "Tiempo real",
          label: "Inventario y finanzas al día"
        },
        {
          value: "24/7",
          label: "Autoservicio que opera sin personal"
        }
      ]
    },
    packages: {
      heading: "Alcances de implementación",
      subheading: "Cada operación es distinta: el alcance y la inversión se definen tras un diagnóstico sin costo.",
      pricesArePlaceholder: false,
      note: "La licencia del ERP (si aplica) corre por cuenta del cliente; existen alternativas open source sin costo de licencia. Los sistemas a la medida incluyen mensualidad de hosting y soporte; el hardware lo adquiere el cliente.",
      tiers: [
        {
          id: "esencial",
          name: "Puesta en marcha",
          tagline: "Los módulos esenciales funcionando",
          price: "Cotización a medida",
          priceNote: "según alcance",
          features: [
            "Diagnóstico de la operación",
            "Módulos base: ventas, inventario, compras",
            "Migración de sus datos",
            "Capacitación + soporte 30 días"
          ],
          ctaLabel: "Solicitar puesta en marcha"
        },
        {
          id: "integrado",
          name: "ERP integrado",
          tagline: "Conectado a toda la operación",
          price: "Cotización a medida",
          priceNote: "según alcance",
          highlight: true,
          features: [
            "Todos los módulos que la operación requiera",
            "Facturación CFDI 4.0 integrada",
            "Conexión con ecommerce, CRM y sus herramientas actuales",
            "Integración con hardware: lectores, básculas, impresoras",
            "Automatizaciones y reportes a la medida",
            "Capacitación + soporte 90 días"
          ],
          ctaLabel: "Solicitar ERP integrado"
        },
        {
          id: "medida",
          name: "Sistema de operación a la medida",
          tagline: "El negocio operando solo",
          price: "Cotización a medida",
          priceNote: "según alcance",
          features: [
            "Desarrollado desde cero para su modelo de negocio",
            "Reservas y pagos en línea",
            "Control de hardware por QR: chapas, sensores, dispensadores (IoT)",
            "Panel multi-sucursal con permisos por perfil",
            "El código es 100% suyo, sin licencias por usuario"
          ],
          ctaLabel: "Solicitar cotización"
        }
      ]
    },
    process: {
      heading: "Cómo implementamos su ERP",
      steps: [
        {
          step: 1,
          title: "Diagnóstico",
          description: "Mapeamos cómo vende, compra y factura su empresa hoy, área por área."
        },
        {
          step: 2,
          title: "Configuración y migración",
          description: "Módulos ajustados a su proceso, con productos, clientes e inventario migrados."
        },
        {
          step: 3,
          title: "Capacitación",
          description: "Entrenamos a su equipo con casos reales de su operación, por área."
        },
        {
          step: 4,
          title: "Acompañamiento",
          description: "Soporte durante las primeras semanas, hasta que el sistema se adopta."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Qué ERP usan?",
          answer: "Trabajamos con ERPs líderes y open source (como Odoo y ERPNext) y también desarrollamos sistemas a la medida. Recomendamos la mejor opción según su operación y presupuesto; muchas veces la alternativa open source elimina el costo de licencias."
        },
        {
          question: "¿Se puede facturar (CFDI) desde el ERP?",
          answer: "Sí. Integramos facturación electrónica CFDI 4.0 para facturar directo desde el sistema, ligado a ventas e inventario."
        },
        {
          question: "¿Migran los datos de Excel o del sistema actual?",
          answer: "Sí. La migración de productos, clientes, proveedores e inventario inicial está incluida en la implementación. Su empresa no empieza de cero."
        },
        {
          question: "¿Cuánto tarda la implementación?",
          answer: "Una puesta en marcha de módulos esenciales toma de 4 a 8 semanas. Un ERP integrado o a la medida depende del alcance; entregamos un plan con fechas claras desde el diagnóstico."
        },
        {
          question: "¿El precio incluye las licencias del ERP?",
          answer: "El plan cubre implementación, configuración, migración y capacitación. La licencia del ERP (si la herramienta la cobra) es aparte; con opciones open source ese costo puede ser cero."
        },
        {
          question: "¿Se integra con la tienda en línea o el CRM que ya usamos?",
          answer: "Sí. En el alcance integrado conectamos el ERP con ecommerce, CRM, pasarelas de pago y las herramientas que su equipo ya usa, para que la información fluya sin capturas dobles."
        },
        {
          question: "¿Pueden controlar puertas, máquinas o dispositivos físicos?",
          answer: "Sí. Desarrollamos sistemas con integración IoT: accesos con QR de un solo uso, chapas eléctricas, electroválvulas, dispensadores y sensores conectados al sistema. Así funcionan los negocios de autoservicio que operan sin personal fijo, con reservas y pagos en línea."
        },
        {
          question: "¿Integran básculas, lectores y equipo industrial?",
          answer: "Sí. Conectamos terminales de pesaje, básculas, lectores de código de barras e impresoras de etiquetas al sistema: pesaje guiado por receta, trazabilidad por lote e inventario en tiempo real, apto para industrias reguladas."
        },
        {
          question: "¿Sirve para varias sucursales?",
          answer: "Sí. El panel de administración soporta múltiples sucursales desde una sola cuenta: reportes consolidados, configuración por sucursal y permisos por perfil (usuario, administrador, dueño)."
        }
      ]
    },
    leadForm: {
      heading: "Solicite el diagnóstico de su operación",
      subheading: "Cuéntenos cómo controla hoy su operación y le proponemos el sistema adecuado, con alcance y fechas por escrito.",
      source: "landing-erp",
      defaultInterest: "Sistema ERP"
    },
    stickyCta: {
      label: "Solicitar diagnóstico",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Sistemas ERP y de Operación a la Medida | México",
      description: "Implementamos tu ERP a la medida: inventario, ventas, facturación CFDI y finanzas en un solo sistema. También sistemas de autoservicio con reservas, pagos, QR e IoT. Cotiza hoy.",
      keywords: [
        "implementación de ERP México",
        "ERP para pymes",
        "sistema ERP a la medida",
        "Odoo México",
        "ERP con facturación CFDI",
        "software de gestión empresarial",
        "sistema de autoservicio con QR",
        "software IoT para negocios",
        "sistema de reservas y pagos en línea"
      ],
      canonicalPath: "/servicios/erp",
      ogTitle: "Sistemas que Ordenan y Operan tu Negocio | MAW Soluciones",
      ogDescription: "ERP con inventario, ventas y facturación en un solo sistema — o un negocio de autoservicio que opera solo con reservas, pagos, QR e IoT."
    }
  },
  "podcast": {
    slug: "podcast",
    hero: {
      eyebrow: "Producción de podcast y video podcast",
      title: "Quieres lanzar tu podcast. Nosotros lo producimos profesionalmente.",
      subtitle: "Grabación, edición y distribución de tu podcast o video podcast con calidad de estudio. Tú llegas a hablar; nosotros nos encargamos de que se vea y suene increíble.",
      primaryCta: {
        label: "Cotizar mi podcast",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      },
      brochures: [
        { label: "Brochure Podcast", href: "/brochures/podcast.pdf" },
        { label: "Brochure Producción", href: "/brochures/podcast-produccion.pdf" }
      ]
    },
    trustBar: {
      items: [
        {
          label: "Audio con calidad de estudio"
        },
        {
          label: "Video podcast multicámara"
        },
        {
          label: "Clips para redes incluidos"
        },
        {
          label: "Distribución en plataformas"
        },
        {
          label: "Tú solo llegas a grabar"
        }
      ]
    },
    features: {
      heading: "Tu podcast, producido de principio a fin",
      subheading: "Del concepto a la publicación, con clips listos para que tu podcast crezca en redes.",
      cards: [
        {
          title: "Grabación profesional",
          description: "Audio limpio con micrófonos y tratamiento de estudio. La calidad de sonido es lo que hace que te escuchen."
        },
        {
          title: "Video podcast multicámara",
          description: "Grabamos con varias cámaras e iluminación para un video dinámico que destaca en YouTube y redes."
        },
        {
          title: "Edición y postproducción",
          description: "Cortamos silencios, mejoramos audio, agregamos intro, marca y dejamos cada episodio impecable."
        },
        {
          title: "Clips para redes",
          description: "Convertimos cada episodio en varios clips verticales listos para Reels, TikTok y Shorts."
        },
        {
          title: "Distribución",
          description: "Publicamos tu podcast en Spotify, Apple Podcasts, YouTube y donde tu audiencia esté."
        },
        {
          title: "Estrategia y formato",
          description: "Te ayudamos a definir el concepto, la estructura y los temas para que tu podcast tenga rumbo."
        }
      ]
    },
    qualification: {
      heading: "¿Un podcast es para ti?",
      subheading: "El podcast funciona con constancia y un mensaje claro. Revisa si encajas.",
      forYou: [
        "Quieres posicionarte como autoridad en tu industria o nicho.",
        "Tienes algo que decir y disfrutas (o quieres) conversar frente a cámara/micrófono.",
        "Buscas generar contenido que también alimente tus redes con clips.",
        "Estás dispuesto a publicar de forma constante (mínimo unos meses).",
        "Quieres delegar toda la parte técnica y creativa."
      ],
      notForYou: [
        "Esperas volverte famoso con uno o dos episodios.",
        "No tienes tiempo para grabar con regularidad.",
        "No tienes claro de qué tratará ni a quién le hablas.",
        "Buscas la opción más barata sin importar la calidad."
      ]
    },
    stats: {
      heading: "Por qué producir bien tu podcast importa",
      items: [
        {
          value: "+6",
          label: "Clips por episodio para redes"
        },
        {
          value: "Multi",
          label: "Cámaras para video dinámico"
        },
        {
          value: "Spotify+YT",
          label: "Distribución en plataformas"
        },
        {
          value: "Llave en mano",
          label: "Tú solo llegas a grabar"
        }
      ]
    },
    packages: {
      heading: "Planes de producción de podcast",
      subheading: "Mensualidad para mantener tu podcast publicando con calidad profesional.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. Incluye una jornada de grabación al mes (varios episodios). Renta de locación especial se cotiza aparte.",
      tiers: [
        {
          id: "audio",
          name: "Solo audio",
          tagline: "Lanza tu podcast",
          price: "$7,500",
          priceNote: "/ mes",
          features: [
            "1 jornada de grabación al mes",
            "Hasta 4 episodios de audio editados",
            "Audio con calidad de estudio",
            "Intro/outro con tu marca",
            "Distribución en Spotify y Apple Podcasts"
          ],
          ctaLabel: "Quiero solo audio"
        },
        {
          id: "video",
          name: "Video podcast",
          tagline: "El más completo",
          price: "$14,000",
          priceNote: "/ mes",
          highlight: true,
          features: [
            "1 jornada de grabación multicámara",
            "Hasta 4 episodios en video editados",
            "6+ clips verticales para redes",
            "Audio y color de nivel estudio",
            "Distribución en YouTube + plataformas",
            "Miniaturas y portadas incluidas"
          ],
          ctaLabel: "Quiero video podcast"
        },
        {
          id: "premium",
          name: "Podcast de marca",
          tagline: "Producción de alto impacto",
          price: "$22,000",
          priceNote: "/ mes",
          features: [
            "Grabación multicámara + set cuidado",
            "Episodios en video con motion gráficos",
            "12+ clips verticales optimizados",
            "Estrategia de temas e invitados",
            "Distribución y gestión en plataformas",
            "Reporte de desempeño mensual"
          ],
          ctaLabel: "Quiero el podcast de marca"
        }
      ]
    },
    process: {
      heading: "Cómo producimos tu podcast",
      steps: [
        {
          step: 1,
          title: "Concepto",
          description: "Definimos el formato, el tono, la estructura de los episodios y a quién le hablas."
        },
        {
          step: 2,
          title: "Grabación",
          description: "Grabamos con equipo profesional de audio y video. Tú solo llegas a conversar."
        },
        {
          step: 3,
          title: "Postproducción",
          description: "Editamos episodios, generamos clips para redes y aplicamos tu marca."
        },
        {
          step: 4,
          title: "Distribución",
          description: "Publicamos en las plataformas y te entregamos todo listo para crecer tu audiencia."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Dónde se graba?",
          answer: "Podemos grabar en estudio, en tu oficina con nuestro equipo portátil o en locación. Lo definimos según tu plan y concepto."
        },
        {
          question: "¿Necesito experiencia frente a cámara?",
          answer: "No. Te dirigimos durante la grabación y, en edición, cortamos titubeos y errores. Con la práctica te vas soltando episodio a episodio."
        },
        {
          question: "¿Los clips para redes están incluidos?",
          answer: "Sí, en los planes de video. Convertimos cada episodio en varios clips verticales listos para Reels, TikTok y Shorts."
        },
        {
          question: "¿Ustedes lo publican en Spotify y YouTube?",
          answer: "Sí. Nos encargamos de la distribución en las plataformas que correspondan a tu plan, con portadas y miniaturas incluidas."
        },
        {
          question: "¿Cada cuándo se graba?",
          answer: "Por lo general una jornada al mes en la que grabamos varios episodios, para que publiques de forma constante sin invertir mucho tiempo."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza la producción de tu podcast",
      subheading: "Cuéntanos tu idea de podcast y armamos una propuesta de producción a tu medida.",
      source: "landing-podcast",
      defaultInterest: "Producción de podcast"
    },
    stickyCta: {
      label: "Cotizar mi podcast",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Producción de Podcast y Video Podcast Profesional | México",
      description: "Grabación, edición y distribución de tu podcast o video podcast con calidad de estudio. Clips para redes incluidos. Tú solo llegas a grabar. Cotiza tu podcast hoy.",
      keywords: [
        "producción de podcast México",
        "grabar video podcast",
        "estudio de podcast",
        "edición de podcast profesional",
        "video podcast para empresas",
        "producción de podcast a la medida"
      ],
      canonicalPath: "/servicios/podcast",
      ogTitle: "Producción Profesional de Podcast y Video Podcast | MAW Soluciones",
      ogDescription: "Tu podcast producido de principio a fin con calidad de estudio y clips para redes. Tú solo llegas a hablar."
    }
  },
  "produccion-foto-video": {
    slug: "produccion-foto-video",
    hero: {
      eyebrow: "Producción de foto y video profesional",
      title: "Tu marca merece verse profesional. La producimos así.",
      subtitle: "Fotografía y video profesional para tu producto, servicio o marca: spots, video institucional, fotografía de producto y contenido publicitario que vende. Calidad que transmite confianza.",
      primaryCta: {
        label: "Cotizar mi producción",
        href: "#cotizar"
      },
      secondaryCta: {
        label: "Hablar por WhatsApp",
        href: WA
      }
    },
    trustBar: {
      items: [
        {
          label: "Foto y video de nivel profesional"
        },
        {
          label: "Spots y video institucional"
        },
        {
          label: "Dirección de arte cuidada"
        },
        {
          label: "Postproducción y color"
        },
        {
          label: "Entrega lista para usar"
        }
      ]
    },
    features: {
      heading: "Imágenes y video que hacen ver grande a tu marca",
      subheading: "Producción integral: idea, grabación y postproducción para material que de verdad vende.",
      cards: [
        {
          title: "Fotografía de producto",
          description: "Imágenes que hacen que tu producto se vea irresistible para catálogo, redes y e-commerce."
        },
        {
          title: "Video publicitario y spots",
          description: "Comerciales y videos para campañas que captan atención y comunican tu propuesta con impacto."
        },
        {
          title: "Video institucional",
          description: "Cuenta la historia de tu empresa con un video que genera confianza ante clientes y aliados."
        },
        {
          title: "Dirección de arte",
          description: "Cuidamos set, iluminación, estilo y composición para que cada toma comunique tu marca."
        },
        {
          title: "Postproducción premium",
          description: "Color, sonido, motion gráficos y retoque que llevan el material a nivel de marca grande."
        },
        {
          title: "Entrega lista para usar",
          description: "Recibes el material en los formatos que necesitas para redes, web, anuncios o impresos."
        }
      ]
    },
    qualification: {
      heading: "¿Esta producción es para ti?",
      subheading: "La producción profesional rinde cuando hay algo que comunicar con impacto. Revisa.",
      forYou: [
        "Tu producto o servicio se luce en imágenes y video de calidad.",
        "Vas a lanzar una campaña y necesitas material publicitario profesional.",
        "Tu marca se ve amateur y quieres una imagen a la altura de tu competencia.",
        "Necesitas fotos de producto para tu e-commerce, catálogo o redes.",
        "Valoras la calidad y entiendes que una buena producción es una inversión que vende."
      ],
      notForYou: [
        "Te alcanza con fotos de celular sin producción.",
        "Buscas el precio más bajo sin importar el resultado.",
        "No tienes claro qué quieres comunicar ni para qué usarás el material.",
        "Necesitas todo grabado para mañana sin planeación."
      ]
    },
    stats: {
      heading: "Por qué la producción profesional vale la pena",
      items: [
        {
          value: "x3",
          label: "Más confianza que fotos amateur"
        },
        {
          value: "4K",
          label: "Video en alta resolución"
        },
        {
          value: "Multi-formato",
          label: "Listo para redes, web y Ads"
        },
        {
          value: "Integral",
          label: "Idea, grabación y postproducción"
        }
      ]
    },
    packages: {
      heading: "Planes de producción de foto y video",
      subheading: "Por proyecto, según lo que necesites producir. Cotización a medida según el alcance.",
      pricesArePlaceholder: false,
      note: "Precios + IVA. Modelos, locaciones especiales, talento o renta de equipo extra se cotizan según el proyecto.",
      tiers: [
        {
          id: "sesion",
          name: "Sesión esencial",
          tagline: "Foto o video puntual",
          price: "Desde $9,000",
          priceNote: "/ proyecto",
          features: [
            "Media jornada de grabación",
            "Fotografía de producto o video corto",
            "Iluminación y dirección de arte básica",
            "Edición y retoque de las piezas finales",
            "Entrega en formatos para redes"
          ],
          ctaLabel: "Quiero una sesión"
        },
        {
          id: "produccion",
          name: "Producción de marca",
          tagline: "Foto + video integral",
          price: "Desde $20,000",
          priceNote: "/ proyecto",
          highlight: true,
          features: [
            "Jornada completa de grabación",
            "Foto de producto + video publicitario",
            "Dirección de arte e iluminación profesional",
            "Postproducción premium (color y sonido)",
            "Clips/cortes para redes y un master principal",
            "Entrega multi-formato"
          ],
          ctaLabel: "Quiero la producción de marca"
        },
        {
          id: "campana",
          name: "Campaña / spot",
          tagline: "Producción de alto impacto",
          price: "Cotización a medida",
          priceNote: "según alcance",
          features: [
            "Preproducción y guion creativo",
            "Producción multicámara con equipo completo",
            "Spot publicitario + paquete fotográfico",
            "Motion gráficos y postproducción avanzada",
            "Locaciones y talento (según alcance)",
            "Entregables para campaña completa"
          ],
          ctaLabel: "Solicitar cotización"
        }
      ]
    },
    process: {
      heading: "Cómo producimos tu material",
      steps: [
        {
          step: 1,
          title: "Brief creativo",
          description: "Definimos qué quieres comunicar, dónde lo usarás y el estilo visual de la producción."
        },
        {
          step: 2,
          title: "Preproducción",
          description: "Planeamos set, iluminación, tomas y logística para aprovechar al máximo la jornada."
        },
        {
          step: 3,
          title: "Producción",
          description: "Grabamos y fotografiamos con equipo profesional y dirección de arte cuidada."
        },
        {
          step: 4,
          title: "Postproducción",
          description: "Editamos, aplicamos color y sonido, y entregamos en todos los formatos que necesitas."
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuánto cuesta una producción?",
          answer: "Depende del alcance (horas, locaciones, tipo de video). Una sesión esencial arranca desde $9,000; una producción de marca desde $20,000. Te cotizamos a la medida tras conocer tu proyecto."
        },
        {
          question: "¿Graban en mi negocio o en estudio?",
          answer: "Donde mejor convenga al proyecto: en tu local, en estudio o en locación. Lo definimos en la preproducción."
        },
        {
          question: "¿En qué formatos entregan?",
          answer: "Entregamos en los formatos que necesites: vertical para redes, horizontal para YouTube/web, alta resolución para impresos y versiones para anuncios."
        },
        {
          question: "¿Incluye modelos o talento?",
          answer: "El talento, modelos o locaciones especiales se cotizan según el proyecto. Te asesoramos y gestionamos todo si lo necesitas."
        },
        {
          question: "¿Cuánto tarda la entrega?",
          answer: "La fotografía suele entregarse en pocos días; el video, de 1 a 3 semanas según la complejidad de la postproducción. Lo acordamos desde el inicio."
        }
      ]
    },
    leadForm: {
      heading: "Cotiza tu producción de foto y video",
      subheading: "Cuéntanos qué necesitas producir y te preparamos una propuesta a la medida de tu proyecto.",
      source: "landing-produccion-foto-video",
      defaultInterest: "Producción de foto y video"
    },
    stickyCta: {
      label: "Cotizar mi producción",
      href: "#cotizar",
      whatsappHref: WA
    },
    metadata: {
      title: "Producción de Foto y Video Profesional para Marcas | México",
      description: "Fotografía y video profesional para tu producto, marca o campaña: spots, video institucional y foto de producto que venden. Producción integral. Cotiza tu proyecto hoy.",
      keywords: [
        "producción de video México",
        "fotografía de producto profesional",
        "video publicitario para empresas",
        "producción audiovisual",
        "spot publicitario México",
        "video institucional empresa"
      ],
      canonicalPath: "/servicios/produccion-foto-video",
      ogTitle: "Producción Profesional de Foto y Video | MAW Soluciones",
      ogDescription: "Fotografía y video que hacen ver grande a tu marca: spots, video institucional y foto de producto que venden. Cotiza tu producción."
    }
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


import { Course, Topic } from './course-data';
import { PlaceHolderImages } from './placeholder-images';

const courseTopics: Topic[] = [
    // Section 1
    {
      topic_id: "tt_1_1",
      section_id: 1,
      title: "Por qué TikTok no es (solo) una red social",
      video_url: "",
      duration: "15 min",
      summary: [
        "**Motor de Descubrimiento:** Comprenderás por qué TikTok es un motor de entretenimiento y descubrimiento, no una red social tradicional.",
        "**El Algoritmo 'For You Page':** Descubrirás cómo funciona el algoritmo y por qué el contenido de calidad puede viralizarse sin tener seguidores.",
        "**Cultura y Lenguaje de TikTok:** Aprenderás sobre tendencias, sonidos, y el tipo de contenido que resuena con la audiencia.",
      ],
      questions: [],
      completed: false,
      order: 1,
      image: PlaceHolderImages.find(p => p.id === 'user-photo-1')
    },
    {
      topic_id: "tt_1_2",
      section_id: 1,
      title: "Anatomía de la Plataforma Publicitaria de TikTok",
      video_url: "",
      duration: "20 min",
      summary: [
        "**TikTok Ads Manager:** Crearás tu cuenta publicitaria y te familiarizarás con la interfaz.",
        "**Estructura de Campaña:** Entenderás la jerarquía: Campaña > Grupo de Anuncios > Anuncio.",
        "**Instalación del Píxel de TikTok:** Aprenderás a instalar el píxel en tu sitio web para medir conversiones.",
      ],
      questions: [],
      completed: false,
      order: 2,
      image: PlaceHolderImages.find(p => p.id === 'user-photo-2')
    },
    {
      topic_id: "tt_1_3",
      section_id: 1,
      title: "Objetivos de Campaña en TikTok",
      video_url: "",
      duration: "15 min",
      summary: [
        "**Fases del Embudo:** Conocerás los objetivos de Alcance, Consideración (Tráfico, Vistas de video) y Conversión.",
        "**Alineación con Metas de Negocio:** Elegirás el objetivo correcto según si quieres branding, leads o ventas.",
        "**Tipos de Anuncios:** Diferenciarás entre In-Feed Ads, TopView, Branded Hashtag Challenges y Branded Effects.",
      ],
      questions: [],
      completed: false,
      order: 3,
      image: PlaceHolderImages.find(p => p.id === 'user-photo-3')
    },
    {
        topic_id: "tt_1_4",
        section_id: 1,
        title: "Examen: Fundamentos de TikTok Ads",
        video_url: "",
        duration: "10 min",
        summary: [],
        questions: [
            {
                "question": "La principal diferencia de TikTok con otras redes es que funciona como un:",
                "options": [
                    "Álbum de fotos familiar.",
                    "Plataforma de mensajería profesional.",
                    "Motor de descubrimiento y entretenimiento.",
                    "Portal de noticias."
                ],
                "correct": 2
            },
            {
                "question": "¿Qué es el Píxel de TikTok?",
                "options": [
                    "Un filtro para hacer los videos más bonitos.",
                    "Un código que se instala en tu web para medir las acciones de los usuarios (visitas, compras, etc.).",
                    "El tamaño mínimo de un video.",
                    "Una herramienta para editar videos."
                ],
                "correct": 1
            },
            {
                "question": "Un 'Branded Hashtag Challenge' es un tipo de anuncio que:",
                "options": [
                    "Aparece en el feed de los usuarios.",
                    "Invita a los usuarios a crear contenido usando un hashtag de tu marca.",
                    "Es un banner en la parte superior de la app.",
                    "Solo se puede ver en la versión de escritorio."
                ],
                "correct": 1
            },
            {
                "question": "El algoritmo de la 'For You Page' se basa principalmente en:",
                "options": [
                    "La cantidad de seguidores que tienes.",
                    "La calidad y relevancia del contenido para cada usuario individual.",
                    "El número de hashtags que usas.",
                    "La hora en que publicas."
                ],
                "correct": 1
            },
            {
                "question": "Si tu objetivo es llevar gente a tu tienda online, ¿qué objetivo de campaña deberías elegir?",
                "options": [
                    "Alcance",
                    "Interacción",
                    "Tráfico o Conversiones",
                    "Reproducciones de video"
                ],
                "correct": 2
            }
        ],
        completed: false,
        order: 4
    },
    // Section 2
    {
        topic_id: "tt_2_1",
        section_id: 2,
        title: "Mentalidad 'Don't Make Ads, Make TikToks'",
        video_url: "",
        duration: "20 min",
        summary: [
            "**Contenido Nativo:** Entenderás por qué los anuncios pulidos y corporativos fallan en TikTok.",
            "**Autenticidad y Lo-Fi:** Aprenderás a crear contenido que se sienta real, grabado con un teléfono.",
            "**Hook, Story, Offer:** Dominarás la estructura de 3 segundos para un video exitoso: gancho visual, desarrollo de la historia y oferta.",
        ],
        questions: [],
        completed: false,
        order: 1,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-4')
    },
    {
        topic_id: "tt_2_2",
        section_id: 2,
        title: "Uso de Tendencias y Sonidos Virales",
        video_url: "",
        duration: "20 min",
        summary: [
            "**El Creative Center de TikTok:** Descubrirás cómo encontrar tendencias, sonidos y hashtags populares.",
            "**Adaptación a tu Marca:** Aprenderás a unirte a una tendencia de forma creativa y relevante para tu negocio.",
            "**Derechos de Autor:** Entenderás la diferencia entre la librería de sonidos comerciales y los sonidos en tendencia.",
        ],
        questions: [],
        completed: false,
        order: 2,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-5')
    },
    {
        topic_id: "tt_2_3",
        section_id: 2,
        title: "El Poder del Contenido Generado por Usuarios (UGC)",
        video_url: "",
        duration: "20 min",
        summary: [
            "**¿Qué es el UGC?:** Comprenderás por qué los testimonios de clientes reales son el tipo de anuncio más efectivo.",
            "**Spark Ads:** Aprenderás a usar anuncios que potencian un TikTok orgánico existente (tuyo o de otro creador).",
            "**Colaboración con Creadores:** Descubrirás cómo encontrar y colaborar con creadores de contenido para generar anuncios auténticos.",
        ],
        questions: [],
        completed: false,
        order: 3,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-6')
    },
    {
        topic_id: "tt_2_4",
        section_id: 2,
        title: "Examen: El ADN de un TikTok Exitoso",
        video_url: "",
        duration: "15 min",
        summary: [],
        questions: [
            {
                "question": "La filosofía 'Don't Make Ads, Make TikToks' significa:",
                "options": [
                    "Que los anuncios no deben vender nada.",
                    "Crear contenido que se integre de forma nativa y auténtica en la plataforma.",
                    "Hacer videos muy largos y detallados.",
                    "Usar solo música clásica en tus anuncios."
                ],
                "correct": 1
            },
            {
                "question": "Un 'Spark Ad' es un formato publicitario que te permite:",
                "options": [
                    "Crear un anuncio desde cero en el Ads Manager.",
                    "Promocionar un video de TikTok ya existente, ya sea tuyo o de otro creador (con su permiso).",
                    "Poner un banner en la página principal.",
                    "Crear un filtro de realidad aumentada."
                ],
                "correct": 1
            },
            {
                "question": "El 'Hook' en un video de TikTok se refiere a:",
                "options": [
                    "La música que usas.",
                    "Los primeros 1-3 segundos del video, diseñados para captar la atención inmediatamente.",
                    "La llamada a la acción al final.",
                    "El título del video."
                ],
                "correct": 1
            },
            {
                "question": "¿Por qué es tan efectivo el Contenido Generado por Usuarios (UGC)?",
                "options": [
                    "Porque es más barato de producir.",
                    "Porque es percibido como más auténtico y confiable que un anuncio tradicional.",
                    "Porque siempre usa los sonidos de moda.",
                    "Porque es más fácil de editar."
                ],
                "correct": 1
            },
            {
                "question": "El 'Creative Center' de TikTok es una herramienta para:",
                "options": [
                    "Editar tus videos con efectos especiales.",
                    "Pagar tus campañas de anuncios.",
                    "Encontrar inspiración, tendencias, sonidos y hashtags populares.",
                    "Contactar al soporte técnico de TikTok."
                ],
                "correct": 2
            }
        ],
        completed: false,
        order: 4
    },
    // Section 3
    {
        topic_id: "tt_3_1",
        section_id: 3,
        title: "Opciones de Segmentación en TikTok",
        video_url: "",
        duration: "20 min",
        summary: [
            "**Segmentación Demográfica y por Intereses:** Aprenderás a llegar a tu público por edad, ubicación, e intereses.",
            "**Segmentación por Comportamiento:** Descubrirás cómo impactar a usuarios según su comportamiento en la app (interacción con videos, creadores).",
            "**Audiencias Personalizadas y Similares:** Utilizarás tus propios datos (listas de clientes, visitantes de la web) para crear audiencias de alto valor.",
        ],
        questions: [],
        completed: false,
        order: 1,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-1')
    },
    {
        topic_id: "tt_3_2",
        section_id: 3,
        title: "Estrategias de Presupuesto y Puja",
        video_url: "",
        duration: "20 min",
        summary: [
            "**Presupuesto Diario vs. Total:** Sabrás cuál elegir según la duración y el objetivo de tu campaña.",
            "**Optimización del Presupuesto de Campaña (CBO):** Entenderás cómo dejar que el algoritmo distribuya tu inversión de forma inteligente.",
            "**Estrategias de Puja:** Conocerás las pujas por costo más bajo, costo tope y valor para maximizar tu ROI.",
        ],
        questions: [],
        completed: false,
        order: 2,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-2')
    },
    {
        topic_id: "tt_3_3",
        section_id: 3,
        title: "La Fase de Aprendizaje del Algoritmo",
        video_url: "",
        duration: "10 min",
        summary: [
            "**¿Qué es la Fase de Aprendizaje?:** Comprenderás por qué tus campañas necesitan tiempo y datos para optimizarse.",
            "**Requisitos para Salir de la Fase de Aprendizaje:** Sabrás cuántas conversiones necesita tu campaña para estabilizarse.",
            "**Cómo Evitar Errores Comunes:** Aprenderás a no hacer cambios bruscos que reinicien la fase de aprendizaje.",
        ],
        questions: [],
        completed: false,
        order: 3,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-3')
    },
    {
        topic_id: "tt_3_4",
        section_id: 3,
        title: "Examen: Dirigiendo tus Anuncios",
        video_url: "",
        duration: "10 min",
        summary: [],
        questions: [
            {
                "question": "La 'segmentación por comportamiento' en TikTok te permite llegar a usuarios que:",
                "options": [
                    "Viven en una ciudad específica.",
                    "Tienen cierta edad.",
                    "Han interactuado con videos de una categoría particular (ej. comedia, cocina).",
                    "Tienen un iPhone."
                ],
                "correct": 2
            },
            {
                "question": "¿Qué es una 'Audiencia Personalizada'?",
                "options": [
                    "Un grupo de gente famosa.",
                    "Una audiencia creada a partir de tus propios datos, como una lista de emails o visitantes de tu web.",
                    "Una audiencia basada en intereses generales.",
                    "La audiencia total de TikTok."
                ],
                "correct": 1
            },
            {
                "question": "¿Qué es la 'Fase de Aprendizaje'?",
                "options": [
                    "El tiempo que tardas en aprender a usar la plataforma.",
                    "Un error que ocurre si tu anuncio es rechazado.",
                    "El período inicial en que el algoritmo de TikTok recopila datos para aprender a quién mostrarle tu anuncio.",
                    "Una sección de ayuda en el Ads Manager."
                ],
                "correct": 2
            },
            {
                "question": "La 'Optimización del Presupuesto de Campaña' (CBO) significa que:",
                "options": [
                    "Tú asignas un presupuesto fijo a cada grupo de anuncios.",
                    "El presupuesto se asigna a nivel de campaña y el algoritmo lo distribuye entre los grupos de anuncios.",
                    "Tu presupuesto se gasta el doble de rápido.",
                    "Solo puedes usar un grupo de anuncios."
                ],
                "correct": 1
            },
            {
                "question": "Hacer cambios significativos en un grupo de anuncios durante la fase de aprendizaje puede causar que:",
                "options": [
                    "Tu campaña tenga mejores resultados inmediatamente.",
                    "La fase de aprendizaje se reinicie, afectando el rendimiento.",
                    "Tu presupuesto se reduzca a la mitad.",
                    "Tu cuenta sea suspendida."
                ],
                "correct": 1
            }
        ],
        completed: false,
        order: 4
    },
    // Section 4
    {
        topic_id: "tt_4_1",
        section_id: 4,
        title: "Introducción a TikTok Shop",
        video_url: "",
        duration: "15 min",
        summary: [
            "**¿Qué es TikTok Shop?:** Entenderás cómo funciona el e-commerce integrado de TikTok.",
            "**Configuración de tu Tienda:** Aprenderás a registrarte, conectar tus cuentas y configurar tu tienda.",
            "**Subida de Productos:** Conocerás el proceso para subir tu catálogo de productos a la plataforma.",
        ],
        questions: [],
        completed: false,
        order: 1,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-4')
    },
    {
        topic_id: "tt_4_2",
        section_id: 4,
        title: "Estrategias de Venta en TikTok Shop",
        video_url: "",
        duration: "15 min",
        summary: [
            "**Video Shopping Ads:** Aprenderás a crear anuncios que permiten a los usuarios comprar directamente desde el video.",
            "**LIVE Shopping:** Descubrirás el poder de las transmisiones en vivo para mostrar productos y generar ventas en tiempo real.",
            "**Promoción de Productos:** Conocerás las herramientas para destacar productos específicos en tus videos orgánicos.",
        ],
        questions: [],
        completed: false,
        order: 2,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-5')
    },
    {
        topic_id: "tt_4_3",
        section_id: 4,
        title: "Optimización y Análisis de tu Tienda",
        video_url: "",
        duration: "15 min",
        summary: [
            "**Métricas de TikTok Shop:** Analizarás los datos de ventas, tráfico y conversión de tu tienda.",
            "**Optimización de Fichas de Producto:** Aprenderás a crear títulos, descripciones e imágenes que venden.",
            "**Marketing de Afiliados:** Descubrirás cómo puedes colaborar con creadores para que vendan tus productos a cambio de una comisión.",
        ],
        questions: [],
        completed: false,
        order: 3,
        image: PlaceHolderImages.find(p => p.id === 'user-photo-6')
    },
    {
        topic_id: "tt_4_4",
        section_id: 4,
        title: "Examen Final: El Vendedor de TikTok",
        video_url: "",
        duration: "10 min",
        summary: [],
        questions: [
            {
                "question": "¿Qué son los 'Video Shopping Ads'?",
                "options": [
                    "Anuncios que solo se muestran en YouTube.",
                    "Anuncios en formato video dentro de TikTok que tienen un enlace directo para comprar el producto mostrado.",
                    "Videos orgánicos que no se pueden promocionar.",
                    "Anuncios que aparecen solo en la sección de mensajes."
                ],
                "correct": 1
            },
            {
                "question": "Una de las grandes ventajas de LIVE Shopping es:",
                "options": [
                    "Que solo se puede hacer una vez al mes.",
                    "La capacidad de interactuar con la audiencia en tiempo real, responder preguntas y crear un sentido de urgencia para comprar.",
                    "Que no necesitas mostrar los productos.",
                    "Que es completamente automático."
                ],
                "correct": 1
            },
            {
                "question": "El marketing de afiliados en TikTok Shop permite a:",
                "options": [
                    "Cualquier usuario obtener tus productos gratis.",
                    "Los creadores de contenido promocionar tus productos y ganar una comisión por cada venta.",
                    "Tu competencia vender tus productos.",
                    "Vender tus productos en otras plataformas."
                ],
                "correct": 1
            },
            {
                "question": "Para configurar tu TikTok Shop, el primer paso es:",
                "options": [
                    "Tener 1 millón de seguidores.",
                    "Registrarte en el TikTok Shop Seller Center y vincular tus cuentas.",
                    "Crear un video viral.",
                    "Enviar tus productos a las oficinas de TikTok."
                ],
                "correct": 1
            },
            {
                "question": "Optimizar la 'ficha de producto' en TikTok Shop implica:",
                "options": [
                    "Poner el precio lo más alto posible.",
                    "Usar títulos claros, descripciones detalladas y fotos de alta calidad.",
                    "Ocultar la información de envío.",
                    "Escribir todo en mayúsculas."
                ],
                "correct": 1
            }
        ],
        completed: false,
        order: 4
    }
];

export const courseData: Course = {
  title: "Curso Básico de TikTok: Ads y Shop",
  description: "Aprende a crear contenido, lanzar anuncios y vender productos en la plataforma de video corto.",
  total_sections: 4,
  total_topics: 16,
  total_duration: "4 horas",
  sections: [
    {
      section_id: 1,
      title: "Conociendo el Terreno de Juego",
      order: 1,
      duration: "1h",
      completed: false,
      topics: courseTopics.filter(t => t.section_id === 1),
    },
    {
        section_id: 2,
        title: "Contenido que Conecta y Vende",
        order: 2,
        duration: "1h 15min",
        completed: false,
        topics: courseTopics.filter(t => t.section_id === 2),
    },
    {
        section_id: 3,
        title: "Publicidad Pagada (TikTok Ads)",
        order: 3,
        duration: "1h",
        completed: false,
        topics: courseTopics.filter(t => t.section_id === 3),
    },
    {
        section_id: 4,
        title: "Tu Tienda en TikTok (TikTok Shop)",
        order: 4,
        duration: "45min",
        completed: false,
        topics: courseTopics.filter(t => t.section_id === 4),
    }
  ],
};

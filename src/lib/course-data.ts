
import { ImagePlaceholder } from './placeholder-images';

export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface Topic {
  topic_id: string;
  section_id: number;
  title: string;
  video_url: string;
  duration: string;
  summary: string[];
  questions: Question[];
  completed: boolean;
  order: number;
  image?: ImagePlaceholder;
}

export interface Section {
  section_id: number;
  title: string;
  order: number;
  duration: string;
  completed: boolean;
  topics: Topic[];
}

export interface Course {
  title: string;
  description: string;
  total_sections: number;
  total_topics: number;
  total_duration: string;
  sections: Section[];
}

export const courseData: Course = {
  title: "Curso Completo de Facebook Ads para Principiantes",
  description: "Aprende desde cero a crear campañas efectivas",
  total_sections: 6,
  total_topics: 24,
  total_duration: "8 horas",
  sections: [
    {
      section_id: 1,
      title: "Conociendo Facebook Ads",
      order: 1,
      duration: "45 min",
      completed: false,
      topics: [
        {
          topic_id: "1_1",
          section_id: 1,
          title: "¿Qué es Facebook Ads?",
          video_url: "",
          duration: "10 min",
          summary: [
            "**Fundamentos de la Publicidad Pagada:** Entenderás la diferencia clave entre alcance orgánico y pagado y por qué necesitas ambos.",
            "**Ecosistema de Meta:** Conocerás cómo se conectan Facebook, Instagram, Messenger y WhatsApp para la publicidad.",
            "**Análisis de Casos de Éxito:** Verás ejemplos reales de cómo empresas mexicanas han triunfado usando la plataforma.",
          ],
          questions: [],
          completed: false,
          order: 1,
        },
        {
          topic_id: "1_2",
          section_id: 1,
          title: "Anatomía del Administrador de Anuncios",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Navegación Fluida:** Te moverás con confianza por el Business Manager, encontrando cada herramienta que necesitas.",
            "**Estructura Jerárquica:** Dominarás la lógica de Campaña > Conjunto de Anuncios > Anuncio, la base de toda campaña exitosa.",
            "**Configuración Financiera:** Aprenderás a configurar tu cuenta publicitaria y método de pago de forma segura.",
          ],
          questions: [],
          completed: false,
          order: 2,
        },
        {
            topic_id: "1_3",
            section_id: 1,
            title: "Objetivos de Campaña: ¿Qué quieres lograr?",
            video_url: "",
            duration: "12 min",
            summary: [
                "**Claridad Estratégica:** Sabrás diferenciar entre objetivos de Reconocimiento, Consideración y Conversión.",
                "**Selección Inteligente:** Elegirás el objetivo de campaña que se alinea perfectamente con tu meta de negocio.",
                "**Aplicación Práctica:** Podrás diseñar la estrategia inicial para un e-commerce, un restaurante o un servicio profesional."
            ],
            questions: [],
            completed: false,
            order: 3,
        },
        {
            topic_id: "1_4",
            section_id: 1,
            title: "Examen: Fundamentos de Facebook Ads",
            video_url: "",
            duration: "8 min",
            summary: [],
            questions: [
                 {
                    "question": "¿Cuál es la estructura jerárquica correcta en el Administrador de Anuncios de Meta?",
                    "options": [
                        "Anuncio > Campaña > Conjunto de Anuncios",
                        "Conjunto de Anuncios > Campaña > Anuncio",
                        "Campaña > Conjunto de Anuncios > Anuncio",
                        "Campaña > Anuncio > Conjunto de Anuncios"
                    ],
                    "correct": 2
                },
                {
                    "question": "Si tu objetivo es conseguir que la gente se registre en un formulario en tu sitio web, ¿qué tipo de objetivo de campaña deberías elegir?",
                    "options": [
                        "Reconocimiento de marca",
                        "Alcance",
                        "Interacción",
                        "Conversiones"
                    ],
                    "correct": 3
                },
                {
                    "question": "¿Qué es el Administrador de Anuncios (Ads Manager)?",
                    "options": [
                        "Una red social para empresas.",
                        "La herramienta principal para crear y gestionar campañas en Meta.",
                        "Una aplicación para editar fotos y videos.",
                        "Un servicio para comprar seguidores."
                    ],
                    "correct": 1
                },
                {
                    "question": "Ver casos de éxito de otras empresas en Facebook Ads te ayuda a:",
                    "options": [
                        "Copiar sus anuncios exactamente.",
                        "Entender qué estrategias funcionan y adaptarlas a tu negocio.",
                        "Saber cuánto dinero gastan.",
                        "Conocer a sus empleados."
                    ],
                    "correct": 1
                },
                 {
                    "question": "¿Cuál es la principal ventaja de la publicidad pagada sobre el alcance orgánico?",
                    "options": [
                        "Es siempre más barata.",
                        "Llega a más gente de forma garantizada.",
                        "Permite una segmentación muy precisa del público.",
                        "No requiere creatividad en los anuncios."
                    ],
                    "correct": 2
                }
            ],
            completed: false,
            order: 4,
        },
      ],
    },
    {
        section_id: 2,
        title: "Segmentación y Públicos",
        order: 2,
        duration: "1h 15 min",
        completed: false,
        topics: [
            {
                topic_id: "2_1",
                section_id: 2,
                title: "Creando tu Buyer Persona",
                video_url: "",
                duration: "15 min",
                summary: [
                    "**Definición de Cliente Ideal:** Sabrás exactamente a quién le estás hablando, más allá de datos demográficos.",
                    "**Investigación de Audiencia:** Utilizarás herramientas para descubrir los verdaderos intereses y dolores de tu público.",
                    "**Perfil Completo:** Construirás un Buyer Persona detallado, incluyendo sus motivaciones y comportamientos."
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "2_2",
                section_id: 2,
                title: "Públicos Guardados: Intereses y Comportamientos",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Dominio de la Segmentación Detallada:** Navegarás con soltura por las opciones de intereses y comportamientos de Meta.",
                    "**Descubrimiento de Nichos:** Aprenderás técnicas para encontrar audiencias específicas que tu competencia ignora.",
                    "**Precisión Quirúrgica:** Utilizarás la combinación y exclusión de públicos para afinar tu segmentación al máximo."
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "2_3",
                section_id: 2,
                title: "Públicos Personalizados: Tu Activo Más Valioso",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Aprovechamiento de Datos Propios:** Crearás públicos a partir de tu lista de clientes para re-impactarlos.",
                    "**Estrategias de Retargeting:** Implementarás campañas para usuarios que ya visitaron tu sitio web, aumentando la conversión.",
                    "**Engagement Profundo:** Construirás públicos basados en la interacción con tus perfiles de Facebook e Instagram."
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "2_4",
                section_id: 2,
                title: "Examen: Dominio de Audiencias",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Qué es un 'Buyer Persona'?",
                        "options": [
                            "Cualquier persona que compra tu producto.",
                            "Un perfil detallado y semi-ficticio de tu cliente ideal.",
                            "Un empleado de tu empresa encargado de las compras.",
                            "Una celebridad que promociona tu marca."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Un 'Público Personalizado' se puede crear a partir de:",
                        "options": [
                            "Intereses como 'viajes' o 'comida'.",
                            "Personas que han visitado tu sitio web o tu lista de emails.",
                            "Personas que viven en una ciudad específica.",
                            "Personas que le dieron like a la página de tu competencia."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué es un 'Público Similar' (Lookalike)?",
                        "options": [
                            "Un grupo de personas con los mismos nombres.",
                            "Una copia exacta de tu público personalizado.",
                            "Una nueva audiencia que Meta encuentra basándose en las características de un público de origen (como tus mejores clientes).",
                            "Un grupo de personas que siguen a los mismos influencers."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "¿Para qué sirve el 'retargeting'?",
                        "options": [
                            "Para llegar a gente que nunca ha oído hablar de ti.",
                            "Para volver a mostrar anuncios a personas que ya han interactuado con tu marca.",
                            "Para excluir a gente que no te interesa.",
                            "Para copiar la estrategia de tu competencia."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Al segmentar por 'intereses', ¿qué tipo de audiencia estás construyendo?",
                        "options": [
                            "Un público caliente que ya te conoce.",
                            "Un público personalizado basado en tus datos.",
                            "Un público frío que podría estar interesado en lo que ofreces.",
                            "Un público similar a tus seguidores."
                        ],
                        "correct": 2
                    }
                ],
                completed: false,
                order: 4
            }
        ]
    },
    {
        section_id: 3,
        title: "Creación de Anuncios que Impactan",
        order: 3,
        duration: "1h 30 min",
        completed: false,
        topics: [
            {
                topic_id: "3_1",
                section_id: 3,
                title: "Formatos de Anuncio: Imagen vs. Video vs. Carrusel",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Decisión Estratégica de Formato:** Sabrás qué formato usar según tu objetivo y tipo de producto.",
                    "**Optimización Técnica:** Conocerás las especificaciones y tamaños recomendados para cada ubicación.",
                    "**Maximización de Impacto:** Aprenderás cuándo un video es más efectivo que una imagen o cómo un carrusel puede contar una historia."
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "3_2",
                section_id: 3,
                title: "Copywriting para Anuncios: El Arte de Persuadir",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Estructura Persuasiva:** Dominarás la fórmula Gancho-Problema-Solución-CTA para escribir textos que venden.",
                    "**Técnicas de Storytelling:** Aprenderás a conectar emocionalmente con tu audiencia a través de historias.",
                    "**Adaptación de Mensaje:** Sabrás cómo ajustar tu copy para diferentes públicos y etapas del embudo de ventas."
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "3_3",
                section_id: 3,
                title: "Diseño Visual para Anuncios con Canva",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Principios de Diseño Publicitario:** Entenderás los fundamentos de color, tipografía y composición para anuncios.",
                    "**Creación Práctica en Canva:** Diseñarás un anuncio de imagen atractivo y profesional desde cero.",
                    "**Producción de Video Corto:** Aprenderás a crear videos dinámicos para Reels y Stories que capturan la atención."
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "3_4",
                section_id: 3,
                title: "Examen: El Anuncio Perfecto",
                video_url: "",
                duration: "20 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Cuál es el primer elemento de la fórmula de copywriting Gancho-Problema-Solución-CTA?",
                        "options": [
                            "La Solución",
                            "El Gancho (Hook)",
                            "La Llamada a la Acción (CTA)",
                            "El Problema"
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué formato de anuncio es ideal para contar una historia secuencial o mostrar varios productos a la vez?",
                        "options": [
                            "Imagen única",
                            "Video",
                            "Carrusel",
                            "Anuncio de texto"
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Un buen CTA (Llamada a la Acción) debe ser:",
                        "options": [
                            "Largo y muy descriptivo.",
                            "Vago, para generar curiosidad.",
                            "Claro, directo y orientado a la acción.",
                            "El mismo para todas las campañas."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Al diseñar un anuncio en Canva, ¿qué principio es fundamental?",
                        "options": [
                            "Usar la mayor cantidad de colores posible.",
                            "Poner mucho texto sobre la imagen.",
                            "Asegurar un buen contraste y legibilidad.",
                            "Utilizar siempre la misma plantilla."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "El 'storytelling' en un anuncio sirve para:",
                        "options": [
                            "Listar las características técnicas de un producto.",
                            "Conectar emocionalmente con la audiencia y hacer el mensaje memorable.",
                            "Cumplir con las políticas de publicidad de Meta.",
                            "Aumentar el costo del anuncio."
                        ],
                        "correct": 1
                    }
                ],
                completed: false,
                order: 4
            }
        ]
    },
    {
        section_id: 4,
        title: "Presupuesto y Pujas",
        order: 4,
        duration: "1h",
        completed: false,
        topics: [
            {
                topic_id: "4_1",
                section_id: 4,
                title: "¿Cuánto Invertir? Presupuesto Diario vs. Total",
                video_url: "",
                duration: "15 min",
                summary: [
                    "**Control de Gasto:** Aprenderás a decidir entre un presupuesto diario (flexible) o total (fijo).",
                    "**Cálculo de Presupuesto Inicial:** Descubrirás un método simple para saber cuánto invertir al empezar sin arriesgar de más.",
                    "**Escalado Seguro:** Conocerás cómo aumentar tu inversión de forma rentable cuando una campaña funciona."
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "4_2",
                section_id: 4,
                title: "Entendiendo las Pujas: ¿Subasta de Anuncios?",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Concepto de Puja:** Entenderás que Facebook es una subasta y cómo compites por la atención del usuario.",
                    "**Puja Automática (Menor Costo):** Aprenderás a dejar que el algoritmo de Meta encuentre el costo más bajo por resultado.",
                    "**Cuándo Usar Pujas Manuales:** Sabrás en qué situaciones específicas puede ser útil tomar el control y fijar un costo máximo."
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "4_3",
                section_id: 4,
                title: "Optimización del Presupuesto (CBO)",
                video_url: "",
                duration: "15 min",
                summary: [
                    "**¿Qué es CBO?:** Comprenderás cómo el algoritmo distribuye tu presupuesto entre los públicos que mejor funcionan.",
                    "**Ventajas de CBO:** Descubrirás por qué CBO simplifica la gestión y maximiza los resultados.",
                    "**Errores Comunes:** Evitarás los fallos más habituales que limitan la eficacia de CBO."
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "4_4",
                section_id: 4,
                title: "Examen: El Dinero Inteligente",
                video_url: "",
                duration: "10 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Cuándo es recomendable usar un 'Presupuesto Total' en lugar de uno diario?",
                        "options": [
                            "Para campañas que quieres que duren para siempre.",
                            "Para campañas cortas con fechas de inicio y fin definidas (ej. una promoción de fin de semana).",
                            "Cuando no sabes cuánto quieres gastar.",
                            "Nunca es recomendable."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué significa 'CBO' (Campaign Budget Optimization)?",
                        "options": [
                            "Que el presupuesto se asigna manualmente a cada conjunto de anuncios.",
                            "Que Meta distribuye automáticamente el presupuesto de la campaña entre los conjuntos de anuncios más rendidores.",
                            "Que el presupuesto solo se gasta en un conjunto de anuncios.",
                            "Una estrategia para no gastar presupuesto."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "La estrategia de puja de 'Menor Costo' busca:",
                        "options": [
                            "Conseguir el mayor número de clics posible, sin importar el precio.",
                            "Gastar el presupuesto obteniendo la mayor cantidad de resultados al menor costo posible.",
                            "Maximizar el valor de conversión, buscando un retorno específico.",
                            "Mostrar el anuncio a la mayor cantidad de gente."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué es una ventaja de usar pujas automáticas (Advantage+)?",
                        "options": [
                            "Tienes control total y manual sobre cada centavo.",
                            "Son más complicadas de configurar.",
                            "Permiten que la IA de Meta optimice las pujas en tiempo real para conseguir los mejores resultados.",
                            "Siempre son más baratas."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Si activas la 'Programación de anuncios', puedes:",
                        "options": [
                            "Decidir la hora exacta en que se crean tus anuncios.",
                            "Elegir los días y horas específicas en que se mostrarán tus anuncios.",
                            "Pagar solo por los anuncios mostrados de noche.",
                            "Hacer que tus anuncios se muestren el doble de veces."
                        ],
                        "correct": 1
                    }
                ],
                completed: false,
                order: 4
            }
        ]
    },
    {
        section_id: 5,
        title: "Métricas y Optimización",
        order: 5,
        duration: "1h 30 min",
        completed: false,
        topics: [
            {
                topic_id: "5_1",
                section_id: 5,
                title: "Métricas Clave: ¿Qué Debes Medir?",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Interpretación de Métricas:** Entenderás a fondo indicadores como CTR, CPC, CPA, ROAS y Frecuencia.",
                    "**Dashboard Personalizado:** Configurarás tus columnas en el Administrador de Anuncios para ver solo lo que importa.",
                    "**Enfoque en Resultados:** Distinguirás entre las 'métricas de vanidad' y las que realmente impactan en tu negocio."
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "5_2",
                section_id: 5,
                title: "Interpretando los Resultados de tus Campañas",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Análisis de Informes:** Aprenderás a leer e interpretar los reportes de rendimiento de tus campañas.",
                    "**Diagnóstico de Embudos:** Identificarás los puntos débiles en tu embudo de conversión donde pierdes clientes.",
                    "**Obtención de Insights:** Utilizarás los desgloses por edad, ubicación o dispositivo para entender mejor a tu audiencia."
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "5_3",
                section_id: 5,
                title: "Pruebas A/B para Optimización Continua",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Metodología de Pruebas:** Sabrás qué elementos de tus anuncios (creatividades, públicos, copys) puedes y debes probar.",
                    "**Configuración de Experimentos:** Implementarás pruebas A/B de manera correcta para obtener datos fiables.",
                    "**Toma de Decisiones Basada en Datos:** Analizarás los resultados de tus pruebas para optimizar tus campañas de forma continua."
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "5_4",
                section_id: 5,
                title: "Examen: El Optimizador Maestro",
                video_url: "",
                duration: "20 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Qué significa 'ROAS'?",
                        "options": [
                            "Retorno sobre la Actividad Social.",
                            "Retorno Sobre la Inversión Publicitaria (Return On Ad Spend).",
                            "Ritmo de Optimización de Anuncios y Segmentos.",
                            "Registro de Objetivos de Alcance y Servicio."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Un CTR (Click-Through Rate) alto generalmente indica que:",
                        "options": [
                            "Tu anuncio es relevante e interesante para la audiencia.",
                            "Tu presupuesto es demasiado bajo.",
                            "Tu puja es demasiado alta.",
                            "El anuncio se ha mostrado pocas veces."
                        ],
                        "correct": 0
                    },
                    {
                        "question": "Si tu 'Frecuencia' es muy alta (ej. 10), podría significar que:",
                        "options": [
                            "Estás llegando a mucha gente nueva.",
                            "La misma gente está viendo tu anuncio demasiadas veces, lo que puede causar fatiga.",
                            "Tu campaña es muy exitosa.",
                            "Tu costo por clic (CPC) es muy bajo."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué es una 'Prueba A/B'?",
                        "options": [
                            "Una prueba para ver si el anuncio gusta a la audiencia A o a la B.",
                            "Un experimento donde comparas dos versiones de un anuncio (cambiando una sola variable) para ver cuál funciona mejor.",
                            "Una forma de duplicar tu presupuesto.",
                            "Una revisión de la ortografía y gramática del anuncio."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El 'CPA' (Costo Por Adquisición o Acción) mide:",
                        "options": [
                            "Cuánto te cuesta que alguien vea tu anuncio.",
                            "Cuánto te cuesta que alguien haga clic en tu anuncio.",
                            "Cuánto te cuesta conseguir una acción específica (como una compra o un registro).",
                            "El costo total de la campaña."
                        ],
                        "correct": 2
                    }
                ],
                completed: false,
                order: 4
            }
        ]
    },
    {
        section_id: 6,
        title: "Estrategias Avanzadas y Futuro",
        order: 6,
        duration: "1h",
        completed: false,
        topics: [
            {
                topic_id: "6_1",
                section_id: 6,
                title: "Estrategias de Retargeting Avanzado",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Embudos de Retargeting:** Crearás secuencias de anuncios basadas en el tiempo y la interacción del usuario.",
                    "**Retargeting Dinámico:** Implementarás anuncios de producto dinámicos para recuperar carritos abandonados en e-commerce.",
                    "**Recuperación de Clientes:** Aplicarás estrategias específicas para volver a conectar con clientes antiguos."
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "6_2",
                section_id: 6,
                title: "Campañas de Generación de Leads (Lead Ads)",
                video_url: "",
                duration: "15 min",
                summary: [
                    "**Formularios Instantáneos:** Configurarás campañas de Lead Ads que capturan datos sin que el usuario salga de Facebook.",
                    "**Integración con CRM:** Conectarás tus formularios con tu CRM o sistema de email para un seguimiento inmediato.",
                    "**Cualificación de Leads:** Aprenderás a usar los campos del formulario para cualificar a tus prospectos."
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "6_3",
                section_id: 6,
                title: "Anuncios para Mensajes (WhatsApp y Messenger)",
                video_url: "",
                duration: "15 min",
                summary: [
                    "**Marketing Conversacional:** Utilizarás anuncios para iniciar conversaciones de venta directamente en WhatsApp y Messenger.",
                    "**Automatización de Respuestas:** Configurarás respuestas automáticas para gestionar las consultas iniciales.",
                    "**Casos de Uso Prácticos:** Implementarás campañas de mensajes para agendar citas, dar cotizaciones y ofrecer soporte."
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "6_4",
                section_id: 6,
                title: "Examen Final: Estratega Digital",
                video_url: "",
                duration: "10 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Cuál es el objetivo principal de una campaña de 'Retargeting Dinámico'?",
                        "options": [
                            "Mostrar anuncios a gente nueva.",
                            "Mostrar a un usuario el producto exacto que vio en tu sitio web pero no compró.",
                            "Enviar mensajes de WhatsApp a todos tus contactos.",
                            "Aumentar los seguidores de tu página."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Las 'Lead Ads' o Anuncios para Clientes Potenciales son especialmente útiles porque:",
                        "options": [
                            "Son los anuncios más baratos de todos.",
                            "Permiten capturar la información del usuario (nombre, email) en un formulario rápido dentro de Facebook/Instagram.",
                            "Garantizan que el usuario comprará tu producto.",
                            "Solo se muestran en formato de video."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué es una ventaja de las campañas de 'Clic a Mensaje' (WhatsApp/Messenger)?",
                        "options": [
                            "Inician una conversación directa e inmediata con un cliente potencial.",
                            "Son completamente automáticas y no requieren intervención humana.",
                            "Son la única forma de conseguir ventas.",
                            "No tienen costo alguno."
                        ],
                        "correct": 0
                    },
                    {
                        "question": "Ante las nuevas políticas de privacidad (como las de iOS 14+), una estrategia clave para el futuro es:",
                        "options": [
                            "Dejar de hacer publicidad en Meta.",
                            "Enfocarse en recolectar datos de primera mano (first-party data) con el consentimiento del usuario.",
                            "Ignorar las políticas y seguir como antes.",
                            "Comprar bases de datos de terceros."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "La IA de 'Advantage+' en Meta busca principalmente:",
                        "options": [
                            "Limitar la creatividad del anunciante.",
                            "Simplificar la creación de campañas y automatizar la optimización para encontrar los mejores resultados.",
                            "Aumentar el costo de la publicidad.",
                            "Reducir el alcance de los anuncios."
                        ],
                        "correct": 1
                    }
                ],
                completed: false,
                order: 4
            }
        ]
    }
  ],
};

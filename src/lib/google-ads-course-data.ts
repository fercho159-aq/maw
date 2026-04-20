
import { Course } from './course-data';

export const courseData: Course = {
  title: "Curso Esencial de Google Ads",
  description: "Aprende a crear y optimizar campañas en la red de búsqueda y Display para capturar clientes con alta intención de compra.",
  total_sections: 5,
  total_topics: 20,
  total_duration: "7 horas",
  sections: [
    {
      section_id: 1,
      title: "Introducción a Google Ads",
      order: 1,
      duration: "1h",
      completed: false,
      topics: [
        {
          topic_id: "ga_1_1",
          section_id: 1,
          title: "¿Qué es Google Ads y por qué es fundamental?",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Marketing de Intención:** Entenderás la diferencia entre interrumpir (redes sociales) y satisfacer una necesidad (búsqueda).",
            "**Ecosistema de Google:** Conocerás los distintos tipos de campañas: Búsqueda, Display, YouTube, Shopping y Performance Max.",
            "**Glosario Esencial:** Dominarás términos como CPC, CPM, CTR, Nivel de Calidad y Ranking del Anuncio.",
          ],
          questions: [],
          completed: false,
          order: 1,
        },
        {
          topic_id: "ga_1_2",
          section_id: 1,
          title: "Creación y Estructura de una Cuenta",
          video_url: "",
          duration: "20 min",
          summary: [
            "**Configuración Inicial:** Crearás tu cuenta de Google Ads desde cero, incluyendo la configuración de facturación.",
            "**Anatomía de la Cuenta:** Comprenderás la jerarquía: Cuenta > Campaña > Grupo de Anuncios > Anuncio/Palabra Clave.",
            "**Navegación en la Interfaz:** Te familiarizarás con el dashboard y las herramientas principales de la plataforma.",
          ],
          questions: [],
          completed: false,
          order: 2,
        },
        {
          topic_id: "ga_1_3",
          section_id: 1,
          title: "Definiendo Objetivos y KPIs",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Objetivos de Campaña:** Aprenderás a alinear tus campañas con objetivos de negocio (ventas, leads, tráfico).",
            "**Métricas de Éxito (KPIs):** Definirás qué indicadores clave de rendimiento (KPIs) son los más importantes para tu objetivo.",
            "**Seguimiento de Conversiones:** Entenderás la importancia de medir las acciones valiosas en tu sitio web.",
          ],
          questions: [],
          completed: false,
          order: 3,
        },
        {
            topic_id: "ga_1_4",
            section_id: 1,
            title: "Examen: Fundamentos de Google Ads",
            video_url: "",
            duration: "10 min",
            summary: [],
            questions: [
                {
                    "question": "¿Cuál es la principal ventaja de la red de Búsqueda de Google Ads?",
                    "options": [
                        "Es la más barata.",
                        "Permite llegar a usuarios que están buscando activamente una solución o producto.",
                        "Solo muestra anuncios en video.",
                        "No requiere palabras clave."
                    ],
                    "correct": 1
                },
                {
                    "question": "El 'Nivel de Calidad' (Quality Score) es una métrica que Google usa para calificar la relevancia de tus:",
                    "options": [
                        "Palabras clave, anuncios y landing pages.",
                        "Datos de facturación.",
                        "Competidores.",
                        "Seguidores en redes sociales."
                    ],
                    "correct": 0
                },
                {
                    "question": "La estructura correcta de una cuenta de Google Ads es:",
                    "options": [
                        "Grupo de Anuncios > Campaña > Cuenta",
                        "Cuenta > Grupo de Anuncios > Campaña",
                        "Cuenta > Campaña > Grupo de Anuncios",
                        "Campaña > Cuenta > Grupo de Anuncios"
                    ],
                    "correct": 2
                },
                {
                    "question": "Si tu objetivo es que los usuarios llenen un formulario de contacto, ¿cuál sería el KPI más importante?",
                    "options": [
                        "Impresiones",
                        "Costo por Clic (CPC)",
                        "Costo por Adquisición (CPA) o Conversión",
                        "Click-Through Rate (CTR)"
                    ],
                    "correct": 2
                },
                {
                    "question": "¿Qué tipo de campaña usarías para mostrar banners gráficos en sitios web y apps asociados a Google?",
                    "options": [
                        "Campaña de Búsqueda",
                        "Campaña de Display",
                        "Campaña de Shopping",
                        "Campaña de Aplicación"
                    ],
                    "correct": 1
                }
            ],
            completed: false,
            order: 4
        }
      ],
    },
    {
        section_id: 2,
        title: "Campañas de Búsqueda Exitosas",
        order: 2,
        duration: "1h 30min",
        completed: false,
        topics: [
            {
                topic_id: "ga_2_1",
                section_id: 2,
                title: "Investigación de Palabras Clave (Keyword Research)",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Intención de Búsqueda:** Diferenciarás entre palabras clave informativas, transaccionales y de navegación.",
                    "**Herramientas de Investigación:** Utilizarás el Planificador de Palabras Clave de Google y otras herramientas.",
                    "**Selección Estratégica:** Aprenderás a elegir palabras clave con buen volumen de búsqueda y competencia manejable.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "ga_2_2",
                section_id: 2,
                title: "Tipos de Concordancia de Palabras Clave",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Concordancia Amplia:** Entenderás cuándo usarla y cómo controlarla con la IA de Google.",
                    "**Concordancia de Frase y Exacta:** Aprenderás a usar estas concordancias para tener mayor control sobre dónde aparecen tus anuncios.",
                    "**Palabras Clave Negativas:** Descubrirás por qué son cruciales para evitar gastar dinero en clics irrelevantes.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "ga_2_3",
                section_id: 2,
                title: "Creación de Anuncios de Texto Atractivos",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Copywriting para Búsqueda:** Escribirás titulares y descripciones que resuenen con la intención del usuario.",
                    "**Anuncios de Búsqueda Responsivos (RSA):** Aprenderás a proporcionar múltiples elementos para que Google cree el mejor anuncio.",
                    "**Extensiones de Anuncios:** Utilizarás extensiones de enlace, llamada, ubicación y más para hacer tus anuncios más grandes y útiles.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "ga_2_4",
                section_id: 2,
                title: "Examen: El Arte de la Búsqueda",
                video_url: "",
                duration: "20 min",
                summary: [],
                questions: [
                    {
                        "question": "La palabra clave [zapatos rojos de mujer] es un ejemplo de concordancia:",
                        "options": [
                            "Amplia",
                            "De Frase",
                            "Exacta",
                            "Negativa"
                        ],
                        "correct": 2
                    },
                    {
                        "question": "¿Para qué sirven las palabras clave negativas?",
                        "options": [
                            "Para aparecer en búsquedas negativas.",
                            "Para evitar que tu anuncio se muestre en búsquedas irrelevantes.",
                            "Para mejorar el sentimiento de tu marca.",
                            "Son palabras clave que no cuestan dinero."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Una palabra clave como 'reparación de lavadoras a domicilio' tiene una intención de búsqueda:",
                        "options": [
                            "Informativa",
                            "De navegación",
                            "Transaccional",
                            "Social"
                        ],
                        "correct": 2
                    },
                    {
                        "question": "¿Qué son las 'extensiones de anuncios'?",
                        "options": [
                            "Una forma de hacer los anuncios más largos y costosos.",
                            "Información adicional (como teléfono, dirección, enlaces extra) que se añade a tus anuncios para hacerlos más útiles y visibles.",
                            "Un tipo de palabra clave.",
                            "Anuncios que solo se muestran en extensiones de Chrome."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "En los Anuncios de Búsqueda Responsivos (RSA), tú proporcionas:",
                        "options": [
                            "Un solo titular y una sola descripción.",
                            "Múltiples titulares y descripciones para que Google los combine y encuentre la mejor versión.",
                            "Solo imágenes y videos.",
                            "Un guion para que un robot lo lea."
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
        section_id: 3,
        title: "Campañas de Display y YouTube",
        order: 3,
        duration: "1h 15min",
        completed: false,
        topics: [
            {
                topic_id: "ga_3_1",
                section_id: 3,
                title: "Introducción a la Red de Display",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**El Poder del Alcance Visual:** Comprenderás el potencial de la Red de Display para generar reconocimiento de marca.",
                    "**Formatos de Anuncios Gráficos:** Conocerás los diferentes tamaños de banners y los anuncios de display responsivos.",
                    "**Costos en Display:** Entenderás el modelo de costo por mil impresiones (CPM) y su aplicación.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "ga_3_2",
                section_id: 3,
                title: "Opciones de Segmentación en Display",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Segmentación por Audiencia:** Llegarás a usuarios por sus intereses, datos demográficos y comportamientos (públicos afines).",
                    "**Segmentación por Contenido:** Colocarás tus anuncios en sitios web, videos o temas específicos.",
                    "**Remarketing en Display:** Re-impactarás con anuncios gráficos a usuarios que ya visitaron tu sitio.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "ga_3_3",
                section_id: 3,
                title: "Publicidad en YouTube: Formatos y Estrategias",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Anuncios In-Stream (Saltables y no Saltables):** Aprenderás cuándo usar cada formato para máximo impacto.",
                    "**Anuncios In-Feed (Discovery):** Descubrirás cómo aparecer en los resultados de búsqueda de YouTube.",
                    "**Segmentación para Video:** Utilizarás las mismas potentes opciones de segmentación de Google en tus campañas de video.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "ga_3_4",
                section_id: 3,
                title: "Examen: Más Allá de la Búsqueda",
                video_url: "",
                duration: "10 min",
                summary: [],
                questions: [
                    {
                        "question": "La Red de Display de Google es ideal para objetivos de:",
                        "options": [
                            "Ventas directas e inmediatas.",
                            "Reconocimiento de marca (awareness) y alcance.",
                            "Soporte técnico.",
                            "Búsquedas de alta intención."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Si quieres mostrar tus banners en un blog de cocina específico, ¿qué tipo de segmentación usarías?",
                        "options": [
                            "Segmentación por Audiencia (Público afín).",
                            "Segmentación Demográfica.",
                            "Segmentación por Contenido (Emplazamientos).",
                            "Remarketing."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Un anuncio de video que aparece antes de un video de YouTube y que puedes omitir después de 5 segundos es un anuncio:",
                        "options": [
                            "In-Stream saltable.",
                            "Bumper (no saltable de 6 seg).",
                            "In-Feed.",
                            "Masthead."
                        ],
                        "correct": 0
                    },
                    {
                        "question": "El 'Remarketing' en Display te permite mostrar anuncios a:",
                        "options": [
                            "Usuarios que nunca han oído de ti.",
                            "Usuarios que ya han visitado tu sitio web.",
                            "Usuarios que son tu competencia.",
                            "Solo a tus empleados."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El modelo de costo más común en campañas de Display orientadas a awareness es:",
                        "options": [
                            "Costo Por Clic (CPC).",
                            "Costo Por Adquisición (CPA).",
                            "Costo Por Mil Impresiones (CPM).",
                            "Retorno de la Inversión Publicitaria (ROAS)."
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
        section_id: 4,
        title: "Optimización y Medición",
        order: 4,
        duration: "1h 30min",
        completed: false,
        topics: [
            {
                topic_id: "ga_4_1",
                section_id: 4,
                title: "Instalación del Seguimiento de Conversiones",
                video_url: "",
                duration: "30 min",
                summary: [
                    "**La Etiqueta de Google (Google Tag):** Aprenderás a instalarla en tu sitio web usando Google Tag Manager.",
                    "**Creación de Acciones de Conversión:** Definirás qué acciones quieres medir (compras, formularios, llamadas).",
                    "**Verificación y Debugging:** Comprobarás que tus conversiones se estén midiendo correctamente.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "ga_4_2",
                section_id: 4,
                title: "Análisis del Nivel de Calidad (Quality Score)",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Los 3 Componentes del Nivel de Calidad:** Entenderás la importancia del CTR esperado, la relevancia del anuncio y la experiencia de la página de destino.",
                    "**Cómo Mejorar tu Nivel de Calidad:** Aplicarás técnicas para aumentar tu QS y pagar menos por clic.",
                    "**Impacto en el Ranking y el Costo:** Verás la relación directa entre un buen Nivel de Calidad y el éxito de tus campañas.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "ga_4_3",
                section_id: 4,
                title: "Estrategias de Optimización de Campañas",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Optimización de Palabras Clave:** Aprenderás a pausar keywords de bajo rendimiento y a descubrir nuevas oportunidades.",
                    "**Optimización de Anuncios:** Realizarás pruebas A/B de tus anuncios para mejorar el CTR y la conversión.",
                    "**Optimización de Landing Pages:** Conocerás las mejores prácticas para crear páginas de destino que conviertan.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "ga_4_4",
                section_id: 4,
                title: "Examen: El Optimizador Experto",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Cuál de estos NO es un componente del Nivel de Calidad?",
                        "options": [
                            "CTR esperado",
                            "Relevancia del anuncio",
                            "Experiencia de la página de destino",
                            "Presupuesto diario de la campaña"
                        ],
                        "correct": 3
                    },
                    {
                        "question": "¿Por qué es crucial instalar el seguimiento de conversiones?",
                        "options": [
                            "Porque Google te obliga a hacerlo.",
                            "Para saber qué campañas, anuncios y palabras clave están generando resultados reales de negocio.",
                            "Para que tus anuncios se vean más bonitos.",
                            "Para aumentar tu número de seguidores."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Una 'prueba A/B' en Google Ads consiste en:",
                        "options": [
                            "Probar dos presupuestos diferentes.",
                            "Comparar dos versiones de un anuncio cambiando una sola variable para ver cuál funciona mejor.",
                            "Mostrar tu anuncio en dos países diferentes.",
                            "Apagar y prender la campaña."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Si una palabra clave tiene muchas impresiones pero un CTR muy bajo, ¿qué podría indicar?",
                        "options": [
                            "Que es una palabra clave excelente.",
                            "Que tu anuncio no es lo suficientemente relevante o atractivo para la gente que la busca.",
                            "Que tu landing page es muy lenta.",
                            "Que necesitas aumentar el presupuesto."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "La forma recomendada de instalar la etiqueta de Google Ads en tu sitio es a través de:",
                        "options": [
                            "Enviándola por correo electrónico a Google.",
                            "Editando directamente el código de cada página.",
                            "Usando Google Tag Manager.",
                            "Publicándola en redes sociales."
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
        section_id: 5,
        title: "Estrategias Avanzadas y Performance Max",
        order: 5,
        duration: "1h 15min",
        completed: false,
        topics: [
            {
                topic_id: "ga_5_1",
                section_id: 5,
                title: "Introducción a Performance Max (PMax)",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**¿Qué es PMax?:** Entenderás cómo funcionan estas campañas basadas en IA que abarcan todo el inventario de Google.",
                    "**Grupos de Recursos:** Aprenderás a proporcionar a Google los 'ingredientes' (textos, imágenes, videos) para que cree los anuncios.",
                    "**Señales de Audiencia:** Descubrirás cómo guiar a la IA de Google proporcionando información sobre tu público objetivo.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "ga_5_2",
                section_id: 5,
                title: "Estrategias de Remarketing en Búsqueda (RLSA)",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**El poder de RLSA:** Aprenderás a ajustar tus pujas o mostrar anuncios diferentes a usuarios que ya conocen tu marca.",
                    "**Casos de Uso Prácticos:** Implementarás RLSA para aumentar la conversión de visitantes recurrentes.",
                    "**Combinación con otras audiencias:** Descubrirás cómo combinar listas de remarketing con otros tipos de segmentación.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "ga_5_3",
                section_id: 5,
                title: "Google Analytics 4 y Google Ads",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Vinculación de Cuentas:** Aprenderás a conectar GA4 y Google Ads para compartir datos valiosos.",
                    "**Importación de Audiencias:** Crearás audiencias en GA4 y las usarás para segmentar en Google Ads.",
                    "**Análisis Post-Clic:** Utilizarás GA4 para entender qué hacen los usuarios en tu sitio después de hacer clic en un anuncio.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "ga_5_4",
                section_id: 5,
                title: "Examen Final: El Estratega de Google Ads",
                video_url: "",
                duration: "10 min",
                summary: [],
                questions: [
                    {
                        "question": "Las campañas de Performance Max (PMax) se caracterizan por:",
                        "options": [
                            "Ser campañas manuales donde controlas todo.",
                            "Funcionar solo en la Red de Búsqueda.",
                            "Estar basadas en IA y mostrar anuncios en todo el inventario de Google (Búsqueda, Display, YouTube, etc.).",
                            "No requerir seguimiento de conversiones."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Una estrategia de RLSA (Remarketing Lists for Search Ads) te permite:",
                        "options": [
                            "Mostrar anuncios solo a gente nueva.",
                            "Aumentar la puja para usuarios que ya han visitado tu sitio cuando vuelven a buscar tus palabras clave.",
                            "Bloquear a usuarios que ya te compraron.",
                            "Crear anuncios de video para YouTube."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Vincular Google Analytics 4 (GA4) con Google Ads te permite:",
                        "options": [
                            "Obtener un descuento en tu factura de Google.",
                            "Crear audiencias más sofisticadas en GA4 y usarlas para remarketing en Google Ads.",
                            "Hacer que tus anuncios sean más grandes.",
                            "Evitar que la competencia vea tus anuncios."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "En una campaña PMax, los 'Grupos de Recursos' (Asset Groups) son:",
                        "options": [
                            "Las palabras clave que quieres usar.",
                            "El conjunto de creatividades (textos, imágenes, videos) que le das a Google para que cree los anuncios.",
                            "Los países donde se mostrará tu campaña.",
                            "El presupuesto que asignas a la campaña."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Las 'Señales de Audiencia' en PMax sirven para:",
                        "options": [
                            "Garantizar que solo esa audiencia verá los anuncios.",
                            "Guiar a la IA de Google, dándole un punto de partida sobre quién es tu cliente ideal.",
                            "Bloquear a ciertos tipos de usuarios.",
                            "Definir el color de tus anuncios."
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

    
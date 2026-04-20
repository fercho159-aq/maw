
import { Course } from './course-data';

export const courseData: Course = {
  title: "Curso de Técnicas de Venta Modernas",
  description: "Desde el Social Selling hasta el cierre, aprende las metodologías que funcionan en la era digital.",
  total_sections: 4,
  total_topics: 16,
  total_duration: "5 horas",
  sections: [
    {
      section_id: 1,
      title: "El Vendedor del Siglo XXI",
      order: 1,
      duration: "1h",
      completed: false,
      topics: [
        {
          topic_id: "v_1_1",
          section_id: 1,
          title: "De Vendedor a Asesor de Confianza",
          video_url: "",
          duration: "15 min",
          summary: [
            "**El cambio de paradigma:** Entenderás por qué el 'vendedor agresivo' ya no funciona.",
            "**Construcción de Confianza:** Aprenderás que la venta moderna se basa en la confianza y el valor, no en la presión.",
            "**Escucha Activa:** Dominarás la habilidad de escuchar para entender las verdaderas necesidades del cliente, no solo para responder.",
          ],
          questions: [],
          completed: false,
          order: 1,
        },
        {
          topic_id: "v_1_2",
          section_id: 1,
          title: "Psicología de la Venta: Entendiendo al Comprador",
          video_url: "",
          duration: "20 min",
          summary: [
            "**Disparadores Mentales (Gatillos):** Conocerás los principios de persuasión como la reciprocidad, la escasez y la prueba social.",
            "**El 'Viaje del Comprador' (Buyer's Journey):** Identificarás las etapas por las que pasa un cliente antes de comprar (descubrimiento, consideración, decisión).",
            "**Venta Emocional vs. Racional:** Aprenderás a conectar con la parte emocional del cerebro del cliente, que es la que toma las decisiones.",
          ],
          questions: [],
          completed: false,
          order: 2,
        },
        {
          topic_id: "v_1_3",
          section_id: 1,
          title: "Tu Marca Personal como Vendedor",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Por qué la gente te compra a TI:** Descubrirás que tu marca personal es tu mayor diferenciador.",
            "**Optimización de tu Perfil de LinkedIn:** Convertirás tu perfil en una herramienta de atracción de clientes.",
            "**Creación de Contenido de Valor:** Aprenderás a compartir tu conocimiento para posicionarte como un experto en tu sector.",
          ],
          questions: [],
          completed: false,
          order: 3,
        },
        {
            topic_id: "v_1_4",
            section_id: 1,
            title: "Examen: La Nueva Mentalidad de Ventas",
            video_url: "",
            duration: "10 min",
            summary: [],
            questions: [
                {
                    "question": "El rol del vendedor moderno ha evolucionado de ser un 'vendedor' a un...",
                    "options": [
                        "Hablador persistente.",
                        "Asesor de confianza.",
                        "Lector de guiones.",
                        "Tomador de pedidos."
                    ],
                    "correct": 1
                },
                {
                    "question": "El principio de 'Prueba Social' se refiere a que:",
                    "options": [
                        "La gente quiere probar los productos antes de comprar.",
                        "Las personas tienden a seguir las acciones de la multitud y confían en los testimonios.",
                        "Hay que probar socialmente que eres un buen vendedor.",
                        "Las redes sociales no son para vender."
                    ],
                    "correct": 1
                },
                {
                    "question": "El 'Viaje del Comprador' (Buyer's Journey) describe las etapas de:",
                    "options": [
                        "Descubrimiento, Consideración y Decisión.",
                        "Interés, Negociación y Cierre.",
                        "Llamada, Reunión y Venta.",
                        "Marketing, Ventas y Soporte."
                    ],
                    "correct": 0
                },
                {
                    "question": "¿Por qué es importante tu 'Marca Personal' como vendedor?",
                    "options": [
                        "Para ser famoso en Instagram.",
                        "Porque la gente confía y le compra a personas que conoce y en las que confía, no a logos.",
                        "Para que tu jefe te pague más.",
                        "No es importante, solo el producto importa."
                    ],
                    "correct": 1
                },
                {
                    "question": "La 'escucha activa' en ventas significa:",
                    "options": [
                        "Esperar tu turno para hablar.",
                        "Interrumpir al cliente para corregirlo.",
                        "Escuchar con la intención de comprender profundamente las necesidades y dolores del cliente.",
                        "Tomar notas de todo lo que dice el cliente para usarlo en su contra."
                    ],
                    "correct": 2
                }
            ],
            completed: false,
            order: 4
        }
      ],
    },
    {
        section_id: 2,
        title: "Prospección Inteligente",
        order: 2,
        duration: "1h 15min",
        completed: false,
        topics: [
            {
                topic_id: "v_2_1",
                section_id: 2,
                title: "Definiendo tu Perfil de Cliente Ideal (ICP)",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Más allá del Buyer Persona:** Aprenderás a definir las características de las EMPRESAS a las que quieres vender (para B2B).",
                    "**Criterios de Calificación:** Establecerás los factores que hacen a un cliente un buen cliente (tamaño, industria, presupuesto).",
                    "**Enfoque de Recursos:** Descubrirás por qué enfocarte en tu ICP te ahorra tiempo y aumenta tu tasa de éxito.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "v_2_2",
                section_id: 2,
                title: "Social Selling: Encontrando Clientes en LinkedIn",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Optimización de Búsquedas:** Utilizarás los filtros avanzados de LinkedIn para encontrar a tus clientes ideales.",
                    "**Estrategia de Conexión:** Aprenderás a enviar mensajes de conexión personalizados que no sean ignorados.",
                    "**Engagement Inteligente:** Descubrirás cómo interactuar con el contenido de tus prospectos para construir una relación antes de vender.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "v_2_3",
                section_id: 2,
                title: "La Prospección en Frío que Sí Funciona (Cold Email 2.0)",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Personalización a Escala:** Aprenderás a escribir correos fríos que se sientan 1-a-1, usando investigación previa.",
                    "**La Estructura de un Buen Email Frío:** Dominarás el arte de un asunto atractivo y un cuerpo de correo corto y centrado en el valor.",
                    "**Seguimiento (Follow-up) sin ser Molesto:** Implementarás una cadencia de seguimiento que aporta valor en cada email.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "v_2_4",
                section_id: 2,
                title: "Examen: El Arte de Encontrar Clientes",
                video_url: "",
                duration: "10 min",
                summary: [],
                questions: [
                    {
                        "question": "El 'Perfil de Cliente Ideal' (ICP) se enfoca en definir:",
                        "options": [
                            "La personalidad del comprador.",
                            "Las características de las empresas ideales a las que quieres vender.",
                            "Tus competidores principales.",
                            "Tu estrategia de precios."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "'Social Selling' en LinkedIn implica principalmente:",
                        "options": [
                            "Enviar spam a cientos de personas con un mensaje genérico.",
                            "Publicar fotos de tus vacaciones.",
                            "Construir relaciones interactuando con el contenido de tus prospectos y aportando valor antes de vender.",
                            "Pagar por anuncios de LinkedIn."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "¿Cuál es el error más común en los mensajes de conexión de LinkedIn?",
                        "options": [
                            "Ser demasiado corto.",
                            "Intentar vender inmediatamente en el primer mensaje.",
                            "No poner tu cargo.",
                            "Ser demasiado amigable."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El 'Cold Email 2.0' se diferencia del email masivo tradicional porque se enfoca en:",
                        "options": [
                            "Enviar el mismo email a miles de personas.",
                            "La personalización y la investigación previa del prospecto.",
                            "Tener asuntos muy largos y detallados.",
                            "Adjuntar siempre un catálogo de productos."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Una buena estrategia de seguimiento (follow-up) consiste en:",
                        "options": [
                            "Enviar cada día el mismo email que dice '¿Viste mi email anterior?'.",
                            "Aportar nuevo valor o un insight diferente en cada mensaje de seguimiento.",
                            "Llamar por teléfono inmediatamente si no responden.",
                            "Rendirse después del primer intento."
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
        title: "El Proceso de Venta Consultiva",
        order: 3,
        duration: "1h 30min",
        completed: false,
        topics: [
            {
                topic_id: "v_3_1",
                section_id: 3,
                title: "La Llamada de Descubrimiento",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Objetivo de la Llamada:** Entenderás que el objetivo no es vender, sino diagnosticar.",
                    "**Preguntas Poderosas:** Aprenderás a hacer preguntas abiertas que revelen los verdaderos 'dolores' del cliente.",
                    "**Calificación de Oportunidades:** Utilizarás frameworks como BANT o MEDDIC para saber si un prospecto es un buen encaje.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "v_3_2",
                section_id: 3,
                title: "La Presentación de la Solución (Demo)",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**De Características a Beneficios:** Aprenderás a presentar tu producto no por lo que HACE, sino por el PROBLEMA que RESUELVE.",
                    "**Demo Personalizada:** Realizarás demostraciones que se centran específicamente en los dolores descubiertos en la llamada anterior.",
                    "**Storytelling en la Demo:** Utilizarás historias de éxito de clientes similares para generar confianza y visualización.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "v_3_3",
                section_id: 3,
                title: "Manejo de Objeciones",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Las Objeciones como Señales de Interés:** Cambiarás tu mentalidad para ver las objeciones como oportunidades, no como rechazos.",
                    "**Técnica 'Sentir, Sentían, Encontraron':** Aprenderás a empatizar con la objeción antes de refutarla.",
                    "**Las Objeciones Más Comunes (Precio, Tiempo, Competencia):** Tendrás respuestas preparadas y efectivas para las objeciones más típicas.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "v_3_4",
                section_id: 3,
                title: "Examen: El Proceso Consultivo",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "El objetivo principal de la 'llamada de descubrimiento' es:",
                        "options": [
                            "Cerrar la venta lo más rápido posible.",
                            "Hablar de ti y de tu empresa.",
                            "Diagnosticar las necesidades y 'dolores' del cliente.",
                            "Conseguir los datos de su tarjeta de crédito."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "La mejor manera de presentar tu solución en una demo es:",
                        "options": [
                            "Mostrar todas y cada una de las características de tu producto.",
                            "Enfocarte en cómo tu producto resuelve los problemas específicos que el cliente mencionó.",
                            "Hablar solo del precio.",
                            "Mostrar un video pre-grabado."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Cuando un cliente presenta una objeción, lo primero que debes hacer es:",
                        "options": [
                            "Interrumpirlo y decirle que está equivocado.",
                            "Ofrecer un descuento inmediatamente.",
                            "Escucharla completamente y empatizar con su preocupación.",
                            "Terminar la llamada."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "La técnica 'Sentir, Sentían, Encontraron' para manejar objeciones busca:",
                        "options": [
                            "Hacer sentir mal al cliente.",
                            "Validar la emoción del cliente, mostrarle que otros se sentían igual y luego explicar cómo encontraron una solución.",
                            "Confundir al cliente con psicología inversa.",
                            "Demostrar que el cliente no sabe lo que quiere."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El framework BANT (Budget, Authority, Need, Timeline) sirve para:",
                        "options": [
                            "Crear un anuncio en redes sociales.",
                            "Calificar si un prospecto tiene el presupuesto, la autoridad, la necesidad y el tiempo adecuados para comprar.",
                            "Diseñar una landing page.",
                            "Escribir un email de seguimiento."
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
        title: "Cierre y Fidelización",
        order: 4,
        duration: "1h 15min",
        completed: false,
        topics: [
            {
                topic_id: "v_4_1",
                section_id: 4,
                title: "Técnicas de Cierre",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Cierre Directo vs. Asumido:** Conocerás diferentes estilos de cierre y cuándo usarlos.",
                    "**Creación de Urgencia Ética:** Aprenderás a incentivar la decisión sin usar tácticas de presión falsas.",
                    "**Definición de Próximos Pasos:** Dominarás el arte de terminar cada conversación con una acción clara y definida.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "v_4_2",
                section_id: 4,
                title: "Negociación: Ganar-Ganar",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Negociar por Valor, no por Precio:** Aprenderás a defender tu precio enfocándote en el valor y el ROI que ofreces.",
                    "**Tener un 'Plan B':** Sabrás qué concesiones estás dispuesto a hacer antes de empezar a negociar.",
                    "**El Poder de Estar Dispuesto a Marcharse:** Entenderás por qué la mejor táctica de negociación es no necesitar la venta desesperadamente.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "v_4_3",
                section_id: 4,
                title: "Post-Venta: De Cliente a Embajador",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Onboarding Exitoso:** Comprenderás que la venta no termina con el pago, sino con el éxito del cliente.",
                    "**Estrategias de Fidelización:** Implementarás acciones para mantener el contacto y asegurar la satisfacción a largo plazo.",
                    "**Cómo Pedir Referidos y Testimonios:** Aprenderás el momento y la forma correcta de pedir a tus clientes felices que te recomienden.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "v_4_4",
                section_id: 4,
                title: "Examen Final: El Maestro del Cierre",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "Un 'cierre asumido' es cuando actúas como si el cliente ya hubiera tomado la decisión de comprar. ¿En qué situación es más apropiado?",
                        "options": [
                            "Al principio de la conversación.",
                            "Cuando el cliente ha mostrado fuertes señales de compra y ha respondido positivamente a todo.",
                            "Cuando el cliente está muy indeciso.",
                            "Nunca es apropiado."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "La mejor forma de defender tu precio en una negociación es:",
                        "options": [
                            "Bajarlo inmediatamente a la primera objeción.",
                            "Enfocarse en el valor y el retorno de inversión (ROI) que tu solución ofrece.",
                            "Compararlo con el competidor más barato.",
                            "Decir que es una orden del jefe."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El proceso de 'Onboarding' se refiere a:",
                        "options": [
                            "El momento en que el cliente paga.",
                            "El proceso de bienvenida y configuración inicial para asegurar que el cliente tenga éxito con el producto.",
                            "La primera llamada de ventas.",
                            "El envío de la factura."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Crear 'urgencia ética' para cerrar una venta significa:",
                        "options": [
                            "Inventar que la oferta termina en 5 minutos.",
                            "Presionar al cliente hasta que compre.",
                            "Comunicar una razón real y legítima por la que tomar una decisión ahora es beneficioso (ej. 'la oferta de lanzamiento termina esta semana').",
                            "Amenazar al cliente."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "¿Cuál es el mejor momento para pedir un referido a un cliente?",
                        "options": [
                            "Justo después de que te pague.",
                            "Un año después, cuando ya no se acuerde de ti.",
                            "Después de que ha tenido una experiencia exitosa y medible con tu producto o servicio.",
                            "En la primera llamada en frío."
                        ],
                        "correct": 2
                    }
                ],
                completed: false,
                order: 4
            }
        ]
    }
  ],
};

    
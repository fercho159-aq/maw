
import { Course } from './course-data';

export const courseData: Course = {
  title: "Curso de Automatización de Flujos de Trabajo con n8n",
  description: "Aprende a automatizar tareas y a conectar tus aplicaciones favoritas sin necesidad de escribir código.",
  total_sections: 4,
  total_topics: 16,
  total_duration: "5 horas",
  sections: [
    {
      section_id: 1,
      title: "Introducción a la Automatización y n8n",
      order: 1,
      duration: "1h",
      completed: false,
      topics: [
        {
          topic_id: "n8n_1_1",
          section_id: 1,
          title: "¿Qué es n8n y por qué es una revolución?",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Concepto de 'No-Code':** Entenderás el poder de la automatización sin necesidad de ser un programador.",
            "**Casos de uso reales:** Descubrirás cómo n8n puede automatizar desde la gestión de redes sociales hasta la sincronización de bases de datos.",
            "**n8n vs. Zapier/Make:** Conocerás las ventajas de n8n, como su flexibilidad, coste y la posibilidad de auto-hospedaje (self-hosting).",
          ],
          questions: [],
          completed: false,
          order: 1,
        },
        {
          topic_id: "n8n_1_2",
          section_id: 1,
          title: "Instalación en VPS y Configuraciones Clave",
          video_url: "",
          duration: "20 min",
          summary: [
            "**Elección de un VPS:** Aprenderás a elegir un proveedor de Virtual Private Server (VPS) adecuado y económico.",
            "**Instalación con Docker:** Seguirás un paso a paso para levantar tu propia instancia de n8n de forma segura.",
            "**Configuración de Dominio y SSL:** Configurarás tu dominio personalizado y un certificado de seguridad para acceder a n8n de forma profesional.",
          ],
          questions: [],
          completed: false,
          order: 2,
        },
        {
          topic_id: "n8n_1_3",
          section_id: 1,
          title: "Tu Primer Flujo de Trabajo (Workflow)",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Anatomía de un Nodo:** Entenderás qué son los nodos (nodes) y cómo se conectan.",
            "**Nodos 'Trigger':** Aprenderás a iniciar un flujo de trabajo a partir de un evento (ej. cada hora, al recibir un webhook).",
            "**Creación de un 'Hola Mundo':** Construirás tu primer workflow que envía una notificación a Discord o Slack.",
          ],
          questions: [],
          completed: false,
          order: 3,
        },
        {
            topic_id: "n8n_1_4",
            section_id: 1,
            title: "Examen: Fundamentos de n8n",
            video_url: "",
            duration: "10 min",
            summary: [],
            questions: [
                {
                    "question": "¿Cuál es una de las principales ventajas de n8n frente a otras plataformas como Zapier?",
                    "options": [
                        "Tiene menos integraciones.",
                        "Es de código abierto y permite el auto-hospedaje (self-hosting) para mayor control y menor coste.",
                        "Es mucho más caro.",
                        "Solo se puede usar en la nube."
                    ],
                    "correct": 1
                },
                {
                    "question": "¿Qué es un 'Nodo Trigger' en n8n?",
                    "options": [
                        "Un nodo que finaliza el flujo de trabajo.",
                        "Un nodo que realiza una acción, como enviar un email.",
                        "El nodo que inicia un flujo de trabajo basado en un evento específico (ej. una hora, un webhook).",
                        "Un nodo que solo sirve para hacer cálculos."
                    ],
                    "correct": 2
                },
                {
                    "question": "¿Por qué es recomendable instalar n8n en un VPS propio?",
                    "options": [
                        "Porque es más complicado.",
                        "Para tener control total sobre tus datos, personalización y evitar los límites de las versiones en la nube.",
                        "Porque la versión Cloud no funciona.",
                        "Para que sea más lento."
                    ],
                    "correct": 1
                },
                {
                    "question": "Un 'workflow' en n8n es:",
                    "options": [
                        "Un solo nodo de acción.",
                        "Una secuencia de nodos conectados que automatizan un proceso de principio a fin.",
                        "Un tipo de base de datos.",
                        "El nombre de usuario para acceder a n8n."
                    ],
                    "correct": 1
                },
                {
                    "question": "Un 'Webhook' es fundamentalmente:",
                    "options": [
                        "Un tipo de base de datos.",
                        "Una URL que espera recibir datos de otro servicio para iniciar un flujo.",
                        "Un nodo para hacer cálculos matemáticos.",
                        "Un error del sistema."
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
        title: "Automatización de Comunicaciones: Chatbots",
        order: 2,
        duration: "1h 15min",
        completed: false,
        topics: [
            {
                topic_id: "n8n_2_1",
                section_id: 2,
                title: "Creación de un Chatbot Básico para WhatsApp",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Conexión con WhatsApp Business API:** Aprenderás a configurar la conexión para recibir y enviar mensajes.",
                    "**Flujo de Bienvenida:** Diseñarás un workflow que responde automáticamente a los nuevos mensajes.",
                    "**Menú de Opciones:** Implementarás una lógica simple para que el bot ofrezca opciones y responda según la elección.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "n8n_2_2",
                section_id: 2,
                title: "Integración con OpenAI (ChatGPT) para Respuestas Inteligentes",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Conexión con OpenAI:** Configurarás tu API Key de OpenAI en n8n.",
                    "**Diseño del 'Prompt':** Aprenderás a darle instrucciones a ChatGPT para que responda como un agente de soporte de tu empresa.",
                    "**Flujo Conversacional:** Crearás un chatbot que entiende el lenguaje natural y mantiene conversaciones fluidas.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "n8n_2_3",
                section_id: 2,
                title: "Respondiendo Notas de Audio Automáticamente",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Transcripción de Audio a Texto:** Utilizarás servicios de IA como Whisper de OpenAI para convertir notas de voz en texto.",
                    "**Procesamiento del Texto:** Enviarás el texto transcrito a ChatGPT para que genere una respuesta.",
                    "**Respuesta por Texto:** Enviarás la respuesta generada por IA de vuelta al usuario a través de WhatsApp.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "n8n_2_4",
                section_id: 2,
                title: "Examen: Chatbots Inteligentes",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "Para que tu chatbot en n8n pueda entender y generar respuestas en lenguaje natural, ¿qué servicio integrarías?",
                        "options": [
                            "Google Sheets",
                            "OpenAI (ChatGPT)",
                            "Docker",
                            "Un servidor VPS"
                        ],
                        "correct": 1
                    },
                    {
                        "question": "La función principal de la API de Whisper de OpenAI en un flujo de chatbot es:",
                        "options": [
                            "Enviar imágenes.",
                            "Generar respuestas de texto.",
                            "Transcribir notas de audio a texto.",
                            "Traducir idiomas."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Un 'prompt' bien diseñado para ChatGPT en un chatbot de soporte debe incluir:",
                        "options": [
                            "Solo la pregunta del usuario.",
                            "Instrucciones claras sobre su rol, el tono y la información de la empresa.",
                            "Una lista de todos tus productos.",
                            "Tu contraseña de OpenAI."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Para iniciar un flujo cuando un usuario te escribe por WhatsApp, necesitas configurar un:",
                        "options": [
                            "Nodo 'Schedule' (programador).",
                            "Webhook que reciba los mensajes de la API de WhatsApp.",
                            "Nodo 'Start'.",
                            "Nodo de Google Calendar."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Cuál es el primer paso para automatizar la respuesta a una nota de audio?",
                        "options": [
                            "Enviar la nota a ChatGPT.",
                            "Responder con un audio genérico.",
                            "Transcribir el audio a texto.",
                            "Guardar el audio en Google Drive."
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
        title: "Automatización de Productividad",
        order: 3,
        duration: "1h 30min",
        completed: false,
        topics: [
            {
                topic_id: "n8n_3_1",
                section_id: 3,
                title: "Sincronización con Google Calendar",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Crear Eventos desde un Formulario:** Construirás un flujo que agenda una reunión en tu calendario cuando alguien llena un formulario.",
                    "**Recordatorios Automáticos:** Configurarás un workflow que envíe recordatorios por email o WhatsApp antes de un evento.",
                    "**Lectura de Calendario:** Aprenderás a iniciar flujos basados en los eventos de tu calendario (ej. 'una hora antes de cada reunión').",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "n8n_3_2",
                section_id: 3,
                title: "Automatización de Búsqueda de Noticias",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Fuentes de Noticias (RSS y APIs):** Aprenderás a conectarte a fuentes de noticias para obtener los últimos titulares.",
                    "**Filtrado por Palabras Clave:** Utilizarás nodos de lógica para filtrar solo las noticias que contengan palabras clave de tu interés.",
                    "**Resumen con IA y Notificación:** Crearás un flujo que resume las noticias relevantes con OpenAI y te las envía por Slack o email.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "n8n_3_3",
                section_id: 3,
                title: "Gestión de Tareas con Notion o Trello",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Creación Automática de Tareas:** Diseñarás un flujo que crea una nueva tarjeta en Trello o una página en Notion cuando recibes un email importante.",
                    "**Sincronización Bidireccional:** Entenderás los conceptos para mantener dos sistemas sincronizados (ej. Trello y Google Calendar).",
                    "**Reportes de Productividad:** Construirás un workflow que genere un resumen semanal de tareas completadas.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "n8n_3_4",
                section_id: 3,
                title: "Examen: Tu Asistente Personal Robótico",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "Para crear un flujo que te envíe un resumen de noticias sobre 'Inteligencia Artificial' cada mañana, ¿qué nodos necesitarías?",
                        "options": [
                            "Solo un nodo de Email.",
                            "Un Trigger de Hora, un nodo de Fuente de Noticias (RSS/API), un nodo de Lógica (IF) y un nodo de Email/Slack.",
                            "Un nodo de Google Calendar.",
                            "Un nodo de WhatsApp."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El principal beneficio de automatizar la creación de eventos en Google Calendar es:",
                        "options": [
                            "Hacer tu calendario más colorido.",
                            "Eliminar el trabajo manual de agendar citas y reducir la posibilidad de errores humanos.",
                            "Llenar tu calendario de eventos falsos.",
                            "Sincronizarlo con TikTok."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Una fuente común para obtener noticias de forma automatizada es a través de un:",
                        "options": [
                            "Archivo PDF.",
                            "Feed RSS.",
                            "Mensaje de WhatsApp.",
                            "Documento de Word."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Si quieres crear una nueva tarea en Trello cada vez que un email en Gmail es marcado como 'importante', ¿cuál sería el Trigger de tu workflow?",
                        "options": [
                            "Un Trigger de Trello.",
                            "Un Trigger de Gmail que se activa con correos 'importantes'.",
                            "Un Trigger manual.",
                            "Un Trigger de Hora."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Cómo podrías usar la IA en un flujo de búsqueda de noticias?",
                        "options": [
                            "Para hacer la búsqueda más lenta.",
                            "Para generar un resumen conciso de las noticias encontradas antes de enviarlas.",
                            "Para borrar las noticias.",
                            "La IA no se puede usar para eso."
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
        title: "Flujos de Trabajo Avanzados",
        order: 4,
        duration: "1h",
        completed: false,
        topics: [
            {
                topic_id: "n8n_4_1",
                section_id: 4,
                title: "Manejo de Bucles y Lotes (Looping)",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Procesamiento de Múltiples Items:** Aprenderás a procesar una lista de elementos (ej. emails) uno por uno.",
                    "**El Nodo 'Split in Batches':** Descubrirás cómo dividir grandes volúmenes de datos para procesarlos eficientemente.",
                    "**Evitar Límites de API:** Entenderás cómo los bucles y lotes te ayudan a no exceder los límites de los servicios que conectas.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "n8n_4_2",
                section_id: 4,
                title: "Manejo de Errores en Workflows",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Configuración de 'Error Triggers':** Crearás flujos de trabajo que se ejecutan automáticamente cuando otro falla.",
                    "**Estrategias de Reintentos:** Aprenderás a configurar reintentos automáticos para fallos temporales.",
                    "**Notificaciones de Error:** Construirás un sistema que te alerte por email o Slack cuando algo sale mal.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "n8n_4_3",
                section_id: 4,
                title: "Sub-Workflows y Reutilización",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**El Nodo 'Execute Workflow':** Aprenderás a llamar a un flujo de trabajo desde otro, como si fuera una función.",
                    "**Modularización de Procesos:** Diseñarás flujos de trabajo más limpios y reutilizables.",
                    "**Creación de 'Helpers':** Construirás sub-workflows para tareas comunes (ej. formatear un teléfono, validar un email).",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "n8n_4_4",
                section_id: 4,
                title: "Examen Final: El Arquitecto de la Automatización",
                video_url: "",
                duration: "10 min",
                summary: [],
                questions: [
                    {
                        "question": "Si necesitas procesar 1000 contactos y enviar un email a cada uno, ¿qué nodo es esencial para manejar esta lista?",
                        "options": [
                            "IF",
                            "Start",
                            "Un nodo que maneje bucles o iteraciones sobre los items.",
                            "Merge"
                        ],
                        "correct": 2
                    },
                    {
                        "question": "¿Para qué sirve un 'Error Trigger'?",
                        "options": [
                            "Para generar errores a propósito.",
                            "Para iniciar un flujo de trabajo específico cuando otro flujo falla.",
                            "Para corregir errores de ortografía.",
                            "Para conectarse a una API."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El nodo 'Execute Workflow' te permite:",
                        "options": [
                            "Borrar un flujo de trabajo.",
                            "Llamar y ejecutar otro flujo de trabajo como parte del flujo actual.",
                            "Duplicar el flujo de trabajo actual.",
                            "Renombrar un flujo de trabajo."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Por qué es útil dividir los datos en lotes ('batches')?",
                        "options": [
                            "Porque hace que el flujo sea más lento.",
                            "Para procesar grandes volúmenes de datos sin exceder los límites de las APIs y para un mejor manejo de errores.",
                            "Porque es obligatorio para todos los nodos.",
                            "Para que los datos se vean más organizados."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "La principal ventaja de usar sub-workflows es:",
                        "options": [
                            "Aumentar la complejidad del sistema.",
                            "Crear flujos más largos y difíciles de leer.",
                            "Poder reutilizar lógica común en múltiples flujos, haciéndolos más modulares y fáciles de mantener.",
                            "Ocupar más espacio en el servidor."
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

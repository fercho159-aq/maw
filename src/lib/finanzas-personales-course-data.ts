
import { Course } from './course-data';

export const courseData: Course = {
  title: "Curso de Finanzas Personales para Emprendedores",
  description: "Organiza tus finanzas, aprende a invertir y asegura la salud financiera de tu negocio y tu vida.",
  total_sections: 5,
  total_topics: 20,
  total_duration: "6 horas",
  sections: [
    {
      section_id: 1,
      title: "Mentalidad y Principios Financieros",
      order: 1,
      duration: "1h",
      completed: false,
      topics: [
        {
          topic_id: "fp_1_1",
          section_id: 1,
          title: "La Psicología del Dinero",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Entender tu relación con el dinero:** Identificarás tus creencias limitantes y cómo afectan tus decisiones.",
            "**Diferencia entre precio y valor:** Aprenderás a tomar decisiones de compra e inversión más inteligentes.",
            "**Creación de hábitos financieros saludables:** Establecerás rutinas que te acerquen a tus metas a largo plazo.",
          ],
          questions: [],
          completed: false,
          order: 1,
        },
        {
          topic_id: "fp_1_2",
          section_id: 1,
          title: "Activos vs. Pasivos: La Regla de Oro",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Definición clara de activos y pasivos:** Comprenderás qué construye riqueza y qué la destruye.",
            "**Análisis de tu patrimonio neto:** Calcularás tu punto de partida financiero real.",
            "**Estrategia de adquisición de activos:** Diseñarás un plan para aumentar tus fuentes de ingreso pasivo.",
          ],
          questions: [],
          completed: false,
          order: 2,
        },
        {
          topic_id: "fp_1_3",
          section_id: 1,
          title: "Separando las Finanzas del Negocio y las Personales",
          video_url: "",
          duration: "15 min",
          summary: [
            "**Importancia de la separación legal y contable:** Evitarás problemas fiscales y tendrás claridad sobre la rentabilidad de tu negocio.",
            "**Cómo pagarte un sueldo como emprendedor:** Definirás un salario justo y sostenible para ti.",
            "**Herramientas para la gestión dual:** Conocerás apps y sistemas para manejar ambas finanzas sin volverte loco.",
          ],
          questions: [],
          completed: false,
          order: 3,
        },
        {
            topic_id: "fp_1_4",
            section_id: 1,
            title: "Examen: Mentalidad Financiera",
            video_url: "",
            duration: "15 min",
            summary: [],
            questions: [
                {
                    "question": "¿Cuál es la principal diferencia entre un activo y un pasivo?",
                    "options": [
                        "Los activos son caros y los pasivos son baratos.",
                        "Los activos generan dinero para tu bolsillo, los pasivos lo sacan.",
                        "Los activos son solo para empresas, los pasivos para personas.",
                        "Los activos son físicos y los pasivos son deudas."
                    ],
                    "correct": 1
                },
                {
                    "question": "¿Por qué es crucial separar las finanzas personales de las del negocio?",
                    "options": [
                        "Para tener más tarjetas de crédito.",
                        "Porque es una moda entre emprendedores.",
                        "Para tener claridad sobre la rentabilidad real del negocio y evitar problemas fiscales.",
                        "Para poder gastar más dinero del negocio en cosas personales."
                    ],
                    "correct": 2
                },
                {
                    "question": "Un 'hábito financiero saludable' sería:",
                    "options": [
                        "Revisar tu cuenta bancaria cada 5 minutos.",
                        "Ahorrar un porcentaje fijo de tus ingresos automáticamente cada mes.",
                        "Comprar acciones solo cuando suben de precio.",
                        "Nunca usar una tarjeta de crédito."
                    ],
                    "correct": 1
                },
                {
                    "question": "La 'psicología del dinero' se refiere a:",
                    "options": [
                        "Cómo la economía afecta tu estado de ánimo.",
                        "Cómo tus creencias y emociones influyen en tus decisiones financieras.",
                        "El estudio de los billetes y monedas.",
                        "Una terapia para volverse millonario."
                    ],
                    "correct": 1
                },
                {
                    "question": "¿Qué es el 'patrimonio neto'?",
                    "options": [
                        "El total de dinero que ganas en un año.",
                        "Lo que te queda después de pagar impuestos.",
                        "La suma de todos tus activos menos la suma de todas tus deudas.",
                        "El dinero que tienes ahorrado en el banco."
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
        title: "Presupuesto y Control de Gastos",
        order: 2,
        duration: "1h 15min",
        completed: false,
        topics: [
            {
                topic_id: "fp_2_1",
                section_id: 2,
                title: "Métodos de Presupuesto que sí Funcionan",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Presupuesto 50/30/20:** Aprenderás a distribuir tus ingresos entre necesidades, deseos y ahorros.",
                    "**Presupuesto Base Cero:** Implementarás un sistema donde cada peso tiene un propósito asignado.",
                    "**Herramientas y Apps de Presupuesto:** Descubrirás la tecnología que te facilita el control de tus finanzas.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "fp_2_2",
                section_id: 2,
                title: "Identificación y Reducción de Gastos Hormiga",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**El poder del gasto pequeño:** Comprenderás cómo los pequeños gastos diarios impactan tus finanzas a largo plazo.",
                    "**Técnicas de seguimiento:** Utilizarás métodos simples para identificar a dónde se va tu dinero.",
                    "**Estrategias de optimización:** Aprenderás a reducir gastos sin sacrificar tu calidad de vida.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "fp_2_3",
                section_id: 2,
                title: "Creación de un Fondo de Emergencia",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**La importancia del colchón financiero:** Entenderás por qué es la base de la tranquilidad financiera.",
                    "**Cuánto y dónde ahorrar:** Definirás el monto ideal para tu fondo (3-6 meses de gastos) y dónde guardarlo.",
                    "**Automatización del ahorro:** Configurarás transferencias automáticas para construir tu fondo sin esfuerzo.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "fp_2_4",
                section_id: 2,
                title: "Examen: El Control de tu Dinero",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "En el método de presupuesto 50/30/20, ¿a qué corresponde el 30%?",
                        "options": [
                            "Ahorro e inversión.",
                            "Gastos de vivienda.",
                            "Deseos y estilo de vida.",
                            "Pago de deudas."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Un 'gasto hormiga' es:",
                        "options": [
                            "La compra de una casa.",
                            "Un gasto grande e inesperado.",
                            "Un pequeño gasto recurrente que pasa desapercibido pero suma mucho con el tiempo.",
                            "La mensualidad del gimnasio."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "¿Cuál es el propósito principal de un fondo de emergencia?",
                        "options": [
                            "Para irse de vacaciones.",
                            "Para cubrir gastos inesperados sin tener que endeudarte o desviar tus inversiones.",
                            "Para comprar un coche nuevo.",
                            "Para invertir en acciones de alto riesgo."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El 'presupuesto base cero' consiste en:",
                        "options": [
                            "No gastar nada durante un mes.",
                            "Asignar cada peso de tu ingreso a una categoría específica (gasto, ahorro, deuda), dejando el balance en cero.",
                            "Un presupuesto exclusivo para personas que no tienen deudas.",
                            "Gastar todo tu dinero sin planificar."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Por qué es recomendable automatizar el ahorro para tu fondo de emergencia?",
                        "options": [
                            "Porque el banco te da más intereses.",
                            "Porque elimina la necesidad de tomar una decisión consciente, convirtiéndolo en un hábito sin esfuerzo.",
                            "Porque es la única manera de ahorrar.",
                            "Porque te permite gastar más en otras cosas."
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
        title: "Deuda e Inversión",
        order: 3,
        duration: "1h 30min",
        completed: false,
        topics: [
            {
                topic_id: "fp_3_1",
                section_id: 3,
                title: "Deuda Buena vs. Deuda Mala",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**El uso estratégico de la deuda:** Aprenderás a diferenciar la deuda que te empobrece de la que puede enriquecerte.",
                    "**Tarjetas de crédito: ¿Amigas o enemigas?:** Dominarás el uso inteligente de las tarjetas para tu beneficio.",
                    "**Métodos para salir de deudas:** Conocerás estrategias como la 'bola de nieve' y la 'avalancha' para pagar tus deudas.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "fp_3_2",
                section_id: 3,
                title: "Introducción a la Inversión: Perfil de Riesgo",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**¿Qué es invertir?:** Entenderás la diferencia entre ahorrar e invertir y el poder del interés compuesto.",
                    "**Determinando tu tolerancia al riesgo:** Identificarás tu perfil como inversionista (conservador, moderado, agresivo).",
                    "**Conceptos clave: Rendimiento, Riesgo y Horizonte:** Aprenderás el triángulo de la inversión.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "fp_3_3",
                section_id: 3,
                title: "Vehículos de Inversión para Principiantes",
                video_url: "",
                duration: "30 min",
                summary: [
                    "**Renta Fija (CETES, Pagarés):** Conocerás las opciones más seguras para empezar a invertir en México.",
                    "**Renta Variable (Acciones, ETFs):** Entenderás qué son los ETFs y por qué son una excelente opción para diversificar.",
                    "**Plataformas de Inversión en México:** Descubrirás brokers regulados y sencillos para abrir tu primera cuenta de inversión.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "fp_3_4",
                section_id: 3,
                title: "Examen: De la Deuda a la Riqueza",
                video_url: "",
                duration: "20 min",
                summary: [],
                questions: [
                    {
                        "question": "Un ejemplo de 'deuda buena' sería:",
                        "options": [
                            "Un préstamo para irte de fiesta.",
                            "Un crédito para comprar la última televisión 8K.",
                            "Un crédito hipotecario para comprar una propiedad que alquilarás.",
                            "Usar la tarjeta de crédito para pagar el supermercado y no liquidarla a fin de mes."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "El 'interés compuesto' es conocido como:",
                        "options": [
                            "Un interés muy complicado de calcular.",
                            "La octava maravilla del mundo, porque tus ganancias generan nuevas ganancias.",
                            "Un tipo de deuda muy cara.",
                            "Un impuesto que cobra el gobierno."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué es un ETF (Exchange Traded Fund)?",
                        "options": [
                            "Una sola acción de una empresa muy grande.",
                            "Un fondo que invierte únicamente en tecnología.",
                            "Un paquete diversificado de muchos activos (acciones, bonos) que cotiza como una sola acción.",
                            "Un tipo de criptomoneda."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "El método 'bola de nieve' para pagar deudas consiste en:",
                        "options": [
                            "Pagar primero la deuda con el interés más alto.",
                            "Pagar todas las deudas al mismo tiempo con pagos iguales.",
                            "Pagar primero la deuda más pequeña para ganar motivación, y luego seguir con la siguiente más pequeña.",
                            "Ignorar las deudas hasta que crezcan como una bola de nieve."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Los CETES en México son un ejemplo de inversión de:",
                        "options": [
                            "Muy alto riesgo.",
                            "Renta variable.",
                            "Renta fija, considerada de muy bajo riesgo.",
                            "Criptomonedas."
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
        title: "Planificación para el Futuro",
        order: 4,
        duration: "1h",
        completed: false,
        topics: [
            {
                topic_id: "fp_4_1",
                section_id: 4,
                title: "Estableciendo Metas Financieras (Método SMART)",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Metas que inspiran:** Aprenderás a definir objetivos que te motiven a seguir tu plan.",
                    "**El poder de SMART:** Aplicarás la metodología para que tus metas sean Específicas, Medibles, Alcanzables, Relevantes y con un Tiempo definido.",
                    "**Plan de acción:** Crearás un mapa de ruta para alcanzar tus metas financieras, desde el enganche de una casa hasta tu retiro.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "fp_4_2",
                section_id: 4,
                title: "Principios Básicos de los Seguros",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**¿Para qué sirven los seguros?:** Entenderás su rol en la protección de tu patrimonio.",
                    "**Tipos de seguros esenciales:** Conocerás los seguros de vida, gastos médicos mayores y auto, y cuándo los necesitas.",
                    "**Cómo elegir un seguro:** Aprenderás los conceptos clave (deducible, coaseguro, suma asegurada) para tomar una buena decisión.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "fp_4_3",
                section_id: 4,
                title: "Introducción a la Planificación para el Retiro",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**La importancia de empezar joven:** Visualizarás el impacto del interés compuesto en tu retiro.",
                    "**AFORE y PPRs en México:** Entenderás las herramientas disponibles para planificar tu jubilación.",
                    "**Cálculo básico de tu necesidad de retiro:** Estimarás cuánto dinero necesitarás para mantener tu estilo de vida.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "fp_4_4",
                section_id: 4,
                title: "Examen: Construyendo tu Futuro",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Qué significa la 'A' en el método de metas SMART?",
                        "options": [
                            "Ambiciosa",
                            "Anual",
                            "Alcanzable",
                            "Automática"
                        ],
                        "correct": 2
                    },
                    {
                        "question": "La principal función de un seguro de gastos médicos mayores es:",
                        "options": [
                            "Pagar las consultas del resfriado común.",
                            "Cubrir los costos de un accidente o enfermedad grave que podrían llevarte a la quiebra.",
                            "Darte descuentos en farmacias.",
                            "Un tipo de ahorro para el retiro."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué es un PPR (Plan Personal de Retiro) en México?",
                        "options": [
                            "Un seguro de coche.",
                            "Una cuenta de ahorro normal.",
                            "Una cuenta de inversión privada con beneficios fiscales diseñada para complementar tu AFORE.",
                            "Un tipo de tarjeta de crédito."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "El 'deducible' en un seguro es:",
                        "options": [
                            "Lo que el seguro te paga a ti.",
                            "Una cantidad fija de dinero que tú debes pagar de tu bolsillo antes de que el seguro empiece a cubrir.",
                            "Un descuento que te hacen por no usar el seguro.",
                            "El costo total del seguro."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Por qué es crucial planificar para el retiro lo antes posible?",
                        "options": [
                            "Porque las AFORES van a desaparecer.",
                            "Porque es una ley del gobierno.",
                            "Para aprovechar el poder del interés compuesto durante más tiempo.",
                            "Porque los seguros son más baratos cuando eres joven."
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
        title: "Finanzas para tu Negocio",
        order: 5,
        duration: "1h",
        completed: false,
        topics: [
            {
                topic_id: "fp_5_1",
                section_id: 5,
                title: "Flujo de Efectivo: El Oxígeno de tu Empresa",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Estado de Flujo de Efectivo:** Aprenderás a leer e interpretar este reporte financiero vital.",
                    "**Gestión del capital de trabajo:** Optimizarás tus ciclos de cobro y pago para mantener la liquidez.",
                    "**Proyecciones de flujo de efectivo:** Anticiparás futuras necesidades de dinero y evitarás crisis.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "fp_5_2",
                section_id: 5,
                title: "Fijación de Precios y Estructura de Costos",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Costos fijos vs. variables:** Entenderás la estructura de costos de tu negocio.",
                    "**Estrategias de fijación de precios:** Aprenderás a poner precios que cubran tus costos y generen utilidad.",
                    "**Análisis de punto de equilibrio:** Calcularás cuánto necesitas vender para empezar a ser rentable.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "fp_5_3",
                section_id: 5,
                title: "Opciones de Financiamiento para Emprendedores",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Bootstrapping vs. Levantamiento de Capital:** Conocerás las ventajas y desventajas de cada camino.",
                    "**Tipos de financiamiento en México:** Explorarás opciones como créditos PYME, SOFOMes y Venture Capital.",
                    "**Cómo preparar tu negocio para recibir inversión:** Aprenderás qué buscan los inversionistas y cómo presentar tu proyecto.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "fp_5_4",
                section_id: 5,
                title: "Examen: El CEO Financiero",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Por qué se dice que el 'flujo de efectivo' es el oxígeno de una empresa?",
                        "options": [
                            "Porque suena profesional decirlo.",
                            "Porque una empresa puede ser rentable en papel pero quebrar si no tiene dinero líquido para pagar sus operaciones diarias.",
                            "Porque se mide en litros.",
                            "Porque está relacionado con el aire acondicionado de la oficina."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El 'punto de equilibrio' es:",
                        "options": [
                            "Cuando la empresa empieza a ser famosa.",
                            "El nivel de ventas en el que los ingresos totales son iguales a los costos totales (no hay ganancia ni pérdida).",
                            "El momento en que contratas a tu primer empleado.",
                            "El precio máximo que puedes cobrar por tu producto."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "'Bootstrapping' significa:",
                        "options": [
                            "Recibir una gran inversión de un fondo de capital.",
                            "Pedir un préstamo al banco.",
                            "Hacer crecer un negocio utilizando únicamente sus propios ingresos y ahorros, sin financiamiento externo.",
                            "Vender la empresa."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Un 'costo variable' es aquel que:",
                        "options": [
                            "Nunca cambia, como la renta de la oficina.",
                            "Cambia en proporción directa a la cantidad de productos que vendes (ej. costo de materia prima).",
                            "Es muy difícil de predecir.",
                            "Se paga una sola vez."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "¿Qué es el 'capital de trabajo'?",
                        "options": [
                            "El dinero que se usa para pagar a los inversionistas.",
                            "La maquinaria y equipo de la empresa.",
                            "Los recursos que una empresa necesita para sus operaciones diarias (dinero para pagar sueldos, proveedores, etc.).",
                            "La oficina principal de la empresa."
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

    
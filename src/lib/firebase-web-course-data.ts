import { Course } from './course-data';

export const courseData: Course = {
  title: "Curso de Creación de Sitios Web con Firebase y Next.js",
  description: "Construye aplicaciones web modernas y escalables con Firebase y Next.js.",
  total_sections: 4,
  total_topics: 16,
  total_duration: "6 horas",
  sections: [
    {
      section_id: 1,
      title: "Fundamentos de Firebase y Next.js",
      order: 1,
      duration: "1h 30min",
      completed: false,
      topics: [
        {
          topic_id: "fw_1_1",
          section_id: 1,
          title: "Introducción a Firebase",
          video_url: "",
          duration: "20 min",
          summary: [
            "**¿Qué es Firebase?:** Entenderás la plataforma como un BaaS (Backend as a Service).",
            "**Servicios Clave:** Conocerás los servicios principales: Authentication, Firestore, Storage y Hosting.",
            "**Creación de tu primer proyecto:** Crearás un proyecto en la consola de Firebase.",
          ],
          questions: [],
          completed: false,
          order: 1,
        },
        {
          topic_id: "fw_1_2",
          section_id: 1,
          title: "Introducción a Next.js",
          video_url: "",
          duration: "25 min",
          summary: [
            "**¿Por qué Next.js?:** Aprenderás las ventajas del renderizado en servidor (SSR) y la generación de sitios estáticos (SSG).",
            "**Estructura de un Proyecto:** Te familiarizarás con el App Router, las páginas y los layouts.",
            "**Creación de tu proyecto Next.js:** Iniciarás un nuevo proyecto y lo conectarás con Firebase.",
          ],
          questions: [],
          completed: false,
          order: 2,
        },
        {
          topic_id: "fw_1_3",
          section_id: 1,
          title: "Conexión Segura entre Next.js y Firebase",
          video_url: "",
          duration: "30 min",
          summary: [
            "**Variables de Entorno:** Aprenderás a almacenar tus claves de API de Firebase de forma segura.",
            "**Inicialización de Firebase:** Crearás un servicio para inicializar Firebase en tu aplicación Next.js.",
            "**Componentes de Cliente vs. Servidor:** Entenderás dónde y cómo interactuar con Firebase en Next.js.",
          ],
          questions: [],
          completed: false,
          order: 3,
        },
        {
            topic_id: "fw_1_4",
            section_id: 1,
            title: "Examen: Primeros Pasos",
            video_url: "",
            duration: "15 min",
            summary: [],
            questions: [
                {
                    "question": "¿Qué significa que Firebase sea un 'Backend as a Service' (BaaS)?",
                    "options": [
                        "Que solo funciona para bases de datos.",
                        "Que provee servicios de backend (autenticación, base de datos) listos para usar sin gestionar servidores.",
                        "Que es una herramienta para diseñar el frontend.",
                        "Que solo sirve para alojar sitios web."
                    ],
                    "correct": 1
                },
                {
                    "question": "Una de las principales ventajas de Next.js es su capacidad de:",
                    "options": [
                        "Solo crear aplicaciones móviles.",
                        "Funcionar sin necesidad de JavaScript.",
                        "Realizar Renderizado en el Servidor (SSR) y Generación de Sitios Estáticos (SSG).",
                        "Crear bases de datos."
                    ],
                    "correct": 2
                },
                {
                    "question": "¿Dónde deberías guardar las claves de tu API de Firebase en un proyecto de Next.js?",
                    "options": [
                        "Directamente en el código de tus componentes.",
                        "En un archivo de texto público en GitHub.",
                        "En un archivo de variables de entorno (.env.local).",
                        "En el nombre de los archivos."
                    ],
                    "correct": 2
                },
                {
                    "question": "En el App Router de Next.js, ¿para qué sirve un archivo `layout.tsx`?",
                    "options": [
                        "Para definir una página individual.",
                        "Para compartir una UI (como un menú o un footer) entre varias páginas.",
                        "Para escribir la lógica de la base de datos.",
                        "Para estilizar un botón."
                    ],
                    "correct": 1
                },
                {
                    "question": "Para usar los servicios de Firebase en un componente de React que se ejecuta en el navegador, este debe ser un:",
                    "options": [
                        "Componente de Servidor (Server Component).",
                        "Componente de Cliente (Client Component), marcado con 'use client'.",
                        "Componente de base de datos.",
                        "Componente de estilo."
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
        title: "Autenticación de Usuarios",
        order: 2,
        duration: "1h 30min",
        completed: false,
        topics: [
            {
                topic_id: "fw_2_1",
                section_id: 2,
                title: "Configurando Firebase Authentication",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Habilitar Proveedores:** Aprenderás a activar el login con Email/Contraseña y con proveedores sociales como Google.",
                    "**Reglas de Seguridad Básicas:** Entenderás el propósito de las reglas de seguridad para proteger tu app.",
                    "**UI de Autenticación:** Diseñarás los formularios de registro e inicio de sesión.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "fw_2_2",
                section_id: 2,
                title: "Registro y Login de Usuarios con Email",
                video_url: "",
                duration: "30 min",
                summary: [
                    "**Creación de Usuarios:** Implementarás la función para registrar nuevos usuarios con `createUserWithEmailAndPassword`.",
                    "**Inicio de Sesión:** Implementarás la función de login con `signInWithEmailAndPassword`.",
                    "**Manejo de Errores:** Aprenderás a mostrar mensajes de error útiles al usuario (ej. contraseña incorrecta, email ya en uso).",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "fw_2_3",
                section_id: 2,
                title: "Login Social con Google",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Configuración del Proveedor:** Configurarás el proveedor de Google en la consola de Firebase.",
                    "**Login con Popup:** Implementarás el flujo de inicio de sesión con Google usando `signInWithPopup`.",
                    "**Gestión del Estado de Sesión:** Aprenderás a detectar si un usuario está logueado o no en tu aplicación.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "fw_2_4",
                section_id: 2,
                title: "Examen: Gestión de Usuarios",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Qué función de Firebase se usa para iniciar sesión a un usuario con su correo y contraseña?",
                        "options": [
                            "`createUserWithEmailAndPassword`",
                            "`signInWithEmailAndPassword`",
                            "`signInWithPopup`",
                            "`signOut`"
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Para implementar el 'Login con Google', el método más común en la web es:",
                        "options": [
                            "`signInWithRedirect`",
                            "`signInWithPopup`",
                            "`sendPasswordResetEmail`",
                            "`updateProfile`"
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El estado de la sesión de un usuario (si está logueado o no) se maneja comúnmente con:",
                        "options": [
                            "Una variable global.",
                            "Un observador como `onAuthStateChanged`.",
                            "Un archivo de texto.",
                            "Recargando la página constantemente."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Las 'Reglas de Seguridad' de Firebase Authentication sirven para:",
                        "options": [
                            "Hacer la página más bonita.",
                            "Definir quién puede registrarse o acceder a la app.",
                            "Cambiar los colores del formulario de login.",
                            "Acelerar la velocidad de la base de datos."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Si intentas registrar un usuario con un email que ya existe, Firebase devolverá:",
                        "options": [
                            "Un mensaje de éxito.",
                            "Un error específico como 'auth/email-already-in-use'.",
                            "Creará un segundo usuario con el mismo email.",
                            "Borrará el usuario anterior."
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
        title: "Base de Datos con Firestore",
        order: 3,
        duration: "1h 30min",
        completed: false,
        topics: [
            {
                topic_id: "fw_3_1",
                section_id: 3,
                title: "Modelo de Datos NoSQL: Colecciones y Documentos",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Entendiendo NoSQL:** Aprenderás las diferencias clave entre bases de datos SQL (tablas) y NoSQL (documentos).",
                    "**Estructura de Firestore:** Dominarás la estructura de Colección -> Documento -> Colección.",
                    "**Diseño de tu Base de Datos:** Planificarás la estructura para una aplicación de ejemplo (ej. una app de notas o tareas).",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "fw_3_2",
                section_id: 3,
                title: "Escribir y Actualizar Datos (CRUD)",
                video_url: "",
                duration: "30 min",
                summary: [
                    "**Crear Documentos:** Usarás `setDoc` y `addDoc` para guardar nueva información.",
                    "**Leer Documentos:** Aprenderás a obtener un solo documento con `getDoc`.",
                    "**Actualizar y Borrar:** Utilizarás `updateDoc` y `deleteDoc` para modificar y eliminar datos.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "fw_3_3",
                section_id: 3,
                title: "Consultas y Lectura de Listas de Datos",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Leer una Colección:** Usarás `getDocs` para obtener todos los documentos de una colección.",
                    "**Filtrado con `where`:** Aprenderás a realizar consultas para filtrar datos (ej. tareas completadas).",
                    "**Ordenamiento y Paginación:** Implementarás ordenamiento con `orderBy` y limitarás resultados con `limit`.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "fw_3_4",
                section_id: 3,
                title: "Examen: Dominando Firestore",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "En Firestore, los datos se organizan en:",
                        "options": [
                            "Tablas, Filas y Columnas.",
                            "Colecciones y Documentos.",
                            "Hojas y Celdas.",
                            "Archivos y Carpetas."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Para añadir un nuevo documento a una colección con un ID generado automáticamente, usarías:",
                        "options": [
                            "`setDoc`",
                            "`updateDoc`",
                            "`addDoc`",
                            "`getDoc`"
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Si quieres obtener solo los documentos donde el campo `completed` es `true`, ¿qué función usarías?",
                        "options": [
                            "La función `where('completed', '==', true')`.",
                            "La función `orderBy('completed')`.",
                            "La función `limit(1)`.",
                            "La función `getDocs()` sin filtros."
                        ],
                        "correct": 0
                    },
                    {
                        "question": "La principal diferencia entre `setDoc` y `updateDoc` es que:",
                        "options": [
                            "`updateDoc` es más rápido.",
                            "`setDoc` puede crear un documento si no existe, mientras que `updateDoc` falla si el documento no existe.",
                            "No hay ninguna diferencia.",
                            "`setDoc` es para texto y `updateDoc` es para números."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Firestore es una base de datos de tipo:",
                        "options": [
                            "SQL (Relacional).",
                            "NoSQL (Documental).",
                            "De grafos.",
                            "En memoria."
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
        title: "Almacenamiento, Despliegue y Funciones Cloud",
        order: 4,
        duration: "1h",
        completed: false,
        topics: [
            {
                topic_id: "fw_4_1",
                section_id: 4,
                title: "Subir Archivos con Firebase Storage",
                video_url: "",
                duration: "25 min",
                summary: [
                    "**Configuración de Storage:** Habilitarás el servicio y entenderás sus reglas de seguridad básicas.",
                    "**Subida de Archivos:** Implementarás la lógica para que un usuario pueda subir una imagen desde tu app.",
                    "**Obtención de la URL de Descarga:** Aprenderás a obtener el enlace público del archivo para mostrarlo en tu web.",
                ],
                questions: [],
                completed: false,
                order: 1
            },
            {
                topic_id: "fw_4_2",
                section_id: 4,
                title: "Despliegue de tu App con Firebase Hosting",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**Firebase CLI:** Instalarás y configurarás la interfaz de línea de comandos de Firebase.",
                    "**Configuración de Hosting:** Prepararás tu proyecto de Next.js para ser desplegado.",
                    "**Comando `firebase deploy`:** Desplegarás tu aplicación a producción con un solo comando.",
                ],
                questions: [],
                completed: false,
                order: 2
            },
            {
                topic_id: "fw_4_3",
                section_id: 4,
                title: "Introducción a Cloud Functions",
                video_url: "",
                duration: "20 min",
                summary: [
                    "**¿Qué son las Cloud Functions?:** Entenderás el concepto de 'serverless' y su poder.",
                    "**Tipos de Triggers:** Conocerás cómo ejecutar funciones en respuesta a eventos (ej. un nuevo usuario, una subida a Storage).",
                    "**Tu Primera Función:** Escribirás una función simple, como enviar un email de bienvenida cuando un usuario se registra.",
                ],
                questions: [],
                completed: false,
                order: 3
            },
            {
                topic_id: "fw_4_4",
                section_id: 4,
                title: "Examen Final: Lanzamiento a Producción",
                video_url: "",
                duration: "15 min",
                summary: [],
                questions: [
                    {
                        "question": "¿Para qué se utiliza principalmente Firebase Storage?",
                        "options": [
                            "Para guardar datos de texto como nombres de usuario.",
                            "Para almacenar y servir archivos subidos por los usuarios, como imágenes o PDFs.",
                            "Para autenticar usuarios.",
                            "Para alojar el código de tu sitio web."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "El comando para desplegar tu aplicación a Firebase Hosting es:",
                        "options": [
                            "`firebase start`",
                            "`firebase init`",
                            "`firebase deploy`",
                            "`firebase login`"
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Las 'Cloud Functions' son código que se ejecuta en:",
                        "options": [
                            "El navegador del usuario.",
                            "Tu computadora personal.",
                            "Los servidores de Google, sin que tengas que gestionarlos (serverless).",
                            "La base de datos de Firestore."
                        ],
                        "correct": 2
                    },
                    {
                        "question": "Un caso de uso común para una Cloud Function sería:",
                        "options": [
                            "Cambiar el color de un botón en la web.",
                            "Realizar una tarea en el backend cuando ocurre un evento, como enviar un email de bienvenida al crearse un nuevo usuario.",
                            "Almacenar la contraseña de un usuario.",
                            "Mostrar una imagen en la página."
                        ],
                        "correct": 1
                    },
                    {
                        "question": "Para interactuar con los servicios de Firebase desde tu terminal (línea de comandos), necesitas instalar:",
                        "options": [
                            "La Firebase Console.",
                            "La Firebase CLI (Command Line Interface).",
                            "Firebase Studio Code.",
                            "La app móvil de Firebase."
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

export interface Topic {
  topic_id: string;
  section_id: number;
  title: string;
  content: string;
  youtubeLink: string;
}

export interface Section {
  section_id: number;
  title: string;
  topics: Topic[];
}

export interface Course {
  title: string;
  description: string;
  sections: Section[];
}

export const introduccionCourseData: Course = {
  title: "Introducción a los Servicios de MAW Soluciones",
  description: "Una guía esencial para comprender las bases de lo que ofrecemos.",
  sections: [
    {
      section_id: 1,
      title: "Desarrollo Web",
      topics: [
        {
          topic_id: "i_1_1",
          section_id: 1,
          title: "Conceptos Clave de Desarrollo Web",
          content: `<p>Nuestro enfoque en desarrollo web se centra en crear experiencias digitales rápidas, seguras y optimizadas para la conversión. No solo construimos sitios bonitos; construimos motores de negocio.</p>
                     <ul class="list-disc list-inside space-y-2 my-4">
                        <li><strong>Stack Tecnológico:</strong> Utilizamos principalmente Next.js y React, lo que nos permite crear sitios web modernos y performantes.</li>
                        <li><strong>Tipos de Sitios:</strong> Nos especializamos en Landing Pages, Sitios Conectivos (corporativos) y E-commerce.</li>
                        <li><strong>El Proceso:</strong> Un proyecto típico incluye fases de descubrimiento, diseño UX/UI, desarrollo, pruebas y lanzamiento.</li>
                     </ul>`,
          youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ],
    },
    {
        section_id: 2,
        title: "Creación de Contenido",
        topics: [
            {
                topic_id: "i_2_1",
                section_id: 2,
                title: "Metodología de Creación de Contenido",
                content: `<p>El contenido es el corazón de la comunicación digital. Nuestra estrategia se basa en crear valor para la audiencia de nuestros clientes.</p>
                          <ul class="list-disc list-inside space-y-2 my-4">
                            <li><strong>Estrategia Primero:</strong> Antes de crear, definimos el buyer persona, los objetivos y los pilares de contenido.</li>
                            <li><strong>Formatos Diversos:</strong> Trabajamos con artículos de blog (SEO), guiones para Reels/TikTok, copy para redes sociales y email marketing.</li>
                            <li><strong>Medición:</strong> Analizamos métricas de engagement, alcance y conversión para optimizar continuamente la estrategia.</li>
                          </ul>`,
                youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ]
    },
    {
        section_id: 3,
        title: "Gestión de Campañas (Ads)",
        topics: [
            {
                topic_id: "i_3_1",
                section_id: 3,
                title: "Principios de la Publicidad Digital",
                content: `<p>Nuestro enfoque en la gestión de campañas es maximizar el retorno de inversión (ROI) a través de un enfoque basado en datos.</p>
                          <ul class="list-disc list-inside space-y-2 my-4">
                            <li><strong>Plataformas Clave:</strong> Nos especializamos en Google Ads (Búsqueda, Display, YouTube) y Meta Ads (Facebook, Instagram).</li>
                            <li><strong>Estructura de Campaña:</strong> Seguimos una estructura lógica para probar audiencias, creatividades y mensajes de forma ordenada.</li>
                            <li><strong>Optimización Continua:</strong> Monitoreamos diariamente las campañas y realizamos ajustes para mejorar el rendimiento, enfocándonos en métricas como CPA y ROAS.</li>
                          </ul>`,
                youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ]
    },
    {
        section_id: 4,
        title: "Automatización",
        topics: [
            {
                topic_id: "i_4_1",
                section_id: 4,
                title: "El Poder de la Automatización",
                content: `<p>La automatización libera tiempo y escala la comunicación. Implementamos sistemas que trabajan 24/7 para nuestros clientes.</p>
                          <ul class="list-disc list-inside space-y-2 my-4">
                            <li><strong>Herramientas Principales:</strong> Utilizamos herramientas como n8n y Make para conectar aplicaciones y automatizar flujos de trabajo sin código.</li>
                            <li><strong>Casos de Uso Comunes:</strong> Creamos chatbots para WhatsApp, automatizamos el email marketing para nutrición de leads e integramos CRMs con otras herramientas.</li>
                            <li><strong>Enfoque Estratégico:</strong> El objetivo es automatizar tareas repetitivas para que el equipo humano pueda centrarse en la estrategia y la creatividad.</li>
                          </ul>`,
                youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ]
    }
  ],
};

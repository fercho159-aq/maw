export interface Topic {
  topic_id: string;
  section_id: number;
  title: string;
  content: string;
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

export const nosotrosCourseData: Course = {
  title: "Sobre Nosotros: El ADN de MAW Soluciones",
  description: "Una guía para entender quiénes somos, qué hacemos y cómo lo hacemos.",
  sections: [
    {
      section_id: 1,
      title: "Nuestra Identidad",
      topics: [
        {
          topic_id: "n_1_1",
          section_id: 1,
          title: "Nuestra Historia y Misión",
          content: `<p>MAW Soluciones nació de la visión de un equipo apasionado por la tecnología y el marketing, con el objetivo de ayudar a las empresas a navegar el complejo mundo digital. Nuestra misión es simple: <strong>ser el socio estratégico que impulsa el crecimiento de nuestros clientes a través de soluciones innovadoras, creativas y basadas en datos.</strong></p><p>Creemos que cada negocio tiene una historia que contar y un potencial que explotar. Nosotros proporcionamos las herramientas y la estrategia para que esa historia llegue a la audiencia correcta y ese potencial se convierta en resultados medibles.</p>`
        },
        {
          topic_id: "n_1_2",
          section_id: 1,
          title: "Nuestros Valores",
          content: `<p>Nuestros valores son el pilar de cada proyecto y cada interacción:</p>
                     <ul class="list-disc list-inside space-y-2 my-4">
                        <li><strong>Innovación Constante:</strong> Siempre estamos aprendiendo y experimentando para estar a la vanguardia de las tendencias digitales.</li>
                        <li><strong>Transparencia Radical:</strong> Creemos en la comunicación abierta y honesta. Nuestros clientes siempre saben qué estamos haciendo y por qué.</li>
                        <li><strong>Enfoque en Resultados:</strong> No nos obsesionamos con métricas de vanidad. Nos enfocamos en los KPIs que realmente impactan el negocio de nuestros clientes.</li>
                        <li><strong>Colaboración Estratégica:</strong> No somos un proveedor, somos parte del equipo de nuestros clientes. Su éxito es nuestro éxito.</li>
                     </ul>`
        },
      ],
    },
    {
        section_id: 2,
        title: "Nuestros Servicios",
        topics: [
            {
                topic_id: "n_2_1",
                section_id: 2,
                title: "Resumen de Servicios",
                content: `<p>Ofrecemos una gama integral de servicios de marketing digital, diseñados para funcionar juntos o de forma independiente:</p>
                          <ul class="list-disc list-inside space-y-2 my-4">
                            <li><strong>Desarrollo Web:</strong> Creamos sitios web modernos, rápidos y optimizados para la conversión.</li>
                            <li><strong>Creación de Contenido:</strong> Producimos contenido relevante y de alta calidad que conecta con la audiencia.</li>
                            <li><strong>Gestión de Campañas (Ads):</strong> Planificamos y optimizamos campañas en Google, Meta y TikTok para maximizar el ROI.</li>
                            <li><strong>Automatización:</strong> Implementamos sistemas inteligentes para nutrir leads y optimizar procesos.</li>
                          </ul>`
            }
        ]
    },
    {
        section_id: 3,
        title: "Nuestra Cultura",
        topics: [
            {
                topic_id: "n_3_1",
                section_id: 3,
                title: "Cultura de Trabajo Interna",
                content: `<p>Fomentamos un ambiente de autonomía, responsabilidad y aprendizaje continuo. Cada miembro del equipo es dueño de sus proyectos y se le anima a proponer nuevas ideas. La comunicación es directa y respetuosa, y valoramos el equilibrio entre la vida laboral y personal.</p>`
            },
            {
                topic_id: "n_3_2",
                section_id: 3,
                title: "Trato con el Cliente",
                content: `<p>El trato con el cliente es proactivo, educativo y consultivo. No solo ejecutamos tareas; asesoramos y guiamos a nuestros clientes hacia las mejores decisiones. La comunicación es clave: mantenemos reuniones periódicas, enviamos informes claros y estamos siempre disponibles para resolver dudas. El objetivo es construir una relación a largo plazo basada en la confianza y los resultados.</p>`
            }
        ]
    }
  ],
};

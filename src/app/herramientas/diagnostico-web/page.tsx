import WebsiteAnalyzer from "@/components/website-analyzer";

export const metadata = {
  title: "Diagnóstico Web Gratuito | MAW Soluciones",
  description: "Analiza la velocidad, SEO y accesibilidad de tu sitio web en segundos con nuestra herramienta gratuita de diagnóstico y recibe recomendaciones prácticas.",
};

export default function DiagnosticoWebPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Diagnóstico <span className="text-primary">Web</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-medium">
            La velocidad, el SEO y la accesibilidad son cruciales para el éxito. Ingresa tu URL y obtén un análisis instantáneo y recomendaciones accionables para mejorar el rendimiento de tu página web.
          </p>
        </div>
        <WebsiteAnalyzer />
      </div>
    </div>
  );
}

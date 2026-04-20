
import { getBlogPostBySlug, getBlogPosts } from "@/app/blog/_actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, ArrowRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import AnimatedDiv from "@/components/animated-div";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 3600; // Revalidate every hour

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Publicación no encontrada",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const imageUrl = post.featured_image_url || 'https://i.imgur.com/y4Uu2my.png';

  return {
    title: post.title,
    description: post.excerpt || "Una publicación de MAW Soluciones",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Una publicación de MAW Soluciones",
      url: `https://mawsoluciones.com/blog/${post.slug}`,
      siteName: "MAW Soluciones",
      images: [
        {
          url: imageUrl,
          width: 1024,
          height: 1024,
          alt: post.title,
        },
        ...previousImages,
      ],
      locale: "es_MX",
      type: "article",
      authors: [post.author || "MAW Soluciones"],
    },
    twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || "Una publicación de MAW Soluciones",
        images: [imageUrl],
    }
  };
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const allPosts = await getBlogPosts();

  const authorRelatedPosts = post.related_posts;

  const autoRelatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="bg-background">
      <section className="py-24 sm:py-32 md:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {post.category && 
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
            }
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-md text-foreground/70 mt-8">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={new Date(post.date).toISOString()}>{format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}</time>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {post.featured_image_url && (
        <section className="container mx-auto px-4 md:px-6 -mt-20 md:-mt-28 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-lg shadow-2xl overflow-hidden">
                <Image 
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>
          </div>
        </section>
      )}


      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-headline prose-headings:text-foreground prose-headings:font-bold
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-primary hover:prose-a:text-primary/80
              prose-ul:list-disc prose-ol:list-decimal 
              prose-li:text-foreground/80
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground/60"
              dangerouslySetInnerHTML={{ __html: post.content }}
            >
            </div>
            
            {authorRelatedPosts && authorRelatedPosts.length > 0 && (
                <div className="mt-20">
                     <h3 className="font-headline text-2xl font-bold mb-6 text-foreground">Lecturas recomendadas por el autor</h3>
                     <div className="space-y-4">
                        {authorRelatedPosts.map((related: { title: string, link: string}, index: number) => (
                            <Link href={related.link} key={index} target="_blank" rel="noopener noreferrer" className="group block">
                                <Card className="bg-card/50 hover:bg-card transition-colors">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <LinkIcon className="w-5 h-5 text-primary flex-shrink-0" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{related.title.replace(/-/g, ' ')}</p>
                                        </div>
                                         <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="text-center mt-20">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {!authorRelatedPosts && autoRelatedPosts.length > 0 && (
        <section className="py-20 md:py-28 border-t">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedDiv className="text-center mb-16">
                    <h2 className="font-headline text-3xl sm:text-4xl font-bold">Lecturas relacionadas</h2>
                </AnimatedDiv>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {autoRelatedPosts.map((relatedPost) => (
                        <AnimatedDiv key={relatedPost.id}>
                            <Link href={`/blog/${relatedPost.slug}`} className="group block h-full">
                                <Card className="bg-card rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    {relatedPost.category && <Badge variant="secondary" className="mb-2 w-fit">{relatedPost.category}</Badge>}
                                    <h3 className="font-headline text-xl font-bold mb-3 flex-grow group-hover:text-primary transition-colors">
                                    {relatedPost.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-primary mt-auto font-semibold">
                                    Leer más <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </CardContent>
                                </Card>
                            </Link>
                        </AnimatedDiv>
                    ))}
                </div>
            </div>
        </section>
      )}

       <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold">¿Listo para aplicar estas ideas?</h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Hablemos de cómo nuestras estrategias pueden llevar tu negocio al siguiente nivel.
            </p>
            <Button size="lg" className="mt-8" asChild>
                <Link href="/contacto">
                    Reserva tu Sesión Estratégica <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

// Generate static paths for each blog post
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

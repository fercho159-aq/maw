import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FadeIn, SectionHeading } from '@/components/editorial';
import { getBlogPosts } from '@/app/blog/_actions';

/**
 * Publicaciones recientes como índice editorial: fecha en mono, título en
 * serif, categoría como metadato. Sin cards ni imágenes.
 */
export default async function BlogSection() {
  const allPosts = await getBlogPosts();
  const latestPosts = allPosts.slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="bg-background py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-4">
            <FadeIn>
              <SectionHeading
                number="05"
                eyebrow="Publicaciones"
                title="Notas desde la práctica."
              />
              <Link
                href="/blog"
                className="link-underline mt-8 inline-block font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                Ver todas las publicaciones
              </Link>
            </FadeIn>
          </div>
          <div className="col-span-12 lg:col-start-6 lg:col-span-7">
            {latestPosts.map((post, index) => (
              <FadeIn key={post.id} delay={index * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block border-t border-stone/40 py-8 last:border-b last:border-stone/40"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                    <time
                      dateTime={new Date(post.date).toISOString()}
                      className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:w-40 md:shrink-0"
                    >
                      {format(new Date(post.date), 'dd MMM yyyy', {
                        locale: es,
                      })}
                    </time>
                    <div>
                      <h3 className="font-display text-xl leading-snug text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
                        {post.title}
                      </h3>
                      {post.category ? (
                        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-stone">
                          {post.category}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

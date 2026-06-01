'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import AnimatedDiv from '@/components/animated-div';
import { ArrowRight, Calendar, User, Play, Youtube } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useState } from 'react';
import type { BlogPost } from './_actions';

const youtubeInterviews = [
  {
    id: "UiALcGee76A",
    title: "¿Cuáles son las mejores herramientas de Inteligencia Artificial? Aldo Trejo",
    channel: "Café Globo",
  },
  {
    id: "HkH3jPY8BLs",
    title: "Los Dioses Responden: ¿cómo es estudiar marketing en Argentina? Con Aldo Trejo, MAW Soluciones",
    channel: "Los Dioses Responden",
  },
  {
    id: "wt_4tLvl0Nc",
    title: "Los Dioses Responden: emprender a los 17 años. Con Aldo Trejo, de MAW Soluciones",
    channel: "Los Dioses Responden",
  },
  {
    id: "12m1NqG_3Is",
    title: "Nizme Lleras en Marketing y negocios | Podcast | MAW Soluciones",
    channel: "MAW Podcast",
  },
  {
    id: "8E7BLrAY3JQ",
    title: "Lucero Trejo en Marketing y negocios | Podcast | MAW Soluciones",
    channel: "MAW Podcast",
  },
];

const VideoCard = ({ video }: { video: typeof youtubeInterviews[0] }) => (
  <AnimatedDiv>
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg overflow-hidden bg-card shadow-lg hover:-translate-y-2 transition-transform duration-300 h-full"
    >
      <div className="relative aspect-video">
        <Image
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium text-primary mb-2 flex items-center gap-1.5">
          <Youtube className="w-3.5 h-3.5" />
          {video.channel}
        </p>
        <h3 className="font-headline text-base font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
      </div>
    </a>
  </AnimatedDiv>
);


const PostCard = ({ post }: { post: BlogPost }) => (
    <AnimatedDiv>
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
          {post.featured_image_url && (
              <div className="relative aspect-video">
                  <Image 
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
              </div>
          )}
          <div className="p-6 flex flex-col flex-grow">
            {post.category && <Badge variant="secondary" className="mb-2 w-fit">{post.category}</Badge>}
            <h3 className="font-headline text-lg font-bold mb-3 flex-grow group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-foreground/70 mb-4">
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <time dateTime={new Date(post.date).toISOString()}>{format(new Date(post.date), "dd MMM yyyy", { locale: es })}</time>
              </div>
            </div>
            {post.excerpt && (
              <p className="text-sm text-foreground/80 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center text-sm text-primary mt-auto font-semibold">
              Leer más <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </AnimatedDiv>
  );

export default function BlogPageContent({ posts }: { posts: BlogPost[] }) {
    const [activeTab, setActiveTab] = useState('all');

    const newsPosts = posts.filter(p => p.category === 'Noticias');
    const interviewPosts = posts.filter(p => p.category === 'Entrevistas');
    
    return (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <AnimatedDiv className="flex justify-center mb-12">
                <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="news">Noticias</TabsTrigger>
                    <TabsTrigger value="interviews">Entrevistas</TabsTrigger>
                </TabsList>
            </AnimatedDiv>

            <TabsContent value="all">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="news">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="interviews">
                {interviewPosts.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                        {interviewPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
                <AnimatedDiv className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Videos</p>
                    <h3 className="font-headline text-2xl font-bold">En los Medios</h3>
                </AnimatedDiv>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {youtubeInterviews.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}

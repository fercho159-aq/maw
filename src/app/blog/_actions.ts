
'use server';

import { db } from '@/lib/db';
import { blog_posts, type NewBlogPost } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export type BlogPost = typeof blog_posts.$inferSelect & {
    related_posts?: { title: string; link: string }[] | null
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db.query.blog_posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.date)],
    });
    // Temporal fix to replace Google Drive URL with a working one.
    return posts.map(post => {
      if (post.featured_image_url && post.featured_image_url.includes('drive.google.com')) {
        return { ...post, featured_image_url: 'https://i.imgur.com/y4Uu2my.png' };
      }
      return post;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const post = await db.query.blog_posts.findFirst({
            where: eq(blog_posts.slug, slug),
        });
        if (!post) return null;
        
        if (post && post.featured_image_url && post.featured_image_url.includes('drive.google.com')) {
          post.featured_image_url = 'https://i.imgur.com/y4Uu2my.png';
        }
        
        let relatedPostsParsed = null;
        if (post.related_posts) {
            try {
                relatedPostsParsed = JSON.parse(post.related_posts);
            } catch (e) {
                console.error('Error parsing related_posts JSON:', e);
            }
        }

        return {
            ...post,
            related_posts: relatedPostsParsed
        };
    } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        return null;
    }
}

import { cache } from 'react';
import 'server-only';
import {
  getBlogPosts,
  getBlogPost,
  searchBlogPosts,
} from '@/data/services/content';
import { transformBlogPostToNews } from '@/data/services/transformers';
import type { NewsArticle } from '@/types/product';

// Get latest blog posts for news section
export const getLatestNews = cache(
  async (limit: number = 4): Promise<NewsArticle[]> => {
    const posts = await getBlogPosts();
    const selectedPosts = posts.slice(0, limit);
    return selectedPosts.map(transformBlogPostToNews);
  }
);

// Get blog post by slug with full content
export const getBlogPostBySlug = cache(async (slug: string) => {
  return getBlogPost(slug);
});

// Search blog posts and return news format
export const searchNews = cache(
  async (query: string): Promise<NewsArticle[]> => {
    const posts = await searchBlogPosts(query);
    return posts.map(transformBlogPostToNews);
  }
);

// Get all blog posts for blog listing page
export const getAllBlogPosts = cache(async () => {
  return getBlogPosts();
});

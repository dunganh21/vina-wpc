import { getBlogPosts } from '@/data/services/content';
import { NewsSection } from './News';

export async function NewsServer() {
  // Fetch blog posts and get the first 4 for the news section
  const blogPosts = await getBlogPosts();
  const featuredPosts = blogPosts.slice(0, 4); // Get first 4 blog posts

  return <NewsSection blogPosts={featuredPosts} />;
}
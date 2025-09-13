import { getBlogPosts } from '@/data/services/content';
import { BlogPage } from './BlogPage';

export async function BlogPageServer() {
  const blogPosts = await getBlogPosts();

  return <BlogPage blogPosts={blogPosts} />;
}
import { BlogDetailPage } from '@/components/sections/BlogDetailPage';
import { getBlogPost, getRelatedBlogPosts, getAllBlogSlugs } from '@/data/services/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BlogDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Bài viết không tồn tại',
    };
  }

  return {
    title: `${post.title} - VINA WPC`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(slug, post.category, 3);

  // Transform CMS data to match BlogDetailPage interface
  const transformedPost = {
    id: post.slug,
    title: post.title,
    subject: post.title, // Use title as subject
    image: post.image,
    content: post.content,
    date_created: post.date,
  };

  const transformedRelatedPosts = relatedPosts.map((relatedPost) => ({
    id: relatedPost.slug,
    title: relatedPost.title,
    excerpt: relatedPost.excerpt,
    date: relatedPost.date,
    category: relatedPost.category,
    imageUrl: relatedPost.image,
    slug: relatedPost.slug, // Add slug for navigation
  }));

  return (
    <main className="page-container bg-white">
      <BlogDetailPage post={transformedPost} relatedPosts={transformedRelatedPosts} />
    </main>
  );
}

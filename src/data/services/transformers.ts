import 'server-only';
import { formatPrice, extractDimensions } from '@/lib/product-utils';
import type {
  BlogPost,
  Product,
  NewsArticle,
  ProductSummary,
} from '@/types/product';

// Transform BlogPost to NewsCard format
export function transformBlogPostToNews(post: BlogPost): NewsArticle {
  return {
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    category: post.category,
    imageUrl: post.image || '/images/placeholder-blog.webp',
    readTime: '5 phút đọc', // Default reading time, can be calculated based on content length
  };
}

// Transform Product to ProductCard format
export function transformProductToCard(product: Product): ProductSummary {
  return {
    id: product.slug,
    slug: product.slug,
    image:
      product.gallery && product.gallery.length > 0
        ? product.gallery[0]
        : '/images/placeholder-product.webp',
    title: product.title,
    collection: product.collection,
    price: formatPrice(product.price),
    dimensions: extractDimensions(product.specifications),
    colors: product.colors || [],
  };
}

// Transform Product to SearchResult format
export function transformProductToSearchResult(product: Product) {
  return {
    id: product.slug,
    image:
      product.gallery && product.gallery.length > 0
        ? product.gallery[0]
        : '/images/placeholder-product.webp',
    title: product.title,
    collection: product.collection,
    price: formatPrice(product.price),
    dimensions: extractDimensions(product.specifications),
    slug: product.slug,
  };
}

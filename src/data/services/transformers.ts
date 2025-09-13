import 'server-only';
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
    imageUrl: post.image || '/images/placeholder-blog.jpg',
    readTime: '5 phút đọc', // Default reading time, can be calculated based on content length
  };
}

// Transform Product to ProductCard format
export function transformProductToCard(product: Product): ProductSummary {
  // Extract dimensions from specifications - look for dimension patterns
  const extractDimensions = (specs: string): string => {
    if (!specs) return '';

    // Look for patterns like 1800x150x25mm, 140x25mm, etc.
    const dimensionMatch = specs.match(
      /(\d+×?\d*×?\d*\s?mm|\d+x\d+x?\d*\s?mm)/i
    );
    if (dimensionMatch) {
      return dimensionMatch[0];
    }

    // Fallback - look for lines with "Kích thước" and extract the dimension part
    const lines = specs.split('\n');
    for (const line of lines) {
      if (line.includes('Kích thước')) {
        const match = line.match(/(\d+×?\d*×?\d*\s?mm|\d+x\d+x?\d*\s?mm)/i);
        if (match) {
          return match[0];
        }
      }
    }

    return '';
  };

  return {
    id: product.slug,
    slug: product.slug,
    image:
      product.gallery && product.gallery.length > 0
        ? product.gallery[0]
        : '/images/placeholder-product.jpg',
    title: product.title,
    collection: product.collection,
    price: product.price || 'Liên hệ',
    dimensions: extractDimensions(product.specifications),
    colors: product.colors || [],
  };
}

// Transform Product to SearchResult format
export function transformProductToSearchResult(product: Product) {
  // Extract dimensions from specifications - look for dimension patterns
  const extractDimensions = (specs: string): string => {
    if (!specs) return '';

    // Look for patterns like 1800x150x25mm, 140x25mm, etc.
    const dimensionMatch = specs.match(
      /(\d+×?\d*×?\d*\s?mm|\d+x\d+x?\d*\s?mm)/i
    );
    if (dimensionMatch) {
      return dimensionMatch[0];
    }

    // Fallback - look for lines with "Kích thước" and extract the dimension part
    const lines = specs.split('\n');
    for (const line of lines) {
      if (line.includes('Kích thước')) {
        const match = line.match(/(\d+×?\d*×?\d*\s?mm|\d+x\d+x?\d*\s?mm)/i);
        if (match) {
          return match[0];
        }
      }
    }

    return '';
  };

  return {
    id: product.slug,
    image:
      product.gallery && product.gallery.length > 0
        ? product.gallery[0]
        : '/images/placeholder-product.jpg',
    title: product.title,
    collection: product.collection,
    price: product.price || 'Liên hệ',
    dimensions: extractDimensions(product.specifications),
    slug: product.slug,
  };
}

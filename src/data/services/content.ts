import { cache } from 'react';
import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { parsePrice } from '@/lib/product-utils';
import { matchesPriceRange } from '@/lib/filter-constants';
import type { BlogPost, Product, ProductFilters } from '@/types/product';

const contentDirectory = path.join(process.cwd(), 'content');

// ==================== UTILITY FUNCTIONS ====================

// Format date for display in Vietnamese format
function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  // Format as DD/MM/YYYY
  return dateObj.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// ==================== CACHED DATA FUNCTIONS ====================
// Using React cache for automatic deduplication and memoization

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const blogDir = path.join(contentDirectory, 'blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDir);

  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const filePath = path.join(blogDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark().use(html).process(content);

        return {
          slug: filename.replace(/\.md$/, ''),
          title: data.title || '',
          date: data.date ? formatDate(data.date) : '',
          category: data.category || '',
          image: data.image || '',
          excerpt: data.excerpt || '',
          content: processedContent.toString(),
        } as BlogPost;
      })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

export const getBlogPost = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const filePath = path.join(contentDirectory, 'blog', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);

    return {
      slug,
      title: data.title || '',
      date: data.date ? formatDate(data.date) : '',
      category: data.category || '',
      image: data.image || '',
      excerpt: data.excerpt || '',
      content: processedContent.toString(),
    };
  }
);

export const getProducts = cache(async (): Promise<Product[]> => {
  const productsDir = path.join(contentDirectory, 'products');

  if (!fs.existsSync(productsDir)) {
    return [];
  }

  const filenames = fs.readdirSync(productsDir);

  const products = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const filePath = path.join(productsDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug: filename.replace(/\.md$/, ''),
          title: data.title || '',
          description: data.description || '',
          specifications: data.specifications || '',
          features: data.features || [],
          gallery: data.gallery || [],
          price: data.price,
          rooms: data.rooms || [],
          colors: data.colors || [],
          dimensions: data.dimensions || [],
          collection: data.collection || '',
        } as Product;
      })
  );

  return products;
});

export const getProduct = cache(
  async (slug: string): Promise<Product | null> => {
    const filePath = path.join(contentDirectory, 'products', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      specifications: data.specifications || '',
      features: data.features || [],
      gallery: data.gallery || [],
      price: data.price,
      rooms: data.rooms || [],
      colors: data.colors || [],
      dimensions: data.dimensions || [],
      collection: data.collection || '',
    };
  }
);

// ==================== SEARCH FUNCTIONS ====================

export const searchProducts = cache(
  async (query: string): Promise<Product[]> => {
    const allProducts = await getProducts();

    if (!query.trim()) return allProducts;

    const searchQuery = query.toLowerCase();

    return allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.specifications.toLowerCase().includes(searchQuery) ||
        product.features.some((feature) =>
          feature.toLowerCase().includes(searchQuery)
        ) ||
        product.colors.some((color) =>
          color.name.toLowerCase().includes(searchQuery)
        )
    );
  }
);

export const searchBlogPosts = cache(
  async (query: string): Promise<BlogPost[]> => {
    const allPosts = await getBlogPosts();

    if (!query.trim()) return allPosts;

    const searchQuery = query.toLowerCase();

    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery) ||
        post.category.toLowerCase().includes(searchQuery)
    );
  }
);

export const getRelatedBlogPosts = cache(
  async (
    currentSlug: string,
    category: string,
    limit: number = 3
  ): Promise<BlogPost[]> => {
    const allPosts = await getBlogPosts();

    // Filter posts by same category, excluding current post
    const relatedPosts = allPosts.filter(
      (post) =>
        post.slug !== currentSlug &&
        post.category.toLowerCase() === category.toLowerCase()
    );

    // Return limited number of related posts
    return relatedPosts.slice(0, limit);
  }
);

// ==================== FILTER FUNCTIONS ====================

export const getFilteredProducts = cache(
  async (filters: ProductFilters): Promise<Product[]> => {
    const allProducts = await getProducts();

    return allProducts.filter((product) => {
      // Category filter
      if (
        filters.category &&
        !product.title?.toLowerCase().includes(filters.category.toLowerCase())
      ) {
        return false;
      }

      // Color filter
      if (filters.colors && filters.colors.length > 0) {
        const hasMatchingColor = filters.colors.some((filterColor) =>
          product.colors.some(
            (productColor) => productColor.name === filterColor
          )
        );
        if (!hasMatchingColor) return false;
      }

      // Price range filter
      if (
        filters.priceRange &&
        !matchesPriceRange(parsePrice(product.price), filters.priceRange)
      ) {
        return false;
      }

      // Features filter
      if (filters.features && filters.features.length > 0) {
        const hasMatchingFeature = filters.features.some((feature) =>
          product.features.some((productFeature) =>
            productFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );
        if (!hasMatchingFeature) return false;
      }

      return true;
    });
  }
);

// ==================== UTILITY FUNCTIONS ====================


export const getProductsByCategory = cache(
  async (category: string): Promise<Product[]> => {
    const allProducts = await getProducts();
    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(category.toLowerCase())
    );
  }
);

export const getAvailableCategories = cache(async (): Promise<string[]> => {
  const allProducts = await getProducts();
  const categories = allProducts.map((product) => {
    // Extract category from title or description
    if (product.title.toLowerCase().includes('sàn')) return 'Sàn gỗ nhựa';
    if (product.title.toLowerCase().includes('ốp')) return 'Ốp tường';
    if (product.title.toLowerCase().includes('hàng rào')) return 'Hàng rào';
    return 'Khác';
  });
  return [...new Set(categories)]; // Remove duplicates
});

export const getAvailableColors = cache(async (): Promise<string[]> => {
  const allProducts = await getProducts();
  const allColors = allProducts.flatMap((product) =>
    product.colors.map((color) => color.name)
  );
  return [...new Set(allColors)]; // Remove duplicates
});

// ==================== SLUG FUNCTIONS ====================
// Note: These are NOT cached as they're used for generateStaticParams at build time

export function getAllBlogSlugs(): string[] {
  const blogDir = path.join(contentDirectory, 'blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDir);
  return filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''));
}

export function getAllProductSlugs(): string[] {
  const productsDir = path.join(contentDirectory, 'products');

  if (!fs.existsSync(productsDir)) {
    return [];
  }

  const filenames = fs.readdirSync(productsDir);
  return filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''));
}

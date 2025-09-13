import { cache } from 'react';
import 'server-only';
import {
  getProducts,
  getProduct,
  getFilteredProducts,
  searchProducts,
} from '@/data/services/content';
import {
  transformProductToCard,
  transformProductToSearchResult,
} from '@/data/services/transformers';
import { SORT_OPTIONS } from '@/lib/constants';
import type { ProductFilters, ProductSummary } from '@/types/product';

// Get products for product listing with filtering and sorting
export const getProductsForListing = cache(
  async (
    filters?: ProductFilters,
    sortBy: string = 'newest',
    page: number = 1,
    itemsPerPage: number = 12
  ): Promise<{
    products: ProductSummary[];
    totalCount: number;
    totalPages: number;
  }> => {
    // Get filtered products
    const products = filters
      ? await getFilteredProducts(filters)
      : await getProducts();

    // Apply sorting
    const sortOption = SORT_OPTIONS.find((opt) => opt.id === sortBy);
    if (sortOption) {
      products.sort((a, b) => {
        let aValue: string | number, bValue: string | number;

        switch (sortOption.field) {
          case 'price':
            aValue = a.price ? parseInt(a.price.replace(/[^\d]/g, '')) : 0;
            bValue = b.price ? parseInt(b.price.replace(/[^\d]/g, '')) : 0;
            break;
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'date':
          default:
            // Keep original order for date sorting (most recent first by default)
            return 0;
        }

        if (sortOption.order === 'desc') {
          return typeof aValue === 'number' && typeof bValue === 'number'
            ? bValue - aValue
            : String(bValue).localeCompare(String(aValue));
        } else {
          return typeof aValue === 'number' && typeof bValue === 'number'
            ? aValue - bValue
            : String(aValue).localeCompare(String(bValue));
        }
      });
    }

    // Calculate pagination
    const totalCount = products.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedProducts = products.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return {
      products: paginatedProducts.map(transformProductToCard),
      totalCount,
      totalPages,
    };
  }
);

// Get product by slug
export const getProductBySlug = cache(async (slug: string) => {
  return getProduct(slug);
});

// Search products for search modal
export const searchProductsForResults = cache(async (query: string) => {
  const products = await searchProducts(query);
  return products.map(transformProductToSearchResult);
});

// Get all products (for admin or full listings)
export const getAllProducts = cache(async () => {
  return getProducts();
});

// Get featured product for NewProduct section
export const getFeaturedProduct = cache(async () => {
  const products = await getProducts();
  console.log('[DEBUG] / getFeaturedProduct / products:', products);

  // Return first product as featured, or customize logic based on CMS data
  return products[0] || null;
});

// Get popular products for ProductPopular section
export const getPopularProducts = cache(async (limit: number = 4) => {
  const products = await getProducts();
  // Return first N products as popular, or add popularity field to CMS
  return products.slice(0, limit);
});

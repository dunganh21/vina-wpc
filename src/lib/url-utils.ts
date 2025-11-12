import { roomToUrlSlug } from './filter-constants';
import type { FilterData } from '@/hooks/useProductFilters';

/**
 * Builds URL search parameters from filters, page, and sort
 */
export function buildProductsUrl(
  filters: FilterData,
  page: number,
  sortAsc: boolean
): string {
  const params = new URLSearchParams();

  // Add collection filter
  if (filters.categories.length > 0) {
    params.set('collection', filters.categories.join(','));
  }

  // Add rooms filter (convert to URL slugs)
  if (filters.rooms.length > 0) {
    const roomSlugs = filters.rooms.map((room) => roomToUrlSlug(room));
    params.set('rooms', roomSlugs.join(','));
  }

  // Add price filter
  if (filters.priceRanges.length > 0) {
    params.set('price', filters.priceRanges.join(','));
  }

  // Add page if not first page
  if (page > 1) {
    params.set('page', page.toString());
  }

  // Add sort if not default (price-asc)
  if (!sortAsc) {
    params.set('sort', 'price-desc');
  }

  const queryString = params.toString();
  return queryString ? `/products?${queryString}` : '/products';
}

/**
 * Updates the browser URL without navigation
 */
export function updateUrl(url: string): void {
  window.history.replaceState({}, '', url);
}

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { transformProductForCard, parsePrice } from '@/lib/product-utils';
import { matchesPriceRange, ROOM_URL_TO_DISPLAY } from '@/lib/filter-constants';
import type { Product } from '@/types/product';

export interface FilterData {
  categories: string[];
  priceRanges: string[];
  rooms: string[];
}

interface UseProductFiltersOptions {
  products: Product[];
  itemsPerPage?: number;
}

interface UseProductFiltersReturn {
  // State
  filters: FilterData;
  sortAsc: boolean;
  currentPage: number;
  showFilters: boolean;

  // Computed values
  filteredProducts: ReturnType<typeof transformProductForCard>[];
  paginatedProducts: ReturnType<typeof transformProductForCard>[];
  totalPages: number;

  // Actions
  setFilters: (filters: FilterData) => void;
  setSortAsc: (sort: boolean) => void;
  setCurrentPage: (page: number) => void;
  setShowFilters: (show: boolean) => void;
}

/**
 * Custom hook to manage product filtering, sorting, and pagination
 * Reads initial state from URL parameters and manages all filter logic
 */
export function useProductFilters({
  products,
  itemsPerPage = 12,
}: UseProductFiltersOptions): UseProductFiltersReturn {
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [sortAsc, setSortAsc] = useState(true); // true = low to high (default)
  const [filters, setFilters] = useState<FilterData>({
    categories: [],
    priceRanges: [],
    rooms: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Read URL parameters and initialize filters from URL (client-side only)
  useEffect(() => {
    const rooms = searchParams.get('rooms');
    const collection = searchParams.get('collection');
    const price = searchParams.get('price');
    const page = searchParams.get('page');
    const sort = searchParams.get('sort');

    // Parse filters from URL
    const urlFilters: FilterData = {
      categories: collection ? collection.split(',') : [],
      rooms: rooms
        ? rooms.split(',').map((room) => {
            return ROOM_URL_TO_DISPLAY[room.toLowerCase()] || room;
          })
        : [],
      priceRanges: price ? price.split(',') : [],
    };

    // Check if URL has any filters
    const hasUrlFilters =
      urlFilters.categories.length > 0 ||
      urlFilters.rooms.length > 0 ||
      urlFilters.priceRanges.length > 0;

    // Apply URL filters
    if (hasUrlFilters) {
      setFilters(urlFilters);
      setShowFilters(true);
    }

    // Apply URL page
    if (page) {
      const pageNum = parseInt(page);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      }
    }

    // Apply URL sort
    if (sort === 'price-desc') {
      setSortAsc(false);
    } else if (sort === 'price-asc') {
      setSortAsc(true);
    }
  }, [searchParams]);

  // Create product map for O(1) lookup
  const productMap = useMemo(
    () => new Map(products.map((product) => [product.slug, product])),
    [products]
  );

  // Transform products for display
  const transformedProducts = useMemo(() => {
    return products.map(transformProductForCard);
  }, [products]);

  // Apply filters and sorting
  const { filteredProducts, totalPages } = useMemo(() => {
    let filtered = transformedProducts;

    // Apply client-side filtering
    const hasActiveFilters =
      filters.categories.length > 0 ||
      filters.rooms.length > 0 ||
      filters.priceRanges.length > 0;

    if (hasActiveFilters) {
      // Filter by categories
      if (filters.categories.length > 0) {
        filtered = filtered.filter((product) => {
          const productData = productMap.get(product.slug);
          if (!productData) return false;
          return filters.categories.some(
            (category) =>
              productData.collection
                .toLowerCase()
                .includes(category.toLowerCase()) ||
              productData.title.toLowerCase().includes(category.toLowerCase())
          );
        });
      }

      // Filter by rooms
      if (filters.rooms.length > 0) {
        filtered = filtered.filter((product) => {
          const productData = productMap.get(product.slug);
          if (!productData?.rooms) return false;
          return filters.rooms.some((filterRoom) => {
            const normalizedFilterRoom = filterRoom
              .toLowerCase()
              .replace(/\s+/g, '');
            return productData.rooms?.some((productRoom) => {
              const normalizedProductRoom = productRoom
                .toLowerCase()
                .replace(/\s+/g, '');
              return (
                normalizedProductRoom.includes(normalizedFilterRoom) ||
                productRoom.toLowerCase().includes(filterRoom.toLowerCase())
              );
            });
          });
        });
      }

      // Filter by price ranges
      if (filters.priceRanges.length > 0) {
        filtered = filtered.filter((product) => {
          const productData = productMap.get(product.slug);
          if (!productData) return false;
          const price = parsePrice(productData.price);
          return filters.priceRanges.some((range) =>
            matchesPriceRange(price, range)
          );
        });
      }
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      const productA = productMap.get(a.slug);
      const productB = productMap.get(b.slug);

      if (!productA || !productB) return 0;

      const numPriceA = parsePrice(productA.price);
      const numPriceB = parsePrice(productB.price);

      return sortAsc ? numPriceA - numPriceB : numPriceB - numPriceA;
    });

    const pages = Math.ceil(filtered.length / itemsPerPage);
    return { filteredProducts: filtered, totalPages: pages };
  }, [transformedProducts, productMap, filters, sortAsc, itemsPerPage]);

  // Get products for current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return {
    // State
    filters,
    sortAsc,
    currentPage,
    showFilters,

    // Computed values
    filteredProducts,
    paginatedProducts,
    totalPages,

    // Actions
    setFilters,
    setSortAsc,
    setCurrentPage,
    setShowFilters,
  };
}

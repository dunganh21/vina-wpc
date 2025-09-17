'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebarDesktop } from '@/components/ui/FilterSidebarDesktop';
import { FilterSidebarMobile } from '@/components/ui/FilterSidebarMobile';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { transformProductForCard, parsePrice } from '@/lib/product-utils';
import { matchesPriceRange, roomToUrlSlug } from '@/lib/filter-constants';
import type { Product } from '@/types/product';

interface FilterData {
  categories: string[];
  priceRanges: string[];
  rooms: string[];
}

// 🔧 Removed: Using centralized transformProductForCard from @/lib/product-utils

interface ProductListProps {
  cmsProducts?: Product[];
  serverFilteredProducts?: Product[];
  initialFilters?: FilterData;
  initialPage?: number;
  initialSort?: boolean;
}

export function ProductList({
  cmsProducts = [],
  serverFilteredProducts = [],
  initialFilters = { categories: [], priceRanges: [], rooms: [] },
  initialPage = 1,
  initialSort = true,
}: ProductListProps) {
  const [showFilters, setShowFilters] = useState(
    initialFilters.categories.length > 0 ||
      initialFilters.rooms.length > 0 ||
      initialFilters.priceRanges.length > 0
  );
  const [sortAsc, setSortAsc] = useState(initialSort); // true = low to high (default)
  const [filters, setFilters] = useState<FilterData>(initialFilters);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 12;

  const productMap = useMemo(
    () => new Map(cmsProducts.map((product) => [product.slug, product])),
    [cmsProducts]
  );

  const transformedProducts = useMemo(() => {
    const sourceProducts =
      serverFilteredProducts.length > 0 ? serverFilteredProducts : cmsProducts;

    return sourceProducts.map(transformProductForCard);
  }, [serverFilteredProducts, cmsProducts]);

  const { filteredProducts, totalPages } = useMemo(() => {
    let products = transformedProducts;

    const needsClientFiltering =
      JSON.stringify(filters) !== JSON.stringify(initialFilters);

    if (needsClientFiltering) {
      // Apply filters with optimized lookups
      if (filters.categories.length > 0) {
        products = products.filter((product) => {
          const productData = productMap.get(product.slug); // O(1) lookup!
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

      if (filters.rooms.length > 0) {
        products = products.filter((product) => {
          const productData = productMap.get(product.slug); // O(1) lookup!
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

      if (filters.priceRanges.length > 0) {
        products = products.filter((product) => {
          const productData = productMap.get(product.slug); // O(1) lookup!
          if (!productData?.price && productData?.price !== 0) return false;

          // Use the parsePrice function for consistent parsing
          const priceNum = parsePrice(productData.price);
          if (priceNum === Infinity) return false; // Skip "Liên hệ" items

          return filters.priceRanges.some((range) =>
            matchesPriceRange(priceNum, range)
          );
        });
      }
    }

    // 🔑 Performance Fix: Improved price sorting ("Liên hệ" items at bottom)
    products = [...products].sort((a, b) => {
      // Get original product data for accurate price parsing
      const productDataA = productMap.get(a.slug);
      const productDataB = productMap.get(b.slug);

      const priceA = productDataA?.price ?? 0;
      const priceB = productDataB?.price ?? 0;

      return sortAsc ? priceA - priceB : priceB - priceA;
    });

    const totalPages = Math.ceil(products.length / itemsPerPage);
    return { filteredProducts: products, totalPages };
  }, [transformedProducts, productMap, filters, sortAsc, initialFilters]);

  // Get products for current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (newFilters: FilterData) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change

    // 🔑 Senior Decision: Simplified URL update - keep existing logic for now
    // Future enhancement: Use Next.js useRouter for better navigation
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams();

      if (newFilters.categories.length > 0) {
        searchParams.set('collection', newFilters.categories.join(','));
      }

      if (newFilters.rooms.length > 0) {
        const roomsForUrl = newFilters.rooms.map(roomToUrlSlug);
        searchParams.set('rooms', roomsForUrl.join(','));
      }

      if (newFilters.priceRanges.length > 0) {
        searchParams.set('price', newFilters.priceRanges.join(','));
      }

      // Preserve current sort parameter when filters change
      searchParams.set('sort', sortAsc ? 'price-asc' : 'price-desc');

      // 🔑 Add page parameter to URL
      if (currentPage > 1) {
        searchParams.set('page', currentPage.toString());
      }

      const newUrl = searchParams.toString()
        ? `${window.location.pathname}?${searchParams.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, '', newUrl);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = () => {
    const newSortAsc = !sortAsc;
    setSortAsc(newSortAsc);

    // Update URL with sort parameter
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams();

      // Add current filters to URL
      if (filters.categories.length > 0) {
        searchParams.set('collection', filters.categories.join(','));
      }

      if (filters.rooms.length > 0) {
        const roomsForUrl = filters.rooms.map(roomToUrlSlug);
        searchParams.set('rooms', roomsForUrl.join(','));
      }

      if (filters.priceRanges.length > 0) {
        searchParams.set('price', filters.priceRanges.join(','));
      }

      // Add sort parameter (use newSortAsc, not sortAsc which hasn't updated yet)
      searchParams.set('sort', newSortAsc ? 'price-asc' : 'price-desc');

      // Add page parameter if not first page
      if (currentPage > 1) {
        searchParams.set('page', currentPage.toString());
      }

      const newUrl = searchParams.toString()
        ? `${window.location.pathname}?${searchParams.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, '', newUrl);
    }
  };

  const handleClearFilters = () => {
    const emptyFilters = { categories: [], priceRanges: [], rooms: [] };
    setFilters(emptyFilters);
    setCurrentPage(1);

    // Clear URL params
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  return (
    <section className="py-10 lg:py-16">
      <div className="page-container">
        {/* Header with Sort */}
        <div className="mb-6 flex items-center justify-between lg:mb-8">
          <button
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="h5">Bộ lọc</span>
            <Image
              src="/icons/arrow-up.svg"
              alt="Arrow up"
              width={16}
              height={16}
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                showFilters && 'rotate-180'
              )}
            />
          </button>
          <button
            className="flex cursor-pointer items-baseline gap-2"
            onClick={handleSortChange}
          >
            <span className="h5">Sắp xếp:</span>
            <span className="h5 font-normal">
              Giá từ {sortAsc ? 'thấp' : 'cao'} &gt; {sortAsc ? 'cao' : 'thấp'}
            </span>
            <Image
              src="/icons/arrow-up.svg"
              alt="Arrow up"
              width={16}
              height={16}
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                sortAsc && 'rotate-180'
              )}
            />
          </button>
        </div>

        {/* Desktop Layout - Filter + Products */}
        <div className="mb-8 hidden lg:mb-12 lg:block">
          <div
            className={cn(
              'grid transition-all duration-300 ease-in-out',
              showFilters
                ? 'grid-cols-[280px_1fr] gap-8'
                : 'grid-cols-[0px_1fr]'
            )}
          >
            {/* Filter Sidebar - Collapsible from left */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                showFilters ? 'w-[280px] opacity-100' : 'w-0 opacity-0'
              )}
            >
              <FilterSidebarDesktop
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </div>

            {/* Product Grid */}
            <div
              className={cn(
                'transition-all duration-300 ease-in-out',
                filteredProducts.length === 0 ? '' : 'grid gap-6',
                showFilters ? 'grid-cols-3' : 'grid-cols-4'
              )}
            >
              {filteredProducts.length === 0 ? (
                <EmptyState
                  title="Không tìm thấy sản phẩm"
                  description="Không có sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh các tiêu chí tìm kiếm hoặc xóa bộ lọc để xem tất cả sản phẩm."
                  actionText="Xóa tất cả bộ lọc"
                  onAction={handleClearFilters}
                  className="col-span-full"
                />
              ) : (
                paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    staggerDelay={index * 50}
                    elementType="card"
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Products Only */}
        <div className="mb-8 lg:hidden">
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="Không tìm thấy sản phẩm"
              description="Không có sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh các tiêu chí tìm kiếm hoặc xóa bộ lọc để xem tất cả sản phẩm."
              actionText="Xóa tất cả bộ lọc"
              onAction={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {paginatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  staggerDelay={index * 50}
                  elementType="card"
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Filter Overlay */}
        <FilterSidebarMobile
          showFilters={showFilters}
          onClose={() => setShowFilters(false)}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />

        {/* Pagination */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onPrevious={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              onNext={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}

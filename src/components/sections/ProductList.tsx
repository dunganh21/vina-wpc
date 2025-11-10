'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebarDesktop } from '@/components/ui/FilterSidebarDesktop';
import { FilterSidebarMobile } from '@/components/ui/FilterSidebarMobile';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useProductFilters, type FilterData } from '@/hooks/useProductFilters';
import { buildProductsUrl, updateUrl } from '@/lib/url-utils';
import type { Product } from '@/types/product';

interface ProductListProps {
  cmsProducts?: Product[];
}

export function ProductList({ cmsProducts = [] }: ProductListProps) {
  // Use custom hook for all filter/sort/pagination logic
  const {
    filters,
    sortAsc,
    currentPage,
    showFilters,
    paginatedProducts,
    filteredProducts,
    totalPages,
    setFilters,
    setSortAsc,
    setCurrentPage,
    setShowFilters,
  } = useProductFilters({ products: cmsProducts });

  // Event handlers
  const handleFilterChange = (newFilters: FilterData) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change

    // Update URL
    const newUrl = buildProductsUrl(newFilters, 1, sortAsc);
    updateUrl(newUrl);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL
    const newUrl = buildProductsUrl(filters, page, sortAsc);
    updateUrl(newUrl);
  };

  const handleSortChange = () => {
    const newSortAsc = !sortAsc;
    setSortAsc(newSortAsc);

    // Update URL
    const newUrl = buildProductsUrl(filters, currentPage, newSortAsc);
    updateUrl(newUrl);
  };

  const handleClearFilters = () => {
    const emptyFilters: FilterData = { categories: [], priceRanges: [], rooms: [] };
    setFilters(emptyFilters);
    setCurrentPage(1);

    // Clear URL params
    updateUrl('/products');
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

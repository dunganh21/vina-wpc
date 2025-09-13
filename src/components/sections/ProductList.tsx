'use client';

import { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebarDesktop } from '@/components/ui/FilterSidebarDesktop';
import { FilterSidebarMobile } from '@/components/ui/FilterSidebarMobile';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface FilterData {
  categories: string[];
  priceRanges: string[];
  rooms: string[];
}

// Transform CMS Product data to ProductCard props format
function transformProductForCard(product: Product) {
  const primaryImage = product.gallery?.[0] || '/images/prd-lg-1.jpg';
  const extractDimensions = (specs: string): string => {
    const match = specs.match(/Kích thước:\s*([^\n]+)/);
    return match ? match[1].trim() : '900×120×15mm';
  };

  return {
    id: product.slug,
    slug: product.slug,
    image: primaryImage,
    title: product.title,
    subtitle: product.collection,
    price: product.price || '850.000đ/m²',
    dimensions: extractDimensions(product.specifications),
  };
}

interface ProductListProps {
  cmsProducts?: Product[];
}

export function ProductList({ cmsProducts = [] }: ProductListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortAsc, setSortAsc] = useState(true); // true = low to high (default)
  const [filters, setFilters] = useState<FilterData>({ categories: [], priceRanges: [], rooms: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize filters from URL search params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);

      const roomsParam = searchParams.get('rooms');
      const collectionsParam = searchParams.get('collection');
      const priceParam = searchParams.get('price');

      // Convert URL room format to display format
      const convertRoomFromUrl = (urlRoom: string): string => {
        const roomMap: { [key: string]: string } = {
          'phongkhach': 'phòng khách',
          'phongngu': 'phòng ngủ',
          'phongbep': 'phòng bếp',
          'phongtam': 'phòng tắm',
          'sanvuon': 'sân vườn',
          'bancong': 'ban công',
          'hanhlang': 'hành lang',
          'vanphong': 'văn phòng',
        };
        return roomMap[urlRoom.toLowerCase()] || urlRoom;
      };

      const initialFilters: FilterData = {
        categories: collectionsParam ? collectionsParam.split(',').map(c => c.trim()) : [],
        rooms: roomsParam ? roomsParam.split(',').map(r => convertRoomFromUrl(r.trim())) : [],
        priceRanges: priceParam ? priceParam.split(',').map(p => p.trim()) : [],
      };

      // Only update if there are actual filter params
      if (initialFilters.categories.length > 0 || initialFilters.rooms.length > 0 || initialFilters.priceRanges.length > 0) {
        setFilters(initialFilters);
        setShowFilters(true); // Auto-open filters when URL params are present
      }
    }
  }, []);

  // Transform and filter/sort products
  const { filteredProducts, totalPages } = useMemo(() => {
    let products = cmsProducts.map(transformProductForCard);

    // Apply filters
    if (filters.categories.length > 0) {
      products = products.filter(product =>
        filters.categories.some(category => {
          const productData = cmsProducts.find(p => p.slug === product.slug);
          if (!productData) return false;
          return productData.collection.toLowerCase().includes(category.toLowerCase()) ||
                 productData.title.toLowerCase().includes(category.toLowerCase());
        })
      );
    }

    if (filters.rooms.length > 0) {
      products = products.filter(product => {
        const productData = cmsProducts.find(p => p.slug === product.slug);
        if (!productData?.rooms) return false;
        return filters.rooms.some(filterRoom => {
          // Handle both URL format (phongkhach) and display format (phòng khách)
          const normalizedFilterRoom = filterRoom.toLowerCase().replace(/\s+/g, '');
          return productData.rooms?.some(productRoom => {
            const normalizedProductRoom = productRoom.toLowerCase().replace(/\s+/g, '');
            return normalizedProductRoom.includes(normalizedFilterRoom) ||
                   productRoom.toLowerCase().includes(filterRoom.toLowerCase());
          });
        });
      });
    }

    if (filters.priceRanges.length > 0) {
      products = products.filter(product => {
        if (!product.price || product.price === 'Liên hệ') return false;
        const priceNum = parseInt(product.price.replace(/[^\d]/g, ''));
        return filters.priceRanges.some(range => {
          switch (range) {
            case 'under-250': return priceNum < 250000;
            case '600-850': return priceNum >= 600000 && priceNum <= 850000;
            case '850-1000': return priceNum >= 850000 && priceNum <= 1000000;
            case 'over-1000': return priceNum > 1000000;
            default: return true;
          }
        });
      });
    }

    // Apply sorting
    products.sort((a, b) => {
      const priceA = a.price === 'Liên hệ' ? 0 : parseInt(a.price.replace(/[^\d]/g, ''));
      const priceB = b.price === 'Liên hệ' ? 0 : parseInt(b.price.replace(/[^\d]/g, ''));
      return sortAsc ? priceA - priceB : priceB - priceA;
    });

    const totalPages = Math.ceil(products.length / itemsPerPage);
    return { filteredProducts: products, totalPages };
  }, [cmsProducts, filters, sortAsc]);

  // Get products for current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (newFilters: FilterData) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change

    // Update URL with new filters
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams();

      if (newFilters.categories.length > 0) {
        searchParams.set('collection', newFilters.categories.join(','));
      }

      if (newFilters.rooms.length > 0) {
        // Convert display format to URL format
        const convertRoomToUrl = (displayRoom: string): string => {
          const roomMap: { [key: string]: string } = {
            'phòng khách': 'phongkhach',
            'phòng ngủ': 'phongngu',
            'phòng bếp': 'phongbep',
            'phòng tắm': 'phongtam',
            'sân vườn': 'sanvuon',
            'ban công': 'bancong',
            'hành lang': 'hanhlang',
            'văn phòng': 'vanphong',
          };
          return roomMap[displayRoom.toLowerCase()] || displayRoom.replace(/\s+/g, '').toLowerCase();
        };

        const roomsForUrl = newFilters.rooms.map(convertRoomToUrl);
        searchParams.set('rooms', roomsForUrl.join(','));
      }

      if (newFilters.priceRanges.length > 0) {
        searchParams.set('price', newFilters.priceRanges.join(','));
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
            onClick={() => setSortAsc(!sortAsc)}
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
              onPrevious={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              onNext={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

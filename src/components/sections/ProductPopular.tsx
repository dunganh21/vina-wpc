'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { transformProductForCard } from '@/lib/product-utils';
import type { Product } from '@/types/product';

// 🔧 Removed: Using centralized transformProductForCard from @/lib/product-utils
// 🚫 Removed: All fallback/mock products as requested

interface ProductPopularProps {
  cmsProducts?: Product[];
}

export function ProductPopular({ cmsProducts = [] }: ProductPopularProps) {
  const router = useRouter();

  // Transform real product data to card format - only show if we have real products
  const featuredProducts = cmsProducts.length > 0
    ? cmsProducts.slice(0, 4).map(transformProductForCard)
    : [];

  // Hide section completely if no real products available
  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="pt-7 pb-10 lg:py-11">
      <div className="page-container">
        {/* Section Header */}
        <div className="mb-5 flex flex-row items-end justify-between lg:mb-7">
          <div className="space-y-1">
            <div className="subtitle-4">Sản phẩm nổi bật</div>
            <h2 className="h2 max-w-[400px]">Sản phẩm được chọn nhiều nhất</h2>
          </div>

          {/* Desktop "Xem tất cả" button */}
          <div className="hidden lg:block">
            <Button variant="button" onClick={() => router.push('/products')}>
              Xem tất cả
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-8 grid grid-cols-2 gap-2 lg:mb-12 lg:grid-cols-4 lg:gap-7">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              staggerDelay={index * 80}
              elementType="card"
            />
          ))}
        </div>

        {/* Mobile "Xem tất cả" button */}
        <div className="flex justify-start lg:hidden">
          <Button
            className="px-8 py-4"
            onClick={() => router.push('/products')}
          >
            Xem tất cả
          </Button>
        </div>

        {/* Desktop Navigation - Pagination and Arrows */}
        {/* <div className="hidden items-center justify-between lg:flex">
          <PageIndicator
            currentPage={1}
            totalPages={4}
            onPageChange={(page) => console.log('Go to page:', page)}
            variant="dark"
          />

          <div className="flex items-center gap-0.5">
            <ButtonIcon
              variant="button-outline"
              theme="light"
              icon="arrow-left.svg"
              onClick={() => console.log('Previous')}
              aria-label="Previous page"
            />
            <ButtonIcon
              variant="button-outline"
              theme="light"
              icon="arrow-right.svg"
              onClick={() => console.log('Next')}
              aria-label="Next page"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}

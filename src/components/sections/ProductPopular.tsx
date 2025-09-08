'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { Button, ButtonIcon, PageIndicator } from '@/components/ui';

const featuredProducts = [
  {
    id: '1',
    image: '/images/prd-lg-1.jpg',
    title: 'Scandinavian Light',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '2',
    image: '/images/prd-lg-2.png',
    title: 'Modern Oak',
    subtitle: 'Tấm ốp gỗ sồi WR206',
    price: '920.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '3',
    image: '/images/prd-lg-3.png',
    title: 'Classic Pine',
    subtitle: 'Tấm ốp gỗ thông WR207',
    price: '780.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '4',
    image: '/images/prd-lg-4.png',
    title: 'Premium Walnut',
    subtitle: 'Tấm ốp gỗ óc chó WR208',
    price: '1.200.000đ/m²',
    dimensions: '900×120×15mm',
  },
];

export function ProductPopular() {
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
            <Button
              variant="button"
              onClick={() => console.log('View all products')}
            >
              Xem tất cả
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-8 grid grid-cols-2 gap-2 lg:mb-12 lg:grid-cols-4 lg:gap-7">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => console.log('Add to cart:', product.title)}
            />
          ))}
        </div>

        {/* Mobile "Xem tất cả" button */}
        <div className="flex justify-start lg:hidden">
          <Button
            className="px-8 py-4"
            onClick={() => console.log('View all products')}
          >
            Xem tất cả
          </Button>
        </div>

        {/* Desktop Navigation - Pagination and Arrows */}
        <div className="hidden items-center justify-between lg:flex">
          {/* Pagination Dots */}
          <PageIndicator
            currentPage={1}
            totalPages={4}
            onPageChange={(page) => console.log('Go to page:', page)}
            variant="dark"
          />

          {/* Navigation Arrows */}
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
        </div>
      </div>
    </section>
  );
}

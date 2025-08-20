'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebarDesktop } from '@/components/ui/FilterSidebarDesktop';
import { FilterSidebarMobile } from '@/components/ui/FilterSidebarMobile';
import Pagination from '@/components/ui/Pagination';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const products = [
  {
    id: '1',
    image: '/images/prd-lg-1.jpg',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '2',
    image: '/images/prd-lg-2.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '3',
    image: '/images/prd-lg-3.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '4',
    image: '/images/prd-lg-4.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '5',
    image: '/images/prd-lg-1.jpg',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '6',
    image: '/images/prd-lg-2.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '7',
    image: '/images/prd-lg-3.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '8',
    image: '/images/prd-lg-4.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '9',
    image: '/images/prd-lg-1.jpg',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '10',
    image: '/images/prd-lg-2.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '11',
    image: '/images/prd-lg-3.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
  {
    id: '12',
    image: '/images/prd-lg-4.png',
    title: 'SCANDINAVIAN LIGHT',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
  },
];

export function ProductList() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

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
              Giá từ {sortAsc ? 'cao' : 'thấp'} &gt; {sortAsc ? 'thấp' : 'cao'}
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
        <div className="hidden lg:block mb-8 lg:mb-12">
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
                onFilterChange={(filters) => console.log('Filters:', filters)}
              />
            </div>

            {/* Product Grid */}
            <div
              className={cn(
                'grid gap-6 transition-all duration-300 ease-in-out',
                showFilters ? 'grid-cols-3' : 'grid-cols-4'
              )}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => console.log('Add to cart:', product.title)}
                  onBuyNow={() => console.log('Buy now:', product.title)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Products Only */}
        <div className="lg:hidden mb-8">
          <div className="grid grid-cols-2 gap-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log('Add to cart:', product.title)}
                onBuyNow={() => console.log('Buy now:', product.title)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        <FilterSidebarMobile 
          showFilters={showFilters}
          onClose={() => setShowFilters(false)}
          onFilterChange={(filters) => console.log('Mobile Filters:', filters)}
        />
        

        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            currentPage={1}
            totalPages={5}
            onPageChange={(page) => console.log('Go to page:', page)}
            onPrevious={() => console.log('Previous page')}
            onNext={() => console.log('Next page')}
          />
        </div>
      </div>
    </section>
  );
}

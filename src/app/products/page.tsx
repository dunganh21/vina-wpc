import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductsHero } from '@/components/sections';
import { ProductList } from '@/components/sections/ProductList';
// Import generated product data for static client-side rendering
import productsData from '../../../public/data/products.json';
import type { Product } from '@/types/product';

// Static metadata for the products page
export const metadata: Metadata = {
  title: 'Sản phẩm - VINA WPC',
  description: 'Khám phá các sản phẩm gỗ nhựa WPC chất lượng cao',
};

export default function ProductsPage() {
  // Load products from generated JSON at build time
  const products = productsData as Product[];

  return (
    <main>
      <ProductsHero />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProductList cmsProducts={products} />
      </Suspense>
    </main>
  );
}
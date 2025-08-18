'use client';

import { ProductCard } from '@/components/ui/ProductCard';

const mockProducts = [
  {
    image: '/images/house.jpg',
    title: 'Scandinavian Light',
    subtitle: 'Tấm ốp gỗ sồi WR205',
    price: '850.000đ/m²',
    dimensions: '900×120×15mm',
    colors: [
      { id: '1', color: '#8B4513', selected: true },
      { id: '2', color: '#D2691E' },
      { id: '3', color: '#CD853F' },
    ],
  },
  {
    image: '/images/house.jpg',
    title: 'Modern Oak',
    subtitle: 'Tấm ốp gỗ sồi WR206',
    price: '920.000đ/m²',
    dimensions: '900×120×15mm',
    colors: [
      { id: '1', color: '#8B4513', selected: true },
      { id: '2', color: '#D2691E' },
    ],
  },
  {
    image: '/images/house.jpg',
    title: 'Classic Pine',
    subtitle: 'Tấm ốp gỗ thông WR207',
    price: '780.000đ/m²',
    dimensions: '900×120×15mm',
    colors: [
      { id: '1', color: '#DEB887', selected: true },
      { id: '2', color: '#F4A460' },
      { id: '3', color: '#D2B48C' },
    ],
  },
  {
    image: '/images/house.jpg',
    title: 'Premium Walnut',
    subtitle: 'Tấm ốp gỗ óc chó WR208',
    price: '1.200.000đ/m²',
    dimensions: '900×120×15mm',
    colors: [
      { id: '1', color: '#654321', selected: true },
      { id: '2', color: '#8B4513' },
    ],
  },
  {
    image: '/images/house.jpg',
    title: 'Natural Bamboo',
    subtitle: 'Tấm ốp tre WR209',
    price: '650.000đ/m²',
    dimensions: '900×120×15mm',
    colors: [
      { id: '1', color: '#F5DEB3', selected: true },
      { id: '2', color: '#DEB887' },
      { id: '3', color: '#D2B48C' },
    ],
  },
  {
    image: '/images/house.jpg',
    title: 'Exotic Teak',
    subtitle: 'Tấm ốp gỗ tếch WR210',
    price: '1.500.000đ/m²',
    dimensions: '900×120×15mm',
    colors: [
      { id: '1', color: '#8B4513', selected: true },
      { id: '2', color: '#A0522D' },
    ],
  },
];

export default function TestProductCardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          ProductCard Grid Test
        </h1>

        {/* Current Screen Size Indicator */}
        <div className="mb-8 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Current Breakpoint:</h2>
          <div className="flex gap-4">
            <span className="block rounded bg-red-100 px-3 py-1 text-red-800 sm:hidden">
              XS (&lt; 640px)
            </span>
            <span className="hidden rounded bg-orange-100 px-3 py-1 text-orange-800 sm:block md:hidden">
              SM (640px - 768px)
            </span>
            <span className="hidden rounded bg-yellow-100 px-3 py-1 text-yellow-800 md:block lg:hidden">
              MD (768px - 1024px)
            </span>
            <span className="hidden rounded bg-green-100 px-3 py-1 text-green-800 lg:block xl:hidden">
              LG (1024px - 1280px)
            </span>
            <span className="hidden rounded bg-blue-100 px-3 py-1 text-blue-800 xl:block 2xl:hidden">
              XL (1280px - 1536px)
            </span>
            <span className="hidden rounded bg-purple-100 px-3 py-1 text-purple-800 2xl:block">
              2XL (1536px+)
            </span>
          </div>
        </div>

        {/* Grid Test - Mobile First Responsive */}
        <div className="space-y-8">
          {/* 1 Column on Mobile */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">1 Column (Mobile)</h2>
            <div className="mx-auto grid max-w-sm grid-cols-1 gap-4">
              {mockProducts.slice(0, 2).map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  dimensions={product.dimensions}
                  colors={product.colors}
                  onAddToCart={() => console.log('Add to cart:', product.title)}
                />
              ))}
            </div>
          </section>

          {/* 2 Columns on Small Screens */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              2 Columns (Small Tablet)
            </h2>
            <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
              {mockProducts.slice(0, 4).map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  dimensions={product.dimensions}
                  colors={product.colors}
                  onAddToCart={() => console.log('Add to cart:', product.title)}
                />
              ))}
            </div>
          </section>

          {/* 3 Columns on Medium Screens */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">3 Columns (Tablet)</h2>
            <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4">
              {mockProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  dimensions={product.dimensions}
                  colors={product.colors}
                  onAddToCart={() => console.log('Add to cart:', product.title)}
                />
              ))}
            </div>
          </section>

          {/* 4 Columns on Large Screens */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">4 Columns (Desktop)</h2>
            <div className="grid grid-cols-4 gap-6">
              {mockProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  dimensions={product.dimensions}
                  colors={product.colors}
                  onAddToCart={() => console.log('Add to cart:', product.title)}
                />
              ))}
            </div>
          </section>

          {/* Responsive Grid */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Responsive Grid (1→2→3→4 columns)
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {mockProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  dimensions={product.dimensions}
                  colors={product.colors}
                  onAddToCart={() => console.log('Add to cart:', product.title)}
                />
              ))}
            </div>
          </section>

          {/* Edge Case: Very Narrow Container */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Edge Case: Narrow Container (150px)
            </h2>
            <div className="mx-auto w-[150px]">
              <ProductCard
                image={mockProducts[0].image}
                title={mockProducts[0].title}
                subtitle={mockProducts[0].subtitle}
                price={mockProducts[0].price}
                dimensions={mockProducts[0].dimensions}
                colors={mockProducts[0].colors}
                onAddToCart={() => console.log('Add to cart')}
              />
            </div>
          </section>

          {/* Edge Case: Very Wide Container */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Edge Case: Wide Container (500px)
            </h2>
            <div className="mx-auto w-[500px]">
              <ProductCard
                image={mockProducts[0].image}
                title={mockProducts[0].title}
                subtitle={mockProducts[0].subtitle}
                price={mockProducts[0].price}
                dimensions={mockProducts[0].dimensions}
                colors={mockProducts[0].colors}
                onAddToCart={() => console.log('Add to cart')}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { ProductTooltipCard } from '@/components/ui/ProductTooltipCard';

export default function Home() {
  return (
    <main className='min-h-screen bg-base-100'>
      {/* Temporary content to test header */}
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>
          <h1 className='hero-title text-primary mb-4'>VINA WPC</h1>
          <p className='text-xl text-neutral mb-8'>
            Bền vững từ tâm - nâng tầm cuộc sống
          </p>
          <div className='prose max-w-2xl mx-auto'>
            <p>
              Sản phẩm gỗ nhựa WPC của chúng tôi là dòng sản phẩm thân thiện với
              môi trường, có tính thẩm mỹ hiện đại phù hợp với nhiều không gian
              nội thất, không chỉ đẹp mà còn bền bỉ theo thời gian.
            </p>
          </div>
        </div>
      </div>

      {/* Product Card Demo Section */}
      <section className='container mx-auto px-4 py-16 space-y-16 mb-6'>
        <div className='text-center mb-12'>
          <h2 className='h2 text-neutral mb-4'>Sản phẩm nổi bật</h2>
          <p className='text-lg text-secondary'>
            Khám phá bộ sưu tập gỗ nhựa WPC cao cấp của chúng tôi
          </p>
        </div>

        <div className='flex justify-center'>
          <div className='w-full max-w-md'>
            <ProductCard
              image='/images/product-test.jpg'
              title='Scandinavian Light'
              subtitle='Tấm ốp gỗ sồi WR205'
              price='850.000đ/m²'
              dimensions='900×120×15mm'
              colors={[
                { id: '1', color: '#C0AF95' },
                { id: '2', color: '#D5CAB9' },
                { id: '3', color: '#9F8760', selected: true },
              ]}
              onColorSelect={(colorId) =>
                console.log('Color selected:', colorId)
              }
              onAddToCart={() => console.log('Added to cart')}
              onBuyNow={() => console.log('Buy now clicked')}
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <ProductTooltipCard
            image='/images/product-test.jpg'
            title='Scandinavian Light'
            subtitle='Tấm ốp gỗ sồi WR205'
            price='850.000đ/m²'
            dimensions='900×120×15mm'
          />
        </div>
      </section>
    </main>
  );
}

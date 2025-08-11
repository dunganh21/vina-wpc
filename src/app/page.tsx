'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { ProductTooltipCard } from '@/components/ui/ProductTooltipCard';
import { Button } from '@/components/ui/Button';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { Hero } from '@/components/sections';

export default function Home() {
  return (
    <main className='min-h-screen bg-base-100'>
      <Hero />

      {/* Content section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>
          <div className='prose max-w-2xl mx-auto'>
            <p className='text-xl text-neutral mb-8'>
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

      {/* Button Demo Section */}
      <section className='container mx-auto px-4 py-16 space-y-8'>
        <div className='text-center mb-12'>
          <h2 className='h2 text-neutral mb-4'>Demo Buttons</h2>
          <p className='text-lg text-secondary'>
            Các loại button khác nhau trong hệ thống thiết kế
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Primary Light Button */}
          <div className='text-center space-y-4'>
            <Button mode='light' className='w-full'>
              Button Light
            </Button>
            <p className='text-sm text-neutral'>Primary Light</p>
          </div>

          {/* Primary Dark Button */}
          <div className='text-center space-y-4'>
            <Button mode='dark' className='w-full'>
              Button Dark
            </Button>
            <p className='text-sm text-neutral'>Primary Dark</p>
          </div>

          {/* Outline Button */}
          <div className='text-center space-y-4'>
            <Button variant='button-outline' mode='light' className='w-full'>
              Outline Button
            </Button>
            <p className='text-sm text-neutral'>Outline Light</p>
          </div>

          {/* White Button */}
          <div className='text-center space-y-4'>
            <Button variant='white' className='w-full'>
              White Button
            </Button>
            <p className='text-sm text-neutral'>White Variant</p>
          </div>
        </div>

        {/* Button with Icon */}
        <div className='text-center space-y-4'>
          <Button mode='light' icon='search.svg' className='mx-auto'>
            Thêm vào giỏ hàng
          </Button>
          <p className='text-sm text-neutral'>Button with Shopping Cart Icon</p>
        </div>

        {/* ButtonIcon Variants */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-8'>
          {/* Button-icon Light */}
          <div className='text-center space-y-4'>
            <ButtonIcon
              variant='button-icon'
              theme='light'
              icon='search.svg'
              className='mx-auto'
              aria-label='Search Light'
            />
            <p className='text-sm text-neutral'>Button-icon Light</p>
          </div>

          {/* Button-icon Dark */}
          <div className='text-center space-y-4'>
            <ButtonIcon
              variant='button-icon'
              theme='dark'
              icon='search.svg'
              className='mx-auto'
              aria-label='Cart Dark'
            />
            <p className='text-sm text-neutral'>Button-icon Dark</p>
          </div>

          {/* Button-icon White */}
          <div className='text-center space-y-4 bg-neutral p-4 rounded'>
            <ButtonIcon
              variant='button-icon'
              theme='white'
              icon='search.svg'
              className='mx-auto'
              aria-label='Search White'
            />
            <p className='text-sm text-white'>Button-icon White</p>
          </div>

          {/* Button-outline Light */}
          <div className='text-center space-y-4'>
            <ButtonIcon
              variant='button-outline'
              theme='light'
              icon='search.svg'
              className='mx-auto'
              aria-label='Cart Outline Light'
            />
            <p className='text-sm text-neutral'>Button-outline Light</p>
          </div>

          {/* Button-outline Dark */}
          <div className='text-center space-y-4 bg-neutral p-4 rounded'>
            <ButtonIcon
              variant='button-outline'
              theme='dark'
              icon='search.svg'
              className='mx-auto'
              aria-label='Search Outline Dark'
            />
            <p className='text-sm text-white'>Button-outline Dark</p>
          </div>

          {/* Button-outline White */}
          <div className='text-center space-y-4 bg-neutral p-4 rounded'>
            <ButtonIcon
              variant='button-outline'
              theme='white'
              icon='search.svg'
              className='mx-auto'
              aria-label='Cart Outline White'
            />
            <p className='text-sm text-white'>Button-outline White</p>
          </div>
        </div>

        {/* Disabled States */}
        <div className='grid grid-cols-2 gap-8'>
          {/* Disabled Button */}
          <div className='text-center space-y-4'>
            <Button mode='light' disabled className='mx-auto'>
              Disabled Button
            </Button>
            <p className='text-sm text-neutral'>Disabled Button</p>
          </div>

          {/* Disabled ButtonIcon */}
          <div className='text-center space-y-4'>
            <ButtonIcon
              variant='button-icon'
              theme='light'
              icon='search.svg'
              disabled
              className='mx-auto'
              aria-label='Disabled Search'
            />
            <p className='text-sm text-neutral'>Disabled ButtonIcon</p>
          </div>
        </div>
      </section>
    </main>
  );
}

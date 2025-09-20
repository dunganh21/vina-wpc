'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductTooltipCard } from '@/components/ui/ProductTooltipCard';
import { ColorOption } from '@/components/ui/ColorOption';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { formatPrice } from '@/lib/product-utils';
import type { Product } from '@/types/product';

interface NewProductProps {
  product: Product;
}

export function NewProduct({ product }: NewProductProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || '1'
  );

  // Animation refs - Reduced delays for better flow
  const { ref: contentRef } = useScrollReveal<HTMLDivElement>({
    animationClass: 'animate-slide-left',
    staggerDelay: 0,
    elementType: 'text',
  });
  const { ref: imageRef } = useScrollReveal<HTMLDivElement>({
    animationClass: 'animate-product-card',
    staggerDelay: 100,
    elementType: 'background',
  });
  const { ref: tooltipRef } = useScrollReveal<HTMLDivElement>({
    staggerDelay: 200,
    elementType: 'card',
  });

  // Use product colors or fallback to default colors
  const colors =
    product.colors.length > 0
      ? product.colors.map((color) => ({ id: color.name, color: color.hex }))
      : [
          { id: '1', color: '#9F8760' },
          { id: '2', color: '#4E473C' },
        ];

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
  };

  return (
    <section className="pb-7 lg:pt-7 lg:pb-13">
      <div className="page-container">
        {/* Single Responsive Layout: Flexible Row with Wrap */}
        <div className="flex flex-row flex-wrap gap-11 lg:items-start lg:gap-16 xl:gap-24">
          {/* Content Section */}
          <div
            ref={contentRef}
            className="animate-slide-left w-full space-y-4 lg:w-80 lg:space-y-6 xl:w-96"
          >
            {/* Header */}
            <div className="space-y-2 lg:space-y-3">
              <h2 className="subtitle-2">Sản phẩm mới</h2>
              <h3>
                Lý tưởng cho căn nhà có ánh sáng tự nhiên & vẻ đẹp tinh giản.
              </h3>
              <p>
                Mang lại vẻ đẹp tự nhiên và tinh giản cho không gian sống. Vân
                gỗ mềm, tông màu sáng giúp mở rộng thị giác và tăng cảm giác
                sạch sẽ
              </p>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-1.5">
                <p className="body-3">
                  <span className="font-bold">Màu sắc:</span> {selectedColor}
                </p>
                <ColorOption
                  colors={colors}
                  selectedColor={selectedColor}
                  handleColorSelect={handleColorSelect}
                />
              </div>
            )}
          </div>

          {/* Image Section with Overlay Card */}
          <div className="relative flex-1">
            {/* Responsive Image Container */}
            <div
              ref={imageRef}
              className="animate-product-card relative aspect-[1.3/1] overflow-hidden bg-base-200 lg:aspect-[3/2]"
            >
              <Image
                src="/images/new-product-bg.png"
                alt="Wood paneling in modern interior"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </div>

            {/* Responsive Overlay Product Card */}
            <div
              ref={tooltipRef}
              className="animate-on-scroll absolute -top-6 right-0 lg:top-[12%] lg:left-[25%]"
            >
              <ProductTooltipCard
                id={product.slug}
                image={product.gallery[0] || '/images/product-placeholder.jpg'}
                title={product.title}
                subtitle={product.collection}
                price={formatPrice(product.price)}
                dimensions={product.dimensions?.[0] || 'Đa dạng kích thước'}
                slug={product.slug}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

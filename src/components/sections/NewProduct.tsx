'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductTooltipCard } from '@/components/ui/ProductTooltipCard';
import { ColorOption } from '@/components/ui/ColorOption';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function NewProduct() {
  const [selectedColor, setSelectedColor] = useState('1');

  // Animation refs - Reduced delays for better flow
  const { ref: contentRef } = useScrollReveal<HTMLDivElement>({ 
    animationClass: 'animate-slide-left',
    staggerDelay: 0,
    elementType: 'text'
  });
  const { ref: imageRef } = useScrollReveal<HTMLDivElement>({ 
    animationClass: 'animate-product-card',
    staggerDelay: 100,
    elementType: 'background'
  });
  const { ref: tooltipRef } = useScrollReveal<HTMLDivElement>({ 
    staggerDelay: 200,
    elementType: 'card'
  });

  const colors = [
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
          <div ref={contentRef} className="w-full space-y-4 lg:w-80 lg:space-y-6 xl:w-96 animate-slide-left">
            {/* Header */}
            <div className="space-y-2 lg:space-y-3">
              <h2 className="subtitle-2">Sản phẩm mới</h2>
              <h3>
                Lý tưởng cho căn nhà có ánh sáng tự nhiên & vẻ đẹp tinh giản.
              </h3>
              <p className="body-2">
                Mang lại vẻ đẹp tự nhiên và tinh giản cho không gian sống. Vân
                gỗ mềm, tông màu sáng giúp mở rộng thị giác và tăng cảm giác
                sạch sẽ
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-1.5">
              <p className="body-3">
                <span className="font-bold">Màu sắc:</span> nâu
              </p>
              <ColorOption
                colors={colors}
                selectedColor={selectedColor}
                handleColorSelect={handleColorSelect}
              />
            </div>
          </div>

          {/* Image Section with Overlay Card */}
          <div className="relative flex-1">
            {/* Responsive Image Container */}
            <div ref={imageRef} className="relative aspect-[1.3/1] overflow-hidden bg-base-200 lg:aspect-[3/2] animate-product-card">
              <Image
                src="/images/hero-bg.jpg"
                alt="Wood paneling in modern interior"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </div>

            {/* Responsive Overlay Product Card */}
            <div ref={tooltipRef} className="absolute -top-6 right-0 lg:top-[12%] lg:left-[25%] animate-on-scroll">
              <ProductTooltipCard
                image="/images/product-test.jpg"
                title="Scandinavian Light"
                subtitle="Tấm ốp gỗ sồi WR205"
                price="850.000đ/m²"
                dimensions="900×120×15mm"
                slug="scandinavian-light-wr205-featured"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

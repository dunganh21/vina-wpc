'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { ColorOption } from './ColorOption';

interface ColorOption {
  id: string;
  color: string;
  selected?: boolean;
}

interface ProductCardProps {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  dimensions: string;
  colors: ColorOption[];
  onColorSelect?: (colorId: string) => void;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  className?: string;
}

export function ProductCard({
  image,
  title,
  subtitle,
  price,
  dimensions,
  colors,
  onColorSelect,
  onAddToCart,
  onBuyNow,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    colors.find((color) => color.selected)?.id || colors[0]?.id
  );

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
    onColorSelect?.(colorId);
  };

  return (
    <div
      className={cn(
        'bg-white border border-black/10 shadow-card transition-all duration-300 cursor-pointer group',
        'hover:shadow-elevated hover:-translate-y-1',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className='relative w-full h-[417px]'>
        <Image
          src={image}
          alt={subtitle}
          width={405}
          height={417}
          className='w-full h-full object-cover'
        />

        {/* Shopping Cart Icon */}
        <div className='absolute top-full right-0'>
          <Button
            variant='button-icon'
            mode='light'
            icon='shopping-cart.svg'
            iconOnly
            onClick={onAddToCart}
            className='rounded-none'
          />
        </div>

        {/* Buy Now Button - Slides in on hover */}
        <Button
          onClick={onBuyNow}
          variant='white'
          mode='dark'
          className={cn(
            'absolute bottom-4 left-4 right-4 transition-all duration-300 shadow-sm',
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          )}
        >
          Mua ngay
        </Button>
      </div>

      {/* Main Content */}
      <div className='p-4 space-y-8'>
        {/* Header */}
        <div className='space-y-0.5'>
          <div className='text-primary subtitle-4'>{title}</div>
          <h5 className='text-neutral'>{subtitle}</h5>
        </div>

        {/* Price and Details */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <span className='text-neutral h6'>{price}</span>
            <div className='w-1 h-1 bg-neutral'></div>
            <span className='text-neutral body-3'>{dimensions}</span>
          </div>

          {/* Color Options */}
          <ColorOption
            colors={colors}
            selectedColor={selectedColor}
            handleColorSelect={handleColorSelect}
          />
        </div>
      </div>
    </div>
  );
}

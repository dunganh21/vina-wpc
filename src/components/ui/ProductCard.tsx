'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { ButtonIcon } from './ButtonIcon';
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
  slug?: string;
  colors?: ColorOption[];
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
  slug,
  colors = [],
  onColorSelect,
  onAddToCart,
  onBuyNow,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    colors.find((color) => color.selected)?.id || colors[0]?.id || ''
  );

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
    onColorSelect?.(colorId);
  };

  const CardContent = (
    <div
      className={cn(
        'group cursor-pointer border border-black/10 bg-white shadow-card transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-elevated',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[0.8/1] w-full lg:aspect-[0.9/1]">
        <Image
          src={image}
          alt={subtitle}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 405px, 100vw"
        />

        {/* Shopping Cart Icon */}
        <div className="absolute right-0 bottom-0 lg:top-full lg:right-0">
          <ButtonIcon
            variant="button-icon"
            theme="light"
            icon="shopping-cart.svg"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="rounded-none"
          />
        </div>

        {/* Buy Now Button - Slides in on hover */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onBuyNow?.();
          }}
          variant="white"
          mode="dark"
          className={cn(
            'absolute right-4 bottom-4 left-4 hidden shadow-sm transition-all duration-300 lg:block',
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0'
          )}
        >
          Mua ngay
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-4 p-2 lg:space-y-8 lg:p-4">
        {/* Header */}
        <div className="lg:space-y-0.5">
          <div className="subtitle-4">{title}</div>
          <h5>{subtitle}</h5>
        </div>

        {/* Price and Details */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
            <span className="h6">{price}</span>
            <div className="hidden h-1 w-1 bg-neutral lg:block"></div>
            <span className="body-3">{dimensions}</span>
          </div>

          {/* Color Options */}
          {!!colors.length && (
            <div onClick={(e) => e.stopPropagation()}>
              <ColorOption
                colors={colors}
                selectedColor={selectedColor}
                handleColorSelect={handleColorSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (slug) {
    return (
      <Link href={`/products/${slug}`} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

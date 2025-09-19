'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './Button';
import { ButtonIcon } from './ButtonIcon';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: string;
  dimensions: string;
  slug?: string;
  onColorSelect?: (colorId: string) => void;
  className?: string;
  staggerDelay?: number;
  elementType?: 'text' | 'image' | 'card' | 'background' | 'ui';
}

export function ProductCard({
  id,
  image,
  title,
  subtitle,
  price,
  dimensions,
  slug,
  className,
  staggerDelay = 0,
  elementType = 'card',
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { addItem } = useCart();

  // Add scroll reveal animation
  const { ref } = useScrollReveal<HTMLDivElement>({
    animationClass: 'animate-product-card',
    staggerDelay,
    elementType,
  });

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price,
      dimensions,
      image,
      slug: slug || id,
      collection: title, // Use title as collection fallback
      colors: [], // Empty colors array as fallback
    });
  };

  const CardContent = (
    <div
      ref={ref}
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
              handleAddToCart();
            }}
            className="rounded-none"
          />
        </div>

        {/* Buy Now Button - Slides in on hover */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
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
          <div className="subtitle-4">{subtitle}</div>
          <p className="h5 h-10 w-[80%]">{title}</p>
        </div>

        {/* Price and Details */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
            <span className="h6">{price}</span>
            <div className="hidden h-1 w-1 bg-neutral lg:block"></div>
            <span className="body-3">{dimensions}</span>
          </div>
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

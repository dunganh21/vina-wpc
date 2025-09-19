'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { ButtonIcon } from './ButtonIcon';

interface ProductTooltipCardProps {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: string;
  dimensions: string;
  slug?: string;
  className?: string;
}

export function ProductTooltipCard({
  id,
  image,
  title,
  subtitle,
  price,
  dimensions,
  slug,
  className,
}: ProductTooltipCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price,
      dimensions,
      image,
      slug: slug || id,
      collection: title,
      colors: [],
    });
  };
  const CardContent = (
    <div
      className={cn(
        'relative flex w-full max-w-[520px] min-w-[320px] cursor-pointer overflow-hidden bg-white shadow-tooltip',
        className
      )}
    >
      {/* Product Image */}
      <div className="h-[95px] w-[87px] flex-shrink-0 lg:h-[125px] lg:w-[114px]">
        <Image
          src={image}
          alt={subtitle}
          width={114}
          height={125}
          sizes="(max-width: 1024px) 87px, 114px"
          className="h-full w-full border-4 border-white object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-between bg-white px-[14px] py-[14px]">
        {/* Header */}
        <div className="max-w-[337px] space-y-0.5">
          <div className="subtitle-4">{subtitle}</div>
          <p className="h5">{title}</p>
        </div>

        {/* Price and Dimensions */}
        <div className="flex items-center gap-1 self-stretch">
          <span className="h6 text-primary">{price}</span>
          <div className="h-1 w-1 bg-neutral"></div>
          <span className="body-3 text-primary">{dimensions}</span>
        </div>
      </div>

      {/* Arrow Pointer - positioned at bottom-left */}
      <div className="absolute top-full left-[46px] h-0 w-0 border-t-[21px] border-r-[10.5px] border-l-[10.5px] border-t-white border-r-transparent border-l-transparent"></div>

      {/* Shopping Cart Button - positioned absolutely in top-right */}
      <ButtonIcon
        variant="button-icon"
        theme="light"
        icon="shopping-cart.svg"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToCart();
        }}
        className="absolute top-0 right-0 rounded-none"
        aria-label="Thêm vào giỏ hàng"
      />
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

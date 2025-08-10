'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ProductTooltipCardProps {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  dimensions: string;
  onAddToCart?: () => void;
  className?: string;
}

export function ProductTooltipCard({
  image,
  title,
  subtitle,
  price,
  dimensions,
  onAddToCart,
  className,
}: ProductTooltipCardProps) {
  return (
    <div
      className={cn(
        'relative flex w-full max-w-[519px] bg-white shadow-tooltip',
        className
      )}
    >
      {/* Product Image */}
      <div className='w-[114px] h-[125px] flex-shrink-0'>
        <Image
          src={image}
          alt={subtitle}
          width={114}
          height={125}
          className='w-full h-full object-cover border-4 border-white'
        />
      </div>

      {/* Main Content */}
      <div className='flex flex-col justify-between flex-1 px-[14px] py-[14px] bg-white'>
        {/* Header */}
        <div className='space-y-0.5 max-w-[337px]'>
          <div className='text-primary subtitle-4'>{title}</div>
          <h5 className='text-neutral'>{subtitle}</h5>
        </div>

        {/* Price and Dimensions */}
        <div className='flex items-center gap-1 self-stretch'>
          <span className='text-neutral h6'>{price}</span>
          <div className='w-1 h-1 bg-neutral'></div>
          <span className='text-neutral body-3'>{dimensions}</span>
        </div>
      </div>

      {/* Arrow Pointer - positioned at bottom-left */}
      <div className='absolute top-full left-[46px] w-0 h-0 border-l-[10.5px] border-r-[10.5px] border-t-[21px] border-l-transparent border-r-transparent border-t-white'></div>

      {/* Shopping Cart Button - positioned absolutely in top-right */}
      <Button
        variant='button-icon'
        mode='light'
        icon='shopping-cart.svg'
        iconOnly
        onClick={onAddToCart}
        className='absolute top-0 right-0 rounded-none'
      />
    </div>
  );
}

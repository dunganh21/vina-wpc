'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface RoomTypeProps {
  category: string;
  icon?: string;
  className?: string;
}

export function RoomType({
  category,
  icon = 'living-room.svg',
  className = '',
}: RoomTypeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIconStyles = (isArrow: boolean = false) => {
    const baseIconStyles = `${
      isArrow ? 'w-6 h-6' : 'w-14 h-14'
    } flex-shrink-0 transition-all duration-200`;

    if (isHovered) {
      return cn(baseIconStyles, 'text-primary');
    }

    return cn(baseIconStyles, 'text-white');
  };

  return (
    <div
      className={cn(
        'flex items-center gap-4 px-6 py-4 border border-neutral-200/10 transition-all duration-200 cursor-pointer group',
        {
          'bg-white text-primary': isHovered,
          'bg-transparent text-white': !isHovered,
        },
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Living room icon using mask pattern like Button components */}
      <div
        className={cn(getIconStyles(), 'icon-mask')}
        style={{
          maskImage: `url(/icons/${icon})`,
          WebkitMaskImage: `url(/icons/${icon})`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          backgroundColor: 'currentColor',
          width: '48px',
          height: '56px',
        }}
      />

      <div className='flex items-center justify-between flex-1 min-w-0'>
        {/* Use h5 base layer class for 20px font size matching Figma */}
        <span className='h5 truncate'>{category}</span>

        {/* Arrow icon using mask pattern */}
        <div
          className={cn(getIconStyles(true), 'icon-mask ml-1')}
          style={{
            maskImage: 'url(/icons/arrow-right.svg)',
            WebkitMaskImage: 'url(/icons/arrow-right.svg)',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            backgroundColor: 'currentColor',
            width: '24px',
            height: '24px',
          }}
        />
      </div>
    </div>
  );
}

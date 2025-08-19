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
      isArrow ? 'w-6 h-6' : 'w-8 h-8 lg:w-14 lg:h-14'
    } flex-shrink-0 transition-all duration-200`;

    if (isHovered) {
      return cn(baseIconStyles, 'text-primary');
    }

    return cn(baseIconStyles, 'text-white');
  };

  return (
    <div
      className={cn(
        'group flex cursor-pointer items-center gap-4 border border-x-0 border-neutral-200/10 px-6 py-4 transition-all duration-200',
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
        }}
      />

      <div className="flex min-w-0 flex-1 items-center justify-between">
        {/* Use h5 base layer class for 20px font size matching Figma */}
        <span className="h5 truncate !text-inherit">{category}</span>

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
          }}
        />
      </div>
    </div>
  );
}

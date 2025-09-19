import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoType = 'default' | 'white';

interface LogoProps {
  size?: 'default' | 'big';
  type?: LogoType;
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({
  type = 'default',
  className,
  width = 88,
  height = 62,
}: LogoProps) {
  const logoSrc =
    type === 'white' ? '/icons/logo-white.svg' : '/icons/logo-default.svg';

  return (
    <div
      className={cn(
        'inline-block h-9 w-12 sm:h-12 sm:w-16 lg:h-16 lg:w-22',
        className
      )}
    >
      <Image
        src={logoSrc}
        alt="VINA WPC Logo"
        width={width}
        height={height}
        className="h-full w-full"
        priority
        fetchPriority="high"
      />
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoType = 'default' | 'white';

interface LogoProps {
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
    <div className={cn('inline-block', className)} style={{ width, height }}>
      <Image
        src={logoSrc}
        alt="VINA WPC Logo"
        width={width}
        height={height}
        className="h-full w-full"
        priority
      />
    </div>
  );
}

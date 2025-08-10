import React from 'react';
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
  height = 62 
}: LogoProps) {
  // Design token color classes based on Figma
  const mainElementsClass = type === 'white' ? 'fill-base-100' : 'fill-primary';
  const accentElementClass = 'fill-secondary'; // Always orange in both variants
  const textElementClass = type === 'white' ? 'fill-base-100 opacity-75' : 'fill-text-secondary';
  
  return (
    <div 
      className={cn('inline-block', className)}
      style={{ width, height }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 88 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bottom group - WPC blocks */}
        <g>
          <path
            d="M29.89 39.49L43.52 39.49L43.52 51.82L29.89 51.82L29.89 39.49Z"
            className={mainElementsClass}
          />
          <path
            d="M0 39.68L12.14 39.68L12.14 51.84L0 51.84L0 39.68Z"
            className={mainElementsClass}
          />
          <path
            d="M13.91 43.01L16.63 43.01L16.63 51.85L13.91 51.85L13.91 43.01Z"
            className={mainElementsClass}
          />
          <path
            d="M18.59 39.68L29.39 39.68L29.39 51.84L18.59 51.84L18.59 39.68Z"
            className={mainElementsClass}
          />
          <path
            d="M47.15 39.68L66.05 39.68L66.05 51.84L47.15 51.84L47.15 39.68Z"
            className={mainElementsClass}
          />
          <path
            d="M67.27 39.54L76.55 39.54L76.55 51.85L67.27 51.85L67.27 39.54Z"
            className={mainElementsClass}
          />
          <path
            d="M77.7 39.53L87.1 39.53L87.1 51.99L77.7 51.99L77.7 39.53Z"
            className={mainElementsClass}
          />
        </g>

        {/* Accent dot element */}
        <path
          d="M12.98 37.93L17.55 37.93L17.55 42.42L12.98 42.42L12.98 37.93Z"
          className={accentElementClass}
        />

        {/* Top text elements - VINA */}
        <path
          d="M15.91 0L51.94 0L51.94 30.43L15.91 30.43L15.91 0Z"
          className={mainElementsClass}
        />

        {/* Top text elements - WPC with opacity */}
        <path
          d="M38.93 0L72.55 0L72.55 30.31L38.93 30.31L38.93 0Z"
          className={textElementClass}
        />

        {/* Top detail elements from Group */}
        <g>
          <path
            d="M2.54 56.93L5.4 56.93L5.4 60.8L2.54 60.8L2.54 56.93Z"
            className={mainElementsClass}
          />
          <path
            d="M5.53 57L11.08 57L11.08 61L5.53 61L5.53 57Z"
            className={mainElementsClass}
          />
          <path
            d="M12.73 57L23.58 57L23.58 62L12.73 62L12.73 57Z"
            className={mainElementsClass}
          />
          <path
            d="M25.26 57.37L26.62 57.37L26.62 60.9L25.26 60.9L25.26 57.37Z"
            className={mainElementsClass}
          />
          <path
            d="M26.9 57L29.44 57L29.44 61L26.9 61L26.9 57Z"
            className={mainElementsClass}
          />
          <path
            d="M30.84 57.37L32.2 57.37L32.2 60.9L30.84 60.9L30.84 57.37Z"
            className={mainElementsClass}
          />
        </g>
      </svg>
    </div>
  );
}
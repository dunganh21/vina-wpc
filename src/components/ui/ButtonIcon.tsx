import React from 'react';
import { cn } from '@/lib/utils';

type ButtonIconVariant = 'button-icon' | 'button-outline';
type ButtonIconTheme = 'light' | 'dark' | 'white';

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonIconVariant;
  theme?: ButtonIconTheme;
  icon: string;
  className?: string;
}

export function ButtonIcon({
  variant = 'button-icon',
  theme = 'light',
  icon,
  className,
  disabled,
  ...props
}: ButtonIconProps) {
  const getButtonStyles = () => {
    const baseStyles =
      'inline-flex items-center justify-center w-8 h-8 p-2 lg:w-12 lg:h-12 lg:p-3 transition-all duration-300 cursor-pointer';

    // Handle disabled state
    if (disabled) {
      return cn(baseStyles, 'bg-base-200 cursor-not-allowed');
    }

    // Button-icon variant (filled)
    if (variant === 'button-icon') {
      if (theme === 'light') {
        return cn(baseStyles, 'bg-primary hover:opacity-95 active:opacity-100');
      } else if (theme === 'dark') {
        return cn(
          baseStyles,
          'bg-secondary hover:opacity-95 active:opacity-100'
        );
      } else if (theme === 'white') {
        return cn(baseStyles, 'bg-white hover:opacity-95 active:opacity-100');
      }
    }

    // Button-outline variant
    if (variant === 'button-outline') {
      if (theme === 'light') {
        return cn(
          baseStyles,
          'border border-base-300 bg-transparent hover:bg-primary active:bg-primary'
        );
      } else if (theme === 'dark') {
        return cn(
          baseStyles,
          'border bg-transparent hover:bg-secondary active:bg-secondary'
        );
        // Note: border color will be set via style prop for #F0F0F01A
      } else if (theme === 'white') {
        return cn(
          baseStyles,
          'border border-white bg-white hover:bg-white active:bg-white hover:text-[#2A332B]'
        );
      }
    }

    return baseStyles;
  };

  const getIconStyles = () => {
    const baseIconStyles = 'w-6 h-6 transition-all duration-200';

    // Handle disabled state - dark icons with opacity
    if (disabled) {
      return cn(baseIconStyles, 'text-[#2A332B] opacity-20');
    }

    // Button-icon variant (filled) - white icons
    if (variant === 'button-icon') {
      if (theme === 'white') {
        return cn(baseIconStyles, 'text-primary');
      }
      return cn(baseIconStyles, 'text-white');
    }

    // Button-outline variant
    if (variant === 'button-outline') {
      if (theme === 'light') {
        return cn(
          baseIconStyles,
          'text-[#2A332B] group-hover:text-white group-active:text-white'
        );
      } else if (theme === 'dark') {
        return cn(
          baseIconStyles,
          'text-white group-hover:text-white group-active:text-white'
        );
      } else if (theme === 'white') {
        return cn(
          baseIconStyles,
          'text-[#2A332B] group-hover:text-primary group-active:text-primary'
        );
      }
    }

    return baseIconStyles;
  };

  const customStyle = 
    variant === 'button-outline' && theme === 'dark' 
      ? { borderColor: '#F0F0F01A' }
      : {};

  return (
    <button
      className={cn(getButtonStyles(), 'group', className)}
      style={customStyle}
      disabled={disabled}
      {...props}
    >
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
          width: '24px',
          height: '24px',
        }}
      />
    </button>
  );
}

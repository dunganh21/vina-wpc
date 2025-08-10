import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ButtonVariant = 'button' | 'button-outline' | 'button-icon' | 'white';
type ButtonMode = 'light' | 'dark';
type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  mode?: ButtonMode;
  state?: ButtonState;
  className?: string;
  icon?: string;
  iconOnly?: boolean;
  children?: React.ReactNode;
}

export function Button({
  variant = 'button',
  mode = 'light',
  state = 'default',
  children,
  className,
  disabled,
  icon,
  iconOnly = false,
  ...props
}: ButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = iconOnly
      ? 'inline-flex cursor-pointer items-center justify-center p-3 font-primary font-normal transition-all duration-200 rounded-none hover:opacity-90 active:opacity-100'
      : 'inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 font-primary font-normal transition-all duration-200 rounded-none hover:opacity-90 active:opacity-100';

    // Handle disabled state
    if (disabled || state === 'disabled') {
      return cn(baseStyles, 'bg-base-200 text-neutral-400 cursor-not-allowed');
    }

    // Button variant styles
    if (variant === 'button') {
      if (mode === 'light') {
        return cn(baseStyles, 'bg-primary text-white hover:bg-primary/90 active:bg-primary');
      } else {
        return cn(baseStyles, 'bg-secondary text-white hover:bg-secondary/90 active:bg-secondary');
      }
    }

    // Button-icon variant styles
    if (variant === 'button-icon') {
      if (mode === 'light') {
        return cn(baseStyles, 'bg-primary text-white', {
          'opacity-95': state === 'hover',
          'opacity-100': state === 'pressed',
        });
      } else {
        return cn(baseStyles, 'bg-secondary text-white', {
          'opacity-95': state === 'hover',
          'opacity-100': state === 'pressed',
        });
      }
    }

    // Button-outline variant styles
    if (variant === 'button-outline') {
      if (mode === 'light') {
        return cn(
          baseStyles,
          'border border-base-300 bg-transparent text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white'
        );
      } else {
        return cn(
          baseStyles,
          'border border-white/10 bg-transparent text-white hover:bg-secondary hover:text-white active:bg-secondary active:text-white'
        );
      }
    }

    // White variant styles (for dark backgrounds)
    if (variant === 'white') {
      return cn(baseStyles, 'bg-white text-neutral', {
        'bg-secondary text-white': state === 'hover' || state === 'pressed',
      });
    }

    return baseStyles;
  };

  const getIconStyles = () => {
    const baseIconStyles = 'flex-shrink-0 transition-all duration-200';
    
    // Handle disabled state
    if (disabled || state === 'disabled') {
      return cn(baseIconStyles, 'opacity-40');
    }

    // Button variant - icons should be white (inverted)
    if (variant === 'button' || variant === 'button-icon') {
      return cn(baseIconStyles, 'filter brightness-0 invert');
    }

    // Button-outline variant
    if (variant === 'button-outline') {
      if (mode === 'light') {
        // Default: primary color (no invert), hover: white (invert)
        return cn(baseIconStyles, 'group-hover:filter group-hover:brightness-0 group-hover:invert group-active:filter group-active:brightness-0 group-active:invert');
      } else {
        // Default: white (invert), hover: white (invert) - stays white
        return cn(baseIconStyles, 'filter brightness-0 invert');
      }
    }

    // White variant
    if (variant === 'white') {
      // Default: dark (no invert), hover: white (invert)
      return cn(baseIconStyles, 'group-hover:filter group-hover:brightness-0 group-hover:invert group-active:filter group-active:brightness-0 group-active:invert');
    }

    return baseIconStyles;
  };

  return (
    <button
      className={cn(getButtonStyles(), 'group', className)}
      disabled={disabled || state === 'disabled'}
      {...props}
    >
      {icon && (
        <Image
          src={`/icons/${icon}`}
          alt=''
          width={24}
          height={24}
          className={getIconStyles()}
        />
      )}
      {!iconOnly && <div className='h6'>{children}</div>}
    </button>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'button' | 'button-outline' | 'white';
type ButtonMode = 'light' | 'dark';
type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  mode?: ButtonMode;
  state?: ButtonState;
  className?: string;
  icon?: string;
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
  ...props
}: ButtonProps) {
  const getButtonStyles = () => {
    const baseStyles =
      'inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 font-primary font-normal transition-all duration-200 rounded-none';

    // Handle disabled state
    if (disabled || state === 'disabled') {
      return cn(baseStyles, 'bg-base-200 text-neutral-400 cursor-not-allowed');
    }

    // Button variant styles
    if (variant === 'button') {
      if (mode === 'light') {
        return cn(
          baseStyles,
          'bg-primary text-white hover:bg-primary/90 active:bg-primary'
        );
      } else {
        return cn(
          baseStyles,
          'bg-secondary text-white hover:bg-secondary/90 active:bg-secondary'
        );
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
      return cn(
        baseStyles,
        'bg-white text-neutral hover:bg-secondary hover:text-white active:bg-secondary active:text-white'
      );
    }

    return baseStyles;
  };

  const getIconStyles = () => {
    const baseIconStyles = 'flex-shrink-0 transition-all duration-200';

    // Handle disabled state - dark icons with opacity
    if (disabled || state === 'disabled') {
      return cn(baseIconStyles, 'text-[#2A332B] opacity-40');
    }

    // Button variant - white icons
    if (variant === 'button') {
      return cn(baseIconStyles, 'text-white');
    }

    // Button-outline variant
    if (variant === 'button-outline') {
      if (mode === 'light') {
        return cn(
          baseIconStyles,
          'text-[#2A332B] group-hover:text-white group-active:text-white'
        );
      } else {
        return cn(
          baseIconStyles,
          'text-white group-hover:text-white group-active:text-white'
        );
      }
    }

    // White variant
    if (variant === 'white') {
      return cn(
        baseIconStyles,
        'text-[#2A332B] group-hover:text-white group-active:text-white'
      );
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
      )}
      <div className="h6 !text-inherit">{children}</div>
    </button>
  );
}

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
  children?: React.ReactNode;
  className?: string;
  icon?: string;
  iconOnly?: boolean;
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
      ? 'inline-flex items-center justify-center p-3 font-primary font-normal transition-all duration-200 rounded-none'
      : 'inline-flex items-center justify-center gap-2 px-8 py-4 font-primary font-normal transition-all duration-200 rounded-none';

    // Handle disabled state
    if (disabled || state === 'disabled') {
      return cn(baseStyles, 'bg-base-200 text-neutral-400 cursor-not-allowed');
    }

    // Button variant styles
    if (variant === 'button') {
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
          'border border-base-300 bg-transparent text-primary',
          {
            'bg-primary text-white': state === 'hover' || state === 'pressed',
          }
        );
      } else {
        return cn(
          baseStyles,
          'border border-white/85 bg-transparent text-white',
          {
            'bg-secondary text-white': state === 'hover' || state === 'pressed',
          }
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

  return (
    <button
      className={cn(getButtonStyles(), className)}
      disabled={disabled || state === 'disabled'}
      {...props}
    >
      {icon && (
        <Image
          src={`/icons/${icon}`}
          alt=''
          width={24}
          height={24}
          className={cn(
            'flex-shrink-0',
            // Apply filter to make dark icon appear white on colored backgrounds
            (variant === 'button' || variant === 'button-icon') && 'filter brightness-0 invert'
          )}
        />
      )}
      {!iconOnly && children}
    </button>
  );
}

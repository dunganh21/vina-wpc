'use client';

import { cn } from '@/lib/utils';
import { forwardRef, ReactNode } from 'react';
import Image from 'next/image';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  variant?: 'default' | 'active' | 'error' | 'disabled';
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      icon,
      variant = 'default',
      className,
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const isDisabled = disabled || variant === 'disabled';

    // Determine the actual variant based on state
    const actualVariant = hasError
      ? 'error'
      : isDisabled
        ? 'disabled'
        : variant;

    return (
      <div className="flex h-full max-h-20 w-full flex-col gap-2">
        {/* Input Container */}
        <div
          className={cn(
            'relative flex items-center gap-2 px-2 py-2 lg:px-4 lg:py-4',
            {
              // Default state - using system colors
              'border border-base-300 bg-base-100 focus-within:border-2 focus-within:border-primary focus-within:-m-px':
                actualVariant === 'default',

              // Active/Typing state - using system colors
              'border-2 border-primary bg-base-100 -m-px': actualVariant === 'active',

              // Error state - using system colors (keeping red for error indication)
              'border-2 border-[#d83833] bg-[#fff0f0] -m-px':
                actualVariant === 'error',

              // Disabled state - using system colors
              'border border-base-300 bg-base-200': actualVariant === 'disabled',
            },
            className
          )}
        >
          {/* Input Field */}
          <div className="flex-1">
            <input
              ref={ref}
              type={type}
              disabled={isDisabled}
              placeholder={label}
              className={cn('body-2 w-full bg-transparent outline-none', {
                // Disabled state - reduce opacity
                'opacity-50': actualVariant === 'disabled',
              })}
              {...props}
            />

            {/* Typing cursor indicator */}
            {actualVariant === 'active' && !props.value && (
              <span className="animate-pulse text-gray-500">|</span>
            )}
          </div>

          {/* Icon - Only show when icon prop is provided */}
          {icon && <div className="flex-shrink-0">{icon}</div>}
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || error) && (
          <div className="flex items-start gap-1 px-2">
            {/* Warning icon for errors */}
            {hasError && (
              <div className="flex-shrink-0">
                <Image
                  src="/icons/warning-circle.svg"
                  alt="Warning"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </div>
            )}

            <div className="flex-1">
              <p
                className={cn('body-3', {
                  'text-secondary opacity-70': !hasError,
                  'text-[11px] leading-[18px] font-normal text-[#d83833]':
                    hasError,
                })}
              >
                {error || helperText}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

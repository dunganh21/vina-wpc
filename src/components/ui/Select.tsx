'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'active' | 'error' | 'disabled';
  options?: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      placeholder,
      error,
      helperText,
      variant = 'default',
      className,
      disabled,
      options = [],
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasError = !!error;
    const isDisabled = disabled || variant === 'disabled';

    // Determine the actual variant based on state
    const actualVariant = hasError
      ? 'error'
      : isDisabled
        ? 'disabled'
        : variant;

    const displayValue = value 
      ? options.find(option => option.value === value)?.label || placeholder
      : placeholder;

    return (
      <div className="flex w-full flex-col gap-2">
        {/* Select Container */}
        <div
          className={cn(
            'relative flex items-center gap-2 px-4 py-4',
            {
              // Default state with focus behavior
              'border border-[#e6e6e6] bg-white focus-within:border-2 focus-within:border-primary':
                actualVariant === 'default',

              // Active/Open state
              'border-2 border-primary bg-white': actualVariant === 'active' || isOpen,

              // Error state
              'border-2 border-[#d83833] bg-[#fff0f0]':
                actualVariant === 'error',

              // Disabled state
              'border border-[#e6e6e6] bg-[#f5f5f5]': actualVariant === 'disabled',
            },
            className
          )}
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
        >
          {/* Display Value */}
          <div className="flex-1">
            <div 
              className={cn(
                'font-normal text-[14px] leading-[19px] text-[#424c43]',
                {
                  'opacity-50': actualVariant === 'disabled',
                  'opacity-70': !value && placeholder,
                }
              )}
              style={{ fontFamily: '"Inter Variable", sans-serif' }}
            >
              {displayValue}
            </div>
          </div>

          {/* Dropdown Arrow */}
          <div className="flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                'text-[#424c43] transition-transform duration-200',
                {
                  'rotate-180': isOpen,
                  'opacity-50': isDisabled,
                }
              )}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Hidden Native Select */}
          <select
            ref={ref}
            disabled={isDisabled}
            value={value}
            onChange={onChange}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || error) && (
          <div className="flex items-start gap-1 px-2">
            {/* Warning icon for errors */}
            {hasError && (
              <div className="flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#d83833]"
                >
                  <path
                    d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <div className="flex-1">
              <p
                className={cn(
                  'text-[11px] leading-[18px] font-normal',
                  {
                    'text-secondary opacity-70': !hasError,
                    'text-[#d83833]': hasError,
                  }
                )}
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
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

Select.displayName = 'Select';
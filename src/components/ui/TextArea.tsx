'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState, useEffect } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  helperText?: string;
  error?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      helperText,
      error,
      maxLength = 120,
      showCharacterCount = true,
      className,
      disabled,
      placeholder = 'Viết bình luận',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(0);
    const hasError = !!error;

    useEffect(() => {
      const currentValue = value?.toString() || '';
      setCharCount(currentValue.length);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (maxLength && newValue.length <= maxLength) {
        setCharCount(newValue.length);
        onChange?.(e);
      } else if (!maxLength) {
        setCharCount(newValue.length);
        onChange?.(e);
      }
    };

    return (
      <div className="flex w-full flex-col gap-2">
        {/* TextArea Container */}
        <div
          className={cn(
            // Base styles - using system colors
            'relative bg-base-100 h-[148px] w-full transition-all duration-200',
            
            // Default state - using system colors
            'border border-base-300',
            
            // Focus state - using system colors
            'focus-within:border-2 focus-within:border-primary focus-within:-m-px',
            
            // Error state - overrides other states (keeping red for error indication)
            {
              'border-2 border-[#d83833] bg-[#fff0f0] focus-within:border-[#d83833] -m-px': hasError,
              'border border-base-300 bg-base-200': disabled,
            },
            
            className
          )}
        >
          <textarea
            ref={ref}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            maxLength={maxLength}
            className={cn(
              // Base textarea styles
              'w-full h-full resize-none bg-transparent outline-none px-4 py-3',
              'body-2 text-secondary',
              
              // Placeholder styles - using neutral muted color
              'placeholder:text-neutral placeholder:opacity-40',
              
              // Focus state - make placeholder more subtle
              'focus:placeholder:opacity-30',
              
              // Disabled state
              {
                'opacity-50 cursor-not-allowed': disabled,
                'text-base-300': disabled,
              }
            )}
            {...props}
          />
        </div>

        {/* Helper Text / Character Count */}
        {(showCharacterCount || helperText || error) && (
          <div className="flex items-start justify-between px-2">
            {/* Error/Helper Text */}
            <div className="flex-1">
              {error ? (
                <p 
                  className="text-[11px] leading-[18px] font-normal text-[#d83833]"
                  style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  {error}
                </p>
              ) : helperText ? (
                <p 
                  className="text-[11px] leading-[18px] font-normal text-[#424c43] opacity-50"
                  style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  {helperText}
                </p>
              ) : null}
            </div>

            {/* Character Count */}
            {showCharacterCount && (
              <div className="flex-shrink-0">
                <p 
                  className="text-[11px] leading-[18px] font-normal text-[#424c43] opacity-50"
                  style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  {charCount}/{maxLength} character
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
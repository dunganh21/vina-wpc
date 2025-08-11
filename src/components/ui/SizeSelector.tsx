'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  label?: string;
  options?: string[];
  defaultValue?: string;
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: { label: string; value: string }) => void;
}

export function SizeSelector({
  label = 'Kích thước',
  options = ['900×120×15mm', '900×120×20mm', '900×140×15mm', '900×140×20mm'],
  defaultValue,
  value,
  className,
  placeholder,
  disabled = false,
  required = false,
  name,
  id,
  onChange,
  onSelect,
}: SizeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || (required ? options[0] : '')
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle controlled component
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Auto-close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSelect = (selectedOption: string) => {
    const newValue = selectedOption;
    setSelectedValue(newValue);
    setIsOpen(false);

    // Call both callbacks
    onChange?.(newValue);
    onSelect?.(newValue, { label: selectedOption, value: selectedOption });
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const displayValue = selectedValue || placeholder || '';

  return (
    <div
      className={cn('relative w-full max-w-md', className)}
      ref={dropdownRef}
    >
      {/* Hidden input for form integration */}
      <input
        type='hidden'
        name={name}
        id={id}
        value={selectedValue}
        required={required}
      />

      {/* Main selector button */}
      <button
        type='button'
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className={cn(
          'min-h-14 w-full bg-base-100 border border-base-300 px-4 py-4 flex items-center gap-2 transition-all duration-200 cursor-pointer',
          {
            'hover:border-neutral hover:shadow-sm': !disabled,
            'opacity-50 cursor-not-allowed': disabled,
            'border-primary shadow-sm': isOpen,
          }
        )}
      >
        <div className='flex-1 flex flex-col gap-0.5 text-left'>
          {/* Label using body-2 class */}
          <div
            className={cn('body-2', {
              'text-primary': !disabled,
              'text-neutral': disabled,
            })}
          >
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </div>
          {/* Value using h6 class */}
          <div
            className={cn('h6', {
              'text-primary': selectedValue && !disabled,
              'text-secondary': !selectedValue && !disabled,
              'text-neutral': disabled,
            })}
          >
            {displayValue}
          </div>
        </div>

        {/* Arrow icon with primary color and rotation animation */}
        <div
          className={cn(
            'w-6 h-6 flex-shrink-0 transition-all duration-300 ease-in-out',
            {
              'bg-primary': !disabled,
              'bg-neutral': disabled,
              'transform rotate-180': isOpen,
            }
          )}
          style={{
            maskImage: 'url(/icons/arrow-down.svg)',
            WebkitMaskImage: 'url(/icons/arrow-down.svg)',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
        />
      </button>

      {/* Dropdown options with animation */}
      <div
        className={cn(
          'absolute top-full left-0 right-0 z-50 bg-base-100 border-l border-r border-b border-base-300 shadow-card overflow-hidden transition-all duration-300 ease-out origin-top',
          {
            'opacity-100 scale-y-100 translate-y-0': isOpen,
            'opacity-0 scale-y-95 -translate-y-2 pointer-events-none': !isOpen,
          }
        )}
      >
        <div role='listbox' className='max-h-70 overflow-y-auto'>
          {options.map((option, index) => (
            <button
              key={option}
              type='button'
              role='option'
              aria-selected={option === selectedValue}
              onClick={() => handleSelect(option)}
              className={cn(
                'w-full px-4 py-6 text-left transition-all duration-200 cursor-pointer border-b border-base-300 last:border-b-0',
                {
                  'bg-base-200 text-primary': option === selectedValue,
                  'hover:bg-base-200 text-secondary': option !== selectedValue,
                }
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className='body-3'>{option}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

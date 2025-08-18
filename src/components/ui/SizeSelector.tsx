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
        type="hidden"
        name={name}
        id={id}
        value={selectedValue}
        required={required}
      />

      {/* Main selector button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'flex min-h-14 w-full cursor-pointer items-center gap-2 border border-base-300 bg-base-100 px-4 py-4 transition-all duration-200',
          {
            'hover:border-neutral hover:shadow-sm': !disabled,
            'cursor-not-allowed opacity-50': disabled,
            'border-primary shadow-sm': isOpen,
          }
        )}
      >
        <div className="flex flex-1 flex-col gap-0.5 text-left">
          {/* Label using body-2 class */}
          <div
            className={cn('body-2', {
              'text-primary': !disabled,
              'text-neutral': disabled,
            })}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
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
            'h-6 w-6 flex-shrink-0 transition-all duration-300 ease-in-out',
            {
              'bg-primary': !disabled,
              'bg-neutral': disabled,
              'rotate-180 transform': isOpen,
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
          'absolute top-full right-0 left-0 z-50 origin-top overflow-hidden border-r border-b border-l border-base-300 bg-base-100 shadow-card transition-all duration-300 ease-out',
          {
            'translate-y-0 scale-y-100 opacity-100': isOpen,
            'pointer-events-none -translate-y-2 scale-y-95 opacity-0': !isOpen,
          }
        )}
      >
        <div role="listbox" className="max-h-70 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === selectedValue}
              onClick={() => handleSelect(option)}
              className={cn(
                'w-full cursor-pointer border-b border-base-300 px-4 py-6 text-left transition-all duration-200 last:border-b-0',
                {
                  'bg-base-200 text-primary': option === selectedValue,
                  'text-secondary hover:bg-base-200': option !== selectedValue,
                }
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="body-3">{option}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

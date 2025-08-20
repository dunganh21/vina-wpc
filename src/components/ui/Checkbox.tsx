'use client';

import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  defaultChecked?: boolean;
}

export function Checkbox({
  defaultChecked = false,
  checked = false,
  onChange,
  className,
  disabled = false,
  id,
  name,
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      defaultChecked={defaultChecked}
      className={cn(
        'checkbox rounded-none checkbox-sm checkbox-neutral',
        className
      )}
    />
  );
}

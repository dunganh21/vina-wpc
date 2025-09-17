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
  checked,
  onChange,
  className,
  disabled = false,
  id,
  name,
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  // Use controlled if checked is provided, otherwise uncontrolled
  const isControlled = checked !== undefined;

  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      {...(isControlled ? { checked } : { defaultChecked })}
      onChange={handleChange}
      disabled={disabled}
      className={cn(
        'checkbox rounded-none checkbox-sm checkbox-neutral',
        className
      )}
    />
  );
}

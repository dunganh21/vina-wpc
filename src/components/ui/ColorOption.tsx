import { cn } from '@/lib/utils';

interface ColorOptionProps {
  colors: { id: string; color: string }[];
  selectedColor: string;
  handleColorSelect: (colorId: string) => void;
}

export const ColorOption = ({
  colors,
  selectedColor,
  handleColorSelect,
}: ColorOptionProps) => {
  return (
    <div
      className="flex items-center gap-1"
      role="listbox"
      aria-label="Select color"
    >
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => handleColorSelect(color.id)}
          className={cn(
            'h-6 w-6 cursor-pointer border-2 transition-all duration-200 hover:scale-110',
            selectedColor === color.id
              ? 'border-neutral shadow-sm'
              : 'border-transparent hover:border-neutral/20'
          )}
          style={{ backgroundColor: color.color }}
          aria-label={`Select ${color.id} color`}
          role="option"
          aria-selected={selectedColor === color.id}
        />
      ))}
    </div>
  );
};

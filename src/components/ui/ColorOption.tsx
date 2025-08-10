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
    <div className='flex items-center gap-1'>
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => handleColorSelect(color.id)}
          className={cn(
            'w-6 h-6 border-2 transition-all duration-200 cursor-pointer hover:scale-110',
            selectedColor === color.id
              ? 'border-neutral shadow-sm'
              : 'border-transparent hover:border-neutral/20'
          )}
          style={{ backgroundColor: color.color }}
        />
      ))}
    </div>
  );
};

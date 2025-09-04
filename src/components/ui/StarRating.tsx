import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // 0-5
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className = '',
  readOnly = true,
  onChange,
}: StarRatingProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-4 h-4';
    }
  };

  const handleStarClick = (value: number) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleStarClick(starValue)}
              disabled={readOnly}
              className={cn(
                'transition-colors duration-200',
                !readOnly && 'cursor-pointer hover:scale-110',
                readOnly && 'cursor-default'
              )}
            >
              <div
                className={cn(
                  getSizeStyles(),
                  'icon-mask transition-colors duration-200',
                  isFilled ? 'text-neutral' : 'text-gray-300'
                )}
                style={{
                  maskImage: `url(/icons/star.svg)`,
                  WebkitMaskImage: `url(/icons/star.svg)`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  backgroundColor: 'currentColor',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Rating Value */}
      {showValue && (
        <span className="ml-1 text-sm text-gray-600">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  );
}

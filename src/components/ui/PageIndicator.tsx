interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  variant?: 'light' | 'dark';
}

export function PageIndicator({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'light',
}: PageIndicatorProps) {
  const getVariant = (variant: 'light' | 'dark', isActive: boolean) => {
    if (variant === 'light') {
      if (isActive) {
        return 'bg-white border border-white';
      }
      return 'bg-white/10 hover:bg-white/20';
    }
    if (isActive) {
      return 'bg-neutral/90';
    }
    return 'bg-gray hover:bg-gray/80';
  };

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 cursor-pointer transition-all duration-200 ${
            index + 1 === currentPage
              ? getVariant(variant, true)
              : getVariant(variant, false)
          }`}
          onClick={() => onPageChange?.(index)}
        />
      ))}
    </div>
  );
}

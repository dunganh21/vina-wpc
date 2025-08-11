interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function PageIndicator({
  currentPage,
  totalPages,
  onPageChange,
}: PageIndicatorProps) {
  return (
    <div className='flex items-center gap-1.5'>
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 cursor-pointer transition-all duration-200 ${
            index + 1 === currentPage
              ? 'bg-white border border-white'
              : 'bg-white/10 hover:bg-white/20'
          }`}
          onClick={() => onPageChange?.(index)}
        />
      ))}
    </div>
  );
}

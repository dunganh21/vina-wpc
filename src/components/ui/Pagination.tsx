'use client';

import { cn } from '@/lib/utils';
import { ButtonIcon } from './ButtonIcon';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
  maxVisiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  className,
  maxVisiblePages = 5,
}: PaginationProps) {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];

    // Add first page if not in range
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add last page if not in range
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {/* Previous Button */}
      <ButtonIcon
        variant="button-outline"
        theme="light"
        icon="arrow-left.svg"
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="border-base-300 bg-base-300"
      />

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <div
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center border border-base-300 bg-base-300 text-neutral lg:h-12 lg:w-12"
            >
              <span className="h6">...</span>
            </div>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              'flex h-8 w-8 cursor-pointer items-center justify-center border border-base-300 transition-all duration-200 lg:h-12 lg:w-12',
              isActive
                ? 'bg-primary text-white'
                : 'bg-base-300 text-neutral hover:border-base-200'
            )}
          >
            <span className="h6 text-inherit">{page}</span>
          </button>
        );
      })}

      {/* Next Button */}
      <ButtonIcon
        variant="button-outline"
        theme="light"
        icon="arrow-right.svg"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="border-base-300 bg-base-300"
      />
    </div>
  );
}

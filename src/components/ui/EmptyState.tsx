'use client';

import { Button } from './Button';
import Image from 'next/image';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'Không tìm thấy sản phẩm',
  description = 'Không có sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh các tiêu chí tìm kiếm.',
  actionText = 'Xóa bộ lọc',
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral/10">
        <Image
          src="/icons/search.svg"
          alt="No products found"
          width={32}
          height={32}
          className="opacity-40"
        />
      </div>

      {/* Title */}
      <h3 className="h4 mb-3 text-neutral">{title}</h3>

      {/* Description */}
      <p className="body-2 mb-8 max-w-md text-neutral/70">{description}</p>

      {/* Action Button */}
      {onAction && (
        <Button variant="button-outline" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

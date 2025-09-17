'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ProductNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-16 text-center">
      <div className="page-container">
        {/* Error Code */}
        <h1 className="mb-4 text-6xl font-bold text-primary lg:text-8xl">404</h1>

        {/* Title */}
        <h2 className="h3 mb-4 text-neutral">Không tìm thấy sản phẩm</h2>

        {/* Description */}
        <p className="body-2 mb-8 max-w-md text-neutral/70">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang sản phẩm.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="button"
            onClick={() => window.history.back()}
          >
            Quay lại
          </Button>

          <Link href="/products">
            <Button variant="button-outline">
              Xem tất cả sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
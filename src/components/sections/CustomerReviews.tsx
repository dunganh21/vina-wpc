'use client';

import { useState } from 'react';
import { Button, StarRating, Pagination } from '@/components/ui';

interface Review {
  id: string;
  name: string;
  timeAgo: string;
  rating: number;
  comment: string;
  verified?: boolean;
}

interface CustomerReviewsProps {
  overallRating?: number;
  totalReviews?: number;
  recommendationPercentage?: number;
  reviews?: Review[];
  className?: string;
}

export function CustomerReviews({
  overallRating = 4.9,
  totalReviews = 35,
  recommendationPercentage = 100,
  reviews = [
    {
      id: '1',
      name: 'Gia linh',
      timeAgo: '4 tháng trước',
      rating: 5,
      comment: 'Sản phẩm dùng tốt, tiết kiệm diện tích, nước kiềm rất ngon',
      verified: true,
    },
    {
      id: '2',
      name: 'Gia linh',
      timeAgo: '4 tháng trước',
      rating: 5,
      comment: 'Sản phẩm dùng tốt, tiết kiệm diện tích, nước kiềm rất ngon',
      verified: true,
    },
    {
      id: '3',
      name: 'Gia linh',
      timeAgo: '4 tháng trước',
      rating: 5,
      comment: 'Sản phẩm dùng tốt, tiết kiệm diện tích, nước kiềm rất ngon',
      verified: true,
    },
    {
      id: '4',
      name: 'Gia linh',
      timeAgo: '4 tháng trước',
      rating: 5,
      comment: 'Sản phẩm dùng tốt, tiết kiệm diện tích, nước kiềm rất ngon',
      verified: true,
    },
  ],
  className = '',
}: CustomerReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 30;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className={`bg-white py-6 lg:py-16 ${className}`}>
      <div className="page-container">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-0">
          {/* Column 1: Empty on desktop, hidden on mobile */}
          <div className="hidden lg:block"></div>

          {/* Column 2: Title and Summary */}
          <div className="space-y-2">
            {/* Main Title */}
            <h4>Đánh giá khách hàng</h4>

            {/* Rating Summary */}

            <div className="flex items-center gap-1">
              <span className="body-1 opacity-80">
                {overallRating}/5 - {totalReviews} đánh giá
              </span>
              <StarRating rating={Math.floor(overallRating)} size="md" />
            </div>

            <div className="h6">
              {recommendationPercentage}% người đánh giá khuyến nghị
              <br />
              sản phẩm này
            </div>

            <div className="mt-5">
              {/* Write Review Button */}
              <Button
                variant="button"
                mode="light"
                className="self-start px-4 py-3.5"
              >
                Viết đánh giá
              </Button>
            </div>
          </div>

          {/* Column 3: Reviews List */}
          <div className="flex flex-col gap-6 lg:pr-8">
            {reviews.map((review, index) => (
              <div key={review.id}>
                <div className="flex flex-col gap-2">
                  {/* Review Header */}
                  <div className="flex flex-col gap-1">
                    <div className="flex h-[19px] items-start gap-1">
                      <div className="flex items-center gap-0.5">
                        {/* Verified Check using check-circle.svg */}
                        {review.verified && (
                          <div
                            className="h-4 w-4"
                            style={{
                              maskImage: `url(/icons/check-circle.svg)`,
                              WebkitMaskImage: `url(/icons/check-circle.svg)`,
                              maskRepeat: 'no-repeat',
                              WebkitMaskRepeat: 'no-repeat',
                              maskPosition: 'center',
                              WebkitMaskPosition: 'center',
                              maskSize: 'contain',
                              WebkitMaskSize: 'contain',
                              backgroundColor: 'currentColor',
                            }}
                          />
                        )}
                        <span className="h6">{review.name}</span>
                      </div>
                      <span className="body-3 opacity-45">
                        {review.timeAgo}
                      </span>
                    </div>

                    {/* Review Comment */}
                    <div className="body-1 opacity-80">{review.comment}</div>
                  </div>

                  {/* Star Rating */}
                  <StarRating rating={review.rating} size="md" />
                </div>

                {/* Divider (except for last item) */}
                {index < reviews.length - 1 && (
                  <div className="mt-6 h-px w-full bg-gray-200"></div>
                )}
              </div>
            ))}

            {/* Pagination moved to Column 3 */}
            {/* <div className="mt-6 flex justify-center lg:justify-start">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPrevious={handlePrevious}
                onNext={handleNext}
                maxVisiblePages={3}
              />
            </div> */}
          </div>

          {/* Column 4: Empty */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}

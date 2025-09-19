'use client';

import { Button } from '@/components/ui/Button';
import { RoomType } from '@/components/ui/RoomType';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { roomToUrlSlug } from '@/lib/filter-constants';

export function ProductOverview() {
  const router = useRouter();
  const { ref: backgroundRef } = useScrollReveal<HTMLDivElement>({
    staggerDelay: 0,
    elementType: 'background',
  });
  // Animation refs - Reduced delays for better pacing
  const { ref: col1Ref } = useScrollReveal<HTMLDivElement>({
    staggerDelay: 0,
    elementType: 'text',
  });
  const { ref: col2Ref } = useScrollReveal<HTMLDivElement>({
    staggerDelay: 100,
    elementType: 'text',
  });

  const { ref: col3Ref } = useScrollReveal<HTMLDivElement>({
    staggerDelay: 200,
    elementType: 'ui',
  });

  return (
    <section className="pt-10 pb-6 lg:pb-15">
      {/* Content */}
      <div
        className="animate-on-scroll relative h-[717px] overflow-hidden lg:h-[1000px]"
        ref={backgroundRef}
      >
        {/* Background Image */}
        <Image
          src="/images/section-bg.png"
          alt="VINA WPC Wood Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="page-container relative h-full">
          <div className="flex h-full flex-col items-start pt-12 pb-6 lg:flex-row lg:gap-50 lg:py-24">
            {/* Left - Subtitle (desktop) / Top (mobile) */}
            <div className="animate-on-scroll mb-2 lg:mb-0" ref={col1Ref}>
              <p className="subtitle-2 text-white">Sản phẩm của VINA WPC</p>
            </div>

            {/* Middle - Main Content (flex-1) */}
            <div
              className="animate-on-scroll mb-8 flex-1 lg:mb-0"
              ref={col2Ref}
            >
              <div className="w-full max-w-[500px] space-y-3 text-white lg:space-y-5">
                {/* Main Heading */}
                <h2 className="h3 max-w-3/4 text-white">
                  Gỗ nhựa bền đẹp, thân thiện môi trường
                </h2>

                {/* Description */}
                <div className="space-y-3 lg:space-y-5">
                  <p className="body-2 max-w-3/4 text-white">
                    Sản phẩm GỖ NHỰA của chúng tôi là dòng sản phẩm thân thiện
                    với môi trường, có tính thẩm mỹ hiện đại phù hợp với nhiều
                    không gian nội thất, không chỉ đẹp mà còn bền bỉ theo thời
                    gian.
                  </p>

                  <p className="body-3 pt-4 text-white/65">
                    Khám phá sản phẩm gỗ dành cho
                  </p>
                </div>

                <div>
                  <RoomType
                    category="Phòng khách"
                    icon="living-room.svg"
                    className="border-b border-white/10 px-2 py-4 lg:px-6"
                    onClick={() =>
                      router.push(
                        `/products?rooms=${roomToUrlSlug('Phòng khách')}`
                      )
                    }
                  />
                  <RoomType
                    category="Phòng bếp"
                    icon="kitchen.svg"
                    className="border-b border-white/10 px-2 py-4 lg:px-6"
                    onClick={() =>
                      router.push(
                        `/products?rooms=${roomToUrlSlug('Phòng bếp')}`
                      )
                    }
                  />
                  <RoomType
                    category="Phòng ngủ"
                    icon="bed-room.svg"
                    className="px-2 py-4 lg:px-6"
                    onClick={() =>
                      router.push(
                        `/products?rooms=${roomToUrlSlug('Phòng ngủ')}`
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right - Button */}
            <div className="animate-on-scroll" ref={col3Ref}>
              <Button
                variant="white"
                className="w-full lg:w-auto"
                onClick={() => router.push('/products')}
              >
                Xem tất cả sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function AboutIntroHero() {
  // Animation refs - Reduced delays for better user experience
  const { ref: bgRef } = useScrollReveal<HTMLDivElement>({ 
    animationClass: 'animate-product-card',
    staggerDelay: 0,
    elementType: 'background'
  });
  const { ref: subtitleRef } = useScrollReveal<HTMLParagraphElement>({ 
    staggerDelay: 100,
    elementType: 'text'
  });
  const { ref: headingRef } = useScrollReveal<HTMLHeadingElement>({ 
    staggerDelay: 200,
    elementType: 'text'
  });
  const { ref: buttonRef } = useScrollReveal<HTMLDivElement>({ 
    staggerDelay: 300,
    elementType: 'ui'
  });

  return (
    <section className="py-7 lg:pt-18 lg:pb-10">
      <div className="page-container relative min-h-[60vh] overflow-hidden lg:min-h-[80vh]">
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-0 animate-product-card">
          <Image
            src="/images/blog-hero.jpg"
            alt="VINA WPC Material Background - Curved Wood Structures"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-[#D9D9D9] bg-gradient-to-b from-black/30 to-[#D9D9D9]/30 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[60vh] lg:min-h-[80vh] lg:items-center">
          <div className="flex w-full flex-col lg:flex-row lg:items-center">
            {/* Spacer - Takes up first 50% */}
            <div className="hidden lg:block lg:w-1/2"></div>

            {/* Text Content - Right Side - Starts at 50% */}
            <div className="w-full max-w-lg space-y-2 p-6 lg:w-1/2 lg:space-y-5 lg:bg-transparent lg:p-0">
              {/* Subtitle */}
              <p ref={subtitleRef} className="subtitle-2 text-white animate-on-scroll">Giới thiệu về VINA WPC</p>

              {/* Main Text */}
              <h2 ref={headingRef} className="h3 text-white animate-on-scroll">
                Sản phẩm thân thiện với môi trường, có tính thẩm mỹ hiện đại phù
                hợp với nhiều không gian nội thất, không chỉ đẹp mà còn bền bỉ
                theo thời gian.
              </h2>

              {/* CTA Button */}
              <div ref={buttonRef} className="mt-4 animate-on-scroll">
                <Button variant="white" className="w-fit">
                  Về chúng tôi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

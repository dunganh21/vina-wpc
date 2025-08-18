import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function AboutIntro() {
  return (
    <section className="bg-white py-6 lg:py-10">
      <div className="page-container mx-auto">
        <div className="relative h-[600px] overflow-hidden lg:h-[800px]">
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
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative h-full">
            <div className="flex h-full items-start pt-6 lg:items-center lg:pt-0">
              <div className="w-full px-6 lg:mr-[200px] lg:ml-auto lg:w-[528px] lg:px-0">
                <div className="space-y-6 text-white">
                  {/* Subtitle */}
                  <p className="subtitle-2 text-white uppercase">
                    Giới thiệu về VINA WPC
                  </p>

                  {/* Main Heading */}
                  <h2 className="h3 text-white">
                    Sản phẩm thân thiện với môi trường, có tính thẩm mỹ hiện đại
                    phù hợp với nhiều không gian nội thất, không chỉ đẹp mà còn
                    bền bỉ theo thời gian.
                  </h2>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <Button variant="white">Về chúng tôi</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

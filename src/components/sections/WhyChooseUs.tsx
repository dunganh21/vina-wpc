'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  {
    title: 'Chuyên môn bạn có thể tin tưởng.',
    description:
      'Đội ngũ của chúng tôi bao gồm các chuyên gia kỹ thuật với nhiều năm kinh nghiệm thực tế, chuyên môn sâu ở nhiều lĩnh vực khác nhau : tự động hóa công nghiệp, kỹ thuật sản xuất pvc compound, kỹ thuật sản xuất tấm sàn và tấm ốp pvc, pe, pp,…',
  },
  {
    title: 'Chất lượng hàng đầu bền vững.',
    description:
      'Chúng tôi sử dụng nguyên liệu chính là nhựa nguyên sinh nhập khẩu từ Thái Lan, Nhật Bản, Mỹ cùng với nguyên liệu phụ trợ cao cấp được test và đánh giá kỹ lưỡng để đảm bảo sản phẩm tấm nano chắc chắn, liền mạch và đẹp mắt – bền bỉ.',
  },
  {
    title: 'Dịch vụ lấy khách hàng làm trung tâm.',
    description:
      'Từ khâu tư vấn đến khi hoàn thành, chúng tôi luôn đồng hành cùng bạn trong từng bước – hướng dẫn rõ ràng, tư vấn trung thực và hỗ trợ toàn diện.',
  },
  {
    title: 'Sản phẩm mẫu mã đa dạng.',
    description:
      'Đem đến cho bạn nhiều tuỳ chọn, đáp ứng nhu cầu nhiều loại công trình.',
  },
  {
    title: 'Giá trị tuyệt vời cho khoản đầu tư của bạn.',
    description:
      'Chúng tôi không chỉ cung cấp mức giá cạnh tranh với chất lượng cao mà còn cung cấp giải pháp đằng sau mỗi sản phẩm xứng đáng với khoản đầu tư của khách hàng',
  },
  {
    title: 'Bảo hành đáng tin cậy, An tâm dài lâu.',
    description:
      'Sản phẩm của chúng tôi đi kèm với chế độ bảo hành chặt chẽ – vì sự hài lòng và an tâm của bạn là điều quan trọng nhất.',
  },
];

export function WhyChooseUs() {
  // Animation refs for mobile layout - Reduced delays
  const { ref: mobileHeaderRef } = useScrollReveal<HTMLHeadingElement>({
    staggerDelay: 0,
    elementType: 'text',
  });

  // Individual animation refs for mobile feature items - Faster stagger
  const mobileFeatureRefs = features.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrollReveal<HTMLDivElement>({
      staggerDelay: 100 + index * 80, // 100ms base delay + 80ms between items
      elementType: 'card',
    })
  );

  // Animation refs for desktop layout - Reduced delays
  const { ref: desktopHeaderRef } = useScrollReveal<HTMLHeadingElement>({
    staggerDelay: 0,
    elementType: 'text',
  });

  // Individual animation refs for desktop feature rows - Faster stagger
  const desktopFeatureRefs = features.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrollReveal<HTMLDivElement>({
      staggerDelay: 100 + index * 80, // 100ms base delay + 80ms between rows
      elementType: 'card',
    })
  );

  return (
    <section className="py-6 lg:py-16">
      <div className="page-container">
        {/* Mobile Layout */}
        <div className="space-y-6 lg:hidden">
          <h2 ref={mobileHeaderRef} className="h3 animate-on-scroll">
            Tại sao bạn nên chọn VINA WPC
          </h2>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={mobileFeatureRefs[index].ref}
                className="animate-on-scroll"
              >
                <div className="space-y-2">
                  <h3
                    className="h6"
                    dangerouslySetInnerHTML={{
                      __html: feature.title.replace(/\n/g, '<br />'),
                    }}
                  />
                  <p className="body-3">{feature.description}</p>
                </div>
                {index < features.length - 1 && (
                  <hr className="mt-4 border-base-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - 4 Column Flex */}
        <div className="hidden lg:block">
          {/* Feature Rows */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={desktopFeatureRefs[index].ref}
                className="animate-on-scroll"
              >
                <div className="flex items-start">
                  {/* Empty Column 1 (for alignment with header) */}
                  <div className="flex-1">
                    {index === 0 && (
                      <h3
                        ref={desktopHeaderRef}
                        className="animate-on-scroll w-3/4"
                      >
                        Tại sao bạn nên chọn VINA WPC
                      </h3>
                    )}
                  </div>

                  {/* Feature Title - Column 2 */}
                  <div className="flex-1">
                    <p className="h4 w-1/2">{feature.title}</p>
                  </div>

                  {/* Feature Description - Column 3 */}
                  <div className="flex-1">
                    <p>{feature.description}</p>
                  </div>

                  {/* Numbers - Column 4 */}
                  <div className="flex-1 text-right">
                    <p className="text-2xl leading-[1.125em] font-semibold tracking-[0.24px] text-[#e6e6e6]">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>

                {/* Divider Line */}
                {index < features.length - 1 && (
                  <div className="mt-6 h-px bg-[#eee]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

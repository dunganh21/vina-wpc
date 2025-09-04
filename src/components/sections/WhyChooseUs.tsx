const features = [
  {
    title: 'Chuyên môn\nbạn có thể tin tưởng.',
    description:
      'Đội ngũ của chúng tôi bao gồm các chuyên gia kỹ thuật với nhiều năm kinh nghiệm thực tế, chuyên môn sâu ở nhiều lĩnh vực khác nhau : tự động hóa công nghiệp, kỹ thuật sản xuất pvc compound, kỹ thuật sản xuất tấm sàn và tấm ốp pvc, pe, pp,…',
  },
  {
    title: 'Chất lượng hàng đầu\nbền vững.',
    description:
      'Chúng tôi sử dụng nguyên liệu chính là nhựa nguyên sinh nhập khẩu từ Thái Lan, Nhật Bản, Mỹ cùng với nguyên liệu phụ trợ cao cấp được test và đánh giá kỹ lưỡng để đảm bảo sản phẩm tấm nano chắc chắn, liền mạch và đẹp mắt – bền bỉ.',
  },
  {
    title: 'Dịch vụ lấy khách hàng\nlàm trung tâm.',
    description:
      'Từ khâu tư vấn đến khi hoàn thành, chúng tôi luôn đồng hành cùng bạn trong từng bước – hướng dẫn rõ ràng, tư vấn trung thực và hỗ trợ toàn diện.',
  },
  {
    title: 'Sản phẩm mẫu mã đa dạng.',
    description:
      'Đem đến cho bạn nhiều tuỳ chọn, đáp ứng nhu cầu nhiều loại công trình.',
  },
  {
    title: 'Giá trị tuyệt vời cho\nkhoản đầu tư của bạn.',
    description:
      'Chúng tôi không chỉ cung cấp mức giá cạnh tranh với chất lượng cao mà còn cung cấp giải pháp đằng sau mỗi sản phẩm xứng đáng với khoản đầu tư của khách hàng',
  },
  {
    title: 'Bảo hành đáng tin cậy,\nAn tâm dài lâu.',
    description:
      'Sản phẩm của chúng tôi đi kèm với chế độ bảo hành chặt chẽ – vì sự hài lòng và an tâm của bạn là điều quan trọng nhất.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="px-6 py-16 lg:py-20">
      <div className="page-container">
        {/* Mobile Layout */}
        <div className="space-y-6 lg:hidden">
          <h2 className="h2">
            Tại sao bạn nên chọn
            <br />
            VINA WPC
          </h2>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index}>
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
              <div key={index}>
                <div className="flex items-start">
                  {/* Empty Column 1 (for alignment with header) */}
                  <div className="flex-1">
                    {index === 0 && (
                      <h2 className="h3 leading-[1.15625em]">
                        Tại sao bạn nên chọn VINA WPC
                      </h2>
                    )}
                  </div>

                  {/* Feature Title - Column 2 */}
                  <div className="flex-1">
                    <h3
                      className="text-2xl leading-[1.125em] font-semibold tracking-[0.24px] text-[#222922]"
                      dangerouslySetInnerHTML={{
                        __html: feature.title.replace(/\n/g, '<br />'),
                      }}
                    />
                  </div>

                  {/* Feature Description - Column 3 */}
                  <div className="flex-1">
                    <p className="text-base leading-[1.3125em] font-normal text-[#222922]">
                      {feature.description}
                    </p>
                  </div>

                  {/* Numbers - Column 4 */}
                  <div className="flex-1 text-right">
                    <span className="text-2xl leading-[1.125em] font-semibold tracking-[0.24px] text-[#e6e6e6]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
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

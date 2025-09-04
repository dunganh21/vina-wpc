import Image from 'next/image';

export function AboutIntro() {
  return (
    <section className="page-container py-6 lg:py-0">
      {/* Flex Layout - Column on mobile, Row on desktop */}
      <div className="flex flex-col space-y-2 lg:flex-row lg:items-start">
        {/* Column 1 - Heading */}
        <div className="space-y-2 lg:flex-[0_0_25%] lg:space-y-3 lg:pt-20">
          <div className="flex items-center gap-1">
            <span className="subtitle-2 text-inherit">Trang chủ</span>
            <span className="opacity-50">/</span>
            <span className="subtitle-2 text-inherit opacity-50">
              Giới thiệu
            </span>
          </div>
          <h2 className="lg:w-[80%]">Bền vững từ tâm nâng tầm cuộc sống</h2>
        </div>

        {/* Column 2 - Content */}
        <div className="lg:flex-[0_0_25%] lg:pt-30">
          <div className="body-2 mb-8 space-y-4 lg:mb-0 lg:w-[75%] lg:space-y-3">
            <p>
              Một doanh nghiệp mới thành lập không chỉ khát khao được giới thiệu
              sản phẩm của mình đến với thị trường, đối với chúng tôi hơn hết là
              sự tận tâm, chu đáo, cung cấp các giá trị gia tăng cho khách hàng.
            </p>
            <p>
              Sản phẩm GỖ NHỰA của chúng tôi là dòng sản phẩm thân thiện với môi
              truờng, có tính thẩm mỹ hiện đại phù hợp với nhiều không gian nội
              thất, không chỉ đẹp mà còn bền bỉ theo thời gian.
            </p>
            <p>
              Sản phẩm của VINA WPC được sản xuất trên dây chuyền công nghệ hiện
              đại, được nhập khẩu đồng bộ.
            </p>
            <p>
              Sản phẩm do VINA WPC cung cấp theo đúng thông số kỹ thuật,
              catalog, sản phẩm mẫu thực tế… đã được công bố chính thức. Do đó,
              khách hàng có thể hoàn toàn yên tâm về nguồn gốc của hàng hóa.
            </p>
            <p>
              Với phương châm luôn nỗ lực để mang đến cho khách hàng sự đa dạng
              về giải pháp, sự yên tâm về chất lượng và sự hài lòng về dịch vụ,
              VINA WPC xin chân thành cảm ọn Quý khách hàng đã tin tưởng, ủng hộ
              và đồng hành cùng chúng tôi.
            </p>
          </div>
        </div>

        {/* Column 3 - Image (1/2 container width on desktop) */}
        <div className="overflow-hidden lg:flex-1 lg:pt-30 2xl:pt-0">
          <div className="relative aspect-[1/1] w-full">
            <Image
              src="/images/house.jpg"
              alt="VINA WPC Factory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

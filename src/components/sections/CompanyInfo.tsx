import Image from 'next/image';

export default function CompanyInfo() {
  return (
    <section className="page-container bg-white py-16">
      <div className="w-full">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Column 1: Main Title */}
          <div className="w-full lg:w-1/4">
            <h2 className="h2">Thông tin doanh nghiệp</h2>
          </div>

          {/* Column 2: Company Name */}
          <div className="w-full lg:w-1/4">
            <h3 className="h4">
              Công ty cổ phần đầu tư &<br />
              phát triển gỗ nhựa Việt Nam
            </h3>
          </div>

          {/* Column 3: Contact Details */}
          <div className="w-full space-y-4 lg:w-1/4">
            <div className="space-y-1">
              <div className="subtitle-3 text-[#424c43]">Địa chỉ</div>
              <div className="h6">Khu 8, xã Gia Thanh, Phú Thổ, Việt Nam</div>
            </div>

            <div className="space-y-1">
              <div className="subtitle-3 text-[#424c43]">Điện thoại</div>
              <div className="h6">(+84) 964 452 566</div>
            </div>

            <div className="space-y-1">
              <div className="subtitle-3 text-[#424c43]">Email</div>
              <a
                href="mailto:gonhuawpc@gmail.com"
                className="h6 underline decoration-solid"
              >
                gonhuawpc@gmail.com
              </a>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="w-full lg:w-1/4">
            <div className="space-y-4">
              <div className="subtitle-3 text-[#424c43]">
                Kết nối với chúng tôi
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="h-5 w-5 transition-opacity hover:opacity-80"
                  aria-label="Facebook"
                >
                  <Image
                    src="/icons/facebook-black.svg"
                    alt="Facebook"
                    width={20}
                    height={21}
                    className="h-full w-full"
                  />
                </a>
                <a
                  href="#"
                  className="h-5 w-5 transition-opacity hover:opacity-80"
                  aria-label="Instagram"
                >
                  <Image
                    src="/icons/instagram-black.svg"
                    alt="Instagram"
                    width={20}
                    height={21}
                    className="h-full w-full"
                  />
                </a>
                <a
                  href="#"
                  className="h-6 w-6 transition-opacity hover:opacity-80"
                  aria-label="YouTube"
                >
                  <Image
                    src="/icons/youtube-black.svg"
                    alt="YouTube"
                    width={25}
                    height={25}
                    className="h-full w-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
